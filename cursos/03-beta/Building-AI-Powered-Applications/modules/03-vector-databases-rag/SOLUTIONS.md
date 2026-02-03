# Module 3: Vector Databases & RAG - Solution Guide

## Overview

This solution guide provides complete, working implementations for all exercises in Module 3. Each solution includes:
- Full working code
- Explanation of approach
- Alternative implementations
- Common mistakes to avoid
- Extension suggestions

**Instructor Note:** These are reference implementations. Student solutions may vary while still being correct.

---

## Part 1: Embeddings and Similarity - Solutions

### Solution 1.1: Generate Embeddings

**Approach:** Use OpenAI embeddings to convert text to vectors and inspect properties.

```python
# part1_embeddings.py

import os
from dotenv import load_dotenv
from langchain.embeddings import OpenAI Embeddings
import numpy as np

# Load environment
load_dotenv()

# Initialize embeddings model
embeddings_model = OpenAIEmbeddings()

def generate_embeddings(texts):
    """Generate embeddings for a list of texts"""
    print(f"Generating embeddings for {len(texts)} texts...\n")
    
    # Generate embeddings
    vectors = embeddings_model.embed_documents(texts)
    
    # Display information
    for i, (text, vector) in enumerate(zip(texts, vectors), 1):
        print(f"Text {i}: {text}")
        print(f"  Dimensions: {len(vector)}")
        print(f"  First 5 values: {vector[:5]}")
        print(f"  Vector norm: {np.linalg.norm(vector):.4f}")
        print()
    
    return vectors

def test_embeddings():
    """Test embedding generation"""
    texts = [
        "The cat sat on the mat",
        "A dog played in the park",
        "Machine learning is fascinating",
        "Python is a programming language",
        "I love eating pizza"
    ]
    
    embeddings = generate_embeddings(texts)
    
    # Additional analysis
    print("="*60)
    print("ANALYSIS")
    print("="*60)
    
    # Check if embeddings are normalized
    norms = [np.linalg.norm(emb) for emb in embeddings]
    print(f"All embeddings normalized: {all(abs(n - 1.0) < 0.01 for n in norms)}")
    
    # Average dimension values
    avg_values = np.mean(embeddings, axis=0)
    print(f"Average across all dimensions: {np.mean(avg_values):.6f}")
    print(f"Std dev across all dimensions: {np.std(avg_values):.6f}")

if __name__ == "__main__":
    test_embeddings()
```

---

### Solution 1.2: Implement Similarity Search

**Approach:** Calculate cosine similarity between query and all documents, return top matches.

```python
# Continuing in part1_embeddings.py

def cosine_similarity(vec1, vec2):
    """Calculate cosine similarity between two vectors"""
    dot_product = np.dot(vec1, vec2)
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    return dot_product / (norm1 * norm2)

def find_similar(query, documents, top_k=3):
    """
    Find most similar documents to query
    
    Args:
        query: Query string
        documents: List of document strings
        top_k: Number of results to return
    
    Returns:
        List of tuples (document, similarity_score)
    """
    print(f"Query: {query}")
    print(f"Searching through {len(documents)} documents...\n")
    
    # Generate embeddings
    query_vector = embeddings_model.embed_query(query)
    doc_vectors = embeddings_model.embed_documents(documents)
    
    # Calculate similarities
    similarities = []
    for doc, doc_vec in zip(documents, doc_vectors):
        similarity = cosine_similarity(query_vector, doc_vec)
        similarities.append((doc, similarity))
    
    # Sort by similarity (descending)
    similarities.sort(key=lambda x: x[1], reverse=True)
    
    # Return top K
    results = similarities[:top_k]
    
    # Display results
    print(f"Top {top_k} results:")
    for i, (doc, score) in enumerate(results, 1):
        print(f"{i}. \"{doc}\"")
        print(f"   Similarity: {score:.4f}\n")
    
    return results

def test_similarity_search():
    """Test similarity search with various queries"""
    
    documents = [
        "How to reset your password",
        "Guide to account security",
        "Chocolate cake recipe",
        "Password recovery steps",
        "Baking tips for beginners",
        "Two-factor authentication setup",
        "Best practices for strong passwords",
        "Italian pasta recipes"
    ]
    
    # Test Case 1: High similarity expected
    print("="*60)
    print("TEST CASE 1: Password-related query")
    print("="*60)
    find_similar(
        query="I forgot my password",
        documents=documents,
        top_k=3
    )
    
    # Test Case 2: Different topic
    print("\n" + "="*60)
    print("TEST CASE 2: Cooking-related query")
    print("="*60)
    find_similar(
        query="How to bake a cake",
        documents=documents,
        top_k=3
    )
    
    # Test Case 3: Security-related
    print("\n" + "="*60)
    print("TEST CASE 3: Security-related query")
    print("="*60)
    find_similar(
        query="Make my account more secure",
        documents=documents,
        top_k=3
    )

if __name__ == "__main__":
    # test_embeddings()  # From previous section
    test_similarity_search()
```

