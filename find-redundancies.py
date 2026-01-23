#!/usr/bin/env python3
"""
Redundancy Finder for Documentation
Identifies potential duplicate or overlapping documentation files.
"""

import os
import sys
from pathlib import Path
from collections import defaultdict
import re

# Configure UTF-8 output for Windows
if sys.platform == "win32":
    import io

    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")


# Patterns that indicate similar content
SIMILARITY_PATTERNS = {
    "plan": ["plan", "roadmap", "strategy"],
    "guide": ["guide", "tutorial", "how-to", "walkthrough"],
    "template": ["template", "skeleton", "boilerplate"],
    "audit": ["audit", "analysis", "report", "review"],
    "instructor": ["instructor", "teacher", "facilitator"],
    "student": ["student", "learner"],
    "assessment": ["assessment", "quiz", "exam", "evaluation"],
    "setup": ["setup", "installation", "configuration", "getting-started"],
}


def normalize_filename(filename: str) -> str:
    """Normalize filename for comparison."""
    # Remove extension
    name = filename.lower().replace(".md", "")
    # Remove common prefixes/suffixes
    name = re.sub(r"^(old|new|draft|final|v\d+)-", "", name)
    name = re.sub(r"-(old|new|draft|final|v\d+)$", "", name)
    return name


def get_file_category(filename: str) -> str:
    """Get category for a filename based on keywords."""
    name_lower = filename.lower()

    for category, keywords in SIMILARITY_PATTERNS.items():
        for keyword in keywords:
            if keyword in name_lower:
                return category

    return "other"


def find_redundancies():
    """Find potentially redundant documentation files."""
    root_path = Path(__file__).parent.resolve()

    # Focus on root-level and docs/ folder
    target_dirs = [
        root_path,
        root_path / "docs",
        root_path / "docs" / "guides",
        root_path / "docs" / "planning",
        root_path / "docs" / "reference",
    ]

    # Collect files by category
    files_by_category = defaultdict(list)

    for target_dir in target_dirs:
        if not target_dir.exists():
            continue

        for file_path in target_dir.glob("*.md"):
            category = get_file_category(file_path.name)
            rel_path = str(file_path.relative_to(root_path))
            files_by_category[category].append(rel_path)

    # Look for similar names
    similar_names = defaultdict(list)
    all_files = []
    for target_dir in target_dirs:
        if target_dir.exists():
            for file_path in target_dir.glob("*.md"):
                all_files.append(file_path)

    # Group by normalized name
    for file_path in all_files:
        normalized = normalize_filename(file_path.name)
        rel_path = str(file_path.relative_to(root_path))
        similar_names[normalized].append(rel_path)

    # Print results
    print("=" * 80)
    print("DOCUMENTATION REDUNDANCY ANALYSIS")
    print("=" * 80)
    print()

    # Find potential redundancies
    redundancies_found = False

    print("FILES WITH SIMILAR NAMES:")
    print("-" * 80)
    for normalized, file_list in sorted(similar_names.items()):
        if len(file_list) > 1:
            print(f"\n{normalized}:")
            for file in file_list:
                print(f"  • {file}")
            redundancies_found = True

    if not redundancies_found:
        print("  (No exact duplicates found)")

    print("\n" + "=" * 80)
    print("FILES BY TOPIC CATEGORY:")
    print("=" * 80)

    for category in sorted(files_by_category.keys()):
        files = files_by_category[category]
        if len(files) > 1:  # Only show if multiple files in category
            print(f"\n{category.upper()} ({len(files)} files):")
            print("-" * 80)
            for file in sorted(files):
                print(f"  • {file}")

    # Specific redundancy checks
    print("\n" + "=" * 80)
    print("SPECIFIC REDUNDANCY CANDIDATES:")
    print("=" * 80)

    candidates = [
        {
            "name": "Multiple Planning Documents",
            "files": [
                "AUTONOMOUS-WORK-PLAN-DETAILED.md",
                "AUTONOMOUS-WORK-PLAN-MONTH.md",
                "IMMEDIATE-ACTION-PLAN.md",
                "MASTER-COMPLETION-PLAN.md",
            ],
            "recommendation": "Archive all to docs/archive/planning/ - superseded by new plans",
        },
        {
            "name": "Multiple Analysis Reports",
            "files": [
                "COURSE-COMPLETION-ANALYSIS.md",
                "FPUNA-LANGUAGE-AUDIT.md",
                "PLACEHOLDER-CONTENT-REPORT.md",
            ],
            "recommendation": "Archive to docs/archive/analysis/ - historical reports",
        },
        {
            "name": "Misplaced Templates/Guides",
            "files": [
                "COURSE-STRUCTURE-TEMPLATE.md",
                "INSTRUCTOR-GUIDES-CONSOLIDATION.md",
            ],
            "recommendation": "COURSE-STRUCTURE-TEMPLATE → docs/templates/, INSTRUCTOR-GUIDES-CONSOLIDATION → docs/archive/consolidation/",
        },
        {
            "name": "Quality Improvement Report",
            "files": [
                "QUALITY-IMPROVEMENT-SUMMARY.md",
            ],
            "recommendation": "Archive to docs/archive/quality/ - historical summary",
        },
    ]

    for candidate in candidates:
        print(f"\n{candidate['name']}:")
        print("-" * 80)
        for file in candidate["files"]:
            # Check if file exists at root
            file_path = root_path / file
            exists = "✓" if file_path.exists() else "✗"
            print(f"  {exists} {file}")
        print(f"\n  Recommendation: {candidate['recommendation']}")


if __name__ == "__main__":
    find_redundancies()
