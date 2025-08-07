import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, FileText, Code, Book, ChevronRight } from 'lucide-react';
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

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

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

    // Initialize Fuse.js for fuzzy search
    const fuse = new Fuse(searchData, {
        keys: ['title', 'content', 'category'],
        threshold: 0.3,
        includeScore: true,
    });

    // Handle search
    useEffect(() => {
        if (query.trim()) {
            const searchResults = fuse.search(query).slice(0, 8);
            setResults(searchResults.map(r => r.item));
        } else {
            setResults(searchData.slice(0, 8));
        }
        setSelectedIndex(0);
    }, [query]);

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

    // Handle keyboard shortcut
    useEffect(() => {
        const handleShortcut = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (isOpen) {
                    onClose();
                } else {
                    setQuery('');
                }
            }
        };

        window.addEventListener('keydown', handleShortcut);
        return () => window.removeEventListener('keydown', handleShortcut);
    }, [isOpen, onClose]);

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
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50"
                    >
                        <div className="bg-white dark:bg-dark-card rounded-xl shadow-2xl overflow-hidden">
                            {/* Search Input */}
                            <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                <Search className="text-gray-400 mr-3" size={20} />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search documentation..."
                                    className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
                                    autoFocus
                                />
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Search Results */}
                            <div className="max-h-96 overflow-y-auto">
                                {results.length > 0 ? (
                                    <div className="py-2">
                                        {results.map((result, index) => (
                                            <button
                                                key={result.path}
                                                onClick={() => handleResultClick(result.path)}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                                className={`w-full px-4 py-3 flex items-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${selectedIndex === index ? 'bg-gray-50 dark:bg-gray-800' : ''
                                                    }`}
                                            >
                                                <div className="mt-0.5 text-gray-400">
                                                    {result.icon}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-medium text-gray-900 dark:text-white">
                                                            {result.title}
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {result.category}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                        {result.content}
                                                    </p>
                                                </div>
                                                {selectedIndex === index && (
                                                    <ChevronRight className="text-gray-400 mt-0.5" size={16} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        No results found for "{query}"
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center space-x-4">
                                        <span className="flex items-center space-x-1">
                                            <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">↑</kbd>
                                            <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">↓</kbd>
                                            <span>Navigate</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">↵</kbd>
                                            <span>Select</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">esc</kbd>
                                            <span>Close</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;
