# Module 9: Production Deployment

## Learning Objectives

By the end of this module, you will be able to:

1. Deploy AI applications to major cloud platforms (AWS, GCP, Azure)
2. Design architectures that scale with demand
3. Implement security best practices for AI APIs
4. Configure CI/CD pipelines for AI applications
5. Handle production concerns like secrets, logging, and reliability

---

## Introduction

Taking an AI application from development to production involves more than just deploying code. You're dealing with expensive API calls, variable latency, security-sensitive credentials, and workloads that can spike unpredictably.

This module provides production-tested patterns for deploying AI applications that are secure, scalable, and reliable. You'll learn cloud-specific deployments and universal best practices.

---

## 1. Architecture for Production

### Production Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        EDGE LAYER                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   CDN       │  │   WAF       │  │  DDoS       │            │
│  │  (Static)   │  │  (Filter)   │  │ Protection  │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY                                │
│  - Authentication          - Rate Limiting                     │
│  - Request Validation      - Request Routing                   │
│  - API Versioning          - Request/Response Logging          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                            │
│  ┌─────────────────────────────────────────────────────┐      │
│  │              Container Orchestration                 │      │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐             │      │
│  │  │ API Pod │  │ API Pod │  │ API Pod │  ← Auto-    │      │
│  │  │   (1)   │  │   (2)   │  │   (N)   │    scale    │      │
│  │  └─────────┘  └─────────┘  └─────────┘             │      │
│  └─────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌──────────────────┐ ┌──────────────┐ ┌──────────────────┐
│    CACHE LAYER   │ │  QUEUE LAYER │ │   DATA LAYER     │
│  ┌────────────┐  │ │ ┌──────────┐ │ │ ┌──────────────┐ │
│  │   Redis    │  │ │ │   SQS/   │ │ │ │  PostgreSQL  │ │
│  │  (Cache)   │  │ │ │  Pub/Sub │ │ │ │  (Primary)   │ │
│  └────────────┘  │ │ └──────────┘ │ │ └──────────────┘ │
│  ┌────────────┐  │ │              │ │ ┌──────────────┐ │
│  │  Vector DB │  │ │              │ │ │   S3/GCS     │ │
│  │ (Pinecone) │  │ │              │ │ │   (Blobs)    │ │
│  └────────────┘  │ │              │ │ └──────────────┘ │
└──────────────────┘ └──────────────┘ └──────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      LLM GATEWAY                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   OpenAI    │  │  Anthropic  │  │   Fallback  │            │
│  │   (Primary) │  │  (Primary)  │  │   Provider  │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

### Key Production Concerns

| Concern | Solution | Priority |
|---------|----------|----------|
| Secrets management | Cloud secrets manager, never in code | Critical |
| API key protection | Server-side only, rotate regularly | Critical |
| Rate limiting | Application + API gateway level | High |
| Scaling | Auto-scaling based on queue depth/latency | High |
| Fallback | Multi-provider with automatic failover | High |
| Logging | Structured logs, no PII in prompts | Medium |
| Cost controls | Budget alerts, usage quotas | Medium |

---

## 2. AWS Deployment

### Architecture: AWS Lambda + API Gateway

Best for: Variable traffic, pay-per-use, simple scaling

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ API Gateway  │────▶│   Lambda     │────▶│   OpenAI     │
│  (HTTP API)  │     │  (Function)  │     │   (API)      │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                     ┌──────┴──────┐
                     ▼             ▼
              ┌──────────┐  ┌──────────┐
              │ Secrets  │  │  ElastiC │
              │ Manager  │  │   ache   │
              └──────────┘  └──────────┘
```

### Lambda Function Example

```python
# lambda_function.py
import json
import os
import boto3
from openai import OpenAI

# Initialize clients outside handler for connection reuse
secrets_client = boto3.client('secretsmanager')

def get_api_key():
    """Retrieve API key from Secrets Manager."""
    response = secrets_client.get_secret_value(
        SecretId=os.environ['OPENAI_SECRET_ARN']
    )
    return json.loads(response['SecretString'])['api_key']

# Initialize OpenAI client with cached key
openai_client = None

def get_openai_client():
    global openai_client
    if openai_client is None:
        openai_client = OpenAI(api_key=get_api_key())
    return openai_client

def lambda_handler(event, context):
    """Main Lambda handler."""
    try:
        # Parse request
        body = json.loads(event.get('body', '{}'))
        prompt = body.get('prompt')

        if not prompt:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Prompt is required'})
            }

        # Get response from OpenAI
        client = get_openai_client()
        response = client.chat.completions.create(
            model='gpt-4o',
            messages=[
                {'role': 'system', 'content': 'You are a helpful assistant.'},
                {'role': 'user', 'content': prompt}
            ],
            max_tokens=1000
        )

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'response': response.choices[0].message.content,
                'usage': {
                    'input_tokens': response.usage.prompt_tokens,
                    'output_tokens': response.usage.completion_tokens
                }
            })
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal server error'})
        }