---

### Solution 1.3: Experiment with Queries

**Observations and Analysis:**

```python
# Continuing in part1_embeddings.py

def experiment_with_queries():
    """Experiment with different query types"""
    
    documents = [
        "Dogs are loyal pets that love to play",
        "Cats are independent animals",
        "Python is a popular programming language",
        "JavaScript is used for web development",
        "Machine learning requires data",
        "Deep learning uses neural networks"
    ]
    
    experiments = [
        {
            "name": "Synonyms",
            "query": "Canines make great companions",
            "expected": "Should match dog document"
        },
        {
            "name": "Paraphrase",
            "query": "What programming language is widely used?",
            "expected": "Should match Python/JavaScript"
        },
        {
            "name": "Unrelated",
            "query": "Best pizza toppings",
            "expected": "Low similarity to all docs"
        },
        {
            "name": "Conceptual",
            "query": "AI and neural networks",
            "expected": "Should match ML/DL documents"
        }
    ]
    
    print("="*60)
    print("EXPERIMENTATION WITH DIFFERENT QUERY TYPES")
    print("="*60)
    
    for exp in experiments:
        print(f"\n{exp['name'].upper()}")
        print(f"Query: {exp['query']}")
        print(f"Expected: {exp['expected']}")
        print("-"*60)
        
        results = find_similar(exp['query'], documents, top_k=2)
        
        # Analysis
        top_score = results[0][1]
        if top_score > 0.8:
            print("✅ HIGH SIMILARITY: Query matched very well")
        elif top_score > 0.6:
            print("⚠️  MEDIUM SIMILARITY: Decent match")
        else:
            print("❌ LOW SIMILARITY: Poor match")
        print()

if __name__ == "__main__":
    experiment_with_queries()
```

**Key Observations:**

1. **Semantic Understanding:**
   - "Canines" correctly matches "dogs" (synonyms)
   - Paraphrases match original concepts
   
2. **Limitations:**
   - Very specific technical terms may not match general queries
   - Negations can be problematic ("not safe" may match "safe")
   
3. **Best Practices:**
   - More context in documents = better matches
   - Consistent terminology helps
   - Consider domain-specific embeddings for specialized fields

---

## Part 2: Vector Database Setup - Solutions

### Solution 2.1: Create and Populate Vector Store

**Approach:** Use Chroma for persistent vector storage.

```python
# part2_vectorstore.py

import os
from dotenv import load_dotenv
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.schema import Document

load_dotenv()

def create_vectorstore(documents, persist_directory="./chroma_db"):
    """
    Create and populate a Chroma vector store
    
    Args:
        documents: List of strings or Document objects
        persist_directory: Where to store the database
    
    Returns:
        Chroma vectorstore
    """
    print(f"Creating vector store with {len(documents)} documents...")
    
    # Initialize embeddings
    embeddings = OpenAIEmbeddings()
    
    # Create vector store
    if isinstance(documents[0], str):
        # If strings, convert to Documents
        docs = [Document(page_content=doc) for doc in documents]
    else:
        docs = documents
    
    vectorstore = Chroma.from_documents(
        documents=docs,
        embedding=embeddings,
        persist_directory=persist_directory
    )
    
    print(f"✓ Vector store created and persisted to {persist_directory}")
    
    return vectorstore

def test_vectorstore_creation():
    """Test creating and populating vector store"""
    
    # Sample company knowledge base
    documents = [
        "Our refund policy allows returns within 30 days of purchase. Full refund, no questions asked.",
        "To reset your password, click the 'Forgot Password' link on the login page.",
        "Customer support is available 24/7 via email at support@company.com or phone at 1-800-123-4567.",
        "We offer free shipping on orders over $50 within the continental United States.",
        "Our products come with a 1-year warranty covering manufacturing defects.",
        "To track your order, use the tracking number sent to your email after shipment.",
        "We accept Visa, Mastercard, American Express, and PayPal as payment methods.",
        "Account security: Enable two-factor authentication in your account settings.",
        "To update your billing information, go to Account > Payment Methods.",
        "Our business hours are Monday-Friday, 9 AM to 5 PM EST."
    ]
    
    # Create vector store
    vectorstore = create_vectorstore(documents)
    
    # Verify storage
    print(f"\nVector store contains {vectorstore._collection.count()} documents")
    
    return vectorstore

if __name__ == "__main__":
    vectorstore = test_vectorstore_creation()
```

---

### Solution 2.2: Perform Similarity Search

