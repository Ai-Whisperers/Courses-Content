# Documentation Map

**Purpose:** Central navigation for all AI Whisperers documentation  
**Audience:** Students, Instructors, Contributors  
**Status:** Active  
**Last Updated:** January 23, 2026

---

## Table of Contents

- [For Students](#for-students)
- [For Instructors](#for-instructors)
- [For Contributors](#for-contributors)
- [Document Organization](#document-organization)
- [Finding What You Need](#finding-what-you-need)

---

## For Students

### Getting Started (Start Here!)
1. **[README.md](../README.md)** - Repository overview and course catalog
2. **[courses/INDEX.md](../courses/INDEX.md)** - Browse all courses by status (🟢 Production / 🟡 Development / 🔵 Beta / ⚪ Planning)
3. **Choose your course** → Read the course README.md and SYLLABUS.md
4. **Follow the course modules** → Work through modules sequentially

### Course-Specific Docs
- Each course has:
  - `README.md` - Course overview, prerequisites, outcomes
  - `SYLLABUS.md` - Detailed curriculum breakdown
  - `modules/` - Learning content organized by module
  - `resources/` - Cheatsheets, glossaries, troubleshooting

### Support & Help
- Check course-specific `resources/troubleshooting-guide.md`
- Review common mistakes in course `resources/common-mistakes.md`
- Contact instructors via course communication channels

---

## For Instructors

### Quick Start
1. **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Contribution guidelines and quality standards
2. **[docs/README.md](./README.md)** - Documentation hub navigation
3. **[docs/guides/course-creation/](./guides/course-creation/)** - Complete course creation workflow

### Essential Guides
| Guide | Purpose | Location |
|-------|---------|----------|
| **Course Creation** | End-to-end course development | [docs/guides/course-creation/](./guides/course-creation/) |
| **Assessment Design** | Design quizzes, exercises, rubrics | [docs/guides/assessment/](./guides/assessment/) |
| **Quality Control** | Content standards & checklist | [docs/guides/QUALITY-CONTROL.md](./guides/QUALITY-CONTROL.md) |
| **Content Gap Analysis** | Identify missing content | [docs/guides/CONTENT-GAP-ANALYSIS.md](./guides/CONTENT-GAP-ANALYSIS.md) |

### Templates
- **[docs/templates/](./templates/)** - All templates organized by type:
  - Course skeletons (instructor-led, self-paced)
  - Module templates
  - Assessment templates
  - Supporting materials (cheatsheets, glossaries)
  - AI integration templates (CLAUDE.md, etc.)

### Reference Materials
- **[docs/reference/QUICK-REFERENCE.md](./reference/QUICK-REFERENCE.md)** - Fast lookup for durations, formats, grading
- **[docs/reference/REPOSITORY-STRUCTURE.md](./reference/REPOSITORY-STRUCTURE.md)** - Complete repo organization
- **[docs/business/portfolio/INVENTORY.md](./business/portfolio/INVENTORY.md)** - Course inventory & status

### Course Management
- **[HONEST-STATUS-REPORT.md](../HONEST-STATUS-REPORT.md)** - Accurate course completion status
- **[courses/INDEX.md](../courses/INDEX.md)** - Course catalog with status badges
- **[AUDIT-REPORTS/INDEX.md](../AUDIT-REPORTS/INDEX.md)** - Historical audit reports

---

## For Contributors

### Setup & Standards
1. **[CONTRIBUTING.md](../CONTRIBUTING.md)** - **START HERE** - Contribution workflow, standards, expectations
2. **[RESTRUCTURING-SUMMARY.md](../RESTRUCTURING-SUMMARY.md)** - Recent major reorganization (Jan 2026)
3. **[IMPROVEMENTS-SUMMARY.md](../IMPROVEMENTS-SUMMARY.md)** - Recent improvements (Jan 2026)
4. **[HONEST-STATUS-REPORT.md](../HONEST-STATUS-REPORT.md)** - Current accurate state

### Development Workflow
| Step | Document | Purpose |
|------|----------|---------|
| 1. Plan | [docs/guides/course-creation/PLANNING.md](./guides/course-creation/PLANNING.md) | Scope and design course |
| 2. Structure | [docs/guides/course-creation/STRUCTURE.md](./guides/course-creation/STRUCTURE.md) | Set up directories |
| 3. Content | [docs/guides/course-creation/CONTENT.md](./guides/course-creation/CONTENT.md) | Write with AI assistance |
| 4. Review | [docs/guides/course-creation/CHECKLIST.md](./guides/course-creation/CHECKLIST.md) | Quality verification |

### Architecture & Planning
- **[docs/business/clients/](./business/clients/)** - Client segment profiles and analysis
- **[docs/planning/](./planning/)** - Active planning documents
  - FPUNA course strategy and project plans
  - Capstone project frameworks
  - Timeline and survey templates

### Tools & Configuration
- **[_shared/configs/](../_shared/configs/)** - AI tool configurations
  - CLAUDE-base.md - Base configuration template
  - tools/ - Claude, Cursor, Copilot, Windsurf, Gemini configs
- **[_shared/templates/](../_shared/templates/)** - Reusable course templates
- **[check-links.py](../check-links.py)** - Link validation tool (run before commits)

---

## Document Organization

```
Repository Root
├── README.md ⭐ Start here for overview
├── CONTRIBUTING.md ⭐ Contributors start here
├── HONEST-STATUS-REPORT.md ⭐ Accurate course status
├── RESTRUCTURING-SUMMARY.md (Recent changes)
├── IMPROVEMENTS-SUMMARY.md (Recent improvements)
│
├── courses/ ⭐ All course content
│   ├── INDEX.md ⭐ Course catalog with status
│   ├── 🟢-production/ (2 courses ready)
│   ├── 🟡-development/ (1 course ~40% complete)
│   ├── 🔵-beta/ (3 courses 60%+ complete)
│   └── ⚪-planning/ (9 courses early stage)
│
├── docs/ ⭐ All documentation
│   ├── README.md (You are close to here!)
│   ├── DOC-MAP.md ⭐ This file
│   ├── guides/ (How-to guides)
│   │   ├── course-creation/ ⭐ Complete workflow
│   │   ├── assessment/ ⭐ Design assessments
│   │   └── development/ (Development guides)
│   ├── templates/ ⭐ Reusable templates
│   ├── business/ (Client & portfolio docs)
│   ├── planning/ (Active planning)
│   ├── reference/ (Quick lookup)
│   └── archive/ (Historical docs)
│
├── _shared/ ⭐ Shared resources
│   ├── configs/ (AI tool configs)
│   ├── templates/ (New course template)
│   ├── examples/ (Clean examples)
│   └── examples-archived/ (Historical examples)
│
├── AUDIT-REPORTS/ (Historical audits)
├── PROGRESS/ (Daily tracking logs)
└── certification/ (Certification framework)
```

---

## Finding What You Need

### By Role

| I am a... | Start here |
|-----------|------------|
| **Student** | [README.md](../README.md) → [courses/INDEX.md](../courses/INDEX.md) → Pick your course |
| **Instructor** | [CONTRIBUTING.md](../CONTRIBUTING.md) → [docs/guides/course-creation/](./guides/course-creation/) |
| **Course Creator** | [docs/guides/course-creation/](./guides/course-creation/) → [docs/templates/](./templates/) |
| **Contributor** | [CONTRIBUTING.md](../CONTRIBUTING.md) → [HONEST-STATUS-REPORT.md](../HONEST-STATUS-REPORT.md) |
| **Business/PM** | [docs/business/portfolio/INVENTORY.md](./business/portfolio/INVENTORY.md) |

### By Task

| I want to... | Go to |
|--------------|-------|
| **Browse courses** | [courses/INDEX.md](../courses/INDEX.md) |
| **Create a new course** | [docs/guides/course-creation/](./guides/course-creation/) |
| **Design assessments** | [docs/guides/assessment/](./guides/assessment/) |
| **Find templates** | [docs/templates/](./templates/) |
| **Check course status** | [HONEST-STATUS-REPORT.md](../HONEST-STATUS-REPORT.md) |
| **Understand repo structure** | [docs/reference/REPOSITORY-STRUCTURE.md](./reference/REPOSITORY-STRUCTURE.md) |
| **Configure AI tools** | [_shared/configs/](../_shared/configs/) |
| **Check for broken links** | Run `python check-links.py` |
| **See recent changes** | [RESTRUCTURING-SUMMARY.md](../RESTRUCTURING-SUMMARY.md) + [IMPROVEMENTS-SUMMARY.md](../IMPROVEMENTS-SUMMARY.md) |

### By Document Type

| Type | Location |
|------|----------|
| **Guides** (how-to) | [docs/guides/](./guides/) |
| **Templates** (reusable) | [docs/templates/](./templates/) or [_shared/templates/](../_shared/templates/) |
| **Planning** (active plans) | [docs/planning/](./planning/) |
| **Reference** (quick lookup) | [docs/reference/](./reference/) |
| **Business** (client/portfolio) | [docs/business/](./business/) |
| **Historical** (old docs) | [docs/archive/](./archive/) or [AUDIT-REPORTS/](../AUDIT-REPORTS/) |

---

## Document Status Legend

| Icon | Status | Meaning |
|------|--------|---------|
| ⭐ | **Key Document** | Essential, start here |
| 🟢 | **Production Ready** | Complete, tested, ready to use |
| 🟡 | **In Development** | Active work, 30-50% complete |
| 🔵 | **Beta** | 60%+ complete, needs testing |
| ⚪ | **Planning** | Early stage, <50% complete |
| 📁 | **Archive** | Historical, superseded, reference only |

---

## Quick Navigation

### Most Common Paths

**New Student:**  
README.md → courses/INDEX.md → courses/🟢-production/[course]/ → modules/

**New Instructor:**  
CONTRIBUTING.md → docs/guides/course-creation/ → docs/templates/ → create course

**New Contributor:**  
CONTRIBUTING.md → HONEST-STATUS-REPORT.md → RESTRUCTURING-SUMMARY.md → start work

**Creating Content:**  
docs/guides/course-creation/ → docs/templates/ → write → docs/guides/course-creation/CHECKLIST.md

---

## Document Maintenance

### When to Update This Map
- New major documentation created
- Documentation moved to new location
- Repository structure changes
- New courses reach production status

### Related Documents
- [docs/README.md](./README.md) - Documentation hub
- [docs/reference/REPOSITORY-STRUCTURE.md](./reference/REPOSITORY-STRUCTURE.md) - Detailed repo structure
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution standards

---

## Help & Support

### Can't Find What You Need?

1. **Search the repo**: Use Ctrl+Shift+F in VS Code or `grep -r "search term" .`
2. **Check broken links**: Run `python check-links.py` to verify references
3. **Review recent changes**: See [RESTRUCTURING-SUMMARY.md](../RESTRUCTURING-SUMMARY.md) and [IMPROVEMENTS-SUMMARY.md](../IMPROVEMENTS-SUMMARY.md)
4. **Ask**: Open a GitHub issue or contact the documentation team

### Reporting Issues

- **Broken links**: Run `python check-links.py` and create an issue with output
- **Missing docs**: Check if it was archived in [docs/archive/](./archive/)
- **Outdated info**: Note the file and line, suggest correction

---

**Maintained By:** Documentation Team  
**Next Review:** February 2026

---

**Last Updated:** January 23, 2026
