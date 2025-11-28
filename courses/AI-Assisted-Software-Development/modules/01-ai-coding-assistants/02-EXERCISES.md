# Module 1: Exercises
## AI for Developers Overview

---

## Overview

These exercises will help you understand the AI development landscape and configure your environment for the course.

**Total Time:** 30-45 minutes
**Deliverables:** Configured environment, comparison document, first AI code

---

## Exercise 1: AI Tool Research (10 minutes)

### Objective
Compare the major AI coding assistants to understand their strengths.

### Instructions

Research and complete the following comparison table:

| Feature | GitHub Copilot | Claude | ChatGPT |
|---------|----------------|--------|---------|
| Price (monthly) | | | |
| Best use case | | | |
| IDE integration | | | |
| Context window | | | |
| Offline capability | | | |
| Your rating (1-5) | | | |

### Questions to Answer

1. Which tool seems best for real-time coding?
2. Which tool seems best for complex code review?
3. Which tool would you choose if you could only have one?

### Deliverable
Completed comparison table with your answers.

---

## Exercise 2: Use Case Identification (5 minutes)

### Objective
Identify which AI tool to use for different development scenarios.

### Instructions

For each scenario, identify the best tool (Copilot, Claude, or ChatGPT):

| Scenario | Best Tool | Why? |
|----------|-----------|------|
| Writing a new API endpoint | | |
| Reviewing a 500-line PR | | |
| Explaining legacy code | | |
| Generating unit tests | | |
| Designing system architecture | | |
| Writing documentation | | |
| Debugging a complex bug | | |
| Learning a new framework | | |

### Deliverable
Completed table with your reasoning.

---

## Exercise 3: Environment Setup Verification (15 minutes)

### Objective
Ensure all AI tools are properly configured.

### Part A: VS Code Extensions

Verify these extensions are installed:

```
□ GitHub Copilot
□ GitHub Copilot Chat
□ GitLens
□ Prettier - Code formatter
□ ESLint (for JavaScript/TypeScript)
```

### Part B: Copilot Configuration

Open VS Code settings (Ctrl/Cmd + ,) and verify:

```json
{
  "editor.inlineSuggest.enabled": true,
  "github.copilot.enable": {
    "*": true,
    "markdown": true,
    "plaintext": false
  }
}
```

### Part C: Verification Test

Create a new file `test.js` and type:

```javascript
// Function to calculate the factorial of a number
function factorial(
```

**Expected:** Copilot should suggest completing the function.

### Part D: Copilot Chat Test

Open Copilot Chat (Ctrl/Cmd + Shift + I) and ask:

```
Explain what a REST API is in 3 sentences.
```

**Expected:** Clear, concise explanation.

### Deliverable
Screenshot showing Copilot suggestion and Chat response.

---

## Exercise 4: First AI Code Generation (10 minutes)

### Objective
Generate your first functions using GitHub Copilot.

### Instructions

Create a new file `ai-generated.js` and use comments to generate these functions:

### Function 1: Email Validation

```javascript
// Function to validate email address
// Should return true for valid emails, false for invalid
// Use regex for validation
```

Wait for Copilot suggestion, then press Tab to accept.

### Function 2: Array Shuffle

```javascript
// Function to randomly shuffle an array
// Should not modify the original array
// Use Fisher-Yates algorithm
```

### Function 3: Date Formatting

```javascript
// Function to format a date as "Month Day, Year" (e.g., "January 15, 2025")
// Input: Date object
// Output: formatted string
```

### Evaluation Criteria

For each generated function, rate:

| Criteria | Function 1 | Function 2 | Function 3 |
|----------|------------|------------|------------|
| Correct on first try? (Y/N) | | | |
| Needed modifications? | | | |
| Code quality (1-5) | | | |
| Would you use this? (Y/N) | | | |

### Deliverable
The `ai-generated.js` file with all three functions and your evaluation.

---

## Exercise 5: Prompt Refinement (5 minutes)

### Objective
Learn how prompt quality affects AI output.

### Instructions

Generate the same function with three different prompt styles:

### Prompt A: Vague

```javascript
// sort function
```

Record what Copilot suggests: _______________

### Prompt B: Medium Detail

```javascript
// Function to sort an array of numbers
```

Record what Copilot suggests: _______________

### Prompt C: Detailed

```javascript
// Function to sort an array of objects by a specific property
// Parameters: array (Array), property (string), ascending (boolean)
// Returns: new sorted array without modifying original
// Example: sortByProperty([{name: 'Z'}, {name: 'A'}], 'name', true) => [{name: 'A'}, {name: 'Z'}]
```

Record what Copilot suggests: _______________

### Analysis

1. Which prompt produced the best result?
2. What made the detailed prompt better?
3. How will this change how you write comments?

