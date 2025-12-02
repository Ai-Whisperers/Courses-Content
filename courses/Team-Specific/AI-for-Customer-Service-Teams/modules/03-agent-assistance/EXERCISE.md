# Module 3 Exercise: Agent Assistance Tools

## Exercise Overview

**Total Points:** 100
**Estimated Time:** 2 hours
**Submission:** Document with configurations, sample outputs, and analysis

In this hands-on exercise, you'll configure AI assistance tools for customer service agents, including response generation, knowledge retrieval, customer summarization, and smart templates. You'll test these configurations with realistic scenarios and evaluate their effectiveness.

---

## Part 1: Response Suggestion System (30 points)

### Task
Design and test an AI response suggestion system for a subscription software company.

### Context
You're configuring response suggestions for "TaskFlow" - a project management SaaS. The support team handles billing, technical issues, feature questions, and account management.

### Instructions

**Step 1: Create System Prompt (15 points)**

Design a comprehensive system prompt for generating response suggestions. Include:

1. **Company Context**
   - Company name and product description
   - Brand voice guidelines
   - Communication style

2. **Variable Placeholders**
   - Customer information fields
   - Ticket information fields
   - Account data fields

3. **Response Guidelines**
   - Required elements (greeting, acknowledgment, solution, closing)
   - Tone requirements
   - Length constraints
   - Things to avoid

4. **Available Actions**
   - What the agent can do (refunds, upgrades, etc.)
   - Limits on actions
   - Escalation triggers

5. **Quality Rules**
   - Content restrictions
   - Compliance requirements
   - Brand protection rules

Document your complete system prompt in this format:

```markdown
# TaskFlow Customer Service Response Generation

## Company Context
[Your content here]

## Variable Placeholders
{{customer_name}}
{{customer_email}}
[Additional placeholders...]

## Response Guidelines
[Your content here]

## Available Actions
[Your content here]

## Quality Rules
[Your content here]

## Generation Instructions
[Your content here]
```

**Step 2: Test Response Generation (15 points)**

Using ChatGPT or Claude with your system prompt, generate responses for these 5 tickets:

**Ticket A: Upgrade Request**
> "Hi, I'm currently on the Free plan but my team is growing. We now have 8 people and need more features. What are my upgrade options? Also, do you offer any discounts for annual billing?"

**Ticket B: Frustrated Customer**
> "This is UNACCEPTABLE. I've been trying to export my project data for 2 hours and it keeps failing. I have a client meeting in 30 minutes and I need this data. This is a critical bug that's costing me business!"

**Ticket C: Billing Dispute**
> "I canceled my subscription last month but I was charged again today. I definitely clicked cancel. Please refund this charge immediately and confirm my account is actually canceled."

**Ticket D: Feature Question**
> "Is there a way to set up recurring tasks? I need certain tasks to automatically appear every Monday. I looked in the settings but couldn't find it. Thanks!"

**Ticket E: Account Recovery**
> "I forgot my password and the reset email isn't arriving. I've checked spam. I really need to access my account - we have important project deadlines. Can you help?"

For each ticket, document:
- The generated response
- Your quality rating (1-5)
- What edits you would make
- Estimated time savings

### Deliverable
- Complete system prompt
- 5 generated responses with evaluations

### Grading Criteria
- System prompt completeness (8 points)
- Brand voice clarity (3 points)
- Placeholder design (4 points)
- Response quality (10 points)
- Evaluation thoroughness (5 points)

---

## Part 2: Knowledge Retrieval Configuration (25 points)

### Task
Design a knowledge retrieval system for agent assistance.

### Instructions

**Step 1: Knowledge Source Inventory (8 points)**

Create an inventory of knowledge sources for TaskFlow support:

```yaml
knowledge_sources:
  - source_name: "[Name]"
    source_type: [knowledge_base/policy_doc/faq/resolved_tickets]
    location: "[Where it lives]"
    update_frequency: "[How often updated]"
    priority: [1-5, 1 = highest]
    content_examples:
      - "[Example topic 1]"
      - "[Example topic 2]"

  # Add at least 5 sources
```

