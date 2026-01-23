# Module 10 Lab: Building an AI Observability System

## Lab Overview

**Duration:** 3-4 hours
**Difficulty:** Intermediate
**Prerequisites:** Modules 1-9, Basic Prometheus/Grafana knowledge helpful

In this lab, you'll build a comprehensive observability system for an AI application, including structured logging, quality metrics, dashboards, and A/B testing.

---

## Learning Objectives

By completing this lab, you will:

1. Implement structured logging for AI requests
2. Build quality measurement and tracking systems
3. Create a monitoring dashboard
4. Set up alerting rules
5. Implement A/B testing for prompts

---

## Setup

### Prerequisites

```bash
mkdir ai-observability && cd ai-observability

# Initialize project
npm init -y  # or use Python

# For Python
pip install structlog prometheus_client fastapi uvicorn openai scipy numpy
```

### Docker Setup (for Prometheus/Grafana)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:v2.45.0
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana:10.0.0
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana

volumes:
  grafana-data:
```

Create `prometheus.yml`:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'ai-app'
    static_configs:
      - targets: ['host.docker.internal:8000']
```

---

## Part 1: Structured Logging (45 minutes)

### Task 1.1: Create the Logging System

Create `src/logging/ai_logger.py`:

```python
import structlog
import hashlib
from datetime import datetime
from typing import Optional, Dict, Any
from dataclasses import dataclass, asdict
import json

# Configure structlog
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.add_log_level,
        structlog.processors.JSONRenderer()
    ]
)

@dataclass
class AIRequestLog:
    request_id: str
    timestamp: str
    event_type: str  # 'request', 'response', 'error', 'quality'
    model: str
    feature: str
    user_id: Optional[str] = None

    # Request fields
    prompt_hash: Optional[str] = None
    prompt_length: Optional[int] = None

    # Response fields
    response_length: Optional[int] = None
    tokens_input: Optional[int] = None
    tokens_output: Optional[int] = None
    latency_ms: Optional[int] = None
    cost_usd: Optional[float] = None
    cached: Optional[bool] = None
    cache_type: Optional[str] = None

    # Error fields
    error_type: Optional[str] = None
    error_message: Optional[str] = None
    recoverable: Optional[bool] = None

    # Quality fields
    signal_type: Optional[str] = None
    quality_score: Optional[float] = None

class AILogger:
    """Structured logger for AI applications."""

    def __init__(self):
        self.logger = structlog.get_logger()
        self.logs: list = []  # In-memory storage for lab

    # TODO: Implement log_request method
    def log_request(
        self,
        request_id: str,
        prompt: str,
        model: str,
        feature: str,
        user_id: Optional[str] = None
    ) -> AIRequestLog:
        """
        Log an incoming AI request.

        Requirements:
        1. Hash the prompt (don't log raw prompt for privacy)
        2. Record prompt length
        3. Create AIRequestLog with event_type='request'
        4. Log using structlog
        5. Store in self.logs
        6. Return the log entry
        """
        # Your implementation here
        pass

    # TODO: Implement log_response method
    def log_response(
        self,
        request_id: str,
        response: str,
        model: str,
        feature: str,
        tokens_input: int,
        tokens_output: int,
        latency_ms: int,
        cost_usd: float,
        cached: bool = False,
        cache_type: Optional[str] = None
    ) -> AIRequestLog:
        """
        Log an AI response.

        Requirements:
        1. Calculate response length
        2. Create AIRequestLog with event_type='response'
        3. Include all token and cost information
        4. Log and store
        """
        # Your implementation here
        pass

    # TODO: Implement log_error method
    def log_error(
        self,
        request_id: str,
        error_type: str,
        error_message: str,
        model: str,
        feature: str,
        recoverable: bool
    ) -> AIRequestLog:
        """Log an AI error."""
        # Your implementation here
        pass

    # TODO: Implement log_quality_signal method
    def log_quality_signal(
        self,
        request_id: str,
        signal_type: str,  # 'thumbs_up', 'thumbs_down', 'regenerate', 'edit'
        model: str,
        feature: str,
        user_id: Optional[str] = None
    ) -> AIRequestLog:
        """Log a user quality signal."""
        # Your implementation here
        pass

    def get_logs(self, event_type: Optional[str] = None) -> list:
        """Get stored logs, optionally filtered by type."""
        if event_type:
            return [l for l in self.logs if l.event_type == event_type]
        return self.logs
```

