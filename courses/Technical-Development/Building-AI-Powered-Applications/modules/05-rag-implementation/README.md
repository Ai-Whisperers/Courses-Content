# Module 5: RAG Implementation

## Learning Objectives

By the end of this module, you will be able to:

1. Design end-to-end RAG architecture
2. Implement document processing pipelines
3. Build effective retrieval strategies
4. Optimize context assembly and ranking
5. Evaluate and improve RAG system performance

---

## Introduction

Retrieval-Augmented Generation (RAG) combines the power of large language models with your own data. Instead of relying solely on the model's training data, RAG retrieves relevant documents and provides them as context, enabling accurate, grounded responses about your specific content.

This module teaches you to build production-ready RAG systems that retrieve the right information and generate accurate answers.

---

## 1. RAG Architecture

### The RAG Pipeline

```
┌─────────────┐     ┌─────────────────────────────────────────┐
│   Query     │────▶│           RETRIEVAL PIPELINE            │
└─────────────┘     │  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
                    │  │  Embed  │─▶│ Search  │─▶│  Rank   │ │
                    │  └─────────┘  └─────────┘  └─────────┘ │
                    └──────────────────┬──────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   GENERATION PIPELINE                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  Assemble   │─▶│   Prompt    │─▶│        LLM          │ │
│  │   Context   │  │   Build     │  │                     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└──────────────────────────────────┬──────────────────────────┘
                                   │
                                   ▼
                            ┌─────────────┐
                            │  Response   │
                            └─────────────┘
```

### RAG Components

| Component | Purpose | Key Considerations |
|-----------|---------|-------------------|
| **Embedding** | Convert query to vector | Same model as index |
| **Retrieval** | Find relevant documents | Accuracy vs. speed |
| **Ranking** | Order by relevance | Reranking improves quality |
| **Context Assembly** | Build prompt context | Token limits matter |
| **Generation** | Produce answer | Grounding instructions |

### Basic RAG Implementation

```python
from openai import OpenAI
from typing import List, Dict

class SimpleRAG:
    """Basic RAG implementation."""

    def __init__(self, vector_store, embedding_model: str = "text-embedding-3-small"):
        self.vector_store = vector_store
        self.embedding_model = embedding_model
        self.client = OpenAI()

    def query(self, question: str, top_k: int = 5) -> str:
        """Answer a question using RAG."""

        # 1. Retrieve relevant documents
        docs = self._retrieve(question, top_k)

        # 2. Build context
        context = self._build_context(docs)

        # 3. Generate answer
        answer = self._generate(question, context)

        return answer

    def _retrieve(self, query: str, top_k: int) -> List[Dict]:
        """Retrieve relevant documents."""
        embedding = self._embed(query)
        results = self.vector_store.query(
            vector=embedding,
            top_k=top_k,
            include_metadata=True
        )
        return results.matches

    def _embed(self, text: str) -> List[float]:
        """Generate embedding."""
        response = self.client.embeddings.create(
            model=self.embedding_model,
            input=text
        )
        return response.data[0].embedding

    def _build_context(self, docs: List[Dict]) -> str:
        """Assemble context from retrieved documents."""
        context_parts = []
        for i, doc in enumerate(docs):
            source = doc.metadata.get('source', f'Document {i+1}')
            content = doc.metadata.get('content', '')
            context_parts.append(f"[{source}]\n{content}")

        return "\n\n---\n\n".join(context_parts)

    def _generate(self, question: str, context: str) -> str:
        """Generate answer from context."""
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": """You are a helpful assistant that answers questions based on the provided context.

Rules:
- Only use information from the provided context
- If the context doesn't contain the answer, say "I don't have information about that"
- Cite sources using [Source Name] notation
- Be concise but complete"""
                },
                {
                    "role": "user",
                    "content": f"""Context:
{context}

Question: {question}

Answer:"""
                }
            ],
            temperature=0
        )
        return response.choices[0].message.content
```

---

## 2. Document Processing

### Document Ingestion Pipeline

