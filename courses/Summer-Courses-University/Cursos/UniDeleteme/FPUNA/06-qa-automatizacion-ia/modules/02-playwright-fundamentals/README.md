# Módulo 2: Playwright Fundamentals
## Dominando las Herramientas Esenciales

---

## Información del Módulo

| Campo | Detalle |
|-------|---------|
| **Duración** | 2 horas |
| **Tipo** | Práctico |
| **Prerrequisitos** | Módulo 1 completado |

---

## Objetivos de Aprendizaje

Al finalizar este módulo, los participantes podrán:

1. Utilizar todos los tipos de locators de Playwright
2. Ejecutar acciones comunes: click, fill, select, hover
3. Escribir assertions efectivas con expect
4. Entender el sistema de auto-wait
5. Usar el Playwright Inspector para debugging

---

## Contenido

### 2.1 Sistema de Locators (25 min)

#### Jerarquía de Selectores (Mejor → Peor)

```
RECOMENDADO                    EVITAR
─────────────────────────────────────────
1. getByRole()        ←→      Selectores CSS complejos
2. getByTestId()      ←→      XPath
3. getByText()        ←→      IDs dinámicos
4. getByLabel()       ←→      Clases de estilo
5. getByPlaceholder() ←→      Selectores frágiles
6. locator() CSS      ←→      nth-child complejos
```

#### getByRole - El Más Poderoso

```typescript
// Botones
await page.getByRole('button', { name: 'Enviar' }).click();
await page.getByRole('button', { name: /submit/i }).click(); // regex

// Links
await page.getByRole('link', { name: 'Inicio' }).click();

// Inputs
await page.getByRole('textbox', { name: 'Email' }).fill('test@test.com');

// Checkboxes y Radio
await page.getByRole('checkbox', { name: 'Acepto términos' }).check();
await page.getByRole('radio', { name: 'Opción A' }).click();

// Headings
await expect(page.getByRole('heading', { name: 'Bienvenido' })).toBeVisible();

// Roles comunes
// button, link, textbox, checkbox, radio, combobox,
// listbox, option, heading, img, navigation, main
```

#### getByTestId - Para Testing

```typescript
// HTML: <button data-testid="submit-btn">Enviar</button>
await page.getByTestId('submit-btn').click();

// Configurar atributo personalizado en playwright.config.ts
export default defineConfig({
  use: {
    testIdAttribute: 'data-qa', // usar data-qa en vez de data-testid
  },
});
```

#### getByText y getByLabel

```typescript
// getByText - buscar por texto visible
await page.getByText('Bienvenido a la aplicación').click();
await page.getByText(/precio: \$\d+/i).isVisible(); // regex

// getByLabel - para inputs con label
await page.getByLabel('Correo electrónico').fill('test@test.com');
await page.getByLabel('Contraseña').fill('secret123');
```

#### getByPlaceholder

```typescript
// HTML: <input placeholder="Buscar productos...">
await page.getByPlaceholder('Buscar productos...').fill('laptop');
```

#### Locator CSS (Cuando Necesario)

```typescript
// Selector CSS simple
await page.locator('#login-form').isVisible();
await page.locator('.btn-primary').click();
await page.locator('input[name="email"]').fill('test@test.com');

// Combinando selectores
await page.locator('form.login input[type="email"]').fill('test@test.com');

// Pseudo-selectores
await page.locator('button:has-text("Enviar")').click();
await page.locator('div:has(> span.error)').isVisible();
```

#### Encadenamiento y Filtros

```typescript
// Encadenar locators
await page.locator('.card').getByRole('button', { name: 'Comprar' }).click();

// Filtrar por texto
await page.locator('.product').filter({ hasText: 'Oferta' }).click();

// Filtrar por hijo
await page.locator('.card').filter({
  has: page.getByRole('heading', { name: 'Premium' })
}).click();

// nth - obtener elemento por índice
await page.locator('.item').nth(0).click();  // primero
await page.locator('.item').first().click(); // primero
await page.locator('.item').last().click();  // último
```

