# Module 3: Vector Databases & RAG - Hands-On Exercise

## Overview

**Duration:** 150 minutes  
**Difficulty:** Intermediate to Advanced  
**Prerequisites:** Modules 1-2 completed, OpenAI API key configured

In this exercise, you'll build a complete **Document Q&A System** using vector databases and RAG. You'll implement:
- Vector embeddings and similarity search
- Document loading and chunking
- Vector database integration (Chroma)
- Complete RAG pipeline
- Interactive question-answering application

By the end, you'll have a production-ready system that can answer questions about your documents.

---

## Learning Objectives

By completing this exercise, you will:

✅ Generate and work with vector embeddings  
✅ Measure semantic similarity  
✅ Set up and use a vector database  
✅ Implement document chunking strategies  
✅ Build a complete RAG system  
✅ Create an interactive Q&A application

---

## Setup

### 1. Environment Preparation

```bash
# Create project directory
mkdir document-qa-system
cd document-qa-system

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install langchain openai chromadb tiktoken python-dotenv pypdf
```

### 2. Project Structure

```
document-qa-system/
├── .env                    # API keys
├── app.py                  # Main application
├── requirements.txt        # Dependencies
├── documents/              # Your knowledge base
│   ├── doc1.txt
│   ├── doc2.pdf
│   └── ...
├── chroma_db/              # Vector database (auto-created)
└── README.md              # Documentation
```

### 3. Configure Environment

Create `.env`:
```
OPENAI_API_KEY=your-api-key-here
```

Create `.gitignore`:
```
.env
venv/
__pycache__/
*.pyc
chroma_db/
```

---

## Part 1: Embeddings and Similarity (35 minutes)

### Goal
Understand vector embeddings by implementing similarity search from scratch.

### Requirements

**1.1 Generate Embeddings**

Create a script that:
- Takes a list of text strings
- Generates embeddings for each using OpenAI
- Prints embedding dimensions and first 5 values

**Expected behavior:**
```python
texts = [
    "The cat sat on the mat",
    "A dog played in the park",
    "Machine learning is fascinating"
]

embeddings = generate_embeddings(texts)
# Output:
# Text 1: 1536 dimensions, [0.02, -0.15, 0.43, 0.12, -0.08, ...]
# Text 2: 1536 dimensions, [0.03, -0.14, 0.41, 0.13, -0.07, ...]
# ...
```

**1.2 Implement Similarity Search**

Build a function that:
- Accepts a query and a list of documents
- Generates embeddings for query and documents
- Calculates cosine similarity
- Returns top N most similar documents

**Expected behavior:**
```python
documents = [
    "How to reset your password",
    "Guide to account security",
    "Chocolate cake recipe",
    "Password recovery steps"
]

results = find_similar(
    query="I forgot my password",
    documents=documents,
    top_k=2
)

# Output:
# 1. "How to reset your password" (similarity: 0.87)
# 2. "Password recovery steps" (similarity: 0.82)
```

**1.3 Experiment with Queries**

Test your similarity search with:
- Related queries (should match well)
- Unrelated queries (should match poorly)
- Synonyms and paraphrases

Document observations about what works well and what doesn't.

### Implementation Hints

```python
from langchain.embeddings import OpenAIEmbeddings
import numpy as np

# Initialize embeddings model
embeddings_model = OpenAIEmbeddings()

# Generate embedding for single text
vector = embeddings_model.embed_query("Hello world")

# Generate embeddings for multiple texts
vectors = embeddings_model.embed_documents(["Text 1", "Text 2"])

# Cosine similarity
def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))
```

### Testing

Test with at least 3 different query-document combinations:
1. High similarity (related content)
2. Low similarity (unrelated content)
3. Medium similarity (somewhat related)

**Deliverable:** `part1_embeddings.py` with embedding generation and similarity search

---

## Part 2: Vector Database Setup (30 minutes)

### Goal
Set up a vector database and perform basic operations.

### Requirements

**2.1 Create and Populate Vector Store**

Build a script that:
- Creates a Chroma vector store
- Loads sample documents
- Stores documents with embeddings
- Persists to disk

**Expected behavior:**
```python
# Sample documents about your company/topic
documents = [
    "Our refund policy allows returns within 30 days...",
    "To reset your password, click the 'Forgot Password' link...",
    "Our customer support is available 24/7...",
    # ... more documents
]

vectorstore = create_vectorstore(documents)
print(f"Stored {len(documents)} documents in vector database")
```

**2.2 Perform Similarity Search**

Implement search functionality:
- Query the vector store
- Return top K similar documents
- Include similarity scores
- Show document metadata

