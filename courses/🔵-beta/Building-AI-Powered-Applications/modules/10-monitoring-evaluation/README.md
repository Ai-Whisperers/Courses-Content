# Module 10: Monitoring & Evaluation

## Learning Objectives

By the end of this module, you will be able to:

1. Implement comprehensive logging for AI applications
2. Define and track quality metrics for LLM outputs
3. Build dashboards that surface actionable insights
4. Set up alerting for degraded performance
5. Conduct A/B tests to optimize prompts and models

---

## Introduction

AI applications require different monitoring than traditional software. You're not just tracking uptime and latency—you need to measure output quality, detect drift, monitor costs, and understand why users are (or aren't) achieving their goals.

This module teaches you to build observability into your AI applications from the ground up, enabling data-driven decisions about prompts, models, and features.

---

## 1. The AI Observability Stack

### Three Pillars for AI Applications

```
Traditional Observability              AI Observability
────────────────────────              ────────────────────
Logs      → What happened?            + What did the AI say?
Metrics   → How is it performing?     + Is the quality good?
Traces    → Where did time go?        + Why did the AI respond this way?

Additional for AI:
─────────────────
Quality   → Is the output correct/helpful?
Cost      → How much are we spending?
Safety    → Are outputs appropriate?
```

### Monitoring Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                            │
│                                                                 │
│  Request ──▶ [Logging] ──▶ LLM Call ──▶ [Logging] ──▶ Response │
│              │                            │                     │
│              ▼                            ▼                     │
└──────────────┼────────────────────────────┼─────────────────────┘
               │                            │
               ▼                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                     OBSERVABILITY PIPELINE                       │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Logs      │  │  Metrics    │  │   Traces    │             │
│  │  (ELK/CW)   │  │(Prometheus) │  │  (Jaeger)   │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         └────────────────┼────────────────┘                     │
│                          ▼                                      │
│                   ┌─────────────┐                               │
│                   │  Dashboard  │                               │
│                   │  (Grafana)  │                               │
│                   └──────┬──────┘                               │
│                          │                                      │
│                          ▼                                      │
│                   ┌─────────────┐                               │
│                   │   Alerts    │                               │
│                   │(PagerDuty)  │                               │
│                   └─────────────┘                               │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Structured Logging for AI

### What to Log

```python
import structlog
from datetime import datetime
from typing import Optional
import hashlib

logger = structlog.get_logger()

class AIRequestLogger:
    """Structured logging for AI requests."""

    def log_request(
        self,
        request_id: str,
        prompt: str,
        model: str,
        user_id: Optional[str] = None,
        feature: Optional[str] = None,
        metadata: Optional[dict] = None
    ):
        """Log incoming AI request."""
        # Hash the prompt for privacy while enabling debugging
        prompt_hash = hashlib.sha256(prompt.encode()).hexdigest()[:16]

        logger.info(
            "ai_request_received",
            request_id=request_id,
            prompt_hash=prompt_hash,
            prompt_length=len(prompt),
            model=model,
            user_id=user_id,  # Consider hashing in production
            feature=feature,
            timestamp=datetime.utcnow().isoformat(),
            **metadata or {}
        )

    def log_response(
        self,
        request_id: str,
        response: str,
        model: str,
        tokens_input: int,
        tokens_output: int,
        latency_ms: int,
        cost: float,
        cached: bool = False,
        cache_type: Optional[str] = None
    ):
        """Log AI response."""
        logger.info(
            "ai_response_generated",
            request_id=request_id,
            response_length=len(response),
            model=model,
            tokens_input=tokens_input,
            tokens_output=tokens_output,
            tokens_total=tokens_input + tokens_output,
            latency_ms=latency_ms,
            cost_usd=cost,
            cached=cached,
            cache_type=cache_type,
            timestamp=datetime.utcnow().isoformat()
        )

    def log_error(
        self,
        request_id: str,
        error_type: str,
        error_message: str,
        recoverable: bool,
        retry_count: int = 0
    ):
        """Log AI errors."""
        logger.error(
            "ai_request_failed",
            request_id=request_id,
            error_type=error_type,
            error_message=error_message,
            recoverable=recoverable,
            retry_count=retry_count,
            timestamp=datetime.utcnow().isoformat()
        )

    def log_quality_signal(
        self,
        request_id: str,
        signal_type: str,  # 'thumbs_up', 'thumbs_down', 'regenerate', 'edit'
        user_id: Optional[str] = None
    ):
        """Log user quality signals."""
        logger.info(
            "ai_quality_signal",
            request_id=request_id,
            signal_type=signal_type,
            user_id=user_id,
            timestamp=datetime.utcnow().isoformat()
        )
```

