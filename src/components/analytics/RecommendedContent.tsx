import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight, Loader2 } from 'lucide-react';
import { useRecommendations } from '../../hooks/useRecommendations';

interface RecommendedContentProps {
    currentPageId?: string;
    maxItems?: number;
}

export const RecommendedContent: React.FC<RecommendedContentProps> = ({
    currentPageId,
    maxItems = 3
}) => {
    const { recommendations, isLoading } = useRecommendations();

    const filteredRecommendations = recommendations
        .filter(r => r.pageId !== currentPageId)
        .slice(0, maxItems);

    if (isLoading) {
        return (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-6">
                    <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
                    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="grid gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (filteredRecommendations.length === 0) {
        return null;
    }

    return (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="flex items-center gap-2 text-lg font-display font-semibold text-light-text-primary dark:text-dark-text-primary mb-6">
                <Sparkles className="w-5 h-5 text-primary-500" />
                Recommended for You
            </h3>

            <div className="grid gap-4">
                {filteredRecommendations.map((item, index) => (
                    <Link
                        key={item.pageId}
                        to={item.pagePath}
                        className="group flex items-start gap-4 p-4 rounded-xl
                            bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-700
                            hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10
                            transition-all duration-300 animate-fade-in w-full"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex-1 min-w-0 overflow-hidden">
                            <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary 
                                group-hover:text-primary-600 dark:group-hover:text-primary-400 
                                transition-colors break-words mb-1">
                                {item.title}
                            </h4>
                            <p className="text-sm text-light-text-muted dark:text-dark-text-muted 
                                break-words line-clamp-2">
                                {item.reason}
                            </p>
                        </div>
                        <ChevronRight
                            className="w-5 h-5 flex-shrink-0 mt-0.5 text-light-text-muted dark:text-dark-text-muted
                                group-hover:text-primary-500 group-hover:translate-x-1 transition-all"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};
