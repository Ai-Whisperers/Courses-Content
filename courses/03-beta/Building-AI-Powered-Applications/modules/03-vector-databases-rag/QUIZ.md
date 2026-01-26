# Module 3 Quiz: Vector Databases & RAG

**Instructions**: Answer all questions. Select the best answer for multiple choice questions. For scenario questions, provide brief explanations.

**Passing Score**: 70% (14 out of 20 points)

**Time Limit**: 25 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is the PRIMARY purpose of RAG (Retrieval-Augmented Generation)?

A) To make LLMs run faster
B) To ground LLM responses in specific, retrieved documents
C) To reduce API costs
D) To train new AI models

### Question 2
What are embeddings in the context of RAG systems?

A) Images embedded in documents
B) Dense vector representations that capture semantic meaning
C) Database indexes for fast lookup
D) Encryption keys for secure storage

### Question 3
Why is text chunking important before creating embeddings?

A) To make text more readable
B) To fit within embedding model token limits and improve retrieval precision
C) To reduce storage costs
D) To encrypt sensitive information

### Question 4
What does cosine similarity measure between two vectors?

A) The physical distance between vectors
B) The angle between vectors (semantic similarity)
C) The length of vectors
D) The number of matching elements

### Question 5
Which chunking strategy is BEST for preserving sentence and paragraph boundaries?

A) Character-based splitting
B) Recursive character text splitting
C) Fixed-size byte splitting
D) Random splitting

### Question 6
What is the purpose of chunk overlap in text splitting?

A) To increase storage requirements
B) To preserve context at chunk boundaries
C) To create duplicate data for backup
D) To slow down retrieval

### Question 7
What is MMR (Maximum Marginal Relevance) used for in retrieval?

A) Maximizing the number of results
B) Balancing relevance with diversity in retrieved documents
C) Measuring retrieval speed
D) Compressing document size

### Question 8
In a RAG pipeline, when does the LLM receive the retrieved documents?

A) During the embedding creation phase
B) In the prompt, as context for generating the response
C) After generating the response for fact-checking
D) The LLM never sees the documents

### Question 9
What is a "parent document retriever" pattern?

A) Retrieving documents from a parent folder
B) Retrieving small chunks but returning larger parent documents for context
C) A system for organizing document hierarchies
D) Authentication for document access

### Question 10
What embedding dimension does OpenAI's text-embedding-ada-002 produce?

A) 256
B) 768
C) 1536
D) 4096

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: Vector databases store embeddings and enable fast similarity search.

### Question 12
True or False: Larger chunks always produce better retrieval results.

### Question 13
True or False: You can filter vector search results by metadata (e.g., date, source).

### Question 14
True or False: RAG eliminates the possibility of LLM hallucinations.

### Question 15
True or False: The same embedding model must be used for both indexing documents and querying.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario**: Your RAG system retrieves documents but the LLM's answers don't accurately reflect the retrieved content.

**Question**: What is the MOST likely issue?

A) The vector database is corrupted
B) The prompt template doesn't properly instruct the LLM to use the context
C) The embedding model is too slow
D) The documents are too short

### Question 17
**Scenario**: Users complain that the system sometimes retrieves irrelevant documents that happen to share keywords with the query.

**Question**: What improvement should you consider?

A) Use larger chunk sizes
B) Switch from keyword search to semantic similarity with embeddings
C) Remove all metadata filtering
D) Reduce the number of retrieved documents to 1

### Question 18
**Scenario**: Your document corpus contains 10 million chunks and similarity search is taking 5+ seconds.

**Question**: What is the BEST optimization approach?

A) Use a smaller embedding model
B) Implement approximate nearest neighbor (ANN) indexing like HNSW
C) Reduce the embedding dimensions by truncation
D) Search fewer documents by random sampling

### Question 19
**Scenario**: You're building a RAG system for legal documents where accuracy is critical and users need to verify sources.

**Question**: What feature is MOST important to implement?

A) Faster response times
B) Source attribution showing which documents were used
C) Larger context windows
D) More creative responses

### Question 20
**Scenario**: Your RAG system works well for recent documents but fails on questions about events from 2 years ago.

