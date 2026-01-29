# Setup - Prompt Engineering Masterclass

Get your environment ready for the course.

---

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Claude.ai account | [claude.ai](https://claude.ai) - Free tier works |
| ChatGPT account | [chat.openai.com](https://chat.openai.com) - Free tier works |
| Note-taking tool | Obsidian, Notion, or markdown files |
| Text editor | VS Code recommended |

---

## Quick Setup (10 minutes)

### 1. Create AI Accounts

**Claude (Anthropic):**
1. Go to [claude.ai](https://claude.ai)
2. Sign up with email or Google
3. Verify your account

**ChatGPT (OpenAI):**
1. Go to [chat.openai.com](https://chat.openai.com)
2. Sign up with email or Google
3. Verify your account

### 2. Set Up Prompt Library

Create a folder structure for organizing your prompts:

```bash
mkdir -p prompt-library/{templates,experiments,results,course-exercises}
```

### 3. Create Tracking System

Create a file to track your prompt experiments:

```markdown
# Prompt Experiments Log

## Template
| Date | Prompt Version | Model | Result | Notes |
|------|---------------|-------|--------|-------|
| YYYY-MM-DD | v1 | Claude | Good/Bad | What worked |
```

---

## AI-Assisted Setup

Copy this prompt into Claude to set up automatically:

```
Help me set up for the Prompt Engineering Masterclass:

1. Create a prompt library folder structure:
   - templates/ (reusable prompt patterns)
   - experiments/ (A/B tests and iterations)
   - results/ (outputs worth saving)
   - course-exercises/ (completed exercises)

2. Create a prompt tracking template (markdown table)

3. Create a CLAUDE.md template for my projects

4. Explain the STAR framework for prompts:
   - Situation
   - Task
   - Action
   - Result

5. Give me a checklist for evaluating prompt quality
```

---

## Recommended Tools

### For Note-Taking

| Tool | Cost | Best For |
|------|------|----------|
| **Obsidian** | Free | Markdown, local storage |
| **Notion** | Free tier | Web-based, templates |
| **VS Code** | Free | Developers, markdown |

### Browser Extensions (Optional)

- **Claude sidebar** - Quick access in browser
- **ChatGPT for Google** - AI in search results

---

## Course Materials Setup

### Access Course Content

```bash
# Clone repository (if not already done)
git clone https://github.com/Ai-Whisperers/Courses-Content.git

# Navigate to course
cd Courses-Content/cursos/03-beta/Prompt-Engineering-Masterclass

# Open in VS Code
code .
```

### Review Course Structure

```
Prompt-Engineering-Masterclass/
├── modules/
│   ├── 01-how-llms-work/
│   ├── 02-prompt-structure/
│   ├── 03-advanced-patterns/
│   ├── 04-system-prompts/
│   ├── 05-debugging-iteration/
│   └── 06-prompt-libraries/
├── prompts/              # Ready-to-use prompt templates
├── resources/            # Reference materials
└── templates/            # Project templates
```

---

## Verify Setup

Run through this checklist:

- [ ] Can access Claude.ai
- [ ] Can access ChatGPT
- [ ] Created prompt library folder
- [ ] Have note-taking system ready
- [ ] Cloned course repository
- [ ] Opened Module 1 README

---

## Your First Win (3 minutes)

Before moving on, let's prove the power of structured prompts:

### The Magic of Specificity

**Bad prompt (try this first):**
```
Write me an email.
```

**Good prompt (try this second):**
```
Write a professional email to my manager requesting time off.

Context: I need 3 days off next month (March 15-17) for a family wedding.
Tone: Professional but warm
Key points: 
- I've already arranged coverage with my colleague Sarah
- All my deliverables will be completed before I leave
- I'll be reachable by phone for emergencies

Length: Under 100 words
```

### Try It Now

1. Open Claude.ai or ChatGPT
2. Paste the bad prompt → Notice the generic, useless output
3. Paste the good prompt → Notice the specific, usable output

**That's the difference structured prompting makes.**

### What You Just Learned

The second prompt works because it includes:
- **Context** (what's the situation?)
- **Tone** (how should it sound?)
- **Key points** (what must be included?)
- **Constraints** (length, format)

This is the STAR framework you'll master in this course.

**Save both prompts and outputs to your prompt library. Your journey begins now.**

---

## Next Steps

1. **Read** [HOW-TO-LEARN.md](./HOW-TO-LEARN.md) - Learning strategies for this course
2. **Open** `modules/01-how-llms-work/README.md` - Start Module 1
3. **Start** your prompt library with today's experiment

---

*See also: [Shared Setup Prompts](../../../_compartido/04-utilidades-ia/configuracion-inicial/SETUP-PROMPTS.md)*