**Expected behavior:**
```python
results = vectorstore.similarity_search_with_score(
    "How do I get a refund?",
    k=3
)

for doc, score in results:
    print(f"Score: {score:.2f}")
    print(f"Content: {doc.page_content}")
    print(f"Metadata: {doc.metadata}\n")
```

**2.3 Add and Search with Metadata**

Extend your vector store to:
- Add metadata to documents (category, source, date)
- Perform filtered searches
- Search within specific categories only

**Expected behavior:**
```python
# Add documents with metadata
docs = [
    Document(
        page_content="Python tutorial",
        metadata={"category": "programming", "difficulty": "beginner"}
    ),
    Document(
        page_content="JavaScript guide",
        metadata={"category": "programming", "difficulty": "advanced"}
    )
]

vectorstore.add_documents(docs)

# Search with filter
results = vectorstore.similarity_search(
    "learn programming",
    k=5,
    filter={"difficulty": "beginner"}
)
```

### Implementation Hints

```python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.schema import Document

# Create vector store
embeddings = OpenAIEmbeddings()

# In-memory
vectorstore = Chroma(embedding_function=embeddings)

# Persistent
vectorstore = Chroma(
    persist_directory="./chroma_db",
    embedding_function=embeddings
)

# Add documents
vectorstore.add_texts(
    texts=["Document 1", "Document 2"],
    metadatas=[{"source": "doc1"}, {"source": "doc2"}]
)

# Or add Document objects
docs = [Document(page_content="Text", metadata={"key": "value"})]
vectorstore.add_documents(docs)
```

### Testing

Verify:
1. Documents are stored successfully
2. Search returns relevant results
3. Metadata filtering works
4. Persistence (restart script, data still there)

**Deliverable:** `part2_vectorstore.py` with vector store setup and operations

---

## Part 3: Build RAG System (40 minutes)

### Goal
Create a complete RAG pipeline that answers questions using retrieved documents.

### Requirements

**3.1 Document Loading and Chunking**

Implement document processing:
- Load multiple documents from a directory
- Split documents into chunks (1000 chars, 200 overlap)
- Preserve metadata (filename, page number)
- Show chunk statistics

**Expected behavior:**
```python
# Load all .txt files from documents/ folder
documents = load_documents("./documents")
print(f"Loaded {len(documents)} documents")

# Split into chunks
chunks = split_documents(documents, chunk_size=1000, overlap=200)
print(f"Created {len(chunks)} chunks")
print(f"Average chunk size: {average_length(chunks)} characters")
```

**3.2 Create RAG Chain**

Build a complete RAG system:
- Load and chunk documents
- Create vector store
- Set up retriever (top 4 documents)
- Create QA chain with LLM
- Return answers with sources

**Expected behavior:**
```python
rag_system = create_rag_system("./documents")

result = rag_system.query("What is the refund policy?")

print(f"Answer: {result['answer']}")
print(f"\nSources:")
for i, doc in enumerate(result['sources'], 1):
    print(f"{i}. {doc.metadata['source']}: {doc.page_content[:100]}...")
```

**3.3 Experiment with Chain Types**

Test different chain types:
- "stuff" (all docs in one prompt)
- "map_reduce" (process separately, combine)
- "refine" (iteratively refine answer)

Compare:
- Answer quality
- Response time
- Token usage

Document which works best for your use case.

### Implementation Hints

```python
from langchain.document_loaders import DirectoryLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

# Load documents
loader = DirectoryLoader(
    "./documents",
    glob="**/*.txt",
    loader_cls=TextLoader
)
documents = loader.load()

# Split
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = splitter.split_documents(documents)

# Create vector store
vectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())

# Create retriever
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# Create QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(temperature=0),
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True
)

# Query
result = qa_chain({"query": "Your question here"})
```

### Testing

Test with:
1. Factual questions (should find exact answers)
2. Conceptual questions (require synthesis)
3. Questions not in documents (should say "don't know")
4. Ambiguous questions

**Deliverable:** `part3_rag_system.py` with complete RAG implementation

---

## Part 4: Complete Q&A Application (45 minutes)

### Goal
Build a production-ready, interactive document Q&A system.

### Requirements

Build a complete application with:

**4.1 Document Management**

- Load documents from a configurable directory
- Support multiple file types (txt, pdf)
- Show loaded documents and statistics
- Allow refreshing the knowledge base

**4.2 Interactive Q&A Interface**

Create a command-line interface with:
```
Document Q&A System
==================

Loaded 15 documents (127 chunks)

Commands:
- ask: Ask a question
- sources: Show sources for last answer
- stats: Show system statistics
- reload: Reload documents
- quit: Exit

> 
```

**4.3 Answer Quality Features**

Implement:
- Source attribution (show which docs used)
- Confidence indication (based on retrieval scores)
- Fallback messages ("not enough information")
- Answer history (last 5 Q&A pairs)

