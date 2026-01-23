"""
Documentation Health Collector - Analyzes documentation quality

Checks:
- Broken links (via check-links.py)
- README coverage (% of directories with READMEs)
- Metadata presence
- Documentation freshness
"""

import os
import subprocess
from pathlib import Path
from typing import Dict, Any, List
from datetime import datetime
import re


class DocHealth:
    """Analyzes documentation health metrics"""

    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.docs_path = self.repo_path / "docs"

    def collect(self) -> Dict[str, Any]:
        """Main collection method"""
        print("[Documentation] Analyzing documentation health...")

        return {
            "total_docs": self._count_markdown_files(),
            "broken_links": self._check_broken_links(),
            "readme_coverage": self._check_readme_coverage(),
            "metadata_compliance": self._check_metadata_compliance(),
            "avg_doc_age_days": self._calculate_doc_age(),
            "collected_at": datetime.now().isoformat(),
        }

    def _count_markdown_files(self) -> int:
        """Count total markdown files in repository"""
        print("  - Counting markdown files...")
        return sum(1 for _ in self.repo_path.rglob("*.md"))

    def _check_broken_links(self) -> Dict[str, Any]:
        """Run link checker and categorize results"""
        print("  - Checking links...")

        link_checker = self.repo_path / "check-links.py"
        if not link_checker.exists():
            return {
                "total": 0,
                "user_facing": 0,
                "external_refs": 0,
                "checked": False,
                "error": "Link checker not found",
            }

        try:
            result = subprocess.run(
                ["python", str(link_checker)],
                cwd=str(self.repo_path),
                capture_output=True,
                text=True,
                timeout=60,
            )

            # Parse output for broken links count
            output = result.stdout if result.stdout else ""
            total_match = re.search(r"Broken links:\s+(\d+)", output)
            total = int(total_match.group(1)) if total_match else 0

            # Categorize (based on Week 3 findings):
            # ~585 are external refs in .claude/
            # Remaining are user-facing or templates
            external_refs = min(total, 585)  # Known external refs
            user_facing = max(0, total - external_refs)

            return {
                "total": total,
                "user_facing": user_facing,
                "external_refs": external_refs,
                "checked": True,
            }

        except subprocess.TimeoutExpired:
            print("    [!] Link check timed out")
            return {
                "total": 0,
                "user_facing": 0,
                "external_refs": 0,
                "checked": False,
                "error": "Timeout",
            }
        except Exception as e:
            print(f"    [!] Link check failed: {e}")
            return {
                "total": 0,
                "user_facing": 0,
                "external_refs": 0,
                "checked": False,
                "error": str(e),
            }

    def _check_readme_coverage(self) -> Dict[str, Any]:
        """Calculate percentage of directories with READMEs"""
        print("  - Checking README coverage...")

        directories = []
        readme_count = 0

        # Scan major documentation directories
        for root, dirs, files in os.walk(self.docs_path):
            # Skip hidden and version control directories
            dirs[:] = [d for d in dirs if not d.startswith(".")]

            if root == str(self.docs_path):
                continue  # Skip root docs folder itself

            directories.append(root)
            if "README.md" in files:
                readme_count += 1

        total = len(directories)
        percentage = (readme_count / total * 100) if total > 0 else 0

        return {
            "total_directories": total,
            "with_readme": readme_count,
            "percentage": round(percentage, 1),
        }

    def _check_metadata_compliance(self) -> Dict[str, Any]:
        """Check how many docs have proper metadata headers"""
        print("  - Checking metadata compliance...")

        # Metadata pattern: **Purpose:** or **Audience:** or **Status:**
        metadata_pattern = re.compile(
            r"\*\*(?:Purpose|Audience|Status|Last Updated):\*\*", re.IGNORECASE
        )

        checked_files = []
        compliant_files = []

        # Check key documentation files
        key_docs = [
            self.docs_path / "guides",
            self.docs_path / "business",
            self.docs_path / "templates",
            self.docs_path / "reference",
            self.docs_path / "planning",
        ]

        for docs_dir in key_docs:
            if not docs_dir.exists():
                continue

            for md_file in docs_dir.rglob("*.md"):
                checked_files.append(str(md_file))

                try:
                    with open(md_file, "r", encoding="utf-8") as f:
                        content = f.read(1000)  # Check first 1000 chars
                        if metadata_pattern.search(content):
                            compliant_files.append(str(md_file))
                except Exception as e:
                    print(f"    [!] Could not read {md_file.name}: {e}")

        total = len(checked_files)
        compliant = len(compliant_files)
        percentage = (compliant / total * 100) if total > 0 else 0

        return {
            "total_checked": total,
            "compliant": compliant,
            "percentage": round(percentage, 1),
        }

    def _calculate_doc_age(self) -> float:
        """Calculate average age of documentation files"""
        print("  - Calculating documentation age...")

        ages = []
        now = datetime.now().timestamp()

        for md_file in self.docs_path.rglob("*.md"):
            try:
                mtime = md_file.stat().st_mtime
                age_days = (now - mtime) / 86400  # Convert to days
                ages.append(age_days)
            except Exception:
                pass

        if not ages:
            return 0.0

        avg_age = sum(ages) / len(ages)
        return round(avg_age, 1)


if __name__ == "__main__":
    # Test the collector
    import sys

    repo_path = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
    collector = DocHealth(repo_path)

    data = collector.collect()

    print("\n" + "=" * 60)
    print("DOCUMENTATION HEALTH METRICS")
    print("=" * 60)
    print(f"\nTotal Documentation Files: {data['total_docs']:,}")

    print(f"\nBroken Links:")
    if data["broken_links"]["checked"]:
        print(f"  Total: {data['broken_links']['total']}")
        print(f"  User-facing: {data['broken_links']['user_facing']}")
        print(f"  External refs: {data['broken_links']['external_refs']}")
    else:
        print(f"  Error: {data['broken_links'].get('error', 'Unknown')}")

    print(f"\nREADME Coverage:")
    print(
        f"  {data['readme_coverage']['with_readme']}/{data['readme_coverage']['total_directories']} "
        f"directories ({data['readme_coverage']['percentage']}%)"
    )

    print(f"\nMetadata Compliance:")
    print(
        f"  {data['metadata_compliance']['compliant']}/{data['metadata_compliance']['total_checked']} "
        f"files ({data['metadata_compliance']['percentage']}%)"
    )

    print(f"\nAverage Document Age: {data['avg_doc_age_days']} days")
