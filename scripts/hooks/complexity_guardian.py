#!/usr/bin/env python3
"""
🧮 Complexity Guardian
Monitors code complexity metrics to prevent technical debt.
Used by: pre-commit hook 'complexity-guardian'

Based on: SonarQube rules, Code Climate standards
"""

import sys
from pathlib import Path
from radon.complexity import cc_visit, cc_rank
from radon.metrics import mi_visit, mi_rank
from radon.raw import analyze


# Thresholds (adjust based on project requirements)
THRESHOLDS = {
    "cyclomatic_complexity": {
        "A": 5,  # Simple - low risk
        "B": 10,  # Moderate - low risk
        "C": 20,  # Complex - moderate risk
        "D": 30,  # Very complex - high risk
        "E": 40,  # Unmaintainable - very high risk
        "F": 50,  # Refactor immediately
    },
    "maintainability_index": {
        "A": 100,  # Excellent
        "B": 85,  # Good
        "C": 70,  # Moderate
        "D": 50,  # Poor
        "F": 0,  # Unmaintainable
    },
    "function_lines": 50,  # Max lines per function
    "file_lines": 500,  # Max lines per file
    "total_complexity": 100,  # Max complexity per file
}


def check_file_complexity(filepath: str) -> dict:
    """Analyze complexity metrics for a file."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        return {"error": str(e)}

    results = {
        "filepath": filepath,
        "cyclomatic_complexity": [],
        "maintainability_index": None,
        "raw_metrics": None,
        "violations": [],
    }

    # Cyclomatic complexity
    try:
        complexity_results = cc_visit(content)
        for result in complexity_results:
            rank = cc_rank(result.complexity)
            results["cyclomatic_complexity"].append(
                {
                    "name": result.name,
                    "complexity": result.complexity,
                    "rank": rank,
                    "lineno": result.lineno,
                }
            )

            # Check thresholds
            if result.complexity > THRESHOLDS["cyclomatic_complexity"]["C"]:
                severity = (
                    "error"
                    if result.complexity > THRESHOLDS["cyclomatic_complexity"]["D"]
                    else "warning"
                )
                results["violations"].append(
                    {
                        "type": "cyclomatic_complexity",
                        "severity": severity,
                        "function": result.name,
                        "lineno": result.lineno,
                        "value": result.complexity,
                        "message": f"Cyclomatic complexity is {result.complexity} (threshold: {THRESHOLDS['cyclomatic_complexity']['C']})",
                    }
                )
    except Exception as e:
        results["violations"].append(
            {
                "type": "analysis_error",
                "severity": "warning",
                "message": f"Could not analyze complexity: {e}",
            }
        )

    # Maintainability Index
    try:
        mi_score = mi_visit(content, True)
        results["maintainability_index"] = {
            "score": mi_score,
            "rank": mi_rank(mi_score),
        }

        if mi_score < THRESHOLDS["maintainability_index"]["C"]:
            results["violations"].append(
                {
                    "type": "maintainability",
                    "severity": "warning",
                    "value": mi_score,
                    "message": f"Maintainability index is {mi_score:.1f} (threshold: {THRESHOLDS['maintainability_index']['C']})",
                }
            )
    except Exception as e:
        pass  # MI analysis is optional

    # Raw metrics
    try:
        raw = analyze(content)
        results["raw_metrics"] = {
            "loc": raw.loc,
            "sloc": raw.sloc,
            "comments": raw.comments,
            "multi": raw.multi,
            "blank": raw.blank,
        }

        # Check file size
        if raw.sloc > THRESHOLDS["file_lines"]:
            results["violations"].append(
                {
                    "type": "file_size",
                    "severity": "warning",
                    "value": raw.sloc,
                    "message": f"File has {raw.sloc} source lines (threshold: {THRESHOLDS['file_lines']})",
                }
            )
    except Exception:
        pass

    return results


def format_complexity_report(results: list) -> str:
    """Format complexity analysis report."""
    lines = []
    lines.append("\n" + "=" * 70)
    lines.append("🧮 COMPLEXITY GUARDIAN - Code Metrics Report")
    lines.append("=" * 70)

    total_errors = 0
    total_warnings = 0

    for result in results:
        if "error" in result:
            lines.append(
                f"\n❌ Error analyzing {result['filepath']}: {result['error']}"
            )
            continue

        if not result["violations"]:
            continue

        lines.append(f"\n📄 {result['filepath']}")

        # Complexity info
        if result["cyclomatic_complexity"]:
            avg_cc = sum(
                x["complexity"] for x in result["cyclomatic_complexity"]
            ) / len(result["cyclomatic_complexity"])
            max_cc = max(x["complexity"] for x in result["cyclomatic_complexity"])
            lines.append(f"   Cyclomatic Complexity: avg={avg_cc:.1f}, max={max_cc}")

        # MI info
        if result["maintainability_index"]:
            mi = result["maintainability_index"]
            lines.append(f"   Maintainability Index: {mi['score']:.1f} ({mi['rank']})")

        # Violations
        lines.append("   Violations:")
        for v in result["violations"]:
            icon = "🔴" if v["severity"] == "error" else "🟡"
            lines.append(f"     {icon} {v['message']}")
            if v["severity"] == "error":
                total_errors += 1
            else:
                total_warnings += 1

        # High complexity functions
        high_complexity = [
            x
            for x in result["cyclomatic_complexity"]
            if x["rank"] in ["C", "D", "E", "F"]
        ]
        if high_complexity:
            lines.append("   High Complexity Functions:")
            for func in high_complexity:
                icon = "🔴" if func["rank"] in ["E", "F"] else "🟡"
                lines.append(
                    f"     {icon} {func['name']}: {func['complexity']} ({func['rank']}) @ line {func['lineno']}"
                )

    lines.append("\n" + "=" * 70)
    lines.append(f"Summary: {total_errors} errors, {total_warnings} warnings")
    lines.append("=" * 70)

    return "\n".join(lines)


def main():
    """Main entry point."""
    files = sys.argv[1:]

    if not files:
        print("✅ No files to check")
        sys.exit(0)

    # Filter Python files
    python_files = [f for f in files if f.endswith(".py")]

    if not python_files:
        print("✅ No Python files to analyze")
        sys.exit(0)

    results = []
    for filepath in python_files:
        result = check_file_complexity(filepath)
        results.append(result)

    # Check if any violations
    has_violations = any(r.get("violations") for r in results)
    has_errors = any(
        any(v["severity"] == "error" for v in r.get("violations", [])) for r in results
    )

    if has_violations:
        print(format_complexity_report(results))

        if has_errors:
            print("\n❌ Complexity guardian failed - refactor required")
            sys.exit(1)
        else:
            print("\n⚠️  Complexity warnings found (non-blocking)")
            sys.exit(0)
    else:
        print("✅ Complexity guardian: All files within acceptable thresholds")
        sys.exit(0)


if __name__ == "__main__":
    main()
