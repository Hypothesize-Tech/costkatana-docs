import React, { useState } from 'react';
import { AdminChatDashboard } from '../../components/admin/AdminChatDashboard';
import { AdminChatInterface } from '../../components/admin/AdminChatInterface';
import { useCommunity } from '../../contexts/CommunityContext';
import { Navigate } from 'react-router-dom';

export const AdminChatPage: React.FC = () => {
    const { user, isAuthenticated } = useCommunity();
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

    // Redirect if not admin
    if (!isAuthenticated || (user?.role !== 'admin' && !user?.isAdmin)) {
        return <Navigate to="/" replace />;
    }

    const handleJoinSession = async (sessionId: string) => {
        // First join the session via API
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const token = localStorage.getItem('docs_auth_token');

        try {
            const response = await fetch(`${API_BASE_URL}/community/chat/admin/sessions/${sessionId}/join`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                setSelectedSessionId(sessionId);
            }
        } catch (error) {
            console.error('Error joining session:', error);
        }
    };

    const handleLeaveSession = () => {
        setSelectedSessionId(null);
    };

    return (
        <div className="min-h-screen">
            <div className="h-screen flex flex-col">
                {selectedSessionId ? (
                    <div className="flex-1 flex flex-col overflow-hidden p-4">
                        <div className="flex-1 min-h-0">
                            <AdminChatInterface
                                sessionId={selectedSessionId}
                                onLeave={handleLeaveSession}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto py-8 px-4">
                        <div className="max-w-7xl mx-auto">
                            <AdminChatDashboard onJoinSession={handleJoinSession} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
