# Documentation Style Guide

**Purpose:** Standards for all documentation in the AI Whisperers Courses Content repository  
**Audience:** All contributors, course creators, maintainers  
**Status:** Active  
**Last Updated:** January 24, 2026

---

## Table of Contents

1. [File Naming Conventions](#file-naming-conventions)
2. [Document Structure](#document-structure)
3. [Metadata Standards](#metadata-standards)
4. [Markdown Conventions](#markdown-conventions)
5. [Link Formats](#link-formats)
6. [Code and Examples](#code-and-examples)
7. [Tables](#tables)
8. [Status Indicators](#status-indicators)
9. [README Standards](#readme-standards)
10. [Version History](#version-history)

---

## File Naming Conventions

### Directory Names

**Format:** `lowercase-with-hyphens` or `PascalCase` for courses

```
✅ Good Examples:
- docs/guides/course-creation/
- courses/🟢-production/
- _shared/configs/

❌ Bad Examples:
- docs/Guides_Creation/
- courses/production_ready/
- shared configs/
```

### File Names

**Standard Files (UPPERCASE):**
```
✅ Always UPPERCASE:
- README.md
- CONTRIBUTING.md
- LICENSE.md
- SYLLABUS.md
- EXERCISE.md
- QUIZ.md
```

**Documentation Files (CAPS-WITH-HYPHENS):**
```
✅ Good Examples:
- DOCUMENTATION-STYLE-GUIDE.md
- QUALITY-CONTROL.md
- FPUNA-COURSE-STRATEGY.md

❌ Bad Examples:
- documentation_style_guide.md
- qualityControl.md
- fpuna course strategy.md
```

**Module Files (lowercase with numbers):**
```
✅ Good Examples:
- 01-introduction/
- 02-setup-configuration/
- 03-advanced-patterns/

❌ Bad Examples:
- Module-01-Introduction/
- module_02_setup/
- 3-advanced-patterns/
```

---

## Document Structure

### Standard Document Template

Every major documentation file should follow this structure:

```markdown
# Document Title

**Purpose:** Clear one-line description of what this document does  
**Audience:** Who should read this (e.g., Course creators, Instructors, All contributors)  
**Status:** Active | Draft | Archived  
**Last Updated:** YYYY-MM-DD

---

## Table of Contents

[Optional, use for documents >200 lines]

---

## Main Content

[Sections organized with clear headings]

---

## Related Documents

[Links to related guides, templates, references]

---

**Last Updated:** YYYY-MM-DD  
**Maintained By:** [Team/Person]  
**Next Review:** YYYY-MM-DD
```

### Section Hierarchy

```markdown
# H1 - Document Title (ONE per document)

## H2 - Major Sections

### H3 - Subsections

#### H4 - Sub-subsections (use sparingly)
```

**Rules:**
- Only ONE H1 per document (the title)
- Use H2 for major sections
- Use H3 for subsections
- Avoid H4+ unless absolutely necessary

---

## Metadata Standards

### Document Header (Required for all major docs)

```markdown
**Purpose:** One-line description  
**Audience:** Target readers  
**Status:** Active | Draft | Archived  
**Last Updated:** YYYY-MM-DD
```

**When to include:**
- All guides (docs/guides/)
- All business docs (docs/business/)
- All planning docs (docs/planning/)
- All templates (docs/templates/)
- Course READMEs
- Major navigation READMEs

**When to skip:**
- Simple reference tables
- Quick checklists
- Archive documents (already deprecated)

### Document Footer (Optional but recommended)

```markdown
---

**Last Updated:** YYYY-MM-DD  
**Maintained By:** Team Name  
**Next Review:** YYYY-MM-DD
```

---

## Markdown Conventions

### Emphasis

```markdown
**Bold** - Important terms, UI elements, file names
*Italic* - Emphasis, book titles, first use of terms
`Code` - File paths, commands, code snippets
```

### Lists

**Unordered lists** - Use `-` (hyphen):
```markdown
- First item
- Second item
  - Nested item (2 spaces indent)
```

**Ordered lists** - Use numbers:
```markdown
1. First step
2. Second step
3. Third step
```

**Checkbox lists** - For tasks:
```markdown
- [ ] Incomplete task
- [x] Completed task
```

### Block Quotes

```markdown
> Use for important notes, callouts, or quoted text
```

### Horizontal Rules

Use `---` (three hyphens) to separate major sections:
```markdown
---
```

---

## Link Formats

### Internal Links (Within Repository)

**Relative links preferred:**
```markdown
✅ Good:
[Course Creation Guide](./course-creation/)
[Templates](../templates/)
[README](../../README.md)

❌ Bad (absolute):
[Guide](/docs/guides/course-creation/)
```

**Why:** Relative links work in both GitHub and local environments.

### External Links

```markdown
[Link Text](https://example.com) - Description of what the link contains
```

**Best practices:**
- Include brief description after link
- Verify links work before committing
- Use link checker tool: `python check-links.py`

### Anchor Links (Same Document)

```markdown
[Jump to Section](#section-name)

## Section Name
```

**Rules:**
- Lowercase section title
- Replace spaces with hyphens
- Remove special characters

---

## Code and Examples

### Inline Code

Use backticks for:
- File names: `README.md`
- Commands: `npm install`
- Variable names: `courseId`
- Short code: `const x = 5`

```markdown
Run `python check-links.py` to verify all links.
```

### Code Blocks

**With language specification (preferred):**

````markdown
```python
def example():
    return "Hello World"
```
````

**Without language:**

````markdown
```
Generic code block
```
````

**Supported languages:**
- `python`
- `javascript` / `typescript`
- `bash` / `sh`
- `markdown`
- `json` / `yaml`
- `html` / `css`

### Example Blocks

```markdown
**Good Example:**
```python
# This shows best practice
result = process_data(clean=True)
```

**Bad Example:**
```python
# This shows anti-pattern
result = process_data()
```
```

Use ✅ and ❌ emojis for clear visual distinction:

```markdown
✅ Good: Use descriptive variable names
❌ Bad: Use single letters like `x`, `y`, `z`
```

---

## Tables

### Basic Table Format

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Alignment

```markdown
| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|--------------:|
| Text         | Text           | Numbers       |
| More text    | More text      | 123           |
```

### Complex Tables

For tables with long content, use consistent spacing:

```markdown
| Name                          | Description                                | Status      |
|-------------------------------|-------------------------------------------|-------------|
| Documentation Style Guide     | Standards for all repository docs         | Active      |
| Quality Control               | Content quality checklist                 | Active      |
```

**Best practices:**
- Keep tables simple (max 5 columns)
- Use consistent column widths
- For complex data, consider multiple smaller tables
- Add table caption above if needed

---

## Status Indicators

### Course Status Icons

Use these consistently across all documentation:

```markdown
🟢 Production Ready - Fully tested, ready for students
🟡 In Development - Active work, 30-50% complete
🔵 Beta - 60%+ complete, needs testing
⚪ Planning - Early stage, <50% complete
```

### Document Status Tags

```markdown
**Status:** Active | Draft | Archived
```

- **Active** - Current, maintained document
- **Draft** - Work in progress, not final
- **Archived** - Historical, superseded by newer doc

### Task Status (in Checklists)

```markdown
✅ Complete
🟡 In Progress
⏳ Pending
❌ Blocked
🔄 Under Review
```

---

## README Standards

### Every Directory Must Have README.md

**Minimum content:**
```markdown
# Directory Name

**Purpose:** What this directory contains

## Contents

[List of files or subdirectories with brief descriptions]

## Usage

[How to use files in this directory]

---

**Last Updated:** YYYY-MM-DD
```

### Major Navigation READMEs

For important directories (docs/, docs/guides/, docs/templates/, etc.), use comprehensive format:

```markdown
# Directory Name

**Purpose:** Clear description  
**Audience:** Target users

---

## Available [Resources/Guides/Templates]

[Organized tables with descriptions]

---

## Quick Start

[Common tasks and how to begin]

---

## Statistics

| Metric | Value |
|--------|-------|
| Total Files | X |
| Last Updated | YYYY-MM-DD |

---

## Related Resources

[Links to related documentation]

---

**Last Updated:** YYYY-MM-DD  
**Maintained By:** Team  
**Next Review:** YYYY-MM-DD
```

**Examples:**
- [docs/guides/README.md](./README.md)
- [docs/business/README.md](../business/README.md)
- [docs/templates/README.md](../templates/README.md)

---

## Version History

### In Documents

Add version history at bottom of major documents:

```markdown
## Version History

| Version | Date | Changes |
|---------|------|---------|
| 3.0 | 2026-01-24 | Major reorganization |
| 2.1 | 2026-01-15 | Added metadata standards |
| 2.0 | 2025-12-01 | Complete rewrite |
| 1.0 | 2025-11-01 | Initial version |
```

### In README.md

Use "Last Updated" section:

```markdown
## Updates & Maintenance

**Last Updated:** January 24, 2026  
**Version:** 3.0  
**Next Review:** February 2026

**Recent Changes (January 24, 2026):**
- Added comprehensive navigation READMEs
- Standardized metadata across all docs
- Fixed remaining broken links
```

---

## Writing Style

### Tone

- **Professional** but **approachable**
- **Clear** and **concise**
- **Action-oriented** (use imperatives)
- **Consistent** terminology

### Voice

**Use active voice:**
```markdown
✅ Good: "Create a new course by following these steps"
❌ Bad: "A new course should be created by following these steps"
```

**Use present tense:**
```markdown
✅ Good: "This guide explains how to..."
❌ Bad: "This guide will explain how to..."
```

### Consistency

**Pick one term and stick with it:**
```markdown
✅ Consistent:
- Use "course" throughout (not "course" and "training")
- Use "module" (not "module" and "lesson")
- Use "exercise" (not "exercise" and "activity")
```

---

## Special Formatting

### Callout Boxes (using block quotes)

```markdown
> **Note:** This is important information.

> **Warning:** This could cause issues if not followed.

> **Tip:** This is a helpful suggestion.
```

Renders as:

> **Note:** This is important information.

> **Warning:** This could cause issues if not followed.

> **Tip:** This is a helpful suggestion.

### Diagrams (using ASCII or code blocks)

```markdown
```
Repository Root
├── courses/
│   ├── 🟢-production/
│   ├── 🟡-development/
│   └── 🔵-beta/
├── docs/
│   ├── guides/
│   ├── templates/
│   └── business/
└── README.md
```
```

---

## File Organization

### Directory Structure Standards

```
docs/
├── guides/                    # How-to guides
├── templates/                 # Reusable templates
├── business/                  # Business docs
├── reference/                 # Quick references
├── planning/                  # Planning docs
└── archive/                   # Historical docs
```

**Rules:**
- Each top-level directory must have README.md
- Group related files in subdirectories
- Keep flat structure when possible (max 3 levels deep)

### File Placement Guidelines

| Content Type | Location |
|--------------|----------|
| How-to guides | `docs/guides/` |
| Templates | `docs/templates/` |
| Business analysis | `docs/business/` |
| Quick references | `docs/reference/` |
| Planning docs | `docs/planning/` |
| Course content | `courses/[status]/[course-name]/` |
| Historical docs | `docs/archive/` |

---

## Quality Checklist

Before committing documentation, verify:

### Content
- [ ] Clear purpose stated at top
- [ ] Target audience identified
- [ ] All sections complete
- [ ] Examples provided where needed
- [ ] Related documents linked

### Formatting
- [ ] File naming follows conventions
- [ ] Metadata included (if required)
- [ ] Headings properly hierarchical
- [ ] Code blocks have language specified
- [ ] Tables formatted consistently

### Links
- [ ] All internal links work
- [ ] All external links verified
- [ ] Relative links used (not absolute)
- [ ] Anchor links tested

### Style
- [ ] Active voice used
- [ ] Present tense used
- [ ] Terminology consistent
- [ ] No typos or grammar errors

### Maintenance
- [ ] "Last Updated" date current
- [ ] Version history updated (if applicable)
- [ ] Next review date set

---

## Tools

### Validation Tools

**Link Checker:**
```bash
python check-links.py
```

**Documentation Auditor:**
```bash
python audit-docs.py
```

**LSP Diagnostics:**
Use VS Code markdown extensions for real-time validation.

### Recommended Extensions

- **Markdown All in One** - Formatting and preview
- **markdownlint** - Linting and standards
- **Markdown Preview Enhanced** - Advanced preview

---

## Common Mistakes

### Mistake 1: Inconsistent File Naming

```markdown
❌ Bad:
- docs/guides/course_creation/
- docs/Guides/course-creation/
- docs/guides/CourseCreation/

✅ Good:
- docs/guides/course-creation/
```

### Mistake 2: Broken Relative Links

```markdown
❌ Bad:
[Guide](/docs/guides/course-creation/)  (absolute)

✅ Good:
[Guide](./course-creation/)  (relative)
```

### Mistake 3: Missing Metadata

```markdown
❌ Bad:
# Documentation Guide

This guide explains...

✅ Good:
# Documentation Guide

**Purpose:** Standards for all documentation  
**Audience:** All contributors  
**Last Updated:** 2026-01-24

This guide explains...
```

### Mistake 4: Inconsistent Status Indicators

```markdown
❌ Bad:
- Status: In Progress
- Status: WIP
- Status: Working on it

✅ Good:
- 🟡 In Development
- 🟡 In Development
- 🟡 In Development
```

---

## Examples

### Example 1: Guide Document

See [QUALITY-CONTROL.md](./QUALITY-CONTROL.md) for a well-structured guide.

### Example 2: Navigation README

See [docs/guides/README.md](./README.md) for comprehensive navigation.

### Example 3: Business Documentation

See [docs/business/README.md](../business/README.md) for business doc structure.

---

## Maintenance

### Review Schedule

**Monthly:**
- Check for broken links
- Verify dates are current
- Update statistics

**Quarterly:**
- Full style audit
- Update examples
- Refresh screenshots

**Annually:**
- Major style guide review
- Update based on feedback
- Add new conventions as needed

### Updating This Guide

When updating this guide:
1. Discuss changes with documentation team
2. Update relevant examples
3. Announce changes in CHANGELOG
4. Update "Last Updated" date
5. Train contributors on new standards

---

## Related Resources

### In This Repository

- [Quality Control Guide](./QUALITY-CONTROL.md) - Content quality standards
- [Documentation Consolidation Plan](./DOCUMENTATION-CONSOLIDATION-PLAN.md) - Organization project
- [DOC-MAP](../DOC-MAP.md) - Role-based navigation

### External Resources

- [Markdown Guide](https://www.markdownguide.org/) - Markdown syntax
- [Google Developer Documentation Style Guide](https://developers.google.com/style) - Writing standards
- [GitHub Docs Contributing Guide](https://github.com/github/docs/blob/main/CONTRIBUTING.md) - Best practices

---

## Questions?

**Found an inconsistency in existing docs?**
- Note it but don't fix everything at once
- Prioritize user-facing documentation
- Update gradually during normal edits

**Need clarification on a standard?**
- Check examples in this guide
- Review recently updated docs as reference
- Ask the documentation team

**Want to propose a new standard?**
- Open an issue with rationale
- Provide examples
- Get team consensus before implementing

---

**Last Updated:** January 24, 2026  
**Maintained By:** Documentation Team  
**Next Review:** February 2026  
**Version:** 1.0
