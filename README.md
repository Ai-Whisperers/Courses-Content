# AI Whisperers - Courses Content Repository

## Overview

Welcome to the **AI Whisperers Courses Content Repository**! This is your central hub for all professional training courses, combining traditional learning with AI-augmented development practices.

---

## 📚 Browse by Status

**NEW:** All courses are now organized by development status for easy navigation!

- 🟢 [**Production Ready**](./courses/INDEX.md#-production-ready-2-courses) - Fully tested, ready for students (2 courses)
- 🟡 [**In Development**](./courses/INDEX.md#-in-development-1-course) - Active work, 30-50% complete (1 course)
- 🔵 [**Beta**](./courses/INDEX.md#-beta-3-courses) - 60%+ complete, needs testing (3 courses)
- ⚪ [**Planning**](./courses/INDEX.md#-planning-9-courses) - Early stage, <50% complete (9 courses)

👉 **[View Complete Course Index](./courses/INDEX.md)** for full details, filters, and browse by audience

---

## Available Courses

### Primary Course (Production Ready)

#### QA Automation with AI Course

**Location:** [`courses/🟢-production/QA-Automation-with-AI/`](./courses/🟢-production/QA-Automation-with-AI/)

The comprehensive AI-first QA automation course with 12 complete modules.

**Format:** Self-paced with 12 modules
**Status:** All 12 modules complete
**Focus:** AI-first QA automation, Playwright, API testing, CI/CD

**What's Included:**
- 12 complete modules covering all QA fundamentals
- AI integration throughout the curriculum
- Comprehensive exercises and quizzes for each module
- 9 professional presentation templates
- Extensive prompts library
- Test examples (Playwright, Jest, Pytest, API)
- Industry-validated content with citations

**Start Here:** [courses/🟢-production/QA-Automation-with-AI/README.md](./courses/🟢-production/QA-Automation-with-AI/README.md)

---

#### Prompt Engineering Masterclass

**Location:** [`courses/🟢-production/Prompt-Engineering-Masterclass/`](./courses/🟢-production/Prompt-Engineering-Masterclass/)

Master advanced prompt engineering techniques to unlock the full potential of ChatGPT, Claude, and other LLMs.

**Format:** Self-paced with 6 modules  
**Status:** ✅ Production Ready  
**Target:** AI power users, developers, content creators, analysts  
**Duration:** 16-20 hours (3-4 weeks, part-time)

**What's Included:**
- 6 complete modules (How LLMs Work, Prompt Structure, Advanced Patterns, System Prompts, Debugging, Libraries)
- 6 hands-on exercises with comprehensive solution guides
- 6 quizzes with complete answer keys
- Final project: Build your personal prompt library (with rubric + examples)
- 50+ ready-to-use prompt templates
- Resources and templates directories
- **Total: 30+ files, ~20,600 lines of content**

**Key Learning Outcomes:**
- Understand LLM mechanics (tokens, temperature, context windows)
- Master CRAFT framework for prompt structure
- Apply advanced patterns (few-shot, chain-of-thought, ReAct, Tree-of-Thought)
- Design system prompts and AI personas
- Debug and iterate prompts systematically
- Build and maintain professional prompt libraries

**Start Here:** [courses/🟢-production/Prompt-Engineering-Masterclass/README.md](./courses/🟢-production/Prompt-Engineering-Masterclass/README.md)

---

### FPUNA 2026 Summer Course (In Development) 🚧

#### AI-Augmented Development Program

**Location:** [`courses/🟡-development/FPUNA-2026/`](./courses/🟡-development/FPUNA-2026/)

**Status:** ~30-40% Complete - Active Development  
**Target:** Universidad Nacional de Asunción (Paraguay) - Summer 2026  
**Format:** 2-week intensive (Week 1: Core Foundation, Week 2: Specialization)  
**Expected Production Ready**: Q2 2026 (2-3 months focused work needed)

**Current State:**
- ✅ **Core Foundation**: 6 modules (~70% complete)
- 🟡 **Software Development Track**: 2/5 modules complete
- 🟡 **Aeronautical Track**: 1/5 modules usable
- ❌ **Other Specializations**: Early development stage
- ⚠️ **Language Consistency**: Mixed Spanish/English (being standardized)
- ⚠️ **Student Testing**: Not yet conducted

**What's Ready Now:**
- Core Foundation modules (mostly complete)
- Architecture and Design Patterns modules
- Comprehensive student/instructor guides
- Project scaffolding and structure

**What's In Progress:**
- Remaining Software Development modules
- Aeronautical Engineering track completion
- Language standardization (Spanish)
- Removal of AI-generated placeholders
- Beta testing with pilot students

**Documentation:**
- [📊 Honest Status Report](./HONEST-STATUS-REPORT.md) - **READ THIS FIRST** for accurate status
- [📈 Previous Reports](./AUDIT-REPORTS/) - Historical context (NOTE: Contains optimistic estimates)

**Start Here:** [courses/🟡-development/FPUNA-2026/README.md](./courses/🟡-development/FPUNA-2026/README.md)

---

### Courses In Development

For detailed course catalog with all courses in development, see **[courses/INDEX.md](./courses/INDEX.md)**.

**Summary:**
- **🟡 In Development:** 1 course (FPUNA 2026) ~40% complete
- **🔵 Beta:** 3 courses 60%+ complete, needs testing
- **⚪ Planning:** 9 courses in early stages

Key courses in pipeline:
- Introduction to AI for Business Professionals (Planning)
- AI-Assisted Software Development (Planning)
- AI for Marketing Teams (Planning)
- AI Tools for Productivity (Planning)
- Building AI-Powered Applications (Planning)
- QA Automation with AI (Advanced) (Planning)
- AI for Customer Service Teams (Planning)
- AI for Sales Teams (Planning)
- AI Ethics and Governance (Planning)

---

## Repository Structure (Updated January 2026)

```
Courses-Content/
│
├── courses/                           # All course content
│   ├── QA-Automation-with-AI/         # COMPLETE - 12 modules
│   ├── Summer-Courses-University/     # University courses (Paraguay)
│   │   ├── FPUNA-2026/                # NEW: Modular course architecture
│   │   │   ├── README.md              # Implementation plan
│   │   │   ├── SHARED/                # Reusable components (27 files)
│   │   │   │   ├── opencode-installation/
│   │   │   │   ├── mcp-configuration/
│   │   │   │   ├── skills-system/
│   │   │   │   ├── hooks-rules/
│   │   │   │   └── project-templates/
│   │   │   ├── 00-CORE-FOUNDATION/    # Week 1 universal curriculum (18 files)
│   │   │   │   ├── 01-ai-stack-setup/
│   │   │   │   ├── 02-configuration-mastery/
│   │   │   │   ├── 03-prompt-engineering/
│   │   │   │   ├── 04-context-engineering/
│   │   │   │   ├── 05-live-project/
│   │   │   │   └── 06-workflow-patterns/
│   │   │   └── [01-08 specialized tracks pending]
│   │   └── Cursos/                    # Course catalog and references
│   ├── AI-Assisted-Software-Development/
│   ├── AI-Ethics-and-Governance/
│   ├── AI-for-Customer-Service-Teams/
│   ├── AI-for-Marketing-Teams/
│   ├── AI-for-Sales-Teams/
│   ├── AI-Tools-for-Productivity/
│   ├── Building-AI-Powered-Applications/
│   ├── Introduction-to-AI-for-Business-Professionals/
│   ├── Prompt-Engineering-Masterclass/
│   ├── Business-Professional/
│   ├── Team-Specific/
│   └── Technical-Development/
│
├── docs/                              # Documentation hub
│   ├── frameworks/                    # Strategic guides and methodologies
│   │   ├── ASSESSMENT-FRAMEWORK.md
│   │   ├── CAPABILITY-MATRIX.md
│   │   ├── COURSE-CONTENT-CREATION-GUIDE.md
│   │   ├── COURSE-TEMPLATE-MASTER.md
│   │   └── ...
│   ├── history/                       # Implementation records
│   │   ├── MERGE-SUMMARY.md
│   │   └── ...
│   ├── templates/                     # Reusable course templates
│   └── planning/                      # Project planning documents
│       ├── FPUNA-COURSE-STRATEGY.md
│       ├── FPUNA-SUMMER-2026-PROJECT-PLAN.md
│       ├── COURSE-TIMELINE-GANTT.md
│       ├── STUDENT-INTEREST-SURVEY.md
│       ├── CAPSTONE-*.md
│       └── GITHUB-ORGANIZATION-SETUP.md
│
├── archive/                           # Historical content (reference only)
│   └── old-modules/                   # Previous course iterations
│       ├── QA-TRACK-MODULE-*.md (5 files)
│       ├── WEB-TRACK-MODULE-*.md (5 files)
│       ├── CORE-MODULE-*-DRAFT.md (6 files)
│       ├── tier1-desarrollo-software/
│       └── _shared/
│
├── shared-resources/                  # Common across courses
│   ├── example-projects/              # Reference projects
│   │   └── gamma-automation/          # Presentation automation example
│   └── README.md
│
├── ai-tool-configs/                   # AI coding assistants setup
│   ├── claude/                        # Claude configuration
│   ├── copilot/                       # GitHub Copilot setup
│   ├── cursor/                        # Cursor IDE setup
│   └── configs/                       # Test frameworks configs
│
├── github-references/                 # Curated external repos
│   └── repos/                         # By category
│
├── certification/                     # Certification framework
│   ├── CERTIFICATION-GUIDELINES.md
│   └── CERTIFICATION-TEMPLATE.md
│
├── prompts/                           # AI prompts library
│
└── README.md                          # This file
```

---

## Quick Start

### For Students

1. **Choose your course:**
   - [QA Automation with AI](./courses/🟢-production/QA-Automation-with-AI/) - Complete and ready
   - [Prompt Engineering Masterclass](./courses/🟢-production/Prompt-Engineering-Masterclass/) - Complete and ready

2. **Follow the course structure:**
   - Read the course README.md
   - Review SYLLABUS.md for curriculum overview
   - Complete modules in order
   - Build your final project

3. **Get support:**
   - Course-specific Slack channels
   - Office hours with instructors
   - Peer study groups

### For Instructors

1. **Review course materials:**
   - Course README.md for overview
   - SYLLABUS.md for complete breakdown
   - Module folders for detailed content

2. **Customize as needed:**
   - Add company-specific examples
   - Adjust timelines
   - Integrate internal tools

3. **Use documentation:**
   - [Course Creation Guide](./docs/guides/course-creation/)
   - [Assessment Guide](./docs/guides/assessment/)
   - [Quality Control Guide](./docs/guides/QUALITY-CONTROL.md)

---

## Tools & Technologies

All courses use **100% free tools**:

### Core Tools
- **Playwright** - Modern web automation
- **Postman** - API testing
- **GitHub Actions** - CI/CD automation
- **VS Code** - Code editor
- **Node.js** - JavaScript runtime
- **Git & GitHub** - Version control

### AI Tools
- **Claude Code** - AI coding assistant
- **GitHub Copilot** - AI pair programming
- **ChatGPT** - AI assistance
- **Cursor** - AI-powered IDE

---

## Course Philosophy

### Traditional + AI-Augmented

Our courses combine:

1. **Solid Fundamentals**
   - Industry-standard practices
   - Validated methodologies
   - Authoritative sources

2. **AI Integration**
   - AI-assisted development
   - Prompt engineering
   - Agentic design patterns
   - AI tool optimization

3. **Hands-On Learning**
   - Real-world projects
   - Practical exercises
   - Portfolio building
   - Job-ready skills

---

## Learning Outcomes

By completing our courses, you will:

- Master core technical skills
- Learn to leverage AI tools effectively
- Build professional portfolio projects
- Gain industry-recognized certifications
- Accelerate your career growth

---

## Documentation

### Key Resources

| Document | Description | Location |
|----------|-------------|----------|
| **Documentation Hub** | Central navigation for all docs | [docs/README.md](./docs/README.md) |
| **Course Creation Guide** | End-to-end course creation | [docs/guides/course-creation/](./docs/guides/course-creation/) |
| **Assessment Guide** | Assessment design & grading | [docs/guides/assessment/](./docs/guides/assessment/) |
| **Quality Control Guide** | Content quality standards | [docs/guides/QUALITY-CONTROL.md](./docs/guides/QUALITY-CONTROL.md) |
| **Course Templates** | Reusable course templates | [docs/templates/](./docs/templates/) |
| **Portfolio & Capabilities** | Course inventory & AI matrix | [docs/business/portfolio/](./docs/business/portfolio/) |

### Shared Resources

**AI Tool Configurations:** [`_shared/configs/`](./_shared/configs/)

Pre-configured setups for:
- Claude Code with CLAUDE.md templates
- GitHub Copilot agent configurations
- Cursor IDE settings
- Test framework configs (Jest, Playwright, pytest)

**Example Projects:** [`_shared/examples/`](./_shared/examples/)

Reference implementations available in course directories.

**Shared Templates:** [`_shared/templates/`](./_shared/templates/)

New course templates and scaffolding.

---

## Course Features

### Comprehensive Content
- Detailed curriculum with learning objectives
- Complete slide decks
- Hands-on labs with step-by-step instructions
- Code examples and templates
- Assessments and quizzes

### Quality Assurance
- Content validated against industry standards
- Proper citations and references
- Regular updates
- Tested with real students

### Instructor Support
- Detailed lesson plans with timing
- Answer keys and grading rubrics
- Troubleshooting guides
- Feedback templates

### AI Integration
- Prompt libraries for common tasks
- CLAUDE.md templates
- AI tool configuration guides
- Best practices for AI-assisted development

---

## Course Catalog

### Tier 1: Foundation Courses (Highest Priority)

| Course | Target | Duration | Status |
|--------|--------|----------|--------|
| **Prompt Engineering Masterclass** | Power Users | 16-20 hours | ✅ Production Ready |
| **Introduction to AI for Business Professionals** | Executives, Managers | 4 hours | In Progress |
| **AI Tools for Productivity** | All Employees | 8 hours | Planning |

### Tier 2: Technical Courses (Medium Priority)

| Course | Target | Duration | Status |
|--------|--------|----------|--------|
| **QA Automation with AI** | QA Engineers | 40-50 hours | ✅ Production Ready |
| **AI-Assisted Software Development** | Developers | 16 hours | In Progress |
| **Building AI-Powered Applications** | Developers | 24 hours | Planning |
| **QA Automation with AI (Advanced)** | QA Engineers | 16 hours | Planning |

### Tier 3: Specialized Courses (Lower Priority)

| Course | Target | Duration | Status |
|--------|--------|----------|--------|
| **AI for Customer Service Teams** | Support Teams | 8 hours | Planning |
| **AI for Marketing Teams** | Marketing | 8 hours | In Progress |
| **AI for Sales Teams** | Sales Reps | 4 hours | Planning |
| **AI Ethics and Governance** | Leadership, Compliance | 4 hours | Planning |

---

## Contributing

### Adding New Courses

We welcome new course contributions! See our documentation:

1. Review [Course Creation Guide](./docs/guides/course-creation/)
2. Use templates from [docs/templates/](./docs/templates/)
3. Follow the established format
4. Include all required components
5. Submit for review

### Improving Existing Courses

Found an issue or have a suggestion?

1. Open an issue describing the improvement
2. Propose changes via pull request
3. Include before/after examples
4. Explain the benefit

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## Support

### For Students
- **Course Slack:** #[course-name]
- **Office Hours:** Check course schedule
- **Email:** training@ai-whisperers.com

### For Instructors
- **Support Email:** instructors@ai-whisperers.com

---

## License

MIT License - See [LICENSE](./LICENSE) file

All course content is provided for educational purposes.

---

## Certifications

Upon successful course completion, receive:
- Course-specific certification
- LinkedIn skill badge
- Portfolio project
- Professional recognition

See [certification/](./certification/) for details.

---

## Repository Statistics

### Production-Ready Courses
- **QA Automation with AI:** ✅ 12 modules complete and tested
  - Only course verified as production-ready
  - Comprehensive content with real student validation

### FPUNA 2026 Program Status (Accurate)

**See [HONEST-STATUS-REPORT.md](./HONEST-STATUS-REPORT.md) for authoritative status**

**Overall:** ~30-40% complete (Target: Q2 2026)

**Track Status**:
- ✅ Core Foundation (00): ~70% complete (6 modules, mostly done)
- 🟡 Software Development (01): ~40% complete (5 core + 10 specialization modules)
- ✅ Electronics & Automation (02): ~80% complete (5 modules)
- 🟡 Aeronautical Engineering (03): ~50% complete (5 modules, 3 recently renamed to Spanish)
- ✅ Marketing & Communication (04): ~70% complete (5 modules)
- 🟡 Research & Academia (05): ~50% complete (5 modules, 4 recently renamed to Spanish)
- 🟡 Hospitality & Tourism (06): ~40% complete (4 modules)

**Recent Quality Improvements (January 2026)**:
- ✅ Fixed 17 TODO placeholders in critical modules
- ✅ Standardized 16 file names to Spanish (95% consistency)
- ✅ Consolidated instructor guides (removed 1 duplicate)
- ✅ Created honest status reporting standards

### Development Pipeline
- **Production Ready:** 2 courses (QA Automation, Prompt Engineering Masterclass)
- **In Active Development:** 1 course (FPUNA 2026)
- **Planning Stage:** 9 courses (various completion levels)
- **Total Portfolio:** 13 courses (2 production-ready, 11 in development)

### Resources
- **AI Agent Capabilities:** 532 documented agents across 8 domains
- **Presentation Templates:** 9 professional slide decks
- **Exercise Labs:** 24+ hands-on labs with quizzes
- **AI Prompts:** 50+ tested prompts
- **Reference Repos:** 50+ curated repositories

---

## Our Mission

**Empowering professionals with practical skills to succeed in the AI-augmented future.**

We believe in:
- **Quality education** accessible to all
- **Practical skills** over theory alone
- **AI augmentation** not replacement
- **Continuous learning** and improvement
- **Community support** and collaboration

---

## Updates & Maintenance

**Last Updated:** January 16, 2026  
**Version:** 6.0 (Quality Crisis Resolution - Honesty First)  
**Next Review:** February 2026

**Recent Changes (January 16, 2026):**
- 🎓 **NEW PRODUCTION COURSE:** Prompt Engineering Masterclass (6 modules, 20,600+ lines) - 2nd production-ready course
- ✅ **Complete Instructor Materials:** 6 solution guides, 6 quizzes with answer keys, final project package
- ✅ **Repository Statistics Updated:** 2 production-ready courses (was 1)
- 📊 **Course Catalog Reorganized:** Moved Prompt Engineering from "Planning" to "Production Ready"

**Changes (January 15-16, 2026):**
- 🎯 **Quality Crisis Resolution:** Addressed "brutal critique" findings systematically
- ✅ **Honest Status Reporting:** Created [HONEST-STATUS-REPORT.md](./HONEST-STATUS-REPORT.md) - FPUNA 30-40% complete (not 95%)
- ✅ **Placeholder Content Fixed:** Implemented 17 TODO placeholders across 6 critical modules
- ✅ **Language Consistency:** Standardized 16 files to Spanish (70% → 95% consistency)
- ✅ **Documentation Cleanup:** Consolidated 3 instructor guides to 2 + navigation
- ✅ **Quality Standards:** Added honest expectations to [CONTRIBUTING.md](./CONTRIBUTING.md)
- ✅ **Repository Hygiene:** Removed Python cache, cleaned archive directory
- 📊 **Metrics Updated:** Statistics now reflect reality, not optimistic projections

**Previous Changes (November 2025):**
- Reorganized courses into courses/ directory
- Moved frameworks and history to docs/
- Updated all documentation links
- Enhanced course catalog with status tracking
- Added documentation hub at docs/README.md

---

## Related Resources

### AI Whisperers Organization
- [Company Information](https://github.com/Ai-Whisperers/Company-Information)
- [AI Whisperers Website](https://github.com/Ai-Whisperers/AI-Whisperers-Website)

### External Documentation
- [Playwright Documentation](https://playwright.dev)
- [Postman Learning Center](https://learning.postman.com)
- [GitHub Actions Documentation](https://docs.github.com/actions)

---

## Feedback

We value your feedback!

- **Course Feedback:** Use in-course surveys
- **Bug Reports:** Open GitHub issues
- **Feature Requests:** Discussion board
- **General Inquiries:** contact@ai-whisperers.com

---

**Ready to start learning?** Choose your course above and begin your journey!

---

*Created and maintained by AI Whisperers - Building the future of AI-augmented professionals*
