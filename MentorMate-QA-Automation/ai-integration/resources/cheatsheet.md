# QA Automation with AI - Quick Reference Cheat Sheet

## Installation Commands

```bash
# GitHub CLI
winget install GitHub.cli          # Windows
brew install gh                    # macOS

# Claude Code
winget install Anthropic.ClaudeCode  # Windows
brew install claude-code             # macOS
```

## Authentication

```bash
# GitHub CLI
gh auth login                      # Interactive login
gh auth status                     # Check status
gh repo list OrgName --limit 10    # Test access

# Claude Code
claude auth login                  # Authenticate
claude --version                   # Verify
```

## Essential Claude Commands

| Command | Description |
|---------|-------------|
| `claude` | Start interactive session |
| `claude "task"` | Start with task |
| `/help` | Show commands |
| `/clear` | Clear conversation |
| `/exit` | Exit Claude |
| `Ctrl+C` | Cancel operation |

## CLAUDE.md Template

```markdown
# Project: [Name]

## Tech Stack
- Language: [TypeScript/Python]
- Testing: [Jest/pytest]
- Framework: [React/Express]

## Testing Conventions
- Pattern: AAA (Arrange, Act, Assert)
- Naming: test_feature_scenario_expected
- Coverage: 80% minimum

## Key Files
- src/services/ - Business logic
- tests/ - Test files
```

## Essential Prompts

### Test Plan Generation
```
Create test plan for [feature]:
- Unit tests
- Integration tests
- E2E tests
- Edge cases
- Error cases
Format as Markdown table.
```

### Unit Test Generation
```
Generate Jest tests for [function]:
- Happy path
- Error cases
- Edge cases
Mock: [dependencies]
```

### Test Review
```
Review these tests for:
- Meaningful assertions
- Edge cases
- Isolation
- Determinism
Suggest improvements.
```

### Documentation
```
Generate docs for [module]:
- Purpose
- API reference
- Usage examples
- Dependencies
```

## Test Quality Checklist

- [ ] Meaningful assertions (not just toBeDefined)
- [ ] Descriptive test names
- [ ] Each test is focused
- [ ] Tests are isolated
- [ ] Edge cases covered
- [ ] Error cases covered
- [ ] Proper setup/teardown
- [ ] No magic numbers

## Common Jest Assertions

```javascript
expect(x).toBe(y)              // Exact equality
expect(x).toEqual(y)           // Deep equality
expect(x).toBeTruthy()         // Truthy
expect(x).toBeFalsy()          // Falsy
expect(x).toBeNull()           // null
expect(x).toBeDefined()        // Not undefined
expect(x).toContain(item)      // Array contains
expect(x).toHaveLength(n)      // Array/string length
expect(x).toMatch(/regex/)     // Regex match
expect(fn).toThrow('error')    // Throws error
expect(x).toBeCloseTo(y)       // Float comparison
```

## Common Playwright Assertions

```typescript
await expect(page).toHaveURL(/pattern/)
await expect(locator).toBeVisible()
await expect(locator).toHaveText('text')
await expect(locator).toHaveAttribute('attr', 'value')
await expect(locator).toBeEnabled()
await expect(locator).toBeFocused()
await expect(page).toHaveScreenshot('name.png')
```

## GitHub Actions Test Workflow

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
      - run: npm run test:coverage
```

## Debug Prompt Template

```
Test failing:
```code
[test code]
```

Error:
```
[error message]
```

Source:
```code
[source code]
```

Please diagnose and fix.
```

## Key Agentic Patterns for Testing

| Pattern | Use For |
|---------|---------|
| Chaining | Multi-step test generation |
| Reflection | Quality improvement loop |
| RAG | Test pattern knowledge base |
| Parallelization | Large test suites |

## Coverage Commands

```bash
# Jest
npm run test -- --coverage
npx jest --coverage

# pytest
pytest --cov=src --cov-report=html
```

## Quick Fixes for Common Issues

| Issue | Fix |
|-------|-----|
| gh auth fails | `gh auth logout && gh auth login` |
| Tests flaky | Remove time dependencies, add waits |
| Low coverage | Ask AI for uncovered paths |
| Wrong framework | Specify in CLAUDE.md |
| Tests too slow | Parallelize, reduce scope |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Cancel current operation |
| `Up Arrow` | Previous command |
| `Tab` | Autocomplete |

---

*Keep this cheat sheet handy during the course!*
