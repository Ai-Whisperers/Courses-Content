# Module 4 Exercise: Embeddings & Vector Database Lab

## Exercise Overview

**Objective**: Build a complete semantic search system using embeddings and a vector database.

**Duration**: 3 hours

**Prerequisites**:
- OpenAI API key
- Chroma or Pinecone account
- Python 3.10+ with required packages

---

## Setup

Install required packages:
```bash
pip install openai chromadb sentence-transformers numpy
```

---

## Part 1: Understanding Embeddings (30 minutes)

### Task 1.1: Generate and Explore Embeddings

```python
# embedding_exploration.py
from openai import OpenAI
import numpy as np
from typing import List

client = OpenAI()

def get_embedding(text: str) -> List[float]:
    """Get embedding for a single text."""
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding


def cosine_similarity(a: List[float], b: List[float]) -> float:
    """Calculate cosine similarity between two vectors."""
    # TODO: Implement cosine similarity
    # Formula: (A · B) / (||A|| × ||B||)
    a_np = np.array(a)
    b_np = np.array(b)
    return _______________


# Test with semantic pairs
test_pairs = [
    ("happy dog", "joyful puppy"),           # Similar
    ("happy dog", "sad cat"),                 # Related
    ("happy dog", "quantum physics"),         # Unrelated
    ("machine learning", "artificial intelligence"),  # Similar
    ("machine learning", "baking recipes"),   # Unrelated
]

print("Semantic Similarity Analysis")
print("=" * 50)

for text1, text2 in test_pairs:
    emb1 = get_embedding(text1)
    emb2 = get_embedding(text2)
    similarity = cosine_similarity(emb1, emb2)

    print(f"\n'{text1}' vs '{text2}'")
    print(f"Similarity: {similarity:.4f}")
```

**Fill in the Results Table:**

| Text 1 | Text 2 | Similarity |
|--------|--------|------------|
| happy dog | joyful puppy | |
| happy dog | sad cat | |
| happy dog | quantum physics | |
| machine learning | artificial intelligence | |
| machine learning | baking recipes | |

**Questions:**
1. What similarity score indicates semantic relatedness?
2. What's the typical threshold for "similar" content?

### Task 1.2: Visualize Embedding Space

```python
# embedding_visualization.py
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# Get embeddings for a set of words
words = [
    # Animals
    "dog", "cat", "bird", "fish",
    # Vehicles
    "car", "truck", "airplane", "boat",
    # Tech
    "computer", "software", "algorithm", "data"
]

embeddings = [get_embedding(word) for word in words]

# Reduce to 2D for visualization
pca = PCA(n_components=2)
reduced = pca.fit_transform(embeddings)

# Plot
plt.figure(figsize=(12, 8))
colors = ['red']*4 + ['blue']*4 + ['green']*4

for i, word in enumerate(words):
    plt.scatter(reduced[i, 0], reduced[i, 1], c=colors[i], s=100)
    plt.annotate(word, (reduced[i, 0], reduced[i, 1]), fontsize=12)

plt.title("Embedding Space Visualization (PCA)")
plt.xlabel("Component 1")
plt.ylabel("Component 2")
plt.savefig("embedding_space.png")
plt.show()

# TODO: Describe what you observe about clustering
"""
Your observations:


"""
```

---

## Part 2: Vector Database Setup (40 minutes)

### Task 2.1: Set Up Chroma (Local)

```python
# chroma_setup.py
import chromadb
from chromadb.utils import embedding_functions

# Create persistent client
client = chromadb.PersistentClient(path="./chroma_data")

# Use OpenAI embeddings
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="your-api-key",
    model_name="text-embedding-3-small"
)

# Create collection
collection = client.get_or_create_collection(
    name="documents",
    embedding_function=openai_ef,
    metadata={"hnsw:space": "cosine"}
)

# Sample documents
documents = [
    "Python is a programming language known for its simplicity and readability.",
    "JavaScript is widely used for web development, both frontend and backend.",
    "Machine learning is a subset of artificial intelligence focused on learning from data.",
    "Docker containers provide lightweight, portable application environments.",
    "Kubernetes orchestrates containerized applications across multiple hosts.",
    "PostgreSQL is a powerful open-source relational database system.",
    "Redis is an in-memory data structure store used as a database and cache.",
    "Natural language processing enables computers to understand human language.",
    "API design should follow REST principles for consistency and scalability.",
    "Test-driven development involves writing tests before implementing code."
]

# TODO: Add documents to collection with IDs and metadata
collection.add(
    documents=_______________,
    ids=_______________,  # Generate IDs like "doc_0", "doc_1", etc.
    metadatas=_______________  # Add category metadata
)

print(f"Collection now has {collection.count()} documents")
```

