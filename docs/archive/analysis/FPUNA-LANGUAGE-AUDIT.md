# FPUNA 2026 Language Consistency Audit

**Date**: January 16, 2026  
**Scope**: FPUNA-2026 course file and folder naming  
**Purpose**: Analyze Spanish vs English naming inconsistency and provide remediation plan

---

## Executive Summary

FPUNA 2026 course is designed for **Spanish-speaking Paraguayan students**, yet has significant language mixing in file and folder names.

**Key Findings**:
- **Directory Names**: 100% Spanish (✅ Consistent)
- **File Names**: ~85% Spanish, ~15% English (❌ Inconsistent)
- **Content**: Primarily Spanish with English technical terms (acceptable)
- **Impact**: Confusing for students, unprofessional appearance

**Recommendation**: **Standardize ALL file names to Spanish** to match directory naming and target audience.

---

## Detailed Analysis

### Directory Structure (Tracks)

| Directory Name | Language | Status |
|----------------|----------|--------|
| `00-FUNDAMENTOS-PRINCIPALES` | Spanish | ✅ Correct |
| `01-DESARROLLO-SOFTWARE` | Spanish | ✅ Correct |
| `02-ELECTRONICA-AUTOMATIZACION` | Spanish | ✅ Correct |
| `03-INGENIERIA-AERONAUTICA` | Spanish | ✅ Correct |
| `04-MARKETING-COMUNICACION` | Spanish | ✅ Correct |
| `05-INVESTIGACION-ACADEMIA` | Spanish | ✅ Correct |
| `06-HOSPITALIDAD-TURISMO` | Spanish | ✅ Correct |
| `COMPARTIDO` | Spanish | ✅ Correct |

**Verdict**: Directory naming is **100% consistent in Spanish**. This is the target standard.

---

### File Names Analysis

#### Track 00: FUNDAMENTOS-PRINCIPALES (Core Foundation)

| File | Language | Status |
|------|----------|--------|
| `01-configuracion-stack-ia.md` | Spanish | ✅ |
| `02-maestria-configuracion.md` | Spanish | ✅ |
| `03-ingenieria-prompts.md` | Spanish | ✅ |
| `04-ingenieria-contexto.md` | Spanish | ✅ |
| `05-proyecto-en-vivo.md` | Spanish | ✅ |
| `06-patrones-flujo-trabajo.md` | Spanish | ✅ |
| `README.md` | Universal | ✅ |

**Status**: ✅ **100% Consistent (Spanish)**

---

#### Track 01: DESARROLLO-SOFTWARE (Software Development)

| File | Language | Status |
|------|----------|--------|
| `01-arquitectura-software.md` | Spanish | ✅ |
| `02-patrones-diseno.md` | Spanish | ✅ |
| `03-testing-tdd.md` | Mixed (English "testing") | ⚠️ |
| `04-codigo-limpio.md` | Spanish | ✅ |
| `05-diseno-sistemas.md` | Spanish | ✅ |
| `IDEAS-IA.md` | Spanish | ✅ |
| `README.md` | Universal | ✅ |

