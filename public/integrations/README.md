# Integrations

Cost Katana integrates seamlessly with your existing AI workflow, supporting all major providers, development tools, and frameworks.

## 🚀 Quick Integration

Get started in minutes with your preferred method:

| Integration Type | Best For | Setup Time | Features |
|------------------|----------|------------|----------|
| **[ChatGPT Custom GPT](./chatgpt/README.md)** | ChatGPT users | 2 minutes | Real-time tips, automatic tracking |
| **[Node.js SDK](./frameworks/nodejs.md)** | JavaScript developers | 5 minutes | Full API access, optimization |
| **[Python SDK](./frameworks/python.md)** | Python developers | 5 minutes | Complete integration, AI features |
| **[REST API](../api/README.md)** | Any language | 10 minutes | Universal compatibility |

---

## 🤖 AI Providers

Connect and optimize costs across all major AI providers:

### Fully Supported
- **[OpenAI](./providers/openai.md)** - GPT-4, GPT-3.5, DALL-E, Whisper
- **[Anthropic](./providers/anthropic.md)** - Claude 3.5, Claude 3, Claude Instant
- **[AWS Bedrock](./providers/aws-bedrock.md)** - Claude, Titan, Jurassic, Llama
- **[Google AI](./providers/google-ai.md)** - Gemini Pro, Gemini Flash, PaLM
- **[Cohere](./providers/cohere.md)** - Command, Embed, Rerank
- **[Azure OpenAI](./providers/azure-openai.md)** - Enterprise GPT models

### Coming Soon
- **Hugging Face** - Open source models
- **Replicate** - Custom model hosting
- **Together AI** - Open source inference
- **Perplexity** - Search-augmented AI

---

## 🛠️ Development Tools

Integrate Cost Katana into your development environment:

### Code Editors
- **[VSCode Extension](./tools/vscode.md)** - Track AI usage while coding
- **[Cursor Extension](./tools/cursor.md)** - Built-in cost optimization
- **[JetBrains Plugin](./tools/jetbrains.md)** - IntelliJ, PyCharm, WebStorm support
- **[Vim Plugin](./tools/vim.md)** - Command-line optimization

### Command Line Tools
- **[CLI Tool](./tools/cli.md)** - Automation and scripting
- **[Shell Integration](./tools/shell.md)** - Bash, Zsh, Fish support
- **[Git Hooks](./tools/git.md)** - Pre-commit cost analysis
- **[CI/CD Integration](./tools/cicd.md)** - GitHub Actions, Jenkins

### Browser Extensions
- **[Chrome Extension](./tools/chrome.md)** - Web-based AI tools
- **[Firefox Extension](./tools/firefox.md)** - Privacy-focused browsing
- **[Safari Extension](./tools/safari.md)** - macOS integration

---

## 🌐 Frameworks & Libraries

Native integrations for popular development frameworks:

### JavaScript/TypeScript
- **[React](./frameworks/react.md)** - Hooks and components
- **[Next.js](./frameworks/nextjs.md)** - Full-stack optimization
- **[Express.js](./frameworks/express.md)** - Backend API tracking
- **[Nuxt.js](./frameworks/nuxt.md)** - Vue.js framework

### Python
- **[FastAPI](./frameworks/fastapi.md)** - Modern Python APIs
- **[Django](./frameworks/django.md)** - Full-stack web framework
- **[Flask](./frameworks/flask.md)** - Lightweight web apps
- **[Jupyter](./frameworks/jupyter.md)** - Notebook integration

