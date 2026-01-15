# Core Module 6: Agentic Design Patterns with OpenCode
## FPUNA Summer 2026 - Advanced Core Skills

**Duration**: Integrated across Week 3  
**Tool Focus**: OpenCode Advanced Patterns  
**Prerequisites**: Modules 1-5 completed

---

## Module Overview

You've learned the basics of OpenCode. Now it's time to level up with advanced **agentic patterns** - sophisticated workflows that break complex tasks into manageable steps, self-improve through iteration, and scale to real-world complexity.

### Learning Objectives

By the end of this module, you will be able to:

1. **Apply** Prompt Chaining for multi-step workflows
2. **Implement** Reflection patterns for self-improvement
3. **Build** RAG (Retrieval-Augmented Generation) knowledge bases
4. **Parallelize** work across multiple files/modules
5. **Design** custom agentic workflows for your projects

---

## What Are Agentic Patterns?

### Definition

**Agentic patterns** are design patterns for AI-assisted development that enable:
- Breaking complex tasks into manageable steps
- Self-correction and quality improvement
- Leveraging project-specific knowledge
- Scaling to large codebases

---

### Why Patterns Matter

```
❌ Single Prompt Approach:
"Build a complete authentication system"
→ Overwhelming, incomplete, needs many iterations

✅ Agentic Pattern Approach:
Step 1: Analyze requirements → Define scope
Step 2: Design architecture → Create structure  
Step 3: Implement core → Build foundation
Step 4: Add features → Iterate deliberately
Step 5: Validate → Review and refine
→ Systematic, complete, high quality
```

---

## 6.1 Pattern 1: Prompt Chaining

### What is Prompt Chaining?

**Definition**: Breaking a complex task into sequential steps, where each step's output becomes the next step's input.

**Analogy**: Like an assembly line where each station completes one specific task before passing to the next.

---

### When to Use Chaining

Use prompt chaining when:
- Task has multiple distinct phases
- Later steps depend on earlier steps
- You need validation at each stage
- Output quality matters more than speed

**Examples**:
- Feature implementation (plan → implement → test → document)
- Codebase analysis (explore → understand → document → recommend)
- Refactoring (analyze → plan → implement → verify)

---

### Chaining Structure

```
Input (Requirements)
     ↓
Chain Link 1: Analyze
     ↓
Validation Point 1
     ↓
Chain Link 2: Design
     ↓
Validation Point 2
     ↓
Chain Link 3: Implement
     ↓
Validation Point 3
     ↓
Chain Link 4: Test
     ↓
Final Output (Complete Feature)
```

---

### Example: Feature Implementation Chain

#### Link 1: Requirements Analysis

```
Analyze the requirements for implementing [feature name].

Requirements:
[paste user requirements]

Provide:
1. **Functional Requirements**
   - What must the feature do?
   - What are the use cases?
   - What are the acceptance criteria?

2. **Technical Requirements**
   - What components are needed?
   - What dependencies exist?
   - What data structures are required?

3. **Edge Cases**
   - What could go wrong?
   - What inputs need special handling?

4. **Success Metrics**
   - How do we know it works?
   - What should we test?

Format as structured document for next step.
```

---

#### Link 2: Architecture Design

```
Design the architecture for this feature.

Requirements from Step 1:
[paste step 1 output]

Existing project structure (from .opencode):
[OpenCode auto-includes this]

Provide:
1. **Component Design**
   - What files/classes to create
   - What functions/methods needed
   - How components interact

2. **Data Flow**
   - How data enters the system
   - How it's transformed
   - How it's stored/retrieved

3. **Mermaid Diagram**
   - Visual representation of architecture

4. **Integration Points**
   - How this connects to existing code
   - What existing code needs modification

Format for implementation in next step.
```

---

#### Link 3: Implementation

```
Implement the feature based on this design.

Design from Step 2:
[paste step 2 output]

Requirements:
- Follow project conventions from .opencode
- Include error handling
- Add logging where appropriate
- Write self-documenting code

Generate:
1. All new files with complete code
2. Modifications to existing files (show diffs)
3. Configuration changes needed

Format ready for step 4 (testing).
```

---

#### Link 4: Testing & Validation

```
Create comprehensive tests for this implementation.

Implementation from Step 3:
[paste step 3 code]

Requirements from Step 1:
[paste relevant portions]

Generate:
1. **Unit Tests**
   - Test each function/method
   - Cover edge cases from Step 1

2. **Integration Tests**
   - Test component interactions
   - Test data flow

3. **E2E Tests** (if applicable)
   - Test complete user workflows

Follow testing conventions from .opencode.
```

