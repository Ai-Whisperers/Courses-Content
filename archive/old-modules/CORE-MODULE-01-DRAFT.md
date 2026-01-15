# Core Module 1: Introduction to AI-Assisted Development
## Universal Foundation Course - FPUNA Summer 2026

**Duration:** 4 hours  
**Prerequisites:** Basic programming knowledge (any language)  
**Target Audience:** ALL students (regardless of specialization track)

---

## Learning Objectives

By the end of this module, you will be able to:
- **Explain** how AI coding assistants work and their capabilities
- **Install and configure** Claude Code or OpenCode on your system
- **Execute** your first AI-assisted development tasks
- **Identify** AI limitations and when to use manual approaches
- **Apply** best practices for working with AI tools

---

## 1.1 Understanding AI Coding Assistants

### What is an AI Coding Assistant?

AI coding assistants are tools powered by **Large Language Models (LLMs)** that can help with software development tasks:

**Core Capabilities:**
- 💻 **Generate code** from natural language descriptions
- 📖 **Explain existing code** in plain language
- 🐛 **Find and fix bugs** through analysis
- 🧪 **Write tests** for your functions and modules
- 📝 **Create documentation** (README, API docs, comments)
- ♻️ **Refactor code** for better quality and maintainability

**Key Difference from Traditional Tools:**
- Traditional IDEs: Syntax highlighting, autocomplete based on keywords
- AI Assistants: Understanding context, generating complete solutions, natural language interaction

---

### How Do They Work?

```
┌─────────────┐      ┌──────────────────┐      ┌──────────────┐      ┌─────────────┐
│ Your Prompt │  →   │ Context Gathering│  →   │ LLM Processing│  →   │   Output    │
│             │      │ (Files, History) │      │  (AI Model)   │      │(Code/Docs)  │
└─────────────┘      └──────────────────┘      └──────────────┘      └─────────────┘
```

**The Process:**
1. **Input**: You provide a question or request in natural language
2. **Context**: The AI gathers relevant information (project files, conversation history)
3. **Processing**: The LLM analyzes the request and context
4. **Output**: The AI generates code, explanations, or suggestions

**Example:**
```
You: "Create a function to validate email addresses"

AI: [Analyzes request] → [Understands email validation patterns] → [Generates code]

Output:
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

---

### Popular AI Coding Assistants

| Tool | Provider | Best For | Access |
|------|----------|----------|--------|
| **Claude Code** | Anthropic | Complex reasoning, long context windows | Subscription |
| **GitHub Copilot** | GitHub/OpenAI | Real-time code completion in IDE | Free for students |
| **ChatGPT** | OpenAI | General-purpose tasks, learning | Free tier available |
| **Cursor** | Cursor | IDE-integrated development | Subscription |
| **OpenCode** | Open source | Privacy-focused, self-hosted | Free |

### Why Claude Code / OpenCode for This Course?

**Claude Code:**
- ✅ **Long context window**: Can process entire codebases at once
- ✅ **Strong reasoning**: Better logic and problem-solving capabilities
- ✅ **Tool integration**: Direct access to file system, git, terminal
- ✅ **Agentic capabilities**: Can plan and execute multi-step tasks autonomously

**OpenCode:**
- ✅ **Open source**: Community-driven, transparent
- ✅ **Privacy**: Your code stays on your machine
- ✅ **Extensible**: Customize to your needs
- ✅ **Free**: No subscription costs

**For this course, we'll use Claude Code for demonstrations, but concepts apply to all AI assistants.**

---

## 1.2 Installing Your AI Assistant

### Prerequisites Checklist

Before installation, ensure you have:

- [ ] **Operating System**: 
  - Windows 10+ (with WSL), macOS 10.15+, or Linux (Ubuntu 20.04+ / Debian 10+)
- [ ] **Development Tools**:
  - Git installed (`git --version` to check)
  - Node.js 18+ OR Python 3.8+ (depending on your track)
- [ ] **Hardware**:
  - 4GB+ RAM
  - 2GB free disk space
- [ ] **Account** (for Claude Code):
  - Anthropic account with active billing at [console.anthropic.com](https://console.anthropic.com)

---

### Installation Steps - Claude Code

#### Option 1: macOS (Recommended Method)

```bash
# Using Homebrew (simplest option)
brew install --cask claude-code

# Verify installation
claude --version
```

#### Option 2: Linux / WSL (Recommended Method)

```bash
# Using the official install script
curl -fsSL https://claude.ai/install.sh | bash