```python
from dataclasses import dataclass
from typing import List, Optional, Dict
from pathlib import Path
import hashlib

@dataclass
class ProcessedDocument:
    id: str
    content: str
    source: str
    chunk_index: int
    metadata: Dict

class DocumentProcessor:
    """Process documents for RAG indexing."""

    def __init__(
        self,
        chunk_size: int = 500,
        chunk_overlap: int = 50,
        min_chunk_size: int = 100
    ):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.min_chunk_size = min_chunk_size

    def process_text(
        self,
        text: str,
        source: str,
        metadata: Optional[Dict] = None
    ) -> List[ProcessedDocument]:
        """Process text into chunks."""

        # Clean text
        text = self._clean_text(text)

        # Chunk
        chunks = self._chunk_text(text)

        # Create processed documents
        documents = []
        for i, chunk in enumerate(chunks):
            doc_id = self._generate_id(source, i, chunk)
            documents.append(ProcessedDocument(
                id=doc_id,
                content=chunk,
                source=source,
                chunk_index=i,
                metadata={
                    'source': source,
                    'chunk_index': i,
                    'total_chunks': len(chunks),
                    **(metadata or {})
                }
            ))

        return documents

    def _clean_text(self, text: str) -> str:
        """Clean and normalize text."""
        # Remove excessive whitespace
        import re
        text = re.sub(r'\s+', ' ', text)
        text = re.sub(r'\n{3,}', '\n\n', text)
        return text.strip()

    def _chunk_text(self, text: str) -> List[str]:
        """Split text into semantic chunks."""
        chunks = []
        sentences = self._split_sentences(text)

        current_chunk = []
        current_length = 0

        for sentence in sentences:
            sentence_length = len(sentence)

            if current_length + sentence_length > self.chunk_size and current_chunk:
                # Save current chunk
                chunks.append(' '.join(current_chunk))

                # Start new chunk with overlap
                overlap_sentences = current_chunk[-2:]  # Keep last 2 sentences
                current_chunk = overlap_sentences
                current_length = sum(len(s) for s in overlap_sentences)

            current_chunk.append(sentence)
            current_length += sentence_length

        # Save final chunk
        if current_chunk:
            final_chunk = ' '.join(current_chunk)
            if len(final_chunk) >= self.min_chunk_size:
                chunks.append(final_chunk)

        return chunks

    def _split_sentences(self, text: str) -> List[str]:
        """Split text into sentences."""
        import re
        # Simple sentence splitting
        sentences = re.split(r'(?<=[.!?])\s+', text)
        return [s.strip() for s in sentences if s.strip()]

    def _generate_id(self, source: str, index: int, content: str) -> str:
        """Generate unique document ID."""
        hash_input = f"{source}:{index}:{content[:100]}"
        return hashlib.md5(hash_input.encode()).hexdigest()
```

### Processing Different File Types

```python
from pathlib import Path
import PyPDF2
import docx

class FileProcessor:
    """Process various file types for RAG."""

    def __init__(self, document_processor: DocumentProcessor):
        self.doc_processor = document_processor

    def process_file(self, file_path: str, metadata: Optional[Dict] = None) -> List[ProcessedDocument]:
        """Process file based on extension."""
        path = Path(file_path)
        extension = path.suffix.lower()

        extractors = {
            '.txt': self._extract_text,
            '.md': self._extract_text,
            '.pdf': self._extract_pdf,
            '.docx': self._extract_docx,
        }

        if extension not in extractors:
            raise ValueError(f"Unsupported file type: {extension}")

        text = extractors[extension](file_path)

        return self.doc_processor.process_text(
            text,
            source=str(path),
            metadata={'file_type': extension, **(metadata or {})}
        )

    def _extract_text(self, file_path: str) -> str:
        """Extract from plain text."""
        return Path(file_path).read_text(encoding='utf-8')

    def _extract_pdf(self, file_path: str) -> str:
        """Extract from PDF."""
        text_parts = []
        with open(file_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text_parts.append(page.extract_text())
        return '\n\n'.join(text_parts)

    def _extract_docx(self, file_path: str) -> str:
        """Extract from Word document."""
        doc = docx.Document(file_path)
        paragraphs = [p.text for p in doc.paragraphs]
        return '\n\n'.join(paragraphs)
```

