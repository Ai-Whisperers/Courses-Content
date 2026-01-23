# Module 4 Exercise: System Prompts & Personas Lab

## Exercise Overview

**Objective**: Design, test, and refine system prompts and AI personas for various professional use cases, then build a reusable template library.

**Duration**: 2.5 hours

**Tools Required**:
- AI tool (Claude and ChatGPT recommended)
- Note-taking or document application
- Template storage system (folder, Notion, etc.)

---

## Part 1: System Prompt Fundamentals (30 minutes)

### Task 1.1: Analyze Existing System Prompts

Evaluate these system prompts and identify what's effective and what's missing.

**System Prompt A:**
```
You are a helpful assistant.
```

**Analysis:**
| Component | Present? | Quality (1-5) | Notes |
|-----------|----------|---------------|-------|
| Identity | | | |
| Capabilities | | | |
| Constraints | | | |
| Style | | | |
| Context | | | |

**What would you add to improve it?**

---

**System Prompt B:**
```
You are a marketing expert who helps create compelling content.
Focus on benefits over features. Be enthusiastic but not over the top.
Never use clichés like "game-changer" or "revolutionary."
Format responses with clear headers when appropriate.
```

**Analysis:**
| Component | Present? | Quality (1-5) | Notes |
|-----------|----------|---------------|-------|
| Identity | | | |
| Capabilities | | | |
| Constraints | | | |
| Style | | | |
| Context | | | |

**What would you add or change?**

---

### Task 1.2: Component Construction

Build each component for a "Business Strategy Consultant" persona.

**Identity Block (2-3 sentences):**
```
[Your identity statement]
```

**Capabilities Block (4-5 bullet points):**
```
[Your capabilities list]
```

**Constraints Block (3-4 limitations):**
```
[Your constraints]
```

**Style Block (communication preferences):**
```
[Your style guidelines]
```

**Assembled Complete System Prompt:**
```
[Combine all blocks into cohesive prompt]
```

---

## Part 2: Persona Design (40 minutes)

### Task 2.1: Design Three Professional Personas

Create complete personas for these roles. Use the framework from the module.

**Persona 1: Technical Support Specialist**

| Element | Your Design |
|---------|-------------|
| Name | |
| Role | |
| Experience | |
| Specialty | |
| Personality (2-3 traits) | |
| Voice/Style | |
| Key Constraints | |

**Complete System Prompt:**
```
[Write full prompt - 150-250 words]
```

---

**Persona 2: Creative Writing Coach**

| Element | Your Design |
|---------|-------------|
| Name | |
| Role | |
| Experience | |
| Specialty | |
| Personality (2-3 traits) | |
| Voice/Style | |
| Key Constraints | |

**Complete System Prompt:**
```
[Write full prompt - 150-250 words]
```

---

**Persona 3: Data Analysis Expert**

| Element | Your Design |
|---------|-------------|
| Name | |
| Role | |
| Experience | |
| Specialty | |
| Personality (2-3 traits) | |
| Voice/Style | |
| Key Constraints | |

**Complete System Prompt:**
```
[Write full prompt - 150-250 words]
```

---

### Task 2.2: Persona Testing

Test each persona with the same question to see different responses.

**Test Question:** "I'm struggling to get buy-in from my team on a new initiative. How should I approach this?"

**Technical Support Specialist Response:**
```
[Paste response]
```
- Did they stay in character? Y / N
- Response appropriate for persona? Y / N
- Notes:

**Creative Writing Coach Response:**
```
[Paste response]
```
- Did they stay in character? Y / N
- Response appropriate for persona? Y / N
- Notes:

**Data Analysis Expert Response:**
```
[Paste response]
```
- Did they stay in character? Y / N
- Response appropriate for persona? Y / N
- Notes:

**Comparison Analysis:**
- Which response was most useful for the actual question?
- How did each persona's expertise shape their advice?
- What does this tell you about persona selection?

---

