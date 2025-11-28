import React, { useState } from 'react';
import { Send, X, Loader2 } from 'lucide-react';
import { useCommunity } from '../../contexts/CommunityContext';

interface Comment {
    _id: string;
    content: string;
}

interface CommentFormProps {
    pageId: string;
    pagePath: string;
    parentId?: string;
    editingComment?: Comment;
    onSuccess: () => void;
    onCancel?: () => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({
    pageId,
    pagePath,
    parentId,
    editingComment,
    onSuccess,
    onCancel,
}) => {
    const { createComment, updateComment } = useCommunity();
    const [content, setContent] = useState(editingComment?.content || '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);

        let result;
        if (editingComment) {
            result = await updateComment(editingComment._id, content);
        } else {
            result = await createComment(pageId, pagePath, content, parentId);
        }

        setIsSubmitting(false);

        if (result) {
            setContent('');
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder={parentId ? 'Write a reply...' : 'Share your thoughts...'}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                    bg-white dark:bg-dark-bg-200
                    text-light-text-primary dark:text-dark-text-primary
                    placeholder-light-text-muted dark:placeholder-dark-text-muted
                    focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
                    transition-all duration-200 resize-none"
                rows={parentId ? 2 : 3}
                maxLength={5000}
            />

            <div className="flex items-center justify-between">
                <span className="text-xs text-light-text-muted dark:text-dark-text-muted">
                    {content.length}/5000
                </span>

                <div className="flex items-center gap-2">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 rounded-xl text-sm font-medium
                                text-light-text-secondary dark:text-dark-text-secondary
                                hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <X className="w-4 h-4 inline mr-1" />
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting || !content.trim()}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                            text-white bg-gradient-to-r from-primary-500 to-primary-600
                            hover:from-primary-600 hover:to-primary-700
                            shadow-md shadow-primary-500/20
                            disabled:opacity-50 disabled:cursor-not-allowed
                            transition-all duration-200"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                {editingComment ? 'Saving...' : 'Posting...'}
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                {editingComment ? 'Save' : parentId ? 'Reply' : 'Post'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

