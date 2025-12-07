import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import MarkdownContent from '../../components/MarkdownContent';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const IntroductionPage: React.FC = () => {
    const content = `# Introduction

Cost Katana is the **world's first AI-powered cost optimization platform** designed to help developers and organizations monitor, analyze, and optimize their AI API costs across multiple providers.

Monitor your AI applications with intelligent insights, predictive analytics, and personalized optimization recommendations. Cost Katana is the **CI workflow designed for the entire AI lifecycle**.

## What is Cost Katana?

Cost Katana transforms how you manage AI costs by providing:

- **🤖 AI-Powered Intelligence**: Personalized recommendations based on your usage patterns
- **📊 Real-time Monitoring**: Live tracking across 400+ AI models from 10 providers:
  - OpenAI (GPT-5, GPT-4o, O3, DALL-E 3, Whisper)
  - Anthropic (Claude Sonnet 4.5, Claude 4, Claude 3.5 Sonnet)
  - Google AI (Gemini 2.5 Pro, Gemini 2.0 Flash, Imagen 4, Veo 3)
  - AWS Bedrock (Amazon Nova, Claude on Bedrock, Llama 3.3)
  - xAI (Grok-2, Grok Vision)
  - DeepSeek, Mistral AI, Cohere, Grok, Meta Llama
- **🔮 Predictive Analytics**: AI forecasts spending trends and prevents limit overruns
- **⚡ Smart Optimization**: Automated prompt optimization and model recommendations
- **🎯 Project Management**: Organize usage by projects with budget tracking
- **🚀 Seamless Integration**: Works with your existing workflow - from ChatGPT to production APIs

## Key Features

### 🧠 Intelligent Cost Optimization
- **Pattern Recognition**: AI identifies inefficient usage patterns automatically
- **Smart Savings**: Personalized cost reduction strategies with predicted savings
- **Model Suggestions**: AI recommends optimal models based on use case analysis
- **Prompt Optimization**: Intelligent prompt compression and optimization
- **Data Network Effects**: Self-improving system with learning loops that gets better with every user interaction

### 📈 Advanced Analytics & Monitoring
- **Real-Time Dashboards**: Live usage monitoring with AI insights
- **Cost Intelligence Stack**: 6-layer system with telemetry, intelligence, routing, enforcement, caching, and simulation
- **Predictive Analytics**: ML-powered forecasting and trend analysis
- **Cost Breakdown**: Detailed analysis by project, model, and time period
- **Usage Intelligence**: Deep insights into spending patterns and efficiency

### 🔗 Universal Integration
- **Provider-Independent Core**: Write once, run anywhere with capability-based routing
- **Primary Package**: \`cost-katana\` ⭐ - Our #1 priority npm package for Node.js/TypeScript with type-safe model constants
- **Multi-Provider Support**: 400+ models across 12+ providers
  - Latest models: GPT-5, Claude Sonnet 4.5, Gemini 2.5 Pro
  - All major providers: OpenAI, Anthropic, Google, AWS, xAI, DeepSeek, Mistral, and more
- **Zero Vendor Lock-In**: Switch providers without changing code
- **Additional Tools**: CLI tools, Python SDK, VSCode/Cursor extensions
- **ChatGPT Custom GPT**: Direct integration with personalized AI tips
- **API Gateway**: Unified proxy with caching, retries, and optimization

### 🚨 Proactive Monitoring
- **Smart Alerts**: Multi-tier alerts (50%, 80%, 90% usage thresholds)
- **Predictive Warnings**: AI predicts problems before they occur
- **Email Intelligence**: AI-enhanced weekly digests with actionable insights
- **Real-time Notifications**: Instant alerts via email, webhook, or dashboard

### 🛡️ AI Governance & Security
- **Agent Governance**: Zero-trust architecture with RBAC and capability management
- **Sandbox Execution**: Isolated agent execution with resource constraints
- **Budget Controls**: Multi-level budget caps (per-request, daily, monthly)
- **Comprehensive Auditing**: Forensic-level logging and decision tracking

## How It Works

### 1. **Connect Your AI Providers**
Integrate with your existing AI providers using our secure API keys or proxy gateway.

### 2. **AI Analyzes Your Usage**
Our AI engine continuously analyzes your usage patterns to identify optimization opportunities.

### 3. **Receive Personalized Recommendations**
Get AI-powered suggestions tailored to your specific use cases and patterns.

### 4. **Implement Optimizations**
Apply recommended optimizations with one click or let our automation handle it.

### 5. **Monitor Savings**
Track your cost reductions and performance improvements in real-time.

## Why Choose Cost Katana?

### 🎯 **AI-First Design**
Unlike traditional monitoring tools, Cost Katana uses AI to actively optimize your costs, not just track them. Our AI learns from your patterns and provides personalized recommendations.

### 💰 **Proven Savings**
Our customers typically save **30-70%** on their AI costs while maintaining or improving quality through intelligent optimization.

### 🚀 **Zero Friction Integration**
Start tracking in minutes with our primary \`cost-katana\` npm package, ChatGPT Custom GPT, browser extensions, or simple SDK integration. No complex setup required.

### 🔮 **Predictive Intelligence**
Don't just react to problems - prevent them. Our AI predicts usage spikes, limit overruns, and budget issues before they happen.

### 🏆 **Enterprise Ready**
SOC 2 Type II compliant, GDPR ready, with enterprise SSO, role-based access control, and dedicated support.

## Who Uses Cost Katana?

- **Startups** optimizing their AI spend to extend runway
- **Enterprises** managing AI costs across teams and projects
- **Developers** building AI-powered applications efficiently
- **Agencies** tracking client AI usage and billing
- **Researchers** maximizing their compute budgets

## Next Steps

Ready to start optimizing your AI costs? Here's how to proceed:

1. **[Quick Start Guide](/getting-started/quick-start)** - Get up and running in 5 minutes
2. **[Installation](/getting-started/installation)** - Install our primary \`cost-katana\` package (#1 priority) or explore alternative options
3. **[API Documentation](/api)** - Complete API reference
4. **[Integrations](/integrations)** - Connect with your tools

---

*Join thousands of developers who are already saving on their AI costs with Cost Katana.*`;

    return (
        <>
            <Helmet>
                <title>Introduction to Cost Katana - Documentation</title>
                <meta name="description" content="Learn what Cost Katana is and how it can help optimize your AI costs" />
            </Helmet>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <div className="card p-8 mb-8">
                    <MarkdownContent content={content} />
                </div>

                <div className="flex justify-end">
                    <Link
                        to="/getting-started/quick-start"
                        className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:underline"
                    >
                        <span>Next: Quick Start</span>
                        <ChevronRight size={20} />
                    </Link>
                </div>
            </motion.div>
        </>
    );
};

export default IntroductionPage;
