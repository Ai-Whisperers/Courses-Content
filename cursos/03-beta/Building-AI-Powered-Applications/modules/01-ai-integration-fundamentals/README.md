# Module 1: AI Integration Fundamentals

## Learning Objectives

By the end of this module, you will be able to:

1. Understand different approaches to AI integration (API, SDK, Library)
2. Set up and authenticate with AI service providers (OpenAI, Anthropic, etc.)
3. Implement proper error handling and retry logic for API calls
4. Manage rate limits and API quotas effectively
5. Apply production-ready best practices for AI integration
6. Build a foundation for more advanced AI applications

---

## Prerequisites

- Python 3.9 or higher installed
- Basic understanding of REST APIs
- Familiarity with JSON data structures
- Command line comfort

**Estimated Time:** 6-8 hours

---

## 1. What is AI Integration?

### Understanding the Landscape

AI integration is the process of incorporating artificial intelligence capabilities into your applications. Unlike traditional software where you control exact outputs, AI integration involves working with probabilistic systems that generate responses based on patterns learned from vast amounts of data.

**Key Concept:** You're not programming exact behaviors—you're guiding intelligent systems to produce useful outputs.

### Why Integrate AI?

**Business Value:**
- **Automation:** Handle tasks that previously required human intelligence
- **Scale:** Process large volumes of requests without proportional cost increases
- **Personalization:** Tailor experiences to individual users
- **Innovation:** Enable entirely new product capabilities

**Common Use Cases:**
- Natural language interfaces (chatbots, search)
- Content generation (writing, code, images)
- Data analysis and insights
- Document processing and extraction
- Customer support automation
- Code assistance and review

### The Integration Spectrum

```
Simple → Complex
│
├─ Direct API Calls (this module)
├─ SDK/Library Usage (Module 2)
├─ Framework Integration (Module 2-3)
├─ Agent Systems (Module 4)
└─ Full Production Apps (Modules 5-6)
```

---

## 2. API vs. SDK vs. Library Approaches

### Understanding Your Options

When integrating AI, you have three main approaches:

#### 2.1 Direct API Calls

**What it is:** Making HTTP requests directly to AI service endpoints

**Pros:**
- ✅ Language agnostic (works in any language)
- ✅ Full control over requests
- ✅ No additional dependencies
- ✅ Easy to understand and debug

**Cons:**
- ❌ More boilerplate code
- ❌ Manual error handling
- ❌ Need to manage authentication yourself
- ❌ More maintenance overhead

**When to use:**
- Simple, one-off integrations
- Non-Python environments
- Maximum control needed
- Learning how APIs work

**Example:**
```python
import requests

response = requests.post(
    'https://api.openai.com/v1/chat/completions',
    headers={
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    },
    json={
        'model': 'gpt-4',
        'messages': [{'role': 'user', 'content': 'Hello!'}]
    }
)
```

#### 2.2 Official SDKs

**What it is:** Using provider-maintained libraries (e.g., `openai` Python package)

**Pros:**
- ✅ Handles authentication automatically
- ✅ Built-in error handling
- ✅ Type hints and IDE support
- ✅ Maintained by provider
- ✅ Automatic retries and rate limiting

**Cons:**
- ❌ Language-specific (usually Python, JavaScript)
- ❌ Additional dependency
- ❌ Less control over low-level details

**When to use:**
- Production applications
- Python/JavaScript projects
- Want provider support
- Need reliability features

**Example:**
```python
from openai import OpenAI

client = OpenAI(api_key=api_key)

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

#### 2.3 Framework/Library Approach

**What it is:** Using higher-level frameworks (e.g., LangChain, LlamaIndex)

**Pros:**
- ✅ High-level abstractions
- ✅ Built-in patterns and best practices
- ✅ Multi-provider support
- ✅ Rich ecosystem of tools
- ✅ Faster development

**Cons:**
- ❌ Steeper learning curve
- ❌ More dependencies
- ❌ Less control over implementation
- ❌ Can be overkill for simple use cases

**When to use:**
- Complex AI applications
- Multi-step workflows
- Need multiple integrations
- Rapid prototyping

**Example:**
```python
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage

