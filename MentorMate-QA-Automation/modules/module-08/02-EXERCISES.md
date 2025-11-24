# Module 8: Agentic Testing Patterns - Exercises

**Total Time**: 2.75 hours (165 minutes)
**Format**: Individual work with instructor checkpoints

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Exercise Overview

This module contains four hands-on exercises designed to build your skills with each agentic pattern:

1. **Exercise 8.1**: Prompt Chaining (45 minutes)
2. **Exercise 8.2**: Reflection Loop (30 minutes)
3. **Exercise 8.3**: Test Knowledge Base (45 minutes)
4. **Exercise 8.4**: MCP Tool Integration (45 minutes)

**Total Points**: 400 (100 points per exercise)

---

## Exercise 8.1: Prompt Chaining for Test Generation

**Objective**: Build and execute a multi-step prompt chain that breaks complex test generation into manageable phases.

**Duration**: 45 minutes

**Difficulty**: Intermediate

---

### Scenario

You're tasked with generating comprehensive tests for a shopping cart module with the following functionality:
- `addToCart(productId, quantity)` - Add items to cart
- `removeFromCart(productId)` - Remove items
- `updateQuantity(productId, quantity)` - Update item quantity
- `calculateTotal()` - Calculate cart total with discounts
- `applyDiscount(code)` - Apply discount code
- `checkout()` - Process checkout

Instead of one large prompt, build a 4-step chain.

---

### Part 1: Design Your Chain (10 minutes)

Design a 4-step prompt chain for this task. For each step, define:

**Step Template**:
```markdown
## Step [Number]: [Name]

**Purpose**: What this step accomplishes

**Input**: What information it needs

**Output**: What it produces

**Prompt**:
```
[Write the actual prompt]
```

**Validation**: How to verify output quality before proceeding
```

---

### Part 2: Implement the Chain (25 minutes)

Execute each step of your chain sequentially:

1. **Run Step 1** → Copy output
2. **Validate output** → Verify it meets requirements
3. **Run Step 2** with Step 1 output → Copy output
4. **Validate output** → Continue if good
5. **Run Step 3** with Step 2 output → Copy output
6. **Validate output** → Continue if good
7. **Run Step 4** with Step 3 output → Final result

**Document each step**:
- The exact prompt you used
- The output received
- Whether validation passed
- Any adjustments made

---

### Part 3: Compare to Single Prompt (10 minutes)

Now generate tests using a single large prompt:

```
Generate comprehensive Jest tests for this shopping cart module:

[Paste all 6 functions]

Include unit tests for all functions, cover edge cases,
use proper mocks, follow best practices.
```

**Compare**:
1. Quality of test coverage
2. Assertion specificity
3. Edge case handling
4. Mock usage
5. Overall structure

**Write comparison**: Which approach produced better tests? Why?

---

### Deliverables

Submit a document containing:

1. **Chain Design** (chain-design.md)
   - All 4 steps with prompts
   - Input/output specifications
   - Validation criteria

2. **Chain Execution Log** (chain-execution.md)
   - Prompt used for each step
   - Output received
   - Validation results
   - Any adjustments made

3. **Comparison Analysis** (comparison.md)
   - Chain results
   - Single prompt results
   - Side-by-side quality comparison
   - Recommendation for when to use each approach

---

### Grading Rubric (100 points)

| Criteria | Excellent (90-100) | Good (70-89) | Needs Improvement (50-69) | Insufficient (0-49) |
|----------|-------------------|--------------|---------------------------|---------------------|
| **Chain Design** (25 pts) | Well-structured 4 steps with clear boundaries | 4 steps present, some overlap | Steps unclear or poorly bounded | Missing steps or no structure |
| **Prompt Quality** (25 pts) | Specific, detailed prompts for each step | Good prompts, minor gaps | Vague prompts | Poorly written prompts |
| **Execution** (25 pts) | All steps documented with validation | Most steps documented | Some steps missing | Poor documentation |
| **Comparison** (15 pts) | Thorough analysis with specific examples | Good comparison | Basic comparison | Minimal comparison |
| **Quality of Results** (10 pts) | Chain produces superior tests | Both approaches work | Chain doesn't improve quality | Chain produces worse results |