### Task 2.2: Query the Database

```python
# chroma_query.py

def search_documents(query: str, n_results: int = 3):
    """Search for similar documents."""
    results = collection.query(
        query_texts=[query],
        n_results=n_results,
        include=["documents", "distances", "metadatas"]
    )

    print(f"\nQuery: '{query}'")
    print("-" * 50)

    for i, (doc, distance, metadata) in enumerate(zip(
        results['documents'][0],
        results['distances'][0],
        results['metadatas'][0]
    )):
        similarity = 1 - distance  # Convert distance to similarity
        print(f"\n{i+1}. [Score: {similarity:.4f}]")
        print(f"   {doc[:100]}...")
        print(f"   Metadata: {metadata}")


# Test queries
test_queries = [
    "How do I containerize my application?",
    "What database should I use for caching?",
    "Tell me about programming languages",
    "How can computers understand text?"
]

for query in test_queries:
    search_documents(query)
```

**Document your Results:**

| Query | Top Result | Similarity Score |
|-------|------------|------------------|
| How do I containerize... | | |
| What database for caching... | | |
| Programming languages | | |
| Computers understand text | | |

---

## Part 3: Document Processing Pipeline (40 minutes)

### Task 3.1: Implement Chunking

```python
# chunking.py
from typing import List, Dict
from dataclasses import dataclass

@dataclass
class Chunk:
    content: str
    index: int
    metadata: Dict

class DocumentChunker:
    """Chunk documents for embedding."""

    def __init__(
        self,
        chunk_size: int = 500,
        chunk_overlap: int = 50,
        min_chunk_size: int = 100
    ):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.min_chunk_size = min_chunk_size

    def chunk_by_characters(self, text: str) -> List[str]:
        """Simple character-based chunking."""
        chunks = []
        start = 0

        while start < len(text):
            end = start + self.chunk_size

            # Try to break at sentence boundary
            if end < len(text):
                # TODO: Find the last period, question mark, or newline
                # within the chunk to avoid breaking mid-sentence
                last_break = _______________
                if last_break > start + self.min_chunk_size:
                    end = last_break + 1

            chunk = text[start:end].strip()
            if len(chunk) >= self.min_chunk_size:
                chunks.append(chunk)

            start = end - self.chunk_overlap

        return chunks

    def chunk_by_paragraphs(self, text: str) -> List[str]:
        """Chunk by paragraphs, combining small ones."""
        paragraphs = text.split("\n\n")
        chunks = []
        current_chunk = ""

        for para in paragraphs:
            para = para.strip()
            if not para:
                continue

            # TODO: Implement paragraph combination logic
            # If adding this paragraph exceeds chunk_size, save current and start new
            if len(current_chunk) + len(para) > self.chunk_size:
                if current_chunk:
                    _______________
                current_chunk = para
            else:
                current_chunk = current_chunk + "\n\n" + para if current_chunk else para

        if current_chunk:
            chunks.append(current_chunk)

        return chunks

    def chunk_document(
        self,
        text: str,
        source: str,
        method: str = "characters"
    ) -> List[Chunk]:
        """Chunk a document and return Chunk objects with metadata."""
        if method == "characters":
            raw_chunks = self.chunk_by_characters(text)
        elif method == "paragraphs":
            raw_chunks = self.chunk_by_paragraphs(text)
        else:
            raise ValueError(f"Unknown method: {method}")

        return [
            Chunk(
                content=content,
                index=i,
                metadata={"source": source, "chunk_index": i, "total_chunks": len(raw_chunks)}
            )
            for i, content in enumerate(raw_chunks)
        ]


# Test chunking
test_document = """
Artificial Intelligence and Machine Learning

Artificial intelligence (AI) is a broad field of computer science focused on building smart machines capable of performing tasks that typically require human intelligence. Machine learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed.

The history of AI dates back to the 1950s when Alan Turing proposed the famous Turing Test as a measure of machine intelligence. Since then, the field has evolved through several phases, including symbolic AI, expert systems, and the current era of deep learning.

Deep Learning and Neural Networks

Deep learning is a subset of machine learning that uses artificial neural networks with multiple layers. These networks can learn hierarchical representations of data, making them particularly effective for tasks like image recognition, natural language processing, and speech recognition.

Convolutional Neural Networks (CNNs) are especially effective for image-related tasks, while Recurrent Neural Networks (RNNs) and Transformers excel at sequential data like text and time series.

Applications in Business

AI and machine learning have numerous business applications, including customer service automation, fraud detection, recommendation systems, and predictive maintenance. Companies across industries are leveraging these technologies to improve efficiency and gain competitive advantages.
"""

chunker = DocumentChunker(chunk_size=400, chunk_overlap=50)
chunks = chunker.chunk_document(test_document, "ai_overview.txt", method="paragraphs")

print(f"Created {len(chunks)} chunks:\n")
for chunk in chunks:
    print(f"Chunk {chunk.index}: {len(chunk.content)} chars")
    print(f"Preview: {chunk.content[:100]}...")
    print()
```

