# Module 02: Complete Overview
## Context Engineering for AI-Assisted Testing

---

## 📚 Module Summary

**Module 02** teaches you how to provide effective context to AI tools, dramatically improving the quality and accuracy of AI-generated tests. You'll learn to create project documentation, write powerful prompts, and refine AI outputs iteratively.

**Duration:** 4-5 hours
**Level:** Beginner-Intermediate
**Prerequisites:** Module 01 (AI Introduction)
**Focus:** Maximizing AI effectiveness through context

---

## 🎯 Learning Objectives

By the end of this module, you will be able to:

✅ **Understand:**
- The three-level context hierarchy (Project, Session, Prompt)
- Why context matters for AI accuracy
- Different types of context and when to use each

✅ **Create:**
- Effective CLAUDE.md project files
- Well-structured prompts that get accurate results
- Project documentation for AI consumption

✅ **Apply:**
- Iterative refinement techniques
- Prompting patterns (step-by-step, example-driven, constraints)
- Context management strategies

✅ **Improve:**
- Transform vague prompts into specific ones
- Refine AI outputs through conversation
- Troubleshoot poor AI responses

---

## 📖 Module Contents

### 1. Slide Deck (01-SLIDES.md)
Comprehensive slides covering:
- The context hierarchy explained
- Project vs session vs prompt context
- CLAUDE.md file structure and examples
- Anatomy of a good prompt
- Bad vs good prompt comparisons
- Prompting patterns and techniques
- Iterative refinement workflow
- Common mistakes and how to avoid them

**Time:** 1 hour to review
**Format:** 40+ slides with examples

---

### 2. Exercises (02-EXERCISES.md)
3 practical exercises:
1. **Create CLAUDE.md** (45 min)
   - Explore real-world project
   - Document architecture and conventions
   - Create comprehensive context file

2. **Prompt Improvement** (30 min)
   - Transform 4 bad prompts into good ones
   - Practice adding context, requirements, format

3. **Iterative Test Generation** (45 min)
   - Generate tests with simple prompt
   - Refine through multiple iterations
   - Achieve production-ready quality

**Time:** 2 hours total
**Deliverables:** CLAUDE.md file, improved prompts, refined tests

---

### 3. Hands-On Lab (03-LAB.md)
Real-world context engineering lab:
1. Set up sample project
2. Create project documentation
3. Generate tests with different prompt approaches
4. Compare results with/without good context
5. Practice iterative refinement

**Time:** 1.5-2 hours
**Deliverable:** Complete context-engineered test suite

---

### 4. Code Examples (04-CODE-EXAMPLES.md)
Practical examples including:
- 3+ CLAUDE.md templates (E-commerce, Python, Mobile)
- 10+ prompt examples (before/after)
- Prompting pattern demonstrations
- Refinement conversation examples
- Context hierarchy illustrations

**Time:** 30-45 minutes to review
**Usage:** Reference while working

---

### 5. Quiz (05-QUIZ.md)
Comprehensive assessment:
- 10 multiple choice/true-false questions
- 3 short answer questions
- 1 practical prompt-writing question
- 20-minute time limit

**Passing Score:** 70% (28/40 points)
**Attempts:** Unlimited

---

## 🎓 Key Concepts

### The Context Hierarchy

```
┌─────────────────────────────────────┐
│     PROJECT LEVEL (Persistent)      │
│  CLAUDE.md, settings, conventions   │ ← Set once, use always
├─────────────────────────────────────┤
│     SESSION LEVEL (Temporary)       │
│  Files read, conversation history   │ ← Built during conversation
├─────────────────────────────────────┤
│      PROMPT LEVEL (Immediate)       │
│  Specific question, code snippets   │ ← Each message
└─────────────────────────────────────┘
```

### Anatomy of a Good Prompt

```
[Context] What we're working on, relevant code
    +
[Task] Specific action to perform
    +
[Requirements] Must-haves, constraints
    +
[Format] How to structure the output
    =
GOOD PROMPT → Accurate AI Response
```

### The Refinement Loop

```
Initial Prompt
    ↓
AI Response
    ↓
Review & Identify Issues
    ↓
Refine Prompt (add details, constraints)
    ↓
Better Response
    ↓
Repeat until production-ready
```

---

## 🗺️ Learning Path

### Recommended Flow:

```
01-SLIDES (1 hr)
    ↓
Understand context hierarchy
    ↓
02-EXERCISES (2 hrs)
    ↓
Practice creating CLAUDE.md
Practice writing good prompts
    ↓
03-LAB (1.5 hrs)
    ↓
Real-world application
    ↓
04-CODE-EXAMPLES (30 min)
    ↓
Study reference implementations
    ↓
05-QUIZ (20 min)
    ↓
Verify understanding
    ↓
Ready for Module 03!
```

**Total Time:** 4-5 hours

---

## ✅ Completion Checklist

### Understanding:
- [ ] I can explain the three-level context hierarchy
- [ ] I understand what goes in a CLAUDE.md file
- [ ] I know the components of a good prompt
- [ ] I can identify bad prompts and improve them
- [ ] I understand when to refine vs start fresh

### Skills:
- [ ] I can create an effective CLAUDE.md for any project
- [ ] I can write specific, detailed prompts
- [ ] I can use prompting patterns (step-by-step, example-driven)
- [ ] I can iteratively refine AI outputs
- [ ] I can troubleshoot poor AI responses

### Deliverables:
- [ ] CLAUDE.md file for sample project
- [ ] 4 improved prompts (Exercise 2)
- [ ] Production-ready test suite (Exercise 3)
- [ ] Lab documentation complete
- [ ] Quiz passed with 70%+

---

## 📊 Assessment Breakdown

