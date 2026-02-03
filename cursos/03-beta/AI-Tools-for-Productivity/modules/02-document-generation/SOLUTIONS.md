# Module 2 Solutions: Document Generation & Enhancement Lab

## Overview

This document provides sample responses and guidance for the Document Generation & Enhancement Lab exercises. Use these as reference points, not as the only correct answers. Your solutions may vary based on your specific context and preferences.

---

## Part 1: Requirements Document Creation

### Task 1.1: PRD Generation

**Sample Prompt:**
```
I need to create a Product Requirements Document (PRD) for a new feature in our
internal communication tool. Please create a comprehensive PRD with the following
context:

Feature: Quick Reactions
- Ability to react to messages with emoji reactions (similar to Slack)
- Target users: All employees using our internal messaging platform (approximately
  2,000 users across 5 departments)
- Business context: We want to reduce message clutter and enable quick
  acknowledgments without requiring full replies. User research shows 73% of
  employees want this feature.

Please include these sections:
1. Executive Summary
2. Problem Statement
3. Goals and Success Metrics
4. User Stories
5. Functional Requirements
6. Non-Functional Requirements
7. Out of Scope
8. Timeline Considerations
9. Dependencies and Risks

Use a professional, concise tone. Include measurable success criteria.
```

**Sample Generated PRD:**
```markdown
# Product Requirements Document: Quick Reactions

## 1. Executive Summary

The Quick Reactions feature enables users to respond to messages with emoji
reactions, reducing message thread clutter while maintaining engagement.
This document outlines the requirements for implementing emoji reactions
in our internal communication platform.

## 2. Problem Statement

Currently, users must send full text replies to acknowledge or respond to
messages, leading to:
- Cluttered message threads with low-information responses ("OK", "Thanks", "Got it")
- Reduced visibility of important messages buried under acknowledgments
- User friction in providing quick feedback on announcements and updates
- 73% of surveyed employees requesting lightweight response options

## 3. Goals and Success Metrics

**Primary Goals:**
- Reduce low-value text responses by 60% within 3 months of launch
- Increase message engagement rate by 25%
- Achieve 70% feature adoption within 6 months

**Success Metrics:**
| Metric | Current | Target | Timeframe |
|--------|---------|--------|-----------|
| Text-only acknowledgments | 450/day | <180/day | 3 months |
| Message engagement rate | 34% | 42.5% | 3 months |
| Feature adoption | 0% | 70% | 6 months |
| User satisfaction (reactions) | N/A | 4.2/5 | 6 months |

## 4. User Stories

**US-1**: As a team member, I want to react to a message with an emoji so that
I can quickly acknowledge receipt without cluttering the thread.

**US-2**: As a message author, I want to see who reacted to my message so that
I know my message was received and understood.

**US-3**: As a user, I want to remove my reaction so that I can correct
accidental clicks or change my response.

**US-4**: As a manager, I want to see reaction summaries on announcements so
that I can gauge team sentiment quickly.

**US-5**: As a mobile user, I want to react to messages on my phone so that
I can engage while away from my desk.

## 5. Functional Requirements

**FR-1**: Reaction Selection
- Users can add reactions via click/tap on any message
- Emoji picker displays 6 most-used reactions plus access to full library
- Maximum 20 unique reaction types per message

**FR-2**: Reaction Display
- Reactions appear below the message content
- Grouped by emoji type with count
- Clicking a reaction group shows list of users who reacted

**FR-3**: Reaction Management
- Users can remove their own reactions with single click
- Users can add multiple different reactions to the same message
- Authors can disable reactions on their own messages

**FR-4**: Notifications
- Optional notification when your message receives reactions
- Aggregated notifications (e.g., "5 people reacted to your message")

## 6. Non-Functional Requirements

**Performance:**
- Reaction updates must appear within 500ms for all connected users
- Reaction picker must load within 200ms

**Scalability:**
- Support up to 1,000 reactions per message
- Handle 10,000 concurrent users adding reactions

**Accessibility:**
- Keyboard navigation for reaction picker
- Screen reader support for reaction counts
- High contrast mode support

## 7. Out of Scope

- Custom emoji upload (future phase)
- Reaction-based polls or voting
- Reactions on files or images (only text messages)
- Animated emoji reactions
- Reaction analytics dashboard

## 8. Timeline Considerations

**Phase 1 (MVP)**: 6 weeks
- Basic reaction add/remove
- Standard emoji set
- Desktop web client

**Phase 2**: 4 weeks
- Mobile apps
- Reaction notifications
- User preferences

## 9. Dependencies and Risks

**Dependencies:**
- Emoji library selection (recommend: Twemoji for consistency)
- WebSocket infrastructure for real-time updates
- Database schema updates for reaction storage

**Risks:**
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Performance degradation on high-volume channels | Medium | High | Implement reaction batching and caching |
| Emoji rendering inconsistency | Low | Medium | Use standard emoji library across platforms |
| User confusion with multiple reactions | Low | Low | Provide onboarding tooltips |
```

