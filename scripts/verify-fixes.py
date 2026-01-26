#!/usr/bin/env python3
"""Verify diagram fixes"""

from pathlib import Path
import re

base_dir = Path("courses/🟡-development/FPUNA-2026")
md_files = list(base_dir.rglob("*.md"))

total_diagrams = 0
diagrams_with_fontSize = 0
files_with_diagrams = 0

for md_file in md_files:
    try:
        content = md_file.read_text(encoding="utf-8")
        diagrams = re.findall(r"```mermaid\n.*?```", content, re.DOTALL)

        if diagrams:
            files_with_diagrams += 1
            total_diagrams += len(diagrams)

            for diagram in diagrams:
                if "%%{init:" in diagram and "fontSize" in diagram:
                    diagrams_with_fontSize += 1
    except:
        pass

print("=" * 60)
print("VERIFICATION RESULTS")
print("=" * 60)
print(f"Files with diagrams: {files_with_diagrams}")
print(f"Total diagrams found: {total_diagrams}")
print(f"Diagrams with fontSize: {diagrams_with_fontSize}")
print(
    f"Compliance rate: {diagrams_with_fontSize / total_diagrams * 100:.1f}%"
    if total_diagrams > 0
    else "N/A"
)
print("=" * 60)
