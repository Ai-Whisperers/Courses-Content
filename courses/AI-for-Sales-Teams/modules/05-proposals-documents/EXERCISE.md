# Module 5 Exercise: Proposal & Document Lab

## Exercise Overview

**Total Points:** 100
**Estimated Time:** 2.5 hours
**Submission:** Proposal document, quote options, and competitive positioning materials

In this exercise, you'll create sales documents using AI, including a full proposal, quote variations, and competitive positioning materials.

---

## Part 1: Proposal Generation (40 points)

### Task
Create a complete sales proposal for a prospect using AI assistance.

### Instructions

**Step 1: Define Your Opportunity**

```yaml
opportunity_context:
  prospect:
    company: "[Name]"
    contact: "[Name, Title]"
    industry: "[Industry]"
    size: "[Employees/Revenue]"

  discovery_findings:
    current_situation: |
      [Describe their current state - 50-100 words]

    pain_points:
      - pain_point: "[Pain point 1]"
        impact: "[Business impact]"
      - pain_point: "[Pain point 2]"
        impact: "[Business impact]"
      - pain_point: "[Pain point 3]"
        impact: "[Business impact]"

    goals:
      - "[Goal 1]"
      - "[Goal 2]"
      - "[Goal 3]"

    success_criteria: |
      [What success looks like for them]

    decision_criteria:
      - "[Criterion 1 - e.g., ease of implementation]"
      - "[Criterion 2 - e.g., ROI]"
      - "[Criterion 3 - e.g., support quality]"

    competition: "[Who else they're considering]"

  our_solution:
    products: "[What we're proposing]"
    investment: "[$X]"
    timeline: "[Implementation timeline]"
```

**Step 2: Generate AI Draft**

Document your prompt and the AI output:

```yaml
proposal_generation:
  prompt_used: |
    [Paste the full prompt you used]

  ai_draft: |
    [Paste the AI-generated proposal draft]

  sections_generated:
    executive_summary:
      word_count: [number]
      quality_rating: "[1-5]"
      notes: "[Assessment]"

    understanding_needs:
      word_count: [number]
      quality_rating: "[1-5]"
      notes: "[Assessment]"

    proposed_solution:
      word_count: [number]
      quality_rating: "[1-5]"
      notes: "[Assessment]"

    proof_points:
      word_count: [number]
      quality_rating: "[1-5]"
      notes: "[Assessment]"

    investment:
      word_count: [number]
      quality_rating: "[1-5]"
      notes: "[Assessment]"
```

**Step 3: Customize and Finalize**

Document your edits and produce the final proposal:

```yaml
proposal_customization:
  edits_made:
    - section: "[Section name]"
      original: "[Original text]"
      edited: "[Your edited version]"
      reason: "[Why you changed it]"

    # Document at least 5 substantive edits

  additions:
    - section: "[Section]"
      added: "[What you added]"
      reason: "[Why]"

  removals:
    - section: "[Section]"
      removed: "[What you removed]"
      reason: "[Why]"

  accuracy_verification:
    - claim: "[Claim in proposal]"
      verified: "[Yes/No]"
      source: "[How verified]"

    # Verify at least 3 claims

final_proposal: |
  [Paste your complete, finalized proposal - should be 1,500-2,000 words]
```

### Deliverable
- Documented AI prompt and output
- Edit documentation
- Final proposal (1,500-2,000 words)

### Grading Criteria
- Proposal quality and structure (15 points)
- Personalization to prospect (10 points)
- Editing and customization (10 points)
- Accuracy verification (5 points)

---

## Part 2: Quote Options (25 points)

### Task
Create 3 quote variations for your prospect scenario.

### Instructions

**Step 1: Define Pricing Context**

```yaml
pricing_context:
  products_available:
    - product: "[Product 1]"
      list_price: "[$X]"
      description: "[What it does]"

    - product: "[Product 2]"
      list_price: "[$X]"
      description: "[What it does]"

    # Include all relevant products

  discount_authority:
    volume_discount: "[Threshold and %]"
    multi_year_discount: "[Years and %]"
    competitive_discount: "[Maximum %]"

  prospect_constraints:
    budget: "[$X or range]"
    timeline: "[When needed]"
    must_haves: "[Non-negotiable requirements]"
    nice_to_haves: "[Flexible requirements]"
```