**Approach:** Query vector store and display results with scores.

```python
# Continuing in part2_vectorstore.py

def perform_search(vectorstore, query, k=3):
    """
    Search vector store and display results
    
    Args:
        vectorstore: Chroma vector store
        query: Search query
        k: Number of results to return
    """
    print(f"\nQuery: \"{query}\"")
    print(f"Searching for top {k} results...\n")
    
    # Search with scores
    results = vectorstore.similarity_search_with_score(query, k=k)
    
    # Display results
    for i, (doc, score) in enumerate(results, 1):
        print(f"Result {i}:")
        print(f"  Score: {score:.4f}")
        print(f"  Content: {doc.page_content}")
        
        if doc.metadata:
            print(f"  Metadata: {doc.metadata}")
        print()
    
    return results

def test_searches():
    """Test various search queries"""
    
    # Load existing vector store
    embeddings = OpenAIEmbeddings()
    vectorstore = Chroma(
        persist_directory="./chroma_db",
        embedding_function=embeddings
    )
    
    # Test queries
    queries = [
        "How do I get a refund?",
        "I forgot my password",
        "What payment methods do you accept?",
        "How can I contact customer support?",
        "Track my package"
    ]
    
    print("="*60)
    print("SIMILARITY SEARCH TESTS")
    print("="*60)
    
    for query in queries:
        perform_search(vectorstore, query, k=2)
        print("-"*60)

if __name__ == "__main__":
    # First run: create_vectorstore_creation()
    test_searches()
```

---

### Solution 2.3: Add and Search with Metadata

**Approach:** Enrich documents with metadata for filtered searches.

```python
# Continuing in part2_vectorstore.py

def create_vectorstore_with_metadata():
    """Create vector store with rich metadata"""
    
    docs = [
        Document(
            page_content="Python tutorial for beginners: variables, functions, loops",
            metadata={
                "category": "programming",
                "language": "python",
                "difficulty": "beginner",
                "topics": ["variables", "functions", "loops"]
            }
        ),
        Document(
            page_content="Advanced Python: decorators, generators, context managers",
            metadata={
                "category": "programming",
                "language": "python",
                "difficulty": "advanced",
                "topics": ["decorators", "generators", "context managers"]
            }
        ),
        Document(
            page_content="JavaScript basics: DOM manipulation and events",
            metadata={
                "category": "programming",
                "language": "javascript",
                "difficulty": "beginner",
                "topics": ["DOM", "events"]
            }
        ),
        Document(
            page_content="Machine learning fundamentals: supervised and unsupervised learning",
            metadata={
                "category": "data science",
                "subcategory": "machine learning",
                "difficulty": "intermediate",
                "topics": ["supervised learning", "unsupervised learning"]
            }
        ),
        Document(
            page_content="Deep learning with neural networks and backpropagation",
            metadata={
                "category": "data science",
                "subcategory": "deep learning",
                "difficulty": "advanced",
                "topics": ["neural networks", "backpropagation"]
            }
        )
    ]
    
    embeddings = OpenAIEmbeddings()
    vectorstore = Chroma.from_documents(
        documents=docs,
        embedding=embeddings,
        persist_directory="./chroma_db_meta"
    )
    
    print(f"✓ Created vector store with {len(docs)} documents (with metadata)")
    
    return vectorstore

def search_with_filter(vectorstore, query, filter_dict, k=3):
    """Search with metadata filtering"""
    
    print(f"\nQuery: \"{query}\"")
    print(f"Filter: {filter_dict}")
    print(f"Searching...\n")
    
    results = vectorstore.similarity_search(
        query,
        k=k,
        filter=filter_dict
    )
    
    print(f"Found {len(results)} results:")
    for i, doc in enumerate(results, 1):
        print(f"\n{i}. {doc.page_content}")
        print(f"   Metadata: {doc.metadata}")
    
    return results

def test_metadata_filtering():
    """Test searches with metadata filters"""
    
    vectorstore = create_vectorstore_with_metadata()
    
    print("\n" + "="*60)
    print("METADATA FILTERING TESTS")
    print("="*60)
    
    # Test 1: Find beginner Python content
    print("\n" + "-"*60)
    print("TEST 1: Beginner Python Content")
    print("-"*60)
    search_with_filter(
        vectorstore,
        "learn programming",
        {"language": "python", "difficulty": "beginner"},
        k=5
    )
    
    # Test 2: Find advanced data science content
    print("\n" + "-"*60)
    print("TEST 2: Advanced Data Science")
    print("-"*60)
    search_with_filter(
        vectorstore,
        "AI and neural networks",
        {"category": "data science", "difficulty": "advanced"},
        k=5
    )
    
    # Test 3: Find all programming content
    print("\n" + "-"*60)
    print("TEST 3: All Programming Content")
    print("-"*60)
    search_with_filter(
        vectorstore,
        "coding tutorials",
        {"category": "programming"},
        k=5
    )

if __name__ == "__main__":
    test_metadata_filtering()
```

