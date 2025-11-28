# Module 8: Applying Agentic Patterns to Testing

## Duration: 4 hours

## Learning Objectives

By the end of this module, you will be able to:
- Apply Prompt Chaining for test workflows
- Use Reflection for quality improvement
- Implement RAG for test knowledge
- Parallelize test generation at scale

---

## 8.1 Introduction to Agentic Patterns

### What are Agentic Patterns?

Design patterns for building AI workflows that:
- Break complex tasks into steps
- Self-improve through iteration
- Use knowledge bases
- Scale to large codebases

### Key Patterns for Testing

| Pattern | Use Case |
|---------|----------|
| Prompt Chaining | Multi-step test creation |
| Reflection | Quality improvement loop |
| RAG | Test pattern knowledge base |
| Parallelization | Large-scale generation |
| Tool Use | Integrated workflows |

---

## 8.2 Prompt Chaining

### What is Prompt Chaining?

Breaking a complex task into sequential steps, where each step validates before proceeding.

### Test Generation Chain

```
Chain 1: Analyze → List testable units
Chain 2: Plan → Create test cases for each
Chain 3: Implement → Generate test code
Chain 4: Validate → Review and fix issues
Chain 5: Optimize → Improve coverage
```

### Implementation Example

**Step 1: Analyze**
```
Analyze [file] and list all testable units.

For each unit:
- Name
- Type (function/class/method)
- Parameters
- Return type
- Dependencies
- Complexity (low/medium/high)
```

**Step 2: Plan**
```
For each testable unit from Step 1, create test cases.

[Paste Step 1 output]

For each unit, define:
- Test scenarios (happy, error, edge)
- Input values
- Expected outputs
- Mocks needed
```

**Step 3: Implement**
```
Generate test code for these test cases.

[Paste Step 2 output]

Requirements:
- [framework]
- [conventions]
- [patterns]
```

**Step 4: Validate**
```
Review these generated tests for quality.

[Paste Step 3 output]

Check for:
- Assertion strength
- Edge case coverage
- Error handling
- Isolation

Fix any issues found.
```

---

## 8.3 Reflection Pattern

### What is Reflection?

A self-improvement loop: Generate → Critique → Revise → Repeat

### Test Quality Loop

```
┌─────────┐
│ Generate│
└────┬────┘
     │
┌────▼────┐
│Critique │
└────┬────┘
     │
   Pass? ──No──┐
     │         │
    Yes     Revise
     │         │
┌────▼────┐    │
│  Done   │◄───┘
└─────────┘
```

### Implementation

**Generate**
```
Generate tests for [function].
```

**Critique**
```
Review these tests against this rubric:

Tests:
[paste tests]

Rubric:
- [ ] All paths covered (0-3 points)
- [ ] Meaningful assertions (0-3 points)
- [ ] Edge cases included (0-3 points)
- [ ] Proper isolation (0-3 points)

Score each criterion and explain deductions.
Total must be 10+ to pass.
```

**Revise**
```
Improve these tests based on the critique:

Current tests:
[paste tests]

Critique:
[paste critique]

Fix all issues to achieve score of 10+.
```

---

## 8.4 RAG for Testing

### What is RAG?

Retrieval-Augmented Generation: Use a knowledge base to inform generation.

### Building a Test Knowledge Base

**Content to include**:
- Project test patterns
- Team conventions
- Common bugs and tests
- Security test cases
- Performance benchmarks

### RAG Prompt Pattern

```
Based on our testing knowledge base, generate tests for [feature].

Knowledge base context:
"""
[Retrieved patterns and examples]
"""

Requirements:
- Follow patterns shown above
- Include known edge cases
- Apply security tests for this type
- Use project conventions
```

### Building Knowledge Base

```
Analyze our existing tests and create a knowledge base.

Include:
1. **Test Patterns**
   - How we structure tests
   - Common assertions
   - Mock patterns

2. **Conventions**
   - Naming
   - Organization
   - Data factories

3. **Known Edge Cases**
   - By feature type
   - By data type

4. **Security Tests**
   - Input validation
   - Authentication
   - Authorization

5. **Anti-Patterns**
   - Common mistakes
   - What to avoid

Format for easy retrieval.
```

---

## 8.5 Parallelization

### When to Parallelize

- Multiple independent modules
- Large test suites
- Time-critical deadlines
- Comprehensive coverage needs

### Parallel Test Generation

```
Generate tests for these modules in parallel:

Module 1: [name] - [files]
Module 2: [name] - [files]
Module 3: [name] - [files]

For each module:
1. Analyze independently
2. Generate tests
3. Follow same conventions
4. Return results

Then merge and check for conflicts.
```

### Normalization Step

After parallel generation:
```
Normalize these test suites:

Suite 1: [tests]
Suite 2: [tests]
Suite 3: [tests]

Ensure:
- Consistent naming
- No duplicate tests
- Shared fixtures extracted
- No conflicts
- Same import style
```

---

## 8.6 Combined Pattern Example

### Full Workflow

```typescript
// Pseudo-code for automated test generation

async function generateTestSuite(module: string) {
  // Step 1: Retrieve context (RAG)
  const patterns = await retrieveTestPatterns(module);
  const conventions = await retrieveConventions();

  // Step 2: Chain - Analyze
  const units = await claude(`
    Analyze ${module} and list testable units.
    Context: ${patterns}
  `);

  // Step 3: Chain - Plan
  const testCases = await claude(`
    Create test cases for: ${units}
    Conventions: ${conventions}
  `);

  // Step 4: Chain - Generate
  let tests = await claude(`
    Generate tests for: ${testCases}
  `);

  // Step 5: Reflection loop
  let score = 0;
  while (score < 10) {
    const critique = await claude(`
      Score these tests: ${tests}
    `);
    score = extractScore(critique);

    if (score < 10) {
      tests = await claude(`
        Improve based on: ${critique}
        Current: ${tests}
      `);
    }
  }

  return tests;
}
```

---

## 8.7 Hands-On Exercises

### Exercise 8.1: Prompt Chaining

**Objective**: Build a chained test generation workflow

**Steps**:
1. Create 4-step chain prompts
2. Run each step sequentially
3. Pass output to next step
4. Document the workflow
5. Measure quality improvement

**Deliverable**: Documented chain with results

**Time**: 60 minutes

---

### Exercise 8.2: Reflection Loop

**Objective**: Implement quality improvement loop

**Steps**:
1. Generate initial tests
2. Create scoring rubric
3. Run critique prompt
4. Revise based on feedback
5. Repeat until score >= 10

**Deliverable**: Tests with improvement log

**Time**: 45 minutes

---

### Exercise 8.3: Build Test Knowledge Base

**Objective**: Create project test pattern knowledge base

**Steps**:
1. Analyze existing tests
2. Extract patterns and conventions
3. Document known edge cases
4. Create retrieval format
5. Use in new test generation

**Deliverable**: Test knowledge base document

**Time**: 45 minutes

---

## Knowledge Check

1. What is Prompt Chaining?
2. How does Reflection improve quality?
3. What is RAG and how does it help testing?
4. When should you parallelize?
5. How do you combine multiple patterns?

---

## Summary

In this module, you learned:
- Prompt Chaining for workflows
- Reflection for quality loops
- RAG for knowledge-based generation
- Parallelization for scale
- Combining patterns effectively

---

## Next Steps

Proceed to **Module 9: CI/CD Integration** to automate your testing pipeline.
