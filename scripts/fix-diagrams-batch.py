#!/usr/bin/env python3
"""
Batch fix Mermaid diagrams for WCAG AAA compliance
Fixes all 470 diagrams across FPUNA-2026 course content
"""

import re
import os
from pathlib import Path

# WCAG AAA compliant color palette
COLOR_REPLACEMENTS = {
    # Light pastels (WCAG FAIL) → Dark colors (WCAG AAA)
    "#E1F5FF": "#0d47a1",  # baby blue → primary blue
    "#FFF4E1": "#e65100",  # cream → warning orange
    "#FFE1F5": "#4a148c",  # baby pink → accent purple
    "#E1FFE1": "#1b5e20",  # mint green → success green
    "#FFE1E1": "#b71c1c",  # light pink → error red
    "#FFE5E5": "#b71c1c",  # light pink 2 → error red
    "#E5F9E5": "#1b5e20",  # light green 2 → success green
    "#FFB6C1": "#b71c1c",  # light pink 3 → error red
    "#90EE90": "#1b5e20",  # light green 3 → success green
    "#FFD93D": "#e65100",  # yellow → warning orange
    "#4A90E2": "#0d47a1",  # medium blue → primary blue
    "#7B68EE": "#4a148c",  # medium purple → accent purple
    "#F39C12": "#e65100",  # orange → warning orange
    "#1ABC9C": "#1b5e20",  # teal → success green
    "#E74C3C": "#b71c1c",  # red → error red
    "#9B59B6": "#4a148c",  # purple → accent purple
    "#50C878": "#1b5e20",  # emerald → success green
    "#4ECDC4": "#0d47a1",  # cyan → primary blue
    "#95E1D3": "#1b5e20",  # light cyan → success green
    "#F38181": "#b71c1c",  # light red → error red
    "#A8E6CF": "#1b5e20",  # light green 4 → success green
    # Stroke colors
    "#CCB031": "#bf360c",
    "#2E5C8A": "#01579b",
    "#5A4BB5": "#38006b",
    "#D68910": "#bf360c",
    "#16A085": "#0d3d0f",
    "#C0392B": "#7f0000",
    "#7D3C98": "#38006b",
    "#3A9B5C": "#0d3d0f",
    "#CC5555": "#7f0000",
    "#3BA39C": "#01579b",
    "#6FB8AC": "#0d3d0f",
    "#C96666": "#7f0000",
    "#7FC4A0": "#0d3d0f",
}


def add_fontSize_init(mermaid_block):
    """Add fontSize init to mermaid block if missing"""
    if "%%{init:" in mermaid_block:
        return mermaid_block  # Already has init

    lines = mermaid_block.split("\n")
    if len(lines) < 2:
        return mermaid_block

    # Insert after ```mermaid
    init_line = "%%{init: {'theme':'base', 'themeVariables': {'fontSize':'18px'}}}%%"
    lines.insert(1, init_line)
    return "\n".join(lines)