**Review Checklist:**

| Criterion | Met? | Notes |
|-----------|------|-------|
| Problem clearly stated | Y | Section 2 describes the problem with data |
| Goals are measurable | Y | Specific percentages and timeframes in Section 3 |
| User stories included | Y | 5 stories in correct format in Section 4 |
| Requirements are specific | Y | FR and NFR sections with details |
| Out of scope defined | Y | Clear list of excluded features |
| No contradictions | Y | Reviewed for consistency |

**Sample Refinement Prompt:**
```
The PRD looks good. Please make these refinements:

1. Add acceptance criteria to each user story
2. Include a section on accessibility requirements with WCAG 2.1 compliance
3. Add a competitor analysis section comparing our approach to Slack, Teams, and Discord
4. Make the success metrics more detailed with baseline measurement methodology
```

### Task 1.2: User Story Generation

**Sample Prompt:**
```
Based on the Quick Reactions PRD above, generate detailed user stories with
acceptance criteria. For each story include:
- Story in format: "As a [role], I want [feature] so that [benefit]"
- Acceptance criteria (Given/When/Then format)
- Story points estimate (1, 2, 3, 5, 8)
- Priority (High/Medium/Low)

Generate at least 8 user stories covering all functionality.
```

**Sample User Stories:**

1. **US-001: Add Reaction to Message**
   - As a team member, I want to add an emoji reaction to a message so that I can quickly acknowledge or respond without typing.
   - **Acceptance Criteria:**
     - Given I am viewing a message, When I click the reaction icon, Then the emoji picker appears
     - Given the emoji picker is open, When I click an emoji, Then it is added to the message
     - Given I added a reaction, When I view the message, Then I see my reaction with the count
   - Story Points: 5
   - Priority: High

2. **US-002: View Reaction Details**
   - As a message author, I want to see who reacted with each emoji so that I know who acknowledged my message.
   - **Acceptance Criteria:**
     - Given a message has reactions, When I hover/click on a reaction, Then I see the list of users
     - Given the user list is displayed, Then names are shown in order of reaction time
   - Story Points: 3
   - Priority: High

3. **US-003: Remove My Reaction**
   - As a user, I want to remove my reaction from a message so that I can correct mistakes.
   - **Acceptance Criteria:**
     - Given I reacted to a message, When I click my reaction emoji, Then my reaction is removed
     - Given I removed my reaction, Then the count decreases by 1
     - Given I was the only one with that emoji, Then the emoji disappears from the message
   - Story Points: 2
   - Priority: High

4. **US-004: Quick React with Recent Emojis**
   - As a frequent user, I want quick access to my recently used reactions so that I can react faster.
   - **Acceptance Criteria:**
     - Given I open the reaction picker, Then my 6 most recent emojis appear first
     - Given I react with a new emoji, Then it appears in my recent list
   - Story Points: 3
   - Priority: Medium

5. **US-005: Disable Reactions on My Message**
   - As a message author, I want to disable reactions on specific messages so that I can control engagement on sensitive content.
   - **Acceptance Criteria:**
     - Given I am composing a message, When I select "disable reactions", Then no one can react
     - Given reactions are disabled, When others view the message, Then no reaction button appears
   - Story Points: 3
   - Priority: Low

