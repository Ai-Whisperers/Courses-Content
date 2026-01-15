# FPUNA-2026 Implementation Plan
## Modular Summer Courses Architecture

**Status**: 🚧 In Progress  
**Started**: January 2026  
**Target Completion**: February 2026

---

## Overview

Building a modular, reusable architecture for FPUNA summer courses that eliminates duplication and enables rapid track creation.

### Key Innovation
Instead of 8 separate courses with duplicated content, we have:
- **1 Core Foundation** (universal, all students)
- **8 Specialized Tracks** (reference shared components)
- **SHARED Components** (single source of truth)

---

## Architecture Principles

### 1. DRY (Don't Repeat Yourself)
- OpenCode installation guide written **once** in `SHARED/components/`
- All 8 tracks reference it
- Update once → all tracks benefit

### 2. Modular Design
- Each component is self-contained
- Clear interfaces between components
- Easy to update and maintain

### 3. Reusability
- Shared components
- Adaptable exercises
- Configurable templates

### 4. Scalability
- Add new tracks easily
- Extend existing tracks
- Maintain consistency

---

## Current Progress

### ✅ Completed

1. **Directory Structure**
   - Created FPUNA-2026/ root
   - Created 00-FUNDAMENTOS-PRINCIPALES/
   - Created SHARED/components/
   - Created module subdirectories

2. **Main Documentation**
   - README.md (program overview)
   - 00-FUNDAMENTOS-PRINCIPALES/README.md (week 1 guide)
   - This implementation plan

### 🚧 In Progress

3. **SHARED Components** (Task running)
   - opencode-installation/
   - mcp-configuration/
   - skills-system/
   - hooks-rules/
   - project-templates/

4. **Core Foundation Modules** (Task running)
   - 01-ai-stack-setup/
   - 02-configuration-mastery/
   - 03-prompt-engineering/
   - 04-context-engineering/
   - 05-live-project/
   - 06-workflow-patterns/

### ⏳ Pending

5. **Specialized Tracks**
   - 01-DESARROLLO-SOFTWARE/
   - 02-ELECTRONICS-AUTOMATION/
   - 03-AERONAUTICAL-ENGINEERING/
   - 04-MARKETING-COMMUNICATION/
   - 05-RESEARCH-ACADEMIA/
   - 06-HOSPITALITY-TOURISM/
   - 07-QA-AUTOMATION/ (adapt existing)
   - 08-WEB-DEVELOPMENT/ (adapt existing)

6. **Shared Resources**
   - Exercise library
   - Quiz bank
   - Video scripts
   - Presentation slides

---

## Build Sequence

### Phase 1: Foundation (Weeks 1-2) ← **CURRENT**

**Goal**: Build reusable infrastructure

Tasks:
- [x] Create directory structure
- [🚧] Build SHARED components
- [🚧] Build Core Foundation modules
- [ ] Test cross-references
- [ ] Create templates for tracks

**Deliverables**:
- Complete SHARED/ components
- Complete 00-FUNDAMENTOS-PRINCIPALES/
- Track template

### Phase 2: Adapt Existing Tracks (Week 3)

**Goal**: Integrate QA and Web tracks with new architecture

Tasks:
- [ ] Review existing QA-TRACK-MODULE-01 through 05
- [ ] Remove duplicated content
- [ ] Add references to SHARED components
- [ ] Adapt for Spanish/Paraguayan context
- [ ] Same for WEB-TRACK modules

**Deliverables**:
- 07-QA-AUTOMATION/ complete
- 08-WEB-DEVELOPMENT/ complete

### Phase 3: High-Priority Tracks (Weeks 4-5)

**Goal**: Build tracks for largest student groups

**Track 1: Electronics & Automation**
- Largest student group at FPUNA
- 5 modules: CAD/AutoCAD, Circuit Design, PLC Programming, SCADA/HMI, Project
- Specialized MCPs: AutoCAD, KiCad, PLC simulators

**Track 2: Aeronautical Engineering**
- Second largest group
- 5 modules: CATIA/CAD, CFD Analysis, Structural Analysis, Flight Systems, Project
- Specialized MCPs: CATIA, ANSYS, MATLAB

**Deliverables**:
- 02-ELECTRONICS-AUTOMATION/ complete
- 03-AERONAUTICAL-ENGINEERING/ complete

### Phase 4: Medium-Priority Tracks (Week 6)

**Goal**: Build tracks for academic/professional development

**Track 3: Research & Academia**
- For graduate students and researchers
- 5 modules: Literature Review, Data Analysis, Paper Writing, Code for Research, Project
- Specialized MCPs: Python scientific, LaTeX, Zotero