---

## 3. Retrieval Strategies

### Dense Retrieval (Semantic)

```python
def dense_retrieval(query: str, index, top_k: int = 10) -> List[Dict]:
    """Pure semantic/embedding-based retrieval."""
    query_embedding = get_embedding(query)

    results = index.query(
        vector=query_embedding,
        top_k=top_k,
        include_metadata=True
    )

    return results.matches
```

### Sparse Retrieval (BM25/Keyword)

```python
from rank_bm25 import BM25Okapi
import numpy as np

class BM25Retriever:
    """BM25-based sparse retrieval."""

    def __init__(self, documents: List[Dict]):
        self.documents = documents
        self.tokenized_docs = [
            doc['content'].lower().split()
            for doc in documents
        ]
        self.bm25 = BM25Okapi(self.tokenized_docs)

    def retrieve(self, query: str, top_k: int = 10) -> List[Dict]:
        """Retrieve using BM25."""
        tokenized_query = query.lower().split()
        scores = self.bm25.get_scores(tokenized_query)

        # Get top k indices
        top_indices = np.argsort(scores)[::-1][:top_k]

        return [
            {**self.documents[i], 'score': scores[i]}
            for i in top_indices
            if scores[i] > 0
        ]
```

### Hybrid Retrieval

```python
class HybridRetriever:
    """Combine dense and sparse retrieval."""

    def __init__(
        self,
        dense_index,
        sparse_retriever: BM25Retriever,
        dense_weight: float = 0.7
    ):
        self.dense_index = dense_index
        self.sparse_retriever = sparse_retriever
        self.dense_weight = dense_weight

    def retrieve(self, query: str, top_k: int = 10) -> List[Dict]:
        """Hybrid retrieval with reciprocal rank fusion."""

        # Get more results than needed
        fetch_k = top_k * 3

        # Dense retrieval
        dense_results = dense_retrieval(query, self.dense_index, fetch_k)

        # Sparse retrieval
        sparse_results = self.sparse_retriever.retrieve(query, fetch_k)

        # Reciprocal Rank Fusion
        return self._rrf_merge(
            dense_results,
            sparse_results,
            top_k
        )

    def _rrf_merge(
        self,
        dense_results: List,
        sparse_results: List,
        top_k: int,
        k: int = 60
    ) -> List[Dict]:
        """Merge results using Reciprocal Rank Fusion."""
        scores = {}

        # Score dense results
        for rank, result in enumerate(dense_results):
            doc_id = result.id if hasattr(result, 'id') else result['id']
            if doc_id not in scores:
                scores[doc_id] = {'result': result, 'score': 0}
            scores[doc_id]['score'] += self.dense_weight / (k + rank + 1)

        # Score sparse results
        sparse_weight = 1 - self.dense_weight
        for rank, result in enumerate(sparse_results):
            doc_id = result.get('id', str(hash(result['content'])))
            if doc_id not in scores:
                scores[doc_id] = {'result': result, 'score': 0}
            scores[doc_id]['score'] += sparse_weight / (k + rank + 1)

        # Sort and return top k
        sorted_results = sorted(
            scores.values(),
            key=lambda x: x['score'],
            reverse=True
        )

        return [item['result'] for item in sorted_results[:top_k]]
```

---

## 4. Context Assembly

### Token-Aware Context Building

