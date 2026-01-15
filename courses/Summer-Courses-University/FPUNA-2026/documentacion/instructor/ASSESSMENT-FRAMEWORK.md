# FPUNA 2026 - Assessment Framework
## Grading Standards & Best Practices

**Program**: AI-Augmented Development - Summer 2026  
**Purpose**: Standardized assessment across all tracks  
**Audience**: Instructors, TAs, Program Coordinators

---

## Assessment Philosophy

### Core Principles

1. **Assess Understanding, Not Memorization**
   - Can student explain their code?
   - Can they modify it when requirements change?
   - Do they understand trade-offs?

2. **Process Matters as Much as Product**
   - How did they approach the problem?
   - Did they use AI effectively?
   - Can they debug systematically?

3. **Real-World Readiness**
   - Would this work in production?
   - Is it maintainable?
   - Does it follow best practices?

4. **Growth Mindset**
   - Allow revisions (with feedback)
   - Focus on improvement
   - Celebrate progress

---

## Universal Grading Structure

### All Tracks Use Same Weights

| Component | Weight | Description |
|-----------|--------|-------------|
| **Module Exercises** | 25% | 5 exercises (5% each) |
| **Capstone Project** | 50% | Final integrative project |
| **Participation** | 10% | Engagement, peer help |
| **Code Quality/Process** | 15% | Best practices, documentation |

**Total**: 100%

---

## Grading Scale (Universal)

| Score | Grade | Description | Outcome |
|-------|-------|-------------|---------|
| **90-100%** | A | Excelente | Exceeds expectations, portfolio-ready |
| **80-89%** | B | Muy Bueno | Meets all requirements, solid work |
| **70-79%** | C | Bueno | Meets most requirements, some gaps |
| **60-69%** | D | Suficiente | Basic functionality, needs improvement |
| **<60%** | F | Insuficiente | Major gaps, does not pass |

**Minimum to Pass**: 70% (Grade C)

**Certification**: Only grades B (80%+) and A (90%+) receive distinction

---

## Module Exercises (25%)

### Per-Exercise Rubric (20 points each)

| Criteria | Points | Excellent (18-20) | Good (14-17) | Needs Work (10-13) | Insufficient (<10) |
|----------|--------|-------------------|--------------|---------------------|---------------------|
| **Functionality** | 8 | All features work perfectly | Most features work | Some features work | Doesn't run |
| **Code Quality** | 5 | Clean, organized, typed | Readable, some types | Messy but works | Hard to read |
| **Best Practices** | 4 | Follows all conventions | Follows most | Some conventions | No conventions |
| **Documentation** | 3 | Excellent comments/README | Good comments | Minimal comments | No comments |

**Convert to Percentage**: (Points / 20) × 100 = Grade

---

### Example: Grading a Module Exercise

**Exercise**: Build a blog listing page with Next.js

**Student Submission**:
- ✅ Displays posts correctly (8/8 Functionality)
- ⚠️ Missing TypeScript types (3/5 Code Quality)
- ✅ Uses proper components (4/4 Best Practices)
- ⚠️ No README (1/3 Documentation)

**Total**: 16/20 = 80% (B - Muy Bueno)

**Feedback**:
```
Great work! Your page works perfectly and follows Next.js conventions.

To improve:
- Add TypeScript interfaces for Post type
- Include a README with setup instructions

Keep up the good work!
```

---

### Exercise Submission Requirements

**All exercises must include**:
1. **Source code** (GitHub repository or zip)
2. **README.md** (setup instructions)
3. **Screenshots** (if UI)
4. **Live URL** (if deployed)

**Late Policy**:
- 1 day late: -10%
- 2 days late: -20%
- 3+ days late: -50%
- After deadline + 1 week: 0%

**Extensions**: Granted for medical/family emergencies (require documentation)

---

## Capstone Project (50%)

### Comprehensive Rubric (100 points)

#### 1. Functionality (50 points)

| Aspect | Points | Criteria |
|--------|--------|----------|
| **Core Features** | 30 | All required features implemented and working |
| **Edge Cases** | 10 | Handles errors, empty states, loading states |
| **User Experience** | 10 | Intuitive, smooth, no major bugs |

**Evaluation**:
- Test all features systematically
- Try to break it (edge cases)
- Use as if you're a real user

