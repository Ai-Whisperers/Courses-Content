# Module 1 Exercise: AI Sales Toolkit Setup

## Exercise Overview

**Total Points:** 100
**Estimated Time:** 2 hours
**Submission:** Document with toolkit setup, first experiments, and reflection

In this exercise, you'll set up your AI sales toolkit and complete your first AI-assisted prospect research experiments to establish baseline productivity improvements.

---

## Part 1: AI Tool Selection & Setup (25 points)

### Task
Set up your core AI toolkit and document your choices.

### Instructions

**Step 1: Choose Your Primary AI Assistant**

Select and set up one of the following:
- Claude.ai (Recommended for research and writing)
- ChatGPT (Alternative with similar capabilities)

```yaml
# Document your selection
ai_assistant_setup:
  tool_selected: "[Claude.ai / ChatGPT]"
  account_type: "[Free / Pro / Enterprise]"
  reason_for_selection: |
    [Explain why you chose this tool - 50 words minimum]

  setup_verification:
    account_created: [Yes/No]
    first_query_completed: [Yes/No]
    response_quality: "[1-5 rating]"
```

**Step 2: Document Your Sales Stack**

List your current sales tools and how AI will integrate:

```yaml
current_sales_stack:
  crm:
    tool: "[e.g., Salesforce, HubSpot]"
    ai_integration_plan: |
      [How will AI enhance your CRM usage?]

  email:
    tool: "[e.g., Outlook, Gmail]"
    ai_integration_plan: |
      [How will AI help with email?]

  linkedin:
    account_type: "[Free / Premium / Sales Navigator]"
    ai_integration_plan: |
      [How will AI enhance LinkedIn research?]

  other_tools:
    - tool: "[Name]"
      purpose: "[What you use it for]"
      ai_potential: "[How AI could help]"
```

**Step 3: Create Your Prompts Library**

Set up a folder structure for storing prompts:

```yaml
prompts_library_setup:
  storage_location: "[Google Drive / Dropbox / OneDrive / Other]"
  folder_structure_created: [Yes/No]
  folders_created:
    - "01-Research"
    - "02-Outreach"
    - "03-Conversations"
    - "04-Documents"
    - "05-Analysis"

  screenshot_attached: [Yes/No]
```

### Deliverable
- Screenshot of AI assistant account
- Sales stack documentation
- Screenshot of prompts library folder structure

### Grading Criteria
- AI tool properly set up (8 points)
- Sales stack documented with integration plans (10 points)
- Prompts library structure created (7 points)

---

## Part 2: First AI Research Experiment (35 points)

### Task
Complete AI-assisted research on 3 real prospects and document time savings.

### Instructions

**Step 1: Select 3 Real Prospects**

Choose 3 prospects from your actual pipeline or target list:

```yaml
prospect_selection:
  prospect_1:
    contact_name: "[Name]"
    title: "[Title]"
    company: "[Company]"
    why_selected: "[Why targeting this prospect]"

  prospect_2:
    contact_name: "[Name]"
    title: "[Title]"
    company: "[Company]"
    why_selected: "[Why targeting]"

  prospect_3:
    contact_name: "[Name]"
    title: "[Title]"
    company: "[Company]"
    why_selected: "[Why targeting]"
```

**Step 2: Conduct AI-Assisted Research**

Use this prompt template for each prospect:

```
PROSPECT RESEARCH PROMPT

Context:
I'm a [your role] at [your company] selling [your solution].
I'm preparing to reach out to this prospect.

Prospect Information:
- Contact: [Name], [Title] at [Company]
- Company Website: [URL if known]
- LinkedIn: [URL if known]
- Industry: [Industry]

Please provide:

1. COMPANY INTELLIGENCE (100 words max)
- What does the company do?
- Key products/services
- Company size and stage
- Recent news or developments

2. CONTACT CONTEXT
- Likely responsibilities in this role
- Common challenges for this title/industry
- Potential priorities

3. PAIN POINT HYPOTHESES
- List 3 potential pain points relevant to our solution
- Rank by likelihood

4. PERSONALIZATION OPPORTUNITIES
- Connection points between their situation and our solution
- Specific angles for personalization
- Any mutual connections or shared interests to leverage

5. DISCOVERY QUESTIONS
- 3 questions to ask that demonstrate research
- Questions that uncover budget/authority/need/timeline

6. RECOMMENDED APPROACH
- Best channel for outreach (email, LinkedIn, call)
- Suggested hook or opening angle
- Timing considerations
```

