#!/usr/bin/env node

/**
 * Pre-push hook to scan for security issues
 * Blocks push if secrets or vulnerabilities detected
 */

const { execSync } = require('child_process');
const fs = require('fs');

// Patterns that indicate secrets
const secretPatterns = [
  /api[_-]?key\s*[:=]\s*['"][^'"]{20,}['"]/gi,
  /secret[_-]?key\s*[:=]\s*['"][^'"]{20,}['"]/gi,
  /password\s*[:=]\s*['"][^'"]{8,}['"]/gi,
  /token\s*[:=]\s*['"][^'"]{20,}['"]/gi,
  /aws[_-]?access[_-]?key[_-]?id\s*[:=]\s*['"][A-Z0-9]{20}['"]/gi,
  /aws[_-]?secret[_-]?access[_-]?key\s*[:=]\s*['"][^'"]{40}['"]/gi,
  /private[_-]?key\s*[:=]\s*['"]-----BEGIN/gi,
  /ghp_[a-zA-Z0-9]{36}/g,  // GitHub Personal Access Token
  /gho_[a-zA-Z0-9]{36}/g,  // GitHub OAuth Token
  /glpat-[a-zA-Z0-9\-]{20}/g,  // GitLab Personal Access Token
];

// Get files to check (staged for push)
const files = execSync('git diff --name-only origin/main...HEAD', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .filter(f => f && !f.includes('node_modules') && !f.includes('.git'));

const issues = [];

files.forEach(file => {
  if (!fs.existsSync(file)) return;

  try {
    const content = fs.readFileSync(file, 'utf-8');

    secretPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        issues.push({
          file,
          type: 'secret',
          pattern: pattern.toString(),
          count: matches.length
        });
      }
    });

    // Check for console.log with sensitive data
    if (/console\.log\(.*(?:password|token|secret|key)/gi.test(content)) {
      issues.push({
        file,
        type: 'logging',
        message: 'Logging potentially sensitive data'
      });
    }

  } catch (error) {
    // Skip binary files
  }
});

if (issues.length > 0) {
  console.error('Security issues detected:');
  console.error(JSON.stringify(issues, null, 2));
  process.exit(2); // Block the push
}

console.log('Security scan passed');
process.exit(0);
