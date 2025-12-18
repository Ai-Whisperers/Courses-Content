# Módulo 7: CI/CD y Reporting
## Integración Continua y Reportes Profesionales

---

## Información del Módulo

| Campo | Detalle |
|-------|---------|
| **Duración** | 2 horas |
| **Tipo** | Práctico |
| **Prerrequisitos** | Módulos 1-6 completados |

---

## Objetivos de Aprendizaje

Al finalizar este módulo, los participantes podrán:

1. Configurar GitHub Actions para tests automatizados
2. Implementar ejecución paralela con sharding
3. Generar y publicar reportes HTML
4. Manejar artifacts (screenshots, videos, traces)
5. Integrar notificaciones a Slack/Teams

---

## Contenido

### 7.1 GitHub Actions para Tests (25 min)

#### ¿Por qué CI/CD para Testing?

```
BENEFICIOS DE CI/CD PARA TESTS
══════════════════════════════

┌─────────────────────────────────────────┐
│  DESARROLLADOR                          │
│    │                                    │
│    ▼ push                               │
│  ┌─────────────┐                        │
│  │   GitHub    │                        │
│  │  Actions    │ ──→ Ejecuta tests      │
│  └─────────────┘     automáticamente    │
│         │                               │
│         ▼                               │
│  ┌─────────────────────────────────┐    │
│  │ ✅ Tests pasan → PR puede merge │    │
│  │ ❌ Tests fallan → PR bloqueado  │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘

VENTAJAS:
✅ Feedback inmediato en cada commit
✅ No se puede mergear código roto
✅ Tests corren en ambiente limpio
✅ Documentación de estado del proyecto
✅ Detectar regresiones automáticamente
```

#### Workflow Básico

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
      - name: Checkout code
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

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

#### Configuración del Proyecto para CI

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Configuración específica para CI
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // Falla si hay .only en CI
  retries: process.env.CI ? 2 : 0, // Reintentos solo en CI
  workers: process.env.CI ? 1 : undefined, // Un worker en CI

  reporter: [
    ['html', { open: 'never' }],
    ['github'], // Anotaciones en GitHub
    ['list'],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

---

### 7.2 Ejecución Paralela y Sharding (20 min)

#### Sharding para Velocidad

```
SHARDING: DIVIDIR TESTS EN MÚLTIPLES WORKERS
════════════════════════════════════════════

Sin Sharding (15 min):
┌──────────────────────────────────────┐
│ Worker 1: Test1 → Test2 → ... → Test30 │
└──────────────────────────────────────┘

Con Sharding (5 min):
┌─────────────────┐
│ Shard 1 (1/3):  │ Test1-10
└─────────────────┘
┌─────────────────┐
│ Shard 2 (2/3):  │ Test11-20
└─────────────────┘
┌─────────────────┐
│ Shard 3 (3/3):  │ Test21-30
└─────────────────┘
```

#### Workflow con Sharding

```yaml
# .github/workflows/playwright-sharded.yml
name: Playwright Tests (Sharded)

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  playwright-tests:
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

      - name: Run Playwright tests
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
    needs: [playwright-tests]
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

#### Configuración para Sharding

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Reporter que funciona con sharding
  reporter: process.env.CI
    ? [['blob'], ['github']]  // blob para merge, github para anotaciones
    : [['html', { open: 'never' }], ['list']],

  // Otras configuraciones...
});
```

---

### 7.3 Reportes y Artifacts (20 min)

#### Tipos de Reporters

```typescript
// playwright.config.ts
export default defineConfig({
  reporter: [
    // HTML - Reporte visual interactivo
    ['html', {
      open: 'never',
      outputFolder: 'playwright-report',
    }],

    // List - Salida en consola
    ['list'],

    // JSON - Para procesamiento
    ['json', { outputFile: 'results.json' }],

    // JUnit - Para CI/CD tools
    ['junit', { outputFile: 'results.xml' }],

    // GitHub - Anotaciones en PRs
    ['github'],

    // Dot - Mínimo, para grandes suites
    ['dot'],
  ],
});
```

#### Screenshots Automáticos

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    // Opciones de screenshot
    screenshot: 'only-on-failure',  // Solo cuando falla
    // screenshot: 'on',            // Siempre
    // screenshot: 'off',           // Nunca
  },
});

