# Tutorial: Optimización de Performance
## Módulo 01: Playwright Avanzado

**Duración**: 20 minutos  
**Nivel**: Intermedio  
**Prerequisitos**: Tests básicos que funcionan

---

## El Problema: Tests Lentos

### Antes vs. Después

```
❌ SIN OPTIMIZACIÓN:
   100 tests en serie: 15 minutos
   Cada test espera innecesariamente
   Screenshots en cada paso

✅ CON OPTIMIZACIÓN:
   100 tests en paralelo: 3 minutos
   Esperas inteligentes
   Screenshots solo en fallas
```

La diferencia es **5x más rápido**.

---

## 1. Paralelización

### El Concepto

Ejecutar múltiples tests **simultáneamente**:

```
❌ Serial (Uno a uno):
   Test 1  ▓▓▓▓▓ 5s
   Test 2        ▓▓▓▓▓ 5s
   Test 3             ▓▓▓▓▓ 5s
   Total: 15 segundos

✅ Paralelo (Simultáneo):
   Test 1  ▓▓▓▓▓
   Test 2  ▓▓▓▓▓
   Test 3  ▓▓▓▓▓
   Total: 5 segundos (!)
```

### Configurar Paralelización

```typescript
// playwright.config.ts
export default defineConfig({
  // 4 workers = 4 tests simultáneamente
  workers: 4,
  
  // O automático basado en CPU
  workers: process.env.CI ? 1 : undefined,  // 1 en CI, N en local
});
```

### Por Proyecto

```typescript
export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      fullyParallel: true  // Paralelo dentro de este proyecto
    }
  ]
});
```

---

## 2. Esperas Inteligentes

### ❌ MALO: Esperar Arbitrariamente

```typescript
test('enviar formulario', async ({ page }) => {
  await page.click('button[type="submit"]');
  
  await page.waitForTimeout(3000);  // Esperar 3 segundos arbitrarios
  
  await expect(page.getByText('Enviado')).toBeVisible();
});
```

**Problema**: Si el servidor responde en 500ms, pierdes 2.5 segundos.

### ✅ BUENO: Esperar Condiciones Específicas

```typescript
test('enviar formulario', async ({ page }) => {
  await page.click('button[type="submit"]');
  
  // Esperar a que se muestre el mensaje (máximo 10 segundos)
  await expect(page.getByText('Enviado')).toBeVisible();
});
```

### Estrategias de Espera

```typescript
// 1. Esperar elemento visible
await expect(page.locator('.mensaje-exito')).toBeVisible();

// 2. Esperar cambio de URL
await page.waitForURL('**/dashboard');

// 3. Esperar respuesta de red
await page.waitForResponse(response => 
  response.url().includes('/api/enviar') && response.status() === 200
);

// 4. Esperar estado de red
await page.waitForLoadState('networkidle');  // Sin requests activos

// 5. Esperar evaluación JavaScript
await page.waitForFunction(() => window.dataLoaded === true);

// 6. Esperar evento
await page.waitForEvent('popup');  // Nueva ventana
```

---

## 3. Timeouts Apropiados

### Por Defecto (Muy Largo)

```typescript
// Playwright espera hasta 30 segundos por defecto
await page.click('button');  // Espera hasta 30s si no existe
```

### Acortar Para Tests Rápidos

```typescript
// Reducir timeout a 5 segundos para cosas que deberían ser rápidas
test('página debería cargar rápido', async ({ page }) => {
  await page.goto('/', { timeout: 5000 });  // Falla en 5s en lugar de 30s
  
  await expect(page.locator('h1')).toBeVisible({ timeout: 2000 });
});
```

### En Configuración Global

```typescript
// playwright.config.ts
export default defineConfig({
  timeout: 30_000,  // Timeout global
  
  expect: {
    timeout: 5_000  // Timeout para assertions
  }
});
```

---

## 4. Evitar Capturas de Pantalla Innecesarias

### ❌ MALO: Screenshot en Cada Paso

```typescript
test('login', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveScreenshot('1-inicio.png');  // Screenshot
  
  await page.fill('[name="email"]', 'user@ejemplo.com');
  await expect(page).toHaveScreenshot('2-email-lleno.png');  // Screenshot
  
  await page.fill('[name="password"]', 'pass');
  await expect(page).toHaveScreenshot('3-password-lleno.png');  // Screenshot
  
  await page.click('button[type="submit"]');
  await expect(page).toHaveScreenshot('4-enviado.png');  // Screenshot
  
  await expect(page).toHaveScreenshot('5-resultado.png');  // Screenshot
});
```

Este test es **5x más lento** por las screenshots.

### ✅ BUENO: Screenshots Seleccionados

```typescript
test('login', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('[name="email"]', 'user@ejemplo.com');
  await page.fill('[name="password"]', 'pass');
  
  await page.click('button[type="submit"]');
  
  // Screenshot solo del resultado final
  await expect(page).toHaveScreenshot('login-exitoso.png');
});
```

