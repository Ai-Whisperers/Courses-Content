# Module 4 Exercise: Chatbots & Self-Service

## Exercise Overview

**Total Points:** 100
**Estimated Time:** 2.5 hours
**Submission:** Document with conversation designs, flows, and analysis

In this hands-on exercise, you'll design a customer service chatbot from the ground up—defining personality, creating conversation flows, configuring escalation handling, and establishing success metrics. You'll then test your designs with simulated conversations.

---

## Part 1: Chatbot Personality & Design Principles (20 points)

### Task
Define the personality and design guidelines for a customer service chatbot.

### Context
You're designing a chatbot for "FitGear" - an online fitness equipment retailer. They sell workout equipment, apparel, and supplements. Their brand is energetic, supportive, and health-focused.

### Instructions

**Step 1: Bot Identity (8 points)**

Create a complete bot identity document:

```yaml
bot_identity:
  name: "[Choose a name that fits the brand]"
  tagline: "[Short description of the bot's purpose]"
  avatar_description: "[Describe the visual representation]"

  character_traits:
    - trait: "[Trait 1]"
      expression: "[How this shows in conversation]"
    - trait: "[Trait 2]"
      expression: "[How this shows in conversation]"
    - trait: "[Trait 3]"
      expression: "[How this shows in conversation]"
    # Include at least 4 traits

  voice_attributes:
    formality: [formal/casual_professional/casual]
    enthusiasm_level: [low/medium/high]
    emoji_usage: [none/minimal/moderate/frequent]
    humor_style: "[Description]"

  brand_alignment:
    brand_values: "[List FitGear's brand values]"
    how_bot_reflects_them: "[How bot personality aligns]"
```

**Step 2: Voice Guidelines (7 points)**

Create a voice guidelines document with:

1. **Tone descriptions** for different situations:
   - Normal interactions
   - Helping frustrated customers
   - Delivering bad news
   - Celebrating wins (order confirmation, etc.)

2. **Language rules**:
   - Do's and Don'ts
   - Words/phrases to use
   - Words/phrases to avoid

3. **Example transformations** (3 examples):
   - Show a "generic robot" response
   - Show how your bot would say it

**Step 3: Design Principles (5 points)**

Document 5 core design principles for your chatbot, with rationale:

| Principle | Description | Rationale |
|-----------|-------------|-----------|
| 1. | | |
| 2. | | |
| 3. | | |
| 4. | | |
| 5. | | |

### Deliverable
- Complete bot identity document
- Voice guidelines with examples
- 5 design principles

### Grading Criteria
- Bot identity completeness (8 points)
- Voice guidelines clarity (7 points)
- Design principle quality (5 points)

---

## Part 2: Conversation Flow Design (35 points)

### Task
Design three complete conversation flows for common FitGear support scenarios.

### Instructions

**Flow 1: Order Status Check (12 points)**

Design a complete conversation flow for checking order status.

Requirements:
- Welcome and intent identification
- Order lookup (by order number or email)
- Display of status information
- Handling of multiple orders
- Edge cases (order not found, etc.)
- Follow-up options

Document using this format:

```yaml
flow_name: order_status
trigger_intents: [list of phrases that trigger this flow]

steps:
  - id: [step_id]
    type: [message/question/input/api_call/condition]
    message: "[Bot message]"
    # For questions:
    options:
      - label: "[Option text]"
        next: [next_step_id]
    # For inputs:
    validation: "[validation rule]"
    on_valid: [next_step_id]
    on_invalid: [error_step_id]
    # For conditions:
    conditions:
      - if: "[condition]"
        then: [step_id]
    next: [default_next_step]

  # Include at least 10 steps with branching logic
```

**Flow 2: Return Request (12 points)**

Design a conversation flow for product returns.

Requirements:
- Verify order is eligible for return
- Collect return reason
- Explain return process
- Generate return label (if eligible)
- Handle non-returnable items
- Escalation for exceptions

Include at least 12 steps with clear branching.

**Flow 3: Product Recommendation (11 points)**

Design a flow where the chatbot helps customers find the right product.

Requirements:
- Understand what they're looking for
- Ask qualifying questions (fitness goals, budget, space, etc.)
- Provide personalized recommendations
- Handle "none of these work" scenarios
- Connect to human for complex needs

Include at least 10 steps.

### Deliverable
- 3 complete conversation flows
- Each with branching logic and edge case handling

### Grading Criteria
- Flow 1 completeness (12 points)
- Flow 2 completeness (12 points)
- Flow 3 completeness (11 points)
- Overall logic and user experience (bonus/penalty)

---

## Part 3: Escalation Configuration (20 points)

### Task
Design the escalation system for your FitGear chatbot.

### Instructions

**Step 1: Escalation Triggers (8 points)**

Define automatic and user-initiated escalation triggers:

```yaml
escalation_triggers:
  automatic:
    # Sentiment-based
    - trigger_name: "[Name]"
      condition: "[Specific condition]"
      action: [offer_escalation/immediate_escalation]
      priority: [normal/high/urgent]

    # Include at least 8 automatic triggers covering:
    # - Sentiment/frustration
    # - Conversation quality (not understood, loops)
    # - Content (complaints, legal, competitors)
    # - Complexity

  user_initiated:
    always_visible: [true/false]
    button_text: "[Text for escalation button]"
    trigger_phrases:
      - "[Phrase 1]"
      - "[Phrase 2]"
      # Include at least 5 phrases
```

**Step 2: Handoff Process (7 points)**

Design the handoff experience:

```yaml
handoff_process:
  pre_handoff:
    context_collected:
      - "[Data point 1]"
      - "[Data point 2]"
      # List all context to pass to agent

    customer_message:
      text: "[Message to customer explaining handoff]"
      include_wait_time: [true/false]

    options_offered:
      - "[Option 1 - e.g., wait in queue]"
      - "[Option 2 - e.g., callback]"
      - "[Option 3 - e.g., email]"

  during_handoff:
    queue_updates: [true/false]
    update_frequency: "[How often]"
    abandonment_handling: "[What happens if user leaves]"

  agent_view:
    summary_format: |
      [Design what the agent sees when receiving the handoff]
      Include: customer info, intent, conversation summary,
      collected data, suggested approach
```

**Step 3: Anti-Chatbot-Jail Measures (5 points)**

Document specific measures to prevent users from being stuck:

| Situation | Prevention Measure | Fallback Action |
|-----------|-------------------|-----------------|
| Repeated "not understood" | | |
| User expresses frustration | | |
| Complex issue detected | | |
| User requests agent multiple times | | |
| Long conversation without resolution | | |

### Deliverable
- Escalation trigger configuration
- Handoff process design
- Anti-chatbot-jail measures

### Grading Criteria
- Trigger comprehensiveness (8 points)
- Handoff design quality (7 points)
- User protection measures (5 points)

---

## Part 4: Test Conversations (25 points)

### Task
Simulate conversations to test your chatbot design.

### Instructions

**Step 1: Write Test Conversations (15 points)**

Create 5 complete test conversations (user + bot exchanges) demonstrating:

**Conversation 1: Happy Path - Order Status**
Show a successful order status check where the bot fully resolves the query.
(Minimum 6 exchanges)

**Conversation 2: Product Recommendation with Purchase**
Show the bot successfully helping a customer find a product.
(Minimum 8 exchanges)

**Conversation 3: Escalation Due to Complexity**
Show a return request that requires escalation to an agent.
(Minimum 8 exchanges, including handoff)

**Conversation 4: Frustrated Customer Recovery**
Show the bot handling a frustrated customer who eventually gets help.
(Minimum 6 exchanges)

**Conversation 5: Edge Case Handling**
Show how the bot handles a situation not perfectly covered by your flows.
(Minimum 6 exchanges)

Format each conversation like:

```
CONVERSATION 1: Happy Path - Order Status
Scenario: Customer wants to check when their order will arrive

User: [User message]
Bot: [Bot response]
[System note: intent detected as X, flow: Y triggered]

User: [User message]
Bot: [Bot response]

... continue until resolution ...

OUTCOME: [Resolved by bot / Escalated / Abandoned]
SATISFACTION: [Expected rating]
NOTES: [What this conversation demonstrates]
```

**Step 2: Analyze Test Results (10 points)**

Create a test analysis summary:

```
TEST ANALYSIS SUMMARY

CONVERSATION OUTCOMES:
| Conv # | Type | Outcome | Exchanges | Expected CSAT |
|--------|------|---------|-----------|---------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

FLOW COVERAGE:
- Flows tested: [list]
- Flows not tested: [list]
- Edge cases covered: [list]

IDENTIFIED ISSUES:
1. [Issue found during testing]
   Severity: [High/Medium/Low]
   Recommendation: [How to fix]

2. [Continue for any issues found]

IMPROVEMENT OPPORTUNITIES:
1. [Opportunity 1]
2. [Opportunity 2]

OVERALL ASSESSMENT:
[200-word assessment of chatbot readiness]
```

### Deliverable
- 5 complete test conversations
- Test analysis summary

### Grading Criteria
- Conversation realism (6 points)
- Flow coverage (5 points)
- Edge case testing (4 points)
- Analysis quality (6 points)
- Improvement identification (4 points)

---

## Submission Requirements

### Format
- Single PDF or Word document
- Clear section headers
- YAML/code blocks for configurations
- Conversation formatting for test dialogs

### Contents Checklist
- [ ] Part 1: Bot identity + Voice guidelines + Design principles
- [ ] Part 2: 3 complete conversation flows
- [ ] Part 3: Escalation triggers + Handoff process + Anti-jail measures
- [ ] Part 4: 5 test conversations + Analysis summary

### Submission
Upload to course portal by module deadline.

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Part 1: Personality & Design | 20 | Identity clarity, brand alignment |
| Part 2: Conversation Flows | 35 | Completeness, logic, UX |
| Part 3: Escalation System | 20 | Trigger coverage, handoff quality |
| Part 4: Test Conversations | 25 | Realism, coverage, analysis |
| **Total** | **100** | |

### Grade Scale
- A: 90-100 - Exceptional chatbot design ready for implementation
- B: 80-89 - Strong design with minor improvements needed
- C: 70-79 - Satisfactory, meets basic requirements
- F: Below 70 - Incomplete or significant issues

---

## Tips for Success

1. **Think Like a Customer**: Test your flows from the customer's perspective.

2. **Plan for Failure**: The best chatbots handle errors gracefully.

3. **Keep It Simple**: Start with clear, focused flows before adding complexity.

4. **Show Personality**: Make your bot memorable and on-brand.

5. **Document Everything**: Clear documentation makes implementation easier.

---

## Extension Activities (Optional)

### For Advanced Learners:

1. **Prototype Implementation**: Build your order status flow in a chatbot platform (Voiceflow, Dialogflow, etc.)

2. **Analytics Dashboard Design**: Design a dashboard to monitor your chatbot's performance.

3. **A/B Test Plan**: Design an A/B test to compare two versions of a conversation flow.

4. **Multilingual Adaptation**: Adapt one flow for a different language and cultural context.

---

*Exercise 4 of 9 | AI for Customer Service Teams | 100 points total*
