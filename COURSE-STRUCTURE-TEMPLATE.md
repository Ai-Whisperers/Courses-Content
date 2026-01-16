# Course Structure Template
## Standard Directory and File Structure for All Courses

**Version**: 1.0  
**Date**: January 16, 2026  
**Purpose**: Establish consistent structure across all courses in repository

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Required Files](#required-files)
4. [Optional Files](#optional-files)
5. [Module Structure](#module-structure)
6. [Naming Conventions](#naming-conventions)
7. [Templates](#templates)

---

## Overview

All courses in this repository should follow this standardized structure to ensure:
- ✅ Easy navigation for students and instructors
- ✅ Consistent quality and completeness
- ✅ Simple maintenance and updates
- ✅ Clear status indication

---

## Directory Structure

```
[Course-Name]/
├── README.md                           # Course overview (REQUIRED)
├── SYLLABUS.md                         # Complete curriculum (REQUIRED)
├── STATUS.md                           # Honest completion status (REQUIRED)
│
├── modules/                            # Course modules (REQUIRED)
│   ├── 01-module-name/
│   │   ├── README.md                   # Module overview
│   │   ├── content.md                  # Main content
│   │   ├── exercises.md                # Hands-on exercises
│   │   ├── quiz.md                     # Assessment questions
│   │   ├── resources.md                # Additional resources
│   │   └── solutions/                  # Exercise solutions (optional)
│   │       ├── exercise-01-solution.md
│   │       └── exercise-02-solution.md
│   ├── 02-module-name/
│   └── ...
│
├── resources/                          # Shared course resources (OPTIONAL)
│   ├── cheat-sheets/
│   ├── code-examples/
│   ├── datasets/
│   └── references/
│
├── templates/                          # Reusable templates (OPTIONAL)
│   ├── project-scaffolds/
│   └── configuration-files/
│
├── prompts/                            # AI prompts library (OPTIONAL)
│   ├── coding-prompts.md
│   ├── debugging-prompts.md
│   └── review-prompts.md
│
├── presentation-templates/            # Slide decks (OPTIONAL)
│   ├── module-01-slides.pptx
│   └── ...
│
├── assessments/                        # Graded assessments (OPTIONAL)
│   ├── midterm/
│   ├── final-project/
│   └── rubrics/
│
├── instructor-guide/                   # For instructors (RECOMMENDED)
│   ├── README.md                       # Teaching guidelines
│   ├── lesson-plans/
│   ├── answer-keys/
│   └── troubleshooting.md
│
└── CHANGELOG.md                        # Version history (RECOMMENDED)
```

---

## Required Files

### 1. README.md (Course Root)

**Purpose**: Course overview and quick start guide

**Required Sections**:
```markdown
# [Course Name]

## Overview
Brief description (2-3 sentences)

## Learning Objectives
- Objective 1
- Objective 2
- Objective 3

## Target Audience
Who this course is for

## Prerequisites
Required knowledge/skills

## Course Structure
How the course is organized

## Duration
Expected time commitment

## Getting Started
Steps to begin the course

## Status
Link to STATUS.md for current completion level

## Contact
Where to get help
```

---

### 2. SYLLABUS.md

**Purpose**: Complete curriculum breakdown

**Required Sections**:
```markdown
# [Course Name] - Syllabus

## Course Information
- **Course Code**: [if applicable]
- **Duration**: X hours/weeks
- **Format**: Self-paced / Instructor-led
- **Level**: Beginner / Intermediate / Advanced

## Learning Objectives
Detailed list of what students will learn

## Module Breakdown

### Module 1: [Name]
**Duration**: X hours
**Topics**:
- Topic 1
- Topic 2
**Learning Outcomes**:
- Outcome 1
- Outcome 2
**Assessments**:
- Exercise 1
- Quiz 1

[Repeat for each module]

## Grading (if applicable)
How students are assessed

## Resources
Required and recommended materials

## Calendar
Suggested schedule
```

---

### 3. STATUS.md

**Purpose**: Honest completion reporting

**Required Content**:
```markdown
# [Course Name] - Status Report

**Last Updated**: [Date]
**Overall Completion**: X%

## Module Status

| Module | Status | Completion | Notes |
|--------|--------|------------|-------|
| 01 | ✅ Complete | 100% | Tested with students |
| 02 | 🟡 In Progress | 60% | Content drafted, needs exercises |
| 03 | ⏳ Planned | 10% | Outline only |

## Quality Checklist

- [ ] All modules have learning objectives
- [ ] All code examples tested
- [ ] All links verified
- [ ] Exercises have solutions
- [ ] Quizzes have answer keys
- [ ] Tested with at least 3 students
- [ ] Instructor feedback incorporated
- [ ] Professional formatting

## Known Issues
List any outstanding problems

## Roadmap
What's coming next

## Production Readiness
Is this course ready for students? Yes/No and why.
```

---

## Optional Files

### 4. CHANGELOG.md

**Purpose**: Track course evolution

**Format**:
```markdown
# Changelog

## [Version 2.0] - 2026-01-16
### Added
- Module 5: Advanced Topics
- Interactive exercises

### Changed
- Updated Module 2 examples
- Improved quiz questions

### Fixed
- Broken links in Module 3
- Typos in Module 1

## [Version 1.0] - 2025-11-01
### Added
- Initial release
- Modules 1-4
```

---

## Module Structure

Each module should have:

### module-name/README.md

```markdown
# Module [Number]: [Name]

## Overview
What this module covers (2-3 sentences)

## Learning Objectives
By the end of this module, you will:
- [ ] Objective 1
- [ ] Objective 2
- [ ] Objective 3

## Prerequisites
What you need to know before starting

## Duration
Expected time: X hours

## Content Structure
1. [Main Concept 1](#concept-1)
2. [Main Concept 2](#concept-2)
3. [Practice Exercise](#exercise)
4. [Quiz](#quiz)

## Getting Started
How to begin this module

## Resources
- [Content](./content.md)
- [Exercises](./exercises.md)
- [Quiz](./quiz.md)
- [Solutions](./solutions/)
```

### module-name/content.md

```markdown
# Module [Number]: [Name] - Content

## Introduction
Why this matters

## Concept 1
### Theory
Explanation with examples

### Code Example
\`\`\`language
// Working code example
\`\`\`

### Key Takeaways
- Point 1
- Point 2

[Repeat for each concept]

## Summary
Recap of what was covered

## Next Steps
What comes next
```

### module-name/exercises.md

```markdown
# Module [Number] - Exercises

## Exercise 1: [Name]

**Difficulty**: Easy / Medium / Hard
**Duration**: X minutes

### Objective
What you'll practice

### Instructions
1. Step 1
2. Step 2
3. Step 3

### Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2

### Hints (optional)
- Hint 1
- Hint 2

### Solution
See [solutions/exercise-01-solution.md](./solutions/exercise-01-solution.md)

[Repeat for each exercise]
```

### module-name/quiz.md

```markdown
# Module [Number] - Quiz

**Total Questions**: X
**Passing Score**: Y%
**Duration**: Z minutes

## Question 1

[Question text]

A) Option A
B) Option B
C) Option C
D) Option D

**Correct Answer**: [At bottom of file or separate answer key]

[Repeat for each question]

---

## Answer Key

1. B - Explanation
2. A - Explanation
3. C - Explanation

## Scoring
- 90-100%: Excellent
- 80-89%: Good
- 70-79%: Pass
- <70%: Review module
```

---

## Naming Conventions

### Files

- **Use lowercase with hyphens**: `module-name.md` not `Module_Name.md`
- **Be descriptive**: `authentication-basics.md` not `auth.md`
- **Use consistent prefixes**: `01-intro.md`, `02-basics.md`, `03-advanced.md`

### Directories

- **Use lowercase with hyphens**: `presentation-templates/` not `Presentation_Templates/`
- **Plural for collections**: `modules/`, `exercises/`, `prompts/`
- **Singular for singletons**: `instructor-guide/`, `assessment/`

### Modules

**Format**: `[number]-[descriptive-name]`

**Examples**:
- ✅ `01-introduction-to-apis`
- ✅ `02-rest-fundamentals`
- ✅ `03-authentication-security`
- ❌ `module1`
- ❌ `APIs_Intro`

### Language Consistency

**Choose ONE language and stick with it**:

**Spanish Course**:
- ✅ `01-introduccion-apis/`
- ✅ `02-fundamentos-rest/`
- ❌ `01-introduction-apis/` (mixed)

**English Course**:
- ✅ `01-introduction-apis/`
- ✅ `02-rest-fundamentals/`
- ❌ `01-introduccion-apis/` (mixed)

---

## Templates

### Minimal Course Template (Planning Stage)

Use this when starting a new course:

```
[Course-Name]/
├── README.md              # Basic overview
├── STATUS.md              # Mark as "Planning - 5% complete"
└── SYLLABUS.md            # Outline only
```

### Standard Course Template (In Development)

```
[Course-Name]/
├── README.md
├── SYLLABUS.md
├── STATUS.md
├── modules/
│   ├── 01-module-name/
│   │   ├── README.md
│   │   ├── content.md
│   │   ├── exercises.md
│   │   └── quiz.md
│   └── 02-module-name/
│       └── ...
└── resources/
    └── cheat-sheets/
```

### Complete Course Template (Production Ready)

```
[Course-Name]/
├── README.md
├── SYLLABUS.md
├── STATUS.md
├── CHANGELOG.md
├── modules/ (all complete with exercises, quizzes, solutions)
├── resources/
│   ├── cheat-sheets/
│   ├── code-examples/
│   └── references/
├── templates/
├── prompts/
├── presentation-templates/
├── assessments/
│   └── rubrics/
└── instructor-guide/
    ├── README.md
    ├── lesson-plans/
    └── answer-keys/
```

---

## Quality Checklist

Before marking a course "Production Ready", verify:

### Content Quality
- [ ] All modules have clear learning objectives
- [ ] All code examples tested and working
- [ ] All external links verified (not 404)
- [ ] No placeholder text (TODO, TBD, Lorem ipsum)
- [ ] Consistent language throughout
- [ ] Professional formatting (no typos, proper markdown)

### Completeness
- [ ] All modules have content, exercises, and quizzes
- [ ] All exercises have solutions or answer keys
- [ ] Instructor guide complete (if applicable)
- [ ] Resources and references cited properly

### Testing
- [ ] Tested with at least 3 students
- [ ] Student feedback incorporated
- [ ] Common issues documented
- [ ] Timing estimates verified

### Documentation
- [ ] README.md complete
- [ ] SYLLABUS.md detailed
- [ ] STATUS.md honest and up-to-date
- [ ] CHANGELOG.md maintained

---

## Migration Guide

### Existing Courses

To bring existing courses to this standard:

1. **Create STATUS.md**
   - Honestly assess completion
   - List what's done vs what's needed

2. **Reorganize if needed**
   - Move files to match structure
   - Use `git mv` to preserve history

3. **Fill gaps**
   - Add missing quizzes
   - Create exercise solutions
   - Update documentation

4. **Test and validate**
   - Verify all links
   - Test all code examples
   - Get peer review

---

## Examples

### Good Structure Examples

1. **QA Automation with AI** (Production Ready)
   - Complete module structure
   - All files present
   - Tested and validated
   - Location: `courses/Technical-Development/QA-Automation-with-AI/`

### In-Progress Examples

2. **FPUNA 2026** (In Development)
   - Good structure defined
   - Some modules complete
   - STATUS.md honest about completion
   - Location: `courses/Summer-Courses-University/FPUNA-2026/`

---

## Maintenance

### Regular Updates

- **Monthly**: Review STATUS.md for accuracy
- **Quarterly**: Verify all external links
- **Semester**: Update content based on student feedback
- **Annually**: Major version update with changelog

### Version Numbers

- **1.0**: Initial release
- **1.x**: Minor updates (typos, small improvements)
- **2.0**: Major updates (new modules, restructuring)

---

## Questions?

- **For structure questions**: See [CONTRIBUTING.md](./CONTRIBUTING.md)
- **For content questions**: See course-specific documentation
- **For general help**: Open a GitHub issue

---

*Course Structure Template v1.0*  
*Created: January 16, 2026*  
*Apply this structure to all new and updated courses*
