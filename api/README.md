# API Reference

The Cost Katana API provides programmatic access to all platform features, allowing you to integrate AI cost optimization into your applications, workflows, and automation scripts.

## Base URL

**Production**: `https://cost-katana-backend.store/api`  

## Authentication

All API requests require authentication using either JWT tokens or API keys.

### JWT Authentication (Recommended)
```http
Authorization: Bearer <jwt_token>
```

### API Key Authentication
```http
X-API-Key: ck_user_<userId>_<random>
```

[**→ Learn more about authentication**](./authentication.md)

---

## Quick Start

### 1. Get Your API Key
Generate an API key from your dashboard:
```bash
# Using our CLI
cost-katana auth login
cost-katana keys create --name "My App" --permissions write,read
```

### 2. Make Your First Request
```bash
curl -X GET "https://cost-katana-backend.store/api/usage/summary" \
  -H "X-API-Key: ck_user_your_key_here"
```

### 3. Track AI Usage
```bash
curl -X POST "https://cost-katana-backend.store/api/usage/track" \
  -H "X-API-Key: ck_user_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "openai",
    "model": "gpt-4",
    "promptTokens": 100,
    "completionTokens": 150,
    "cost": 0.0045
  }'
```

---

## Core Endpoints

### 📊 Usage Tracking
Monitor and track AI usage across all providers
- **[POST /usage/track](./usage.md#track-usage)** - Track individual AI requests
- **[GET /usage/summary](./usage.md#get-usage-summary)** - Get usage summaries
- **[GET /usage/requests](./usage.md#get-requests)** - List detailed request history

### 📈 Analytics
Retrieve comprehensive analytics and insights
- **[GET /analytics/overview](./analytics.md#overview)** - Dashboard analytics
- **[GET /analytics/trends](./analytics.md#trends)** - Usage trends and forecasts
- **[GET /analytics/costs](./analytics.md#costs)** - Detailed cost breakdowns

### 🤖 AI Optimization
Access AI-powered optimization features
- **[POST /optimization/analyze](./optimization.md#analyze)** - Analyze usage patterns
- **[GET /optimization/recommendations](./optimization.md#recommendations)** - Get AI recommendations
- **[POST /optimization/apply](./optimization.md#apply)** - Apply optimizations

### 📁 Projects
Manage projects and organize usage
- **[GET /projects](./projects.md#list-projects)** - List all projects
- **[POST /projects](./projects.md#create-project)** - Create new project
- **[PUT /projects/:id](./projects.md#update-project)** - Update project settings

### 🚨 Alerts
Configure and manage alerts
- **[GET /alerts](./alerts.md#list-alerts)** - List active alerts
- **[POST /alerts](./alerts.md#create-alert)** - Create new alert
- **[PUT /alerts/:id](./alerts.md#update-alert)** - Update alert settings

---

## SDKs and Libraries

### Official SDKs

#### Node.js
```bash
npm install ai-cost-tracker
```
```javascript
import AICostTracker from 'ai-cost-tracker';

const client = await AICostTracker.create({
  apiKey: 'ck_user_your_key_here'
});

const usage = await client.trackUsage({
  provider: 'openai',
  model: 'gpt-4',
  cost: 0.0045
});
```

#### Python
```bash
pip install cost-katana
```
```python
from cost_katana import CostKatana

client = CostKatana(api_key='ck_user_your_key_here')

usage = client.usage.track(
    provider='openai',
    model='gpt-4',
    cost=0.0045
)
```

#### Go
```bash
go get github.com/cost-katana/go-sdk
```
```go
import "github.com/cost-katana/go-sdk"

client := costkatana.New("ck_user_your_key_here")
usage, err := client.Usage.Track(&costkatana.UsageRequest{
    Provider: "openai",
    Model:    "gpt-4",
    Cost:     0.0045,
})
```
---

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "requestId": "req_123456789",
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "2.0"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or expired",
    "details": "Please check your API key and ensure it has the required permissions",
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_123456789"
  }
}
```

---

## Rate Limits

API rate limits vary by plan and endpoint type:

| Plan | Requests/Hour | AI Calls/Hour | Burst Limit |
|------|---------------|---------------|-------------|
| **Free** | 1,000 | 100 | 50 |
| **Pro** | 10,000 | 1,000 | 200 |
| **Enterprise** | 100,000 | 10,000 | 1,000 |

### Rate Limit Headers
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 945
X-RateLimit-Reset: 1642234567
X-RateLimit-Retry-After: 3600
```

[**→ Learn more about rate limits**](./rate-limits.md)

---

## Webhooks

Receive real-time notifications about important events:

### Supported Events
- **usage.tracked** - New usage recorded
- **alert.triggered** - Alert threshold reached
- **optimization.available** - New optimization recommendation
- **budget.warning** - Budget limit approaching

### Webhook Setup
```bash
curl -X POST "https://cost-katana-backend.store/api/webhooks" \
  -H "X-API-Key: ck_user_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-app.com/webhooks/cost-katana",
    "events": ["usage.tracked", "alert.triggered"],
    "secret": "your_webhook_secret"
  }'
```

[**→ Learn more about webhooks**](./webhooks.md)

---

## Error Codes

Common API error codes and their meanings:

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_API_KEY` | 401 | API key is invalid or expired |
| `INSUFFICIENT_PERMISSIONS` | 403 | API key lacks required permissions |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `RESOURCE_NOT_FOUND` | 404 | Requested resource not found |
| `INTERNAL_ERROR` | 500 | Internal server error |

---

## Pagination

Endpoints that return lists support pagination:

### Request Parameters
```bash
curl "https://api.costkatana.com/api/usage/requests?page=2&limit=50"
```

### Response Format
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 50,
    "total": 1247,
    "pages": 25,
    "hasNext": true,
    "hasPrev": true
  }
}
```

---

## API Versioning

The API uses versioning to ensure backward compatibility:

### Version Header
```http
X-API-Version: 2.0
```

### Supported Versions
- **v2.0** (Current) - Full AI-powered features
- **v1.0** (Deprecated) - Basic tracking only

---

## Testing

### Sandbox Environment
Test your integration without affecting production data:

**Base URL**: `https://sandbox-api.costkatana.com/api`

### Test API Keys
Sandbox API keys start with `ck_test_` and only work in the sandbox environment.

---

## Best Practices

### Performance
- **Use pagination** for large datasets
- **Cache responses** when appropriate
- **Batch requests** when possible
- **Use compression** (gzip) for large payloads

### Security
- **Keep API keys secure** and rotate regularly
- **Use HTTPS** for all requests
- **Validate webhook signatures** for security
- **Implement proper error handling**

### Reliability
- **Implement retry logic** with exponential backoff
- **Handle rate limits** gracefully
- **Monitor API status** at [status.costkatana.com](https://status.costkatana.com)
- **Use idempotency keys** for critical operations

---

## Examples

### Track OpenAI Usage
```javascript
const response = await fetch('https://cost-katana-backend.store/api/usage/track', {
  method: 'POST',
  headers: {
    'X-API-Key': 'ck_user_your_key_here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    provider: 'openai',
    model: 'gpt-4',
    prompt: 'What is machine learning?',
    response: 'Machine learning is...',
    promptTokens: 5,
    completionTokens: 20,
    totalTokens: 25,
    cost: 0.0005,
    metadata: {
      userId: 'user_123',
      projectId: 'project_456'
    }
  })
});

const data = await response.json();
console.log('Usage tracked:', data);
```

### Get AI Recommendations
```python
import requests

response = requests.get(
    'https://cost-katana-backend.store/api/optimization/recommendations',
    headers={'X-API-Key': 'ck_user_your_key_here'},
    params={'limit': 10, 'priority': 'high'}
)

recommendations = response.json()
for rec in recommendations['data']:
    print(f"💡 {rec['title']}: {rec['potentialSavings']['percentage']}% savings")
```

### Set Up Budget Alert
```bash
curl -X POST "https://cost-katana-backend.store/api/alerts" \
  -H "X-API-Key: ck_user_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Monthly Budget Alert",
    "type": "budget",
    "threshold": 80,
    "condition": "percentage",
    "actions": [
      {
        "type": "email",
        "target": "admin@company.com"
      },
      {
        "type": "webhook",
        "target": "https://your-app.com/alerts"
      }
    ]
  }'
```

---

## Support

### Documentation
- **[API Guides](../guides/api-integration.md)** - Detailed integration guides
- **[Code Examples](https://github.com/cost-katana/examples)** - Sample implementations
- **[Postman Collection](https://www.postman.com/cost-katana/workspace/cost-katana-api)** - Ready-to-use API collection

### Community
- **[Discord](https://discord.gg/costkatana)** - Chat with developers and our team
- **[GitHub Discussions](https://github.com/cost-katana/api/discussions)** - Technical discussions
- **[Stack Overflow](https://stackoverflow.com/questions/tagged/cost-katana)** - Q&A with the community

### Direct Support
- **📧 API Support**: abdul@hypothesize.tech
- **🐛 Backend Issues**: [GitHub Issues](https://github.com/Hypothesize-Tech/ai-cost-optimizer-backend/issues)
- **🐛 Core Issues**: [GitHub Issues](https://github.com/Hypothesize-Tech/ai-cost-optimizer-core/issues)
- **💡 Feature Requests**: [Backend Issues](https://github.com/Hypothesize-Tech/ai-cost-optimizer-backend/issues)

---

*Ready to start building? Check out our [Quick Start Guide](../getting-started/quick-start.md) or explore specific [API endpoints](./usage.md).*