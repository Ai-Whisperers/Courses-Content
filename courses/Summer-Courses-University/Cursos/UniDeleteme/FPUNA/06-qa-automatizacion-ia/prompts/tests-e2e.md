# Prompts para Generar Tests E2E
## Templates para Claude, ChatGPT y Copilot

---

## Prompt 1: Suite de Tests Básica

```markdown
Genera tests E2E con Playwright para [FUNCIONALIDAD].

**Contexto:**
- Framework: Playwright con TypeScript
- URL base: [URL]
- Page Objects disponibles: [lista de POs]

**Casos de prueba necesarios:**
1. [Caso positivo principal]
2. [Caso negativo / error]
3. [Caso edge / límite]
4. [Caso de validación]

**Requisitos del código:**
- Usar describe() para agrupar tests relacionados
- Usar beforeEach() para navegación común
- Tests independientes entre sí
- Assertions claras con expect()
- Marcar tests críticos con @smoke

**Formato:**
```typescript
import { test, expect } from '../fixtures';
import { PageObject } from '../pages/PageObject';

test.describe('Feature Tests', () => {
  test.beforeEach(async ({ page }) => { });

  test('caso de prueba @smoke', async ({ page }) => { });
});
```
```

---

## Prompt 2: Tests para Flujo Completo

```markdown
Escribe tests E2E para un flujo completo de [PROCESO].

**Pasos del flujo:**
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]
4. [Paso N]

**Page Objects disponibles:**
- [PO1] con métodos: [lista]
- [PO2] con métodos: [lista]

**Casos de prueba:**
- Flujo completo exitoso (happy path)
- Interrupción en paso [X]
- Error en paso [Y]
- Validaciones en cada paso

**Datos de prueba:**
- Usar faker.js para datos dinámicos
- Factory disponible: [nombre de factory]

**Ejemplo de estructura:**
```typescript
test('completa flujo de checkout', async ({ page }) => {
  // Arrange
  const user = createUser();
  const product = createProduct();

  // Act
  await catalogPage.addToCart(product);
  await cartPage.proceedToCheckout();
  await checkoutPage.fillDetails(user);
  await checkoutPage.confirm();

  // Assert
  await checkoutPage.expectConfirmation();
});
```
```

---

## Prompt 3: Tests de Formularios

```markdown
Genera tests para un formulario de [TIPO].

**Campos del formulario:**
| Campo | Tipo | Requerido | Validación |
|-------|------|-----------|------------|
| [campo1] | text | sí | min 3 chars |
| [campo2] | email | sí | formato email |
| [campo3] | select | no | opciones: [...] |

**Casos de prueba necesarios:**
1. Submit exitoso con todos los campos válidos
2. Error por campo requerido vacío
3. Error por formato inválido (email, teléfono, etc.)
4. Error por longitud mínima/máxima
5. Submit con solo campos requeridos
6. Reset/limpiar formulario

**Page Object disponible:**
```typescript
class FormPage {
  async fillField(name: string, value: string);
  async submit();
  async expectError(field: string, message: string);
  async expectSuccess();
}
```
```

---

## Prompt 4: Tests con Datos Dinámicos

```markdown
Genera tests que usen datos dinámicos con factories.

**Factories disponibles:**
```typescript
createUser(overrides?): User
createProduct(overrides?): Product
createOrder(overrides?): Order
```

**Tests necesarios:**
1. Test que use usuario único
2. Test que use producto con precio específico
3. Test que use múltiples items
4. Test con datos extremos (nombres largos, precios altos)

**Requisitos:**
- Cada test debe generar sus propios datos
- Datos no deben depender de otros tests
- Usar overrides para casos específicos

**Patrón esperado:**
```typescript
test('usuario único puede registrarse', async ({ page }) => {
  const user = createUser(); // Datos únicos cada ejecución

  await registerPage.goto();
  await registerPage.fillForm(user);
  await registerPage.submit();

  await expect(page.getByText(`Welcome, ${user.firstName}`)).toBeVisible();
});
```
```

---

## Prompt 5: Tests de Autenticación

