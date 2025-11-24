# Module 12: AI-Assisted Testing & Advanced Workflows
## Hands-On Lab

---

## Lab Overview

In this lab, you'll use AI tools to generate tests, debug issues, and optimize your test framework. You'll also set up container-based testing and explore the future skills needed for QA engineers.

**Duration:** 90 minutes
**Prerequisites:** Completed Modules 1-11, ChatGPT/Claude account

---

## Part 1: AI Test Generation (25 min)

### Step 1.1: Prepare Your Prompt

Choose a feature from your test application. Create a detailed prompt:

```markdown
Generate Playwright tests in TypeScript for a [FEATURE NAME].

## Application Context
- Base URL: [YOUR_URL]
- Application type: [e-commerce/social/etc.]

## Feature Description
[Describe the feature in detail]

## Elements
- [Element 1]: [data-testid="..."]
- [Element 2]: [data-testid="..."]

## Test Scenarios Needed
1. [Happy path scenario]
2. [Error scenario]
3. [Edge case scenario]

## Requirements
- Use Page Object Model
- Include proper assertions
- Handle loading states
- Use data-testid selectors

## Output Format
1. Page object class
2. Test file with describe blocks
3. Any helper functions needed
```

### Step 1.2: Generate Tests with AI

1. Open ChatGPT or Claude
2. Paste your prompt
3. Review the generated code

### Step 1.3: Evaluate the Output

Check for these common AI issues:

```typescript
// Common issues to look for:

// 1. Hallucinated selectors
await page.click('.btn-submit'); // Does this actually exist?

// 2. Missing waits
await page.click('#submit');
await expect(page).toHaveURL('/success'); // Needs wait between!

// 3. Incorrect assertions
expect(price).toBe('$10.00'); // Should use toContain or regex

// 4. Outdated syntax
page.waitForSelector('.item'); // Should use locator pattern
```

### Step 1.4: Fix and Integrate

1. Copy the AI-generated code to your project
2. Fix any issues identified
3. Run the tests
4. Document what you had to change

Create a file `AI-GENERATION-LOG.md`:

```markdown
# AI Test Generation Log

## Feature: [Name]
## Date: [Date]
## AI Tool: [ChatGPT/Claude]

### Prompt Used
[Your prompt]

### Issues Found
1. [Issue] - [Fix applied]
2. [Issue] - [Fix applied]

### Final Working Code
[Link to file]

### Lessons Learned
- [What worked well]
- [What to include in future prompts]
```

---

## Part 2: AI Debugging Session (20 min)

### Step 2.1: Find or Create a Failing Test

Option A: Use an existing failing test
Option B: Create an intentionally broken test:

```typescript
// tests/debug-exercise.spec.ts
import { test, expect } from '@playwright/test';

test('intentionally broken test', async ({ page }) => {
  await page.goto('/login');

  // Bug 1: Wrong selector
  await page.fill('.email-input', 'user@example.com');

  // Bug 2: Missing wait
  await page.click('#login-btn');
  const welcomeText = await page.textContent('.welcome');

  // Bug 3: Incorrect assertion
  expect(welcomeText).toBe('Welcome back!');
});
```

### Step 2.2: Get AI Help for Debugging

Create a debugging prompt:

```markdown
My Playwright test is failing. Help me debug it.

## Error Message
[Paste the full error from terminal]

## Test Code
```typescript
[Paste your test code]
```

## HTML Structure (relevant part)
```html
[Paste from DevTools Elements panel]
```

## What I've Tried
- [List your debugging attempts]

## Questions
1. What is causing this failure?
2. How do I fix it?
3. How can I prevent similar issues?
```

### Step 2.3: Implement the Fix

1. Apply the AI's suggestions
2. Run the test again
3. If still failing, refine your prompt with new information

### Step 2.4: Document the Process

Add to your log:

```markdown
## Debugging Session

### Original Error
[Error message]

### AI Diagnosis
[What the AI identified]

### Solution Applied
[Code changes made]

### Prevention Strategy
[How to avoid this in future]
```

---

## Part 3: AI Code Review (15 min)

### Step 3.1: Select Code for Review

Choose 2-3 test files from your framework (100-200 lines total).

### Step 3.2: Create Review Prompt

```markdown
Review this Playwright test code for:
- Best practices adherence
- Potential flakiness
- Performance issues
- Code duplication
- Missing assertions
- Security concerns
- Maintainability

```typescript
[Paste your code here]
```

Provide specific, actionable suggestions with code examples for each issue found.
```

### Step 3.3: Implement Improvements

1. Review AI suggestions
2. Prioritize improvements
3. Implement at least 5 changes
4. Commit with descriptive message

