# Module 6: Testing & Quality Assurance

**Duration:** 6-8 hours
**Difficulty:** Intermediate-Advanced
**Prerequisites:** Modules 1-5 completed

---

## Learning Objectives

By the end of this module, you will be able to:

1. Design testing strategies specific to AI applications
2. Write unit tests that mock LLM calls effectively
3. Build integration test suites for AI pipelines
4. Implement evaluation metrics (BLEU, ROUGE, semantic similarity)
5. Set up A/B testing frameworks for model comparison
6. Create quality gates that block bad deployments
7. Build regression testing systems that catch quality degradation

---

## Prerequisites

Before starting this module, ensure you have:

- [ ] Completed Module 5 (Production Deployment)
- [ ] A working FastAPI application with AI endpoints
- [ ] Python 3.9+ installed
- [ ] Familiarity with pytest basics
- [ ] Understanding of async/await patterns

---

## 1. Why Testing AI Applications Is Different

Traditional software testing follows a simple pattern: given input X, expect output Y. AI applications break this model fundamentally.

### The Non-Determinism Problem

```python
# Traditional function - always returns the same result
def add(a, b):
    return a + b

assert add(2, 3) == 5  # Always passes

# AI function - may return different results each time
async def summarize(text: str) -> str:
    response = await openai.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": f"Summarize: {text}"}],
        temperature=0.7
    )
    return response.choices[0].message.content

# This assertion might fail on the next run!
result = await summarize("Long article about climate change...")
assert result == "Climate change is causing global temperatures to rise."
```

### Why Traditional Testing Falls Short

| Traditional Testing | AI Testing Challenge |
|--------------------|--------------------|
| Exact output matching | Outputs vary between runs |
| Fast execution | API calls are slow and costly |
| Free to run | Each test costs money |
| Deterministic | Temperature and sampling introduce randomness |
| Binary pass/fail | Quality exists on a spectrum |

### The AI Testing Mindset

Instead of testing for exact equality, you test for:

1. **Structural correctness** - Does the output have the right format?
2. **Semantic similarity** - Is the meaning close enough?
3. **Constraint satisfaction** - Does it meet requirements (length, tone, etc.)?
4. **Error handling** - Does it fail gracefully?
5. **Performance bounds** - Is it fast and cheap enough?

```python
# AI testing mindset
async def test_summarize():
    result = await summarize(LONG_ARTICLE)

    # Structural: Is it a string?
    assert isinstance(result, str)

    # Constraint: Is it shorter than the original?
    assert len(result) < len(LONG_ARTICLE)

    # Constraint: Is it within acceptable length?
    assert 50 < len(result) < 500

    # Semantic: Does it contain key concepts?
    key_concepts = ["climate", "temperature", "emissions"]
    assert any(concept in result.lower() for concept in key_concepts)
```

---

## 2. Unit Testing AI Components

Unit tests verify individual components in isolation. For AI applications, this means testing your code without making actual API calls.

### 2.1 Mocking LLM Responses

The most important skill in AI testing is mocking. You don't want to:
- Pay for API calls during tests
- Wait for slow network requests
- Deal with rate limits
- Have flaky tests due to API variability

```python
# tests/test_summarizer.py
import pytest
from unittest.mock import AsyncMock, patch, MagicMock

from app.services.summarizer import SummarizerService

@pytest.fixture
def mock_openai_response():
    """Create a mock OpenAI API response."""
    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(content="This is a test summary."))
    ]
    mock_response.usage = MagicMock(
        prompt_tokens=100,
        completion_tokens=20,
        total_tokens=120
    )
    return mock_response

@pytest.fixture
def summarizer():
    return SummarizerService()

class TestSummarizerService:

    @pytest.mark.asyncio
    async def test_summarize_returns_string(self, summarizer, mock_openai_response):
        """Test that summarize returns a string."""
        with patch.object(
            summarizer.client.chat.completions,
            'create',
            new_callable=AsyncMock,
            return_value=mock_openai_response
        ):
            result = await summarizer.summarize("Long text to summarize...")

            assert isinstance(result, str)
            assert len(result) > 0

    @pytest.mark.asyncio
    async def test_summarize_with_empty_input(self, summarizer):
        """Test that empty input raises ValueError."""
        with pytest.raises(ValueError, match="Input text cannot be empty"):
            await summarizer.summarize("")

    @pytest.mark.asyncio
    async def test_summarize_with_max_length(self, summarizer, mock_openai_response):
        """Test that max_length parameter is passed correctly."""
        with patch.object(
            summarizer.client.chat.completions,
            'create',
            new_callable=AsyncMock,
            return_value=mock_openai_response
        ) as mock_create:
            await summarizer.summarize("Text", max_length=100)

            # Verify the prompt included the length constraint
            call_args = mock_create.call_args
            messages = call_args.kwargs['messages']
            assert "100" in str(messages) or "hundred" in str(messages).lower()
```

### 2.2 Testing Error Handling

Your AI components must handle failures gracefully. Test every error path.

```python
# tests/test_error_handling.py
import pytest
from unittest.mock import AsyncMock, patch
from openai import RateLimitError, APIError, APIConnectionError

from app.services.summarizer import SummarizerService

class TestErrorHandling:

    @pytest.mark.asyncio
    async def test_rate_limit_error_triggers_retry(self, summarizer):
        """Test that rate limit errors trigger retry logic."""
        mock_response = MagicMock()
        mock_response.choices = [MagicMock(message=MagicMock(content="Success"))]

        with patch.object(
            summarizer.client.chat.completions,
            'create',
            new_callable=AsyncMock,
            side_effect=[
                RateLimitError("Rate limit exceeded", response=MagicMock(), body={}),
                mock_response  # Second call succeeds
            ]
        ) as mock_create:
            result = await summarizer.summarize("Test text")

            assert result == "Success"
            assert mock_create.call_count == 2

    @pytest.mark.asyncio
    async def test_api_error_returns_fallback(self, summarizer):
        """Test that API errors return fallback response."""
        with patch.object(
            summarizer.client.chat.completions,
            'create',
            new_callable=AsyncMock,
            side_effect=APIError("Server error", request=MagicMock(), body={})
        ):
            result = await summarizer.summarize("Test text")

            assert result == summarizer.FALLBACK_MESSAGE
            assert "unavailable" in result.lower()

    @pytest.mark.asyncio
    async def test_timeout_error_is_logged(self, summarizer, caplog):
        """Test that timeout errors are properly logged."""
        with patch.object(
            summarizer.client.chat.completions,
            'create',
            new_callable=AsyncMock,
            side_effect=APIConnectionError("Connection timeout")
        ):
            with pytest.raises(APIConnectionError):
                await summarizer.summarize("Test text")

            assert "timeout" in caplog.text.lower()
```

