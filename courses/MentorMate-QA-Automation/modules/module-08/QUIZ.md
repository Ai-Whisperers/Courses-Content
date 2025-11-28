# Module 8: Agentic Testing Patterns - Quiz

**Time Limit**: 20 minutes
**Passing Score**: 70% (28/40 points)
**Attempts**: Unlimited

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Instructions

- This quiz covers all five agentic patterns and their applications
- Read each question carefully
- For multiple choice, select the best answer
- For short answer, be specific and concise
- For the practical question, demonstrate understanding with a complete workflow
- You may refer to module materials during the quiz

---

## Section 1: Multiple Choice (2 points each)

### Question 1
What is the primary benefit of using Prompt Chaining over a single large prompt?

a) It's faster to execute
b) It breaks complexity into manageable, validated steps
c) It uses fewer tokens
d) It requires less planning

**Answer: ___**

---

### Question 2
In the Reflection pattern, what happens when the quality score doesn't reach the threshold after maximum iterations?

a) The system automatically improves the code
b) You should lower the threshold or revise the rubric
c) The pattern has failed completely
d) Start over with a new prompt

**Answer: ___**

---

### Question 3
What does RAG stand for in the context of AI testing patterns?

a) Random Access Generation
b) Retrieval-Augmented Generation
c) Rapid Automated Generation
d) Review And Generate

**Answer: ___**

---

### Question 4
When should you use the Parallelization pattern?

a) When modules depend on each other sequentially
b) When you have independent modules that can be tested separately
c) For all test generation tasks
d) Only for integration tests

**Answer: ___**

---

### Question 5
What is the primary purpose of the Model Context Protocol (MCP) in testing?

a) To make tests run faster
b) To gather contextual information from multiple data sources
c) To replace all other patterns
d) To automate test execution

**Answer: ___**

---

### Question 6
Which pattern is MOST appropriate for ensuring consistent test style across a large team?

a) Prompt Chaining
b) Reflection
c) RAG (with knowledge base)
d) Parallelization

**Answer: ___**

---

### Question 7
What is a quality rubric used for in the Reflection pattern?

a) To measure test execution speed
b) To objectively score test quality and identify gaps
c) To determine which tests to run first
d) To organize test files

**Answer: ___**

---

### Question 8
In a prompt chain, what should happen between steps?

a) Nothing, just continue to the next step
b) Validate the output before proceeding
c) Run all tests
d) Reset all context

**Answer: ___**

---

### Question 9
What is the "normalization step" in the Parallelization pattern?

a) Running tests to check they pass
b) Combining parallel outputs and resolving conflicts/inconsistencies
c) Formatting code with prettier
d) Removing duplicate tests only

**Answer: ___**

---

### Question 10
Which combination of patterns is BEST for enterprise-scale test generation?

a) Only Prompt Chaining
b) Only RAG
c) All patterns combined (Chaining + Reflection + RAG + Parallelization + Tool Use)
d) Just Tool Use

**Answer: ___**

---

## Section 2: True/False (1 point each)

### Question 11
Agentic patterns should be used for every testing task, regardless of complexity.

- [ ] True
- [ ] False

---

### Question 12
The Reflection pattern requires multiple rounds of AI interaction to improve quality.

- [ ] True
- [ ] False

---

### Question 13
RAG patterns work best with generic, non-project-specific knowledge bases.

- [ ] True
- [ ] False

---

### Question 14
Parallelization always produces better results than sequential test generation.

- [ ] True
- [ ] False

---

### Question 15
You can combine multiple agentic patterns in a single workflow.

- [ ] True
- [ ] False

---

### Question 16
MCP servers must be installed and configured for Tool Use pattern to be effective.

- [ ] True
- [ ] False

---

### Question 17
A quality rubric should have vague criteria like "good quality" for flexibility.

- [ ] True
- [ ] False

---

### Question 18
Each step in a prompt chain should have a clearly defined input and output.

- [ ] True
- [ ] False

---

### Question 19
Knowledge bases in RAG should include both patterns to follow AND anti-patterns to avoid.

- [ ] True
- [ ] False

---

### Question 20
Simple testing tasks benefit most from complex multi-pattern workflows.

