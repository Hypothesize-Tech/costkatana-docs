/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface RatingStats {
    pageId: string;
    totalRatings: number;
    upvotes: number;
    downvotes: number;
    upvotePercentage: number;
    averageStarRating: number | null;
}

interface ContentRecommendation {
    pageId: string;
    pagePath: string;
    title: string;
    reason: string;
    relevanceScore: number;
}

interface PageMeta {
    pageId: string;
    lastUpdated: string | null;
    totalViews: number;
    helpfulnessScore: number;
}

interface DocsAnalyticsContextType {
    sessionId: string;
    // Rating functions
    submitRating: (pageId: string, pagePath: string, rating: 'up' | 'down', starRating?: number) => Promise<void>;
    getRatingStats: (pageId: string) => Promise<RatingStats | null>;
    userRating: Record<string, 'up' | 'down'>;
    // Feedback functions
    submitFeedback: (pageId: string, pagePath: string, feedbackType: string, message: string, email?: string) => Promise<void>;
    // Page view tracking
    trackPageView: (pageId: string, pagePath: string) => void;
    updateViewMetrics: (pageId: string, timeOnPage: number, scrollDepth: number, sectionsViewed?: string[]) => void;
    // Recommendations
    recommendations: ContentRecommendation[];
    loadRecommendations: () => Promise<void>;
    // Page meta
    getPageMeta: (pageId: string) => Promise<PageMeta | null>;
    // Loading states
    isLoading: boolean;
}

const DocsAnalyticsContext = createContext<DocsAnalyticsContextType | undefined>(undefined);

export const useDocsAnalytics = () => {
    const context = useContext(DocsAnalyticsContext);
    if (!context) {
        throw new Error('useDocsAnalytics must be used within a DocsAnalyticsProvider');
    }
    return context;
};

// Generate or retrieve session ID
const getSessionId = (): string => {
    let sessionId = localStorage.getItem('docs_session_id');
    if (!sessionId) {
        sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        localStorage.setItem('docs_session_id', sessionId);
    }
    return sessionId;
};

// Detect device type
const getDeviceType = (): 'desktop' | 'tablet' | 'mobile' => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
};

interface DocsAnalyticsProviderProps {
    children: React.ReactNode;
}

export const DocsAnalyticsProvider: React.FC<DocsAnalyticsProviderProps> = ({ children }) => {
    const [sessionId] = useState<string>(getSessionId);
    const [userRating, setUserRating] = useState<Record<string, 'up' | 'down'>>(() => {
        const saved = localStorage.getItem('docs_user_ratings');
        return saved ? JSON.parse(saved) : {};
    });
    const [recommendations, setRecommendations] = useState<ContentRecommendation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const pageViewTimers = useRef<Record<string, number>>({});

    // Save user ratings to localStorage
    useEffect(() => {
        localStorage.setItem('docs_user_ratings', JSON.stringify(userRating));
    }, [userRating]);

    const submitRating = useCallback(async (
        pageId: string,
        pagePath: string,
        rating: 'up' | 'down',
        starRating?: number
    ) => {
        try {
            await fetch(`${API_BASE_URL}/docs-analytics/ratings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pageId, pagePath, rating, starRating, sessionId }),
            });
            setUserRating(prev => ({ ...prev, [pageId]: rating }));
        } catch (error) {
            console.error('Failed to submit rating:', error);
        }
    }, [sessionId]);

    const getRatingStats = useCallback(async (pageId: string): Promise<RatingStats | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/docs-analytics/ratings/${encodeURIComponent(pageId)}`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('Failed to get rating stats:', error);
            return null;
        }
    }, []);

    const submitFeedback = useCallback(async (
        pageId: string,
        pagePath: string,
        feedbackType: string,
        message: string,
        email?: string
    ) => {
        try {
            await fetch(`${API_BASE_URL}/docs-analytics/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pageId, pagePath, feedbackType, message, email, sessionId }),
            });
        } catch (error) {
            console.error('Failed to submit feedback:', error);
        }
    }, [sessionId]);

    const trackPageView = useCallback((pageId: string, pagePath: string) => {
        // Record start time for this page
        pageViewTimers.current[pageId] = Date.now();

        fetch(`${API_BASE_URL}/docs-analytics/views`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pageId,
                pagePath,
                sessionId,
                referrer: document.referrer,
                deviceType: getDeviceType(),
            }),
        }).catch(error => console.error('Failed to track page view:', error));
    }, [sessionId]);

    const updateViewMetrics = useCallback((
        pageId: string,
        timeOnPage: number,
        scrollDepth: number,
        sectionsViewed?: string[]
    ) => {
        fetch(`${API_BASE_URL}/docs-analytics/views`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pageId, sessionId, timeOnPage, scrollDepth, sectionsViewed }),
        }).catch(error => console.error('Failed to update view metrics:', error));
    }, [sessionId]);

    const loadRecommendations = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/docs-analytics/recommendations?sessionId=${sessionId}`);
            const data = await response.json();
            if (data.success) {
                setRecommendations(data.data);
            }
        } catch (error) {
            console.error('Failed to load recommendations:', error);
        } finally {
            setIsLoading(false);
        }
    }, [sessionId]);

    const getPageMeta = useCallback(async (pageId: string): Promise<PageMeta | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/docs-analytics/page-meta/${encodeURIComponent(pageId)}`);
            const data = await response.json();
            return data.success ? data.data : null;
        } catch (error) {
            console.error('Failed to get page meta:', error);
            return null;
        }
    }, []);

    const value: DocsAnalyticsContextType = {
        sessionId,
        submitRating,
        getRatingStats,
        userRating,
        submitFeedback,
        trackPageView,
        updateViewMetrics,
        recommendations,
        loadRecommendations,
        getPageMeta,
        isLoading,
    };

    return (
        <DocsAnalyticsContext.Provider value={value}>
            {children}
        </DocsAnalyticsContext.Provider>
    );
};

