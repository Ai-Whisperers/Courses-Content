# Module 5 Exercise: Marketing Analytics with AI

**Duration**: 2.5 hours
**Difficulty**: Intermediate

---

## Objective

Use AI to analyze marketing data, generate reports, extract insights, and create actionable recommendations.

---

## Setup

### Prerequisites
- [ ] Completed Module 5 content
- [ ] Access to marketing data (your own or sample provided)
- [ ] Spreadsheet tool (Google Sheets/Excel)

### Choose Your Data Source

**Option A**: Use your real marketing data
**Option B**: Use the sample data provided below

<details>
<summary>Sample Marketing Data (Click to expand)</summary>

```csv
Month,Website_Visitors,Leads,MQLs,Customers,Revenue,Ad_Spend,Email_Opens,Email_Clicks,Social_Followers,Social_Engagement
Jan,45000,450,135,27,54000,12000,8500,1200,15000,2.3
Feb,48000,520,156,31,62000,13500,9200,1380,15800,2.5
Mar,52000,580,174,35,70000,15000,10100,1515,16900,2.7
Apr,47000,470,141,28,56000,14000,8900,1246,17200,2.4
May,55000,605,182,36,72000,16000,11000,1650,18100,2.9
Jun,61000,671,201,40,80000,17500,12200,1830,19500,3.1
Jul,58000,638,191,38,76000,16500,11600,1740,20200,2.8
Aug,63000,693,208,42,84000,18000,12600,1890,21100,3.2
Sep,67000,737,221,44,88000,19000,13400,2010,22300,3.4
Oct,71000,781,234,47,94000,20000,14200,2130,23800,3.6
Nov,75000,825,248,50,100000,21000,15000,2250,25000,3.8
Dec,69000,759,228,46,92000,19500,13800,2070,24500,3.5
```

**Channel Data:**
```csv
Channel,Visitors,Leads,Cost,Conversions,Revenue
Organic_Search,180000,1800,0,180,360000
Paid_Search,120000,1080,95000,108,216000
Social_Organic,90000,630,0,63,126000
Social_Paid,75000,675,65000,68,136000
Email,60000,900,5000,90,180000
Direct,55000,385,0,39,78000
Referral,40000,280,0,28,56000
```

</details>

---

## Part 1: Data Analysis (~40 minutes)

### Task

Analyze the marketing data to identify performance patterns.

### Step 1: Prepare Your Data (10 min)

Format your data for AI analysis:
- Clean column headers
- Ensure consistent formatting
- Note any missing values
- Calculate key derived metrics (conversion rates, etc.)

### Step 2: Initial Analysis (15 min)

```
ROLE: Marketing data analyst.

DATA:
[Paste your prepared data]

TIME PERIOD: [Your date range]

PROVIDE:

1. PERFORMANCE OVERVIEW
   - Overall trend direction
   - Key metrics and their status
   - Month-over-month and year-over-year changes

2. FUNNEL ANALYSIS
   - Conversion rates at each stage
   - Bottlenecks identified
   - Improvement opportunities

3. EFFICIENCY METRICS
   - Cost per lead
   - Cost per customer
   - Customer acquisition cost
   - ROAS / ROI by channel

4. GROWTH PATTERNS
   - What's growing fastest
   - What's stagnating
   - Seasonality observed
```

### Step 3: Deep-Dive Analysis (15 min)

```
Based on the initial analysis, now:

1. CORRELATION ANALYSIS
   - Which metrics correlate with revenue?
   - Leading indicators of success?
   - Warning signs to watch?

2. CHANNEL EFFECTIVENESS
   - Best ROI channels
   - Most efficient channels
   - Underperforming investments

3. ANOMALIES
   - Any unusual months or data points
   - Potential explanations
   - Actions to investigate
```

### Deliverables for Part 1
- [ ] Prepared data
- [ ] Initial analysis summary
- [ ] Deep-dive findings

---

## Part 2: Report Generation (~35 minutes)

### Task

Create three different reports from the data.

### Report 1: Weekly Executive Summary (10 min)

Pick one month as your "current week" and the previous as comparison:

```
Create a one-page executive summary:

CURRENT PERIOD: [Month]
PREVIOUS PERIOD: [Prior month]
GOALS: [Assume 10% month-over-month growth targets]

FORMAT:
- 3-4 sentence executive summary
- Key metrics with comparisons
- Top win and top challenge
- 3 priority actions for next week
```

### Report 2: Channel Performance Report (15 min)

```
Create a channel performance report:

CHANNEL DATA:
[Paste channel data]

INCLUDE:
1. Channel ranking by ROI
2. Channel ranking by volume
3. Efficiency analysis (cost per outcome)
4. Investment recommendations (increase/maintain/decrease)
5. Budget reallocation suggestions
```

### Report 3: Trend Report (10 min)

