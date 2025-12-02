# Module 6 Exercise: CRM & Pipeline Intelligence Lab

## Exercise Overview

**Total Points:** 100
**Estimated Time:** 2.5 hours
**Submission:** CRM enrichment samples, pipeline analysis, and win/loss analysis

In this exercise, you'll apply AI to CRM data management, pipeline analysis, and sales pattern recognition.

---

## Part 1: CRM Data Enrichment (25 points)

### Task
Enrich CRM records using AI and document the process.

### Instructions

**Step 1: Identify Records Needing Enrichment**

Select 10 records from your CRM (or create sample records):

```yaml
records_to_enrich:
  record_1:
    company: "[Name]"
    website: "[URL if known]"
    current_data:
      industry: "[Current value or 'Missing']"
      employee_count: "[Current or 'Missing']"
      revenue: "[Current or 'Missing']"
      description: "[Current or 'Missing']"
    gaps_to_fill:
      - "[Field 1]"
      - "[Field 2]"

  # Document 10 records
```

**Step 2: Batch Enrichment**

Use AI to enrich the records:

```yaml
enrichment_batch:
  prompt_used: |
    [Your prompt for batch enrichment]

  ai_output: |
    [Paste AI-generated enrichment data]

  verification_results:
    record_1:
      field: "[Field enriched]"
      ai_value: "[What AI provided]"
      verified: "[Yes/No/Partially]"
      verification_source: "[How you verified]"
      final_value: "[What you'll use]"

    # Document verification for at least 5 records
```

**Step 3: Data Quality Assessment**

```yaml
enrichment_assessment:
  records_enriched: [10]
  fields_filled: [Total number of fields]

  accuracy_metrics:
    accurate_on_first_try: "[Number and %]"
    needed_correction: "[Number and %]"
    could_not_verify: "[Number and %]"

  time_comparison:
    manual_estimated: "[X minutes per record]"
    ai_assisted_actual: "[X minutes per record]"
    time_saved: "[X%]"

  quality_observations: |
    [What you learned about AI enrichment quality - 50-75 words]

  recommendations: |
    [How you'd use AI enrichment going forward - 50-75 words]
```

### Deliverable
- 10 records with enrichment documentation
- Verification results for 5+ records
- Quality assessment

### Grading Criteria
- Enrichment completeness (10 points)
- Verification thoroughness (8 points)
- Quality assessment insights (7 points)

---

## Part 2: Activity Automation (20 points)

### Task
Convert raw notes and emails into structured CRM entries.

### Instructions

**Step 1: Call Note Conversion**

Take raw call notes and convert them:

```yaml
call_note_conversion:
  call_context:
    contact: "[Name]"
    company: "[Company]"
    call_type: "[Discovery/Demo/Follow-up]"
    date: "[Date]"
    duration: "[Length]"

  raw_notes: |
    [Paste actual raw notes or create realistic example - 200-300 words of messy notes]

  ai_prompt_used: |
    [Your prompt for conversion]

  ai_structured_output: |
    [The structured CRM note AI generated]

  edits_made:
    - original: "[AI text]"
      edited: "[Your edit]"
      reason: "[Why]"

  final_crm_note: |
    [The final version you'd save to CRM]

  time_to_create:
    manual_estimate: "[X minutes]"
    ai_assisted_actual: "[X minutes]"
```

**Step 2: Email Thread Summary**

Summarize an email thread for CRM:

```yaml
email_summary:
  thread_context:
    contact: "[Name]"
    company: "[Company]"
    subject: "[Email subject]"
    email_count: [Number in thread]

  email_thread: |
    [Paste email thread or create realistic example - 3-5 emails]

  ai_summary: |
    [AI-generated summary]

  final_crm_entry: |
    [Final entry after your review]
```

**Step 3: Activity Templates**

Create reusable templates:

```yaml
activity_templates:
  discovery_call_template:
    template: |
      [Template for discovery call notes]
    placeholders:
      - "[PAIN_POINTS]"
      - "[DECISION_PROCESS]"
      - "[NEXT_STEPS]"

  demo_call_template:
    template: |
      [Template for demo follow-up notes]
    placeholders:
      - "[FEATURES_SHOWN]"
      - "[QUESTIONS_ASKED]"
      - "[INTEREST_LEVEL]"

  email_summary_template:
    template: |
      [Template for email thread summaries]
```