## Part 3: Context Persistence (25 minutes)

### Task 3.1: Long Conversation Simulation

Design a system prompt that maintains context over a multi-turn conversation.

**Scenario:** You're creating an AI project manager assistant that needs to track project details across a conversation.

**Your System Prompt with Persistence Elements:**
```
[Include identity + context tracking mechanisms]
```

**Test Conversation:**

Turn 1 (You): "We're starting a mobile app project. Budget is $150K, timeline is 6 months, team is 4 developers."

Turn 2 (AI Response):
```
[Paste response - does it acknowledge and store context?]
```

Turn 3 (You): "What should we focus on first?"

Turn 4 (AI Response):
```
[Paste response - does it reference the established context?]
```

Turn 5 (You): "Our client wants to add AR features. Is that feasible?"

Turn 6 (AI Response):
```
[Paste response - does it consider budget/timeline/team constraints?]
```

**Context Retention Assessment:**
| Turn | Referenced Previous Context? | Details Accurate? |
|------|------------------------------|-------------------|
| Turn 2 | | |
| Turn 4 | | |
| Turn 6 | | |

**What techniques helped maintain context?**

---

### Task 3.2: Context Recovery

Test how to recover context when the AI seems to forget.

**Recovery Prompt 1: Summary Request**
```
"Before we continue, can you summarize what we've established about this project?"
```

**AI Response:**
```
[Paste response]
```
- Did it recover context accurately? Y / N

**Recovery Prompt 2: Explicit Reminder**
```
"Remember, we established: [state key facts]. Now, given that context..."
```

**AI Response:**
```
[Paste response]
```
- Did it incorporate the reminder? Y / N

**Which recovery technique worked better?**

---

## Part 4: Platform Comparison (25 minutes)

### Task 4.1: Claude vs ChatGPT Comparison

Test the same system prompt on both platforms (if you have access to both).

**Test System Prompt:**
```
You are a thoughtful career advisor with 15 years of experience helping
professionals navigate career transitions. You specialize in tech careers.

Approach:
- Ask clarifying questions before giving advice
- Consider both short-term and long-term implications
- Be honest about trade-offs
- Avoid generic advice - be specific

Style:
- Warm but direct
- Use examples from your experience
- Structure advice clearly

Constraints:
- Don't recommend specific companies to apply to
- Acknowledge when someone might need specialized help (legal, financial)
```

**Test Question:** "I'm a software engineer with 5 years of experience thinking about moving into product management. Should I?"

**Claude Response:**
```
[Paste response]
```

**ChatGPT Response:**
```
[Paste response]
```

**Comparison Analysis:**
| Aspect | Claude | ChatGPT |
|--------|--------|---------|
| Followed persona? | /5 | /5 |
| Asked clarifying questions? | Y/N | Y/N |
| Response structure | | |
| Tone match | | |
| Constraint adherence | | |

**Key Differences Observed:**

---

### Task 4.2: Platform-Optimized Prompts

Modify the system prompt to optimize for each platform.

**Claude-Optimized Version:**
```
[Your Claude-specific modifications]
```
**What did you change for Claude and why?**

**ChatGPT-Optimized Version:**
```
[Your ChatGPT-specific modifications]
```
**What did you change for ChatGPT and why?**

---

## Part 5: Custom AI Assistant Design (35 minutes)

### Task 5.1: Design Your Custom Assistant

Create a complete system prompt for an AI assistant tailored to your actual work needs.

**Use Case Definition:**
- What type of work do you need help with?
- What tasks should this assistant handle?
- What expertise should it have?
- What should it avoid?

**Your Custom Assistant System Prompt:**
```
# [Assistant Name]

## Identity
[Who is this assistant?]

## Core Expertise
[What does it specialize in?]

## Primary Tasks
[What will it help with?]

## Approach
[How does it engage?]

## Constraints
[What are the boundaries?]

## Style
[How does it communicate?]

## Special Instructions
[Any unique requirements?]
```

