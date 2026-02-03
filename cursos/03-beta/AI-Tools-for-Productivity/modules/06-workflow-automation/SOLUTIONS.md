# Module 6 Solutions: Workflow Automation Lab

## Overview

This document provides sample responses for the Workflow Automation Lab. The solutions use "Weekly Project Status Report" as the example workflow to demonstrate the complete design process.

---

## Part 1: Workflow Audit

### Task 1.1: Personal Task Analysis

**Sample Task List:**

| Task | Frequency | Time Spent | Text-Based? |
|------|-----------|------------|-------------|
| 1. Weekly status report | Weekly | 60 min | Yes |
| 2. Meeting follow-up emails | 5x/week | 15 min each | Yes |
| 3. Project kickoff documentation | 2x/month | 90 min | Yes |
| 4. Client proposal responses | 3x/month | 45 min | Yes |
| 5. Internal team announcements | Weekly | 20 min | Yes |
| 6. Expense report preparation | Monthly | 30 min | Partial |
| 7. Interview feedback documentation | 2x/month | 25 min | Yes |
| 8. Quarterly business review slides | Quarterly | 3 hours | Partial |
| 9. New employee onboarding emails | Monthly | 40 min | Yes |
| 10. Vendor communication/responses | 4x/week | 15 min each | Yes |

### Task 1.2: Automation Potential Assessment

**Sample Prompt:**
```
Analyze these recurring work tasks for AI automation potential. For each task, rate:
- Automation potential (High/Medium/Low)
- Why it's a good or poor candidate
- Estimated time savings if automated

Tasks:
1. Weekly status report (60 min/week) - summarizing work, progress, blockers
2. Meeting follow-up emails (5x/week, 15 min each) - sending notes and action items
3. Project kickoff documentation (2x/month, 90 min) - creating project charters
4. Client proposal responses (3x/month, 45 min) - drafting RFP responses
5. Internal team announcements (weekly, 20 min) - communicating updates

Consider: What makes a task good for AI automation?
- Consistent structure/format
- Text-based input and output
- Low risk if imperfect (can be edited)
- High frequency (compounds savings)
```

**Sample AI Assessment:**
```markdown
## Task Automation Analysis

| Task | Potential | Reasoning | Est. Savings |
|------|-----------|-----------|--------------|
| **Weekly Status Report** | HIGH | Highly structured, recurring, low-risk edits | 70% (42 min) |
| **Meeting Follow-ups** | HIGH | Template-able, frequent, clear format | 60% (45 min/wk) |
| **Project Kickoff Docs** | MEDIUM | Structured but requires judgment, less frequent | 40% (36 min) |
| **Client Proposals** | MEDIUM | Needs heavy customization, higher stakes | 30% (13 min) |
| **Team Announcements** | HIGH | Simple structure, frequent, low stakes | 50% (10 min) |

### Recommended Priority Order:
1. **Meeting Follow-ups** - Highest total time savings (45 min/week)
2. **Weekly Status Report** - Single task with high savings (42 min/week)
3. **Team Announcements** - Quick win, easy template

### Why These Work:
- All are text-based with clear inputs/outputs
- All have predictable structure
- All allow human review before sending
- Mistakes are correctable (low downside risk)

### Why Proposals Are Lower Priority:
- Higher stakes requires more careful review
- More customization needed per client
- Lower frequency reduces compound savings
```

**Top 3 Automation Candidates:**

| Rank | Task | Why It's a Good Candidate | Estimated Time Savings |
|------|------|--------------------------|----------------------|
| 1 | Meeting follow-up emails | Most frequent, clear structure, AI can draft from notes | 45 min/week (60%) |
| 2 | Weekly status report | High time investment, structured format, repeatable | 42 min/week (70%) |
| 3 | Team announcements | Quick wins, simple structure, builds confidence | 10 min/week (50%) |

### Task 1.3: Quick Win Selection

**Selected Task:** Weekly Project Status Report