### 2.3 Testing Input Validation

Validate inputs before they reach the LLM to save money and prevent errors.

```python
# tests/test_validation.py
import pytest
from app.services.summarizer import SummarizerService

class TestInputValidation:

    @pytest.mark.parametrize("invalid_input,expected_error", [
        ("", "Input text cannot be empty"),
        (None, "Input text cannot be None"),
        ("a" * 100001, "Input text exceeds maximum length"),
        (123, "Input text must be a string"),
    ])
    def test_invalid_inputs_raise_errors(self, summarizer, invalid_input, expected_error):
        """Test that invalid inputs are rejected before API call."""
        with pytest.raises(ValueError, match=expected_error):
            # validate_input is sync, no API call made
            summarizer.validate_input(invalid_input)

    @pytest.mark.parametrize("valid_input", [
        "Short text",
        "A" * 1000,
        "Text with special chars: !@#$%",
        "Unicode text: \u4e2d\u6587",
    ])
    def test_valid_inputs_pass_validation(self, summarizer, valid_input):
        """Test that valid inputs pass validation."""
        # Should not raise
        summarizer.validate_input(valid_input)
```

### 2.4 Testing LangChain Components

When using LangChain, mock at the appropriate level.

```python
# tests/test_langchain_chain.py
import pytest
from unittest.mock import MagicMock, patch
from langchain.schema import AIMessage

from app.chains.qa_chain import QAChain

class TestQAChain:

    @pytest.fixture
    def qa_chain(self):
        return QAChain()

    @pytest.mark.asyncio
    async def test_chain_returns_answer(self, qa_chain):
        """Test that the QA chain returns an answer."""
        mock_llm = MagicMock()
        mock_llm.ainvoke.return_value = AIMessage(content="Paris is the capital of France.")

        with patch.object(qa_chain, 'llm', mock_llm):
            result = await qa_chain.answer("What is the capital of France?")

            assert "Paris" in result

    @pytest.mark.asyncio
    async def test_chain_uses_context(self, qa_chain):
        """Test that the chain incorporates provided context."""
        mock_llm = MagicMock()
        mock_llm.ainvoke.return_value = AIMessage(content="The answer is 42.")

        with patch.object(qa_chain, 'llm', mock_llm):
            await qa_chain.answer(
                question="What is the answer?",
                context="The answer to everything is 42."
            )

            # Verify context was included in the prompt
            call_args = mock_llm.ainvoke.call_args
            prompt = str(call_args)
            assert "42" in prompt
```

---

## 3. Integration Testing Patterns

Integration tests verify that multiple components work together correctly. For AI applications, this often means testing entire pipelines.

### 3.1 Testing the Full Pipeline

```python
# tests/integration/test_api_pipeline.py
import pytest
from httpx import AsyncClient
from unittest.mock import AsyncMock, patch

from app.main import app

@pytest.fixture
async def client():
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client

class TestAPIPipeline:

    @pytest.mark.asyncio
    async def test_summarize_endpoint_full_flow(self, client):
        """Test the complete summarization endpoint flow."""
        # Mock only the external LLM call, test everything else
        mock_response = MagicMock()
        mock_response.choices = [
            MagicMock(message=MagicMock(content="Test summary result."))
        ]

        with patch(
            'app.services.summarizer.openai.chat.completions.create',
            new_callable=AsyncMock,
            return_value=mock_response
        ):
            response = await client.post(
                "/api/v1/summarize",
                json={"text": "Long article text here...", "max_length": 100},
                headers={"Authorization": "Bearer test-api-key"}
            )

            assert response.status_code == 200
            data = response.json()
            assert "summary" in data
            assert isinstance(data["summary"], str)
            assert "tokens_used" in data

    @pytest.mark.asyncio
    async def test_rate_limiting_integration(self, client):
        """Test that rate limiting works across multiple requests."""
        mock_response = MagicMock()
        mock_response.choices = [MagicMock(message=MagicMock(content="Summary"))]

        with patch(
            'app.services.summarizer.openai.chat.completions.create',
            new_callable=AsyncMock,
            return_value=mock_response
        ):
            # Make requests up to the rate limit
            for i in range(10):
                response = await client.post(
                    "/api/v1/summarize",
                    json={"text": f"Text {i}"},
                    headers={"Authorization": "Bearer test-api-key"}
                )

                if i < 5:  # Assuming limit of 5 per minute
                    assert response.status_code == 200
                else:
                    assert response.status_code == 429
                    assert "rate limit" in response.json()["detail"].lower()
```

### 3.2 Testing with Docker Dependencies

For tests that need real databases or services, use Docker.

```python
# tests/integration/test_with_redis.py
import pytest
import redis.asyncio as redis
from testcontainers.redis import RedisContainer

from app.services.cache import CacheService

@pytest.fixture(scope="module")
def redis_container():
    """Start a Redis container for integration tests."""
    with RedisContainer() as container:
        yield container

@pytest.fixture
async def cache_service(redis_container):
    """Create a cache service connected to test Redis."""
    redis_url = f"redis://{redis_container.get_container_host_ip()}:{redis_container.get_exposed_port(6379)}"
    service = CacheService(redis_url)
    await service.connect()
    yield service
    await service.disconnect()

class TestCacheServiceIntegration:

    @pytest.mark.asyncio
    async def test_cache_stores_and_retrieves(self, cache_service):
        """Test that cache correctly stores and retrieves values."""
        key = "test:summary:abc123"
        value = {"summary": "Cached summary", "tokens": 50}

        await cache_service.set(key, value, ttl=60)
        result = await cache_service.get(key)

        assert result == value

    @pytest.mark.asyncio
    async def test_semantic_cache_finds_similar(self, cache_service):
        """Test that semantic cache finds similar queries."""
        # Store a cached response
        await cache_service.store_semantic(
            query="What is machine learning?",
            response="ML is a subset of AI...",
            embedding=[0.1, 0.2, 0.3, 0.4]  # Simplified embedding
        )

        # Query with similar text
        result = await cache_service.find_semantic(
            query="Explain machine learning",
            embedding=[0.11, 0.19, 0.31, 0.39],  # Similar embedding
            threshold=0.9
        )

        assert result is not None
        assert "ML is a subset" in result
```

### 3.3 Testing RAG Pipelines

RAG systems have multiple components that must work together.

