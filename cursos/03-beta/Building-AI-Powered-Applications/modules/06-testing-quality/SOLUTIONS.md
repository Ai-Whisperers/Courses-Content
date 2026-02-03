# Module 6: Testing & Quality Assurance - Solutions

This document provides complete solutions for all exercises in Module 6.

---

## Part 1: Unit Tests with Mocking - Solutions

### 1.2 Test Fixtures (conftest.py)

```python
# tests/conftest.py
import pytest
from unittest.mock import MagicMock, AsyncMock

from app.services.summarizer import SummarizerService


@pytest.fixture
def mock_openai_response():
    """
    Create a mock OpenAI API response.

    This fixture creates a properly structured mock that mimics
    the real OpenAI API response format.
    """
    mock_response = MagicMock()

    # Mock the choices array with message content
    mock_message = MagicMock()
    mock_message.content = "This is a test summary."

    mock_choice = MagicMock()
    mock_choice.message = mock_message

    mock_response.choices = [mock_choice]

    # Mock the usage statistics
    mock_usage = MagicMock()
    mock_usage.prompt_tokens = 100
    mock_usage.completion_tokens = 20
    mock_usage.total_tokens = 120

    mock_response.usage = mock_usage

    return mock_response


@pytest.fixture
def mock_openai_response_factory():
    """
    Factory fixture for creating custom mock responses.

    Use this when you need different response content for different tests.
    """
    def create_response(content: str, prompt_tokens: int = 100, completion_tokens: int = 20):
        mock_response = MagicMock()
        mock_response.choices = [
            MagicMock(message=MagicMock(content=content))
        ]
        mock_response.usage = MagicMock(
            prompt_tokens=prompt_tokens,
            completion_tokens=completion_tokens,
            total_tokens=prompt_tokens + completion_tokens
        )
        return mock_response

    return create_response


@pytest.fixture
def summarizer():
    """Create a SummarizerService instance for testing."""
    return SummarizerService()


@pytest.fixture
def summarizer_gpt4():
    """Create a SummarizerService with GPT-4 configuration."""
    return SummarizerService(model="gpt-4", temperature=0.5)


@pytest.fixture
def sample_texts():
    """Sample texts for testing various scenarios."""
    return {
        "short": "The quick brown fox jumps over the lazy dog.",
        "medium": """
        Artificial intelligence has transformed how we interact with technology.
        Machine learning algorithms can now recognize images, understand speech,
        and generate human-like text. These advances have led to applications
        in healthcare, finance, transportation, and entertainment.
        """.strip(),
        "long": "A" * 5000,
        "with_special_chars": "Test with special chars: !@#$%^&*() and émojis 🎉",
        "unicode": "Unicode text: 中文 日本語 한국어 العربية",
        "multiline": """
        Line 1: Introduction
        Line 2: Main content
        Line 3: Conclusion
        """.strip()
    }
```

### 1.3 Input Validation Tests (test_summarizer.py)

