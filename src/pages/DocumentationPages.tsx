import DocumentationPage from "../components/DocumentationPage";

// Getting Started Pages
export const InstallationPage = () => (
  <DocumentationPage
    title="Installation"
    description="Detailed installation instructions for Cost Katana"
    prevPage={{ path: '/getting-started/quick-start', label: 'Previous: Quick Start' }}
    fallbackContent={`# Installation Guide

Get started with Cost Katana and revolutionary **Cortex Meta-Language** in minutes. Achieve 70-95% token reduction with LISP-based optimization.

## 🚀 CLI Installation

### Global Installation (Recommended)

Install the Cost Katana CLI globally using npm:

\`\`\`bash
# Install globally via npm
npm install -g ai-cost-optimizer-cli

# Verify installation
cost-katana --version
\`\`\`

### Alternative Installation Methods

#### Using npx (No Global Install)
\`\`\`bash
# Run without installing globally
npx ai-cost-optimizer-cli init
\`\`\`

#### Using Yarn
\`\`\`bash
# Global installation with Yarn
yarn global add ai-cost-optimizer-cli

# Verify installation
cost-katana --version
\`\`\`

### Package Information

[![npm version](https://badge.fury.io/js/ai-cost-optimizer-cli.svg)](https://www.npmjs.com/package/ai-cost-optimizer-cli)

- **Package Name**: \`ai-cost-optimizer-cli\`
- **Latest Version**: 1.0.11
- **Weekly Downloads**: 638+
- **License**: MIT
- **Repository**: [GitHub](https://github.com/Hypothesize-Tech/costkatana-cli)

## 🛠️ Quick Setup

Once installed, initialize your configuration:

\`\`\`bash
# Initialize Cost Katana
cost-katana init
\`\`\`

This will guide you through:

### 🔐 Required Configuration
- **Project Name** - Identify your project for cost tracking
- **API Key** - Secure authentication to Cost Katana backend
- **Default Model** - Choose your preferred AI model (GPT-4, Claude, Gemini, etc.)
- **Monthly Token Budget** - Set your monthly token consumption limit

### ⚙️ Optional Settings
- **Base URL** - Backend API endpoint
- **Advanced Settings** - Temperature, max tokens, cost limits

## 📱 Platform Support

Cost Katana CLI works on all major platforms:

- ✅ **Windows** (Windows 10+)
- ✅ **macOS** (macOS 10.15+)
- ✅ **Linux** (Ubuntu 18.04+, CentOS 7+, etc.)

## 🔧 Prerequisites

### System Requirements
- **Node.js** 18.0.0 or higher
- **npm** 6.0.0 or higher (comes with Node.js)
- **Git** (for development setup)

### Check Prerequisites
\`\`\`bash
# Check Node.js version
node --version

# Check npm version
npm --version
\`\`\`

## 🏢 Enterprise Installation

### Docker Installation
\`\`\`bash
# Pull the official Docker image
docker pull costkatana/cli:latest

# Run Cost Katana in Docker
docker run -it --rm costkatana/cli:latest init
\`\`\`

### CI/CD Integration
\`\`\`yaml
# GitHub Actions example
- name: Install Cost Katana CLI
  run: npm install -g ai-cost-optimizer-cli

- name: Initialize Cost Katana
  run: cost-katana init --api-key \${{ secrets.API_KEY }}
  
- name: Run Cost Analysis
  run: cost-katana analytics --format json --export analysis.json
\`\`\`

## 🔍 Verification

Test your installation:

\`\`\`bash
# Check version
cost-katana --version

# View help
cost-katana --help

# Test configuration
cost-katana test
\`\`\`

## 📦 SDK Installation

### Node.js SDK
\`\`\`bash
npm install @cost-katana/node-sdk
\`\`\`

\`\`\`javascript
import { CostKatana } from '@cost-katana/node-sdk';

const ck = new CostKatana({
  apiKey: 'your-api-key'
});
\`\`\`

### Python SDK
\`\`\`bash
pip install cost-katana
\`\`\`

\`\`\`python
from cost_katana import CostKatana

ck = CostKatana(api_key='your-api-key')
\`\`\`

## 🚨 Troubleshooting

### Common Issues

#### Permission Errors
\`\`\`bash
# On macOS/Linux, use sudo for global install
sudo npm install -g ai-cost-optimizer-cli

# Or use npx to avoid global installation
npx ai-cost-optimizer-cli init
\`\`\`

#### Node.js Version Issues
\`\`\`bash
# Update Node.js using nvm
nvm install node
nvm use node

# Or download from nodejs.org
\`\`\`

#### Network Issues
\`\`\`bash
# Configure npm registry if behind corporate firewall
npm config set registry https://registry.npmjs.org/
npm config set strict-ssl false
\`\`\`

### Getting Help

- 📖 **Documentation**: [docs.costkatana.com](https://docs.costkatana.com)
- 💬 **GitHub Issues**: [Report Issues](https://github.com/Hypothesize-Tech/costkatana-cli/issues)
- 📧 **Email Support**: support@costkatana.com

## 🎯 Next Steps

After installation:

1. **Initialize Configuration**: \`cost-katana init\`
2. **Connect Your AI Providers**: Add API keys
3. **Start Tracking**: \`cost-katana analytics\`
4. **Optimize Costs**: \`cost-katana optimize\`
5. **Set Budgets**: \`cost-katana set-budget\`

Ready to start saving on AI costs? Let's go! 🚀`}
  />
);

// Integrations Pages
export const CLIPage = () => (
  <DocumentationPage
    title="CLI Tool"
    description="Powerful command-line interface for AI cost optimization"
    nextPage={{ path: '/integrations/nodejs', label: 'Next: Node.js SDK' }}
    fallbackContent={`# Cost Katana CLI

The most powerful command-line interface for AI cost optimization and management.

![CLI Interface](/assets/cli.png)

## 🚀 Installation

### Global Installation (Recommended)

Install the Cost Katana CLI globally using npm:

\`\`\`bash
# Install globally via npm
npm install -g ai-cost-optimizer-cli

# Verify installation
cost-katana --version

# Quick setup
cost-katana init
\`\`\`

### Package Information

Based on the [npm package](https://www.npmjs.com/package/costkatana-cli):

- **Package**: \`ai-cost-optimizer-cli\`
- **Version**: 1.0.11 (latest)
- **Weekly Downloads**: 638+
- **License**: MIT
- **TypeScript**: ✅ Built-in type declarations

## 🔧 Core Commands

### Setup & Configuration
\`\`\`bash
# Initialize with interactive setup
cost-katana init

# Test your configuration
cost-katana test

# Manage configuration
cost-katana config --list
cost-katana config --set defaultModel=gpt-4
\`\`\`

### Analytics & Monitoring
\`\`\`bash
# View usage analytics
cost-katana analytics

# Project-specific analytics
cost-katana analytics --project my-project --range 7d

# Export analytics data
cost-katana analytics --format csv --export report.csv
\`\`\`

![CLI Analytics Output](/assets/analytics_1.png)

### Optimization
\`\`\`bash
# Optimize a prompt
cost-katana optimize "Write a detailed essay about AI"

# Bulk optimize from file
cost-katana bulk-optimize --file prompts.csv

# Rewrite prompts intelligently
cost-katana rewrite-prompt --prompt "Explain quantum computing" --style concise
\`\`\`

### Budget Management
\`\`\`bash
# Set project budget
cost-katana set-budget --project my-app --tokens 1000000 --notify slack

# Check budget status
cost-katana budget status

# Configure alerts
cost-katana set-budget alerts --enable-slack --slack-channel #ai-costs
\`\`\`

## 🔄 Advanced Features

### Workflow Management
\`\`\`bash
# Create interactive workflow
cost-katana craft-workflow interactive

# Use predefined template
cost-katana craft-workflow --template legal_analysis

# Export workflow
cost-katana craft-workflow export --workflow workflow.json --export-json
\`\`\`

### Cost Simulation
\`\`\`bash
# Simulate cost scenarios
cost-katana simulate-cost --prompt-id prompt-123 --what-if '{"model": "gpt-3.5-turbo"}'

# Compare models
cost-katana simulate-cost compare-models --prompt-id prompt-123 --models "gpt-4,claude-3-sonnet"
\`\`\`

![Cost Simulation Results](/assets/optimization_2.png)

### Manual Tracking
\`\`\`bash
# Track manual requests
cost-katana track --model gpt-4 --tokens 1500 --project my-app --user john@company.com

# Track with feedback
cost-katana track --model claude-3-sonnet --tokens 800 --feedback positive
\`\`\`

### Project Management
\`\`\`bash
# Create new project
cost-katana project create my-new-project

# List all projects
cost-katana project list

# Switch active project
cost-katana project switch my-project
\`\`\`

### API Key Management
\`\`\`bash
# Create new API key
cost-katana key create --name dev-token --budget 100000 --ttl 30d

# List all keys
cost-katana key list

# Regenerate key
cost-katana key regenerate key-id-123
\`\`\`


## 📊 Analytics & Reports

### Prompt Metrics
\`\`\`bash
# Get metrics by tag
cost-katana prompt-metrics --tag support_chat_greeting --range 30d

# Metrics by pattern
cost-katana prompt-metrics pattern --pattern "summarize*" --range 7d

# Comprehensive metrics
cost-katana prompt-metrics comprehensive --range 30d
\`\`\`

### High-Cost Analysis
\`\`\`bash
# Find expensive prompts
cost-katana high-cost-prompts --range 7d

# Filter by project
cost-katana high-cost-prompts --project my-project --sort-by cost

# Filter by model
cost-katana high-cost-prompts --model gpt-4 --range 30d
\`\`\`

### Retry Logs
\`\`\`bash
# View retry logs
cost-katana retry-log --range 7d

# Get retry statistics
cost-katana retry-log stats --range 30d

# Filter by failure type
cost-katana retry-log failure-type timeout
\`\`\`

## 🛡️ Security & Auditing

### Firewall Auditing
\`\`\`bash
# Audit firewall decisions
cost-katana audit-firewall --id prompt-89234

# View by action
cost-katana audit-firewall action blocked --range 7d

# Get firewall statistics
cost-katana audit-firewall stats
\`\`\`

### Agent Inspection
\`\`\`bash
# Inspect agent behavior
cost-katana agent-inspect --agent-id agent-buyer-ranker

# Recent agent activity
cost-katana agent-inspect recent --limit 20
\`\`\`

## 🎯 AI-Powered Features

### Model Suggestions
\`\`\`bash
# Get model suggestions
cost-katana suggest-models --prompt "Summarize a 5-page contract"

# Task-specific suggestions
cost-katana suggest-models --task summarization --priority cost

# Compare models
cost-katana suggest-models compare --models "gpt-4,claude-3-sonnet,gpt-3.5-turbo"
\`\`\`

### Session Replay
\`\`\`bash
# Replay conversation session
cost-katana replay-session --session-id session-1234

# Recent sessions
cost-katana replay-session recent --limit 5
\`\`\`

## 🔧 CI/CD Integration

### GitHub Actions
\`\`\`yaml
name: AI Cost Monitoring
on: [push, pull_request]

jobs:
  cost-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Cost Katana CLI
        run: npm install -g ai-cost-optimizer-cli
      - name: Run Cost Analysis
        run: cost-katana analytics --format json --export cost-report.json
        env:
          API_KEY: \${{ secrets.API_KEY }}
\`\`\`

### Docker Integration
\`\`\`dockerfile
FROM node:18-alpine
RUN npm install -g ai-cost-optimizer-cli
COPY . .
RUN cost-katana analytics --export build-cost-report.json
CMD ["npm", "start"]
\`\`\`

## 🎨 Output Formats

All commands support multiple output formats:

\`\`\`bash
# Table format (default)
cost-katana analytics

# JSON format
cost-katana analytics --format json

# CSV format for spreadsheet analysis
cost-katana analytics --format csv --export report.csv

# Verbose output with detailed information
cost-katana analytics --verbose
\`\`\`

## 🚀 Getting Started

1. **Install**: \`npm install -g ai-cost-optimizer-cli\`
2. **Initialize**: \`cost-katana init\`
3. **Explore**: \`cost-katana --help\`
4. **Analyze**: \`cost-katana analytics\`
5. **Optimize**: Start saving on AI costs!

The CLI is your command center for AI cost optimization. Get started today! 🎯`}
  />
);