### Deliverable
Your analysis of the three prompts and their outputs.

---

## Exercise 6: Claude Comparison (Optional - 5 minutes)

### Objective
Compare Copilot output with Claude output.

### Instructions

1. Go to claude.ai
2. Ask Claude to generate the same email validation function:

```
Write a JavaScript function to validate email addresses using regex.
Include error handling and return true/false.
```

3. Compare with your Copilot-generated version

### Comparison

| Aspect | Copilot | Claude |
|--------|---------|--------|
| Speed | | |
| Code quality | | |
| Explanation provided | | |
| Edge cases handled | | |
| Preference | | |

### Deliverable
Completed comparison with both code versions.

---

## Exercise 7: Productivity Baseline (5 minutes)

### Objective
Establish your baseline for measuring improvement.

### Instructions

Without using AI, write a function to:

**Task:** Create a function that takes an array of numbers and returns an object with `min`, `max`, `sum`, and `average` properties.

**Time yourself** from start to finish.

```javascript
// Your code here (NO AI assistance)
function analyzeNumbers(numbers) {
  // Write without AI
}
```

### Record Your Results

| Metric | Value |
|--------|-------|
| Time to complete | ___ minutes |
| Lines of code | ___ lines |
| Bugs fixed | ___ bugs |
| Satisfaction (1-5) | ___ |

### Now with AI

Use Copilot to generate the same function:

```javascript
// Function to analyze an array of numbers
// Returns object with min, max, sum, and average properties
```

| Metric | Value |
|--------|-------|
| Time to complete | ___ minutes |
| Lines of code | ___ lines |
| Modifications needed | ___ |
| Satisfaction (1-5) | ___ |

### Deliverable
Both versions with timing comparison.

---

## Exercise 8: Configuration Optimization (5 minutes)

### Objective
Optimize your VS Code settings for AI-assisted development.

### Instructions

Create or update your VS Code `settings.json` with these AI-optimized settings:

```json
{
  // Copilot settings
  "editor.inlineSuggest.enabled": true,
  "github.copilot.enable": {
    "*": true,
    "yaml": true,
    "markdown": true,
    "plaintext": false
  },

  // Editor settings for AI
  "editor.tabCompletion": "on",
  "editor.acceptSuggestionOnEnter": "on",
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },

  // Format on save (works with AI code)
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### Verification

Test that settings are working:
1. Open a new `.js` file
2. Type a comment describing a function
3. Verify Copilot suggestions appear
4. Accept a suggestion with Tab
5. Save and verify formatting

### Deliverable
Confirmation that all settings are working.

---

## Bonus Exercise: ROI Calculator

### Objective
Calculate the potential ROI for your team.

### Instructions

Fill in your team's information:

| Metric | Your Team |
|--------|-----------|
| Team size | ___ developers |
| Average salary | $___ |
| Hours per week coding | ___ hours |
| Estimated AI time savings | __% |

### Calculation

```
Annual coding hours = Team size × Hours/week × 52
Time saved = Annual hours × Time savings %
Value of time saved = Time saved × (Avg salary / 2080)
AI tool cost = Team size × $19/month × 12
Net ROI = Value saved - Tool cost
```

### Your Results

```
Annual coding hours: ___
Time saved: ___ hours
Value of time saved: $___
AI tool cost: $___
Net ROI: $___
ROI percentage: ___%
```

### Deliverable
Completed ROI calculation for your team.

---

## Submission Checklist

Before moving to Module 2, ensure you have:

- [ ] Completed Exercise 1: Tool comparison table
- [ ] Completed Exercise 2: Use case identification
- [ ] Completed Exercise 3: Environment verification (with screenshots)
- [ ] Completed Exercise 4: AI-generated functions file
- [ ] Completed Exercise 5: Prompt refinement analysis
- [ ] (Optional) Exercise 6: Claude comparison
- [ ] Completed Exercise 7: Productivity baseline
- [ ] Completed Exercise 8: Configuration verification

---

## Answer Key (Instructor Reference)

### Exercise 1: Sample Answers

| Feature | GitHub Copilot | Claude | ChatGPT |
|---------|----------------|--------|---------|
| Price | $19/mo | $20/mo (Pro) | $20/mo (Plus) |
| Best use case | Real-time coding | Complex reasoning | General assistance |
| IDE integration | Excellent | Limited | Limited |
| Context window | File-based | 200K tokens | 128K tokens |
| Offline capability | No | No | No |

### Exercise 4: Expected Functions

```javascript
// Function 1: Email Validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Function 2: Array Shuffle (Fisher-Yates)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function 3: Date Formatting
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
```

---

*Module 1 Exercises - AI for Developers Overview*
*AI-Assisted Software Development Course*
