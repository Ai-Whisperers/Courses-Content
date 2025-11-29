# Module 4: Sales Conversations & Follow-up

## Overview

This module teaches you to use AI for sales conversation preparation, execution support, and follow-up. You'll learn to automate pre-call research, generate discovery questions, prepare for objections, and create effective follow-up communications.

**Duration:** 3 hours
**Prerequisites:** Modules 1-3 completed

---

## Learning Objectives

By the end of this module, you will be able to:

1. Prepare for sales calls 80% faster using AI
2. Generate role-specific discovery questions
3. Anticipate and prepare responses to common objections
4. Create call agendas and talking points
5. Generate personalized follow-up emails after calls
6. Summarize call notes and next steps efficiently

---

## Section 1: Pre-Call Research Automation

### The Pre-Call Preparation Framework

```
COMPREHENSIVE CALL PREPARATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ACCOUNT CONTEXT
├── Company recent developments
├── Industry trends affecting them
├── Competitive landscape
└── Previous interactions (from CRM)

CONTACT CONTEXT
├── Role and responsibilities
├── Career background
├── LinkedIn activity and interests
├── Communication style indicators

OPPORTUNITY CONTEXT
├── Pain points identified
├── Buying stage indicators
├── Decision process insights
├── Budget/timeline signals

CONVERSATION STRATEGY
├── Discovery questions prioritized
├── Value propositions to emphasize
├── Objections to anticipate
├── Next steps to propose

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Pre-Call Briefing Prompt

```
PRE-CALL BRIEFING

I have a [call type: discovery/demo/negotiation] call with:
- Contact: [Name], [Title] at [Company]
- Call time: [Date and time]
- Call purpose: [What you hope to accomplish]

Previous Context:
- How we connected: [Outreach method]
- Previous conversations: [Summary if any]
- CRM notes: [Any relevant notes]

Research Available:
[Paste relevant research from Module 2 or new research]

Please provide a briefing document:

1. QUICK REFERENCE (30-second refresher)
- 3 key facts about the company
- 3 key facts about the contact
- Most important recent development

2. CALL OBJECTIVES
- Primary goal for this call
- Secondary goals
- Minimum acceptable outcome

3. OPENING STRATEGY
- Ice-breaker or rapport-builder
- Transition to business
- Setting the agenda

4. KEY QUESTIONS (Prioritized)
- 3 must-ask discovery questions
- 3 follow-up probes
- 1 qualification question

5. VALUE POINTS
- Which benefits to emphasize
- Relevant proof points or case studies
- Competitive differentiation if needed

6. OBJECTION PREPARATION
- 3 likely objections
- Prepared responses

7. CLOSE STRATEGY
- Proposed next steps
- Alternative next steps if needed

Format as a 1-page briefing I can reference during the call.
```

---

## Section 2: Discovery Question Generation

### Discovery Question Framework

```yaml
discovery_question_types:
  situation_questions:
    purpose: "Understand current state"
    examples:
      - "How are you currently handling [process]?"
      - "What tools/solutions are you using today?"
      - "How is your team structured for [function]?"

  problem_questions:
    purpose: "Uncover pain points"
    examples:
      - "What challenges are you facing with [current approach]?"
      - "Where do you see room for improvement?"
      - "What's the impact when [problem] occurs?"

  implication_questions:
    purpose: "Quantify the problem"
    examples:
      - "How much time/money does that cost?"
      - "What happens if this isn't addressed?"
      - "How does this affect [related area]?"

  need_payoff_questions:
    purpose: "Connect to your solution"
    examples:
      - "How valuable would it be to [benefit]?"
      - "What would solving this enable you to do?"
      - "What would success look like?"

  qualification_questions:
    purpose: "Confirm fit and buying potential"
    examples:
      - "What's driving the timing of looking at this now?"
      - "Who else would be involved in evaluating solutions?"
      - "What does your decision process typically look like?"
```

### Discovery Question Generation Prompt

```
DISCOVERY QUESTIONS FOR SALES CALL

Context:
I sell [your solution] to [target audience].
Our key value propositions are:
1. [Value prop 1]
2. [Value prop 2]
3. [Value prop 3]

Prospect:
- Name: [Name]
- Title: [Title]
- Company: [Company]
- Industry: [Industry]

Hypothesized pain points (from research):
1. [Pain point 1]
2. [Pain point 2]
3. [Pain point 3]

Generate discovery questions:

SITUATION QUESTIONS (5)
- Understand their current state
- Non-threatening, fact-finding

PROBLEM QUESTIONS (5)
- Uncover challenges related to our solution
- Probe areas where we can help

