# Tutorial: Network Interception y API Mocking
## Módulo 01: Playwright Avanzado

**Duración**: 45 minutos  
**Nivel**: Intermedio  
**Prerequisitos**: Conceptos básicos de Playwright

---

## ¿Por Qué Mockear APIs?

### El Problema Real

Imagina que estás escribiendo tests para una aplicación que consume una API. Los tests que dependen de APIs reales tienen problemas serios:

```
❌ Lentitud: Cada test espera la respuesta de red (1-5 segundos por request)
❌ Fragilidad: Si la API cae, TODOS tus tests fallan
❌ Impredictibilidad: Los datos en la API cambian constantemente
❌ Costo: Cada test consume cuotas de API, ancho de banda
❌ Inconsistencia: A veces pasa, a veces falla por timeout de red
```

**Con 100 tests haciendo requests reales**: 5+ minutos de ejecución  
**Con mocking**: 30 segundos ✅

### La Solución: Network Interception

Network interception permite **interceptar requests de red** y responder con datos que TÚ controlas:

```
┌─────────────┐
│ Test        │
└──────┬──────┘
       │
       ├──> GET /api/users
       │
       ▼ (Interceptamos aquí!)
┌──────────────────────────┐
│ Playwright Route Handler │
│ (nuestra trampa)         │
└──────┬───────────────────┘
       │
       ├──> Respondemos con JSON que controlamos
       │
       ▼
┌─────────────┐
│ Test        │  ✅ Rápido, predecible, confiable
└─────────────┘
```

---

## Conceptos Clave

### 1. Patrones de Ruta (Route Patterns)

Playwright permite interceptar requests con patrones:

```typescript
// Interceptar todas las llamadas a cualquier /api/users
await page.route('**/api/users', handler);

// Interceptar URLs específicas
await page.route('https://api.ejemplo.com/v1/productos', handler);

// Patrones regex
await page.route(/.*\.jpg$/, handler);  // Cualquier .jpg

// Query strings
await page.route('**/api/search?q=*', handler);
```

### 2. Route Handler

El handler es una función que se ejecuta cuando se detecta un request:

```typescript
async (route) => {
  // route.request() - información del request original
  // route.fetch() - obtener respuesta real (para modificarla)
  // route.fulfill() - enviar respuesta personalizada
  // route.abort() - rechazar el request (simular error de red)
  // route.continue() - dejar pasar el request original
}
```

### 3. Estados de Test

Hay dos estrategias principales:

| Estrategia | Uso | Ventaja |
|------------|-----|---------|
| **Mockeo Completo** | Tests unitarios/aislados | Rápido, 100% controlado |
| **Mockeo Parcial** | Probar interacción real | Más realista |
| **Sin Mockeo** | Tests E2E | Más lento pero verifica todo |

---

## Ejemplos Prácticos

### Ejemplo 1: Mockear GET Request Exitoso

**Problema**: Queremos probar que la UI muestra usuarios correctamente sin depender de una API real.

```typescript
import { test, expect } from '@playwright/test';

test('muestra lista de usuarios desde API mockeada', async ({ page }) => {
  // PASO 1: Interceptar request a /api/usuarios
  await page.route('**/api/usuarios', route => {
    // PASO 2: Responder con datos que controlamos
    route.fulfill({
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
        },
        {
          id: 3,
          nombre: 'Lucía Mendez',
          email: 'lucia@fpuna.edu.py',
          rol: 'estudiante'
        }
      ])
    });
  });

  // PASO 3: Navegar a la página (ahora recibirá datos mockeados)
  await page.goto('/usuarios');

  // PASO 4: Verificar que la UI muestra los datos mockeados
  await expect(page.getByText('María González')).toBeVisible();
  await expect(page.getByText('carlos@fpuna.edu.py')).toBeVisible();
  
  // Verificar que la tabla tiene 3 filas
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(3);
});
```

**¿Qué pasó aquí?**
1. Establecimos una trampa (`page.route`) para interceptar requests a `**/api/usuarios`
2. Cuando el navegador intenta hacer ese request, **nuestra función se ejecuta en su lugar**
3. Respondemos con datos JSON que el test controla completamente
4. La UI recibe los datos y renderiza normalmente
5. El test verifica que se mostró lo esperado

