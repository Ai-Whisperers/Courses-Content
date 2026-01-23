# Módulo 01: Playwright Avanzado
## FPUNA 2026 - Track QA Automation

**Duración**: 4 horas  
**Modalidad**: Teórico-práctico (40% teoría, 60% práctica)

---

## Objetivos de Aprendizaje

Al finalizar este módulo, serás capaz de:

1. ✅ Implementar **network interception y API mocking** para tests aislados
2. ✅ Crear **visual regression tests** para detectar cambios visuales
3. ✅ Manejar **componentes complejos** (modals, iframes, shadow DOM)
4. ✅ Gestionar **autenticación y sesiones** en test suites
5. ✅ Optimizar **performance** de tests para ejecución rápida

---

## 1. Network Interception y API Mocking

### ¿Por Qué Mockear APIs?

**Problema**: Tests que dependen de APIs reales son:
- 🐌 **Lentos** - Esperan respuestas de red
- 💥 **Frágiles** - Fallan si API está caída
- 🎲 **Impredecibles** - Datos cambian constantemente
- 💸 **Costosos** - Consumen cuotas de API

**Solución**: Simular respuestas de API controladas

### Concepto Fundamental

```
Sin Mocking:
Test → UI → API Real → BD → Respuesta → UI

Con Mocking:
Test → UI → API Mockeada → Respuesta Instantánea → UI
                ↑
          Tú controlas la respuesta
```

### Ejemplo Básico: Mockear GET Request

```typescript
import { test, expect } from '@playwright/test';

test('muestra usuarios desde API mockeada', async ({ page }) => {
  // Interceptar todas las llamadas a /api/users
  await page.route('**/api/users', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          nombre: 'María González',
          email: 'maria@fpuna.edu.py',
          rol: 'admin'
        },
        {
          id: 2,
          nombre: 'Carlos Ramírez',
          email: 'carlos@fpuna.edu.py',
          rol: 'estudiante'
        }
      ])
    });
  });

  await page.goto('/usuarios');

  // Verificar que la UI muestra los datos mockeados
  await expect(page.getByText('María González')).toBeVisible();
  await expect(page.getByText('carlos@fpuna.edu.py')).toBeVisible();
});
```

### Mockear Diferentes Escenarios

#### Error 500 del Servidor

```typescript
test('maneja error 500 del servidor correctamente', async ({ page }) => {
  await page.route('**/api/productos', route => {
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Error Interno del Servidor' })
    });
  });

  await page.goto('/productos');

  // Verificar que se muestra mensaje de error
  await expect(page.getByText('No se pudieron cargar los productos')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reintentar' })).toBeVisible();
});
```

#### Respuesta Vacía

```typescript
test('maneja respuesta vacía correctamente', async ({ page }) => {
  await page.route('**/api/productos', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([])
    });
  });

  await page.goto('/productos');
  await expect(page.getByText('No hay productos disponibles')).toBeVisible();
});
```

#### Error de Red (Timeout)

```typescript
test('maneja timeout/error de red', async ({ page }) => {
  // Abortar la request (simula falla de red)
  await page.route('**/api/productos', route => route.abort('failed'));

  await page.goto('/productos');
  await expect(page.getByText('Error de conexión. Verifica tu internet.')).toBeVisible();
});
```

### Modificar Respuestas Reales

```typescript
test('aplica descuento del 50% a todos los productos', async ({ page }) => {
  await page.route('**/api/productos', async (route) => {
    // Obtener respuesta real
    const response = await route.fetch();
    const json = await response.json();

    // Modificar datos
    const productosConDescuento = json.map(producto => ({
      ...producto,
      precio: producto.precio * 0.5  // 50% OFF
    }));

    // Retornar respuesta modificada
    await route.fulfill({
      response,
      json: productosConDescuento
    });
  });

  await page.goto('/productos');
  // Todos los precios deberían estar al 50%
});
```

---

## 2. Visual Regression Testing

### ¿Qué es Visual Regression?

Detectar cambios visuales no intencionales en la UI.

**Ejemplo**:
- Un CSS mal aplicado cambia el color del botón "Comprar"
- Un layout se rompe en mobile
- Una fuente cambia de tamaño

### Screenshot Comparison

```typescript
import { test, expect } from '@playwright/test';

test('la página de inicio se ve correcta', async ({ page }) => {
  await page.goto('/');
  
  // Capturar screenshot y comparar con baseline
  await expect(page).toHaveScreenshot('homepage.png');
});

test('el modal de login se ve correcto', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
  
  // Screenshot solo del modal
  const modal = page.getByRole('dialog');
  await expect(modal).toHaveScreenshot('login-modal.png');
});
```

### Configuración de Tolerancia

