# Module 2 Exercise: Prospecting & Lead Research Lab

## Exercise Overview

**Total Points:** 100
**Estimated Time:** 3 hours
**Submission:** Research portfolio with account profiles, contact intelligence, and prioritized lead list

In this exercise, you'll apply AI-powered research techniques to build comprehensive profiles for target accounts and contacts, then prioritize them for outreach.

---

## Part 1: Target Account Research (30 points)

### Task
Research 5 target accounts using AI to create comprehensive account profiles.

### Instructions

**Step 1: Select Your Target Accounts**

Choose 5 real target accounts from your pipeline or territory:

```yaml
target_account_selection:
  account_1:
    company_name: "[Name]"
    website: "[URL]"
    industry: "[Industry]"
    why_targeted: "[Why this company is a target]"
    known_info: "[What you already know]"

  # Repeat for accounts 2-5
```

**Step 2: Conduct AI-Assisted Research**

Use the comprehensive account research prompt for each account:

```yaml
account_research_template:
  company_name: "[Name]"

  company_overview:
    business_description: "[What they do - 50 words]"
    products_services: "[Key offerings]"
    target_customers: "[Who they serve]"
    company_size: "[Employees, revenue if known]"
    headquarters: "[Location]"
    founded: "[Year]"

  leadership_structure:
    ceo: "[Name and brief background]"
    relevant_executives:
      - "[Name] - [Title] - [Relevance to your sale]"
      - "[Name] - [Title] - [Relevance]"
    organizational_notes: "[Structure insights]"

  recent_developments:
    - event: "[Development 1]"
      date: "[When]"
      relevance: "[Why it matters for your sale]"
    - event: "[Development 2]"
      date: "[When]"
      relevance: "[Why it matters]"
    - event: "[Development 3]"
      date: "[When]"
      relevance: "[Why it matters]"

  business_health:
    growth_indicators: "[Evidence of growth]"
    potential_challenges: "[Possible headwinds]"
    market_position: "[Position vs. competitors]"

  sales_opportunity_analysis:
    why_they_need_solution: "[Pain points/needs]"
    potential_use_cases: "[How they'd use your solution]"
    estimated_deal_size: "[Small/Medium/Large]"
    potential_obstacles: "[Challenges to sale]"
    buying_timeline_indicators: "[Urgency signals]"

  icp_fit_score: "[1-10 with rationale]"

  verification_notes:
    facts_verified: "[What you confirmed]"
    needs_verification: "[What to verify]"
    sources_checked: "[Where you verified]"

  recommended_approach:
    entry_point: "[Who to contact first]"
    positioning_angle: "[How to position]"
    key_value_props: "[What to emphasize]"
    avoid: "[What not to lead with]"
```

**Step 3: Create Summary Comparison**

```yaml
account_comparison_summary:
  highest_priority_account:
    name: "[Company]"
    why_highest: "[Rationale]"

  account_rankings:
    - rank: 1
      company: "[Name]"
      icp_score: "[1-10]"
      timing_score: "[1-10]"
      total_score: "[X/20]"
      key_opportunity: "[Main opportunity]"

    # Rank all 5 accounts

  patterns_observed: |
    [What patterns did you notice across accounts? 50-100 words]

  research_insights: |
    [What did you learn from this research process? 50-100 words]
```

### Deliverable
- 5 complete account research profiles
- Comparison summary with rankings
- Verification notes for each account

### Grading Criteria
- Completeness of research (10 points)
- Insight quality and actionability (10 points)
- Verification evidence (5 points)
- Prioritization logic (5 points)

---

## Part 2: Contact Intelligence (25 points)

### Task
Build detailed contact intelligence profiles for 8 target contacts across your 5 accounts.

### Instructions

**Step 1: Identify Key Contacts**

For each account, identify 1-2 key contacts to target:

```yaml
contact_identification:
  account_1:
    contact_1:
      name: "[Full Name]"
      title: "[Title]"
      linkedin: "[URL]"
      target_type: "[Decision Maker / Influencer / Champion / User]"
      why_selected: "[Why target this person]"

    contact_2: # Optional second contact
      name: "[Name]"
      title: "[Title]"
      # ...

  # Continue for all accounts - minimum 8 contacts total
```

**Step 2: Build Contact Profiles**

For each contact, create a detailed profile:

