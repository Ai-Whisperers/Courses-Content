# Module 4 Exercise: Data Analysis & Insights Lab

## Exercise Overview

**Objective**: Apply AI-assisted data analysis techniques to extract insights, create formulas, and communicate findings effectively.

**Duration**: 2.5 hours

**Tools Required**:
- AI tool (Claude or ChatGPT)
- Spreadsheet application (Excel or Google Sheets)
- Sample datasets (provided below)

---

## Part 1: Data Analysis (35 minutes)

### Task 1.1: Sales Data Analysis

Analyze the following quarterly sales data:

**Dataset:**
```
Region    | Q1 2024  | Q2 2024  | Q3 2024  | Q4 2024
----------|----------|----------|----------|----------
North     | $245,000 | $268,000 | $312,000 | $298,000
South     | $198,000 | $185,000 | $172,000 | $165,000
East      | $156,000 | $178,000 | $189,000 | $201,000
West      | $312,000 | $295,000 | $287,000 | $310,000
```

**Your Analysis Prompt:**
```
[Write your complete prompt asking for analysis]
```

**AI Analysis:**
```
[Paste the AI's analysis]
```

**Your Key Takeaways:**
1. Which region is performing best?
2. Which region needs attention?
3. What seasonal patterns do you see?
4. What would you recommend investigating further?

### Task 1.2: Customer Data Analysis

You have the following summary statistics from your customer database:

**Data Summary:**
```
Total customers: 2,500
Average purchase frequency: 3.2 times/year
Average order value: $89
Customer segments:
- VIP (top 10%): $450 avg order, 8.5 purchases/year
- Regular (middle 60%): $75 avg order, 3.1 purchases/year
- Occasional (bottom 30%): $42 avg order, 1.2 purchases/year

Year-over-year changes:
- Total customers: +12%
- Average order value: -5%
- VIP segment size: -8%
```

**Your Analysis Prompt:**
```
[Write your prompt asking for insights and recommendations]
```

**AI Analysis:**
```
[Paste output]
```

**Three Actions You Would Recommend:**
1.
2.
3.

---

## Part 2: Spreadsheet Formulas (30 minutes)

### Task 2.1: Formula Creation

Request formulas for the following scenarios:

**Scenario A: Commission Calculator**
You need a formula where:
- Sales data is in column B (starting row 2)
- Commission tiers: 3% for sales < $5,000, 5% for $5,000-$15,000, 8% for > $15,000

**Your Prompt:**
```
[Write your prompt]
```

**Formula Received:**
```
[Paste formula]
```

**Test the formula:** Did it work correctly? Y / N
**Any modifications needed?**

**Scenario B: Aging Report**
Calculate days outstanding for invoices:
- Invoice date in column A
- Today's date for comparison
- Categorize: Current (0-30), Past Due (31-60), Critical (61+)

**Your Prompt:**
```
[Write your prompt]
```

**Formulas Received:**
```
Days calculation: [formula]
Category: [formula]
```

### Task 2.2: Formula Debugging

This SUMIF formula isn't working correctly:

```
=SUMIF(A:A,"North",B:B)
```

The goal is to sum all sales for the "North" region, but it's returning 0 even though there are North region entries.

**Sample Data Context:**
- Column A contains regions with leading/trailing spaces sometimes
- Column B contains sales amounts
- Some cells in column A show "North " (with space)

**Your Debugging Prompt:**
```
[Write your prompt]
```

**AI's Explanation and Fix:**
```
[Paste response]
```

**Corrected Formula:**
```
[The working formula]
```

---

## Part 3: Report Creation (35 minutes)

### Task 3.1: Monthly Performance Report

Create a report structure from this data:

**Data:**
```
Metric               | Target  | Actual  | Variance
---------------------|---------|---------|----------
Revenue              | $500K   | $485K   | -3%
New Customers        | 200     | 245     | +23%
Customer Satisfaction| 4.5/5   | 4.2/5   | -7%
Response Time (hrs)  | 2       | 3.5     | -75%
Employee Turnover    | 5%      | 8%      | -60%
Project Completion   | 12      | 10      | -17%
```

**Your Report Structure Prompt:**
```
[Write your prompt requesting report structure and key messages]
```

**AI Report Framework:**
```
[Paste output]
```

**Your Executive Summary (2-3 sentences):**
```
[Write the summary you would use]
```

### Task 3.2: Visualization Recommendations

For the data above, what visualizations would you create?

**Your Prompt:**
```
[Ask for visualization recommendations]
```

**Recommended Visualizations:**
1. Chart type: ___ | Shows: ___
2. Chart type: ___ | Shows: ___
3. Chart type: ___ | Shows: ___

**Which visualization is MOST important and why?**

---

## Part 4: Document Analysis (25 minutes)

### Task 4.1: Extract Key Information

Analyze this business communication and extract key data:

**Email Thread:**
```
From: Sarah Chen, VP Sales
To: Leadership Team
Subject: Q4 Pipeline Update

Team,

Quick update on where we stand heading into Q4. Current pipeline is at $2.3M,
which is 15% below target. We've got 47 opportunities in late stage.

The Johnson Corp deal ($450K) is likely to close by October 15 - they've
confirmed budget approval. However, the Meridian contract ($380K) is at risk -
their CFO is pushing back on the implementation timeline we proposed.

We're adding 12 new reps this month which should help with Q1 pipeline. Training
starts October 20.

Key risks: If we lose Meridian and two other at-risk deals (approximately $200K
combined), we'll miss quarterly target by approximately $400K.

I'm scheduling pipeline reviews with each regional lead next week. Please have
your teams update Salesforce by Friday EOD.

Sarah
```