### Task 3.2: Build Complete Indexing Pipeline

```python
# indexing_pipeline.py
import hashlib
from typing import List
from pathlib import Path

class DocumentIndexer:
    """Index documents into vector database."""

    def __init__(self, collection, chunker: DocumentChunker):
        self.collection = collection
        self.chunker = chunker

    def generate_id(self, source: str, chunk_index: int) -> str:
        """Generate unique, deterministic ID."""
        content = f"{source}:{chunk_index}"
        return hashlib.md5(content.encode()).hexdigest()[:16]

    def index_text(
        self,
        text: str,
        source: str,
        extra_metadata: Dict = None
    ) -> int:
        """Index a text document."""
        chunks = self.chunker.chunk_document(text, source)

        documents = []
        ids = []
        metadatas = []

        for chunk in chunks:
            doc_id = self.generate_id(source, chunk.index)

            # Skip if already indexed
            existing = self.collection.get(ids=[doc_id])
            if existing['ids']:
                continue

            documents.append(chunk.content)
            ids.append(doc_id)

            metadata = chunk.metadata.copy()
            if extra_metadata:
                metadata.update(extra_metadata)
            metadatas.append(metadata)

        if documents:
            self.collection.add(
                documents=documents,
                ids=ids,
                metadatas=metadatas
            )

        return len(documents)

    def index_file(self, file_path: str, extra_metadata: Dict = None) -> int:
        """Index a text file."""
        path = Path(file_path)
        text = path.read_text(encoding='utf-8')

        metadata = {
            "filename": path.name,
            "file_type": path.suffix,
            **(extra_metadata or {})
        }

        return self.index_text(text, file_path, metadata)

    def index_directory(
        self,
        dir_path: str,
        extensions: List[str] = [".txt", ".md"],
        extra_metadata: Dict = None
    ) -> int:
        """Index all matching files in a directory."""
        total = 0
        for ext in extensions:
            for file_path in Path(dir_path).glob(f"**/*{ext}"):
                indexed = self.index_file(str(file_path), extra_metadata)
                total += indexed
                print(f"Indexed {file_path}: {indexed} chunks")

        return total


# Test the indexer
indexer = DocumentIndexer(collection, chunker)
indexed_count = indexer.index_text(
    test_document,
    "ai_overview.txt",
    {"category": "technology", "topic": "AI"}
)
print(f"Indexed {indexed_count} new chunks")
```

---

