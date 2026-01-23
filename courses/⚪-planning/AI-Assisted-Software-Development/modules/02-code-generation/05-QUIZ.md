# Module 2: Quiz
## GitHub Copilot Mastery

---

## Quiz Information

| Attribute | Details |
|-----------|---------|
| **Questions** | 20 |
| **Time Limit** | 20 minutes |
| **Passing Score** | 70% (14/20 correct) |
| **Attempts** | Unlimited |

---

## Section 1: Copilot Fundamentals (5 questions)

### Question 1
**What information does GitHub Copilot use to generate suggestions?**

- A) Only the current line you're typing
- B) The current file, open tabs, and file path/language
- C) Your entire hard drive
- D) Only your comments

---

### Question 2
**Which keyboard shortcut cycles to the next Copilot suggestion?**

- A) Tab
- B) Ctrl+Space
- C) Alt+] (Option+] on Mac)
- D) Ctrl+Enter

---

### Question 3
**What happens when you press Tab on a Copilot suggestion?**

- A) Dismisses the suggestion
- B) Shows alternative suggestions
- C) Accepts the entire suggestion
- D) Accepts one word at a time

---

### Question 4
**True or False: Copilot can access the internet in real-time to provide suggestions based on current documentation.**

- A) True
- B) False

---

### Question 5
**What is the primary factor that improves Copilot suggestion quality?**

- A) Typing faster
- B) Using a specific programming language
- C) Providing more context through comments and code
- D) Having a faster internet connection

---

## Section 2: Comment-Driven Development (5 questions)

### Question 6
**Which comment provides the BEST context for Copilot?**

**Option A:**
```javascript
// sort array
function sortArray(arr) {
```

**Option B:**
```javascript
// Sort array of objects by property in ascending order
// Returns new array without modifying original
// Example: sortByProp([{age: 25}, {age: 18}], 'age') => [{age: 18}, {age: 25}]
function sortByProp(arr, prop) {
```

- A) Option A
- B) Option B
- C) Both are equally effective
- D) Neither provides good context

---

### Question 7
**What should you include in a comment for BEST Copilot results?** (Select all that apply)

- A) What the function does
- B) Input parameters and types
- C) Expected output format
- D) Example input/output
- E) All of the above

---

### Question 8
**When Copilot generates incorrect code, what is the BEST first step?**

- A) Accept it and fix manually
- B) Close VS Code and restart
- C) Add more context to your comment
- D) Switch to a different AI tool

---

### Question 9
**What does "pattern establishment" mean in Copilot usage?**

- A) Copilot automatically fixes patterns in your code
- B) The first example you write influences how Copilot generates similar code
- C) You must follow specific coding patterns for Copilot to work
- D) Copilot creates design patterns automatically

---

### Question 10
**How does keeping multiple relevant files open affect Copilot?**

- A) It has no effect
- B) It slows down suggestions
- C) Copilot uses content from open files as additional context
- D) It causes conflicts in suggestions

---

## Section 3: Copilot Chat (5 questions)

### Question 11
**Which slash command generates unit tests for selected code?**

- A) `/generate-tests`
- B) `/tests`
- C) `/unittest`
- D) `/test`

---

### Question 12
**What does the `/explain` command do?**

- A) Explains how to use Copilot
- B) Explains the selected code in natural language
- C) Explains compilation errors
- D) Explains Git commands

---

### Question 13
**What is the `@workspace` command used for?**

- A) Creating new workspace
- B) Asking questions about your entire codebase
- C) Configuring workspace settings
- D) Sharing workspace with others

---

### Question 14
**Which is the correct way to open Copilot Chat panel?**

- A) Ctrl+C (Windows/Linux) / Cmd+C (Mac)
- B) Ctrl+Shift+I (Windows/Linux) / Cmd+Shift+I (Mac)
- C) Alt+C (Windows/Linux) / Option+C (Mac)
- D) F1

---

### Question 15
**What's the difference between Chat panel and inline chat?**

- A) Chat panel is for questions, inline is for code
- B) Chat panel has conversation history, inline is quick edits in context
- C) There is no difference
- D) Inline chat is faster

---

## Section 4: Best Practices & Security (5 questions)

### Question 16
**Which of the following should you ALWAYS do with AI-generated code?**

- A) Accept immediately without review
- B) Test and review before committing
- C) Add comments explaining it was AI-generated
- D) Run it in production first to test

---

### Question 17
**What is a common security risk with AI-generated code?**

- A) AI code runs slower
- B) AI may suggest deprecated or vulnerable patterns
- C) AI code uses too much memory
- D) AI code doesn't compile

---

### Question 18
**True or False: You should include API keys in comments to help Copilot understand your API integration.**

- A) True
- B) False

---

### Question 19
**What should you do if Copilot suggests code with `eval()` or dynamic code execution?**

- A) Accept it - Copilot knows best
- B) Review carefully as this is a potential security risk
- C) Always reject - `eval()` never has valid uses
- D) Accept but add a comment

---

### Question 20
**What is the recommended approach for using Copilot in a team environment?**

- A) Each developer uses their own patterns
- B) Establish coding standards that Copilot will follow
- C) Disable Copilot for team projects
- D) Only senior developers should use Copilot

---

## Bonus Questions (Optional)

### Bonus 1
**Describe a situation where you would use Copilot Chat instead of inline suggestions.**

[Your answer here]

---

### Bonus 2
**Write an effective comment that would generate a function to validate a credit card number using the Luhn algorithm.**

[Your comment here]

---

### Bonus 3
**What metrics would you track to measure Copilot effectiveness for your team?**

[Your answer here]

---

## Answer Key (Instructor Reference)

### Section 1 Answers

| Q | Answer | Explanation |
|---|--------|-------------|
| 1 | B | Copilot uses current file, open tabs, file path, and language mode |
| 2 | C | Alt+] (Option+]) cycles to next suggestion |
| 3 | C | Tab accepts the entire suggestion |
| 4 | B | False - Copilot uses training data, not live internet |
| 5 | C | More context (comments, code, types) = better suggestions |

### Section 2 Answers

| Q | Answer | Explanation |
|---|--------|-------------|
| 6 | B | Detailed comments with examples produce better results |
| 7 | E | All elements improve suggestion quality |
| 8 | C | Adding context is the best first approach |
| 9 | B | First examples establish patterns for similar code |
| 10 | C | Open files provide additional context for suggestions |

### Section 3 Answers

| Q | Answer | Explanation |
|---|--------|-------------|
| 11 | B | `/tests` generates unit tests |
| 12 | B | `/explain` explains selected code |
| 13 | B | `@workspace` queries the entire codebase |
| 14 | B | Ctrl+Shift+I (Cmd+Shift+I) opens Chat panel |
| 15 | B | Panel has history, inline is for quick contextual edits |

### Section 4 Answers

| Q | Answer | Explanation |
|---|--------|-------------|
| 16 | B | Always test and review AI-generated code |
| 17 | B | AI may suggest outdated or insecure patterns |
| 18 | B | Never include secrets in comments |
| 19 | B | eval() is a security risk - review carefully |
| 20 | B | Establish standards for consistent AI behavior |

---

## Scoring Guide

| Score | Grade | Status |
|-------|-------|--------|
| 20/20 | 100% | Excellent - Copilot Master |
| 18-19/20 | 90-95% | Very Good |
| 14-17/20 | 70-85% | Pass |
| 10-13/20 | 50-65% | Needs Review |
| Below 10 | < 50% | Retake Required |

---

*Module 2 Quiz - GitHub Copilot Mastery*
*AI-Assisted Software Development Course*
