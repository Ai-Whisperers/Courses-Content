# Module 8: Cost Optimization

## Learning Objectives

By the end of this module, you will be able to:

1. Analyze and forecast LLM API costs accurately
2. Implement semantic caching to reduce redundant API calls
3. Design model tiering strategies that balance cost and quality
4. Optimize prompts to minimize token usage without sacrificing output
5. Build monitoring systems that prevent cost overruns

---

## Introduction

AI costs can spiral out of control faster than any other technology investment. A single poorly designed feature can cost thousands per day. Yet with the right optimization strategies, you can reduce costs by 80-90% while maintaining quality.

This module provides battle-tested techniques for cost optimization. You'll learn where the money goes, how to measure it, and how to systematically reduce it without compromising user experience.

---

## 1. Understanding AI Costs

### Token Economics

Every LLM API charges by tokens. Understanding token economics is fundamental:

```
Token Breakdown:
─────────────────
1 token ≈ 4 characters (English)
1 token ≈ 0.75 words
100 tokens ≈ 75 words
1,000 tokens ≈ 750 words ≈ 1.5 pages

Typical Conversation:
─────────────────────
System prompt:     200-500 tokens (fixed cost per request)
User message:      50-200 tokens
Context/history:   500-2,000 tokens
AI response:       200-1,000 tokens
────────────────────────────────────
Total per turn:    950-3,700 tokens
```

### Cost Comparison (Late 2025 Pricing)

| Model | Input (per 1M) | Output (per 1M) | Relative Cost |
|-------|----------------|-----------------|---------------|
| GPT-4o | $2.50 | $10.00 | 1x (baseline) |
| GPT-4 Turbo | $10.00 | $30.00 | 4x |
| Claude 3.5 Sonnet | $3.00 | $15.00 | 1.3x |
| Claude 3.5 Haiku | $0.25 | $1.25 | 0.1x |
| GPT-3.5 Turbo | $0.50 | $1.50 | 0.15x |

### Where Costs Hide

```
Cost Distribution Analysis
───────────────────────────────────────────────────
                    Low Volume    High Volume
                    (1K/day)      (100K/day)
───────────────────────────────────────────────────
System prompts:     15%           40%
Context/history:    25%           30%
User inputs:        10%           10%
AI outputs:         50%           20%
───────────────────────────────────────────────────

Key Insight: At scale, fixed costs (system prompts) dominate
```

---

## 2. Semantic Caching

### The Caching Opportunity

Many AI requests are semantically similar:
- "What's your return policy?" vs "How do I return an item?"
- "Reset my password" vs "I forgot my password"
- Same user asking the same question days later

### Exact Match Caching

Start simple with exact match caching:

```python
import hashlib
import json
from redis import Redis

class ExactMatchCache:
    """Simple exact-match cache for AI responses."""

    def __init__(self, redis_url: str, ttl: int = 3600):
        self.redis = Redis.from_url(redis_url)
        self.ttl = ttl

    def _cache_key(self, prompt: str, model: str, params: dict) -> str:
        """Generate deterministic cache key."""
        content = json.dumps({
            'prompt': prompt.strip().lower(),
            'model': model,
            'temperature': params.get('temperature', 1.0),
            'max_tokens': params.get('max_tokens'),
        }, sort_keys=True)
        return f"ai:cache:{hashlib.sha256(content.encode()).hexdigest()}"

    def get(self, prompt: str, model: str, params: dict) -> str | None:
        """Retrieve cached response."""
        key = self._cache_key(prompt, model, params)
        cached = self.redis.get(key)
        if cached:
            self.redis.incr('ai:cache:hits')
            return cached.decode()
        self.redis.incr('ai:cache:misses')
        return None

    def set(self, prompt: str, model: str, params: dict, response: str):
        """Cache a response."""
        key = self._cache_key(prompt, model, params)
        self.redis.setex(key, self.ttl, response)

    def get_stats(self) -> dict:
        """Get cache performance statistics."""
        hits = int(self.redis.get('ai:cache:hits') or 0)
        misses = int(self.redis.get('ai:cache:misses') or 0)
        total = hits + misses
        return {
            'hits': hits,
            'misses': misses,
            'hit_rate': hits / total if total > 0 else 0,
        }
```

### Semantic Caching with Embeddings

For higher hit rates, use semantic similarity:

```python
import numpy as np
from openai import OpenAI

class SemanticCache:
    """Cache that matches semantically similar queries."""

    def __init__(self, redis_url: str, similarity_threshold: float = 0.95):
        self.redis = Redis.from_url(redis_url)
        self.openai = OpenAI()
        self.threshold = similarity_threshold
        self.index_key = "ai:semantic:index"

    def _get_embedding(self, text: str) -> list[float]:
        """Generate embedding for text."""
        response = self.openai.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        return response.data[0].embedding

    def _cosine_similarity(self, a: list[float], b: list[float]) -> float:
        """Calculate cosine similarity between embeddings."""
        a = np.array(a)
        b = np.array(b)
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

    def get(self, prompt: str) -> tuple[str | None, float]:
        """Find semantically similar cached response."""
        query_embedding = self._get_embedding(prompt)

        # Get all cached entries
        entries = self.redis.hgetall(self.index_key)

        best_match = None
        best_similarity = 0

        for key, data in entries.items():
            entry = json.loads(data)
            similarity = self._cosine_similarity(
                query_embedding,
                entry['embedding']
            )

            if similarity > best_similarity:
                best_similarity = similarity
                best_match = entry

        if best_match and best_similarity >= self.threshold:
            return best_match['response'], best_similarity

        return None, 0

    def set(self, prompt: str, response: str):
        """Cache response with embedding."""
        embedding = self._get_embedding(prompt)
        entry = {
            'prompt': prompt,
            'response': response,
            'embedding': embedding,
            'created': time.time(),
        }
        key = hashlib.sha256(prompt.encode()).hexdigest()[:16]
        self.redis.hset(self.index_key, key, json.dumps(entry))
```

### Cache Invalidation Strategies

```python
class CacheManager:
    """Manage cache lifecycle and invalidation."""

    def __init__(self, cache: SemanticCache):
        self.cache = cache

    def invalidate_by_pattern(self, pattern: str):
        """Invalidate entries matching a pattern."""
        # Use for content updates
        pass

    def invalidate_by_age(self, max_age_hours: int):
        """Remove entries older than threshold."""
        cutoff = time.time() - (max_age_hours * 3600)
        # Remove old entries
        pass

    def invalidate_by_topic(self, topic_embedding: list[float], threshold: float = 0.8):
        """Invalidate entries related to a topic."""
        # Use when underlying data changes
        pass
```

### Caching ROI Calculator

```python
def calculate_cache_roi(
    requests_per_day: int,
    avg_tokens_per_request: int,
    cache_hit_rate: float,
    model_price_per_1m_tokens: float,
    cache_infra_cost_per_day: float,
    embedding_cost_per_request: float = 0.0001
) -> dict:
    """Calculate ROI of implementing caching."""

    # Without caching
    daily_tokens = requests_per_day * avg_tokens_per_request
    daily_cost_no_cache = (daily_tokens / 1_000_000) * model_price_per_1m_tokens

    # With caching
    cache_hits = requests_per_day * cache_hit_rate
    cache_misses = requests_per_day * (1 - cache_hit_rate)

    llm_cost = (cache_misses * avg_tokens_per_request / 1_000_000) * model_price_per_1m_tokens
    embedding_cost = requests_per_day * embedding_cost_per_request  # For semantic cache
    daily_cost_with_cache = llm_cost + embedding_cost + cache_infra_cost_per_day

    savings = daily_cost_no_cache - daily_cost_with_cache
    savings_percent = (savings / daily_cost_no_cache) * 100

    return {
        'daily_cost_no_cache': daily_cost_no_cache,
        'daily_cost_with_cache': daily_cost_with_cache,
        'daily_savings': savings,
        'savings_percent': savings_percent,
        'monthly_savings': savings * 30,
        'annual_savings': savings * 365,
    }

# Example
roi = calculate_cache_roi(
    requests_per_day=10_000,
    avg_tokens_per_request=2000,
    cache_hit_rate=0.60,
    model_price_per_1m_tokens=12.50,  # GPT-4o combined
    cache_infra_cost_per_day=5.00,
    embedding_cost_per_request=0.0001
)
print(f"Annual savings: ${roi['annual_savings']:,.2f} ({roi['savings_percent']:.1f}%)")
```

---

## 3. Model Tiering

### The Tiering Strategy

Not every request needs the most powerful model:

```
Request Complexity Pyramid
────────────────────────────────────────────
        ┌───────────┐
        │  Complex  │  5% - GPT-4/Opus
        │ reasoning │  ($30/1M output)
        ├───────────┤
        │  Standard │  35% - GPT-4o/Sonnet
        │   tasks   │  ($10-15/1M output)
        ├───────────┤
        │  Simple   │  60% - GPT-3.5/Haiku
        │  queries  │  ($1-1.50/1M output)
        └───────────┘
```

### Router Implementation

```python
from enum import Enum
from dataclasses import dataclass

class ModelTier(Enum):
    BUDGET = "budget"
    STANDARD = "standard"
    PREMIUM = "premium"

@dataclass
class TierConfig:
    model: str
    max_tokens: int
    temperature: float
    cost_per_1k_tokens: float

TIER_CONFIGS = {
    ModelTier.BUDGET: TierConfig(
        model="gpt-3.5-turbo",
        max_tokens=1000,
        temperature=0.7,
        cost_per_1k_tokens=0.002
    ),
    ModelTier.STANDARD: TierConfig(
        model="gpt-4o",
        max_tokens=2000,
        temperature=0.7,
        cost_per_1k_tokens=0.0125
    ),
    ModelTier.PREMIUM: TierConfig(
        model="gpt-4-turbo",
        max_tokens=4000,
        temperature=0.5,
        cost_per_1k_tokens=0.04
    ),
}

class ModelRouter:
    """Route requests to appropriate model tier."""

    def __init__(self):
        self.openai = OpenAI()
        self.classifier_prompt = """
        Classify this user request by complexity:
        - SIMPLE: Greetings, FAQs, simple lookups, formatting
        - MODERATE: Summarization, standard Q&A, basic analysis
        - COMPLEX: Multi-step reasoning, creative writing, code generation, analysis

        Request: {request}

        Classification (SIMPLE/MODERATE/COMPLEX):
        """

    def classify_request(self, request: str) -> ModelTier:
        """Determine appropriate tier for request."""
        # Quick heuristics first (free)
        request_lower = request.lower()

        # Simple patterns
        simple_patterns = ['hello', 'hi', 'thanks', 'bye', 'help', 'what is']
        if any(p in request_lower for p in simple_patterns) and len(request) < 50:
            return ModelTier.BUDGET

        # Complex patterns
        complex_patterns = ['analyze', 'compare', 'explain why', 'write code', 'create a']
        if any(p in request_lower for p in complex_patterns) or len(request) > 500:
            return ModelTier.PREMIUM

        # Use classifier for ambiguous cases
        response = self.openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{
                "role": "user",
                "content": self.classifier_prompt.format(request=request)
            }],
            max_tokens=10,
            temperature=0,
        )

        classification = response.choices[0].message.content.strip().upper()

        if "SIMPLE" in classification:
            return ModelTier.BUDGET
        elif "COMPLEX" in classification:
            return ModelTier.PREMIUM
        return ModelTier.STANDARD

    def get_config(self, request: str) -> TierConfig:
        """Get model configuration for request."""
        tier = self.classify_request(request)
        return TIER_CONFIGS[tier]
```

### Quality Fallback Pattern

```python
class QualityAwareRouter:
    """Route with quality verification and fallback."""

    def __init__(self, router: ModelRouter):
        self.router = router
        self.openai = OpenAI()

    async def generate(self, request: str, quality_threshold: float = 0.7) -> str:
        """Generate response with quality verification."""
        config = self.router.get_config(request)

        # Try with selected tier
        response = await self._generate_with_config(request, config)

        # Verify quality
        quality_score = await self._evaluate_quality(request, response)

        if quality_score < quality_threshold:
            # Fallback to higher tier
            current_tier = self._get_tier_for_config(config)
            if current_tier != ModelTier.PREMIUM:
                higher_config = TIER_CONFIGS[ModelTier.PREMIUM]
                response = await self._generate_with_config(request, higher_config)

        return response

    async def _evaluate_quality(self, request: str, response: str) -> float:
        """Quick quality check using fast model."""
        eval_prompt = f"""
        Rate this response quality from 0.0 to 1.0:
        Question: {request}
        Answer: {response}
        Score (0.0-1.0):
        """

        result = await self.openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": eval_prompt}],
            max_tokens=5,
            temperature=0,
        )

        try:
            return float(result.choices[0].message.content.strip())
        except:
            return 0.5  # Default to middle score
```