```python
# tests/integration/test_rag_pipeline.py
import pytest
from unittest.mock import MagicMock, patch, AsyncMock

from app.rag.pipeline import RAGPipeline

class TestRAGPipeline:

    @pytest.fixture
    def rag_pipeline(self):
        return RAGPipeline(
            vector_store="chroma",
            embedding_model="text-embedding-ada-002",
            llm_model="gpt-4"
        )

    @pytest.mark.asyncio
    async def test_end_to_end_rag_query(self, rag_pipeline):
        """Test the complete RAG pipeline from query to response."""
        # Mock the embedding call
        mock_embedding = [0.1] * 1536  # Ada-002 dimension

        # Mock retrieved documents
        mock_docs = [
            MagicMock(page_content="Document 1 content about AI.", metadata={"source": "doc1.pdf"}),
            MagicMock(page_content="Document 2 content about ML.", metadata={"source": "doc2.pdf"}),
        ]

        # Mock LLM response
        mock_llm_response = MagicMock()
        mock_llm_response.choices = [
            MagicMock(message=MagicMock(content="Based on the documents, AI and ML are related fields."))
        ]

        with patch.object(rag_pipeline.embedder, 'embed_query', return_value=mock_embedding), \
             patch.object(rag_pipeline.vector_store, 'similarity_search', return_value=mock_docs), \
             patch.object(rag_pipeline.llm.chat.completions, 'create',
                         new_callable=AsyncMock, return_value=mock_llm_response):

            result = await rag_pipeline.query("How are AI and ML related?")

            assert "AI" in result.answer
            assert len(result.sources) == 2
            assert result.sources[0]["source"] == "doc1.pdf"

    @pytest.mark.asyncio
    async def test_rag_with_no_relevant_documents(self, rag_pipeline):
        """Test RAG behavior when no relevant documents are found."""
        mock_embedding = [0.1] * 1536

        with patch.object(rag_pipeline.embedder, 'embed_query', return_value=mock_embedding), \
             patch.object(rag_pipeline.vector_store, 'similarity_search', return_value=[]):

            result = await rag_pipeline.query("Completely unrelated query?")

            assert result.answer == rag_pipeline.NO_DOCUMENTS_RESPONSE
            assert len(result.sources) == 0
```

---

## 4. Evaluation Metrics for AI Outputs

Unlike traditional tests with binary pass/fail, AI outputs need quality metrics that measure "how good" the output is.

### 4.1 Understanding AI Evaluation Metrics

| Metric | What It Measures | Best For |
|--------|-----------------|----------|
| BLEU | N-gram overlap with reference | Translation, short text |
| ROUGE | Recall of n-grams from reference | Summarization |
| Semantic Similarity | Meaning closeness via embeddings | General comparison |
| Perplexity | How "surprised" the model is | Fluency, coherence |
| Custom Metrics | Domain-specific quality | Business requirements |

### 4.2 Implementing BLEU Score

BLEU (Bilingual Evaluation Understudy) measures how many n-grams in the generated text match the reference.

```python
# app/evaluation/metrics.py
from typing import List
import nltk
from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction

class BLEUEvaluator:
    """Evaluate text using BLEU score."""

    def __init__(self):
        # Download required NLTK data
        nltk.download('punkt', quiet=True)
        self.smoothing = SmoothingFunction().method1

    def calculate_bleu(
        self,
        reference: str,
        candidate: str,
        weights: tuple = (0.25, 0.25, 0.25, 0.25)
    ) -> float:
        """
        Calculate BLEU score between reference and candidate text.

        Args:
            reference: The ground truth text
            candidate: The generated text to evaluate
            weights: Weights for 1-gram, 2-gram, 3-gram, 4-gram

        Returns:
            BLEU score between 0 and 1
        """
        reference_tokens = nltk.word_tokenize(reference.lower())
        candidate_tokens = nltk.word_tokenize(candidate.lower())

        # BLEU expects a list of reference translations
        references = [reference_tokens]

        score = sentence_bleu(
            references,
            candidate_tokens,
            weights=weights,
            smoothing_function=self.smoothing
        )

        return score

    def evaluate_batch(
        self,
        references: List[str],
        candidates: List[str]
    ) -> dict:
        """Evaluate a batch of generated texts."""
        scores = []
        for ref, cand in zip(references, candidates):
            scores.append(self.calculate_bleu(ref, cand))

        return {
            "mean_bleu": sum(scores) / len(scores),
            "min_bleu": min(scores),
            "max_bleu": max(scores),
            "scores": scores
        }

# Usage in tests
def test_summarization_quality():
    evaluator = BLEUEvaluator()

    reference = "The quick brown fox jumps over the lazy dog."
    generated = "A fast brown fox leaps over a sleepy dog."

    score = evaluator.calculate_bleu(reference, generated)

    # BLEU > 0.3 is generally acceptable for paraphrasing
    assert score > 0.3, f"BLEU score {score} below threshold"
```

### 4.3 Implementing ROUGE Score

ROUGE (Recall-Oriented Understudy for Gisting Evaluation) focuses on recall - how much of the reference is captured.

```python
# app/evaluation/metrics.py
from rouge_score import rouge_scorer

class ROUGEEvaluator:
    """Evaluate text using ROUGE scores."""

    def __init__(self, metrics: List[str] = None):
        self.metrics = metrics or ['rouge1', 'rouge2', 'rougeL']
        self.scorer = rouge_scorer.RougeScorer(self.metrics, use_stemmer=True)

    def calculate_rouge(self, reference: str, candidate: str) -> dict:
        """
        Calculate ROUGE scores.

        Args:
            reference: The ground truth text
            candidate: The generated text to evaluate

        Returns:
            Dictionary with ROUGE-1, ROUGE-2, ROUGE-L scores
        """
        scores = self.scorer.score(reference, candidate)

        return {
            metric: {
                "precision": scores[metric].precision,
                "recall": scores[metric].recall,
                "fmeasure": scores[metric].fmeasure
            }
            for metric in self.metrics
        }

    def evaluate_summarization(
        self,
        original: str,
        summary: str,
        min_rouge_l: float = 0.3
    ) -> dict:
        """
        Evaluate a summary against the original text.

        For summarization, we care most about ROUGE-L (longest common subsequence)
        as it captures the main ideas while allowing for rephrasing.
        """
        scores = self.calculate_rouge(original, summary)

        return {
            "scores": scores,
            "rouge_l_f1": scores["rougeL"]["fmeasure"],
            "passes_threshold": scores["rougeL"]["fmeasure"] >= min_rouge_l
        }

# Usage in tests
def test_summary_captures_key_content():
    evaluator = ROUGEEvaluator()

    original = """
    Climate change is causing global temperatures to rise at an unprecedented rate.
    Scientists warn that immediate action is needed to prevent catastrophic consequences.
    The main contributors are fossil fuel emissions and deforestation.
    """

    summary = "Global warming from fossil fuels and deforestation requires urgent action."

    result = evaluator.evaluate_summarization(original, summary, min_rouge_l=0.25)

    assert result["passes_threshold"], f"ROUGE-L {result['rouge_l_f1']} below 0.25"
```

