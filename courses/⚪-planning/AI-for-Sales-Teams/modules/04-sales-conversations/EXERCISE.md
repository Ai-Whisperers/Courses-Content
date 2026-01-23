# Module 4 Exercise: Sales Conversations Lab

## Exercise Overview

**Total Points:** 100
**Estimated Time:** 2.5 hours
**Submission:** Call preparation documents, discovery questions, and follow-up materials

In this exercise, you'll prepare for sales conversations using AI, creating reusable assets for your sales process.

---

## Part 1: Pre-Call Briefing (30 points)

### Task
Create comprehensive pre-call briefings for 2 upcoming or hypothetical sales calls.

### Instructions

**Step 1: Define Your Calls**

```yaml
call_1:
  contact: "[Name]"
  title: "[Title]"
  company: "[Company]"
  call_type: "[Discovery / Demo / Follow-up / Negotiation]"
  scheduled: "[Date/Time or 'Hypothetical']"
  purpose: "[Why this call is happening]"
  context: "[How you got here - prior emails, referral, etc.]"

call_2:
  # Different call type than call 1
  contact: "[Name]"
  title: "[Title]"
  company: "[Company]"
  call_type: "[Different type from call 1]"
  scheduled: "[Date/Time or 'Hypothetical']"
  purpose: "[Purpose]"
  context: "[Context]"
```

**Step 2: Generate AI-Assisted Briefings**

For each call, create a complete briefing document:

```yaml
call_briefing:
  contact: "[Name]"
  company: "[Company]"
  call_type: "[Type]"

  quick_reference:
    company_facts:
      - "[Key fact 1]"
      - "[Key fact 2]"
      - "[Key fact 3]"
    contact_facts:
      - "[Contact fact 1]"
      - "[Contact fact 2]"
      - "[Contact fact 3]"
    recent_development: "[Most important recent news/trigger]"

  call_objectives:
    primary: "[Main goal for this call]"
    secondary:
      - "[Secondary goal 1]"
      - "[Secondary goal 2]"
    minimum_outcome: "[What's acceptable if full objectives not met]"

  opening_strategy:
    rapport_builder: "[How to start warmly]"
    agenda_statement: |
      "[How you'll frame the call]"
    time_confirmation: "[How to confirm time available]"

  key_questions:
    must_ask:
      - question: "[Question 1]"
        why: "[Why this matters]"
        listen_for: "[What to note in answer]"
      - question: "[Question 2]"
        why: "[Why important]"
        listen_for: "[What to note]"
      - question: "[Question 3]"
        why: "[Why important]"
        listen_for: "[What to note]"
    follow_up_probes:
      - "[Probe 1]"
      - "[Probe 2]"
      - "[Probe 3]"
    qualification_question: "[BANT question]"

  value_points:
    primary_benefit: "[Main value to emphasize]"
    proof_point: "[Case study or data point]"
    differentiation: "[Why us vs. alternatives]"

  objection_preparation:
    objection_1:
      anticipated: "[Likely objection]"
      response: |
        "[Your response]"
    objection_2:
      anticipated: "[Another objection]"
      response: |
        "[Your response]"
    objection_3:
      anticipated: "[Third objection]"
      response: |
        "[Your response]"

  close_strategy:
    primary_next_step: "[What you'll propose]"
    alternative_next_step: "[Backup if primary declined]"
    commitment_question: "[How you'll gain agreement]"

  one_page_summary: |
    [Create a scannable 1-page version you could reference during the call]
```

### Deliverable
- 2 complete pre-call briefings
- One-page reference versions

### Grading Criteria
- Briefing completeness (12 points)
- Question quality (8 points)
- Objection preparation (5 points)
- Practicality for actual use (5 points)

---

## Part 2: Discovery Question Library (25 points)

### Task
Build a comprehensive discovery question library for your sales motion.

### Instructions

**Step 1: Define Your Context**

```yaml
sales_context:
  what_you_sell: "[Your solution]"
  target_audience: "[Who you sell to]"
  key_value_propositions:
    - "[Value prop 1]"
    - "[Value prop 2]"
    - "[Value prop 3]"
  common_pain_points:
    - "[Pain point 1]"
    - "[Pain point 2]"
    - "[Pain point 3]"
  main_competitors: "[Top 2-3 competitors]"
```

