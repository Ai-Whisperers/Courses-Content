# Capstone Project Evaluation Rubric
## FPUNA Summer 2026 - Detailed Grading Criteria

**Total Points**: 100  
**Pass Threshold**: 70 points

---

## Overview

This rubric provides detailed evaluation criteria for both QA and Web track capstone projects. Instructors will use this to grade projects consistently and fairly.

---

## Section 1: Technical Implementation (30 points)

### Code Quality (15 points)

**Exceptional (13-15 points)**:
- Code is clean, well-organized, and follows best practices consistently
- TypeScript types are comprehensive and accurate
- No code smells or anti-patterns
- Excellent separation of concerns
- Consistent naming conventions
- DRY principles applied throughout
- Code is self-documenting with minimal comments needed

**Excellent (11-12 points)**:
- Code is clean and well-organized
- Good TypeScript usage with few any types
- Minor code smells exist but don't impact functionality
- Good separation of concerns
- Consistent naming with minor exceptions
- Some code duplication exists

**Good (9-10 points)**:
- Code is generally organized
- TypeScript used but with several any types
- Some code smells and anti-patterns present
- Basic separation of concerns
- Naming is mostly consistent
- Noticeable code duplication

**Satisfactory (7-8 points)**:
- Code works but lacks organization
- Limited TypeScript usage, many any types
- Multiple code smells
- Poor separation of concerns
- Inconsistent naming
- Significant code duplication

**Needs Improvement (0-6 points)**:
- Disorganized code
- TypeScript barely used
- Major code smells throughout
- No separation of concerns
- Inconsistent or poor naming
- Heavy code duplication

---

### Architecture & Design (15 points)

**QA Track Focus**:
- Test framework architecture
- Page Object Model design
- Fixture organization
- Utility module structure
- Test data management

**Web Track Focus**:
- Frontend architecture
- API design
- Database schema design
- Component organization
- State management

**Exceptional (13-15 points)**:
- Excellent architectural decisions with clear justification
- Scalable and maintainable design
- Proper abstraction layers
- Well-designed patterns (POM for QA, Component structure for Web)
- Clear separation between layers
- Future-proof design choices

**Excellent (11-12 points)**:
- Good architectural decisions
- Scalable design with minor limitations
- Good abstraction layers
- Solid pattern implementation
- Good layer separation
- Mostly future-proof

**Good (9-10 points)**:
- Reasonable architectural decisions
- Design works but has scalability concerns
- Basic abstraction
- Pattern implementation with gaps
- Adequate layer separation
- Some future-proofing

**Satisfactory (7-8 points)**:
- Basic architecture in place
- Limited scalability
- Minimal abstraction
- Pattern implementation incomplete
- Poor layer separation
- Little consideration for future

**Needs Improvement (0-6 points)**:
- Poor or no clear architecture
- Not scalable
- No abstraction
- Patterns misused or absent
- No layer separation
- No future consideration

---

## Section 2: Functionality (20 points)

### Feature Completeness (12 points)

**Exceptional (11-12 points)**:
- All required features implemented and working perfectly
- Additional features beyond requirements
- No critical bugs
- Edge cases handled gracefully
- Error handling comprehensive

**Excellent (9-10 points)**:
- All required features implemented
- Working correctly with minor bugs
- Most edge cases handled
- Good error handling

**Good (7-8 points)**:
- Most required features implemented
- Working with some bugs
- Some edge cases handled
- Basic error handling

**Satisfactory (5-6 points)**:
- Some required features missing
- Several bugs present
- Edge cases not handled
- Minimal error handling

**Needs Improvement (0-4 points)**:
- Many required features missing or broken
- Numerous bugs
- No edge case handling
- Poor or no error handling

---

### User Experience (8 points) - Web Track / Test Coverage (8 points) - QA Track

**Web Track - User Experience**:

**Exceptional (7-8 points)**:
- Intuitive and polished UI
- Excellent responsiveness (mobile/tablet/desktop)
- Fast loading times (< 2 seconds)
- Smooth interactions and transitions
- Accessible (WCAG 2.1 AA compliant)
- Professional visual design

**Excellent (6 points)**:
- Good UI with minor UX issues
- Responsive across devices
- Good loading times (< 3 seconds)
- Smooth interactions
- Mostly accessible
- Clean visual design

