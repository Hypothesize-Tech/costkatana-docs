import React, { useState, useEffect } from 'react';
import { Code2, Languages, FileCode, Download, Copy, Check, Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Feature {
    id: string;
    name: string;
    description: string;
    category: 'core' | 'advanced' | 'optimization' | 'analytics';
}

interface Language {
    id: string;
    name: string;
    extension: string;
    icon: React.ReactNode;
}

interface SDKGeneratorProps {
    className?: string;
}

const AVAILABLE_LANGUAGES: Language[] = [
    { id: 'javascript', name: 'JavaScript', extension: 'js', icon: <Code2 className="w-5 h-5" /> },
    { id: 'typescript', name: 'TypeScript', extension: 'ts', icon: <FileCode className="w-5 h-5" /> },
    { id: 'python', name: 'Python', extension: 'py', icon: <Languages className="w-5 h-5" /> },
    { id: 'nodejs', name: 'Node.js', extension: 'js', icon: <Code2 className="w-5 h-5" /> },
];

const AVAILABLE_FEATURES: Feature[] = [
    {
        id: 'basic-tracking',
        name: 'Basic Usage Tracking',
        description: 'Track AI API calls and costs',
        category: 'core'
    },
    {
        id: 'cost-analytics',
        name: 'Cost Analytics',
        description: 'Get detailed cost breakdowns and insights',
        category: 'analytics'
    },
    {
        id: 'optimization',
        name: 'AI Optimization',
        description: 'Automatic prompt optimization and cost reduction',
        category: 'optimization'
    },
    {
        id: 'caching',
        name: 'Semantic Caching',
        description: 'Cache responses to reduce redundant API calls',
        category: 'optimization'
    },
    {
        id: 'multi-provider',
        name: 'Multi-Provider Support',
        description: 'Support for OpenAI, Anthropic, Google, and more',
        category: 'core'
    },
    {
        id: 'webhooks',
        name: 'Webhooks',
        description: 'Real-time event notifications',
        category: 'advanced'
    },
    {
        id: 'guardrails',
        name: 'Guardrails',
        description: 'Content filtering and safety checks',
        category: 'advanced'
    },
    {
        id: 'agent_trace',
        name: 'Agent Trace',
        description: 'Multi-step operation monitoring',
        category: 'advanced'
    },
];

const CODE_TEMPLATES: Record<string, Record<string, string>> = {
    javascript: {
        'basic-tracking': `import { CostKatana } from 'cost-katana';

const ck = new CostKatana({
  apiKey: 'your-api-key-here'
});

// Track an AI API call
const response = await ck.track({
  provider: 'openai',
  model: 'gpt-4',
  prompt: 'Hello, world!',
  response: 'Hello! How can I help you?',
  tokens: { input: 10, output: 15 }
});

console.log('Cost:', response.cost);
console.log('Tokens:', response.tokens);`,
        'cost-analytics': `import { CostKatana } from 'cost-katana';

const ck = new CostKatana({
  apiKey: 'your-api-key-here'
});

// Get cost analytics
const analytics = await ck.analytics.get({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  groupBy: ['provider', 'model']
});

console.log('Total Cost:', analytics.totalCost);
console.log('Breakdown:', analytics.breakdown);`,
        'optimization': `import { CostKatana } from 'cost-katana';

const ck = new CostKatana({
  apiKey: 'your-api-key-here'
});

// Optimize a prompt
const optimized = await ck.optimization.optimize({
  prompt: 'Your original prompt here',
  strategy: 'aggressive'
});

console.log('Original tokens:', optimized.original.tokens);
console.log('Optimized tokens:', optimized.optimized.tokens);
console.log('Savings:', optimized.savings);`,
    },
    typescript: {
        'basic-tracking': `import { CostKatana, TrackingResponse } from 'cost-katana';

const ck = new CostKatana({
  apiKey: 'your-api-key-here'
});

// Track an AI API call
const response: TrackingResponse = await ck.track({
  provider: 'openai',
  model: 'gpt-4',
  prompt: 'Hello, world!',
  response: 'Hello! How can I help you?',
  tokens: { input: 10, output: 15 }
});

console.log('Cost:', response.cost);
console.log('Tokens:', response.tokens);`,
        'cost-analytics': `import { CostKatana, AnalyticsResponse } from 'cost-katana';

const ck = new CostKatana({
  apiKey: 'your-api-key-here'
});

// Get cost analytics
const analytics: AnalyticsResponse = await ck.analytics.get({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  groupBy: ['provider', 'model'] as const
});

console.log('Total Cost:', analytics.totalCost);
console.log('Breakdown:', analytics.breakdown);`,
        'optimization': `import { CostKatana, OptimizationResponse } from 'cost-katana';

const ck = new CostKatana({
  apiKey: 'your-api-key-here'
});

// Optimize a prompt
const optimized: OptimizationResponse = await ck.optimization.optimize({
  prompt: 'Your original prompt here',
  strategy: 'aggressive' as const
});

console.log('Original tokens:', optimized.original.tokens);
console.log('Optimized tokens:', optimized.optimized.tokens);
console.log('Savings:', optimized.savings);`,
    },
    python: {
        'basic-tracking': `import costkatana as ck

# Initialize client
client = ck.CostKatana(api_key='your-api-key-here')

# Track an AI API call
response = client.track(
    provider='openai',
    model='gpt-4',
    prompt='Hello, world!',
    response='Hello! How can I help you?',
    tokens={'input': 10, 'output': 15}
)

print(f'Cost: {response.cost}')
print(f'Tokens: {response.tokens}')`,
        'cost-analytics': `import costkatana as ck

# Initialize client
client = ck.CostKatana(api_key='your-api-key-here')

# Get cost analytics
analytics = client.analytics.get(
    start_date='2024-01-01',
    end_date='2024-01-31',
    group_by=['provider', 'model']
)

print(f'Total Cost: {analytics.total_cost}')
print(f'Breakdown: {analytics.breakdown}')`,
        'optimization': `import costkatana as ck

# Initialize client
client = ck.CostKatana(api_key='your-api-key-here')

# Optimize a prompt
optimized = client.optimization.optimize(
    prompt='Your original prompt here',
    strategy='aggressive'
)

print(f'Original tokens: {optimized.original.tokens}')
print(f'Optimized tokens: {optimized.optimized.tokens}')
print(f'Savings: {optimized.savings}')`,
    },
    nodejs: {
        'basic-tracking': `const { CostKatana } = require('cost-katana');

const ck = new CostKatana({
  apiKey: 'your-api-key-here'
});

// Track an AI API call
async function trackUsage() {
  const response = await ck.track({
    provider: 'openai',
    model: 'gpt-4',
    prompt: 'Hello, world!',
    response: 'Hello! How can I help you?',
    tokens: { input: 10, output: 15 }
  });

  console.log('Cost:', response.cost);
  console.log('Tokens:', response.tokens);
}

trackUsage();`,
        'cost-analytics': `const { CostKatana } = require('cost-katana');

const ck = new CostKatana({
  apiKey: 'your-api-key-here'
});

// Get cost analytics
async function getAnalytics() {
  const analytics = await ck.analytics.get({
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    groupBy: ['provider', 'model']
  });

  console.log('Total Cost:', analytics.totalCost);
  console.log('Breakdown:', analytics.breakdown);
}

getAnalytics();`,
        'optimization': `const { CostKatana } = require('cost-katana');

const ck = new CostKatana({
  apiKey: 'your-api-key-here'
});

// Optimize a prompt
async function optimizePrompt() {
  const optimized = await ck.optimization.optimize({
    prompt: 'Your original prompt here',
    strategy: 'aggressive'
  });

  console.log('Original tokens:', optimized.original.tokens);
  console.log('Optimized tokens:', optimized.optimized.tokens);
  console.log('Savings:', optimized.savings);
}

optimizePrompt();`,
    },
};

const SDKGenerator: React.FC<SDKGeneratorProps> = ({ className = '' }) => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript');
    const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set(['basic-tracking']));
    const [generatedCode, setGeneratedCode] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        checkDarkMode();
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        generateCode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLanguage, selectedFeatures]);

    const generateCode = async () => {
        if (selectedFeatures.size === 0) {
            setGeneratedCode('');
            return;
        }

        setIsGenerating(true);

        // Simulate API call - in production, this would call the backend
        setTimeout(() => {
            const templates = CODE_TEMPLATES[selectedLanguage] || {};
            const codeSnippets = Array.from(selectedFeatures)
                .map(featureId => templates[featureId])
                .filter(Boolean);

            if (codeSnippets.length === 0) {
                setGeneratedCode('// Select features to generate code');
            } else {
                // Combine code snippets with imports
                const imports = getImports(selectedLanguage);
                const combinedCode = `${imports}\n\n${codeSnippets.join('\n\n// ---\n\n')}`;
                setGeneratedCode(combinedCode);
            }

            setIsGenerating(false);
        }, 500);
    };

    const getImports = (lang: string): string => {
        switch (lang) {
            case 'javascript':
            case 'nodejs':
                return `// Install: npm install cost-katana
const { CostKatana } = require('cost-katana');`;
            case 'typescript':
                return `// Install: npm install cost-katana
import { CostKatana } from 'cost-katana';`;
            case 'python':
                return `# Install: pip install costkatana
import costkatana as ck`;
            default:
                return '';
        }
    };

    const toggleFeature = (featureId: string) => {
        setSelectedFeatures(prev => {
            const newSet = new Set(prev);
            if (newSet.has(featureId)) {
                newSet.delete(featureId);
            } else {
                newSet.add(featureId);
            }
            return newSet;
        });
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(generatedCode);
            setCopied(true);
            toast.success('Code copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy code');
        }
    };

    const handleDownload = () => {
        const extension = AVAILABLE_LANGUAGES.find(l => l.id === selectedLanguage)?.extension || 'txt';
        const blob = new Blob([generatedCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `costkatana-integration.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Code downloaded!');
    };

    const featuresByCategory = AVAILABLE_FEATURES.reduce((acc, feature) => {
        if (!acc[feature.category]) {
            acc[feature.category] = [];
        }
        acc[feature.category].push(feature);
        return acc;
    }, {} as Record<string, Feature[]>);

    return (
        <div className={`my-8 rounded-xl border border-primary-200/30 dark:border-primary-700/30 
            bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-xl overflow-hidden ${className}`}>
            {/* Header */}
            <div className="px-6 py-4 border-b border-primary-200/30 dark:border-primary-700/30
                bg-gradient-to-r from-primary-500/10 to-accent-500/10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary-500 text-white">
                        <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-display font-bold text-light-text-primary dark:text-dark-text-primary">
                            SDK Code Generator
                        </h3>
                        <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                            Generate code snippets for your preferred language and features
                        </p>
                    </div>
                </div>

                {/* Language Selector */}
                <div className="flex flex-wrap gap-2">
                    {AVAILABLE_LANGUAGES.map((lang) => (
                        <button
                            key={lang.id}
                            onClick={() => setSelectedLanguage(lang.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedLanguage === lang.id
                                ? 'bg-primary-500 text-white shadow-lg'
                                : 'bg-light-bg-200 dark:bg-dark-bg-300 text-light-text-secondary dark:text-dark-text-secondary hover:bg-primary-500/10'
                                }`}
                        >
                            {lang.icon}
                            {lang.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {/* Features Panel */}
                <div className="p-6 border-b border-primary-200/30 dark:border-primary-700/30">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-primary-500" />
                        <h4 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                            Select Features
                        </h4>
                    </div>

                    <div className="space-y-4">
                        {Object.entries(featuresByCategory).map(([category, features]) => (
                            <div key={category}>
                                <h5 className="text-xs font-semibold text-light-text-muted dark:text-dark-text-muted uppercase mb-2">
                                    {category}
                                </h5>
                                <div className="space-y-2">
                                    {features.map((feature) => (
                                        <label
                                            key={feature.id}
                                            className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedFeatures.has(feature.id)
                                                ? 'border-primary-500 bg-primary-500/10 dark:bg-primary-500/20'
                                                : 'border-primary-200/30 dark:border-primary-700/30 hover:border-primary-500/50'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedFeatures.has(feature.id)}
                                                onChange={() => toggleFeature(feature.id)}
                                                className="mt-1 w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium text-light-text-primary dark:text-dark-text-primary">
                                                    {feature.name}
                                                </div>
                                                <div className="text-xs text-light-text-muted dark:text-dark-text-muted mt-1">
                                                    {feature.description}
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Code Preview */}
                <div className="p-6 bg-light-bg-100 dark:bg-dark-bg-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <FileCode className="w-5 h-5 text-primary-500" />
                            <h4 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                                Generated Code
                            </h4>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-lg bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-400 transition-colors"
                                title="Copy code"
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                            </button>
                            <button
                                onClick={handleDownload}
                                disabled={!generatedCode}
                                className="p-2 rounded-lg bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Download code"
                            >
                                <Download size={18} />
                            </button>
                        </div>
                    </div>

                    {isGenerating ? (
                        <div className="flex items-center justify-center h-64">
                            <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                        </div>
                    ) : (
                        <div className="rounded-lg overflow-hidden border border-primary-200/30 dark:border-primary-700/30">
                            <SyntaxHighlighter
                                language={selectedLanguage === 'python' ? 'python' : selectedLanguage === 'typescript' ? 'typescript' : 'javascript'}
                                style={isDark ? oneDark : oneLight}
                                customStyle={{
                                    margin: 0,
                                    padding: '1rem',
                                    background: isDark ? '#1a1a1a' : '#f8fafc',
                                    borderRadius: '0.5rem',
                                }}
                                codeTagProps={{
                                    style: {
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.875rem',
                                        lineHeight: '1.6',
                                    }
                                }}
                            >
                                {generatedCode || '// Select features to generate code'}
                            </SyntaxHighlighter>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SDKGenerator;

