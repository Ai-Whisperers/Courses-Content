# Module 3: Identifying AI Opportunities

## Learning Objectives

By the end of this module, you will be able to:

1. Apply a structured framework for spotting AI opportunities
2. Identify which business processes benefit most from AI
3. Assess your organization's data readiness for AI
4. Prioritize AI opportunities using clear criteria
5. Create an initial opportunity list for your organization
6. Facilitate AI opportunity mapping discussions with stakeholders

---

## Prerequisites

- Completed Modules 1-2
- Understanding of AI capabilities and ROI
- Knowledge of your organization's key processes

**Estimated Time**: 3 hours

---

## 1. Framework for Spotting AI Opportunities

### The PAIN Framework

Use PAIN to identify where AI can help:

```
P - Process inefficiency (repetitive, time-consuming tasks)
A - Analysis needs (pattern finding, prediction, classification)
I - Information overload (too much data to process manually)
N - Natural language tasks (reading, writing, communicating)
```

### Process Inefficiency Signals

Look for these red flags:

| Signal | Example | AI Potential |
|--------|---------|--------------|
| Manual data entry | Copying between systems | Automation |
| Repetitive decisions | Approving routine requests | Decision automation |
| High volume + low complexity | Processing invoices | Full automation |
| Bottlenecks | Waiting for human review | AI-assisted processing |
| Error-prone tasks | Data transcription | AI verification |

### Analysis Needs Signals

| Signal | Example | AI Potential |
|--------|---------|--------------|
| "We don't know why..." | Customer churn reasons | Pattern discovery |
| "We can't predict..." | Demand forecasting | Predictive models |
| "We can't process all..." | Review all feedback | Large-scale analysis |
| "We need to categorize..." | Support ticket routing | Classification |
| "We're looking for..." | Fraud detection | Anomaly detection |

### Information Overload Signals

| Signal | Example | AI Potential |
|--------|---------|--------------|
| Unread reports | Market research piling up | Summarization |
| Missed insights | Data exists but unused | Pattern extraction |
| Manual synthesis | Combining multiple sources | Automated synthesis |
| Sampling vs. full review | Only reviewing subset | Complete analysis |

### Natural Language Signals

| Signal | Example | AI Potential |
|--------|---------|--------------|
| Writing bottleneck | Drafting takes too long | Content generation |
| Translation needs | Multi-language operations | Translation |
| Communication volume | Too many emails | Response assistance |
| Content personalization | Generic communications | Tailored content |

---

## 2. Which Processes Benefit Most

### High-Value AI Candidates

Processes most likely to benefit from AI share these characteristics:

```
┌─────────────────────────────────────────────────────────────┐
│          IDEAL AI CANDIDATE CHARACTERISTICS                 │
├─────────────────────────────────────────────────────────────┤
│ ✓ High volume of similar tasks                              │
│ ✓ Clear inputs and outputs                                  │
│ ✓ Existing digital data                                     │
│ ✓ Pattern-based decisions                                   │
│ ✓ Current process is slow or expensive                      │
│ ✓ Errors have meaningful cost                               │
│ ✓ Human judgment adds limited value                         │
│ ✓ Outcomes can be measured                                  │
└─────────────────────────────────────────────────────────────┘
```

### Process Categories by AI Fit

**Excellent Fit (Start Here)**
| Process Type | Examples | Why AI Works |
|--------------|----------|--------------|
| Document processing | Invoice handling, form processing | High volume, structured |
| Customer inquiries | FAQ responses, ticket routing | Repetitive, pattern-based |
| Data entry/validation | Order processing, data cleaning | Tedious, error-prone |
| Content generation | Report drafting, email writing | Time-consuming, formulaic |

**Good Fit (Next Wave)**
| Process Type | Examples | Why AI Works |
|--------------|----------|--------------|
| Prediction tasks | Demand forecasting, churn prediction | Data-rich, measurable |
| Classification | Lead scoring, content categorization | Clear categories exist |
| Recommendations | Product suggestions, next-best-action | Historical patterns |
| Quality control | Defect detection, content review | Visual/text patterns |

**Challenging Fit (Be Careful)**
| Process Type | Examples | Why It's Hard |
|--------------|----------|---------------|
| Strategic decisions | M&A, market entry | Judgment-heavy, unique |
| Relationship-dependent | Key account management | Trust, nuance |
| Highly regulated | Some medical/legal decisions | Liability concerns |
| Creative/original | Brand strategy, innovation | True creativity needed |

### The 4H Test

For any process, ask:

- **High volume?** Does it happen frequently?
- **Homogeneous?** Are instances similar?
- **Historical data?** Do you have past examples?
- **Human bottleneck?** Is human capacity the constraint?