chat = ChatOpenAI(temperature=0.7)
response = chat([HumanMessage(content="Hello!")])
```

### Recommendation for This Course

We'll start with **official SDKs** (approach #2) because they offer the best balance of:
- Ease of use
- Production readiness
- Control when needed
- Industry standard practice

---

## 3. OpenAI API Basics

### 3.1 Setting Up

**Step 1: Get Your API Key**

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new secret key
5. **IMPORTANT:** Save it securely (you won't see it again)

**Step 2: Install the SDK**

```bash
pip install openai
```

**Step 3: Configure Your Environment**

Never hardcode API keys. Use environment variables:

```bash
# .env file
OPENAI_API_KEY=sk-your-key-here
```

```python
# Load environment variables
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')
```

### 3.2 Your First API Call

```python
from openai import OpenAI

# Initialize client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Make a chat completion request
response = client.chat.completions.create(
    model="gpt-3.5-turbo",  # or "gpt-4"
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is Python?"}
    ],
    temperature=0.7,
    max_tokens=150
)

# Extract the response
answer = response.choices[0].message.content
print(answer)
```

### 3.3 Understanding the Request Structure

**Model:** Which AI model to use
- `gpt-3.5-turbo`: Fast, cost-effective
- `gpt-4`: More capable, more expensive
- `gpt-4-turbo`: Latest, balanced

**Messages:** Conversation history
- `system`: Sets behavior and context
- `user`: The human's message
- `assistant`: Previous AI responses (for multi-turn)

**Temperature:** Randomness (0.0 - 2.0)
- 0.0: Deterministic, focused
- 0.7: Balanced (default)
- 1.5+: Creative, varied

**Max Tokens:** Response length limit
- Limits cost and response size
- 1 token ≈ 4 characters

### 3.4 Understanding the Response

```python
response = client.chat.completions.create(...)

# Response structure
{
    "id": "chatcmpl-123",
    "object": "chat.completion",
    "created": 1677652288,
    "model": "gpt-3.5-turbo-0613",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "The answer is..."
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 10,
        "completion_tokens": 20,
        "total_tokens": 30
    }
}
```

**Key fields:**
- `choices[0].message.content`: The actual response
- `finish_reason`: Why it stopped ("stop", "length", etc.)
- `usage`: Token consumption (for billing)

---

## 4. Authentication & Security

### 4.1 API Key Management

**❌ NEVER do this:**
```python
# Hardcoded - DANGER!
api_key = "sk-proj-abc123..."
```

**✅ ALWAYS do this:**
```python
# Environment variable - SAFE
api_key = os.getenv('OPENAI_API_KEY')

if not api_key:
    raise ValueError("OPENAI_API_KEY not set")
```

### 4.2 Environment Variables

**Using .env files:**

```python
# .env (add to .gitignore!)
OPENAI_API_KEY=sk-your-key
ANTHROPIC_API_KEY=sk-ant-your-key
```

```python
# app.py
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
```

### 4.3 Security Best Practices

**1. Never Commit Keys**
```bash
# .gitignore
.env
*.key
secrets/
```

**2. Use Key Rotation**
- Rotate keys every 90 days
- Immediately rotate if compromised
- Use separate keys for dev/prod

**3. Restrict Key Permissions**
- Set usage limits in provider dashboard
- Restrict by IP if possible
- Use separate keys per application

**4. Monitor Usage**
- Set up alerts for unusual activity
- Check billing regularly
- Log API calls (but not responses with PII)

### 4.4 Multi-Provider Setup

```python
from openai import OpenAI
from anthropic import Anthropic

class AIClientManager:
    def __init__(self):
        self.openai = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.anthropic = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
    
    def get_client(self, provider: str):
        if provider == 'openai':
            return self.openai
        elif provider == 'anthropic':
            return self.anthropic
        else:
            raise ValueError(f"Unknown provider: {provider}")
