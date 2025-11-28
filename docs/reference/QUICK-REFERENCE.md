# Course Creation Quick Reference

> Essential information for rapid course development

## Course Formats at a Glance

| Format | Modules | Hours | Files/Module | Dev Time |
|--------|---------|-------|--------------|----------|
| Self-Paced | 12 | 40-60 | 3 | 24-40 hrs |
| Instructor-Led | 8 | 16-24 | 7 | 40-60 hrs |

---

## Template Locations

| Template | Path |
|----------|------|
| Self-Paced Skeleton | `docs/templates/course-skeletons/self-paced/` |
| Instructor-Led Skeleton | `docs/templates/course-skeletons/instructor-led/` |
| Self-Paced Modules | `docs/templates/modules/self-paced/` |
| Instructor-Led Modules | `docs/templates/modules/instructor-led/` |
| Assessments | `docs/templates/assessments/` |
| Supporting Materials | `docs/templates/supporting-materials/` |
| Quick Start Guides | `docs/templates/quick-start/` |
| AI Integration | `docs/templates/ai-integration/` |

---

## Assessment Weights

### Self-Paced (12 modules)

| Component | Weight | Per Item |
|-----------|--------|----------|
| Module Exercises | 30% | 2.5% each |
| Module Quizzes | 20% | 1.67% each |
| Milestone Projects | 20% | 10% each (2) |
| Final Capstone | 30% | - |

### Instructor-Led (8 modules)

| Component | Weight | Per Item |
|-----------|--------|----------|
| Module Quizzes | 15% | 2.5% each |
| Labs & Exercises | 25% | 3.125% each |
| Participation | 10% | - |
| Final Capstone | 40% | - |
| Presentation | 10% | - |

---

## Grading Scale

| Grade | Score | Description |
|-------|-------|-------------|
| A | 90-100% | Excellent |
| B | 80-89% | Good |
| C | 70-79% | Satisfactory (passing) |
| F | <70% | Needs improvement |

**Passing threshold:** 70% for all components

---

## Module Naming Convention

### Self-Paced
```
XX-topic-name/
├── README.md
├── EXERCISE.md
└── QUIZ.md
```
Example: `01-introduction/`, `02-context-engineering/`

### Instructor-Led
```
module-XX/
├── MODULE-OVERVIEW.md
├── 01-SLIDES.md
├── 02-EXERCISES.md
├── 03-LAB.md
├── 04-CODE-EXAMPLES.md
├── 05-QUIZ.md
└── ANSWER-KEY.md
```
Example: `module-01/`, `module-02/`

---

## Content Size Guidelines

| File Type | Word Count | Size |
|-----------|------------|------|
| Module README | 1,500-2,500 | 5-10 KB |
| Exercise | 2,000-3,000 | 8-12 KB |
| Quiz | 800-1,200 | 5-8 KB |
| Slides | 2,500-3,500 | 12-15 KB |
| Code Examples | 3,000-5,000 | 15-25 KB |

---

## Time Allocation (Self-Paced Modules)

| Module Type | Duration |
|-------------|----------|
| Foundation (intro) | 3-4 hours |
| Skill-building | 4-5 hours |
| Integration | 4 hours |
| Project | 8+ hours |
| Advanced | 2-4 hours |

---

## Development Time (With AI)

| Task | Without AI | With AI |
|------|------------|---------|
| Module README | 2-3 hours | 1-1.5 hours |
| Exercise | 1-2 hours | 30-60 min |
| Quiz | 45-60 min | 15-30 min |
| Slides | 2-3 hours | 1-1.5 hours |
| Code Examples | 1-2 hours | 30-60 min |

---

## Bloom's Taxonomy Quick Reference

| Level | Verbs | Example Objective |
|-------|-------|-------------------|
| Remember | Define, list, recall | "List the 5 principles of..." |
| Understand | Explain, describe | "Explain how X affects Y" |
| Apply | Use, implement | "Implement X using Y" |
| Analyze | Compare, examine | "Analyze the trade-offs" |
| Evaluate | Assess, justify | "Evaluate the best approach" |
| Create | Design, develop | "Design a solution for..." |

---

## Placeholder Convention

| Placeholder | Description |
|-------------|-------------|
| `{{COURSE_NAME}}` | Full course name |
| `{{COURSE_SLUG}}` | URL-friendly name |
| `{{MODULE_NUMBER}}` | Two-digit number |
| `{{MODULE_NAME}}` | Module title |
| `{{MODULE_SLUG}}` | URL-friendly module |
| `{{DURATION_HOURS}}` | Hours for course/module |

---

## Quick Commands

### Create Self-Paced Course
```bash
mkdir -p courses/my-course/{modules,assessments,examples,prompts,resources,templates}
for i in $(seq -w 01 12); do mkdir -p courses/my-course/modules/$i-module-$i; done
```

### Create Instructor-Led Course
```bash
mkdir -p courses/my-course/{modules,assessments,examples,prompts,resources,presentation-templates,templates}
for i in $(seq -w 01 08); do mkdir -p courses/my-course/modules/module-$i; done
```

---

## Framework Quick Links

| Need | Framework |
|------|-----------|
| Start a new course | [Course Preparation Checklist](COURSE-PREPARATION-CHECKLIST.md) |
| Create content | [Course Content Creation Guide](COURSE-CONTENT-CREATION-GUIDE.md) |
| Find all templates | [Course Template Master](COURSE-TEMPLATE-MASTER.md) |
| Design assessments | [Assessment Framework](ASSESSMENT-FRAMEWORK.md) |
| Track courses | [Course Inventory Report](COURSE-INVENTORY-REPORT.md) |

---

## Checklist: Module Complete

- [ ] README.md with 4+ learning objectives
- [ ] All topics covered with examples
- [ ] Code examples tested
- [ ] Exercise with 4 tasks
- [ ] Quiz with 10 questions
- [ ] Answer key complete
- [ ] Links verified
- [ ] Placeholders replaced

---

## Checklist: Course Complete

- [ ] All modules finished
- [ ] Course README complete
- [ ] Syllabus complete
- [ ] Assessments ready
- [ ] Capstone with rubric
- [ ] Resources populated
- [ ] Prompts library done
- [ ] AI integration configured
- [ ] Quality review passed

---

*Print this page for quick reference during course creation*