# Verify installation
claude --version
```

#### Option 3: Windows (WSL Recommended)

```powershell
# Step 1: Install WSL if you haven't
wsl --install

# Step 2: Open WSL terminal and run:
curl -fsSL https://claude.ai/install.sh | bash

# Alternative: Use Git Bash
# Download and install Git for Windows, then run in Git Bash:
curl -fsSL https://claude.ai/install.sh | bash
```

#### Option 4: npm Installation (Cross-platform, Legacy)

```bash
# Works on any platform with Node.js 18+
npm install -g @anthropic-ai/claude-code

# Important: Do NOT use sudo with npm install
# Native installation is recommended for better performance
```

---

### First-Time Setup and Authentication

**Step 1: Start Claude Code**
```bash
# Navigate to your project directory (or any directory)
cd ~/my-project

# Launch Claude Code
claude
```

**Step 2: Authenticate**
```
Claude will prompt you to:
1. Open a browser window to console.anthropic.com
2. Log in with your Anthropic account
3. Authorize Claude Code access
4. Return to terminal (authentication completes automatically)
```

**Step 3: Verify**
```bash
# Check if authentication worked
claude --help

# You should see available commands listed
```

---

### Installation Steps - OpenCode (Alternative)

For those who prefer open-source tools:

```bash
# Clone the repository
git clone https://github.com/opencode-ai/opencode.git
cd opencode

# Install dependencies
npm install

# Run setup
npm run setup

# Start OpenCode
npm start
```

**Note:** OpenCode requires more manual setup. See [OpenCode documentation](https://opencode.ai/docs) for details.

---

## 1.3 Your First AI Interaction

### Starting Your AI Assistant

**Claude Code:**
```bash
# Start in current directory
claude

# Start with a specific task
claude "Explain this project"

# Start in a different directory
claude --directory /path/to/project
```

**Basic Commands (Inside Claude):**

| Command | Description |
|---------|-------------|
| `claude` | Start interactive session |
| `claude "task"` | Start with specific task |
| `/help` | Show all available commands |
| `/clear` | Clear conversation history |
| `/exit` | Exit Claude Code |
| `Ctrl+C` | Cancel current operation |

---

### Example 1: Your First Conversation

**Goal:** Understand what the AI can do

```
You: Hello! I'm new to AI coding assistants. What can you help me with?

AI: Welcome! I can assist you with many development tasks:

**Code Generation**
- Write functions, classes, and complete modules
- Generate boilerplate code (configs, templates)
- Create code from specifications or requirements

**Code Understanding**
- Explain how existing code works
- Identify potential bugs or issues
- Suggest improvements and optimizations

**Documentation**
- Create README files and user guides
- Generate API documentation
- Write inline code comments

**Debugging**
- Analyze error messages
- Suggest fixes for bugs
- Refactor problematic code

**Testing**
- Write unit tests
- Generate test cases
- Create test data

Would you like to try any of these? I can start with something simple!
```

---

### Example 2: Generating a Simple Function

**Goal:** Generate a utility function with AI assistance

```
You: I need a function that converts temperatures from Celsius to Fahrenheit. 
Can you help?

AI: I'll create a temperature conversion function for you:

```javascript
/**
 * Converts temperature from Celsius to Fahrenheit
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 */
function celsiusToFahrenheit(celsius) {
  if (typeof celsius !== 'number') {
    throw new TypeError('Input must be a number');
  }
  
  return (celsius * 9/5) + 32;
}

// Example usage:
console.log(celsiusToFahrenheit(0));   // 32
console.log(celsiusToFahrenheit(100)); // 212
console.log(celsiusToFahrenheit(37));  // 98.6

module.exports = celsiusToFahrenheit;
```

This function:
- Takes a Celsius temperature as input
- Validates that the input is a number
- Uses the standard conversion formula: (C × 9/5) + 32
- Returns the Fahrenheit equivalent
- Includes JSDoc comments for documentation

Would you like me to also create tests for this function?
```

---

### Example 3: Explaining Existing Code

**Goal:** Understand unfamiliar code

```
You: Can you explain what this code does?

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

AI: This is a **recursive implementation of the Fibonacci sequence**. Let me break it down:

**What it does:**
- Calculates the nth number in the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13...)

**How it works:**
1. **Base case** (line 2-3): If n is 0 or 1, return n directly
   - fibonacci(0) = 0
   - fibonacci(1) = 1