```

---

## 5. Rate Limiting & Quotas

### 5.1 Understanding Rate Limits

AI providers enforce limits to ensure fair usage and prevent abuse.

**Types of Limits:**

1. **Requests Per Minute (RPM)**
   - Number of API calls per minute
   - Example: 3,500 RPM for GPT-3.5-turbo

2. **Tokens Per Minute (TPM)**
   - Total tokens processed per minute
   - Example: 90,000 TPM for GPT-3.5-turbo

3. **Tokens Per Day (TPD)**
   - Daily token limit
   - Resets at midnight UTC

**OpenAI Rate Limits (Free Tier Example):**
- GPT-3.5-turbo: 3 RPM, 40,000 TPM
- GPT-4: 3 RPM, 40,000 TPM

**Paid Tier** increases dramatically based on usage history.

### 5.2 Checking Your Limits

```python
# OpenAI provides rate limit info in response headers
import openai

try:
    response = client.chat.completions.create(...)
except openai.RateLimitError as e:
    print(f"Rate limit hit: {e}")
    # Check headers for limit info
```

### 5.3 Handling Rate Limits

**Strategy 1: Exponential Backoff**

```python
import time
import random

def call_with_backoff(func, max_retries=5):
    for attempt in range(max_retries):
        try:
            return func()
        except openai.RateLimitError:
            if attempt == max_retries - 1:
                raise
            
            # Exponential backoff with jitter
            wait_time = (2 ** attempt) + random.uniform(0, 1)
            print(f"Rate limited. Waiting {wait_time:.2f}s...")
            time.sleep(wait_time)
```

**Strategy 2: Token Bucket Algorithm**

```python
import time
from collections import deque

class RateLimiter:
    def __init__(self, max_requests: int, time_window: int):
        self.max_requests = max_requests
        self.time_window = time_window
        self.requests = deque()
    
    def acquire(self):
        now = time.time()
        
        # Remove old requests outside window
        while self.requests and self.requests[0] < now - self.time_window:
            self.requests.popleft()
        
        # Check if we can make a request
        if len(self.requests) >= self.max_requests:
            wait_time = self.requests[0] + self.time_window - now
            time.sleep(wait_time)
            return self.acquire()
        
        self.requests.append(now)
        return True

# Usage
limiter = RateLimiter(max_requests=3, time_window=60)  # 3 req/min

for i in range(10):
    limiter.acquire()
    response = client.chat.completions.create(...)
```

**Strategy 3: Queue-Based Processing**

```python
from queue import Queue
import threading
import time

class RequestQueue:
    def __init__(self, requests_per_minute: int):
        self.queue = Queue()
        self.rpm = requests_per_minute
        self.delay = 60 / requests_per_minute
        
    def add_request(self, func, callback):
        self.queue.put((func, callback))
    
    def process(self):
        while True:
            if not self.queue.empty():
                func, callback = self.queue.get()
                try:
                    result = func()
                    callback(result, None)
                except Exception as e:
                    callback(None, e)
                time.sleep(self.delay)
            else:
                time.sleep(0.1)

# Start background processor
queue = RequestQueue(requests_per_minute=3)
thread = threading.Thread(target=queue.process, daemon=True)
thread.start()
```

### 5.4 Quota Management

**Track Your Usage:**

```python
class UsageTracker:
    def __init__(self):
        self.total_tokens = 0
        self.total_requests = 0
        self.total_cost = 0.0
    
    def track(self, response):
        usage = response.usage
        self.total_tokens += usage.total_tokens
        self.total_requests += 1
        
        # Calculate cost (example rates)
        cost = (usage.prompt_tokens * 0.0015 / 1000 +
                usage.completion_tokens * 0.002 / 1000)
        self.total_cost += cost
    
    def report(self):
        return {
            'requests': self.total_requests,
            'tokens': self.total_tokens,
            'estimated_cost': f'${self.total_cost:.4f}'
        }

