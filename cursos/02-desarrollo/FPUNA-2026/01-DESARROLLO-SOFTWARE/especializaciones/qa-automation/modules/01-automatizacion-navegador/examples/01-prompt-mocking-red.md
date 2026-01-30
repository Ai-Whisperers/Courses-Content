# Ejemplo: Network Mocking con OpenCode
## Módulo 01: Playwright Avanzado

**Propósito**: Generar test suite con network mocking usando OpenCode

---

## Instrucciones

1. Copia el prompt a continuación
2. Pégalo en OpenCode
3. Ajusta variables según tu aplicación
4. Ejecuta el código generado

---

## Prompt para OpenCode

```
Genera tests de Playwright (TypeScript) con las siguientes características:

CONTEXTO:
Aplicación: Dashboard de gestión de proyectos
URL base: http://localhost:3000
Funcionalidad: Página que muestra lista de proyectos desde API

REQUISITOS:

1. Network Mocking:
   - Interceptar GET /api/proyectos
   - Mockear 5 proyectos con estructura: { id, nombre, descripcion, estado, fechaCreacion }
   - También mockear POST /api/proyectos para crear nuevo proyecto
   - Estados posibles: "activo", "archivado", "en-progreso"

2. Test Cases (mínimo 3):
   - Test 1: Verificar que la página muestra los 5 proyectos mockeados
   - Test 2: Crear nuevo proyecto a través del modal (mockear respuesta POST)
   - Test 3: Manejar error 500 cuando se carga lista de proyectos

3. Code Quality:
   - TypeScript con tipos explícitos
   - Comentarios en español explicando cada sección
   - Use page object pattern (crear función para selectores)
   - Usar selectores por rol cuando sea posible

4. Estructura:
   - Use describe blocks para agrupar tests
   - Setup: Mockear APIs antes de cada test
   - Assertions: Verificar que los datos mockeados se muestran

SALIDA:
- Código listo para copiar-pegar en .spec.ts
- Importaciones incluidas (@playwright/test)
- Ejemplos de diferentes tipos de responses (éxito, error)
```

---

## Salida Esperada

El prompt generará código similar a:

```typescript
import { test, expect } from '@playwright/test';

// ==========================================
// PAGE OBJECT (selectores)
// ==========================================
const getProjectsList = (page) => page.locator('[data-testid="proyectos-lista"]');
const getProjectCard = (page, nombre) => page.locator(`text=${nombre}`);
const getNewProjectButton = (page) => page.getByRole('button', { name: /nuevo proyecto/i });
const getCreateButton = (page) => page.getByRole('dialog').getByRole('button', { name: 'Crear' });

// ==========================================
// TESTS
// ==========================================
test.describe('Dashboard de Proyectos', () => {
  
  test('muestra lista de 5 proyectos mockeados', async ({ page }) => {
    // Mock del GET /api/proyectos
    await page.route('**/api/proyectos', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 1,
            nombre: 'Proyecto Alpha',
            descripcion: 'Primer proyecto de test',
            estado: 'activo',
            fechaCreacion: '2026-01-15'
          },
          {
            id: 2,
            nombre: 'Proyecto Beta',
            descripcion: 'Segundo proyecto',
            estado: 'en-progreso',
            fechaCreacion: '2026-01-14'
          },
          // ... más proyectos
        ])
      });
    });

    // Navegar a página
    await page.goto('http://localhost:3000/proyectos');

    // Verificaciones
    await expect(getProjectsList(page)).toBeVisible();
    await expect(page.locator(`text=Proyecto Alpha`)).toBeVisible();
    await expect(page.locator(`text=Proyecto Beta`)).toBeVisible();
  });

  test('crea nuevo proyecto a través de modal', async ({ page }) => {
    // Mock de APIs
    await page.route('**/api/proyectos', async (route) => {
      if (route.request().method() === 'POST') {
        // Response a POST
        await route.fulfill({
          status: 201,
          json: { id: 6, nombre: 'Nuevo Proyecto', estado: 'activo' }
        });
      } else {
        // Response a GET
        await route.fulfill({
          status: 200,
          json: [{ id: 1, nombre: 'Proyecto 1', estado: 'activo' }]
        });
      }
    });

    await page.goto('http://localhost:3000/proyectos');

    // Abrir modal
    await getNewProjectButton(page).click();

    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // Llenar formulario
    await modal.getByLabel('Nombre').fill('Nuevo Proyecto');
    await modal.getByLabel('Descripción').fill('Descripción del nuevo proyecto');

    // Enviar
    await getCreateButton(page).click();

    // Verificar éxito
    await expect(page.getByText('Proyecto creado exitosamente')).toBeVisible();
  });

  test('muestra error cuando API retorna 500', async ({ page }) => {
    // Mock con error
    await page.route('**/api/proyectos', (route) => {
      route.fulfill({
        status: 500,
        json: { error: 'Error del servidor' }
      });
    });

    await page.goto('http://localhost:3000/proyectos');

    // Verificar mensaje de error
    await expect(page.getByText(/error|no se pudo cargar/i)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reintentar' })).toBeVisible();
  });
});
```

---

## Cómo Personalizar

### Cambiar la URL de API

```typescript
// Reemplaza esto:
await page.route('**/api/proyectos', ...)

// Por tu URL real:
await page.route('https://tu-api.com/v1/projects', ...)
```

### Cambiar estructura de datos

```typescript
// Si tu API retorna:
// { projects: [...], total: 5 }

// Adapta el mock:
body: JSON.stringify({
  projects: [ /* tus proyectos */ ],
  total: 5
})
```

### Agregar más tests

Copia un test existente y modifica:
- La URL
- El nombre
- Las assertions

---

## Próximos Pasos

1. Ejecuta este test: `npx playwright test`
2. Verifica que pasen
3. Modifica los datos mockeados para tu caso de uso
4. Lee el siguiente ejemplo: `02_VisualRegression_Prompt.md`

---

*Ejemplo: Network Mocking - Módulo 01 Playwright Avanzado - FPUNA 2026*