def remove_emoji_from_labels(text):
    """Remove emoji from mermaid node labels while preserving structure"""
    # Pattern: ["emoji<br/>text"] or ["emoji text"]
    # Remove common emoji patterns but keep text

    emoji_patterns = [
        r"👤<br/>",
        r"🤖<br/>",
        r"☁️<br/>",
        r"🚀<br/>",
        r"👨‍💻<br/>",
        r"📊<br/>",
        r"✍️<br/>",
        r"🧪<br/>",
        r"🎯<br/>",
        r"💻<br/>",
        r"🌐<br/>",
        r"📧<br/>",
        r"⏰<br/>",
        r"🎉<br/>",
        r"❌<br/>",
        r"✅<br/>",
        r"❓<br/>",
        r"💬<br/>",
        r"✨<br/>",
        r"🔌<br/>",
        r"🧠<br/>",
        r"⚡<br/>",
        r"📉<br/>",
        r"📊<br/>",
        r"📈<br/>",
        r"🎓<br/>",
        r"🌟<br/>",
        r"💔<br/>",
        r"🤷<br/>",
        r"👍<br/>",
        r"😞<br/>",
        r"📝<br/>",
        r"🌍<br/>",
        r"💡<br/>",
        r"✂️<br/>",
        r"🔄<br/>",
        r"1️⃣<br/>",
        r"2️⃣<br/>",
        r"3️⃣<br/>",
        r"4️⃣<br/>",
        r"5️⃣<br/>",
        r"💭<br/>",
        r"📚<br/>",
        r"🎭<br/>",
        r"👨‍🏫<br/>",
        r"🔍<br/>",
        r"⭐<br/>",
        r"🏗️<br/>",
        r"🐛<br/>",
        r"💎<br/>",
        r"🔗<br/>",
        r"📜<br/>",
        r"🐘<br/>",
        r"☕<br/>",
        r"😕<br/>",
        r"😊<br/>",
        r"🔒<br/>",
        r"⚙️<br/>",
        r"🚫<br/>",
        r"📏<br/>",
        r"🎨<br/>",
        r"🔧<br/>",
        r"🔀<br/>",
        r"⚠️<br/>",
        r"💼<br/>",
        r"⚖️<br/>",
        # Add more as needed
    ]

    for pattern in emoji_patterns:
        text = re.sub(pattern, "", text)

    # Also remove standalone emoji in labels
    # Remove emoji followed by space or at start of label
    emoji_only = [
        r"👤\s+",
        r"🤖\s+",
        r"☁️\s+",
        r"🚀\s+",
        r"👨‍💻\s+",
        r"📊\s+",
        r"✍️\s+",
        r"🧪\s+",
        r"🎯\s+",
        r"💻\s+",
        r"🌐\s+",
        r"📧\s+",
        r"⏰\s+",
        r"🎉\s+",
        r"❌\s+",
        r"✅\s+",
        r"❓\s+",
        r"💬\s+",
        r"✨\s+",
        r"🔌\s+",
        r"🧠\s+",
        r"⚡\s+",
        r"📉\s+",
        r"📈\s+",
        r"🎓\s+",
    ]

    for pattern in emoji_only:
        text = re.sub(pattern, "", text)

    return text


def replace_colors(text):
    """Replace light pastel colors with WCAG AAA compliant colors"""
    for old_color, new_color in COLOR_REPLACEMENTS.items():
        text = text.replace(old_color, new_color)
    return text


def fix_mermaid_diagram(diagram_text):
    """Apply all fixes to a single mermaid diagram"""
    # Add fontSize init
    diagram_text = add_fontSize_init(diagram_text)

    # Remove emoji
    diagram_text = remove_emoji_from_labels(diagram_text)

    # Replace colors
    diagram_text = replace_colors(diagram_text)

    return diagram_text


def process_file(file_path):
    """Process a single markdown file"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return 0

    # Find all mermaid blocks
    pattern = r"(```mermaid\n.*?```)"
    matches = list(re.finditer(pattern, content, re.DOTALL))

    if not matches:
        return 0

    # Process each diagram
    fixed_content = content
    diagrams_fixed = 0

    for match in reversed(matches):  # Reverse to maintain positions
        original = match.group(1)
        fixed = fix_mermaid_diagram(original)

        if original != fixed:
            fixed_content = (
                fixed_content[: match.start()] + fixed + fixed_content[match.end() :]
            )
            diagrams_fixed += 1

    # Write back if changes made
    if diagrams_fixed > 0:
        try:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(fixed_content)
            print(f"[OK] Fixed {diagrams_fixed} diagrams in {file_path.name}")
        except Exception as e:
            print(f"[ERROR] Error writing {file_path}: {e}")
            return 0

    return diagrams_fixed


def main():
    """Main execution"""
    # Use raw string path without emoji in print statements
    base_dir_str = "C:/Users/Alejandro/Documents/Ivan/Work/Courses Content/courses/🟡-development/FPUNA-2026"
    base_dir = Path(base_dir_str)

    if not base_dir.exists():
        print("[ERROR] Directory not found")
        return

    print("Starting batch diagram fixes...")
    print(f"Base directory: FPUNA-2026")
    print()

    # Find all markdown files
    md_files = list(base_dir.rglob("*.md"))
    print(f"Found {len(md_files)} markdown files")
    print()

    total_fixed = 0
    files_modified = 0

    for md_file in md_files:
        fixed = process_file(md_file)
        if fixed > 0:
            total_fixed += fixed
            files_modified += 1

    print()
    print("=" * 60)
    print(f"COMPLETE!")
    print(f"Files modified: {files_modified}/{len(md_files)}")
    print(f"Total diagrams fixed: {total_fixed}")
    print("=" * 60)


if __name__ == "__main__":
    main()