// También en tests específicos
test('tomar screenshot manual', async ({ page }) => {
  await page.goto('/');

  // Screenshot manual
  await page.screenshot({
    path: 'screenshots/home.png',
    fullPage: true,
  });
});
```

#### Videos de Tests

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    // Opciones de video
    video: 'retain-on-failure',  // Solo si falla
    // video: 'on',              // Siempre
    // video: 'on-first-retry',  // En primer reintento
    // video: 'off',             // Nunca

    // Configuración de video
    video: {
      mode: 'retain-on-failure',
      size: { width: 1280, height: 720 },
    },
  },
});
```

#### Trace Viewer

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    // Opciones de trace
    trace: 'on-first-retry',  // En primer reintento
    // trace: 'on',           // Siempre
    // trace: 'retain-on-failure', // Solo si falla

    trace: {
      mode: 'on-first-retry',
      screenshots: true,
      snapshots: true,
      sources: true,
    },
  },
});
```

```bash
# Ver trace localmente
npx playwright show-trace trace.zip

# Ver trace desde reporte HTML
# Click en test → Attachments → trace.zip
```

#### Subir Artifacts a GitHub

```yaml
# En workflow
- name: Upload test results
  uses: actions/upload-artifact@v4
  if: always()  # Siempre subir, aunque falle
  with:
    name: test-results
    path: |
      playwright-report/
      test-results/
      screenshots/
    retention-days: 30
```

---

### 7.4 Publicar Reportes (20 min)

#### GitHub Pages para Reportes

```yaml
# .github/workflows/playwright-pages.yml
name: Playwright Tests with Report

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

      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test

      - name: Upload report to Pages
        uses: actions/upload-pages-artifact@v3
        if: always()
        with:
          path: playwright-report/

  deploy:
    needs: test
    if: always()
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Reporte en PR Comments

```yaml
# Agregar comentario con resultados al PR
- name: Comment on PR
  if: github.event_name == 'pull_request'
  uses: actions/github-script@v7
  with:
    script: |
      const fs = require('fs');
      const results = JSON.parse(fs.readFileSync('results.json', 'utf8'));

      const passed = results.suites.reduce((acc, s) =>
        acc + s.specs.filter(t => t.ok).length, 0);
      const failed = results.suites.reduce((acc, s) =>
        acc + s.specs.filter(t => !t.ok).length, 0);

      const body = `## 🎭 Playwright Test Results

      | Status | Count |
      |--------|-------|
      | ✅ Passed | ${passed} |
      | ❌ Failed | ${failed} |

      [View Full Report](https://your-org.github.io/your-repo/)`;

      github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        body: body
      });
```

---

### 7.5 Notificaciones (15 min)

#### Slack Notification

```yaml
# En workflow, después de tests
- name: Notify Slack on failure
  if: failure()
  uses: slackapi/slack-github-action@v1.24.0
  with:
    payload: |
      {
        "text": "❌ Playwright Tests Failed!",
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
              {
                "type": "mrkdwn",
                "text": "*Branch:*\n${{ github.ref_name }}"
              },
              {
                "type": "mrkdwn",
                "text": "*Commit:*\n${{ github.sha }}"
              }
            ]
          }
        ]
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
    SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK
```

#### Microsoft Teams Notification

```yaml
- name: Notify Teams
  if: failure()
  uses: jdcargile/ms-teams-notification@v1.4
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    ms-teams-webhook-uri: ${{ secrets.TEAMS_WEBHOOK_URI }}
    notification-summary: "Playwright Tests Failed"
    notification-color: "dc3545"
    timezone: America/Asuncion