### Task 1.2: Test Your Logger

Create `tests/test_logger.py`:

```python
from src.logging.ai_logger import AILogger

def test_logging():
    logger = AILogger()

    # Test request logging
    req_log = logger.log_request(
        request_id="test-123",
        prompt="What is the weather today?",
        model="gpt-4o",
        feature="chat",
        user_id="user-456"
    )

    assert req_log.event_type == "request"
    assert req_log.prompt_hash is not None
    assert req_log.prompt_length == len("What is the weather today?")
    assert req_log.model == "gpt-4o"
    print("✓ Request logging works")

    # Test response logging
    resp_log = logger.log_response(
        request_id="test-123",
        response="I don't have real-time weather data.",
        model="gpt-4o",
        feature="chat",
        tokens_input=15,
        tokens_output=10,
        latency_ms=1200,
        cost_usd=0.0005,
        cached=False
    )

    assert resp_log.event_type == "response"
    assert resp_log.latency_ms == 1200
    print("✓ Response logging works")

    # Test quality signal logging
    quality_log = logger.log_quality_signal(
        request_id="test-123",
        signal_type="thumbs_up",
        model="gpt-4o",
        feature="chat",
        user_id="user-456"
    )

    assert quality_log.signal_type == "thumbs_up"
    print("✓ Quality signal logging works")

    # Test retrieval
    all_logs = logger.get_logs()
    assert len(all_logs) == 3
    print("✓ Log retrieval works")

    print("\nAll logging tests passed!")

if __name__ == "__main__":
    test_logging()
```

---

## Part 2: Quality Metrics (60 minutes)

### Task 2.1: Implement Quality Evaluator

Create `src/quality/evaluator.py`:

```python
from dataclasses import dataclass
from typing import Optional, List
from openai import OpenAI
import re

@dataclass
class QualityScore:
    request_id: str
    coherence: Optional[float] = None
    relevance: Optional[float] = None
    helpfulness: Optional[float] = None
    format_valid: Optional[bool] = None
    overall: Optional[float] = None

class QualityEvaluator:
    """Evaluate AI output quality."""

    def __init__(self, openai_api_key: str):
        self.client = OpenAI(api_key=openai_api_key)

    # TODO: Implement evaluate_coherence
    async def evaluate_coherence(self, response: str) -> float:
        """
        Evaluate response coherence (0-1).
        Use GPT-3.5 to judge if the response is logically coherent.
        """
        # Your implementation here
        pass

    # TODO: Implement evaluate_relevance
    async def evaluate_relevance(self, prompt: str, response: str) -> float:
        """
        Evaluate how relevant the response is to the prompt (0-1).
        """
        # Your implementation here
        pass

    # TODO: Implement evaluate_helpfulness
    async def evaluate_helpfulness(self, prompt: str, response: str) -> float:
        """
        Evaluate how helpful the response is (0-1).
        """
        # Your implementation here
        pass

    # TODO: Implement evaluate_format
    def evaluate_format(self, response: str, expected_format: Optional[str]) -> bool:
        """
        Check if response matches expected format.
        Formats: 'json', 'bullet_list', 'numbered_list', 'markdown'
        """
        # Your implementation here
        pass

    # TODO: Implement full_evaluation
    async def full_evaluation(
        self,
        request_id: str,
        prompt: str,
        response: str,
        expected_format: Optional[str] = None
    ) -> QualityScore:
        """
        Run full quality evaluation.
        Calculate overall score as weighted average.
        """
        # Your implementation here
        pass
```

### Task 2.2: Create Quality Aggregator

Create `src/quality/aggregator.py`:

```python
from dataclasses import dataclass
from typing import List, Dict
from datetime import datetime, timedelta
from collections import defaultdict
import statistics

@dataclass
class QualitySignal:
    timestamp: datetime
    request_id: str
    signal_type: str  # 'thumbs_up', 'thumbs_down', 'regenerate', 'edit', 'copy'
    model: str
    feature: str

@dataclass
class QualitySummary:
    period_hours: int
    total_responses: int
    avg_coherence: Optional[float]
    avg_relevance: Optional[float]
    avg_helpfulness: Optional[float]
    avg_overall: Optional[float]
    satisfaction_rate: float  # thumbs_up / (thumbs_up + thumbs_down)
    regenerate_rate: float
    signals_breakdown: Dict[str, int]

class QualityAggregator:
    """Aggregate and summarize quality metrics."""

    def __init__(self):
        self.scores: List[QualityScore] = []
        self.signals: List[QualitySignal] = []

    def add_score(self, score: QualityScore):
        """Add a quality score."""
        self.scores.append(score)

    def add_signal(self, signal: QualitySignal):
        """Add a user signal."""
        self.signals.append(signal)

    # TODO: Implement get_summary
    def get_summary(self, hours: int = 24, feature: Optional[str] = None) -> QualitySummary:
        """
        Get quality summary for time period.

        Requirements:
        1. Filter by time period
        2. Optionally filter by feature
        3. Calculate average scores
        4. Calculate satisfaction rate (positive / total feedback)
        5. Calculate regenerate rate
        6. Return QualitySummary
        """
        # Your implementation here
        pass

    # TODO: Implement get_trend
    def get_trend(self, metric: str, days: int = 7) -> List[Dict]:
        """
        Get daily trend for a metric.
        Returns list of {date, value} for each day.
        """
        # Your implementation here
        pass

    # TODO: Implement get_comparison
    def get_comparison(self, group_by: str = 'model') -> Dict[str, QualitySummary]:
        """
        Compare quality across models or features.
        """
        # Your implementation here
        pass
```

---

## Part 3: Prometheus Metrics (45 minutes)

### Task 3.1: Define Metrics

Create `src/metrics/prometheus_metrics.py`:

```python
from prometheus_client import Counter, Histogram, Gauge, generate_latest, REGISTRY
from functools import wraps
import time

# TODO: Define the following metrics

# Request counter with labels: model, feature, status
ai_requests_total = None  # Your implementation

# Latency histogram with labels: model, feature
ai_request_latency_seconds = None  # Your implementation

# Token counter with labels: model, direction (input/output)
ai_tokens_total = None  # Your implementation

# Cost counter with labels: model, feature
ai_cost_usd_total = None  # Your implementation

# Cache hit counter with labels: cache_type
ai_cache_hits_total = None  # Your implementation

# Quality gauge with labels: metric_type
ai_quality_score_gauge = None  # Your implementation

# Error counter with labels: error_type, model
ai_errors_total = None  # Your implementation

# User feedback counter with labels: signal_type, model
ai_user_feedback_total = None  # Your implementation


class MetricsCollector:
    """Collect and update Prometheus metrics."""

    def record_request(
        self,
        model: str,
        feature: str,
        status: str,
        latency_seconds: float,
        tokens_input: int,
        tokens_output: int,
        cost_usd: float,
        cached: bool = False,
        cache_type: Optional[str] = None
    ):
        """Record a complete AI request."""
        # TODO: Implement metrics recording
        # 1. Increment request counter
        # 2. Observe latency
        # 3. Increment token counters
        # 4. Increment cost counter
        # 5. If cached, increment cache hits
        pass

    def record_error(self, model: str, error_type: str):
        """Record an error."""
        # TODO: Implement
        pass

    def record_user_feedback(self, model: str, signal_type: str):
        """Record user feedback."""
        # TODO: Implement
        pass

    def update_quality_gauge(self, metric_type: str, value: float):
        """Update quality gauge."""
        # TODO: Implement
        pass

    def get_metrics(self) -> bytes:
        """Get Prometheus metrics output."""
        return generate_latest(REGISTRY)


# Decorator for automatic metrics
def track_ai_request(model: str, feature: str):
    """Decorator to automatically track AI requests."""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            start_time = time.time()
            status = "success"
            try:
                result = await func(*args, **kwargs)
                return result
            except Exception as e:
                status = "error"
                raise
            finally:
                latency = time.time() - start_time
                # Record metrics
        return wrapper
    return decorator
```

### Task 3.2: Create Metrics Endpoint

Create `src/api/metrics_endpoint.py`:

```python
from fastapi import FastAPI, Response
from src.metrics.prometheus_metrics import MetricsCollector

app = FastAPI()
metrics = MetricsCollector()

@app.get("/metrics")
async def get_metrics():
    """Prometheus metrics endpoint."""
    return Response(
        content=metrics.get_metrics(),
        media_type="text/plain"
    )

# Add other endpoints that use metrics...
```

---

## Part 4: Alerting (30 minutes)

### Task 4.1: Implement Alert Manager

Create `src/alerts/alert_manager.py`:

```python
from dataclasses import dataclass
from enum import Enum
from typing import Callable, List, Optional, Dict
from datetime import datetime, timedelta
import asyncio

class AlertSeverity(Enum):
    INFO = "info"
    WARNING = "warning"
    CRITICAL = "critical"

@dataclass
class Alert:
    name: str
    severity: AlertSeverity
    message: str
    timestamp: datetime
    metadata: Optional[Dict] = None

@dataclass
class AlertRule:
    name: str
    description: str
    condition: Callable[[], bool]
    severity: AlertSeverity
    cooldown_minutes: int = 15
    message_template: str = ""

class AlertManager:
    """Manage alerts for AI application."""

    def __init__(self):
        self.rules: List[AlertRule] = []
        self.active_alerts: List[Alert] = []
        self.alert_history: List[Alert] = []
        self.last_fired: Dict[str, datetime] = {}
        self.notification_handlers: List[Callable] = []

    def add_rule(self, rule: AlertRule):
        """Add an alert rule."""
        self.rules.append(rule)

    def add_notification_handler(self, handler: Callable):
        """Add a notification handler (email, Slack, etc.)."""
        self.notification_handlers.append(handler)

    # TODO: Implement check_rules
    def check_rules(self) -> List[Alert]:
        """
        Check all rules and return triggered alerts.

        Requirements:
        1. Check each rule's condition
        2. Respect cooldown period
        3. Create Alert objects for triggered rules
        4. Update last_fired timestamps
        5. Call notification handlers
        """
        # Your implementation here
        pass

    # TODO: Implement resolve_alert
    def resolve_alert(self, alert_name: str):
        """Mark an alert as resolved."""
        # Your implementation here
        pass

    def get_active_alerts(self) -> List[Alert]:
        """Get currently active alerts."""
        return self.active_alerts

    def get_alert_history(self, hours: int = 24) -> List[Alert]:
        """Get alert history for time period."""
        cutoff = datetime.utcnow() - timedelta(hours=hours)
        return [a for a in self.alert_history if a.timestamp > cutoff]


# TODO: Create default alert rules
def create_default_rules(metrics_client) -> List[AlertRule]:
    """
    Create standard alert rules for AI applications.

    Include rules for:
    1. High error rate (>5% in 5 minutes) - CRITICAL
    2. High latency (P95 > 10s) - WARNING
    3. Cost spike (2x above average) - WARNING
    4. Quality degradation (score < 0.7) - WARNING
    5. Cache hit rate drop (below 50%) - INFO
    """
    rules = []
    # Your implementation here
    return rules
```

---

## Part 5: A/B Testing (45 minutes)

### Task 5.1: Implement A/B Test Framework

Create `src/experiments/ab_testing.py`:

```python
from dataclasses import dataclass
from typing import Dict, List, Any, Optional
import hashlib
from datetime import datetime
from scipy import stats
import numpy as np

@dataclass
class Variant:
    name: str
    weight: float  # 0-1
    config: Dict[str, Any]

@dataclass
class Experiment:
    name: str
    description: str
    variants: List[Variant]
    start_date: datetime
    end_date: Optional[datetime] = None
    enabled: bool = True

@dataclass
class ExperimentResult:
    experiment_name: str
    variant_name: str
    user_id: str
    timestamp: datetime
    metrics: Dict[str, float]  # e.g., {'quality_score': 0.85, 'latency_ms': 1200}

class ABTestManager:
    """Manage A/B tests for AI features."""

    def __init__(self):
        self.experiments: Dict[str, Experiment] = {}
        self.assignments: Dict[str, Dict[str, str]] = {}  # user_id -> {exp_name: variant}
        self.results: List[ExperimentResult] = []

    def create_experiment(self, experiment: Experiment):
        """Create a new experiment."""
        # Validate weights
        total = sum(v.weight for v in experiment.variants)
        assert abs(total - 1.0) < 0.01, f"Weights must sum to 1, got {total}"
        self.experiments[experiment.name] = experiment

    # TODO: Implement get_variant
    def get_variant(self, experiment_name: str, user_id: str) -> Optional[Variant]:
        """
        Get variant for user in experiment.

        Requirements:
        1. Return None if experiment doesn't exist or is disabled
        2. Check for existing assignment (sticky)
        3. Assign new variant deterministically using hash
        4. Store assignment
        """
        # Your implementation here
        pass

    # TODO: Implement record_result
    def record_result(
        self,
        experiment_name: str,
        user_id: str,
        metrics: Dict[str, float]
    ):
        """Record experiment result for analysis."""
        # Your implementation here
        pass

    # TODO: Implement analyze_experiment
    def analyze_experiment(self, experiment_name: str) -> Dict:
        """
        Analyze experiment results.

        Returns:
        - Per-variant metrics (mean, std, n)
        - Statistical significance (t-test)
        - Effect size (Cohen's d)
        - Recommendation
        """
        # Your implementation here
        pass

    def stop_experiment(self, experiment_name: str):
        """Stop an experiment."""
        if experiment_name in self.experiments:
            self.experiments[experiment_name].enabled = False
            self.experiments[experiment_name].end_date = datetime.utcnow()


# Example experiment setup
def setup_prompt_experiment(manager: ABTestManager):
    """Set up a prompt optimization experiment."""
    manager.create_experiment(Experiment(
        name="system_prompt_concise",
        description="Test if concise system prompts improve quality",
        start_date=datetime.utcnow(),
        variants=[
            Variant(
                name="control",
                weight=0.5,
                config={
                    "system_prompt": "You are a helpful AI assistant. You should be thorough and provide detailed explanations."
                }
            ),
            Variant(
                name="treatment",
                weight=0.5,
                config={
                    "system_prompt": "Be helpful, accurate, and concise."
                }
            )
        ]
    ))
```

### Task 5.2: Test A/B Framework

Create `tests/test_ab.py`:

```python
from src.experiments.ab_testing import ABTestManager, Experiment, Variant
from datetime import datetime
import random

def test_ab_testing():
    manager = ABTestManager()

    # Create experiment
    manager.create_experiment(Experiment(
        name="test_experiment",
        description="Test experiment",
        start_date=datetime.utcnow(),
        variants=[
            Variant(name="control", weight=0.5, config={"value": "A"}),
            Variant(name="treatment", weight=0.5, config={"value": "B"})
        ]
    ))

    # Test variant assignment
    variant1 = manager.get_variant("test_experiment", "user-1")
    variant2 = manager.get_variant("test_experiment", "user-1")
    assert variant1.name == variant2.name, "Same user should get same variant"
    print("✓ Sticky assignment works")

    # Test distribution
    control_count = 0
    treatment_count = 0
    for i in range(1000):
        variant = manager.get_variant("test_experiment", f"user-{i}")
        if variant.name == "control":
            control_count += 1
        else:
            treatment_count += 1

    # Should be roughly 50/50
    ratio = control_count / (control_count + treatment_count)
    assert 0.4 < ratio < 0.6, f"Distribution should be ~50/50, got {ratio}"
    print(f"✓ Distribution is {ratio:.1%} control / {1-ratio:.1%} treatment")

    # Test result recording
    for i in range(100):
        user_id = f"user-{i}"
        variant = manager.get_variant("test_experiment", user_id)
        # Simulate different quality for variants
        base_quality = 0.8 if variant.name == "treatment" else 0.75
        quality = base_quality + random.gauss(0, 0.1)
        manager.record_result("test_experiment", user_id, {"quality": quality})

    # Analyze
    analysis = manager.analyze_experiment("test_experiment")
    print(f"\n✓ Analysis complete:")
    print(f"  Control: n={analysis['control']['n']}, mean={analysis['control']['mean']:.3f}")
    print(f"  Treatment: n={analysis['treatment']['n']}, mean={analysis['treatment']['mean']:.3f}")
    print(f"  p-value: {analysis['p_value']:.4f}")
    print(f"  Significant: {analysis['significant']}")
    print(f"  Recommendation: {analysis['recommendation']}")

if __name__ == "__main__":
    test_ab_testing()
```

