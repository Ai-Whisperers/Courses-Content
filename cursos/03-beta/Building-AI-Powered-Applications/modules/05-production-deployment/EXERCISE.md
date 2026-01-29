# Module 5: Production Deployment - Hands-On Exercise

## Overview

**Duration:** 120 minutes  
**Difficulty:** Advanced  
**Prerequisites:** Modules 1-4 completed

In this exercise, you'll deploy a production-ready AI application with:
- FastAPI REST API
- Authentication and rate limiting
- Caching for cost optimization
- Monitoring and logging
- Docker containerization
- Cloud deployment

By the end, you'll have a live, production-grade AI API deployed to the cloud.

---

## Learning Objectives

✅ Build production REST APIs with FastAPI  
✅ Implement authentication and authorization  
✅ Add rate limiting and caching  
✅ Set up logging and monitoring  
✅ Containerize with Docker  
✅ Deploy to cloud platform

---

## Setup

### 1. Environment Preparation

```bash
mkdir ai-api-production
cd ai-api-production

python -m venv venv
venv\Scripts\activate  # Windows

pip install fastapi uvicorn python-jose python-multipart slowapi redis
```

### 2. Project Structure

```
ai-api-production/
├── .env
├── .dockerignore
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── main.py
├── auth.py
├── models.py
├── config.py
└── README.md
```

---

## Part 1: Create Production API (30 minutes)

### Goal
Build a FastAPI application with proper structure and endpoints.

### Requirements

**1.1 Basic API Structure**

Create `main.py` with:
- FastAPI app with title, version, description
- Health check endpoint
- CORS middleware
- Request logging middleware
- Error handling

**Expected endpoints:**
```
GET  /              - API information
GET  /health        - Health check
POST /chat          - Chat with AI
POST /summarize     - Summarize text
GET  /docs          - Auto-generated API docs
```

**1.2 Request/Response Models**

Create `models.py` with Pydantic models:
- `ChatRequest`: message (str), temperature (float, default 0.7)
- `ChatResponse`: response (str), tokens_used (int), cached (bool)
- `SummarizeRequest`: text (str, min 10, max 5000), length (enum: short/medium/long)
- `SummarizeResponse`: summary (str), original_length (int), summary_length (int)

**1.3 AI Endpoints**

Implement two working endpoints:
1. `/chat` - Conversational AI
2. `/summarize` - Text summarization

Both should:
- Use LangChain
- Handle errors gracefully
- Return structured responses
- Log requests

**1.4 Middleware**

Add middleware for:
- Request timing (add X-Process-Time header)
- Request logging (log all requests)
- CORS (allow all origins for now)

### Testing

Test with:
```bash
# Start server
uvicorn main:app --reload

# Test endpoints
curl http://localhost:8000/health
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

**Deliverable:** Working FastAPI application with 2 AI endpoints

---

## Part 2: Add Authentication & Rate Limiting (30 minutes)

### Goal
Secure your API with authentication and prevent abuse with rate limiting.

### Requirements

**2.1 API Key Authentication**

Create `auth.py` with:
- API key verification function
- Support multiple API keys (stored in dict/database)
- Secure dependency injection
- Clear error messages

**API keys to support:**
```python
API_KEYS = {
    "dev_key_123": {"name": "Development", "tier": "free"},
    "prod_key_456": {"name": "Production", "tier": "premium"}
}
```

**2.2 Protect Endpoints**

Add authentication to:
- `/chat` endpoint (require API key)
- `/summarize` endpoint (require API key)
- Keep `/health` and `/docs` public

**Usage:**
```bash
curl -H "X-API-Key: dev_key_123" \
  -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

**2.3 Rate Limiting**

Implement rate limiting:
- Free tier: 5 requests/minute
- Premium tier: 20 requests/minute
- Return 429 status when exceeded
- Include rate limit headers in response

**Rate limit headers:**
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 1642534567
```

**2.4 Rate Limiter Class**

Create flexible `RateLimiter` class:
- Track requests per API key
- Configurable limits per tier
- Automatic cleanup of old requests
- Thread-safe implementation

### Testing

Test rate limiting:
```bash
# Should succeed first 5 times
for i in {1..5}; do
  curl -H "X-API-Key: dev_key_123" http://localhost:8000/chat
done