```bash
git commit -m "refactor: apply AI code review suggestions

- Added explicit waits for stability
- Extracted common selectors to constants
- Improved assertion messages
- Added error handling
- Removed code duplication"
```

---

## Part 4: Docker Test Environment (15 min)

### Step 4.1: Create Dockerfile

Create `Dockerfile` in your project root:

```dockerfile
# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy test files
COPY . .

# Run tests
CMD ["npx", "playwright", "test"]
```

### Step 4.2: Create Docker Compose (Optional)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  tests:
    build: .
    volumes:
      - ./test-results:/app/test-results
      - ./playwright-report:/app/playwright-report
    environment:
      - CI=true
      - BASE_URL=http://host.docker.internal:3000
```

### Step 4.3: Build and Run

```bash
# Build the image
docker build -t playwright-tests .

# Run tests
docker run --rm playwright-tests

# Run with report output
docker run --rm -v $(pwd)/playwright-report:/app/playwright-report playwright-tests

# Or use docker-compose
docker-compose up --build
```

### Step 4.4: Verify Results

1. Check test output in terminal
2. View generated reports
3. Compare with local run results

---

## Part 5: Prompt Engineering Practice (10 min)

### Step 5.1: Iterative Improvement Exercise

Start with a basic prompt and improve it through 3 iterations:

**Iteration 1 - Basic:**
```
Write a test for adding items to cart
```

**Iteration 2 - Add Context:**
```
Write a Playwright test for adding items to a shopping cart.
The cart should show updated item count and total price.
```

**Iteration 3 - Complete:**
```
Write a Playwright test in TypeScript for adding items to a shopping cart.

Context:
- E-commerce site at https://example.com
- Product page has "Add to Cart" button with data-testid="add-to-cart"
- Cart icon shows count with data-testid="cart-count"
- Cart page shows items and total

Test scenarios:
1. Add single item - verify count increases
2. Add multiple of same item - verify quantity updates
3. Add different items - verify total calculation

Use Page Object Model with:
- ProductPage class
- CartPage class

Include assertions for:
- Cart count updates
- Price calculations
- Item details
```

### Step 5.2: Compare Outputs

| Iteration | Lines of Code | Quality | Usability |
|-----------|--------------|---------|-----------|
| 1 | ~10 | Poor | Needs major work |
| 2 | ~25 | Medium | Needs some fixes |
| 3 | ~60 | Good | Minor tweaks only |

---

## Part 6: Future Skills Assessment (5 min)

### Step 6.1: Quick Self-Assessment

Rate yourself 1-5:

```markdown
## QA Skills Self-Assessment

### Technical
- [ ] Prompt engineering: __/5
- [ ] Cloud/containers: __/5
- [ ] Security testing: __/5
- [ ] Performance testing: __/5

### Soft Skills
- [ ] Critical thinking: __/5
- [ ] Communication: __/5

### Top 3 Areas to Improve
1. ____________
2. ____________
3. ____________
```

### Step 6.2: Create Learning Goal

```markdown
## 30-Day Learning Goal

**Skill to improve:** [Choose one]

**Resources:**
- [Course/tutorial]
- [Practice project]
- [Community to join]

**Milestones:**
- Week 1: [Goal]
- Week 2: [Goal]
- Week 3: [Goal]
- Week 4: [Demonstrate skill]
```

---

## Lab Completion Checklist

- [ ] Generated tests using AI
- [ ] Documented AI output issues
- [ ] Fixed AI-generated code
- [ ] Completed debugging session
- [ ] Implemented code review suggestions
- [ ] Created Dockerfile
- [ ] Ran tests in container
- [ ] Practiced prompt engineering
- [ ] Completed skills assessment
- [ ] Created learning goal

---

## Deliverables

1. **AI-GENERATION-LOG.md** - Documentation of AI usage
2. **Working AI-generated tests** - Integrated in your framework
3. **Dockerfile** - Container configuration
4. **Skills assessment** - Self-evaluation document

---

## Troubleshooting

### Docker Issues

```bash
# If container can't reach localhost
# Use host.docker.internal instead of localhost

# If permission issues
docker run --user $(id -u):$(id -g) playwright-tests
```

### AI Output Issues

- If AI uses outdated syntax, specify "Playwright 1.40+"
- If selectors are wrong, provide HTML examples
- If tests are flaky, ask about "best practices for stability"

---

## Next Steps

1. Complete Module 12 exercises
2. Take Module 12 quiz
3. Begin Final Project
4. Apply all 12 modules!

---

*Module 12 Lab - AI-Assisted Testing*
*MentorMate QA Automation Course*
