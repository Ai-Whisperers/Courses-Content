# Module 1 Quiz: AI Application Architecture

**Instructions**: Answer all questions. Select the best answer for multiple choice questions.

**Passing Score**: 70% (14 out of 20 points)

**Time Limit**: 20 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
Which AI application pattern is BEST suited for a company knowledge base Q&A system?

A) Direct LLM integration
B) Retrieval-Augmented Generation (RAG)
C) Conversational AI
D) AI Agents

### Question 2
What is the PRIMARY limitation of direct LLM integration?

A) Too expensive for any use case
B) No knowledge of your private data or recent events
C) Cannot handle any text generation tasks
D) Requires complex infrastructure

### Question 3
Approximately how many tokens is a 1,000-word document?

A) 500 tokens
B) 750 tokens
C) 1,333 tokens
D) 2,000 tokens

### Question 4
When should you choose Claude 3.5 Haiku over GPT-4o?

A) When you need the highest quality output
B) When cost and speed are more important than maximum quality
C) When processing very long documents
D) When you need complex reasoning

### Question 5
What is the main purpose of semantic caching in AI applications?

A) To store conversation history
B) To reuse responses for similar (not identical) queries
C) To compress token usage
D) To improve model quality

### Question 6
Which component is unique to the RAG architecture pattern?

A) API gateway
B) Vector database
C) Load balancer
D) Authentication layer

### Question 7
What is the key characteristic of AI Agent architectures?

A) They only respond to direct questions
B) They can autonomously take actions and use tools
C) They have no memory between requests
D) They cannot access external data

### Question 8
For GDPR compliance, which AI application requirement is MOST important?

A) Using the most expensive model
B) Minimizing data collection and enabling user data deletion
C) Caching all responses
D) Using only US-based providers

### Question 9
What's the recommended approach for model selection in a new AI project?

A) Start with the cheapest model to save money
B) Start with a capable model and optimize later
C) Always use multiple models simultaneously
D) Only use open-source models

### Question 10
What is "hallucination" in the context of LLMs?

A) The model refusing to answer questions
B) The model generating false information confidently
C) The model producing slow responses
D) The model using too many tokens

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: LLMs are highly reliable for mathematical calculations and should be trusted for financial applications.

### Question 12
True or False: In a RAG system, retrieval quality directly affects the quality of LLM output.

### Question 13
True or False: API keys for LLM providers should be stored and used in frontend client code for simplicity.

### Question 14
True or False: Output tokens are typically more expensive than input tokens for most LLM providers.

### Question 15
True or False: A conversational AI application requires some form of state management to maintain context across turns.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario**: A startup is building an AI writing assistant with 500 users. They expect 100 requests per user per day. Average request uses 500 input tokens and generates 300 output tokens. Using GPT-4o ($2.50/1M input, $10/1M output).

**Question**: What is the approximate monthly cost?

A) $500
B) $1,500
C) $6,000
D) $15,000

### Question 17
**Scenario**: A legal tech company wants to build a contract analysis tool that can answer questions about a library of 10,000 contracts.

**Question**: Which architecture pattern is MOST appropriate?

A) Direct LLM integration with GPT-4 Turbo
B) RAG with vector database for contract retrieval
C) Simple chatbot with conversation history
D) AI Agent with web search capabilities

### Question 18
**Scenario**: Your AI application costs are 3x higher than budgeted. Analysis shows 40% of queries are simple FAQ-style questions, 60% require complex reasoning.

**Question**: What is the BEST optimization strategy?

A) Switch entirely to GPT-3.5 Turbo
B) Implement model tiering - route simple queries to cheaper models
C) Increase the budget to match costs
D) Reduce the number of allowed queries per user

### Question 19
**Scenario**: A healthcare company wants to build an AI assistant that helps nurses access patient protocols. The system must be HIPAA compliant.

**Question**: Which security consideration is MOST critical?

A) Using the fastest model available
B) Ensuring PII never leaves the company's infrastructure or using BAA-covered providers
C) Implementing caching for all responses
D) Using multiple LLM providers for redundancy