tracker = UsageTracker()
response = client.chat.completions.create(...)
tracker.track(response)
print(tracker.report())
```

---

## 6. Error Handling Patterns

### 6.1 Common Error Types

**API Errors:**
```python
from openai import (
    APIError,          # General API errors
    RateLimitError,    # Rate limit exceeded
    APIConnectionError, # Network issues
    AuthenticationError, # Invalid API key
    InvalidRequestError  # Bad request
)
```

### 6.2 Comprehensive Error Handling

```python
def safe_api_call(messages, max_retries=3):
    """
    Make an API call with comprehensive error handling
    """
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                timeout=30  # 30 second timeout
            )
            return response
        
        except AuthenticationError as e:
            # Don't retry auth errors
            print(f"Authentication failed: {e}")
            raise
        
        except RateLimitError as e:
            if attempt == max_retries - 1:
                raise
            wait_time = 2 ** attempt
            print(f"Rate limited. Waiting {wait_time}s...")
            time.sleep(wait_time)
        
        except APIConnectionError as e:
            if attempt == max_retries - 1:
                raise
            print(f"Connection error: {e}. Retrying...")
            time.sleep(1)
        
        except InvalidRequestError as e:
            # Don't retry invalid requests
            print(f"Invalid request: {e}")
            raise
        
        except APIError as e:
            # General API errors might be transient
            if attempt == max_retries - 1:
                raise
            print(f"API error: {e}. Retrying...")
            time.sleep(2 ** attempt)
        
        except Exception as e:
            # Unexpected errors
            print(f"Unexpected error: {e}")
            raise
    
    raise Exception("Max retries exceeded")
```

### 6.3 Timeout Handling

```python
import signal

class TimeoutError(Exception):
    pass

def timeout_handler(signum, frame):
    raise TimeoutError("API call timed out")

def call_with_timeout(func, timeout_seconds=30):
    """Call function with timeout (Unix-only)"""
    signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(timeout_seconds)
    try:
        result = func()
        signal.alarm(0)  # Cancel alarm
        return result
    except TimeoutError:
        print("Request timed out")
        return None
```

**Cross-platform timeout:**

```python
from concurrent.futures import ThreadPoolExecutor, TimeoutError
import time

def call_with_timeout_cross_platform(func, timeout_seconds=30):
    """Cross-platform timeout implementation"""
    with ThreadPoolExecutor(max_workers=1) as executor:
        future = executor.submit(func)
        try:
            return future.result(timeout=timeout_seconds)
        except TimeoutError:
            print(f"Function timed out after {timeout_seconds}s")
            return None
```

### 6.4 Validation and Sanitization

```python
def validate_input(text: str, max_length: int = 4000):
    """Validate user input before API call"""
    if not text or not text.strip():
        raise ValueError("Input cannot be empty")
    
    if len(text) > max_length:
        raise ValueError(f"Input too long: {len(text)} > {max_length}")
    
    # Remove potentially problematic characters
    text = text.strip()
    
    return text

def validate_response(response):
    """Validate API response before using"""
    if not response.choices:
        raise ValueError("No choices in response")
    
    if not response.choices[0].message.content:
        raise ValueError("Empty response content")
    
    if response.choices[0].finish_reason not in ['stop', 'length']:
        print(f"Warning: Unusual finish reason: {response.choices[0].finish_reason}")
    
    return response.choices[0].message.content
```

---

## 7. Best Practices

### 7.1 Production-Ready Integration

**1. Configuration Management**

```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class APIConfig:
    api_key: str
    model: str = "gpt-3.5-turbo"
    temperature: float = 0.7
    max_tokens: int = 500
    timeout: int = 30
    max_retries: int = 3
    
    def __post_init__(self):
        if not self.api_key:
            raise ValueError("API key required")
        if not 0 <= self.temperature <= 2:
            raise ValueError("Temperature must be between 0 and 2")

