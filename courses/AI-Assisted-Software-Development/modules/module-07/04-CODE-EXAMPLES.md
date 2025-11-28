# Module 7: Code Examples
## Security & Best Practices

---

## Overview

This document contains code examples for implementing secure AI-assisted development practices, including security scanning, quality gates, and productivity tracking.

---

## Example 1: ESLint Security Configuration

### Secure ESLint Configuration

```javascript
// .eslintrc.security.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'security',
    'no-secrets',
    'xss',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
  ],
  rules: {
    // Prevent hardcoded secrets
    'no-secrets/no-secrets': ['error', {
      tolerance: 4.5,
      additionalRegexes: {
        'AWS Key': /AKIA[0-9A-Z]{16}/,
        'Stripe Key': /sk_live_[0-9a-zA-Z]{24}/,
        'GitHub Token': /ghp_[0-9a-zA-Z]{36}/,
        'JWT Secret': /jwt[_-]?secret/i,
      },
    }],

    // SQL Injection prevention
    'security/detect-sql-literal-injection': 'error',

    // Object injection prevention
    'security/detect-object-injection': 'warn',

    // Eval prevention
    'security/detect-eval-with-expression': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',

    // Prototype pollution prevention
    'security/detect-no-csrf-before-method-override': 'error',

    // File system security
    'security/detect-non-literal-fs-filename': 'warn',

    // Child process security
    'security/detect-child-process': 'warn',

    // RegEx DoS prevention
    'security/detect-unsafe-regex': 'error',

    // Buffer security
    'security/detect-buffer-noassert': 'error',
    'security/detect-new-buffer': 'error',

    // XSS prevention
    'xss/no-mixed-html': 'error',
    'xss/no-location-href-assign': 'error',

    // TypeScript specific
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',

    // General best practices
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
  },
  overrides: [
    {
      // Relaxed rules for test files
      files: ['**/*.test.ts', '**/*.spec.ts', '**/test/**'],
      rules: {
        'security/detect-object-injection': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
```

### Example Violations and Fixes

```typescript
// ❌ INSECURE: Hardcoded secrets
const API_KEY = 'sk_live_abc123xyz789';
const JWT_SECRET = 'my-super-secret-key';

// ✅ SECURE: Environment variables
const API_KEY = process.env.API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

// ❌ INSECURE: SQL injection vulnerable
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ SECURE: Parameterized query
const query = 'SELECT * FROM users WHERE id = $1';
const result = await db.query(query, [userId]);

// ❌ INSECURE: eval usage
const result = eval(userInput);

// ✅ SECURE: Safe parsing
const result = JSON.parse(userInput);

// ❌ INSECURE: Object injection
const value = obj[userKey];

// ✅ SECURE: Validated access
const allowedKeys = ['name', 'email', 'role'];
if (allowedKeys.includes(userKey)) {
  const value = obj[userKey];
}
```

---

## Example 2: Secret Detection Pre-Commit Hook

### Complete Pre-Commit Configuration

