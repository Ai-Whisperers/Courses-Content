# Module 5 Exercise: Debugging & Iteration Lab

## Exercise Overview

**Objective**: Practice diagnosing failing prompts, conducting A/B tests, and systematically iterating to improve prompt quality.

**Duration**: 2.5 hours

**Tools Required**:
- AI tool (Claude or ChatGPT)
- Spreadsheet or note-taking application for tracking
- Timer for A/B testing

---

## Part 1: Diagnosing Failures (30 minutes)

### Task 1.1: Identify the Problems

Analyze these failing prompts. Identify what's wrong and how to fix them.

**Failing Prompt 1:**
```
Write about dogs.
```

**Output received:** A 500-word essay about dog breeds, care, and history.

**What was actually needed:** 3 bullet points about dog-friendly office policies.

**Diagnosis:**
| Issue | Explanation |
|-------|-------------|
| Missing: | |
| Problem: | |
| Root cause: | |

**Fixed Prompt:**
```
[Your improved version]
```

---

**Failing Prompt 2:**
```
You are an expert marketer. Write compelling ad copy. Make it punchy
but also include all the details. Be creative but stay professional.
Target millennials and boomers. Keep it short but comprehensive.
```

**Output received:** Confusing, inconsistent ad copy that tries to do everything.

**Diagnosis:**
| Issue | Explanation |
|-------|-------------|
| Conflicting instruction 1: | |
| Conflicting instruction 2: | |
| Conflicting instruction 3: | |
| Root cause: | |

**Fixed Prompt:**
```
[Your improved version - pick one clear direction]
```

---

**Failing Prompt 3:**
```
Based on our previous discussion, update the analysis with the new numbers
and send it to the stakeholders we talked about.
```

**Output received:** "I don't have access to our previous discussion..."

**Diagnosis:**
| Issue | Explanation |
|-------|-------------|
| Assumed knowledge 1: | |
| Assumed knowledge 2: | |
| Assumed knowledge 3: | |
| Root cause: | |

**Fixed Prompt:**
```
[Your improved version with necessary context]
```

---

### Task 1.2: Apply the DEBUG Process

Use a failing prompt from your own experience (or create one).

**Your Failing Prompt:**
```
[Your prompt that didn't work]
```

**Problem Output:**
```
[What you got]
```

**Expected Output:**
```
[What you wanted]
```

**DEBUG Process:**

**D - Describe the problem:**

**E - Examine components:**
| Component | Present? | Quality |
|-----------|----------|---------|
| Role | | |
| Context | | |
| Task | | |
| Format | | |
| Constraints | | |

**B - Build hypotheses:**
1.
2.
3.

**U - Update (test hypothesis 1):**
```
[Modified prompt]
```
Result:

**G - Generate comparison:**
| Version | Quality Score |
|---------|--------------|
| Original | /5 |
| Updated | /5 |

---

## Part 2: Common Mistakes Lab (25 minutes)

### Task 2.1: Fix Each Mistake Type

Apply fixes to each common mistake category.

**Mistake: The Vague Prompt**
```
Help me with my presentation.
```

**Your Specific Version:**
```
[Add specificity: topic, audience, length, purpose, format]
```

---

**Mistake: Conflicting Instructions**
```
Write a formal business letter that's casual and friendly.
Include all the legal disclaimers but keep it to one paragraph.
```

**Your Coherent Version:**
```
[Remove conflicts, pick clear direction]
```

---

**Mistake: Assumed Context**
```
Follow up on what we discussed and proceed with option B.
```

**Your Context-Rich Version:**
```
[Provide all necessary context explicitly]
```

---

**Mistake: Missing Format**
```
Give me your thoughts on remote work.
```

**Your Format-Specified Version:**
```
[Specify exact output format]
```

---

**Mistake: Wrong Scope**
```
Tell me everything about artificial intelligence.
```

**Your Appropriately-Scoped Version:**
```
[Narrow to specific, answerable scope]
```

---

### Task 2.2: Mistake Prevention Checklist

Create a personal checklist to catch mistakes before testing.

**My Pre-Test Checklist:**
```
Before running any prompt, verify:
□
□
□
□
□
□
□
□
```

---

## Part 3: A/B Testing (35 minutes)

