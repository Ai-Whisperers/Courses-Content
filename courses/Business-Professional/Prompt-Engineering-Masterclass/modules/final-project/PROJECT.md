# Final Project: Build Your Personal Prompt Library

## Project Overview

**Objective:** Create a professional, well-documented prompt library demonstrating mastery of all course concepts.

**Duration:** 8-10 hours (complete over 1-2 weeks)

**Deliverables:**
1. Organized prompt library (minimum 10 prompts)
2. Complete documentation
3. Usage examples
4. Portfolio presentation

---

## Project Requirements

### Part 1: Library Structure (20 points)

Create an organized prompt library following best practices from Module 6.

**Required Elements:**
- Logical folder/category structure
- Consistent naming conventions
- README.md with navigation
- Version control setup (git recommended)

**Minimum Structure:**
```
/my-prompt-library
  /category-1 (your work-relevant category)
    prompt-1.md
    prompt-2.md
  /category-2
    prompt-3.md
    prompt-4.md
  /personas
    persona-1.md
  README.md
  CHANGELOG.md
```

**Evaluation Criteria:**
- Organization clarity (5 pts)
- Naming consistency (5 pts)
- README completeness (5 pts)
- Professional presentation (5 pts)

---

### Part 2: Prompt Collection (40 points)

Create **minimum 10 high-quality prompts** covering at least 3 different categories.

**Requirements per Prompt:**
- Complete template structure (Quick Start + Full Prompt)
- All variables clearly defined
- Expected output description
- Example usage with sample input/output
- Customization options
- Version history
- Performance notes

**Prompt Distribution:**
- At least 3 different categories
- At least 2 prompts must use advanced patterns (few-shot, CoT, ReAct)
- At least 1 system prompt/persona
- Mix of simple and complex prompts

**Evaluation Criteria:**
- Template completeness (15 pts)
- Prompt quality and clarity (15 pts)
- Variety and sophistication (10 pts)

---

### Part 3: Documentation (20 points)

**Library README.md must include:**
- Overview and purpose
- Quick start guide
- Category descriptions
- Most useful prompts (top 3-5)
- How to contribute/improve
- Maintenance plan

**Each Prompt File must include:**
- All template sections (from Module 6)
- Clear variable definitions
- Example usage
- Customization options
- Version history

**Evaluation Criteria:**
- README clarity and completeness (10 pts)
- Prompt documentation quality (10 pts)

---

### Part 4: Demonstration of Learning (20 points)

Include evidence of course concepts:

**Must demonstrate:**
1. **Prompt Structure** (Module 2): All 5 components clearly used
2. **Advanced Patterns** (Module 3): At least 2 prompts using few-shot, CoT, or ReAct
3. **System Prompts** (Module 4): At least 1 complete persona
4. **Iteration** (Module 5): Show before/after of 1 refined prompt with version history
5. **Organization** (Module 6): Professional library structure

**Evaluation Criteria:**
- Module 2 concepts demonstrated (4 pts)
- Module 3 concepts demonstrated (4 pts)
- Module 4 concepts demonstrated (4 pts)
- Module 5 concepts demonstrated (4 pts)
- Module 6 concepts demonstrated (4 pts)

---

## Prompt Categories to Consider

Choose categories relevant to your work:

**Professional Categories:**
- Content creation (blog posts, social media, emails)
- Data analysis (summaries, trends, insights)
- Code development (generation, review, documentation)
- Business operations (processes, reports, planning)
- Research (literature review, competitive analysis)
- Communication (presentations, proposals, memos)

**Personal Categories:**
- Learning and education
- Career development
- Creative writing
- Personal productivity
- Health and wellness
- Finance and budgeting

---

## Example Prompt (Minimum Quality Expected)

```markdown
# Email Response Generator

## Quick Start
```
You are a professional communicator. Draft an email response to: [paste email].
Tone: [professional/friendly/formal]. Keep under 150 words.
```

## Full Prompt
```
You are an executive assistant with 10 years of experience in professional communication.

Context: Responding to: [paste received email]
Your role: [your position]
Relationship: [to sender - colleague/client/manager]
Goal: [purpose of response]

Draft a response email that:
1. Acknowledges their message/request
2. Addresses key points raised
3. Provides clear next steps or timeline
4. Maintains appropriate professional tone
5. Ends with clear call-to-action or closure

Tone: {tone}
Length: {word_count} words maximum
Include: {specific_elements}
```

## Variables
- **{tone}**: professional | friendly | formal | urgent
- **{word_count}**: 100-200 (default: 150)
- **{specific_elements}**: "meeting time options" | "attachment reference" | etc.

## Expected Output
- Professional email format (greeting, body, closing)
- Clear subject line (if needed)
- Appropriate tone for relationship
- Concise and actionable

## Example Usage

**Input:**
- Received email: "Can you send me the Q3 report?"
- Tone: professional
- Relationship: colleague

**Output:**
```
Subject: Re: Q3 Report Request

