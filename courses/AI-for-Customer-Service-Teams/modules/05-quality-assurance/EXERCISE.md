# Module 5 Exercise: AI-Powered Quality Assurance

## Exercise Overview

**Total Points:** 100
**Estimated Time:** 2 hours
**Submission:** Document with rubric design, sample evaluations, and analysis

In this hands-on exercise, you'll design an AI QA system including a scoring rubric, compliance rules, and coaching insights. You'll then apply your system to sample interactions and analyze the results.

---

## Part 1: QA Rubric Design (30 points)

### Task
Design a comprehensive AI-optimized QA scoring rubric for an e-commerce customer service team.

### Context
You're creating a QA system for "HomeStyle" - an online furniture and home goods retailer. Their support team handles orders, returns, delivery questions, and product inquiries via chat and email.

### Instructions

**Step 1: Define Scoring Categories (10 points)**

Create 5 scoring categories with clear definitions:

```yaml
qa_rubric:
  name: "HomeStyle Customer Service Quality Rubric"
  total_points: 100

  categories:
    - name: "[Category 1]"
      weight: [points out of 100]
      description: "[What this category evaluates]"
      why_important: "[Business reason for including]"

    - name: "[Category 2]"
      weight: [points]
      description: "[Description]"
      why_important: "[Reason]"

    # Continue for all 5 categories
```

Ensure weights total 100 points.

**Step 2: Create Detailed Criteria (15 points)**

For each category, create 2-4 specific criteria. Each criterion needs:

```yaml
criteria:
  - id: "[Unique ID]"
    category: "[Parent category]"
    description: "[What this measures - specific and measurable]"
    points: [number]
    evaluation_type: [binary/scale/conditional]
    ai_detection_method: "[How AI will evaluate this]"
    examples:
      passing: "[Example of passing this criterion]"
      failing: "[Example of failing this criterion]"
```

Create at least 12 total criteria across all categories.

**Step 3: Calibration Guide (5 points)**

Create a calibration guide for ambiguous cases:

| Criterion | Ambiguous Situation | How to Score | Rationale |
|-----------|---------------------|--------------|-----------|
| [ID] | "[Situation]" | [Score X] | "[Why]" |

Include at least 6 calibration examples.

### Deliverable
- Complete rubric with 5 categories
- 12+ criteria with AI detection methods
- Calibration guide with 6+ examples

### Grading Criteria
- Category coverage and balance (10 points)
- Criteria specificity and measurability (10 points)
- AI detection methods clarity (5 points)
- Calibration guide usefulness (5 points)

---

## Part 2: Evaluate Sample Interactions (25 points)

### Task
Apply your rubric to score 3 sample customer service interactions.

### Instructions

Score each interaction using your rubric from Part 1.

**Interaction 1: Order Status Inquiry**

```
Customer (Sarah M., 2-year customer, Premium tier):
"Hi, I ordered a sectional sofa (order #HS-78432) on November 15th.
The confirmation said delivery by November 25th but I haven't heard
anything. Can you tell me where my order is?"

Agent (Mike T.):
"Hi Sarah,

Let me look into that for you. I can see your order for the Milano
Sectional Sofa. It looks like it's currently at our regional
warehouse and is scheduled for delivery on November 28th.

I apologize for the slight delay - we had some shipping logistics
issues this week due to the holiday. You should receive a text
with your delivery window tomorrow.

Is there anything else I can help with?

Mike"
```

**Interaction 2: Return Request**

```
Customer (John D., new customer):
"I received my coffee table today and it has a scratch on the top.
This is not acceptable for a $400 table. I want to return it and
get my money back. Very disappointed."

Agent (Lisa K.):
"I'm sorry to hear the table arrived damaged.

I can process a return and full refund for you. There's no
restocking fee for damaged items. You have two options:

1. We can schedule a pickup (free, takes 5-7 business days)
2. You can drop it at any FedEx location using a prepaid label

Which would you prefer? Once we receive the table back, your
refund will process within 3-5 business days to your original
payment method."
```

**Interaction 3: Product Question**

```
Customer (Maria L., first contact):
"looking at the oak dining table on your site. does it need
assembly? also whats return policy"

Agent (Tom R.):
"The oak dining table requires minimal assembly - just attaching
the legs which takes about 20 minutes. Tools included.

Returns accepted within 30 days, must be unassembled and in
original packaging. $75 restocking fee applies.

let me know if you have other questions"
```

