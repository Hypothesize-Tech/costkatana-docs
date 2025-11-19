import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
    Search,
    Cpu,
    Sparkles,
    Zap,
    DollarSign,
    Filter,
    Bot,
    Brain,
    SearchIcon,
    Cloud,
    X,
    Microscope,
    Wind,
    Target,
    Zap as Lightning,
    Beef,
    FileText,
    Eye,
    Music,
    Image as ImageIcon,
    Film,
    Laptop,
    Calculator,
    Star,
    Clipboard
} from 'lucide-react';

interface Model {
    id: string;
    name: string;
    series: string;
    useCases: string[];
    pricingTier: 1 | 2 | 3;
    isLatest?: boolean;
    isRecommended?: boolean;
}

interface Provider {
    id: string;
    name: string;
    logo: string; // Path to logo image
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logoFallback?: React.ComponentType<any>; // Fallback icon if image not available
    description: string;
    models: Model[];
}

const SupportedModelsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProvider, setSelectedProvider] = useState<string>('all');
    const [selectedUseCase, setSelectedUseCase] = useState<string>('all');

    const providers: Provider[] = [
        {
            id: 'openai',
            name: 'OpenAI',
            logo: '/assets/openai.png',
            logoFallback: Bot,
            description: 'GPT-5, GPT-4o, O-Series reasoning models, DALL-E, and more',
            models: [
                { id: 'gpt-5', name: 'GPT-5', series: 'GPT-5 Series', useCases: ['text', 'reasoning', 'coding', 'agents'], pricingTier: 3, isLatest: true, isRecommended: true },
                { id: 'gpt-5-mini', name: 'GPT-5 Mini', series: 'GPT-5 Series', useCases: ['text', 'reasoning'], pricingTier: 2, isLatest: true },
                { id: 'gpt-5-nano', name: 'GPT-5 Nano', series: 'GPT-5 Series', useCases: ['text', 'fast'], pricingTier: 1, isLatest: true },
                { id: 'gpt-5-pro', name: 'GPT-5 Pro', series: 'GPT-5 Series', useCases: ['text', 'reasoning', 'premium'], pricingTier: 3, isLatest: true },
                { id: 'gpt-4o', name: 'GPT-4o', series: 'GPT-4o Series', useCases: ['text', 'vision', 'audio'], pricingTier: 2, isRecommended: true },
                { id: 'gpt-4o-mini', name: 'GPT-4o Mini', series: 'GPT-4o Series', useCases: ['text', 'vision'], pricingTier: 1 },
                { id: 'o3-pro', name: 'O3 Pro', series: 'O-Series', useCases: ['reasoning', 'research'], pricingTier: 3 },
                { id: 'o1', name: 'O1', series: 'O-Series', useCases: ['reasoning'], pricingTier: 2 },
                { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', series: 'GPT-4 Series', useCases: ['text', 'vision'], pricingTier: 2 },
                { id: 'gpt-4', name: 'GPT-4', series: 'GPT-4 Series', useCases: ['text'], pricingTier: 3 },
                { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', series: 'GPT-3.5 Series', useCases: ['text', 'fast'], pricingTier: 1 },
                { id: 'dall-e-3', name: 'DALL-E 3', series: 'Image Generation', useCases: ['image'], pricingTier: 2 },
                { id: 'whisper-1', name: 'Whisper', series: 'Audio', useCases: ['audio', 'transcription'], pricingTier: 1 },
            ]
        },
        {
            id: 'anthropic',
            name: 'Anthropic',
            logo: '/assets/claudeai.png',
            logoFallback: Brain,
            description: 'Claude Sonnet 4.5, Claude 4, Claude 3.5 Sonnet, and more',
            models: [
                { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', series: 'Claude 4.5 Series', useCases: ['text', 'reasoning', 'coding'], pricingTier: 3, isLatest: true, isRecommended: true },
                { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5', series: 'Claude 4.5 Series', useCases: ['text', 'fast'], pricingTier: 1, isLatest: true },
                { id: 'claude-opus-4-1', name: 'Claude Opus 4.1', series: 'Claude 4 Series', useCases: ['text', 'reasoning', 'premium'], pricingTier: 3 },
                { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', series: 'Claude 3.5 Series', useCases: ['text', 'reasoning', 'coding'], pricingTier: 2, isRecommended: true },
                { id: 'claude-3-5-haiku', name: 'Claude 3.5 Haiku', series: 'Claude 3.5 Series', useCases: ['text', 'fast'], pricingTier: 1 },
                { id: 'claude-3-opus', name: 'Claude 3 Opus', series: 'Claude 3 Series', useCases: ['text', 'reasoning'], pricingTier: 3 },
                { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', series: 'Claude 3 Series', useCases: ['text'], pricingTier: 2 },
                { id: 'claude-3-haiku', name: 'Claude 3 Haiku', series: 'Claude 3 Series', useCases: ['text', 'fast'], pricingTier: 1 },
            ]
        },
        {
            id: 'google',
            name: 'Google AI',
            logo: '/assets/geminiai.svg',
            logoFallback: SearchIcon,
            description: 'Gemini 2.5 Pro, Gemini 2.0 Flash, Imagen, Veo, and more',
            models: [
                { id: 'gemini-2-5-pro', name: 'Gemini 2.5 Pro', series: 'Gemini 2.5 Series', useCases: ['text', 'vision', 'audio'], pricingTier: 2, isLatest: true, isRecommended: true },
                { id: 'gemini-2-5-flash', name: 'Gemini 2.5 Flash', series: 'Gemini 2.5 Series', useCases: ['text', 'vision', 'fast'], pricingTier: 1, isLatest: true },
                { id: 'gemini-2-0-flash', name: 'Gemini 2.0 Flash', series: 'Gemini 2.0 Series', useCases: ['text', 'vision', 'fast'], pricingTier: 1 },
                { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', series: 'Gemini 1.5 Series', useCases: ['text', 'vision'], pricingTier: 2 },
                { id: 'gemini-1-5-flash', name: 'Gemini 1.5 Flash', series: 'Gemini 1.5 Series', useCases: ['text', 'vision', 'fast'], pricingTier: 1 },
                { id: 'imagen-4', name: 'Imagen 4', series: 'Imagen Series', useCases: ['image'], pricingTier: 2 },
                { id: 'veo-3', name: 'Veo 3', series: 'Veo Series', useCases: ['video'], pricingTier: 3 },
            ]
        },
        {
            id: 'aws-bedrock',
            name: 'AWS Bedrock',
            logo: '/assets/aws-bedrock.svg',
            logoFallback: Cloud,
            description: 'Amazon Nova, Claude on Bedrock, Llama, Mistral, and more',
            models: [
                { id: 'nova-pro', name: 'Amazon Nova Pro', series: 'Nova Series', useCases: ['text', 'vision'], pricingTier: 2, isRecommended: true },
                { id: 'nova-lite', name: 'Amazon Nova Lite', series: 'Nova Series', useCases: ['text', 'fast'], pricingTier: 1 },
                { id: 'nova-micro', name: 'Amazon Nova Micro', series: 'Nova Series', useCases: ['text', 'fast'], pricingTier: 1 },
                { id: 'claude-bedrock', name: 'Claude on Bedrock', series: 'Claude Series', useCases: ['text', 'reasoning'], pricingTier: 2 },
                { id: 'llama-3-3', name: 'Llama 3.3 70B', series: 'Llama Series', useCases: ['text', 'coding'], pricingTier: 2 },
            ]
        },
        {
            id: 'xai',
            name: 'xAI',
            logo: '',
            logoFallback: X,
            description: 'Grok-2, Grok Vision, and more',
            models: [
                { id: 'grok-2', name: 'Grok-2', series: 'Grok Series', useCases: ['text', 'reasoning'], pricingTier: 2, isRecommended: true },
                { id: 'grok-2-vision', name: 'Grok-2 Vision', series: 'Grok Series', useCases: ['text', 'vision'], pricingTier: 2 },
                { id: 'grok-beta', name: 'Grok Beta', series: 'Grok Series', useCases: ['text'], pricingTier: 2 },
            ]
        },
        {
            id: 'deepseek',
            name: 'DeepSeek',
            logo: '',
            logoFallback: Microscope,
            description: 'DeepSeek Chat and DeepSeek Reasoner models',
            models: [
                { id: 'deepseek-chat', name: 'DeepSeek Chat', series: 'DeepSeek Series', useCases: ['text', 'coding'], pricingTier: 1, isRecommended: true },
                { id: 'deepseek-reasoner', name: 'DeepSeek Reasoner', series: 'DeepSeek Series', useCases: ['reasoning'], pricingTier: 2 },
            ]
        },
        {
            id: 'mistral',
            name: 'Mistral AI',
            logo: '/assets/mistral_logo.svg',
            logoFallback: Wind,
            description: 'Mistral Large, Codestral, Pixtral, and more',
            models: [
                { id: 'mistral-large', name: 'Mistral Large', series: 'Mistral Series', useCases: ['text', 'reasoning'], pricingTier: 2, isRecommended: true },
                { id: 'mistral-small', name: 'Mistral Small', series: 'Mistral Series', useCases: ['text', 'fast'], pricingTier: 1 },
                { id: 'codestral', name: 'Codestral', series: 'Mistral Series', useCases: ['coding'], pricingTier: 2 },
                { id: 'pixtral', name: 'Pixtral', series: 'Mistral Series', useCases: ['vision'], pricingTier: 2 },
            ]
        },
        {
            id: 'cohere',
            name: 'Cohere',
            logo: '/assets/cohere_logo.svg',
            logoFallback: Target,
            description: 'Command R+, Command R, embeddings, and reranking',
            models: [
                { id: 'command-r-plus', name: 'Command R+', series: 'Command Series', useCases: ['text', 'reasoning'], pricingTier: 2, isRecommended: true },
                { id: 'command-r', name: 'Command R', series: 'Command Series', useCases: ['text'], pricingTier: 2 },
                { id: 'command-light', name: 'Command Light', series: 'Command Series', useCases: ['text', 'fast'], pricingTier: 1 },
            ]
        },
        {
            id: 'groq',
            name: 'Groq',
            logo: '/assets/grokai.png',
            logoFallback: Lightning,
            description: 'Ultra-fast Llama, Mixtral, and Gemma models',
            models: [
                { id: 'llama-3-3-70b', name: 'Llama 3.3 70B', series: 'Llama Series', useCases: ['text', 'fast'], pricingTier: 1, isRecommended: true },
                { id: 'llama-3-1-70b', name: 'Llama 3.1 70B', series: 'Llama Series', useCases: ['text', 'fast'], pricingTier: 1 },
                { id: 'mixtral-8x7b', name: 'Mixtral 8x7B', series: 'Mixtral Series', useCases: ['text', 'fast'], pricingTier: 1 },
            ]
        },
        {
            id: 'meta',
            name: 'Meta',
            logo: '',
            logoFallback: Beef,
            description: 'Llama 3.3, Llama 3.2, Llama 3.1, and more',
            models: [
                { id: 'llama-3-3-70b', name: 'Llama 3.3 70B', series: 'Llama 3.3 Series', useCases: ['text', 'coding'], pricingTier: 1, isRecommended: true },
                { id: 'llama-3-2-vision', name: 'Llama 3.2 Vision', series: 'Llama 3.2 Series', useCases: ['text', 'vision'], pricingTier: 1 },
                { id: 'llama-3-1-405b', name: 'Llama 3.1 405B', series: 'Llama 3.1 Series', useCases: ['text', 'reasoning'], pricingTier: 2 },
            ]
        },
    ];

    const allUseCases = useMemo(() => {
        const cases = new Set<string>();
        providers.forEach(provider => {
            provider.models.forEach(model => {
                model.useCases.forEach(useCase => cases.add(useCase));
            });
        });
        return Array.from(cases).sort();
    }, []);

    const filteredProviders = useMemo(() => {
        return providers.map(provider => {
            const filteredModels = provider.models.filter(model => {
                const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    model.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    model.useCases.some(uc => uc.toLowerCase().includes(searchQuery.toLowerCase()));

                const matchesUseCase = selectedUseCase === 'all' || model.useCases.includes(selectedUseCase);

                return matchesSearch && matchesUseCase;
            });

            return { ...provider, models: filteredModels };
        }).filter(provider =>
            (selectedProvider === 'all' || provider.id === selectedProvider) &&
            provider.models.length > 0
        );
    }, [searchQuery, selectedProvider, selectedUseCase]);

    const totalModels = providers.reduce((sum, provider) => sum + provider.models.length, 0);

    const getPricingIcon = (tier: 1 | 2 | 3) => {
        return Array(tier).fill(null).map((_, i) => (
            <DollarSign key={i} size={14} className="inline-block" />
        ));
    };

    const getUseCaseIcon = (useCase: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const icons: Record<string, React.ComponentType<any>> = {
            text: FileText,
            vision: Eye,
            audio: Music,
            image: ImageIcon,
            video: Film,
            coding: Laptop,
            reasoning: Calculator,
            fast: Zap,
            premium: Star,
            research: Microscope,
            agents: Bot,
            transcription: Clipboard,
        };
        const IconComponent = icons[useCase] || Cpu;
        return <IconComponent size={14} className="inline-block" />;
    };

    return (
        <>
            <Helmet>
                <title>Supported AI Models - Cost Katana Documentation</title>
                <meta name="description" content="Complete list of 400+ supported AI models across OpenAI, Anthropic, Google AI, AWS Bedrock, xAI, DeepSeek, Mistral, Cohere, Groq, and Meta." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <Cpu className="w-12 h-12 text-blue-600 mr-3" />
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Supported AI Models
                            </h1>
                        </div>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                            Track and optimize costs across 400+ AI models from 10 providers
                        </p>

                        {/* Stats */}
                        <div className="flex justify-center gap-8 mb-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">{totalModels}+</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Models</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600">{providers.length}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Providers</div>
                            </div>
                        </div>

                        {/* Search and Filters */}
                        <div className="max-w-4xl mx-auto space-y-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search models, series, or use cases..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap gap-4 justify-center">
                                {/* Provider Filter */}
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-gray-500" />
                                    <select
                                        value={selectedProvider}
                                        onChange={(e) => setSelectedProvider(e.target.value)}
                                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">All Providers</option>
                                        {providers.map(provider => (
                                            <option key={provider.id} value={provider.id}>{provider.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Use Case Filter */}
                                <select
                                    value={selectedUseCase}
                                    onChange={(e) => setSelectedUseCase(e.target.value)}
                                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Use Cases</option>
                                    {allUseCases.map(useCase => (
                                        <option key={useCase} value={useCase}>
                                            {useCase.charAt(0).toUpperCase() + useCase.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    {/* Providers and Models */}
                    <div className="space-y-12">
                        {filteredProviders.map((provider, providerIndex) => (
                            <motion.div
                                key={provider.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: providerIndex * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
                            >
                                {/* Provider Header */}
                                <div className="flex items-center mb-6">
                                    <div className="mr-4 w-12 h-12 flex items-center justify-center">
                                        {provider.logo ? (
                                            <img
                                                src={provider.logo}
                                                alt={`${provider.name} logo`}
                                                className="w-10 h-10 object-contain"
                                            />
                                        ) : provider.logoFallback ? (
                                            <provider.logoFallback size={40} className="text-gray-700 dark:text-gray-300" />
                                        ) : null}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {provider.name}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-400">{provider.description}</p>
                                    </div>
                                    <div className="ml-auto bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full">
                                        <span className="text-blue-800 dark:text-blue-200 font-semibold">
                                            {provider.models.length} models
                                        </span>
                                    </div>
                                </div>

                                {/* Models Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {provider.models.map((model, modelIndex) => (
                                        <motion.div
                                            key={model.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: modelIndex * 0.05 }}
                                            className="relative p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all hover:shadow-md"
                                        >
                                            {/* Badges */}
                                            <div className="absolute top-2 right-2 flex gap-1">
                                                {model.isLatest && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                        <Sparkles className="w-3 h-3 mr-1" />
                                                        Latest
                                                    </span>
                                                )}
                                                {model.isRecommended && (
                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                        <Zap className="w-3 h-3 mr-1" />
                                                        Popular
                                                    </span>
                                                )}
                                            </div>

                                            {/* Model Info */}
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 pr-20">
                                                {model.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                                {model.series}
                                            </p>

                                            {/* Use Cases */}
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {model.useCases.map(useCase => (
                                                    <span
                                                        key={useCase}
                                                        className="inline-flex items-center text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                                                    >
                                                        <span className="mr-1">{getUseCaseIcon(useCase)}</span>
                                                        {useCase}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Pricing */}
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                <DollarSign className="w-4 h-4 mr-1" />
                                                <span className="font-semibold">{getPricingIcon(model.pricingTier)}</span>
                                                <span className="ml-2">
                                                    {model.pricingTier === 1 ? 'Budget' : model.pricingTier === 2 ? 'Standard' : 'Premium'}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredProviders.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <p className="text-xl text-gray-600 dark:text-gray-400">
                                No models found matching your criteria
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedProvider('all');
                                    setSelectedUseCase('all');
                                }}
                                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </motion.div>
                    )}

                    {/* Footer Note */}
                    <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
                        <p className="mb-2">
                            💡 <strong>Note:</strong> This is a curated list of popular models. Cost Katana supports 400+ models across all providers.
                        </p>
                        <p>
                            Visit our{' '}
                            <a href="/getting-started/quick-start" className="text-blue-600 hover:underline">
                                Quick Start Guide
                            </a>{' '}
                            to learn how to integrate with any model.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SupportedModelsPage;