```python
import tiktoken

class ContextBuilder:
    """Build context with token awareness."""

    def __init__(
        self,
        max_tokens: int = 4000,
        model: str = "gpt-4o"
    ):
        self.max_tokens = max_tokens
        self.encoder = tiktoken.encoding_for_model(model)

    def build_context(
        self,
        documents: List[Dict],
        include_sources: bool = True
    ) -> str:
        """Build context string within token limit."""

        context_parts = []
        current_tokens = 0

        for i, doc in enumerate(documents):
            content = doc.get('content', doc.get('metadata', {}).get('content', ''))
            source = doc.get('source', doc.get('metadata', {}).get('source', f'Doc {i+1}'))

            # Format document
            if include_sources:
                doc_text = f"[{source}]\n{content}"
            else:
                doc_text = content

            # Count tokens
            doc_tokens = len(self.encoder.encode(doc_text))

            # Check if we can fit this document
            if current_tokens + doc_tokens + 10 > self.max_tokens:  # Buffer for separators
                break

            context_parts.append(doc_text)
            current_tokens += doc_tokens + 5  # Separator tokens

        return "\n\n---\n\n".join(context_parts)

    def count_tokens(self, text: str) -> int:
        """Count tokens in text."""
        return len(self.encoder.encode(text))
```

### Reranking for Better Context

```python
class CrossEncoderReranker:
    """Rerank using cross-encoder for better precision."""

    def __init__(self, model_name: str = "cross-encoder/ms-marco-MiniLM-L-6-v2"):
        from sentence_transformers import CrossEncoder
        self.model = CrossEncoder(model_name)

    def rerank(
        self,
        query: str,
        documents: List[Dict],
        top_k: int = 5
    ) -> List[Dict]:
        """Rerank documents by relevance to query."""

        # Prepare pairs
        pairs = [
            (query, doc.get('content', doc.get('metadata', {}).get('content', '')))
            for doc in documents
        ]

        # Score pairs
        scores = self.model.predict(pairs)

        # Sort by score
        doc_scores = list(zip(documents, scores))
        doc_scores.sort(key=lambda x: x[1], reverse=True)

        # Return top k with scores
        return [
            {**doc, 'rerank_score': float(score)}
            for doc, score in doc_scores[:top_k]
        ]
```

---

## 5. RAG Evaluation

### Evaluation Metrics

```python
from dataclasses import dataclass
from typing import List, Tuple

@dataclass
class RAGEvaluation:
    """RAG evaluation results."""
    query: str
    retrieved_docs: List[str]
    expected_docs: List[str]
    generated_answer: str
    expected_answer: str

    # Metrics
    retrieval_precision: float = 0.0
    retrieval_recall: float = 0.0
    answer_relevance: float = 0.0
    faithfulness: float = 0.0

class RAGEvaluator:
    """Evaluate RAG system performance."""

    def __init__(self, llm_client):
        self.client = llm_client

    def evaluate_retrieval(
        self,
        retrieved: List[str],
        expected: List[str]
    ) -> Tuple[float, float]:
        """Calculate retrieval precision and recall."""
        retrieved_set = set(retrieved)
        expected_set = set(expected)

        if not retrieved_set:
            precision = 0.0
        else:
            precision = len(retrieved_set & expected_set) / len(retrieved_set)

        if not expected_set:
            recall = 1.0
        else:
            recall = len(retrieved_set & expected_set) / len(expected_set)

        return precision, recall

    def evaluate_answer(
        self,
        query: str,
        generated: str,
        context: str
    ) -> Tuple[float, float]:
        """Evaluate answer quality using LLM."""

        # Relevance: Does the answer address the question?
        relevance_prompt = f"""Rate how well this answer addresses the question.
Question: {query}
Answer: {generated}

Score from 0-1 (1 = perfectly addresses the question):"""

        # Faithfulness: Is the answer grounded in the context?
        faithfulness_prompt = f"""Rate how well this answer is supported by the context.
Context: {context[:2000]}
Answer: {generated}

Score from 0-1 (1 = fully supported by context):"""

        relevance = self._get_score(relevance_prompt)
        faithfulness = self._get_score(faithfulness_prompt)

        return relevance, faithfulness

    def _get_score(self, prompt: str) -> float:
        """Get numeric score from LLM."""
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
            max_tokens=10
        )
        try:
            return float(response.choices[0].message.content.strip())
        except:
            return 0.0

    def run_evaluation(
        self,
        test_cases: List[dict]
    ) -> List[RAGEvaluation]:
        """Run evaluation on test cases."""
        results = []

        for case in test_cases:
            eval_result = RAGEvaluation(
                query=case['query'],
                retrieved_docs=case['retrieved'],
                expected_docs=case.get('expected_docs', []),
                generated_answer=case['answer'],
                expected_answer=case.get('expected_answer', '')
            )

            # Retrieval metrics
            eval_result.retrieval_precision, eval_result.retrieval_recall = \
                self.evaluate_retrieval(case['retrieved'], case.get('expected_docs', []))

            # Answer metrics
            eval_result.answer_relevance, eval_result.faithfulness = \
                self.evaluate_answer(case['query'], case['answer'], case.get('context', ''))

            results.append(eval_result)

        return results
```

