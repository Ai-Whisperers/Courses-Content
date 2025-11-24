# Module 1 Quiz: Introduction to AI-Assisted Development

**Course:** QA to QA Automation with AI
**Module:** 1 - Introduction to AI-Assisted Development
**Duration:** 20 minutes
**Points:** 15 questions = 15 points (1.67% of total grade)
**Passing Score:** 11/15 (70%)
**Attempts:** Unlimited (24-hour delay between attempts)
**Format:** Open notes, NO AI tools
**Due:** Before starting Module 2

---

## Instructions

1. Answer all 15 questions honestly
2. Use course materials and documentation
3. **DO NOT use AI tools** - This tests YOUR understanding
4. Focus on both AI capabilities AND limitations
5. Some questions have multiple parts
6. Submit via [Google Form/LMS link]

---

## Section 1: AI Tool Fundamentals (5 questions)

### Question 1
What is Claude Code primarily designed for?

A) Replacing software engineers
B) AI-assisted software development in the terminal
C) Only answering programming questions
D) Automated testing without human involvement

**Correct Answer:** B

**Why this matters:** Understanding what tools are designed for helps set proper expectations and use them effectively.

---

### Question 2
Which of the following is a LIMITATION of AI coding assistants like Claude Code?

A) They can write any code faster than humans
B) They always produce bug-free code
C) They may generate code that doesn't match your specific context or requirements
D) They can't help with debugging

**Correct Answer:** C

**Explanation:** AI tools are powerful but require human oversight. They may not understand your specific business logic, edge cases, or architectural constraints without proper context.

---

### Question 3
What is the purpose of a CLAUDE.md file?

A) To store your code
B) To provide project context to Claude Code
C) To replace documentation
D) To automatically run tests

**Correct Answer:** B

**Why this matters:** Context engineering is crucial for effective AI assistance. The better your context file, the better AI responses you'll get.

---

### Question 4
Which AI model should you typically use for complex reasoning and code generation tasks?

A) Claude Haiku (fastest, cheapest)
B) Claude Sonnet (balanced, recommended for coding)
C) Claude Opus (most capable, slowest)
D) It doesn't matter, all models are the same

**Correct Answer:** B (or C for very complex tasks)

**Explanation:** Sonnet 4.5 is recommended for coding tasks (best coding model). Opus for very complex reasoning. Haiku for simple, quick tasks.

---

### Question 5 (Scenario-Based)
You ask AI to generate Playwright tests for a login page. The AI produces 5 tests that all pass. What should you do NEXT?

A) Submit them immediately - they pass!
B) Review them for edge cases, error handling, and test quality
C) Delete them and write manually - never trust AI
D) Ask AI to generate 10 more tests

**Correct Answer:** B

**Explanation:** Passing tests don't guarantee quality. You must review for completeness, edge cases, maintainability, and alignment with requirements.

---

## Section 2: Effective AI Usage (5 questions)

### Question 6
What makes a prompt "effective" for AI code generation?

A) It's very short and vague
B) It includes specific requirements, context, and constraints
C) It demands perfect code immediately
D) It asks for everything at once

**Correct Answer:** B

**Why this matters:** Specific, contextual prompts yield better results. Vague prompts lead to generic, potentially incorrect code.

---

### Question 7
You're getting poor results from AI. What should you try FIRST?

A) Switch to a different AI tool immediately
B) Give up and do it manually
C) Provide more context and refine your prompt
D) Ask the AI to "try harder"

**Correct Answer:** C

**Explanation:** Iterative refinement is key. Most "AI failures" are actually prompt failures. Add context, clarify requirements, provide examples.

---

### Question 8 (Multi-Part)
Match the AI usage scenario with the best approach:

**Scenarios:**
1. Generating boilerplate Page Object Model code
2. Deciding overall test architecture
3. Explaining a complex algorithm
4. Making business requirement decisions

**Approaches:**
A) Perfect for AI - let it handle it
B) Good for AI with human review
C) AI can help but human decides
D) Should not use AI for this

**Correct Answers:**
1 → A or B (AI is great for boilerplate)
2 → C (AI can suggest, human decides)
3 → B (AI explains well, verify understanding)
4 → D (Business decisions need human judgment)

---

### Question 9
What's the main risk of blindly accepting AI-generated test code?

A) The code might be too perfect
B) It might not cover your specific edge cases or business logic
C) It will definitely have syntax errors
D) Other developers will be jealous

**Correct Answer:** B

**Explanation:** AI doesn't know your specific requirements, edge cases, or business rules unless explicitly told. Always review and validate.

---

### Question 10 (Scenario-Based)
You ask AI to generate API tests. It creates tests but uses outdated library methods. What does this tell you?

A) AI is useless for testing
B) AI's training data may not include the latest versions
C) You should never use AI for API tests
D) The library is wrong, not the AI

**Correct Answer:** B

**Explanation:** AI models have knowledge cutoff dates. Always verify against current documentation, especially for rapidly evolving tools.

---

## Section 3: AI Limitations & Ethics (5 questions)

### Question 11
Which task should you NEVER fully delegate to AI without human review?

A) Writing test case descriptions
B) Generating basic CRUD API tests
C) Making security-critical decisions
D) Creating simple utility functions

**Correct Answer:** C

**Why this matters:** Security, privacy, and critical business decisions require human judgment, domain expertise, and accountability.

---

### Question 12
What is "hallucination" in the context of AI?

A) When AI creates very creative code
B) When AI generates false or nonsensical information presented as fact
C) When AI is too slow to respond
D) When AI refuses to answer

