# Module 2: Prospecting & Lead Research with AI

## Overview

This module transforms how you research prospects and accounts. You'll learn to use AI to gather comprehensive intelligence on companies and contacts in minutes instead of hours, identify buying signals, and build data-driven ideal customer profiles.

**Duration:** 4 hours
**Prerequisites:** Module 1 completed, AI toolkit set up

---

## Learning Objectives

By the end of this module, you will be able to:

1. Research target accounts 10x faster using AI
2. Build comprehensive contact intelligence profiles
3. Identify trigger events and buying signals
4. Conduct competitive intelligence efficiently
5. Create and refine ideal customer profiles with AI
6. Prioritize prospects based on AI-assisted scoring

---

## Section 1: Account Research at Scale

### The Account Research Framework

Comprehensive account research covers multiple dimensions:

```
ACCOUNT INTELLIGENCE FRAMEWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPANY FUNDAMENTALS
├── What they do (products/services)
├── Company size and structure
├── Funding stage and financial health
├── Geographic presence
└── Key leadership

BUSINESS CONTEXT
├── Recent news and announcements
├── Strategic initiatives
├── Growth trajectory
├── Challenges and headwinds
└── Industry position

TECHNOLOGY & OPERATIONS
├── Tech stack (if relevant)
├── Current vendors/partners
├── Operational model
├── Digital presence
└── Innovation focus

RELATIONSHIP MAPPING
├── Decision makers
├── Influencers
├── Champions
├── Potential blockers
└── Existing connections

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### AI-Powered Account Research Prompt

```
COMPREHENSIVE ACCOUNT RESEARCH

Context:
I'm a [your role] at [your company] selling [your solution].
I'm researching [Company Name] as a potential target account.

Company Information:
- Website: [URL]
- Industry: [Industry]
- Known details: [Anything you already know]

Please provide a comprehensive account profile:

1. COMPANY OVERVIEW
- Business model and value proposition
- Key products/services
- Target market and customers
- Approximate company size (employees, revenue if public)
- Headquarters and key locations
- Founding date and brief history

2. LEADERSHIP & STRUCTURE
- CEO/Founder and background
- Key executives relevant to [your solution area]
- Organizational structure insights
- Board members or notable investors

3. RECENT DEVELOPMENTS (Last 12 months)
- Funding rounds or financial news
- Product launches or major updates
- Strategic partnerships or acquisitions
- Leadership changes
- Press coverage highlights

4. BUSINESS HEALTH INDICATORS
- Growth signals (hiring, expansion, funding)
- Potential challenges (layoffs, pivots, competition)
- Market position vs. competitors
- Strategic direction indicators

5. TECHNOLOGY CONTEXT
- Known technology stack
- Digital maturity assessment
- Potential technology gaps
- Relevant integrations

6. SALES OPPORTUNITY ANALYSIS
- Why they might need [your solution]
- Potential pain points
- Budget indicators
- Timing considerations
- Potential obstacles to sale

Format: Use bullet points for easy scanning. Highlight the most actionable insights.
```

### Batch Account Research

For researching multiple accounts efficiently:

```yaml
batch_research_workflow:
  step_1_prepare_list:
    action: "Create spreadsheet with target accounts"
    columns:
      - company_name
      - website
      - industry
      - known_info
      - priority

  step_2_research_prompts:
    approach: "Research 3-5 accounts per AI session"
    prompt_modification: |
      Research the following companies as potential targets.
      For each, provide a brief profile (200 words max) covering:
      - What they do
      - Size and stage
      - Recent news
      - Why they might need [solution]
      - Key decision maker titles to target

      Companies:
      1. [Company 1] - [Industry] - [Website]
      2. [Company 2] - [Industry] - [Website]
      3. [Company 3] - [Industry] - [Website]

  step_3_organize_findings:
    action: "Transfer insights to CRM or tracking system"
    key_fields:
      - company_summary
      - priority_score
      - key_contacts_to_find
      - recommended_approach
      - next_action