**Good (5 points)**:
- Adequate UI with several UX issues
- Responsive on most devices
- Acceptable loading times
- Some janky interactions
- Basic accessibility
- Decent visual design

**Satisfactory (3-4 points)**:
- Basic UI with many UX issues
- Limited responsiveness
- Slow loading times
- Janky interactions
- Poor accessibility
- Inconsistent design

**Needs Improvement (0-2 points)**:
- Poor UI/UX
- Not responsive
- Very slow loading
- Broken interactions
- No accessibility
- Unprofessional design

---

**QA Track - Test Coverage**:

**Exceptional (7-8 points)**:
- 100+ comprehensive tests
- 95%+ code coverage
- All critical paths tested
- Edge cases and error scenarios covered
- Performance tests included
- Accessibility tests included
- Tests are stable (no flaky tests)

**Excellent (6 points)**:
- 80-99 tests
- 85-94% coverage
- Most critical paths tested
- Most edge cases covered
- Basic performance tests
- Some accessibility tests
- Minimal flaky tests

**Good (5 points)**:
- 60-79 tests
- 75-84% coverage
- Critical paths tested
- Some edge cases covered
- Performance tests attempted
- Few accessibility tests
- Some flaky tests

**Satisfactory (3-4 points)**:
- 40-59 tests
- 60-74% coverage
- Basic critical paths tested
- Limited edge cases
- No performance tests
- No accessibility tests
- Several flaky tests

**Needs Improvement (0-2 points)**:
- < 40 tests
- < 60% coverage
- Incomplete critical paths
- No edge cases
- No performance tests
- No accessibility tests
- Many flaky tests

---

## Section 3: Testing & Quality Assurance (15 points)

### Automated Testing (10 points)

**QA Track**:
- Quality of test framework
- Test stability and reliability
- CI/CD integration
- Test reporting

**Web Track**:
- Basic E2E tests for critical paths
- API endpoint tests
- CI/CD integration

**Exceptional (9-10 points)**:
- Comprehensive automated tests
- All tests passing consistently
- Excellent CI/CD integration
- Professional test reports
- Fast test execution

**Excellent (7-8 points)**:
- Good automated tests
- Tests passing with rare failures
- Good CI/CD integration
- Clear test reports
- Reasonable test execution time

**Good (5-6 points)**:
- Basic automated tests
- Tests passing with occasional failures
- Basic CI/CD integration
- Adequate test reports
- Slow test execution

**Satisfactory (3-4 points)**:
- Minimal automated tests
- Tests often failing
- Limited CI/CD
- Basic reports
- Very slow tests

**Needs Improvement (0-2 points)**:
- No or very few automated tests
- Tests not working
- No CI/CD
- No reports
- Tests don't run

---

### Code Quality Tools (5 points)

**Exceptional (5 points)**:
- ESLint configured and passing
- Prettier formatted
- TypeScript strict mode
- Pre-commit hooks configured
- All quality checks passing in CI

**Excellent (4 points)**:
- ESLint configured with minor warnings
- Code formatted
- TypeScript with some strict checks
- Most quality checks passing

**Good (3 points)**:
- ESLint configured with warnings
- Inconsistent formatting
- Basic TypeScript
- Some quality checks

**Satisfactory (2 points)**:
- ESLint partially configured
- Poor formatting
- Minimal TypeScript checks
- Few quality checks

**Needs Improvement (0-1 points)**:
- No ESLint
- No formatting
- No TypeScript checks
- No quality checks

---

## Section 4: Deployment & Operations (10 points)

### Production Deployment (6 points)

**Exceptional (6 points)**:
- Deployed to production (Vercel/similar)
- Custom domain configured (optional but impressive)
- HTTPS enabled
- Environment variables properly configured
- Database properly hosted
- Zero downtime during updates
- CDN configured for assets

**Excellent (5 points)**:
- Deployed to production
- HTTPS enabled
- Environment variables configured
- Database hosted
- Minimal downtime

**Good (4 points)**:
- Deployed to production
- HTTPS enabled
- Basic configuration
- Database works
- Some downtime acceptable

