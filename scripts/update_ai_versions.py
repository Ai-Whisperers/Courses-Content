#!/usr/bin/env python3
"""Update AI tool versions across documentation files."""

import re
from pathlib import Path

def update_file(file_path, replacements):
    """Apply replacements to a file."""
    print(f"Updating: {file_path}")

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    for old, new in replacements:
        content = content.replace(old, new)

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  [OK] Updated {file_path.name}")
        return True
    else:
        print(f"  [-] No changes needed in {file_path.name}")
        return False

def main():
    base_path = Path("C:/Users/kyrian/Documents/Courses-Content")

    # Define replacements
    replacements = [
        # Claude AI versions
        (
            "Available models:\n- `sonnet` - Claude Sonnet (recommended, balanced)\n- `opus` - Claude Opus (complex reasoning)\n- `haiku` - Claude Haiku (fast, lightweight)",
            "Available models (as of November 2025):\n- `sonnet` - Claude Sonnet 4.5 (released Sept 2025, best coding model)\n- `opus` - Claude Opus 4.1 (released Aug 2025, complex reasoning, agentic tasks)\n- `haiku` - Claude Haiku 4.5 (released Oct 2025, fast, lightweight, cost-effective)"
        ),

        # Gemini versions
        (
            "Available models:\n- `gemini-2-5-pro` - Best for complex reasoning\n- `gemini-2-5-flash` - Best price-performance",
            "Available models (as of November 2025):\n- `gemini-2-5-flash` - Latest model (2025), best overall performance\n- `gemini-2-0-flash` - Production-ready (GA Feb 2025), 1M context\n- `gemini-2-0-pro` - Experimental, strongest reasoning, 2M context"
        ),

        # Playwright version
        (
            'Specify the library version (e.g., "Use Playwright v1.40+").',
            'Specify the library version (e.g., "Use Playwright v1.56+").'
        ),

        # Multimodal models
        (
            "*Note: Requires Multimodal models like GPT-4o or Gemini 1.5 Pro.*",
            "*Note: Requires Multimodal models like GPT-4o, Claude Sonnet 4.5, or Gemini 2.0 Flash.*"
        ),

        # Update dates
        (
            "**Last Updated:** November 2024",
            "**Last Updated:** November 2025"
        ),
        (
            "**Next Review:** January 2025",
            "**Next Review:** February 2026"
        ),
    ]

    # Files to update
    files_to_update = [
        base_path / "QA-Automation-with-AI/resources/ai-tools-configuration-guide.md",
        base_path / "QA-Automation-with-AI/AI_QA_GUIDE.md",
        base_path / "MentorMate-QA-Automation/ai-integration/README.md",
        base_path / "MentorMate-QA-Automation/ai-integration/resources/ai-tools-configuration-guide.md",
    ]

    updated_count = 0
    for file_path in files_to_update:
        if file_path.exists():
            if update_file(file_path, replacements):
                updated_count += 1
        else:
            print(f"  [WARN] File not found: {file_path}")

    print(f"\n[DONE] Updated {updated_count} files")

if __name__ == "__main__":
    main()