**Quality Assessment:**
- Do all stories follow the correct format? **Yes** - All use "As a... I want... so that..."
- Are acceptance criteria testable? **Yes** - Given/When/Then format enables test case creation
- Stories to add: Notification preferences, keyboard accessibility, mobile gesture support

---

## Part 2: Business Report Creation

### Task 2.1: Status Report

**Sample Prompt:**
```
Create a professional weekly project status report with the following information:

Project: Website Redesign
Report Date: Current week
Project Phase: Development Phase 2 of 4

Accomplishments This Week:
- Homepage mockups approved by stakeholders after 2 revision rounds
- Content audit 80% complete (192 of 240 pages reviewed)
- Technical architecture document finalized
- Staging environment configured

Next Week's Priorities:
- Begin frontend development sprint (homepage, navigation)
- Finalize navigation structure with UX team
- Complete remaining 20% of content audit
- Start CMS data migration planning

Blockers/Risks:
- Waiting on updated brand guidelines from marketing (2 weeks overdue)
- One developer out sick, may impact sprint velocity
- Third-party API vendor hasn't confirmed integration timeline

Budget Status: On track, 45% spent
Timeline Status: 1 week behind original schedule

Format as a professional status report suitable for executive review. Include
RAG status indicators (Red/Amber/Green) where appropriate.
```

**Sample Generated Report:**
```markdown
# Weekly Project Status Report

## Website Redesign Project
**Report Date:** January 24, 2026
**Prepared By:** [Project Manager Name]
**Reporting Period:** January 20-24, 2026

---

## Executive Summary

The Website Redesign project is progressing through Development Phase 2 with
homepage design approval achieved. Project is currently **AMBER** status due
to a one-week schedule delay and pending brand guidelines from Marketing.

---

## Status Dashboard

| Category | Status | Trend |
|----------|--------|-------|
| Overall | 🟡 AMBER | → |
| Schedule | 🟡 AMBER | → |
| Budget | 🟢 GREEN | → |
| Scope | 🟢 GREEN | → |
| Resources | 🟡 AMBER | ↓ |

---

## Accomplishments This Week

| Item | Status | Notes |
|------|--------|-------|
| Homepage mockup approval | ✅ Complete | Approved after 2 revision rounds |
| Content audit progress | 80% Complete | 192/240 pages reviewed |
| Technical architecture | ✅ Complete | Document signed off |
| Staging environment | ✅ Complete | Ready for development |

---

## Next Week's Priorities

| Priority | Owner | Target Date | Dependencies |
|----------|-------|-------------|--------------|
| Begin frontend sprint | Dev Team | Jan 27 | Staging env (done) |
| Finalize navigation | UX Team | Jan 29 | Stakeholder availability |
| Complete content audit | Content Team | Jan 31 | None |
| CMS migration planning | Tech Lead | Jan 31 | Architecture doc (done) |

---

## Blockers and Risks

### Active Blockers

| Blocker | Impact | Owner | Escalation Date |
|---------|--------|-------|-----------------|
| Brand guidelines overdue | Cannot finalize color scheme | Marketing | Jan 27 (if unresolved) |

### Risks Being Monitored

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Developer sick leave | High | Medium | Reprioritize sprint backlog |
| API vendor timeline | Medium | High | Identifying backup vendor |

---

## Budget Summary

| Category | Budget | Spent | Remaining | % Used |
|----------|--------|-------|-----------|--------|
| Development | $120,000 | $54,000 | $66,000 | 45% |
| Design | $40,000 | $38,000 | $2,000 | 95% |
| Infrastructure | $20,000 | $8,000 | $12,000 | 40% |
| **Total** | **$180,000** | **$100,000** | **$80,000** | **56%** |

Status: 🟢 On track - spending aligned with project progress

---

## Timeline Status

**Original Completion:** March 15, 2026
**Revised Completion:** March 22, 2026 (1 week delay)

**Delay Factors:**
- Additional mockup revision cycle (+3 days)
- Holiday schedule impact (+2 days)

**Recovery Plan:**
- Evaluating parallel workstreams to recover schedule
- Decision point: January 31

---

## Key Decisions Needed

1. **Brand Guidelines:** Proceed with existing guidelines or wait for update?
   - Decision needed by: January 27
   - Recommended: Proceed with existing, update if needed later

2. **Sprint Scope:** Adjust sprint goals due to resource constraint?
   - Decision needed by: January 27
   - Recommended: Reduce scope by 2 story points, defer navigation animations

---

## Next Status Report: January 31, 2026
```

