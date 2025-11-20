# AI Whisperers - Courses Content Repository

## Overview

This repository contains the complete framework and materials for creating AI training courses for different professional roles. It demonstrates how to use AI tools to accelerate learning and skill development.

---

## Repository Structure

```
Courses-Content/
├── README.md                           # This file
├── QA-Automation-with-AI/              # Complete QA course
│   ├── README.md                       # Course overview
│   ├── SYLLABUS.md                     # Course syllabus
│   ├── COURSE-QA-TO-AUTOMATION-WITH-AI.md  # Full curriculum
│   ├── modules/                        # Module content
│   │   ├── 01-introduction/
│   │   ├── 02-context-engineering/
│   │   ├── 03-private-repos/
│   │   └── ...
│   ├── exercises/                      # Hands-on labs
│   ├── assessments/                    # Quizzes
│   ├── templates/                      # Reusable templates
│   ├── examples/                       # Code examples
│   ├── prompts/                        # Prompt library
│   └── resources/                      # Additional materials
└── nul                                 # (can be deleted)
```

---

## Quick Start

### For Students

1. Go to `QA-Automation-with-AI/`
2. Read `README.md` for course overview
3. Start with `modules/01-introduction/`
4. Complete exercises in `exercises/`
5. Take quizzes in `assessments/`

### For Instructors

1. Review the complete curriculum in `COURSE-QA-TO-AUTOMATION-WITH-AI.md`
2. Use `COURSE-CREATION-FRAMEWORK.md` to create new courses
3. Adapt modules and exercises as needed

---

## Available Courses

### QA to QA Automation with AI

**Location**: `QA-Automation-with-AI/`

A complete 10-module course transforming Manual QA Engineers into AI-Augmented Automation Engineers.

**Contents**:
- 10 detailed modules
- Hands-on exercises
- Code examples (Jest, Playwright)
- Prompt library
- Assessment quizzes
- Cheat sheet
- Templates

---

## Quick Start

### For Course Instructors

1. Read [AI-CAPABILITIES-ANALYSIS.md](AI-CAPABILITIES-ANALYSIS.md) to understand available AI tools
2. Review [COURSE-QA-TO-AUTOMATION-WITH-AI.md](COURSE-QA-TO-AUTOMATION-WITH-AI.md) as a complete course example
3. Use [COURSE-CREATION-FRAMEWORK.md](COURSE-CREATION-FRAMEWORK.md) to create new courses

### For Course Students

1. Start with Module 1 of your course
2. Follow along with [EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md](EXAMPLE-WORKFLOW-PRIVATE-REPO-ACCESS.md)
3. Complete hands-on exercises
4. Submit final project

---

## What's Included

### AI Capabilities Analysis

- **36 repositories analyzed** across the Ai-Whisperers organization
- Technologies: Claude, GPT-4, Whisper, Transformers, ONNX, Polars, ChromaDB
- **20 agentic design patterns** documented and explained
- Production deployment patterns and cost optimization strategies

### Complete QA Automation Course

**10 modules covering:**

1. Introduction to AI-Assisted Development
2. Providing Effective Context to AI
3. Accessing Private Repositories with AI
4. Generating Complete Code Documentation
5. Creating Test Plans with AI
6. Implementing Tests with AI
7. Test Validation and Quality Assurance
8. Applying Agentic Patterns to Testing
9. CI/CD Integration
10. Final Project

**Key topics:**
- Claude Code setup and configuration
- Context engineering and CLAUDE.md creation
- GitHub CLI authentication for private repos
- Documentation generation workflows
- Test plan creation with prioritization
- Unit, integration, and E2E test implementation
- Test quality validation and coverage analysis
- Agentic patterns: Chaining, Reflection, RAG, Parallelization
- GitHub Actions CI/CD setup

### Example Workflow

Complete 8-phase workflow demonstrating:
- Environment setup and authentication
- Repository cloning and exploration
- AI-assisted codebase analysis
- Documentation generation
- Test plan creation
- Test implementation
- Validation and refinement
- Pull request creation

### Course Creation Framework