```python
# tests/unit/test_summarizer.py
import pytest
from unittest.mock import AsyncMock, patch, MagicMock

from app.services.summarizer import SummarizerService


class TestInputValidation:
    """Test input validation logic."""

    def test_empty_string_raises_error(self, summarizer):
        """Test that empty string input raises ValueError."""
        with pytest.raises(ValueError, match="Input text cannot be empty"):
            summarizer.validate_input("")

    def test_whitespace_only_raises_error(self, summarizer):
        """Test that whitespace-only input raises ValueError."""
        with pytest.raises(ValueError, match="Input text cannot be empty"):
            summarizer.validate_input("   \n\t  ")

    def test_none_input_raises_error(self, summarizer):
        """Test that None input raises ValueError."""
        with pytest.raises(ValueError, match="Input text cannot be None"):
            summarizer.validate_input(None)

    def test_non_string_input_raises_error(self, summarizer):
        """Test that non-string input raises ValueError."""
        with pytest.raises(ValueError, match="Input text must be a string"):
            summarizer.validate_input(12345)

        with pytest.raises(ValueError, match="Input text must be a string"):
            summarizer.validate_input(["list", "of", "strings"])

        with pytest.raises(ValueError, match="Input text must be a string"):
            summarizer.validate_input({"key": "value"})

    def test_oversized_input_raises_error(self, summarizer):
        """Test that input exceeding max length raises ValueError."""
        oversized_text = "A" * 100001  # Exceeds 100000 character limit

        with pytest.raises(ValueError, match="Input text exceeds maximum length"):
            summarizer.validate_input(oversized_text)

    def test_exactly_max_length_passes(self, summarizer):
        """Test that input at exactly max length passes validation."""
        max_length_text = "A" * 100000
        # Should not raise
        summarizer.validate_input(max_length_text)

    @pytest.mark.parametrize("valid_input", [
        "Short text",
        "Text with special chars: !@#$%^&*()",
        "Unicode: 中文 日本語 한국어",
        " Text with leading/trailing spaces ",
        "a",  # Single character
        "Line1\nLine2\nLine3",  # Multiline
    ])
    def test_valid_inputs_pass_validation(self, summarizer, valid_input):
        """Test that valid inputs pass validation."""
        # Should not raise any exception
        summarizer.validate_input(valid_input)


class TestSummarize:
    """Test summarization with mocked LLM calls."""

    @pytest.mark.asyncio
    async def test_summarize_returns_string(self, summarizer, mock_openai_response):
        """Test that summarize returns a string."""
        with patch.object(
            summarizer.client.chat.completions,
            'create',
            new_callable=AsyncMock,
            return_value=mock_openai_response
        ):
            result = await summarizer.summarize("This is a long text to summarize.")

            assert isinstance(result, str)
            assert len(result) > 0
            assert result == "This is a test summary."

    @pytest.mark.asyncio
    async def test_summarize_uses_correct_model(self, summarizer, mock_openai_response):
        """Test that summarize uses the configured model."""
        with patch.object(
            summarizer.client.chat.completions,
            'create',
            new_callable=AsyncMock,
            return_value=mock_openai_response
        ) as mock_create:
            await summarizer.summarize("Text to summarize")

            # Verify the call was made with correct model
            mock_create.assert_called_once()
            call_kwargs = mock_create.call_args.kwargs
            assert call_kwargs['model'] == 'gpt-3.5-turbo'

    @pytest.mark.asyncio
    async def test_summarize_uses_configured_model(self, summarizer_gpt4, mock_openai_response):
        """Test that summarize uses the model from configuration."""
        with patch.object(
            summarizer_gpt4.client.chat.completions,
            'create',
            new_callable=AsyncMock,
            return_value=mock_openai_response
        ) as mock_create:
            await summarizer_gpt4.summarize("Text to summarize")

            call_kwargs = mock_create.call_args.kwargs
            assert call_kwargs['model'] == 'gpt-4'

    @pytest.mark.asyncio
    async def test_summarize_includes_max_length_in_prompt(
        self, summarizer, mock_openai_response
    ):
        """Test that max_length parameter is included in the prompt."""
        with patch.object(
            summarizer.client.chat.completions,
            'create',
            new_callable=AsyncMock,
            return_value=mock_openai_response
        ) as mock_create:
            await summarizer.summarize("Text to summarize", max_length=50)

            # Extract the messages from the call
            call_kwargs = mock_create.call_args.kwargs
            messages = call_kwargs['messages']
            prompt_content = messages[0]['content']

            # Verify max_length constraint is in the prompt
            assert "50" in prompt_content

    @pytest.mark.asyncio
    async def test_summarize_without_max_length(self, summarizer, mock_openai_response):
        """Test summarize works without max_length parameter."""
        with patch.object(
            summarizer.client.chat.completions,
            'create',
            new_callable=AsyncMock,
            return_value=mock_openai_response
        ) as mock_create:
            result = await summarizer.summarize("Text to summarize")

            assert result == "This is a test summary."

            # Verify the prompt doesn't mention a specific word count
            call_kwargs = mock_create.call_args.kwargs
            messages = call_kwargs['messages']
            prompt_content = messages[0]['content']
            assert "words or less" not in prompt_content

    @pytest.mark.asyncio
    async def test_api_error_returns_fallback(self, summarizer):
        """Test that API errors return the fallback message."""
        with patch.object(
            summarizer.client.chat.completions,
            'create',
            new_callable=AsyncMock,
            side_effect=Exception("API Error")
        ):
            result = await summarizer.summarize("Text to summarize")

            assert result == summarizer.FALLBACK_MESSAGE
            assert "unavailable" in result.lower()

    @pytest.mark.asyncio
    async def test_validation_happens_before_api_call(self, summarizer):
        """Test that validation prevents API calls for invalid input."""
        with patch.object(
            summarizer.client.chat.completions,
            'create',
            new_callable=AsyncMock
        ) as mock_create:
            with pytest.raises(ValueError):
                await summarizer.summarize("")

            # API should never have been called
            mock_create.assert_not_called()


class TestErrorHandling:
    """Test error handling scenarios."""

    @pytest.mark.asyncio
    async def test_rate_limit_error_handling(self, summarizer):
        """Test handling of rate limit errors."""
        from openai import RateLimitError

        mock_response = MagicMock()
        mock_response.choices = [MagicMock(message=MagicMock(content="Success after retry"))]

        with patch.object(
            summarizer.client.chat.completions,
            'create',
            new_callable=AsyncMock,
            side_effect=[
                RateLimitError("Rate limit", response=MagicMock(), body={}),
                mock_response
            ]
        ):
            # Depending on implementation, might retry or return fallback
            result = await summarizer.summarize("Test text")
            # Assert based on your implementation's behavior
            assert isinstance(result, str)

    @pytest.mark.asyncio
    async def test_timeout_returns_fallback(self, summarizer):
        """Test that timeout errors return fallback."""
        import asyncio

        with patch.object(
            summarizer.client.chat.completions,
            'create',
            new_callable=AsyncMock,
            side_effect=asyncio.TimeoutError()
        ):
            result = await summarizer.summarize("Test text")

            assert result == summarizer.FALLBACK_MESSAGE
```

---

## Part 2: Integration Tests - Solutions

### 2.2 Integration Tests (test_api.py)

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
        response = await client.get("/health")

        assert response.status_code == 200

    @pytest.mark.asyncio
    async def test_health_returns_healthy_status(self, client):
        """Test that health endpoint returns healthy status."""
        response = await client.get("/health")

        data = response.json()
        assert data["status"] == "healthy"