```yaml
contact_profile:
  name: "[Full Name]"
  company: "[Company]"
  title: "[Title]"

  role_analysis:
    likely_responsibilities: |
      [What they probably do - 50-75 words]
    reporting_structure: "[Who they report to / who reports to them]"
    key_metrics: "[What they're measured on]"
    decision_authority: "[Budget, vendor selection, technical approval, etc.]"

  professional_context:
    career_trajectory: "[Career path observations]"
    time_in_role: "[If known or estimated]"
    relevant_experience: "[Experience relevant to your sale]"
    skills_expertise: "[Key skills]"

  current_priorities:
    likely_initiatives:
      - "[Initiative 1]"
      - "[Initiative 2]"
    challenges_facing:
      - "[Challenge 1]"
      - "[Challenge 2]"
    success_definition: "[What would make them successful]"

  pain_points:
    - pain_point: "[Pain point 1]"
      evidence: "[Why you think this]"
      our_solution: "[How we help]"
    - pain_point: "[Pain point 2]"
      evidence: "[Why you think this]"
      our_solution: "[How we help]"

  personalization_opportunities:
    linkedin_insights: "[Recent posts, activity, interests]"
    shared_connections: "[Mutual connections]"
    shared_experiences: "[Schools, companies, groups]"
    conversation_hooks: "[Topics they'd engage with]"

  outreach_strategy:
    best_channel: "[Email / LinkedIn / Phone / Referral]"
    best_timing: "[Day/time if known, or trigger-based]"
    opening_angle: "[How to open the conversation]"
    value_message: "[Key benefit to emphasize]"
    avoid: "[What not to mention]"

  discovery_questions:
    - "[Question 1 - shows research, uncovers need]"
    - "[Question 2 - explores priority/timeline]"
    - "[Question 3 - identifies decision process]"
```

### Deliverable
- 8 complete contact profiles
- Outreach strategy for each contact

### Grading Criteria
- Role analysis depth (8 points)
- Pain point relevance (7 points)
- Personalization quality (5 points)
- Outreach strategy viability (5 points)

---

## Part 3: Trigger Event Analysis (20 points)

### Task
Identify trigger events and buying signals for your target accounts.

### Instructions

**Step 1: Trigger Event Scan**

For each of your 5 accounts, identify recent trigger events:

```yaml
trigger_event_analysis:
  account_1:
    company: "[Name]"

    trigger_events_found:
      - event: "[What happened]"
        date: "[When]"
        category: "[Funding/Leadership/Expansion/Challenge/Strategic]"
        source: "[Where you found this]"
        relevance: |
          [Why this matters for your sale - 30-50 words]
        urgency: "[Act Now / Act Soon / Monitor]"
        outreach_angle: |
          [How to reference this in outreach]

      # List all trigger events found (aim for 2-3 per account)

    no_triggers_found: "[If none found, note this]"
    monitoring_plan: "[What to watch for going forward]"

  # Continue for all 5 accounts
```

**Step 2: Trigger-Based Prioritization**

```yaml
trigger_prioritization:
  hot_triggers: # Accounts with recent, high-impact triggers
    - account: "[Name]"
      trigger: "[Event]"
      action: "[What to do]"
      deadline: "[When to act by]"

  warm_triggers: # Accounts with relevant but less urgent triggers
    - account: "[Name]"
      trigger: "[Event]"
      action: "[What to do]"
      timeline: "[When to act]"

  no_triggers: # Accounts without current triggers
    - account: "[Name]"
      alternative_approach: "[How to approach without trigger]"
      monitoring_plan: "[What would trigger action]"
```

**Step 3: Trigger Event Outreach Templates**

Create outreach templates for your top 2 trigger events:

```yaml
trigger_outreach_template_1:
  trigger_type: "[e.g., New Funding]"

  email_template:
    subject: "[Subject line referencing trigger]"
    opening: |
      [First paragraph - acknowledge trigger, show research]

    connection: |
      [Second paragraph - connect trigger to your solution]

    ask: |
      [Third paragraph - specific call to action]

    full_email: |
      [Complete email - 100-150 words]

  linkedin_version: |
    [Shorter LinkedIn message version - 75 words max]

trigger_outreach_template_2:
  # Same structure for second trigger type
```

### Deliverable
- Trigger event analysis for 5 accounts
- Priority-sorted trigger list
- 2 trigger-based outreach templates

### Grading Criteria
- Trigger event identification (8 points)
- Relevance assessment (5 points)
- Prioritization logic (4 points)
- Template quality (3 points)

---

## Part 4: Competitive Intelligence (15 points)

### Task
Conduct competitive analysis for one competitor your accounts might be considering.

### Instructions

**Step 1: Select a Competitor**

```yaml
competitor_selection:
  competitor_name: "[Name]"
  why_selected: "[Why this competitor matters]"
  accounts_affected: "[Which of your 5 accounts might consider them]"
```

**Step 2: Competitive Analysis**

```yaml
competitive_analysis:
  competitor: "[Name]"

  positioning:
    their_tagline: "[How they describe themselves]"
    value_proposition: "[Key value prop]"
    target_customer: "[Who they target]"
    pricing_model: "[If known]"

  strengths:
    - strength: "[Strength 1]"
      evidence: "[Where you see this]"
    - strength: "[Strength 2]"
      evidence: "[Evidence]"
    - strength: "[Strength 3]"
      evidence: "[Evidence]"

  weaknesses:
    - weakness: "[Weakness 1]"
      evidence: "[Where you see this - reviews, feedback]"
      our_advantage: "[How we're better here]"
    - weakness: "[Weakness 2]"
      evidence: "[Evidence]"
      our_advantage: "[Our advantage]"
    - weakness: "[Weakness 3]"
      evidence: "[Evidence]"
      our_advantage: "[Our advantage]"

  customer_feedback:
    positive_themes: "[What customers praise]"
    negative_themes: "[What customers complain about]"
    review_sources: "[G2, Capterra, etc.]"

  competitive_positioning:
    when_we_win: |
      [Situations where we typically beat this competitor]
    when_they_win: |
      [Situations where they might beat us]
    key_differentiators: |
      [Our main advantages]
```

