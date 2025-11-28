# Module 2 Exercise: AI-Powered Ticket Management

## Exercise Overview

**Total Points:** 100
**Estimated Time:** 2 hours
**Submission:** Document with configurations, analysis, and screenshots

In this hands-on exercise, you'll design an intelligent ticket management system including routing rules, categorization taxonomy, priority prediction logic, and workload balancing. You'll then test your design with sample tickets and measure effectiveness.

---

## Part 1: Ticket Categorization System (25 points)

### Task
Design a comprehensive ticket categorization taxonomy for a SaaS company.

### Context
You're implementing AI categorization for "CloudSync Pro," a file synchronization and collaboration platform. The support team handles:
- Account and billing issues
- Technical sync problems
- Feature questions
- Security concerns
- Mobile app issues
- Team/admin functions

### Instructions

**Step 1: Build Category Taxonomy (15 points)**

Create a three-level category hierarchy. Include at least:
- 5 Level 1 categories
- 15+ Level 2 subcategories
- 30+ Level 3 issue types

Use this format:

```
Level 1: [Category Name]
├── Level 2: [Subcategory]
│   ├── Level 3: [Issue Type]
│   ├── Level 3: [Issue Type]
│   └── Level 3: [Issue Type]
└── Level 2: [Subcategory]
    └── Level 3: [Issue Type]
```

Example structure to expand:
```
Account & Billing
├── Subscriptions
│   ├── Upgrade Request
│   ├── Downgrade Request
│   └── Cancellation
├── Payments
│   ├── Failed Payment
│   └── Refund Request
└── Account Access
    ├── Password Reset
    └── Account Locked

[Continue with Technical, Features, Security, Mobile, Admin...]
```

**Step 2: Define Category Rules (10 points)**

For 5 of your Level 2 categories, define:
- Description
- 5+ keywords that indicate this category
- 3 example tickets
- Confidence threshold
- Routing destination (queue or skill)

Use this template:

```yaml
category_name: [Name]
description: "[What this category covers]"
keywords: [keyword1, keyword2, keyword3, keyword4, keyword5]
example_tickets:
  - "[Example ticket 1 text]"
  - "[Example ticket 2 text]"
  - "[Example ticket 3 text]"
confidence_threshold: 0.XX
route_to: [queue or skill name]
```

### Deliverable
- Complete taxonomy diagram
- 5 category rule definitions

### Grading Criteria
- Taxonomy completeness and logical structure (8 points)
- Category coverage of use cases (4 points)
- Rule definitions clarity (3 points)
- Keyword relevance (5 points)
- Example quality (5 points)

---

## Part 2: Intelligent Routing Configuration (25 points)

### Task
Design a skills-based routing system for CloudSync Pro's support team.

### Context
The support team consists of:
- 3 Billing specialists
- 4 Technical support agents
- 2 Enterprise/admin specialists
- 1 Security specialist
- 2 General support agents (handle overflow)

### Instructions

**Step 1: Define Skill Categories (8 points)**

Create skill definitions covering:
- At least 12 distinct skills
- Skill descriptions
- Complexity levels (beginner, intermediate, expert)

Format:
```yaml
skills:
  - name: [skill_name]
    description: "[What this skill covers]"
    complexity_levels: [beginner, intermediate, expert]
    related_categories: [list of ticket categories]
```

**Step 2: Create Agent Profiles (7 points)**

Create profiles for 6 agents with different skill combinations:

```yaml
agent_profiles:
  - agent_id: AGT001
    name: "[Name]"
    skills:
      - skill: [skill_name]
        level: [beginner/intermediate/expert]
      - skill: [skill_name]
        level: [beginner/intermediate/expert]
    languages: [list]
    max_concurrent_tickets: [number]
    specialization: "[primary focus area]"
```

**Step 3: Define Routing Rules (10 points)**

Create 8 routing rules that cover:
- Standard skill matching
- VIP/premium customer handling
- Escalation routing
- Overflow handling
- After-hours routing
- Language-based routing

