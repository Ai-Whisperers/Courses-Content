# Module 6 Exercise: Sentiment Analysis & Customer Intelligence

## Exercise Overview

**Total Points:** 100
**Estimated Time:** 2 hours
**Submission:** Document with analysis, configurations, and insights

In this hands-on exercise, you'll analyze customer sentiment in support conversations, configure escalation triggers, track customer emotion patterns, and generate voice-of-customer insights. You'll work with sample data to practice extracting actionable intelligence from sentiment signals.

---

## Part 1: Sentiment Analysis Practice (25 points)

### Task
Analyze sentiment in customer messages and understand AI capabilities and limitations.

### Instructions

**Step 1: Analyze Customer Messages (15 points)**

For each message below, provide your sentiment analysis:

```
MESSAGE ANALYSIS FORMAT:
Message #: [Number]
Content: "[Message text]"

Sentiment Score: [Scale: -1.0 to +1.0]
Sentiment Label: [Very Negative / Negative / Neutral / Positive / Very Positive]
Confidence: [High / Medium / Low]

Emotions Detected:
- [Emotion 1]: [Strength: High/Medium/Low]
- [Emotion 2]: [Strength]

Key Indicators: [Words/phrases that indicate sentiment]

Nuance Notes: [Any sarcasm, context dependency, or AI challenges]
```

**Analyze these 8 messages:**

1. "I've been waiting for 45 minutes and still nothing. This is ridiculous!"

2. "Thanks so much for your help today! You really went above and beyond."

3. "Oh great, another shipping delay. What a surprise."

4. "The product is fine I guess. Not amazing but it works."

5. "I CANNOT believe this is happening again. Third time this month!!!"

6. "Just checking on my order status. Order #12345."

7. "Your competitor delivers in 2 days. Why does yours take a week?"

8. "I'm not upset, I just want to understand why this happened."

**Step 2: Identify AI Challenges (10 points)**

From your analysis above, identify which messages would be challenging for AI sentiment detection:

| Message # | Challenge Type | Why It's Difficult | How Human Would Interpret |
|-----------|----------------|-------------------|---------------------------|
| | Sarcasm | | |
| | Context-dependent | | |
| | Mixed signals | | |
| | Cultural/idiomatic | | |

Include at least 4 identified challenges.

### Deliverable
- 8 message analyses
- AI challenge identification table

### Grading Criteria
- Analysis accuracy (10 points)
- Emotion identification (5 points)
- Challenge recognition (5 points)
- Nuance understanding (5 points)

---

## Part 2: Escalation Trigger Configuration (25 points)

### Task
Design sentiment-based escalation triggers for a travel booking company.

### Context
"TravelEase" is an online travel agency. Their support team handles:
- Booking changes and cancellations
- Flight delays and disruptions
- Hotel issues
- Refund requests
- Urgent travel problems

### Instructions

**Step 1: Define Escalation Levels (8 points)**

Create escalation levels with sentiment thresholds:

```yaml
escalation_levels:
  - level: "[Level name]"
    description: "[When this applies]"
    sentiment_threshold: "[Condition]"
    urgency: [1-5, 1 = highest]
    response_time: "[Target response]"
    handler: "[Who handles]"
```

Define at least 4 escalation levels.

**Step 2: Create Escalation Triggers (12 points)**

Design 8 specific escalation triggers:

```yaml
escalation_triggers:
  - trigger_id: "TRIG-001"
    name: "[Descriptive name]"
    category: [sentiment/keyword/pattern/combination]
    conditions:
      - condition_type: "[Type]"
        operator: "[>, <, ==, contains]"
        value: "[Threshold or keyword]"
      # Add additional conditions if needed
    action:
      type: [alert/prompt/route/escalate]
      destination: "[Who/where]"
      message: "[What to communicate]"
      priority: "[Priority level]"
    context_required: "[What context to include]"
    rationale: "[Why this trigger matters]"
```

Include triggers for:
- Very negative sentiment (2 triggers)
- Sentiment decline pattern (1 trigger)
- Urgent travel situation (2 triggers)
- Churn risk indicators (2 triggers)
- Legal/complaint language (1 trigger)

**Step 3: Agent Prompt Templates (5 points)**

Create 3 agent prompt templates for different sentiment situations:

```yaml
agent_prompts:
  - prompt_id: "PROMPT-001"
    trigger: "[What activates this prompt]"
    situation: "[Description of situation]"
    prompt_content: |
      [Full text of what agent sees]

      DETECTED:
      [What was detected]

      SUGGESTED APPROACH:
      [Specific guidance]

      RESPONSE OPTIONS:
      - "[Option 1]"
      - "[Option 2]"
```

