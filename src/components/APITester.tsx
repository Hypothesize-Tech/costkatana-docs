import React, { useState } from 'react';
import { Play, Copy, Check, RotateCcw, AlertCircle, CheckCircle, XCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

interface APIEndpoint {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    description?: string;
    headers?: Record<string, string>;
    body?: Record<string, unknown> | unknown[];
    exampleResponse?: Record<string, unknown> | unknown[];
}

interface APITesterProps {
    endpoint: APIEndpoint;
    baseUrl?: string;
    title?: string;
    description?: string;
}

const APITester: React.FC<APITesterProps> = ({
    endpoint,
    baseUrl = 'https://costkatana-backend.store',
    title,
    description,
}) => {
    const [requestBody, setRequestBody] = useState<string>(
        endpoint.body ? JSON.stringify(endpoint.body, null, 2) : ''
    );
    const [customHeaders, setCustomHeaders] = useState<Record<string, string>>(
        endpoint.headers || {}
    );
    const [response, setResponse] = useState<{
        status: number;
        statusText: string;
        headers: Record<string, string>;
        data: unknown;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const fullUrl = `${baseUrl}${endpoint.path}`;

    const handleTest = async () => {
        setIsLoading(true);
        setError(null);
        setResponse(null);

        try {
            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                ...customHeaders,
            };

            const options: RequestInit = {
                method: endpoint.method,
                headers,
            };

            if (endpoint.method !== 'GET' && requestBody) {
                try {
                    options.body = JSON.parse(requestBody);
                } catch {
                    setError('Invalid JSON in request body');
                    setIsLoading(false);
                    return;
                }
            }

            const res = await fetch(fullUrl, options);
            const data = await res.json();

            setResponse({
                status: res.status,
                statusText: res.statusText,
                headers: Object.fromEntries(res.headers.entries()),
                data,
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Request failed';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            toast.success('Copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy');
        }
    };

    const handleReset = () => {
        setRequestBody(endpoint.body ? JSON.stringify(endpoint.body, null, 2) : '');
        setCustomHeaders(endpoint.headers || {});
        setResponse(null);
        setError(null);
    };

    const getStatusColor = (status?: number) => {
        if (!status) return '';
        if (status >= 200 && status < 300) return 'text-success-500';
        if (status >= 400 && status < 500) return 'text-warning-500';
        if (status >= 500) return 'text-error-500';
        return 'text-gray-500';
    };

    return (
        <div className="my-8 rounded-xl border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-xl overflow-hidden">
            {/* Header */}
            {(title || description) && (
                <div className="px-6 py-4 border-b border-primary-200/30 dark:border-primary-700/30">
                    {title && (
                        <h3 className="text-2xl font-display font-bold gradient-text mb-2">{title}</h3>
                    )}
                    {description && (
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* Endpoint Info */}
            <div className="px-6 py-4 bg-light-bg-100 dark:bg-dark-bg-200 border-b border-primary-200/30 dark:border-primary-700/30">
                <div className="flex items-center gap-3 mb-2">
                    <span
                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${endpoint.method === 'GET'
                            ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                            : endpoint.method === 'POST'
                                ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                                : endpoint.method === 'PUT'
                                    ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                                    : endpoint.method === 'DELETE'
                                        ? 'bg-red-500/20 text-red-600 dark:text-red-400'
                                        : 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
                            }`}
                    >
                        {endpoint.method}
                    </span>
                    <code className="flex-1 text-sm font-mono text-light-text-primary dark:text-dark-text-primary">
                        {fullUrl}
                    </code>
                    <button
                        onClick={() => handleCopy(fullUrl)}
                        className="p-1.5 rounded-lg hover:bg-primary-500/20 text-light-text-secondary dark:text-dark-text-secondary hover:text-primary-500 transition-colors"
                        title="Copy URL"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                </div>
                {endpoint.description && (
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-2">
                        {endpoint.description}
                    </p>
                )}
            </div>

            {/* Request Configuration */}
            <div className="p-6 space-y-4">
                {/* Headers */}
                {Object.keys(customHeaders).length > 0 && (
                    <div>
                        <label className="block text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                            Headers
                        </label>
                        <div className="space-y-2">
                            {Object.entries(customHeaders).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={key}
                                        readOnly
                                        className="flex-1 px-3 py-2 rounded-lg bg-light-bg-200 dark:bg-dark-bg-300 border border-primary-200/30 dark:border-primary-700/30 text-sm font-mono"
                                    />
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) =>
                                            setCustomHeaders({ ...customHeaders, [key]: e.target.value })
                                        }
                                        className="flex-1 px-3 py-2 rounded-lg bg-light-bg-200 dark:bg-dark-bg-300 border border-primary-200/30 dark:border-primary-700/30 text-sm"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Request Body */}
                {endpoint.method !== 'GET' && (
                    <div>
                        <label className="block text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                            Request Body
                        </label>
                        <textarea
                            value={requestBody}
                            onChange={(e) => setRequestBody(e.target.value)}
                            className="w-full h-32 px-3 py-2 rounded-lg bg-gray-900 dark:bg-black border border-primary-200/30 dark:border-primary-700/30 text-gray-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter JSON request body..."
                        />
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleTest}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader size={18} className="animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Play size={18} />
                                Test Request
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleReset}
                        className="px-4 py-2 rounded-lg border border-primary-200 dark:border-primary-700 bg-transparent hover:bg-primary-500/10 text-primary-600 dark:text-primary-400 transition-all duration-200 flex items-center gap-2"
                    >
                        <RotateCcw size={18} />
                        Reset
                    </button>
                </div>
            </div>

            {/* Response */}
            {(response || error) && (
                <div className="border-t border-primary-200/30 dark:border-primary-700/30">
                    <div className="px-6 py-3 bg-gray-900 dark:bg-black border-b border-gray-700 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {error ? (
                                <>
                                    <XCircle size={18} className="text-error-500" />
                                    <span className="text-sm font-semibold text-error-500">Error</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle
                                        size={18}
                                        className={getStatusColor(response?.status)}
                                    />
                                    <span
                                        className={`text-sm font-semibold ${getStatusColor(
                                            response?.status
                                        )}`}
                                    >
                                        {response?.status} {response?.statusText}
                                    </span>
                                </>
                            )}
                        </div>
                        {response && (
                            <button
                                onClick={() => handleCopy(JSON.stringify(response, null, 2))}
                                className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                                title="Copy response"
                            >
                                <Copy size={16} />
                            </button>
                        )}
                    </div>

                    <div className="p-6 bg-gray-950 dark:bg-gray-900">
                        {error ? (
                            <div className="flex items-start gap-2 text-error-500">
                                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                                <p className="text-sm">{error}</p>
                            </div>
                        ) : (
                            <pre className="text-sm font-mono text-gray-100 whitespace-pre-wrap overflow-x-auto">
                                {JSON.stringify(response, null, 2)}
                            </pre>
                        )}
                    </div>
                </div>
            )}

            {/* Example Response */}
            {endpoint.exampleResponse && !response && !error && (
                <div className="border-t border-primary-200/30 dark:border-primary-700/30">
                    <div className="px-6 py-3 bg-gray-900 dark:bg-black border-b border-gray-700">
                        <span className="text-xs font-mono text-gray-400 uppercase">
                            Example Response
                        </span>
                    </div>
                    <div className="p-6 bg-gray-950 dark:bg-gray-900">
                        <pre className="text-sm font-mono text-gray-400 whitespace-pre-wrap overflow-x-auto">
                            {JSON.stringify(endpoint.exampleResponse, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
};

export default APITester;