Format:
```yaml
routing_rules:
  - rule_id: R001
    name: "[Descriptive name]"
    priority: [1-10, 1 = highest]
    conditions:
      - condition_type: [category/customer_tier/language/etc.]
        value: [value]
    actions:
      route_to_skill: [skill]
      require_level: [minimum level]
      prefer_previous_agent: [true/false]
      fallback: [queue/rule]
```

### Deliverable
- Skill definitions (12+)
- Agent profiles (6)
- Routing rules (8)

### Grading Criteria
- Skill coverage and definitions (8 points)
- Agent profile diversity (7 points)
- Routing rule logic (7 points)
- Edge case handling (3 points)

---

## Part 3: Priority Prediction Configuration (25 points)

### Task
Design a priority prediction system using multiple signals.

### Instructions

**Step 1: Define Priority Levels (8 points)**

Create 4 priority levels with clear definitions:

```yaml
priority_levels:
  - level: [name]
    numeric_value: [1-4]
    description: "[Clear description of what warrants this priority]"
    sla_first_response: [time]
    sla_resolution: [time]
    examples:
      - "[Scenario 1]"
      - "[Scenario 2]"
    signals:
      - "[Signal that indicates this priority]"
      - "[Signal that indicates this priority]"
```

**Step 2: Configure Prediction Features (10 points)**

Define the features your priority model will use:

```yaml
prediction_features:
  content_signals:
    keywords:
      critical: [list of keywords]
      high: [list of keywords]
      urgent_modifiers: [list of words that boost priority]
    sentiment:
      negative_threshold: [score]
      very_negative_threshold: [score]

  customer_signals:
    tier_weights:
      enterprise: [weight]
      professional: [weight]
      free: [weight]
    tenure_bonus:
      over_2_years: [bonus]
      over_5_years: [bonus]

  behavioral_signals:
    repeat_contact_window: [hours]
    repeat_contact_threshold: [count]
    escalation_history_weight: [weight]

  temporal_signals:
    business_hours_modifier: [modifier]
    weekend_modifier: [modifier]
```

**Step 3: Create Override Rules (7 points)**

Define automatic priority overrides for special situations:

```yaml
override_rules:
  - name: "[Rule name]"
    trigger:
      type: [keyword/customer/channel/etc.]
      condition: "[specific condition]"
    action:
      set_priority: [priority level]
      # OR
      min_priority: [minimum priority level]
      # OR
      boost_priority: [number of levels]
    reason: "[Why this override exists]"
```

Create at least 6 override rules covering:
- Security incidents
- VIP customers
- Social media contacts
- Repeat contacts
- Keywords indicating urgency
- Legal/compliance issues

### Deliverable
- Priority level definitions (4)
- Feature configuration
- Override rules (6+)

### Grading Criteria
- Priority level clarity (8 points)
- Feature comprehensiveness (6 points)
- Feature weight logic (4 points)
- Override rule appropriateness (7 points)

---

## Part 4: Test Your System (25 points)

### Task
Process 10 sample tickets through your system and evaluate results.

### Instructions

**Step 1: Process Sample Tickets (15 points)**

For each ticket below, apply your system and document:
- Assigned categories (Level 1, 2, 3)
- Assigned priority
- Assigned agent/queue
- Confidence scores
- Reasoning

**Sample Tickets:**

**Ticket 1:**
> Subject: URGENT - Files not syncing!!!
> Body: "My files stopped syncing 2 hours ago. I have a presentation in 30 minutes and I can't access my latest version. I'm a premium subscriber. PLEASE HELP!"

**Ticket 2:**
> Subject: Question about team pricing
> Body: "Hi, I'm looking to upgrade from individual to team plan. We have 25 people. What's the pricing and can we get a discount?"

**Ticket 3:**
> Subject: Possible security breach
> Body: "I noticed some files in my account that I didn't upload. I'm concerned someone may have accessed my account. Please investigate immediately."

**Ticket 4:**
> Subject: How to set up mobile sync
> Body: "Just installed the mobile app. How do I configure it to sync only certain folders? The documentation wasn't clear."

