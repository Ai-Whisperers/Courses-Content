# Module 1 Exercise: AI Integration Fundamentals Lab

## Exercise Overview

**Objective:** Build a production-ready Python application that integrates with the OpenAI API, implementing proper authentication, error handling, and rate limiting.

**Duration:** 90 minutes

**Tools Required:**
- Python 3.9+
- OpenAI API key (free tier OK)
- Code editor (VS Code recommended)
- Terminal/command line

**What You'll Build:**
A command-line application that makes AI API calls with professional error handling, retry logic, and rate limiting.

---

## Prerequisites Checklist

Before starting, ensure you have:
- [ ] Python 3.9 or higher installed (`python --version`)
- [ ] pip package manager (`pip --version`)
- [ ] OpenAI API key (from platform.openai.com)
- [ ] Code editor ready
- [ ] Terminal open

---

## Part 1: Setup and First API Call (20 minutes)

### Task 1.1: Environment Setup

**Create your project structure:**

```bash
mkdir ai-integration-lab
cd ai-integration-lab
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install required packages
pip install openai python-dotenv
```

**Create your files:**

```bash
touch .env
touch app.py
touch .gitignore
```

**Setup .gitignore:**

```
# .gitignore
venv/
.env
*.pyc
__pycache__/
.DS_Store
```

### Task 1.2: Configure Environment Variables

**Edit `.env` file:**

```env
OPENAI_API_KEY=your-api-key-here
```

**Replace `your-api-key-here` with your actual OpenAI API key.**

### Task 1.3: Make Your First API Call

**Create `app.py` with this code:**

```python
from dotenv import load_dotenv
import os
from openai import OpenAI

# Load environment variables
load_dotenv()

# Initialize client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def first_api_call():
    """Make your first API call"""
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Say 'Hello, World!' in a creative way."}
        ]
    )
    
    print("Response:", response.choices[0].message.content)
    print(f"Tokens used: {response.usage.total_tokens}")

if __name__ == "__main__":
    first_api_call()
```

**Run your code:**

```bash
python app.py
```

### Task 1.4: Verify and Document

**Expected Output:**
```
Response: [Creative greeting from AI]
Tokens used: [number]
```

**Questions to answer:**
1. Did your API call succeed? (Yes/No)
2. How many tokens were used?
3. What happens if you run it again? (Same output or different?)

**Deliverable:** Screenshot or copy-paste of your successful output.

---

## Part 2: Error Handling Implementation (30 minutes)

### Task 2.1: Test Error Scenarios

**Add this function to `app.py`:**

```python
from openai import (
    APIError,
    RateLimitError,
    APIConnectionError,
    AuthenticationError,
    InvalidRequestError
)

def test_invalid_key():
    """Test authentication error"""
    try:
        bad_client = OpenAI(api_key="sk-invalid-key")
        response = bad_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Test"}]
        )
    except AuthenticationError as e:
        print(f"✓ Authentication error caught: {e}")
        return True
    except Exception as e:
        print(f"✗ Unexpected error: {e}")
        return False

def test_invalid_model():
    """Test invalid request error"""
    try:
        response = client.chat.completions.create(
            model="nonexistent-model",
            messages=[{"role": "user", "content": "Test"}]
        )
    except InvalidRequestError as e:
        print(f"✓ Invalid request error caught: {e}")
        return True
    except Exception as e:
        print(f"✗ Unexpected error: {e}")
        return False

# Run tests
print("Testing error handling...")
test_invalid_key()
test_invalid_model()
```

### Task 2.2: Implement Comprehensive Error Handling

**Create a robust API call function:**