### 4.4 Semantic Similarity with Embeddings

When you care about meaning rather than exact words, use embeddings.

```python
# app/evaluation/metrics.py
import numpy as np
from openai import OpenAI

class SemanticEvaluator:
    """Evaluate semantic similarity using embeddings."""

    def __init__(self, model: str = "text-embedding-ada-002"):
        self.client = OpenAI()
        self.model = model

    def get_embedding(self, text: str) -> List[float]:
        """Get embedding vector for text."""
        response = self.client.embeddings.create(
            model=self.model,
            input=text
        )
        return response.data[0].embedding

    def cosine_similarity(self, vec1: List[float], vec2: List[float]) -> float:
        """Calculate cosine similarity between two vectors."""
        vec1 = np.array(vec1)
        vec2 = np.array(vec2)

        return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

    def calculate_similarity(self, text1: str, text2: str) -> float:
        """
        Calculate semantic similarity between two texts.

        Returns:
            Similarity score between -1 and 1 (typically 0 to 1 for similar texts)
        """
        emb1 = self.get_embedding(text1)
        emb2 = self.get_embedding(text2)

        return self.cosine_similarity(emb1, emb2)

    def evaluate_against_references(
        self,
        generated: str,
        references: List[str],
        threshold: float = 0.85
    ) -> dict:
        """
        Check if generated text is semantically similar to any reference.

        Useful when multiple correct answers are possible.
        """
        generated_emb = self.get_embedding(generated)

        similarities = []
        for ref in references:
            ref_emb = self.get_embedding(ref)
            sim = self.cosine_similarity(generated_emb, ref_emb)
            similarities.append(sim)

        max_similarity = max(similarities)

        return {
            "max_similarity": max_similarity,
            "all_similarities": similarities,
            "passes_threshold": max_similarity >= threshold,
            "best_match_index": similarities.index(max_similarity)
        }

# Usage in tests (with mocking for unit tests)
def test_qa_answer_semantic_correctness():
    evaluator = SemanticEvaluator()

    question = "What is the capital of France?"
    generated_answer = "Paris is the capital city of France."

    acceptable_answers = [
        "Paris",
        "The capital of France is Paris.",
        "Paris is France's capital."
    ]

    result = evaluator.evaluate_against_references(
        generated_answer,
        acceptable_answers,
        threshold=0.85
    )

    assert result["passes_threshold"], \
        f"Semantic similarity {result['max_similarity']} below 0.85"
```

### 4.5 Custom Business Metrics

Often you need domain-specific quality measures.

```python
# app/evaluation/custom_metrics.py
from typing import Dict, Any
import re

class CustomEvaluator:
    """Custom evaluation metrics for specific business requirements."""

    def evaluate_customer_response(self, response: str) -> Dict[str, Any]:
        """
        Evaluate a customer service response for quality.

        Business rules:
        - Must be polite (contains greeting/closing)
        - Must not contain prohibited phrases
        - Must be within length bounds
        - Must not make promises we can't keep
        """
        results = {
            "is_polite": self._check_politeness(response),
            "no_prohibited_phrases": self._check_prohibited(response),
            "length_ok": self._check_length(response),
            "no_false_promises": self._check_promises(response),
        }

        results["overall_pass"] = all(results.values())
        results["score"] = sum(results.values()) / 4

        return results

    def _check_politeness(self, text: str) -> bool:
        """Check for polite language."""
        polite_patterns = [
            r"\b(hello|hi|dear|thank|please|appreciate)\b",
            r"\b(best regards|sincerely|have a .* day)\b"
        ]
        text_lower = text.lower()
        return any(re.search(p, text_lower) for p in polite_patterns)

    def _check_prohibited(self, text: str) -> bool:
        """Check for prohibited phrases."""
        prohibited = [
            "competitor",
            "lawsuit",
            "stupid",
            "your fault"
        ]
        text_lower = text.lower()
        return not any(phrase in text_lower for phrase in prohibited)

    def _check_length(self, text: str, min_len: int = 50, max_len: int = 500) -> bool:
        """Check response length is appropriate."""
        return min_len <= len(text) <= max_len

    def _check_promises(self, text: str) -> bool:
        """Check for unauthorized promises."""
        dangerous_promises = [
            r"100% guarantee",
            r"definitely will",
            r"promise to",
            r"free .* forever"
        ]
        text_lower = text.lower()
        return not any(re.search(p, text_lower) for p in dangerous_promises)

# Usage in tests
def test_customer_response_quality():
    evaluator = CustomEvaluator()

    response = """
    Hello! Thank you for reaching out to us.

    I understand your concern about the delayed shipment.
    I've checked your order and can confirm it will arrive by Friday.

    Please let me know if you have any other questions.

    Best regards,
    Support Team
    """

    result = evaluator.evaluate_customer_response(response)

    assert result["overall_pass"], f"Response failed checks: {result}"
```

---

## 5. A/B Testing Frameworks

A/B testing lets you compare different AI configurations (models, prompts, parameters) to find the best one.

### 5.1 Building an A/B Testing Framework

