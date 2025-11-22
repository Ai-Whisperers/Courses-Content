#!/usr/bin/env node

/**
 * Conventional commits validation hook
 * Ensures commit messages follow conventional format
 */

const fs = require('fs');

let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);

    // Only check for git commit operations
    if (data.tool_name !== 'Bash' || !data.tool_input?.command?.includes('git commit')) {
      process.exit(0);
      return;
    }

    // Extract commit message
    const command = data.tool_input.command;
    const messageMatch = command.match(/-m\s+["']([^"']+)["']/);

    if (!messageMatch) {
      process.exit(0); // No message flag found
      return;
    }

    const message = messageMatch[1];

    // Conventional commit pattern
    const conventionalPattern = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?: .{1,72}/;

    if (!conventionalPattern.test(message)) {
      console.error('Commit message does not follow conventional format.');
      console.error('');
      console.error('Expected format: type(scope): description');
      console.error('');
      console.error('Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert');
      console.error('');
      console.error('Examples:');
      console.error('  feat(auth): add login functionality');
      console.error('  fix(api): resolve null pointer in user service');
      console.error('  test: add unit tests for order service');
      console.error('');
      console.error(`Your message: "${message}"`);

      process.exit(2); // Block the commit
    }

    // Check message length
    const firstLine = message.split('\n')[0];
    if (firstLine.length > 72) {
      console.error(`Commit message first line too long (${firstLine.length} > 72 chars)`);
      process.exit(2);
    }

    process.exit(0);
  } catch (error) {
    console.error('Hook error:', error.message);
    process.exit(1);
  }
});
