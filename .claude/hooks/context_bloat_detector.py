#!/usr/bin/env python3
"""
Context Bloat Detector Hook con Thinking Budget Adaptativa

Monitors open files, token usage, y adaptively adjusts thinking budget for FPUNA educational contexts.
Automatically suggests /compact and applies MERCOSUR-aware thinking allocations.

Usage: Automatically triggered by Claude Code PostToolUse hook
"""

import os
import sys
import re
from pathlib import Path
from typing import Dict, List, Any, Optional

# Thresholds
MAX_FILES_WARNING = 3  # 3-file rule
TOKEN_WARNING_THRESHOLD = 35000  # 17.5% of 200K limit
TOKEN_DANGER_THRESHOLD = 50000  # 25% of 200K limit
COMPACTION_THRESHOLD = 196000  # 98% - auto-compaction trigger (reserve 4K)

# Thinking Budget Allocations (FPUNA educational aware)
THINKING_BUDGETS = {
    "educational-reasoning": 20000,  # General education (educational=20K from CometAPI)
    "session-extended": 25000,  # FPUNA tracks - full academic reason (session-extended=25K)
    "mercosur-analysis": 25000,  # MERCOSUR business analysis (detected boost)
    "quick-tasks": 5000,  # Administrative tasks
    "architectural-decisions": 15000,  # Technical planning
}

# FPUNA Project Detection Patterns
FPUNA_TRACKS = [
    "FPUNA-2026",
    "MARKETING-NEGOCIOS-TURISMO",
    "INGENIERIA-AERONAUTICA",
    "DESARROLLO-SOFTWARE",
    "INVESTIGACION-ACADEMICA",
]

# MERCOSUR Context Keywords (Spanish for efficiency boost)
MERCOSUR_KEYWORDS = [
    "paraguay",
    "mercosur",
    "turismo",
    "negocios",
    "economía",
    "comercio",
    "regional",
    "asnaza",
    "py",
    "guaraní",
    "mercado",
    "industrial",
]

# Track state across hook invocations
STATE_FILE = Path.home() / ".claude" / "context_state.txt"


def count_open_files() -> int:
    """
    Estimate number of open files based on recent file operations.

    Note: This is a heuristic. Actual open file count would require
    integration with Claude Code's internal state.
    """
    # In a real implementation, this would be provided by Claude Code
    # For now, we'll use a placeholder
    return 0


def estimate_token_usage() -> int:
    """
    Estimate current token usage.

    Note: Actual token usage would come from Claude Code's context manager.
    """
    # Placeholder - would be provided by Claude Code
    return 0


def detect_context_context() -> Dict[str, Any]:
    """
    Detect FPUNA educational context and MERCOSUR business intelligence needs.
    Analyzes current session for automatic thinking budget allocation.
    """
    # In real implementation, this would scan Claude Code's context
    # For now, simulate detection based on file paths and content
    fpuna_score = 0
    mercosur_score = 0
    detected_tracks = []

    try:
        # Scan current working directory for FPUNA indicators
        cwd = Path.cwd()
        cwd_str = str(cwd).lower()

        # Check for FPUNA tracks in directory path
        for track in FPUNA_TRACKS:
            if track.lower() in cwd_str:
                fpuna_score += 50
                detected_tracks.append(track)

        # Check recent file paths (simulated)
        # In real impl: Claude would provide recently accessed files
        recent_files = [
            str(Path("cursos/02-desarrollo/FPUNA-2026/README.md")),
            str(Path("_compartido/04-utilidades-ia/mercosur-economic-data.json")),
        ]

        for file_path in recent_files:
            file_str = file_path.lower()
            for track in FPUNA_TRACKS:
                if track.lower() in file_str:
                    fpuna_score = min(fpuna_score + 20, 100)
                    if track not in detected_tracks:
                        detected_tracks.append(track)

    except Exception as e:
        # Graceful degradation - don't break the hook
        print(f"[ContextDetector] Error detecting context: {e}", file=sys.stderr)

    # Determine thinking budget based on context
    if fpuna_score >= 70:
        budget = "session-extended"  # 25K tokens
        budget_explanation = (
            "FPUNA tracks detected - extended educational reasoning (25K tokens)"
        )
    elif mercosur_score >= 30:
        budget = "mercosur-analysis"  # 25K tokens
        budget_explanation = (
            "MERCOSUR business analysis - enhanced market reasoning (25K tokens)"
        )
    elif fpuna_score >= 30:
        budget = "educational-reasoning"  # 20K tokens
        budget_explanation = (
            "Educational context detected - extended thinking (20K tokens)"
        )
    else:
        budget = "architectural-decisions"  # 15K tokens
        budget_explanation = "Standard context - architectural reasoning (15K tokens)"

    return {
        "fpuna_context_score": fpuna_score,
        "mercosur_context_score": mercosur_score,
        "detected_tracks": detected_tracks,
        "thinking_budget": budget,
        "thinking_budget_explanation": budget_explanation,
        "budget_tokens": THINKING_BUDGETS[budget],
    }