```python
import time

def safe_api_call(messages, max_retries=3):
    """
    Make an API call with comprehensive error handling
    
    Args:
        messages: List of message dicts
        max_retries: Maximum retry attempts
    
    Returns:
        Response content or None if failed
    """
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                timeout=30
            )
            return response.choices[0].message.content
        
        except AuthenticationError as e:
            print(f"❌ Authentication failed: {e}")
            return None  # Don't retry auth errors
        
        except RateLimitError as e:
            if attempt == max_retries - 1:
                print(f"❌ Rate limit exceeded after {max_retries} attempts")
                return None
            wait_time = (2 ** attempt)  # Exponential backoff
            print(f"⏳ Rate limited. Waiting {wait_time}s before retry...")
            time.sleep(wait_time)
        
        except APIConnectionError as e:
            if attempt == max_retries - 1:
                print(f"❌ Connection failed after {max_retries} attempts")
                return None
            print(f"⏳ Connection error. Retrying (attempt {attempt + 1}/{max_retries})...")
            time.sleep(1)
        
        except InvalidRequestError as e:
            print(f"❌ Invalid request: {e}")
            return None  # Don't retry invalid requests
        
        except APIError as e:
            if attempt == max_retries - 1:
                print(f"❌ API error after {max_retries} attempts: {e}")
                return None
            print(f"⏳ API error. Retrying...")
            time.sleep(2 ** attempt)
    
    return None

# Test the function
test_messages = [
    {"role": "user", "content": "What is 2+2?"}
]
result = safe_api_call(test_messages)
print(f"Result: {result}")
```

### Task 2.3: Add Input Validation

**Create input validation:**

```python
def validate_input(text, max_length=4000):
    """
    Validate user input before API call
    
    Args:
        text: Input text to validate
        max_length: Maximum allowed length
    
    Returns:
        Validated text
    
    Raises:
        ValueError: If validation fails
    """
    if not text or not text.strip():
        raise ValueError("Input cannot be empty")
    
    if len(text) > max_length:
        raise ValueError(f"Input too long: {len(text)} chars (max: {max_length})")
    
    return text.strip()

# Test validation
try:
    validate_input("")
except ValueError as e:
    print(f"✓ Empty input caught: {e}")

try:
    validate_input("x" * 5000)
except ValueError as e:
    print(f"✓ Long input caught: {e}")
```

**Deliverable:** Working error handling code that catches all error types.

**Questions:**
1. Why shouldn't we retry authentication errors?
2. What is exponential backoff and why is it useful?
3. How would you test the connection error handling?

---

## Part 3: Rate Limiting Implementation (25 minutes)

### Task 3.1: Implement Simple Rate Limiter

**Create a rate limiter class:**

```python
import time
from collections import deque

class RateLimiter:
    """Simple rate limiter using token bucket algorithm"""
    
    def __init__(self, max_requests, time_window):
        """
        Args:
            max_requests: Maximum requests allowed
            time_window: Time window in seconds
        """
        self.max_requests = max_requests
        self.time_window = time_window
        self.requests = deque()
    
    def acquire(self):
        """
        Wait if necessary and acquire permission to make request
        """
        now = time.time()
        
        # Remove requests outside the time window
        while self.requests and self.requests[0] < now - self.time_window:
            self.requests.popleft()
        
        # Check if we can make a request
        if len(self.requests) >= self.max_requests:
            # Calculate wait time
            oldest_request = self.requests[0]
            wait_time = (oldest_request + self.time_window) - now
            
            if wait_time > 0:
                print(f"⏳ Rate limit: waiting {wait_time:.1f}s...")
                time.sleep(wait_time)
                return self.acquire()  # Try again after waiting
        
        # Record this request
        self.requests.append(now)
        return True

# Create rate limiter: 3 requests per 60 seconds (free tier simulation)
limiter = RateLimiter(max_requests=3, time_window=60)

def rate_limited_call(message):
    """Make API call with rate limiting"""
    limiter.acquire()  # Wait if necessary
    
    messages = [{"role": "user", "content": message}]
    return safe_api_call(messages)
```

### Task 3.2: Test Rate Limiting

**Test with multiple requests:**

