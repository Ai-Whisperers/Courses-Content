# Module 10 Quiz: Monitoring & Evaluation

**Total Points:** 20
**Passing Score:** 14/20 (70%)
**Time Limit:** 25 minutes

---

## Section 1: Multiple Choice (10 questions, 1 point each)

### Question 1
What is the PRIMARY purpose of hashing prompts before logging?

A) To make logs smaller
B) To protect user privacy while enabling debugging and deduplication
C) To speed up log searches
D) To encrypt the data

### Question 2
Which metric BEST indicates user satisfaction with AI responses?

A) Response latency
B) Token count
C) Thumbs up/down ratio combined with regeneration rate
D) Number of requests

### Question 3
When using "LLM-as-judge" for quality evaluation, which model should typically be used?

A) The most expensive model available
B) The same model that generated the response
C) A fast, cost-effective model like GPT-3.5 Turbo
D) A custom fine-tuned model only

### Question 4
What is the recommended approach for A/B test variant assignment?

A) Random assignment on each request
B) Deterministic assignment based on user ID hash (sticky)
C) Alternating between variants
D) User's choice

### Question 5
What statistical test is commonly used to determine if A/B test results are significant?

A) Chi-squared test
B) Student's t-test
C) ANOVA
D) Regression analysis

### Question 6
Which Prometheus metric type is BEST for tracking request latency?

A) Counter
B) Gauge
C) Histogram
D) Summary

### Question 7
What should trigger a quality degradation alert?

A) Any single low-quality response
B) Quality score dropping below threshold for sustained period
C) User complaining once
D) High latency

### Question 8
How should PII (Personally Identifiable Information) be handled in AI application logs?

A) Log everything for complete debugging
B) Redact or hash PII before logging
C) Never log anything
D) Store PII separately

### Question 9
What is "cooldown" in alerting systems?

A) Time to wait before the system starts
B) Minimum time between firing the same alert to prevent alert fatigue
C) Time to cool down servers
D) User waiting period

### Question 10
What does a p-value < 0.05 indicate in A/B test analysis?

A) The treatment is 95% better
B) There's less than 5% probability the difference is due to chance
C) 5% of users preferred the treatment
D) The test should run for 5 more days

---

## Section 2: True/False (5 questions, 1 point each)

### Question 11
True or False: Response latency alone is sufficient to measure AI application health.

### Question 12
True or False: A/B test variant assignment should be "sticky" - the same user should always get the same variant.

### Question 13
True or False: Quality metrics should only be collected through explicit user feedback (thumbs up/down).

### Question 14
True or False: Prometheus histograms automatically calculate percentiles like P50, P95, P99.

### Question 15
True or False: An A/B test should be stopped as soon as one variant shows better results.

---

## Section 3: Scenario-Based Questions (5 questions, 1 point each)

### Question 16
**Scenario:** Your AI application logs show:
```
{
  "request_id": "abc123",
  "prompt": "My SSN is 123-45-6789, can you help with my taxes?",
  "model": "gpt-4o",
  "user_id": "user_456"
}
```

**Question:** What is the PRIMARY problem with this log entry?

A) The request_id format is wrong
B) PII (SSN) is logged in plain text
C) The model name is incorrect
D) The user_id should be hashed

### Question 17
**Scenario:** Your quality metrics show:
- Average coherence score: 0.85
- Average relevance score: 0.90
- Thumbs down rate: 25%
- Regenerate rate: 40%

**Question:** What do these metrics suggest?

A) The AI is performing excellently
B) Automated scores are high but user satisfaction is low - investigate disconnect
C) Users are too demanding
D) The quality evaluator is broken

### Question 18
**Scenario:** Your A/B test has run for 2 days with these results:
- Control: n=50, mean quality=0.78
- Treatment: n=52, mean quality=0.82
- p-value: 0.15

**Question:** What should you do?

A) Declare treatment the winner and roll it out
B) Continue the test - results not yet statistically significant
C) Declare control the winner
D) Stop the test - it's taking too long

### Question 19
**Scenario:** Your alert system is firing the "high error rate" alert every 5 minutes, but each alert is for a brief spike that resolves immediately.

**Question:** What configuration change would help?

A) Disable the alert entirely
B) Increase the cooldown period and/or require sustained threshold breach
C) Lower the error rate threshold
D) Send alerts to more people

### Question 20
**Scenario:** You want to track both the total number of AI requests AND the current queue depth.

**Question:** Which Prometheus metric types should you use?

A) Both should be Counters
B) Both should be Gauges
C) Counter for total requests, Gauge for queue depth
D) Histogram for total requests, Counter for queue depth