---

## 4. Prompt Optimization

### Token Reduction Techniques

**1. Compress System Prompts**

```python
# Before: 450 tokens
system_prompt_verbose = """
You are a helpful customer service assistant for Acme Corporation.
Your role is to help customers with their questions and concerns.
You should always be polite, professional, and helpful.
When you don't know something, you should say so honestly.
You have access to information about our products, shipping, returns, and policies.
Please provide accurate information and help customers resolve their issues.
Always greet customers warmly and thank them for their business.
"""

# After: 180 tokens (60% reduction)
system_prompt_compressed = """
Role: Acme Corp customer service assistant
Tone: Professional, helpful, honest
Knowledge: Products, shipping, returns, policies
Guidelines: Acknowledge unknowns, thank customers
"""
```

**2. Optimize Context Inclusion**

```python
def optimize_context(documents: list[str], query: str, max_tokens: int = 2000) -> str:
    """Include only relevant context, compressed."""

    # Score relevance
    scored = []
    for doc in documents:
        score = calculate_relevance(doc, query)
        scored.append((score, doc))

    # Sort by relevance
    scored.sort(reverse=True)

    # Include top documents until token limit
    context_parts = []
    current_tokens = 0

    for score, doc in scored:
        doc_tokens = estimate_tokens(doc)
        if current_tokens + doc_tokens > max_tokens:
            # Try compressed version
            compressed = compress_document(doc)
            if current_tokens + estimate_tokens(compressed) <= max_tokens:
                context_parts.append(compressed)
                current_tokens += estimate_tokens(compressed)
        else:
            context_parts.append(doc)
            current_tokens += doc_tokens

    return "\n\n".join(context_parts)

def compress_document(doc: str) -> str:
    """Extract key information from document."""
    # Use bullet points
    # Remove filler words
    # Keep facts and figures
    pass
```

**3. Efficient Output Constraints**

```python
# Instead of asking for verbose responses
bad_prompt = "Explain in detail with examples..."

# Request structured, concise output
good_prompt = """
Answer in this format:
- Summary (1-2 sentences)
- Key points (3-5 bullets)
- Action items (if any)
"""
```

### Prompt Templates with Variables

```python
class PromptTemplate:
    """Efficient prompt construction with caching."""

    def __init__(self, template: str):
        self.template = template
        self.base_tokens = estimate_tokens(template)
        self._compiled = None

    def render(self, **kwargs) -> str:
        """Render template with variables."""
        return self.template.format(**kwargs)

    def estimate_cost(self, **kwargs) -> float:
        """Estimate token cost before rendering."""
        variable_tokens = sum(
            estimate_tokens(str(v)) for v in kwargs.values()
        )
        return self.base_tokens + variable_tokens

# Usage
template = PromptTemplate("""
Summarize this document:
{document}

Requirements:
- Max 3 sentences
- Include key facts
- Professional tone
""")

# Check cost before calling API
estimated_tokens = template.estimate_cost(document=user_document)
if estimated_tokens > 4000:
    # Document too long, need to chunk or summarize first
    pass
```

---

## 5. Monitoring and Alerts

### Cost Tracking System

