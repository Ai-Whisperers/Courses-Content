# Module 8 Quiz: Agentic Design Patterns

**Time Limit**: 20 minutes
**Passing Score**: 70%

---

## Multiple Choice (2 points each)

### Question 1
What is prompt chaining?

a) Using multiple AI providers
b) Breaking complex tasks into sequential prompts
c) Running the same prompt multiple times
d) Combining multiple responses

---

### Question 2
What is the reflection pattern?

a) Copying test code
b) AI reviewing and improving its own output
c) Mirroring production data
d) Reversing test order

---

### Question 3
When should you use parallelization?

a) For sequential dependent tasks
b) When tasks are independent
c) Never
d) Only for unit tests

---

### Question 4
What is RAG in the context of AI testing?

a) Random Access Generation
b) Retrieval-Augmented Generation
c) Rapid Automated Generation
d) Review And Generate

---

### Question 5
What is the benefit of prompt chaining over single large prompts?

a) Faster execution
b) Better control and focused outputs
c) Less expensive
d) Simpler prompts

---

## True/False (1 point each)

### Question 6
Agentic patterns can be combined for complex workflows.

- [ ] True
- [ ] False

---

### Question 7
Parallelization always produces better results than sequential processing.

- [ ] True
- [ ] False

---

### Question 8
Reflection pattern requires multiple rounds of AI interaction.

- [ ] True
- [ ] False

---

### Question 9
Tool use pattern allows AI to gather context before generating tests.

- [ ] True
- [ ] False

---

### Question 10
Each agentic pattern is suited for every type of testing task.

- [ ] True
- [ ] False

---

## Short Answer (5 points each)

### Question 11
List four agentic design patterns and when to use each.

1. _____________ : Use when _________________________
2. _____________ : Use when _________________________
3. _____________ : Use when _________________________
4. _____________ : Use when _________________________

---

### Question 12
Design a prompt chain for generating E2E tests. List 4 steps.

1. _____________________________________________
2. _____________________________________________
3. _____________________________________________
4. _____________________________________________

---

### Question 13
Explain how the reflection pattern improves test quality.

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## Practical (10 points)

### Question 14
Design an agentic workflow for testing a payment processing module. Include:

**Module to test:**
- `processPayment()`
- `refundPayment()`
- `getTransactionHistory()`

**Your workflow:**

Pattern(s) used: _____________________________________________

Step 1: _____________________________________________
_____________________________________________

Step 2: _____________________________________________
_____________________________________________

Step 3: _____________________________________________
_____________________________________________

Step 4: _____________________________________________
_____________________________________________

Why this approach?
_________________________________________________________________
_________________________________________________________________

---

## Answer Key

*(For instructor use)*

1. b
2. b
3. b
4. b
5. b
6. True
7. False
8. True
9. True
10. False

### Question 11 (5 points)
Patterns and uses:
- Prompt Chaining: Complex multi-step tasks
- Reflection: Improving quality iteratively
- Parallelization: Independent tasks at scale
- RAG: When external knowledge is needed
- Tool Use: When context gathering is needed
- Guardrails: When output validation is critical
(1.25 points each for any 4)

### Question 12 (5 points)
Chain steps (examples):
1. Analyze user flows and create test scenarios
2. Generate Page Object Model
3. Implement test cases for each scenario
4. Review and add error handling
(1.25 points each)

### Question 13 (5 points)
Should explain:
- AI reviews its own output (1 point)
- Identifies weaknesses/gaps (1 point)
- Generates improvements (1 point)
- Can iterate multiple rounds (1 point)
- Results in higher quality than single pass (1 point)

### Question 14 (10 points)

Good answers include:

Pattern: Prompt Chaining + Parallelization (or similar)

Steps example:
1. **Tool Use**: Read code and gather context (2 points)
2. **Parallelization**: Generate tests for each function in parallel (3 points)
3. **Reflection**: Review generated tests for gaps (3 points)
4. **Aggregation**: Combine and resolve conflicts (2 points)

Why: Payment processing needs thorough testing (security, accuracy), parallelization saves time, reflection ensures quality.

Alternative valid workflows accepted if well-reasoned.

---

## Scoring

- Multiple Choice: 10 points
- True/False: 5 points
- Short Answer: 15 points
- Practical: 10 points
- **Total: 40 points**

**Passing: 28+ points (70%)**
