import DocumentationPage from "../components/DocumentationPage";

// Getting Started Pages
export const InstallationPage = () => (<DocumentationPage title="Installation" description="Detailed installation instructions for Cost Katana" prevPage={{ path: '/getting-started/quick-start', label: 'Previous: Quick Start' }} fallbackContent={`# Installation Guide

Get started with Cost Katana and revolutionary **Cortex Meta-Language** in minutes. Achieve 40-75% token reduction with LISP-based optimization.

## Primary Package: Core SDK (Recommended)

### Node.js/TypeScript Core Package

**#1 Priority Package** - The core Cost Katana SDK for Node.js and TypeScript applications:

\`\`\`bash
# Install the core package
npm install cost-katana
\`\`\`

### Package Information

[![npm version](https://badge.fury.io/js/cost-katana.svg)](https://www.npmjs.com/package/cost-katana)

- **Package Name**: \`cost-katana\` **Primary Package**
- **Latest Version**: 2.1.3
- **Repository**: [GitHub](https://github.com/Hypothesize-Tech/costkatana-core)
- **License**: MIT
- **TypeScript**: Built-in type declarations

### Quick Start Example

Try this example with all necessary imports and context included:

\`\`\`smart:javascript:{"imports":["import { ai, OPENAI } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Complete example with imports and dependencies"}
const response = await ai(OPENAI.GPT_4O, 'Hello, world!');
console.log(response.text);
console.log(\`Cost: $\${response.cost}\`);
\`\`\`

### Why Choose the Core Package?

- **Type-safe model constants** with IDE autocomplete
- **Automatic cost tracking** for all AI providers
- **Zero configuration** required
- **Full TypeScript support** with complete type definitions
- **Production-ready** with enterprise features

---

## Alternative: CLI Installation

### Global Installation

Install the Cost Katana CLI globally using npm:

\`\`\`bash
# Install globally via npm
npm install -g cost-katana-cli

# Verify installation
cost-katana --version
\`\`\`

### Alternative Installation Methods

#### Using npx (No Global Install)
\`\`\`bash
# Run without installing globally
npx cost-katana-cli init
\`\`\`

#### Using Yarn
\`\`\`bash
# Global installation with Yarn
yarn global add cost-katana-cli

# Verify installation
cost-katana --version
\`\`\`

### CLI Package Information

[![npm version](https://badge.fury.io/js/cost-katana-cli.svg)](https://www.npmjs.com/package/cost-katana-cli)

- **Package Name**: \`cost-katana-cli\`
- **Latest Version**: 1.0.11
- **Weekly Downloads**: 638+
- **License**: MIT
- **Repository**: [GitHub](https://github.com/Hypothesize-Tech/costkatana-cli)

## Quick Setup

Once installed, initialize your configuration:

\`\`\`bash
# Initialize Cost Katana
cost-katana init
\`\`\`

This will guide you through:

### Required Configuration
- **Project Name** - Identify your project for cost tracking
- **API Key** - Secure authentication to Cost Katana backend
- **Default Model** - Choose your preferred AI model (GPT-4, Claude, Gemini, etc.)
- **Monthly Token Budget** - Set your monthly token consumption limit

### Optional Settings
- **Base URL** - Backend API endpoint
- **Advanced Settings** - Temperature, max tokens, cost limits

## Platform Support

Cost Katana CLI works on all major platforms:

- **Windows** (Windows 10+)
- **macOS** (macOS 10.15+)
- **Linux** (Ubuntu 18.04+, CentOS 7+, etc.)

## Prerequisites

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

## Enterprise Installation

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
  run: npm install -g cost-katana-cli

- name: Initialize Cost Katana
  run: cost-katana init --api-key \${{ secrets.API_KEY }}

- name: Run Cost Analysis
  run: cost-katana analytics --format json --export analysis.json
\`\`\`

## Verification

Test your installation:

\`\`\`bash
# Check version
cost-katana --version

# View help
cost-katana --help

# Test configuration
cost-katana test
\`\`\`

## Additional SDK Options

### Python SDK
\`\`\`bash
pip install cost-katana
\`\`\`

\`\`\`smart:python:{"imports":["from cost_katana import CostKatana"],"dependencies":["cost-katana"],"description":"Python SDK initialization example"}
ck = CostKatana(api_key='your-api-key')
\`\`\`

## Troubleshooting

### Common Issues

#### Permission Errors
\`\`\`bash
# On macOS/Linux, use sudo for global install
sudo npm install -g cost-katana-cli

# Or use npx to avoid global installation
npx cost-katana-cli init
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

- **Documentation**: [docs.costkatana.com](https://docs.costkatana.com)
- **GitHub Issues**: [Report Issues](https://github.com/Hypothesize-Tech/costkatana-cli/issues)
- **Email Support**: support@costkatana.com

## Next Steps

After installation:

1. **Initialize Configuration**: \`cost-katana init\`
2. **Connect Your AI Providers**: Add API keys
3. **Start Tracking**: \`cost-katana analytics\`
4. **Optimize Costs**: \`cost-katana optimize\`
5. **Set Budgets**: \`cost-katana set-budget\`

Ready to start saving on AI costs? Let's go!`} />
);

// Integrations Pages
export const CLIPage = () => (<DocumentationPage title="CLI Tool" description="Powerful command-line interface for AI cost optimization" prevPage={{ path: '/integrations/python', label: 'Previous: Python SDK' }} nextPage={{ path: '/integrations/chatgpt', label: 'Next: ChatGPT Integration' }} fallbackContent={`# Cost Katana CLI

The most powerful command-line interface for AI cost optimization and management.

![CLI Interface](/assets/cli.png)

## Installation

### Global Installation (Recommended)

Install the Cost Katana CLI globally using npm:

\`\`\`bash
# Install globally via npm
npm install -g cost-katana-cli

# Verify installation
cost-katana --version

# Quick setup
cost-katana init
\`\`\`

### Package Information

Based on the [npm package](https://www.npmjs.com/package/costkatana-cli):

- **Package**: \`cost-katana-cli\`
- **Version**: 1.0.11 (latest)
- **Weekly Downloads**: 638+
- **License**: MIT
- **TypeScript**: Built-in type declarations

## Core Commands

### Setup & Configuration

Follow this step-by-step guide to get started:

\`\`\`steps:CLI Setup Guide
[{"title":"Install CLI","description":"Install the Cost Katana CLI globally","content":"Install the CLI using npm:","code":"npm install -g cost-katana-cli"},{"title":"Initialize","description":"Set up your configuration","content":"Run the initialization command:","code":"cost-katana init"},{"title":"Test Configuration","description":"Verify your setup","content":"Test your configuration:","code":"cost-katana test"},{"title":"Start Tracking","description":"Begin tracking your AI costs","content":"View your analytics:","code":"cost-katana analytics"}]
\`\`\`

Or use these commands directly:

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

## Advanced Features

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

## Analytics & Reports

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

## Security & Auditing

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

## AI-Powered Features

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

## CI/CD Integration

### GitHub Actions
\`\`\`yaml
name: AI Cost Monitoring
on: [push, pull_request]

jobs: cost-analysis: runs-on: ubuntu-latest steps: - uses: actions/checkout@v3 - name: Install Cost Katana CLI run: npm install -g cost-katana-cli - name: Run Cost Analysis run: cost-katana analytics --format json --export cost-report.json env: API_KEY: \${{ secrets.API_KEY }}
\`\`\`

### Docker Integration
\`\`\`dockerfile
FROM node:18-alpine
RUN npm install -g cost-katana-cli
COPY . .
RUN cost-katana analytics --export build-cost-report.json
CMD ["npm", "start"]
\`\`\`

## Output Formats

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

## Getting Started

1. **Install**: \`npm install -g cost-katana-cli\`
2. **Initialize**: \`cost-katana init\`
3. **Explore**: \`cost-katana --help\`
4. **Analyze**: \`cost-katana analytics\`
5. **Optimize**: Start saving on AI costs!

The CLI is your command center for AI cost optimization. Get started today! `} />
);

export const NodeJSPage = () => (<DocumentationPage title="Node.js SDK" description="Integrate Cost Katana with your Node.js applications" nextPage={{ path: '/integrations/python', label: 'Next: Python SDK' }} fallbackContent={`# Node.js SDK Integration

Complete guide to integrating the Cost Katana SDK with your Node.js applications for programmatic AI cost optimization.

![Node.js SDK Integration](/assets/nodejs_sdk.png)

## Node.js SDK

For programmatic integration in your Node.js applications.

### Installation

\`\`\`bash
npm install cost-katana
\`\`\`

### Quick Start

Try this example with all necessary imports and context:

\`\`\`smart:javascript:{"imports":["import { AICostTracker } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Complete Node.js integration example with automatic cost tracking"}
const tracker = await AICostTracker.create({ providers: [ { provider: 'openai', apiKey: 'your-openai-api-key' } ], tracking: { enableAutoTracking: true }
});

const response = await tracker.chat.completions.create({ model: 'gpt-4', messages: [{ role: 'user', content: 'Hello, world!' }]
});

console.log(response.choices[0].message.content);
\`\`\`

### Advanced Usage

#### Project-based Tracking
\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Track costs per project with metadata"}
const ck = new CostKatana({ apiKey: 'your-api-key', project: 'customer-support-bot' // Track costs per project
});

const response = await ck.chat.completions.create({ model: 'gpt-3.5-turbo', messages: messages, metadata: { user_id: 'user-123', session_id: 'session-456' }
});
\`\`\`

#### Cost Optimization
\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Get optimization suggestions and apply them to reduce costs"}
// Get optimization suggestions
const suggestions = await ck.optimization.getSuggestions({ prompt: 'Your long prompt here...', model: 'gpt-4'
});

console.log('Potential savings:', suggestions.costSavings);

// Apply optimization
const optimized = await ck.optimization.optimize({ prompt: 'Your long prompt here...', strategy: 'aggressive'
});

console.log('Optimized prompt:', optimized.optimizedPrompt);
console.log('Token reduction:', optimized.tokensSaved);
\`\`\`

#### Budget Monitoring
\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Monitor budget usage and set up alerts"}
// Check budget status
const budget = await ck.budget.getStatus('my-project');

console.log(\`Budget usage: \${budget.usagePercentage}%\`);
console.log(\`Remaining: $\${budget.remaining}\`);

// Set budget alerts
await ck.budget.setAlert({ project: 'my-project', threshold: 80, // Alert at 80% channels: ['email', 'slack']
});
\`\`\`

![SDK Integration Example](/assets/optimization_1.png)

## Framework Integrations

### Express.js

\`\`\`smart:javascript:{"imports":["const express = require('express');","const { AICostTracker } = require('cost-katana');"],"dependencies":["express","cost-katana"],"description":"Express.js integration with automatic cost tracking"}
const app = express();
const tracker = await AICostTracker.create({ providers: [ { provider: 'openai', apiKey: process.env.OPENAI_API_KEY } ], tracking: { enableAutoTracking: true }
});

app.use(express.json());

// Chat endpoint with cost tracking
app.post('/api/chat', async (req, res) => { try { const response = await tracker.chat.completions.create({ model: 'gpt-3.5-turbo', messages: req.body.messages, metadata: { endpoint: '/api/chat', user_ip: req.ip } }); res.json({ message: response.choices[0].message.content, usage: response.usage, cost: response.cost }); } catch (error) { res.status(500).json({ error: error.message }); }
});

app.listen(3000);
\`\`\`

### Next.js

\`\`\`smart:javascript:{"imports":["import { AICostTracker } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Next.js API route with cost tracking"}
// pages/api/chat.js
const tracker = await AICostTracker.create({ providers: [ { provider: 'openai', apiKey: process.env.OPENAI_API_KEY } ], tracking: { enableAutoTracking: true }
});

export default async function handler(req, res) { if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); } try { const { messages } = req.body; const response = await tracker.chat.completions.create({ model: 'gpt-3.5-turbo', messages, metadata: { framework: 'nextjs', route: '/api/chat' } }); res.json({ message: response.choices[0].message.content, cost: response.cost, usage: response.usage }); } catch (error) { res.status(500).json({ error: error.message }); }
}
\`\`\`

### NestJS

\`\`\`smart:typescript:{"imports":["import { Injectable } from '@nestjs/common';","import { AICostTracker } from 'cost-katana';"],"dependencies":["@nestjs/common","cost-katana"],"description":"NestJS service with cost tracking"}
// chat.service.ts
@Injectable()
export class ChatService { private readonly tracker: AICostTracker; constructor() { this.tracker = await AICostTracker.create({ providers: [ { provider: 'openai', apiKey: process.env.OPENAI_API_KEY } ], tracking: { enableAutoTracking: true } }); } async chat(messages: any[]): Promise<any> { const response = await this.tracker.chat.completions.create({ model: 'gpt-3.5-turbo', messages, metadata: { service: 'ChatService', framework: 'nestjs' } }); return { message: response.choices[0].message.content, cost: response.cost, usage: response.usage }; }
}
\`\`\`

![Framework Integration Examples](/assets/gateway_1.png)

## Cloud Deployment

### AWS Lambda

\`\`\`smart:javascript:{"imports":["const { AICostTracker } = require('cost-katana');"],"dependencies":["cost-katana"],"description":"AWS Lambda function with cost tracking"}
const tracker = await AICostTracker.create({ providers: [ { provider: 'openai', apiKey: process.env.OPENAI_API_KEY } ], tracking: { enableAutoTracking: true }
});

exports.handler = async (event) => { try { const { messages } = JSON.parse(event.body); const response = await tracker.chat.completions.create({ model: 'gpt-3.5-turbo', messages, metadata: { platform: 'aws-lambda', function_name: process.env.AWS_LAMBDA_FUNCTION_NAME } }); return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ message: response.choices[0].message.content, cost: response.cost }) }; } catch (error) { return { statusCode: 500, body: JSON.stringify({ error: error.message }) }; }
};
\`\`\`

### Vercel Functions

\`\`\`smart:javascript:{"imports":["import { AICostTracker } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Vercel serverless function with cost tracking"}
// api/chat.js
const tracker = await AICostTracker.create({ providers: [ { provider: 'openai', apiKey: process.env.OPENAI_API_KEY } ], tracking: { enableAutoTracking: true }
});

export default async function handler(req, res) { if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); } try { const response = await tracker.chat.completions.create({ model: 'gpt-3.5-turbo', messages: req.body.messages, metadata: { platform: 'vercel', region: process.env.VERCEL_REGION } }); res.json({ message: response.choices[0].message.content, cost: response.cost }); } catch (error) { res.status(500).json({ error: error.message }); }
}
\`\`\`

## Development Workflow

### GitHub Actions

\`\`\`yaml
name: AI Cost Monitoring
on: [push, pull_request]

jobs: cost-analysis: runs-on: ubuntu-latest steps: - uses: actions/checkout@v3 - name: Setup Node.js uses: actions/setup-node@v3 with: node-version: '18' - name: Install Cost Katana CLI run: npm install -g cost-katana-cli - name: Run Cost Analysis run: | cost-katana analytics --format json --export cost-report.json cost-katana budget status --project \${{ github.repository }} env: API_KEY: \${{ secrets.API_KEY }} - name: Upload Cost Report uses: actions/upload-artifact@v3 with: name: cost-report path: cost-report.json
\`\`\`

### Docker Integration

\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine

# Install Cost Katana CLI globally
RUN npm install -g cost-katana-cli

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

## Monitoring & Analytics

### Real-time Monitoring

\`\`\`smart:javascript:{"imports":["const { AICostTracker } = require('cost-katana');"],"dependencies":["cost-katana"],"description":"Real-time cost monitoring with automatic alerts"}
// monitor.js
const tracker = await AICostTracker.create({ providers: [ { provider: 'openai', apiKey: process.env.OPENAI_API_KEY } ], tracking: { enableAutoTracking: true }
});

// Monitor costs in real-time
setInterval(async () => { const analytics = await tracker.analytics.getCurrent(); console.log(\`Current hourly spend: $\${analytics.hourlySpend}\`); console.log(\`Requests this hour: \${analytics.requestCount}\`); if (analytics.hourlySpend > 10) { console.warn(' High spending detected!'); // Send alert }
}, 60000); // Check every minute
\`\`\`

### Custom Dashboards

\`\`\`smart:javascript:{"imports":["const express = require('express');","const { AICostTracker } = require('cost-katana');"],"dependencies":["express","cost-katana"],"description":"Custom dashboard API with analytics, budget, and optimization data"}
// dashboard-data.js
const app = express();
const tracker = await AICostTracker.create({ providers: [ { provider: 'openai', apiKey: process.env.OPENAI_API_KEY } ], tracking: { enableAutoTracking: true }
});

// Dashboard API endpoint
app.get('/api/dashboard', async (req, res) => { const [analytics, budget, optimization] = await Promise.all([ tracker.analytics.getUsage({ days: 7 }), tracker.budget.getStatus(), tracker.optimization.getSummary() ]); res.json({ analytics, budget, optimization, timestamp: new Date() });
});

app.listen(3001);
\`\`\`

![Analytics Dashboard](/assets/analytics_2.png)

## Best Practices

### 1. Environment Configuration
\`\`\`smart:javascript:{"imports":[],"dependencies":[],"description":"Environment-based configuration for different deployment stages"}
// config.js
const config = { development: { costKatana: { apiKey: process.env.COST_KATANA_DEV_KEY, project: 'my-app-dev', optimization: 'conservative' } }, production: { costKatana: { apiKey: process.env.COST_KATANA_PROD_KEY, project: 'my-app-prod', optimization: 'aggressive' } }
};

export default config[process.env.NODE_ENV || 'development'];
\`\`\`

### 2. Error Handling
\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Robust error handling with automatic fallback to cheaper models"}
const ck = new CostKatana({ apiKey: process.env.COST_KATANA_API_KEY, retries: 3, timeout: 30000
});

try { const response = await ck.chat.completions.create({ model: 'gpt-4', messages: messages }); return response;
} catch (error) { if (error.code === 'RATE_LIMIT_EXCEEDED') { // Switch to cheaper model return await ck.chat.completions.create({ model: 'gpt-3.5-turbo', messages: messages }); } throw error;
}
\`\`\`

### 3. Cost Optimization
\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Smart caching implementation to reduce API calls and costs"}
// Implement smart caching
const ck = new CostKatana({ apiKey: process.env.COST_KATANA_API_KEY });
const cache = new Map();

async function chatWithCaching(messages) { const cacheKey = JSON.stringify(messages); if (cache.has(cacheKey)) { return cache.get(cacheKey); } const response = await ck.chat.completions.create({ model: 'gpt-3.5-turbo', messages }); cache.set(cacheKey, response); return response;
}
\`\`\`

## Getting Started

1. **Install CLI**: \`npm install -g cost-katana-cli\`
2. **Initialize**: \`cost-katana init\`
3. **Install SDK**: \`npm install cost-katana\`
4. **Start Tracking**: Begin monitoring your AI costs
5. **Optimize**: Use insights to reduce expenses

Ready to optimize your Node.js AI costs? Get started today! `} />
);

export const PythonPage = () => (<DocumentationPage title="Python SDK" description="Integrate Cost Katana with your Python applications" prevPage={{ path: '/integrations/nodejs', label: 'Previous: Node.js SDK' }} nextPage={{ path: '/integrations/cli', label: 'Next: CLI Tool' }} fallbackContent={`# Python SDK Integration

Complete guide to integrating Cost Katana with your Python applications for AI cost optimization.

![Python SDK Integration](/assets/python_sdk.png)

## Python SDK

### Installation

\`\`\`bash
pip install cost-katana
\`\`\`

### Quick Start

Try this example with all necessary imports and context:

\`\`\`smart:python:{"imports":["from cost_katana import CostKatana"],"dependencies":["cost-katana"],"description":"Complete Python integration example"}
ck = CostKatana(api_key='your-api-key')
response = ck.chat.completions.create( model='gpt-4', messages=[{'role': 'user', 'content': 'Hello, world!'}]
)
print(response.choices[0].message.content)
\`\`\`

### Advanced Usage

#### Project-based Tracking
\`\`\`smart:python:{"imports":["from cost_katana import CostKatana"],"dependencies":["cost-katana"],"description":"Track costs per project with metadata"}
ck = CostKatana( api_key='your-api-key', project='ml-research-project' # Track costs per project
)

response = ck.chat.completions.create( model='gpt-3.5-turbo', messages=messages, metadata={ 'user_id': 'user-123', 'experiment_id': 'exp-456' }
)
\`\`\`

#### Cost Optimization
\`\`\`smart:python:{"imports":["from cost_katana import CostKatana"],"dependencies":["cost-katana"],"description":"Get optimization suggestions and apply them to reduce costs"}
# Get optimization suggestions
suggestions = ck.optimization.get_suggestions( prompt='Your long prompt here...', model='gpt-4'
)

print(f'Potential savings: {suggestions.cost_savings}')

# Apply optimization
optimized = ck.optimization.optimize( prompt='Your long prompt here...', strategy='aggressive'
)

print(f'Optimized prompt: {optimized.optimized_prompt}')
print(f'Token reduction: {optimized.tokens_saved}')
\`\`\`

#### Budget Monitoring
\`\`\`smart:python:{"imports":["from cost_katana import CostKatana"],"dependencies":["cost-katana"],"description":"Monitor budget usage and set up alerts"}
# Check budget status
budget = ck.budget.get_status('my-project')

print(f'Budget usage: {budget.usage_percentage}%')
print(f'Remaining: $' + str(budget.remaining))

# Set budget alerts
ck.budget.set_alert( project='my-project', threshold=80, # Alert at 80% channels=['email', 'slack']
)
\`\`\`

![Python SDK Usage](/assets/usage_2.png)

## Framework Integrations

### Django

\`\`\`smart:python:{"imports":["from django.http import JsonResponse","from django.views.decorators.csrf import csrf_exempt","from cost_katana import CostKatana","import json"],"dependencies":["django","cost-katana"],"description":"Django view with cost tracking"}
# views.py

ck = CostKatana( api_key=settings.API_KEY, project='django-chat-app'
)

@csrf_exempt
def chat_endpoint(request): if request.method == 'POST': data = json.loads(request.body) response = ck.chat.completions.create( model='gpt-3.5-turbo', messages=data['messages'], metadata={ 'framework': 'django', 'endpoint': '/api/chat', 'user_ip': request.META.get('REMOTE_ADDR') } ) return JsonResponse({ 'message': response.choices[0].message.content, 'cost': response.cost, 'usage': response.usage })
\`\`\`

### Flask

\`\`\`smart:python:{"imports":["from flask import Flask, request, jsonify","from cost_katana import CostKatana","import os"],"dependencies":["flask","cost-katana"],"description":"Flask application with cost tracking"}
# app.py
app = Flask(__name__)
ck = CostKatana( api_key=os.getenv('API_KEY'), project='flask-api'
)

@app.route('/api/chat', methods=['POST'])
def chat(): try: data = request.get_json() response = ck.chat.completions.create( model='gpt-3.5-turbo', messages=data['messages'], metadata={ 'framework': 'flask', 'endpoint': '/api/chat' } ) return jsonify({ 'message': response.choices[0].message.content, 'cost': response.cost, 'usage': response.usage }) except Exception as e: return jsonify({'error': str(e)}), 500

if __name__ == '__main__': app.run(debug=True)
\`\`\`

### FastAPI

\`\`\`smart:python:{"imports":["from fastapi import FastAPI, HTTPException","from pydantic import BaseModel","from cost_katana import CostKatana","from typing import List","import os"],"dependencies":["fastapi","pydantic","cost-katana"],"description":"FastAPI application with cost tracking"}
# main.py
app = FastAPI()
ck = CostKatana( api_key=os.getenv('API_KEY'), project='fastapi-service'
)

class ChatRequest(BaseModel): messages: List[dict]

class ChatResponse(BaseModel): message: str cost: float usage: dict

@app.post('/api/chat', response_model=ChatResponse)
async def chat(request: ChatRequest): try: response = ck.chat.completions.create( model='gpt-3.5-turbo', messages=request.messages, metadata={ 'framework': 'fastapi', 'endpoint': '/api/chat' } ) return ChatResponse( message=response.choices[0].message.content, cost=response.cost, usage=response.usage ) except Exception as e: raise HTTPException(status_code=500, detail=str(e))
\`\`\`

![Python Framework Examples](/assets/usage_3.png)

## Data Science & ML Integration

### Jupyter Notebooks

\`\`\`smart:python:{"imports":["import pandas as pd","from cost_katana import CostKatana"],"dependencies":["pandas","cost-katana"],"description":"Jupyter Notebook integration with AI-powered data analysis"}
# In Jupyter Notebook
ck = CostKatana( api_key='your-api-key', project='data-analysis-notebook'
)

# Analyze data with AI
def analyze_data_with_ai(df): prompt = f"Analyze this data summary: {df.describe().to_string()}" response = ck.chat.completions.create( model='gpt-4', messages=[{'role': 'user', 'content': prompt}], metadata={ 'environment': 'jupyter', 'data_shape': str(df.shape) } ) return response.choices[0].message.content

# Track costs for each analysis
analysis_results = []
for data in datasets: result = analyze_data_with_ai(data) analysis_results.append(result)

# Check total cost
budget = ck.budget.get_status('data-analysis-notebook')
print(f'Total cost for analysis: $' + str(budget.current_spend))
\`\`\`

### Pandas Integration

\`\`\`smart:python:{"imports":["import pandas as pd","from cost_katana import CostKatana"],"dependencies":["pandas","cost-katana"],"description":"Pandas DataFrame accessor for AI-powered data analysis"}
ck = CostKatana(api_key='your-api-key')

# Custom pandas accessor for AI analysis
@pd.api.extensions.register_dataframe_accessor("ai_analyze")
class AIAnalyzer: def __init__(self, pandas_obj): self._obj = pandas_obj def summarize(self): """Get AI-powered data summary""" prompt = f"Summarize this data: {self._obj.describe().to_string()}" response = ck.chat.completions.create( model='gpt-3.5-turbo', messages=[{'role': 'user', 'content': prompt}] ) return response.choices[0].message.content

# Usage
df = pd.read_csv('data.csv')
summary = df.ai_analyze.summarize()
print(summary)
\`\`\`

### Scikit-learn Integration

\`\`\`smart:python:{"imports":["from sklearn.model_selection import train_test_split","from sklearn.ensemble import RandomForestClassifier","from cost_katana import CostKatana"],"dependencies":["scikit-learn","cost-katana"],"description":"Scikit-learn integration with AI-powered model interpretation"}
ck = CostKatana( api_key='your-api-key', project='ml-model-analysis'
)

# AI-powered model interpretation
def interpret_model_results(model, X_test, y_test): score = model.score(X_test, y_test) feature_importance = model.feature_importances_ prompt = f""" Interpret these ML model results: - Accuracy: {score:.4f} - Top 5 features: {dict(zip(X_test.columns[:5], feature_importance[:5]))} """ response = ck.chat.completions.create( model='gpt-4', messages=[{'role': 'user', 'content': prompt}], metadata={ 'model_type': 'RandomForest', 'accuracy': score, 'features_count': len(X_test.columns) } ) return response.choices[0].message.content

# Train model and get AI interpretation
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestClassifier().fit(X_train, y_train)
interpretation = interpret_model_results(model, X_test, y_test)
print(interpretation)
\`\`\`

## Cloud Deployment

### AWS Lambda

\`\`\`smart:python:{"imports":["import json","from cost_katana import CostKatana","import os"],"dependencies":["cost-katana"],"description":"AWS Lambda function with Python and cost tracking"}
# lambda_function.py
ck = CostKatana( api_key=os.environ['API_KEY'], project='lambda-function'
)

def lambda_handler(event, context): try: body = json.loads(event['body']) response = ck.chat.completions.create( model='gpt-3.5-turbo', messages=body['messages'], metadata={ 'platform': 'aws-lambda', 'function_name': context.function_name, 'request_id': context.aws_request_id } ) return { 'statusCode': 200, 'headers': { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, 'body': json.dumps({ 'message': response.choices[0].message.content, 'cost': response.cost }) } except Exception as e: return { 'statusCode': 500, 'body': json.dumps({'error': str(e)}) }
\`\`\`

### Google Cloud Functions

\`\`\`smart:python:{"imports":["from flask import Flask, request, jsonify","from cost_katana import CostKatana","import os"],"dependencies":["flask","cost-katana"],"description":"Google Cloud Functions HTTP function with cost tracking"}
# main.py
from flask import Flask, request, jsonify
from cost_katana import CostKatana
import os

ck = CostKatana( api_key=os.getenv('API_KEY'), project='gcp-function'
)

def chat_function(request): """HTTP Cloud Function for chat completion""" if request.method != 'POST': return jsonify({'error': 'Method not allowed'}), 405 try: data = request.get_json() response = ck.chat.completions.create( model='gpt-3.5-turbo', messages=data['messages'], metadata={ 'platform': 'gcp-functions', 'region': os.getenv('FUNCTION_REGION') } ) return jsonify({ 'message': response.choices[0].message.content, 'cost': response.cost }) except Exception as e: return jsonify({'error': str(e)}), 500
\`\`\`

### Azure Functions

\`\`\`smart:python:{"imports":["import logging","import json","import azure.functions as func","from cost_katana import CostKatana","import os"],"dependencies":["azure-functions","cost-katana"],"description":"Azure Functions HTTP trigger with cost tracking"}
# __init__.py
ck = CostKatana( api_key=os.environ['API_KEY'], project='azure-function'
)

def main(req: func.HttpRequest) -> func.HttpResponse: logging.info('Python HTTP trigger function processed a request.') try: req_body = req.get_json() response = ck.chat.completions.create( model='gpt-3.5-turbo', messages=req_body['messages'], metadata={ 'platform': 'azure-functions', 'function_app': os.getenv('WEBSITE_SITE_NAME') } ) return func.HttpResponse( json.dumps({ 'message': response.choices[0].message.content, 'cost': response.cost }), status_code=200, mimetype='application/json' ) except Exception as e: return func.HttpResponse( json.dumps({'error': str(e)}), status_code=500, mimetype='application/json' )
\`\`\`

## Monitoring & Analytics

### Real-time Cost Monitoring

\`\`\`smart:python:{"imports":["import time","from cost_katana import CostKatana"],"dependencies":["cost-katana"],"description":"Real-time cost monitoring with automated alerts"}
ck = CostKatana(api_key='your-api-key')

def monitor_costs(): """Monitor AI costs in real-time""" while True: analytics = ck.analytics.get_current() print(f'Current hourly spend: $' + str(analytics.hourly_spend)) print(f'Requests this hour: {analytics.request_count}') if analytics.hourly_spend > 10: print(' High spending detected!') # Send alert time.sleep(60) # Check every minute

# Run monitoring
monitor_costs()
\`\`\`

### Custom Dashboards

\`\`\`smart:python:{"imports":["from flask import Flask, jsonify","from cost_katana import CostKatana","import asyncio","import time"],"dependencies":["flask","cost-katana"],"description":"Custom Flask dashboard with async analytics aggregation"}
from flask import Flask, jsonify
from cost_katana import CostKatana
import asyncio
import time

app = Flask(__name__)
ck = CostKatana(api_key='your-api-key')

@app.route('/api/dashboard')
async def dashboard_data(): """Get dashboard data""" analytics, budget, optimization = await asyncio.gather( ck.analytics.get_usage(days=7), ck.budget.get_status(), ck.optimization.get_summary() ) return jsonify({ 'analytics': analytics, 'budget': budget, 'optimization': optimization, 'timestamp': time.time() })

if __name__ == '__main__': app.run(port=3001)
\`\`\`

## Best Practices

### 1. Environment Configuration
\`\`\`smart:python:{"imports":["import os"],"dependencies":[],"description":"Environment-based configuration for different deployment stages"}
# config.py
import os

class Config: API_KEY = os.getenv('API_KEY') PROJECT_NAME = os.getenv('PROJECT_NAME', 'my-python-app') # Different settings for different environments if os.getenv('ENVIRONMENT') == 'production': OPTIMIZATION_STRATEGY = 'aggressive' COST_KATANA_PROJECT = f'{PROJECT_NAME}-prod' else: OPTIMIZATION_STRATEGY = 'conservative' COST_KATANA_PROJECT = f'{PROJECT_NAME}-dev'

config = Config()
\`\`\`

### 2. Error Handling
\`\`\`smart:python:{"imports":["from cost_katana import CostKatana, RateLimitError, CostLimitError"],"dependencies":["cost-katana"],"description":"Robust error handling with automatic fallback to cheaper models"}
from cost_katana import CostKatana, RateLimitError, CostLimitError

ck = CostKatana( api_key='your-api-key', retries=3, timeout=30
)

try: response = ck.chat.completions.create( model='gpt-4', messages=messages ) return response
except RateLimitError: # Switch to cheaper model return ck.chat.completions.create( model='gpt-3.5-turbo', messages=messages )
except CostLimitError: # Handle budget exceeded print('Budget limit reached!') return None
\`\`\`

### 3. Cost Optimization
\`\`\`smart:python:{"imports":["from functools import lru_cache","import hashlib","import json","from cost_katana import CostKatana"],"dependencies":["cost-katana"],"description":"LRU cache implementation for reducing duplicate API calls and costs"}
# Implement caching
ck = CostKatana(api_key='your-api-key')

@lru_cache(maxsize=1000)
def cached_chat_completion(messages_hash, model): return ck.chat.completions.create( model=model, messages=json.loads(messages_hash) )

def chat_with_caching(messages, model='gpt-3.5-turbo'): messages_str = json.dumps(messages, sort_keys=True) messages_hash = hashlib.md5(messages_str.encode()).hexdigest() return cached_chat_completion(messages_hash, model)
\`\`\`

## Getting Started

1. **Install SDK**: \`pip install cost-katana\`
2. **Get API Key**: Sign up at [costkatana.com](https://costkatana.com)
3. **Initialize Client**: \`ck = CostKatana(api_key='your-key')\`
4. **Start Tracking**: Begin monitoring your AI costs
5. **Optimize**: Use insights to reduce expenses

Ready to optimize your Python AI costs? Get started today! `} />
);