**Common Mistakes:**
- ❌ Forgetting to add metadata to documents
- ❌ Using inconsistent metadata keys
- ❌ Not specifying persist_directory (data lost on restart)
- ❌ Filter syntax varies by vector DB (check docs)

---

## Part 3: Build RAG System - Solutions

### Solution 3.1: Document Loading and Chunking

**Approach:** Load documents from directory and intelligently chunk them.

```python
# part3_rag_system.py

import os
from dotenv import load_dotenv
from langchain.document_loaders import DirectoryLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

load_dotenv()

def load_documents(directory, glob_pattern="**/*.txt"):
    """
    Load all documents from a directory
    
    Args:
        directory: Path to documents folder
        glob_pattern: Pattern to match files
    
    Returns:
        List of loaded documents
    """
    print(f"Loading documents from {directory}...")
    
    loader = DirectoryLoader(
        directory,
        glob=glob_pattern,
        loader_cls=TextLoader
    )
    
    documents = loader.load()
    
    print(f"✓ Loaded {len(documents)} documents")
    
    # Show document info
    for doc in documents:
        source = doc.metadata.get('source', 'unknown')
        length = len(doc.page_content)
        print(f"  - {source}: {length} characters")
    
    return documents

def split_documents(documents, chunk_size=1000, chunk_overlap=200):
    """
    Split documents into chunks
    
    Args:
        documents: List of documents
        chunk_size: Target chunk size in characters
        chunk_overlap: Overlap between chunks
    
    Returns:
        List of document chunks
    """
    print(f"\nSplitting documents...")
    print(f"  Chunk size: {chunk_size}")
    print(f"  Overlap: {chunk_overlap}")
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
        separators=["\n\n", "\n", " ", ""]
    )
    
    chunks = text_splitter.split_documents(documents)
    
    print(f"✓ Created {len(chunks)} chunks")
    
    # Calculate statistics
    chunk_lengths = [len(chunk.page_content) for chunk in chunks]
    avg_length = sum(chunk_lengths) / len(chunk_lengths)
    min_length = min(chunk_lengths)
    max_length = max(chunk_lengths)
    
    print(f"\nChunk Statistics:")
    print(f"  Average length: {avg_length:.0f} characters")
    print(f"  Min length: {min_length} characters")
    print(f"  Max length: {max_length} characters")
    
    # Show sample chunk
    print(f"\nSample chunk:")
    print(f"  Source: {chunks[0].metadata.get('source', 'unknown')}")
    print(f"  Content preview: {chunks[0].page_content[:150]}...")
    
    return chunks

def test_document_processing():
    """Test loading and chunking documents"""
    
    # Create sample documents directory
    os.makedirs("./documents", exist_ok=True)
    
    # Create sample files if they don't exist
    sample_docs = {
        "refund_policy.txt": """
        Refund Policy
        
        Our company offers a hassle-free 30-day money-back guarantee on all products.
        If you're not completely satisfied with your purchase, you can return it for
        a full refund within 30 days of the delivery date.
        
        How to Request a Refund:
        1. Log into your account
        2. Go to Orders > Order History
        3. Select the order you want to return
        4. Click 'Request Refund' and provide a reason
        5. We'll send you a return shipping label via email
        
        Processing Time:
        - Refund requests are processed within 24 hours
        - Once approved, refunds are issued to your original payment method
        - Allow 5-7 business days for the refund to appear in your account
        
        Important Notes:
        - Products must be in original condition with all packaging
        - Shipping costs are non-refundable
        - Digital products are non-refundable after download
        - Sale items are final sale unless defective
        """,
        
        "shipping_policy.txt": """
        Shipping Policy
        
        We offer several shipping options to meet your needs:
        
        Domestic Shipping (US):
        - Standard Shipping (5-7 business days): FREE on orders over $50
        - Expedited Shipping (2-3 business days): $9.99
        - Express Shipping (1-2 business days): $19.99
        
        International Shipping:
        - Available to most countries
        - Delivery times vary by destination (7-21 business days)
        - Customs fees and import taxes are the responsibility of the recipient
        
        Order Processing:
        - Orders are processed within 1-2 business days
        - You'll receive a shipping confirmation email with tracking information
        - Track your order at any time using your tracking number
        
        Shipping Address:
        - Please ensure your shipping address is correct
        - We cannot change the address after an order has shipped
        - Contact support immediately if you need to update your address
        """
    }
    
    for filename, content in sample_docs.items():
        filepath = f"./documents/{filename}"
        if not os.path.exists(filepath):
            with open(filepath, 'w') as f:
                f.write(content.strip())
    
    # Test loading
    documents = load_documents("./documents")
    
    # Test splitting
    chunks = split_documents(documents, chunk_size=1000, chunk_overlap=200)
    
    return documents, chunks

if __name__ == "__main__":
    documents, chunks = test_document_processing()
```

