# Module 1: Answer Key
## AI for Developers Overview - Instructor Reference

---

## Quiz Answers

### Section 1: AI Tool Knowledge

| # | Answer | Explanation |
|---|--------|-------------|
| 1 | **B** - GitHub Copilot | Copilot is specifically designed for real-time IDE integration with code completion as you type. ChatGPT and Claude require copy/paste workflow. |
| 2 | **C** - Larger context window | Claude offers up to 200K tokens context, allowing analysis of entire codebases. This makes it superior for complex reasoning tasks involving multiple files. |
| 3 | **B** - False | GitHub Copilot's base model doesn't have internet access. It relies on patterns learned during training. Copilot Chat has limited web search in some configurations. |
| 4 | **C** - `/deploy` | Deployment is outside Copilot's scope. Valid commands include `/explain`, `/fix`, `/tests`, `/doc`, and `/optimize`. |
| 5 | **C** - $19/month | As of 2025, individual Copilot is $10/month or $100/year. Business is $19/user/month. Accept $10 if students cite current pricing. |

### Section 2: Best Practices

| # | Answer | Explanation |
|---|--------|-------------|
| 6 | **C** - Security features | Authentication, authorization, encryption, and security-critical code require careful human review. AI may introduce subtle vulnerabilities. |
| 7 | **B** - Option B | Detailed comments with parameters, expected behavior, and examples produce significantly better suggestions. Context is king. |
| 8 | **C** - Add more context | The best approach is to improve the prompt. More specific requirements lead to better suggestions. |
| 9 | **B** - False | All AI-generated code must be tested. AI can produce code with bugs, edge case failures, or security issues. |
| 10 | **A, C, E** | Never include API keys, secrets, customer data, or credentials. These create security and privacy risks. |

### Section 3: Productivity & ROI

| # | Answer | Explanation |
|---|--------|-------------|
| 11 | **D** - 70-80% | Industry studies (GitHub, Stack Overflow surveys) show 70-80% improvement for test generation tasks. |
| 12 | **C** - $20,000 | Calculation: 8 hrs/week × 52 weeks = 416 hrs. $100k/2080 hrs = $48/hr. 416 × $48 ≈ $20,000 |
| 13 | **D** - Less than 1 month | With ~$20k annual savings and ~$230 tool cost, payback is approximately 1 week. Even conservative estimates show < 1 month. |

### Section 4: Technical Setup

| # | Answer | Explanation |
|---|--------|-------------|
| 14 | **B** - `"editor.inlineSuggest.enabled": true` | This VS Code setting enables all inline suggestions including from Copilot. The Copilot-specific enable is separate. |
| 15 | **B** - Ctrl+Shift+I | This opens the Copilot Chat panel. Cmd+Shift+I on macOS. Ctrl+I opens inline chat. |

---

## Exercise Answer Key

### Exercise 1: Tool Comparison (Sample Answers)

| Feature | GitHub Copilot | Claude | ChatGPT |
|---------|----------------|--------|---------|
| Price | $19/mo | $20/mo (Pro) | $20/mo (Plus) |
| Best use case | Real-time coding | Complex reasoning | General assistance |
| IDE integration | Excellent | Limited | Limited |
| Context window | File-based | 200K tokens | 128K tokens |
| Offline capability | No | No | No |

### Exercise 2: Use Case Identification

| Scenario | Best Tool | Reasoning |
|----------|-----------|-----------|
| Writing API endpoint | Copilot | Real-time completion in IDE |
| Reviewing 500-line PR | Claude | Large context window |
| Explaining legacy code | Claude/ChatGPT | Detailed explanations |
| Generating unit tests | Copilot | Quick iteration in IDE |
| System architecture | Claude | Complex reasoning |
| Writing documentation | Claude | Structured, detailed output |
| Debugging complex bug | Claude | Can analyze full context |
| Learning new framework | ChatGPT | Conversational learning |

### Exercise 4: Expected Generated Functions

```javascript
// Function 1: Email Validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Function 2: Array Shuffle
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

### Exercise 5: Prompt Refinement Analysis

**Expected Findings:**
- Prompt A produces generic sort (numbers ascending)
- Prompt B produces number array sort
- Prompt C produces full object sorting with all parameters

**Key Insight:** Specificity dramatically improves output quality.

### Exercise 7: Productivity Baseline (Sample)

Without AI: 5-10 minutes for analyzeNumbers function
With AI: 30-60 seconds for same function

Expected improvement: 80-90% time reduction

---

## Common Mistakes to Watch For

### Quiz Mistakes

1. **Question 3:** Students may confuse Copilot Chat's limited capabilities with full internet access
2. **Question 6:** Some may think boilerplate is riskier than security code
3. **Question 10:** Students sometimes think function requirements are sensitive
4. **Question 12:** Math errors in ROI calculation

### Exercise Mistakes

1. **Exercise 3:** Students skip authentication step and wonder why Copilot doesn't work
2. **Exercise 4:** Accepting first suggestion without evaluation
3. **Exercise 5:** Not recognizing the pattern between prompt detail and output quality
4. **Exercise 7:** Using AI when supposed to establish baseline without it

---

## Discussion Points for Instructors

### Topic 1: AI Tool Selection
- Emphasize "right tool for the right job"
- Copilot = speed, Claude = depth
- Most professionals use multiple tools

### Topic 2: Security Concerns
- Never include secrets in prompts
- Review all AI code for vulnerabilities
- Follow company policies on AI tool usage

### Topic 3: Productivity Measurement
- Establish baselines before AI adoption
- Track time savings systematically
- ROI is typically very high

### Topic 4: Quality Control
- AI is a tool, not a replacement
- Human review always required
- Testing AI code is non-negotiable

---

## Grading Rubric

### Quiz (30 points)

| Score | Points | Percentage |
|-------|--------|------------|
| 15 correct | 30 | 100% |
| 14 correct | 28 | 93% |
| 13 correct | 26 | 87% |
| 12 correct | 24 | 80% |
| 11 correct | 22 | 73% |
| 10 correct | 20 | 67% |
| Below 10 | < 20 | < 67% |

**Passing:** 11+ correct (73%)

### Exercises (30 points)

| Exercise | Points | Criteria |
|----------|--------|----------|
| Ex 1: Tool Comparison | 4 | Complete table with reasoning |
| Ex 2: Use Cases | 4 | Correct tool identification |
| Ex 3: Environment Setup | 6 | All tools working (screenshots) |
| Ex 4: AI Generation | 6 | All functions generated and evaluated |
| Ex 5: Prompt Refinement | 4 | Analysis completed |
| Ex 7: Baseline | 4 | Both versions with timing |
| Ex 8: Configuration | 2 | Settings verified |

**Passing:** 21+ points (70%)

### Lab Completion (Pass/Fail)

**Pass Requirements:**
- All tools installed
- Copilot generating suggestions
- Chat responding
- Verification tests pass

---

## Module Completion Criteria

**Students pass Module 1 when:**
1. Quiz score ≥ 70%
2. Exercise score ≥ 70%
3. Lab completed (Pass)
4. All tools verified working

**Total Module Weight:** 12.5% of course (1/8 modules)

---

*Module 1 Answer Key - Instructor Reference*
*AI-Assisted Software Development Course*