**Why This Task:**
- **Frequency:** Weekly (52x per year)
- **Current time spent:** 60 minutes
- **Risk level if imperfect:** Low - I review before sending, can edit
- **Clear inputs/outputs:** Yes - inputs are my notes/accomplishments, output is structured report

---

## Part 2: Workflow Design

### Task 2.1: Process Mapping

**Current Process (Before AI):**

| Step | Action | Time | Who/What |
|------|--------|------|----------|
| 1 | Review calendar/tasks from past week | 10 min | Me + calendar/task tool |
| 2 | Pull metrics from project dashboard | 10 min | Me + dashboards |
| 3 | Draft accomplishments section | 15 min | Me |
| 4 | Draft next week priorities | 10 min | Me |
| 5 | Identify blockers and risks | 5 min | Me |
| 6 | Format into report template | 5 min | Me |
| 7 | Review and send | 5 min | Me |

**Total Current Time:** 60 minutes

### Task 2.2: AI-Enhanced Process Design

**Sample Process Design Prompt:**
```
Help me redesign this workflow to incorporate AI assistance:

Current Workflow: Weekly Status Report
Current Time: 60 minutes
Steps: Review week, gather metrics, draft sections, format, send

My goal:
- Reduce time to under 20 minutes
- Maintain quality (can't send raw AI output)
- Must still include my judgment on blockers/priorities

Constraints:
- I still need to gather the raw information
- Must review AI output before sending
- Report goes to stakeholders who know my style

Design an AI-enhanced workflow that:
1. Shows which steps AI handles vs. human
2. Estimates time for each step
3. Identifies where human judgment is required
```

**AI Recommendation:**
```markdown
## AI-Enhanced Weekly Status Report Workflow

### New Process:

**Step 1: Quick Data Gathering (8 min - Human)**
Instead of drafting, just bullet-point your raw accomplishments, next week items,
and blockers. No formatting, no complete sentences needed.

**Step 2: AI Draft Generation (2 min - AI)**
Paste bullets into AI with your template prompt. AI generates full draft.

**Step 3: Human Review & Edit (5 min - Human)**
Review AI draft. Add nuance, fix anything that doesn't sound like you,
ensure accuracy of any metrics.

**Step 4: Send (1 min - Human)**
Copy to email/tool, send.

### Time Comparison:

| Step | Old Process | New Process | Change |
|------|-------------|-------------|--------|
| Data Gathering | 20 min (detailed) | 8 min (bullets only) | -60% |
| Drafting | 30 min | 2 min (AI) | -93% |
| Review/Format | 10 min | 6 min | -40% |
| **Total** | **60 min** | **16 min** | **-73%** |

### Where Human Judgment Is Required:
- Choosing what to highlight vs. minimize
- Tone around sensitive topics (delays, risks)
- Accuracy of metrics and claims
- Style consistency with previous reports
```

**AI-Enhanced Process:**

| Step | Action | Time | Human or AI? |
|------|--------|------|--------------|
| 1 | Quick bullet capture of week's events | 8 min | Human |
| 2 | Paste bullets into AI with template | 1 min | Human (setup) |
| 3 | AI generates draft report | 1 min | AI |
| 4 | Review, edit, personalize | 5 min | Human |
| 5 | Send to stakeholders | 1 min | Human |

**Estimated New Time:** 16 minutes
**Time Savings:** 73% reduction

### Task 2.3: Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                 Weekly Status Report Workflow               │
└─────────────────────────────────────────────────────────────┘

START: Friday morning (before noon)
         │
         ▼
┌─────────────────┐
│ GATHER BULLETS  │  ← Human (8 min)
│ - Accomplishments│    Review calendar, task tool
│ - Next week     │    Write quick bullets
│ - Blockers      │    No formatting needed
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ AI DRAFT        │  ← AI (1 min)
│ Paste bullets + │    Uses template prompt
│ template prompt │    Generates full draft
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ HUMAN REVIEW    │  ← Human (5 min)
│ - Check accuracy│    ⚠️ CRITICAL: Don't skip
│ - Fix tone      │    Ensure it sounds like you
│ - Add nuance    │    Adjust sensitive items
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ SEND            │  ← Human (1 min)
└────────┬────────┘
         │
         ▼
        END (Total: 16 min)
