# Reference Documentation

**Purpose:** Quick reference guides, repository structure documentation, and fast lookups for AI Whisperers Courses Content.

**Audience:** All contributors, course creators, maintainers

---

## Available References

### 📖 Repository Structure & Analysis

| Document | Description | Updated | Lines |
|----------|-------------|---------|-------|
| **[REPOSITORY-STRUCTURE.md](./REPOSITORY-STRUCTURE.md)** | Comprehensive repository analysis with file structure, organization patterns, and improvement recommendations | Nov 2025 | 100+ |
| **[COURSES-ANALYSIS.md](./COURSES-ANALYSIS.md)** | Detailed course directory analysis with structural issues, consistency checks, and critical fixes | Nov 2025 | 100+ |

### ⚡ Quick Reference

| Document | Description | Use Case |
|----------|-------------|----------|
| **[QUICK-REFERENCE.md](./QUICK-REFERENCE.md)** | Fast lookup guide for course formats, assessment weights, grading scales, and common procedures | Quick decisions during course creation |

---

## Quick Navigation

### By Role

**Course Creators:**
- [Quick Reference](./QUICK-REFERENCE.md) - Course formats and standards
- [Repository Structure](./REPOSITORY-STRUCTURE.md) - Where files go
- [Course Creation Guide](../guides/course-creation/) - Step-by-step workflow

**Maintainers:**
- [Repository Structure](./REPOSITORY-STRUCTURE.md) - Understand organization
- [Courses Analysis](./COURSES-ANALYSIS.md) - Identify issues
- [Documentation Consolidation](../guides/DOCUMENTATION-CONSOLIDATION-PLAN.md) - Improve structure

**Instructors:**
- [Quick Reference](./QUICK-REFERENCE.md) - Grading scales and weights
- [Assessment Guide](../guides/assessment/) - Design assessments
- [Quality Control](../guides/QUALITY-CONTROL.md) - Standards

---

## Essential Quick Reference

### Course Formats

| Format | Modules | Hours | Best For |
|--------|---------|-------|----------|
| Self-Paced | 12 | 40-60 | Individual learning, technical skills |
| Instructor-Led | 8 | 16-24 | Interactive workshops, team training |
| Half-Day | 3-4 | 4 | Introductions, overviews |
| Full-Day | 5-6 | 8 | Intensive hands-on training |

### Assessment Weights

| Component | Self-Paced | Instructor-Led | Notes |
|-----------|------------|----------------|-------|
| Exercises | 30% | 25% | Hands-on practice |
| Quizzes | 20% | 15% | Knowledge checks |
| Milestones | 20% | - | Progress tracking |
| Participation | - | 10% | Instructor-led only |
| Capstone | 30% | 40% | Final project |
| Presentation | - | 10% | Instructor-led only |

### Grading Scale

| Grade | Score | Meaning |
|-------|-------|---------|
| A | 90-100% | Excellent |
| B | 80-89% | Good |
| C | 70-79% | Satisfactory (pass) |
| F | <70% | Needs improvement (fail) |

---

## Common Lookups

### File Locations

| Need | Path |
|------|------|
| Course content | `courses/[status]/[course-name]/` |
| Templates | `docs/templates/` |
| Guides | `docs/guides/` |
| Shared configs | `_shared/configs/` |
| Example projects | `_shared/examples/` |

### Document Types

| Type | Extension | Template Location |
|------|-----------|------------------|
| Course overview | README.md | [docs/templates/course-skeletons/](../templates/course-skeletons/) |
| Module content | README.md | [docs/templates/modules/](../templates/modules/) |
| Exercises | EXERCISE.md | [docs/templates/assessments/](../templates/assessments/) |
| Quizzes | QUIZ.md | [docs/templates/assessments/](../templates/assessments/) |
| Syllabi | SYLLABUS.md | [docs/templates/](../templates/) |

### Status Indicators

| Icon | Status | Meaning |
|------|--------|---------|
| 🟢 | Production | Fully tested, ready for students |
| 🟡 | Development | Active work, 30-50% complete |
| 🔵 | Beta | 60%+ complete, needs testing |
| ⚪ | Planning | Early stage, <50% complete |

---

## Directory Structure Snapshot

