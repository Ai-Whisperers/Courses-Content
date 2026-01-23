# Metrics Dashboard Architecture

**Purpose:** Technical architecture for AI Whisperers course development metrics dashboard  
**Status:** Design Complete  
**Implementation:** Ready to build  
**Last Updated:** January 24, 2026

---

## Overview

A lightweight Python-based metrics system that analyzes repository content and generates static HTML dashboards. No external services required - runs locally or in CI/CD.

### Design Principles

1. **Simple** - Python scripts + static HTML (no databases)
2. **Automated** - Run on-demand or via GitHub Actions
3. **Fast** - Analyze 2,500+ files in <10 seconds
4. **Actionable** - Surface key insights, not just numbers
5. **Maintainable** - Clear code, easy to extend

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     DATA SOURCES                             │
│  courses/**/*.md | docs/**/*.md | *.md | check-links.py     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   METRICS COLLECTORS                         │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────┐ │
│  │  Course      │  │  Documentation│  │  Quality         │ │
│  │  Analyzer    │  │  Health       │  │  Metrics         │ │
│  └──────────────┘  └───────────────┘  └──────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATA PROCESSING                            │
│             metrics_engine.py (coordinator)                  │
│  - Aggregates data from collectors                           │
│  - Calculates derived metrics                                │
│  - Detects trends and anomalies                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   OUTPUT GENERATORS                          │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────┐ │
│  │  HTML        │  │  Markdown     │  │  JSON            │ │
│  │  Dashboard   │  │  Report       │  │  API Data        │ │
│  └──────────────┘  └───────────────┘  └──────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                     DELIVERABLES                             │
│  metrics/dashboard.html | metrics/report.md | metrics/*.json│
└─────────────────────────────────────────────────────────────┘
```

---

## Components

### 1. Data Collection Layer

**Course Analyzer** (`metrics/collectors/course_analyzer.py`)
- Scans `courses/` directory
- Extracts course metadata (status, modules, completeness)
- Counts content files (README, SYLLABUS, modules, exercises, quizzes)
- Calculates completion percentages

**Documentation Health** (`metrics/collectors/doc_health.py`)
- Runs `check-links.py` programmatically
- Categorizes broken links
- Checks README existence
- Validates metadata presence

**Quality Metrics** (`metrics/collectors/quality_metrics.py`)
- Lines of content per course
- Module/exercise/quiz coverage
- Consistency checks (naming conventions, structure)
- TODO/FIXME count

---

### 2. Metrics Engine

**Core Engine** (`metrics/metrics_engine.py`)

```python
class MetricsEngine:
    def __init__(self, repo_path: str):
        self.repo_path = repo_path
        self.collectors = [
            CourseAnalyzer(),
            DocHealth(),
            QualityMetrics()
        ]
    
    def collect_all(self) -> Dict[str, Any]:
        """Run all collectors and aggregate data"""
        
    def calculate_derived_metrics(self, data: Dict) -> Dict:
        """Calculate trends, comparisons, insights"""
    
    def generate_dashboard(self, data: Dict) -> None:
        """Generate HTML dashboard"""
    
    def generate_report(self, data: Dict) -> None:
        """Generate markdown report"""
```

---

### 3. Dashboard UI

**Technology:** Static HTML + CSS + Vanilla JavaScript (no frameworks)

**Layout:**

```
┌──────────────────────────────────────────────────────────────┐
│                    AI Whisperers Metrics                      │
│                    Generated: 2026-01-24                      │
├──────────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │ 15 Courses │  │ 2 Production│ │ 592 Links  │             │
│  │            │  │ 1 Dev       │  │ 0 Broken   │             │
│  └────────────┘  └────────────┘  └────────────┘             │
├──────────────────────────────────────────────────────────────┤
│  Course Status Breakdown                                      │
│  [■■■■░░░░░░] 🟢 Production: 2 (13%)                         │
│  [■░░░░░░░░░] 🟡 Development: 1 (7%)                         │
│  [■■■░░░░░░░] 🔵 Beta: 3 (20%)                               │
│  [■■■■■■■■■░] ⚪ Planning: 9 (60%)                            │
├──────────────────────────────────────────────────────────────┤
│  Top Courses by Content (Lines)                              │
│  1. QA Automation with AI: 15,234 lines (12 modules)         │
│  2. Prompt Engineering: 20,600 lines (6 modules)             │
│  3. FPUNA 2026: 8,500 lines (6 tracks, partial)             │
├──────────────────────────────────────────────────────────────┤
│  Documentation Health                                         │
│  ✅ All user-facing links working                             │
│  ✅ 8/8 navigation READMEs present                            │
│  ✅ Style guide implemented                                   │
│  ⚠️  585 external refs in .claude/ (documented)              │
├──────────────────────────────────────────────────────────────┤
│  Recent Activity (Last 7 Days)                               │
│  - Week 4 consolidation completed                            │
│  - 4 files created, 3 files modified                         │
│  - 1,800 lines added                                         │
└──────────────────────────────────────────────────────────────┘
```

---

## Metrics Tracked

### Course-Level Metrics

| Metric | Description | Source |
|--------|-------------|--------|
| **Total Courses** | Count of all courses | `courses/` directory |
| **Status Breakdown** | Count by status (🟢🟡🔵⚪) | Directory names |
| **Completion %** | Per-course completeness estimate | Module count, file analysis |
| **Content Volume** | Lines of content per course | File analysis |
| **Module Count** | Number of modules per course | Directory scan |
| **Exercise Count** | Number of EXERCISE.md files | File scan |
| **Quiz Count** | Number of QUIZ.md files | File scan |
| **Last Updated** | Most recent modification date | Git log or file mtime |

### Documentation Metrics

| Metric | Description | Source |
|--------|-------------|--------|
| **Total Docs** | Count of markdown files | Recursive scan |
| **Broken Links** | Count by severity | `check-links.py` |
| **README Coverage** | % of directories with READMEs | Directory scan |
| **Metadata Compliance** | % of docs with proper metadata | Regex matching |
| **Documentation Age** | Days since last update | Git log |

### Quality Metrics

| Metric | Description | Source |
|--------|-------------|--------|
| **TODO Count** | Unresolved TODOs/FIXMEs | Grep search |
| **Naming Consistency** | % following conventions | Pattern matching |
| **Link Health** | % of links working | `check-links.py` |
| **Style Compliance** | % following style guide | Pattern checks |

### Trend Metrics (Over Time)

| Metric | Description | Source |
|--------|-------------|--------|
| **Content Growth** | Lines added per week | Git diff stats |
| **Course Progress** | Completion % change | Historical data |
| **Link Health Trend** | Broken links over time | Historical reports |
| **Activity Level** | Commits per week | Git log |

---

## Data Storage

**Format:** JSON files (simple, portable, easy to parse)

```
metrics/
├── data/
│   ├── latest.json              # Current snapshot
│   ├── history/
│   │   ├── 2026-01-24.json      # Daily snapshots
│   │   ├── 2026-01-23.json
│   │   └── ...
│   └── trends.json              # Aggregated trends
└── cache/
    └── course_analysis.json     # Cached analysis results
```

**latest.json structure:**
```json
{
  "generated_at": "2026-01-24T09:00:00Z",
  "courses": {
    "total": 15,
    "by_status": {
      "production": 2,
      "development": 1,
      "beta": 3,
      "planning": 9
    },
    "details": [
      {
        "name": "QA-Automation-with-AI",
        "status": "production",
        "modules": 12,
        "lines": 15234,
        "completion": 100,
        "last_updated": "2026-01-15"
      }
    ]
  },
  "documentation": {
    "total_files": 2333,
    "broken_links": 0,
    "readme_coverage": 100,
    "metadata_compliance": 85
  },
  "quality": {
    "todo_count": 3,
    "naming_consistency": 95,
    "link_health": 100
  }
}
```

---

## Implementation Plan

### Phase 1: Foundation (Week 1)

**Tasks:**
1. Create `metrics/` directory structure
2. Implement `CourseAnalyzer` collector
3. Implement `DocHealth` collector
4. Implement `MetricsEngine` core
5. Generate first JSON snapshot
6. Create simple HTML dashboard template

**Deliverables:**
- Working metrics collection
- JSON data output
- Basic HTML dashboard

---

### Phase 2: Enhancement (Week 2)

**Tasks:**
1. Add `QualityMetrics` collector
2. Implement trend calculation (historical data)
3. Enhance HTML dashboard with charts
4. Add markdown report generator
5. Create GitHub Actions workflow

**Deliverables:**
- Complete metrics collection
- Historical tracking
- Automated CI/CD integration

---

### Phase 3: Refinement (Week 3)

**Tasks:**
1. Add derived metrics (insights, anomalies)
2. Create comparison views (course-to-course)
3. Add filters and interactivity to dashboard
4. Optimize performance (caching)
5. Documentation and maintenance guide

**Deliverables:**
- Production-ready dashboard
- Performance optimized
- Fully documented

---

## Technology Stack

### Core
- **Python 3.11+** - Metrics collection and processing
- **JSON** - Data storage
- **HTML/CSS/JS** - Dashboard UI

### Libraries
```python
# requirements.txt
pathlib          # File system traversal (built-in)
json             # Data serialization (built-in)
datetime         # Timestamps (built-in)
typing           # Type hints (built-in)
gitpython        # Git log analysis (external)
markdown         # Parsing markdown (external)
jinja2           # HTML template rendering (external)
```

### Optional
- **Plotly.js** - Interactive charts (CDN, no install)
- **GitHub Actions** - Automated runs (already available)

---

## Usage

### Command Line

```bash
# Generate dashboard (basic)
python metrics/generate_dashboard.py

# Generate with historical comparison
python metrics/generate_dashboard.py --history 7  # Last 7 days

# Generate specific metrics only
python metrics/generate_dashboard.py --courses --docs

# Output to specific location
python metrics/generate_dashboard.py --output ./public/metrics.html
```

### GitHub Actions (Automated)

```yaml
# .github/workflows/metrics-dashboard.yml
name: Generate Metrics Dashboard

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:      # Manual trigger

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Full history for trends
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: pip install -r metrics/requirements.txt
      
      - name: Generate dashboard
        run: python metrics/generate_dashboard.py
      
      - name: Commit and push
        run: |
          git config user.name "Metrics Bot"
          git config user.email "metrics@ai-whisperers.com"
          git add metrics/data/ metrics/dashboard.html
          git commit -m "metrics: update dashboard (automated)"
          git push
```

---

## Dashboard Features

### Core Views

1. **Overview Dashboard** (`metrics/dashboard.html`)
   - Key metrics at a glance
   - Course status breakdown
   - Recent activity
   - Health indicators

2. **Course Details** (`metrics/courses.html`)
   - Per-course breakdown
   - Completion progress
   - Content volume
   - Last updated

3. **Documentation Health** (`metrics/docs.html`)
   - Link health report
   - README coverage
   - Metadata compliance
   - Style guide adherence

4. **Trends** (`metrics/trends.html`)
   - Historical charts
   - Week-over-week comparison
   - Activity timeline

### Interactive Elements

- **Filters:** By status, date range, metric type
- **Sorting:** By any column (completion, lines, date)
- **Search:** Find specific courses or documents
- **Export:** Download data as JSON or CSV

---

## Performance Considerations

### Optimization Strategies

1. **Caching**
   - Cache course analysis results (invalidate on file changes)
   - Cache git log data (expensive to recalculate)
   - Store intermediate results

2. **Incremental Updates**
   - Only re-analyze changed courses
   - Track file modification times
   - Use git diff for changes detection

3. **Parallel Processing**
   - Analyze courses in parallel (multiprocessing)
   - Independent collectors run concurrently
   - Async file I/O where possible

**Target Performance:**
- Full analysis: <10 seconds
- Incremental update: <2 seconds
- Dashboard generation: <1 second

---

## Maintenance

### Daily
- Automated dashboard generation (GitHub Actions)
- JSON snapshot saved to `metrics/data/history/`

### Weekly
- Review anomalies (sudden drops in completion, spike in TODOs)
- Update metrics if new courses added
- Archive old snapshots (keep last 30 days)

### Monthly
- Clean up old snapshots (keep monthlies indefinitely)
- Review metric definitions (add/remove as needed)
- Update dashboard UI if needed

---

## Security & Privacy

**Data Sensitivity:** Low (all metrics derived from public repository data)

**Considerations:**
- No personal data collected
- No external API calls (runs offline)
- All data stored in repository (public)
- No authentication needed (read-only)

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Dashboard Load Time** | <2 seconds | PageSpeed Insights |
| **Data Freshness** | <24 hours | Last updated timestamp |
| **Coverage** | 100% courses analyzed | Course count validation |
| **Accuracy** | >95% correct metrics | Manual verification sampling |
| **Adoption** | 3+ team members use weekly | Survey or analytics |

---

## Future Enhancements

### Short Term (Next 3 Months)
- Add student feedback metrics (when available)
- Integrate with LMS data (if deployed)
- Add email alerts for critical metrics

### Long Term (6-12 Months)
- Predictive analytics (course completion forecasting)
- A/B testing framework (compare content approaches)
- Student journey mapping
- ROI calculation per course

---

## Related Documentation

- [Metrics Dashboard Plan](../docs/guides/METRICS-DASHBOARD-PLAN.md) - Original implementation plan
- [Documentation Style Guide](../docs/guides/DOCUMENTATION-STYLE-GUIDE.md) - Standards for consistency
- [Quality Control](../docs/guides/QUALITY-CONTROL.md) - Quality standards tracked

---

**Status:** Architecture Complete  
**Next Step:** Implement Phase 1 (Foundation)  
**Estimated Time:** 3 weeks (part-time)

---

**Last Updated:** January 24, 2026  
**Reviewed By:** Documentation Team  
**Next Review:** February 2026
