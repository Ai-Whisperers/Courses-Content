# FPUNA 2026 Course Improvement Work Plan

## Executive Summary

Based on critical analysis, the current starter-kits have several systemic issues that need addressing:

1. **Over-reliance on prompts** - Courses teach prompt-writing but not underlying skills
2. **Repetitive content** - Many "20 ideas" are variations of the same concept
3. **Unrealistic skill jumps** - From "blink LED" to "build SCADA" with nothing in between
4. **Missing hands-on exercises** - Templates without practice
5. **Placeholder overload** - Files are more brackets than content
6. **Lack of Paraguay-specific content** - Generic examples that don't resonate locally
7. **Missing verification steps** - No way to know if AI output is correct
8. **Privacy/ethics gaps** - Especially in hospitality and research tracks

---

## Detailed Criticism Analysis

### Track 00 - Fundamentos Principales

| Issue | Severity | Description |
|-------|----------|-------------|
| Prompt-centric | HIGH | Teaches how to ask AI, not how to think |
| No progression | MEDIUM | All prompts at same difficulty level |
| Missing fundamentals | HIGH | Doesn't teach what AI actually is or how it works |
| No exercises | HIGH | Students can't practice without real projects |

**Root Cause:** Course assumes students already know their domain; only teaches AI interaction.

---

### Track 01 - Desarrollo Software

| Issue | Severity | Description |
|-------|----------|-------------|
| CRUD repetition | MEDIUM | 15/20 ideas are "generate X for Y" |
| No debugging skills | HIGH | What if AI code doesn't work? |
| Missing architecture | MEDIUM | All micro-level, no system thinking |
| Copy-paste culture | HIGH | Encourages using code without understanding |

**Root Cause:** Focuses on generation, not comprehension or debugging.

---

### Track 02 - Electrónica

| Issue | Severity | Description |
|-------|----------|-------------|
| Skill level jumps | HIGH | LED blink → SCADA is insane |
| ASCII diagrams | LOW | Outdated but functional |
| Safety concerns | HIGH | No warnings about electrical safety |
| Missing simulation | MEDIUM | No Wokwi/Tinkercad integration guidance |

**Root Cause:** Tries to cover too much breadth without depth progression.

---

### Track 03 - Aeronáutica

| Issue | Severity | Description |
|-------|----------|-------------|
| Safety-critical reliance | CRITICAL | Students might trust AI for aircraft design |
| No validation culture | HIGH | "AI said it's stable" is not validation |
| Unrealistic scope | MEDIUM | Full aircraft design in a course |
| Missing software tools | MEDIUM | XFLR5, OpenVSP mentioned but not taught |

**Root Cause:** Aerospace engineering requires certification-level rigor that AI cannot provide.

---

### Track 04 - Marketing

| Issue | Severity | Description |
|-------|----------|-------------|
| Platform repetition | MEDIUM | Same idea for Instagram, Facebook, TikTok |
| Superficial strategy | HIGH | Tactics without strategy foundation |
| Missing analytics | MEDIUM | How to measure if content works |
| Generic examples | MEDIUM | Not Paraguay-specific enough |

**Root Cause:** Focuses on content creation, not marketing fundamentals.

---

### Track 05 - Investigación

| Issue | Severity | Description |
|-------|----------|-------------|
| Ethics overload | MEDIUM | More "don't do" than "how to do" |
| Citation danger | CRITICAL | AI hallucinating references is real risk |
| Missing methodology | HIGH | AI can't replace understanding research design |
| Tutor dependency | LOW | Many prompts end with "verify with tutor" |

**Root Cause:** Academic integrity concerns overshadow practical utility.

---

### Track 06 - Hospitalidad

| Issue | Severity | Description |
|-------|----------|-------------|
| Privacy concerns | HIGH | Pasting guest data into AI |
| Generic hospitality | MEDIUM | Could be any country, not Paraguay-specific |
| Chatbot-centric | MEDIUM | First idea is literally "be a chatbot" |
| Missing service design | HIGH | AI can't replace hospitality intuition |

**Root Cause:** Treats hospitality as a content/response generation problem.

---

## Improvement Work Plan

### Phase 1: Foundation Fixes (Priority: CRITICAL)

#### 1.1 Add "Prerequisites & Fundamentals" to Each Track

**Files to create:**
```
each-track/starter-kit/
├── 00-PREREQUISITES.md      # What students should know BEFORE using AI
├── 01-FUNDAMENTALS.md       # Core concepts of the domain (not AI)
└── 02-AI-LIMITATIONS.md     # What AI cannot do in this domain
```

**Content requirements:**
- [ ] Track 00: What is programming? What is an LLM? How do they actually work?
- [ ] Track 01: Software architecture basics, debugging methodology, reading code
- [ ] Track 02: Ohm's law, circuit safety, how to read datasheets manually
- [ ] Track 03: Physics of flight, why certification exists, safety culture
- [ ] Track 04: Marketing fundamentals (4Ps), customer psychology, brand strategy
- [ ] Track 05: Scientific method, research ethics, critical thinking
- [ ] Track 06: Service design principles, guest psychology, hospitality standards

