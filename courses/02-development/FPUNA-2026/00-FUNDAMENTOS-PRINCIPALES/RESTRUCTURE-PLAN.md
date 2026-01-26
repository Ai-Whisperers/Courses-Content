# RESTRUCTURE PLAN: Fundamentos Principales

## Current State Analysis

### File Inventory (22 files, ~9,300 lines total)

| File | Lines | Target | Reduction |
|------|-------|--------|-----------|
| README.md | 303 | 150 | 50% |
| 01-configuracion-stack-ia.md | 981 | 400 | 59% |
| 02-maestria-configuracion.md | 1532 | 600 | 61% |
| 03-ingenieria-prompts.md | ~1600 | 600 | 62% |
| 04-ingenieria-contexto.md | 1299 | 500 | 62% |
| 05-proyecto-en-vivo.md | 1231 | 400 | 68% |
| 06-patrones-flujo-trabajo.md | 681 | 350 | 49% |
| **starter-kit/** (15 files) | ~2,700 | MERGE | - |
| **TOTAL** | ~9,300 | ~3,500 | **~62%** |

### Identified Problems

1. **Broken COMPARTIDO Links** - All 8+ links to `../COMPARTIDO/` point to non-existent resources
2. **starter-kit Duplication** - Overlaps with modules (different audience: generic AI vs OpenCode-specific)
3. **Excessive Mermaid Diagrams** - 15-30 per module with verbose styling (~200-400 lines each)
4. **Redundant Quiz Format** - Identical ~150-line quiz structure in every module
5. **Verbose Analogies** - Multiple analogies per concept (cafeteria, cooking, hiring)
6. **Repeated Boilerplate** - Prerequisites, support, congratulations in every file

---

## Restructure Strategy

### Phase 1: Fix Broken Links (Priority: HIGH)

**Action**: Remove or update all `../COMPARTIDO/` references since that folder doesn't exist.

**In README.md** (lines 166-175):
- Remove "Recursos Compartidos" section OR
- Replace with inline content/actual file references

### Phase 2: Starter-Kit Decision (Priority: HIGH)

**Recommendation**: MERGE valuable content, DELETE the folder.

| File | Decision | Merge Into |
|------|----------|------------|
| COMMON-MISTAKES.md (340 lines) | **MERGE** | Module 03 (prompts) - condensed to ~80 lines |
| 20-IDEAS.md (611 lines) | **MERGE** | Module 03 (prompts) - condensed to ~100 lines |
| VERIFICATION-CHECKLIST.md | **MERGE** | Module 03 (prompts) - ~30 lines |
| 00-PREREQUISITES.md | **DELETE** | Already in README.md |
| 01-FUNDAMENTALS.md | **DELETE** | Duplicates Module 01-03 content |
| 02-AI-LIMITATIONS.md | **MERGE** | Module 03 - ~40 lines |
| CLAUDE.md | **MOVE** | To _templates/CLAUDE-template.md |
| SETUP-AI.md | **DELETE** | Duplicates Module 01 |
| AI-INTEGRATION.md | **DELETE** | Generic, not OpenCode-specific |
| exercises/ | **EVALUATE** | Keep if unique, else delete |
| examples/ | **EVALUATE** | Keep if unique, else delete |

### Phase 3: Create Shared Components (Priority: MEDIUM)

Create `_components/` folder:
```
_components/
├── _quiz-template.md          # Quiz format reference (~20 lines)
├── _support-section.md        # Common support info (~15 lines)  
└── _prerequisites-checklist.md # Hardware/software requirements (~25 lines)
```

### Phase 4: Condense Each Module (Priority: HIGH)

#### Condensing Rules:

1. **Mermaid Diagrams**
   - Keep max 3-4 simple diagrams per module
   - Remove ALL styling (colors, stroke-width, etc.)
   - If diagram just restates text, DELETE it

2. **Quizzes**
   - Reduce to 3 questions (not 5)
   - Simple format: question + 4 options + answer key
   - No elaborate formatting or sections

3. **Analogies**
   - Keep ONE analogy per major concept (the best one)
   - Delete redundant analogies

4. **Boilerplate**
   - Remove "Congratulations" sections
   - Remove repeated prerequisites (reference README)
   - Remove repeated support sections (reference README)

5. **Content**
   - Keep instructional core
   - Remove excessive hand-holding for beginners
   - Trust that students can follow instructions

---

## New File Structure

```
00-FUNDAMENTOS-PRINCIPALES/
├── README.md                    # Syllabus + prerequisites + support (150 lines)
├── 01-configuracion-stack-ia.md # Installation guide (400 lines)
├── 02-maestria-configuracion.md # MCPs, Skills, Hooks, Rules (600 lines)
├── 03-ingenieria-prompts.md     # Prompts + common mistakes + ideas (600 lines)
├── 04-ingenieria-contexto.md    # CLAUDE.md, .opencode files (500 lines)
├── 05-proyecto-en-vivo.md       # Live demo guide (400 lines)
├── 06-patrones-flujo-trabajo.md # Workflow patterns (350 lines)
├── _components/
│   ├── _quiz-template.md
│   └── _prerequisites.md
└── _templates/
    └── CLAUDE-template.md       # From starter-kit
```

**DELETED**:
- `starter-kit/` folder (content merged or removed)
- All broken COMPARTIDO references

---

## Module-by-Module Condensation Plan

### Module 01: Instalacion Stack IA (981 -> 400 lines)

**Remove**:
- [ ] Mermaid diagrams with heavy styling (lines 37-107) - simplify or remove
- [ ] Redundant analogies ("como un asistente", "como un auto")
- [ ] Verbose step-by-step that could be bullet points
- [ ] Quiz section (move to end, condense)

**Keep**:
- [ ] Core installation steps (Windows/Mac/Linux)
- [ ] Verification commands
- [ ] Troubleshooting section (condensed)

### Module 02: Maestria Configuracion (1532 -> 600 lines)

**Remove**:
- [ ] Excessive diagrams showing the same hierarchy
- [ ] Repeated config file examples
- [ ] "Understanding" sections that over-explain

**Keep**:
- [ ] Skills: what, why, how to install (one example each)
- [ ] MCPs: what, why, how to configure (one example each)
- [ ] Hooks: what, one practical example
- [ ] Rules: what, one practical example

### Module 03: Ingenieria Prompts (1600 -> 600 lines)

**Merge IN** (from starter-kit):
- COMMON-MISTAKES.md essentials (~80 lines)
- 20-IDEAS.md best ideas (~100 lines)
- AI-LIMITATIONS.md key points (~40 lines)

**Remove**:
- [ ] Excessive prompt examples (keep 3-5 best)
- [ ] Diagrams showing prompt structure (text is clearer)
- [ ] Redundant "bad vs good" comparisons

**Keep**:
- [ ] CERO framework (core teaching)
- [ ] 3-5 excellent prompt examples
- [ ] Top 5 common mistakes
- [ ] Top 10 project ideas

### Module 04: Ingenieria Contexto (1299 -> 500 lines)

**Remove**:
- [ ] Over-explained file structure diagrams
- [ ] Multiple CLAUDE.md examples (keep ONE comprehensive)
- [ ] Redundant sections on why context matters

**Keep**:
- [ ] .opencode file structure
- [ ] CLAUDE.md template and explanation
- [ ] Rules for auto-context

### Module 05: Proyecto en Vivo (1231 -> 400 lines)

**Remove**:
- [ ] Detailed transcript of demo (summarize)
- [ ] Screenshots that could be described briefly
- [ ] Q&A section (move to FAQ in README)

**Keep**:
- [ ] Demo outline (what instructor shows)
- [ ] Key learning points
- [ ] Checklist of what students should observe

### Module 06: Patrones Flujo Trabajo (681 -> 350 lines)

**Remove**:
- [ ] Excessive pattern diagrams
- [ ] Redundant explanations

**Keep**:
- [ ] Pattern catalog (condensed)
- [ ] Best practices summary
- [ ] When to use each pattern

---

## Execution Order

1. **Create `_components/` and `_templates/` folders**
2. **Update README.md** - remove broken links, consolidate info
3. **Condense Module 01** - use as template for others
4. **Condense Modules 02-06** - following Module 01 pattern
5. **Merge starter-kit content** into Module 03
6. **Delete starter-kit folder**
7. **Final verification** - all links work, content flows

---

## Success Criteria

- [ ] Total line count < 4,000 (currently ~9,300)
- [ ] No broken links
- [ ] No duplicate content
- [ ] Each module self-contained
- [ ] Core instructional value preserved
- [ ] Mermaid diagrams reduced by 70%+

---

## Notes

- **Language**: Keep all content in Spanish
- **Tone**: Professional but approachable (current tone is too hand-holding)
- **Audience**: University students who can follow instructions

---

*Created: January 26, 2026*
*Status: Ready for execution*
