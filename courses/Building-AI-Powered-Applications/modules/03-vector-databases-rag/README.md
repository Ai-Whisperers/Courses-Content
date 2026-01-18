# Module 3: Vector Databases & RAG

## Learning Objectives

By the end of this module, you will be able to:

1. Understand vector embeddings and semantic similarity
2. Work with vector databases (Chroma, Pinecone, Qdrant)
3. Implement document chunking strategies
4. Build RAG (Retrieval-Augmented Generation) systems
5. Create document QA applications
6. Optimize retrieval performance
7. Apply production RAG patterns

---

## Prerequisites

- Modules 1-2 completed
- Understanding of LangChain basics
- Python 3.9+ environment
- OpenAI API key configured

**Estimated Time:** 8-10 hours

---

## 1. What is RAG?

### The Problem RAG Solves

**Challenge:** LLMs have limitations:
- **Training cutoff:** Knowledge ends at training date
- **No private data:** Can't access your documents
- **Hallucinations:** May generate plausible but incorrect information
- **Context limits:** Can't process millions of documents at once

**Example Problem:**
```python
# LLM doesn't know about your company's documents
response = llm("What is our refund policy?")
# Result: Hallucinated or generic answer, not your actual policy
```

### The RAG Solution

**RAG = Retrieval-Augmented Generation**

Instead of asking the LLM directly, we:
1. **Retrieve** relevant documents from a knowledge base
2. **Augment** the prompt with retrieved context
3. **Generate** response based on actual documents

```
User Question
     ↓
Retrieve Relevant Docs → Add to Prompt → LLM generates answer
     ↑
Vector Database
(Your Documents)
```

**Example with RAG:**
```python
# Step 1: Retrieve relevant docs about refund policy
relevant_docs = vector_db.search("refund policy")

# Step 2: Add to prompt
prompt = f"Based on these documents:\n{relevant_docs}\n\nAnswer: What is our refund policy?"

# Step 3: Generate answer
response = llm(prompt)
# Result: Accurate answer from your actual policy document
```

### Why RAG Matters

**Benefits:**
- ✅ **Fresh Information:** Access up-to-date documents
- ✅ **Private Data:** Work with confidential information
- ✅ **Accurate Answers:** Ground responses in real documents
- ✅ **Source Attribution:** Show where answers come from
- ✅ **Scalable:** Handle millions of documents efficiently

**Use Cases:**
- Customer support bots (company knowledge base)
- Legal document analysis
- Research assistants (academic papers)
- Code documentation Q&A
- Internal knowledge management
- Personalized recommendations

---

## 2. Vector Embeddings Explained

### What Are Embeddings?

**Embedding:** A numerical representation of text as a vector (list of numbers)

**Text → Numbers:**
```python
text = "The cat sat on the mat"
embedding = [0.02, -0.15, 0.43, 0.12, ..., 0.08]  # Typically 1536 dimensions
```

**Why?** Computers can't directly compare text meaning, but they can compare numbers.

### Semantic Similarity

Embeddings capture **meaning**, not just words:

```python
# Similar meanings = similar vectors
"dog" → [0.2, 0.5, 0.1, ...]
"puppy" → [0.21, 0.49, 0.11, ...]  # Close to "dog"
"car" → [-0.5, 0.1, 0.8, ...]      # Far from "dog"
```

**Example:**
```
Query: "How do I reset my password?"

Similar documents (by meaning):
✅ "Password reset instructions"
✅ "Resetting your account credentials"  
✅ "Forgot password guide"

NOT similar:
❌ "How to change your profile picture" (different topic)
❌ "Pasta recipes" (completely unrelated)
```

### How Embeddings Are Created

**Model-Based:** Use specialized models to convert text → vectors

```python
from langchain.embeddings import OpenAIEmbeddings

embeddings_model = OpenAIEmbeddings()

# Single text
vector = embeddings_model.embed_query("Hello world")
print(len(vector))  # 1536 dimensions (OpenAI default)

# Multiple texts
documents = ["Document 1", "Document 2", "Document 3"]
vectors = embeddings_model.embed_documents(documents)
print(len(vectors))  # 3 vectors, each 1536 dimensions
```

### Popular Embedding Models