**Ticket 5:**
> Subject: Refund request
> Body: "I accidentally upgraded to the annual plan. I meant to click monthly. Can I get a refund? I did this 3 days ago."

**Ticket 6:**
> Subject: RE: RE: RE: Still having issues
> Body: "This is the 4th time I'm writing about this. My sync speed is still terrible. Nothing you've suggested has worked. I'm considering canceling."

**Ticket 7:**
> Subject: API rate limits
> Body: "We're building an integration with CloudSync. What are the API rate limits for enterprise accounts? Need for architecture planning."

**Ticket 8:**
> Subject: Desktop app crashes on startup
> Body: "After the latest update, the desktop app crashes immediately when I try to open it. Windows 10, version 21H2. Error code: 0x80004005"

**Ticket 9:**
> Subject: Admin console training
> Body: "I'm the new IT admin for our company account. Can you provide training materials for the admin console? We have 200 users."

**Ticket 10:**
> Subject: Compliance documentation
> Body: "Our legal team needs SOC 2 and GDPR compliance documentation for our vendor assessment. Please send these as soon as possible."

Document results in this format:

| Ticket | Category (L1/L2/L3) | Priority | Assigned To | Confidence | Key Signals |
|--------|---------------------|----------|-------------|------------|-------------|
| 1 | | | | | |
| 2 | | | | | |
| ... | | | | | |

**Step 2: System Evaluation (10 points)**

Analyze your system's performance:

1. **Accuracy Assessment**: Would a human agree with these assignments? Identify any that seem incorrect.

2. **Coverage Gaps**: Were there any tickets your system struggled to categorize?

3. **Priority Distribution**: What's the distribution across priorities? Is it realistic?

4. **Routing Effectiveness**: Would tickets reach the right agents?

5. **Improvement Opportunities**: What would you change based on this test?

Write a 300-400 word analysis addressing these questions.

### Deliverable
- Completed ticket processing table (10 tickets)
- System evaluation analysis

### Grading Criteria
- Processing accuracy and consistency (8 points)
- Documentation completeness (4 points)
- Reasoning clarity (3 points)
- Analysis depth (6 points)
- Improvement identification (4 points)

---

## Submission Requirements

### Format
- Single PDF or Word document
- Clear section headers
- All configurations in code/YAML blocks
- Tables properly formatted

### Contents Checklist
- [ ] Part 1: Category taxonomy + 5 rule definitions
- [ ] Part 2: Skills + Agent profiles + Routing rules
- [ ] Part 3: Priority levels + Features + Override rules
- [ ] Part 4: 10 processed tickets + Analysis

### Submission
Upload to course portal by module deadline.

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Part 1: Categorization System | 25 | Taxonomy depth, rule quality |
| Part 2: Routing Configuration | 25 | Skills coverage, rule logic |
| Part 3: Priority Prediction | 25 | Level clarity, feature design |
| Part 4: System Testing | 25 | Accuracy, analysis quality |
| **Total** | **100** | |

### Grade Scale
- A: 90-100 - Exceptional system design
- B: 80-89 - Strong configuration with minor gaps
- C: 70-79 - Satisfactory, meets requirements
- F: Below 70 - Incomplete or significant issues

---

## Tips for Success

1. **Think Real-World**: Design as if you're implementing for a real support team.

2. **Consider Edge Cases**: What happens when tickets don't fit neatly into categories?

3. **Balance Specificity and Flexibility**: Too broad = poor routing; too narrow = gaps.

4. **Test Your Logic**: Walk through each routing rule with examples.

5. **Document Reasoning**: Explain why you made design decisions.

---

## Extension Activities (Optional)

### For Advanced Learners:

1. **Integration Design**: Document how you would integrate your system with Zendesk or Freshdesk APIs.

2. **Metrics Dashboard**: Design a monitoring dashboard for your ticket management system.

3. **ML Model Specification**: Specify training data requirements for a custom categorization model.

4. **SLA Automation**: Design automatic SLA escalation rules tied to your priority system.

---

*Exercise 2 of 9 | AI for Customer Service Teams | 100 points total*