```typescript
// playwright.config.ts
export default defineConfig({
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,  // Permitir hasta 100 píxeles diferentes
      threshold: 0.2,      // 20% de diferencia tolerada
    },
  },
});
```

### Screenshot de Página Completa

```typescript
test('página completa con scroll', async ({ page }) => {
  await page.goto('/documentacion');
  
  // Full page screenshot (incluye scroll)
  await expect(page).toHaveScreenshot('documentacion-completa.png', {
    fullPage: true
  });
});
```

### Maskear Elementos Dinámicos

```typescript
test('homepage sin elementos dinámicos', async ({ page }) => {
  await page.goto('/');
  
  await expect(page).toHaveScreenshot('homepage.png', {
    mask: [
      page.locator('.reloj-tiempo-real'),
      page.locator('.contador-visitas'),
      page.getByText(/Última actualización:/)
    ]
  });
});
```

---

## 3. Componentes Complejos

### Modals y Dialogs

```typescript
test('interactuar con modal', async ({ page }) => {
  await page.goto('/perfil');
  
  // Abrir modal
  await page.getByRole('button', { name: 'Editar Perfil' }).click();
  
  // Esperar a que el modal aparezca
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  
  // Llenar formulario dentro del modal
  await modal.getByLabel('Nombre').fill('Juan Pérez');
  await modal.getByLabel('Email').fill('juan@ejemplo.com');
  
  // Guardar
  await modal.getByRole('button', { name: 'Guardar' }).click();
  
  // Verificar que el modal se cerró
  await expect(modal).not.toBeVisible();
});
```

### iFrames

```typescript
test('interactuar con contenido en iframe', async ({ page }) => {
  await page.goto('/formulario-pago');
  
  // Acceder al iframe
  const paymentFrame = page.frameLocator('iframe[name="payment-frame"]');
  
  // Interactuar con elementos dentro del iframe
  await paymentFrame.getByLabel('Número de Tarjeta').fill('4111111111111111');
  await paymentFrame.getByLabel('CVV').fill('123');
  await paymentFrame.getByLabel('Fecha de Expiración').fill('12/25');
  
  // Botón fuera del iframe
  await page.getByRole('button', { name: 'Pagar' }).click();
});
```

### Shadow DOM

```typescript
test('interactuar con Shadow DOM', async ({ page }) => {
  await page.goto('/componentes-web');
  
  // Penetrar en Shadow DOM
  const shadowHost = page.locator('custom-dropdown');
  const shadowRoot = shadowHost.locator('>>> select');  // >>> penetra shadow DOM
  
  await shadowRoot.selectOption('opcion-2');
  
  // O usando evaluateAll
  await page.locator('custom-dropdown').evaluateAll((elements) => {
    elements.forEach(el => {
      const shadow = el.shadowRoot;
      const select = shadow?.querySelector('select');
      if (select) select.value = 'opcion-2';
    });
  });
});
```

---

## 4. Autenticación y Sesiones

### Problema: Login en Cada Test

```typescript
// ❌ Malo: Login repetido en cada test
test('ver perfil', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'usuario@fpuna.edu.py');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.goto('/perfil');
  // ... test
});

test('editar perfil', async ({ page }) => {
  // Repetir login OTRA VEZ 😢
  await page.goto('/login');
  // ...
});
```

### Solución 1: Storage State (Recomendado)

```typescript
// auth.setup.ts - Ejecutar UNA VEZ antes de todos los tests
import { test as setup } from '@playwright/test';

setup('autenticar usuario', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'usuario@fpuna.edu.py');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  // Esperar a que el login termine
  await page.waitForURL('/dashboard');
  
  // Guardar estado de autenticación
  await page.context().storageState({ path: 'auth.json' });
});
```

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    // Setup project
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    
    // Tests que usan autenticación
    {
      name: 'logged-in',
      use: { storageState: 'auth.json' },
      dependencies: ['setup']
    }
  ]
});
```

```typescript
// Ahora los tests ya están autenticados ✅
test('ver perfil', async ({ page }) => {
  await page.goto('/perfil');  // Ya está logueado!
  await expect(page.getByText('usuario@fpuna.edu.py')).toBeVisible();
});

test('editar configuración', async ({ page }) => {
  await page.goto('/configuracion');  // Ya está logueado!
  // ...
});
```

### Solución 2: Fixture Personalizado

```typescript
// fixtures/authenticated-page.ts
import { test as base } from '@playwright/test';

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Login
    await page.goto('/login');
    await page.fill('[name="email"]', 'usuario@fpuna.edu.py');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
    
    // Usar la página autenticada
    await use(page);
  }
});

// tests/perfil.spec.ts
import { test } from '../fixtures/authenticated-page';

