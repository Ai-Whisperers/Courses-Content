# Cascade Flow Configuration

## Triggers

### On File Open
- Analyze file structure
- Suggest relevant tests
- Check for linting errors

### On Save
- Run linter
- Format code

## Flows

### Test Generation
Trigger: User asks to "generate tests"
Steps:
1. Analyze selected code
2. Identify edge cases
3. Generate test file using project patterns
4. Run tests to verify

### Code Review
Trigger: User asks to "review code"
Steps:
1. Check against project rules
2. Identify security issues
3. Suggest performance improvements
4. Verify type safety