class TestSummarizeEndpoint:
    """Test the summarization endpoint."""

    @pytest.mark.asyncio
    async def test_summarize_success(self, client, mock_openai_response):
        """Test successful summarization."""
        with patch(
            'app.services.summarizer.AsyncOpenAI'
        ) as mock_client_class:
            # Set up the mock
            mock_instance = MagicMock()
            mock_instance.chat.completions.create = AsyncMock(
                return_value=mock_openai_response
            )
            mock_client_class.return_value = mock_instance

            response = await client.post(
                "/api/v1/summarize",
                json={"text": "This is a long article that needs to be summarized."}
            )

            assert response.status_code == 200
            data = response.json()
            assert "summary" in data
            assert isinstance(data["summary"], str)
            assert len(data["summary"]) > 0

    @pytest.mark.asyncio
    async def test_summarize_empty_text_returns_400(self, client):
        """Test that empty text returns 400."""
        response = await client.post(
            "/api/v1/summarize",
            json={"text": ""}
        )

        assert response.status_code == 400
        data = response.json()
        assert "empty" in data["detail"].lower()

    @pytest.mark.asyncio
    async def test_summarize_with_max_length(self, client, mock_openai_response):
        """Test summarization with max_length parameter."""
        with patch(
            'app.services.summarizer.AsyncOpenAI'
        ) as mock_client_class:
            mock_instance = MagicMock()
            mock_instance.chat.completions.create = AsyncMock(
                return_value=mock_openai_response
            )
            mock_client_class.return_value = mock_instance

            response = await client.post(
                "/api/v1/summarize",
                json={"text": "Long text here...", "max_length": 50}
            )

            assert response.status_code == 200
            data = response.json()
            assert "summary" in data

    @pytest.mark.asyncio
    async def test_summarize_response_includes_lengths(self, client, mock_openai_response):
        """Test that response includes input and output lengths."""
        input_text = "This is the input text for testing length calculation."

        with patch(
            'app.services.summarizer.AsyncOpenAI'
        ) as mock_client_class:
            mock_instance = MagicMock()
            mock_instance.chat.completions.create = AsyncMock(
                return_value=mock_openai_response
            )
            mock_client_class.return_value = mock_instance

            response = await client.post(
                "/api/v1/summarize",
                json={"text": input_text}
            )

            assert response.status_code == 200
            data = response.json()

            assert "input_length" in data
            assert data["input_length"] == len(input_text)

            assert "output_length" in data
            assert data["output_length"] == len(data["summary"])

    @pytest.mark.asyncio
    async def test_summarize_preserves_unicode(self, client, mock_openai_response_factory):
        """Test that unicode text is handled correctly."""
        unicode_response = mock_openai_response_factory("摘要：这是中文摘要")

        with patch(
            'app.services.summarizer.AsyncOpenAI'
        ) as mock_client_class:
            mock_instance = MagicMock()
            mock_instance.chat.completions.create = AsyncMock(
                return_value=unicode_response
            )
            mock_client_class.return_value = mock_instance

            response = await client.post(
                "/api/v1/summarize",
                json={"text": "这是一段中文文本，需要进行摘要处理。"}
            )

            assert response.status_code == 200
            data = response.json()
            assert "摘要" in data["summary"]


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
        response = await client.post(
            "/api/v1/summarize",
            json={"max_length": 100}  # Missing 'text' field
        )

        assert response.status_code == 422
        data = response.json()
        assert "text" in str(data).lower()

    @pytest.mark.asyncio
    async def test_wrong_type_for_max_length_returns_422(self, client):
        """Test that wrong type for max_length returns 422."""
        response = await client.post(
            "/api/v1/summarize",
            json={"text": "Some text", "max_length": "not a number"}
        )

        assert response.status_code == 422

    @pytest.mark.asyncio
    async def test_api_error_returns_500_or_fallback(self, client):
        """Test behavior when API call fails."""
        with patch(
            'app.services.summarizer.AsyncOpenAI'
        ) as mock_client_class:
            mock_instance = MagicMock()
            mock_instance.chat.completions.create = AsyncMock(
                side_effect=Exception("API unavailable")
            )
            mock_client_class.return_value = mock_instance

            response = await client.post(
                "/api/v1/summarize",
                json={"text": "Some text to summarize"}
            )

            # Depending on implementation: 500 error or fallback response
            assert response.status_code in [200, 500, 503]

            if response.status_code == 200:
                data = response.json()
                assert "unavailable" in data["summary"].lower()


class TestConcurrentRequests:
    """Test handling of concurrent requests."""

    @pytest.mark.asyncio
    async def test_multiple_concurrent_requests(self, client, mock_openai_response):
        """Test that multiple concurrent requests are handled correctly."""
        import asyncio

        with patch(
            'app.services.summarizer.AsyncOpenAI'
        ) as mock_client_class:
            mock_instance = MagicMock()
            mock_instance.chat.completions.create = AsyncMock(
                return_value=mock_openai_response
            )
            mock_client_class.return_value = mock_instance

            # Send 5 concurrent requests
            tasks = [
                client.post(
                    "/api/v1/summarize",
                    json={"text": f"Text number {i} to summarize."}
                )
                for i in range(5)
            ]

            responses = await asyncio.gather(*tasks)

            # All should succeed
            for response in responses:
                assert response.status_code == 200