```

---

### 7.6 Mejores Prácticas de CI/CD (20 min)

#### Estructura de Proyecto Recomendada

```
my-project/
├── .github/
│   └── workflows/
│       ├── playwright.yml        # Tests en PRs
│       ├── playwright-nightly.yml # Tests nocturnos
│       └── playwright-deploy.yml  # Post-deploy tests
├── tests/
│   ├── e2e/
│   ├── api/
│   └── visual/
├── playwright.config.ts
└── package.json
```

#### Tests en Diferentes Momentos

```yaml
# playwright-nightly.yml - Tests completos diarios
name: Nightly Tests

on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM todos los días

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # ... setup ...

      - name: Run ALL tests (including slow)
        run: npx playwright test --project=chromium --project=firefox --project=webkit

      - name: Run visual regression tests
        run: npx playwright test --project=visual
```

```yaml
# playwright-deploy.yml - Tests post-deploy
name: Post-Deploy Smoke Tests

on:
  deployment_status:

jobs:
  test:
    if: github.event.deployment_status.state == 'success'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # ... setup ...

      - name: Run smoke tests against production
        run: npx playwright test --grep @smoke
        env:
          BASE_URL: ${{ github.event.deployment_status.target_url }}
```

#### Tags para Tests

```typescript
// tests/checkout.spec.ts
import { test } from '@playwright/test';

// Test marcado como smoke
test('checkout flow works @smoke', async ({ page }) => {
  // ...
});

// Test marcado como slow
test.slow()('complete checkout with payment @slow', async ({ page }) => {
  // ...
});

// Test marcado como flaky (skip en CI)
test.skip(({ browserName }) => browserName === 'webkit', 'Flaky on WebKit');
test('webkit-specific issue', async ({ page }) => {
  // ...
});
```

```bash
# Ejecutar solo tests smoke
npx playwright test --grep @smoke

# Excluir tests lentos
npx playwright test --grep-invert @slow
```

#### Secrets y Variables de Entorno

```yaml
# En GitHub: Settings → Secrets and variables → Actions

# Usar en workflow
jobs:
  test:
    runs-on: ubuntu-latest
    env:
      BASE_URL: ${{ vars.STAGING_URL }}
      TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
      TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}

    steps:
      - name: Run tests
        run: npx playwright test
        env:
          API_KEY: ${{ secrets.API_KEY }}
```

```typescript
// Usar en tests
test('login with env credentials', async ({ page }) => {
  await page.fill('#email', process.env.TEST_USER_EMAIL!);
  await page.fill('#password', process.env.TEST_USER_PASSWORD!);
});
```

---

## Cheatsheet de CI/CD

### Comandos Útiles

```bash
# Ejecutar con sharding
npx playwright test --shard=1/4

# Ejecutar solo tests que fallaron
npx playwright test --last-failed

# Ejecutar con tag específico
npx playwright test --grep @smoke

# Generar reporte sin ejecutar
npx playwright show-report

# Merge de reportes (sharding)
npx playwright merge-reports --reporter html ./all-reports
```

### Variables de Entorno de Playwright

| Variable | Descripción |
|----------|-------------|
| `CI` | Detecta ambiente CI |
| `PLAYWRIGHT_BROWSERS_PATH` | Path de browsers |
| `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD` | Skip download |
| `DEBUG` | Modo debug |

### Archivos Generados

| Carpeta | Contenido |
|---------|-----------|
| `playwright-report/` | Reporte HTML |
| `test-results/` | Screenshots, videos, traces |
| `blob-report/` | Para merge de shards |

---

## Puntos Clave

1. **CI automático:** Tests en cada PR previenen regresiones
2. **Sharding:** Divide tests para ejecución más rápida
3. **Artifacts:** Guarda evidencia de fallos
4. **Reportes:** HTML para debugging, GitHub para PRs
5. **Notificaciones:** Alerta inmediata cuando algo falla

---

*Siguiente módulo: Proyecto Integrador*
