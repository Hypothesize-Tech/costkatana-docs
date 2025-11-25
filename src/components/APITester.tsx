import React, { useState } from 'react';
import { Play, Copy, Check, RotateCcw, AlertCircle, CheckCircle, XCircle, Loader, Shield } from 'lucide-react';
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
    sandboxMode?: boolean;
}

// Open source API endpoints for sandbox testing
const SANDBOX_APIS = {
    costkatana: 'https://cost-katana-backend.store',
};

// Get sandbox URL based on method and selected sandbox API
const getSandboxUrl = (method: string, sandboxApi: keyof typeof SANDBOX_APIS, path: string): string => {
    const base = SANDBOX_APIS[sandboxApi];

    if (sandboxApi === 'costkatana') {
        return `${base}${path}`;
    } else if (sandboxApi === 'httpbin') {
        switch (method) {
            case 'GET': return `${base}/get`;
            case 'POST': return `${base}/post`;
            case 'PUT': return `${base}/put`;
            case 'DELETE': return `${base}/delete`;
            case 'PATCH': return `${base}/patch`;
            default: return `${base}/get`;
        }
    } else if (sandboxApi === 'jsonplaceholder') {
        switch (method) {
            case 'GET': return `${base}/posts/1`;
            case 'POST': return `${base}/posts`;
            case 'PUT': return `${base}/posts/1`;
            case 'DELETE': return `${base}/posts/1`;
            case 'PATCH': return `${base}/posts/1`;
            default: return `${base}/posts`;
        }
    } else if (sandboxApi === 'reqres') {
        switch (method) {
            case 'GET': return `${base}/users/2`;
            case 'POST': return `${base}/users`;
            case 'PUT': return `${base}/users/2`;
            case 'DELETE': return `${base}/users/2`;
            case 'PATCH': return `${base}/users/2`;
            default: return `${base}/users`;
        }
    }
    return `${SANDBOX_APIS.costkatana}/api/health`;
};

