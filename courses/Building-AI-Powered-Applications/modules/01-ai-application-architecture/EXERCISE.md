# Module 1 Exercise: AI Application Architecture Design Lab

## Exercise Overview

**Objective**: Design AI application architectures for real-world scenarios, evaluating patterns, models, costs, and security requirements.

**Duration**: 2.5 hours

**Deliverables**: Architecture documents for 3 scenarios

---

## Part 1: Pattern Selection Analysis (30 minutes)

### Task 1.1: Match Patterns to Use Cases

For each scenario below, identify the most appropriate AI application pattern (Direct LLM, RAG, Conversational, or Agent) and justify your choice.

**Scenario A: Marketing Copy Generator**
A marketing team needs a tool that generates social media posts, email subject lines, and ad copy based on product descriptions and brand guidelines.

```
Pattern Selected: _______________

Justification:


Key Components Needed:


Data Requirements:
```

**Scenario B: Legal Contract Analyzer**
A law firm needs a system that can analyze contracts, answer questions about specific clauses, and compare contracts against a library of standard templates.

```
Pattern Selected: _______________

Justification:


Key Components Needed:


Data Requirements:
```

**Scenario C: Automated Research Assistant**
A research team needs an assistant that can search multiple databases, synthesize findings, generate reports, and iteratively refine results based on feedback.

```
Pattern Selected: _______________

Justification:


Key Components Needed:


Data Requirements:
```

**Scenario D: Customer Support Bot**
An e-commerce company needs a chatbot that handles order inquiries, processes returns, answers product questions, and escalates to human agents when needed.

```
Pattern Selected: _______________

Justification:


Key Components Needed:


Data Requirements:
```

### Task 1.2: Hybrid Pattern Design

Design a hybrid architecture that combines multiple patterns for this scenario:

**Scenario**: An AI-powered coding assistant that can:
- Answer questions about a company's codebase
- Generate new code following company standards
- Execute and test generated code
- Maintain conversation context across sessions

```
Architecture Diagram (ASCII):



Patterns Combined:
1.
2.
3.

Data Flow Description:



Key Technical Decisions:
```

---

## Part 2: Model Selection Exercise (30 minutes)

### Task 2.1: Model Comparison Matrix

Complete this comparison matrix for a customer support chatbot use case:

| Criteria | GPT-4o | Claude 3.5 Sonnet | Claude 3.5 Haiku | GPT-3.5 Turbo |
|----------|--------|-------------------|------------------|---------------|
| Quality (1-5) | | | | |
| Speed (1-5) | | | | |
| Cost (1-5, 5=cheapest) | | | | |
| Context Window | | | | |
| Suitability (1-5) | | | | |
| **Total Score** | | | | |

**Your Recommendation:**
```
Primary Model:
Fallback Model:
Reasoning:
```

### Task 2.2: Use Case Model Mapping

For each use case, select the optimal model and explain your reasoning:

**Use Case 1: Real-time code completion suggestions**
```
Model:
Reasoning:
Key Factor:
```

**Use Case 2: Analyzing 50-page legal documents**
```
Model:
Reasoning:
Key Factor:
```

**Use Case 3: High-volume FAQ bot (100K+ requests/day)**
```
Model:
Reasoning:
Key Factor:
```

**Use Case 4: Creative writing assistant for novels**
```
Model:
Reasoning:
Key Factor:
```

**Use Case 5: Data extraction from invoices**
```
Model:
Reasoning:
Key Factor:
```

---

## Part 3: Cost Estimation Project (35 minutes)

### Task 3.1: Cost Calculator

Build a cost estimate for this application:

**Application Specs:**
- Customer support chatbot
- Expected volume: 5,000 conversations/day
- Average conversation: 8 turns (user + assistant)
- Average user message: 50 tokens
- Average assistant response: 200 tokens
- System prompt: 500 tokens (sent each turn)
- RAG context: 1,000 tokens average (when needed, 60% of turns)

**Calculate Monthly Costs:**

Using GPT-4o ($2.50/1M input, $10.00/1M output):
```
Daily tokens calculation:

Conversations: 5,000/day
Turns per conversation: 8
Total turns: ________

Per turn:
- System prompt: 500 tokens
- User message: 50 tokens
- RAG context (60%): 1,000 × 0.6 = ______ tokens
- Total input per turn: ________ tokens

- Assistant response: 200 tokens
- Total output per turn: 200 tokens

Daily totals:
- Input tokens: ________ turns × ________ tokens = ________
- Output tokens: ________ turns × 200 tokens = ________

Monthly totals (30 days):
- Input tokens: ________ × 30 = ________
- Output tokens: ________ × 30 = ________

Monthly cost:
- Input: ________ / 1,000,000 × $2.50 = $________
- Output: ________ / 1,000,000 × $10.00 = $________
- Total: $________
```

Using Claude 3.5 Haiku ($0.25/1M input, $1.25/1M output):
```
Monthly cost:
- Input: $________
- Output: $________
- Total: $________
```

**Cost Comparison:**
```
GPT-4o monthly: $________
Haiku monthly: $________
Savings with Haiku: $________ (____ %)

Recommendation:
```

### Task 3.2: Optimization Strategy