---

### Example Chain Structure

```markdown
## Step 1: Analyze Functions

**Purpose**: Identify all testable units and their complexity

**Input**: Shopping cart module code

**Output**: Structured list of functions with metadata

**Prompt**:
```
Analyze this shopping cart module and list all testable units.

[Code]

For each function:
- Name and signature
- Parameters and types
- Return type
- Dependencies (what it calls)
- Complexity: Low/Medium/High
- Risk level: Low/Medium/High

Output as structured list.
```

**Validation**: All 6 functions listed with complete metadata
```

---

### Tips for Success

- Each step should have a single clear purpose
- Validate output before moving to next step
- If a step produces poor output, refine the prompt and retry
- Each step's output should be usable by the next step
- Don't skip validation - it's where chaining's value lies

---

## Exercise 8.2: Reflection Loop for Quality Improvement

**Objective**: Implement an iterative quality improvement loop using self-critique and revision.

**Duration**: 30 minutes

**Difficulty**: Intermediate

---

### Scenario

You have generated initial tests for a user authentication function, but they're not production-ready. Use the reflection pattern to improve them iteratively.

**Function to Test**:
```javascript
async function authenticateUser(email, password) {
  if (!email || !password) {
    throw new Error('Email and password required');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  if (user.isLocked) {
    throw new Error('Account locked');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  await user.update({ lastLoginAt: new Date() });

  return { token, userId: user.id };
}
```

---

### Part 1: Create Quality Rubric (5 minutes)

Design a scoring rubric with 4-5 criteria:

**Template**:
```markdown
## Test Quality Rubric

### 1. [Criterion Name] (0-3 points)
- 3 points: [Description]
- 2 points: [Description]
- 1 point: [Description]
- 0 points: [Description]

### 2. [Criterion Name] (0-3 points)
[Same structure]

...

**Total Possible**: 12-15 points
**Passing Threshold**: 10 points
```

---

### Part 2: Generate Initial Tests (5 minutes)

Use a simple prompt to generate initial tests:

```
Generate Jest unit tests for this authenticateUser function.

[Paste function]

Use mocks for dependencies, cover main scenarios.
```

**Document**: Initial test code and your immediate assessment

---

### Part 3: Run Reflection Loop (15 minutes)

Execute the critique-improve loop:

**Iteration 1**:
```
Critique Prompt:
Review these tests against this rubric:

Tests:
[Paste initial tests]

Rubric:
[Paste your rubric]

For each criterion:
1. Assign score (0-3)
2. Explain the score
3. Identify specific gaps

Total score and whether it passes threshold.
```

**Document**: Scores, gaps identified, total score

**If score < threshold**:
```
Improvement Prompt:
Improve these tests to address all critique points.

Current tests:
[Paste tests]

Critique:
[Paste critique with specific gaps]

Generate improved version targeting 10+ score.
```

**Repeat** until score >= threshold (max 3 iterations)

---

### Part 4: Analyze Results (5 minutes)

Document your reflection journey:
- Initial score
- Issues identified each iteration
- Improvements made each iteration
- Final score
- Total iterations needed
- Most impactful improvements

---

### Deliverables

Submit:

1. **Quality Rubric** (rubric.md)
   - 4-5 specific criteria
   - Clear point definitions
   - Passing threshold

2. **Reflection Log** (reflection-log.md)
   - Initial tests
   - Iteration 1: Critique, score, improvements
   - Iteration 2 (if needed): Same
   - Iteration 3 (if needed): Same
   - Final tests with score

3. **Analysis** (analysis.md)
   - What improved most?
   - Did reflection work effectively?
   - When is this pattern most valuable?

---

### Grading Rubric (100 points)

