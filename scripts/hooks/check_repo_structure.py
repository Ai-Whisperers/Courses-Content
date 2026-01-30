#!/usr/bin/env python3
"""
🏗️ Repository Structure Validator
Validates that the repository follows organizational rules.
Used by: pre-commit hook 'check-repo-structure'

Based on: FPUNA repository organization standards
"""

import sys
import os
import json
from pathlib import Path
from typing import List, Dict, Tuple


# Expected repository structure
EXPECTED_STRUCTURE = {
    "root_files": [
        "README.md",
        "LICENSE",
        ".gitignore",
    ],
    "directories": [
        "cursos",
        "_compartido",
        ".claude",
        "scripts",
    ],
    "optional": [
        "CONTRIBUTING.md",
        "CODE_OF_CONDUCT.md",
        "SECURITY.md",
        ".pre-commit-config.yaml",
        "pyproject.toml",
        "requirements.txt",
    ],
}

# Files that should never exist at root (should be elsewhere or ignored)
FORBIDDEN_ROOT_FILES = [
    "*.pyc",
    "__pycache__",
    "*.log",
    "*.tmp",
    ".DS_Store",
    "Thumbs.db",
    "*.swp",
    "*.swo",
    "*~",
]

# Required Claude configuration files
CLAUDE_REQUIREMENTS = [
    ".claude/README.md",
    ".claude/settings.local.json",
]


def check_repository_structure() -> Tuple[List[str], List[str], List[str]]:
    """
    Check repository structure.

    Returns:
        Tuple of (errors, warnings, suggestions)
    """
    errors = []
    warnings = []
    suggestions = []

    root = Path.cwd()

    # Check for required root files
    for required in EXPECTED_STRUCTURE["root_files"]:
        if not (root / required).exists():
            errors.append(f"Missing required file: {required}")

    # Check for required directories
    for directory in EXPECTED_STRUCTURE["directories"]:
        if not (root / directory).exists():
            errors.append(f"Missing required directory: {directory}/")
        elif not (root / directory).is_dir():
            errors.append(f"Should be a directory: {directory}/")

    # Check for forbidden files at root
    for pattern in FORBIDDEN_ROOT_FILES:
        matching_files = list(root.glob(pattern))
        if matching_files:
            for f in matching_files:
                errors.append(f"Forbidden file at root: {f.name}")

    # Check for recommended optional files
    for optional in EXPECTED_STRUCTURE["optional"]:
        if not (root / optional).exists():
            suggestions.append(f"Consider adding: {optional}")

    # Check Claude configuration
    if (root / ".claude").exists():
        for req in CLAUDE_REQUIREMENTS:
            if not (root / req).exists():
                if req.endswith("settings.local.json"):
                    # This is optional but recommended
                    suggestions.append(f"Claude configuration missing: {req}")
                else:
                    warnings.append(f"Claude file recommended: {req}")

    # Check .gitignore exists and has basic entries
    gitignore_path = root / ".gitignore"
    if gitignore_path.exists():
        content = gitignore_path.read_text()

        # Check for critical entries
        critical_entries = [
            "__pycache__/",
            "*.pyc",
            ".env",
            "venv/",
        ]

        for entry in critical_entries:
            if entry not in content:
                warnings.append(f".gitignore should include: {entry}")

    return errors, warnings, suggestions


def check_claude_configuration() -> Tuple[List[str], List[str], List[str]]:
    """Check Claude Code configuration validity."""
    errors = []
    warnings = []
    suggestions = []

    root = Path.cwd()
    settings_path = root / ".claude" / "settings.local.json"

    if not settings_path.exists():
        warnings.append("No .claude/settings.local.json found")
        return errors, warnings, suggestions

    try:
        with open(settings_path, "r", encoding="utf-8") as f:
            settings = json.load(f)
    except json.JSONDecodeError as e:
        errors.append(f"Invalid JSON in settings.local.json: {e}")
        return errors, warnings, suggestions
    except Exception as e:
        errors.append(f"Cannot read settings.local.json: {e}")
        return errors, warnings, suggestions

    # Check for required sections
    if "permissions" not in settings:
        warnings.append("settings.local.json missing 'permissions' section")

    if "env" not in settings:
        warnings.append("settings.local.json missing 'env' section")

    if "hooks" not in settings:
        suggestions.append("Consider adding 'hooks' to settings.local.json")

    # Check for security-sensitive permissions
    if "permissions" in settings:
        perms = settings["permissions"]
        if "allow" in perms:
            # Check for overly permissive patterns
            dangerous_patterns = [
                "Bash(rm -rf:*)",
                "Bash(sudo:*)",
            ]
            for pattern in dangerous_patterns:
                if pattern in perms["allow"]:
                    errors.append(f"Dangerous permission in settings: {pattern}")

    return errors, warnings, suggestions


def main():
    """Main entry point."""
    print("🏗️  Checking repository structure...\n")

    errors, warnings, suggestions = check_repository_structure()
    claude_errors, claude_warnings, claude_suggestions = check_claude_configuration()

    errors.extend(claude_errors)
    warnings.extend(claude_warnings)
    suggestions.extend(claude_suggestions)

    # Display results
    if errors:
        print("🔴 ERRORS (must be fixed):")
        for error in errors:
            print(f"  ❌ {error}")
        print()

    if warnings:
        print("🟡 WARNINGS (should be addressed):")
        for warning in warnings:
            print(f"  ⚠️  {warning}")
        print()

    if suggestions:
        print("💡 SUGGESTIONS (optional improvements):")
        for suggestion in suggestions:
            print(f"  ℹ️  {suggestion}")
        print()

    # Summary
    total = len(errors) + len(warnings)
    if total == 0:
        print("✅ Repository structure is valid!")
        sys.exit(0)
    elif errors:
        print(
            f"❌ Repository check failed: {len(errors)} errors, {len(warnings)} warnings"
        )
        sys.exit(1)
    else:
        print(f"⚠️  Repository check passed with {len(warnings)} warnings")
        sys.exit(0)


if __name__ == "__main__":
    main()