The stakeholder says the GPT-4o cost is too high. Design an optimization strategy to reduce costs by 60% while maintaining quality.

```
Strategy 1: Model Tiering
- Simple queries (estimated 40%): Use ________
- Complex queries (60%): Use ________
- Estimated savings: __%

Strategy 2: Caching
- Cache type:
- Expected hit rate: __%
- Estimated savings: __%

Strategy 3: Prompt Optimization
- Current system prompt: 500 tokens
- Optimized target: _______ tokens
- Reduction: __%
- Estimated savings: __%

Strategy 4: Context Optimization
- Reduce RAG context from 1,000 to _______ tokens
- Improve retrieval to reduce unnecessary context
- Estimated savings: __%

Combined savings estimate: __%
New monthly cost: $________
```

---

## Part 4: Security Architecture Design (35 minutes)

### Task 4.1: Threat Model

Complete a threat model for an AI-powered HR assistant that handles employee questions about benefits, policies, and payroll.

**Assets to Protect:**
```
1. Employee PII (names, IDs, salary info):
   - Sensitivity: HIGH
   - Potential threats:
   - Mitigations:

2. Company policies and procedures:
   - Sensitivity:
   - Potential threats:
   - Mitigations:

3. Conversation logs:
   - Sensitivity:
   - Potential threats:
   - Mitigations:

4. API credentials:
   - Sensitivity:
   - Potential threats:
   - Mitigations:
```

**Threat Analysis:**
```
Threat 1: Prompt Injection
- Attack vector:
- Impact:
- Likelihood:
- Mitigation:

Threat 2: Data Leakage to LLM Provider
- Attack vector:
- Impact:
- Likelihood:
- Mitigation:

Threat 3: Unauthorized Access
- Attack vector:
- Impact:
- Likelihood:
- Mitigation:

Threat 4: Social Engineering via AI
- Attack vector:
- Impact:
- Likelihood:
- Mitigation:
```

### Task 4.2: Compliance Checklist

Complete this compliance checklist for the HR assistant:

**GDPR Compliance:**
- [ ] Data minimization: Only collect necessary data
- [ ] Implementation:

- [ ] Purpose limitation: Use data only for stated purposes
- [ ] Implementation:

- [ ] Right to erasure: Allow data deletion
- [ ] Implementation:

- [ ] Right to explanation: Explain AI decisions
- [ ] Implementation:

**Internal Policy Compliance:**
- [ ] Access control: Role-based access to data
- [ ] Implementation:

- [ ] Audit logging: Track all access and actions
- [ ] Implementation:

- [ ] Data retention: Clear retention policies
- [ ] Implementation:

---

## Part 5: Complete Architecture Design (30 minutes)

### Task 5.1: Full Architecture Document

Design a complete architecture for this application:

**Application: AI-Powered Customer Success Platform**

**Requirements:**
- Analyze customer support tickets to identify issues
- Automatically categorize and route tickets
- Suggest responses to support agents
- Identify at-risk customers from interaction patterns
- Generate weekly insights reports
- Handle 50,000 tickets per day
- Must be GDPR compliant
- Budget: $15,000/month for AI costs

**Your Architecture Document:**

```
1. EXECUTIVE SUMMARY
[2-3 sentences describing the architecture]



2. ARCHITECTURE DIAGRAM

[ASCII diagram of the complete system]



3. COMPONENT BREAKDOWN

Frontend:
-
-

API Layer:
-
-

AI Components:
-
-
-

Data Storage:
-
-

4. MODEL SELECTION

Primary Model:
Secondary Model:
Reasoning:

5. COST ESTIMATE

Daily volumes:
- Ticket classification: _______ calls
- Response suggestions: _______ calls
- Risk analysis: _______ calls
- Report generation: _______ calls

Token estimates per call type:
-
-
-
-

Monthly cost breakdown:
-
-
-
Total: $________

6. SECURITY MEASURES

Data protection:
-
-

Access control:
-
-

Compliance:
-
-

7. SCALABILITY PLAN

Current: 50K tickets/day
Growth to 100K:
-
Growth to 500K:
-

8. RISK MITIGATION

Risk 1:
Mitigation:

Risk 2:
Mitigation:

Risk 3:
Mitigation:
```

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Pattern Selection | 15 | Correct patterns with clear justification |
| Model Selection | 15 | Appropriate models for use cases |
| Cost Estimation | 25 | Accurate calculations, realistic optimizations |
| Security Design | 20 | Comprehensive threat model and mitigations |
| Full Architecture | 25 | Complete, coherent, production-ready design |
| **Total** | **100** | |

---

## Submission Checklist

Before submitting, verify:

- [ ] All pattern selections include justification
- [ ] Cost calculations show work and are mathematically correct
- [ ] Security considerations address AI-specific threats
- [ ] Full architecture document is complete
- [ ] All diagrams are clear and readable
- [ ] Budget constraints are respected in designs

---

## Reflection Questions

1. Which AI application pattern do you find most useful for your work?

2. What surprised you most about the cost calculations?

3. What security concern do you think is most overlooked in AI applications?

4. How would you explain model selection tradeoffs to a non-technical stakeholder?

---

*Exercise 1 of 12 | Building AI-Powered Applications | Duration: 2.5 hours*
