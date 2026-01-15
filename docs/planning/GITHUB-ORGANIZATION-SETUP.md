# GitHub Organization Setup Plan
## FPUNA Summer 2026 AI-Augmented Development Program

**Created:** January 14, 2026  
**Purpose:** Comprehensive setup guide for GitHub infrastructure

---

## ORGANIZATION OVERVIEW

**Organization Name:** `FPUNA-Summer-2026-AI-Courses`  
**Type:** GitHub Education (Free for educational institutions)  
**Owner:** FPUNA Course Coordinator  
**Visibility:** Private (course materials) + Public (student projects)

---

## REPOSITORY STRUCTURE

### Primary Repositories

```
FPUNA-Summer-2026-AI-Courses/
│
├── course-core/                    # Core Course (Weeks 1-3)
│   ├── module-01-introduction/
│   ├── module-02-context-engineering/
│   ├── module-03-private-repos/
│   ├── module-04-documentation/
│   ├── module-05-validation/
│   └── module-06-agentic-patterns/
│
├── course-qa-automation/           # QA Track (Weeks 4-8)
│   ├── module-01-test-planning/
│   ├── module-02-unit-tests/
│   ├── module-03-integration-tests/
│   ├── module-04-e2e-tests/
│   ├── module-05-validation/
│   ├── module-06-cicd/
│   ├── module-07-docker/
│   ├── module-08-advanced-playwright/
│   └── module-09-capstone/
│
├── course-web-development/         # Web Dev Track (Weeks 4-8)
│   ├── module-01-components/
│   ├── module-02-apis/
│   ├── module-03-database/
│   ├── module-04-authentication/
│   ├── module-05-state-management/
│   ├── module-06-forms/
│   ├── module-07-testing/
│   ├── module-08-deployment/
│   └── module-09-capstone/
│
├── example-projects/               # Reference implementations
│   ├── sample-web-app/            # For Web Dev track
│   ├── sample-api-service/        # For testing in QA track
│   └── sample-e-commerce/         # For capstone projects
│
├── student-templates/              # Starter code for students
│   ├── core-course-exercises/
│   ├── qa-track-exercises/
│   └── webdev-track-exercises/
│
├── instructor-resources/           # Private - Instructors only
│   ├── answer-keys/
│   ├── grading-rubrics/
│   ├── lecture-slides/
│   └── teaching-guides/
│
└── student-submissions/            # Individual student repos
    ├── student-01-username/
    ├── student-02-username/
    └── ...
```

---

## REPOSITORY SETUP DETAILS

### 1. course-core

**Purpose:** Core Course content (all students)  
**Visibility:** Private  
**Branch Protection:** `main` (protected)

**Contents:**
- Module README files (theory)
- Exercise markdown files
- Quiz files with answer keys
- Example code snippets
- CLAUDE.md templates

**Structure:**
```
course-core/
├── README.md                      # Course overview
├── SYLLABUS.md                    # Complete syllabus
├── module-01-introduction/
│   ├── README.md                  # Lesson content
│   ├── EXERCISE.md                # Hands-on exercises
│   ├── QUIZ.md                    # Assessment
│   ├── examples/                  # Code examples
│   └── INSTRUCTOR-GUIDE.md        # Teaching notes
├── module-02-context-engineering/
│   └── ... (same structure)
└── resources/
    ├── cheatsheet.md
    ├── glossary.md
    └── troubleshooting.md
```

**GitHub Actions:**
- Auto-check markdown formatting
- Link validation
- Spell check

---

### 2. course-qa-automation

**Purpose:** QA Automation specialization track  
**Visibility:** Private  
**Branch Protection:** `main` (protected)

**Contents:**
- QA-specific modules
- Playwright examples
- Jest/Pytest templates
- CI/CD configurations

**GitHub Actions:**
- Run example tests on push
- Validate Playwright configs
- Check Docker builds

---

### 3. course-web-development

**Purpose:** Web Development specialization track  
**Visibility:** Private  
**Branch Protection:** `main` (protected)

**Contents:**
- Web dev modules
- React/Express examples
- Database schemas
- Deployment guides

**GitHub Actions:**
- Build example projects
- Run linters (ESLint, Prettier)
- Validate dependencies

---

### 4. example-projects

**Purpose:** Reference implementations for students  
**Visibility:** Public (after course launch)  
**Branch Protection:** `main` (protected)

**Projects:**

#### sample-web-app
- React + Express + PostgreSQL
- Complete authentication
- Deployment ready
- Well-documented

#### sample-api-service
- Express REST API
- OpenAPI documentation
- Test suite included
- Docker ready

#### sample-e-commerce
- Full-stack e-commerce
- Cart + Checkout
- Payment integration (mock)
- Admin dashboard

---

### 5. student-templates

**Purpose:** Starter code for exercises  
**Visibility:** Public  
**Branch Protection:** None (students fork)

