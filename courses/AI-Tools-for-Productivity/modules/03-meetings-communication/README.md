# Module 3: Meeting & Communication Productivity

## Learning Objectives

By the end of this module, you will be able to:

1. Prepare comprehensive meeting agendas and briefings using AI
2. Generate effective meeting notes and summaries
3. Extract and track action items from meeting content
4. Create stakeholder updates and communication plans
5. Build presentations efficiently with AI assistance
6. Automate follow-up workflows

---

## Prerequisites

- Completed Module 2: Document Generation
- Experience with workplace meetings
- Access to AI tools (Claude or ChatGPT)

**Estimated Time**: 4 hours

---

## 1. Meeting Preparation with AI

### The Preparation Framework

Effective meetings require thorough preparation. AI accelerates each step:

```
PREPARATION WORKFLOW
1. PURPOSE    → Define meeting objective and desired outcomes
2. AGENDA     → Create structured agenda with time allocations
3. CONTEXT    → Gather background information on topics/attendees
4. MATERIALS  → Prepare supporting documents and data
5. QUESTIONS  → Anticipate discussion points and objections
6. BRIEFING   → Create pre-meeting summary for yourself
```

### Creating Meeting Agendas

**Basic Agenda Prompt:**
```
Create a meeting agenda for:
- Meeting type: [weekly team sync / project kickoff / decision meeting / etc.]
- Duration: [time]
- Attendees: [roles/names]
- Objective: [what needs to be accomplished]

Include:
- Time allocations for each item
- Person responsible for each topic
- Desired outcome for each agenda item
```

**Advanced Agenda with Context:**
```
Create a detailed agenda for a [meeting type].

Context:
- Last meeting: [key outcomes/open items]
- Current challenges: [list]
- Decisions needed: [list]

Meeting details:
- Duration: [time]
- Attendees: [list with roles]
- Location/format: [in-person/virtual]

For each agenda item, include:
- Topic and responsible person
- Time allocated
- Background context (1-2 sentences)
- Desired outcome
- Pre-work required from attendees
```

### Pre-Meeting Research

**Attendee Briefing Prompt:**
```
I have a meeting with [person/team].

What I know:
- Their role: [role]
- Our relationship: [context]
- Meeting purpose: [topic]

Help me prepare by:
1. Suggesting 3-5 questions to ask
2. Potential concerns they might raise
3. Key points I should be prepared to address
4. Suggested approach for the conversation
```

**Topic Research Prompt:**
```
I need to discuss [topic] in an upcoming meeting.

My current understanding: [what you know]
My position: [what you think/recommend]

Help me prepare by:
1. Summarizing key points about this topic
2. Identifying potential counterarguments
3. Suggesting data or examples to support my position
4. Anticipating questions I might be asked
```

---

## 2. Meeting Notes and Summarization

### Real-Time Note Organization

While AI can't attend meetings for you, it can help organize notes during or immediately after.

**Live Note Structure Prompt:**
```
Create a meeting notes template for a [meeting type] that I can fill in during
the meeting.

Include sections for:
- Attendees and date
- Key discussion points
- Decisions made
- Action items (with owners and deadlines)
- Questions raised
- Next steps
- Follow-up needed
```

### Post-Meeting Summarization

**Notes Cleanup Prompt:**
```
Here are my rough meeting notes. Please organize them into a professional
meeting summary:

[Paste your raw notes]

Format the output as:
1. Meeting Overview (date, attendees, purpose)
2. Key Discussion Points (3-5 bullets)
3. Decisions Made
4. Action Items (owner, task, deadline)
5. Next Steps
```

**Executive Summary from Notes:**
```
Create a 3-paragraph executive summary from these meeting notes for someone
who wasn't present:

[Paste notes]

Focus on:
- What was decided
- Key outcomes
- What happens next
```

### Action Item Extraction

