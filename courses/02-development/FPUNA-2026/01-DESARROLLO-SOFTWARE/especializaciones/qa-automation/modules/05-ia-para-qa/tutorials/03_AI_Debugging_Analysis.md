# Tutorial: AI-Assisted Debugging y Analysis
## Módulo 05: IA para QA

**Duración**: 50 minutos  
**Nivel**: Intermedio-Avanzado  
**Prerequisitos**: Modules 01-04, OpenCode configurado

---

## El Problema: Tests que Fallan en Producción

### Escenario Real

```
❌ DEBUGGING MANUAL:
Test falla en CI con error críptico
Developer busca en logs por 1-2 horas
Finalmente encuentra: timeout por elemento no visible

✅ DEBUGGING CON IA:
Copiar stack trace a OpenCode
IA identifica el problema en 30 segundos
Obtiene 3 posibles soluciones
Aplica y verifica
```

### Tipos Comunes de Errores en Tests

| Error | Síntoma | Causa Común |
|-------|---------|------------|
| Timeout | `page.click: Timeout 30000ms` | Elemento no existe o está oculto |
| Flaky | Test pasa a veces, falla otras | Race condition, falta de wait |
| Assertion | `expect(x).toEqual(y)` falla | Datos incorrectos, selector mal |
| Navigation | Página no cambia después de click | Validación del formulario fallida |
| Selector | Element not found | HTML cambió, selector desactualizado |

---

## Parte 1: Debugging de Timeout

### Ejemplo Real: Elemento No Aparece

**Error en CI**:
```
Error: page.click: Timeout 30000ms exceeded.
Locator: 'button[type="submit"]'
Call log:
  - waiting for locator('button[type="submit"]')
  - locator did not resolve to any element
```

**Test fallido**:
```typescript
test('enviar formulario', async ({ page }) => {
  await page.goto('/formulario');
  await page.fill('input[name="email"]', 'test@fpuna.edu.py');
  await page.click('button[type="submit"]');  // ❌ Falla aquí
});
```

**Prompt a OpenCode**:
```
Mi test de Playwright falla con este error:

ERROR:
Error: page.click: Timeout 30000ms exceeded.
Locator: 'button[type="submit"]'

CONTEXTO:
- Test local: PASA ✅
- Test en CI (Ubuntu): FALLA ❌
- Formulario de login

¿Cuál es el problema exacto?
¿Cómo se diagnostica?
¿Cuál es la solución?
```

**Respuesta de OpenCode**:
```
ANÁLISIS:
El botón no existe o está en estado `disabled`.

POSIBLES CAUSAS:
1. ✅ MÁS PROBABLE: Validación del formulario fallida
   - Email no cumple validación
   - Otro campo requerido vacío
   - JavaScript para habilitación del botón no ejecutó

2. Estilos CSS ocultan el botón
3. El DOM todavía está cargando

DIAGNÓSTICO:
```typescript
// ❌ Antes (sin debugging)
await page.click('button[type="submit"]');

// ✅ Después (diagnosticando)
// 1. Verificar que el botón existe
const button = page.locator('button[type="submit"]');
console.log('¿Botón existe?', await button.count());

// 2. Verificar estado
console.log('¿Botón visible?', await button.isVisible());
console.log('¿Botón habilitado?', await button.isEnabled());