### Deliverable
- 1 call note conversion
- 1 email thread summary
- 3 activity templates

### Grading Criteria
- Note conversion quality (8 points)
- Email summary quality (6 points)
- Template usefulness (6 points)

---

## Part 3: Pipeline Analysis (30 points)

### Task
Conduct a comprehensive pipeline analysis.

### Instructions

**Step 1: Create Pipeline Data**

Document your current pipeline (real or representative):

```yaml
pipeline_snapshot:
  period: "[Current quarter/month]"
  quota: "[$X]"
  total_pipeline: "[$X]"
  coverage_ratio: "[X]x"

  deals_by_stage:
    prospecting:
      count: [number]
      value: "[$X]"
    discovery:
      count: [number]
      value: "[$X]"
    demo_proposal:
      count: [number]
      value: "[$X]"
    negotiation:
      count: [number]
      value: "[$X]"
    commit:
      count: [number]
      value: "[$X]"

  detailed_deals:
    deal_1:
      company: "[Name]"
      amount: "[$X]"
      stage: "[Stage]"
      close_date: "[Date]"
      days_in_stage: [number]
      last_activity: "[Date]"
      contacts_engaged: [number]
      champion: "[Yes/No]"
      competition: "[Who if any]"
      notes: "[Brief status]"

    # Include 8-12 deals
```

**Step 2: AI Pipeline Analysis**

```yaml
pipeline_analysis:
  prompt_used: |
    [Your pipeline analysis prompt]

  ai_analysis: |
    [AI-generated analysis]

  key_findings:
    pipeline_health:
      overall_assessment: "[Healthy/Concerning/At-risk]"
      rationale: "[Why this assessment]"

    at_risk_deals:
      - deal: "[Company]"
        risk: "[What's concerning]"
        action: "[What to do]"
      # List all at-risk deals

    strongest_deals:
      - deal: "[Company]"
        strength: "[Why strong]"
        acceleration: "[How to close faster]"
      # List top 3 strongest

    gaps_identified:
      - "[Gap 1]"
      - "[Gap 2]"

  forecast_implications:
    commit: "[$X]"
    best_case: "[$X]"
    realistic: "[$X]"
    rationale: |
      [Why these numbers]
```

**Step 3: Deal-Level Risk Analysis**

Select 2 deals for deep risk analysis:

```yaml
deal_risk_analysis:
  deal_1:
    company: "[Name]"
    amount: "[$X]"
    stage: "[Stage]"
    expected_close: "[Date]"

    risk_factors:
      - risk: "[Risk factor 1]"
        severity: "[High/Medium/Low]"
        evidence: "[Why you see this]"
        mitigation: "[What to do]"
      # Include 3-5 risk factors

    strengths:
      - "[Strength 1]"
      - "[Strength 2]"

    probability_assessment:
      current_probability: "[X%]"
      adjusted_probability: "[X%]"
      rationale: "[Why adjustment]"

    action_plan:
      immediate: "[This week]"
      short_term: "[Next 2 weeks]"
      to_close: "[What must happen]"

  deal_2:
    # Same structure
```

### Deliverable
- Complete pipeline snapshot
- AI analysis with key findings
- 2 deal risk analyses

### Grading Criteria
- Pipeline documentation (10 points)
- Analysis quality (12 points)
- Deal risk assessments (8 points)

---

## Part 4: Win/Loss Analysis (25 points)

### Task
Analyze win/loss patterns from recent deals.

### Instructions

**Step 1: Document Recent Outcomes**

