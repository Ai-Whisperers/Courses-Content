# Module 5: Production Deployment

## Learning Objectives

By the end of this module, you will be able to:

1. Build production-ready APIs with FastAPI
2. Implement authentication and authorization
3. Add rate limiting and caching
4. Set up monitoring and logging
5. Deploy to cloud platforms
6. Implement CI/CD pipelines
7. Scale AI applications effectively
8. Handle production issues and debugging

---

## Prerequisites

- Modules 1-4 completed
- Understanding of REST APIs
- Basic Docker knowledge helpful
- Cloud platform account (free tier)

**Estimated Time:** 6-8 hours

---

## 1. Production Architecture Overview

### From Prototype to Production

**Development:**
```
Python Script → Local Testing → Works on my machine
```

**Production:**
```
API Service → Load Balancer → Multiple Instances → Database → Monitoring
```

### Key Differences

| Aspect | Development | Production |
|--------|-------------|------------|
| **Reliability** | Best effort | 99.9% uptime |
| **Security** | Open | Authenticated, encrypted |
| **Performance** | Slow OK | < 200ms response time |
| **Monitoring** | Print statements | Comprehensive logging |
| **Errors** | Stack trace | Graceful handling |
| **Scale** | 1 user | 1000s concurrent |

### Production Requirements

**Must Have:**
- ✅ RESTful API (FastAPI)
- ✅ Authentication (API keys, JWT)
- ✅ Rate limiting (prevent abuse)
- ✅ Error handling (graceful failures)
- ✅ Logging (track everything)
- ✅ Monitoring (health checks)
- ✅ Documentation (API docs)

**Should Have:**
- ⭐ Caching (reduce costs)
- ⭐ Queueing (handle spikes)
- ⭐ Load balancing (distribute traffic)
- ⭐ Auto-scaling (elastic capacity)
- ⭐ Backup/recovery (data protection)

---

## 2. Building APIs with FastAPI

### Why FastAPI?

**Perfect for AI Applications:**
- ⚡ Fast (as fast as Node.js/Go)
- 🎯 Type hints (catch errors early)
- 📚 Auto-generated docs (Swagger/OpenAPI)
- 🔄 Async support (handle many requests)
- 🐍 Python native (works with LangChain)

### Basic FastAPI App

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Run with: uvicorn main:app --reload
```

### AI-Powered Endpoint

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

app = FastAPI(title="AI API", version="1.0.0")

# Initialize LLM
llm = ChatOpenAI(temperature=0.7)

# Request model
class ChatRequest(BaseModel):
    message: str
    temperature: float = 0.7

# Response model
class ChatResponse(BaseModel):
    response: str
    tokens_used: int

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat endpoint"""
    try:
        # Create chain
        prompt = PromptTemplate(
            input_variables=["message"],
            template="You are a helpful assistant. {message}"
        )
        chain = LLMChain(llm=llm, prompt=prompt)
        
        # Generate response
        result = chain.run(message=request.message)
        
        return ChatResponse(
            response=result,
            tokens_used=100  # Calculate actual tokens
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### Request Validation with Pydantic

```python
from pydantic import BaseModel, Field, validator

class SummarizeRequest(BaseModel):
    text: str = Field(..., min_length=10, max_length=10000)
    length: str = Field("medium", regex="^(short|medium|long)$")
    
    @validator('text')
    def text_not_empty(cls, v):
        if not v.strip():
            raise ValueError('Text cannot be empty')
        return v

@app.post("/summarize")
async def summarize(request: SummarizeRequest):
    # Request automatically validated
    # Type-safe access to fields
    pass
```

### Async Endpoints

```python
import asyncio

@app.post("/batch-process")
async def batch_process(items: list[str]):
    """Process multiple items concurrently"""
    
    async def process_item(item: str):
        # Async processing
        await asyncio.sleep(0.1)  # Simulate work
        return f"Processed: {item}"
    
    # Process all items concurrently
    results = await asyncio.gather(*[process_item(item) for item in items])
    
    return {"results": results}
```

---

## 3. Authentication & Authorization

### API Key Authentication

**Simple but effective:**

```python
from fastapi import Security, HTTPException, status
from fastapi.security import APIKeyHeader

API_KEY = "your-secret-key-here"  # In production: use env variable
api_key_header = APIKeyHeader(name="X-API-Key")

def verify_api_key(api_key: str = Security(api_key_header)):
    """Verify API key"""
    if api_key != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key"
        )
    return api_key

@app.post("/protected")
async def protected_route(api_key: str = Security(verify_api_key)):
    """Protected endpoint requiring API key"""
    return {"message": "Access granted"}