## Part 4: Advanced Search Features (35 minutes)

### Task 4.1: Implement Filtered Search

```python
# filtered_search.py

def search_with_filters(
    query: str,
    collection,
    n_results: int = 5,
    category: str = None,
    source: str = None,
    min_score: float = 0.5
):
    """Search with metadata filters."""

    # Build where clause
    where_filters = {}
    if category:
        where_filters["category"] = category
    if source:
        where_filters["source"] = source

    # TODO: Execute query with filters
    results = collection.query(
        query_texts=[query],
        n_results=n_results,
        where=where_filters if where_filters else None,
        include=["documents", "distances", "metadatas"]
    )

    # Filter by score and format results
    formatted_results = []
    for doc, distance, metadata in zip(
        results['documents'][0],
        results['distances'][0],
        results['metadatas'][0]
    ):
        similarity = 1 - distance
        if similarity >= min_score:
            formatted_results.append({
                "content": doc,
                "score": similarity,
                "metadata": metadata
            })

    return formatted_results


# Test filtered search
results = search_with_filters(
    "machine learning applications",
    collection,
    category="technology",
    min_score=0.6
)

for r in results:
    print(f"[{r['score']:.3f}] {r['content'][:80]}...")
```

### Task 4.2: Implement Hybrid Search

```python
# hybrid_search.py
import re
from collections import defaultdict

def keyword_score(query: str, document: str) -> float:
    """Calculate simple keyword match score."""
    query_words = set(query.lower().split())
    doc_words = set(re.findall(r'\w+', document.lower()))

    if not query_words:
        return 0.0

    matches = len(query_words & doc_words)
    return matches / len(query_words)


def hybrid_search(
    query: str,
    collection,
    n_results: int = 5,
    semantic_weight: float = 0.7
):
    """
    Combine semantic and keyword search.

    TODO: Implement reciprocal rank fusion
    """
    keyword_weight = 1 - semantic_weight

    # Get more results than needed for reranking
    semantic_results = collection.query(
        query_texts=[query],
        n_results=n_results * 2,
        include=["documents", "distances", "metadatas"]
    )

    # Calculate combined scores using RRF
    combined_scores = defaultdict(lambda: {"score": 0, "content": "", "metadata": {}})
    k = 60  # RRF constant

    # Add semantic scores
    for rank, (doc, distance, metadata) in enumerate(zip(
        semantic_results['documents'][0],
        semantic_results['distances'][0],
        semantic_results['metadatas'][0]
    )):
        doc_id = str(hash(doc))  # Simple ID for matching
        combined_scores[doc_id]["score"] += semantic_weight / (k + rank + 1)
        combined_scores[doc_id]["content"] = doc
        combined_scores[doc_id]["metadata"] = metadata

    # Add keyword scores
    all_docs = list(combined_scores.keys())
    keyword_ranked = sorted(
        all_docs,
        key=lambda d: keyword_score(query, combined_scores[d]["content"]),
        reverse=True
    )

    for rank, doc_id in enumerate(keyword_ranked):
        combined_scores[doc_id]["score"] += keyword_weight / (k + rank + 1)

    # Sort by combined score and return top results
    sorted_results = sorted(
        combined_scores.values(),
        key=lambda x: x["score"],
        reverse=True
    )[:n_results]

    return sorted_results


# Test hybrid search
results = hybrid_search(
    "Python programming language features",
    collection,
    semantic_weight=0.6
)

print("Hybrid Search Results:")
for r in results:
    print(f"[{r['score']:.4f}] {r['content'][:80]}...")
```

---

## Part 5: Build Complete Search System (35 minutes)

### Task 5.1: Production Search API

