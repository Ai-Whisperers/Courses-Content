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

## Part 4: Model Context Protocol (MCP) (45 min)

### Task

Create an AI workflow that uses the Model Context Protocol (MCP) to connect tools and data sources.

### Concept

MCP is a standard for connecting AI models to data and tools. Instead of ad-hoc tool definitions, we use standardized servers.

### Implementation

Create `mcp-workflow.md`:

```markdown
# MCP-Augmented Test Generation

## MCP Servers Configuration

Define the servers needed for this workflow:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./src"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "..." }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/db"]
    }
  }
}
```

## Workflow Steps

### Step 1: Explore Codebase (Filesystem MCP)

Use `filesystem` tools to understand the structure:

Tool: `list_directory`
Path: `./src/services`

Tool: `read_file`
Path: `./src/services/payment.ts`

### Step 2: Check Recent Changes (GitHub MCP)

Use `github` tools to see what changed recently and needs testing:

Tool: `get_commits`
Repo: "owner/repo"
Limit: 5

### Step 3: Inspect Schema (Postgres MCP)

Use `postgres` tools to understand the data model:

Tool: `query`
SQL: "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'payments'"

### Step 4: Generate Context-Aware Tests

Combine all context to generate a test:

```typescript
// Context gathered via MCP:
// 1. File content of payment.ts
// 2. Recent commit message: "Add support for partial refunds"
// 3. DB Schema: payments table has 'refund_amount' column

// Generated Test:
it('should handle partial refunds correctly', async () => {
  // ... test implementation using actual DB schema and code logic
});
```

```

### Exercise

1. Install the filesystem MCP server locally (if possible) or simulate the configuration
2. Define a workflow that combines at least 2 different MCP servers
3. Simulate the tool outputs for a specific feature in your project
4. Generate tests based on that multi-source context

### Deliverable

- `mcp-config.json` definition
- `workflow-simulation.md` showing tool calls and outputs
- `generated-mcp-tests.ts`


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
