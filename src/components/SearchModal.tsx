import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Code, Book, ChevronRight, Sparkles, Loader2, Brain } from 'lucide-react';
import Fuse from 'fuse.js';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SearchResult {
    title: string;
    path: string;
    category: string;
    content: string;
    icon: React.ReactNode;
}

// Search data - in production, this would be generated from markdown files
const searchData: SearchResult[] = [
    // Getting Started
    { title: 'Introduction', path: '/getting-started/introduction', category: 'Getting Started', content: 'Learn what Cost Katana is and how it can help optimize your AI costs', icon: <Book size={16} /> },
    { title: 'Quick Start', path: '/getting-started/quick-start', category: 'Getting Started', content: 'Get up and running with Cost Katana in minutes', icon: <FileText size={16} /> },
    { title: 'Installation', path: '/getting-started/installation', category: 'Getting Started', content: 'Detailed installation instructions for all platforms', icon: <Code size={16} /> },

    // Features
    { title: 'Dashboard', path: '/features/dashboard', category: 'Features', content: 'Real-time monitoring and insights dashboard', icon: <FileText size={16} /> },
    { title: 'Usage Tracking', path: '/features/usage-tracking', category: 'Features', content: 'Track your AI usage across all providers', icon: <FileText size={16} /> },
    { title: 'Cost Analytics', path: '/features/analytics', category: 'Features', content: 'Advanced cost analysis and reporting', icon: <FileText size={16} /> },
    { title: 'AI Optimization', path: '/features/optimization', category: 'Features', content: 'Intelligent cost reduction strategies', icon: <FileText size={16} /> },
    { title: 'Predictive Intelligence', path: '/features/predictive-intelligence', category: 'Features', content: 'AI-powered cost forecasting', icon: <FileText size={16} /> },
    { title: 'Projects', path: '/features/projects', category: 'Features', content: 'Organize and track projects', icon: <FileText size={16} /> },
    { title: 'Prompt Templates', path: '/features/templates', category: 'Features', content: 'Reusable optimized prompts', icon: <FileText size={16} /> },
    { title: 'Workflows', path: '/features/workflows', category: 'Features', content: 'Multi-step operation monitoring', icon: <FileText size={16} /> },
    { title: 'Gateway & Proxy', path: '/features/gateway', category: 'Features', content: 'Unified API gateway for all providers', icon: <FileText size={16} /> },
    { title: 'Key Vault', path: '/features/key-vault', category: 'Features', content: 'Secure API key management', icon: <FileText size={16} /> },
    { title: 'Alerts', path: '/features/alerts', category: 'Features', content: 'Proactive cost monitoring and alerts', icon: <FileText size={16} /> },
    { title: 'Training', path: '/features/training', category: 'Features', content: 'Cost-effective model training', icon: <FileText size={16} /> },

    // API
    { title: 'API Overview', path: '/api', category: 'API Reference', content: 'Complete API documentation', icon: <Code size={16} /> },
    { title: 'Authentication', path: '/api/authentication', category: 'API Reference', content: 'JWT and API key authentication', icon: <Code size={16} /> },
    { title: 'Usage API', path: '/api/usage', category: 'API Reference', content: 'Track AI usage programmatically', icon: <Code size={16} /> },
    { title: 'Analytics API', path: '/api/analytics', category: 'API Reference', content: 'Retrieve analytics data via API', icon: <Code size={16} /> },
    { title: 'Projects API', path: '/api/projects', category: 'API Reference', content: 'Manage projects via API', icon: <Code size={16} /> },
    { title: 'Optimization API', path: '/api/optimization', category: 'API Reference', content: 'Access AI optimization features', icon: <Code size={16} /> },
    { title: 'Webhooks', path: '/api/webhooks', category: 'API Reference', content: 'Real-time event notifications', icon: <Code size={16} /> },
    { title: 'Rate Limits', path: '/api/rate-limits', category: 'API Reference', content: 'API usage limits and quotas', icon: <Code size={16} /> },

    // Integrations
    { title: 'Node.js SDK', path: '/integrations/nodejs', category: 'Integrations', content: 'Integrate Cost Katana with Node.js applications', icon: <Code size={16} /> },
    { title: 'Python SDK', path: '/integrations/python', category: 'Integrations', content: 'Integrate Cost Katana with Python applications', icon: <Code size={16} /> },
    { title: 'ChatGPT Integration', path: '/integrations/chatgpt', category: 'Integrations', content: 'Direct ChatGPT custom GPT integration', icon: <Code size={16} /> },
];

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isAISearch, setIsAISearch] = useState(false);
    const [isAILoading, setIsAILoading] = useState(false);
    const [aiSuggestions, setAISuggestions] = useState<string[]>([]);
    const navigate = useNavigate();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const modalRef = React.useRef<HTMLDivElement>(null);
    const searchTimeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

    // Initialize Fuse.js for fuzzy search
    const fuse = React.useMemo(() => new Fuse(searchData, {
        keys: ['title', 'content', 'category'],
        threshold: 0.3,
        includeScore: true,
    }), []);

    // AI-powered semantic search
    const performAISearch = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim() || searchQuery.length < 3) {
            return;
        }

        setIsAILoading(true);
        setIsAISearch(true);

        try {
            // Call backend AI search endpoint
            const response = await fetch(`${API_BASE_URL}/docs-analytics/ai-search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: searchQuery }),
            });

            if (response.ok) {
                const data = await response.json() as { success: boolean; results?: Array<{ title?: string; pageTitle?: string; path?: string; pagePath?: string; category?: string; reason?: string; description?: string; content?: string }>; suggestions?: string[] };
                if (data.success && data.results) {
                    // Map AI results to SearchResult format
                    const aiResults = data.results.map((r) => ({
                        title: r.title || r.pageTitle || '',
                        path: r.path || r.pagePath || '',
                        category: r.category || 'AI Recommended',
                        content: r.reason || r.description || r.content || '',
                        icon: <Brain size={16} />,
                    }));
                    setResults(aiResults);
                    setAISuggestions(data.suggestions || []);
                    return;
                }
            }
        } catch (error) {
            console.error('AI search failed:', error);
        } finally {
            setIsAILoading(false);
        }

        // Fallback to fuzzy search
        setIsAISearch(false);
        const searchResults = fuse.search(searchQuery).slice(0, 8);
        setResults(searchResults.map(r => r.item));
    }, [fuse]);

    // Handle search with debouncing
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (query.trim()) {
            // Use AI search for longer queries, fuzzy for shorter ones
            if (query.length >= 3) {
                searchTimeoutRef.current = setTimeout(() => {
                    performAISearch(query);
                }, 300);
            } else {
                const searchResults = fuse.search(query).slice(0, 8);
                setResults(searchResults.map(r => r.item));
                setIsAISearch(false);
            }
        } else {
            setResults(searchData.slice(0, 8));
            setIsAISearch(false);
            setAISuggestions([]);
        }
        setSelectedIndex(0);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [query, fuse, performAISearch]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % results.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
                break;
            case 'Enter':
                e.preventDefault();
                if (results[selectedIndex]) {
                    navigate(results[selectedIndex].path);
                    onClose();
                }
                break;
            case 'Escape':
                e.preventDefault();
                onClose();
                break;
        }
    }, [isOpen, results, selectedIndex, navigate, onClose]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Reset query when modal opens and focus input
    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setSelectedIndex(0);
            // Focus input after a short delay to ensure modal is rendered
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    // Focus trap
    useEffect(() => {
        if (!isOpen || !modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
            focusableElements.length - 1
        ] as HTMLElement;

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        window.addEventListener('keydown', handleTabKey);

        return () => {
            window.removeEventListener('keydown', handleTabKey);
        };
    }, [isOpen]);

    const handleResultClick = (path: string) => {
        navigate(path);
        onClose();
        setQuery('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none sm:p-4 md:p-8">
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="w-full max-w-4xl pointer-events-auto h-full sm:h-auto sm:max-h-[85vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="search-title"
                        >
                            <div className="glass rounded-2xl sm:rounded-2xl rounded-b-none sm:rounded-b-2xl border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-2xl overflow-hidden backdrop-blur-xl h-full sm:h-auto flex flex-col">
                                {/* Search Input */}
                                <div className="flex items-center px-6 sm:px-4 py-4 sm:py-3 border-b border-primary-200/30 dark:border-primary-700/30 flex-shrink-0">
                                    <div className="relative flex-1 flex items-center">
                                        {isAILoading ? (
                                            <Loader2 className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0 animate-spin" size={20} />
                                        ) : isAISearch ? (
                                            <Sparkles className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                                        ) : (
                                            <Search className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} aria-hidden="true" />
                                        )}
                                        <label htmlFor="search-input" className="sr-only">
                                            Search documentation
                                        </label>
                                        <input
                                            ref={inputRef}
                                            id="search-input"
                                            type="text"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search documentation... (AI-powered)"
                                            className="flex-1 bg-transparent outline-none text-light-text-primary dark:text-dark-text-primary placeholder-light-text-muted dark:placeholder-dark-text-muted focus:ring-2 focus:ring-primary-500/50 rounded-lg px-2 py-2 sm:py-1 text-base sm:text-sm min-h-[44px] sm:min-h-auto"
                                            autoFocus
                                            aria-label="Search documentation"
                                            aria-describedby="search-results-count"
                                            aria-controls="search-results"
                                        />
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="btn p-2 sm:p-1 hover:bg-primary-100/50 dark:hover:bg-primary-900/30 rounded-lg transition-colors text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-600 dark:hover:text-primary-400 min-w-[44px] min-h-[44px] sm:min-w-auto sm:min-h-auto flex items-center justify-center flex-shrink-0 ml-2"
                                        aria-label="Close search"
                                    >
                                        <X size={20} aria-hidden="true" />
                                    </button>
                                </div>

                                {/* AI Suggestions */}
                                {isAISearch && aiSuggestions.length > 0 && (
                                    <div className="px-6 sm:px-4 py-2 border-b border-primary-200/30 dark:border-primary-700/30 bg-primary-500/5">
                                        <div className="flex items-center gap-2 text-xs text-light-text-muted dark:text-dark-text-muted">
                                            <Brain size={14} />
                                            <span>Related searches:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {aiSuggestions.slice(0, 3).map((suggestion, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setQuery(suggestion)}
                                                        className="px-2 py-1 rounded bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-400 transition-colors"
                                                    >
                                                        {suggestion}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Search Results */}
                                <div
                                    id="search-results"
                                    className="flex-1 overflow-y-auto min-h-0"
                                    role="listbox"
                                    aria-label="Search results"
                                >
                                    {results.length > 0 ? (
                                        <div className="py-2" role="group">
                                            <div id="search-results-count" className="sr-only">
                                                {results.length} {results.length === 1 ? 'result' : 'results'} found
                                            </div>
                                            {results.map((result, index) => (
                                                <button
                                                    key={result.path}
                                                    onClick={() => handleResultClick(result.path)}
                                                    onMouseEnter={() => setSelectedIndex(index)}
                                                    role="option"
                                                    aria-selected={selectedIndex === index}
                                                    className={`btn w-full px-6 sm:px-4 py-4 sm:py-3 flex items-start space-x-3 transition-all duration-200 min-h-[64px] sm:min-h-[56px] ${selectedIndex === index
                                                        ? 'bg-gradient-primary/10 dark:bg-gradient-primary/20 border-l-4 border-primary-500 dark:border-primary-400'
                                                        : 'hover:bg-primary-50/50 dark:hover:bg-primary-900/20'
                                                        }`}
                                                >
                                                    <div className={`mt-0.5 flex-shrink-0 ${selectedIndex === index ? 'text-primary-600 dark:text-primary-400' : 'text-light-text-muted dark:text-dark-text-muted'}`}>
                                                        {result.icon}
                                                    </div>
                                                    <div className="flex-1 text-left min-w-0">
                                                        <div className="flex items-center space-x-2 flex-wrap gap-1 sm:gap-0">
                                                            <span className={`font-display font-semibold text-base sm:text-sm break-words ${selectedIndex === index ? 'text-primary-700 dark:text-primary-300' : 'text-light-text-primary dark:text-dark-text-primary'}`}>
                                                                {result.title}
                                                            </span>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full glass border border-primary-200/30 dark:border-primary-700/30 flex-shrink-0 ${selectedIndex === index
                                                                ? 'bg-primary-100/50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                                                : 'text-light-text-secondary dark:text-dark-text-secondary'
                                                                }`}>
                                                                {result.category}
                                                            </span>
                                                        </div>
                                                        <p className={`text-sm sm:text-xs mt-1 break-words ${selectedIndex === index ? 'text-primary-600/80 dark:text-primary-400/80' : 'text-light-text-secondary dark:text-dark-text-secondary'}`}>
                                                            {result.content}
                                                        </p>
                                                    </div>
                                                    {selectedIndex === index && (
                                                        <ChevronRight className="text-primary-600 dark:text-primary-400 mt-0.5" size={16} />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-8 text-center text-light-text-secondary dark:text-dark-text-secondary">
                                            <p className="text-lg font-display font-semibold mb-2">No results found</p>
                                            <p className="text-sm">Try searching for "{query}" with different keywords</p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="px-6 sm:px-4 py-3 sm:py-2 border-t border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel/50 dark:bg-gradient-dark-panel/50 flex-shrink-0">
                                    <div className="flex items-center justify-between text-xs text-light-text-secondary dark:text-dark-text-secondary">
                                        <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap gap-2 sm:gap-0">
                                            <span className="hidden sm:flex items-center space-x-1">
                                                <kbd className="px-1.5 py-0.5 glass border border-primary-200/30 dark:border-primary-700/30 rounded text-primary-700 dark:text-primary-300 font-mono">↑</kbd>
                                                <kbd className="px-1.5 py-0.5 glass border border-primary-200/30 dark:border-primary-700/30 rounded text-primary-700 dark:text-primary-300 font-mono">↓</kbd>
                                                <span>Navigate</span>
                                            </span>
                                            <span className="hidden sm:flex items-center space-x-1">
                                                <kbd className="px-1.5 py-0.5 glass border border-primary-200/30 dark:border-primary-700/30 rounded text-primary-700 dark:text-primary-300 font-mono">↵</kbd>
                                                <span>Select</span>
                                            </span>
                                            <span className="flex items-center space-x-1">
                                                <kbd className="px-1.5 py-0.5 glass border border-primary-200/30 dark:border-primary-700/30 rounded text-primary-700 dark:text-primary-300 font-mono">esc</kbd>
                                                <span>Close</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;
