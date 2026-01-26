# Module 1 Quiz: Introduction to AI-Assisted Development

**Time Limit**: 20 minutes
**Passing Score**: 70%

---

## Multiple Choice (2 points each)

### Question 1
What is the primary advantage of Claude Code over GitHub Copilot for QA automation tasks?

a) It's free to use
b) It has a longer context window and stronger reasoning capabilities
c) It runs faster
d) It has better syntax highlighting

---

### Question 2
What does "hallucination" mean in the context of AI coding assistants?

a) The AI crashes and shows error messages
b) The AI generates plausible-looking but incorrect code
c) The AI takes too long to respond
d) The AI requires re-authentication

---

### Question 3
Which of the following is NOT a good use case for AI coding assistants?

a) Generating boilerplate code
b) Writing security-critical authentication code without review
c) Creating test scaffolding
d) Explaining unfamiliar code

---

### Question 4
What command starts a Claude Code session in the current directory?

a) `claude start`
b) `claude`
c) `claude init`
d) `claude --run`

---

### Question 5
Which pattern should you follow when writing tests?

a) DRY (Don't Repeat Yourself)
b) AAA (Arrange, Act, Assert)
c) MVC (Model, View, Controller)
d) SOLID

---

## True/False (1 point each)

### Question 6
AI-generated code should always be reviewed before committing to production.

- [ ] True
- [ ] False

---

### Question 7
Claude Code can only generate code in JavaScript and Python.

- [ ] True
- [ ] False

---

### Question 8
AI coding assistants work better with more context about the project.

- [ ] True
- [ ] False

---

### Question 9
You should always use AI for generating database schemas without manual review.

- [ ] True
- [ ] False

---

### Question 10
Claude Code can execute terminal commands and read files from your project.

- [ ] True
- [ ] False

---

## Short Answer (5 points each)

### Question 11
List three things AI coding assistants do well and three things they struggle with.

**AI does well:**
1. _____________
2. _____________
3. _____________

**AI struggles with:**
1. _____________
2. _____________
3. _____________

---

### Question 12
Explain why you should always review AI-generated test code before committing it.

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

### Question 13
What is the difference between project-level context and prompt-level context?

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## Practical (10 points)

### Question 14
Write an effective prompt to generate Jest tests for this function:

```javascript
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

Your prompt should include:
- Clear task description
- Specific test scenarios to cover
- Expected format

**Your prompt:**

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## Answer Key

*(For instructor use)*

1. b
2. b
3. b
4. b
5. b
6. True
7. False
8. True
9. False
10. True
11. See rubric
12. See rubric
13. See rubric
14. See rubric

### Rubrics for Short Answer

**Question 11 (5 points)**
- 3 valid "does well" items (1.5 points)
- 3 valid "struggles with" items (1.5 points)
- Accuracy of items (2 points)

Valid "does well": boilerplate, documentation, test generation, code explanation, refactoring, common patterns
Valid "struggles with": security-critical code, novel algorithms, current APIs, business logic, your preferences

**Question 12 (5 points)**
Should mention:
- AI can hallucinate (2 points)
- Tests might have incorrect assertions (1 point)
- Edge cases might be missing (1 point)
- Security implications (1 point)

**Question 13 (5 points)**
Should explain:
- Project context = CLAUDE.md, persistent (2 points)
- Prompt context = specific question, immediate (2 points)
- Clear differentiation (1 point)

**Question 14 (10 points)**
Should include:
- Clear task description (2 points)
- Specific test scenarios: valid email, invalid formats, edge cases (4 points)
- Expected format: test framework, naming convention (2 points)
- Quality of prompt structure (2 points)

---

## Scoring

- Multiple Choice: 10 points
- True/False: 5 points
- Short Answer: 15 points
- Practical: 10 points
- **Total: 40 points**

**Passing: 28+ points (70%)**
