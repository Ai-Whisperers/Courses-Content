# Module 5 Quiz: Test Planning with AI

**Time Limit**: 20 minutes
**Passing Score**: 70% (28/40 points)
**Attempts**: Unlimited

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Instructions

- Answer all questions
- Multiple choice: Select the best answer
- True/False: Select one option
- Short answer: Provide concise, specific answers
- Practical: Complete the test planning task

---

## Section 1: Multiple Choice (2 points each)

### Question 1
What are the eight main components of a comprehensive test plan?

a) Objectives, Scope, Strategy, Cases, Data, Environment, Schedule, Risks
b) Requirements, Design, Implementation, Execution, Results, Defects, Reports, Sign-off
c) Planning, Preparation, Execution, Reporting, Closure, Review, Approval, Archive
d) Unit, Integration, System, Acceptance, Regression, Smoke, Sanity, Exploratory

**Answer**: ______

---

### Question 2
Which test design technique divides input domains into groups that should behave the same way?

a) Boundary Value Analysis
b) Equivalence Partitioning
c) Decision Table Testing
d) State Transition Testing

**Answer**: ______

---

### Question 3
What does Boundary Value Analysis focus on testing?

a) Random values from each partition
b) Values at the edges of valid and invalid ranges
c) Only the middle values of ranges
d) All possible values in a range

**Answer**: ______

---

### Question 4
In risk-based testing, how is risk score typically calculated?

a) Impact + Likelihood
b) Impact × Likelihood
c) Impact × Likelihood × Complexity
d) (Impact + Likelihood) / 2

**Answer**: ______

---

### Question 5
What should a test coverage matrix map?

a) Only test cases to features
b) Test cases to requirements, code paths, and risk areas
c) Only requirements to features
d) Only defects to test cases

**Answer**: ______

---

## Section 2: True/False (1 point each)

### Question 6
A comprehensive test plan should include both in-scope and out-of-scope items with rationale.

- [ ] True
- [ ] False

---

### Question 7
All features should be assigned P0 (critical) priority to ensure they are all tested thoroughly.

- [ ] True
- [ ] False

---

### Question 8
Equivalence partitioning requires testing every possible value in each partition.

- [ ] True
- [ ] False

---

### Question 9
Test data planning should include valid data, invalid data, boundary values, and security test payloads.

- [ ] True
- [ ] False

---

### Question 10
AI can generate a complete, production-ready test plan without any human review or refinement.

- [ ] True
- [ ] False

---

## Section 3: Short Answer (5 points each)

### Question 11
Name and briefly describe four test design techniques.

1. _____________ : _________________________________
   _________________________________________________

2. _____________ : _________________________________
   _________________________________________________

3. _____________ : _________________________________
   _________________________________________________

4. _____________ : _________________________________
   _________________________________________________

---

### Question 12
For a username field that accepts 3-20 characters, list the boundary values that should be tested.

**Below minimum**: _________________________________

**At minimum**: ____________________________________

**Just above minimum**: ____________________________

**Normal value**: __________________________________

**Just below maximum**: ____________________________

**At maximum**: ____________________________________

**Above maximum**: _________________________________

---

### Question 13
Explain how to prioritize test cases using risk-based testing. Include at least three risk factors to consider.

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## Section 4: Practical Application (10 points)

### Question 14
Create a mini test plan outline for this function:

```javascript
async function processRefund(orderId, amount, reason) {
  // Validates order exists and is eligible for refund
  // Checks refund amount doesn't exceed order total
  // Processes refund through payment gateway
  // Updates order status
  // Sends refund confirmation email
  // Returns refund transaction record
}
```

**Business Rules**:
- Refunds allowed within 30 days of purchase
- Partial refunds allowed
- Maximum refund: original order amount
- Refund reasons: defective, wrong item, changed mind, other

**Create**:

#### A. Test Objectives (2 points)
List 2 primary testing objectives:

1. _________________________________________________
2. _________________________________________________

#### B. Test Cases by Priority (6 points)
Create 3 test cases for EACH priority level:

**P0 (Critical) - 2 points**:
1. _________________________________________________
2. _________________________________________________
3. _________________________________________________

**P1 (High) - 2 points**:
1. _________________________________________________
2. _________________________________________________
3. _________________________________________________

**P2 (Medium) - 2 points**:
1. _________________________________________________
2. _________________________________________________
3. _________________________________________________

#### C. Test Data Requirements (2 points)
List 4 types of test data needed:

1. _________________________________________________
2. _________________________________________________
3. _________________________________________________
4. _________________________________________________

---

## Answer Key

*(For instructor use only)*

### Section 1: Multiple Choice

1. **a** - Objectives, Scope, Strategy, Cases, Data, Environment, Schedule, Risks
   - These are the 8 standard components of a comprehensive test plan

2. **b** - Equivalence Partitioning
   - This technique divides inputs into equivalent classes

3. **b** - Values at the edges of valid and invalid ranges
   - BVA focuses on minimum, maximum, and just beyond boundaries

4. **c** - Impact × Likelihood × Complexity
   - This is the most comprehensive risk calculation formula

5. **b** - Test cases to requirements, code paths, and risk areas
   - Coverage matrices provide traceability across multiple dimensions

**Section 1 Total**: 10 points

---

### Section 2: True/False

6. **True** - Both in-scope and out-of-scope items should be specified with rationale

7. **False** - Features should be prioritized based on risk, not all marked P0

8. **False** - EP requires testing one representative value from each partition, not every value

9. **True** - Comprehensive test data includes all these categories

10. **False** - AI output requires human review, domain knowledge addition, and refinement

**Section 2 Total**: 5 points

---

### Section 3: Short Answer

### Question 11 (5 points)
Any four of these techniques (1.25 points each):

1. **Equivalence Partitioning**: Divides inputs into groups that should behave the same, tests one value from each group

2. **Boundary Value Analysis**: Tests values at the edges of valid/invalid ranges (min, max, just before/after)

3. **Decision Table Testing**: Maps all combinations of conditions to expected actions/outcomes

4. **State Transition Testing**: Tests valid state changes and invalid transitions in a system

5. **Error Guessing**: Uses experience to predict likely error scenarios

6. **Pairwise Testing**: Tests all possible pairs of parameters to find interaction defects

**Grading**:
- Full points: Correct name + accurate description
- Half points: Correct name, vague/incomplete description
- Zero points: Incorrect or missing

---

### Question 12 (5 points)
Username field (3-20 characters):

**Correct answers** (0.71 points each):
- **Below minimum**: 2 characters (or any string with length < 3)
- **At minimum**: 3 characters (e.g., "abc")
- **Just above minimum**: 4 characters (e.g., "abcd")
- **Normal value**: 10 characters (or any mid-range value like 8-15 chars)
- **Just below maximum**: 19 characters
- **At maximum**: 20 characters
- **Above maximum**: 21 characters (or any string with length > 20)

**Grading**:
- Must test all 7 boundary points
- Partial credit for 5-6 correct boundaries
- Values must be appropriate (e.g., "2 chars" for below minimum, not specific strings required unless specified)

---

### Question 13 (5 points)
**Model answer** should include:

**Risk factors** (at least 3 required - 3 points):
1. Business impact (revenue loss, security breach, data loss)
2. Defect likelihood (code complexity, recent changes, historical bugs)
3. Usage frequency (how often used, number of users affected)
4. Technical complexity (dependencies, integrations)

**Prioritization process** (2 points):
- Calculate risk score (multiply or add factors)
- Assign priorities based on scores (P0 for highest risk, P3 for lowest)
- Test high-risk areas first and more thoroughly

**Grading**:
- 5 points: 3+ risk factors + clear prioritization process
- 3-4 points: 2 risk factors + basic prioritization
- 1-2 points: 1 risk factor or prioritization only
- 0 points: Vague or incorrect

**Section 3 Total**: 15 points

---

### Section 4: Practical Application

### Question 14 (10 points)

#### A. Test Objectives (2 points)
**Model answers** (1 point each, any 2 are acceptable):
- Verify refunds are processed correctly for valid requests
- Ensure refund amount validation prevents over-refunding
- Confirm order status is updated after successful refund
- Validate 30-day refund window is enforced
- Ensure refund confirmation emails are sent
- Verify payment gateway integration works correctly

**Grading**:
- 1 point each for clear, specific objective
- 0.5 points for vague objective
- Must be testable objectives, not general statements

---

#### B. Test Cases (6 points - 2 points per priority level)

**P0 (Critical) - Model answers**:
1. Successful full refund for valid order within 30 days
2. Refund amount validation (reject refund > order total)
3. Reject refund for order outside 30-day window
4. Handle payment gateway decline/failure
5. Verify order exists before processing refund

**P1 (High) - Model answers**:
1. Successful partial refund (amount < order total)
2. Process refund with each valid reason (defective, wrong item, etc.)
3. Verify refund confirmation email is sent
4. Verify order status updated to "partially refunded" or "fully refunded"
5. Handle multiple refunds for same order (if allowed)