---

#### 1.2 Add Verification Checklists

**Files to create:**
```
each-track/starter-kit/
└── VERIFICATION-CHECKLIST.md   # How to verify AI output is correct
```

**Content per track:**

| Track | Verification Method |
|-------|---------------------|
| 00 | Does the code run? Do tests pass? |
| 01 | Code review checklist, security scan, test coverage |
| 02 | Simulation first, breadboard second, measure with multimeter |
| 03 | Compare with published data, consult professor, never fly untested |
| 04 | A/B test results, actual metrics, not just "looks good" |
| 05 | Every citation verified in Google Scholar, plagiarism check |
| 06 | Guest feedback, actual reviews, operational metrics |

---

#### 1.3 Add Safety Warnings Where Critical

**Tracks requiring safety additions:**

- **Track 02 (Electrónica):** Electrical safety, never work on live circuits, fire hazards
- **Track 03 (Aeronáutica):** AI output is NOT certified, professional review required, lives at stake
- **Track 05 (Investigación):** Citation hallucination warning, plagiarism consequences
- **Track 06 (Hospitalidad):** Data privacy (GDPR-like), never paste guest PII into AI

---

### Phase 2: Content Quality Improvements (Priority: HIGH)

#### 2.1 Rewrite "20 Ideas" with Progression

**Current problem:** All ideas at same level, many repetitive

**New structure for each 20-IDEAS.md:**

```markdown
## Beginner (Ideas 1-7)
- Simple, single-step tasks
- Low risk of AI errors
- Easy to verify

## Intermediate (Ideas 8-14)
- Multi-step workflows
- Requires domain knowledge to verify
- Builds on beginner skills

## Advanced (Ideas 15-20)
- Complex integrations
- Requires significant expertise
- AI assists, human leads
```

**Deduplication needed:**

| Track | Repetitive Pattern | Fix |
|-------|-------------------|-----|
| 01 | "Generate CRUD for X" x15 | Keep 3, replace 12 with debugging, refactoring, architecture |
| 04 | "Write caption for X platform" x8 | Keep 2, add strategy, analytics, funnel design |
| 06 | "Respond to X" x10 | Keep 3, add service design, experience mapping |

---

#### 2.2 Add Hands-On Exercises

**Files to create:**
```
each-track/starter-kit/
└── EXERCISES/
    ├── exercise-01-beginner.md
    ├── exercise-02-intermediate.md
    └── exercise-03-advanced.md
```

**Exercise format:**
```markdown
# Exercise: [Name]

## Objective
[What student will learn]

## Prerequisites
[What they need to know]

## Setup
[Files/tools needed]

## Instructions
1. [Step-by-step]
2. [With checkpoints]
3. [And verification]

## Expected Output
[What success looks like]

## Common Mistakes
[What to watch for]

## Extension Challenge
[For advanced students]
```

---

#### 2.3 Add Paraguay-Specific Examples

**Content to add per track:**

| Track | Paraguay-Specific Content |
|-------|--------------------------|
| 00 | Examples using Guaraní text processing, local date formats |
| 01 | APIs for Paraguayan services (Tigo Money, banks), local regulations |
| 02 | Power grid specs (220V/50Hz), local component availability |
| 03 | DINAC regulations, Silvio Pettirossi airport considerations |
| 04 | Paraguayan holidays, local hashtags, guaraníes pricing psychology |
| 05 | Paraguayan universities' thesis formats, local journals (Scielo Paraguay) |
| 06 | SENATUR regulations, Paraguayan tourism destinations, local events |

---

### Phase 3: Structural Improvements (Priority: MEDIUM)

#### 3.1 Reduce Placeholder Overload

**Current problem:** Files have more `[X]` than content

**Solution:** Create filled example files

```
each-track/starter-kit/
├── CLAUDE.md                    # Template (keep)
└── examples/
    ├── CLAUDE-example-1.md      # Fully filled real example
    └── CLAUDE-example-2.md      # Another filled example
```

**Examples to create:**

| Track | Example 1 | Example 2 |
|-------|-----------|-----------|
| 00 | Python CLI tool | Node.js web app |
| 01 | E-commerce backend | Mobile app API |
| 02 | Weather station | Home automation |
| 03 | Training UAV | RC aircraft analysis |
| 04 | Local restaurant | Clothing boutique |
| 05 | Education thesis | Health sciences study |
| 06 | Boutique hotel Asunción | Restaurant in Encarnación |

---

#### 3.2 Add "What Can Go Wrong" Sections

**Files to create:**
```
each-track/starter-kit/
└── COMMON-MISTAKES.md
```