// 3. Ver atributos
const disabled = await button.getAttribute('disabled');
console.log('¿Está deshabilitado?', disabled);
```

SOLUCIÓN:
Asegurar que todos los campos requeridos estén llenos:

```typescript
test('enviar formulario', async ({ page }) => {
  await page.goto('/formulario');
  
  // 📋 Llenar TODOS los campos requeridos
  await page.fill('input[name="email"]', 'test@fpuna.edu.py');
  await page.fill('input[name="password"]', 'SecurePass123!');
  await page.fill('input[name="nombre"]', 'Test User');
  
  // ✅ Verificar que botón está habilitado
  const button = page.locator('button[type="submit"]');
  await expect(button).toBeEnabled();
  
  // Click
  await button.click();
  
  // Esperar redirección
  await expect(page).toHaveURL(/.*dashboard/);
});
```

MEJOR PRÁCTICA:
Usar helpers para validación:

```typescript
async function fillForm(page, datos) {
  for (const [key, value] of Object.entries(datos)) {
    const field = page.locator(`[name="${key}"]`);
    
    // Debugeo automático
    if (!(await field.isVisible())) {
      throw new Error(`Campo ${key} no visible`);
    }
    
    await field.fill(String(value));
  }
}
```
```

---

## Parte 2: Debugging de Flaky Tests

### Problema: Test Intermitente

**Síntomas**:
- Test pasa el 70% de las veces
- Falla sin patrón claro
- Error: `expect(received).toContain(expected)`

**Test fallido**:
```typescript
test('notificación de éxito', async ({ page }) => {
  await page.goto('/comprar');
  await page.click('button.comprar');
  
  const message = await page.textContent('.success-message');
  expect(message).toContain('¡Compra exitosa!');  // ❌ A veces undefined
});
```

**Prompt a OpenCode**:
```
Test flaky (intermitente):

A veces PASA ✅
A veces FALLA ❌ con:
"Expected substring: '¡Compra exitosa!'
Received: ''"

CODE:
[pegar test]

¿Por qué falla intermitentemente?
¿Cómo diagnosticar?
¿Solución permanente?
```

**Respuesta de OpenCode**:
```
ROOT CAUSE: Race Condition

El test lee `.success-message` antes de que aparezca (generado por JavaScript)

CAUSA TÉCNICA:
```
1. Click en botón
2. Frontend hace petición API (100-500ms)
3. Test intenta leer mensaje INMEDIATAMENTE (❌ No existe aún)
4. Mensaje aparece después de 200ms
```

DIAGNÓSTICO:
```typescript
// ❌ PROBLEMA: Lectura inmediata sin wait
const message = await page.textContent('.success-message');

// ✅ SOLUCIÓN 1: Esperar que aparezca (RECOMENDADO)
await expect(page.locator('.success-message')).toBeVisible();
const message = await page.textContent('.success-message');

// ✅ SOLUCIÓN 2: Usar expect directamente (MÁS SIMPLE)
await expect(page.locator('.success-message')).toContainText('¡Compra exitosa!');

// ✅ SOLUCIÓN 3: Configurar timeout explícito
const message = await page.textContent('.success-message', { timeout: 5000 });
```

CÓDIGO FINAL (Robusto):
```typescript
test('notificación de éxito', async ({ page }) => {
  await page.goto('/comprar');
  await page.click('button.comprar');
  
  // ✅ Esperar que aparezca la notificación
  const notification = page.locator('.success-message');
  await expect(notification).toBeVisible();
  
  // ✅ Luego validar contenido
  await expect(notification).toContainText('¡Compra exitosa!');
});
```

REGLA DE ORO:
Usar `expect()` con locators para auto-waiting automático.
Nunca: `textContent()` + `expect()`
Siempre: `expect(locator).toContainText()`
```

---

## Parte 3: Debugging de Selectores Rotos

### Problema: Selector No Encuentra Elemento

**Error**:
```
Error: locator('div.product-card').click
  ===================== logs ===========================
  waiting for locator('div.product-card')
  locator did not resolve to any element
```

**Causas Posibles**:
1. HTML cambió (clase renamed)
2. Elemento se carga dinámicamente
3. Está dentro de un iframe/shadow DOM
4. Selector muy específico

**Diagnóstico con IA**:

**Prompt**:
```
Selector `div.product-card` no funciona en Playwright.

HTML ACTUAL DE LA PÁGINA:
<div class="product-grid">
  <div class="item">
    <h2>Laptop Dell</h2>
    <button>Comprar</button>
  </div>
</div>

SELECTOR VIEJO: div.product-card
HTML NUEVO: div.item

¿Cómo identificar cambios de selectores rápidamente?
¿Alternativas más robustas?
```