**P2 (Medium) - Model answers**:
1. Refund at exactly 30 days (boundary test)
2. Refund with amount at $0.01 (minimum boundary)
3. Refund with very long reason text (edge case)
4. Concurrent refund requests for same order
5. Refund when email service is unavailable

**Grading per priority level** (2 points total):
- 2 points: 3 appropriate test cases for the priority level
- 1.5 points: 3 test cases but priorities not quite right
- 1 point: 2 test cases appropriate
- 0.5 points: 1 test case appropriate
- 0 points: No appropriate test cases or wrong priority

**Priority appropriateness**:
- P0: Critical path, revenue impact, security, data integrity
- P1: Important features, common scenarios, data quality
- P2: Edge cases, less common scenarios, error handling

---

#### C. Test Data Requirements (2 points)

**Model answers** (0.5 points each, any 4):
- **Valid orders**: Within 30 days, various amounts, different statuses
- **Invalid orders**: Outside 30-day window, already fully refunded, canceled
- **Refund amounts**: Valid (< order total), invalid (> order total), boundary ($0.01, order total)
- **Refund reasons**: Each valid reason, invalid reason, missing reason
- **Payment gateway responses**: Success, decline, timeout, error
- **Order statuses**: Delivered, shipped, pending (various eligibility states)

**Grading**:
- 0.5 points each for specific, relevant test data type
- Must be actionable (not just "test data" but specific categories)

---

### Section 4 Total: 10 points

---

## Scoring Summary

| Section | Points | Weight |
|---------|--------|--------|
| Multiple Choice (5 questions) | 10 | 25% |
| True/False (5 questions) | 5 | 12.5% |
| Short Answer (3 questions) | 15 | 37.5% |
| Practical (1 question) | 10 | 25% |
| **Total** | **40** | **100%** |

**Passing Score**: 28/40 points (70%)

---

## Score Interpretation

| Score | Grade | Interpretation |
|-------|-------|----------------|
| 36-40 | A (90-100%) | Excellent understanding of test planning concepts |
| 32-35 | B (80-89%) | Good understanding, minor gaps |
| 28-31 | C (70-79%) | Satisfactory understanding, passing |
| 24-27 | D (60-69%) | Needs improvement, review material |
| < 24 | F (< 60%) | Significant gaps, retake recommended |

---

## Common Mistakes and Learning Points

### Mistake 1: Confusing test design techniques
**Issue**: Mixing up equivalence partitioning and boundary value analysis
**Fix**: EP divides into groups (test one from each), BVA focuses on edges (test min/max/beyond)

### Mistake 2: Making all tests P0
**Issue**: Not understanding priority levels and risk-based testing
**Fix**: P0 is for critical path and high business impact only. Most tests are P1 or P2.

### Mistake 3: Vague test objectives
**Issue**: Objectives like "test the feature" or "make sure it works"
**Fix**: Be specific - "Verify refund amount validation prevents over-refunding"

### Mistake 4: Missing test data categories
**Issue**: Only listing "valid data" and "invalid data"
**Fix**: Include boundary values, special cases (security payloads), edge cases, performance data

### Mistake 5: Incomplete boundary analysis
**Issue**: Only testing min and max values
**Fix**: Test all seven points: below min, at min, above min, normal, below max, at max, above max

---

## Retake Policy

- Unlimited attempts allowed
- Must wait 24 hours between attempts
- Different question variations may appear
- Review module materials before retaking
- Focus on areas where you lost points

---

## Study Resources

### Before Retake, Review:
1. **Slides 5-15**: Test plan components
2. **Slides 29-38**: Test design techniques
3. **Slides 40-44**: Risk-based prioritization
4. **Code Examples**: Test plan templates and examples
5. **Lab**: Complete the hands-on lab for practical experience

### Practice:
- Create test plans for simple functions
- Practice equivalence partitioning on various inputs
- Apply boundary value analysis to different data types
- Build a coverage matrix for a small project

---

## Feedback

After completing the quiz:

**What went well**:
_________________________________________________________________
_________________________________________________________________

**What was challenging**:
_________________________________________________________________
_________________________________________________________________

**Topics to review**:
_________________________________________________________________
_________________________________________________________________

**Questions for instructor**:
_________________________________________________________________
_________________________________________________________________

---

[Back to Module Overview](./MODULE-OVERVIEW.md)