**Correct Answer:** B

**Explanation:** AI can confidently generate incorrect information, fake API methods, or nonexistent libraries. Always validate!

---

### Question 13 (Ethics)
Is it ethical to use AI-generated code in your work?

A) No, it's always plagiarism
B) Yes, if you understand it, validate it, and document AI usage
C) Yes, but only if you don't tell anyone
D) No, AI code is always inferior

**Correct Answer:** B

**Why this matters:** AI is a tool. Ethical use requires understanding, validation, and transparency - not blind copying.

---

### Question 14
You discover AI generated a security vulnerability in test code. What should you do?

A) Ignore it - it's just test code
B) Fix it immediately and learn how to identify similar issues
C) Blame the AI tool
D) Use different AI tool next time

**Correct Answer:** B

**Explanation:** Even test code can have security implications. This is a learning opportunity to improve your AI prompts and code review skills.

---

### Question 15 (Reflection Question - Short Answer)
In 2-3 sentences, explain why human QA engineers are still essential even with powerful AI coding assistants.

**Sample Strong Answer:**
"AI assistants excel at generating code patterns and boilerplate but lack understanding of business context, user needs, and domain-specific edge cases. Humans provide critical thinking, creativity, ethical judgment, and can adapt to unique situations that AI hasn't encountered. QA engineers validate AI outputs, make strategic testing decisions, and ensure quality goes beyond passing tests to meeting real user needs."

**Sample Weak Answer:**
"Because AI makes mistakes." (Too brief, doesn't demonstrate understanding)

---

## Scoring & Feedback

### Score Interpretation

**13-15 points (87-100%):** Excellent understanding!
- ✅ You grasp AI capabilities and limitations
- ✅ Ready to use AI tools effectively
- ✅ Proceed to Module 2 confidently

**11-12 points (73-80%):** Good understanding (Pass)
- ✅ You understand core concepts
- ⚠️ Review missed questions
- ✅ Proceed to Module 2 with minor review

**8-10 points (53-67%):** Needs improvement
- ⚠️ Retake recommended (wait 24 hours)
- 📚 Review Module 1 materials
- 💡 Focus on AI limitations and best practices

**Below 8 points (<53%):** Significant gaps
- 📚 Thoroughly review Module 1
- 🎥 Rewatch lectures/recordings
- 💬 Attend office hours before retake
- ⏰ Wait 24 hours, then retake

---

## Common Misconceptions

After grading thousands of these quizzes, here are common mistakes:

### ❌ "AI will replace QA engineers"
✅ **Reality:** AI augments, not replaces. Human judgment is irreplaceable.

### ❌ "If tests pass, they're good enough"
✅ **Reality:** Passing tests might miss edge cases, lack assertions, or be poorly structured.

### ❌ "More detailed prompts always means longer prompts"
✅ **Reality:** Effective prompts are specific, not necessarily lengthy. Quality over quantity.

### ❌ "AI knows my codebase automatically"
✅ **Reality:** AI needs explicit context through CLAUDE.md, good prompts, and examples.

### ❌ "I should never question AI output"
✅ **Reality:** ALWAYS validate. AI is a tool, you're the engineer.

---

## Study Resources

### Before Retaking

**Module 1 Materials:**
- Lesson: "Introduction to AI-Assisted Development"
- Reading: "AI Coding Assistant Capabilities & Limitations"
- Exercise: Module 1 hands-on lab

**External Resources:**
- [Claude Code Documentation](https://docs.anthropic.com/claude/docs/claude-code)
- Article: "Effective Prompt Engineering for Code Generation"
- Video: "AI Tools for QA Engineers" (Course library)

### For Module 2 Preparation

If you passed, start preparing for Module 2:
- Pre-reading: "Context Engineering Fundamentals"
- Setup: Ensure Claude Code is properly configured
- Practice: Write a sample CLAUDE.md for a personal project

---

## Reflection Questions (Not Graded)

Think about these to deepen your learning:

1. **How has your perception of AI tools changed after Module 1?**

2. **What specific AI limitation surprised you most?**

3. **What's one way you'll use AI in your current QA work?**

4. **What's one way you'll ensure you DON'T over-rely on AI?**

5. **How will you explain AI usage to future employers?**

---

## Next Steps

### After Passing
1. ✅ Proceed to Module 2: Context Engineering
2. 📝 Complete Module 1 Exercise if not done
3. 🤔 Reflect on what you learned
4. 💡 Start thinking about your final project

### If Retaking
1. 📚 Review Module 1 materials thoroughly
2. 📝 Take notes on unclear concepts
3. 💬 Ask questions in Slack or office hours
4. ⏰ Wait 24 hours
5. 🎯 Retake when ready

---

## Instructor Notes

**Common Student Questions:**

Q: "Why can't I use AI for the quiz if the course is about AI?"
A: The quiz tests YOUR understanding of AI, not AI's ability to answer. You need to know when and how to use AI.

Q: "I failed the quiz but did well on the exercise. Why?"
A: Exercises test application; quizzes test understanding. Both matter. The exercise proves you can use AI; the quiz proves you understand it.

Q: "These questions seem obvious. Why ask them?"
A: They seem obvious after learning! Many students start with misconceptions. This quiz catches and corrects them early.

---

**Good luck! Remember: Understanding AI's capabilities AND limitations is what makes you valuable as an AI-augmented QA engineer.**

---

*Quiz Version 1.0 - Module 1*
*Created: November 24, 2025*
*Feedback: [Form link]*
