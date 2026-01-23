# AI Prompt Templates

## AI-Assisted Software Development Course

This directory contains curated prompt templates for effective AI-assisted development across all course modules.

---

## How to Use These Prompts

1. **Copy the prompt template**
2. **Replace placeholders** (shown in `[brackets]`)
3. **Provide context** (paste relevant code, error messages, or requirements)
4. **Iterate** based on AI response

---

## Module 1: AI Overview Prompts

### Code Explanation

```
Explain this code in detail:
- What does it do?
- How does it work?
- What are the key patterns used?

[PASTE CODE HERE]
```

### Technology Comparison

```
Compare these technologies for [USE CASE]:
- Technology A: [Name]
- Technology B: [Name]

Consider:
1. Performance
2. Learning curve
3. Community support
4. Long-term maintenance
5. Our team's experience level: [Beginner/Intermediate/Advanced]
```

---

## Module 2: GitHub Copilot Prompts

### Function Generation

```javascript
/**
 * [DESCRIBE WHAT THE FUNCTION DOES]
 * @param {[TYPE]} [paramName] - [Description]
 * @returns {[TYPE]} [Description of return value]
 * @throws {Error} [When this error occurs]
 * @example
 * [functionName]([exampleInput]) // returns [exampleOutput]
 */
function [functionName]([parameters]) {
    // Copilot will generate the implementation
}
```

### API Endpoint Generation

```javascript
/**
 * [HTTP METHOD] /api/[resource]
 * [Description of what this endpoint does]
 *
 * Request body:
 * - [field]: [type] - [description]
 *
 * Response:
 * - 200: [success description]
 * - 400: [validation error description]
 * - 404: [not found description]
 */
router.[method]('/[path]', async (req, res) => {
    // Implementation
});
```

### Test Generation Comment

```javascript
// Test: [functionName]
// - Should [expected behavior for happy path]
// - Should throw error when [error condition]
// - Should handle [edge case 1]
// - Should handle [edge case 2]
```

---

## Module 3: Code Review Prompts

### Comprehensive Code Review

```
Review this code for:
1. Security vulnerabilities (OWASP Top 10)
2. Performance issues
3. Code quality and maintainability
4. Best practices violations
5. Potential bugs

Language: [Language]
Framework: [Framework if applicable]

[PASTE CODE HERE]

Provide specific suggestions with code examples for improvements.
```

### Security-Focused Review

```
Analyze this code for security vulnerabilities:

Focus areas:
- Input validation
- SQL injection
- XSS vulnerabilities
- Authentication/authorization issues
- Sensitive data exposure
- Security misconfigurations

[PASTE CODE HERE]

For each issue found, provide:
1. Severity (Critical/High/Medium/Low)
2. Description of the vulnerability
3. Secure code fix
```

### Performance Review

```
Review this code for performance issues:

Context:
- Expected load: [requests/second or data size]
- Environment: [production constraints]

[PASTE CODE HERE]

Identify:
1. Time complexity issues
2. Memory leaks or inefficient memory usage
3. Unnecessary operations
4. N+1 query problems
5. Blocking operations

Provide optimized alternatives with explanations.
```

---

## Module 4: Documentation Prompts

### JSDoc Generation

```
Generate comprehensive JSDoc documentation for this function:

[PASTE FUNCTION HERE]

Include:
- @description
- @param with types and descriptions
- @returns with type and description
- @throws for error conditions
- @example with realistic usage
```

### README Generation

```
Generate a professional README.md for this project:

Project name: [Name]
Description: [Brief description]
Main technologies: [List technologies]
Key features: [List features]

Include sections:
1. Project title and badges
2. Description
3. Features
4. Installation
5. Usage with examples
6. API reference (if applicable)
7. Configuration
8. Contributing
9. License
```

### API Documentation

```
Generate API documentation for this endpoint:

Method: [GET/POST/PUT/DELETE]
Path: [/api/path]
Handler code:

[PASTE HANDLER CODE]

Include:
- Endpoint description
- Request parameters (path, query, body)
- Request/response examples
- Error responses
- Authentication requirements
```

---

## Module 5: Testing Prompts

### Unit Test Generation

```
Generate comprehensive unit tests for this function:

[PASTE FUNCTION HERE]

Requirements:
- Testing framework: [Jest/Mocha/pytest/etc.]
- Cover happy path scenarios
- Cover edge cases
- Cover error handling
- Include descriptive test names
- Use AAA pattern (Arrange, Act, Assert)
```