---

### Validation Points

After each chain link, validate:

**After Link 1 (Analysis)**:
- [ ] All requirements captured?
- [ ] Edge cases identified?
- [ ] Success criteria clear?

**After Link 2 (Design)**:
- [ ] Architecture makes sense?
- [ ] Integrates with existing code?
- [ ] No obvious issues?

**After Link 3 (Implementation)**:
- [ ] Code compiles/runs?
- [ ] Follows conventions?
- [ ] Error handling present?

**After Link 4 (Testing)**:
- [ ] Tests pass?
- [ ] Coverage adequate?
- [ ] Edge cases tested?

---

## 6.2 Pattern 2: Reflection

### What is Reflection?

**Definition**: A self-improvement loop where OpenCode generates, critiques its own output, and refines until quality standards are met.

**Analogy**: Like writing a draft, reviewing it yourself, and revising until it's good enough.

---

### The Reflection Loop

```
┌─────────────┐
│   Generate  │  Create initial output
└──────┬──────┘
       │
┌──────▼──────┐
│   Critique  │  Review against standards
└──────┬──────┘
       │
    Quality?
    /     \
  Yes      No
   │        │
   │   ┌────▼────┐
   │   │  Revise  │  Improve based on critique
   │   └────┬────┘
   │        │
   │        └─────── (loop back to Critique)
   │
┌──▼────────┐
│  Complete  │
└───────────┘
```

---

### When to Use Reflection

Use reflection when:
- Quality is critical
- You have clear quality criteria
- Initial attempts might miss edge cases
- You want consistent output quality

**Examples**:
- Code generation (ensure correctness)
- Test creation (ensure completeness)
- Documentation writing (ensure clarity)
- Security reviews (ensure thoroughness)

---

### Implementing Reflection

#### Step 1: Generate

```
Generate [what you need].

Requirements:
[specifications]

[Any context needed]
```

---

#### Step 2: Critique

```
Review this [output type] against quality standards.

Output to review:
```[language]
[paste generated output]
```

Quality Rubric:
1. **Correctness** (0-3 points)
   - Logic is correct
   - Handles all cases
   - No obvious bugs

2. **Completeness** (0-3 points)
   - All requirements covered
   - Edge cases handled
   - Error handling present

3. **Quality** (0-3 points)
   - Follows conventions
   - Well-structured
   - Maintainable

4. **Security** (0-3 points) [if applicable]
   - No vulnerabilities
   - Input validated
   - Safe operations

Score each criterion (0-3).
Explain all deductions.
List specific improvements needed.

Minimum passing score: 10/12 points.
```

---

#### Step 3: Revise

```
Improve this [output] based on the critique.

Current version:
```[language]
[paste output]
```

Critique:
[paste critique with scores and issues]

Requirements:
- Fix all identified issues
- Maintain functionality
- Follow conventions from .opencode
- Aim for score of 12/12

Provide improved version with changes explained.
```

---

#### Step 4: Re-Critique (if needed)

```
Review the improved version against the rubric.

Improved version:
```[language]
[paste revised output]
```

Original issues:
[paste issues from first critique]

Use same rubric. Check if issues are resolved.
Score must be 10+ to pass.
```

---

### Example: Code Quality Reflection

**Generate**:
```typescript
// OpenCode generates initial implementation
function processPayment(amount: number, userId: string) {
  const user = database.getUser(userId);
  user.balance -= amount;
  database.updateUser(user);
  return { success: true };
}
```

**Critique**:
```
Correctness: 1/3 - No validation, can create negative balance
Completeness: 1/3 - Missing error handling, no transaction safety
Quality: 2/3 - Simple structure, but missing types for return
Security: 0/3 - No input validation, SQL injection risk

Total: 4/12 - FAIL

Issues:
1. No amount/userId validation
2. Can create negative balance
3. No error handling
4. Not using transactions
5. Return type not defined
```