**Respuesta de OpenCode**:
```
PROBLEMA IDENTIFICADO:
Clase cambió de `product-card` a `item`

SOLUCIONES POR ROBUSTEZ:

1. ⭐ MEJOR: Usar getByRole() (Accessibility First)
```typescript
// Por rol HTML (MÁS ROBUSTO)
await page.getByRole('button', { name: 'Comprar' }).click();
// Funciona aunque cambien clases CSS
```

2. ✅ BUENO: getByText() (Buscar por contenido)
```typescript
await page.getByText('Comprar').click();
// Funciona mientras el botón tenga ese texto
```

3. ✅ ACEPTABLE: getByLabel() (Para inputs)
```typescript
await page.getByLabel('Email').fill('test@fpuna.edu.py');
```

4. ⚠️ ÚLTIMO RECURSO: getByTestId() (Requiere cambio en HTML)
```typescript
// En HTML: <button data-testid="buy-button">Comprar</button>
await page.getByTestId('buy-button').click();
```

SELECTORS A EVITAR:
```typescript
❌ page.click('div.col-md-4 > div:nth-child(2) button')
❌ page.click('#main-container > .product > button')
❌ page.click('[data-type="product"][data-id="123"]')
```

REFACTORIZAR SELECTORES LEGACY:
```typescript
// ❌ Antes (frágil)
await page.click('div.form-group:nth-child(3) input');

// ✅ Después (robusto)
await page.getByLabel('Contraseña').fill('MiPassword');
```
```

---

## Parte 4: Debugging de Assertions

### Problema: Assertion Fallida

**Error**:
```
expect(received).toBe(expected)
Expected: 'Bienvenido Juan'
Received: 'Bienvenido'
```

**Test**:
```typescript
test('mostrar nombre del usuario', async ({ page }) => {
  await login(page);
  const welcome = await page.textContent('.welcome-message');
  expect(welcome).toBe('Bienvenido Juan');  // ❌ Falla
});
```

**Prompt a OpenCode**:
```
Assertion falla, pero el test visual se ve correcto.

ESPERADO: 'Bienvenido Juan'
REAL: 'Bienvenido'

Elemento existe y es visible en navegador.
¿Por qué falla la assertion?
¿Cómo debuggear?
```

**Respuesta de OpenCode**:
```
CAUSAS POSIBLES:

1. ✅ MÁS PROBABLE: Nombre no ha cargado aún (async)
   El usuario se carga después del textContent()

2. Espacios en blanco adicionales o saltos de línea

3. El elemento contiene múltiples elementos hijos

DIAGNÓSTICO:
```typescript
// 1. Verificar qué hay realmente
const welcome = await page.textContent('.welcome-message');
console.log('CONTENIDO ACTUAL:', JSON.stringify(welcome));
console.log('LARGO:', welcome?.length);

// 2. Buscar espacios ocultos
console.log('CON REGEX:', welcome?.replace(/\\s+/g, ' '));

// 3. Ver elemento completo
console.log('HTML:', await page.locator('.welcome-message').innerHTML());
```

SOLUCIONES:

```typescript
// ✅ SOLUCIÓN 1: Esperar que el nombre cargue
test('mostrar nombre del usuario', async ({ page }) => {
  await login(page);
  
  // Esperar que el nombre específico aparezca
  await expect(page.locator('.welcome-message'))
    .toContainText('Bienvenido Juan');
});

// ✅ SOLUCIÓN 2: Limpiar espacios
test('mostrar nombre del usuario', async ({ page }) => {
  await login(page);
  const welcome = await page.textContent('.welcome-message');
  const cleaned = welcome?.trim().replace(/\\s+/g, ' ');
  expect(cleaned).toContain('Bienvenido Juan');
});

