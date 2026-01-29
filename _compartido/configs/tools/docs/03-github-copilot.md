# GitHub Copilot Configuration Guide

> **Last Updated:** December 2025
> **Source:** [GitHub Blog - Writing Great agents.md](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/) | [GitHub Copilot Documentation](https://docs.github.com/copilot)

## Overview

GitHub Copilot provides AI-powered code completion and the Copilot Coding Agent (CCA) for autonomous task execution. Configuration uses multiple file formats: `copilot-instructions.md`, `.instructions.md` files, `AGENTS.md`, and custom agents.

## File Structure

```
your-project/
├── AGENTS.md                           # Root agent instructions (universal)
├── .github/
│   ├── copilot-instructions.md         # Main repository instructions
│   ├── instructions/
│   │   ├── testing.instructions.md     # Path-specific instructions
│   │   └── typescript.instructions.md
│   ├── agents/
│   │   ├── test-writer.md              # Custom agent definitions
│   │   ├── code-reviewer.md
│   │   └── security-analyst.md
│   └── prompts/
│       ├── generate-tests.prompt.md    # Reusable prompts
│       └── security-review.prompt.md
└── src/
    └── AGENTS.md                       # Nested agent instructions
```

## Instruction File Formats

### 1. copilot-instructions.md

Main repository-level instructions applied to all Copilot interactions:

```markdown
# Project Instructions

## Overview
QA Automation framework using TypeScript and Playwright.

## Tech Stack
- TypeScript 5.x (strict mode)
- Playwright for E2E testing
- Jest for unit tests
- Node.js 20+

## Code Style
- Use async/await for all async operations
- No `any` types - use `unknown` or proper types
- Explicit return types on functions
- JSDoc comments for public APIs

## Testing
- AAA pattern: Arrange, Act, Assert
- One concept per test
- Use `data-testid` for selectors
- Mock external dependencies

## Commands
- `npm run build` - Build project
- `npm run test` - Run all tests
- `npm run test:e2e` - Run E2E tests
- `npm run lint` - Run linter
```

### 2. .instructions.md Files

Path-specific instructions with YAML frontmatter:

```markdown
---
applyTo: "tests/**/*.ts"
---

# Testing Instructions

All test files should:

1. Use descriptive test names: `should [action] when [condition]`
2. Follow AAA pattern (Arrange, Act, Assert)
3. Have one assertion concept per test
4. Use factory functions for test data
5. Mock all external dependencies

## Example Structure

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

test.describe('Login Feature', () => {
  test('should display error when credentials are invalid', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act
    await loginPage.login('invalid@email.com', 'wrongpassword');

    // Assert
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
```
```

### 3. AGENTS.md

Universal agent instructions (supported by Copilot, Claude, and others):

```markdown
# Repository Agent Instructions

## Project Context
This is a QA automation framework for e-commerce testing.

## Commands
Build: `npm run build`
Test: `npm run test`
Lint: `npm run lint`
E2E: `npm run test:e2e`

## Testing Requirements
- Minimum 80% code coverage
- All tests must pass before merging
- Use Page Object Model for E2E tests

## Code Style
- TypeScript strict mode
- No `any` types
- Async/await for async operations
- JSDoc for public APIs

## Project Structure
```
src/
  pages/      # Page Objects
  fixtures/   # Test data factories
  utils/      # Shared utilities
tests/
  e2e/        # End-to-end tests
  unit/       # Unit tests
```

## Git Workflow
- Branch naming: `feature/`, `fix/`, `chore/`
- Conventional commits required
- PRs require tests

## Boundaries - Do Not
- Modify production config files
- Commit secrets or credentials
- Skip tests or coverage checks
- Use hard-coded waits in tests
```

## Custom Agents

### Agent File Format

Create agents in `.github/agents/`:

```markdown
---
name: test-writer
description: Specialized agent for writing and maintaining tests
tools:
  - filesystem
  - github
  - playwright
model: gpt-4
---

# Test Writer Agent

You are a specialized test engineering agent. Your role is to write, maintain, and improve tests.

## Expertise
- Playwright E2E testing
- Jest unit testing
- Page Object Model pattern
- Test data management

## Guidelines
1. Always use AAA pattern
2. Create Page Objects for UI interactions
3. Use factory functions for test data
4. Mock all external APIs
5. Target 80% code coverage

## Example Test

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { createTestUser } from '@fixtures/users';

test('should login successfully with valid credentials', async ({ page }) => {
  // Arrange
  const user = createTestUser();
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  // Act
  await loginPage.login(user.email, user.password);

  // Assert
  await expect(page).toHaveURL('/dashboard');
});
```

## Boundaries
- Never modify source code (only tests)
- Never commit without running existing tests
- Never use hard-coded credentials
```

### Code Reviewer Agent

```markdown
---
name: code-reviewer
description: Code review specialist for quality and security
tools:
  - filesystem
  - github
---

# Code Reviewer Agent

You are a code review specialist focusing on quality, security, and best practices.

## Review Checklist

### Code Quality
- [ ] Follows project coding standards
- [ ] No code duplication
- [ ] Clear naming conventions
- [ ] Appropriate error handling
- [ ] Adequate test coverage

### Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] No SQL injection vulnerabilities
- [ ] Proper authentication checks
- [ ] Secure data handling

### Performance
- [ ] No N+1 queries
- [ ] Appropriate caching
- [ ] Efficient algorithms
- [ ] No memory leaks

## Review Format

Provide feedback in this structure:

### Summary
Brief overview of changes and overall assessment.

### Issues Found
1. **[Severity]** Description of issue
   - Location: `file:line`
   - Suggestion: How to fix

### Positive Aspects
Note good patterns and practices observed.

### Suggestions
Optional improvements for future consideration.
```

### Security Analyst Agent

```markdown
---
name: security-analyst
description: Security-focused code analysis
tools:
  - filesystem
  - github
---

# Security Analyst Agent

You analyze code for security vulnerabilities and compliance issues.

## Analysis Areas

### OWASP Top 10
1. Injection flaws
2. Broken authentication
3. Sensitive data exposure
4. XML external entities
5. Broken access control
6. Security misconfiguration
7. XSS vulnerabilities
8. Insecure deserialization
9. Using components with known vulnerabilities
10. Insufficient logging

## Report Format

### Executive Summary
Overall security posture assessment.

### Critical Issues
Vulnerabilities requiring immediate attention.

### Recommendations
Prioritized list of security improvements.

### Compliance Notes
Relevant regulatory considerations (GDPR, SOC2, etc.).
```

## Instructions with Filters

### Using applyTo

```markdown
---
applyTo: "src/api/**/*.ts"
---

# API Development Instructions

All API endpoints should:
- Use proper HTTP status codes
- Validate input parameters
- Include error handling
- Document with OpenAPI/Swagger
```

### Using excludeAgent

```markdown
---
applyTo: "**/*.ts"
excludeAgent: "copilot-review"
---

# General TypeScript Instructions

These instructions apply to all TypeScript files except during code review.
```

## Reusable Prompts

### .github/prompts/generate-tests.prompt.md

```markdown
---
description: Generate comprehensive tests for code
variables:
  - name: TARGET_FILE
    description: The file to generate tests for
---

Generate comprehensive tests for {{TARGET_FILE}}:

1. Analyze the file structure and exports
2. Identify all testable functions and classes
3. Create unit tests covering:
   - Happy path scenarios
   - Edge cases
   - Error conditions
   - Boundary values

4. Use the project's testing conventions:
   - Jest for unit tests
   - AAA pattern
   - Factory functions for test data
   - Mocking for external dependencies

5. Ensure minimum 80% code coverage

Output the complete test file ready for use.
```

### .github/prompts/create-page-object.prompt.md

```markdown
---
description: Create Page Object for a web page
variables:
  - name: PAGE_URL
    description: URL of the page
  - name: PAGE_NAME
    description: Name for the Page Object class
---

Create a Page Object class for {{PAGE_URL}}:

## Requirements
1. Class name: {{PAGE_NAME}}Page
2. Extend BasePage class
3. Define all interactive elements as Locator properties
4. Create methods for user actions
5. Use data-testid selectors when available

## Template

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class {{PAGE_NAME}}Page extends BasePage {
  // Define locators
  readonly elementName: Locator;

  constructor(page: Page) {
    super(page);
    this.elementName = page.getByTestId('element-id');
  }

  // Navigation
  async goto(): Promise<void> {
    await this.page.goto('{{PAGE_URL}}');
  }

  // Actions
  async performAction(): Promise<void> {
    // Implementation
  }
}
```
```

## MCP Server Integration

GitHub Copilot Coding Agent supports MCP servers:

### Default Servers
- **GitHub MCP Server** - Repository operations
- **Playwright MCP Server** - Browser automation

### Custom MCP Configuration

Configure in repository settings or organization `.github` repository.

## Best Practices

### Writing Effective agents.md

Based on analysis of 2,500+ repositories:

1. **Be Specific**
   - Bad: "You are a helpful coding assistant"
   - Good: "You are a test engineer who writes Playwright tests following Page Object Model"

2. **Cover Six Core Areas**
   - Commands (build, test, lint)
   - Testing (patterns, coverage)
   - Project structure (directories, conventions)
   - Code style (language-specific guidelines)
   - Git workflow (branches, commits)
   - Boundaries (what NOT to do)

3. **Include Examples**
   - Show both valid and invalid code patterns
   - Provide template structures

4. **Set Clear Boundaries**
   - List things the agent should never do
   - Protect sensitive files and configurations

5. **Iterate and Refine**
   - Start simple, test, add detail when needed
   - The best agent files grow through iteration

### File Organization

```
.github/
├── copilot-instructions.md     # Global instructions
├── instructions/
│   ├── _shared.instructions.md # Shared across paths
│   ├── api.instructions.md     # API-specific
│   ├── tests.instructions.md   # Test-specific
│   └── ui.instructions.md      # UI-specific
├── agents/
│   ├── test-writer.md          # Test generation
│   ├── code-reviewer.md        # Code review
│   └── docs-writer.md          # Documentation
└── prompts/
    ├── generate-tests.prompt.md
    └── review-security.prompt.md
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Instructions not loading | Check file location and naming |
| Agent not available | Verify `.github/agents/` structure |
| Prompts not recognized | Check YAML frontmatter syntax |
| applyTo not matching | Verify glob pattern syntax |
| Custom agent conflicts | Use excludeAgent property |

## Resources

- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [How to Write Great agents.md](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [Awesome GitHub Copilot](https://github.com/github/awesome-copilot)
- [Custom Instructions in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [GitHub Changelog - Copilot Updates](https://github.blog/changelog/)