- [ ] True
- [ ] False

---

## Section 3: Short Answer (5 points each)

### Question 21
List the five key agentic patterns and provide one use case for each.

**Pattern 1**: _____________
**Use Case**: _________________________________________________

**Pattern 2**: _____________
**Use Case**: _________________________________________________

**Pattern 3**: _____________
**Use Case**: _________________________________________________

**Pattern 4**: _____________
**Use Case**: _________________________________________________

**Pattern 5**: _____________
**Use Case**: _________________________________________________

---

### Question 22
Design a 4-step prompt chain for generating API integration tests. List each step with its purpose and output.

**Step 1**: _________________________________________________
**Purpose**: _________________________________________________
**Output**: _________________________________________________

**Step 2**: _________________________________________________
**Purpose**: _________________________________________________
**Output**: _________________________________________________

**Step 3**: _________________________________________________
**Purpose**: _________________________________________________
**Output**: _________________________________________________

**Step 4**: _________________________________________________
**Purpose**: _________________________________________________
**Output**: _________________________________________________

---

### Question 23
Explain how the Reflection pattern improves test quality. Include the loop steps and what makes it effective.

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## Section 4: Practical Application (10 points)

### Question 24
You need to generate comprehensive tests for a payment processing system with these modules:
- **PaymentGateway**: Processes credit card transactions
- **RefundService**: Handles refund requests
- **TransactionLog**: Records all transactions
- **FraudDetection**: Checks for suspicious activity

**Design a complete agentic workflow** that uses at least 3 different patterns. Specify:

1. **Which patterns you'll use and why**
2. **The workflow steps in order**
3. **How patterns combine for better results**
4. **Expected improvements over single-prompt approach**

---

**Patterns Used**:
1. _________________________________________________
2. _________________________________________________
3. _________________________________________________

**Why these patterns**:
_________________________________________________________________
_________________________________________________________________

---

**Workflow**:

**Step 1**: _________________________________________________
**Pattern Used**: _________________________________________________
**Output**: _________________________________________________

**Step 2**: _________________________________________________
**Pattern Used**: _________________________________________________
**Output**: _________________________________________________

**Step 3**: _________________________________________________
**Pattern Used**: _________________________________________________
**Output**: _________________________________________________

**Step 4**: _________________________________________________
**Pattern Used**: _________________________________________________
**Output**: _________________________________________________

**Step 5** (if needed): _________________________________________________
**Pattern Used**: _________________________________________________
**Output**: _________________________________________________

---

**How patterns combine**:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

**Expected improvements**:
- Time: _________________________________________________
- Quality: _________________________________________________
- Consistency: _________________________________________________
- Coverage: _________________________________________________

---

## Answer Key
*(For instructor use only)*

---

### Section 1: Multiple Choice

1. **b** - It breaks complexity into manageable, validated steps
2. **b** - You should lower the threshold or revise the rubric
3. **b** - Retrieval-Augmented Generation
4. **b** - When you have independent modules that can be tested separately
5. **b** - To gather contextual information from multiple data sources
6. **c** - RAG (with knowledge base)
7. **b** - To objectively score test quality and identify gaps
8. **b** - Validate the output before proceeding
9. **b** - Combining parallel outputs and resolving conflicts/inconsistencies
10. **c** - All patterns combined

**Section 1 Total: 20 points**

---

### Section 2: True/False

11. **False** - Only use patterns when complexity demands it; simple tasks don't need patterns
12. **True** - Reflection involves Generate → Critique → Improve loop
13. **False** - RAG works best with project-specific knowledge bases
14. **False** - Parallelization speeds generation but doesn't guarantee better quality; needs normalization
15. **True** - Patterns can and should be combined for complex workflows
16. **False** - MCP can be simulated or context gathered manually if tools unavailable
17. **False** - Rubrics need specific, measurable criteria
18. **True** - Clear I/O is essential for effective chaining
19. **True** - Both positive patterns and negative anti-patterns are valuable
20. **False** - Simple tasks should use simple approaches; patterns add unnecessary overhead

**Section 2 Total: 10 points**

---

### Section 3: Short Answer

### Question 21 (5 points - 1 per pattern)