**Step 2: Generate Questions by Category**

Create a library of questions using AI, then curate the best:

```yaml
discovery_question_library:
  situation_questions:
    - question: "[Question 1]"
      purpose: "[What you learn]"
      when_to_use: "[Early discovery / Follow-up / etc.]"
      follow_up: "[If they say X, ask Y]"

    # Include 8-10 situation questions

  problem_questions:
    - question: "[Question 1]"
      purpose: "[What you learn]"
      pain_point_addressed: "[Which pain point this explores]"
      follow_up: "[Deeper probe]"

    # Include 8-10 problem questions

  implication_questions:
    - question: "[Question 1]"
      purpose: "[Quantifies impact of X problem]"
      when_to_use: "[After they confirm problem]"
      expected_insight: "[What you hope to learn]"

    # Include 5-6 implication questions

  need_payoff_questions:
    - question: "[Question 1]"
      purpose: "[Has them articulate value of solving]"
      connects_to: "[Which value prop]"
      sets_up: "[What this leads to]"

    # Include 5-6 need-payoff questions

  qualification_questions:
    budget:
      - question: "[Budget question]"
        alternative: "[Softer version]"
    authority:
      - question: "[Decision maker question]"
        alternative: "[Softer version]"
    need:
      - question: "[Priority/need question]"
        alternative: "[Softer version]"
    timeline:
      - question: "[Timing question]"
        alternative: "[Softer version]"
```

**Step 3: Create Role-Specific Variations**

For 2 different buyer roles, customize questions:

```yaml
role_specific_questions:
  role_1:
    title: "[e.g., VP of Sales]"
    priorities: "[What this role cares about]"
    customized_questions:
      - question: "[Role-specific question 1]"
        why_relevant: "[Why this matters to this role]"
      - question: "[Role-specific question 2]"
        why_relevant: "[Why relevant]"
      - question: "[Role-specific question 3]"
        why_relevant: "[Why relevant]"

  role_2:
    title: "[e.g., IT Director]"
    priorities: "[What this role cares about]"
    customized_questions:
      - question: "[Role-specific question 1]"
        why_relevant: "[Why relevant]"
      # Continue for 3 questions
```

### Deliverable
- Complete discovery question library (30+ questions)
- Role-specific customizations for 2 roles

### Grading Criteria
- Question variety and coverage (10 points)
- Question quality and depth (8 points)
- Role customization (4 points)
- Follow-up guidance (3 points)

---

## Part 3: Objection Response Playbook (25 points)

### Task
Create a comprehensive objection handling playbook.

### Instructions

**Step 1: Identify Common Objections**

List objections you encounter, organized by category:

```yaml
objection_inventory:
  price_objections:
    - "[Objection 1]"
    - "[Objection 2]"
  timing_objections:
    - "[Objection 1]"
    - "[Objection 2]"
  authority_objections:
    - "[Objection 1]"
    - "[Objection 2]"
  need_fit_objections:
    - "[Objection 1]"
    - "[Objection 2]"
  competitive_objections:
    - "[Objection 1]"
    - "[Objection 2]"
  trust_objections:
    - "[Objection 1]"
    - "[Objection 2]"
```

**Step 2: Create Response Playbook**

For 8 objections (at least one from each category), create full responses:

```yaml
objection_response:
  objection: "[The objection]"
  category: "[Price/Timing/Authority/Need/Competitive/Trust]"
  frequency: "[How often you hear this - Common/Occasional/Rare]"

  warning_signs:
    - "[What might signal this is coming]"
    - "[Another warning sign]"

  underlying_concern: |
    [What they're really worried about - the root cause]

  response_framework:
    acknowledge: |
      "[How to acknowledge their concern genuinely]"

    probe: |
      "[Question to understand better]"
      [What to listen for in answer]

    respond: |
      "[The core response to address the concern]"

    prove: |
      "[Proof point, case study, or data]"

    confirm: |
      "[Question to check if concern is resolved]"

    pivot: |
      "[How to move conversation forward]"

  full_example: |
    [Write out a complete conversational response showing
    the full framework in action - 100-150 words]

  variations:
    if_early_stage: "[How to adjust for discovery calls]"
    if_late_stage: "[How to adjust for negotiation]"

  never_say:
    - "[Response to avoid]"
    - "[Another thing to avoid]"
```

