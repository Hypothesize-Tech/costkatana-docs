import React, { useState, useMemo } from 'react';
import { Network, Layers, Search, Filter, BookOpen, ChevronRight, ChevronDown, Code, Play, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import APITester from './APITester';
import toast from 'react-hot-toast';

interface APIEndpoint {
    id: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    category: string;
    title: string;
    description: string;
    parameters?: Array<{
        name: string;
        type: string;
        required: boolean;
        description: string;
    }>;
    requestBody?: Record<string, unknown>;
    responseSchema?: Record<string, unknown>;
    exampleResponse?: Record<string, unknown>;
}

interface APIExplorerProps {
    className?: string;
}

// Mock API endpoints - in production, this would come from the backend
const API_ENDPOINTS: APIEndpoint[] = [
    {
        id: 'usage-track',
        method: 'POST',
        path: '/api/usage/track',
        category: 'Usage',
        title: 'Track Usage',
        description: 'Track AI API usage and costs',
        requestBody: {
            provider: 'openai',
            model: 'gpt-4',
            tokens: { input: 100, output: 200 },
            cost: 0.01
        },
        exampleResponse: {
            success: true,
            data: { id: 'usage_123', cost: 0.01 }
        }
    },
    {
        id: 'analytics-get',
        method: 'GET',
        path: '/api/analytics',
        category: 'Analytics',
        title: 'Get Analytics',
        description: 'Retrieve cost analytics and insights',
        parameters: [
            { name: 'startDate', type: 'string', required: true, description: 'Start date (YYYY-MM-DD)' },
            { name: 'endDate', type: 'string', required: true, description: 'End date (YYYY-MM-DD)' },
            { name: 'groupBy', type: 'string[]', required: false, description: 'Group by provider, model, etc.' }
        ],
        exampleResponse: {
            success: true,
            data: {
                totalCost: 100.50,
                breakdown: { openai: 60, anthropic: 40.50 }
            }
        }
    },
    {
        id: 'optimization-optimize',
        method: 'POST',
        path: '/api/optimization/optimize',
        category: 'Optimization',
        title: 'Optimize Prompt',
        description: 'Optimize a prompt to reduce costs',
        requestBody: {
            prompt: 'Your prompt here',
            strategy: 'aggressive'
        },
        exampleResponse: {
            success: true,
            data: {
                original: { tokens: 1000, cost: 0.10 },
                optimized: { tokens: 600, cost: 0.06 },
                savings: { tokens: 400, cost: 0.04 }
            }
        }
    },
    {
        id: 'projects-list',
        method: 'GET',
        path: '/api/projects',
        category: 'Projects',
        title: 'List Projects',
        description: 'Get all projects',
        exampleResponse: {
            success: true,
            data: [{ id: 'proj_1', name: 'My Project' }]
        }
    },
    {
        id: 'projects-create',
        method: 'POST',
        path: '/api/projects',
        category: 'Projects',
        title: 'Create Project',
        description: 'Create a new project',
        requestBody: {
            name: 'My Project',
            description: 'Project description'
        },
        exampleResponse: {
            success: true,
            data: { id: 'proj_1', name: 'My Project' }
        }
    },
    {
        id: 'webhooks-list',
        method: 'GET',
        path: '/api/webhooks',
        category: 'Webhooks',
        title: 'List Webhooks',
        description: 'Get all webhooks',
        exampleResponse: {
            success: true,
            data: [{ id: 'wh_1', url: 'https://example.com/webhook' }]
        }
    },
];

const APIExplorer: React.FC<APIExplorerProps> = ({ className = '' }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Usage', 'Analytics']));
    const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
    const [parameterValues, setParameterValues] = useState<Record<string, string>>({});
    const [requestBodyValue, setRequestBodyValue] = useState<string>('');

    const categories = useMemo(() => {
        const cats = new Set(API_ENDPOINTS.map(e => e.category));
        return Array.from(cats).sort();
    }, []);

    const filteredEndpoints = useMemo(() => {
        let filtered = API_ENDPOINTS;

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(e => e.category === selectedCategory);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(e =>
                e.title.toLowerCase().includes(query) ||
                e.description.toLowerCase().includes(query) ||
                e.path.toLowerCase().includes(query) ||
                e.method.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [searchQuery, selectedCategory]);

    const endpointsByCategory = useMemo(() => {
        const grouped: Record<string, APIEndpoint[]> = {};
        filteredEndpoints.forEach(endpoint => {
            if (!grouped[endpoint.category]) {
                grouped[endpoint.category] = [];
            }
            grouped[endpoint.category].push(endpoint);
        });
        return grouped;
    }, [filteredEndpoints]);

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    const handleCopyEndpoint = async (endpoint: APIEndpoint) => {
        const text = `${endpoint.method} ${endpoint.path}`;
        try {
            await navigator.clipboard.writeText(text);
            setCopiedEndpoint(endpoint.id);
            toast.success('Endpoint copied!');
            setTimeout(() => setCopiedEndpoint(null), 2000);
        } catch {
            toast.error('Failed to copy');
        }
    };

    const getMethodColor = (method: string) => {
        switch (method) {
            case 'GET': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'POST': return 'bg-primary-500/20 text-primary-400 border-primary-500/30';
            case 'PUT': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'DELETE': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'PATCH': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const selectedEndpointData = selectedEndpoint
        ? API_ENDPOINTS.find(e => e.id === selectedEndpoint)
        : null;

    // Update parameter values and request body when endpoint changes
    React.useEffect(() => {
        if (selectedEndpointData) {
            // Initialize parameter values
            const initialParams: Record<string, string> = {};
            if (selectedEndpointData.parameters) {
                selectedEndpointData.parameters.forEach(param => {
                    initialParams[param.name] = '';
                });
            }
            setParameterValues(initialParams);

            // Initialize request body
            if (selectedEndpointData.requestBody) {
                setRequestBodyValue(JSON.stringify(selectedEndpointData.requestBody, null, 2));
            } else {
                setRequestBodyValue('');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedEndpoint]);

    // Build the path with query parameters
    const buildPathWithParams = (path: string, params: Record<string, string>): string => {
        const queryParams = Object.entries(params)
            .filter(([, value]) => value.trim() !== '')
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        return queryParams ? `${path}?${queryParams}` : path;
    };

    return (
        <div className={`my-8 rounded-xl border border-primary-200/30 dark:border-primary-700/30 
            bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-xl overflow-hidden ${className}`}>
            {/* Header */}
            <div className="px-6 py-4 border-b border-primary-200/30 dark:border-primary-700/30
                bg-gradient-to-r from-primary-500/10 to-accent-500/10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary-500 text-white">
                        <Network className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-display font-bold text-light-text-primary dark:text-dark-text-primary">
                            API Explorer
                        </h3>
                        <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                            Browse and test all API endpoints
                        </p>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-muted dark:text-dark-text-muted" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search endpoints..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-primary-200/30 dark:border-primary-700/30
                                bg-white dark:bg-dark-bg-200
                                text-light-text-primary dark:text-dark-text-primary
                                focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
                                transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-light-text-muted dark:text-dark-text-muted" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 rounded-lg border-2 border-primary-200/30 dark:border-primary-700/30
                                bg-white dark:bg-dark-bg-200
                                text-light-text-primary dark:text-dark-text-primary
                                focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
                                transition-all"
                        >
                            <option value="all">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {/* Endpoints List */}
                <div className="border-b border-primary-200/30 dark:border-primary-700/30 
                    bg-light-bg-100 dark:bg-dark-bg-200">
                    {categories.length === 0 ? (
                        <div className="p-8 text-center text-light-text-muted dark:text-dark-text-muted">
                            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No endpoints found</p>
                        </div>
                    ) : (
                        <div className="p-4 space-y-2">
                            {categories.map(category => {
                                const endpoints = endpointsByCategory[category] || [];
                                if (endpoints.length === 0) return null;

                                const isExpanded = expandedCategories.has(category);

                                return (
                                    <div key={category} className="border border-primary-200/30 dark:border-primary-700/30 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => toggleCategory(category)}
                                            className="w-full flex items-center justify-between px-4 py-3
                                                bg-primary-500/5 dark:bg-primary-500/10
                                                hover:bg-primary-500/10 dark:hover:bg-primary-500/20
                                                transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Layers className="w-4 h-4 text-primary-500" />
                                                <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                                                    {category}
                                                </span>
                                                <span className="text-xs text-light-text-muted dark:text-dark-text-muted">
                                                    ({endpoints.length})
                                                </span>
                                            </div>
                                            {isExpanded ? (
                                                <ChevronDown className="w-4 h-4 text-light-text-muted dark:text-dark-text-muted" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-light-text-muted dark:text-dark-text-muted" />
                                            )}
                                        </button>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-2 space-y-1">
                                                        {endpoints.map(endpoint => (
                                                            <button
                                                                key={endpoint.id}
                                                                onClick={() => setSelectedEndpoint(endpoint.id)}
                                                                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${selectedEndpoint === endpoint.id
                                                                    ? 'bg-primary-500/20 dark:bg-primary-500/30 border-2 border-primary-500'
                                                                    : 'hover:bg-primary-500/10 dark:hover:bg-primary-500/20 border-2 border-transparent'
                                                                    }`}
                                                            >
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className={`px-2 py-1 rounded text-xs font-bold border ${getMethodColor(endpoint.method)}`}>
                                                                            {endpoint.method}
                                                                        </span>
                                                                        <code className="text-sm font-mono text-light-text-primary dark:text-dark-text-primary">
                                                                            {endpoint.path}
                                                                        </code>
                                                                    </div>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleCopyEndpoint(endpoint);
                                                                        }}
                                                                        className="p-1 rounded hover:bg-primary-500/20 transition-colors"
                                                                    >
                                                                        {copiedEndpoint === endpoint.id ? (
                                                                            <Check size={14} className="text-primary-500" />
                                                                        ) : (
                                                                            <Copy size={14} className="text-light-text-muted dark:text-dark-text-muted" />
                                                                        )}
                                                                    </button>
                                                                </div>
                                                                <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
                                                                    {endpoint.description}
                                                                </p>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Endpoint Details & Tester */}
                <div className="bg-light-bg-100 dark:bg-dark-bg-200">
                    {selectedEndpointData ? (
                        <div className="p-6">
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${getMethodColor(selectedEndpointData.method)}`}>
                                        {selectedEndpointData.method}
                                    </span>
                                    <code className="text-lg font-mono text-light-text-primary dark:text-dark-text-primary">
                                        {selectedEndpointData.path}
                                    </code>
                                </div>
                                <h4 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                    {selectedEndpointData.title}
                                </h4>
                                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                    {selectedEndpointData.description}
                                </p>
                            </div>

                            {/* Parameters Input */}
                            {selectedEndpointData.parameters && selectedEndpointData.parameters.length > 0 && (
                                <div className="mb-6">
                                    <h5 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                                        Parameters
                                    </h5>
                                    <div className="space-y-3">
                                        {selectedEndpointData.parameters.map((param, index) => (
                                            <div
                                                key={index}
                                                className="p-4 rounded-lg bg-light-bg-200 dark:bg-dark-bg-300 border border-primary-200/30 dark:border-primary-700/30"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <label className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                                        {param.name}
                                                    </label>
                                                    <span className="text-xs text-light-text-muted dark:text-dark-text-muted">
                                                        ({param.type})
                                                    </span>
                                                    {param.required && (
                                                        <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-500 font-medium">
                                                            Required
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2">
                                                    {param.description}
                                                </p>
                                                <input
                                                    type="text"
                                                    value={parameterValues[param.name] || ''}
                                                    onChange={(e) => setParameterValues({
                                                        ...parameterValues,
                                                        [param.name]: e.target.value
                                                    })}
                                                    placeholder={`Enter ${param.name}${param.required ? ' (required)' : ''}`}
                                                    className={`w-full px-3 py-2 rounded-lg border-2 
                                                        ${param.required && !parameterValues[param.name]
                                                            ? 'border-red-500/50'
                                                            : 'border-primary-200/30 dark:border-primary-700/30'
                                                        }
                                                        bg-white dark:bg-dark-bg-200
                                                        text-light-text-primary dark:text-dark-text-primary
                                                        focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
                                                        transition-all text-sm`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Request Body Input */}
                            {selectedEndpointData.requestBody && (
                                <div className="mb-6">
                                    <h5 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3 flex items-center gap-2">
                                        <Code className="w-4 h-4" />
                                        Request Body
                                    </h5>
                                    <div className="p-4 rounded-lg bg-light-bg-200 dark:bg-dark-bg-300 border border-primary-200/30 dark:border-primary-700/30">
                                        <textarea
                                            value={requestBodyValue}
                                            onChange={(e) => setRequestBodyValue(e.target.value)}
                                            className="w-full h-48 px-4 py-3 rounded-lg bg-gray-900 dark:bg-black border border-primary-200/30 dark:border-primary-700/30
                                                text-green-400 font-mono text-sm
                                                focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
                                                transition-all resize-none"
                                            placeholder="Enter JSON request body..."
                                        />
                                        <p className="text-xs text-light-text-muted dark:text-dark-text-muted mt-2">
                                            Edit the JSON request body as needed
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* API Tester */}
                            <div className="mb-6">
                                <h5 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3 flex items-center gap-2">
                                    <Play className="w-4 h-4" />
                                    Try it out
                                </h5>
                                <APITester
                                    endpoint={{
                                        method: selectedEndpointData.method,
                                        path: buildPathWithParams(selectedEndpointData.path, parameterValues),
                                        description: selectedEndpointData.description,
                                        headers: { 'Content-Type': 'application/json' },
                                        body: requestBodyValue ? (() => {
                                            try {
                                                return JSON.parse(requestBodyValue);
                                            } catch {
                                                return selectedEndpointData.requestBody;
                                            }
                                        })() : selectedEndpointData.requestBody,
                                        exampleResponse: selectedEndpointData.exampleResponse,
                                    }}
                                    sandboxMode={true}
                                />
                            </div>

                            {/* Response Schema */}
                            {selectedEndpointData.exampleResponse && (
                                <div>
                                    <h5 className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-3 flex items-center gap-2">
                                        <Code className="w-4 h-4" />
                                        Example Response
                                    </h5>
                                    <div className="p-4 rounded-lg bg-gray-900 dark:bg-black border border-primary-200/30 dark:border-primary-700/30">
                                        <pre className="text-sm font-mono text-green-400 overflow-x-auto">
                                            {JSON.stringify(selectedEndpointData.exampleResponse, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full p-8">
                            <div className="text-center">
                                <BookOpen className="w-16 h-16 mx-auto mb-4 text-light-text-muted dark:text-dark-text-muted opacity-50" />
                                <p className="text-light-text-muted dark:text-dark-text-muted">
                                    Select an endpoint to view details and test it
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default APIExplorer;

