import { useEffect } from 'react';
import { useDocsAnalytics } from '../contexts/DocsAnalyticsContext';

export const useRecommendations = () => {
    const { recommendations, loadRecommendations, isLoading } = useDocsAnalytics();

    useEffect(() => {
        if (recommendations.length === 0) {
            loadRecommendations();
        }
    }, [recommendations.length, loadRecommendations]);

    return {
        recommendations,
        isLoading,
        refresh: loadRecommendations,
    };
};