Score 4/4 = Excellent candidate
Score 3/4 = Good candidate
Score 2/4 = Possible candidate
Score 1/4 = Unlikely candidate

---

## 3. Data Readiness Assessment

### Why Data Readiness Matters

AI learns from data. No data = no AI.

```
AI Quality = f(Data Quality, Data Quantity, Data Relevance)
```

### Data Readiness Checklist

**Data Exists**
- [ ] Do you have digital records of the process?
- [ ] How far back does the data go?
- [ ] Is it accessible (not locked in legacy systems)?

**Data Quality**
- [ ] Is the data accurate and up-to-date?
- [ ] Is it consistently formatted?
- [ ] Are there significant gaps or missing values?

**Data Quantity**
- [ ] Do you have enough examples? (usually need thousands)
- [ ] Do you have examples of different scenarios?
- [ ] Do you have both positive and negative outcomes?

**Data Relevance**
- [ ] Does the data include the features AI needs?
- [ ] Does historical data reflect current conditions?
- [ ] Are the right variables captured?

### Data Readiness Levels

| Level | Description | AI Implication |
|-------|-------------|----------------|
| Level 1 | No digital data | Need to start collecting first |
| Level 2 | Data exists but scattered | Data integration project needed |
| Level 3 | Data centralized but messy | Data cleaning required |
| Level 4 | Clean, accessible data | Ready for AI projects |
| Level 5 | Rich, labeled data | Ready for advanced AI |

### Common Data Problems

| Problem | Impact | Solution |
|---------|--------|----------|
| Data silos | Can't combine relevant data | Integration/data lake |
| Poor quality | AI learns wrong patterns | Data cleaning project |
| Missing labels | Can't train supervised AI | Labeling effort |
| Bias in data | AI inherits bias | Audit and remediate |
| Privacy constraints | Can't use certain data | Privacy-preserving techniques |

---

## 4. Prioritization Criteria

### The VALUE Framework

Score opportunities on five dimensions:

```
V - Value potential (financial impact)
A - Achievability (technical feasibility)
L - Leadership support (organizational buy-in)
U - Urgency (competitive or operational pressure)
E - Enablement (data and infrastructure readiness)
```

### Scoring Matrix

| Criterion | Score 1 | Score 3 | Score 5 |
|-----------|---------|---------|---------|
| Value | < $50K/yr | $50-200K/yr | > $200K/yr |
| Achievability | Requires custom build | Some integration | Off-the-shelf available |
| Leadership | Skeptical | Neutral | Champion exists |
| Urgency | Nice to have | Helpful | Critical |
| Enablement | No data | Data exists, needs work | Data ready |

### Prioritization Matrix

Plot opportunities on this 2x2:

```
                    HIGH FEASIBILITY
                          │
        QUICK WINS        │        STRATEGIC
        (Do First)        │        (Plan Carefully)
                          │
LOW VALUE ─────────────────┼───────────────── HIGH VALUE
                          │
        DEPRIORITIZE      │        CHALLENGING
        (Don't Pursue)    │        (Fix Blockers First)
                          │
                    LOW FEASIBILITY
```

### Sample Priority Ranking

| Opportunity | V | A | L | U | E | Total | Priority |
|-------------|---|---|---|---|---|-------|----------|
| Email response AI | 3 | 5 | 4 | 4 | 5 | 21 | 1 |
| Customer churn prediction | 5 | 3 | 3 | 3 | 3 | 17 | 2 |
| Automated report generation | 2 | 5 | 4 | 2 | 5 | 18 | 2 |
| Predictive maintenance | 5 | 2 | 2 | 4 | 2 | 15 | 3 |

---

## 5. Starting Your Opportunity List

### Opportunity Documentation Template

For each opportunity, document:

```
┌─────────────────────────────────────────────────────────────┐
│ OPPORTUNITY: [Name]                                         │
├─────────────────────────────────────────────────────────────┤
│ Current State:                                              │
│ • Process description:                                      │
│ • Pain points:                                              │
│ • Current cost/time:                                        │
│ • Volume:                                                   │
├─────────────────────────────────────────────────────────────┤
│ AI Vision:                                                  │
│ • How AI could help:                                        │
│ • Expected improvement:                                     │
│ • Type of AI needed:                                        │
├─────────────────────────────────────────────────────────────┤
│ Readiness:                                                  │
│ • Data availability: [1-5]                                  │
│ • Technical feasibility: [1-5]                              │
│ • Organizational readiness: [1-5]                           │
├─────────────────────────────────────────────────────────────┤
│ Priority Score: [Total]                                     │
│ Recommended Timeline: [Quick win / Medium / Long term]      │
└─────────────────────────────────────────────────────────────┘
```

