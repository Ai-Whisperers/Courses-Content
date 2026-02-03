# Module 3 Exercise: Advanced Prompting Patterns Lab

## Exercise Overview

**Objective**: Apply advanced prompting patterns including few-shot learning, chain-of-thought, and ReAct to solve complex problems effectively.

**Duration**: 2.5 hours

**Tools Required**:
- AI tool (Claude or ChatGPT)
- Note-taking application
- Problems to solve (provided)

---

## Part 1: Few-Shot Learning (35 minutes)

### Task 1.1: Build a Few-Shot Classifier

Create a few-shot prompt to classify support tickets by urgency.

**Your Task**: Create 4 examples that teach the pattern, then test with new inputs.

**Your Few-Shot Prompt:**
```
[Instructions]


[Example 1]
Ticket:
Classification:

[Example 2]
Ticket:
Classification:

[Example 3]
Ticket:

[Example 4]
Ticket:
Classification:

[Test Case]
Ticket: "The website is completely down and we're losing sales every minute."
Classification:
```

**Test Results:**
| Test Input | Expected | AI Output | Correct? |
|------------|----------|-----------|----------|
| Website down, losing sales | Critical | | |
| Question about pricing | Low | | |
| Feature not working as documented | Medium | | |
| Data breach suspected | Critical | | |

### Task 1.2: Few-Shot for Format Conversion

Create a few-shot prompt to convert informal notes into structured meeting minutes.

**Your Prompt:**
```
[Your few-shot prompt with 3 examples showing the transformation]
```

**Test Input:**
```
talked about new product launch. john said marketing budget needs increase.
mary worried about timeline - maybe delay 2 weeks? decided to keep original
date but add contractors. need to follow up with legal on trademark.
```

**AI Output:**
```
[Paste result]
```

**Quality Assessment (1-5):** ___

### Task 1.3: Edge Case Handling

Modify your classification prompt from 1.1 to handle edge cases.

**Add examples for:**
- Ambiguous tickets (could be multiple categories)
- Tickets missing key information
- Tickets with multiple issues

**Your Updated Prompt:**
```
[Enhanced prompt with edge case examples]
```

**Edge Case Test Results:**
| Edge Case | AI Handling | Appropriate? |
|-----------|-------------|--------------|
| Ambiguous | | |
| Missing info | | |
| Multiple issues | | |

---

## Part 2: Chain-of-Thought (35 minutes)

### Task 2.1: Math Problem with CoT

Solve this problem using chain-of-thought prompting:

**Problem**: A company has 150 employees. If 40% work in engineering, 25% in sales, and the rest are split equally between marketing and operations, how many people are in each department?

**Without CoT:**
```
[Simple prompt]
```
**Output:**
**Correct?** Y / N

**With CoT:**
```
[Your CoT prompt including "Let's think step by step"]
```
**Output:**
**Shows clear reasoning?** Y / N
**Correct?** Y / N

### Task 2.2: Analysis with CoT

Use chain-of-thought for a business decision:

**Scenario**: A SaaS company is deciding whether to offer a freemium tier. Currently they have 500 paying customers at $50/month.

**Your CoT Prompt:**
```
[Your prompt that triggers step-by-step analysis]
```

**AI Analysis:**
```
[Paste output]
```

**Did CoT improve the analysis?** Y / N
**How?**

### Task 2.3: CoT for Code Logic

Use CoT to trace through this logic problem:

**Problem**:
```python
def mystery(n):
    if n <= 1:
        return n
    return mystery(n-1) + mystery(n-2)

# What is mystery(6)?
```

**Your CoT Prompt:**
```
[Your prompt asking for step-by-step tracing]
```

**AI Trace:**
```
[Paste output]
```

**Final Answer Correct?** Y / N

---

## Part 3: Tree-of-Thought (30 minutes)

### Task 3.1: Multi-Perspective Decision

Use tree-of-thought for this decision:

**Decision**: Should a small marketing agency (10 people) adopt AI tools for content creation?

**Your ToT Prompt:**
```
[Your prompt requesting multiple perspectives/approaches]
```

**Perspectives Generated:**
1. Perspective:
   - Key points:
   - Conclusion:

2. Perspective:
   - Key points:
   - Conclusion:

3. Perspective:
   - Key points:
   - Conclusion:

**Synthesis:**
```
[AI's synthesis of perspectives]
```

**Did ToT produce better analysis than a single-path approach?**

### Task 3.2: Creative Problem with ToT

Use tree-of-thought for a creative challenge:

**Challenge**: Generate a unique name for a productivity app that helps remote workers manage their time.

**Your ToT Prompt:**
```
[Prompt exploring multiple naming approaches]
```

**Approaches Explored:**
1. Approach (e.g., descriptive):
   - Names generated:
   - Best from this approach:

2. Approach (e.g., metaphorical):
   - Names generated:
   - Best from this approach:

3. Approach (e.g., coined words):
   - Names generated:
   - Best from this approach:

**Final Selection:**
**Why?**

---

## Part 4: Self-Consistency (20 minutes)

### Task 4.1: Verify a Calculation

Use self-consistency to verify this problem:

**Problem**: A store offers 20% off, then an additional 15% off the sale price. What's the total discount from the original price?

**Your Self-Consistency Prompt:**
```
[Prompt requesting 3 independent solution paths]
```

**Path Results:**
| Path | Method Used | Answer |
|------|-------------|--------|
| 1 | | |
| 2 | | |
| 3 | | |

**Consensus Answer:**
**Confidence Level:**

### Task 4.2: Verify a Recommendation

Use self-consistency for a recommendation:

**Question**: What's the best programming language for a beginner to learn first?

**Your Prompt:**
```
[Prompt for multiple independent recommendations]
```

**Independent Recommendations:**
1.
2.
3.

**Analysis of Agreement/Disagreement:**

**Most Consistent Recommendation:**

---

## Part 5: ReAct Pattern (35 minutes)

### Task 5.1: Research Question with ReAct

Use ReAct for this research question:

**Question**: What factors should I consider when choosing between AWS, Azure, and GCP for a startup?

**Your ReAct Prompt:**
```
[Your thought-action-observation prompt structure]
```

**AI's ReAct Process:**
```
[Paste full output showing the T-A-O loop]
```

**Analysis:**
- Number of thought-action cycles:
- Quality of reasoning:
- Was the answer comprehensive?

### Task 5.2: Complex Decision with ReAct

Use ReAct for this multi-step decision:

**Scenario**: You're planning a tech conference for 500 people in 6 months. Walk through the planning process.

**Your ReAct Prompt:**
```
[Your prompt]
```

**Key Thought-Action-Observation Cycles:**

Cycle 1:
- Thought:
- Action:
- Observation:

Cycle 2:
- Thought:
- Action:
- Observation:

Cycle 3:
- Thought:
- Action:
- Observation:

**Final Plan Summary:**

---

## Part 6: Meta-Prompting (25 minutes)

### Task 6.1: Generate an Optimized Prompt

Use meta-prompting to create a prompt for a specific task:

**Your Task**: I need a prompt that generates product descriptions for an e-commerce site.

**Your Meta-Prompt:**
```
[Your prompt asking AI to generate an optimized prompt]
```

**AI-Generated Prompt:**
```
[The prompt AI created]
```

**Test the Generated Prompt:**
```
[Run it with a sample product]
```

**Quality of Results (1-5):**

### Task 6.2: Improve an Existing Prompt

Use meta-prompting to improve this weak prompt:

**Original Prompt:**
```
Write a good email.
```

**Your Meta-Prompt:**
```
[Prompt asking AI to analyze and improve the original]
```

**AI's Analysis:**
- Identified weaknesses:
- Suggested improvements:

**Improved Prompt Generated:**
```
[Paste improved prompt]
```

**Before/After Comparison:**
| Aspect | Before | After |
|--------|--------|-------|
| Clarity | | |
| Specificity | | |
| Likely quality | | |

---

## Part 7: Pattern Combination (20 minutes)

### Task 7.1: Combine Patterns

Create a prompt that combines at least two advanced patterns:

**Task**: Create a customer success playbook recommendation

**Patterns to Combine**: (choose 2)
- Few-shot
- Chain-of-thought
- Tree-of-thought
- ReAct

**Your Combined Prompt:**
```
[Your prompt combining patterns]
```

**Output:**
```
[Paste result]
```

**Assessment:**
- Did patterns complement each other?
- What was the benefit of combining?

---

## Exercise Deliverables

Submit the following:

1. **Few-Shot Prompts** with test results (Part 1)
2. **Chain-of-Thought Examples** (Part 2)
3. **Tree-of-Thought Analysis** (Part 3)
4. **Self-Consistency Verification** (Part 4)
5. **ReAct Process Documentation** (Part 5)
6. **Meta-Prompting Results** (Part 6)
7. **Combined Pattern Example** (Part 7)

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Few-Shot Learning | 20 | Well-constructed examples, edge cases handled |
| Chain-of-Thought | 20 | Clear reasoning improvement demonstrated |
| Tree-of-Thought | 15 | Multiple perspectives effectively explored |
| Self-Consistency | 10 | Proper verification approach |
| ReAct Pattern | 20 | Clear T-A-O loops, comprehensive results |
| Meta-Prompting | 10 | Effective prompt generation/improvement |
| Pattern Combination | 5 | Creative and effective combination |
| **Total** | **100** | |

---

## Reflection Questions

1. Which pattern improved outputs the most dramatically?

2. When would you NOT use chain-of-thought?

3. How will you decide which pattern to use for future tasks?

4. What surprised you about meta-prompting?

---

*Exercise 3 of 6 | Prompt Engineering Masterclass | Duration: 2.5 hours*
