import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X, Send, Loader2, Bot, UserCheck, LogOut, MessageSquare } from 'lucide-react';
import { useCommunity } from '../../contexts/CommunityContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface ChatMessage {
    _id: string;
    sessionId: string;
    senderId: string;
    senderName: string;
    senderType: 'user' | 'support' | 'system' | 'ai';
    content: string;
    messageType: 'text' | 'code' | 'link';
    isAiGenerated?: boolean;
    createdAt: string;
}

interface ChatSession {
    _id: string;
    userId: string;
    userName: string;
    userEmail: string;
    subject: string;
    status: 'active' | 'waiting' | 'resolved' | 'closed';
    messageCount: number;
    lastMessageAt: string;
    createdAt: string;
}

interface AdminChatInterfaceProps {
    sessionId: string;
    onLeave: () => void;
}

export const AdminChatInterface: React.FC<AdminChatInterfaceProps> = ({ sessionId, onLeave }) => {
    const { token, user } = useCommunity();
    const [session, setSession] = useState<ChatSession | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [messageInput, setMessageInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const eventSourceRef = useRef<EventSource | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const optimisticMessageIdsRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`;
        }
    }, [messageInput]);

    const connectToSSE = useCallback((sessionId: string) => {
        if (!token) return;

        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }

        const url = `${API_BASE_URL}/community/chat/messages/${sessionId}?stream=true&token=${encodeURIComponent(token)}`;
        const eventSource = new EventSource(url);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            console.log('Admin: SSE connection opened for session:', sessionId, 'ReadyState:', eventSource.readyState);
            setError(null);
        };

        eventSource.onmessage = (event) => {
            try {
                // Skip keepalive messages
                if (event.data.trim() === '' || event.data.startsWith(':')) {
                    return;
                }

                const data = JSON.parse(event.data);

                if (data.type === 'initial') {
                    console.log('Admin: Received initial messages:', data.messages?.length || 0, data.messages);
                    // Replace all messages with confirmed ones, but keep optimistic messages that haven't been confirmed
                    setMessages(prev => {
                        const confirmedMessages = data.messages || [];
                        const confirmedIds = new Set(confirmedMessages.map((m: ChatMessage) => m._id));
                        // Keep optimistic messages that haven't been confirmed yet
                        const optimisticMessages = prev.filter((m: ChatMessage) =>
                            optimisticMessageIdsRef.current.has(m._id) && !confirmedIds.has(m._id)
                        );
                        // Merge and deduplicate, then sort
                        const allMessages = [...confirmedMessages, ...optimisticMessages];
                        const uniqueMessages = Array.from(
                            new Map(allMessages.map((msg: ChatMessage) => [msg._id, msg])).values()
                        ) as ChatMessage[];
                        return uniqueMessages.sort((a, b) =>
                            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                        );
                    });
                    setIsLoading(false);
                } else if (data.type === 'new_message') {
                    console.log('Admin: Received new message:', data.message);
                    setMessages(prev => {
                        // Check if this message replaces an optimistic one
                        const isReplacingOptimistic = optimisticMessageIdsRef.current.has(data.message._id);
                        if (isReplacingOptimistic) {
                            optimisticMessageIdsRef.current.delete(data.message._id);
                        }
                        // Remove any message with the same ID (optimistic or real)
                        const filtered = prev.filter((m: ChatMessage) => m._id !== data.message._id);
                        // Add the real message
                        const updated = [...filtered, data.message];
                        // Sort by timestamp
                        return updated.sort((a, b) =>
                            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                        );
                    });
                } else if (data.type === 'status_update') {
                    setSession(prev => prev ? { ...prev, status: data.status } : null);
                } else if (data.type === 'admin_joined') {
                    // Another admin joined
                    setSession(prev => prev ? { ...prev, status: 'active' } : null);
                } else if (data.type === 'admin_left') {
                    // Admin left
                }
            } catch (err) {
                console.error('SSE parse error:', err, event.data);
            }
        };

        eventSource.onerror = (error) => {
            console.error('Admin SSE connection error:', error, 'ReadyState:', eventSource.readyState);
            setError('Connection lost. Reconnecting...');

            // EventSource states: CONNECTING (0), OPEN (1), CLOSED (2)
            if (eventSource.readyState === EventSource.CLOSED) {
                // Close the current connection
                eventSource.close();
                eventSourceRef.current = null;

                // Reconnect after a short delay
                setTimeout(() => {
                    if (sessionId && token) {
                        console.log('Admin: Reconnecting SSE for session:', sessionId);
                        connectToSSE(sessionId);
                    }
                }, 2000);
            } else if (eventSource.readyState === EventSource.CONNECTING) {
                // Still connecting, wait a bit
                console.log('Admin SSE still connecting...');
            }
        };
    }, [token]);

    const loadSession = useCallback(async () => {
        if (!token) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/community/chat/admin/sessions/${sessionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                setSession(data.data);
                // Also fetch messages via HTTP as fallback
                try {
                    const messagesResponse = await fetch(`${API_BASE_URL}/community/chat/messages/${sessionId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const messagesData = await messagesResponse.json();
                    if (messagesData.success && messagesData.data?.messages) {
                        console.log('Admin: Loaded messages via HTTP fallback:', messagesData.data.messages.length);
                        setMessages(messagesData.data.messages);
                    }
                } catch (err) {
                    console.error('Failed to load messages via HTTP:', err);
                }
                connectToSSE(sessionId);
            }
        } catch {
            setError('Failed to load session');
        } finally {
            setIsLoading(false);
        }
    }, [token, sessionId, connectToSSE]);

    useEffect(() => {
        loadSession();
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, [loadSession]);

    const handleSendMessage = async (e: React.FormEvent | React.KeyboardEvent) => {
        e.preventDefault();
        if (!messageInput.trim() || !token || !user || !session) return;

        const content = messageInput.trim();
        setMessageInput(''); // Clear input immediately

        // Create optimistic message
        const optimisticId = `optimistic-${Date.now()}-${Math.random()}`;
        const optimisticMessage: ChatMessage = {
            _id: optimisticId,
            sessionId: session._id,
            senderId: user._id,
            senderName: user.name || user.email?.split('@')[0] || 'You',
            senderType: 'support',
            content,
            messageType: 'text',
            createdAt: new Date().toISOString(),
        };

        // Add optimistic message immediately
        optimisticMessageIdsRef.current.add(optimisticId);
        setMessages(prev => [...prev, optimisticMessage]);

        try {
            const response = await fetch(`${API_BASE_URL}/community/chat/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    sessionId,
                    content,
                    messageType: 'text',
                    senderType: 'support',
                }),
            });

            const data = await response.json();

            if (!data.success) {
                // Remove optimistic message on error
                setMessages(prev => prev.filter(m => m._id !== optimisticId));
                optimisticMessageIdsRef.current.delete(optimisticId);
                setMessageInput(content); // Restore message on error
                setError('Failed to send message');
            }
            // If successful, the real message will come via SSE and replace the optimistic one
        } catch {
            // Remove optimistic message on error
            setMessages(prev => prev.filter(m => m._id !== optimisticId));
            optimisticMessageIdsRef.current.delete(optimisticId);
            setMessageInput(content); // Restore message on error
            setError('Failed to send message');
        }
    };

    const handleLeave = async () => {
        if (!token) return;

        try {
            await fetch(`${API_BASE_URL}/community/chat/admin/sessions/${sessionId}/leave`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error leaving session:', error);
        } finally {
            onLeave();
        }
    };

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="text-center py-12 rounded-xl bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-700">
                <p className="text-light-text-muted dark:text-dark-text-muted">Session not found</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full rounded-2xl overflow-hidden
            bg-white dark:bg-dark-bg-300 
            border border-gray-200 dark:border-gray-700
            shadow-xl shadow-black/10">
            {/* Header */}
            <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 dark:border-gray-700
                bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base truncate">{session.subject}</h3>
                        <div className="flex items-center gap-2 text-xs text-white/80 mt-0.5">
                            <UserCheck className="w-3 h-3" />
                            <span>{session.userName}</span>
                            <span>•</span>
                            <span className="truncate">{session.userEmail}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLeave}
                        className="p-1.5 rounded-lg hover:bg-white/20 transition-colors flex-shrink-0 ml-2"
                        title="Leave chat"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 bg-gray-50/50 dark:bg-gray-900/20">
                {messages.length === 0 && !isLoading && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <MessageSquare className="w-12 h-12 mb-3 text-light-text-muted dark:text-dark-text-muted opacity-50" />
                        <p className="text-light-text-muted dark:text-dark-text-muted font-medium">No messages yet</p>
                        <p className="text-sm text-light-text-muted dark:text-dark-text-muted mt-1">Start the conversation!</p>
                    </div>
                )}
                {messages.map((msg, index) => {
                    // Deduplicate consecutive system messages with same content
                    const prevMsg = index > 0 ? messages[index - 1] : null;
                    const isDuplicateSystem = msg.senderType === 'system' &&
                        prevMsg?.senderType === 'system' &&
                        prevMsg?.content === msg.content;

                    if (isDuplicateSystem) {
                        return null;
                    }

                    return (
                        <div
                            key={msg._id}
                            className={`flex items-end gap-2 ${msg.senderType === 'user' ? 'justify-start' : msg.senderType === 'support' ? 'justify-end' : 'justify-center'}`}
                        >
                            {msg.senderType === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-primary-500/20 dark:bg-primary-500/30 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                                        {msg.senderName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div className={`max-w-[75%] px-3 py-2 rounded-xl shadow-sm
                            ${msg.senderType === 'user'
                                    ? 'bg-white dark:bg-gray-800 text-light-text-primary dark:text-dark-text-primary rounded-tl-sm border border-gray-200 dark:border-gray-700'
                                    : msg.senderType === 'system'
                                        ? 'bg-gray-100 dark:bg-gray-800/50 text-light-text-muted dark:text-dark-text-muted text-center text-xs italic border border-gray-200 dark:border-gray-700'
                                        : msg.senderType === 'ai'
                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-light-text-primary dark:text-dark-text-primary rounded-tl-sm border border-blue-200 dark:border-blue-800'
                                            : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-tr-sm shadow-md shadow-primary-500/20'
                                }`}
                            >
                                {msg.senderType !== 'user' && msg.senderType !== 'system' && (
                                    <div className="flex items-center gap-1.5 mb-1">
                                        {msg.senderType === 'ai' ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                                            bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                                                <Bot className="w-3 h-3" />
                                                AI Assistant
                                            </span>
                                        ) : (
                                            <span className="text-xs font-medium text-white/90">
                                                You
                                            </span>
                                        )}
                                    </div>
                                )}
                                {msg.senderType === 'user' && (
                                    <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-1">
                                        {msg.senderName}
                                    </p>
                                )}
                                {msg.senderType === 'ai' ? (
                                    <div className="text-sm leading-relaxed break-words prose prose-sm dark:prose-invert max-w-none
                                    prose-p:my-1 prose-p:leading-relaxed
                                    prose-strong:text-inherit prose-strong:font-semibold
                                    prose-ul:my-1 prose-ul:pl-4 prose-li:my-0.5
                                    prose-ol:my-1 prose-ol:pl-4
                                    prose-headings:my-1 prose-headings:text-inherit
                                    prose-a:text-blue-400 dark:prose-a:text-blue-300 prose-a:no-underline hover:prose-a:underline
                                    prose-code:text-inherit prose-code:bg-gray-200 dark:prose-code:bg-gray-700 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                                )}
                                <p className={`text-[10px] mt-1.5 opacity-70
                                ${msg.senderType === 'user' || msg.senderType === 'ai'
                                        ? 'text-light-text-muted dark:text-dark-text-muted'
                                        : 'text-white/80'}`}>
                                    {formatTime(msg.createdAt)}
                                </p>
                            </div>
                            {msg.senderType === 'support' && (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                    <span className="text-xs font-semibold text-white">
                                        {user?.name?.charAt(0).toUpperCase() || 'A'}
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="flex-shrink-0 p-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-300">
                {error && (
                    <div className="flex items-center gap-2 mb-2 px-3 py-2 rounded-lg bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 text-danger-700 dark:text-danger-400 text-sm font-medium">
                        <X className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                    <div className="flex-1 relative">
                        <textarea
                            ref={textareaRef}
                            value={messageInput}
                            onChange={e => setMessageInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                }
                            }}
                            rows={1}
                            className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-200 dark:border-gray-700
                                bg-white dark:bg-dark-bg-200
                                text-light-text-primary dark:text-dark-text-primary text-sm
                                placeholder-light-text-muted dark:placeholder-dark-text-muted
                                focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
                                resize-none overflow-y-auto
                                transition-all duration-200"
                            placeholder="Type a message..."
                            style={{ minHeight: '80px', maxHeight: '120px' }}
                        />
                        {messageInput.length > 0 && (
                            <div className="absolute bottom-1.5 right-2 text-[10px] text-light-text-muted dark:text-dark-text-muted opacity-60">
                                {messageInput.length}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={!messageInput.trim()}
                        className="p-2.5 rounded-lg mb-2.5
                            text-white bg-gradient-to-r from-primary-500 to-primary-600
                            hover:from-primary-600 hover:to-primary-700
                            disabled:opacity-50 disabled:cursor-not-allowed
                            shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30
                            transition-all duration-200 flex-shrink-0"
                        title="Send message"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
};
