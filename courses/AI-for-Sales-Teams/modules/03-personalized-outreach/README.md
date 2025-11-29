# Module 3: Personalized Outreach at Scale

## Overview

This module teaches you to use AI to create genuinely personalized outreach that scales without losing authenticity. You'll learn to write emails that don't feel templated, craft compelling subject lines, personalize LinkedIn messages, and build follow-up sequences that maintain quality across high volumes.

**Duration:** 4 hours
**Prerequisites:** Module 2 completed (research profiles ready)

---

## Learning Objectives

By the end of this module, you will be able to:

1. Write personalized cold emails using AI that feel 1:1
2. Optimize subject lines for open rates
3. Create personalized LinkedIn messages at scale
4. Build multi-touch follow-up sequences
5. A/B test outreach elements with AI assistance
6. Maintain authenticity while increasing volume

---

## Section 1: The Personalization Spectrum

### From Generic to Genuine

```
PERSONALIZATION LEVELS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LEVEL 0: SPRAY AND PRAY
"Dear Sir/Madam, I'd like to introduce our solution..."
├── No personalization
├── Feels like spam
└── Response rate: <1%

LEVEL 1: BASIC MERGE FIELDS
"Hi [First Name], I noticed [Company] is in [Industry]..."
├── Uses name and company
├── Still feels templated
└── Response rate: 1-3%

LEVEL 2: ROLE-BASED
"Hi [Name], as a VP of Sales at [Company], you're likely..."
├── Acknowledges role
├── Generic assumptions
└── Response rate: 3-5%

LEVEL 3: RESEARCH-BASED
"Hi [Name], I saw [Company]'s recent [specific event]..."
├── Shows specific research
├── Relevant connection
└── Response rate: 5-10%

LEVEL 4: INSIGHT-DRIVEN
"Hi [Name], [Company]'s expansion into [market] suggests
you might be facing [specific challenge]. Here's how..."
├── Demonstrates understanding
├── Provides value
└── Response rate: 10-20%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### What Makes Personalization "Real"

| Element | Generic | Genuine |
|---------|---------|---------|
| Name | First name only | Full context acknowledgment |
| Company | Company name mentioned | Specific company insight |
| Role | Generic role assumptions | Role-specific challenges |
| Timing | Random outreach | Trigger-based relevance |
| Value | Feature list | Problem-solution connection |
| Ask | Generic "15 minutes?" | Specific, relevant next step |

---

## Section 2: AI-Powered Email Writing

### The Email Framework

Effective sales emails follow a clear structure:

```
COLD EMAIL STRUCTURE
┌─────────────────────────────────────────────────────────┐
│  SUBJECT LINE (Opens the email)                        │
│  ─────────────────────────────                         │
│  • Personalized or intriguing                          │
│  • Under 50 characters ideal                           │
│  • No spam triggers                                     │
│                                                          │
│  OPENING (Earns the first sentence)                    │
│  ───────                                                │
│  • Research-based hook                                  │
│  • Relevant to them, not you                           │
│  • 1-2 sentences max                                    │
│                                                          │
│  BODY (Delivers value)                                  │
│  ────                                                   │
│  • Their challenge → Your solution                     │
│  • Specific benefit, not features                       │
│  • Social proof if relevant                            │
│  • 2-3 sentences                                        │
│                                                          │
│  CTA (Drives action)                                    │
│  ───                                                    │
│  • Clear, specific ask                                  │
│  • Low friction                                         │
│  • 1 sentence                                           │
│                                                          │
│  TOTAL: 75-125 words                                    │
└─────────────────────────────────────────────────────────┘
```

### Email Generation Prompt

```
PERSONALIZED COLD EMAIL

Context:
I'm a [your role] at [your company].
We help [target audience] achieve [outcome] by [how you help].

Prospect Research:
- Contact: [Name], [Title] at [Company]
- Company context: [Key research findings from Module 2]
- Trigger event: [Recent event if applicable]
- Pain points: [Hypothesized challenges]
- Personalization angle: [Specific hook]

Email Requirements:
- Subject line: Personalized, under 50 characters
- Opening: Reference their specific situation
- Body: Connect their challenge to our solution
- CTA: [Specific ask - meeting, resource, response]
- Tone: [Professional / Conversational / Direct]
- Length: 75-125 words

Please write:
1. Subject line (provide 3 options)
2. Complete email body
3. Brief explanation of personalization strategy

Do NOT include:
- Generic statements that could apply to anyone
- Feature lists without benefit connection
- Overly salesy language
- Multiple CTAs
```

### Email Variations Prompt

Generate multiple versions for A/B testing:

```
EMAIL VARIATIONS

Based on this research:
[Paste prospect research]

Generate 3 different email approaches:

VERSION A: TRIGGER-FOCUSED
Lead with the recent [trigger event]
Emphasize timing and relevance