---

### 2.2 Acciones en Playwright (20 min)

#### Clicks y Variaciones

```typescript
// Click simple
await page.getByRole('button', { name: 'Enviar' }).click();

// Doble click
await page.locator('.editable').dblclick();

// Click derecho (context menu)
await page.locator('.item').click({ button: 'right' });

// Click con modificadores
await page.locator('a').click({ modifiers: ['Control'] }); // Ctrl+Click
await page.locator('a').click({ modifiers: ['Shift'] });   // Shift+Click

// Click en posición específica
await page.locator('.canvas').click({ position: { x: 100, y: 50 } });

// Force click (ignora visibilidad)
await page.locator('.hidden-btn').click({ force: true });
```

#### Escribir Texto

```typescript
// fill - reemplaza contenido
await page.getByLabel('Email').fill('nuevo@email.com');

// type - simula escritura (más lento)
await page.getByLabel('Email').type('n-u-e-v-o', { delay: 100 });

// pressSequentially - letra por letra
await page.getByLabel('Email').pressSequentially('test', { delay: 50 });

// Limpiar input
await page.getByLabel('Email').clear();
await page.getByLabel('Email').fill(''); // alternativa
```

#### Teclas Especiales

```typescript
// Presionar tecla
await page.getByLabel('Buscar').press('Enter');
await page.keyboard.press('Escape');
await page.keyboard.press('Tab');

// Combinaciones
await page.keyboard.press('Control+a'); // Seleccionar todo
await page.keyboard.press('Control+c'); // Copiar
await page.keyboard.press('Control+v'); // Pegar

// Teclas especiales
// Enter, Tab, Escape, Backspace, Delete
// ArrowUp, ArrowDown, ArrowLeft, ArrowRight
// F1-F12, Control, Shift, Alt, Meta
```

#### Select y Checkboxes

```typescript
// Select dropdown
await page.getByLabel('País').selectOption('paraguay');
await page.getByLabel('País').selectOption({ label: 'Paraguay' });
await page.getByLabel('País').selectOption({ index: 2 });

// Multi-select
await page.getByLabel('Idiomas').selectOption(['es', 'en', 'pt']);

// Checkbox
await page.getByRole('checkbox', { name: 'Acepto' }).check();
await page.getByRole('checkbox', { name: 'Acepto' }).uncheck();
await page.getByRole('checkbox', { name: 'Acepto' }).setChecked(true);

// Radio
await page.getByRole('radio', { name: 'Opción A' }).check();
```

#### Hover y Focus

```typescript
// Hover
await page.locator('.menu-item').hover();
await page.locator('.tooltip-trigger').hover();

// Focus
await page.getByLabel('Email').focus();
await page.getByRole('button').blur();
```

#### Archivos

```typescript
// Subir archivo
await page.getByLabel('Subir CV').setInputFiles('path/to/file.pdf');

// Múltiples archivos
await page.getByLabel('Fotos').setInputFiles([
  'photo1.jpg',
  'photo2.jpg'
]);

// Limpiar selección
await page.getByLabel('Archivo').setInputFiles([]);
```

---

### 2.3 Assertions con Expect (20 min)

#### Assertions de Página

```typescript
import { test, expect } from '@playwright/test';

// Título de la página
await expect(page).toHaveTitle('Mi Aplicación');
await expect(page).toHaveTitle(/aplicación/i); // regex

// URL
await expect(page).toHaveURL('https://example.com/dashboard');
await expect(page).toHaveURL(/dashboard/);
```

#### Assertions de Locator