```

---

## Part 3: Prompt Template Creation

### Task 3.1: Main Workflow Template

**Template Name:** Weekly Status Report Generator

**Purpose:** Transform bullet-point accomplishments into a professional weekly status report

**Prompt Template:**
```
You are helping me write my weekly status report. Use my voice and style:
professional but not stiff, specific with metrics, and focused on impact.

CONTEXT:
- Project: [PROJECT NAME]
- Report period: Week of [DATE]
- Audience: [STAKEHOLDERS - e.g., "project sponsor and leadership team"]
- Report format: Standard status report with accomplishments, next week, blockers

MY RAW NOTES:

Accomplishments this week:
[BULLET POINTS - paste your raw accomplishments]

Priorities for next week:
[BULLET POINTS - paste planned activities]

Blockers/Risks:
[BULLET POINTS - paste any issues, or "None"]

Metrics (if applicable):
[KEY NUMBERS - e.g., "80% complete, 2 days behind schedule"]

INSTRUCTIONS:
1. Transform my bullets into 3-5 well-written accomplishment bullets
2. Write 3-4 priority items for next week
3. Format blockers professionally (if any)
4. Add a 2-sentence executive summary at the top
5. Keep my tone - don't make it overly formal or add corporate jargon
6. Flag anything that seems unclear with [CLARIFY: question]

FORMAT:
Use this structure:
---
**Weekly Status: [Project Name]**
**Week of: [Date]**

**Summary:** [2-sentence overview]

**Accomplishments:**
• [bullet]
• [bullet]

**Next Week Priorities:**
• [bullet]
• [bullet]

**Blockers/Risks:**
• [if any]

**Metrics:** [if provided]
---
```

### Task 3.2: Template Variations

**Variation Name:** Status Report - Problem Week

**When to Use:** When the week had significant issues, delays, or bad news to communicate

**Variation Template:**
```
You are helping me write my weekly status report for a challenging week.
We need to communicate problems honestly while maintaining confidence in
the path forward.

CONTEXT:
- Project: [PROJECT NAME]
- Report period: Week of [DATE]
- Audience: [STAKEHOLDERS]
- Situation: We hit significant challenges this week

MY RAW NOTES:

What happened (the problems):
[BULLET POINTS - describe what went wrong]

What we did about it:
[BULLET POINTS - actions taken]

Current status:
[Where things stand now]

Adjusted plan going forward:
[BULLET POINTS - what changes]

INSTRUCTIONS:
1. Lead with a clear, honest summary - don't bury the problem
2. Immediately follow problems with actions taken
3. Show a clear path forward
4. Maintain professional confidence (we have this under control)
5. Don't make excuses - focus on facts and solutions
6. If there's good news to include, put it after the issue is addressed

TONE: Direct, solution-focused, accountable

FORMAT:
---
**Weekly Status: [Project Name]**
**Week of: [Date]**

**Summary:** [Clear statement of situation and recovery plan]

**Key Challenge This Week:**
[Clear description]

**Actions Taken:**
• [bullet]
• [bullet]

