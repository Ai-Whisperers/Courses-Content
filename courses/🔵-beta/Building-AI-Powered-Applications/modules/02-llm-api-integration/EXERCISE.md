# Module 2 Exercise: LLM API Integration Lab

## Exercise Overview

**Objective**: Build a production-ready API integration layer with support for multiple providers, streaming, error handling, and rate limiting.

**Duration**: 3 hours

**Language**: Python (with optional Node.js equivalents)

**Prerequisites**:
- OpenAI API key
- Anthropic API key
- Python 3.10+ or Node.js 18+

---

## Part 1: Basic API Integration (30 minutes)

### Task 1.1: OpenAI Setup and First Request

Set up your environment and make your first OpenAI API call.

**Step 1**: Install dependencies
```bash
pip install openai python-dotenv
```

**Step 2**: Create `.env` file
```
OPENAI_API_KEY=sk-your-key-here
```

**Step 3**: Complete this code:

```python
# basic_openai.py
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

# TODO: Initialize the OpenAI client
client = _______________

# TODO: Make a chat completion request
response = client.chat.completions.create(
    model="_______________",  # Use gpt-4o
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "What is an API? Explain in 2 sentences."}
    ],
    temperature=___,  # Use 0.7
    max_tokens=___    # Use 100
)

# TODO: Print the response content
print(_______________)

# TODO: Print token usage
print(f"Tokens used: {_______________}")
```

**Expected Output:**
```
An API (Application Programming Interface) is a set of protocols and tools that allows different software applications to communicate with each other. It defines the methods and data formats that programs can use to request and exchange information.
Tokens used: 75
```

**Your Results:**
```
[Paste your output here]
```

### Task 1.2: Anthropic Setup

Set up Anthropic and make an equivalent request.

```python
# basic_anthropic.py
import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

# TODO: Initialize the Anthropic client
client = _______________

# TODO: Make a message request
response = client.messages.create(
    model="_______________",  # Use claude-3-5-sonnet-20241022
    max_tokens=100,
    system="You are a helpful coding assistant.",
    messages=[
        {"role": "user", "content": "What is an API? Explain in 2 sentences."}
    ]
)

# TODO: Print the response content (note: different structure than OpenAI)
print(_______________)

# TODO: Print token usage
print(f"Input tokens: {_______________}")
print(f"Output tokens: {_______________}")
```

**Your Results:**
```
[Paste your output here]
```

### Task 1.3: Compare Responses

Run both scripts with the same prompt and compare:

| Aspect | OpenAI GPT-4o | Claude 3.5 Sonnet |
|--------|---------------|-------------------|
| Response quality | | |
| Response length | | |
| Latency (rough) | | |
| Token usage | | |

---

## Part 2: Streaming Implementation (35 minutes)

### Task 2.1: OpenAI Streaming

Implement streaming output from OpenAI:

```python
# streaming_openai.py
import os
import time
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()

def stream_openai(prompt: str):
    """Stream a response from OpenAI."""
    start_time = time.time()

    # TODO: Create a streaming completion
    stream = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        stream=___  # Enable streaming
    )

    full_response = ""

    # TODO: Iterate over the stream and print each chunk
    for chunk in stream:
        # Get the content delta (may be None)
        content = _______________
        if content:
            print(content, end="", flush=True)
            full_response += content

    print()  # Newline at end

    elapsed = time.time() - start_time
    print(f"\n--- Completed in {elapsed:.2f}s ---")
    print(f"Total length: {len(full_response)} characters")

    return full_response

# Test it
stream_openai("Write a haiku about programming.")
```

**Observation Questions:**
1. How does streaming affect perceived latency?
2. What is the `finish_reason` for a complete response?

### Task 2.2: Anthropic Streaming

Implement streaming for Anthropic:

```python
# streaming_anthropic.py
import os
import time
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()
client = Anthropic()

def stream_anthropic(prompt: str):
    """Stream a response from Anthropic."""
    start_time = time.time()
    full_response = ""

    # TODO: Create a streaming message using context manager
    with client.messages.stream(
        model="claude-3-5-sonnet-20241022",
        max_tokens=500,
        messages=[{"role": "user", "content": prompt}]
    ) as stream:
        # TODO: Iterate over text_stream
        for text in _______________:
            print(text, end="", flush=True)
            full_response += text

    print()

    elapsed = time.time() - start_time
    print(f"\n--- Completed in {elapsed:.2f}s ---")

    return full_response

# Test it
stream_anthropic("Write a haiku about programming.")
```

### Task 2.3: Streaming Comparison

Run both streaming implementations and compare:

| Metric | OpenAI | Anthropic |
|--------|--------|-----------|
| Time to first token | | |
| Total completion time | | |
| Smoothness of output | | |

---

## Part 3: Error Handling (35 minutes)

### Task 3.1: Implement Retry Logic

Build a robust retry mechanism:

```python
# retry_handler.py
import time
import random
from typing import Callable, TypeVar
from openai import OpenAI, RateLimitError, APIError, APIConnectionError

T = TypeVar('T')

def retry_with_backoff(
    func: Callable[[], T],
    max_retries: int = 3,
    base_delay: float = 1.0,
    max_delay: float = 60.0,
    jitter: bool = True
) -> T:
    """
    Execute a function with exponential backoff retry.

    Args:
        func: Function to execute
        max_retries: Maximum number of retry attempts
        base_delay: Initial delay in seconds
        max_delay: Maximum delay cap in seconds
        jitter: Add randomness to prevent thundering herd

    Returns:
        Result of the function

    Raises:
        The last exception if all retries fail
    """
    last_exception = None

    for attempt in range(max_retries + 1):
        try:
            return func()

        except RateLimitError as e:
            last_exception = e
            if attempt == max_retries:
                raise

            # TODO: Calculate delay with exponential backoff
            delay = min(_______________, max_delay)

            # TODO: Add jitter if enabled (multiply delay by random 0.5-1.5)
            if jitter:
                delay = _______________

            print(f"Rate limited. Retry {attempt + 1}/{max_retries} in {delay:.1f}s")
            time.sleep(delay)

        except APIConnectionError as e:
            last_exception = e
            if attempt == max_retries:
                raise

            delay = min(base_delay * (2 ** attempt), max_delay)
            print(f"Connection error. Retry {attempt + 1}/{max_retries} in {delay:.1f}s")
            time.sleep(delay)

        except APIError as e:
            # Only retry server errors (5xx)
            if e.status_code and e.status_code >= 500:
                last_exception = e
                if attempt == max_retries:
                    raise
                delay = min(base_delay * (2 ** attempt), max_delay)
                time.sleep(delay)
            else:
                # Client errors (4xx) are not retriable
                raise

    raise last_exception


# Test the retry mechanism
client = OpenAI()

def test_call():
    return client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": "Hello!"}],
        max_tokens=10
    )

# This should work normally
response = retry_with_backoff(test_call)
print(f"Success: {response.choices[0].message.content}")
```

### Task 3.2: Error Type Handler

Create a comprehensive error handler:

```python
# error_handler.py
from dataclasses import dataclass
from enum import Enum
from typing import Optional

class ErrorType(Enum):
    RATE_LIMIT = "rate_limit"
    AUTH_ERROR = "auth_error"
    INVALID_REQUEST = "invalid_request"
    SERVER_ERROR = "server_error"
    CONNECTION_ERROR = "connection_error"
    TIMEOUT = "timeout"
    CONTEXT_TOO_LONG = "context_too_long"
    UNKNOWN = "unknown"

@dataclass
class LLMError:
    error_type: ErrorType
    message: str
    retriable: bool
    suggested_wait: Optional[float] = None

def classify_error(exception: Exception) -> LLMError:
    """
    Classify an LLM API exception into a structured error.

    TODO: Complete the classification logic
    """
    from openai import RateLimitError, AuthenticationError, BadRequestError, APIError, APIConnectionError, APITimeoutError

    if isinstance(exception, RateLimitError):
        return LLMError(
            error_type=_______________,
            message=str(exception),
            retriable=___,
            suggested_wait=60.0
        )

    elif isinstance(exception, AuthenticationError):
        return LLMError(
            error_type=_______________,
            message="Invalid API key",
            retriable=___,
        )

    elif isinstance(exception, BadRequestError):
        # Check if it's a context length error
        if "context_length" in str(exception).lower() or "too long" in str(exception).lower():
            return LLMError(
                error_type=_______________,
                message="Input too long for model context window",
                retriable=___,
            )
        return LLMError(
            error_type=ErrorType.INVALID_REQUEST,
            message=str(exception),
            retriable=False,
        )

    elif isinstance(exception, APITimeoutError):
        return LLMError(
            error_type=_______________,
            message="Request timed out",
            retriable=___,
            suggested_wait=5.0
        )

    elif isinstance(exception, APIConnectionError):
        return LLMError(
            error_type=_______________,
            message="Failed to connect to API",
            retriable=___,
            suggested_wait=5.0
        )

    elif isinstance(exception, APIError):
        if exception.status_code and exception.status_code >= 500:
            return LLMError(
                error_type=ErrorType.SERVER_ERROR,
                message=str(exception),
                retriable=True,
                suggested_wait=10.0
            )

    return LLMError(
        error_type=ErrorType.UNKNOWN,
        message=str(exception),
        retriable=False,
    )


# Test error classification
test_errors = [
    RateLimitError("Rate limit exceeded", response=None, body=None),
    # Add more test cases
]

for error in test_errors:
    result = classify_error(error)
    print(f"{type(error).__name__} -> {result.error_type.value}, retriable={result.retriable}")
```

