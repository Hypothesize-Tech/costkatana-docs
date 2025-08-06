# Node.js SDK Integration

Integrate Cost Katana into your Node.js applications with our comprehensive SDK. Track AI usage, get optimization recommendations, and manage costs across all major AI providers.

![Node.js Integration](../../assets/nodejs-integration.png)

## Overview

The **ai-cost-tracker** npm package provides a complete Node.js/TypeScript SDK for Cost Katana with:
- **🤖 Multi-provider support** - OpenAI, Anthropic, AWS Bedrock, Google AI, Cohere, and more
- **⚡ Automatic tracking** - Seamless integration with existing AI code
- **🔮 AI optimization** - Built-in prompt optimization and model recommendations
- **🚀 Gateway features** - Caching, retries, and failover support
- **📊 Real-time analytics** - Dashboard integration and reporting

---

## Installation

### Prerequisites
- **Node.js 18+** and npm/yarn
- **Cost Katana account** - Sign up at [costkatana.com](https://costkatana.com)
- **API Key** - Generate from your dashboard

### Install the Package
```bash
# Using npm
npm install ai-cost-tracker

# Using yarn
yarn add ai-cost-tracker

# Using pnpm
pnpm add ai-cost-tracker
```

### Environment Setup
```bash
# .env file
API_KEY=ck_user_your_api_key_here
PROJECT_ID=your_project_id

# Your AI provider API keys
OPENAI_API_KEY=sk-your_openai_key
ANTHROPIC_API_KEY=sk-ant-your_anthropic_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

---

## Quick Start

### Basic Setup
```typescript
import AICostTracker, { AIProvider } from 'ai-cost-tracker';

// Initialize with providers
const tracker = await AICostTracker.create({
  providers: [
    {
      provider: AIProvider.OpenAI,
      apiKey: process.env.OPENAI_API_KEY
    },
    {
      provider: AIProvider.Anthropic,
      apiKey: process.env.ANTHROPIC_API_KEY
    }
  ],
  // Cost Katana configuration
  apiKey: process.env.API_KEY,
  projectId: process.env.PROJECT_ID
});

// Make AI requests with automatic tracking
const result = await tracker.chat({
  provider: AIProvider.OpenAI,
  model: "gpt-4",
  messages: [
    { role: "user", content: "Explain machine learning in simple terms" }
  ]
});

console.log('AI Response:', result.response);
console.log('Usage Stats:', result.usage);
console.log('Cost:', result.cost);
```

### Express.js Integration
```typescript
import express from 'express';
import AICostTracker, { AIProvider } from 'ai-cost-tracker';

const app = express();
app.use(express.json());

// Initialize tracker once
const tracker = await AICostTracker.create({
  providers: [
    {
      provider: AIProvider.OpenAI,
      apiKey: process.env.OPENAI_API_KEY
    }
  ],
  apiKey: process.env.API_KEY,
  projectId: process.env.PROJECT_ID
});

// API endpoint with AI tracking
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId } = req.body;
    
    const result = await tracker.chat({
      provider: AIProvider.OpenAI,
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      // Add user context for better analytics
      metadata: {
        userId,
        endpoint: '/api/chat',
        timestamp: new Date().toISOString()
      }
    });
    
    res.json({
      response: result.response,
      usage: result.usage,
      cost: result.cost
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

## Advanced Features

### Multi-Provider Configuration
```typescript
const tracker = await AICostTracker.create({
  providers: [
    {
      provider: AIProvider.OpenAI,
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: 'https://api.openai.com/v1' // optional
    },
    {
      provider: AIProvider.Anthropic,
      apiKey: process.env.ANTHROPIC_API_KEY,
      baseURL: 'https://api.anthropic.com' // optional
    },
    {
      provider: AIProvider.AWSBedrock,
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    {
      provider: AIProvider.GoogleAI,
      apiKey: process.env.GOOGLE_AI_API_KEY
    }
  ],
  // Cost Katana settings
  apiKey: process.env.API_KEY,
  projectId: process.env.PROJECT_ID,
  baseURL: 'https://cost-katana-backend.store/api'
});
```

### Gateway Features
```typescript
const tracker = await AICostTracker.create({
  providers: [...],
  apiKey: process.env.API_KEY,
  
  // Gateway configuration
  gateway: {
    // Caching for cost reduction
    caching: {
      enabled: true,
      ttl: 3600, // 1 hour
      keyFields: ['model', 'messages'] // Cache key components
    },
    
    // Retry logic for reliability
    retries: {
      enabled: true,
      maxAttempts: 3,
      backoff: 'exponential'
    },
    
    // Failover between providers
    failover: {
      enabled: true,
      providers: [AIProvider.OpenAI, AIProvider.Anthropic],
      strategy: 'round-robin'
    }
  }
});
```

### Optimization Features
```typescript
const tracker = await AICostTracker.create({
  providers: [...],
  apiKey: process.env.API_KEY,
  
  // AI-powered optimization
  optimization: {
    // Automatic prompt optimization
    enablePromptOptimization: true,
    
    // Model recommendations
    enableModelSuggestions: true,
    
    // Quality threshold (0.0 - 1.0)
    qualityThreshold: 0.9,
    
    // Cost vs quality balance
    optimizationStrategy: 'balanced' // 'cost', 'quality', 'balanced'
  }
});
```

---

## API Methods

### Chat Completion
```typescript
// Basic chat
const result = await tracker.chat({
  provider: AIProvider.OpenAI,
  model: "gpt-4",
  messages: [
    { role: "system", content: "You are a helpful assistant" },
    { role: "user", content: "What is TypeScript?" }
  ],
  temperature: 0.7,
  maxTokens: 500
});

// With streaming
const stream = await tracker.chatStream({
  provider: AIProvider.OpenAI,
  model: "gpt-4",
  messages: [{ role: "user", content: "Write a story" }],
  stream: true
});

for await (const chunk of stream) {
  process.stdout.write(chunk.content);
}
```

### Text Completion
```typescript
const result = await tracker.complete({
  provider: AIProvider.OpenAI,
  model: "gpt-3.5-turbo-instruct",
  prompt: "The future of AI is",
  maxTokens: 100,
  temperature: 0.8
});
```

### Embeddings
```typescript
const result = await tracker.embed({
  provider: AIProvider.OpenAI,
  model: "text-embedding-ada-002",
  input: "Text to embed"
});

console.log('Embedding:', result.embedding);
console.log('Usage:', result.usage);
```

### Image Generation
```typescript
const result = await tracker.generateImage({
  provider: AIProvider.OpenAI,
  model: "dall-e-3",
  prompt: "A futuristic city skyline",
  size: "1024x1024",
  quality: "standard"
});

console.log('Image URL:', result.url);
console.log('Cost:', result.cost);
```

---

## Usage Analytics

### Get Usage Statistics
```typescript
// Get current usage stats
const stats = await tracker.getUsageStats({
  timeframe: 'month', // 'day', 'week', 'month', 'year'
  projectId: 'optional-project-id'
});

console.log('Total Requests:', stats.totalRequests);
console.log('Total Cost:', stats.totalCost);
console.log('Average Cost per Request:', stats.avgCostPerRequest);
console.log('Top Models:', stats.topModels);
```

### Get Optimization Recommendations
```typescript
const recommendations = await tracker.getRecommendations({
  limit: 10,
  priority: 'high' // 'low', 'medium', 'high'
});

recommendations.forEach(rec => {
  console.log(`💡 ${rec.title}`);
  console.log(`   Potential Savings: ${rec.potentialSavings.percentage}%`);
  console.log(`   Action: ${rec.suggestedAction}`);
});
```

### Track Custom Events
```typescript
// Track custom usage events
await tracker.trackUsage({
  provider: 'custom-provider',
  model: 'custom-model',
  promptTokens: 100,
  completionTokens: 150,
  cost: 0.005,
  metadata: {
    feature: 'document-processing',
    userId: 'user_123',
    sessionId: 'session_456'
  }
});
```

---

## Error Handling

### Comprehensive Error Handling
```typescript
import { CostKatanaError, ProviderError, RateLimitError } from 'ai-cost-tracker';

try {
  const result = await tracker.chat({
    provider: AIProvider.OpenAI,
    model: "gpt-4",
    messages: [{ role: "user", content: "Hello" }]
  });
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(`Rate limited. Retry after: ${error.retryAfter} seconds`);
    // Implement retry logic
  } else if (error instanceof ProviderError) {
    console.log(`Provider error: ${error.provider} - ${error.message}`);
    // Try different provider
  } else if (error instanceof CostKatanaError) {
    console.log(`Cost Katana API error: ${error.message}`);
    // Handle tracking failure
  } else {
    console.log(`Unexpected error: ${error.message}`);
  }
}
```

### Retry with Exponential Backoff
```typescript
async function chatWithRetry(messages: any[], maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await tracker.chat({
        provider: AIProvider.OpenAI,
        model: "gpt-4",
        messages
      });
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

---

## Best Practices

### Performance Optimization
```typescript
// 1. Reuse tracker instance
const tracker = await AICostTracker.create({...});

// 2. Use connection pooling for high throughput
const tracker = await AICostTracker.create({
  providers: [...],
  httpAgent: {
    keepAlive: true,
    maxSockets: 10
  }
});

// 3. Batch similar requests
const requests = [
  { messages: [{ role: "user", content: "Question 1" }] },
  { messages: [{ role: "user", content: "Question 2" }] },
  { messages: [{ role: "user", content: "Question 3" }] }
];

const results = await Promise.all(
  requests.map(req => tracker.chat({
    provider: AIProvider.OpenAI,
    model: "gpt-3.5-turbo",
    ...req
  }))
);
```

### Cost Optimization
```typescript
// 1. Use appropriate models for tasks
const simpleTask = await tracker.chat({
  provider: AIProvider.OpenAI,
  model: "gpt-3.5-turbo", // Cheaper for simple tasks
  messages: [{ role: "user", content: "Translate: Hello" }]
});

const complexTask = await tracker.chat({
  provider: AIProvider.OpenAI,
  model: "gpt-4", // Better for complex reasoning
  messages: [{ role: "user", content: "Analyze this complex data..." }]
});

// 2. Enable caching for repeated queries
const tracker = await AICostTracker.create({
  providers: [...],
  gateway: {
    caching: {
      enabled: true,
      ttl: 3600 // Cache for 1 hour
    }
  }
});

// 3. Set token limits
const result = await tracker.chat({
  provider: AIProvider.OpenAI,
  model: "gpt-4",
  messages: [...],
  maxTokens: 200 // Limit response length
});
```

### Monitoring & Alerting
```typescript
// Set up usage monitoring
const tracker = await AICostTracker.create({
  providers: [...],
  monitoring: {
    // Alert when approaching budget
    budgetAlerts: {
      enabled: true,
      monthlyBudget: 100, // $100/month
      alertThresholds: [0.5, 0.8, 0.9] // 50%, 80%, 90%
    },
    
    // Track performance metrics
    metricsTracking: {
      enabled: true,
      trackLatency: true,
      trackTokenUsage: true,
      trackCosts: true
    }
  }
});

// Custom monitoring
tracker.on('usage.tracked', (data) => {
  console.log(`Request cost: $${data.cost}`);
  
  // Send to your monitoring system
  if (data.cost > 1.0) {
    console.warn(`High cost request: $${data.cost}`);
  }
});

tracker.on('budget.warning', (data) => {
  console.warn(`Budget alert: ${data.percentage}% used`);
  // Send notification to team
});
```

---

## TypeScript Support

### Type Definitions
```typescript
import AICostTracker, { 
  AIProvider, 
  ChatMessage, 
  ChatResponse,
  UsageStats,
  OptimizationRecommendation 
} from 'ai-cost-tracker';

// Strongly typed chat messages
const messages: ChatMessage[] = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "Hello" }
];