**Track 4: Marketing & Communication**
- For business/marketing students
- 4 modules: Content Creation, Design Automation, Analytics, Campaign Management
- Specialized MCPs: Canva, Adobe, Analytics tools

**Deliverables**:
- 05-RESEARCH-ACADEMIA/ complete
- 04-MARKETING-COMMUNICATION/ complete

### Phase 5: Specialized Tracks (Week 7)

**Goal**: Complete remaining tracks

**Track 5: Software Development**
- For CS students not in QA/Web
- 5 modules based on existing content

**Track 6: Hospitality & Tourism**
- 4 modules: Customer Service, Gastronomy Content, Operations, Project

**Deliverables**:
- 01-DESARROLLO-SOFTWARE/ complete
- 06-HOSPITALITY-TOURISM/ complete

### Phase 6: Testing & Polish (Week 8)

**Goal**: Ensure everything works together

Tasks:
- [ ] Test all cross-references
- [ ] Verify no broken links
- [ ] Student beta testing
- [ ] Gather feedback
- [ ] Polish content
- [ ] Create instructor guides
- [ ] Record demo videos

**Deliverables**:
- Tested, production-ready course
- Instructor materials
- Video content

---

## Content Creation Guidelines

### For SHARED Components

**Location**: `SHARED/components/[component-name]/`

**Structure**:
```
component-name/
├── README.md          # Main guide
├── [specific-guides]  # OS-specific, detailed guides
├── examples/          # Code examples
└── troubleshooting.md # Common issues
```

**Language**: Spanish (Paraguayan)

**Requirements**:
- Standalone (no dependencies on tracks)
- Clear cross-references
- Step-by-step instructions
- Screenshots/diagrams where helpful
- Troubleshooting section

### For Core Foundation Modules

**Location**: `00-FUNDAMENTOS-PRINCIPALES/modules/[##-module-name]/`

**Structure**:
```
##-module-name/
├── README.md      # Main content
├── EXERCISE.md    # Hands-on exercise
├── QUIZ.md        # 5 questions
└── resources/     # Images, videos, etc.
```

**Language**: Spanish (Paraguayan)

**Requirements**:
- Reference SHARED components (use relative paths)
- Time estimates for sections
- Clear learning objectives
- Practical, hands-on
- Paraguayan names/examples

### For Specialized Tracks

**Location**: `##-TRACK-NAME/modules/[##-module-name]/`

**Structure**:
```
##-TRACK-NAME/
├── README.md                  # Track overview
├── modules/
│   ├── 01-module-name/
│   │   ├── README.md
│   │   ├── EXERCISE.md
│   │   └── QUIZ.md
│   └── ...
├── specialized-mcps/          # Track-specific MCPs
│   └── tool-name-mcp.md
└── prompts/                   # Domain-specific prompts
    └── category.md
```

**Language**: Spanish (Paraguayan)

**Requirements**:
- Reference CORE-FOUNDATION and SHARED
- Add only discipline-specific content
- Include specialized MCP guides
- Domain-specific prompts library
- Capstone project

---

## Quality Checklist

### For Each Component

- [ ] Written in Spanish
- [ ] Paraguayan context (names, examples)
- [ ] Cross-references work
- [ ] Code examples tested
- [ ] Screenshots/diagrams included
- [ ] Troubleshooting section
- [ ] No duplication with other content

### For Each Module

- [ ] Learning objectives clear
- [ ] Time estimates realistic
- [ ] Exercise is hands-on
- [ ] Quiz tests understanding
- [ ] References SHARED components
- [ ] No duplicated content

### For Each Track

- [ ] README explains track purpose
- [ ] All modules complete
- [ ] Specialized MCPs documented
- [ ] Prompts library included
- [ ] Capstone project defined
- [ ] References work correctly

---

## Metrics

### Content Statistics (Target)

**SHARED Components**: 5 complete guides  
**Core Foundation**: 6 modules  
**Specialized Tracks**: 8 tracks  
**Total Modules**: ~40 modules  
**Reuse Rate**: 80% (SHARED + Core reused across all tracks)

### Time Savings

**Old Approach** (8 independent courses):
- OpenCode installation guide × 8 = 8 guides to maintain
- Prompt engineering × 8 = 8 modules to maintain
- Configuration × 8 = 8 modules to maintain

**New Approach** (modular):
- OpenCode installation guide × 1 = 1 guide in SHARED
- Prompt engineering × 1 = 1 module in Core
- Configuration × 1 = 1 module in Core

**Maintenance**: 90% reduction in duplicate content

---

## Next Steps

1. **Wait for 