| Criteria | Excellent (90-100) | Good (70-89) | Needs Improvement (50-69) | Insufficient (0-49) |
|----------|-------------------|--------------|---------------------------|---------------------|
| **Rubric Quality** (25 pts) | Specific, measurable criteria | Good criteria, some vague | Somewhat vague | Too vague or missing |
| **Critique Accuracy** (25 pts) | Identifies real gaps accurately | Mostly accurate | Some gaps missed | Inaccurate critique |
| **Improvements** (30 pts) | Clear quality improvement each iteration | Some improvement | Minimal improvement | No improvement |
| **Documentation** (15 pts) | Complete log of all iterations | Most iterations documented | Some documentation | Poor documentation |
| **Analysis** (5 pts) | Insightful reflection on process | Basic analysis | Minimal analysis | No analysis |

---

### Example Rubric

```markdown
## Test Quality Rubric for Authentication Tests

### 1. Path Coverage (0-3 points)
- 3 = All paths covered (success, all error cases, edge cases)
- 2 = Main paths covered (success + major errors)
- 1 = Only happy path tested
- 0 = Incomplete or missing tests

### 2. Assertion Quality (0-3 points)
- 3 = Specific assertions on all important values
- 2 = Basic assertions present
- 1 = Weak assertions (only toBeDefined)
- 0 = Missing or incorrect assertions

### 3. Mock Usage (0-3 points)
- 3 = All dependencies properly mocked and verified
- 2 = Mocks present but missing verifications
- 1 = Some dependencies not mocked
- 0 = No mocking or incorrect mocks

### 4. Error Handling (0-3 points)
- 3 = All error scenarios tested with specific messages
- 2 = Main errors tested
- 1 = Only one error case tested
- 0 = No error testing

### 5. Security Considerations (0-3 points)
- 3 = Tests verify timing attacks prevention, account locking
- 2 = Tests basic security (locked accounts)
- 1 = Minimal security testing
- 0 = No security testing

**Total**: 15 points
**Pass**: 12+ points
```

---

### Tips for Success

- Make rubric criteria specific and measurable
- Include examples in critique of what's missing
- Don't expect perfection - 10/12 is great
- Limit to 3 iterations - if not converging, revise rubric
- Focus on biggest gaps first

---

## Exercise 8.3: Build a Test Knowledge Base

**Objective**: Extract patterns from existing tests and build a knowledge base for RAG-powered test generation.

**Duration**: 45 minutes

**Difficulty**: Advanced

---

### Scenario

Your team has written tests for 2 years, but new team members struggle to match the quality and style. You'll build a knowledge base that captures your team's testing patterns and conventions.

---

### Part 1: Gather Sample Tests (5 minutes)

Collect 5-10 of your best test files. If you don't have existing tests, use these provided samples:

**Option A**: Use your actual project tests (preferred)

**Option B**: Use provided sample tests from lab project

---

### Part 2: Extract Patterns (20 minutes)

Use AI to analyze and extract patterns:

**Prompt**:
```
Analyze these test files and extract reusable patterns.

Test Files:
[Paste 5-10 test files]

For each pattern you identify, create an entry with:

1. **Pattern Name**: Descriptive title
2. **Category**: (Test Structure | Assertions | Mocking | Setup/Teardown | Domain-Specific)
3. **Description**: What this pattern does
4. **When to Use**: Specific scenarios
5. **Code Example**: Complete, runnable example
6. **Key Points**: Important things to remember
7. **Anti-Patterns**: What NOT to do

Organize by category. Make each entry standalone and searchable.
Output in Markdown format.
```

**Review** the extracted patterns and refine/organize them.

---

### Part 3: Organize Knowledge Base (10 minutes)

Structure your knowledge base for easy retrieval:

**Suggested Structure**:
```markdown
# Test Pattern Knowledge Base

## Table of Contents
- [Test Structure Patterns](#test-structure-patterns)
- [Assertion Patterns](#assertion-patterns)
- [Mocking Patterns](#mocking-patterns)
- [Setup/Teardown Patterns](#setup-teardown-patterns)
- [Domain-Specific Patterns](#domain-specific-patterns)
- [Security Test Patterns](#security-test-patterns)
- [Performance Test Patterns](#performance-test-patterns)
- [Anti-Patterns to Avoid](#anti-patterns-to-avoid)

---

## Test Structure Patterns

### Pattern: [Name]
**Category**: Test Structure
**Description**: [What it does]
**When to Use**: [Scenarios]
**Code Example**:
```javascript
[Example]
```
**Key Points**:
- [Point 1]
- [Point 2]

**Anti-Patterns**:
- [What not to do]

---

[More patterns...]
```

