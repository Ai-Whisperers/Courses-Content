"""
Course Analyzer - Collects metrics from course directories

Scans courses/ directory and extracts:
- Course count by status
- Module counts
- Content file counts (README, SYLLABUS, exercises, quizzes)
- Lines of content
- Completion estimates
"""

import os
from pathlib import Path
from typing import Dict, List, Any
from datetime import datetime
import re


class CourseAnalyzer:
    """Analyzes course directories for metrics"""

    STATUS_EMOJIS = {
        "🟢-production": "production",
        "🟡-development": "development",
        "🔵-beta": "beta",
        "⚪-planning": "planning",
    }

    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.courses_path = self.repo_path / "courses"

    def collect(self) -> Dict[str, Any]:
        """Main collection method"""
        print("[Courses] Analyzing courses...")

        courses_data = []
        status_counts = {"production": 0, "development": 0, "beta": 0, "planning": 0}

        # Scan courses by status directory
        for status_dir in self.courses_path.iterdir():
            if not status_dir.is_dir() or status_dir.name.startswith("."):
                continue

            status = self._get_status(status_dir.name)
            if not status:
                continue

            # Scan courses in this status directory
            for course_dir in status_dir.iterdir():
                if not course_dir.is_dir() or course_dir.name.startswith("."):
                    continue

                course_data = self._analyze_course(course_dir, status)
                courses_data.append(course_data)
                status_counts[status] += 1

        return {
            "total_courses": len(courses_data),
            "by_status": status_counts,
            "courses": sorted(courses_data, key=lambda x: x["lines"], reverse=True),
            "collected_at": datetime.now().isoformat(),
        }

    def _get_status(self, dir_name: str) -> str | None:
        """Extract status from directory name"""
        for emoji_prefix, status in self.STATUS_EMOJIS.items():
            if dir_name.startswith(emoji_prefix):
                return status
        return None

    def _analyze_course(self, course_path: Path, status: str) -> Dict[str, Any]:
        """Analyze a single course directory"""
        print(f"  - Analyzing {course_path.name}...")

        # Count modules
        modules_path = course_path / "modules"
        module_count = 0
        if modules_path.exists():
            module_count = sum(
                1
                for d in modules_path.iterdir()
                if d.is_dir() and not d.name.startswith(".")
            )

        # Count content files
        exercise_count = sum(1 for _ in course_path.rglob("EXERCISE.md"))
        quiz_count = sum(1 for _ in course_path.rglob("QUIZ.md"))

        # Count lines of content
        total_lines = self._count_lines(course_path)

        # Check for key files
        has_readme = (course_path / "README.md").exists()
        has_syllabus = (course_path / "SYLLABUS.md").exists()

        # Estimate completion
        completion = self._estimate_completion(
            status, module_count, has_readme, has_syllabus, exercise_count, quiz_count
        )

        # Get last modified date
        last_modified = self._get_last_modified(course_path)

        return {
            "name": course_path.name,
            "status": status,
            "modules": module_count,
            "exercises": exercise_count,
            "quizzes": quiz_count,
            "lines": total_lines,
            "has_readme": has_readme,
            "has_syllabus": has_syllabus,
            "completion": completion,
            "last_modified": last_modified,
        }

    def _count_lines(self, path: Path) -> int:
        """Count total lines in all markdown files"""
        total = 0
        for md_file in path.rglob("*.md"):
            try:
                with open(md_file, "r", encoding="utf-8") as f:
                    total += sum(1 for _ in f)
            except Exception:
                pass  # Skip files that can't be read
        return total

    def _estimate_completion(
        self,
        status: str,
        modules: int,
        has_readme: bool,
        has_syllabus: bool,
        exercises: int,
        quizzes: int,
    ) -> int:
        """Estimate course completion percentage"""
        if status == "production":
            return 100

        # Base score
        score = 0

        # README and SYLLABUS are fundamental
        if has_readme:
            score += 20
        if has_syllabus:
            score += 20

        # Module count matters
        if modules >= 12:
            score += 30
        elif modules >= 6:
            score += 20
        elif modules >= 3:
            score += 10

        # Exercises and quizzes indicate content depth
        if exercises >= modules:
            score += 15
        elif exercises >= modules // 2:
            score += 10

        if quizzes >= modules:
            score += 15
        elif quizzes >= modules // 2:
            score += 10

        return min(score, 95)  # Cap at 95% for non-production

    def _get_last_modified(self, path: Path) -> str:
        """Get most recent modification time for any file in directory"""
        latest = 0
        for file in path.rglob("*"):
            if file.is_file():
                try:
                    mtime = file.stat().st_mtime
                    if mtime > latest:
                        latest = mtime
                except Exception:
                    pass

        if latest > 0:
            return datetime.fromtimestamp(latest).strftime("%Y-%m-%d")
        return "unknown"


if __name__ == "__main__":
    # Test the analyzer
    import sys

    repo_path = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
    analyzer = CourseAnalyzer(repo_path)

    data = analyzer.collect()

    print("\n" + "=" * 60)
    print("COURSE METRICS")
    print("=" * 60)
    print(f"\nTotal Courses: {data['total_courses']}")
    print(f"\nBy Status:")
    for status, count in data["by_status"].items():
        emoji = {
            "production": "🟢",
            "development": "🟡",
            "beta": "🔵",
            "planning": "⚪",
        }[status]
        print(f"  {emoji} {status.title()}: {count}")

    print(f"\nTop 5 Courses by Content:")
    for i, course in enumerate(data["courses"][:5], 1):
        print(
            f"  {i}. {course['name']}: {course['lines']:,} lines "
            f"({course['modules']} modules, {course['completion']}% complete)"
        )
