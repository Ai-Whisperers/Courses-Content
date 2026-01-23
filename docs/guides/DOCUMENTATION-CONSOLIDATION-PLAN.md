# Documentation Consolidation Plan

Audit and consolidate scattered documentation across the repository.

---

## Current State Analysis

### Documentation Locations

```
Repository Structure:
├── README.md (main entry point)
├── HONEST-STATUS-REPORT.md
├── RESTRUCTURING-SUMMARY.md
├── COURSE-COMPLETION-ANALYSIS.md
├── MASTER-COMPLETION-PLAN.md
├── AUTONOMOUS-WORK-PLAN-*.md
├── CONTRIBUTING.md
├── COURSE-STRUCTURE-TEMPLATE.md
├── QUALITY-IMPROVEMENT-SUMMARY.md
├── PLACEHOLDER-CONTENT-REPORT.md
├── FPUNA-LANGUAGE-AUDIT.md
├── INSTRUCTOR-GUIDES-CONSOLIDATION.md
├── IMMEDIATE-ACTION-PLAN.md
├── courses/INDEX.md
├── AUDIT-REPORTS/ (21 files)
├── PROGRESS/ (tracking docs)
├── docs/
│   ├── guides/
│   ├── planning/
│   ├── business/
│   ├── templates/
│   ├── reference/
│   └── archive/
└── _shared/
    ├── configs/
    └── templates/
```

**Problem:** 40+ documentation files at various levels, some overlapping or outdated.

---

## Issues Identified

### 1. Redundancy
- Multiple planning docs with overlapping content
- Audit reports vs status reports
- Multiple "getting started" guides in different locations

### 2. Outdated Information
- Pre-restructuring paths still referenced
- Completion percentages no longer accurate
- Old architecture diagrams

### 3. Poor Discoverability
- Important docs buried in subdirectories
- No clear documentation hierarchy
- Missing central index

### 4. Inconsistent Format
- Some docs are detailed, others are stubs
- Different markdown styles
- Inconsistent headings and structure

---

## Consolidation Strategy

### Phase 1: Audit (Week 1)

#### 1.1 Categorize All Docs

| Category | Current Count | Action |
|----------|---------------|--------|
| **Core Docs** (README, CONTRIBUTING) | 2 | Keep at root, update |
| **Status Reports** (current state) | 5 | Consolidate to 2 |
| **Planning Docs** (future work) | 8 | Archive old, keep 1-2 active |
| **Guides** (how-to) | 12 | Move to docs/guides/, consolidate |
| **Templates** | 6 | Move to _shared/templates/ |
| **Archive** (historical) | 15+ | Move to docs/archive/ |

#### 1.2 Map Dependencies

Create `docs/DOC-MAP.md`:
```markdown
# Documentation Map

## For Students
1. Start: README.md
2. Pick course: courses/INDEX.md
3. Setup: courses/[course]/GETTING-STARTED.md
4. Learn: courses/[course]/modules/

## For Instructors
1. Start: README.md
2. Guidelines: CONTRIBUTING.md
3. Templates: _shared/templates/
4. Reference: docs/guides/

## For Contributors
1. Start: CONTRIBUTING.md
2. Structure: RESTRUCTURING-SUMMARY.md
3. Quality: _shared/configs/CLAUDE-base.md
4. Status: HONEST-STATUS-REPORT.md
```

### Phase 2: Consolidate (Week 2)

#### 2.1 Root Level (Keep Only Essentials)

**Keep:**
- `README.md` - Main entry point
- `CONTRIBUTING.md` - Contribution guidelines
- `LICENSE` - Legal
- `HONEST-STATUS-REPORT.md` - Current accurate status
- `RESTRUCTURING-SUMMARY.md` - Recent major changes

**Move to docs/archive/:**
- `AUTONOMOUS-WORK-PLAN-*.md` → `docs/archive/planning/`
- `COURSE-COMPLETION-ANALYSIS.md` → `docs/archive/analysis/`
- `MASTER-COMPLETION-PLAN.md` → `docs/archive/planning/`
- `QUALITY-IMPROVEMENT-SUMMARY.md` → `docs/archive/quality/`
- `FPUNA-LANGUAGE-AUDIT.md` → `docs/archive/audits/`
- `PLACEHOLDER-CONTENT-REPORT.md` → `docs/archive/reports/`
- `INSTRUCTOR-GUIDES-CONSOLIDATION.md` → `docs/archive/consolidation/`
- `IMMEDIATE-ACTION-PLAN.md` → `docs/archive/planning/`

**Consolidate:**
- Merge overlapping planning docs into single `docs/planning/ACTIVE-PLAN.md`
- Create `docs/STATUS.md` that links to HONEST-STATUS-REPORT.md and other status docs

#### 2.2 docs/ Organization

**Proposed Structure:**