**Refinements Made:**
- Asked AI to add the RAG status table at the top
- Manually adjusted budget numbers to be more realistic
- Added specific dates rather than relative timeframes

### Task 2.2: Executive Summary

**Sample Prompt:**
```
Condense the following project status report into a 3-sentence executive summary
for busy stakeholders. Focus on: current status, key achievement, and main concern.

[Paste status report above]
```

**Sample Executive Summary:**
```
The Website Redesign project is progressing through Development Phase 2 with
AMBER status, running one week behind schedule but on budget at 56% spend.
This week we achieved a critical milestone with homepage mockup approval and
80% content audit completion, enabling development to begin Monday. Our primary
risk is the two-week overdue brand guidelines from Marketing, which requires
escalation by January 27 if unresolved.
```

**Assessment:**
- Does it capture the most important information? **Yes** - Status, milestone, risk
- Could an executive understand the situation? **Yes** - Clear picture in 3 sentences
- What would you change? Could add the revised completion date for full context

---

## Part 3: Email Communication

### Task 3.1: Email Drafting - Multiple Scenarios

**Email 1 - Scenario A: Request Meeting with VP**

**Sample Prompt:**
```
Write a professional email requesting a meeting with Sarah Chen, VP of Product,
whom I haven't met. I want to discuss a project idea for improving our customer
onboarding flow based on user research I've conducted. I'm a Product Designer who's
been at the company for 8 months. Keep it concise, respectful of her time, and
include suggested meeting times. Maximum 150 words.
```

**AI Output:**
```
Subject: Meeting Request: Customer Onboarding Improvement Proposal

Hi Sarah,

I'm Alex, a Product Designer on the Core Experience team. I've been at [Company]
for 8 months working on our user dashboard.

Over the past quarter, I've conducted user research that revealed some significant
opportunities to improve our customer onboarding flow. The data suggests we could
reduce time-to-value by 40% with targeted improvements.

I would greatly appreciate 20 minutes of your time to share these findings and
get your perspective on potential next steps.

Would any of these times work for you next week?
- Tuesday 2-3pm
- Wednesday 10-11am
- Thursday 3-4pm

I'm happy to work around your schedule. I can also send a brief summary
beforehand if that's helpful.

Thank you for considering this request.

Best regards,
Alex
```

**Your Edits:**
- Changed "significantly improve" to "reduce time-to-value by 40%" for specificity
- Added offer to send summary beforehand (shows preparation)
- Removed one filler sentence for conciseness

**Final Email:**
```
Subject: Meeting Request: Customer Onboarding Improvement Proposal

Hi Sarah,

I'm Alex, a Product Designer on the Core Experience team—I've been at [Company]
for 8 months working on user dashboard improvements.

I recently completed user research that identified opportunities to reduce
customer time-to-value by 40% through targeted onboarding improvements.

Would you have 20 minutes next week to review these findings? I'm happy to send
a one-page summary beforehand. Available times:
- Tuesday 2-3pm
- Wednesday 10-11am
- Thursday 3-4pm

Thank you for your time.

Best,
Alex
```

---

**Email 2 - Scenario B: Follow Up on Overdue Deliverable**

**Sample Prompt:**
```
Write a professional follow-up email to my colleague Jordan about a deliverable
(competitive analysis report) that was due last Friday. This is my second follow-up.
We need it for a client presentation next Tuesday. Be firm but maintain the
relationship. We're peers who work well together normally.
```

**AI Output:**
```
Subject: Competitive Analysis Report - Needed by EOD Tomorrow

Hi Jordan,

I wanted to follow up on the competitive analysis report that was due last Friday.
I know you've had a lot on your plate, but we really need this for the client
presentation on Tuesday.

Without the report, we won't be able to complete the market positioning section,
which is a key part of what the client is expecting to see.

Could you please send it by end of day tomorrow at the latest? If there are any
blockers I can help with, just let me know.

If the full report isn't possible, even a draft version would help us move forward.

Thanks,
[Your name]
```

