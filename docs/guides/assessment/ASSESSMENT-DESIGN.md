# Assessment Design Guide

> How to design effective assessments for AI Whisperers courses

---

## Assessment Components

### 1. Module Quizzes

**Purpose:** Validate understanding of key concepts

**Design Principles:**
- 10-15 questions per quiz
- Mix of question types
- Open book/notes (tests application, not memorization)
- 70% passing threshold
- Allow retakes with delay

**Question Types:**

**Multiple Choice:**
```
Q: When should you use Claude Opus vs. Haiku?
A) Opus for simple tasks, Haiku for complex reasoning
B) Haiku for simple tasks, Opus for complex reasoning
C) Always use Opus for best results
D) Model choice doesn't matter
Answer: B
```

**Scenario-Based:**
```
Q: You ask AI to generate tests for a login form. The tests pass
but don't cover error cases. What should you do?
A) Accept the tests as-is
B) Manually add error cases without AI
C) Refine prompt to explicitly request error cases
D) This proves AI isn't useful
Answer: C
```

**Practical Application:**
```
Q: Given this code snippet, which test approach is most appropriate?
[code block]
A) Unit test with mocks
B) Integration test
C) E2E test
D) Manual testing
Answer: [varies by context]
```

---

### 2. Hands-On Exercises

**Purpose:** Build practical skills through coding

**Design Principles:**
- Progressive difficulty within each exercise
- 4-5 tasks per exercise
- Real-world scenarios
- Clear success criteria
- Include hints for common issues

**Exercise Structure:**

```markdown
# Exercise: [Title]

## Objective
[What students will accomplish]

## Prerequisites
- [Required knowledge/tools]

## Tasks

### Task 1: [Setup/Foundation] (15 min)
[Instructions]
**Success Criteria:** [What a passing submission looks like]

### Task 2: [Core Skill] (20 min)
[Instructions]
**Success Criteria:** [Criteria]

### Task 3: [Application] (25 min)
[Instructions]
**Success Criteria:** [Criteria]

### Task 4: [Challenge - Optional] (30 min)
[Advanced task for extra credit]

## Submission
- [ ] [Deliverable 1]
- [ ] [Deliverable 2]
- [ ] [Reflection/notes]
```

---

### 3. Milestone Projects

**Purpose:** Progressive skill demonstration with feedback checkpoints

**Milestone Design:**

| Milestone | Timing | Weight | Focus |
|-----------|--------|--------|-------|
| 1 | Week 4 | 7% | Foundation + Documentation |
| 2 | Week 8 | 7% | Core Implementation |
| 3 | Week 11 | 6% | Integration + Polish |

**Deliverables per Milestone:**
- Working code/project
- Documentation
- Reflection on process
- AI interaction log (if applicable)

---

### 4. Final Capstone Project

**Purpose:** Demonstrate mastery of course content

**Requirements:**
- Real-world application
- Comprehensive deliverables
- Documentation
- Presentation/demo

**Capstone Grading Categories:**

| Category | Weight | Description |
|----------|--------|-------------|
| Technical Quality | 30% | Code quality, architecture, best practices |
| Completeness | 25% | All requirements met |
| Documentation | 20% | Clear, comprehensive docs |
| Presentation | 15% | Demo quality, communication |
| Innovation | 10% | Creative solutions, extra features |

---

## Rubric Templates

### Code Quality Rubric

| Criteria | Excellent (90-100%) | Good (80-89%) | Satisfactory (70-79%) | Needs Work (<70%) |
|----------|---------------------|---------------|------------------------|-------------------|
| **Functionality** | Works perfectly, handles edge cases | Works correctly, minor issues | Basic functionality | Does not work |
| **Code Structure** | Clean, well-organized, reusable | Good organization | Acceptable structure | Disorganized |
| **Documentation** | Comprehensive, clear | Complete, mostly clear | Basic | Inadequate |
| **Best Practices** | Follows all conventions | Most conventions followed | Some conventions | Few/none |

### Test Quality Rubric

| Criteria | Excellent | Good | Satisfactory | Needs Improvement |
|----------|-----------|------|--------------|-------------------|
| **Coverage** | >90% critical paths | 70-90% coverage | 50-70% coverage | <50% coverage |
| **Independence** | All tests isolated | Most isolated | Some dependencies | Many dependencies |
| **Assertions** | Specific, meaningful | Adequate | Generic | Missing/weak |
| **Maintainability** | Easy to update | Moderate effort | Difficult | Very difficult |

### Presentation Rubric

| Criteria | Points | Excellent | Good | Needs Work |
|----------|--------|-----------|------|------------|
| Clarity | 0-3 | Logical flow, clear | Mostly clear | Confusing |
| Demo | 0-3 | Smooth, comprehensive | Works, some gaps | Issues/incomplete |
| Technical Depth | 0-2 | Deep understanding | Good knowledge | Surface level |
| Q&A | 0-2 | Confident, accurate | Adequate | Struggles |

---

## Assessment Policies

### Retake Policy

| Assessment Type | Retakes Allowed | Conditions |
|-----------------|-----------------|------------|
| Quizzes | 1 retake | 24-hour wait |
| Exercises | 1 revision | Within 1 week |
| Milestones | 1 revision | Based on feedback |
| Final Project | 1 revision | Within 2 weeks |

### Late Submission Policy

| Days Late | Penalty |
|-----------|---------|
| 1-2 days | -10% |
| 3-7 days | -25% |
| >7 days | Contact instructor |

### Academic Integrity

**Allowed:**
- AI tool usage (documented)
- Collaboration on concepts
- Using provided resources
- Asking questions

**Not Allowed:**
- Copying others' submissions
- Sharing quiz answers
- Submitting AI output without understanding
- Plagiarism

---

## Quality Checklist Templates

### Code Submission Checklist

```markdown
## Code Quality Review
- [ ] Code runs without errors
- [ ] Tests pass consistently
- [ ] Follows naming conventions
- [ ] No hardcoded values
- [ ] Proper error handling
- [ ] Meaningful comments
- [ ] Clean git history
- [ ] No sensitive data
```

### Documentation Checklist

```markdown
## Documentation Review
- [ ] README present and complete
- [ ] Setup instructions work
- [ ] All features documented
- [ ] Code comments where needed
- [ ] Screenshots/diagrams if helpful
```

---

## Related Documents

- [Grading Guide](./GRADING-GUIDE.md) - How to grade assessments
- [Quick Reference](./QUICK-REFERENCE.md) - Fast lookup tables
- [Assessment Templates](../../templates/assessments/) - Reusable templates
