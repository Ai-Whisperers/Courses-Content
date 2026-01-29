# Module 6: Testing & Quality Assurance - Exercise

**Duration:** 130 minutes
**Difficulty:** Intermediate-Advanced

---

## Overview

In this exercise, you will build a comprehensive testing suite for an AI-powered summarization API. You'll implement unit tests with mocked LLM calls, integration tests, evaluation metrics, and set up an A/B testing framework.

By the end of this exercise, you will have:
- A complete unit test suite with proper mocking
- Integration tests for your API endpoints
- Custom evaluation metrics for AI output quality
- A working A/B testing setup for model comparison

---

## Prerequisites

Before starting, ensure you have:

- [ ] Completed Module 5 exercise (working FastAPI app)
- [ ] Python 3.9+ installed
- [ ] pytest and pytest-asyncio installed
- [ ] Your summarization API from Module 5 (or use the starter code below)

### Install Testing Dependencies

```bash
pip install pytest pytest-asyncio pytest-cov httpx nltk rouge-score numpy
```

### Starter Code (if needed)

If you don't have a working summarization service from Module 5, create this minimal version:

```python
# app/services/summarizer.py
from openai import AsyncOpenAI
from typing import Optional

class SummarizerService:
    """Service for summarizing text using OpenAI."""

    FALLBACK_MESSAGE = "Summary unavailable. Please try again later."

    def __init__(self, model: str = "gpt-3.5-turbo", temperature: float = 0.7):
        self.client = AsyncOpenAI()
        self.model = model
        self.temperature = temperature

    def validate_input(self, text: str) -> None:
        """Validate input text before processing."""
        if text is None:
            raise ValueError("Input text cannot be None")
        if not isinstance(text, str):
            raise ValueError("Input text must be a string")
        if not text.strip():
            raise ValueError("Input text cannot be empty")
        if len(text) > 100000:
            raise ValueError("Input text exceeds maximum length")

    async def summarize(
        self,
        text: str,
        max_length: Optional[int] = None
    ) -> str:
        """
        Summarize the given text.

        Args:
            text: The text to summarize
            max_length: Optional maximum length for the summary

        Returns:
            The generated summary
        """
        self.validate_input(text)

        prompt = f"Summarize the following text concisely"
        if max_length:
            prompt += f" in {max_length} words or less"
        prompt += f":\n\n{text}"

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=self.temperature,
                max_tokens=500
            )
            return response.choices[0].message.content
        except Exception as e:
            # Log error in production
            return self.FALLBACK_MESSAGE
```

---

## Part 1: Unit Tests with Mocking (30 minutes)

### Objective

Write unit tests for the `SummarizerService` that mock OpenAI API calls to run fast and free.

### Tasks

#### 1.1 Create the Test File Structure

Create the following directory structure:

```
tests/
├── __init__.py
├── conftest.py
├── unit/
│   ├── __init__.py
│   └── test_summarizer.py
├── integration/
│   ├── __init__.py
│   └── test_api.py
└── evaluation/
    ├── __init__.py
    └── test_quality.py
```

#### 1.2 Create Test Fixtures

In `tests/conftest.py`, create reusable fixtures:

```python
# tests/conftest.py
import pytest
from unittest.mock import MagicMock, AsyncMock

# TODO: Create these fixtures

@pytest.fixture
def mock_openai_response():
    """
    Create a mock OpenAI API response.

    The mock should have:
    - choices[0].message.content = "This is a test summary."
    - usage.prompt_tokens = 100
    - usage.completion_tokens = 20
    - usage.total_tokens = 120
    """
    # YOUR CODE HERE
    pass

@pytest.fixture
def summarizer():
    """Create a SummarizerService instance for testing."""
    # YOUR CODE HERE
    pass

@pytest.fixture
def sample_texts():
    """Sample texts for testing."""
    return {
        "short": "The quick brown fox jumps over the lazy dog.",
        "medium": """
        Artificial intelligence has transformed how we interact with technology.
        Machine learning algorithms can now recognize images, understand speech,
        and generate human-like text. These advances have led to applications
        in healthcare, finance, transportation, and entertainment.
        """,
        "long": "A" * 5000  # Long text for edge case testing
    }
```

