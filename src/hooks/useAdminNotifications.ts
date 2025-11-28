import React, { useState, useCallback, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { MessageSquare, Bell, UserCheck } from 'lucide-react';
import { useCommunity } from '../contexts/CommunityContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface NotificationEvent {
    type: 'new_session' | 'new_message' | 'session_assigned' | 'session_status_change' | 'connected';
    sessionId?: string;
    session?: {
        _id: string;
        subject: string;
        userName: string;
        userEmail?: string;
        status?: string;
        priority?: string;
    };
    messageData?: {
        content: string;
        senderName: string;
    };
    adminId?: string;
    adminName?: string;
    status?: string;
    timestamp: string;
    message?: string; // For connected event
}

interface UseAdminNotificationsReturn {
    isConnected: boolean;
    notifications: NotificationEvent[];
    newSessionCount: number;
    connect: () => void;
    disconnect: () => void;
    clearNotifications: () => void;
}

export const useAdminNotifications = (): UseAdminNotificationsReturn => {
    const { token, isAuthenticated, user } = useCommunity();
    const [isConnected, setIsConnected] = useState(false);
    const [notifications, setNotifications] = useState<NotificationEvent[]>([]);
    const eventSourceRef = useRef<EventSource | null>(null);

    const connect = useCallback(() => {
        if (!isAuthenticated || !token || !user?.isAdmin) return;

        // Close existing connection
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }

        // EventSource doesn't support custom headers, so we pass token as query parameter
        const url = `${API_BASE_URL}/community/chat/admin/notifications?token=${encodeURIComponent(token)}`;
        const eventSource = new EventSource(url);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            setIsConnected(true);
        };

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data) as NotificationEvent;
                setNotifications(prev => [...prev, data]);

                // Show toast notifications based on event type
                if (data.type === 'new_session' && data.session) {
                    toast.success(
                        React.createElement(
                            'div',
                            { className: 'flex items-center gap-2' },
                            React.createElement(MessageSquare, { className: 'w-4 h-4' }),
                            React.createElement(
                                'div',
                                null,
                                React.createElement('div', { className: 'font-semibold' }, 'New Chat Session'),
                                React.createElement(
                                    'div',
                                    { className: 'text-sm opacity-90' },
                                    `${data.session.userName}: ${data.session.subject}`
                                )
                            )
                        ),
                        {
                            duration: 4000,
                            icon: React.createElement(MessageSquare, { className: 'w-5 h-5' }),
                        }
                    );
                } else if (data.type === 'new_message' && data.session && data.messageData) {
                    toast(
                        React.createElement(
                            'div',
                            { className: 'flex items-center gap-2' },
                            React.createElement(Bell, { className: 'w-4 h-4' }),
                            React.createElement(
                                'div',
                                null,
                                React.createElement('div', { className: 'font-semibold' }, 'New Message'),
                                React.createElement(
                                    'div',
                                    { className: 'text-sm opacity-90' },
                                    `${data.messageData.senderName} in "${data.session.subject}"`
                                )
                            )
                        ),
                        {
                            duration: 3000,
                            icon: React.createElement(Bell, { className: 'w-5 h-5' }),
                        }
                    );
                } else if (data.type === 'session_assigned' && data.adminName && data.session) {
                    toast.success(
                        React.createElement(
                            'div',
                            { className: 'flex items-center gap-2' },
                            React.createElement(UserCheck, { className: 'w-4 h-4' }),
                            React.createElement(
                                'div',
                                null,
                                React.createElement('div', { className: 'font-semibold' }, 'Session Assigned'),
                                React.createElement(
                                    'div',
                                    { className: 'text-sm opacity-90' },
                                    `${data.adminName} joined "${data.session.subject}"`
                                )
                            )
                        ),
                        {
                            duration: 3000,
                            icon: React.createElement(UserCheck, { className: 'w-5 h-5' }),
                        }
                    );
                }
            } catch (err) {
                console.error('Notification parse error:', err);
            }
        };

        eventSource.onerror = () => {
            setIsConnected(false);
            // Attempt reconnect after 3 seconds
            setTimeout(() => {
                if (isAuthenticated && token) {
                    connect();
                }
            }, 3000);
        };
    }, [isAuthenticated, token, user?.isAdmin]);

    const disconnect = useCallback(() => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
        }
        setIsConnected(false);
    }, []);

    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    // Auto-connect when authenticated and user is admin
    useEffect(() => {
        if (isAuthenticated && user?.isAdmin) {
            connect();
        }
        return () => {
            disconnect();
        };
    }, [isAuthenticated, user?.isAdmin, connect, disconnect]);

    const newSessionCount = notifications.filter(n => n.type === 'new_session').length;

    return {
        isConnected,
        notifications,
        newSessionCount,
        connect,
        disconnect,
        clearNotifications,
    };
};
