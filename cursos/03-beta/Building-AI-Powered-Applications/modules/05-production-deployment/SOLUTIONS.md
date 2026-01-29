# Module 5: Production Deployment - Solution Guide

## Overview

Complete production-ready implementation with FastAPI, authentication, rate limiting, caching, monitoring, and deployment.

---

## Complete Solution Files

### File 1: requirements.txt

```text
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-jose[cryptography]==3.3.0
python-multipart==0.0.6
slowapi==0.1.9
redis==5.0.1
langchain==0.1.0
openai==1.0.0
python-dotenv==1.0.0
pydantic==2.5.0
```

### File 2: .env.example

```bash
OPENAI_API_KEY=your-openai-api-key-here
REDIS_URL=redis://localhost:6379
ENVIRONMENT=development
```

### File 3: config.py

```python
# config.py

import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    """Application settings"""
    
    # API Configuration
    API_TITLE = "AI API"
    API_VERSION = "1.0.0"
    API_DESCRIPTION = "Production-ready AI API with authentication and rate limiting"
    
    # OpenAI
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    
    # Redis
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
    
    # Rate Limiting
    RATE_LIMIT_FREE = 5  # requests per minute
    RATE_LIMIT_PREMIUM = 20
    
    # Cache
    CACHE_TTL = 3600  # 1 hour in seconds
    
    # Environment
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    
    # API Keys (in production: use database)
    API_KEYS = {
        "dev_key_123": {"name": "Development", "tier": "free"},
        "prod_key_456": {"name": "Production", "tier": "premium"}
    }

settings = Settings()
```

### File 4: models.py

```python
# models.py

from pydantic import BaseModel, Field, validator
from typing import Optional
from enum import Enum

class SummaryLength(str, Enum):
    short = "short"
    medium = "medium"
    long = "long"

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    temperature: float = Field(default=0.7, ge=0.0, le=2.0)
    
    @validator('message')
    def message_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Message cannot be empty')
        return v

class ChatResponse(BaseModel):
    response: str
    tokens_used: int
    cached: bool = False
    request_id: Optional[str] = None

class SummarizeRequest(BaseModel):
    text: str = Field(..., min_length=10, max_length=5000)
    length: SummaryLength = Field(default=SummaryLength.medium)
    
    @validator('text')
    def text_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Text cannot be empty')
        return v

class SummarizeResponse(BaseModel):
    summary: str
    original_length: int
    summary_length: int
    cached: bool = False

class HealthResponse(BaseModel):
    status: str
    checks: dict
    response_time_ms: float

class StatsResponse(BaseModel):
    total_requests: int
    cache_hits: int
    cache_misses: int
    cache_hit_rate: float
    total_api_keys: int
    requests_by_key: dict
```

### File 5: auth.py

```python
# auth.py

from fastapi import Security, HTTPException, status
from fastapi.security import APIKeyHeader
from config import settings

api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

class APIKeyInfo:
    def __init__(self, key: str, name: str, tier: str):
        self.key = key
        self.name = name
        self.tier = tier

def verify_api_key(api_key: str = Security(api_key_header)) -> APIKeyInfo:
    """Verify API key and return key info"""
    
    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="API key required. Include X-API-Key header."
        )
    
    if api_key not in settings.API_KEYS:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key"
        )
    
    key_data = settings.API_KEYS[api_key]
    return APIKeyInfo(
        key=api_key,
        name=key_data["name"],
        tier=key_data["tier"]
    )

def get_rate_limit_for_tier(tier: str) -> int:
    """Get rate limit based on tier"""
    if tier == "premium":
        return settings.RATE_LIMIT_PREMIUM
    return settings.RATE_LIMIT_FREE
```

### File 6: rate_limiter.py