```typescript
// Visibilidad
await expect(page.getByRole('button')).toBeVisible();
await expect(page.locator('.error')).toBeHidden();
await expect(page.locator('.modal')).not.toBeVisible();

// Texto
await expect(page.locator('h1')).toHaveText('Bienvenido');
await expect(page.locator('h1')).toContainText('Bien');
await expect(page.locator('.items')).toHaveText(['Item 1', 'Item 2']);

// Atributos
await expect(page.getByRole('link')).toHaveAttribute('href', '/home');
await expect(page.locator('input')).toHaveAttribute('type', 'email');

// Clases CSS
await expect(page.locator('button')).toHaveClass('btn-primary');
await expect(page.locator('button')).toHaveClass(/active/);

// Valores de input
await expect(page.getByLabel('Email')).toHaveValue('test@test.com');
await expect(page.getByLabel('Email')).toBeEmpty();

// Estado
await expect(page.getByRole('button')).toBeEnabled();
await expect(page.getByRole('button')).toBeDisabled();
await expect(page.getByRole('checkbox')).toBeChecked();
await expect(page.getByRole('checkbox')).not.toBeChecked();

// Focus
await expect(page.getByLabel('Email')).toBeFocused();

// Conteo
await expect(page.locator('.item')).toHaveCount(5);
```

#### Soft Assertions

```typescript
// Soft assertions no detienen el test
await expect.soft(page.locator('h1')).toHaveText('Título');
await expect.soft(page.locator('.price')).toContainText('$99');

// El test continúa aunque falle, reporta al final
```

#### Custom Matchers

```typescript
// Esperar condición custom
await expect(async () => {
  const count = await page.locator('.item').count();
  expect(count).toBeGreaterThan(5);
}).toPass({ timeout: 10000 });

// Polling assertion
await expect.poll(async () => {
  const response = await page.request.get('/api/status');
  return response.json();
}).toMatchObject({ ready: true });
```

---

### 2.4 Auto-Wait y Waits Explícitos (15 min)

#### Auto-Wait de Playwright

```
PLAYWRIGHT ESPERA AUTOMÁTICAMENTE:
─────────────────────────────────
✅ Elemento attached al DOM
✅ Elemento visible
✅ Elemento estable (no animando)
✅ Elemento habilitado
✅ Elemento recibe eventos

= NO NECESITAS sleep() NI waitFor() en la mayoría de casos
```

#### Cuando SÍ Usar Waits

```typescript
// Esperar elemento específico
await page.waitForSelector('.loading-done');

// Esperar que elemento desaparezca
await page.waitForSelector('.spinner', { state: 'hidden' });

// Esperar navegación
await page.waitForURL('**/dashboard');
await page.waitForURL(/\/dashboard/);

// Esperar carga de página
await page.waitForLoadState('domcontentloaded');
await page.waitForLoadState('load');
await page.waitForLoadState('networkidle');

// Esperar respuesta de red
await page.waitForResponse('**/api/users');
await page.waitForResponse(response =>
  response.url().includes('/api/') && response.status() === 200
);

// Esperar request
await page.waitForRequest('**/api/submit');
```

#### Timeouts

```typescript
// Timeout por acción
await page.click('button', { timeout: 5000 });

// Timeout en expect
await expect(page.locator('.slow')).toBeVisible({ timeout: 30000 });

// Timeout global en config
export default defineConfig({
  timeout: 30000,        // timeout de test
  expect: {
    timeout: 5000,       // timeout de assertions
  },
});
```

---

### 2.5 Screenshots y Videos (10 min)

#### Screenshots

```typescript
// Screenshot de página completa
await page.screenshot({ path: 'screenshot.png' });

// Screenshot de área visible
await page.screenshot({ path: 'visible.png', fullPage: false });

// Screenshot de elemento
await page.locator('.chart').screenshot({ path: 'chart.png' });

// En base64
const buffer = await page.screenshot();

// Con opciones
await page.screenshot({
  path: 'styled.png',
  fullPage: true,
  animations: 'disabled', // sin animaciones
  mask: [page.locator('.private-data')], // ocultar elementos
});
```

