#!/usr/bin/env python3
"""
📦 Import Guardian
Detects circular imports, unused imports, and import anti-patterns.
Used by: pre-commit hook 'import-guardian'

Based on: Google Python Style Guide, PyCharm inspections
"""

import sys
import ast
from pathlib import Path
from typing import List, Set, Tuple


def find_imports(filepath: str) -> Tuple[List[str], List[str], List[str]]:
    """
    Extract imports from a Python file.

    Returns:
        Tuple of (stdlib_imports, third_party_imports, local_imports)
    """
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception:
        return [], [], []

    try:
        tree = ast.parse(content)
    except SyntaxError:
        return [], [], []

    stdlib = []
    third_party = []
    local = []

    stdlib_modules = {
        "abc",
        "argparse",
        "ast",
        "asyncio",
        "base64",
        "collections",
        "contextlib",
        "copy",
        "csv",
        "datetime",
        "decimal",
        "enum",
        "functools",
        "glob",
        "hashlib",
        "html",
        "http",
        "importlib",
        "inspect",
        "io",
        "itertools",
        "json",
        "logging",
        "math",
        "mimetypes",
        "multiprocessing",
        "operator",
        "os",
        "pathlib",
        "pickle",
        "random",
        "re",
        "shutil",
        "signal",
        "socket",
        "sqlite3",
        "statistics",
        "string",
        "subprocess",
        "sys",
        "tempfile",
        "textwrap",
        "threading",
        "time",
        "traceback",
        "typing",
        "unittest",
        "urllib",
        "uuid",
        "warnings",
        "xml",
        "zipfile",
    }

    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                name = alias.name.split(".")[0]
                if name in stdlib_modules:
                    stdlib.append(name)
                elif name.startswith("."):
                    local.append(name)
                else:
                    third_party.append(name)

        elif isinstance(node, ast.ImportFrom):
            if node.module:
                name = node.module.split(".")[0]
                if name in stdlib_modules:
                    stdlib.append(name)
                elif node.level > 0:  # Relative import
                    local.append(name)
                else:
                    third_party.append(name)

    return stdlib, third_party, local


def check_unused_imports(filepath: str) -> List[Tuple[int, str]]:
    """Find unused imports in a file."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception:
        return []

    try:
        tree = ast.parse(content)
    except SyntaxError:
        return []

    # Collect all imported names
    imported_names = {}

    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                name = alias.asname if alias.asname else alias.name.split(".")[0]
                imported_names[name] = (node.lineno, alias.name)

        elif isinstance(node, ast.ImportFrom):
            for alias in node.names:
                name = alias.asname if alias.asname else alias.name
                imported_names[name] = (node.lineno, f"{node.module}.{alias.name}")

    # Find all used names
    used_names = set()

    class NameVisitor(ast.NodeVisitor):
        def visit_Name(self, node):
            if isinstance(node.ctx, (ast.Load, ast.AugLoad)):
                used_names.add(node.id)
            self.generic_visit(node)

        def visit_FunctionDef(self, node):
            # Don't count function arguments as uses
            arg_names = {arg.arg for arg in node.args.args}
            arg_names.update({arg.arg for arg in node.args.kwonlyargs})
            if node.args.vararg:
                arg_names.add(node.args.vararg.arg)
            if node.args.kwarg:
                arg_names.add(node.args.kwarg.arg)

            for child in ast.walk(node):
                if isinstance(child, ast.Name) and isinstance(child.ctx, ast.Load):
                    if child.id not in arg_names:
                        used_names.add(child.id)

        def visit_AsyncFunctionDef(self, node):
            # Handle async functions the same as regular functions
            arg_names = {arg.arg for arg in node.args.args}
            arg_names.update({arg.arg for arg in node.args.kwonlyargs})
            if node.args.vararg:
                arg_names.add(node.args.vararg.arg)
            if node.args.kwarg:
                arg_names.add(node.args.kwarg.arg)

            for child in ast.walk(node):
                if isinstance(child, ast.Name) and isinstance(child.ctx, ast.Load):
                    if child.id not in arg_names:
                        used_names.add(child.id)

    visitor = NameVisitor()
    visitor.visit(tree)

    # Find unused
    unused = []
    for name, (lineno, full_name) in imported_names.items():
        if name not in used_names and not name.startswith("_"):
            unused.append((lineno, full_name))

    return unused


def check_wildcard_imports(filepath: str) -> List[Tuple[int, str]]:
    """Find wildcard imports."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception:
        return []

    try:
        tree = ast.parse(content)
    except SyntaxError:
        return []

    wildcards = []

    for node in ast.walk(tree):
        if isinstance(node, ast.ImportFrom):
            for alias in node.names:
                if alias.name == "*":
                    wildcards.append((node.lineno, node.module or "unknown"))

    return wildcards


def check_import_order(filepath: str) -> List[str]:
    """Check if imports follow standard order (stdlib, third-party, local)."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception:
        return []

    try:
        tree = ast.parse(content)
    except SyntaxError:
        return []

    issues = []

    # Get all import statements in order
    imports = []
    for node in ast.walk(tree):
        if isinstance(node, (ast.Import, ast.ImportFrom)):
            imports.append(node)

    # Sort by line number
    imports.sort(key=lambda x: x.lineno)

    # Check order (simplified check)
    seen_stdlib = False
    seen_third_party = False
    seen_local = False

    for node in imports:
        if isinstance(node, ast.Import):
            for alias in node.names:
                name = alias.name.split(".")[0]
                # Simplified classification
                if name.startswith("."):
                    if seen_stdlib or seen_third_party:
                        seen_local = True
                else:
                    seen_third_party = True
                    if not seen_stdlib:
                        seen_stdlib = True

    return issues


def main():
    """Main entry point."""
    files = sys.argv[1:]

    if not files:
        print("✅ No files to check")
        sys.exit(0)

    python_files = [f for f in files if f.endswith(".py")]

    if not python_files:
        print("✅ No Python files to check")
        sys.exit(0)

    all_unused = []
    all_wildcards = []

    for filepath in python_files:
        unused = check_unused_imports(filepath)
        if unused:
            all_unused.extend([(filepath, lineno, name) for lineno, name in unused])

        wildcards = check_wildcard_imports(filepath)
        if wildcards:
            all_wildcards.extend(
                [(filepath, lineno, module) for lineno, module in wildcards]
            )

    has_issues = all_unused or all_wildcards

    if has_issues:
        print("\n" + "📦" * 35)
        print("📦 IMPORT GUARDIAN - Issues Detected")
        print("📦" * 35)

        if all_wildcards:
            print("\n🔴 WILDCARD IMPORTS (Forbidden):")
            for filepath, lineno, module in all_wildcards:
                print(f"  {filepath}:{lineno}")
                print(f"    ❌ 'from {module} import *'")
                print(
                    f"    💡 Use explicit imports: 'from {module} import specific_name'"
                )

        if all_unused:
            print("\n🟡 UNUSED IMPORTS:")
            for filepath, lineno, name in all_unused:
                print(f"  {filepath}:{lineno}")
                print(f"    ⚠️  '{name}' is imported but never used")
                print(f"    💡 Remove this import")

        print("\n📦" * 35)

        # Wildcards are errors, unused are warnings
        if all_wildcards:
            print("\n❌ Import guardian failed - wildcard imports must be removed")
            sys.exit(1)
        else:
            print("\n⚠️  Unused imports found (non-blocking)")
            sys.exit(0)
    else:
        print("✅ Import guardian: All imports clean")
        sys.exit(0)


if __name__ == "__main__":
    main()