**Question**: What is the MOST likely cause?

A) Vector database doesn't support old data
B) Documents from 2 years ago were not indexed or have been removed
C) Embedding models can't represent old information
D) LLMs have a knowledge cutoff that blocks old queries

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - To ground LLM responses in specific, retrieved documents
   - *Explanation: RAG retrieves relevant documents and provides them as context, reducing hallucination and adding specificity.*

2. **B** - Dense vector representations that capture semantic meaning
   - *Explanation: Embeddings are numerical vectors where similar meanings are close in vector space.*

3. **B** - To fit within embedding model token limits and improve retrieval precision
   - *Explanation: Chunking ensures text fits model limits and smaller chunks enable more precise retrieval.*

4. **B** - The angle between vectors (semantic similarity)
   - *Explanation: Cosine similarity measures directional similarity regardless of magnitude; 1.0 means identical direction.*

5. **B** - Recursive character text splitting
   - *Explanation: Recursive splitting tries paragraph, then sentence, then word boundaries progressively.*

6. **B** - To preserve context at chunk boundaries
   - *Explanation: Overlap ensures information at boundaries isn't lost and provides context continuity.*

7. **B** - Balancing relevance with diversity in retrieved documents
   - *Explanation: MMR selects documents that are both relevant and different from already-selected ones.*

8. **B** - In the prompt, as context for generating the response
   - *Explanation: Retrieved documents are inserted into the prompt so the LLM can reference them in its answer.*

9. **B** - Retrieving small chunks but returning larger parent documents for context
   - *Explanation: This pattern improves precision (small chunks) while providing full context (parent documents).*

10. **C** - 1536
    - *Explanation: text-embedding-ada-002 produces 1536-dimensional vectors.*

### Section 2: True/False

11. **True** - Vector databases are specialized for storing embeddings and performing efficient similarity search (cosine, dot product, etc.).

12. **False** - Larger chunks may dilute relevance; optimal chunk size depends on the use case and retrieval precision needs.

13. **True** - Most vector databases support metadata filtering to narrow results by date, source, category, etc.

14. **False** - RAG reduces hallucinations by providing context but doesn't eliminate them; the LLM can still misinterpret or ignore context.

15. **True** - Query embeddings must be in the same vector space as document embeddings; using different models would produce incompatible vectors.

### Section 3: Scenario-Based

16. **B** - The prompt template doesn't properly instruct the LLM to use the context
    - *Explanation: The LLM needs explicit instructions to base its answer on the provided context.*

17. **B** - Switch from keyword search to semantic similarity with embeddings
    - *Explanation: Semantic search understands meaning, not just keyword matching.*

18. **B** - Implement approximate nearest neighbor (ANN) indexing like HNSW
    - *Explanation: ANN algorithms like HNSW trade small accuracy for massive speed improvements at scale.*

19. **B** - Source attribution showing which documents were used
    - *Explanation: Legal applications require verifiable sources for accuracy and accountability.*

20. **B** - Documents from 2 years ago were not indexed or have been removed
    - *Explanation: RAG can only retrieve documents that are in the index; missing documents won't appear in results.*

---

## Scoring Guide

| Score | Grade | Performance Level |
|-------|-------|-------------------|
| 18-20 | A | Excellent - Strong grasp of RAG concepts |
| 16-17 | B | Good - Solid understanding with minor gaps |
| 14-15 | C | Satisfactory - Meets minimum requirements |
| Below 14 | F | Review module content and retake quiz |

---

## Review Recommendations

**If you scored below 70%**, review these sections:

- Questions 1-3 wrong: Review "What is RAG?" and "Vector Embeddings"
- Questions 4-6 wrong: Review "Text Splitting Strategies" and "Similarity Search"
- Questions 7-10 wrong: Review "Retrieval Strategies" and "Advanced RAG Patterns"
- Scenario questions wrong: Review the complete module and build the exercise RAG system

**Next Steps:**
- Complete Module 3 Exercise if not done
- Proceed to Module 4: AI Agents & Tools

---

*Quiz 3 of 6 | Building AI-Powered Applications | 20 points total*