#### Videos (en Config)

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    video: 'on', // siempre grabar
    // video: 'on-first-retry',  // solo en retry
    // video: 'retain-on-failure', // solo si falla
  },
});
```

#### Trace Viewer

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    trace: 'on-first-retry', // recomendado
    // trace: 'on', // siempre
    // trace: 'retain-on-failure', // solo si falla
  },
});

// Ver trace
// npx playwright show-trace trace.zip
```

---

### 2.6 Debugging con Inspector (20 min)

#### Playwright Inspector

```bash
# Ejecutar en modo debug
npx playwright test --debug

# Debug de test específico
npx playwright test login.spec.ts --debug

# Pausar en punto específico
```

```typescript
test('debug example', async ({ page }) => {
  await page.goto('/');

  // Pausar aquí para inspeccionar
  await page.pause();

  await page.click('button');
});
```

#### Codegen - Grabar Tests

```bash
# Abrir grabador
npx playwright codegen

# Con URL específica
npx playwright codegen https://demo.playwright.dev

# Grabar para dispositivo móvil
npx playwright codegen --device="iPhone 13"

# Guardar en archivo
npx playwright codegen --output tests/recorded.spec.ts
```

#### Console Logs

```typescript
// Escuchar console.log del navegador
page.on('console', msg => {
  console.log(`Browser: ${msg.type()}: ${msg.text()}`);
});

// Solo errores
page.on('console', msg => {
  if (msg.type() === 'error') {
    console.log(`Error: ${msg.text()}`);
  }
});
```

#### Network Debugging

```typescript
// Log de requests
page.on('request', request => {
  console.log(`>> ${request.method()} ${request.url()}`);
});

// Log de responses
page.on('response', response => {
  console.log(`<< ${response.status()} ${response.url()}`);
});
```

---

## Resumen de Comandos

### Locators Cheatsheet

| Método | Uso | Ejemplo |
|--------|-----|---------|
| `getByRole` | Roles ARIA | `getByRole('button', { name: 'Submit' })` |
| `getByTestId` | Atributo data-testid | `getByTestId('login-btn')` |
| `getByText` | Texto visible | `getByText('Bienvenido')` |
| `getByLabel` | Label de input | `getByLabel('Email')` |
| `getByPlaceholder` | Placeholder | `getByPlaceholder('Buscar...')` |
| `locator` | CSS selector | `locator('input[name="email"]')` |

### Actions Cheatsheet

| Acción | Método | Ejemplo |
|--------|--------|---------|
| Click | `click()` | `await btn.click()` |
| Doble click | `dblclick()` | `await elem.dblclick()` |
| Escribir | `fill()` | `await input.fill('texto')` |
| Tecla | `press()` | `await input.press('Enter')` |
| Select | `selectOption()` | `await select.selectOption('value')` |
| Check | `check()` | `await checkbox.check()` |
| Hover | `hover()` | `await elem.hover()` |

### Assertions Cheatsheet

| Assertion | Uso |
|-----------|-----|
| `toBeVisible()` | Elemento visible |
| `toBeHidden()` | Elemento oculto |
| `toHaveText()` | Texto exacto |
| `toContainText()` | Contiene texto |
| `toHaveValue()` | Valor de input |
| `toBeEnabled()` | Habilitado |
| `toBeDisabled()` | Deshabilitado |
| `toBeChecked()` | Checkbox marcado |
| `toHaveCount()` | Cantidad de elementos |
| `toHaveURL()` | URL de página |
| `toHaveTitle()` | Título de página |

---

## Puntos Clave

1. **Prefer getByRole:** Es el más resiliente y accesible
2. **Auto-wait es tu amigo:** Evita sleeps innecesarios
3. **Usa assertions específicas:** No solo toBeVisible
4. **Inspector para debugging:** npx playwright test --debug
5. **Codegen para empezar:** Graba y luego refactoriza

---

*Siguiente módulo: Page Object Model*