```

---

## Part 3: Evaluation Metrics - Solutions

### 3.1 ROUGE Evaluator Implementation

```python
# app/evaluation/metrics.py
from typing import List, Dict
from rouge_score import rouge_scorer
import numpy as np


class ROUGEEvaluator:
    """Evaluate text using ROUGE scores."""

    def __init__(self, metrics: List[str] = None):
        """
        Initialize the ROUGE evaluator.

        Args:
            metrics: List of ROUGE metrics to compute.
                    Defaults to ['rouge1', 'rouge2', 'rougeL']
        """
        self.metrics = metrics or ['rouge1', 'rouge2', 'rougeL']
        self.scorer = rouge_scorer.RougeScorer(self.metrics, use_stemmer=True)

    def calculate_rouge(self, reference: str, candidate: str) -> Dict:
        """
        Calculate ROUGE scores between reference and candidate text.

        Args:
            reference: The ground truth text
            candidate: The generated text to evaluate

        Returns:
            Dictionary with scores for each metric, containing:
            - precision: How much of the candidate is in the reference
            - recall: How much of the reference is in the candidate
            - fmeasure: Harmonic mean of precision and recall
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

    def evaluate_summary(
        self,
        original: str,
        summary: str,
        min_rouge_l: float = 0.2
    ) -> Dict:
        """
        Evaluate a summary against the original text.

        For summarization, ROUGE-L (longest common subsequence) is most useful
        as it captures the main ideas while allowing for rephrasing.

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
        scores = self.calculate_rouge(original, summary)
        rouge_l_f1 = scores["rougeL"]["fmeasure"]

        return {
            "scores": scores,
            "rouge_l_f1": rouge_l_f1,
            "passes_threshold": rouge_l_f1 >= min_rouge_l
        }

    def evaluate_batch(
        self,
        references: List[str],
        candidates: List[str]
    ) -> Dict:
        """
        Evaluate a batch of generated texts against references.

        Args:
            references: List of ground truth texts
            candidates: List of generated texts

        Returns:
            Dictionary with aggregate statistics
        """
        if len(references) != len(candidates):
            raise ValueError("References and candidates must have same length")

        all_scores = []
        for ref, cand in zip(references, candidates):
            scores = self.calculate_rouge(ref, cand)
            all_scores.append(scores)

        # Aggregate scores per metric
        aggregated = {}
        for metric in self.metrics:
            f_scores = [s[metric]["fmeasure"] for s in all_scores]
            aggregated[metric] = {
                "mean": np.mean(f_scores),
                "std": np.std(f_scores),
                "min": np.min(f_scores),
                "max": np.max(f_scores)
            }

        return {
            "individual_scores": all_scores,
            "aggregate": aggregated,
            "count": len(references)
        }


class BLEUEvaluator:
    """Evaluate text using BLEU score."""

    def __init__(self):
        """Initialize the BLEU evaluator."""
        import nltk
        nltk.download('punkt', quiet=True)
        nltk.download('punkt_tab', quiet=True)
        from nltk.translate.bleu_score import SmoothingFunction
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
        import nltk
        from nltk.translate.bleu_score import sentence_bleu

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
    ) -> Dict:
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


class SemanticEvaluator:
    """Evaluate semantic similarity using embeddings."""

    def __init__(self):
        """Initialize the evaluator."""
        # For production, use OpenAI embeddings
        # For testing, we provide a simple word overlap metric
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
        vec1 = np.array(vec1)
        vec2 = np.array(vec2)

        dot_product = np.dot(vec1, vec2)
        norm1 = np.linalg.norm(vec1)
        norm2 = np.linalg.norm(vec2)

        if norm1 == 0 or norm2 == 0:
            return 0.0

        return dot_product / (norm1 * norm2)

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
        # Tokenize and lowercase
        words1 = set(text1.lower().split())
        words2 = set(text2.lower().split())

        # Calculate Jaccard similarity: intersection / union
        intersection = words1 & words2
        union = words1 | words2

        if len(union) == 0:
            return 0.0

        return len(intersection) / len(union)

    def evaluate_against_references(
        self,
        generated: str,
        references: List[str],
        threshold: float = 0.5
    ) -> Dict:
        """
        Check if generated text is similar to any reference.

        Uses simple word similarity for testing purposes.
        In production, use embedding-based similarity.

        Args:
            generated: The generated text
            references: List of acceptable reference texts
            threshold: Minimum similarity score to pass

        Returns:
            Dictionary with similarity scores and pass/fail status
        """
        similarities = [
            self.simple_word_similarity(generated, ref)
            for ref in references
        ]

        max_similarity = max(similarities) if similarities else 0.0

        return {
            "max_similarity": max_similarity,
            "all_similarities": similarities,
            "passes_threshold": max_similarity >= threshold,
            "best_match_index": similarities.index(max_similarity) if similarities else -1
        }
```

### 3.3 Evaluation Tests (test_quality.py)

```python
# tests/evaluation/test_quality.py
import pytest
from app.evaluation.metrics import ROUGEEvaluator, SemanticEvaluator, BLEUEvaluator