---

#### 2. Code Quality (15 points)

| Aspect | Points | Criteria |
|--------|--------|----------|
| **Readability** | 5 | Clean, organized, consistent naming |
| **Type Safety** | 5 | TypeScript used properly (no `any`) |
| **Organization** | 5 | Logical file structure, separation of concerns |

**Evaluation**:
- Can you understand the code?
- Are there proper types?
- Is it organized well?

---

#### 3. Testing (10 points) *If Applicable*

| Aspect | Points | Criteria |
|--------|--------|----------|
| **Test Coverage** | 5 | Tests for critical functionality |
| **Test Quality** | 5 | Tests are meaningful, not just for coverage |

**Note**: Testing requirements vary by track
- Track 07 (QA): Testing required (60+ tests)
- Track 08 (Web): Optional but encouraged
- Other tracks: Per track requirements

---

#### 4. Documentation (10 points)

| Aspect | Points | Criteria |
|--------|--------|----------|
| **README** | 5 | Clear setup, features, screenshots |
| **Code Comments** | 3 | Complex logic explained |
| **API Docs** | 2 | If APIs exist, documented |

**README Must Include**:
```markdown
# Project Title

## Description
[What it does]

## Tech Stack
[Technologies used]

## Setup
[Step-by-step instructions]

## Features
[List of features]

## Screenshots
[Visual preview]

## Deployed URL
[Live link if deployed]

## Known Issues
[Any bugs or limitations]
```

---

#### 5. Deployment (10 points)

| Aspect | Points | Criteria |
|--------|--------|----------|
| **Successfully Deployed** | 7 | App is live and accessible |
| **Configuration** | 3 | Environment variables, production-ready |

**Evaluation**:
- Does the live URL work?
- Are secrets properly secured?
- Is it production-ready?

---

#### 6. Presentation (5 points)

| Aspect | Points | Criteria |
|--------|--------|----------|
| **Demo** | 3 | Clear demonstration of features |
| **Explanation** | 2 | Can explain technical decisions |

**Format**: 5-10 minute presentation
- Show the app working
- Explain architecture
- Discuss challenges
- Q&A

---

### Capstone Example Grading

**Track 08 - Web Development Capstone**: "Mercado FPUNA" E-commerce Platform

**Student**: Ana Silva

**Functionality** (50 points):
- Core Features (30): Product catalog (10/10), Cart (8/10 - minor bug), Checkout (9/10), Auth (3/5 - no roles)
- Edge Cases (10): Good error handling (7/10)
- UX (10): Professional UI (9/10)
- **Total**: 46/50

**Code Quality** (15 points):
- Readability (5): Very clean code (5/5)
- Type Safety (5): Proper TypeScript (4/5 - one `any`)
- Organization (5): Well structured (5/5)
- **Total**: 14/15

**Testing** (10 points):
- Optional for Track 08, but student included basic tests
- Coverage (5): Critical paths tested (3/5)
- Quality (5): Meaningful tests (4/5)
- **Total**: 7/10

**Documentation** (10 points):
- README (5): Excellent (5/5)
- Comments (3): Good (3/3)
- API Docs (2): Swagger included (2/2)
- **Total**: 10/10

**Deployment** (10 points):
- Deployed (7): Live on Vercel (7/7)
- Configuration (3): Proper env vars (3/3)
- **Total**: 10/10

**Presentation** (5 points):
- Demo (3): Great walkthrough (3/3)
- Explanation (2): Clear technical discussion (2/2)
- **Total**: 5/5

**Grand Total**: 92/100 = **92% (A - Excelente)**

**Feedback**:
```
Outstanding work, Ana! Your e-commerce platform is professional and well-executed.

Strengths:
✅ Clean, readable code with proper TypeScript
✅ Excellent documentation (README + Swagger)
✅ Successfully deployed to production
✅ Bonus: Added tests (not required but impressive)

Areas for improvement:
⚠️ Cart has a bug when quantity = 0 (should remove item)
⚠️ Role-based access not fully implemented (only user role works)
⚠️ One usage of `any` type in checkout (line 47)

This is portfolio-ready work. Great job!
```

---

## Participation (10%)

### What Counts as Participation?

