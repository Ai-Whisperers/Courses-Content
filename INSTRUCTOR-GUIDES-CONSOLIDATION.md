# Instructor Guides Consolidation Report

**Date**: January 16, 2026  
**Scope**: FPUNA-2026 instructor documentation  
**Purpose**: Eliminate duplication and establish single sources of truth

---

## Executive Summary

Found **3 instructor guide files** with overlapping content. Analysis shows these serve different purposes but cause confusion.

**Key Findings**:
- 2,716 total lines across 3 files
- ~40% content overlap/duplication
- Mixed languages (Spanish in root, English in docs/)
- No clear indication of which to use

**Recommendation**: **Keep 2, archive 1** with clear purpose differentiation.

---

## Current State

### File 1: `./INSTRUCTOR-GUIDE.md`

**Location**: Root of FPUNA-2026  
**Lines**: 1,067  
**Language**: Spanish  
**Purpose**: Practical teaching guide for day-to-day instruction

**Content Overview**:
- Teaching philosophy
- Module-by-module guide
- Common student challenges
- Classroom management
- Troubleshooting tips
- Evaluation guidelines

**Strengths**:
- ✅ Comprehensive and practical
- ✅ In Spanish (matches course language)
- ✅ Well-organized
- ✅ Easy to find (root directory)

**Weaknesses**:
- ⚠️ Very long (1,067 lines)
- ⚠️ Could be split into teaching + reference

---

### File 2: `./INSTRUCTOR-TRAINING-GUIDE.md`

**Location**: Root of FPUNA-2026  
**Lines**: 744  
**Language**: Spanish  
**Purpose**: Pre-course training for new instructors

**Content Overview**:
- Program overview
- Pedagogical philosophy
- Instructor preparation checklist
- Teaching methodology
- Tool setup for instructors
- Evaluation framework

**Strengths**:
- ✅ Different purpose than INSTRUCTOR-GUIDE.md
- ✅ Focused on instructor onboarding
- ✅ Structured training program (16 hours)

**Weaknesses**:
- ⚠️ Some overlap with INSTRUCTOR-GUIDE.md (~30%)
- ⚠️ Could reference main guide instead of duplicating

**Overlap with File 1**: ~30%
- Philosophy section duplicated
- Evaluation guidelines similar
- Tool setup repeated

---

### File 3: `./documentacion/instructor/INSTRUCTOR-GUIDE.md`

**Location**: Buried in documentacion/instructor/  
**Lines**: 905  
**Language**: **English**  
**Purpose**: Appears to be earlier version or alternative guide

**Content Overview**:
- Program philosophy
- Week 1 and Week 2 structure
- Teaching methodology
- Common challenges
- Assessment guidelines
- Tools & resources

**Strengths**:
- ✅ Well-structured
- ✅ Organized by weeks

**Weaknesses**:
- ❌ **In English** (course is in Spanish for Paraguayan students!)
- ❌ Buried location (hard to find)
- ❌ High overlap with File 1 (~60%)
- ❌ Less comprehensive than Spanish version

**Overlap with File 1**: ~60%
- Philosophy section nearly identical (translated)
- Week structure duplicated
- Teaching methodology similar

---

## Overlap Analysis

### Content Comparison Matrix

| Content Section | File 1 (Spanish) | File 2 (Training) | File 3 (English) |
|-----------------|------------------|-------------------|------------------|
| **Program Philosophy** | ✅ Detailed | ✅ Brief | ✅ Detailed |
| **Course Structure** | ✅ Comprehensive | ✅ Overview | ✅ Week-by-week |
| **Teaching Methodology** | ✅ Practical tips | ✅ Training focus | ✅ Guidelines |
| **Module-by-Module Guide** | ✅ All modules | ❌ | ✅ Week 1 & 2 only |
| **Instructor Onboarding** | ❌ | ✅ 16-hour program | ❌ |
| **Common Challenges** | ✅ Comprehensive | ✅ Brief | ✅ Brief |
| **Evaluation & Grading** | ✅ Detailed rubrics | ✅ Framework | ✅ Guidelines |
| **Tool Setup** | ✅ Quick ref | ✅ Detailed training | ✅ Overview |
| **Troubleshooting** | ✅ Extensive | ✅ Common issues | ✅ Basic |
| **Student Support** | ✅ Strategies | ❌ | ✅ Brief |

