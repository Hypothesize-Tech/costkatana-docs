import React, { useState, useEffect } from 'react';
import { useDocsAnalytics } from '../../contexts/DocsAnalyticsContext';

interface ContentMetaProps {
    pageId: string;
    lastUpdated?: string;
    readingTime?: number;
}

export const ContentMeta: React.FC<ContentMetaProps> = ({ pageId, lastUpdated, readingTime }) => {
    const { getPageMeta } = useDocsAnalytics();
    const [meta, setMeta] = useState<{
        totalViews: number;
        helpfulnessScore: number;
    } | null>(null);

    useEffect(() => {
        getPageMeta(pageId).then(data => {
            if (data) {
                setMeta({
                    totalViews: data.totalViews,
                    helpfulnessScore: data.helpfulnessScore,
                });
            }
        });
    }, [pageId, getPageMeta]);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="flex flex-wrap items-center gap-4 text-sm text-light-text-muted dark:text-dark-text-muted mb-6">
            {lastUpdated && (
                <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                    <span>Updated {formatDate(lastUpdated)}</span>
                </div>
            )}

            {readingTime && (
                <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                    <span>{readingTime} min read</span>
                </div>
            )}

            {meta && meta.totalViews > 0 && (
                <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                    <span>{meta.totalViews.toLocaleString()} views</span>
                </div>
            )}

            {meta && meta.helpfulnessScore > 0 && (
                <div className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z" />
                    </svg>
                    <span>{Math.round(meta.helpfulnessScore)}% found helpful</span>
                </div>
            )}
        </div>
    );
};