**Revise**:
```typescript
// Improved version after reflection
interface PaymentResult {
  success: boolean;
  error?: string;
  transactionId?: string;
}

async function processPayment(
  amount: number, 
  userId: string
): Promise<PaymentResult> {
  // Input validation
  if (amount <= 0) {
    return { success: false, error: 'Invalid amount' };
  }
  
  if (!userId || userId.trim() === '') {
    return { success: false, error: 'Invalid user ID' };
  }

  try {
    // Use transaction for safety
    return await database.transaction(async (trx) => {
      const user = await trx.getUser(userId);
      
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      
      // Check sufficient balance
      if (user.balance < amount) {
        return { success: false, error: 'Insufficient funds' };
      }
      
      // Process payment
      user.balance -= amount;
      await trx.updateUser(user);
      
      const transaction = await trx.createTransaction({
        userId,
        amount,
        type: 'payment',
        timestamp: new Date()
      });
      
      return { 
        success: true, 
        transactionId: transaction.id 
      };
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return { 
      success: false, 
      error: 'Payment processing failed' 
    };
  }
}
```

**Re-Critique**:
```
Correctness: 3/3 - All cases handled correctly
Completeness: 3/3 - Validation, error handling, transactions
Quality: 3/3 - Well-structured, typed, documented
Security: 3/3 - Input validated, uses parameterized queries via ORM

Total: 12/12 - PASS
```

---

## 6.3 Pattern 3: RAG (Retrieval-Augmented Generation)

### What is RAG?

**Definition**: Using a knowledge base to provide context that improves OpenCode's output quality and relevance.

**Analogy**: Like giving OpenCode a textbook to reference before solving a problem.

---

### When to Use RAG

Use RAG when:
- You have established patterns to follow
- Project has specific conventions
- Need to maintain consistency across codebase
- Have documented best practices

**Examples**:
- Component library (follow existing patterns)
- API endpoints (match existing structure)
- Database schemas (align with conventions)
- Testing strategies (use proven patterns)

---

### Building a Knowledge Base

#### What to Include

1. **Code Patterns**
   - How similar features are implemented
   - Common utilities and helpers
   - Design patterns used in project

2. **Conventions**
   - Naming standards
   - File organization
   - Code structure

3. **Best Practices**
   - Security guidelines
   - Performance patterns
   - Error handling approaches

4. **Common Solutions**
   - How to handle specific scenarios
   - Reusable code snippets
   - Known edge cases and solutions

---

### Creating Knowledge Base

```
Create a knowledge base for [area] in our project.

Analyze existing code in:
- [directory/files related to area]

Extract and document:

## 1. Patterns
- How do we structure [components/functions/classes]?
- What common patterns appear?
- Show 2-3 examples

## 2. Conventions
- Naming rules
- File organization
- Import styles
- Error handling

## 3. Common Utilities
- Shared helpers used
- When to use each
- Examples of usage

## 4. Edge Cases
- Known problematic scenarios
- How we handle them
- Tests that verify

## 5. Anti-Patterns
- What to avoid
- Why to avoid it
- Better alternatives

Format for easy retrieval and reference.
Save to: knowledge-base/[area].md
```

---

### Using Knowledge Base

```
Generate [what you need] following our established patterns.

Reference: knowledge-base/[area].md
[paste relevant sections from knowledge base]

Requirements:
- Follow patterns shown above
- Use conventions documented
- Avoid anti-patterns listed
- Include edge case handling demonstrated

Context from .opencode:
[OpenCode includes project config]

Generate production-ready code.
```

---

### Example: Component Generation with RAG

**Knowledge Base** (knowledge-base/react-components.md):
```markdown
## React Component Patterns

### Structure
```typescript
// Pattern: Functional component with TypeScript
interface ComponentNameProps {
  // Props interface first
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // Hooks at top
  // Event handlers
  // Render logic
  return ( /* JSX */ );
}
```

### Conventions
- PascalCase for components
- Props interface named `ComponentNameProps`
- Export named (not default)
- Destructure props in signature

### Common Utilities
- `cn()` for className merging
- `useToast()` for notifications
- `Button`, `Input` from `@/components/ui`

### Edge Cases
- Always handle loading states
- Always handle error states
- Add loading skeleton for async data
```

**Using RAG**:
```
Create a ProductCard component for the shop page.

Reference our component patterns:
[paste knowledge base section above]

Requirements:
- Show product image, name, price
- Add to cart button
- Handle loading state
- Handle out of stock
- Use our UI components (Button, etc.)

Follow all patterns and conventions from knowledge base.
```

**Result**: OpenCode generates a component that perfectly matches project patterns, uses correct utilities, and handles all edge cases from knowledge base.

---

## 6.4 Pattern 4: Parallelization

### What is Parallelization?

**Definition**: Generating multiple independent pieces of code simultaneously to save time.

**Analogy**: Like having multiple workers each building one room of a house instead of one worker building all rooms sequentially.

