import React, { useState } from 'react';
import { Wand2, Settings, CheckCircle2, ArrowRight, ArrowLeft, Loader2, Terminal, Code, Package, Key, AlertCircle, Copy, Check, LogIn, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommunity } from '../contexts/CommunityContext';
import { AuthPrompt } from './community';

interface IntegrationWizardProps {
    onComplete?: (config: IntegrationConfig) => void;
    className?: string;
}

interface IntegrationConfig {
    platform: string;
    language: string;
    packageManager: string;
    apiKey: string;
    apiKeyName: string;
    features: string[];
}

interface CreatedApiKey {
    id: string;
    name: string;
    key: string;
    created: string;
}

interface Platform {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
}

const PLATFORMS: Platform[] = [
    { id: 'nodejs', name: 'Node.js', icon: <Code className="w-5 h-5" />, description: 'JavaScript/TypeScript applications' },
    { id: 'python', name: 'Python', icon: <Terminal className="w-5 h-5" />, description: 'Python applications and scripts' },
    { id: 'react', name: 'React', icon: <Code className="w-5 h-5" />, description: 'React web applications' },
    { id: 'nextjs', name: 'Next.js', icon: <Code className="w-5 h-5" />, description: 'Next.js applications' },
    { id: 'express', name: 'Express', icon: <Code className="w-5 h-5" />, description: 'Express.js API servers' },
];

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const IntegrationWizard: React.FC<IntegrationWizardProps> = ({ onComplete, className = '' }) => {
    const { isAuthenticated, token, user } = useCommunity();
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [config, setConfig] = useState<IntegrationConfig>({
        platform: '',
        language: '',
        packageManager: '',
        apiKey: '',
        apiKeyName: '',
        features: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createdApiKey, setCreatedApiKey] = useState<CreatedApiKey | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const steps = [
        { id: 'platform', title: 'Select Platform', icon: <Terminal className="w-5 h-5" /> },
        { id: 'package', title: 'Package Manager', icon: <Package className="w-5 h-5" /> },
        { id: 'api-key', title: 'API Key', icon: <Key className="w-5 h-5" /> },
        { id: 'features', title: 'Features', icon: <Settings className="w-5 h-5" /> },
        { id: 'verify', title: 'Verify', icon: <CheckCircle2 className="w-5 h-5" /> },
    ];

    const totalSteps = steps.length;
    const progress = ((currentStep + 1) / totalSteps) * 100;

    const handleNext = async () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Only call handleComplete if we're on the last step and haven't created the key yet
            if (!createdApiKey && !isSubmitting) {
                await handleComplete();
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = async () => {
        if (!isAuthenticated) {
            setShowAuthPrompt(true);
            return;
        }

        if (!token) {
            setError('Authentication token is missing. Please sign in again.');
            setShowAuthPrompt(true);
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Create API key name based on platform and features
            const keyName = config.apiKeyName || `Integration-${config.platform}-${Date.now()}`;

            console.log('Creating API key:', { keyName, url: `${API_BASE_URL}/api-keys` });

            // Create API key via backend
            const response = await fetch(`${API_BASE_URL}/api-keys`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: keyName }),
            });

            console.log('API response status:', response.status);

            if (!response.ok) {
                let errorMessage = 'Failed to create API key';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorData.message || errorMessage;
                    console.error('API error response:', errorData);
                } catch {
                    const text = await response.text();
                    console.error('API error text:', text);
                    errorMessage = text || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('API success response:', data);

            // Handle different response formats
            const apiKeyData = data.data || data;

            if (!apiKeyData || !apiKeyData.key) {
                console.error('Invalid API key response:', data);
                throw new Error('Invalid response from server. API key not found in response.');
            }

            setCreatedApiKey({
                id: apiKeyData.id || apiKeyData._id || '',
                name: apiKeyData.name || keyName,
                key: apiKeyData.key,
                created: apiKeyData.created || apiKeyData.createdAt || new Date().toISOString(),
            });

            setConfig({ ...config, apiKey: apiKeyData.key, apiKeyName: keyName });
            setIsSubmitting(false); // Stop loading state after successful creation
            onComplete?.({ ...config, apiKey: apiKeyData.key, apiKeyName: keyName });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create API key. Please try again.';
            setError(errorMessage);
            console.error('Error creating API key:', err);
            setIsSubmitting(false); // Stop loading state on error
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 0:
                return !!config.platform;
            case 1:
                return !!config.packageManager;
            case 2:
                return isAuthenticated;
            case 3:
                return config.features.length > 0;
            default:
                return true;
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                            What platform are you using?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {PLATFORMS.map((platform) => (
                                <button
                                    key={platform.id}
                                    onClick={() => setConfig({ ...config, platform: platform.id, language: platform.id })}
                                    className={`p-4 rounded-xl border-2 text-left transition-all ${config.platform === platform.id
                                        ? 'border-primary-500 bg-primary-500/10 dark:bg-primary-500/20'
                                        : 'border-primary-200/30 dark:border-primary-700/30 hover:border-primary-500/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-lg ${config.platform === platform.id
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-primary-500/10 text-primary-500'
                                            }`}>
                                            {platform.icon}
                                        </div>
                                        <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                                            {platform.name}
                                        </span>
                                    </div>
                                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                                        {platform.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 1: {
                const packageManagers = config.platform === 'python'
                    ? [{ id: 'pip', name: 'pip' }, { id: 'poetry', name: 'Poetry' }, { id: 'conda', name: 'Conda' }]
                    : [{ id: 'npm', name: 'npm' }, { id: 'yarn', name: 'Yarn' }, { id: 'pnpm', name: 'pnpm' }];

                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                            Which package manager do you use?
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {packageManagers.map((pm) => (
                                <button
                                    key={pm.id}
                                    onClick={() => setConfig({ ...config, packageManager: pm.id })}
                                    className={`p-4 rounded-xl border-2 transition-all ${config.packageManager === pm.id
                                        ? 'border-primary-500 bg-primary-500/10 dark:bg-primary-500/20'
                                        : 'border-primary-200/30 dark:border-primary-700/30 hover:border-primary-500/50'
                                        }`}
                                >
                                    <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                                        {pm.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            }

            case 2:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                            {isAuthenticated ? 'Create API Key' : 'Sign In to Create API Key'}
                        </h3>
                        {!isAuthenticated ? (
                            <div className="p-6 rounded-xl border-2 border-primary-200/30 dark:border-primary-700/30
                                bg-gradient-light-panel dark:bg-gradient-dark-panel text-center">
                                <LogIn className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                                    You need to sign in to create an API key for your integration.
                                </p>
                                <button
                                    onClick={() => setShowAuthPrompt(true)}
                                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 
                                        hover:from-primary-600 hover:to-accent-600 text-white 
                                        transition-all duration-200 flex items-center gap-2 mx-auto"
                                >
                                    <LogIn size={18} />
                                    Sign In
                                </button>
                                <p className="text-xs text-light-text-muted dark:text-dark-text-muted mt-4">
                                    Or <a href="https://app.costkatana.com" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline inline-flex items-center gap-1">
                                        create an account <ExternalLink size={12} />
                                    </a>
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-success-500/10 border border-success-500/30">
                                    <div className="flex items-center gap-2 text-success-600 dark:text-success-400 mb-2">
                                        <CheckCircle2 size={18} />
                                        <span className="font-semibold">Signed in as {user?.name || user?.email}</span>
                                    </div>
                                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                                        We'll create a new API key for you in the next step.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                                        API Key Name (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={config.apiKeyName}
                                        onChange={(e) => setConfig({ ...config, apiKeyName: e.target.value })}
                                        placeholder={`Integration-${config.platform || 'my-app'}`}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-primary-200/30 dark:border-primary-700/30
                                            bg-white dark:bg-dark-bg-200
                                            text-light-text-primary dark:text-dark-text-primary
                                            focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10
                                            transition-all"
                                    />
                                    <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
                                        A descriptive name for your API key (e.g., "Production", "Development")
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 3: {
                const availableFeatures = [
                    { id: 'tracking', name: 'Usage Tracking', description: 'Track AI API calls and costs' },
                    { id: 'analytics', name: 'Cost Analytics', description: 'Get detailed cost insights' },
                    { id: 'optimization', name: 'AI Optimization', description: 'Automatic cost reduction' },
                    { id: 'caching', name: 'Semantic Caching', description: 'Cache responses to save costs' },
                ];

                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
                            Select features to enable
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {availableFeatures.map((feature) => (
                                <label
                                    key={feature.id}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${config.features.includes(feature.id)
                                        ? 'border-primary-500 bg-primary-500/10 dark:bg-primary-500/20'
                                        : 'border-primary-200/30 dark:border-primary-700/30 hover:border-primary-500/50'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            checked={config.features.includes(feature.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setConfig({ ...config, features: [...config.features, feature.id] });
                                                } else {
                                                    setConfig({ ...config, features: config.features.filter(f => f !== feature.id) });
                                                }
                                            }}
                                            className="mt-1 w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                                        />
                                        <div>
                                            <div className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                                                {feature.name}
                                            </div>
                                            <div className="text-sm text-light-text-muted dark:text-dark-text-muted mt-1">
                                                {feature.description}
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            }

            case 4: {
                const installCommand = config.platform === 'python'
                    ? `pip install costkatana`
                    : `${config.packageManager} install cost-katana`;

                return (
                    <div className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-xl bg-error-500/10 border border-error-500/30">
                                <div className="flex items-center gap-2 text-error-600 dark:text-error-400">
                                    <AlertCircle size={18} />
                                    <span className="font-semibold">Error</span>
                                </div>
                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-2">
                                    {error}
                                </p>
                            </div>
                        )}

                        {isSubmitting ? (
                            <div className="text-center py-8">
                                <Loader2 className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-4" />
                                <p className="text-light-text-muted dark:text-dark-text-muted">
                                    Creating your API key...
                                </p>
                            </div>
                        ) : createdApiKey ? (
                            <>
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                        API Key Created!
                                    </h3>
                                    <p className="text-light-text-muted dark:text-dark-text-muted">
                                        Your API key has been created. Save it securely!
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-warning-500/10 border-2 border-warning-500/30">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                                            Your API Key
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(createdApiKey.key);
                                                setCopied(true);
                                                setTimeout(() => setCopied(false), 2000);
                                            }}
                                            className="px-3 py-1 rounded-lg bg-primary-500/10 hover:bg-primary-500/20 
                                                text-primary-600 dark:text-primary-400 transition-all 
                                                flex items-center gap-2 text-sm"
                                        >
                                            {copied ? <Check size={16} /> : <Copy size={16} />}
                                            {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                    <code className="block mt-2 p-3 rounded-lg bg-gray-900 dark:bg-black text-green-400 font-mono text-sm break-all">
                                        {createdApiKey.key}
                                    </code>
                                    <p className="text-xs text-warning-600 dark:text-warning-400 mt-2">
                                        ⚠️ This is the only time you'll see this key. Make sure to save it!
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <Key className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                    Ready to Create API Key
                                </h3>
                                <p className="text-light-text-muted dark:text-dark-text-muted mb-6">
                                    Click the "Create API Key" button below to generate your API key and complete the setup.
                                </p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-light-bg-200 dark:bg-dark-bg-300 border border-primary-200/30 dark:border-primary-700/30">
                                <div className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                    Step 1: Install the package
                                </div>
                                <code className="block mt-2 p-3 rounded-lg bg-gray-900 dark:bg-black text-green-400 font-mono text-sm">
                                    {installCommand}
                                </code>
                            </div>

                            <div className="p-4 rounded-xl bg-light-bg-200 dark:bg-dark-bg-300 border border-primary-200/30 dark:border-primary-700/30">
                                <div className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                    Step 2: Configure your API key
                                </div>
                                <pre className="mt-2 p-3 rounded-lg bg-gray-900 dark:bg-black text-green-400 font-mono text-sm overflow-x-auto">
                                    <code className="break-all whitespace-pre-wrap">
                                        {config.platform === 'python'
                                            ? `export COSTKATANA_API_KEY="${createdApiKey?.key || 'YOUR_API_KEY'}"`
                                            : `export COST_KATANA_API_KEY="${createdApiKey?.key || 'YOUR_API_KEY'}"`}
                                    </code>
                                </pre>
                            </div>

                            <div className="p-4 rounded-xl bg-light-bg-200 dark:bg-dark-bg-300 border border-primary-200/30 dark:border-primary-700/30">
                                <div className="font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                    Step 3: Start tracking
                                </div>
                                <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                                    You're all set! Check the documentation for code examples.
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }

            default:
                return null;
        }
    };

    return (
        <div className={`my-8 rounded-xl border border-primary-200/30 dark:border-primary-700/30 
            bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-xl overflow-hidden ${className}`}>
            {/* Header */}
            <div className="px-6 py-4 border-b border-primary-200/30 dark:border-primary-700/30
                bg-gradient-to-r from-primary-500/10 to-accent-500/10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary-500 text-white">
                        <Wand2 className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-display font-bold text-light-text-primary dark:text-dark-text-primary">
                            Integration Setup Wizard
                        </h3>
                        <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                            Step-by-step guide to integrate Cost Katana
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-primary-200/30 dark:bg-primary-700/30 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <div className="flex items-center justify-between mt-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    <span>Step {currentStep + 1} of {totalSteps}</span>
                    <span>{Math.round(progress)}% Complete</span>
                </div>
            </div>

            {/* Step Indicators */}
            <div className="px-6 py-4 bg-light-bg-100 dark:bg-dark-bg-200 border-b border-primary-200/30 dark:border-primary-700/30">
                <div className="flex items-center justify-between overflow-x-auto">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <button
                                onClick={() => setCurrentStep(index)}
                                className={`flex flex-col items-center gap-2 transition-all duration-200 min-w-[80px] ${index === currentStep
                                    ? 'scale-110'
                                    : index < currentStep
                                        ? 'opacity-100'
                                        : 'opacity-50'
                                    }`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${index < currentStep
                                        ? 'border-success-500 bg-success-500 text-white'
                                        : index === currentStep
                                            ? 'border-primary-500 bg-primary-500 text-white'
                                            : 'border-primary-200 dark:border-primary-700 bg-transparent text-light-text-secondary dark:text-dark-text-secondary'
                                        }`}
                                >
                                    {index < currentStep ? (
                                        <CheckCircle2 size={20} />
                                    ) : (
                                        step.icon
                                    )}
                                </div>
                                <span
                                    className={`text-xs font-medium text-center ${index === currentStep
                                        ? 'text-primary-600 dark:text-primary-400'
                                        : 'text-light-text-secondary dark:text-dark-text-secondary'
                                        }`}
                                >
                                    {step.title}
                                </span>
                            </button>
                            {index < steps.length - 1 && (
                                <div
                                    className={`flex-1 h-0.5 mx-2 transition-all ${index < currentStep
                                        ? 'bg-success-500'
                                        : 'bg-primary-200 dark:bg-primary-700'
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="p-6 min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderStepContent()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="px-6 py-4 border-t border-primary-200/30 dark:border-primary-700/30 
                bg-light-bg-100 dark:bg-dark-bg-200 flex items-center justify-between">
                <button
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="px-4 py-2 rounded-lg border border-primary-200 dark:border-primary-700 
                        bg-transparent hover:bg-primary-500/10 text-primary-600 dark:text-primary-400 
                        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 
                        flex items-center gap-2"
                >
                    <ArrowLeft size={18} />
                    Previous
                </button>

                <button
                    onClick={handleNext}
                    disabled={(currentStep < totalSteps - 1 && !canProceed()) || isSubmitting || (currentStep === totalSteps - 1 && !!createdApiKey)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 
                        hover:from-primary-600 hover:to-accent-600 text-white 
                        disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 
                        flex items-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Creating API key...
                        </>
                    ) : currentStep === totalSteps - 1 ? (
                        createdApiKey ? (
                            <>
                                <CheckCircle2 size={18} />
                                Complete
                            </>
                        ) : (
                            <>
                                Create API Key
                                <Key size={18} />
                            </>
                        )
                    ) : (
                        <>
                            Next
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </div>

            {/* Auth Prompt Modal */}
            <AuthPrompt
                isOpen={showAuthPrompt}
                onClose={() => setShowAuthPrompt(false)}
                message="Sign in to create an API key for your integration"
            />
        </div>
    );
};

export default IntegrationWizard;