| Model | Provider | Dimensions | Best For |
|-------|----------|------------|----------|
| text-embedding-ada-002 | OpenAI | 1536 | General purpose (recommended) |
| text-embedding-3-small | OpenAI | 1536 | Cost-effective |
| text-embedding-3-large | OpenAI | 3072 | Highest quality |
| all-MiniLM-L6-v2 | HuggingFace | 384 | Local/free, fast |
| instructor-xl | HuggingFace | 768 | Instruction-tuned |

**Choosing a Model:**
- **OpenAI:** Easy, high quality, requires API key
- **HuggingFace:** Free, run locally, slightly lower quality
- **Start with:** `text-embedding-ada-002` (good balance)

### Measuring Similarity

**Cosine Similarity:** How similar are two vectors?

```python
from numpy import dot
from numpy.linalg import norm

def cosine_similarity(vec1, vec2):
    return dot(vec1, vec2) / (norm(vec1) * norm(vec2))

# Values from -1 to 1
# 1.0 = identical
# 0.0 = unrelated
# -1.0 = opposite
```

**Example:**
```python
query_vector = embed("How do I cancel my subscription?")
doc1_vector = embed("Subscription cancellation guide")
doc2_vector = embed("How to make pasta")

similarity1 = cosine_similarity(query_vector, doc1_vector)  # 0.89 (high)
similarity2 = cosine_similarity(query_vector, doc2_vector)  # 0.12 (low)

# Retrieve doc1, ignore doc2
```

---

## 3. Vector Databases

### What Are Vector Databases?

**Vector Database:** Specialized database for storing and searching embeddings efficiently

**Traditional DB:**
```sql
SELECT * FROM documents WHERE title LIKE '%password%'
```

**Vector DB:**
```python
# Find documents semantically similar to query
results = vector_db.similarity_search("password reset", k=5)
```

**Key Difference:** Vector DBs use approximate nearest neighbor (ANN) search for fast similarity matching.

### Why Not Regular Databases?

**Challenges with Traditional DBs:**
- ❌ Can't efficiently search high-dimensional vectors
- ❌ No built-in similarity calculations
- ❌ Slow for large-scale vector operations
- ❌ Not optimized for nearest neighbor search

**Vector DB Benefits:**
- ✅ Fast similarity search (milliseconds, even with millions of vectors)
- ✅ Optimized for high-dimensional data
- ✅ Built-in similarity metrics
- ✅ Scalable to billions of vectors

### Popular Vector Databases

#### 3.1 Chroma (Recommended for Learning)

**Best for:** Development, prototyping, learning

**Pros:**
- ✅ Dead simple setup (no infrastructure)
- ✅ Runs locally or in-memory
- ✅ Great LangChain integration
- ✅ Free and open-source

**Cons:**
- ❌ Not for large production deployments
- ❌ Limited scaling capabilities

**Setup:**
```python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

# In-memory (simplest)
vectorstore = Chroma(embedding_function=OpenAIEmbeddings())

# Persistent storage
vectorstore = Chroma(
    persist_directory="./chroma_db",
    embedding_function=OpenAIEmbeddings()
)
```

#### 3.2 Pinecone

**Best for:** Production, large scale, managed service

**Pros:**
- ✅ Fully managed (no infrastructure management)
- ✅ Scales to billions of vectors
- ✅ Low-latency queries
- ✅ Great for production

**Cons:**
- ❌ Requires API key and account
- ❌ Paid service (free tier available)

**Setup:**
```python
import pinecone
from langchain.vectorstores import Pinecone

# Initialize Pinecone
pinecone.init(
    api_key="your-api-key",
    environment="your-environment"
)

# Create index
index = pinecone.Index("my-index")

# LangChain integration
vectorstore = Pinecone(index, OpenAIEmbeddings(), "text")
```

#### 3.3 Qdrant

**Best for:** Self-hosted production, on-premise deployments

**Pros:**
- ✅ Open-source
- ✅ Can run locally or cloud
- ✅ Rich filtering capabilities
- ✅ Good performance

**Cons:**
- ❌ More setup than Chroma
- ❌ Need to manage infrastructure (if self-hosted)

