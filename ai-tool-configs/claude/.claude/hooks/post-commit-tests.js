#!/usr/bin/env node

/**
 * Post-commit hook to suggest missing tests
 * Analyzes changed files and suggests test coverage
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get files changed in last commit
const changedFiles = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(f => f);

// Filter to source files (not tests)
const sourceFiles = changedFiles.filter(f =>
  (f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.py')) &&
  !f.includes('.test.') &&
  !f.includes('.spec.') &&
  !f.includes('test_') &&
  !f.includes('__tests__')
);

const suggestions = [];

sourceFiles.forEach(file => {
  // Determine expected test file location
  const ext = path.extname(file);
  const baseName = path.basename(file, ext);
  const dirName = path.dirname(file);

  let testFile;
  if (ext === '.py') {
    testFile = path.join(dirName, `test_${baseName}${ext}`);
  } else {
    testFile = path.join(dirName, `${baseName}.test${ext}`);
  }

  // Also check tests directory
  const testsDir = file.replace(/^src\//, 'tests/');
  const altTestFile = testsDir.replace(ext, `.test${ext}`);

  // Check if test file exists
  if (!fs.existsSync(testFile) && !fs.existsSync(altTestFile)) {
    suggestions.push({
      file,
      suggestedTest: testFile,
      message: `Consider adding tests for ${file}`
    });
  }
});

if (suggestions.length > 0) {
  const output = {
    message: 'Missing test files detected',
    suggestions
  };
  console.log(JSON.stringify(output, null, 2));
}

process.exit(0);