export const ChatGPTPage = () => (<DocumentationPage title="ChatGPT Integration" description="Direct ChatGPT custom GPT integration for instant optimization" prevPage={{ path: '/integrations/cli', label: 'Previous: CLI Tool' }} fallbackContent={`# ChatGPT Integration

Direct integration with ChatGPT through custom GPT for instant AI cost optimization and analysis.

![ChatGPT Integration](/assets/gpt.png)

## Custom GPT Integration

### Overview

Our ChatGPT custom GPT provides instant access to Cost Katana's optimization features directly within ChatGPT conversations.

**Features:**
- **Instant Prompt Optimization** - Optimize prompts in real-time
- **Cost Analysis** - Get immediate cost breakdowns
- **Model Recommendations** - AI-powered model suggestions
- **Usage Tracking** - Monitor your AI spending
- **Workflow Analysis** - Analyze multi-step AI processes

### Installation

Follow this step-by-step guide:

\`\`\`steps:ChatGPT Integration Setup
[{"title":"Access Custom GPT","description":"Open ChatGPT Custom GPTs","content":"Visit the ChatGPT Custom GPTs page:","code":"https://chat.openai.com/gpts"},{"title":"Find Cost Katana","description":"Search for Cost Katana GPT","content":"Search for 'CostKatana' in the GPT store","code":"Search: CostKatana"},{"title":"Install GPT","description":"Add the Custom GPT","content":"Click 'Use this GPT' to add it to your ChatGPT","code":"Click: Use this GPT"},{"title":"Configure API Key","description":"Connect your Cost Katana account","content":"Enter your Cost Katana API key when prompted","code":"API Key: ck_your_key_here"}]
\`\`\`

Or follow these steps manually:

1. **Access Custom GPT**: Visit [ChatGPT Custom GPTs](https://chat.openai.com/gpts)
2. **Search for Cost Katana**: Find "CostKatana"
3. **Install**: Click "Use this GPT"
4. **Configure**: Connect your Cost Katana API key

![Custom GPT Setup](/assets/prompt_templates_2.png)

## Chat Commands

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

## Advanced Features

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

## Usage Analytics

### Real-time Monitoring
The custom GPT can access your Cost Katana dashboard to provide:

- **Current spending** across all projects
- **Usage trends** and patterns
- **Budget utilization** percentages
- **Cost anomaly** detection
- **Optimization opportunities** ### Interactive Reports
\`\`\`
Show me my AI spending report for the last 30 days with optimization recommendations. \`\`\`

**Report includes:**
- Visual spending breakdown
- Top cost drivers
- Efficiency metrics
- Action items for cost reduction

## Use Cases

### 1. Content Creation Teams
\`\`\`
I need to optimize costs for a content team that creates:
- 50 blog posts per month
- 200 social media posts per month 
- 20 email newsletters per month \`\`\`

### 2. Customer Support
\`\`\`
Optimize our customer support AI that handles:
- 1000 tickets per day
- Average response length: 100 words
- Required response time: < 30 seconds \`\`\`

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

## Security & Privacy

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

## Getting Started

### Step 1: Setup Cost Katana Account
1. Sign up at [costkatana.com](https://costkatana.com)
2. Get your API key from the dashboard
3. Configure your AI providers

### Step 2: Install Custom GPT
1. Go to ChatGPT and find "CostKatana"
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

## Pro Tips

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

## Integration Examples

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

## Support

Need help with the ChatGPT integration?

- **In-chat help**: Type \`/help\` in the custom GPT
- **Documentation**: Visit [docs.costkatana.com](https://docs.costkatana.com)
- **Email support**: support@costkatana.com
- **Community**: Join our Discord community

Start optimizing your AI costs directly in ChatGPT today! `} />
);

// Features Pages
export const FeaturesOverviewPage = () => (<DocumentationPage title="Features Overview" description="Explore all Cost Katana features for AI cost optimization" nextPage={{ path: '/features/dashboard', label: 'Next: Dashboard' }} fallbackContent={`# Cost Katana Features Overview

Comprehensive AI cost optimization platform powered by revolutionary **Cortex Meta-Language** to reduce your AI spending by up to **95%** through LISP-based answer generation.

![Cost Katana Features Overview](/assets/dashboard_1.png)

## Core Features

### Provider-Independent Architecture
Write once, run anywhere. Cost Katana's provider-agnostic core eliminates vendor lock-in and maximizes flexibility.

**Key Capabilities:**
- **Capability-Based Routing** - Request by capability (code generation, vision, conversation) not by provider
- **Performance-Based Selection** - Specify speed, cost, or quality preferences instead of hardcoding models
- **Automatic Failover** - Seamless provider switching when one goes down
- **Zero Lock-In** - Switch providers without changing a single line of code
- **Unified API** - One interface for 400+ models across 12+ providers
- **Intelligent Routing** - AI-powered model selection based on your requirements

**Example:**
\`\`\`typescript
// Provider-agnostic: automatically selects best model
const response = await ai('code-generation', 'Write a REST API');

// Performance-based: optimize for speed and cost
const fast = await ai({ speed: 'fastest', cost: 'cheap' }, prompt);
\`\`\`

[Learn Provider-Agnostic Patterns →](/examples/provider-agnostic)

### Real-time Dashboard
Monitor your AI costs and usage in real-time with beautiful, customizable dashboards.

**Key Benefits:**
- **Live cost tracking** across all AI providers
- **Usage analytics** with detailed breakdowns
- **Performance monitoring** and health checks
- **Custom widgets** and views

[Explore Dashboard →](/features/dashboard)

![Dashboard Analytics](/assets/analytics_1.png)

### Usage Tracking
Comprehensive tracking of all your AI API calls with detailed analytics and insights.

**Features:**
- **Automatic tracking** for all major AI providers
- **Request-level details** with full audit trails
- **User attribution** and project segmentation
- **Cost allocation** and chargeback reports

[Learn More →](/features/usage-tracking)

### Cost Analytics
Deep dive into your AI spending with advanced analytics and optimization recommendations.

**Analytics Include:**
- **Cost trends** and forecasting
- **Provider comparisons** and recommendations
- **Usage patterns** and anomaly detection
- **ROI analysis** and optimization opportunities

[View Analytics →](/features/analytics)

![Cost Analytics Dashboard](/assets/analytics_2.png)

## Advanced Features

### Cortex Meta-Language (Revolutionary)
The world's first AI meta-language achieving **40-75% token reduction** through LISP-based answer generation.

**Cortex Features:**
- **3-Stage Pipeline** - Encoder → Core Processor → Decoder optimization
- **Complete Answer Generation** - Generate full responses in optimized LISP format
- **Dynamic LISP Instructions** - AI-powered instruction generation for any context
- **Claude Opus 4.1 Core** - Latest AI models for maximum capability
- **Real-time Analytics** - Confidence, cost impact, and semantic integrity metrics
- **Universal Context Handling** - Technical, business, and industry-specific processing

**Usage Example:** Try this example with all necessary imports and context:

\`\`\`smart:javascript:{"imports":["import { gateway } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Complete Cortex example with automatic token reduction"}
const response = await gateway.openai({ model: 'gpt-4o-mini', messages: [{ role: 'user', content: 'Write a REST API in Node.js' }]
}, { cortex: { enabled: true, mode: 'answer_generation', coreModel: 'claude-opus-4-1', dynamicInstructions: true }
});

// Achieve 89% token reduction!
console.log(response.metadata.cortex.tokenReduction);
\`\`\`

[Learn More About Cortex →](/features/cortex)

### Traditional AI Optimization Engine
Intelligent optimization powered by machine learning to automatically reduce your costs.

**Optimization Types:**
- **Prompt optimization** - Reduce token usage while maintaining quality
- **Model routing** - Automatically select the most cost-effective model
- **Caching strategies** - Eliminate duplicate requests
- **Batch processing** - Optimize request patterns

[Discover Optimization →](/features/optimization)

![AI Optimization Results](/assets/optimization_1.png)

### Data Network Effects (Self-Improving AI)
Continuous learning system that gets smarter with every interaction across all users.

**Network Effects Features:**
- **Learning Loops** - Tracks recommendations → outcomes → weight updates for continuous improvement
- **Performance Aggregation** - Collective intelligence from all users improves model routing for everyone
- **Semantic Clustering** - Groups similar use cases to share optimization insights
- **Global Benchmarks** - Compare your performance against anonymized aggregate data
- **Recommendation Quality Tracking** - Measures accuracy of suggestions and adapts accordingly
- **Multi-Dimensional Learning** - Improves across cost, speed, quality, and user satisfaction

**How It Works:**
1. System makes optimization recommendations
2. You accept or reject suggestions
3. Actual outcomes are measured (cost savings, performance)
4. Learning signals feed back into the system
5. Future recommendations improve for everyone

[Explore Network Effects →](/features/data-network-effects)

### Predictive Intelligence
AI-powered forecasting and recommendations to stay ahead of your costs.

**Predictive Features:**
- **Cost forecasting** with 95% accuracy
- **Usage predictions** based on historical data
- **Budget alerts** and recommendations
- **Anomaly detection** and early warnings

[Explore Intelligence →](/features/predictive-intelligence)

### Project Management
Organize and track costs across multiple projects and teams.

**Project Features:**
- **Multi-project support** with cost isolation
- **Team collaboration** and access controls
- **Budget allocation** and tracking
- **Cross-project analytics** and reporting

[Manage Projects →](/features/projects)

![Project Management Interface](/assets/usage_1.png)

## Productivity Tools

### Prompt Templates
Pre-built and custom templates to standardize your AI interactions.

**Template Benefits:**
- **Consistency** across your organization
- **Cost optimization** built-in
- **Version control** and collaboration
- **Performance tracking** per template

[Browse Templates →](/features/templates)

### Agent Trace
Monitor and optimize agent traces with the observability dashboard.

**Agent Trace Capabilities:**
- **Trace dashboard** with execution overview
- **Multi-step processes** with conditional logic
- **Cost optimization** at each step
- **Error handling** and retry mechanisms

[Agent Trace →](/features/agent-trace)

![Agent Trace](/assets/workflows_1.png)

## Infrastructure Features

### Gateway & Proxy
Centralized gateway for all your AI API calls with built-in optimization.

**Gateway Features:**
- **Universal API** compatible with all providers
- **Automatic failover** and load balancing
- **Request caching** and deduplication
- **Rate limiting** and quota management

[Setup Gateway →](/features/gateway)

### Key Vault
Secure management of all your AI provider API keys.

**Security Features:**
- **Encrypted storage** with enterprise-grade security
- **Access controls** and audit logging
- **Key rotation** and lifecycle management
- **Integration** with popular secret managers

[Secure Keys →](/features/key-vault)

![Security Dashboard](/assets/gateway_1.png)

### Alerts & Monitoring
Proactive monitoring with intelligent alerts and notifications.

**Alert Types:**
- **Budget thresholds** and spending limits
- **Usage anomalies** and cost spikes
- **Performance issues** and downtime
- **Optimization opportunities** and recommendations

[Configure Alerts →](/features/alerts)

## Key Benefits

### **Cost Savings**
- **Average 70% reduction** in AI costs
- **Intelligent optimization** without quality loss
- **Automatic scaling** based on usage patterns
- **Budget controls** and spending limits

### **Visibility & Control**
- **Complete transparency** into AI spending
- **Granular tracking** at request level
- **Team collaboration** and cost allocation
- **Compliance reporting** and audit trails

### **Performance**
- **Sub-100ms latency** added overhead
- **99.9% uptime** SLA with redundancy
- **Global edge** deployment for speed
- **Automatic failover** and load balancing

### **Security**
- **Enterprise-grade** encryption and security
- **SOC 2 Type II** compliance
- **Zero data retention** policy
- **Advanced access** controls and audit logs

## Getting Started

### Quick Setup (5 minutes)
1. **Sign up** for your free account
2. **Connect** your AI provider APIs
3. **Install** SDK or CLI tool
4. **Start tracking** and optimizing immediately

### Implementation Options
- ** Web Dashboard** - Complete web interface
- ** CLI Tool** - Command-line power user interface
- ** SDKs** - Node.js, Python, and more
- ** API** - Direct REST API integration

### Support & Resources
- ** Documentation** - Comprehensive guides and tutorials
- ** Community** - Discord community and forums
- ** Support** - 24/7 technical support
- ** Training** - Onboarding and best practices

## Success Stories

### Startup Success
*"Cost Katana helped us reduce our AI costs by 80% while scaling from 1K to 1M users. The automatic optimization saved us $50K+ in our first year."*

### Enterprise Efficiency 
*"With 500+ developers using AI APIs, Cost Katana gave us the visibility and control we needed. We now track every dollar and optimize continuously."*

### Agency Growth
*"Managing AI costs for 50+ clients was impossible before Cost Katana. Now we have complete transparency and can offer cost optimization as a service."*

## Ready to Get Started?

Choose your path to AI cost optimization:

- ** Start Free Trial** - No credit card required
- ** Schedule Demo** - See Cost Katana in action
- ** Read Documentation** - Technical implementation guides
- ** Join Community** - Connect with other users

Transform your AI costs today with Cost Katana! `} />
);

export const DashboardPage = () => (<DocumentationPage title="Dashboard" description="Real-time monitoring and insights dashboard" prevPage={{ path: '/features', label: 'Back to Features' }} nextPage={{ path: '/features/usage-tracking', label: 'Next: Usage Tracking' }} fallbackContent={`# Dashboard

Real-time monitoring and insights dashboard for comprehensive AI cost tracking.

![Main Dashboard Overview](/assets/dashboard_1.png)

## Features

### Real-time Monitoring
- **Live Cost Tracking**: See spending as it happens
- **Usage Metrics**: Real-time API call monitoring
- **Provider Status**: Health checks for all AI providers
- **Performance Metrics**: Response times and success rates

### Try It Out

Test the dashboard API to get real-time metrics:

\`\`\`api:GET:/api/v1/dashboard/metrics:Get Dashboard Metrics:{"Authorization":"Bearer YOUR_API_KEY"}:{}:{"success":true,"metrics":{"totalCost":1250.50,"totalRequests":45000,"avgCostPerRequest":0.028,"topModels":["gpt-4","claude-3-opus"]}}
\`\`\`

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
- Performance improvements

---

## 🆕 Architectural Health Monitoring

Monitor the **strategic health** of your AI infrastructure, not just operational metrics.

### Architecture Health Score

Track overall architectural quality:

\`\`\`typescript
GET /api/v1/dashboard/architecture-health

Response:
{
  "overall_health": 87,  // Score out of 100
  "components": {
    "adr_coverage": { score: 73, target: 90, status: "warning" },
    "tradeoff_explicitness": { score: 68, target: 95, status: "warning" },
    "circuit_breaker_health": { score: 96, target: 90, status: "excellent" },
    "blast_radius_containment": { score: 97, target: 95, status: "excellent" },
    "sla_compliance": { score: 100, target: 100, status: "perfect" }
  }
}
\`\`\`

### Strategic Metrics Widget

Monitor key architectural decisions:

- **ADR Coverage**: Percentage of strategic decisions documented
- **Tradeoff Explicitness**: How clear cost-performance tradeoffs are
- **Policy Compliance**: Adherence to strategic policies
- **Decision Quality**: Effectiveness of architectural choices

### Failure Domain Health

Visualize failure isolation effectiveness:

\`\`\`typescript
GET /api/v1/dashboard/failure-domains

Response:
{
  "circuit_breakers": {
    "providers": { total: 12, closed: 10, half_open: 1, open: 1 },
    "services": { total: 25, closed: 24, half_open: 1, open: 0 }
  },
  "blast_radius_containment": 0.973,  // 97.3% of failures contained
  "mttd_seconds": 21,                  // Mean time to detect
  "cascading_failures": 0.027          // 2.7% cascaded
}
\`\`\`

### Cost-Performance Dashboard

Track optimization effectiveness:

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Token Reduction | 58% | 40-75% | ✅ On Target |
| Net Cost Savings | $12.1K/mo | Positive | ✅ Excellent |
| Cache Hit Rate | 74% | 70%+ | ✅ Excellent |
| SLA Compliance | 100% | 95%+ | ✅ Perfect |

### Tradeoff Visualization

See where you're optimizing:

\`\`\`
Cost-Performance Triangle:

        ⚡ Speed
         /\\
        /  \\
       /    \\   ← Your Strategy (Balanced)
      /  🎯  \\
     /        \\
    /          \\
   /____________\\
  💰 Cost   📊 Quality
\`\`\`

### Strategic Alerts

Get notified about architectural issues:

- **P0 Critical**: Blast radius containment < 90%
- **P0 Critical**: SLA compliance breach
- **P1 High**: ADR coverage < 80%
- **P1 High**: Tradeoff explicitness < 70%
- **P2 Medium**: MTTD > 40 seconds

### Dashboard Configuration

Enable architectural monitoring:

\`\`\`typescript
// Enable in dashboard settings
{
  "enable_architecture_monitoring": true,
  "metrics": [
    "adr_coverage",
    "circuit_breaker_health",
    "blast_radius_containment",
    "cost_performance_effectiveness",
    "strategic_decision_quality"
  ],
  "refresh_interval": 60  // seconds
}
\`\`\`

### Integration with Observability

Connect with your existing monitoring:

- **Grafana**: Import "Cost Katana - Architecture Health" dashboard
- **Datadog**: Enable "Architecture Metrics" integration
- **New Relic**: Use "Strategic Health" dashboard template

### Learn More

- **[Architecture Overview](/architecture)** - Understand architectural principles
- **[Strategic Metrics](/architecture/metrics)** - Deep dive into metrics
- **[Failure Domains](/architecture/failure-domains)** - Explore isolation strategy

---

*Monitor strategy, not just syntax. Track architectural health alongside operational metrics.*`} />
);

export const UsageTrackingPage = () => (<DocumentationPage title="Usage Tracking" description="Track your AI usage across all providers" prevPage={{ path: '/features/dashboard', label: 'Previous: Dashboard' }} nextPage={{ path: '/features/analytics', label: 'Next: Cost Analytics' }} fallbackContent={`# Usage Tracking

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
const response = await ck.chat.completions.create({ model: "gpt-4", messages: [{ role: "user", content: "Hello" }]
});
// Usage automatically tracked!
\`\`\`

### Manual Tracking

For custom integrations, manually track usage:

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Manual usage tracking example with all imports"}
const ck = new CostKatana({ apiKey: 'your-api-key' });

await ck.track({ provider: 'openai', model: 'gpt-4', usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 }
});
\`\`\`

Or test the tracking API directly:

\`\`\`api:POST:/api/v1/usage/track:Track AI Usage:{"Authorization":"Bearer YOUR_API_KEY","Content-Type":"application/json"}:{"provider":"openai","model":"gpt-4","usage":{"prompt_tokens":100,"completion_tokens":50,"total_tokens":150}}:{"success":true,"tracked":{"id":"track_123","provider":"openai","tokens":150,"cost":0.002}}
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
- Rate limit warnings`} />
);

export const CostAnalyticsPage = () => (<DocumentationPage title="Cost Analytics" description="Advanced cost analysis and reporting" prevPage={{ path: '/features/usage-tracking', label: 'Previous: Usage Tracking' }} nextPage={{ path: '/features/optimization', label: 'Next: AI Optimization' }} fallbackContent={`# Cost Analytics

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
- **Caching Strategies**: Reduce redundant API calls`} />
);

