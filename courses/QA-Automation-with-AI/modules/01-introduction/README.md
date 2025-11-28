# Module 1: Introduction to AI-Assisted Development

## Duration: 4 hours

## Learning Objectives

By the end of this module, you will be able to:
- Explain how AI coding assistants work
- Install and configure Claude Code
- Execute your first AI-assisted tasks
- Understand AI limitations and when to use manual approaches

---

## 1.1 Understanding AI Coding Assistants

### What is an AI Coding Assistant?

AI coding assistants are tools powered by Large Language Models (LLMs) that can:
- Generate code from natural language descriptions
- Explain existing code
- Find and fix bugs
- Write tests
- Create documentation
- Refactor code

### How Do They Work?

```
[Your Prompt] → [Context + Instructions] → [LLM Processing] → [Generated Output]
```

1. **Input**: Your question or request
2. **Context**: Project files, conversation history
3. **Processing**: AI analyzes and generates response
4. **Output**: Code, explanation, or suggestions

### Popular AI Coding Assistants

| Tool | Provider | Best For |
|------|----------|----------|
| Claude Code | Anthropic | Complex reasoning, long context |
| GitHub Copilot | GitHub/OpenAI | Real-time code completion |
| ChatGPT | OpenAI | General-purpose tasks |
| Cursor | Cursor | IDE-integrated development |

### Why Claude Code for QA?

- **Long context window**: Can process entire codebases
- **Strong reasoning**: Better test logic generation
- **Tool integration**: File system, git, terminal access
- **Agentic capabilities**: Can plan and execute multi-step tasks

---

## 1.2 Installing Claude Code

### Prerequisites

- Windows 10+ (with WSL), macOS 10.15+, or Ubuntu 20.04+/Debian 10+
- Node.js 18+ (only for npm installation method)
- Git installed
- 4GB+ RAM
- Active billing at console.anthropic.com

### Installation Steps

#### macOS (Recommended: Native)

```bash
# Using Homebrew (simplest option)
brew install --cask claude-code

# Or using the install script
curl -fsSL https://claude.ai/install.sh | bash
```

#### Linux/WSL (Recommended: Native)

```bash
# Using the install script (recommended)
curl -fsSL https://claude.ai/install.sh | bash
```

#### Windows

```powershell
# Option 1: Use WSL (recommended)
# Install WSL first, then run in WSL terminal:
curl -fsSL https://claude.ai/install.sh | bash

# Option 2: Use Git Bash
# Run in Git Bash terminal:
curl -fsSL https://claude.ai/install.sh | bash
```

#### Alternative: npm Installation (Legacy)

```bash
# Works on any platform with Node.js 18+
npm install -g @anthropic-ai/claude-code

# Note: Native installation is recommended for better performance
# Do NOT use sudo with npm install
```

### Verify Installation

```bash
claude --version
# Expected: Claude Code v1.x.x
```

### First-Time Setup

```bash
# Start Claude Code in your project directory
claude

# Follow the OAuth prompts to:
# 1. Connect through Claude Console
# 2. Complete authentication
# 3. Return to terminal
```