### Deliverable
- 4 escalation levels
- 8 escalation triggers
- 3 agent prompt templates

### Grading Criteria
- Level structure (8 points)
- Trigger coverage (8 points)
- Trigger logic (4 points)
- Prompt usefulness (5 points)

---

## Part 3: Customer Emotion Tracking (25 points)

### Task
Analyze customer sentiment patterns over time and identify at-risk accounts.

### Instructions

**Step 1: Build Customer Sentiment Profile (12 points)**

Using this interaction history for Customer "Alex Chen" (ID: CUST-9876), create a sentiment profile:

**Interaction History:**
| Date | Channel | Issue | Customer Message | Resolution |
|------|---------|-------|------------------|------------|
| Jan 15 | Chat | Flight change | "Need to change my flight date please" | Changed, $50 fee |
| Mar 8 | Email | Delayed refund | "It's been 3 weeks. Where is my refund?" | Expedited refund |
| May 22 | Chat | Booking question | "Quick question about baggage" | Answered |
| Jul 3 | Email | Cancelled flight | "My flight was cancelled and I missed my conference!" | Rebooked + credit |
| Aug 18 | Chat | Price match | "Your competitor has better prices" | 10% discount |
| Oct 5 | Email | Double charge | "I was charged twice! Fix this NOW!" | Refunded |
| Nov 20 | Chat | Cancel booking | "I want to cancel everything. This is my last trip with you." | Pending |

Create the profile:

```yaml
customer_sentiment_profile:
  customer_id: "CUST-9876"
  customer_name: "Alex Chen"
  profile_date: "[Today's date]"

  relationship_overview:
    customer_since: "[Date]"
    total_interactions: [number]
    overall_sentiment: [score]
    sentiment_trend: "[Improving/Stable/Declining]"
    risk_level: "[Low/Medium/High/Critical]"

  sentiment_journey:
    - date: "[Date]"
      interaction_type: "[Type]"
      sentiment_score: [estimated score]
      sentiment_label: "[Label]"
      key_moment: "[Why notable]"
    # Continue for all interactions

  patterns_identified:
    - pattern: "[Pattern name]"
      evidence: "[What shows this pattern]"
      implication: "[What it means]"

  risk_indicators:
    - indicator: "[Indicator]"
      present: [true/false]
      evidence: "[Specific evidence]"

  recommended_actions:
    immediate:
      - "[Action 1]"
    short_term:
      - "[Action 2]"
    long_term:
      - "[Action 3]"
```

**Step 2: At-Risk Customer Report (8 points)**

Imagine you have 5 customers with these profiles. Rank them by risk and explain:

| Customer | Recent Sentiment | Trend | Competitor Mention | Issues (90 days) |
|----------|------------------|-------|-------------------|------------------|
| Alex C. | -0.72 | Declining | Yes | 2 |
| Maria S. | 0.45 | Stable | No | 0 |
| James T. | -0.15 | Declining | No | 3 |
| Sarah K. | -0.55 | Improving | Yes (past) | 1 |
| Tom W. | 0.20 | Declining | No | 1 |

Create a risk assessment:

```
AT-RISK CUSTOMER PRIORITY LIST

1. [Customer Name] - Risk Score: [X/10]
   Key Risk Factors: [List factors]
   Recommended Action: [Specific action]
   Urgency: [Immediate/This Week/This Month]

2. [Continue for all 5]
```

**Step 3: Proactive Outreach Plan (5 points)**

For the highest-risk customer, create a proactive outreach plan:

```yaml
proactive_outreach_plan:
  customer: "[Name]"
  risk_level: "[Level]"

  outreach_approach:
    channel: "[How to reach out]"
    timing: "[When]"
    owner: "[Who]"

  message_framework:
    tone: "[How to communicate]"
    acknowledge: "[What to acknowledge]"
    offer: "[What to offer]"
    ask: "[What to ask]"

  sample_message: |
    [Write a full sample outreach message]

  success_metrics:
    - "[How to measure success]"

  fallback_if_declined:
    - "[Alternative action]"
```

### Deliverable
- Complete sentiment profile for Alex Chen
- Risk-ranked customer list
- Proactive outreach plan

### Grading Criteria
- Profile completeness (8 points)
- Pattern identification (4 points)
- Risk ranking accuracy (5 points)
- Outreach plan quality (8 points)

---

## Part 4: Voice of Customer Insights (25 points)

### Task
Extract actionable insights from sentiment data across multiple interactions.

