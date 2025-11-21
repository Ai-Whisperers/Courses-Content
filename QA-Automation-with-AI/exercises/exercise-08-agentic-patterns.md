# Exercise 8: Implementing Agentic Patterns

## Objective

Apply agentic AI design patterns to automate complex testing workflows.

## Duration: 2.5 hours

---

## Prerequisites

- Completed modules 1-7
- Understanding of AI prompting
- Node.js environment ready

---

## Part 1: Prompt Chaining (45 min)

### Task

Implement a chain of prompts that build on each other to create a complete test suite.

### Scenario

You need to test a new shopping cart feature. Instead of one massive prompt, chain smaller focused prompts.

### Implementation

Create `prompt-chain.md`:

```markdown
# Prompt Chain: Shopping Cart Test Suite

## Chain Step 1: Analyze Requirements

**Input**: Feature specification
**Output**: List of testable requirements

Prompt:
```
Analyze this shopping cart feature and extract testable requirements:

[Feature spec]

Output format:
- REQ-1: [requirement]
- REQ-2: [requirement]
...
```

## Chain Step 2: Generate Test Cases

**Input**: Requirements from Step 1
**Output**: Test case list

Prompt:
```
Generate test cases for these requirements:

[Requirements from step 1]

For each requirement, create:
- Happy path test
- Error case test
- Edge case test

Format: TC-{REQ#}-{number}: [description]
```

## Chain Step 3: Implement Priority Tests

**Input**: Test cases from Step 2
**Output**: Implemented tests

Prompt:
```
Implement Jest tests for these P0 test cases:

[P0 test cases from step 2]

Requirements:
- Use mocks for dependencies
- Follow AAA pattern
- Include specific assertions
```

## Chain Step 4: Review and Improve

**Input**: Implemented tests from Step 3
**Output**: Improved tests

Prompt:
```
Review these tests and improve:

[Tests from step 3]

Check:
- Assertion strength
- Edge case coverage
- Error message verification
```
```

### Exercise

1. Create a shopping cart feature spec
2. Execute each prompt in the chain
3. Document the output of each step
4. Compare to what a single prompt would produce

### Deliverable

- `prompt-chain.md` with all 4 steps
- Output from each step
- Comparison analysis

---

## Part 2: Reflection Pattern (30 min)

### Task

Implement a self-reflection loop for test improvement.

### Implementation

```markdown
# Reflection Loop: Test Quality Improvement

## Initial Generation

Generate unit tests for:
[code]

## Reflection Prompt

Review your generated tests and answer:

1. **Completeness**: Did I cover all code paths? List any missing.

2. **Assertion Quality**: Are assertions specific enough? Which are weak?

3. **Edge Cases**: What edge cases did I miss?

4. **Isolation**: Are tests properly isolated? Any shared state?

5. **Clarity**: Are test names descriptive? Which are unclear?

Based on this analysis, provide improved tests addressing each issue.

## Second Reflection

Review your improvements:

1. Did I actually fix all identified issues?
2. Are there new issues introduced?
3. Rate the improvement: None / Minor / Significant

If rating is not "Significant", iterate again.
```

### Exercise

1. Generate initial tests for a function
2. Run the reflection prompt
3. Document what was identified and fixed
4. Run second reflection
5. Compare initial vs final version

### Deliverable

- Initial tests
- Reflection analysis
- Final improved tests
- Improvement comparison

---

## Part 3: Parallelization (30 min)

### Task

Design a parallel test generation workflow.

### Scenario

Generate tests for a large module with multiple classes/functions.

### Implementation

```markdown
# Parallel Test Generation

## Setup

Module to test: userManagement.js
- UserService class
- RoleService class
- PermissionService class
- AuditService class

## Parallel Prompts

Execute these prompts simultaneously:

### Agent 1: UserService Tests
```
Generate unit tests for UserService:
[UserService code]
Focus: CRUD operations, validation
```

### Agent 2: RoleService Tests
```
Generate unit tests for RoleService:
[RoleService code]
Focus: Role assignment, hierarchy
```

### Agent 3: PermissionService Tests
```
Generate unit tests for PermissionService:
[PermissionService code]
Focus: Permission checks, inheritance
```

### Agent 4: AuditService Tests
```
Generate unit tests for AuditService:
[AuditService code]
Focus: Logging, compliance
```

## Aggregation

Combine all test files:
1. Resolve naming conflicts
2. Share common fixtures
3. Ensure no duplicate mocks
4. Verify all tests pass together
```

### Exercise

1. Create or use a module with 4+ classes
2. Design parallel prompts for each
3. Execute all prompts
4. Combine and resolve conflicts
5. Measure time saved vs sequential

### Deliverable

- Parallel prompt design
- Individual test outputs
- Combined test file
- Time comparison

---

## Part 4: Tool Use Pattern (45 min)

### Task

Create an AI workflow that uses tools to gather context before testing.

### Implementation

Create `tool-use-workflow.md`:

```markdown
# Tool-Augmented Test Generation

## Available Tools

1. **file_read**: Read source code files
2. **search**: Find related files
3. **run_tests**: Execute existing tests
4. **coverage**: Get coverage report

## Workflow

### Step 1: Discover Code

Tool: search
Query: "Find all files related to payment processing"
```
search: "payment" type:code
```

### Step 2: Read Implementation

Tool: file_read
Files: [results from step 1]
```
file_read: src/services/paymentService.js
file_read: src/models/payment.js
```

### Step 3: Check Existing Tests

Tool: run_tests + coverage
```
run_tests: src/services/__tests__/
coverage: src/services/paymentService.js
```

### Step 4: Identify Gaps

Analyze coverage report to find untested code:
- Uncovered lines
- Uncovered branches
- Missing error paths

### Step 5: Generate Gap-Filling Tests

Generate tests specifically for uncovered code:
```
The coverage report shows these uncovered lines:
- Line 45-48: Error handling for expired cards
- Line 72: Edge case for zero amount
- Line 89-92: Retry logic

Generate tests to cover these specific gaps.
```
```

### Exercise

1. Choose a module in your project
2. Execute each tool step
3. Analyze results before proceeding
4. Generate gap-filling tests
5. Re-run coverage to verify improvement

### Deliverable

- Tool use workflow document
- Tool outputs at each step
- Gap-filling tests
- Before/after coverage comparison

---

## Submission

### Files

- `part1-prompt-chain/`
  - `chain-design.md`
  - `step-outputs.md`
  - `comparison.md`
- `part2-reflection/`
  - `initial-tests.js`
  - `reflection-analysis.md`
  - `final-tests.js`
- `part3-parallelization/`
  - `parallel-design.md`
  - `combined-tests.js`
  - `time-analysis.md`
- `part4-tool-use/`
  - `workflow.md`
  - `gap-tests.js`
  - `coverage-comparison.md`

### Grading

| Criterion | Points |
|-----------|--------|
| Prompt chaining implementation | 25 |
| Reflection pattern effectiveness | 25 |
| Parallelization design | 25 |
| Tool use integration | 25 |

---

## Tips

- Each pattern has ideal use cases
- Chains are great for complex multi-step tasks
- Reflection improves quality iteratively
- Parallelization saves time for independent tasks
- Tool use adds real context to generation

---

## Bonus Challenge

Combine multiple patterns:
1. Use tools to gather context
2. Parallelize test generation by module
3. Apply reflection to each module's tests
4. Chain the overall workflow

---

*Good luck!*
