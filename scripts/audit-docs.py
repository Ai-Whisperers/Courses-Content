#!/usr/bin/env python3
"""
Documentation Audit Script
Categorizes all markdown documentation files for consolidation planning.
"""

import os
import sys
from pathlib import Path
from collections import defaultdict

# Configure UTF-8 output for Windows
if sys.platform == "win32":
    import io

    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")


# Directories to EXCLUDE from documentation audit
EXCLUDE_DIRS = {
    ".git",
    "node_modules",
    "__pycache__",
    ".venv",
    "venv",
    ".claude",  # AI tool configurations
    "_shared/examples-archived",  # Archived examples
    "_shared/examples",  # Current examples
    "github-references",  # External references
}

# Directories to INCLUDE (documentation-specific)
PRIORITY_DIRS = {
    "root",  # Root-level docs
    "docs",
    "AUDIT-REPORTS",
    "PROGRESS",
    "certification",
    "courses",  # Only top-level course READMEs, not module content
    "_shared/configs",
    "_shared/templates",
}


def should_include_file(file_path: Path, root_path: Path) -> bool:
    """Determine if file should be included in documentation audit."""
    rel_path = str(file_path.relative_to(root_path))

    # Exclude files in excluded directories
    for exclude_dir in EXCLUDE_DIRS:
        if exclude_dir in rel_path:
            return False

    # Exclude module content within courses (we only want top-level course docs)
    if "courses" in rel_path and "modules" in rel_path:
        return False

    # Exclude lesson plans and detailed content
    if any(x in rel_path.lower() for x in ["lesson-plan", "slides", "exercises"]):
        return False

    return True


def categorize_file(file_path: Path, root_path: Path) -> str:
    """Categorize a documentation file."""
    rel_path = str(file_path.relative_to(root_path))
    filename = file_path.name.upper()

    # Core documentation (keep at root)
    if file_path.parent == root_path:
        if filename in ["README.MD", "CONTRIBUTING.MD", "LICENSE.MD"]:
            return "Core (Keep at Root)"
        if filename in [
            "HONEST-STATUS-REPORT.MD",
            "RESTRUCTURING-SUMMARY.MD",
            "IMPROVEMENTS-SUMMARY.MD",
        ]:
            return "Status Reports (Keep at Root)"
        if "PLAN" in filename or "ACTION" in filename:
            return "Planning Docs (Consider Archiving)"
        if "AUDIT" in filename or "ANALYSIS" in filename or "REPORT" in filename:
            return "Analysis Reports (Consider Archiving)"
        if "GUIDE" in filename or "TEMPLATE" in filename:
            return "Guides/Templates (Move to docs/)"
        return "Root-Level Misc (Review)"

    # docs/ folder
    if rel_path.startswith("docs"):
        if "guides" in rel_path:
            return "Guides (docs/guides/)"
        if "templates" in rel_path:
            return "Templates (docs/templates/)"
        if "business" in rel_path:
            return "Business Docs (docs/business/)"
        if "reference" in rel_path:
            return "Reference (docs/reference/)"
        if "planning" in rel_path:
            return "Planning (docs/planning/)"
        if "archive" in rel_path:
            return "Already Archived (docs/archive/)"
        return "docs/ (Uncategorized)"

    # AUDIT-REPORTS
    if rel_path.startswith("AUDIT-REPORTS"):
        return "Audit Reports (AUDIT-REPORTS/)"

    # PROGRESS tracking
    if rel_path.startswith("PROGRESS"):
        return "Progress Tracking (PROGRESS/)"

    # Certification
    if rel_path.startswith("certification"):
        return "Certification (certification/)"

    # Courses top-level
    if rel_path.startswith("courses"):
        if filename in ["README.MD", "INDEX.MD", "SYLLABUS.MD"]:
            return "Course Docs (courses/)"
        return "Course Content (courses/)"

    # Shared resources
    if rel_path.startswith("_shared"):
        if "configs" in rel_path:
            return "Shared Configs (_shared/configs/)"
        if "templates" in rel_path:
            return "Shared Templates (_shared/templates/)"
        return "Shared Resources (_shared/)"

    return "Uncategorized"


def audit_documentation(root_path: Path):
    """Audit all documentation files and categorize them."""

    # Find all markdown files
    all_md_files = list(root_path.rglob("*.md"))

    # Filter to only include relevant documentation
    doc_files = [f for f in all_md_files if should_include_file(f, root_path)]

    # Categorize files
    categories = defaultdict(list)
    for file_path in doc_files:
        category = categorize_file(file_path, root_path)
        rel_path = str(file_path.relative_to(root_path))
        categories[category].append(rel_path)

    # Print results
    print("=" * 80)
    print("DOCUMENTATION AUDIT REPORT")
    print("=" * 80)
    print()
    print(f"Total markdown files found: {len(all_md_files)}")
    print(f"Documentation files (after filtering): {len(doc_files)}")
    print()
    print("=" * 80)
    print("FILES BY CATEGORY")
    print("=" * 80)
    print()

    # Sort categories by priority
    priority_order = [
        "Core (Keep at Root)",
        "Status Reports (Keep at Root)",
        "Planning Docs (Consider Archiving)",
        "Analysis Reports (Consider Archiving)",
        "Guides/Templates (Move to docs/)",
        "Root-Level Misc (Review)",
        "Guides (docs/guides/)",
        "Templates (docs/templates/)",
        "Business Docs (docs/business/)",
        "Reference (docs/reference/)",
        "Planning (docs/planning/)",
        "Audit Reports (AUDIT-REPORTS/)",
        "Progress Tracking (PROGRESS/)",
        "Certification (certification/)",
        "Course Docs (courses/)",
        "Shared Configs (_shared/configs/)",
        "Shared Templates (_shared/templates/)",
    ]

    for category in priority_order:
        if category in categories:
            files = sorted(categories[category])
            print(f"\n{category} ({len(files)} files)")
            print("-" * 80)
            for file_path in files:
                print(f"  • {file_path}")

    # Print remaining uncategorized
    for category, files in sorted(categories.items()):
        if category not in priority_order:
            files = sorted(files)
            print(f"\n{category} ({len(files)} files)")
            print("-" * 80)
            for file_path in files:
                print(f"  • {file_path}")

    print()
    print("=" * 80)
    print("SUMMARY BY CATEGORY")
    print("=" * 80)
    for category in sorted(categories.keys()):
        print(f"{category}: {len(categories[category])} files")


if __name__ == "__main__":
    root_path = Path(__file__).parent.resolve()
    audit_documentation(root_path)