```

### Terraform/CloudFormation Setup

```yaml
# serverless.yml (Serverless Framework)
service: ai-api

provider:
  name: aws
  runtime: python3.11
  region: us-east-1
  timeout: 30  # AI calls can be slow
  memorySize: 512

  environment:
    OPENAI_SECRET_ARN: !Ref OpenAISecret

  iamRoleStatements:
    - Effect: Allow
      Action:
        - secretsmanager:GetSecretValue
      Resource: !Ref OpenAISecret

functions:
  generate:
    handler: lambda_function.lambda_handler
    events:
      - http:
          path: /generate
          method: post
          cors: true

resources:
  Resources:
    OpenAISecret:
      Type: AWS::SecretsManager::Secret
      Properties:
        Name: openai-api-key
        SecretString: '{"api_key": "your-key-here"}'
```

### ECS/Fargate for Streaming

Lambda has limitations for streaming; use ECS for long-running connections:

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## 3. GCP Deployment

### Architecture: Cloud Run

Best for: Container-based, automatic scaling, easy streaming

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Cloud Load   │────▶│  Cloud Run   │────▶│   OpenAI     │
│  Balancer    │     │ (Container)  │     │   (API)      │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                     ┌──────┴──────┐
                     ▼             ▼
              ┌──────────┐  ┌──────────┐
              │  Secret  │  │  Memory  │
              │ Manager  │  │  Store   │
              └──────────┘  └──────────┘
```

### Cloud Run Configuration

```yaml
# cloudbuild.yaml
steps:
  # Build the container
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'gcr.io/$PROJECT_ID/ai-api:$COMMIT_SHA'
      - '.'

  # Push to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'gcr.io/$PROJECT_ID/ai-api:$COMMIT_SHA'

  # Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'ai-api'
      - '--image=gcr.io/$PROJECT_ID/ai-api:$COMMIT_SHA'
      - '--region=us-central1'
      - '--platform=managed'
      - '--allow-unauthenticated'
      - '--set-secrets=OPENAI_API_KEY=openai-key:latest'
      - '--memory=1Gi'
      - '--timeout=300'
      - '--concurrency=80'
      - '--min-instances=1'
      - '--max-instances=100'

images:
  - 'gcr.io/$PROJECT_ID/ai-api:$COMMIT_SHA'
```

### FastAPI Application for Cloud Run

```python
# main.py
import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI()
client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])

class GenerateRequest(BaseModel):
    prompt: str
    stream: bool = False

@app.post("/generate")
async def generate(request: GenerateRequest):
    if request.stream:
        return StreamingResponse(
            stream_response(request.prompt),
            media_type="text/event-stream"
        )

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": request.prompt}],
        max_tokens=1000
    )

    return {"response": response.choices[0].message.content}

async def stream_response(prompt: str):
    """Generator for streaming responses."""
    stream = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        stream=True
    )

    for chunk in stream:
        content = chunk.choices[0].delta.content
        if content:
            yield f"data: {content}\n\n"

    yield "data: [DONE]\n\n"

@app.get("/health")
async def health():
    return {"status": "healthy"}
```

---

## 4. Azure Deployment

### Architecture: Azure Container Apps

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Azure Front  │────▶│  Container   │────▶│ Azure OpenAI │
│    Door      │     │    Apps      │     │   Service    │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                     ┌──────┴──────┐
                     ▼             ▼
              ┌──────────┐  ┌──────────┐
              │   Key    │  │  Azure   │
              │  Vault   │  │   Redis  │
              └──────────┘  └──────────┘
```

### Azure-Specific: Using Azure OpenAI

```python
# azure_openai_client.py
from openai import AzureOpenAI
import os

client = AzureOpenAI(
    azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"],
    api_key=os.environ["AZURE_OPENAI_KEY"],
    api_version="2024-02-15-preview"
)

def generate_response(prompt: str) -> str:
    """Generate using Azure OpenAI."""
    response = client.chat.completions.create(
        model="gpt-4o",  # Deployment name
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000
    )
    return response.choices[0].message.content
```

---

## 5. CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy AI Application

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install pytest pytest-asyncio

      - name: Run tests
        run: pytest tests/ -v
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'push'

    steps:
      - uses: actions/checkout@v4

      - name: Log in to Container Registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment: staging

    steps:
      - name: Deploy to staging
        run: |
          # Cloud-specific deployment command
          echo "Deploying to staging..."

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production

    steps:
      - name: Deploy to production
        run: |
          # Cloud-specific deployment command
          echo "Deploying to production..."
```

---

## 6. Security Best Practices

### API Key Management

```python
# NEVER do this
OPENAI_API_KEY = "sk-..."  # Hardcoded key

# Do this instead
import os
from functools import lru_cache

@lru_cache(maxsize=1)
def get_api_key():
    """Get API key from environment or secrets manager."""
    # First try environment (for local dev)
    key = os.environ.get('OPENAI_API_KEY')
    if key:
        return key

    # Then try cloud secrets manager
    import boto3
    client = boto3.client('secretsmanager')
    response = client.get_secret_value(SecretId='openai-api-key')
    return response['SecretString']
```

