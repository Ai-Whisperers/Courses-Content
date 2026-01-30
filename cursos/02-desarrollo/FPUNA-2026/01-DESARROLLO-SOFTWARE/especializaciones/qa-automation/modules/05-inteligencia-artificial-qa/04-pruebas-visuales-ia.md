# Tutorial: Visual Testing y Regression con IA
## Módulo 05: IA para QA

**Duración**: 50 minutos  
**Nivel**: Intermedio-Avanzado  
**Prerequisitos**: Modules 01-04, OpenCode configurado

---

## El Problema: Screenshots Como Tests

### Escenario Real

```
SIN VISUAL TESTING:
Designer cambia colores del botón
QA manual verifica screenshots uno por uno
✅ Se ve bien
Deploy → Botón tiene color incorrecto en Mobile
Bug encontrado en producción

CON VISUAL TESTING CON IA:
Snapshot visual guardada
Cambio de color es detectado automáticamente
Bloquea merge hasta revisar
```

---

## Parte 1: Snapshots Visuales con Playwright

### Setup Básico

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    // Esperar a que el viewport esté listo
    screenshot: 'only-on-failure',
    
    // Agregar snapshots visuales
    testMatch: '**/*visual*.spec.ts',
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### Test Visual Simple

```typescript
// tests/visual/login-page.visual.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Tests - Login Page', () => {
  test.beforeEach(async ({ page }) => {
    // Esperar a que fuentes carguen
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
  });

  // ✅ Desktop snapshot
  test('login page desktop snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('login-desktop.png');
  });

  // ✅ Mobile snapshot
  test('login page mobile snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveScreenshot('login-mobile.png');
  });

  // ✅ Form estados
  test('login form filled', async ({ page }) => {
    await page.getByLabel('Email').fill('test@fpuna.edu.py');
    await page.getByLabel('Contraseña').fill('password123');
    await expect(page).toHaveScreenshot('login-filled.png');
  });

  // ✅ Error state
  test('login form error', async ({ page }) => {
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    
    await expect(page.locator('.error-message')).toBeVisible();
    await expect(page).toHaveScreenshot('login-error.png');
  });
});
```

### Ejecutar Snapshots

```bash
# Generar snapshots iniciales
npx playwright test --update-snapshots

# Comparar con snapshots existentes
npx playwright test visual

# Ver diferencias
npx playwright test --debug
```

---

## Parte 2: Applitools Eyes (Visual AI)

### Setup Applitools

```bash
npm install @applitools/eyes-playwright
```

**Obtener API Key**:
1. Ir a https://applitools.com
2. Free account
3. Copiar API Key
4. Guardar en `.env`: `APPLITOOLS_API_KEY=xxxxx`

### Uso Básico

```typescript
// tests/visual/applitools-test.spec.ts
import { test, expect } from '@playwright/test';
import { Eyes, Target } from '@applitools/eyes-playwright';

const eyes = new Eyes();

test.beforeEach(async () => {
  await eyes.open(browser, 'FPUNA', 'Login Page');
});

test.afterEach(async () => {
  await eyes.close();
});

test('login page visual', async ({ page }) => {
  await page.goto('/login');
  
  // Capturar viewport completo
  await eyes.check('Login Page', Target.window().fully());
});

test('cart page visual', async ({ page }) => {
  await page.goto('/carrito');
  
  // Capturar solo un elemento
  await eyes.check('Cart Items', 
    Target.region(page.locator('.cart-items')));
});

test('checkout flow visual', async ({ page }) => {
  await page.goto('/checkout');
  
  // Comparar múltiples checkpoints
  await eyes.check('Step 1', Target.window().fully());
  
  await page.click('button:has-text("Siguiente")');
  await expect(page).toHaveURL(/.*step-2/);
  await eyes.check('Step 2', Target.window().fully());
  
  await page.click('button:has-text("Siguiente")');
  await page.waitForURL(/.*step-3/);
  await eyes.check('Step 3', Target.window().fully());
});
```

### Applitools Dashboard

```
✅ VENTAJAS:
- IA detecta cambios ignorando variaciones pequeñas
- Cross-browser comparison automático
- Detecta cambios en mobile + desktop
- Historial de cambios
- Integración GitHub
```

---

## Parte 3: Percy (Visual Regression Testing)

### Setup Percy

```bash
npm install --save-dev @percy/cli @percy/playwright
```

### Configuración

```typescript
// tests/visual/percy-test.spec.ts
import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test.describe('Visual Regression - Percy', () => {
  test('login page', async ({ page }) => {
    await page.goto('/login');
    await percySnapshot(page, 'Login Page');
  });

  test('products page', async ({ page }) => {
    await page.goto('/productos');
    await page.waitForLoadState('networkidle');
    
    // Snapshot de página completa
    await percySnapshot(page, 'Products Catalog');
    
    // Snapshot de un elemento
    await percySnapshot(page, 'Product Card', {
      widths: [375, 768, 1280],  // Mobile, tablet, desktop
    });
  });

  test('checkout flow', async ({ page }) => {
    // Step 1
    await page.goto('/checkout');
    await percySnapshot(page, 'Checkout Step 1');
    
    // Step 2
    await page.click('button.next');
    await percySnapshot(page, 'Checkout Step 2');
    
    // Step 3
    await page.click('button.next');
    await percySnapshot(page, 'Checkout Step 3');
  });
});
```

### Ejecutar Percy

```bash
# Instalar Percy
npx percy install

# Correr tests con Percy
npx percy exec -- npx playwright test visual/percy-test.spec.ts
```

---

## Parte 4: IA para Análisis Visual

### Prompt 1: Detectar Problemas Visuales

**Prompt a OpenCode**:
```
Soy QA y acabodetomar 10 screenshots del sitio.

DETECTA PROBLEMAS VISUALES COMUNES:
1. Elementos no alineados
2. Colores incorrectos (debería ser azul FPUNA #003399)
3. Textos cortados
4. Elementos fuera del viewport
5. Contraste pobre (accesibilidad)

ARCHIVOS:
[adjuntar 3-5 screenshots]

¿Qué problemas visuales ves?
¿Qué tan graves son?
¿Bloqueador para producción?
```

**Respuesta de OpenCode**:
Analiza y reporta problemas encontrados.

---

## Parte 5: CI/CD para Visual Tests

### Integración GitHub Actions

```yaml
# .github/workflows/visual-tests.yml
name: 🎨 Visual Regression Tests

on: [push, pull_request]

jobs:
  visual:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install --with-deps
      
      # Ejecutar visual tests
      - name: 🎨 Run Visual Tests
        run: npx playwright test visual
      
      # Percy para cross-browser
      - name: 📸 Run Percy Tests
        run: npx percy exec -- npx playwright test visual/percy
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
      
      # Upload comparisons
      - name: 📤 Upload Visual Diffs
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: visual-diffs
          path: test-results/
          retention-days: 30
```

---

## Resumen de Visual Testing

| Tool | Mejor Para | Precio |
|------|-----------|--------|
| **Playwright Screenshot** | Snapshots simples | FREE |
| **Applitools Eyes** | IA avanzada, cross-browser | FREE tier |
| **Percy** | CI/CD integration, colaboración | FREE tier |

---

*Tutorial: Visual Testing AI - Módulo 05 IA para QA - FPUNA 2026*