```javascript
// scripts/pre-commit-checks.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Secret patterns to detect
const SECRET_PATTERNS = [
  { name: 'AWS Access Key', pattern: /AKIA[0-9A-Z]{16}/ },
  { name: 'AWS Secret Key', pattern: /[A-Za-z0-9/+=]{40}/ },
  { name: 'GitHub Token', pattern: /gh[pousr]_[A-Za-z0-9_]{36,}/ },
  { name: 'Stripe Secret Key', pattern: /sk_live_[0-9a-zA-Z]{24,}/ },
  { name: 'Stripe Publishable Key', pattern: /pk_live_[0-9a-zA-Z]{24,}/ },
  { name: 'Slack Token', pattern: /xox[baprs]-[0-9A-Za-z-]+/ },
  { name: 'Private Key', pattern: /-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/ },
  { name: 'Generic API Key', pattern: /api[_-]?key[_-]?=\s*['"][^'"]+['"]/i },
  { name: 'Generic Secret', pattern: /secret[_-]?=\s*['"][^'"]+['"]/i },
  { name: 'Password', pattern: /password[_-]?=\s*['"][^'"]+['"]/i },
  { name: 'JWT Secret', pattern: /jwt[_-]?secret\s*[:=]\s*['"][^'"]+['"]/i },
  { name: 'Database URL', pattern: /postgres(ql)?:\/\/[^:]+:[^@]+@/ },
  { name: 'MongoDB URL', pattern: /mongodb(\+srv)?:\/\/[^:]+:[^@]+@/ },
];

// Files to exclude from scanning
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /dist/,
  /build/,
  /coverage/,
  /\.test\.(js|ts)$/,
  /\.spec\.(js|ts)$/,
  /\.example$/,
  /\.sample$/,
];

// Get staged files
function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
      encoding: 'utf-8',
    });
    return output.trim().split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

// Check if file should be excluded
function shouldExclude(filePath) {
  return EXCLUDE_PATTERNS.some(pattern => pattern.test(filePath));
}

// Scan file for secrets
function scanFile(filePath) {
  if (shouldExclude(filePath)) {
    return [];
  }

  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    return [];
  }

  const content = fs.readFileSync(absolutePath, 'utf-8');
  const lines = content.split('\n');
  const findings = [];

  lines.forEach((line, index) => {
    SECRET_PATTERNS.forEach(({ name, pattern }) => {
      if (pattern.test(line)) {
        findings.push({
          file: filePath,
          line: index + 1,
          type: name,
          content: line.substring(0, 100) + (line.length > 100 ? '...' : ''),
        });
      }
    });
  });

  return findings;
}

// Main execution
function main() {
  console.log('🔍 Scanning for secrets in staged files...\n');

  const stagedFiles = getStagedFiles();
  if (stagedFiles.length === 0) {
    console.log('No staged files to scan.');
    process.exit(0);
  }

  let allFindings = [];

  stagedFiles.forEach(file => {
    const findings = scanFile(file);
    allFindings = allFindings.concat(findings);
  });

  if (allFindings.length > 0) {
    console.log('❌ SECRETS DETECTED!\n');
    console.log('The following potential secrets were found:\n');

    allFindings.forEach(finding => {
      console.log(`  📄 ${finding.file}:${finding.line}`);
      console.log(`     Type: ${finding.type}`);
      console.log(`     Content: ${finding.content}\n`);
    });

    console.log('\n⚠️  Please remove secrets before committing.');
    console.log('   Use environment variables instead.\n');
    console.log('   To bypass (not recommended): git commit --no-verify\n');

    process.exit(1);
  }

  console.log('✅ No secrets detected in staged files.\n');
  process.exit(0);
}

main();
```

### Husky Integration

```bash
#!/usr/bin/env sh
# .husky/pre-commit

. "$(dirname -- "$0")/_/husky.sh"

echo "🔒 Running security checks..."

# Run secret detection
node scripts/pre-commit-checks.js

# Run ESLint security rules
npm run lint:security

# Run tests
npm test -- --passWithNoTests --watchAll=false

echo "✅ All pre-commit checks passed!"
```

---

## Example 3: CI/CD Security Pipeline

### Comprehensive Security Workflow