### Input Validation

```python
from pydantic import BaseModel, validator
from typing import Optional

class AIRequest(BaseModel):
    prompt: str
    max_tokens: Optional[int] = 1000
    temperature: Optional[float] = 0.7

    @validator('prompt')
    def validate_prompt(cls, v):
        if len(v) > 10000:
            raise ValueError('Prompt too long (max 10000 characters)')
        if len(v) < 1:
            raise ValueError('Prompt cannot be empty')
        # Check for injection attempts
        dangerous_patterns = ['<script', 'javascript:', 'data:']
        for pattern in dangerous_patterns:
            if pattern.lower() in v.lower():
                raise ValueError('Invalid content in prompt')
        return v

    @validator('max_tokens')
    def validate_max_tokens(cls, v):
        if v < 1 or v > 4000:
            raise ValueError('max_tokens must be between 1 and 4000')
        return v

    @validator('temperature')
    def validate_temperature(cls, v):
        if v < 0 or v > 2:
            raise ValueError('temperature must be between 0 and 2')
        return v
```

### Rate Limiting

```python
from fastapi import FastAPI, Request, HTTPException
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/generate")
@limiter.limit("10/minute")  # 10 requests per minute per IP
async def generate(request: Request, body: AIRequest):
    # Your implementation
    pass

# User-based rate limiting
from fastapi import Depends
from your_auth import get_current_user

def get_user_rate_key(request: Request) -> str:
    """Rate limit by user ID if authenticated."""
    user = get_current_user(request)
    if user:
        return f"user:{user.id}"
    return get_remote_address(request)

@app.post("/generate-auth")
@limiter.limit("100/hour", key_func=get_user_rate_key)
async def generate_authenticated(request: Request, body: AIRequest):
    pass
```

---

## 7. Reliability Patterns

### Multi-Provider Fallback

```python
from openai import OpenAI
from anthropic import Anthropic
import time

class ResilientAIClient:
    """AI client with fallback providers."""

    def __init__(self):
        self.openai = OpenAI()
        self.anthropic = Anthropic()
        self.providers = [
            ('openai', self._call_openai),
            ('anthropic', self._call_anthropic),
        ]

    async def generate(self, prompt: str, max_retries: int = 3) -> str:
        """Generate with automatic fallback."""
        last_error = None

        for provider_name, provider_func in self.providers:
            for attempt in range(max_retries):
                try:
                    return await provider_func(prompt)
                except Exception as e:
                    last_error = e
                    wait_time = 2 ** attempt
                    print(f"{provider_name} attempt {attempt + 1} failed: {e}")
                    time.sleep(wait_time)

            print(f"All retries exhausted for {provider_name}, trying next provider")

        raise Exception(f"All providers failed. Last error: {last_error}")

    async def _call_openai(self, prompt: str) -> str:
        response = self.openai.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

    async def _call_anthropic(self, prompt: str) -> str:
        response = self.anthropic.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1000,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
```

### Health Checks

```python
from fastapi import FastAPI
from datetime import datetime

app = FastAPI()

@app.get("/health")
async def health_check():
    """Basic health check."""
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@app.get("/health/ready")
async def readiness_check():
    """Readiness check - verify all dependencies."""
    checks = {}

    # Check database
    try:
        # db.execute("SELECT 1")
        checks['database'] = 'healthy'
    except Exception as e:
        checks['database'] = f'unhealthy: {str(e)}'

    # Check cache
    try:
        # redis.ping()
        checks['cache'] = 'healthy'
    except Exception as e:
        checks['cache'] = f'unhealthy: {str(e)}'

    # Check LLM API (lightweight)
    try:
        # Minimal API call or just verify credentials
        checks['llm_api'] = 'healthy'
    except Exception as e:
        checks['llm_api'] = f'unhealthy: {str(e)}'

    all_healthy = all(v == 'healthy' for v in checks.values())

    return {
        "status": "ready" if all_healthy else "not_ready",
        "checks": checks
    }
```

---

## Key Takeaways

1. **Never expose API keys** - Use secrets managers, server-side only
2. **Plan for failure** - Multi-provider fallback, circuit breakers
3. **Scale appropriately** - Consider Lambda for variable loads, containers for streaming
4. **Rate limit everything** - Protect both your API and your budget
5. **Health checks are essential** - Enable proper load balancer behavior

---

## Knowledge Check

Before proceeding, verify you can:

1. Explain the tradeoffs between Lambda and containers for AI workloads
2. Configure secrets management for API keys
3. Implement rate limiting at multiple levels
4. Set up a multi-provider fallback strategy
5. Design health checks for AI applications

---

## Next Module Preview

In **Module 10: Monitoring & Evaluation**, you'll learn to measure AI application quality, set up comprehensive logging, and implement A/B testing for prompt optimization.

---

*Module 9 of 12 | Building AI-Powered Applications | Duration: 4 hours*