**Step 3: Battle Card Elements**

```yaml
battle_card:
  competitor: "[Name]"

  quick_facts:
    founded: "[Year]"
    size: "[Employees]"
    funding: "[Funding status]"
    customers: "[Notable customers]"

  objection_handling:
    - objection: "Why not just use [Competitor]?"
      response: |
        [Your response - 50-75 words]

    - objection: "[Competitor] is cheaper"
      response: |
        [Your response]

    - objection: "[Competitor] has feature X"
      response: |
        [Your response]

  discovery_questions:
    # Questions that surface our advantages
    - "[Question that highlights our strength]"
    - "[Question that exposes their weakness]"
    - "[Question about prospect's specific needs]"

  proof_points:
    - "[Case study or data point that favors us]"
    - "[Customer quote that differentiates us]"
```

### Deliverable
- Complete competitive analysis
- Battle card with objection handling

### Grading Criteria
- Analysis completeness (5 points)
- Insight quality (5 points)
- Battle card usefulness (5 points)

---

## Part 5: Lead Prioritization & Action Plan (10 points)

### Task
Create a prioritized action plan for your 8 contacts.

### Instructions

**Step 1: Score Each Contact**

```yaml
lead_scoring:
  scoring_criteria:
    icp_fit:
      weight: 30
      scale: "1-10"

    trigger_presence:
      weight: 25
      scale: "0 (none), 5 (weak), 10 (strong)"

    decision_authority:
      weight: 20
      scale: "1-10"

    personalization_opportunity:
      weight: 15
      scale: "1-10"

    timing_indicators:
      weight: 10
      scale: "1-10"

  scored_contacts:
    - name: "[Contact 1]"
      company: "[Company]"
      scores:
        icp_fit: "[X]"
        trigger_presence: "[X]"
        decision_authority: "[X]"
        personalization: "[X]"
        timing: "[X]"
      weighted_total: "[Calculated total]"
      priority_tier: "[Hot/Warm/Nurture]"

    # Score all 8 contacts
```

**Step 2: Action Plan**

```yaml
weekly_action_plan:
  this_week_priorities: # Top 3 contacts
    contact_1:
      name: "[Name]"
      company: "[Company]"
      priority_score: "[X]"
      action: "[Specific action to take]"
      channel: "[Email/LinkedIn/Call]"
      key_message: "[Main point to communicate]"
      deadline: "[Day this week]"

    contact_2:
      # Same structure

    contact_3:
      # Same structure

  next_week: # Contacts 4-6
    - "[Contact 4] - [Action]"
    - "[Contact 5] - [Action]"
    - "[Contact 6] - [Action]"

  nurture_sequence: # Contacts 7-8
    - "[Contact 7] - [Nurture approach]"
    - "[Contact 8] - [Nurture approach]"

  success_metrics:
    - "[How you'll measure success this week]"
    - "[Response rate target]"
    - "[Meetings booked target]"
```

### Deliverable
- Scored and ranked contact list
- Weekly action plan

### Grading Criteria
- Scoring methodology (4 points)
- Prioritization logic (3 points)
- Action plan specificity (3 points)

---

## Submission Requirements

### Format
- Single PDF or Word document
- All YAML sections completed
- Organized by parts

### Contents Checklist
- [ ] Part 1: 5 account research profiles + comparison summary
- [ ] Part 2: 8 contact intelligence profiles
- [ ] Part 3: Trigger event analysis + 2 outreach templates
- [ ] Part 4: Competitive analysis + battle card
- [ ] Part 5: Scored contacts + weekly action plan

### Submission
Upload to course portal by module deadline.

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Part 1: Account Research | 30 | Depth, verification, prioritization |
| Part 2: Contact Intelligence | 25 | Role analysis, personalization, strategy |
| Part 3: Trigger Events | 20 | Identification, relevance, templates |
| Part 4: Competitive Intelligence | 15 | Analysis quality, battle card usefulness |
| Part 5: Prioritization | 10 | Scoring logic, action plan clarity |
| **Total** | **100** | |

### Grade Scale
- A: 90-100 - Exceptional research ready for immediate use
- B: 80-89 - Strong research with minor gaps
- C: 70-79 - Satisfactory, meets requirements
- F: Below 70 - Incomplete or significant issues

---

*Exercise 2 of 7 | AI for Sales Teams | 100 points total*