export const NodeJSPage = () => (
  <DocumentationPage
    title="Node.js SDK"
    description="Integrate Cost Katana with your Node.js applications"
    prevPage={{ path: '/integrations/cli', label: 'Previous: CLI Tool' }}
    nextPage={{ path: '/integrations/python', label: 'Next: Python SDK' }}
    fallbackContent={`# Node.js SDK Integration

Complete guide to integrating the Cost Katana SDK with your Node.js applications for programmatic AI cost optimization.

![Node.js SDK Integration](/assets/nodejs_sdk.png)

## 📦 Node.js SDK

For programmatic integration in your Node.js applications.

### Installation

\`\`\`bash
npm install @cost-katana/node-sdk
\`\`\`

### Quick Start

\`\`\`javascript
import { CostKatana } from '@cost-katana/node-sdk';

const ck = new CostKatana({
  apiKey: 'your-cost-katana-api-key',
  baseUrl: 'https://cost-katana-backend.store' // optional
});

// Make AI requests with automatic cost tracking
const response = await ck.chat.completions.create({
    model: 'gpt-4',
  messages: [
    { role: 'user', content: 'Hello, world!' }
  ]
});

console.log(response.choices[0].message.content);
\`\`\`

### Advanced Usage

#### Project-based Tracking
\`\`\`javascript
const ck = new CostKatana({
  apiKey: 'your-api-key',
  project: 'customer-support-bot' // Track costs per project
});

const response = await ck.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: messages,
  metadata: {
    user_id: 'user-123',
    session_id: 'session-456'
  }
});
\`\`\`

#### Cost Optimization
\`\`\`javascript
// Get optimization suggestions
const suggestions = await ck.optimization.getSuggestions({
  prompt: 'Your long prompt here...',
  model: 'gpt-4'
});

console.log('Potential savings:', suggestions.costSavings);

// Apply optimization
const optimized = await ck.optimization.optimize({
  prompt: 'Your long prompt here...',
  strategy: 'aggressive'
});

console.log('Optimized prompt:', optimized.optimizedPrompt);
console.log('Token reduction:', optimized.tokensSaved);
\`\`\`

#### Budget Monitoring
\`\`\`javascript
// Check budget status
const budget = await ck.budget.getStatus('my-project');

console.log(\`Budget usage: \${budget.usagePercentage}%\`);
console.log(\`Remaining: $\${budget.remaining}\`);

// Set budget alerts
await ck.budget.setAlert({
  project: 'my-project',
  threshold: 80, // Alert at 80%
  channels: ['email', 'slack']
});
\`\`\`

![SDK Integration Example](/assets/optimization_1.png)

## 🌐 Framework Integrations

### Express.js

\`\`\`javascript
const express = require('express');
const { CostKatana } = require('@cost-katana/node-sdk');

const app = express();
const ck = new CostKatana({
  apiKey: process.env.API_KEY
});

app.use(express.json());

// Chat endpoint with cost tracking
app.post('/api/chat', async (req, res) => {
  try {
    const response = await ck.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: req.body.messages,
      metadata: {
        endpoint: '/api/chat',
        user_ip: req.ip
      }
    });

    res.json({
      message: response.choices[0].message.content,
      usage: response.usage,
      cost: response.cost
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
\`\`\`

### Next.js

\`\`\`javascript
// pages/api/chat.js
import { CostKatana } from '@cost-katana/node-sdk';

const ck = new CostKatana({
  apiKey: process.env.API_KEY,
  project: 'nextjs-chat-app'
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    const response = await ck.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      metadata: {
        framework: 'nextjs',
        route: '/api/chat'
      }
    });

    res.json({
      message: response.choices[0].message.content,
      cost: response.cost,
      usage: response.usage
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
\`\`\`

### NestJS

\`\`\`typescript
// chat.service.ts
import { Injectable } from '@nestjs/common';
import { CostKatana } from '@cost-katana/node-sdk';

@Injectable()
export class ChatService {
  private readonly ck: CostKatana;

  constructor() {
    this.ck = new CostKatana({
      apiKey: process.env.API_KEY,
      project: 'nestjs-app'
    });
  }

  async chat(messages: any[]): Promise<any> {
    const response = await this.ck.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      metadata: {
        service: 'ChatService',
        framework: 'nestjs'
      }
    });

    return {
      message: response.choices[0].message.content,
      cost: response.cost,
      usage: response.usage
    };
  }
}
\`\`\`

![Framework Integration Examples](/assets/gateway_1.png)

## ☁️ Cloud Deployment

### AWS Lambda

\`\`\`javascript
const { CostKatana } = require('@cost-katana/node-sdk');

const ck = new CostKatana({
  apiKey: process.env.API_KEY,
  project: 'lambda-function'
});

exports.handler = async (event) => {
  try {
    const { messages } = JSON.parse(event.body);

    const response = await ck.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      metadata: {
        platform: 'aws-lambda',
        function_name: process.env.AWS_LAMBDA_FUNCTION_NAME
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: response.choices[0].message.content,
        cost: response.cost
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
\`\`\`

### Vercel Functions

\`\`\`javascript
// api/chat.js
import { CostKatana } from '@cost-katana/node-sdk';

const ck = new CostKatana({
  apiKey: process.env.API_KEY,
  project: 'vercel-app'
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await ck.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: req.body.messages,
      metadata: {
        platform: 'vercel',
        region: process.env.VERCEL_REGION
      }
    });

    res.json({
      message: response.choices[0].message.content,
      cost: response.cost
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
\`\`\`

## 🔧 Development Workflow

### GitHub Actions

\`\`\`yaml
name: AI Cost Monitoring
on: [push, pull_request]

jobs:
  cost-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install Cost Katana CLI
        run: npm install -g ai-cost-optimizer-cli
        
      - name: Run Cost Analysis
        run: |
          cost-katana analytics --format json --export cost-report.json
          cost-katana budget status --project \${{ github.repository }}
        env:
          API_KEY: \${{ secrets.API_KEY }}
          
      - name: Upload Cost Report
        uses: actions/upload-artifact@v3
        with:
          name: cost-report
          path: cost-report.json
\`\`\`

### Docker Integration

\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine

# Install Cost Katana CLI globally
RUN npm install -g ai-cost-optimizer-cli

# Copy application files
COPY package*.json ./
RUN npm install

COPY . .

# Run cost analysis during build
ARG API_KEY
ENV API_KEY=$API_KEY

RUN cost-katana analytics --export build-cost-report.json

# Start application
CMD ["npm", "start"]
\`\`\`

## 📊 Monitoring & Analytics

### Real-time Monitoring

\`\`\`javascript
// monitor.js
const { CostKatana } = require('@cost-katana/node-sdk');

const ck = new CostKatana({
  apiKey: process.env.API_KEY
});

// Monitor costs in real-time
setInterval(async () => {
  const analytics = await ck.analytics.getCurrent();
  
  console.log(\`Current hourly spend: $\${analytics.hourlySpend}\`);
  console.log(\`Requests this hour: \${analytics.requestCount}\`);
  
  if (analytics.hourlySpend > 10) {
    console.warn('⚠️ High spending detected!');
    // Send alert
  }
}, 60000); // Check every minute
\`\`\`

### Custom Dashboards

\`\`\`javascript
// dashboard-data.js
const express = require('express');
const { CostKatana } = require('@cost-katana/node-sdk');

const app = express();
const ck = new CostKatana({
  apiKey: process.env.API_KEY
});

// Dashboard API endpoint
app.get('/api/dashboard', async (req, res) => {
  const [analytics, budget, optimization] = await Promise.all([
    ck.analytics.getUsage({ days: 7 }),
    ck.budget.getStatus(),
    ck.optimization.getSummary()
  ]);

  res.json({
    analytics,
    budget,
    optimization,
    timestamp: new Date()
  });
});

app.listen(3001);
\`\`\`

![Analytics Dashboard](/assets/analytics_2.png)

## 🎯 Best Practices

### 1. Environment Configuration
\`\`\`javascript
// config.js
const config = {
  development: {
    costKatana: {
      apiKey: process.env.COST_KATANA_DEV_KEY,
      project: 'my-app-dev',
      optimization: 'conservative'
    }
  },
  production: {
    costKatana: {
      apiKey: process.env.COST_KATANA_PROD_KEY,
      project: 'my-app-prod',
      optimization: 'aggressive'
    }
  }
};

export default config[process.env.NODE_ENV || 'development'];
\`\`\`

### 2. Error Handling
\`\`\`javascript
const ck = new CostKatana({
  apiKey: process.env.API_KEY,
  retries: 3,
  timeout: 30000
});

try {
  const response = await ck.chat.completions.create({
    model: 'gpt-4',
    messages: messages
  });
  
  return response;
} catch (error) {
  if (error.code === 'RATE_LIMIT_EXCEEDED') {
    // Switch to cheaper model
    return await ck.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages
    });
  }
  
  throw error;
}
\`\`\`

### 3. Cost Optimization
\`\`\`javascript
// Implement smart caching
const cache = new Map();

async function chatWithCaching(messages) {
  const cacheKey = JSON.stringify(messages);
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const response = await ck.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages
  });
  
  cache.set(cacheKey, response);
  return response;
}
\`\`\`

## 🚀 Getting Started

1. **Install CLI**: \`npm install -g ai-cost-optimizer-cli\`
2. **Initialize**: \`cost-katana init\`
3. **Install SDK**: \`npm install @cost-katana/node-sdk\`
4. **Start Tracking**: Begin monitoring your AI costs
5. **Optimize**: Use insights to reduce expenses

Ready to optimize your Node.js AI costs? Get started today! 🎯`}
  />
);

export const PythonPage = () => (
  <DocumentationPage
    title="Python SDK"
    description="Integrate Cost Katana with your Python applications"
    prevPage={{ path: '/integrations/nodejs', label: 'Previous: Node.js SDK' }}
    nextPage={{ path: '/integrations/chatgpt', label: 'Next: ChatGPT Integration' }}
    fallbackContent={`# Python SDK Integration

Complete guide to integrating Cost Katana with your Python applications for AI cost optimization.

![Python SDK Integration](/assets/python_sdk.png)        

## 🐍 Python SDK

### Installation

\`\`\`bash
pip install cost-katana
\`\`\`

### Quick Start

\`\`\`python
from cost_katana import CostKatana

# Initialize the client
ck = CostKatana(
    api_key='your-cost-katana-api-key',
    base_url='https://cost-katana-backend.store'  # optional
)

# Make AI requests with automatic cost tracking
response = ck.chat.completions.create(
    model='gpt-4',
    messages=[
        {'role': 'user', 'content': 'Hello, world!'}
    ]
)

print(response.choices[0].message.content)
\`\`\`

### Advanced Usage

#### Project-based Tracking
\`\`\`python
ck = CostKatana(
    api_key='your-api-key',
    project='ml-research-project'  # Track costs per project
)

response = ck.chat.completions.create(
    model='gpt-3.5-turbo',
    messages=messages,
    metadata={
        'user_id': 'user-123',
        'experiment_id': 'exp-456'
    }
)
\`\`\`

#### Cost Optimization
\`\`\`python
# Get optimization suggestions
suggestions = ck.optimization.get_suggestions(
    prompt='Your long prompt here...',
    model='gpt-4'
)

print(f'Potential savings: {suggestions.cost_savings}')

# Apply optimization
optimized = ck.optimization.optimize(
    prompt='Your long prompt here...',
    strategy='aggressive'
)

print(f'Optimized prompt: {optimized.optimized_prompt}')
print(f'Token reduction: {optimized.tokens_saved}')
\`\`\`

#### Budget Monitoring
\`\`\`python
# Check budget status
budget = ck.budget.get_status('my-project')

print(f'Budget usage: {budget.usage_percentage}%')
print(f'Remaining: $' + str(budget.remaining))

# Set budget alerts
ck.budget.set_alert(
    project='my-project',
    threshold=80,  # Alert at 80%
    channels=['email', 'slack']
)
\`\`\`

![Python SDK Usage](/assets/usage_2.png)

## 🌐 Framework Integrations

### Django

\`\`\`python
# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from cost_katana import CostKatana
import json

ck = CostKatana(
    api_key=settings.API_KEY,
    project='django-chat-app'
)

@csrf_exempt
def chat_endpoint(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        response = ck.chat.completions.create(
            model='gpt-3.5-turbo',
            messages=data['messages'],
            metadata={
                'framework': 'django',
                'endpoint': '/api/chat',
                'user_ip': request.META.get('REMOTE_ADDR')
            }
        )
        
        return JsonResponse({
            'message': response.choices[0].message.content,
            'cost': response.cost,
            'usage': response.usage
        })
\`\`\`

### Flask

\`\`\`python
# app.py
from flask import Flask, request, jsonify
from cost_katana import CostKatana
import os

app = Flask(__name__)
ck = CostKatana(
    api_key=os.getenv('API_KEY'),
    project='flask-api'
)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        
        response = ck.chat.completions.create(
            model='gpt-3.5-turbo',
            messages=data['messages'],
            metadata={
                'framework': 'flask',
                'endpoint': '/api/chat'
            }
        )
        
        return jsonify({
            'message': response.choices[0].message.content,
            'cost': response.cost,
            'usage': response.usage
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
\`\`\`

### FastAPI

\`\`\`python
# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from cost_katana import CostKatana
from typing import List
import os

app = FastAPI()
ck = CostKatana(
    api_key=os.getenv('API_KEY'),
    project='fastapi-service'
)

class ChatRequest(BaseModel):
    messages: List[dict]

class ChatResponse(BaseModel):
    message: str
    cost: float
    usage: dict

@app.post('/api/chat', response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        response = ck.chat.completions.create(
            model='gpt-3.5-turbo',
            messages=request.messages,
            metadata={
                'framework': 'fastapi',
                'endpoint': '/api/chat'
            }
        )
        
        return ChatResponse(
            message=response.choices[0].message.content,
            cost=response.cost,
            usage=response.usage
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
\`\`\`

![Python Framework Examples](/assets/usage_3.png)

## 🔬 Data Science & ML Integration

### Jupyter Notebooks

\`\`\`python
# In Jupyter Notebook
import pandas as pd
from cost_katana import CostKatana

ck = CostKatana(
    api_key='your-api-key',
    project='data-analysis-notebook'
)

# Analyze data with AI
def analyze_data_with_ai(df):
    prompt = f"Analyze this data summary: {df.describe().to_string()}"
    
    response = ck.chat.completions.create(
        model='gpt-4',
        messages=[{'role': 'user', 'content': prompt}],
        metadata={
            'environment': 'jupyter',
            'data_shape': str(df.shape)
        }
    )
    
    return response.choices[0].message.content

# Track costs for each analysis
analysis_results = []
for data in datasets:
    result = analyze_data_with_ai(data)
    analysis_results.append(result)

# Check total cost
budget = ck.budget.get_status('data-analysis-notebook')
print(f'Total cost for analysis: $' + str(budget.current_spend))
\`\`\`

### Pandas Integration

\`\`\`python
import pandas as pd
from cost_katana import CostKatana

ck = CostKatana(api_key='your-api-key')

# Custom pandas accessor for AI analysis
@pd.api.extensions.register_dataframe_accessor("ai_analyze")
class AIAnalyzer:
    def __init__(self, pandas_obj):
        self._obj = pandas_obj
    
    def summarize(self):
        """Get AI-powered data summary"""
        prompt = f"Summarize this data: {self._obj.describe().to_string()}"
        
        response = ck.chat.completions.create(
            model='gpt-3.5-turbo',
            messages=[{'role': 'user', 'content': prompt}]
        )
        
        return response.choices[0].message.content

# Usage
df = pd.read_csv('data.csv')
summary = df.ai_analyze.summarize()
print(summary)
\`\`\`

### Scikit-learn Integration

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from cost_katana import CostKatana

ck = CostKatana(
    api_key='your-api-key',
    project='ml-model-analysis'
)

# AI-powered model interpretation
def interpret_model_results(model, X_test, y_test):
    score = model.score(X_test, y_test)
    feature_importance = model.feature_importances_
    
    prompt = f"""
    Interpret these ML model results:
    - Accuracy: {score:.4f}
    - Top 5 features: {dict(zip(X_test.columns[:5], feature_importance[:5]))}
    """
    
    response = ck.chat.completions.create(
        model='gpt-4',
        messages=[{'role': 'user', 'content': prompt}],
        metadata={
            'model_type': 'RandomForest',
            'accuracy': score,
            'features_count': len(X_test.columns)
        }
    )
    
    return response.choices[0].message.content

# Train model and get AI interpretation
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestClassifier().fit(X_train, y_train)
interpretation = interpret_model_results(model, X_test, y_test)
print(interpretation)
\`\`\`

## ☁️ Cloud Deployment

### AWS Lambda

\`\`\`python
# lambda_function.py
import json
from cost_katana import CostKatana
import os

ck = CostKatana(
    api_key=os.environ['API_KEY'],
    project='lambda-function'
)

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        
        response = ck.chat.completions.create(
            model='gpt-3.5-turbo',
            messages=body['messages'],
            metadata={
                'platform': 'aws-lambda',
                'function_name': context.function_name,
                'request_id': context.aws_request_id
            }
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'message': response.choices[0].message.content,
                'cost': response.cost
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
\`\`\`

### Google Cloud Functions

\`\`\`python
# main.py
from flask import Flask, request, jsonify
from cost_katana import CostKatana
import os

ck = CostKatana(
    api_key=os.getenv('API_KEY'),
    project='gcp-function'
)

def chat_function(request):
    """HTTP Cloud Function for chat completion"""
    if request.method != 'POST':
        return jsonify({'error': 'Method not allowed'}), 405
    
    try:
        data = request.get_json()
        
        response = ck.chat.completions.create(
            model='gpt-3.5-turbo',
            messages=data['messages'],
            metadata={
                'platform': 'gcp-functions',
                'region': os.getenv('FUNCTION_REGION')
            }
        )
        
        return jsonify({
            'message': response.choices[0].message.content,
            'cost': response.cost
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
\`\`\`

### Azure Functions

\`\`\`python
# __init__.py
import logging
import json
import azure.functions as func
from cost_katana import CostKatana
import os

ck = CostKatana(
    api_key=os.environ['API_KEY'],
    project='azure-function'
)

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        req_body = req.get_json()
        
        response = ck.chat.completions.create(
            model='gpt-3.5-turbo',
            messages=req_body['messages'],
            metadata={
                'platform': 'azure-functions',
                'function_app': os.getenv('WEBSITE_SITE_NAME')
            }
        )
        
        return func.HttpResponse(
            json.dumps({
                'message': response.choices[0].message.content,
                'cost': response.cost
            }),
            status_code=200,
            mimetype='application/json'
        )
    except Exception as e:
        return func.HttpResponse(
            json.dumps({'error': str(e)}),
            status_code=500,
            mimetype='application/json'
        )
\`\`\`

## 📊 Monitoring & Analytics

### Real-time Cost Monitoring

\`\`\`python
import time
from cost_katana import CostKatana

ck = CostKatana(api_key='your-api-key')

def monitor_costs():
    """Monitor AI costs in real-time"""
    while True:
        analytics = ck.analytics.get_current()
        
        print(f'Current hourly spend: $' + str(analytics.hourly_spend))
        print(f'Requests this hour: {analytics.request_count}')
        
        if analytics.hourly_spend > 10:
            print('⚠️ High spending detected!')
            # Send alert
            
        time.sleep(60)  # Check every minute

# Run monitoring
monitor_costs()
\`\`\`

### Custom Dashboards

\`\`\`python
from flask import Flask, jsonify
from cost_katana import CostKatana
import asyncio

app = Flask(__name__)
ck = CostKatana(api_key='your-api-key')

@app.route('/api/dashboard')
async def dashboard_data():
    """Get dashboard data"""
    analytics, budget, optimization = await asyncio.gather(
        ck.analytics.get_usage(days=7),
        ck.budget.get_status(),
        ck.optimization.get_summary()
    )
    
    return jsonify({
        'analytics': analytics,
        'budget': budget,
        'optimization': optimization,
        'timestamp': time.time()
    })

if __name__ == '__main__':
    app.run(port=3001)
\`\`\`

## 🎯 Best Practices

### 1. Environment Configuration
\`\`\`python
# config.py
import os

class Config:
    API_KEY = os.getenv('API_KEY')
    PROJECT_NAME = os.getenv('PROJECT_NAME', 'my-python-app')
    
    # Different settings for different environments
    if os.getenv('ENVIRONMENT') == 'production':
        OPTIMIZATION_STRATEGY = 'aggressive'
        COST_KATANA_PROJECT = f'{PROJECT_NAME}-prod'
    else:
        OPTIMIZATION_STRATEGY = 'conservative'
        COST_KATANA_PROJECT = f'{PROJECT_NAME}-dev'

config = Config()
\`\`\`

### 2. Error Handling
\`\`\`python
from cost_katana import CostKatana, RateLimitError, CostLimitError

ck = CostKatana(
    api_key='your-api-key',
    retries=3,
    timeout=30
)

try:
    response = ck.chat.completions.create(
        model='gpt-4',
        messages=messages
    )
    
    return response
except RateLimitError:
    # Switch to cheaper model
    return ck.chat.completions.create(
        model='gpt-3.5-turbo',
        messages=messages
    )
except CostLimitError:
    # Handle budget exceeded
    print('Budget limit reached!')
    return None
\`\`\`

### 3. Cost Optimization
\`\`\`python
# Implement caching
from functools import lru_cache
import hashlib

@lru_cache(maxsize=1000)
def cached_chat_completion(messages_hash, model):
    return ck.chat.completions.create(
        model=model,
        messages=json.loads(messages_hash)
    )

def chat_with_caching(messages, model='gpt-3.5-turbo'):
    messages_str = json.dumps(messages, sort_keys=True)
    messages_hash = hashlib.md5(messages_str.encode()).hexdigest()
    
    return cached_chat_completion(messages_hash, model)
\`\`\`

## 🚀 Getting Started

1. **Install SDK**: \`pip install cost-katana\`
2. **Get API Key**: Sign up at [costkatana.com](https://costkatana.com)
3. **Initialize Client**: \`ck = CostKatana(api_key='your-key')\`
4. **Start Tracking**: Begin monitoring your AI costs
5. **Optimize**: Use insights to reduce expenses

Ready to optimize your Python AI costs? Get started today! 🐍`}
  />
);

