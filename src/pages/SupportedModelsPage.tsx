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
    ChevronDown,
    Sparkles,
    MessageSquareText,
    Mic,
    Languages,
    Puzzle,
    Crosshair,
    Radio,
    Crown,
    Feather,
    ScanText,
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
    Compass,
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

type ViewMode = 'accordion' | 'cards' | 'table' | 'list';

const SupportedModelsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProvider, setSelectedProvider] = useState<string>('all');
    const [selectedUseCase, setSelectedUseCase] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);
    const [expandedProviders, setExpandedProviders] = useState<Set<string>>(new Set());
    const [viewMode, setViewMode] = useState<ViewMode>('accordion');

    const viewModes: { id: ViewMode; name: string; icon: LucideIcon }[] = [
        { id: 'accordion', name: 'Accordion', icon: Rows3 },
        { id: 'cards', name: 'Cards', icon: LayoutGrid },
        { id: 'table', name: 'Table', icon: Table2 },
        { id: 'list', name: 'List', icon: List },
    ];

    const categories = [
        { id: 'all', name: 'All Models', count: 0 },
        { id: 'featured', name: 'Featured', count: 0 },
        { id: 'frontier', name: 'Frontier', count: 0 },
        { id: 'open-weight', name: 'Open-Weight', count: 0 },
        { id: 'specialized', name: 'Specialized', count: 0 },
        { id: 'realtime-audio', name: 'Audio & Realtime', count: 0 },
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

    const categorizeModel = (model: Model, providerId: string) => {
        if (model.isLatest || model.isRecommended) return 'featured';
        if (providerId === 'openai') {
            if (model.name.includes('gpt-5') && !model.name.includes('chat')) return 'frontier';
            if (model.name.includes('gpt-4.1') || model.name.includes('gpt-4o')) return 'frontier';
            if (model.name.includes('gpt-oss')) return 'open-weight';
            if (model.name.includes('sora') || model.name.includes('dall-e') || model.name.includes('image') || model.name.includes('tts') || model.name.includes('transcribe') || model.name.includes('deep-research')) return 'specialized';
            if (model.name.includes('realtime') || model.name.includes('audio') || model.name.includes('whisper')) return 'realtime-audio';
        }
        if (providerId === 'anthropic') {
            if (model.name.includes('claude')) return 'frontier';
        }
        if (providerId === 'google') {
            if (model.name.includes('gemini-3')) return 'frontier';
            if (model.name.includes('gemini-2.5-pro') || model.name.includes('gemini-2.0-flash')) return 'frontier';
            if (model.name.includes('gemma')) return 'open-weight';
            if (model.name.includes('imagen') || model.name.includes('veo') || model.name.includes('robotics')) return 'specialized';
            if (model.name.includes('flash') && (model.name.includes('audio') || model.name.includes('tts'))) return 'realtime-audio';
            if (model.name.includes('embedding')) return 'specialized';
            return 'frontier';
        }
        if (providerId === 'xai') {
            if (model.name.includes('grok')) return 'frontier';
            if (model.name.includes('image')) return 'specialized';
            return 'frontier';
        }
        if (providerId === 'mistral') {
            if (model.name.includes('large') || model.name.includes('magistral') || model.name.includes('medium')) return 'frontier';
            if (model.name.includes('ocr') || model.name.includes('pixtral') || model.name.includes('voxtral')) return 'specialized';
            if (model.name.includes('embed')) return 'specialized';
            return 'frontier';
        }
        if (providerId === 'cohere') {
            if (model.name.includes('command-a') || model.name.includes('command-r')) return 'frontier';
            if (model.name.includes('embed') || model.name.includes('rerank')) return 'specialized';
            return 'frontier';
        }
        if (providerId === 'meta') {
            if (model.name.includes('llama-4') || model.name.includes('llama-3')) return 'frontier';
            return 'open-weight';
        }
        if (providerId === 'meta' || providerId === 'deepseek') return 'open-weight';
        if (model.useCases.includes('image') || model.useCases.includes('video') || model.useCases.includes('audio')) return 'specialized';
        return 'frontier';
    };

    const filteredProviders = useMemo(() => {
        return providers.map(provider => {
            const filteredModels = provider.models.filter(model => {
                const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    model.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    model.useCases.some(uc => uc.toLowerCase().includes(searchQuery.toLowerCase()));

                const matchesUseCase = selectedUseCase === 'all' || model.useCases.includes(selectedUseCase);
                const matchesCategory = selectedCategory === 'all' || categorizeModel(model, provider.id) === selectedCategory;

                return matchesSearch && matchesUseCase && matchesCategory;
            });

            return { ...provider, models: filteredModels };
        }).filter(provider =>
            (selectedProvider === 'all' || provider.id === selectedProvider) &&
            provider.models.length > 0
        );
    }, [searchQuery, selectedProvider, selectedUseCase, selectedCategory]);

    const totalModels = providers.reduce((sum, provider) => sum + provider.models.length, 0);

    const categoryCounts = categories.map(cat => ({
        ...cat,
        count: cat.id === 'all' ? totalModels :
            providers.reduce((sum, provider) =>
                sum + provider.models.filter(model =>
                    cat.id === 'all' || categorizeModel(model, provider.id) === cat.id
                ).length, 0)
    }));

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

    // Use case icons with better visual representations
    const getUseCaseIcon = (useCase: string) => {
        const iconConfig: Record<string, { icon: LucideIcon, color: string }> = {
            text: { icon: MessageSquareText, color: 'text-gray-500 dark:text-gray-400' },
            vision: { icon: Eye, color: 'text-blue-500' },
            audio: { icon: AudioLines, color: 'text-purple-500' },
            image: { icon: Palette, color: 'text-pink-500' },
            video: { icon: Video, color: 'text-red-500' },
            coding: { icon: Code2, color: 'text-primary-500' },
            reasoning: { icon: Lightbulb, color: 'text-orange-500' },
            fast: { icon: Zap, color: 'text-yellow-500' },
            premium: { icon: Crown, color: 'text-amber-500' },
            research: { icon: Crosshair, color: 'text-indigo-500' },
            agents: { icon: Bot, color: 'text-cyan-500' },
            transcription: { icon: Mic, color: 'text-violet-500' },
            search: { icon: Compass, color: 'text-teal-500' },
            moderation: { icon: ShieldCheck, color: 'text-rose-500' },
            embeddings: { icon: Network, color: 'text-emerald-500' },
            realtime: { icon: Radio, color: 'text-lime-500' },
            tools: { icon: Puzzle, color: 'text-sky-500' },
            multimodal: { icon: Wand2, color: 'text-fuchsia-500' },
            agentic: { icon: Bot, color: 'text-cyan-500' },
            lightweight: { icon: Feather, color: 'text-yellow-500' },
            embedding: { icon: Network, color: 'text-emerald-500' },
            voice: { icon: AudioLines, color: 'text-violet-500' },
            ocr: { icon: ScanText, color: 'text-slate-500' },
            json: { icon: Braces, color: 'text-primary-500' },
            functions: { icon: FunctionSquare, color: 'text-sky-500' },
            thinking: { icon: Brain, color: 'text-orange-500' },
            enterprise: { icon: Building2, color: 'text-rose-500' },
            efficiency: { icon: Gauge, color: 'text-yellow-500' },
            performance: { icon: TrendingUp, color: 'text-indigo-500' },
            edge: { icon: Server, color: 'text-gray-500' },
            reranking: { icon: Puzzle, color: 'text-sky-500' },
            multilingual: { icon: Languages, color: 'text-teal-500' },
            'long-context': { icon: FileText, color: 'text-slate-500' },
            'commodity-gpu': { icon: Server, color: 'text-gray-500' },
        };
        const config = iconConfig[useCase] || { icon: Cpu, color: 'text-gray-500' };
        const IconComponent = config.icon;
        return <IconComponent size={12} className={`inline-block ${config.color}`} />;
    };

    const getModelDescription = (model: Model): string => {
        const descriptions: Record<string, string> = {
            'gpt-5.1': 'The best model for coding and agentic tasks with configurable reasoning effort.',
            'gpt-5-mini': 'A faster, cost-efficient version of GPT-5 for well-defined tasks.',
            'gpt-5-nano': 'Fastest, most cost-efficient version of GPT-5.',
            'gpt-5-pro': 'Version of GPT-5 that produces smarter and more precise responses.',
            'gpt-5': 'Previous intelligent reasoning model for coding and agentic tasks.',
            'gpt-4.1': 'Smartest non-reasoning model.',
            'claude-sonnet-4-5': 'Our smartest model for complex agents and coding. Fastest in its intelligence class.',
            'claude-haiku-4-5': 'Our fastest model with near-frontier intelligence. Ideal for high-throughput tasks.',
            'claude-opus-4-5': 'Premium model combining maximum intelligence with practical performance.',
            'gemini-3-pro-preview': 'The best model for multimodal understanding and agentic tasks.',
            'gemini-2-5-pro': 'State-of-the-art multipurpose model excelling at coding and reasoning.',
            'gemini-2-5-flash': 'Hybrid reasoning model with 1M token context and thinking budgets.',
            'grok-4-1-fast-reasoning': 'Frontier multimodal model optimized for high-performance agentic tool calling.',
            'deepseek-chat': 'Fast and efficient model with JSON output, function calling, and chat prefix completion.',
            'deepseek-reasoner': 'Advanced reasoning model with thinking capabilities and extended output limits.',
            'mistral-large-latest': 'For complex tasks and sophisticated problems with multimodal capabilities.',
            'command-a': 'Largest, most performant model for building enterprise agents.',
            'command-r': 'Midsized model providing the best combination of efficiency and performance.',
            'llama-4-maverick': 'Frontier multimodal model with exceptional performance across all tasks.',
        };
        return descriptions[model.id] || 'A powerful AI model for various tasks and applications.';
    };

    const getPricingTierInfo = (tier: number) => {
        switch (tier) {
            case 1: return { label: 'Budget', color: 'bg-primary-500', dotColor: 'bg-primary-400' };
            case 2: return { label: 'Standard', color: 'bg-yellow-500', dotColor: 'bg-yellow-400' };
            case 3: return { label: 'Premium', color: 'bg-orange-500', dotColor: 'bg-orange-400' };
            case 4: return { label: 'Enterprise', color: 'bg-red-500', dotColor: 'bg-red-400' };
            default: return { label: 'Unknown', color: 'bg-gray-500', dotColor: 'bg-gray-400' };
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

            // OpenAI Legacy
            'gpt-4-turbo': { input: '$10.00', output: '$30.00', notes: 'Batch: $5/$15' },
            'gpt-4-turbo-preview': { input: '$10.00', output: '$30.00' },
            'gpt-4': { input: '$30.00', output: '$60.00', notes: 'Batch: $15/$30' },
            'gpt-3.5-turbo': { input: '$0.50', output: '$1.50', notes: 'Batch: $0.25/$0.75' },
            'chatgpt-4o-latest': { input: '$5.00', output: '$15.00' },
            'computer-use-preview': { input: '$3.00', output: '$12.00', notes: 'Batch: $1.50/$6.00' },
            'codex-mini-latest': { input: '$1.50', output: '$6.00', cached: '$0.375' },
            'babbage-002': { input: '$0.40', output: '$0.40', notes: 'Batch: $0.20/$0.20' },
            'davinci-002': { input: '$2.00', output: '$2.00', notes: 'Batch: $1.00/$1.00' },

            // Anthropic Claude
            'claude-sonnet-4-5': { input: '$3.00', output: '$15.00', cached: '$0.30', notes: 'Batch: $1.50/$7.50' },
            'claude-haiku-4-5': { input: '$1.00', output: '$5.00', cached: '$0.10', notes: 'Batch: $0.50/$2.50' },
            'claude-opus-4-5': { input: '$5.00', output: '$25.00', cached: '$0.50', notes: 'Batch: $2.50/$12.50' },
            'claude-opus-4-1': { input: '$15.00', output: '$75.00', cached: '$1.50', notes: 'Batch: $7.50/$37.50' },
            'claude-sonnet-4': { input: '$3.00', output: '$15.00', cached: '$0.30', notes: '>200K: $6/$22.50' },
            'claude-3-7-sonnet': { input: '$3.00', output: '$15.00', cached: '$0.30' },
            'claude-opus-4': { input: '$15.00', output: '$75.00', cached: '$1.50' },
            'claude-3-5-haiku': { input: '$0.80', output: '$4.00', cached: '$0.08', notes: 'Batch: $0.40/$2.00' },
            'claude-3-haiku': { input: '$0.25', output: '$1.25', cached: '$0.03' },
            'claude-opus-3': { input: '$15.00', output: '$75.00', notes: 'Deprecated' },
            'claude-sonnet-3': { input: '$3.00', output: '$15.00', notes: 'Deprecated' },

            // Google Gemini
            'gemini-3-pro-preview': { input: '$2.00', output: '$12.00', cached: '$0.20', notes: '>200K: $4/$18' },
            'gemini-3-pro-image-preview': { input: '$2.00', output: '$12.00', notes: 'Image: $0.134-$0.24/img' },
            'gemini-2-5-pro': { input: '$1.25', output: '$10.00', cached: '$0.125', notes: '>200K: $2.50/$15' },
            'gemini-2-5-flash': { input: '$0.30', output: '$2.50', cached: '$0.03', notes: 'Audio: $1.00 input' },
            'gemini-2-5-flash-preview-09-2025': { input: '$0.30', output: '$2.50', cached: '$0.03' },
            'gemini-2-5-flash-lite': { input: '$0.10', output: '$0.40', cached: '$0.01', notes: 'Audio: $0.30 input' },
            'gemini-2-5-flash-native-audio-preview-09-2025': { input: '$0.50', output: '$2.00', notes: 'Audio: $3/$12 per 1M' },
            'gemini-2-5-flash-image': { input: '$0.30', output: '-', notes: '$0.039/img' },
            'gemini-2-5-flash-preview-tts': { input: '$0.50', output: '-', notes: 'Audio out: $10/1M' },
            'gemini-2-5-pro-preview-tts': { input: '$1.00', output: '-', notes: 'Audio out: $20/1M' },
            'gemini-2-5-computer-use-preview-10-2025': { input: '$1.25', output: '$10.00', notes: '>200K: $2.50/$15' },
            'gemini-2-0-flash': { input: '$0.10', output: '$0.40', cached: '$0.025', notes: 'Image: $0.039/img' },
            'gemini-2-0-flash-lite': { input: '$0.075', output: '$0.30', notes: 'Batch: $0.0375/$0.15' },
            'gemini-robotics-er-1-5-preview': { input: '$0.30', output: '$2.50', notes: 'Audio: $1.00 input' },
            'imagen-4': { input: '-', output: '-', notes: 'Fast: $0.02, Std: $0.04, Ultra: $0.06/img' },
            'imagen-3': { input: '-', output: '-', notes: '$0.03/img' },
            'veo-3-1-generate-preview': { input: '-', output: '-', notes: '$0.40/sec (with audio)' },
            'veo-3-1-fast-generate-preview': { input: '-', output: '-', notes: '$0.15/sec (with audio)' },
            'veo-3-0-generate-001': { input: '-', output: '-', notes: '$0.40/sec (with audio)' },
            'veo-2-0-generate-001': { input: '-', output: '-', notes: '$0.35/sec' },
            'gemini-embedding-001': { input: '$0.15', output: '-', notes: 'Batch: $0.075' },
            'gemma-3': { input: 'Free', output: 'Free' },
            'gemma-3n': { input: 'Free', output: 'Free' },
            'gemini-1-5-pro': { input: '$0.125', output: '$0.375' },
            'gemini-1-5-flash': { input: '$0.075', output: '$0.30' },

            // xAI Grok
            'grok-4-1-fast-reasoning': { input: '$0.20', output: '$0.50', notes: '4M TPM, 480 RPM' },
            'grok-4-1-fast-non-reasoning': { input: '$0.20', output: '$0.50', notes: '4M TPM, 480 RPM' },
            'grok-4-fast-reasoning': { input: '$0.20', output: '$0.50', notes: '4M TPM, 480 RPM' },
            'grok-4-fast-non-reasoning': { input: '$0.20', output: '$0.50', notes: '4M TPM, 480 RPM' },
            'grok-4-0709': { input: '$3.00', output: '$15.00', notes: '2M TPM, 480 RPM' },
            'grok-code-fast-1': { input: '$0.20', output: '$1.50', notes: '256K context' },
            'grok-3': { input: '$3.00', output: '$15.00', notes: '131K TPM, 600 RPM' },
            'grok-3-mini': { input: '$0.30', output: '$0.50', notes: '480 TPM, 480 RPM' },
            'grok-2-vision-1212': { input: '$2.00', output: '$10.00', notes: '32K TPM, 600 RPM' },
            'grok-2-image-1212': { input: '-', output: '-', notes: '$0.07/img, 300 RPM' },

            // DeepSeek
            'deepseek-chat': { input: '$0.28', output: '$0.42', cached: '$0.028', notes: '128K context' },
            'deepseek-reasoner': { input: '$0.28', output: '$0.42', cached: '$0.028', notes: 'Max 64K output' },

            // Mistral
            'mistral-large-latest': { input: '$2.00', output: '$6.00', notes: 'Batch: $2/$6' },
            'mistral-medium-latest': { input: '$0.40', output: '$2.00' },
            'magistral-medium-latest': { input: '$2.00', output: '$5.00' },
            'devstral-medium-2507': { input: '$0.40', output: '$2.00' },
            'codestral-latest': { input: '$0.30', output: '$0.90', notes: 'Fine-tuned: $0.20/$0.60' },
            'mistral-ocr-latest': { input: '-', output: '-', notes: 'OCR: $1/1k pages, Annotate: $3/1k' },
            'voxtral-small-latest': { input: '$0.10', output: '$0.30', notes: 'Audio: $0.004/min' },
            'voxtral-mini-latest': { input: '$0.04', output: '$0.04', notes: 'Audio: $0.001/min' },
            'mistral-small-latest': { input: '$0.10', output: '$0.30', notes: 'Fine-tuned: same price' },
            'magistral-small-latest': { input: '$0.50', output: '$1.50' },
            'devstral-small-2507': { input: '$0.10', output: '$0.30' },
            'pixtral-large-latest': { input: '$2.00', output: '$6.00' },
            'pixtral-12b': { input: '$0.15', output: '$0.15', notes: 'Fine-tuned: same price' },
            'open-mistral-nemo': { input: '$0.15', output: '$0.15', notes: 'Fine-tuned: same price' },
            'open-mistral-7b': { input: '$0.25', output: '$0.25' },
            'open-mixtral-8x7b': { input: '$0.70', output: '$0.70' },
            'open-mixtral-8x22b': { input: '$2.00', output: '$6.00' },
            'ministral-8b-latest': { input: '$0.10', output: '$0.10' },
            'ministral-3b-latest': { input: '$0.04', output: '$0.04' },
            'codestral-embed-2505': { input: '$0.15', output: '-' },
            'mistral-embed': { input: '$0.10', output: '-' },

            // Cohere
            'command-a': { input: '$2.50', output: '$10.00', notes: '256K context, 8K output' },
            'command-r': { input: '$0.15', output: '$0.60', notes: '128K context, 4K output' },
            'command-r7b': { input: '$0.0375', output: '$0.15', notes: '128K context, 4K output' },
            'embed-4': { input: '$0.12', output: '-', notes: 'Images: $0.47/1M, 128K context' },
            'rerank-3-5': { input: '-', output: '-', notes: '$2.00/1k searches, 4K context' },
            'command-r-plus': { input: '$2.50', output: '$10.00' },
            'command-light': { input: '$0.30', output: '$0.60' },

            // Meta Llama
            'llama-4-maverick': { input: '$0.19', output: '$0.19', notes: '3:1 blended, distributed' },
            'llama-4-scout': { input: '$0.15', output: '$0.15' },
            'llama-4-behemoth': { input: '$0.30', output: '$0.30' },
            'llama-3-3-70b-alt': { input: '$0.10', output: '$0.10' },
            'llama-3-2-vision': { input: '$0.08', output: '$0.08' },
            'llama-3-1-405b': { input: '$0.20', output: '$0.20' },

            // AWS Bedrock
            'nova-pro': { input: '$0.80', output: '$3.20' },
            'nova-lite': { input: '$0.06', output: '$0.24' },
            'nova-micro': { input: '$0.035', output: '$0.14' },
            'claude-bedrock': { input: '$3.00', output: '$15.00', notes: 'Same as Anthropic API' },
            'llama-3-3': { input: '$0.10', output: '$0.10' },
        };
        return pricing[modelId] || null;
    };

    return (
        <>
            <Helmet>
                <title>Supported AI Models - Cost Katana Documentation</title>
                <meta name="description" content="Complete list of 400+ supported AI models across OpenAI, Anthropic, Google AI, AWS Bedrock, xAI, DeepSeek, Mistral, Cohere, and Meta." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-light-bg via-light-bg to-primary-500/5 dark:from-dark-bg-100 dark:via-dark-bg-100 dark:to-primary-500/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6"
                        >
                            <Sparkles size={16} />
                            <span>400+ Models Supported</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold mb-4"
                        >
                            <span className="text-gradient">Supported Models</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
                        >
                            Explore all available models and compare their capabilities across {providers.length} leading AI providers.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex justify-center items-center gap-4 text-sm text-light-text-muted dark:text-dark-text-muted mt-4"
                        >
                            <span className="flex items-center gap-1">
                                <Database size={14} className="text-primary-500" />
                                {totalModels} models
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Puzzle size={14} className="text-primary-500" />
                                {providers.length} providers
                            </span>
                        </motion.div>
                    </div>

                    {/* Category Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <div className="flex flex-wrap gap-2 p-2 bg-light-panel dark:bg-dark-panel rounded-xl max-w-4xl mx-auto border border-gray-200 dark:border-gray-800">
                            {categoryCounts.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedCategory === category.id
                                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                        : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400'
                                        }`}
                                >
                                    {category.name}
                                    <span className={`ml-2 text-xs ${selectedCategory === category.id ? 'text-white/80' : 'text-light-text-muted dark:text-dark-text-muted'}`}>
                                        {category.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Search and Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <div className="max-w-3xl mx-auto">
                            {/* Search */}
                            <div className="relative mb-4">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-light-text-muted dark:text-dark-text-muted w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search models by name, series, or capability..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-light-panel dark:bg-dark-panel border border-gray-200 dark:border-gray-800 rounded-xl text-light-text-primary dark:text-dark-text-primary placeholder-light-text-muted dark:placeholder-dark-text-muted focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap gap-4">
                                <select
                                    value={selectedProvider}
                                    onChange={(e) => setSelectedProvider(e.target.value)}
                                    className="flex-1 min-w-[180px] px-4 py-3 bg-light-panel dark:bg-dark-panel border border-gray-200 dark:border-gray-800 rounded-xl text-light-text-primary dark:text-dark-text-primary text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    <option value="all">All Providers</option>
                                    {providers.map(provider => (
                                        <option key={provider.id} value={provider.id}>{provider.name}</option>
                                    ))}
                                </select>

                                <select
                                    value={selectedUseCase}
                                    onChange={(e) => setSelectedUseCase(e.target.value)}
                                    className="flex-1 min-w-[180px] px-4 py-3 bg-light-panel dark:bg-dark-panel border border-gray-200 dark:border-gray-800 rounded-xl text-light-text-primary dark:text-dark-text-primary text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    <option value="all">All Use Cases</option>
                                    {allUseCases.map(useCase => (
                                        <option key={useCase} value={useCase}>
                                            {useCase.charAt(0).toUpperCase() + useCase.slice(1)}
                                        </option>
                                    ))}
                                </select>

                                {/* View Mode Toggle */}
                                <div className="flex items-center gap-1 p-1 bg-light-panel dark:bg-dark-panel border border-gray-200 dark:border-gray-800 rounded-xl">
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
                        </div>
                    </motion.div>

                    {/* Models Display - Multiple View Modes */}
                    {viewMode === 'accordion' && (
                        <div className="space-y-4">
                            {filteredProviders.map((provider, providerIndex) => (
                                <motion.div
                                    key={provider.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: providerIndex * 0.05 }}
                                    className="bg-light-panel dark:bg-dark-panel border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleProvider(provider.id)}
                                        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden"
                                                style={{ backgroundColor: `${provider.brandColor}15` }}
                                            >
                                                {provider.logo ? (
                                                    <img src={provider.logo} alt={`${provider.name} logo`} className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                                ) : null}
                                                {provider.logoFallback && (
                                                    <provider.logoFallback size={28} style={{ color: provider.brandColor, display: provider.logo ? 'none' : 'block' }} />
                                                )}
                                            </div>
                                            <div className="text-left">
                                                <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">{provider.name}</h2>
                                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{provider.description}</p>
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
                                                                <th className="px-6 py-4 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Model</th>
                                                                <th className="px-6 py-4 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Capabilities</th>
                                                                <th className="px-6 py-4 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Pricing</th>
                                                                <th className="px-6 py-4 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Status</th>
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
                                                                            <div className="flex flex-wrap gap-1.5">
                                                                                {model.useCases.slice(0, 4).map(useCase => (
                                                                                    <span key={useCase} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-light-text-secondary dark:text-dark-text-secondary">
                                                                                        {getUseCaseIcon(useCase)}<span className="capitalize">{useCase}</span>
                                                                                    </span>
                                                                                ))}
                                                                                {model.useCases.length > 4 && <span className="text-xs text-light-text-muted dark:text-dark-text-muted">+{model.useCases.length - 4}</span>}
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            <div className="flex items-center gap-2">
                                                                                <div className="flex gap-0.5">{Array.from({ length: 4 }, (_, i) => (<div key={i} className={`w-2 h-2 rounded-full ${i < model.pricingTier ? pricingInfo.dotColor : 'bg-gray-200 dark:bg-gray-700'}`} />))}</div>
                                                                                <span className="text-xs text-light-text-muted dark:text-dark-text-muted">{pricingInfo.label}</span>
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-6 py-4">
                                                                            <div className="flex gap-1.5">
                                                                                {model.isLatest && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400"><Sparkles size={10} className="mr-1" />New</span>}
                                                                                {model.isRecommended && !model.isLatest && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-highlight-500/10 text-highlight-600 dark:text-highlight-400"><Star size={10} className="mr-1" />Popular</span>}
                                                                                {model.isDeprecated && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-danger-500/10 text-danger-600 dark:text-danger-400">Deprecated</span>}
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
                        </div>
                    )}

                    {/* Cards View */}
                    {viewMode === 'cards' && (
                        <div className="space-y-10">
                            {filteredProviders.map((provider) => (
                                <motion.div
                                    key={provider.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {/* Provider Header */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                                            style={{ backgroundColor: `${provider.brandColor}20`, boxShadow: `0 4px 14px ${provider.brandColor}25` }}
                                        >
                                            {provider.logo ? (
                                                <img src={provider.logo} alt={provider.name} className="w-7 h-7 object-contain" />
                                            ) : provider.logoFallback && (
                                                <provider.logoFallback size={24} style={{ color: provider.brandColor }} />
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">{provider.name}</h2>
                                            <p className="text-sm text-light-text-muted dark:text-dark-text-muted">{provider.description}</p>
                                        </div>
                                        <span className="ml-auto px-3 py-1 rounded-full text-sm font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
                                            {provider.models.length} models
                                        </span>
                                    </div>

                                    {/* Model Cards Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                        {provider.models.map((model, idx) => {
                                            const pricingInfo = getPricingTierInfo(model.pricingTier);
                                            const pricing = getModelPricing(model.id);
                                            return (
                                                <motion.div
                                                    key={model.id}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: idx * 0.02 }}
                                                    onClick={() => setSelectedModel(model)}
                                                    className="group relative bg-light-panel dark:bg-dark-panel border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:border-primary-500 hover:shadow-xl hover:shadow-primary-500/15 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                                                >
                                                    {/* Status Badge - Top Right */}
                                                    {(model.isLatest || model.isRecommended || model.isDeprecated) && (
                                                        <div className="absolute -top-2 -right-2">
                                                            {model.isLatest && (
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-500 text-white shadow-lg shadow-primary-500/30">
                                                                    <Sparkles size={12} />
                                                                    New
                                                                </span>
                                                            )}
                                                            {model.isRecommended && !model.isLatest && (
                                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-highlight-500 text-white shadow-lg shadow-highlight-500/30">
                                                                    <Star size={12} />
                                                                    Popular
                                                                </span>
                                                            )}
                                                            {model.isDeprecated && (
                                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white shadow-lg">
                                                                    Deprecated
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Model Name & Series */}
                                                    <div className="mb-4">
                                                        <h3 className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                                            {model.name}
                                                        </h3>
                                                        <p className="text-sm text-light-text-muted dark:text-dark-text-muted mt-0.5">{model.series}</p>
                                                    </div>

                                                    {/* Capabilities */}
                                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                                        {model.useCases.slice(0, 4).map(uc => (
                                                            <span
                                                                key={uc}
                                                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800/80 text-light-text-secondary dark:text-dark-text-secondary border border-gray-200/50 dark:border-gray-700/50"
                                                            >
                                                                {getUseCaseIcon(uc)}
                                                                <span className="capitalize">{uc}</span>
                                                            </span>
                                                        ))}
                                                        {model.useCases.length > 4 && (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium text-light-text-muted dark:text-dark-text-muted">
                                                                +{model.useCases.length - 4} more
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Pricing Section */}
                                                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                                                        {pricing ? (
                                                            <div className="flex items-center justify-between">
                                                                <div className="space-y-1">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-xs text-light-text-muted dark:text-dark-text-muted uppercase tracking-wide">Input</span>
                                                                        <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{pricing.input}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-xs text-light-text-muted dark:text-dark-text-muted uppercase tracking-wide">Output</span>
                                                                        <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{pricing.output}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="flex gap-0.5 justify-end mb-1">
                                                                        {Array.from({ length: 4 }, (_, i) => (
                                                                            <div
                                                                                key={i}
                                                                                className={`w-2 h-2 rounded-full transition-colors ${i < model.pricingTier ? pricingInfo.dotColor : 'bg-gray-200 dark:bg-gray-700'}`}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                    <span className="text-xs text-light-text-muted dark:text-dark-text-muted">{pricingInfo.label}</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm text-light-text-muted dark:text-dark-text-muted">Pricing tier</span>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="flex gap-0.5">
                                                                        {Array.from({ length: 4 }, (_, i) => (
                                                                            <div
                                                                                key={i}
                                                                                className={`w-2 h-2 rounded-full ${i < model.pricingTier ? pricingInfo.dotColor : 'bg-gray-200 dark:bg-gray-700'}`}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                    <span className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">{pricingInfo.label}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Hover Indicator */}
                                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Table View - All models in one table */}
                    {viewMode === 'table' && (
                        <div className="bg-light-panel dark:bg-dark-panel border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
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
                                                                {model.useCases.slice(0, 3).map(uc => (
                                                                    <span key={uc} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-light-text-secondary dark:text-dark-text-secondary">
                                                                        {getUseCaseIcon(uc)}<span className="capitalize">{uc}</span>
                                                                    </span>
                                                                ))}
                                                                {model.useCases.length > 3 && <span className="text-[10px] text-light-text-muted">+{model.useCases.length - 3}</span>}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400">{pricing?.input || pricingInfo.label}</td>
                                                        <td className="px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400">{pricing?.output || '-'}</td>
                                                        <td className="px-4 py-3">
                                                            {model.isLatest && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400">New</span>}
                                                            {model.isRecommended && !model.isLatest && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-highlight-500/10 text-highlight-600 dark:text-highlight-400">Popular</span>}
                                                            {model.isDeprecated && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-danger-500/10 text-danger-600 dark:text-danger-400">Deprecated</span>}
                                                            {!model.isLatest && !model.isRecommended && !model.isDeprecated && <span className="text-[10px] text-light-text-muted dark:text-dark-text-muted">Active</span>}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* List View - Compact list */}
                    {viewMode === 'list' && (
                        <div className="space-y-6">
                            {filteredProviders.map((provider) => (
                                <div key={provider.id} className="bg-light-panel dark:bg-dark-panel border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
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
                                                                <span className="font-medium text-light-text-primary dark:text-dark-text-primary truncate">{model.name}</span>
                                                                {model.isLatest && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400 shrink-0">New</span>}
                                                                {model.isRecommended && !model.isLatest && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-highlight-500/10 text-highlight-600 dark:text-highlight-400 shrink-0">Popular</span>}
                                                                {model.isDeprecated && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-danger-500/10 text-danger-600 dark:text-danger-400 shrink-0">Deprecated</span>}
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                {model.useCases.slice(0, 4).map(uc => (
                                                                    <span key={uc} className="inline-flex items-center gap-0.5 text-[10px] text-light-text-muted dark:text-dark-text-muted">
                                                                        {getUseCaseIcon(uc)}<span className="capitalize">{uc}</span>
                                                                    </span>
                                                                ))}
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
                                </div>
                            ))}
                        </div>
                    )}

                    {/* No Results */}
                    {filteredProviders.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <div className="max-w-md mx-auto">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/10 flex items-center justify-center">
                                    <Search className="w-8 h-8 text-primary-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                    No models found
                                </h3>
                                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                                    Try adjusting your search or filters to find what you're looking for.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedProvider('all');
                                        setSelectedUseCase('all');
                                        setSelectedCategory('all');
                                    }}
                                    className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium shadow-lg shadow-primary-500/25"
                                >
                                    Clear filters
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
                    >
                        <div className="text-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 mb-4">
                                <Sparkles size={14} className="text-primary-500" />
                                <span className="text-primary-600 dark:text-primary-400 font-medium">
                                    Cost Katana supports 400+ models across all providers
                                </span>
                            </div>
                            <p className="mt-2">
                                Visit our{' '}
                                <a href="/getting-started/quick-start" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                                    Quick Start Guide
                                </a>{' '}
                                to learn how to integrate with any model.
                            </p>
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
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                            onClick={() => setSelectedModel(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-light-bg dark:bg-dark-panel rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-200 dark:border-gray-800 shadow-2xl"
                            >
                                <div className="p-6">
                                    {/* Modal Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-1">
                                                {selectedModel.name}
                                            </h2>
                                            <p className="text-light-text-secondary dark:text-dark-text-secondary">
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

                                    <div className="space-y-6">
                                        {/* Status Badges */}
                                        <div className="flex flex-wrap gap-2">
                                            {selectedModel.isLatest && (
                                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400">
                                                    <Sparkles size={14} className="mr-1.5" />
                                                    New
                                                </span>
                                            )}
                                            {selectedModel.isDeprecated && (
                                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-danger-500/10 text-danger-600 dark:text-danger-400">
                                                    Deprecated
                                                </span>
                                            )}
                                            {selectedModel.isRecommended && (
                                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-highlight-500/10 text-highlight-600 dark:text-highlight-400">
                                                    <Star size={14} className="mr-1.5" />
                                                    Popular
                                                </span>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                            <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2 uppercase tracking-wider">
                                                Description
                                            </h3>
                                            <p className="text-light-text-secondary dark:text-dark-text-secondary">
                                                {getModelDescription(selectedModel)}
                                            </p>
                                        </div>

                                        {/* Use Cases */}
                                        <div>
                                            <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-3 uppercase tracking-wider">
                                                Capabilities
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedModel.useCases.map(useCase => (
                                                    <span
                                                        key={useCase}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-light-text-secondary dark:text-dark-text-secondary"
                                                    >
                                                        {getUseCaseIcon(useCase)}
                                                        <span className="capitalize">{useCase}</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Pricing */}
                                        <div>
                                            <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-3 uppercase tracking-wider">
                                                Pricing (per 1M tokens)
                                            </h3>
                                            {(() => {
                                                const pricing = getModelPricing(selectedModel.id);
                                                if (pricing) {
                                                    return (
                                                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                                                            <div className={`grid ${pricing.cached ? 'grid-cols-3' : 'grid-cols-2'} gap-3 mb-3`}>
                                                                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                                                    <div className="text-xs text-light-text-muted dark:text-dark-text-muted uppercase tracking-wider mb-1">Input</div>
                                                                    <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{pricing.input}</div>
                                                                </div>
                                                                {pricing.cached && (
                                                                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                                                        <div className="text-xs text-light-text-muted dark:text-dark-text-muted uppercase tracking-wider mb-1">Cached</div>
                                                                        <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{pricing.cached}</div>
                                                                    </div>
                                                                )}
                                                                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                                                    <div className="text-xs text-light-text-muted dark:text-dark-text-muted uppercase tracking-wider mb-1">Output</div>
                                                                    <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{pricing.output}</div>
                                                                </div>
                                                            </div>
                                                            {pricing.notes && (
                                                                <div className="text-xs text-light-text-muted dark:text-dark-text-muted text-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                                                                    {pricing.notes}
                                                                </div>
                                                            )}
                                                            <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                                                <div className="flex gap-1">
                                                                    {Array.from({ length: 4 }, (_, i) => {
                                                                        const pricingInfo = getPricingTierInfo(selectedModel.pricingTier);
                                                                        return (
                                                                            <div
                                                                                key={i}
                                                                                className={`w-2 h-2 rounded-full ${i < selectedModel.pricingTier ? pricingInfo.dotColor : 'bg-gray-200 dark:bg-gray-700'}`}
                                                                            />
                                                                        );
                                                                    })}
                                                                </div>
                                                                <span className="text-xs text-light-text-muted dark:text-dark-text-muted">
                                                                    {getPricingTierInfo(selectedModel.pricingTier).label} Tier
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return (
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex gap-1">
                                                            {Array.from({ length: 4 }, (_, i) => {
                                                                const pricingInfo = getPricingTierInfo(selectedModel.pricingTier);
                                                                return (
                                                                    <div
                                                                        key={i}
                                                                        className={`w-3 h-3 rounded-full ${i < selectedModel.pricingTier ? pricingInfo.dotColor : 'bg-gray-200 dark:bg-gray-700'}`}
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                        <span className="text-light-text-secondary dark:text-dark-text-secondary">
                                                            {getPricingTierInfo(selectedModel.pricingTier).label}
                                                        </span>
                                                    </div>
                                                );
                                            })()}
                                        </div>

                                        {/* Model ID */}
                                        <div>
                                            <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-3 uppercase tracking-wider">
                                                Model ID
                                            </h3>
                                            <code className="block px-4 py-3 bg-gray-900 dark:bg-gray-950 rounded-lg text-sm font-mono text-primary-400 overflow-x-auto">
                                                {selectedModel.id}
                                            </code>
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
