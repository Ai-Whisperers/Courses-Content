# Module 12: AI-Assisted Testing & Advanced Workflows
## Exercises

---

## Exercise Overview

Complete these 10 exercises to practice AI-assisted testing and advanced workflows. These exercises will prepare you for the future of QA automation.

**Time Estimate:** 4-6 hours total
**Submission:** Add all code and documentation to your GitHub repository

---

## Exercise 1: AI Test Generation (45 min)

**Objective:** Use ChatGPT or Claude to generate test code

**Tasks:**
1. Write a detailed prompt for generating tests for one feature
2. Generate tests using AI
3. Review and correct any issues
4. Run tests to verify they work
5. Document what you had to fix

**Prompt template:**
```
Generate Playwright tests in TypeScript for [feature name].

Context:
- Application: [describe your app]
- URL: [base URL]
- Selectors: Use data-testid attributes

Requirements:
- [List specific test scenarios]
- Use Page Object Model pattern
- Include positive and negative cases
- Add proper assertions

Output format:
- Page object class
- Test file with describe blocks
```

**Deliverables:**
- Your prompt
- AI-generated code
- Fixed/working code
- List of corrections needed

---

## Exercise 2: Prompt Engineering Practice (30 min)

**Objective:** Improve your prompt engineering skills

**Tasks:**
1. Start with a basic prompt
2. Iterate 3 times, improving each time
3. Compare outputs from each iteration
4. Document what improvements helped

**Example progression:**
```
Iteration 1: "Write a test for login"
Iteration 2: "Write a Playwright test for login with email and password"
Iteration 3: [Your improved version with all context]
```

**Deliverables:**
- 3 prompts with their outputs
- Analysis of improvements
- Best practices learned

---

## Exercise 3: AI Debugging Session (30 min)

**Objective:** Use AI to debug a failing test

**Tasks:**
1. Find or create a failing test in your framework
2. Copy the error message and test code
3. Ask AI to diagnose and fix the issue
4. Implement the suggested fix
5. Verify test now passes

**Prompt template:**
```
My Playwright test is failing. Please help me debug it.

Error message:
[paste error]

Test code:
[paste code]

Page HTML (relevant section):
[paste HTML if applicable]

What I've tried:
[list attempts]

What is causing the failure and how do I fix it?
```

**Deliverables:**
- Original failing test
- AI conversation
- Fixed test
- Explanation of issue

---

## Exercise 4: AI Code Review (30 min)

**Objective:** Use AI to review and improve your test code

**Tasks:**
1. Select 2-3 test files from your framework
2. Ask AI to review for best practices
3. Implement at least 5 improvements
4. Document before/after changes

**Review prompt:**
```
Review this Playwright test code for:
- Best practices
- Potential flakiness
- Performance issues
- Code duplication
- Missing assertions
- Selector quality

[paste code]

Provide specific suggestions with code examples.
```

**Deliverables:**
- Original code
- AI suggestions
- Improved code
- Summary of changes

---

## Exercise 5: Test Case Generation from Requirements (45 min)

**Objective:** Convert user stories to test cases using AI

**Tasks:**
1. Write 3 user stories for features in your app
2. Use AI to generate test cases
3. Convert test cases to executable code
4. Run and verify tests

**User story format:**
```
As a [role]
I want to [action]
So that [benefit]

Acceptance criteria:
- [criterion 1]
- [criterion 2]
```

**Deliverables:**
- 3 user stories
- Generated test cases (Given/When/Then)
- Executable Playwright tests
- Test results

---

## Exercise 6: Docker Test Environment (45 min)

**Objective:** Run tests in a Docker container

**Tasks:**
1. Create Dockerfile for your tests
2. Build the Docker image
3. Run tests in container
4. Compare results with local run
5. Document the process

**Deliverables:**
```dockerfile
# Dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npx", "playwright", "test"]
```

```bash
# Commands used
docker build -t my-tests .
docker run my-tests
```

**Documentation:**
- Setup steps
- Any issues encountered
- Benefits observed

---

## Exercise 7: Parallel Execution Strategy (30 min)

**Objective:** Optimize test execution with parallelization

**Tasks:**
1. Measure current test suite execution time
2. Configure parallel workers
3. Implement test sharding
4. Re-measure and compare
5. Document optimal configuration

