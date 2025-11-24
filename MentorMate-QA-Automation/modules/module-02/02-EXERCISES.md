# Module 2: Context Engineering - Exercises

**Total Time**: 2 hours
**Format**: Individual work with instructor review

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Exercise Overview

This module contains three hands-on exercises designed to reinforce your understanding of context engineering concepts:

1. **Exercise 2.1**: Create a CLAUDE.md file (45 minutes)
2. **Exercise 2.2**: Transform bad prompts into good ones (30 minutes)
3. **Exercise 2.3**: Practice iterative test generation (45 minutes)

---

## Exercise 2.1: Create a CLAUDE.md File

**Objective**: Create an effective CLAUDE.md file for a sample project

**Duration**: 45 minutes

**Difficulty**: Intermediate

### Scenario

You've been assigned to work on the RealWorld example application - a Medium.com clone built with Node.js and Express. Your first task is to create a CLAUDE.md file that will help Claude understand the project when generating tests.

### Steps

1. **Clone the sample project** (5 minutes):
   ```bash
   git clone https://github.com/gothinkster/node-express-realworld-example-app
   cd node-express-realworld-example-app
   ```

2. **Explore the project structure** (10 minutes):
   - Review the directory structure
   - Examine package.json for dependencies
   - Look at existing code in `routes/`, `models/`, and `middleware/`
   - Check if there are existing tests

3. **Create CLAUDE.md** (25 minutes):

   Create a file called `CLAUDE.md` in the project root with the following sections:

   - **Project Overview**: What does this application do?
   - **Tech Stack**: What technologies are used?
   - **Architecture**: How is the project structured?
   - **Code Conventions**: What patterns are used in the codebase?
   - **Testing Requirements**: What testing approach should be used?
   - **Important Files**: Which files are critical to understand?
   - **Current Focus**: Set focus to "testing the authentication module"

4. **Verify the context** (5 minutes):

   Start Claude and ask:
   ```
   What are our testing requirements?
   ```

   Claude should reference your CLAUDE.md file and explain the testing requirements you documented.

### Deliverables

Submit your `CLAUDE.md` file that includes:
- ✓ All required sections (Overview, Tech Stack, Architecture, etc.)
- ✓ Accurate information about the project
- ✓ Clear testing requirements
- ✓ Specific focus on authentication module

### Grading Rubric (100 points)

| Criteria | Excellent (90-100) | Good (70-89) | Needs Improvement (50-69) | Insufficient (0-49) |
|----------|-------------------|--------------|---------------------------|---------------------|
| **Completeness** (25 pts) | All sections present and detailed | All sections present, some lacking detail | Missing 1-2 sections | Missing 3+ sections |
| **Accuracy** (25 pts) | Information matches project exactly | Minor inaccuracies | Several inaccuracies | Major misunderstandings |
| **Testing Requirements** (25 pts) | Comprehensive, specific, actionable | Good but missing some details | Vague or incomplete | Missing or incorrect |
| **Clarity** (15 pts) | Clear, well-organized, easy to follow | Generally clear | Some confusion | Hard to understand |
| **Verification** (10 pts) | Claude correctly uses context | Mostly works | Partially works | Doesn't work |

### Example Structure

```markdown
# Project: RealWorld Example App

## Overview
[Your description here]

## Tech Stack
[List technologies]

## Architecture
[Describe structure]

## Code Conventions
[Document patterns]

## Testing Requirements
[Specify test approach - this is key!]

## Important Files
[List critical files]

## Current Focus
Testing the authentication module including:
- User registration
- User login
- JWT token generation
- Authorization middleware
```

### Tips for Success

- Read the actual code before documenting
- Be specific about testing frameworks and patterns
- Include version numbers for key dependencies
- Focus on what's actually in the project, not what you think should be there
- Test your CLAUDE.md by asking Claude specific questions

---

## Exercise 2.2: Prompt Improvement

**Objective**: Transform vague prompts into effective, context-rich prompts

**Duration**: 30 minutes