**Your Edits:**
- Made deadline more explicit with specific date
- Added acknowledgment of their situation while maintaining urgency
- Included specific impact to make priority clear

**Final Email:**
```
Subject: Competitive Analysis Report - Needed by EOD Monday (Jan 27)

Hi Jordan,

Following up on the competitive analysis report originally due last Friday—I
know things get busy, but this has become urgent.

We need the report by end of day Monday (Jan 27) to complete the market
positioning section for Tuesday's client presentation. Without it, we'll have
a gap in a section the client specifically requested.

Is there anything blocking you that I can help with? If the full report isn't
possible by then, even a draft or the key competitor profiles would help us
move forward.

Let me know either way so I can plan accordingly.

Thanks,
[Your name]
```

---

**Email 3 - Scenario D: Announce Process Change**

**Sample Prompt:**
```
Write an email to my team (8 people) announcing that we're changing our code
review process. Previously: any team member could approve. New process:
requires approval from at least one senior developer AND one person from a
different sub-team. Reason: improve code quality and cross-team knowledge.
Effective date: February 1. Be clear but not bureaucratic.
```

**AI Output:**
```
Subject: Code Review Process Update - Effective February 1

Hi team,

I wanted to share an update to our code review process that takes effect
February 1st.

What's Changing:
Previously, any team member could approve a PR. Going forward, PRs will require:
1. At least one approval from a Senior Developer (Maria, James, or Chen)
2. At least one approval from someone outside your immediate sub-team

Why We're Making This Change:
- Ensure senior-level review catches architectural issues earlier
- Increase cross-team knowledge sharing and reduce silos
- Improve overall code consistency across our codebase

What This Means for You:
- When submitting PRs, tag both a senior dev and someone from another sub-team
- Expect slightly longer review times initially as we adjust
- Feel free to review PRs outside your sub-team—we encourage it!

I know this adds a step, but the feedback from other teams who've adopted
this approach has been very positive.

Questions? Let's discuss at our team meeting Thursday.

Thanks,
[Your name]
```

**Your Edits:**
- Kept mostly as-is, format was clean
- Added specific names of senior developers for clarity
- Softened "What This Means for You" section

**Final Email:** (Used AI output with minor name additions)

---

### Task 3.2: Tone Transformation

**Original Email:** (Scenario A - Meeting Request)

**Version 1 - More Formal:**
```
Subject: Request for Meeting: Customer Onboarding Enhancement Initiative

Dear Ms. Chen,

Please allow me to introduce myself. I am Alex Martinez, Product Designer within
the Core Experience team, where I have been contributing to user dashboard
development for the past eight months.

I am writing to respectfully request a meeting to discuss findings from recent
user research I conducted. This research has identified opportunities to enhance
our customer onboarding experience, with potential to reduce time-to-value by
approximately 40 percent.

I believe your strategic perspective would be invaluable in determining
appropriate next steps for these findings.

Would you be amenable to a 20-minute meeting during the week of January 27?
I am flexible regarding scheduling and would be pleased to provide a written
summary in advance of our discussion.

Thank you for your consideration of this request.

Respectfully,
Alex Martinez
Product Designer, Core Experience Team
```

**Version 2 - More Casual:**
```
Subject: Quick chat about onboarding ideas?

Hey Sarah!

I'm Alex from the Core Experience team—we haven't met yet, but I've heard great
things about the product direction you're driving.

I've been digging into our onboarding data and found some interesting stuff—
looks like we might be able to cut time-to-value by almost half with some
targeted changes.

Any chance you'd have 20 min next week to chat about it? Happy to send over
a quick summary first if that helps.

No worries if your calendar's packed—I know how it goes!

Cheers,
Alex
```

**Reflection:**
- Which version would I use? The original (middle ground) - formal enough to show respect for her position, casual enough to be approachable
- Key phrase changes:
  - Formal: "Dear Ms. Chen" vs casual "Hey Sarah!"
  - Formal: "I am writing to respectfully request" vs casual "Any chance you'd have"
  - Formal: "Thank you for your consideration" vs casual "No worries if"

---

## Part 4: Editing and Enhancement

### Task 4.1: Document Improvement

