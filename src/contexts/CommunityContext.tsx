/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: 'user' | 'admin';
    isAdmin?: boolean;
}

interface Comment {
    _id: string;
    pageId: string;
    pagePath: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    parentId?: string;
    upvotes: string[];
    downvotes: string[];
    isEdited: boolean;
    replyCount: number;
    createdAt: string;
}

interface UserExample {
    _id: string;
    title: string;
    description: string;
    code: string;
    language: string;
    category: string;
    tags: string[];
    userId: string;
    userName: string;
    userAvatar?: string;
    upvotes: string[];
    downvotes: string[];
    viewCount: number;
    status: string;
    createdAt: string;
}

interface DiscussionReply {
    _id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    upvotes: string[];
    downvotes: string[];
    isEdited: boolean;
    createdAt: string;
}

interface Discussion {
    _id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    userId: string;
    userName: string;
    userAvatar?: string;
    upvotes: string[];
    downvotes: string[];
    viewCount: number;
    replyCount: number;
    replies?: DiscussionReply[];
    isPinned: boolean;
    isLocked: boolean;
    lastActivityAt: string;
    createdAt: string;
}

interface MFALoginResponse {
    requiresMFA: true;
    mfaToken: string;
    userId: string;
    availableMethods: string[];
}

interface CommunityContextType {
    // Auth
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<boolean | MFALoginResponse>;
    verifyMFA: (mfaToken: string, method: string, code: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;

    // Comments
    getComments: (pageId: string, options?: { page?: number; sortBy?: string }) => Promise<{ comments: Comment[]; total: number; hasMore: boolean }>;
    getCommentReplies: (commentId: string) => Promise<Comment[]>;
    createComment: (pageId: string, pagePath: string, content: string, parentId?: string) => Promise<Comment | null>;
    updateComment: (commentId: string, content: string) => Promise<Comment | null>;
    deleteComment: (commentId: string) => Promise<boolean>;
    voteComment: (commentId: string, voteType: 'up' | 'down') => Promise<Comment | null>;

    // Examples
    getExamples: (options?: { page?: number; category?: string; language?: string }) => Promise<{ examples: UserExample[]; total: number; hasMore: boolean }>;
    createExample: (data: { title: string; description: string; code: string; language: string; category: string; tags?: string[] }) => Promise<UserExample | null>;
    voteExample: (exampleId: string, voteType: 'up' | 'down') => Promise<UserExample | null>;

    // Discussions
    getDiscussions: (options?: { page?: number; category?: string }) => Promise<{ discussions: Discussion[]; total: number; hasMore: boolean }>;
    getDiscussion: (discussionId: string) => Promise<Discussion | null>;
    createDiscussion: (data: { title: string; content: string; category: string; tags?: string[] }) => Promise<Discussion | null>;
    addReply: (discussionId: string, content: string) => Promise<Discussion | null>;
    voteDiscussion: (discussionId: string, voteType: 'up' | 'down') => Promise<Discussion | null>;

    // Stats
    getCommunityStats: () => Promise<{ totalComments: number; totalExamples: number; totalDiscussions: number; activeUsers: number }>;

    isLoading: boolean;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const useCommunity = () => {
    const context = useContext(CommunityContext);
    if (!context) {
        throw new Error('useCommunity must be used within a CommunityProvider');
    }
    return context;
};

interface CommunityProviderProps {
    children: React.ReactNode;
}

export const CommunityProvider: React.FC<CommunityProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('docs_auth_token'));
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = !!token && !!user;

    const authFetch = useCallback(async (url: string, options: RequestInit = {}) => {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        return fetch(url, { ...options, headers });
    }, [token]);

    // ==================== AUTH ====================

