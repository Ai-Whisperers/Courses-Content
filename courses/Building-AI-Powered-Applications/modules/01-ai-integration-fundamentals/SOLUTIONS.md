# Module 1 Exercise: Solutions Guide

## Instructor Notes

This solutions guide provides complete answers, expected student responses, common mistakes, and grading guidance for the Module 1 exercise.

**Time to Complete:** 90 minutes (student)  
**Time to Grade:** 15-20 minutes per submission  
**Difficulty Level:** Beginner to Intermediate

---

## Part 1 Solutions: Setup and First API Call (20 minutes)

### Task 1.1-1.3: Expected Implementation

**Complete working `app.py`:**

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

### Expected Output

```
Response: Greetings, Earth! 🌍 Welcome to the wonderful world of programming where 'Hello, World!' marks the beginning of countless possibilities!
Tokens used: 45
```

**Note:** Exact response will vary due to temperature setting, but should be creative and include the phrase or concept of "Hello, World!"

### Task 1.4: Question Answers

**Q1: Did your API call succeed?**
- **Expected:** Yes
- **If No:** Check API key, internet connection, or quota

**Q2: How many tokens were used?**
- **Expected:** Approximately 30-60 tokens
- **Breakdown:** ~20 prompt tokens + ~20-40 completion tokens

**Q3: What happens if you run it again?**
- **Expected:** Different output (temperature > 0 means randomness)
- **Key Point:** Students should understand non-determinism

### Common Mistakes

**Mistake 1: Hardcoded API key**
```python
# WRONG
client = OpenAI(api_key="sk-proj-abc123...")
```
**Fix:** Use environment variables

**Mistake 2: Forgot to activate venv**
```bash
# They run: pip install openai
# But packages install globally
```
**Fix:** Ensure `(venv)` shows in terminal prompt

**Mistake 3: `.env` in wrong location**
```
project/
  src/
    app.py  # <- running from here
  .env      # <- .env is here (wrong!)
```
**Fix:** `.env` should be where you run `python app.py`

**Mistake 4: Not handling missing API key**
```python
# Will crash if OPENAI_API_KEY not set
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
```
**Better:**
```python
api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise ValueError("OPENAI_API_KEY environment variable not set")
client = OpenAI(api_key=api_key)
```

### Grading Criteria (15 points)

- **5 pts:** Environment properly configured
  - ✅ Virtual environment created and activated
  - ✅ Dependencies installed
  - ✅ `.env` file created with API key
  - ✅ `.gitignore` includes `.env`

- **5 pts:** API call succeeds
  - ✅ Code runs without errors
  - ✅ Response received from OpenAI
  - ✅ Using environment variable for API key

- **5 pts:** Output correctly displayed
  - ✅ Response content printed
  - ✅ Token usage displayed
  - ✅ Questions answered correctly

---

## Part 2 Solutions: Error Handling (30 minutes)

### Task 2.1: Test Error Scenarios - Expected Implementation

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
```

### Task 2.2: Comprehensive Error Handling - Complete Solution

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
```

### Question Answers

**Q1: Why shouldn't we retry authentication errors?**

**Expected Answer:**
Authentication errors indicate invalid credentials. Retrying won't fix the issue and will waste API calls. These are permanent errors that require user intervention (fixing the API key).

**Key Points Students Should Mention:**
- Authentication errors are permanent, not transient
- Retrying wastes time and resources
- Need to fix the API key, not retry
- Different from network errors (which are transient)

**Q2: What is exponential backoff and why is it useful?**

**Expected Answer:**
Exponential backoff means waiting progressively longer between retries (1s, 2s, 4s, 8s, etc.). It's useful because:
- Gives the service time to recover if overloaded
- Prevents overwhelming the API with retries
- Industry standard practice
- Reduces "thundering herd" problem

**Formula:** wait_time = 2^attempt (or similar exponential growth)

**Q3: How would you test the connection error handling?**

**Expected Answer:**
- Disconnect from internet and run the code
- Use a mock that raises `APIConnectionError`
- Use a timeout to simulate network issues
- Point to an invalid endpoint

**Example with mock:**
```python
from unittest.mock import patch

with patch('openai.OpenAI') as mock:
    mock.return_value.chat.completions.create.side_effect = APIConnectionError()
    result = safe_api_call([...])
    # Should retry and eventually return None
```

### Task 2.3: Input Validation - Expected Implementation

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
```

### Common Mistakes

**Mistake 1: Catching all exceptions with bare except**
```python
# WRONG - too broad
try:
    response = client.chat.completions.create(...)
except:
    print("Error occurred")
```
**Fix:** Catch specific exceptions

**Mistake 2: Retrying non-transient errors**
```python
# WRONG - retrying authentication errors
except AuthenticationError:
    time.sleep(2)
    # retry... (won't help!)
