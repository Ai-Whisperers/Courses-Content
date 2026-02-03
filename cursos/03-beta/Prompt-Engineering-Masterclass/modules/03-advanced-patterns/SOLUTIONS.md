# Module 3 Solutions: Advanced Prompting Patterns Lab

## Solution Guide - Key Examples and Patterns

---

## Part 1: Few-Shot Learning

### Task 1.1: Few-Shot Classifier Example

**Complete Few-Shot Prompt:**
```
Classify customer support tickets by urgency: Critical, High, Medium, or Low.

Critical = System down, security issue, revenue impact
High = Major feature broken, affecting many users
Medium = Feature issue affecting some users, workarounds exist  
Low = Questions, minor issues, feature requests

Example 1:
Ticket: "I forgot my password and can't log in."
Classification: Low - Standard password reset request

Example 2:
Ticket: "Payment processing is failing for all customers right now."
Classification: Critical - Revenue impact, affecting all users

Example 3:
Ticket: "The export feature isn't working for CSV files, but JSON exports work."
Classification: Medium - Feature issue with workaround available

Example 4:
Ticket: "We discovered customer data visible to unauthorized users."
Classification: Critical - Security breach, immediate action required

Now classify this ticket:
Ticket: "The website is completely down and we're losing sales every minute."
Classification:
```

**Expected Output:** Critical - System down with revenue impact

**Test Results:**

| Test Input | Expected | Likely Output | Correct? |
|------------|----------|---------------|----------|
| Website down, losing sales | Critical | Critical | ✅ YES |
| Question about pricing | Low | Low | ✅ YES |
| Feature not working as documented | Medium | Medium/High | ⚠️ May vary |
| Data breach suspected | Critical | Critical | ✅ YES |

### Task 1.2: Format Conversion Solution

**Few-Shot Prompt Example:**
```
Convert informal meeting notes into structured minutes.

Example 1:
Input: "discussed q3 goals. sarah said focus on customer retention. mike agreed, suggested loyalty program. decided to research options."
Output:
## Meeting Minutes
**Topic:** Q3 Goals
**Decisions:**
- Focus on customer retention
**Action Items:**
- Research loyalty program options (Owner: TBD)

Example 2:
Input: "pricing issue came up. customers complaining its too high. need to review competitor pricing and get back to team next week."
Output:
## Meeting Minutes
**Topic:** Pricing Concerns
**Issues Raised:**
- Customer feedback: pricing too high
**Action Items:**
- Review competitor pricing (Deadline: Next week)

[Additional example...]

Now convert:
[Test input]
```

**Expected Output Quality:** 4-5/5 with proper structure and action items identified

### Task 1.3: Edge Case Handling

**Enhanced Prompt with Edge Cases:**
```
[Original examples...]

Edge Case Example - Ambiguous:
Ticket: "The app is slow sometimes."
Classification: Medium - Performance issue, but lacks specifics. Note: Request more details (when, which features, how slow).

Edge Case Example - Multiple Issues:
Ticket: "Can't log in (forgot password) and also the dashboard won't load."
Classification: Split into: Low (password reset) + Medium (dashboard issue). Note: Create separate tickets.

Edge Case Example - Missing Info:
Ticket: "It's broken."
Classification: Cannot determine - Insufficient information. Action: Request clarification (what's broken, error messages, steps to reproduce).
```

---

## Part 2: Chain-of-Thought

### Task 2.1: Math Problem Solution

**With CoT Prompt:**
```
A store marks up products by 40%. During a sale, they offer 25% off the marked price.
What's the final price of an item that originally cost $80?

Let's solve this step by step:

Step 1: Calculate the marked-up price
- Original cost: $80
- Markup: 40% of $80 = $32
- Marked price: $80 + $32 = $112

Step 2: Calculate the sale price
- Marked price: $112
- Discount: 25% of $112 = $28
- Sale price: $112 - $28 = $84

Final Answer: $84
```

### Task 2.2: Business Decision Example

**CoT Prompt:**
```
Should we launch our new feature in Q1 or wait until Q2?

Context: [scenario details]

Let's analyze this systematically:

1. **Q1 Launch Considerations:**
   - Pros: First-to-market advantage, Q1 revenue impact
   - Cons: Tight timeline, incomplete testing, support team not ready
   - Risk level: High

2. **Q2 Launch Considerations:**
   - Pros: More thorough testing, better training, refined UX
   - Cons: Competitor may launch first, delayed revenue
   - Risk level: Medium

3. **Key Decision Factors:**
   - Most important: Product quality vs. speed to market
   - Market analysis: Competitor launch unlikely before Q2
   - Resource analysis: Support team needs 6 weeks prep minimum

4. **Recommendation:**
   Launch in Q2. Quality and readiness outweigh 3-month delay.
   Competitor timing supports this. Use Q1 for beta testing.
```