### Question 20
**Scenario**: Your AI chatbot sometimes provides incorrect information about company policies, leading to customer complaints.

**Question**: What is the BEST architectural solution?

A) Switch to a more expensive model
B) Add more examples to the prompt
C) Implement RAG to ground responses in verified policy documents
D) Reduce the temperature to 0

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - Retrieval-Augmented Generation (RAG)
   - *Explanation: RAG combines LLM capabilities with a knowledge base, ideal for company-specific Q&A.*

2. **B** - No knowledge of your private data or recent events
   - *Explanation: LLMs have knowledge cutoffs and don't know your private data without augmentation.*

3. **C** - 1,333 tokens
   - *Explanation: Roughly 1 token ≈ 0.75 words, so 1,000 words ≈ 1,333 tokens.*

4. **B** - When cost and speed are more important than maximum quality
   - *Explanation: Haiku is designed for high-speed, low-cost applications where maximum quality isn't required.*

5. **B** - To reuse responses for similar (not identical) queries
   - *Explanation: Semantic caching uses embeddings to match similar queries and return cached responses.*

6. **B** - Vector database
   - *Explanation: Vector databases store embeddings for semantic search, which is unique to RAG.*

7. **B** - They can autonomously take actions and use tools
   - *Explanation: Agents are characterized by their ability to use tools and take actions autonomously.*

8. **B** - Minimizing data collection and enabling user data deletion
   - *Explanation: GDPR core principles include data minimization and the right to erasure.*

9. **B** - Start with a capable model and optimize later
   - *Explanation: It's easier to optimize costs once you have a working system than to debug quality issues.*

10. **B** - The model generating false information confidently
    - *Explanation: Hallucination is when LLMs generate plausible-sounding but incorrect information.*

### Section 2: True/False

11. **False** - LLMs are unreliable for math; use calculators or code for calculations.

12. **True** - If retrieval returns irrelevant documents, the LLM will generate poor responses.

13. **False** - API keys should never be in frontend code; use server-side proxy.

14. **True** - Output tokens are typically 2-4x more expensive than input tokens.

15. **True** - Conversational AI needs state management to remember previous turns.

### Section 3: Scenario-Based

16. **C** - $6,000
    - *Calculation: 500 users × 100 requests × 30 days = 1.5M requests*
    - *Input: 1.5M × 500 = 750M tokens → 750 × $2.50 = $1,875*
    - *Output: 1.5M × 300 = 450M tokens → 450 × $10 = $4,500*
    - *Total: $1,875 + $4,500 = $6,375 ≈ $6,000*

17. **B** - RAG with vector database for contract retrieval
    - *Explanation: Large document libraries require RAG to retrieve relevant content before analysis.*

18. **B** - Implement model tiering - route simple queries to cheaper models
    - *Explanation: Model tiering lets you use expensive models only when needed, saving 40%+ on simple queries.*

19. **B** - Ensuring PII never leaves the company's infrastructure or using BAA-covered providers
    - *Explanation: HIPAA requires protection of PHI, which means either on-premise processing or BAA agreements.*

20. **C** - Implement RAG to ground responses in verified policy documents
    - *Explanation: RAG grounds LLM responses in authoritative sources, reducing hallucination.*

---

## Scoring Guide

| Score | Grade | Performance Level |
|-------|-------|-------------------|
| 18-20 | A | Excellent - Strong architecture foundation |
| 16-17 | B | Good - Ready for implementation |
| 14-15 | C | Satisfactory - Review weak areas |
| Below 14 | F | Review module content and retake quiz |

---

## Review Recommendations

**If you scored below 70%**, review these sections:

- Questions 1-3 wrong: Review "AI Application Patterns"
- Questions 4-6 wrong: Review "Choosing the Right Model"
- Questions 7-9 wrong: Review "LLM Capabilities and Limitations"
- Questions 10-12 wrong: Review "Cost Planning" section
- Questions 13-15 wrong: Review "Security and Compliance"
- Scenario questions wrong: Practice with the module exercises

---

*Quiz 1 of 12 | Building AI-Powered Applications | 20 points total*