```

**Mistake 3: No exponential backoff**
```python
# WRONG - constant wait time
except RateLimitError:
    time.sleep(1)  # Always 1 second
```
**Fix:** Use exponential: `2 ** attempt`

**Mistake 4: Not checking attempt count**
```python
# WRONG - infinite loop potential
for attempt in range(max_retries):
    try:
        ...
    except RateLimitError:
        time.sleep(2 ** attempt)
        # Forgot to check if last attempt!
```

### Grading Criteria (30 points)

- **10 pts:** All error types handled
  - ✅ AuthenticationError (no retry)
  - ✅ RateLimitError (with backoff)
  - ✅ APIConnectionError (with retry)
  - ✅ InvalidRequestError (no retry)
  - ✅ APIError (with retry)

- **10 pts:** Retry logic implemented correctly
  - ✅ Exponential backoff used
  - ✅ Max retries respected
  - ✅ Appropriate errors don't retry
  - ✅ Wait times are reasonable

- **10 pts:** Input validation working
  - ✅ Empty input rejected
  - ✅ Too-long input rejected
  - ✅ Whitespace trimmed
  - ✅ Valid input passes through

---

## Part 3 Solutions: Rate Limiting (25 minutes)

### Task 3.1: Rate Limiter - Complete Solution

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
```

### Task 3.2: Testing - Expected Behavior

**Test Code:**
```python
def test_rate_limiting():
    """Test rate limiter with 5 requests"""
    limiter = RateLimiter(max_requests=3, time_window=60)
    
    start_time = time.time()
    
    for i in range(5):
        print(f"Request {i+1}")
        limiter.acquire()
        print(f"  Allowed at {time.time() - start_time:.1f}s")
    
    elapsed = time.time() - start_time
    print(f"\nTotal time: {elapsed:.1f}s")
```

**Expected Output:**
```
Request 1
  Allowed at 0.0s
Request 2
  Allowed at 0.0s
Request 3
  Allowed at 0.0s
Request 4
⏳ Rate limit: waiting 60.0s...
  Allowed at 60.0s
Request 5
⏳ Rate limit: waiting 60.0s...
  Allowed at 120.0s

Total time: 120.0s
```

### Task 3.3: Usage Tracking - Complete Solution

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
        
        # Calculate cost (GPT-3.5-turbo rates as of Jan 2024)
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
```

### Question Answers

**Q1: What happens when you make 4 requests quickly with a 3/minute limit?**

**Expected Answer:**
- First 3 requests go through immediately (0.0s, 0.0s, 0.0s)
- 4th request waits ~60 seconds (until first request drops out of window)
- Rate limiter blocks and sleeps until a slot is available

**Key Concept:** Sliding window - oldest request must age out before new one can proceed.

**Q2: How would you modify the rate limiter for TPM (tokens per minute) limit?**

**Expected Answer:**
Instead of counting requests, track tokens used:

```python
class TokenRateLimiter:
    def __init__(self, max_tokens_per_minute):
        self.max_tokens = max_tokens_per_minute
        self.token_usage = deque()  # (timestamp, token_count) tuples
    
    def acquire(self, estimated_tokens):
        now = time.time()
        
        # Remove old entries
        while self.token_usage and self.token_usage[0][0] < now - 60:
            self.token_usage.popleft()
        
        # Calculate current usage
        current_tokens = sum(tokens for _, tokens in self.token_usage)
        
        if current_tokens + estimated_tokens > self.max_tokens:
            # Wait until enough tokens available
            wait_time = 60 - (now - self.token_usage[0][0])
            time.sleep(wait_time)
            return self.acquire(estimated_tokens)
        
        self.token_usage.append((now, estimated_tokens))
        return True
```

**Q3: Why is token bucket algorithm better than simple counting?**

**Expected Answer:**
- **Sliding window** vs fixed window (more accurate)
- **Handles bursts** gracefully
- **Fairness** - doesn't penalize single slow request
- **Precision** - tracks exact timing, not just count

**Example of fixed window problem:**
```
Fixed Window (1 min blocks):
  11:00:59 - 3 requests (OK)
  11:01:00 - 3 requests (OK)
  Total: 6 requests in 1 second! (burst)

Sliding Window (token bucket):
  11:00:59 - 3 requests
  11:01:00 - must wait 59 seconds for slots
  Total: Enforces true 3 per 60 seconds
