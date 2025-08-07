import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({
            error,
            errorInfo,
        });
    }

    private handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
        window.location.reload();
    };

    private handleGoHome = () => {
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center p-4">
                    <div className="max-w-md w-full">
                        <div className="bg-white dark:bg-dark-card rounded-xl shadow-xl p-8">
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                                    <AlertTriangle className="text-red-600 dark:text-red-400" size={32} />
                                </div>
                            </div>

                            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
                                Oops! Something went wrong
                            </h1>

                            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                                We encountered an unexpected error while loading this page. Don't worry, your data is safe.
                            </p>

                            {import.meta.env.DEV && this.state.error && (
                                <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                    <p className="text-sm font-mono text-red-600 dark:text-red-400 mb-2">
                                        {this.state.error.toString()}
                                    </p>
                                    {this.state.errorInfo && (
                                        <details className="text-xs text-gray-600 dark:text-gray-400">
                                            <summary className="cursor-pointer hover:text-gray-900 dark:hover:text-gray-200">
                                                View stack trace
                                            </summary>
                                            <pre className="mt-2 overflow-x-auto">
                                                {this.state.errorInfo.componentStack}
                                            </pre>
                                        </details>
                                    )}
                                </div>
                            )}

                            <div className="flex space-x-3">
                                <button
                                    onClick={this.handleReset}
                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                                >
                                    <RefreshCw size={18} />
                                    <span>Try Again</span>
                                </button>

                                <button
                                    onClick={this.handleGoHome}
                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <Home size={18} />
                                    <span>Go Home</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
