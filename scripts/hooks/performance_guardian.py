#!/usr/bin/env python3
"""
⚡ Performance Guardian
Detects performance anti-patterns in Python code.
Used by: pre-commit hook 'performance-guardian'

Inspired by: Google's Python Performance Guide, Netflix's optimizations
"""

import sys
import ast
import re
from pathlib import Path
from typing import List, Tuple, Optional


class PerformanceAntiPattern:
    """Represents a performance anti-pattern."""

    def __init__(
        self,
        name: str,
        pattern: str,
        description: str,
        severity: str = "warning",
        suggestion: str = "",
    ):
        self.name = name
        self.pattern = pattern
        self.description = description
        self.severity = severity  # error, warning, info
        self.suggestion = suggestion


# Anti-patterns database
ANTI_PATTERNS = [
    PerformanceAntiPattern(
        name="list_in_for_loop",
        pattern=r"for .* in (range\(len\(.*\)\)|list\(.*\))",
        description="Converting to list() or using range(len()) in for loop is inefficient",
        severity="warning",
        suggestion="Iterate directly over the collection or use enumerate()",
    ),
    PerformanceAntiPattern(
        name="string_concat_in_loop",
        pattern=r"(for|while).*:\s*\n.*\+.*=.*\"|for.*:\s*\n.*join",
        description="String concatenation in loops is O(n²)",
        severity="error",
        suggestion="Use list + ''.join() or io.StringIO",
    ),
    PerformanceAntiPattern(
        name="inefficient_dict_lookup",
        pattern=r"if .* in .*\.keys\(\)",
        description="Using .keys() for membership test is inefficient",
        severity="warning",
        suggestion="Use 'if key in dict' directly",
    ),
    PerformanceAntiPattern(
        name="repeated_compilation",
        pattern=r"(re\.match|re\.search|re\.findall)\s*\(",
        description="Compiling regex on every call is slow",
        severity="warning",
        suggestion="Use re.compile() and cache the pattern",
    ),
    PerformanceAntiPattern(
        name="expensive_exception",
        pattern=r"try:.*\n.*except.*:.*\n.*pass",
        description="Bare except or pass in exception handling can hide errors and be slow",
        severity="error",
        suggestion="Handle specific exceptions and don't use bare except/pass",
    ),
    PerformanceAntiPattern(
        name="unnecessary_list_comprehension",
        pattern=r"\[.* for .* in .*\]",
        description="List comprehensions create full lists in memory",
        severity="info",
        suggestion="Consider generator expressions () for large datasets",
    ),
    PerformanceAntiPattern(
        name="infinite_loop_risk",
        pattern=r"while\s+True\s*:",
        description="Infinite loops need careful break conditions",
        severity="warning",
        suggestion="Ensure there's a clear exit condition or use for loop with iterator",
    ),
    PerformanceAntiPattern(
        name="global_variable_mutation",
        pattern=r"global\s+\w+",
        description="Global variables can hurt performance and maintainability",
        severity="warning",
        suggestion="Use function parameters or class attributes instead",
    ),
]