export const OptimizationPage = () => (<DocumentationPage title="AI Optimization" description="Intelligent cost reduction strategies powered by AI" prevPage={{ path: '/features/analytics', label: 'Previous: Cost Analytics' }} nextPage={{ path: '/features/predictive-intelligence', label: 'Next: Predictive Intelligence' }} fallbackContent={`# AI-Powered Optimization

Reduce your AI costs by up to 70% with intelligent optimization strategies.

![AI Optimization Dashboard](/assets/optimization_1.png)

## Optimization Techniques

### Prompt Optimization
- **Automatic Compression**: Reduce prompt size without losing context
- **Token Reduction**: Remove unnecessary tokens
- **Context Management**: Smart context window usage
- **Prompt Templates**: Reusable optimized prompts

### Try Optimization

Use this example with all necessary imports and context:

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Complete optimization example"}
const ck = new CostKatana({ apiKey: 'your-api-key' });
const result = await ck.optimization.optimize({ prompt: 'Your prompt here', strategy: 'aggressive'
});
console.log('Savings:', result.costSavings);
\`\`\`

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

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Apply optimization recommendations"}
const ck = new CostKatana({ apiKey: 'your-api-key' });

// Get optimization suggestions
const suggestions = await ck.getOptimizations();
console.log('Available optimizations:', suggestions);

// Apply selected optimizations
if (suggestions.length > 0) { const result = await ck.applyOptimization(suggestions[0].id); console.log('Optimization applied:', result);
}
\`\`\`

### Custom Rules
Define your own optimization rules:

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Create custom optimization rules"}
const ck = new CostKatana({ apiKey: 'your-api-key' });

ck.addRule({ name: 'Use GPT-3.5 for summaries', condition: { task: 'summarization' }, action: { model: 'gpt-3.5-turbo' }
});
\`\`\`

## Results Tracking

Monitor optimization impact:

- **Savings Dashboard**: Real-time cost reduction metrics
- **Before/After Comparison**: See the impact of each optimization
- **Quality Metrics**: Ensure output quality is maintained
- **ROI Tracking**: Measure optimization effectiveness`} />
);

export const PredictiveIntelligencePage = () => (<DocumentationPage title="Predictive Intelligence" description="AI-powered forecasting and predictive analytics" prevPage={{ path: '/features/optimization', label: 'Previous: AI Optimization' }} nextPage={{ path: '/features/projects', label: 'Next: Projects' }} fallbackContent={`# Predictive Intelligence

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

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Set up predictive actions for automatic cost optimization"}
const ck = new CostKatana({ apiKey: 'your-api-key' });

// Set up predictive action
await ck.setPredictiveAction({ trigger: 'budget_80_percent', action: 'switch_to_cheaper_model', models: { from: 'gpt-4', to: 'gpt-3.5-turbo' }
});

console.log('Predictive action configured!');
\`\`\`

![Advanced Predictive Analytics](/assets/predictive_intelligence_3.png)

## Dashboard

The Predictive Intelligence dashboard shows:

- **Cost Forecast Graph**: Visual prediction timeline
- **Confidence Scores**: Prediction reliability metrics
- **Risk Indicators**: Potential issues highlighted
- **Recommendation Cards**: AI-suggested actions
- **What-If Scenarios**: Test different strategies`} />
);

export const ProjectsPage = () => (<DocumentationPage title="Project Management" description="Organize and track AI usage by projects" prevPage={{ path: '/features/predictive-intelligence', label: 'Previous: Predictive Intelligence' }} nextPage={{ path: '/features/templates', label: 'Next: Prompt Templates' }} fallbackContent={`# Project Management

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
2. Enter project details: - Name and description - Budget and limits - Team members - Tags and categories

### Via API

Try creating a project:

\`\`\`api:POST:/api/v1/projects:Create Project:{"Authorization":"Bearer YOUR_API_KEY","Content-Type":"application/json"}:{"name":"Customer Support Bot","budget":1000,"description":"AI-powered customer support"}:{"success":true,"project":{"id":"proj_123","name":"Customer Support Bot","budget":1000}}
\`\`\`

Or use the SDK:

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Create a project with the SDK"}
const ck = new CostKatana({ apiKey: 'your-api-key' });

const project = await ck.projects.create({ name: 'Customer Support Bot', budget: 1000, team: ['alice@example.com', 'bob@example.com'], limits: { daily_spend: 50, requests_per_minute: 100 }
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
- Document best practices`} />
);

export const TemplatesPage = () => (<DocumentationPage title="Prompt Templates" description="Create and manage reusable optimized prompts" prevPage={{ path: '/features/projects', label: 'Previous: Projects' }} nextPage={{ path: '/features/agent-trace', label: 'Next: Agent Trace' }} fallbackContent={`# Prompt Templates

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
2. Choose template type: - System prompts - User prompts - Chain templates - Function calling

3. Define variables: \`\`\` {{user_name}} - User's name {{context}} - Dynamic context {{language}} - Target language \`\`\`

4. Optimize and save

### Via Code
\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Create and run prompt templates programmatically"}
import { CostKatana } from 'cost-katana';

const ck = new CostKatana({ apiKey: 'your-api-key' });

const template = await ck.templates.create({ name: 'Customer Support Response', prompt: 'You are a helpful assistant. User: {{query}}', variables: ['query'], model: 'gpt-3.5-turbo', max_tokens: 150
});

// Use template
const response = await ck.templates.run(template.id, { variables: { query: 'How do I reset my password?' }
});
\`\`\`

### Try Template Creation

Use this example with all necessary imports and context:

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Create and use prompt templates"}
const ck = new CostKatana({ apiKey: 'your-api-key' });

// Create a template
const template = await ck.templates.create({ name: 'Customer Support', content: 'Help the user with: {{query}}', variables: ['query'], model: 'gpt-3.5-turbo', max_tokens: 150
});

console.log('Template created:', template.id);

// Use template
const response = await ck.templates.run(template.id, { variables: { query: 'How do I reset my password?' }
});

console.log('Response:', response);
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
- Optimize regularly`} />
);

export const WorkflowsPage = () => (<DocumentationPage title="Agent Trace" description="Monitor and optimize agent traces and multi-step AI operations" prevPage={{ path: '/features/templates', label: 'Previous: Prompt Templates' }} nextPage={{ path: '/features/gateway', label: 'Next: Gateway & Proxy' }} fallbackContent={`# Agent Trace

Monitor, trace, and optimize multi-step AI agent executions.

![Agent Trace Observatory](/assets/workflows_1.png)

## Agent Trace Features

### Visual Designer
- **Drag-and-Drop Interface**: Build traces visually
- **Pre-built Components**: Ready-to-use blocks
- **Conditional Logic**: If/then branches
- **Loops & Iterations**: Process lists and data

![Agent Trace Dashboard](/assets/workflows_2.png)

### Execution Engine
- **Parallel Processing**: Run steps simultaneously
- **Error Handling**: Automatic retries and fallbacks
- **State Management**: Maintain context across steps
- **Queue System**: Handle high volumes

### Monitoring
- **Real-time Tracking**: See traces in action
- **Step Metrics**: Time and cost per step
- **Bottleneck Detection**: Identify slow points
- **Success Rates**: Track completion rates

## Building Agent Traces

### Visual Builder
1. Open **Agent Trace** → **Create New**
2. Drag components from the palette:
   - AI Model calls
   - Data transformations
   - Conditionals
   - External APIs
3. Connect components with arrows
4. Configure each step
5. Test and deploy

### Code-Based
\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Create agent traces with dependencies and parallel processing"}
import { CostKatana } from 'cost-katana';

const ck = new CostKatana({ apiKey: 'your-api-key' });

const trace = await ck.getAgentTraces(); // List traces; use API to create/execute
// Use /agent-trace API for templates and execution
\`\`\`

## Trace Optimization

### Cost Optimization
- **Model Selection**: Choose optimal models per step
- **Caching**: Cache intermediate results
- **Batch Processing**: Group similar operations
- **Skip Logic**: Avoid unnecessary steps

### Performance Tuning
- **Parallelization**: Run independent steps simultaneously
- **Timeout Settings**: Prevent hanging traces
- **Resource Allocation**: Optimize compute resources
- **Priority Queues**: Handle urgent traces first

## Monitoring & Analytics

### Dashboard
- **Active Traces**: Currently running
- **Completed**: Success/failure rates
- **Performance Metrics**: Average duration
- **Cost Analysis**: Spending per trace

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
- **Trace Versions**: Track changes
- **Rollback**: Revert to previous versions
- **A/B Testing**: Test trace variations
- **Staging**: Test before production`} />
);

export const GatewayPage = () => (<DocumentationPage title="Gateway & Proxy" description="Unified API gateway for all AI providers" prevPage={{ path: '/features/agent-trace', label: 'Previous: Agent Trace' }} nextPage={{ path: '/features/key-vault', label: 'Next: Key Vault' }} fallbackContent={`# Gateway & Proxy

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

Follow this setup guide:

\`\`\`steps:Gateway Setup
[{"title":"Set Endpoint","description":"Configure your API endpoint","content":"Point your API calls to Cost Katana:","code":"export AI_ENDPOINT=\\"https://gateway.costkatana.com/v1\\""},{"title":"Set API Key","description":"Add your API key","content":"Set your authentication key:","code":"export API_KEY=\\"ck_your_key_here\\""},{"title":"Test Connection","description":"Verify gateway is working","content":"Test the connection:","code":"curl -H \\"Authorization: Bearer $API_KEY\\" $AI_ENDPOINT/health"}]
\`\`\`

Or use the SDK:

\`\`\`smart:javascript:{"imports":["import { CostKatanaGateway } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Configure and use the API gateway"}
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

// Make a request through the gateway
const response = await gateway.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello!' }]
});

console.log('Response:', response);
console.log('Provider used:', response.metadata.provider);
console.log('Cost:', response.metadata.cost);
\`\`\`

### Configuration

\`\`\`smart:javascript:{"imports":["import { CostKatanaGateway } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Complete gateway configuration example"}
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
- **Compliance**: GDPR, SOC2 compliant`} />
);

export const KeyVaultPage = () => (<DocumentationPage title="Key Vault" description="Secure API key management and rotation" prevPage={{ path: '/features/gateway', label: 'Previous: Gateway & Proxy' }} nextPage={{ path: '/features/alerts', label: 'Next: Alerts' }} fallbackContent={`# Key Vault

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
\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Add API keys to vault and use them for API calls with usage limits"}
import { CostKatana } from 'cost-katana';

const ck = new CostKatana({ apiKey: 'your-api-key' });

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
  messages: [{ role: 'user', content: 'Hello!' }],
  key_id: key.id // Use specific key
});
\`\`\`

## Key Rotation

### Manual Rotation
\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Manually rotate API keys with grace period for zero-downtime updates"}
import { CostKatana } from 'cost-katana';

const ck = new CostKatana({ apiKey: 'your-api-key' });

// Rotate a key
await ck.vault.rotateKey(keyId, {
  new_value: 'sk-new-key...',
  grace_period: 300 // 5 minutes overlap
});
\`\`\`

### Automatic Rotation
Set up scheduled rotation:

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Configure automatic key rotation with scheduled updates and notifications"}
import { CostKatana } from 'cost-katana';

const ck = new CostKatana({ apiKey: 'your-api-key' });

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
\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Grant team access to API keys with role-based permissions"}
import { CostKatana } from 'cost-katana';

const ck = new CostKatana({ apiKey: 'your-api-key' });

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
- Review unused keys`} />
);

export const AlertsPage = () => (<DocumentationPage title="Alerts & Notifications" description="Proactive monitoring and intelligent alerting" prevPage={{ path: '/features/key-vault', label: 'Previous: Key Vault' }} nextPage={{ path: '/features/training', label: 'Next: Training' }} fallbackContent={`# Alerts & Notifications

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
\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Create budget and usage alerts with multiple notification channels"}
import { CostKatana } from 'cost-katana';

const ck = new CostKatana({ apiKey: 'your-api-key' });

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
\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Create advanced alerts with custom conditions, severity levels, and automated actions"}
import { CostKatana } from 'cost-katana';

const ck = new CostKatana({ apiKey: 'your-api-key' });

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
\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Configure Slack integration for alert notifications"}
import { CostKatana } from 'cost-katana';

const ck = new CostKatana({ apiKey: 'your-api-key' });

// Configure Slack integration
await ck.integrations.slack.connect({
  webhook_url: 'https://hooks.slack.com/...',
  channel: '#ai-costs',
  username: 'Cost Katana Bot'
});
\`\`\`

### Webhooks
\`\`\`smart:javascript:{"imports":[],"dependencies":[],"description":"Webhook payload structure for alert notifications"}
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
\`\`\`smart:javascript:{"imports":[],"dependencies":[],"description":"Throttling action configuration for alert responses"}
{
  action: 'throttle',
  config: {
    requests_per_minute: 10,
    duration: 3600 // 1 hour
  }
}
\`\`\`

#### Model Switching
\`\`\`smart:javascript:{"imports":[],"dependencies":[],"description":"Model switching action configuration for cost optimization"}
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
\`\`\`smart:javascript:{"imports":[],"dependencies":[],"description":"Circuit breaker action configuration for provider failover"}
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
- Regular alert reviews`} />
); // API Documentation Pages
export const APIOverviewPage = () => (<DocumentationPage title="API Overview" description="Complete API reference for Cost Katana" nextPage={{ path: '/api/authentication', label: 'Next: Authentication' }} fallbackContent={`# API Overview

Complete REST API reference for Cost Katana. All endpoints use JSON for request and response bodies.

![API Overview](/assets/api_overview.png)

## Base URL

All API requests should be made to:

\`\`\`
https://api.costkatana.com
\`\`\`

## Authentication

Cost Katana uses API key authentication. Include your API key in the request header:

\`\`\`bash
Authorization: Bearer ck_your_api_key_here
\`\`\`

[Learn more about authentication →](/api/authentication)

## API Versioning

The API is versioned. Current version: 

\`\`\`
https://api.costkatana.com/...
\`\`\`

## Response Format

All API responses follow a consistent format:

### Success Response

\`\`\`json
{
  "success": true,
  "data": {
    // Response data here
  }
}
\`\`\`

### Error Response

\`\`\`json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
\`\`\`

## Rate Limits

API rate limits vary by plan:

- **Free Tier**: 100 requests/minute
- **Pro**: 1,000 requests/minute
- **Enterprise**: 10,000+ requests/minute

Rate limit information is included in response headers:

\`\`\`
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1642075200
\`\`\`

[View rate limit details →](/api/rate-limits)

## Endpoints Overview

### Authentication & Authorization
- **POST** \`/v1/auth/login\` - User login
- **POST** \`/v1/auth/refresh\` - Refresh access token
- **GET** \`/v1/auth/me\` - Get current user

### Usage Tracking
- **POST** \`/v1/usage/track\` - Track AI API usage
- **GET** \`/v1/usage/stats\` - Get usage statistics
- **GET** \`/v1/usage/project/:projectId\` - Get project usage

[View Usage API →](/api/usage)

#### Try It Out - Test the Usage API

\`\`\`api:POST:/v1/usage/track:Track AI API Usage:{"Authorization":"Bearer YOUR_API_KEY","Content-Type":"application/json"}:{"project":"demo-project","provider":"openai","model":"gpt-4","tokens":1500,"cost":0.045}:{"success":true,"usage":{"id":"usage_123","project":"demo-project","tokens":1500,"cost":0.045,"timestamp":"2024-01-15T10:30:00Z"}}
\`\`\`

### Analytics
- **GET** \`/v1/analytics\` - Get analytics data
- **GET** \`/v1/analytics/dashboard\` - Dashboard analytics
- **GET** \`/v1/analytics/insights\` - AI-powered insights

[View Analytics API →](/api/analytics)

### Projects
- **GET** \`/v1/projects\` - List projects
- **POST** \`/v1/projects\` - Create project
- **GET** \`/v1/projects/:id\` - Get project details
- **PUT** \`/v1/projects/:id\` - Update project

[View Projects API →](/api/projects)

### Optimization
- **POST** \`/v1/optimizations/prompt\` - Optimize prompt
- **GET** \`/v1/optimizations/opportunities\` - Get opportunities
- **POST** \`/v1/optimizations/:id/apply\` - Apply optimization

[View Optimization API →](/api/optimization)

### Webhooks
- **GET** \`/v1/webhooks\` - List webhooks
- **POST** \`/v1/webhooks\` - Create webhook
- **PUT** \`/v1/webhooks/:id\` - Update webhook

[View Webhooks →](/api/webhooks)

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Rate Limit Exceeded |
| 500 | Internal Server Error |

## Error Codes

Common error codes:

- \`INVALID_API_KEY\` - API key is invalid or expired
- \`RATE_LIMIT_EXCEEDED\` - Too many requests
- \`VALIDATION_ERROR\` - Request validation failed
- \`NOT_FOUND\` - Resource not found
- \`PERMISSION_DENIED\` - Insufficient permissions

## SDKs & Libraries

We provide official SDKs for popular languages:

### Node.js/TypeScript
\`\`\`bash
npm install cost-katana
\`\`\`

### Python
\`\`\`bash
pip install cost-katana
\`\`\`

[View all integrations →](/integrations)

## Getting Started

1. **Get Your API Key**: Sign up and generate an API key from the dashboard
2. **Make Your First Request**: Try the authentication endpoint below
3. **Explore Endpoints**: Use the interactive API documentation
4. **Integrate**: Use our SDKs or make direct HTTP requests

### Try Authentication

Test the authentication endpoint:

\`\`\`api:GET:/api/v1/auth/me:Get Current User:{"Authorization":"Bearer YOUR_API_KEY"}:{}:{"success":true,"user":{"id":"user_123","email":"user@example.com","plan":"pro"}}
\`\`\`

## Support

Need help with the API?

- **Documentation**: Browse detailed endpoint documentation
- **Community**: Join our [Discord](https://discord.gg/D8nDArmKbY)
- **Email**: support@costkatana.com
- **Issues**: [GitHub Issues](https://github.com/Hypothesize-Tech/costkatana-backend/issues)

Ready to start? Begin with [Authentication →](/api/authentication)`} />
);

export const AuthenticationPage = () => (<DocumentationPage title="Authentication" description="JWT and API key authentication methods" prevPage={{ path: '/api', label: 'Back to API Overview' }} nextPage={{ path: '/api/usage', label: 'Next: Usage API' }} fallbackContent={`# Authentication

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
  https://api.costkatana.com/v1/usage

# Query parameter (less secure)
curl https://api.costkatana.com/v1/usage?api_key=ck_your_api_key
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
const response = await fetch('https://api.costkatana.com/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'your_password'
  })
});

const { token } = await response.json();

// Use token in subsequent requests
const data = await fetch('https://api.costkatana.com/v1/usage', {
  headers: { 'Authorization': \`Bearer \${token}\` }
});
\`\`\`

### Token Refresh
\`\`\`javascript
// Refresh expired token
const response = await fetch('https://api.costkatana.com/v1/auth/refresh', {
  method: 'POST',
  headers: { 'Authorization': \`Bearer \${refreshToken}\` }
});

const { token, refreshToken: newRefreshToken } = await response.json();
\`\`\`

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
\`\`\``} />
);

// Tracing Feature Page
export const TracingPage = () => (
  <DocumentationPage
    title="Distributed Tracing"
    description="Enterprise-grade distributed tracing for AI operations"
    prevPage={{ path: '/features/training', label: 'Previous: Training & Fine-tuning' }}
    nextPage={{ path: '/api', label: 'Next: API Reference' }}
    fallbackContent={`# Distributed Tracing

Cost Katana provides enterprise-grade distributed tracing and session replay for all your AI operations. Track every LLM call, tool execution, and API request with automatic parent-child relationships, latency metrics, and cost attribution.

![Sessions Overview](/assets/sessions_1.png)

## Unified Sessions Page

The Sessions page provides two powerful views for monitoring your AI applications:

### 1. Session Replays
Record and replay in-app AI interactions with complete context:
- **Timeline Playback**: View AI interactions chronologically
- **Full Context**: See prompts, responses, costs, and latency
- **User Actions**: Track button clicks and navigation
- **Code Context**: Capture active files and code snippets
- **System Metrics**: Monitor CPU, memory, and performance

### 2. Debug Traces 
Distributed tracing for API-level debugging:
- **Span Trees**: Visualize request hierarchies
- **Timeline View**: See parallel operations
- **Performance Analysis**: Identify bottlenecks
- **Error Tracking**: Debug failures with full context

## Features

### Session Replay Features

#### Automatic Recording
Record AI interactions across different features:
- **Chat Sessions**: Conversational AI interactions
- **Experimentation**: A/B tests and experiments
- **Workflows**: Multi-step AI pipelines
- **Agents**: Autonomous AI agent actions
- **Notebooks**: Jupyter/notebook interactions

#### Rich Context Capture
- **AI Interactions**: Full prompts, responses, tokens, costs, and latency
- **User Actions**: Button clicks, form submissions, navigation
- **Code Context**: Active file, cursor position, code snippets
- **System Metrics**: CPU, memory, active requests
- **Workspace State**: Full environment snapshot

#### Advanced Filtering
Filter sessions by:
- Feature type (chat, experimentation, workflow, etc.)
- Date range
- Cost range
- Token usage
- AI model
- Status (active, completed, error)
- Custom metadata

#### Export & Sharing
- **JSON Export**: Download session data
- **CSV Export**: Export for analysis in Excel
- **Shareable Links**: Generate temporary viewing links
- **API Access**: Programmatic access to replays

### Distributed Tracing Features

#### Hierarchical Traces
- **Automatic Span Relationships**: Parent-child trace relationships
- **Trace Trees**: Visualize complex workflows
- **Session Grouping**: Group related operations
- **Depth Tracking**: Understand call stack depth

#### Zero-Code Instrumentation
- **Express Middleware**: One line to add tracing
- **Auto-instrumentation**: Automatic for all requests
- **Context Propagation**: Seamless trace context flow
- **Session Management**: Automatic session creation

#### Cost Attribution
- **Per-Span Costs**: Track cost at every level
- **Token Counting**: Input/output token metrics
- **Model Attribution**: Cost by model and provider
- **Budget Tracking**: Real-time budget monitoring

#### Visual Timeline
- **Interactive Visualization**: Drag, zoom, filter
- **Gantt Charts**: See parallel operations
- **Latency Analysis**: Identify bottlenecks
- **Critical Path**: Find optimization opportunities

#### PII Redaction
- **Automatic Sanitization**: Server-side redaction
- **Configurable Rules**: Custom sensitive keys
- **Compliance Ready**: GDPR/CCPA compliant
- **Audit Trails**: Track redaction events

## Getting Started

### Session Replay Recording

#### 1. Install SDK

\`\`\`bash
npm install cost-katana
\`\`\`

#### 2. Start Recording

\`\`\`smart:typescript:{"imports":["import { SessionReplayClient } from 'cost-katana/trace';"],"dependencies":["cost-katana"],"description":"Start recording a session replay for AI interactions"}
import { SessionReplayClient } from 'cost-katana/trace';

const replayClient = new SessionReplayClient({
  apiKey: process.env.COST_KATANA_API_KEY
});

// Start recording a chat session
const { sessionId } = await replayClient.startRecording({
  userId: 'user_123',
  feature: 'chat',
  label: 'Customer Support Chat'
});
\`\`\`

#### 3. Record AI Interactions

\`\`\`smart:typescript:{"imports":["import { SessionReplayClient } from 'cost-katana/trace';"],"dependencies":["cost-katana"],"description":"Record AI interactions with full context including tokens, cost, and latency"}
import { SessionReplayClient } from 'cost-katana/trace';

const replayClient = new SessionReplayClient({
  apiKey: process.env.COST_KATANA_API_KEY
});

await replayClient.recordInteraction({
  sessionId,
  interaction: {
    timestamp: new Date(),
    model: 'gpt-4',
    prompt: 'What is the status of my order?',
    response: 'Let me check that for you...',
    tokens: { input: 15, output: 25 },
    cost: 0.0008,
    latency: 1200,
    provider: 'openai'
  }
});
\`\`\`

#### 4. End Recording

\`\`\`smart:typescript:{"imports":["import { SessionReplayClient } from 'cost-katana/trace';"],"dependencies":["cost-katana"],"description":"End session recording and finalize the replay"}
import { SessionReplayClient } from 'cost-katana/trace';

const replayClient = new SessionReplayClient({
  apiKey: process.env.COST_KATANA_API_KEY
});

await replayClient.endRecording(sessionId);
\`\`\`

#### React Hook Example

\`\`\`smart:typescript:{"imports":["import { useSessionRecording } from 'cost-katana/trace';"],"dependencies":["cost-katana","react"],"description":"Use React hook for automatic session recording in React components"}
import { useSessionRecording } from 'cost-katana/trace';

function ChatComponent() {
  const { recordInteraction } = useSessionRecording({
    userId: 'user_123',
    feature: 'chat',
    autoStart: true
  });

  const handleSendMessage = async (message) => {
    const response = await callAI(message);
    await recordInteraction({
      model: 'gpt-4',
      prompt: message,
      response: response.text,
      tokens: response.tokens,
      cost: response.cost,
      latency: response.latency,
      provider: 'openai'
    });
  };

  return <div>...</div>;
}
\`\`\`

### Distributed Tracing

#### 1. Add Middleware

\`\`\`smart:javascript:{"imports":["import { LocalTraceService, createTraceMiddleware } from 'cost-katana/trace';","import express from 'express';"],"dependencies":["cost-katana","express"],"description":"Add distributed tracing middleware to Express application"}
import { LocalTraceService, createTraceMiddleware } from 'cost-katana/trace';
import express from 'express';

const app = express();

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

#### 2. Use Tracked Providers

\`\`\`smart:javascript:{"imports":["import { TrackedOpenAI } from 'cost-katana/trace';","import { LocalTraceService } from 'cost-katana/trace';"],"dependencies":["cost-katana"],"description":"Use tracked OpenAI client for automatic distributed tracing of AI calls"}
import { TrackedOpenAI } from 'cost-katana/trace';
import { LocalTraceService } from 'cost-katana/trace';

const traceService = new LocalTraceService({
  storageMode: 'file',
  storageDir: './traces'
});

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

#### 3. View Sessions

Navigate to the Sessions page in your Cost Katana dashboard to:
- **Replays Tab**: View AI interaction timeline and playback
- **Debug Traces Tab**: Explore trace trees and timelines
- Filter, search, and analyze both types of sessions
- Export data and generate shareable links

## Trace Data Model

### Session
\`\`\`smart:typescript:{"imports":[],"dependencies":[],"description":"Session data model structure for distributed tracing"}
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
\`\`\`smart:typescript:{"imports":[],"dependencies":[],"description":"Trace span data model structure with hierarchical relationships"}
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

\`\`\`smart:javascript:{"imports":["import { LocalTraceService } from 'cost-katana/trace';"],"dependencies":["cost-katana"],"description":"Create custom spans to track any operation in your application"}
import { LocalTraceService } from 'cost-katana/trace';

const traceService = new LocalTraceService({
  storageMode: 'file',
  storageDir: './traces'
});

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
\`\`\`smart:javascript:{"imports":["import { LocalTraceService } from 'cost-katana/trace';"],"dependencies":["cost-katana"],"description":"Configure local trace service for development with in-memory storage"}
import { LocalTraceService } from 'cost-katana/trace';

const traceService = new LocalTraceService({
  storageMode: 'memory',
  maxSessions: 1000,
  autoSave: true
});
\`\`\`

### Production (Cloud)
\`\`\`smart:javascript:{"imports":["import { TraceClient } from 'cost-katana/trace';"],"dependencies":["cost-katana"],"description":"Configure cloud trace client for production with Cost Katana backend"}
import { TraceClient } from 'cost-katana/trace';

const traceService = new TraceClient({
  apiKey: process.env.COST_KATANA_API_KEY,
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

\`\`\`smart:javascript:{"imports":["import { LocalTraceService } from 'cost-katana/trace';"],"dependencies":["cost-katana"],"description":"Configure sampling rates to control trace volume for high-traffic applications"}
import { LocalTraceService } from 'cost-katana/trace';

const traceService = new LocalTraceService({
  samplingRate: 0.1, // Sample 10% of requests
  alwaysSample: ['error', 'slow'] // Always trace errors and slow requests
});
\`\`\`

### Export & Import
Export traces for analysis or migration:

\`\`\`smart:javascript:{"imports":["import { LocalTraceService } from 'cost-katana/trace';"],"dependencies":["cost-katana"],"description":"Export and import traces in OpenTelemetry format for analysis or migration"}
import { LocalTraceService } from 'cost-katana/trace';

const traceService = new LocalTraceService({
  storageMode: 'file',
  storageDir: './traces'
});

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

\`\`\`smart:javascript:{"imports":["import { LocalTraceService } from 'cost-katana/trace';"],"dependencies":["cost-katana"],"description":"Configure alerts for trace anomalies like high latency or errors"}
import { LocalTraceService } from 'cost-katana/trace';

const traceService = new LocalTraceService({
  storageMode: 'file',
  storageDir: './traces'
});

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

export const UsageAPIPage = () => (<DocumentationPage title="Usage API" description="Track AI usage programmatically" prevPage={{ path: '/api/authentication', label: 'Previous: Authentication' }} nextPage={{ path: '/api/analytics', label: 'Next: Analytics API' }} fallbackContent={`# Usage API

The Usage API allows you to track and manage AI API usage across all providers programmatically.

## Endpoints

### Track Usage

\`POST /api/usage/track\`

Track a single AI API call:

Try it out:

\`\`\`api:POST:/api/v1/usage/track:Track AI Usage:{"Authorization":"Bearer YOUR_API_KEY","Content-Type":"application/json"}:{"provider":"openai","model":"gpt-4","usage":{"prompt_tokens":100,"completion_tokens":50,"total_tokens":150},"cost":0.002}:{"success":true,"tracked":{"id":"usage_123","timestamp":"2024-01-15T10:30:00Z"}}
\`\`\`

Or use the SDK:

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Track usage with the SDK"}
const ck = new CostKatana({ apiKey: 'your-api-key' });

await ck.usage.track({
  provider: 'openai',
  model: 'gpt-4',
  usage: {
    prompt_tokens: 100,
    completion_tokens: 50,
    total_tokens: 150
  },
  cost: 0.002
});
\`\`\`

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
import { AICostTracker } from 'cost-katana';

const tracker = await AICostTracker.create({
  providers: [
    {
      provider: 'openai',
      apiKey: process.env.OPENAI_API_KEY
    }
  ],
  tracking: {
    enableAutoTracking: true
  }
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

\`\`\`smart:python:{"imports":["from costkatana import CostKatanaClient"],"dependencies":["cost-katana"],"description":"Track usage and get statistics with the Python SDK"}
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
| 500 | Internal server error |`} />
);

