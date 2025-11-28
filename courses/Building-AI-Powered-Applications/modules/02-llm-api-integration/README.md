# Module 2: LLM API Integration

## Learning Objectives

By the end of this module, you will be able to:

1. Authenticate and connect to OpenAI and Anthropic APIs
2. Handle streaming responses for real-time output
3. Implement proper error handling and retry logic
4. Manage rate limits and quotas effectively
5. Build a production-ready API integration layer

---

## Introduction

API integration is the foundation of every AI application. While it may seem simple to make an API call, production systems require handling dozens of edge cases: timeouts, rate limits, model unavailability, streaming responses, and graceful degradation.

This module teaches you to build robust API integrations that work reliably at scale. You'll implement patterns that handle real-world complexity while keeping your code maintainable.

---

## 1. OpenAI API Deep Dive

### Setting Up OpenAI

**Installation:**
```bash
# Python
pip install openai

# Node.js
npm install openai
```

**Authentication:**
```python
# Python
from openai import OpenAI

client = OpenAI(api_key="sk-...")  # Or set OPENAI_API_KEY env var
```

```javascript
// Node.js
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
```

### Basic Chat Completion

```python
# Python - Basic request
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain API integration in one sentence."}
    ],
    temperature=0.7,
    max_tokens=150
)

print(response.choices[0].message.content)
```

```javascript
// Node.js - Basic request
const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Explain API integration in one sentence." }
    ],
    temperature: 0.7,
    max_tokens: 150
});

console.log(response.choices[0].message.content);
```

### Key Parameters

| Parameter | Type | Description | Typical Values |
|-----------|------|-------------|----------------|
| `model` | string | Model identifier | "gpt-4o", "gpt-4-turbo" |
| `messages` | array | Conversation history | System + user + assistant |
| `temperature` | float | Randomness (0-2) | 0=deterministic, 0.7=balanced |
| `max_tokens` | int | Maximum output length | 100-4096 |
| `top_p` | float | Nucleus sampling | 0.1-1.0 |
| `frequency_penalty` | float | Reduce repetition | 0-2 |
| `presence_penalty` | float | Encourage new topics | 0-2 |
| `stop` | array | Stop sequences | ["\n\n", "END"] |
| `seed` | int | For reproducibility | Any integer |

### Response Structure

```python
# Response object structure
{
    "id": "chatcmpl-xxx",
    "object": "chat.completion",
    "created": 1699000000,
    "model": "gpt-4o-2024-05-13",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "The response text..."
            },
            "finish_reason": "stop"  # or "length", "tool_calls", "content_filter"
        }
    ],
    "usage": {
        "prompt_tokens": 25,
        "completion_tokens": 50,
        "total_tokens": 75
    }
}
```

---

## 2. Anthropic Claude API Integration

### Setting Up Claude

**Installation:**
```bash
# Python
pip install anthropic

# Node.js
npm install @anthropic-ai/sdk
```

**Authentication:**
```python
# Python
from anthropic import Anthropic

client = Anthropic(api_key="sk-ant-...")  # Or set ANTHROPIC_API_KEY env var
```

```javascript
// Node.js
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});
```

### Basic Message Request

```python
# Python - Basic request
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system="You are a helpful assistant.",
    messages=[
        {"role": "user", "content": "Explain API integration in one sentence."}
    ]
)

print(response.content[0].text)
```

```javascript
// Node.js - Basic request
const response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: "You are a helpful assistant.",
    messages: [
        { role: "user", content: "Explain API integration in one sentence." }
    ]
});

console.log(response.content[0].text);
```

### API Differences: OpenAI vs Anthropic

| Aspect | OpenAI | Anthropic |
|--------|--------|-----------|
| System prompt | In messages array | Separate `system` parameter |
| Content access | `message.content` (string) | `content[0].text` (array) |
| Token param | `max_tokens` | `max_tokens` (required) |
| Stop sequences | `stop` | `stop_sequences` |
| Model names | "gpt-4o", "gpt-4-turbo" | "claude-3-5-sonnet-*" |