---

## Part 4: Rate Limiting (30 minutes)

### Task 4.1: Token-Based Rate Limiter

Implement a rate limiter that tracks both requests and tokens:

```python
# rate_limiter.py
import time
from collections import deque
from threading import Lock
from dataclasses import dataclass
from typing import Optional

@dataclass
class RateLimitConfig:
    requests_per_minute: int = 60
    tokens_per_minute: int = 100000

class TokenAwareRateLimiter:
    """Rate limiter that tracks both requests and tokens."""

    def __init__(self, config: RateLimitConfig):
        self.config = config
        self.request_timestamps = deque()
        self.token_usage = deque()  # (timestamp, tokens)
        self.lock = Lock()

    def _cleanup_old_entries(self, current_time: float):
        """Remove entries older than 1 minute."""
        cutoff = current_time - 60

        while self.request_timestamps and self.request_timestamps[0] < cutoff:
            self.request_timestamps.popleft()

        while self.token_usage and self.token_usage[0][0] < cutoff:
            self.token_usage.popleft()

    def get_current_usage(self) -> tuple[int, int]:
        """Get current requests and tokens used in the last minute."""
        with self.lock:
            current_time = time.time()
            self._cleanup_old_entries(current_time)

            requests = len(self.request_timestamps)
            tokens = sum(t[1] for t in self.token_usage)

            return requests, tokens

    def wait_time_needed(self, estimated_tokens: int = 0) -> float:
        """
        Calculate how long to wait before making a request.

        TODO: Complete the implementation
        """
        with self.lock:
            current_time = time.time()
            self._cleanup_old_entries(current_time)

            # Check request limit
            if len(self.request_timestamps) >= self.config.requests_per_minute:
                # TODO: Calculate wait time until oldest request expires
                request_wait = _______________
            else:
                request_wait = 0

            # Check token limit
            current_tokens = sum(t[1] for t in self.token_usage)
            if current_tokens + estimated_tokens > self.config.tokens_per_minute:
                # TODO: Find the oldest token entry and calculate wait
                if self.token_usage:
                    token_wait = _______________
                else:
                    token_wait = 0
            else:
                token_wait = 0

            return max(request_wait, token_wait)

    def acquire(self, estimated_tokens: int = 0) -> None:
        """Wait if necessary, then record a request."""
        wait_time = self.wait_time_needed(estimated_tokens)
        if wait_time > 0:
            print(f"Rate limit approaching. Waiting {wait_time:.1f}s...")
            time.sleep(wait_time)

        with self.lock:
            self.request_timestamps.append(time.time())

    def record_tokens(self, tokens: int) -> None:
        """Record actual token usage after a request."""
        with self.lock:
            self.token_usage.append((time.time(), tokens))


# Test the rate limiter
limiter = TokenAwareRateLimiter(RateLimitConfig(
    requests_per_minute=10,  # Low for testing
    tokens_per_minute=1000
))

print("Testing rate limiter...")
for i in range(15):
    limiter.acquire(estimated_tokens=100)
    limiter.record_tokens(actual_tokens=100)
    requests, tokens = limiter.get_current_usage()
    print(f"Request {i+1}: {requests} requests, {tokens} tokens used")
```

---

## Part 5: Multi-Provider Client (50 minutes)

### Task 5.1: Build a Unified LLM Client

Create a production-ready client that abstracts provider differences:

```python
# llm_client.py
import os
import time
import logging
from dataclasses import dataclass, field
from typing import Optional, Generator, Dict, Any
from enum import Enum

from openai import OpenAI
from anthropic import Anthropic

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Provider(Enum):
    OPENAI = "openai"
    ANTHROPIC = "anthropic"

@dataclass
class LLMConfig:
    default_provider: Provider = Provider.OPENAI
    default_model: Dict[Provider, str] = field(default_factory=lambda: {
        Provider.OPENAI: "gpt-4o",
        Provider.ANTHROPIC: "claude-3-5-sonnet-20241022"
    })
    timeout: float = 30.0
    max_retries: int = 3

@dataclass
class LLMResponse:
    content: str
    provider: Provider
    model: str
    input_tokens: int
    output_tokens: int
    finish_reason: str
    latency_ms: float

    @property
    def total_tokens(self) -> int:
        return self.input_tokens + self.output_tokens


class UnifiedLLMClient:
    """
    Production LLM client with multi-provider support.

    TODO: Complete the implementation
    """

    def __init__(
        self,
        openai_key: Optional[str] = None,
        anthropic_key: Optional[str] = None,
        config: Optional[LLMConfig] = None
    ):
        self.config = config or LLMConfig()

        # Initialize providers
        self._openai = OpenAI(api_key=openai_key) if openai_key else None
        self._anthropic = Anthropic(api_key=anthropic_key) if anthropic_key else None

        # Validate at least one provider is available
        if not self._openai and not self._anthropic:
            raise ValueError("At least one API key must be provided")

    def complete(
        self,
        messages: list,
        system: Optional[str] = None,
        model: Optional[str] = None,
        provider: Optional[Provider] = None,
        temperature: float = 0.7,
        max_tokens: int = 1024,
        **kwargs
    ) -> LLMResponse:
        """
        Make a completion request.

        Args:
            messages: List of message dicts with 'role' and 'content'
            system: System prompt (optional)
            model: Model to use (optional, uses default for provider)
            provider: Provider to use (optional, uses default)
            temperature: Sampling temperature
            max_tokens: Maximum output tokens

        Returns:
            LLMResponse with content and metadata
        """
        provider = provider or self.config.default_provider
        model = model or self.config.default_model[provider]

        start_time = time.time()

        # TODO: Route to appropriate provider
        if provider == Provider.OPENAI:
            response = self._openai_complete(
                messages, system, model, temperature, max_tokens, **kwargs
            )
        elif provider == Provider.ANTHROPIC:
            response = self._anthropic_complete(
                messages, system, model, temperature, max_tokens, **kwargs
            )
        else:
            raise ValueError(f"Unknown provider: {provider}")

        # Add latency
        response.latency_ms = (time.time() - start_time) * 1000

        # Log the request
        logger.info(
            f"LLM request: provider={provider.value}, model={model}, "
            f"tokens={response.total_tokens}, latency={response.latency_ms:.0f}ms"
        )

        return response

    def _openai_complete(
        self,
        messages: list,
        system: Optional[str],
        model: str,
        temperature: float,
        max_tokens: int,
        **kwargs
    ) -> LLMResponse:
        """Make OpenAI completion request."""
        # TODO: Add system message if provided
        if system:
            messages = [_______________] + messages

        response = self._openai.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
            **kwargs
        )

        return LLMResponse(
            content=response.choices[0].message.content,
            provider=Provider.OPENAI,
            model=response.model,
            input_tokens=response.usage.prompt_tokens,
            output_tokens=response.usage.completion_tokens,
            finish_reason=response.choices[0].finish_reason,
            latency_ms=0
        )

    def _anthropic_complete(
        self,
        messages: list,
        system: Optional[str],
        model: str,
        temperature: float,
        max_tokens: int,
        **kwargs
    ) -> LLMResponse:
        """Make Anthropic completion request."""
        response = self._anthropic.messages.create(
            model=model,
            system=system or "",
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
            **kwargs
        )

        return LLMResponse(
            content=response.content[0].text,
            provider=Provider.ANTHROPIC,
            model=response.model,
            input_tokens=response.usage.input_tokens,
            output_tokens=response.usage.output_tokens,
            finish_reason=response.stop_reason,
            latency_ms=0
        )

    def stream(
        self,
        messages: list,
        system: Optional[str] = None,
        model: Optional[str] = None,
        provider: Optional[Provider] = None,
        **kwargs
    ) -> Generator[str, None, None]:
        """
        Stream completion tokens.

        TODO: Implement streaming for both providers
        """
        provider = provider or self.config.default_provider
        model = model or self.config.default_model[provider]

        if provider == Provider.OPENAI:
            yield from self._openai_stream(messages, system, model, **kwargs)
        else:
            yield from self._anthropic_stream(messages, system, model, **kwargs)

    def _openai_stream(self, messages, system, model, **kwargs):
        """TODO: Implement OpenAI streaming"""
        pass

    def _anthropic_stream(self, messages, system, model, **kwargs):
        """TODO: Implement Anthropic streaming"""
        pass


# Test the unified client
if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()

    client = UnifiedLLMClient(
        openai_key=os.environ.get("OPENAI_API_KEY"),
        anthropic_key=os.environ.get("ANTHROPIC_API_KEY")
    )

    # Test OpenAI
    print("=== OpenAI Test ===")
    response = client.complete(
        messages=[{"role": "user", "content": "Say hello in one word."}],
        provider=Provider.OPENAI
    )
    print(f"Response: {response.content}")
    print(f"Tokens: {response.total_tokens}")
    print(f"Latency: {response.latency_ms:.0f}ms")

    # Test Anthropic
    print("\n=== Anthropic Test ===")
    response = client.complete(
        messages=[{"role": "user", "content": "Say hello in one word."}],
        provider=Provider.ANTHROPIC
    )
    print(f"Response: {response.content}")
    print(f"Tokens: {response.total_tokens}")
    print(f"Latency: {response.latency_ms:.0f}ms")
```