**Impact & Adjusted Plan:**
[What this means for timeline/scope and how we're addressing it]

**Other Progress:**
• [other accomplishments if any]

**Next Week Focus:**
• [bullet]
---
```

### Task 3.3: Template Testing

**Test Input:**
```
You are helping me write my weekly status report. Use my voice and style:
professional but not stiff, specific with metrics, and focused on impact.

CONTEXT:
- Project: Customer Portal Redesign
- Report period: Week of January 20
- Audience: VP of Product and Engineering Director
- Report format: Standard status report

MY RAW NOTES:

Accomplishments this week:
- finished homepage mockups, got approved after 2 rounds revisions
- dev environment working now, all 4 devs can run locally
- did 3 user interviews for checkout flow
- wrote tech spec for payment integration (12 pages)

Priorities for next week:
- start frontend dev sprint (homepage)
- more user interviews (need 5 total)
- finalize navigation IA

Blockers/Risks:
- waiting on API docs from payments team, followed up twice

Metrics:
- Design phase: 80% complete
- Overall project: on track for March 15 launch
```

**Output:**
```markdown
---
**Weekly Status: Customer Portal Redesign**
**Week of: January 20**

**Summary:** Strong design progress this week with homepage mockups approved and
development environment ready for the team. We're on track for our March 15 launch,
though we need payment API documentation to proceed with that integration.

**Accomplishments:**
• Completed and received approval on homepage mockups after two revision cycles
• Resolved development environment issues - all four developers now have working local setups
• Conducted 3 of 5 planned user interviews for checkout flow (60% complete)
• Delivered 12-page technical specification for payment integration

**Next Week Priorities:**
• Kick off frontend development sprint starting with homepage implementation
• Complete remaining 2 user interviews for checkout flow
• Finalize navigation information architecture with UX team

**Blockers/Risks:**
• ⚠️ Payment API documentation still pending from vendor (two follow-ups sent).
  Not blocking current work, but will impact payment sprint if unresolved by Feb 1.

**Metrics:**
| Milestone | Status |
|-----------|--------|
| Design Phase | 80% complete |
| Overall Timeline | On track for March 15 |
---
```

**Quality Assessment:**
- Did it produce usable output? **Yes** - ready to send with minor edits
- What needs adjustment? "Not blocking current work" - I should verify this
- Refinements to make: Add instruction to not add formatting I didn't request (tables)

**Refined Template (excerpt):**
```
... [same template with this addition]

OUTPUT FORMAT RULES:
- Use bullet points, not tables
- Don't add sections I didn't provide content for
- Keep metrics simple (not table format)
```

---

## Part 4: Measurement Framework

### Task 4.1: Metrics Definition

**Time Metrics:**
- Baseline (without AI): 60 minutes per occurrence
- Target (with AI): 16 minutes per occurrence
- Measurement method: Track time from "start gathering notes" to "hit send"

**Quality Metrics:**
- What defines "good quality":
  - Accurate information (no errors in metrics or claims)
  - Professional tone (appropriate for executive audience)
  - Completeness (all sections addressed)
  - Minimal edits needed (less than 5 minutes of revision)
- How to measure:
  - Self-assessment 1-5 scale after each report
  - Track edit time separately from draft time
  - Note if any stakeholder asks for clarification (quality indicator)

**Frequency:**
- How often: 1 time per week (52 occurrences per year)

### Task 4.2: ROI Calculation

**Investment:**
- Template creation time: 2 hours (initial development)
- Your hourly rate (estimate): $75/hour
- AI tool cost (monthly): $20 (ChatGPT Plus or Claude Pro)

**Savings:**
- Time saved per task: 44 minutes (60 - 16)
- Tasks per month: 4.3 (weekly)
- Hours saved per month: 3.15 hours (44 min × 4.3)
- Monthly value (hours × rate): $236

**ROI:**
- Monthly savings: $236 (time value)
- Monthly cost: $20 (AI tool, prorated to this one use case: ~$5)
- Net monthly value: $231
- Payback period: 0.65 months (initial 2 hours = $150; recovered in <1 month)

**Annual Impact:**
- Time saved: 38 hours (44 min × 52 weeks)
- Value at $75/hour: $2,850
- AI tool cost: $240/year (but shared across many uses)
- Net annual value: $2,610+

### Task 4.3: Tracking Template

| Date | Task Instance | Time Spent | Quality (1-5) | Notes |
|------|--------------|------------|---------------|-------|
| Jan 24 | Status Report v1 | 22 min | 4 | First try, some editing needed |
| Jan 31 | Status Report v2 | 18 min | 4 | Faster, tweaked template |
| Feb 7 | Status Report v3 | 15 min | 5 | Smooth process |
| Feb 14 | Status Report v4 | 16 min | 5 | Used problem-week variant |

**Tracking Insights Column (for weekly review):**
- Running average time
- Quality trend
- Templates/prompts that worked best

---

## Part 5: Team Documentation

### Task 5.1: Workflow Documentation

**Sample Documentation Prompt:**
```
Create team documentation for this AI-assisted workflow so others can adopt it.

Workflow: Weekly Status Report Generation
Time savings: 60 min → 16 min (73% reduction)
Prerequisites: Access to AI tool (ChatGPT/Claude), status report template

The documentation should include:
1. Overview (what this is and why it matters)
2. When to use this workflow
3. Step-by-step instructions
4. The prompt template (copy-paste ready)
5. Tips for best results
6. Common mistakes to avoid
7. FAQ

Target reader: Professional who's somewhat familiar with AI tools but hasn't
built workflows before.
```

**Generated Documentation:**
```markdown
# Workflow: AI-Assisted Weekly Status Report

## Overview
This workflow uses AI to transform quick bullet-point notes into polished
status reports. **Time: 60 minutes → 16 minutes (73% reduction)**

Instead of drafting your report from scratch, you capture raw notes and let
AI handle the writing. You then review and send.

## When to Use
- Weekly status reports to leadership
- Project updates to stakeholders
- Any recurring report with predictable structure

## Prerequisites
- AI tool access (ChatGPT Plus, Claude Pro, or company-approved tool)
- 5-10 minutes of uninterrupted time
- This template saved and accessible

## Step-by-Step Instructions

### Step 1: Gather Your Bullets (8 min)
Review your week quickly and jot down:
- What you accomplished (4-6 bullets)
- What's planned for next week (3-4 bullets)
- Any blockers or risks (or "none")
- Key metrics if relevant

**Don't write complete sentences.** Quick notes are fine:
- "Homepage approved after 2 revs"
- "Dev env working, all 4 devs"
- "Waiting on API docs"

### Step 2: Run the AI Template (2 min)
1. Open your AI tool
2. Paste the template (see below)
3. Fill in [PLACEHOLDERS] with your info
4. Paste your bullets in the right sections
5. Generate

### Step 3: Review and Edit (5 min)
- Read through the output
- Fix anything that doesn't sound like you
- Verify all facts/numbers are accurate
- Adjust tone for sensitive topics

**Never send AI output without reading it.**

### Step 4: Send (1 min)
Copy to email/tool and send.

---

## The Template

[Copy-paste the full prompt template from Part 3]

---

## Tips for Best Results

**DO:**
- Be specific in your bullets ("3 interviews" not "some interviews")
- Include numbers whenever possible
- Note context the AI might not know ("client X is sensitive about delays")

**DON'T:**
- Skip the review step
- Use for first-time reports to new audiences (establish your voice first)
- Include confidential info in non-secure AI tools

## Common Mistakes

| Mistake | Solution |
|---------|----------|
| Vague bullets → generic output | Be specific: "completed" → "completed and approved" |
| Skipping review → embarrassing send | Always read before sending |
| Wrong tone for audience | Specify audience in template |
| Over-editing AI output | If editing >5 min, improve your template instead |

## FAQ

**Q: What if the AI output is wrong?**
A: That's why you review. AI will sometimes misunderstand context. Edit as needed.

**Q: Can I use this for client-facing reports?**
A: Yes, but review more carefully. Consider mentioning in template that it's client-facing.

**Q: What if I have a bad week to report?**
A: Use the "Problem Week" template variation (see appendix).
```

### Task 5.2: Documentation Review

**What's Missing:**
1. Security/confidentiality guidance (which tools are approved)
2. Example of filled-in template with output

**What Needs Clarification:**
1. How to access the template (shared drive location, bookmark, etc.)
2. Who to contact if there are issues

**Your Additions:**
```markdown
## Security Note
Only use company-approved AI tools. Do not paste confidential project
information into consumer AI tools. [Link to approved tools list]

## Getting Help
Questions about this workflow? Contact [Name] or post in #ai-productivity Slack channel.

## Appendix: Example
[Include the full test input and output from Task 3.3]
```

### Task 5.3: Training Plan Outline

**5-Minute Training Plan:**

1. **Explain the purpose (30 sec):**
   "This workflow turns your weekly status reports from a 60-minute task into a 16-minute task. You provide bullets, AI does the writing, you review and send."

2. **Show a demo (2 min):**
   - Open AI tool
   - Paste template and fill with example bullets
   - Generate and show output
   - Point out what to check during review

3. **Walk through template (1 min):**
   - Show each [PLACEHOLDER] and what goes there
   - Highlight the "Instructions" section AI follows
   - Show where the variations live

4. **Let them try (1 min):**
   - Have them paste the template
   - Fill with one accomplishment bullet
   - Generate and see result

5. **Answer questions (30 sec):**
   - Common Q: "What if AI makes mistakes?" → "That's why you review"
   - Point to documentation for reference

---

## Part 6: Workflow Library Structure

### Task 6.1: Organization System

**Sample Organization Prompt:**
```
Design an organization system for a personal library of AI workflow templates.
Consider:
- I'll have 10-20 templates eventually
- Different types: reports, emails, analysis, documentation
- Some templates have variations
- I need to find them quickly when needed
- Should work in a simple file system or notes app

Propose folder structure, naming conventions, and metadata to track.
```

**Proposed Structure:**
```
AI-Workflows/
├── README.md                    # Library overview and quick links
├── _templates/                  # Blank starter templates
│   └── template-starter.md
│
├── 01-reports/                  # Reporting workflows
│   ├── weekly-status-report.md
│   ├── weekly-status-problem.md
│   └── monthly-review.md
│
├── 02-emails/                   # Email workflows
│   ├── meeting-followup.md
│   ├── client-update.md
│   └── team-announcement.md
│
├── 03-documents/                # Document creation
│   ├── project-kickoff.md
│   ├── requirements-doc.md
│   └── proposal-response.md
│
├── 04-analysis/                 # Analysis workflows
│   ├── interview-synthesis.md
│   └── competitive-summary.md
│
└── 05-reference/                # Supporting docs
    ├── prompt-tips.md
    └── troubleshooting.md
```

**Naming Convention:** `[category]-[specific-use].md`
Examples: `report-weekly-status.md`, `email-meeting-followup.md`

**Metadata in Each File:**
```markdown
---
name: Weekly Status Report
category: Reports
time_saved: 44 min
frequency: Weekly
last_updated: 2026-01-24
related: [report-weekly-problem.md]
---
```

**Template Library Categories:**
1. **Reports** - Status reports, reviews, summaries
2. **Emails** - Follow-ups, announcements, requests
3. **Documents** - Formal documentation, proposals, specs
4. **Analysis** - Research synthesis, competitive analysis

### Task 6.2: This Workflow's Place

- **Category:** 01-reports
- **File name convention:** `report-weekly-status.md` and `report-weekly-problem.md`
- **Tags/keywords:** status, weekly, stakeholder, leadership, progress
- **Related workflows:** monthly-review.md (quarterly variant would extend this)

---

## Reflection Questions - Sample Responses

**1. What was the most challenging part of designing your workflow?**

Getting the template right. The first version produced output that was too formal and required too much editing. It took three iterations to get AI to match my voice. Key learning: include example phrases or style notes in the template.

**2. How accurate was your initial time savings estimate after testing?**

Close but optimistic. Estimated 16 minutes, actual first attempt was 22 minutes. After refining the template, settled at 15-18 minutes consistently. The estimate was directionally correct but the first few uses were slower as I learned the process.

**3. What would you do differently when building your next workflow?**

Start by collecting 2-3 examples of my actual output first. Having real examples to compare AI output against would make template refinement faster. Also, would test with edge cases earlier (like a "bad week" scenario).

**4. How will you ensure you actually use this workflow consistently?**

Set a recurring calendar reminder every Friday at 10am titled "Status Report - use template" with a link to the template. The first few weeks I'll consciously choose to use the workflow until it becomes habit.

**5. What other tasks are you now thinking about automating?**

Meeting follow-up emails are next - high frequency and similar structure to status reports. Also thinking about interview feedback documentation, though that's less frequent so the ROI is lower. The template library structure makes it easy to add new workflows.

---

*Solutions for Module 6 | AI Tools for Productivity*
