import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import MarkdownContent from '../../components/MarkdownContent';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const QuickStartPage: React.FC = () => {
    const content = `# Quick Start

Welcome to Cost Katana! Get your AI cost optimization platform up and running in just **5 minutes**. This guide will walk you through the essential steps to start tracking and optimizing your AI costs.

## Overview

By the end of this guide, you'll have:
- ✅ A Cost Katana account with AI-powered insights
- ✅ Your first AI provider connected
- ✅ Real-time usage tracking active
- ✅ Personalized optimization recommendations
- ✅ Predictive cost alerts configured

---

## Step 1: Create Your Account

### Option A: Traditional Signup (Recommended)
The most robust and secure way to get started:

1. **Go to the signup page**: [costkatana.com/register](https://costkatana.com/register)
2. Fill in your details:
   \`\`\`
   Email: your-email@example.com
   Name: Your Name
   Use Case: [Coding/Content Creation/Business/Research]
   \`\`\`
3. Verify your email and log in

### Option B: Magic Link Signup (Optional)
A fast, passwordless way to get started:

1. **Visit the magic link page**: [costkatana.com/signup](https://costkatana.com/signup)
2. **Enter your email**: We'll send you a magic link
3. **Click the link**: Instant account creation with AI profile setup
4. **Complete your profile**: Tell us about your AI usage for personalized recommendations

---

## Step 2: Generate Your API Key

Once logged in, you'll need an API key to start tracking usage:

### In the Dashboard:
1. **Navigate to Settings** → Click your profile in the top right
2. **Go to API Keys tab** → Find "API Keys" in the sidebar
3. **Generate new key** → Click "Generate New Key"
4. **Configure permissions**:
   - ✅ **Write permissions** (for tracking usage)
   - ✅ **Read permissions** (for analytics)
5. **Copy your key** → It starts with \`ck_\` for regular keys

> **🔒 Security Note**: Store your API key securely. Never commit it to version control or share it publicly.

---

## Step 3: Choose Your Integration Method

### Option 1: Node.js SDK (Core Package)
For JavaScript/TypeScript developers - the most powerful way to integrate:

\`\`\`bash
npm install cost-katana
\`\`\`

\`\`\`javascript
import { ai, OPENAI, ANTHROPIC, GOOGLE } from 'cost-katana';

// Simple AI call with automatic cost tracking
const response = await ai(OPENAI.GPT_4O, 'Explain quantum computing');
console.log(response.text);
console.log(\`Cost: $\${response.cost}\`);

// Compare multiple models
const models = [OPENAI.GPT_4O, ANTHROPIC.CLAUDE_3_5_SONNET_20241022, GOOGLE.GEMINI_2_5_PRO];
for (const model of models) {
  const result = await ai(model, 'Write a haiku about AI');
  console.log(\`\${model}: $\${result.cost}\`);
}
\`\`\`

**Type-Safe Model Constants (Recommended):**

\`\`\`javascript
// Import model constants for autocomplete and type safety
import { ai, chat, OPENAI, ANTHROPIC, GOOGLE } from 'cost-katana';

// No more typos - your IDE will autocomplete!
const response = await ai(OPENAI.GPT_5, 'Hello, world!');

// Start a chat session
const chatSession = chat(ANTHROPIC.CLAUDE_SONNET_4_5, 'You are a helpful assistant');
await chatSession.send('What is machine learning?');
\`\`\`

### Option 2: Python SDK
For Python developers - with type-safe model constants:

\`\`\`bash
pip install cost-katana
\`\`\`

\`\`\`python
from cost_katana import ai, anthropic, google, openai

# Simple AI call with automatic cost tracking
response = ai(openai.gpt_4o, "Explain quantum computing")
print(response.text)
print(f"Cost: ${response.cost}")

# Compare multiple models
models = [openai.gpt_4o, anthropic.claude_3_5_sonnet_20241022, google.gemini_2_5_pro]
for model in models:
    result = ai(model, "Write a haiku about AI")
    print(f"{model}: ${result.cost}")
\`\`\`

**Type-Safe Model Constants (Recommended):**

\`\`\`python
from cost_katana import ai, chat, openai, anthropic, google

# No more typos - type-safe model selection!
response = ai(google.gemini_2_5_pro, "Hello, world!")

# Start a chat session
chat_session = chat(anthropic.claude_sonnet_4_5, "You are a helpful assistant")
chat_session.send("What is machine learning?")
\`\`\`

### Option 3: CLI Tool
For terminal enthusiasts - the fastest way to get started:

\`\`\`bash
npm install -g cost-katana-cli
\`\`\`

\`\`\`bash
# Ask a quick question
cost-katana ask "What is the meaning of life?"

# Start an interactive chat session
cost-katana chat

# Compare costs across models
cost-katana compare "Explain AI" -m gpt-4o,claude-3-5-sonnet,gemini-2-5-pro

# View all supported models
cost-katana models

# Check your usage and costs
cost-katana usage
\`\`\`

### Option 4: ChatGPT Custom GPT
Perfect for ChatGPT Plus users - get instant AI-powered optimization tips:

1. **Visit our Custom GPT**: [chatgpt.com/g/g-68804444e5e48191a5a7ae35a268e1dc-cost-katana-ai-cost-intelligence](https://chatgpt.com/g/g-68804444e5e48191a5a7ae35a268e1dc-cost-katana-ai-cost-intelligence?model=gpt-4o)
2. **Click "Start Chat"**
3. **Enter your API key** when prompted
4. **Start chatting** - usage is automatically tracked with AI insights!

---

## Step 4: View Your Dashboard

After tracking your first API call:

1. **Go to your dashboard**: [costkatana.com/dashboard](https://costkatana.com/dashboard)
2. **See real-time metrics**:
   - Current usage and costs
   - AI-powered insights
   - Optimization opportunities
   - Predictive forecasts

### Dashboard Features:
- **📊 Real-time Analytics**: Live usage graphs with AI insights
- **🤖 AI Recommendations**: Personalized optimization tips
- **📈 Predictive Forecasting**: ML-powered cost predictions
- **⚡ Quick Actions**: One-click optimizations

---

## Step 5: Configure AI-Powered Alerts

Set up intelligent alerts to prevent overages:

1. **Navigate to Alerts** in your dashboard
2. **Enable Smart Alerts**:
   - ⚠️ **50% threshold**: Early AI-powered warning
   - 🚨 **80% threshold**: Urgent optimization recommendations
   - 🔴 **90% threshold**: Critical alert with auto-suggestions
3. **Configure AI predictions**:
   - Enable "Predictive Alerts" for ML-based warnings
   - Set "Anomaly Detection" for unusual usage patterns

---

## What's Next?

### Explore Advanced Features:
- **[Prompt Templates](/features/templates)** - Reusable optimized prompts
- **[Project Management](/features/projects)** - Organize usage by projects
- **[API Gateway](/features/gateway)** - Unified proxy with caching
- **[Key Vault](/features/key-vault)** - Secure API key management

### Learn More:
- **[API Documentation](/api)** - Complete API reference
- **[Best Practices](/guides/best-practices)** - Optimization strategies
- **[Integrations](/integrations)** - Connect with more tools

---

## Need Help?

- 📧 **Email**: support@costkatana.com
- 💬 **Chat**: Available in dashboard (bottom right)
- 📚 **Docs**: You're here!
- 🐛 **Issues**: [GitHub Issues](https://github.com/Hypothesize-Tech/cost-katana/issues)

---

**Congratulations!** 🎉 You're now tracking and optimizing your AI costs with intelligent insights. The AI will learn from your usage patterns and provide increasingly personalized recommendations over time.`;

    return (
        <>
            <Helmet>
                <title>Quick Start Guide - Cost Katana Documentation</title>
                <meta name="description" content="Get up and running with Cost Katana in 5 minutes" />
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

                <div className="flex justify-between">
                    <Link
                        to="/getting-started/introduction"
                        className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:underline"
                    >
                        <ChevronLeft size={20} />
                        <span>Previous: Introduction</span>
                    </Link>

                    <Link
                        to="/getting-started/installation"
                        className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:underline"
                    >
                        <span>Next: Installation</span>
                        <ChevronRight size={20} />
                    </Link>
                </div>
            </motion.div>
        </>
    );
};

export default QuickStartPage;