**Template Repos:**
- `core-exercise-template`
- `qa-exercise-template`
- `webdev-exercise-template`

Each includes:
- Pre-configured setup (package.json, etc.)
- Folder structure
- Initial files
- README with instructions

---

### 6. instructor-resources

**Purpose:** Private instructor-only materials  
**Visibility:** Private  
**Access:** Instructors + TAs only

**Contents:**
- `answer-keys/` - Solution code for all exercises
- `grading-rubrics/` - Detailed grading criteria
- `lecture-slides/` - PowerPoint/PDF presentations
- `teaching-guides/` - Module-by-module teaching notes
- `assessment-tools/` - Grading scripts

---

### 7. student-submissions

**Purpose:** Individual student work repositories  
**Visibility:** Private per student  
**Access:** Student + Instructors only

**Structure:**
```
student-01-juan-perez/
├── core-course/
│   ├── module-01/
│   ├── module-02/
│   └── ...
├── qa-track/              # OR webdev-track/
│   ├── module-01/
│   └── ...
└── capstone-project/
    ├── README.md
    ├── src/
    └── tests/
```

**GitHub Actions (per student repo):**
- Auto-run tests on push
- Code quality checks
- Submission timestamps

---

## GITHUB CLASSROOM INTEGRATION

### Setup

1. **Create GitHub Classroom**
   - Link to `FPUNA-Summer-2026-AI-Courses` org
   - Configure roster (student list)

2. **Create Assignments**
   - Individual assignments per module
   - Group assignments for capstone
   - Auto-accept invitations

3. **Assignment Types**

#### Individual Exercise Assignment
```yaml
Name: Core-Module-01-Exercise
Description: Introduction to AI-Assisted Development
Template: student-templates/core-exercise-template
Deadline: Week 1, Day 3
Auto-grading: Yes (basic tests)
```

#### Capstone Project Assignment
```yaml
Name: QA-Track-Capstone-Project
Description: Complete test automation suite
Template: student-templates/capstone-qa-template
Deadline: Week 10, Day 5
Auto-grading: No (manual review)
Group: Optional (2-3 students)
```

---

## ACCESS CONTROL

### Team Structure

```
FPUNA-Summer-2026-AI-Courses/
├── @course-directors         # Full admin access
│   └── Members: [Course Director Name]
│
├── @instructors              # Write access to course repos
│   └── Members: [Instructor 1, Instructor 2]
│
├── @teaching-assistants      # Read course repos, write grading
│   └── Members: [TA 1, TA 2, TA 3]
│
├── @students-core            # All students (Weeks 1-3)
│   └── Members: [All enrolled students]
│
├── @students-qa-track        # QA specialization students
│   └── Members: [Students choosing QA]
│
└── @students-webdev-track    # Web Dev specialization students
    └── Members: [Students choosing Web Dev]
```

### Repository Permissions

