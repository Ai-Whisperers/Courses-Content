# Module 5 Quiz: AI-Powered Quality Assurance

**Total Points:** 20
**Passing Score:** 14/20 (70%)
**Time Limit:** 20 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is the PRIMARY advantage of AI QA over traditional manual QA?

A) AI QA is always more accurate
B) AI QA can evaluate 100% of interactions vs. 1-5% manual sampling
C) AI QA eliminates the need for human QA managers
D) AI QA is free to implement

### Question 2
When designing a QA rubric for AI evaluation, what makes a criterion "AI-optimized"?

A) It uses technical jargon
B) It's vague enough to allow flexibility
C) It's specific, measurable, and has clear detection methods
D) It only scores binary yes/no outcomes

### Question 3
What is "QA calibration"?

A) Adjusting microphone volume for call quality
B) Ensuring AI and human evaluators score consistently using the same standards
C) Calculating average handle time
D) Setting up the QA software

### Question 4
Which type of criterion evaluation is BEST for "Agent uses customer's name in greeting"?

A) Scale (1-5)
B) Binary (yes/no)
C) Conditional
D) Percentage

### Question 5
What should trigger a compliance rule with "critical" severity?

A) Agent forgets to say goodbye
B) Potential PII exposure or legal violation
C) Agent uses slightly informal language
D) Response is longer than recommended

### Question 6
What is the purpose of extracting coaching insights from QA data?

A) To punish agents for low scores
B) To identify specific improvement areas and provide actionable development guidance
C) To rank agents for termination decisions
D) To reduce the number of training sessions

### Question 7
Which pattern analysis would MOST likely indicate a systemic training need?

A) One agent struggles with technical questions
B) Multiple agents score low on the same criterion
C) Scores vary by time of day
D) One customer complained about an agent

### Question 8
What confidence level should AI report when evaluating a criterion with ambiguous evidence?

A) Always report high confidence
B) Report medium or low confidence with explanation
C) Skip the criterion entirely
D) Default to the highest possible score

### Question 9
How should compliance violations with "high" severity be handled?

A) Ignore until quarterly review
B) Review within 24 hours and address promptly
C) Automatically terminate the agent
D) Only address if customer complains

### Question 10
What is the recommended frequency for QA calibration sessions?

A) Once per year
B) Monthly, with quarterly rubric reviews
C) Daily
D) Only when problems arise

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: AI QA should completely replace human quality reviewers.

### Question 12
True or False: A well-designed QA rubric includes calibration examples for ambiguous situations.

### Question 13
True or False: Compliance monitoring should only check for legal violations, not company policy adherence.

### Question 14
True or False: Coaching insights should focus on specific behaviors, not general statements like "improve quality."

### Question 15
True or False: If an agent scores 100% on AI QA, no further review or coaching is needed.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario:** Your AI QA system evaluates an interaction and produces:
- Score: 78/100
- Confidence: 62%
- Flags: "Empathy criterion unclear - customer tone ambiguous"

**Question:** What should happen with this evaluation?

A) Accept the score as final
B) Flag for human review due to low confidence
C) Automatically increase the score to compensate
D) Delete the evaluation

### Question 17
**Scenario:** Monthly QA analytics show:
- Agent Sarah: 92 avg score, all categories strong
- Agent Mike: 88 avg score, "Closing" category at 45%
- Agent Lisa: 74 avg score, multiple categories low

**Question:** What is the MOST efficient coaching priority?

A) Focus all coaching on Lisa since she has the lowest score
B) Provide targeted closing training for Mike, comprehensive support for Lisa, recognition for Sarah
C) Group training on closing for all agents
D) No coaching needed - average team score is good

### Question 18
**Scenario:** Compliance scan finds this in an agent's response:
> "I'll make a one-time exception and give you a $200 credit since you've been a customer for so long."

The agent's authorization level is $50 maximum credit.

**Question:** How should this be classified?

A) Low severity - it's just $150 over
B) Medium severity - coach the agent
C) High severity - unauthorized action requiring immediate review and policy reinforcement
D) Not a violation - customer tenure justifies it

### Question 19
**Scenario:** Your calibration session reveals:
- Human reviewers average score: 82
- AI QA average score: 89
- Correlation: 0.78

**Question:** What does this indicate?

A) AI QA is better than humans
B) AI may be scoring too generously - investigate and recalibrate
C) Perfect alignment, no action needed
D) Human reviewers are too strict

### Question 20
**Scenario:** An agent's QA pattern shows:
- Monday-Thursday: 88 average score
- Friday: 71 average score
- No difference in ticket types or volume

**Question:** What insight should this generate?

A) No action - Friday fluctuation is normal
B) Investigate Friday-specific factors (fatigue, schedule) and adjust support/supervision
C) Lower expectations for Fridays
D) Give the agent Fridays off

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - AI QA can evaluate 100% of interactions vs. 1-5% manual sampling
   - *Complete coverage is AI QA's primary advantage over sampling-based manual review.*

