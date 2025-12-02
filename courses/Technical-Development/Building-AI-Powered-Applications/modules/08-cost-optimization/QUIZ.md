# Module 8 Quiz: Cost Optimization

**Total Points:** 20
**Passing Score:** 14/20 (70%)
**Time Limit:** 25 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
Approximately how many tokens does a typical English word consume?

A) 0.5 tokens
B) 1.3 tokens (1 token ≈ 0.75 words)
C) 2 tokens
D) 4 tokens

### Question 2
Which optimization technique typically provides the LARGEST cost reduction?

A) Prompt compression
B) Semantic caching
C) Model tiering alone
D) Output length limits

### Question 3
At what similarity threshold should semantic cache return a cached response?

A) Any match above 0%
B) 70-80% similarity
C) 90-95% similarity
D) 100% exact match only

### Question 4
What is the PRIMARY purpose of model tiering?

A) To make all responses faster
B) To match task complexity with appropriate model capability and cost
C) To use only the cheapest model
D) To train new models

### Question 5
Which cost typically dominates at HIGH request volumes?

A) Output tokens
B) Embedding generation
C) System prompt tokens (fixed cost per request)
D) User input tokens

### Question 6
What should happen when a semantic cache query finds no match above threshold?

A) Return the closest match anyway
B) Return null and proceed to generate fresh response
C) Lower the threshold automatically
D) Cache the query for later

### Question 7
When implementing model routing, what should classify the request FIRST?

A) Always use the LLM classifier
B) Quick heuristics (free) before LLM classification
C) User preference
D) Random selection

### Question 8
What is a key benefit of exact match caching over semantic caching?

A) Higher hit rates
B) No embedding API costs and faster lookups
C) Better response quality
D) Works offline

### Question 9
At what budget percentage should warning alerts typically trigger?

A) 50%
B) 70-80%
C) 95%
D) 100%

### Question 10
Which metric BEST measures caching effectiveness?

A) Total requests
B) Cache hit rate combined with estimated savings
C) Response latency
D) Number of cached entries

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: Semantic caching requires generating embeddings for every query, adding some cost.

### Question 12
True or False: System prompts should be as detailed as possible to improve response quality.

### Question 13
True or False: Model tiering should automatically fall back to higher tiers if quality is poor.

### Question 14
True or False: Cache TTL (time-to-live) should be set to infinity for maximum cost savings.

### Question 15
True or False: Cost monitoring should track spend by feature to identify optimization opportunities.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario:** Your application has these metrics:
- 10,000 requests/day
- Average 2,000 tokens per request
- Using GPT-4o ($12.50 per 1M tokens combined)
- No caching implemented

**Question:** What is the approximate daily cost?

A) $25
B) $250
C) $2,500
D) $25,000

### Question 17
**Scenario:** After implementing semantic caching with 60% hit rate:
- 10,000 requests/day
- Cache hits cost $0 (excluding infrastructure)
- Cache misses use full API

**Question:** Using the same pricing from Question 16, what is the NEW approximate daily cost?

A) $25
B) $100
C) $250
D) $500

### Question 18
**Scenario:** Your model router classifies a request as BUDGET tier, but the user complains the response quality is poor.

**Question:** What is the BEST architectural solution?

A) Always use PREMIUM tier
B) Implement quality verification with automatic tier escalation
C) Let users manually select the model
D) Remove model tiering entirely

### Question 19
**Scenario:** Your cost monitoring shows:
- Feature A: $500/day (customer support chatbot)
- Feature B: $50/day (search)
- Feature C: $30/day (summarization)

Feature A has 70% repeated questions.

**Question:** Where should you focus optimization efforts?

A) Feature B (it's the middle ground)
B) Feature C (it's the cheapest, easier to optimize)
C) Feature A (highest spend + high repetition = best caching opportunity)
D) All features equally

### Question 20
**Scenario:** Your semantic cache has these stats:
- Hit rate: 40%
- Average tokens saved per hit: 2,000
- Embedding cost per query: $0.0001
- Queries per day: 5,000

Model cost: $10 per 1M tokens

**Question:** Is the semantic cache cost-effective?

A) No, embedding costs exceed savings
B) Yes, savings far exceed embedding costs
C) Need more information
D) Break even

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - 1.3 tokens (1 token ≈ 0.75 words)
   - *One word averages about 1.3 tokens; 100 tokens ≈ 75 words.*