export const ChatGPTPage = () => (
  <DocumentationPage
    title="ChatGPT Integration"
    description="Direct ChatGPT custom GPT integration for instant optimization"
    prevPage={{ path: '/integrations/python', label: 'Previous: Python SDK' }}
    fallbackContent={`# ChatGPT Integration

Direct integration with ChatGPT through custom GPT for instant AI cost optimization and analysis.

![ChatGPT Integration](/assets/gpt.png)

## 🤖 Custom GPT Integration

### Overview

Our ChatGPT custom GPT provides instant access to Cost Katana's optimization features directly within ChatGPT conversations.

**Features:**
- ✨ **Instant Prompt Optimization** - Optimize prompts in real-time
- 📊 **Cost Analysis** - Get immediate cost breakdowns
- 🎯 **Model Recommendations** - AI-powered model suggestions
- 📈 **Usage Tracking** - Monitor your AI spending
- 🔄 **Workflow Analysis** - Analyze multi-step AI processes

### Installation

1. **Access Custom GPT**: Visit [ChatGPT Custom GPTs](https://chat.openai.com/gpts)
2. **Search for Cost Katana**: Find "Cost Katana AI Cost Optimizer"
3. **Install**: Click "Use this GPT"
4. **Configure**: Connect your Cost Katana API key

![Custom GPT Setup](/assets/prompt_templates_2.png)

## 💬 Chat Commands

### Prompt Optimization
\`\`\`
Optimize this prompt: "Write a comprehensive analysis of market trends in the technology sector, including detailed insights on emerging technologies, competitive landscape, and future predictions for the next 5 years."
\`\`\`

**Response includes:**
- Optimized prompt version
- Token reduction analysis
- Cost savings estimate
- Alternative model suggestions

### Cost Analysis
\`\`\`
Analyze the cost of using GPT-4 vs Claude-3 for customer support responses with average 150 tokens per response, 1000 responses per day.
\`\`\`

**Response includes:**
- Detailed cost comparison
- Monthly spending projections
- Break-even analysis
- Optimization recommendations

### Model Recommendations
\`\`\`
Suggest the best model for: "Summarizing legal documents with high accuracy requirements"
\`\`\`

**Response includes:**
- Top 3 model recommendations
- Cost vs. quality trade-offs
- Performance benchmarks
- Implementation guidance

### Budget Planning
\`\`\`
Help me plan a budget for an AI-powered content generation service that needs to produce 500 blog posts per month.
\`\`\`

**Response includes:**
- Budget breakdown by model
- Cost optimization strategies
- Scaling recommendations
- Risk mitigation tips

## 🔧 Advanced Features

### Workflow Analysis
\`\`\`
Analyze this AI workflow:
1. Extract key points from research papers (GPT-4)
2. Summarize findings (Claude-3-Sonnet) 
3. Generate blog post outline (GPT-3.5-turbo)
4. Write full article (Claude-3-Haiku)
\`\`\`

**Analysis includes:**
- Step-by-step cost breakdown
- Workflow optimization suggestions
- Alternative model routing
- Parallel processing opportunities

### Prompt Engineering
\`\`\`
Help me create a prompt template for product description generation that balances quality and cost.
\`\`\`

**Template includes:**
- Optimized prompt structure
- Variable placeholders
- Quality guidelines
- Cost-effective alternatives

### Competitive Analysis
\`\`\`
Compare the total cost of ownership for building a chatbot using different AI providers.
\`\`\`

**Comparison includes:**
- Provider cost analysis
- Feature comparison
- Integration complexity
- Long-term cost projections

![ChatGPT Analysis Results](/assets/analytics_1.png)

## 📊 Usage Analytics

### Real-time Monitoring
The custom GPT can access your Cost Katana dashboard to provide:

- **Current spending** across all projects
- **Usage trends** and patterns
- **Budget utilization** percentages
- **Cost anomaly** detection
- **Optimization opportunities**

### Interactive Reports
\`\`\`
Show me my AI spending report for the last 30 days with optimization recommendations.
   \`\`\`

**Report includes:**
- Visual spending breakdown
- Top cost drivers
- Efficiency metrics
- Action items for cost reduction

## 🎯 Use Cases

### 1. Content Creation Teams
\`\`\`
I need to optimize costs for a content team that creates:
- 50 blog posts per month
- 200 social media posts per month  
- 20 email newsletters per month
   \`\`\`

### 2. Customer Support
\`\`\`
Optimize our customer support AI that handles:
- 1000 tickets per day
- Average response length: 100 words
- Required response time: < 30 seconds
   \`\`\`

### 3. Data Analysis
\`\`\`
Help optimize costs for AI-powered data analysis that processes:
- 100 data files per week
- Each requiring 5-10 analysis steps
- Mix of numerical and text data
\`\`\`

### 4. Code Generation
\`\`\`
Optimize costs for an AI coding assistant that:
- Generates code snippets
- Reviews pull requests
- Writes documentation
- Explains complex algorithms
\`\`\`

## 🔐 Security & Privacy

### Data Protection
- **No data storage**: Conversations are not stored by Cost Katana
- **API-only access**: Only accesses your authorized Cost Katana data
- **Encrypted communications**: All data transfer is encrypted
- **Audit logs**: Full audit trail of all interactions

### Permission Management
- **Scoped access**: Only accesses cost and usage data
- **No code access**: Cannot access your application code
- **Revocable**: API access can be revoked anytime
- **Read-only**: Cannot modify your Cost Katana settings

## 🚀 Getting Started

### Step 1: Setup Cost Katana Account
1. Sign up at [costkatana.com](https://costkatana.com)
2. Get your API key from the dashboard
3. Configure your AI providers

### Step 2: Install Custom GPT
1. Go to ChatGPT and find "Cost Katana AI Cost Optimizer"
2. Click "Use this GPT"
3. Follow the setup instructions

### Step 3: Connect API Key
1. In the custom GPT, use the command: \`/setup\`
2. Provide your Cost Katana API key
3. Verify the connection

### Step 4: Start Optimizing
1. Ask for prompt optimization
2. Get cost analysis
3. Receive model recommendations
4. Monitor your savings!

## 💡 Pro Tips

### Effective Commands
- Be specific about your use case
- Include volume estimates (requests per day/month)
- Mention quality requirements
- Specify budget constraints

### Best Practices
- **Regular analysis**: Check costs weekly
- **Prompt optimization**: Optimize high-frequency prompts first
- **Model selection**: Match models to task complexity
- **Budget monitoring**: Set up alerts for spending thresholds

### Common Questions

**Q: How accurate are the cost estimates?**
A: Cost estimates are based on current provider pricing and your actual usage patterns, typically accurate within 5-10%.

**Q: Can I use this for multiple projects?**
A: Yes, the custom GPT can analyze costs across all your Cost Katana projects.

**Q: Does this work with all AI providers?**
A: Yes, it supports OpenAI, Anthropic, AWS Bedrock, Google AI, Cohere, and more.

**Q: Is my data secure?**
A: Absolutely. We only access cost and usage data through your API key, never your actual prompts or responses.

## 🔗 Integration Examples

### Slack Integration
Set up automated cost reports in Slack:
\`\`\`
Set up daily cost reports for our #ai-team Slack channel
\`\`\`

### Email Reports
Configure weekly email summaries:
\`\`\`
Configure weekly cost optimization reports to be sent to engineering-leads@company.com
\`\`\`

### Dashboard Widgets
Create custom dashboard views:
\`\`\`
Help me create a dashboard widget showing cost per customer support ticket resolved
\`\`\`

![Integration Dashboard](/assets/dashboard_2.png)

## 📞 Support

Need help with the ChatGPT integration?

- **In-chat help**: Type \`/help\` in the custom GPT
- **Documentation**: Visit [docs.costkatana.com](https://docs.costkatana.com)
- **Email support**: support@costkatana.com
- **Community**: Join our Discord community

Start optimizing your AI costs directly in ChatGPT today! 🎯`}
  />
);

// Features Pages
export const FeaturesOverviewPage = () => (
  <DocumentationPage
    title="Features Overview"
    description="Explore all Cost Katana features for AI cost optimization"
    nextPage={{ path: '/features/dashboard', label: 'Next: Dashboard' }}
    fallbackContent={`# Cost Katana Features Overview

Comprehensive AI cost optimization platform powered by revolutionary **Cortex Meta-Language** to reduce your AI spending by up to **95%** through LISP-based answer generation.

![Cost Katana Features Overview](/assets/dashboard_1.png)

## 🎯 Core Features

### 📊 Real-time Dashboard
Monitor your AI costs and usage in real-time with beautiful, customizable dashboards.

**Key Benefits:**
- **Live cost tracking** across all AI providers
- **Usage analytics** with detailed breakdowns
- **Performance monitoring** and health checks
- **Custom widgets** and views

[Explore Dashboard →](/features/dashboard)

![Dashboard Analytics](/assets/analytics_1.png)

### 📈 Usage Tracking
Comprehensive tracking of all your AI API calls with detailed analytics and insights.

**Features:**
- **Automatic tracking** for all major AI providers
- **Request-level details** with full audit trails
- **User attribution** and project segmentation
- **Cost allocation** and chargeback reports

[Learn More →](/features/usage-tracking)

### 💰 Cost Analytics
Deep dive into your AI spending with advanced analytics and optimization recommendations.

**Analytics Include:**
- **Cost trends** and forecasting
- **Provider comparisons** and recommendations
- **Usage patterns** and anomaly detection
- **ROI analysis** and optimization opportunities

[View Analytics →](/features/analytics)

![Cost Analytics Dashboard](/assets/analytics_2.png)

## 🚀 Advanced Features

### 🧠 Cortex Meta-Language (Revolutionary)
The world's first AI meta-language achieving **70-95% token reduction** through LISP-based answer generation.

**Cortex Features:**
- **3-Stage Pipeline** - Encoder → Core Processor → Decoder optimization
- **Complete Answer Generation** - Generate full responses in optimized LISP format
- **Dynamic LISP Instructions** - AI-powered instruction generation for any context
- **Claude Opus 4.1 Core** - Latest AI models for maximum capability
- **Real-time Analytics** - Confidence, cost impact, and semantic integrity metrics
- **Universal Context Handling** - Technical, business, and industry-specific processing

**Usage Example:**
\`\`\`javascript
const response = await gateway.openai({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: 'Write a REST API in Node.js' }]
}, {
  cortex: {
    enabled: true,
    mode: 'answer_generation',
    coreModel: 'claude-opus-4-1',
    dynamicInstructions: true
  }
});

// Achieve 89% token reduction!
console.log(response.metadata.cortex.tokenReduction);
\`\`\`

[Learn More About Cortex →](/features/cortex)

### 🤖 Traditional AI Optimization Engine
Intelligent optimization powered by machine learning to automatically reduce your costs.

**Optimization Types:**
- **Prompt optimization** - Reduce token usage while maintaining quality
- **Model routing** - Automatically select the most cost-effective model
- **Caching strategies** - Eliminate duplicate requests
- **Batch processing** - Optimize request patterns

[Discover Optimization →](/features/optimization)

![AI Optimization Results](/assets/optimization_1.png)

### 🔮 Predictive Intelligence
AI-powered forecasting and recommendations to stay ahead of your costs.

**Predictive Features:**
- **Cost forecasting** with 95% accuracy
- **Usage predictions** based on historical data
- **Budget alerts** and recommendations
- **Anomaly detection** and early warnings

[Explore Intelligence →](/features/predictive-intelligence)

### 📁 Project Management
Organize and track costs across multiple projects and teams.

**Project Features:**
- **Multi-project support** with cost isolation
- **Team collaboration** and access controls
- **Budget allocation** and tracking
- **Cross-project analytics** and reporting

[Manage Projects →](/features/projects)

![Project Management Interface](/assets/usage_1.png)

## 🛠️ Productivity Tools

### 📝 Prompt Templates
Pre-built and custom templates to standardize your AI interactions.

**Template Benefits:**
- **Consistency** across your organization
- **Cost optimization** built-in
- **Version control** and collaboration
- **Performance tracking** per template

[Browse Templates →](/features/templates)

### ⚡ Workflows
Automate complex AI processes with visual workflow builder.

**Workflow Capabilities:**
- **Visual builder** with drag-and-drop interface
- **Multi-step processes** with conditional logic
- **Cost optimization** at each step
- **Error handling** and retry mechanisms

[Build Workflows →](/features/workflows)

![Workflow Builder](/assets/workflows_1.png)

## 🔧 Infrastructure Features

### 🌐 Gateway & Proxy
Centralized gateway for all your AI API calls with built-in optimization.

**Gateway Features:**
- **Universal API** compatible with all providers
- **Automatic failover** and load balancing
- **Request caching** and deduplication
- **Rate limiting** and quota management

[Setup Gateway →](/features/gateway)

### 🔐 Key Vault
Secure management of all your AI provider API keys.

**Security Features:**
- **Encrypted storage** with enterprise-grade security
- **Access controls** and audit logging
- **Key rotation** and lifecycle management
- **Integration** with popular secret managers

[Secure Keys →](/features/key-vault)

![Security Dashboard](/assets/gateway_1.png)

### 🚨 Alerts & Monitoring
Proactive monitoring with intelligent alerts and notifications.

**Alert Types:**
- **Budget thresholds** and spending limits
- **Usage anomalies** and cost spikes
- **Performance issues** and downtime
- **Optimization opportunities** and recommendations

[Configure Alerts →](/features/alerts)


## 💡 Key Benefits

### 💸 **Cost Savings**
- **Average 70% reduction** in AI costs
- **Intelligent optimization** without quality loss
- **Automatic scaling** based on usage patterns
- **Budget controls** and spending limits

### 📊 **Visibility & Control**
- **Complete transparency** into AI spending
- **Granular tracking** at request level
- **Team collaboration** and cost allocation
- **Compliance reporting** and audit trails

### ⚡ **Performance**
- **Sub-100ms latency** added overhead
- **99.9% uptime** SLA with redundancy
- **Global edge** deployment for speed
- **Automatic failover** and load balancing

### 🔒 **Security**
- **Enterprise-grade** encryption and security
- **SOC 2 Type II** compliance
- **Zero data retention** policy
- **Advanced access** controls and audit logs

## 🚀 Getting Started

### Quick Setup (5 minutes)
1. **Sign up** for your free account
2. **Connect** your AI provider APIs
3. **Install** SDK or CLI tool
4. **Start tracking** and optimizing immediately

### Implementation Options
- **🖥️ Web Dashboard** - Complete web interface
- **⚡ CLI Tool** - Command-line power user interface
- **📦 SDKs** - Node.js, Python, and more
- **🔌 API** - Direct REST API integration

### Support & Resources
- **📖 Documentation** - Comprehensive guides and tutorials
- **💬 Community** - Discord community and forums
- **🎯 Support** - 24/7 technical support
- **🎓 Training** - Onboarding and best practices

## 📈 Success Stories

### Startup Success
*"Cost Katana helped us reduce our AI costs by 80% while scaling from 1K to 1M users. The automatic optimization saved us $50K+ in our first year."*

### Enterprise Efficiency  
*"With 500+ developers using AI APIs, Cost Katana gave us the visibility and control we needed. We now track every dollar and optimize continuously."*

### Agency Growth
*"Managing AI costs for 50+ clients was impossible before Cost Katana. Now we have complete transparency and can offer cost optimization as a service."*

## 🎯 Ready to Get Started?

Choose your path to AI cost optimization:

- **🚀 Start Free Trial** - No credit card required
- **📞 Schedule Demo** - See Cost Katana in action
- **📖 Read Documentation** - Technical implementation guides
- **💬 Join Community** - Connect with other users

Transform your AI costs today with Cost Katana! 💰✨`}
  />
);

