"""
Metrics Dashboard Generator

Collects metrics from repository and generates:
- JSON data files
- HTML dashboard
- Markdown report
"""

import os
import sys
import json
from pathlib import Path
from datetime import datetime
from typing import Dict, Any

# Fix Windows console encoding
if sys.platform == "win32":
    import codecs

    sys.stdout = codecs.getwriter("utf-8")(sys.stdout.buffer, "strict")
    sys.stderr = codecs.getwriter("utf-8")(sys.stderr.buffer, "strict")

# Add collectors to path
sys.path.insert(0, str(Path(__file__).parent))

from collectors.course_analyzer import CourseAnalyzer
from collectors.doc_health import DocHealth


class MetricsEngine:
    """Main metrics collection and generation engine"""

    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.metrics_path = self.repo_path / "metrics"
        self.data_path = self.metrics_path / "data"

        # Ensure directories exist
        self.data_path.mkdir(parents=True, exist_ok=True)
        (self.data_path / "history").mkdir(exist_ok=True)

    def collect_all(self) -> Dict[str, Any]:
        """Run all collectors and aggregate data"""
        print("\n" + "=" * 60)
        print("COLLECTING METRICS")
        print("=" * 60 + "\n")

        course_analyzer = CourseAnalyzer(str(self.repo_path))
        doc_health = DocHealth(str(self.repo_path))

        courses_data = course_analyzer.collect()
        docs_data = doc_health.collect()

        # Aggregate into single data structure
        data = {
            "generated_at": datetime.now().isoformat(),
            "repository": {"path": str(self.repo_path), "name": self.repo_path.name},
            "courses": courses_data,
            "documentation": docs_data,
            "summary": self._calculate_summary(courses_data, docs_data),
        }

        return data

    def _calculate_summary(self, courses: Dict, docs: Dict) -> Dict[str, Any]:
        """Calculate high-level summary metrics"""
        return {
            "total_courses": courses["total_courses"],
            "production_ready": courses["by_status"]["production"],
            "total_docs": docs["total_docs"],
            "doc_health_score": self._calculate_health_score(docs),
            "top_course": courses["courses"][0]["name"] if courses["courses"] else None,
        }

    def _calculate_health_score(self, docs: Dict) -> int:
        """Calculate overall documentation health score (0-100)"""
        score = 0

        # Broken links (40 points max)
        if docs["broken_links"]["checked"]:
            user_facing = docs["broken_links"]["user_facing"]
            if user_facing == 0:
                score += 40
            elif user_facing < 5:
                score += 30
            elif user_facing < 10:
                score += 20
            else:
                score += 10

        # README coverage (30 points max)
        readme_pct = docs["readme_coverage"]["percentage"]
        score += int(readme_pct * 0.3)

        # Metadata compliance (30 points max)
        metadata_pct = docs["metadata_compliance"]["percentage"]
        score += int(metadata_pct * 0.3)

        return min(score, 100)

    def save_data(self, data: Dict[str, Any]) -> None:
        """Save data to JSON files"""
        print("\n" + "=" * 60)
        print("SAVING DATA")
        print("=" * 60 + "\n")

        # Save latest snapshot
        latest_file = self.data_path / "latest.json"
        print(f"  - Saving to {latest_file.name}")
        with open(latest_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        # Save historical snapshot
        date_str = datetime.now().strftime("%Y-%m-%d")
        history_file = self.data_path / "history" / f"{date_str}.json"
        print(f"  - Saving to history/{history_file.name}")
        with open(history_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print("  ✅ Data saved successfully")

    def generate_report(self, data: Dict[str, Any]) -> None:
        """Generate markdown report"""
        print("\n" + "=" * 60)
        print("GENERATING REPORT")
        print("=" * 60 + "\n")

        report_file = self.metrics_path / "METRICS-REPORT.md"

        report = self._build_markdown_report(data)

        print(f"  - Writing to {report_file.name}")
        with open(report_file, "w", encoding="utf-8") as f:
            f.write(report)

        print("  ✅ Report generated successfully")

    def _build_markdown_report(self, data: Dict[str, Any]) -> str:
        """Build markdown report content"""
        courses = data["courses"]
        docs = data["documentation"]
        summary = data["summary"]

        report = f"""# Metrics Report

**Generated:** {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}  
**Repository:** {data["repository"]["name"]}

---

## Summary

| Metric | Value |
|--------|-------|
| **Total Courses** | {summary["total_courses"]} |
| **Production Ready** | {summary["production_ready"]} |
| **Total Documentation Files** | {summary["total_docs"]:,} |
| **Documentation Health Score** | {summary["doc_health_score"]}/100 |

---

## Courses

### By Status

| Status | Count | Percentage |
|--------|-------|------------|
| 🟢 Production | {courses["by_status"]["production"]} | {courses["by_status"]["production"] / courses["total_courses"] * 100:.0f}% |
| 🟡 Development | {courses["by_status"]["development"]} | {courses["by_status"]["development"] / courses["total_courses"] * 100:.0f}% |
| 🔵 Beta | {courses["by_status"]["beta"]} | {courses["by_status"]["beta"] / courses["total_courses"] * 100:.0f}% |
| ⚪ Planning | {courses["by_status"]["planning"]} | {courses["by_status"]["planning"] / courses["total_courses"] * 100:.0f}% |

### Top 5 Courses by Content

| Rank | Course | Lines | Modules | Completion |
|------|--------|-------|---------|------------|
"""

        for i, course in enumerate(courses["courses"][:5], 1):
            report += f"| {i} | {course['name']} | {course['lines']:,} | {course['modules']} | {course['completion']}% |\n"

        report += f"""
---

## Documentation Health

### Broken Links

"""

        if docs["broken_links"]["checked"]:
            report += f"""| Category | Count |
|----------|-------|
| **Total** | {docs["broken_links"]["total"]} |
| User-facing | {docs["broken_links"]["user_facing"]} |
| External refs | {docs["broken_links"]["external_refs"]} |

"""
            if docs["broken_links"]["user_facing"] == 0:
                report += "✅ **Excellent:** All user-facing links working!\n\n"
            elif docs["broken_links"]["user_facing"] < 5:
                report += "⚠️ **Good:** Only a few user-facing broken links\n\n"
            else:
                report += "❌ **Action Required:** Multiple user-facing broken links need fixing\n\n"
        else:
            report += f"⚠️ Link check failed: {docs['broken_links'].get('error', 'Unknown error')}\n\n"

        report += f"""### README Coverage

{docs["readme_coverage"]["with_readme"]}/{docs["readme_coverage"]["total_directories"]} directories have READMEs ({docs["readme_coverage"]["percentage"]}%)

"""

        if docs["readme_coverage"]["percentage"] >= 90:
            report += "✅ **Excellent:** Great README coverage\n\n"
        elif docs["readme_coverage"]["percentage"] >= 70:
            report += "⚠️ **Good:** Most directories have READMEs\n\n"
        else:
            report += "❌ **Needs Improvement:** Many directories missing READMEs\n\n"

        report += f"""### Metadata Compliance

{docs["metadata_compliance"]["compliant"]}/{docs["metadata_compliance"]["total_checked"]} key docs have proper metadata ({docs["metadata_compliance"]["percentage"]}%)

### Documentation Age

Average document age: **{docs["avg_doc_age_days"]} days**

"""

        if docs["avg_doc_age_days"] < 30:
            report += "✅ Documentation is very fresh\n\n"
        elif docs["avg_doc_age_days"] < 90:
            report += "✅ Documentation is reasonably current\n\n"
        else:
            report += "⚠️ Documentation may need review/updates\n\n"

        report += f"""---

## Recommendations

"""

        # Generate recommendations based on metrics
        recommendations = []

        if docs["broken_links"]["checked"] and docs["broken_links"]["user_facing"] > 0:
            recommendations.append(
                f"- Fix {docs['broken_links']['user_facing']} user-facing broken links"
            )

        if docs["readme_coverage"]["percentage"] < 90:
            missing = (
                docs["readme_coverage"]["total_directories"]
                - docs["readme_coverage"]["with_readme"]
            )
            recommendations.append(f"- Add READMEs to {missing} directories")

        if docs["metadata_compliance"]["percentage"] < 80:
            recommendations.append(
                f"- Add metadata headers to more documentation files"
            )

        planning_courses = courses["by_status"]["planning"]
        if planning_courses > courses["total_courses"] * 0.6:
            recommendations.append(
                f"- Focus on completing the {planning_courses} courses in planning stage"
            )

        if recommendations:
            for rec in recommendations:
                report += f"{rec}\n"
        else:
            report += (
                "✅ No urgent recommendations - repository is in excellent shape!\n"
            )

        report += f"""
---

**Next Update:** Run `python metrics/generate_metrics.py` to refresh metrics

**Data Location:** `metrics/data/latest.json`
"""

        return report

    def print_summary(self, data: Dict[str, Any]) -> None:
        """Print summary to console"""
        print("\n" + "=" * 60)
        print("METRICS SUMMARY")
        print("=" * 60 + "\n")

        summary = data["summary"]
        courses = data["courses"]
        docs = data["documentation"]

        print(
            f"Courses: {summary['total_courses']} total, {summary['production_ready']} production-ready"
        )
        print(f"Documentation: {summary['total_docs']:,} files")
        print(f"Health Score: {summary['doc_health_score']}/100")

        if docs["broken_links"]["checked"]:
            print(f"Broken Links: {docs['broken_links']['user_facing']} user-facing")

        print(f"\nTop Course: {summary['top_course']}")

        print("\n" + "=" * 60)
        print("✅ COMPLETE")
        print("=" * 60)


def main():
    """Main entry point"""
    # Get repository path
    if len(sys.argv) > 1:
        repo_path = sys.argv[1]
    else:
        repo_path = os.getcwd()

    # Initialize engine
    engine = MetricsEngine(repo_path)

    # Collect metrics
    data = engine.collect_all()

    # Save data
    engine.save_data(data)

    # Generate report
    engine.generate_report(data)

    # Print summary
    engine.print_summary(data)


if __name__ == "__main__":
    main()
