# How to Learn This Course

Read this BEFORE starting Module 1. It takes 10 minutes and will save you hours.

---

## The #1 Mistake Students Make

**Copying code without understanding it.**

AI applications fail in subtle ways. If you don't understand WHY code works, you won't know how to fix it when it breaks in production.

---

## How This Course Works

```
Read Concept (20 min) → Type Code Yourself (30 min) → Break It On Purpose → Fix It → Move On
                              ↓
                         NEVER copy-paste code examples
```

**The debugging is the learning.** When your code breaks (and it will), that's when real understanding happens.

---

## Time Commitment

| Path | Time Per Week | Total Duration | Best For |
|------|---------------|----------------|----------|
| **Intensive** | 15-20 hours | 4-6 weeks | Career changers |
| **Standard** | 8-10 hours | 8-10 weeks | Working developers |
| **Part-time** | 5-6 hours | 12-14 weeks | Side learning |

**Minimum session**: 90 minutes. AI development requires getting into flow state.

---

## How to Study Each Module

### Step 1: Pre-read (10 minutes)
- Skim the README headings
- Look at what you'll build
- Check prerequisites from previous modules

### Step 2: Concept Understanding (20-30 minutes)
- Read the full lesson
- **Type every code example yourself** (NO copy-paste)
- Run each example before moving on

### Step 3: Hands-On Exercises (60-90 minutes)
- Build without looking at solutions
- When stuck, debug for at least 15 minutes
- Use print statements and logs liberally

### Step 4: Break & Fix (20 minutes)
- Intentionally break your working code
- Try edge cases, bad inputs, network failures
- Fix each issue and understand why it failed

### Step 5: Document (10 minutes)
- Write comments explaining WHY, not what
- Note patterns you'll reuse
- Add to your code snippets library

---

## The Debugging Protocol

When your code doesn't work:

```
Code not working?
       │
       ▼
Read the FULL error message (not just the last line)
       │
       ▼
Google the EXACT error text
       │
       ▼
Still stuck? Add print statements to trace data flow
       │
       ▼
Check API documentation for the specific function
       │
       ▼
Still stuck after 20 min? Ask Claude:
"I'm trying to [X]. Expected [Y]. Got [Z]. 
Error: [exact error message]
Code: [relevant snippet]"
       │
       ▼
Still stuck after 45 min total?
       │
       ▼
Check solution, understand it, DELETE YOUR CODE, try again from scratch
```

**Important**: Understanding > Completion. Better to understand 4 modules deeply than rush through 6.

---

## Critical Skills Per Module

| Module | You MUST Understand | Don't Move On Until... |
|--------|---------------------|------------------------|
| 1 | API auth, error handling, rate limits | You can handle API failures gracefully |
| 2 | Chains, prompts, output parsing | You can build a 3-step chain from scratch |
| 3 | Embeddings, vector search, RAG | You can explain similarity search to someone |
| 4 | Agent loops, tool calling, ReAct | You can debug why an agent chose wrong tool |
| 5 | FastAPI, async, deployment | You have a live URL with working endpoint |
| 6 | Testing AI outputs, evaluation | You can measure if your AI improved |

---

## Project Structure You'll Build

By end of course, you'll have:

```
ai-apps-course/
├── .env                  # API keys (NEVER commit)
├── src/
│   ├── module_01/        # API integration examples
│   ├── module_02/        # LangChain chains
│   ├── module_03/        # RAG system
│   ├── module_04/        # AI agents
│   ├── module_05/        # FastAPI app
│   └── module_06/        # Tests
├── tests/
├── final_project/        # Your deployable application
└── docs/
    └── learnings.md      # Your notes
```

Keep this organized. You'll reference it constantly.

---

## What Makes Top Students Different

| Top 10% Do This | Bottom 10% Do This |
|-----------------|-------------------|
| Type all code manually | Copy-paste examples |
| Break code intentionally | Only run happy path |
| Read error messages fully | Panic at first error |
| Debug for 20 min before asking | Give up after 2 min |
| Build mini-projects between modules | Only do required work |
| Start final project at Module 4 | Wait until last week |
| Test edge cases | Assume code works |

---

## Cost Management

AI APIs cost money. Be smart:

| Tip | Why |
|-----|-----|
| Use `gpt-3.5-turbo` for development | 10x cheaper than GPT-4 |
| Cache responses during testing | Don't re-call for same inputs |
| Set spending limits in OpenAI | Avoid surprise bills |
| Use free tiers (Pinecone, Chroma) | Sufficient for learning |
| Track your usage daily | Catch runaway costs early |

**Budget**: $5-10 total if you're careful. $20-30 if you experiment a lot.

---

## Tracking Your Progress

Use this checklist for each module:

```markdown
## Module [X] Progress

- [ ] Pre-read lesson headings
- [ ] Read full lesson
- [ ] Typed all code examples (no copy-paste)
- [ ] Ran every example successfully
- [ ] Completed exercises without solutions
- [ ] Broke code intentionally and fixed it
- [ ] Passed quiz (80%+)
- [ ] Can explain concept without notes
- [ ] Added reusable code to my library
```

Copy this into a file called `MY-PROGRESS.md` and update as you go.

---

## When to Start Your Final Project

**Module 4 completion = Start planning your final project**

Don't wait until the end. The best students:
1. Choose their project type at Module 4
2. Start scaffolding during Module 5
3. Integrate learnings from Module 6 into existing project
4. Have 2 weeks for polish and deployment

---

## Course Support

### Discord Community
Get help, share projects, find study partners.

### Office Hours  
Weekly live sessions (check Discord for schedule).

### Email Support
Technical issues: support@aiwhisperers.com

---

## Ready?

1. Open [SETUP.md](./SETUP.md)
2. Complete the setup (includes your first win!)
3. Start [Module 1](./modules/01-ai-integration-fundamentals/README.md)

**Build something real.**

---

*Estimated reading time: 10 minutes*