---

### When to Parallelize

Use parallelization when:
- You have multiple independent modules
- Time is constrained
- Components don't depend on each other
- Need to scale quickly

**Examples**:
- Multiple API endpoints
- Multiple React components
- Multiple database models
- Multiple test suites

---

### Parallelization Strategy

```
1. Identify independent units (files, components, modules)
2. Create generation prompts for each
3. Generate in parallel
4. Normalize outputs (ensure consistency)
5. Merge (check for conflicts)
6. Validate (ensure they work together)
```

---

### Implementation

**Step 1: Identify & Plan**
```
I need to create these independent components:
1. Component A - [description]
2. Component B - [description]
3. Component C - [description]

They share these requirements:
- [shared convention 1]
- [shared convention 2]

Create a generation plan:
- What each component should do
- Shared dependencies
- Potential conflicts to watch for
```

**Step 2: Generate in Parallel**

(Open multiple OpenCode instances or use different sessions)

**Session 1**:
```
Create Component A.
[specifications]
Follow .opencode conventions.
```

**Session 2**:
```
Create Component B.
[specifications]
Follow .opencode conventions.
```

**Session 3**:
```
Create Component C.
[specifications]
Follow .opencode conventions.
```

**Step 3: Normalize**
```
Normalize these independently generated components for consistency:

Component A:
```[language]
[paste component A]
```

Component B:
```[language]
[paste component B]
```

Component C:
```[language]
[paste component C]
```

Ensure:
- Consistent import styles
- Consistent naming
- No duplicate code
- Shared utilities extracted
- Same patterns used

Provide normalized versions.
```

---

## 6.5 Combining Patterns

### When to Combine

Real-world tasks often benefit from combining multiple patterns:

| Task | Patterns to Combine |
|------|---------------------|
| New feature development | Chaining + Reflection + RAG |
| Large refactoring | Chaining + Parallelization |
| Test suite creation | RAG + Reflection + Parallelization |
| Code review automation | Chaining + Reflection |

---

### Example: Feature Development Workflow

```
1. Requirements Analysis (Chain Link 1)
2. Check Knowledge Base (RAG)
   - Retrieve similar feature patterns
3. Architecture Design (Chain Link 2)
4. Parallel Implementation (Parallelization)
   - Generate all components simultaneously
5. Quality Review (Reflection)
   - Critique and improve each component
6. Integration & Testing (Chain Link 3)
7. Final Validation (Reflection)
   - Overall quality check
```

---

## 6.6 Practical Exercises

### Exercise 6.1: Build a Chained Workflow

**Objective**: Create a 4-step chain for implementing a feature

**Time**: 90 minutes

**Task**: Implement a "Password Reset" feature using prompt chaining

**Steps**:

1. **Link 1 - Analysis** (15 min):
   - Analyze requirements for password reset
   - Identify edge cases
   - Define success criteria

2. **Link 2 - Design** (20 min):
   - Design architecture
   - Create component diagram
   - Define data flow

3. **Link 3 - Implementation** (30 min):
   - Generate all code
   - Follow .opencode conventions
   - Include error handling

4. **Link 4 - Testing** (25 min):
   - Create comprehensive tests
   - Cover all edge cases
   - Validate functionality

**Deliverable**:
- Complete feature with tests
- Documentation of each chain step
- Validation checklist completed

---

### Exercise 6.2: Implement Reflection Loop

**Objective**: Use reflection to improve code quality

**Time**: 60 minutes

**Task**: Generate a complex function and improve it through reflection

**Steps**:

1. **Generate** (15 min):
   - Create a data processing function
   - Should transform user input
   - Include validation and error handling

2. **Create Rubric** (10 min):
   - Define quality criteria
   - Set minimum score

3. **Critique** (15 min):
   - Review against rubric
   - Identify issues
   - Assign scores

4. **Revise** (20 min):
   - Fix all issues
   - Re-critique
   - Iterate until passing

**Deliverable**:
- Initial version
- Critique with scores
- Improved version
- Final scores showing improvement

---

### Exercise 6.3: Build a Knowledge Base

**Objective**: Create a RAG knowledge base for your project

**Time**: 90 minutes

**Steps**:

1. **Identify Area** (10 min):
   - Choose an area (API routes, components, etc.)
   - Determine scope

2. **Extract Patterns** (30 min):
   - Analyze existing code
   - Document patterns
   - Capture conventions

3. **Document Best Practices** (20 min):
   - Security guidelines
   - Performance tips
   - Common solutions