#### 1.3 Write Unit Tests for Input Validation

In `tests/unit/test_summarizer.py`:

```python
# tests/unit/test_summarizer.py
import pytest
from app.services.summarizer import SummarizerService

class TestInputValidation:
    """Test input validation logic."""

    # TODO: Implement these tests

    def test_empty_string_raises_error(self, summarizer):
        """Test that empty string input raises ValueError."""
        # YOUR CODE HERE
        pass

    def test_none_input_raises_error(self, summarizer):
        """Test that None input raises ValueError."""
        # YOUR CODE HERE
        pass

    def test_non_string_input_raises_error(self, summarizer):
        """Test that non-string input raises ValueError."""
        # YOUR CODE HERE
        pass

    def test_oversized_input_raises_error(self, summarizer):
        """Test that input exceeding max length raises ValueError."""
        # YOUR CODE HERE
        pass

    @pytest.mark.parametrize("valid_input", [
        "Short text",
        "Text with special chars: !@#$%^&*()",
        "Unicode: 中文 日本語 한국어",
        " Text with leading/trailing spaces ",
    ])
    def test_valid_inputs_pass_validation(self, summarizer, valid_input):
        """Test that valid inputs pass validation."""
        # YOUR CODE HERE - should not raise
        pass
```

#### 1.4 Write Unit Tests with Mocked LLM

```python
# Continue in tests/unit/test_summarizer.py

class TestSummarize:
    """Test summarization with mocked LLM calls."""

    @pytest.mark.asyncio
    async def test_summarize_returns_string(self, summarizer, mock_openai_response):
        """
        Test that summarize returns a string.

        TODO:
        1. Patch the OpenAI client's create method
        2. Call summarize with sample text
        3. Assert the result is a non-empty string
        """
        # YOUR CODE HERE
        pass

    @pytest.mark.asyncio
    async def test_summarize_uses_correct_model(self, summarizer, mock_openai_response):
        """
        Test that summarize uses the configured model.

        TODO:
        1. Patch the OpenAI client
        2. Call summarize
        3. Assert the create method was called with model="gpt-3.5-turbo"
        """
        # YOUR CODE HERE
        pass

    @pytest.mark.asyncio
    async def test_summarize_includes_max_length_in_prompt(
        self, summarizer, mock_openai_response
    ):
        """
        Test that max_length parameter is included in the prompt.

        TODO:
        1. Call summarize with max_length=50
        2. Verify "50" appears in the prompt sent to the API
        """
        # YOUR CODE HERE
        pass

    @pytest.mark.asyncio
    async def test_api_error_returns_fallback(self, summarizer):
        """
        Test that API errors return the fallback message.

        TODO:
        1. Patch the API to raise an exception
        2. Call summarize
        3. Assert the fallback message is returned
        """
        # YOUR CODE HERE
        pass
```

### Expected Output

When you run `pytest tests/unit/test_summarizer.py -v`, you should see:

```
tests/unit/test_summarizer.py::TestInputValidation::test_empty_string_raises_error PASSED
tests/unit/test_summarizer.py::TestInputValidation::test_none_input_raises_error PASSED
tests/unit/test_summarizer.py::TestInputValidation::test_non_string_input_raises_error PASSED
tests/unit/test_summarizer.py::TestInputValidation::test_oversized_input_raises_error PASSED
tests/unit/test_summarizer.py::TestInputValidation::test_valid_inputs_pass_validation[Short text] PASSED
tests/unit/test_summarizer.py::TestInputValidation::test_valid_inputs_pass_validation[Text with special chars] PASSED
...
tests/unit/test_summarizer.py::TestSummarize::test_summarize_returns_string PASSED
tests/unit/test_summarizer.py::TestSummarize::test_summarize_uses_correct_model PASSED
...
```

