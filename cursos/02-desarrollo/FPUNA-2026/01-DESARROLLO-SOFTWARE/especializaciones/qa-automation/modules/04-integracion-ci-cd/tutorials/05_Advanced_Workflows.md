# Tutorial: Workflows Avanzados y Optimización
## Módulo 04: Integración CI/CD

**Duración**: 45 minutos  
**Nivel**: Avanzado  
**Prerequisitos**: GitHub Actions, Sharding, Reportes

---

## Workflow Profesional Completo

```yaml
# .github/workflows/qa-pipeline.yml
name: Complete QA Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  schedule:
    - cron: '0 2 * * *'  # Nightly builds

jobs:
  # Job 1: Verificar cambios
  changes:
    runs-on: ubuntu-latest
    outputs:
      tests: ${{ steps.changes.outputs.tests }}
      code: ${{ steps.changes.outputs.src }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v2
        id: changes
        with:
          filters: |
            tests:
              - 'tests/**'
              - 'playwright.config.ts'
            src:
              - 'src/**'

  # Job 2: Linting y Type Check
  code-quality:
    needs: changes
    if: needs.changes.outputs.code == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  # Job 3: Sharded Tests
  test:
    needs: changes
    if: needs.changes.outputs.tests == 'true'
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
        env:
          SHARD_INDEX: ${{ matrix.shard }}
          SHARD_COUNT: 4
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: blob-report-${{ matrix.shard }}
          path: blob-report

  # Job 4: Mergear reportes
  merge-reports:
    if: always()
    needs: [test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - uses: actions/download-artifact@v3
        with:
          path: all-blob-reports
          pattern: blob-report-*
      - run: npx playwright merge-reports --reporter html ./all-blob-reports
      - uses: actions/upload-artifact@v3
        with:
          name: html-report
          path: playwright-report

  # Job 5: Status check
  test-results:
    if: always()
    needs: [test, code-quality]
    runs-on: ubuntu-latest
    steps:
      - name: Check test results
        run: |
          if [ "${{ needs.test.result }}" = "failure" ]; then
            echo "❌ Tests failed"
            exit 1
          fi
          echo "✅ All checks passed"

  # Job 6: Notificaciones
  notify:
    if: always()
    needs: [test-results]
    runs-on: ubuntu-latest
    steps:
      - name: Send Slack notification
        uses: slackapi/slack-github-action@v1.24.0
        with:
          webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          payload: |
            {
              "text": "QA Pipeline: ${{ needs.test-results.result }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*QA Results:* ${{ needs.test-results.result }}\n${{ github.repository }}"
                  }
                }
              ]
            }
```

---

## Optimizaciones

### 1. Usar Caching Inteligente

```yaml
- uses: actions/cache@v3
  with:
    path: ~/.cache/ms-playwright
    key: ${{ runner.os }}-playwright-${{ hashFiles('**/package-lock.json') }}
    restore-keys: ${{ runner.os }}-playwright-
```

### 2. Condicionales para ahorrar tiempo

```yaml
- name: Run tests
  if: github.event_name == 'push' || contains(github.event.pull_request.labels.*.name, 'test')
  run: npm test
```

### 3. Artifact retention

```yaml
- uses: actions/upload-artifact@v3
  with:
    retention-days: 7  # Borrar después de 7 días
```

---

## Mejores Prácticas Avanzadas

✅ Usar `needs:` para dependencias entre jobs  
✅ Usar `if:` para condicionales  
✅ Matrix para múltiples configs  
✅ Cachear dependencias  
✅ Paths filter para cambios selectivos  
❌ Todos los jobs en paralelo (usar needs)  
❌ Artifacts ilimitados (retention-days)  
❌ Secrets en logs  

---

*Tutorial: Advanced Workflows - Módulo 04 Integración CI/CD - FPUNA 2026*
