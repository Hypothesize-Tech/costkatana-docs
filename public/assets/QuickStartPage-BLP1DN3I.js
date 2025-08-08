import{j as t,m as a,v as i,C as o}from"./ui-b2qe7R3g.js";import{L as e}from"./router-CyJGHZz4.js";import{H as s,M as r}from"./index-CQL73LYV.js";import"./vendor-DavUf6mE.js";const m=()=>t.jsxs(t.Fragment,{children:[t.jsxs(s,{children:[t.jsx("title",{children:"Quick Start Guide - Cost Katana Documentation"}),t.jsx("meta",{name:"description",content:"Get up and running with Cost Katana in 5 minutes"})]}),t.jsxs(a.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"max-w-4xl mx-auto",children:[t.jsx("div",{className:"card p-8 mb-8",children:t.jsx(r,{content:`# Quick Start

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

### Option 1: ChatGPT Custom GPT (Easiest)
Perfect for ChatGPT Plus users - get instant AI-powered optimization tips:

1. **Visit our Custom GPT**: [chatgpt.com/g/g-68804444e5e48191a5a7ae35a268e1dc-cost-katana-ai-cost-intelligence?model=gpt-4o](https://chatgpt.com/g/g-68804444e5e48191a5a7ae35a268e1dc-cost-katana-ai-cost-intelligence?model=gpt-4o)
2. **Click "Start Chat"**
3. **Enter your API key** when prompted
4. **Start chatting** - usage is automatically tracked with AI insights!

### Option 2: Node.js SDK
For JavaScript/TypeScript developers:

\`\`\`bash
npm install ai-cost-tracker
\`\`\`

\`\`\`javascript
import { CostKatana } from 'ai-cost-tracker';

const ck = new CostKatana({
  apiKey: 'ck_your_api_key_here'
});

// Track OpenAI usage
const response = await ck.track({
  provider: 'openai',
  model: 'gpt-4',
  usage: {
    prompt_tokens: 100,
    completion_tokens: 50
  }
});

// Get AI optimization tips
const tips = await ck.getOptimizationTips();
console.log(tips.recommendations);
\`\`\`

### Option 3: Python SDK
For Python developers:

\`\`\`bash
pip install cost-katana
\`\`\`

\`\`\`python
from cost_katana import CostKatana

ck = CostKatana(api_key="ck_your_api_key_here")

# Track Anthropic usage
response = ck.track(
    provider="anthropic",
    model="claude-3-sonnet",
    usage={
        "input_tokens": 150,
        "output_tokens": 75
    }
)

# Get predictive analytics
forecast = ck.get_cost_forecast()
print(f"Predicted monthly cost: {forecast.predicted_cost{'}'}")
\`\`\`

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

- 📧 **Email**: abdul@hypothesize.tech
- 💬 **Chat**: Available in dashboard (bottom right)
- 📚 **Docs**: You're here!
- 🐛 **Issues**: [GitHub Issues](https://github.com/Hypothesize-Tech/cost-katana/issues)

---

**Congratulations!** 🎉 You're now tracking and optimizing your AI costs with intelligent insights. The AI will learn from your usage patterns and provide increasingly personalized recommendations over time.`})}),t.jsxs("div",{className:"flex justify-between",children:[t.jsxs(e,{to:"/getting-started/introduction",className:"flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:underline",children:[t.jsx(i,{size:20}),t.jsx("span",{children:"Previous: Introduction"})]}),t.jsxs(e,{to:"/getting-started/installation",className:"flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:underline",children:[t.jsx("span",{children:"Next: Installation"}),t.jsx(o,{size:20})]})]})]})]});export{m as default};