# Should fail (429)
curl -H "X-API-Key: dev_key_123" http://localhost:8000/chat
```

**Deliverable:** Authenticated, rate-limited API

---

## Part 3: Add Caching & Monitoring (30 minutes)

### Goal
Optimize performance with caching and add comprehensive monitoring.

### Requirements

**3.1 In-Memory Cache**

Implement caching for:
- Chat responses (cache identical messages)
- Summarization results
- Cache TTL: 1 hour
- Cache hit/miss tracking

**Cache key generation:**
```python
def get_cache_key(request_data: dict) -> str:
    """Generate consistent cache key"""
    # Sort keys for consistency
    # Hash for brevity
    pass
```

**3.2 Cache Statistics**

Add `/stats` endpoint showing:
- Total requests
- Cache hits/misses
- Cache hit rate
- Total API keys
- Requests per key

**Example response:**
```json
{
  "total_requests": 1523,
  "cache_hits": 892,
  "cache_misses": 631,
  "cache_hit_rate": 0.586,
  "total_api_keys": 2,
  "requests_by_key": {
    "dev_key_123": 1200,
    "prod_key_456": 323
  }
}
```

**3.3 Request Logging**

Enhance logging to include:
- Request ID (UUID)
- API key used
- Endpoint called
- Response time
- Cache hit/miss
- Error details (if any)

**Log format (JSON):**
```json
{
  "timestamp": "2026-01-17T13:45:00Z",
  "request_id": "abc-123",
  "api_key": "dev_***_123",
  "endpoint": "/chat",
  "method": "POST",
  "status_code": 200,
  "response_time_ms": 234,
  "cache_hit": true
}
```

**3.4 Enhanced Health Check**

Update `/health` endpoint to check:
- API status (up/down)
- LLM connectivity
- Cache status
- Response time check
- Overall health score

**Example response:**
```json
{
  "status": "healthy",
  "checks": {
    "api": "healthy",
    "llm": "healthy",
    "cache": "healthy"
  },
  "response_time_ms": 12
}
```

### Testing

Verify caching:
```bash
# First request (cache miss)
curl -H "X-API-Key: dev_key_123" -X POST http://localhost:8000/chat \
  -d '{"message": "What is Python?"}' \
  -w "\nTime: %{time_total}s\n"

# Second request (cache hit - should be faster)
curl -H "X-API-Key: dev_key_123" -X POST http://localhost:8000/chat \
  -d '{"message": "What is Python?"}' \
  -w "\nTime: %{time_total}s\n"

# Check stats
curl http://localhost:8000/stats
```

**Deliverable:** Cached, monitored API with statistics

---

## Part 4: Dockerize & Deploy (30 minutes)

### Goal
Containerize your application and deploy to a cloud platform.

### Requirements

**4.1 Docker Configuration**

Create `Dockerfile`:
- Use Python 3.11 slim base image
- Copy requirements and install dependencies
- Copy application code
- Expose port 8000
- Set CMD to run uvicorn

**Best practices:**
- Multi-stage build (optional)
- Don't copy unnecessary files
- Use .dockerignore
- Run as non-root user

**4.2 Docker Compose**

Create `docker-compose.yml` with:
- API service (your application)
- Redis service (for future caching)
- Environment variables
- Volume mounts
- Network configuration

**4.3 Build & Test Locally**

```bash
# Build image
docker build -t ai-api:latest .

# Run container
docker run -p 8000:8000 \
  -e OPENAI_API_KEY=your-key \
  ai-api:latest

# Test
curl http://localhost:8000/health
```

**Using docker-compose:**
```bash
docker-compose up -d
docker-compose logs -f
docker-compose down
```

**4.4 Deploy to Cloud**

Choose ONE platform and deploy:

**Option A: Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Set secrets
railway variables set OPENAI_API_KEY=your-key
```

**Option B: Heroku**
```bash
# Login
heroku login
heroku create ai-api-prod

# Deploy
git push heroku main

# Set config
heroku config:set OPENAI_API_KEY=your-key

# View logs
heroku logs --tail
```

**Option C: Render**
- Create account at render.com
- Connect GitHub repository
- Configure environment variables
- Deploy with one click

**4.5 Post-Deployment**

After deployment:
- Test live API endpoints
- Check logs for errors
- Verify authentication works
- Test rate limiting
- Monitor performance

**Deployment checklist:**
- ✅ Application running
- ✅ Health check returns 200
- ✅ Authentication working
- ✅ Rate limiting active
- ✅ Logs accessible
- ✅ Environment variables set
- ✅ HTTPS enabled
- ✅ API documented

### Testing Production