**Acceptable answers** (exact wording may vary):

1. **Prompt Chaining** - Use when breaking complex multi-step test generation workflows
2. **Reflection** - Use when iterative quality improvement is needed to meet standards
3. **RAG** - Use when consistency with team patterns/conventions is required
4. **Parallelization** - Use when testing multiple independent modules to save time
5. **Tool Use (MCP)** - Use when contextual data from multiple sources enhances generation

**Grading**:
- 1 point per correct pattern + use case pair
- Accept equivalent use cases that demonstrate understanding

---

### Question 22 (5 points - 1.25 per step)

**Example acceptable answer**:

**Step 1**: Analyze API endpoints
**Purpose**: Identify all endpoints, methods, parameters, authentication requirements
**Output**: Structured list of endpoints with specifications

**Step 2**: Create test scenarios
**Purpose**: Define test cases for each endpoint (happy/error/edge cases)
**Output**: Test case list with expected results

**Step 3**: Generate test implementations
**Purpose**: Convert test cases into executable test code
**Output**: Complete test files with mocks and assertions

**Step 4**: Validate and enhance
**Purpose**: Review tests for quality, add missing scenarios
**Output**: Production-ready test suite

**Grading**:
- Each step needs: action, clear purpose, defined output
- Accept variations if logical and complete
- Deduct 0.5 points for vague purposes or outputs

---

### Question 23 (5 points)

**Key points that should be included** (1 point each):

1. **Generate**: AI creates initial tests
2. **Critique**: AI reviews tests against rubric/criteria
3. **Score/Evaluate**: Tests are scored to determine if threshold met
4. **Improve**: If score insufficient, AI generates improvements based on critique
5. **Iterate**: Loop continues until quality threshold reached or max iterations

**What makes it effective**:
- Self-improvement through iteration
- Objective scoring against criteria
- Addresses specific gaps identified
- Systematic quality improvement
- Can achieve high quality without manual intervention

**Grading**:
- 3 points for explaining the loop (Generate → Critique → Improve → Repeat)
- 2 points for explaining effectiveness (objective scoring, iterative improvement)
- Accept equivalent explanations that demonstrate understanding

---

### Section 4: Practical Application

### Question 24 (10 points)

**Grading Rubric**:

| Component | Points | Criteria |
|-----------|--------|----------|
| **Pattern Selection** | 2 | Chooses 3+ appropriate patterns with valid reasoning |
| **Workflow Design** | 3 | Logical sequence of 4-5 steps, clear progression |
| **Pattern Integration** | 2 | Explains how patterns work together effectively |
| **Completeness** | 2 | All components addressed (steps, outputs, improvements) |
| **Understanding** | 1 | Demonstrates grasp of pattern benefits and trade-offs |

---

**Example Excellent Answer** (10/10 points):

**Patterns Used**:
1. **Tool Use (MCP)** - Gather context about payment APIs, recent changes, security requirements
2. **Prompt Chaining** - Break generation into structured phases (analyze, plan, generate, validate)
3. **Reflection** - Ensure security tests meet strict quality standards
4. **Parallelization** - Generate tests for 4 modules simultaneously

**Why these patterns**:
Payment systems are security-critical and complex. Tool Use gathers complete context (API docs, compliance requirements). Chaining structures the complex workflow. Reflection ensures security quality. Parallelization saves time across multiple modules.

**Workflow**:

**Step 1**: Context Gathering (Tool Use)
- Read code for all 4 modules (filesystem MCP)
- Get recent commits (GitHub MCP)
- Query transaction database schema (Postgres MCP)
- Output: Complete context document

**Step 2**: Analysis & Planning (Prompt Chain - Step 1)
- Analyze all modules
- Identify security-critical functions
- Prioritize by risk (fraud detection = highest)
- Output: Prioritized test plan

**Step 3**: Parallel Generation (Parallelization + Chain Step 2)
- Generate tests for each module simultaneously
- Each follows same security patterns
- Output: 4 test files

**Step 4**: Security Quality Review (Reflection)
- Score each file against security rubric
- Iterate if score < 13/15
- Focus on PCI compliance, input validation, encryption
- Output: High-quality, security-validated tests