IMPLICATION QUESTIONS (3)
- Quantify impact of problems
- Build urgency

NEED-PAYOFF QUESTIONS (3)
- Connect problems to our solution value
- Have them articulate the benefit

QUALIFICATION QUESTIONS (4)
- Budget, Authority, Need, Timeline
- Decision process

For each question:
- The question itself
- Why to ask it
- What to listen for in the answer
```

---

## Section 3: Objection Handling Preparation

### Common Objection Categories

```
OBJECTION CATEGORIES
┌─────────────────────────────────────────────────────────┐
│                                                          │
│  PRICE/BUDGET                                           │
│  • "It's too expensive"                                 │
│  • "We don't have budget"                               │
│  • "Can you do better on price?"                        │
│                                                          │
│  TIMING                                                  │
│  • "Not the right time"                                 │
│  • "We're too busy right now"                           │
│  • "Call me next quarter"                               │
│                                                          │
│  AUTHORITY                                               │
│  • "I need to check with..."                            │
│  • "I'm not the decision maker"                         │
│  • "We have a process for this"                         │
│                                                          │
│  NEED/FIT                                                │
│  • "We're happy with current solution"                  │
│  • "We don't have that problem"                         │
│  • "This isn't a priority"                              │
│                                                          │
│  COMPETITION                                             │
│  • "We're already using [competitor]"                   │
│  • "Why should we switch?"                              │
│  • "[Competitor] has feature X"                         │
│                                                          │
│  TRUST/RISK                                              │
│  • "We've never heard of you"                           │
│  • "What if it doesn't work?"                           │
│  • "We've tried solutions like this before"             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Objection Preparation Prompt

```
OBJECTION HANDLING PREPARATION

I'm preparing for a sales call for [your solution].

Prospect context:
- Company: [Company]
- Contact: [Name], [Title]
- Stage: [Discovery/Demo/Proposal/Negotiation]
- Known concerns: [Any previously expressed concerns]

For these potential objections, provide responses:

1. "Your solution is too expensive"
2. "We're not ready to make a change right now"
3. "We're happy with [current solution/competitor]"
4. "I need to talk to my team/boss"
5. "Can you send me more information?"

For each objection, provide:

ACKNOWLEDGE
[How to acknowledge the concern genuinely]

PROBE
[Question to understand the real issue]

RESPOND
[The core response to address the concern]

CONFIRM
[How to check if concern is resolved]

PIVOT
[How to move the conversation forward]

Also provide:
- Warning signs to watch for (when objection might come up)
- Industry-specific variations
- Competitive response if relevant
```

---

## Section 4: Call Scripts and Talking Points

### Call Script Components

```yaml
call_script_structure:
  opening:
    rapport_builder: "5-10 seconds of connection"
    agenda_setting: "Frame the conversation"
    time_check: "Confirm we have [X] minutes"

  discovery_phase:
    situation_mapping: "Current state questions"
    problem_exploration: "Challenge identification"
    impact_quantification: "Implication questions"

  value_delivery:
    solution_connection: "How we help"
    proof_points: "Evidence and examples"
    differentiation: "Why us"

  qualification:
    timeline: "When looking to implement"
    authority: "Decision process"
    budget: "Investment framework"

  close:
    summarize: "Recap key points"
    next_steps: "Clear action items"
    commitment: "Confirm agreement"
```

### Talking Points Generation Prompt

```
CALL TALKING POINTS

Call Details:
- Type: [Discovery/Demo/Follow-up/Negotiation]
- Contact: [Name], [Title] at [Company]
- Duration: [X minutes]
- Objective: [What you want to accomplish]

Context:
- Previous conversations: [Summary]
- Known pain points: [List]
- Competition mentioned: [If any]

Generate talking points:

1. OPENING (2 minutes)
- Rapport builder
- Agenda for the call
- Confirmation of time

2. DISCOVERY/REVIEW (10-15 minutes)
- Key questions to ask
- Follow-up probes
- Validation questions

3. VALUE PRESENTATION (5-10 minutes)
- Main points to make
- Stories/examples to share
- Proof points

4. HANDLING CONCERNS (As needed)
- Likely pushback
- Prepared responses

5. CLOSE (5 minutes)
- Summarize value
- Propose next step
- Gain commitment

Include:
- Transition phrases between sections
- Time checks to keep on track
- Alternative paths if conversation goes differently
```

---

## Section 5: Post-Call Follow-up

### Follow-up Email Framework