**Setup:**
```python
from langchain.vectorstores import Qdrant
from qdrant_client import QdrantClient

# Local
client = QdrantClient(path="./qdrant_db")

# LangChain integration
vectorstore = Qdrant(
    client=client,
    collection_name="my_collection",
    embeddings=OpenAIEmbeddings()
)
```

#### 3.4 FAISS

**Best for:** Research, experimentation, local development

**Pros:**
- ✅ Free, by Facebook AI
- ✅ Extremely fast
- ✅ No API keys needed

**Cons:**
- ❌ In-memory only (not persistent by default)
- ❌ Not a full database (just index)

**Setup:**
```python
from langchain.vectorstores import FAISS

vectorstore = FAISS.from_documents(
    documents,
    OpenAIEmbeddings()
)

# Save to disk
vectorstore.save_local("faiss_index")

# Load from disk
vectorstore = FAISS.load_local("faiss_index", OpenAIEmbeddings())
```

### Comparison Table

| Database | Setup Difficulty | Cost | Scale | Best For |
|----------|------------------|------|-------|----------|
| **Chroma** | Easy | Free | Small-Medium | Learning, prototypes |
| **Pinecone** | Easy | Paid | Massive | Production, SaaS |
| **Qdrant** | Medium | Free/Paid | Large | On-premise, control |
| **FAISS** | Easy | Free | Medium | Experiments, local |

**Recommendation:**
- **Learning this course:** Chroma (simplest)
- **Production app:** Pinecone (managed) or Qdrant (self-hosted)
- **Experimentation:** FAISS (fastest setup)

---

## 4. Document Loading & Processing

### The Document Lifecycle

```
Raw Documents → Load → Split → Embed → Store → Retrieve
```

### 4.1 Loading Documents

LangChain supports 100+ document loaders:

**Text Files:**
```python
from langchain.document_loaders import TextLoader

loader = TextLoader("document.txt")
documents = loader.load()
```

**PDFs:**
```python
from langchain.document_loaders import PyPDFLoader

loader = PyPDFLoader("document.pdf")
documents = loader.load()  # One doc per page
```

**Web Pages:**
```python
from langchain.document_loaders import WebBaseLoader

loader = WebBaseLoader("https://example.com")
documents = loader.load()
```

**Directories (multiple files):**
```python
from langchain.document_loaders import DirectoryLoader

loader = DirectoryLoader("./docs", glob="**/*.txt")
documents = loader.load()
```

**CSV/Excel:**
```python
from langchain.document_loaders import CSVLoader

loader = CSVLoader("data.csv")
documents = loader.load()
```

### 4.2 Document Structure

Documents have two main components:

```python
from langchain.schema import Document

doc = Document(
    page_content="The text content of the document",
    metadata={
        "source": "document.pdf",
        "page": 1,
        "author": "John Doe"
    }
)
```

**page_content:** The actual text  
**metadata:** Information about the document

---

## 5. Text Splitting Strategies

### Why Split Documents?

**Problem:** Documents are often too long for context windows

```python
# Entire book = 100,000 words
# LLM context = 8,000 tokens (~6,000 words)
# Solution: Split into chunks
```

**Goals:**
- ✅ Fit within context limits
- ✅ Keep related information together
- ✅ Enable precise retrieval

### 5.1 Character-Based Splitting

**Simple splitting by character count:**

```python
from langchain.text_splitter import CharacterTextSplitter

text_splitter = CharacterTextSplitter(
    chunk_size=1000,      # Characters per chunk
    chunk_overlap=200     # Overlap between chunks
)

chunks = text_splitter.split_documents(documents)
```

**chunk_overlap:** Prevents splitting mid-sentence/concept

```
Chunk 1: [Characters 0-1000]
Chunk 2: [Characters 800-1800]  (200 char overlap)
Chunk 3: [Characters 1600-2600]
```

**Pros:** Simple, predictable  
**Cons:** May split mid-sentence, no semantic awareness

### 5.2 Recursive Character Splitting (Recommended)

**Smart splitting that tries to preserve structure:**

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n\n", "\n", " ", ""]  # Try these in order
)