2. **Recursive case** (line 4): For any n > 1:
   - Calculate fibonacci(n-1) + fibonacci(n-2)
   - This breaks down the problem into smaller subproblems

**Example trace for fibonacci(4):**
```
fibonacci(4)
├── fibonacci(3)
│   ├── fibonacci(2)
│   │   ├── fibonacci(1) = 1
│   │   └── fibonacci(0) = 0
│   │   = 1
│   └── fibonacci(1) = 1
│   = 2
└── fibonacci(2)
    ├── fibonacci(1) = 1
    └── fibonacci(0) = 0
    = 1
= 3
```

**Note:** This implementation is simple but inefficient (exponential time complexity).
For production use, consider memoization or an iterative approach.
```

---

## 1.4 AI Capabilities and Limitations

### What AI Does REALLY WELL ✅

| Capability | Example |
|------------|---------|
| **Boilerplate Code** | Configuration files, templates, scaffolding |
| **Common Patterns** | CRUD operations, API endpoints, standard algorithms |
| **Code Explanations** | Documenting complex logic, explaining frameworks |
| **Documentation** | README files, API docs, inline comments |
| **Standard Tests** | Unit tests for pure functions, basic test cases |
| **Refactoring** | Code cleanup, pattern application, simplification |
| **Learning** | Explaining concepts, providing examples |

---

### What AI Struggles With ⚠️

| Limitation | Why | What To Do |
|------------|-----|------------|
| **Domain-Specific Business Logic** | No knowledge of your company's rules | Provide detailed context |
| **Novel Algorithms** | Not in training data | Design yourself, get AI to implement |
| **Security** | May miss vulnerabilities | Always perform security review |
| **Performance** | May not optimize for your specific case | Profile and optimize manually |
| **Current APIs** | Knowledge cutoff date | Verify with official docs |
| **Your Preferences** | Doesn't know your style | Use CLAUDE.md (Module 2) |

---

### The "Hallucination" Problem 🚨

**What is it?**
AI can generate code that *looks* correct but contains subtle bugs.

**Example 1: Missing await**
```javascript
// ❌ AI might generate (INCORRECT):
async function fetchData() {
  const response = await fetch('/api/data');
  const data = response.json(); // Missing await!
  return data;
}

// ✅ Correct version:
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json(); // Added await
  return data;
}
```

**Example 2: Off-by-one errors**
```python
# ❌ AI might generate (INCORRECT):
def get_last_three(arr):
    return arr[-4:-1]  # Wrong indices!

# ✅ Correct version:
def get_last_three(arr):
    return arr[-3:]  # Correct