```yaml
recent_outcomes:
  wins:
    win_1:
      company: "[Name]"
      amount: "[$X]"
      industry: "[Industry]"
      company_size: "[Size]"
      sales_cycle: "[X days]"
      lead_source: "[How they came in]"
      win_reason: "[Why we won]"
      key_factors:
        - "[Factor 1]"
        - "[Factor 2]"
      contacts_engaged: [number]
      competitor: "[Who we beat]"

    # Document 4-6 wins

  losses:
    loss_1:
      company: "[Name]"
      amount: "[$X]"
      industry: "[Industry]"
      company_size: "[Size]"
      sales_cycle: "[X days]"
      lead_source: "[How they came in]"
      loss_reason: "[Why we lost]"
      key_factors:
        - "[Factor 1]"
        - "[Factor 2]"
      stage_lost: "[Where it died]"
      competitor: "[Who won, if known]"

    # Document 4-6 losses

  no_decisions:
    nd_1:
      company: "[Name]"
      amount: "[$X]"
      reason: "[Why no decision]"
      key_factors:
        - "[Factor 1]"

    # Document 2-3 no-decisions
```

**Step 2: Pattern Analysis**

```yaml
pattern_analysis:
  ai_prompt_used: |
    [Your analysis prompt]

  ai_analysis: |
    [AI-generated pattern analysis]

  win_patterns:
    common_characteristics:
      - "[Characteristic 1]"
      - "[Characteristic 2]"
      - "[Characteristic 3]"
    successful_approaches:
      - "[What worked 1]"
      - "[What worked 2]"
    ideal_customer_signals:
      - "[Signal that predicts success]"
      - "[Another signal]"

  loss_patterns:
    common_characteristics:
      - "[Characteristic 1]"
      - "[Characteristic 2]"
    warning_signs:
      - "[Early warning 1]"
      - "[Early warning 2]"
    competitive_weaknesses:
      - "[Where we lose to competition]"

  no_decision_patterns:
    reasons:
      - "[Common reason 1]"
      - "[Common reason 2]"
    prevention:
      - "[How to prevent]"
```

**Step 3: Action Plan**

```yaml
improvement_action_plan:
  icp_refinement:
    current_icp: |
      [Current ideal customer description]
    recommended_refinement: |
      [How to update based on win/loss data]

  process_improvements:
    - improvement: "[Process change 1]"
      addresses: "[What pattern it fixes]"
      implementation: "[How to implement]"
    - improvement: "[Process change 2]"
      addresses: "[What it fixes]"
      implementation: "[How to implement]"

  qualification_updates:
    add_to_qualification:
      - "[Question/criterion to add]"
    warning_signs_to_watch:
      - "[Red flag to monitor]"

  competitive_positioning:
    - adjustment: "[Positioning change]"
      based_on: "[What loss pattern]"

  skills_development:
    - skill: "[Skill to develop]"
      based_on: "[What patterns show]"
```

### Deliverable
- Documented wins, losses, no-decisions
- Pattern analysis
- Action plan

### Grading Criteria
- Data documentation (8 points)
- Pattern identification (10 points)
- Actionable recommendations (7 points)

---

## Submission Requirements

### Format
- Single PDF or Word document
- Organized by parts
- Clear data tables and analysis

### Contents Checklist
- [ ] Part 1: 10 enrichment records with verification
- [ ] Part 1: Quality assessment
- [ ] Part 2: Call note conversion
- [ ] Part 2: Email thread summary
- [ ] Part 2: 3 activity templates
- [ ] Part 3: Pipeline snapshot with 8-12 deals
- [ ] Part 3: AI analysis and findings
- [ ] Part 3: 2 deal risk analyses
- [ ] Part 4: Win/loss documentation (10+ deals)
- [ ] Part 4: Pattern analysis
- [ ] Part 4: Action plan

### Submission
Upload to course portal by module deadline.

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Part 1: CRM Enrichment | 25 | Completeness, verification |
| Part 2: Activity Automation | 20 | Note quality, templates |
| Part 3: Pipeline Analysis | 30 | Analysis depth, insights |
| Part 4: Win/Loss Analysis | 25 | Patterns, action plan |
| **Total** | **100** | |

### Grade Scale
- A: 90-100 - Analysis ready for management presentation
- B: 80-89 - Strong analysis with minor gaps
- C: 70-79 - Satisfactory, meets requirements
- F: Below 70 - Incomplete or significant issues

---

*Exercise 6 of 7 | AI for Sales Teams | 100 points total*