```python
# search_system.py
from dataclasses import dataclass
from typing import List, Optional, Dict
from enum import Enum

class SearchMode(Enum):
    SEMANTIC = "semantic"
    KEYWORD = "keyword"
    HYBRID = "hybrid"

@dataclass
class SearchRequest:
    query: str
    mode: SearchMode = SearchMode.HYBRID
    top_k: int = 5
    min_score: float = 0.5
    filters: Optional[Dict] = None

@dataclass
class SearchResult:
    content: str
    score: float
    source: str
    metadata: Dict

class SemanticSearchSystem:
    """Production-ready semantic search system."""

    def __init__(self, collection, default_mode: SearchMode = SearchMode.HYBRID):
        self.collection = collection
        self.default_mode = default_mode

    def search(self, request: SearchRequest) -> List[SearchResult]:
        """Execute search based on request parameters."""
        mode = request.mode or self.default_mode

        if mode == SearchMode.SEMANTIC:
            return self._semantic_search(request)
        elif mode == SearchMode.KEYWORD:
            return self._keyword_search(request)
        else:
            return self._hybrid_search(request)

    def _semantic_search(self, request: SearchRequest) -> List[SearchResult]:
        """Pure semantic search."""
        results = self.collection.query(
            query_texts=[request.query],
            n_results=request.top_k,
            where=request.filters,
            include=["documents", "distances", "metadatas"]
        )

        return self._format_results(results, request.min_score)

    def _keyword_search(self, request: SearchRequest) -> List[SearchResult]:
        """Keyword-based search."""
        # Get all documents (in production, use proper text search)
        all_docs = self.collection.get(include=["documents", "metadatas"])

        scored = []
        for doc, metadata in zip(all_docs['documents'], all_docs['metadatas']):
            score = keyword_score(request.query, doc)
            if score >= request.min_score:
                scored.append((doc, score, metadata))

        scored.sort(key=lambda x: x[1], reverse=True)

        return [
            SearchResult(
                content=doc,
                score=score,
                source=metadata.get('source', 'unknown'),
                metadata=metadata
            )
            for doc, score, metadata in scored[:request.top_k]
        ]

    def _hybrid_search(self, request: SearchRequest) -> List[SearchResult]:
        """Hybrid semantic + keyword search."""
        results = hybrid_search(
            request.query,
            self.collection,
            n_results=request.top_k,
            semantic_weight=0.7
        )

        return [
            SearchResult(
                content=r['content'],
                score=r['score'],
                source=r['metadata'].get('source', 'unknown'),
                metadata=r['metadata']
            )
            for r in results
            if r['score'] >= request.min_score
        ]

    def _format_results(self, raw_results, min_score: float) -> List[SearchResult]:
        """Format raw Chroma results."""
        results = []
        for doc, distance, metadata in zip(
            raw_results['documents'][0],
            raw_results['distances'][0],
            raw_results['metadatas'][0]
        ):
            score = 1 - distance
            if score >= min_score:
                results.append(SearchResult(
                    content=doc,
                    score=score,
                    source=metadata.get('source', 'unknown'),
                    metadata=metadata
                ))
        return results


# Test the complete system
search_system = SemanticSearchSystem(collection)

# Test different search modes
test_query = "containerization and deployment"

for mode in SearchMode:
    print(f"\n{'='*50}")
    print(f"Mode: {mode.value}")
    print('='*50)

    request = SearchRequest(
        query=test_query,
        mode=mode,
        top_k=3,
        min_score=0.4
    )

    results = search_system.search(request)
    for r in results:
        print(f"[{r.score:.3f}] {r.content[:60]}...")
```

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Embedding Understanding | 15 | Cosine similarity implemented, analysis complete |
| Vector DB Setup | 20 | Collection created, documents indexed correctly |
| Chunking | 20 | Both methods work, sentence boundaries respected |
| Filtered Search | 15 | Metadata filters working correctly |
| Hybrid Search | 15 | RRF implemented, combines both signals |
| Complete System | 15 | All modes work, production-ready code |
| **Total** | **100** | |

---

## Submission Checklist

- [ ] Cosine similarity calculation works
- [ ] Embedding visualization created
- [ ] Chroma collection with 10+ documents
- [ ] Both chunking methods implemented
- [ ] Filtered search returns correct results
- [ ] Hybrid search combines semantic + keyword
- [ ] Complete search system with all modes

---

*Exercise 4 of 12 | Building AI-Powered Applications | Duration: 3 hours*