export const AnalyticsAPIPage = () => (<DocumentationPage title="Analytics API" description="Retrieve analytics data via API" prevPage={{ path: '/api/usage', label: 'Previous: Usage API' }} nextPage={{ path: '/api/projects', label: 'Next: Projects API' }} fallbackContent={`# Analytics API

Access comprehensive analytics data for AI usage, costs, and performance metrics.

## Endpoints

### Get Analytics Data

\`GET /api/analytics\`

Query parameters:
- \`startDate\`: Start date (ISO 8601)
- \`endDate\`: End date (ISO 8601)
- \`groupBy\`: provider | model | project | user
- \`period\`: hour | day | week | month | year

Try it out:

\`\`\`api:GET:/api/v1/analytics:Get Analytics:{"Authorization":"Bearer YOUR_API_KEY"}:{"startDate":"2024-01-01","endDate":"2024-01-31","groupBy":"model"}:{"success":true,"data":{"totalCost":2500.75,"byModel":{"gpt-4":1500.50,"claude-3-opus":1000.25}}}
\`\`\`

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
      { "model": "gpt-4", "usage": 45.5, "cost": 5000.00 }
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

\`\`\`smart:python:{"imports":["from costkatana import CostKatanaClient"],"dependencies":["cost-katana"],"description":"Get analytics summary and cost breakdowns with the Python SDK"}
client = CostKatanaClient(api_key='your_api_key')
analytics = client.analytics.get_summary(
  date_range='last_30_days'
)

costs = client.analytics.get_costs(
  start_date='2025-01-01',
  end_date='2025-01-31',
  group_by='model'
)
\`\`\``} />
);

export const ProjectsAPIPage = () => (<DocumentationPage title="Projects API" description="Manage projects programmatically" prevPage={{ path: '/api/analytics', label: 'Previous: Analytics API' }} nextPage={{ path: '/api/optimization', label: 'Next: Optimization API' }} fallbackContent={`# Projects API

Create and manage projects for organizing AI usage and costs.

## Endpoints

### List Projects

\`GET /api/projects\`

Returns all projects for the authenticated user.

### Create Project

\`POST /api/projects\`

Create a new project:

Try it out:

\`\`\`api:POST:/api/v1/projects:Create Project:{"Authorization":"Bearer YOUR_API_KEY","Content-Type":"application/json"}:{"name":"Production API","description":"Main production AI endpoints","budget":{"amount":5000.00,"period":"monthly","currency":"USD"},"tags":["production","critical"]}:{"success":true,"project":{"id":"proj_123","name":"Production API","budget":5000.00}}
\`\`\`

Or use the SDK:

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Create a project with the SDK"}
const ck = new CostKatana({ apiKey: 'your-api-key' });

const project = await ck.projects.create({
  name: 'Production API',
  description: 'Main production AI endpoints',
  budget: {
    amount: 5000.00,
    period: 'monthly',
    currency: 'USD'
  },
  tags: ['production', 'critical']
});
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

\`\`\`smart:python:{"imports":["from costkatana import CostKatanaClient"],"dependencies":["cost-katana"],"description":"Create projects, track usage, and manage team members with the Python SDK"}
# Create project
client = CostKatanaClient(api_key='your_api_key')
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
\`\`\``} />
);

export const OptimizationAPIPage = () => (<DocumentationPage title="Optimization API" description="Access AI optimization features via API" prevPage={{ path: '/api/projects', label: 'Previous: Projects API' }} nextPage={{ path: '/api/webhooks', label: 'Next: Webhooks' }} fallbackContent={`# Optimization API

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
  requirements: { maxLatency: 500, budget: 0.05 }
});
\`\`\`

### Python

\`\`\`smart:python:{"imports":["from costkatana import CostKatanaClient"],"dependencies":["cost-katana"],"description":"Optimize prompts and get model recommendations with the Python SDK"}
# Optimize prompt
client = CostKatanaClient(api_key='your_api_key')
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
\`\`\``} />
);

export const WebhooksPage = () => (<DocumentationPage title="Webhooks" description="Real-time event notifications" prevPage={{ path: '/api/optimization', label: 'Previous: Optimization API' }} nextPage={{ path: '/api/rate-limits', label: 'Next: Rate Limits' }} fallbackContent={`# Alerts & Notifications API

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

Send a test event to verify configuration.`} />
);

export const RateLimitsPage = () => (<DocumentationPage title="Rate Limits" description="API usage limits and quotas" prevPage={{ path: '/api/webhooks', label: 'Previous: Webhooks' }} fallbackContent={`# Rate Limits

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
\`\`\``} />
);

// Support Pages
export const FAQPage = () => (<DocumentationPage title="Frequently Asked Questions" description="Common questions about Cost Katana" fallbackContent={`# Frequently Asked Questions

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

Still have questions? [Contact our support team](mailto:support@costkatana.com) or [join our Discord community](https://discord.gg/D8nDArmKbY) for real-time help!`} />
);

export const SupportPage = () => (<DocumentationPage title="Support & Contact" description="Get help with Cost Katana" fallbackContent={`# Support & Contact

## Get Help with Cost Katana

We're here to help you get the most out of Cost Katana. Whether you're just getting started or need advanced technical support, we have multiple ways to assist you.

## Email Support

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

## Live Chat & Community

### Discord Community
Join our active Discord server for real-time help and discussions:
- **Server**: [discord.gg/costkatana](https://discord.gg/D8nDArmKbY)
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

## Learning Resources

### Documentation
- **Getting Started Guide**: [/getting-started/introduction](/getting-started/introduction)
- **API Reference**: [/api](/api)
- **Integration Guides**: [/integrations](/integrations)
- **Best Practices**: [/features](/features)

## Onboarding & Training

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

## Technical Support

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

## Billing & Account Support

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

## Partnership & Integration

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

## Schedule a Call

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

- [Get Started](/getting-started/introduction)
- [Documentation](/api)
- [Discord Community](https://discord.gg/D8nDArmKbY)
- [Email Support](mailto:support@costkatana.com)
- [Service Status](https://status.costkatana.com)
- [Schedule Demo](https://calendly.com/costkatana-demo)

**Need immediate help?** Start a live chat on our website or email support@costkatana.com. We typically respond within 2 hours during business hours.`} />
);

export const OpenTelemetryVendorsPage = () => (
  <DocumentationPage
    title="OpenTelemetry & Vendor Support"
    description="Native OTel traces/metrics with support for Grafana/Tempo, Datadog, and New Relic"
    fallbackContent={`# OpenTelemetry & Vendor Support

Cost Katana ships with native OpenTelemetry (OTel) integration for traces, metrics, and **failure domain monitoring**.

## Quick Setup (Grafana Cloud)

\`\`\`bash
OTLP_HTTP_TRACES_URL=https://tempo-prod-us-central1.grafana.net/tempo/api/push
OTLP_HTTP_METRICS_URL=https://prometheus-prod-us-central1.grafana.net/api/prom/push
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Bearer <YOUR_TOKEN>
\`\`\`

## Telemetry Endpoints

- \`GET /api/telemetry/metrics\`
- \`GET /api/telemetry/dashboard\`
- \`GET /api/telemetry/traces/:traceId\`
- \`GET /api/telemetry?{filters}\`
- \`GET /api/telemetry/dependencies\`
- \`GET /api/telemetry/health\`
- \`GET /api/telemetry/failure-domains\` 🆕 **Failure domain monitoring**
- \`GET /api/telemetry/circuit-breakers\` 🆕 **Circuit breaker states**

## Dashboard Coverage

- KPIs (RPM, Error %, Avg & P95 Latency)
- Cost by Model
- Recent Errors & Top Errors
- Top Operations
- Telemetry Explorer
- Trace Viewer
- **Service Dependency Graph** (with failure domain isolation)
- **Circuit Breaker Health** 🆕
- **Blast Radius Visualization** 🆕

---

## Failure Domain Monitoring

### What Are Failure Domains?

Failure domains are **isolated system boundaries** that prevent cascading failures. When one service or provider fails, the failure is contained within its domain rather than taking down the entire system.

### Key Metrics

#### Circuit Breaker States
\`\`\`typescript
// Monitor circuit breaker health per domain
GET /api/telemetry/circuit-breakers

Response:
{
  "providers": {
    "openai": { state: "CLOSED", failures: 0, health: 1.00 },
    "anthropic": { state: "CLOSED", failures: 0, health: 1.00 },
    "google": { state: "OPEN", failures: 5, health: 0.00 },
    "aws-bedrock": { state: "HALF_OPEN", failures: 2, health: 0.50 }
  },
  "overall_health": 0.917  // 91.7% healthy
}
\`\`\`

#### Failure Domain Map
\`\`\`typescript
// Visualize failure propagation paths
GET /api/telemetry/failure-domains

Response:
{
  "domains": [
    {
      "name": "gateway",
      "tier": "critical",
      "dependencies": ["providers", "redis"],
      "blast_radius": "single_tenant",
      "isolation_strategy": "per_provider_circuit_breaker"
    },
    {
      "name": "ai_providers",
      "tier": "external",
      "dependencies": [],
      "blast_radius": "single_provider",
      "isolation_strategy": "failover_chain"
    },
    {
      "name": "core_services",
      "tier": "essential",
      "dependencies": ["mongodb", "redis"],
      "blast_radius": "service_tier",
      "isolation_strategy": "graceful_degradation"
    }
  ],
  "containment_rate": 0.973  // 97.3% of failures contained
}
\`\`\`

---

### Grafana Dashboard Queries

#### Circuit Breaker Health
\`\`\`promql
# Percentage of circuit breakers in healthy (CLOSED) state
sum(circuit_breaker_state{state="CLOSED"}) / sum(circuit_breaker_state) * 100

# Alert: Circuit breaker health below 90%
circuit_breaker_health < 0.90
\`\`\`

#### Blast Radius Containment
\`\`\`promql
# Percentage of failures that didn't cascade
sum(failures_contained) / sum(failures_total) * 100

# Alert: Containment rate below 95%
blast_radius_containment_rate < 0.95
\`\`\`

#### Mean Time to Detect (MTTD)
\`\`\`promql
# Average time to detect failures
avg(failure_detection_time_seconds)

# Alert: MTTD > 40 seconds
avg_over_time(failure_detection_time_seconds[5m]) > 40
\`\`\`

---

### Datadog Dashboard

\`\`\`yaml
# Failure Domain Overview Dashboard
widgets:
  - type: timeseries
    title: "Circuit Breaker Health"
    metrics:
      - "architecture.circuit_breaker_health{*}"
    
  - type: query_value
    title: "Blast Radius Containment"
    metrics:
      - "architecture.blast_radius_containment{*}"
    
  - type: topology_map
    title: "Service Dependencies with Failure States"
    metrics:
      - "trace.service.dependencies{*}"
\`\`\`

---

### New Relic Queries

\`\`\`sql
-- Circuit breaker failures by provider
SELECT count(*) 
FROM Metric 
WHERE metricName = 'circuit_breaker_failures' 
FACET provider 
SINCE 1 hour ago

-- Cascading failure detection
SELECT count(*) 
FROM Metric 
WHERE metricName = 'cascading_failure' 
AND blast_radius = 'multi_domain' 
SINCE 1 day ago

-- Service tier health
SELECT average(service_health) 
FROM Metric 
FACET service_tier 
TIMESERIES 
SINCE 24 hours ago
\`\`\`

---

## Vendor-Specific Setup

### Grafana Cloud + Tempo

\`\`\`bash
# Traces
OTLP_HTTP_TRACES_URL=https://tempo-prod-us-central1.grafana.net/tempo/api/push

# Metrics (includes failure domain metrics)
OTLP_HTTP_METRICS_URL=https://prometheus-prod-us-central1.grafana.net/api/prom/push

# Auth
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Bearer <YOUR_GRAFANA_TOKEN>
\`\`\`

**Grafana Dashboards**:
- Import \`grafana-failure-domains.json\` from our repo
- Includes circuit breaker, blast radius, and MTTD panels

---

### Datadog

\`\`\`bash
# Traces
OTLP_HTTP_TRACES_URL=https://trace.agent.datadoghq.com/v0.7/traces

# Metrics
OTLP_HTTP_METRICS_URL=https://api.datadoghq.com/v1/series

# Auth
OTEL_EXPORTER_OTLP_HEADERS=DD-API-KEY=<YOUR_DATADOG_API_KEY>
\`\`\`

**Datadog Dashboards**:
- Navigate to APM → Service Map
- Enable "Circuit Breaker States" overlay
- View failure domain containment in "Architecture Health" dashboard

---

### New Relic

\`\`\`bash
# Traces & Metrics
OTLP_HTTP_TRACES_URL=https://otlp.nr-data.net:4318/v1/traces
OTLP_HTTP_METRICS_URL=https://otlp.nr-data.net:4318/v1/metrics

# Auth
OTEL_EXPORTER_OTLP_HEADERS=api-key=<YOUR_NEW_RELIC_LICENSE_KEY>
\`\`\`

**New Relic Dashboards**:
- Use "Cost Katana - Architecture Health" template
- Includes failure domain maps, circuit breaker health, blast radius metrics

---

## Strategic Metrics

Track **architectural health**, not just operational metrics:

| Metric | Target | Alert Threshold |
|--------|--------|----------------|
| Circuit Breaker Health | 95%+ | < 90% |
| Blast Radius Containment | 95%+ | < 90% |
| Mean Time to Detect (MTTD) | < 30s | > 40s |
| Cascading Failures | < 5% | > 10% |
| SLA Compliance | 100% | < 95% |

---

## Next Steps

- **[Architecture Overview](/architecture)** - Understand failure domain design
- **[Failure Domains](/architecture/failure-domains)** - Deep dive into isolation strategy
- **[Strategic Metrics](/architecture/metrics)** - Track architectural health

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

## What is SAST?

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
  Agent: concept_1001 (person/I)
  Action: action_2001 (perceive/see)
  Object: concept_1001 (person/man)
  Location: concept_2001 (elevated_terrain/hill)
  Instrument: concept_3001 (optical_device/telescope)
\`\`\`

## Key Benefits

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

## Performance Metrics

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
  Traditional Cortex: 24 tokens, 15% ambiguity, 85% semantic clarity
  SAST Cortex: 18 tokens, 0% ambiguity, 95% semantic clarity
  Improvement: 25% token reduction, 100% ambiguity resolution
\`\`\`

## Usage Examples

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
\`\`\`smart:javascript:{"imports":["import { AICostTracker } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"SAST optimization with Node.js SDK including ambiguity resolution and cross-lingual support"}
const tracker = await AICostTracker.create({
  providers: [{
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY
  }],
  tracking: {
    enableAutoTracking: true
  }
});

const optimizer = tracker.getOptimizer();

// Basic optimization
const result = await optimizer.optimizePrompt(
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
\`\`\`smart:javascript:{"imports":["import { GatewayClient } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Gateway client with SAST optimization and comparison between traditional and SAST approaches"}
const client = new GatewayClient({
  baseUrl: 'https://api.costkatana.com',
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
\`\`\`smart:python:{"imports":["import cost_katana"],"dependencies":["cost-katana"],"description":"SAST optimization, semantic primitives, and universal semantics with the Python SDK"}
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

## Semantic Primitives System

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
}
\`\`\`

## Advanced Features

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
  Unification Score: 92.3%
  Universal Compatible: true
  Translations: 5 languages
  SAST Representations: Consistent across all languages
\`\`\`

## Use Cases

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

## Configuration

### Frontend (React/TypeScript)
Access SAST through the dashboard at \`/sast\` with components for:
- **Semantic Primitives Explorer**: Browse and search the vocabulary
- **Evolution Comparator**: Compare traditional vs SAST optimization
- **Telescope Demo**: Interactive ambiguity resolution
- **Universal Semantics Test**: Cross-lingual compatibility testing
- **Performance Analytics**: Real-time SAST statistics

### Backend Integration
SAST integrates seamlessly with existing Cortex infrastructure:
\`\`\`smart:javascript:{"imports":["import cortexGatewayMiddleware from 'cost-katana/middleware';"],"dependencies":["cost-katana"],"description":"Backend middleware integration with SAST headers for automatic processing"}
// Gateway middleware automatically detects SAST requests
app.use(cortexGatewayMiddleware);

// Headers trigger SAST processing
headers: {
  'CostKatana-Cortex-Operation': 'sast',
  'CostKatana-Cortex-Ambiguity-Resolution': 'true',
  'CostKatana-Cortex-Cross-Lingual-Mode': 'true'
}
\`\`\`

## Getting Started

### 1. **Enable SAST in Dashboard**
Navigate to \`/sast\` in your Cost Katana dashboard to explore SAST features interactively.

### 2. **CLI Quick Start**
\`\`\`bash
# Install CLI
npm install -g cost-katana-cli

# Run SAST optimization
cost-katana sast optimize "Your text here"

# Compare approaches
cost-katana sast compare "Ambiguous sentence"
\`\`\`

### 3. **SDK Integration**
Add SAST to existing applications with minimal code changes:
\`\`\`smart:javascript:{"imports":["import { AICostTracker } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Enable SAST mode in existing SDK integration with minimal code changes"}
const client = await AICostTracker.create({
  providers: [{
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY
  }]
});

// Enable SAST mode
const result = await client.optimize(prompt, { useSast: true });
\`\`\`

### 4. **API Integration**
Use SAST through REST API endpoints:
- \`POST /api/optimizations/sast/optimize\` - SAST optimization
- \`POST /api/optimizations/sast/compare\` - Compare approaches 
- \`GET /api/optimizations/sast/vocabulary\` - Explore primitives
- \`POST /api/optimizations/sast/universal-test\` - Cross-lingual testing

## When to Use SAST

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

## Learn More

- **[SAST Dashboard](/sast)** - Interactive SAST exploration
- **[CLI Documentation](/integrations/cli)** - Command-line usage
- **[Node.js SDK](/integrations/nodejs)** - JavaScript integration
- **[Python SDK](/integrations/python)** - Python integration
- **[API Reference](/api/optimization)** - REST API endpoints

---

*SAST represents the cutting edge of semantic optimization. Experience 30-40% token reductions while achieving unprecedented semantic clarity and cross-lingual compatibility.*`}
  />
);

// Telemetry Dashboard Feature Page
export const TelemetryDashboardPage = () => (<DocumentationPage title="Telemetry Dashboard" description="AI-powered telemetry dashboard with real-time insights and analytics" prevPage={{ path: '/observability/opentelemetry', label: 'Previous: OpenTelemetry & Vendors' }} nextPage={{ path: '/features/sessions', label: 'Next: Sessions & Session Replay' }} fallbackContent={`# Telemetry Dashboard

The Telemetry Dashboard provides comprehensive AI-powered insights into your application's performance, costs, and operations with real-time analytics and intelligent recommendations.

![Telemetry Dashboard](/assets/telemetry_1.png)

## Overview

The Telemetry Dashboard is a unified observability platform that combines traditional telemetry data with AI-powered analysis to provide actionable insights and optimization recommendations.

### Key Features

- **Real-time Performance Monitoring** - Track requests per minute, error rates, and latency metrics
- **AI-Powered Insights** - Get intelligent recommendations for cost optimization and performance improvements
- **Cost Analytics** - Monitor AI costs by model, operation, and time period
- **Error Monitoring** - Track and analyze errors with automatic categorization
- **Trace Viewer** - Visualize distributed traces and service dependencies
- **Telemetry Explorer** - Advanced querying and filtering of telemetry data
- **Service Dependency Graph** - Visualize service relationships and dependencies

## Dashboard Components

### Performance Overview

Monitor key performance indicators in real-time:

- **Requests Per Minute (RPM)** - Current request throughput
- **Error Rate** - Percentage of failed requests
- **Average Latency** - Mean response time across all operations
- **P95 Latency** - 95th percentile response time

\`\`\`smart:javascript:{\\"imports\\":[\\"const apiKey = process.env.COST_KATANA_API_KEY;\\"],\\"dependencies\\":[],\\"description\\":\\"Fetching performance metrics from the telemetry dashboard API\\"}
// Example: Fetching performance metrics
const response = await fetch('/api/telemetry/dashboard/enhanced', {
  headers: { 'Authorization': \`Bearer \${apiKey}\` }
});

const data = await response.json();
console.log('RPM:', data.enhanced_dashboard.current.requests_per_minute);
console.log('Error Rate:', data.enhanced_dashboard.current.error_rate);
\`\`\`

### Cost Analytics

Track AI costs with detailed breakdowns:

- **Cost by Model** - See which models are consuming the most budget
- **Cost Trends** - Historical cost analysis and forecasting
- **Cost by Operation** - Identify expensive operations
- **Cost Optimization Recommendations** - AI-suggested ways to reduce costs

### Error Monitor

Comprehensive error tracking and analysis:

- **Error Rate Trends** - Track error rates over time
- **Top Errors** - Most frequent error types
- **Error Details** - Full error context and stack traces
- **Error Correlation** - Link errors to specific operations or models

### Trace Viewer

Visualize distributed traces with interactive timeline:

- **Span Timeline** - See all operations in chronological order
- **Service Dependencies** - Understand service relationships
- **Performance Bottlenecks** - Identify slow operations
- **Cost Attribution** - See costs at each span level

### Telemetry Explorer

Advanced querying and filtering:

- **Custom Queries** - Filter by service, operation, model, or time range
- **Span Explorer** - Deep dive into individual spans
- **Export Data** - Download telemetry data for analysis
- **Real-time Updates** - Live streaming of telemetry events

## Getting Started

### 1. Enable Telemetry Collection

Configure your application to send telemetry data:

\`\`\`smart:javascript:{\\"imports\\":[\\"import { AICostTracker } from 'cost-katana';\\"],\\"dependencies\\":[\\"cost-katana\\"],\\"description\\":\\"Enable telemetry collection with automatic tracking\\"}
const tracker = await AICostTracker.create({
  providers: [
    {
      provider: 'openai',
      apiKey: process.env.OPENAI_API_KEY
    }
  ],
  tracking: {
    enableAutoTracking: true
  }
});
\`\`\`

### 2. Access the Dashboard

Navigate to the Telemetry Dashboard in the web app:

1. Go to **Telemetry** in the sidebar
2. View the **Overview** tab for real-time metrics
3. Explore **AI Insights** for recommendations
4. Use **Explorer** for advanced queries

### 3. Configure Telemetry

Customize telemetry collection settings:

\`\`\`smart:javascript:{\\"imports\\":[\\"import { AICostTracker } from 'cost-katana';\\",\\"const client = await AICostTracker.create({ providers: [] });\\"],\\"dependencies\\":[\\"cost-katana\\"],\\"description\\":\\"Configure telemetry collection settings for optimal data collection\\"}
// Configure telemetry settings
await client.telemetry.configure({
  sampleRate: 1.0, // 100% sampling
  batchSize: 100,
  flushInterval: 5000, // 5 seconds
  includeMetadata: true
});
\`\`\`

## AI-Powered Insights

The dashboard includes AI-powered analysis that provides:

### Cost Optimization Recommendations

- Model selection suggestions based on cost/performance trade-offs
- Token usage optimization opportunities
- Caching recommendations for repeated operations
- Batch processing suggestions

### Performance Recommendations

- Latency optimization opportunities
- Error rate reduction strategies
- Resource allocation suggestions
- Scaling recommendations

### Example AI Recommendation

\`\`\`smart:json:{\\"dependencies\\":[],\\"description\\":\\"Example AI recommendation response from the telemetry dashboard\\"}
{
  "trace_id": "trace_123",
  "operation": "text_generation",
  "insight": "Switching from GPT-4 to GPT-4o-mini would reduce costs by 75% with minimal quality impact",
  "cost_impact": -0.15,
  "routing_decision": "gpt-4o-mini",
  "priority": "high"
}
\`\`\`

## Advanced Features

### Service Dependency Graph

Visualize how services interact:

- **Service Relationships** - See which services call which
- **Call Patterns** - Understand request flows
- **Bottleneck Identification** - Find services causing delays
- **Cost Flow** - Track costs through service calls

### Top Operations

Identify your most important operations:

- **Request Volume** - Most frequently called operations
- **Cost Impact** - Operations with highest costs
- **Error Rate** - Operations with most errors
- **Performance** - Slowest operations

### Configuration

Customize dashboard settings:

- **Time Range** - Select time periods for analysis
- **Filters** - Filter by service, operation, or model
- **Refresh Rate** - Set auto-refresh interval
- **Alerts** - Configure threshold-based alerts

## API Integration

### Fetch Enhanced Dashboard Data

\`\`\`smart:bash:{\\"dependencies\\":[\\"curl\\"],\\"description\\":\\"Fetch enhanced dashboard data using the telemetry API\\"}
curl -X GET https://api.costkatana.com/api/telemetry/dashboard/enhanced \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

### Query Telemetry Data

\`\`\`smart:bash:{\\"dependencies\\":[\\"curl\\"],\\"description\\":\\"Query telemetry data with custom filters and time ranges\\"}
curl -X POST https://api.costkatana.com/api/telemetry/query \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "service:api AND operation:chat",
    "timeRange": "1h",
    "limit": 100
  }'
\`\`\`

## Best Practices

1. **Enable Full Sampling** - For accurate insights, enable 100% sampling in development
2. **Set Up Alerts** - Configure alerts for error rates and cost thresholds
3. **Regular Review** - Check AI insights weekly for optimization opportunities
4. **Export Data** - Regularly export data for long-term analysis
5. **Use Filters** - Leverage filters to focus on specific services or operations

## Related Documentation

- [OpenTelemetry & Vendors](/observability/opentelemetry) - Vendor integrations
- [Distributed Tracing](/features/tracing) - Trace collection and analysis
- [Telemetry API](/api/telemetry) - API reference
- [Cost Analytics](/features/analytics) - Cost analysis features`} />
);