---

### Solution 3.2: Create RAG Chain

**Approach:** Complete RAG pipeline with retrieval and generation.

```python
# Continuing in part3_rag_system.py

def create_rag_system(documents_dir, chunk_size=1000, chunk_overlap=200, k=4):
    """
    Create a complete RAG system
    
    Args:
        documents_dir: Path to documents directory
        chunk_size: Chunk size for splitting
        chunk_overlap: Overlap between chunks
        k: Number of documents to retrieve
    
    Returns:
        Dictionary with vectorstore and qa_chain
    """
    print("="*60)
    print("CREATING RAG SYSTEM")
    print("="*60)
    
    # 1. Load documents
    documents = load_documents(documents_dir)
    
    # 2. Split documents
    chunks = split_documents(documents, chunk_size, chunk_overlap)
    
    # 3. Create vector store
    print("\nCreating vector store...")
    embeddings = OpenAIEmbeddings()
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory="./chroma_rag_db"
    )
    print("✓ Vector store created")
    
    # 4. Create retriever
    print(f"\nConfiguring retriever (k={k})...")
    retriever = vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": k}
    )
    print("✓ Retriever configured")
    
    # 5. Create QA chain
    print("\nCreating QA chain...")
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True
    )
    print("✓ QA chain created")
    
    print("\n" + "="*60)
    print("RAG SYSTEM READY")
    print("="*60)
    
    return {
        "vectorstore": vectorstore,
        "qa_chain": qa_chain,
        "retriever": retriever
    }

def query_rag_system(qa_chain, question):
    """
    Query the RAG system and display results
    
    Args:
        qa_chain: The QA chain
        question: Question to ask
    
    Returns:
        Result dictionary
    """
    print(f"\nQuestion: {question}")
    print("-"*60)
    
    result = qa_chain({"query": question})
    
    print(f"\nAnswer:")
    print(result["result"])
    
    print(f"\nSources ({len(result['source_documents'])}):")
    for i, doc in enumerate(result['source_documents'], 1):
        source = doc.metadata.get('source', 'unknown')
        content_preview = doc.page_content[:100].replace('\n', ' ')
        print(f"{i}. {source}")
        print(f"   Preview: {content_preview}...")
    
    return result

def test_rag_system():
    """Test the complete RAG system"""
    
    # Create RAG system
    rag_system = create_rag_system("./documents", k=3)
    qa_chain = rag_system["qa_chain"]
    
    # Test questions
    questions = [
        "What is the refund policy?",
        "How long does shipping take?",
        "Are shipping costs refundable?",
        "Can I change my shipping address after ordering?",
        "What happens if my product is defective?"
    ]
    
    print("\n" + "="*60)
    print("TESTING RAG SYSTEM")
    print("="*60)
    
    for question in questions:
        query_rag_system(qa_chain, question)
        print("\n" + "="*60)

if __name__ == "__main__":
    test_rag_system()
```

---

### Solution 3.3: Experiment with Chain Types

**Approach:** Compare different chain types for answer generation.

```python
# Continuing in part3_rag_system.py

import time

def compare_chain_types(documents_dir):
    """Compare different chain types"""
    
    print("="*60)
    print("COMPARING CHAIN TYPES")
    print("="*60)
    
    # Load and prepare documents
    documents = load_documents(documents_dir)
    chunks = split_documents(documents)
    
    embeddings = OpenAIEmbeddings()
    vectorstore = Chroma.from_documents(chunks, embeddings)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
    
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)
    
    # Chain types to test
    chain_types = ["stuff", "map_reduce", "refine"]
    
    test_question = "What is the company's policy on refunds and shipping?"
    
    results = {}
    
    for chain_type in chain_types:
        print(f"\n{'='*60}")
        print(f"CHAIN TYPE: {chain_type.upper()}")
        print(f"{'='*60}")
        
        # Create chain
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type=chain_type,
            retriever=retriever,
            return_source_documents=True
        )
        
        # Measure time
        start_time = time.time()
        result = qa_chain({"query": test_question})
        elapsed_time = time.time() - start_time
        
        # Store results
        results[chain_type] = {
            "answer": result["result"],
            "time": elapsed_time,
            "num_sources": len(result["source_documents"])
        }
        
        # Display
        print(f"\nAnswer:\n{result['result']}")
        print(f"\nTime: {elapsed_time:.2f} seconds")
        print(f"Sources used: {len(result['source_documents'])}")
    
    # Comparison summary
    print(f"\n{'='*60}")
    print("COMPARISON SUMMARY")
    print(f"{'='*60}")
    
    print(f"\n{'Chain Type':<15} {'Time (s)':<12} {'Sources':<10}")
    print("-"*40)
    for chain_type, data in results.items():
        print(f"{chain_type:<15} {data['time']:<12.2f} {data['num_sources']:<10}")
    
    print(f"\nRecommendations:")
    print("- 'stuff': Best for most cases, fastest, fits all context in one prompt")
    print("- 'map_reduce': Use when docs too large for context window")
    print("- 'refine': Use when you need most comprehensive answers")

if __name__ == "__main__":
    compare_chain_types("./documents")
```