**Satisfactory (3 points)**:
- Deployed but issues present
- Configuration incomplete
- Database unstable
- Frequent downtime

**Needs Improvement (0-2 points)**:
- Not deployed or severely broken
- Major configuration issues
- Database not working
- Constant downtime

---

### Monitoring & Error Tracking (4 points)

**Exceptional (4 points)**:
- Sentry configured and working
- Error alerts set up
- Vercel Analytics integrated
- Performance monitoring in place
- Logs accessible and organized
- Dashboards created

**Excellent (3 points)**:
- Error tracking configured
- Basic alerts
- Analytics working
- Some performance monitoring
- Logs accessible

**Good (2 points)**:
- Basic error tracking
- Limited analytics
- Logs available
- Minimal monitoring

**Satisfactory (1 point)**:
- Minimal error tracking
- No analytics
- Poor logging
- No monitoring

**Needs Improvement (0 points)**:
- No error tracking
- No analytics
- No logs
- No monitoring

---

## Section 5: Documentation (10 points)

### Code Documentation (3 points)

**Exceptional (3 points)**:
- All complex functions documented
- TSDoc comments where appropriate
- Clear inline comments explaining why, not what
- README explains architecture
- API endpoints documented

**Excellent (2.5 points)**:
- Most functions documented
- Good inline comments
- README explains structure
- API partially documented

**Good (2 points)**:
- Some documentation
- Basic comments
- README present
- Minimal API docs

**Satisfactory (1 point)**:
- Minimal documentation
- Few comments
- Basic README
- No API docs

**Needs Improvement (0 points)**:
- No documentation
- No comments
- No or poor README
- No API docs

---

### Technical Documentation (4 points)

**Required Documents**: README.md, ARCHITECTURE.md, API.md (Web) / TEST-PLAN.md (QA), DEPLOYMENT.md

**Exceptional (4 points)**:
- All required documents present and comprehensive
- Clear diagrams and examples
- Easy for new developers to understand
- Deployment guide complete
- Troubleshooting section included

**Excellent (3 points)**:
- All required documents present
- Good explanations
- Mostly clear for new developers
- Deployment guide present

**Good (2 points)**:
- Most documents present
- Adequate explanations
- Somewhat clear
- Basic deployment info

**Satisfactory (1 point)**:
- Some documents missing
- Minimal explanations
- Confusing for new developers
- Incomplete deployment info

**Needs Improvement (0 points)**:
- Most documents missing
- Poor or no explanations
- Not usable
- No deployment info

---

### Development Journal (3 points)

**Exceptional (3 points)**:
- JOURNAL.md present with daily/feature updates
- Challenges documented with solutions
- Decision rationale explained
- Time tracking included
- Lessons learned section

**Excellent (2.5 points)**:
- Journal present with regular updates
- Main challenges documented
- Some decision rationale
- Basic time tracking

**Good (2 points)**:
- Journal present with some updates
- Some challenges mentioned
- Minimal rationale
- No time tracking

**Satisfactory (1 point)**:
- Journal present but sparse
- Few details
- No rationale
- No tracking

**Needs Improvement (0 points)**:
- No journal
- No development documentation

---

## Section 6: OpenCode Usage & AI Augmentation (10 points)

### Effective AI Integration (6 points)

**Exceptional (6 points)**:
- OpenCode used extensively throughout project
- All major prompts documented
- Clear time savings demonstrated (50%+ faster)
- AI-generated code properly reviewed and refined
- Creative problem-solving with AI assistance
- Prompt library created for reuse

**Excellent (5 points)**:
- Good OpenCode usage
- Most prompts documented
- Significant time savings (30-49%)
- AI code reviewed
- Good AI integration

**Good (4 points)**:
- Moderate OpenCode usage
- Some prompts documented
- Noticeable time savings (15-29%)
- AI code mostly reviewed
- Adequate integration

**Satisfactory (3 points)**:
- Limited OpenCode usage
- Few prompts documented
- Minimal time savings
- AI code not always reviewed
- Basic integration

**Needs Improvement (0-2 points)**:
- Minimal or no OpenCode usage
- No documentation
- No time savings shown
- Poor AI integration

---

### AI Usage Report (4 points)

**Required**: Document showing AI assistance

