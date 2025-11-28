import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ThumbsUp, ThumbsDown, Eye, MessageCircle, Send, Loader2, Pin, Lock, User, Shield } from 'lucide-react';
import { useCommunity } from '../../contexts/CommunityContext';
import { AuthPrompt } from './AuthPrompt';

interface Reply {
    _id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    userRole?: 'user' | 'admin';
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
    userRole?: 'user' | 'admin';
    upvotes: string[];
    downvotes: string[];
    viewCount: number;
    replyCount: number;
    replies: Reply[];
    isPinned: boolean;
    isLocked: boolean;
    createdAt: string;
}

interface DiscussionThreadProps {
    discussionId: string;
    onBack: () => void;
}

export const DiscussionThread: React.FC<DiscussionThreadProps> = ({ discussionId, onBack }) => {
    const { user, isAuthenticated, getDiscussion, addReply, voteDiscussion } = useCommunity();
    const [discussion, setDiscussion] = useState<Discussion | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [replyContent, setReplyContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    const loadDiscussion = useCallback(async () => {
        setIsLoading(true);
        const result = await getDiscussion(discussionId);
        if (result) {
            setDiscussion({
                ...result,
                replies: result.replies || [],
            });
        } else {
            setDiscussion(null);
        }
        setIsLoading(false);
    }, [discussionId, getDiscussion]);

    useEffect(() => {
        loadDiscussion();
    }, [loadDiscussion]);

    const handleVote = async (voteType: 'up' | 'down') => {
        if (!isAuthenticated) {
            setShowAuthPrompt(true);
            return;
        }
        const updated = await voteDiscussion(discussionId, voteType);
        if (updated) {
            setDiscussion(prev => prev ? { ...prev, upvotes: updated.upvotes, downvotes: updated.downvotes } : null);
        }
    };

    const handleSubmitReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyContent.trim() || !isAuthenticated) return;

        setIsSubmitting(true);
        const updated = await addReply(discussionId, replyContent);
        setIsSubmitting(false);

        if (updated) {
            setDiscussion({
                ...updated,
                replies: updated.replies || [],
            });
            setReplyContent('');
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="animate-pulse">
                    <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
                    <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card">
                        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (!discussion) {
        return (
            <div className="max-w-4xl mx-auto text-center py-16">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-light-text-muted opacity-50" />
                <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    Discussion not found
                </h3>
                <button onClick={onBack} className="text-primary-500 hover:underline">
                    Go back
                </button>
            </div>
        );
    }

    const voteScore = discussion.upvotes.length - discussion.downvotes.length;
    const hasUpvoted = user && discussion.upvotes.includes(user._id);
    const hasDownvoted = user && discussion.downvotes.includes(user._id);

    return (
        <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 mb-6 text-light-text-secondary dark:text-dark-text-secondary
                    hover:text-primary-500 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Discussions
            </button>

            {/* Main Post */}
            <div className="p-6 rounded-2xl bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-700 mb-6">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
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

                <h1 className="text-2xl font-display font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                    {discussion.title}
                </h1>

                {/* Author */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 
                        flex items-center justify-center text-white font-semibold">
                        {discussion.userAvatar ? (
                            <img src={discussion.userAvatar} alt="" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            discussion.userName.charAt(0).toUpperCase()
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
                                {discussion.userName}
                            </p>
                            {discussion.userRole === 'admin' && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                                    bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                                    <Shield className="w-3 h-3" />
                                    Admin
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                            {formatDate(discussion.createdAt)}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
                    <p className="text-light-text-secondary dark:text-dark-text-secondary whitespace-pre-wrap">
                        {discussion.content}
                    </p>
                </div>

                {/* Tags */}
                {discussion.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {discussion.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-lg text-sm
                                bg-gray-100 dark:bg-gray-800 text-light-text-secondary dark:text-dark-text-secondary">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => handleVote('up')}
                            className={`p-2 rounded-lg transition-colors
                                ${hasUpvoted
                                    ? 'text-primary-500 bg-primary-500/10'
                                    : 'text-light-text-muted hover:text-primary-500 hover:bg-primary-500/10'
                                }`}
                        >
                            <ThumbsUp className="w-5 h-5" />
                        </button>
                        <span className={`text-lg font-semibold min-w-[30px] text-center
                            ${voteScore > 0 ? 'text-primary-500' : voteScore < 0 ? 'text-danger-500' : 'text-light-text-muted'}`}>
                            {voteScore}
                        </span>
                        <button
                            onClick={() => handleVote('down')}
                            className={`p-2 rounded-lg transition-colors
                                ${hasDownvoted
                                    ? 'text-danger-500 bg-danger-500/10'
                                    : 'text-light-text-muted hover:text-danger-500 hover:bg-danger-500/10'
                                }`}
                        >
                            <ThumbsDown className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-light-text-muted dark:text-dark-text-muted">
                        <span className="flex items-center gap-1.5">
                            <Eye className="w-4 h-4" />
                            {discussion.viewCount} views
                        </span>
                        <span className="flex items-center gap-1.5">
                            <MessageCircle className="w-4 h-4" />
                            {discussion.replyCount} replies
                        </span>
                    </div>
                </div>
            </div>

            {/* Replies */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                    Replies ({discussion.replies?.length || 0})
                </h3>

                {discussion.replies && discussion.replies.length > 0 ? (
                    <div className="space-y-4">
                        {discussion.replies.map(reply => (
                            <div
                                key={reply._id}
                                className="p-4 rounded-xl bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 
                                        flex items-center justify-center text-white text-sm font-semibold">
                                        {reply.userAvatar ? (
                                            <img src={reply.userAvatar} alt="" className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            reply.userName.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-light-text-primary dark:text-dark-text-primary">
                                                {reply.userName}
                                            </p>
                                            {reply.userRole === 'admin' && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                                                    bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                                                    <Shield className="w-3 h-3" />
                                                    Admin
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
                                            {formatDate(reply.createdAt)}
                                            {reply.isEdited && ' (edited)'}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-light-text-secondary dark:text-dark-text-secondary whitespace-pre-wrap">
                                    {reply.content}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-light-text-muted dark:text-dark-text-muted">
                        No replies yet. Be the first to respond!
                    </div>
                )}
            </div>

            {/* Reply Form */}
            {discussion.isLocked ? (
                <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-center text-light-text-muted dark:text-dark-text-muted">
                    <Lock className="w-5 h-5 mx-auto mb-2" />
                    This discussion is locked
                </div>
            ) : isAuthenticated ? (
                <form onSubmit={handleSubmitReply} className="p-4 rounded-xl bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-700">
                    <textarea
                        value={replyContent}
                        onChange={e => setReplyContent(e.target.value)}
                        placeholder="Write your reply..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                            bg-white dark:bg-dark-bg-200
                            text-light-text-primary dark:text-dark-text-primary
                            placeholder-light-text-muted
                            focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
                            resize-none"
                        rows={3}
                        maxLength={10000}
                    />
                    <div className="flex justify-end mt-3">
                        <button
                            type="submit"
                            disabled={isSubmitting || !replyContent.trim()}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold
                                text-white bg-gradient-to-r from-primary-500 to-primary-600
                                hover:from-primary-600 hover:to-primary-700
                                shadow-md shadow-primary-500/20
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-all duration-200"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Post Reply
                                </>
                            )}
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    onClick={() => setShowAuthPrompt(true)}
                    className="w-full p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700
                        text-light-text-muted dark:text-dark-text-muted
                        hover:border-primary-500 hover:text-primary-500 transition-colors
                        flex items-center justify-center gap-2"
                >
                    <User className="w-5 h-5" />
                    Sign in to reply
                </button>
            )}

            <AuthPrompt
                isOpen={showAuthPrompt}
                onClose={() => setShowAuthPrompt(false)}
                message="Sign in to participate in discussions"
            />
        </div>
    );
};

