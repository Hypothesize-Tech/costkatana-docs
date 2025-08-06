# Quick Start

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

### Option A: Magic Link Signup (Recommended)
The fastest way to get started with zero friction:

1. **Visit the signup page**: [costkatana.com/signup](https://costkatana.com/signup)
2. **Enter your email**: We'll send you a magic link
3. **Click the link**: Instant account creation with AI profile setup
4. **Complete your profile**: Tell us about your AI usage for personalized recommendations

### Option B: Traditional Signup
1. Go to [costkatana.com/register](https://costkatana.com/register)
2. Fill in your details:
   ```
   Email: your-email@example.com
   Name: Your Name
   Use Case: [Coding/Content Creation/Business/Research]
   ```
3. Verify your email and log in

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
5. **Copy your key** → It starts with `ck_` for regular keys

![API Key Generation](../assets/api-key-generation.png)

> **🔒 Security Note**: Keys with write permissions start with `ck_user_`, read-only keys start with `ck_read_`. Keep your keys secure!

---

## Step 3: Choose Your Integration Method

Select the integration that best fits your workflow:

### For ChatGPT Users (Most Popular)
Perfect if you primarily use ChatGPT and want instant optimization tips:

**[Install our ChatGPT Custom GPT →](../integrations/chatgpt/setup.md)**

### For Developers
If you're building applications or using AI APIs directly:

**[Node.js SDK →](../integrations/frameworks/nodejs.md)** | **[Python SDK →](../integrations/frameworks/python.md)** | **[REST API →](../api/usage.md)**

### For VSCode/Cursor Users
Track your coding AI usage automatically:

**[VSCode Extension →](../integrations/tools/vscode.md)** | **[Cursor Extension →](../integrations/tools/cursor.md)**

---

## Step 4: Connect Your First Provider

Let's connect OpenAI as an example (works similarly for other providers):

### Using the Dashboard:
1. **Go to Integrations** → Navigate to "Integrations" in the sidebar
2. **Select OpenAI** → Click on the OpenAI card
3. **Add your API key** → Enter your OpenAI API key securely
4. **Test connection** → We'll verify it works
5. **Enable tracking** → Start automatic usage monitoring

### Using Code (Node.js Example):
```typescript
import AICostTracker, { AIProvider } from 'ai-cost-tracker';

// Initialize Cost Katana
const tracker = await AICostTracker.create({
  providers: [
    {
      provider: AIProvider.OpenAI,
      apiKey: process.env.OPENAI_API_KEY
    }
  ],
  apiKey: 'ck_user_your_api_key_here',
  projectId: 'your_project_id'
});

// Track OpenAI usage automatically
const result = await tracker.chat({
  provider: AIProvider.OpenAI,
  model: "gpt-4",
  messages: [{ role: "user", content: "Hello, world!" }]
});

console.log('Response:', result.response);
console.log('Cost tracking:', result.usage);
```

### Using ChatGPT Custom GPT:
1. **Install our Custom GPT** → [Get it here](https://chatgpt.com/g/cost-katana)
2. **Connect your account** → Use the magic link we provide
3. **Start chatting** → Every conversation is automatically tracked with AI insights!

---

## Step 5: Send Your First Tracked Request 🎉

Now let's generate some data to see Cost Katana in action:

### Via ChatGPT Custom GPT:
1. Open our [Cost Katana Custom GPT](https://chatgpt.com/g/cost-katana)
2. Ask any question: "Help me optimize this React component"
3. Get your answer **plus** personalized cost optimization tips!

### Via Code:
```bash
# Install our CLI for quick testing
npm install -g cost-katana-cli

# Track a test request
cost-katana track --provider openai --model gpt-3.5-turbo \
  --prompt "What is the capital of France?" \
  --api-key ck_user_your_key_here
```

### Via API:
```bash
curl -X POST "https://cost-katana-backend.store/api/usage/track" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "openai",
    "model": "gpt-3.5-turbo",
    "prompt": "What is the capital of France?",
    "response": "The capital of France is Paris.",
    "promptTokens": 8,
    "completionTokens": 7,
    "totalTokens": 15,
    "cost": 0.0000225
  }'
```

---

## Step 6: Explore Your Dashboard

Once you've sent your first request, head to your dashboard to see:

### Real-time Overview
- 📊 **Usage metrics** with live updates
- 💰 **Cost breakdown** by provider and model
- 🎯 **Efficiency scores** calculated by AI
- 📈 **Trend analysis** with predictions

### AI-Powered Insights
- 🤖 **Personalized tips** based on your usage patterns
- 🔮 **Predictive alerts** before you hit limits
- 💡 **Optimization suggestions** with estimated savings
- 📋 **Smart recommendations** for model selection

![Dashboard Overview](../assets/dashboard-first-use.png)

---

## What's Next?

Congratulations! You now have Cost Katana tracking your AI usage with intelligent insights. Here's what to explore next:

### Immediate Next Steps
1. **[Set up alerts](../features/alerts.md)** → Get notified before hitting limits
2. **[Create your first project](../features/projects.md)** → Organize usage by project
3. **[Explore optimization tips](../features/optimization.md)** → Start saving money immediately

### Popular Features to Try
- **[Prompt Templates](../features/templates.md)** → Use pre-optimized prompts
- **[Workflow Tracking](../features/workflows.md)** → Monitor multi-step AI operations
- **[Predictive Intelligence](../features/predictive-intelligence.md)** → AI-powered cost forecasting

### Advanced Integration
- **[API Gateway](../features/gateway.md)** → Route all AI calls through our optimizing proxy
- **[Webhooks](../api/webhooks.md)** → Get real-time notifications in your apps
- **[Team Management](../enterprise/teams.md)** → Collaborate with your team

### Optimization Strategies
- **[Best Practices Guide](../guides/best-practices.md)** → Learn proven cost reduction techniques
- **[Model Comparison](../features/analytics.md#model-comparison)** → Find the best model for each use case
- **[Prompt Engineering](../guides/prompt-optimization.md)** → Write more efficient prompts

---

## Troubleshooting

### Common Issues

**❌ "API Key Invalid" Error**
- Check that you copied the full key (starts with `ck_user_`)
- Ensure the key has write permissions enabled
- Try regenerating a new key

**❌ "Provider Connection Failed"**
- Verify your provider API key is correct
- Check that the provider service is operational
- Ensure your provider account has sufficient credits

**❌ "No Data Showing in Dashboard"**
- Wait 1-2 minutes for data to process
- Check that you're tracking requests correctly
- Verify your API key permissions

### Need Help?

- 📖 **Check our [Troubleshooting Guide](../guides/troubleshooting.md)**
- 💬 **Join our [Discord Community](https://discord.gg/costkatana)**
- 📧 **Email us**: support@costkatana.com
- 🐛 **Report bugs**: [GitHub Issues](https://github.com/cost-katana/issues)

---

## Success! 🎉

You're now part of the Cost Katana community! You'll start seeing:

- **Immediate value**: Real-time cost tracking and insights
- **AI recommendations**: Personalized tips within 24 hours
- **Predictive alerts**: Proactive notifications about usage patterns
- **Cost savings**: Average users save 20-30% on AI costs

**Ready to dive deeper?** Explore our [comprehensive feature guides](../features/README.md) or check out [advanced integrations](../integrations/README.md).

---

*Questions about this guide? Let us know at docs@costkatana.com*