**Positive**:
- ✅ Attending class (deduct if absent)
- ✅ Asking thoughtful questions
- ✅ Helping peers (Slack, in person)
- ✅ Sharing resources
- ✅ Contributing to discussions
- ✅ Office hours attendance

**Negative**:
- ❌ Disruptive behavior
- ❌ Not engaged (on phone, sleeping)
- ❌ Copying without attribution

### Participation Rubric (10 points)

| Score | Description |
|-------|-------------|
| **9-10** | Exceptional: Helps others, asks great questions, always engaged |
| **7-8** | Good: Attends regularly, participates when asked |
| **5-6** | Adequate: Attends, minimal participation |
| **3-4** | Poor: Missed classes or disengaged |
| **0-2** | Very Poor: Rarely attends or disruptive |

**Tracking**: Instructors note participation weekly

---

## Code Quality/Process (15%)

### What to Assess

#### 1. Best Practices (5 points)

**Check**:
- Follows language conventions (naming, structure)
- Uses appropriate design patterns
- No obvious code smells
- Error handling present

**Grading**:
- 5: Excellent practices throughout
- 4: Good practices, minor issues
- 3: Some practices, some issues
- 2: Few practices followed
- 0-1: Poor practices

---

#### 2. Git Usage (5 points)

**Check**:
- Meaningful commit messages
- Logical commits (not one giant commit)
- Branches used appropriately (if multi-week)
- Clean repository (no secrets, no node_modules)

**Grading**:
- 5: Professional Git usage
- 4: Good commits, clean repo
- 3: Basic commits, mostly clean
- 2: Poor commits or messy repo
- 0-1: No version control or very poor

---

#### 3. Documentation (5 points)

**Check**:
- Code comments where needed
- README present and useful
- Setup instructions work
- API/function documentation (if applicable)

**Grading**:
- 5: Excellent documentation
- 4: Good documentation
- 3: Basic documentation
- 2: Minimal documentation
- 0-1: No documentation

---

## Academic Integrity

### AI Usage Policy

**Allowed** ✅:
- Using AI to generate starter code
- Using AI for debugging assistance
- Using AI to explain concepts
- Using AI for code suggestions
- Iterating on AI-generated code

**Not Allowed** ❌:
- Submitting AI code you don't understand
- Copying another student's code
- Using AI during no-AI assessments
- Sharing solutions before deadline
- Plagiarizing tutorials/Stack Overflow

### Detection Methods

1. **Code Explanation**: Ask student to explain their code
2. **Live Coding**: Watch student modify code live
3. **Similarity Check**: Compare submissions
4. **Interview**: Discuss technical decisions

### Penalties

| Offense | Penalty |
|---------|---------|
| **1st Violation** | Warning + redo assignment (50% max grade) |
| **2nd Violation** | Zero on assignment + academic integrity meeting |
| **3rd Violation** | Course failure + dean notification |

**Serious Violations** (immediate course failure):
- Paying someone to do work
- Impersonating another student
- Falsifying results

---

## Grading Consistency

### Calibration Process

**Before grading capstones**:
1. All instructors grade same sample project
2. Discuss score differences
3. Align on standards
4. Document edge cases

### Blind Grading (Optional)

- Remove student names
- Grade based on code quality alone
- Reduces bias

### Second Review

- For failing grades (< 70%)
- For disputes
- Second instructor reviews
- Final decision by program coordinator

---

## Feedback Best Practices

### Effective Feedback Structure

```markdown
## Summary
[1-2 sentences overall assessment]

## Strengths
✅ [What they did well - be specific]
✅ [Another strength]
✅ [Another strength]

## Areas for Improvement
⚠️ [What to improve - be specific and actionable]
⚠️ [Another improvement]

## Grade Breakdown
- Functionality: X/Y
- Code Quality: X/Y
- Documentation: X/Y
- Total: X/100 (Grade: A/B/C/D/F)

## Next Steps
[What to focus on for next assignment]
```

### Feedback Timing

- **Exercises**: Within 3 days
- **Capstone**: Within 1 week
- **Revisions**: Within 2 days

**Faster feedback = better learning**

---

## Special Circumstances

### Extensions

**Granted for**:
- Medical emergencies (documentation required)
- Family emergencies (coordinator approval)
- Technical issues (case-by-case)

