# Course Templates Library

> Reusable templates for creating professional AI training courses

## Quick Navigation

| Template | Purpose | Time Savings |
|----------|---------|--------------|
| [Course Skeletons](course-skeletons/) | Complete course directory structures | 2-3 hours |
| [Module Templates](modules/) | Individual module content templates | 1-2 hours/module |
| [Assessments](assessments/) | Quiz, exercise, and lab templates | 30-60 min/assessment |
| [Supporting Materials](supporting-materials/) | Prompts, resources, presentations | 2-4 hours |
| [Quick Start Guides](quick-start/) | Step-by-step course creation guides | N/A |
| [AI Integration](ai-integration/) | .claude, .cursor, .gemini configs | 30 min |

---

## Template Formats

### Self-Paced Format (12+ modules, 40-60 hours)
Best for: Online, asynchronous learning
```
course-name/
├── README.md
├── SYLLABUS.md
├── modules/
│   └── XX-topic-name/
│       ├── README.md
│       ├── EXERCISE.md
│       └── QUIZ.md
├── assessments/
├── examples/
├── prompts/
├── resources/
└── templates/
```

### Instructor-Led Format (6-8 modules, 16-24 hours)
Best for: Workshops, bootcamps, live instruction
```
course-name/
├── README.md
├── SYLLABUS.md
├── modules/
│   └── module-XX/
│       ├── MODULE-OVERVIEW.md
│       ├── 01-SLIDES.md
│       ├── 02-EXERCISES.md
│       ├── 03-LAB.md
│       ├── 04-CODE-EXAMPLES.md
│       ├── 05-QUIZ.md
│       └── ANSWER-KEY.md
├── assessments/
├── examples/
├── presentation-templates/
├── prompts/
├── resources/
└── templates/
```

---

## Usage Guide

### Creating a New Course

1. **Choose your format** based on delivery method
2. **Copy the course skeleton** from `course-skeletons/`
3. **Replace placeholders** marked with `{{PLACEHOLDER}}`
4. **Use module templates** from `modules/` for each module
5. **Add assessments** using templates from `assessments/`
6. **Configure AI tools** using templates from `ai-integration/`

### Placeholder Convention

All templates use consistent placeholders:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{COURSE_NAME}}` | Full course name | AI for Marketing Teams |
| `{{COURSE_SLUG}}` | URL-friendly name | ai-for-marketing-teams |
| `{{DURATION_HOURS}}` | Total course hours | 16 |
| `{{MODULE_COUNT}}` | Number of modules | 8 |
| `{{MODULE_NUMBER}}` | Two-digit module number | 01 |
| `{{MODULE_NAME}}` | Module name | Introduction to AI |
| `{{MODULE_SLUG}}` | URL-friendly module name | introduction-to-ai |
| `{{TARGET_AUDIENCE}}` | Who the course is for | Marketing professionals |
| `{{LEARNING_OBJECTIVES}}` | Course objectives | List of 4-6 objectives |
| `{{PREREQUISITES}}` | Required knowledge | Basic marketing experience |

---

## Template Quality Standards

All templates follow these standards:

- **Bloom's Taxonomy** aligned learning objectives
- **40%+ hands-on practice** content ratio
- **Clear assessment criteria** with rubrics
- **Real-world examples** and case studies
- **AI tool integration** ready
- **Accessibility** compliant content

---

## Related Documentation

- [Course Content Creation Guide](../frameworks/COURSE-CONTENT-CREATION-GUIDE.md)
- [Course Template Master](../frameworks/COURSE-TEMPLATE-MASTER.md)
- [Assessment Framework](../frameworks/ASSESSMENT-FRAMEWORK.md)
- [Course Preparation Checklist](../frameworks/COURSE-PREPARATION-CHECKLIST.md)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | November 2025 | Initial template library |
