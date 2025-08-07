# Python SDK Integration

Integrate Cost Katana into your Python applications with our comprehensive SDK. Track AI usage, get optimization recommendations, and manage costs across all major AI providers.

![Python Integration](../../assets/python-integration.png)

## Overview

The **cost-katana** Python package provides a complete SDK for Cost Katana with:
- **🤖 Multi-provider support** - OpenAI, Anthropic, AWS Bedrock, Google AI, Cohere, and more
- **⚡ Automatic tracking** - Seamless integration with existing AI code
- **🔮 AI optimization** - Built-in prompt optimization and model recommendations
- **🚀 Gateway features** - Caching, retries, and failover support
- **📊 Real-time analytics** - Dashboard integration and reporting

---

## Installation

### Prerequisites
- **Python 3.8+** and pip
- **Cost Katana account** - Sign up at [costkatana.com](https://costkatana.com)
- **API Key** - Generate from your dashboard

### Install the Package
```bash
# Using pip
pip install cost-katana

# Using poetry
poetry add cost-katana

# Using conda
conda install -c conda-forge cost-katana
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
```python
import os
from cost_katana import CostKatana, AIProvider

# Initialize with providers
client = CostKatana(
    api_key=os.getenv('API_KEY'),
    project_id=os.getenv('PROJECT_ID'),
    providers={
        AIProvider.OPENAI: {
            'api_key': os.getenv('OPENAI_API_KEY')
        },
        AIProvider.ANTHROPIC: {
            'api_key': os.getenv('ANTHROPIC_API_KEY')
        }
    }
)

# Make AI requests with automatic tracking
result = client.chat(
    provider=AIProvider.OPENAI,
    model="gpt-4",
    messages=[
        {"role": "user", "content": "Explain machine learning in simple terms"}
    ]
)

print(f"AI Response: {result.response}")
print(f"Usage Stats: {result.usage}")
print(f"Cost: ${result.cost}")
```

### FastAPI Integration
```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from cost_katana import CostKatana, AIProvider
import os

app = FastAPI()

# Initialize Cost Katana client
client = CostKatana(
    api_key=os.getenv('API_KEY'),
    project_id=os.getenv('PROJECT_ID'),
    providers={
        AIProvider.OPENAI: {
            'api_key': os.getenv('OPENAI_API_KEY')
        }
    }
)

class ChatRequest(BaseModel):
    message: str
    user_id: str
    model: str = "gpt-3.5-turbo"

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        result = client.chat(
            provider=AIProvider.OPENAI,
            model=request.model,
            messages=[{"role": "user", "content": request.message}],
            metadata={
                'user_id': request.user_id,
                'endpoint': '/api/chat',
                'timestamp': datetime.utcnow().isoformat()
            }
        )
        
        return {
            "response": result.response,
            "usage": result.usage,
            "cost": result.cost
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## Advanced Features

### Multi-Provider Configuration
```python
from cost_katana import CostKatana, AIProvider

client = CostKatana(
    api_key=os.getenv('API_KEY'),
    project_id=os.getenv('PROJECT_ID'),
    base_url='https://cost-katana-backend.store/api',
    
    # Configure multiple providers
    providers={
        AIProvider.OPENAI: {
            'api_key': os.getenv('OPENAI_API_KEY'),
            'base_url': 'https://api.openai.com/v1'  # optional
        },
        AIProvider.ANTHROPIC: {
            'api_key': os.getenv('ANTHROPIC_API_KEY'),
            'base_url': 'https://api.anthropic.com'  # optional
        },
        AIProvider.AWS_BEDROCK: {
            'region': 'us-east-1',
            'access_key_id': os.getenv('AWS_ACCESS_KEY_ID'),
            'secret_access_key': os.getenv('AWS_SECRET_ACCESS_KEY')
        },
        AIProvider.GOOGLE_AI: {
            'api_key': os.getenv('GOOGLE_AI_API_KEY')
        }
    }
)
```

### Gateway Features
```python
client = CostKatana(
    api_key=os.getenv('API_KEY'),
    providers={...},
    
    # Gateway configuration
    gateway_config={
        # Caching for cost reduction
        'caching': {
            'enabled': True,
            'ttl': 3600,  # 1 hour
            'key_fields': ['model', 'messages']
        },
        
        # Retry logic for reliability
        'retries': {
            'enabled': True,
            'max_attempts': 3,
            'backoff': 'exponential'
        },
        
        # Failover between providers
        'failover': {
            'enabled': True,
            'providers': [AIProvider.OPENAI, AIProvider.ANTHROPIC],
            'strategy': 'round_robin'
        }
    }
)
```

### Optimization Features
```python
client = CostKatana(
    api_key=os.getenv('API_KEY'),
    providers={...},
    
    # AI-powered optimization
    optimization_config={
        # Automatic prompt optimization
        'enable_prompt_optimization': True,
        
        # Model recommendations
        'enable_model_suggestions': True,
        
        # Quality threshold (0.0 - 1.0)
        'quality_threshold': 0.9,
        
        # Cost vs quality balance
        'optimization_strategy': 'balanced'  # 'cost', 'quality', 'balanced'
    }
)
```

---

## API Methods

### Chat Completion
```python
# Basic chat
result = client.chat(
    provider=AIProvider.OPENAI,
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "What is Python?"}
    ],
    temperature=0.7,
    max_tokens=500
)

# With streaming
for chunk in client.chat_stream(
    provider=AIProvider.OPENAI,
    model="gpt-4",
    messages=[{"role": "user", "content": "Write a story"}],
    stream=True
):
    print(chunk.content, end='', flush=True)
```

### Text Completion
```python
result = client.complete(
    provider=AIProvider.OPENAI,
    model="gpt-3.5-turbo-instruct",
    prompt="The future of AI is",
    max_tokens=100,
    temperature=0.8
)

print(f"Completion: {result.completion}")
print(f"Usage: {result.usage}")
```

### Embeddings
```python
result = client.embed(
    provider=AIProvider.OPENAI,
    model="text-embedding-ada-002",
    input="Text to embed"
)

print(f"Embedding dimensions: {len(result.embedding)}")
print(f"Cost: ${result.cost}")
```

### Image Generation
```python
result = client.generate_image(
    provider=AIProvider.OPENAI,
    model="dall-e-3",
    prompt="A futuristic city skyline",
    size="1024x1024",
    quality="standard"
)

print(f"Image URL: {result.url}")
print(f"Cost: ${result.cost}")
```

---

## Usage Analytics

### Get Usage Statistics
```python
# Get current usage stats
stats = client.get_usage_stats(
    timeframe='month',  # 'day', 'week', 'month', 'year'
    project_id='optional-project-id'
)

print(f"Total Requests: {stats.total_requests}")
print(f"Total Cost: ${stats.total_cost}")
print(f"Average Cost per Request: ${stats.avg_cost_per_request}")
print(f"Top Models: {stats.top_models}")
```

### Get Optimization Recommendations
```python
recommendations = client.get_recommendations(
    limit=10,
    priority='high'  # 'low', 'medium', 'high'
)

for rec in recommendations:
    print(f"💡 {rec.title}")
    print(f"   Potential Savings: {rec.potential_savings.percentage}%")
    print(f"   Action: {rec.suggested_action}")
```

### Track Custom Events
```python
# Track custom usage events
client.track_usage(
    provider='custom-provider',
    model='custom-model',
    prompt_tokens=100,
    completion_tokens=150,
    cost=0.005,
    metadata={
        'feature': 'document-processing',
        'user_id': 'user_123',
        'session_id': 'session_456'
    }
)
```

---

## Error Handling

### Comprehensive Error Handling
```python
from cost_katana.exceptions import (
    CostKatanaError,
    ProviderError,
    RateLimitError,
    InvalidAPIKeyError
)

try:
    result = client.chat(
        provider=AIProvider.OPENAI,
        model="gpt-4",
        messages=[{"role": "user", "content": "Hello"}]
    )
except RateLimitError as e:
    print(f"Rate limited. Retry after: {e.retry_after} seconds")
    # Implement retry logic
except ProviderError as e:
    print(f"Provider error: {e.provider} - {e.message}")
    # Try different provider
except InvalidAPIKeyError as e:
    print(f"Invalid API key: {e.message}")
    # Check API key configuration
except CostKatanaError as e:
    print(f"Cost Katana API error: {e.message}")
    # Handle tracking failure
except Exception as e:
    print(f"Unexpected error: {e}")
```

### Retry with Exponential Backoff
```python
import time
import random

def chat_with_retry(client, messages, max_retries=3):
    for attempt in range(1, max_retries + 1):
        try:
            return client.chat(
                provider=AIProvider.OPENAI,
                model="gpt-4",
                messages=messages
            )
        except Exception as e:
            if attempt == max_retries:
                raise e
            
            # Exponential backoff with jitter
            delay = (2 ** attempt) + random.uniform(0, 1)
            print(f"Attempt {attempt} failed, retrying in {delay:.2f}s...")
            time.sleep(delay)
```

---

## Best Practices

### Performance Optimization
```python
import asyncio
from cost_katana import AsyncCostKatana

# 1. Use async client for high throughput
async_client = AsyncCostKatana(
    api_key=os.getenv('API_KEY'),
    providers={...}
)

# 2. Batch similar requests
async def process_batch(messages_list):
    tasks = [
        async_client.chat(
            provider=AIProvider.OPENAI,
            model="gpt-3.5-turbo",
            messages=messages
        )
        for messages in messages_list
    ]
    
    results = await asyncio.gather(*tasks, return_exceptions=True)
    return results

# 3. Connection pooling
client = CostKatana(
    api_key=os.getenv('API_KEY'),
    providers={...},
    http_config={
        'pool_connections': 10,
        'pool_maxsize': 20,
        'max_retries': 3
    }
)
```

### Cost Optimization
```python
# 1. Use appropriate models for tasks
def get_model_for_task(task_complexity):
    if task_complexity == 'simple':
        return "gpt-3.5-turbo"  # Cheaper for simple tasks
    elif task_complexity == 'complex':
        return "gpt-4"  # Better for complex reasoning
    else:
        return "gpt-3.5-turbo"

# Simple task
simple_result = client.chat(
    provider=AIProvider.OPENAI,
    model=get_model_for_task('simple'),
    messages=[{"role": "user", "content": "Translate: Hello"}]
)

# Complex task
complex_result = client.chat(
    provider=AIProvider.OPENAI,
    model=get_model_for_task('complex'),
    messages=[{"role": "user", "content": "Analyze this complex data..."}]
)

# 2. Set token limits
result = client.chat(
    provider=AIProvider.OPENAI,
    model="gpt-4",
    messages=[...],
    max_tokens=200  # Limit response length
)

# 3. Use caching for repeated queries
client = CostKatana(
    api_key=os.getenv('API_KEY'),
    providers={...},
    gateway_config={
        'caching': {
            'enabled': True,
            'ttl': 3600  # Cache for 1 hour
        }
    }
)
```

### Monitoring & Alerting
```python
# Set up usage monitoring
client = CostKatana(
    api_key=os.getenv('API_KEY'),
    providers={...},
    monitoring_config={
        # Alert when approaching budget
        'budget_alerts': {
            'enabled': True,
            'monthly_budget': 100,  # $100/month
            'alert_thresholds': [0.5, 0.8, 0.9]  # 50%, 80%, 90%
        },
        
        # Track performance metrics
        'metrics_tracking': {
            'enabled': True,
            'track_latency': True,
            'track_token_usage': True,
            'track_costs': True
        }
    }
)

# Custom monitoring with callbacks
def on_usage_tracked(data):
    print(f"Request cost: ${data['cost']}")
    
    # Send to your monitoring system
    if data['cost'] > 1.0:
        print(f"High cost request: ${data['cost']}")

def on_budget_warning(data):
    print(f"Budget alert: {data['percentage']}% used")
    # Send notification to team

client.set_callback('usage.tracked', on_usage_tracked)
client.set_callback('budget.warning', on_budget_warning)
```

---

## Framework Integrations

### Django Integration
```python
# settings.py
import os

COST_KATANA_CONFIG = {
    'api_key': os.getenv('API_KEY'),
    'project_id': os.getenv('PROJECT_ID'),
    'providers': {
        'openai': {
            'api_key': os.getenv('OPENAI_API_KEY')
        }
    }
}

# services.py
from django.conf import settings
from cost_katana import CostKatana, AIProvider

class AIService:
    def __init__(self):
        self.client = CostKatana(**settings.COST_KATANA_CONFIG)
    
    def chat(self, message, user_id=None):
        return self.client.chat(
            provider=AIProvider.OPENAI,
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": message}],
            metadata={'user_id': user_id}
        )

# views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

@csrf_exempt
@require_http_methods(["POST"])
def chat_view(request):
    data = json.loads(request.body)
    ai_service = AIService()
    
    result = ai_service.chat(
        message=data['message'],
        user_id=request.user.id if request.user.is_authenticated else None
    )
    
    return JsonResponse({
        'response': result.response,
        'cost': result.cost
    })
```

### Flask Integration
```python
from flask import Flask, request, jsonify
from cost_katana import CostKatana, AIProvider
import os

app = Flask(__name__)

# Initialize Cost Katana client
client = CostKatana(
    api_key=os.getenv('API_KEY'),
    project_id=os.getenv('PROJECT_ID'),
    providers={
        AIProvider.OPENAI: {
            'api_key': os.getenv('OPENAI_API_KEY')
        }
    }
)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    
    try:
        result = client.chat(
            provider=AIProvider.OPENAI,
            model=data.get('model', 'gpt-3.5-turbo'),
            messages=[{"role": "user", "content": data['message']}],
            metadata={
                'user_id': data.get('user_id'),
                'session_id': request.headers.get('X-Session-ID')
            }
        )
        
        return jsonify({
            'response': result.response,
            'usage': result.usage,
            'cost': result.cost
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
```

### Jupyter Notebook Integration
```python
# Install in Jupyter
# !pip install cost-katana

import os
from cost_katana import CostKatana, AIProvider
import pandas as pd

# Initialize client
client = CostKatana(
    api_key=os.getenv('API_KEY'),
    project_id='jupyter-analysis',
    providers={
        AIProvider.OPENAI: {
            'api_key': os.getenv('OPENAI_API_KEY')
        }
    }
)

# Analyze data with AI
def analyze_dataframe(df, question):
    """Analyze a DataFrame using AI with cost tracking."""
    
    # Convert DataFrame to string representation
    df_summary = df.describe().to_string()
    
    prompt = f"""
    Analyze this dataset and answer the question: {question}
    
    Dataset summary:
    {df_summary}
    
    Dataset shape: {df.shape}
    Columns: {list(df.columns)}
    """
    
    result = client.chat(
        provider=AIProvider.OPENAI,
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        metadata={
            'analysis_type': 'dataframe',
            'dataset_shape': str(df.shape),
            'question': question
        }
    )
    
    print(f"Analysis Cost: ${result.cost}")
    return result.response

# Example usage
df = pd.read_csv('data.csv')
analysis = analyze_dataframe(df, "What are the main trends in this data?")
print(analysis)

# Track costs over time
usage_stats = client.get_usage_stats(timeframe='week')
print(f"Weekly Analysis Cost: ${usage_stats.total_cost}")
```

---

## Testing

### Unit Testing with pytest
```python
import pytest
from unittest.mock import Mock, patch
from cost_katana import CostKatana, AIProvider

@pytest.fixture
def mock_client():
    with patch('cost_katana.CostKatana') as mock:
        mock_instance = Mock()
        mock.return_value = mock_instance
        mock_instance.chat.return_value = Mock(
            response='Mocked response',
            usage={'total_tokens': 100},
            cost=0.01
        )
        yield mock_instance

def test_chat_service(mock_client):
    # Test your service that uses Cost Katana
    result = mock_client.chat(
        provider=AIProvider.OPENAI,
        model='gpt-3.5-turbo',
        messages=[{'role': 'user', 'content': 'test'}]
    )
    
    assert result.response == 'Mocked response'
    assert result.cost == 0.01
    mock_client.chat.assert_called_once()

# Integration test with real API
@pytest.mark.integration
def test_real_api():
    client = CostKatana(
        api_key=os.getenv('API_KEY'),
        project_id='test-project',
        providers={
            AIProvider.OPENAI: {
                'api_key': os.getenv('OPENAI_API_KEY')
            }
        }
    )
    
    result = client.chat(
        provider=AIProvider.OPENAI,
        model='gpt-3.5-turbo',
        messages=[{'role': 'user', 'content': 'Hello'}]
    )
    
    assert result.response
    assert result.cost > 0
    assert result.usage['total_tokens'] > 0
```

### Load Testing
```python
import asyncio
import time
from cost_katana import AsyncCostKatana, AIProvider

async def load_test():
    client = AsyncCostKatana(
        api_key=os.getenv('API_KEY'),
        providers={
            AIProvider.OPENAI: {
                'api_key': os.getenv('OPENAI_API_KEY')
            }
        }
    )
    
    # Create 100 concurrent requests
    tasks = []
    for i in range(100):
        task = client.chat(
            provider=AIProvider.OPENAI,
            model='gpt-3.5-turbo',
            messages=[{'role': 'user', 'content': f'Test message {i}'}]
        )
        tasks.append(task)
    
    start_time = time.time()
    results = await asyncio.gather(*tasks, return_exceptions=True)
    end_time = time.time()
    
    successful = len([r for r in results if not isinstance(r, Exception)])
    failed = len(results) - successful
    total_cost = sum(r.cost for r in results if hasattr(r, 'cost'))
    
    print(f"Completed 100 requests in {end_time - start_time:.2f}s")
    print(f"Successful: {successful}, Failed: {failed}")
    print(f"Total cost: ${total_cost}")

# Run the load test
asyncio.run(load_test())
```

---

## Deployment

### Production Configuration
```python
# config.py
import os
from cost_katana import CostKatana, AIProvider

def create_client():
    return CostKatana(
        api_key=os.getenv('API_KEY'),
        project_id=os.getenv('PROJECT_ID'),
        base_url='https://cost-katana-backend.store/api',
        
        providers={
            AIProvider.OPENAI: {
                'api_key': os.getenv('OPENAI_API_KEY')
            },
            AIProvider.ANTHROPIC: {
                'api_key': os.getenv('ANTHROPIC_API_KEY')
            }
        },
        
        # Production settings
        timeout=30.0,  # 30 second timeout
        max_retries=3,
        
        # Monitoring
        monitoring_config={
            'enabled': True,
            'budget_alerts': {
                'enabled': True,
                'monthly_budget': float(os.getenv('MONTHLY_BUDGET', '1000'))
            }
        },
        
        # Security
        validate_ssl=True,
        user_agent='MyApp/1.0.0'
    )

# Singleton pattern for production
_client = None

def get_client():
    global _client
    if _client is None:
        _client = create_client()
    return _client
```

### Docker Deployment
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd --create-home --shell /bin/bash app
USER app

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8000/health')"

# Start application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables
```bash
# .env.production
ENVIRONMENT=production
API_KEY=ck_user_production_key
PROJECT_ID=prod_project_id
MONTHLY_BUDGET=1000

# AI Provider Keys
OPENAI_API_KEY=sk-prod-key
ANTHROPIC_API_KEY=sk-ant-prod-key

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Logging
LOG_LEVEL=INFO
LOG_FORMAT=json

# Monitoring
ENABLE_METRICS=true
METRICS_PORT=9090
```

---

## CLI Usage

The package also includes a CLI tool for quick operations:

```bash
# Track usage from command line
cost-katana track \
    --provider openai \
    --model gpt-3.5-turbo \
    --prompt "Hello world" \
    --cost 0.001

# Get usage statistics
cost-katana stats --timeframe month

# Get recommendations
cost-katana recommendations --limit 5

# Test API connection
cost-katana test-connection
```

---

## Troubleshooting

### Common Issues

#### Import Error
```bash
# Ensure package is installed
pip install cost-katana

# Check installation
python -c "import cost_katana; print(cost_katana.__version__)"
```

#### SSL Certificate Issues
```python
# Disable SSL verification for testing (not recommended for production)
client = CostKatana(
    api_key=os.getenv('API_KEY'),
    providers={...},
    http_config={
        'verify_ssl': False  # Only for testing
    }
)
```

#### Memory Usage
```python
# Monitor memory usage
import psutil
import os

def monitor_memory():
    process = psutil.Process(os.getpid())
    memory_mb = process.memory_info().rss / 1024 / 1024
    print(f"Memory usage: {memory_mb:.2f} MB")

# Call periodically
monitor_memory()
```

#### Connection Pool Issues
```python
# Adjust connection pool settings
client = CostKatana(
    api_key=os.getenv('API_KEY'),
    providers={...},
    http_config={
        'pool_connections': 10,
        'pool_maxsize': 20,
        'pool_block': False
    }
)
```

---

## Support & Resources

### Documentation
- **[GitHub Repository](https://github.com/Hypothesize-Tech/cost-katana-python)** - Source code and issues
- **[PyPI Package](https://pypi.org/project/cost-katana/)** - Package details and versions
- **[API Reference](../../api/README.md)** - Complete API documentation
- **[Examples Repository](https://github.com/Hypothesize-Tech/docs)** - Code examples

### Getting Help
- **📧 Email Support**: abdul@hypothesize.tech
- **🐛 Report Issues**: [GitHub Issues](https://github.com/Hypothesize-Tech/cost-katana-python/issues)
- **💬 Community**: [Discord](https://discord.gg/Wcwzw8wM)
- **📚 Guides**: [Integration Guides](../README.md)

### Contributing
We welcome contributions! See our [Contributing Guide](../../development/contributing.md) for details.

---

*Ready to optimize your Python AI applications? Install the package and start tracking!*

```bash
pip install cost-katana
```