---

## Part 2: Integration Tests (35 minutes)

### Objective

Write integration tests that test your API endpoints with mocked LLM calls but real HTTP handling.

### Tasks

#### 2.1 Create a Test FastAPI App

If you don't have one, create a minimal API:

```python
# app/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.services.summarizer import SummarizerService

app = FastAPI()

class SummarizeRequest(BaseModel):
    text: str
    max_length: int | None = None

class SummarizeResponse(BaseModel):
    summary: str
    input_length: int
    output_length: int

@app.post("/api/v1/summarize", response_model=SummarizeResponse)
async def summarize(request: SummarizeRequest):
    """Summarize the provided text."""
    summarizer = SummarizerService()

    try:
        summary = await summarizer.summarize(
            request.text,
            max_length=request.max_length
        )
        return SummarizeResponse(
            summary=summary,
            input_length=len(request.text),
            output_length=len(summary)
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}
```

#### 2.2 Write Integration Tests

In `tests/integration/test_api.py`:

```python
# tests/integration/test_api.py
import pytest
from httpx import AsyncClient, ASGITransport
from unittest.mock import AsyncMock, patch, MagicMock

from app.main import app

@pytest.fixture
async def client():
    """Create an async test client."""
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as client:
        yield client

class TestHealthEndpoint:
    """Test the health check endpoint."""

    @pytest.mark.asyncio
    async def test_health_returns_200(self, client):
        """Test that health endpoint returns 200."""
        # YOUR CODE HERE
        pass

    @pytest.mark.asyncio
    async def test_health_returns_healthy_status(self, client):
        """Test that health endpoint returns healthy status."""
        # YOUR CODE HERE
        pass

class TestSummarizeEndpoint:
    """Test the summarization endpoint."""

    @pytest.mark.asyncio
    async def test_summarize_success(self, client, mock_openai_response):
        """
        Test successful summarization.

        TODO:
        1. Patch the OpenAI API call
        2. POST to /api/v1/summarize with valid text
        3. Assert 200 status and valid response structure
        """
        # YOUR CODE HERE
        pass

    @pytest.mark.asyncio
    async def test_summarize_empty_text_returns_400(self, client):
        """
        Test that empty text returns 400.

        TODO:
        1. POST with empty text
        2. Assert 400 status
        3. Assert error message mentions empty input
        """
        # YOUR CODE HERE
        pass

    @pytest.mark.asyncio
    async def test_summarize_with_max_length(self, client, mock_openai_response):
        """
        Test summarization with max_length parameter.

        TODO:
        1. POST with text and max_length
        2. Assert request succeeds
        3. Verify max_length was passed to the service
        """
        # YOUR CODE HERE
        pass

    @pytest.mark.asyncio
    async def test_summarize_response_includes_lengths(self, client, mock_openai_response):
        """
        Test that response includes input and output lengths.

        TODO:
        1. POST with known text length
        2. Assert input_length matches
        3. Assert output_length is present and reasonable
        """
        # YOUR CODE HERE
        pass

class TestErrorHandling:
    """Test API error handling."""

    @pytest.mark.asyncio
    async def test_invalid_json_returns_422(self, client):
        """Test that invalid JSON returns 422."""
        response = await client.post(
            "/api/v1/summarize",
            content="not valid json",
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 422

    @pytest.mark.asyncio
    async def test_missing_text_field_returns_422(self, client):
        """Test that missing required field returns 422."""
        # YOUR CODE HERE
        pass
```

### Expected Output

