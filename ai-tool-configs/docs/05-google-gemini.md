# Google Gemini Code Assist Configuration Guide

> **Last Updated:** December 2025
> **Source:** [Gemini Code Assist Documentation](https://developers.google.com/gemini-code-assist/docs/overview) | [Google I/O 2025 Updates](https://blog.google/technology/developers/gemini-code-assist-updates-google-io-2025/)

## Overview

Gemini Code Assist is Google's AI-powered coding assistant, available in VS Code, JetBrains IDEs, and Google Cloud. It now features an **Agent Mode** powered by Gemini CLI for autonomous task execution. Configuration uses `GEMINI.md` or `AGENT.md` files.

## Important: Agent Mode Migration

> **Note:** As of October 2025, Gemini Code Assist tools are deprecated and replaced by **Agent Mode**. Ensure you're using the latest configuration patterns.

## File Structure

```
your-project/
├── GEMINI.md                    # Project instructions (root)
├── AGENT.md                     # Alternative name (same function)
├── .gemini/
│   ├── settings.json            # Model and feature settings
│   ├── styleguide.md            # Code review style guide (GitHub)
│   ├── sandbox.Dockerfile       # Custom sandbox environment
│   └── extensions/
│       └── qa-testing/
│           ├── gemini-extension.json
│           └── GEMINI.md
└── src/
    └── GEMINI.md                # Subdirectory instructions
```

## Configuration Files

### GEMINI.md (or AGENT.md)

Create at project root to provide context to Gemini:

```markdown
# Project Context

## Overview
QA Automation framework for e-commerce testing using TypeScript and Playwright.

## Tech Stack
- **Language:** TypeScript 5.x (strict mode)
- **Runtime:** Node.js 20+
- **E2E Testing:** Playwright
- **Unit Testing:** Jest
- **API Testing:** Playwright API / Supertest
- **CI/CD:** GitHub Actions

## Project Structure
```
src/
├── pages/           # Page Object classes
├── fixtures/        # Test data factories
├── utils/           # Shared utilities
└── api/             # API clients

tests/
├── e2e/             # End-to-end tests
├── unit/            # Unit tests
└── api/             # API tests
```

## Code Style

### TypeScript
- Use async/await for all async operations
- No `any` types - use `unknown` or proper generics
- Explicit return types on public functions
- JSDoc comments for public APIs

### Naming
- Files: `kebab-case.ts`
- Classes: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`

## Testing Conventions

### Patterns
- AAA: Arrange, Act, Assert
- Page Object Model for E2E
- Factory functions for test data

### Selectors (Priority Order)
1. `data-testid` attributes
2. Accessible roles and labels
3. Text content
4. CSS selectors

### Coverage
- Minimum 80% line coverage
- All critical paths tested
- Error scenarios covered

## Commands
```bash
npm run build        # Build project
npm run test         # Run all tests
npm run test:e2e     # Run E2E tests
npm run test:unit    # Run unit tests
npm run lint         # Run linter
npm run typecheck    # Type checking
```

## Error Handling
- Use custom error classes
- Include error codes
- Log with context
- Never swallow errors

## Security Rules
- Never commit secrets
- Validate all inputs
- Use parameterized queries
- Sanitize user output

## Do Not Modify
- `playwright.config.ts` (CI configuration)
- `jest.config.js` (shared config)
- Files in `/config/production/`
```

### .gemini/settings.json

```json
{
  "model": "gemini-2.5-pro",
  "contextFiles": ["GEMINI.md", "README.md"],
  "features": {
    "codeCompletion": true,
    "chat": true,
    "agentMode": true,
    "codeTransformation": true
  },
  "telemetry": {
    "enabled": true
  },
  "mcp": {
    "servers": {
      "filesystem": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]
      },
      "github": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"]
      }
    }
  }
}
```

### .gemini/styleguide.md (For GitHub Code Review)

```markdown
# Code Review Style Guide

## Review Focus Areas

### Code Quality
- Check for code duplication
- Verify error handling
- Ensure proper typing
- Review naming conventions

### Security
- No hardcoded secrets
- Input validation present
- SQL injection prevention
- XSS prevention

### Testing
- Adequate test coverage
- Tests follow AAA pattern
- Edge cases covered
- Mocks used appropriately

### Performance
- No N+1 queries
- Appropriate caching
- Efficient algorithms

## Feedback Format
- Be constructive and specific
- Suggest improvements, don't just criticize
- Reference project conventions
- Prioritize feedback (critical vs nice-to-have)
```

## Agent Mode

### Capabilities

Agent Mode provides a pair programmer experience:
- Ask questions about code
- Get solutions to complex multi-step tasks
- Generate code from requirements
- Configure MCP servers
- Review and approve plans before execution

### Using Rules in Agent Mode

```markdown
# Rules for Agent Mode

## Always
- Run tests after code changes
- Add unit tests for new functions
- Follow existing code patterns
- Use type-safe approaches

