# ⚠️ External References in .claude/ Directory

**Important Notice About "Broken" Links**

---

## Why Are There 585+ Broken Links in This Directory?

The `.claude/` directory (and its duplicate in `_shared/configs/tools/.claude/`) contains **reference configurations imported from external projects**. Many file paths reference resources that exist in the **original source projects**, not in this repository.

**This is intentional and by design.**

---

## Understanding the "Broken" Links

### Example Broken Link Patterns

```markdown
[CLAUDE.md](../CLAUDE.md)
→ Refers to root CLAUDE.md in the ORIGINAL project

[api/app/main.py](../../../api/app/main.py)
→ Refers to FastAPI project structure in ORIGINAL project

[docs/ADVANCED_PATTERNS.md](../docs/ADVANCED_PATTERNS.md)
→ Refers to documentation in ORIGINAL project
```

### Where These Configs Came From

These configurations were imported from multiple open-source projects:
- **anthropic/** - Official Anthropic examples and templates
- **wshobson/** - Community member Will Hobson's configurations
- **claudekit/** - ClaudeKit project references
- **ailabs/** - AI Labs templates and skills
- **superpowers/** - Community "superpowers" patterns
- **Project-specific** - References to api/, database schemas, etc.

---

## 🚫 DO NOT Try to "Fix" These Links

**Attempting to fix these links will:**
1. Break the original configuration intent
2. Create references to non-existent files in THIS repository
3. Make it harder to track what was imported from where

---

## ✅ How to Use These Configurations

### 1. **Browse for Ideas**

Explore the directory structure:
```
.claude/
├── agents/         # Pre-built agent personas
├── commands/       # Slash command templates
├── skills/         # Specialized skills by domain
├── hooks/          # Lifecycle automation
└── mcp/           # MCP server configurations
```

### 2. **Copy What You Need**

```bash
# Example: Copy a testing skill to your course project
cp .claude/skills/testing/python-testing-patterns-wshobson.md \
   /path/to/your/course/.claude/skills/
```

### 3. **Adapt File Paths**

**Before (from original project):**
```markdown
[Project Context](../../../CLAUDE.md)
[API Endpoints](../../../api/app/api/endpoints/)
[Test Files](../../../api/tests/)
```

**After (adapted to your project):**
```markdown
[Project Context](../CLAUDE.md)        # YOUR project's CLAUDE.md
[Course Modules](./courses/)            # YOUR course structure
[Test Examples](./examples/tests/)      # YOUR test examples
```

### 4. **Remove Irrelevant Sections**

Many configurations reference:
- Tools you're not using
- Dependencies that don't exist in your project  
- Project structures different from yours

**Remove or adapt these sections to fit YOUR project.**

---

## What's Actually Useful Here?

### ✅ Good for This Repository

**Agents** (`agents/`)
- Engineering agents for code review, testing
- Documentation agents for content creation
- QA automation agents for course testing

**Skills** (`skills/`)
- Testing patterns (pytest, JavaScript testing)
- Deployment patterns (GitHub Actions, Docker)
- Documentation skills (markdown, technical writing)
- Code quality skills (TDD, refactoring patterns)

**Commands** (`commands/`)
- Git workflow commands (commit, PR, release)
- Testing commands (run tests, coverage)
- Documentation commands (update docs, changelog)

### ⚠️ Less Useful / Needs Heavy Adaptation

**Project-Specific Skills**
- Excel export validator (from different project)
- API contract validator (FastAPI-specific)
- Database schema designer (PostgreSQL-specific)
- Performance profiler (API performance monitoring)

These reference API structures, database schemas, and dependencies from OTHER projects.

### ❌ Not Applicable

**Direct File References**
- `[api/app/main.py]` - This repo has no `api/` directory
- `[CLAUDE.md]` at root - This repo uses project-specific docs
- `[scripts/profiling/]` - This repo has different script structure

---

## Recommended Approach for This Repository

### Phase 1: Identify Useful Templates

**For Course Development:**
- `agents/engineering/code-reviewer-alirezarezvani.md` - For reviewing course code examples
- `agents/engineering/senior-qa-alirezarezvani.md` - For QA automation course content
- `skills/testing/python-testing-patterns-wshobson.md` - For Python course examples
- `skills/testing/javascript-testing-patterns-wshobson.md` - For JS course examples

**For Documentation:**
- `skills/business/business-document-generator-ailabs.md` - Course documentation
- `skills/writing/research-paper-writer-ailabs.md` - Educational content
- `commands/documentation/` - Documentation workflow commands

### Phase 2: Create Course-Specific Configs

Instead of fixing broken links, create NEW configurations for this repository:

```
.claude/
├── agents/
│   └── course/
│       ├── course-content-reviewer.md    # NEW - Review course modules
│       ├── exercise-validator.md         # NEW - Validate exercises
│       └── assessment-designer.md        # NEW - Design quizzes
│
├── skills/
│   └── education/
│       ├── course-module-creation.md     # NEW - Create modules
│       ├── quiz-generation.md            # NEW - Generate quizzes
│       └── slide-deck-builder.md         # NEW - Build presentations
│
└── commands/
    ├── validate-course.md                # NEW - /validate-course command
    ├── generate-quiz.md                  # NEW - /generate-quiz command
    └── build-slides.md                   # NEW - /build-slides command
```

### Phase 3: Document What's Actually Used

Create a `.claude/ACTIVE-CONFIGS.md` file listing:
- Which configurations are actually being used
- What adaptations were made
- Which original files they came from

---

## For Contributors

### If You Want to Add New .claude/ Configs

**Do:**
1. Create new files specific to this repository's needs
2. Reference actual files that exist in THIS repository
3. Document what the config does and how to use it
4. Add to `.claude/ACTIVE-CONFIGS.md` (if created)

**Don't:**
1. Try to fix "broken" links in imported reference files
2. Assume configurations will work without adaptation
3. Add more external references without documentation

### If You Find Confusing Configs

**Ask yourself:**
1. Does this file reference paths that exist in THIS repo?
2. Is this configuration relevant to course development?
3. Can I adapt this, or is it too specific to another project?

**If NO to all three:**
- Consider removing the file, or
- Move it to `.claude/reference/` with a note explaining it's an example only

---

## Summary

| Aspect | Status |
|--------|--------|
| **Broken Links** | ⚠️ 585+ links (expected, from external projects) |
| **Action** | 🚫 DO NOT fix these links |
| **Usage** | ✅ Copy, adapt, customize for YOUR project |
| **Useful Configs** | ✅ Agents, skills, commands (need adaptation) |
| **Project-Specific** | ❌ Many references don't apply to course repository |

---

## Questions?

**"Should I delete all these files?"**
No - they're useful as templates and inspiration. Just understand they need adaptation.

**"Can I fix the broken links to make them work?"**
No - that would create MORE broken links to files that don't exist here.

**"How do I know which configs are useful?"**
Browse, test, adapt. Focus on agents/skills/commands that match course development needs.

**"What should I do with configs I use?"**
1. Copy to your specific project
2. Adapt file paths to your structure
3. Remove irrelevant sections
4. Document what you changed

---

**Last Updated:** January 24, 2026  
**Purpose:** Explain external references and broken links in .claude/ directory  
**Related:** See [README.md](.claude/README.md) for this project's Claude Code configuration