```

**🎯 Key Takeaway: ALWAYS REVIEW AI-GENERATED CODE!**

---

### When to Use AI vs Manual Coding

| Situation | Use AI ✅ | Use Manual Coding 🛠️ |
|-----------|----------|----------------------|
| **Task Type** | Boilerplate, common patterns | Security-critical, novel algorithms |
| **Code Criticality** | Non-critical utilities | Payment processing, authentication |
| **Your Knowledge** | Learning new syntax | Performance-critical sections |
| **Time Pressure** | Rapid prototyping | Production-ready code (after review) |
| **Creativity** | Standard solutions | Innovative approaches |

**Best Practice:** Use AI for speed, use your brain for quality and security.

---

### AI Development Best Practices

1. **👀 Review Everything**
   - AI is a **helper**, not a **replacement**
   - Read every line of generated code
   - Test thoroughly before deploying

2. **📋 Provide Context**
   - Better input → Better output
   - Share relevant files and requirements
   - Be specific about constraints

3. **🔄 Iterate**
   - First output often needs refinement
   - Ask follow-up questions
   - Request improvements

4. **✅ Verify**
   - Run the code
   - Check edge cases
   - Validate against requirements

5. **🧠 Learn**
   - Don't just copy-paste
   - Understand what the AI generates
   - Build your knowledge

---

## 1.5 Hands-On Exercises

### 🎯 Exercise 1.1: Installation and Setup

**Objective:** Get your AI assistant running  
**Time:** 30 minutes

**Steps:**

1. **Install Claude Code** using the method for your OS:
   ```bash
   # macOS
   brew install --cask claude-code
   
   # Linux/WSL
   curl -fsSL https://claude.ai/install.sh | bash
   ```

2. **Verify installation:**
   ```bash
   claude --version
   ```
   Expected output: `Claude Code v1.x.x`

3. **Authenticate:**
   ```bash
   claude
   # Follow OAuth flow in browser
   ```

4. **Test basic interaction:**
   ```bash
   claude "What can you help me with?"
   ```

**✅ Success Criteria:**
- Claude Code installed and authenticated
- Can start interactive session
- Can execute basic commands

**📝 Deliverable:** Screenshot of successful `claude --version` output

---

### 🎯 Exercise 1.2: Generate Your First Function

**Objective:** Use AI to generate and understand code  
**Time:** 45 minutes

**Scenario:** You need a utility function for a project.

**Steps:**

1. **Create project directory:**
   ```bash
   mkdir ai-practice
   cd ai-practice
   ```

2. **Start Claude:**
   ```bash
   claude
   ```

3. **Request function generation:**
   ```
   Prompt: "Create a function called 'isPalindrome' that checks if a string 
   is the same forwards and backwards. It should ignore spaces and be 
   case-insensitive. Include examples."
   ```

4. **Review the generated code:**
   - Read each line
   - Understand the logic
   - Check the examples

5. **Ask follow-up questions:**
   ```
   - "How does this handle special characters?"
   - "Can you add error handling?"
   - "What's the time complexity?"
   ```

6. **Save the code:**
   - Copy to `isPalindrome.js` (or `.py` if using Python)
   - Test it manually with different inputs

7. **Test edge cases:**
   ```javascript
   isPalindrome("A man a plan a canal Panama") // Should be true
   isPalindrome("race car")  // Should be true
   isPalindrome("hello")     // Should be false
   isPalindrome("")          // What happens?
   isPalindrome("a")         // What happens?
   ```

**✅ Success Criteria:**
- Function generated and working
- You understand how it works
- Tested with multiple inputs
- Asked at least 2 follow-up questions

**📝 Deliverable:** Your `isPalindrome` function file + test results

---

### 🎯 Exercise 1.3: Code Explanation Practice

**Objective:** Use AI to understand unfamiliar code  
**Time:** 45 minutes

**Steps:**

1. **Find a code snippet:**
   - Visit https://github.com/explore
   - Choose a small open-source project in your language
   - Find a function you don't fully understand (10-30 lines)

2. **Ask AI to explain it:**
   ```bash
   claude
   
   You: "Can you explain this code in detail?"
   [Paste the code]
   ```

3. **Ask specific questions:**
   ```
   - "What is the purpose of line X?"
   - "Why is this approach used instead of Y?"
   - "Are there any potential bugs?"
   - "How could this be improved?"
   ```

4. **Request variations:**
   ```
   - "Can you rewrite this in a different way?"
   - "How would you implement this in [another language]?"
   ```

5. **Document your learning:**
   - Write down what you learned
   - Note any insights about the code
   - Save interesting explanations

**✅ Success Criteria:**
- Successfully understood a previously unclear code snippet
- Asked at least 3 follow-up questions
- Can explain the code to someone else
- Identified at least one improvement or alternative

**📝 Deliverable:** 
- Link to the original code
- Summary of what you learned
- Your own explanation of the code

---

## 1.6 Knowledge Check Quiz

Answer these questions to verify your understanding:

### Question 1
**What is the main advantage of Claude Code over GitHub Copilot?**

A) It's free  
B) It has longer context windows and better reasoning  
C) It works offline  
D) It's faster  

<details>
<summary>Click to reveal answer</summary>

**Answer: B**

Claude Code specializes in complex reasoning with long context windows, allowing it to understand entire codebases at once. GitHub Copilot excels at real-time code completion but with more limited context.
</details>

---

### Question 2
**Why is providing context important when using AI coding assistants?**

A) It makes the AI run faster  
B) It reduces token usage  
C) It helps the AI generate more accurate and relevant code  
D) It's required for authentication  

<details>
<summary>Click to reveal answer</summary>

**Answer: C**

Context helps the AI understand your specific situation, requirements, and constraints, leading to more accurate and relevant code generation. Better context = better output.
</details>

---

### Question 3
**Which of these tasks should you prefer MANUAL coding over AI assistance?**

A) Writing boilerplate configuration files  
B) Security-critical authentication logic  
C) Generating standard CRUD operations  
D) Creating project documentation  

<details>
<summary>Click to reveal answer</summary>

**Answer: B**

Security-critical code (authentication, payment processing, encryption) should always be manually reviewed and written with extreme care. AI can miss vulnerabilities or generate insecure patterns.
</details>

---

### Question 4
**What is an "hallucination" in the context of AI coding assistants?**

A) When the AI takes too long to respond  
B) When the AI generates plausible but incorrect code  
C) When the AI can't understand your request  
D) When the AI suggests multiple solutions  

<details>
<summary>Click to reveal answer</summary>

**Answer: B**

A "hallucination" is when the AI confidently generates code that looks correct but contains subtle bugs or incorrect logic. This is why reviewing all AI-generated code is crucial.
</details>

---

### Question 5
**What should you ALWAYS do with AI-generated code?**

A) Use it immediately in production  
B) Review, test, and verify it  
C) Share it with the AI community  
D) Commit it without reading  

<details>
<summary>Click to reveal answer</summary>

**Answer: B**

ALWAYS review, test, and verify AI-generated code before using it. AI is a powerful tool but requires human oversight to ensure correctness, security, and quality.
</details>

---

## 1.7 Module Summary

### What You Learned Today 🎓

✅ **AI Coding Assistants Fundamentals**
- How LLMs work for code generation
- Different AI tools and their strengths
- When and why to use AI assistance

✅ **Claude Code Setup**
- Installation across different platforms
- Authentication and configuration
- Basic commands and usage

✅ **Practical AI Usage**
- Generating functions with AI
- Understanding unfamiliar code
- Iterating and refining outputs

✅ **AI Limitations and Best Practices**
- Recognizing hallucinations
- When to use AI vs manual coding
- Review and verification strategies

---

### Key Takeaways 💡

1. **AI is a powerful assistant, not a replacement** for developers
2. **Context is king** - better input yields better output
3. **Always review** - never trust AI-generated code blindly
4. **Iterate freely** - ask follow-up questions to improve results
5. **Learn continuously** - understand what the AI generates

---

### Coming Up Next 🚀

**Module 2: Context Engineering**

You'll learn how to provide effective context to AI assistants:
- Creating CLAUDE.md files for your projects
- Prompt engineering techniques
- Session vs project vs prompt-level context
- Advanced prompting patterns

**Why it matters:** Better context = 10x better AI outputs!

---

## 1.8 Additional Resources

### Official Documentation
- 📘 [Claude Code Documentation](https://docs.claude.com)
- 📘 [Anthropic API Documentation](https://docs.anthropic.com)
- 📘 [OpenCode Documentation](https://opencode.ai/docs)

### Learning Resources
- 🎥 [Claude Code Video Tutorials](https://youtube.com/@anthropic)
- 📝 [AI Coding Best Practices](https://github.com/ai-coding-best-practices)
- 🎓 [Prompt Engineering Guide](https://www.promptingguide.ai/)

### Community
- 💬 [Claude Discord Community](https://discord.gg/claude)
- 💬 [AI Coding Subreddit](https://reddit.com/r/aicoding)
- 💬 [FPUNA Course Discord](#) (course-specific)

### Tools Mentioned
- [GitHub Copilot](https://github.com/features/copilot) - Free for students!
- [Cursor IDE](https://cursor.sh/)
- [ChatGPT](https://chat.openai.com/)

---

## 1.9 Instructor Notes

### Teaching Tips
- Emphasize **hands-on practice** - students learn by doing
- Show **real failures** - demonstrate hallucinations and how to catch them
- Encourage **experimentation** - there's no "wrong" prompt
- **Live demos** work better than slides for this module

### Common Student Questions
Q: "Is using AI cheating?"  
A: No - it's a tool like Stack Overflow or documentation. You still need to understand and review the code.

Q: "Will AI replace developers?"  
A: AI augments developers, doesn't replace them. Critical thinking, architecture, and business understanding remain human skills.

Q: "What if I can't afford Claude Code?"  
A: Use free alternatives like ChatGPT, GitHub Copilot (free for students), or OpenCode.

### Assessment Rubric

| Criteria | Excellent (90-100%) | Good (70-89%) | Needs Work (<70%) |
|----------|---------------------|---------------|-------------------|
| Installation | Fully working, authenticated | Installed but minor issues | Not working |
| Exercise 1.2 | Function works perfectly, well-tested | Function works, basic testing | Function has bugs |
| Exercise 1.3 | Deep understanding, great questions | Basic understanding | Shallow understanding |
| Quiz | 5/5 correct | 3-4/5 correct | <3/5 correct |

---

**End of Core Module 1**

📌 **Next:** [Core Module 2: Context Engineering](./module-02-context-engineering/)

---

*FPUNA Summer 2026 - AI-Augmented Development Program*  
*Version 1.0 - January 2026*