### Edge Case Discovery

```
What edge cases should I test for this function?

[PASTE FUNCTION HERE]

Consider:
- Boundary values
- Empty/null/undefined inputs
- Type coercion issues
- Concurrent access
- Resource limits
- Error states
```

### Mock Generation

```
Generate mocks for testing this code:

[PASTE CODE WITH DEPENDENCIES]

I need mocks for:
- [Dependency 1]
- [Dependency 2]

Include:
- Mock implementation
- How to set up expectations
- How to verify calls
```

---

## Module 6: Architecture Prompts

### System Design

```
Design a system architecture for:

Requirements:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Constraints:
- Expected users: [number]
- Expected requests/second: [number]
- Data storage needs: [size]
- Budget: [if relevant]
- Team size: [number]

Provide:
1. High-level architecture diagram description
2. Component breakdown
3. Technology recommendations with rationale
4. Data flow description
5. Scaling considerations
```

### Refactoring Strategy

```
Suggest a refactoring strategy for this code:

[PASTE CODE HERE]

Goals:
- Improve [specific concern: testability/maintainability/performance]
- Reduce complexity
- Apply appropriate design patterns

Provide:
1. Issues identified
2. Recommended pattern(s)
3. Step-by-step refactoring plan
4. Refactored code example
```

### Technology Evaluation

```
Evaluate [TECHNOLOGY] for our project:

Our context:
- Current stack: [technologies]
- Team expertise: [relevant skills]
- Project type: [web/mobile/backend/etc.]
- Scale requirements: [users/data size]

Evaluate:
1. Pros and cons
2. Learning curve
3. Integration with current stack
4. Community and support
5. Long-term viability
6. Alternative options
```

---

## Module 7: Security Prompts

### Security Audit

```
Perform a security audit on this code:

[PASTE CODE HERE]

Check for:
1. OWASP Top 10 vulnerabilities
2. Authentication/authorization flaws
3. Data exposure risks
4. Injection vulnerabilities
5. Security misconfigurations

For each issue, provide:
- Severity rating
- Description
- Attack scenario
- Remediation code
```

### Secure Implementation

```
Implement [FEATURE] with security best practices:

Requirements:
- [Functional requirement 1]
- [Functional requirement 2]

Security requirements:
- Input validation
- Output encoding
- Authentication/authorization
- Logging (without sensitive data)
- Error handling (without information leakage)
```

### Threat Modeling

```
Create a threat model for this feature:

Feature description: [describe feature]
Data handled: [list sensitive data]
User roles: [list roles]
External integrations: [list integrations]

Analyze:
1. Assets to protect
2. Potential threat actors
3. Attack vectors
4. Risk assessment (likelihood x impact)
5. Mitigation strategies
```

---

## Module 8: Capstone Prompts

### Feature Planning

```
Help me plan the implementation of [FEATURE]:

Context:
- Project type: [type]
- Current architecture: [brief description]
- Deadline: [timeframe]

Break down into:
1. Sub-tasks with clear scope
2. Technical decisions needed
3. Dependencies to consider
4. Testing strategy
5. Documentation needs
```

### Code Integration

```
Help me integrate this new feature:

Existing code structure:
[DESCRIBE OR PASTE RELEVANT CODE]

New feature requirements:
[DESCRIBE FEATURE]

Provide:
1. Integration points
2. Required changes to existing code
3. New files/components needed
4. Migration steps if needed
5. Testing approach
```

---

## Prompt Engineering Best Practices

### Do's

1. **Be specific** - Include exact requirements and constraints
2. **Provide context** - Language, framework, project type
3. **Show examples** - Input/output examples help
4. **State the format** - Request specific output structure
5. **Iterate** - Refine based on initial responses

### Don'ts

1. **Don't be vague** - "Make it better" is not helpful
2. **Don't omit constraints** - Performance, security, compatibility
3. **Don't accept blindly** - Always review AI output
4. **Don't share secrets** - Never include API keys or passwords
5. **Don't skip context** - More context = better results

---

## Quick Reference Card

| Task | Key Prompt Elements |
|------|---------------------|
| Code Generation | Function signature, types, examples |
| Code Review | Specific concerns, language, framework |
| Documentation | Target audience, format, sections needed |
| Testing | Framework, coverage goals, edge cases |
| Architecture | Requirements, constraints, scale |
| Security | Threat model, compliance requirements |
| Debugging | Error message, expected vs actual, context |

---

*AI Prompt Templates - AI-Assisted Software Development Course*