class PerformanceChecker(ast.NodeVisitor):
    """AST visitor to check for performance issues."""

    def __init__(self, filename: str):
        self.filename = filename
        self.issues: List[Tuple[int, str, str, str]] = []

    def visit_For(self, node):
        """Check for loop anti-patterns."""
        # Check for range(len()) pattern
        if isinstance(node.iter, ast.Call):
            if isinstance(node.iter.func, ast.Name) and node.iter.func.id == "range":
                if len(node.iter.args) == 1:
                    if isinstance(node.iter.args[0], ast.Call):
                        if isinstance(node.iter.args[0].func, ast.Name):
                            if node.iter.args[0].func.id == "len":
                                self.issues.append(
                                    (
                                        node.lineno,
                                        "error",
                                        "Inefficient loop pattern",
                                        "Use 'for item in iterable' or 'for i, item in enumerate(iterable)' instead of range(len())",
                                    )
                                )

        # Check for string concatenation in loop
        for child in ast.walk(node):
            if isinstance(child, ast.AugAssign):
                if isinstance(child.op, ast.Add):
                    if isinstance(child.value, ast.Constant) and isinstance(
                        child.value.value, str
                    ):
                        self.issues.append(
                            (
                                node.lineno,
                                "error",
                                "String concatenation in loop",
                                "String concatenation in loops is O(n²). Use list + ''.join() instead",
                            )
                        )

        self.generic_visit(node)

    def visit_While(self, node):
        """Check while loop anti-patterns."""
        # Check for while True without obvious break
        if isinstance(node.test, ast.Constant) and node.test.value is True:
            has_break = False
            for child in ast.walk(node):
                if isinstance(child, ast.Break):
                    has_break = True
                    break

            if not has_break:
                self.issues.append(
                    (
                        node.lineno,
                        "error",
                        "Potential infinite loop",
                        "while True without break condition detected",
                    )
                )

        self.generic_visit(node)

    def visit_Global(self, node):
        """Check for global usage."""
        for name in node.names:
            self.issues.append(
                (
                    node.lineno,
                    "warning",
                    f"Global variable '{name}'",
                    "Global variables can impact performance. Consider using function parameters or classes",
                )
            )

        self.generic_visit(node)

    def visit_Try(self, node):
        """Check exception handling."""
        # Check for bare except
        for handler in node.handlers:
            if handler.type is None:
                self.issues.append(
                    (
                        handler.lineno,
                        "error",
                        "Bare except clause",
                        "Bare except catches KeyboardInterrupt and SystemExit. Use specific exceptions",
                    )
                )

        self.generic_visit(node)


def check_file_performance(filepath: str) -> List[Tuple[int, str, str, str]]:
    """Check a single file for performance issues."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        return [(0, "error", "File read error", str(e))]

    try:
        tree = ast.parse(content)
    except SyntaxError:
        return []  # Skip files with syntax errors

    checker = PerformanceChecker(filepath)
    checker.visit(tree)

    # Also do regex-based checks
    lines = content.split("\n")
    for i, line in enumerate(lines, 1):
        # Check for .keys() membership test
        if re.search(r"if\s+\w+\s+in\s+\w+\.keys\(\)", line):
            checker.issues.append(
                (
                    i,
                    "warning",
                    "Inefficient dict lookup",
                    "Use 'if key in dict' instead of 'if key in dict.keys()'",
                )
            )

        # Check for repeated regex compilation
        if re.search(r"(re\.match|re\.search|re\.findall)\s*\([^,]+,", line):
            if not re.search(
                r"re\.compile", content[: sum(len(l) for l in lines[: i - 1])]
            ):
                checker.issues.append(
                    (
                        i,
                        "warning",
                        "Regex compilation in loop",
                        "Consider compiling regex pattern once with re.compile() outside the loop",
                    )
                )

    return checker.issues


def main():
    """Main entry point."""
    files = sys.argv[1:]

    if not files:
        print("✅ No files to check")
        sys.exit(0)

    all_issues = []

    for filepath in files:
        if not filepath.endswith(".py"):
            continue

        issues = check_file_performance(filepath)
        if issues:
            all_issues.extend([(filepath, *issue) for issue in issues])

    if all_issues:
        print("\n" + "⚡" * 35)
        print("⚡ PERFORMANCE GUARDIAN - Issues Detected")
        print("⚡" * 35)

        errors = [i for i in all_issues if i[2] == "error"]
        warnings = [i for i in all_issues if i[2] == "warning"]

        if errors:
            print(f"\n🔴 ERRORS ({len(errors)}):")
            for filepath, line, severity, title, message in errors:
                print(f"  {filepath}:{line}")
                print(f"    ❌ {title}")
                print(f"    💡 {message}\n")

        if warnings:
            print(f"\n🟡 WARNINGS ({len(warnings)}):")
            for filepath, line, severity, title, message in warnings:
                print(f"  {filepath}:{line}")
                print(f"    ⚠️  {title}")
                print(f"    💡 {message}\n")

        print("⚡" * 35)

        # Exit with error if there are critical issues
        if errors:
            sys.exit(1)
        else:
            print("\n⚠️  Performance warnings found (non-blocking)")
            sys.exit(0)
    else:
        print("✅ Performance guardian: No issues detected")
        sys.exit(0)


if __name__ == "__main__":
    main()
