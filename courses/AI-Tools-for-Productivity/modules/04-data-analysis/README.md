# Module 4: Data Analysis & Insights

## Learning Objectives

By the end of this module, you will be able to:

1. Use AI to analyze datasets and extract meaningful insights
2. Get assistance with spreadsheet formulas and functions
3. Create reports and visualizations from data
4. Extract insights from documents and unstructured text
5. Conduct competitive analysis using AI
6. Identify trends and patterns in business data
7. Communicate data findings effectively

---

## Prerequisites

- Completed Modules 1-3
- Basic familiarity with spreadsheets (Excel or Google Sheets)
- Access to sample data or your own datasets

**Estimated Time**: 5 hours

---

## 1. Analyzing Data with AI

### AI Data Analysis Framework

AI excels at helping you understand data, but remember: it cannot directly access or modify your files. You must provide data in your prompts.

```
DATA ANALYSIS WORKFLOW
1. PREPARE    → Clean and format data for input
2. DESCRIBE   → Tell AI what the data represents
3. ASK        → Pose specific analytical questions
4. INTERPRET  → Review AI's analysis critically
5. VERIFY     → Cross-check key findings
6. PRESENT    → Format insights for your audience
```

### Data Input Methods

**Small Datasets (< 50 rows)**: Paste directly into prompt
```
Analyze this sales data:

Product | Q1 Sales | Q2 Sales | Q3 Sales
Widget A | $45,000 | $52,000 | $48,000
Widget B | $32,000 | $35,000 | $41,000
Widget C | $28,000 | $24,000 | $22,000

Questions:
1. Which product has the strongest growth trend?
2. What's the total revenue per quarter?
3. Any concerning patterns I should investigate?
```

**Larger Datasets**: Describe and summarize
```
I have a dataset with the following structure:
- 5,000 customer records
- Columns: CustomerID, SignupDate, Plan Type, Monthly Spend, Last Active Date
- Date range: Jan 2023 - Dec 2024

Here's a summary:
- Average monthly spend: $145
- Plan distribution: Basic 40%, Pro 35%, Enterprise 25%
- Churn rate: approximately 5% monthly

What analysis would help me understand customer retention drivers?
```

### Basic Analysis Prompts

**Descriptive Analysis:**
```
Analyze this data and provide:
1. Key summary statistics
2. Notable patterns or trends
3. Outliers or anomalies
4. Areas requiring further investigation

[Paste data]
```

**Comparative Analysis:**
```
Compare these two time periods/groups:

Period 1: [data]
Period 2: [data]

Identify:
- Significant differences
- Likely causes
- Recommended actions
```

**Diagnostic Analysis:**
```
Here's performance data showing a [decline/improvement]:

[Data]

Help me understand:
1. When did the change start?
2. What factors might explain it?
3. What additional data would help confirm the cause?
```

---

## 2. Spreadsheet Formula Assistance

### Getting Formula Help

AI is excellent at creating and explaining spreadsheet formulas.

**Formula Request Pattern:**
```
I need an Excel/Google Sheets formula to [describe what you want].

My data:
- Column A: [description]
- Column B: [description]
- Data starts in row 2, header in row 1
- [Any other relevant details]

Please provide:
1. The formula
2. Explanation of how it works
3. Example of expected output
```

### Common Formula Scenarios

**Lookups and References:**
```
I need a VLOOKUP (or modern alternative) to:
- Look up employee ID in Column A
- Return their department from a reference table on Sheet2
- Reference table has IDs in column A, departments in column C
- Handle cases where ID isn't found

What formula should I use and why?
```

**Conditional Calculations:**
```
Create a formula that calculates commission based on:
- Sales in column B
- 5% commission for sales under $10,000
- 7% commission for sales $10,000-$50,000
- 10% commission for sales over $50,000

Use nested IFs or a modern alternative.
```

