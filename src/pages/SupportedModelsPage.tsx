import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Cpu,
    Zap,
    Bot,
    Brain,
    Code2,
    FileText,
    Eye,
    Palette,
    Video,
    Star,
    X,
    ShieldCheck,
    Database,
    Sparkles,
    MessageSquare,
    Mic,
    Globe,
    Puzzle,
    Target,
    Radio,
    Crown,
    Feather,
    ScanLine,
    Braces,
    FunctionSquare,
    Lightbulb,
    Building2,
    Gauge,
    TrendingUp,
    Server,
    AudioLines,
    Network,
    Wand2,
    Filter,
    ChevronRight,
    ChevronDown,
    ExternalLink,
    Copy,
    Check,
    LayoutGrid,
    List,
    Table2,
    Rows3,
    type LucideIcon
} from 'lucide-react';

interface Model {
    id: string;
    name: string;
    series: string;
    useCases: string[];
    pricingTier: 1 | 2 | 3 | 4;
    isLatest?: boolean;
    isRecommended?: boolean;
    isDeprecated?: boolean;
}

interface Provider {
    id: string;
    name: string;
    logo: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logoFallback?: React.ComponentType<any>;
    description: string;
    models: Model[];
    brandColor: string;
}

// Providers data with brand colors
const providers: Provider[] = [
    {
        id: 'openai',
        name: 'OpenAI',
        logo: '/assets/openai.png',
        logoFallback: Cpu,
        description: 'GPT-5, GPT-4o, O-Series reasoning models, Sora, DALL-E, and more',
        brandColor: '#10a37f',
        models: [
            { id: 'gpt-5.1', name: 'GPT-5.1', series: 'GPT-5.1', useCases: ['text', 'reasoning', 'coding', 'agents'], pricingTier: 3, isLatest: true, isRecommended: true },
            { id: 'gpt-5-mini', name: 'GPT-5 mini', series: 'GPT-5 mini', useCases: ['text', 'fast'], pricingTier: 2, isLatest: true },
            { id: 'gpt-5-nano', name: 'GPT-5 nano', series: 'GPT-5 nano', useCases: ['text', 'fast'], pricingTier: 1, isLatest: true },
            { id: 'gpt-5.1-frontier', name: 'GPT-5.1', series: 'GPT-5.1', useCases: ['text', 'reasoning', 'coding', 'agents'], pricingTier: 3, isRecommended: true },
            { id: 'gpt-5-mini-frontier', name: 'GPT-5 mini', series: 'GPT-5 mini', useCases: ['text', 'fast'], pricingTier: 2 },
            { id: 'gpt-5-nano-frontier', name: 'GPT-5 nano', series: 'GPT-5 nano', useCases: ['text', 'fast'], pricingTier: 1 },
            { id: 'gpt-5-pro', name: 'GPT-5 pro', series: 'GPT-5 pro', useCases: ['text', 'reasoning', 'premium'], pricingTier: 3 },
            { id: 'gpt-5', name: 'GPT-5', series: 'GPT-5', useCases: ['text', 'reasoning', 'coding', 'agents'], pricingTier: 3 },
            { id: 'gpt-4.1', name: 'GPT-4.1', series: 'GPT-4.1', useCases: ['text'], pricingTier: 2 },
            { id: 'gpt-oss-120b', name: 'gpt-oss-120b', series: 'gpt-oss-120b', useCases: ['text', 'reasoning'], pricingTier: 3 },
            { id: 'gpt-oss-20b', name: 'gpt-oss-20b', series: 'gpt-oss-20b', useCases: ['text', 'fast'], pricingTier: 1 },
            { id: 'sora-2', name: 'Sora 2', series: 'Sora 2', useCases: ['video'], pricingTier: 3 },
            { id: 'sora-2-pro', name: 'Sora 2 Pro', series: 'Sora 2 Pro', useCases: ['video'], pricingTier: 3 },
            { id: 'o3-deep-research', name: 'o3-deep-research', series: 'o3-deep-research', useCases: ['research'], pricingTier: 3 },
            { id: 'o4-mini-deep-research', name: 'o4-mini-deep-research', series: 'o4-mini-deep-research', useCases: ['research'], pricingTier: 2 },
            { id: 'gpt-image-1', name: 'GPT Image 1', series: 'GPT Image 1', useCases: ['image'], pricingTier: 2 },
            { id: 'gpt-image-1-mini', name: 'GPT Image 1 mini', series: 'GPT Image 1 mini', useCases: ['image'], pricingTier: 1 },
            { id: 'dall-e-3', name: 'DALL·E 3', series: 'DALL·E 3', useCases: ['image'], pricingTier: 2, isDeprecated: true },
            { id: 'gpt-4o-mini-tts', name: 'GPT-4o mini TTS', series: 'GPT-4o mini TTS', useCases: ['audio'], pricingTier: 1 },
            { id: 'gpt-4o-transcribe', name: 'GPT-4o Transcribe', series: 'GPT-4o Transcribe', useCases: ['transcription'], pricingTier: 2 },
            { id: 'gpt-4o-mini-transcribe', name: 'GPT-4o mini Transcribe', series: 'GPT-4o mini Transcribe', useCases: ['transcription'], pricingTier: 1 },
            { id: 'gpt-realtime', name: 'gpt-realtime', series: 'gpt-realtime', useCases: ['audio', 'realtime'], pricingTier: 2 },
            { id: 'gpt-audio', name: 'gpt-audio', series: 'gpt-audio', useCases: ['audio'], pricingTier: 2 },
            { id: 'gpt-realtime-mini', name: 'gpt-realtime-mini', series: 'gpt-realtime-mini', useCases: ['audio', 'realtime'], pricingTier: 1 },
            { id: 'gpt-audio-mini', name: 'gpt-audio-mini', series: 'gpt-audio-mini', useCases: ['audio'], pricingTier: 1 },
            { id: 'gpt-5-chat-latest', name: 'GPT-5 Chat', series: 'GPT-5 Chat', useCases: ['text'], pricingTier: 3 },
            { id: 'chatgpt-4o-latest', name: 'ChatGPT-4o', series: 'ChatGPT-4o', useCases: ['text'], pricingTier: 2 },
            { id: 'gpt-5.1-chat-latest', name: 'GPT-5.1 Chat', series: 'GPT-5.1 Chat', useCases: ['text'], pricingTier: 3 },
            { id: 'gpt-5.1-codex', name: 'GPT-5.1 Codex', series: 'GPT-5.1 Codex', useCases: ['coding'], pricingTier: 3 },
            { id: 'gpt-5-codex', name: 'GPT-5-Codex', series: 'GPT-5-Codex', useCases: ['coding'], pricingTier: 3 },
            { id: 'o3-pro-all', name: 'o3-pro', series: 'o3-pro', useCases: ['reasoning'], pricingTier: 3 },
            { id: 'o3', name: 'o3', series: 'o3', useCases: ['reasoning'], pricingTier: 2 },
            { id: 'o4-mini', name: 'o4-mini', series: 'o4-mini', useCases: ['reasoning'], pricingTier: 2 },
            { id: 'gpt-4.1-mini', name: 'GPT-4.1 mini', series: 'GPT-4.1 mini', useCases: ['text'], pricingTier: 1 },
            { id: 'gpt-4.1-nano', name: 'GPT-4.1 nano', series: 'GPT-4.1 nano', useCases: ['text'], pricingTier: 1 },
            { id: 'o1-pro', name: 'o1-pro', series: 'o1-pro', useCases: ['reasoning'], pricingTier: 3 },
            { id: 'computer-use-preview', name: 'computer-use-preview', series: 'computer-use-preview', useCases: ['agents'], pricingTier: 2 },
            { id: 'gpt-4o-mini-search-preview', name: 'GPT-4o mini Search Preview', series: 'GPT-4o mini Search Preview', useCases: ['text', 'search'], pricingTier: 1 },
            { id: 'gpt-4o-search-preview', name: 'GPT-4o Search Preview', series: 'GPT-4o Search Preview', useCases: ['text', 'search'], pricingTier: 2 },
            { id: 'gpt-4.5-preview', name: 'GPT-4.5 Preview (Deprecated)', series: 'GPT-4.5 Preview (Deprecated)', useCases: ['text'], pricingTier: 2, isDeprecated: true },
            { id: 'o3-mini', name: 'o3-mini', series: 'o3-mini', useCases: ['reasoning'], pricingTier: 1 },
            { id: 'gpt-4o-mini-audio-preview-1', name: 'GPT-4o mini Audio', series: 'GPT-4o mini Audio', useCases: ['audio'], pricingTier: 1 },
            { id: 'gpt-4o-mini-realtime-preview', name: 'GPT-4o mini Realtime', series: 'GPT-4o mini Realtime', useCases: ['audio', 'realtime'], pricingTier: 1 },
            { id: 'o1', name: 'o1', series: 'o1', useCases: ['reasoning'], pricingTier: 2 },
            { id: 'omni-moderation-latest', name: 'omni-moderation', series: 'omni-moderation', useCases: ['moderation'], pricingTier: 1 },
            { id: 'o1-mini', name: 'o1-mini', series: 'o1-mini', useCases: ['reasoning'], pricingTier: 1, isDeprecated: true },
            { id: 'o1-preview', name: 'o1 Preview', series: 'o1 Preview', useCases: ['reasoning'], pricingTier: 2, isDeprecated: true },
            { id: 'gpt-4o', name: 'GPT-4o', series: 'GPT-4o', useCases: ['text', 'vision'], pricingTier: 2 },
            { id: 'gpt-4o-audio-preview', name: 'GPT-4o Audio', series: 'GPT-4o Audio', useCases: ['audio'], pricingTier: 2 },
            { id: 'gpt-4o-mini', name: 'GPT-4o mini', series: 'GPT-4o mini', useCases: ['text'], pricingTier: 1 },
            { id: 'gpt-4o-realtime-preview', name: 'GPT-4o Realtime', series: 'GPT-4o Realtime', useCases: ['audio', 'realtime'], pricingTier: 2 },
            { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', series: 'GPT-4 Turbo', useCases: ['text'], pricingTier: 2 },
            { id: 'babbage-002', name: 'babbage-002', series: 'babbage-002', useCases: ['text'], pricingTier: 1, isDeprecated: true },
            { id: 'gpt-5.1-codex-mini', name: 'GPT-5.1 Codex mini', series: 'GPT-5.1 Codex mini', useCases: ['coding'], pricingTier: 1 },
            { id: 'codex-mini-latest', name: 'codex-mini-latest', series: 'codex-mini-latest', useCases: ['coding'], pricingTier: 1, isDeprecated: true },
            { id: 'dall-e-2', name: 'DALL·E 2', series: 'DALL·E 2', useCases: ['image'], pricingTier: 1, isDeprecated: true },
            { id: 'davinci-002', name: 'davinci-002', series: 'davinci-002', useCases: ['text'], pricingTier: 2, isDeprecated: true },
            { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', series: 'GPT-3.5 Turbo', useCases: ['text'], pricingTier: 1 },
            { id: 'gpt-4', name: 'GPT-4', series: 'GPT-4', useCases: ['text'], pricingTier: 3 },
            { id: 'gpt-4-turbo-preview', name: 'GPT-4 Turbo Preview', series: 'GPT-4 Turbo Preview', useCases: ['text'], pricingTier: 2, isDeprecated: true },
            { id: 'text-embedding-3-large', name: 'text-embedding-3-large', series: 'text-embedding-3-large', useCases: ['embeddings'], pricingTier: 1 },
            { id: 'text-embedding-3-small', name: 'text-embedding-3-small', series: 'text-embedding-3-small', useCases: ['embeddings'], pricingTier: 1 },
            { id: 'text-embedding-ada-002', name: 'text-embedding-ada-002', series: 'text-embedding-ada-002', useCases: ['embeddings'], pricingTier: 1 },
            { id: 'tts-1', name: 'TTS-1', series: 'TTS-1', useCases: ['audio'], pricingTier: 1 },
            { id: 'tts-1-hd', name: 'TTS-1 HD', series: 'TTS-1 HD', useCases: ['audio'], pricingTier: 2 },
            { id: 'whisper-1', name: 'Whisper', series: 'Whisper', useCases: ['transcription'], pricingTier: 1 },
        ]
    },
    {
        id: 'anthropic',
        name: 'Anthropic',
        logo: '/assets/claudeai.png',
        logoFallback: Star,
        description: 'Claude Sonnet 4.5, Claude 4, Claude 3.5 Sonnet, and more',
        brandColor: '#d97706',
        models: [
            { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', series: 'Claude Sonnet 4.5', useCases: ['text', 'reasoning', 'coding', 'agents'], pricingTier: 3, isLatest: true, isRecommended: true },
            { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5', series: 'Claude Haiku 4.5', useCases: ['text', 'fast'], pricingTier: 1, isLatest: true },
            { id: 'claude-opus-4-5', name: 'Claude Opus 4.5', series: 'Claude Opus 4.5', useCases: ['text', 'reasoning', 'premium'], pricingTier: 3, isLatest: true },
            { id: 'claude-opus-4-1', name: 'Claude Opus 4.1', series: 'Claude Opus 4.1', useCases: ['text', 'reasoning'], pricingTier: 3 },
            { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', series: 'Claude Sonnet 4', useCases: ['text', 'reasoning', 'coding'], pricingTier: 3 },
            { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', series: 'Claude 3.7 Sonnet', useCases: ['text', 'reasoning', 'coding'], pricingTier: 3 },
            { id: 'claude-opus-4', name: 'Claude Opus 4', series: 'Claude Opus 4', useCases: ['text', 'reasoning'], pricingTier: 3 },
            { id: 'claude-3-5-haiku', name: 'Claude 3.5 Haiku', series: 'Claude 3.5 Haiku', useCases: ['text', 'fast'], pricingTier: 1 },
            { id: 'claude-3-haiku', name: 'Claude 3 Haiku', series: 'Claude 3 Haiku', useCases: ['text', 'fast'], pricingTier: 1 },
            { id: 'claude-opus-3', name: 'Claude Opus 3', series: 'Claude Opus 3', useCases: ['text', 'reasoning'], pricingTier: 3, isDeprecated: true },
            { id: 'claude-sonnet-3', name: 'Claude Sonnet 3', series: 'Claude Sonnet 3', useCases: ['text', 'reasoning'], pricingTier: 3, isDeprecated: true },
        ]
    },
    {
        id: 'google',
        name: 'Google AI',
        logo: '/assets/geminiai.svg',
        logoFallback: Eye,
        description: 'Gemini 3 Pro, Gemini 2.5 Pro, Flash models, Imagen, Veo, and more',
        brandColor: '#4285f4',
        models: [
            { id: 'gemini-3-pro-preview', name: 'Gemini 3 Pro Preview', series: 'Gemini 3 Pro Preview', useCases: ['text', 'vision', 'reasoning', 'coding', 'agents'], pricingTier: 3, isLatest: true, isRecommended: true },
            { id: 'gemini-3-pro-image-preview', name: 'Gemini 3 Pro Image Preview', series: 'Gemini 3 Pro Image Preview', useCases: ['text', 'image', 'vision'], pricingTier: 3, isLatest: true },
            { id: 'gemini-2-5-pro', name: 'Gemini 2.5 Pro', series: 'Gemini 2.5 Pro', useCases: ['text', 'vision', 'reasoning', 'coding'], pricingTier: 3, isRecommended: true },
            { id: 'gemini-2-5-flash', name: 'Gemini 2.5 Flash', series: 'Gemini 2.5 Flash', useCases: ['text', 'vision', 'audio', 'fast'], pricingTier: 1, isRecommended: true },
            { id: 'gemini-2-5-flash-preview-09-2025', name: 'Gemini 2.5 Flash Preview', series: 'Gemini 2.5 Flash Preview', useCases: ['text', 'vision', 'audio', 'fast'], pricingTier: 1 },
            { id: 'gemini-2-5-flash-lite', name: 'Gemini 2.5 Flash-Lite', series: 'Gemini 2.5 Flash-Lite', useCases: ['text', 'vision', 'fast'], pricingTier: 1 },
            { id: 'gemini-2-5-flash-native-audio-preview-09-2025', name: 'Gemini 2.5 Flash Native Audio (Live API)', series: 'Gemini 2.5 Flash Native Audio', useCases: ['text', 'audio'], pricingTier: 2 },
            { id: 'gemini-2-5-flash-image', name: 'Gemini 2.5 Flash Image', series: 'Gemini 2.5 Flash Image', useCases: ['text', 'image'], pricingTier: 1 },
            { id: 'gemini-2-5-flash-preview-tts', name: 'Gemini 2.5 Flash Preview TTS', series: 'Gemini 2.5 Flash Preview TTS', useCases: ['text', 'audio'], pricingTier: 1 },
            { id: 'gemini-2-5-pro-preview-tts', name: 'Gemini 2.5 Pro Preview TTS', series: 'Gemini 2.5 Pro Preview TTS', useCases: ['text', 'audio'], pricingTier: 2 },
            { id: 'gemini-2-5-computer-use-preview-10-2025', name: 'Gemini 2.5 Computer Use Preview', series: 'Gemini 2.5 Computer Use Preview', useCases: ['text', 'agents'], pricingTier: 3 },
            { id: 'gemini-2-0-flash', name: 'Gemini 2.0 Flash', series: 'Gemini 2.0 Flash', useCases: ['text', 'vision', 'audio'], pricingTier: 1 },
            { id: 'gemini-2-0-flash-lite', name: 'Gemini 2.0 Flash-Lite', series: 'Gemini 2.0 Flash-Lite', useCases: ['text', 'fast'], pricingTier: 1 },
            { id: 'gemini-robotics-er-1-5-preview', name: 'Gemini Robotics-ER 1.5 Preview', series: 'Gemini Robotics-ER 1.5 Preview', useCases: ['text', 'agents'], pricingTier: 2 },
            { id: 'imagen-4', name: 'Imagen 4', series: 'Imagen 4', useCases: ['image'], pricingTier: 2 },
            { id: 'imagen-3', name: 'Imagen 3', series: 'Imagen 3', useCases: ['image'], pricingTier: 2 },
            { id: 'veo-3-1-generate-preview', name: 'Veo 3.1 Standard', series: 'Veo 3.1', useCases: ['video'], pricingTier: 3 },
            { id: 'veo-3-1-fast-generate-preview', name: 'Veo 3.1 Fast', series: 'Veo 3.1 Fast', useCases: ['video'], pricingTier: 2 },
            { id: 'veo-3-0-generate-001', name: 'Veo 3 Standard', series: 'Veo 3', useCases: ['video'], pricingTier: 3 },
            { id: 'veo-2-0-generate-001', name: 'Veo 2', series: 'Veo 2', useCases: ['video'], pricingTier: 3 },
            { id: 'gemini-embedding-001', name: 'Gemini Embedding', series: 'Gemini Embedding', useCases: ['embeddings'], pricingTier: 1 },
            { id: 'gemma-3', name: 'Gemma 3', series: 'Gemma 3', useCases: ['text'], pricingTier: 1 },
            { id: 'gemma-3n', name: 'Gemma 3n', series: 'Gemma 3n', useCases: ['text', 'fast'], pricingTier: 1 },
            { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', series: 'Gemini 1.5 Pro', useCases: ['text', 'vision'], pricingTier: 2 },
            { id: 'gemini-1-5-flash', name: 'Gemini 1.5 Flash', series: 'Gemini 1.5 Flash', useCases: ['text', 'vision', 'fast'], pricingTier: 1 },
        ]
    },
    {
        id: 'aws-bedrock',
        name: 'AWS Bedrock',
        logo: '/assets/aws-bedrock.svg',
        logoFallback: FileText,
        description: 'Amazon Nova, Claude on Bedrock, Llama, Mistral, and more',
        brandColor: '#ff9900',
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
        logo: '/assets/grokai.png',
        logoFallback: Zap,
        description: 'Grok 4.1 Fast, Grok 4, Grok 3 - Frontier multimodal models',
        brandColor: '#1da1f2',
        models: [
            { id: 'grok-4-1-fast-reasoning', name: 'Grok 4.1 Fast Reasoning', series: 'Grok 4.1 Fast', useCases: ['text', 'vision', 'reasoning', 'agents', 'tools'], pricingTier: 1, isLatest: true, isRecommended: true },
            { id: 'grok-4-1-fast-non-reasoning', name: 'Grok 4.1 Fast Non-Reasoning', series: 'Grok 4.1 Fast', useCases: ['text', 'vision', 'fast'], pricingTier: 1, isLatest: true },
            { id: 'grok-4-fast-reasoning', name: 'Grok 4 Fast Reasoning', series: 'Grok 4 Fast', useCases: ['text', 'vision', 'reasoning', 'agents'], pricingTier: 1 },
            { id: 'grok-4-fast-non-reasoning', name: 'Grok 4 Fast Non-Reasoning', series: 'Grok 4 Fast', useCases: ['text', 'vision', 'fast'], pricingTier: 1 },
            { id: 'grok-4-0709', name: 'Grok 4 (0709)', series: 'Grok 4', useCases: ['text', 'vision', 'reasoning'], pricingTier: 3 },
            { id: 'grok-code-fast-1', name: 'Grok Code Fast 1', series: 'Grok Code', useCases: ['text', 'coding'], pricingTier: 1 },
            { id: 'grok-3', name: 'Grok 3', series: 'Grok 3', useCases: ['text', 'vision', 'reasoning'], pricingTier: 3 },
            { id: 'grok-3-mini', name: 'Grok 3 Mini', series: 'Grok 3 Mini', useCases: ['text', 'vision', 'fast'], pricingTier: 1 },
            { id: 'grok-2-vision-1212', name: 'Grok 2 Vision (1212)', series: 'Grok 2 Vision', useCases: ['text', 'vision'], pricingTier: 2 },
            { id: 'grok-2-image-1212', name: 'Grok 2 Image (1212)', series: 'Grok 2 Image', useCases: ['image'], pricingTier: 1 },
        ]
    },
    {
        id: 'deepseek',
        name: 'DeepSeek',
        logo: '/assets/Deepseek-Logo.jpg',
        logoFallback: Brain,
        description: 'DeepSeek-V3.2-Exp models with advanced reasoning capabilities',
        brandColor: '#6366f1',
        models: [
            { id: 'deepseek-chat', name: 'DeepSeek Chat', series: 'DeepSeek-V3.2-Exp', useCases: ['text', 'coding', 'json', 'functions'], pricingTier: 1, isRecommended: true },
            { id: 'deepseek-reasoner', name: 'DeepSeek Reasoner', series: 'DeepSeek-V3.2-Exp', useCases: ['text', 'reasoning', 'thinking'], pricingTier: 2 },
        ]
    },
    {
        id: 'mistral',
        name: 'Mistral AI',
        logo: '/assets/mistral_logo.svg',
        logoFallback: Eye,
        description: 'Mistral Large, Codestral, Pixtral, Magistral, Devstral, and more',
        brandColor: '#f97316',
        models: [
            { id: 'mistral-large-latest', name: 'Mistral Large', series: 'Mistral Large', useCases: ['text', 'agentic', 'multimodal', 'reasoning'], pricingTier: 3, isRecommended: true },
            { id: 'mistral-medium-latest', name: 'Mistral Medium 3', series: 'Mistral Medium 3', useCases: ['text', 'agentic', 'multimodal'], pricingTier: 2 },
            { id: 'magistral-medium-latest', name: 'Magistral Medium', series: 'Magistral Medium', useCases: ['text', 'reasoning'], pricingTier: 3 },
            { id: 'devstral-medium-2507', name: 'Devstral Medium', series: 'Devstral Medium', useCases: ['coding', 'agentic', 'text'], pricingTier: 2 },
            { id: 'codestral-latest', name: 'Codestral', series: 'Codestral', useCases: ['coding', 'text'], pricingTier: 2 },
            { id: 'mistral-ocr-latest', name: 'Document AI & OCR', series: 'Mistral OCR', useCases: ['ocr', 'multimodal', 'text'], pricingTier: 2 },
            { id: 'voxtral-small-latest', name: 'Voxtral Small', series: 'Voxtral Small', useCases: ['voice', 'text'], pricingTier: 1 },
            { id: 'voxtral-mini-latest', name: 'Voxtral Mini', series: 'Voxtral Mini', useCases: ['voice', 'text'], pricingTier: 1 },
            { id: 'mistral-small-latest', name: 'Mistral Small 3.2', series: 'Mistral Small 3.2', useCases: ['text', 'agentic', 'multimodal', 'lightweight'], pricingTier: 1 },
            { id: 'magistral-small-latest', name: 'Magistral Small', series: 'Magistral Small', useCases: ['text', 'reasoning', 'lightweight'], pricingTier: 1 },
            { id: 'devstral-small-2507', name: 'Devstral Small', series: 'Devstral Small', useCases: ['coding', 'agentic', 'text', 'lightweight'], pricingTier: 1 },
            { id: 'pixtral-large-latest', name: 'Pixtral Large', series: 'Pixtral Large', useCases: ['multimodal', 'text'], pricingTier: 3 },
            { id: 'pixtral-12b', name: 'Pixtral 12B', series: 'Pixtral 12B', useCases: ['multimodal', 'text', 'lightweight'], pricingTier: 1 },
            { id: 'open-mistral-nemo', name: 'Mistral NeMo', series: 'Mistral NeMo', useCases: ['coding', 'text', 'lightweight'], pricingTier: 1 },
            { id: 'open-mistral-7b', name: 'Mistral 7B', series: 'Mistral 7B', useCases: ['text', 'lightweight'], pricingTier: 1 },
            { id: 'open-mixtral-8x7b', name: 'Mixtral 8x7B', series: 'Mixtral 8x7B', useCases: ['text'], pricingTier: 2 },
            { id: 'open-mixtral-8x22b', name: 'Mixtral 8x22B', series: 'Mixtral 8x22B', useCases: ['text'], pricingTier: 3 },
            { id: 'ministral-8b-latest', name: 'Ministral 8B 24.10', series: 'Ministral 8B', useCases: ['text', 'lightweight'], pricingTier: 1 },
            { id: 'ministral-3b-latest', name: 'Ministral 3B 24.10', series: 'Ministral 3B', useCases: ['text', 'lightweight'], pricingTier: 1 },
            { id: 'codestral-embed-2505', name: 'Codestral Embed', series: 'Codestral Embed', useCases: ['coding', 'embedding'], pricingTier: 1 },
            { id: 'mistral-embed', name: 'Mistral Embed', series: 'Mistral Embed', useCases: ['text', 'embedding'], pricingTier: 1 },
        ]
    },
    {
        id: 'cohere',
        name: 'Cohere',
        logo: '/assets/cohere_logo.svg',
        logoFallback: Bot,
        description: 'Command A, Command R, Embed 4, Rerank 3.5, and enterprise AI',
        brandColor: '#39d98a',
        models: [
            { id: 'command-a', name: 'Command A', series: 'Command A', useCases: ['text', 'reasoning', 'enterprise', 'agents'], pricingTier: 3, isRecommended: true },
            { id: 'command-r', name: 'Command R', series: 'Command R', useCases: ['text', 'efficiency', 'performance'], pricingTier: 2, isRecommended: true },
            { id: 'command-r7b', name: 'Command R7B', series: 'Command R7B', useCases: ['text', 'edge', 'commodity-gpu'], pricingTier: 1 },
            { id: 'embed-4', name: 'Embed 4', series: 'Embed 4', useCases: ['embedding', 'multimodal', 'multilingual'], pricingTier: 1 },
            { id: 'rerank-3-5', name: 'Rerank 3.5', series: 'Rerank 3.5', useCases: ['search', 'reranking', 'multilingual'], pricingTier: 2 },
            { id: 'command-r-plus', name: 'Command R+', series: 'Command Series', useCases: ['text', 'reasoning'], pricingTier: 2 },
            { id: 'command-light', name: 'Command Light', series: 'Command Series', useCases: ['text', 'fast'], pricingTier: 1 },
        ]
    },
    {
        id: 'meta',
        name: 'Meta',
        logo: '/assets/meta-logo.jpg',
        logoFallback: Code2,
        description: 'Llama 4 Maverick, Scout, Behemoth - Frontier multimodal models',
        brandColor: '#0668e1',
        models: [
            { id: 'llama-4-maverick', name: 'Llama 4 Maverick', series: 'Llama 4 Maverick', useCases: ['text', 'vision', 'coding', 'reasoning', 'multilingual', 'long-context'], pricingTier: 1, isLatest: true, isRecommended: true },
            { id: 'llama-4-scout', name: 'Llama 4 Scout', series: 'Llama 4 Scout', useCases: ['text', 'vision', 'coding', 'reasoning'], pricingTier: 1, isLatest: true },
            { id: 'llama-4-behemoth', name: 'Llama 4 Behemoth', series: 'Llama 4 Behemoth', useCases: ['text', 'vision', 'coding', 'reasoning', 'multilingual'], pricingTier: 3, isLatest: true },
            { id: 'llama-3-3-70b-alt', name: 'Llama 3.3 70B', series: 'Llama 3.3 Series', useCases: ['text', 'coding'], pricingTier: 1 },
            { id: 'llama-3-2-vision', name: 'Llama 3.2 Vision', series: 'Llama 3.2 Series', useCases: ['text', 'vision'], pricingTier: 1 },
            { id: 'llama-3-1-405b', name: 'Llama 3.1 405B', series: 'Llama 3.1 Series', useCases: ['text', 'reasoning'], pricingTier: 2 },
        ]
    },
];

type ViewMode = 'cards' | 'table' | 'list' | 'accordion';

const SupportedModelsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProvider, setSelectedProvider] = useState<string>('all');
    const [selectedUseCase, setSelectedUseCase] = useState<string>('all');
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>('cards');
    const [expandedProviders, setExpandedProviders] = useState<Set<string>>(new Set());

    const viewModes: { id: ViewMode; name: string; icon: LucideIcon }[] = [
        { id: 'cards', name: 'Cards', icon: LayoutGrid },
        { id: 'table', name: 'Table', icon: Table2 },
        { id: 'list', name: 'List', icon: List },
        { id: 'accordion', name: 'Accordion', icon: Rows3 },
    ];

    const toggleProvider = (providerId: string) => {
        setExpandedProviders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(providerId)) {
                newSet.delete(providerId);
            } else {
                newSet.add(providerId);
            }
            return newSet;
        });
    };

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
    const filteredCount = filteredProviders.reduce((sum, p) => sum + p.models.length, 0);

    // Use case icons with semantic meaning
    const getUseCaseIcon = (useCase: string): { icon: LucideIcon; color: string } => {
        const iconConfig: Record<string, { icon: LucideIcon; color: string }> = {
            text: { icon: MessageSquare, color: 'text-slate-500' },
            vision: { icon: Eye, color: 'text-blue-500' },
            audio: { icon: AudioLines, color: 'text-violet-500' },
            image: { icon: Palette, color: 'text-pink-500' },
            video: { icon: Video, color: 'text-red-500' },
            coding: { icon: Code2, color: 'text-primary-500' },
            reasoning: { icon: Lightbulb, color: 'text-amber-500' },
            fast: { icon: Zap, color: 'text-yellow-500' },
            premium: { icon: Crown, color: 'text-amber-600' },
            research: { icon: Target, color: 'text-indigo-500' },
            agents: { icon: Bot, color: 'text-cyan-500' },
            transcription: { icon: Mic, color: 'text-purple-500' },
            search: { icon: Search, color: 'text-teal-500' },
            moderation: { icon: ShieldCheck, color: 'text-rose-500' },
            embeddings: { icon: Network, color: 'text-emerald-500' },
            embedding: { icon: Network, color: 'text-emerald-500' },
            realtime: { icon: Radio, color: 'text-lime-500' },
            tools: { icon: Puzzle, color: 'text-sky-500' },
            multimodal: { icon: Wand2, color: 'text-fuchsia-500' },
            agentic: { icon: Bot, color: 'text-cyan-500' },
            lightweight: { icon: Feather, color: 'text-gray-500' },
            voice: { icon: Mic, color: 'text-violet-500' },
            ocr: { icon: ScanLine, color: 'text-slate-600' },
            json: { icon: Braces, color: 'text-primary-500' },
            functions: { icon: FunctionSquare, color: 'text-sky-500' },
            thinking: { icon: Brain, color: 'text-orange-500' },
            enterprise: { icon: Building2, color: 'text-rose-600' },
            efficiency: { icon: Gauge, color: 'text-yellow-600' },
            performance: { icon: TrendingUp, color: 'text-indigo-500' },
            edge: { icon: Server, color: 'text-gray-600' },
            reranking: { icon: Puzzle, color: 'text-sky-500' },
            multilingual: { icon: Globe, color: 'text-teal-500' },
            'long-context': { icon: FileText, color: 'text-slate-600' },
            'commodity-gpu': { icon: Server, color: 'text-gray-500' },
        };
        return iconConfig[useCase] || { icon: Cpu, color: 'text-gray-500' };
    };

    const getPricingTierInfo = (tier: number) => {
        switch (tier) {
            case 1: return { label: 'Budget', color: 'bg-primary-500', textColor: 'text-primary-500' };
            case 2: return { label: 'Standard', color: 'bg-highlight-500', textColor: 'text-highlight-500' };
            case 3: return { label: 'Premium', color: 'bg-amber-500', textColor: 'text-amber-500' };
            case 4: return { label: 'Enterprise', color: 'bg-rose-500', textColor: 'text-rose-500' };
            default: return { label: 'Unknown', color: 'bg-gray-500', textColor: 'text-gray-500' };
        }
    };

    const getModelPricing = (modelId: string): { input: string; output: string; cached?: string; notes?: string } | null => {
        const pricing: Record<string, { input: string; output: string; cached?: string; notes?: string }> = {
            // OpenAI GPT-5 Series (Standard pricing)
            'gpt-5.1': { input: '$1.25', output: '$10.00', cached: '$0.125', notes: 'Batch: $0.625/$5.00' },
            'gpt-5.1-frontier': { input: '$1.25', output: '$10.00', cached: '$0.125' },
            'gpt-5': { input: '$1.25', output: '$10.00', cached: '$0.125', notes: 'Batch: $0.625/$5.00' },
            'gpt-5-mini': { input: '$0.25', output: '$2.00', cached: '$0.025', notes: 'Batch: $0.125/$1.00' },
            'gpt-5-mini-frontier': { input: '$0.25', output: '$2.00', cached: '$0.025' },
            'gpt-5-nano': { input: '$0.05', output: '$0.40', cached: '$0.005', notes: 'Batch: $0.025/$0.20' },
            'gpt-5-nano-frontier': { input: '$0.05', output: '$0.40', cached: '$0.005' },
            'gpt-5-pro': { input: '$15.00', output: '$120.00', notes: 'Batch: $7.50/$60.00' },
            'gpt-5-chat-latest': { input: '$1.25', output: '$10.00', cached: '$0.125' },
            'gpt-5.1-chat-latest': { input: '$1.25', output: '$10.00', cached: '$0.125' },
            'gpt-5.1-codex': { input: '$1.25', output: '$10.00', cached: '$0.125', notes: 'Priority: $2.50/$20.00' },
            'gpt-5-codex': { input: '$1.25', output: '$10.00', cached: '$0.125', notes: 'Priority: $2.50/$20.00' },
            'gpt-5.1-codex-mini': { input: '$0.25', output: '$2.00', cached: '$0.025' },

            // OpenAI GPT-4.1 Series
            'gpt-4.1': { input: '$2.00', output: '$8.00', cached: '$0.50', notes: 'Batch: $1.00/$4.00' },
            'gpt-4.1-mini': { input: '$0.40', output: '$1.60', cached: '$0.10', notes: 'Batch: $0.20/$0.80' },
            'gpt-4.1-nano': { input: '$0.10', output: '$0.40', cached: '$0.025', notes: 'Batch: $0.05/$0.20' },

            // OpenAI GPT-4o Series
            'gpt-4o': { input: '$2.50', output: '$10.00', cached: '$1.25', notes: 'Batch: $1.25/$5.00' },
            'gpt-4o-mini': { input: '$0.15', output: '$0.60', cached: '$0.075', notes: 'Batch: $0.075/$0.30' },
            'gpt-4o-audio-preview': { input: '$2.50', output: '$10.00', notes: 'Audio: $40/$80 per 1M' },
            'gpt-4o-mini-audio-preview-1': { input: '$0.15', output: '$0.60', notes: 'Audio: $10/$20 per 1M' },
            'gpt-4o-realtime-preview': { input: '$5.00', output: '$20.00', cached: '$2.50', notes: 'Audio: $40/$80 per 1M' },
            'gpt-4o-mini-realtime-preview': { input: '$0.60', output: '$2.40', cached: '$0.30', notes: 'Audio: $10/$20 per 1M' },
            'gpt-4o-search-preview': { input: '$2.50', output: '$10.00', notes: 'Web search: $25/1k calls' },
            'gpt-4o-mini-search-preview': { input: '$0.15', output: '$0.60', notes: 'Web search: $10/1k calls' },
            'gpt-4o-transcribe': { input: '$2.50', output: '$10.00', notes: '~$0.006/min' },
            'gpt-4o-mini-transcribe': { input: '$1.25', output: '$5.00', notes: '~$0.003/min' },

            // OpenAI Realtime & Audio
            'gpt-realtime': { input: '$4.00', output: '$16.00', cached: '$0.40', notes: 'Audio: $32/$64 per 1M' },
            'gpt-realtime-mini': { input: '$0.60', output: '$2.40', cached: '$0.06', notes: 'Audio: $10/$20 per 1M' },
            'gpt-audio': { input: '$2.50', output: '$10.00', notes: 'Audio: $32/$64 per 1M' },
            'gpt-audio-mini': { input: '$0.60', output: '$2.40', notes: 'Audio: $10/$20 per 1M' },
            'gpt-4o-mini-tts': { input: '$0.60', output: '-', notes: '~$0.015/min' },

            // OpenAI O-Series
            'o1': { input: '$15.00', output: '$60.00', cached: '$7.50', notes: 'Batch: $7.50/$30.00' },
            'o1-pro': { input: '$150.00', output: '$600.00', notes: 'Batch: $75/$300' },
            'o1-mini': { input: '$1.10', output: '$4.40', cached: '$0.55', notes: 'Batch: $0.55/$2.20' },
            'o1-preview': { input: '$15.00', output: '$60.00', notes: 'Deprecated' },
            'o3': { input: '$2.00', output: '$8.00', cached: '$0.50', notes: 'Flex: $1.00/$4.00' },
            'o3-pro-all': { input: '$20.00', output: '$80.00', notes: 'Batch: $10/$40' },
            'o3-mini': { input: '$1.10', output: '$4.40', cached: '$0.55', notes: 'Batch: $0.55/$2.20' },
            'o3-deep-research': { input: '$10.00', output: '$40.00', cached: '$2.50', notes: 'Batch: $5/$20' },
            'o4-mini': { input: '$1.10', output: '$4.40', cached: '$0.275', notes: 'Flex: $0.55/$2.20' },
            'o4-mini-deep-research': { input: '$2.00', output: '$8.00', cached: '$0.50', notes: 'Batch: $1/$4' },

            // OpenAI Image Generation
            'gpt-image-1': { input: '$5.00', output: '-', cached: '$1.25', notes: 'Low: $0.011, Med: $0.042, High: $0.167/img' },
            'gpt-image-1-mini': { input: '$2.00', output: '-', cached: '$0.20', notes: 'Low: $0.005, Med: $0.011, High: $0.036/img' },
            'dall-e-3': { input: '-', output: '-', notes: 'Std: $0.04, HD: $0.08/img (1024x1024)' },
            'dall-e-2': { input: '-', output: '-', notes: '$0.016-$0.02/img' },

            // OpenAI Video
            'sora-2': { input: '-', output: '-', notes: '$0.10/sec (720p)' },
            'sora-2-pro': { input: '-', output: '-', notes: '$0.30/sec (720p), $0.50/sec (1024p)' },

            // OpenAI Embeddings
            'text-embedding-3-small': { input: '$0.02', output: '-', notes: 'Batch: $0.01' },
            'text-embedding-3-large': { input: '$0.13', output: '-', notes: 'Batch: $0.065' },
            'text-embedding-ada-002': { input: '$0.10', output: '-', notes: 'Batch: $0.05' },

            // OpenAI TTS & Whisper
            'tts-1': { input: '-', output: '-', notes: '$15.00/1M chars' },
            'tts-1-hd': { input: '-', output: '-', notes: '$30.00/1M chars' },
            'whisper-1': { input: '-', output: '-', notes: '$0.006/min' },

            // OpenAI Legacy & Other
            'gpt-4-turbo': { input: '$10.00', output: '$30.00', notes: 'Batch: $5/$15' },
            'gpt-4-turbo-preview': { input: '$10.00', output: '$30.00' },
            'gpt-4': { input: '$30.00', output: '$60.00', notes: 'Batch: $15/$30' },
            'gpt-3.5-turbo': { input: '$0.50', output: '$1.50', notes: 'Batch: $0.25/$0.75' },
            'chatgpt-4o-latest': { input: '$5.00', output: '$15.00' },
            'computer-use-preview': { input: '$3.00', output: '$12.00', notes: 'Batch: $1.50/$6.00' },
            'codex-mini-latest': { input: '$1.50', output: '$6.00', cached: '$0.375' },
            'babbage-002': { input: '$0.40', output: '$0.40', notes: 'Batch: $0.20/$0.20' },
            'davinci-002': { input: '$2.00', output: '$2.00', notes: 'Batch: $1.00/$1.00' },
            'gpt-oss-120b': { input: '$2.00', output: '$8.00' },
            'gpt-oss-20b': { input: '$0.50', output: '$2.00' },

            // Anthropic Claude
            'claude-sonnet-4-5': { input: '$3.00', output: '$15.00', cached: '$0.30', notes: 'Batch: $1.50/$7.50' },
            'claude-haiku-4-5': { input: '$1.00', output: '$5.00', cached: '$0.10', notes: 'Batch: $0.50/$2.50' },
            'claude-opus-4-5': { input: '$5.00', output: '$25.00', cached: '$0.50', notes: 'Batch: $2.50/$12.50' },
            'claude-opus-4-1': { input: '$15.00', output: '$75.00', cached: '$1.50' },
            'claude-sonnet-4': { input: '$3.00', output: '$15.00', cached: '$0.30' },
            'claude-3-7-sonnet': { input: '$3.00', output: '$15.00', cached: '$0.30' },
            'claude-opus-4': { input: '$15.00', output: '$75.00', cached: '$1.50' },
            'claude-3-5-haiku': { input: '$0.80', output: '$4.00', cached: '$0.08' },
            'claude-3-haiku': { input: '$0.25', output: '$1.25', cached: '$0.03' },
            'claude-opus-3': { input: '$15.00', output: '$75.00', notes: 'Deprecated' },
            'claude-sonnet-3': { input: '$3.00', output: '$15.00', notes: 'Deprecated' },

            // Google Gemini
            'gemini-3-pro-preview': { input: '$2.00', output: '$12.00', cached: '$0.20' },
            'gemini-3-pro-image-preview': { input: '$2.00', output: '$12.00' },
            'gemini-2-5-pro': { input: '$1.25', output: '$10.00', cached: '$0.125' },
            'gemini-2-5-flash': { input: '$0.30', output: '$2.50', cached: '$0.03' },
            'gemini-2-5-flash-preview-09-2025': { input: '$0.30', output: '$2.50', cached: '$0.03' },
            'gemini-2-5-flash-lite': { input: '$0.10', output: '$0.40', cached: '$0.01' },
            'gemini-2-0-flash': { input: '$0.10', output: '$0.40', cached: '$0.025' },
            'gemini-2-0-flash-lite': { input: '$0.075', output: '$0.30' },
            'gemini-1-5-pro': { input: '$0.125', output: '$0.375' },
            'gemini-1-5-flash': { input: '$0.075', output: '$0.30' },
            'gemini-embedding-001': { input: '$0.15', output: '-' },
            'gemma-3': { input: 'Free', output: 'Free' },
            'gemma-3n': { input: 'Free', output: 'Free' },

            // xAI Grok
            'grok-4-1-fast-reasoning': { input: '$0.20', output: '$0.50', notes: '4M TPM, 480 RPM' },
            'grok-4-1-fast-non-reasoning': { input: '$0.20', output: '$0.50' },
            'grok-4-fast-reasoning': { input: '$0.20', output: '$0.50' },
            'grok-4-fast-non-reasoning': { input: '$0.20', output: '$0.50' },
            'grok-4-0709': { input: '$3.00', output: '$15.00' },
            'grok-code-fast-1': { input: '$0.20', output: '$1.50' },
            'grok-3': { input: '$3.00', output: '$15.00' },
            'grok-3-mini': { input: '$0.30', output: '$0.50' },
            'grok-2-vision-1212': { input: '$2.00', output: '$10.00' },
            'grok-2-image-1212': { input: '-', output: '-', notes: '$0.07/img' },

            // DeepSeek
            'deepseek-chat': { input: '$0.28', output: '$0.42', cached: '$0.028' },
            'deepseek-reasoner': { input: '$0.28', output: '$0.42', cached: '$0.028' },

            // Mistral
            'mistral-large-latest': { input: '$2.00', output: '$6.00' },
            'mistral-medium-latest': { input: '$0.40', output: '$2.00' },
            'magistral-medium-latest': { input: '$2.00', output: '$5.00' },
            'devstral-medium-2507': { input: '$0.40', output: '$2.00' },
            'codestral-latest': { input: '$0.30', output: '$0.90' },
            'mistral-small-latest': { input: '$0.10', output: '$0.30' },
            'magistral-small-latest': { input: '$0.50', output: '$1.50' },
            'devstral-small-2507': { input: '$0.10', output: '$0.30' },
            'pixtral-large-latest': { input: '$2.00', output: '$6.00' },
            'pixtral-12b': { input: '$0.15', output: '$0.15' },
            'open-mistral-nemo': { input: '$0.15', output: '$0.15' },
            'open-mistral-7b': { input: '$0.25', output: '$0.25' },
            'open-mixtral-8x7b': { input: '$0.70', output: '$0.70' },
            'open-mixtral-8x22b': { input: '$2.00', output: '$6.00' },
            'ministral-8b-latest': { input: '$0.10', output: '$0.10' },
            'ministral-3b-latest': { input: '$0.04', output: '$0.04' },
            'codestral-embed-2505': { input: '$0.15', output: '-' },
            'mistral-embed': { input: '$0.10', output: '-' },

            // Cohere
            'command-a': { input: '$2.50', output: '$10.00' },
            'command-r': { input: '$0.15', output: '$0.60' },
            'command-r7b': { input: '$0.0375', output: '$0.15' },
            'embed-4': { input: '$0.12', output: '-' },
            'rerank-3-5': { input: '-', output: '-', notes: '$2.00/1k searches' },
            'command-r-plus': { input: '$2.50', output: '$10.00' },
            'command-light': { input: '$0.30', output: '$0.60' },

            // Meta Llama
            'llama-4-maverick': { input: '$0.19', output: '$0.19' },
            'llama-4-scout': { input: '$0.15', output: '$0.15' },
            'llama-4-behemoth': { input: '$0.30', output: '$0.30' },
            'llama-3-3-70b-alt': { input: '$0.10', output: '$0.10' },
            'llama-3-2-vision': { input: '$0.08', output: '$0.08' },
            'llama-3-1-405b': { input: '$0.20', output: '$0.20' },

            // AWS Bedrock
            'nova-pro': { input: '$0.80', output: '$3.20' },
            'nova-lite': { input: '$0.06', output: '$0.24' },
            'nova-micro': { input: '$0.035', output: '$0.14' },
            'claude-bedrock': { input: '$3.00', output: '$15.00' },
            'llama-3-3': { input: '$0.10', output: '$0.10' },
        };
        return pricing[modelId] || null;
    };

    const copyModelId = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    };

    return (
        <>
            <Helmet>
                <title>Supported AI Models - Cost Katana Documentation</title>
                <meta name="description" content="Complete list of 400+ supported AI models across OpenAI, Anthropic, Google AI, AWS Bedrock, xAI, DeepSeek, Mistral, Cohere, and Meta." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-light-bg via-light-bg to-primary-500/5 dark:from-dark-bg-100 dark:via-dark-bg-200 dark:to-primary-900/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-primary-500/5 dark:from-primary-500/20 dark:to-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6">
                            <Database size={16} className="animate-pulse" />
                            <span>{totalModels} Models • {providers.length} Providers</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
                            <span className="bg-gradient-to-r from-primary-500 via-primary-400 to-highlight-500 bg-clip-text text-transparent">
                                Supported Models
                            </span>
                        </h1>

                        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
                            Explore and compare AI models across all major providers. Click any model for details.
                        </p>
                    </motion.div>

                    {/* Search & Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className="max-w-4xl mx-auto">
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* Search */}
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-light-text-muted dark:text-dark-text-muted w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search models, providers, or capabilities..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-dark-panel border border-gray-200 dark:border-gray-700/50 rounded-xl text-light-text-primary dark:text-dark-text-primary placeholder-light-text-muted dark:placeholder-dark-text-muted focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all shadow-sm"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-light-text-muted hover:text-light-text-primary dark:text-dark-text-muted dark:hover:text-dark-text-primary"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>

                                {/* Filter Toggle */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center gap-2 px-5 py-3.5 rounded-xl border transition-all shadow-sm ${showFilters
                                        ? 'bg-primary-500 text-white border-primary-500'
                                        : 'bg-white dark:bg-dark-panel border-gray-200 dark:border-gray-700/50 text-light-text-primary dark:text-dark-text-primary hover:border-primary-500'
                                        }`}
                                >
                                    <Filter size={18} />
                                    <span className="font-medium">Filters</span>
                                    {(selectedProvider !== 'all' || selectedUseCase !== 'all') && (
                                        <span className="w-2 h-2 rounded-full bg-primary-400" />
                                    )}
                                </button>

                                {/* View Mode Toggle */}
                                <div className="flex items-center gap-1 p-1 bg-white dark:bg-dark-panel border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-sm">
                                    {viewModes.map((mode) => {
                                        const IconComponent = mode.icon;
                                        return (
                                            <button
                                                key={mode.id}
                                                onClick={() => setViewMode(mode.id)}
                                                title={mode.name}
                                                className={`p-2.5 rounded-lg transition-all ${viewMode === mode.id
                                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                                    : 'text-light-text-muted dark:text-dark-text-muted hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                                                    }`}
                                            >
                                                <IconComponent size={18} />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Filter Panel */}
                            <AnimatePresence>
                                {showFilters && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-4 p-5 bg-white dark:bg-dark-panel border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-sm">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">Provider</label>
                                                    <select
                                                        value={selectedProvider}
                                                        onChange={(e) => setSelectedProvider(e.target.value)}
                                                        className="w-full px-4 py-2.5 bg-light-panel dark:bg-dark-bg-300 border border-gray-200 dark:border-gray-700 rounded-lg text-light-text-primary dark:text-dark-text-primary text-sm focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
                                                    >
                                                        <option value="all">All Providers</option>
                                                        {providers.map(provider => (
                                                            <option key={provider.id} value={provider.id}>{provider.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">Capability</label>
                                                    <select
                                                        value={selectedUseCase}
                                                        onChange={(e) => setSelectedUseCase(e.target.value)}
                                                        className="w-full px-4 py-2.5 bg-light-panel dark:bg-dark-bg-300 border border-gray-200 dark:border-gray-700 rounded-lg text-light-text-primary dark:text-dark-text-primary text-sm focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
                                                    >
                                                        <option value="all">All Capabilities</option>
                                                        {allUseCases.map(useCase => (
                                                            <option key={useCase} value={useCase}>
                                                                {useCase.charAt(0).toUpperCase() + useCase.slice(1)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            {(selectedProvider !== 'all' || selectedUseCase !== 'all') && (
                                                <button
                                                    onClick={() => { setSelectedProvider('all'); setSelectedUseCase('all'); }}
                                                    className="mt-4 text-sm text-primary-600 dark:text-primary-400 hover:underline"
                                                >
                                                    Clear all filters
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Results count */}
                            {(searchQuery || selectedProvider !== 'all' || selectedUseCase !== 'all') && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-3 text-sm text-light-text-muted dark:text-dark-text-muted"
                                >
                                    Showing {filteredCount} of {totalModels} models
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Cards View */}
                    {viewMode === 'cards' && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-6"
                        >
                            {filteredProviders.map((provider) => (
                                <motion.div
                                    key={provider.id}
                                    variants={itemVariants}
                                    className="bg-white dark:bg-dark-panel border border-gray-200 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                >
                                    {/* Provider Header */}
                                    <div className="p-5 border-b border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden shadow-sm"
                                                style={{ backgroundColor: `${provider.brandColor}15` }}
                                            >
                                                {provider.logo ? (
                                                    <img
                                                        src={provider.logo}
                                                        alt={`${provider.name} logo`}
                                                        className="w-7 h-7 object-contain"
                                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                    />
                                                ) : null}
                                                {provider.logoFallback && (
                                                    <provider.logoFallback
                                                        size={24}
                                                        style={{ color: provider.brandColor, display: provider.logo ? 'none' : 'block' }}
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary font-display">
                                                    {provider.name}
                                                </h2>
                                                <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                                                    {provider.description}
                                                </p>
                                            </div>
                                            <div className="hidden sm:flex items-center gap-2">
                                                <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                                                    {provider.models.length} models
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Models Grid */}
                                    <div className="p-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                            {provider.models.map((model) => {
                                                const pricingInfo = getPricingTierInfo(model.pricingTier);
                                                const pricing = getModelPricing(model.id);

                                                return (
                                                    <motion.button
                                                        key={model.id}
                                                        onClick={() => setSelectedModel(model)}
                                                        whileHover={{ scale: 1.02, y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="group relative p-4 bg-light-panel dark:bg-dark-bg-300 border border-gray-100 dark:border-gray-700/50 rounded-xl text-left hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10 transition-all"
                                                    >
                                                        {/* Status Badge */}
                                                        {(model.isLatest || model.isRecommended) && (
                                                            <div className="absolute -top-2 -right-2">
                                                                {model.isLatest && (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary-500 text-white shadow-lg shadow-primary-500/30">
                                                                        <Sparkles size={10} />
                                                                        NEW
                                                                    </span>
                                                                )}
                                                                {model.isRecommended && !model.isLatest && (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500 text-white shadow-lg shadow-amber-500/30">
                                                                        <Star size={10} />
                                                                        TOP
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Model Name */}
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h3 className={`font-semibold text-light-text-primary dark:text-dark-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${model.isDeprecated ? 'line-through opacity-60' : ''}`}>
                                                                {model.name}
                                                            </h3>
                                                            <ChevronRight size={16} className="text-light-text-muted dark:text-dark-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </div>

                                                        {/* Capabilities */}
                                                        <div className="flex flex-wrap gap-1 mb-3">
                                                            {model.useCases.slice(0, 3).map(uc => {
                                                                const { icon: Icon, color } = getUseCaseIcon(uc);
                                                                return (
                                                                    <span
                                                                        key={uc}
                                                                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-light-text-secondary dark:text-dark-text-secondary"
                                                                    >
                                                                        <Icon size={10} className={color} />
                                                                        <span className="capitalize">{uc}</span>
                                                                    </span>
                                                                );
                                                            })}
                                                            {model.useCases.length > 3 && (
                                                                <span className="text-[10px] text-light-text-muted dark:text-dark-text-muted px-1">
                                                                    +{model.useCases.length - 3}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Pricing */}
                                                        <div className="flex items-center justify-between">
                                                            {pricing ? (
                                                                <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                                                                    {pricing.input} / {pricing.output}
                                                                </span>
                                                            ) : (
                                                                <span className={`text-xs font-medium ${pricingInfo.textColor}`}>
                                                                    {pricingInfo.label}
                                                                </span>
                                                            )}
                                                            <div className="flex gap-0.5">
                                                                {Array.from({ length: 4 }, (_, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className={`w-1.5 h-1.5 rounded-full transition-colors ${i < model.pricingTier ? pricingInfo.color : 'bg-gray-200 dark:bg-gray-700'}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {model.isDeprecated && (
                                                            <div className="absolute inset-0 bg-gray-500/5 dark:bg-gray-500/10 rounded-xl" />
                                                        )}
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Accordion View */}
                    {viewMode === 'accordion' && (
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                            {filteredProviders.map((provider) => (
                                <motion.div
                                    key={provider.id}
                                    variants={itemVariants}
                                    className="bg-white dark:bg-dark-panel border border-gray-200 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-sm"
                                >
                                    <button
                                        onClick={() => toggleProvider(provider.id)}
                                        className="w-full p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden" style={{ backgroundColor: `${provider.brandColor}15` }}>
                                                {provider.logo ? <img src={provider.logo} alt={provider.name} className="w-7 h-7 object-contain" /> : null}
                                                {provider.logoFallback && <provider.logoFallback size={24} style={{ color: provider.brandColor, display: provider.logo ? 'none' : 'block' }} />}
                                            </div>
                                            <div className="text-left">
                                                <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">{provider.name}</h2>
                                                <p className="text-sm text-light-text-muted dark:text-dark-text-muted">{provider.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400">{provider.models.length} models</span>
                                            <motion.div animate={{ rotate: expandedProviders.has(provider.id) ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                <ChevronDown size={24} className="text-light-text-muted dark:text-dark-text-muted" />
                                            </motion.div>
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {expandedProviders.has(provider.id) && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                                <div className="border-t border-gray-200 dark:border-gray-800 overflow-x-auto">
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr className="bg-gray-50 dark:bg-gray-900/50">
                                                                <th className="px-6 py-3 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Model</th>
                                                                <th className="px-6 py-3 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Capabilities</th>
                                                                <th className="px-6 py-3 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Pricing</th>
                                                                <th className="px-6 py-3 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                            {provider.models.map((model) => {
                                                                const pricingInfo = getPricingTierInfo(model.pricingTier);
                                                                return (
                                                                    <tr key={model.id} onClick={() => setSelectedModel(model)} className="hover:bg-primary-500/5 dark:hover:bg-primary-500/10 cursor-pointer transition-colors">
                                                                        <td className="px-6 py-4">
                                                                            <div className="font-medium text-light-text-primary dark:text-dark-text-primary">{model.name}</div>
                                                                            <div className="text-xs text-light-text-muted dark:text-dark-text-muted">{model.series}</div>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            <div className="flex flex-wrap gap-1">
                                                                                {model.useCases.slice(0, 4).map(uc => {
                                                                                    const { icon: Icon, color } = getUseCaseIcon(uc);
                                                                                    return (
                                                                                        <span key={uc} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-light-text-secondary dark:text-dark-text-secondary">
                                                                                            <Icon size={10} className={color} /><span className="capitalize">{uc}</span>
                                                                                        </span>
                                                                                    );
                                                                                })}
                                                                                {model.useCases.length > 4 && <span className="text-xs text-light-text-muted">+{model.useCases.length - 4}</span>}
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            <div className="flex items-center gap-2">
                                                                                <div className="flex gap-0.5">{Array.from({ length: 4 }, (_, i) => (<div key={i} className={`w-2 h-2 rounded-full ${i < model.pricingTier ? pricingInfo.color : 'bg-gray-200 dark:bg-gray-700'}`} />))}</div>
                                                                                <span className="text-xs text-light-text-muted dark:text-dark-text-muted">{pricingInfo.label}</span>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            <div className="flex gap-1.5">
                                                                                {model.isLatest && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400"><Sparkles size={10} className="mr-1" />New</span>}
                                                                                {model.isRecommended && !model.isLatest && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400"><Star size={10} className="mr-1" />Top</span>}
                                                                                {model.isDeprecated && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-600 dark:text-gray-400">Deprecated</span>}
                                                                                {!model.isLatest && !model.isRecommended && !model.isDeprecated && <span className="text-xs text-light-text-muted dark:text-dark-text-muted">Active</span>}
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Table View */}
                    {viewMode === 'table' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-dark-panel border border-gray-200 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-900/50">
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Provider</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Model</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Capabilities</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Input</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Output</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {filteredProviders.flatMap((provider) =>
                                            provider.models.map((model) => {
                                                const pricing = getModelPricing(model.id);
                                                const pricingInfo = getPricingTierInfo(model.pricingTier);
                                                return (
                                                    <tr key={model.id} onClick={() => setSelectedModel(model)} className="hover:bg-primary-500/5 dark:hover:bg-primary-500/10 cursor-pointer transition-colors">
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: `${provider.brandColor}15` }}>
                                                                    {provider.logo ? <img src={provider.logo} alt="" className="w-4 h-4 object-contain" /> : provider.logoFallback && <provider.logoFallback size={12} style={{ color: provider.brandColor }} />}
                                                                </div>
                                                                <span className="text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary">{provider.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="font-medium text-light-text-primary dark:text-dark-text-primary text-sm">{model.name}</div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex flex-wrap gap-1">
                                                                {model.useCases.slice(0, 3).map(uc => {
                                                                    const { icon: Icon, color } = getUseCaseIcon(uc);
                                                                    return (
                                                                        <span key={uc} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-light-text-secondary dark:text-dark-text-secondary">
                                                                            <Icon size={10} className={color} /><span className="capitalize">{uc}</span>
                                                                        </span>
                                                                    );
                                                                })}
                                                                {model.useCases.length > 3 && <span className="text-[10px] text-light-text-muted">+{model.useCases.length - 3}</span>}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400">{pricing?.input || pricingInfo.label}</td>
                                                        <td className="px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400">{pricing?.output || '-'}</td>
                                                        <td className="px-4 py-3">
                                                            {model.isLatest && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400">New</span>}
                                                            {model.isRecommended && !model.isLatest && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400">Top</span>}
                                                            {model.isDeprecated && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-500/10 text-gray-600 dark:text-gray-400">Deprecated</span>}
                                                            {!model.isLatest && !model.isRecommended && !model.isDeprecated && <span className="text-[10px] text-light-text-muted dark:text-dark-text-muted">Active</span>}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {/* List View */}
                    {viewMode === 'list' && (
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                            {filteredProviders.map((provider) => (
                                <motion.div key={provider.id} variants={itemVariants} className="bg-white dark:bg-dark-panel border border-gray-200 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-sm">
                                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${provider.brandColor}15` }}>
                                            {provider.logo ? <img src={provider.logo} alt="" className="w-5 h-5 object-contain" /> : provider.logoFallback && <provider.logoFallback size={16} style={{ color: provider.brandColor }} />}
                                        </div>
                                        <h2 className="font-semibold text-light-text-primary dark:text-dark-text-primary">{provider.name}</h2>
                                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400">{provider.models.length}</span>
                                    </div>
                                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {provider.models.map((model) => {
                                            const pricing = getModelPricing(model.id);
                                            return (
                                                <div
                                                    key={model.id}
                                                    onClick={() => setSelectedModel(model)}
                                                    className="px-4 py-3 flex items-center justify-between hover:bg-primary-500/5 dark:hover:bg-primary-500/10 cursor-pointer transition-colors"
                                                >
                                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className={`font-medium text-light-text-primary dark:text-dark-text-primary truncate ${model.isDeprecated ? 'line-through opacity-60' : ''}`}>{model.name}</span>
                                                                {model.isLatest && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400 shrink-0">New</span>}
                                                                {model.isRecommended && !model.isLatest && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">Top</span>}
                                                                {model.isDeprecated && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-500/10 text-gray-600 dark:text-gray-400 shrink-0">Deprecated</span>}
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                {model.useCases.slice(0, 4).map(uc => {
                                                                    const { icon: Icon, color } = getUseCaseIcon(uc);
                                                                    return (
                                                                        <span key={uc} className="inline-flex items-center gap-0.5 text-[10px] text-light-text-muted dark:text-dark-text-muted">
                                                                            <Icon size={10} className={color} /><span className="capitalize">{uc}</span>
                                                                        </span>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {pricing && (
                                                        <div className="text-right shrink-0 ml-4">
                                                            <div className="text-sm font-medium text-primary-600 dark:text-primary-400">{pricing.input} / {pricing.output}</div>
                                                            <div className="text-[10px] text-light-text-muted dark:text-dark-text-muted">per 1M tokens</div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* No Results */}
                    {filteredProviders.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500/20 to-primary-500/5 flex items-center justify-center">
                                <Search className="w-10 h-10 text-primary-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                No models found
                            </h3>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 max-w-md mx-auto">
                                Try adjusting your search or filters to find what you're looking for.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedProvider('all');
                                    setSelectedUseCase('all');
                                }}
                                className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium shadow-lg shadow-primary-500/25"
                            >
                                Clear all filters
                            </button>
                        </motion.div>
                    )}

                    {/* Footer CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-16 text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary-500/10 to-highlight-500/10 border border-primary-500/20">
                            <Sparkles size={16} className="text-primary-500" />
                            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                Cost Katana optimizes costs across all {totalModels}+ models
                            </span>
                            <a
                                href="/getting-started/quick-start"
                                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                            >
                                Get Started <ExternalLink size={12} />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Model Details Modal */}
                <AnimatePresence>
                    {selectedModel && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                            onClick={() => setSelectedModel(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white dark:bg-dark-panel rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-gray-200 dark:border-gray-700/50 shadow-2xl"
                            >
                                <div className="p-6">
                                    {/* Modal Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                {selectedModel.isLatest && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-500 text-white">
                                                        <Sparkles size={10} /> New
                                                    </span>
                                                )}
                                                {selectedModel.isRecommended && !selectedModel.isLatest && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-white">
                                                        <Star size={10} /> Recommended
                                                    </span>
                                                )}
                                                {selectedModel.isDeprecated && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-500 text-white">
                                                        Deprecated
                                                    </span>
                                                )}
                                            </div>
                                            <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary font-display">
                                                {selectedModel.name}
                                            </h2>
                                            <p className="text-light-text-muted dark:text-dark-text-muted">
                                                {selectedModel.series}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedModel(null)}
                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <X size={20} className="text-light-text-muted dark:text-dark-text-muted" />
                                        </button>
                                    </div>

                                    {/* Capabilities */}
                                    <div className="mb-6">
                                        <h3 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary mb-3 uppercase tracking-wider">
                                            Capabilities
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedModel.useCases.map(useCase => {
                                                const { icon: Icon, color } = getUseCaseIcon(useCase);
                                                return (
                                                    <span
                                                        key={useCase}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-light-text-secondary dark:text-dark-text-secondary"
                                                    >
                                                        <Icon size={14} className={color} />
                                                        <span className="capitalize">{useCase}</span>
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="mb-6">
                                        <h3 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary mb-3 uppercase tracking-wider">
                                            Pricing (per 1M tokens)
                                        </h3>
                                        {(() => {
                                            const pricing = getModelPricing(selectedModel.id);
                                            const pricingInfo = getPricingTierInfo(selectedModel.pricingTier);
                                            if (pricing) {
                                                return (
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                        <div className="p-4 bg-gradient-to-br from-primary-500/10 to-primary-500/5 dark:from-primary-500/20 dark:to-primary-500/10 rounded-xl border border-primary-500/20">
                                                            <div className="text-xs text-light-text-muted dark:text-dark-text-muted uppercase tracking-wide mb-1">Input</div>
                                                            <div className="text-xl font-bold text-primary-600 dark:text-primary-400">{pricing.input}</div>
                                                        </div>
                                                        <div className="p-4 bg-gradient-to-br from-highlight-500/10 to-highlight-500/5 dark:from-highlight-500/20 dark:to-highlight-500/10 rounded-xl border border-highlight-500/20">
                                                            <div className="text-xs text-light-text-muted dark:text-dark-text-muted uppercase tracking-wide mb-1">Output</div>
                                                            <div className="text-xl font-bold text-highlight-600 dark:text-highlight-400">{pricing.output}</div>
                                                        </div>
                                                        {pricing.cached && (
                                                            <div className="p-4 bg-gradient-to-br from-amber-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-amber-500/10 rounded-xl border border-amber-500/20">
                                                                <div className="text-xs text-light-text-muted dark:text-dark-text-muted uppercase tracking-wide mb-1">Cached</div>
                                                                <div className="text-xl font-bold text-amber-600 dark:text-amber-400">{pricing.cached}</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                                    <div className="flex gap-1">
                                                        {Array.from({ length: 4 }, (_, i) => (
                                                            <div
                                                                key={i}
                                                                className={`w-3 h-3 rounded-full ${i < selectedModel.pricingTier ? pricingInfo.color : 'bg-gray-200 dark:bg-gray-700'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className={`font-semibold ${pricingInfo.textColor}`}>
                                                        {pricingInfo.label} Tier
                                                    </span>
                                                </div>
                                            );
                                        })()}
                                    </div>

                                    {/* Model ID */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary mb-3 uppercase tracking-wider">
                                            Model ID
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <code className="flex-1 px-4 py-3 bg-gray-900 dark:bg-gray-950 rounded-lg text-sm font-mono text-primary-400 overflow-x-auto">
                                                {selectedModel.id}
                                            </code>
                                            <button
                                                onClick={() => copyModelId(selectedModel.id)}
                                                className="p-3 bg-gray-900 dark:bg-gray-950 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 transition-colors"
                                            >
                                                {copiedId === selectedModel.id ? (
                                                    <Check size={18} className="text-primary-400" />
                                                ) : (
                                                    <Copy size={18} className="text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default SupportedModelsPage;
