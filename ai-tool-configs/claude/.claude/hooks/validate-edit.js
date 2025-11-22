#!/usr/bin/env node

/**
 * Pre-edit hook to validate file modifications
 * Blocks edits to sensitive files
 */

const fs = require('fs');

let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const filePath = data.tool_input?.file_path || '';

    // Block sensitive files
    const blockedPatterns = [
      '.env',
      'credentials',
      'secrets',
      '.pem',
      '.key',
      'package-lock.json',
      'yarn.lock'
    ];

    for (const pattern of blockedPatterns) {
      if (filePath.toLowerCase().includes(pattern)) {
        console.error(`Cannot edit sensitive file: ${filePath}`);
        process.exit(2); // Block the action
      }
    }

    // Allow the action
    process.exit(0);
  } catch (error) {
    console.error('Hook error:', error.message);
    process.exit(1);
  }
});