### Deliverable
- Objection inventory by category
- 8 complete response playbooks

### Grading Criteria
- Response quality and completeness (12 points)
- Framework application (6 points)
- Variations and context (4 points)
- Example realism (3 points)

---

## Part 4: Post-Call Follow-up Templates (20 points)

### Task
Create follow-up email templates for different call outcomes.

### Instructions

**Step 1: Define Follow-up Scenarios**

```yaml
follow_up_scenarios:
  positive_discovery:
    description: "Good discovery call, clear next step agreed"
    typical_next_step: "[Demo / Proposal / Technical review]"

  demo_completed:
    description: "Demo went well, prospect engaged"
    typical_next_step: "[Proposal / Trial / Decision maker meeting]"

  objections_raised:
    description: "Good call but concerns need addressing"
    typical_next_step: "[Information / Case study / Peer reference]"

  stalled_opportunity:
    description: "No clear next step, need to maintain relationship"
    typical_next_step: "[Stay in touch / Nurture]"
```

**Step 2: Create Template for Each Scenario**

For each scenario, create a complete follow-up template:

```yaml
follow_up_template:
  scenario: "[Positive Discovery / Demo / Objections / Stalled]"

  subject_line_options:
    - "[Option 1]"
    - "[Option 2]"

  template: |
    Hi [Name],

    [Opening - thank them, reference specific conversation point]

    [Body - summarize key discussion points using placeholders]
    • [Point 1 placeholder]
    • [Point 2 placeholder]
    • [Point 3 placeholder]

    [Transition to next steps]

    [Resources/attachments reference if applicable]

    [Clear CTA]

    [Sign-off]

  placeholders_to_customize:
    - "[Point 1]" - Replace with: [What to fill in]
    - "[Point 2]" - Replace with: [What to fill in]
    # List all placeholders

  customization_time: "[Estimated minutes to personalize]"

  example_completed: |
    [Show one fully completed example - 100-150 words]
```

**Step 3: Create CRM Note Templates**

For each scenario, create a CRM documentation template:

```yaml
crm_note_template:
  scenario: "[Scenario name]"

  template: |
    CALL SUMMARY:
    [1-2 sentence overview placeholder]

    KEY FINDINGS:
    - Pain Points: [placeholder]
    - Current Solution: [placeholder]
    - Decision Process: [placeholder]
    - Timeline: [placeholder]
    - Budget: [placeholder]
    - Competition: [placeholder]

    NEXT STEPS:
    - Action: [placeholder]
    - Owner: [placeholder]
    - Due: [placeholder]

    OPPORTUNITY UPDATE:
    - Stage: [placeholder]
    - Close Date: [placeholder]
    - Notes: [placeholder]
```

### Deliverable
- 4 follow-up email templates with examples
- 4 CRM note templates

### Grading Criteria
- Template usefulness (8 points)
- Customization guidance (5 points)
- Example quality (4 points)
- CRM templates (3 points)

---

## Submission Requirements

### Format
- Single PDF or Word document
- Organized by parts
- Templates should be copy-paste ready

### Contents Checklist
- [ ] Part 1: 2 pre-call briefings with 1-pagers
- [ ] Part 2: Discovery question library (30+ questions)
- [ ] Part 2: Role-specific customizations (2 roles)
- [ ] Part 3: Objection inventory
- [ ] Part 3: 8 objection response playbooks
- [ ] Part 4: 4 follow-up email templates with examples
- [ ] Part 4: 4 CRM note templates

### Submission
Upload to course portal by module deadline.

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Part 1: Pre-Call Briefings | 30 | Completeness, practicality |
| Part 2: Discovery Questions | 25 | Quality, variety, customization |
| Part 3: Objection Playbook | 25 | Response quality, framework use |
| Part 4: Follow-up Templates | 20 | Usefulness, examples |
| **Total** | **100** | |

### Grade Scale
- A: 90-100 - Resources ready for immediate sales use
- B: 80-89 - Strong materials with minor refinements
- C: 70-79 - Satisfactory, meets requirements
- F: Below 70 - Incomplete or significant issues

---

*Exercise 4 of 7 | AI for Sales Teams | 100 points total*