```

---

## Section 2: Contact Intelligence

### Building Contact Profiles

Go beyond basic contact data to understand the person:

```
CONTACT INTELLIGENCE PROFILE
┌─────────────────────────────────────────────────────────┐
│  PROFESSIONAL CONTEXT                                   │
│  ─────────────────────                                  │
│  • Current role and responsibilities                   │
│  • Career trajectory                                    │
│  • Time in current position                            │
│  • Reporting structure                                  │
│  • Team size managed                                    │
│                                                          │
│  PRIORITIES & CHALLENGES                                │
│  ───────────────────────                                │
│  • Likely KPIs for their role                          │
│  • Common challenges for this title/industry           │
│  • Current initiatives they might be driving           │
│  • Pain points related to your solution                │
│                                                          │
│  COMMUNICATION PREFERENCES                              │
│  ─────────────────────────                              │
│  • LinkedIn activity level                              │
│  • Content they engage with                            │
│  • Professional interests                              │
│  • Communication style indicators                       │
│                                                          │
│  CONNECTION OPPORTUNITIES                               │
│  ────────────────────────                               │
│  • Shared connections                                   │
│  • Shared experiences (schools, companies)             │
│  • Shared interests or groups                          │
│  • Recent posts or articles                            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Contact Research Prompt

```
CONTACT INTELLIGENCE RESEARCH

Context:
I'm preparing to reach out to this contact about [your solution].
I need to understand their world to personalize effectively.

Contact Information:
- Name: [Full Name]
- Title: [Current Title]
- Company: [Company]
- LinkedIn: [URL if available]

Please provide:

1. ROLE ANALYSIS
- What does someone in this role typically do?
- What are their likely responsibilities?
- Who do they report to? Who reports to them?
- What metrics are they measured on?

2. PROFESSIONAL JOURNEY
- What can we infer about their career path?
- What skills have they likely developed?
- What makes them credible in this role?

3. CURRENT PRIORITIES (Hypotheses)
- What initiatives might they be focused on?
- What problems are they likely trying to solve?
- What would make them look successful?

4. PAIN POINTS (Related to [your solution area])
- What challenges might they face that we can address?
- What would make their job easier?
- What outcomes would they value?

5. PERSONALIZATION ANGLES
- What hooks could capture their attention?
- What would demonstrate I've done my research?
- What questions would show I understand their world?

6. OUTREACH RECOMMENDATIONS
- Best channel (email, LinkedIn, phone)
- Suggested approach angle
- What NOT to lead with
```

### Enriching Contact Data

Use AI to fill gaps in your contact database:

```yaml
contact_enrichment_prompt:
  context: |
    I have a list of contacts with limited information.
    Help me enrich these profiles for sales outreach.

  input_format: |
    Contact 1: [Name], [Title], [Company]
    Contact 2: [Name], [Title], [Company]
    Contact 3: [Name], [Title], [Company]

  requested_enrichment:
    - likely_responsibilities: "Based on title and company"
    - decision_authority: "Likely decision maker, influencer, or user"
    - pain_points: "Common for this role/industry"
    - best_approach: "Email, LinkedIn, or phone"
    - personalization_angle: "Suggested hook"

  output_format: |
    For each contact, provide a brief profile (100 words)
    with the enrichment fields filled in.
```

---

## Section 3: Trigger Events & Buying Signals

### Types of Trigger Events

```yaml
trigger_event_categories:
  company_growth:
    signals:
      - funding_round: "New capital often means new initiatives"
      - expansion: "New locations, markets, or products"
      - hiring_surge: "Growth creates needs"
      - new_leadership: "New leaders bring new priorities"
    urgency: "High - act within 30 days"

  company_challenges:
    signals:
      - layoffs: "Efficiency focus, budget scrutiny"
      - competitive_pressure: "Need for differentiation"
      - regulatory_changes: "Compliance requirements"
      - technology_shifts: "Modernization needs"
    urgency: "Medium - timing sensitive"

  personnel_changes:
    signals:
      - new_hire_in_target_role: "Fresh eyes, mandate to improve"
      - promotion: "Expanded scope, new budget"
      - departure: "Coverage gap, fresh start opportunity"
    urgency: "Very High - act within 14 days"

  strategic_announcements:
    signals:
      - partnership: "Ecosystem expansion"
      - acquisition: "Integration challenges"
      - product_launch: "Supporting infrastructure needs"
      - strategic_pivot: "New direction, new needs"
    urgency: "High - act within 21 days"
```