```
tests/integration/test_api.py::TestHealthEndpoint::test_health_returns_200 PASSED
tests/integration/test_api.py::TestHealthEndpoint::test_health_returns_healthy_status PASSED
tests/integration/test_api.py::TestSummarizeEndpoint::test_summarize_success PASSED
tests/integration/test_api.py::TestSummarizeEndpoint::test_summarize_empty_text_returns_400 PASSED
tests/integration/test_api.py::TestSummarizeEndpoint::test_summarize_with_max_length PASSED
tests/integration/test_api.py::TestSummarizeEndpoint::test_summarize_response_includes_lengths PASSED
tests/integration/test_api.py::TestErrorHandling::test_invalid_json_returns_422 PASSED
tests/integration/test_api.py::TestErrorHandling::test_missing_text_field_returns_422 PASSED
```

---

## Part 3: Evaluation Metrics (30 minutes)

### Objective

Implement and test evaluation metrics to measure AI output quality.

### Tasks

#### 3.1 Implement ROUGE Evaluator

Create `app/evaluation/metrics.py`:

```python
# app/evaluation/metrics.py
from typing import List, Dict
from rouge_score import rouge_scorer

class ROUGEEvaluator:
    """Evaluate text using ROUGE scores."""

    def __init__(self, metrics: List[str] = None):
        """
        Initialize the ROUGE evaluator.

        Args:
            metrics: List of ROUGE metrics to compute.
                    Defaults to ['rouge1', 'rouge2', 'rougeL']
        """
        # TODO: Initialize the scorer with specified metrics
        # YOUR CODE HERE
        pass

    def calculate_rouge(self, reference: str, candidate: str) -> Dict:
        """
        Calculate ROUGE scores between reference and candidate text.

        Args:
            reference: The ground truth text
            candidate: The generated text to evaluate

        Returns:
            Dictionary with scores for each metric, containing:
            - precision
            - recall
            - fmeasure
        """
        # TODO: Calculate and return ROUGE scores
        # YOUR CODE HERE
        pass

    def evaluate_summary(
        self,
        original: str,
        summary: str,
        min_rouge_l: float = 0.2
    ) -> Dict:
        """
        Evaluate a summary against the original text.

        Args:
            original: The original text that was summarized
            summary: The generated summary
            min_rouge_l: Minimum acceptable ROUGE-L F1 score

        Returns:
            Dictionary with:
            - scores: Full ROUGE scores
            - rouge_l_f1: The ROUGE-L F1 score
            - passes_threshold: Whether it meets minimum threshold
        """
        # TODO: Implement summary evaluation
        # YOUR CODE HERE
        pass
```

#### 3.2 Implement Semantic Similarity Evaluator

```python
# Continue in app/evaluation/metrics.py
import numpy as np

class SemanticEvaluator:
    """Evaluate semantic similarity using embeddings."""

    def __init__(self):
        """Initialize the evaluator."""
        # Note: In production, you'd use OpenAI embeddings
        # For testing, we'll use a simple word overlap metric
        pass

    def cosine_similarity(self, vec1: List[float], vec2: List[float]) -> float:
        """
        Calculate cosine similarity between two vectors.

        Args:
            vec1: First vector
            vec2: Second vector

        Returns:
            Cosine similarity score between -1 and 1
        """
        # TODO: Implement cosine similarity
        # YOUR CODE HERE
        pass

    def simple_word_similarity(self, text1: str, text2: str) -> float:
        """
        Calculate simple word-based similarity (for testing without API).

        Uses Jaccard similarity on word sets.

        Args:
            text1: First text
            text2: Second text

        Returns:
            Similarity score between 0 and 1
        """
        # TODO: Implement Jaccard similarity
        # Hint: Intersection over Union of word sets
        # YOUR CODE HERE
        pass
```

#### 3.3 Write Tests for Evaluation Metrics

In `tests/evaluation/test_quality.py`:

```python
# tests/evaluation/test_quality.py
import pytest
from app.evaluation.metrics import ROUGEEvaluator, SemanticEvaluator

class TestROUGEEvaluator:
    """Test ROUGE evaluation metrics."""

    @pytest.fixture
    def evaluator(self):
        return ROUGEEvaluator()

    def test_identical_texts_have_perfect_score(self, evaluator):
        """Test that identical texts get ROUGE-L score of 1.0."""
        text = "The quick brown fox jumps over the lazy dog."
        scores = evaluator.calculate_rouge(text, text)

        # TODO: Assert ROUGE-L F1 is 1.0
        # YOUR CODE HERE
        pass

    def test_completely_different_texts_have_low_score(self, evaluator):
        """Test that unrelated texts get low ROUGE scores."""
        text1 = "The cat sat on the mat."
        text2 = "Quantum physics explores subatomic particles."

        scores = evaluator.calculate_rouge(text1, text2)

        # TODO: Assert ROUGE-L F1 is below 0.2
        # YOUR CODE HERE
        pass

    def test_summary_evaluation_passes_good_summary(self, evaluator):
        """Test that a good summary passes the threshold."""
        original = """
        Climate change is causing global temperatures to rise at an unprecedented rate.
        Scientists warn that immediate action is needed to prevent catastrophic consequences.
        The main contributors are fossil fuel emissions and deforestation.
        """
        summary = "Climate change from fossil fuels and deforestation requires urgent action."

        result = evaluator.evaluate_summary(original, summary, min_rouge_l=0.2)

        # TODO: Assert passes_threshold is True
        # YOUR CODE HERE
        pass

    def test_summary_evaluation_fails_bad_summary(self, evaluator):
        """Test that a bad summary fails the threshold."""
        original = "Climate change is a serious global issue."
        summary = "I like pizza and video games."

        result = evaluator.evaluate_summary(original, summary, min_rouge_l=0.2)

        # TODO: Assert passes_threshold is False
        # YOUR CODE HERE
        pass

class TestSemanticEvaluator:
    """Test semantic similarity evaluation."""

    @pytest.fixture
    def evaluator(self):
        return SemanticEvaluator()

    def test_cosine_similarity_identical_vectors(self, evaluator):
        """Test cosine similarity with identical vectors."""
        vec = [1.0, 2.0, 3.0]
        similarity = evaluator.cosine_similarity(vec, vec)

        assert abs(similarity - 1.0) < 0.001

    def test_cosine_similarity_orthogonal_vectors(self, evaluator):
        """Test cosine similarity with orthogonal vectors."""
        vec1 = [1.0, 0.0, 0.0]
        vec2 = [0.0, 1.0, 0.0]

        similarity = evaluator.cosine_similarity(vec1, vec2)

        assert abs(similarity) < 0.001

    def test_word_similarity_identical_texts(self, evaluator):
        """Test word similarity with identical texts."""
        text = "The quick brown fox"
        similarity = evaluator.simple_word_similarity(text, text)

        assert similarity == 1.0

    def test_word_similarity_partial_overlap(self, evaluator):
        """Test word similarity with partial overlap."""
        text1 = "The quick brown fox"
        text2 = "The slow brown dog"

        similarity = evaluator.simple_word_similarity(text1, text2)

        # 2 common words (the, brown) out of 6 unique words
        # TODO: Assert similarity is approximately 0.33
        # YOUR CODE HERE
        pass
```

### Expected Output

```
tests/evaluation/test_quality.py::TestROUGEEvaluator::test_identical_texts_have_perfect_score PASSED
tests/evaluation/test_quality.py::TestROUGEEvaluator::test_completely_different_texts_have_low_score PASSED
tests/evaluation/test_quality.py::TestROUGEEvaluator::test_summary_evaluation_passes_good_summary PASSED
tests/evaluation/test_quality.py::TestROUGEEvaluator::test_summary_evaluation_fails_bad_summary PASSED
tests/evaluation/test_quality.py::TestSemanticEvaluator::test_cosine_similarity_identical_vectors PASSED
tests/evaluation/test_quality.py::TestSemanticEvaluator::test_cosine_similarity_orthogonal_vectors PASSED
tests/evaluation/test_quality.py::TestSemanticEvaluator::test_word_similarity_identical_texts PASSED
tests/evaluation/test_quality.py::TestSemanticEvaluator::test_word_similarity_partial_overlap PASSED
```

