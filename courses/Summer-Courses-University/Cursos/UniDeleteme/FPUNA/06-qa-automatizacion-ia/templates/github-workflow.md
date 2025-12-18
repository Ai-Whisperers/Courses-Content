# Template: GitHub Actions Workflow
## Workflows para CI/CD con Playwright

---

## Workflow Básico

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run tests
        run: npx playwright test

      - name: Upload report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## Workflow con Sharding (Paralelo)

```yaml
# .github/workflows/playwright-sharded.yml
name: Playwright Tests (Sharded)

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run tests (shard ${{ matrix.shardIndex }}/${{ matrix.shardTotal }})
        run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}

      - name: Upload blob report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: blob-report-${{ matrix.shardIndex }}
          path: blob-report
          retention-days: 1

  merge-reports:
    if: always()
    needs: [test]
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Download blob reports
        uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true

      - name: Merge reports
        run: npx playwright merge-reports --reporter html ./all-blob-reports

      - name: Upload HTML report
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report
          retention-days: 14
```

---

## Workflow Multi-Browser

```yaml
# .github/workflows/playwright-browsers.yml
name: Playwright Multi-Browser

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        browser: [chromium, firefox, webkit]

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - run: npm ci

      - name: Install Playwright (${{ matrix.browser }})
        run: npx playwright install --with-deps ${{ matrix.browser }}

      - name: Run tests (${{ matrix.browser }})
        run: npx playwright test --project=${{ matrix.browser }}

      - name: Upload report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: report-${{ matrix.browser }}
          path: playwright-report/
          retention-days: 7
```

---

## Workflow con Deploy a Pages

```yaml
# .github/workflows/playwright-pages.yml
name: Playwright with Report Deploy

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        if: always()
        with:
          path: playwright-report/

  deploy:
    needs: test
    if: always() && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## Workflow con Slack Notification

```yaml
# .github/workflows/playwright-slack.yml
name: Playwright with Notifications

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - run: npm ci
      - run: npx playwright install --with-deps

      - name: Run tests
        id: tests
        run: npx playwright test
        continue-on-error: true

      - name: Upload report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/

      - name: Notify Slack on failure
        if: steps.tests.outcome == 'failure'
        uses: slackapi/slack-github-action@v1.24.0
        with:
          payload: |
            {
              "text": "❌ Playwright Tests Failed",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Playwright Tests Failed*\n<${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}|View Run>"
                  }
                },
                {
                  "type": "section",
                  "fields": [
                    {"type": "mrkdwn", "text": "*Branch:*\n${{ github.ref_name }}"},
                    {"type": "mrkdwn", "text": "*Author:*\n${{ github.actor }}"}
                  ]
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK

      - name: Fail job if tests failed
        if: steps.tests.outcome == 'failure'
        run: exit 1
```

---

## Workflow Nocturno

```yaml
# .github/workflows/playwright-nightly.yml
name: Nightly Tests

on:
  schedule:
    # Ejecutar a las 2 AM (hora de Paraguay: UTC-4)
    - cron: '0 6 * * *'
  workflow_dispatch:  # Permite ejecución manual

jobs:
  full-suite:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - run: npm ci
      - run: npx playwright install --with-deps

      # Ejecutar TODOS los tests en todos los browsers
      - name: Run full test suite
        run: npx playwright test --project=chromium --project=firefox --project=webkit
        timeout-minutes: 120

      - name: Upload report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: nightly-report-${{ github.run_number }}
          path: playwright-report/
          retention-days: 30
```

---

## Workflow con Variables de Entorno

```yaml
# .github/workflows/playwright-env.yml
name: Playwright with Environments

on:
  push:
    branches: [main, staging]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Target environment'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

jobs:
  test:
    runs-on: ubuntu-latest
    environment: ${{ github.event.inputs.environment || 'staging' }}

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18

      - run: npm ci
      - run: npx playwright install --with-deps

      - name: Run tests
        run: npx playwright test
        env:
          BASE_URL: ${{ vars.BASE_URL }}
          API_KEY: ${{ secrets.API_KEY }}
          TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
          TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: report
          path: playwright-report/
```

---

## Workflow con PR Comment

```yaml
# .github/workflows/playwright-pr.yml
name: Playwright PR Tests

on:
  pull_request:
    branches: [main]

permissions:
  contents: read
  pull-requests: write

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - run: npm ci
      - run: npx playwright install --with-deps

      - name: Run tests
        id: test
        run: npx playwright test --reporter=json --reporter=html
        continue-on-error: true

      - name: Upload report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/

      - name: Comment on PR
        uses: actions/github-script@v7
        if: always()
        with:
          script: |
            const fs = require('fs');
            let results = { passed: 0, failed: 0, skipped: 0 };

            try {
              const report = JSON.parse(fs.readFileSync('test-results.json', 'utf8'));
              // Parse results...
            } catch (e) {
              console.log('Could not parse results');
            }

            const outcome = '${{ steps.test.outcome }}';
            const emoji = outcome === 'success' ? '✅' : '❌';

            const body = `## ${emoji} Playwright Test Results

            | Status | Result |
            |--------|--------|
            | Outcome | ${outcome} |

            📊 [Download Report](https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }})`;

            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: body
            });
```

---

## Uso

1. Crear carpeta `.github/workflows/`
2. Copiar workflow apropiado
3. Configurar secrets en GitHub:
   - `SLACK_WEBHOOK_URL` (si usas Slack)
   - Variables de entorno específicas
4. Ajustar branches según tu flujo de trabajo
5. Commit y push

---

*Ver también: templates/playwright-config.md*