```

**Client usage:**
```bash
curl -H "X-API-Key: your-secret-key-here" http://localhost:8000/protected
```

### JWT Authentication

**More sophisticated:**

```python
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

security = HTTPBearer()

def create_access_token(data: dict):
    """Create JWT token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify JWT token"""
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/login")
async def login(username: str, password: str):
    """Login and get token"""
    # Verify credentials (check database)
    if username == "user" and password == "pass":
        token = create_access_token({"sub": username})
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/protected")
async def protected(username: str = Depends(verify_token)):
    """Protected endpoint requiring JWT"""
    return {"message": f"Hello {username}"}
```

### Role-Based Access Control (RBAC)

```python
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"
    GUEST = "guest"

def require_role(required_role: UserRole):
    """Decorator to require specific role"""
    def role_checker(username: str = Depends(verify_token)):
        # Get user role from database
        user_role = get_user_role(username)  # Implement this
        
        if user_role != required_role:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        
        return username
    return role_checker

@app.delete("/admin/users/{user_id}")
async def delete_user(
    user_id: int,
    admin: str = Depends(require_role(UserRole.ADMIN))
):
    """Only admins can delete users"""
    return {"message": f"User {user_id} deleted by {admin}"}
```

---

## 4. Rate Limiting

### Why Rate Limit?

**Protect your API from:**
- 💸 Cost explosion (LLM API costs)
- 🔥 Server overload
- 🤖 Bot abuse
- 🐌 Slow clients

### Simple Rate Limiter

```python
from fastapi import HTTPException
from collections import defaultdict
from datetime import datetime, timedelta

class RateLimiter:
    def __init__(self, requests_per_minute: int):
        self.requests_per_minute = requests_per_minute
        self.requests = defaultdict(list)
    
    def check_rate_limit(self, client_id: str):
        """Check if client exceeded rate limit"""
        now = datetime.now()
        minute_ago = now - timedelta(minutes=1)
        
        # Clean old requests
        self.requests[client_id] = [
            req_time for req_time in self.requests[client_id]
            if req_time > minute_ago
        ]
        
        # Check limit
        if len(self.requests[client_id]) >= self.requests_per_minute:
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded. Try again later."
            )
        
        # Record request
        self.requests[client_id].append(now)

# Create limiter
rate_limiter = RateLimiter(requests_per_minute=10)

@app.post("/chat")
async def chat(request: ChatRequest, api_key: str = Depends(verify_api_key)):
    """Rate-limited chat endpoint"""
    rate_limiter.check_rate_limit(api_key)
    # Process request
    pass
```

### Using slowapi Library

```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/chat")
@limiter.limit("10/minute")
async def chat(request: Request, chat_request: ChatRequest):
    """10 requests per minute per IP"""
    # Process request
    pass
```

### Token Bucket Algorithm

```python
import time

class TokenBucket:
    def __init__(self, capacity: int, refill_rate: float):
        """
        capacity: Maximum tokens
        refill_rate: Tokens added per second
        """
        self.capacity = capacity
        self.tokens = capacity
        self.refill_rate = refill_rate
        self.last_refill = time.time()
    
    def consume(self, tokens: int = 1) -> bool:
        """Try to consume tokens"""
        self._refill()
        
        if self.tokens >= tokens:
            self.tokens -= tokens
            return True
        return False
    
    def _refill(self):
        """Refill tokens based on time elapsed"""
        now = time.time()
        elapsed = now - self.last_refill
        
        tokens_to_add = elapsed * self.refill_rate
        self.tokens = min(self.capacity, self.tokens + tokens_to_add)
        self.last_refill = now

# Usage
bucket = TokenBucket(capacity=100, refill_rate=10)  # 10 tokens/second

@app.post("/expensive-operation")
async def expensive_operation(tokens_needed: int = 10):
    if not bucket.consume(tokens_needed):
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
    # Process
    pass
```

---

## 5. Caching Strategies

### Why Cache?

**Benefits:**
- 💰 Reduce API costs (fewer LLM calls)
- ⚡ Faster responses
- 📉 Lower server load
- 🛡️ Handle traffic spikes

### In-Memory Caching

```python
from functools import lru_cache
import hashlib

# Simple LRU cache
@lru_cache(maxsize=1000)
def cached_llm_call(prompt: str, temperature: float):
    """Cache LLM responses"""
    return llm.predict(prompt)

# More control with dict
cache = {}

def get_cache_key(request: ChatRequest) -> str:
    """Generate cache key"""
    content = f"{request.message}:{request.temperature}"
    return hashlib.md5(content.encode()).hexdigest()

@app.post("/chat")
async def chat(request: ChatRequest):
    # Check cache
    cache_key = get_cache_key(request)
    if cache_key in cache:
        return cache[cache_key]
    
    # Generate response
    response = generate_response(request)
    
    # Store in cache
    cache[cache_key] = response
    return response