**Date Calculations:**
```
I need formulas to:
1. Calculate days between two dates (columns A and B)
2. Determine if a date is within the last 30 days
3. Extract the month and year from a date for grouping
4. Find the last day of each month
```

**Text Manipulation:**
```
I have names in format "Last, First" in column A.
Create formulas to:
1. Extract first name
2. Extract last name
3. Convert to "First Last" format
4. Handle names with suffixes (Jr., III, etc.)
```

### Formula Debugging

```
This formula isn't working as expected:

Formula: [paste formula]
Expected result: [what you want]
Actual result: [what you're getting]
Sample data: [example data]

What's wrong and how do I fix it?
```

---

## 3. Creating Reports and Visualizations

### Report Structure Guidance

**Report Framework Prompt:**
```
Help me structure a [type] report from this data:

Data summary: [describe your data]
Audience: [who will read this]
Key question to answer: [main question]
Decisions it should inform: [what actions might result]

Suggest:
1. Report sections and order
2. Key metrics to highlight
3. Visualizations that would help
4. Executive summary points
```

### Visualization Recommendations

**Chart Selection Prompt:**
```
I need to visualize [what you're showing].

Data characteristics:
- [Number of categories/time periods]
- [Type of comparison: trend, composition, comparison, distribution]
- [Audience technical level]

Recommend:
1. Best chart type and why
2. What to put on each axis
3. Key design considerations
4. Alternative options if the first choice isn't available
```

### Common Visualization Scenarios

| Data Type | Goal | Recommended Chart |
|-----------|------|------------------|
| Time series | Show trend | Line chart |
| Categories comparison | Compare values | Bar chart |
| Part of whole | Show composition | Pie/Donut (few items) or Stacked bar |
| Two variables | Show relationship | Scatter plot |
| Distribution | Show spread | Histogram |
| Geographic | Show by location | Map |

**Prompt for Complex Visualizations:**
```
I need to show [complex scenario, e.g., "sales by region over time with profit margins"].

Create a recommendation for:
1. Single comprehensive visualization, or
2. Dashboard with multiple complementary charts

Include mockup description and key design principles.
```

---

## 4. Extracting Insights from Documents

### Document Analysis

AI can help you extract structured information from unstructured text.

**Document Summary Prompt:**
```
Analyze this document and extract:

1. Main thesis/argument
2. Key supporting points (3-5)
3. Data or evidence cited
4. Conclusions/recommendations
5. Any gaps or weaknesses in the argument

[Paste document or describe it]
```

**Structured Data Extraction:**
```
Extract structured information from this text:

[Paste text, e.g., a contract, email thread, report]

I need:
- Key dates mentioned
- Names and roles
- Numerical values
- Commitments or obligations
- Open questions

Format as a table where possible.
```

### Multi-Document Synthesis

```
I have [number] documents about [topic]:

Document 1 summary: [brief summary]
Document 2 summary: [brief summary]
Document 3 summary: [brief summary]

Help me:
1. Identify common themes across all documents
2. Note contradictions or disagreements
3. Find unique insights from each
4. Synthesize into a unified view
```

---

## 5. Competitive Analysis

### Competitive Research Framework

```
Help me analyze competitors in [industry/market].

What I know:
- My company: [brief description]
- Key competitors: [list]
- My competitive advantages: [list]
- Areas of concern: [list]

Create a framework for:
1. Key comparison dimensions
2. Questions to research for each competitor
3. How to organize findings
4. Red flags to watch for
```

### Competitive Comparison Prompt

```
Compare these competitors based on information I provide:

Competitor A:
[Paste available information - from public sources]

Competitor B:
[Paste available information]

Analyze:
1. Strengths and weaknesses of each
2. Target market differences
3. Pricing/value proposition comparison
4. Where each has competitive advantage
5. Opportunities and threats for my company
```

### Market Position Analysis

```
Based on this market information:

[Paste market data, analyst reports, public information]

Help me understand:
1. Market structure and key players
2. Where the market is heading
3. Underserved segments
4. Barriers to entry
5. Potential disruptions
```