// Type-safe responses
const response: ChatResponse = await tracker.chat({
  provider: AIProvider.OpenAI,
  model: "gpt-4",
  messages
});

// Usage statistics with proper typing
const stats: UsageStats = await tracker.getUsageStats({
  timeframe: 'month'
});
```

### Custom Types
```typescript
// Extend types for your use case
interface CustomChatOptions {
  provider: AIProvider;
  model: string;
  messages: ChatMessage[];
  userId?: string;
  sessionId?: string;
  feature?: string;
}

async function customChat(options: CustomChatOptions): Promise<ChatResponse> {
  return await tracker.chat({
    ...options,
    metadata: {
      userId: options.userId,
      sessionId: options.sessionId,
      feature: options.feature,
      timestamp: new Date().toISOString()
    }
  });
}
```

---

## Testing

### Unit Testing with Jest
```typescript
import AICostTracker, { AIProvider } from 'ai-cost-tracker';

// Mock the tracker for testing
jest.mock('ai-cost-tracker');
const mockTracker = AICostTracker as jest.Mocked<typeof AICostTracker>;

describe('AI Chat Service', () => {
  beforeEach(() => {
    mockTracker.create.mockResolvedValue({
      chat: jest.fn().mockResolvedValue({
        response: 'Mocked response',
        usage: { totalTokens: 100 },
        cost: 0.01
      })
    } as any);
  });

  it('should handle chat requests', async () => {
    const tracker = await AICostTracker.create({
      providers: [{ provider: AIProvider.OpenAI, apiKey: 'test' }],
      apiKey: 'test'
    });

    const result = await tracker.chat({
      provider: AIProvider.OpenAI,
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'test' }]
    });

    expect(result.response).toBe('Mocked response');
    expect(result.cost).toBe(0.01);
  });
});
```

### Integration Testing
```typescript
// Test with real API in development
describe('Integration Tests', () => {
  let tracker: AICostTracker;

  beforeAll(async () => {
    tracker = await AICostTracker.create({
      providers: [
        {
          provider: AIProvider.OpenAI,
          apiKey: process.env.OPENAI_API_KEY
        }
      ],
      apiKey: process.env.API_KEY,
      projectId: 'test-project'
    });
  });

  it('should track real usage', async () => {
    const result = await tracker.chat({
      provider: AIProvider.OpenAI,
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello' }]
    });

    expect(result.response).toBeDefined();
    expect(result.cost).toBeGreaterThan(0);
    expect(result.usage.totalTokens).toBeGreaterThan(0);
  });
});
```

---

## Deployment

### Production Configuration
```typescript
// production.ts
const tracker = await AICostTracker.create({
  providers: [
    {
      provider: AIProvider.OpenAI,
      apiKey: process.env.OPENAI_API_KEY
    }
  ],
  apiKey: process.env.API_KEY,
  projectId: process.env.PROJECT_ID,
  
  // Production settings
  timeout: 30000, // 30 second timeout
  retries: {
    enabled: true,
    maxAttempts: 3,
    backoff: 'exponential'
  },
  
  // Monitoring
  monitoring: {
    enabled: true,
    budgetAlerts: {
      enabled: true,
      monthlyBudget: parseFloat(process.env.MONTHLY_BUDGET || '1000')
    }
  },
  
  // Security
  validateSSL: true,
  userAgent: 'MyApp/1.0.0'
});
```

### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "dist/server.js"]
```