```python
# rate_limiter.py

from datetime import datetime, timedelta
from collections import defaultdict
from fastapi import HTTPException
from typing import Dict, List
import threading

class RateLimiter:
    """Thread-safe rate limiter"""
    
    def __init__(self):
        self.requests: Dict[str, List[datetime]] = defaultdict(list)
        self.lock = threading.Lock()
    
    def check_rate_limit(self, api_key: str, limit: int) -> dict:
        """
        Check if request exceeds rate limit
        
        Returns dict with rate limit info
        """
        with self.lock:
            now = datetime.now()
            minute_ago = now - timedelta(minutes=1)
            
            # Clean old requests
            self.requests[api_key] = [
                req_time for req_time in self.requests[api_key]
                if req_time > minute_ago
            ]
            
            current_count = len(self.requests[api_key])
            remaining = max(0, limit - current_count)
            
            # Check if exceeded
            if current_count >= limit:
                reset_time = int((self.requests[api_key][0] + timedelta(minutes=1)).timestamp())
                raise HTTPException(
                    status_code=429,
                    detail=f"Rate limit exceeded. Try again in {reset_time - int(now.timestamp())} seconds.",
                    headers={
                        "X-RateLimit-Limit": str(limit),
                        "X-RateLimit-Remaining": "0",
                        "X-RateLimit-Reset": str(reset_time)
                    }
                )
            
            # Record request
            self.requests[api_key].append(now)
            
            return {
                "limit": limit,
                "remaining": remaining - 1,
                "reset": int((now + timedelta(minutes=1)).timestamp())
            }

rate_limiter = RateLimiter()
```

### File 7: cache.py

```python
# cache.py

import hashlib
import json
from typing import Optional, Any
from datetime import datetime, timedelta

class SimpleCache:
    """Simple in-memory cache with TTL"""
    
    def __init__(self, ttl_seconds: int = 3600):
        self.cache = {}
        self.ttl = ttl_seconds
        self.stats = {
            "hits": 0,
            "misses": 0
        }
    
    def get_cache_key(self, data: dict) -> str:
        """Generate cache key from data"""
        # Sort keys for consistency
        sorted_data = json.dumps(data, sort_keys=True)
        return hashlib.md5(sorted_data.encode()).hexdigest()
    
    def get(self, key: str) -> Optional[Any]:
        """Get from cache"""
        if key in self.cache:
            value, expiry = self.cache[key]
            if datetime.now() < expiry:
                self.stats["hits"] += 1
                return value
            else:
                # Expired
                del self.cache[key]
        
        self.stats["misses"] += 1
        return None
    
    def set(self, key: str, value: Any):
        """Set in cache with TTL"""
        expiry = datetime.now() + timedelta(seconds=self.ttl)
        self.cache[key] = (value, expiry)
    
    def get_stats(self) -> dict:
        """Get cache statistics"""
        total = self.stats["hits"] + self.stats["misses"]
        hit_rate = self.stats["hits"] / total if total > 0 else 0.0
        
        return {
            "hits": self.stats["hits"],
            "misses": self.stats["misses"],
            "hit_rate": round(hit_rate, 3),
            "size": len(self.cache)
        }
    
    def clear(self):
        """Clear cache"""
        self.cache.clear()
        self.stats = {"hits": 0, "misses": 0}

cache = SimpleCache()
```

### File 8: main.py (Complete Application)