**Step 2: Generate Quote Options**

Create 3 distinct quote options:

```yaml
quote_option_1:
  name: "Full Solution"
  positioning: "Complete package addressing all needs"

  components:
    - item: "[Product/Service 1]"
      quantity: [number]
      unit_price: "[$X]"
      line_total: "[$X]"
    # Continue for all items

  subtotal: "[$X]"
  discounts:
    - type: "[Discount type]"
      amount: "[$X or %]"
  total: "[$X]"

  value_justification: |
    [Why this investment makes sense - 50-75 words]

  includes:
    - "[What's included 1]"
    - "[What's included 2]"

  recommended_for: |
    [When to propose this option]

quote_option_2:
  name: "Core Solution"
  positioning: "Essential capabilities at lower investment"
  # Same structure as Option 1

quote_option_3:
  name: "[Scenario-Specific: Multi-year / Competitive / Phased]"
  positioning: "[How positioned]"
  # Same structure as Option 1
```

**Step 3: Create Pricing Summary**

```yaml
pricing_summary:
  comparison_table:
    | Option | Investment | What's Included | Best For |
    |--------|-----------|-----------------|----------|
    | Full Solution | $X | [Brief list] | [Scenario] |
    | Core Solution | $X | [Brief list] | [Scenario] |
    | [Option 3] | $X | [Brief list] | [Scenario] |

  recommendation:
    recommended_option: "[Which option]"
    rationale: |
      [Why this is the right fit for this prospect - 50-75 words]

  negotiation_flexibility:
    - if_they_want_lower: "[How to respond]"
    - if_they_want_more: "[How to respond]"
```

### Deliverable
- 3 complete quote options
- Comparison summary
- Negotiation guidance

### Grading Criteria
- Quote completeness (10 points)
- Option differentiation (8 points)
- Value justification (4 points)
- Strategic positioning (3 points)

---

## Part 3: Case Study Matching (15 points)

### Task
Select and customize case studies for your prospect.

### Instructions

**Step 1: List Available Case Studies**

```yaml
case_study_inventory:
  case_study_1:
    customer: "[Company name]"
    industry: "[Industry]"
    size: "[Size]"
    challenge: "[Main challenge]"
    solution: "[What we provided]"
    results: "[Key outcomes]"

  # List 4-6 case studies you could use
```

**Step 2: Match to Prospect**

```yaml
case_study_matching:
  prospect_profile:
    industry: "[Their industry]"
    size: "[Their size]"
    challenge: "[Their main challenge]"
    goals: "[Their goals]"

  best_match:
    case_study: "[Which one]"
    match_score: "[1-10]"
    match_rationale:
      industry_fit: "[Same/Adjacent/Different]"
      size_fit: "[Similar/Different]"
      challenge_fit: "[Same/Similar/Different]"
      results_relevance: "[Highly/Moderately/Somewhat]"
    connection_points:
      - "[How it connects to their situation]"
      - "[Another connection]"

  second_match:
    case_study: "[Which one]"
    match_score: "[1-10]"
    match_rationale:
      # Same structure
    when_to_use: "[When this is better than best match]"
```

**Step 3: Create Proposal-Ready Summary**

```yaml
case_study_summary:
  for_prospect: "[Prospect company name]"
  case_study: "[Customer name]"

  summary_text: |
    [150-200 word summary customized for this prospect:
    - Customer profile
    - Challenge
    - Solution
    - Results
    - Relevance to prospect]

  key_stats_to_highlight:
    - "[Stat 1]"
    - "[Stat 2]"
    - "[Stat 3]"

  customer_quote: |
    "[Quote if available]"

  talking_points:
    - "[How to introduce this case study]"
    - "[Key point to emphasize]"
    - "[Connection to their situation]"
```

### Deliverable
- Case study inventory
- Matching analysis for 2 case studies
- Proposal-ready summary

### Grading Criteria
- Matching logic (6 points)
- Summary quality (5 points)
- Talking points (4 points)

---

## Part 4: Competitive Positioning (20 points)