```python
# app/ab_testing/framework.py
import random
import hashlib
from typing import Dict, Any, Callable, Optional
from dataclasses import dataclass
from datetime import datetime
import json

@dataclass
class Variant:
    """A variant in an A/B test."""
    name: str
    weight: float  # 0.0 to 1.0
    config: Dict[str, Any]

@dataclass
class ExperimentResult:
    """Result of an experiment assignment."""
    experiment_name: str
    variant_name: str
    config: Dict[str, Any]
    user_id: str
    timestamp: datetime

class ABTestingFramework:
    """Framework for running A/B tests on AI configurations."""

    def __init__(self, storage_backend: Optional[Any] = None):
        self.experiments: Dict[str, Dict] = {}
        self.storage = storage_backend  # Redis, database, etc.

    def create_experiment(
        self,
        name: str,
        variants: list[Variant],
        description: str = ""
    ) -> None:
        """
        Create a new A/B test experiment.

        Args:
            name: Unique experiment identifier
            variants: List of variants with weights summing to 1.0
            description: What the experiment tests
        """
        total_weight = sum(v.weight for v in variants)
        if abs(total_weight - 1.0) > 0.001:
            raise ValueError(f"Variant weights must sum to 1.0, got {total_weight}")

        self.experiments[name] = {
            "variants": variants,
            "description": description,
            "created_at": datetime.now(),
            "is_active": True
        }

    def get_variant(self, experiment_name: str, user_id: str) -> ExperimentResult:
        """
        Get the variant for a user in an experiment.

        Uses consistent hashing so the same user always gets the same variant.
        """
        if experiment_name not in self.experiments:
            raise ValueError(f"Experiment '{experiment_name}' not found")

        experiment = self.experiments[experiment_name]

        if not experiment["is_active"]:
            # Return control variant for inactive experiments
            return ExperimentResult(
                experiment_name=experiment_name,
                variant_name=experiment["variants"][0].name,
                config=experiment["variants"][0].config,
                user_id=user_id,
                timestamp=datetime.now()
            )

        # Consistent hashing for user assignment
        hash_input = f"{experiment_name}:{user_id}"
        hash_value = int(hashlib.md5(hash_input.encode()).hexdigest(), 16)
        bucket = (hash_value % 1000) / 1000  # 0.0 to 1.0

        # Find which variant this bucket falls into
        cumulative = 0.0
        for variant in experiment["variants"]:
            cumulative += variant.weight
            if bucket < cumulative:
                result = ExperimentResult(
                    experiment_name=experiment_name,
                    variant_name=variant.name,
                    config=variant.config,
                    user_id=user_id,
                    timestamp=datetime.now()
                )

                # Log the assignment
                if self.storage:
                    self._log_assignment(result)

                return result

        # Fallback to last variant (shouldn't happen with valid weights)
        return ExperimentResult(
            experiment_name=experiment_name,
            variant_name=experiment["variants"][-1].name,
            config=experiment["variants"][-1].config,
            user_id=user_id,
            timestamp=datetime.now()
        )

    def log_outcome(
        self,
        experiment_name: str,
        user_id: str,
        metrics: Dict[str, float]
    ) -> None:
        """Log the outcome of an experiment for a user."""
        if self.storage:
            self.storage.log_outcome(experiment_name, user_id, metrics)

    def _log_assignment(self, result: ExperimentResult) -> None:
        """Log experiment assignment for analysis."""
        if self.storage:
            self.storage.log_assignment(result)

# Example usage
def setup_model_experiment():
    """Set up an experiment comparing GPT-4 vs GPT-3.5."""
    ab = ABTestingFramework()

    ab.create_experiment(
        name="model_comparison_v1",
        variants=[
            Variant(
                name="control_gpt35",
                weight=0.5,
                config={"model": "gpt-3.5-turbo", "temperature": 0.7}
            ),
            Variant(
                name="treatment_gpt4",
                weight=0.5,
                config={"model": "gpt-4", "temperature": 0.7}
            )
        ],
        description="Compare GPT-4 vs GPT-3.5 for summarization quality"
    )

    return ab
```

### 5.2 Integrating A/B Tests with Your API

```python
# app/api/endpoints/summarize.py
from fastapi import APIRouter, Depends, Request
from app.ab_testing.framework import ABTestingFramework
from app.services.summarizer import SummarizerService
from app.evaluation.metrics import ROUGEEvaluator

router = APIRouter()

@router.post("/summarize")
async def summarize(
    request: Request,
    body: SummarizeRequest,
    ab_framework: ABTestingFramework = Depends(get_ab_framework),
    evaluator: ROUGEEvaluator = Depends(get_evaluator)
):
    """Summarize text with A/B testing for model selection."""

    # Get user ID (from auth token, session, etc.)
    user_id = request.state.user_id

    # Get experiment variant for this user
    experiment = ab_framework.get_variant("model_comparison_v1", user_id)

    # Create summarizer with experiment config
    summarizer = SummarizerService(**experiment.config)

    # Generate summary
    start_time = time.time()
    summary = await summarizer.summarize(body.text)
    latency = time.time() - start_time

    # Calculate quality metrics
    rouge_scores = evaluator.calculate_rouge(body.text, summary)

    # Log experiment outcome
    ab_framework.log_outcome(
        experiment_name="model_comparison_v1",
        user_id=user_id,
        metrics={
            "latency_ms": latency * 1000,
            "rouge_l_f1": rouge_scores["rougeL"]["fmeasure"],
            "summary_length": len(summary),
            "input_length": len(body.text)
        }
    )

    return {
        "summary": summary,
        "experiment_variant": experiment.variant_name  # For debugging
    }
```

### 5.3 Analyzing A/B Test Results

```python
# app/ab_testing/analysis.py
import pandas as pd
from scipy import stats
from typing import Dict, List

class ABTestAnalyzer:
    """Analyze A/B test results for statistical significance."""

    def __init__(self, storage_backend):
        self.storage = storage_backend

    def get_experiment_results(self, experiment_name: str) -> pd.DataFrame:
        """Fetch experiment results as a DataFrame."""
        data = self.storage.get_outcomes(experiment_name)
        return pd.DataFrame(data)

    def calculate_statistics(
        self,
        experiment_name: str,
        metric: str
    ) -> Dict:
        """
        Calculate statistics for an experiment.

        Returns mean, std, and statistical significance for each variant.
        """
        df = self.get_experiment_results(experiment_name)

        results = {}
        variants = df['variant_name'].unique()

        for variant in variants:
            variant_data = df[df['variant_name'] == variant][metric]
            results[variant] = {
                "mean": variant_data.mean(),
                "std": variant_data.std(),
                "count": len(variant_data),
                "median": variant_data.median()
            }

        # Calculate statistical significance (if 2 variants)
        if len(variants) == 2:
            control_data = df[df['variant_name'] == variants[0]][metric]
            treatment_data = df[df['variant_name'] == variants[1]][metric]

            t_stat, p_value = stats.ttest_ind(control_data, treatment_data)

            results["statistical_test"] = {
                "t_statistic": t_stat,
                "p_value": p_value,
                "is_significant": p_value < 0.05,
                "confidence_level": 0.95
            }

        return results

    def generate_report(self, experiment_name: str) -> str:
        """Generate a human-readable report for an experiment."""
        metrics = ["latency_ms", "rouge_l_f1", "summary_length"]

        report_lines = [
            f"# A/B Test Report: {experiment_name}",
            f"Generated: {datetime.now().isoformat()}",
            ""
        ]

        for metric in metrics:
            stats = self.calculate_statistics(experiment_name, metric)

            report_lines.append(f"## Metric: {metric}")
            for variant, data in stats.items():
                if variant != "statistical_test":
                    report_lines.append(
                        f"- {variant}: mean={data['mean']:.3f}, "
                        f"std={data['std']:.3f}, n={data['count']}"
                    )

            if "statistical_test" in stats:
                test = stats["statistical_test"]
                report_lines.append(
                    f"- p-value: {test['p_value']:.4f} "
                    f"({'significant' if test['is_significant'] else 'not significant'})"
                )

            report_lines.append("")

        return "\n".join(report_lines)
```

---

## 6. Quality Gates & Monitoring

Quality gates prevent bad code from reaching production. For AI applications, this means automated checks that verify output quality.