**Word Count:** ___ (target: 200-300 words)

---

### Task 5.2: Real-World Testing

Test your custom assistant with 3 real tasks from your work.

**Task 1: [Describe task]**

**Your Prompt:**
```
[Your request]
```

**Assistant Response:**
```
[Paste response]
```

**Quality Assessment:**
- Relevant to your need? /5
- Matched expected style? /5
- Would you use this output? Y / N
- Improvements needed:

---

**Task 2: [Describe task]**

**Your Prompt:**
```
[Your request]
```

**Assistant Response:**
```
[Paste response]
```

**Quality Assessment:**
- Relevant to your need? /5
- Matched expected style? /5
- Would you use this output? Y / N
- Improvements needed:

---

**Task 3: [Describe task]**

**Your Prompt:**
```
[Your request]
```

**Assistant Response:**
```
[Paste response]
```

**Quality Assessment:**
- Relevant to your need? /5
- Matched expected style? /5
- Would you use this output? Y / N
- Improvements needed:

---

### Task 5.3: Iteration and Refinement

Based on testing, improve your system prompt.

**Issues Identified:**
1.
2.
3.

**Revised System Prompt:**
```
[Your improved prompt]
```

**What did you change and why?**

---

## Part 6: Template Library Creation (20 minutes)

### Task 6.1: Create Persona Templates

Create reusable templates for 3 personas you might use regularly.

**Template 1: [Category]**
```markdown
# Persona: [Name]

## Quick Start (1-2 sentences)
[Copy-paste version]

## Full System Prompt
[Complete prompt]

## Best Used For
- [Use case 1]
- [Use case 2]

## Not Suited For
- [Anti-use case 1]
- [Anti-use case 2]
```

**Template 2: [Category]**
```markdown
# Persona: [Name]

## Quick Start (1-2 sentences)
[Copy-paste version]

## Full System Prompt
[Complete prompt]

## Best Used For
- [Use case 1]
- [Use case 2]

## Not Suited For
- [Anti-use case 1]
- [Anti-use case 2]
```

**Template 3: [Category]**
```markdown
# Persona: [Name]

## Quick Start (1-2 sentences)
[Copy-paste version]

## Full System Prompt
[Complete prompt]

## Best Used For
- [Use case 1]
- [Use case 2]

## Not Suited For
- [Anti-use case 1]
- [Anti-use case 2]
```

---

### Task 6.2: Library Organization Plan

Design how you'll organize your growing prompt library.

**Proposed Structure:**
```
/prompts
  /[category 1]
    - [template name].md
    - [template name].md
  /[category 2]
    - [template name].md
  /[category 3]
    - [template name].md
```

**Naming Convention:**
[How will you name templates?]

**Version Control Plan:**
[How will you track changes?]

---

## Exercise Deliverables

Submit the following:

1. **System Prompt Analysis** (Part 1)
2. **Three Professional Personas** with test results (Part 2)
3. **Context Persistence Test Results** (Part 3)
4. **Platform Comparison Analysis** (Part 4)
5. **Custom AI Assistant** with iteration notes (Part 5)
6. **Template Library** with 3 templates (Part 6)

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| System Prompt Analysis | 15 | Thorough evaluation with improvements |
| Persona Design | 25 | Three complete, differentiated personas |
| Context Persistence | 15 | Effective strategies demonstrated |
| Platform Comparison | 15 | Clear analysis of differences |
| Custom Assistant | 20 | Functional, tested, iterated |
| Template Library | 10 | Organized, reusable templates |
| **Total** | **100** | |

---

## Reflection Questions

1. What makes a persona feel "real" and consistent?

2. How do system prompts change your interaction with AI?

3. What surprised you about Claude vs ChatGPT differences?

4. How will you decide when to use a custom persona vs default AI?

---

*Exercise 4 of 6 | Prompt Engineering Masterclass | Duration: 2.5 hours*
