# Course Templates Library

> Reusable templates for creating professional AI training courses

**Purpose:** Accelerate course development with battle-tested templates  
**Audience:** Course creators, instructors, content developers  
**Last Updated:** January 24, 2026

## Quick Navigation

| Template | Purpose | Time Savings |
|----------|---------|--------------|
| [Course Skeletons](course-skeletons/) | Complete course directory structures | 2-3 hours |
| [Module Templates](modules/) | Individual module content templates | 1-2 hours/module |
| [Assessments](assessments/) | Quiz, exercise, and lab templates | 30-60 min/assessment |
| [Supporting Materials](supporting-materials/) | Prompts, resources, presentations | 2-4 hours |
| [Quick Start Guides](quick-start/) | Step-by-step course creation guides | N/A |
| [AI Integration](ai-integration/) | .claude, .cursor, .gemini configs | 30 min |
| [Course Checklist](COURSE-CHECKLIST-TEMPLATE.md) | Course-level quality checklist | 15 min |
| [Module Checklist](MODULE-CHECKLIST-TEMPLATE.md) | Module-level quality checklist | 10 min |
| [Course Structure](COURSE-STRUCTURE-TEMPLATE.md) | Comprehensive course structure guide | 30 min |

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

### In This Repository
- **[Course Creation Guide](../guides/course-creation/)** - Complete workflow
- **[Assessment Guide](../guides/assessment/)** - Design and grading
- **[Quality Control](../guides/QUALITY-CONTROL.md)** - Standards and review
- **[Documentation Hub](../README.md)** - Main navigation

### External Resources
- [Bloom's Taxonomy](https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/) - Learning objectives
- [Backward Design](https://cft.vanderbilt.edu/guides-sub-pages/understanding-by-design/) - Course design
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - WCAG standards

---

## Statistics

| Metric | Count |
|--------|-------|
| **Template Categories** | 9 |
| **Course Skeletons** | 2 (self-paced, instructor-led) |
| **Module Templates** | 2 formats × 7 templates each = 14 |
| **Assessment Templates** | 2 (capstone brief, rubric) |
| **Supporting Materials** | 4 (prompts, cheatsheets, glossaries) |
| **AI Integration Configs** | 3 (Claude, Cursor, Gemini) |
| **Checklists** | 2 (course, module) |
| **Total Templates** | 35+ |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | January 2026 | Added metadata, stats, updated links |
| 1.0 | November 2025 | Initial template library |

---

**Maintained By:** Course Development Team  
**Next Review:** February 2026