VERSION B: PAIN-POINT FOCUSED
Lead with the [specific challenge]
Emphasize problem-solution fit

VERSION C: VALUE-FIRST
Lead with a relevant insight or resource
Emphasize helpfulness over selling

For each version, provide:
- Subject line
- Complete email (75-125 words)
- When this version works best
```

---

## Section 3: Subject Line Optimization

### Subject Line Principles

```yaml
subject_line_best_practices:
  do:
    - personalize: "Include name, company, or specific reference"
    - create_curiosity: "Make them want to know more"
    - be_specific: "Vague subjects get ignored"
    - keep_short: "Under 50 characters (mobile-friendly)"
    - match_content: "Subject must relate to email body"

  dont:
    - use_clickbait: "Misleading subjects damage trust"
    - all_caps: "LOOKS LIKE SPAM"
    - overuse_punctuation: "!!! or ???"
    - be_generic: "'Quick question' or 'Touching base'"
    - include_spam_triggers: "'Free', 'Act now', 'Limited time'"

  formats_that_work:
    personalized: "[Name] - [specific reference]"
    question: "How does [Company] handle [challenge]?"
    mutual_connection: "[Connection name] suggested I reach out"
    trigger_based: "Congrats on [achievement]"
    value_offer: "[Specific resource] for [their situation]"
```

### Subject Line Generation Prompt

```
SUBJECT LINE OPTIONS

Prospect: [Name] at [Company]
Context: [Key research points]
Email Focus: [Main message theme]

Generate 10 subject line options in these categories:

PERSONALIZED (3 options)
- Reference them or their company specifically

CURIOSITY (2 options)
- Create intrigue without clickbait

QUESTION (2 options)
- Ask something relevant to their situation

TRIGGER-BASED (2 options)
- Reference recent event or timing

VALUE-OFFER (1 option)
- Lead with something helpful

For each, note:
- Character count
- Why it might work
- Any A/B testing pairing
```

### Subject Line Testing Framework

| Element | Version A | Version B | Track |
|---------|-----------|-----------|-------|
| Personalization | With name | Without name | Open rate |
| Length | Short (<30 char) | Medium (30-50) | Open rate |
| Question vs. Statement | Question | Statement | Open rate |
| Trigger reference | Included | Not included | Open rate |

---

## Section 4: LinkedIn Message Personalization

### LinkedIn Message Best Practices

```
LINKEDIN MESSAGE STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONNECTION REQUEST (300 character limit)
├── Brief, specific reason for connecting
├── Research-based personalization
├── Professional but warm
└── No pitch in connection request

FIRST MESSAGE (After connection accepted)
├── Thank them for connecting
├── Personalized observation/comment
├── Value-first approach
├── Soft call-to-action
└── 75-100 words max

FOLLOW-UP MESSAGE
├── Reference previous message
├── Add new value or insight
├── Slightly firmer CTA
└── 50-75 words

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### LinkedIn Connection Request Prompt

```
LINKEDIN CONNECTION REQUEST

Prospect: [Name], [Title] at [Company]
Connection Context: [Why you want to connect]
Research Points:
- [Relevant detail 1]
- [Relevant detail 2]
- [Shared connection or interest if any]

Write a connection request (under 300 characters) that:
1. Is personalized to their situation
2. Gives a credible reason for connecting
3. Does NOT pitch or sell
4. Feels professional but human

Provide 3 variations:
A) Research-based
B) Shared interest/connection based
C) Industry/role based
```

### LinkedIn Message Sequence Prompt

```
LINKEDIN MESSAGE SEQUENCE

After connecting with: [Name], [Title] at [Company]

Research:
[Key points from account/contact research]

Create a 3-message sequence:

MESSAGE 1 (Day 1 after accepted)
- Thank and personalize
- Share relevant insight or resource
- Soft engagement ask
- 75-100 words

MESSAGE 2 (Day 5 if no response)
- Add new value
- Slightly more direct
- Specific ask
- 50-75 words

MESSAGE 3 (Day 10 if no response)
- Final attempt
- Direct but professional
- Clear CTA
- 50 words max

Each message should stand alone but build on previous context.
```

---

## Section 5: Follow-Up Sequences

### The Follow-Up Framework

```yaml
follow_up_principles:
  timing:
    email_1: "Day 1 - Initial outreach"
    email_2: "Day 3-4 - First follow-up"
    email_3: "Day 7 - Second follow-up"
    email_4: "Day 14 - Third follow-up"
    email_5: "Day 21-28 - Break-up email"

  value_progression:
    email_1: "Initial value proposition"
    email_2: "Different angle or additional value"
    email_3: "Social proof or case study"
    email_4: "New insight or resource"
    email_5: "Final attempt with clear close"

  tone_evolution:
    early: "Helpful, informative"
    middle: "More direct, specific"
    late: "Urgent but professional"

  golden_rules:
    - "Each email should provide new value"
    - "Never just 'checking in'"
    - "Reference previous emails briefly"
    - "Vary the CTA across sequence"
    - "Last email should be break-up style"
```