```

### Common Mistakes

**Mistake 1: Not using deque**
```python
# WRONG - O(n) operations
self.requests = []
self.requests = [r for r in self.requests if r > now - 60]
```
**Fix:** Use `deque` with `popleft()` for O(1)

**Mistake 2: Off-by-one in time window**
```python
# WRONG
if self.requests[0] + self.time_window < now:
```
**Fix:** Use `<=` or proper comparison

**Mistake 3: Not recursively calling after sleep**
```python
# WRONG - might still hit limit after sleep
if len(self.requests) >= self.max_requests:
    time.sleep(wait_time)
    # Just continues without checking again!
```
**Fix:** Recursive call or loop

### Grading Criteria (30 points)

- **15 pts:** Rate limiter functions correctly
  - ✅ Allows requests up to limit
  - ✅ Blocks when limit reached
  - ✅ Releases slots as time passes
  - ✅ Sliding window implementation

- **10 pts:** Exponential backoff implemented
  - ✅ Wait time increases with retries
  - ✅ Formula is exponential (2^n)
  - ✅ Applied to rate limit errors

- **5 pts:** Usage tracking accurate
  - ✅ Counts requests correctly
  - ✅ Tracks tokens accurately
  - ✅ Calculates cost properly
  - ✅ Report is readable

---

## Part 4 Solutions: Production-Ready Integration (25 minutes)

### Task 4.1: Configuration Class - Complete Solution

```python
from dataclasses import dataclass
from typing import Optional
import os

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
            api_key=os.getenv('OPENAI_API_KEY', ''),
            model=os.getenv('OPENAI_MODEL', 'gpt-3.5-turbo'),
            temperature=float(os.getenv('OPENAI_TEMPERATURE', '0.7')),
            max_tokens=int(os.getenv('OPENAI_MAX_TOKENS', '500'))
        )
```

### Task 4.2: Complete AI Client - Full Solution

**See exercise file for complete AIClient implementation**

### Task 4.3: Interactive Demo - Expected Implementation

**See exercise file for complete interactive_demo() implementation**

### Question Answers

**Q1: What are the benefits of the configuration class?**

**Expected Answer:**
- **Centralized** configuration in one place
- **Validation** at initialization time
- **Type safety** with dataclass and type hints
- **Easy testing** - can create test configs
- **Environment flexibility** - from_env() method
- **Documentation** - clear what's configurable

**Q2: Why is logging important in production?**

**Expected Answer:**
- **Debugging** - understand what happened when issues occur
- **Monitoring** - track usage patterns and errors
- **Auditing** - record API calls for compliance
- **Performance** - identify bottlenecks
- **Cost tracking** - see where money is spent
- **Alerting** - can set up alerts on log patterns

**Q3: How would you extend this to support multiple AI providers?**

**Expected Answer:**
```python
from abc import ABC, abstractmethod

class AIProvider(ABC):
    @abstractmethod
    def chat(self, message: str) -> str:
        pass

class OpenAIProvider(AIProvider):
    def __init__(self, config):
        self.client = OpenAI(api_key=config.api_key)
    
    def chat(self, message: str) -> str:
        # OpenAI implementation
        pass

class AnthropicProvider(AIProvider):
    def __init__(self, config):
        self.client = Anthropic(api_key=config.api_key)
    
    def chat(self, message: str) -> str:
        # Anthropic implementation
        pass

class AIClient:
    def __init__(self, provider: AIProvider):
        self.provider = provider
    
    def chat(self, message: str) -> str:
        return self.provider.chat(message)
```

**Key Points:**
- Abstract base class for interface
- Provider-specific implementations
- Client accepts any provider
- Strategy pattern

### Common Mistakes

**Mistake 1: No validation in config**
```python
# WRONG - accepts invalid values
@dataclass
class AIConfig:
    temperature: float = -5.0  # Invalid!
```

**Mistake 2: Config not reusable**
```python
# WRONG - hardcoded values
class AIClient:
    def __init__(self):
        self.model = "gpt-3.5-turbo"  # Can't change
```

**Mistake 3: No logging**
```python
# WRONG - print instead of log
def chat(self, message):
    print("Making API call...")  # Not logged