**Not Granted for**:
- Poor time management
- Other coursework
- "Didn't know deadline"

**Process**:
1. Student emails instructor + coordinator
2. Provide documentation
3. Decision within 24h
4. New deadline specified

---

### Incomplete Grades

**Criteria**:
- Student has completed 60%+ of work
- Valid reason for not finishing
- Plan to complete within 4 weeks

**Process**:
1. Student requests incomplete
2. Instructor approves with completion plan
3. Student completes work
4. Incomplete → Final grade

---

### Grade Disputes

**Student believes grade is incorrect**

**Process**:
1. Student reviews rubric
2. Email instructor with specific concerns
3. Instructor reviews and responds
4. If unresolved, coordinator reviews
5. Coordinator decision is final

**Timeline**: Disputes must be within 1 week of grade

---

## Track-Specific Variations

### Track 07: QA Automation

**Additional Requirements**:
- **Test Count**: Minimum 60 UI + 40 API tests for capstone
- **CI/CD**: GitHub Actions must be working
- **Reports**: Allure or HTML report required

**Capstone Weighting Adjustment**:
- Functionality: 40% (instead of 50%)
- Testing: 20% (instead of 10%)
- Rest: Same

---

### Track 08: Web Development

**Additional Requirements**:
- **Deployment**: Must be live on Vercel
- **Database**: Must use PostgreSQL (Prisma)
- **Auth**: Must have working authentication

**Capstone Weighting**: Standard (50% functionality)

---

### Other Tracks

**Adjustments per track** (when created):
- Testing weight varies
- Deployment requirements vary
- Tool-specific criteria added

**Core structure remains same**

---

## Grade Distribution Guidelines

### Expected Distribution (Healthy Class)

```
A (90-100%):  20-30% of students
B (80-89%):   40-50% of students
C (70-79%):   20-30% of students
D (60-69%):   0-10% of students
F (<60%):     0-5% of students
```

**If distribution is very different**:
- Too many A's: Standards too low?
- Too many F's: Material too hard? Adjust.

---

## Continuous Improvement

### After Each Cohort

1. **Analyze grade distribution**
2. **Review common mistakes**
3. **Update rubrics** if needed
4. **Clarify confusing criteria**
5. **Share with next instructors**

### Rubric Refinement

**If many students lose points on same criteria**:
- Was it taught clearly?
- Was rubric clear?
- Should we adjust?

**Document changes**:
- What changed
- Why
- When (cohort number)

---

## Appendix: Sample Rubrics

### Sample: Module Exercise Rubric (Track 08 - Module 01)

**Exercise**: Build a blog platform with Next.js

| Criteria | Excellent (18-20) | Good (14-17) | Needs Work (10-13) |
|----------|-------------------|--------------|---------------------|
| **Features** (8pts) | All pages work, dynamic routes, layouts | Most pages work, minor issues | Some pages missing or broken |
| **Code** (5pts) | TypeScript, clean components, organized | Some types, readable | No types or messy |
| **Conventions** (4pts) | Follows Next.js App Router patterns | Follows most conventions | Doesn't follow conventions |
| **Docs** (3pts) | README with screenshots, setup works | README present, basic info | No README |

---

### Sample: Capstone Rubric (Track 07 - QA)

**Project**: E-commerce Test Automation Framework

| Category | Points | Criteria |
|----------|--------|----------|
| **UI Tests** | 15 | 60+ tests covering all pages |
| **API Tests** | 15 | 40+ tests covering all endpoints |
| **Architecture** | 10 | POM implemented, fixtures used |
| **CI/CD** | 10 | GitHub Actions working, reports generated |
| **Code Quality** | 15 | TypeScript, clean, organized |
| **Documentation** | 10 | README, setup guide, report |
| **Deployment** | 10 | CI/CD deployed, accessible |
| **Presentation** | 5 | Clear demo, explains decisions |
| **Testing Coverage** | 10 | Edge cases, error scenarios |

**Total**: 100 points

---

**Last Updated**: January 15, 2026  
**Version**: 1.0  
**Next Review**: After Summer 2026 Cohort 1

---

*FPUNA Summer 2026 - Assessment Framework*  
*Fair, consistent, growth-oriented evaluation*