| Component | Weight | Criteria |
|-----------|--------|----------|
| Exercises | 40% | Quality of CLAUDE.md, prompt improvements, test refinement |
| Lab | 30% | Context engineering application, iterative results |
| Quiz | 25% | Understanding of concepts |
| Participation | 5% | Engagement, questions, sharing insights |

**Module Passing:** 70% overall

---

## 💡 Why This Module Matters

### The Impact of Good Context

**Without Good Context:**
- Vague, generic AI responses
- Multiple rounds of back-and-forth
- Incorrect assumptions
- Wasted time
- Frustration

**With Good Context:**
- Accurate, specific AI responses
- Fewer iterations needed
- Correct understanding
- Efficient workflow
- High-quality output

### Real-World Impact

Students who master context engineering:
- ⬆️ 3-5x improvement in AI output quality
- ⬇️ 50-70% reduction in iterations needed
- ⬆️ 2-3x faster test generation
- ⬆️ Higher job satisfaction (less frustration)

---

## 🛠️ Tools & Templates

### Files You'll Create:
- `CLAUDE.md` - Project context file
- `.claude/settings.local.json` - AI settings (optional)
- `prompts/` - Library of effective prompts

### Templates Provided:
- E-commerce CLAUDE.md template
- Python data pipeline template
- Mobile app template
- Generic project template

---

## 🔗 Connections to Other Modules

**Module 02** connects to:

- **Module 01:** Builds on AI introduction
- **Module 03:** Context enables private repo access
- **Module 04:** Context powers documentation generation
- **Module 05:** Prompts drive test plan creation
- **Module 06:** Context improves test implementation
- **All Modules:** Context engineering is foundational for all AI-assisted work

---

## 🚧 Common Challenges & Solutions

### Challenge 1: CLAUDE.md Too Vague
**Problem:** Generic project description doesn't help AI
**Solution:** Include specific conventions, patterns, examples

### Challenge 2: Prompts Still Get Bad Results
**Problem:** Missing key context or requirements
**Solution:** Use the four-component checklist (Context + Task + Requirements + Format)

### Challenge 3: Over-Iteration
**Problem:** Spending too long refining
**Solution:** If 3-4 iterations don't work, start fresh with better initial prompt

### Challenge 4: Context Overload
**Problem:** CLAUDE.md is 10 pages long
**Solution:** Keep it concise, focus on what AI needs to know

---

## 📚 Additional Resources

### Essential Reading:
- [Anthropic Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- Module examples folder

### Practice Projects:
- [RealWorld Example App](https://github.com/gothinkster/realworld)
- [TodoMVC](https://github.com/tastejs/todomvc)
- Your own projects!

### Reference Materials:
- CLAUDE.md templates in `/templates`
- Prompt library in `/prompts`
- Example conversations in `/examples`

---

## 🎯 Success Metrics

**You've successfully completed Module 02 when:**

✅ You can create a CLAUDE.md in 15-20 minutes
✅ Your first prompts are 70%+ effective
✅ You can refine AI outputs in 2-3 iterations
✅ AI-generated tests are production-ready
✅ You understand context hierarchy intuitively
✅ Quiz passed with 70%+
✅ Excited to apply context engineering to real projects

---

## 📝 Pro Tips

### From Successful Students:

1. **Start with CLAUDE.md**
   - Don't skip this step
   - Invest 30 minutes upfront
   - Saves hours later

2. **Use Examples in Prompts**
   - Show AI what you want
   - One good example > long explanation

3. **Be Specific About Format**
   - Don't assume AI knows your style
   - Specify file names, structure, patterns

4. **Iterate Strategically**
   - First iteration: Get structure right
   - Second: Add missing scenarios
   - Third: Polish quality

5. **Build a Prompt Library**
   - Save prompts that work well
   - Reuse and adapt for similar tasks
   - Share with team

---

## 🌟 Real-World Applications

### How Professionals Use Context Engineering:

**QA Engineer at SaaS Company:**
"I created a CLAUDE.md for our microservices. Now when I ask Claude to generate tests, it automatically follows our patterns, uses our test helpers, and matches our coverage requirements. Saves me 2-3 hours per feature."

**Test Automation Lead:**
"Context engineering changed how our team works. We have a shared CLAUDE.md, common prompts, and everyone gets consistent, high-quality results. Onboarding new team members is 50% faster."

**Freelance QA Consultant:**
"For each client project, I spend 30 minutes creating CLAUDE.md. This documentation also helps human developers understand the project! Two birds, one stone."

---

## 📞 Support

**Questions about Module 02?**
- Slack: #qa-course-module-2
- Office Hours: Wednesday 6-7 PM
- Email: qa-training@mentormate.com

**Share Your Success:**
- Post your CLAUDE.md examples
- Share before/after prompt improvements
- Help classmates with context engineering

---

## 🎯 Next Steps

### After Completing Module 02:

1. **Apply Immediately**
   - Create CLAUDE.md for your current projects
   - Start using prompt patterns
   - Build your prompt library

2. **Module 03 Preview**
   - Accessing Private Repositories
   - Using context with proprietary code
   - GitHub CLI + AI integration

3. **Practice Between Modules**
   - Try context engineering on side projects
   - Experiment with different prompt styles
   - Share learnings with peers

---

## 🏆 Mastery Challenge

**Optional Advanced Exercise:**

Create a complete context engineering setup for a real-world project:
1. Comprehensive CLAUDE.md
2. 10+ reusable prompts for common tasks
3. Documentation of your conventions
4. Before/after examples showing impact

**Prize:** Recognition as "Context Engineering Master" + showcase in course materials

---

**Ready to become a context engineering expert? Start with 01-SLIDES.md!** 🚀

---

*Module 02 Overview - Version 1.0*
*MentorMate QA Automation Course (AI-Enhanced)*
*Last Updated: November 2025*