### Task
Create competitive positioning materials for your opportunity.

### Instructions

**Step 1: Define Competitive Context**

```yaml
competitive_context:
  opportunity: "[Brief description]"
  our_solution: "[What we're proposing]"

  competitor:
    name: "[Competitor name]"
    what_they_offer: "[Their solution]"
    how_prospect_knows_them: "[Current vendor / RFP participant / etc.]"
    prospect_perception: "[What prospect thinks of them]"

  prospect_priorities:
    - priority: "[Priority 1]"
      weight: "[High/Medium/Low]"
    - priority: "[Priority 2]"
      weight: "[High/Medium/Low]"
    - priority: "[Priority 3]"
      weight: "[High/Medium/Low]"
```

**Step 2: Create Comparison Analysis**

```yaml
competitive_comparison:
  comparison_table:
    | Criteria | Us | [Competitor] | Notes |
    |----------|----|----|-------|
    | [Criterion 1] | [Rating] | [Rating] | [Context] |
    | [Criterion 2] | [Rating] | [Rating] | [Context] |
    # Include 8-10 criteria

  our_advantages:
    - advantage: "[Advantage 1]"
      why_matters: "[Why prospect cares]"
      proof_point: "[Evidence]"
    - advantage: "[Advantage 2]"
      why_matters: "[Why matters]"
      proof_point: "[Evidence]"
    - advantage: "[Advantage 3]"
      why_matters: "[Why matters]"
      proof_point: "[Evidence]"

  their_advantages:
    - advantage: "[Their strength 1]"
      how_to_address: "[Our response]"
    - advantage: "[Their strength 2]"
      how_to_address: "[Our response]"

  neutral_areas:
    - "[Area where we're comparable]"
```

**Step 3: Create Battle Card**

```yaml
battle_card:
  competitor: "[Name]"

  quick_overview:
    their_pitch: "[How they position]"
    our_counter: "[How we position against them]"

  key_differentiators:
    1: "[Our #1 advantage]"
    2: "[Our #2 advantage]"
    3: "[Our #3 advantage]"

  landmines:
    # Questions that expose their weaknesses
    - "[Question 1]"
    - "[Question 2]"
    - "[Question 3]"

  objection_responses:
    - objection: "Why not just use [Competitor]?"
      response: |
        [Your response - 50-75 words]

    - objection: "[Competitor] has [feature] and you don't"
      response: |
        [Your response]

    - objection: "[Competitor] is cheaper"
      response: |
        [Your response]

  win_themes:
    emphasize:
      - "[What to highlight]"
      - "[Another emphasis]"
    avoid:
      - "[What not to bring up]"
      - "[Another thing to avoid]"
```

### Deliverable
- Competitive comparison analysis
- Complete battle card

### Grading Criteria
- Comparison thoroughness (8 points)
- Battle card usefulness (8 points)
- Objectivity and honesty (4 points)

---

## Submission Requirements

### Format
- Single PDF or Word document
- Proposal as polished document (not YAML)
- Supporting materials in structured format

### Contents Checklist
- [ ] Part 1: AI prompt and draft documentation
- [ ] Part 1: Edit documentation
- [ ] Part 1: Final proposal (1,500-2,000 words)
- [ ] Part 2: 3 quote options with details
- [ ] Part 2: Pricing summary and recommendation
- [ ] Part 3: Case study inventory and matching
- [ ] Part 3: Proposal-ready summary
- [ ] Part 4: Competitive comparison
- [ ] Part 4: Battle card

### Submission
Upload to course portal by module deadline.

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Part 1: Proposal | 40 | Quality, personalization, editing |
| Part 2: Quote Options | 25 | Completeness, differentiation |
| Part 3: Case Study | 15 | Matching, summary quality |
| Part 4: Competitive | 20 | Analysis, battle card |
| **Total** | **100** | |

### Grade Scale
- A: 90-100 - Documents ready for client use
- B: 80-89 - Strong materials with minor refinements
- C: 70-79 - Satisfactory, meets requirements
- F: Below 70 - Incomplete or significant issues

---

*Exercise 5 of 7 | AI for Sales Teams | 100 points total*
