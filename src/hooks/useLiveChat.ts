import { useState, useCallback, useEffect, useRef } from 'react';
import { useCommunity } from '../contexts/CommunityContext';

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
    subject: string;
    status: 'active' | 'waiting' | 'resolved' | 'closed';
    messageCount: number;
    lastMessageAt: string;
    createdAt: string;
}

interface UseLiveChatReturn {
    session: ChatSession | null;
    messages: ChatMessage[];
    isConnected: boolean;
    isLoading: boolean;
    error: string | null;
    startSession: (subject: string) => Promise<ChatSession | null>;
    sendMessage: (content: string) => Promise<void>;
    closeSession: () => void;
    rateSession: (rating: number, feedback?: string) => Promise<void>;
}

export const useLiveChat = (): UseLiveChatReturn => {
    const { token, isAuthenticated, user } = useCommunity();
    const [session, setSession] = useState<ChatSession | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const eventSourceRef = useRef<EventSource | null>(null);
    const optimisticMessageIdsRef = useRef<Set<string>>(new Set());

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, []);

    const connectToSSE = useCallback((sessionId: string) => {
        if (!token) return;

        // Close existing connection
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }

        // EventSource doesn't support custom headers, so we pass token as query parameter
        // The backend authenticate middleware supports token in query params
        const url = `${API_BASE_URL}/community/chat/messages/${sessionId}?stream=true&token=${encodeURIComponent(token)}`;
        const eventSource = new EventSource(url);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            console.log('SSE connection opened for session:', sessionId, 'ReadyState:', eventSource.readyState);
            setIsConnected(true);
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
                    console.log('Received initial messages:', data.messages?.length || 0, data.messages);
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
                    setIsConnected(true);
                    setError(null);
                } else if (data.type === 'new_message') {
                    console.log('Received new message:', data.message);
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
                    // Admin joined the chat
                    setSession(prev => prev ? { ...prev, status: 'active' } : null);
                } else if (data.type === 'admin_left') {
                    // Admin left
                }
            } catch (err) {
                console.error('SSE parse error:', err, event.data);
            }
        };

        eventSource.onerror = (error) => {
            console.error('SSE connection error:', error, 'ReadyState:', eventSource.readyState);
            setIsConnected(false);
            
            // EventSource states: CONNECTING (0), OPEN (1), CLOSED (2)
            if (eventSource.readyState === EventSource.CLOSED) {
                setError('Connection lost. Reconnecting...');
                // Close the current connection
                eventSource.close();
                eventSourceRef.current = null;
                
                // Reconnect after a short delay
                setTimeout(() => {
                    if (session?._id && token) {
                        console.log('Reconnecting SSE for session:', session._id);
                        connectToSSE(session._id);
                    }
                }, 2000);
            } else if (eventSource.readyState === EventSource.CONNECTING) {
                // Still connecting, wait a bit
                console.log('SSE still connecting...');
            }
        };
    }, [token, session?._id]);

    const startSession = useCallback(async (subject: string): Promise<ChatSession | null> => {
        if (!isAuthenticated || !token) {
            setError('Please sign in to start a chat');
            return null;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/community/chat/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ subject }),
            });

            const data = await response.json();
            
            if (data.success) {
                setSession(data.data);
                // Also fetch messages via HTTP as fallback
                try {
                    const messagesResponse = await fetch(`${API_BASE_URL}/community/chat/messages/${data.data._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const messagesData = await messagesResponse.json();
                    if (messagesData.success && messagesData.data?.messages) {
                        console.log('Loaded messages via HTTP fallback:', messagesData.data.messages.length);
                        setMessages(messagesData.data.messages);
                    }
                } catch (err) {
                    console.error('Failed to load messages via HTTP:', err);
                }
                connectToSSE(data.data._id);
                return data.data;
            } else {
                setError(data.error || 'Failed to start chat');
                return null;
            }
        } catch (err) {
            setError('Failed to connect to support');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated, token, connectToSSE]);

    const sendMessage = useCallback(async (content: string): Promise<void> => {
        if (!session || !token || !user) return;

        // Create optimistic message
        const optimisticId = `optimistic-${Date.now()}-${Math.random()}`;
        const optimisticMessage: ChatMessage = {
            _id: optimisticId,
            sessionId: session._id,
            senderId: user._id,
            senderName: user.name || user.email?.split('@')[0] || 'You',
            senderType: 'user',
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
                    sessionId: session._id,
                    content,
                    messageType: 'text',
                }),
            });

            const data = await response.json();
            
            if (!data.success) {
                // Remove optimistic message on error
                setMessages(prev => prev.filter(m => m._id !== optimisticId));
                optimisticMessageIdsRef.current.delete(optimisticId);
                setError('Failed to send message');
            }
            // If successful, the real message will come via SSE and replace the optimistic one
        } catch (err) {
            // Remove optimistic message on error
            setMessages(prev => prev.filter(m => m._id !== optimisticId));
            optimisticMessageIdsRef.current.delete(optimisticId);
            setError('Failed to send message');
        }
    }, [session, token, user]);

    const closeSession = useCallback(() => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
        }
        setSession(null);
        setMessages([]);
        setIsConnected(false);
    }, []);

    const rateSession = useCallback(async (rating: number, feedback?: string): Promise<void> => {
        if (!session || !token) return;

        try {
            await fetch(`${API_BASE_URL}/community/chat/${session._id}/rate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ rating, feedback }),
            });
        } catch {
            console.error('Failed to rate session');
        }
    }, [session, token]);

    return {
        session,
        messages,
        isConnected,
        isLoading,
        error,
        startSession,
        sendMessage,
        closeSession,
        rateSession,
    };
};

