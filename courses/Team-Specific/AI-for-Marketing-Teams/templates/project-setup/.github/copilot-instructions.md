# GitHub Copilot Instructions for Marketing Projects

## Project Context

This is a marketing content project. Code suggestions should focus on:
- Marketing automation scripts
- Content management utilities
- Data analysis tools
- Template processing

## Coding Standards

### JavaScript/TypeScript
- Use ES6+ syntax
- Prefer async/await over callbacks
- Document functions with JSDoc comments
- Use meaningful variable names

### Python
- Follow PEP 8 guidelines
- Use type hints where appropriate
- Document with docstrings
- Prefer f-strings for formatting

## Marketing-Specific Guidelines

### Content Processing
When working with marketing content:
```javascript
// Include metadata for tracking
const contentMetadata = {
  type: 'blog|social|email',
  author: 'string',
  created: 'ISO date',
  keywords: ['array'],
  status: 'draft|review|published'
};
```

### Data Analysis
For marketing analytics:
```python
# Standard metrics to track
metrics = {
    'engagement': ['views', 'clicks', 'shares'],
    'conversion': ['leads', 'sales', 'revenue'],
    'efficiency': ['cost_per_lead', 'roi', 'time_saved']
}
```

### API Integrations
Common marketing tool integrations:
- Email: SendGrid, Mailchimp, HubSpot
- Social: Buffer, Hootsuite, Later
- Analytics: Google Analytics, Mixpanel
- CRM: HubSpot, Salesforce

## File Patterns

### Content Files
```
content/
├── blog/
│   └── YYYY-MM-DD-slug.md
├── social/
│   └── platform/YYYY-MM/batch-N.md
└── email/
    └── campaign-name/sequence-N.md
```

### Data Files
```
data/
├── campaigns/
│   └── campaign-name.json
├── analytics/
│   └── YYYY-MM-report.csv
└── audiences/
    └── segment-name.json
```

## Code Suggestions

### Prefer
- Modular, reusable functions
- Clear error handling
- Logging for debugging
- Configuration over hardcoding

### Avoid
- Inline credentials
- Magic numbers without constants
- Deeply nested callbacks
- Overly complex one-liners

## Template Processing

When generating content from templates:
```javascript
// Template variable format
const template = `
Hello {{firstName}},

{{customMessage}}

Best,
{{senderName}}
`;

// Replace function
function processTemplate(template, variables) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    variables[key] || `{{${key}}}`
  );
}
```

## Analytics Functions

Standard analytics calculations:
```python
def calculate_ctr(clicks: int, impressions: int) -> float:
    """Calculate click-through rate."""
    if impressions == 0:
        return 0.0
    return (clicks / impressions) * 100

def calculate_roi(revenue: float, cost: float) -> float:
    """Calculate return on investment."""
    if cost == 0:
        return 0.0
    return ((revenue - cost) / cost) * 100
```

## Security Considerations

### Never suggest
- Hardcoded API keys
- Unencrypted sensitive data
- Insecure HTTP connections
- SQL without parameterization

### Always suggest
- Environment variables for secrets
- HTTPS for external calls
- Input validation
- Error handling for external APIs

## Documentation

Include comments for:
- Function purpose and parameters
- Complex business logic
- Integration points
- Configuration options

## Testing Patterns

For marketing tools, include tests for:
- Template rendering
- Data transformations
- API response handling
- Edge cases (empty data, missing fields)

```javascript
// Example test structure
describe('ContentProcessor', () => {
  test('should replace template variables', () => {
    const template = 'Hello {{name}}';
    const result = processTemplate(template, { name: 'World' });
    expect(result).toBe('Hello World');
  });
});
```

## Common Imports

```javascript
// Node.js marketing utilities
const fs = require('fs').promises;
const path = require('path');
const csv = require('csv-parse');
const marked = require('marked');
```

```python
# Python marketing utilities
import pandas as pd
import json
from datetime import datetime
from pathlib import Path
```

---

*These instructions help Copilot provide relevant suggestions for marketing automation projects.*