// Sessions & Session Replay Feature Page
export const SessionsPage = () => (<DocumentationPage title="Sessions & Session Replay" description="Record and replay AI interactions with complete context for debugging and analysis" prevPage={{ path: '/features/telemetry', label: 'Previous: Telemetry Dashboard' }} nextPage={{ path: '/features/cache', label: 'Next: Cache Management' }} fallbackContent={`# Sessions & Session Replay

Record and replay AI interactions with complete context, including prompts, responses, costs, and user actions for comprehensive debugging and analysis.

![Sessions Overview](/assets/sessions_1.png)

## Overview

Sessions provide two powerful capabilities for monitoring and debugging your AI applications:

1. **Session Replay** - Record and replay in-app AI interactions with full context
2. **Debug Traces** - Distributed tracing for API-level debugging

## Session Replay

Session Replay captures complete AI interaction sessions with rich context for playback and analysis.

### Features

#### Automatic Recording

Sessions are automatically recorded for:

- **Chat Sessions** - Conversational AI interactions
- **Experimentation** - A/B tests and experiments
- **Workflows** - Multi-step AI pipelines
- **Agents** - Autonomous AI agent actions
- **Notebooks** - Jupyter/notebook interactions

#### Rich Context Capture

Each session includes:

- **AI Interactions** - Full prompts, responses, tokens, costs, and latency
- **User Actions** - Button clicks, form submissions, navigation
- **Code Context** - Active file, cursor position, code snippets
- **System Metrics** - CPU, memory, active requests
- **Workspace State** - Full environment snapshot

#### Advanced Filtering

Filter sessions by:

- **Feature Type** - Chat, experimentation, workflow, agent, notebook
- **Date Range** - Time-based filtering
- **Cost Range** - Filter by cost thresholds
- **Token Usage** - Filter by token consumption
- **AI Model** - Filter by specific models
- **Status** - Active, completed, error
- **Custom Metadata** - User-defined tags and properties

#### Export & Sharing

- **JSON Export** - Download session data for analysis
- **CSV Export** - Export for analysis in Excel
- **Shareable Links** - Generate temporary viewing links
- **API Access** - Programmatic access to replays

## Debug Traces

Distributed tracing for API-level debugging with hierarchical trace visualization.

### Features

#### Hierarchical Traces

- **Automatic Span Relationships** - Parent-child trace relationships
- **Trace Trees** - Visualize complex workflows
- **Session Grouping** - Group related operations
- **Depth Tracking** - Understand call stack depth

#### Zero-Code Instrumentation

- **Express Middleware** - One line to add tracing
- **Auto-instrumentation** - Automatic for all requests
- **Context Propagation** - Seamless trace context flow
- **Session Management** - Automatic session creation

#### Cost Attribution

- **Per-Span Costs** - Track cost at every level
- **Token Counting** - Input/output token metrics
- **Model Attribution** - Cost by model and provider
- **Budget Tracking** - Real-time budget monitoring

#### Visual Timeline

- **Interactive Visualization** - Drag, zoom, filter
- **Gantt Charts** - See parallel operations
- **Latency Analysis** - Identify bottlenecks
- **Critical Path** - Find optimization opportunities

## Getting Started

### 1. Enable Session Recording

\`\`\`smart:javascript:{\\"imports\\":[\\"import { AICostTracker } from 'cost-katana';\\"],\\"dependencies\\":[\\"cost-katana\\"],\\"description\\":\\"Enable automatic session recording for AI interactions\\"}
const tracker = await AICostTracker.create({
  providers: [
    { provider: 'openai', apiKey: process.env.OPENAI_API_KEY }
  ],
  tracking: {
    enableAutoTracking: true
  }
});
\`\`\`

### 2. View Sessions

Navigate to **Sessions** in the sidebar:

1. **Session Replays** tab - View recorded replays
2. **Debug Traces** tab - View distributed traces
3. Use filters to find specific sessions
4. Click on a session to view details

### 3. Replay a Session

\`\`\`smart:javascript:{\\"imports\\":[\\"import { AICostTracker } from 'cost-katana';\\",\\"const client = await AICostTracker.create({ providers: [] });\\",\\"const sessionId = 'your-session-id';\\"],\\"dependencies\\":[\\"cost-katana\\"],\\"description\\":\\"Replay a recorded session with custom playback options\\"}
// Get session replay data
const session = await client.sessions.getReplay(sessionId);

// Playback session
session.replay({
  speed: 1.0, // Playback speed
  onEvent: (event) => {
    console.log('Event:', event);
  }
});
\`\`\`

## Session Replay Player

The Session Replay Player provides:

### Timeline View

- **Chronological Events** - All events in order
- **Event Types** - AI calls, user actions, errors
- **Cost Indicators** - Visual cost markers
- **Performance Metrics** - Latency visualization

### Event Details

- **Full Context** - Complete event data
- **Request/Response** - Full API request and response
- **Cost Breakdown** - Detailed cost analysis
- **Performance Metrics** - Latency and timing

### Navigation

- **Play/Pause** - Control playback
- **Speed Control** - Adjust playback speed
- **Jump to Event** - Navigate to specific events
- **Search** - Find events by content

## Debug Traces

### View Trace Tree

\`\`\`smart:javascript:{\\"imports\\":[\\"import { AICostTracker } from 'cost-katana';\\",\\"const client = await AICostTracker.create({ providers: [] });\\",\\"const traceId = 'your-trace-id';\\"],\\"dependencies\\":[\\"cost-katana\\"],\\"description\\":\\"Get and visualize distributed trace tree with costs and latency\\"}
// Get trace details
const trace = await client.sessions.getTrace(traceId);

// Visualize trace tree
trace.visualize({
  showCosts: true,
  showLatency: true,
  groupByService: true
});
\`\`\`

### Trace Analysis

- **Span Details** - View individual span information
- **Cost Attribution** - See costs at each level
- **Performance Analysis** - Identify slow operations
- **Error Tracking** - Find and debug errors

## API Integration

### List Sessions

\`\`\`smart:bash:{\\"dependencies\\":[\\"curl\\"],\\"description\\":\\"List all sessions with optional filters for feature type, status, and limit\\"}
curl -X GET https://api.costkatana.com/api/session-replay/sessions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -G -d "feature=chat&status=completed&limit=50"
\`\`\`

### Get Session Replay

\`\`\`smart:bash:{\\"dependencies\\":[\\"curl\\"],\\"description\\":\\"Retrieve a specific session replay by session ID\\"}
curl -X GET https://api.costkatana.com/api/session-replay/sessions/SESSION_ID \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

### Get Trace Details

\`\`\`smart:bash:{\\"dependencies\\":[\\"curl\\"],\\"description\\":\\"Retrieve detailed trace information by trace ID\\"}
curl -X GET https://api.costkatana.com/api/v1/traces/TRACE_ID \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

## Best Practices

1. **Enable Recording** - Enable session recording for all production environments
2. **Filter Strategically** - Use filters to focus on relevant sessions
3. **Review Regularly** - Check sessions for errors and optimization opportunities
4. **Export Important Sessions** - Save critical sessions for analysis
5. **Use Traces for Debugging** - Leverage traces to debug complex workflows

## Related Documentation

- [Distributed Tracing](/features/tracing) - Trace collection and analysis
- [Telemetry Dashboard](/features/telemetry) - Telemetry insights
- [Cache Management](/features/cache) - Cache dashboard
- [Session Replay API](/api/session-replay) - API reference`} />
);

// Cache Management Feature Page
export const CachePage = () => (
  <DocumentationPage
    title="Cache Management"
    description="Redis cache dashboard and management for optimizing AI costs through intelligent caching"
    prevPage={{ path: '/features/sessions', label: 'Previous: Sessions & Session Replay' }}
    nextPage={{ path: '/features/advanced-monitoring', label: 'Next: Advanced Monitoring' }}
    fallbackContent={`# Cache Management

Redis cache dashboard and management system for optimizing AI costs through intelligent caching of prompts, responses, and intermediate results.

![Cache Dashboard](/assets/cache_1.png)

## Overview

The Cache Management system provides a comprehensive interface for managing Redis caches, monitoring cache performance, and optimizing AI costs through intelligent caching strategies.

### Key Features

- **Cache Dashboard** - Real-time cache statistics and metrics
- **Cache Keys Management** - View, search, and manage cache keys
- **Cache Analytics** - Hit rate, miss rate, and cost savings analysis
- **Cache Configuration** - Configure TTL, eviction policies, and more
- **Cache Warming** - Pre-populate cache with frequently used data
- **Cache Invalidation** - Manual and automatic cache invalidation
- **Multi-Cache Support** - Manage multiple cache instances
- **Cost Savings Tracking** - Track cost savings from caching

## Cache Dashboard

The dashboard provides an overview of your cache performance:

### Statistics

- **Total Keys** - Number of cached items
- **Cache Size** - Memory usage
- **Hit Rate** - Percentage of cache hits
- **Miss Rate** - Percentage of cache misses
- **Cost Savings** - Estimated cost savings from caching
- **Evictions** - Number of evicted keys

### Performance Metrics

- **Average Response Time** - Cache lookup latency
- **Throughput** - Requests per second
- **Memory Usage** - Current memory consumption
- **Memory Limit** - Configured memory limit

## Cache Keys

View and manage individual cache keys:

### Key Information

- **Key Name** - Cache key identifier
- **Value Preview** - Preview of cached value
- **TTL** - Time to live remaining
- **Size** - Memory size of cached item
- **Hit Count** - Number of times accessed
- **Last Accessed** - Last access timestamp
- **Created At** - Cache entry creation time

### Key Operations

- **View Full Value** - See complete cached data
- **Delete Key** - Remove specific cache entry
- **Refresh TTL** - Extend time to live
- **Copy Key** - Duplicate cache entry

## Cache Analytics

Analyze cache performance and cost savings:

### Hit Rate Analysis

- **Hit Rate Trends** - Historical hit rate over time
- **Hit Rate by Key Pattern** - Hit rates by key prefix
- **Hit Rate by Service** - Hit rates by service
- **Peak Hit Times** - Times with highest hit rates

### Cost Savings

- **Estimated Savings** - Total cost savings from caching
- **Savings by Service** - Savings breakdown by service
- **Savings Trends** - Historical savings over time
- **ROI Analysis** - Return on investment from caching

## Cache Configuration

Configure cache settings:

### TTL Configuration

\`\`\`smart:javascript:{\\"imports\\":[\\"import { AICostTracker } from 'cost-katana';\\",\\"const client = await AICostTracker.create({ providers: [] });\\"],\\"dependencies\\":[\\"cost-katana\\"],\\"description\\":\\"Configure cache TTL (Time To Live) settings for default, max, and min values\\"}
// Set default TTL
client.cache.configure({
  defaultTTL: 3600,  // 1 hour
  maxTTL: 86400,     // 24 hours
  minTTL: 60         // 1 minute
});
\`\`\`

### Eviction Policy

\`\`\`smart:javascript:{\\"imports\\":[\\"import { AICostTracker } from 'cost-katana';\\",\\"const client = await AICostTracker.create({ providers: [] });\\"],\\"dependencies\\":[\\"cost-katana\\"],\\"description\\":\\"Configure cache eviction policy, memory limits, and maximum keys\\"}
// Configure eviction policy
client.cache.configure({
  evictionPolicy: 'lru', // Least Recently Used
  maxMemory: '512mb',
  maxKeys: 100000
});
\`\`\`

### Cache Strategies

- **LRU (Least Recently Used)** - Evict least recently used items
- **LFU (Least Frequently Used)** - Evict least frequently used items
- **TTL-based** - Evict expired items
- **Size-based** - Evict largest items

## Cache Operations

### Get from Cache

\`\`\`smart:javascript:{\\"imports\\":[\\"import { AICostTracker, ai } from 'cost-katana';\\",\\"const client = await AICostTracker.create({ providers: [] });\\",\\"const prompt = 'your-prompt-here';\\"],\\"dependencies\\":[\\"cost-katana\\"],\\"description\\":\\"Get value from cache with fallback to fetch and cache on miss\\"}
// Get cached value
const cached = await client.cache.get('prompt:user:123');

if (cached) {
  return cached; // Cache hit
} else {
  // Cache miss - fetch and cache
  const result = await ai.generate(prompt);
  await client.cache.set('prompt:user:123', result, { ttl: 3600 });
  return result;
}
\`\`\`

### Set Cache

\`\`\`smart:javascript:{\\"imports\\":[\\"import { AICostTracker } from 'cost-katana';\\",\\"const client = await AICostTracker.create({ providers: [] });\\",\\"const value = 'your-value-here';\\"],\\"dependencies\\":[\\"cost-katana\\"],\\"description\\":\\"Set cache value with TTL and optional tags for organized invalidation\\"}
// Set cache with TTL
await client.cache.set('key', value, {
  ttl: 3600, // 1 hour
  tags: ['user', 'prompt']
});
\`\`\`

### Delete Cache

\`\`\`smart:javascript:{\\"imports\\":[\\"import { AICostTracker } from 'cost-katana';\\",\\"const client = await AICostTracker.create({ providers: [] });\\"],\\"dependencies\\":[\\"cost-katana\\"],\\"description\\":\\"Delete cache entries by key, pattern, or tags\\"}
// Delete specific key
await client.cache.delete('key');

// Delete by pattern
await client.cache.deletePattern('prompt:*');

// Delete by tags
await client.cache.deleteByTags(['user', 'prompt']);
\`\`\`

### Cache Warming

\`\`\`smart:javascript:{\\"imports\\":[\\"import { AICostTracker } from 'cost-katana';\\",\\"const client = await AICostTracker.create({ providers: [] });\\",\\"const commonPrompt1 = 'your-common-prompt-1';\\",\\"const commonPrompt2 = 'your-common-prompt-2';\\"],\\"dependencies\\":[\\"cost-katana\\"],\\"description\\":\\"Pre-populate cache with frequently used data to improve hit rates\\"}
// Pre-populate cache
await client.cache.warm({
  keys: [
    { key: 'prompt:common:1', value: commonPrompt1 },
    { key: 'prompt:common:2', value: commonPrompt2 }
  ],
  ttl: 86400 // 24 hours
});
\`\`\`

## Intelligent Caching

Cost Katana automatically caches:

- **Identical Prompts** - Same prompts return cached results
- **Similar Prompts** - Semantically similar prompts (with Cortex)
- **Intermediate Results** - Partial computation results
- **Model Responses** - AI model responses

### Semantic Caching

With Cortex enabled, semantically similar prompts share cache entries:

\`\`\`smart:javascript:{\\"imports\\":[],\\"dependencies\\":[\\"cost-katana\\"],\\"description\\":\\"Example of semantic caching where similar prompts share cache entries\\"}
// These prompts share the same cache entry
const prompt1 = "What is the weather today?";
const prompt2 = "Tell me today's weather";
const prompt3 = "How's the weather?";

// All three use the same cached response
\`\`\`

## API Integration

### Get Cache Statistics

\`\`\`smart:bash:{\\"dependencies\\":[\\"curl\\"],\\"description\\":\\"Retrieve cache statistics including hit rate, size, and performance metrics\\"}
curl -X GET https://api.costkatana.com/api/cache/stats \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

### List Cache Keys

\`\`\`smart:bash:{\\"dependencies\\":[\\"curl\\"],\\"description\\":\\"List cache keys with optional pattern matching and limit\\"}
curl -X GET https://api.costkatana.com/api/cache/keys \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -G -d "pattern=prompt:*&limit=100"
\`\`\`

### Get Cache Key

\`\`\`smart:bash:{\\"dependencies\\":[\\"curl\\"],\\"description\\":\\"Retrieve a specific cache key value by key name\\"}
curl -X GET https://api.costkatana.com/api/cache/keys/KEY_NAME \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

### Delete Cache Key

\`\`\`smart:bash:{\\"dependencies\\":[\\"curl\\"],\\"description\\":\\"Delete a specific cache key by key name\\"}
curl -X DELETE https://api.costkatana.com/api/cache/keys/KEY_NAME \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

### Clear Cache

\`\`\`smart:bash:{\\"dependencies\\":[\\"curl\\"],\\"description\\":\\"Clear cache entries by pattern or tags\\"}
curl -X POST https://api.costkatana.com/api/cache/clear \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "pattern": "prompt:*",
    "tags": ["user"]
  }'
\`\`\`

## Best Practices

1. **Set Appropriate TTLs** - Balance freshness with cache efficiency
2. **Monitor Hit Rates** - Aim for 70%+ hit rates
3. **Use Semantic Caching** - Enable Cortex for better cache utilization
4. **Tag Cache Keys** - Use tags for organized invalidation
5. **Warm Critical Caches** - Pre-populate frequently used data
6. **Monitor Memory Usage** - Prevent memory exhaustion
7. **Use Cache Patterns** - Consistent key naming for easier management

## Related Documentation

- [Gateway & Proxy](/features/gateway) - Gateway caching
- [Cortex Optimization](/features/sast) - Semantic caching
- [Cache API](/api/cache) - API reference`}
  />
);

// Advanced Monitoring Feature Page
export const AdvancedMonitoringPage = () => (<DocumentationPage title="Advanced Monitoring" description="Advanced monitoring tools for comprehensive AI operation tracking and analysis" prevPage={{ path: '/features/cache', label: 'Previous: Cache Management' }} nextPage={{ path: '/features/experimentation', label: 'Next: Experimentation' }} fallbackContent={`# Advanced Monitoring

Advanced monitoring tools for comprehensive tracking, analysis, and optimization of AI operations with real-time insights and intelligent alerts.

![Advanced Monitoring](/assets/monitoring_1.png)

## Overview

Advanced Monitoring provides enterprise-grade observability for AI operations with comprehensive metrics, custom dashboards, intelligent alerting, and deep analysis capabilities.

### Key Features

- **Custom Dashboards** - Build personalized monitoring dashboards
- **Real-time Metrics** - Live metrics and performance indicators
- **Intelligent Alerts** - AI-powered alerting with anomaly detection
- **Performance Analysis** - Deep dive into performance bottlenecks
- **Cost Monitoring** - Track costs with detailed breakdowns
- **Error Tracking** - Comprehensive error monitoring and analysis
- **Custom Metrics** - Define and track custom metrics
- **Export & Reporting** - Export data and generate reports

## Custom Dashboards

Create personalized dashboards with:

- **Widget Library** - Pre-built widgets for common metrics
- **Custom Widgets** - Build custom visualization widgets
- **Layout Management** - Drag-and-drop dashboard layout
- **Dashboard Sharing** - Share dashboards with team members
- **Dashboard Templates** - Start from pre-built templates

## Real-time Metrics

Monitor key metrics in real-time:

- **Request Rate** - Requests per second/minute
- **Error Rate** - Error percentage and trends
- **Latency** - P50, P95, P99 latency metrics
- **Cost Rate** - Cost per hour/day
- **Token Usage** - Input/output token rates
- **Model Performance** - Model-specific metrics

## Intelligent Alerts

AI-powered alerting system:

- **Anomaly Detection** - Automatic anomaly detection
- **Threshold Alerts** - Set custom thresholds
- **Trend Alerts** - Alert on trend changes
- **Cost Alerts** - Budget and cost threshold alerts
- **Performance Alerts** - Latency and error alerts
- **Smart Notifications** - Intelligent notification routing

## Performance Analysis

Deep performance analysis tools:

- **Bottleneck Identification** - Find performance bottlenecks
- **Slow Query Analysis** - Analyze slow operations
- **Resource Usage** - Monitor resource consumption
- **Scaling Recommendations** - AI-suggested scaling strategies

## API Integration

### Get Monitoring Metrics

\`\`\`smart:bash:{"description":"Get real-time monitoring metrics with time range and grouping options"}
curl -X GET https://api.costkatana.com/api/monitoring/metrics \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -G -d "timeRange=1h&groupBy=service"
\`\`\`

### Create Alert

\`\`\`smart:bash:{"description":"Create an intelligent alert with custom conditions and notification channels"}
curl -X POST https://api.costkatana.com/api/monitoring/alerts \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "High Error Rate",
    "condition": "error_rate > 0.05",
    "threshold": 0.05,
    "notificationChannels": ["email", "slack"]
  }'
\`\`\`

## Related Documentation

- [Telemetry Dashboard](/features/telemetry) - Telemetry insights
- [Cache Management](/features/cache) - Cache dashboard
- [Monitoring API](/api/monitoring) - API reference`} />
);

// Experimentation Feature Page
export const ExperimentationPage = () => (<DocumentationPage title="Experimentation" description="A/B testing and experimentation platform for optimizing AI model selection and costs" prevPage={{ path: '/features/advanced-monitoring', label: 'Previous: Advanced Monitoring' }} nextPage={{ path: '/features/moderation', label: 'Next: Moderation' }} fallbackContent={`# Experimentation

A/B testing and experimentation platform for optimizing AI model selection, prompt strategies, and costs through systematic testing and comparison.

![Experimentation](/assets/experimentation_1.png)

## Overview

Experimentation provides tools for running A/B tests, comparing models, simulating scenarios, and identifying optimal configurations for your AI operations.

### Key Features

- **Cost Simulator** - Real-time prompt optimization with instant cost savings
- **Model Comparison** - Compare different AI models based on actual usage
- **What-If Scenarios** - Analyze potential cost impacts of optimization strategies
- **Leaderboard** - Top optimization wins and cost savings champions
- **Real-time Testing** - Live model comparison and testing
- **Statistical Analysis** - Statistical significance testing
- **Recommendations** - AI-powered optimization recommendations

## Cost Simulator

Real-time prompt optimization:

- **Instant Optimization** - See cost savings up to 95%
- **Model Suggestions** - AI-suggested model alternatives
- **Token Reduction** - Optimize token usage
- **Quality Preservation** - Maintain quality while reducing costs

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Simulate cost optimization with real-time prompt analysis and model recommendations"}
// Simulate cost optimization
const client = new CostKatana({ apiKey: 'your-api-key' });
const simulation = await client.experimentation.simulate({
  prompt: "Your prompt here",
  currentModel: "gpt-4",
  targetModels: ["gpt-4o-mini", "gpt-3.5-turbo"]
});

console.log('Potential savings:', simulation.savings);
console.log('Recommended model:', simulation.recommendedModel);
\`\`\`

## Model Comparison

Compare different AI models:

- **Side-by-Side Comparison** - Compare multiple models
- **Performance Metrics** - Latency, quality, cost comparison
- **Cost Analysis** - Detailed cost breakdowns
- **Quality Metrics** - Quality scores and metrics
- **Recommendations** - Best model recommendations

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Compare multiple AI models side-by-side with cost, latency, and quality metrics"}
// Compare models
const client = new CostKatana({ apiKey: 'your-api-key' });
const comparison = await client.experimentation.compare({
  prompt: "Your prompt",
  models: ["gpt-4", "gpt-4o-mini", "claude-3-opus"],
  metrics: ["cost", "latency", "quality"]
});

console.log('Best model:', comparison.bestModel);
console.log('Savings:', comparison.savings);
\`\`\`

## What-If Scenarios

Analyze potential impacts:

- **Cost Projections** - Project future costs
- **Optimization Impact** - Impact of optimization strategies
- **Scaling Scenarios** - Cost impact of scaling
- **Model Migration** - Cost of migrating models

## Leaderboard

Track optimization wins:

- **Top Savings** - Highest cost savings
- **Best Optimizations** - Most effective optimizations
- **Champions** - Top performers
- **Trends** - Optimization trends over time

## API Integration

### Run Experiment

\`\`\`smart:bash:{"description":"Run A/B test experiment comparing multiple models with cost and quality metrics"}
curl -X POST https://api.costkatana.com/api/experimentation/model-comparison \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Your prompt",
    "models": ["gpt-4", "gpt-4o-mini"],
    "metrics": ["cost", "quality"]
  }'
\`\`\`

### Simulate Cost

\`\`\`smart:bash:{"description":"Simulate cost optimization scenarios with real-time analysis and savings projections"}
curl -X POST https://api.costkatana.com/api/experimentation/real-time-simulation \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Your prompt",
    "currentModel": "gpt-4",
    "targetModels": ["gpt-4o-mini"]
  }'
\`\`\`

## Related Documentation

- [AI Optimization](/features/optimization) - Optimization features
- [Cost Analytics](/features/analytics) - Cost analysis
- [Experimentation API](/api/experimentation) - API reference`} />
);