**Step 3: Document Results for Each Prospect**

```yaml
prospect_1_research:
  time_spent:
    without_ai_estimate: "[X minutes]"
    with_ai_actual: "[X minutes]"
    time_saved: "[X minutes]"

  ai_output_quality:
    company_info_accuracy: "[1-5] - [Notes]"
    pain_points_relevance: "[1-5] - [Notes]"
    personalization_usefulness: "[1-5] - [Notes]"
    questions_quality: "[1-5] - [Notes]"
    overall_quality: "[1-5]"

  verification_needed:
    - "[Fact that needs verification]"
    - "[Another fact to verify]"

  key_insight_discovered: |
    [What's the most valuable insight from this research?]

  outreach_plan: |
    [How will you use this research in your outreach?]

# Repeat for prospect_2_research and prospect_3_research
```

**Step 4: Calculate Aggregate Results**

```yaml
research_experiment_summary:
  total_time_without_ai: "[X minutes for 3 prospects]"
  total_time_with_ai: "[X minutes for 3 prospects]"
  total_time_saved: "[X minutes]"
  productivity_improvement: "[X%]"

  average_quality_score: "[X/5]"

  best_ai_output:
    prospect: "[Which prospect]"
    why_best: "[What made it good]"

  worst_ai_output:
    prospect: "[Which prospect]"
    what_was_missing: "[What was weak]"
    how_to_improve: "[How to get better results]"
```

### Deliverable
- Research documentation for 3 prospects
- Time and quality metrics
- Summary analysis

### Grading Criteria
- 3 complete prospect research profiles (15 points)
- Time tracking accuracy (5 points)
- Quality assessment thoroughness (10 points)
- Summary analysis insights (5 points)

---

## Part 3: Prompt Refinement (20 points)

### Task
Improve your research prompt based on experiment results.

### Instructions

**Step 1: Analyze What Worked and Didn't Work**

```yaml
prompt_analysis:
  what_worked_well:
    - "[Element that produced good results]"
    - "[Another effective element]"
    - "[Third success]"

  what_didnt_work:
    - problem: "[Issue encountered]"
      example: "[Specific example]"
      cause: "[Why it happened]"

    - problem: "[Second issue]"
      example: "[Example]"
      cause: "[Cause]"

  missing_information:
    - "[Info you needed but AI didn't provide]"
    - "[Other missing info]"

  unnecessary_information:
    - "[Info AI provided that wasn't useful]"
```

**Step 2: Create Improved Prompt**

Write a refined version of your research prompt:

```
IMPROVED PROSPECT RESEARCH PROMPT v2.0

[Write your complete improved prompt here - at least 200 words]

Key improvements:
1. [What you changed and why]
2. [Another improvement]
3. [Third improvement]
```

**Step 3: Test Improved Prompt**

Use the new prompt on one additional prospect:

```yaml
refined_prompt_test:
  prospect_tested: "[Name, Company]"

  comparison:
    original_prompt_quality: "[1-5]"
    refined_prompt_quality: "[1-5]"
    improvement: "[+X points]"

  specific_improvements:
    - "[What was better in the new output]"
    - "[Another improvement]"

  remaining_issues:
    - "[What still needs work]"

  version_saved_to_library: [Yes/No]
```

### Deliverable
- Prompt analysis
- Improved prompt (v2.0)
- Test comparison results

### Grading Criteria
- Thorough analysis of original prompt (7 points)
- Meaningful prompt improvements (8 points)
- Test comparison with evidence (5 points)

---

## Part 4: Ethical Considerations Reflection (10 points)

### Task
Document your ethical guidelines for AI use in sales.

### Instructions

Create your personal ethical framework:

```yaml
personal_ai_ethics_framework:
  transparency_guidelines:
    when_to_disclose: |
      [When will you disclose AI use to prospects?]

    how_to_disclose: |
      [How will you handle questions about AI use?]

  accuracy_practices:
    verification_process: |
      [How will you verify AI-generated information?]

    correction_approach: |
      [What will you do if AI provides wrong information?]

  authenticity_standards:
    my_voice: |
      [How will you ensure AI content reflects your voice?]

    personalization_rules: |
      [What level of personalization is genuine vs. fake?]

  privacy_guidelines:
    data_i_will_input: |
      [What prospect data is OK to put into AI?]

    data_i_wont_input: |
      [What data will you NOT put into AI tools?]

  specific_commitments:
    - "I will [commitment 1]"
    - "I will NOT [commitment 2]"
    - "I will always [commitment 3]"
    - "I will never [commitment 4]"
```

### Deliverable
- Completed ethical framework document

### Grading Criteria
- Thoughtful transparency guidelines (3 points)
- Clear accuracy practices (2 points)
- Authentic personalization standards (2 points)
- Privacy considerations (3 points)

---

## Part 5: Baseline Metrics & Goals (10 points)

### Task
Establish baseline metrics and set improvement goals.

### Instructions

**Step 1: Document Current State**

```yaml
current_state_metrics:
  prospecting:
    prospects_researched_per_week: [number]
    time_per_prospect_research: "[X minutes]"
    research_quality_self_rating: "[1-5]"

  outreach:
    personalized_emails_per_week: [number]
    time_per_email: "[X minutes]"
    response_rate: "[X%]"

  proposals:
    proposals_per_month: [number]
    time_per_proposal: "[X hours]"

  overall:
    time_spent_on_admin_tasks: "[X hours/week]"
    time_spent_on_selling_activities: "[X hours/week]"
```

**Step 2: Set AI-Assisted Goals**

```yaml
ai_assisted_goals:
  30_day_goals:
    research_time_reduction: "[Target X% reduction]"
    email_personalization_increase: "[Target X more/week]"
    outreach_volume_increase: "[Target X% increase]"

  90_day_goals:
    response_rate_improvement: "[Target X% improvement]"
    proposal_time_reduction: "[Target X% reduction]"
    overall_productivity_gain: "[Target X% more selling time]"

  success_measurement:
    how_i_will_track: |
      [How will you measure these improvements?]

    review_schedule: |
      [When will you review progress?]
```

### Deliverable
- Baseline metrics documentation
- Goal setting with measurement plan

### Grading Criteria
- Complete baseline metrics (5 points)
- Realistic, measurable goals (5 points)

---

## Submission Requirements

### Format
- Single document (PDF or Word)
- All YAML sections completed
- Screenshots as appendix

### Contents Checklist
- [ ] Part 1: AI tool setup documentation
- [ ] Part 1: Sales stack with integration plans
- [ ] Part 1: Prompts library screenshot
- [ ] Part 2: 3 prospect research profiles
- [ ] Part 2: Time and quality metrics
- [ ] Part 2: Summary analysis
- [ ] Part 3: Prompt analysis
- [ ] Part 3: Improved prompt v2.0
- [ ] Part 3: Test comparison
- [ ] Part 4: Ethical framework
- [ ] Part 5: Baseline metrics
- [ ] Part 5: Goals and measurement plan

### Submission
Upload to course portal by module deadline.

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Part 1: Tool Setup | 25 | Complete setup, documentation |
| Part 2: Research Experiment | 35 | Quality research, metrics, analysis |
| Part 3: Prompt Refinement | 20 | Analysis, improvement, testing |
| Part 4: Ethics Framework | 10 | Thoughtful, comprehensive |
| Part 5: Baseline & Goals | 10 | Complete metrics, realistic goals |
| **Total** | **100** | |

### Grade Scale
- A: 90-100 - Excellent foundation for AI-assisted selling
- B: 80-89 - Good setup with minor gaps
- C: 70-79 - Satisfactory, meets requirements
- F: Below 70 - Incomplete or significant issues

---

## Tips for Success

1. **Use Real Prospects**: Practice on actual targets for immediate value
2. **Be Honest with Metrics**: Accurate baselines enable measuring improvement
3. **Save Your Prompts**: Good prompts are reusable assets
4. **Note What Fails**: Learning from AI limitations is valuable
5. **Think About Ethics Early**: Build good habits from the start

---

*Exercise 1 of 7 | AI for Sales Teams | 100 points total*