```
Create a quarterly trend report:

DATA: [Full year data]

FOCUS ON:
1. Quarter-over-quarter comparisons
2. Trend direction for each key metric
3. Velocity of change (accelerating/decelerating)
4. Forecast for next quarter based on trends
5. Strategic implications
```

### Deliverables for Part 2
- [ ] Executive summary
- [ ] Channel performance report
- [ ] Trend report

---

## Part 3: Insight Extraction (~30 minutes)

### Task

Extract three actionable insights from your data.

### Insight Discovery (15 min)

```
Look at this data for non-obvious insights:

[Paste data]

Find 5 insights that are:
- Surprising or non-intuitive
- Actionable (we can do something about it)
- Significant (meaningful impact potential)

For each insight:
- What the data shows
- Why it matters
- What action to take
- Expected impact of action
```

### Insight Development (15 min)

Choose your top 3 insights and develop each:

```
For insight: [Your insight]

CREATE:

1. HEADLINE
   - One sentence capturing the "so what"

2. EVIDENCE
   - 2-3 data points that prove this

3. CONTEXT
   - Why this is happening
   - What it means for the business

4. RECOMMENDATION
   - Specific action to take
   - Resources needed
   - Timeline

5. VISUALIZATION
   - What chart would show this best
   - Key elements to highlight
```

### Deliverables for Part 3
- [ ] 5 initial insights
- [ ] 3 developed insight briefs

---

## Part 4: Forecasting (~25 minutes)

### Task

Create forecasts and set goals for the next quarter.

### Forecast Generation (15 min)

```
Based on this historical data, forecast Q1 of next year:

DATA:
[Paste your annual data]

ASSUMPTIONS:
- Budget: [Same / +10% / -10%]
- Seasonality: [Based on patterns]
- Initiatives: [Any planned changes]

PROVIDE:
1. Metric forecasts (range: pessimistic, expected, optimistic)
2. Key drivers of outcomes
3. Risks to forecast
4. Actions to hit optimistic scenario
```

### Goal Setting (10 min)

```
Based on forecasts and historical performance, recommend goals:

For each key metric (Visitors, Leads, MQLs, Customers, Revenue):
- Stretch goal (20% probability)
- Target goal (60% probability)
- Floor (90% probability)
- Monthly breakdown
- Key milestones to track
```

### Deliverables for Part 4
- [ ] Q1 forecast
- [ ] Goal recommendations

---

## Part 5: Documentation (~20 minutes)

### Create Your Analytics Log

```markdown
# Marketing Analytics - AI Log

Date: [Date]

## Analysis Performed
- Initial performance analysis
- Channel deep-dive
- Trend analysis
- Forecasting

## Key Insights Discovered
1. [Insight 1]
2. [Insight 2]
3. [Insight 3]

## Prompt Effectiveness
Best prompt: [Which one and why]
Needed iteration: [Which and how you fixed]

## Data Preparation Notes
- Cleaning required: [What you did]
- Format that worked best: [CSV/Table/Summary]

## Time Investment
- Data prep: [X] min
- Analysis: [X] min
- Reporting: [X] min
- Insights: [X] min
- Forecasting: [X] min
```

### Reflection Questions

1. How did AI change your approach to data analysis?

2. What insights did AI surface that you might have missed manually?

3. Where did you need to add human judgment to AI-generated analysis?

4. How will you incorporate AI into your regular analytics workflow?

---

## Deliverables Checklist

Submit the following:

- [ ] Prepared data file
- [ ] Initial and deep-dive analysis
- [ ] Executive summary report
- [ ] Channel performance report
- [ ] Trend report
- [ ] 3 developed insight briefs
- [ ] Forecast and goals
- [ ] Analytics log with reflection

---

## Grading Rubric

| Criterion | Points | Excellent (100%) | Good (80%) | Satisfactory (60%) | Needs Work (<60%) |
|-----------|--------|------------------|------------|--------------------|--------------------|
| Data Preparation | 10% | Clean, well-organized, derived metrics | Mostly clean, minor issues | Basic preparation | Unprepared data |
| Analysis Quality | 30% | Deep insights, well-structured, actionable | Good analysis, some depth | Surface-level analysis | Incomplete |
| Report Quality | 25% | Professional, clear, actionable reports | Good reports, minor gaps | Basic reports | Missing or poor |
| Insights | 20% | Surprising, actionable, well-developed | Good insights, mostly developed | Basic insights | Generic or missing |
| Forecasting | 15% | Realistic, well-reasoned, useful goals | Good forecasts, reasonable | Basic projections | Unrealistic or missing |

---

## Next Steps

After completing this exercise:
1. Submit your deliverables
2. Take the [Module Quiz](./QUIZ.md)
3. Proceed to [Module 6: Personalization & Segmentation](../06-personalization/README.md)