// Moderation Feature Page
export const ModerationPage = () => (<DocumentationPage title="Moderation" description="Content moderation and safety features for AI-generated content" prevPage={{ path: '/features/experimentation', label: 'Previous: Experimentation' }} nextPage={{ path: '/features/security', label: 'Next: Security' }} fallbackContent={`# Moderation

Content moderation and safety features for AI-generated content with automated filtering, policy enforcement, and compliance monitoring.

![Moderation](/assets/moderation_1.png)

## Overview

Moderation provides comprehensive content safety features including automated content filtering, policy enforcement, compliance monitoring, and safety reporting.

### Key Features

- **Content Filtering** - Automated content filtering
- **Policy Enforcement** - Custom policy enforcement
- **Compliance Monitoring** - Compliance tracking and reporting
- **Safety Scoring** - Content safety scoring
- **Blocklist Management** - Manage blocklists and allowlists
- **Audit Logs** - Complete audit trail
- **Real-time Moderation** - Real-time content moderation
- **Custom Rules** - Define custom moderation rules

## Content Filtering

Automated content filtering:

- **Toxicity Detection** - Detect toxic content
- **Profanity Filtering** - Filter profanity
- **PII Detection** - Detect personally identifiable information
- **Sensitive Content** - Identify sensitive content
- **Custom Filters** - Custom filtering rules

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Moderate content with automated filtering for toxicity, profanity, and PII detection"}
// Moderate content
const client = new CostKatana({ apiKey: 'your-api-key' });
const result = await client.moderation.moderate({
  content: "User content here",
  policies: ["toxicity", "profanity", "pii"]
});

if (result.isSafe) {
  // Content is safe
} else {
  // Handle unsafe content
  console.log('Violations:', result.violations);
}
\`\`\`

## Policy Enforcement

Enforce custom policies:

- **Policy Definition** - Define custom policies
- **Policy Application** - Apply policies to content
- **Policy Violations** - Track policy violations
- **Policy Reports** - Generate policy reports

## Compliance Monitoring

Track compliance:

- **Compliance Status** - Current compliance status
- **Compliance Reports** - Generate compliance reports
- **Audit Trail** - Complete audit trail
- **Compliance Alerts** - Alerts for compliance issues

## API Integration

### Moderate Content

\`\`\`smart:bash:{"description":"Moderate content with automated filtering and policy enforcement for safety compliance"}
curl -X POST https://api.costkatana.com/api/moderation/moderate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Content to moderate",
    "policies": ["toxicity", "profanity"]
  }'
\`\`\`

## Related Documentation

- [Security](/features/security) - Security features
- [Moderation API](/api/moderation) - API reference`} />
);

// Security Feature Page
export const SecurityPage = () => (<DocumentationPage title="Security" description="Security and compliance features for protecting AI operations and data" prevPage={{ path: '/features/moderation', label: 'Previous: Moderation' }} nextPage={{ path: '/features/memory', label: 'Next: Memory' }} fallbackContent={`# Security

Comprehensive security and compliance features for protecting AI operations, data, and ensuring regulatory compliance.

![Security](/assets/security_1.png)

## Overview

Security provides enterprise-grade security features including authentication, authorization, encryption, compliance monitoring, and security auditing.

### Key Features

- **Authentication** - Multi-factor authentication and SSO
- **Authorization** - Role-based access control
- **Encryption** - End-to-end encryption
- **Compliance** - GDPR, CCPA, SOC 2 compliance
- **Audit Logs** - Complete security audit trail
- **Threat Detection** - Automated threat detection
- **Security Policies** - Custom security policies
- **Vulnerability Scanning** - Automated vulnerability scanning

## Authentication

Secure authentication:

- **Multi-Factor Authentication** - MFA support
- **Single Sign-On** - SSO integration
- **API Key Management** - Secure API key management
- **Session Management** - Secure session handling

## Authorization

Role-based access control:

- **Roles & Permissions** - Define roles and permissions
- **Resource Access** - Control resource access
- **Team Management** - Team and user management
- **Access Logs** - Track access attempts

## Encryption

Data encryption:

- **Encryption at Rest** - Encrypt stored data
- **Encryption in Transit** - Encrypt data in transit
- **Key Management** - Secure key management
- **Compliance** - Encryption compliance

## Compliance

Regulatory compliance:

- **GDPR** - GDPR compliance
- **CCPA** - CCPA compliance
- **SOC 2** - SOC 2 compliance
- **HIPAA** - HIPAA compliance (if applicable)

## API Integration

### Get Security Status

\`\`\`smart:bash:{"description":"Get current security status including compliance, encryption, and threat detection status"}
curl -X GET https://api.costkatana.com/api/security/status \\
  -H "Authorization: Bearer YOUR_API_KEY"
\`\`\`

## Related Documentation

- [Key Vault](/features/key-vault) - Key management
- [Moderation](/features/moderation) - Content moderation
- [Security API](/api/security) - API reference`} />
);

// Memory Feature Page
export const MemoryPage = () => (<DocumentationPage title="Memory" description="Memory management and context preservation for AI conversations and operations" prevPage={{ path: '/features/security', label: 'Previous: Security' }} nextPage={{ path: '/features/cost-lake', label: 'Next: Cost Lake' }} fallbackContent={`# Memory

Memory management system for preserving context across AI conversations and operations with intelligent context retrieval and management.

![Memory](/assets/memory_1.png)

## Overview

Memory provides intelligent context management for AI operations, preserving conversation history, user preferences, and operational context across sessions.

### Key Features

- **Context Preservation** - Preserve context across sessions
- **Memory Storage** - Store and retrieve memories
- **Context Retrieval** - Intelligent context retrieval
- **Memory Search** - Search through memories
- **Memory Management** - Manage and organize memories
- **Context Injection** - Inject context into conversations
- **Memory Analytics** - Analyze memory usage

## Context Preservation

Preserve context across:

- **Conversations** - Maintain conversation context
- **Sessions** - Preserve session context
- **Operations** - Maintain operational context
- **Users** - Preserve user preferences

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Store and retrieve memories with context preservation for AI conversations"}
// Store memory
const client = new CostKatana({ apiKey: 'your-api-key' });
await client.memory.store({
  key: "user_preference",
  value: { theme: "dark", language: "en" },
  context: { userId: "user_123" }
});

// Retrieve memory
const memory = await client.memory.retrieve({
  key: "user_preference",
  context: { userId: "user_123" }
});
\`\`\`

## Memory Storage

Store different types of memories:

- **Conversation History** - Store conversation history
- **User Preferences** - Store user preferences
- **Operational Context** - Store operational context
- **Custom Memories** - Store custom memories

## Context Retrieval

Intelligent context retrieval:

- **Semantic Search** - Search memories semantically
- **Context Matching** - Match relevant context
- **Context Ranking** - Rank context by relevance
- **Context Injection** - Inject context into prompts

## API Integration

### Store Memory

\`\`\`smart:bash:{"description":"Store memory with context for preserving user preferences and conversation history"}
curl -X POST https://api.costkatana.com/api/memory/store \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "user_preference",
    "value": {"theme": "dark"},
    "context": {"userId": "user_123"}
  }'
\`\`\`

### Retrieve Memory

\`\`\`smart:bash:{"description":"Retrieve stored memory with intelligent context matching and semantic search"}
curl -X GET https://api.costkatana.com/api/memory/retrieve \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -G -d "key=user_preference&userId=user_123"
\`\`\`

## Related Documentation

- [Chat API](/api/chat) - Chat with memory
- [Memory API](/api/memory) - API reference`} />
);

// Cost Lake Feature Page
export const CostLakePage = () => (<DocumentationPage title="Cost Lake" description="Data warehouse for comprehensive cost data analysis and reporting" prevPage={{ path: '/features/memory', label: 'Previous: Memory' }} nextPage={{ path: '/features/github-integrations', label: 'Next: GitHub Integrations' }} fallbackContent={`# Cost Lake

Data warehouse for comprehensive cost data analysis, reporting, and business intelligence with historical data retention and advanced analytics.

![Cost Lake](/assets/cost-lake_1.png)

## Overview

Cost Lake is a comprehensive data warehouse that stores all cost-related data for long-term analysis, reporting, and business intelligence.

### Key Features

- **Data Warehouse** - Centralized cost data storage
- **Historical Data** - Long-term data retention
- **Data Analytics** - Advanced analytics capabilities
- **Data Export** - Export data for external analysis
- **Data Integration** - Integrate with BI tools
- **Custom Reports** - Generate custom reports
- **Data Visualization** - Visualize cost data
- **Data Querying** - Query cost data

## Data Warehouse

Centralized storage for:

- **Cost Data** - All cost-related data
- **Usage Data** - Usage metrics and statistics
- **Performance Data** - Performance metrics
- **Metadata** - Operational metadata

## Historical Data

Long-term data retention:

- **Data Retention** - Retain data for extended periods
- **Data Archival** - Archive old data
- **Data Retrieval** - Retrieve historical data
- **Data Analysis** - Analyze historical trends

## Data Analytics

Advanced analytics:

- **Trend Analysis** - Analyze cost trends
- **Forecasting** - Forecast future costs
- **Anomaly Detection** - Detect anomalies
- **Correlation Analysis** - Find correlations

## API Integration

### Query Cost Lake

\`\`\`smart:bash:{"description":"Query the Cost Lake data warehouse with SQL-like syntax for comprehensive cost data analysis"}
curl -X POST https://api.costkatana.com/api/cost-lake/query \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "SELECT * FROM costs WHERE date >= '2024-01-01'",
    "format": "json"
  }'
\`\`\`

## Related Documentation

- [Cost Analytics](/features/analytics) - Cost analysis
- [Cost Lake API](/api/cost-lake) - API reference`} />
);

// GitHub Integrations Feature Page
export const GitHubIntegrationsPage = () => (<DocumentationPage title="GitHub Integrations" description="Integrate Cost Katana with GitHub for code-aware AI operations and context" prevPage={{ path: '/features/cost-lake', label: 'Previous: Cost Lake' }} nextPage={{ path: '/api', label: 'Next: API Reference' }} fallbackContent={`# GitHub Integrations

Integrate Cost Katana with GitHub to enable code-aware AI operations, repository context, and intelligent code analysis.

![GitHub Integration](/assets/github_1.png)

## Overview

GitHub Integrations allow you to connect your GitHub repositories with Cost Katana, enabling AI operations with full code context and repository awareness.

### Key Features

- **Repository Connection** - Connect GitHub repositories
- **Code Context** - Use code as context in AI operations
- **PR Analysis** - Analyze pull requests with AI
- **Code Generation** - Generate code with repository context
- **Integration Management** - Manage GitHub integrations
- **Webhook Support** - GitHub webhook integration
- **Code Search** - Search code across repositories

## Repository Connection

Connect GitHub repositories:

1. Navigate to **Integrations** → **GitHub**
2. Click **Connect Repository**
3. Authorize Cost Katana access
4. Select repositories to connect
5. Configure integration settings

## Code Context

Use code as context:

\`\`\`smart:javascript:{"imports":["import { CostKatana } from 'cost-katana';"],"dependencies":["cost-katana"],"description":"Use GitHub repository context in AI chat operations for code-aware conversations"}
// Use repository context in chat
const client = new CostKatana({ apiKey: 'your-api-key' });
const response = await client.chat.send({
  message: "Explain this function",
  context: {
    repository: "my-repo",
    file: "src/utils.ts",
    function: "processData"
  }
});
\`\`\`

## PR Analysis

Analyze pull requests:

- **Code Review** - AI-powered code review
- **Cost Analysis** - Analyze cost impact of changes
- **Quality Assessment** - Assess code quality
- **Suggestions** - Provide improvement suggestions

## API Integration

### Connect Repository

\`\`\`smart:bash:{"description":"Connect a GitHub repository to enable code-aware AI operations and repository context"}
curl -X POST https://api.costkatana.com/api/github/connect \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "repository": "owner/repo",
    "accessToken": "github_token"
  }'
\`\`\`

### Get Repository Context

\`\`\`smart:bash:{"description":"Retrieve repository context including file and function information for AI operations"}
curl -X GET https://api.costkatana.com/api/github/repos/owner/repo/context \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -G -d "file=src/utils.ts&function=processData"
\`\`\`

## Related Documentation

- [Integrations](/features/integrations) - Other integrations
- [GitHub API](/api/github) - API reference`} />
);

// ============================================
// API REFERENCE PAGES
// ============================================

// Chat API Page
export const ChatAPIPage = () => (<DocumentationPage title="Chat API" description="Complete API reference for chat endpoints and message handling" prevPage={{ path: '/api/rate-limits', label: 'Previous: Rate Limits' }} nextPage={{ path: '/api/agent', label: 'Next: Agent API' }} fallbackContent={`# Chat API

Complete API reference for chat endpoints, message handling, conversation management, and integration commands.

## Base URL

\`https://api.costkatana.com/api/chat\`

## Authentication

All endpoints except \`GET /models\` require authentication via Bearer token:

\`\`\`http
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### Get Available Models

Get list of available AI models for chat.

\`\`\`http
GET /api/chat/models
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "models": [
    {
      "id": "gpt-4",
      "name": "GPT-4",
      "provider": "openai",
      "maxTokens": 8192,
      "supportsStreaming": true
    }
  ]
}
\`\`\`

### Send Message

Send a message to an AI model.

\`\`\`http
POST /api/chat/message
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "message": "Hello, how are you?",
  "modelId": "gpt-4",
  "conversationId": "optional_conversation_id",
  "temperature": 0.7,
  "maxTokens": 1000,
  "documentIds": ["doc1", "doc2"],
  "templateId": "optional_template_id",
  "templateVariables": {
    "variable1": "value1"
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "message": {
    "id": "msg_123",
    "content": "I'm doing well, thank you!",
    "model": "gpt-4",
    "cost": 0.002,
    "tokens": {
      "input": 10,
      "output": 15
    },
    "timestamp": "2024-01-01T00:00:00Z"
  },
  "conversationId": "conv_123"
}
\`\`\`

### Create Conversation

Create a new conversation.

\`\`\`http
POST /api/chat/conversations
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "title": "My Conversation",
  "metadata": {
    "projectId": "project_123"
  }
}
\`\`\`

### Get Conversations

Get all conversations for the authenticated user.

\`\`\`http
GET /api/chat/conversations
\`\`\`

**Query Parameters:**
- \`limit\` (optional): Number of conversations to return (default: 50)
- \`page\` (optional): Page number (default: 1)
- \`includeArchived\` (optional): Include archived conversations (default: false)

### Get Conversation History

Get message history for a conversation.

\`\`\`http
GET /api/chat/conversations/:conversationId/history
\`\`\`

**Path Parameters:**
- \`conversationId\`: The conversation ID

**Query Parameters:**
- \`limit\` (optional): Number of messages to return (default: 50)
- \`before\` (optional): Get messages before this timestamp

### Update Conversation GitHub Context

Update GitHub context for a conversation.

\`\`\`http
PATCH /api/chat/conversations/:conversationId/github-context
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "repository": "owner/repo",
  "file": "src/utils.ts",
  "function": "processData"
}
\`\`\`

### Delete Conversation

Delete a conversation.

\`\`\`http
DELETE /api/chat/conversations/:conversationId
\`\`\`

### Integration Commands

Execute integration commands via @ mentions.

\`\`\`http
POST /api/chat/integrations/execute
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "command": "@slack list channels",
  "integrationType": "slack"
}
\`\`\`

### Get Autocomplete Suggestions

Get autocomplete suggestions for integration commands.

\`\`\`http
GET /api/chat/integrations/autocomplete
\`\`\`

**Query Parameters:**
- \`query\`: Partial command query
- \`integrationType\`: Type of integration

## Error Responses

All endpoints may return the following error responses:

\`\`\`json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {}
  }
}
\`\`\`

## Rate Limits

- **Message Endpoint**: 60 requests per minute
- **Other Endpoints**: 120 requests per minute

## Related Documentation

- [Agent API](/api/agent) - AI agent endpoints
- [Memory API](/api/memory) - Memory management
- [Chat Feature](/features/dashboard) - Chat features`} />
);

// Agent API Page
export const AgentAPIPage = () => (<DocumentationPage title="Agent API" description="Complete API reference for AI agent query and analysis endpoints" prevPage={{ path: '/api/chat', label: 'Previous: Chat API' }} nextPage={{ path: '/api/gateway', label: 'Next: Gateway API' }} fallbackContent={`# Agent API

Complete API reference for AI agent endpoints including query processing, streaming, feedback, and project wizard functionality.

## Base URL

\`https://api.costkatana.com/api/agent\`

## Authentication

All endpoints require authentication:

\`\`\`http
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### Query Agent

Send a query to the AI agent.

\`\`\`http
POST /api/agent/query
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "query": "Analyze my cost trends",
  "context": {
    "projectId": "project_123",
    "conversationId": "conv_123",
    "previousMessages": []
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "response": "Based on your usage data...",
  "insights": [],
  "recommendations": []
}
\`\`\`

### Stream Agent Response

Stream agent response for real-time interaction.

\`\`\`http
POST /api/agent/stream
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "query": "Your query here",
  "context": {}
}
\`\`\`

**Response:** Server-Sent Events (SSE) stream

### Get Agent Status

Get agent status and statistics.

\`\`\`http
GET /api/agent/status
\`\`\`

### Add Feedback

Add feedback/learning to the agent.

\`\`\`http
POST /api/agent/feedback
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "insight": "This response was helpful",
  "rating": 5,
  "metadata": {
    "conversationId": "conv_123"
  }
}
\`\`\`

### Get Conversation History

Get conversation history with the agent.

\`\`\`http
GET /api/agent/conversations
\`\`\`

**Query Parameters:**
- \`conversationId\` (optional): Specific conversation ID
- \`limit\` (optional): Number of conversations (1-100, default: 50)

### Get Suggested Queries

Get suggested queries for the user.

\`\`\`http
GET /api/agent/suggestions
\`\`\`

### Start Project Wizard

Start conversational project creation wizard.

\`\`\`http
POST /api/agent/wizard/start
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "projectType": "web-app",
  "quickStart": true
}
\`\`\`

### Continue Project Wizard

Continue project creation wizard conversation.

\`\`\`http
POST /api/agent/wizard/continue
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "response": "I want to build a chat app",
  "wizardState": {
    "step": 1,
    "data": {}
  }
}
\`\`\`

## Related Documentation

- [Chat API](/api/chat) - Chat endpoints
- [Gateway API](/api/gateway) - Gateway endpoints`} />
);

// Memory API Page
export const MemoryAPIPage = () => (<DocumentationPage title="Memory API" description="Complete API reference for memory management endpoints" prevPage={{ path: '/api/gateway', label: 'Previous: Gateway API' }} nextPage={{ path: '/api/cache', label: 'Next: Cache API' }} fallbackContent={`# Memory API

Complete API reference for memory management endpoints including user preferences, conversation history, and memory insights.

## Base URL

\`https://api.costkatana.com/api/memory\`

## Authentication

All endpoints require authentication:

\`\`\`http
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### Get Memory Insights

Get user memory insights.

\`\`\`http
GET /api/memory/:userId/insights
\`\`\`

**Path Parameters:**
- \`userId\`: User ID

### Get User Preferences

Get user preferences.

\`\`\`http
GET /api/memory/:userId/preferences
\`\`\`

### Update User Preferences

Update user preferences.

\`\`\`http
PUT /api/memory/:userId/preferences
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "preferredModel": "gpt-4",
  "preferredChatMode": "balanced",
  "preferredStyle": "professional",
  "responseLength": "detailed",
  "technicalLevel": "intermediate",
  "commonTopics": ["coding", "ai"],
  "costPreference": "balanced"
}
\`\`\`

### Get Conversation History

Get conversation history with memory context.

\`\`\`http
GET /api/memory/:userId/conversations
\`\`\`

**Query Parameters:**
- \`limit\` (optional): Number of conversations (1-100, default: 50)
- \`page\` (optional): Page number (default: 1)
- \`includeArchived\` (optional): Include archived conversations (default: false)

### Get Similar Conversations

Get similar conversations.

\`\`\`http
GET /api/memory/:userId/similar
\`\`\`

**Query Parameters:**
- \`query\`: Search query (required)
- \`limit\` (optional): Number of results (1-20, default: 10)

### Get Personalized Recommendations

Get personalized recommendations.

\`\`\`http
GET /api/memory/:userId/recommendations
\`\`\`

**Query Parameters:**
- \`query\`: Query for recommendations (required)

### Archive Conversation

Archive a conversation.

\`\`\`http
PUT /api/memory/conversations/:conversationId/archive
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "userId": "user_123"
}
\`\`\`

### Delete Conversation

Delete a conversation.

\`\`\`http
DELETE /api/memory/conversations/:conversationId
Content-Type: application/json
\`\`\`

### Reset Preferences

Reset user preferences.

\`\`\`http
DELETE /api/memory/:userId/preferences
\`\`\`

### Clear User Memory

Clear all user memory (GDPR compliance).

\`\`\`http
DELETE /api/memory/:userId/clear
\`\`\`

### Export User Data

Export user memory data (GDPR compliance).

\`\`\`http
GET /api/memory/:userId/export
\`\`\`

### Get Storage Stats

Get memory storage statistics.

\`\`\`http
GET /api/memory/:userId/stats
\`\`\`

## Related Documentation

- [Memory Feature](/features/memory) - Memory features
- [Chat API](/api/chat) - Chat endpoints`} />
);

// Cache API Page
export const CacheAPIPage = () => (<DocumentationPage title="Cache API" description="Complete API reference for cache management endpoints" prevPage={{ path: '/api/memory', label: 'Previous: Memory API' }} nextPage={{ path: '/api/telemetry', label: 'Next: Telemetry API' }} fallbackContent={`# Cache API

Complete API reference for cache management endpoints including statistics, clearing, export, import, and warmup operations.

## Base URL

\`https://api.costkatana.com/api/cache\`

## Authentication

All endpoints require authentication:

\`\`\`http
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### Get Cache Statistics

Get cache statistics and metrics.

\`\`\`http
GET /api/cache/stats
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "stats": {
    "totalKeys": 1000,
    "cacheSize": "50MB",
    "hitRate": 0.85,
    "missRate": 0.15,
    "costSavings": 150.50,
    "evictions": 10
  }
}
\`\`\`

### Clear Cache

Clear cache entries.

\`\`\`http
DELETE /api/cache/clear
Content-Type: application/json
\`\`\`

**Request Body (optional):**
\`\`\`json
{
  "pattern": "prompt:*",
  "tags": ["user"]
}
\`\`\`

### Export Cache Data

Export cache data.

\`\`\`http
GET /api/cache/export
\`\`\`

**Query Parameters:**
- \`format\` (optional): Export format (json, csv, default: json)
- \`pattern\` (optional): Key pattern filter

### Import Cache Data

Import cache data.

\`\`\`http
POST /api/cache/import
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "data": [
    {
      "key": "prompt:1",
      "value": "cached_response",
      "ttl": 3600
    }
  ]
}
\`\`\`

### Warmup Cache

Pre-populate cache with frequently used data.

\`\`\`http
POST /api/cache/warmup
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "keys": [
    {
      "key": "prompt:common:1",
      "value": "common_response",
      "ttl": 86400
    }
  ]
}
\`\`\`

## Related Documentation

- [Cache Feature](/features/cache) - Cache features
- [Gateway API](/api/gateway) - Gateway caching`} />
);

// Telemetry API Page
export const TelemetryAPIPage = () => (<DocumentationPage title="Telemetry API" description="Complete API reference for telemetry data endpoints" prevPage={{ path: '/api/cache', label: 'Previous: Cache API' }} nextPage={{ path: '/api/budget', label: 'Next: Budget API' }} fallbackContent={`# Telemetry API

Complete API reference for telemetry data endpoints including dashboard data, querying, and analytics.

## Base URL

\`https://api.costkatana.com/api/telemetry\`

## Authentication

All endpoints require authentication:

\`\`\`http
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### Get Enhanced Dashboard

Get enhanced dashboard data with AI insights.

\`\`\`http
GET /api/telemetry/dashboard/enhanced
\`\`\`

**Query Parameters:**
- \`timeRange\` (optional): Time range (1h, 24h, 7d, 30d, default: 24h)

**Response:**
\`\`\`json
{
  "success": true,
  "enhanced_dashboard": {
    "current": {
      "requests_per_minute": 100,
      "error_rate": 0.02,
      "avg_latency_ms": 250,
      "p95_latency_ms": 500
    },
    "enrichment": {
      "stats": {
        "total_spans": 10000,
        "enriched_spans": 9500,
        "enrichment_rate": 0.95
      },
      "ai_recommendations": []
    }
  }
}
\`\`\`

### Query Telemetry Data

Query telemetry data.

\`\`\`http
POST /api/telemetry/query
Content-Type: application/json
\`\`\`

**Request Body:**
\`\`\`json
{
  "query": "service:api AND operation:chat",
  "timeRange": "1h",
  "limit": 100
}
\`\`\`

## Related Documentation

- [Telemetry Dashboard](/features/telemetry) - Telemetry features
- [Distributed Tracing](/features/tracing) - Trace collection`} />
);

// Budget API Page
export const BudgetAPIPage = () => (<DocumentationPage title="Budget API" description="Complete API reference for budget management endpoints" prevPage={{ path: '/api/telemetry', label: 'Previous: Telemetry API' }} nextPage={{ path: '/api/session-replay', label: 'Next: Session Replay API' }} fallbackContent={`# Budget API

Complete API reference for budget management endpoints.

## Base URL

\`https://api.costkatana.com/api/budget\`

## Authentication

All endpoints require authentication:

\`\`\`http
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### Get Budget Status

Get current budget status and usage.

\`\`\`http
GET /api/budget/status
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "budget": {
    "total": 1000.00,
    "used": 750.50,
    "remaining": 249.50,
    "percentage": 75.05,
    "period": "monthly"
  }
}
\`\`\`

## Related Documentation

- [Alerts](/features/alerts) - Budget alerts
- [Cost Analytics](/features/analytics) - Cost analysis`} />
);

// Session Replay API Page
export const SessionReplayAPIPage = () => (<DocumentationPage title="Session Replay API" description="Complete API reference for session replay endpoints" prevPage={{ path: '/api/budget', label: 'Previous: Budget API' }} nextPage={{ path: '/api/trace', label: 'Next: Trace API' }} fallbackContent={`# Session Replay API

Complete API reference for session replay endpoints.

## Base URL

\`https://api.costkatana.com/api/session-replay\`

## Authentication

All endpoints require authentication:

\`\`\`http
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### List Sessions

Get list of sessions with filtering.

\`\`\`http
GET /api/session-replay/sessions
\`\`\`

**Query Parameters:**
- \`feature\` (optional): Filter by feature type
- \`status\` (optional): Filter by status
- \`from\` (optional): Start date
- \`to\` (optional): End date
- \`limit\` (optional): Number of sessions (default: 50)

### Get Session Replay

Get session replay data.

\`\`\`http
GET /api/session-replay/sessions/:sessionId
\`\`\`

## Related Documentation

- [Sessions Feature](/features/sessions) - Session features
- [Distributed Tracing](/features/tracing) - Trace collection`} />
);

// Trace API Page
export const TraceAPIPage = () => (<DocumentationPage title="Trace API" description="Complete API reference for distributed tracing endpoints" prevPage={{ path: '/api/session-replay', label: 'Previous: Session Replay API' }} nextPage={{ path: '/api', label: 'Next: API Overview' }} fallbackContent={`# Trace API

Complete API reference for distributed tracing endpoints.

## Base URL

\`https://api.costkatana.com/api/v1\`

## Authentication

All endpoints require authentication:

\`\`\`http
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### Get Trace

Get trace details by trace ID.

\`\`\`http
GET /api/v1/traces/:traceId
\`\`\`

**Path Parameters:**
- \`traceId\`: Trace ID

### List Traces

Get list of traces with filtering.

\`\`\`http
GET /api/v1/traces
\`\`\`

**Query Parameters:**
- \`service\` (optional): Filter by service
- \`operation\` (optional): Filter by operation
- \`from\` (optional): Start timestamp
- \`to\` (optional): End timestamp
- \`limit\` (optional): Number of traces (default: 100)

## Related Documentation

- [Distributed Tracing](/features/tracing) - Trace features
- [Sessions](/features/sessions) - Session replay`} />
);