export const DashboardPage = () => (
  <DocumentationPage
    title="Dashboard"
    description="Real-time monitoring and insights dashboard"
    prevPage={{ path: '/features', label: 'Back to Features' }}
    nextPage={{ path: '/features/usage-tracking', label: 'Next: Usage Tracking' }}
    fallbackContent={`# Dashboard

Real-time monitoring and insights dashboard for comprehensive AI cost tracking.

![Main Dashboard Overview](/assets/dashboard_1.png)

## Features

### Real-time Monitoring
- **Live Cost Tracking**: See spending as it happens
- **Usage Metrics**: Real-time API call monitoring
- **Provider Status**: Health checks for all AI providers
- **Performance Metrics**: Response times and success rates

![Advanced Dashboard Analytics](/assets/dashboard_2.png)

### Analytics & Insights
- **Cost Breakdown**: Detailed spending analysis
- **Usage Patterns**: Identify trends and anomalies
- **Optimization Opportunities**: AI-powered recommendations
- **Predictive Forecasting**: Future cost projections

![Dashboard Customization](/assets/dashboard_3.png)

### Customization
- **Widget Configuration**: Personalize your dashboard
- **Custom Views**: Create project-specific dashboards
- **Alert Integration**: Embedded notifications
- **Export Options**: Share insights with your team

## Getting Started

1. **Login** to your Cost Katana account
2. **Connect** your AI provider APIs
3. **Configure** tracking for your projects
4. **Monitor** real-time usage and costs

## Dashboard Widgets

### Cost Overview
- Current month spending
- Budget utilization
- Cost per provider
- Trending indicators

### Usage Statistics
- API calls this period
- Token consumption
- Request success rates
- Average response times

### Alerts & Notifications
- Active alerts
- Recent notifications
- Threshold warnings
- System status

### Optimization Insights
- Cost-saving opportunities
- Model recommendations
- Usage efficiency tips
- Performance improvements`}
  />
);

export const UsageTrackingPage = () => (
  <DocumentationPage
    title="Usage Tracking"
    description="Track your AI usage across all providers"
    prevPage={{ path: '/features/dashboard', label: 'Previous: Dashboard' }}
    nextPage={{ path: '/features/analytics', label: 'Next: Cost Analytics' }}
    fallbackContent={`# Usage Tracking

Track your AI API usage across all providers with detailed insights and real-time monitoring.

![Usage Dashboard Overview](/assets/usage_1.png)

## Features

- **Real-time Tracking**: Monitor usage as it happens
- **Multi-Provider Support**: Track OpenAI, Anthropic, AWS Bedrock, and more
- **Detailed Metrics**: Token counts, request counts, latency, and more
- **Historical Data**: View usage trends over time
- **Export Capabilities**: Download usage data in CSV or JSON format

![Usage Analytics View](/assets/usage_2.png)

## How to Track Usage

### Automatic Tracking

When using our SDKs, usage is automatically tracked:

\`\`\`javascript
// Node.js
const response = await ck.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Hello" }]
});
// Usage automatically tracked!
\`\`\`

### Manual Tracking

For custom integrations, manually track usage:

\`\`\`javascript
await ck.track({
  provider: 'openai',
  model: 'gpt-4',
  usage: {
    prompt_tokens: 100,
    completion_tokens: 50,
    total_tokens: 150
  }
});
\`\`\`

## Usage Dashboard

View your usage in the dashboard:

1. Navigate to **Usage** in the sidebar
2. Select your date range
3. Filter by provider, model, or project
4. View detailed metrics and charts

![Detailed Usage Metrics](/assets/usage_3.png)

## Alerts

Set up usage alerts to prevent overages:

- Daily usage limits
- Monthly budget caps
- Unusual activity detection
- Rate limit warnings`}
  />
);

export const CostAnalyticsPage = () => (
  <DocumentationPage
    title="Cost Analytics"
    description="Advanced cost analysis and reporting"
    prevPage={{ path: '/features/usage-tracking', label: 'Previous: Usage Tracking' }}
    nextPage={{ path: '/features/optimization', label: 'Next: AI Optimization' }}
    fallbackContent={`# Cost Analytics

Get deep insights into your AI spending with advanced analytics and reporting.

![Cost Analytics Dashboard](/assets/analytics_1.png)

## Analytics Features

### Cost Breakdown
- **By Provider**: Compare costs across OpenAI, Anthropic, AWS Bedrock
- **By Model**: See which models are most expensive
- **By Project**: Track spending per project or team
- **By Time**: Daily, weekly, monthly cost trends

![Advanced Analytics View](/assets/analytics_2.png)

### Advanced Metrics
- **Cost per Request**: Average cost for each API call
- **Token Efficiency**: Cost per 1000 tokens
- **ROI Analysis**: Value generated vs. cost spent
- **Waste Detection**: Identify inefficient usage patterns

### Predictive Analytics
- **Cost Forecasting**: AI-powered spending predictions
- **Budget Planning**: Optimize budget allocation
- **Anomaly Detection**: Catch unusual spending patterns
- **Trend Analysis**: Long-term cost trends

## Reports

Generate comprehensive reports:

### Executive Dashboard
- High-level cost overview
- Key metrics and KPIs
- Cost saving opportunities
- Month-over-month comparisons

### Detailed Reports
- Granular usage data
- API call logs
- Token usage breakdown
- Performance metrics

### Custom Reports
- Build your own reports
- Schedule automated delivery
- Export to PDF, Excel, or CSV
- API access for integration

## Cost Optimization Insights

Our AI analyzes your usage and provides:

- **Optimization Recommendations**: Specific actions to reduce costs
- **Model Suggestions**: Cheaper alternatives for your use cases
- **Batch Processing Opportunities**: Combine requests for savings
- **Caching Strategies**: Reduce redundant API calls`}
  />
);

export const OptimizationPage = () => (
  <DocumentationPage
    title="AI Optimization"
    description="Intelligent cost reduction strategies powered by AI"
    prevPage={{ path: '/features/analytics', label: 'Previous: Cost Analytics' }}
    nextPage={{ path: '/features/predictive-intelligence', label: 'Next: Predictive Intelligence' }}
    fallbackContent={`# AI-Powered Optimization

Reduce your AI costs by up to 70% with intelligent optimization strategies.

![AI Optimization Dashboard](/assets/optimization_1.png)

## Optimization Techniques

### Prompt Optimization
- **Automatic Compression**: Reduce prompt size without losing context
- **Token Reduction**: Remove unnecessary tokens
- **Context Management**: Smart context window usage
- **Prompt Templates**: Reusable optimized prompts

![Optimization Results](/assets/optimization_2.png)

### Model Selection
- **Smart Routing**: Automatically choose the best model for each task
- **Cost-Performance Balance**: Find the optimal trade-off
- **Fallback Strategies**: Automatic failover to cheaper models
- **A/B Testing**: Compare model performance and costs

### Caching & Deduplication
- **Response Caching**: Store and reuse common responses
- **Semantic Deduplication**: Identify similar requests
- **Embedding Cache**: Reuse vector embeddings
- **TTL Management**: Smart cache expiration

### Batch Processing
- **Request Batching**: Combine multiple requests
- **Async Processing**: Queue and process efficiently
- **Bulk Operations**: Reduce per-request overhead
- **Rate Optimization**: Maximize throughput within limits

## AI Recommendations

Our AI continuously analyzes your usage and suggests:

### Immediate Optimizations
- Switch to cheaper models for simple tasks
- Combine similar requests
- Remove redundant API calls
- Optimize prompt length

### Long-term Strategies
- Implement caching layers
- Redesign workflows
- Train smaller specialized models

## Implementation

### One-Click Optimizations
Apply recommendations instantly:

\`\`\`javascript
// Get optimization suggestions
const suggestions = await ck.getOptimizations();

// Apply selected optimizations
await ck.applyOptimization(suggestions[0].id);
\`\`\`

### Custom Rules
Define your own optimization rules:

\`\`\`javascript
ck.addRule({
  name: 'Use GPT-3.5 for summaries',
  condition: { task: 'summarization' },
  action: { model: 'gpt-3.5-turbo' }
});
\`\`\`

## Results Tracking

Monitor optimization impact:

- **Savings Dashboard**: Real-time cost reduction metrics
- **Before/After Comparison**: See the impact of each optimization
- **Quality Metrics**: Ensure output quality is maintained
- **ROI Tracking**: Measure optimization effectiveness`}
  />
);

export const PredictiveIntelligencePage = () => (
  <DocumentationPage
    title="Predictive Intelligence"
    description="AI-powered forecasting and predictive analytics"
    prevPage={{ path: '/features/optimization', label: 'Previous: AI Optimization' }}
    nextPage={{ path: '/features/projects', label: 'Next: Projects' }}
    fallbackContent={`# Predictive Intelligence

Leverage AI to forecast costs, predict usage patterns, and prevent budget overruns.

![Predictive Intelligence Overview](/assets/predictive_intelligence_1.png)

## Forecasting Features

### Cost Prediction
- **Monthly Forecasts**: Predict end-of-month spending
- **Trend Analysis**: Identify spending patterns
- **Seasonal Adjustments**: Account for usage variations
- **Confidence Intervals**: Understand prediction reliability

![Cost Forecasting Dashboard](/assets/predictive_intelligence_2.png)

### Usage Forecasting
- **API Call Predictions**: Estimate future request volumes
- **Token Usage Projections**: Forecast token consumption
- **Peak Load Detection**: Predict high-usage periods
- **Capacity Planning**: Plan for scale

### Budget Management
- **Overrun Prevention**: Early warnings before limits
- **Budget Optimization**: Allocate budgets efficiently
- **Cost Anomaly Detection**: Catch unusual spending
- **Threshold Alerts**: Multi-level warning system

## AI Models

Our predictive models use:

### Time Series Analysis
- LSTM networks for pattern recognition
- ARIMA models for trend analysis
- Seasonal decomposition
- Outlier detection

### Machine Learning
- Random forests for multi-factor prediction
- Gradient boosting for accuracy
- Neural networks for complex patterns
- Ensemble methods for robustness

### Custom Training
- Learn from your specific usage patterns
- Adapt to your business cycles
- Improve accuracy over time
- Incorporate external factors

## Alerts & Actions

### Predictive Alerts
Get notified before issues occur:

- **7-Day Forecast Alert**: "You'll exceed budget in 7 days"
- **Usage Spike Warning**: "Unusual activity detected"
- **Model Degradation**: "Performance declining, consider switching"
- **Opportunity Alerts**: "Save $X by switching to model Y"

### Automated Actions
Set up automatic responses:

\`\`\`javascript
ck.setPredictiveAction({
  trigger: 'budget_80_percent',
  action: 'switch_to_cheaper_model',
  models: {
    from: 'gpt-4',
    to: 'gpt-3.5-turbo'
  }
});
\`\`\`

![Advanced Predictive Analytics](/assets/predictive_intelligence_3.png)

## Dashboard

The Predictive Intelligence dashboard shows:

- **Cost Forecast Graph**: Visual prediction timeline
- **Confidence Scores**: Prediction reliability metrics
- **Risk Indicators**: Potential issues highlighted
- **Recommendation Cards**: AI-suggested actions
- **What-If Scenarios**: Test different strategies`}
  />
);

export const ProjectsPage = () => (
  <DocumentationPage
    title="Project Management"
    description="Organize and track AI usage by projects"
    prevPage={{ path: '/features/predictive-intelligence', label: 'Previous: Predictive Intelligence' }}
    nextPage={{ path: '/features/templates', label: 'Next: Prompt Templates' }}
    fallbackContent={`# Project Management

Organize your AI usage by projects for better cost tracking and team collaboration.

![Project Management Dashboard](/assets/project_1.png)

## Project Features

### Project Organization
- **Hierarchical Structure**: Create projects and sub-projects
- **Team Assignment**: Assign team members to projects
- **Budget Allocation**: Set project-specific budgets
- **Tag System**: Organize with custom tags

![Project Analytics View](/assets/project_2.png)

### Usage Tracking
- **Per-Project Metrics**: Track usage for each project
- **Cost Attribution**: Accurate cost allocation
- **Resource Limits**: Set project quotas
- **Access Control**: Manage who can use resources

### Collaboration
- **Team Dashboard**: Shared project view
- **Role Management**: Define permissions
- **Activity Feed**: See team activity
- **Comments & Notes**: Collaborate on optimizations

## Creating Projects

### Via Dashboard
1. Navigate to **Projects** → **New Project**
2. Enter project details:
   - Name and description
   - Budget and limits
   - Team members
   - Tags and categories

### Via API
\`\`\`javascript
const project = await ck.projects.create({
  name: 'Customer Support Bot',
  budget: 1000,
  team: ['alice@example.com', 'bob@example.com'],
  limits: {
    daily_spend: 50,
    requests_per_minute: 100
  }
});
\`\`\`

## Project Settings

### Budget Management
- **Monthly Budgets**: Set spending limits
- **Alert Thresholds**: Get notified at 50%, 80%, 90%
- **Auto-Scaling**: Adjust limits based on usage
- **Cost Centers**: Map to accounting codes

### Access Control
- **API Keys**: Project-specific keys
- **Permissions**: Read, write, admin levels
- **IP Restrictions**: Limit access by IP
- **Audit Logs**: Track all activities

### Integration
- **Git Integration**: Link to repositories
- **CI/CD**: Integrate with pipelines
- **Issue Tracking**: Connect to Jira, GitHub Issues
- **Billing**: Export to accounting systems

## Project Analytics

### Dashboards
- **Project Overview**: Key metrics at a glance
- **Cost Breakdown**: Detailed spending analysis
- **Usage Patterns**: Understand project behavior
- **Team Performance**: Individual contributions

### Reports
- **Weekly Summaries**: Automated email reports
- **Monthly Reviews**: Comprehensive analysis
- **Custom Reports**: Build your own views
- **Executive Dashboards**: High-level insights

## Best Practices

### Project Structure
- One project per application/service
- Separate dev/staging/production
- Use consistent naming conventions
- Tag for easy filtering

### Budget Planning
- Start with conservative budgets
- Review and adjust monthly
- Set up graduated alerts
- Plan for growth

### Team Management
- Assign clear owners
- Regular review meetings
- Share optimization wins
- Document best practices`}
  />
);

export const TemplatesPage = () => (
  <DocumentationPage
    title="Prompt Templates"
    description="Create and manage reusable optimized prompts"
    prevPage={{ path: '/features/projects', label: 'Previous: Projects' }}
    nextPage={{ path: '/features/workflows', label: 'Next: Workflows' }}
    fallbackContent={`# Prompt Templates

Create, manage, and share optimized prompt templates to reduce costs and improve consistency.

![Prompt Templates Library](/assets/prompt_templates_1.png)

## Template Features

### Template Management
- **Version Control**: Track template changes
- **Categories**: Organize by use case
- **Sharing**: Share across teams
- **Variables**: Dynamic content insertion

![Template Editor](/assets/prompt_templates_2.png)

### Optimization
- **Token Analysis**: See token usage
- **Cost Estimation**: Preview costs
- **A/B Testing**: Compare versions
- **Performance Metrics**: Track effectiveness

### Library
- **Public Templates**: Community-shared templates
- **Private Library**: Your organization's templates
- **Import/Export**: Move templates between environments
- **Template Marketplace**: Buy/sell templates

## Creating Templates

### Template Builder
Use our visual builder:

1. Navigate to **Templates** → **Create New**
2. Choose template type:
   - System prompts
   - User prompts
   - Chain templates
   - Function calling

3. Define variables:
   \`\`\`
   {{user_name}} - User's name
   {{context}} - Dynamic context
   {{language}} - Target language
   \`\`\`

4. Optimize and save

### Via Code
\`\`\`javascript
const template = await ck.templates.create({
  name: 'Customer Support Response',
  prompt: 'You are a helpful assistant. User: {{query}}',
  variables: ['query'],
  model: 'gpt-3.5-turbo',
  max_tokens: 150
});

// Use template
const response = await ck.templates.run(template.id, {
  variables: { query: 'How do I reset my password?' }
});
\`\`\`

## Template Optimization

### Automatic Optimization
Our AI optimizes templates by:

- **Compression**: Reduce token count
- **Clarity**: Improve instruction clarity
- **Structure**: Optimize prompt structure
- **Examples**: Add/remove examples

### Manual Optimization
Tools for fine-tuning:

- **Token Counter**: Real-time token counting
- **Cost Calculator**: Estimate costs
- **Preview Mode**: Test with sample data
- **Diff Viewer**: Compare versions

![AI Prompt Intelligence](/assets/prompt_intelligence_3.png)

## Template Library

### Categories
- **Customer Support**: Response templates
- **Content Creation**: Blog, social media
- **Code Generation**: Programming templates
- **Data Analysis**: Analysis prompts
- **Translation**: Multi-language templates

### Sharing & Collaboration
- **Team Libraries**: Share within organization
- **Public Sharing**: Contribute to community
- **Template Rating**: Rate and review
- **Fork & Modify**: Build on others' work

## Best Practices

### Template Design
- Keep templates focused
- Use clear variable names
- Include examples
- Document usage

### Version Management
- Tag stable versions
- Test before deploying
- Keep changelog
- Archive old versions

### Performance
- Monitor template performance
- A/B test variations
- Track cost per use
- Optimize regularly`}
  />
);

