#!/usr/bin/env python3
"""
🔒 Protected Files Guardian
Prevents accidental modification of protected/sensitive files.
Used by: pre-commit hook 'protected-files'

Enterprise-grade file protection system.
"""

import sys
import os
from pathlib import Path
from typing import List, Tuple

# Files and patterns that should never be modified directly
PROTECTED_PATTERNS = [
    # Credentials and secrets
    ".env",
    ".env.*",
    "*.pem",
    "*.key",
    "id_rsa*",
    "id_ed25519*",
    "*.p12",
    "*.pfx",
    "credentials.json",
    "secrets.json",
    "**/kaggle.json",
    "**/.aws/credentials",
    "**/.ssh/*",
    # Claude sensitive files
    ".claude/settings.local.json",
    "**/.claude/settings.local.json",
    # Generated files that shouldn't be edited
    "package-lock.json",
    "yarn.lock",
    "poetry.lock",
    "Pipfile.lock",
    "*.min.js",
    "*.min.css",
    # Critical project files (require special process)
    "LICENSE",
    "CODE_OF_CONDUCT.md",
    "SECURITY.md",
    # Database and data files
    "*.db",
    "*.sqlite",
    "*.sqlite3",
]

# Files that require explicit approval
RESTRICTED_FILES = [
    "README.md",  # Changes affect project public face
    "pyproject.toml",  # Changes affect dependencies/build
    "requirements.txt",
    "setup.py",
    ".gitignore",
    ".github/workflows/*.yml",
]

# Warning files (allowed but with warning)
WARNING_FILES = [
    "*.log",
    "*.tmp",
    "*.cache",
    "__pycache__/",
]


def check_protected_files(
    filenames: List[str],
) -> Tuple[List[str], List[str], List[str]]:
    """
    Check files against protection rules.

    Returns:
        Tuple of (blocked, restricted, warnings)
    """
    blocked = []
    restricted = []
    warnings = []

    for filename in filenames:
        filepath = Path(filename)

        # Check protected patterns
        for pattern in PROTECTED_PATTERNS:
            if pattern.startswith("**/"):
                # Match anywhere in path
                if filepath.match(pattern[3:]) or any(
                    p.match(pattern[3:]) for p in filepath.parents
                ):
                    blocked.append(filename)
                    break
            elif filepath.match(pattern) or filename.endswith(pattern):
                blocked.append(filename)
                break

        # Check restricted files
        if filename in RESTRICTED_FILES or any(
            filename.endswith(f) for f in RESTRICTED_FILES if f.startswith("*")
        ):
            restricted.append(filename)

        # Check warning files
        for pattern in WARNING_FILES:
            if filepath.match(pattern):
                warnings.append(filename)
                break

    return blocked, restricted, warnings


def main():
    """Main entry point."""
    # Get staged files from arguments
    staged_files = sys.argv[1:]

    if not staged_files:
        print("✅ No files to check")
        sys.exit(0)

    blocked, restricted, warnings = check_protected_files(staged_files)

    exit_code = 0

    # Block protected files
    if blocked:
        print("\n" + "=" * 70)
        print("🚫 PROTECTED FILES - COMMIT BLOCKED")
        print("=" * 70)
        print("\nThe following files are PROTECTED and cannot be committed:\n")
        for f in blocked:
            print(f"  ❌ {f}")
        print("\nThese files may contain:")
        print("  • Credentials, API keys, or secrets")
        print("  • Private keys or certificates")
        print("  • Sensitive configuration")
        print("  • Generated files that shouldn't be versioned")
        print("\n💡 If you need to modify these files:")
        print("  1. Check if they should be in .gitignore")
        print("  2. Use environment variables or secrets management")
        print("  3. Contact the security team if this is intentional")
        print("=" * 70 + "\n")
        exit_code = 1

    # Warn about restricted files
    if restricted:
        print("\n" + "⚠️" * 23)
        print("⚠️  RESTRICTED FILES - REQUIRES CAUTION")
        print("⚠️" * 23)
        print("\nThe following files have RESTRICTED status:\n")
        for f in restricted:
            print(f"  ⚠️  {f}")
        print("\nThese files affect:")
        print("  • Project public documentation")
        print("  • Build and dependency configuration")
        print("  • CI/CD workflows")
        print("\n💡 Please ensure:")
        print("  • Changes are intentional and tested")
        print("  • Documentation is updated if needed")
        print("  • Team is notified of significant changes")
        print("⚠️" * 23 + "\n")
        # Don't block, but warn

    # Warn about temporary files
    if warnings:
        print("\n📎 Temporary/Generated Files Detected:")
        for f in warnings:
            print(f"  📎 {f}")
        print("\nConsider adding these to .gitignore if not already there.\n")

    if exit_code == 0 and not blocked:
        if restricted or warnings:
            print("✅ Protected files check passed (with warnings above)")
        else:
            print("✅ Protected files check passed")

    sys.exit(exit_code)


if __name__ == "__main__":
    main()
