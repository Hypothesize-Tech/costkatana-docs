import React, { useState, useEffect, useCallback } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Reply, Edit2, Trash2, ChevronDown, User, Shield } from 'lucide-react';
import { useCommunity } from '../../contexts/CommunityContext';
import { CommentForm } from './CommentForm';
import { AuthPrompt } from './AuthPrompt';

interface Comment {
    _id: string;
    pageId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    userRole?: 'user' | 'admin';
    content: string;
    parentId?: string;
    upvotes: string[];
    downvotes: string[];
    isEdited: boolean;
    replyCount: number;
    createdAt: string;
}

interface CommentsSectionProps {
    pageId: string;
    pagePath: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ pageId, pagePath }) => {
    const { user, isAuthenticated, getComments, getCommentReplies, voteComment, deleteComment } = useCommunity();
    const [comments, setComments] = useState<Comment[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
    const [replies, setReplies] = useState<Record<string, Comment[]>>({});
    const [loadingReplies, setLoadingReplies] = useState<Set<string>>(new Set());

    const loadComments = useCallback(async () => {
        setIsLoading(true);
        const result = await getComments(pageId, { sortBy });
        setComments(result.comments);
        setTotal(result.total);
        setIsLoading(false);
    }, [pageId, sortBy, getComments]);

    useEffect(() => {
        loadComments();
    }, [loadComments]);

    const handleVote = async (commentId: string, voteType: 'up' | 'down', isReply = false, parentId?: string) => {
        if (!isAuthenticated) {
            setShowAuthPrompt(true);
            return;
        }
        const updated = await voteComment(commentId, voteType);
        if (updated) {
            if (isReply && parentId) {
                // Update reply in replies state
                setReplies(prev => ({
                    ...prev,
                    [parentId]: (prev[parentId] || []).map(r =>
                        r._id === commentId
                            ? { ...r, upvotes: updated.upvotes, downvotes: updated.downvotes }
                            : r
                    )
                }));
            } else {
                // Update main comment
                setComments(prev => prev.map(c => c._id === commentId ? { ...c, upvotes: updated.upvotes, downvotes: updated.downvotes } : c));
            }
        }
    };

    const handleDelete = async (commentId: string, isReply = false, parentId?: string) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            const success = await deleteComment(commentId);
            if (success) {
                if (isReply && parentId) {
                    // Remove reply from replies state
                    setReplies(prev => ({
                        ...prev,
                        [parentId]: (prev[parentId] || []).filter(r => r._id !== commentId)
                    }));
                    // Reload parent comment to update reply count
                    loadComments();
                } else {
                    loadComments();
                }
            }
        }
    };

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

    const loadReplies = async (commentId: string) => {
        if (replies[commentId] || loadingReplies.has(commentId)) return;

        setLoadingReplies(prev => new Set(prev).add(commentId));
        const fetchedReplies = await getCommentReplies(commentId);
        setReplies(prev => ({ ...prev, [commentId]: fetchedReplies }));
        setLoadingReplies(prev => {
            const newSet = new Set(prev);
            newSet.delete(commentId);
            return newSet;
        });
    };

    const handleToggleReplies = (commentId: string) => {
        const newExpanded = new Set(expandedReplies);
        if (newExpanded.has(commentId)) {
            newExpanded.delete(commentId);
        } else {
            newExpanded.add(commentId);
            loadReplies(commentId);
        }
        setExpandedReplies(newExpanded);
    };

    const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply }) => {
        // Normalize both IDs to strings for comparison
        // Handle both ObjectId objects and strings from backend
        const currentUserId = user?._id ? String(user._id).trim() : null;
        const commentUserId = comment.userId
            ? String(comment.userId).trim()
            : null;

        // Strict comparison - only show edit/delete if user is the actual owner
        // Removed admin check - only owners can edit their own comments
        const isOwner = currentUserId && commentUserId && currentUserId === commentUserId;
        const canEdit = isOwner;
        const hasUpvoted = user && comment.upvotes.includes(user._id);
        const hasDownvoted = user && comment.downvotes.includes(user._id);
        const voteScore = comment.upvotes.length - comment.downvotes.length;

        return (
            <div className={`${isReply ? 'ml-12 pl-6 mt-3 border-l-2 border-gray-200 dark:border-gray-700' : ''}`}>
                <div className="group p-4 rounded-xl bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-700
                    hover:border-primary-500/30 transition-colors">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 
                            flex items-center justify-center text-white text-sm font-semibold">
                            {comment.userAvatar ? (
                                <img src={comment.userAvatar} alt="" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                comment.userName.charAt(0).toUpperCase()
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="font-medium text-light-text-primary dark:text-dark-text-primary truncate">
                                    {comment.userName}
                                </p>
                                {comment.userRole === 'admin' && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                                        bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                                        <Shield className="w-3 h-3" />
                                        Admin
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
                                {formatDate(comment.createdAt)}
                                {comment.isEdited && <span className="ml-1">(edited)</span>}
                            </p>
                        </div>
                        {canEdit && (
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => setEditingId(comment._id)}
                                    className="p-1.5 rounded-lg text-light-text-muted hover:text-primary-500 
                                        hover:bg-primary-500/10 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(comment._id, isReply, comment.parentId)}
                                    className="p-1.5 rounded-lg text-light-text-muted hover:text-danger-500 
                                        hover:bg-danger-500/10 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    {editingId === comment._id ? (
                        <CommentForm
                            pageId={pageId}
                            pagePath={pagePath}
                            editingComment={comment}
                            onSuccess={() => {
                                setEditingId(null);
                                loadComments();
                            }}
                            onCancel={() => setEditingId(null)}
                        />
                    ) : (
                        <p className="text-light-text-secondary dark:text-dark-text-secondary whitespace-pre-wrap">
                            {comment.content}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => handleVote(comment._id, 'up', isReply, comment.parentId)}
                                className={`p-1.5 rounded-lg transition-colors
                                    ${hasUpvoted
                                        ? 'text-primary-500 bg-primary-500/10'
                                        : 'text-light-text-muted hover:text-primary-500 hover:bg-primary-500/10'
                                    }`}
                            >
                                <ThumbsUp className="w-4 h-4" />
                            </button>
                            <span className={`text-sm font-medium min-w-[20px] text-center
                                ${voteScore > 0 ? 'text-primary-500' : voteScore < 0 ? 'text-danger-500' : 'text-light-text-muted'}`}>
                                {voteScore}
                            </span>
                            <button
                                onClick={() => handleVote(comment._id, 'down', isReply, comment.parentId)}
                                className={`p-1.5 rounded-lg transition-colors
                                    ${hasDownvoted
                                        ? 'text-danger-500 bg-danger-500/10'
                                        : 'text-light-text-muted hover:text-danger-500 hover:bg-danger-500/10'
                                    }`}
                            >
                                <ThumbsDown className="w-4 h-4" />
                            </button>
                        </div>

                        {!isReply && (
                            <button
                                onClick={() => {
                                    if (!isAuthenticated) {
                                        setShowAuthPrompt(true);
                                    } else {
                                        setReplyingTo(replyingTo === comment._id ? null : comment._id);
                                    }
                                }}
                                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-sm
                                    text-light-text-muted hover:text-primary-500 hover:bg-primary-500/10 transition-colors"
                            >
                                <Reply className="w-4 h-4" />
                                Reply
                            </button>
                        )}

                        {comment.replyCount > 0 && !isReply && (
                            <button
                                onClick={() => handleToggleReplies(comment._id)}
                                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-sm
                                    text-light-text-muted hover:text-primary-500 hover:bg-primary-500/10 transition-colors"
                            >
                                <ChevronDown className={`w-4 h-4 transition-transform ${expandedReplies.has(comment._id) ? 'rotate-180' : ''}`} />
                                {comment.replyCount} {comment.replyCount === 1 ? 'reply' : 'replies'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Replies */}
                {expandedReplies.has(comment._id) && !isReply && (
                    <div className="mt-4 space-y-3">
                        {loadingReplies.has(comment._id) ? (
                            <div className="ml-12 pl-6 text-sm text-light-text-muted dark:text-dark-text-muted">
                                Loading replies...
                            </div>
                        ) : replies[comment._id] && replies[comment._id].length > 0 ? (
                            replies[comment._id].map(reply => (
                                <CommentItem key={reply._id} comment={reply} isReply={true} />
                            ))
                        ) : (
                            <div className="ml-12 pl-6 text-sm text-light-text-muted dark:text-dark-text-muted">
                                No replies yet
                            </div>
                        )}
                    </div>
                )}

                {/* Reply Form */}
                {replyingTo === comment._id && (
                    <div className="mt-3 ml-12 pl-6">
                        <CommentForm
                            pageId={pageId}
                            pagePath={pagePath}
                            parentId={comment._id}
                            onSuccess={() => {
                                setReplyingTo(null);
                                // Reload replies if they're expanded
                                if (expandedReplies.has(comment._id)) {
                                    loadReplies(comment._id);
                                }
                                loadComments();
                            }}
                            onCancel={() => setReplyingTo(null)}
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary-500/10">
                        <MessageSquare className="w-5 h-5 text-primary-500" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-light-text-primary dark:text-dark-text-primary">
                        Comments ({total})
                    </h3>
                </div>

                <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as 'newest' | 'oldest' | 'popular')}
                    className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700
                        bg-white dark:bg-dark-bg-200 text-sm
                        text-light-text-primary dark:text-dark-text-primary
                        focus:outline-none focus:border-primary-500"
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="popular">Most Popular</option>
                </select>
            </div>

            {/* Add Comment Form */}
            {isAuthenticated ? (
                <div className="mb-6">
                    <CommentForm
                        pageId={pageId}
                        pagePath={pagePath}
                        onSuccess={loadComments}
                    />
                </div>
            ) : (
                <button
                    onClick={() => setShowAuthPrompt(true)}
                    className="w-full mb-6 p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700
                        text-light-text-muted dark:text-dark-text-muted
                        hover:border-primary-500 hover:text-primary-500 transition-colors
                        flex items-center justify-center gap-2"
                >
                    <User className="w-5 h-5" />
                    Sign in to leave a comment
                </button>
            )}

            {/* Comments List */}
            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="p-4 rounded-xl bg-light-card dark:bg-dark-card animate-pulse">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                                <div className="flex-1">
                                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                                </div>
                            </div>
                            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                    ))}
                </div>
            ) : comments.length === 0 ? (
                <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-light-text-muted dark:text-dark-text-muted opacity-50" />
                    <p className="text-light-text-muted dark:text-dark-text-muted">
                        No comments yet. Be the first to comment!
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} />
                    ))}
                </div>
            )}

            <AuthPrompt
                isOpen={showAuthPrompt}
                onClose={() => setShowAuthPrompt(false)}
                message="Sign in to join the discussion"
            />
        </div>
    );
};