**Duplication Score**:
- File 1 vs File 2: ~30% overlap
- File 1 vs File 3: ~60% overlap
- File 2 vs File 3: ~25% overlap

---

## Problems Caused by Current State

### 1. Confusion
- **Which guide should instructors use?**
  - New instructor sees 3 files, doesn't know where to start
  - No clear guidance on which is authoritative

### 2. Maintenance Burden
- Updates must be made to 2-3 files
- Easy to update one and forget others
- Inconsistencies emerge over time

### 3. Language Inconsistency
- File 3 is in English, course is in Spanish
- Confusing for Spanish-speaking instructors
- Suggests lack of polish/professionalism

### 4. Discoverability
- File 3 buried in `documentacion/instructor/`
- Instructors may not find it
- Leads to reinventing wheel

---

## Recommended Solution

### Strategy: **Keep 2, Archive 1, Cross-Reference**

#### Keep: `./INSTRUCTOR-GUIDE.md` (File 1)

**Rationale**:
- Most comprehensive (1,067 lines)
- In Spanish (correct language)
- Easy to find (root directory)
- Practical focus

**Action**: **KEEP as primary teaching reference**

**Updates Needed**:
- Add reference to INSTRUCTOR-TRAINING-GUIDE.md at top
- Remove redundant training content
- Focus on day-to-day teaching

---

#### Keep: `./INSTRUCTOR-TRAINING-GUIDE.md` (File 2)

**Rationale**:
- **Different purpose**: Pre-course training (not day-to-day)
- Structured 16-hour onboarding program
- Prepares instructors before course starts

**Action**: **KEEP as onboarding program**

**Updates Needed**:
- Remove overlap with File 1
- Reference INSTRUCTOR-GUIDE.md for details
- Focus on preparation, not teaching

---

#### Archive: `./documentacion/instructor/INSTRUCTOR-GUIDE.md` (File 3)

**Rationale**:
- ❌ In English (wrong language)
- ❌ 60% overlap with File 1
- ❌ Less comprehensive
- ❌ Buried location

**Action**: **MOVE to archive or DELETE**