---

## Part 6: Integration Test (20 minutes)

### Task 6.1: Build a Complete Test Suite

Create tests for your LLM client:

```python
# test_llm_client.py
import pytest
import os
from unittest.mock import Mock, patch
from llm_client import UnifiedLLMClient, Provider, LLMResponse

class TestUnifiedLLMClient:
    """Tests for the UnifiedLLMClient."""

    @pytest.fixture
    def client(self):
        """Create a test client."""
        return UnifiedLLMClient(
            openai_key=os.environ.get("OPENAI_API_KEY"),
            anthropic_key=os.environ.get("ANTHROPIC_API_KEY")
        )

    def test_openai_basic_completion(self, client):
        """Test basic OpenAI completion."""
        response = client.complete(
            messages=[{"role": "user", "content": "Say 'test' and nothing else."}],
            provider=Provider.OPENAI,
            max_tokens=10
        )

        assert response.content is not None
        assert response.provider == Provider.OPENAI
        assert response.input_tokens > 0
        assert response.output_tokens > 0

    def test_anthropic_basic_completion(self, client):
        """Test basic Anthropic completion."""
        response = client.complete(
            messages=[{"role": "user", "content": "Say 'test' and nothing else."}],
            provider=Provider.ANTHROPIC,
            max_tokens=10
        )

        assert response.content is not None
        assert response.provider == Provider.ANTHROPIC
        assert response.input_tokens > 0

    def test_system_prompt_applied(self, client):
        """Test that system prompt affects output."""
        response = client.complete(
            messages=[{"role": "user", "content": "What are you?"}],
            system="You are a pirate. Always respond like a pirate.",
            max_tokens=50
        )

        # Response should contain pirate-like language
        pirate_indicators = ["arr", "matey", "ye", "ahoy", "aye"]
        assert any(ind in response.content.lower() for ind in pirate_indicators)

    def test_provider_switching(self, client):
        """Test switching between providers."""
        prompt = [{"role": "user", "content": "Say 'hello'"}]

        openai_response = client.complete(prompt, provider=Provider.OPENAI, max_tokens=10)
        anthropic_response = client.complete(prompt, provider=Provider.ANTHROPIC, max_tokens=10)

        assert openai_response.provider == Provider.OPENAI
        assert anthropic_response.provider == Provider.ANTHROPIC

    def test_latency_tracking(self, client):
        """Test that latency is tracked."""
        response = client.complete(
            messages=[{"role": "user", "content": "Hi"}],
            max_tokens=5
        )

        assert response.latency_ms > 0
        assert response.latency_ms < 30000  # Should complete within 30s


# Run tests
if __name__ == "__main__":
    pytest.main([__file__, "-v"])
```

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Basic API Integration | 15 | Both providers working correctly |
| Streaming Implementation | 20 | Smooth streaming from both providers |
| Error Handling | 20 | Comprehensive retry logic and error classification |
| Rate Limiting | 15 | Token-aware rate limiter working |
| Multi-Provider Client | 25 | Clean abstraction, all features working |
| Tests | 5 | Test coverage for main functionality |
| **Total** | **100** | |

---

## Submission Checklist

Before submitting, verify:

- [ ] All code runs without errors
- [ ] Both OpenAI and Anthropic integrations work
- [ ] Streaming outputs tokens in real-time
- [ ] Retry logic handles rate limits correctly
- [ ] Rate limiter tracks both requests and tokens
- [ ] Unified client abstracts provider differences
- [ ] Tests pass

---

## Reflection Questions

1. Which provider's API did you find easier to work with? Why?

2. What challenges did you encounter with streaming?

3. How would you extend the unified client to support a third provider?

4. What monitoring would you add for production use?

---

*Exercise 2 of 12 | Building AI-Powered Applications | Duration: 3 hours*