### Instructions

**Step 1: Theme Analysis (12 points)**

Analyze these 10 customer messages and identify themes:

1. "The mobile app crashes every time I try to check my booking"
2. "Why can't I see my boarding pass in the app anymore?"
3. "Took forever to get a refund - 4 weeks is too long"
4. "Your agents are always so helpful. Great service!"
5. "Price went up $200 after I searched yesterday. Feels like a trick"
6. "The app used to work great, what happened?"
7. "Waited 20 minutes on hold. Need more staff!"
8. "Finally got my refund. Thanks for following up!"
9. "The price changing thing feels dishonest"
10. "App keeps logging me out. So frustrating"

Create a theme analysis:

```yaml
theme_analysis:
  source: "10 sample customer messages"
  period: "November 2024"

  themes_identified:
    - theme_name: "[Theme 1]"
      mention_count: [number]
      messages: [list message numbers]
      avg_sentiment: [score]
      key_phrases: ["phrase1", "phrase2"]
      sample_quote: "[Representative quote]"

    # Continue for all themes (identify at least 4)

  theme_summary:
    | Theme | Mentions | Sentiment | Trend | Priority |
    |-------|----------|-----------|-------|----------|
    | | | | | |
```

**Step 2: Insights Report (8 points)**

Generate a Voice of Customer insights report:

```
VOICE OF CUSTOMER INSIGHTS
Period: November 2024
Sample: 10 customer messages

EXECUTIVE SUMMARY
[2-3 sentence overview of key findings]

TOP ISSUES BY IMPACT
1. [Issue]
   - Sentiment Impact: [Score]
   - Customer Quotes: "[Quote]"
   - Business Risk: [Description]
   - Recommended Action: [Specific action]

2. [Continue for top 3 issues]

POSITIVE SIGNALS
- [What's working well]
- [Evidence]

EMERGING CONCERNS
- [New or growing issues]
- [Why they matter]

RECOMMENDATIONS
For Product Team:
- [Recommendation]

For Support Team:
- [Recommendation]

For Marketing Team:
- [Recommendation]
```

**Step 3: Stakeholder Presentation (5 points)**

Create a one-slide summary for an executive presentation:

```
┌─────────────────────────────────────────────────────────┐
│  CUSTOMER SENTIMENT SUMMARY - November 2024             │
│                                                          │
│  [Design a visual summary including:]                   │
│  - Overall sentiment score/indicator                     │
│  - Top 3 themes with sentiment                          │
│  - Key metric (e.g., "X% mention app issues")           │
│  - Trend indicator (vs. last month)                     │
│  - #1 recommended action                                │
│                                                          │
│  [Use ASCII art/formatting to make it visual]           │
└─────────────────────────────────────────────────────────┘
```

### Deliverable
- Theme analysis with 4+ themes
- Complete insights report
- Executive summary slide

### Grading Criteria
- Theme identification accuracy (8 points)
- Insight depth (4 points)
- Report actionability (8 points)
- Presentation clarity (5 points)

---

## Submission Requirements

### Format
- Single PDF or Word document
- Clear section headers
- YAML/code blocks for configurations
- Tables for data

### Contents Checklist
- [ ] Part 1: 8 message analyses + AI challenge table
- [ ] Part 2: Escalation levels + triggers + agent prompts
- [ ] Part 3: Sentiment profile + risk ranking + outreach plan
- [ ] Part 4: Theme analysis + insights report + executive slide

### Submission
Upload to course portal by module deadline.

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Part 1: Sentiment Analysis | 25 | Accuracy, nuance recognition |
| Part 2: Escalation Configuration | 25 | Coverage, logic, usefulness |
| Part 3: Emotion Tracking | 25 | Profile depth, risk assessment |
| Part 4: VoC Insights | 25 | Theme accuracy, actionability |
| **Total** | **100** | |

### Grade Scale
- A: 90-100 - Exceptional sentiment intelligence work
- B: 80-89 - Strong analysis with minor gaps
- C: 70-79 - Satisfactory, meets requirements
- F: Below 70 - Incomplete or significant issues

---

## Tips for Success

1. **Think Beyond Scores**: Sentiment is a signal, not an answer. Focus on actionable insights.

2. **Consider Context**: The same words mean different things in different situations.

3. **Be Specific**: Vague recommendations aren't useful. Provide specific actions.

4. **Tell a Story**: Connect data points into a narrative that drives action.

5. **Balance Urgency**: Not everything negative is urgent. Prioritize effectively.

---

*Exercise 6 of 9 | AI for Customer Service Teams | 100 points total*
