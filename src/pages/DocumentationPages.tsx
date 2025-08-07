import DocumentationPage from "../components/DocumentationPage";

// Getting Started Pages
export const InstallationPage = () => (
  <DocumentationPage
    title="Installation"
    description="Detailed installation instructions for Cost Katana"
    prevPage={{ path: '/getting-started/quick-start', label: 'Previous: Quick Start' }}
  />
);

// Integrations Pages
export const IntegrationsOverviewPage = () => (
  <DocumentationPage
    title="Integrations Overview"
    description="Connect Cost Katana with your favorite tools and frameworks"
  />
);

export const NodeJSPage = () => (
  <DocumentationPage
    title="Node.js SDK"
    description="Integrate Cost Katana with your Node.js applications"
    prevPage={{ path: '/integrations', label: 'Back to Integrations' }}
    nextPage={{ path: '/integrations/python', label: 'Next: Python SDK' }}
  />
);

export const PythonPage = () => (
  <DocumentationPage
    title="Python SDK"
    description="Integrate Cost Katana with your Python applications"
    prevPage={{ path: '/integrations/nodejs', label: 'Previous: Node.js SDK' }}
    nextPage={{ path: '/integrations/chatgpt', label: 'Next: ChatGPT Integration' }}
  />
);

export const ChatGPTPage = () => (
  <DocumentationPage
    title="ChatGPT Integration"
    description="Direct ChatGPT custom GPT integration for instant optimization"
    prevPage={{ path: '/integrations/python', label: 'Previous: Python SDK' }}
  />
);

// Features Pages
export const FeaturesOverviewPage = () => (
  <DocumentationPage
    title="Features Overview"
    description="Explore all Cost Katana features for AI cost optimization"
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
- Fine-tune custom models
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

export const TrainingPage = () => (
  <DocumentationPage
    title="Training & Fine-tuning"
    description="Cost-effective model training and fine-tuning"
    prevPage={{ path: '/features/alerts', label: 'Previous: Alerts' }}
    fallbackContent={`# Training & Fine-tuning

Optimize costs for model training and fine-tuning operations.

![Training Dashboard](/assets/training_1.png)

## Training Cost Management

### Cost Estimation
- **Pre-training Estimates**: Calculate before starting
- **Dataset Analysis**: Optimize training data
- **Compute Planning**: Right-size resources
- **Time Estimates**: Duration predictions

![Training Analytics](/assets/training_2.png)

### Resource Optimization
- **Spot Instances**: Use cheaper compute
- **Batch Processing**: Optimize GPU usage
- **Checkpoint Management**: Smart saving
- **Early Stopping**: Prevent overtraining

## Fine-tuning

### Provider Support
- **OpenAI**: GPT-3.5, GPT-4 fine-tuning
- **Anthropic**: Claude fine-tuning
- **AWS Bedrock**: Custom model training
- **Cohere**: Custom model creation

### Cost Optimization
\`\`\`javascript
// Optimize fine-tuning costs
const training = await ck.training.create({
  provider: 'openai',
  base_model: 'gpt-3.5-turbo',
  dataset: 'training_data.jsonl',
  optimization: {
    sample_rate: 0.1, // Use 10% for validation
    early_stopping: true,
    checkpoint_frequency: 1000,
    use_spot_pricing: true
  }
});

// Monitor training costs
const status = await ck.training.getStatus(training.id);
console.log(\`Current cost: $\${status.cost}\`);
console.log(\`Estimated total: $\${status.estimated_total}\`);
\`\`\`

## Dataset Management

### Data Preparation
- **Format Validation**: Check data format
- **Quality Scoring**: Assess data quality
- **Deduplication**: Remove duplicates
- **Balancing**: Ensure representation

### Cost-Effective Strategies
- **Synthetic Data**: Generate training data
- **Active Learning**: Smart data selection
- **Transfer Learning**: Leverage existing models
- **Few-Shot Learning**: Minimize data needs

## Training Monitoring

### Real-time Tracking
- **Cost Accumulation**: Watch spending
- **Performance Metrics**: Loss, accuracy
- **Resource Usage**: GPU, memory
- **Progress Tracking**: Completion percentage

### Optimization Insights
- **Hyperparameter Tuning**: Optimal settings
- **Learning Rate**: Adjustment suggestions
- **Batch Size**: Efficiency recommendations
- **Architecture**: Model size optimization

![Training Performance Monitoring](/assets/training_3.png)

## Deployment

### Model Serving
- **Endpoint Creation**: Deploy trained models
- **Auto-scaling**: Handle variable load
- **A/B Testing**: Compare model versions
- **Rollback**: Quick reversion

### Cost Management
\`\`\`javascript
// Deploy with cost controls
const deployment = await ck.deploy({
  model_id: 'ft-abc123',
  config: {
    max_instances: 5,
    min_instances: 1,
    scale_down_delay: 300,
    cost_limit: {
      daily: 100,
      monthly: 2000
    }
  }
});
\`\`\`

## Best Practices

### Training Strategy
- Start with smaller models
- Use transfer learning
- Implement early stopping
- Regular checkpoint saves

### Cost Control
- Set strict budgets
- Monitor continuously
- Use spot pricing
- Optimize dataset size

### Quality vs Cost
- Define success metrics
- Test incrementally
- Compare against baselines
- Document trade-offs`}
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

export const UsageAPIPage = () => (
  <DocumentationPage
    title="Usage API"
    description="Track AI usage programmatically"
    prevPage={{ path: '/api/authentication', label: 'Previous: Authentication' }}
    nextPage={{ path: '/api/analytics', label: 'Next: Analytics API' }}
  />
);

export const AnalyticsAPIPage = () => (
  <DocumentationPage
    title="Analytics API"
    description="Retrieve analytics data via API"
    prevPage={{ path: '/api/usage', label: 'Previous: Usage API' }}
    nextPage={{ path: '/api/projects', label: 'Next: Projects API' }}
  />
);

export const ProjectsAPIPage = () => (
  <DocumentationPage
    title="Projects API"
    description="Manage projects programmatically"
    prevPage={{ path: '/api/analytics', label: 'Previous: Analytics API' }}
    nextPage={{ path: '/api/optimization', label: 'Next: Optimization API' }}
  />
);

export const OptimizationAPIPage = () => (
  <DocumentationPage
    title="Optimization API"
    description="Access AI optimization features via API"
    prevPage={{ path: '/api/projects', label: 'Previous: Projects API' }}
    nextPage={{ path: '/api/webhooks', label: 'Next: Webhooks' }}
  />
);

export const WebhooksPage = () => (
  <DocumentationPage
    title="Webhooks"
    description="Real-time event notifications"
    prevPage={{ path: '/api/optimization', label: 'Previous: Optimization API' }}
    nextPage={{ path: '/api/rate-limits', label: 'Next: Rate Limits' }}
  />
);

export const RateLimitsPage = () => (
  <DocumentationPage
    title="Rate Limits"
    description="API usage limits and quotas"
    prevPage={{ path: '/api/webhooks', label: 'Previous: Webhooks' }}
  />
);

// Support Pages
export const FAQPage = () => (
  <DocumentationPage
    title="Frequently Asked Questions"
    description="Common questions about Cost Katana"
  />
);

export const SupportPage = () => (
  <DocumentationPage
    title="Support & Contact"
    description="Get help with Cost Katana"
  />
);