```yaml
# .github/workflows/security-pipeline.yml
name: Security Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    # Weekly security scan
    - cron: '0 0 * * 0'

permissions:
  contents: read
  security-events: write
  pull-requests: write

jobs:
  # Stage 1: Secret Detection
  secrets:
    name: Secret Detection
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: TruffleHog Scan
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          extra_args: --only-verified

      - name: Gitleaks Scan
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITLEAKS_LICENSE: ${{ secrets.GITLEAKS_LICENSE }}

  # Stage 2: Dependency Vulnerabilities
  dependencies:
    name: Dependency Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: NPM Audit
        run: npm audit --audit-level=moderate

      - name: Snyk Dependency Scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

      - name: License Check
        run: npx license-checker --production --onlyAllow 'MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC;0BSD'

  # Stage 3: Static Analysis (SAST)
  sast:
    name: Static Analysis
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: javascript-typescript
          queries: security-and-quality

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3

      - name: Semgrep Scan
        uses: returntocorp/semgrep-action@v1
        with:
          config: >-
            p/security-audit
            p/owasp-top-ten
            p/nodejs
            p/typescript
            p/jwt
            p/sql-injection
            p/xss
          generateSarif: true

      - name: Upload Semgrep SARIF
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: semgrep.sarif
        if: always()

  # Stage 4: Code Quality
  quality:
    name: Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint Security
        run: npm run lint:security

      - name: Run TypeScript Check
        run: npx tsc --noEmit

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

  # Stage 5: Container Security (if applicable)
  container:
    name: Container Security
    runs-on: ubuntu-latest
    if: github.event_name == 'push'
    steps:
      - uses: actions/checkout@v4

      - name: Build Docker image
        run: docker build -t app:${{ github.sha }} .

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'app:${{ github.sha }}'
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH'

      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: 'trivy-results.sarif'

  # Stage 6: Security Report
  report:
    name: Security Report
    needs: [secrets, dependencies, sast, quality]
    runs-on: ubuntu-latest
    if: always()
    steps:
      - name: Generate Security Report
        uses: actions/github-script@v7
        with:
          script: |
            const results = {
              secrets: '${{ needs.secrets.result }}',
              dependencies: '${{ needs.dependencies.result }}',
              sast: '${{ needs.sast.result }}',
              quality: '${{ needs.quality.result }}'
            };

            const passed = Object.values(results).every(r => r === 'success');
            const emoji = passed ? '✅' : '❌';

            let body = `## ${emoji} Security Scan Results\n\n`;
            body += '| Check | Status |\n|-------|--------|\n';

            for (const [check, result] of Object.entries(results)) {
              const status = result === 'success' ? '✅ Passed' :
                            result === 'failure' ? '❌ Failed' : '⚠️ Skipped';
              body += `| ${check} | ${status} |\n`;
            }

            if (context.payload.pull_request) {
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.payload.pull_request.number,
                body: body
              });
            }

            await core.summary
              .addHeading('Security Scan Results')
              .addTable([
                [{data: 'Check', header: true}, {data: 'Status', header: true}],
                ...Object.entries(results).map(([check, result]) => [
                  check,
                  result === 'success' ? '✅' : result === 'failure' ? '❌' : '⚠️'
                ])
              ])
              .write();
```

---

## Example 4: AI Code Quality Tracker

### Productivity Metrics Service

```typescript
// src/services/ai-metrics.service.ts

interface AICodeMetrics {
  timestamp: Date;
  developer: string;
  project: string;
  metrics: {
    linesGenerated: number;
    linesKept: number;
    linesModified: number;
    acceptanceRate: number;
    timeToComplete: number; // minutes
    testsGenerated: number;
    testsPassed: number;
    securityIssuesFound: number;
    reviewCycles: number;
    bugReports: number;
  };
  aiTool: string;
  taskType: 'feature' | 'bugfix' | 'refactor' | 'test' | 'docs';
}

interface AggregatedMetrics {
  period: string;
  totalTasks: number;
  avgAcceptanceRate: number;
  avgTimeToComplete: number;
  avgSecurityIssues: number;
  qualityScore: number;
  productivityIndex: number;
}

class AIMetricsService {
  private metrics: AICodeMetrics[] = [];
  private readonly db: Database;
  private readonly logger: Logger;

  constructor(db: Database, logger: Logger) {
    this.db = db;
    this.logger = logger;
  }

  /**
   * Records metrics for a completed AI-assisted task
   */
  async recordTaskMetrics(metrics: AICodeMetrics): Promise<void> {
    // Validate metrics
    this.validateMetrics(metrics);

    // Calculate derived metrics
    const enrichedMetrics = this.enrichMetrics(metrics);

    // Store in database
    await this.db.insert('ai_metrics', enrichedMetrics);

    this.logger.info('AI metrics recorded', {
      developer: metrics.developer,
      taskType: metrics.taskType,
      acceptanceRate: metrics.metrics.acceptanceRate,
    });
  }