### Where to Look for Opportunities

**Ask These Questions:**

To Operations:
- What takes the most time?
- What do we do the most of?
- Where do errors happen?

To Customer Service:
- What questions do we answer repeatedly?
- Where do customers wait longest?
- What frustrates customers most?

To Sales:
- How do you prioritize leads?
- What information helps close deals?
- Where is manual research needed?

To Finance:
- What reports take longest to produce?
- Where is data entry required?
- What forecasting do you do manually?

To HR:
- What's the resume screening volume?
- How are candidates matched to roles?
- What questions do employees ask frequently?

### Interview Template

```
AI OPPORTUNITY DISCOVERY INTERVIEW

Interviewee: _____________
Role: _____________
Date: _____________

1. What are the most time-consuming tasks in your area?


2. What repetitive decisions do you or your team make?


3. Where do you struggle with too much information?


4. What would you automate if you could?


5. What data do you have that might contain useful patterns?


6. Where do errors or quality issues occur?


7. What predictions would help your work?


8. What customer/employee pain points involve communication?
```

---

## 6. Workshop: Map AI Opportunities

### Facilitation Guide

**Workshop Objective:** Identify and prioritize AI opportunities across the organization

**Participants:** Cross-functional team (5-8 people from different departments)

**Duration:** 2 hours

**Materials:**
- Whiteboard or digital collaboration tool
- Sticky notes
- Prioritization matrix template
- Opportunity documentation templates

### Workshop Agenda

**Part 1: Brainstorm (30 minutes)**
- Each person lists 3-5 pain points or opportunities
- Use PAIN framework prompts
- No filtering at this stage

**Part 2: Cluster (20 minutes)**
- Group similar opportunities
- Name each cluster
- Identify themes

**Part 3: Evaluate (30 minutes)**
- Score top 10 opportunities using VALUE criteria
- Discuss disagreements
- Reach consensus on scores

**Part 4: Prioritize (20 minutes)**
- Plot on prioritization matrix
- Identify quick wins
- Flag strategic opportunities

**Part 5: Next Steps (20 minutes)**
- Assign owners for top opportunities
- Define immediate next steps
- Schedule follow-up

### Sample Workshop Output

```
OPPORTUNITY MAP

Quick Wins (High Feasibility, Moderate Value):
1. Email drafting assistance
2. Meeting note summarization
3. FAQ chatbot

Strategic (High Value, High Feasibility):
4. Customer churn prediction
5. Demand forecasting

Investigate Further (High Value, Low Feasibility):
6. Automated quality inspection
7. Predictive maintenance

Deprioritize:
8. Full autonomous customer service
9. AI-generated strategy
```

---

## 7. Common Pitfalls to Avoid

### Pitfall 1: Solution Looking for a Problem

**Symptom:** "We should use AI for something"
**Fix:** Start with business problems, not technology

### Pitfall 2: Boiling the Ocean

**Symptom:** Starting with the biggest, hardest problem
**Fix:** Start with quick wins to build capability

### Pitfall 3: Ignoring Data Reality

**Symptom:** Assuming data exists and is ready
**Fix:** Assess data readiness before committing

### Pitfall 4: Going It Alone

**Symptom:** One department working in isolation
**Fix:** Include stakeholders from the start

### Pitfall 5: Underestimating Change Management

**Symptom:** Focusing only on technology
**Fix:** Plan for people and process changes

---

## Best Practices Summary

1. **Use PAIN framework** to systematically find opportunities
2. **Apply the 4H test** to validate candidates
3. **Assess data readiness** before committing
4. **Score using VALUE** for objective prioritization
5. **Start with quick wins** to build momentum
6. **Document thoroughly** for stakeholder alignment
7. **Involve stakeholders** early and often

---

## Knowledge Check

Before the exercises, confirm you can answer:

1. What does PAIN stand for in opportunity identification?
2. What are the four H's in the 4H test?
3. What are the five levels of data readiness?
4. How do you use the VALUE framework for prioritization?
5. What questions should you ask to discover AI opportunities?

---

## Summary

In this module, you learned:

- **PAIN Framework**: Systematic approach to finding AI opportunities
- **Process Assessment**: Which processes benefit most from AI
- **Data Readiness**: How to evaluate data preparedness
- **Prioritization**: VALUE framework for ranking opportunities
- **Documentation**: How to capture and communicate opportunities
- **Workshop Facilitation**: How to lead opportunity discovery

**Next Module**: Managing Risk & Governance - understanding AI limitations and building responsible practices.

---

*Module 3 of 6 | Introduction to AI for Business Professionals | Duration: 3 hours*