### 6.1 Implementing Quality Gates

```python
# app/quality/gates.py
from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum

class GateStatus(Enum):
    PASS = "pass"
    FAIL = "fail"
    WARN = "warn"

@dataclass
class GateResult:
    """Result of a quality gate check."""
    gate_name: str
    status: GateStatus
    message: str
    metrics: Dict[str, float]

class QualityGates:
    """Quality gates for AI application deployments."""

    def __init__(self, config: Dict):
        self.config = config

    def check_all(self, test_results: Dict) -> List[GateResult]:
        """Run all quality gates and return results."""
        results = []

        results.append(self.check_test_pass_rate(test_results))
        results.append(self.check_evaluation_scores(test_results))
        results.append(self.check_latency(test_results))
        results.append(self.check_cost(test_results))
        results.append(self.check_error_rate(test_results))

        return results

    def check_test_pass_rate(self, test_results: Dict) -> GateResult:
        """Verify minimum test pass rate."""
        passed = test_results.get("tests_passed", 0)
        total = test_results.get("tests_total", 1)
        pass_rate = passed / total

        threshold = self.config.get("min_pass_rate", 0.95)

        if pass_rate >= threshold:
            status = GateStatus.PASS
            message = f"Test pass rate {pass_rate:.1%} meets threshold {threshold:.1%}"
        else:
            status = GateStatus.FAIL
            message = f"Test pass rate {pass_rate:.1%} below threshold {threshold:.1%}"

        return GateResult(
            gate_name="test_pass_rate",
            status=status,
            message=message,
            metrics={"pass_rate": pass_rate, "threshold": threshold}
        )

    def check_evaluation_scores(self, test_results: Dict) -> GateResult:
        """Verify AI evaluation metrics meet thresholds."""
        scores = test_results.get("evaluation_scores", {})

        thresholds = self.config.get("evaluation_thresholds", {
            "rouge_l": 0.3,
            "semantic_similarity": 0.85,
            "bleu": 0.2
        })

        failures = []
        for metric, threshold in thresholds.items():
            if metric in scores and scores[metric] < threshold:
                failures.append(f"{metric}: {scores[metric]:.3f} < {threshold}")

        if not failures:
            return GateResult(
                gate_name="evaluation_scores",
                status=GateStatus.PASS,
                message="All evaluation metrics meet thresholds",
                metrics=scores
            )
        else:
            return GateResult(
                gate_name="evaluation_scores",
                status=GateStatus.FAIL,
                message=f"Evaluation failures: {', '.join(failures)}",
                metrics=scores
            )

    def check_latency(self, test_results: Dict) -> GateResult:
        """Verify response latency is acceptable."""
        p95_latency = test_results.get("p95_latency_ms", 0)
        threshold = self.config.get("max_p95_latency_ms", 2000)

        if p95_latency <= threshold:
            status = GateStatus.PASS
            message = f"P95 latency {p95_latency}ms within threshold {threshold}ms"
        elif p95_latency <= threshold * 1.2:
            status = GateStatus.WARN
            message = f"P95 latency {p95_latency}ms approaching threshold {threshold}ms"
        else:
            status = GateStatus.FAIL
            message = f"P95 latency {p95_latency}ms exceeds threshold {threshold}ms"

        return GateResult(
            gate_name="latency",
            status=status,
            message=message,
            metrics={"p95_latency_ms": p95_latency, "threshold_ms": threshold}
        )

    def check_cost(self, test_results: Dict) -> GateResult:
        """Verify cost per request is acceptable."""
        avg_cost = test_results.get("avg_cost_per_request", 0)
        threshold = self.config.get("max_cost_per_request", 0.05)

        if avg_cost <= threshold:
            status = GateStatus.PASS
        else:
            status = GateStatus.FAIL

        return GateResult(
            gate_name="cost",
            status=status,
            message=f"Avg cost ${avg_cost:.4f} vs threshold ${threshold:.4f}",
            metrics={"avg_cost": avg_cost, "threshold": threshold}
        )

    def check_error_rate(self, test_results: Dict) -> GateResult:
        """Verify error rate is acceptable."""
        error_rate = test_results.get("error_rate", 0)
        threshold = self.config.get("max_error_rate", 0.01)

        if error_rate <= threshold:
            status = GateStatus.PASS
        else:
            status = GateStatus.FAIL

        return GateResult(
            gate_name="error_rate",
            status=status,
            message=f"Error rate {error_rate:.2%} vs threshold {threshold:.2%}",
            metrics={"error_rate": error_rate, "threshold": threshold}
        )

    def should_deploy(self, results: List[GateResult]) -> bool:
        """Determine if deployment should proceed based on gate results."""
        return all(r.status != GateStatus.FAIL for r in results)
```

### 6.2 CI/CD Integration

```yaml
# .github/workflows/ai-quality-gates.yml
name: AI Quality Gates

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-and-evaluate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install -r requirements-test.txt

      - name: Run unit tests
        run: pytest tests/unit -v --tb=short

      - name: Run integration tests
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: pytest tests/integration -v --tb=short

      - name: Run evaluation tests
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: pytest tests/evaluation -v --tb=short --json-report

      - name: Check quality gates
        run: python scripts/check_quality_gates.py

      - name: Upload test results
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: test-results/
```

```python
# scripts/check_quality_gates.py
#!/usr/bin/env python
"""Check quality gates and fail CI if thresholds not met."""

import json
import sys
from app.quality.gates import QualityGates, GateStatus

def main():
    # Load test results
    with open("test-results/results.json") as f:
        test_results = json.load(f)

    # Configure gates
    config = {
        "min_pass_rate": 0.95,
        "max_p95_latency_ms": 2000,
        "max_cost_per_request": 0.05,
        "max_error_rate": 0.01,
        "evaluation_thresholds": {
            "rouge_l": 0.3,
            "semantic_similarity": 0.85
        }
    }

    gates = QualityGates(config)
    results = gates.check_all(test_results)

    # Print results
    print("\n" + "=" * 50)
    print("QUALITY GATE RESULTS")
    print("=" * 50)

    for result in results:
        icon = {"pass": "", "fail": "", "warn": ""}[result.status.value]
        print(f"{icon} {result.gate_name}: {result.message}")

    print("=" * 50)

    # Determine exit code
    if gates.should_deploy(results):
        print("\n All quality gates passed. Safe to deploy.")
        sys.exit(0)
    else:
        print("\n Quality gates failed. Deployment blocked.")
        sys.exit(1)

if __name__ == "__main__":
    main()
```

### 6.3 Production Monitoring