**4.4 Configuration**

Support configuration via file or env:
```python
config = {
    "documents_dir": "./documents",
    "chunk_size": 1000,
    "chunk_overlap": 200,
    "retrieval_k": 4,
    "model": "gpt-3.5-turbo",
    "temperature": 0
}
```

**4.5 Error Handling**

Handle:
- Missing documents directory
- Empty knowledge base
- API errors
- Invalid queries
- File loading errors

**4.6 Advanced Features (Choose 2+)**

- **Conversation Memory:** Remember previous questions for context
- **Multiple Retrievers:** Try similarity and MMR, compare
- **Custom Prompts:** Allow user to customize system prompt
- **Export:** Save Q&A history to file
- **Statistics:** Track queries, tokens, costs

### Implementation Structure

```python
# app.py

import os
from dotenv import load_dotenv
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.document_loaders import DirectoryLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

class DocumentQA:
    def __init__(self, config):
        self.config = config
        self.vectorstore = None
        self.qa_chain = None
        self.history = []
        self.load_documents()
    
    def load_documents(self):
        """Load and process documents"""
        # Load from directory
        # Split into chunks
        # Create vector store
        # Set up QA chain
        pass
    
    def ask(self, question: str):
        """Ask a question and get answer with sources"""
        pass
    
    def show_sources(self):
        """Show sources for last answer"""
        pass
    
    def get_stats(self):
        """Get system statistics"""
        pass
    
    def reload_documents(self):
        """Reload all documents"""
        pass

def main():
    # Load config
    # Initialize QA system
    # Command loop
    pass

if __name__ == "__main__":
    main()
```

### Expected Functionality

**Session Example:**
```
Document Q&A System
==================

Loading documents from ./documents...
✓ Loaded 15 documents
✓ Created 127 chunks
✓ Built vector database

> ask
Question: What is the company's refund policy?

Answer: The company offers a 30-day money-back guarantee on all products.
Customers can request a refund within 30 days of purchase, no questions asked.
Refunds are processed within 5-7 business days.

Confidence: High (4 relevant sources found)

> sources
Sources used for last answer:
1. refund_policy.txt (Score: 0.89)
   "Our refund policy is simple: 30-day money-back guarantee..."
   
2. customer_support.txt (Score: 0.82)
   "For refund requests, contact support@company.com..."
   
3. faq.txt (Score: 0.78)
   "Q: How long do refunds take? A: 5-7 business days..."
   
4. terms.txt (Score: 0.71)
   "All sales are final after 30 days..."

> stats
System Statistics:
- Documents: 15
- Chunks: 127
- Queries: 1
- Avg retrieval time: 0.3s
- Total tokens used: 342

> ask
Question: How do I contact support?

Answer: You can contact support via email at support@company.com or call
1-800-123-4567. Support is available Monday-Friday, 9 AM - 5 PM EST.

Confidence: High (3 relevant sources found)

> quit
Thank you for using Document Q&A System!
```

### Testing Requirements

Test your application with:

1. **Various Document Types:**
   - Multiple .txt files
   - PDF files (if supported)
   - Different lengths and formats

2. **Query Types:**
   - Factual questions (single answer)
   - Complex questions (multiple sources)
   - Questions not in documents
   - Follow-up questions (if memory enabled)

3. **Edge Cases:**
   - Empty documents folder
   - Very long questions
   - Special characters
   - Repeated questions

4. **System Features:**
   - All commands work
   - Sources display correctly
   - Statistics are accurate
   - Reload functionality works

### Bonus Features (Optional)

