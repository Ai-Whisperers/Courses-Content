# Module 5: Debugging & Iteration

## Learning Objectives

By the end of this module, you will be able to:

1. Diagnose why prompts produce poor or incorrect outputs
2. Apply systematic debugging frameworks to fix failing prompts
3. Conduct effective A/B testing to compare prompt versions
4. Implement iterative refinement strategies
5. Identify and fix common prompt mistakes
6. Establish prompt versioning practices for tracking changes

---

## Prerequisites

- Completed Modules 1-4
- Experience creating and testing prompts
- Familiarity with system prompts and personas

**Estimated Time**: 3 hours

---

## 1. Why Prompts Fail

### The Reality of Prompt Engineering

Even well-designed prompts fail. Understanding why is the first step to fixing them.

```
First prompt attempt: Works 40% of the time
After debugging:      Works 80% of the time
After iteration:      Works 95% of the time
```

### Common Failure Categories

| Category | Description | Example |
|----------|-------------|---------|
| Ambiguity | Prompt has multiple interpretations | "Make it better" |
| Missing Context | AI lacks necessary information | No background provided |
| Conflicting Instructions | Instructions contradict each other | "Be brief. Include all details." |
| Wrong Task Framing | Task described incorrectly | Asking for summary when analysis needed |
| Format Mismatch | Output format unclear | No structure specified |
| Scope Problems | Too broad or too narrow | "Tell me everything about AI" |
| Assumption Errors | Assumes AI knows context it doesn't | Referencing previous conversation |

### Failure Symptoms

**Symptom: Generic responses**
- Possible cause: Prompt too vague
- Debug action: Add specificity

**Symptom: Incorrect format**
- Possible cause: Format not specified clearly
- Debug action: Add explicit format requirements

**Symptom: Missing key information**
- Possible cause: Didn't ask for what you need
- Debug action: List required elements explicitly

**Symptom: Wrong tone/style**
- Possible cause: No style guidance
- Debug action: Define voice and audience

**Symptom: Hallucinated content**
- Possible cause: Asked about unknown topics
- Debug action: Provide source material or constrain scope

---

## 2. Diagnostic Framework

### The DEBUG Process

```
D - Describe the problem clearly
E - Examine the prompt components
B - Build hypotheses for failure
U - Update one element at a time
G - Generate and compare outputs
```

### Step 1: Describe the Problem

Before fixing, clearly state what's wrong:

```
Problem Statement Template:
- Expected output: [What you wanted]
- Actual output: [What you got]
- Gap: [Specific difference]
- Frequency: [How often this happens]
```

**Example:**
```
Expected: 5 bullet points summarizing key risks
Actual: 3 paragraphs of general discussion
Gap: Wrong format, missing specifics
Frequency: Every time
```

### Step 2: Examine Components

Analyze each prompt component:

```
┌─────────────────────────────────────────┐
│ PROMPT COMPONENT CHECKLIST              │
├─────────────────────────────────────────┤
│ □ Role/Persona - Clear? Appropriate?    │
│ □ Context - Sufficient? Relevant?       │
│ □ Task - Specific? Unambiguous?         │
│ □ Format - Explicit? Complete?          │
│ □ Constraints - Necessary? Clear?       │
│ □ Examples - Helpful? Enough?           │
│ □ Length - Appropriate for task?        │
└─────────────────────────────────────────┘
```

### Step 3: Build Hypotheses

Generate theories for why the prompt failed:

```
Hypothesis Template:
"The prompt fails because [component] is [problem],
which causes [resulting behavior]."

Example Hypotheses:
1. "The prompt fails because the task is ambiguous,
    which causes varied interpretations."
2. "The prompt fails because format is unspecified,
    which causes paragraph output instead of bullets."
3. "The prompt fails because context is missing,
    which causes generic responses."
```

### Step 4: Update Systematically

Test one hypothesis at a time:

```
Iteration 1: Test hypothesis #1
- Change: [specific modification]
- Result: [improved/same/worse]
- Conclusion: [keep/revert]

Iteration 2: Test hypothesis #2
- Change: [specific modification]
- Result: [improved/same/worse]
- Conclusion: [keep/revert]
```

### Step 5: Generate and Compare

Run multiple tests to verify improvement:

```
Version Comparison:
| Version | Output Quality | Consistency | Notes |
|---------|---------------|-------------|-------|
| Original | 2/5 | Low | [issues] |
| v1.1 | 3/5 | Medium | [improvement] |
| v1.2 | 4/5 | High | [further improvement] |
```

---

## 3. Common Mistakes and Fixes

### Mistake 1: The Vague Prompt

**Bad:**
```
Write something about marketing.
```

**Problem:** No specificity - could be anything about marketing.

**Fixed:**
```
Write a 200-word overview of email marketing best practices
for B2B SaaS companies, focusing on subject line optimization
and send timing. Target audience: marketing managers with
1-2 years experience.
```

### Mistake 2: Conflicting Instructions

**Bad:**
```
Write a detailed analysis. Keep it very short.
Explain everything but don't be verbose.
```

**Problem:** Instructions contradict each other.

