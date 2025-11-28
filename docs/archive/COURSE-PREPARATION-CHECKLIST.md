# Course Preparation Checklist

> **Purpose**: A comprehensive step-by-step guide to create a new course from concept to completion. Use this checklist for every new course.

---

## Phase 1: Discovery & Planning (1-2 weeks)

### 1.1 Client Analysis
- [ ] Identify target client segment using [TARGET-CLIENT-ANALYSIS-FRAMEWORK.md](./TARGET-CLIENT-ANALYSIS-FRAMEWORK.md)
- [ ] Complete pain points analysis
- [ ] Define client archetype with demographics and psychographics
- [ ] Create value proposition canvas
- [ ] Calculate ROI model for target buyer
- [ ] Document client journey map

### 1.2 Market Research
- [ ] Analyze competitive courses (3-5 competitors minimum)
- [ ] Identify market gaps and differentiation opportunities
- [ ] Review industry trends and tool updates
- [ ] Gather testimonials/feedback from similar courses (if available)
- [ ] Validate demand through surveys, interviews, or search volume

### 1.3 Course Scoping
- [ ] Define transformation promise: "From [current state] to [desired state]"
- [ ] Set course duration (hours and weeks)
- [ ] Determine format (self-paced/instructor-led/hybrid)
- [ ] Set difficulty level (beginner/intermediate/advanced)
- [ ] List prerequisites
- [ ] Decide on certification offering

### 1.4 Business Case
- [ ] Define pricing strategy
- [ ] Estimate development effort
- [ ] Calculate break-even point
- [ ] Set launch timeline
- [ ] Identify required resources

**Phase 1 Deliverables:**
- [ ] Completed Client Analysis Document
- [ ] Course Scope Document
- [ ] Business Case Summary

---

## Phase 2: Curriculum Design (1-2 weeks)

### 2.1 Learning Outcomes
- [ ] Write 6-10 measurable learning outcomes using Bloom's taxonomy verbs
  - Remember: define, list, identify
  - Understand: explain, describe, summarize
  - Apply: implement, execute, use
  - Analyze: compare, examine, differentiate
  - Evaluate: assess, critique, justify
  - Create: design, develop, construct

### 2.2 Module Structure
- [ ] Break content into logical modules (8-12 modules typical)
- [ ] Sequence modules from foundational to advanced
- [ ] Balance theory and hands-on practice (aim for 40% theory, 60% hands-on)
- [ ] Estimate hours per module
- [ ] Map learning outcomes to modules

### 2.3 Assessment Strategy
- [ ] Define assessment components and weights
  - Module Exercises: XX%
  - Module Quizzes: XX%
  - Milestone Projects: XX%
  - Final Capstone: XX%
- [ ] Design grading rubrics
- [ ] Plan knowledge checks per module
- [ ] Design final project requirements

### 2.4 Resource Planning
- [ ] List required tools and software
- [ ] Identify example projects/repositories needed
- [ ] Plan prompt library contents
- [ ] Outline templates to provide
- [ ] Determine supplementary resources

**Phase 2 Deliverables:**
- [ ] Complete SYLLABUS.md
- [ ] Module outline with topics per module
- [ ] Assessment plan document

---

## Phase 3: Directory Setup (1 day)

### 3.1 Create Course Structure
Use [COURSE-TEMPLATE-MASTER.md](./COURSE-TEMPLATE-MASTER.md) as reference

```bash
# Create directory structure
mkdir courses/[course-name]
cd courses/[course-name]

# Create root files
touch README.md
touch SYLLABUS.md

# Create module directories
for i in {01..12}; do
  mkdir -p modules/$i-module-name
  touch modules/$i-module-name/README.md
  touch modules/$i-module-name/EXERCISE.md
  touch modules/$i-module-name/QUIZ.md
done

# Create support directories
mkdir -p assessments
mkdir -p templates/project-setup
mkdir -p examples
mkdir -p prompts
mkdir -p resources
mkdir -p presentation-templates
```

### 3.2 Copy Templates
- [ ] Copy README.md template and customize
- [ ] Copy SYLLABUS.md template and customize
- [ ] Copy module README.md template to all modules
- [ ] Copy EXERCISE.md template to all modules
- [ ] Copy QUIZ.md template to all modules
- [ ] Copy assessments/README.md template
- [ ] Copy prompts/README.md template
- [ ] Set up AI tool configuration templates

**Phase 3 Deliverables:**
- [ ] Complete directory structure
- [ ] All template files in place

---

