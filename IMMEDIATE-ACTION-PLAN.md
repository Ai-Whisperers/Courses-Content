# Immediate Action Plan: Week 1

**Start Date:** [INSERT DATE]
**Focus:** Repository cleanup + FPUNA language standardization

---

## Day 1: Repository Hygiene

### Morning (2-3 hours)

**Git Cleanup:**
```bash
# 1. Stage and commit all untracked work
git add PROGRESS/
git add AUTONOMOUS-WORK-PLAN-DETAILED.md
git add AUTONOMOUS-WORK-PLAN-MONTH.md
git add MASTER-COMPLETION-PLAN.md
git add IMMEDIATE-ACTION-PLAN.md
git commit -m "docs: Add completion plans and progress tracking"

# 2. Check if bun.lock is needed
# If no JS project, remove it
rm bun.lock
git add -A && git commit -m "chore: Remove unused bun.lock"

# 3. Create/update .gitignore
```

**Create .gitignore:**
```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
.Python
*.egg-info/
.eggs/
dist/
build/

# Node (if used later)
node_modules/
npm-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Temp files
*.tmp
*.temp
~$*
```

### Afternoon (2-3 hours)

**Directory Audit:**
- [ ] Check for duplicate course locations
- [ ] Verify all README links work
- [ ] List all broken internal references

```bash
# Find potential duplicates
find courses -name "README.md" | xargs grep -l "Building-AI-Powered-Applications"

# Find broken links (manual check needed)
grep -r "\](\./" --include="*.md" | head -50
```

---

## Day 2: FPUNA Language Audit

### Full Language Inventory

**Run this audit:**

```bash
# List all FPUNA files
find courses/Summer-Courses-University/FPUNA-2026 -name "*.md" | sort

# Check for English file names in Spanish sections
ls courses/Summer-Courses-University/FPUNA-2026/04-MARKETING-COMUNICACION/
ls courses/Summer-Courses-University/FPUNA-2026/06-HOSPITALIDAD-TURISMO/
```

### Files to Rename (Spanish):

**04-MARKETING-COMUNICACION:**
| Current | New Name |
|---------|----------|
| 01-ai-content-creation.md | 01-creacion-contenido-ia.md |
| 02-data-driven-marketing.md | 02-marketing-basado-datos.md |
| 03-social-media-automation.md | 03-automatizacion-redes-sociales.md |
| 04-ai-design-tools.md | 04-herramientas-diseno-ia.md |
| 05-campaign-management.md | 05-gestion-campanas.md |

**06-HOSPITALIDAD-TURISMO:**
| Current | New Name |
|---------|----------|
| 01-ai-customer-service.md | 01-servicio-cliente-ia.md |
| 02-revenue-management.md | 02-gestion-ingresos.md |
| 03-digital-marketing-tourism.md | 03-marketing-digital-turismo.md |
| 04-operations-ai.md | 04-operaciones-ia.md |

**Rename Commands:**
```bash
cd courses/Summer-Courses-University/FPUNA-2026/04-MARKETING-COMUNICACION
git mv 01-ai-content-creation.md 01-creacion-contenido-ia.md
git mv 02-data-driven-marketing.md 02-marketing-basado-datos.md
git mv 03-social-media-automation.md 03-automatizacion-redes-sociales.md
git mv 04-ai-design-tools.md 04-herramientas-diseno-ia.md
git mv 05-campaign-management.md 05-gestion-campanas.md

cd ../06-HOSPITALIDAD-TURISMO
git mv 01-ai-customer-service.md 01-servicio-cliente-ia.md
git mv 02-revenue-management.md 02-gestion-ingresos.md
git mv 03-digital-marketing-tourism.md 03-marketing-digital-turismo.md
git mv 04-operations-ai.md 04-operaciones-ia.md

git commit -m "refactor(fpuna): Standardize file names to Spanish"
```

---

## Day 3-4: FPUNA Content Audit

### Audit Each Track

**Create audit spreadsheet or use this template:**