---

## 6. Production RAG System

```python
class ProductionRAG:
    """Production-ready RAG system."""

    def __init__(
        self,
        vector_store,
        sparse_retriever: Optional[BM25Retriever] = None,
        reranker: Optional[CrossEncoderReranker] = None,
        max_context_tokens: int = 4000
    ):
        self.vector_store = vector_store
        self.sparse_retriever = sparse_retriever
        self.reranker = reranker
        self.context_builder = ContextBuilder(max_tokens=max_context_tokens)
        self.client = OpenAI()

    def answer(
        self,
        query: str,
        top_k: int = 5,
        use_hybrid: bool = True,
        use_reranking: bool = True,
        stream: bool = False
    ):
        """Answer a query using RAG."""

        # 1. Retrieve
        if use_hybrid and self.sparse_retriever:
            retriever = HybridRetriever(self.vector_store, self.sparse_retriever)
            docs = retriever.retrieve(query, top_k=top_k * 2)
        else:
            docs = dense_retrieval(query, self.vector_store, top_k * 2)

        # 2. Rerank
        if use_reranking and self.reranker:
            docs = self.reranker.rerank(query, docs, top_k)
        else:
            docs = docs[:top_k]

        # 3. Build context
        context = self.context_builder.build_context(docs)

        # 4. Generate
        messages = self._build_messages(query, context)

        if stream:
            return self._stream_response(messages)
        else:
            return self._generate_response(messages)

    def _build_messages(self, query: str, context: str) -> List[Dict]:
        """Build messages for generation."""
        return [
            {
                "role": "system",
                "content": """You are a helpful assistant that answers questions based on the provided context.

Guidelines:
- Base your answer ONLY on the provided context
- If the context doesn't contain enough information, say so
- Use [Source] citations when referencing specific information
- Be concise but thorough
- If you're uncertain, express that uncertainty"""
            },
            {
                "role": "user",
                "content": f"""Context:
{context}

---

Question: {query}

Please provide a comprehensive answer based on the context above."""
            }
        ]

    def _generate_response(self, messages: List[Dict]) -> str:
        """Generate non-streaming response."""
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0
        )
        return response.choices[0].message.content

    def _stream_response(self, messages: List[Dict]):
        """Generate streaming response."""
        stream = self.client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            temperature=0,
            stream=True
        )
        for chunk in stream:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content
```

---

## Key Takeaways

1. **RAG grounds LLM responses** in your data, reducing hallucination
2. **Chunking quality matters** - Bad chunks = bad retrieval = bad answers
3. **Hybrid retrieval wins** - Combining semantic and keyword search improves results
4. **Reranking helps precision** - Cross-encoders catch what bi-encoders miss
5. **Evaluate continuously** - Measure retrieval and answer quality separately

---

## Knowledge Check

Before moving on, ensure you can:

1. Explain the RAG pipeline components
2. Implement document chunking with overlap
3. Build hybrid retrieval with RRF
4. Assemble context within token limits
5. Evaluate RAG performance

---

## Next Module Preview

In **Module 6: Intelligent Chatbots**, you'll learn to build conversational AI with memory, multi-turn context, and intent routing.

---

*Module 5 of 12 | Building AI-Powered Applications | Duration: 6 hours*