```python
# main.py

import time
import uuid
import logging
from datetime import datetime
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.callbacks import get_openai_callback

from config import settings
from models import (
    ChatRequest, ChatResponse,
    SummarizeRequest, SummarizeResponse,
    HealthResponse, StatsResponse
)
from auth import verify_api_key, get_rate_limit_for_tier, APIKeyInfo
from rate_limiter import rate_limiter
from cache import cache

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Stats
app_stats = {
    "total_requests": 0,
    "requests_by_key": {}
}

# Initialize LLM
llm = ChatOpenAI(
    temperature=0.7,
    model_name="gpt-3.5-turbo",
    openai_api_key=settings.OPENAI_API_KEY
)

# Lifespan events
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    logger.info("Starting up AI API...")
    yield
    logger.info("Shutting down AI API...")

# Create FastAPI app
app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION,
    description=settings.API_DESCRIPTION,
    lifespan=lifespan
)

# Add CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all requests with timing"""
    request_id = str(uuid.uuid4())
    start_time = time.time()
    
    # Add request ID to request state
    request.state.request_id = request_id
    
    # Log request
    logger.info(f"Request {request_id}: {request.method} {request.url.path}")
    
    # Process request
    try:
        response = await call_next(request)
        
        # Calculate duration
        duration = time.time() - start_time
        
        # Add headers
        response.headers["X-Request-ID"] = request_id
        response.headers["X-Process-Time"] = f"{duration:.3f}"
        
        # Log response
        logger.info(
            f"Response {request_id}: {response.status_code} "
            f"in {duration:.3f}s"
        )
        
        return response
    
    except Exception as e:
        logger.error(f"Request {request_id} failed: {e}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error", "request_id": request_id}
        )

# Root endpoint
@app.get("/")
async def root():
    """API information"""
    return {
        "name": settings.API_TITLE,
        "version": settings.API_VERSION,
        "description": settings.API_DESCRIPTION,
        "docs": "/docs",
        "health": "/health"
    }

# Health check
@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Comprehensive health check"""
    start_time = time.time()
    
    checks = {}
    overall_status = "healthy"
    
    # Check API
    checks["api"] = "healthy"
    
    # Check LLM
    try:
        llm.predict("test")
        checks["llm"] = "healthy"
    except Exception as e:
        checks["llm"] = f"unhealthy: {str(e)}"
        overall_status = "unhealthy"
    
    # Check cache
    try:
        cache.get("test")
        checks["cache"] = "healthy"
    except Exception as e:
        checks["cache"] = f"unhealthy: {str(e)}"
    
    response_time = (time.time() - start_time) * 1000  # ms
    
    return HealthResponse(
        status=overall_status,
        checks=checks,
        response_time_ms=round(response_time, 2)
    )

# Chat endpoint
@app.post("/chat", response_model=ChatResponse)
async def chat(
    request: Request,
    chat_request: ChatRequest,
    api_key_info: APIKeyInfo = Depends(verify_api_key)
):
    """Chat with AI"""
    
    # Rate limiting
    limit = get_rate_limit_for_tier(api_key_info.tier)
    rate_info = rate_limiter.check_rate_limit(api_key_info.key, limit)
    
    # Update stats
    app_stats["total_requests"] += 1
    app_stats["requests_by_key"][api_key_info.key] = \
        app_stats["requests_by_key"].get(api_key_info.key, 0) + 1
    
    # Check cache
    cache_key = cache.get_cache_key({
        "message": chat_request.message,
        "temperature": chat_request.temperature
    })
    
    cached_response = cache.get(cache_key)
    if cached_response:
        logger.info(f"Cache hit for request {request.state.request_id}")
        return ChatResponse(
            response=cached_response["response"],
            tokens_used=cached_response["tokens_used"],
            cached=True,
            request_id=request.state.request_id
        )
    
    # Generate response
    try:
        prompt = PromptTemplate(
            input_variables=["message"],
            template="You are a helpful AI assistant. Respond to: {message}"
        )
        
        chain = LLMChain(llm=llm, prompt=prompt)
        
        # Track tokens
        with get_openai_callback() as cb:
            result = chain.run(message=chat_request.message)
            tokens_used = cb.total_tokens
        
        # Cache response
        response_data = {
            "response": result,
            "tokens_used": tokens_used
        }
        cache.set(cache_key, response_data)
        
        logger.info(
            f"Generated response for {request.state.request_id} "
            f"({tokens_used} tokens)"
        )
        
        return ChatResponse(
            response=result,
            tokens_used=tokens_used,
            cached=False,
            request_id=request.state.request_id
        )
    
    except Exception as e:
        logger.error(f"Chat generation failed: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate response: {str(e)}"
        )

# Summarize endpoint
@app.post("/summarize", response_model=SummarizeResponse)
async def summarize(
    request: Request,
    summarize_request: SummarizeRequest,
    api_key_info: APIKeyInfo = Depends(verify_api_key)
):
    """Summarize text"""
    
    # Rate limiting
    limit = get_rate_limit_for_tier(api_key_info.tier)
    rate_info = rate_limiter.check_rate_limit(api_key_info.key, limit)
    
    # Update stats
    app_stats["total_requests"] += 1
    app_stats["requests_by_key"][api_key_info.key] = \
        app_stats["requests_by_key"].get(api_key_info.key, 0) + 1
    
    # Check cache
    cache_key = cache.get_cache_key({
        "text": summarize_request.text,
        "length": summarize_request.length.value
    })
    
    cached_response = cache.get(cache_key)
    if cached_response:
        logger.info(f"Cache hit for summarize {request.state.request_id}")
        return SummarizeResponse(**cached_response, cached=True)
    
    # Generate summary
    try:
        length_instructions = {
            "short": "1-2 sentences",
            "medium": "3-4 sentences",
            "long": "5-6 sentences"
        }
        
        prompt = PromptTemplate(
            input_variables=["text", "length"],
            template="Summarize the following text in {length}:\n\n{text}\n\nSummary:"
        )
        
        chain = LLMChain(llm=llm, prompt=prompt)
        summary = chain.run(
            text=summarize_request.text,
            length=length_instructions[summarize_request.length.value]
        )
        
        # Prepare response
        response_data = {
            "summary": summary.strip(),
            "original_length": len(summarize_request.text),
            "summary_length": len(summary.strip())
        }
        
        # Cache
        cache.set(cache_key, response_data)
        
        logger.info(f"Generated summary for {request.state.request_id}")
        
        return SummarizeResponse(**response_data, cached=False)
    
    except Exception as e:
        logger.error(f"Summarization failed: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate summary: {str(e)}"
        )

# Stats endpoint
@app.get("/stats", response_model=StatsResponse)
async def get_stats():
    """Get API statistics"""
    
    cache_stats = cache.get_stats()
    
    return StatsResponse(
        total_requests=app_stats["total_requests"],
        cache_hits=cache_stats["hits"],
        cache_misses=cache_stats["misses"],
        cache_hit_rate=cache_stats["hit_rate"],
        total_api_keys=len(settings.API_KEYS),
        requests_by_key=app_stats["requests_by_key"]
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
```