chunks = text_splitter.split_documents(documents)
```

**How it works:**
1. Try splitting on paragraphs (`\n\n`)
2. If chunks still too large, split on sentences (`\n`)
3. If still too large, split on words (` `)
4. Last resort: split on characters

**Pros:** Preserves document structure better  
**Cons:** Slightly more complex

### 5.3 Token-Based Splitting

**Split based on token count (more accurate for LLMs):**

```python
from langchain.text_splitter import TokenTextSplitter

text_splitter = TokenTextSplitter(
    chunk_size=400,    # Tokens, not characters
    chunk_overlap=50
)

chunks = text_splitter.split_documents(documents)
```

**Why?** LLMs count in tokens, not characters  
**1 token ≈ 4 characters** (approximate)

### 5.4 Specialized Splitters

**Code:**
```python
from langchain.text_splitter import (
    PythonCodeTextSplitter,
    Language
)

python_splitter = PythonCodeTextSplitter(
    chunk_size=1000,
    chunk_overlap=100
)

# Splits on function/class boundaries
chunks = python_splitter.split_text(code)
```

**Markdown:**
```python
from langchain.text_splitter import MarkdownTextSplitter

md_splitter = MarkdownTextSplitter(
    chunk_size=1000,
    chunk_overlap=100
)

# Splits on headers
chunks = md_splitter.split_documents(documents)
```

### Choosing Chunk Size

**Guidelines:**

| Chunk Size | Use Case | Trade-offs |
|------------|----------|------------|
| 200-500 | Precise retrieval, Q&A | May lose context |
| 500-1000 | Balanced (recommended) | Good for most cases |
| 1000-2000 | Maintain context | Less precise retrieval |

**Factors:**
- Document type (technical docs = larger chunks)
- Query complexity (complex = more context needed)
- Context window size (GPT-4 = can handle more)

### Chunk Overlap

**Why overlap?**
```
"...end of important concept"  | Chunk 1
                               | <-- Split here
"beginning of important..."    | Chunk 2
```

Without overlap: concept split across chunks  
With overlap: both chunks have complete concept

**Recommended:** 10-20% of chunk size

---

## 6. Building a RAG System

### Complete RAG Pipeline

```python
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

# 1. Load documents
from langchain.document_loaders import TextLoader
loader = TextLoader("knowledge_base.txt")
documents = loader.load()

# 2. Split documents
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = text_splitter.split_documents(documents)

# 3. Create embeddings and store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)

# 4. Create retriever
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 4}  # Return top 4 chunks
)

# 5. Create QA chain
llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",  # How to combine docs
    retriever=retriever,
    return_source_documents=True  # Include sources
)

# 6. Ask questions
result = qa_chain({"query": "What is the refund policy?"})
print(result["result"])
print(f"\nSources: {result['source_documents']}")
```

### Understanding Chain Types

**"stuff"** (Recommended for most cases):
```python
# Stuff all retrieved documents into prompt
chain_type="stuff"
```
- Simplest approach
- All context in one prompt
- Limited by context window

**"map_reduce":**
```python
chain_type="map_reduce"
```
- Process each document separately
- Combine results
- Good for very long documents

**"refine":**
```python
chain_type="refine"
```
- Iteratively refine answer
- Process docs sequentially
- Best for comprehensive answers

**"map_rerank":**
```python
chain_type="map_rerank"
```
- Generate answer for each doc
- Rank and select best
- Good for confidence scoring

---

## 7. Retrieval Strategies

### 7.1 Similarity Search

**Default:** Return most similar documents

```python
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 4}
)

results = retriever.get_relevant_documents("password reset")
```

### 7.2 Max Marginal Relevance (MMR)

**Goal:** Diverse results (avoid redundant documents)

```python
retriever = vectorstore.as_retriever(
    search_type="mmr",
    search_kwargs={
        "k": 4,
        "fetch_k": 20,      # Fetch 20, return diverse 4
        "lambda_mult": 0.5  # Diversity (0=max diversity, 1=max relevance)
    }
)
```

**Use case:** When documents might be repetitive

### 7.3 Similarity with Score Threshold

**Filter by minimum similarity:**

```python
retriever = vectorstore.as_retriever(
    search_type="similarity_score_threshold",
    search_kwargs={
        "score_threshold": 0.8,  # Only return if > 0.8 similarity
        "k": 4
    }
)
```

**Use case:** Ensure high-quality matches only

### 7.4 Custom Retriever

**Add your own logic:**

```python
from langchain.schema import BaseRetriever, Document