---

## Part 4: A/B Testing Setup (35 minutes)

### Objective

Implement an A/B testing framework to compare different AI configurations.

### Tasks

#### 4.1 Implement the A/B Testing Framework

Create `app/ab_testing/framework.py`:

```python
# app/ab_testing/framework.py
import hashlib
from dataclasses import dataclass
from datetime import datetime
from typing import Dict, List, Any, Optional

@dataclass
class Variant:
    """A variant in an A/B test."""
    name: str
    weight: float  # 0.0 to 1.0
    config: Dict[str, Any]

@dataclass
class Assignment:
    """Result of variant assignment."""
    experiment_name: str
    variant_name: str
    config: Dict[str, Any]
    user_id: str
    timestamp: datetime

class ABTestingFramework:
    """Framework for A/B testing AI configurations."""

    def __init__(self):
        """Initialize the framework."""
        self.experiments: Dict[str, Dict] = {}
        self.assignments: List[Assignment] = []
        self.outcomes: List[Dict] = []

    def create_experiment(
        self,
        name: str,
        variants: List[Variant],
        description: str = ""
    ) -> None:
        """
        Create a new experiment.

        Args:
            name: Unique experiment identifier
            variants: List of variants (weights must sum to 1.0)
            description: What the experiment tests

        Raises:
            ValueError: If weights don't sum to 1.0 or name already exists
        """
        # TODO: Validate weights sum to 1.0
        # TODO: Check experiment doesn't already exist
        # TODO: Store the experiment
        # YOUR CODE HERE
        pass

    def get_variant(self, experiment_name: str, user_id: str) -> Assignment:
        """
        Get the variant for a user.

        Uses consistent hashing so same user always gets same variant.

        Args:
            experiment_name: The experiment to get variant for
            user_id: The user identifier

        Returns:
            Assignment with variant details

        Raises:
            ValueError: If experiment doesn't exist
        """
        # TODO: Validate experiment exists
        # TODO: Use consistent hashing to determine bucket
        # TODO: Find which variant the bucket falls into
        # TODO: Record and return the assignment
        # YOUR CODE HERE
        pass

    def log_outcome(
        self,
        experiment_name: str,
        user_id: str,
        metrics: Dict[str, float]
    ) -> None:
        """
        Log the outcome metrics for a user.

        Args:
            experiment_name: The experiment
            user_id: The user
            metrics: Dictionary of metric names to values
        """
        # TODO: Find the user's assignment
        # TODO: Store the outcome with metrics
        # YOUR CODE HERE
        pass

    def get_results(self, experiment_name: str) -> Dict:
        """
        Get aggregated results for an experiment.

        Returns:
            Dictionary with per-variant statistics
        """
        # TODO: Aggregate outcomes by variant
        # TODO: Calculate mean for each metric per variant
        # YOUR CODE HERE
        pass
```

#### 4.2 Write Tests for A/B Framework

In `tests/unit/test_ab_testing.py`:

