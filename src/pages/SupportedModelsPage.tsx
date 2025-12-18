import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
    ChevronRight,
    ChevronDown,
    ExternalLink,
    Copy,
    Check,
    LayoutGrid,
    List,
    Table2,
    Rows3,
    GitCompare,
    SlidersHorizontal,
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

interface FilterSectionProps {
    id: string;
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, isExpanded, onToggle, children }) => (
    <div className="border border-slate-200 dark:border-gray-600 rounded-lg overflow-hidden">
        <button
            onClick={onToggle}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-bg-200 hover:bg-slate-100 dark:hover:bg-dark-bg-300 transition-colors flex items-center justify-between text-left"
        >
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{title}</span>
            <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
            >
                <ChevronDown size={16} className="text-slate-500 dark:text-slate-400" />
            </motion.div>
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
                    <div className="p-4 bg-white dark:bg-dark-panel">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const SupportedModelsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProvider, setSelectedProvider] = useState<string>('all');
    const [selectedUseCase, setSelectedUseCase] = useState<string>('all');
    const [selectedModel, setSelectedModel] = useState<Model | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>('cards');
    const [expandedProviders, setExpandedProviders] = useState<Set<string>>(new Set());

    // Comparison state management
    const [selectedModelsForComparison, setSelectedModelsForComparison] = useState<Model[]>([]);
    const [showComparison, setShowComparison] = useState(false);

    // Integration examples state
    const [activeIntegrationTab, setActiveIntegrationTab] = useState<'typescript' | 'python' | 'curl'>('typescript');

    // Advanced filters
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
    const [contextSize, setContextSize] = useState<number>(0);
    const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
    const [selectedInputModalities, setSelectedInputModalities] = useState<string[]>([]);
    const [selectedOutputModalities, setSelectedOutputModalities] = useState<string[]>([]);
    const [expandedFilterSections, setExpandedFilterSections] = useState<Set<string>>(new Set(['providers', 'capabilities']));

    // Theme detection with reactive updates
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark') ||
                window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        const checkTheme = () => {
            setIsDarkMode(
                document.documentElement.classList.contains('dark') ||
                window.matchMedia('(prefers-color-scheme: dark)').matches
            );
        };

        // Check on mount
        checkTheme();

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Watch for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', checkTheme);

        return () => {
            observer.disconnect();
            mediaQuery.removeEventListener('change', checkTheme);
        };
    }, []);

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

    const toggleFilterSection = (sectionId: string) => {
        setExpandedFilterSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) {
                newSet.delete(sectionId);
            } else {
                newSet.add(sectionId);
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

    // Enhanced pricing with optimization potential
    const getEnhancedModelPricing = (modelId: string) => {
        const basePricing = getModelPricing(modelId);
        if (!basePricing) return null;

        // Calculate optimization potential based on Cost Katana features
        const inputPrice = parseFloat(basePricing.input.replace('$', ''));
        const outputPrice = parseFloat(basePricing.output.replace('$', ''));

        // Cortex optimization: 40-75% savings (average 57.5%)
        const cortexSavings = 0.575;
        const optimizedInput = inputPrice * (1 - cortexSavings);
        const optimizedOutput = outputPrice * (1 - cortexSavings);

        // Caching: Up to 100% on repeated requests (average 70% hit rate)
        const cachingPotential = 0.70;

        return {
            ...basePricing,
            optimized: {
                input: `$${optimizedInput.toFixed(3)}`,
                output: `$${optimizedOutput.toFixed(3)}`,
                cortexSavings: `${(cortexSavings * 100).toFixed(0)}%`,
                cachingSavings: `${(cachingPotential * 100).toFixed(0)}%`,
                totalPotentialSavings: `${((cortexSavings + cachingPotential * (1 - cortexSavings)) * 100).toFixed(0)}%`
            },
            contextLength: getModelContextLength(modelId),
            maxOutput: getModelMaxOutput(modelId),
            latency: getModelLatency(modelId)
        };
    };

    const getModelContextLength = (modelId: string): string => {
        const contextLengths: Record<string, string> = {
            // OpenAI
            'gpt-5.1': '400K', 'gpt-5': '400K', 'gpt-5-mini': '400K', 'gpt-5-nano': '400K',
            'gpt-4.1': '1M', 'gpt-4.1-mini': '1M', 'gpt-4.1-nano': '1M',
            'gpt-4o': '128K', 'gpt-4o-mini': '128K',
            'o1': '200K', 'o1-mini': '128K', 'o3': '200K', 'o3-mini': '200K',

            // Anthropic
            'claude-sonnet-4-5': '200K', 'claude-haiku-4-5': '200K', 'claude-opus-4-5': '200K',
            'claude-3-7-sonnet': '200K', 'claude-3-5-haiku': '200K',

            // Google
            'gemini-3-pro-preview': '1M', 'gemini-2-5-pro': '1M', 'gemini-2-5-flash': '1M',
            'gemini-2-0-flash': '1M', 'gemini-1-5-pro': '1M', 'gemini-1-5-flash': '1M',

            // xAI
            'grok-4-1-fast-reasoning': '2M', 'grok-4-fast-reasoning': '2M', 'grok-3': '131K',

            // Others
            'deepseek-chat': '128K', 'deepseek-reasoner': '128K',
            'llama-4-maverick': '131K', 'llama-3-3-70b-alt': '128K',
        };
        return contextLengths[modelId] || '128K';
    };

    const getModelMaxOutput = (modelId: string): string => {
        const maxOutputs: Record<string, string> = {
            // Most models default to 4K-8K output
            'gpt-5.1': '32K', 'gpt-5': '32K', 'gpt-4.1': '32K',
            'claude-sonnet-4-5': '8K', 'claude-opus-4-5': '8K', 'claude-3-7-sonnet': '8K',
            'gemini-3-pro-preview': '66K', 'gemini-2-5-pro': '66K', 'gemini-2-5-flash': '66K',
            'o1': '32K', 'o3': '32K',
        };
        return maxOutputs[modelId] || '4K';
    };

    const getModelLatency = (modelId: string): string => {
        // Approximate latency categories based on model size and type
        const fastModels = ['gpt-4o-mini', 'claude-3-5-haiku', 'gemini-2-5-flash', 'grok-4-1-fast', 'deepseek-chat'];
        const slowModels = ['o1', 'o3', 'claude-opus-4-5', 'gpt-5'];

        if (fastModels.some(m => modelId.includes(m))) return 'Fast (~1-2s)';
        if (slowModels.some(m => modelId.includes(m))) return 'Slow (~10-30s)';
        return 'Medium (~3-8s)';
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


    // Comparison logic functions
    const toggleModelForComparison = (model: Model) => {
        setSelectedModelsForComparison(prev => {
            const isSelected = prev.some(m => m.id === model.id);
            if (isSelected) {
                return prev.filter(m => m.id !== model.id);
            } else if (prev.length < 3) { // Max 3 models for comparison
                return [...prev, model];
            }
            return prev; // Don't add if already at max
        });
    };

    const clearComparison = () => {
        setSelectedModelsForComparison([]);
        setShowComparison(false);
    };

    const startComparison = () => {
        if (selectedModelsForComparison.length >= 2) {
            setShowComparison(true);
        }
    };

    const isModelSelectedForComparison = (model: Model) => {
        return selectedModelsForComparison.some(m => m.id === model.id);
    };

    const selectAllInProvider = (providerId: string) => {
        const provider = providers.find(p => p.id === providerId);
        if (!provider) return;

        const availableSlots = 3 - selectedModelsForComparison.length;
        const modelsToAdd = provider.models.slice(0, availableSlots);

        setSelectedModelsForComparison(prev => [
            ...prev,
            ...modelsToAdd.filter(model => !prev.some(m => m.id === model.id))
        ]);
    };

    // Generate integration examples for a model
    const getIntegrationExample = (model: Model, language: 'typescript' | 'python' | 'curl') => {
        const provider = providers.find(p => p.models.some(m => m.id === model.id));
        const providerName = provider?.name.toLowerCase().replace(/\s+/g, '-') || 'openai';

        switch (language) {
            case 'typescript':
                return `import { AICostTracker } from 'cost-katana';

// Initialize Cost Katana Gateway
const tracker = new AICostTracker({
  apiKey: 'dak_your_key_here',
  defaultModel: '${model.id}',
  gateway: {
    cache: true,      // Enable semantic caching (70-80% savings)
    retry: true,      // Auto-retry on failures
    cortex: true      // Enable Cortex optimization (40-75% savings)
  }
});

// Make AI request with automatic optimization
const response = await tracker.generateContent(
  'Hello, how can you help me today?',
  {
    model: '${model.id}',
    maxTokens: 1000,
    temperature: 0.7
  }
);

console.log('Response:', response.content);
console.log('Cost:', response.cost);
console.log('Cached:', response.cached);
console.log('Optimized:', response.optimized);`;

            case 'python':
                return `from costkatana import AICostTracker

# Initialize Cost Katana Gateway
tracker = AICostTracker(
    api_key="dak_your_key_here",
    default_model="${model.id}",
    gateway_config={
        "cache": True,      # Enable semantic caching
        "retry": True,      # Auto-retry on failures
        "cortex": True      # Enable Cortex optimization
    }
)

# Make AI request with automatic optimization
response = tracker.generate_content(
    message="Hello, how can you help me today?",
    model="${model.id}",
    max_tokens=1000,
    temperature=0.7
)

print(f"Response: {response.content}")
print(f"Cost: {response.cost}")
print(f"Cached: {response.cached}")
print(f"Optimized: {response.optimized}")`;

            case 'curl':
                return `# Using Cost Katana Gateway with HTTP headers
curl -X POST "https://api.costkatana.com/api/gateway/v1/chat/completions" \\
  -H "CostKatana-Auth: Bearer YOUR_COSTKATANA_KEY" \\
  -H "CostKatana-Target-Url: https://api.${providerName}.com" \\
  -H "CostKatana-Cache-Enabled: true" \\
  -H "CostKatana-Retry-Enabled: true" \\
  -H "CostKatana-Cortex-Enabled: true" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${model.id}",
    "messages": [
      {
        "role": "user",
        "content": "Hello, how can you help me today?"
      }
    ],
    "max_tokens": 1000,
    "temperature": 0.7
  }'`;

            default:
                return '';
        }
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

            <div className="min-h-screen bg-white dark:bg-dark-bg-100">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-dark-bg-100 dark:via-dark-bg-200 dark:to-primary-900/10">
                    <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 dark:bg-dark-panel/80 backdrop-blur-sm border border-slate-200/60 dark:border-gray-700/60 shadow-sm mb-8">
                                <Database size={18} className="text-primary-600 dark:text-primary-400" />
                                <span className="text-slate-700 dark:text-slate-300 font-medium">
                                    {totalModels}+ Models across {providers.length} Providers
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-display">
                                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
                                    AI Models
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                                    Directory
                                </span>
                            </h1>

                            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                                Discover, compare, and integrate with 400+ AI models from leading providers.
                                Get detailed pricing, capabilities, and ready-to-use code examples.
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Search & Controls Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="sticky top-4 z-30 mb-8"
                    >
                        <div className="bg-white dark:bg-dark-panel rounded-2xl border border-slate-200 dark:border-gray-700/50 shadow-lg shadow-slate-900/5 dark:shadow-black/20 backdrop-blur-xl">
                            <div className="p-4 sm:p-6">
                                {/* Top Row - Search and View Controls */}
                                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                                    {/* Search Input */}
                                    <div className="relative flex-1 max-w-2xl">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Search models by name, provider, or capability..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-dark-bg-300 border border-slate-200 dark:border-gray-600 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-medium"
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery('')}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Controls */}
                                    <div className="flex items-center gap-3 w-full lg:w-auto">
                                        {/* Filter Button */}
                                        <button
                                            onClick={() => setShowFilters(!showFilters)}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-medium text-sm transition-all relative ${showFilters
                                                ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/25'
                                                : 'bg-white dark:bg-dark-bg-300 border-slate-200 dark:border-gray-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-dark-bg-200 hover:border-primary-500/50'
                                                }`}
                                        >
                                            <SlidersHorizontal size={16} />
                                            <span>Filters</span>
                                            {(selectedProvider !== 'all' || selectedUseCase !== 'all' || priceRange[1] !== 200 || contextSize !== 0 || selectedCapabilities.length > 0 || selectedInputModalities.length > 0 || selectedOutputModalities.length > 0) && (
                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white dark:border-dark-panel"></div>
                                            )}
                                        </button>

                                        {/* View Mode Toggle */}
                                        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-dark-bg-300 rounded-xl border border-slate-200 dark:border-gray-600">
                                            {viewModes.map((mode) => {
                                                const IconComponent = mode.icon;
                                                return (
                                                    <button
                                                        key={mode.id}
                                                        onClick={() => setViewMode(mode.id)}
                                                        title={mode.name}
                                                        className={`p-2.5 rounded-lg transition-all ${viewMode === mode.id
                                                            ? 'bg-white dark:bg-dark-panel text-primary-600 dark:text-primary-400 shadow-sm border border-slate-200 dark:border-gray-600'
                                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-dark-panel/50'
                                                            }`}
                                                    >
                                                        <IconComponent size={16} />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Advanced Filters Panel */}
                                <AnimatePresence>
                                    {showFilters && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, y: -10 }}
                                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                                            exit={{ opacity: 0, height: 0, y: -10 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden border-t border-slate-200 dark:border-gray-700"
                                        >
                                            <div className="pt-6">
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                                    {/* Primary Filters */}
                                                    <div className="space-y-4">
                                                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                                                            Primary Filters
                                                        </h3>

                                                        {/* Providers Filter */}
                                                        <FilterSection
                                                            id="providers"
                                                            title="Providers"
                                                            isExpanded={expandedFilterSections.has('providers')}
                                                            onToggle={() => toggleFilterSection('providers')}
                                                        >
                                                            <select
                                                                value={selectedProvider}
                                                                onChange={(e) => setSelectedProvider(e.target.value)}
                                                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-dark-bg-300 border border-slate-200 dark:border-gray-600 rounded-lg text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                                            >
                                                                <option value="all">All Providers</option>
                                                                {providers.map(provider => (
                                                                    <option key={provider.id} value={provider.id}>{provider.name}</option>
                                                                ))}
                                                            </select>
                                                        </FilterSection>

                                                        {/* Capabilities Filter */}
                                                        <FilterSection
                                                            id="capabilities"
                                                            title="Capabilities"
                                                            isExpanded={expandedFilterSections.has('capabilities')}
                                                            onToggle={() => toggleFilterSection('capabilities')}
                                                        >
                                                            <select
                                                                value={selectedUseCase}
                                                                onChange={(e) => setSelectedUseCase(e.target.value)}
                                                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-dark-bg-300 border border-slate-200 dark:border-gray-600 rounded-lg text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                                            >
                                                                <option value="all">All Capabilities</option>
                                                                {allUseCases.map(useCase => (
                                                                    <option key={useCase} value={useCase}>
                                                                        {useCase.charAt(0).toUpperCase() + useCase.slice(1)}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </FilterSection>
                                                    </div>

                                                    {/* Advanced Filters */}
                                                    <div className="space-y-4">
                                                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                                                            Advanced Filters
                                                        </h3>

                                                        {/* Price Range Filter */}
                                                        <FilterSection
                                                            id="pricing"
                                                            title="Price Range"
                                                            isExpanded={expandedFilterSections.has('pricing')}
                                                            onToggle={() => toggleFilterSection('pricing')}
                                                        >
                                                            <div className="space-y-3">
                                                                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                                                                    <span>${priceRange[0].toFixed(2)}</span>
                                                                    <span>${priceRange[1].toFixed(2)} per 1M tokens</span>
                                                                </div>
                                                                <input
                                                                    type="range"
                                                                    min="0"
                                                                    max="200"
                                                                    step="1"
                                                                    value={priceRange[1]}
                                                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                                                    className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                                                                />
                                                            </div>
                                                        </FilterSection>

                                                        {/* Context Size Filter */}
                                                        <FilterSection
                                                            id="context"
                                                            title="Context Length"
                                                            isExpanded={expandedFilterSections.has('context')}
                                                            onToggle={() => toggleFilterSection('context')}
                                                        >
                                                            <div className="space-y-3">
                                                                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                                                                    <span>Minimum</span>
                                                                    <span>
                                                                        {contextSize === 0 ? '0' : contextSize >= 1000000 ? `${(contextSize / 1000000).toFixed(1)}M` : `${(contextSize / 1000).toFixed(0)}K`} tokens
                                                                    </span>
                                                                </div>
                                                                <input
                                                                    type="range"
                                                                    min="0"
                                                                    max="1000000"
                                                                    step="10000"
                                                                    value={contextSize}
                                                                    onChange={(e) => setContextSize(parseInt(e.target.value))}
                                                                    className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                                                                />
                                                            </div>
                                                        </FilterSection>
                                                    </div>

                                                    {/* Modality Filters */}
                                                    <div className="space-y-4">
                                                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                                                            Modalities & Features
                                                        </h3>

                                                        {/* Input Modalities */}
                                                        <FilterSection
                                                            id="input-modalities"
                                                            title="Input Types"
                                                            isExpanded={expandedFilterSections.has('input-modalities')}
                                                            onToggle={() => toggleFilterSection('input-modalities')}
                                                        >
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {['Text', 'Image', 'Audio', 'Video'].map((modality) => (
                                                                    <label key={modality} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedInputModalities.includes(modality)}
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    setSelectedInputModalities([...selectedInputModalities, modality]);
                                                                                } else {
                                                                                    setSelectedInputModalities(selectedInputModalities.filter(m => m !== modality));
                                                                                }
                                                                            }}
                                                                            className="w-4 h-4 rounded border-slate-300 dark:border-slate-500 text-primary-500 focus:ring-primary-500/20"
                                                                        />
                                                                        <span className="font-medium">{modality}</span>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </FilterSection>

                                                        {/* Special Features */}
                                                        <FilterSection
                                                            id="features"
                                                            title="Special Features"
                                                            isExpanded={expandedFilterSections.has('features')}
                                                            onToggle={() => toggleFilterSection('features')}
                                                        >
                                                            <div className="space-y-2">
                                                                {['Caching', 'Web Search'].map((capability) => (
                                                                    <label key={capability} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={selectedCapabilities.includes(capability)}
                                                                            onChange={(e) => {
                                                                                if (e.target.checked) {
                                                                                    setSelectedCapabilities([...selectedCapabilities, capability]);
                                                                                } else {
                                                                                    setSelectedCapabilities(selectedCapabilities.filter(c => c !== capability));
                                                                                }
                                                                            }}
                                                                            className="w-4 h-4 rounded border-slate-300 dark:border-slate-500 text-primary-500 focus:ring-primary-500/20"
                                                                        />
                                                                        <span className="font-medium">{capability}</span>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </FilterSection>
                                                    </div>
                                                </div>

                                                {/* Clear Filters Button */}
                                                {(selectedProvider !== 'all' || selectedUseCase !== 'all' || priceRange[1] !== 200 || contextSize !== 0 || selectedCapabilities.length > 0 || selectedInputModalities.length > 0 || selectedOutputModalities.length > 0) && (
                                                    <div className="flex justify-center pt-6 border-t border-slate-200 dark:border-gray-700 mt-6">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedProvider('all');
                                                                setSelectedUseCase('all');
                                                                setPriceRange([0, 200]);
                                                                setContextSize(0);
                                                                setSelectedCapabilities([]);
                                                                setSelectedInputModalities([]);
                                                                setSelectedOutputModalities([]);
                                                            }}
                                                            className="px-6 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-all border border-slate-200 dark:border-gray-600 hover:border-primary-200 dark:hover:border-primary-500/30"
                                                        >
                                                            Clear All Filters
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Comparison Controls */}
                                <AnimatePresence>
                                    {selectedModelsForComparison.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mt-6 p-4 bg-gradient-to-r from-primary-50 via-blue-50 to-indigo-50 dark:from-primary-500/10 dark:via-primary-600/10 dark:to-primary-500/10 border border-primary-200 dark:border-primary-500/20 rounded-xl"
                                        >
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25">
                                                            <GitCompare size={18} />
                                                        </div>
                                                        <div>
                                                            <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                                                                {selectedModelsForComparison.length} Model{selectedModelsForComparison.length !== 1 ? 's' : ''} Selected
                                                            </span>
                                                            <div className="text-xs text-slate-600 dark:text-slate-400">
                                                                Ready for comparison
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex -space-x-2">
                                                        {selectedModelsForComparison.slice(0, 3).map((model, index) => (
                                                            <div
                                                                key={model.id}
                                                                className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center border-2 border-white dark:border-dark-panel shadow-sm"
                                                                style={{ zIndex: 10 - index }}
                                                                title={model.name}
                                                            >
                                                                {model.name.charAt(0)}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                                    <button
                                                        onClick={clearComparison}
                                                        className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-lg transition-all border border-slate-200 dark:border-slate-600"
                                                    >
                                                        Clear
                                                    </button>
                                                    <button
                                                        onClick={startComparison}
                                                        disabled={selectedModelsForComparison.length < 2}
                                                        className="flex-1 sm:flex-none px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition-all shadow-lg shadow-primary-500/25 hover:shadow-xl"
                                                    >
                                                        Compare Models
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Summary */}
                    {(searchQuery || selectedProvider !== 'all' || selectedUseCase !== 'all' || selectedCapabilities.length > 0) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-6 flex items-center justify-between bg-slate-50 dark:bg-dark-bg-200 rounded-xl px-4 py-3 border border-slate-200 dark:border-gray-600"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                    Showing {filteredCount} of {totalModels} models
                                </div>
                                {searchQuery && (
                                    <div className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-dark-panel px-2 py-1 rounded-md">
                                        for "{searchQuery}"
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedProvider('all');
                                    setSelectedUseCase('all');
                                    setSelectedCapabilities([]);
                                    setSelectedInputModalities([]);
                                    setSelectedOutputModalities([]);
                                    setPriceRange([0, 200]);
                                    setContextSize(0);
                                }}
                                className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                            >
                                Clear filters
                            </button>
                        </motion.div>
                    )}

                    {/* Cards View */}
                    {viewMode === 'cards' && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8"
                        >
                            {filteredProviders.map((provider) => (
                                <motion.div
                                    key={provider.id}
                                    variants={itemVariants}
                                    className="bg-white dark:bg-dark-panel border border-slate-200 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    {/* Provider Header */}
                                    <div className="p-6 bg-gradient-to-r from-slate-50/50 to-white dark:from-dark-bg-200/50 dark:to-dark-panel border-b border-slate-100 dark:border-gray-800">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm border border-slate-200/50 dark:border-gray-700/50"
                                                    style={{ backgroundColor: `${provider.brandColor}10` }}
                                                >
                                                    {provider.logo ? (
                                                        <img
                                                            src={provider.logo}
                                                            alt={`${provider.name} logo`}
                                                            className="w-8 h-8 object-contain"
                                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                        />
                                                    ) : null}
                                                    {provider.logoFallback && (
                                                        <provider.logoFallback
                                                            size={28}
                                                            style={{ color: provider.brandColor, display: provider.logo ? 'none' : 'block' }}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-display mb-1">
                                                        {provider.name}
                                                    </h2>
                                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                                        {provider.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                                        {provider.models.length}
                                                    </div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                                                        Models
                                                    </div>
                                                </div>
                                                {selectedModelsForComparison.length < 3 && (
                                                    <button
                                                        onClick={() => selectAllInProvider(provider.id)}
                                                        className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-all border border-primary-200 dark:border-primary-500/30 hover:border-primary-300 dark:hover:border-primary-500/50"
                                                    >
                                                        Select All
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Models Grid */}
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {provider.models.map((model) => {
                                                const pricingInfo = getPricingTierInfo(model.pricingTier);
                                                const pricing = getModelPricing(model.id);
                                                const isSelected = isModelSelectedForComparison(model);

                                                return (
                                                    <motion.div
                                                        key={model.id}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`group relative p-4 border rounded-xl text-left transition-all duration-200 cursor-pointer ${isSelected
                                                            ? 'border-primary-300 dark:border-primary-500/50 bg-primary-50 dark:bg-primary-500/10 shadow-lg shadow-primary-500/10'
                                                            : model.isDeprecated
                                                                ? 'border-slate-200 dark:border-gray-700/50 bg-slate-50 dark:bg-dark-bg-300 opacity-60'
                                                                : 'border-slate-200 dark:border-gray-700/50 bg-slate-50 dark:bg-dark-bg-300 hover:border-primary-200 dark:hover:border-primary-500/30 hover:bg-white dark:hover:bg-dark-panel hover:shadow-md'
                                                            }`}
                                                        onClick={() => setSelectedModel(model)}
                                                    >
                                                        {/* Selection Checkbox */}
                                                        <div className="absolute -top-2 -left-2 z-10">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleModelForComparison(model);
                                                                }}
                                                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm ${isSelected
                                                                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 border-transparent text-white shadow-lg shadow-primary-500/30'
                                                                    : 'bg-white dark:bg-dark-panel border-slate-300 dark:border-gray-600 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10'
                                                                    }`}
                                                                disabled={!isSelected && selectedModelsForComparison.length >= 3}
                                                            >
                                                                {isSelected && <Check size={14} className="text-white font-bold" />}
                                                            </button>
                                                        </div>

                                                        {/* Status Badges */}
                                                        <div className="absolute -top-2 -right-2 flex gap-1">
                                                            {model.isLatest && (
                                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 border border-emerald-400/20">
                                                                    <Sparkles size={10} />
                                                                    NEW
                                                                </span>
                                                            )}
                                                            {model.isRecommended && !model.isLatest && (
                                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30 border border-amber-400/20">
                                                                    <Star size={10} />
                                                                    TOP
                                                                </span>
                                                            )}
                                                            {model.isDeprecated && (
                                                                <span className="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-500 text-white">
                                                                    DEPRECATED
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Model Name */}
                                                        <div className="mb-3">
                                                            <h3 className={`font-semibold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors ${model.isDeprecated ? 'line-through' : ''
                                                                }`}>
                                                                {model.name}
                                                            </h3>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                                                {model.series}
                                                            </p>
                                                        </div>

                                                        {/* Capabilities */}
                                                        <div className="flex flex-wrap gap-1 mb-4">
                                                            {model.useCases.slice(0, 3).map(uc => {
                                                                const { icon: Icon, color } = getUseCaseIcon(uc);
                                                                return (
                                                                    <span
                                                                        key={uc}
                                                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold bg-white dark:bg-dark-panel text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-gray-600"
                                                                    >
                                                                        <Icon size={10} className={color} />
                                                                        <span className="capitalize">{uc}</span>
                                                                    </span>
                                                                );
                                                            })}
                                                            {model.useCases.length > 3 && (
                                                                <span className="text-[10px] text-slate-500 dark:text-slate-400 px-2 py-1 font-medium">
                                                                    +{model.useCases.length - 3} more
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Pricing & Tier */}
                                                        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-gray-700">
                                                            {pricing ? (
                                                                <div className="text-xs">
                                                                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                                                                        {pricing.input} / {pricing.output}
                                                                    </div>
                                                                    <div className="text-slate-500 dark:text-slate-400">
                                                                        per 1M tokens
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="text-xs">
                                                                    <div className={`font-semibold ${pricingInfo.textColor}`}>
                                                                        {pricingInfo.label}
                                                                    </div>
                                                                    <div className="text-slate-500 dark:text-slate-400">
                                                                        tier
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div className="flex items-center gap-1">
                                                                {Array.from({ length: 4 }, (_, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className={`w-2 h-2 rounded-full transition-all ${i < model.pricingTier
                                                                            ? pricingInfo.color.replace('bg-', 'bg-')
                                                                            : 'bg-slate-300 dark:bg-slate-600'
                                                                            }`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Hover Arrow */}
                                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <ChevronRight size={16} className="text-slate-400 dark:text-slate-500" />
                                                        </div>
                                                    </motion.div>
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
                                            <th className="px-3 py-3 text-left text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">Compare</th>
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
                                                const isSelected = isModelSelectedForComparison(model);
                                                return (
                                                    <tr key={model.id} className={`transition-colors ${isSelected ? 'bg-highlight-500/5' : 'hover:bg-primary-500/5 dark:hover:bg-primary-500/10'}`}>
                                                        <td className="px-3 py-3">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleModelForComparison(model);
                                                                }}
                                                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shadow-sm ${isSelected
                                                                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 border-transparent text-white shadow-lg shadow-primary-500/30'
                                                                    : 'bg-white dark:bg-dark-panel border-gray-300 dark:border-gray-600 hover:border-primary-500 hover:bg-primary-500/5 dark:hover:bg-primary-500/10'
                                                                    }`}
                                                                disabled={!isSelected && selectedModelsForComparison.length >= 3}
                                                            >
                                                                {isSelected && <Check size={12} className="text-white" />}
                                                            </button>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: `${provider.brandColor}15` }}>
                                                                    {provider.logo ? <img src={provider.logo} alt="" className="w-4 h-4 object-contain" /> : provider.logoFallback && <provider.logoFallback size={12} style={{ color: provider.brandColor }} />}
                                                                </div>
                                                                <span className="text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary">{provider.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <button
                                                                onClick={() => setSelectedModel(model)}
                                                                className="font-medium text-light-text-primary dark:text-dark-text-primary text-sm hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-left"
                                                            >
                                                                {model.name}
                                                            </button>
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
                            className="text-center py-24"
                        >
                            <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                <Search className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                                No models found
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto text-lg">
                                We couldn't find any models matching your criteria. Try adjusting your filters or search terms.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedProvider('all');
                                    setSelectedUseCase('all');
                                    setSelectedCapabilities([]);
                                    setSelectedInputModalities([]);
                                    setSelectedOutputModalities([]);
                                    setPriceRange([0, 200]);
                                    setContextSize(0);
                                }}
                                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl"
                            >
                                Reset All Filters
                            </button>
                        </motion.div>
                    )}

                    {/* Footer CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-20 text-center"
                    >
                        <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-dark-bg-200 dark:to-primary-900/20 rounded-2xl p-8 border border-slate-200 dark:border-gray-700">
                            <div className="max-w-2xl mx-auto">
                                <div className="flex justify-center items-center gap-3 mb-4">
                                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                                        <Sparkles size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                        Optimize Every Model
                                    </h3>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg leading-relaxed">
                                    Cost Katana's intelligent optimization works across all {totalModels}+ models,
                                    delivering up to 90% cost savings through advanced caching and compression.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <a
                                        href="/getting-started/quick-start"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl"
                                    >
                                        Get Started Now
                                        <ExternalLink size={16} />
                                    </a>
                                    <a
                                        href="/features"
                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-dark-panel text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-bg-300 transition-all font-semibold border border-slate-200 dark:border-gray-600 hover:border-slate-300 dark:hover:border-gray-500"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Compare Button (Mobile) */}
                <AnimatePresence>
                    {selectedModelsForComparison.length >= 2 && (
                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            className="fixed bottom-6 right-6 z-40 sm:hidden"
                        >
                            <button
                                onClick={startComparison}
                                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg shadow-black/25 hover:shadow-xl transition-all font-medium"
                            >
                                <GitCompare size={20} />
                                <span>Compare ({selectedModelsForComparison.length})</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Model Comparison Modal */}
                <AnimatePresence>
                    {showComparison && selectedModelsForComparison.length >= 2 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                            onClick={() => setShowComparison(false)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                    setShowComparison(false);
                                }
                            }}
                            tabIndex={-1}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white dark:bg-dark-panel rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700/50 shadow-2xl"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="comparison-modal-title"
                                aria-describedby="comparison-modal-description"
                            >
                                <div className="p-6">
                                    {/* Modal Header */}
                                    <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg">
                                                <GitCompare size={24} />
                                            </div>
                                            <div>
                                                <h2 id="comparison-modal-title" className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary font-display">
                                                    Model Comparison
                                                </h2>
                                                <p id="comparison-modal-description" className="text-light-text-muted dark:text-dark-text-muted">
                                                    Compare {selectedModelsForComparison.length} models side by side
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowComparison(false)}
                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            <X size={20} className="text-light-text-muted dark:text-dark-text-muted" />
                                        </button>
                                    </div>

                                    {/* Models Grid */}
                                    <div className={`grid gap-4 lg:gap-6 ${selectedModelsForComparison.length === 2
                                        ? 'grid-cols-1 md:grid-cols-2'
                                        : 'grid-cols-1 lg:grid-cols-3'
                                        }`}>
                                        {selectedModelsForComparison.map((model) => {
                                            const provider = providers.find(p => p.models.some(m => m.id === model.id));
                                            const enhancedPricing = getEnhancedModelPricing(model.id);
                                            const pricingInfo = getPricingTierInfo(model.pricingTier);

                                            return (
                                                <div key={model.id} className="bg-light-panel dark:bg-dark-bg-300 rounded-xl p-5 border border-gray-200 dark:border-gray-700/50">
                                                    {/* Model Header */}
                                                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                                                        <div
                                                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                                                            style={{ backgroundColor: `${provider?.brandColor}15` }}
                                                        >
                                                            {provider?.logo ? (
                                                                <img src={provider.logo} alt="" className="w-6 h-6 object-contain" />
                                                            ) : provider?.logoFallback && (
                                                                <provider.logoFallback size={16} style={{ color: provider.brandColor }} />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary truncate">
                                                                {model.name}
                                                            </h3>
                                                            <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
                                                                {provider?.name}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => toggleModelForComparison(model)}
                                                            className="p-1 text-light-text-muted hover:text-red-500 transition-colors"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>

                                                    {/* Enhanced Pricing Stats */}
                                                    <div className="space-y-4 mb-4">
                                                        {/* Standard Pricing */}
                                                        <div>
                                                            <h4 className="text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider mb-2">
                                                                Standard Pricing (per 1M tokens)
                                                            </h4>
                                                            {enhancedPricing ? (
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div className="text-center p-2 bg-white dark:bg-dark-panel rounded-lg">
                                                                        <div className="text-xs text-light-text-muted dark:text-dark-text-muted">Input</div>
                                                                        <div className="font-semibold text-primary-600 dark:text-primary-400">{enhancedPricing.input}</div>
                                                                    </div>
                                                                    <div className="text-center p-2 bg-white dark:bg-dark-panel rounded-lg">
                                                                        <div className="text-xs text-light-text-muted dark:text-dark-text-muted">Output</div>
                                                                        <div className="font-semibold text-highlight-600 dark:text-highlight-400">{enhancedPricing.output}</div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="text-center p-3 bg-white dark:bg-dark-panel rounded-lg">
                                                                    <span className={`font-semibold ${pricingInfo.textColor}`}>
                                                                        {pricingInfo.label} Tier
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Optimized Pricing */}
                                                        {enhancedPricing?.optimized && (
                                                            <div>
                                                                <h4 className="text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider mb-2">
                                                                    With Cost Katana Optimization
                                                                </h4>
                                                                <div className="p-3 bg-gradient-to-r from-primary-500/10 to-highlight-500/10 rounded-lg border border-primary-500/20">
                                                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                                                        <div className="text-center">
                                                                            <div className="text-xs text-light-text-muted dark:text-dark-text-muted">Optimized Input</div>
                                                                            <div className="font-semibold text-primary-600 dark:text-primary-400">{enhancedPricing.optimized.input}</div>
                                                                        </div>
                                                                        <div className="text-center">
                                                                            <div className="text-xs text-light-text-muted dark:text-dark-text-muted">Optimized Output</div>
                                                                            <div className="font-semibold text-highlight-600 dark:text-highlight-400">{enhancedPricing.optimized.output}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <div className="text-xs text-light-text-muted dark:text-dark-text-muted">Total Potential Savings</div>
                                                                        <div className="font-bold text-emerald-600 dark:text-emerald-400">{enhancedPricing.optimized.totalPotentialSavings}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Context & Performance */}
                                                        <div>
                                                            <h4 className="text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider mb-2">
                                                                Performance Specs
                                                            </h4>
                                                            <div className="space-y-2">
                                                                <div className="flex justify-between items-center p-2 bg-white dark:bg-dark-panel rounded-lg">
                                                                    <span className="text-xs text-light-text-muted dark:text-dark-text-muted">Context Length</span>
                                                                    <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                                                                        {enhancedPricing?.contextLength || 'N/A'}
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between items-center p-2 bg-white dark:bg-dark-panel rounded-lg">
                                                                    <span className="text-xs text-light-text-muted dark:text-dark-text-muted">Max Output</span>
                                                                    <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                                                                        {enhancedPricing?.maxOutput || 'N/A'}
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between items-center p-2 bg-white dark:bg-dark-panel rounded-lg">
                                                                    <span className="text-xs text-light-text-muted dark:text-dark-text-muted">Latency</span>
                                                                    <span className="font-semibold text-light-text-primary dark:text-dark-text-primary">
                                                                        {enhancedPricing?.latency || 'N/A'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Capabilities */}
                                                        <div>
                                                            <h4 className="text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider mb-2">
                                                                Capabilities
                                                            </h4>
                                                            <div className="flex flex-wrap gap-1">
                                                                {model.useCases.map(useCase => {
                                                                    const { icon: Icon, color } = getUseCaseIcon(useCase);
                                                                    return (
                                                                        <span
                                                                            key={useCase}
                                                                            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-white dark:bg-dark-panel text-light-text-secondary dark:text-dark-text-secondary"
                                                                        >
                                                                            <Icon size={10} className={color} />
                                                                            <span className="capitalize">{useCase}</span>
                                                                        </span>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>

                                                        {/* Status & Badges */}
                                                        <div>
                                                            <h4 className="text-xs font-semibold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider mb-2">
                                                                Status
                                                            </h4>
                                                            <div className="flex flex-wrap gap-1">
                                                                {model.isLatest && (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400">
                                                                        <Sparkles size={10} /> New
                                                                    </span>
                                                                )}
                                                                {model.isRecommended && (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                                                        <Star size={10} /> Top
                                                                    </span>
                                                                )}
                                                                {model.isDeprecated && (
                                                                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-gray-500/10 text-gray-600 dark:text-gray-400">
                                                                        Deprecated
                                                                    </span>
                                                                )}
                                                                {!model.isLatest && !model.isRecommended && !model.isDeprecated && (
                                                                    <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-light-text-secondary dark:text-dark-text-secondary">
                                                                        Active
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Integration Button */}
                                                        <button
                                                            onClick={() => setSelectedModel(model)}
                                                            className="w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all font-medium text-sm shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
                                                        >
                                                            View Integration Guide
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

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
                                className="bg-white dark:bg-dark-panel rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto border border-gray-200 dark:border-gray-700/50 shadow-2xl"
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
                                    <div className="mb-6">
                                        <h3 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary mb-3 uppercase tracking-wider">
                                            Model ID
                                        </h3>
                                        <div className="relative">
                                            <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-xl border border-gray-700/50 dark:border-gray-600/50">
                                                <code className="flex-1 text-sm font-mono text-primary-400 dark:text-primary-300 font-medium tracking-wide overflow-x-auto">
                                                    {selectedModel.id}
                                                </code>
                                                <button
                                                    onClick={() => copyModelId(selectedModel.id)}
                                                    className="p-2 bg-white/10 dark:bg-black/20 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-black/30 rounded-lg transition-all border border-white/20 dark:border-gray-600/20"
                                                >
                                                    {copiedId === selectedModel.id ? (
                                                        <Check size={16} className="text-emerald-400" />
                                                    ) : (
                                                        <Copy size={16} className="text-gray-300 dark:text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Integration Examples */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-light-text-secondary dark:text-dark-text-secondary mb-3 uppercase tracking-wider">
                                            Cost Katana Gateway Integration
                                        </h3>

                                        {/* Language Tabs */}
                                        <div className="flex items-center gap-1 p-1 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg mb-4 border border-gray-200 dark:border-gray-700/50">
                                            {(['typescript', 'python', 'curl'] as const).map((lang) => (
                                                <button
                                                    key={lang}
                                                    onClick={() => setActiveIntegrationTab(lang)}
                                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all capitalize relative ${activeIntegrationTab === lang
                                                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                                                        : 'text-light-text-muted dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-500/5 dark:hover:bg-primary-500/10'
                                                        }`}
                                                >
                                                    {lang === 'typescript' ? 'TypeScript' : lang === 'python' ? 'Python' : 'cURL'}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Enhanced Code Example with Syntax Highlighting */}
                                        <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700/50 shadow-lg">
                                            <SyntaxHighlighter
                                                language={activeIntegrationTab === 'curl' ? 'bash' : activeIntegrationTab}
                                                style={isDarkMode ? oneDark : oneLight}
                                                customStyle={{
                                                    margin: 0,
                                                    borderRadius: '0.75rem',
                                                    fontSize: '0.875rem',
                                                    lineHeight: '1.75',
                                                    padding: '1.25rem',
                                                    background: isDarkMode
                                                        ? 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)'
                                                        : 'linear-gradient(135deg, #f6f8fa 0%, #ffffff 100%)',
                                                    border: 'none',
                                                }}
                                                wrapLines={true}
                                                wrapLongLines={true}
                                                showLineNumbers={false}
                                                codeTagProps={{
                                                    style: {
                                                        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                                                        color: isDarkMode ? '#c9d1d9' : '#24292f',
                                                    }
                                                }}
                                                lineProps={{
                                                    style: {
                                                        padding: '0.125rem 0',
                                                    }
                                                }}
                                            >
                                                {getIntegrationExample(selectedModel, activeIntegrationTab)}
                                            </SyntaxHighlighter>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(getIntegrationExample(selectedModel, activeIntegrationTab));
                                                    setCopiedId(`integration-${activeIntegrationTab}`);
                                                    setTimeout(() => setCopiedId(null), 2000);
                                                }}
                                                className="absolute top-3 right-3 p-2 bg-white/10 dark:bg-black/20 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-black/30 rounded-lg transition-all border border-white/20 dark:border-gray-600/20"
                                            >
                                                {copiedId === `integration-${activeIntegrationTab}` ? (
                                                    <Check size={16} className="text-emerald-500" />
                                                ) : (
                                                    <Copy size={16} className="text-gray-600 dark:text-gray-300" />
                                                )}
                                            </button>
                                        </div>

                                        {/* Features List */}
                                        <div className="mt-4 grid grid-cols-2 gap-3">
                                            <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                                <span>Semantic Caching (70-80% savings)</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                                <div className="w-2 h-2 rounded-full bg-highlight-500"></div>
                                                <span>Cortex Optimization (40-75% savings)</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                                <span>Automatic Retries & Failover</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                <span>Cost Tracking & Analytics</span>
                                            </div>
                                        </div>

                                        {/* Get Started Button */}
                                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                                            <a
                                                href="/getting-started/quick-start"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all font-medium text-sm shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30"
                                            >
                                                <span>Get Started with Cost Katana</span>
                                                <ExternalLink size={14} />
                                            </a>
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