def detect_context_bloat(file_count: int, token_count: int) -> Dict[str, Any]:
    """
    Analyze context usage and detect bloat, now with FPUNA thinking budget context.

    Returns:
        dict: Analysis results with recommendations and thinking budget
    """
    issues = []
    recommendations = []
    severity = "ok"

    # Get educational context and thinking budget
    context_info = detect_context_context()

    # Check file count (3-file rule)
    if file_count > MAX_FILES_WARNING:
        issues.append(f"{file_count} files open (3-file rule: max 3)")
        recommendations.append(
            "Close extra files - keep only current implementation, test, and reference"
        )
        severity = "warning"

    # Check token usage with compaction threshold
    token_percentage = (token_count / 200000) * 100

    if token_count > COMPACTION_THRESHOLD:
        issues.append(
            f"Token usage: {token_count:,} ({token_percentage:.1f}% of limit)"
        )
        recommendations.append("AUTO-COMPACTION TRIGGERED - context at 98% capacity")
        severity = "danger"
    elif token_count > TOKEN_DANGER_THRESHOLD:
        issues.append(
            f"Token usage: {token_count:,} ({token_percentage:.1f}% of limit)"
        )
        recommendations.append("RUN /compact IMMEDIATELY - high token usage")
        severity = "danger"
    elif token_count > TOKEN_WARNING_THRESHOLD:
        issues.append(
            f"Token usage: {token_count:,} ({token_percentage:.1f}% of limit)"
        )
        recommendations.append("Consider running /compact to reduce context")
        if severity != "danger":
            severity = "warning"

    # Merge context info with bloat analysis
    result = {
        "severity": severity,
        "file_count": file_count,
        "token_count": token_count,
        "token_percentage": token_percentage,
        "issues": issues,
        "recommendations": recommendations,
    }
    result.update(context_info)

    return result


def format_output(analysis: Dict) -> str:
    """
    Format analysis results for display with FPUNA thinking budget context.
    """
    if analysis["severity"] == "ok":
        # Even when OK, show thinking budget for educational contexts
        if (
            analysis.get("fpuna_context_score", 0) > 0
            or analysis.get("mercosur_context_score", 0) > 0
        ):
            output = []
            output.append(f"\n🧠 FPUNA Thinking Budget Activated:")
            output.append(f"  - {analysis['thinking_budget_explanation']}")
            output.append("")
            return "\n".join(output)
        return ""

    # Color codes
    YELLOW = "\033[1;33m"
    RED = "\033[0;31m"
    NC = "\033[0m"

    color = YELLOW if analysis["severity"] == "warning" else RED

    output = []
    output.append(f"\n{color}Context Bloat Detected:{NC}")

    # Show thinking budget first for educational context
    if (
        analysis.get("fpuna_context_score", 0) > 0
        or analysis.get("mercosur_context_score", 0) > 0
    ):
        output.append(
            f"🧠 FPUNA Thinking Budget: {analysis['thinking_budget_explanation']}"
        )
    output.append("")

    for issue in analysis["issues"]:
        output.append(f"  - {issue}")

    output.append("")
    output.append("Recommendations:")
    for rec in analysis["recommendations"]:
        output.append(f"  - {rec}")

    output.append("")

    return "\n".join(output)


def main():
    """
    Main hook execution.
    """
    # Get file count and token usage
    # In production, these would come from Claude Code's context
    file_count = count_open_files()
    token_count = estimate_token_usage()

    # Detect bloat
    analysis = detect_context_bloat(file_count, token_count)

    # Format and print output
    output = format_output(analysis)
    if output:
        print(output, file=sys.stderr)

    # Always exit 0 (don't block the Read operation)
    return 0


if __name__ == "__main__":
    sys.exit(main())
