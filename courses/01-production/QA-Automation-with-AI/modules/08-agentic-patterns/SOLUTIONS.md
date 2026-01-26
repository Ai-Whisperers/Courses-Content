# Module 8 Solutions: Applying Agentic Patterns to Testing

**For Instructor Use** - Share with students only after they've attempted exercises.

---

## Exercise Solutions

### Part 1: Prompt Chaining Workflow

**Sample 4-Step Chain:**

```
Step 1: Analyze
Analyze this code and list all testable units:
[code]

Step 2: Plan
Create test cases for these units:
[Step 1 output]

Step 3: Implement
Generate test code for these cases:
[Step 2 output]

Step 4: Validate
Review and improve these tests:
[Step 3 output]
```

**Grading Notes:**
- Should show clear progression
- Each step should build on previous
- Final output should be high quality
- Should document improvements at each step

---

### Part 2: Reflection Loop

**Sample Scoring Rubric:**

```
Rubric (0-10 points):
- All paths covered: 0-3 points
- Meaningful assertions: 0-3 points
- Edge cases included: 0-3 points
- Proper isolation: 0-1 points

Pass threshold: 10+ points
```

---

### Part 3: RAG Knowledge Base

**Sample Knowledge Base Structure:**

```markdown
# Test Knowledge Base

## Patterns
- How we structure tests
- Common assertions
- Mock patterns

## Conventions
- Naming: test_<function>_<scenario>_<expected>
- Organization: tests/ directory
- Data factories: Use faker library

## Known Edge Cases
- Empty arrays
- Null values
- Boundary values

## Security Tests
- Input validation
- Authentication
- Authorization
```

---

## Quiz Answer Key

### Multiple Choice Answers

1. **b** - Agents use tools to accomplish complex tasks
2. **c** - Reflection involves analyzing and improving output
3. **b** - RAG retrieves relevant context for better responses
4. **a** - Chaining connects multiple steps sequentially
5. **c** - Agents should handle errors gracefully

### True/False Answers

6. **True** - Agents can use multiple tools
7. **True** - Reflection improves output quality
8. **False** - Agents need clear tool definitions
9. **True** - RAG helps with context-specific tasks
10. **False** - Agents should have error handling

---

## Grading Rubric Summary

| Criterion | Points | Expectations |
|-----------|--------|--------------|
| Chaining Implementation | 30 | Clear steps, proper progression |
| Reflection Loop | 25 | Scoring rubric, improvement tracking |
| RAG Knowledge Base | 25 | Comprehensive, well-organized |
| Output Quality | 15 | High-quality final tests |
| Documentation | 5 | Clear explanation |
| **Total** | **100** | |

**Passing**: 70+ points
