# Module 5 Exercise: RAG Implementation Lab

## Exercise Overview

**Objective**: Build a complete RAG system from scratch with document processing, hybrid retrieval, and evaluation.

**Duration**: 3.5 hours

**Prerequisites**:
- Completed Module 4 (Embeddings & Vector Databases)
- OpenAI API key
- Python packages: openai, chromadb, tiktoken, rank-bm25

---

## Part 1: Document Processing Pipeline (40 minutes)

### Task 1.1: Build Document Processor

```python
# document_processor.py
from dataclasses import dataclass
from typing import List, Dict, Optional
import re
import hashlib

@dataclass
class Chunk:
    id: str
    content: str
    source: str
    chunk_index: int
    total_chunks: int
    metadata: Dict

class DocumentProcessor:
    """Process documents into chunks for RAG."""

    def __init__(
        self,
        chunk_size: int = 500,
        chunk_overlap: int = 50,
        min_chunk_size: int = 100
    ):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.min_chunk_size = min_chunk_size

    def process(
        self,
        text: str,
        source: str,
        metadata: Optional[Dict] = None
    ) -> List[Chunk]:
        """Process text into chunks."""

        # Clean text
        text = self._clean(text)

        # Split into sentences
        sentences = self._split_sentences(text)

        # Group into chunks
        chunks = self._create_chunks(sentences)

        # Create Chunk objects
        return [
            Chunk(
                id=self._generate_id(source, i),
                content=chunk,
                source=source,
                chunk_index=i,
                total_chunks=len(chunks),
                metadata=metadata or {}
            )
            for i, chunk in enumerate(chunks)
        ]

    def _clean(self, text: str) -> str:
        """Clean text of artifacts."""
        # TODO: Implement cleaning
        # - Remove excessive whitespace
        # - Normalize newlines
        # - Remove special characters if needed
        text = re.sub(r'\s+', ' ', text)
        text = re.sub(r'\n{3,}', '\n\n', text)
        return text.strip()

    def _split_sentences(self, text: str) -> List[str]:
        """Split into sentences."""
        # TODO: Implement sentence splitting
        # Handle: periods, question marks, exclamation points
        # But don't split on: Dr., Mr., etc.
        pattern = r'(?<=[.!?])\s+(?=[A-Z])'
        sentences = re.split(pattern, text)
        return [s.strip() for s in sentences if s.strip()]

    def _create_chunks(self, sentences: List[str]) -> List[str]:
        """Group sentences into chunks with overlap."""
        chunks = []
        current = []
        current_len = 0

        for sentence in sentences:
            sent_len = len(sentence)

            # TODO: Implement chunking logic
            # If adding this sentence exceeds chunk_size, save current chunk
            # Keep overlap by retaining some sentences
            if current_len + sent_len > self.chunk_size and current:
                chunks.append(' '.join(current))

                # Calculate overlap - keep last N sentences
                overlap_len = 0
                overlap_sentences = []
                for s in reversed(current):
                    if overlap_len + len(s) <= self.chunk_overlap:
                        overlap_sentences.insert(0, s)
                        overlap_len += len(s)
                    else:
                        break

                current = overlap_sentences
                current_len = overlap_len

            current.append(sentence)
            current_len += sent_len

        # Don't forget the last chunk!
        if current and current_len >= self.min_chunk_size:
            chunks.append(' '.join(current))

        return chunks

    def _generate_id(self, source: str, index: int) -> str:
        """Generate unique ID."""
        content = f"{source}:{index}"
        return hashlib.md5(content.encode()).hexdigest()[:12]


# Test your processor
test_text = """
Machine learning is a subset of artificial intelligence that enables computers to learn from data. It has revolutionized many industries by enabling predictions and automation at scale.

There are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning. Each approach is suited for different types of problems.

Supervised learning uses labeled data to train models. The algorithm learns to map inputs to outputs based on example pairs. Common applications include image classification and spam detection.

Unsupervised learning finds patterns in unlabeled data. Clustering and dimensionality reduction are key techniques. These methods are useful for customer segmentation and anomaly detection.

Reinforcement learning trains agents through trial and error. The agent receives rewards or penalties based on its actions. This approach powers game-playing AI and robotics applications.

Deep learning is a subset of machine learning that uses neural networks with many layers. These networks can learn hierarchical representations of data, making them powerful for complex tasks like natural language understanding.
"""

processor = DocumentProcessor(chunk_size=300, chunk_overlap=50)
chunks = processor.process(test_text, "ml_overview.txt", {"topic": "ML"})

print(f"Created {len(chunks)} chunks:\n")
for chunk in chunks:
    print(f"ID: {chunk.id}")
    print(f"Index: {chunk.chunk_index}/{chunk.total_chunks}")
    print(f"Length: {len(chunk.content)} chars")
    print(f"Content: {chunk.content[:100]}...")
    print("-" * 50)
```