**Fixed:**
```
Write a focused analysis in 3-5 paragraphs. Cover only the
three most important points. Use concise language -
prioritize clarity over comprehensiveness.
```

### Mistake 3: Assumed Context

**Bad:**
```
Continue the project from where we left off.
```

**Problem:** AI doesn't remember "where we left off."

**Fixed:**
```
Context: We're building a user authentication system.
We've completed the login flow and database schema.
Next task: Design the password reset feature including:
- User flow
- Email templates
- Security considerations
```

### Mistake 4: Format Not Specified

**Bad:**
```
Give me information about project risks.
```

**Problem:** Format is entirely up to AI interpretation.

**Fixed:**
```
List the top 5 project risks in this format:

Risk #[number]: [Risk name]
- Likelihood: High/Medium/Low
- Impact: High/Medium/Low
- Mitigation: [One sentence strategy]
```

### Mistake 5: Wrong Level of Detail

**Bad:**
```
Explain machine learning.
```

**Problem:** Could be 1 sentence or 100 pages.

**Fixed:**
```
Explain machine learning in 3-4 sentences suitable for
a business executive with no technical background. Focus
on what it does and why it matters for business, not how
it works technically.
```

### Mistake 6: Missing Success Criteria

**Bad:**
```
Write a good product description.
```

**Problem:** "Good" is undefined.

**Fixed:**
```
Write a product description that:
- Opens with the main benefit (not features)
- Includes 3 key differentiators
- Uses active, benefit-focused language
- Is 75-100 words
- Ends with a clear call to action

Product: [details]
Target customer: [description]
```

---

## 4. A/B Testing Prompts

### Why A/B Test?

A/B testing compares prompt versions objectively to find what works best.

```
Without A/B testing: "This prompt seems better"
With A/B testing:    "Version B produces 40% more accurate results"
```

### A/B Testing Process

```
1. BASELINE: Document current prompt performance
2. VARIANT: Create alternative version with one change
3. TEST: Run both versions on same inputs
4. MEASURE: Score outputs on defined criteria
5. ANALYZE: Determine statistically significant winner
6. IMPLEMENT: Adopt better version as new baseline
```

### Setting Up Tests

**Test Design Template:**

```
Test Name: [Descriptive name]
Hypothesis: [What you're testing]
Variable: [What's different between A and B]
Control: Version A - [current prompt]
Variant: Version B - [modified prompt]
Test Cases: [List 5-10 different inputs]
Evaluation Criteria:
- Criterion 1: [How to measure]
- Criterion 2: [How to measure]
- Criterion 3: [How to measure]
```

### Evaluation Criteria

Define specific, measurable criteria:

| Criterion | How to Measure | Scale |
|-----------|----------------|-------|
| Accuracy | Facts correct vs. total facts | 0-100% |
| Relevance | Directly addresses question | 1-5 |
| Completeness | Required elements present | Count |
| Format compliance | Follows specified format | Y/N |
| Tone match | Matches requested voice | 1-5 |
| Conciseness | Words used vs. target | +/- % |

### A/B Test Example

```
Test: Subject Line Specificity

Hypothesis: Adding specific numbers improves email open rates

Version A:
"Write email subject lines for a product launch."

Version B:
"Write 5 email subject lines for a product launch.
Each should include a specific number or statistic."

Test Case: New project management tool launch

Version A Output:
1. Introducing Our New Project Management Tool
2. Boost Your Team's Productivity Today
3. The Future of Project Management is Here
[etc.]

Version B Output:
1. Manage 50% More Projects with Our New Tool
2. Cut Meeting Time by 3 Hours Weekly
3. 2,000+ Teams Already Made the Switch
[etc.]

Evaluation:
| Criterion | Version A | Version B |
|-----------|-----------|-----------|
| Specificity | 2/5 | 5/5 |
| Click-worthiness | 3/5 | 4/5 |
| Accuracy claim | N/A | Needs verification |

Winner: Version B (with caveat about claim verification)
```

### Testing at Scale

For important prompts, test systematically:

```
Testing Matrix:
| Input Variation | A Score | B Score | Winner |
|-----------------|---------|---------|--------|
| Input 1 | | | |
| Input 2 | | | |
| Input 3 | | | |
| Input 4 | | | |
| Input 5 | | | |
| Average | | | |
```

---

## 5. Iterative Refinement

### The Iteration Mindset

Prompt engineering is iterative, not one-shot:

```
Initial Prompt → Test → Identify Issues → Refine → Retest → Repeat
```

### Iteration Strategies

#### Strategy 1: Additive Refinement
Start minimal, add elements until it works:

```
v1: Basic task description
v2: + explicit format
v3: + context
v4: + constraints
v5: + examples
```

#### Strategy 2: Subtractive Refinement
Start comprehensive, remove unnecessary elements:

```
v1: Everything included
v2: - unnecessary context
v3: - redundant instructions
v4: - excessive examples
```

#### Strategy 3: Component Replacement
Keep structure, swap components:

```
v1: Formal tone
v2: Conversational tone (same content)
v3: Expert tone (same content)
→ Compare which works best
```

### Iteration Workflow

