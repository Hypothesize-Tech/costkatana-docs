import React, { useState } from 'react';
import { MessageSquare, X, Bug, Lightbulb, HelpCircle, FileText, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useDocsAnalytics } from '../../contexts/DocsAnalyticsContext';

interface FeedbackWidgetProps {
    pageId: string;
    pagePath: string;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    showButton?: boolean;
}

type FeedbackType = 'bug' | 'improvement' | 'question' | 'other';

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
    pageId,
    pagePath,
    isOpen: externalIsOpen,
    onOpenChange,
    showButton = true
}) => {
    const { submitFeedback } = useDocsAnalytics();
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
    const setIsOpen = (open: boolean) => {
        if (onOpenChange) {
            onOpenChange(open);
        } else {
            setInternalIsOpen(open);
        }
    };
    const [feedbackType, setFeedbackType] = useState<FeedbackType>('improvement');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSubmitting(true);
        await submitFeedback(pageId, pagePath, feedbackType, message, email || undefined);
        setIsSubmitting(false);
        setSubmitted(true);

        setTimeout(() => {
            setIsOpen(false);
            setSubmitted(false);
            setMessage('');
            setEmail('');
        }, 2000);
    };

    const feedbackTypes: { value: FeedbackType; label: string; icon: React.ReactNode; description: string }[] = [
        { value: 'bug', label: 'Bug Report', icon: <Bug className="w-5 h-5" />, description: 'Something isn\'t working' },
        { value: 'improvement', label: 'Suggestion', icon: <Lightbulb className="w-5 h-5" />, description: 'Ideas to improve' },
        { value: 'question', label: 'Question', icon: <HelpCircle className="w-5 h-5" />, description: 'Need clarification' },
        { value: 'other', label: 'Other', icon: <FileText className="w-5 h-5" />, description: 'General feedback' },
    ];

    return (
        <>
            {/* Floating Feedback Button - Only show if showButton is true */}
            {showButton && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50
                        flex items-center gap-3 px-5 py-3.5 rounded-full
                        bg-transparent backdrop-blur-md
                        border-2 border-primary-500/30 dark:border-primary-400/30
                        text-primary-600 dark:text-primary-400
                        hover:border-primary-500 dark:hover:border-primary-400
                        hover:bg-primary-500/10 dark:hover:bg-primary-500/20
                        shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30
                        transition-all duration-300 hover:scale-105
                        group"
                    aria-label="Send feedback"
                >
                    <div className="p-2 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md group-hover:shadow-lg transition-shadow">
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-sm whitespace-nowrap hidden sm:block">
                        Share Feedback
                    </span>
                </button>
            )}

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Modal Content */}
                    <div
                        className="w-full max-w-lg rounded-3xl overflow-hidden
                            bg-white dark:bg-dark-bg-300 
                            border border-gray-200 dark:border-gray-700
                            shadow-2xl shadow-black/20"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="relative px-6 py-5 border-b border-gray-200 dark:border-gray-700
                            bg-gradient-to-r from-primary-500/10 via-transparent to-primary-500/5">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-display font-bold text-light-text-primary dark:text-dark-text-primary">
                                        Send Feedback
                                    </h3>
                                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                                        Help us improve our documentation
                                    </p>
                                </div>
                            </div>
                            <button
                                className="absolute top-4 right-4 p-2 rounded-xl 
                                    text-light-text-muted dark:text-dark-text-muted
                                    hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            {submitted ? (
                                <div className="flex flex-col items-center gap-4 py-12">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-success-500 to-success-600 
                                        flex items-center justify-center shadow-xl shadow-success-500/30">
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-1">
                                            Thank you!
                                        </p>
                                        <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                                            Your feedback has been submitted successfully
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Feedback Type Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">
                                            What type of feedback?
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {feedbackTypes.map(type => (
                                                <button
                                                    key={type.value}
                                                    type="button"
                                                    className={`flex items-start gap-3 p-4 rounded-xl text-left
                                                        transition-all duration-200 border-2
                                                        ${feedbackType === type.value
                                                            ? 'border-primary-500 bg-primary-500/10 dark:bg-primary-500/20'
                                                            : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark-bg-200 hover:border-primary-300 dark:hover:border-primary-700'
                                                        }`}
                                                    onClick={() => setFeedbackType(type.value)}
                                                >
                                                    <div className={`p-2 rounded-lg shrink-0 transition-colors
                                                        ${feedbackType === type.value
                                                            ? 'bg-primary-500 text-white'
                                                            : 'bg-gray-200 dark:bg-gray-700 text-light-text-muted dark:text-dark-text-muted'
                                                        }`}>
                                                        {type.icon}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className={`font-medium text-sm truncate
                                                            ${feedbackType === type.value
                                                                ? 'text-primary-600 dark:text-primary-400'
                                                                : 'text-light-text-primary dark:text-dark-text-primary'
                                                            }`}>
                                                            {type.label}
                                                        </p>
                                                        <p className="text-xs text-light-text-muted dark:text-dark-text-muted truncate">
                                                            {type.description}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Message Textarea */}
                                    <div>
                                        <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                            Your feedback
                                        </label>
                                        <textarea
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                                bg-white dark:bg-dark-bg-200
                                                text-light-text-primary dark:text-dark-text-primary
                                                placeholder-light-text-muted dark:placeholder-dark-text-muted
                                                focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
                                                transition-all duration-200 resize-none"
                                            placeholder="Tell us what you think..."
                                            value={message}
                                            onChange={e => setMessage(e.target.value)}
                                            rows={4}
                                            maxLength={2000}
                                            required
                                        />
                                        <p className="mt-1.5 text-xs text-light-text-muted dark:text-dark-text-muted text-right">
                                            {message.length}/2000
                                        </p>
                                    </div>

                                    {/* Email Input */}
                                    <div>
                                        <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                            Email <span className="text-light-text-muted dark:text-dark-text-muted font-normal">(optional)</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700
                                                bg-white dark:bg-dark-bg-200
                                                text-light-text-primary dark:text-dark-text-primary
                                                placeholder-light-text-muted dark:placeholder-dark-text-muted
                                                focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
                                                transition-all duration-200"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <p className="mt-1.5 text-xs text-light-text-muted dark:text-dark-text-muted">
                                            We'll only use this to follow up on your feedback
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl
                                            font-semibold text-white
                                            bg-gradient-to-r from-primary-500 to-primary-600
                                            hover:from-primary-600 hover:to-primary-700
                                            shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30
                                            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg
                                            transition-all duration-200"
                                        disabled={isSubmitting || !message.trim()}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Feedback
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
