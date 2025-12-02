# Module 5 Quiz: RAG Implementation

**Instructions**: Answer all questions. Select the best answer for multiple choice questions.

**Passing Score**: 70% (14 out of 20 points)

**Time Limit**: 20 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is the PRIMARY purpose of RAG (Retrieval-Augmented Generation)?

A) To make models faster
B) To ground LLM responses in specific, retrieved documents
C) To replace embeddings
D) To eliminate the need for prompts

### Question 2
In a RAG pipeline, what happens FIRST when a user asks a question?

A) The LLM generates an answer
B) The context is assembled
C) The query is embedded and used for retrieval
D) Documents are chunked

### Question 3
What is chunk overlap used for?

A) To increase storage requirements
B) To maintain context continuity between adjacent chunks
C) To speed up retrieval
D) To reduce the number of chunks

### Question 4
What is Reciprocal Rank Fusion (RRF)?

A) A chunking strategy
B) A method to combine results from multiple retrieval systems
C) An embedding model
D) A type of vector database

### Question 5
Which retrieval method is BEST for finding exact technical terms like "OAuth2" or "HTTP 404"?

A) Dense (semantic) retrieval only
B) Sparse (keyword/BM25) retrieval
C) Random sampling
D) Larger chunk sizes

### Question 6
What is the purpose of a reranker in RAG?

A) To split documents into chunks
B) To improve precision by re-scoring retrieved documents
C) To generate embeddings
D) To format the output

### Question 7
When building context, why is token counting important?

A) To charge users correctly
B) To ensure context fits within the LLM's context window
C) To make responses longer
D) To improve embedding quality

### Question 8
What should a RAG system do if retrieved documents don't contain relevant information?

A) Make up an answer anyway
B) Return an error
C) Acknowledge the lack of information and not hallucinate
D) Search the web instead

### Question 9
What is "grounding" in the context of RAG?

A) Connecting the system to ground truth data
B) Ensuring responses are based on retrieved documents rather than model knowledge
C) Embedding documents into the ground
D) Training the model on new data

### Question 10
Which metric measures what fraction of retrieved documents are actually relevant?

A) Recall
B) Precision
C) F1 Score
D) Accuracy

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: RAG eliminates the possibility of LLM hallucinations entirely.

### Question 12
True or False: Hybrid retrieval combining dense and sparse methods typically outperforms either method alone.

### Question 13
True or False: The same embedding model must be used for both indexing documents and embedding queries.

### Question 14
True or False: Smaller chunks always provide better retrieval results.

### Question 15
True or False: In RAG, the retrieved documents are included in the prompt sent to the LLM.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario**: Your RAG system retrieves relevant documents but the LLM answers include information not found in those documents.

**Question**: What is the MOST likely issue?

A) The embedding model is too small
B) The system prompt doesn't sufficiently instruct the model to use only the context
C) The chunks are too large
D) The vector database is corrupted

### Question 17
**Scenario**: Users search for "ML" but don't find documents about "machine learning".

**Question**: What's the BEST solution?

A) Use larger chunk sizes
B) Implement hybrid search combining semantic and keyword retrieval
C) Remove all abbreviations from documents
D) Use a more expensive model

### Question 18
**Scenario**: Your RAG system with 500-character chunks often returns incomplete answers because relevant information is split across chunks.

**Question**: What should you adjust?

A) Remove chunk overlap entirely
B) Increase chunk size and/or overlap to preserve context
C) Use smaller chunks
D) Index fewer documents

### Question 19
**Scenario**: Your RAG system sometimes cites the wrong source for information in its answer.

**Question**: What's the BEST approach to fix this?

A) Remove source citations entirely
B) Use a reranker and ensure the generation prompt emphasizes accurate citation
C) Use larger chunks
D) Disable retrieval

### Question 20
**Scenario**: Your RAG retrieval is fast but the overall response time is slow (8-10 seconds).

**Question**: What's the MOST likely bottleneck?

A) Vector database query
B) Embedding generation for the query
C) LLM generation (especially with large context)
D) Document chunking

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - To ground LLM responses in specific, retrieved documents
   - *Explanation: RAG retrieves relevant documents to provide factual grounding for LLM answers.*

2. **C** - The query is embedded and used for retrieval
   - *Explanation: RAG starts by retrieving relevant documents based on the query embedding.*

3. **B** - To maintain context continuity between adjacent chunks
   - *Explanation: Overlap ensures important context isn't lost at chunk boundaries.*

4. **B** - A method to combine results from multiple retrieval systems
   - *Explanation: RRF merges ranked lists by summing reciprocal ranks: 1/(k + rank).*

5. **B** - Sparse (keyword/BM25) retrieval
   - *Explanation: Exact terms need keyword matching; semantic search may miss specific terminology.*

6. **B** - To improve precision by re-scoring retrieved documents
   - *Explanation: Rerankers (cross-encoders) provide more accurate relevance scores than bi-encoders.*

7. **B** - To ensure context fits within the LLM's context window
   - *Explanation: Exceeding token limits causes errors or truncation.*

8. **C** - Acknowledge the lack of information and not hallucinate
   - *Explanation: Honest uncertainty is better than hallucinated answers.*

9. **B** - Ensuring responses are based on retrieved documents rather than model knowledge
   - *Explanation: Grounding constrains the model to provided context.*

10. **B** - Precision
    - *Explanation: Precision = relevant retrieved / total retrieved.*

### Section 2: True/False

11. **False** - RAG reduces but doesn't eliminate hallucinations; the LLM can still deviate from context.

12. **True** - Hybrid retrieval captures both semantic similarity and exact keyword matches.

13. **True** - Query and document embeddings must be in the same vector space to be comparable.

14. **False** - Too-small chunks lose context; optimal size depends on content and use case.

15. **True** - Retrieved documents are assembled into the prompt as context for the LLM.

### Section 3: Scenario-Based

16. **B** - The system prompt doesn't sufficiently instruct the model to use only the context
    - *Explanation: Strong grounding instructions in the prompt reduce off-context responses.*

17. **B** - Implement hybrid search combining semantic and keyword retrieval
    - *Explanation: Hybrid search catches exact terms that semantic search might miss.*

18. **B** - Increase chunk size and/or overlap to preserve context
    - *Explanation: Larger chunks with overlap keep related information together.*

19. **B** - Use a reranker and ensure the generation prompt emphasizes accurate citation
    - *Explanation: Better ranking and explicit citation instructions improve accuracy.*

20. **C** - LLM generation (especially with large context)
    - *Explanation: LLM inference with large contexts is typically the slowest component.*

---

## Scoring Guide

| Score | Grade | Performance Level |
|-------|-------|-------------------|
| 18-20 | A | Excellent - Ready for production RAG |
| 16-17 | B | Good - Solid understanding |
| 14-15 | C | Satisfactory - Review retrieval strategies |
| Below 14 | F | Review module content |

---

## Review Recommendations

**If you scored below 70%**, review these sections:

- Questions 1-4 wrong: Review "RAG Architecture"
- Questions 5-7 wrong: Review "Retrieval Strategies"
- Questions 8-10 wrong: Review "Context Assembly and Generation"
- Scenario questions wrong: Complete the hands-on lab

---

*Quiz 5 of 12 | Building AI-Powered Applications | 20 points total*
