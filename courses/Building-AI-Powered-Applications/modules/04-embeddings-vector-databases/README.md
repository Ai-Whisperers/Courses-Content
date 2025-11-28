# Module 4: Embeddings & Vector Databases

## Learning Objectives

By the end of this module, you will be able to:

1. Understand how embeddings represent semantic meaning
2. Generate embeddings using OpenAI and open-source models
3. Choose and set up appropriate vector databases
4. Implement efficient similarity search
5. Build a complete semantic search system

---

## Introduction

Embeddings transform text into numerical vectors that capture semantic meaning. Similar concepts cluster together in vector space, enabling powerful semantic search that understands meaning, not just keywords. This is the foundation of RAG systems and modern AI search.

---

## 1. Understanding Embeddings

### What Are Embeddings?

Embeddings are dense vector representations of text where:
- Each text becomes a list of numbers (typically 256-3072 dimensions)
- Semantically similar texts have similar vectors
- Distance between vectors indicates semantic similarity

```
"happy dog"      → [0.23, -0.12, 0.87, ..., 0.45]  (1536 dims)
"joyful puppy"   → [0.25, -0.10, 0.85, ..., 0.47]  (similar vectors!)
"quantum physics"→ [-0.55, 0.72, -0.33, ..., 0.11] (very different)
```

### How Similarity Works

**Cosine Similarity**: Measures angle between vectors (most common)
```
similarity = (A · B) / (||A|| × ||B||)
Range: -1 (opposite) to 1 (identical)
```

**Euclidean Distance**: Measures straight-line distance
```
distance = √(Σ(ai - bi)²)
Lower = more similar
```

### Visual Intuition

```
                    Vector Space (2D simplified)

        "cat"
          •
                "kitten"
                  •
                        "puppy"      "dog"
                          •            •

                                            "quantum"
                                               •


        "automobile"
              •
                "car"
                  •
                        "truck"
                          •
```

---

## 2. Generating Embeddings

### OpenAI Embeddings

```python
from openai import OpenAI

client = OpenAI()

def get_embedding(text: str, model: str = "text-embedding-3-small") -> list[float]:
    """Get embedding for a single text."""
    response = client.embeddings.create(
        model=model,
        input=text
    )
    return response.data[0].embedding


def get_embeddings_batch(texts: list[str], model: str = "text-embedding-3-small") -> list[list[float]]:
    """Get embeddings for multiple texts efficiently."""
    response = client.embeddings.create(
        model=model,
        input=texts
    )
    return [item.embedding for item in response.data]


# Usage
embedding = get_embedding("Hello, world!")
print(f"Dimensions: {len(embedding)}")  # 1536 for text-embedding-3-small
```

### OpenAI Embedding Models

| Model | Dimensions | Price (per 1M tokens) | Best For |
|-------|------------|----------------------|----------|
| text-embedding-3-small | 1536 | $0.02 | Most use cases |
| text-embedding-3-large | 3072 | $0.13 | Highest quality |
| text-embedding-ada-002 | 1536 | $0.10 | Legacy |

### Dimension Reduction

OpenAI's v3 models support dimension shortening:

```python
response = client.embeddings.create(
    model="text-embedding-3-large",
    input="Hello world",
    dimensions=256  # Reduce from 3072 to 256
)
# Smaller vectors, faster search, slight quality tradeoff
```

### Open-Source Alternatives

**Sentence Transformers (Local)**
```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')  # 384 dimensions

embeddings = model.encode([
    "Hello world",
    "Hi there"
])
print(embeddings.shape)  # (2, 384)
```

**Popular Open-Source Models:**

| Model | Dimensions | Quality | Speed |
|-------|------------|---------|-------|
| all-MiniLM-L6-v2 | 384 | Good | Very Fast |
| all-mpnet-base-v2 | 768 | Better | Fast |
| bge-large-en-v1.5 | 1024 | Excellent | Medium |
| e5-large-v2 | 1024 | Excellent | Medium |

---

## 3. Vector Database Options

### Comparison Matrix

| Database | Hosting | Scalability | Cost | Best For |
|----------|---------|-------------|------|----------|
| **Pinecone** | Managed | Excellent | Pay per use | Production, scale |
| **Weaviate** | Both | Good | Self-host or managed | Flexibility |
| **Chroma** | Self-host | Limited | Free | Local dev, prototyping |
| **pgvector** | Self-host | Good | Free | Existing Postgres |
| **Qdrant** | Both | Excellent | Free or managed | High performance |

### Pinecone Setup

```python
from pinecone import Pinecone

pc = Pinecone(api_key="your-api-key")

# Create index
pc.create_index(
    name="my-index",
    dimension=1536,
    metric="cosine",
    spec={"serverless": {"cloud": "aws", "region": "us-east-1"}}
)

# Connect to index
index = pc.Index("my-index")

# Upsert vectors
index.upsert(vectors=[
    {
        "id": "doc1",
        "values": [0.1, 0.2, ...],  # 1536 dims
        "metadata": {"source": "article", "title": "..."}
    }
])

# Query
results = index.query(
    vector=[0.1, 0.2, ...],  # Query vector
    top_k=5,
    include_metadata=True
)
```