class CustomRetriever(BaseRetriever):
    def get_relevant_documents(self, query: str):
        # Your custom retrieval logic
        results = self.custom_search(query)
        return [Document(page_content=r) for r in results]
```

---

## 8. Metadata Filtering

### Why Filter?

**Scenario:** Search only within specific categories

```python
# Store documents with metadata
docs = [
    Document(
        page_content="Python tutorial",
        metadata={"category": "programming", "level": "beginner"}
    ),
    Document(
        page_content="JavaScript guide",
        metadata={"category": "programming", "level": "intermediate"}
    )
]

vectorstore = Chroma.from_documents(docs, embeddings)

# Search with filter
retriever = vectorstore.as_retriever(
    search_kwargs={
        "k": 3,
        "filter": {"category": "programming", "level": "beginner"}
    }
)

results = retriever.get_relevant_documents("learn programming")
# Only returns beginner programming docs
```

### Complex Filters

```python
# Qdrant example
from qdrant_client.models import Filter, FieldCondition, MatchValue

filter = Filter(
    must=[
        FieldCondition(
            key="category",
            match=MatchValue(value="programming")
        ),
        FieldCondition(
            key="year",
            range={"gte": 2020}  # Year >= 2020
        )
    ]
)

results = vectorstore.similarity_search(
    "Python tutorials",
    k=5,
    filter=filter
)
```

---

## 9. Advanced RAG Patterns

### 9.1 Conversational RAG

**Add conversation memory to RAG:**

```python
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

qa_chain = ConversationalRetrievalChain.from_llm(
    llm=ChatOpenAI(),
    retriever=retriever,
    memory=memory
)

# Multi-turn conversation
qa_chain({"question": "What is the refund policy?"})
qa_chain({"question": "How long does it take?"})  # "it" refers to refund
```

### 9.2 Self-Querying

**LLM generates metadata filters from natural language:**

```python
from langchain.chains.query_constructor.base import AttributeInfo
from langchain.retrievers.self_query.base import SelfQueryRetriever

metadata_info = [
    AttributeInfo(
        name="category",
        description="The document category",
        type="string"
    ),
    AttributeInfo(
        name="year",
        description="The year the document was written",
        type="integer"
    )
]

retriever = SelfQueryRetriever.from_llm(
    llm=ChatOpenAI(),
    vectorstore=vectorstore,
    document_contents="Programming tutorials",
    metadata_field_info=metadata_info
)

# Natural language query with implicit filter
results = retriever.get_relevant_documents(
    "Show me beginner Python tutorials from after 2020"
)
# Automatically creates: filter = {category="python", level="beginner", year > 2020}
```

### 9.3 Multi-Query Retrieval

**Generate multiple query variations for better recall:**

```python
from langchain.retrievers.multi_query import MultiQueryRetriever

retriever = MultiQueryRetriever.from_llm(
    retriever=vectorstore.as_retriever(),
    llm=ChatOpenAI()
)

# Original query: "password reset"
# LLM generates variations:
#   - "how to reset password"
#   - "forgot password recovery"
#   - "password change instructions"
# Retrieves docs for all variations, returns union
```

### 9.4 Contextual Compression

**Compress retrieved documents to only relevant parts:**

```python
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor

compressor = LLMChainExtractor.from_llm(ChatOpenAI())

compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=retriever
)

# Returns only relevant excerpts, not full documents
results = compression_retriever.get_relevant_documents(
    "What is the refund timeline?"
)
```

### 9.5 Parent Document Retriever

**Search small chunks, return full parent documents:**

```python
from langchain.retrievers import ParentDocumentRetriever
from langchain.storage import InMemoryStore

# Split into small chunks for search
child_splitter = RecursiveCharacterTextSplitter(chunk_size=400)

# Store full docs
parent_splitter = RecursiveCharacterTextSplitter(chunk_size=2000)

store = InMemoryStore()

retriever = ParentDocumentRetriever(
    vectorstore=vectorstore,
    docstore=store,
    child_splitter=child_splitter,
    parent_splitter=parent_splitter
)