```python
# app/monitoring/ai_metrics.py
from prometheus_client import Counter, Histogram, Gauge
import time
from functools import wraps

# Define metrics
AI_REQUESTS = Counter(
    'ai_requests_total',
    'Total AI API requests',
    ['endpoint', 'model', 'status']
)

AI_LATENCY = Histogram(
    'ai_request_latency_seconds',
    'AI request latency',
    ['endpoint', 'model'],
    buckets=[0.1, 0.5, 1.0, 2.0, 5.0, 10.0]
)

AI_TOKENS = Counter(
    'ai_tokens_total',
    'Total tokens used',
    ['endpoint', 'model', 'token_type']
)

AI_COST = Counter(
    'ai_cost_dollars',
    'Total AI API cost in dollars',
    ['endpoint', 'model']
)

AI_QUALITY_SCORE = Gauge(
    'ai_quality_score',
    'Rolling average quality score',
    ['endpoint', 'metric']
)

AI_ERROR_RATE = Gauge(
    'ai_error_rate',
    'Rolling error rate',
    ['endpoint']
)

def track_ai_request(endpoint: str, model: str):
    """Decorator to track AI request metrics."""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            start_time = time.time()
            status = "success"

            try:
                result = await func(*args, **kwargs)

                # Track tokens if available
                if hasattr(result, 'usage'):
                    AI_TOKENS.labels(
                        endpoint=endpoint,
                        model=model,
                        token_type="prompt"
                    ).inc(result.usage.prompt_tokens)

                    AI_TOKENS.labels(
                        endpoint=endpoint,
                        model=model,
                        token_type="completion"
                    ).inc(result.usage.completion_tokens)

                    # Calculate and track cost
                    cost = calculate_cost(model, result.usage)
                    AI_COST.labels(endpoint=endpoint, model=model).inc(cost)

                return result

            except Exception as e:
                status = "error"
                raise

            finally:
                # Track request count and latency
                AI_REQUESTS.labels(
                    endpoint=endpoint,
                    model=model,
                    status=status
                ).inc()

                AI_LATENCY.labels(
                    endpoint=endpoint,
                    model=model
                ).observe(time.time() - start_time)

        return wrapper
    return decorator

def calculate_cost(model: str, usage) -> float:
    """Calculate cost based on model and token usage."""
    pricing = {
        "gpt-4": {"prompt": 0.03 / 1000, "completion": 0.06 / 1000},
        "gpt-4-turbo": {"prompt": 0.01 / 1000, "completion": 0.03 / 1000},
        "gpt-3.5-turbo": {"prompt": 0.0005 / 1000, "completion": 0.0015 / 1000}
    }

    if model not in pricing:
        return 0.0

    rates = pricing[model]
    return (
        usage.prompt_tokens * rates["prompt"] +
        usage.completion_tokens * rates["completion"]
    )
```

---

## 7. Regression Testing

Regression tests ensure that changes don't degrade quality over time. For AI applications, this is critical because model updates, prompt changes, or data drift can silently reduce quality.

### 7.1 Building a Regression Test Suite

```python
# tests/regression/test_golden_dataset.py
import pytest
import json
from pathlib import Path
from app.services.summarizer import SummarizerService
from app.evaluation.metrics import ROUGEEvaluator, SemanticEvaluator

class TestGoldenDataset:
    """
    Regression tests using a golden dataset.

    The golden dataset contains inputs with expected outputs that have been
    manually verified as correct. New model versions must produce outputs
    that are at least as good as the golden outputs.
    """

    @pytest.fixture
    def golden_dataset(self):
        """Load the golden dataset."""
        dataset_path = Path(__file__).parent / "data" / "golden_summaries.json"
        with open(dataset_path) as f:
            return json.load(f)

    @pytest.fixture
    def summarizer(self):
        return SummarizerService()

    @pytest.fixture
    def rouge_evaluator(self):
        return ROUGEEvaluator()

    @pytest.mark.asyncio
    async def test_summarization_quality_regression(
        self,
        golden_dataset,
        summarizer,
        rouge_evaluator
    ):
        """
        Test that current model produces summaries at least as good as golden.
        """
        results = []

        for item in golden_dataset:
            # Generate new summary
            new_summary = await summarizer.summarize(item["input"])

            # Compare to golden summary using ROUGE
            scores = rouge_evaluator.calculate_rouge(
                item["golden_summary"],
                new_summary
            )

            results.append({
                "id": item["id"],
                "rouge_l": scores["rougeL"]["fmeasure"],
                "golden_rouge_l": item.get("baseline_rouge_l", 0.5)
            })

        # Check that average quality hasn't regressed
        avg_rouge = sum(r["rouge_l"] for r in results) / len(results)
        baseline_rouge = sum(r["golden_rouge_l"] for r in results) / len(results)

        # Allow 5% degradation tolerance
        assert avg_rouge >= baseline_rouge * 0.95, \
            f"Quality regression detected: {avg_rouge:.3f} vs baseline {baseline_rouge:.3f}"

    @pytest.mark.asyncio
    async def test_no_catastrophic_failures(
        self,
        golden_dataset,
        summarizer
    ):
        """
        Test that no individual item has catastrophically bad output.
        """
        failures = []

        for item in golden_dataset:
            summary = await summarizer.summarize(item["input"])

            # Check for catastrophic failures
            if len(summary) < 10:
                failures.append(f"{item['id']}: Summary too short ({len(summary)} chars)")

            if len(summary) > len(item["input"]):
                failures.append(f"{item['id']}: Summary longer than input")

            if not summary.strip():
                failures.append(f"{item['id']}: Empty summary")

        assert not failures, f"Catastrophic failures: {failures}"
```

### 7.2 Creating and Maintaining Golden Datasets

