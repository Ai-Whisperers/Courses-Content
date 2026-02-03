#!/usr/bin/env python3
"""
Link Checker for Courses Content Repository

Scans all markdown files for internal links and verifies they point to existing files.
Reports broken links with file location and line number for easy fixing.

Usage:
    python check-links.py                    # Check all links
    python check-links.py --path courses/    # Check specific directory
    python check-links.py --fix              # Attempt to auto-fix common issues
"""

import os
import re
import sys
from pathlib import Path
from collections import defaultdict
from typing import List, Tuple, Dict

# Configure UTF-8 output for Windows
if sys.platform == "win32":
    import io

    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")


class LinkChecker:
    def __init__(self, root_path: str = "."):
        self.root_path = Path(root_path).resolve()
        self.broken_links = []
        self.checked_files = 0
        self.total_links = 0

    def find_markdown_files(self, search_path: str | None = None) -> List[Path]:
        """Find all markdown files in the given path."""
        if search_path:
            base = Path(search_path)
        else:
            base = self.root_path

        md_files = []
        for path in base.rglob("*.md"):
            # Skip node_modules, .git, and other excluded directories
            if any(
                excluded in path.parts
                for excluded in [".git", "node_modules", ".venv", "__pycache__"]
            ):
                continue
            md_files.append(path)
        return md_files

    def extract_links(
        self, content: str, file_path: Path
    ) -> List[Tuple[int, str, str]]:
        """
        Extract markdown links from content.
        Returns list of (line_number, link_text, link_url) tuples.
        """
        links = []
        lines = content.split("\n")

        # Match markdown links: [text](url)
        link_pattern = re.compile(r"\[([^\]]+)\]\(([^\)]+)\)")

        for line_num, line in enumerate(lines, 1):
            matches = link_pattern.findall(line)
            for text, url in matches:
                # Skip external links (http, https, mailto, etc.)
                if url.startswith(("http://", "https://", "mailto:", "#", "ftp://")):
                    continue
                links.append((line_num, text, url))

        return links

    def resolve_link(self, file_path: Path, link_url: str) -> Tuple[bool, str]:
        """
        Resolve a relative link and check if target exists.
        Returns (exists, resolved_path).
        """
        try:
            # Remove anchor fragments
            link_url = link_url.split("#")[0]

            # Skip empty links (just anchors)
            if not link_url:
                return (True, "anchor-only")

            # Resolve relative to the file's directory
            link_path = (file_path.parent / link_url).resolve()

            # Check if file or directory exists
            exists = link_path.exists()

            return (exists, str(link_path))
        except Exception as e:
            return (False, f"Error resolving: {e}")

    def check_file(self, file_path: Path) -> List[Dict]:
        """Check all links in a single markdown file."""
        broken = []

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            return broken

        links = self.extract_links(content, file_path)
        self.total_links += len(links)

        for line_num, text, url in links:
            exists, resolved = self.resolve_link(file_path, url)

            if not exists:
                broken.append(
                    {
                        "file": str(file_path.relative_to(self.root_path)),
                        "line": line_num,
                        "text": text,
                        "url": url,
                        "resolved": resolved,
                    }
                )

        return broken

    def check_all(self, search_path: str | None = None) -> None:
        """Check all markdown files for broken links."""
        files = self.find_markdown_files(search_path)

        print(f"🔍 Checking {len(files)} markdown files...")
        print()

        for file_path in files:
            self.checked_files += 1
            broken = self.check_file(file_path)
            self.broken_links.extend(broken)

        self.report()

    def report(self) -> None:
        """Print report of broken links."""
        print("\n" + "=" * 80)
        print("LINK CHECK REPORT")
        print("=" * 80)
        print()

        print(f"📊 Statistics:")
        print(f"   Files checked: {self.checked_files}")
        print(f"   Links checked: {self.total_links}")
        print(f"   Broken links:  {len(self.broken_links)}")
        print()

        if not self.broken_links:
            print("✅ All links are valid!")
            return

        # Group by file
        by_file = defaultdict(list)
        for link in self.broken_links:
            by_file[link["file"]].append(link)

        print("❌ Broken Links Found:")
        print()

        for file, links in sorted(by_file.items()):
            print(f"📄 {file}")
            for link in links:
                print(f"   Line {link['line']}: [{link['text']}]({link['url']})")
                print(f"      → Tried: {link['resolved']}")
            print()

        print("=" * 80)
        print(
            f"\n⚠️  Found {len(self.broken_links)} broken links in {len(by_file)} files"
        )
        print("\nTo fix:")
        print("1. Update the markdown files listed above")
        print("2. Run this script again to verify fixes")
        print("3. Commit the changes")

    def suggest_fixes(self) -> Dict[str, List[str]]:
        """Suggest potential fixes for broken links based on common patterns."""
        suggestions = defaultdict(list)

        for link in self.broken_links:
            url = link["url"]

            # Fix: courses -> cursos
            if "courses/" in url:
                fixed = url.replace("courses/", "cursos/")

                # Update subdirectories
                fixed = fixed.replace("01-production", "01-produccion")
                fixed = fixed.replace("02-development", "02-desarrollo")

                # Check if the fixed path exists (optional, but good for confidence)
                suggestions[link["file"]].append(f"  {url} → {fixed}")

            # Fix: TALLERES-VERANO-2026 relocation
            elif "TALLERES-VERANO-2026" in url:
                fixed = url.replace(
                    "TALLERES-VERANO-2026",
                    "cursos/talleres/verano-2026",
                )
                suggestions[link["file"]].append(f"  {url} → {fixed}")

        return suggestions


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="Check markdown files for broken internal links",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python check-links.py                    # Check all links
  python check-links.py --path courses/    # Check specific directory
  python check-links.py --suggest          # Show suggested fixes
        """,
    )
    parser.add_argument("--path", help="Path to check (default: entire repository)")
    parser.add_argument("--suggest", action="store_true", help="Show suggested fixes")

    args = parser.parse_args()

    print()
    print("🔗 Markdown Link Checker")
    print("=" * 80)

    checker = LinkChecker()
    checker.check_all(args.path)

    if args.suggest and checker.broken_links:
        print("\n💡 Suggested Fixes:")
        print("=" * 80)
        suggestions = checker.suggest_fixes()
        for file, fixes in suggestions.items():
            print(f"\n📄 {file}:")
            for fix in fixes:
                print(fix)

    # Exit with error code if broken links found
    sys.exit(1 if checker.broken_links else 0)


if __name__ == "__main__":
    main()