**Questions:**
1. How many chunks were created from the test text?
2. What happens if you reduce chunk_size to 200?
3. Does overlap preserve context between chunks?

### Task 1.2: Index Documents

```python
# indexer.py
import chromadb
from chromadb.utils import embedding_functions
from typing import List

class RAGIndexer:
    """Index documents for RAG retrieval."""

    def __init__(self, collection_name: str = "rag_documents"):
        self.client = chromadb.PersistentClient(path="./rag_db")

        # Use OpenAI embeddings
        self.embedding_fn = embedding_functions.OpenAIEmbeddingFunction(
            model_name="text-embedding-3-small"
        )

        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            embedding_function=self.embedding_fn,
            metadata={"hnsw:space": "cosine"}
        )

    def index_chunks(self, chunks: List[Chunk]) -> int:
        """Index chunks into vector database."""
        if not chunks:
            return 0

        # Prepare data
        documents = [c.content for c in chunks]
        ids = [c.id for c in chunks]
        metadatas = [
            {
                "source": c.source,
                "chunk_index": c.chunk_index,
                "total_chunks": c.total_chunks,
                "content": c.content,  # Store for retrieval
                **c.metadata
            }
            for c in chunks
        ]

        # TODO: Check for existing IDs to avoid duplicates
        existing = self.collection.get(ids=ids)
        new_indices = [
            i for i, id in enumerate(ids)
            if id not in existing['ids']
        ]

        if not new_indices:
            return 0

        # Filter to new documents only
        new_docs = [documents[i] for i in new_indices]
        new_ids = [ids[i] for i in new_indices]
        new_metas = [metadatas[i] for i in new_indices]

        self.collection.add(
            documents=new_docs,
            ids=new_ids,
            metadatas=new_metas
        )

        return len(new_indices)

    def get_stats(self) -> Dict:
        """Get collection statistics."""
        return {
            "total_documents": self.collection.count(),
            "collection_name": self.collection.name
        }


# Index the test documents
indexer = RAGIndexer()
indexed = indexer.index_chunks(chunks)
print(f"Indexed {indexed} new chunks")
print(f"Stats: {indexer.get_stats()}")
```

---

## Part 2: Retrieval Implementation (45 minutes)

### Task 2.1: Implement Dense Retrieval

```python
# retrieval.py
from typing import List, Dict
from openai import OpenAI

class DenseRetriever:
    """Semantic/dense retrieval using embeddings."""

    def __init__(self, collection):
        self.collection = collection
        self.client = OpenAI()

    def retrieve(
        self,
        query: str,
        top_k: int = 5,
        filter_dict: Optional[Dict] = None
    ) -> List[Dict]:
        """Retrieve relevant documents."""

        results = self.collection.query(
            query_texts=[query],
            n_results=top_k,
            where=filter_dict,
            include=["documents", "metadatas", "distances"]
        )

        # Format results
        formatted = []
        for i, (doc, meta, dist) in enumerate(zip(
            results['documents'][0],
            results['metadatas'][0],
            results['distances'][0]
        )):
            formatted.append({
                'content': meta.get('content', doc),
                'source': meta.get('source', 'unknown'),
                'score': 1 - dist,  # Convert distance to similarity
                'metadata': meta
            })

        return formatted


# Test dense retrieval
dense_retriever = DenseRetriever(indexer.collection)
results = dense_retriever.retrieve("What is supervised learning?", top_k=3)

print("Dense Retrieval Results:")
for r in results:
    print(f"\n[Score: {r['score']:.4f}]")
    print(f"Source: {r['source']}")
    print(f"Content: {r['content'][:150]}...")
```

### Task 2.2: Implement BM25 Retrieval