### Trigger Event Monitoring Prompt

```
TRIGGER EVENT ANALYSIS

I'm tracking [Company Name] for sales opportunities.
Please identify recent trigger events and buying signals.

Check for:

1. FUNDING & FINANCIAL NEWS
- Any recent funding rounds?
- IPO activity or preparation?
- Revenue announcements?

2. GROWTH INDICATORS
- New office locations?
- Significant hiring (especially in [relevant departments])?
- Market expansion?

3. LEADERSHIP CHANGES
- New C-suite executives?
- New heads of [relevant department]?
- Board changes?

4. STRATEGIC MOVES
- Recent acquisitions or partnerships?
- Product launches?
- Market pivots?

5. CHALLENGES
- Layoffs or restructuring?
- Competitive losses?
- Regulatory issues?

For each trigger event found:
- What happened and when
- Why it matters for selling [your solution]
- Urgency level (act now, act soon, monitor)
- Suggested outreach angle
```

### Building Trigger-Based Outreach

| Trigger Event | Outreach Timing | Opening Angle |
|---------------|-----------------|---------------|
| New funding | Within 2 weeks | "Congratulations on the raise..." |
| New executive | Within 1 week | "As you settle into your new role..." |
| Product launch | Within 1 week | "Saw the launch of [product]..." |
| Expansion news | Within 2 weeks | "As you scale into [market]..." |
| Acquisition | 2-4 weeks | "Integration is always challenging..." |

---

## Section 4: Competitive Intelligence

### Competitive Research Framework

```
COMPETITIVE INTELLIGENCE GATHERING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MARKET POSITIONING
├── How competitors position themselves
├── Key messaging and value propositions
├── Target customer segments
└── Pricing models (if available)

PRODUCT COMPARISON
├── Feature comparisons
├── Strengths and weaknesses
├── Recent product updates
└── Roadmap hints

CUSTOMER PERSPECTIVE
├── Review sites (G2, Capterra, TrustRadius)
├── Common complaints
├── Praised features
└── Switching reasons

COMPANY HEALTH
├── Funding and financial status
├── Growth trajectory
├── Employee reviews (Glassdoor)
└── News and press coverage

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Competitive Analysis Prompt

```
COMPETITIVE INTELLIGENCE ANALYSIS

Context:
I sell [your solution] and compete against [Competitor Name].
I need intelligence to position against them effectively.

Please analyze:

1. POSITIONING
- How do they describe themselves?
- What is their key value proposition?
- Who is their ideal customer?

2. STRENGTHS
- What are they known for?
- Where do customers praise them?
- What features stand out?

3. WEAKNESSES
- Common customer complaints
- Feature gaps
- Support or service issues
- Pricing concerns

4. DIFFERENTIATION POINTS
- Where does [your solution] have advantages?
- What use cases favor us?
- What customer types are better fits for us?

5. BATTLE CARD ELEMENTS
- Key objection responses when prospect mentions them
- Discovery questions to surface our advantages
- Proof points that favor us