---

## Answer Key

### Section 1: Multiple Choice

1. **B** - To protect user privacy while enabling debugging and deduplication
   - *Hashing allows correlation and deduplication without exposing sensitive content.*

2. **C** - Thumbs up/down ratio combined with regeneration rate
   - *Multiple signals together provide more accurate satisfaction measurement.*

3. **C** - A fast, cost-effective model like GPT-3.5 Turbo
   - *Evaluation should be cheap and fast; doesn't need the most powerful model.*

4. **B** - Deterministic assignment based on user ID hash (sticky)
   - *Sticky assignment ensures consistent user experience and valid statistical analysis.*

5. **B** - Student's t-test
   - *T-test compares means between two groups, ideal for A/B testing.*

6. **C** - Histogram
   - *Histograms track distributions and enable percentile calculations.*

7. **B** - Quality score dropping below threshold for sustained period
   - *Sustained degradation indicates real problems; single events may be noise.*

8. **B** - Redact or hash PII before logging
   - *Balance debugging needs with privacy requirements.*

9. **B** - Minimum time between firing the same alert to prevent alert fatigue
   - *Cooldown prevents being overwhelmed by repeated alerts for the same issue.*

10. **B** - There's less than 5% probability the difference is due to chance
    - *p < 0.05 is the standard threshold for statistical significance.*

### Section 2: True/False

11. **False** - Latency is important but doesn't capture quality, errors, cost, or user satisfaction.

12. **True** - Sticky assignment ensures valid experiment results and consistent user experience.

13. **False** - Automated evaluation (LLM-as-judge) complements explicit feedback for comprehensive quality measurement.

14. **True** - Prometheus histograms with appropriate buckets enable percentile queries.

15. **False** - Tests need sufficient sample size for statistical significance; early stopping leads to false conclusions.

### Section 3: Scenario-Based

16. **B** - PII (SSN) is logged in plain text
    - *SSN should never be logged; prompts should be hashed or PII redacted.*

17. **B** - Automated scores are high but user satisfaction is low
    - *Disconnect between automated metrics and user signals indicates the evaluator may miss what users care about.*

18. **B** - Continue the test - results not yet statistically significant
    - *p=0.15 > 0.05 means results could be due to chance; need more data.*

19. **B** - Increase the cooldown period and/or require sustained threshold breach
    - *Prevents alert fatigue from transient spikes while still catching real problems.*

20. **C** - Counter for total requests, Gauge for queue depth
    - *Counters only go up (total requests); Gauges can go up/down (current queue depth).*

---

## Scoring Guide

| Score | Grade | Interpretation |
|-------|-------|----------------|
| 18-20 | A | Excellent - Ready to build AI observability systems |
| 16-17 | B | Good - Solid understanding with minor gaps |
| 14-15 | C | Satisfactory - Review quality metrics and A/B testing |
| 12-13 | D | Needs Improvement - Revisit module content |
| Below 12 | F | Unsatisfactory - Complete module review required |

---

## Concept Review

If you scored below 70%, review these areas:

**Logging & Privacy (Questions 1, 8, 16):**
- What to log and what to redact
- Privacy-preserving techniques
- Log retention considerations

**Quality Metrics (Questions 2, 3, 13, 17):**
- User signals vs automated evaluation
- LLM-as-judge patterns
- Interpreting metric discrepancies

**A/B Testing (Questions 4, 5, 10, 15, 18):**
- Sticky assignment importance
- Statistical significance
- When to stop experiments

**Alerting & Metrics (Questions 6, 7, 9, 11, 19, 20):**
- Prometheus metric types
- Alert configuration
- Preventing alert fatigue

---

## Observability Checklist

```
LOGGING
[ ] Request/response logging implemented
[ ] PII redaction in place
[ ] Prompt hashing for privacy
[ ] Structured JSON format

METRICS
[ ] Request count by model/feature/status
[ ] Latency histograms
[ ] Token usage tracking
[ ] Cost tracking
[ ] Cache hit rates
[ ] Error rates

QUALITY
[ ] User feedback collection
[ ] Automated quality evaluation
[ ] Quality score aggregation
[ ] Trend analysis

ALERTING
[ ] Error rate alerts
[ ] Latency alerts
[ ] Cost alerts
[ ] Quality degradation alerts
[ ] Appropriate cooldowns

A/B TESTING
[ ] Sticky variant assignment
[ ] Result tracking
[ ] Statistical analysis
[ ] Clear decision criteria
```

---

*Quiz 10 of 12 | Building AI-Powered Applications | Duration: 25 minutes*