```python
# bm25_retrieval.py
from rank_bm25 import BM25Okapi
import numpy as np

class SparseRetriever:
    """BM25-based keyword retrieval."""

    def __init__(self, documents: List[Dict]):
        self.documents = documents

        # Tokenize documents
        self.tokenized = [
            doc['content'].lower().split()
            for doc in documents
        ]

        # Build BM25 index
        self.bm25 = BM25Okapi(self.tokenized)

    def retrieve(self, query: str, top_k: int = 5) -> List[Dict]:
        """Retrieve using BM25."""
        tokenized_query = query.lower().split()
        scores = self.bm25.get_scores(tokenized_query)

        # Get top k
        top_indices = np.argsort(scores)[::-1][:top_k]

        results = []
        for idx in top_indices:
            if scores[idx] > 0:
                results.append({
                    **self.documents[idx],
                    'bm25_score': float(scores[idx])
                })

        return results


# Build sparse retriever from existing documents
all_docs = indexer.collection.get(include=['metadatas'])
doc_list = [
    {'content': m.get('content', ''), 'source': m.get('source', '')}
    for m in all_docs['metadatas']
]

sparse_retriever = SparseRetriever(doc_list)
sparse_results = sparse_retriever.retrieve("supervised learning labeled data", top_k=3)

print("\nSparse (BM25) Retrieval Results:")
for r in sparse_results:
    print(f"\n[BM25 Score: {r['bm25_score']:.4f}]")
    print(f"Content: {r['content'][:150]}...")
```

### Task 2.3: Implement Hybrid Retrieval

```python
# hybrid_retrieval.py

class HybridRetriever:
    """Combine dense and sparse retrieval with RRF."""

    def __init__(
        self,
        dense_retriever: DenseRetriever,
        sparse_retriever: SparseRetriever,
        dense_weight: float = 0.6
    ):
        self.dense = dense_retriever
        self.sparse = sparse_retriever
        self.dense_weight = dense_weight

    def retrieve(self, query: str, top_k: int = 5) -> List[Dict]:
        """Hybrid retrieval with reciprocal rank fusion."""

        # Get more than needed for reranking
        fetch_k = top_k * 3

        # Dense results
        dense_results = self.dense.retrieve(query, fetch_k)

        # Sparse results
        sparse_results = self.sparse.retrieve(query, fetch_k)

        # TODO: Implement Reciprocal Rank Fusion
        # For each result, compute: score = weight / (k + rank + 1)
        # k is typically 60

        k = 60
        scores = {}

        # Process dense results
        for rank, result in enumerate(dense_results):
            doc_id = result['content'][:50]  # Use content prefix as ID
            if doc_id not in scores:
                scores[doc_id] = {'result': result, 'score': 0}
            scores[doc_id]['score'] += self.dense_weight / (k + rank + 1)

        # Process sparse results
        sparse_weight = 1 - self.dense_weight
        for rank, result in enumerate(sparse_results):
            doc_id = result['content'][:50]
            if doc_id not in scores:
                scores[doc_id] = {'result': result, 'score': 0}
            scores[doc_id]['score'] += sparse_weight / (k + rank + 1)

        # Sort and return
        sorted_results = sorted(
            scores.values(),
            key=lambda x: x['score'],
            reverse=True
        )

        return [
            {**item['result'], 'hybrid_score': item['score']}
            for item in sorted_results[:top_k]
        ]


# Test hybrid retrieval
hybrid = HybridRetriever(dense_retriever, sparse_retriever, dense_weight=0.7)
hybrid_results = hybrid.retrieve("What are the types of machine learning?", top_k=3)

print("\nHybrid Retrieval Results:")
for r in hybrid_results:
    print(f"\n[Hybrid Score: {r['hybrid_score']:.6f}]")
    print(f"Content: {r['content'][:150]}...")
```

---

## Part 3: Context Assembly & Generation (40 minutes)

### Task 3.1: Token-Aware Context Builder

```python
# context_builder.py
import tiktoken

class ContextBuilder:
    """Build context with token limits."""

    def __init__(self, max_tokens: int = 3000, model: str = "gpt-4o"):
        self.max_tokens = max_tokens
        self.encoder = tiktoken.encoding_for_model(model)

    def build(
        self,
        documents: List[Dict],
        include_sources: bool = True
    ) -> str:
        """Build context string within token limit."""

        parts = []
        total_tokens = 0

        for i, doc in enumerate(documents):
            content = doc.get('content', '')
            source = doc.get('source', f'Source {i+1}')

            # Format this document
            if include_sources:
                text = f"[{source}]\n{content}"
            else:
                text = content

            # Count tokens
            tokens = len(self.encoder.encode(text))

            # Check if we can fit
            if total_tokens + tokens + 10 > self.max_tokens:
                break

            parts.append(text)
            total_tokens += tokens + 5  # Account for separator

        context = "\n\n---\n\n".join(parts)

        print(f"Context built: {total_tokens} tokens, {len(parts)} documents")
        return context

    def count_tokens(self, text: str) -> int:
        """Count tokens in text."""
        return len(self.encoder.encode(text))


# Test context building
builder = ContextBuilder(max_tokens=1000)
context = builder.build(hybrid_results)
print(f"\nContext ({builder.count_tokens(context)} tokens):")
print(context[:500] + "...")
```

