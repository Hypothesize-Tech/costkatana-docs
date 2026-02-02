import React, { useState, useEffect } from 'react';
import { Code, ThumbsUp, ThumbsDown, Eye, Clock, Filter, Plus, Search } from 'lucide-react';
import { useCommunity } from '../../contexts/CommunityContext';
import { ExampleSubmitForm } from './ExampleSubmitForm';
import { AuthPrompt } from './AuthPrompt';

interface UserExample {
    _id: string;
    title: string;
    description: string;
    code: string;
    language: string;
    category: string;
    tags: string[];
    userName: string;
    userAvatar?: string;
    upvotes: string[];
    downvotes: string[];
    viewCount: number;
    createdAt: string;
}

const CATEGORIES = [
    { value: '', label: 'All Categories' },
    { value: 'getting-started', label: 'Getting Started' },
    { value: 'integration', label: 'Integration' },
    { value: 'optimization', label: 'Optimization' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'gateway', label: 'Gateway' },
    { value: 'agent_trace', label: 'Agent Trace' },
    { value: 'other', label: 'Other' },
];

const LANGUAGES = [
    { value: '', label: 'All Languages' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'bash', label: 'Bash' },
    { value: 'json', label: 'JSON' },
    { value: 'yaml', label: 'YAML' },
];