**Options**:
1. **Delete entirely** (content preserved in git history)
2. **Move to archive/** with note "Superseded by root INSTRUCTOR-GUIDE.md"
3. **Keep as English version** if international instructors join (low priority)

**Recommendation**: **DELETE** (git history preserves it if needed later)

---

## Implementation Plan

### Phase 1: Analysis (DONE)
- ✅ Identified 3 instructor guides
- ✅ Analyzed content overlap
- ✅ Determined purposes

### Phase 2: Consolidation

#### Step 1: Update INSTRUCTOR-GUIDE.md Header (Main Guide)
```markdown
# Guía del Instructor - FPUNA 2026

> **Nuevo instructor?** Empieza con [INSTRUCTOR-TRAINING-GUIDE.md](./INSTRUCTOR-TRAINING-GUIDE.md) para capacitación completa (16 horas).
> Esta guía es tu referencia diaria durante el curso.

...
```

#### Step 2: Update INSTRUCTOR-TRAINING-GUIDE.md Header (Training)
```markdown
# 📚 Guía de Capacitación para Instructores

> **Ya capacitado?** Usa [INSTRUCTOR-GUIDE.md](./INSTRUCTOR-GUIDE.md) como referencia diaria durante el curso.
> Esta guía es para prepararte ANTES del curso (16 horas de capacitación).

...
```

#### Step 3: Remove Duplicated Sections in INSTRUCTOR-TRAINING-GUIDE.md

Replace duplicated sections with references:

**Before** (duplicated content):
```markdown
### Filosofía Pedagógica

#### 1. Aprender Haciendo
[300 lines of duplicated content]
```

**After** (reference):
```markdown
### Filosofía Pedagógica

**Ver**: [INSTRUCTOR-GUIDE.md - Filosofía del Curso](./INSTRUCTOR-GUIDE.md#filosofía-del-curso) para detalles completos.

**Resumen para capacitación**:
- Aprender haciendo (70% práctica, 30% teoría)
- IA como asistente, no reemplazo
- Validar siempre lo que la IA genera
```

#### Step 4: Delete English Instructor Guide

```bash
git rm documentacion/instructor/INSTRUCTOR-GUIDE.md
```

Add note to `documentacion/instructor/README.md`:
```markdown
## Instructor Documentation

**Main Guide**: [../../INSTRUCTOR-GUIDE.md](../../INSTRUCTOR-GUIDE.md) (Español)  
**Training Program**: [../../INSTRUCTOR-TRAINING-GUIDE.md](../../INSTRUCTOR-TRAINING-GUIDE.md) (Español)

All instructor documentation is maintained at the root of FPUNA-2026 for easy access.
```

---

### Phase 3: Create Navigation

Add file: `./INSTRUCTOR-README.md`

```markdown
# Documentación para Instructores - FPUNA 2026

## Guías Disponibles

### 1. Guía de Capacitación (Léeme PRIMERO)
**Archivo**: [INSTRUCTOR-TRAINING-GUIDE.md](./INSTRUCTOR-TRAINING-GUIDE.md)  
**Cuándo usar**: ANTES de empezar a enseñar el curso  
**Duración**: 16 horas (2 días)  
**Propósito**: Prepararte para impartir el curso efectivamente

**Contenido**:
- ✅ Visión general del programa
- ✅ Filosofía pedagógica
- ✅ Setup de herramientas (OpenCode, OMO)
- ✅ Metodología de enseñanza
- ✅ Práctica con materiales del curso

---

### 2. Guía del Instructor (Referencia Diaria)
**Archivo**: [INSTRUCTOR-GUIDE.md](./INSTRUCTOR-GUIDE.md)  
**Cuándo usar**: DURANTE el curso (día a día)  
**Propósito**: Referencia rápida mientras enseñas

**Contenido**:
- ✅ Guía módulo por módulo
- ✅ Desafíos comunes de estudiantes
- ✅ Troubleshooting en vivo
- ✅ Tips de gestión del aula
- ✅ Evaluación y retroalimentación

---

## Flujo de Trabajo Recomendado

```
Semanas 1-2 antes del curso:
├── Completa INSTRUCTOR-TRAINING-GUIDE.md (16 horas)
├── Setup tu entorno (OpenCode, OMO, MCPs)
├── Practica módulos que vas a enseñar
└── Revisa materiales de estudiantes

Durante el curso:
├── Usa INSTRUCTOR-GUIDE.md como referencia
├── Consulta sección específica cuando necesites
└── Marca desafíos nuevos para actualizar guía

Post-curso:
└── Actualiza guías con lecciones aprendidas
```

---

## Recursos Adicionales

- **Student Guide**: [STUDENT-GUIDE.md](./STUDENT-GUIDE.md)
- **Assessment Framework**: [ASSESSMENT-RUBRICS.md](./ASSESSMENT-RUBRICS.md)
- **Tech Setup**: [CONFIGURACION-HERRAMIENTAS-IA.md](./CONFIGURACION-HERRAMIENTAS-IA.md)

```

---

### Phase 4: Verification (30 min)
- Verify all cross-references work
- Check that deleted file isn't referenced elsewhere
- Test navigation flow

---

## Time Estimate

| Phase | Activity | Time |
|-------|----------|------|
| **Phase 1** | Analysis | ✅ DONE |
| **Phase 2** | Consolidation | 2 hours |
| **Phase 3** | Navigation | 30 min |
| **Phase 4** | Verification | 30 min |
| **Total** | | **3 hours** |

---

## Benefits After Consolidation

### For Instructors
- ✅ Clear starting point (INSTRUCTOR-TRAINING-GUIDE.md)
- ✅ Single reference during course (INSTRUCTOR-GUIDE.md)
- ✅ No confusion about which guide to use
- ✅ Easier navigation with cross-references

### For Maintainers
- ✅ Only 2 files to update (down from 3)
- ✅ Clear purpose for each file
- ✅ Reduced duplication (~40% less redundant content)
- ✅ Consistent language (all Spanish)

### For Quality
- ✅ Professional appearance (no buried English files)
- ✅ Easier to keep updated
- ✅ Better onboarding for new instructors
- ✅ Clearer documentation structure

---

## Decision Required

**Approve this plan?**

- ✅ Keep `INSTRUCTOR-GUIDE.md` (main teaching reference)
- ✅ Keep `INSTRUCTOR-TRAINING-GUIDE.md` (pre-course training)
- ✅ Delete `documentacion/instructor/INSTRUCTOR-GUIDE.md` (English duplicate)
- ✅ Create cross-references
- ✅ Create `INSTRUCTOR-README.md` navigation

**If approved**: Proceed to Phase 2 implementation

---

*Instructor Guides Consolidation Report - FPUNA 2026*  
*Created: January 16, 2026*  
*Status: Awaiting Approval*
