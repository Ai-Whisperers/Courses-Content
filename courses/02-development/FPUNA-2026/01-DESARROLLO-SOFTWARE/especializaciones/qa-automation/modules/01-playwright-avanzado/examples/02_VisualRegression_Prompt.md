# Ejemplo: Visual Regression Testing
## Módulo 01: Playwright Avanzado

**Propósito**: Generar test suite con visual regression usando OpenCode

---

## Prompt para OpenCode

```
Genera tests de Playwright (TypeScript) para visual regression testing:

CONTEXTO:
Aplicación: Landing page de producto
Componentes a testear:
- Header/Navbar
- Hero section
- Feature cards
- Footer

REQUISITOS:

1. Screenshots de Página Completa:
   - Full page screenshot del landing completo
   - Nombre descriptivo: landing-completo.png
   - Incluir scroll completo

2. Screenshots de Componentes Específicos:
   - Header (solo header sin contenido)
   - Hero section
   - Cards de features
   - Footer
   - 4 screenshots separados

3. Maskear Elementos Dinámicos:
   - Fecha/hora actual
   - Contador de visitas
   - Anuncios dinámicos

4. Tests Responsivos:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)
   - Nombre de screenshot incluya viewport: header-desktop.png, header-mobile.png

5. Configuración:
   - maxDiffPixels: 100 (tolerancia de diferencias)
   - animations: 'disabled'

SALIDA:
- Código listo para .spec.ts
- playwright.config.ts con expect configuración
- Instrucciones para actualizar baselines
```

---

## Salida Esperada (Código)

```typescript
import { test, expect, devices } from '@playwright/test';

test.describe('Visual Regression - Landing Page', () => {
  
  test('full page screenshot', async ({ page }) => {
    await page.goto('https://ejemplo.com');
    await page.waitForLoadState('networkidle');
    
    // Screenshot de página completa
    await expect(page).toHaveScreenshot('landing-completo.png', {
      fullPage: true,
      mask: [
        page.locator('[data-dynamic="timestamp"]'),
        page.locator('.contador-visitas')
      ]
    });
  });

  test('header screenshot', async ({ page }) => {
    await page.goto('https://ejemplo.com');
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header).toHaveScreenshot('header.png');
  });

  test('hero section screenshot', async ({ page }) => {
    await page.goto('https://ejemplo.com');
    
    const hero = page.locator('[data-testid="hero-section"]');
    await expect(hero).toHaveScreenshot('hero.png');
  });

  test('feature cards screenshot', async ({ page }) => {
    await page.goto('https://ejemplo.com');
    
    const cards = page.locator('[data-testid="feature-cards"]');
    await expect(cards).toHaveScreenshot('features.png');
  });
});

test.describe('Visual Regression - Responsive', () => {
  
  test.use({ viewport: { width: 1920, height: 1080 } });
  test('desktop view', async ({ page }) => {
    await page.goto('https://ejemplo.com');
    await expect(page).toHaveScreenshot('landing-desktop.png', { fullPage: true });
  });

  test.use({ viewport: { width: 768, height: 1024 } });
  test('tablet view', async ({ page }) => {
    await page.goto('https://ejemplo.com');
    await expect(page).toHaveScreenshot('landing-tablet.png', { fullPage: true });
  });

  test.use({ viewport: { width: 375, height: 667 } });
  test('mobile view', async ({ page }) => {
    await page.goto('https://ejemplo.com');
    await expect(page).toHaveScreenshot('landing-mobile.png', { fullPage: true });
  });
});
```

---

## playwright.config.ts

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  expect: {
    toHaveScreenshot: {
      // Máximo 100 píxeles de diferencia
      maxDiffPixels: 100,
      
      // Deshabilitar animaciones
      animations: 'disabled',
      
      // Comparación en escala de grises
      scale: 'css'
    }
  },
  
  webServer: {
    command: 'npm run dev',  // Iniciar servidor local
    port: 3000
  }
});
```

---

## Cómo Usar

### Primera ejecución (crear baselines)

```bash
npx playwright test
# Se crean imágenes en: tests/__screenshots__/
```

### Cuando cambias CSS (actualizar baselines)

```bash
# Revisar cambios
npx playwright test

# Si los cambios son intencionales:
npx playwright test --update-snapshots

# Verificar qué cambió
git diff tests/__screenshots__/
```

### Ver reporte visual

```bash
npx playwright show-report
```

---

## Casos de Uso

### Caso 1: Rediseño completo

```bash
npx playwright test --update-snapshots
git commit -m "refactor: update visual baselines after redesign"
```

### Caso 2: Detectar cambios accidentales

```bash
# Alguien cambió CSS sin querer
npx playwright test

# ✗ landing-completo.png (mismatch)
# Se genera: landing-completo.png.diff.png

# Revisar:
open tests/__screenshots__/landing-completo.png.diff.png

# Arreglar CSS y rerun
npx playwright test
```

---

## Personalización

### Ignorar Más Elementos Dinámicos

```typescript
await expect(page).toHaveScreenshot('...', {
  mask: [
    page.locator('.reloj'),
    page.locator('.contador'),
    page.getByText(/Última actualización/)
  ]
});
```

### Captura de Area Específica

```typescript
const area = page.locator('.componente-importante');
const box = await area.boundingBox();

await expect(page).toHaveScreenshot('area.png', {
  mask: [...],
  clip: box  // Solo esta área
});
```

---

*Ejemplo: Visual Regression - Módulo 01 Playwright Avanzado - FPUNA 2026*