**Step 5**: Integration (Chain Step 3)
- Combine all tests
- Extract shared fixtures (test credit cards, etc.)
- Verify all pass
- Output: Complete payment test suite

**How patterns combine**:
Tool Use provides security context → Chains structure the workflow → Parallelization speeds generation → Reflection ensures critical security quality → All integrated in final chain step

**Expected improvements**:
- Time: 2 days vs 3 weeks manual (90% faster)
- Quality: 95%+ security coverage vs 60% manual
- Consistency: All tests follow security patterns
- Coverage: All 4 modules thoroughly tested with security focus

---

**Variations Accepted**:
- Different pattern combinations if well-justified
- Different workflow steps if logical
- Alternative improvements if realistic
- Focus on different aspects (performance, compliance) if appropriate

**Common Mistakes** (deduct points):
- Choosing patterns without explaining why (-1)
- Workflow steps that don't connect logically (-1)
- Missing outputs for steps (-0.5 per missing)
- Unrealistic improvements ("100x faster") (-1)
- Not addressing security for payment system (-1)

---

## Scoring Summary

| Section | Points Available | Pass Threshold |
|---------|-----------------|----------------|
| Multiple Choice (Q1-10) | 20 | 14 |
| True/False (Q11-20) | 10 | 7 |
| Short Answer (Q21-23) | 15 | 10 |
| Practical (Q24) | 10 | 7 |
| **Total** | **40** | **28 (70%)** |

---

## Grading Notes for Instructors

### Partial Credit Guidelines

**Multiple Choice & True/False**: No partial credit

**Short Answer**:
- Q21: 1 point per correct pattern-use case pair
- Q22: 1.25 points per complete step
- Q23: Award partial credit if loop partially explained

**Practical**:
- Use rubric above
- Award partial credit for incomplete but correct components
- Prioritize understanding over perfect answers

### Common Student Mistakes

1. **Overusing Patterns**: Applying complex patterns to simple problems
2. **Vague Rubrics**: Not understanding rubric specificity in Reflection
3. **Missing Normalization**: Forgetting to normalize after Parallelization
4. **Generic Knowledge Bases**: Not making RAG project-specific enough
5. **Poor Chain Design**: Chain steps that overlap or don't validate

### Remediation for Failing Students

**Score 20-27** (Near Pass):
- Review one specific pattern in depth
- Redo practical question with instructor guidance
- Focus on pattern selection criteria

**Score 10-19** (Needs Improvement):
- Review all module materials
- Complete additional practice exercises
- One-on-one session with instructor
- Retake after 1 week

**Score 0-9** (Significant Gap):
- Re-watch all lecture videos
- Complete all exercises again
- Pair with successful student for study
- Retake after 2 weeks

---

## Post-Quiz Activities

### For Students Who Passed (28+ points)

1. **Apply to Real Project**
   - Choose one pattern
   - Implement in your work
   - Document results

2. **Help Others**
   - Join study group as mentor
   - Share your practical question answer
   - Explain patterns to classmates

3. **Advanced Challenge**
   - Complete bonus mastery challenge
   - Build automation script
   - Present to class

### For Students Who Need Improvement (<28 points)

1. **Review Weak Areas**
   - Identify lowest-scoring sections
   - Re-read relevant slides
   - Review code examples

2. **Practice Exercises**
   - Redo exercises for weak patterns
   - Create your own examples
   - Explain to study partner

3. **Get Help**
   - Office hours
   - Study group
   - Slack channel

4. **Retake When Ready**
   - No penalty for retakes
   - Unlimited attempts
   - Different question variations

---

## Quiz Reflection (Optional)

After completing the quiz, reflect on:

1. Which pattern do you understand best? Why?
2. Which pattern needs more study?
3. How confident are you applying these to real projects?
4. What surprised you most about agentic patterns?
5. What additional resources would help you master this?

Share your reflections in #qa-course-module-8 on Slack!

---

**Good luck on the quiz!**

Remember: This quiz assesses understanding, not memorization. Focus on demonstrating how and when to apply patterns effectively.

---

*Module 08 Quiz - Version 1.0*
*MentorMate QA Automation Course (AI-Enhanced)*
*Last Updated: November 2025*