### Task 3.2: RAG Generation

```python
# rag_generator.py

class RAGGenerator:
    """Generate answers using RAG."""

    def __init__(self, model: str = "gpt-4o"):
        self.client = OpenAI()
        self.model = model

    def generate(
        self,
        query: str,
        context: str,
        system_prompt: Optional[str] = None
    ) -> str:
        """Generate answer from context."""

        if system_prompt is None:
            system_prompt = """You are a helpful assistant that answers questions based on the provided context.

Guidelines:
- Use ONLY information from the provided context
- If the context doesn't contain the answer, say "I don't have enough information to answer that question"
- Cite your sources using [Source Name] notation
- Be accurate and concise
- If you're uncertain, express that uncertainty"""

        messages = [
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": f"""Context:
{context}

---

Question: {query}

Answer based on the context above:"""
            }
        ]

        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=0
        )

        return response.choices[0].message.content


# Test generation
generator = RAGGenerator()
answer = generator.generate(
    query="What is supervised learning and what are some applications?",
    context=context
)

print("\nGenerated Answer:")
print(answer)
```

---

## Part 4: Complete RAG System (35 minutes)

### Task 4.1: Build End-to-End RAG

```python
# complete_rag.py

class CompleteRAG:
    """Production RAG system."""

    def __init__(
        self,
        collection_name: str = "rag_documents",
        max_context_tokens: int = 3000,
        top_k: int = 5
    ):
        # Initialize components
        self.indexer = RAGIndexer(collection_name)
        self.context_builder = ContextBuilder(max_tokens=max_context_tokens)
        self.generator = RAGGenerator()
        self.top_k = top_k

        # Build retrievers
        self._init_retrievers()

    def _init_retrievers(self):
        """Initialize retrievers with current documents."""
        self.dense_retriever = DenseRetriever(self.indexer.collection)

        # Get all docs for BM25
        all_docs = self.indexer.collection.get(include=['metadatas'])
        doc_list = [
            {'content': m.get('content', ''), 'source': m.get('source', '')}
            for m in all_docs['metadatas']
        ]

        if doc_list:
            self.sparse_retriever = SparseRetriever(doc_list)
            self.hybrid_retriever = HybridRetriever(
                self.dense_retriever,
                self.sparse_retriever
            )
        else:
            self.sparse_retriever = None
            self.hybrid_retriever = None

    def index_document(
        self,
        text: str,
        source: str,
        metadata: Optional[Dict] = None
    ) -> int:
        """Index a new document."""
        processor = DocumentProcessor()
        chunks = processor.process(text, source, metadata)
        indexed = self.indexer.index_chunks(chunks)

        # Rebuild retrievers with new docs
        if indexed > 0:
            self._init_retrievers()

        return indexed

    def query(
        self,
        question: str,
        use_hybrid: bool = True,
        verbose: bool = False
    ) -> Dict:
        """Answer a question using RAG."""

        # 1. Retrieve
        if use_hybrid and self.hybrid_retriever:
            docs = self.hybrid_retriever.retrieve(question, self.top_k)
        else:
            docs = self.dense_retriever.retrieve(question, self.top_k)

        if verbose:
            print(f"Retrieved {len(docs)} documents")
            for d in docs:
                score = d.get('hybrid_score', d.get('score', 0))
                print(f"  - [{score:.4f}] {d['content'][:50]}...")

        # 2. Build context
        context = self.context_builder.build(docs)

        if verbose:
            print(f"Context: {self.context_builder.count_tokens(context)} tokens")

        # 3. Generate
        answer = self.generator.generate(question, context)

        return {
            'answer': answer,
            'sources': [d.get('source', 'unknown') for d in docs],
            'retrieved_docs': len(docs)
        }


# Test complete system
rag = CompleteRAG()

# Add more documents
additional_text = """
Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes or neurons organized in layers. The input layer receives data, hidden layers process it, and the output layer produces results.

Training a neural network involves adjusting connection weights through backpropagation. The algorithm calculates gradients of the loss function and updates weights to minimize errors. This process requires large amounts of data and computational resources.

Common neural network architectures include feedforward networks, convolutional neural networks (CNNs), and recurrent neural networks (RNNs). CNNs excel at image processing, while RNNs handle sequential data like text and time series.

Transformers are a breakthrough architecture that uses attention mechanisms instead of recurrence. They power modern language models like GPT and BERT. The attention mechanism allows the model to focus on relevant parts of the input when producing output.
"""

rag.index_document(additional_text, "neural_networks.txt", {"topic": "deep learning"})

# Query the system
result = rag.query(
    "How do neural networks learn?",
    verbose=True
)

print("\n" + "="*50)
print("ANSWER:")
print("="*50)
print(result['answer'])
print(f"\nSources: {result['sources']}")
```