**Sample Improvement Prompt:**
```
Rewrite this poorly written business communication to be professional, specific,
and actionable. Keep the same general information but improve:
- Clarity and specificity
- Professional tone
- Structure and organization
- Actionable next steps

Original:
"Hey team so I wanted to let you know that the project is going pretty well I
think. We did some stuff last week and will do more stuff next week. There
were some problems but we fixed them mostly. Let me know if you have any
questions about anything or whatever. Also we need to meet sometime to talk
about the budget maybe because I think we might need more money but I'm not
totally sure yet. Thanks!"
```

**AI-Improved Version:**
```
Subject: Project Status Update - Week of [Date]

Team,

Here's a brief update on our project progress.

Last Week's Accomplishments:
- [Specific accomplishment 1]
- [Specific accomplishment 2]

Challenges Addressed:
- We encountered [specific issue], which has been resolved by [solution].

Next Week's Focus:
- [Specific task 1]
- [Specific task 2]

Action Needed - Budget Discussion:
I've identified a potential budget gap that we should discuss before our
next milestone. I'm reviewing the numbers and will have specifics by [date].

Proposed: 30-minute budget review meeting this week. Please let me know
your availability for Wednesday or Thursday afternoon.

Questions? Reply to this email or message me directly.

Best,
[Name]
```

**Final Version (with manual edits):**
```
Subject: Project Update: Week of January 20

Team,

Quick update on where we stand.

Last Week:
- Completed user authentication module testing
- Finalized API documentation for external partners
- Resolved database timeout issues affecting search functionality

This Week's Focus:
- Begin payment integration development
- User acceptance testing for authentication module

Budget Note:
I'm seeing a potential shortfall in our Q1 infrastructure budget. Still
reviewing, but may need an additional $5-8K for server scaling.

Let's do a quick 30-min sync to discuss. Can people reply with their
availability for Wednesday or Thursday, 2-4pm?

—[Name]
```

**Changes Made:**
- AI improvements: Added structure, headers, specific placeholders, clear action items
- Manual edits: Filled in realistic specifics, tightened language, made budget concern more concrete with numbers

### Task 4.2: Grammar and Clarity Check

**Sample Prompt:**
```
Proofread and correct the following text. Identify each error, explain what's
wrong, and provide the correction. Then give me the fully corrected version.

"The implementation of the new system will effect how employees complete there
daily tasks. Its important that everyone is trained proper before we go live.
Each department will recieve seperate training session's based on they're
specific needs and the impact to there workflows."
```

**Corrected Version:**
```
The implementation of the new system will affect how employees complete their
daily tasks. It's important that everyone is trained properly before we go live.
Each department will receive separate training sessions based on their
specific needs and the impact to their workflows.
```

**Errors Found:**
1. **effect → affect**: "Effect" is typically a noun; "affect" is the verb meaning to influence
2. **there → their** (first instance): "Their" is possessive; "there" indicates location
3. **Its → It's**: "It's" is the contraction for "it is"; "its" is possessive
4. **proper → properly**: Adverb needed to modify the verb "trained"
5. **recieve → receive**: Common misspelling; remember "i before e except after c"
6. **seperate → separate**: Common misspelling; note the "a" in the middle
7. **session's → sessions**: No apostrophe for simple plural
8. **they're → their**: "They're" means "they are"; "their" is possessive
9. **there → their** (last instance): Same error as #2

---

## Part 5: Voice Preservation

### Task 5.1: Style Analysis

**Sample Writing Sample 1:**
```
Just wrapped up the quarterly review - overall numbers look solid but we've got
some work to do on the enterprise segment. I'm thinking we should pull together
a small task force to dig into the conversion issues. Probably 3-4 people max,
focused effort for 2 weeks. Let me know if you want to join or have suggestions
for who should be involved.
```

**Sample Writing Sample 2:**
```
Quick heads up - the vendor pushed back on our timeline by two weeks. Not ideal,
but I've already got a backup plan in motion. Going to parallel-track the internal
development while we wait. Might actually end up with a better solution. Will
keep you posted as things develop.
```