```markdown
## Track: [TRACK_NAME]

### Module 1: [NAME]
- **File:** [path]
- **Language:** [ ] Spanish / [ ] English / [ ] Mixed
- **Content completeness:** ____%
- **Has exercises:** [ ] Yes / [ ] No
- **Has solutions:** [ ] Yes / [ ] No
- **TODO/placeholders found:** [ ] Yes (count: ___) / [ ] No
- **Code examples work:** [ ] Yes / [ ] No / [ ] N/A
- **Priority issues:**
  1.
  2.
  3.
```

### Priority Order:
1. **00-FUNDAMENTOS-PRINCIPALES** - Most complete, verify and polish
2. **01-DESARROLLO-SOFTWARE** - Has known TODOs, fix them
3. **02-ELECTRONICA-AUTOMATIZACION** - Reported 80%, verify
4. **04-MARKETING-COMUNICACION** - Good progress, translate
5. **05-INVESTIGACION-ACADEMIA** - Good progress, verify
6. **03-INGENIERIA-AERONAUTICA** - Mid-progress
7. **06-HOSPITALIDAD-TURISMO** - Lowest, translate

---

## Day 5: Fix Known Issues

### TODO Placeholders to Fix

**From previous audit - these need immediate attention:**

1. `01-DESARROLLO-SOFTWARE/03-pruebas-tdd.md` (lines 1264-1280)
   - 5 unimplemented test methods
   - Action: Write actual test implementations

2. `01-DESARROLLO-SOFTWARE/05-diseno-sistemas.md` (line 1198)
   - Section marked TODO
   - Action: Complete systems design section

3. `01-DESARROLLO-SOFTWARE/especializaciones/web-development/03-autenticacion-autorizacion.md`
   - Multiple TODOs in auth examples
   - Action: Implement authentication code examples

### Verification Commands:
```bash
# Find all TODO/FIXME in FPUNA
grep -rn "TODO\|FIXME\|XXX\|PLACEHOLDER" courses/Summer-Courses-University/FPUNA-2026 --include="*.md"

# Count by file
grep -rc "TODO\|FIXME" courses/Summer-Courses-University/FPUNA-2026 --include="*.md" | grep -v ":0$"
```

---

## Day 6-7: Documentation Update

### Update These Files:

1. **README.md** (root)
   - [ ] Verify all course statuses accurate
   - [ ] Update "Last Updated" date
   - [ ] Fix any broken links found

2. **HONEST-STATUS-REPORT.md**
   - [ ] Update with this week's progress
   - [ ] Revise percentages based on audit

3. **CONTRIBUTING.md**
   - [ ] Add link to new checklist templates
   - [ ] Clarify "production-ready" definition

### Create Weekly Progress Report:
```markdown
# Week 1 Progress Report

**Date Range:** [START] - [END]

## Completed
- [ ] Git cleanup and .gitignore
- [ ] Directory audit
- [ ] FPUNA file renaming (10 files)
- [ ] FPUNA content audit
- [ ] Fixed X TODO placeholders

## In Progress
- [ ] Track 01 content completion
- [ ] Track 04 translations

## Blockers
- (list any blockers)

## Next Week Focus
- (priorities for week 2)

## Metrics
- Files renamed: X
- TODOs fixed: X
- Modules audited: X/Y
- Estimated completion: X%
```

---

## Quick Reference: Key File Locations

| What | Where |
|------|-------|
| Master plan | `/MASTER-COMPLETION-PLAN.md` |
| This action plan | `/IMMEDIATE-ACTION-PLAN.md` |
| Module checklist | `/docs/templates/MODULE-CHECKLIST-TEMPLATE.md` |
| Course checklist | `/docs/templates/COURSE-CHECKLIST-TEMPLATE.md` |
| FPUNA course | `/courses/Summer-Courses-University/FPUNA-2026/` |
| Honest status | `/HONEST-STATUS-REPORT.md` |

---

## Daily Standup Template

```markdown
## Daily Progress - [DATE]

### Yesterday
-

### Today
-

### Blockers
-

### Notes
-
```

---

## End of Week 1 Checklist

- [ ] All untracked files committed
- [ ] .gitignore created and working
- [ ] FPUNA files renamed to Spanish (10 files)
- [ ] Content audit completed for all 7 FPUNA tracks
- [ ] Known TODO placeholders fixed (at least 5)
- [ ] README.md updated
- [ ] Week 1 progress report written
- [ ] Week 2 priorities defined

---

*Created: January 16, 2026*
