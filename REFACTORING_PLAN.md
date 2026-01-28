# Complete Course Refactoring Plan
## Applying Core/Tutorials/Examples Pattern to All Courses

**Date**: January 28, 2026  
**Scope**: 7 courses across 3 stages  
**Estimated Effort**: 150-200 hours  
**Status**: IN PROGRESS

---

## Course Inventory

### Stage 1: FPUNA 2026 (Development) ✅ PARTIALLY COMPLETE
**Path**: `courses/02-development/FPUNA-2026/`

**Tracks** (6 total):
1. ✅ **01-DESARROLLO-SOFTWARE** (Core modules complete, 2 specializations)
   - Core (5 modules): 100% refactored ✅
   - QA Automation Spec: Module 01-02 complete ✅, Modules 03-05 skeleton ⏳
   - Web Development Spec: NOT REFACTORED ⏳

2. 🟡 **02-ELECTRONICA-AUTOMATIZACION** (NOT REFACTORED)
   - 5 modules: Old structure, needs refactoring

3. ✅ **03-INGENIERIA-AERONAUTICA** (COMPLETE - Reference model)
   - 5 modules: 100% refactored ✅

4. ⏳ **04-MARKETING-NEGOCIOS-TURISMO** (NOT EXPLORED)

5. ⏳ **05-INVESTIGACION-ACADEMIA** (NOT EXPLORED)

6. ⏳ **00-FUNDAMENTOS-PRINCIPALES** (Core foundation, structure TBD)

---

### Stage 2: Production Course ⏳ NOT STARTED
**Path**: `courses/01-production/QA-Automation-with-AI/`

**Status**: Production-ready, 12 modules  
**Needs**: Refactoring to Core/Tutorials/Examples pattern

---

### Stage 3: Beta Courses ⏳ NOT STARTED
**Path**: `courses/03-beta/`

**Courses** (3 total):
1. **Prompt-Engineering-Masterclass** - 6 modules
2. **Building-AI-Powered-Applications** - Full-stack AI course
3. **AI-Tools-for-Productivity** - Workflow automation

---

## Refactoring Strategy

### Priority Order
1. **HIGH**: FPUNA 2026 - Expand QA Modules 03-05 skeletons (6-9 hours)
2. **HIGH**: QA-Automation-with-AI (Production) - 40-50 hours
3. **MEDIUM**: FPUNA Web Development - 20-25 hours
4. **MEDIUM**: FPUNA Electronics - 25-30 hours
5. **LOW**: FPUNA Marketing/Tourism - TBD
6. **LOW**: FPUNA Research - TBD
7. **LOW**: Beta courses - 30-40 hours each

---

## Template Pattern (Proven)

```
Module/
├── README.md (core theory, 600-800 lines)
├── tutorials/
│   ├── 01_Topic.md (300-500 lines)
│   ├── 02_Topic.md (300-500 lines)
│   ├── 03_Topic.md (300-500 lines)
│   ├── 04_Topic.md (300-500 lines)
│   └── 05_Topic.md (300-500 lines)
├── examples/
│   ├── 01_PromptForAI.md (150-300 lines)
│   ├── 02_PromptForAI.md (150-300 lines)
│   └── 03_PromptForAI.md (150-300 lines)
```

**Time per module**: 3-4 hours for full professional content

---

## Execution Plan

### Phase 1: FPUNA 2026 Completion (Estimated: 2-3 weeks)
- ✅ QA Module 01-02: COMPLETE
- [ ] QA Module 03-05: Expand skeletons (6-9 hours)
- [ ] Web Development: Full refactoring (20-25 hours)
- [ ] Electronics: Full refactoring (25-30 hours)
- [ ] Marketing/Tourism: Assess & refactor (~20 hours)
- [ ] Research/Academia: Assess & refactor (~20 hours)

**Total Phase 1**: ~110-125 hours

### Phase 2: Production Course (Estimated: 2-3 weeks)
- [ ] QA-Automation-with-AI: Full refactoring (40-50 hours)

**Total Phase 2**: ~40-50 hours

### Phase 3: Beta Courses (Estimated: 3-4 weeks)
- [ ] Prompt Engineering: Full refactoring (30-40 hours)
- [ ] Building AI Apps: Full refactoring (40-50 hours)
- [ ] AI Tools: Full refactoring (25-35 hours)

**Total Phase 3**: ~95-125 hours

---

## Success Criteria

- ✅ All modules follow Core/Tutorials/Examples structure
- ✅ All READMEs lean (600-800 lines max)
- ✅ All tutorials 300-500 lines, topic-focused
- ✅ All examples are copy-paste ready OpenCode prompts
- ✅ All modules have navigation links (Próximo Paso)
- ✅ Zero LSP/type errors in new files
- ✅ Git commits are logical and well-described

---

## Next Steps

Start with **Phase 1, Step 1**: Expand QA Module 03-05 skeletons

```bash
# Priority 1: Expand Module 03 tutorials (4-5 hours)
# Priority 2: Expand Module 04 tutorials (4-5 hours)
# Priority 3: Expand Module 05 tutorials (4-5 hours)
# Priority 4: Start Web Development (0.5 hours per module setup)
```

---

*Generated: January 28, 2026*  
*Scope**: Complete platform standardization to Core/Tutorials/Examples pattern*