```

### Redis Caching

```python
import redis
import json

redis_client = redis.Redis(host='localhost', port=6379, decode_responses=True)

@app.post("/chat")
async def chat(request: ChatRequest):
    cache_key = get_cache_key(request)
    
    # Check Redis cache
    cached = redis_client.get(cache_key)
    if cached:
        return json.loads(cached)
    
    # Generate response
    response = generate_response(request)
    
    # Store in Redis with TTL (1 hour)
    redis_client.setex(
        cache_key,
        3600,  # seconds
        json.dumps(response)
    )
    
    return response
```

### Semantic Caching

**Cache similar queries:**

```python
from langchain.embeddings import OpenAIEmbeddings
import numpy as np

class SemanticCache:
    def __init__(self, similarity_threshold=0.95):
        self.embeddings = OpenAIEmbeddings()
        self.cache = {}  # {embedding_key: (query, response)}
        self.threshold = similarity_threshold
    
    def get(self, query: str):
        """Get from cache if similar query exists"""
        query_embedding = self.embeddings.embed_query(query)
        
        for cached_embedding, (cached_query, response) in self.cache.items():
            similarity = cosine_similarity(query_embedding, cached_embedding)
            if similarity >= self.threshold:
                return response
        
        return None
    
    def set(self, query: str, response: str):
        """Store in cache"""
        embedding = self.embeddings.embed_query(query)
        embedding_key = str(embedding[:10])  # Use first 10 dims as key
        self.cache[embedding_key] = (query, response)

semantic_cache = SemanticCache()

@app.post("/chat")
async def chat(request: ChatRequest):
    # Check semantic cache
    cached = semantic_cache.get(request.message)
    if cached:
        return {"response": cached, "from_cache": True}
    
    # Generate response
    response = generate_response(request)
    
    # Store in semantic cache
    semantic_cache.set(request.message, response)
    
    return {"response": response, "from_cache": False}
```

---

## 6. Logging & Monitoring

### Structured Logging

```python
import logging
import json
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class JSONFormatter(logging.Formatter):
    """Format logs as JSON"""
    def format(self, record):
        log_data = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName
        }
        return json.dumps(log_data)

@app.post("/chat")
async def chat(request: ChatRequest):
    logger.info(f"Chat request received", extra={
        "user_message_length": len(request.message),
        "temperature": request.temperature
    })
    
    try:
        response = generate_response(request)
        logger.info("Chat response generated successfully")
        return response
    
    except Exception as e:
        logger.error(f"Chat generation failed: {e}", exc_info=True)
        raise
```

### Request/Response Logging Middleware

```python
from fastapi import Request
import time