# Searches small chunks, returns large parent context
```

---

## 10. Prompt Engineering for RAG

### Basic RAG Prompt

```python
from langchain.prompts import PromptTemplate

template = """
Use the following context to answer the question.
If you don't know the answer, say so. Don't make up information.

Context:
{context}

Question: {question}

Answer:
"""

prompt = PromptTemplate(
    input_variables=["context", "question"],
    template=template
)
```

### Custom RAG Chain with Prompt

```python
from langchain.chains import RetrievalQA

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type_kwargs={"prompt": prompt}
)
```

### Advanced Prompt with Instructions

```python
template = """
You are a helpful assistant answering questions based on provided documents.

Instructions:
- Use ONLY information from the context below
- If the answer isn't in the context, say "I don't have enough information"
- Cite specific parts of the context when answering
- Be concise but complete

Context:
{context}

Question: {question}

Helpful Answer:
"""
```

---

## 11. Evaluation & Optimization

### Measuring RAG Performance

**Retrieval Metrics:**
- **Precision:** Are retrieved docs relevant?
- **Recall:** Did we retrieve all relevant docs?
- **MRR (Mean Reciprocal Rank):** Position of first relevant doc

**Generation Metrics:**
- **Accuracy:** Is the answer correct?
- **Faithfulness:** Does answer match retrieved docs?
- **Relevance:** Does answer address the question?

### Testing Retrieval

```python
# Test queries
test_queries = [
    "How do I reset my password?",
    "What is the refund policy?",
    "How do I cancel my subscription?"
]

for query in test_queries:
    results = retriever.get_relevant_documents(query)
    print(f"\nQuery: {query}")
    for i, doc in enumerate(results):
        print(f"  {i+1}. {doc.page_content[:100]}...")
```

### Optimization Strategies

**1. Tune chunk size:**
```python
# Experiment with different sizes
for chunk_size in [500, 1000, 1500]:
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size)
    # Test retrieval quality
```

**2. Adjust retrieval count (k):**
```python
# More docs = more context, but also more noise
for k in [2, 4, 6, 8]:
    retriever = vectorstore.as_retriever(search_kwargs={"k": k})
    # Measure quality vs. cost
```

**3. Use better embeddings:**
```python
# OpenAI text-embedding-3-large (better quality)
embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
```

**4. Improve document quality:**
- Clean up formatting
- Remove boilerplate
- Add rich metadata
- Pre-process text

---

## Summary

In this module, you learned:

- **Vector Embeddings:** Converting text to numerical representations
- **Semantic Similarity:** Finding meaning-based matches
- **Vector Databases:** Chroma, Pinecone, Qdrant, FAISS
- **Document Processing:** Loading, splitting, and chunking strategies
- **RAG Systems:** Complete retrieval-augmented generation pipelines
- **Retrieval Strategies:** Similarity, MMR, filtering
- **Advanced Patterns:** Conversational RAG, self-querying, compression
- **Optimization:** Evaluation and performance tuning

**Key Takeaways:**
1. RAG grounds LLM responses in actual documents
2. Embeddings enable semantic search
3. Chunking strategy significantly impacts quality
4. Vector databases make similarity search efficient
5. Multiple retrieval strategies for different use cases
6. Always evaluate and optimize based on your use case

**Next Module:** AI Agents & Tools - Building autonomous AI systems

---

## Additional Resources

**Official Documentation:**
- [LangChain Vector Stores](https://python.langchain.com/docs/modules/data_connection/vectorstores/)
- [LangChain Retrievers](https://python.langchain.com/docs/modules/data_connection/retrievers/)
- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)

**Vector Databases:**
- [Chroma Documentation](https://docs.trychroma.com/)
- [Pinecone Documentation](https://docs.pinecone.io/)
- [Qdrant Documentation](https://qdrant.tech/documentation/)

**RAG Resources:**
- [RAG Paper (Original)](https://arxiv.org/abs/2005.11401)
- [Advanced RAG Techniques](https://blog.langchain.dev/deconstructing-rag/)

---

*Module 3 of 6 | Building AI-Powered Applications | Duration: 8-10 hours*