```markdown
Genera suite completa de tests de autenticación.

**Funcionalidades a testear:**
- Login con credenciales válidas
- Login con credenciales inválidas
- Logout
- Recordar sesión (remember me)
- Recuperar contraseña
- Sesión expirada
- Acceso a rutas protegidas sin auth

**Page Objects:**
- LoginPage
- RegisterPage
- ForgotPasswordPage
- DashboardPage (protegida)

**Fixtures disponibles:**
- authenticatedPage (ya logueado)
- loginPage (en página de login)

**Consideraciones:**
- Tests deben ser independientes
- Cleanup de sesión después de cada test
- No compartir estado entre tests
```

---

## Prompt 6: Tests de API Integrados

```markdown
Genera tests que combinen UI y API.

**Escenario:** [Descripción del flujo]

**Pasos:**
1. Crear recurso vía API
2. Verificar en UI que aparece
3. Modificar vía UI
4. Verificar cambio vía API
5. Eliminar vía API
6. Verificar que no aparece en UI

**API disponible:**
- POST /api/resource - crear
- GET /api/resource/:id - obtener
- PUT /api/resource/:id - actualizar
- DELETE /api/resource/:id - eliminar

**Código esperado:**
```typescript
test('CRUD completo UI + API', async ({ page, request }) => {
  // Crear vía API
  const response = await request.post('/api/resource', { data: {...} });
  const created = await response.json();

  // Verificar en UI
  await page.goto('/resources');
  await expect(page.getByText(created.name)).toBeVisible();

  // Modificar en UI
  await page.click(`[data-id="${created.id}"] .edit`);
  // ...

  // Verificar vía API
  const getResponse = await request.get(`/api/resource/${created.id}`);
  // ...

  // Cleanup
  await request.delete(`/api/resource/${created.id}`);
});
```
```

---

## Prompt 7: Tests con Mocking

```markdown
Genera tests que mockeen respuestas de API.

**Escenario:** Testear comportamiento de UI con diferentes respuestas de API.

**Casos a mockear:**
1. Respuesta exitosa con datos
2. Respuesta exitosa sin datos (lista vacía)
3. Error 400 - Bad Request
4. Error 401 - No autorizado
5. Error 500 - Error de servidor
6. Timeout / sin respuesta

**Patrón esperado:**
```typescript
test('muestra mensaje cuando API retorna vacío', async ({ page }) => {
  await page.route('**/api/items', route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([]),
    });
  });

  await page.goto('/items');
  await expect(page.getByText('No items found')).toBeVisible();
});

test('muestra error cuando API falla', async ({ page }) => {
  await page.route('**/api/items', route => {
    route.fulfill({
      status: 500,
      body: JSON.stringify({ error: 'Server error' }),
    });
  });

  await page.goto('/items');
  await expect(page.getByText('Something went wrong')).toBeVisible();
});
```
```

---

## Prompt 8: Tests Visual Regression

```markdown
Genera tests de regresión visual con Playwright.

**Páginas a capturar:**
- Homepage
- Página de producto
- Carrito
- Checkout

**Requisitos:**
- Capturar página completa
- Capturar componentes específicos
- Comparar con screenshots de referencia
- Excluir elementos dinámicos (fechas, IDs)

**Código esperado:**
```typescript
test('homepage visual', async ({ page }) => {
  await page.goto('/');

  // Página completa
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    mask: [page.locator('.dynamic-date')],
  });
});

test('product card visual', async ({ page }) => {
  await page.goto('/products');

  // Componente específico
  const card = page.locator('.product-card').first();
  await expect(card).toHaveScreenshot('product-card.png');
});
```
```

---

## Consejos de Uso

### Estructura de Test Recomendada

```typescript
test.describe('Feature Name', () => {
  // Setup común
  test.beforeEach(async ({ page }) => {
    await page.goto('/feature');
  });

  // Tests agrupados por funcionalidad
  test.describe('Sub-feature', () => {
    test('happy path @smoke', async ({ page }) => {
      // Arrange, Act, Assert
    });

    test('error case', async ({ page }) => {
      // ...
    });
  });
});
```

### Tags Útiles

- `@smoke` - Tests críticos para ejecutar siempre
- `@slow` - Tests lentos (skip en CI rápido)
- `@flaky` - Tests inestables a revisar

### Validar Tests Generados

- [ ] Tests son independientes
- [ ] Cada test tiene un propósito claro
- [ ] Assertions verifican el comportamiento correcto
- [ ] No hay waits hardcodeados (usar auto-wait)
- [ ] Datos de prueba son únicos por test

---

*Ver también: prompts/api-tests.md*