export const WorkflowsPage = () => (
  <DocumentationPage
    title="Workflows"
    description="Multi-step AI operation monitoring and optimization"
    prevPage={{ path: '/features/templates', label: 'Previous: Prompt Templates' }}
    nextPage={{ path: '/features/gateway', label: 'Next: Gateway & Proxy' }}
    fallbackContent={`# Workflow Management

Design, monitor, and optimize multi-step AI workflows for complex operations.

![Workflow Visual Designer](/assets/workflows_1.png)

## Workflow Features

### Visual Designer
- **Drag-and-Drop Interface**: Build workflows visually
- **Pre-built Components**: Ready-to-use blocks
- **Conditional Logic**: If/then branches
- **Loops & Iterations**: Process lists and data

![Workflow Monitoring Dashboard](/assets/workflows_2.png)

### Execution Engine
- **Parallel Processing**: Run steps simultaneously
- **Error Handling**: Automatic retries and fallbacks
- **State Management**: Maintain context across steps
- **Queue System**: Handle high volumes

### Monitoring
- **Real-time Tracking**: See workflows in action
- **Step Metrics**: Time and cost per step
- **Bottleneck Detection**: Identify slow points
- **Success Rates**: Track completion rates

## Building Workflows

### Visual Builder
1. Open **Workflows** → **Create New**
2. Drag components from the palette:
   - AI Model calls
   - Data transformations
   - Conditionals
   - External APIs

3. Connect components with arrows
4. Configure each step
5. Test and deploy

### Code-Based
\`\`\`javascript
const workflow = await ck.workflows.create({
  name: 'Document Processing',
  steps: [
    {
      id: 'extract',
      type: 'ai_call',
      model: 'gpt-4',
      prompt: 'Extract key points from: {{document}}'
    },
    {
      id: 'summarize',
      type: 'ai_call',
      model: 'gpt-3.5-turbo',
      prompt: 'Summarize: {{extract.output}}',
      depends_on: ['extract']
    },
    {
      id: 'translate',
      type: 'parallel',
      steps: [
        { model: 'gpt-3.5', prompt: 'Translate to Spanish' },
        { model: 'gpt-3.5', prompt: 'Translate to French' }
      ],
      depends_on: ['summarize']
    }
  ]
});
\`\`\`

## Workflow Optimization

### Cost Optimization
- **Model Selection**: Choose optimal models per step
- **Caching**: Cache intermediate results
- **Batch Processing**: Group similar operations
- **Skip Logic**: Avoid unnecessary steps

### Performance Tuning
- **Parallelization**: Run independent steps simultaneously
- **Timeout Settings**: Prevent hanging workflows
- **Resource Allocation**: Optimize compute resources
- **Priority Queues**: Handle urgent workflows first

## Monitoring & Analytics

### Dashboard
- **Active Workflows**: Currently running
- **Completed**: Success/failure rates
- **Performance Metrics**: Average duration
- **Cost Analysis**: Spending per workflow

### Alerts
- **Failure Notifications**: Immediate alerts
- **SLA Monitoring**: Track service levels
- **Cost Warnings**: Budget threshold alerts
- **Performance Degradation**: Slowdown detection

## Advanced Features

### Integrations
- **Webhooks**: Trigger from external events
- **APIs**: Call external services
- **Databases**: Read/write data
- **File Storage**: Process documents

### Scheduling
- **Cron Jobs**: Regular execution
- **Event-Driven**: Trigger on events
- **Batch Windows**: Process during off-peak
- **Rate Limiting**: Control execution rate

### Version Control
- **Workflow Versions**: Track changes
- **Rollback**: Revert to previous versions
- **A/B Testing**: Test workflow variations
- **Staging**: Test before production`}
  />
);

export const GatewayPage = () => (
  <DocumentationPage
    title="Gateway & Proxy"
    description="Unified API gateway for all AI providers"
    prevPage={{ path: '/features/workflows', label: 'Previous: Workflows' }}
    nextPage={{ path: '/features/key-vault', label: 'Next: Key Vault' }}
    fallbackContent={`# Gateway & Proxy

Use Cost Katana as a unified gateway for all your AI providers with built-in optimization.

![API Gateway Dashboard](/assets/gateway_1.png)

## Gateway Features

### Unified Endpoint
- **Single API**: One endpoint for all providers
- **Provider Routing**: Automatic provider selection
- **Format Translation**: Convert between formats
- **Protocol Support**: REST, WebSocket, GraphQL

![Gateway Configuration](/assets/gateway_2.png)

### Load Balancing
- **Round Robin**: Distribute requests evenly
- **Weighted**: Prioritize providers
- **Least Cost**: Route to cheapest option
- **Performance-Based**: Route by latency

### Failover & Reliability
- **Automatic Failover**: Switch providers on failure
- **Retry Logic**: Smart retry strategies
- **Circuit Breaker**: Prevent cascade failures
- **Health Checks**: Monitor provider status

## Setup

### Quick Start
\`\`\`bash
# Point your API calls to Cost Katana
export AI_ENDPOINT="https://gateway.costkatana.com/v1"
export API_KEY="ck_your_key_here"
\`\`\`

### Configuration
\`\`\`javascript
// Configure gateway behavior
const gateway = new CostKatanaGateway({
  apiKey: 'ck_your_key',
  routing: {
    strategy: 'least_cost',
    providers: ['openai', 'anthropic', 'bedrock'],
    fallback: 'openai'
  },
  optimization: {
    cache: true,
    compress: true,
    batch: true
  }
});
\`\`\`

## Routing Strategies

### Cost-Based Routing
Route to the most cost-effective provider:

\`\`\`javascript
{
  strategy: 'least_cost',
  constraints: {
    max_latency: 1000, // ms
    min_quality: 0.9
  }
}
\`\`\`

### Performance Routing
Route based on response time:

\`\`\`javascript
{
  strategy: 'fastest',
  constraints: {
    max_cost: 0.10 // per request
  }
}
\`\`\`

### Custom Rules
Define your own routing logic:

\`\`\`javascript
{
  strategy: 'custom',
  rules: [
    { if: 'task === "code"', then: 'anthropic' },
    { if: 'task === "creative"', then: 'openai' },
    { if: 'urgent === true', then: 'fastest' }
  ]
}
\`\`\`

## Optimization Features

### Request Optimization
- **Prompt Compression**: Reduce tokens automatically
- **Batching**: Combine multiple requests
- **Caching**: Store and reuse responses
- **Deduplication**: Eliminate duplicate requests

### Response Enhancement
- **Format Conversion**: Transform responses
- **Error Handling**: Standardized error format
- **Metadata Injection**: Add tracking info
- **Compression**: Reduce bandwidth usage

## Monitoring

### Real-time Metrics
- **Request Volume**: Requests per second
- **Latency**: Response time by provider
- **Error Rates**: Failure tracking
- **Cost Tracking**: Real-time spending

### Analytics
- **Provider Performance**: Compare providers
- **Route Analysis**: See routing decisions
- **Cost Breakdown**: Detailed cost analysis
- **Usage Patterns**: Understand traffic

## Security

### Authentication
- **API Key Management**: Secure key storage
- **JWT Support**: Token-based auth
- **OAuth Integration**: SSO support
- **IP Whitelisting**: Restrict access

### Data Protection
- **Encryption**: TLS 1.3 for transit
- **PII Redaction**: Remove sensitive data
- **Audit Logging**: Complete audit trail
- **Compliance**: GDPR, SOC2 compliant`}
  />
);

export const KeyVaultPage = () => (
  <DocumentationPage
    title="Key Vault"
    description="Secure API key management and rotation"
    prevPage={{ path: '/features/gateway', label: 'Previous: Gateway & Proxy' }}
    nextPage={{ path: '/features/alerts', label: 'Next: Alerts' }}
    fallbackContent={`# Key Vault

Securely manage, rotate, and audit your AI provider API keys.

![Key Vault Dashboard](/assets/key_vault_1.png)

## Key Management

### Secure Storage
- **Encryption**: AES-256 encryption at rest
- **HSM Support**: Hardware security modules
- **Key Isolation**: Separated by environment
- **Access Control**: Role-based permissions

![Key Management Interface](/assets/key_vault_2.png)

### Key Rotation
- **Automatic Rotation**: Schedule key updates
- **Zero-Downtime**: Seamless key switching
- **Versioning**: Track key history
- **Rollback**: Revert if issues occur

### Multi-Provider
- **Provider Keys**: Store all provider keys
- **Unified Access**: Single vault for all
- **Provider Limits**: Track usage limits
- **Cost Attribution**: Map keys to budgets

## Adding Keys

### Via Dashboard
1. Navigate to **Key Vault** → **Add Key**
2. Select provider (OpenAI, Anthropic, etc.)
3. Enter key details:
   - Key name/alias
   - API key value
   - Environment (dev/staging/prod)
   - Usage limits

4. Set permissions and save

### Via API
\`\`\`javascript
// Add a new API key
const key = await ck.vault.addKey({
  provider: 'openai',
  name: 'Production Key',
  value: 'sk-...',
  environment: 'production',
  limits: {
    monthly_spend: 1000,
    requests_per_minute: 100
  }
});

// Use the key
const response = await ck.chat.completions.create({
  model: 'gpt-4',
  messages: [...],
  key_id: key.id // Use specific key
});
\`\`\`

## Key Rotation

### Manual Rotation
\`\`\`javascript
// Rotate a key
await ck.vault.rotateKey(keyId, {
  new_value: 'sk-new-key...',
  grace_period: 300 // 5 minutes overlap
});
\`\`\`

### Automatic Rotation
Set up scheduled rotation:

\`\`\`javascript
await ck.vault.setRotationPolicy({
  key_id: keyId,
  schedule: 'monthly',
  notification: 'email',
  auto_generate: true // If provider supports
});
\`\`\`

## Access Control

### Permissions
- **Read**: View key metadata
- **Use**: Make API calls with key
- **Manage**: Add, update, delete keys
- **Audit**: View key usage logs

### Team Access
\`\`\`javascript
// Grant team access
await ck.vault.grantAccess({
  key_id: keyId,
  team_id: 'engineering',
  permissions: ['read', 'use']
});
\`\`\`

## Monitoring & Audit

### Usage Tracking
- **Request Count**: Calls per key
- **Cost Tracking**: Spending per key
- **Error Rates**: Failures by key
- **Limit Monitoring**: Approaching limits

### Audit Logs
- **Access Logs**: Who used which key
- **Change History**: Key modifications
- **Failed Attempts**: Security monitoring
- **Compliance Reports**: Audit trail

## Security Features

### Protection
- **Rate Limiting**: Per-key limits
- **IP Restrictions**: Whitelist IPs
- **Time Restrictions**: Valid time windows
- **Geographic Limits**: Region restrictions

### Compliance
- **SOC2 Type II**: Certified compliant
- **GDPR**: Data protection compliant
- **Encryption**: Industry standard
- **Audit Trail**: Complete history

## Best Practices

### Key Organization
- Separate keys by environment
- Use descriptive names
- Tag keys appropriately
- Regular cleanup

### Security
- Rotate keys regularly
- Use least privilege
- Monitor unusual activity
- Enable MFA for vault access

### Cost Management
- Set spending limits per key
- Monitor key usage
- Consolidate where possible
- Review unused keys`}
  />
);

export const AlertsPage = () => (
  <DocumentationPage
    title="Alerts & Notifications"
    description="Proactive monitoring and intelligent alerting"
    prevPage={{ path: '/features/key-vault', label: 'Previous: Key Vault' }}
    nextPage={{ path: '/features/training', label: 'Next: Training' }}
    fallbackContent={`# Alerts & Notifications

Set up intelligent alerts to monitor costs, usage, and performance.

![Alert Configuration Dashboard](/assets/alert_1.png)

## Alert Types

### Cost Alerts
- **Budget Threshold**: Alert at 50%, 80%, 90%
- **Daily Spend**: Maximum daily spending
- **Unusual Activity**: Spike detection
- **Forecast Alerts**: Predicted overruns

![Alert Management System](/assets/alert_2.png)

### Usage Alerts
- **Rate Limits**: Approaching API limits
- **Token Limits**: High token usage
- **Request Volume**: Unusual activity
- **Error Rates**: High failure rates

### Performance Alerts
- **Latency**: Response time degradation
- **Availability**: Provider downtime
- **Quality**: Output quality issues
- **SLA Violations**: Service level breaches

## Setting Up Alerts

### Quick Setup
\`\`\`javascript
// Create a budget alert
await ck.alerts.create({
  type: 'budget',
  threshold: 80, // 80% of budget
  project: 'production',
  channels: ['email', 'slack'],
  actions: ['notify', 'throttle']
});

// Create usage alert
await ck.alerts.create({
  type: 'rate_limit',
  threshold: 90, // 90% of limit
  provider: 'openai',
  channels: ['webhook'],
  webhook_url: 'https://your-app.com/webhook'
});
\`\`\`

### Advanced Configuration
\`\`\`javascript
await ck.alerts.create({
  name: 'High Cost Per Request',
  condition: {
    metric: 'cost_per_request',
    operator: 'greater_than',
    value: 0.50,
    window: '5m' // 5 minute window
  },
  severity: 'critical',
  channels: ['email', 'sms', 'slack'],
  actions: [
    { type: 'notify' },
    { type: 'switch_model', to: 'gpt-3.5-turbo' },
    { type: 'throttle', limit: 10 }
  ],
  cooldown: 300 // 5 minutes between alerts
});
\`\`\`

## Notification Channels

### Email
- **Instant Alerts**: Real-time notifications
- **Daily Digests**: Summary emails
- **Weekly Reports**: Comprehensive analysis
- **Custom Templates**: Branded emails

### Slack
\`\`\`javascript
// Configure Slack integration
await ck.integrations.slack.connect({
  webhook_url: 'https://hooks.slack.com/...',
  channel: '#ai-costs',
  username: 'Cost Katana Bot'
});
\`\`\`

### Webhooks
\`\`\`javascript
// Webhook payload example
{
  "alert_id": "alt_123",
  "type": "budget_threshold",
  "severity": "warning",
  "message": "Project X at 80% of budget",
  "details": {
    "current_spend": 800,
    "budget": 1000,
    "projection": 1200
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

### Other Channels
- **SMS**: Critical alerts
- **PagerDuty**: Incident management
- **Microsoft Teams**: Team notifications
- **Discord**: Community alerts

## Alert Actions

### Automatic Responses
Define automated actions when alerts trigger:

#### Throttling
\`\`\`javascript
{
  action: 'throttle',
  config: {
    requests_per_minute: 10,
    duration: 3600 // 1 hour
  }
}
\`\`\`

#### Model Switching
\`\`\`javascript
{
  action: 'switch_model',
  config: {
    from: 'gpt-4',
    to: 'gpt-3.5-turbo',
    revert_after: 3600
  }
}
\`\`\`

#### Circuit Breaker
\`\`\`javascript
{
  action: 'circuit_breaker',
  config: {
    provider: 'openai',
    duration: 300,
    fallback: 'anthropic'
  }
}
\`\`\`

## Alert Management

### Dashboard
- **Active Alerts**: Currently triggered
- **Alert History**: Past notifications
- **Acknowledgment**: Mark as read/resolved
- **Suppression**: Temporary muting

### Escalation
- **Severity Levels**: Info, Warning, Critical
- **Escalation Paths**: Chain of notification
- **On-Call Rotation**: Team scheduling
- **SLA Tracking**: Response time monitoring

## Best Practices

### Alert Design
- Start with conservative thresholds
- Use multiple warning levels
- Avoid alert fatigue
- Test alerts regularly

### Response Planning
- Document response procedures
- Assign clear owners
- Set up escalation paths
- Regular alert reviews`}
  />
);


// API Documentation Pages
export const APIOverviewPage = () => (
  <DocumentationPage
    title="API Overview"
    description="Complete API reference for Cost Katana"
  />
);

