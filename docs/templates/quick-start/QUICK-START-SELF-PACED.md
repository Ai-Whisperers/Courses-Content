# Quick Start: Self-Paced Course

> Create a 12-module self-paced course in 24-40 hours

## Overview

| Item | Details |
|------|---------|
| **Format** | Self-paced, online |
| **Modules** | 12 |
| **Duration** | 40-60 hours |
| **Dev Time** | 24-40 hours with AI |
| **Files per module** | 3 (README, EXERCISE, QUIZ) |

---

## Step 1: Create Directory Structure (15 min)

### Option A: Manual Creation

```bash
# Create course root
mkdir -p courses/{{course-slug}}

# Create subdirectories
cd courses/{{course-slug}}
mkdir -p modules assessments examples prompts resources templates

# Create module directories
for i in $(seq -w 01 12); do
  mkdir -p modules/$i-module-$i
done

# Create resource subdirectories
mkdir -p resources/{by-module,common,instructor,reference}
mkdir -p assessments/{milestone-projects/{milestone-1,milestone-2},capstone}
mkdir -p templates/project-ai-setup/{.claude,.cursor,.gemini,.github}
```

### Option B: Copy from Templates

```bash
cp -r docs/templates/course-skeletons/self-paced/* courses/{{course-slug}}/
```

---

## Step 2: Create Course-Level Files (2-3 hours)

### README.md

1. Copy template: `docs/templates/course-skeletons/self-paced/README.md`
2. Replace placeholders:
   - `{{COURSE_NAME}}` - Full course name
   - `{{COURSE_TAGLINE}}` - One-line description
   - `{{TARGET_AUDIENCE}}` - Who it's for
   - `{{DURATION_HOURS}}` - Total hours
   - `{{MODULE_XX_NAME}}` - Each module name

### SYLLABUS.md

1. Copy template: `docs/templates/course-skeletons/self-paced/SYLLABUS.md`
2. Fill in all module details
3. Define assessment weights
4. Add policies (late work, academic integrity)

---

## Step 3: Create Modules (2-4 hours each)

### Per Module Checklist

For each module (01-12):

- [ ] **README.md** (1-2 hours)
  - Copy: `docs/templates/modules/self-paced/README.md`
  - Learning objectives (4)
  - Topics covered (3-4)
  - Code examples
  - Common mistakes
  - Summary

- [ ] **EXERCISE.md** (1 hour)
  - Copy: `docs/templates/modules/self-paced/EXERCISE.md`
  - 4 progressive tasks
  - Clear instructions
  - Expected outputs
  - Hints
  - Solution (hidden)

- [ ] **QUIZ.md** (30 min)
  - Copy: `docs/templates/modules/self-paced/QUIZ.md`
  - 10 questions
  - Mix of types (MC, T/F, code)
  - Answer key

### AI Prompt for Module Content

```
Create a comprehensive module for [MODULE_NAME] in a course about [COURSE_TOPIC].

Target audience: [AUDIENCE]
Prerequisites: [PREREQUISITES]
Duration: [X] hours

Include:
1. 4 measurable learning objectives (Bloom's taxonomy)
2. 3-4 main topics with explanations
3. Code examples for each concept
4. Common mistakes section
5. Summary with key takeaways

Format as Markdown with clear headers.
```

---

## Step 4: Create Assessments (4-6 hours)

### Milestone Projects (2 projects)

1. Copy: `docs/templates/assessments/CAPSTONE-BRIEF.md`
2. Scope smaller (mid-course checkpoint)
3. Due after Module 5 and Module 10

### Capstone Project

1. Copy: `docs/templates/assessments/CAPSTONE-BRIEF.md`
2. Copy: `docs/templates/assessments/CAPSTONE-RUBRIC.md`
3. Comprehensive project using all skills
4. Clear requirements and rubric

---

## Step 5: Create Supporting Materials (3-4 hours)

### Prompts Library

1. Copy: `docs/templates/supporting-materials/PROMPTS-README.md`
2. Organize by category
3. Add 15-30 prompts

### Resources

1. Copy: `docs/templates/supporting-materials/RESOURCES-README.md`
2. Create:
   - `common/cheatsheet.md`
   - `common/glossary.md`
   - `reference/FAQ.md`
   - `reference/troubleshooting-guide.md`

---

## Step 6: AI Integration Setup (1 hour)

Create in `templates/project-ai-setup/`:

### .claude/settings.json
```json
{
  "projectContext": "{{COURSE_CONTEXT}}",
  "preferredStyle": "{{STYLE}}"
}
```

### CLAUDE.md
```markdown
# {{COURSE_NAME}} Project

## Context
{{PROJECT_CONTEXT}}

## Standards
{{STANDARDS}}

## Commands
{{CUSTOM_COMMANDS}}
```

---

## Step 7: Quality Check (2-4 hours)

### Content Review Checklist

- [ ] All placeholders replaced
- [ ] Learning objectives measurable (Bloom's)
- [ ] Code examples tested
- [ ] Quizzes have answer keys
- [ ] Links work
- [ ] Consistent formatting
- [ ] No typos

### Structure Review

- [ ] All 12 modules complete
- [ ] Each module has README, EXERCISE, QUIZ
- [ ] Milestones defined
- [ ] Capstone complete
- [ ] Resources populated

---

## Timeline Summary

| Phase | Duration | Tasks |
|-------|----------|-------|
| Setup | 30 min | Directory structure, copy templates |
| Course files | 3 hours | README, SYLLABUS |
| Modules | 24-36 hours | 12 modules × 2-3 hours |
| Assessments | 6 hours | 2 milestones + capstone |
| Supporting | 4 hours | Prompts, resources |
| AI integration | 1 hour | Setup files |
| QA | 4 hours | Review, testing |
| **Total** | **38-54 hours** | |

---

## With AI Assistance

Reduce times by 40-60%:

| Phase | Without AI | With AI |
|-------|------------|---------|
| Module content | 3 hours | 1.5 hours |
| Exercises | 1 hour | 30 min |
| Quizzes | 30 min | 15 min |
| **Per module** | **4.5 hours** | **2.25 hours** |
| **Total (12)** | **54 hours** | **27 hours** |

---

## Next Steps

1. Start with Module 01
2. Get feedback early
3. Iterate based on feedback
4. Complete remaining modules
5. Final QA pass
6. Launch!

---

## Resources

- [Course Content Creation Guide](../../frameworks/COURSE-CONTENT-CREATION-GUIDE.md)
- [Course Template Master](../../frameworks/COURSE-TEMPLATE-MASTER.md)
- [Assessment Framework](../../frameworks/ASSESSMENT-FRAMEWORK.md)
