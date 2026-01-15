# FPUNA 2026 - Instructor Guide
## Teaching AI-Augmented Development

**Program**: Summer 2026 - AI-Augmented Development  
**Audience**: FPUNA Faculty & Guest Instructors  
**Purpose**: Best practices for teaching this program

---

## Table of Contents

1. [Program Philosophy](#program-philosophy)
2. [Week 1: Core Foundation](#week-1-core-foundation)
3. [Week 2: Specialized Tracks](#week-2-specialized-tracks)
4. [Teaching Methodology](#teaching-methodology)
5. [Common Challenges](#common-challenges)
6. [Assessment Guidelines](#assessment-guidelines)
7. [Tools & Resources](#tools--resources)
8. [Student Support](#student-support)

---

## Program Philosophy

### Core Principle

**"AI-Augmented, Not AI-Replaced"**

Students learn to use AI as a powerful tool while maintaining:
- Deep understanding of fundamentals
- Critical thinking about AI outputs
- Ability to work without AI when needed
- Professional judgment and ethics

### Teaching Approach

```
Traditional:                AI-Augmented:
Read → Understand → Code    Understand → Prompt → Validate → Refine

❌ Passive learning         ✅ Active problem-solving
❌ Solo work               ✅ Human-AI collaboration  
❌ Slow iteration          ✅ Rapid prototyping
❌ Fear of mistakes        ✅ Learn through iteration
```

---

## Week 1: Core Foundation

### Day-by-Day Breakdown

#### Day 1-2: Installation & Configuration (4 hours)

**Objective**: All students have working OpenCode + OMO

**Structure**:
- Hour 1: Demo installation (instructor)
- Hour 2: Guided setup (students follow)
- Hour 3: Troubleshooting common issues
- Hour 4: Verification & first prompt

**Critical Success Factors**:
- ✅ Pre-download installers (slow WiFi)
- ✅ Have USB drives with installers
- ✅ Prepare for Windows/Mac differences
- ✅ Designate "tech helpers" among students
- ✅ Document every error encountered

**Common Issues**:
1. **Node.js version conflicts** - Uninstall old versions first
2. **PATH not updated** - Restart terminal/VS Code
3. **Permission errors** - Run as admin (Windows)
4. **Firewall blocks** - Whitelist OpenCode

**Instructor Tip**: Pair struggling students with those who finished early.

---

#### Day 3: Prompt Engineering (2 hours)

**Objective**: Write effective prompts that get good results

**Structure**:
- 30min: Bad vs Good prompts (examples)
- 30min: Anatomy of a great prompt
- 30min: Hands-on prompt writing
- 30min: Peer review & iteration

**Key Concepts to Cover**:

**Bad Prompt**:
```
Create a login page
```

**Good Prompt**:
```
Create a login page with the following requirements:

Tech Stack:
- React with TypeScript
- Tailwind CSS for styling
- React Hook Form for validation
- Zod for schema validation

Features:
- Email and password fields
- Remember me checkbox
- Forgot password link
- Show/hide password toggle
- Client-side validation
- Error messages in Spanish

Design:
- Centered card layout
- Blue color scheme (#3b82f6)
- Responsive (mobile-first)
- Accessible (WCAG AA)

Return only the component code with TypeScript types.
```

**Exercise**: Students transform 5 bad prompts into good ones

**Assessment**: Peer review in pairs

---

#### Day 4: Context Engineering (2 hours)

**Objective**: Provide AI with relevant context for better results

**Structure**:
- 30min: Why context matters
- 30min: Types of context (file, project, domain)
- 30min: Hands-on: Adding context
- 30min: Compare results with/without context

**Key Teaching Point**:

**Without Context**:
```
Write a function to calculate price
```

Result: Generic calculator, no business logic

**With Context**:
```
Project: E-commerce for Paraguay
Database: PostgreSQL with Prisma
Currency: Guaraníes (₲)
Tax: 10% IVA

Write a function to calculate final price including:
- Base price in ₲
- 10% IVA tax
- Optional discount percentage
- Return breakdown (subtotal, tax, discount, total)

Use TypeScript and Prisma types.
```

Result: Exactly what's needed, Paraguay-specific

**Exercise**: Students add context to 3 different scenarios

---

#### Day 5: Live Project Demo (2 hours)

**Objective**: See complete project built with AI in one session

**Format**: Instructor live codes entire project

**Project**: Simple TODO app with:
- Frontend (React)
- Backend (API)
- Database (Prisma)
- Deployed (Vercel)

**Teaching Strategy**:
1. **Show the problem** (5 min)
2. **Plan the solution** (10 min)
3. **Generate components** with AI (30 min)
4. **Fix issues** that arise (30 min)
5. **Deploy** to production (15 min)
6. **Q&A** (30 min)

**Key Messages**:
- AI makes mistakes → you validate
- Iterate quickly → don't aim for perfection
- Read generated code → understand it
- Deploy early → catch issues

**Instructor Tip**: Make intentional mistakes to show debugging process.

---

### Week 1 Success Criteria

By end of Week 1, students should be able to:
- ✅ Install and configure OpenCode + OMO
- ✅ Write effective prompts
- ✅ Provide useful context
- ✅ Generate code with AI
- ✅ Validate AI outputs
- ✅ Debug simple issues
- ✅ Deploy basic project

**If students can't do these, Week 2 will struggle.**

---

## Week 2: Specialized Tracks

### General Teaching Pattern (All Tracks)

#### Daily Structure (4 hours/day)

```
08:00-08:15  Recap previous day
08:15-09:00  New concept (lecture + demo)
09:00-10:00  Hands-on lab (students code)
10:00-10:15  Break
10:15-11:00  Advanced topic
11:00-12:00  Exercise + debugging help
```

---

### Track-Specific Guidance

#### Track 07: QA Automation ✅

**Complexity**: High  
**Student Background**: Mixed (some have tested, some haven't)

**Module 1 (Playwright Advanced)** - CRITICAL

This module has the most new concepts:
- Network mocking (abstract)
- Visual regression (new paradigm)
- Auth strategies (multiple approaches)

**Teaching Strategy**:
1. **Demo first** - Show working examples
2. **Explain why** - Why mock instead of real API?
3. **Hands-on** - Students break and fix tests
4. **Iterate** - Multiple small examples

**Common Struggle**: Async/await confusion

**Solution**: Dedicate 30 min to promises review if needed

**Module 2 (API Testing)** - BUILD CONFIDENCE

Students love this module (immediate results)

**Teaching Strategy**:
1. Use real API (JSONPlaceholder)
2. Show failures first (what not to do)
3. Build test suite incrementally
4. Celebrate passing tests

**Module 3 (Test Architecture)** - AVOID OVER-ENGINEERING

**Danger**: Students make POM too complex

**Teaching Strategy**:
1. Start simple (1 page object)
2. Show when to extract (repetition)
3. Refactor existing tests (don't start with POM)

**Module 4 (CI/CD)** - EXPECT DEBUGGING TIME

**Guaranteed**: Some students' CI will fail

**Teaching Strategy**:
1. Test locally first (always)
2. Check logs systematically
3. Common issues: secrets, permissions, timeouts
4. Pair students (debuggers + fixers)

**Module 5 (AI for QA)** - FUN MODULE

Students enjoy this most

**Teaching Strategy**:
1. Live AI test generation
2. Compare manual vs AI-generated
3. Show limitations (AI makes mistakes)
4. Emphasize validation

---

#### Track 08: Web Development ✅

**Complexity**: High  
**Student Background**: Varies widely

**Module 1 (Next.js Foundations)** - TAKE YOUR TIME

**Most important module** - foundation for everything

**Teaching Strategy**:
1. Use visual diagrams (Server vs Client)
2. Deploy immediately (motivation)
3. Live code examples
4. Allow full 4 hours

**Common Questions**:
- "When to use Server vs Client?" → Decision tree
- "Why App Router not Pages?" → Show benefits
- "Do I need to know React?" → Cover basics

**Module 2 (Full-Stack)** - HANDS-ON

**Prisma setup can be tricky**

**Teaching Strategy**:
1. Use Neon (avoid local PostgreSQL headaches)
2. Show schema visually
3. Generate client together (watch migrations)
4. CRUD operations one at a time

**Common Issues**:
- Connection strings (copy exactly)
- Schema errors (typos in model names)
- Migration conflicts (reset database if needed)

**Module 3 (Auth)** - SECURITY EMPHASIS

**Students skip security** - emphasize importance

**Teaching Strategy**:
1. Show attack scenarios (XSS, CSRF)
2. Explain why NextAuth exists
3. Live OAuth setup (Google)
4. Test thoroughly

**Module 4 (UI/UX)** - CREATIVE MODULE

**Students love designing**

**Teaching Strategy**:
1. Show professional examples
2. Tailwind live coding
3. shadcn/ui component tour
4. Let them experiment

**Module 5 (Deployment)** - VICTORY LAP

**End strong** - students deploy real app

**Teaching Strategy**:
1. Deploy early in session
2. Troubleshoot together
3. Celebrate going live
4. Share URLs in class

---

## Teaching Methodology

### Active Learning Techniques

#### 1. Live Coding (30% of time)

**Instructor codes while students watch**

**Best Practices**:
- Explain as you type
- Make intentional mistakes
- Use AI in real-time
- Show debugging process

**Example**:
```
Instructor: "Let's create a user profile component"
[Types prompt with AI]
Instructor: "Notice I'm including TypeScript and our design system"
[AI generates code]
Instructor: "This looks good, but... see this type error? Let's fix it"
[Debugs together]
Instructor: "Now it works. Your turn - modify it to add a bio field"
```

---

#### 2. Pair Programming (25% of time)

**Students code in pairs**

**Roles**:
- **Driver**: Types code
- **Navigator**: Guides, catches errors

**Switch every 15 minutes**

**Benefits**:
- Peer learning
- Less frustration
- Better code quality
- Social learning

---

#### 3. Code Review Sessions (15% of time)

**Review student code as a class**

**Format**:
1. Student shares screen
2. Explain their approach
3. Class suggests improvements
4. Refactor together

**Teaching Moment**: Show multiple valid solutions

---

#### 4. Debugging Workshops (10% of time)

**Intentionally break code, students fix**

**Examples**:
- Missing import
- Type error
- Async bug
- API endpoint typo

**Goal**: Build debugging confidence

---

#### 5. Mini-Presentations (10% of time)

**Students present their solutions**

**Format**: 5 min presentation, 5 min Q&A

**Benefits**:
- Communication skills
- Confidence building
- Learn from peers

---

#### 6. Independent Lab (10% of time)

**Students work solo on challenges**

**Instructor role**: Circulate, help individually

---

### Classroom Management

#### Physical Setup

**Ideal**:
```
┌─────────────────────────────────┐
│         Projector Screen         │
│                                  │
│    [Instructor Station]          │
│                                  │
│  [Student] [Student] [Student]   │
│  [Student] [Student] [Student]   │
│  [Student] [Student] [Student]   │
│                                  │
│  Power outlets every 2 seats     │
└─────────────────────────────────┘
```

**Requirements**:
- Projector (instructor demos)
- Power for every student
- Stable WiFi (test beforehand)
- Whiteboard (diagrams)

---

#### Pacing

**Energy Management**:

```
Hour 1: 🔥 High energy (new concepts)
Hour 2: 💪 Hands-on (active)
Hour 3: 😴 Break needed (⚠️ attention drops)
Hour 4: 🎯 Refocus (exercise, competition)
```

**Strategies**:
- Break at hour 2 (15 min)
- Vary activities (no 2-hour lectures)
- Movement (stand, pair up)
- Energizers (quick challenges)

---

## Common Challenges

### Challenge 1: Mixed Skill Levels

**Scenario**: Some students know React, others don't

**Solutions**:

**A) Tiered Exercises**
- Basic: Complete the TODO list
- Intermediate: Add user authentication
- Advanced: Implement real-time updates

**B) Peer Mentoring**
- Pair advanced with beginners
- Rotate pairs daily
- Recognize helpers publicly

**C) Pre-Work**
- Send prep materials week before
- Optional "catch-up" session (Saturday)
- Self-paced online modules

---

### Challenge 2: Students Copy-Paste Without Understanding

**Symptoms**:
- Can't explain their code
- Can't modify it
- Breaks when small change needed

**Prevention**:

**A) Code Walkthroughs**
```
Instructor: "Explain line 23 to me"
Student: "Um... it's a function?"
Instructor: "What does it do?"
Student: "Not sure"
→ Stop. Explain concept.
```

**B) No-AI Challenges**
- One exercise per module: No AI allowed
- Reinforces fundamentals
- Proves understanding

**C) Code Review Requirement**
- Before submitting, explain to peer
- If can't explain, doesn't count

---

### Challenge 3: AI Generates Wrong Code

**This WILL happen** - embrace it

**Teaching Opportunity**:

```
Student: "The AI gave me an error"
Instructor: "Perfect! What's the error?"
Student: "Type 'string' not assignable to 'number'"
Instructor: "What do you think is wrong?"
[Teach debugging, not just fixing]
```

**Key Message**: **AI is a tool, you're the engineer**

---

### Challenge 4: Students Fall Behind

**Prevention**:
- Daily check-ins
- Track exercise completion
- Offer office hours

**Intervention** (if student struggles):

1. **Identify gap** - What specific concept?
2. **1-on-1 session** - 15 min focused help
3. **Pair with strong student** - Peer teaching
4. **Optional review session** - After class

**Never**: Let students fall too far behind (Week 2 builds on Week 1)

---

### Challenge 5: Overconfidence

**Scenario**: Student thinks AI does everything, skips learning

**Warning Signs**:
- Submits AI code without testing
- Doesn't read error messages
- Frustrated when AI doesn't work

**Intervention**:

**A) Reality Check**
```
"Okay, close AI tools. Debug this error without AI."
[Student struggles]
"This is why we learn fundamentals."
```

**B) No-AI Quiz**
- Test basic concepts without AI
- Proves knowledge gaps
- Motivates learning

---

## Assessment Guidelines

### Philosophy

**Assess understanding, not memorization**

```
❌ Bad: "What's the syntax for useState?"
✅ Good: "Add a counter to this component"

❌ Bad: "Define Server Component"
✅ Good: "When would you use Server vs Client?"
```

### Exercise Grading

**Use Rubrics** (see ASSESSMENT-FRAMEWORK.md)

**Quick Rubric Template**:

| Criteria | Points | What to Look For |
|----------|--------|------------------|
| **Functionality** | 40% | Does it work? All features? |
| **Code Quality** | 25% | Readable? Organized? Typed? |
| **Best Practices** | 20% | Follows conventions? |
| **Documentation** | 15% | Comments? README? |

**Grading Tips**:
- Grade in batches (consistency)
- Use comments (feedback)
- Show example solutions after deadline
- Allow revisions (learning opportunity)

---

### Capstone Grading

**More rigorous** - portfolio piece

**Rubric** (100 points):
- Functionality: 50 points
- Code Quality: 15 points
- Testing: 10 points (if applicable)
- Documentation: 10 points
- Deployment: 10 points
- Presentation: 5 points

**Evaluation Process**:
1. Clone repository
2. Follow setup instructions
3. Test all features
4. Review code
5. Watch presentation
6. Calculate score

**Time**: ~30 min per project

---

### Academic Integrity

**AI makes plagiarism tricky**

**Clear Rules**:
✅ **Allowed**:
- Using AI to generate starter code
- AI for debugging help
- AI for explaining concepts
- AI for code suggestions

❌ **Not Allowed**:
- Copying another student's code
- Submitting AI code you don't understand
- Using AI during no-AI assessments
- Plagiarizing online tutorials

**Detection**:
- Ask students to explain their code
- Live coding sessions
- Unique prompts per student
- Code review presentations

**Penalty**: Case-by-case, but typically:
- 1st offense: Warning + redo
- 2nd offense: Zero + meeting
- 3rd offense: Course failure

---

## Tools & Resources

### Must-Have Tools (Instructor)

1. **OpenCode** - Use in live demos
2. **VS Code** - Primary IDE
3. **Git/GitHub** - Version control
4. **Screen sharing** - Show students
5. **Recording software** - Capture sessions (optional)

### Helpful Resources

**For Live Coding**:
- Have starter templates ready
- Bookmark common docs
- Save frequent prompts
- Keep error solutions handy

**For Student Help**:
- Common errors document
- Setup troubleshooting guide
- Link collection (docs, tutorials)
- Example projects

---

## Student Support

### Office Hours

**Format**: Drop-in or scheduled

**Structure**:
- 15 min slots
- Specific questions (not "I'm lost")
- Come with code ready
- Take notes

**Instructor Approach**:
- Don't solve for them (guide)
- Ask questions (Socratic method)
- Show similar examples
- Encourage persistence

---

### Slack/Discord Support

**Channels**:
- `#general` - Announcements
- `#week1-help` - Core foundation questions
- `#track-07-qa` - QA track specific
- `#track-08-web` - Web dev specific
- `#capstone` - Final project help
- `#random` - Off-topic

**Guidelines**:
- Check channel before asking (avoid duplicates)
- Include error messages (full text)
- Share code (GitHub gist, not screenshots)
- Help each other (peer support)

**Instructor Role**:
- Monitor daily
- Answer within 24h
- Encourage peer answers
- Pin important messages

---

### Mental Health & Wellbeing

**Intensive programs are stressful**

**Watch For**:
- Student isolation
- Excessive frustration
- Giving up early
- Perfectionism paralysis

**Support**:
- Normalize struggle ("Everyone finds this hard")
- Celebrate small wins
- Encourage breaks
- Provide perspective

**Resources**:
- FPUNA counseling services
- Study groups
- Peer mentors
- Instructor check-ins

---

## Week-by-Week Instructor Checklist

### Week 0 (Before Course)

- [ ] Review all track materials
- [ ] Test all code examples
- [ ] Set up demo environments
- [ ] Prepare installation USBs
- [ ] Create Slack workspace
- [ ] Send welcome email to students
- [ ] Test classroom tech (projector, WiFi)

### Week 1 (Core Foundation)

- [ ] Day 1: Installation support ready
- [ ] Day 2: Configuration helpers assigned
- [ ] Day 3: Prompt examples prepared
- [ ] Day 4: Context scenarios ready
- [ ] Day 5: Live demo rehearsed
- [ ] Daily: Check student progress

### Week 2 (Specialized Tracks)

- [ ] Monday: Module 01 prep
- [ ] Tuesday: Module 02 prep
- [ ] Wednesday: Module 03 prep
- [ ] Thursday: Module 04 prep
- [ ] Friday: Module 05 prep + Capstone kickoff
- [ ] Daily: Grade exercises, provide feedback

### Week 3 (Capstone)

- [ ] Monday: Check-in meetings
- [ ] Wednesday: Progress reviews
- [ ] Friday: Final submissions
- [ ] Weekend: Grade projects

### Week 4 (Wrap-Up)

- [ ] Provide grades
- [ ] Issue certificates
- [ ] Collect feedback
- [ ] Plan improvements

---

## Final Tips for Success

### Do's ✅

- **Be enthusiastic** - Energy is contagious
- **Admit when you don't know** - Model learning
- **Use real examples** - Paraguay context
- **Celebrate wins** - Build confidence
- **Iterate based on feedback** - Improve daily
- **Connect to jobs** - Show career paths

### Don'ts ❌

- **Don't lecture for 2 hours** - Vary activities
- **Don't skip breaks** - Energy management
- **Don't ignore struggling students** - Intervene early
- **Don't over-complicate** - Keep it practical
- **Don't forget to have fun** - Enjoy teaching!

---

## Contact & Support

**For Instructors**:
- Program Coordinator: [coordinator@fpuna.edu.py]
- Technical Support: [tech-support@fpuna.edu.py]
- Instructor Slack: #instructors-private

**Instructor Office Hours**:
- Tuesday: 2:00 PM - 4:00 PM
- Thursday: 2:00 PM - 4:00 PM

---

## Continuous Improvement

### After Each Cohort

1. **Collect feedback** (students + self-reflection)
2. **Identify pain points** (what struggled?)
3. **Update materials** (fix errors, add clarifications)
4. **Share learnings** (instructor community)
5. **Document improvements** (for next cohort)

**Remember**: First cohort won't be perfect. That's okay. Learn and improve.

---

**Last Updated**: January 15, 2026  
**Version**: 1.0  
**Next Review**: After Summer 2026 Cohort 1

---

*FPUNA Summer 2026 - Instructor Guide*  
*Teaching AI-Augmented Development*  
*Empowering the Next Generation of Developers*
