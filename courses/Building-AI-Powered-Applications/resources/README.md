# Building AI-Powered Applications - Resources

> Technical reference for AI application development

---

## API Reference

### OpenAI API

```python
# Chat Completions
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ],
    temperature=0.7,
    max_tokens=150
)
```

### Anthropic API

```python
# Claude Messages API
import anthropic
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude"}
    ]
)
```

### Embeddings

```python
# OpenAI Embeddings
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="Your text here"
)
embedding = response.data[0].embedding
```

---

## Model Comparison

### Capabilities Matrix

| Model | Context | Cost (1M tokens) | Best For |
|-------|---------|------------------|----------|
| GPT-4o | 128K | $5 in / $15 out | General purpose |
| GPT-4 Turbo | 128K | $10 in / $30 out | Complex reasoning |
| GPT-3.5 Turbo | 16K | $0.50 in / $1.50 out | Cost-effective |
| Claude 3.5 Sonnet | 200K | $3 in / $15 out | Long context, analysis |
| Claude 3 Haiku | 200K | $0.25 in / $1.25 out | Fast, cheap |

### Embedding Models

| Model | Dimensions | Cost (1M tokens) | Use Case |
|-------|------------|------------------|----------|
| text-embedding-3-small | 1536 | $0.02 | General purpose |
| text-embedding-3-large | 3072 | $0.13 | Higher accuracy |
| text-embedding-ada-002 | 1536 | $0.10 | Legacy |

---

## Vector Databases

### Comparison

| Database | Type | Best For | Pricing Model |
|----------|------|----------|---------------|
| Pinecone | Managed | Production scale | Per-vector |
| Weaviate | Self-hosted/Cloud | Flexibility | Per-cluster |
| Chroma | Local/Embedded | Development | Free/Open source |
| Qdrant | Self-hosted/Cloud | Performance | Per-cluster |
| pgvector | PostgreSQL extension | Existing Postgres | Database costs |

### Quick Start Examples

**Pinecone:**
```python
import pinecone
pinecone.init(api_key="YOUR_KEY")
index = pinecone.Index("my-index")
index.upsert(vectors=[("id1", [0.1, 0.2, ...], {"metadata": "value"})])
results = index.query(vector=[0.1, 0.2, ...], top_k=5)
```

**Chroma:**
```python
import chromadb
client = chromadb.Client()
collection = client.create_collection("my-collection")
collection.add(documents=["doc1", "doc2"], ids=["id1", "id2"])
results = collection.query(query_texts=["search query"], n_results=5)
```

---

## RAG Architecture

### Basic Pipeline

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Document  │───▶│   Chunking  │───▶│  Embedding  │
│   Ingestion │    │             │    │  Generation │
└─────────────┘    └─────────────┘    └──────┬──────┘
                                              │
                                              ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    User     │───▶│   Query     │───▶│   Vector    │
│    Query    │    │  Embedding  │    │   Search    │
└─────────────┘    └─────────────┘    └──────┬──────┘
                                              │
                                              ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Response   │◀───│     LLM     │◀───│   Context   │
│             │    │  Generation │    │   Assembly  │
└─────────────┘    └─────────────┘    └─────────────┘
```

### Chunking Strategies

| Strategy | Chunk Size | Overlap | Use Case |
|----------|------------|---------|----------|
| Fixed | 500 tokens | 50 tokens | Simple docs |
| Sentence | 5-10 sentences | 1-2 sentences | Articles |
| Paragraph | By paragraph | Previous paragraph | Structured docs |
| Semantic | Variable | None | Complex docs |
| Code | By function/class | None | Source code |

---

## Cost Optimization

### Token Estimation

```python
# Rough estimation: 1 token ≈ 4 characters (English)
def estimate_tokens(text):
    return len(text) / 4

# Accurate: Use tiktoken
import tiktoken
encoder = tiktoken.encoding_for_model("gpt-4")
tokens = encoder.encode(text)
token_count = len(tokens)
```

### Cost Calculator

```python
def calculate_cost(input_tokens, output_tokens, model="gpt-4o"):
    pricing = {
        "gpt-4o": {"input": 0.005, "output": 0.015},
        "gpt-3.5-turbo": {"input": 0.0005, "output": 0.0015},
        "claude-3-sonnet": {"input": 0.003, "output": 0.015}
    }
    rate = pricing[model]
    cost = (input_tokens * rate["input"] + output_tokens * rate["output"]) / 1000
    return cost
```

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| 429 | Rate limit | Implement exponential backoff |
| 500 | Server error | Retry with backoff |
| 400 | Bad request | Validate input before sending |
| Context length | Too many tokens | Truncate or chunk input |
| Content filter | Flagged content | Review and modify input |

### Retry Logic

```python
import time
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
def call_api(prompt):
    return client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
```

---

## Security Checklist

### Input Validation
- [ ] Sanitize user input
- [ ] Check for prompt injection patterns
- [ ] Limit input length
- [ ] Validate format

### Output Safety
- [ ] Filter PII
- [ ] Check for hallucinations
- [ ] Validate against schema
- [ ] Log for auditing

### Infrastructure
- [ ] Secure API keys (environment variables)
- [ ] Use HTTPS only
- [ ] Implement rate limiting
- [ ] Monitor for abuse

---

## Performance Optimization

### Latency Reduction

| Technique | Impact | Implementation |
|-----------|--------|----------------|
| Streaming | Perceived latency | Use stream=True |
| Caching | Repeated queries | Redis/in-memory cache |
| Smaller model | Raw latency | Use GPT-3.5 where possible |
| Parallel requests | Throughput | asyncio.gather() |
| Prompt optimization | Token reduction | Remove redundancy |

### Caching Strategy

```python
import hashlib
import redis

cache = redis.Redis()

def cached_completion(prompt, ttl=3600):
    key = hashlib.md5(prompt.encode()).hexdigest()
    cached = cache.get(key)
    if cached:
        return cached.decode()

    response = call_llm(prompt)
    cache.setex(key, ttl, response)
    return response
```

---

## Monitoring Metrics

### Key Metrics to Track

| Metric | What to Measure | Alert Threshold |
|--------|-----------------|-----------------|
| Latency | p50, p95, p99 | p95 > 5s |
| Error rate | % failed requests | > 1% |
| Token usage | Input/output tokens | Budget threshold |
| Cost | Daily/monthly spend | Budget limit |
| Quality | User feedback, eval scores | < threshold |

### Logging Template

```python
import logging
import json

def log_llm_call(prompt, response, metadata):
    logging.info(json.dumps({
        "type": "llm_call",
        "model": metadata["model"],
        "input_tokens": metadata["input_tokens"],
        "output_tokens": metadata["output_tokens"],
        "latency_ms": metadata["latency"],
        "success": metadata["success"],
        "timestamp": metadata["timestamp"]
    }))
```