**Tiempo de ejecución**: ~500ms (sin esperar red)

---

### Ejemplo 2: Mockear Error 500

**Problema**: Queremos verificar que la UI maneja errores del servidor correctamente.

```typescript
test('muestra mensaje de error cuando API retorna 500', async ({ page }) => {
  // Interceptar y responder con error
  await page.route('**/api/productos', route => {
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'Error Interno del Servidor',
        message: 'No se pudo procesar la solicitud'
      })
    });
  });

  await page.goto('/productos');

  // Verificar que se muestra el mensaje de error
  await expect(page.getByText(/Error|no se pudieron cargar/i)).toBeVisible();
  
  // Verificar que aparece botón de reintentar
  await expect(page.getByRole('button', { name: 'Reintentar' })).toBeVisible();
  
  // Verificar que la lista está vacía
  await expect(page.locator('.productos-list')).toHaveCount(0);
});
```

### Ejemplo 3: Mockear Timeout/Error de Red

**Problema**: La API tarda demasiado o la conexión falla. ¿Cómo responde la UI?

```typescript
test('maneja timeout de red correctamente', async ({ page }) => {
  // Abortar el request (simula falla de conexión)
  await page.route('**/api/datos', route => {
    route.abort('failed');
  });

  await page.goto('/dashboard');

  // Debería mostrar mensaje de error de conexión
  await expect(page.getByText(/conexión|internet|error de red/i)).toBeVisible();
  
  // Debería haber spinner que desaparece
  await expect(page.locator('.loading-spinner')).not.toBeVisible();
});
```

---

### Ejemplo 4: Modificar Respuesta Real (Intermedio)

**Problema**: Queremos aplicar lógica a la respuesta real antes de entregarla al navegador.

```typescript
test('aplica descuento a productos desde API real', async ({ page }) => {
  await page.route('**/api/productos', async (route) => {
    // PASO 1: Obtener respuesta REAL de la API
    const response = await route.fetch();
    const json = await response.json();

    // PASO 2: Modificar los datos (aplicar 50% descuento)
    const productosConDescuento = json.map(producto => ({
      ...producto,
      precio: producto.precio * 0.5,  // Mitad de precio
      descuento: '50%',
      original: producto.precio
    }));

    // PASO 3: Retornar respuesta modificada
    await route.fulfill({
      response,
      json: productosConDescuento
    });
  });

  await page.goto('/tienda');

  // Verificar que los precios tienen descuento
  const precio1 = await page.locator('[data-testid="precio-producto-1"]').textContent();
  const precio2 = await page.locator('[data-testid="precio-producto-2"]').textContent();
  
  // Si API retorna 100, debería mostrar 50
  expect(precio1).toContain('50');  // Mitad del precio original
});
```

---

### Ejemplo 5: Múltiples Requests, Múltiples Responses

**Problema**: Una página hace 5 API calls. Queremos mockear cada una diferente.

```typescript
test('página con múltiples API calls mockeadas', async ({ page }) => {
  // Mockear API 1: /api/usuario
  await page.route('**/api/usuario', route => {
    route.fulfill({
      json: {
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan@ejemplo.com'
      }
    });
  });

  // Mockear API 2: /api/preferencias
  await page.route('**/api/preferencias', route => {
    route.fulfill({
      json: {
        tema: 'oscuro',
        idioma: 'es',
        notificaciones: true
      }
    });
  });

  // Mockear API 3: /api/proyectos
  await page.route('**/api/proyectos', route => {
    route.fulfill({
      json: [
        { id: 1, nombre: 'Proyecto A' },
        { id: 2, nombre: 'Proyecto B' }
      ]
    });
  });

  await page.goto('/dashboard');

  // Todas las APIs están mockeadas, todo carga al instante
  await expect(page.getByText('Juan Pérez')).toBeVisible();
  await expect(page.getByText('2 Proyectos')).toBeVisible();
});
```

---

### Ejemplo 6: Contar Requests (Debugging)

**Problema**: ¿Cuántos requests está haciendo la página? ¿A dónde?