```
POST-CALL FOLLOW-UP EMAIL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TIMING
├── Within 2 hours of call end
├── While conversation is fresh
└── Before their next meeting

SUBJECT LINE
├── Reference conversation topic
├── Include their name or company
└── Action-oriented

STRUCTURE
├── Thank them for time
├── Summarize key discussion points
├── Confirm agreed next steps
├── Include any promised resources
├── Restate value proposition briefly
├── Clear call-to-action

LENGTH
├── 100-150 words
├── Easy to scan
└── Clear action items highlighted

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Follow-up Email Generation Prompt

```
POST-CALL FOLLOW-UP EMAIL

Call Details:
- Who: [Name], [Title] at [Company]
- When: [Date and time]
- Type: [Discovery/Demo/etc.]
- Duration: [How long]

Call Summary:
- Key topics discussed: [List main points]
- Pain points confirmed: [What they acknowledged]
- Questions they asked: [Key questions]
- Concerns raised: [Any objections or hesitations]
- Their reaction to solution: [Positive/Neutral/Skeptical]

Outcomes:
- Next steps agreed: [What was committed]
- Resources to send: [Anything promised]
- Timeline discussed: [Any dates mentioned]
- Other stakeholders: [Anyone else to involve]

Write a follow-up email that:
1. Thanks them for their time
2. Summarizes 3 key discussion points
3. Confirms the agreed next steps
4. Includes any promised resources (with placeholders)
5. Provides a clear CTA
6. Keeps professional but warm tone

Length: 100-150 words
Include: Subject line
Format: Easy to scan with key points visible
```

### Call Summary for CRM

```
CRM CALL SUMMARY

From these call notes:
[Paste your raw notes or recording transcript summary]

Create a structured CRM entry:

CALL SUMMARY (2-3 sentences)
[Brief overview of the conversation]

KEY FINDINGS
- Pain Points Confirmed: [List]
- Current Solution: [What they're using]
- Decision Process: [Who's involved, timeline]
- Budget: [Any indicators]
- Competition: [Any mentioned]

NEXT STEPS
- Action: [What's next]
- Owner: [Who does it]
- Due: [When]

OPPORTUNITY STATUS
- Stage: [Updated stage if applicable]
- Close Date: [Updated estimate if discussed]
- Amount: [If revised]

FOLLOW-UP REQUIRED
- Task: [What you need to do]
- Reminder: [When]
```

---

## Section 6: Conversation Intelligence Integration

### Using AI with Call Recordings

```yaml
call_analysis_workflow:
  step_1_transcription:
    source: "Call recording from Zoom/Teams/Gong"
    process: "Automated transcription"
    output: "Text transcript"

  step_2_ai_analysis:
    prompt: |
      Analyze this sales call transcript:
      [Paste transcript]

      Provide:
      1. Call summary (50 words)
      2. Key buyer signals (positive and negative)
      3. Pain points mentioned
      4. Objections raised and how handled
      5. Competitor mentions
      6. Next steps discussed
      7. Coaching opportunities

  step_3_action_items:
    extraction: "Pull all commitments made"
    formatting: "Task list with owners and dates"
    integration: "Add to CRM and task manager"
```

### Meeting Preparation from Previous Calls

```
MEETING PREP FROM HISTORY

I have a follow-up call with [Name] at [Company].

Previous call summary:
[Paste CRM notes or transcript summary from last call]

Email exchanges since:
[Paste relevant email threads]

For this upcoming call, provide:

1. CONVERSATION HISTORY RECAP
- Key points from last call
- What was agreed
- What's happened since

2. OPEN ITEMS TO ADDRESS
- Unanswered questions
- Pending decisions
- Follow-up on their concerns

3. UPDATED DISCOVERY QUESTIONS
- Based on what we learned
- To advance the opportunity

4. POTENTIAL OBSTACLES
- Concerns to revisit
- New objections possible

5. CALL OBJECTIVE
- What we should accomplish
- How to measure success
```

---

## Key Takeaways

1. **Preparation Wins Deals**: AI makes thorough prep possible for every call
2. **Questions > Pitches**: Discovery drives value; use AI to prepare questions
3. **Anticipate Objections**: Having responses ready builds confidence
4. **Follow-up Fast**: AI enables quick, personalized follow-up while fresh
5. **Document Everything**: AI summarization ensures nothing is lost
6. **Build on History**: Each call should build on previous conversations

---

## What's Next

In Module 5, you'll learn to use AI for proposal and document automation:
- Automated proposal generation
- Quote customization
- Presentation preparation
- RFP response assistance

---

## Resources

- Pre-Call Briefing Template (in course resources)
- Discovery Question Library
- Objection Response Library
- Post-Call Email Templates

---

*Module 4 of 7 | AI for Sales Teams | 3 hours*