**Action Item Prompt:**
```
Extract all action items from these meeting notes:

[Paste notes]

Format each action item as:
- Task: [specific action]
- Owner: [person responsible]
- Deadline: [date, or "TBD" if not specified]
- Dependencies: [any blockers or related items]
- Priority: [inferred from context: High/Medium/Low]
```

**Follow-up Tracking:**
```
Based on these action items from our last meeting:

[List previous action items]

Create a follow-up checklist for our next meeting that:
- Lists each item with status options (Complete/In Progress/Blocked/Not Started)
- Identifies items that need discussion
- Highlights any overdue items
- Suggests time allocation for follow-up review
```

---

## 3. Stakeholder Updates

### Status Communication Framework

Different stakeholders need different levels of detail:

| Audience | Focus | Length | Frequency |
|----------|-------|--------|-----------|
| Executives | Outcomes, risks, decisions needed | 3-5 bullets | Weekly/Biweekly |
| Project team | Tasks, blockers, timelines | Detailed | Daily/Weekly |
| Cross-functional | Dependencies, integration points | Medium | As needed |
| External stakeholders | Milestones, deliverables | Formal | Per milestone |

### Executive Update Prompt

```
Create an executive update for [project/initiative].

Key information:
- Overall status: [on track / at risk / behind]
- Recent accomplishments: [list]
- Current focus: [what's happening now]
- Risks/blockers: [list]
- Decisions needed: [list]
- Next milestone: [what and when]

Format as:
- 1-2 sentence overview
- RAG status (Red/Amber/Green) with brief explanation
- 3-4 bullet points on key items
- Clear ask if decisions are needed

Keep to one page maximum.
```

### Team Update Prompt

```
Create a team update email for [project/initiative].

Include:
- Wins from this period: [list]
- Focus for next period: [list]
- Blockers needing attention: [list]
- Recognition: [team member accomplishments]
- Reminders: [upcoming deadlines/events]

Tone: Motivating but informative
Length: 2-3 paragraphs plus bullet lists
```

### Stakeholder-Specific Communication

```
I need to communicate [update/news] to different audiences.

The core message: [describe]

Create versions for:
1. Executive leadership (2-3 sentences, focus on business impact)
2. Project team (detailed, focus on actions and timelines)
3. External partners (formal, focus on their interests)

Ensure consistent facts but appropriate framing for each audience.
```

---

## 4. Presentation Creation

### Presentation Planning

**Presentation Outline Prompt:**
```
Create a presentation outline for [topic].

Context:
- Audience: [who]
- Duration: [time]
- Purpose: [inform/persuade/train/update]
- Key message: [main takeaway]

Provide:
- Slide titles in logical sequence
- Key points for each slide (3-4 bullets)
- Where to include visuals/data
- Speaker notes suggestions
- Recommended time per section
```

### Slide Content Generation

**Individual Slide Prompt:**
```
Create content for a presentation slide about [topic].

This slide should:
- Title: [suggest compelling title]
- Key points: 3-4 bullet points maximum
- Supporting data or example: [one key stat or example]
- Visual suggestion: [what graphic would help]

Keep text minimal - this is for presentation, not reading.
```

**Presentation Narrative Prompt:**
```
Help me create a narrative flow for a presentation about [topic].

I need to:
- Start with: [hook/context]
- Build through: [key points]
- End with: [call to action/conclusion]

Suggest:
1. Opening hook (first 30 seconds)
2. Logical flow through main points
3. Transition sentences between sections
4. Memorable closing statement
```

### Speaking Points and Scripts

**Speaker Notes Prompt:**
```
Create speaker notes for this presentation outline:

[Paste outline]

For each slide provide:
- Opening line to say
- Key talking points (what to say, not what's on slide)
- Transition to next slide
- Timing estimate

Write in natural speaking language, not formal text.
```

---

## 5. Follow-Up Automation

### Post-Meeting Email Workflow

