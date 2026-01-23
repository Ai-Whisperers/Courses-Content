# Documentation Guides

**Purpose:** How-to guides for common tasks and workflows in the AI Whisperers Courses Content repository.

---

## Available Guides

### 📋 Planning & Analysis

| Guide | Description | Audience |
|-------|-------------|----------|
| **[Content Gap Analysis](./CONTENT-GAP-ANALYSIS.md)** | Identify missing content and areas for improvement | Course creators, instructors |

### 📚 Documentation Management

| Guide | Description | Audience |
|-------|-------------|----------|
| **[Documentation Consolidation Plan](./DOCUMENTATION-CONSOLIDATION-PLAN.md)** | 4-week plan for organizing and consolidating documentation | Maintainers, contributors |
| **[Quality Control](./QUALITY-CONTROL.md)** | Content quality standards and review checklist | All contributors |

### 🚀 Deployment & Infrastructure

| Guide | Description | Audience |
|-------|-------------|----------|
| **[GitHub Pages Setup](./GITHUB-PAGES-SETUP.md)** | Deploy course documentation to GitHub Pages | DevOps, maintainers |
| **[Metrics Dashboard Plan](./METRICS-DASHBOARD-PLAN.md)** | Set up analytics and metrics tracking | Product managers, maintainers |

### 📂 Subdirectories

| Directory | Description |
|-----------|-------------|
| **[course-creation/](./course-creation/)** | Step-by-step guide for creating new courses |
| **[assessment/](./assessment/)** | Designing and grading assessments |

---

## Guide Categories

### 🎯 By Task

**Creating Content:**
- [Course Creation Guide](./course-creation/) - Complete course development workflow
- [Assessment Guide](./assessment/) - Design quizzes, exercises, and projects
- [Content Gap Analysis](./CONTENT-GAP-ANALYSIS.md) - Identify what's missing

**Maintaining Quality:**
- [Quality Control](./QUALITY-CONTROL.md) - Standards and checklists
- [Documentation Consolidation](./DOCUMENTATION-CONSOLIDATION-PLAN.md) - Organize docs

**Infrastructure:**
- [GitHub Pages Setup](./GITHUB-PAGES-SETUP.md) - Deploy documentation
- [Metrics Dashboard](./METRICS-DASHBOARD-PLAN.md) - Track progress

### 👥 By Audience

**For Course Creators:**
- Course Creation Guide (complete workflow)
- Assessment Guide (quizzes and exercises)
- Content Gap Analysis (improvement opportunities)

**For Instructors:**
- Assessment Guide (grading and feedback)
- Quality Control (teaching standards)

**For Maintainers:**
- Documentation Consolidation Plan (organization)
- GitHub Pages Setup (deployment)
- Metrics Dashboard (analytics)

**For Contributors:**
- Quality Control (contribution standards)
- Documentation Consolidation (file organization)

---

## Quick Start

### I want to...

**Create a new course:**
1. Start with [Course Creation Guide](./course-creation/)
2. Use templates from [../templates/](../templates/)
3. Follow [Quality Control](./QUALITY-CONTROL.md) standards

**Design an assessment:**
1. Read [Assessment Guide](./assessment/)
2. Use templates from [../templates/assessments/](../templates/assessments/)
3. Apply grading rubrics

**Improve documentation:**
1. Review [Documentation Consolidation Plan](./DOCUMENTATION-CONSOLIDATION-PLAN.md)
2. Follow [Quality Control](./QUALITY-CONTROL.md) standards
3. Update [DOC-MAP](../DOC-MAP.md) if adding new docs

**Set up infrastructure:**
1. Deploy docs: [GitHub Pages Setup](./GITHUB-PAGES-SETUP.md)
2. Track metrics: [Metrics Dashboard Plan](./METRICS-DASHBOARD-PLAN.md)

---

## Guide Format

All guides in this directory follow this structure:

```markdown
# Guide Title

**Purpose:** Clear one-line description
**Audience:** Who should read this
**Prerequisites:** What you need before starting
**Time:** Estimated completion time

---

## Table of Contents
[Clear navigation]

---

## Sections
[Step-by-step instructions]

---

## Related Documents
[Links to related guides and templates]
```

---

## Contributing New Guides

### When to Create a New Guide

Create a new guide when:
- You've completed a complex task that others will need to repeat
- There's a common workflow that isn't documented
- You've identified a gap in the documentation
- A task requires multiple steps across different tools

### How to Create a Guide

1. **Use the template:**
   ```markdown
   # [Task Name]

   **Purpose:** One-line description
   **Audience:** Who needs this
   **Time:** ~X hours

   ## Prerequisites
   - Thing 1
   - Thing 2

   ## Steps
   [Clear, numbered steps]
   ```

2. **Be specific:**
   - Include exact commands and file paths
   - Show examples (before/after)
   - Explain WHY, not just WHAT

3. **Test it:**
   - Follow your own guide from scratch
   - Ask someone else to test it
   - Update based on feedback

4. **Add metadata:**
   ```yaml
   ---
   title: Guide Title
   category: planning|documentation|infrastructure
   audience: creators|instructors|maintainers|contributors
   status: draft|active|archived
   last_updated: 2026-01-24
   ---
   ```

5. **Update this README:**
   - Add your guide to the appropriate table
   - Update quick start section if relevant

### Guide Best Practices

**DO:**
- ✅ Start with prerequisites and time estimates
- ✅ Use numbered steps for procedures
- ✅ Include examples and screenshots
- ✅ Link to related guides and templates
- ✅ Keep guides focused on ONE task

**DON'T:**
- ❌ Assume prior knowledge
- ❌ Skip steps "everyone knows"
- ❌ Write walls of text
- ❌ Forget to update when processes change
- ❌ Combine multiple unrelated tasks

---

## Maintenance

### Review Schedule

**Monthly:**
- Check guides for accuracy
- Update links and references
- Archive outdated guides

**Quarterly:**
- Full guide audit
- Update based on user feedback
- Add new guides for common questions

**Annually:**
- Major guide overhaul if needed
- Reorganize categories
- Refresh all examples

### Archiving Guides

Move outdated guides to [../archive/](../archive/) when:
- Process has changed significantly
- Technology is deprecated
- Guide is superseded by a better one

Add to archive with note:
```markdown
**Archived:** YYYY-MM-DD
**Reason:** [Why archived]
**Replaced by:** [Link to new guide]
```

---

## Getting Help

**Have questions about a guide?**
- Check the guide's "Troubleshooting" section
- Review related guides in the same category
- Open an issue with `[guide]` tag

**Found an error?**
- Submit a PR with corrections
- Open an issue describing the problem
- Tag the guide author if known

**Need a guide that doesn't exist?**
- Open an issue requesting it
- Describe the task and audience
- Consider contributing it yourself

---

## Statistics

| Metric | Count |
|--------|-------|
| **Total Guides** | 5 |
| **Planning & Analysis** | 1 |
| **Documentation** | 2 |
| **Infrastructure** | 2 |
| **Subdirectories** | 2 |
| **Last Updated** | 2026-01-24 |

---

## Related Resources

### In This Repository
- **[Documentation Hub](../README.md)** - Main docs navigation
- **[Templates](../templates/)** - Reusable templates
- **[Business Docs](../business/)** - Client and portfolio info
- **[Reference](../reference/)** - Quick lookup guides

### External Resources
- [GitHub Documentation](https://docs.github.com)
- [Markdown Guide](https://www.markdownguide.org/)
- [Technical Writing Best Practices](https://developers.google.com/style)

---

**Last Updated:** January 24, 2026  
**Maintained By:** Documentation Team  
**Next Review:** February 2026