### Log Retention and Privacy

```python
class PrivacyAwareLogger:
    """Logger that respects privacy constraints."""

    PII_PATTERNS = [
        r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',  # Email
        r'\b\d{3}-\d{2}-\d{4}\b',  # SSN
        r'\b\d{16}\b',  # Credit card
        r'\b\d{3}-\d{3}-\d{4}\b',  # Phone
    ]

    def sanitize_for_logging(self, text: str) -> str:
        """Remove PII from text before logging."""
        import re
        sanitized = text
        for pattern in self.PII_PATTERNS:
            sanitized = re.sub(pattern, '[REDACTED]', sanitized)
        return sanitized

    def should_log_prompt(self, feature: str) -> bool:
        """Determine if prompts should be logged for this feature."""
        # Don't log prompts for sensitive features
        sensitive_features = ['medical', 'financial', 'legal']
        return feature not in sensitive_features

    def get_retention_days(self, log_type: str) -> int:
        """Get retention period for log type."""
        retention = {
            'ai_request': 30,      # Requests for 30 days
            'ai_response': 30,     # Responses for 30 days
            'ai_quality': 365,     # Quality signals for 1 year
            'ai_error': 90,        # Errors for 90 days
        }
        return retention.get(log_type, 30)
```

---

## 3. Quality Metrics

### Defining Quality for AI Outputs

Quality metrics fall into several categories:

| Category | Metric | How to Measure |
|----------|--------|----------------|
| **User Satisfaction** | Thumbs up/down ratio | Explicit feedback |
| | Regeneration rate | User clicks "regenerate" |
| | Edit rate | User modifies output |
| | Task completion | User achieves goal |
| **Output Quality** | Coherence score | LLM-as-judge |
| | Factual accuracy | RAG citation matching |
| | Format compliance | Regex/schema validation |
| **Safety** | Toxicity score | Content classifier |
| | PII detection | Pattern matching |
| | Policy violations | Content filter |

### Implementing Quality Measurement

```python
from dataclasses import dataclass
from typing import Optional, List
from enum import Enum

class QualitySignal(Enum):
    THUMBS_UP = "thumbs_up"
    THUMBS_DOWN = "thumbs_down"
    REGENERATE = "regenerate"
    EDIT = "edit"
    COPY = "copy"
    SHARE = "share"

@dataclass
class QualityMetrics:
    request_id: str
    coherence_score: Optional[float] = None  # 0-1
    relevance_score: Optional[float] = None  # 0-1
    format_valid: Optional[bool] = None
    user_signal: Optional[QualitySignal] = None
    safety_score: Optional[float] = None  # 0-1, higher is safer

class QualityEvaluator:
    """Evaluate AI output quality."""

    def __init__(self, openai_client):
        self.client = openai_client

    async def evaluate_coherence(self, prompt: str, response: str) -> float:
        """Use LLM to evaluate response coherence."""
        eval_prompt = f"""
        Rate the coherence of this AI response on a scale of 0.0 to 1.0.
        A coherent response is logically structured, consistent, and makes sense.

        User prompt: {prompt}

        AI response: {response}

        Return ONLY a number between 0.0 and 1.0:
        """

        result = await self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": eval_prompt}],
            max_tokens=10,
            temperature=0
        )

        try:
            return float(result.choices[0].message.content.strip())
        except:
            return 0.5

    async def evaluate_relevance(self, prompt: str, response: str) -> float:
        """Evaluate how relevant the response is to the prompt."""
        eval_prompt = f"""
        Rate how relevant this AI response is to the user's request on a scale of 0.0 to 1.0.
        1.0 = perfectly addresses the request
        0.0 = completely irrelevant

        User request: {prompt}

        AI response: {response}

        Return ONLY a number between 0.0 and 1.0:
        """

        result = await self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": eval_prompt}],
            max_tokens=10,
            temperature=0
        )

        try:
            return float(result.choices[0].message.content.strip())
        except:
            return 0.5

    def evaluate_format(self, response: str, expected_format: str) -> bool:
        """Check if response matches expected format."""
        import json
        import re

        if expected_format == "json":
            try:
                json.loads(response)
                return True
            except:
                return False

        if expected_format == "bullet_list":
            return bool(re.search(r'^[\-\*•]\s', response, re.MULTILINE))

        if expected_format == "numbered_list":
            return bool(re.search(r'^\d+[\.\)]\s', response, re.MULTILINE))

        return True  # Default to valid if no format specified

    async def full_evaluation(
        self,
        prompt: str,
        response: str,
        expected_format: Optional[str] = None
    ) -> QualityMetrics:
        """Run full quality evaluation."""
        coherence = await self.evaluate_coherence(prompt, response)
        relevance = await self.evaluate_relevance(prompt, response)
        format_valid = self.evaluate_format(response, expected_format) if expected_format else None

        return QualityMetrics(
            request_id="",  # Set by caller
            coherence_score=coherence,
            relevance_score=relevance,
            format_valid=format_valid
        )
```