### Environment Variables
```bash
# .env.production
NODE_ENV=production
API_KEY=ck_user_production_key
PROJECT_ID=prod_project_id
MONTHLY_BUDGET=1000

# AI Provider Keys
OPENAI_API_KEY=sk-prod-key
ANTHROPIC_API_KEY=sk-ant-prod-key

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Monitoring
ENABLE_METRICS=true
METRICS_PORT=9090
```

---

## Troubleshooting

### Common Issues

#### "Module not found" Error
```bash
# Ensure package is installed
npm install ai-cost-tracker

# Clear node_modules if needed
rm -rf node_modules package-lock.json
npm install
```

#### "Invalid API Key" Error
```typescript
// Check API key format
console.log('API Key:', process.env.API_KEY);
// Should start with 'ck_user_'

// Test API key
const isValid = await tracker.validateApiKey();
console.log('API Key valid:', isValid);
```

#### Rate Limiting Issues
```typescript
// Implement proper rate limiting
const tracker = await AICostTracker.create({
  providers: [...],
  rateLimit: {
    requestsPerMinute: 60,
    requestsPerHour: 3600
  }
});
```

#### Memory Leaks
```typescript
// Properly close connections
process.on('SIGTERM', async () => {
  await tracker.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await tracker.close();
  process.exit(0);
});
```

---

## Support & Resources

### Documentation
- **[GitHub Repository](https://github.com/Hypothesize-Tech/ai-cost-optimizer-core)** - Source code and issues
- **[NPM Package](https://www.npmjs.com/package/ai-cost-tracker)** - Package details and versions
- **[API Reference](../../api/README.md)** - Complete API documentation
- **[Examples Repository](https://github.com/Hypothesize-Tech/ai-cost-optimizer-examples)** - Code examples

### Getting Help
- **📧 Email Support**: abdul@hypothesize.tech
- **🐛 Report Issues**: [GitHub Issues](https://github.com/Hypothesize-Tech/ai-cost-optimizer-core/issues)
- **💬 Community**: [Discord](https://discord.gg/costkatana)
- **📚 Guides**: [Integration Guides](../README.md)

### Contributing
We welcome contributions! See our [Contributing Guide](../../development/contributing.md) for details.

---

*Ready to optimize your AI costs? Install the package and start tracking in minutes!*

```bash
npm install ai-cost-tracker
```