**Common Mistakes:**
- ❌ Using wrong chain type for use case
- ❌ Not adjusting k parameter for retrieval
- ❌ Forgetting to return source documents
- ❌ Not handling cases where no relevant docs found

---

## Part 4: Complete Q&A Application - Solution

**Complete Production Application:**

```python
# app.py

import os
import sys
import json
from datetime import datetime
from typing import Dict, List, Optional
from dotenv import load_dotenv

from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.document_loaders import DirectoryLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.schema import Document

# Load environment
load_dotenv()

class DocumentQA:
    """
    Complete Document Q&A System using RAG
    
    Features:
    - Document management (load, reload)
    - Vector-based semantic search
    - Interactive CLI interface
    - Source attribution
    - Query history
    - Configurable parameters
    """
    
    def __init__(self, config: Dict):
        """
        Initialize the Q&A system
        
        Args:
            config: Configuration dictionary
        """
        self.config = config
        self.vectorstore = None
        self.qa_chain = None
        self.retriever = None
        self.history = []
        self.last_sources = []
        self.stats = {
            "queries": 0,
            "documents_loaded": 0,
            "chunks_created": 0,
            "total_tokens": 0
        }
        
        print("Document Q&A System")
        print("=" * 60)
        
        # Initialize system
        self.load_documents()
    
    def load_documents(self):
        """Load and process documents from configured directory"""
        
        documents_dir = self.config["documents_dir"]
        
        if not os.path.exists(documents_dir):
            print(f"⚠️  Documents directory not found: {documents_dir}")
            print("   Creating directory...")
            os.makedirs(documents_dir)
            print("   Please add documents to this folder and run 'reload' command")
            return
        
        print(f"\nLoading documents from {documents_dir}...")
        
        try:
            # Load documents
            loader = DirectoryLoader(
                documents_dir,
                glob="**/*.txt",
                loader_cls=TextLoader
            )
            documents = loader.load()
            
            if len(documents) == 0:
                print("⚠️  No documents found")
                print("   Please add .txt files to the documents folder")
                return
            
            self.stats["documents_loaded"] = len(documents)
            print(f"✓ Loaded {len(documents)} documents")
            
            # Split into chunks
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=self.config["chunk_size"],
                chunk_overlap=self.config["chunk_overlap"]
            )
            chunks = text_splitter.split_documents(documents)
            self.stats["chunks_created"] = len(chunks)
            print(f"✓ Created {len(chunks)} chunks")
            
            # Create vector store
            print("✓ Building vector database...")
            embeddings = OpenAIEmbeddings()
            self.vectorstore = Chroma.from_documents(
                documents=chunks,
                embedding=embeddings,
                persist_directory="./chroma_qa_db"
            )
            
            # Create retriever
            self.retriever = self.vectorstore.as_retriever(
                search_type="similarity",
                search_kwargs={"k": self.config["retrieval_k"]}
            )
            
            # Create QA chain
            llm = ChatOpenAI(
                model_name=self.config["model"],
                temperature=self.config["temperature"]
            )
            self.qa_chain = RetrievalQA.from_chain_type(
                llm=llm,
                chain_type="stuff",
                retriever=self.retriever,
                return_source_documents=True
            )
            
            print("✓ System ready\n")
            
        except Exception as e:
            print(f"❌ Error loading documents: {e}")
            sys.exit(1)
    
    def ask(self, question: str) -> Dict:
        """
        Ask a question and get answer with sources
        
        Args:
            question: Question string
        
        Returns:
            Dictionary with answer and sources
        """
        if not self.qa_chain:
            return {
                "error": "System not initialized. Please load documents first."
            }
        
        if not question.strip():
            return {"error": "Question cannot be empty"}
        
        try:
            # Query the system
            result = self.qa_chain({"query": question})
            
            answer = result["result"]
            sources = result["source_documents"]
            
            # Calculate confidence based on source relevance scores
            scores = [
                self.vectorstore.similarity_search_with_score(question, k=1)[0][1]
            ]
            confidence = "High" if scores[0] < 0.5 else "Medium" if scores[0] < 0.8 else "Low"
            
            # Store in history
            qa_pair = {
                "question": question,
                "answer": answer,
                "sources": sources,
                "confidence": confidence,
                "timestamp": datetime.now().isoformat()
            }
            self.history.append(qa_pair)
            self.last_sources = sources
            
            # Update stats
            self.stats["queries"] += 1
            
            return {
                "answer": answer,
                "sources": sources,
                "confidence": confidence
            }
            
        except Exception as e:
            return {"error": f"Error processing question: {e}"}
    
    def show_sources(self):
        """Display sources for the last answer"""
        if not self.last_sources:
            print("No previous query to show sources for\n")
            return
        
        print("\nSources used for last answer:")
        print("-" * 60)
        
        for i, doc in enumerate(self.last_sources, 1):
            source = doc.metadata.get('source', 'unknown')
            content = doc.page_content.replace('\n', ' ')[:150]
            
            print(f"\n{i}. {source}")
            print(f"   {content}...")
    
    def get_stats(self) -> Dict:
        """Get system statistics"""
        return self.stats
    
    def reload_documents(self):
        """Reload all documents"""
        print("\nReloading documents...")
        self.history = []
        self.last_sources = []
        self.load_documents()
    
    def show_history(self, n=5):
        """Show last N Q&A pairs"""
        if not self.history:
            print("No query history yet\n")
            return
        
        recent = self.history[-n:]
        
        print(f"\nQuery History (last {len(recent)}):")
        print("=" * 60)
        
        for i, qa in enumerate(recent, 1):
            print(f"\n{i}. Q: {qa['question']}")
            print(f"   A: {qa['answer'][:100]}...")
            print(f"   Confidence: {qa['confidence']}")
            print(f"   Time: {qa['timestamp']}")
    
    def export_history(self, filename="qa_history.json"):
        """Export history to JSON file"""
        try:
            # Convert Document objects to dicts for JSON serialization
            export_data = []
            for qa in self.history:
                export_qa = qa.copy()
                export_qa['sources'] = [
                    {
                        "content": doc.page_content,
                        "metadata": doc.metadata
                    }
                    for doc in qa['sources']
                ]
                export_data.append(export_qa)
            
            with open(filename, 'w') as f:
                json.dump(export_data, f, indent=2)
            
            print(f"✓ History exported to {filename}")
        except Exception as e:
            print(f"❌ Error exporting history: {e}")


def print_header():
    """Print application header"""
    print("\n" + "=" * 60)
    print("  DOCUMENT Q&A SYSTEM")
    print("=" * 60)
    print("\nCommands:")
    print("  ask      - Ask a question")
    print("  sources  - Show sources for last answer")
    print("  history  - Show query history")
    print("  stats    - Show system statistics")
    print("  reload   - Reload documents")
    print("  export   - Export Q&A history to file")
    print("  help     - Show this help")
    print("  quit     - Exit")
    print("\n" + "=" * 60 + "\n")


def main():
    """Main application loop"""
    
    # Check API key
    if not os.getenv("OPENAI_API_KEY"):
        print("❌ Error: OPENAI_API_KEY not found")
        print("   Please create a .env file with your API key")
        sys.exit(1)
    
    # Configuration
    config = {
        "documents_dir": "./documents",
        "chunk_size": 1000,
        "chunk_overlap": 200,
        "retrieval_k": 4,
        "model": "gpt-3.5-turbo",
        "temperature": 0
    }
    
    # Initialize Q&A system
    try:
        qa_system = DocumentQA(config)
    except Exception as e:
        print(f"❌ Error initializing system: {e}")
        sys.exit(1)
    
    # Print header
    print_header()
    
    # Main command loop
    while True:
        try:
            command = input("> ").strip().lower()
            
            if not command:
                continue
            
            if command in ["quit", "exit", "q"]:
                print("\nThank you for using Document Q&A System! Goodbye! 👋\n")
                break
            
            elif command == "help":
                print_header()
            
            elif command == "ask":
                question = input("\nQuestion: ").strip()
                if question:
                    print("\nSearching...")
                    result = qa_system.ask(question)
                    
                    if "error" in result:
                        print(f"❌ {result['error']}\n")
                    else:
                        print(f"\nAnswer:\n{result['answer']}")
                        print(f"\nConfidence: {result['confidence']}")
                        print(f"(Type 'sources' to see source documents)\n")
            
            elif command == "sources":
                qa_system.show_sources()
                print()
            
            elif command == "history":
                qa_system.show_history()
                print()
            
            elif command == "stats":
                stats = qa_system.get_stats()
                print("\nSystem Statistics:")
                print("-" * 40)
                print(f"Documents loaded: {stats['documents_loaded']}")
                print(f"Chunks created: {stats['chunks_created']}")
                print(f"Queries processed: {stats['queries']}")
                print()
            
            elif command == "reload":
                qa_system.reload_documents()
            
            elif command == "export":
                filename = input("Filename [qa_history.json]: ").strip()
                if not filename:
                    filename = "qa_history.json"
                qa_system.export_history(filename)
                print()
            
            else:
                print(f"Unknown command: '{command}'. Type 'help' for available commands.\n")
        
        except KeyboardInterrupt:
            print("\n\nInterrupted. Type 'quit' to exit.\n")
        except Exception as e:
            print(f"\n❌ Error: {e}\n")


if __name__ == "__main__":
    main()
```