Templates and guidance for creating courses for:
- Developers → AI-Augmented Developers
- DevOps → AI-Powered DevOps
- Data Analysts → AI-Powered Analysts
- Technical Writers → AI-Augmented Writers
- Security Engineers → AI-Augmented Security

---

## Key Concepts Covered

### AI Tool Usage
- LLM capabilities and limitations
- Token windows and context management
- Effective prompting strategies
- Iterative refinement

### Context Engineering
- Project-level context (CLAUDE.md)
- Session-level context
- Prompt-level context
- Information structuring

### The 20 Agentic Patterns
- **Core**: Chaining, Routing, Parallelization, Reflection, Tool Use
- **Control**: Planning, Memory, Learning, Goal Monitoring
- **Reliability**: Exception Handling, Human-in-the-Loop, RAG, Communication
- **Reasoning**: Techniques, Evaluation, Guardrails, Prioritization, Discovery

### Quality Assurance
- Reviewing AI outputs
- Validation checklists
- Mutation testing
- Coverage analysis

---

## Prerequisites

### Technical Requirements
- Windows/Mac/Linux computer
- Git installed
- Python 3.8+ or Node.js 18+
- GitHub account

### Software to Install
- Claude Code: `winget install Anthropic.ClaudeCode`
- GitHub CLI: `winget install GitHub.cli`

### Knowledge Requirements
- Basic programming concepts
- Familiarity with command line
- Understanding of your domain (QA, Dev, etc.)

---

## Getting Started

### 1. Set Up Your Environment

```bash
# Install GitHub CLI
winget install GitHub.cli

# Authenticate with GitHub
gh auth login

# Install Claude Code
winget install Anthropic.ClaudeCode

# Verify installations
gh --version
claude --version
```

### 2. Clone This Repository

```bash
gh repo clone Ai-Whisperers/Courses-Content
cd Courses-Content
```

### 3. Start Learning

1. Open [COURSE-QA-TO-AUTOMATION-WITH-AI.md](COURSE-QA-TO-AUTOMATION-WITH-AI.md)
2. Follow Module 1 to set up your environment
3. Complete each module's hands-on exercises
4. Build your final project

---

## Course Outcomes

By completing the QA Automation course, you will be able to:

- Set up and configure AI coding assistants
- Provide effective context for accurate AI responses
- Access and document private codebases
- Generate comprehensive test plans
- Implement automated tests using AI
- Review and improve AI-generated code
- Apply agentic design patterns
- Integrate AI tools into CI/CD pipelines

---

## Contributing

### Adding New Courses

1. Fork this repository
2. Follow [COURSE-CREATION-FRAMEWORK.md](COURSE-CREATION-FRAMEWORK.md)
3. Create course materials in a new directory
4. Submit a pull request

### Improving Existing Content

1. Identify issues or gaps
2. Propose improvements via issues
3. Submit pull requests with fixes
4. Include before/after examples

---

## Related Resources

### Ai-Whisperers Repositories

- [agentic-schemas](https://github.com/Ai-Whisperers/agentic-schemas) - 20 design patterns
- [claude-portable-improving-system](https://github.com/Ai-Whisperers/claude-portable-improving-system) - Claude optimization
- [chatbot-rag-rbac](https://github.com/Ai-Whisperers/chatbot-rag-rbac) - RAG implementation
- [analysis-engine](https://github.com/Ai-Whisperers/analysis-engine) - Production AI system

### External Documentation

- [Claude Code Docs](https://docs.claude.com)
- [GitHub CLI Docs](https://cli.github.com/manual)
- [Jest Documentation](https://jestjs.io)
- [Playwright Documentation](https://playwright.dev)

---

## License

MIT License - see LICENSE file

---

## Contact

- GitHub Issues: For questions and feedback
- AI Whisperers: For training and consulting

---

*Created by AI Whisperers - Empowering professionals with AI skills*

---

## Summary Statistics

- **Documents**: 5
- **Total Content**: ~15,000 words
- **Course Modules**: 10
- **Test Cases Examples**: 50+
- **Code Examples**: 100+
- **Patterns Covered**: 20
- **Roles Addressed**: 6

This comprehensive package provides everything needed to train QA professionals to become AI-augmented automation engineers, with a framework for extending to other roles.