## Never
- Modify production configs
- Skip test coverage
- Use deprecated APIs
- Commit without testing
```

## Custom Sandbox Environment

### .gemini/sandbox.Dockerfile

```dockerfile
FROM node:20-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install global packages
RUN npm install -g \
    typescript \
    ts-node \
    playwright

# Install Playwright browsers
RUN npx playwright install --with-deps chromium

# Set working directory
WORKDIR /workspace

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

CMD ["bash"]
```

## Extensions

### .gemini/extensions/qa-testing/gemini-extension.json

```json
{
  "name": "qa-testing",
  "version": "1.0.0",
  "description": "QA testing extension for Gemini Code Assist",
  "capabilities": {
    "testGeneration": true,
    "pageObjectCreation": true,
    "testDataFactories": true
  },
  "contextFiles": [
    "GEMINI.md"
  ],
  "commands": [
    {
      "name": "generate-tests",
      "description": "Generate tests for a file",
      "template": "Generate comprehensive tests for {{FILE}}"
    },
    {
      "name": "create-page-object",
      "description": "Create Page Object for a page",
      "template": "Create a Page Object class for {{URL}}"
    }
  ]
}
```

### Extension GEMINI.md

```markdown
# QA Testing Extension

## Purpose
Specialized assistant for QA automation tasks.

## Capabilities
- Generate E2E tests with Playwright
- Create Page Object classes
- Build test data factories
- Review test coverage

## Patterns

### Test Generation
When generating tests:
1. Use AAA pattern
2. One concept per test
3. Include happy path and error cases
4. Mock external dependencies

### Page Objects
When creating Page Objects:
1. Extend BasePage
2. Use getByTestId for selectors
3. Methods return void for actions
4. No assertions in page objects
```

## Model Selection

Available models (as of 2025):
- **gemini-2.5-pro** - Most capable, best for complex tasks
- **gemini-2.5-flash** - Faster, good for simpler tasks
- **gemini-1.5-pro** - Legacy, still supported

## GitHub Integration

### Customizing Code Review

For GitHub repositories, add `.gemini/styleguide.md`:

```markdown
# Gemini Code Review Configuration

## Review Criteria
- TypeScript strict compliance
- Test coverage requirements
- Security best practices
- Documentation standards

## Auto-approve Conditions
- Only documentation changes
- Version bumps
- Dependency updates (minor)

## Require Extra Review
- Security-related changes
- Database migrations
- API contract changes
```

## Best Practices

### Effective GEMINI.md Content

1. **Be Specific About Context**
   ```markdown
   ## Project Type
   E-commerce QA automation for checkout flows

   ## Priority Features
   - Payment processing tests
   - Cart functionality tests
   - User authentication tests
   ```

2. **Include Working Examples**
   ```markdown
   ## Example Test
   ```typescript
   test('should complete checkout', async ({ page }) => {
     const checkoutPage = new CheckoutPage(page);
     await checkoutPage.goto();
     await checkoutPage.completeOrder(testOrder);
     await expect(checkoutPage.confirmation).toBeVisible();
   });
   ```
   ```

3. **Define Clear Boundaries**
   ```markdown
   ## Do Not
   - Modify payment gateway configs
   - Use real credit card numbers
   - Skip security tests
   ```

### Keeping GEMINI.md Effective

- Keep under 200 lines
- Update when patterns change
- Include recent architectural decisions
- Reference external docs for details

## Comparison with Other Tools

| Feature | Gemini | Claude | Copilot | Cursor |
|---------|--------|--------|---------|--------|
| Config File | GEMINI.md | CLAUDE.md | AGENTS.md | .mdc files |
| Agent Mode | Yes | Yes | Yes | Yes |
| MCP Support | Yes | Yes | Yes | Yes |
| Code Review | GitHub | N/A | GitHub | N/A |
| Sandbox | Dockerfile | N/A | N/A | N/A |
| Free Tier | Yes (limited) | Limited | Limited | Limited |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| GEMINI.md not loading | Check file is at project root |
| Agent mode unavailable | Update to latest extension version |
| Slow responses | Try gemini-2.5-flash model |
| Context too large | Split into subdirectory files |
| MCP servers not working | Verify server commands and paths |

## Migration from Legacy Tools

If upgrading from older Gemini Code Assist:

1. Remove deprecated tool configurations
2. Create `GEMINI.md` at project root
3. Configure `.gemini/settings.json` for agent mode
4. Test agent capabilities in new conversation

## Resources

- [Gemini Code Assist Documentation](https://developers.google.com/gemini-code-assist/docs/overview)
- [Agent Mode Guide](https://developers.google.com/gemini-code-assist/docs/use-agentic-chat-pair-programmer)
- [Google Cloud Gemini Docs](https://docs.cloud.google.com/gemini/docs/codeassist/overview)
- [Gemini Release Notes](https://docs.cloud.google.com/gemini/docs/codeassist/release-notes)
- [Google I/O 2025 Updates](https://blog.google/technology/developers/gemini-code-assist-updates-google-io-2025/)