### Aggregating Quality Metrics

```python
from collections import defaultdict
from datetime import datetime, timedelta

class QualityAggregator:
    """Aggregate quality metrics over time."""

    def __init__(self):
        self.metrics: List[QualityMetrics] = []
        self.signals: defaultdict = defaultdict(int)

    def add_metric(self, metric: QualityMetrics):
        self.metrics.append(metric)
        if metric.user_signal:
            self.signals[metric.user_signal.value] += 1

    def get_summary(self, hours: int = 24) -> dict:
        """Get quality summary for time period."""
        cutoff = datetime.utcnow() - timedelta(hours=hours)
        recent = [m for m in self.metrics]  # Add timestamp filtering

        if not recent:
            return {"error": "No data available"}

        coherence_scores = [m.coherence_score for m in recent if m.coherence_score]
        relevance_scores = [m.relevance_score for m in recent if m.relevance_score]

        total_signals = sum(self.signals.values())

        return {
            "period_hours": hours,
            "total_evaluations": len(recent),
            "avg_coherence": sum(coherence_scores) / len(coherence_scores) if coherence_scores else None,
            "avg_relevance": sum(relevance_scores) / len(relevance_scores) if relevance_scores else None,
            "format_compliance_rate": sum(1 for m in recent if m.format_valid) / len(recent) if recent else None,
            "user_signals": {
                "thumbs_up_rate": self.signals["thumbs_up"] / total_signals if total_signals else 0,
                "thumbs_down_rate": self.signals["thumbs_down"] / total_signals if total_signals else 0,
                "regenerate_rate": self.signals["regenerate"] / total_signals if total_signals else 0,
            }
        }
```

---

## 4. Metrics and Dashboards

### Key Metrics to Track

```python
from prometheus_client import Counter, Histogram, Gauge

# Request metrics
ai_requests_total = Counter(
    'ai_requests_total',
    'Total AI requests',
    ['model', 'feature', 'status']
)

ai_request_latency = Histogram(
    'ai_request_latency_seconds',
    'AI request latency',
    ['model', 'feature'],
    buckets=[0.5, 1, 2, 5, 10, 30, 60]
)

# Token metrics
ai_tokens_used = Counter(
    'ai_tokens_total',
    'Total tokens used',
    ['model', 'direction']  # direction: input/output
)

# Cost metrics
ai_cost_usd = Counter(
    'ai_cost_usd_total',
    'Total AI cost in USD',
    ['model', 'feature']
)

# Quality metrics
ai_quality_score = Gauge(
    'ai_quality_score',
    'Current quality score (rolling average)',
    ['metric_type']  # coherence, relevance, etc.
)

ai_user_feedback = Counter(
    'ai_user_feedback_total',
    'User feedback signals',
    ['signal_type']  # thumbs_up, thumbs_down, etc.
)

# Cache metrics
ai_cache_hits = Counter(
    'ai_cache_hits_total',
    'Cache hits',
    ['cache_type']  # exact, semantic
)

# Error metrics
ai_errors = Counter(
    'ai_errors_total',
    'AI errors',
    ['error_type', 'recoverable']
)
```

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                     AI APPLICATION DASHBOARD                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │  Requests/min   │  │  P95 Latency    │  │  Error Rate     │    │
│  │     1,234       │  │     2.3s        │  │     0.5%        │    │
│  │    ▲ +15%       │  │    ▼ -10%       │  │    ▼ -20%       │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │  Daily Cost     │  │  Cache Hit Rate │  │  Quality Score  │    │
│  │    $234.56      │  │     67%         │  │     0.85        │    │
│  │    ▲ +5%        │  │    ▲ +8%        │  │    ━ stable     │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                    Requests Over Time                         │ │
│  │  ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁▂▃▄▅▆▇█▇▆▅▄▃▂▁▂▃▄▅▆▇█▇▆▅▄▃▂              │ │
│  │  00:00   04:00   08:00   12:00   16:00   20:00   24:00       │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ┌────────────────────────┐  ┌────────────────────────────────┐  │
│  │   Cost by Model        │  │   Quality Signals              │  │
│  │   ████████ GPT-4o 65%  │  │   👍 Thumbs Up:    78%        │  │
│  │   ████ GPT-3.5    25%  │  │   👎 Thumbs Down:  12%        │  │
│  │   ██ Claude       10%  │  │   🔄 Regenerate:   10%        │  │
│  └────────────────────────┘  └────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 5. Alerting

