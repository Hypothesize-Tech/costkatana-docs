import React, { useState, useEffect } from 'react';
import { useDocsAnalytics } from '../../contexts/DocsAnalyticsContext';

interface PageRatingProps {
    pageId: string;
    pagePath: string;
}

export const PageRating: React.FC<PageRatingProps> = ({ pageId, pagePath }) => {
    const { submitRating, getRatingStats, userRating } = useDocsAnalytics();
    const [stats, setStats] = useState<{ upvotes: number; downvotes: number } | null>(null);
    const [showThanks, setShowThanks] = useState(false);
    const currentRating = userRating[pageId];

    useEffect(() => {
        getRatingStats(pageId).then(data => {
            if (data) {
                setStats({ upvotes: data.upvotes, downvotes: data.downvotes });
            }
        });
    }, [pageId, getRatingStats]);

    const handleRating = async (rating: 'up' | 'down') => {
        await submitRating(pageId, pagePath, rating);
        setShowThanks(true);
        setTimeout(() => setShowThanks(false), 2000);

        setStats(prev => {
            if (!prev) return { upvotes: rating === 'up' ? 1 : 0, downvotes: rating === 'down' ? 1 : 0 };
            return {
                upvotes: rating === 'up' ? prev.upvotes + 1 : prev.upvotes,
                downvotes: rating === 'down' ? prev.downvotes + 1 : prev.downvotes,
            };
        });
    };

    return (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center gap-4">
                <p className="text-light-text-secondary dark:text-dark-text-secondary font-medium">
                    Was this page helpful?
                </p>

                <div className="flex items-center gap-3">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
                            ${currentRating === 'up'
                                ? 'bg-gradient-primary text-white shadow-lg shadow-primary-500/30'
                                : 'bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 hover:bg-primary-500/20 dark:hover:bg-primary-500/30'
                            }
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={() => handleRating('up')}
                        disabled={!!currentRating}
                        aria-label="Yes, this page was helpful"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                            <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z" />
                        </svg>
                        <span>Yes</span>
                        {stats && stats.upvotes > 0 && (
                            <span className="text-xs opacity-75">({stats.upvotes})</span>
                        )}
                    </button>

                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
                            ${currentRating === 'down'
                                ? 'bg-gradient-danger text-white shadow-lg shadow-danger-500/30'
                                : 'bg-secondary-500/10 dark:bg-secondary-500/20 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-500/20 dark:hover:bg-secondary-500/30'
                            }
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                        onClick={() => handleRating('down')}
                        disabled={!!currentRating}
                        aria-label="No, this page was not helpful"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                            <path d="M22 4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2V4zM2.17 11.12c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.45.52.86.88 1.22L10 22l6.41-6.41c.38-.38.59-.89.59-1.42V6.34C17 5.05 15.95 4 14.66 4h-8.1c-.71 0-1.36.37-1.72.97l-2.67 6.15z" />
                        </svg>
                        <span>No</span>
                        {stats && stats.downvotes > 0 && (
                            <span className="text-xs opacity-75">({stats.downvotes})</span>
                        )}
                    </button>
                </div>

                {showThanks && (
                    <div className="animate-fade-in text-primary-500 dark:text-primary-400 font-medium">
                        Thank you for your feedback!
                    </div>
                )}
            </div>
        </div>
    );
};