```python
def test_rate_limiting():
    """Test rate limiter with 5 requests"""
    print("\n=== Testing Rate Limiter ===")
    print("Making 5 requests (limit: 3 per 60s)...\n")
    
    questions = [
        "What is Python?",
        "What is JavaScript?",
        "What is Rust?",
        "What is Go?",
        "What is Java?"
    ]
    
    start_time = time.time()
    
    for i, question in enumerate(questions, 1):
        print(f"\n[Request {i}]")
        result = rate_limited_call(question)
        
        if result:
            print(f"✓ Response: {result[:100]}...")
        else:
            print("✗ Request failed")
    
    elapsed = time.time() - start_time
    print(f"\n=== Test Complete ===")
    print(f"Total time: {elapsed:.1f}s")
    print(f"Expected minimum: ~60s (due to rate limit)")

# Run the test
if __name__ == "__main__":
    test_rate_limiting()
```

### Task 3.3: Add Usage Tracking

**Create usage tracker:**

```python
class UsageTracker:
    """Track API usage and costs"""
    
    def __init__(self):
        self.total_tokens = 0
        self.total_requests = 0
        self.total_cost = 0.0
        self.start_time = time.time()
    
    def track(self, response):
        """Track usage from API response"""
        if not response:
            return
        
        usage = response.usage
        self.total_tokens += usage.total_tokens
        self.total_requests += 1
        
        # Calculate cost (GPT-3.5-turbo rates)
        prompt_cost = usage.prompt_tokens * 0.0015 / 1000
        completion_cost = usage.completion_tokens * 0.002 / 1000
        self.total_cost += (prompt_cost + completion_cost)
    
    def report(self):
        """Generate usage report"""
        elapsed = time.time() - self.start_time
        
        return {
            'requests': self.total_requests,
            'tokens': self.total_tokens,
            'cost': f'${self.total_cost:.4f}',
            'duration': f'{elapsed:.1f}s',
            'tokens_per_request': (
                f'{self.total_tokens / self.total_requests:.1f}' 
                if self.total_requests > 0 else '0'
            )
        }

# Initialize tracker
tracker = UsageTracker()

def tracked_api_call(messages):
    """Make API call and track usage"""
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    tracker.track(response)
    return response.choices[0].message.content

# Test tracking
tracked_api_call([{"role": "user", "content": "Hello!"}])
print("\nUsage Report:")
for key, value in tracker.report().items():
    print(f"  {key}: {value}")
```

**Deliverable:** Working rate limiter that prevents exceeding limits.

**Questions:**
1. What happens when you make 4 requests quickly with a 3/minute limit?
2. How would you modify the rate limiter for a TPM (tokens per minute) limit?
3. Why is the token bucket algorithm better than simply counting requests?

---

## Part 4: Production-Ready Integration (25 minutes)

### Task 4.1: Create Configuration Class

**Build configuration management:**

```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class AIConfig:
    """Configuration for AI API integration"""
    
    api_key: str
    model: str = "gpt-3.5-turbo"
    temperature: float = 0.7
    max_tokens: int = 500
    timeout: int = 30
    max_retries: int = 3
    requests_per_minute: int = 3
    
    def __post_init__(self):
        """Validate configuration"""
        if not self.api_key:
            raise ValueError("API key is required")
        
        if not 0 <= self.temperature <= 2:
            raise ValueError("Temperature must be between 0 and 2")
        
        if self.max_tokens < 1:
            raise ValueError("max_tokens must be positive")
        
        if self.max_retries < 0:
            raise ValueError("max_retries must be non-negative")
    
    @classmethod
    def from_env(cls):
        """Create config from environment variables"""
        return cls(
            api_key=os.getenv('OPENAI_API_KEY'),
            model=os.getenv('OPENAI_MODEL', 'gpt-3.5-turbo'),
            temperature=float(os.getenv('OPENAI_TEMPERATURE', '0.7')),
            max_tokens=int(os.getenv('OPENAI_MAX_TOKENS', '500'))
        )

# Test configuration
config = AIConfig.from_env()
print(f"Config loaded: model={config.model}, temp={config.temperature}")
```