```
Courses-Content/
├── courses/                           # All course content (by status)
│   ├── 🟢-production/                 # Production-ready (2 courses)
│   ├── 🟡-development/                # In development (1 course)
│   ├── 🔵-beta/                       # Beta testing (3 courses)
│   └── ⚪-planning/                    # Planning stage (9 courses)
│
├── docs/                              # Documentation hub
│   ├── guides/                        # How-to guides
│   ├── templates/                     # Reusable templates
│   ├── business/                      # Business docs
│   ├── reference/                     # Quick references (YOU ARE HERE)
│   ├── planning/                      # Planning docs
│   └── archive/                       # Historical docs
│
├── _shared/                           # Shared resources
│   ├── configs/                       # Tool configurations
│   ├── examples/                      # Example projects
│   └── templates/                     # New course templates
│
├── AUDIT-REPORTS/                     # Historical audit reports
├── PROGRESS/                          # Daily tracking logs
└── certification/                     # Certification framework
```

See [REPOSITORY-STRUCTURE.md](./REPOSITORY-STRUCTURE.md) for complete details.

---

## Reference Document Details

### REPOSITORY-STRUCTURE.md

**Purpose:** Comprehensive repository analysis and organization guide

**Contents:**
- Complete directory tree with file counts
- Organization patterns and conventions
- Structural issues and recommendations
- File location standards
- Historical context and changes

**When to use:**
- Understanding where files belong
- Planning reorganization
- Onboarding new contributors
- Troubleshooting file structure issues

---

### COURSES-ANALYSIS.md

**Purpose:** Detailed analysis of course directory structure and consistency

**Contents:**
- Course inventory by status
- Structural issues (empty modules, missing files)
- Naming convention inconsistencies
- Module structure variations
- Critical fixes needed

**When to use:**
- Identifying course quality issues
- Planning course improvements
- Standardizing course structure
- Quality audits

---

### QUICK-REFERENCE.md

**Purpose:** Fast lookup guide for common course creation decisions

**Contents:**
- Course format specifications
- Assessment weight guidelines
- Grading scales
- Common procedures
- Time allocations

**When to use:**
- Making quick decisions during course creation
- Verifying standards compliance
- Setting up assessments
- Planning timelines

---

## Related Documentation

### In This Repository

| Resource | Location | Purpose |
|----------|----------|---------|
| **Documentation Hub** | [docs/README.md](../README.md) | Main docs navigation |
| **Guides** | [docs/guides/](../guides/) | How-to guides |
| **Templates** | [docs/templates/](../templates/) | Reusable templates |
| **Business Docs** | [docs/business/](../business/) | Client and portfolio info |
| **DOC-MAP** | [docs/DOC-MAP.md](../DOC-MAP.md) | Role-based navigation |

### External Resources

- [Markdown Guide](https://www.markdownguide.org/) - Markdown syntax reference
- [GitHub Documentation](https://docs.github.com) - GitHub features
- [Instructional Design Principles](https://www.instructionaldesigncentral.com/) - Course design best practices

---

## Quick Start by Task

### "I need to create a new course"

1. Check [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) for format standards
2. Follow [Course Creation Guide](../guides/course-creation/)
3. Use templates from [docs/templates/](../templates/)
4. Reference [REPOSITORY-STRUCTURE.md](./REPOSITORY-STRUCTURE.md) for file locations

### "I need to fix structural issues"

1. Review [COURSES-ANALYSIS.md](./COURSES-ANALYSIS.md) for identified issues
2. Check [REPOSITORY-STRUCTURE.md](./REPOSITORY-STRUCTURE.md) for standards
3. Follow [Documentation Consolidation](../guides/DOCUMENTATION-CONSOLIDATION-PLAN.md)

### "I need to understand repository organization"

1. Start with [REPOSITORY-STRUCTURE.md](./REPOSITORY-STRUCTURE.md)
2. Review [DOC-MAP.md](../DOC-MAP.md) for navigation
3. Check [docs/README.md](../README.md) for overview

---

## Statistics

| Metric | Value |
|--------|-------|
| **Reference Documents** | 3 |
| **Total Lines** | ~300+ |
| **Last Updated** | January 2026 |
| **Coverage** | Repository structure, course analysis, quick lookups |

---

## Maintenance

### When to Update

**REPOSITORY-STRUCTURE.md:**
- Major directory reorganization
- New top-level directories added
- Significant file count changes
- Quarterly reviews

**COURSES-ANALYSIS.md:**
- New courses added
- Course status changes
- Structural issue fixes
- After quality audits

**QUICK-REFERENCE.md:**
- Standards change
- New course formats introduced
- Assessment weight adjustments
- Grading scale updates

### Update Checklist

- [ ] Verify all internal links work
- [ ] Update statistics (file counts, dates)
- [ ] Add new sections for major changes
- [ ] Cross-reference with related docs
- [ ] Update this README if new references added

---

**Last Updated:** January 24, 2026  
**Maintained By:** Documentation Team  
**Next Review:** February 2026