6. COMPETITIVE POSITIONING STATEMENT
- A brief statement of why prospects should choose us
```

---

## Section 5: Ideal Customer Profile Development

### AI-Assisted ICP Creation

```yaml
icp_development_process:
  step_1_analyze_best_customers:
    prompt: |
      Analyze our best customers to identify patterns.

      Best Customers:
      1. [Company A] - [Industry] - [Size] - [Why they're great]
      2. [Company B] - [Industry] - [Size] - [Why they're great]
      3. [Company C] - [Industry] - [Size] - [Why they're great]
      4. [Company D] - [Industry] - [Size] - [Why they're great]
      5. [Company E] - [Industry] - [Size] - [Why they're great]

      Identify common characteristics:
      - Industry patterns
      - Company size patterns
      - Technology patterns
      - Business model patterns
      - Pain point patterns
      - Buying process patterns

  step_2_define_icp:
    components:
      firmographics:
        - industry
        - company_size
        - revenue_range
        - growth_stage
        - geography

      technographics:
        - current_tools
        - tech_sophistication
        - integration_requirements

      situational:
        - pain_points
        - trigger_events
        - buying_readiness

      behavioral:
        - buying_process
        - decision_makers
        - evaluation_criteria

  step_3_scoring_model:
    criteria:
      - fits_icp_perfectly: "10 points"
      - partially_fits: "5 points"
      - outside_icp: "0 points"
```

### ICP Validation Prompt

```
ICP VALIDATION AND REFINEMENT

Our current Ideal Customer Profile:
[Paste your current ICP description]

Our best customers include:
[List 5-10 best customers with brief descriptions]

Our worst/churned customers include:
[List 3-5 customers that didn't work out]

Please:

1. VALIDATE ICP ACCURACY
- Does our ICP match our best customers?
- What characteristics are we missing?
- What should we add or remove?

2. IDENTIFY PATTERNS
- What do successful customers have in common?
- What do unsuccessful customers have in common?
- What are the warning signs?

3. REFINE ICP
- Suggest an updated ICP definition
- Include must-have characteristics
- Include nice-to-have characteristics
- Include disqualifying characteristics

4. CREATE SCORING RUBRIC
- How to score prospects against this ICP
- Point values for each criterion
- Threshold for "qualified" vs. "not qualified"
```

---

## Section 6: Lead Prioritization

### AI-Assisted Lead Scoring

```yaml
lead_scoring_framework:
  fit_score:
    icp_match:
      perfect_match: 30
      strong_match: 20
      partial_match: 10
      poor_match: 0

    company_size:
      ideal_range: 15
      acceptable_range: 10
      outside_range: 0

    industry:
      target_industry: 15
      adjacent_industry: 10
      other: 5

  intent_score:
    trigger_events:
      recent_funding: 20
      new_leadership: 20
      expansion_news: 15
      product_launch: 10
      none_detected: 0

    engagement:
      visited_website: 10
      downloaded_content: 15
      attended_webinar: 15
      requested_demo: 30

  priority_calculation:
    total_score: "fit_score + intent_score"
    priority_tiers:
      hot: "70+ points - Contact within 24 hours"
      warm: "50-69 points - Contact within 1 week"
      nurture: "30-49 points - Add to nurture sequence"
      low: "Below 30 - Deprioritize"
```

### Lead Prioritization Prompt

```
LEAD PRIORITIZATION ANALYSIS

I have the following leads to prioritize.
Help me determine which to focus on first.

Our ICP:
[Brief ICP description]

Our Solution:
[What you sell and key value props]

Leads to Prioritize:

1. [Company A] - [Title: Contact Name]
   Known info: [What you know about them]

2. [Company B] - [Title: Contact Name]
   Known info: [What you know]

3. [Company C] - [Title: Contact Name]
   Known info: [What you know]

[Continue for all leads]

For each lead, provide:
- ICP fit score (1-10) with rationale
- Intent/timing indicators
- Priority ranking (1 = highest)
- Recommended next action
- Key personalization angle
```

---

## Key Takeaways

1. **Research Compounds**: Time invested in research pays dividends in personalization and conversion
2. **Verify AI Findings**: Always confirm key facts before using them
3. **Trigger Events Matter**: Timing can be as important as fit
4. **Know Your Competition**: Competitive intelligence sharpens positioning
5. **ICP Drives Focus**: The clearer your ICP, the more efficient your prospecting
6. **Prioritize Ruthlessly**: Not all leads deserve equal attention

---

## What's Next

In Module 3, you'll learn to use AI for personalized outreach at scale, including:
- Writing personalized emails that don't feel templated
- LinkedIn message personalization
- Subject line optimization
- Follow-up sequence creation

---

## Resources

- Account Research Template (in course resources)
- Contact Intelligence Template
- Competitive Battle Card Template
- ICP Scoring Rubric Template

---

*Module 2 of 7 | AI for Sales Teams | 4 hours*