const APITester: React.FC<APITesterProps> = ({
    endpoint,
    baseUrl = 'https://costkatana-backend.store/api',
    title,
    description,
    sandboxMode: initialSandboxMode = true, // Default to sandbox mode to avoid DNS errors
}) => {
    const [sandboxMode, setSandboxMode] = useState(initialSandboxMode);
    const [sandboxApi, setSandboxApi] = useState<keyof typeof SANDBOX_APIS>('costkatana');
    const [customUrl, setCustomUrl] = useState<string>('');
    const [useCustomUrl, setUseCustomUrl] = useState(false);
    const [requestBody, setRequestBody] = useState<string>(
        endpoint.body ? JSON.stringify(endpoint.body, null, 2) : '{\n  "message": "Hello from Cost Katana!",\n  "timestamp": "2024-01-01T00:00:00Z"\n}'
    );
    const [customHeaders, setCustomHeaders] = useState<Record<string, string>>(
        endpoint.headers || { 'Content-Type': 'application/json' }
    );
    const [newHeaderKey, setNewHeaderKey] = useState('');
    const [newHeaderValue, setNewHeaderValue] = useState('');
    const [response, setResponse] = useState<{
        status: number;
        statusText: string;
        headers: Record<string, string>;
        data: unknown;
        responseTime: number;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [copiedResponse, setCopiedResponse] = useState(false);

    // Determine the URL to use
    const getActiveUrl = (): string => {
        if (useCustomUrl && customUrl) {
            return customUrl;
        }
        if (sandboxMode) {
            return getSandboxUrl(endpoint.method, sandboxApi, endpoint.path);
        }
        return `${baseUrl}${endpoint.path}`;
    };

    const fullUrl = getActiveUrl();

    const handleTest = async () => {
        setIsLoading(true);
        setError(null);
        setResponse(null);

        const startTime = performance.now();

        try {
            const headers: Record<string, string> = {
                ...customHeaders,
            };

            const options: RequestInit = {
                method: endpoint.method,
                headers,
                mode: 'cors', // Explicitly set CORS mode
            };

            if (endpoint.method !== 'GET' && requestBody) {
                try {
                    JSON.parse(requestBody); // Validate JSON
                    options.body = requestBody;
                } catch {
                    setError('Invalid JSON in request body');
                    setIsLoading(false);
                    return;
                }
            }

            const res = await fetch(fullUrl, options);
            const endTime = performance.now();

            let data;
            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await res.json();
            } else {
                data = await res.text();
            }

            setResponse({
                status: res.status,
                statusText: res.statusText,
                headers: Object.fromEntries(res.headers.entries()),
                data,
                responseTime: Math.round(endTime - startTime),
            });

            toast.success(`Request completed in ${Math.round(endTime - startTime)}ms`);
        } catch (err) {
            const endTime = performance.now();
            let errorMessage = 'Request failed';

            if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
                // This typically indicates a network error like DNS resolution failure or CORS
                errorMessage = `Network error: Unable to reach ${fullUrl}.\n\nPossible causes:\n• The server is not running or unreachable\n• DNS resolution failed\n• CORS policy blocking the request\n• Network connectivity issues\n\nSolution: Enable Sandbox Mode or use a Custom URL.`;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            setError(errorMessage);
            setResponse({
                status: 0,
                statusText: 'Network Error',
                headers: {},
                data: { error: errorMessage },
                responseTime: Math.round(endTime - startTime),
            });
            toast.error('Request failed - try Sandbox Mode');
            console.error('API Request Error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (text: string, isResponse = false) => {
        try {
            await navigator.clipboard.writeText(text);
            if (isResponse) {
                setCopiedResponse(true);
                setTimeout(() => setCopiedResponse(false), 2000);
            } else {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
            toast.success('Copied to clipboard!');
        } catch {
            toast.error('Failed to copy');
        }
    };

    const handleReset = () => {
        setRequestBody(endpoint.body ? JSON.stringify(endpoint.body, null, 2) : '{\n  "message": "Hello from Cost Katana!",\n  "timestamp": "2024-01-01T00:00:00Z"\n}');
        setCustomHeaders(endpoint.headers || { 'Content-Type': 'application/json' });
        setResponse(null);
        setError(null);
        setCustomUrl('');
        setUseCustomUrl(false);
    };

    const handleAddHeader = () => {
        if (newHeaderKey && newHeaderValue) {
            setCustomHeaders({ ...customHeaders, [newHeaderKey]: newHeaderValue });
            setNewHeaderKey('');
            setNewHeaderValue('');
        }
    };

    const handleRemoveHeader = (key: string) => {
        const newHeaders = { ...customHeaders };
        delete newHeaders[key];
        setCustomHeaders(newHeaders);
    };

    const getStatusColor = (status?: number) => {
        if (!status) return 'text-red-400';
        if (status >= 200 && status < 300) return 'text-primary-400';
        if (status >= 400 && status < 500) return 'text-yellow-400';
        if (status >= 500) return 'text-red-400';
        return 'text-gray-400';
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

    return (
        <div className="my-8 rounded-2xl overflow-hidden bg-dark-panel dark:bg-dark-bg-100 border border-primary-500/30 shadow-2xl shadow-primary-500/10">
            {/* MacBook-style Terminal Header */}
            <div className="flex justify-between items-center px-4 py-3 bg-gray-800 dark:bg-dark-bg-200 border-b border-primary-500/20">
                <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg hover:bg-red-400 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                    <div className="w-3 h-3 bg-primary-500 rounded-full shadow-lg shadow-primary-500/50 hover:bg-primary-400 transition-colors cursor-pointer"></div>
                </div>
                <div className="flex gap-3 items-center">
                    <span className="font-mono text-xs text-primary-400/70">API Tester</span>
                    {/* Sandbox/Live Toggle */}
                    <button
                        onClick={() => {
                            setSandboxMode(!sandboxMode);
                            setUseCustomUrl(false);
                        }}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${sandboxMode
                            ? 'bg-primary-500/20 border border-primary-500/30 text-primary-400 hover:bg-primary-500/30 shadow-sm shadow-primary-500/20'
                            : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/30'
                            }`}
                        title={sandboxMode ? 'Click to test your real API' : 'Click to use sandbox mode'}
                    >
                        <Shield size={12} />
                        {sandboxMode ? 'Sandbox' : 'Live API'}
                    </button>
                </div>
            </div>

            {/* Title & Description */}
            {(title || description) && (
                <div className="px-6 py-4 border-b border-primary-500/20 bg-dark-panel dark:bg-dark-bg-100">
                    {title && (
                        <h3 className="text-xl font-bold text-primary-400 mb-1">{title}</h3>
                    )}
                    {description && (
                        <p className="text-sm text-dark-text-secondary">{description}</p>
                    )}
                </div>
            )}

            {/* Sandbox API Selector */}
            {sandboxMode && (
                <div className="px-6 py-3 bg-primary-500/5 border-b border-primary-500/20">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-semibold text-primary-400">Sandbox API:</span>
                        {Object.keys(SANDBOX_APIS).map((api) => (
                            <button
                                key={api}
                                onClick={() => setSandboxApi(api as keyof typeof SANDBOX_APIS)}
                                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${sandboxApi === api
                                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                                    : 'bg-dark-bg-200 text-dark-text-muted border border-primary-500/20 hover:border-primary-500/40'
                                    }`}
                            >
                                {api}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-primary-500/70 mt-2">
                        ✓ Using open-source APIs for safe testing. Select an API above or enter a custom URL below.
                    </p>
                </div>
            )}

            {/* Live Mode Warning */}
            {!sandboxMode && !useCustomUrl && (
                <div className="px-6 py-3 bg-red-500/10 border-b border-red-500/30">
                    <p className="text-xs text-red-400 flex items-center gap-2">
                        <AlertCircle size={14} />
                        <span>
                            <strong>⚠️ Live API Mode:</strong> The backend at <code className="bg-red-500/10 px-1 rounded">{baseUrl}</code> must be running and accessible.
                            <button
                                onClick={() => setSandboxMode(true)}
                                className="ml-2 underline hover:text-red-300"
                            >
                                Switch to Sandbox Mode
                            </button>
                        </span>
                    </p>
                </div>
            )}

            {/* Custom URL Input */}
            <div className="px-6 py-3 bg-dark-bg-200 dark:bg-black border-b border-primary-500/20">
                <div className="flex items-center gap-3 mb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={useCustomUrl}
                            onChange={(e) => setUseCustomUrl(e.target.checked)}
                            className="w-4 h-4 rounded border-primary-500/30 bg-dark-bg-100 text-primary-500 focus:ring-primary-500/50"
                        />
                        <span className="text-xs font-medium text-dark-text-secondary">Use Custom URL</span>
                    </label>
                </div>
                {useCustomUrl && (
                    <input
                        type="text"
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        placeholder="Enter custom API URL (e.g., https://costkatana-backend.store/api/health)"
                        className="w-full px-4 py-2 rounded-lg bg-dark-bg-100 border border-primary-500/20 text-primary-400 font-mono text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50"
                    />
                )}
            </div>

            {/* Endpoint Info */}
            <div className="px-6 py-4 bg-dark-bg-200 dark:bg-black border-b border-primary-500/20">
                <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                    </span>
                    <code className="flex-1 text-sm font-mono text-primary-400 truncate">
                        {fullUrl}
                    </code>
                    <button
                        onClick={() => handleCopy(fullUrl)}
                        className="p-2 rounded-lg hover:bg-primary-500/10 text-dark-text-muted hover:text-primary-400 transition-colors"
                        title="Copy URL"
                    >
                        {copied ? <Check size={16} className="text-primary-400" /> : <Copy size={16} />}
                    </button>
                </div>
                {endpoint.description && (
                    <p className="text-xs text-dark-text-muted mt-2">{endpoint.description}</p>
                )}
                <p className={`text-xs mt-2 flex items-center gap-1 ${useCustomUrl ? 'text-purple-400' : sandboxMode ? 'text-primary-500' : 'text-yellow-500'
                    }`}>
                    <Shield size={10} />
                    {useCustomUrl
                        ? 'Custom URL Mode - Testing against your specified endpoint'
                        : sandboxMode
                            ? `✓ Sandbox Mode - Using ${sandboxApi} for safe testing`
                            : `⚠️ Live Mode - Testing against ${baseUrl} (may not be accessible)`
                    }
                </p>
            </div>

            {/* Request Configuration */}
            <div className="p-6 space-y-4 bg-dark-panel dark:bg-dark-bg-100">
                {/* Headers */}
                <div>
                    <label className="block text-sm font-semibold text-dark-text-primary mb-2">
                        Headers
                    </label>
                    <div className="space-y-2">
                        {Object.entries(customHeaders).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={key}
                                    readOnly
                                    className="flex-1 px-3 py-2 rounded-lg bg-dark-bg-200 dark:bg-black border border-primary-500/20 text-sm font-mono text-dark-text-secondary focus:outline-none focus:border-primary-500"
                                />
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) =>
                                        setCustomHeaders({ ...customHeaders, [key]: e.target.value })
                                    }
                                    className="flex-1 px-3 py-2 rounded-lg bg-dark-bg-200 dark:bg-black border border-primary-500/20 text-sm text-primary-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50"
                                />
                                <button
                                    onClick={() => handleRemoveHeader(key)}
                                    className="p-2 rounded-lg hover:bg-red-500/10 text-dark-text-muted hover:text-red-400 transition-colors"
                                    title="Remove header"
                                >
                                    <XCircle size={16} />
                                </button>
                            </div>
                        ))}
                        {/* Add new header */}
                        <div className="flex items-center gap-2 pt-2">
                            <input
                                type="text"
                                value={newHeaderKey}
                                onChange={(e) => setNewHeaderKey(e.target.value)}
                                placeholder="Header name"
                                className="flex-1 px-3 py-2 rounded-lg bg-dark-bg-200 dark:bg-black border border-primary-500/20 text-sm font-mono text-dark-text-secondary focus:outline-none focus:border-primary-500 placeholder:text-dark-text-muted/50"
                            />
                            <input
                                type="text"
                                value={newHeaderValue}
                                onChange={(e) => setNewHeaderValue(e.target.value)}
                                placeholder="Header value"
                                className="flex-1 px-3 py-2 rounded-lg bg-dark-bg-200 dark:bg-black border border-primary-500/20 text-sm text-primary-400 focus:outline-none focus:border-primary-500 placeholder:text-dark-text-muted/50"
                            />
                            <button
                                onClick={handleAddHeader}
                                disabled={!newHeaderKey || !newHeaderValue}
                                className="px-3 py-2 rounded-lg bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Add header"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                {/* Request Body */}
                {endpoint.method !== 'GET' && (
                    <div>
                        <label className="block text-sm font-semibold text-dark-text-primary mb-2">
                            Request Body (JSON)
                        </label>
                        <textarea
                            value={requestBody}
                            onChange={(e) => setRequestBody(e.target.value)}
                            className="w-full h-32 px-4 py-3 rounded-lg bg-dark-bg-200 dark:bg-black border border-primary-500/20 text-primary-400 font-mono text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 resize-none"
                            placeholder="Enter JSON request body..."
                        />
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                    <button
                        onClick={handleTest}
                        disabled={isLoading}
                        className="px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg shadow-primary-500/30"
                    >
                        {isLoading ? (
                            <>
                                <Loader size={18} className="animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Play size={18} />
                                Send Request
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleReset}
                        className="px-4 py-2.5 rounded-xl border border-primary-500/30 bg-transparent hover:bg-primary-500/10 text-primary-400 transition-all duration-200 flex items-center gap-2"
                    >
                        <RotateCcw size={18} />
                        Reset
                    </button>
                </div>
            </div>

            {/* Response Section */}
            {(response || error) && (
                <div className="border-t border-primary-500/20">
                    {/* Response Header with Traffic Lights */}
                    <div className="flex justify-between items-center px-4 py-3 bg-gray-800 dark:bg-dark-bg-200 border-b border-primary-500/20">
                        <div className="flex gap-2 items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
                            <div className="w-3 h-3 bg-primary-500 rounded-full shadow-lg shadow-primary-500/50"></div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <span className="font-mono text-xs text-primary-400/70">Response</span>
                            {error ? (
                                <>
                                    <XCircle size={16} className="text-red-400" />
                                    <span className="text-sm font-semibold text-red-400">Error</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle size={16} className={getStatusColor(response?.status)} />
                                    <span className={`text-sm font-semibold ${getStatusColor(response?.status)}`}>
                                        {response?.status === 0 ? 'Network Error' : `${response?.status} ${response?.statusText}`}
                                    </span>
                                    {response?.responseTime && (
                                        <span className="text-xs text-dark-text-muted">
                                            {response.responseTime}ms
                                        </span>
                                    )}
                                </>
                            )}
                            {response && (
                                <button
                                    onClick={() => handleCopy(JSON.stringify(response.data, null, 2), true)}
                                    className="p-1.5 rounded-md hover:bg-primary-500/10 text-dark-text-muted hover:text-primary-400 transition-colors"
                                    title="Copy response"
                                >
                                    {copiedResponse ? <Check size={14} className="text-primary-400" /> : <Copy size={14} />}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Response Content */}
                    <div className="p-4 bg-dark-bg-200 dark:bg-black min-h-[120px] overflow-x-auto font-mono text-sm">
                        {error ? (
                            <div className="flex items-start gap-2 text-red-400">
                                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                                <div>
                                    <pre className="whitespace-pre-wrap">{error}</pre>
                                    {!sandboxMode && !useCustomUrl && (
                                        <button
                                            onClick={() => setSandboxMode(true)}
                                            className="mt-3 px-4 py-2 bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            Switch to Sandbox Mode
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <pre className="text-primary-400 whitespace-pre-wrap">
                                {typeof response?.data === 'string'
                                    ? response.data
                                    : JSON.stringify(response?.data, null, 2)}
                            </pre>
                        )}
                    </div>

                    {/* Response Headers (collapsible) */}
                    {response && Object.keys(response.headers).length > 0 && (
                        <details className="border-t border-primary-500/10">
                            <summary className="px-4 py-2 bg-dark-bg-100 cursor-pointer text-xs font-medium text-dark-text-muted hover:text-primary-400 transition-colors">
                                Response Headers ({Object.keys(response.headers).length})
                            </summary>
                            <div className="px-4 py-2 bg-dark-bg-200 dark:bg-black text-xs font-mono">
                                {Object.entries(response.headers).map(([key, value]) => (
                                    <div key={key} className="py-1">
                                        <span className="text-primary-400">{key}:</span>{' '}
                                        <span className="text-dark-text-secondary">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </details>
                    )}

                    {/* Terminal Glow Effect */}
                    <div className="relative pointer-events-none">
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/70 to-transparent"></div>
                    </div>
                </div>
            )}

            {/* Example Response (when no actual response) */}
            {endpoint.exampleResponse && !response && !error && (
                <div className="border-t border-primary-500/20">
                    <div className="flex justify-between items-center px-4 py-3 bg-gray-800 dark:bg-dark-bg-200 border-b border-primary-500/20">
                        <div className="flex gap-2 items-center">
                            <div className="w-3 h-3 bg-red-500/50 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500/50 rounded-full"></div>
                            <div className="w-3 h-3 bg-primary-500/50 rounded-full"></div>
                        </div>
                        <span className="text-xs font-mono text-primary-400/50 uppercase">Example Response</span>
                    </div>
                    <div className="p-4 bg-dark-bg-200 dark:bg-black min-h-[80px] overflow-x-auto">
                        <pre className="text-sm font-mono text-dark-text-muted whitespace-pre-wrap">
                            {JSON.stringify(endpoint.exampleResponse, null, 2)}
                        </pre>
                    </div>
                </div>
            )}

            {/* Bottom Glow Effect */}
            <div className="relative pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent animate-pulse via-primary-500/5"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/70 to-transparent"></div>
            </div>
        </div>
    );
};

export default APITester;
