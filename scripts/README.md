# Scripts Directory

Maintenance and utility scripts for the Courses Content repository.

## Available Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `audit-docs.py` | Audit documentation quality | `python audit-docs.py` |
| `check-links.py` | Check for broken markdown links | `python check-links.py` |
| `find-redundancies.py` | Find redundant/duplicate files | `python find-redundancies.py` |
| `fix-diagrams-batch.py` | Fix Mermaid diagrams for WCAG compliance | `python fix-diagrams-batch.py` |
| `update_ai_versions.py` | Update AI tool version references | `python update_ai_versions.py` |
| `verify-fixes.py` | Verify applied fixes | `python verify-fixes.py` |
| `update-links.sh` | Batch update links (Bash) | `./update-links.sh` |

## Running Scripts

All scripts should be run from the repository root:

```bash
cd "Courses Content"
python scripts/check-links.py
```

## Requirements

Most scripts require Python 3.8+ and have no external dependencies beyond the standard library.