2. **B** - Semantic caching
   - *Caching eliminates entire API calls; typical savings are 40-70% with good hit rates.*

3. **C** - 90-95% similarity
   - *High threshold ensures semantically similar queries return appropriate cached responses without false matches.*

4. **B** - To match task complexity with appropriate model capability and cost
   - *Simple tasks don't need expensive models; complex tasks need capable ones.*

5. **C** - System prompt tokens (fixed cost per request)
   - *System prompts are included in every request; at scale, this fixed overhead dominates.*

6. **B** - Return null and proceed to generate fresh response
   - *No match above threshold means the cache can't reliably serve the request.*

7. **B** - Quick heuristics (free) before LLM classification
   - *Heuristics cost nothing; use LLM only for ambiguous cases.*

8. **B** - No embedding API costs and faster lookups
   - *Exact match is simple hash lookup; semantic requires embedding generation.*

9. **B** - 70-80%
   - *Early warning allows time to investigate and take action before budget exhaustion.*

10. **B** - Cache hit rate combined with estimated savings
    - *Hit rate alone doesn't show value; combine with token/cost savings for full picture.*

### Section 2: True/False

11. **True** - Semantic caching requires embedding generation, which has a small cost (typically $0.0001 per query with text-embedding-3-small).

12. **False** - System prompts should be concise and efficient; every token costs money on every request.

13. **True** - Quality-aware routing should escalate to higher tiers when lower tier quality is insufficient.

14. **False** - Cache entries should expire to handle data/context changes and manage storage costs.

15. **True** - Feature-level tracking identifies where optimization efforts will have the most impact.

### Section 3: Scenario-Based

16. **B** - $250
    - *Calculation: 10,000 × 2,000 tokens = 20M tokens/day. 20M × ($12.50/1M) = $250/day*

17. **B** - $100
    - *With 60% hit rate, only 40% of requests hit API: $250 × 0.40 = $100/day*

18. **B** - Implement quality verification with automatic tier escalation
    - *This balances cost optimization with quality requirements automatically.*

19. **C** - Feature A (highest spend + high repetition = best caching opportunity)
    - *$500/day with 70% repetition means potential savings of $350/day from caching.*

20. **B** - Yes, savings far exceed embedding costs
    - *Calculation:*
    - *Hits: 5,000 × 40% = 2,000 hits*
    - *Tokens saved: 2,000 × 2,000 = 4M tokens*
    - *Value saved: 4M × ($10/1M) = $40/day*
    - *Embedding cost: 5,000 × $0.0001 = $0.50/day*
    - *Net savings: $40 - $0.50 = $39.50/day*

---

## Scoring Guide

| Score | Grade | Interpretation |
|-------|-------|----------------|
| 18-20 | A | Excellent - Ready to optimize production AI costs |
| 16-17 | B | Good - Solid understanding with minor gaps |
| 14-15 | C | Satisfactory - Review caching and monitoring concepts |
| 12-13 | D | Needs Improvement - Revisit module content |
| Below 12 | F | Unsatisfactory - Complete module review required |

---

## Concept Review

If you scored below 70%, focus on these areas:

**Token Economics (Questions 1, 5, 16):**
- How tokens relate to words
- Cost calculation formulas
- Where costs accumulate at scale

**Caching Strategies (Questions 2, 3, 6, 8, 11, 17, 20):**
- Exact vs semantic caching tradeoffs
- Similarity thresholds
- ROI calculations

**Model Tiering (Questions 4, 7, 13, 18):**
- When to use which tier
- Routing heuristics
- Quality fallback patterns

**Monitoring (Questions 9, 10, 15, 19):**
- Alert thresholds
- Key metrics
- Optimization prioritization

---

## Cost Optimization Quick Reference

```
Optimization Priority Matrix
────────────────────────────────────────
                    High Impact
                         ▲
    ┌────────────────────┼────────────────────┐
    │                    │                    │
    │  Model Tiering     │  Semantic Caching  │
    │  (Low Effort)      │  (Medium Effort)   │
    │                    │                    │
Low ◄────────────────────┼────────────────────► High
Effort                   │                    Effort
    │                    │                    │
    │  Prompt Compress   │  Request Batching  │
    │  (Low Effort)      │  (High Effort)     │
    │                    │                    │
    └────────────────────┼────────────────────┘
                         ▼
                    Low Impact
```

---

*Quiz 8 of 12 | Building AI-Powered Applications | Duration: 25 minutes*