**Content structure:**
```markdown
# Common Mistakes When Using AI in [Domain]

## Mistake 1: [Name]
**What happens:** [Description]
**Why it's bad:** [Consequences]
**How to avoid:** [Prevention]
**How to fix:** [Recovery]

## Mistake 2: ...
```

---

#### 3.3 Add Integration Between Tracks

**Problem:** Tracks are siloed, real projects cross domains

**Solution:** Create cross-track project examples

```
FPUNA-2026/
└── CROSS-TRACK-PROJECTS/
    ├── proyecto-iot-marketing.md      # Track 02 + 04
    ├── proyecto-turismo-tech.md       # Track 01 + 06
    └── proyecto-investigacion-data.md # Track 01 + 05
```

---

### Phase 4: Quality Assurance (Priority: MEDIUM)

#### 4.1 Peer Review All Content

**Review checklist per file:**
- [ ] Technical accuracy verified
- [ ] No dangerous advice
- [ ] Paraguay-relevant
- [ ] Appropriate skill level
- [ ] Exercises are doable
- [ ] AI limitations clearly stated

#### 4.2 Student Testing

**Pilot program:**
1. Select 2-3 students per track
2. Have them use materials on real project
3. Collect feedback
4. Iterate

#### 4.3 Version Control & Updates

**Establish process:**
- Semester review of all content
- Update for new AI capabilities
- Remove deprecated advice
- Add new Paraguay-specific examples

---

## Implementation Timeline

### Week 1-2: Critical Safety & Foundations
- [ ] Add safety warnings to Tracks 02, 03, 05, 06
- [ ] Create PREREQUISITES.md for all tracks
- [ ] Create VERIFICATION-CHECKLIST.md for all tracks

### Week 3-4: Content Quality
- [ ] Rewrite 20-IDEAS.md with progression (all tracks)
- [ ] Deduplicate repetitive content
- [ ] Add Paraguay-specific examples

### Week 5-6: Hands-On Materials
- [ ] Create 3 exercises per track (21 exercises total)
- [ ] Create 2 filled examples per track (14 examples total)
- [ ] Add COMMON-MISTAKES.md to all tracks

### Week 7-8: Integration & QA
- [ ] Create cross-track projects
- [ ] Peer review all content
- [ ] Initial student testing

### Ongoing: Maintenance
- [ ] Collect feedback
- [ ] Update content quarterly
- [ ] Add new examples as needed

---

## File Creation Summary

### New Files Per Track (7 files each = 49 total)
```
starter-kit/
├── 00-PREREQUISITES.md           # NEW
├── 01-FUNDAMENTALS.md            # NEW
├── 02-AI-LIMITATIONS.md          # NEW (merge with existing content)
├── VERIFICATION-CHECKLIST.md     # NEW
├── COMMON-MISTAKES.md            # NEW
├── examples/
│   ├── CLAUDE-example-1.md       # NEW
│   └── CLAUDE-example-2.md       # NEW
└── EXERCISES/
    ├── exercise-01-beginner.md   # NEW
    ├── exercise-02-intermediate.md # NEW
    └── exercise-03-advanced.md   # NEW
```

### New Global Files (3 total)
```
FPUNA-2026/
└── CROSS-TRACK-PROJECTS/
    ├── proyecto-iot-marketing.md
    ├── proyecto-turismo-tech.md
    └── proyecto-investigacion-data.md
```

### Files to Update (28 existing)
- All 20-IDEAS.md files - add progression, deduplicate
- All AI-INTEGRATION.md files - add limitations section
- All SETUP-AI.md files - add verification steps
- All CLAUDE.md files - create filled examples

---

## Success Metrics

| Metric | Current State | Target |
|--------|---------------|--------|
| Placeholder ratio | ~40% brackets | <15% brackets |
| Unique ideas per track | ~12/20 | 20/20 |
| Paraguay-specific examples | ~10% | >50% |
| Exercises per track | 0 | 3 |
| Filled examples per track | 0 | 2 |
| Safety warnings (critical tracks) | 0 | Complete |
| Verification checklists | 0 | 7 |

---

## Priority Matrix

```
                    IMPACT
                 Low    High
            ┌─────────┬─────────┐
       High │ Phase 3 │ Phase 1 │  URGENCY
            │ Structure│ Safety  │
            ├─────────┼─────────┤
       Low  │ Phase 4 │ Phase 2 │
            │   QA    │ Content │
            └─────────┴─────────┘
```

**Recommended order:** Phase 1 → Phase 2 → Phase 3 → Phase 4

---

## Resource Requirements

### Time Estimate
- Phase 1: 8-12 hours
- Phase 2: 16-24 hours
- Phase 3: 12-16 hours
- Phase 4: 8-12 hours
- **Total: 44-64 hours**

### Skills Needed
- Domain expertise (for verification)
- Technical writing
- Paraguay local knowledge
- Student perspective (for exercises)

---

*Work Plan created: January 2026*
*Last updated: [date]*