```python
# tests/unit/test_ab_testing.py
import pytest
from app.ab_testing.framework import ABTestingFramework, Variant

class TestABTestingFramework:
    """Test the A/B testing framework."""

    @pytest.fixture
    def framework(self):
        return ABTestingFramework()

    @pytest.fixture
    def sample_variants(self):
        return [
            Variant(
                name="control",
                weight=0.5,
                config={"model": "gpt-3.5-turbo"}
            ),
            Variant(
                name="treatment",
                weight=0.5,
                config={"model": "gpt-4"}
            )
        ]

    def test_create_experiment_success(self, framework, sample_variants):
        """Test successful experiment creation."""
        framework.create_experiment(
            name="test_experiment",
            variants=sample_variants,
            description="Test experiment"
        )

        assert "test_experiment" in framework.experiments

    def test_create_experiment_invalid_weights(self, framework):
        """Test that invalid weights raise ValueError."""
        invalid_variants = [
            Variant(name="a", weight=0.3, config={}),
            Variant(name="b", weight=0.3, config={})  # Sum = 0.6, not 1.0
        ]

        # TODO: Assert ValueError is raised
        # YOUR CODE HERE
        pass

    def test_create_experiment_duplicate_name(self, framework, sample_variants):
        """Test that duplicate experiment names raise ValueError."""
        framework.create_experiment("test", sample_variants)

        # TODO: Assert creating same name again raises ValueError
        # YOUR CODE HERE
        pass

    def test_get_variant_consistent(self, framework, sample_variants):
        """Test that same user always gets same variant."""
        framework.create_experiment("test", sample_variants)

        # Get variant multiple times for same user
        assignments = [
            framework.get_variant("test", "user123")
            for _ in range(10)
        ]

        # TODO: Assert all assignments have the same variant
        # YOUR CODE HERE
        pass

    def test_get_variant_distribution(self, framework, sample_variants):
        """Test that variants are distributed according to weights."""
        framework.create_experiment("test", sample_variants)

        # Get variants for many different users
        variants = [
            framework.get_variant("test", f"user{i}").variant_name
            for i in range(1000)
        ]

        control_count = variants.count("control")
        treatment_count = variants.count("treatment")

        # With 50/50 weights, expect roughly equal distribution
        # Allow 10% tolerance
        # TODO: Assert counts are within expected range
        # YOUR CODE HERE
        pass

    def test_get_variant_nonexistent_experiment(self, framework):
        """Test that nonexistent experiment raises ValueError."""
        # TODO: Assert ValueError is raised
        # YOUR CODE HERE
        pass

    def test_log_outcome(self, framework, sample_variants):
        """Test logging experiment outcomes."""
        framework.create_experiment("test", sample_variants)
        framework.get_variant("test", "user123")

        framework.log_outcome(
            "test",
            "user123",
            {"latency_ms": 150, "quality_score": 0.85}
        )

        assert len(framework.outcomes) == 1

    def test_get_results_aggregates_correctly(self, framework, sample_variants):
        """Test that results are aggregated correctly per variant."""
        framework.create_experiment("test", sample_variants)

        # Simulate outcomes for multiple users
        # Control users: latency 100, 120, 140
        # Treatment users: latency 80, 90, 100

        test_data = [
            ("user1", {"latency_ms": 100}),  # Will be assigned to one variant
            ("user2", {"latency_ms": 120}),
            ("user3", {"latency_ms": 80}),
            ("user4", {"latency_ms": 90}),
        ]

        for user_id, metrics in test_data:
            framework.get_variant("test", user_id)
            framework.log_outcome("test", user_id, metrics)

        results = framework.get_results("test")

        # TODO: Assert results contain both variants
        # TODO: Assert each variant has mean latency calculated
        # YOUR CODE HERE
        pass
```

#### 4.3 Integrate A/B Testing with API (Optional Challenge)

Create a middleware or dependency that integrates A/B testing:

```python
# app/api/dependencies.py
from fastapi import Request, Depends
from app.ab_testing.framework import ABTestingFramework

# Global framework instance (in production, use proper DI)
ab_framework = ABTestingFramework()

def get_ab_framework() -> ABTestingFramework:
    """Dependency to get the A/B framework."""
    return ab_framework

async def get_user_variant(
    request: Request,
    framework: ABTestingFramework = Depends(get_ab_framework)
):
    """
    Get the A/B test variant for the current user.

    Uses session ID or IP as user identifier.
    """
    # TODO: Extract user ID from request
    # TODO: Get and return variant assignment
    # YOUR CODE HERE
    pass
```

