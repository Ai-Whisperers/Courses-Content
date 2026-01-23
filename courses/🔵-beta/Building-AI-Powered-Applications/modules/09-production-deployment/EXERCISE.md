# Module 9 Lab: Deploying an AI Application to Production

## Lab Overview

**Duration:** 3-4 hours
**Difficulty:** Intermediate-Advanced
**Prerequisites:** Modules 1-8, Cloud account (AWS, GCP, or Azure)

In this lab, you'll deploy a complete AI application to a cloud platform with proper security, scaling, and reliability configurations.

---

## Learning Objectives

By completing this lab, you will:

1. Deploy an AI API to your chosen cloud platform
2. Configure secrets management for API keys
3. Implement rate limiting and security controls
4. Set up auto-scaling and health checks
5. Create a CI/CD pipeline for automated deployments

---

## Choose Your Deployment Path

Select ONE cloud platform for this lab:
- **Path A: AWS** (Lambda + API Gateway or ECS)
- **Path B: GCP** (Cloud Run)
- **Path C: Azure** (Container Apps)

All paths achieve the same outcome; choose based on your experience or target platform.

---

## Part 1: Application Setup (30 minutes)

### Task 1.1: Create the Application

Create a new project directory:

```bash
mkdir ai-production-app && cd ai-production-app
```

Create `requirements.txt`:
```
fastapi==0.109.0
uvicorn==0.27.0
openai==1.10.0
pydantic==2.5.3
python-dotenv==1.0.0
slowapi==0.1.9
structlog==24.1.0
```

Create `app/main.py`:

```python
import os
import time
from datetime import datetime
from typing import Optional

from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from openai import OpenAI
import structlog

# Configure structured logging
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer()
    ],
    wrapper_class=structlog.stdlib.BoundLogger,
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
)

logger = structlog.get_logger()

# Initialize app
app = FastAPI(
    title="AI Production API",
    version="1.0.0",
    description="Production-ready AI application"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("ALLOWED_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return {"error": "Rate limit exceeded", "detail": str(exc)}, 429

# TODO: Task 1.2 - Implement get_openai_client function
# Should retrieve API key from environment/secrets manager
def get_openai_client() -> OpenAI:
    """Get OpenAI client with proper key management."""
    # Your implementation here
    pass

# Request/Response models
class GenerateRequest(BaseModel):
    prompt: str
    max_tokens: Optional[int] = 1000
    temperature: Optional[float] = 0.7

    @validator('prompt')
    def validate_prompt(cls, v):
        if len(v) > 10000:
            raise ValueError('Prompt too long')
        if len(v) < 1:
            raise ValueError('Prompt cannot be empty')
        return v

class GenerateResponse(BaseModel):
    content: str
    model: str
    usage: dict
    latency_ms: int

# TODO: Task 1.3 - Implement the generate endpoint
@app.post("/generate", response_model=GenerateResponse)
@limiter.limit("20/minute")
async def generate(request: Request, body: GenerateRequest):
    """Generate AI response with full production handling."""
    # Your implementation here
    # 1. Log the request
    # 2. Call OpenAI API
    # 3. Calculate latency
    # 4. Log the response
    # 5. Return formatted response
    pass

# Health endpoints
@app.get("/health")
async def health():
    """Basic health check."""
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@app.get("/health/ready")
async def readiness():
    """Readiness check with dependency verification."""
    # TODO: Task 1.4 - Implement readiness check
    # Verify OpenAI API is accessible
    pass
```

### Task 1.2: Implement Secure API Key Retrieval

Complete the `get_openai_client` function to:
1. First check environment variable
2. If not found, try cloud secrets manager
3. Cache the client for reuse

### Task 1.3: Implement the Generate Endpoint

Complete the endpoint with:
1. Structured logging of requests
2. OpenAI API call with error handling
3. Latency measurement
4. Proper response formatting

### Task 1.4: Implement Readiness Check

Create a readiness check that verifies the OpenAI API is accessible.

---

## Part 2: Containerization (30 minutes)

### Task 2.1: Create Dockerfile

Create `Dockerfile`:

```dockerfile
# TODO: Complete this Dockerfile
# Requirements:
# 1. Use Python 3.11 slim image
# 2. Set working directory
# 3. Copy and install requirements
# 4. Copy application code
# 5. Expose port 8000
# 6. Run with uvicorn

FROM python:3.11-slim

# Your implementation here
```

### Task 2.2: Create Docker Compose for Local Testing

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - ALLOWED_ORIGINS=http://localhost:3000
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### Task 2.3: Test Locally

```bash
# Build and run
docker-compose up --build

# Test health endpoint
curl http://localhost:8000/health

# Test generate endpoint
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello, how are you?"}'
```

**Deliverable:** Screenshot showing successful local test.

---

## Part 3: Cloud Deployment (Choose ONE Path)

### Path A: AWS Deployment (60 minutes)

#### Task A.1: Create AWS Resources

Create `terraform/main.tf` (or use CloudFormation/SAM):

```hcl
# TODO: Complete Terraform configuration
# Resources needed:
# 1. ECR Repository
# 2. ECS Cluster
# 3. ECS Task Definition
# 4. ECS Service with ALB
# 5. Secrets Manager secret for API key
# 6. IAM roles and policies
# 7. CloudWatch Log Group

provider "aws" {
  region = "us-east-1"
}

# Your implementation here
```

#### Task A.2: Deploy to AWS

```bash
# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_URL
docker build -t ai-api .
docker tag ai-api:latest $ECR_URL/ai-api:latest
docker push $ECR_URL/ai-api:latest

# Apply Terraform
cd terraform
terraform init
terraform apply
```

#### Task A.3: Configure Auto-Scaling

Add auto-scaling configuration:
- Target tracking on CPU utilization (70%)
- Min instances: 1
- Max instances: 10

---

### Path B: GCP Deployment (60 minutes)

#### Task B.1: Configure GCP

Create `cloudbuild.yaml`:

```yaml
# TODO: Complete Cloud Build configuration
# Steps:
# 1. Build container
# 2. Push to Artifact Registry
# 3. Deploy to Cloud Run with:
#    - Secret for OPENAI_API_KEY
#    - Min instances: 1
#    - Max instances: 100
#    - 1GB memory
#    - 300s timeout

steps:
  # Your implementation here
```

#### Task B.2: Create Secret

```bash
# Create secret
echo -n "your-openai-key" | gcloud secrets create openai-key --data-file=-

# Grant access to Cloud Run
gcloud secrets add-iam-policy-binding openai-key \
  --member="serviceAccount:PROJECT-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

#### Task B.3: Deploy

```bash
# Submit build
gcloud builds submit --config=cloudbuild.yaml

# Verify deployment
gcloud run services describe ai-api --region=us-central1
```

---

### Path C: Azure Deployment (60 minutes)

#### Task C.1: Configure Azure Container Apps

Create `azure-deploy.yaml`:

```yaml
# TODO: Complete Azure deployment configuration
# Requirements:
# 1. Create Container App Environment
# 2. Create Container App with:
#    - Key Vault secret reference
#    - Ingress enabled
#    - Auto-scaling rules
```

#### Task C.2: Create Key Vault Secret

```bash
# Create Key Vault
az keyvault create --name ai-api-vault --resource-group myResourceGroup

# Add secret
az keyvault secret set --vault-name ai-api-vault --name openai-key --value "your-key"
```

#### Task C.3: Deploy

```bash
# Deploy Container App
az containerapp create \
  --name ai-api \
  --resource-group myResourceGroup \
  --environment myEnvironment \
  --image yourregistry.azurecr.io/ai-api:latest \
  --secrets openai-key=keyvault-ref \
  --env-vars OPENAI_API_KEY=secretref:openai-key
```

---

## Part 4: CI/CD Pipeline (45 minutes)

### Task 4.1: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy AI API

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

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
        run: pip install -r requirements.txt pytest httpx

      - name: Run tests
        run: pytest tests/ -v

  # TODO: Complete the build and deploy jobs
  # Requirements:
  # 1. Build job that creates and pushes Docker image
  # 2. Deploy-staging job that deploys to staging environment
  # 3. Deploy-production job that:
  #    - Requires staging success
  #    - Requires manual approval
  #    - Deploys to production

  build:
    needs: test
    runs-on: ubuntu-latest
    # Your implementation here

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment: staging
    # Your implementation here

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    # Your implementation here
```