```

**Mistake 4: Blocking in interactive demo**
```python
# WRONG - long operation blocks UI
response = slow_api_call()  # User can't cancel
```

### Grading Criteria (20 points)

- **7 pts:** Configuration class complete
  - ✅ All required fields present
  - ✅ Validation in __post_init__
  - ✅ from_env() class method
  - ✅ Type hints used

- **8 pts:** AIClient class fully functional
  - ✅ Integrates all previous components
  - ✅ Rate limiting applied
  - ✅ Error handling works
  - ✅ Usage tracking included
  - ✅ Logging implemented

- **5 pts:** Interactive demo works
  - ✅ Accepts user input
  - ✅ Displays responses
  - ✅ Shows usage on command
  - ✅ Clean exit
  - ✅ Error handling

---

## Overall Grading Summary

### Point Distribution
- Part 1: 15 points (Setup)
- Part 2: 30 points (Error Handling)
- Part 3: 30 points (Rate Limiting)
- Part 4: 20 points (Production Ready)
- Documentation: 5 points
- **Total: 100 points**

### Grade Boundaries
- **A (90-100):** Excellent implementation, all features working
- **B (80-89):** Good implementation, minor issues
- **C (70-79):** Acceptable, some features incomplete
- **D (60-69):** Basic functionality, multiple issues
- **F (<60):** Incomplete or non-functional

### Common Reasons for Point Deductions

**-5 pts:** API key hardcoded (major security issue)
**-3 pts:** Missing error type in error handling
**-5 pts:** Rate limiter doesn't work correctly
**-3 pts:** No input validation
**-2 pts:** Poor or missing documentation
**-2 pts:** No code comments
**-3 pts:** Retry logic doesn't use exponential backoff
**-5 pts:** Interactive demo doesn't work

---

## Teaching Tips

### Common Student Struggles

**1. Understanding async/await**
- This exercise uses sync code (simpler)
- Mention async exists for advanced cases
- Don't require it for this module

**2. Environment variable confusion**
- Many students new to `.env` files
- Show where file should be located
- Explain why we use them (security)

**3. Rate limiting math**
- Sliding window concept is tricky
- Use visual diagrams
- Walk through examples step-by-step

**4. Error handling exhaustiveness**
- Students often use bare `except:`
- Emphasize specific exception types
- Explain transient vs permanent errors

### Extension Activities

**For Advanced Students:**
1. Add async/await support
2. Implement response caching
3. Add support for streaming responses
4. Create a web interface (Flask/FastAPI)
5. Add persistent usage tracking (SQLite)

**For Struggling Students:**
1. Focus on Parts 1-2 only
2. Provide more scaffolding code
3. Pair programming sessions
4. Simplified rate limiter (fixed delays)

---

## Reflection Question Model Answers

### Q1: What was the most challenging part?

**Good Student Answer:**
"The rate limiting implementation was most challenging. Understanding the sliding window algorithm and when to remove old requests took time. I had to debug why my first attempt allowed too many requests - I wasn't properly checking the time window. Once I understood the token bucket concept, it made more sense."

**What to Look For:**
- Specific challenge identified
- Explanation of the difficulty
- How they overcame it
- Technical understanding demonstrated

### Q2: How would you improve this code for production?

**Good Student Answer:**
"For production, I would add: (1) Persistent logging to files instead of just print statements, (2) More robust error recovery with exponential backoff and jitter, (3) Configuration from environment variables for all settings, (4) Monitoring and alerting integration, (5) Unit tests for all components, (6) Async support for handling multiple requests concurrently."

**What to Look For:**
- Multiple specific improvements
- Understanding of production requirements
- Awareness of testing needs
- Scalability considerations

### Q3: What did you learn about API integration?

**Good Student Answer:**
"I learned that API integration is more than just making HTTP requests. Proper error handling is critical - you need to handle different error types differently. Rate limiting is necessary to stay within quotas. Security matters - never commit API keys. Validation and logging are important for production systems. The OpenAI SDK handles many details automatically."

**What to Look For:**
- Multiple concepts mentioned
- Beyond surface-level understanding
- Security awareness
- Production thinking

### Q4: How would you handle multiple API providers?

**Good Student Answer:**
"I would create an abstract base class or interface that defines the common methods (like chat()). Then create provider-specific classes that implement this interface for OpenAI, Anthropic, etc. The main client would accept any provider that implements the interface. This would allow switching providers without changing client code."

**What to Look For:**
- Design pattern knowledge (Strategy pattern)
- Abstraction concepts
- Code reusability
- Polymorphism understanding

---

## FAQ for Graders

**Q: Student's code works but structure is different. How to grade?**
**A:** Grade on functionality and best practices, not exact code match. If they solve the problem correctly with good practices, give full points.

**Q: Student went beyond requirements (e.g., added GUI). Bonus points?**
**A:** Yes, note it in feedback. Consider +2-5 bonus points for significant extras.

**Q: Student's rate limiter uses different algorithm. Is that OK?**
**A:** Yes, if it correctly limits requests. Sliding window is preferred, but other correct algorithms are acceptable.

**Q: Code works but has no comments. Deduct points?**
**A:** Yes, deduct 1-2 points from documentation score. Comments are part of professional code.

**Q: Student admits using ChatGPT/Copilot. Is that cheating?**
**A:** No, if they understand the code. Ask follow-up questions. Using AI tools is acceptable and realistic.

---

**End of Solutions Guide**

*Module 1 Solutions | Building AI-Powered Applications*  
*Use for grading and teaching reference*
