# Module 4 Quiz: Embeddings & Vector Databases

**Instructions**: Answer all questions. Select the best answer for multiple choice questions.

**Passing Score**: 70% (14 out of 20 points)

**Time Limit**: 20 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What do embeddings represent?

A) A compression of text to save storage
B) Numerical vectors that capture semantic meaning
C) Encrypted versions of text for security
D) Word counts in a document

### Question 2
What does a cosine similarity of 0.95 between two embeddings indicate?

A) The texts are completely different
B) The texts are semantically very similar
C) One text is 95% longer than the other
D) The embedding failed

### Question 3
What is the dimension of OpenAI's text-embedding-3-small model?

A) 256
B) 768
C) 1536
D) 3072

### Question 4
Which vector database is BEST for local development and prototyping?

A) Pinecone
B) Chroma
C) Amazon OpenSearch
D) Elasticsearch

### Question 5
What is "chunking" in the context of embeddings?

A) Compressing embeddings to save space
B) Splitting documents into smaller pieces before embedding
C) Grouping similar embeddings together
D) Deleting unnecessary embeddings

### Question 6
Why is chunk overlap important?

A) To reduce storage costs
B) To maintain context continuity between chunks
C) To speed up search
D) To reduce embedding dimensions

### Question 7
What does the `top_k` parameter in vector search control?

A) The minimum similarity score
B) The maximum number of results returned
C) The embedding dimension
D) The search timeout

### Question 8
What is hybrid search?

A) Searching across multiple databases
B) Combining semantic and keyword search
C) Using multiple embedding models
D) Searching with multiple queries

### Question 9
What's the PRIMARY advantage of managed vector databases like Pinecone?

A) Always free
B) Handles scaling, availability, and infrastructure
C) Faster embeddings
D) Better embedding quality

### Question 10
When would you reduce embedding dimensions (e.g., from 3072 to 256)?

A) When you need the highest possible quality
B) When you need faster search and lower storage costs
C) When working with very short texts
D) When using keyword search only

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: Embeddings from different models (e.g., OpenAI vs. Cohere) are directly comparable and interchangeable.

### Question 12
True or False: Smaller chunks generally improve retrieval precision but may lose broader context.

### Question 13
True or False: Vector databases store the original text along with the embedding vectors.

### Question 14
True or False: Euclidean distance and cosine similarity will always rank documents in the same order.

### Question 15
True or False: Once documents are indexed, you should regenerate all embeddings if you switch to a different embedding model.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario**: Your semantic search returns relevant documents, but misses documents containing exact technical terms like "API" or "OAuth2".

**Question**: What's the BEST solution?

A) Use larger chunks
B) Implement hybrid search combining semantic and keyword matching
C) Increase the number of results
D) Use a different embedding model

### Question 17
**Scenario**: You're building a legal document search system with 100,000 documents averaging 50 pages each.

**Question**: What's the MOST important consideration?

A) Using the smallest embedding model possible
B) Proper chunking strategy with overlap and meaningful boundaries
C) Storing documents in plain text files
D) Using only keyword search

### Question 18
**Scenario**: Your search system returns too many irrelevant results with low similarity scores.

**Question**: What should you adjust?

A) Increase top_k to get more results
B) Implement a minimum similarity threshold filter
C) Use smaller embeddings
D) Remove all metadata

### Question 19
**Scenario**: Users complain that search for "ML" doesn't find documents about "machine learning".

**Question**: What's the BEST solution?

A) Add "ML = machine learning" to every document
B) Expand query with synonyms before embedding, or use hybrid search
C) Increase chunk size
D) Use exact string matching only

### Question 20
**Scenario**: Your embedding API costs are very high because you're re-embedding all documents daily.

**Question**: What's the BEST optimization?

A) Switch to a more expensive model
B) Store embeddings and only regenerate when source content changes
C) Reduce the number of documents
D) Use smaller chunks

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - Numerical vectors that capture semantic meaning
   - *Explanation: Embeddings encode semantic relationships in dense vectors.*

2. **B** - The texts are semantically very similar
   - *Explanation: Cosine similarity ranges from -1 to 1; 0.95 indicates very high similarity.*

3. **C** - 1536
   - *Explanation: text-embedding-3-small produces 1536-dimensional vectors.*

4. **B** - Chroma
   - *Explanation: Chroma is designed for local development with easy setup and no external dependencies.*

5. **B** - Splitting documents into smaller pieces before embedding
   - *Explanation: Chunking breaks documents into embeddable segments that fit context limits.*

6. **B** - To maintain context continuity between chunks
   - *Explanation: Overlap ensures important context isn't lost at chunk boundaries.*

7. **B** - The maximum number of results returned
   - *Explanation: top_k limits how many nearest neighbors are retrieved.*

8. **B** - Combining semantic and keyword search
   - *Explanation: Hybrid search merges embedding-based and keyword-based results.*

9. **B** - Handles scaling, availability, and infrastructure
   - *Explanation: Managed services eliminate operational burden.*

10. **B** - When you need faster search and lower storage costs
    - *Explanation: Dimension reduction trades some quality for performance/cost benefits.*

### Section 2: True/False

11. **False** - Embeddings from different models exist in different vector spaces and cannot be mixed.

12. **True** - Smaller chunks are more precise but may lack surrounding context needed for understanding.

13. **True** - Most vector databases store metadata (including original text) alongside vectors for retrieval.

14. **False** - They can produce different rankings, especially for vectors of different magnitudes.

15. **True** - Different models produce incompatible vector spaces; all embeddings must be regenerated.

### Section 3: Scenario-Based

16. **B** - Implement hybrid search combining semantic and keyword matching
    - *Explanation: Hybrid search catches exact terms that semantic search might miss.*

17. **B** - Proper chunking strategy with overlap and meaningful boundaries
    - *Explanation: Poor chunking ruins retrieval quality regardless of other factors.*

18. **B** - Implement a minimum similarity threshold filter
    - *Explanation: Thresholds filter out low-confidence matches.*

19. **B** - Expand query with synonyms before embedding, or use hybrid search
    - *Explanation: Abbreviations need special handling via expansion or keyword matching.*

20. **B** - Store embeddings and only regenerate when source content changes
    - *Explanation: Cache embeddings to avoid redundant API calls; use content hashing to detect changes.*

---

## Scoring Guide

| Score | Grade | Performance Level |
|-------|-------|-------------------|
| 18-20 | A | Excellent - Ready for RAG implementation |
| 16-17 | B | Good - Solid understanding |
| 14-15 | C | Satisfactory - Review chunking and search |
| Below 14 | F | Review module content |

---

## Review Recommendations

**If you scored below 70%**, review these sections:

- Questions 1-4 wrong: Review "Understanding Embeddings"
- Questions 5-7 wrong: Review "Document Processing Pipeline"
- Questions 8-10 wrong: Review "Implementing Similarity Search"
- Scenario questions wrong: Complete the hands-on exercises

---

*Quiz 4 of 12 | Building AI-Powered Applications | 20 points total*
