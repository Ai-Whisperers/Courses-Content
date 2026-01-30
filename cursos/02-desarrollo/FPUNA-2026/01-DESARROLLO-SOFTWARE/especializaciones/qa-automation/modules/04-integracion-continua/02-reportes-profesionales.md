# Tutorial: Reportes Profesionales con Allure
## Módulo 04: Integración CI/CD

**Duración**: 45 minutos  
**Nivel**: Intermedio  
**Prerequisitos**: Module 01-03, GitHub Actions básico

---

## El Problema: Reportes de Test Pobres

### Sin Reportes Profesionales

```
❌ Tests ejecutan en CI/CD
❌ Resultado: "1 test failed"
❌ ¿Cuál falló? ¿Dónde? ¿Por qué?
❌ No hay capturas de pantalla
❌ No hay logs
❌ No hay historial
❌ Developer debe debuggear en local
❌ Pérdida de 1-2 horas por fallo
```

### Con Reportes Profesionales (Allure)

```
✅ Tests ejecutan en CI/CD
✅ Allure genera reporte interactivo
✅ Historial de trends (pasó antes? ahora falló?)
✅ Screenshots integrados
✅ Logs completos
✅ Estadísticas por suite/feature
✅ Dashboard bonito
✅ Debugging en 5 minutos
```

---

## Allure Reports Setup

### 1. Instalar Allure

```bash
# npm install
npm install -D @playwright/test allure-playwright allure-commandline

# MacOS
brew install allure

# Linux
sudo apt-add-repository ppa:qameta/allure
sudo apt-get update
sudo apt-get install allure
```

### 2. Configurar Playwright

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    // Screenshots automáticos en fallo
    screenshot: 'only-on-failure',
    
    // Video en fallo
    video: 'retain-on-failure',
    
    // Trace en fallo
    trace: 'on-first-retry',
  },

  // Allure reporter
  reporter: [
    ['html'],  // HTML reporter por defecto
    ['allure-playwright'],  // Allure reporter
  ],

  // Más retries para Allure
  retries: 2,
});
```

### 3. Ejecutar Tests y Generar Reporte

```bash
# Ejecutar tests
npx playwright test

# Generar reporte Allure
npx allure generate ./allure-results --clean -o ./allure-report

# Abrir reporte en navegador
npx allure open ./allure-report
```

---

## Ejemplos Prácticos

### Ejemplo 1: Decorators para Tests

```typescript
// tests/enrollment.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Inscripción a Materias', () => {
  test('buscar y inscribirse a materia @enrollment @smoke', async ({ page }) => {
    // El test...
  });
});
```

### Ejemplo 2: Descripción Detallada en Tests

```typescript
import { test, expect } from '@playwright/test';

test.describe('Sistema de Calificaciones', () => {
  test('profesor puede ingresar calificaciones de parcial', async ({ page }) => {
    test.info().annotations.push({
      type: 'issue',
      description: 'https://github.com/org/repo/issues/123',
    });

    test.info().annotations.push({
      type: 'requirements',
      description: 'REQ-001: Ingreso de calificaciones',
    });

    // Test...
  });
});
```

### Ejemplo 3: Steps para Desglosar Actions

```typescript
import { test, expect } from '@playwright/test';

test('flujo completo de inscripción', async ({ page }) => {
  // Step 1: Navegar a página de materias
  await test.step('Navegar a página de materias', async () => {
    await page.goto('/cursos');
    await expect(page.locator('h1')).toContainText('Materias Disponibles');
  });

  // Step 2: Buscar materia específica
  await test.step('Buscar "Cálculo I"', async () => {
    await page.fill('[data-testid="search"]', 'Cálculo I');
    await page.keyboard.press('Enter');
  });

  // Step 3: Inscribirse
  await test.step('Inscribirse a la materia', async () => {
    await page.getByRole('button', { name: 'Inscribirse' }).click();
    await expect(page.getByText('Inscripción exitosa')).toBeVisible();
  });

  // Allure muestra cada step por separado
});
```

### Ejemplo 4: Archivos Adjuntos (Logs, JSON, etc.)

```typescript
import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test('exportar datos de estudiante', async ({ page }) => {
  await test.step('Descargar reporte', async () => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Descargar PDF' }).click();
    const download = await downloadPromise;
    
    // Guardar archivo
    const filePath = `./downloads/${download.suggestedFilename}`;
    await download.saveAs(filePath);
    
    // Adjuntar a reporte Allure
    const fileContent = fs.readFileSync(filePath);
    await test.step('Adjuntar PDF al reporte', async () => {
      // Allure automáticamente adjunta videos/screenshots
    });
  });
});
```

### Ejemplo 5: Workflow con Allure Report

```yaml
# .github/workflows/test-allure.yml
name: Tests with Allure Report

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install --with-deps
      
      - name: Run Playwright tests
        run: npm test
        continue-on-error: true  # Continuar incluso si falla
      
      - name: Generate Allure Report
        if: always()  # Siempre generar reporte
        run: |
          npx allure generate ./allure-results --clean -o ./allure-report
      
      - name: Upload Allure Report to S3
        if: always()
        run: |
          aws s3 sync ./allure-report s3://my-reports-bucket/run-${{ github.run_id }}
      
      - name: Comment PR with Report Link
        if: always() && github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `📊 [Allure Report](https://reports.example.com/run-${{ github.run_id }})`
            })
```

---

## Mejores Prácticas

### ✅ BUENO

```typescript
// 1. Usar steps para organizar
await test.step('Paso 1: Login', async () => {
  // ...
});

// 2. Nombres descriptivos
test('usuario admin puede crear nueva materia', async () => {
  // ✅ Claro qué se prueba
});

// 3. Annotations para tracking
test.info().annotations.push({
  type: 'requirement',
  description: 'REQ-001'
});

// 4. Screenshots automáticos en fallo
screenshot: 'only-on-failure'
```

### ❌ MALO

```typescript
// ❌ Sin steps, todo en un bloque
test('test', async ({ page }) => {
  // 50 líneas sin organizar
});

// ❌ Nombre genérico
test('test 1', async () => {

});

// ❌ Sin screenshots
screenshot: 'off'
```

---

## HTML Reporter (Alternativa Rápida)

Si no necesitas Allure, usa HTML reporter (incluido):

```bash
# Ejecutar tests
npx playwright test

# Generar HTML report automáticamente
npx playwright show-report
```

HTML reporter incluye:
- ✅ Screenshots
- ✅ Videos
- ✅ Traces
- ✅ Stats
- ❌ Trends/Historial

---

## Resumen

| Herramienta | Ventajas | Desventajas |
|-------------|----------|-------------|
| **Allure** | Profesional, trends, integración | Más setup |
| **HTML** | Incluido, rápido | Menos features |
| **JUnit XML** | Compatible con many tools | Datos raw |

---

## Próximas Secciones en Este Módulo

- [01_GitHub_Actions_Setup.md](./01_GitHub_Actions_Setup.md) - Setup de CI/CD
- [03_Test_Sharding.md](./03_Test_Sharding.md) - Paralelización en CI
- [04_Notifications.md](./04_Notifications.md) - Notificaciones (Slack)
- [05_Advanced_Workflows.md](./05_Advanced_Workflows.md) - Workflows complejos

---

*Tutorial: Professional Reporting - Módulo 04 Integración CI/CD - FPUNA 2026*