**Difficulty**: Beginner to Intermediate

### Instructions

Transform the following bad prompts into good prompts using the four-component structure: [Context] + [Task] + [Requirements] + [Format]

For each prompt, provide:
1. Your improved version
2. Explanation of what you added
3. Why your version is better

### Prompt 1: Test Generation (10 minutes)

**Bad Prompt**:
```
Write tests
```

**Your Improved Prompt**:
```
[Write your improved prompt here]




```

**Explanation**:
```
[Explain what you added and why]
```

---

### Prompt 2: Bug Fix (10 minutes)

**Bad Prompt**:
```
Fix the bug
```

**Context**: There's a function that's not handling null values correctly.

**Your Improved Prompt**:
```
[Write your improved prompt here]




```

**Explanation**:
```
[Explain what you added and why]
```

---

### Prompt 3: Code Documentation (10 minutes)

**Bad Prompt**:
```
Document this code
```

**Context**: You have a complex data processing function that needs JSDoc comments.

**Your Improved Prompt**:
```
[Write your improved prompt here]




```

**Explanation**:
```
[Explain what you added and why]
```

---

### Deliverables

Submit a document with:
- ✓ All three improved prompts
- ✓ Explanations for each
- ✓ Use of the four-component structure

### Grading Rubric (100 points)

| Criteria | Points | Description |
|----------|--------|-------------|
| **Context Clarity** | 20 pts | Each prompt includes sufficient background information |
| **Task Specificity** | 20 pts | Clear, specific tasks (not vague requests) |
| **Requirements Detail** | 30 pts | Specific constraints, scenarios, and expectations |
| **Format Specification** | 20 pts | Clear output format and structure requirements |
| **Explanations** | 10 pts | Thoughtful explanations of improvements |

### Example of Good vs Bad

**Bad**:
```
Make it faster
```

**Good**:
```
Optimize the calculateUserMetrics function in src/analytics.ts for better performance.

Current issue:
- Function processes 10,000+ user records
- Takes 5+ seconds to complete
- Causes UI to freeze

Requirements:
- Reduce execution time to under 1 second
- Maintain existing functionality
- Add performance metrics logging
- Consider using memoization or caching

Approach:
1. Profile the current code to identify bottlenecks
2. Suggest specific optimizations with code examples
3. Explain trade-offs of each approach
```

---

## Exercise 2.3: Iterative Test Generation

**Objective**: Practice the iterative refinement process to generate production-ready tests

**Duration**: 45 minutes

**Difficulty**: Intermediate to Advanced

### Scenario

You need to generate comprehensive tests for a user registration function. You'll start with a basic prompt and progressively refine it through conversation with Claude.

### Function to Test

```javascript
// src/services/userService.js
async function registerUser(userData) {
  // Validate email format
  if (!isValidEmail(userData.email)) {
    throw new ValidationError('Invalid email format');
  }

  // Check if user already exists
  const existingUser = await db.users.findByEmail(userData.email);
  if (existingUser) {
    throw new ConflictError('User already exists');
  }

  // Validate password strength
  if (userData.password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Create user
  const user = await db.users.create({
    email: userData.email,
    password: hashedPassword,
    username: userData.username,
    createdAt: new Date()
  });

  // Send welcome email
  await emailService.sendWelcomeEmail(user.email);

  return user;
}
```

### Steps

1. **Initial Prompt** (5 minutes):

   Start with a simple prompt:
   ```
   Generate tests for user registration
   ```

   Review Claude's output. What's missing? What could be better?

2. **First Refinement** (10 minutes):

   Add specifics based on what was missing:
   ```
   Good, but also add:
   - Test for email already exists (should throw ConflictError)
   - Test for password too weak (should throw ValidationError)
   - Test for invalid email format
   - Use jest.mock for database and email service
   ```

   Review the updated output.

3. **Second Refinement** (10 minutes):

   Improve the structure:
   ```
   Split into separate describe blocks for:
   - Input validation tests
   - Business rule tests (duplicate check, password strength)
   - Integration tests (database and email service)

   Also add:
   - Use beforeEach for common setup
   - Add comments explaining each test
   - Use test factories for user data
   ```

   Review the output again.