### Task 4.2: Build Complete AI Client

**Create comprehensive client:**

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIClient:
    """Production-ready AI API client"""
    
    def __init__(self, config: AIConfig):
        self.config = config
        self.client = OpenAI(api_key=config.api_key)
        self.limiter = RateLimiter(
            max_requests=config.requests_per_minute,
            time_window=60
        )
        self.tracker = UsageTracker()
    
    def chat(self, message: str, system_prompt: Optional[str] = None):
        """
        Send a chat message and get response
        
        Args:
            message: User message
            system_prompt: Optional system prompt
        
        Returns:
            Response content or None if failed
        """
        # Validate input
        try:
            message = validate_input(message)
        except ValueError as e:
            logger.error(f"Validation error: {e}")
            return None
        
        # Build messages
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": message})
        
        # Rate limit
        self.limiter.acquire()
        
        # Make API call with error handling
        for attempt in range(self.config.max_retries):
            try:
                logger.info(f"API call attempt {attempt + 1}")
                
                response = self.client.chat.completions.create(
                    model=self.config.model,
                    messages=messages,
                    temperature=self.config.temperature,
                    max_tokens=self.config.max_tokens,
                    timeout=self.config.timeout
                )
                
                # Track usage
                self.tracker.track(response)
                
                content = response.choices[0].message.content
                logger.info(f"Success. Tokens: {response.usage.total_tokens}")
                
                return content
            
            except (RateLimitError, APIConnectionError, APIError) as e:
                if attempt == self.config.max_retries - 1:
                    logger.error(f"Failed after {self.config.max_retries} attempts: {e}")
                    return None
                
                wait_time = 2 ** attempt
                logger.warning(f"Error: {e}. Retrying in {wait_time}s...")
                time.sleep(wait_time)
            
            except (AuthenticationError, InvalidRequestError) as e:
                logger.error(f"Permanent error: {e}")
                return None
        
        return None
    
    def get_usage_report(self):
        """Get usage statistics"""
        return self.tracker.report()

# Initialize client
config = AIConfig.from_env()
ai_client = AIClient(config)

# Test the client
response = ai_client.chat(
    message="Explain rate limiting in one sentence.",
    system_prompt="You are a helpful technical assistant."
)

print(f"\nResponse: {response}")
print(f"\nUsage: {ai_client.get_usage_report()}")
```

### Task 4.3: Create Interactive Demo

**Build command-line interface:**

```python
def interactive_demo():
    """Interactive command-line demo"""
    print("=" * 50)
    print("AI Integration Demo")
    print("=" * 50)
    print("\nCommands:")
    print("  - Type a message to chat")
    print("  - Type 'usage' to see statistics")
    print("  - Type 'quit' to exit")
    print()
    
    while True:
        user_input = input("You: ").strip()
        
        if not user_input:
            continue
        
        if user_input.lower() == 'quit':
            print("\nGoodbye!")
            break
        
        if user_input.lower() == 'usage':
            report = ai_client.get_usage_report()
            print("\n📊 Usage Report:")
            for key, value in report.items():
                print(f"  {key}: {value}")
            print()
            continue
        
        print("AI: ", end="", flush=True)
        response = ai_client.chat(user_input)
        
        if response:
            print(response)
        else:
            print("[Error: Could not get response]")
        print()

if __name__ == "__main__":
    interactive_demo()
```

**Deliverable:** Working command-line application with all features.

**Questions:**
1. What are the benefits of the configuration class?
2. Why is logging important in production?
3. How would you extend this to support multiple AI providers?

---

## Exercise Deliverables

Submit the following:

### 1. Code Files
- `app.py` with all functions implemented
- `.env` file (with dummy key, not real key)
- `requirements.txt`:
  ```
  openai>=1.0.0
  python-dotenv>=1.0.0
  ```

### 2. Documentation
Create `README.md` for your project:

```markdown
# AI Integration Lab

