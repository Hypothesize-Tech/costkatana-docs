# Installation Guide

This comprehensive guide covers all installation methods for Cost Katana, from simple integrations to full self-hosted deployments.

## Quick Install Options

Choose the installation method that best fits your needs:

| Method | Best For | Time Required | Technical Level |
|--------|----------|---------------|-----------------|
| **[ChatGPT Custom GPT](#chatgpt-custom-gpt)** | ChatGPT users | 2 minutes | Beginner |
| **[Cloud Dashboard](#cloud-dashboard)** | Most users | 5 minutes | Beginner |
| **[SDK Integration](#sdk-integration)** | Developers | 10 minutes | Intermediate |
| **[Docker Deployment](#docker-deployment)** | Self-hosting | 30 minutes | Advanced |
| **[Kubernetes](#kubernetes-deployment)** | Production | 1 hour | Expert |

---

## ChatGPT Custom GPT

The easiest way to get started with Cost Katana.

### Prerequisites
- ChatGPT Plus or Team subscription
- Email address for account creation

### Installation Steps

1. **Install the Custom GPT**
   ```
   Visit: https://chatgpt.com/g/g-cost-katana-optimizer
   Click "Start Chat"
   ```

2. **Connect Your Account**
   The GPT will guide you through account setup:
   ```
   👋 Hi! I'm Cost Katana. Let's optimize your AI costs.
   
   🔗 I'll create a magic link for instant setup.
   What's your email address?
   ```

3. **Verify Setup**
   ```
   ✅ Account created successfully!
   🎯 You're now tracking ChatGPT usage with AI optimization tips.
   
   Try asking: "Show my usage stats"
   ```

### Verification
Ask the GPT: "Show my current usage" to confirm tracking is working.

---

## Cloud Dashboard

Access Cost Katana through our hosted web application.

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- Email address

### Installation Steps

1. **Create Account**
   ```bash
   # Visit the signup page
   https://costkatana.com/register
   
   # Or use our CLI for quick setup
   npm install -g cost-katana-cli
   cost-katana auth signup
   ```

2. **Verify Email**
   Check your email for the verification link and click it.

3. **Complete Profile**
   Fill in your profile information:
   - **Use Case**: Coding, Content Creation, Research, Business
   - **Technical Level**: Beginner, Intermediate, Advanced
   - **Monthly AI Budget**: Your expected spending

4. **Generate API Key**
   ```bash
   # In the dashboard: Settings → API Keys → Generate New Key
   # Or via CLI:
   cost-katana keys create --name "My First Key" --permissions write,read
   ```

5. **Test Connection**
   ```bash
   # Test your setup
   curl -H "X-API-Key: ck_user_your_key_here" \
        https://https://cost-katana-backend.store/api/health
   ```

### Dashboard Features
Once logged in, you'll have access to:
- **Real-time usage dashboard**
- **AI-powered optimization recommendations**
- **Project management tools**
- **Alert configuration**
- **Team collaboration features**

---

## SDK Integration

Integrate Cost Katana directly into your applications.

### Node.js/TypeScript

#### Prerequisites
- Node.js 16+ and npm
- Existing JavaScript/TypeScript project

#### Installation
```bash
# Install the SDK
npm install ai-cost-tracker

# Or with yarn
yarn add ai-cost-tracker
```

#### Basic Setup
```typescript
import AICostTracker, { AIProvider } from 'ai-cost-tracker';

// Initialize the client
const tracker = await AICostTracker.create({
  providers: [
    {
      provider: AIProvider.OpenAI,
      apiKey: process.env.OPENAI_API_KEY
    }
  ],
  apiKey: process.env.API_KEY,
  projectId: 'your-project-id' // optional
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

#### Advanced Configuration
```typescript
const tracker = await AICostTracker.create({
  providers: [
    {
      provider: AIProvider.OpenAI,
      apiKey: process.env.OPENAI_API_KEY
    }
  ],
  apiKey: process.env.API_KEY,
  baseURL: 'https://cost-katana-backend.store/api', // optional
  timeout: 10000, // optional
  retries: 3, // optional
  optimization: {
    enablePromptOptimization: true,
    enableModelSuggestions: true,
    enableCaching: true,
    qualityThreshold: 0.9 // maintain 90% quality
  }
});
```

### Python

#### Prerequisites
- Python 3.8+ and pip
- Existing Python project

#### Installation
```bash
# Install the SDK
pip install cost-katana

# Or with poetry
poetry add cost-katana
```

#### Basic Setup
```python
from cost_katana import CostKatana
import openai

# Initialize the client
client = CostKatana(
    api_key=os.getenv('API_KEY'),
    project_id='your-project-id'  # optional
)

# Track OpenAI usage
openai.api_key = os.getenv('OPENAI_API_KEY')

@client.track
def get_completion(prompt):
    return openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

# Use the tracked function
response = get_completion("Hello, world!")
print(f"Response: {response['choices'][0]['message']['content']}")
print(f"Cost: ${response['cost']}")
```

#### Advanced Configuration
```python
client = CostKatana(
    api_key=os.getenv('API_KEY'),
    base_url='https://https://cost-katana-backend.store',  # optional
    timeout=10.0,  # optional
    max_retries=3,  # optional
    optimization_config={
        'enable_prompt_optimization': True,
        'enable_model_suggestions': True,
        'enable_caching': True,
        'quality_threshold': 0.9
    }
)
```

---

## Docker Deployment

Self-host Cost Katana using Docker for maximum control.

### Prerequisites
- Docker 20.0+ and Docker Compose
- 4GB+ RAM, 20GB+ storage
- Domain name (for HTTPS)

### Quick Start
```bash
# Clone the repository
git clone https://github.com/cost-katana/self-hosted.git
cd cost-katana-self-hosted

# Copy environment template
cp .env.example .env

# Edit configuration
nano .env
```

### Environment Configuration
```bash
# .env file
# Database
MONGODB_URI=mongodb://mongo:27017/costkatana
REDIS_URL=redis://redis:6379

# Security
JWT_SECRET=your-super-secure-jwt-secret-min-32-chars
ENCRYPTION_KEY=your-32-char-encryption-key-here

# AI Features (optional but recommended)
AWS_ACCESS_KEY_ID=your-bedrock-access-key
AWS_SECRET_ACCESS_KEY=your-bedrock-secret-key
AWS_REGION=us-east-1

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Domain
DOMAIN=costkatana.yourdomain.com
SSL_EMAIL=admin@yourdomain.com
```

### Docker Compose Setup
```yaml
# docker-compose.yml
version: '3.8'

services:
  # Frontend
  frontend:
    image: costkatana/frontend:latest
    ports:
      - "80:80"
      - "443:443"
    environment:
      - REACT_APP_API_URL=https://api.${DOMAIN}
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - certbot_certs:/etc/letsencrypt
    depends_on:
      - backend

  # Backend API
  backend:
    image: costkatana/backend:latest
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
      - REDIS_URL=${REDIS_URL}
      - JWT_SECRET=${JWT_SECRET}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
    depends_on:
      - mongo
      - redis

  # Database
  mongo:
    image: mongo:6.0
    volumes:
      - mongo_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD}

  # Cache
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  # SSL Certificates
  certbot:
    image: certbot/certbot
    volumes:
      - certbot_certs:/etc/letsencrypt
      - certbot_www:/var/www/certbot
    command: certonly --webroot -w /var/www/certbot --email ${SSL_EMAIL} --agree-tos --no-eff-email -d ${DOMAIN}

volumes:
  mongo_data:
  redis_data:
  certbot_certs:
  certbot_www:
```

### Deployment
```bash
# Start the services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend

# Create first admin user
docker-compose exec backend npm run create-admin
```

### Post-Deployment Setup
1. **Access the dashboard**: `https://costkatana.yourdomain.com`
2. **Create admin account** using the credentials from the setup
3. **Configure integrations** in the admin panel
4. **Set up monitoring** with health checks

---

## Kubernetes Deployment

Production-ready Kubernetes deployment for high availability.

### Prerequisites
- Kubernetes 1.20+ cluster
- kubectl configured
- Helm 3.0+ (optional but recommended)
- Ingress controller (nginx, traefik, etc.)

### Helm Installation (Recommended)
```bash
# Add Cost Katana Helm repository
helm repo add cost-katana https://charts.costkatana.com
helm repo update

# Install with default values
helm install cost-katana cost-katana/cost-katana \
  --namespace cost-katana \
  --create-namespace

# Or with custom values
helm install cost-katana cost-katana/cost-katana \
  --namespace cost-katana \
  --create-namespace \
  --values values.yaml
```

### Custom Values (values.yaml)
```yaml
# values.yaml
replicaCount: 3

image:
  repository: costkatana/backend
  tag: "latest"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: true
  className: "nginx"
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
  hosts:
    - host: costkatana.yourdomain.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: costkatana-tls
      hosts:
        - costkatana.yourdomain.com

mongodb:
  enabled: true
  auth:
    enabled: true
    rootUser: admin
    rootPassword: "secure-password"
  persistence:
    enabled: true
    size: 20Gi

redis:
  enabled: true
  auth:
    enabled: false
  persistence:
    enabled: true
    size: 5Gi

env:
  JWT_SECRET: "your-super-secure-jwt-secret"
  AWS_ACCESS_KEY_ID: "your-access-key"
  AWS_SECRET_ACCESS_KEY: "your-secret-key"

resources:
  limits:
    cpu: 1000m
    memory: 2Gi
  requests:
    cpu: 500m
    memory: 1Gi

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
```

### Manual Kubernetes Deployment
```bash
# Create namespace
kubectl create namespace cost-katana

# Apply configurations
kubectl apply -f k8s/ -n cost-katana

# Check deployment
kubectl get pods -n cost-katana
kubectl get services -n cost-katana
kubectl get ingress -n cost-katana
```

---

## Environment Variables Reference

### Required Variables
```bash
# API Configuration
API_KEY=ck_user_your_key_here
PROJECT_ID=your_project_id

# Database (for self-hosted)
MONGODB_URI=mongodb://localhost:27017/costkatana
REDIS_URL=redis://localhost:6379

# Security (for self-hosted)
JWT_SECRET=your-super-secure-jwt-secret-min-32-chars
ENCRYPTION_KEY=your-32-char-encryption-key-here
```

### Optional Variables
```bash
# AI Features
AWS_ACCESS_KEY_ID=your-bedrock-access-key
AWS_SECRET_ACCESS_KEY=your-bedrock-secret-key
AWS_REGION=us-east-1

# Email Notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Advanced Configuration
LOG_LEVEL=info
API_TIMEOUT=30000
MAX_RETRIES=3
ENABLE_ANALYTICS=true
```

---

## Verification & Testing

### Health Check
```bash
# Check API health
curl https://cost-katana-backend.store/api/health

# Expected response
{
  "status": "healthy",
  "version": "2.0.0",
  "services": {
    "database": "connected",
    "redis": "connected",
    "ai": "available"
  }
}
```

### Test Tracking
```bash
# Test usage tracking
curl -X POST "https://cost-katana-backend.store/api/usage/track" \
  -H "X-API-Key: ck_user_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "openai",
    "model": "gpt-3.5-turbo",
    "promptTokens": 10,
    "completionTokens": 15,
    "cost": 0.0001
  }'
```

### Dashboard Access
1. Open your browser to the dashboard URL
2. Log in with your credentials
3. Verify you can see the test usage data
4. Check that AI recommendations appear (may take a few minutes)

---

## Troubleshooting

### Common Installation Issues

#### "API Key Invalid" Error
```bash
# Check API key format
echo $API_KEY
# Should start with ck_user_ or ck_test_

# Regenerate key if needed
cost-katana keys create --name "New Key"
```

#### Database Connection Failed
```bash
# Check MongoDB connection
docker-compose logs mongo

# Test connection manually
mongosh $MONGODB_URI
```

#### SSL Certificate Issues
```bash
# Check certificate status
docker-compose logs certbot

# Renew certificates
docker-compose exec certbot certbot renew
```

#### Permission Denied Errors
```bash
# Fix file permissions
sudo chown -R $USER:$USER ./cost-katana-self-hosted
chmod +x scripts/*.sh
```

### Performance Issues

#### Slow API Responses
```bash
# Check resource usage
docker stats

# Scale backend replicas
docker-compose up -d --scale backend=3
```

#### High Memory Usage
```bash
# Monitor memory usage
docker-compose exec backend node --max-old-space-size=2048 dist/server.js
```

### Getting Help

#### Support Channels
- 📧 **Installation Support**: install@costkatana.com
- 💬 **Discord**: [#installation-help](https://discord.gg/Wcwzw8wM)
- 📖 **Documentation**: [Troubleshooting Guide](../guides/troubleshooting.md)
- 🎥 **Video Guide**: [Installation Walkthrough](https://youtube.com/costkatana)

#### Logs and Debugging
```bash
# Backend logs
docker-compose logs -f backend

# Frontend logs
docker-compose logs -f frontend

# Database logs
docker-compose logs -f mongo

# Enable debug mode
export DEBUG=cost-katana:*
npm start
```

---

## Next Steps

After successful installation:

1. **[Complete the Quick Start Guide](./quick-start.md)** - Set up your first integration
2. **[Explore Features](../features/README.md)** - Learn about optimization capabilities
3. **[Configure Integrations](../integrations/README.md)** - Connect your AI providers
4. **[Set Up Alerts](../features/alerts.md)** - Configure proactive monitoring
5. **[Join the Community](https://discord.gg/Wcwzw8wM)** - Get help and share tips

---

*Need help with installation? Our team is here to help at install@costkatana.com*