4. **Create Examples** (20 min):
   - Add 3-5 code examples
   - Show good patterns
   - Show anti-patterns

5. **Test Knowledge Base** (10 min):
   - Use it to generate new code
   - Verify it matches patterns

**Deliverable**:
- Complete knowledge base document
- Example of code generated using it
- Comparison showing consistency

---

### Exercise 6.4: Parallel Generation

**Objective**: Generate multiple components in parallel

**Time**: 60 minutes

**Task**: Create 3 related but independent components simultaneously

**Steps**:

1. **Plan** (10 min):
   - Define 3 components
   - Ensure independence
   - List shared requirements

2. **Generate in Parallel** (25 min):
   - Create all 3 simultaneously
   - Follow same conventions

3. **Normalize** (15 min):
   - Ensure consistency
   - Extract shared code
   - Fix conflicts

4. **Validate** (10 min):
   - Test individually
   - Test together
   - Verify integration

**Deliverable**:
- 3 components that work together
- Normalized, consistent code
- Integration tests

---

## Knowledge Check Quiz

1. **What is Prompt Chaining?**
   - a) Using multiple AIs at once
   - b) Breaking tasks into sequential steps
   - c) Linking prompts with chains
   - d) Generating long responses

2. **What does Reflection do?**
   - a) Mirrors code to production
   - b) Self-critique and improvement loop
   - c) Reflects on past conversations
   - d) Creates backups

3. **What is RAG?**
   - a) Random AI Generation
   - b) Rapid Application Generator
   - c) Retrieval-Augmented Generation
   - d) Review and Approval Gateway

4. **When should you parallelize?**
   - a) Always, for speed
   - b) Never, too complex
   - c) When components are independent
   - d) Only for large files

5. **What's the benefit of combining patterns?**
   - a) Faster generation
   - b) More complexity
   - c) Better quality and efficiency
   - d) Longer prompts

**Answer Key**: [1-b, 2-b, 3-c, 4-c, 5-c]

---

## Module 6 Summary

You now master advanced agentic patterns:

### Key Concepts
- ✅ Prompt Chaining for multi-step workflows
- ✅ Reflection for self-improvement loops
- ✅ RAG for knowledge-augmented generation
- ✅ Parallelization for scaling
- ✅ Combining patterns for complex tasks

### Skills Developed
- ✅ Design sophisticated AI workflows
- ✅ Build and use knowledge bases
- ✅ Implement quality feedback loops
- ✅ Scale code generation efficiently
- ✅ Create production-ready outputs

### Practical Applications
- ✅ Can build complete features systematically
- ✅ Can ensure consistent high quality
- ✅ Can leverage project knowledge
- ✅ Can work at professional scale
- ✅ Ready for real-world projects

---

## 🎉 Core Fundamentals Complete!

**Congratulations!** You've completed all 6 core modules:

1. ✅ **Module 1** - Introduction to OpenCode
2. ✅ **Module 2** - Context Engineering
3. ✅ **Module 3** - Private Repositories
4. ✅ **Module 4** - Documentation
5. ✅ **Module 5** - Code Validation
6. ✅ **Module 6** - Agentic Patterns

You're now ready to choose your specialization track!

---

## Next Steps: Specialization Tracks

**Weeks 4-8**: Choose your path:

### Track A: QA Automation with OpenCode
- Advanced testing frameworks
- Test generation at scale
- CI/CD integration
- Test automation mastery

### Track B: Web Development with OpenCode
- Full-stack development
- React/Next.js applications
- API development
- Production deployment

**Both tracks build on these core fundamentals to make you job-ready!**

---

## Additional Resources

### Agentic Patterns
- [LangChain Agents](https://python.langchain.com/docs/modules/agents/)
- [ReAct Pattern](https://react-lm.github.io/)
- [Chain-of-Thought Prompting](https://arxiv.org/abs/2201.11903)

### RAG Resources
- [RAG Best Practices](https://docs.llamaindex.ai/en/stable/optimizing/basic_strategies/basic_strategies.html)
- [Building Knowledge Bases](https://www.pinecone.io/learn/retrieval-augmented-generation/)

### Examples
- [OpenCode Patterns Repository](https://github.com/opencode/patterns)
- [Agentic Workflows Cookbook](https://github.com/opencode/cookbook)

---

**Module Status**: ✅ All Core Modules Complete

**Next**: [Track Selection Guide](./TRACK-SELECTION-GUIDE.md)
