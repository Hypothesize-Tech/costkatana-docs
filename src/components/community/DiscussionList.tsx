import React, { useState, useEffect, useCallback } from 'react';
import { MessageCircle, ThumbsUp, Eye, Clock, Plus, Pin, Lock, ArrowRight } from 'lucide-react';
import { useCommunity } from '../../contexts/CommunityContext';
import { AuthPrompt } from './AuthPrompt';

interface Discussion {
    _id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    userName: string;
    userAvatar?: string;
    upvotes: string[];
    viewCount: number;
    replyCount: number;
    isPinned: boolean;
    isLocked: boolean;
    lastActivityAt: string;
    createdAt: string;
}

interface DiscussionListProps {
    onSelectDiscussion: (discussionId: string) => void;
    onCreateDiscussion: () => void;
}

const CATEGORIES = [
    { value: '', label: 'All Categories', icon: MessageCircle },
    { value: 'general', label: 'General', icon: MessageCircle },
    { value: 'help', label: 'Help & Support', icon: MessageCircle },
    { value: 'feature-request', label: 'Feature Requests', icon: MessageCircle },
    { value: 'bug-report', label: 'Bug Reports', icon: MessageCircle },
    { value: 'showcase', label: 'Showcase', icon: MessageCircle },
    { value: 'tutorial', label: 'Tutorials', icon: MessageCircle },
];

export const DiscussionList: React.FC<DiscussionListProps> = ({ onSelectDiscussion, onCreateDiscussion }) => {
    const { isAuthenticated, getDiscussions } = useCommunity();
    const [discussions, setDiscussions] = useState<Discussion[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [category, setCategory] = useState('');
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    const loadDiscussions = useCallback(async () => {
        setIsLoading(true);
        const result = await getDiscussions({ page, category });
        if (page === 1) {
            setDiscussions(result.discussions);
        } else {
            setDiscussions(prev => [...prev, ...result.discussions]);
        }
        setTotal(result.total);
        setHasMore(result.hasMore);
        setIsLoading(false);
    }, [page, category, getDiscussions]);

    useEffect(() => {
        loadDiscussions();
    }, [loadDiscussions]);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            if (hours === 0) {
                const minutes = Math.floor(diff / (1000 * 60));
                return minutes <= 1 ? 'just now' : `${minutes}m ago`;
            }
            return `${hours}h ago`;
        }
        if (days === 1) return 'yesterday';
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    const getCategoryColor = (cat: string) => {
        const colors: Record<string, string> = {
            general: 'bg-gray-500',
            help: 'bg-blue-500',
            'feature-request': 'bg-purple-500',
            'bug-report': 'bg-red-500',
            showcase: 'bg-green-500',
            tutorial: 'bg-orange-500',
        };
        return colors[cat] || 'bg-gray-500';
    };

    const handleCreateClick = () => {
        if (!isAuthenticated) {
            setShowAuthPrompt(true);
        } else {
            onCreateDiscussion();
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
                        Discussions
                    </h1>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                        {total} topics in the community
                    </p>
                </div>
                <button
                    onClick={handleCreateClick}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold
                        text-white bg-gradient-to-r from-primary-500 to-primary-600
                        hover:from-primary-600 hover:to-primary-700
                        shadow-lg shadow-primary-500/25 transition-all duration-200"
                >
                    <Plus className="w-5 h-5" />
                    New Discussion
                </button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.value}
                        onClick={() => { setCategory(cat.value); setPage(1); }}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                            ${category === cat.value
                                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                                : 'bg-light-card dark:bg-dark-card text-light-text-secondary dark:text-dark-text-secondary hover:bg-primary-500/10'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Discussions List */}
            {isLoading && page === 1 ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="p-5 rounded-2xl bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-700 animate-pulse">
                            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                            <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                    ))}
                </div>
            ) : discussions.length === 0 ? (
                <div className="text-center py-16">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-light-text-muted dark:text-dark-text-muted opacity-50" />
                    <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                        No discussions yet
                    </h3>
                    <p className="text-light-text-muted dark:text-dark-text-muted mb-6">
                        Start a conversation with the community!
                    </p>
                    <button
                        onClick={handleCreateClick}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold
                            text-white bg-gradient-to-r from-primary-500 to-primary-600"
                    >
                        <Plus className="w-5 h-5" />
                        Start Discussion
                    </button>
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        {discussions.map(discussion => (
                            <div
                                key={discussion._id}
                                onClick={() => onSelectDiscussion(discussion._id)}
                                className={`group p-5 rounded-2xl cursor-pointer transition-all duration-300
                                    bg-light-card dark:bg-dark-card 
                                    border border-gray-200 dark:border-gray-700
                                    hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10
                                    ${discussion.isPinned ? 'ring-2 ring-primary-500/20' : ''}`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 
                                        flex items-center justify-center text-white font-semibold">
                                        {discussion.userAvatar ? (
                                            <img src={discussion.userAvatar} alt="" className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            discussion.userName.charAt(0).toUpperCase()
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            {discussion.isPinned && (
                                                <Pin className="w-4 h-4 text-primary-500" />
                                            )}
                                            {discussion.isLocked && (
                                                <Lock className="w-4 h-4 text-light-text-muted" />
                                            )}
                                            <span className={`px-2 py-0.5 rounded-md text-xs font-medium text-white ${getCategoryColor(discussion.category)}`}>
                                                {discussion.category.replace('-', ' ')}
                                            </span>
                                        </div>

                                        <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary 
                                            group-hover:text-primary-600 dark:group-hover:text-primary-400 
                                            line-clamp-1 mb-1">
                                            {discussion.title}
                                        </h3>

                                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-clamp-2 mb-3">
                                            {discussion.content}
                                        </p>

                                        {/* Tags */}
                                        {discussion.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {discussion.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="px-2 py-0.5 rounded-md text-xs
                                                        bg-gray-100 dark:bg-gray-800 text-light-text-muted dark:text-dark-text-muted">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Meta */}
                                        <div className="flex items-center gap-4 text-xs text-light-text-muted dark:text-dark-text-muted">
                                            <span>{discussion.userName}</span>
                                            <span className="flex items-center gap-1">
                                                <ThumbsUp className="w-3.5 h-3.5" />
                                                {discussion.upvotes.length}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MessageCircle className="w-3.5 h-3.5" />
                                                {discussion.replyCount}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-3.5 h-3.5" />
                                                {discussion.viewCount}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {formatDate(discussion.lastActivityAt)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <ArrowRight className="shrink-0 w-5 h-5 text-light-text-muted 
                                        group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More */}
                    {hasMore && (
                        <div className="text-center mt-8">
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={isLoading}
                                className="px-6 py-3 rounded-xl font-medium
                                    text-primary-600 dark:text-primary-400
                                    bg-primary-500/10 hover:bg-primary-500/20
                                    transition-colors"
                            >
                                {isLoading ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    )}
                </>
            )}

            <AuthPrompt
                isOpen={showAuthPrompt}
                onClose={() => setShowAuthPrompt(false)}
                message="Sign in to start a discussion"
            />
        </div>
    );
};