export const AuthenticationPage = () => (
  <DocumentationPage
    title="Authentication"
    description="JWT and API key authentication methods"
    prevPage={{ path: '/api', label: 'Back to API Overview' }}
    nextPage={{ path: '/api/usage', label: 'Next: Usage API' }}
    fallbackContent={`# Authentication

Cost Katana supports multiple authentication methods for secure API access.

## API Keys

### Creating API Keys
Generate keys in your dashboard:

1. Navigate to **Settings** → **API Keys**
2. Click **Generate New Key**
3. Set permissions and limits
4. Copy and store securely

### Using API Keys
Include your key in requests:

\`\`\`bash
# Header authentication (recommended)
curl -H "Authorization: Bearer ck_your_api_key" \\
  https://cost-katana-backend.store/v1/usage

# Query parameter (less secure)
curl https://cost-katana-backend.store/v1/usage?api_key=ck_your_api_key
\`\`\`

### Key Types
- **Master Keys**: Full account access
- **Project Keys**: Limited to specific projects
- **Read-Only Keys**: View-only access
- **Gateway Keys**: For proxy usage only

## JWT Authentication

### Login Flow
\`\`\`javascript
// Obtain JWT token
const response = await fetch('https://cost-katana-backend.store/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'your_password'
  })
});

const { token } = await response.json();

// Use token in subsequent requests
const data = await fetch('https://cost-katana-backend.store/v1/usage', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});
\`\`\`

### Token Refresh
\`\`\`javascript
// Refresh expired token
const response = await fetch('https://cost-katana-backend.store/v1/auth/refresh', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${refreshToken}\`
  }
});

const { token, refreshToken: newRefreshToken } = await response.json();



## Security Best Practices

### Key Management
- Never commit keys to version control
- Rotate keys regularly
- Use environment variables
- Implement key expiration

### Request Signing
For additional security, sign requests:

\`\`\`javascript
const crypto = require('crypto');

function signRequest(payload, secret) {
  const signature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return signature;
}

// Include signature in request
const signature = signRequest(data, apiSecret);
headers['X-Signature'] = signature;
\`\`\`

### Rate Limiting
- Default: 100 requests/minute
- Increased limits for premium plans
- Custom limits available

### IP Whitelisting
Restrict API access by IP:

\`\`\`javascript
await ck.security.addWhitelist({
  ips: ['192.168.1.1', '10.0.0.0/24'],
  keys: ['ck_specific_key']
});
\`\`\``}
  />
);

// Tracing Feature Page
export const TracingPage = () => (
  <DocumentationPage
    title="Distributed Tracing"
    description="Enterprise-grade distributed tracing for AI operations"
    prevPage={{ path: '/features/training', label: 'Previous: Training & Fine-tuning' }}
    nextPage={{ path: '/api', label: 'Next: API Reference' }}
    fallbackContent={`# Distributed Tracing

Cost Katana provides enterprise-grade distributed tracing for all your AI operations. Track every LLM call, tool execution, and API request with automatic parent-child relationships, latency metrics, and cost attribution.

![Sessions Overview](/assets/sessions_1.png)

## Features

### 🌳 Hierarchical Traces
- **Automatic Span Relationships**: Parent-child trace relationships
- **Trace Trees**: Visualize complex workflows
- **Session Grouping**: Group related operations
- **Depth Tracking**: Understand call stack depth

### ⚡ Zero-Code Instrumentation
- **Express Middleware**: One line to add tracing
- **Auto-instrumentation**: Automatic for all requests
- **Context Propagation**: Seamless trace context flow
- **Session Management**: Automatic session creation

### 💰 Cost Attribution
- **Per-Span Costs**: Track cost at every level
- **Token Counting**: Input/output token metrics
- **Model Attribution**: Cost by model and provider
- **Budget Tracking**: Real-time budget monitoring

### 📊 Visual Timeline
- **Interactive Visualization**: Drag, zoom, filter
- **Gantt Charts**: See parallel operations
- **Latency Analysis**: Identify bottlenecks
- **Critical Path**: Find optimization opportunities

### 🔒 PII Redaction
- **Automatic Sanitization**: Server-side redaction
- **Configurable Rules**: Custom sensitive keys
- **Compliance Ready**: GDPR/CCPA compliant
- **Audit Trails**: Track redaction events

## Getting Started

### 1. Add Middleware

\`\`\`javascript
import { LocalTraceService, createTraceMiddleware } from 'ai-cost-tracker/trace';

// Create trace service
const traceService = new LocalTraceService({
  storageMode: 'file',
  storageDir: './traces'
});

// Add to Express app
app.use(createTraceMiddleware({
  startSpan: traceService.startSpan.bind(traceService),
  endSpan: traceService.endSpan.bind(traceService)
}));
\`\`\`

### 2. Use Tracked Providers

\`\`\`javascript
import { TrackedOpenAI } from 'ai-cost-tracker/trace';

const ai = new TrackedOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  traceContext: req.traceContext,
  startSpan: traceService.startSpan.bind(traceService),
  endSpan: traceService.endSpan.bind(traceService)
});

// All calls are automatically traced!
const response = await ai.makeRequest({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }]
});
\`\`\`

### 3. View Traces

Navigate to the Sessions page in your Cost Katana dashboard to:
- View all sessions with filters
- Explore trace trees
- Analyze timelines
- Export trace data

## Trace Data Model

### Session
\`\`\`typescript
{
  sessionId: string;
  userId?: string;
  label?: string;
  status: 'active' | 'completed' | 'error';
  totalSpans: number;
  totalCostUSD: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  startedAt: Date;
  endedAt?: Date;
}
\`\`\`

### Trace (Span)
\`\`\`typescript
{
  traceId: string;
  sessionId: string;
  parentId?: string;
  name: string;
  type: 'http' | 'llm' | 'tool' | 'retrieval' | 'custom';
  status: 'pending' | 'ok' | 'error';
  model?: string;
  tokens?: { input: number; output: number };
  costUSD?: number;
  startedAt: Date;
  endedAt?: Date;
  duration?: number;
  depth: number;
}
\`\`\`

## Custom Spans

Track any operation with custom spans:

\`\`\`javascript
// Start a custom span
const span = await traceService.startSpan({
  sessionId: req.traceContext.sessionId,
  parentId: req.traceContext.traceId,
  name: 'database-query',
  type: 'tool',
  metadata: { query: 'SELECT * FROM users' }
});

// Your custom logic
const result = await db.query('...');

// End the span with metrics
await traceService.endSpan(span.traceId, {
  status: 'ok',
  metadata: { rowCount: result.rows.length }
});
\`\`\`

## Storage Options

### Local Development
\`\`\`javascript
const traceService = new LocalTraceService({
  storageMode: 'memory',
  maxSessions: 1000,
  autoSave: true
});
\`\`\`

### Production (Cloud)
\`\`\`javascript
import { TraceClient } from 'ai-cost-tracker/trace';

const traceService = new TraceClient({
  apiKey: process.env.API_KEY,
  projectId: process.env.PROJECT_ID
});
\`\`\`

## Best Practices

1. **Use Session IDs**: Pass \`x-session-id\` header to group related requests
2. **Add Metadata**: Include relevant context in spans
3. **Handle Errors**: Always end spans even on error
4. **Monitor Performance**: Use trace data to identify bottlenecks
5. **Set Budgets**: Monitor totalCostUSD to stay within budget
6. **Clean Up**: Call \`destroy()\` on LocalTraceService when shutting down

## Advanced Features

### Sampling
Control trace sampling for high-volume applications:

\`\`\`javascript
const traceService = new LocalTraceService({
  samplingRate: 0.1, // Sample 10% of requests
  alwaysSample: ['error', 'slow'] // Always trace errors and slow requests
});
\`\`\`

### Export & Import
Export traces for analysis or migration:

\`\`\`javascript
// Export traces
const traces = await traceService.export({
  format: 'opentelemetry',
  sessionId: 'session_123'
});

// Import traces
await traceService.import(traces);
\`\`\`

### Alerting
Set up alerts for trace anomalies:

\`\`\`javascript
traceService.addAlert({
  condition: 'latency > 5000',
  action: 'notify',
  channel: 'slack'
});
\`\`\`

## Performance Impact

Tracing adds minimal overhead:
- **Latency**: < 1ms per span
- **Memory**: ~1KB per span
- **Storage**: ~2KB per span (compressed)
- **Network**: Batched async uploads

## Troubleshooting

### Missing Traces
- Verify middleware is added before routes
- Check traceContext is passed to providers
- Ensure service is started before requests

### High Memory Usage
- Reduce maxSessions in LocalTraceService
- Enable autoSave for file persistence
- Use sampling for high-volume apps

### PII Concerns
- Configure redactKeys for custom fields
- Use redactedContent in UI
- Enable audit logging for compliance`}
  />
);

export const UsageAPIPage = () => (
  <DocumentationPage
    title="Usage API"
    description="Track AI usage programmatically"
    prevPage={{ path: '/api/authentication', label: 'Previous: Authentication' }}
    nextPage={{ path: '/api/analytics', label: 'Next: Analytics API' }}
    fallbackContent={`# Usage API

The Usage API allows you to track and manage AI API usage across all providers programmatically.

## Endpoints

### Track Usage

\`POST /api/usage/track\`

Track a single AI API call:

\`\`\`json
{
  "provider": "openai",
  "model": "gpt-4",
  "promptTokens": 150,
  "completionTokens": 50,
  "totalTokens": 200,
  "cost": 0.012,
  "projectId": "proj_123",
  "metadata": {
    "requestId": "req_456",
    "userId": "user_789"
  }
}
\`\`\`

### Track SDK Usage

\`POST /api/usage/track-sdk\`

Track usage from SDK integrations with additional metadata.

### Get Usage Statistics

\`GET /api/usage/stats\`

Query parameters:
- \`startDate\`: ISO 8601 date string
- \`endDate\`: ISO 8601 date string
- \`projectId\`: Filter by project
- \`provider\`: Filter by provider
- \`model\`: Filter by model
- \`period\`: day | week | month

Response:
\`\`\`json
{
  "success": true,
  "data": {
    "totalCost": 1234.56,
    "totalTokens": 5000000,
    "totalRequests": 10000,
    "breakdown": [
      {
        "date": "2025-01-01",
        "cost": 123.45,
        "tokens": 500000,
        "requests": 1000
      }
    ]
  }
}
\`\`\`

### Get Usage by Project

\`GET /api/usage/project/:projectId\`

Get detailed usage for a specific project.

### Get Real-time Usage

\`GET /api/usage/realtime/summary\`

Get real-time usage summary.

\`GET /api/usage/realtime/requests\`

Get real-time request data.

### Get Usage Analytics

\`GET /api/usage/analytics\`

Get comprehensive usage analytics with AI insights.

### Export Usage Data

\`GET /api/usage/export\`

Export usage data in various formats:

Query parameters:
- \`format\`: csv | json | excel
- \`startDate\`: Start date
- \`endDate\`: End date
- \`projectId\`: Optional project filter

## SDK Examples

### JavaScript/TypeScript

\`\`\`typescript
import { CostKatanaClient } from '@costkatana/sdk';

const client = new CostKatanaClient({
  apiKey: process.env.API_KEY
});

// Track usage
await client.usage.track({
  provider: 'openai',
  model: 'gpt-4',
  promptTokens: 150,
  completionTokens: 50,
  cost: 0.012
});

// Get statistics
const stats = await client.usage.getStats({
  startDate: '2025-01-01',
  endDate: '2025-01-31',
  groupBy: 'day'
});
\`\`\`

### Python

\`\`\`python
from costkatana import CostKatanaClient

client = CostKatanaClient(api_key='your_api_key')

# Track usage
client.usage.track(
    provider='openai',
    model='gpt-4',
    prompt_tokens=150,
    completion_tokens=50,
    cost=0.012
)

# Get statistics
stats = client.usage.get_stats(
    start_date='2025-01-01',
    end_date='2025-01-31',
    group_by='day'
)
\`\`\`

## Rate Limits

- **Track Usage**: 1000 requests per minute
- **Get Statistics**: 100 requests per minute
- **Bulk Operations**: 10 requests per minute

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Invalid request parameters |
| 401 | Invalid or missing API key |
| 403 | Insufficient permissions |
| 429 | Rate limit exceeded |
| 500 | Internal server error |`}
  />
);

export const AnalyticsAPIPage = () => (
  <DocumentationPage
    title="Analytics API"
    description="Retrieve analytics data via API"
    prevPage={{ path: '/api/usage', label: 'Previous: Usage API' }}
    nextPage={{ path: '/api/projects', label: 'Next: Projects API' }}
    fallbackContent={`# Analytics API

Access comprehensive analytics data for AI usage, costs, and performance metrics.

## Endpoints

### Get Analytics Data

\`GET /api/analytics\`

Query parameters:
- \`startDate\`: Start date (ISO 8601)
- \`endDate\`: End date (ISO 8601)
- \`groupBy\`: provider | model | project | user
- \`period\`: hour | day | week | month | year

### Get Dashboard Data

\`GET /api/analytics/dashboard\`

Get comprehensive dashboard analytics:

\`\`\`json
{
  "success": true,
  "data": {
    "totalCost": 12345.67,
    "totalRequests": 100000,
    "totalTokens": 50000000,
    "avgResponseTime": 250,
    "errorRate": 0.02,
    "topModels": [
      {
        "model": "gpt-4",
        "usage": 45.5,
        "cost": 5000.00
      }
    ],
    "costTrend": {
      "daily": 2.5,
      "weekly": 15.3,
      "monthly": 8.7
    }
  }
}
\`\`\`

### Get Project Analytics

\`GET /api/analytics/projects/:projectId\`

Get analytics for a specific project.

### Compare Projects

\`GET /api/analytics/projects/compare\`

Compare analytics across multiple projects.

### Get Insights

\`GET /api/analytics/insights\`

AI-powered optimization recommendations:

\`\`\`json
{
  "success": true,
  "data": {
    "potentialSavings": 2500.00,
    "recommendations": [
      {
        "type": "model_switch",
        "description": "Switch GPT-4 to Claude-3-haiku for simple tasks",
        "estimatedSavings": 1000.00,
        "impact": "low"
      }
    ]
  }
}
\`\`\`

### Get Feedback Analytics

\`GET /api/analytics/feedback\`

Get Return on AI Spend (ROAS) analytics.

### Get Recent Usage

\`GET /api/analytics/recent-usage\`

Get recent usage patterns and trends.

### Export Analytics

\`GET /api/analytics/export\`

Export analytics data:

Query parameters:
- \`format\`: csv | json | excel
- \`startDate\`: Start date
- \`endDate\`: End date

## SDK Examples

### JavaScript/TypeScript

\`\`\`typescript
const analytics = await client.analytics.getSummary({
  dateRange: 'last_30_days'
});

const costs = await client.analytics.getCosts({
  startDate: '2025-01-01',
  endDate: '2025-01-31',
  groupBy: 'model'
});
\`\`\`

### Python

\`\`\`python
analytics = client.analytics.get_summary(
    date_range='last_30_days'
)

costs = client.analytics.get_costs(
    start_date='2025-01-01',
    end_date='2025-01-31',
    group_by='model'
)
\`\`\``}
  />
);

export const ProjectsAPIPage = () => (
  <DocumentationPage
    title="Projects API"
    description="Manage projects programmatically"
    prevPage={{ path: '/api/analytics', label: 'Previous: Analytics API' }}
    nextPage={{ path: '/api/optimization', label: 'Next: Optimization API' }}
    fallbackContent={`# Projects API

Create and manage projects for organizing AI usage and costs.

## Endpoints

### List Projects

\`GET /api/projects\`

Returns all projects for the authenticated user.

### Create Project

\`POST /api/projects\`

Create a new project:

\`\`\`json
{
  "name": "Production API",
  "description": "Main production AI endpoints",
  "budget": {
    "amount": 5000.00,
    "period": "monthly",
    "currency": "USD"
  },
  "tags": ["production", "critical"],
  "settings": {
    "defaultModel": "gpt-4",
    "maxTokens": 2000,
    "rateLimit": 100
  }
}
\`\`\`

### Get Project Details

\`GET /api/projects/:projectId\`

Returns detailed information about a specific project.

### Update Project

\`PUT /api/projects/:projectId\`

Update project settings, budget, or metadata.

### Delete Project

\`DELETE /api/projects/:projectId\`

Delete a project (requires admin permissions).

### Get Project Analytics

\`GET /api/projects/:projectId/analytics\`

Get analytics for a specific project.

### Get Cost Allocation

\`GET /api/projects/:projectId/cost-allocation\`

Get cost allocation breakdown.

### Export Project Data

\`GET /api/projects/:projectId/export\`

Export project data in various formats.

### Add Project Member

\`POST /api/projects/:projectId/members\`

Add a team member to the project:

\`\`\`json
{
  "email": "user@example.com",
  "role": "viewer",
  "permissions": ["read", "analyze"]
}
\`\`\`

## SDK Examples

### JavaScript/TypeScript

\`\`\`typescript
// Create project
const project = await client.projects.create({
  name: 'Production API',
  budget: { monthly: 5000 }
});

// Get usage
const usage = await client.projects.getUsage(project.id);

// Add member
await client.projects.addMember(project.id, {
  email: 'team@example.com',
  role: 'editor'
});
\`\`\`

### Python

\`\`\`python
# Create project
project = client.projects.create(
    name='Production API',
    budget={'monthly': 5000}
)

# Get usage
usage = client.projects.get_usage(project.id)

# Add member
client.projects.add_member(
    project.id,
    email='team@example.com',
    role='editor'
)
\`\`\``}
  />
);