### Chroma Setup (Local Development)

```python
import chromadb

# Create persistent client
client = chromadb.PersistentClient(path="./chroma_db")

# Create collection with embedding function
collection = client.create_collection(
    name="my_docs",
    metadata={"hnsw:space": "cosine"}
)

# Add documents (automatically embeds if function provided)
collection.add(
    documents=["Document 1 text", "Document 2 text"],
    ids=["doc1", "doc2"],
    metadatas=[{"source": "file1"}, {"source": "file2"}]
)

# Query
results = collection.query(
    query_texts=["search query"],
    n_results=5
)
```

### pgvector (PostgreSQL)

```sql
-- Enable extension
CREATE EXTENSION vector;

-- Create table with vector column
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    embedding vector(1536),  -- Match your model's dimensions
    metadata JSONB
);

-- Create index for fast similarity search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Insert
INSERT INTO documents (content, embedding, metadata)
VALUES ('Document text', '[0.1, 0.2, ...]', '{"source": "file1"}');

-- Query (cosine similarity)
SELECT content, 1 - (embedding <=> '[0.1, 0.2, ...]'::vector) as similarity
FROM documents
ORDER BY embedding <=> '[0.1, 0.2, ...]'::vector
LIMIT 5;
```

---

## 4. Implementing Similarity Search

### Complete Search Pipeline

```python
from dataclasses import dataclass
from typing import List, Optional
import numpy as np
from openai import OpenAI

@dataclass
class SearchResult:
    id: str
    content: str
    score: float
    metadata: dict

class SemanticSearch:
    """Production semantic search implementation."""

    def __init__(
        self,
        index,  # Your vector DB index
        embedding_model: str = "text-embedding-3-small",
        score_threshold: float = 0.7
    ):
        self.index = index
        self.embedding_model = embedding_model
        self.score_threshold = score_threshold
        self.client = OpenAI()

    def embed(self, text: str) -> List[float]:
        """Generate embedding for text."""
        response = self.client.embeddings.create(
            model=self.embedding_model,
            input=text
        )
        return response.data[0].embedding

    def search(
        self,
        query: str,
        top_k: int = 5,
        filter_metadata: Optional[dict] = None,
        min_score: Optional[float] = None
    ) -> List[SearchResult]:
        """
        Search for similar documents.

        Args:
            query: Search query text
            top_k: Maximum results to return
            filter_metadata: Metadata filters (database-specific)
            min_score: Minimum similarity score (overrides default)

        Returns:
            List of SearchResult objects
        """
        # Generate query embedding
        query_embedding = self.embed(query)

        # Query vector database
        results = self.index.query(
            vector=query_embedding,
            top_k=top_k,
            include_metadata=True,
            filter=filter_metadata
        )

        # Convert to SearchResult objects
        threshold = min_score or self.score_threshold
        search_results = []

        for match in results.matches:
            if match.score >= threshold:
                search_results.append(SearchResult(
                    id=match.id,
                    content=match.metadata.get("content", ""),
                    score=match.score,
                    metadata=match.metadata
                ))

        return search_results

    def hybrid_search(
        self,
        query: str,
        top_k: int = 5,
        keyword_weight: float = 0.3
    ) -> List[SearchResult]:
        """
        Combine semantic and keyword search.

        Hybrid search improves results for specific terms, names, and codes.
        """
        # Semantic search
        semantic_results = self.search(query, top_k=top_k * 2)

        # Keyword search (implementation depends on your DB)
        keyword_results = self._keyword_search(query, top_k=top_k * 2)

        # Combine with reciprocal rank fusion
        return self._reciprocal_rank_fusion(
            [semantic_results, keyword_results],
            weights=[1 - keyword_weight, keyword_weight],
            top_k=top_k
        )

    def _keyword_search(self, query: str, top_k: int) -> List[SearchResult]:
        """Implement keyword search for your database."""
        # Database-specific implementation
        pass

    def _reciprocal_rank_fusion(
        self,
        result_lists: List[List[SearchResult]],
        weights: List[float],
        top_k: int,
        k: int = 60  # RRF constant
    ) -> List[SearchResult]:
        """Combine multiple result lists using RRF."""
        scores = {}

        for results, weight in zip(result_lists, weights):
            for rank, result in enumerate(results):
                if result.id not in scores:
                    scores[result.id] = {"result": result, "score": 0}
                scores[result.id]["score"] += weight / (k + rank + 1)

        sorted_results = sorted(
            scores.values(),
            key=lambda x: x["score"],
            reverse=True
        )

        return [item["result"] for item in sorted_results[:top_k]]
```

### Search Quality Optimization

**Chunking Strategies:**

| Strategy | Best For | Chunk Size |
|----------|----------|------------|
| Fixed size | Simple documents | 500-1000 tokens |
| Paragraph | Well-structured text | Natural breaks |
| Semantic | Mixed content | ML-based splitting |
| Recursive | Hierarchical docs | Parent-child |

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,  # Overlap for context continuity
    separators=["\n\n", "\n", ". ", " ", ""]
)

