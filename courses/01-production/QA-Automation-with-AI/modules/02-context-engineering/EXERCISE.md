# Exercise 2: Context Engineering

## Objective

Practice creating effective context files and prompts that produce accurate AI responses for QA automation tasks.

## Duration: 1.5 hours

---

## Part 1: Create a CLAUDE.md File (30 min)

### Task

Create a CLAUDE.md file for a sample e-commerce project.

### Instructions

1. Create a new folder called `practice-project`
2. Inside, create a `CLAUDE.md` file with the following sections:

```markdown
# Project Name

## Overview
[Brief description of what the project does]

## Tech Stack
[List of technologies used]

## Testing Requirements
[Testing conventions and requirements]

## Code Style
[Coding conventions to follow]

## Important Notes
[Any special considerations]
```

### Requirements

Your CLAUDE.md should include:
- Project description (e-commerce site for selling electronics)
- Tech stack: React, Node.js, PostgreSQL, Playwright for testing
- Testing: Page Object Model required, minimum 80% coverage
- Code style: TypeScript, ESLint with Airbnb config
- Notes: All tests should run in parallel, use data-testid for selectors

### Deliverable

A complete CLAUDE.md file that could guide AI in generating appropriate tests.

---

## Part 2: Write Effective Prompts (30 min)

### Task

Practice writing prompts at different context levels.

### Exercise 2.1: Poor vs Good Prompts

Compare these prompts and identify why one is better:

**Prompt A:**
```
Write a test for the login page
```

**Prompt B:**
```
Write a Playwright test for the login page with these requirements:
- Use Page Object Model pattern
- Test valid login with correct credentials
- Test invalid login with wrong password
- Test empty field validation
- Use data-testid selectors
- Include proper assertions for success/error states
```

**Question:** Why is Prompt B better? List at least 3 reasons.

### Exercise 2.2: Write Your Own Prompts

Write prompts for these scenarios:

1. **Test the shopping cart functionality**
   - Write a prompt that specifies exactly what to test
   - Include expected behaviors and edge cases

2. **Generate API tests for user registration**
   - Specify the endpoint details
   - Include validation requirements
   - Mention error scenarios to test

### Deliverable

Written prompts for both scenarios with clear specifications.

---

## Part 3: Iterative Refinement (30 min)

### Task

Practice the iterative refinement process.

### Scenario

You asked AI to generate a login test and received this:

```typescript
test('login test', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#username', 'user');
  await page.fill('#password', 'pass');
  await page.click('button');
  await expect(page).toHaveURL('/dashboard');
});
```

### Exercise 3.1: Identify Issues

List at least 5 problems with this test.

### Exercise 3.2: Refinement Prompts

Write follow-up prompts to fix each issue. For example:
- "Use data-testid selectors instead of CSS selectors"
- "Add proper wait conditions before assertions"

### Exercise 3.3: Final Version

Write what the improved test should look like after all refinements.

---

## Submission Checklist

- [ ] CLAUDE.md file created with all required sections
- [ ] Explanation of why Prompt B is better (3+ reasons)
- [ ] Prompts written for shopping cart and user registration
- [ ] 5+ issues identified in the sample test
- [ ] Refinement prompts for each issue
- [ ] Final improved test version

---

## Evaluation Criteria

| Criteria | Points |
|----------|--------|
| CLAUDE.md completeness and clarity | 30 |
| Prompt quality and specificity | 30 |
| Issue identification accuracy | 20 |
| Refinement effectiveness | 20 |
| **Total** | **100** |

---

## Tips

- Be specific in your prompts - vague inputs produce vague outputs
- Include examples when possible
- Specify the output format you want
- Think about edge cases and error scenarios
- Consider maintainability when specifying test structure