---

## 6. Trend Identification

### Pattern Recognition Prompts

**Trend Analysis:**
```
Here's time-series data for [metric]:

[Paste data with dates and values]

Identify:
1. Overall trend direction
2. Seasonal patterns
3. Notable changes or inflection points
4. Factors that might explain changes
5. What to watch in coming periods
```

**Anomaly Detection:**
```
Here's performance data for [context]:

[Paste data]

Identify any anomalies:
1. Values that seem unusually high or low
2. Sudden changes that warrant investigation
3. Patterns that break from normal
4. Potential data quality issues
```

### Industry Trend Analysis

```
Based on this information about [industry]:

[Paste relevant articles, reports, data]

Summarize:
1. Top 3-5 trends shaping the industry
2. Timeline expectations (near-term vs long-term)
3. Potential impact on businesses like ours
4. Actions we should consider
5. What to monitor going forward
```

---

## 7. Communicating Data Findings

### Data Storytelling Framework

```
Help me tell the story of this data:

Data finding: [what the data shows]
Audience: [who needs to know]
Decision context: [what action this might inform]
Their likely questions: [what they'll want to know]

Create:
1. Opening hook/key insight
2. Supporting evidence structure
3. Visualization recommendations
4. Clear recommendation/call to action
5. Anticipate and address objections
```

### Executive Data Summary

```
Convert this detailed analysis into an executive summary:

[Paste analysis]

Requirements:
- One page maximum
- Lead with the bottom line
- Include 3-5 key supporting points
- Clear recommendation
- Visual if helpful (describe)
- What decision this enables
```

### Technical to Non-Technical Translation

```
Translate this technical analysis for a non-technical audience:

[Paste technical analysis]

Audience: [business leaders / non-specialists]

Provide:
1. Plain language explanation
2. Relevant analogies
3. Business impact focus
4. Remove jargon, keep substance
```

---

## Best Practices Summary

1. **Clean data first** - AI can't fix garbage input
2. **Describe context** - AI needs to understand what the data represents
3. **Ask specific questions** - Vague queries get vague answers
4. **Verify critical numbers** - Double-check important calculations
5. **Consider the audience** - Frame findings appropriately
6. **Show limitations** - Acknowledge data gaps and uncertainties
7. **Focus on action** - What should someone do with this insight?

---

## Common Pitfalls to Avoid

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Trusting AI calculations | May miscalculate, especially complex formulas | Verify key numbers manually |
| Over-interpreting | Finding patterns in noise | Require statistical significance |
| Missing context | Data without business understanding | Combine AI with domain expertise |
| Poor visualization | Chart doesn't match data story | Choose visualization thoughtfully |
| Ignoring outliers | Unusual data points reveal insights | Investigate anomalies |
| Analysis paralysis | Too much analysis, not enough action | Focus on decision-relevant insights |

---

## Knowledge Check

Before the exercises, confirm you understand:

1. How do you prepare data for AI analysis?
2. What's the best way to request spreadsheet formula help?
3. When should you use different chart types?
4. How do you extract structured information from documents?
5. What makes an effective data story?

---

## Additional Resources

### Tools and References
- Excel/Google Sheets function references
- Data visualization best practices guides
- Business intelligence tool documentation

### Sample Datasets
- Course sample datasets for practice
- Public data sources (government, academic)

---

## Summary

In this module, you learned:

- **Data analysis**: Framework for using AI to analyze datasets
- **Formula help**: Getting spreadsheet formula assistance
- **Reporting**: Structuring and visualizing data effectively
- **Document extraction**: Pulling insights from unstructured text
- **Competitive analysis**: Researching and comparing competitors
- **Trend identification**: Spotting patterns and anomalies
- **Communication**: Presenting data findings effectively

**Next Module**: Research & Information Synthesis - using AI to research, synthesize, and manage knowledge.

---

*Module 4 of 8 | AI Tools for Productivity | Duration: 5 hours*