---

## Part 5: RAG Evaluation (30 minutes)

### Task 5.1: Create Test Cases

```python
# evaluation.py

test_cases = [
    {
        "query": "What is supervised learning?",
        "expected_keywords": ["labeled", "data", "training", "examples"],
        "expected_topics": ["ml_overview"]
    },
    {
        "query": "How do neural networks learn?",
        "expected_keywords": ["backpropagation", "weights", "training"],
        "expected_topics": ["neural_networks"]
    },
    {
        "query": "What is the difference between CNN and RNN?",
        "expected_keywords": ["image", "sequential", "convolutional", "recurrent"],
        "expected_topics": ["neural_networks"]
    },
    {
        "query": "What are transformers used for?",
        "expected_keywords": ["attention", "language", "GPT", "BERT"],
        "expected_topics": ["neural_networks"]
    },
    {
        "query": "What is quantum computing?",
        "expected_keywords": [],  # Should not be in our documents
        "expected_topics": []
    }
]
```

### Task 5.2: Implement Evaluation

```python
def evaluate_rag(rag: CompleteRAG, test_cases: List[Dict]) -> Dict:
    """Evaluate RAG system."""

    results = {
        'total': len(test_cases),
        'keyword_matches': 0,
        'source_accuracy': 0,
        'no_info_correct': 0,
        'details': []
    }

    for case in test_cases:
        query = case['query']
        expected_keywords = case['expected_keywords']
        expected_topics = case['expected_topics']

        # Run query
        response = rag.query(query, verbose=False)
        answer = response['answer'].lower()
        sources = [s.lower() for s in response['sources']]

        # Check keyword presence
        keywords_found = sum(1 for kw in expected_keywords if kw.lower() in answer)
        keyword_score = keywords_found / len(expected_keywords) if expected_keywords else 1.0

        # Check source relevance
        source_score = 0
        for topic in expected_topics:
            if any(topic in s for s in sources):
                source_score = 1
                break
        if not expected_topics:
            source_score = 1 if "don't have" in answer or "no information" in answer else 0

        results['keyword_matches'] += keyword_score
        results['source_accuracy'] += source_score

        results['details'].append({
            'query': query,
            'keyword_score': keyword_score,
            'source_score': source_score,
            'answer_preview': answer[:100]
        })

    # Calculate averages
    results['avg_keyword_match'] = results['keyword_matches'] / results['total']
    results['avg_source_accuracy'] = results['source_accuracy'] / results['total']

    return results


# Run evaluation
eval_results = evaluate_rag(rag, test_cases)

print("\nRAG Evaluation Results")
print("=" * 50)
print(f"Total test cases: {eval_results['total']}")
print(f"Average keyword match: {eval_results['avg_keyword_match']:.2%}")
print(f"Average source accuracy: {eval_results['avg_source_accuracy']:.2%}")

print("\nDetails:")
for detail in eval_results['details']:
    print(f"\n  Query: {detail['query']}")
    print(f"  Keyword Score: {detail['keyword_score']:.2%}")
    print(f"  Source Score: {detail['source_score']:.2%}")
```

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Document Processing | 20 | Chunking with overlap works correctly |
| Dense Retrieval | 15 | Returns relevant results with scores |
| Sparse Retrieval | 15 | BM25 implementation works |
| Hybrid Retrieval | 20 | RRF fusion combines both signals |
| Context Building | 10 | Respects token limits |
| Complete System | 15 | End-to-end pipeline works |
| Evaluation | 5 | Test cases run successfully |
| **Total** | **100** | |

---

## Submission Checklist

- [ ] Document processor creates overlapping chunks
- [ ] Dense retrieval returns scored results
- [ ] BM25 sparse retrieval works
- [ ] Hybrid RRF combines both retrieval methods
- [ ] Context builder respects token limits
- [ ] Complete RAG answers questions correctly
- [ ] Evaluation shows reasonable metrics

---

*Exercise 5 of 12 | Building AI-Powered Applications | Duration: 3.5 hours*
