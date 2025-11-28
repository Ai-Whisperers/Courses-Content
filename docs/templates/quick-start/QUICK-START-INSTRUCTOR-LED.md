# Quick Start: Instructor-Led Course

> Create an 8-module instructor-led course in 40-60 hours

## Overview

| Item | Details |
|------|---------|
| **Format** | Instructor-led, live |
| **Modules** | 8 |
| **Duration** | 16-24 hours |
| **Dev Time** | 40-60 hours with AI |
| **Files per module** | 7 |

---

## Step 1: Create Directory Structure (15 min)

### Option A: Manual Creation

```bash
# Create course root
mkdir -p courses/{{course-slug}}

# Create subdirectories
cd courses/{{course-slug}}
mkdir -p modules assessments examples prompts resources presentation-templates templates

# Create module directories
for i in $(seq -w 01 08); do
  mkdir -p modules/module-$i
done

# Create resource subdirectories
mkdir -p resources/{common,instructor/{answer-keys,session-plans},reference}
mkdir -p assessments/{capstone,quizzes/answer-keys}
mkdir -p examples/{starter-code,completed-code}
mkdir -p templates/project-ai-setup/{.claude,.cursor,.gemini,.github}
```

### Option B: Copy from Templates

```bash
cp -r docs/templates/course-skeletons/instructor-led/* courses/{{course-slug}}/
```

---

## Step 2: Create Course-Level Files (3-4 hours)

### README.md

1. Copy: `docs/templates/course-skeletons/instructor-led/README.md`
2. Replace all `{{PLACEHOLDER}}` values
3. Define session schedule
4. Link to materials

### SYLLABUS.md

1. Copy: `docs/templates/course-skeletons/instructor-led/SYLLABUS.md`
2. Complete all module details
3. Define session breakdowns
4. Add instructor info

### INSTRUCTOR-GUIDE.md

1. Copy: `docs/templates/course-skeletons/instructor-led/INSTRUCTOR-GUIDE.md`
2. Module-by-module teaching notes
3. Common issues and solutions
4. Timing guidance

---

## Step 3: Create Modules (4-6 hours each)

### Per Module Checklist

For each module (01-08), create 7 files:

- [ ] **MODULE-OVERVIEW.md** (30 min)
  - Copy: `docs/templates/modules/instructor-led/MODULE-OVERVIEW.md`
  - Learning objectives
  - Session breakdown
  - Key concepts

- [ ] **01-SLIDES.md** (1.5 hours)
  - Copy: `docs/templates/modules/instructor-led/01-SLIDES.md`
  - 17 slides
  - Speaker notes
  - Demo scripts

- [ ] **02-EXERCISES.md** (1 hour)
  - Copy: `docs/templates/modules/instructor-led/02-EXERCISES.md`
  - 3 guided exercises
  - Time-boxed (40 min total)
  - Discussion points

- [ ] **03-LAB.md** (1 hour)
  - Copy: `docs/templates/modules/instructor-led/03-LAB.md`
  - 30-minute project
  - Clear requirements
  - Grading rubric

- [ ] **04-CODE-EXAMPLES.md** (1 hour)
  - Copy: `docs/templates/modules/instructor-led/04-CODE-EXAMPLES.md`
  - 5 working examples
  - Step-by-step explanations
  - Variations shown

- [ ] **05-QUIZ.md** (30 min)
  - Copy: `docs/templates/modules/instructor-led/05-QUIZ.md`
  - 10 questions
  - 10-minute time limit

- [ ] **ANSWER-KEY.md** (30 min)
  - Copy: `docs/templates/modules/instructor-led/ANSWER-KEY.md`
  - Quiz answers with explanations
  - Exercise solutions
  - Lab solution

### AI Prompt for Module Content

```
Create an instructor-led module for [MODULE_NAME] in a course about [COURSE_TOPIC].

Target audience: [AUDIENCE]
Session duration: [X] hours
Prerequisites: [PREREQUISITES]

Generate:
1. Module overview with learning objectives
2. 17-slide presentation outline with key points
3. 3 guided exercises (40 min total)
4. 1 lab project (30 min)
5. 5 code examples with explanations
6. 10-question quiz

Include speaker notes and timing guidance.
Format as Markdown.
```

---

## Step 4: Create Presentation Templates (2-3 hours)

Copy to `presentation-templates/`:

```
presentation-templates/
├── README.md
├── INDEX.md
├── MASTER-SLIDE-DECK-TEMPLATE.md
├── MODULE-SLIDE-TEMPLATE.md
├── WORKSHOP-SLIDE-TEMPLATE.md
├── SPEAKER-NOTES-TEMPLATE.md
├── VISUAL-DIAGRAMS-LIBRARY.md
└── QUICK-START.md
```