# Usage
config = APIConfig(
    api_key=os.getenv('OPENAI_API_KEY'),
    model='gpt-4'
)
```

**2. Logging**

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def logged_api_call(messages):
    logger.info(f"API call with {len(messages)} messages")
    
    try:
        response = client.chat.completions.create(...)
        logger.info(f"Success. Tokens used: {response.usage.total_tokens}")
        return response
    except Exception as e:
        logger.error(f"API call failed: {e}")
        raise
```

**3. Cost Optimization**

```python
def optimize_prompt(text: str, max_tokens: int = 1000):
    """Truncate input to reduce costs"""
    # Rough token estimation
    estimated_tokens = len(text) // 4
    
    if estimated_tokens > max_tokens:
        # Truncate to approximate token limit
        char_limit = max_tokens * 4
        text = text[:char_limit] + "..."
        logger.warning(f"Truncated input to ~{max_tokens} tokens")
    
    return text
```

**4. Caching**

```python
from functools import lru_cache
import hashlib

def cache_key(messages):
    """Create cache key from messages"""
    content = str(messages)
    return hashlib.md5(content.encode()).hexdigest()

# Simple in-memory cache
response_cache = {}

def cached_api_call(messages):
    key = cache_key(messages)
    
    if key in response_cache:
        logger.info("Cache hit")
        return response_cache[key]
    
    response = client.chat.completions.create(...)
    response_cache[key] = response
    return response
```

### 7.2 Testing Best Practices

**1. Mock API Calls**

```python
from unittest.mock import Mock, patch

def test_api_call():
    mock_response = Mock()
    mock_response.choices = [Mock()]
    mock_response.choices[0].message.content = "Test response"
    
    with patch('openai.OpenAI') as mock_client:
        mock_client.return_value.chat.completions.create.return_value = mock_response
        
        result = my_function()
        assert result == "Test response"
```

**2. Test Error Handling**

```python
def test_rate_limit_handling():
    with patch('openai.OpenAI') as mock_client:
        mock_client.return_value.chat.completions.create.side_effect = RateLimitError()
        
        with pytest.raises(RateLimitError):
            safe_api_call(messages, max_retries=1)
```

### 7.3 Documentation

```python
def generate_summary(text: str, max_length: int = 100) -> str:
    """
    Generate a summary of the provided text using GPT.
    
    Args:
        text: The text to summarize
        max_length: Maximum length of summary in words
    
    Returns:
        str: The generated summary
    
    Raises:
        ValueError: If text is empty or too long
        APIError: If the API call fails
    
    Example:
        >>> summary = generate_summary("Long article text...")
        >>> print(summary)
        "Brief summary of the article"
    """
    text = validate_input(text)
    
    messages = [
        {"role": "system", "content": f"Summarize in {max_length} words or less."},
        {"role": "user", "content": text}
    ]
    
    response = safe_api_call(messages)
    return validate_response(response)
```

---

## Summary

In this module, you learned:

- **AI Integration Approaches:** API, SDK, and framework options
- **OpenAI API Basics:** Setting up and making your first calls
- **Authentication:** Secure API key management
- **Rate Limiting:** Understanding and handling API limits
- **Error Handling:** Comprehensive error management patterns
- **Best Practices:** Production-ready integration techniques

**Key Takeaways:**
1. Use official SDKs for production applications
2. Never hardcode API keys
3. Implement proper error handling and retries
4. Respect rate limits with exponential backoff
5. Log API calls for monitoring
6. Cache responses when appropriate
7. Validate inputs and outputs

**Next Module:** Building with LangChain - high-level framework for AI applications

---

## Additional Resources

**Official Documentation:**
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [OpenAI Python SDK](https://github.com/openai/openai-python)
- [Best Practices Guide](https://platform.openai.com/docs/guides/production-best-practices)

**Rate Limits:**
- [OpenAI Rate Limits](https://platform.openai.com/docs/guides/rate-limits)
- [Usage Tiers](https://platform.openai.com/docs/guides/rate-limits/usage-tiers)

**Security:**
- [API Key Safety](https://platform.openai.com/docs/guides/safety-best-practices)

---

*Module 1 of 6 | Building AI-Powered Applications | Duration: 6-8 hours*