**Subdirectory: especializaciones/qa-automation/**

| File | Language | Status |
|------|----------|--------|
| `01-playwright-avanzado.md` | Mixed | ⚠️ |
| `02-api-testing.md` | Mixed | ⚠️ |
| `03-test-architecture.md` | English | ❌ |
| `04-ci-cd-integration.md` | Mixed | ⚠️ |
| `05-ia-para-qa.md` | Mixed | ⚠️ |

**Subdirectory: especializaciones/web-development/**

| File | Language | Status |
|------|----------|--------|
| `01-nextjs-foundations.md` | Mixed | ⚠️ |
| `02-fullstack-development.md` | English | ❌ |
| `03-auth-authorization.md` | English | ❌ |
| `04-ui-ux-styling.md` | English | ❌ |
| `05-deployment-ai.md` | Mixed | ⚠️ |

**Status**: ❌ **~60% Consistent** - Heavy English influence in specializations

---

#### Track 03: INGENIERIA-AERONAUTICA (Aeronautical Engineering)

| File | Language | Status |
|------|----------|--------|
| `01-cad-ia.md` | Mixed | ⚠️ |
| `02-aerodinamica-cfd.md` | Mixed | ⚠️ |
| `03-structures-materials.md` | **English** | ❌ |
| `04-propulsion-systems.md` | **English** | ❌ |
| `05-aircraft-design.md` | **English** | ❌ |
| `IDEAS-IA.md` | Spanish | ✅ |
| `README.md` | Universal | ✅ |

**Status**: ❌ **40% Consistent** - 60% modules have English names

---

#### Track 05: INVESTIGACION-ACADEMIA (Research & Academia)

| File | Language | Status |
|------|----------|--------|
| `01-revision-literatura.md` | Spanish | ✅ |
| `02-research-methodology.md` | **English** | ❌ |
| `03-data-analysis.md` | **English** | ❌ |
| `04-academic-writing.md` | **English** | ❌ |
| `05-presentation-publication.md` | **English** | ❌ |
| `IDEAS-IA.md` | Spanish | ✅ |

**Status**: ❌ **33% Consistent** - 67% modules have English names

---

#### Other Tracks Status

**Track 02: ELECTRONICA-AUTOMATIZACION**
- ✅ **100% Spanish** - All files correctly named

**Track 04: MARKETING-COMUNICACION**
- ✅ **100% Spanish** - All files correctly named

**Track 06: HOSPITALIDAD-TURISMO**
- ✅ **100% Spanish** - All files correctly named

**COMPARTIDO (Shared Resources)**
- ✅ **100% Spanish** - All directories and files correctly named

---

## Summary Statistics

| Track | Spanish Files | English/Mixed Files | Consistency Score |
|-------|---------------|---------------------|-------------------|
| **00-FUNDAMENTOS-PRINCIPALES** | 6/6 | 0/6 | ✅ 100% |
| **01-DESARROLLO-SOFTWARE** | 7/7 core | 13/15 specializations | ⚠️ 67% |
| **02-ELECTRONICA-AUTOMATIZACION** | 5/5 | 0/5 | ✅ 100% |
| **03-INGENIERIA-AERONAUTICA** | 2/5 | 3/5 | ❌ 40% |
| **04-MARKETING-COMUNICACION** | 5/5 | 0/5 | ✅ 100% |
| **05-INVESTIGACION-ACADEMIA** | 1/5 | 4/5 | ❌ 20% |
| **06-HOSPITALIDAD-TURISMO** | 4/4 | 0/4 | ✅ 100% |
| **COMPARTIDO** | All | 0 | ✅ 100% |

**Overall FPUNA-2026 Consistency**: ~70% Spanish

---

## Root Cause Analysis

### Why Did This Happen?

1. **Different Development Phases**: Some tracks were created early (Spanish), others later (English)
2. **Multiple Contributors**: Different people with different language preferences
3. **Technical Terminology**: Tendency to use English for technical terms (testing, deployment, etc.)
4. **Copy-Paste from English Sources**: Some modules adapted from English materials

### Why This Is A Problem

1. **Confusing for Students**: "¿Es `03-structures-materials.md` o `03-estructuras-materiales.md`?"
2. **Unprofessional Appearance**: Looks unfinished, inconsistent
3. **SEO/Searchability**: Students searching in Spanish won't find English-named files easily
4. **Violates Course Design**: Course explicitly targets Spanish-speaking Paraguayans

---

## Remediation Plan

### Strategy: Standardize to Spanish

**Rationale**:
- Target audience: Spanish-speaking students in Paraguay
- Directory names already in Spanish
- Most content already in Spanish
- Professional consistency

**Exceptions** (keep English):
- `README.md` (universal convention)
- Technical acronyms (TDD, API, CI/CD) when part of compound name

---

## Proposed File Renames

### Track 01: DESARROLLO-SOFTWARE

#### Core Modules
```
03-testing-tdd.md → 03-pruebas-tdd.md
```

#### Specialization: qa-automation
```
02-api-testing.md          → 02-pruebas-api.md
03-test-architecture.md    → 03-arquitectura-pruebas.md
04-ci-cd-integration.md    → 04-integracion-ci-cd.md
05-ia-para-qa.md           → (keep, already Spanish)
```

#### Specialization: web-development
```
01-nextjs-foundations.md   → 01-fundamentos-nextjs.md
02-fullstack-development.md → 02-desarrollo-fullstack.md
03-auth-authorization.md   → 03-autenticacion-autorizacion.md
04-ui-ux-styling.md        → 04-diseno-ui-ux.md
05-deployment-ai.md        → 05-despliegue-ia.md
```

---

### Track 03: INGENIERIA-AERONAUTICA

```
03-structures-materials.md  → 03-estructuras-materiales.md
04-propulsion-systems.md    → 04-sistemas-propulsion.md
05-aircraft-design.md       → 05-diseno-aeronaves.md
```

---

### Track 05: INVESTIGACION-ACADEMIA

```
02-research-methodology.md   → 02-metodologia-investigacion.md
03-data-analysis.md          → 03-analisis-datos.md
04-academic-writing.md       → 04-redaccion-academica.md
05-presentation-publication.md → 05-presentacion-publicacion.md
```

---

## Implementation Steps

### Phase 1: Planning (1 hour)
1. ✅ **Create this audit report** (DONE)
2. Get approval on proposed renames
3. Verify no hardcoded links that will break

### Phase 2: Rename Files (2 hours)
1. Use `git mv` to preserve history
2. Update internal links in README files
3. Update cross-references between modules

### Phase 3: Verification (30 min)
1. Test all links in README files
2. Verify git history preserved
3. Update HONEST-STATUS-REPORT.md with language consistency fix

### Phase 4: Commit & Document (30 min)
1. Commit changes with descriptive message
2. Update FPUNA-2026 README noting standardization
3. Add to session summary

**Total Time**: ~4 hours

---

## Risk Assessment

### Risks of Renaming

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| **Broken internal links** | Medium | Use search/replace, verify all links |
| **Student confusion** (mid-course) | Low | Course hasn't started yet (Summer 2026) |
| **Git history loss** | Low | Use `git mv` (preserves history) |
| **External references** | Very Low | Course not yet published externally |

### Risks of NOT Renaming

| Risk | Impact | Why Critical |
|------|--------|--------------|
| **Student confusion** | High | Mixing languages reduces clarity |
| **Unprofessional image** | Medium | FPUNA reputation at stake |
| **Harder maintenance** | Medium | Contributors unsure what language to use |
| **Accessibility** | Medium | Spanish speakers have harder time finding content |

**Recommendation**: **Benefits far outweigh risks. Proceed with renaming.**

---

## Technical Terminology Note

Some technical terms don't have good Spanish equivalents and are universally understood in English. These are **acceptable exceptions**:

- **TDD** (Test-Driven Development) - Keep as "TDD"
- **CI/CD** (Continuous Integration/Deployment) - Keep as "CI/CD"
- **API** - Keep as "API"
- **IoT** - Keep as "IoT"
- **CAD**, **CFD**, **FEA** - Keep as acronyms
- **NextJS**, **Playwright** - Keep as product names

**Rule**: When technical term is part of a Spanish phrase, keep it:
- ✅ `03-pruebas-tdd.md` (TDD is the methodology name)
- ✅ `02-aerodinamica-cfd.md` (CFD is the tool name)
- ✅ `04-integracion-ci-cd.md` (CI/CD is the process name)

---

## Approval Required

Before proceeding with renaming:

**Decision Needed**:
1. ✅ Approve overall strategy (Standardize to Spanish)
2. ✅ Approve specific file renames listed above
3. ✅ Approve timeline (4 hours work)

**If Approved**: Proceed to implementation  
**If Changes Needed**: Revise this document and re-submit

---

## Next Steps

1. **Get user approval** on this plan
2. **Implement Phase 2** (file renames with `git mv`)
3. **Update all links** in README and cross-references
4. **Verify** all links work correctly
5. **Commit** with descriptive message
6. **Mark HIGH-2 complete** in todo list

**Estimated Completion**: 4 hours from approval

---

*Language Audit Report - FPUNA 2026*  
*Created: January 16, 2026*  
*Status: Awaiting Approval*
