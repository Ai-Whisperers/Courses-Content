# Ejercicio: Módulo 7
## Configurar Pipeline de CI/CD

---

## Objetivo

Configurar un workflow de GitHub Actions completo para ejecutar tests de Playwright automáticamente.

**Duración:** 30 minutos

---

## Parte 1: Crear Estructura (5 minutos)

### Crear directorio de workflows

```bash
mkdir -p .github/workflows
```

### Estructura esperada

```
qa-automation-fpuna/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── tests/
│   └── *.spec.ts
├── playwright.config.ts
└── package.json
```

---

## Parte 2: Workflow Básico (10 minutos)

### Crear `.github/workflows/playwright.yml`

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

# COMPLETAR: Triggers del workflow
on:
  push:
    branches: [____]  # Branch principal
  pull_request:
    branches: [____]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    steps:
      # COMPLETAR: Checkout del código
      - name: Checkout code
        uses: actions/________@v4

      # COMPLETAR: Setup de Node.js
      - name: Setup Node.js
        uses: actions/________@v4
        with:
          node-version: __
          cache: 'npm'

      # Instalar dependencias
      - name: Install dependencies
        run: npm __

      # COMPLETAR: Instalar browsers de Playwright
      - name: Install Playwright browsers
        run: npx playwright _______ --with-deps

      # COMPLETAR: Ejecutar tests
      - name: Run Playwright tests
        run: npx playwright ____

      # COMPLETAR: Subir reporte como artifact
      - name: Upload report
        uses: actions/________-artifact@v4
        if: ______  # Siempre subir, aunque falle
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## Parte 3: Actualizar Configuración de Playwright (5 minutes)

### Modificar `playwright.config.ts`

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // COMPLETAR: Configuración para CI
  fullyParallel: true,
  forbidOnly: !!process.env.__,  // Falla si hay .only
  retries: process.env.CI ? _ : 0,  // 2 reintentos en CI
  workers: process.env.CI ? _ : undefined,  // 1 worker en CI

  // COMPLETAR: Reporters
  reporter: [
    ['html', { open: '______' }],  // No abrir automáticamente
    ['list'],
    ['github'],  // Anotaciones en GitHub
  ],

  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    trace: 'on-first-_____',  // Trace en primer reintento
    screenshot: 'only-on-_______',  // Screenshot solo si falla
    video: 'retain-on-_______',  // Video solo si falla
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

## Parte 4: Test de Smoke (5 minutos)

### Crear test con tag @smoke

```typescript
// tests/smoke.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Smoke Tests @smoke', () => {

  test('homepage loads @smoke', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/The Internet/);
  });

  test('login page accessible @smoke', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /Login Page/i })).toBeVisible();
  });

  test('can login successfully @smoke', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/secure/);
  });
});
```

---

## Parte 5: Workflow Avanzado (5 minutos)

### Agregar notificación de fallo (opcional)

Agrega esto al final del workflow:

```yaml
      # Comentar resultados en PR
      - name: Comment test results on PR
        if: github.event_name == 'pull_request' && always()
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');

            // Leer resultado
            const exitCode = '${{ steps.test.outcome }}';
            const status = exitCode === 'success' ? '✅' : '❌';

            const body = `## ${status} Playwright Test Results

            **Status:** ${exitCode}
            **Workflow:** [View Details](${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }})

            📊 Download the test report from the workflow artifacts.`;

            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: body
            });
```

---

## Soluciones

### Workflow Completo

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [main]
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
        id: test
        run: npx playwright test

      - name: Upload report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### Config Completa

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['github'],
  ],

  use: {
    baseURL: 'https://the-internet.herokuapp.com',
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

## Probar Localmente

Antes de hacer push, verifica que todo funciona:

```bash
# Simular ambiente CI
CI=true npx playwright test

# Verificar que el reporte se genera
ls playwright-report/

# Ver el reporte
npx playwright show-report
```

---

## Hacer Push y Verificar

```bash
# Crear branch de prueba
git checkout -b feature/add-ci

# Agregar archivos
git add .github/workflows/playwright.yml
git add playwright.config.ts
git add tests/smoke.spec.ts

# Commit
git commit -m "feat: add CI/CD pipeline with Playwright"

# Push
git push -u origin feature/add-ci

# Ir a GitHub → Actions → Ver workflow ejecutando
```

---

## Checklist de Entrega

- [ ] Archivo `.github/workflows/playwright.yml` creado
- [ ] `playwright.config.ts` configurado para CI
- [ ] Tests smoke creados con tag @smoke
- [ ] Workflow se ejecuta en GitHub Actions
- [ ] Reporte se sube como artifact
- [ ] Tests pasan en CI

---

## Verificación en GitHub

1. Ve a tu repositorio en GitHub
2. Click en "Actions" tab
3. Deberías ver tu workflow ejecutándose
4. Cuando termine, descarga el artifact "playwright-report"
5. Abre `index.html` para ver el reporte

---

## Reflexión

1. ¿Qué ventajas ves de tener tests automatizados en CI?

   _______________________________________________

2. ¿Qué harías si un test falla solo en CI pero no localmente?

   _______________________________________________

3. ¿Cómo agregarías tests en múltiples navegadores?

   _______________________________________________

---

*Tiempo total: 30 minutos*
