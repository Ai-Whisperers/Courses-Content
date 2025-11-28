# AI-Assisted Development Cheatsheet

## Quick Reference Guide

---

## GitHub Copilot Shortcuts

### VS Code (Windows/Linux)

| Action | Shortcut |
|--------|----------|
| Accept suggestion | `Tab` |
| Reject suggestion | `Esc` |
| Next suggestion | `Alt+]` |
| Previous suggestion | `Alt+[` |
| Show all suggestions | `Ctrl+Enter` |
| Trigger suggestion | `Alt+\` |
| Open Copilot Chat | `Ctrl+Shift+I` |

### VS Code (Mac)

| Action | Shortcut |
|--------|----------|
| Accept suggestion | `Tab` |
| Reject suggestion | `Esc` |
| Next suggestion | `Option+]` |
| Previous suggestion | `Option+[` |
| Show all suggestions | `Cmd+Enter` |
| Trigger suggestion | `Option+\` |
| Open Copilot Chat | `Cmd+Shift+I` |

---

## Copilot Chat Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/explain` | Explain code | Select code, type `/explain` |
| `/tests` | Generate tests | Select function, type `/tests` |
| `/fix` | Fix problems | Select error, type `/fix` |
| `/doc` | Add documentation | Select function, type `/doc` |
| `/optimize` | Optimize code | Select code, type `/optimize` |
| `/simplify` | Simplify code | Select complex code, type `/simplify` |
| `/new` | Start new chat | Type `/new` |
| `/clear` | Clear chat | Type `/clear` |

---

## Effective Comment Patterns

### Function Generation

```javascript
// Function to [ACTION] with [INPUT] returning [OUTPUT]
// Example: calculateTax(100, 0.1) returns 10

// Async function that fetches [RESOURCE] from [API]
// Handles errors and returns [TYPE] or null

// Validate [ENTITY] with rules:
// - [rule 1]
// - [rule 2]
// Returns { valid: boolean, errors: string[] }
```

### Test Generation

```javascript
// Test: [functionName]
// Should [expected behavior]
// Should handle [edge case]
// Should throw when [error condition]
```

### Documentation

```javascript
/**
 * [Brief description]
 * @param {type} name - [description]
 * @returns {type} [description]
 * @throws {Error} [when]
 * @example
 * [example code]
 */
```

---

## Prompt Templates

### Code Review

```
Review this [LANGUAGE] code for:
1. Security issues
2. Performance problems
3. Best practices
4. Potential bugs

[PASTE CODE]
```

### Refactoring

```
Refactor this code to:
- Use [PATTERN] pattern
- Improve [ASPECT]
- Reduce complexity

Current code:
[PASTE CODE]
```

### Documentation

```
Generate JSDoc/docstring for:
- All parameters with types
- Return value
- Exceptions thrown
- Usage example

[PASTE FUNCTION]
```

### Testing

```
Generate tests using [FRAMEWORK] for:
- Happy path
- Edge cases: [list]
- Error conditions
- Boundary values

[PASTE FUNCTION]
```

### Debugging

```
Help debug this issue:

Error: [ERROR MESSAGE]

Expected: [EXPECTED BEHAVIOR]
Actual: [ACTUAL BEHAVIOR]

Code:
[PASTE CODE]
```

---

## Security Quick Checks

### Before Sending to AI

- [ ] No API keys
- [ ] No passwords
- [ ] No customer data
- [ ] No proprietary algorithms
- [ ] Company policy allows

### Before Accepting AI Code

- [ ] Understood the code
- [ ] Checked for injection vulnerabilities
- [ ] Input validation present
- [ ] Error handling appropriate
- [ ] No hardcoded secrets
- [ ] Tests pass

---

## Common Code Patterns

### Input Validation

```javascript
// AI Prompt: Validate user input for [ENTITY]
function validateUser(input) {
    const errors = [];
    if (!input.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push('Invalid email');
    }
    // ... more validations
    return { valid: errors.length === 0, errors };
}
```

### Error Handling

```javascript
// AI Prompt: Add proper error handling
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch failed:', error);
        throw error;
    }
}
```

### API Endpoint

```javascript
// AI Prompt: Create REST endpoint for [RESOURCE]
router.get('/api/users/:id', async (req, res) => {
    try {
        const user = await UserService.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
```

---

## Testing Patterns

### Unit Test Structure (AAA)

```javascript
describe('functionName', () => {
    test('should [expected behavior]', () => {
        // Arrange
        const input = /* test data */;

        // Act
        const result = functionName(input);

        // Assert
        expect(result).toBe(/* expected */);
    });
});
```

### Common Assertions

| Framework | Equal | Contains | Throws | Async |
|-----------|-------|----------|--------|-------|
| Jest | `.toBe()` | `.toContain()` | `.toThrow()` | `await expect()` |
| Mocha | `.equal()` | `.include()` | `.throw()` | `return promise` |
| pytest | `assert ==` | `in` | `pytest.raises` | `async def` |

---

## AI Tool Comparison

| Use Case | Best Tool | Why |
|----------|-----------|-----|
| Inline completion | Copilot | Real-time, context-aware |
| Code explanation | Claude | Large context, detailed |
| Quick questions | ChatGPT | Fast, conversational |
| Test generation | Copilot + Chat | IDE integration |
| Documentation | Claude/ChatGPT | Better formatting |
| Code review | Any | Similar capabilities |

---

## Productivity Tips

### Maximize AI Effectiveness

1. **Write descriptive comments first** - Better suggestions
2. **Keep files focused** - Better context understanding
3. **Use consistent naming** - Pattern recognition
4. **Provide examples** - Clearer intent
5. **Iterate prompts** - Refine until satisfied

### Time Savers

| Task | Without AI | With AI | Savings |
|------|------------|---------|---------|
| Boilerplate | 30 min | 5 min | 83% |
| Documentation | 1 hour | 15 min | 75% |
| Unit tests | 1 hour | 20 min | 67% |
| Code review | 30 min | 15 min | 50% |

---

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| No Copilot suggestions | Check status bar, re-auth |
| Wrong language | Add file extension or comment |
| Incomplete suggestions | Add more context/comments |
| API rate limit | Wait or reduce requests |
| Poor quality output | Improve prompt specificity |

---

*Cheatsheet - AI-Assisted Software Development Course*