> **Note:** Requires active billing at [console.anthropic.com](https://console.anthropic.com)

---

## 1.3 Your First AI Interaction

### Starting Claude Code

```bash
# Start in current directory
claude

# Start with a specific task
claude "Explain this codebase"

# Start in a different directory
claude --directory /path/to/project
```

### Basic Commands

| Command | Description |
|---------|-------------|
| `claude` | Start interactive session |
| `claude "task"` | Start with specific task |
| `/help` | Show available commands |
| `/clear` | Clear conversation |
| `/exit` | Exit Claude Code |
| `Ctrl+C` | Cancel current operation |

### Example: First Conversation

```
User: Hello! I'm new to Claude Code. Can you help me understand what you can do?

Claude: I can help you with many software development tasks:

**Code Generation**
- Write functions, classes, and modules
- Generate boilerplate code
- Create from specifications

**Testing**
- Write unit, integration, and E2E tests
- Generate test plans
- Debug failing tests

**Documentation**
- Create README files
- Generate API documentation
- Write code comments

**Analysis**
- Explain code functionality
- Find bugs and issues
- Suggest improvements

Let's start with something practical. What would you like to try first?
```

### Example: Simple Test Generation

```
User: I have a function that calculates discounts. Can you write a test for it?

Here's the function:
```javascript
function calculateDiscount(price, percent) {
  return price * (percent / 100);
}
```

Claude: I'll create comprehensive Jest tests for this function:

```javascript
describe('calculateDiscount', () => {
  test('calculates 10% discount on $100', () => {
    expect(calculateDiscount(100, 10)).toBe(10);
  });

  test('calculates 50% discount on $200', () => {
    expect(calculateDiscount(200, 50)).toBe(100);
  });

  test('returns 0 for 0% discount', () => {
    expect(calculateDiscount(100, 0)).toBe(0);
  });

  test('handles decimal prices', () => {
    expect(calculateDiscount(99.99, 10)).toBeCloseTo(9.999);
  });
});
```

These tests cover:
- Basic calculations
- Edge case (0% discount)
- Decimal handling
```

---

## 1.4 AI Capabilities and Limitations

### What AI Does Well

1. **Boilerplate Code** - Repetitive patterns
2. **Common Patterns** - Standard implementations
3. **Documentation** - From code to docs
4. **Explanations** - Code understanding
5. **Test Cases** - Standard scenarios
6. **Refactoring** - Code transformations

### What AI Struggles With

1. **Business Logic** - Domain-specific rules
2. **Novel Algorithms** - Truly new approaches
3. **Perfect Security** - Always needs review
4. **Current APIs** - Knowledge cutoff
5. **Your Preferences** - Without context

### The Hallucination Problem

AI can generate plausible but incorrect code:

```javascript
// AI might generate this (INCORRECT)
const result = await fetch('/api/data');
const data = result.json(); // Missing await!

// Correct version
const result = await fetch('/api/data');
const data = await result.json();
```

**Always review AI-generated code!**

### When to Use AI vs Manual

| Use AI | Use Manual |
|--------|------------|
| Boilerplate code | Security-critical code |
| Test generation | Complex business logic |
| Documentation | Performance-critical code |
| Code explanation | Novel algorithms |
| Refactoring patterns | Compliance requirements |

### Best Practices

1. **Review everything** - AI is a helper, not a replacement
2. **Provide context** - Better input = better output
3. **Iterate** - Refine through conversation
4. **Verify** - Test AI-generated code
5. **Learn** - Understand what it generates

---

## 1.5 Hands-On Exercise

### Exercise 1.1: Installation and Setup

**Objective**: Install Claude Code and complete first interaction

**Steps**:

1. Install Claude Code using the appropriate method for your OS
2. Verify installation with `claude --version`
3. Authenticate with `claude auth login`
4. Start a session with `claude`
5. Ask Claude to explain what it can do

**Expected Outcome**: Working Claude Code installation

**Time**: 30 minutes

---

### Exercise 1.2: First Test Generation

**Objective**: Generate your first test with AI assistance

**Steps**:

1. Create a new directory: `mkdir ai-testing-practice && cd ai-testing-practice`
2. Initialize npm: `npm init -y`
3. Install Jest: `npm install --save-dev jest`
4. Create a file `calculator.js`:

```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}

module.exports = { add, subtract, multiply, divide };
```

5. Start Claude: `claude`
6. Ask: "Generate comprehensive Jest tests for calculator.js including edge cases"
7. Review the generated tests
8. Save to `calculator.test.js`
9. Run tests: `npx jest`

**Expected Outcome**: All tests passing

**Time**: 45 minutes

---

### Exercise 1.3: Code Explanation

**Objective**: Use AI to understand unfamiliar code

**Steps**:

1. Find a small open-source project on GitHub
2. Clone it locally
3. Start Claude in the project directory
4. Ask Claude to:
   - Explain the project structure
   - Identify the main entry point
   - List the key functions
   - Explain how data flows through the app

**Expected Outcome**: Clear understanding of the codebase

**Time**: 45 minutes

---

## Knowledge Check

Answer these questions to verify your understanding:

1. What is the main difference between Claude Code and GitHub Copilot?
2. Why is context important when using AI coding assistants?
3. Name three things AI does well and three things it struggles with.
4. What is a "hallucination" in AI context?
5. When should you prefer manual coding over AI assistance?

---

## Summary

In this module, you learned:

- How AI coding assistants work
- How to install and configure Claude Code
- Basic commands and interactions
- AI capabilities and limitations
- When to use AI vs manual approaches

---

## Next Steps

Proceed to **Module 2: Context Engineering** to learn how to provide effective context for better AI results.

---

## Resources

- [Claude Code Documentation](https://docs.claude.com)
- [Anthropic API Documentation](https://docs.anthropic.com)
- [Jest Documentation](https://jestjs.io)