**Exceptional (4 points)**:
- Comprehensive report of all AI usage
- Specific prompts shared
- Before/after code comparisons
- Time savings calculated
- Analysis of AI effectiveness
- Recommendations for future use

**Excellent (3 points)**:
- Good report of AI usage
- Main prompts shared
- Some comparisons
- Time savings estimated
- Good analysis

**Good (2 points)**:
- Basic report
- Some prompts shared
- Limited comparisons
- Time savings mentioned
- Basic analysis

**Satisfactory (1 point)**:
- Minimal report
- Few prompts
- No comparisons
- No time savings data
- Weak analysis

**Needs Improvement (0 points)**:
- No report
- No prompt documentation
- No analysis

---

## Section 7: Presentation (5 points)

### Presentation Content (3 points)

**Exceptional (3 points)**:
- Clear, engaging 10-minute presentation
- All required topics covered (overview, architecture, challenges, learnings)
- Professional slides
- Excellent speaking skills
- Good time management
- Handles Q&A confidently

**Excellent (2.5 points)**:
- Good presentation
- All topics covered
- Clear slides
- Good speaking
- Good timing
- Handles questions well

**Good (2 points)**:
- Adequate presentation
- Most topics covered
- Basic slides
- Acceptable speaking
- Timing okay
- Basic Q&A handling

**Satisfactory (1 point)**:
- Basic presentation
- Some topics missing
- Poor slides
- Unclear speaking
- Poor timing
- Struggles with Q&A

**Needs Improvement (0 points)**:
- Poor or no presentation
- Topics not covered
- No slides
- Unclear communication
- No time management
- Cannot answer questions

---

### Live Demo (2 points)

**Exceptional (2 points)**:
- Smooth, well-practiced demo
- Shows all major features
- No errors or bugs during demo
- Handles issues gracefully if they arise
- Explains features clearly while demonstrating

**Excellent (1.5 points)**:
- Good demo
- Shows main features
- Minor issues only
- Good explanations

**Good (1 point)**:
- Adequate demo
- Shows some features
- Some errors
- Basic explanations

**Satisfactory (0.5 points)**:
- Basic demo
- Limited features shown
- Multiple errors
- Poor explanations

**Needs Improvement (0 points)**:
- Demo doesn't work
- Cannot show features
- Too many errors
- No explanations

---

## Bonus Points (up to +5)

**Innovation & Excellence**:
- Exceptional creative solution (+2)
- Outstanding UI/UX design (+1)
- Advanced features beyond requirements (+1)
- Significant contribution to community (blog post, open source) (+1)
- Exceptional OpenCode integration case study (+1)

**Maximum Total Score**: 105 points

---

## Grade Conversion

| Points | Letter Grade | Description |
|--------|--------------|-------------|
| 95-105 | A+ | Exceptional |
| 90-94 | A | Excellent |
| 85-89 | A- | Very Good |
| 80-84 | B+ | Good |
| 75-79 | B | Above Average |
| 70-74 | B- | Average |
| 65-69 | C+ | Below Average |
| 60-64 | C | Minimum Pass |
| < 60 | F | Fail |

---

## Special Considerations

### Partial Credit
- Projects with major bugs can receive partial credit if:
  - Code quality is high
  - Documentation explains known issues
  - Plan for fixes is documented
  - Majority of features work

### Late Submission
- -10 points per day late
- Maximum 3 days late accepted
- After 3 days: automatic F

### Academic Integrity Violations
- Copying code: Automatic F + disciplinary action
- Plagiarized documentation: -20 points
- False AI usage claims: -10 points

---

## Instructor Notes

**Calibration**:
- Review sample projects before grading
- Discuss edge cases with other instructors
- Be consistent across all students

**Feedback**:
- Provide specific, actionable feedback
- Highlight strengths and areas for improvement
- Include examples of what good looks like

**Recording**:
- Document all scores in rubric
- Keep notes on decision rationale
- Archive projects for future reference

---

## Student Self-Assessment

Before submission, students should assess their project using this rubric and aim for:
- **Minimum**: 70 points to pass
- **Target**: 85+ points for excellent work
- **Stretch**: 95+ points for exceptional achievement

---

**This rubric ensures fair, consistent, and comprehensive evaluation of all capstone projects.**