export const OptimizationAPIPage = () => (
  <DocumentationPage
    title="Optimization API"
    description="Access AI optimization features via API"
    prevPage={{ path: '/api/projects', label: 'Previous: Projects API' }}
    nextPage={{ path: '/api/webhooks', label: 'Next: Webhooks' }}
    fallbackContent={`# Optimization API

Programmatically access Cost Katana's AI optimization features.

## Endpoints

### Get Optimization Suggestions

\`GET /api/optimizations\`

Get AI-powered optimization suggestions based on your usage patterns.

### Optimize Prompt

\`POST /api/optimizations/prompt\`

Optimize a prompt for reduced token usage:

\`\`\`json
{
  "prompt": "Your original prompt here",
  "model": "gpt-4",
  "optimizationGoal": "cost",
  "preserveIntent": true
}
\`\`\`

Response:
\`\`\`json
{
  "success": true,
  "data": {
    "originalTokens": 150,
    "optimizedTokens": 75,
    "savingsPercent": 50,
    "optimizedPrompt": "Optimized version of prompt",
    "quality_score": 0.95
  }
}
\`\`\`

### Batch Optimization

\`POST /api/optimizations/batch\`

Optimize multiple prompts at once.

### Get Optimization Opportunities

\`GET /api/optimizations/opportunities\`

Analyze and identify optimization opportunities in your usage patterns.

### Get Optimization History

\`GET /api/optimizations/history/:promptHash\`

Get optimization history for a specific prompt.

### Apply Optimization

\`POST /api/optimizations/:id/apply\`

Apply a suggested optimization.

### Revert Optimization

\`POST /api/optimizations/:id/revert\`

Revert an applied optimization.

### Get Model Recommendations

\`GET /api/optimizations/config\`

Get the best model for your use case:

\`\`\`json
{
  "task": "text_generation",
  "requirements": {
    "maxLatency": 1000,
    "minQuality": 0.8,
    "budget": 0.10
  },
  "prompt": "Sample prompt"
}
\`\`\`

### Batch Optimization

\`POST /api/v1/optimization/batch\`

Optimize multiple prompts at once:

\`\`\`json
{
  "prompts": [
    "First prompt",
    "Second prompt"
  ],
  "model": "gpt-4",
  "strategy": "aggressive"
}
\`\`\`

### Get Optimization History

\`GET /api/v1/optimization/history\`

View past optimizations and their results.

## Optimization Strategies

- **Conservative**: Minimal changes, preserve exact meaning
- **Balanced**: Moderate optimization, maintain intent
- **Aggressive**: Maximum reduction, core meaning only

## SDK Examples

### JavaScript/TypeScript

\`\`\`typescript
// Optimize prompt
const result = await client.optimization.optimizePrompt({
  prompt: 'Your detailed prompt here',
  model: 'gpt-4',
  goal: 'cost'
});

// Get recommendations
const recommendation = await client.optimization.recommendModel({
  task: 'summarization',
  requirements: {
    maxLatency: 500,
    budget: 0.05
  }
});
\`\`\`

### Python

\`\`\`python
# Optimize prompt
result = client.optimization.optimize_prompt(
    prompt='Your detailed prompt here',
    model='gpt-4',
    goal='cost'
)

# Get recommendations
recommendation = client.optimization.recommend_model(
    task='summarization',
    requirements={
        'max_latency': 500,
        'budget': 0.05
    }
)
\`\`\``}
  />
);

export const WebhooksPage = () => (
  <DocumentationPage
    title="Webhooks"
    description="Real-time event notifications"
    prevPage={{ path: '/api/optimization', label: 'Previous: Optimization API' }}
    nextPage={{ path: '/api/rate-limits', label: 'Next: Rate Limits' }}
    fallbackContent={`# Alerts & Notifications API

Configure alerts and notifications for important events.

## Alert Configuration

### Get Alert Settings

\`GET /api/user/alerts/settings\`

Get current alert configuration.

### Update Alert Settings

\`PUT /api/user/alerts/settings\`

Configure alert thresholds and notification preferences:

\`\`\`json
{
  "budgetAlerts": {
    "enabled": true,
    "thresholds": [50, 80, 90, 100],
    "frequency": "daily"
  },
  "anomalyDetection": {
    "enabled": true,
    "sensitivity": "medium"
  },
  "errorAlerts": {
    "enabled": true,
    "errorRateThreshold": 5
  },
  "channels": {
    "email": true,
    "dashboard": true
  }
}
\`\`\`

### Get Alerts

\`GET /api/user/alerts\`

Get all alerts for the authenticated user.

### Mark Alert as Read

\`PUT /api/user/alerts/:id/read\`

Mark a specific alert as read.

### Delete Alert

\`DELETE /api/user/alerts/:id\`

Delete a specific alert.

### Test Alert

\`POST /api/user/alerts/test\`

Send a test alert to verify configuration.

## Real-time Updates

### Server-Sent Events (SSE)

\`GET /api/usage/stream\`

Stream real-time usage updates:

\`\`\`javascript
const eventSource = new EventSource('/api/usage/stream', {
  headers: {
    'Authorization': 'Bearer your-token'
  }
});

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Usage update:', data);
};
\`\`\`

## Available Events

### Cost Events
- \`cost.threshold_reached\`: Budget threshold reached
- \`cost.daily_limit_exceeded\`: Daily spending limit exceeded
- \`cost.anomaly_detected\`: Unusual spending pattern detected

### Usage Events
- \`usage.high_volume\`: High request volume detected
- \`usage.rate_limit_approaching\`: Approaching rate limits
- \`usage.error_spike\`: Error rate spike detected

### System Events
- \`system.api_key_expiring\`: API key expiring soon
- \`system.integration_error\`: Integration error detected
- \`system.maintenance_scheduled\`: Maintenance notification

## Webhook Configuration

### Create Webhook

\`POST /api/v1/webhooks\`

\`\`\`json
{
  "url": "https://your-app.com/webhook",
  "events": ["cost.threshold_reached", "usage.error_spike"],
  "secret": "your_webhook_secret",
  "active": true
}
\`\`\`

### Webhook Payload

All webhooks send POST requests with this structure:

\`\`\`json
{
  "event": "cost.threshold_reached",
  "timestamp": "2025-01-15T10:30:00Z",
  "data": {
    "projectId": "proj_123",
    "threshold": 1000.00,
    "currentSpend": 1050.00,
    "period": "monthly"
  },
  "metadata": {
    "webhookId": "wh_456",
    "attempt": 1
  }
}
\`\`\`

## Webhook Security

### Signature Verification

Verify webhook authenticity using HMAC-SHA256:

\`\`\`javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return hash === signature;
}
\`\`\`

### Retry Policy

- Failed webhooks are retried up to 3 times
- Exponential backoff: 1min, 5min, 15min
- Webhooks disabled after 10 consecutive failures

## Managing Webhooks

### List Webhooks

\`GET /api/v1/webhooks\`

### Update Webhook

\`PUT /api/v1/webhooks/:webhookId\`

### Delete Webhook

\`DELETE /api/v1/webhooks/:webhookId\`

### Test Webhook

\`POST /api/v1/webhooks/:webhookId/test\`

Send a test event to verify configuration.`}
  />
);

export const RateLimitsPage = () => (
  <DocumentationPage
    title="Rate Limits"
    description="API usage limits and quotas"
    prevPage={{ path: '/api/webhooks', label: 'Previous: Webhooks' }}
    fallbackContent={`# Rate Limits

Understanding and managing API rate limits for optimal performance.

## Rate Limit Tiers

### Free Tier
- **Requests**: 100 per minute
- **Tracking**: 1,000 events per hour
- **Analytics**: 10 queries per minute
- **Burst**: 200 requests

### Pro Tier
- **Requests**: 1,000 per minute
- **Tracking**: 10,000 events per hour
- **Analytics**: 100 queries per minute
- **Burst**: 2,000 requests

### Enterprise Tier
- **Requests**: 10,000 per minute
- **Tracking**: Unlimited
- **Analytics**: 1,000 queries per minute
- **Burst**: Custom limits

## Rate Limit Headers

All API responses include rate limit information:

\`\`\`
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1642075200
X-RateLimit-Retry-After: 60
\`\`\`

## Handling Rate Limits

### 429 Response

When rate limited, you'll receive:

\`\`\`json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests",
  "retryAfter": 60,
  "limit": 1000,
  "window": "1m"
}
\`\`\`

### Best Practices

1. **Implement Exponential Backoff**
\`\`\`javascript
async function makeRequestWithRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429) {
        const delay = Math.pow(2, i) * 1000;
        await sleep(delay);
      } else {
        throw error;
      }
    }
  }
}
\`\`\`

2. **Use Batch Operations**
- Combine multiple operations into single requests
- Use bulk endpoints when available
- Queue and batch updates

3. **Cache Responses**
- Cache analytics data for 5 minutes
- Store project information locally
- Use ETags for conditional requests

## Increasing Limits

### Temporary Increases
Contact support for temporary limit increases for:
- Data migrations
- Special events
- Load testing

### Permanent Increases
Upgrade your plan or contact enterprise sales for custom limits.

## Rate Limit Exemptions

Some endpoints are exempt from rate limiting:
- \`GET /api/v1/health\`
- \`GET /api/v1/status\`
- \`POST /api/v1/auth/refresh\`

## Monitoring Usage

Track your API usage in real-time:

\`GET /api/v1/usage/rate-limits\`

\`\`\`json
{
  "current": {
    "requests": 450,
    "limit": 1000,
    "remaining": 550,
    "resetAt": "2025-01-15T10:35:00Z"
  },
  "daily": {
    "requests": 15000,
    "limit": 100000
  }
}
\`\`\``}
  />
);

// Support Pages
export const FAQPage = () => (
  <DocumentationPage
    title="Frequently Asked Questions"
    description="Common questions about Cost Katana"
    fallbackContent={`# Frequently Asked Questions

## General Questions

### What is Cost Katana?

Cost Katana is a comprehensive AI cost optimization and management platform that helps you track, analyze, and reduce your AI API costs across multiple providers including OpenAI, Anthropic, AWS Bedrock, Google AI, and more.

### How much can I save with Cost Katana?

Most users see cost reductions of 30-70% through our optimization features including:
- Real-time cost monitoring and alerts
- Intelligent prompt optimization
- Model recommendation engine
- Usage pattern analysis
- Budget management tools

### Which AI providers are supported?

Cost Katana supports all major AI providers:
- **OpenAI** (GPT-3.5, GPT-4, GPT-4 Turbo, DALL-E, Whisper)
- **Anthropic** (Claude 3, Claude 2, Claude Instant)
- **AWS Bedrock** (Claude, Titan, Jurassic, etc.)
- **Google AI** (Gemini, PaLM, Imagen)
- **Azure OpenAI** 
- **Cohere**
- **Hugging Face**
- And many more...

### Do I need to change my existing code?

No! Cost Katana works as a drop-in replacement. Simply:
1. Replace your API endpoints with Cost Katana's gateway
2. Add your Cost Katana API key
3. Keep using your existing code - no changes needed

## Pricing & Billing

### How does Cost Katana pricing work?

Cost Katana uses a simple usage-based pricing model:
- **Free Tier**: Up to $100 in AI costs per month
- **Pro**: 2% of your AI spend (minimum $10/month)
- **Enterprise**: Custom pricing with volume discounts

You only pay for what you use, and the savings typically far exceed the Cost Katana fees.

### Can I track costs across multiple projects?

Yes! Cost Katana supports unlimited projects, team members, and cost centers. You can:
- Set individual budgets per project
- Track costs by team or department
- Get detailed breakdowns by model, provider, and time period
- Set up custom alerts and notifications

### What payment methods do you accept?

We accept all major credit cards, PayPal, and for Enterprise customers, we support invoicing and wire transfers.

## Setup & Integration

### How quickly can I get started?

You can be up and running in under 5 minutes:
1. Sign up for a free account
2. Add your AI provider API keys
3. Replace your API endpoints with Cost Katana's gateway
4. Start tracking costs immediately

### Do you offer API integrations?

Yes! Cost Katana provides comprehensive APIs for:
- Cost and usage data
- Budget management
- Alert configuration
- Analytics and reporting
- Webhook notifications

### Can I integrate with my existing monitoring tools?

Absolutely! Cost Katana integrates with:
- **Monitoring**: Datadog, New Relic, Grafana
- **Notifications**: Slack, Discord, Microsoft Teams, PagerDuty
- **Business Intelligence**: Tableau, Power BI, Looker
- **Accounting**: QuickBooks, Xero, SAP

## Security & Privacy

### How secure is my data?

Security is our top priority:
- **SOC 2 Type II** compliant
- **End-to-end encryption** for all data
- **Zero-knowledge architecture** - we never see your prompts or responses
- **GDPR and CCPA** compliant
- **Regular security audits** by third-party firms

### Do you store my AI prompts and responses?

No! Cost Katana only processes metadata (token counts, costs, timestamps) and never stores your actual prompts or AI responses. Your data flows directly between you and your AI provider.

### Where is my data stored?

All data is stored in secure, encrypted databases in your chosen region (US, EU, or Asia-Pacific). We offer data residency options for compliance requirements.

## Features & Capabilities

### What optimization features do you offer?

Cost Katana includes powerful optimization tools:
- **Smart Model Selection**: Automatically choose the most cost-effective model
- **Prompt Optimization**: Reduce token usage without losing quality
- **Caching**: Avoid duplicate API calls
- **Rate Limiting**: Prevent runaway costs
- **Batch Processing**: Optimize bulk requests

### Can I set up custom alerts?

Yes! You can create alerts for:
- Budget thresholds (daily, weekly, monthly)
- Unusual spending patterns
- High error rates
- Model performance changes
- Custom metrics and KPIs

### Do you provide analytics and reporting?

Cost Katana offers comprehensive analytics:
- **Real-time dashboards** with cost trends
- **Detailed breakdowns** by model, project, user
- **Performance metrics** (latency, error rates, quality scores)
- **Custom reports** and data exports
- **Predictive analytics** for budget planning

## Support & Training

### What support do you offer?

We provide multiple support channels:
- **24/7 Email Support** for all plans
- **Live Chat** during business hours
- **Phone Support** for Pro and Enterprise
- **Dedicated Account Manager** for Enterprise
- **Community Forum** and documentation

### Do you offer training and onboarding?

Yes! We provide:
- **Free onboarding** for all new customers
- **Training sessions** for your team
- **Best practices workshops**
- **Custom implementation** consulting
- **Migration assistance** from other tools

### Is there a community or forum?

Yes! Join our active community:
- **Discord Server** for real-time discussions
- **GitHub Discussions** for technical questions
- **Monthly webinars** with tips and new features
- **User conference** (CostKatanaCon) annually

## Technical Questions

### What are the API rate limits?

Cost Katana has generous rate limits:
- **Free Tier**: 1,000 requests/minute
- **Pro**: 10,000 requests/minute  
- **Enterprise**: Custom limits based on your needs

We also provide rate limiting features to help you control your own AI usage.

### Do you support webhooks?

Yes! Cost Katana supports webhooks for:
- Budget alerts and notifications
- Usage milestones
- Error notifications
- Custom events and triggers

### Can I use Cost Katana with my CI/CD pipeline?

Absolutely! Cost Katana provides:
- **CLI tools** for automation
- **GitHub Actions** integration
- **Docker containers** for easy deployment
- **Terraform providers** for infrastructure as code

### What programming languages are supported?

Cost Katana works with any language that can make HTTP requests. We provide official SDKs for:
- **Python** (most popular)
- **Node.js/JavaScript**
- **Go**
- **Java**
- **C#/.NET**
- **PHP**
- **Ruby**

## Troubleshooting

### I'm not seeing cost data in my dashboard

Common solutions:
1. Verify your API key is correctly configured
2. Check that you're using Cost Katana's gateway endpoints
3. Ensure your requests are successful (check error logs)
4. Data may take 1-2 minutes to appear in real-time views

### My costs seem higher than expected

This could be due to:
- **Model selection**: Some models are more expensive than others
- **Token usage**: Long prompts or responses increase costs
- **Error retries**: Failed requests still incur costs
- **Concurrent requests**: Check for duplicate or unnecessary calls

### How do I migrate from another cost tracking tool?

We provide migration assistance:
1. **Data export** from your existing tool
2. **Import scripts** to transfer historical data
3. **Side-by-side comparison** during transition
4. **Dedicated support** throughout the process

---

Still have questions? [Contact our support team](mailto:support@costkatana.com) or [join our Discord community](https://discord.gg/Wcwzw8wM) for real-time help!`}
  />
);