  /**
   * Calculates quality score for AI-generated code
   */
  private calculateQualityScore(metrics: AICodeMetrics['metrics']): number {
    // Weights for different factors
    const weights = {
      acceptance: 0.25,      // How much code was kept
      tests: 0.20,           // Test coverage
      security: 0.25,        // Security issues (inverse)
      reviewCycles: 0.15,    // Review efficiency
      bugs: 0.15,            // Bug rate (inverse)
    };

    // Calculate component scores (0-100)
    const acceptanceScore = metrics.acceptanceRate * 100;

    const testScore = metrics.testsGenerated > 0
      ? (metrics.testsPassed / metrics.testsGenerated) * 100
      : 0;

    const securityScore = Math.max(0, 100 - (metrics.securityIssuesFound * 20));

    const reviewScore = Math.max(0, 100 - ((metrics.reviewCycles - 1) * 25));

    const bugScore = Math.max(0, 100 - (metrics.bugReports * 33));

    // Calculate weighted score
    const qualityScore =
      acceptanceScore * weights.acceptance +
      testScore * weights.tests +
      securityScore * weights.security +
      reviewScore * weights.reviewCycles +
      bugScore * weights.bugs;

    return Math.round(qualityScore * 100) / 100;
  }

  /**
   * Calculates productivity index comparing AI-assisted vs baseline
   */
  private calculateProductivityIndex(
    metrics: AICodeMetrics['metrics'],
    baselineTime: number
  ): number {
    // Time savings factor
    const timeFactor = metrics.timeToComplete > 0
      ? baselineTime / metrics.timeToComplete
      : 1;

    // Quality adjustment (penalty for issues)
    const qualityFactor = 1 -
      (metrics.securityIssuesFound * 0.05) -
      (metrics.bugReports * 0.1) -
      ((metrics.reviewCycles - 1) * 0.05);

    // Final productivity index
    return Math.round(timeFactor * Math.max(0.5, qualityFactor) * 100) / 100;
  }

  private enrichMetrics(metrics: AICodeMetrics): AICodeMetrics & {
    qualityScore: number;
    productivityIndex: number;
  } {
    // Baseline times by task type (in minutes)
    const baselineTimes: Record<string, number> = {
      feature: 480,    // 8 hours
      bugfix: 120,     // 2 hours
      refactor: 240,   // 4 hours
      test: 180,       // 3 hours
      docs: 60,        // 1 hour
    };

    const qualityScore = this.calculateQualityScore(metrics.metrics);
    const productivityIndex = this.calculateProductivityIndex(
      metrics.metrics,
      baselineTimes[metrics.taskType] || 240
    );

    return {
      ...metrics,
      qualityScore,
      productivityIndex,
    };
  }

  /**
   * Gets aggregated metrics for a time period
   */
  async getAggregatedMetrics(
    startDate: Date,
    endDate: Date,
    groupBy: 'day' | 'week' | 'month' = 'week'
  ): Promise<AggregatedMetrics[]> {
    const query = `
      SELECT
        DATE_TRUNC($1, timestamp) as period,
        COUNT(*) as total_tasks,
        AVG((metrics->>'acceptanceRate')::float) as avg_acceptance_rate,
        AVG((metrics->>'timeToComplete')::float) as avg_time_to_complete,
        AVG((metrics->>'securityIssuesFound')::float) as avg_security_issues,
        AVG(quality_score) as quality_score,
        AVG(productivity_index) as productivity_index
      FROM ai_metrics
      WHERE timestamp BETWEEN $2 AND $3
      GROUP BY DATE_TRUNC($1, timestamp)
      ORDER BY period DESC
    `;

    const results = await this.db.query(query, [groupBy, startDate, endDate]);

    return results.rows.map(row => ({
      period: row.period,
      totalTasks: parseInt(row.total_tasks),
      avgAcceptanceRate: parseFloat(row.avg_acceptance_rate),
      avgTimeToComplete: parseFloat(row.avg_time_to_complete),
      avgSecurityIssues: parseFloat(row.avg_security_issues),
      qualityScore: parseFloat(row.quality_score),
      productivityIndex: parseFloat(row.productivity_index),
    }));
  }