**For Each Interaction, Provide:**

```
INTERACTION EVALUATION: #[Number]

SCORES BY CATEGORY:
| Category | Score | Max | Notes |
|----------|-------|-----|-------|
| [Cat 1]  |       |     |       |
| [Cat 2]  |       |     |       |
...

OVERALL SCORE: [X]/100

CRITERION-LEVEL DETAIL:
| Criterion | Score | Evidence from Interaction |
|-----------|-------|---------------------------|
| [G1]      |       | "[Quote or observation]"  |
| [G2]      |       | "[Quote or observation]"  |
...

STRENGTHS:
- [What the agent did well]
- [What the agent did well]

IMPROVEMENT AREAS:
- [Area for improvement + specific suggestion]
- [Area for improvement + specific suggestion]

CONFIDENCE: [High/Medium/Low]
CONFIDENCE REASON: [Why this confidence level]
```

### Deliverable
- Complete evaluation for all 3 interactions
- Scores with supporting evidence
- Strengths and improvement areas for each

### Grading Criteria
- Scoring accuracy and consistency (10 points)
- Evidence quality (8 points)
- Feedback usefulness (7 points)

---

## Part 3: Compliance Monitoring (20 points)

### Task
Design compliance monitoring rules and apply them to the sample interactions.

### Instructions

**Step 1: Define Compliance Rules (12 points)**

Create 8 compliance rules for HomeStyle:

```yaml
compliance_rules:
  - rule_id: "COMP-[number]"
    name: "[Descriptive name]"
    category: [policy/legal/brand/security]
    severity: [critical/high/medium/low]
    description: "[What this rule checks for]"
    detection_method: |
      [How AI would detect violations - be specific]
    examples:
      violation: "[Example of violation]"
      compliant: "[Example of compliance]"
    action_on_violation: "[What happens if detected]"
```

Include rules covering:
- Pricing and discount policies
- Return policy disclosure
- Data/privacy protection
- Brand voice compliance
- Unauthorized promises
- Required disclosures

**Step 2: Compliance Scan Results (8 points)**

Scan the 3 sample interactions from Part 2 for compliance issues:

```
COMPLIANCE SCAN RESULTS

Interaction #1:
- Rules Checked: [number]
- Violations Found: [number]
- Flags:
  - [Rule ID]: [Issue found or "Compliant"]
  - [Rule ID]: [Issue found or "Compliant"]

Interaction #2:
[Same format]

Interaction #3:
[Same format]

SUMMARY:
- Total Interactions: 3
- Compliant: [number]
- Violations: [number]
- Critical Issues: [number]
- Recommendations: [Based on findings]
```

### Deliverable
- 8 compliance rules with detection methods
- Compliance scan of all 3 interactions

### Grading Criteria
- Rule comprehensiveness (8 points)
- Detection method clarity (4 points)
- Scan accuracy (5 points)
- Actionable recommendations (3 points)

---

## Part 4: Coaching Insights Report (25 points)

### Task
Generate coaching insights from the evaluation data.

### Instructions

**Step 1: Individual Agent Report (10 points)**

Based on Interaction #3 (Tom R.), create a coaching report:

```yaml
agent_coaching_report:
  agent_name: "Tom R."
  evaluation_period: "November 2024"
  interactions_reviewed: 1  # (In real scenario, would be more)

  overall_score: [score from Part 2]

  strengths:
    - area: "[Strong area]"
      evidence: "[From interaction]"
      recognition: "[How to acknowledge this]"

  improvement_priorities:
    - priority: 1
      area: "[Improvement area]"
      current_performance: "[Score or description]"
      target_performance: "[Goal]"
      specific_issue: "[What exactly needs to change]"
      coaching_approach: |
        [Detailed coaching suggestions - 50+ words]
      example_of_better_response: |
        [Rewrite the relevant part of their response showing improvement]
      success_metric: "[How to measure improvement]"

    - priority: 2
      [Same structure]

  practice_exercises:
    - exercise: "[Specific practice activity]"
      focus_area: "[What it addresses]"
      instructions: "[How to do it]"

  follow_up_plan:
    check_in_date: "[When]"
    metrics_to_review: "[What to look at]"
```