### Other Languages
- **[Go](./frameworks/go.md)** - High-performance applications
- **[Rust](./frameworks/rust.md)** - Systems programming
- **[Java](./frameworks/java.md)** - Enterprise applications
- **[C#/.NET](./frameworks/dotnet.md)** - Microsoft ecosystem

---

## 📱 Platform Integrations

Connect with platforms and services you already use:

### Communication
- **[Slack](./platforms/slack.md)** - Team notifications and bot
- **[Discord](./platforms/discord.md)** - Community and alerts
- **[Microsoft Teams](./platforms/teams.md)** - Enterprise collaboration
- **[Telegram](./platforms/telegram.md)** - Personal notifications

### Project Management
- **[Jira](./platforms/jira.md)** - Issue tracking integration
- **[Notion](./platforms/notion.md)** - Documentation and planning
- **[Trello](./platforms/trello.md)** - Kanban board integration
- **[Linear](./platforms/linear.md)** - Modern project management

### Analytics & Monitoring
- **[Datadog](./platforms/datadog.md)** - Infrastructure monitoring
- **[New Relic](./platforms/newrelic.md)** - Application performance
- **[Grafana](./platforms/grafana.md)** - Custom dashboards
- **[PostHog](./platforms/posthog.md)** - Product analytics

---

## 🔧 Custom Integrations

Build your own integrations with our flexible APIs:

### Webhook Integration
```javascript
// Receive real-time cost updates
app.post('/webhooks/cost-katana', (req, res) => {
  const { event, data } = req.body;
  
  if (event === 'usage.tracked') {
    console.log(`New usage: $${data.cost} for ${data.model}`);
    // Your custom logic here
  }
  
  res.status(200).send('OK');
});
```

### Custom SDK
```python
# Build on top of our base SDK
from cost_katana import CostKatana

class MyCustomTracker(CostKatana):
    def track_with_metadata(self, usage, custom_data):
        # Add your custom metadata
        usage['metadata'].update(custom_data)
        return self.usage.track(usage)
```

### GraphQL Integration
```graphql
# Query usage data with GraphQL
query GetUsageAnalytics($timeframe: Timeframe!) {
  usage(timeframe: $timeframe) {
    totalCost
    requestCount
    providers {
      name
      cost
      efficiency
    }
  }
}
```

---

## 🎯 Integration Patterns

Common patterns for different use cases:

### Real-time Tracking
```typescript
// Track every AI request automatically
import { CostKatana } from 'cost-katana-sdk';

const tracker = new CostKatana({ apiKey: process.env.API_KEY });

// Wrap your AI calls
const trackedOpenAI = tracker.wrap(openai);
const response = await trackedOpenAI.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Hello!" }]
});
// Automatically tracked with optimization suggestions
```

### Batch Processing
```python
# Process multiple requests efficiently
from cost_katana import CostKatana

client = CostKatana(api_key=os.getenv('API_KEY'))

# Batch track multiple requests
usage_batch = [
    {"provider": "openai", "model": "gpt-4", "cost": 0.01},
    {"provider": "anthropic", "model": "claude-3", "cost": 0.008},
    {"provider": "openai", "model": "gpt-3.5", "cost": 0.002}
]

result = client.usage.track_batch(usage_batch)
print(f"Tracked {len(result.tracked)} requests")
```

### Async Monitoring
```go
// Non-blocking usage tracking
package main

import (
    "github.com/cost-katana/go-sdk"
    "context"
)

func main() {
    client := costkatana.New(os.Getenv("API_KEY"))
    
    // Async tracking doesn't block your application
    go func() {
        client.Usage.TrackAsync(context.Background(), &costkatana.Usage{
            Provider: "openai",
            Model:    "gpt-4",
            Cost:     0.01,
        })
    }()
    
    // Your main application logic continues
}
```

---

## 🔐 Security & Authentication

All integrations support secure authentication:

### API Key Management
- **Scoped permissions** - Limit access to specific features
- **Automatic rotation** - Enhanced security
- **Environment-specific keys** - Separate dev/prod keys
- **Team key sharing** - Controlled access for teams

### Secure Communication
- **TLS 1.3 encryption** - All data in transit
- **Certificate pinning** - Additional security layer
- **Webhook signatures** - Verify authentic requests
- **IP allowlisting** - Restrict access by IP

---

## 📊 Integration Analytics

Monitor your integration health:

### Integration Metrics
- **Request success rate** - Track API reliability
- **Response times** - Monitor performance
- **Error rates** - Identify issues quickly
- **Usage patterns** - Optimize integration efficiency

### Health Checks
```bash
# Check integration status
curl -H "X-API-Key: your_key" \
  https://https://cost-katana-backend.store/api/health/integration
```

---

## 🚀 Getting Started

### 1. Choose Your Integration
Select the integration that best fits your workflow:
- **New to AI cost tracking?** Start with [ChatGPT Custom GPT](./chatgpt/README.md)
- **Building applications?** Use our [SDKs](./frameworks/README.md)
- **Need flexibility?** Try our [REST API](../api/README.md)

### 2. Follow the Setup Guide
Each integration has a detailed setup guide with:
- **Prerequisites** - What you need before starting
- **Step-by-step instructions** - Clear, tested procedures
- **Code examples** - Copy-paste ready snippets
- **Troubleshooting** - Common issues and solutions

### 3. Test Your Integration
Verify everything works correctly:
- **Send test requests** - Confirm tracking works
- **Check the dashboard** - See your data appear
- **Review recommendations** - Get AI optimization tips
- **Set up alerts** - Configure monitoring

---

## 💡 Best Practices

### Performance
- **Use async tracking** for high-throughput applications
- **Batch requests** when possible to reduce API calls
- **Cache optimization suggestions** to avoid redundant analysis
- **Monitor integration health** with built-in metrics

### Reliability
- **Implement retry logic** with exponential backoff
- **Handle rate limits** gracefully
- **Use circuit breakers** for fault tolerance
- **Monitor error rates** and set up alerts

### Security
- **Rotate API keys** regularly
- **Use environment variables** for sensitive data
- **Validate webhook signatures** to ensure authenticity
- **Monitor for unusual usage** patterns

---

## 🆘 Support

### Documentation
- **[Integration Guides](../guides/integration.md)** - Detailed setup instructions
- **[Troubleshooting](../guides/troubleshooting.md)** - Common issues and solutions
- **[Code Examples](https://github.com/cost-katana/examples)** - Sample implementations

### Community
- **[Discord](https://discord.gg/Wcwzw8wM)** - Real-time help from the community
- **[GitHub Discussions](https://github.com/cost-katana/integrations/discussions)** - Technical discussions
- **[Stack Overflow](https://stackoverflow.com/questions/tagged/cost-katana)** - Q&A platform

### Direct Support
- **📧 Integration Support**: integrations@costkatana.com
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/cost-katana/integrations/issues)
- **💡 Feature Requests**: [Feature Board](https://features.costkatana.com)

---

*Ready to integrate? Choose your preferred method above or check out our [Quick Start Guide](../getting-started/quick-start.md).*