**Immediate Follow-Up Prompt:**
```
Write a follow-up email after a [meeting type].

Meeting summary:
- Key decisions: [list]
- Action items: [list with owners]
- Next meeting: [date/time]

The email should:
- Thank attendees briefly
- Recap key decisions
- List action items clearly (owner and deadline)
- Confirm next steps
- Keep it concise (under 200 words)
```

### Follow-Up Sequences

**Multi-Touch Follow-Up:**
```
Create a follow-up sequence for [situation].

Context: [describe the meeting/interaction]
Goal: [what you want to achieve]
Timeline: [urgency level]

Provide:
1. Immediate follow-up (within 24 hours)
2. First check-in (if no response after 3 days)
3. Final follow-up (if still no response)

Each email should be progressively shorter and more direct.
```

### Reminder and Check-In Templates

**Action Item Reminder:**
```
Write a friendly reminder email about an upcoming deadline.

Context:
- Original request: [what was asked]
- Person: [who]
- Deadline: [when]
- Status: [what you know about progress]

Tone: Supportive, not demanding
Include: Offer to help if they're blocked
```

---

## 6. Multi-Channel Communication

### Communication Channel Selection

| Message Type | Best Channel | AI Help |
|--------------|--------------|---------|
| Urgent action needed | Direct message + email | Draft both versions |
| Status update | Email or shared doc | Generate summary |
| Complex discussion | Meeting | Prepare agenda and materials |
| Quick question | Chat/Slack | Craft clear, complete question |
| Formal announcement | Email | Draft formal communication |
| Feedback/recognition | Public + private | Create both versions |

### Cross-Channel Consistency

**Multi-Channel Message Prompt:**
```
I need to communicate [message] across multiple channels.

Create versions for:
1. Slack/Teams message (brief, casual)
2. Email (professional, complete)
3. Meeting talking points (verbal, engaging)

Core information that must be in all versions:
- [fact 1]
- [fact 2]
- [action/CTA]

Ensure consistent facts but appropriate style for each channel.
```

---

## Best Practices Summary

1. **Prepare systematically** - Use AI to build complete preparation materials
2. **Capture everything** - Raw notes can always be cleaned up later
3. **Extract actions immediately** - Don't let action items get lost
4. **Tailor to audience** - Same information, different presentation
5. **Follow up promptly** - Send summaries within 24 hours
6. **Create templates** - Build reusable prompts for recurring meetings
7. **Iterate on formats** - Find what works for your team

---

## Common Pitfalls to Avoid

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Over-engineering agendas | Too complex for simple meetings | Match agenda detail to meeting importance |
| Generic summaries | Miss organization-specific context | Include relevant background in prompts |
| Missing owners | Action items without accountability | Always specify who and when |
| One-size-fits-all | Same update for all audiences | Customize for each stakeholder group |
| Late follow-ups | Lose momentum and clarity | Send within 24 hours |
| No preparation | Ineffective meetings | Invest time in AI-assisted prep |

---

## Knowledge Check

Before the exercises, confirm you can answer:

1. What are the six steps in the meeting preparation workflow?
2. How should you structure action items for maximum accountability?
3. What's the difference between executive and team updates?
4. How do you adapt the same message for different channels?
5. When should you send meeting follow-up emails?

---

## Additional Resources

### Meeting Templates
- Agenda templates by meeting type
- Note-taking templates
- Follow-up email templates

### Tools Integration
- Calendar management tips
- Note-taking app recommendations
- Task tracking integrations

---

## Summary

In this module, you learned:

- **Preparation**: Creating agendas, briefings, and pre-meeting research
- **Notes**: Organizing, cleaning, and summarizing meeting content
- **Action tracking**: Extracting and following up on commitments
- **Stakeholder updates**: Tailoring communication to different audiences
- **Presentations**: Building outlines, slides, and speaker notes
- **Follow-up**: Automating post-meeting communication workflows
- **Multi-channel**: Adapting messages for different communication platforms

**Next Module**: Data Analysis & Insights - using AI to extract meaning from data and documents.

---

*Module 3 of 8 | AI Tools for Productivity | Duration: 4 hours*