```
┌─────────────────────────────────────────────────────┐
│                ITERATION WORKFLOW                    │
├─────────────────────────────────────────────────────┤
│  1. Run current prompt                              │
│  2. Score output (1-5) on each criterion            │
│  3. Identify lowest-scoring area                    │
│  4. Hypothesize improvement                         │
│  5. Modify prompt (one change)                      │
│  6. Retest with same inputs                         │
│  7. Compare scores                                  │
│  8. If better: adopt change, repeat from step 1    │
│     If worse: revert, try different change          │
│  9. Stop when quality threshold reached             │
└─────────────────────────────────────────────────────┘
```

### Knowing When to Stop

Stop iterating when:
- Output quality meets threshold (e.g., 4/5 on all criteria)
- Further changes produce diminishing returns
- Time/effort exceeds value of improvement
- You've tested 5+ variations without significant gain

---

## 6. Prompt Versioning

### Why Version Prompts?

- Track what changes were made
- Revert if new versions fail
- Understand evolution over time
- Share specific versions with teams
- Document what works

### Version Naming Convention

```
[prompt-name]-v[major].[minor]

prompt-name: descriptive identifier
major: significant changes
minor: tweaks and fixes

Examples:
product-description-v1.0  (initial)
product-description-v1.1  (format tweak)
product-description-v1.2  (tone adjustment)
product-description-v2.0  (major restructure)
```

### Version Documentation Template

```markdown
# Prompt: [Name] v[X.Y]

## Current Version
[The actual prompt text]

## Change Log

### v[X.Y] - [Date]
- Change: [What changed]
- Reason: [Why it changed]
- Result: [Impact on output]

### v[X.Y-1] - [Date]
- Change: [What changed]
- Reason: [Why it changed]
- Result: [Impact on output]

## Performance Metrics
- Accuracy: [score]
- Consistency: [score]
- Last tested: [date]

## Known Issues
- [Any current limitations]

## Usage Notes
- [When to use this prompt]
- [What inputs it expects]
```

### Example Version History

```markdown
# Prompt: customer-email-response v2.1

## Current Version
You are a customer support specialist for [Company].
Respond to customer emails with:
- Acknowledgment of their concern
- Clear explanation or solution
- Next steps or timeline
- Warm closing

Tone: Professional, empathetic, helpful
Length: 100-150 words

[Customer email below]

## Change Log

### v2.1 - 2024-01-15
- Change: Added word count guideline
- Reason: Responses were too long
- Result: Reduced average from 250 to 130 words

### v2.0 - 2024-01-10
- Change: Restructured to specify response components
- Reason: Missing elements in some responses
- Result: 100% inclusion of required elements

### v1.1 - 2024-01-05
- Change: Added "empathetic" to tone description
- Reason: Responses felt cold
- Result: Improved customer satisfaction scores

### v1.0 - 2024-01-01
- Initial version
- Result: Functional but inconsistent
```

---

## 7. Debugging Checklist

Use this checklist when prompts fail:

```
□ Is the task clearly stated?
□ Is the format explicitly specified?
□ Is sufficient context provided?
□ Are there conflicting instructions?
□ Is the scope appropriate (not too broad/narrow)?
□ Would examples help clarify expectations?
□ Is the tone/audience defined?
□ Are there unnecessary constraints?
□ Is the prompt length appropriate?
□ Have you tested with multiple inputs?
```

### Quick Fixes Reference

| Problem | Quick Fix |
|---------|-----------|
| Too generic | Add specific requirements |
| Wrong format | Specify format with example |
| Too long | Add length constraint |
| Too short | Ask for detail on specific aspects |
| Wrong tone | Define audience and voice |
| Hallucinating | Provide source material, add "only use provided information" |
| Inconsistent | Add few-shot examples |
| Off-topic | Constrain scope explicitly |
| Missing elements | Create checklist of required components |

---

## Best Practices Summary

1. **Document Everything**: Track changes and results
2. **Test Systematically**: One variable at a time
3. **Define Success**: Know what "good" looks like before testing
4. **Use Real Inputs**: Test with actual use cases, not toy examples
5. **Iterate Patiently**: Good prompts take multiple versions
6. **Version Religiously**: Never lose a working prompt
7. **Learn from Failures**: Bad outputs teach more than good ones

---

## Knowledge Check

Before the exercises, confirm you can answer:

1. What are the five steps in the DEBUG process?
2. How do you set up an effective A/B test for prompts?
3. What are the common prompt mistakes and their fixes?
4. When should you stop iterating on a prompt?
5. How should you version and document prompts?

---

## Summary

In this module, you learned:

- **Failure Diagnosis**: Understanding why prompts fail
- **DEBUG Process**: Systematic approach to fixing prompts
- **Common Mistakes**: Pattern recognition for quick fixes
- **A/B Testing**: Comparing prompt versions objectively
- **Iteration**: Refining prompts systematically
- **Versioning**: Tracking changes and maintaining history

**Next Module**: Building Prompt Libraries - organizing and maintaining your prompt collection.

---

*Module 5 of 6 | Prompt Engineering Masterclass | Duration: 3 hours*
