# Module 5 Solutions: Debugging & Iteration

## Solution Guide - DEBUG Framework and Testing

---

## Part 1: DEBUG Process Application

### Example: Debugging a Failing Prompt

**Original Failing Prompt:**
```
Write a product description.
```

**D - Describe the Problem:**
- Expected: Compelling product description for e-commerce site
- Actual: Generic 2-sentence description with no specifics
- Gap: Missing product details, features, benefits, target audience
- Frequency: Every time - prompt too vague

**E - Examine Components:**
```
□ Role - MISSING
□ Context - MISSING (no product info, no audience)
□ Task - TOO VAGUE ("write a description")
□ Format - MISSING (length, structure)
□ Constraints - MISSING (tone, focus areas)
```

**B - Build Hypotheses:**
1. Prompt lacks product-specific information
2. No format specification leads to arbitrary length/structure
3. Missing audience context causes generic language
4. No constraints on tone or style

**U - Update (Iteration 1):**
```
Write a product description for our wireless earbuds.
Features: 30-hour battery, noise cancellation, waterproof.
Audience: Fitness enthusiasts.
```
**Result:** Better (specific product) but still format issues

**U - Update (Iteration 2):**
```
You are an e-commerce copywriter.

Write a product description for wireless earbuds.

Features:
- 30-hour battery life
- Active noise cancellation
- IPX7 waterproof rating
- Comfortable fit for workouts

Target audience: Fitness enthusiasts and commuters
Tone: Energetic and benefit-focused

Format:
- Headline (5-8 words)
- Main description (75-100 words)
- 3 bullet point benefits
```

**G - Generate and Compare:**

| Version | Quality | Completeness | Usability |
|---------|---------|--------------|-----------|
| Original | 1/5 | 1/5 | 1/5 |
| Iteration 1 | 3/5 | 3/5 | 3/5 |
| Iteration 2 | 5/5 | 5/5 | 5/5 |

---

## Part 2: A/B Testing

### Task 2.1: Structured A/B Test

**Test Setup:**
```
Test Name: Role Specificity Impact
Hypothesis: More specific roles produce more targeted content
Variable: Role description (generic vs. specific)

Version A (Control):
"You are a marketing professional. Write an email announcing our new product."

Version B (Variant):
"You are a B2B SaaS marketing manager writing to IT directors at mid-size companies.
Write an email announcing our new security monitoring product."

Test Cases: 3 different products
```

**Evaluation Criteria:**
```
| Criterion | How to Measure | Weight |
|-----------|----------------|--------|
| Audience appropriateness | Language matches target | 30% |
| Specificity | Addresses real pain points | 30% |
| Clarity | Message is clear | 20% |
| Call-to-action strength | CTA is compelling | 20% |
```

**Example Results:**

| Test Case | Version A Score | Version B Score | Winner |
|-----------|----------------|-----------------|--------|
| Product 1 | 3.2/5 | 4.5/5 | B |
| Product 2 | 3.0/5 | 4.7/5 | B |
| Product 3 | 3.5/5 | 4.3/5 | B |
| **Average** | **3.2/5** | **4.5/5** | **B wins** |

**Conclusion:** Specific role improved output quality by ~40% across all test cases.

---

## Part 3: Common Mistakes and Fixes

### Mistake 1: Vague Task → Fixed

**Before:**
```
Help me with my presentation.
```

**Problem:** No specifics on what help means

**After:**
```
Review the outline below for my Q3 sales presentation to the executive team.
Identify: 1) Missing critical information, 2) Flow/logic issues, 3) Sections
that need strengthening.

[Outline paste]
```

### Mistake 2: Conflicting Instructions → Fixed

**Before:**
```
Write a comprehensive detailed analysis. Keep it very brief. Include everything
but don't make it too long.
```

**Problem:** Instructions contradict each other

**After:**
```
Write a business analysis covering these 4 areas: [list].
For each area: 2-3 key points (total 300-400 words).
Comprehensive on these 4 topics, but concise within each.
```

### Mistake 3: Assumed Context → Fixed

**Before:**
```
Continue where we left off with the project.
```

**Problem:** AI doesn't remember previous conversations

**After:**
```
Continuing our discussion about the mobile app redesign project.

Recap: We decided on a card-based UI, prioritizing speed over features,
targeting launch in Q2.

Next task: Create user stories for the MVP feature set.
```

---

