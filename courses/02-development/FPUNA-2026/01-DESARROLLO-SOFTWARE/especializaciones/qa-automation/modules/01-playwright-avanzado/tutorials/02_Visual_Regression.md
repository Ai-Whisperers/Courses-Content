# Tutorial: Visual Regression Testing
## Módulo 01: Playwright Avanzado

**Duración**: 30 minutos  
**Nivel**: Intermedio  
**Prerequisitos**: Concept básicos de screenshots

---

## ¿Qué es Visual Regression Testing?

Visual regression testing detecta **cambios visuales no intencionales** en tu aplicación.

### Ejemplos Reales de Visual Bugs

```
❌ Un CSS se cambia accidentalmente
   Antes: Botón azul
   Después: Botón verde (¡oops!)

❌ Layout se rompe en cierto navegador
   Antes: Texto en dos columnas
   Después: Texto superpuesto (ilegible)

❌ Actualizacion de dependencias rompe diseño
   Antes: Menú bien posicionado
   Después: Menú fuera de pantalla

❌ Cambio de fuente no intencional
   Antes: Párrafo legible
   Después: Texto muy pequeño
```

Sin visual regression testing, estos bugs pasan desapercibidos hasta producción.

---

## Cómo Funciona Visual Regression

### El Proceso

```
1. PRIMERA EJECUCIÓN (Baseline)
   └─> Tomar screenshot
   └─> Guardarlo como referencia (baseline)

2. EJECUCIONES SIGUIENTES
   └─> Tomar screenshot
   └─> Comparar píxel por píxel con baseline
   └─> Si no hay diferencias → ✅ PASS
   └─> Si hay diferencias → ⚠️ REVIEW

3. REVISAR CAMBIOS
   └─> ¿Es un cambio intencional? → Aceptar nuevo baseline
   └─> ¿Es un bug? → Arreglar código y rerun
```

---

## Ejemplos Prácticos

### Ejemplo 1: Screenshot Básico

```typescript
import { test, expect } from '@playwright/test';

test('la página de inicio se ve correcta', async ({ page }) => {
  await page.goto('https://ejemplo.com');
  
  // Tomar screenshot y comparar con baseline
  // Primera vez: crea baseline
  // Siguientes: compara con baseline
  await expect(page).toHaveScreenshot('homepage.png');
});
```

**¿Qué pasó?**
1. Playwright tomó una captura de pantalla de la página completa
2. Guardó la imagen en: `tests/__screenshots__/test-name/homepage.png`
3. Si ejecutas de nuevo, comparará la nueva imagen con esta
4. Si son iguales: ✅ PASS
5. Si hay diferencias: Crea `homepage.png.diff.png` para revisar

---

### Ejemplo 2: Screenshot de Elemento Específico

```typescript
test('el modal de login se ve correcto', async ({ page }) => {
  await page.goto('/');
  
  // Abrir modal
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  
  // Esperar a que aparezca
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  
  // Screenshot solo del modal (no toda la página)
  await expect(modal).toHaveScreenshot('login-modal.png');
});
```

**Ventaja**: Más rápido, menos cambios falsos por diferencias en otras partes.

---

### Exemplo 3: Screenshot Full Page (Con Scroll)

```typescript
test('documentación completa', async ({ page }) => {
  await page.goto('/documentacion');
  
  // Esperar a que todo cargue
  await page.waitForLoadState('networkidle');
  
  // Screenshot de toda la página incluyendo scroll
  await expect(page).toHaveScreenshot('documentacion-completa.png', {
    fullPage: true  // Incluye contenido que requiere scroll
  });
});
```

---

### Ejemplo 4: Ignorar Elementos Dinámicos

**Problema**: La página tiene un reloj que cambia constantemente, o un contador de visitas. Cada screenshot será diferente.

```typescript
test('homepage sin elementos dinámicos', async ({ page }) => {
  await page.goto('/');
  
  // Maskear (ocultar) elementos que cambian
  await expect(page).toHaveScreenshot('homepage.png', {
    mask: [
      page.locator('.reloj-tiempo-real'),        // Elemento 1
      page.locator('.contador-visitas'),         // Elemento 2
      page.getByText(/Última actualización:/)    // Elemento 3 (por regex)
    ]
  });
});
```

**¿Qué pasa con mask?**
- Los elementos especificados se oscurecen en la imagen
- No se comparan al hacer visual regression
- Útil para: fechas dinámicas, contadores, mensajes de tiempo real

---

### Ejemplo 5: Configurar Tolerancia de Diferencias

**Problema**: A veces hay pequeñas diferencias por anti-aliasing de fuentes. No queremos falsos positivos.

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  expect: {
    toHaveScreenshot: {
      // Máximo número de píxeles diferentes
      maxDiffPixels: 100,
      
      // O porcentaje de diferencia tolerado (0-100)
      threshold: 0.2,  // 20% de diferencia = pass
      
      // Comparación más estricta en ciertos browsers
      animations: 'disabled'
    }
  }
});
```

---

### Ejemplo 6: Screenshots en Diferentes Dispositivos

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: 'desktop',
      use: { viewport: { width: 1920, height: 1080 } }
    },
    {
      name: 'tablet',
      use: { viewport: { width: 768, height: 1024 } }
    },
    {
      name: 'mobile',
      use: { viewport: { width: 375, height: 667 } }
    }
  ]
});

test('responsive design', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('landing.png');
  // Esto tomará screenshots en 3 tamaños diferentes
});
```