**Requirements File:**

```text
# requirements.txt
langchain==0.1.0
openai==1.0.0
chromadb==0.4.15
tiktoken==0.5.1
python-dotenv==1.0.0
pypdf==3.17.0
```

**README.md:**

```markdown
# Document Q&A System

AI-powered question-answering system that uses RAG (Retrieval-Augmented Generation) to answer questions based on your document collection.

## Features

- 📄 Load documents from directory
- 🔍 Semantic search with vector embeddings
- 💬 Interactive command-line interface
- 📚 Source attribution for answers
- 📊 Query statistics and history
- 💾 Export Q&A history

## Setup

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Configure API key:**

Create `.env` file:
```
OPENAI_API_KEY=sk-your-key-here
```

3. **Add documents:**

Place your .txt files in the `documents/` folder

4. **Run:**
```bash
python app.py
```

## Usage

Type commands at the `>` prompt:
- `ask` - Ask a question about your documents
- `sources` - View sources for last answer
- `history` - See recent Q&A pairs
- `stats` - System statistics
- `reload` - Reload documents
- `export` - Export history to JSON
- `quit` - Exit

## Configuration

Edit `config` dict in `app.py`:
```python
config = {
    "documents_dir": "./documents",  # Documents folder
    "chunk_size": 1000,              # Chunk size (characters)
    "chunk_overlap": 200,            # Overlap between chunks
    "retrieval_k": 4,                # Number of docs to retrieve
    "model": "gpt-3.5-turbo",        # OpenAI model
    "temperature": 0                 # LLM temperature
}
```

## Architecture

- **Embeddings:** OpenAI text-embedding-ada-002
- **Vector Database:** Chroma (persistent storage)
- **LLM:** GPT-3.5-turbo
- **Chunking:** Recursive character splitter
- **Retrieval:** Similarity search (top K)

## Example Session

```
> ask
Question: What is the refund policy?