**Step 2: Team Pattern Analysis (8 points)**

If these 3 agents were a team, analyze the patterns:

```
TEAM PATTERN ANALYSIS
Team: HomeStyle Support (Sample)
Period: November 2024

OVERALL TEAM PERFORMANCE:
Average Score: [Calculate from 3 evaluations]
Score Range: [Lowest] - [Highest]

CATEGORY PERFORMANCE:
| Category        | Avg Score | Team Gap | Priority |
|-----------------|-----------|----------|----------|
| [Category 1]    |           | [+/-]    | [H/M/L]  |
| [Category 2]    |           | [+/-]    | [H/M/L]  |
...

PATTERNS IDENTIFIED:
1. [Pattern] - "[Evidence from evaluations]"
2. [Pattern] - "[Evidence from evaluations]"
3. [Pattern] - "[Evidence from evaluations]"

TEAM TRAINING RECOMMENDATIONS:
Based on the patterns above, recommend training focus:

1. [Training Topic]
   Addresses: [Pattern/gap]
   Format: [Workshop/module/coaching]
   Duration: [Time estimate]
   Expected Impact: [What should improve]

2. [Training Topic]
   [Same structure]
```

**Step 3: Improvement Tracking Plan (7 points)**

Create a plan to track improvement:

```yaml
improvement_tracking_plan:
  baseline_established: "November 2024"

  metrics_to_track:
    - metric: "[Metric name]"
      current_value: "[From evaluations]"
      target_value: "[Goal]"
      timeframe: "[When to achieve]"
      measurement_method: "[How to measure]"

  review_schedule:
    - frequency: "Weekly"
      focus: "[What to review]"
      owner: "[Who reviews]"

    - frequency: "Monthly"
      focus: "[What to review]"
      owner: "[Who reviews]"

  success_criteria:
    - criterion: "[What indicates success]"
    - criterion: "[What indicates success]"

  escalation_triggers:
    - trigger: "[Condition requiring escalation]"
      action: "[What to do]"
```

### Deliverable
- Individual coaching report for Tom R.
- Team pattern analysis
- Improvement tracking plan

### Grading Criteria
- Coaching report actionability (10 points)
- Pattern analysis insight (8 points)
- Tracking plan completeness (7 points)

---

## Submission Requirements

### Format
- Single PDF or Word document
- Clear section headers
- YAML/tables for structured content
- Legible formatting

### Contents Checklist
- [ ] Part 1: QA Rubric (5 categories, 12+ criteria, calibration guide)
- [ ] Part 2: 3 interaction evaluations with scores and feedback
- [ ] Part 3: 8 compliance rules + scan results
- [ ] Part 4: Coaching report + team analysis + tracking plan

### Submission
Upload to course portal by module deadline.

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Part 1: QA Rubric Design | 30 | Completeness, measurability, AI-readiness |
| Part 2: Sample Evaluations | 25 | Accuracy, consistency, feedback quality |
| Part 3: Compliance Monitoring | 20 | Rule coverage, detection clarity |
| Part 4: Coaching Insights | 25 | Actionability, pattern recognition |
| **Total** | **100** | |

### Grade Scale
- A: 90-100 - Production-ready QA system design
- B: 80-89 - Strong design with minor gaps
- C: 70-79 - Satisfactory, meets requirements
- F: Below 70 - Incomplete or significant issues

---

## Tips for Success

1. **Be Specific**: Vague criteria can't be measured. "Good tone" → "Uses customer name + positive language"

2. **Think AI**: How would an algorithm detect this? Can it be objectively measured?

3. **Use Evidence**: Every score should have supporting evidence from the interaction.

4. **Actionable Coaching**: Don't just identify problems—provide specific ways to improve.

5. **Real-World Application**: Design as if you'll actually implement this system.

---

## Extension Activities (Optional)

### For Advanced Learners:

1. **Calibration Session**: Score the 3 interactions independently, then compare with a colleague.

2. **Rubric A/B Test**: Create two versions of one criterion and test which is more measurable.

3. **AI Implementation**: Write the actual prompts you would use for AI scoring.

4. **ROI Analysis**: Calculate the time/cost savings of AI QA vs. manual review.

---

*Exercise 5 of 9 | AI for Customer Service Teams | 100 points total*