### Expected Output

```
tests/unit/test_ab_testing.py::TestABTestingFramework::test_create_experiment_success PASSED
tests/unit/test_ab_testing.py::TestABTestingFramework::test_create_experiment_invalid_weights PASSED
tests/unit/test_ab_testing.py::TestABTestingFramework::test_create_experiment_duplicate_name PASSED
tests/unit/test_ab_testing.py::TestABTestingFramework::test_get_variant_consistent PASSED
tests/unit/test_ab_testing.py::TestABTestingFramework::test_get_variant_distribution PASSED
tests/unit/test_ab_testing.py::TestABTestingFramework::test_get_variant_nonexistent_experiment PASSED
tests/unit/test_ab_testing.py::TestABTestingFramework::test_log_outcome PASSED
tests/unit/test_ab_testing.py::TestABTestingFramework::test_get_results_aggregates_correctly PASSED
```

---

## Deliverables Checklist

By completing this exercise, you should have:

- [ ] **Unit Tests** (`tests/unit/test_summarizer.py`)
  - [ ] Input validation tests (5+ tests)
  - [ ] Summarization tests with mocking (4+ tests)
  - [ ] Error handling tests (2+ tests)

- [ ] **Integration Tests** (`tests/integration/test_api.py`)
  - [ ] Health endpoint tests (2 tests)
  - [ ] Summarize endpoint tests (4+ tests)
  - [ ] Error handling tests (2+ tests)

- [ ] **Evaluation Metrics** (`app/evaluation/metrics.py`)
  - [ ] ROUGE evaluator implementation
  - [ ] Semantic similarity implementation
  - [ ] Tests for both evaluators

- [ ] **A/B Testing Framework** (`app/ab_testing/framework.py`)
  - [ ] Experiment creation
  - [ ] Consistent variant assignment
  - [ ] Outcome logging
  - [ ] Results aggregation
  - [ ] Comprehensive tests

---

## Running All Tests

Run the complete test suite:

```bash
# Run all tests with coverage
pytest tests/ -v --cov=app --cov-report=term-missing

# Run only unit tests
pytest tests/unit/ -v

# Run only integration tests
pytest tests/integration/ -v

# Run with detailed output
pytest tests/ -v --tb=long
```

### Expected Coverage

Aim for at least 80% code coverage on the modules you've implemented.

---

## Bonus Challenges

If you finish early, try these extensions:

1. **Add BLEU Score**: Implement a BLEU evaluator alongside ROUGE
2. **Statistical Significance**: Add a t-test to the A/B results to determine significance
3. **Golden Dataset**: Create a golden dataset with 10 test cases and regression tests
4. **CI Integration**: Create a GitHub Actions workflow that runs your tests

---

## Common Issues and Solutions

### Issue: pytest-asyncio not detecting async tests

**Solution:** Add to `pyproject.toml` or `pytest.ini`:
```ini
[tool:pytest]
asyncio_mode = auto
```

### Issue: Mock not being applied correctly

**Solution:** Ensure you're patching at the right location - where the object is used, not where it's defined:
```python
# Wrong: patches where OpenAI is defined
@patch('openai.AsyncOpenAI')

# Right: patches where it's imported in your module
@patch('app.services.summarizer.AsyncOpenAI')
```

### Issue: ROUGE score returns 0 for similar texts

**Solution:** Ensure you're using the right ROUGE variant. ROUGE-L is most forgiving for paraphrasing.

---

## Summary

In this exercise, you learned to:

1. **Write effective unit tests** that mock expensive LLM calls
2. **Build integration tests** that verify API behavior end-to-end
3. **Implement evaluation metrics** to measure AI output quality
4. **Create an A/B testing framework** for comparing configurations

These skills are essential for maintaining quality in production AI applications.
