#!/bin/bash
# Script to update broken links after repository restructuring
# This updates old paths to new status-based structure

echo "Updating repository links to new structure..."

# Define path replacements
declare -A path_map=(
    ["courses/Technical-Development/QA-Automation-with-AI"]="courses/🟢-production/QA-Automation-with-AI"
    ["courses/Business-Professional/Prompt-Engineering-Masterclass"]="courses/🟢-production/Prompt-Engineering-Masterclass"
    ["courses/Summer-Courses-University/FPUNA-2026"]="courses/🟡-development/FPUNA-2026"
    ["courses/Business-Professional/AI-Tools-for-Productivity"]="courses/🔵-beta/AI-Tools-for-Productivity"
    ["courses/Technical-Development/Building-AI-Powered-Applications"]="courses/🔵-beta/Building-AI-Powered-Applications"
    ["courses/Building-AI-Powered-Applications"]="courses/🔵-beta/Building-AI-Powered-Applications-v2"
    ["courses/Business-Professional/Introduction-to-AI-for-Business-Professionals"]="courses/⚪-planning/Introduction-to-AI-for-Business-Professionals"
    ["courses/Business-Professional/AI-Ethics-and-Governance"]="courses/⚪-planning/AI-Ethics-and-Governance"
    ["courses/Technical-Development/AI-Assisted-Software-Development"]="courses/⚪-planning/AI-Assisted-Software-Development"
    ["courses/Technical-Development/QA-Automation-with-AI-Advanced"]="courses/⚪-planning/QA-Automation-with-AI-Advanced"
    ["courses/Technical-Development/MentorMate-QA-Automation"]="courses/⚪-planning/MentorMate-QA-Automation"
    ["courses/Team-Specific/AI-for-Marketing-Teams"]="courses/⚪-planning/AI-for-Marketing-Teams"
    ["courses/Team-Specific/AI-for-Sales-Teams"]="courses/⚪-planning/AI-for-Sales-Teams"
    ["courses/Team-Specific/AI-for-Customer-Service-Teams"]="courses/⚪-planning/AI-for-Customer-Service-Teams"
)

# Find all markdown files
find . -name "*.md" -type f | while read -r file; do
    # Skip if file doesn't exist or is in .git
    if [[ ! -f "$file" ]] || [[ "$file" == *".git"* ]]; then
        continue
    fi
    
    modified=false
    
    # Check each path mapping
    for old_path in "${!path_map[@]}"; do
        new_path="${path_map[$old_path]}"
        
        # Check if file contains the old path
        if grep -q "$old_path" "$file" 2>/dev/null; then
            echo "  Updating: $file"
            # Use sed to replace (macOS/Linux compatible)
            if [[ "$OSTYPE" == "darwin"* ]]; then
                sed -i '' "s|$old_path|$new_path|g" "$file"
            else
                sed -i "s|$old_path|$new_path|g" "$file"
            fi
            modified=true
        fi
    done
    
    if [ "$modified" = true ]; then
        echo "    ✓ Updated $file"
    fi
done

echo ""
echo "✅ Link update complete!"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Test a few links manually"
echo "3. Commit: git add . && git commit -m 'fix: update internal links to new structure'"