---

## Part 6: Integration (30 minutes)

### Task 6.1: Create Unified Observability Client

Create `src/observability.py`:

```python
"""Unified observability client for AI applications."""

from src.logging.ai_logger import AILogger
from src.quality.evaluator import QualityEvaluator
from src.quality.aggregator import QualityAggregator
from src.metrics.prometheus_metrics import MetricsCollector
from src.alerts.alert_manager import AlertManager, create_default_rules
from src.experiments.ab_testing import ABTestManager

class AIObservability:
    """Unified observability for AI applications."""

    def __init__(self, openai_api_key: str):
        self.logger = AILogger()
        self.quality_evaluator = QualityEvaluator(openai_api_key)
        self.quality_aggregator = QualityAggregator()
        self.metrics = MetricsCollector()
        self.alerts = AlertManager()
        self.experiments = ABTestManager()

        # Set up default alerts
        for rule in create_default_rules(self.metrics):
            self.alerts.add_rule(rule)

    async def track_request(
        self,
        request_id: str,
        prompt: str,
        response: str,
        model: str,
        feature: str,
        tokens_input: int,
        tokens_output: int,
        latency_ms: int,
        cost_usd: float,
        user_id: str = None,
        cached: bool = False
    ):
        """Track a complete AI request through all observability systems."""

        # Log request and response
        self.logger.log_request(request_id, prompt, model, feature, user_id)
        self.logger.log_response(
            request_id, response, model, feature,
            tokens_input, tokens_output, latency_ms, cost_usd, cached
        )

        # Record metrics
        self.metrics.record_request(
            model, feature, "success",
            latency_ms / 1000, tokens_input, tokens_output,
            cost_usd, cached
        )

        # Evaluate quality (async, non-blocking)
        quality = await self.quality_evaluator.full_evaluation(
            request_id, prompt, response
        )
        self.quality_aggregator.add_score(quality)
        self.metrics.update_quality_gauge("overall", quality.overall)

        # Check alerts
        self.alerts.check_rules()

    def record_user_feedback(
        self,
        request_id: str,
        signal_type: str,
        model: str,
        feature: str,
        user_id: str = None
    ):
        """Record user feedback."""
        self.logger.log_quality_signal(request_id, signal_type, model, feature, user_id)
        self.metrics.record_user_feedback(model, signal_type)

    def get_dashboard_data(self) -> dict:
        """Get data for dashboard display."""
        return {
            "quality_summary": self.quality_aggregator.get_summary(hours=24),
            "active_alerts": self.alerts.get_active_alerts(),
            "recent_logs": self.logger.get_logs()[-100:]
        }
```

---

## Submission Requirements

### Deliverables

1. **Complete source code** including:
   - AILogger with all logging methods
   - QualityEvaluator with LLM-based evaluation
   - QualityAggregator with summaries and trends
   - Prometheus metrics definitions
   - AlertManager with default rules
   - ABTestManager with analysis

2. **Test results** showing all components working

3. **Screenshots** of:
   - Prometheus metrics endpoint output
   - (Optional) Grafana dashboard if configured

4. **Brief analysis** (200-300 words):
   - How would you extend this for production?
   - What additional metrics would be valuable?

### Grading Rubric

| Criteria | Points |
|----------|--------|
| AILogger implementation | 15 |
| Quality evaluation system | 20 |
| Prometheus metrics | 15 |
| Alert manager | 15 |
| A/B testing framework | 20 |
| Integration and testing | 10 |
| Documentation | 5 |
| **Total** | **100** |

---

## Bonus Challenges

### Bonus 1: Grafana Dashboard (+10 points)
Create a complete Grafana dashboard JSON with panels for all metrics.

### Bonus 2: Slack Alerting (+5 points)
Implement Slack webhook notification handler.

### Bonus 3: Multi-Armed Bandit (+10 points)
Implement Thompson Sampling instead of fixed A/B split.

---

*Lab 10 of 12 | Building AI-Powered Applications | Duration: 3-4 hours*
