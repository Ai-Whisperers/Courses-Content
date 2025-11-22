#!/usr/bin/env node

/**
 * Coverage validation hook
 * Ensures test coverage meets thresholds
 */

const fs = require('fs');
const path = require('path');

// Coverage thresholds
const THRESHOLDS = {
  lines: 80,
  branches: 75,
  functions: 80,
  statements: 80
};

// Look for coverage report
const coveragePaths = [
  'coverage/coverage-summary.json',
  'coverage/lcov-report/index.json',
  '.nyc_output/coverage-summary.json'
];

let coverageData = null;
let coveragePath = null;

for (const p of coveragePaths) {
  if (fs.existsSync(p)) {
    coveragePath = p;
    try {
      coverageData = JSON.parse(fs.readFileSync(p, 'utf-8'));
      break;
    } catch (e) {
      // Try next path
    }
  }
}

if (!coverageData) {
  console.log('No coverage data found. Run tests with coverage first.');
  console.log('Checked paths:', coveragePaths.join(', '));
  process.exit(0); // Don't block if no coverage data
}

// Get total coverage
const total = coverageData.total || coverageData;

const results = {
  passed: true,
  metrics: {}
};

// Check each metric
for (const [metric, threshold] of Object.entries(THRESHOLDS)) {
  if (total[metric]) {
    const value = total[metric].pct;
    const passed = value >= threshold;

    results.metrics[metric] = {
      value: value.toFixed(2),
      threshold,
      passed
    };

    if (!passed) {
      results.passed = false;
    }
  }
}

console.log('Coverage Report:');
console.log(JSON.stringify(results, null, 2));

if (!results.passed) {
  console.error('\nCoverage below thresholds!');
  process.exit(2); // Block the action
}

console.log('\nCoverage check passed!');
process.exit(0);