class TestROUGEEvaluator:
    """Test ROUGE evaluation metrics."""

    @pytest.fixture
    def evaluator(self):
        return ROUGEEvaluator()

    def test_identical_texts_have_perfect_score(self, evaluator):
        """Test that identical texts get ROUGE-L score of 1.0."""
        text = "The quick brown fox jumps over the lazy dog."
        scores = evaluator.calculate_rouge(text, text)

        assert abs(scores["rougeL"]["fmeasure"] - 1.0) < 0.001

    def test_completely_different_texts_have_low_score(self, evaluator):
        """Test that unrelated texts get low ROUGE scores."""
        text1 = "The cat sat on the mat."
        text2 = "Quantum physics explores subatomic particles."

        scores = evaluator.calculate_rouge(text1, text2)

        assert scores["rougeL"]["fmeasure"] < 0.2

    def test_partial_overlap_has_medium_score(self, evaluator):
        """Test that partially overlapping texts have medium scores."""
        text1 = "The quick brown fox jumps over the lazy dog."
        text2 = "The quick brown cat jumps over the sleepy dog."

        scores = evaluator.calculate_rouge(text1, text2)

        # Should have significant overlap
        assert 0.5 < scores["rougeL"]["fmeasure"] < 1.0

    def test_summary_evaluation_passes_good_summary(self, evaluator):
        """Test that a good summary passes the threshold."""
        original = """
        Climate change is causing global temperatures to rise at an unprecedented rate.
        Scientists warn that immediate action is needed to prevent catastrophic consequences.
        The main contributors are fossil fuel emissions and deforestation.
        """
        summary = "Climate change from fossil fuels and deforestation requires urgent action."

        result = evaluator.evaluate_summary(original, summary, min_rouge_l=0.2)

        assert result["passes_threshold"] is True

    def test_summary_evaluation_fails_bad_summary(self, evaluator):
        """Test that a bad summary fails the threshold."""
        original = "Climate change is a serious global issue requiring immediate action."
        summary = "I like pizza and video games on weekends."

        result = evaluator.evaluate_summary(original, summary, min_rouge_l=0.2)

        assert result["passes_threshold"] is False

    def test_batch_evaluation(self, evaluator):
        """Test batch evaluation returns correct statistics."""
        references = [
            "The cat sat on the mat.",
            "Dogs are loyal companions.",
            "Birds can fly high."
        ]
        candidates = [
            "The cat sat on the mat.",  # Perfect match
            "Dogs are faithful friends.",  # Paraphrase
            "Fish swim in water."  # Unrelated
        ]

        result = evaluator.evaluate_batch(references, candidates)

        assert result["count"] == 3
        assert "aggregate" in result
        assert "rougeL" in result["aggregate"]
        assert result["aggregate"]["rougeL"]["mean"] > 0


class TestBLEUEvaluator:
    """Test BLEU evaluation metrics."""

    @pytest.fixture
    def evaluator(self):
        return BLEUEvaluator()

    def test_identical_texts_have_high_score(self, evaluator):
        """Test that identical texts get high BLEU score."""
        text = "The quick brown fox jumps over the lazy dog."
        score = evaluator.calculate_bleu(text, text)

        assert score > 0.9

    def test_different_texts_have_low_score(self, evaluator):
        """Test that different texts get low BLEU score."""
        text1 = "Hello world"
        text2 = "Goodbye universe"

        score = evaluator.calculate_bleu(text1, text2)

        assert score < 0.2


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

    def test_cosine_similarity_opposite_vectors(self, evaluator):
        """Test cosine similarity with opposite vectors."""
        vec1 = [1.0, 2.0, 3.0]
        vec2 = [-1.0, -2.0, -3.0]

        similarity = evaluator.cosine_similarity(vec1, vec2)

        assert abs(similarity + 1.0) < 0.001

    def test_cosine_similarity_zero_vector(self, evaluator):
        """Test cosine similarity with zero vector."""
        vec1 = [1.0, 2.0, 3.0]
        vec2 = [0.0, 0.0, 0.0]

        similarity = evaluator.cosine_similarity(vec1, vec2)

        assert similarity == 0.0

    def test_word_similarity_identical_texts(self, evaluator):
        """Test word similarity with identical texts."""
        text = "The quick brown fox"
        similarity = evaluator.simple_word_similarity(text, text)

        assert similarity == 1.0

    def test_word_similarity_no_overlap(self, evaluator):
        """Test word similarity with no overlap."""
        text1 = "cat dog bird"
        text2 = "car plane train"

        similarity = evaluator.simple_word_similarity(text1, text2)

        assert similarity == 0.0

    def test_word_similarity_partial_overlap(self, evaluator):
        """Test word similarity with partial overlap."""
        text1 = "the quick brown fox"
        text2 = "the slow brown dog"

        similarity = evaluator.simple_word_similarity(text1, text2)

        # Common: "the", "brown" (2 words)
        # Union: "the", "quick", "brown", "fox", "slow", "dog" (6 words)
        # Jaccard = 2/6 = 0.333...
        assert abs(similarity - (2/6)) < 0.01

    def test_evaluate_against_references(self, evaluator):
        """Test evaluation against multiple references."""
        generated = "Paris is the capital of France"
        references = [
            "Paris",
            "The capital of France is Paris",
            "France's capital is Paris"
        ]

        result = evaluator.evaluate_against_references(
            generated,
            references,
            threshold=0.3
        )

        assert result["passes_threshold"] is True
        assert result["max_similarity"] > 0.3
        assert len(result["all_similarities"]) == 3