```python
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from collections import defaultdict

@dataclass
class UsageRecord:
    timestamp: datetime
    model: str
    input_tokens: int
    output_tokens: int
    cost: float
    user_id: str = None
    feature: str = None

class CostMonitor:
    """Track and alert on AI costs."""

    def __init__(self, daily_budget: float, alert_threshold: float = 0.8):
        self.daily_budget = daily_budget
        self.alert_threshold = alert_threshold
        self.records: list[UsageRecord] = []
        self.alerts_sent: set[str] = set()

    def record_usage(self, record: UsageRecord):
        """Record API usage."""
        self.records.append(record)
        self._check_alerts()

    def get_daily_spend(self, date: datetime = None) -> float:
        """Get total spend for a day."""
        target_date = (date or datetime.now()).date()
        return sum(
            r.cost for r in self.records
            if r.timestamp.date() == target_date
        )

    def get_spend_by_feature(self, days: int = 7) -> dict[str, float]:
        """Get spend breakdown by feature."""
        cutoff = datetime.now() - timedelta(days=days)
        spend = defaultdict(float)
        for r in self.records:
            if r.timestamp > cutoff:
                spend[r.feature or 'unknown'] += r.cost
        return dict(spend)

    def get_spend_by_user(self, days: int = 7) -> dict[str, float]:
        """Get spend breakdown by user."""
        cutoff = datetime.now() - timedelta(days=days)
        spend = defaultdict(float)
        for r in self.records:
            if r.timestamp > cutoff:
                spend[r.user_id or 'anonymous'] += r.cost
        return dict(spend)

    def _check_alerts(self):
        """Check if alerts should be sent."""
        daily_spend = self.get_daily_spend()
        threshold_amount = self.daily_budget * self.alert_threshold

        alert_key = f"daily_{datetime.now().date()}"

        if daily_spend >= threshold_amount and alert_key not in self.alerts_sent:
            self._send_alert(
                f"Daily spend ${daily_spend:.2f} reached {self.alert_threshold*100}% "
                f"of budget ${self.daily_budget:.2f}"
            )
            self.alerts_sent.add(alert_key)

        if daily_spend >= self.daily_budget:
            budget_key = f"budget_{datetime.now().date()}"
            if budget_key not in self.alerts_sent:
                self._send_alert(
                    f"CRITICAL: Daily budget exceeded! "
                    f"Spend: ${daily_spend:.2f}, Budget: ${self.daily_budget:.2f}"
                )
                self.alerts_sent.add(budget_key)

    def _send_alert(self, message: str):
        """Send alert via configured channels."""
        print(f"ALERT: {message}")
        # Integrate with Slack, email, PagerDuty, etc.
```

### Dashboard Metrics

```python
def generate_cost_report(monitor: CostMonitor, days: int = 30) -> dict:
    """Generate comprehensive cost report."""

    cutoff = datetime.now() - timedelta(days=days)
    period_records = [r for r in monitor.records if r.timestamp > cutoff]

    return {
        'summary': {
            'total_spend': sum(r.cost for r in period_records),
            'total_requests': len(period_records),
            'avg_cost_per_request': sum(r.cost for r in period_records) / len(period_records) if period_records else 0,
            'total_tokens': sum(r.input_tokens + r.output_tokens for r in period_records),
        },
        'by_model': _group_by(period_records, 'model'),
        'by_feature': _group_by(period_records, 'feature'),
        'by_day': _group_by_day(period_records),
        'top_users': sorted(
            monitor.get_spend_by_user(days).items(),
            key=lambda x: x[1],
            reverse=True
        )[:10],
        'trends': {
            'cost_trend': _calculate_trend(period_records, 'cost'),
            'volume_trend': _calculate_trend(period_records, 'count'),
        }
    }
```

---

## 6. Cost Optimization Checklist

### Implementation Priority

| Optimization | Effort | Savings | Priority |
|-------------|--------|---------|----------|
| Semantic caching | Medium | 40-70% | High |
| Model tiering | Low | 30-50% | High |
| Prompt compression | Low | 20-30% | Medium |
| Output length limits | Low | 10-20% | Medium |
| Request batching | Medium | 10-15% | Low |
| Rate limiting | Low | Variable | High (protection) |

### Quick Wins

1. **Set max_tokens appropriately** - Don't default to maximum
2. **Cache identical requests** - Even simple exact-match helps
3. **Use smaller models for classification** - Route decisions are simple
4. **Compress system prompts** - They're included in every request
5. **Set spending alerts** - Catch problems early

---

## Key Takeaways

1. **Measure first** - You can't optimize what you don't measure
2. **Cache aggressively** - Semantic caching can reduce costs 60-80%
3. **Tier wisely** - Match model capability to task complexity
4. **Compress prompts** - Every token costs money
5. **Alert early** - Set thresholds at 70-80% of budget

---

## Knowledge Check

Before proceeding, ensure you can answer:

1. How do you calculate the ROI of implementing semantic caching?
2. What criteria determine which model tier to use?
3. How can you reduce system prompt tokens by 50%+?
4. What metrics should a cost monitoring dashboard display?
5. When should model tiering use fallback to a higher tier?

---

## Next Module Preview

In **Module 9: Production Deployment**, you'll learn to deploy AI applications to cloud platforms with proper scaling, security, and reliability. We'll cover AWS, GCP, and Azure deployment patterns.

---

*Module 8 of 12 | Building AI-Powered Applications | Duration: 4 hours*
