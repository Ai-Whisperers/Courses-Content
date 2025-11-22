#!/bin/bash
# sync-ai-context.sh

# Source of truth
SOURCE="CLAUDE.md"

if [ ! -f "$SOURCE" ]; then
    echo "Error: Source file $SOURCE not found."
    exit 1
fi

echo "Syncing context from $SOURCE..."

# Sync to Gemini
if [ -f "GEMINI.md" ]; then
    cp "$SOURCE" GEMINI.md
    echo "Updated GEMINI.md"
fi

# Sync to Cursor Rules
if [ -d ".cursor/rules" ]; then
    # Extract Coding Standards section for Cursor
    # This is a simple extraction, might need adjustment based on actual file structure
    sed -n '/## Coding Standards/,/##/p' "$SOURCE" | sed '$d' > .cursor/rules/standards.mdc
    echo "Updated .cursor/rules/standards.mdc"
fi

echo "Sync complete."