  /**
   * Gets metrics by developer for performance review
   */
  async getDeveloperMetrics(
    developer: string,
    startDate: Date,
    endDate: Date
  ): Promise<{
    summary: AggregatedMetrics;
    byTaskType: Record<string, AggregatedMetrics>;
    trend: { date: Date; qualityScore: number; productivityIndex: number }[];
  }> {
    const query = `
      SELECT * FROM ai_metrics
      WHERE developer = $1 AND timestamp BETWEEN $2 AND $3
      ORDER BY timestamp ASC
    `;

    const results = await this.db.query(query, [developer, startDate, endDate]);
    const rows = results.rows;

    // Calculate summary
    const summary = this.calculateSummary(rows);

    // Group by task type
    const byTaskType = this.groupByTaskType(rows);

    // Calculate trend
    const trend = rows.map(row => ({
      date: row.timestamp,
      qualityScore: row.quality_score,
      productivityIndex: row.productivity_index,
    }));

    return { summary, byTaskType, trend };
  }

  private calculateSummary(rows: any[]): AggregatedMetrics {
    if (rows.length === 0) {
      return {
        period: 'N/A',
        totalTasks: 0,
        avgAcceptanceRate: 0,
        avgTimeToComplete: 0,
        avgSecurityIssues: 0,
        qualityScore: 0,
        productivityIndex: 0,
      };
    }

    const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
    const avg = (arr: number[]) => sum(arr) / arr.length;

    return {
      period: 'summary',
      totalTasks: rows.length,
      avgAcceptanceRate: avg(rows.map(r => r.metrics.acceptanceRate)),
      avgTimeToComplete: avg(rows.map(r => r.metrics.timeToComplete)),
      avgSecurityIssues: avg(rows.map(r => r.metrics.securityIssuesFound)),
      qualityScore: avg(rows.map(r => r.quality_score)),
      productivityIndex: avg(rows.map(r => r.productivity_index)),
    };
  }

  private groupByTaskType(rows: any[]): Record<string, AggregatedMetrics> {
    const groups: Record<string, any[]> = {};

    rows.forEach(row => {
      if (!groups[row.taskType]) {
        groups[row.taskType] = [];
      }
      groups[row.taskType].push(row);
    });

    const result: Record<string, AggregatedMetrics> = {};
    for (const [taskType, taskRows] of Object.entries(groups)) {
      result[taskType] = this.calculateSummary(taskRows);
    }

    return result;
  }

  private validateMetrics(metrics: AICodeMetrics): void {
    if (metrics.metrics.acceptanceRate < 0 || metrics.metrics.acceptanceRate > 1) {
      throw new Error('Acceptance rate must be between 0 and 1');
    }
    if (metrics.metrics.timeToComplete < 0) {
      throw new Error('Time to complete must be positive');
    }
  }
}

export { AIMetricsService, AICodeMetrics, AggregatedMetrics };
```

---

## Example 5: Secure Prompt Handler

### Sanitizing AI Prompts

```typescript
// src/utils/prompt-sanitizer.ts

interface SanitizationResult {
  sanitized: string;
  warnings: string[];
  blocked: boolean;
  blockedReasons: string[];
}

interface SanitizationOptions {
  removeSecrets: boolean;
  anonymizeData: boolean;
  maxLength: number;
  allowedPatterns: RegExp[];
  blockedPatterns: RegExp[];
}

const DEFAULT_OPTIONS: SanitizationOptions = {
  removeSecrets: true,
  anonymizeData: true,
  maxLength: 10000,
  allowedPatterns: [],
  blockedPatterns: [],
};