```python
# scripts/create_golden_dataset.py
"""Script to create and update the golden dataset."""

import json
import asyncio
from pathlib import Path
from app.services.summarizer import SummarizerService
from app.evaluation.metrics import ROUGEEvaluator

async def create_golden_dataset():
    """Create a golden dataset from manually curated examples."""

    # Curated test cases with manually verified good summaries
    test_cases = [
        {
            "id": "news_001",
            "category": "news",
            "input": """
            The Federal Reserve announced today that it would raise interest rates
            by 0.25 percentage points, bringing the federal funds rate to a range
            of 5.25% to 5.5%. This marks the eleventh rate increase since March 2022,
            as the central bank continues its fight against inflation. Fed Chair
            Jerome Powell indicated that future rate decisions would depend on
            incoming economic data.
            """,
            "golden_summary": "The Federal Reserve raised interest rates by 0.25% to 5.25-5.5%, the eleventh increase since March 2022, with future decisions dependent on economic data."
        },
        {
            "id": "tech_001",
            "category": "technology",
            "input": """
            OpenAI released GPT-4 Turbo, an updated version of their flagship model
            that offers a 128K context window, improved instruction following, and
            significantly reduced pricing. The model also includes a knowledge cutoff
            of April 2023, making it more current than the original GPT-4. Developers
            can access the new model through the API immediately.
            """,
            "golden_summary": "OpenAI launched GPT-4 Turbo with 128K context window, better instruction following, lower prices, and updated knowledge through April 2023, available now via API."
        },
        # Add more curated examples...
    ]

    summarizer = SummarizerService()
    evaluator = ROUGEEvaluator()

    golden_data = []

    for case in test_cases:
        # Generate baseline score
        scores = evaluator.calculate_rouge(
            case["input"],
            case["golden_summary"]
        )

        golden_data.append({
            "id": case["id"],
            "category": case["category"],
            "input": case["input"].strip(),
            "golden_summary": case["golden_summary"],
            "baseline_rouge_l": scores["rougeL"]["fmeasure"]
        })

    # Save golden dataset
    output_path = Path("tests/regression/data/golden_summaries.json")
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, "w") as f:
        json.dump(golden_data, f, indent=2)

    print(f"Created golden dataset with {len(golden_data)} examples")

if __name__ == "__main__":
    asyncio.run(create_golden_dataset())
```

### 7.3 Automated Regression Detection

```python
# app/monitoring/regression_detector.py
from typing import List, Dict
from datetime import datetime, timedelta
import statistics

class RegressionDetector:
    """Detect quality regressions in production."""

    def __init__(self, metrics_store, config: Dict = None):
        self.metrics_store = metrics_store
        self.config = config or {
            "lookback_days": 7,
            "min_samples": 100,
            "regression_threshold": 0.1,  # 10% degradation
            "alert_on_std_deviation": 2.0
        }

    def check_for_regression(self, metric_name: str) -> Dict:
        """
        Check if a metric has regressed compared to historical baseline.

        Returns analysis with recommendation.
        """
        # Get recent metrics
        recent = self.metrics_store.get_metrics(
            metric_name,
            days=1
        )

        # Get baseline metrics
        baseline = self.metrics_store.get_metrics(
            metric_name,
            days=self.config["lookback_days"]
        )

        if len(recent) < self.config["min_samples"]:
            return {
                "status": "insufficient_data",
                "message": f"Only {len(recent)} samples, need {self.config['min_samples']}"
            }

        recent_mean = statistics.mean(recent)
        baseline_mean = statistics.mean(baseline)
        baseline_std = statistics.stdev(baseline) if len(baseline) > 1 else 0

        # Calculate regression
        if baseline_mean > 0:
            regression_pct = (baseline_mean - recent_mean) / baseline_mean
        else:
            regression_pct = 0

        # Check standard deviation
        if baseline_std > 0:
            z_score = (recent_mean - baseline_mean) / baseline_std
        else:
            z_score = 0

        # Determine status
        is_regressed = (
            regression_pct > self.config["regression_threshold"] or
            z_score < -self.config["alert_on_std_deviation"]
        )

        return {
            "status": "regression_detected" if is_regressed else "ok",
            "metric": metric_name,
            "recent_mean": recent_mean,
            "baseline_mean": baseline_mean,
            "regression_pct": regression_pct,
            "z_score": z_score,
            "recommendation": self._get_recommendation(is_regressed, regression_pct)
        }

    def _get_recommendation(self, is_regressed: bool, regression_pct: float) -> str:
        if not is_regressed:
            return "No action needed"

        if regression_pct > 0.25:
            return "CRITICAL: Immediate investigation required. Consider rollback."
        elif regression_pct > 0.15:
            return "HIGH: Investigate promptly. Check recent deployments."
        else:
            return "MEDIUM: Monitor closely. Review recent changes."

    def run_full_analysis(self) -> List[Dict]:
        """Run regression analysis on all tracked metrics."""
        metrics_to_check = [
            "rouge_l_score",
            "semantic_similarity",
            "response_latency_p95",
            "error_rate",
            "cost_per_request"
        ]

        results = []
        for metric in metrics_to_check:
            results.append(self.check_for_regression(metric))

        return results
```

---

## 8. Best Practices Summary

### Testing Strategy Pyramid for AI

```
                    /\
                   /  \
                  /    \        E2E Tests (few, expensive)
                 / E2E  \       - Full pipeline with real LLM
                /________\      - Golden dataset validation
               /          \
              /Integration \    Integration Tests (moderate)
             /______________\   - API endpoints with mocked LLM
            /                \  - Multi-component flows
           /    Unit Tests    \ - Database/cache integration
          /____________________\
                                Unit Tests (many, fast)
                                - Mocked LLM calls
                                - Input validation
                                - Error handling
                                - Business logic
```

### Key Takeaways

1. **Mock LLM calls in unit tests** - Save money, run fast, be deterministic
2. **Use semantic similarity over exact matching** - AI outputs vary
3. **Implement quality gates** - Block bad deployments automatically
4. **Create golden datasets** - Track quality over time
5. **A/B test changes** - Validate improvements statistically
6. **Monitor in production** - Catch regressions early
7. **Budget for evaluation costs** - Testing AI costs money

### Common Mistakes to Avoid

1. **Testing exact output matches** - AI responses vary; test semantics instead
2. **Skipping mocks in unit tests** - Makes tests slow, expensive, and flaky
3. **No golden dataset** - Can't detect regressions without baselines
4. **Ignoring cost in tests** - Evaluation API calls add up quickly
5. **Manual quality checks only** - Automate with metrics and gates
6. **Deploying without A/B testing** - You won't know if changes help or hurt

---

## Summary

In this module, you learned how to:

- **Design AI-specific testing strategies** that account for non-determinism
- **Write effective unit tests** with proper mocking of LLM calls
- **Build integration test suites** that verify complete pipelines
- **Implement evaluation metrics** (BLEU, ROUGE, semantic similarity)
- **Set up A/B testing** to compare models and configurations
- **Create quality gates** that prevent bad deployments
- **Build regression testing** systems with golden datasets

### What's Next

In the **Final Project**, you'll apply everything from Modules 1-6 to build a complete, production-ready AI application with comprehensive testing.

---

## Additional Resources

- [pytest Documentation](https://docs.pytest.org/)
- [NLTK BLEU Score](https://www.nltk.org/api/nltk.translate.bleu_score.html)
- [Google ROUGE Score](https://github.com/google-research/google-research/tree/master/rouge)
- [OpenAI Evals Framework](https://github.com/openai/evals)
- [LangChain Testing Guide](https://python.langchain.com/docs/guides/testing)
- [Prometheus Python Client](https://github.com/prometheus/client_python)
- [Statistical Significance in A/B Testing](https://www.statsig.com/blog/ab-testing-statistics)