// SDK Generator Page
export const SDKGeneratorPage = () => (<DocumentationPage title="SDK Code Generator" description="Generate SDK code snippets in multiple languages" fallbackContent={`# SDK Code Generator

Generate ready-to-use SDK code snippets for Cost Katana in multiple programming languages.

\`\`\`sdk-generator
\`\`\`

## Features

- **Multi-language Support**: Generate code for JavaScript, TypeScript, Python, and Node.js
- **Feature-based Generation**: Select specific features to include in your code
- **Copy & Download**: Easily copy or download generated code snippets
- **Syntax Highlighting**: Beautiful code preview with syntax highlighting

## Usage

Use the SDK Generator above to:
1. Select your preferred programming language
2. Choose the features you want to include
3. Copy or download the generated code
4. Integrate into your project

## Supported Languages

- **JavaScript** - Browser and Node.js compatible
- **TypeScript** - Full type safety with TypeScript
- **Python** - Python SDK integration
- **Node.js** - Node.js specific implementations

## Available Features

- Core tracking and analytics
- Cost optimization
- Advanced analytics
- Workflow management
- And more...

Start generating your SDK code now using the generator above!`} />);

// Integration Wizard Page
export const IntegrationWizardPage = () => (<DocumentationPage title="Integration Wizard" description="Step-by-step integration guide for Cost Katana" fallbackContent={`# Integration Wizard

Get started with Cost Katana in minutes using our interactive integration wizard.

\`\`\`integration-wizard
\`\`\`

## What is the Integration Wizard?

The Integration Wizard guides you through setting up Cost Katana in your project with:
- Platform detection and selection
- Package manager configuration
- API key setup
- Feature selection
- Verification and testing

## Step-by-Step Process

1. **Platform Selection**: Choose your development platform
2. **Package Manager**: Select npm, yarn, or pip
3. **API Key**: Configure your Cost Katana API key
4. **Features**: Select the features you want to use
5. **Verification**: Test your integration

## Benefits

- **Zero Configuration**: Automated setup process
- **Best Practices**: Follows recommended patterns
- **Error Prevention**: Validates each step
- **Quick Start**: Get up and running in minutes

Start the wizard above to begin your integration!`} />);

// API Explorer Page
export const APIExplorerPage = () => (<DocumentationPage title="API Explorer" description="Interactive API explorer for Cost Katana endpoints" fallbackContent={`# API Explorer

Explore and test all Cost Katana API endpoints interactively.

\`\`\`api-explorer
\`\`\`

## Features

- **Browse All Endpoints**: Explore all available API endpoints
- **Category Filtering**: Filter by endpoint category
- **Search & Filter**: Quickly find specific endpoints
- **Try It Out**: Test endpoints directly from the explorer
- **Schema Viewer**: View request/response schemas

## How to Use

1. Browse endpoints by category
2. Use search to find specific endpoints
3. Click on an endpoint to view details
4. Use the integrated API tester to try endpoints
5. View request/response schemas

## Endpoint Categories

- Authentication
- Usage Tracking
- Analytics
- Optimization
- Projects
- Webhooks
- And more...

Start exploring the API using the explorer above!`} />);

// Version Comparison Page
export const VersionComparisonPage = () => (<DocumentationPage title="Version Comparison" description="Compare different versions of documentation content" fallbackContent={`# Version Comparison

Compare different versions of documentation to see what has changed.

\`\`\`version-comparison
\`\`\`

## Features

- **Side-by-Side View**: Compare versions side by side
- **Unified Diff View**: See changes in a unified format
- **Version Selector**: Choose which versions to compare
- **Change Highlighting**: Visual indicators for additions, deletions, and modifications

## How to Use

1. Select the versions you want to compare
2. Choose your preferred view (side-by-side or unified)
3. Review highlighted changes
4. Navigate through different sections

## Use Cases

- Track documentation updates
- Review content changes
- Understand feature evolution
- Compare API changes

Use the version comparison tool above to compare documentation versions!`} />);

// Architecture Pages
export const ArchitectureOverviewPage = () => (<DocumentationPage title="Architecture Overview" description="Strategic architecture and system design principles" nextPage={{ path: '/architecture/decisions', label: 'Next: Architectural Decisions' }} fallbackContent={`# Architecture Overview

## Strategy > Syntax

Cost Katana's architecture is built on strategic thinking principles that prioritize **system behavior over implementation details**, **abstractions over code**, and **explicit tradeoffs over implicit assumptions**.

## AI-Native Architecture

Cost Katana is built on **AI-native architecture** principles, meaning the platform is designed from the ground up with AI models as first-class infrastructure components. Unlike traditional monitoring tools that track AI usage, Cost Katana embeds AI throughout its entire stack - from the Cortex meta-language optimization engine and multi-agent workflows to predictive analytics and intelligent routing. This AI-native foundation enables the platform to actively optimize costs using AI, rather than simply measuring them.

## Architectural Pillars

### 1. **Systems Thinking**
- **Layered Architecture**: Clear separation between controllers → services → models
- **Domain Boundaries**: Isolated failure domains with explicit interfaces
- **Orchestration First**: Complex flows managed by dedicated orchestrators, not scattered logic

### 2. **Abstractions Over Implementations**
- **Provider Abstraction**: \`BaseProvider\` enables 300+ models across 12+ providers
- **Service Abstraction**: \`BaseService\` provides circuit breakers, caching, and monitoring
- **RAG Abstraction**: \`BaseRAGModule\` and \`BaseRAGPattern\` for extensible AI pipelines

### 3. **Orchestration Mindset**
- **Multi-Agent Workflows**: LangGraph-based orchestration for complex AI tasks
- **Workflow Engine**: DAG-based execution with dependencies and parallelism
- **Cortex Streaming**: Real-time orchestration with 40-75% token reduction

### 4. **Failure Domain Isolation**
- **Circuit Breakers**: Per-service and per-provider failure protection
- **Graceful Degradation**: 5-tier degradation strategy (normal → light → moderate → heavy → severe)
- **Explicit Failover**: Documented fallback paths and blast radius containment

### 5. **Cost-Performance Curves**
- **Explicit Tradeoffs**: Cost vs latency vs quality decision points
- **SLA-Driven Routing**: Plan-tier mapping (free → fast, pro → premium, enterprise → expert)
- **Configurable Policies**: Strategic decisions exposed as configuration, not hardcoded logic

### 6. **Closed-Loop Optimization**
- **Real-Time Interventions**: Automatic request optimization before reaching AI providers
- **Active Flow Management**: Resource reservation and conflict detection across concurrent operations
- **Budget-Aware Routing**: Autonomous decisions based on remaining budget and cost projections
- **Learning Feedback Loop**: Continuous improvement from intervention outcomes and user patterns

## System Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                     Cost Katana Platform                         │
├─────────────┬─────────────┬─────────────┬───────────────────────┤
│  Gateway    │  Core       │  Intelligence│  Observability       │
│  Layer      │  Services   │  Layer       │  Layer               │
├─────────────┼─────────────┼─────────────┼───────────────────────┤
│ • Routing   │ • AI Invoke │ • Cortex     │ • OpenTelemetry     │
│ • Caching   │ • Tracking  │ • Multi-Agent│ • Tracing           │
│ • Failover  │ • Analytics │ • RAG        │ • Metrics           │
│ • Circuit   │ • Budget    │ • Predictive │ • Decision Audit    │
│   Breakers  │ • Alerts    │   Analytics  │ • Cost Attribution  │
└─────────────┴─────────────┴─────────────┴───────────────────────┘
\`\`\`

The Intelligence Layer represents the core of our AI-native architecture, where Cortex, Multi-Agent orchestration, and Predictive Analytics are powered by AI models, not rule-based systems.This enables dynamic optimization and intelligent decision-making across the entire platform.

## Strategic Layers

### Layer 1: Telemetry & Observability
  - ** Purpose **: Capture comprehensive system behavior
    - ** Strategy **: Sample 10 % for cost efficiency, 100 % for critical paths
      - ** Tradeoff **: Cost vs visibility(configurable sample rate)

### Layer 2: Intelligence & Analysis
  - ** Purpose **: Extract actionable insights from telemetry
    - ** Strategy **: Continuous analysis with 3 - tier intervals(fast / medium / slow)
      - ** Tradeoff **: Real - time accuracy vs compute cost

### Layer 3: Routing & Optimization
  - ** Purpose **: Route requests to optimal providers / models
    - ** Strategy **: Telemetry - driven routing with fallback strategies
      - ** Tradeoff **: Cost vs speed vs quality(plan - specific)

### Layer 4: Enforcement & Governance
  - ** Purpose **: Enforce budgets, limits, and policies
    - ** Strategy **: Pre - flight checks with soft / hard limits
      - ** Tradeoff **: Strictness vs user experience

### Layer 5: Caching & Deduplication
  - ** Purpose **: Eliminate redundant AI calls
    - ** Strategy **: Exact + semantic caching(85 % similarity threshold)
      - ** Tradeoff **: Cache freshness vs cost savings

### Layer 6: Simulation & Prediction
  - ** Purpose **: Forecast costs and recommend alternatives
    - ** Strategy **: Track accuracy with 70 % confidence threshold
      - ** Tradeoff **: Simulation overhead vs decision quality

## Key Design Patterns

### Circuit Breaker Pattern
\`\`\`typescript
// Threshold-based with exponential backoff
OPEN → (timeout) → HALF_OPEN → (success) → CLOSED
      ↑                           ↓
      └─────── (failure) ─────────┘
\`\`\`

### Orchestration Pattern
\`\`\`typescript
// DAG-based workflow execution
[Start] → [Parallel Steps] → [Aggregation] → [Decision] → [End]
           ↓                    ↓              ↓
          [Failure Recovery] ← [Retry Logic] ← [Circuit Breaker]
\`\`\`

### Cost-Performance Policy Pattern
\`\`\`typescript
// Explicit tradeoff configuration
interface PolicyConfig {
  costWeight: number;      // 0-1
  latencyWeight: number;   // 0-1
  qualityWeight: number;   // 0-1
  sla: SLARequirements;    // explicit guarantees
}
\`\`\`

## Strategic Metrics

### System Health
- Circuit breaker state (% open/closed/half-open)
- Failure rate by domain
- Average latency by service tier

### Cost Efficiency
- Token reduction rate (target: 40-75% with Cortex)
- Cache hit rate (target: 70-80%)
- Provider cost distribution

### Decision Quality
- ADR coverage (% decisions documented)
- Policy compliance rate
- Tradeoff explicitness score

## Next Steps

- **[Architectural Decisions](/architecture/decisions)** - Browse ADRs
- **[Cost-Performance Tradeoffs](/architecture/cost-performance)** - Understand policy configurations
- **[Failure Domains](/architecture/failure-domains)** - Explore blast radius maps
- **[Strategic Metrics](/architecture/metrics)** - Monitor architectural health

---

*Architecture is not about code—it's about strategy. Make decisions explicit, tradeoffs clear, and failures isolated.*`} />);

export const ArchitectureDecisionsPage = () => (<DocumentationPage title="Architectural Decisions (ADRs)" description="Documented architectural decisions and their rationale" prevPage={{ path: '/architecture', label: 'Previous: Architecture Overview' }} nextPage={{ path: '/architecture/cost-performance', label: 'Next: Cost-Performance Tradeoffs' }} fallbackContent={`# Architectural Decision Records (ADRs)

## What are ADRs?

ADRs document **strategic architectural decisions** with their context, alternatives considered, and tradeoffs made. They serve as living documentation of *why* our system evolved the way it did.

## ADR Index

### Infrastructure & Deployment

#### ADR-001: Multi-Provider Abstraction Layer
**Status**: Accepted | **Date**: 2024-Q1

**Context**: Support 300+ AI models across 12+ providers without tight coupling

**Decision**: Create \`BaseProvider\` abstraction with:
- Unified interface for invoke, tokenCount, costEstimate
- Provider-specific implementations inherit from base
- Model registry with capabilities and pricing metadata

**Alternatives Considered**:
1. **Direct API integration** - Rejected: Creates tight coupling, hard to test
2. **Third-party abstraction (LiteLLM)** - Rejected: Loss of control, vendor lock-in
3. **Custom abstraction layer** - **Accepted**: Full control, testable, extensible

**Tradeoffs**:
- ✅ Flexibility: Add providers without changing business logic
- ✅ Testability: Mock providers for testing
- ❌ Abstraction overhead: 10-20ms latency per call
- ❌ Maintenance: Must update for provider API changes

**Cost-Performance Impact**:
- Latency: +15ms average (routing overhead)
- Cost: Neutral (enables cost optimization through routing)
- Quality: Neutral (transparent to AI quality)

---

#### ADR-002: LangGraph for Multi-Agent Orchestration
**Status**: Accepted | **Date**: 2024-Q2

**Context**: Complex AI workflows require orchestration, not ad-hoc sequencing

**Decision**: Adopt LangGraph for:
- State management across agent steps
- Conditional routing based on agent outputs
- Parallel execution of independent agents
- Built-in retry and error handling

**Alternatives Considered**:
1. **Custom orchestrator** - Rejected: High maintenance, reinventing wheels
2. **Temporal workflow** - Rejected: Overkill for AI-specific flows
3. **LangGraph** - **Accepted**: AI-native, proven patterns, active community

**Tradeoffs**:
- ✅ Proven patterns: Battle-tested for AI workflows
- ✅ Developer experience: Clear state management
- ❌ Learning curve: New abstraction to learn
- ❌ Dependency: Couples us to LangChain ecosystem

**Cost-Performance Impact**:
- Latency: +50ms per workflow (state serialization)
- Cost: -30% average (better prompt optimization through agents)
- Quality: +20% (multi-agent validation improves outputs)

---

### Cost Optimization

#### ADR-003: Cortex Meta-Language for Token Reduction
**Status**: Accepted | **Date**: 2024-Q3

**Context**: Output tokens dominate AI costs, need semantic compression

**Decision**: Implement Cortex meta-language:
- LISP-based SAST representation
- 3-stage pipeline: NL → Cortex → Optimized Cortex → NL
- Configurable optimization techniques per model
- Fallback to original on decode failures

**Alternatives Considered**:
1. **Prompt compression only** - Rejected: Input tokens < 30% of cost
2. **Output post-processing** - Rejected: Loses semantic meaning
3. **Cortex semantic layer** - **Accepted**: Preserves meaning, optimizes representation

**Tradeoffs**:
- ✅ Token reduction: 40-75% output token savings
- ✅ Cost reduction: 30-60% total cost savings
- ❌ Latency: +200ms per request (encoding/decoding)
- ❌ Complexity: New meta-language to maintain

**Cost-Performance Impact**:
- Latency: +200ms average (optimization overhead)
- Cost: -50% average (massive token reduction)
- Quality: -2% (slight semantic loss in edge cases)

**ROI**: At 1M requests/month, saves $50K+ vs 200ms latency increase

---

#### ADR-004: Semantic Caching with 85% Threshold
**Status**: Accepted | **Date**: 2024-Q2

**Context**: Many AI requests are semantically similar, exact cache has low hit rate

**Decision**: Implement semantic caching:
- Embedding-based similarity search
- 85% similarity threshold for cache hits
- 7-day TTL for cached responses
- Redis for distributed cache

**Alternatives Considered**:
1. **Exact string matching** - Rejected: ~5% hit rate too low
2. **90% similarity** - Rejected: Too strict, 40% hit rate
3. **85% similarity** - **Accepted**: 70-80% hit rate, acceptable quality
4. **80% similarity** - Rejected: Too permissive, quality degradation

**Tradeoffs**:
- ✅ Hit rate: 70-80% cache hits
- ✅ Cost savings: $0 for cached responses
- ❌ Quality risk: 85% match may not be perfect
- ❌ Embedding cost: $0.0001 per request for similarity

**Cost-Performance Impact**:
- Latency: 50ms (cache) vs 2000ms (API call) = 40x faster
- Cost: $0.0001 (embedding) vs $0.01 (API call) = 99% savings
- Quality: 97% user satisfaction (3% report cache mismatches)

---

### Failure & Resilience

#### ADR-005: 5-Tier Graceful Degradation
**Status**: Accepted | **Date**: 2024-Q1

**Context**: System overload requires prioritizing critical services

**Decision**: Implement service-tier prioritization:
- **Critical**: Authentication, billing (never degrade)
- **Essential**: Usage tracking, cost alerts (degrade last)
- **Important**: Analytics, insights (degrade under load)
- **Standard**: Reporting, exports (throttle early)
- **Optional**: Recommendations, trends (disable first)

**Alternatives Considered**:
1. **No prioritization** - Rejected: Total system failure under load
2. **Binary critical/non-critical** - Rejected: Too coarse-grained
3. **5-tier system** - **Accepted**: Granular control, clear SLAs

**Tradeoffs**:
- ✅ Resilience: Core services stay up under load
- ✅ User experience: Degradation over failure
- ❌ Complexity: Every service needs tier classification
- ❌ Testing: Hard to verify degradation paths

**Cost-Performance Impact**:
- Latency: Variable by tier (critical < 100ms, optional < 5s)
- Cost: Neutral (resource reallocation, not reduction)
- Availability: 99.9% for critical, 95% for optional

---

#### ADR-006: Circuit Breaker with Exponential Backoff
**Status**: Accepted | **Date**: 2024-Q1

**Context**: Provider failures cascade without protection

**Decision**: Implement circuit breakers:
- 5 failures trigger OPEN state
- 30s timeout before HALF_OPEN retry
- Exponential backoff: 1s → 2s → 4s → 8s → 16s
- Per-provider, per-model granularity

**Alternatives Considered**:
1. **No circuit breakers** - Rejected: Cascading failures
2. **Global circuit breaker** - Rejected: One failure affects all providers
3. **Per-provider breakers** - **Accepted**: Isolated failure domains

**Tradeoffs**:
- ✅ Failure isolation: One provider failure doesn't affect others
- ✅ Fast recovery: Exponential backoff prevents thundering herd
- ❌ False positives: Temporary errors trigger circuit
- ❌ Monitoring overhead: Track state per provider

**Cost-Performance Impact**:
- Latency: Immediate failure (0ms) vs timeout (30s)
- Cost: Neutral (prevents wasteful retries)
- Availability: 99.5% (circuit breaker prevents 0.5% failures)

---

## ADR Template

Use this template for new architectural decisions:

\`\`\`markdown
### ADR-XXX: [Decision Title]
**Status**: [Proposed|Accepted|Deprecated|Superseded] | **Date**: YYYY-QX

**Context**: [Why is this decision needed? What problem are we solving?]

**Decision**: [What did we decide? Be specific about implementation]

**Alternatives Considered**:
1. **Option A** - [Why rejected]
2. **Option B** - [Why rejected]
3. **Option C** - **Accepted**: [Why chosen]

**Tradeoffs**:
- ✅ Benefit 1
- ✅ Benefit 2
- ❌ Cost 1
- ❌ Cost 2

**Cost-Performance Impact**:
- Latency: [Quantify impact]
- Cost: [Quantify impact]
- Quality: [Quantify impact]
\`\`\`

## Next Steps

- **[Cost-Performance Tradeoffs](/architecture/cost-performance)** - Understand policy configurations
- **[Failure Domains](/architecture/failure-domains)** - Explore blast radius maps
- **[Propose New ADR](https://github.com/Hypothesize-Tech/costkatana-backend/issues/new?template=adr)** - Submit architectural decision

---

*Good ADRs make implicit decisions explicit. Document not just what you decided, but why—and what you gave up.*`} />);

export const CostPerformanceTradeoffsPage = () => (<DocumentationPage title="Cost-Performance Tradeoffs" description="Explicit cost vs latency vs quality configurations" prevPage={{ path: '/architecture/decisions', label: 'Previous: Architectural Decisions' }} nextPage={{ path: '/architecture/failure-domains', label: 'Next: Failure Domains' }} fallbackContent={`# Cost-Performance Tradeoffs

## Explicit Over Implicit

Cost Katana makes **cost-performance tradeoffs explicit** through configurable policies rather than hardcoded assumptions. Every strategic decision point exposes its tradeoffs clearly.

## The Tradeoff Triangle

\`\`\`
        ⚡ Performance (Latency)
         /\\
        /  \\
       /    \\
      /      \\
     /        \\
    /          \\
   /____________\\
  💰 Cost    📊 Quality
\`\`\`

You can optimize for **any two**, but not all three:
- **Cheap + Fast**: Lower quality (smaller models)
- **Cheap + High Quality**: Slower (batch processing, async)
- **Fast + High Quality**: Expensive (premium models, low latency)

## Routing Strategies

### Strategy 1: Cost-Optimized (Default for Free Tier)
**Priority**: Minimize cost above all

\`\`\`typescript
{
  costWeight: 0.60,        // 60% weight on cost
  latencyWeight: 0.15,     // 15% weight on latency
  qualityWeight: 0.25,     // 25% weight on quality
  fallbackStrategy: 'cost',
  
  modelPreferences: [
    'gemini-2.5-flash',    // $0.15 per 1M tokens
    'gpt-4o-mini',         // $0.30 per 1M tokens
    'claude-3-haiku'       // $0.50 per 1M tokens
  ]
}
\`\`\`

**Characteristics**:
- Latency: 1-3 seconds average
- Cost: $0.001 per request
- Quality: 85% user satisfaction

**Use Cases**: High-volume, cost-sensitive applications

---

### Strategy 2: Balanced (Default for Pro Tier)
**Priority**: Balance all three factors

\`\`\`typescript
{
  costWeight: 0.33,        // Equal weighting
  latencyWeight: 0.33,
  qualityWeight: 0.34,
  fallbackStrategy: 'balanced',
  
  modelPreferences: [
    'gpt-4o',              // Balance of all factors
    'claude-3.5-sonnet',   // High quality fallback
    'gemini-1.5-pro'       // Cost-effective fallback
  ]
}
\`\`\`

**Characteristics**:
- Latency: 800ms average
- Cost: $0.005 per request
- Quality: 93% user satisfaction

**Use Cases**: Production applications, general-purpose AI

---

### Strategy 3: Speed-Optimized (Default for Enterprise Tier)
**Priority**: Minimize latency

\`\`\`typescript
{
  costWeight: 0.10,        // Cost is secondary
  latencyWeight: 0.70,     // 70% weight on speed
  qualityWeight: 0.20,
  fallbackStrategy: 'speed',
  
  modelPreferences: [
    'gpt-4o-mini',         // Fast + decent quality
    'gemini-2.5-flash',    // Fastest available
    'claude-3-haiku'       // Speed fallback
  ],
  
  cacheStrategy: 'aggressive',  // Cache everything
  timeoutMs: 500                // Fail fast
}
\`\`\`

**Characteristics**:
- Latency: 200-400ms average
- Cost: $0.002 per request
- Quality: 88% user satisfaction

**Use Cases**: Real-time chat, interactive applications

---

### Strategy 4: Quality-Optimized (Custom)
**Priority**: Maximum output quality

\`\`\`typescript
{
  costWeight: 0.10,        // Cost is secondary
  latencyWeight: 0.15,
  qualityWeight: 0.75,     // 75% weight on quality
  fallbackStrategy: 'quality',
  
  modelPreferences: [
    'claude-opus-4',       // Highest quality
    'gpt-4o',              // High quality fallback
    'gemini-1.5-pro'       // Quality fallback
  ],
  
  enableMultiAgent: true,  // Use quality analyst agent
  qualityThreshold: 0.95   // Only return if 95%+ confidence
}
\`\`\`

**Characteristics**:
- Latency: 3-5 seconds average
- Cost: $0.020 per request
- Quality: 98% user satisfaction

**Use Cases**: Content creation, critical decision-making

---

## Cortex Optimization Tradeoffs

### Technique: LISP-based Compression
**What it does**: Convert natural language to compact semantic representation

\`\`\`typescript
{
  technique: 'cortex_lisp',
  tokenReduction: 0.45,    // 45% fewer tokens
  latencyOverhead: 200,    // +200ms processing
  costSavings: 0.40,       // 40% cost reduction
  qualityLoss: 0.02,       // 2% semantic loss
  
  // Tradeoff analysis
  netBenefit: {
    at_1K_requests: -$5,    // Overhead dominates
    at_10K_requests: +$150, // Break-even
    at_100K_requests: +$2000, // Massive savings
    at_1M_requests: +$20K   // Highly profitable
  }
}
\`\`\`

**Recommendation**: Enable for **production workloads > 10K requests/month**

---

### Technique: Semantic Caching
**What it does**: Reuse similar responses with 85% similarity threshold

\`\`\`typescript
{
  technique: 'semantic_cache',
  similarityThreshold: 0.85,  // 85% match required
  hitRate: 0.75,              // 75% of requests cached
  embeddingCost: 0.0001,      // $0.0001 per request
  
  // Tradeoff analysis
  perRequest: {
    cacheHit: {
      latency: 50,       // 50ms
      cost: 0.0001,      // Embedding only
      quality: 0.97      // 97% match quality
    },
    cacheMiss: {
      latency: 2000,     // 2s (API call)
      cost: 0.01,        // Full API cost
      quality: 1.00      // Perfect match
    },
    weighted: {
      latency: 537,      // 75% * 50 + 25% * 2000
      cost: 0.00257,     // 75% * 0.0001 + 25% * 0.01
      quality: 0.9775,   // 75% * 0.97 + 25% * 1.0
      savings: 74.3%     // Cost reduction
    }
  }
}
\`\`\`

**Recommendation**: Always enable semantic caching (massive ROI)

---

## SLA Configuration

### Free Tier SLA
\`\`\`typescript
{
  maxResponseTime: 5000,      // 5 seconds
  minAvailability: 0.95,      // 95% uptime
  maxErrorRate: 0.10,         // 10% errors tolerated
  budgetLimit: 100,           // $100/month
  rateLimit: 1000,            // 1K requests/minute
  
  degradationBehavior: {
    at80PercentBudget: 'warn',
    at90PercentBudget: 'throttle_to_balanced',
    at95PercentBudget: 'throttle_to_cost',
    at100PercentBudget: 'block_requests'
  }
}
\`\`\`

---

### Pro Tier SLA
\`\`\`typescript
{
  maxResponseTime: 2000,      // 2 seconds
  minAvailability: 0.99,      // 99% uptime
  maxErrorRate: 0.05,         // 5% errors tolerated
  budgetLimit: null,          // No hard limit
  rateLimit: 10000,           // 10K requests/minute
  
  degradationBehavior: {
    at80PercentBudget: 'warn_only',
    at90PercentBudget: 'notify_user',
    at95PercentBudget: 'escalate_alert',
    at100PercentBudget: 'continue_with_notification'
  }
}
\`\`\`

---

### Enterprise Tier SLA
\`\`\`typescript
{
  maxResponseTime: 1000,      // 1 second
  minAvailability: 0.999,     // 99.9% uptime (3 nines)
  maxErrorRate: 0.01,         // 1% errors tolerated
  budgetLimit: null,          // No limit
  rateLimit: 100000,          // 100K requests/minute
  
  customSLA: true,            // Negotiated per customer
  dedicatedSupport: true,
  priorityRouting: true,
  
  degradationBehavior: {
    never_throttle: true,
    priority_lane: true,
    dedicated_resources: true
  }
}
\`\`\`

---

## Decision Matrix

| Use Case | Strategy | Cost | Latency | Quality | Cortex | Cache |
|----------|----------|------|---------|---------|--------|-------|
| **Chatbot (high volume)** | Cost-Opt | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ✅ | ✅ |
| **Search/Discovery** | Speed-Opt | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ❌ | ✅ |
| **Content Creation** | Quality-Opt | ⭐ | ⭐ | ⭐⭐⭐ | ✅ | ❌ |
| **Code Generation** | Balanced | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ✅ | ✅ |
| **Summarization** | Cost-Opt | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ | ✅ | ✅ |
| **Real-time Assistant** | Speed-Opt | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ❌ | ✅ |
| **Research Analysis** | Quality-Opt | ⭐ | ⭐ | ⭐⭐⭐ | ✅ | ❌ |

---

## Configuration Examples

### Example 1: Cost-Sensitive Startup
\`\`\`typescript
import { ai } from 'cost-katana';

const config = {
  strategy: 'cost',
  cortex: { enabled: true },
  cache: { enabled: true, threshold: 0.85 },
  budget: { daily: 50, alerts: [0.8, 0.9, 0.95] },
  fallback: ['gemini-2.5-flash', 'gpt-4o-mini']
};

const response = await ai('gpt-4o', prompt, config);
\`\`\`

### Example 2: Enterprise Real-Time Application
\`\`\`typescript
const config = {
  strategy: 'speed',
  cortex: { enabled: false },  // Skip optimization overhead
  cache: { enabled: true, aggressive: true },
  timeout: 500,                // Fail fast
  fallback: ['gpt-4o-mini', 'gemini-2.5-flash']
};
\`\`\`

### Example 3: Quality-Critical Content
\`\`\`typescript
const config = {
  strategy: 'quality',
  cortex: { enabled: true, technique: 'advanced' },
  multiAgent: { enabled: true, includeQualityAnalyst: true },
  qualityThreshold: 0.95,
  fallback: ['claude-opus-4', 'gpt-4o']
};
\`\`\`

---

## Next Steps

- **[Failure Domains](/architecture/failure-domains)** - Understand blast radius
- **[Strategic Metrics](/architecture/metrics)** - Monitor tradeoff effectiveness
- **[Configuration Guide](/features/optimization)** - Implement these strategies

---

*Every decision is a tradeoff. Make your tradeoffs explicit, measurable, and configurable.*`} />);