```typescript
test('auditar requests de la página', async ({ page }) => {
  const requests = [];

  // Interceptar TODOS los requests
  await page.route('**/*', route => {
    requests.push({
      url: route.request().url(),
      method: route.request().method(),
      timestamp: Date.now()
    });

    // Dejar que el request continúe (no mockeamos)
    route.continue();
  });

  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');

  // Mostrar todos los requests
  console.log('Total requests:', requests.length);
  requests.forEach(req => {
    console.log(`${req.method} ${req.url}`);
  });

  // Verificar que no hay requests a ads/tracking
  const tracking = requests.filter(r => r.url.includes('analytics') || r.url.includes('ads'));
  expect(tracking.length).toBe(0);
});
```

---

## Cómo Usar Este Tutorial

### Paso 1: Identifica Qué Mockear
En tu prueba, pregúntate:
- ¿Esta página depende de APIs externas?
- ¿Quiero que el test sea rápido y aislado?
- ¿Necesito probar manejo de errores?

Si la respuesta es "sí", mockea.

### Paso 2: Escribe el Route Handler

```typescript
// Patrón básico
await page.route('PATRÓN_URL', route => {
  route.fulfill({
    status: 200,
    json: { /* tus datos */ }
  });
});
```

### Paso 3: Verifica Que Funciona

```typescript
// Agrega logs para debugging
await page.route('**/api/**', route => {
  console.log('Request interceptado:', route.request().url());
  route.fulfill({ json: { data: 'mockeado' } });
});
```

---

## Mejores Prácticas

### ✅ BUENO

```typescript
// Usar route() con patrones específicos
await page.route('**/api/usuarios', handler);

// Mockear en el setupo teardown
test('...', async ({ page }) => {
  // Mock al inicio
  await page.route('**/api/**', handler);
  
  // Tests aquí
  
  // Auto-limpieza de routes
});

// Usar JSON tipado
await route.fulfill({
  json: { id: 1, name: 'Test' }
});
```

### ❌ MALO

```typescript
// Mockear TODO con una sola ruta
await page.route('**/*', handler);  // Demasiado amplio!

// Dejar routes sin limpiar
await page.route('**/api/**', handler);
// ... test sale sin limpiar

// Hardcodear respuestas sin estructura
body: JSON.stringify('{"id":1}')  // Difícil de mantener
```

---

## Debugging de Network Interception

### Ver qué requests se están interceptando

```typescript
test('debugging de network', async ({ page }) => {
  await page.route('**/*', route => {
    console.log('Request:', route.request().url());
    console.log('Method:', route.request().method());
    console.log('Headers:', route.request().headers());
    route.continue();
  });

  await page.goto('/');
});

// Output:
// Request: https://ejemplo.com/
// Method: GET
// Headers: { accept: 'text/html', ... }
```

### Verificar qué datos mockear

```typescript
test('capturar respuesta real para mockear', async ({ page }) => {
  await page.route('**/api/usuarios', async route => {
    const response = await route.fetch();  // Obtener respuesta real
    const json = await response.json();
    
    console.log('Estructura real:', JSON.stringify(json, null, 2));
    
    // Ahora sabes qué estructura mockear
    route.fulfill({ json });
  });

  await page.goto('/usuarios');
});
```

---

## Resumen

| Concepto | Uso |
|----------|-----|
| `page.route()` | Interceptar requests |
| `route.fulfill()` | Responder con datos mockeados |
| `route.fetch()` | Obtener respuesta real |
| `route.abort()` | Simular error de red |
| `route.continue()` | Dejar pasar request original |

**Beneficio principal**: Tests rápidos (500ms vs 5s), confiables, sin dependencias externas.

---

## Próximas Secciones en Este Módulo

- [02_Visual_Regression.md](./02_Visual_Regression.md) - Detectar cambios visuales
- [03_Complex_Components.md](./03_Complex_Components.md) - Modals, iframes, shadow DOM
- [04_Authentication.md](./04_Authentication.md) - Manejo de autenticación
- [05_Performance.md](./05_Performance.md) - Optimizar velocidad de tests

---

*Tutorial: Network Interception - Módulo 01 Playwright Avanzado - FPUNA 2026*