4. **Final Refinement** (10 minutes):

   Polish the details:
   ```
   Improve the tests by:
   - Making assertions more specific (check exact error messages)
   - Add edge cases (empty strings, null values, special characters)
   - Verify that sendWelcomeEmail is called with correct parameters
   - Add a test that password is hashed (not stored plain text)
   ```

5. **Documentation** (10 minutes):

   Document your refinement process:
   - What was the initial output like?
   - What changed with each refinement?
   - What did you learn about iterative refinement?

### Deliverables

Submit:
1. **Conversation Log**: Your complete conversation with Claude (all prompts and responses)
2. **Final Test File**: The production-ready test code
3. **Refinement Analysis**: A document explaining:
   - What was missing in each iteration
   - Why you made each refinement
   - Lessons learned about the iterative process

### Grading Rubric (100 points)

| Criteria | Points | Description |
|----------|--------|-------------|
| **Initial Prompt** | 10 pts | Started with a simple, appropriate prompt |
| **Progressive Refinement** | 30 pts | Each refinement added meaningful improvements |
| **Final Test Quality** | 30 pts | Tests are comprehensive, well-structured, production-ready |
| **Test Coverage** | 15 pts | Covers happy path, error cases, edge cases, integration |
| **Documentation** | 15 pts | Clear explanation of refinement process and learnings |

### Success Criteria

Your final tests should include:

- ✓ Tests for successful registration
- ✓ Tests for duplicate email
- ✓ Tests for invalid email format
- ✓ Tests for weak password
- ✓ Tests for edge cases (null, empty, special characters)
- ✓ Verification that password is hashed
- ✓ Verification that welcome email is sent
- ✓ Proper mocking of database and email service
- ✓ Clear describe blocks organizing tests
- ✓ Comments explaining test purpose
- ✓ Use of factories or fixtures for test data

### Tips for Success

- Don't expect perfection on the first try
- Each refinement should target specific improvements
- Review the output carefully before each refinement
- Be specific in your refinement requests
- Don't refine more than 4-5 times (if you need more, start fresh)
- Focus on incremental improvements, not complete rewrites

### Example Refinement Pattern

```
Iteration 1: Get basic structure
Iteration 2: Add missing test scenarios
Iteration 3: Improve organization and structure
Iteration 4: Polish details and edge cases
```

---

## Submission Guidelines

### For All Exercises

1. **File Naming**:
   - Exercise 2.1: `CLAUDE.md`
   - Exercise 2.2: `exercise-2-2-prompt-improvement.md`
   - Exercise 2.3: `exercise-2-3-conversation-log.txt` and `exercise-2-3-tests.js`

2. **Format**:
   - Use markdown for documentation
   - Include your name and date at the top
   - Use code blocks for code and prompts

3. **Submission**:
   - Submit via [your LMS/submission method]
   - Due date: [as specified by instructor]

---

## Common Mistakes to Avoid

### Exercise 2.1 (CLAUDE.md)
- ❌ Making up technologies that aren't in the project
- ❌ Being too generic ("We use Node.js") instead of specific ("Node.js 14.x with Express 4.x")
- ❌ Copying the template without customizing
- ❌ Forgetting to verify the context works

### Exercise 2.2 (Prompt Improvement)
- ❌ Adding too much information (overwhelming)
- ❌ Still being vague after improvement
- ❌ Not including examples of expected output
- ❌ Missing one of the four components

### Exercise 2.3 (Iterative Refinement)
- ❌ Making too many changes at once
- ❌ Starting over instead of refining
- ❌ Not explaining what you want changed
- ❌ Accepting the first output without review

---

## Additional Resources

- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [Example CLAUDE.md files](../examples/claude-md/)
- [Prompt library for QA](../prompts/)

---

[Back to Module Overview](./MODULE-OVERVIEW.md)