```

---

## Part 4: A/B Testing Framework - Solutions

### 4.1 A/B Testing Framework Implementation

```python
# app/ab_testing/framework.py
import hashlib
from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, List, Any, Optional
from collections import defaultdict
import statistics


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
    timestamp: datetime = field(default_factory=datetime.now)


@dataclass
class Outcome:
    """Outcome metrics for an experiment assignment."""
    experiment_name: str
    user_id: str
    variant_name: str
    metrics: Dict[str, float]
    timestamp: datetime = field(default_factory=datetime.now)


class ABTestingFramework:
    """Framework for A/B testing AI configurations."""

    def __init__(self):
        """Initialize the framework."""
        self.experiments: Dict[str, Dict] = {}
        self.assignments: Dict[str, Assignment] = {}  # Key: "experiment:user_id"
        self.outcomes: List[Outcome] = []

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
        # Check for duplicate experiment name
        if name in self.experiments:
            raise ValueError(f"Experiment '{name}' already exists")

        # Validate weights sum to 1.0
        total_weight = sum(v.weight for v in variants)
        if abs(total_weight - 1.0) > 0.001:
            raise ValueError(
                f"Variant weights must sum to 1.0, got {total_weight}"
            )

        # Validate all weights are positive
        for v in variants:
            if v.weight < 0:
                raise ValueError(f"Variant weight cannot be negative: {v.name}")

        # Store the experiment
        self.experiments[name] = {
            "variants": variants,
            "description": description,
            "created_at": datetime.now(),
            "is_active": True
        }

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
        # Validate experiment exists
        if experiment_name not in self.experiments:
            raise ValueError(f"Experiment '{experiment_name}' not found")

        experiment = self.experiments[experiment_name]

        # Check if user already has an assignment (for consistency)
        assignment_key = f"{experiment_name}:{user_id}"
        if assignment_key in self.assignments:
            return self.assignments[assignment_key]

        # Use consistent hashing to determine bucket
        hash_input = f"{experiment_name}:{user_id}"
        hash_value = int(hashlib.md5(hash_input.encode()).hexdigest(), 16)
        bucket = (hash_value % 10000) / 10000  # 0.0 to 1.0 with fine granularity

        # Find which variant this bucket falls into
        cumulative = 0.0
        selected_variant = experiment["variants"][-1]  # Default to last

        for variant in experiment["variants"]:
            cumulative += variant.weight
            if bucket < cumulative:
                selected_variant = variant
                break

        # Create and store assignment
        assignment = Assignment(
            experiment_name=experiment_name,
            variant_name=selected_variant.name,
            config=selected_variant.config,
            user_id=user_id,
            timestamp=datetime.now()
        )

        self.assignments[assignment_key] = assignment

        return assignment

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
        # Get the user's assignment to know their variant
        assignment_key = f"{experiment_name}:{user_id}"

        if assignment_key not in self.assignments:
            # User hasn't been assigned yet, assign them first
            self.get_variant(experiment_name, user_id)

        assignment = self.assignments[assignment_key]

        outcome = Outcome(
            experiment_name=experiment_name,
            user_id=user_id,
            variant_name=assignment.variant_name,
            metrics=metrics,
            timestamp=datetime.now()
        )

        self.outcomes.append(outcome)

    def get_results(self, experiment_name: str) -> Dict:
        """
        Get aggregated results for an experiment.

        Returns:
            Dictionary with per-variant statistics
        """
        if experiment_name not in self.experiments:
            raise ValueError(f"Experiment '{experiment_name}' not found")

        # Filter outcomes for this experiment
        experiment_outcomes = [
            o for o in self.outcomes
            if o.experiment_name == experiment_name
        ]

        if not experiment_outcomes:
            return {"error": "No outcomes recorded yet"}

        # Group outcomes by variant
        by_variant: Dict[str, List[Outcome]] = defaultdict(list)
        for outcome in experiment_outcomes:
            by_variant[outcome.variant_name].append(outcome)

        # Calculate statistics per variant
        results = {}

        # Get all metric names from any outcome
        all_metrics = set()
        for outcome in experiment_outcomes:
            all_metrics.update(outcome.metrics.keys())

        for variant_name, outcomes in by_variant.items():
            variant_results = {"count": len(outcomes), "metrics": {}}

            for metric in all_metrics:
                values = [
                    o.metrics[metric]
                    for o in outcomes
                    if metric in o.metrics
                ]

                if values:
                    variant_results["metrics"][metric] = {
                        "mean": statistics.mean(values),
                        "std": statistics.stdev(values) if len(values) > 1 else 0,
                        "min": min(values),
                        "max": max(values)
                    }

            results[variant_name] = variant_results

        return results

    def deactivate_experiment(self, experiment_name: str) -> None:
        """Deactivate an experiment."""
        if experiment_name not in self.experiments:
            raise ValueError(f"Experiment '{experiment_name}' not found")

        self.experiments[experiment_name]["is_active"] = False

    def get_experiment_info(self, experiment_name: str) -> Dict:
        """Get information about an experiment."""
        if experiment_name not in self.experiments:
            raise ValueError(f"Experiment '{experiment_name}' not found")

        exp = self.experiments[experiment_name]

        return {
            "name": experiment_name,
            "description": exp["description"],
            "is_active": exp["is_active"],
            "created_at": exp["created_at"],
            "variants": [
                {"name": v.name, "weight": v.weight, "config": v.config}
                for v in exp["variants"]
            ],
            "total_assignments": sum(
                1 for key in self.assignments
                if key.startswith(f"{experiment_name}:")
            )
        }