@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all requests and responses"""
    start_time = time.time()
    
    # Log request
    logger.info(f"Request: {request.method} {request.url}")
    
    # Process request
    response = await call_next(request)
    
    # Log response
    duration = time.time() - start_time
    logger.info(f"Response: {response.status_code} in {duration:.2f}s")
    
    # Add response headers
    response.headers["X-Process-Time"] = str(duration)
    
    return response
```

### Health Checks

```python
@app.get("/health")
async def health_check():
    """Comprehensive health check"""
    health_status = {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "checks": {}
    }
    
    # Check LLM
    try:
        llm.predict("test")
        health_status["checks"]["llm"] = "healthy"
    except Exception as e:
        health_status["checks"]["llm"] = f"unhealthy: {e}"
        health_status["status"] = "unhealthy"
    
    # Check database
    try:
        # Test database connection
        health_status["checks"]["database"] = "healthy"
    except Exception as e:
        health_status["checks"]["database"] = f"unhealthy: {e}"
        health_status["status"] = "unhealthy"
    
    # Check Redis
    try:
        redis_client.ping()
        health_status["checks"]["redis"] = "healthy"
    except Exception as e:
        health_status["checks"]["redis"] = f"unhealthy: {e}"
    
    return health_status
```

### Prometheus Metrics

```python
from prometheus_client import Counter, Histogram, generate_latest
from prometheus_fastapi_instrumentator import Instrumentator

# Create metrics
request_count = Counter('api_requests_total', 'Total API requests', ['method', 'endpoint'])
request_duration = Histogram('api_request_duration_seconds', 'Request duration')

# Instrument FastAPI
Instrumentator().instrument(app).expose(app)

@app.get("/metrics")
async def metrics():
    """Expose Prometheus metrics"""
    return Response(generate_latest(), media_type="text/plain")
```

---

## 7. Error Handling

### Custom Exception Handlers

```python
from fastapi import Request
from fastapi.responses import JSONResponse

class AIServiceException(Exception):
    """Custom exception for AI service errors"""
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code

@app.exception_handler(AIServiceException)
async def ai_service_exception_handler(request: Request, exc: AIServiceException):
    """Handle AI service exceptions"""
    logger.error(f"AI service error: {exc.message}")
    
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.message,
            "type": "ai_service_error",
            "timestamp": datetime.utcnow().isoformat()
        }
    )

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        return generate_response(request)
    except OpenAIError as e:
        raise AIServiceException(f"LLM error: {e}", status_code=503)
    except Exception as e:
        raise AIServiceException(f"Unexpected error: {e}", status_code=500)
```

### Graceful Degradation

```python
@app.post("/chat")
async def chat(request: ChatRequest):
    """Chat with fallback mechanisms"""
    
    # Try primary LLM
    try:
        return generate_with_gpt4(request)
    except RateLimitError:
        logger.warning("GPT-4 rate limited, falling back to GPT-3.5")
        
        # Fallback to cheaper model
        try:
            return generate_with_gpt35(request)
        except Exception as e:
            logger.error(f"All LLMs failed: {e}")
            
            # Return cached response or error
            cached = get_similar_response(request.message)
            if cached:
                return {"response": cached, "note": "Cached response (service degraded)"}
            
            raise HTTPException(status_code=503, detail="AI service temporarily unavailable")
```

---

## 8. Deployment

### Dockerizing Your Application

**Dockerfile:**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**docker-compose.yml:**
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
    depends_on:
      - redis
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
```

### Deploying to Heroku

```bash
# Install Heroku CLI
# heroku login

# Create app
heroku create my-ai-app

# Set environment variables
heroku config:set OPENAI_API_KEY=your-key

# Deploy
git push heroku main

# Scale
heroku ps:scale web=2

# View logs
heroku logs --tail
```

**Procfile:**
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Deploying to AWS (Elastic Beanstalk)

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p python-3.11 my-ai-app

# Create environment
eb create production

# Deploy
eb deploy

# Open application
eb open
```

### Deploying to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up

# Set secrets
railway variables set OPENAI_API_KEY=your-key
```

---

## 9. Scaling Strategies

### Horizontal Scaling

**Load Balancer + Multiple Instances:**

```
                    ┌─> Instance 1
                    │
Internet → Load Balancer ─> Instance 2
                    │
                    └─> Instance 3
```

### Async Processing with Celery

```python
from celery import Celery

celery_app = Celery('tasks', broker='redis://localhost:6379')

@celery_app.task
def generate_response_async(message: str):
    """Process in background"""
    result = llm.predict(message)
    return result

@app.post("/chat-async")
async def chat_async(request: ChatRequest):
    """Async chat endpoint"""
    # Queue task
    task = generate_response_async.delay(request.message)
    
    return {
        "task_id": task.id,
        "status": "processing"
    }

@app.get("/chat-status/{task_id}")
async def chat_status(task_id: str):
    """Check task status"""
    task = generate_response_async.AsyncResult(task_id)
    
    if task.ready():
        return {"status": "complete", "result": task.result}
    else:
        return {"status": "processing"}
```

### Connection Pooling

```python
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool

engine = create_engine(
    'postgresql://user:pass@localhost/db',
    poolclass=QueuePool,
    pool_size=20,
    max_overflow=40,
    pool_pre_ping=True
)
```

---

## Summary

In this module, you learned:

- **FastAPI Fundamentals:** Building production APIs
- **Authentication:** API keys, JWT, RBAC
- **Rate Limiting:** Protecting your API from abuse
- **Caching:** Reducing costs and improving performance
- **Logging & Monitoring:** Comprehensive observability
- **Error Handling:** Graceful failures and fallbacks
- **Deployment:** Docker, Heroku, AWS, Railway
- **Scaling:** Horizontal scaling, async processing

**Key Takeaways:**
1. Production is different from development - plan accordingly
2. Security is critical - always authenticate and rate limit
3. Monitor everything - logs, metrics, health checks
4. Cache aggressively - LLM calls are expensive
5. Plan for failures - implement fallbacks and retries
6. Start small, scale as needed

**Next Module:** Testing & Quality Assurance - Ensuring your AI application works correctly

---

## Additional Resources

**FastAPI:**
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Async Programming](https://fastapi.tiangolo.com/async/)

**Deployment:**
- [Docker Documentation](https://docs.docker.com/)
- [Heroku Python Guide](https://devcenter.heroku.com/articles/getting-started-with-python)

**Monitoring:**
- [Prometheus](https://prometheus.io/)
- [Grafana](https://grafana.com/)

---

*Module 5 of 6 | Building AI-Powered Applications | Duration: 6-8 hours*