## Phase 4: Content Development (4-8 weeks)

### 4.1 Per-Module Development

For each module, complete these tasks:

#### 4.1.1 README.md (Lesson Content)
- [ ] Write module duration
- [ ] Write 3-5 learning objectives
- [ ] Write section content with clear headers
- [ ] Include code examples (tested and working)
- [ ] Add diagrams/visuals where helpful
- [ ] Include knowledge check questions
- [ ] Write summary section
- [ ] Add resource links
- [ ] Cross-reference to Exercise and Quiz

#### 4.1.2 EXERCISE.md (Hands-on Lab)
- [ ] Write clear objective
- [ ] Provide detailed setup instructions
- [ ] Break into 3-5 parts with time estimates
- [ ] Write step-by-step instructions for each part
- [ ] Define expected outcomes
- [ ] Add hints for common struggles
- [ ] List specific deliverables
- [ ] Include reflection questions (4-5)
- [ ] Create detailed grading rubric
- [ ] Write example solution (hidden)

#### 4.1.3 QUIZ.md (Knowledge Check)
- [ ] Write 5-8 multiple choice questions
- [ ] Write 3-5 true/false questions
- [ ] Write 2-3 scenario-based questions
- [ ] Ensure questions cover learning objectives
- [ ] Include mix of difficulty levels
- [ ] Write answer key with explanations
- [ ] Set time limit and passing score

### 4.2 Support Materials Development

#### 4.2.1 Assessments Folder
- [ ] Write assessments/README.md (master guide)
- [ ] Create quiz question bank per module
- [ ] Develop milestone project briefs
- [ ] Write final capstone requirements
- [ ] Create grading rubrics for all assessments

#### 4.2.2 Templates Folder
- [ ] Create CLAUDE.md template for course domain
- [ ] Create .claude/settings.json
- [ ] Create .cursor/rules/[domain].mdc
- [ ] Create .github/copilot-instructions.md
- [ ] Create .gemini/settings.json
- [ ] Write templates/README.md usage guide

#### 4.2.3 Examples Folder
- [ ] Create technology-specific code examples
- [ ] Test all examples work correctly
- [ ] Add comments explaining key concepts
- [ ] Organize by technology/framework
- [ ] Write examples/README.md index

#### 4.2.4 Prompts Library
- [ ] Organize prompts by category
- [ ] Write 3-5 prompts per category
- [ ] Include use cases for each prompt
- [ ] Add example usage
- [ ] Create quick reference patterns
- [ ] Document prompt chaining workflows

#### 4.2.5 Resources Folder
- [ ] Create cheatsheet.md (quick reference)
- [ ] Create glossary.md (domain terminology)
- [ ] Create troubleshooting-guide.md (common issues)
- [ ] Create ai-tools-configuration-guide.md
- [ ] Add any additional domain guides

#### 4.2.6 Presentation Templates (Optional)
- [ ] Create master slide deck template
- [ ] Create module slide template
- [ ] Create speaker notes template
- [ ] Create visual diagrams library
- [ ] Create workshop activity templates

**Phase 4 Deliverables:**
- [ ] All module content complete
- [ ] All assessments complete
- [ ] All support materials complete

---

## Phase 5: Quality Assurance (1-2 weeks)

### 5.1 Content Review

#### Technical Accuracy
- [ ] Verify all commands work on target platforms
- [ ] Test all code examples
- [ ] Verify tool versions are current
- [ ] Check all links are valid
- [ ] Confirm setup instructions work

#### Content Quality
- [ ] Ensure consistent formatting
- [ ] Check for placeholder text (none remaining)
- [ ] Verify learning objectives are measurable
- [ ] Confirm progression from simple to complex
- [ ] Review for clarity and readability

#### Assessment Alignment
- [ ] Map quiz questions to learning objectives
- [ ] Verify exercises reinforce lesson content
- [ ] Check rubrics are clear and fair
- [ ] Confirm final project integrates all skills

### 5.2 Peer Review
- [ ] Have subject matter expert review content
- [ ] Get feedback on difficulty level
- [ ] Review for completeness
- [ ] Check for bias or accessibility issues

### 5.3 Pilot Testing (Recommended)
- [ ] Recruit 3-5 beta testers from target audience
- [ ] Gather feedback on:
  - Content clarity
  - Exercise difficulty
  - Time estimates accuracy
  - Technical issues
- [ ] Document all feedback
- [ ] Implement critical fixes

**Phase 5 Deliverables:**
- [ ] Quality review checklist completed
- [ ] All critical issues resolved
- [ ] Pilot feedback incorporated (if applicable)