**Sample Style Analysis Response:**
```
Based on analysis of your two writing samples, here's your style profile:

**Sentence Structure:**
- Predominantly short to medium sentences (10-20 words)
- Uses compound sentences connected with "but" and "and"
- Frequent use of sentence fragments for emphasis ("Not ideal." "Probably 3-4 people max.")
- Opens with action-oriented phrases ("Just wrapped up," "Quick heads up")

**Vocabulary Level:**
- Conversational business vocabulary (not overly formal or casual)
- Industry shorthand used naturally ("enterprise segment," "conversion issues")
- Action verbs dominate ("dig into," "pull together," "pushed back")
- Avoids jargon and buzzwords

**Tone Characteristics:**
- Direct and confident without being aggressive
- Problem-solution oriented (identifies issue, proposes action)
- Inclusive ("Let me know if you want to join")
- Optimistic pragmatism ("Might actually end up with a better solution")

**Distinctive Patterns:**
- Leads with the headline/situation, then provides context
- Uses dashes for parenthetical thoughts
- Ends with forward-looking next steps
- Numbers used for specificity ("3-4 people," "2 weeks")
- Phrases like "Let me know," "Will keep you posted," "Just wrapped up"
```

**Reflection:**
- Is the analysis accurate? **Yes** - captured my preference for short sentences and direct language
- What did I learn? I tend to always offer next steps and include others in decisions

### Task 5.2: Style-Matched Generation

**Sample Prompt:**
```
Using the style analysis above (short sentences, action verbs, direct tone,
problem-solution structure, conversational business vocabulary), write a
brief message to my team about switching our daily standups from 9am to 10am.
The reason is that it gives everyone time to settle in and review their tasks
before the meeting. Keep it under 75 words.
```

**Generated Content:**
```
Hey team - we're shifting standups from 9am to 10am starting Monday. Gives
everyone time to settle in, check messages, and actually know what they're
working on before we sync.

Trial run for two weeks. If it's not working, we'll adjust.

Calendar invites updated. Let me know if the new time creates any conflicts.
```

**Assessment:**
- Does this sound like me? **4/5** - Captured the directness and structure well
- Adjustments: Would change "Hey team" to "Quick update" and "sync" to "meet"
- Phrases that don't fit: "actually know what they're working on" - slightly more casual than my usual

---

## Reflection Questions - Sample Responses

**1. Which document type was easiest/hardest to generate with AI?**

Easiest: Status reports - they follow a predictable structure and the AI just needs to organize provided information.

Hardest: Emails requiring nuanced tone - balancing professional firmness with relationship maintenance (like the overdue deliverable email) required more iteration.

**2. How much editing did you typically need to do on AI outputs?**

About 15-25% modification on average. Most changes were:
- Making content more specific (replacing placeholders with real details)
- Adjusting tone to match the actual relationship
- Tightening language (AI tends to be slightly verbose)

**3. What patterns did you notice in how you prompt AI effectively?**

- More context = better output (company info, relationship dynamics, constraints)
- Specifying word counts or length constraints improves conciseness
- Giving examples of desired tone helps more than describing the tone
- Asking for specific sections/structure yields more organized outputs

**4. Did maintaining your voice get easier with practice?**

Yes. After analyzing my style once, I could include those characteristics in prompts: "Use short sentences, lead with the action, end with next steps." The AI adapted well to these instructions.

**5. What's one document you create regularly that you'll now use AI for?**

Weekly status reports. The structure is predictable, and AI can help organize bullet points into a clean format. I'll still write the content, but use AI to polish and format.

**6. What guardrails or checks will you implement in your document workflow?**

- Always do a "would I actually send this?" read-through before using AI output
- Double-check any statistics or claims AI might have added
- Have a colleague review first AI-generated documents of each type
- Keep a "my voice" reference document to use in future prompts

---

## Bonus Challenge Sample

**Proposal Document Strategy:**

For a full proposal, I would prompt in stages:
1. First prompt: Generate outline with section headers
2. Second prompt: Executive summary (after I've thought through the main points)
3. Separate prompts for each major section with specific data inputs
4. Final prompt: Review for consistency and flow

Key insight: Don't try to generate a complex document in one prompt. Break it into components and build up.

---

*Solutions for Module 2 | AI Tools for Productivity*