Answer: You can request a full refund within 30 days of purchase...

Confidence: High
(Type 'sources' to see source documents)

> sources
Sources used for last answer:
1. refund_policy.txt
   Our refund policy is simple: 30-day money-back guarantee...

> stats
System Statistics:
Documents loaded: 5
Chunks created: 23
Queries processed: 1
```

## Testing

Test with various document types and queries:
- Factual questions (direct answers in docs)
- Conceptual questions (synthesis required)
- Questions not in documents (should say "don't know")

## Troubleshooting

**No documents found:**
- Check `documents/` folder exists
- Add .txt files to the folder
- Run `reload` command

**Poor answer quality:**
- Adjust `chunk_size` (try 500-1500)
- Increase `retrieval_k` (try 6-8)
- Improve document quality and formatting

## License

MIT
```

---

## Common Student Mistakes & Solutions

### Mistake 1: Documents not loading
**Problem:** Empty vector store

**Solution:**
```python
# Always check if directory exists and has files
if not os.path.exists(docs_dir):
    raise ValueError(f"Directory not found: {docs_dir}")

files = list(Path(docs_dir).glob("**/*.txt"))
if len(files) == 0:
    raise ValueError("No .txt files found")
```

### Mistake 2: Poor chunking
**Problem:** Chunks too large/small

**Solution:**
- Target 1000 chars for most use cases
- Use 200 char overlap (20%)
- Test with your specific documents

### Mistake 3: Not handling errors
**Problem:** System crashes on API errors

**Solution:** Wrap all API calls in try-except

### Mistake 4: Ignoring metadata
**Problem:** Can't tell where answers come from

**Solution:** Always include metadata (source, page, etc.)

---

## Extension Ideas

1. **Multi-format support:** PDF, DOCX, Markdown
2. **Web UI:** Streamlit or Gradio frontend
3. **Conversational memory:** Remember previous questions
4. **Advanced retrieval:** MMR, re-ranking
5. **Answer citations:** Inline source references
6. **Evaluation metrics:** Automated quality testing

---

*Module 3 Solution Guide | Building AI-Powered Applications*