## Part 4: Iterative Refinement

### Example: 5-Iteration Journey

**v1.0 - Initial:**
```
"Explain blockchain"
```
**Result:** Generic Wikipedia-style definition
**Score:** 2/5

**v1.1 - Add Audience:**
```
"Explain blockchain to a business executive"
```
**Result:** Better context, but still technical
**Score:** 3/5

**v1.2 - Specify Format:**
```
"Explain blockchain to a business executive in 3 paragraphs: what it is,
why it matters for business, real use cases"
```
**Result:** Structured, more relevant
**Score:** 3.5/5

**v1.3 - Add Constraints:**
```
"Explain blockchain to a non-technical business executive in 3 paragraphs:
what it is, why it matters, real use cases. Avoid technical jargon. Focus
on business value, not technical mechanics. 200 words max."
```
**Result:** Clear, business-focused, appropriate length
**Score:** 4.5/5

**v1.4 - Add Role:**
```
"You are a business technology consultant explaining complex tech simply.

Explain blockchain to a non-technical CEO in 3 paragraphs: what it is
(simple analogy), why it matters for their business, 2 real use cases
in their industry.

Avoid jargon. Focus on ROI and competitive advantage. 200 words max.

Industry: Supply chain logistics"
```
**Result:** Perfect - role-appropriate, industry-specific, actionable
**Score:** 5/5

**Stop Condition Met:** Quality threshold reached, further iterations show diminishing returns

---

## Part 5: Prompt Versioning

### Example Version History

```markdown
# Prompt: Customer Support Email Response v2.3

## Current Version (v2.3)
You are a customer support specialist at [Company]. Respond to customer
emails with:

1. Acknowledgment of their specific concern
2. Clear explanation or solution
3. Next steps with timeline
4. Offer of further assistance

Tone: Professional, empathetic, solution-focused
Length: 100-150 words
Include: Ticket reference number

Customer email:
[Customer email here]

## Change Log

### v2.3 - 2024-01-20
- **Added:** Ticket reference number requirement
- **Reason:** Customer service team needed tracking for follow-ups
- **Impact:** 100% of responses now include ticket number

### v2.2 - 2024-01-15
- **Changed:** Length from 150-200 to 100-150 words
- **Reason:** Customer feedback indicated responses too long
- **Impact:** Average response length reduced by 30%, satisfaction improved

### v2.1 - 2024-01-10
- **Added:** "Next steps with timeline" requirement
- **Reason:** Customers wanted clarity on what happens next
- **Impact:** Follow-up questions reduced by 40%

### v2.0 - 2024-01-05
- **Major change:** Restructured to 4-point format (was freeform)
- **Reason:** Inconsistent responses, missing key elements
- **Impact:** Response quality improved from 3.2/5 to 4.5/5

### v1.0 - 2023-12-01
- Initial version
- No structured format, inconsistent results

## Performance Metrics
- Accuracy: 4.5/5
- Tone appropriateness: 4.7/5
- Customer satisfaction impact: +23% since v1.0
- Last tested: 2024-01-20

## Known Issues
- Occasionally too formal for very casual customer tone
- May need industry-specific variants for technical products
```

---

## Grading Rubric Summary

| Component | Full Credit Criteria |
|-----------|---------------------|
| DEBUG Process (25pts) | All 5 steps applied, hypothesis testing, systematic approach |
| A/B Testing (25pts) | Proper test design, clear criteria, quantitative comparison |
| Mistake Identification (20pts) | Identifies issues, provides specific fixes, explains rationale |
| Iteration (20pts) | Shows progression, documents changes, reaches quality threshold |
| Versioning (10pts) | Proper version numbers, complete change log, metrics tracked |

---

## Key Insights

**Debugging:**
- One change at a time (isolate variables)
- Document everything (you'll forget)
- Test systematically (don't guess)
- Stop when quality threshold met

**A/B Testing:**
- Change ONE thing between versions
- Define success criteria BEFORE testing
- Use multiple test cases (not just one)
- Quantitative beats subjective

**Iteration:**
- Expect 3-5 versions to reach quality
- Early iterations = big changes
- Later iterations = fine-tuning
- Diminishing returns tell you to stop

**Versioning:**
- Track what changed and why
- Never lose a working prompt
- Version numbers show significance (major.minor)
- Performance metrics validate changes

---

*Solution Guide | Module 5 | Prompt Engineering Masterclass*