### File 9: Dockerfile

```dockerfile
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD python -c "import requests; requests.get('http://localhost:8000/health')"

# Run application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### File 10: docker-compose.yml

```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - REDIS_URL=redis://redis:6379
      - ENVIRONMENT=production
    depends_on:
      - redis
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    restart: unless-stopped

volumes:
  redis-data:
```

### File 11: .dockerignore

```
__pycache__
*.pyc
*.pyo
*.pyd
.Python
venv/
.env
.git
.gitignore
README.md
.vscode/
.idea/
*.log
```

### File 12: .gitignore

```
__pycache__/
*.py[cod]
*$py.class
.env
venv/
.vscode/
.idea/
*.log
.DS_Store
```

### File 13: README.md

```markdown
# AI API - Production Deployment

Production-ready AI API with FastAPI, authentication, rate limiting, and caching.

## Features

- 🤖 AI-powered chat and summarization endpoints
- 🔐 API key authentication with tier-based access
- 🚦 Rate limiting (5 req/min free, 20 req/min premium)
- ⚡ Response caching for cost optimization
- 📊 Request monitoring and statistics
- 🐳 Docker containerized
- 📝 Comprehensive logging
- ✅ Health checks

## Quick Start

### Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your OpenAI API key

# Run application
uvicorn main:app --reload
```

Visit http://localhost:8000/docs for interactive API documentation.

### Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## API Documentation

### Authentication

Include API key in request headers:
```bash
X-API-Key: your-api-key-here
```

### Endpoints

**Health Check**
```bash
GET /health
```

**Chat**
```bash
POST /chat
Content-Type: application/json
X-API-Key: dev_key_123

{
  "message": "Hello, how are you?",
  "temperature": 0.7
}
```

**Summarize**
```bash
POST /summarize
Content-Type: application/json
X-API-Key: dev_key_123

{
  "text": "Long text to summarize...",
  "length": "short"
}
```

**Statistics**
```bash
GET /stats
```

## API Keys

Development keys (for testing):
- `dev_key_123` - Free tier (5 req/min)
- `prod_key_456` - Premium tier (20 req/min)

## Deployment

### Railway

```bash
railway login
railway init
railway up
railway variables set OPENAI_API_KEY=your-key
```

### Heroku

```bash
heroku create ai-api-prod
git push heroku main
heroku config:set OPENAI_API_KEY=your-key
```

## Architecture

- **Framework**: FastAPI
- **LLM**: OpenAI GPT-3.5-turbo via LangChain
- **Cache**: In-memory with TTL
- **Rate Limiting**: Token bucket algorithm
- **Logging**: Structured JSON logs
- **Monitoring**: Health checks + stats endpoint

## Testing

```bash
# Health check
curl http://localhost:8000/health

# Chat (authenticated)
curl -H "X-API-Key: dev_key_123" \
  -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'

# Stats
curl http://localhost:8000/stats
```

## License

MIT
```

---

## Testing the Solution

### Local Testing

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Set API key
export OPENAI_API_KEY=your-key

# 3. Run server
python main.py

# 4. Test in another terminal
curl http://localhost:8000/health

curl -H "X-API-Key: dev_key_123" \
  -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

### Docker Testing

```bash
docker build -t ai-api .
docker run -p 8000:8000 -e OPENAI_API_KEY=your-key ai-api
```

---

## Common Student Mistakes

1. **Not using environment variables** - Hardcoding API keys
2. **Missing error handling** - Not catching LLM API errors
3. **Poor cache key generation** - Inconsistent hashing
4. **No rate limit headers** - Not informing clients of limits
5. **Ignoring CORS** - Frontend can't access API

---

*Module 5 Solution Guide | Production-Ready AI API*