export const UserExamplesGallery: React.FC = () => {
    const { user, isAuthenticated, getExamples, voteExample } = useCommunity();
    const [examples, setExamples] = useState<UserExample[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [category, setCategory] = useState('');
    const [language, setLanguage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSubmitForm, setShowSubmitForm] = useState(false);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const [selectedExample, setSelectedExample] = useState<UserExample | null>(null);

    useEffect(() => {
        loadExamples();
    }, [category, language, page]);

    const loadExamples = async () => {
        setIsLoading(true);
        const result = await getExamples({ page, category, language });
        if (page === 1) {
            setExamples(result.examples);
        } else {
            setExamples(prev => [...prev, ...result.examples]);
        }
        setTotal(result.total);
        setHasMore(result.hasMore);
        setIsLoading(false);
    };

    const handleVote = async (exampleId: string, voteType: 'up' | 'down') => {
        if (!isAuthenticated) {
            setShowAuthPrompt(true);
            return;
        }
        const updated = await voteExample(exampleId, voteType);
        if (updated) {
            setExamples(prev => prev.map(e =>
                e._id === exampleId ? { ...e, upvotes: updated.upvotes, downvotes: updated.downvotes } : e
            ));
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getLanguageColor = (lang: string) => {
        const colors: Record<string, string> = {
            typescript: 'bg-blue-500',
            javascript: 'bg-yellow-500',
            python: 'bg-green-500',
            bash: 'bg-gray-500',
            json: 'bg-orange-500',
            yaml: 'bg-purple-500',
        };
        return colors[lang] || 'bg-gray-500';
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
                        Community Examples
                    </h1>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary">
                        {total} examples shared by the community
                    </p>
                </div>
                <button
                    onClick={() => {
                        if (!isAuthenticated) {
                            setShowAuthPrompt(true);
                        } else {
                            setShowSubmitForm(true);
                        }
                    }}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold
                        text-white bg-gradient-to-r from-primary-500 to-primary-600
                        hover:from-primary-600 hover:to-primary-700
                        shadow-lg shadow-primary-500/25 transition-all duration-200"
                >
                    <Plus className="w-5 h-5" />
                    Submit Example
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6 p-4 rounded-xl bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-700">
                <Filter className="w-5 h-5 text-light-text-muted dark:text-dark-text-muted" />

                <select
                    value={category}
                    onChange={e => { setCategory(e.target.value); setPage(1); }}
                    className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700
                        bg-white dark:bg-dark-bg-200 text-sm
                        text-light-text-primary dark:text-dark-text-primary
                        focus:outline-none focus:border-primary-500"
                >
                    {CATEGORIES.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                </select>

                <select
                    value={language}
                    onChange={e => { setLanguage(e.target.value); setPage(1); }}
                    className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700
                        bg-white dark:bg-dark-bg-200 text-sm
                        text-light-text-primary dark:text-dark-text-primary
                        focus:outline-none focus:border-primary-500"
                >
                    {LANGUAGES.map(lang => (
                        <option key={lang.value} value={lang.value}>{lang.label}</option>
                    ))}
                </select>

                <div className="flex-1 min-w-[200px] relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-text-muted" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search examples..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700
                            bg-white dark:bg-dark-bg-200 text-sm
                            text-light-text-primary dark:text-dark-text-primary
                            placeholder-light-text-muted
                            focus:outline-none focus:border-primary-500"
                    />
                </div>
            </div>

            {/* Examples Grid */}
            {isLoading && page === 1 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="p-5 rounded-2xl bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-700 animate-pulse">
                            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                    ))}
                </div>
            ) : examples.length === 0 ? (
                <div className="text-center py-16">
                    <Code className="w-16 h-16 mx-auto mb-4 text-light-text-muted dark:text-dark-text-muted opacity-50" />
                    <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                        No examples found
                    </h3>
                    <p className="text-light-text-muted dark:text-dark-text-muted mb-6">
                        Be the first to share an example with the community!
                    </p>
                    <button
                        onClick={() => setShowSubmitForm(true)}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold
                            text-white bg-gradient-to-r from-primary-500 to-primary-600"
                    >
                        <Plus className="w-5 h-5" />
                        Submit Example
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {examples.map(example => {
                            const voteScore = example.upvotes.length - example.downvotes.length;
                            const hasUpvoted = user && example.upvotes.includes(user._id);
                            const hasDownvoted = user && example.downvotes.includes(user._id);

                            return (
                                <div
                                    key={example._id}
                                    className="group p-5 rounded-2xl bg-light-card dark:bg-dark-card 
                                        border border-gray-200 dark:border-gray-700
                                        hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10
                                        transition-all duration-300 cursor-pointer"
                                    onClick={() => setSelectedExample(example)}
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary 
                                            group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
                                            {example.title}
                                        </h3>
                                        <span className={`shrink-0 px-2 py-1 rounded-md text-xs font-medium text-white ${getLanguageColor(example.language)}`}>
                                            {example.language}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary line-clamp-2 mb-4">
                                        {example.description}
                                    </p>

                                    {/* Code Preview */}
                                    <div className="p-3 rounded-xl bg-gray-900 dark:bg-black mb-4 overflow-hidden">
                                        <pre className="text-xs text-gray-300 line-clamp-3 font-mono">
                                            {example.code}
                                        </pre>
                                    </div>

                                    {/* Tags */}
                                    {example.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {example.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="px-2 py-0.5 rounded-md text-xs
                                                    bg-primary-500/10 text-primary-600 dark:text-primary-400">
                                                    {tag}
                                                </span>
                                            ))}
                                            {example.tags.length > 3 && (
                                                <span className="px-2 py-0.5 rounded-md text-xs text-light-text-muted">
                                                    +{example.tags.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-3 text-xs text-light-text-muted dark:text-dark-text-muted">
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-3.5 h-3.5" />
                                                {example.viewCount}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {formatDate(example.createdAt)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                            <button
                                                onClick={() => handleVote(example._id, 'up')}
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
                                                onClick={() => handleVote(example._id, 'down')}
                                                className={`p-1.5 rounded-lg transition-colors
                                                    ${hasDownvoted
                                                        ? 'text-danger-500 bg-danger-500/10'
                                                        : 'text-light-text-muted hover:text-danger-500 hover:bg-danger-500/10'
                                                    }`}
                                            >
                                                <ThumbsDown className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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

            {/* Example Detail Modal */}
            {selectedExample && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    onClick={() => setSelectedExample(null)}
                >
                    <div
                        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl
                            bg-white dark:bg-dark-bg-300 border border-gray-200 dark:border-gray-700 shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <h2 className="text-2xl font-display font-bold text-light-text-primary dark:text-dark-text-primary">
                                    {selectedExample.title}
                                </h2>
                                <span className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium text-white ${getLanguageColor(selectedExample.language)}`}>
                                    {selectedExample.language}
                                </span>
                            </div>

                            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                                {selectedExample.description}
                            </p>

                            <div className="rounded-xl bg-gray-900 dark:bg-black p-4 overflow-x-auto mb-6">
                                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                                    {selectedExample.code}
                                </pre>
                            </div>

                            <div className="flex items-center justify-between text-sm text-light-text-muted dark:text-dark-text-muted">
                                <span>By {selectedExample.userName} on {formatDate(selectedExample.createdAt)}</span>
                                <span>{selectedExample.viewCount} views</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Submit Form Modal */}
            {showSubmitForm && (
                <ExampleSubmitForm
                    onClose={() => setShowSubmitForm(false)}
                    onSuccess={() => {
                        setShowSubmitForm(false);
                        setPage(1);
                        loadExamples();
                    }}
                />
            )}

            <AuthPrompt
                isOpen={showAuthPrompt}
                onClose={() => setShowAuthPrompt(false)}
                message="Sign in to share examples"
            />
        </div>
    );
};

