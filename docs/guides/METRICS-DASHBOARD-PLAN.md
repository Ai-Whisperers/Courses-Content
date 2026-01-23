# Course Metrics Dashboard - Implementation Plan

Track course performance, student engagement, and content quality systematically.

---

## Overview

**Goal:** Data-driven course development and improvement  
**Timeline:** Phased implementation over 3 months  
**Status:** Planning stage

---

## Phase 1: Foundation (Month 1)

### 1.1 Define Metrics

#### Course-Level Metrics
- **Completion Rate**: % of students who finish
- **Time to Complete**: Average days/hours
- **Student Count**: Total enrolled/completed
- **Satisfaction Score**: Post-course rating (1-5)
- **Certification Rate**: % who earn certificate

#### Module-Level Metrics
- **Module Completion Rate**: % who finish each module
- **Average Time per Module**: Hours spent
- **Quiz Performance**: Average score
- **Exercise Submission Rate**: % who submit
- **Drop-off Points**: Where students abandon

#### Content Quality Metrics
- **Last Updated**: Days since last modification
- **Student Questions**: Count of support requests
- **Error Reports**: Broken links, typos, unclear instructions
- **NPS Score**: Net Promoter Score per course

### 1.2 Data Collection Setup

#### Manual Tracking (Immediate)

Create spreadsheet template:

```
Course Metrics Tracker
├── Sheet 1: Course Overview
│   ├── Course Name
│   ├── Status (Production/Beta/Planning)
│   ├── Students Enrolled
│   ├── Students Completed
│   ├── Avg Completion Time
│   ├── Satisfaction Score
│   └── Last Updated
│
├── Sheet 2: Module Performance
│   ├── Course > Module
│   ├── Completion Rate
│   ├── Average Score
│   ├── Time Spent
│   └── Drop-off Rate
│
└── Sheet 3: Student Feedback
    ├── Date
    ├── Course
    ├── Module
    ├── Feedback
    ├── Rating
    └── Action Taken
```

#### Automated Tracking (Future)

Tools to consider:
- Google Analytics (free)
- Plausible Analytics (privacy-focused)
- Custom dashboard (Python + Streamlit)

---

## Phase 2: Implementation (Month 2)

### 2.1 Add Tracking to Courses

#### Course README Updates

Add to each course README.md:

```markdown
## Course Statistics

**Last Updated:** [Date]  
**Students Completed:** [Count]  
**Average Rating:** [X.X] / 5.0  
**Average Completion Time:** [Y] hours  
**Completion Rate:** [Z]%

*Data as of [Date]*
```

#### Feedback Collection

Create `FEEDBACK-FORM.md` in each course:

```markdown
# Course Feedback Form

**Course:** [Course Name]  
**Date Completed:** [Date]

## Overall Experience (1-5)
- [ ] 1 - Poor
- [ ] 2 - Fair  
- [ ] 3 - Good
- [ ] 4 - Very Good
- [ ] 5 - Excellent

## What worked well?
[Your response]

## What could be improved?
[Your response]

## Would you recommend this course? (NPS)
- [ ] 0-6: No (Detractor)
- [ ] 7-8: Maybe (Passive)
- [ ] 9-10: Yes (Promoter)

Submit via: [Form Link or Email]
```

### 2.2 Implement Analytics

#### Option A: Google Analytics (Quick Start)

1. Create GA4 property
2. Add tracking code to GitHub Pages site
3. Track:
   - Page views (courses visited)
   - Time on page (engagement)
   - Bounce rate (content quality)
   - User flow (learning paths)

#### Option B: Custom Dashboard (Advanced)

Python + Streamlit dashboard:

```python
# metrics_dashboard.py
import streamlit as st
import pandas as pd
import plotly.express as px

# Load data from CSV/database
df = pd.read_csv('course_metrics.csv')

# Dashboard layout
st.title('AI Whisperers Course Metrics')

# KPIs
col1, col2, col3 = st.columns(3)
col1.metric('Total Students', df['students'].sum())
col2.metric('Avg Completion Rate', f"{df['completion_rate'].mean():.1f}%")
col3.metric('Avg Rating', f"{df['rating'].mean():.2f}/5")

# Charts
st.subheader('Course Performance')
fig = px.bar(df, x='course', y='students', color='status')
st.plotly_chart(fig)

# Detailed table
st.subheader('Course Details')
st.dataframe(df)
```

---

## Phase 3: Analysis & Improvement (Month 3)

### 3.1 Regular Reviews

**Monthly:**
- Review course completion rates
- Identify drop-off points
- Analyze student feedback
- Update content based on data

**Quarterly:**
- Compare course performance
- Update course catalog priorities
- Plan content improvements
- Publish transparency report

### 3.2 Actionable Insights

#### If Completion Rate < 50%
- Review module length (too long?)
- Check difficulty curve (too steep?)
- Survey students who dropped
- Simplify prerequisites