## Setup
1. Install dependencies: `pip install -r requirements.txt`
2. Create `.env` file with `OPENAI_API_KEY=your-key`
3. Run: `python app.py`

## Features
- ✅ Secure API key management
- ✅ Comprehensive error handling
- ✅ Rate limiting (3 req/min)
- ✅ Usage tracking
- ✅ Interactive CLI

## Usage
[Add screenshots or examples]

## Questions Answered
[Your answers to exercise questions]
```

### 3. Test Results
Screenshot or output showing:
- Successful API call
- Error handling working
- Rate limiter in action
- Usage report

### 4. Reflection
Answer these questions (2-3 sentences each):

1. **What was the most challenging part?**
2. **How would you improve this code for production?**
3. **What did you learn about API integration?**
4. **How would you handle multiple API providers?**

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| **Part 1: Setup** | 15 | Environment configured, first API call successful |
| **Part 2: Error Handling** | 30 | All error types handled, validation implemented |
| **Part 3: Rate Limiting** | 30 | Rate limiter works correctly, usage tracked |
| **Part 4: Production Ready** | 20 | Config class, complete client, interactive demo |
| **Documentation** | 5 | README and code comments |
| **Total** | **100** | |

### Detailed Criteria

**Part 1 (15 points):**
- 5 pts: Environment properly set up
- 5 pts: API call succeeds
- 5 pts: Output correctly displayed

**Part 2 (30 points):**
- 10 pts: All error types caught
- 10 pts: Retry logic implemented correctly
- 10 pts: Input validation working

**Part 3 (30 points):**
- 15 pts: Rate limiter functions correctly
- 10 pts: Exponential backoff implemented
- 5 pts: Usage tracking accurate

**Part 4 (20 points):**
- 7 pts: Configuration class complete
- 8 pts: AIClient class fully functional
- 5 pts: Interactive demo works

**Documentation (5 points):**
- 3 pts: README complete
- 2 pts: Code has comments

---

## Bonus Challenges (Optional)

### Bonus 1: Add Streaming Support (+5 pts)
Implement streaming responses:

```python
def stream_chat(message):
    """Stream response token by token"""
    for chunk in client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": message}],
        stream=True
    ):
        if chunk.choices[0].delta.content:
            print(chunk.choices[0].delta.content, end="", flush=True)
```

### Bonus 2: Add Caching (+5 pts)
Implement response caching:

```python
import hashlib
import json

class ResponseCache:
    def __init__(self):
        self.cache = {}
    
    def get_key(self, messages):
        content = json.dumps(messages, sort_keys=True)
        return hashlib.md5(content.encode()).hexdigest()
    
    def get(self, messages):
        return self.cache.get(self.get_key(messages))
    
    def set(self, messages, response):
        self.cache[self.get_key(messages)] = response
```

### Bonus 3: Add Async Support (+5 pts)
Implement async API calls:

```python
import asyncio
from openai import AsyncOpenAI

async_client = AsyncOpenAI(api_key=os.getenv('OPENAI_API_KEY'))

async def async_chat(message):
    response = await async_client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": message}]
    )
    return response.choices[0].message.content
```

---

## Common Issues and Solutions

### Issue 1: "AuthenticationError: Invalid API key"
**Solution:** Check that your API key in `.env` is correct and complete.

### Issue 2: "RateLimitError" immediately
**Solution:** You may have exhausted your free quota. Check platform.openai.com/usage.

### Issue 3: Import errors
**Solution:** Ensure you activated your virtual environment and installed packages.

### Issue 4: `.env` not loading
**Solution:** Check that `.env` is in the same directory as `app.py` and `load_dotenv()` is called.

---

## Next Steps

After completing this exercise:
1. Review the solutions guide
2. Compare your implementation with best practices
3. Prepare for Module 2: Building with LangChain
4. Keep your code for the final project

---

*Exercise 1 of 6 | Building AI-Powered Applications | Duration: 90 minutes*
