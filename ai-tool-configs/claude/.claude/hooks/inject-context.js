#!/usr/bin/env node

/**
 * User prompt hook to inject additional context
 * Adds reminders and project-specific information
 */

const fs = require('fs');

let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);

    // Output context to inject (appears as system message)
    const context = {
      additionalContext: `
Remember:
- Run tests before committing
- Use AAA pattern for tests
- Follow Page Object Model for E2E
- Keep coverage above 80%
      `.trim()
    };

    console.log(JSON.stringify(context));
    process.exit(0);
  } catch (error) {
    console.error('Hook error:', error.message);
    process.exit(1);
  }
});