**Your Extraction Prompt:**
```
[Write your prompt for structured extraction]
```

**Extracted Information Table:**
```
[Create table from AI output]
```

| Category | Details |
|----------|---------|
| Key Dates | |
| Financial Figures | |
| Action Items | |
| Risks | |
| Decisions Needed | |

### Task 4.2: Multi-Source Synthesis

You have information from three sources about market trends. Synthesize them.

**Source 1 (Industry Report):**
"AI adoption in mid-market companies increased 45% in 2024, with productivity tools seeing the highest growth."

**Source 2 (Customer Survey):**
"68% of surveyed businesses plan to increase AI spending in 2025. Top concerns are data security (72%) and implementation complexity (54%)."

**Source 3 (Competitor Press Release):**
"CompetitorX announces AI-powered features for their enterprise tier, citing 'unprecedented demand' from Fortune 500 clients."

**Your Synthesis Prompt:**
```
[Write your prompt]
```

**Synthesized Analysis:**
```
[AI output]
```

**Your Summary (3 bullet points maximum):**
1.
2.
3.

---

## Part 5: Competitive Analysis (25 minutes)

### Task 5.1: Competitive Comparison

Analyze these two competing products:

**Product A (Market Leader):**
- Price: $99/month
- Features: Core analytics, 10 integrations, email support
- Market share: 45%
- Strengths: Brand recognition, extensive documentation
- Weaknesses: Slow to add new features, dated UI

**Product B (Your Product):**
- Price: $79/month
- Features: Core analytics + AI insights, 25 integrations, chat support
- Market share: 15%
- Strengths: Modern UI, faster innovation, AI capabilities
- Weaknesses: Less brand recognition, smaller ecosystem

**Your Competitive Analysis Prompt:**
```
[Write your prompt]
```

**AI Analysis:**
```
[Paste output]
```

**Your Top 3 Competitive Recommendations:**
1.
2.
3.

### Task 5.2: Win/Loss Analysis Framework

Create a framework for analyzing why deals are won or lost.

**Your Prompt:**
```
[Ask for a win/loss analysis framework]
```

**Framework Generated:**
```
[Paste output]
```

**Three Questions You'd Add to This Framework:**
1.
2.
3.

---

## Part 6: Trend Communication (20 minutes)

### Task 6.1: Data Story Creation

Tell the story of this website traffic data:

**Traffic Data:**
```
Month    | Visitors | Bounce Rate | Avg Time | Conversions
---------|----------|-------------|----------|------------
Jan      | 45,000   | 58%         | 2:15     | 450
Feb      | 42,000   | 61%         | 2:08     | 380
Mar      | 48,000   | 55%         | 2:22     | 520
Apr      | 51,000   | 52%         | 2:45     | 610
May      | 53,000   | 48%         | 3:02     | 720
Jun      | 58,000   | 45%         | 3:15     | 890
```

**Your Data Story Prompt:**
```
[Write your prompt asking for help telling this story]
```

**Generated Story:**
```
[Paste output]
```

**Your One-Paragraph Executive Summary:**
```
[Write your final summary]
```

### Task 6.2: Technical to Non-Technical Translation

Translate this analysis for executives:

**Technical Analysis:**
```
Correlation analysis between lead source and conversion rate shows statistically
significant variance (p<0.05) across channels. Organic search demonstrates
highest attribution efficiency (3.2x baseline), while paid social shows
declining marginal utility beyond $15K monthly spend. Multivariate regression
suggests 42% of conversion variance is explained by initial touchpoint, with
email nurture sequences contributing incremental lift of 23% to qualified leads.
```

**Your Translation Prompt:**
```
[Write your prompt]
```

**Non-Technical Version:**
```
[Paste output]
```

**Your Assessment:** Does the translation preserve the key insights? Y / N
What would you adjust?

---

## Exercise Deliverables

Submit the following:

1. **Data Analyses** from Part 1 (both analyses with your interpretations)
2. **Working Formulas** from Part 2 (with test results)
3. **Report Structure and Visualizations** from Part 3
4. **Extracted Information** from Part 4 (tables and synthesis)
5. **Competitive Analysis** from Part 5
6. **Data Stories** from Part 6 (both the story and translation)

---

## Grading Rubric

| Component | Points | Criteria |
|-----------|--------|----------|
| Data Analysis | 20 | Insightful analysis with actionable interpretations |
| Spreadsheet Formulas | 15 | Working formulas with clear documentation |
| Report Creation | 20 | Well-structured report with appropriate visuals |
| Document Analysis | 15 | Complete extraction and useful synthesis |
| Competitive Analysis | 15 | Strategic insights with specific recommendations |
| Trend Communication | 15 | Clear data story and effective translation |
| **Total** | **100** | |

---

## Reflection Questions

1. Which type of data analysis was most useful for your actual work?

2. What did you learn about getting AI to help with spreadsheet formulas?

3. How would you change your approach to data communication after this exercise?

4. What data analysis task will you try first with AI in your real work?

---

*Exercise 4 of 8 | AI Tools for Productivity | Duration: 2.5 hours*