**Step 2: Search Configuration (10 points)**

Design the search behavior:

```yaml
search_configuration:
  # How queries are processed
  query_processing:
    expand_synonyms: [true/false]
    correct_spelling: [true/false]
    extract_keywords: [true/false]

  # Search parameters
  search_params:
    results_per_source: [number]
    minimum_relevance_score: [0.0-1.0]
    boost_recent_content: [true/false]

  # Result ranking
  ranking_factors:
    - factor: "[Factor name]"
      weight: [0.0-1.0]
      description: "[Why this matters]"
    # Add at least 4 factors

  # Answer extraction
  answer_extraction:
    enabled: [true/false]
    highlight_answers: [true/false]
    max_excerpt_length: [words]

  # Fallback behavior
  no_results_behavior:
    threshold: [score below which considered "no results"]
    actions:
      - "[Action 1]"
      - "[Action 2]"
```

**Step 3: Test Knowledge Queries (7 points)**

Create 5 sample knowledge queries an agent might ask, and document what results should appear:

| Query | Expected Top Result | Source | Key Information to Extract |
|-------|---------------------|--------|---------------------------|
| "[Query 1]" | | | |
| "[Query 2]" | | | |
| "[Query 3]" | | | |
| "[Query 4]" | | | |
| "[Query 5]" | | | |

### Deliverable
- Knowledge source inventory (5+ sources)
- Search configuration
- 5 test queries with expected results

### Grading Criteria
- Source inventory completeness (8 points)
- Search configuration logic (8 points)
- Ranking factor reasoning (5 points)
- Query/result alignment (4 points)

---

## Part 3: Customer History Summarization (25 points)

### Task
Design customer history summaries that give agents instant context.

### Instructions

**Step 1: Summary Template Design (12 points)**

Create a summarization template that produces actionable customer context:

```yaml
summary_template:
  sections:
    - name: "quick_facts"
      include:
        - "[Field 1]"
        - "[Field 2]"
        # List all quick fact fields
      format: "bullet_list"
      max_items: [number]

    - name: "recent_interactions"
      include:
        - "[What to show]"
      timeframe: "[How far back]"
      max_items: [number]
      format: "[How to display]"

    - name: "patterns_and_flags"
      include:
        - "[Pattern type 1]"
        - "[Pattern type 2]"
      sentiment_indicators: [true/false]
      risk_indicators: [true/false]

    - name: "agent_notes"
      include:
        - "[Note type 1]"
      max_items: [number]

    - name: "suggested_approach"
      auto_generate: [true/false]
      based_on:
        - "[Input factor 1]"
        - "[Input factor 2]"

  display_options:
    total_length: "[max words]"
    expandable_sections: [true/false]
    highlight_urgent: [true/false]
```

**Step 2: Create Sample Summaries (8 points)**

Generate summaries for these two customer profiles:

**Customer Profile A: Long-term Happy Customer**
- Customer since: January 2020
- Plan: Professional ($29/mo)
- Total spent: $1,392
- Tickets: 6 total (all resolved, 4.8/5 avg satisfaction)
- Last contact: 3 months ago (feature question)
- Notes: "Power user, beta tester, referred 3 customers"
- Usage: Daily, uses all features

**Customer Profile B: At-Risk Customer**
- Customer since: August 2023
- Plan: Team ($99/mo)
- Total spent: $1,485
- Tickets: 14 total (12 resolved, 2.1/5 avg satisfaction)
- Last contact: 2 days ago (billing complaint - unresolved)
- Notes: "Mentioned competitor Asana twice, frustrated with sync issues"
- Usage: Declining over past 3 months

Write summaries for both customers as they would appear to an agent.

**Step 3: Contextual Variations (5 points)**

Show how the summary for Customer B would differ for:
- A frontline support agent handling a technical question
- A retention specialist calling about renewal
- A billing agent handling a refund request

Document the differences and explain why.

### Deliverable
- Summary template configuration
- 2 sample customer summaries
- 3 contextual variations with explanations

