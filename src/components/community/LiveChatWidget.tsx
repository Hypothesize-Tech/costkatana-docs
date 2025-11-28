import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MessageSquare, X, Send, Loader2, Star, Headphones, Wifi, WifiOff, Bot, UserCheck } from 'lucide-react';
import { useCommunity } from '../../contexts/CommunityContext';
import { useLiveChat } from '../../hooks/useLiveChat';
import { AuthPrompt } from './AuthPrompt';

export const LiveChatWidget: React.FC = () => {
    const { isAuthenticated, user } = useCommunity();
    const { session, messages, isConnected, isLoading, error, startSession, sendMessage, closeSession, rateSession } = useLiveChat();

    const [isOpen, setIsOpen] = useState(false);
    const [subject, setSubject] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [aiTyping, setAiTyping] = useState(false);
    const [adminJoined, setAdminJoined] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleOpen = () => {
        if (!isAuthenticated) {
            setShowAuthPrompt(true);
        } else {
            setIsOpen(true);
        }
    };

    const handleStartChat = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim()) return;
        await startSession(subject);
        setSubject('');
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim()) return;
        const content = messageInput.trim();
        setMessageInput(''); // Clear input immediately for better UX
        setAiTyping(true);
        await sendMessage(content);
        // AI typing will be cleared when AI message arrives via SSE
        setTimeout(() => setAiTyping(false), 5000); // Fallback timeout
    };

    // Update AI typing state when messages arrive
    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.senderType === 'ai') {
                setAiTyping(false);
            }
            if (lastMessage.senderType === 'support') {
                setAdminJoined(true);
            }
        }
    }, [messages]);

    const handleClose = () => {
        if (session && session.status !== 'closed') {
            setShowRating(true);
        } else {
            closeSession();
            setIsOpen(false);
        }
    };

    const handleSubmitRating = async () => {
        if (rating > 0) {
            await rateSession(rating, feedback);
        }
        closeSession();
        setShowRating(false);
        setRating(0);
        setFeedback('');
        setIsOpen(false);
    };

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={handleOpen}
                    className="fixed bottom-6 right-6 z-40 p-4 rounded-full
                        bg-gradient-to-r from-primary-500 to-primary-600 text-white
                        shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40
                        hover:scale-105 transition-all duration-300"
                    aria-label="Open live chat"
                >
                    <Headphones className="w-6 h-6" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-[60] w-96 max-h-[600px] flex flex-col
                    rounded-3xl overflow-hidden
                    bg-white dark:bg-dark-bg-300 
                    border border-gray-200 dark:border-gray-700
                    shadow-2xl shadow-black/20">

                    {/* Header */}
                    <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700
                        bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-white/20">
                                    <Headphones className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Live Support</h3>
                                    <div className="flex items-center gap-1.5 text-xs text-white/80">
                                        {isConnected ? (
                                            <>
                                                <Wifi className="w-3 h-3" />
                                                Connected
                                            </>
                                        ) : (
                                            <>
                                                <WifiOff className="w-3 h-3" />
                                                Connecting...
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 rounded-xl hover:bg-white/20 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Rating Screen */}
                    {showRating ? (
                        <div className="flex-1 p-6 flex flex-col items-center justify-center">
                            <h4 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                How was your experience?
                            </h4>
                            <p className="text-sm text-light-text-muted dark:text-dark-text-muted mb-4">
                                Your feedback helps us improve
                            </p>

                            <div className="flex gap-2 mb-4">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`p-2 rounded-lg transition-colors
                                            ${rating >= star ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                                    >
                                        <Star className="w-8 h-8" fill={rating >= star ? 'currentColor' : 'none'} />
                                    </button>
                                ))}
                            </div>

                            <textarea
                                value={feedback}
                                onChange={e => setFeedback(e.target.value)}
                                placeholder="Any additional feedback? (optional)"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                    bg-white dark:bg-dark-bg-200
                                    text-light-text-primary dark:text-dark-text-primary
                                    placeholder-light-text-muted
                                    focus:outline-none focus:border-primary-500
                                    resize-none mb-4"
                                rows={3}
                            />

                            <button
                                onClick={handleSubmitRating}
                                className="w-full py-3 rounded-xl font-semibold
                                    text-white bg-gradient-to-r from-primary-500 to-primary-600
                                    hover:from-primary-600 hover:to-primary-700
                                    transition-all"
                            >
                                {rating > 0 ? 'Submit & Close' : 'Skip & Close'}
                            </button>
                        </div>
                    ) : !session ? (
                        /* Start Chat Form */
                        <div className="flex-1 p-6">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/10 
                                    flex items-center justify-center">
                                    <MessageSquare className="w-8 h-8 text-primary-500" />
                                </div>
                                <h4 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-1">
                                    Hi {user?.name?.split(' ')[0] || 'there'}!
                                </h4>
                                <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                                    How can we help you today?
                                </p>
                            </div>

                            <form onSubmit={handleStartChat} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                        What do you need help with?
                                    </label>
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={e => setSubject(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                            bg-white dark:bg-dark-bg-200
                                            text-light-text-primary dark:text-dark-text-primary
                                            placeholder-light-text-muted
                                            focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                                        placeholder="e.g., Help with API integration"
                                        required
                                    />
                                </div>

                                {error && (
                                    <p className="text-sm text-danger-500">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading || !subject.trim()}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold
                                        text-white bg-gradient-to-r from-primary-500 to-primary-600
                                        hover:from-primary-600 hover:to-primary-700
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        transition-all"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Starting...
                                        </>
                                    ) : (
                                        <>
                                            <MessageSquare className="w-5 h-5" />
                                            Start Chat
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    ) : (
                        /* Chat Messages */
                        <>
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[400px]">
                                {messages.map(msg => (
                                    <div
                                        key={msg._id}
                                        className={`flex ${msg.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl
                                            ${msg.senderType === 'user'
                                                ? 'bg-primary-500 text-white rounded-br-sm'
                                                : msg.senderType === 'system'
                                                    ? 'bg-gray-100 dark:bg-gray-800 text-light-text-muted dark:text-dark-text-muted text-center text-xs italic'
                                                    : 'bg-gray-100 dark:bg-gray-800 text-light-text-primary dark:text-dark-text-primary rounded-bl-sm'
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
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                                                            bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                                                            <UserCheck className="w-3 h-3" />
                                                            {msg.senderName}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            {msg.senderType === 'ai' ? (
                                                <div className="text-sm prose prose-sm dark:prose-invert max-w-none
                                                    prose-p:my-1 prose-p:leading-relaxed
                                                    prose-strong:text-inherit prose-strong:font-semibold
                                                    prose-ul:my-1 prose-ul:pl-4 prose-li:my-0.5
                                                    prose-ol:my-1 prose-ol:pl-4
                                                    prose-headings:my-1 prose-headings:text-inherit
                                                    prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                            )}
                                            <p className={`text-[10px] mt-1 
                                                ${msg.senderType === 'user' ? 'text-white/70' : 'text-light-text-muted dark:text-dark-text-muted'}`}>
                                                {formatTime(msg.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {aiTyping && (
                                    <div className="flex justify-start">
                                        <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-sm
                                            bg-gray-100 dark:bg-gray-800 text-light-text-primary dark:text-dark-text-primary">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                                                    bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                                                    <Bot className="w-3 h-3" />
                                                    AI Assistant
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-light-text-muted dark:text-dark-text-muted">
                                                <Loader2 className="w-3 h-3 animate-spin" />
                                                AI is typing...
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input */}
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                {adminJoined && (
                                    <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm">
                                        <UserCheck className="w-4 h-4" />
                                        A support agent has joined the chat
                                    </div>
                                )}
                                {session.status === 'waiting' && !adminJoined && (
                                    <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-sm">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Waiting for support agent... AI Assistant is available
                                    </div>
                                )}

                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={messageInput}
                                        onChange={e => setMessageInput(e.target.value)}
                                        className="flex-1 px-4 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                            bg-white dark:bg-dark-bg-200
                                            text-light-text-primary dark:text-dark-text-primary
                                            placeholder-light-text-muted
                                            focus:outline-none focus:border-primary-500"
                                        placeholder="Type a message..."
                                    />
                                    <button
                                        type="submit"
                                        disabled={!messageInput.trim()}
                                        className="p-2.5 rounded-xl
                                            text-white bg-gradient-to-r from-primary-500 to-primary-600
                                            hover:from-primary-600 hover:to-primary-700
                                            disabled:opacity-50 disabled:cursor-not-allowed
                                            transition-all"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            )}

            <AuthPrompt
                isOpen={showAuthPrompt}
                onClose={() => setShowAuthPrompt(false)}
                message="Sign in to chat with support"
            />
        </>
    );
};