#### If Quiz Scores < 70%
- Content too advanced?
- Instructions unclear?
- Quiz misaligned with content?
- Add more examples

#### If Time > Expected
- Content too dense?
- Exercises too difficult?
- Technical issues (setup problems)?
- Better scaffolding needed

---

## Tools & Technologies

### Data Collection
- **Google Forms**: Free feedback collection
- **Typeform**: Professional surveys ($)
- **GitHub Issues**: Bug/improvement tracking (free)
- **Google Sheets**: Manual tracking (free)

### Analytics
- **Google Analytics**: Web analytics (free)
- **Plausible**: Privacy-focused alternative ($)
- **Hotjar**: Heatmaps and recordings ($)

### Dashboards
- **Google Data Studio**: Free dashboards from Sheets/GA
- **Streamlit**: Python-based dashboards (free/paid hosting)
- **Metabase**: Open-source BI tool (self-hosted)

### Student Management
- **Moodle**: Full LMS (free, self-hosted)
- **Canvas**: LMS with analytics (free tier)
- **Custom**: Database + API (flexible)

---

## Sample Metrics Dashboard

### Course Overview

| Course | Status | Students | Completed | Rate | Avg Time | Rating | Updated |
|--------|--------|----------|-----------|------|----------|--------|---------|
| QA Automation | 🟢 | 45 | 32 | 71% | 48h | 4.7/5 | 2026-01-15 |
| Prompt Eng | 🟢 | 28 | 24 | 86% | 18h | 4.9/5 | 2026-01-16 |
| FPUNA 2026 | 🟡 | 0 | 0 | - | - | - | 2026-01-23 |

### Module Performance (QA Automation Example)

| Module | Started | Completed | Rate | Avg Score | Time |
|--------|---------|-----------|------|-----------|------|
| 01 - Introduction | 45 | 43 | 96% | 92% | 4h |
| 02 - Context Eng | 43 | 40 | 93% | 88% | 4h |
| 03 - Private Repos | 40 | 38 | 95% | 85% | 3h |
| ... | ... | ... | ... | ... | ... |
| 10 - Final Project | 35 | 32 | 91% | - | 12h |

### Key Insights

- **High drop-off**: Module 6 (Test Implementation) - 12% drop
  - **Action**: Simplify initial exercises, add more examples
  
- **Low scores**: Module 8 (Agentic Patterns) - 78% avg
  - **Action**: Add prerequisite review, more visual diagrams
  
- **Positive feedback**: Module 2 (Context Engineering) - 4.9/5
  - **Action**: Replicate format in other modules

---

## Quick Start Guide

### Week 1: Setup

1. Create Google Sheet with template above
2. Add "Course Statistics" section to production course READMEs
3. Create FEEDBACK-FORM.md in each production course
4. Set up Google Form for feedback collection

### Week 2-3: Test

1. Collect feedback from 3-5 beta testers
2. Record manually in spreadsheet
3. Identify any issues with tracking process
4. Refine forms/process

### Week 4: Automate

1. Set up Google Analytics (if using GitHub Pages)
2. Create Data Studio dashboard from Sheets
3. Schedule monthly review meeting
4. Document process for ongoing updates

---

## Success Criteria

**Phase 1 Complete When:**
- [ ] Metrics defined and documented
- [ ] Tracking spreadsheet created
- [ ] Feedback forms in all production courses
- [ ] First month of data collected

**Phase 2 Complete When:**
- [ ] Analytics integrated (GA or custom)
- [ ] Dashboard accessible to team
- [ ] Automated data collection working
- [ ] Monthly review process established

**Phase 3 Complete When:**
- [ ] Quarterly reports published
- [ ] Content improvements based on data
- [ ] Student satisfaction improved by 10%+
- [ ] Completion rates improved by 15%+

---

## Future Enhancements

### Advanced Metrics
- A/B testing different content approaches
- Cohort analysis (group performance over time)
- Predictive modeling (who will complete?)
- ROI analysis (time saved with AI vs traditional)

### Student Insights
- Learning path optimization
- Personalized recommendations
- Skill gap identification
- Career outcome tracking

### Automation
- Auto-generated progress reports
- Slack/email alerts for low performance
- Automatic content quality scoring
- AI-powered feedback analysis

---

## Resources

### Templates
- Metrics Spreadsheet: [Link to Google Sheets template]
- Feedback Form: See `FEEDBACK-FORM.md`
- Monthly Report Template: [Link]

### Learning Resources
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
- [Streamlit Docs](https://docs.streamlit.io/)
- [Data Studio Tutorial](https://support.google.com/datastudio/)

---

**Status:** Planning  
**Next Steps:** Create tracking spreadsheet, add stats to production courses  
**Owner:** Course Development Team  
**Review Date:** February 2026

---

**Last Updated:** January 23, 2026