### Grading Criteria
- Template completeness (8 points)
- Section design logic (4 points)
- Sample summary quality (8 points)
- Contextual adaptation (5 points)

---

## Part 4: Smart Response Templates (20 points)

### Task
Create dynamic response templates with AI personalization.

### Instructions

**Step 1: Template Library Structure (5 points)**

Design a template library organization:

```
Template Library
├── Category 1: [Name]
│   ├── Template: [Name]
│   ├── Template: [Name]
│   └── Template: [Name]
├── Category 2: [Name]
│   └── ...
└── Category 3: [Name]
    └── ...
```

Include at least 4 categories with 3+ templates each.

**Step 2: Create Dynamic Templates (10 points)**

Create 3 fully dynamic templates with:
- Smart placeholders that adapt to context
- Conditional blocks for different scenarios
- AI-generated personalization fields

**Template 1: Refund Response**
```markdown
# Template: Refund Response
# Trigger: ticket_category = billing AND intent = refund

{{smart_greeting}}

{{empathy_statement}}

{{#if refund_approved}}
[Content for approved refund]
{{/if}}

{{#if refund_denied}}
[Content for denied refund with reason: {{denial_reason}}]
{{/if}}

{{#if partial_refund}}
[Content for partial refund]
{{/if}}

{{#if customer_tier == premium}}
[Additional VIP messaging]
{{/if}}

{{ai_personalized_closing}}

{{signature}}
```

Create similar detailed templates for:
- **Template 2: Technical Troubleshooting Response**
- **Template 3: Feature Not Available Response**

**Step 3: Template Testing (5 points)**

Test each template with a specific scenario:

| Template | Test Scenario | Generated Output | Quality Notes |
|----------|---------------|------------------|---------------|
| Refund | Premium customer, approved refund of $99 | [Full output] | [Notes] |
| Technical | Frustrated user, sync issue, Windows | [Full output] | [Notes] |
| Feature | Happy customer, asks for dark mode | [Full output] | [Notes] |

### Deliverable
- Template library structure
- 3 complete dynamic templates
- Test outputs for each template

### Grading Criteria
- Library organization (5 points)
- Template completeness (6 points)
- Dynamic element quality (4 points)
- Test output quality (5 points)

---

## Submission Requirements

### Format
- Single PDF or Word document
- Clear section headers
- Code/YAML blocks for configurations
- Tables for test results

### Contents Checklist
- [ ] Part 1: System prompt + 5 response tests
- [ ] Part 2: Knowledge sources + search config + 5 queries
- [ ] Part 3: Summary template + 2 samples + 3 variations
- [ ] Part 4: Library structure + 3 templates + tests

### Submission
Upload to course portal by module deadline.

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Part 1: Response Suggestions | 30 | Prompt design, response quality |
| Part 2: Knowledge Retrieval | 25 | Source coverage, search logic |
| Part 3: History Summarization | 25 | Template design, sample quality |
| Part 4: Smart Templates | 20 | Structure, dynamic elements |
| **Total** | **100** | |

### Grade Scale
- A: 90-100 - Exceptional, production-ready configurations
- B: 80-89 - Strong work with minor improvements needed
- C: 70-79 - Satisfactory, meets basic requirements
- F: Below 70 - Incomplete or significant issues

---

## Tips for Success

1. **Be Specific**: Vague configurations don't work in production. Include real examples.

2. **Think Like an Agent**: Design tools you would actually want to use.

3. **Test Thoroughly**: Try edge cases, not just happy paths.

4. **Balance AI and Human**: Remember agents should review and personalize.

5. **Consider Quality**: A fast bad response is worse than a slower good one.

---

## Extension Activities (Optional)

### For Advanced Learners:

1. **A/B Test Design**: Design an A/B test to compare two response generation prompts.

2. **Adoption Strategy**: Create a plan to roll out AI assistance tools to a skeptical team.

3. **Feedback Loop**: Design a system for agents to provide feedback on AI suggestions.

4. **Multilingual Support**: Adapt your templates and prompts for multi-language support.

---

*Exercise 3 of 9 | AI for Customer Service Teams | 100 points total*