Test deployed API:
```bash
# Replace with your deployed URL
API_URL="https://your-app.railway.app"

# Health check
curl $API_URL/health

# Authenticated request
curl -H "X-API-Key: dev_key_123" \
  -X POST $API_URL/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from production!"}'

# Check stats
curl $API_URL/stats
```

**Deliverable:** Deployed, production-ready API with public URL

---

## Submission Checklist

- ✅ **Part 1:** Working FastAPI with 2 AI endpoints
- ✅ **Part 2:** Authentication and rate limiting implemented
- ✅ **Part 3:** Caching and monitoring active
- ✅ **Part 4:** Dockerized and deployed to cloud
- ✅ **Documentation:** README with API usage
- ✅ **Configuration:** requirements.txt, .env.example
- ✅ **Docker:** Dockerfile and docker-compose.yml
- ✅ **Deployment:** Live URL provided

### Code Quality

Your code should:
- Use environment variables for secrets
- Include comprehensive error handling
- Have structured logging
- Follow FastAPI best practices
- Include docstrings
- Be production-ready

---

## Bonus Features (Optional)

If time permits:
- **Redis caching:** Replace in-memory with Redis
- **JWT authentication:** Implement token-based auth
- **Prometheus metrics:** Add metrics endpoint
- **CI/CD pipeline:** GitHub Actions deployment
- **Load testing:** Test with locust/k6
- **API versioning:** Support /v1/ endpoints

---

## Common Issues & Solutions

### Issue: "Port already in use"
**Solution:** `kill -9 $(lsof -t -i:8000)` or use different port

### Issue: "Module not found"
**Solution:** Ensure virtual environment activated and dependencies installed

### Issue: "Docker build fails"
**Solution:** Check Dockerfile syntax, ensure requirements.txt exists

### Issue: "Deployment fails"
**Solution:** Check platform logs, verify environment variables set

### Issue: "Rate limiting not working"
**Solution:** Verify API key included in request headers

---

## Evaluation Criteria

| Criterion | Weight | Description |
|-----------|--------|-------------|
| **Functionality** | 40% | All endpoints work correctly |
| **Security** | 25% | Authentication and rate limiting work |
| **Performance** | 15% | Caching implemented, good response times |
| **Deployment** | 15% | Successfully deployed and accessible |
| **Code Quality** | 5% | Clean, documented, maintainable |

**Passing Grade:** 70% overall

---

## Time Management

- **Part 1 (30 min):** Focus on getting API working first
- **Part 2 (30 min):** Auth is critical, don't skip
- **Part 3 (30 min):** Simple cache OK, full monitoring if time
- **Part 4 (30 min):** Choose easiest deployment platform

**If short on time:**
- Part 4 deployment is most important (proves production-ready)
- Simple caching OK (in-memory dict)
- Basic rate limiting OK (don't need Redis)

---

## Example README Template

```markdown
# AI API - Production Deployment

## Features
- 🤖 AI-powered chat and summarization
- 🔐 API key authentication
- 🚦 Rate limiting (5 req/min free, 20 req/min premium)
- ⚡ Response caching
- 📊 Request monitoring
- 🐳 Docker containerized

## Deployment
Live API: https://your-app.railway.app

## API Documentation
Interactive docs: https://your-app.railway.app/docs

## Quick Start

### Authentication
Include API key in headers:
```bash
curl -H "X-API-Key: your-key" https://your-app.railway.app/chat
```

### Endpoints
- `GET /health` - Health check
- `POST /chat` - Conversational AI
- `POST /summarize` - Text summarization
- `GET /stats` - API statistics

## Local Development
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

## Docker
```bash
docker-compose up
```
```

---

## Resources

**FastAPI:**
- [Deployment Guide](https://fastapi.tiangolo.com/deployment/)
- [Docker](https://fastapi.tiangolo.com/deployment/docker/)

**Platforms:**
- [Railway Docs](https://docs.railway.app/)
- [Heroku Python](https://devcenter.heroku.com/articles/python-support)
- [Render Docs](https://render.com/docs)

---

## Next Steps

After completing:
1. Load test your API (use locust or k6)
2. Add more sophisticated caching (Redis)
3. Implement proper database (PostgreSQL)
4. Set up CI/CD pipeline
5. Add monitoring dashboard (Grafana)

---

**Deploy with confidence! 🚀**

---

*Module 5 Exercise | Building AI-Powered Applications | Estimated Time: 120 minutes*