Customize with course branding and content.

---

## Step 5: Create Session Plans (2-3 hours)

Create in `resources/instructor/session-plans/`:

### Session Plan Template

```markdown
# Session {{X}}: {{MODULE_NAME}}

## Pre-Session Checklist
- [ ] Review module materials
- [ ] Test demos
- [ ] Prepare attendance

## Session Flow

| Time | Activity | Notes |
|------|----------|-------|
| 0:00 | Welcome | Icebreaker |
| 0:10 | Presentation | Slides 1-10 |
| 0:40 | Exercise | Exercises 1-3 |
| 1:20 | Lab | Independent work |
| 1:50 | Quiz & Wrap | Knowledge check |

## Key Teaching Points
1. {{POINT_1}}
2. {{POINT_2}}

## Potential Issues
- {{ISSUE_1}}: {{RESOLUTION_1}}
```

---

## Step 6: Create Assessments (4-6 hours)

### Quizzes (per module)

Already in each module's `05-QUIZ.md`

### Capstone Project

1. Copy: `docs/templates/assessments/CAPSTONE-BRIEF.md`
2. Copy: `docs/templates/assessments/CAPSTONE-RUBRIC.md`
3. Design for Session 8
4. Include presentation component

---

## Step 7: Create Supporting Materials (4-5 hours)

### Prompts Library

1. Copy: `docs/templates/supporting-materials/PROMPTS-README.md`
2. Add prompts for exercises and labs

### Resources

```
resources/
├── common/
│   ├── cheatsheet.md
│   ├── glossary.md
│   └── quick-reference.md
├── instructor/
│   ├── INSTRUCTOR-GUIDE.md
│   ├── TEACHING-TIPS.md
│   ├── answer-keys/
│   └── session-plans/
└── reference/
    ├── troubleshooting-guide.md
    └── FAQ.md
```

---

## Step 8: Create Starter & Solution Code (3-4 hours)

### Starter Code

For each module:
```
examples/starter-code/module-XX/
├── README.md
└── [starter files]
```

### Completed Code

For each module:
```
examples/completed-code/module-XX/
├── README.md
└── [solution files]
```

---

## Step 9: Quality Check (4-6 hours)

### Content Review

- [ ] All placeholders replaced
- [ ] Learning objectives measurable
- [ ] Session times add up correctly
- [ ] All demos tested
- [ ] Code examples work
- [ ] Quizzes have answer keys

### Instructor Materials Review

- [ ] Session plans complete
- [ ] Speaker notes helpful
- [ ] Teaching tips included
- [ ] All solutions provided

### Dry Run

- [ ] Run through one complete module
- [ ] Time activities
- [ ] Note improvements

---

## Timeline Summary

| Phase | Duration | Tasks |
|-------|----------|-------|
| Setup | 30 min | Directory structure |
| Course files | 4 hours | README, SYLLABUS, INSTRUCTOR-GUIDE |
| Modules | 32-48 hours | 8 modules × 4-6 hours |
| Presentations | 3 hours | Template customization |
| Assessments | 5 hours | Capstone + quiz review |
| Supporting | 5 hours | Resources, prompts |
| Code | 4 hours | Starter + solutions |
| QA | 6 hours | Review, dry run |
| **Total** | **60-76 hours** | |

---

## With AI Assistance

Reduce times by 40-50%:

| Phase | Without AI | With AI |
|-------|------------|---------|
| Module content | 6 hours | 3 hours |
| Presentations | 2 hours | 1 hour |
| Code examples | 1 hour | 30 min |
| **Per module** | **9 hours** | **4.5 hours** |
| **Total (8)** | **72 hours** | **36 hours** |

---

## Delivery Preparation

### 1 Week Before

- [ ] Finalize all materials
- [ ] Set up LMS/delivery platform
- [ ] Send pre-course communication
- [ ] Prepare student accounts

### Day Before

- [ ] Review session plan
- [ ] Test all demos
- [ ] Check recording setup
- [ ] Prepare backup materials

---

## Resources

- [Course Content Creation Guide](../../frameworks/COURSE-CONTENT-CREATION-GUIDE.md)
- [Course Template Master](../../frameworks/COURSE-TEMPLATE-MASTER.md)
- [Assessment Framework](../../frameworks/ASSESSMENT-FRAMEWORK.md)
- [Instructor Guide Template](../course-skeletons/instructor-led/INSTRUCTOR-GUIDE.md)