---

## Phase 6: Final Polish (3-5 days)

### 6.1 Documentation Finalization
- [ ] Update all version numbers
- [ ] Add "Last Updated" dates
- [ ] Complete all cross-references
- [ ] Finalize README.md with full information
- [ ] Verify SYLLABUS.md is complete

### 6.2 Navigation & Organization
- [ ] Verify folder structure matches template
- [ ] Check all internal links work
- [ ] Ensure consistent naming conventions
- [ ] Create index/navigation files if needed

### 6.3 Certification Setup
- [ ] Create course certification template
- [ ] Define certification requirements
- [ ] Set up verification process (if applicable)

### 6.4 Marketing Materials
- [ ] Write course description (client-facing)
- [ ] Create learning outcomes list
- [ ] Document prerequisites
- [ ] Prepare FAQ

**Phase 6 Deliverables:**
- [ ] Course ready for launch
- [ ] All documentation finalized

---

## Phase 7: Launch & Maintenance

### 7.1 Launch Checklist
- [ ] Add course to inventory
- [ ] Update main course catalog
- [ ] Announce course availability
- [ ] Set up feedback collection
- [ ] Monitor initial enrollments

### 7.2 Ongoing Maintenance
- [ ] Schedule quarterly content review
- [ ] Update for tool version changes
- [ ] Incorporate student feedback
- [ ] Track completion rates
- [ ] Update examples as needed

---

## Module Development Time Estimates

| Component | Time per Module | Notes |
|-----------|-----------------|-------|
| README.md (Lesson) | 4-8 hours | Depends on complexity |
| EXERCISE.md | 2-4 hours | Including solution |
| QUIZ.md | 1-2 hours | 10-15 questions |
| Code Examples | 1-3 hours | Testing included |
| **Total per Module** | **8-17 hours** | |

### Full Course Estimates

| Course Size | Modules | Module Content | Support Materials | QA & Polish | Total |
|-------------|---------|----------------|-------------------|-------------|-------|
| Small (4-6 modules) | 4-6 | 32-100 hrs | 20-30 hrs | 16-24 hrs | 68-154 hrs |
| Medium (8-10 modules) | 8-10 | 64-170 hrs | 30-50 hrs | 24-40 hrs | 118-260 hrs |
| Large (12+ modules) | 12+ | 96-200 hrs | 40-60 hrs | 32-48 hrs | 168-308 hrs |

---

## Quick Reference: File Naming Conventions

| File Type | Naming Pattern | Example |
|-----------|----------------|---------|
| Course folder | kebab-case | `qa-automation-with-ai` |
| Module folder | `NN-topic-name` | `01-introduction` |
| Main docs | UPPER-CASE.md | `README.md`, `SYLLABUS.md` |
| Module files | UPPER-CASE.md | `EXERCISE.md`, `QUIZ.md` |
| Templates | kebab-case.md | `project-setup.md` |
| Code examples | kebab-case.ext | `jest-unit-test.js` |
| AI configs | .tool/file | `.claude/settings.json` |

---

## Quality Standards Checklist

### Content Standards
- [ ] No grammatical errors
- [ ] Consistent terminology
- [ ] Appropriate reading level
- [ ] Accessible language
- [ ] Inclusive examples

### Technical Standards
- [ ] Code follows best practices
- [ ] Security considerations addressed
- [ ] Error handling demonstrated
- [ ] Performance considerations noted
- [ ] Cross-platform compatibility

### Pedagogical Standards
- [ ] Clear learning progression
- [ ] Scaffolded complexity
- [ ] Multiple learning modalities
- [ ] Regular knowledge checks
- [ ] Practical application focus

---

## Template Files Reference

| Template | Location | Purpose |
|----------|----------|---------|
| Course Template Master | [COURSE-TEMPLATE-MASTER.md](./COURSE-TEMPLATE-MASTER.md) | Complete course structure |
| Client Analysis | [TARGET-CLIENT-ANALYSIS-FRAMEWORK.md](./TARGET-CLIENT-ANALYSIS-FRAMEWORK.md) | Client research |
| Client Profiles | [POTENTIAL-CLIENTS-CATALOG.md](./POTENTIAL-CLIENTS-CATALOG.md) | Example profiles |
| Certification | [CERTIFICATION-TEMPLATE.md](../../certification/CERTIFICATION-TEMPLATE.md) | Certificate format |

---

*Checklist Version: 1.0*
*Last Updated: November 2025*