### Usar Screenshots Solo en Fallas

```typescript
test('login', async ({ page, page }) => {
  // Configurar para tomar screenshot en fallas
}, {
  screenshot: 'only-on-failure'  // Solo si falla
});
```

---

## 5. Reutilizar Contextos de Navegador

### Cómo Funciona

```
❌ Crear/destruir por cada test:
   Test 1  [Crear Browser] [Cerrar]
   Test 2  [Crear Browser] [Cerrar]
   Test 3  [Crear Browser] [Cerrar]
   Tiempo: 15s en creación/destrucción

✅ Reutilizar entre tests:
   Tests 1-10 [Browser compartido]
   Tiempo: 3s (creado una sola vez)
```

Playwright ya lo hace automáticamente, pero:

```typescript
// playwright.config.ts
export default defineConfig({
  // Usar el mismo browser para todos los tests
  fullyParallel: true,  // Contextos separados, browser compartido
});
```

---

## 6. Deshabilitar Animaciones

Las animaciones ralentizan los tests. Deshabilitar en pruebas:

```typescript
// playwright.config.ts
export default defineConfig({
  expect: {
    toHaveScreenshot: {
      animations: 'disabled'  // Sin animaciones en screenshots
    }
  }
});
```

O en test específico:

```typescript
test('animación deshabilitada', async ({ page }) => {
  // Deshabilitar todas las animaciones CSS
  await page.addInitScript(() => {
    document.documentElement.style.animation = 'none';
  });
  
  await page.goto('/');
  await expect(page).toHaveScreenshot();
});
```

---

## 7. Batch Assertions

### ❌ MALO: Múltiples Esperas

```typescript
test('tabla de usuarios', async ({ page }) => {
  const rows = page.locator('table tbody tr');
  
  // Cada uno es una espera separada
  await expect(rows.nth(0)).toContainText('Juan');
  await expect(rows.nth(1)).toContainText('María');
  await expect(rows.nth(2)).toContainText('Carlos');
  await expect(rows).toHaveCount(3);
});
```

### ✅ BUENO: Batch

```typescript
test('tabla de usuarios', async ({ page }) => {
  const rows = page.locator('table tbody tr');
  
  // Una sola espera, múltiples assertions
  await expect(rows).toHaveCount(3);
  await expect(rows.nth(0)).toContainText('Juan');
  await expect(rows.nth(1)).toContainText('María');
  await expect(rows.nth(2)).toContainText('Carlos');
});
```

---

## Checklist de Optimización

```
[ ] Paralelización configurada (workers: 4)
[ ] Storage state para login (no repetir login)
[ ] Esperas inteligentes (no waitForTimeout)
[ ] Timeouts cortos para tests rápidos
[ ] Screenshots solo en fallas o final
[ ] Animaciones deshabilitadas
[ ] Batch assertions cuando sea posible
[ ] Tests independientes (no dependencies)
```

---

## Medición de Performance

### Ver Tiempo por Test

```bash
npx playwright test --reporter=list

✓ login (1.2s)
✓ dashboard (0.8s)
✓ perfil (1.5s)
Total: 3.5s
```

### Reportes Detallados

```typescript
// playwright.config.ts
export default defineConfig({
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }]
  ]
});
```

```bash
# Ver reporte en HTML
npx playwright show-report
```

---

## Ejemplo: Optimización Completa

### Antes (15 segundos)

```typescript
test('crear y editar producto', async ({ page }) => {
  // Login repetido
  await page.goto('/login');
  await page.fill('[name="email"]', 'admin@ex.com');
  await page.fill('[name="password"]', 'pass');
  await page.click('button');
  await page.waitForURL('/dashboard');
  
  // Screenshots innecesarios
  await page.goto('/productos/nuevo');
  await expect(page).toHaveScreenshot('1.png');
  
  await page.fill('[name="nombre"]', 'Producto');
  await expect(page).toHaveScreenshot('2.png');
  
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);  // Espera arbitraria
  
  await expect(page).toHaveScreenshot('3.png');
});
```

### Después (2 segundos)

```typescript
test('crear y editar producto', async ({ page }) => {
  // Ya autenticado (storage state)
  await page.goto('/productos/nuevo');
  
  // Sin screenshots innecesarios
  await page.fill('[name="nombre"]', 'Producto');
  
  await page.click('button[type="submit"]');
  
  // Espera inteligente
  await expect(page.getByText('Producto creado')).toBeVisible();
});
```

**Mejora**: 7.5x más rápido ⚡

---

## Resumen

| Técnica | Mejora |
|---------|--------|
| Paralelización | 4x (4 workers) |
| Storage State | 2x (sin login repetido) |
| Esperas inteligentes | 1.5x (no timeouts arbitrarios) |
| Sin screenshots | 2x (menos capturas) |
| **Total** | **~7x más rápido** |

---

*Tutorial: Performance - Módulo 01 Playwright Avanzado - FPUNA 2026*