2. **C** - It's specific, measurable, and has clear detection methods
   - *AI needs clear, objective criteria it can evaluate consistently.*

3. **B** - Ensuring AI and human evaluators score consistently using the same standards
   - *Calibration aligns AI and human scoring for consistency and accuracy.*

4. **B** - Binary (yes/no)
   - *Either the name is used or it isn't - clear yes/no evaluation.*

5. **B** - Potential PII exposure or legal violation
   - *Critical severity is reserved for serious compliance risks.*

6. **B** - To identify specific improvement areas and provide actionable development guidance
   - *QA data should drive coaching, not punishment.*

7. **B** - Multiple agents score low on the same criterion
   - *Pattern across agents indicates systemic training need, not individual issue.*

8. **B** - Report medium or low confidence with explanation
   - *Transparency about uncertainty enables appropriate human review.*

9. **B** - Review within 24 hours and address promptly
   - *High severity requires timely attention but not immediate crisis response.*

10. **B** - Monthly, with quarterly rubric reviews
    - *Regular calibration maintains accuracy; quarterly reviews ensure rubric relevance.*

### Section 2: True/False

11. **False** - AI QA augments human reviewers by handling volume; humans handle edge cases, calibration, and coaching.

12. **True** - Calibration examples reduce scoring inconsistency for ambiguous situations.

13. **False** - Compliance monitoring should cover legal requirements AND company policies, brand guidelines, and procedures.

14. **True** - Specific, actionable feedback (e.g., "add next steps to resolutions") is more useful than vague guidance.

15. **False** - High scores don't eliminate need for recognition, development opportunities, or occasional calibration review.

### Section 3: Scenario-Based

16. **B** - Flag for human review due to low confidence
    - *62% confidence is below acceptable threshold; human review validates accuracy.*

17. **B** - Provide targeted closing training for Mike, comprehensive support for Lisa, recognition for Sarah
    - *Tailored coaching addresses specific needs efficiently rather than one-size-fits-all.*

18. **C** - High severity - unauthorized action requiring immediate review
    - *Exceeding authorization by 4x ($200 vs $50 limit) is a significant policy violation.*

19. **B** - AI may be scoring too generously - investigate and recalibrate
    - *7-point gap with 0.78 correlation suggests systematic AI bias requiring adjustment.*

20. **B** - Investigate Friday-specific factors and adjust support/supervision
    - *Consistent 17-point Friday drop indicates addressable pattern, not random variation.*

---

## Scoring Guide

| Score | Grade | Interpretation |
|-------|-------|----------------|
| 18-20 | A | Excellent - Ready to implement AI QA systems |
| 16-17 | B | Good - Strong understanding with minor gaps |
| 14-15 | C | Satisfactory - Review calibration and compliance concepts |
| 12-13 | D | Needs Improvement - Revisit module content |
| Below 12 | F | Unsatisfactory - Complete module review required |

---

## Concept Review

If you scored below 70%, review these areas:

**AI QA Fundamentals (Questions 1, 2, 8, 11):**
- Advantages of AI QA
- AI-optimized criteria design
- Confidence handling

**Calibration (Questions 3, 10, 12, 19):**
- Purpose of calibration
- Calibration frequency
- Identifying AI scoring bias

**Compliance Monitoring (Questions 5, 9, 13, 18):**
- Severity levels
- Response timeframes
- Scope of compliance

**Coaching Insights (Questions 6, 7, 14, 15, 17, 20):**
- Purpose of coaching insights
- Pattern identification
- Actionable feedback

---

## QA Implementation Checklist

Before launching AI QA:

```
RUBRIC DESIGN
[ ] Categories defined with weights totaling 100
[ ] Criteria are specific and measurable
[ ] AI detection methods documented
[ ] Binary vs. scale vs. conditional designated
[ ] Calibration examples created

SCORING CONFIGURATION
[ ] Confidence thresholds set
[ ] Low-confidence handling defined
[ ] Human review triggers configured
[ ] Score calculation validated

COMPLIANCE
[ ] Rules cover legal requirements
[ ] Rules cover company policies
[ ] Severity levels assigned
[ ] Response procedures documented
[ ] Escalation paths defined

CALIBRATION PROCESS
[ ] Monthly calibration scheduled
[ ] Calibration sample selection defined
[ ] Human-AI comparison metrics set
[ ] Adjustment procedures documented

COACHING INTEGRATION
[ ] Insights extraction configured
[ ] Report templates created
[ ] Pattern detection enabled
[ ] Follow-up tracking system ready

MEASUREMENT
[ ] Calibration accuracy targets set
[ ] Compliance flag rate tracking
[ ] Score improvement tracking
[ ] Agent development metrics defined
```

---

*Quiz 5 of 9 | AI for Customer Service Teams | Duration: 20 minutes*