```
docs/
├── README.md                          # Docs navigation hub
├── STATUS.md                          # Current status + links to reports
├── guides/                            # How-to guides
│   ├── README.md
│   ├── getting-started/
│   ├── course-creation/
│   ├── assessment/
│   ├── GITHUB-PAGES-SETUP.md         # New
│   ├── METRICS-DASHBOARD-PLAN.md     # New
│   └── DOCUMENTATION-CONSOLIDATION-PLAN.md  # This file
│
├── planning/                          # Active planning
│   ├── README.md
│   ├── ACTIVE-PLAN.md                # Consolidated from multiple
│   ├── FPUNA-COURSE-STRATEGY.md
│   └── ROADMAP.md
│
├── templates/                         # Doc templates
│   ├── course-template/
│   ├── module-template/
│   └── assessment-template/
│
├── business/                          # Business docs
│   ├── portfolio/
│   └── clients/
│
├── reference/                         # Reference material
│   ├── REPOSITORY-STRUCTURE.md
│   └── CONVENTIONS.md
│
└── archive/                           # Historical docs
    ├── planning/                      # Old plans
    ├── audits/                        # Old audits
    ├── reports/                       # Old reports
    ├── analysis/                      # Old analysis
    └── consolidation/                 # Pre-consolidation docs
```

#### 2.3 Update Links

After moving files:
1. Run `python check-links.py` to find broken links
2. Update all references
3. Add redirects/notes in old locations if necessary

### Phase 3: Standardize (Week 3)

#### 3.1 Doc Template

All docs should follow this structure:

```markdown
# [Document Title]

**Purpose:** [One-line description]  
**Audience:** [Who should read this]  
**Status:** [Active / Archived / Planning]  
**Last Updated:** [Date]

---

## Table of Contents

- [Section 1](#section-1)
- [Section 2](#section-2)

---

## [Content sections...]

---

## Related Documents

- [Related Doc 1](link)
- [Related Doc 2](link)

---

**Maintained By:** [Team/Person]  
**Next Review:** [Date]
```

#### 3.2 Standardize Headings

- Use `#` for title
- Use `##` for main sections
- Use `###` for subsections
- Use `---` for dividers
- Use `**Bold**` for emphasis, not `*italic*`

#### 3.3 Add Metadata

At top of each doc:

```yaml
---
title: Document Title
category: guides|planning|reference|archive
audience: students|instructors|contributors|all
status: active|archived|draft
last_updated: 2026-01-23
---
```

### Phase 4: Maintain (Ongoing)

#### 4.1 Documentation Review Schedule

**Monthly:**
- Review root-level docs for accuracy
- Update STATUS.md
- Archive completed plans

**Quarterly:**
- Full documentation audit
- Update guides based on feedback
- Consolidate new scattered docs

**Annually:**
- Major documentation overhaul if needed
- Archive outdated materials
- Refresh all templates

#### 4.2 New Doc Policy

Before creating a new doc:
1. Check if existing doc can be updated instead
2. Use appropriate template
3. Place in correct category folder
4. Add to relevant README/index
5. Add metadata header

---

## Implementation Checklist

### Week 1: Audit
- [ ] List all documentation files
- [ ] Categorize each file
- [ ] Identify redundancies
- [ ] Map dependencies
- [ ] Create DOC-MAP.md

### Week 2: Consolidate
- [ ] Create new folder structure
- [ ] Move files to appropriate locations
- [ ] Merge redundant docs
- [ ] Update all internal links
- [ ] Run link checker
- [ ] Add README to each docs subfolder

### Week 3: Standardize
- [ ] Apply template to all active docs
- [ ] Standardize headings
- [ ] Add metadata
- [ ] Update docs/README.md
- [ ] Create maintenance schedule

### Week 4: Verify
- [ ] Test all links
- [ ] Get team review
- [ ] Update CONTRIBUTING.md with new doc structure
- [ ] Announce changes
- [ ] Archive old structure

---

## Quick Wins (Do First)

1. **Create docs/README.md as navigation hub** (30 min)
2. **Move obviously outdated docs to archive/** (1 hour)
3. **Update root README with docs/ link** (15 min)
4. **Run link checker and fix broken links** (1 hour)
5. **Consolidate 3+ planning docs into 1** (2 hours)

**Total:** ~5 hours for 80% improvement

---

## Success Metrics

**Before:**
- 40+ docs scattered across repo
- 15+ outdated/redundant files
- No clear doc hierarchy
- Broken links

**After:**
- <15 docs at root level
- Clear docs/ organization
- All docs have metadata
- Zero broken links
- Docs findable in <2 clicks

---

## Maintenance Guidelines

### When to Archive
- Doc hasn't been updated in 6+ months
- Content is outdated/superseded
- Historical reference only

### When to Consolidate
- 2+ docs cover same topic
- Content is redundant
- Different versions exist

### When to Update
- Links break
- Information becomes outdated
- User feedback indicates confusion
- Repository structure changes

---

## Tools

### Link Checking
- `python check-links.py` (created in this project)
- GitHub's built-in link checker

### Markdown Linting
- markdownlint (VS Code extension)
- remark-lint (CLI tool)

### Documentation Search
- ripgrep: `rg "search term" docs/`
- VS Code search: Ctrl+Shift+F

---

## Resources

- [Divio Documentation System](https://documentation.divio.com/)
- [Write the Docs](https://www.writethedocs.org/)
- [Google Developer Documentation Style Guide](https://developers.google.com/style)

---

**Status:** Planning  
**Next Steps:** Execute Week 1 audit, create DOC-MAP.md  
**Owner:** Documentation Team  
**Review Date:** February 2026

---

**Last Updated:** January 23, 2026