test('ver perfil', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/perfil');
  // Ya está autenticado
});
```

---

## 5. Optimización de Performance

### Tests Lentos vs. Rápidos

```
❌ Lento:
- 100 tests ejecutados en serie: 10 minutos
- Cada test espera elementos innecesariamente
- Screenshots en cada paso

✅ Rápido:
- 100 tests en paralelo: 2 minutos
- Esperas optimizadas
- Screenshots solo en fallas
```

### Paralelización

```typescript
// playwright.config.ts
export default defineConfig({
  workers: 4,  // 4 tests en paralelo
  fullyParallel: true,
});
```

### Reutilizar Contextos de Navegador

```typescript
// Malo ❌: Crear nuevo navegador para cada test
test('test 1', async ({ page }) => {
  // Nuevo navegador se crea aquí
});

test('test 2', async ({ page }) => {
  // Otro navegador nuevo se crea aquí
});

// Bueno ✅: Reutilizar navegador
import { test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });
// Tests en el mismo archivo reutilizan navegador cuando es posible
```

### Timeouts Optimizados

```typescript
// Reducir timeout para tests rápidos
test('carga homepage rápida', async ({ page }) => {
  await page.goto('/', { timeout: 5000 });  // 5s en lugar de 30s default
  await expect(page.locator('h1')).toBeVisible({ timeout: 2000 });
});
```

### Evitar Esperas Innecesarias

```typescript
// Malo ❌
await page.click('button');
await page.waitForTimeout(3000);  // Esperar arbitrariamente 3s

// Bueno ✅
await page.click('button');
await page.waitForLoadState('networkidle');  // Esperar hasta que red esté idle
// O mejor aún:
await expect(page.locator('.success-message')).toBeVisible();  // Esperar elemento específico
```

---

## Usando OpenCode para Generar Tests

### Prompt Efectivo

```
Genera tests de Playwright con las siguientes características:

Página: /dashboard
Funcionalidades a testear:
1. Network mocking: Mockear GET /api/stats para mostrar 3 estadísticas
2. Visual regression: Screenshot del dashboard completo
3. Modal: Abrir modal de "Crear Proyecto" y llenar formulario
4. Autenticación: Usar storageState para login

Requisitos:
- TypeScript
- Comentarios en español
- Buenas prácticas de Playwright
- Selectores por rol cuando sea posible
```

### OpenCode Genera:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.use({ storageState: 'auth.json' });

  test('muestra estadísticas correctas', async ({ page }) => {
    // Network mocking
    await page.route('**/api/stats', route => {
      route.fulfill({
        status: 200,
        json: {
          totalProyectos: 12,
          tareasCompletadas: 45,
          colaboradores: 8
        }
      });
    });

    await page.goto('/dashboard');

    // Verificar estadísticas mockeadas
    await expect(page.getByText('12 Proyectos')).toBeVisible();
    await expect(page.getByText('45 Tareas Completadas')).toBeVisible();
    await expect(page.getByText('8 Colaboradores')).toBeVisible();

    // Visual regression
    await expect(page).toHaveScreenshot('dashboard.png');
  });

  test('crear nuevo proyecto desde modal', async ({ page }) => {
    await page.goto('/dashboard');

    // Abrir modal
    await page.getByRole('button', { name: 'Nuevo Proyecto' }).click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // Llenar formulario
    await modal.getByLabel('Nombre del Proyecto').fill('Proyecto Test');
    await modal.getByLabel('Descripción').fill('Proyecto de prueba automatizada');
    await modal.getByRole('button', { name: 'Crear' }).click();

    // Verificar cierre del modal y mensaje de éxito
    await expect(modal).not.toBeVisible();
    await expect(page.getByText('Proyecto creado exitosamente')).toBeVisible();
  });
});
```

---

## Resumen del Módulo

Hemos cubierto:

✅ **Network Mocking** - Aislar tests de APIs reales  
✅ **Visual Testing** - Detectar cambios visuales  
✅ **Componentes Complejos** - Modals, iframes, shadow DOM  
✅ **Autenticación** - Storage state para eficiencia  
✅ **Performance** - Paralelización y optimización  

### Próximos Pasos

1. **Ejercicio práctico** - `EXERCISE.md`
2. **Quiz de evaluación** - `QUIZ.md`
3. **Módulo 02** - API Testing profundo

---

## Recursos Adicionales

- 📚 [Playwright Docs - Network Mocking](https://playwright.dev/documentacion/mock)
- 📚 [Playwright Docs - Screenshots](https://playwright.dev/documentacion/screenshots)
- 📚 [Playwright Docs - Authentication](https://playwright.dev/documentacion/auth)
- 🎥 [Video: Advanced Playwright Patterns](https://www.youtube.com/watch?v=...)

---

*Módulo 01 - Playwright Avanzado - FPUNA 2026*