---

## Part 3: ReAct Pattern

### Task 3.1: Research Question Example

**ReAct Prompt Solution:**
```
Question: Is investing in index funds better than individual stocks for beginners?

Thought 1: I need to compare index funds vs individual stocks for beginners.
Action 1: Consider key factors - risk, required knowledge, time commitment, historical returns.
Observation 1: Index funds offer diversification, lower risk, passive management. Individual stocks require research, higher risk, active management.

Thought 2: "Better" depends on beginner's goals and situation.
Action 2: Define what "better" means for a typical beginner.
Observation 2: Beginners typically prioritize: low risk, simple management, steady growth, learning opportunity.

Thought 3: Need to weigh index fund advantages against learning from stock picking.
Action 3: Compare outcomes for typical beginner scenarios.
Observation 3: Index funds match 3/4 priorities (low risk, simple, steady). Stocks only match learning but add significant risk.

Final Answer: For most beginners, index funds are better because they minimize risk while providing market exposure and requiring minimal time/knowledge. Individual stocks suit beginners only if they're specifically interested in learning active investing and can afford the higher risk and time investment.
```

---

## Part 4: Self-Consistency

### Task 4.1: Multiple Solution Paths

**Self-Consistency Prompt:**
```
Problem: Calculate ROI for a marketing campaign that cost $50,000 and generated $185,000 in revenue with 35% profit margin.

Generate 3 independent calculations:

Path 1 - Direct ROI on Revenue:
ROI = (Revenue - Cost) / Cost
ROI = ($185,000 - $50,000) / $50,000 = 270%

Path 2 - ROI on Profit:
Profit = $185,000 × 35% = $64,750
ROI = (Profit - Cost) / Cost
ROI = ($64,750 - $50,000) / $50,000 = 29.5%

Path 3 - Net Return:
Net = ($185,000 × 0.35) - $50,000 = $14,750
ROI = $14,750 / $50,000 = 29.5%

Consistency Check:
- Path 1: 270% (Revenue-based, not accounting for profit margin)
- Path 2: 29.5% (Profit-based, correct approach)
- Path 3: 29.5% (Same as Path 2, confirms)

Most Consistent Answer: 29.5% ROI (based on actual profit, which is the standard business metric)

Note: Path 1 would be misleading as it ignores the 65% cost of goods/services.
```

---

## Part 5: Meta-Prompting

### Task 5.1: Prompt Generation

**Meta-Prompt Example:**
```
Task: I need to create weekly team status updates that are concise but complete.

Generate an optimized prompt for this task. Include:
- Appropriate role
- Necessary context
- Clear output format
- Relevant constraints

Output:
---
You are a project manager experienced in clear, concise team communication.

Create a weekly team status update using this format:

## Week of [Date]

### Completed This Week
- [Achievement 1]
- [Achievement 2]

### In Progress
- [Item]: [Status, % complete]

### Upcoming Next Week
- [Priority 1]
- [Priority 2]

### Blockers/Concerns
- [Issue]: [Impact]

### Metrics
- [Key metric]: [Value] ([trend])

Constraints:
- Maximum 200 words total
- Focus on outcomes, not activities
- Highlight blockers clearly
- Audience: Leadership team (high-level view)
---
```

---

## Grading Rubric Summary

| Component | Full Credit Criteria |
|-----------|---------------------|
| Few-Shot (25pts) | 3-5 quality examples, handles test cases, addresses edge cases |
| Chain-of-Thought (25pts) | Clear step-by-step reasoning, logical flow, arrives at correct conclusion |
| ReAct (20pts) | Proper thought-action-observation cycles, builds logically to answer |
| Self-Consistency (15pts) | Multiple valid paths, consistency analysis, identifies most reliable answer |
| Meta-Prompting (15pts) | Generates complete, usable prompts with all components |

---

## Key Takeaways

**Few-Shot:**
- 3-5 examples optimal (more shows diminishing returns)
- Include edge cases for robustness
- Diverse examples > similar examples

**Chain-of-Thought:**
- Best for reasoning, analysis, math
- "Let's think step by step" triggers CoT behavior
- Makes AI's logic visible and verifiable

**ReAct:**
- Combines reasoning with information gathering
- Iterative: thought → action → observation → repeat
- Good for research and multi-step problems

**Self-Consistency:**
- Multiple solution paths reveal errors
- Highest-agreement answer usually most reliable
- Useful for high-stakes decisions

**Meta-Prompting:**
- Use AI to improve prompts
- Ask for analysis before generation
- Iterative: generate → test → refine

---

*Solution Guide | Module 3 | Prompt Engineering Masterclass*