chunks = splitter.split_text(long_document)
```

---

## 5. Building a Semantic Search System

### Complete Implementation

```python
# semantic_search_system.py
from typing import List, Dict, Optional
import hashlib
from dataclasses import dataclass
from pinecone import Pinecone
from openai import OpenAI

@dataclass
class Document:
    content: str
    source: str
    metadata: Dict = None

class SemanticSearchSystem:
    """Complete semantic search system."""

    def __init__(
        self,
        pinecone_api_key: str,
        index_name: str,
        openai_api_key: str = None
    ):
        self.pc = Pinecone(api_key=pinecone_api_key)
        self.index = self.pc.Index(index_name)
        self.openai = OpenAI(api_key=openai_api_key)
        self.model = "text-embedding-3-small"
        self.chunk_size = 500
        self.chunk_overlap = 50

    def index_documents(self, documents: List[Document], batch_size: int = 100):
        """Index documents into vector database."""
        vectors_to_upsert = []

        for doc in documents:
            # Chunk the document
            chunks = self._chunk_text(doc.content)

            for i, chunk in enumerate(chunks):
                # Generate unique ID
                chunk_id = self._generate_id(doc.source, i)

                # Get embedding
                embedding = self._get_embedding(chunk)

                # Prepare metadata
                metadata = {
                    "content": chunk,
                    "source": doc.source,
                    "chunk_index": i,
                    **(doc.metadata or {})
                }

                vectors_to_upsert.append({
                    "id": chunk_id,
                    "values": embedding,
                    "metadata": metadata
                })

                # Batch upsert
                if len(vectors_to_upsert) >= batch_size:
                    self.index.upsert(vectors=vectors_to_upsert)
                    vectors_to_upsert = []

        # Upsert remaining
        if vectors_to_upsert:
            self.index.upsert(vectors=vectors_to_upsert)

    def search(
        self,
        query: str,
        top_k: int = 5,
        filter_dict: Optional[Dict] = None,
        min_score: float = 0.7
    ) -> List[Dict]:
        """Search for relevant documents."""
        query_embedding = self._get_embedding(query)

        results = self.index.query(
            vector=query_embedding,
            top_k=top_k,
            include_metadata=True,
            filter=filter_dict
        )

        return [
            {
                "content": match.metadata.get("content"),
                "source": match.metadata.get("source"),
                "score": match.score,
                "metadata": match.metadata
            }
            for match in results.matches
            if match.score >= min_score
        ]

    def _chunk_text(self, text: str) -> List[str]:
        """Split text into chunks."""
        words = text.split()
        chunks = []
        current_chunk = []
        current_length = 0

        for word in words:
            word_length = len(word) + 1
            if current_length + word_length > self.chunk_size:
                chunks.append(" ".join(current_chunk))
                # Keep overlap
                overlap_words = current_chunk[-10:]  # Rough overlap
                current_chunk = overlap_words + [word]
                current_length = sum(len(w) + 1 for w in current_chunk)
            else:
                current_chunk.append(word)
                current_length += word_length

        if current_chunk:
            chunks.append(" ".join(current_chunk))

        return chunks

    def _get_embedding(self, text: str) -> List[float]:
        """Get embedding for text."""
        response = self.openai.embeddings.create(
            model=self.model,
            input=text
        )
        return response.data[0].embedding

    def _generate_id(self, source: str, chunk_index: int) -> str:
        """Generate unique ID for chunk."""
        content = f"{source}_{chunk_index}"
        return hashlib.md5(content.encode()).hexdigest()


# Usage example
if __name__ == "__main__":
    system = SemanticSearchSystem(
        pinecone_api_key="your-key",
        index_name="my-docs"
    )

    # Index documents
    documents = [
        Document(
            content="Long document text here...",
            source="doc1.pdf",
            metadata={"category": "technical"}
        )
    ]
    system.index_documents(documents)

    # Search
    results = system.search(
        "How do embeddings work?",
        top_k=5,
        filter_dict={"category": {"$eq": "technical"}}
    )

    for r in results:
        print(f"[{r['score']:.3f}] {r['content'][:100]}...")
```

---

## Key Takeaways

1. **Embeddings capture meaning** - Similar concepts have similar vectors
2. **Choose the right model** - Balance cost, quality, and dimension size
3. **Vector DBs vary** - Managed (Pinecone) for production, local (Chroma) for development
4. **Chunking matters** - Document splitting significantly affects retrieval quality
5. **Hybrid search wins** - Combining semantic and keyword search improves results

---

## Knowledge Check

Before moving on, ensure you can:

1. Explain what embeddings are and how similarity is calculated
2. Generate embeddings using OpenAI's API
3. Set up and query a vector database
4. Implement proper chunking for documents
5. Build a complete semantic search pipeline

---

## Next Module Preview

In **Module 5: RAG Implementation**, you'll combine embeddings with LLMs to build retrieval-augmented generation systems that answer questions from your documents.

---

*Module 4 of 12 | Building AI-Powered Applications | Duration: 5 hours*