If time permits, add:
- Web UI using Streamlit or Gradio
- Multi-language support
- Document upload functionality
- Query suggestions
- Answer rating (thumbs up/down)
- Semantic caching (don't reprocess same question)
- Export to PDF report

**Deliverable:** `app.py` - Complete, production-ready Q&A system

---

## Submission Checklist

Before submitting, ensure you have:

- ✅ **Part 1:** `part1_embeddings.py` - Embeddings and similarity
- ✅ **Part 2:** `part2_vectorstore.py` - Vector database operations
- ✅ **Part 3:** `part3_rag_system.py` - Complete RAG pipeline
- ✅ **Part 4:** `app.py` - Full interactive application
- ✅ **Documents:** Sample knowledge base (5+ text files)
- ✅ **Documentation:** README.md with setup and usage
- ✅ **Configuration:** Config file or .env.example
- ✅ **Dependencies:** requirements.txt
- ✅ **Tests:** Evidence all features work

### Code Quality Requirements

Your code should:
- Include comprehensive docstrings
- Use type hints
- Handle errors gracefully
- Follow PEP 8 style
- Have clear variable names
- Include comments for complex logic
- Be modular and reusable

---

## Sample Knowledge Base

Create sample documents for testing. Example topics:

**File: refund_policy.txt**
```
Refund Policy

Our company offers a 30-day money-back guarantee on all products.
If you're not satisfied, you can request a full refund within 30 days
of purchase, no questions asked.

To request a refund:
1. Email support@company.com with your order number
2. We'll process your request within 24 hours
3. Refunds are issued to original payment method within 5-7 business days

Note: Shipping costs are non-refundable.
```

Create 5-10 similar documents covering different topics for your knowledge base.

---

## Common Issues & Solutions

### Issue: "No documents found"
**Solution:** Check documents directory path, ensure files exist

### Issue: "Vector store empty"
**Solution:** Verify documents loaded before creating vector store

### Issue: "Embeddings taking too long"
**Solution:** Reduce number of documents or chunk size for testing

### Issue: "Poor quality answers"
**Solution:** 
- Adjust chunk size (try 500, 1000, 1500)
- Increase retrieval_k (try 4, 6, 8)
- Improve document quality

### Issue: "Out of memory"
**Solution:** Use persistent Chroma storage, don't load all in memory

---

## Evaluation Criteria

Your submission will be evaluated on:

| Criterion | Weight | Description |
|-----------|--------|-------------|
| **Functionality** | 40% | All components work correctly |
| **RAG Quality** | 20% | Retrieves relevant docs, generates good answers |
| **Code Quality** | 20% | Clean, documented, maintainable |
| **User Experience** | 10% | Clear interface, helpful messages |
| **Error Handling** | 10% | Graceful failures, edge cases handled |

**Passing Grade:** 70% overall

---

## Time Management Tips

- **Part 1 (35 min):** Understand embeddings first, implementation is straightforward
- **Part 2 (30 min):** Start simple (in-memory), add persistence later
- **Part 3 (40 min):** Build incrementally, test each step
- **Part 4 (45 min):** Get core functionality working before polish

**If running short on time:**
- Part 4 is most important (complete application)
- Focus on core features before bonus features
- Document what you attempted even if incomplete

---

## Learning Resources

**LangChain Docs:**
- [Vector Stores](https://python.langchain.com/docs/modules/data_connection/vectorstores/)
- [Document Loaders](https://python.langchain.com/docs/modules/data_connection/document_loaders/)
- [Text Splitters](https://python.langchain.com/docs/modules/data_connection/document_transformers/)
- [Retrievers](https://python.langchain.com/docs/modules/data_connection/retrievers/)

**Chroma Docs:**
- [Getting Started](https://docs.trychroma.com/getting-started)
- [Usage Guide](https://docs.trychroma.com/usage-guide)

**Debugging Tips:**
- Set `verbose=True` in chains to see what's happening
- Print intermediate results (retrieved docs)
- Test each component independently
- Use small document set for testing

---

## Extension Ideas

After completing the exercise, try:

1. **Multi-Source RAG:** Combine multiple vector stores (different doc types)
2. **Hybrid Search:** Combine vector search with keyword search
3. **Re-ranking:** Re-rank retrieved docs before generation
4. **Streaming Answers:** Stream LLM responses token by token
5. **Evaluation Suite:** Automated testing with ground truth Q&A pairs

---

## Example README Template

```markdown
# Document Q&A System

## Description
An intelligent question-answering system that uses RAG to answer questions
based on your document collection.

## Features
- Vector-based semantic search
- Support for multiple document formats
- Interactive CLI interface
- Source attribution
- Configurable parameters

## Setup
1. Install: `pip install -r requirements.txt`
2. Add documents to `documents/` folder
3. Create `.env` with OpenAI API key
4. Run: `python app.py`

## Usage
[Your commands and examples]

## Architecture
- **Embeddings:** OpenAI text-embedding-ada-002
- **Vector DB:** Chroma (persistent)
- **LLM:** GPT-3.5-turbo
- **Chunking:** Recursive, 1000 chars, 200 overlap

## Configuration
[How to configure the system]

## Testing
[What you tested]

## Known Limitations
[Any issues or limitations]
```

---

## Next Steps

After completing this exercise:

1. **Review Solution:** Compare with provided solutions
2. **Experiment:** Try different configurations
3. **Extend:** Add advanced features
4. **Prepare:** Get ready for Module 4 (AI Agents & Tools)

---

## Need Help?

- **Forum:** Post questions with code snippets
- **Office Hours:** Schedule 1-on-1 help
- **Docs:** Refer to LangChain documentation
- **Solutions:** Available after submission deadline

---

**Good luck building your Q&A system! 🚀**

---

*Module 3 Exercise | Building AI-Powered Applications | Estimated Time: 150 minutes*