### Task 3.1: Design an A/B Test

Create a structured A/B test comparing two prompt approaches.

**Test Setup:**

**Task:** Generate product feature descriptions

**Hypothesis:** [What you think will work better]

**Version A (Control):**
```
[Your baseline prompt]
```

**Version B (Variant):**
```
[Your modified prompt - one key difference]
```

**Variable Being Tested:** [What's different between A and B]

**Evaluation Criteria:**
| Criterion | How to Measure | Weight |
|-----------|----------------|--------|
| | | |
| | | |
| | | |
| | | |

---

### Task 3.2: Run the A/B Test

Test both versions with 5 different inputs.

**Test Input 1:** [Product feature to describe]

| Metric | Version A | Version B |
|--------|-----------|-----------|
| Criterion 1 | /5 | /5 |
| Criterion 2 | /5 | /5 |
| Criterion 3 | /5 | /5 |
| Total | /15 | /15 |

**Version A Output:**
```
[Paste]
```

**Version B Output:**
```
[Paste]
```

---

**Test Input 2:** [Different product feature]

| Metric | Version A | Version B |
|--------|-----------|-----------|
| Criterion 1 | /5 | /5 |
| Criterion 2 | /5 | /5 |
| Criterion 3 | /5 | /5 |
| Total | /15 | /15 |

---

**Test Input 3:** [Different product feature]

| Metric | Version A | Version B |
|--------|-----------|-----------|
| Criterion 1 | /5 | /5 |
| Criterion 2 | /5 | /5 |
| Criterion 3 | /5 | /5 |
| Total | /15 | /15 |

---

**Test Input 4:** [Different product feature]

| Metric | Version A | Version B |
|--------|-----------|-----------|
| Criterion 1 | /5 | /5 |
| Criterion 2 | /5 | /5 |
| Criterion 3 | /5 | /5 |
| Total | /15 | /15 |

---

**Test Input 5:** [Different product feature]

| Metric | Version A | Version B |
|--------|-----------|-----------|
| Criterion 1 | /5 | /5 |
| Criterion 2 | /5 | /5 |
| Criterion 3 | /5 | /5 |
| Total | /15 | /15 |

---

### Task 3.3: Analyze Results

**Summary Table:**
| Input | A Total | B Total | Winner |
|-------|---------|---------|--------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| **Average** | | | |

**Conclusion:**
- Winner: Version ___
- Margin: ___
- Confidence: High / Medium / Low

**What did you learn?**

**Would you need more testing to be confident?**

---

## Part 4: Iterative Refinement (35 minutes)

### Task 4.1: Five-Iteration Challenge

Start with a basic prompt and improve it through 5 iterations.

**Starting Prompt (v1.0):**
```
Write a product announcement email.
```

**v1.0 Test Result:**
- Output quality: /5
- Issues identified:

---

**Iteration 1 (v1.1):**
Change made:
```
[Your improved prompt]
```
- Output quality: /5
- Improvement: Yes / No
- Issues remaining:

---

**Iteration 2 (v1.2):**
Change made:
```
[Your improved prompt]
```
- Output quality: /5
- Improvement: Yes / No
- Issues remaining:

---

**Iteration 3 (v1.3):**
Change made:
```
[Your improved prompt]
```
- Output quality: /5
- Improvement: Yes / No
- Issues remaining:

---

**Iteration 4 (v1.4):**
Change made:
```
[Your improved prompt]
```
- Output quality: /5
- Improvement: Yes / No
- Issues remaining:

---

**Iteration 5 (v2.0):**
Change made:
```
[Your improved prompt]
```
- Output quality: /5
- Improvement: Yes / No
- Issues remaining:

---

**Iteration Summary:**
| Version | Quality | Key Change |
|---------|---------|------------|
| v1.0 | /5 | Baseline |
| v1.1 | /5 | |
| v1.2 | /5 | |
| v1.3 | /5 | |
| v1.4 | /5 | |
| v2.0 | /5 | |

**Total improvement:** v1.0 (___/5) → v2.0 (___/5)

**Most impactful change:**

---

### Task 4.2: Know When to Stop

For your final prompt (v2.0), assess whether more iteration is needed.

**Stopping Criteria Check:**
| Criterion | Met? | Notes |
|-----------|------|-------|
| Quality threshold (4/5+) reached | | |
| Diminishing returns observed | | |
| All major issues resolved | | |
| Time investment justified | | |

**Decision:** Continue iterating / Stop here

**Reasoning:**

---

## Part 5: Version Documentation (25 minutes)

### Task 5.1: Create Version Documentation

Document your final prompt from Part 4 using proper versioning.

```markdown
# Prompt: [Name] v2.0

## Current Version
[Your final prompt text]

## Purpose
[What this prompt is for]

## Expected Input
[What kind of input it needs]

## Expected Output
[What it should produce]

## Change Log

### v2.0 - [Today's date]
- Change: [What changed from v1.4]
- Reason: [Why]
- Result: [Impact]

### v1.4 - [Date]
- Change:
- Reason:
- Result:

### v1.3 - [Date]
- Change:
- Reason:
- Result:

### v1.2 - [Date]
- Change:
- Reason:
- Result:

### v1.1 - [Date]
- Change:
- Reason:
- Result:

### v1.0 - [Date]
- Initial version

## Performance Metrics
- Quality score: /5
- Consistency: High / Medium / Low
- Test cases run: [number]

## Known Limitations
- [Any current issues]

## Best Practices for Use
- [Usage tips]
```

---

### Task 5.2: Create a Quick Debug Reference

Build a personal quick-reference for debugging.

**My Debug Quick Reference Card:**

```
When output is TOO GENERIC:
→ Add:

When output is WRONG FORMAT:
→ Add:

When output is TOO LONG:
→ Add:

When output is TOO SHORT:
→ Add:

When output has WRONG TONE:
→ Add:

When output HALLUCINATES:
→ Add:

When output is INCONSISTENT:
→ Add:

When output is OFF-TOPIC:
→ Add:
```

---

## Part 6: Real-World Debugging (20 minutes)

### Task 6.1: Debug a Complex Failing Prompt

Diagnose and fix this real-world failing prompt.

**The Prompt:**
```
You are an AI assistant. I need you to help me write something for work.
It needs to be professional but not too formal. Make it about
the right length. Include the important points but don't make it
too long. The audience is mixed so write for everyone.
```

**What's Wrong (List all issues):**
1.
2.
3.
4.
5.

**Your Rewritten Version:**
```
[Complete, specific, non-conflicting prompt]
```

**Test your version and record:**
- Does it produce usable output? Y / N
- Quality score: /5
- Would this work in a real scenario? Y / N

---

### Task 6.2: Peer Review Simulation

Imagine a colleague gave you this prompt to review before they test it.

**Colleague's Prompt:**
```
Act as a senior data analyst. Analyze the sales data I'll provide and give
me insights. Focus on trends and anomalies. Present findings in a way
that executives can understand. Include visualizations if helpful.
```

**Your Review:**

**What's Good:**
-
-

**What Needs Improvement:**
-
-
-

**Suggested Revised Version:**
```
[Your improved version]
```

---

## Exercise Deliverables

Submit the following:

1. **Diagnosis Results** from Part 1 (with fixed prompts)
2. **Mistake Fixes** from Part 2 (all 5 categories)
3. **A/B Test Documentation** from Part 3 (with analysis)
4. **Iteration Log** from Part 4 (v1.0 through v2.0)
5. **Version Documentation** from Part 5
6. **Real-World Debug** from Part 6

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Diagnosis & Fixes | 20 | Accurate problem identification, effective fixes |
| Mistake Categories | 15 | All types addressed with clear improvements |
| A/B Testing | 25 | Structured test, clear evaluation, valid conclusions |
| Iteration Log | 20 | Systematic improvement, documented changes |
| Version Documentation | 10 | Complete, professional documentation |
| Real-World Debug | 10 | Comprehensive analysis, usable output |
| **Total** | **100** | |

---

## Reflection Questions

1. What pattern of mistakes do you most commonly make?

2. How did A/B testing change your confidence in prompt choices?

3. What was the most impactful single change during iteration?

4. How will you approach prompt development differently after this module?

---

*Exercise 5 of 6 | Prompt Engineering Masterclass | Duration: 2.5 hours*