// ✅ SOLUCIÓN 3: Assert más flexible
test('mostrar nombre del usuario', async ({ page }) => {
  await login(page);
  await expect(page.locator('.welcome-message')).toContainText('Juan');
  // Verifica que Juan esté en el mensaje, sin ser exacto
});
```

BEST PRACTICE:
Usa `toContainText()` para assertions de contenido
Usa `toBe()` solo para valores exactos
```

---

## Parte 5: Análisis de Root Causes

### Cuando Algo Funciona Local Pero Falla en CI

**Síntomas**:
- Test PASA en tu máquina
- Test FALLA en GitHub Actions

**Prompt a OpenCode**:
```
Test pasa LOCAL pero falla en CI:

TEST RESULTADO:
Local (Windows): ✅ PASA
CI (Ubuntu): ❌ FALLA

ERROR EN CI:
page.locator('select').selectOption(): Timeout 30000ms exceeded

CONFIGURACIÓN:
playwright.config.ts:
  use: { headless: true }

¿Cuál es la diferencia entre local y CI?
¿Cómo diagnosticar?
```

**Respuesta de OpenCode**:
```
DIFERENCIAS ENTRE LOCAL Y CI:

1. SISTEMA OPERATIVO
   Local: Windows
   CI: Linux
   → Diferencias en fonts, rendering

2. RESOLVER PANTALLA
   Local: 1920x1080
   CI: 1280x720 (headless)
   → Elementos pueden estar fuera de viewport

3. CONEXIÓN
   Local: Rápida
   CI: Variable
   → Timeouts insuficientes

4. NAVEGADORES
   Local: Puede estar instalado localmente
   CI: Versión específica en imagen Docker

SOLUCIÓN INTEGRAL:
```typescript
// playwright.config.ts
export default defineConfig({
  // 1. Viewport consistente
  use: {
    viewport: { width: 1280, height: 720 },
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },

  // 2. Timeouts MAYORES en CI
  timeout: process.env.CI ? 60000 : 30000,
  expect: { timeout: process.env.CI ? 10000 : 5000 },

  // 3. Retries solo en CI (para flakiness)
  retries: process.env.CI ? 2 : 0,

  // 4. Artifacts solo en CI
  use: {
    screenshot: process.env.CI ? 'only-on-failure' : 'off',
    video: process.env.CI ? 'retain-on-failure' : 'off',
    trace: process.env.CI ? 'retain-on-failure' : 'off',
  },
});

// .github/workflows/test.yml
- name: Run Tests
  env:
    CI: true  // Activar configuración de CI
  run: npx playwright test
```

MONITOREO:
```typescript
test.beforeEach(async ({ page }) => {
  // Log de contexto para debugging
  console.log('📊 Test Context:');
  console.log(`  Platform: ${process.platform}`);
  console.log(`  Viewport: ${page.viewportSize()}`);
  console.log(`  Base URL: ${page.url()}`);
});
```
```

---

## Resumen de Debugging

| Problema | Diagnóstico | Solución |
|----------|-------------|----------|
| **Timeout** | ¿Elemento existe? | Esperar con `expect()` |
| **Flaky** | Race condition | Auto-wait con `toBeVisible()` |
| **Selector Roto** | HTML cambió | Cambiar a `getByRole()` |
| **Assertion Falla** | Contenido incorrecto | Usar `toContainText()` |
| **Local ≠ CI** | Diferencias env | Configuración por ambiente |

---

## Tools para Debugging

### Playwright Inspector
```bash
PWDEBUG=1 npx playwright test  # Debug interactivo
```

### Trace Viewer
```bash
npx playwright show-trace trace.zip  # Ver qué pasó
```

### Screenshots & Videos
```typescript
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'retain-on-failure',
}
```

---

*Tutorial: AI Debugging Analysis - Módulo 05 IA para QA - FPUNA 2026*
