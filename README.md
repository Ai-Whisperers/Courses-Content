# AI Whisperers - Courses Content Repository

## Overview

Welcome to the **AI Whisperers Courses Content Repository**! This is your central hub for all professional training courses, combining traditional learning with AI-augmented development practices.

---

## Available Courses

### Primary Course (Production Ready)

#### QA Automation with AI Course

**Location:** [`courses/Technical-Development/QA-Automation-with-AI/`](./courses/Technical-Development/QA-Automation-with-AI/)

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

**Start Here:** [courses/Technical-Development/QA-Automation-with-AI/README.md](./courses/Technical-Development/QA-Automation-with-AI/README.md)

---

### FPUNA 2026 Summer Course (In Development) 🚧

#### AI-Augmented Development Program

**Location:** [`courses/Summer-Courses-University/FPUNA-2026/`](./courses/Summer-Courses-University/FPUNA-2026/)

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
- [📋 Master Plan](./courses/Summer-Courses-University/FPUNA-2026/PLAN-MAESTRO-TAREAS.md) - Detailed task tracking
- [📈 Previous Reports](./AUDIT-REPORTS/) - Historical context (NOTE: Contains optimistic estimates)

**Start Here:** [courses/Summer-Courses-University/FPUNA-2026/README.md](./courses/Summer-Courses-University/FPUNA-2026/README.md)

---

### Courses In Development

| Course | Status | Target Audience | Duration |
|--------|--------|-----------------|----------|
| [Introduction to AI for Business Professionals](./courses/Introduction-to-AI-for-Business-Professionals/) | In Progress | Executives, Managers | 4 hours |
| [AI-Assisted Software Development](./courses/AI-Assisted-Software-Development/) | In Progress | Developers | 16 hours |
| [AI for Marketing Teams](./courses/AI-for-Marketing-Teams/) | In Progress | Marketing | 8 hours |
| [Prompt Engineering Masterclass](./courses/Prompt-Engineering-Masterclass/) | Planning | Power Users | 4 hours |
| [AI Tools for Productivity](./courses/AI-Tools-for-Productivity/) | Planning | All Employees | 8 hours |
| [Building AI-Powered Applications](./courses/Building-AI-Powered-Applications/) | Planning | Developers | 24 hours |
| [QA Automation with AI (Advanced)](./courses/QA-Automation-with-AI-Advanced/) | Planning | QA Engineers | 16 hours |
| [AI for Customer Service Teams](./courses/AI-for-Customer-Service-Teams/) | Planning | Support Teams | 8 hours |
| [AI for Sales Teams](./courses/AI-for-Sales-Teams/) | Planning | Sales Reps | 4 hours |
| [AI Ethics and Governance](./courses/AI-Ethics-and-Governance/) | Planning | Leadership, Compliance | 4 hours |

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
   - [QA Automation with AI](./courses/QA-Automation-with-AI/) - Complete and ready

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
   - [Quality Control Checklist](./QUALITY-CONTROL-CHECKLIST.md)

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
| **Quality Control Checklist** | Content quality standards | [QUALITY-CONTROL-CHECKLIST.md](./QUALITY-CONTROL-CHECKLIST.md) |
| **Course Templates** | Reusable course templates | [docs/templates/](./docs/templates/) |
| **Portfolio & Capabilities** | Course inventory & AI matrix | [docs/business/portfolio/](./docs/business/portfolio/) |

### Shared Resources

**AI Tool Configurations:** [`ai-tool-configs/`](./ai-tool-configs/)

Pre-configured setups for:
- Claude Code with CLAUDE.md templates
- GitHub Copilot agent configurations
- Cursor IDE settings
- Test framework configs (Jest, Playwright, pytest)

**Example Projects:** [`shared-resources/example-projects/`](./shared-resources/example-projects/)

Reference implementations:
- **Gamma Automation** - Presentation creation automation

**GitHub References:** [`github-references/`](./github-references/)

Curated repositories organized by category:
- Agentic design patterns
- API testing examples
- Playwright boilerplates
- Page Object Model patterns
- CI/CD examples

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
| **Introduction to AI for Business Professionals** | Executives, Managers | 4 hours | In Progress |
| **AI Tools for Productivity** | All Employees | 8 hours | Planning |
| **Prompt Engineering Masterclass** | Power Users | 4 hours | Planning |

### Tier 2: Technical Courses (Medium Priority)

| Course | Target | Duration | Status |
|--------|--------|----------|--------|
| **QA Automation with AI** | QA Engineers | 12 modules | Complete |
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
- **Production Ready:** 1 course (QA Automation)
- **In Active Development:** 1 course (FPUNA 2026)
- **Planning Stage:** 10 courses (various completion levels)
- **Total Portfolio:** 13 courses (1 complete, 12 in various stages)

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

**Recent Changes (January 15-16, 2026):**
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