Hi [Name],

Thanks for reaching out. I'll send you the Q3 report by end of day today. 
It includes the sales data and key metrics you requested.

Is there any specific section you'd like me to highlight or any particular 
format you need?

Best,
[Your name]
```

## Customization Options
- **For urgent requests:** Add "Timeline: needs response within [timeframe]"
- **For complex topics:** Add "Key points to address: [list]"
- **For formal correspondence:** Set tone to "formal" and increase word count

## Version History
- **v1.2** (2024-01): Added tone variations, improved examples
- **v1.1** (2023-12): Added relationship context
- **v1.0** (2023-11): Initial version

## Performance Metrics
- Success rate: 95% (minimal editing needed)
- Time saved: ~10 minutes per response
- User satisfaction: 4.7/5

## Notes
- Works best with clear context about relationship
- May need adjustment for highly technical responses
- Test tone with actual recipient style when possible
```

---

## Submission Checklist

### Before Submitting:

**Structure:**
- [ ] Logical folder organization
- [ ] Consistent naming (category-task-variant.md)
- [ ] README.md with complete navigation
- [ ] CHANGELOG.md with version history

**Content:**
- [ ] Minimum 10 prompts created
- [ ] All prompts use complete template
- [ ] Variables clearly defined in each
- [ ] Examples included for each
- [ ] At least 3 categories represented

**Quality:**
- [ ] All module concepts demonstrated
- [ ] Advanced patterns used (2+ prompts)
- [ ] System prompt/persona included
- [ ] Before/after iteration shown
- [ ] Documentation is complete and clear

**Testing:**
- [ ] All prompts tested with AI tool
- [ ] Examples verified as accurate
- [ ] Variables work as described
- [ ] Instructions are clear

---

## Submission Format

**Deliverables:**
1. **Zip file** or **GitHub repository link** containing your library
2. **README.pdf** - Exported version of your library README
3. **Portfolio presentation** (optional but recommended)

**File naming:**
- `[YourName]-Prompt-Library.zip` or
- GitHub repo: `[username]/prompt-library`

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Library Structure | 20 | Organization, naming, documentation |
| Prompt Collection | 40 | Quality, completeness, variety |
| Documentation | 20 | README, prompt docs, clarity |
| Demonstration of Learning | 20 | Course concepts applied |
| **Total** | **100** | |

**Grade Breakdown:**
- **90-100 (A):** Excellent - Production-ready library
- **80-89 (B):** Good - Minor improvements needed
- **70-79 (C):** Satisfactory - Meets requirements
- **Below 70 (F):** Incomplete or insufficient quality

---

## Timeline Recommendation

| Week | Focus | Hours |
|------|-------|-------|
| Week 1 | Structure + 5 prompts | 4-5 hours |
| Week 2 | 5 more prompts + docs | 4-5 hours |
| Final | Testing + polish | 1-2 hours |

---

## Tips for Success

1. **Start with prompts you actually need** - Build for real use cases
2. **Test thoroughly** - Run each prompt 3-5 times with different inputs
3. **Document as you go** - Don't leave documentation for the end
4. **Iterate based on results** - Show your refinement process
5. **Make it professional** - Treat this as a portfolio piece
6. **Get feedback** - Share with peers before submitting
7. **Version everything** - Track changes systematically

---

## Optional Enhancements (Bonus Points)

**+5 points** for any of these:
- Interactive demo or video walkthrough
- Automated testing scripts
- Public GitHub repo with proper documentation
- Team collaboration features
- Metrics dashboard showing prompt performance
- Integration with AI tool APIs

---

## Common Pitfalls to Avoid

❌ **Don't:**
- Use generic prompts copied from examples
- Skip documentation ("prompts speak for themselves")
- Create 10 nearly-identical prompts
- Forget to test before submitting
- Leave placeholders or "TODO" notes

✅ **Do:**
- Create prompts for real tasks you encounter
- Document thoroughly with examples
- Show variety in techniques and categories
- Test and iterate
- Treat as professional portfolio work

---

## Getting Help

**Questions about requirements:** Review rubric and examples
**Technical issues:** Post in course discussion forum
**Need feedback:** Peer review before submission
**Stuck on ideas:** Review module exercises for inspiration

---

## After Submission

Your prompt library should be:
- **Usable immediately** in your daily work
- **Shareable** with colleagues or publicly
- **Expandable** as you learn more techniques
- **Portfolio-worthy** for job applications or showcases

This is not just a course project - it's a tool you'll actually use.

---

*Final Project | Prompt Engineering Masterclass | Due: [Course End Date]*