```

### 4.2 A/B Testing Tests (test_ab_testing.py)

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
                config={"model": "gpt-3.5-turbo", "temperature": 0.7}
            ),
            Variant(
                name="treatment",
                weight=0.5,
                config={"model": "gpt-4", "temperature": 0.5}
            )
        ]

    @pytest.fixture
    def three_way_variants(self):
        return [
            Variant(name="A", weight=0.33, config={"version": "A"}),
            Variant(name="B", weight=0.34, config={"version": "B"}),
            Variant(name="C", weight=0.33, config={"version": "C"})
        ]

    # === Experiment Creation Tests ===

    def test_create_experiment_success(self, framework, sample_variants):
        """Test successful experiment creation."""
        framework.create_experiment(
            name="test_experiment",
            variants=sample_variants,
            description="Test experiment"
        )

        assert "test_experiment" in framework.experiments
        assert framework.experiments["test_experiment"]["is_active"] is True

    def test_create_experiment_invalid_weights_low(self, framework):
        """Test that weights below 1.0 raise ValueError."""
        invalid_variants = [
            Variant(name="a", weight=0.3, config={}),
            Variant(name="b", weight=0.3, config={})  # Sum = 0.6
        ]

        with pytest.raises(ValueError, match="must sum to 1.0"):
            framework.create_experiment("test", invalid_variants)

    def test_create_experiment_invalid_weights_high(self, framework):
        """Test that weights above 1.0 raise ValueError."""
        invalid_variants = [
            Variant(name="a", weight=0.7, config={}),
            Variant(name="b", weight=0.7, config={})  # Sum = 1.4
        ]

        with pytest.raises(ValueError, match="must sum to 1.0"):
            framework.create_experiment("test", invalid_variants)

    def test_create_experiment_duplicate_name(self, framework, sample_variants):
        """Test that duplicate experiment names raise ValueError."""
        framework.create_experiment("test", sample_variants)

        with pytest.raises(ValueError, match="already exists"):
            framework.create_experiment("test", sample_variants)

    def test_create_experiment_negative_weight(self, framework):
        """Test that negative weights raise ValueError."""
        invalid_variants = [
            Variant(name="a", weight=-0.5, config={}),
            Variant(name="b", weight=1.5, config={})
        ]

        with pytest.raises(ValueError, match="cannot be negative"):
            framework.create_experiment("test", invalid_variants)

    # === Variant Assignment Tests ===

    def test_get_variant_returns_assignment(self, framework, sample_variants):
        """Test that get_variant returns an assignment."""
        framework.create_experiment("test", sample_variants)

        assignment = framework.get_variant("test", "user123")

        assert assignment.experiment_name == "test"
        assert assignment.user_id == "user123"
        assert assignment.variant_name in ["control", "treatment"]
        assert assignment.config is not None

    def test_get_variant_consistent(self, framework, sample_variants):
        """Test that same user always gets same variant."""
        framework.create_experiment("test", sample_variants)

        # Get variant multiple times for same user
        assignments = [
            framework.get_variant("test", "user123")
            for _ in range(10)
        ]

        # All should have the same variant
        variant_names = [a.variant_name for a in assignments]
        assert len(set(variant_names)) == 1

    def test_get_variant_different_users_can_differ(self, framework, sample_variants):
        """Test that different users can get different variants."""
        framework.create_experiment("test", sample_variants)

        # Get variants for many different users
        variants = set()
        for i in range(100):
            assignment = framework.get_variant("test", f"user{i}")
            variants.add(assignment.variant_name)

        # With 50/50 split and 100 users, should have both variants
        assert len(variants) == 2

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
        # Allow 10% tolerance (400-600 each)
        assert 400 <= control_count <= 600
        assert 400 <= treatment_count <= 600

    def test_get_variant_three_way_distribution(self, framework, three_way_variants):
        """Test distribution with three variants."""
        framework.create_experiment("test", three_way_variants)

        variants = [
            framework.get_variant("test", f"user{i}").variant_name
            for i in range(1000)
        ]

        a_count = variants.count("A")
        b_count = variants.count("B")
        c_count = variants.count("C")

        # Each should be roughly 33% (250-420 range with tolerance)
        assert 250 <= a_count <= 420
        assert 250 <= b_count <= 420
        assert 250 <= c_count <= 420

    def test_get_variant_nonexistent_experiment(self, framework):
        """Test that nonexistent experiment raises ValueError."""
        with pytest.raises(ValueError, match="not found"):
            framework.get_variant("nonexistent", "user123")

    # === Outcome Logging Tests ===

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
        assert framework.outcomes[0].metrics["latency_ms"] == 150

    def test_log_outcome_auto_assigns_variant(self, framework, sample_variants):
        """Test that logging outcome auto-assigns variant if needed."""
        framework.create_experiment("test", sample_variants)

        # Log outcome without getting variant first
        framework.log_outcome("test", "user456", {"latency_ms": 100})

        # Should have created an assignment
        assert len(framework.outcomes) == 1
        assert framework.outcomes[0].variant_name in ["control", "treatment"]

    def test_log_multiple_outcomes_same_user(self, framework, sample_variants):
        """Test logging multiple outcomes for same user."""
        framework.create_experiment("test", sample_variants)
        framework.get_variant("test", "user123")

        framework.log_outcome("test", "user123", {"latency_ms": 100})
        framework.log_outcome("test", "user123", {"latency_ms": 150})
        framework.log_outcome("test", "user123", {"latency_ms": 200})

        assert len(framework.outcomes) == 3

        # All should have same variant
        variants = [o.variant_name for o in framework.outcomes]
        assert len(set(variants)) == 1

    # === Results Aggregation Tests ===

    def test_get_results_empty(self, framework, sample_variants):
        """Test get_results with no outcomes."""
        framework.create_experiment("test", sample_variants)

        results = framework.get_results("test")

        assert "error" in results

    def test_get_results_aggregates_correctly(self, framework, sample_variants):
        """Test that results are aggregated correctly per variant."""
        framework.create_experiment("test", sample_variants)

        # Simulate outcomes for multiple users
        test_data = [
            ("user1", {"latency_ms": 100, "quality": 0.8}),
            ("user2", {"latency_ms": 120, "quality": 0.85}),
            ("user3", {"latency_ms": 80, "quality": 0.9}),
            ("user4", {"latency_ms": 90, "quality": 0.75}),
            ("user5", {"latency_ms": 110, "quality": 0.82}),
        ]

        for user_id, metrics in test_data:
            framework.get_variant("test", user_id)
            framework.log_outcome("test", user_id, metrics)

        results = framework.get_results("test")

        # Should have results for at least one variant
        assert len(results) >= 1

        # Each variant should have metrics
        for variant_name, data in results.items():
            assert "count" in data
            assert "metrics" in data
            if "latency_ms" in data["metrics"]:
                assert "mean" in data["metrics"]["latency_ms"]
                assert "std" in data["metrics"]["latency_ms"]

    def test_get_results_nonexistent_experiment(self, framework):
        """Test get_results for nonexistent experiment."""
        with pytest.raises(ValueError, match="not found"):
            framework.get_results("nonexistent")

    # === Experiment Management Tests ===

    def test_deactivate_experiment(self, framework, sample_variants):
        """Test deactivating an experiment."""
        framework.create_experiment("test", sample_variants)

        framework.deactivate_experiment("test")

        assert framework.experiments["test"]["is_active"] is False

    def test_get_experiment_info(self, framework, sample_variants):
        """Test getting experiment information."""
        framework.create_experiment(
            "test",
            sample_variants,
            description="A test experiment"
        )
        framework.get_variant("test", "user1")
        framework.get_variant("test", "user2")

        info = framework.get_experiment_info("test")

        assert info["name"] == "test"
        assert info["description"] == "A test experiment"
        assert info["is_active"] is True
        assert len(info["variants"]) == 2
        assert info["total_assignments"] == 2
```

