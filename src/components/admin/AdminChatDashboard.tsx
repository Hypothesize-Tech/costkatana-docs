import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Clock, User, Search, Loader2, X } from 'lucide-react';
import { useCommunity } from '../../contexts/CommunityContext';
import { useAdminNotifications } from '../../hooks/useAdminNotifications';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface ChatSession {
    _id: string;
    userId: string;
    userName: string;
    userEmail: string;
    subject: string;
    status: 'active' | 'waiting' | 'resolved' | 'closed';
    priority: 'low' | 'normal' | 'high' | 'urgent';
    messageCount: number;
    lastMessageAt: string;
    createdAt: string;
    assignedAdminId?: string;
}

interface AdminChatDashboardProps {
    onJoinSession: (sessionId: string) => void;
}

export const AdminChatDashboard: React.FC<AdminChatDashboardProps> = ({ onJoinSession }) => {
    const { token, user } = useCommunity();
    const { notifications, newSessionCount, clearNotifications } = useAdminNotifications();
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'waiting' | 'assigned'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const loadSessions = useCallback(async () => {
        if (!token) return;

        setIsLoading(true);
        try {
            const statusParam = filter === 'all' ? '' : `?status=${filter}`;
            const response = await fetch(`${API_BASE_URL}/community/chat/admin/sessions${statusParam}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                setSessions(data.data);
            }
        } catch (error) {
            console.error('Error loading sessions:', error);
        } finally {
            setIsLoading(false);
        }
    }, [token, filter]);

    useEffect(() => {
        loadSessions();
        const interval = setInterval(loadSessions, 10000);
        return () => clearInterval(interval);
    }, [loadSessions]);

    useEffect(() => {
        const hasNewSession = notifications.some(n => n.type === 'new_session');
        if (hasNewSession) {
            loadSessions();
        }
    }, [notifications, loadSessions]);

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return 'just now';
    };

    const getStatusBadge = (status: string) => {
        const styles = {
            waiting: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
            active: 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20',
            resolved: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
            closed: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
        };
        return styles[status as keyof typeof styles] || styles.closed;
    };

    const getPriorityBadge = (priority: string) => {
        const styles = {
            urgent: 'bg-danger-500/10 text-danger-600 dark:text-danger-400 border-danger-500/20',
            high: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
            normal: 'bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20',
            low: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
        };
        return styles[priority as keyof typeof styles] || styles.normal;
    };

    const filteredSessions = sessions.filter(session => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                session.subject.toLowerCase().includes(query) ||
                session.userName.toLowerCase().includes(query) ||
                session.userEmail.toLowerCase().includes(query)
            );
        }
        return true;
    });

    return (
        <div className="space-y-6 bg-transparent">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-xl bg-primary-500/10">
                            <MessageSquare className="w-5 h-5 text-primary-500" />
                        </div>
                        <h2 className="text-2xl font-display font-bold text-light-text-primary dark:text-dark-text-primary">
                            Chat Sessions
                        </h2>
                    </div>
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                        Manage and respond to user support chats
                    </p>
                </div>
                {newSessionCount > 0 && (
                    <button
                        onClick={clearNotifications}
                        className="relative px-4 py-2.5 rounded-xl font-semibold text-white
                            bg-gradient-to-r from-primary-500 to-primary-600
                            hover:from-primary-600 hover:to-primary-700
                            shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30
                            transition-all duration-200"
                    >
                        {newSessionCount} New Session{newSessionCount > 1 ? 's' : ''}
                    </button>
                )}
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-muted dark:text-dark-text-muted pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search by subject, user name, or email..."
                        className="w-full pl-12 pr-10 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                            bg-light-card dark:bg-dark-card
                            text-light-text-primary dark:text-dark-text-primary
                            placeholder-light-text-muted dark:placeholder-dark-text-muted
                            focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
                            transition-all duration-200"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg
                                hover:bg-gray-100 dark:hover:bg-gray-700
                                text-light-text-muted dark:text-dark-text-muted
                                transition-colors"
                            title="Clear search"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <div className="flex gap-2">
                    {(['all', 'waiting', 'assigned'] as const).map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-5 py-3 rounded-xl font-semibold transition-all duration-200
                                ${filter === status
                                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30'
                                    : 'bg-light-card dark:bg-dark-card border-2 border-gray-200 dark:border-gray-700 text-light-text-secondary dark:text-dark-text-secondary hover:border-primary-500/50 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sessions List */}
            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="p-6 rounded-xl bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-700 animate-pulse">
                            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                            <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                    ))}
                </div>
            ) : filteredSessions.length === 0 ? (
                <div className="text-center py-16 rounded-xl bg-light-card dark:bg-dark-card border-2 border-gray-200 dark:border-gray-700">
                    <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                        <MessageSquare className="w-10 h-10 text-light-text-muted dark:text-dark-text-muted opacity-50" />
                    </div>
                    <p className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                        No {filter === 'all' ? '' : filter} sessions found
                    </p>
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                        {searchQuery ? 'Try adjusting your search query' : 'New chat sessions will appear here'}
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredSessions.map(session => (
                        <div
                            key={session._id}
                            className="group p-5 rounded-xl bg-light-card dark:bg-dark-card border-2 border-gray-200 dark:border-gray-700
                                hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10
                                transition-all duration-200 cursor-pointer"
                            onClick={() => {
                                if (session.status === 'waiting' || (session.status === 'active' && session.assignedAdminId === user?._id)) {
                                    onJoinSession(session._id);
                                }
                            }}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                                        <h3 className="font-semibold text-lg text-light-text-primary dark:text-dark-text-primary truncate">
                                            {session.subject}
                                        </h3>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(session.status)}`}>
                                            {session.status}
                                        </span>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getPriorityBadge(session.priority)}`}>
                                            {session.priority}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-5 text-sm text-light-text-muted dark:text-dark-text-muted flex-wrap">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded-lg bg-primary-500/10 dark:bg-primary-500/20">
                                                <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                            </div>
                                            <span className="font-medium">{session.userName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded-lg bg-blue-500/10 dark:bg-blue-500/20">
                                                <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <span>{session.messageCount} {session.messageCount === 1 ? 'message' : 'messages'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded-lg bg-gray-500/10 dark:bg-gray-500/20">
                                                <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                            </div>
                                            <span>{formatTime(session.lastMessageAt)}</span>
                                        </div>
                                    </div>
                                </div>
                                {(session.status === 'waiting' || (session.status === 'active' && session.assignedAdminId === user?._id)) && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onJoinSession(session._id);
                                        }}
                                        className="px-5 py-2.5 rounded-xl font-semibold text-white
                                            bg-gradient-to-r from-primary-500 to-primary-600
                                            hover:from-primary-600 hover:to-primary-700
                                            shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30
                                            transition-all duration-200 whitespace-nowrap flex-shrink-0"
                                    >
                                        {session.assignedAdminId === user?._id ? 'Open Chat' : 'Join Chat'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