export const FailureDomainsPage = () => (<DocumentationPage title="Failure Domains" description="Blast radius mapping and failure isolation strategy" prevPage={{ path: '/architecture/cost-performance', label: 'Previous: Cost-Performance' }} nextPage={{ path: '/architecture/metrics', label: 'Next: Strategic Metrics' }} fallbackContent={`# Failure Domains & Blast Radius

## Failure Domain Philosophy

**Principle**: Failures are inevitable. **Isolate them** so one failure doesn't cascade into total system failure.

Cost Katana uses **explicit failure domain boundaries** with documented blast radius for every service and dependency.

## Failure Domain Map

\`\`\`
┌──────────────────────────────────────────────────────────────┐
│                     DOMAIN 1: Gateway                         │
│  Blast Radius: User requests (single-tenant isolation)       │
├──────────────────────────────────────────────────────────────┤
│  • Circuit Breaker: Per-provider, 5-failure threshold        │
│  • Timeout: 30s default, configurable per tier               │
│  • Fallback: 3-provider chain, Redis → In-Memory cache       │
│  • Impact: Gateway failure → 503 (no data loss)              │
└─────────────┬────────────────────────────────────────────────┘
              │
┌─────────────▼────────────────────────────────────────────────┐
│                 DOMAIN 2: AI Provider Layer                   │
│  Blast Radius: Single provider (others unaffected)           │
├──────────────────────────────────────────────────────────────┤
│  • OpenAI     [Circuit: CLOSED]  ✅ Healthy                   │
│  • Anthropic  [Circuit: CLOSED]  ✅ Healthy                   │
│  • Google AI  [Circuit: OPEN]    ❌ Failing (isolated)        │
│  • AWS        [Circuit: HALF_OPEN] 🟡 Recovering             │
│  • Impact: Provider failure → Failover to next provider      │
└─────────────┬────────────────────────────────────────────────┘
              │
┌─────────────▼────────────────────────────────────────────────┐
│                   DOMAIN 3: Core Services                     │
│  Blast Radius: Service-tier dependent (critical never fail)  │
├──────────────────────────────────────────────────────────────┤
│  • Authentication   [CRITICAL]   ✅ No degradation           │
│  • Billing          [CRITICAL]   ✅ No degradation           │
│  • Usage Tracking   [ESSENTIAL]  🟡 Degrade last             │
│  • Analytics        [IMPORTANT]  🟠 Degrade under load       │
│  • Reporting        [STANDARD]   🟠 Throttle early           │
│  • Recommendations  [OPTIONAL]   ⚪ Disable first            │
│  • Impact: Service failure → Graceful degradation by tier    │
└─────────────┬────────────────────────────────────────────────┘
              │
┌─────────────▼────────────────────────────────────────────────┐
│                  DOMAIN 4: Data Layer                         │
│  Blast Radius: Database-level (read replicas isolate writes) │
├──────────────────────────────────────────────────────────────┤
│  • MongoDB Primary   [Writes]    ✅ Healthy                   │
│  • MongoDB Replica 1 [Reads]     ✅ Healthy                   │
│  • MongoDB Replica 2 [Reads]     ❌ Down (read failover)      │
│  • Redis Cache       [Fast path] ✅ Healthy                   │
│  • Impact: DB failure → Read-only mode, cache-only fallback  │
└──────────────────────────────────────────────────────────────┘
\`\`\`

---

## Failure Scenarios & Blast Radius

### Scenario 1: Single Provider Failure (e.g., OpenAI Down)
**Blast Radius**: OpenAI requests only

\`\`\`
[User Request] → [Gateway]
                    ↓
      [OpenAI Circuit: CLOSED] → [Invoke OpenAI]
                    ↓
              ❌ Failure (5x in 30s)
                    ↓
      [Circuit Opens: OPEN state]
                    ↓
         [Failover to Anthropic]
                    ↓
              ✅ Success
\`\`\`

**Impact**:
- OpenAI requests: 100% failover to Anthropic
- Other providers: Unaffected
- User experience: Transparent (slight latency increase)
- Cost impact: +20% (Anthropic slightly more expensive)

**Recovery**:
- After 30s: Circuit → HALF_OPEN
- 1 successful request: Circuit → CLOSED
- OpenAI back in rotation

---

### Scenario 2: MongoDB Primary Failure
**Blast Radius**: Write operations (reads continue via replicas)

\`\`\`
[User Request: Write Usage Data]
         ↓
   [MongoDB Primary]
         ↓
    ❌ Timeout (5s)
         ↓
   [Circuit Breaker Opens]
         ↓
   [Fallback: Redis Queue]
         ↓
   ✅ Queued for later write
         ↓
   [Background: Retry every 30s]
         ↓
   [MongoDB recovers]
         ↓
   [Drain queue: Write buffered data]
\`\`\`

**Impact**:
- Write operations: Queued (no data loss)
- Read operations: Served from replicas (unaffected)
- Real-time analytics: Delayed by queue drain time
- User experience: No visible impact

**Mitigation**:
- Redis queue capacity: 10M events
- Queue drain rate: 100K events/minute
- Alerting: PagerDuty if queue > 1M events

---

### Scenario 3: Redis Cache Failure
**Blast Radius**: Cache hits only (degraded to direct API)

\`\`\`
[User Request]
      ↓
[Check Redis Cache]
      ↓
 ❌ Redis timeout (100ms)
      ↓
[Fallback: In-Memory Cache]
      ↓
  🟡 Cache Miss (50% hit rate vs 80%)
      ↓
[Direct AI Provider Call]
      ↓
  ✅ Success (higher latency, cost)
\`\`\`

**Impact**:
- Cache hit rate: 80% → 50% (in-memory fallback)
- Cost: +30% (more API calls)
- Latency: +500ms average
- User experience: Slower responses

**Mitigation**:
- In-memory cache: 10K most recent entries
- Redis auto-recovery: Sentinel failover in 30s
- Alerting: Slack if hit rate < 60%

---

### Scenario 4: Multi-Agent Orchestration Failure
**Blast Radius**: Multi-agent workflows only (single-agent unaffected)

\`\`\`
[User Request: Complex Analysis]
         ↓
   [Master Agent]
         ↓
  [Parallel: Cost Optimizer, Quality Analyst, Web Scraper]
         ↓
    ❌ Web Scraper timeout (10s)
         ↓
   [Partial Results: 2/3 agents]
         ↓
   [Aggregate Available Results]
         ↓
   ✅ Return with degraded quality flag
\`\`\`

**Impact**:
- Web scraper workflows: Degraded (no external data)
- Other agents: Unaffected
- Result quality: 90% vs 100%
- User experience: Warning shown, partial results

**Mitigation**:
- Timeout per agent: 10s (configurable)
- Retry failed agents: 2 retries with exponential backoff
- Fallback: Return partial results if 2+ agents succeed

---

## Circuit Breaker Configuration

### Provider-Level Circuit Breakers
\`\`\`typescript
{
  provider: 'openai',
  failureThreshold: 5,        // Open after 5 failures
  successThreshold: 1,        // Close after 1 success in HALF_OPEN
  timeout: 30000,             // 30s before HALF_OPEN
  halfOpenMaxCalls: 3,        // Test 3 requests in HALF_OPEN
  
  fallback: [
    'anthropic',              // Primary fallback
    'google',                 // Secondary fallback
    'aws-bedrock'             // Tertiary fallback
  ],
  
  blastRadius: 'provider',    // Isolated to this provider
  escalation: {
    at5Failures: 'log_warning',
    at10Failures: 'send_slack_alert',
    at50Failures: 'page_on_call'
  }
}
\`\`\`

---

### Service-Level Circuit Breakers
\`\`\`typescript
{
  service: 'analytics',
  tier: 'important',
  failureThreshold: 10,       // More tolerant for non-critical
  timeout: 60000,             // 60s recovery time
  
  degradation: {
    atLightLoad: 'full_service',
    atModerateLoad: 'cache_only',
    atHeavyLoad: 'disabled',
    atSevereLoad: 'disabled'
  },
  
  blastRadius: 'service',     // Only analytics affected
  dependencies: ['mongodb', 'redis'],
  
  // If MongoDB fails, analytics degrades, but doesn't fail
  gracefulDegradation: true
}
\`\`\`

---

## Dependency Graph

### Critical Path Dependencies
\`\`\`
User Request
    ↓
Gateway (no dependencies)
    ↓
─────┬─────────────────────────────
     ↓                             ↓
AI Provider               Authentication
(external)                (MongoDB)
     ↓                             ↓
Usage Tracking ←──────────────────┘
(MongoDB + Redis)
     ↓
Analytics (eventual consistency)
\`\`\`

**Critical Path**:
1. Gateway → AI Provider → Response (synchronous)
2. Usage Tracking (asynchronous, queued)

**Non-Critical Path**:
- Analytics computation (batch)
- Report generation (on-demand)
- Recommendations (cacheable)

---

## Blast Radius Mitigation Strategies

### 1. **Tenant Isolation**
Every user request is isolated:
- Separate MongoDB collections per tenant
- Redis namespace per user
- Rate limits per user (prevents one user DOSing others)

### 2. **Provider Failover Chains**
Never depend on a single provider:
\`\`\`typescript
const fallbackChain = [
  'openai',      // Primary (best price/quality)
  'anthropic',   // Fallback 1 (best quality)
  'google',      // Fallback 2 (best speed)
  'aws-bedrock'  // Fallback 3 (always available)
];
\`\`\`

### 3. **Read/Write Segregation**
Writes more fragile than reads:
- Writes: Queued in Redis, batched, retried
- Reads: Served from replicas, cached aggressively

### 4. **Graceful Degradation Tiers**
Not all features are equal:
- **Critical**: Never degrade (auth, billing)
- **Essential**: Degrade last (usage tracking)
- **Important**: Degrade under load (analytics)
- **Standard**: Throttle early (reporting)
- **Optional**: Disable first (recommendations)

---

## Monitoring Blast Radius

### Metrics to Track
\`\`\`typescript
{
  // Per-provider metrics
  'circuit_breaker.openai.state': 'CLOSED|OPEN|HALF_OPEN',
  'circuit_breaker.openai.failures_last_minute': 0,
  'failover.openai_to_anthropic.count': 42,
  
  // Per-service metrics
  'service.analytics.tier': 'important',
  'service.analytics.degradation_level': 'cache_only',
  'service.analytics.blast_radius': 'service',
  
  // System-wide metrics
  'system.overload_level': 'moderate',
  'system.degraded_services': ['analytics', 'reporting'],
  'system.failed_providers': ['google']
}
\`\`\`

---

## Testing Failure Scenarios

### Chaos Engineering Tests
\`\`\`bash
# Simulate provider failure
npm run chaos:kill-provider --provider=openai --duration=5m

# Simulate database failure
npm run chaos:kill-mongodb-primary --duration=30s

# Simulate cache failure
npm run chaos:kill-redis --duration=1m

# Simulate overload
npm run chaos:load-spike --rps=10000 --duration=2m
\`\`\`

### Expected Outcomes
- Provider failure: 100% failover success
- DB failure: 0 data loss, writes queued
- Cache failure: Hit rate degrades, no failures
- Overload: Graceful degradation by tier

---

## Next Steps

- **[Strategic Metrics](/architecture/metrics)** - Monitor failure domain health
- **[Observability](/observability/opentelemetry)** - Trace failures across domains
- **[Alerts](/features/alerts)** - Configure failure alerts

---

*Failures are inevitable. Isolate them. Make blast radius explicit. Test chaos scenarios.*`} />);

export const ArchitectureMetricsPage = () => (<DocumentationPage title="Strategic Metrics" description="Architectural health monitoring and decision quality metrics" prevPage={{ path: '/architecture/failure-domains', label: 'Previous: Failure Domains' }} fallbackContent={`# Strategic Architectural Metrics

## Strategy > Syntax Metrics

Traditional metrics focus on **implementation** (latency, throughput, errors). Strategic metrics focus on **architectural health** (decision quality, tradeoff effectiveness, failure domain isolation).

## Metric Categories

### 1. Architectural Decision Quality

#### ADR Coverage
**What**: Percentage of strategic decisions documented with ADRs

\`\`\`typescript
{
  metric: 'adr_coverage',
  formula: 'documented_decisions / total_strategic_decisions',
  target: 0.90,        // 90% coverage
  current: 0.73,       // 73% coverage
  status: '🟡 Below target',
  
  breakdown: {
    infrastructure: 0.85,    // 85% documented
    cost_optimization: 0.80,
    failure_resilience: 0.90,
    intelligence_layer: 0.45  // ⚠️ Needs work
  }
}
\`\`\`

**Improvement Actions**:
- Document intelligence layer decisions
- Conduct quarterly ADR audit
- Block PRs without ADR for architecture changes

---

#### Tradeoff Explicitness Score
**What**: How clearly tradeoffs are documented in configuration

\`\`\`typescript
{
  metric: 'tradeoff_explicitness',
  formula: 'explicit_tradeoffs / total_configuration_decisions',
  target: 0.95,
  current: 0.68,
  status: '🟡 Below target',
  
  examples: {
    explicit: [
      'costWeight: 0.60  // 60% priority on cost reduction',
      'fallbackStrategy: "cost"  // Sacrifice latency for cost',
      'similarityThreshold: 0.85  // Balance hit rate vs quality'
    ],
    implicit: [
      'operation: "answer"',      // ❌ Hardcoded, no rationale
      'provider: "openai"',        // ❌ No fallback documented
      'maxTokens: 2000'            // ❌ No tradeoff explained
    ]
  }
}
\`\`\`

**Improvement Actions**:
- Add inline comments for all strategic config
- Extract hardcoded values to explicit policies
- Document alternatives considered

---

### 2. Cost-Performance Effectiveness

#### Token Reduction Achievement
**What**: Actual token reduction vs target (40-75% with Cortex)

\`\`\`typescript
{
  metric: 'token_reduction_achievement',
  target: { min: 0.40, max: 0.75 },
  
  by_model: {
    'claude-3.5-sonnet': {
      actual: 0.492,         // 49.2% reduction
      target: 0.50,
      status: '✅ On target',
      technique: 'cortex_lisp'
    },
    'claude-opus-4': {
      actual: 0.499,         // 49.9% reduction
      target: 0.50,
      status: '✅ On target',
      compression_ratio: 0.761
    },
    'gemini-2.5-flash': {
      actual: 0.737,         // 73.7% reduction
      target: 0.65,
      status: '✅ Exceeds target',
      best_in_class: true
    }
  },
  
  overall: {
    weighted_average: 0.58,  // 58% reduction
    status: '✅ Within target range'
  }
}
\`\`\`

---

#### Net Cost Savings After Overhead
**What**: Cost savings minus optimization overhead

\`\`\`typescript
{
  metric: 'net_cost_savings',
  
  baseline: {
    monthly_requests: 1000000,
    avg_cost_per_request: 0.01,
    total_baseline_cost: 10000    // $10K/month
  },
  
  optimized: {
    cortex_overhead: 0.0002,      // $0.0002 per request
    cache_embedding: 0.0001,      // $0.0001 per request
    total_overhead: 300,          // $300/month
    
    cortex_savings: 5000,         // $5K saved (50% reduction)
    cache_savings: 7400,          // $7.4K saved (74% hit rate)
    total_savings: 12400,         // $12.4K saved
    
    net_savings: 12100,           // $12.1K net (after overhead)
    roi: 40.33                    // 40x return on optimization cost
  },
  
  status: '✅ Highly effective'
}
\`\`\`

---

#### SLA Compliance Rate
**What**: Percentage of requests meeting tier-specific SLAs

\`\`\`typescript
{
  metric: 'sla_compliance',
  
  by_tier: {
    free: {
      sla_latency: 5000,          // 5s max
      sla_availability: 0.95,     // 95%
      actual_latency_p95: 4200,   // 4.2s
      actual_availability: 0.964,  // 96.4%
      compliance: 1.00,           // ✅ 100%
      status: '✅ Compliant'
    },
    pro: {
      sla_latency: 2000,          // 2s max
      sla_availability: 0.99,     // 99%
      actual_latency_p95: 1850,   // 1.85s
      actual_availability: 0.993,  // 99.3%
      compliance: 1.00,           // ✅ 100%
      status: '✅ Compliant'
    },
    enterprise: {
      sla_latency: 1000,          // 1s max
      sla_availability: 0.999,    // 99.9%
      actual_latency_p95: 880,    // 880ms
      actual_availability: 0.9995, // 99.95%
      compliance: 1.00,           // ✅ 100%
      status: '✅ Compliant'
    }
  },
  
  overall_compliance: 1.00        // ✅ All tiers compliant
}
\`\`\`

---

### 3. Failure Domain Health

#### Circuit Breaker Distribution
**What**: How many circuit breakers are open/closed/half-open

\`\`\`typescript
{
  metric: 'circuit_breaker_health',
  
  by_domain: {
    providers: {
      total: 12,
      closed: 10,        // ✅ Healthy
      half_open: 1,      // 🟡 Recovering
      open: 1,           // ❌ Failing
      health_score: 0.917 // 91.7%
    },
    services: {
      total: 25,
      closed: 24,        // ✅ Healthy
      half_open: 1,      // 🟡 Recovering
      open: 0,
      health_score: 0.980 // 98%
    },
    database: {
      total: 4,
      closed: 4,         // ✅ All healthy
      half_open: 0,
      open: 0,
      health_score: 1.00  // 100%
    }
  },
  
  overall_health: 0.965,  // 96.5% healthy
  status: '✅ System healthy'
}
\`\`\`

---

#### Blast Radius Containment
**What**: Percentage of failures that didn't cascade

\`\`\`typescript
{
  metric: 'blast_radius_containment',
  
  incidents_last_30d: {
    total_failures: 147,
    contained_failures: 143,     // 97.3% contained
    cascading_failures: 4,       // 2.7% cascaded
    containment_rate: 0.973,
    
    by_severity: {
      critical: {
        total: 5,
        contained: 5,            // ✅ 100% contained
        cascaded: 0
      },
      high: {
        total: 28,
        contained: 27,           // ✅ 96.4% contained
        cascaded: 1
      },
      medium: {
        total: 114,
        contained: 111,          // ✅ 97.4% contained
        cascaded: 3
      }
    }
  },
  
  target: 0.95,                   // 95% containment
  status: '✅ Exceeds target'
}
\`\`\`

---

#### Mean Time to Detect (MTTD)
**What**: How quickly failures are detected

\`\`\`typescript
{
  metric: 'mttd',
  
  by_domain: {
    provider_failure: {
      detection_method: 'circuit_breaker',
      mttd_seconds: 12,          // 12s average
      target: 30,
      status: '✅ 2.5x better than target'
    },
    service_degradation: {
      detection_method: 'health_check',
      mttd_seconds: 45,          // 45s average
      target: 60,
      status: '✅ Ahead of target'
    },
    database_failure: {
      detection_method: 'connection_timeout',
      mttd_seconds: 5,           // 5s average
      target: 10,
      status: '✅ 2x better than target'
    }
  },
  
  overall_mttd: 21,               // 21s average
  target: 40,
  status: '✅ System performs well'
}
\`\`\`

---

### 4. Orchestration Quality

#### Multi-Agent Success Rate
**What**: Percentage of multi-agent workflows that complete successfully

\`\`\`typescript
{
  metric: 'multi_agent_success',
  
  by_workflow: {
    'cost_optimization': {
      total_executions: 5284,
      successful: 5127,          // 97.0%
      partial: 142,              // 2.7% (some agents failed)
      failed: 15,                // 0.3%
      success_rate: 0.970,
      status: '✅ Excellent'
    },
    'quality_analysis': {
      total_executions: 3891,
      successful: 3812,          // 98.0%
      partial: 67,               // 1.7%
      failed: 12,                // 0.3%
      success_rate: 0.980,
      status: '✅ Excellent'
    },
    'web_research': {
      total_executions: 2156,
      successful: 1945,          // 90.2%
      partial: 189,              // 8.8% (scraper failures)
      failed: 22,                // 1.0%
      success_rate: 0.902,
      status: '🟡 Needs improvement'
    }
  },
  
  overall_success_rate: 0.952,   // 95.2%
  target: 0.95,
  status: '✅ On target'
}
\`\`\`

---

#### Workflow Parallelism Efficiency
**What**: How well we utilize parallel execution

\`\`\`typescript
{
  metric: 'parallelism_efficiency',
  
  calculation: {
    total_workflow_time: 1000,   // Sum of all steps if sequential
    actual_workflow_time: 350,   // Actual time with parallelism
    parallelism_gain: 2.86,      // 2.86x speedup
    efficiency: 0.65,            // 65% of theoretical max (4 cores)
    
    bottlenecks: [
      'web_scraper (30% of time)',  // Sequential bottleneck
      'quality_analyst (25% of time)'
    ]
  },
  
  target_efficiency: 0.70,       // 70% of theoretical max
  status: '🟡 Close to target',
  
  improvement_potential: {
    optimize_web_scraper: '+15% efficiency',
    increase_parallelism: '+10% efficiency'
  }
}
\`\`\`

---

## Strategic Dashboards

### Dashboard 1: Architectural Health
\`\`\`
┌─────────────────────────────────────────────────────────┐
│  Architectural Health Score: 87/100  🟢 Healthy        │
├─────────────────────────────────────────────────────────┤
│  ADR Coverage:              73%  🟡 Below target (90%)  │
│  Tradeoff Explicitness:     68%  🟡 Below target (95%)  │
│  Circuit Breaker Health:    96.5% ✅ Excellent          │
│  Blast Radius Containment:  97.3% ✅ Excellent          │
│  SLA Compliance:            100%  ✅ Perfect            │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

### Dashboard 2: Cost-Performance Effectiveness
\`\`\`
┌─────────────────────────────────────────────────────────┐
│  Cost Optimization ROI: 40x  🟢 Highly Effective       │
├─────────────────────────────────────────────────────────┤
│  Token Reduction:          58%  ✅ Within target range  │
│  Net Monthly Savings:      $12.1K  ✅ Strong ROI        │
│  Cache Hit Rate:           74%  ✅ Excellent            │
│  Cortex Success Rate:      98%  ✅ Excellent            │
│  Quality Score:            97.2%  ✅ High quality       │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

### Dashboard 3: Failure Isolation
\`\`\`
┌─────────────────────────────────────────────────────────┐
│  Failure Isolation Score: 94/100  🟢 Excellent         │
├─────────────────────────────────────────────────────────┤
│  Cascading Failures:       2.7%  ✅ Contained           │
│  MTTD (Mean Time Detect):  21s  ✅ Fast detection      │
│  Provider Circuit Breakers: 10/12 ✅ 2 recovering       │
│  Service Circuit Breakers: 24/25 ✅ 1 recovering        │
│  Failover Success Rate:    99.8%  ✅ Excellent          │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## Metric Collection

### OpenTelemetry Integration
\`\`\`typescript
import { metrics } from '@opentelemetry/api';

const meter = metrics.getMeter('cost-katana-architecture');

// Strategic metrics
const adrCoverage = meter.createGauge('architecture.adr_coverage', {
  description: 'Percentage of strategic decisions documented',
  unit: 'percent'
});

const blastRadiusContainment = meter.createGauge(
  'architecture.blast_radius_containment',
  {
    description: 'Percentage of failures contained to single domain',
    unit: 'percent'
  }
);

// Cost-performance metrics
const netCostSavings = meter.createGauge('architecture.net_cost_savings', {
  description: 'Net cost savings after optimization overhead',
  unit: 'USD'
});
\`\`\`

---

## Alerting Rules

### Critical Alerts
\`\`\`yaml
- name: blast_radius_containment_low
  condition: blast_radius_containment < 0.90
  severity: P1
  notification: pagerduty
  message: "Cascading failures detected (containment: {value})"

- name: sla_compliance_breach
  condition: sla_compliance < 0.95
  severity: P1
  notification: pagerduty
  message: "SLA compliance breach: {tier} tier at {value}"
\`\`\`

### Warning Alerts
\`\`\`yaml
- name: adr_coverage_low
  condition: adr_coverage < 0.80
  severity: P2
  notification: slack
  message: "ADR coverage below 80%: {value}"

- name: tradeoff_explicitness_low
  condition: tradeoff_explicitness < 0.70
  severity: P2
  notification: slack
  message: "Implicit decisions detected: {value}"
\`\`\`

---

## Next Steps

- **[Architecture Overview](/architecture)** - Back to architecture home
- **[Observability](/observability/opentelemetry)** - Set up metric collection
- **[Alerts](/features/alerts)** - Configure architectural alerts

---

*Measure what matters. Strategy over syntax. Decisions over code. Tradeoffs over assumptions.*`} />);

export default OpenTelemetryVendorsPage;