| Repository | Directors | Instructors | TAs | Students |
|------------|-----------|-------------|-----|----------|
| course-core | Admin | Write | Read | Read |
| course-qa-automation | Admin | Write | Read | Read (QA only) |
| course-web-development | Admin | Write | Read | Read (Web Dev only) |
| example-projects | Admin | Write | Read | Read |
| student-templates | Admin | Write | Read | Write (own forks) |
| instructor-resources | Admin | Read | Read | None |
| student-submissions/* | Admin | Write | Write | Write (own only) |

---

## BRANCH PROTECTION RULES

### Main Course Repositories

Apply to: `course-core`, `course-qa-automation`, `course-web-development`

**Rules:**
- Require pull request reviews (1 approver minimum)
- Require status checks to pass
- Restrict pushes to `main` branch
- Require linear history
- Protect against force pushes

**Workflow:**
```
Content updates:
1. Create feature branch
2. Make changes
3. Open PR
4. Instructor reviews
5. Merge to main
```

---

## CI/CD PIPELINES

### Course Content Validation

**File:** `.github/workflows/validate-content.yml`

```yaml
name: Validate Course Content

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Check Markdown
        uses: DavidAnson/markdownlint-cli2-action@v9
        
      - name: Check Links
        uses: gaurav-nelson/github-action-markdown-link-check@v1
        
      - name: Spell Check
        uses: rojopolis/spellcheck-github-actions@v0
```

### Example Project Tests

**File:** `example-projects/sample-web-app/.github/workflows/test.yml`

```yaml
name: Test Example Project

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Run Tests
        run: npm test
        
      - name: Run E2E Tests
        run: npm run test:e2e
```

### Student Submission Auto-Grading

**File:** `student-submissions/template/.github/workflows/auto-grade.yml`

```yaml
name: Auto-Grade Submission

on:
  push:
    branches: [main]

jobs:
  grade:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Environment
        run: npm ci
        
      - name: Run Tests
        id: tests
        run: npm test -- --json --outputFile=results.json
        
      - name: Calculate Grade
        uses: education/autograding@v1
        
      - name: Comment Results
        uses: actions/github-script@v6
        with:
          script: |
            // Post grade as commit comment
```

---

## SETUP CHECKLIST

### Phase 1: Organization Setup (Day 1)

- [ ] Create GitHub Organization
  - [ ] Name: `FPUNA-Summer-2026-AI-Courses`
  - [ ] Apply for GitHub Education benefits
  - [ ] Set up billing (if needed)

- [ ] Configure Organization Settings
  - [ ] Default repository permissions: None
  - [ ] Member privileges: Limited
  - [ ] Enable Discussions
  - [ ] Enable Projects (for tracking)

- [ ] Create Teams
  - [ ] @course-directors
  - [ ] @instructors
  - [ ] @teaching-assistants
  - [ ] @students-core
  - [ ] @students-qa-track
  - [ ] @students-webdev-track

### Phase 2: Repository Creation (Days 2-3)

- [ ] Create Core Repositories
  - [ ] course-core
  - [ ] course-qa-automation
  - [ ] course-web-development
  - [ ] example-projects
  - [ ] student-templates
  - [ ] instructor-resources

- [ ] Apply Branch Protection
  - [ ] Protect `main` on all course repos
  - [ ] Configure review requirements
  - [ ] Set up status checks

- [ ] Add Repository Descriptions
  - [ ] Add topics/tags
  - [ ] Set up repository README
  - [ ] Configure repository settings

### Phase 3: Content Migration (Days 4-7)

- [ ] Migrate Core Course Content
  - [ ] Copy modules from source
  - [ ] Validate all links
  - [ ] Test all code examples

- [ ] Migrate QA Track Content
  - [ ] Copy existing QA modules
  - [ ] Update references
  - [ ] Validate exercises

- [ ] Migrate Web Dev Track Content
  - [ ] Create new modules
  - [ ] Add examples
  - [ ] Create exercises

- [ ] Set Up Example Projects
  - [ ] Deploy sample-web-app
  - [ ] Deploy sample-api-service
  - [ ] Deploy sample-e-commerce
  - [ ] Test all examples

### Phase 4: GitHub Classroom (Day 8)

- [ ] Create GitHub Classroom
  - [ ] Link to organization
  - [ ] Configure settings
  - [ ] Test assignment creation

- [ ] Create Assignment Templates
  - [ ] Core course exercises
  - [ ] Track exercises
  - [ ] Capstone projects

- [ ] Configure Auto-Grading
  - [ ] Set up test runners
  - [ ] Configure grading scripts
  - [ ] Test auto-grading flow

### Phase 5: CI/CD Setup (Day 9)

- [ ] Configure GitHub Actions
  - [ ] Content validation workflows
  - [ ] Example project tests
  - [ ] Student auto-grading

- [ ] Test All Workflows
  - [ ] Make test commits
  - [ ] Verify actions run
  - [ ] Check notifications

### Phase 6: Access Control (Day 10)

- [ ] Invite Team Members
  - [ ] Course directors
  - [ ] Instructors
  - [ ] Teaching assistants

- [ ] Test Permissions
  - [ ] Verify read/write access
  - [ ] Test student access
  - [ ] Validate restrictions

- [ ] Create Student Accounts
  - [ ] Invite students to org
  - [ ] Assign to teams
  - [ ] Test classroom access

---

## MAINTENANCE PLAN

### Daily During Course

- Monitor student submissions
- Review pull requests
- Check CI/CD status
- Respond to issues

### Weekly

- Update course materials based on feedback
- Review student progress
- Check repository health
- Update documentation

### Post-Course

- Archive student repositories
- Export grades
- Collect feedback
- Plan improvements for next offering

---

## DOCUMENTATION LINKS

### For Students
- [Getting Started with GitHub](./docs/student-github-guide.md)
- [Submitting Exercises](./docs/submission-guide.md)
- [Using GitHub Classroom](./docs/classroom-guide.md)

### For Instructors
- [Grading Workflow](./instructor-resources/grading-workflow.md)
- [Managing Assignments](./instructor-resources/assignment-management.md)
- [Using GitHub Actions](./instructor-resources/github-actions-guide.md)

---

## SUPPORT RESOURCES

### GitHub Education
- **Email:** education@github.com
- **Docs:** https://education.github.com/
- **Community:** https://github.community/

### GitHub Classroom
- **Docs:** https://classroom.github.com/help
- **Video Tutorials:** https://www.youtube.com/githubclassroom

### Technical Support
- **Internal:** [IT Support Email]
- **GitHub Support:** https://support.github.com/

---

**Document Version:** 1.0  
**Last Updated:** January 14, 2026  
**Next Review:** Before course launch

---

*This setup ensures a professional, scalable, and secure GitHub infrastructure for the FPUNA Summer 2026 AI-Augmented Development Program.*