---

### Part 4: Test the Knowledge Base (10 minutes)

Use your knowledge base with RAG:

**Prompt**:
```
Generate tests for this new feature using our team patterns.

Feature to test:
[Paste a new function/module]

Relevant patterns from knowledge base:
"""
[Paste 2-3 relevant patterns from your KB]
"""

Follow the patterns shown above. Use same:
- Test structure
- Assertion style
- Mocking approach
- Naming conventions
```

**Evaluate**: Do the generated tests match your team's style?

---

### Deliverables

Submit:

1. **Knowledge Base** (test-patterns-kb.md)
   - 10-15 pattern entries
   - Organized by category
   - Table of contents
   - Searchable structure

2. **Extraction Process** (extraction-notes.md)
   - Prompts used
   - How you refined outputs
   - Challenges encountered

3. **Usage Example** (rag-test-example.md)
   - New feature tested using KB
   - Patterns retrieved and used
   - Generated tests
   - Quality assessment

---

### Grading Rubric (100 points)

| Criteria | Excellent (90-100) | Good (70-89) | Needs Improvement (50-69) | Insufficient (0-49) |
|----------|-------------------|--------------|---------------------------|---------------------|
| **Pattern Quality** (30 pts) | Specific, actionable patterns with complete examples | Good patterns, some incomplete | Vague patterns | Poor or missing patterns |
| **Organization** (20 pts) | Well-structured, easy to search and retrieve | Organized but could be better | Some organization | Poorly organized |
| **Completeness** (20 pts) | 10+ patterns across categories | 7-9 patterns | 4-6 patterns | < 4 patterns |
| **Code Examples** (15 pts) | Complete, runnable examples | Good examples, minor gaps | Incomplete examples | Poor examples |
| **Usage Test** (15 pts) | RAG generates tests matching team style | Mostly matches | Partially matches | Doesn't match |

---

### Example Pattern Entry