### Task 4.2: Create Tests

Create `tests/test_api.py`:

```python
import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"

@pytest.mark.asyncio
async def test_generate_validation():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # Test empty prompt
        response = await client.post("/generate", json={"prompt": ""})
        assert response.status_code == 422

        # Test too long prompt
        response = await client.post("/generate", json={"prompt": "x" * 20000})
        assert response.status_code == 422

# TODO: Add more tests
# 1. Test successful generation (mock OpenAI)
# 2. Test rate limiting
# 3. Test readiness endpoint
```

---

## Part 5: Verification (30 minutes)

### Task 5.1: Functional Testing

Test your deployed API:

```bash
# Get your deployed URL
DEPLOYED_URL="https://your-deployed-url.com"

# Test health
curl $DEPLOYED_URL/health

# Test readiness
curl $DEPLOYED_URL/health/ready

# Test generation
curl -X POST $DEPLOYED_URL/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Explain cloud deployment in one sentence."}'

# Test rate limiting (run multiple times quickly)
for i in {1..25}; do
  curl -s -o /dev/null -w "%{http_code}\n" \
    -X POST $DEPLOYED_URL/generate \
    -H "Content-Type: application/json" \
    -d '{"prompt": "test"}'
done
```

### Task 5.2: Security Verification

Verify security configurations:

```bash
# Verify no API key exposure in logs
# Check cloud logging console

# Verify CORS
curl -I -X OPTIONS $DEPLOYED_URL/generate \
  -H "Origin: http://evil.com"

# Verify rate limiting is active
# Should see 429 responses after limit exceeded
```

### Task 5.3: Scaling Test

Trigger auto-scaling:

```bash
# Install hey or similar load testing tool
hey -n 1000 -c 50 -m POST \
  -H "Content-Type: application/json" \
  -d '{"prompt": "test prompt"}' \
  $DEPLOYED_URL/generate
```

**Deliverable:** Screenshot showing auto-scaling in action.

---

## Submission Requirements

### Deliverables

1. **Complete source code** including:
   - Application code (main.py)
   - Dockerfile and docker-compose.yml
   - Infrastructure as Code (Terraform/CloudFormation/YAML)
   - CI/CD workflow file
   - Tests

2. **Screenshots** showing:
   - Successful local test
   - Deployed endpoint responding
   - Health check passing
   - Auto-scaling configuration
   - CI/CD pipeline execution

3. **Brief writeup** (300-400 words):
   - Cloud platform chosen and why
   - Security measures implemented
   - Scaling configuration rationale
   - Challenges encountered

### Grading Rubric

| Criteria | Points |
|----------|--------|
| Application implementation | 15 |
| Docker configuration | 10 |
| Cloud deployment | 25 |
| Secrets management | 15 |
| CI/CD pipeline | 15 |
| Auto-scaling configuration | 10 |
| Documentation | 10 |
| **Total** | **100** |

### Grading Scale

- **A (90-100):** Fully functional deployment with all security measures
- **B (80-89):** Working deployment with minor gaps
- **C (70-79):** Basic deployment working, some features missing
- **D (60-69):** Partial deployment
- **F (<60):** Does not meet requirements

---

## Bonus Challenges

### Bonus 1: Multi-Region (+10 points)
Deploy to multiple regions with latency-based routing.

### Bonus 2: Canary Deployments (+10 points)
Implement canary deployment strategy with automatic rollback.

### Bonus 3: Custom Domain + SSL (+5 points)
Configure custom domain with SSL certificate.

---

## Cleanup

**Important:** Remember to clean up resources to avoid ongoing charges!

```bash
# AWS
terraform destroy

# GCP
gcloud run services delete ai-api
gcloud artifacts repositories delete ai-api

# Azure
az containerapp delete --name ai-api --resource-group myResourceGroup
az keyvault delete --name ai-api-vault
```

---

## Resources

- [AWS ECS Best Practices](https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/)
- [GCP Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Azure Container Apps Documentation](https://learn.microsoft.com/azure/container-apps/)
- [FastAPI Deployment Guide](https://fastapi.tiangolo.com/deployment/)

---

*Lab 9 of 12 | Building AI-Powered Applications | Duration: 3-4 hours*