### Alert Configuration

```python
from dataclasses import dataclass
from enum import Enum
from typing import Callable, List

class AlertSeverity(Enum):
    INFO = "info"
    WARNING = "warning"
    CRITICAL = "critical"

@dataclass
class AlertRule:
    name: str
    condition: Callable[[], bool]
    severity: AlertSeverity
    message_template: str
    cooldown_minutes: int = 15

class AlertManager:
    """Manage AI application alerts."""

    def __init__(self):
        self.rules: List[AlertRule] = []
        self.last_fired: dict = {}

    def add_rule(self, rule: AlertRule):
        self.rules.append(rule)

    def check_all_rules(self) -> List[dict]:
        """Check all alert rules and return triggered alerts."""
        triggered = []

        for rule in self.rules:
            if self._should_check(rule) and rule.condition():
                alert = {
                    "name": rule.name,
                    "severity": rule.severity.value,
                    "message": rule.message_template,
                    "timestamp": datetime.utcnow().isoformat()
                }
                triggered.append(alert)
                self.last_fired[rule.name] = datetime.utcnow()

        return triggered

    def _should_check(self, rule: AlertRule) -> bool:
        """Check if cooldown has passed."""
        if rule.name not in self.last_fired:
            return True
        elapsed = datetime.utcnow() - self.last_fired[rule.name]
        return elapsed.total_seconds() > rule.cooldown_minutes * 60


# Example alert rules
def create_default_alerts(metrics_client) -> AlertManager:
    """Create default alert rules."""
    manager = AlertManager()

    # Error rate alert
    manager.add_rule(AlertRule(
        name="high_error_rate",
        condition=lambda: metrics_client.get_error_rate(minutes=5) > 0.05,
        severity=AlertSeverity.CRITICAL,
        message_template="Error rate exceeded 5% in last 5 minutes"
    ))

    # Latency alert
    manager.add_rule(AlertRule(
        name="high_latency",
        condition=lambda: metrics_client.get_p95_latency(minutes=5) > 10,
        severity=AlertSeverity.WARNING,
        message_template="P95 latency exceeded 10s in last 5 minutes"
    ))

    # Cost alert
    manager.add_rule(AlertRule(
        name="cost_spike",
        condition=lambda: metrics_client.get_hourly_cost() > metrics_client.get_avg_hourly_cost() * 2,
        severity=AlertSeverity.WARNING,
        message_template="Hourly cost is 2x above average"
    ))

    # Quality alert
    manager.add_rule(AlertRule(
        name="quality_degradation",
        condition=lambda: metrics_client.get_quality_score(hours=1) < 0.7,
        severity=AlertSeverity.WARNING,
        message_template="Quality score dropped below 0.7"
    ))

    return manager
```

---

## 6. A/B Testing for AI

### Experiment Framework