```markdown
### Pattern: API Endpoint Testing with Authentication

**Category**: Domain-Specific

**Description**:
Standard pattern for testing authenticated API endpoints in Express applications. Handles authentication, request/response validation, and authorization checks.

**When to Use**:
- Testing protected API routes
- Endpoints requiring JWT authentication
- Routes with role-based authorization

**Code Example**:
```javascript
describe('POST /api/orders', () => {
  let authToken;

  beforeEach(async () => {
    // Create test user and get auth token
    const user = await User.create({
      email: 'test@example.com',
      role: 'customer'
    });
    authToken = generateToken(user.id);
  });

  it('should create order with valid authentication', async () => {
    const orderData = {
      productId: 'prod-123',
      quantity: 2
    };

    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .send(orderData)
      .expect(201);

    expect(response.body).toMatchObject({
      productId: orderData.productId,
      quantity: orderData.quantity,
      status: 'pending'
    });
    expect(response.body.id).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
  });

  it('should reject request without authentication', async () => {
    const orderData = { productId: 'prod-123', quantity: 2 };

    await request(app)
      .post('/api/orders')
      .send(orderData)
      .expect(401);
  });

  it('should reject request with invalid token', async () => {
    const orderData = { productId: 'prod-123', quantity: 2 };

    await request(app)
      .post('/api/orders')
      .set('Authorization', 'Bearer invalid-token')
      .send(orderData)
      .expect(401);
  });

  it('should reject insufficient permissions', async () => {
    // Test with read-only user
    const readOnlyUser = await User.create({
      email: 'readonly@example.com',
      role: 'viewer'
    });
    const readOnlyToken = generateToken(readOnlyUser.id);

    await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${readOnlyToken}`)
      .send({ productId: 'prod-123', quantity: 2 })
      .expect(403);
  });
});
```

**Key Points**:
- Always test both authenticated and unauthenticated scenarios
- Verify token in `Authorization: Bearer {token}` format
- Test authorization (permissions) separately from authentication
- Use `beforeEach` to set up fresh auth state
- Verify response structure and status codes
- Test expired/invalid tokens

**Anti-Patterns**:
- ✗ Don't hardcode real tokens in tests
- ✗ Don't skip authentication tests ("assume it works")
- ✗ Don't test only happy path with auth
- ✗ Don't reuse tokens across unrelated test suites
```

---

### Tips for Success

- Start with your 5-10 absolute best tests
- Be specific in pattern descriptions
- Include complete, runnable examples
- Add "When to Use" for each pattern
- Test the KB - does RAG produce good results?
- Keep entries concise (patterns, not full docs)

---

## Exercise 8.4: MCP Tool Integration

**Objective**: Configure and use Model Context Protocol (MCP) tools to gather contextual information for test generation.

**Duration**: 45 minutes

**Difficulty**: Advanced

---

### Scenario

You need to generate tests for a feature, but the code alone isn't enough context. You need:
- Recent changes from version control
- Database schema information
- Related requirements or tickets
- Existing similar tests

Use MCP tools to gather this context before generating tests.

---

### Part 1: Configure MCP Servers (10 minutes)

Create an MCP configuration file.

**Create** `.claude/mcp.json` (or simulate if you can't install):

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "./src",
        "./tests"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://localhost/testdb"
      ]
    }
  }
}
```

**If you can't install MCP servers**, document the configuration and simulate the tool outputs.

---

### Part 2: Design MCP Workflow (15 minutes)

Design a workflow that uses multiple MCP servers to gather context.

**Scenario**: Generate tests for `PaymentService.processRefund()` method

**Workflow Template**:
```markdown
## MCP-Augmented Test Generation Workflow

### Step 1: Read Source Code (Filesystem MCP)
**Tool**: `read_file`
**Path**: `./src/services/PaymentService.js`
**Purpose**: Get the actual implementation
**Expected Output**: [Simulated or actual file content]

### Step 2: Check Recent Changes (GitHub MCP)
**Tool**: `search_commits`
**Query**: `path:PaymentService.js`
**Limit**: 5
**Purpose**: Find recent changes to understand new features
**Expected Output**: [Simulated or actual commit messages]

### Step 3: Inspect Database Schema (Postgres MCP)
**Tool**: `query`
**SQL**: `SELECT column_name, data_type, is_nullable
         FROM information_schema.columns
         WHERE table_name = 'payments'`
**Purpose**: Understand data model for test data
**Expected Output**: [Simulated or actual schema]

### Step 4: Find Similar Tests (Filesystem MCP)
**Tool**: `search_files`
**Pattern**: `*.test.js`
**Grep**: `processRefund`
**Purpose**: Find existing test patterns to follow
**Expected Output**: [List of similar test files]

### Step 5: Generate Context-Aware Tests
**Prompt**:
Based on gathered context:
- Source code: [From Step 1]
- Recent changes: [From Step 2]
- Database schema: [From Step 3]
- Similar test patterns: [From Step 4]

Generate comprehensive tests for processRefund() that:
- Cover all code paths from source
- Test new features added in recent commits
- Use correct DB column names and types
- Follow patterns from similar tests
```

---

### Part 3: Simulate Workflow Execution (15 minutes)

Since you might not have all MCP servers installed, simulate the workflow:

**For Each Step**:
1. Document the tool call you would make
2. Provide realistic simulated output
3. Explain how this context informs test generation

**Example**:
```markdown
### Step 2 Execution: Check Recent Changes

**Tool Call**:
```json
{
  "tool": "github_search_commits",
  "params": {
    "repo": "mycompany/payment-service",
    "query": "path:PaymentService.js",
    "limit": 5
  }
}
```

**Simulated Output**:
```
Commit 1: abc123 - "Add support for partial refunds" (2 days ago)
Commit 2: def456 - "Fix refund amount validation" (1 week ago)
Commit 3: ghi789 - "Add refund reason field" (2 weeks ago)
```

**Context Gained**:
- There's a NEW partial refund feature (need tests!)
- Refund validation was buggy (need validation tests!)
- Refund reason is now tracked (include in tests!)
```

---

### Part 4: Generate Context-Aware Tests (5 minutes)

Use all gathered context to generate tests:

```
Generate tests for PaymentService.processRefund().

Context gathered via tools:

**Source Code**:
[Paste simulated/real source]

**Recent Changes**:
- Added partial refund support (commit abc123)
- Fixed validation bugs (commit def456)
- Added refund reason field (commit ghi789)

**Database Schema**:
```sql
payments:
  - id (uuid, not null)
  - amount (decimal, not null)
  - refund_amount (decimal, nullable) -- NEW
  - refund_reason (text, nullable) -- NEW
  - status (varchar, not null)
```

**Similar Test Pattern**:
[Paste example from existing tests]

Generate comprehensive tests including:
- Original refund functionality
- NEW: Partial refunds (from commit)
- Refund validation (from bug fix)
- Database column names (from schema)
- Follow test pattern shown above
```

---

### Deliverables

Submit:

1. **MCP Configuration** (mcp-config.json)
   - Server definitions
   - Correct syntax
   - Appropriate tools selected

2. **Workflow Design** (mcp-workflow.md)
   - 4-5 steps using different tools
   - Clear purpose for each
   - Expected outputs documented

3. **Simulated Execution** (workflow-simulation.md)
   - Tool calls for each step
   - Simulated/real outputs
   - Context gained from each

4. **Generated Tests** (context-aware-tests.js)
   - Tests generated using all context
   - Demonstrate context usage
   - Quality comparison to tests without context

---

### Grading Rubric (100 points)

| Criteria | Excellent (90-100) | Good (70-89) | Needs Improvement (50-69) | Insufficient (0-49) |
|----------|-------------------|--------------|---------------------------|---------------------|
| **MCP Configuration** (20 pts) | Correct, complete config | Good config, minor issues | Some errors | Incorrect or missing |
| **Workflow Design** (25 pts) | Well-designed 4-5 step workflow | Good workflow, could be better | Basic workflow | Poor workflow |
| **Tool Selection** (20 pts) | Appropriate tools for each step | Mostly appropriate | Some poor choices | Incorrect tools |
| **Context Usage** (25 pts) | Tests clearly use gathered context | Some context usage | Minimal context usage | Context not used |
| **Documentation** (10 pts) | Complete, clear documentation | Good documentation | Basic documentation | Poor documentation |

---

### Example MCP Workflow Step

```markdown
### Step 2: Check Recent Changes (GitHub MCP)

**Tool**: `github_search_commits`

**Parameters**:
```json
{
  "repo": "mycompany/ecommerce",
  "query": "path:src/services/OrderService.js",
  "since": "2025-10-01",
  "limit": 10
}
```

**Purpose**:
Identify recent changes to OrderService that might need new tests or have introduced new functionality.

**Simulated Output**:
```json
{
  "commits": [
    {
      "sha": "a1b2c3d",
      "message": "feat: Add support for gift wrapping option",
      "date": "2025-11-15",
      "author": "jane@company.com",
      "files_changed": ["src/services/OrderService.js"]
    },
    {
      "sha": "e4f5g6h",
      "message": "fix: Correct tax calculation for multi-state orders",
      "date": "2025-11-10",
      "author": "john@company.com",
      "files_changed": ["src/services/OrderService.js", "src/utils/tax.js"]
    },
    {
      "sha": "i7j8k9l",
      "message": "refactor: Extract shipping logic to separate service",
      "date": "2025-11-05",
      "author": "jane@company.com",
      "files_changed": ["src/services/OrderService.js", "src/services/ShippingService.js"]
    }
  ]
}
```

**Context Gained**:
1. **New Feature**: Gift wrapping option added (needs tests!)
2. **Bug Fix**: Tax calculation was buggy for multi-state orders (need validation tests)
3. **Refactoring**: Shipping logic moved out (update mocks accordingly)

**Impact on Test Generation**:
- Must include tests for `giftWrapping` parameter
- Must test multi-state tax scenarios
- Must mock `ShippingService` instead of internal shipping logic
```

---

### Tips for Success

- Test each MCP server independently first
- Simulate realistic outputs if you can't run servers
- Design workflow to gather complementary context
- Show how context improves test quality
- Document clearly even if simulating

---

## Submission Instructions

### File Structure

Submit all exercises in this structure:

```
module-08-exercises/
├── exercise-8.1-prompt-chaining/
│   ├── chain-design.md
│   ├── chain-execution.md
│   └── comparison.md
├── exercise-8.2-reflection/
│   ├── rubric.md
│   ├── reflection-log.md
│   └── analysis.md
├── exercise-8.3-knowledge-base/
│   ├── test-patterns-kb.md
│   ├── extraction-notes.md
│   └── rag-test-example.md
└── exercise-8.4-mcp-integration/
    ├── mcp-config.json
    ├── mcp-workflow.md
    ├── workflow-simulation.md
    └── context-aware-tests.js
```

---

### Submission Checklist

- [ ] All 4 exercises completed
- [ ] All deliverable files included
- [ ] Code is properly formatted
- [ ] Documentation is clear and complete
- [ ] Examples are realistic and detailed
- [ ] Comparisons show clear analysis
- [ ] File naming matches requirements

---

## Instructor Checkpoints

### Checkpoint 1 (After Exercise 8.1)
Instructor reviews chain design before execution:
- Are steps well-bounded?
- Do prompts have clear inputs/outputs?
- Are validation criteria defined?

### Checkpoint 2 (After Exercise 8.2)
Instructor reviews rubric before reflection loop:
- Are criteria specific enough?
- Is scoring measurable?
- Is threshold achievable?

### Checkpoint 3 (After Exercise 8.3)
Instructor reviews sample patterns:
- Are patterns useful and reusable?
- Are examples complete?
- Is organization searchable?

### Checkpoint 4 (After Exercise 8.4)
Instructor reviews workflow design:
- Are tool choices appropriate?
- Does workflow gather useful context?
- Is simulation realistic?

---

## Common Challenges & Solutions

### Challenge 1: Chain Steps Overlap
**Problem**: Steps 2 and 3 both try to do similar things
**Solution**: Clearly define what each step produces; no overlap

### Challenge 2: Reflection Never Converges
**Problem**: Score stays below threshold after 3 iterations
**Solution**: Lower threshold or revise rubric to be more achievable

### Challenge 3: Knowledge Base Too Generic
**Problem**: Patterns extracted are too vague to be useful
**Solution**: Include more specific examples; be more selective about what's a "pattern"

### Challenge 4: MCP Tools Don't Work
**Problem**: Can't install or configure MCP servers
**Solution**: Fully document and simulate - that's acceptable for this exercise

---

## Time Management Tips

| Exercise | Time Allocation |
|----------|----------------|
| 8.1: Prompt Chaining | 45 min (10 design, 25 execute, 10 compare) |
| 8.2: Reflection | 30 min (5 rubric, 5 generate, 15 reflect, 5 analyze) |
| 8.3: Knowledge Base | 45 min (5 gather, 20 extract, 10 organize, 10 test) |
| 8.4: MCP Integration | 45 min (10 config, 15 design, 15 simulate, 5 generate) |

**Stay on track** - use timers for each part!

---

## Additional Practice (Optional)

### Bonus Exercise: Combine All Patterns

Build a complete workflow that uses all four patterns:

1. **MCP**: Gather context from multiple sources
2. **Prompt Chain**: Break generation into steps
3. **RAG**: Use knowledge base for consistency
4. **Reflection**: Improve quality iteratively

**Time**: 1-2 hours
**Recognition**: Showcase in class if exemplary

---

**Good luck with the exercises! Remember to use checkpoints and ask questions.**

---

*Module 08 Exercises - Version 1.0*
*MentorMate QA Automation Course (AI-Enhanced)*
*Last Updated: November 2025*