---

## Additional Solutions

### Running the Tests

```bash
# Run all tests
pytest tests/ -v

# Run with coverage
pytest tests/ -v --cov=app --cov-report=term-missing --cov-report=html

# Run only unit tests
pytest tests/unit/ -v

# Run only integration tests
pytest tests/integration/ -v

# Run specific test class
pytest tests/unit/test_summarizer.py::TestInputValidation -v

# Run tests matching a pattern
pytest tests/ -v -k "test_summarize"
```

### Common Issues and Fixes

**Issue 1: AsyncMock not available**
```python
# For Python < 3.8, install asyncmock
pip install asyncmock
from asyncmock import AsyncMock
```

**Issue 2: Patch target not found**
```python
# Wrong - patching where defined
@patch('openai.AsyncOpenAI')

# Right - patching where imported
@patch('app.services.summarizer.AsyncOpenAI')
```

**Issue 3: pytest-asyncio not detecting tests**
```ini
# pyproject.toml or pytest.ini
[tool:pytest]
asyncio_mode = auto
```

**Issue 4: ROUGE score installation**
```bash
pip install rouge-score
# Note: Use rouge_score (underscore) in imports
from rouge_score import rouge_scorer
```

---

## Summary

These solutions provide:

1. **Complete fixtures** for mocking OpenAI responses
2. **Comprehensive unit tests** for validation and summarization
3. **Integration tests** for API endpoints
4. **Working evaluation metrics** (ROUGE, BLEU, Semantic)
5. **Full A/B testing framework** with consistent hashing
6. **Extensive test coverage** for all components

Key patterns demonstrated:
- Proper async mocking with `AsyncMock`
- Consistent hashing for A/B assignment
- Statistical aggregation for experiment results
- Parameterized tests for multiple scenarios
- Factory fixtures for custom mock responses