// Patterns that should never be in prompts
const SECRET_PATTERNS = [
  { name: 'AWS Key', pattern: /AKIA[0-9A-Z]{16}/, replacement: 'AWS_ACCESS_KEY' },
  { name: 'AWS Secret', pattern: /[A-Za-z0-9/+=]{40}(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, replacement: 'AWS_SECRET_KEY' },
  { name: 'GitHub Token', pattern: /gh[pousr]_[A-Za-z0-9_]{36,}/, replacement: 'GITHUB_TOKEN' },
  { name: 'Stripe Key', pattern: /sk_live_[0-9a-zA-Z]{24,}/, replacement: 'STRIPE_SECRET_KEY' },
  { name: 'Slack Token', pattern: /xox[baprs]-[0-9A-Za-z-]+/, replacement: 'SLACK_TOKEN' },
  { name: 'Private Key', pattern: /-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----[\s\S]*?-----END (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/, replacement: '[PRIVATE_KEY_REMOVED]' },
  { name: 'Database URL', pattern: /(postgres|mysql|mongodb)(\+srv)?:\/\/[^:]+:[^@]+@[^\s]+/, replacement: 'DATABASE_URL' },
  { name: 'JWT Token', pattern: /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/, replacement: 'JWT_TOKEN' },
  { name: 'Basic Auth', pattern: /Basic [A-Za-z0-9+/]+=*/, replacement: 'BASIC_AUTH' },
  { name: 'Bearer Token', pattern: /Bearer [A-Za-z0-9_-]+\.?[A-Za-z0-9_-]*\.?[A-Za-z0-9_-]*/, replacement: 'BEARER_TOKEN' },
];

// PII patterns for anonymization
const PII_PATTERNS = [
  { name: 'Email', pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, replacement: 'user@example.com' },
  { name: 'Phone', pattern: /(\+?1?[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/, replacement: '555-555-5555' },
  { name: 'SSN', pattern: /\d{3}-\d{2}-\d{4}/, replacement: 'XXX-XX-XXXX' },
  { name: 'Credit Card', pattern: /\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}/, replacement: 'XXXX-XXXX-XXXX-XXXX' },
  { name: 'IP Address', pattern: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, replacement: '0.0.0.0' },
];

// Blocked content patterns
const BLOCKED_PATTERNS = [
  { name: 'Proprietary Algorithm', pattern: /PROPRIETARY|TRADE SECRET|CONFIDENTIAL ALGORITHM/i, reason: 'Contains proprietary markers' },
  { name: 'Customer Data Marker', pattern: /CUSTOMER DATA:|CLIENT INFO:|PII:/i, reason: 'Contains customer data markers' },
  { name: 'Internal URL', pattern: /https?:\/\/[^/]*\.(internal|corp|local)\.[a-z]+/i, reason: 'Contains internal URLs' },
];

class PromptSanitizer {
  private options: SanitizationOptions;
  private logger: Logger;

  constructor(options: Partial<SanitizationOptions> = {}, logger?: Logger) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.logger = logger || console;
  }

  /**
   * Sanitizes a prompt before sending to AI service
   */
  sanitize(prompt: string): SanitizationResult {
    const warnings: string[] = [];
    const blockedReasons: string[] = [];
    let sanitized = prompt;
    let blocked = false;

    // Check for blocked patterns first
    for (const { name, pattern, reason } of BLOCKED_PATTERNS) {
      if (pattern.test(sanitized)) {
        blockedReasons.push(`${name}: ${reason}`);
        blocked = true;
      }
    }

    // Check custom blocked patterns
    for (const pattern of this.options.blockedPatterns) {
      if (pattern.test(sanitized)) {
        blockedReasons.push(`Custom pattern match: ${pattern.toString()}`);
        blocked = true;
      }
    }

    if (blocked) {
      this.logger.warn('Prompt blocked', { reasons: blockedReasons });
      return {
        sanitized: '',
        warnings,
        blocked: true,
        blockedReasons,
      };
    }

    // Remove secrets
    if (this.options.removeSecrets) {
      for (const { name, pattern, replacement } of SECRET_PATTERNS) {
        if (pattern.test(sanitized)) {
          warnings.push(`${name} detected and replaced`);
          sanitized = sanitized.replace(pattern, replacement);
        }
      }
    }

    // Anonymize PII
    if (this.options.anonymizeData) {
      for (const { name, pattern, replacement } of PII_PATTERNS) {
        if (pattern.test(sanitized)) {
          warnings.push(`${name} detected and anonymized`);
          sanitized = sanitized.replace(new RegExp(pattern, 'g'), replacement);
        }
      }
    }

    // Truncate if too long
    if (sanitized.length > this.options.maxLength) {
      warnings.push(`Prompt truncated from ${sanitized.length} to ${this.options.maxLength} characters`);
      sanitized = sanitized.substring(0, this.options.maxLength);
    }

    // Log warnings
    if (warnings.length > 0) {
      this.logger.warn('Prompt sanitized', { warnings });
    }

    return {
      sanitized,
      warnings,
      blocked: false,
      blockedReasons: [],
    };
  }

  /**
   * Validates a prompt without modifying it
   */
  validate(prompt: string): { valid: boolean; issues: string[] } {
    const issues: string[] = [];

    // Check for secrets
    for (const { name, pattern } of SECRET_PATTERNS) {
      if (pattern.test(prompt)) {
        issues.push(`Contains ${name}`);
      }
    }

    // Check for PII
    for (const { name, pattern } of PII_PATTERNS) {
      if (pattern.test(prompt)) {
        issues.push(`Contains ${name}`);
      }
    }

    // Check for blocked content
    for (const { name, pattern } of BLOCKED_PATTERNS) {
      if (pattern.test(prompt)) {
        issues.push(`Contains ${name}`);
      }
    }

    return {
      valid: issues.length === 0,
      issues,
    };
  }

  /**
   * Creates a safe version of code for prompts
   */
  sanitizeCode(code: string): string {
    let sanitized = code;

    // Replace environment variable values
    sanitized = sanitized.replace(
      /process\.env\.(\w+)\s*(?:=|:)\s*['"]([^'"]+)['"]/g,
      "process.env.$1 = 'PLACEHOLDER'"
    );

    // Replace string assignments that look like secrets
    sanitized = sanitized.replace(
      /(const|let|var)\s+(\w*(?:secret|password|key|token|api|auth)\w*)\s*=\s*['"]([^'"]+)['"]/gi,
      "$1 $2 = 'PLACEHOLDER'"
    );

    // Apply standard sanitization
    const result = this.sanitize(sanitized);
    return result.sanitized;
  }
}

// Factory function for easy use
function createSanitizer(options?: Partial<SanitizationOptions>): PromptSanitizer {
  return new PromptSanitizer(options);
}

export { PromptSanitizer, createSanitizer, SanitizationResult, SanitizationOptions };
```

---

## Quick Reference

### Security Checklist for AI Code

```markdown
## Before Sending Prompt
- [ ] No API keys or secrets
- [ ] No credentials or passwords
- [ ] No personal data (PII)
- [ ] No internal URLs or IPs
- [ ] No proprietary algorithms

## After Receiving AI Code
- [ ] Run security linter
- [ ] Check for hardcoded values
- [ ] Verify input validation
- [ ] Confirm parameterized queries
- [ ] Review error handling
- [ ] Test edge cases
```

### Tool Configuration Quick Start

```bash
# Install security tools
npm install -D eslint-plugin-security eslint-plugin-no-secrets
npm install -D @secretlint/secretlint-rule-preset-recommend
npm install -D husky lint-staged

# Initialize husky
npx husky init

# Add pre-commit hook
echo 'npx secretlint "**/*" && npm run lint:security' > .husky/pre-commit
```

---

*Module 7 Code Examples - Security & Best Practices*
*AI-Assisted Software Development Course*