---

### Ejemplo 7: Actualizar Baselines (Cambios Intencionales)

**Escenario**: Rediseñaste la página y quieres actualizar los baselines.

```bash
# Ejecutar tests y actualizar baselines
npx playwright test --update-snapshots

# O solo para un test específico
npx playwright test homepage --update-snapshots

# O con configuración específica
npx playwright test --config playwright.config.ts --update-snapshots
```

Después de actualizar, verifica los cambios en git:

```bash
git diff tests/__screenshots__/
# Revisar que los cambios son intencionales
git add tests/__screenshots__/
git commit -m "refactor: actualizar visual regression baselines"
```

---

## Flujo Completo: De Inicio a Cambios

### 1. Primer Test (Crear Baseline)

```bash
$ npx playwright test

✓ homepage.png (nuevo)
```

Se creó: `tests/__screenshots__/test.spec.ts/homepage.png`

---

### 2. Ejecutar Nuevamente (Sin Cambios)

```bash
$ npx playwright test

✓ homepage.png (match)
```

---

### 3. Alguien Cambia CSS Accidentalmente

```bash
$ npx playwright test

✗ homepage.png (mismatch)

   Expected: 123 bytes
   Received: 125 bytes
   Diff: +2 bytes in 45 pixels
```

Se creó: `tests/__screenshots__/test.spec.ts/homepage.png.diff.png`

---

### 4. Revisar Cambios

```bash
# Ver archivo diff
open tests/__screenshots__/test.spec.ts/homepage.png.diff.png

# ¿Fue intencional?
# - SI: npx playwright test --update-snapshots
# - NO: Arreglar el código CSS
```

---

## Mejores Prácticas

### ✅ BUENO

```typescript
// 1. Esperar a que todo cargue antes de screenshot
test('...', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot();
});

// 2. Usar nombres descriptivos
await expect(page).toHaveScreenshot('checkout-cart-with-3-items.png');

// 3. Maskear elementos dinámicos
await expect(page).toHaveScreenshot('...', {
  mask: [page.locator('.timestamp')]
});

// 4. Screenshot de elementos específicos
const button = page.getByRole('button', { name: 'Enviar' });
await expect(button).toHaveScreenshot('submit-button.png');
```

### ❌ MALO

```typescript
// 1. No esperar a que cargue
test('...', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot();  // ¡Puede estar cargando!
});

// 2. Nombres genéricos
await expect(page).toHaveScreenshot('screenshot.png');

// 3. Screenshots muy grandes
// (difícil de revisar cambios, lento)
await expect(page).toHaveScreenshot('entire-app.png', {
  fullPage: true  // Evitar si la página es muy larga
});

// 4. No ignorar cambios dinámicos
// (falsos positivos constantemente)
```

---

## Debugging: Analizando Diferencias

### Ver la Comparación Lado a Lado

Playwright genera 3 imágenes:

```
1. baseline.png          - Imagen original
2. actual.png            - Imagen nueva
3. baseline.png.diff.png - Diferencias (píxeles resaltados)
```

```bash
# Abrir el reporte HTML
npx playwright show-report

# Verás:
# - Imagen esperada
# - Imagen actual
# - Diff visual (áreas diferentes resaltadas)
```

---

## Casos de Uso Reales

### Caso 1: Actualización de Librería UI

```typescript
// Antes: Botón con colores viejos
test('botón de acción', async ({ page }) => {
  await expect(page.getByRole('button')).toHaveScreenshot('button.png');
});

// Problema: Actualizas tu librería de UI
// Solución:
// 1. npx playwright test (verás diferencia)
// 2. Revisa que sea intencional
// 3. npx playwright test --update-snapshots
// 4. ✅ Done!
```

### Caso 2: Responsive Design

```typescript
test('landing page responsive', async ({ page, viewport }) => {
  // Este test corre en 3 viewports (desktop, tablet, mobile)
  await page.goto('/');
  await expect(page).toHaveScreenshot(`landing-${viewport.width}.png`);
});
```

### Caso 3: Theme Toggle

```typescript
test('apariencia oscura vs clara', async ({ page }) => {
  await page.goto('/');
  
  // Screenshot tema claro
  await expect(page).toHaveScreenshot('theme-light.png');
  
  // Cambiar a tema oscuro
  await page.getByRole('button', { name: 'Dark Mode' }).click();
  
  // Screenshot tema oscuro
  await expect(page).toHaveScreenshot('theme-dark.png');
});
```

---

## Resumen

| Concepto | Uso |
|----------|-----|
| `toHaveScreenshot()` | Comparar con baseline |
| `fullPage: true` | Incluir contenido con scroll |
| `mask: [...]` | Ignorar elementos dinámicos |
| `threshold` | Tolerancia de diferencias |
| `--update-snapshots` | Actualizar baselines |

**Beneficio**: Detectar cambios visuales accidentales antes de producción.

---

## Próximas Secciones en Este Módulo

- [03_Complex_Components.md](./03_Complex_Components.md) - Modals, iframes, shadow DOM
- [04_Authentication.md](./04_Authentication.md) - Manejo de autenticación
- [05_Performance.md](./05_Performance.md) - Optimizar velocidad de tests

---

*Tutorial: Visual Regression - Módulo 01 Playwright Avanzado - FPUNA 2026*