---

## 3. Streaming Responses

Streaming delivers output token-by-token as it's generated, reducing perceived latency dramatically.

### OpenAI Streaming

```python
# Python streaming
stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Write a short poem"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

```javascript
// Node.js streaming
const stream = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: "Write a short poem" }],
    stream: true
});

for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    process.stdout.write(content);
}
```

### Anthropic Streaming

```python
# Python streaming
with client.messages.stream(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Write a short poem"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

```javascript
// Node.js streaming with events
const stream = client.messages.stream({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Write a short poem" }]
});

stream.on('text', (text) => {
    process.stdout.write(text);
});

const finalMessage = await stream.finalMessage();
```

### Streaming Architecture Pattern

```
┌────────┐     ┌────────────┐     ┌─────────┐     ┌────────┐
│ Client │◀────│ Your API   │◀────│  LLM    │     │        │
│        │ SSE │  Server    │     │  API    │     │        │
└────────┘     └────────────┘     └─────────┘     └────────┘
                     │
                     │ Accumulate for logging
                     ▼
               ┌──────────┐
               │ Database │
               └──────────┘
```

---

## 4. Error Handling and Retries

### Common Error Types

| Error | OpenAI Code | Anthropic Code | Solution |
|-------|-------------|----------------|----------|
| Rate limit | 429 | 429 | Exponential backoff |
| Invalid request | 400 | 400 | Fix request params |
| Authentication | 401 | 401 | Check API key |
| Server error | 500-503 | 500-503 | Retry with backoff |
| Timeout | Timeout | Timeout | Retry or increase timeout |
| Context too long | 400 | 400 | Reduce input tokens |

### Robust Error Handling Pattern

```python
import time
from openai import OpenAI, RateLimitError, APIError, APIConnectionError

def call_llm_with_retry(
    client: OpenAI,
    messages: list,
    max_retries: int = 3,
    base_delay: float = 1.0
) -> str:
    """Call LLM with exponential backoff retry."""

    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                timeout=30.0
            )
            return response.choices[0].message.content

        except RateLimitError as e:
            if attempt == max_retries - 1:
                raise
            delay = base_delay * (2 ** attempt)  # Exponential backoff
            print(f"Rate limited. Waiting {delay}s...")
            time.sleep(delay)

        except APIConnectionError as e:
            if attempt == max_retries - 1:
                raise
            delay = base_delay * (2 ** attempt)
            print(f"Connection error. Retrying in {delay}s...")
            time.sleep(delay)

        except APIError as e:
            if e.status_code >= 500:  # Server errors are retriable
                if attempt == max_retries - 1:
                    raise
                delay = base_delay * (2 ** attempt)
                time.sleep(delay)
            else:
                raise  # Client errors are not retriable

    raise Exception("Max retries exceeded")
```

### Using Tenacity for Retries (Python)

```python
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from openai import RateLimitError, APIConnectionError

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=60),
    retry=retry_if_exception_type((RateLimitError, APIConnectionError))
)
def call_llm(messages: list) -> str:
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages
    )
    return response.choices[0].message.content
```

---

## 5. Rate Limiting and Quota Management

### Understanding Rate Limits

**OpenAI Limits (vary by tier):**
- Requests per minute (RPM)
- Tokens per minute (TPM)
- Requests per day (RPD)

**Anthropic Limits:**
- Requests per minute
- Tokens per minute
- Input tokens per minute
- Output tokens per minute

### Client-Side Rate Limiting

```python
import time
from collections import deque
from threading import Lock

class RateLimiter:
    def __init__(self, requests_per_minute: int = 60):
        self.rpm = requests_per_minute
        self.requests = deque()
        self.lock = Lock()

    def wait_if_needed(self):
        with self.lock:
            now = time.time()

            # Remove requests older than 1 minute
            while self.requests and self.requests[0] < now - 60:
                self.requests.popleft()

            # If at limit, wait
            if len(self.requests) >= self.rpm:
                sleep_time = 60 - (now - self.requests[0])
                if sleep_time > 0:
                    time.sleep(sleep_time)

            self.requests.append(time.time())

# Usage
rate_limiter = RateLimiter(requests_per_minute=50)

def call_llm(messages):
    rate_limiter.wait_if_needed()
    return client.chat.completions.create(
        model="gpt-4o",
        messages=messages
    )
```

### Token Budget Management

```python
class TokenBudget:
    def __init__(self, daily_limit: int, monthly_limit: int):
        self.daily_limit = daily_limit
        self.monthly_limit = monthly_limit
        self.daily_used = 0
        self.monthly_used = 0
        self.last_reset_day = None
        self.last_reset_month = None

    def can_spend(self, estimated_tokens: int) -> bool:
        self._check_reset()
        return (
            self.daily_used + estimated_tokens <= self.daily_limit and
            self.monthly_used + estimated_tokens <= self.monthly_limit
        )

    def spend(self, actual_tokens: int):
        self._check_reset()
        self.daily_used += actual_tokens
        self.monthly_used += actual_tokens

    def _check_reset(self):
        from datetime import date
        today = date.today()
        if self.last_reset_day != today.day:
            self.daily_used = 0
            self.last_reset_day = today.day
        if self.last_reset_month != today.month:
            self.monthly_used = 0
            self.last_reset_month = today.month
```

---

## 6. Building an API Integration Layer

### Production-Ready LLM Client

```python
from dataclasses import dataclass
from typing import Optional, Generator
from enum import Enum
import logging

class Provider(Enum):
    OPENAI = "openai"
    ANTHROPIC = "anthropic"

@dataclass
class LLMResponse:
    content: str
    model: str
    input_tokens: int
    output_tokens: int
    finish_reason: str
    latency_ms: float

class LLMClient:
    """Production LLM client with multi-provider support."""

    def __init__(
        self,
        openai_key: Optional[str] = None,
        anthropic_key: Optional[str] = None,
        default_provider: Provider = Provider.OPENAI
    ):
        self.openai = OpenAI(api_key=openai_key) if openai_key else None
        self.anthropic = Anthropic(api_key=anthropic_key) if anthropic_key else None
        self.default_provider = default_provider
        self.logger = logging.getLogger(__name__)

    def complete(
        self,
        messages: list,
        model: str = "gpt-4o",
        system: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 1024,
        provider: Optional[Provider] = None
    ) -> LLMResponse:
        """Make a completion request with automatic provider routing."""

        provider = provider or self.default_provider
        start_time = time.time()

        try:
            if provider == Provider.OPENAI:
                response = self._openai_complete(
                    messages, model, system, temperature, max_tokens
                )
            else:
                response = self._anthropic_complete(
                    messages, model, system, temperature, max_tokens
                )

            latency_ms = (time.time() - start_time) * 1000
            response.latency_ms = latency_ms

            self.logger.info(
                f"LLM call: model={response.model}, "
                f"tokens={response.input_tokens}+{response.output_tokens}, "
                f"latency={latency_ms:.0f}ms"
            )

            return response

        except Exception as e:
            self.logger.error(f"LLM call failed: {e}")
            raise

    def _openai_complete(self, messages, model, system, temperature, max_tokens):
        if system:
            messages = [{"role": "system", "content": system}] + messages

        response = self.openai.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens
        )

        return LLMResponse(
            content=response.choices[0].message.content,
            model=response.model,
            input_tokens=response.usage.prompt_tokens,
            output_tokens=response.usage.completion_tokens,
            finish_reason=response.choices[0].finish_reason,
            latency_ms=0
        )

    def _anthropic_complete(self, messages, model, system, temperature, max_tokens):
        response = self.anthropic.messages.create(
            model=model,
            system=system or "",
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens
        )

        return LLMResponse(
            content=response.content[0].text,
            model=response.model,
            input_tokens=response.usage.input_tokens,
            output_tokens=response.usage.output_tokens,
            finish_reason=response.stop_reason,
            latency_ms=0
        )

    def stream(
        self,
        messages: list,
        model: str = "gpt-4o",
        system: Optional[str] = None,
        provider: Optional[Provider] = None
    ) -> Generator[str, None, None]:
        """Stream completion tokens."""

        provider = provider or self.default_provider

        if provider == Provider.OPENAI:
            yield from self._openai_stream(messages, model, system)
        else:
            yield from self._anthropic_stream(messages, model, system)

    def _openai_stream(self, messages, model, system):
        if system:
            messages = [{"role": "system", "content": system}] + messages

        stream = self.openai.chat.completions.create(
            model=model,
            messages=messages,
            stream=True
        )

        for chunk in stream:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

    def _anthropic_stream(self, messages, model, system):
        with self.anthropic.messages.stream(
            model=model,
            system=system or "",
            messages=messages,
            max_tokens=4096
        ) as stream:
            for text in stream.text_stream:
                yield text
```

### Usage Example

```python
# Initialize client
llm = LLMClient(
    openai_key=os.environ["OPENAI_API_KEY"],
    anthropic_key=os.environ["ANTHROPIC_API_KEY"],
    default_provider=Provider.OPENAI
)

# Simple completion
response = llm.complete(
    messages=[{"role": "user", "content": "Hello!"}],
    system="You are a friendly assistant.",
    temperature=0.7
)
print(response.content)
print(f"Tokens: {response.input_tokens} + {response.output_tokens}")

# Streaming
for token in llm.stream(
    messages=[{"role": "user", "content": "Write a haiku"}],
    provider=Provider.ANTHROPIC
):
    print(token, end="", flush=True)
```

---

## 7. Best Practices

### API Key Security

```python
# DO: Use environment variables
import os
api_key = os.environ.get("OPENAI_API_KEY")

# DO: Use secrets management in production
# AWS Secrets Manager, HashiCorp Vault, etc.

# DON'T: Hardcode keys
api_key = "sk-abc123"  # NEVER DO THIS

# DON'T: Commit keys to version control
# Add to .gitignore: .env, *.pem, *-key.json
```

### Request Timeout Configuration

```python
# Always set timeouts
client = OpenAI(
    api_key=api_key,
    timeout=30.0,  # 30 seconds
    max_retries=2
)

# For long-running requests
response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    timeout=120.0  # 2 minutes for complex tasks
)
```

### Logging and Monitoring

```python
import logging
import time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def logged_completion(messages, **kwargs):
    start = time.time()
    request_id = str(uuid.uuid4())[:8]

    logger.info(f"[{request_id}] Starting LLM request")

    try:
        response = client.chat.completions.create(
            messages=messages,
            **kwargs
        )

        duration = time.time() - start
        logger.info(
            f"[{request_id}] Completed in {duration:.2f}s, "
            f"tokens: {response.usage.total_tokens}"
        )

        return response

    except Exception as e:
        duration = time.time() - start
        logger.error(f"[{request_id}] Failed after {duration:.2f}s: {e}")
        raise
```

---

## Key Takeaways

1. **Master both providers** - OpenAI and Anthropic have different APIs; know both
2. **Always implement streaming** - Users expect real-time feedback
3. **Handle errors gracefully** - Retries with backoff are essential
4. **Manage rate limits** - Client-side limiting prevents 429 errors
5. **Build an abstraction layer** - Don't tie your app to one provider
6. **Log everything** - You need visibility into API usage and costs

---

## Knowledge Check

Before moving on, ensure you can:

1. Make basic requests to both OpenAI and Anthropic APIs
2. Implement streaming for real-time output
3. Handle common error types with proper retries
4. Explain the difference between RPM and TPM limits
5. Build a multi-provider LLM client

---

## Next Module Preview

In **Module 3: Prompt Engineering for Applications**, you'll learn to build dynamic prompts, parse structured outputs, and implement function calling / tool use.

---

*Module 2 of 12 | Building AI-Powered Applications | Duration: 5 hours*