```python
import hashlib
from dataclasses import dataclass
from typing import Dict, Any, Optional
import random

@dataclass
class Variant:
    name: str
    weight: float  # 0-1, sum of all weights should be 1
    config: Dict[str, Any]

@dataclass
class Experiment:
    name: str
    variants: List[Variant]
    enabled: bool = True

class ABTestManager:
    """Manage A/B tests for AI features."""

    def __init__(self):
        self.experiments: Dict[str, Experiment] = {}
        self.assignments: Dict[str, Dict[str, str]] = {}  # user_id -> {exp_name: variant}

    def create_experiment(self, experiment: Experiment):
        """Create a new experiment."""
        # Validate weights sum to 1
        total_weight = sum(v.weight for v in experiment.variants)
        assert abs(total_weight - 1.0) < 0.001, "Variant weights must sum to 1"
        self.experiments[experiment.name] = experiment

    def get_variant(self, experiment_name: str, user_id: str) -> Optional[Variant]:
        """Get variant for user in experiment."""
        experiment = self.experiments.get(experiment_name)
        if not experiment or not experiment.enabled:
            return None

        # Check for existing assignment
        if user_id in self.assignments and experiment_name in self.assignments[user_id]:
            variant_name = self.assignments[user_id][experiment_name]
            return next(v for v in experiment.variants if v.name == variant_name)

        # Assign new variant deterministically based on user_id
        hash_input = f"{experiment_name}:{user_id}"
        hash_value = int(hashlib.md5(hash_input.encode()).hexdigest(), 16)
        bucket = (hash_value % 1000) / 1000  # 0-1

        cumulative = 0
        for variant in experiment.variants:
            cumulative += variant.weight
            if bucket < cumulative:
                # Store assignment
                if user_id not in self.assignments:
                    self.assignments[user_id] = {}
                self.assignments[user_id][experiment_name] = variant.name
                return variant

        return experiment.variants[-1]  # Fallback


# Example: Testing different prompts
ab_manager = ABTestManager()

ab_manager.create_experiment(Experiment(
    name="system_prompt_v2",
    variants=[
        Variant(
            name="control",
            weight=0.5,
            config={
                "system_prompt": "You are a helpful assistant."
            }
        ),
        Variant(
            name="treatment",
            weight=0.5,
            config={
                "system_prompt": "You are an expert assistant. Be concise and accurate."
            }
        )
    ]
))

# Usage in request handler
def handle_request(user_id: str, prompt: str):
    variant = ab_manager.get_variant("system_prompt_v2", user_id)
    system_prompt = variant.config["system_prompt"] if variant else "You are a helpful assistant."

    # Make request with appropriate system prompt
    # Log variant for analysis
    logger.info("ab_test_exposure", experiment="system_prompt_v2", variant=variant.name, user_id=user_id)
```

### Analyzing Experiment Results

```python
from scipy import stats
import numpy as np

class ExperimentAnalyzer:
    """Analyze A/B test results."""

    def analyze_quality_experiment(
        self,
        control_scores: List[float],
        treatment_scores: List[float]
    ) -> dict:
        """Analyze quality score differences between variants."""

        # Calculate basic stats
        control_mean = np.mean(control_scores)
        treatment_mean = np.mean(treatment_scores)

        # Statistical significance test
        t_stat, p_value = stats.ttest_ind(control_scores, treatment_scores)

        # Effect size (Cohen's d)
        pooled_std = np.sqrt(
            (np.std(control_scores)**2 + np.std(treatment_scores)**2) / 2
        )
        cohens_d = (treatment_mean - control_mean) / pooled_std

        return {
            "control": {
                "n": len(control_scores),
                "mean": control_mean,
                "std": np.std(control_scores)
            },
            "treatment": {
                "n": len(treatment_scores),
                "mean": treatment_mean,
                "std": np.std(treatment_scores)
            },
            "difference": treatment_mean - control_mean,
            "relative_improvement": (treatment_mean - control_mean) / control_mean * 100,
            "p_value": p_value,
            "significant": p_value < 0.05,
            "effect_size": cohens_d,
            "recommendation": self._get_recommendation(p_value, cohens_d, treatment_mean > control_mean)
        }

    def _get_recommendation(self, p_value: float, effect_size: float, positive: bool) -> str:
        if p_value >= 0.05:
            return "No significant difference. Continue experiment or keep control."
        if not positive:
            return "Treatment is significantly worse. Revert to control."
        if abs(effect_size) < 0.2:
            return "Significant but small effect. Consider if worth the complexity."
        if abs(effect_size) < 0.5:
            return "Significant medium effect. Consider rolling out treatment."
        return "Significant large effect. Roll out treatment."
```

---

## Key Takeaways

1. **Log everything** - But sanitize PII and respect privacy
2. **Measure quality** - User signals + automated evaluation
3. **Dashboard the essentials** - Cost, latency, quality, errors
4. **Alert proactively** - Catch problems before users complain
5. **Test systematically** - A/B test prompts and models

---

## Knowledge Check

Before proceeding, verify you can:

1. Design a structured logging schema for AI requests
2. Calculate and track quality metrics
3. Set up alerts for cost, latency, and quality
4. Design an A/B test for prompt optimization
5. Analyze experiment results for statistical significance

---

## Next Module Preview

In **Module 11: AI Agents & Advanced Patterns**, you'll explore autonomous AI systems that use tools, implement guardrails, and coordinate multiple agents.

---

*Module 10 of 12 | Building AI-Powered Applications | Duration: 4 hours*
