# Module 8: Project Brief
## AI-Assisted Development Capstone

---

## Overview

Build a complete feature or tool using AI-assisted development techniques. This capstone project demonstrates your mastery of all course concepts.

| Attribute | Details |
|-----------|---------|
| **Duration** | 3 hours |
| **Team Size** | Individual |
| **Tools Required** | GitHub Copilot, Claude or ChatGPT, VS Code |

---

## Project Options

Choose ONE of the following project options:

---

## Option A: Task Management API

### Description
Build a REST API for a task management system with user authentication.

### Requirements

**Functional:**
- User registration and login (JWT authentication)
- CRUD operations for tasks
- Task categories/labels
- Due date tracking
- Task assignment to users
- Search and filtering

**Technical:**
- Node.js/Express or Python/FastAPI
- PostgreSQL or MongoDB
- Input validation
- Error handling
- Rate limiting

### Minimum Deliverables
- 8+ API endpoints
- Authentication middleware
- Database schema/migrations
- Unit tests (70%+ coverage)
- API documentation (OpenAPI/Swagger)

### Stretch Goals
- Real-time notifications (WebSocket)
- Task comments
- File attachments
- Export to CSV

---

## Option B: Code Review Bot

### Description
Create a CLI tool or GitHub Action that reviews code using AI.

### Requirements

**Functional:**
- Analyze code for common issues
- Suggest improvements
- Check coding standards
- Generate review comments
- Support multiple file types

**Technical:**
- TypeScript or Python
- CLI interface (Commander/Click)
- GitHub API integration
- Configurable rules
- Output formats (console, JSON, markdown)

### Minimum Deliverables
- Working CLI tool
- Configuration file support
- 5+ analysis rules
- Unit tests
- README with examples

### Stretch Goals
- GitHub Action version
- VS Code extension
- Custom rule creation
- Integration with CI/CD

---

## Option C: Documentation Generator

### Description
Build a tool that generates documentation from code using AI.

### Requirements

**Functional:**
- Parse source code
- Generate JSDoc/docstrings
- Create README sections
- Generate API reference
- Support TypeScript/Python

**Technical:**
- AST parsing
- Template system
- AI integration for descriptions
- Multiple output formats

### Minimum Deliverables
- Code parser
- Documentation templates
- AI-enhanced descriptions
- CLI interface
- Example outputs

### Stretch Goals
- Watch mode for changes
- Custom templates
- Multiple language support
- Integration with existing docs

---

## Option D: Legacy Code Refactoring

### Description
Take provided legacy code and modernize it using AI assistance.

### Starting Code
Use the provided legacy codebase (see `legacy-code/` folder) or bring your own (requires instructor approval).

### Requirements

**Refactoring:**
- Identify and fix code smells
- Apply appropriate design patterns
- Improve error handling
- Add input validation
- Optimize performance

**Documentation:**
- Document all changes
- Explain pattern choices
- Before/after comparisons
- Architecture Decision Records

### Minimum Deliverables
- Refactored codebase
- 5+ design patterns applied
- 80%+ test coverage
- ADRs for major decisions
- Change documentation

### Stretch Goals
- Performance benchmarks
- Migration guide
- Automated refactoring rules
- Video walkthrough

---

## Project Timeline

### Phase 1: Planning (30 minutes)

**Tasks:**
1. Select project option
2. Review requirements
3. Create implementation plan using AI
4. Set up development environment

**AI Usage:**
- Use Claude/ChatGPT for architecture design
- Generate project structure
- Create initial task breakdown

**Deliverable:** Project plan document

### Phase 2: Development (90 minutes)

**Tasks:**
1. Implement core functionality
2. Use Copilot for code completion
3. Apply security best practices
4. Generate tests alongside code

**AI Usage:**
- GitHub Copilot for code generation
- AI chat for debugging
- Test generation with AI

**Deliverable:** Working code with tests

### Phase 3: Quality Assurance (30 minutes)

**Tasks:**
1. Run all tests
2. Execute security scans
3. Fix any issues
4. Performance validation

**AI Usage:**
- AI-assisted debugging
- Security review with AI
- Test coverage analysis

**Deliverable:** Clean test/scan results

### Phase 4: Documentation (20 minutes)

**Tasks:**
1. Generate README
2. Create API docs (if applicable)
3. Document AI usage
4. Write setup instructions

**AI Usage:**
- AI-generated documentation
- README generation
- JSDoc/docstring generation

**Deliverable:** Complete documentation

### Phase 5: Presentation (10 minutes)

**Tasks:**
1. Prepare demo
2. Create summary slides (optional)
3. Present to group
4. Q&A

**Deliverable:** Completed presentation

---

## Technical Requirements

### Code Quality
- [ ] Follows project style guide
- [ ] No linting errors
- [ ] TypeScript strict mode (if applicable)
- [ ] Proper error handling
- [ ] No hardcoded secrets

### Testing
- [ ] Unit tests present
- [ ] Integration tests (if applicable)
- [ ] 70%+ code coverage
- [ ] All tests passing

### Security
- [ ] Input validation implemented
- [ ] Authentication secure (if applicable)
- [ ] No secrets in code
- [ ] Security scan passes

### Documentation
- [ ] README complete
- [ ] Setup instructions work
- [ ] API documented
- [ ] Code comments where needed

---

## AI Usage Documentation

Document your AI usage throughout the project:

```markdown
# AI Usage Log

## Planning Phase
- Tool: Claude
- Purpose: Architecture design
- Outcome: Initial system design document

## Development Phase
- Tool: GitHub Copilot
- Purpose: Code completion for API endpoints
- Acceptance Rate: ~75%
- Notable Assists: [describe]

## Testing Phase
- Tool: Claude
- Purpose: Test case generation
- Coverage Achieved: [percentage]

## Documentation Phase
- Tool: GitHub Copilot
- Purpose: JSDoc generation
- Modifications Made: [describe]

## Lessons Learned
[What worked, what didn't, what you'd do differently]
```

---

## Submission Requirements

### Code Repository
- Clean git history
- Meaningful commit messages
- No sensitive data
- README in root

### Documentation Folder
- `docs/architecture.md`
- `docs/ai-usage.md`
- `docs/api.md` (if applicable)

### Presentation Materials
- Demo script
- Key talking points
- Lessons learned summary

---

## Evaluation Preview

| Category | Weight | Key Criteria |
|----------|--------|--------------|
| Technical Excellence | 40% | Quality, tests, security |
| AI Utilization | 30% | Effective use, productivity |
| Documentation | 15% | Completeness, clarity |
| Presentation | 15% | Communication, reflection |

See **02-GRADING-RUBRIC.md** for detailed evaluation criteria.

---

## Resources

### Provided Materials
- Legacy codebase (for Option D)
- API testing templates
- Documentation templates
- Security scan configuration

### Recommended References
- Course slide decks
- Code examples from modules
- AI prompting guides
- Security checklists

---

## Getting Help

During the capstone:
- Instructor available for clarification
- AI tools for technical help
- Time checks at each phase
- No collaboration between participants

---

## Tips for Success

1. **Start with a plan** - Use AI to create a solid architecture
2. **Work incrementally** - Build and test in small pieces
3. **Don't over-engineer** - Focus on requirements
4. **Document as you go** - Don't leave it for the end
5. **Test early** - Generate tests alongside code
6. **Track your AI usage** - You'll need it for the report
7. **Manage time** - Stay aware of phase deadlines
8. **Ask for help** - If stuck, ask early

---

**Good luck! Demonstrate what you've learned.**

---

*Module 8 Project Brief*
*AI-Assisted Software Development Course*