export const SupportPage = () => (
  <DocumentationPage
    title="Support & Contact"
    description="Get help with Cost Katana"
    fallbackContent={`# Support & Contact

## Get Help with Cost Katana

We're here to help you get the most out of Cost Katana. Whether you're just getting started or need advanced technical support, we have multiple ways to assist you.

## 📧 Email Support

**Primary Support**: [support@costkatana.com](mailto:support@costkatana.com)
- Response time: Within 24 hours
- Available for all plan types
- Technical issues, billing questions, feature requests

**Sales Inquiries**: [order@hypothesize.tech](mailto:order@hypothesize.tech)
- Enterprise pricing and custom solutions
- Volume discounts and contract negotiations
- Partnership opportunities

**Security & Compliance**: [order@hypothesize.tech](mailto:order@hypothesize.tech)
- Security questionnaires and audits
- Compliance documentation
- Data processing agreements

## 💬 Live Chat & Community

### Discord Community
Join our active Discord server for real-time help and discussions:
- **Server**: [discord.gg/costkatana](https://discord.gg/Wcwzw8wM)
- **Channels**: 
  - \`#general\` - General discussions
  - \`#technical-help\` - Technical support
  - \`#feature-requests\` - Suggest new features
  - \`#integrations\` - Integration help
  - \`#announcements\` - Product updates

### Live Chat
Available on our website during business hours:
- **Hours**: Monday-Friday, 9 AM - 6 PM PST
- **Response**: Immediate during business hours
- **Available to**: All users (Pro+ get priority)


## 🎓 Learning Resources

### Documentation
- **Getting Started Guide**: [/getting-started/introduction](/getting-started/introduction)
- **API Reference**: [/api](/api)
- **Integration Guides**: [/integrations](/integrations)
- **Best Practices**: [/features](/features)

## 🚀 Onboarding & Training

### Free Onboarding (All Plans)
- **30-minute setup call** with our team
- **Custom configuration** for your use case
- **Integration assistance** with your existing tools
- **Best practices** recommendations

### Advanced Training (Pro & Enterprise)
- **Team training sessions** (up to 10 people)
- **Custom workshops** for your organization
- **Implementation consulting** for complex setups
- **Ongoing optimization** reviews

### Enterprise Support
- **Dedicated Customer Success Manager**
- **Quarterly business reviews**
- **Priority feature requests**
- **Custom SLA agreements**
- **On-site training** available

## 🔧 Technical Support

### GitHub Issues
For bug reports and feature requests:
- **Repository**: [github.com/costkatana/issues](https://github.com/Hypothesize-Tech/costkatana-backend/issues)
- **Bug Reports**: Use the bug report template
- **Feature Requests**: Use the feature request template
- **Security Issues**: Email order@hypothesize.tech

### API Support
- **API Status**: [status.costkatana.com](https://status.costkatana.com)
- **Rate Limits**: Monitor in your dashboard
- **Error Codes**: Check our API documentation
- **Webhooks**: Test endpoints in the dashboard

### API Performance
- **Response Time**: < 100ms average
- **Global CDN**: Multiple regions for low latency
- **Auto-scaling**: Handles traffic spikes automatically

## 💰 Billing & Account Support

### Billing Questions
- **Invoice Issues**: support@costkatana.com
- **Payment Problems**: Check your payment method in dashboard
- **Usage Questions**: Detailed breakdowns available in dashboard
- **Refund Requests**: Contact support within 30 days

### Account Management
- **Team Management**: Add/remove users in dashboard
- **API Key Management**: Rotate keys for security
- **Data Export**: Download your data anytime
- **Account Deletion**: Contact support for assistance

## 🤝 Partnership & Integration

### Technology Partners
Interested in building an integration with Cost Katana?
- **Partner Program**: order@hypothesize.tech
- **API Documentation**: Full access to our APIs
- **Co-marketing**: Joint marketing opportunities
- **Technical Support**: Dedicated partner support

### Reseller Program
- **Channel Partners**: Sell Cost Katana to your clients
- **Training & Certification**: Become a certified partner
- **Sales Support**: Joint sales calls and technical demos
- **Competitive Pricing**: Attractive margins for partners

## 📅 Schedule a Call

### Demo & Consultation
Book a personalized demo:
- **Product Demo**: See Cost Katana in action
- **Use Case Discussion**: Tailored to your needs
- **ROI Analysis**: Calculate your potential savings
- **Implementation Planning**: Custom deployment strategy

**Schedule**: [calendly.com/costkatana-demo](https://calendly.com/costkatana-demo)

### Enterprise Consultation
For large organizations:
- **Architecture Review**: Assess your current setup
- **Security Discussion**: Compliance and security requirements
- **Custom Pricing**: Volume discounts and enterprise features
- **Pilot Program**: Start with a small team or project

---

## Quick Links

- 🚀 [Get Started](/getting-started/introduction)
- 📖 [Documentation](/api)
- 💬 [Discord Community](https://discord.gg/Wcwzw8wM)
- 📧 [Email Support](mailto:support@costkatana.com)
- 📊 [Service Status](https://status.costkatana.com)
- 📅 [Schedule Demo](https://calendly.com/costkatana-demo)

**Need immediate help?** Start a live chat on our website or email support@costkatana.com. We typically respond within 2 hours during business hours.`}
  />
);

export const OpenTelemetryVendorsPage = () => (
  <DocumentationPage
    title="OpenTelemetry & Vendor Support"
    description="Native OTel traces/metrics with support for Grafana/Tempo, Datadog, and New Relic"
    fallbackContent={`# OpenTelemetry & Vendor Support

Cost Katana ships with native OpenTelemetry (OTel) integration for traces and metrics.

## Quick Setup (Grafana Cloud)

    OTLP_HTTP_TRACES_URL=https://tempo-prod-us-central1.grafana.net/tempo/api/push
    OTLP_HTTP_METRICS_URL=https://prometheus-prod-us-central1.grafana.net/api/prom/push
    OTEL_EXPORTER_OTLP_HEADERS=Authorization=Bearer <YOUR_TOKEN>

## Telemetry Endpoints
- GET /api/telemetry/metrics
- GET /api/telemetry/dashboard
- GET /api/telemetry/traces/:traceId
- GET /api/telemetry?{filters}
- GET /api/telemetry/dependencies
- GET /api/telemetry/health

## Dashboard Coverage
- KPIs (RPM, Error %, Avg & P95 Latency)
- Cost by Model
- Recent Errors & Top Errors
- Top Operations
- Telemetry Explorer
- Trace Viewer
- Service Dependency Graph

See backend OBSERVABILITY.md for vendor examples and local collector instructions.`}
  />
);

// SAST Features Page
export const SastPage = () => (
  <DocumentationPage
    title="SAST (Semantic Abstract Syntax Tree) Optimization"
    description="Advanced semantic optimization using SAST for unambiguous, cross-lingual AI processing"
    prevPage={{ path: '/features/optimization', label: 'Previous: AI Optimization' }}
    nextPage={{ path: '/features/predictive-intelligence', label: 'Next: Predictive Intelligence' }}
    fallbackContent={`# SAST (Semantic Abstract Syntax Tree) Optimization

SAST represents the next evolution in AI optimization, transforming natural language into unambiguous semantic primitives for superior token efficiency and cross-lingual compatibility.

## 🧬 What is SAST?

SAST is a **Semantic Abstract Syntax Tree** that converts ambiguous natural language into a computationally simple, unambiguous structure using semantic primitives. Unlike traditional text-based optimization, SAST creates a universal semantic representation that works across languages and eliminates ambiguity.

### Traditional vs SAST Approach

**Traditional Cortex:**
\`\`\`
"I saw a man on the hill with a telescope"
↓ (Text-based optimization)
"Observed person on elevated terrain using optical device"
\`\`\`

**SAST Cortex:**
\`\`\`
"I saw a man on the hill with a telescope"
↓ (Semantic parsing)
Frame: [EVENT]
├── Agent: concept_1001 (person/I)
├── Action: action_2001 (perceive/see) 
├── Object: concept_1001 (person/man)
├── Location: concept_2001 (elevated_terrain/hill)
└── Instrument: concept_3001 (optical_device/telescope)
\`\`\`

## 🚀 Key Benefits

### 1. **Ambiguity Resolution**
- **Telescope Demo**: Resolves "I saw a man on the hill with a telescope" 
- Distinguishes between "man has telescope" vs "I used telescope"
- 95% accuracy in structural disambiguation

### 2. **Cross-Lingual Compatibility**  
- Same SAST representation across English, Spanish, French, German
- Universal semantic primitives work regardless of source language
- Enables true multilingual AI applications

### 3. **Token Optimization**
- 30-40% token reduction compared to traditional methods
- Semantic primitives are more compact than natural language
- Higher cache hit rates due to semantic similarity matching

### 4. **Semantic Preservation**
- 92% semantic preservation vs 85% traditional methods
- Meaning-first approach ensures intent is never lost
- Context-aware optimization maintains relationships

## 📊 Performance Metrics

### Optimization Results
- **Token Reduction**: 30-40% average improvement
- **Semantic Accuracy**: 95% disambiguation success rate
- **Cross-Lingual Support**: 85%+ unification across 4+ languages
- **Processing Speed**: <100ms average for semantic parsing
- **Cache Efficiency**: 60% higher hit rates vs traditional caching

### Comparison Analysis
\`\`\`bash
# CLI comparison example
cost-katana sast compare "I saw a man on the hill with a telescope"

Results:
├── Traditional Cortex: 24 tokens, 15% ambiguity, 85% semantic clarity
├── SAST Cortex: 18 tokens, 0% ambiguity, 95% semantic clarity  
└── Improvement: 25% token reduction, 100% ambiguity resolution
\`\`\`

## 🛠️ Usage Examples

### CLI Usage
\`\`\`bash
# Basic SAST optimization
cost-katana sast optimize "Your complex prompt here"

# Cross-lingual processing
cost-katana sast optimize "Bonjour le monde" --language fr --cross-lingual

# Compare approaches
cost-katana sast compare "Ambiguous sentence" --language en

# Explore semantic vocabulary
cost-katana sast vocabulary --search "action" --category concept --limit 20

# Telescope ambiguity demo
cost-katana sast telescope-demo

# Universal semantics test
cost-katana sast universal "love" --languages "en,es,fr,de"

# Performance statistics
cost-katana sast stats
\`\`\`

### Node.js SDK
\`\`\`javascript
import { SastOptimizer } from '@cost-katana/core';

const sastOptimizer = new SastOptimizer();

// Basic SAST optimization
const result = await sastOptimizer.optimize(
  "I saw a man on the hill with a telescope",
  {
    language: 'en',
    disambiguationStrategy: 'hybrid',
    preserveAmbiguity: false,
    enableCrossLingual: true
  }
);

console.log('Optimized:', result.optimizedText);
console.log('Ambiguities Resolved:', result.ambiguitiesResolved.length);
console.log('Token Reduction:', result.optimizationMetrics.tokenReduction);
\`\`\`

### Gateway Integration
\`\`\`javascript
import { GatewayClient } from '@cost-katana/core';

const client = new GatewayClient({ 
  baseUrl: 'https://cost-katana-backend.store',
  apiKey: 'your-api-key'
});

// Use SAST optimization
const response = await client.withSast('/v1/chat/completions', {
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Complex ambiguous prompt' }]
}, {
  language: 'en',
  ambiguityResolution: true,
  crossLingualMode: true
});

// Compare traditional vs SAST
const comparison = await client.compareSast('/v1/chat/completions', {
  model: 'gpt-4', 
  messages: [{ role: 'user', content: 'Your prompt' }]
});

console.log('Recommended approach:', comparison.comparison.recommendedApproach);
\`\`\`

### Python Integration
\`\`\`python
import cost_katana

# Configure client
client = cost_katana.configure(api_key="your-api-key")

# SAST optimization
result = client.optimize_with_sast(
    prompt="I saw a man on the hill with a telescope",
    language="en",
    ambiguity_resolution=True,
    cross_lingual=True
)

# Compare approaches  
comparison = client.compare_sast_vs_traditional(
    prompt="Your ambiguous text",
    language="en"
)

# Explore semantic primitives
primitives = client.search_semantic_primitives(
    term="action",
    category="concept", 
    limit=20
)

# Test universal semantics
universal_test = client.test_universal_semantics(
    concept="love",
    languages=["en", "es", "fr", "de"]
)
\`\`\`

## 📚 Semantic Primitives System

SAST uses a comprehensive vocabulary of semantic primitives organized into categories:

### Core Categories
- **Concepts**: \`concept_1001\` (person), \`concept_1002\` (object), \`concept_1003\` (place)
- **Actions**: \`action_2001\` (perceive), \`action_2002\` (move), \`action_2003\` (create)
- **Properties**: \`property_3001\` (size), \`property_3002\` (color), \`property_3003\` (quality)
- **Relations**: \`relation_4001\` (with), \`relation_4002\` (in), \`relation_4003\` (of)
- **Quantities**: \`quantity_5001\` (many), \`quantity_5002\` (few), \`quantity_5003\` (all)
- **Time**: \`time_6001\` (now), \`time_6002\` (before), \`time_6003\` (after)

### Cross-Lingual Mapping
Each primitive supports multiple languages:
\`\`\`json
{
  "concept_1001": {
    "baseForm": "person",
    "translations": {
      "en": ["person", "individual", "human"],
      "es": ["persona", "individuo"],
      "fr": ["personne", "individu"],
      "de": ["Person", "Individuum"]
    }
  }
\`\`\`

## 🔬 Advanced Features

### 1. **Disambiguation Strategies**
- **Strict**: Highest precision, may preserve some ambiguity
- **Permissive**: Resolves all ambiguity, may make assumptions
- **Hybrid**: Balanced approach with context awareness (recommended)

### 2. **Semantic Frame Types**
- **Event**: Actions with agents, objects, and circumstances
- **Entity**: Objects, people, places with properties
- **State**: Descriptions, conditions, relationships
- **Query**: Questions, requests, information needs

### 3. **Universal Compatibility Testing**
\`\`\`bash
# Test cross-lingual unification
cost-katana sast universal "love" --languages "en,es,fr,de,ja"

Results:
├── Unification Score: 92.3%
├── Universal Compatible: ✓
├── Translations: 5 languages
└── SAST Representations: Consistent across all languages
\`\`\`

## 🎯 Use Cases

### Perfect for:
- **Multilingual Applications**: Same optimization works across languages
- **Ambiguous Content**: Technical docs, legal text, creative writing
- **High-Volume Processing**: Token efficiency matters for scale
- **Semantic Search**: Match by meaning, not just keywords
- **AI Agent Coordination**: Unambiguous communication between agents

### Example Industries:
- **Legal**: Contract analysis with disambiguation
- **Medical**: Clinical notes with precise terminology
- **E-commerce**: Product descriptions across languages
- **Education**: Learning content optimization
- **Customer Support**: Multilingual query understanding

## 🔧 Configuration

### Frontend (React/TypeScript)
Access SAST through the dashboard at \`/sast\` with components for:
- **Semantic Primitives Explorer**: Browse and search the vocabulary
- **Evolution Comparator**: Compare traditional vs SAST optimization
- **Telescope Demo**: Interactive ambiguity resolution
- **Universal Semantics Test**: Cross-lingual compatibility testing
- **Performance Analytics**: Real-time SAST statistics

### Backend Integration
SAST integrates seamlessly with existing Cortex infrastructure:
\`\`\`javascript
// Gateway middleware automatically detects SAST requests
app.use(cortexGatewayMiddleware);

// Headers trigger SAST processing
headers: {
  'CostKatana-Cortex-Operation': 'sast',
  'CostKatana-Cortex-Ambiguity-Resolution': 'true',
  'CostKatana-Cortex-Cross-Lingual-Mode': 'true'
}
\`\`\`

## 📈 Getting Started

### 1. **Enable SAST in Dashboard**
Navigate to \`/sast\` in your Cost Katana dashboard to explore SAST features interactively.

### 2. **CLI Quick Start**
\`\`\`bash
# Install CLI
npm install -g @cost-katana/cli

# Run SAST optimization
cost-katana sast optimize "Your text here"

# Compare approaches
cost-katana sast compare "Ambiguous sentence"
\`\`\`

### 3. **SDK Integration**
Add SAST to existing applications with minimal code changes:
\`\`\`javascript
// Enable SAST mode
const result = await client.optimize(prompt, { useSast: true });
\`\`\`

### 4. **API Integration**
Use SAST through REST API endpoints:
- \`POST /api/optimizations/sast/optimize\` - SAST optimization
- \`POST /api/optimizations/sast/compare\` - Compare approaches  
- \`GET /api/optimizations/sast/vocabulary\` - Explore primitives
- \`POST /api/optimizations/sast/universal-test\` - Cross-lingual testing

## 🤔 When to Use SAST

**Use SAST when:**
- Content has ambiguous structures or meanings
- Processing multiple languages
- Token efficiency is critical 
- Semantic precision matters more than speed
- Building AI agents that need unambiguous communication

**Use Traditional Cortex when:**
- Simple, unambiguous content
- Single language processing
- Speed is more important than precision
- Existing workflows are sufficient

## 📖 Learn More

- **[SAST Dashboard](/sast)** - Interactive SAST exploration
- **[CLI Documentation](/integrations/cli)** - Command-line usage
- **[Node.js SDK](/integrations/nodejs)** - JavaScript integration
- **[Python SDK](/integrations/python)** - Python integration
- **[API Reference](/api/optimization)** - REST API endpoints

---

*SAST represents the cutting edge of semantic optimization. Experience 30-40% token reductions while achieving unprecedented semantic clarity and cross-lingual compatibility.*`}
  />
);

export default OpenTelemetryVendorsPage;