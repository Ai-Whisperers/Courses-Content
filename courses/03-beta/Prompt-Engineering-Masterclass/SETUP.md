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
cd Courses-Content/courses/03-beta/Prompt-Engineering-Masterclass

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

## Next Steps

1. Open `modules/01-how-llms-work/README.md`
2. Read the lesson content
3. Complete the module exercises
4. Save effective prompts to your library

---

*See also: [Shared Setup Prompts](../../../_shared/setup/SETUP-PROMPTS.md)*
