# AI Setup Prompts

Copy-paste these prompts into Claude Code or any AI assistant to automatically set up your learning environment.

---

## Quick Setup (All Courses)

### Verify Prerequisites

```
Check my development environment and tell me what's missing:

Required tools:
- Git (any version)
- Node.js (v18+)
- Python (3.9+) - only for Building AI Apps course
- VS Code or similar editor

Run these commands and report results:
- git --version
- node --version
- npm --version
- python --version (if applicable)

For any missing tools, give me the install command for my OS.
```

### Clone Course Repository

```
Help me clone and set up the AI Whisperers courses:

1. Clone the repository:
   git clone https://github.com/Ai-Whisperers/Courses-Content.git

2. Navigate to the repo:
   cd Courses-Content

3. List available courses and their status

4. Tell me which course to start with based on my goal: [YOUR GOAL HERE]
```

---

## Course-Specific Setup

### QA Automation with AI

```
Set up my environment for the QA Automation with AI course:

1. Verify I have:
   - Node.js 18+
   - Git
   - VS Code

2. Install Playwright globally:
   npm install -g playwright
   npx playwright install

3. Create a practice project folder:
   mkdir qa-automation-practice
   cd qa-automation-practice
   npm init -y

4. Install testing dependencies:
   npm install -D @playwright/test typescript @types/node

5. Initialize Playwright config:
   npx playwright init

6. Create a sample test file to verify setup works

7. Run the test to confirm everything is working
```

### Prompt Engineering Masterclass

```
Set up my environment for the Prompt Engineering Masterclass:

1. Verify I have accounts for:
   - Claude.ai (Anthropic)
   - ChatGPT (OpenAI)

2. Create a prompt library folder structure:
   mkdir -p prompt-library/{templates,experiments,results}

3. Create a tracking spreadsheet or markdown file for:
   - Prompt versions
   - A/B test results
   - Effective patterns

4. Set up a note-taking system (Obsidian, Notion, or markdown files)

5. Create a CLAUDE.md template I can use for projects
```

### Building AI-Powered Applications

```
Set up my environment for Building AI-Powered Applications:

1. Verify Python 3.9+ is installed:
   python --version

2. Create project folder and virtual environment:
   mkdir ai-apps-course
   cd ai-apps-course
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate

3. Install core dependencies:
   pip install openai langchain python-dotenv fastapi uvicorn pytest

4. Create .env file for API keys:
   touch .env
   echo "OPENAI_API_KEY=your-key-here" >> .env

5. Create basic project structure:
   mkdir -p src tests docs

6. Create a test script to verify OpenAI connection works

7. Run the test to confirm API access
```

### AI Tools for Productivity

```
Set up my environment for AI Tools for Productivity:

1. Verify I have accounts for:
   - Claude.ai (free tier OK)
   - ChatGPT (free tier OK)
   - Google Workspace or Microsoft 365

2. Create a workflow templates folder:
   mkdir -p ai-workflows/{documents,meetings,research,automation}

3. Set up a prompt library for business tasks:
   - Email templates
   - Meeting summaries
   - Report generation
   - Data analysis

4. Create tracking for time saved and productivity gains

5. Install browser extensions (optional):
   - ChatGPT sidebar
   - Claude extension
```

### FPUNA 2026 (Spanish)

```
Configura mi entorno para el curso FPUNA 2026:

1. Verificar que tengo instalado:
   - Git
   - Node.js 18+
   - VS Code

2. Clonar el repositorio:
   git clone https://github.com/Ai-Whisperers/Courses-Content.git
   cd Courses-Content/cursos/02-development/FPUNA-2026

3. Ir al módulo de fundamentos:
   cd 00-FUNDAMENTOS-PRINCIPALES

4. Leer el starter-kit:
   cat starter-kit/README.md

5. Verificar que entiendo el Marco CERO para prompts

6. Completar el primer ejercicio en starter-kit/exercises/
```

---

## Project Templates

### Create a New Learning Project

```
Create a learning project for [COURSE NAME] with this structure:

project-name/
├── README.md           # Project description and goals
├── CLAUDE.md           # AI assistant instructions
├── .gitignore          # Ignore node_modules, .env, etc.
├── notes/              # My learning notes
├── exercises/          # Completed exercises
├── projects/           # Hands-on projects
└── resources/          # Bookmarks, references

Include in README.md:
- Course name and my goals
- Progress tracking
- Key takeaways

Include in CLAUDE.md:
- Context about my skill level
- What I'm learning
- How I want explanations formatted
```

### Create CLAUDE.md for a Project

```
Create a CLAUDE.md file for my project with:

Project: [NAME]
Purpose: [WHAT I'M BUILDING]
My skill level: [BEGINNER/INTERMEDIATE/ADVANCED]
Language: [PYTHON/JAVASCRIPT/etc.]

Include sections for:
1. Project context and goals
2. Technical stack being used
3. Coding conventions I want to follow
4. How to format explanations (step-by-step, concise, etc.)
5. What NOT to do (don't skip error handling, etc.)
```

---

## Troubleshooting

### Fix Common Setup Issues

```
I'm having trouble with my setup. Help me diagnose:

Issue: [DESCRIBE YOUR PROBLEM]

Please:
1. Ask me clarifying questions about my OS and environment
2. Check for common causes of this issue
3. Give me step-by-step commands to fix it
4. Verify the fix worked
```

### Verify Everything Works

```
Run a complete verification of my course setup:

Course: [COURSE NAME]

Check:
1. All required tools are installed and working
2. I can access required accounts (AI services, GitHub)
3. Test projects run successfully
4. I understand where to start in the course materials

Report any issues and how to fix them.
```

---

## Tips for Using These Prompts

1. **Be specific** - Replace [PLACEHOLDERS] with your actual information
2. **Run commands** - Let the AI execute commands, don't just read them
3. **Verify each step** - Confirm each step works before moving on
4. **Save your setup** - Document what you did for future reference
5. **Ask follow-ups** - If something fails, paste the error and ask for help

---

*AI Whisperers - Setup Prompts v1.0*