    const login = useCallback(async (email: string, password: string): Promise<boolean | MFALoginResponse> => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok && data.success) {
                // Check if MFA is required
                if (data.data?.requiresMFA && data.data?.mfaToken) {
                    return {
                        requiresMFA: true,
                        mfaToken: data.data.mfaToken,
                        userId: data.data.userId,
                        availableMethods: data.data.availableMethods || ['email', 'totp'],
                    };
                }

                // Normal login success
                if (data.data?.accessToken) {
                    setToken(data.data.accessToken);
                    setUser({
                        _id: data.data.user.id,
                        name: data.data.user.name,
                        email: data.data.user.email,
                        avatar: data.data.user.avatar,
                        role: data.data.user.role || 'user',
                        isAdmin: data.data.user.role === 'admin',
                    });
                    localStorage.setItem('docs_auth_token', data.data.accessToken);
                    return true;
                }
            }
            return false;
        } catch {
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const verifyMFA = useCallback(async (mfaToken: string, method: string, code: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/mfa/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mfaToken, method, code }),
            });
            const data = await response.json();

            if (response.ok && data.success && data.data?.accessToken) {
                setToken(data.data.accessToken);
                setUser({
                    _id: data.data.user.id,
                    name: data.data.user.name,
                    email: data.data.user.email,
                    avatar: data.data.user.avatar,
                    role: data.data.user.role || 'user',
                    isAdmin: data.data.user.role === 'admin',
                });
                localStorage.setItem('docs_auth_token', data.data.accessToken);
                return true;
            }
            return false;
        } catch {
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (response.ok && data.success && data.data?.accessToken) {
                setToken(data.data.accessToken);
                setUser({
                    _id: data.data.user.id,
                    name: data.data.user.name,
                    email: data.data.user.email,
                    avatar: data.data.user.avatar,
                    role: data.data.user.role || 'user',
                    isAdmin: data.data.user.role === 'admin',
                });
                localStorage.setItem('docs_auth_token', data.data.accessToken);
                return true;
            }
            return false;
        } catch {
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('docs_auth_token');
    }, []);

    const fetchUser = useCallback(async () => {
        if (!token) return;
        try {
            const response = await fetch(`${API_BASE_URL}/user/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                const userData = data.data || data.user;
                if (userData) {
                    setUser({
                        _id: userData.id || userData._id,
                        name: userData.name,
                        email: userData.email,
                        avatar: userData.avatar,
                        role: userData.role || 'user',
                        isAdmin: userData.role === 'admin',
                    });
                }
            } else {
                logout();
            }
        } catch {
            logout();
        }
    }, [token, logout]);

    // Fetch user on mount if token exists
    useEffect(() => {
        if (token && !user) {
            fetchUser();
        }
    }, [token, user, fetchUser]);

    // ==================== COMMENTS ====================

    const getComments = useCallback(async (pageId: string, options?: { page?: number; sortBy?: string }) => {
        try {
            const params = new URLSearchParams();
            if (options?.page) params.set('page', options.page.toString());
            if (options?.sortBy) params.set('sortBy', options.sortBy);

            const response = await fetch(`${API_BASE_URL}/community/comments/${encodeURIComponent(pageId)}?${params}`);
            const data = await response.json();
            return data.success ? data.data : { comments: [], total: 0, hasMore: false };
        } catch {
            return { comments: [], total: 0, hasMore: false };
        }
    }, []);

    const getCommentReplies = useCallback(async (commentId: string): Promise<Comment[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/community/comments/${commentId}/replies`);
            const data = await response.json();
            return data.success ? data.data : [];
        } catch {
            return [];
        }
    }, []);

    const createComment = useCallback(async (pageId: string, pagePath: string, content: string, parentId?: string): Promise<Comment | null> => {
        try {
            const response = await authFetch(`${API_BASE_URL}/community/comments`, {
                method: 'POST',
                body: JSON.stringify({ pageId, pagePath, content, parentId }),
            });
            const data = await response.json();
            return data.success ? data.data : null;
        } catch {
            return null;
        }
    }, [authFetch]);

    const updateComment = useCallback(async (commentId: string, content: string): Promise<Comment | null> => {
        try {
            const response = await authFetch(`${API_BASE_URL}/community/comments/${commentId}`, {
                method: 'PUT',
                body: JSON.stringify({ content }),
            });
            const data = await response.json();
            return data.success ? data.data : null;
        } catch {
            return null;
        }
    }, [authFetch]);

    const deleteComment = useCallback(async (commentId: string): Promise<boolean> => {
        try {
            const response = await authFetch(`${API_BASE_URL}/community/comments/${commentId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            return data.success;
        } catch {
            return false;
        }
    }, [authFetch]);

    const voteComment = useCallback(async (commentId: string, voteType: 'up' | 'down'): Promise<Comment | null> => {
        try {
            const response = await authFetch(`${API_BASE_URL}/community/comments/${commentId}/vote`, {
                method: 'POST',
                body: JSON.stringify({ voteType }),
            });
            const data = await response.json();
            return data.success ? data.data : null;
        } catch {
            return null;
        }
    }, [authFetch]);

    // ==================== EXAMPLES ====================

    const getExamples = useCallback(async (options?: { page?: number; category?: string; language?: string }) => {
        try {
            const params = new URLSearchParams();
            if (options?.page) params.set('page', options.page.toString());
            if (options?.category) params.set('category', options.category);
            if (options?.language) params.set('language', options.language);

            const response = await fetch(`${API_BASE_URL}/community/examples?${params}`);
            const data = await response.json();
            return data.success ? data.data : { examples: [], total: 0, hasMore: false };
        } catch {
            return { examples: [], total: 0, hasMore: false };
        }
    }, []);

    const createExample = useCallback(async (exampleData: { title: string; description: string; code: string; language: string; category: string; tags?: string[] }): Promise<UserExample | null> => {
        try {
            const response = await authFetch(`${API_BASE_URL}/community/examples`, {
                method: 'POST',
                body: JSON.stringify(exampleData),
            });
            const data = await response.json();
            return data.success ? data.data : null;
        } catch {
            return null;
        }
    }, [authFetch]);

    const voteExample = useCallback(async (exampleId: string, voteType: 'up' | 'down'): Promise<UserExample | null> => {
        try {
            const response = await authFetch(`${API_BASE_URL}/community/examples/${exampleId}/vote`, {
                method: 'POST',
                body: JSON.stringify({ voteType }),
            });
            const data = await response.json();
            return data.success ? data.data : null;
        } catch {
            return null;
        }
    }, [authFetch]);

    // ==================== DISCUSSIONS ====================

    const getDiscussions = useCallback(async (options?: { page?: number; category?: string }) => {
        try {
            const params = new URLSearchParams();
            if (options?.page) params.set('page', options.page.toString());
            if (options?.category) params.set('category', options.category);

            const response = await fetch(`${API_BASE_URL}/community/discussions?${params}`);
            const data = await response.json();
            return data.success ? data.data : { discussions: [], total: 0, hasMore: false };
        } catch {
            return { discussions: [], total: 0, hasMore: false };
        }
    }, []);

    const getDiscussion = useCallback(async (discussionId: string): Promise<Discussion | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/community/discussions/${discussionId}`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch {
            return null;
        }
    }, []);

    const createDiscussion = useCallback(async (discussionData: { title: string; content: string; category: string; tags?: string[] }): Promise<Discussion | null> => {
        try {
            const response = await authFetch(`${API_BASE_URL}/community/discussions`, {
                method: 'POST',
                body: JSON.stringify(discussionData),
            });
            const data = await response.json();
            return data.success ? data.data : null;
        } catch {
            return null;
        }
    }, [authFetch]);

    const addReply = useCallback(async (discussionId: string, content: string): Promise<Discussion | null> => {
        try {
            const response = await authFetch(`${API_BASE_URL}/community/discussions/${discussionId}/replies`, {
                method: 'POST',
                body: JSON.stringify({ content }),
            });
            const data = await response.json();
            return data.success ? data.data : null;
        } catch {
            return null;
        }
    }, [authFetch]);

    const voteDiscussion = useCallback(async (discussionId: string, voteType: 'up' | 'down'): Promise<Discussion | null> => {
        try {
            const response = await authFetch(`${API_BASE_URL}/community/discussions/${discussionId}/vote`, {
                method: 'POST',
                body: JSON.stringify({ voteType }),
            });
            const data = await response.json();
            return data.success ? data.data : null;
        } catch {
            return null;
        }
    }, [authFetch]);

    // ==================== STATS ====================

    const getCommunityStats = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/community/stats`);
            const data = await response.json();
            return data.success ? data.data : { totalComments: 0, totalExamples: 0, totalDiscussions: 0, activeUsers: 0 };
        } catch {
            return { totalComments: 0, totalExamples: 0, totalDiscussions: 0, activeUsers: 0 };
        }
    }, []);

    const value: CommunityContextType = {
        user,
        isAuthenticated,
        token,
        login,
        verifyMFA,
        register,
        logout,
        getComments,
        getCommentReplies,
        createComment,
        updateComment,
        deleteComment,
        voteComment,
        getExamples,
        createExample,
        voteExample,
        getDiscussions,
        getDiscussion,
        createDiscussion,
        addReply,
        voteDiscussion,
        getCommunityStats,
        isLoading,
    };

    return (
        <CommunityContext.Provider value={value}>
            {children}
        </CommunityContext.Provider>
    );
};