**Configuration to test:**
```javascript
// Try different worker counts
workers: 1,   // Baseline
workers: 2,
workers: 4,
workers: '50%',
```

**Deliverables:**
- Performance comparison table
- Optimal configuration
- Any tests that couldn't parallelize (why?)

---

## Exercise 8: AI-Generated Test Data (30 min)

**Objective:** Use AI to generate realistic test data

**Tasks:**
1. Describe your test data needs to AI
2. Generate data factory functions
3. Integrate into your tests
4. Verify data quality

**Prompt:**
```
Generate a test data factory for an e-commerce application.

Entities needed:
- Users (with different roles)
- Products (different categories)
- Orders (various statuses)
- Addresses

Requirements:
- Use @faker-js/faker
- Include edge cases (long names, special characters)
- Support overrides
- TypeScript types

Generate factory functions for each entity.
```

**Deliverables:**
- AI-generated factories
- Integration in tests
- Examples of generated data

---

## Exercise 9: Future Skills Assessment (45 min)

**Objective:** Evaluate your readiness for future QA roles

**Tasks:**
1. Complete self-assessment questionnaire
2. Identify skill gaps
3. Create learning plan
4. Find resources for each gap

**Self-Assessment Areas:**
```markdown
## QA Skills Assessment

Rate yourself 1-5 (1=Beginner, 5=Expert):

### Technical Skills
- [ ] Prompt engineering: __/5
- [ ] Cloud infrastructure: __/5
- [ ] Security testing: __/5
- [ ] Performance testing: __/5
- [ ] AI/ML concepts: __/5
- [ ] Container technologies: __/5

### Soft Skills
- [ ] Critical thinking: __/5
- [ ] Communication: __/5
- [ ] Problem solving: __/5
- [ ] Continuous learning: __/5

### Top 3 areas to improve:
1. [area] - [resource to learn]
2. [area] - [resource to learn]
3. [area] - [resource to learn]
```

**Deliverables:**
- Completed assessment
- Learning plan with timeline
- Resources identified

---

## Exercise 10: AI Testing Best Practices Guide (45 min)

**Objective:** Create a guide for your team on AI-assisted testing

**Tasks:**
1. Document your learnings from this module
2. Create prompt templates for common tasks
3. List do's and don'ts
4. Include examples

**Guide sections:**
```markdown
# AI-Assisted Testing Guide

## When to Use AI
- [situations]

## When NOT to Use AI
- [situations]

## Prompt Templates

### Test Generation
[template]

### Debugging
[template]

### Code Review
[template]

## Best Practices
1. [practice]
2. [practice]
3. [practice]

## Common Pitfalls
1. [pitfall and solution]
2. [pitfall and solution]

## Examples
[real examples from your work]
```

**Deliverables:**
- Complete guide (1-2 pages)
- 3+ prompt templates
- Real examples from exercises

---

## Submission Checklist

- [ ] All 10 exercises completed
- [ ] Code committed to GitHub
- [ ] Documentation complete
- [ ] AI conversations saved/documented
- [ ] Guide created and shared

---

## Grading Criteria

| Exercise | Points | Criteria |
|----------|--------|----------|
| AI Test Generation | 10 | Working tests from AI, fixes documented |
| Prompt Engineering | 10 | Clear improvement across iterations |
| AI Debugging | 10 | Issue diagnosed and fixed |
| AI Code Review | 10 | 5+ improvements implemented |
| Requirements to Tests | 10 | User stories converted to working tests |
| Docker Environment | 10 | Tests run in container |
| Parallel Execution | 10 | Optimized configuration documented |
| AI Test Data | 10 | Factories created and integrated |
| Skills Assessment | 10 | Honest assessment, learning plan |
| Best Practices Guide | 10 | Complete, useful guide |

**Total: 100 points**
**Passing: 70 points**

---

## Reflection Questions

After completing these exercises, answer:

1. What was the most surprising thing you learned about AI in testing?
2. What limitations of AI did you encounter?
3. How will you use AI in your daily work?
4. What skills do you need to develop further?
5. How do you see QA roles changing in 5 years?

---

*Module 12 Exercises*
*MentorMate QA Automation Course*
