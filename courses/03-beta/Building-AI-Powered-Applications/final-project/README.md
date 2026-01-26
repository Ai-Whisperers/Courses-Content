# Final Project: Build a Production AI Application

**Duration:** 15-20 hours
**Weight:** 35% of final grade
**Passing Score:** 60% minimum

---

## Overview

Design, develop, and deploy a complete AI-powered application that demonstrates all skills learned throughout this course. This is your portfolio piece - a real application you can showcase to employers.

---

## Project Options

Choose one of these application types:

### Option 1: Document QA System
Build a RAG-based system that answers questions about uploaded documents.

**Core Features:**
- Document upload and processing
- Vector database storage
- Question answering with source citations
- Conversation history

**Example Use Cases:** Internal knowledge base, research assistant, legal document search

---

### Option 2: AI Research Assistant
Build a multi-agent system that researches topics and synthesizes information.

**Core Features:**
- Web search integration
- Multi-step research workflow
- Source aggregation and summarization
- Report generation

**Example Use Cases:** Market research, competitive analysis, literature review

---

### Option 3: Customer Support Bot
Build a context-aware chatbot for customer service.

**Core Features:**
- FAQ handling with RAG
- Ticket creation/escalation
- Conversation context management
- Sentiment detection

**Example Use Cases:** E-commerce support, SaaS help desk, appointment booking

---

### Option 4: Content Generation Platform
Build an automated content creation system.

**Core Features:**
- Multi-format content generation
- Style/tone customization
- Content editing and refinement
- Publishing workflow

**Example Use Cases:** Blog post generator, social media manager, email campaign creator

---

### Option 5: Custom Application
Propose your own idea (requires pre-approval).

**Requirements:**
- Must use AI integration + LangChain
- Must include RAG or agents
- Must be deployable
- Submit 1-paragraph proposal before starting

---

## Requirements

### Minimum Technical Requirements

| Requirement | Description |
|-------------|-------------|
| AI Integration | OpenAI, Anthropic, or similar API |
| LangChain | Chains, memory, or agents |
| Vector Database | Chroma, Pinecone, or similar |
| Custom Tools | At least 2 tool integrations |
| Authentication | API keys or user auth |
| Caching | Response caching implementation |
| Testing | >70% code coverage |
| Deployment | Live URL accessible |

### Code Quality Requirements

- Clean, readable code with comments
- Error handling for all external calls
- Input validation
- Environment variable configuration
- No hardcoded secrets

---

## Deliverables

### 1. Code Repository

```
your-project/
├── README.md              # Setup instructions
├── requirements.txt       # Python dependencies
├── .env.example          # Environment template
├── app/
│   ├── main.py           # FastAPI application
│   ├── services/         # AI services
│   ├── api/              # API routes
│   └── ...
├── tests/
│   ├── unit/
│   └── integration/
└── docs/
    ├── architecture.md
    └── api.md
```

### 2. Documentation

- **Architecture Diagram:** Visual overview of your system
- **API Documentation:** Endpoint descriptions (auto-generated is fine)
- **Setup Guide:** How to run locally
- **Deployment Guide:** How you deployed it

### 3. Live Demo

- **Deployed URL:** Working application
- **Demo Video:** 5-minute walkthrough (unlisted YouTube or Loom)
- **Test Credentials:** If login required

### 4. Written Report (2-3 pages)

- Project overview and goals
- Technical decisions and rationale
- Challenges faced and solutions
- Performance metrics (latency, cost per request)
- Future improvements

---

## Timeline Suggestion

| Week | Focus | Deliverable |
|------|-------|-------------|
| 1 | Planning | Architecture diagram, project setup |
| 2 | Core AI | LangChain integration, basic functionality |
| 3 | Features | RAG/agents, custom tools |
| 4 | Production | Auth, caching, error handling |
| 5 | Testing | Test suite, documentation |
| 6 | Deploy | Deployment, demo video, report |

**Tip:** Start during Module 4, work in parallel with Modules 5-6.

---

## Grading Overview

| Category | Points | Key Criteria |
|----------|--------|--------------|
| Technical Implementation | 50 | AI quality, architecture, code quality, security |
| Functionality | 20 | Features working, UX, performance |
| Testing & Quality | 15 | Coverage, documentation |
| Deployment | 10 | Live and production-ready |
| Presentation | 5 | Demo video, written report |
| **Total** | **100** | |

See [RUBRIC.md](./RUBRIC.md) for detailed grading criteria.

---

## Submission

### What to Submit

1. **GitHub Repository URL** - Public or with access granted
2. **Deployed Application URL** - Live and working
3. **Demo Video URL** - Unlisted YouTube or Loom link
4. **Written Report** - PDF in repository or separate upload

### Submission Checklist

- [ ] Code runs locally with documented setup
- [ ] All tests pass
- [ ] Application is deployed and accessible
- [ ] Demo video shows all main features
- [ ] Report covers required sections
- [ ] No secrets in code (use .env.example)

---

## Getting Started

1. **Choose your project type** from options above
2. **Review the rubric** to understand grading criteria
3. **Check the starter template** for project structure
4. **Start with Module 1-4 code** as your foundation
5. **Build incrementally** - get basics working first

### Quick Start Commands

```bash
# Create project
mkdir my-ai-project && cd my-ai-project

# Initialize
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install fastapi uvicorn langchain openai chromadb pytest

# Create structure
mkdir -p app/services app/api tests/unit tests/integration docs

# Start coding!
```

---

## Common Mistakes to Avoid

1. **Starting too late** - Begin during Module 4, not after Module 6
2. **Over-scoping** - Build MVP first, add features if time permits
3. **Skipping tests** - Write tests as you go, not at the end
4. **Ignoring costs** - Monitor API usage, implement caching early
5. **No error handling** - Production apps need graceful failure
6. **Hardcoded secrets** - Use environment variables from day 1

---

## Resources

- [Starter Template](./STARTER-TEMPLATE.md) - Project boilerplate
- [Rubric](./RUBRIC.md) - Detailed grading criteria
- Course modules 1-6 for reference code
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [LangChain Documentation](https://python.langchain.com/)

---

## Questions?

- Review module exercises for implementation patterns
- Check the rubric for grading expectations
- Start simple, iterate to complex

**Good luck building your AI application!**