### Follow-Up Sequence Prompt

```
FOLLOW-UP EMAIL SEQUENCE

Original email context:
[Paste original email or describe approach]

Prospect: [Name] at [Company]
Original value prop: [What you offered]
Research notes: [Key points to leverage]

Generate a 4-email follow-up sequence:

EMAIL 2 (Day 3-4)
- Brief reference to email 1
- New angle or additional value
- Different CTA (softer or alternative)
- 50-75 words

EMAIL 3 (Day 7)
- Add social proof or case study
- Connect to their specific situation
- Slightly more direct
- 50-75 words

EMAIL 4 (Day 14)
- New insight or resource to share
- Demonstrate persistence without annoyance
- Clear value + ask
- 50-75 words

EMAIL 5 (Day 21-28) - BREAK-UP
- Acknowledge lack of response
- Final value statement
- Clear close (respond or I'll close file)
- Professional goodbye
- 40-60 words
```

### Follow-Up Subject Line Strategy

| Email | Subject Line Strategy | Example |
|-------|----------------------|---------|
| Email 2 | Re: [original subject] | Re: [Company]'s expansion plans |
| Email 3 | New subject - value add | [Case study] for [their situation] |
| Email 4 | Re: [email 2 subject] | Re: Quick thought for [Name] |
| Email 5 | Fresh subject - break-up | Closing the loop on [topic] |

---

## Section 6: Maintaining Authenticity at Scale

### The Authenticity Checklist

Before sending AI-assisted outreach, verify:

```
AUTHENTICITY CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DOES THIS SOUND LIKE ME?
[ ] Would I say this in a conversation?
[ ] Does the tone match my personal style?
[ ] Have I edited it to add my voice?

IS THE PERSONALIZATION GENUINE?
[ ] Is the research accurate?
[ ] Would this only apply to this specific person?
[ ] Does it demonstrate real understanding?

IS THE VALUE REAL?
[ ] Am I offering something genuinely useful?
[ ] Is my solution actually relevant to their situation?
[ ] Would I want to receive this message?

IS THE ASK APPROPRIATE?
[ ] Is my CTA reasonable for this relationship level?
[ ] Am I asking for too much too soon?
[ ] Is there a clear benefit for them to respond?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Batch Personalization Workflow

```yaml
batch_personalization_process:
  step_1_research_batch:
    action: "Research 10-15 prospects using Module 2 methods"
    output: "Research profiles with personalization angles"
    time: "60-90 minutes"

  step_2_generate_drafts:
    action: "Use AI to generate email drafts for batch"
    approach: |
      Process 3-5 at a time with context for each
    output: "Draft emails for all prospects"
    time: "30-45 minutes"

  step_3_human_review:
    action: "Review each email for authenticity and accuracy"
    checklist:
      - verify_facts: "Confirm research claims"
      - add_voice: "Edit to sound like you"
      - check_relevance: "Ensure fit for this prospect"
      - verify_cta: "Appropriate ask"
    time: "2-3 minutes per email"

  step_4_send_and_track:
    action: "Send with tracking, note personalization used"
    metrics:
      - open_rate: "Subject line effectiveness"
      - reply_rate: "Message resonance"
      - positive_reply_rate: "Quality of targeting"

  weekly_capacity:
    without_ai: "20-30 personalized emails"
    with_ai: "75-100 personalized emails"
    improvement: "3-4x volume at same quality"
```

### Quality Control Metrics

| Metric | Target | Indicates |
|--------|--------|-----------|
| Open Rate | 40-60% | Subject line + sender reputation |
| Reply Rate | 5-15% | Message relevance + personalization |
| Positive Reply Rate | 50%+ of replies | Targeting quality |
| Unsubscribe Rate | <0.5% | Message appropriateness |
| Spam Complaints | <0.1% | List quality + message quality |

---

## Key Takeaways

1. **Personalization is Research**: Quality personalization requires quality research (Module 2)
2. **AI Drafts, You Refine**: Always add your voice and verify accuracy
3. **Value Before Ask**: Lead with relevance and value, not your needs
4. **Subject Lines Matter**: Invest time in subject line testing
5. **Follow-Up Adds Value**: Each touch should provide new value, not just persistence
6. **Authenticity Scales**: Real personalization at scale is possible with the right workflow

---

## What's Next

In Module 4, you'll learn to use AI for sales conversations, including:
- Pre-call research automation
- Discovery question generation
- Objection preparation
- Follow-up email generation after calls

---

## Resources

- Email Templates Library (in course resources)
- Subject Line Swipe File
- LinkedIn Message Templates
- Follow-Up Sequence Templates

---

*Module 3 of 7 | AI for Sales Teams | 4 hours*
