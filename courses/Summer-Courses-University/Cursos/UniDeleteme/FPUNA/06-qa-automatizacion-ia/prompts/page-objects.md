# Prompts para Generar Page Objects
## Templates para Claude, ChatGPT y Copilot

---

## Prompt 1: Page Object desde HTML

```markdown
Genera un Page Object en TypeScript para Playwright basado en este HTML:

```html
[PEGAR HTML DE LA PÁGINA]
```

**Requisitos:**
1. Extender de BasePage (asume que existe con constructor(page: Page))
2. Locators como `readonly` usando preferentemente:
   - getByRole() para elementos interactivos
   - getByTestId() si hay data-testid
   - getByLabel() para inputs con label
   - locator() CSS solo cuando necesario
3. Constructor que inicialice todos los locators
4. Métodos de navegación: goto()
5. Métodos de acción para cada interacción posible
6. Métodos de verificación: expect...() para estados importantes
7. Documentar con JSDoc breve

**Formato esperado:**
```typescript
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class NombrePage extends BasePage {
  readonly elemento: Locator;

  constructor(page: Page) {
    super(page);
    this.elemento = page.getByRole('...');
  }

  async accion() { }
  async expectEstado() { }
}
```
```

---

## Prompt 2: Page Object para Formulario

```markdown
Crea un Page Object para un formulario de [TIPO DE FORMULARIO].

**Campos del formulario:**
- [Campo 1]: [tipo] - [validaciones]
- [Campo 2]: [tipo] - [validaciones]
- [Campo 3]: [tipo] - [validaciones]

**Acciones posibles:**
- Llenar formulario completo
- Llenar campo individual
- Submit
- Reset/Clear
- Validar errores

**Requisitos:**
- Interface para los datos del formulario
- Método fillForm(data) que acepte datos parciales
- Métodos expectError(field, message) y expectSuccess()
- Usar getByLabel para inputs

**Ejemplo de uso esperado:**
```typescript
await formPage.fillForm({ email: 'test@test.com', name: 'Test' });
await formPage.submit();
await formPage.expectSuccess();
```
```

---

## Prompt 3: Page Object con Tabla

```markdown
Genera un Page Object para una página con tabla de datos.

**Estructura de la tabla:**
- Columnas: [lista de columnas]
- Acciones por fila: [editar, eliminar, ver, etc.]
- Paginación: [sí/no]
- Filtros: [lista de filtros]
- Ordenamiento: [columnas ordenables]

**Requisitos:**
- Locators para la tabla y sus elementos
- Métodos para obtener datos de filas
- Métodos para interactuar con filas específicas
- Métodos de paginación si aplica
- Métodos de filtrado y ordenamiento

**Métodos esperados:**
```typescript
async getRowCount(): Promise<number>
async getRowData(index: number): Promise<RowData>
async clickEditOnRow(index: number): Promise<void>
async deleteRow(index: number): Promise<void>
async filterByColumn(column: string, value: string): Promise<void>
async sortByColumn(column: string): Promise<void>
async goToPage(pageNumber: number): Promise<void>
```
```

---

## Prompt 4: Page Object para Modal

```markdown
Crea un Page Object para un modal/dialog.

**Tipo de modal:** [Confirmación / Formulario / Información / Error]

**Elementos del modal:**
- Título: [sí/no]
- Contenido: [descripción]
- Botones: [lista de botones]
- Formulario: [campos si aplica]
- Cerrar con X: [sí/no]
- Cerrar con click fuera: [sí/no]

**Requisitos:**
- Método waitForOpen() para esperar que abra
- Método close() con diferentes formas de cerrar
- Métodos para cada acción del modal
- Verificación de que el modal se cerró

**Patrón esperado:**
```typescript
export class ConfirmModal extends BasePage {
  async waitForOpen() { }
  async confirm() { }
  async cancel() { }
  async close() { }
  async expectClosed() { }
}
```
```

---

## Prompt 5: Component Reutilizable

```markdown
Genera un componente reutilizable (no Page Object completo) para:

**Componente:** [Navigation / Header / Footer / Sidebar / Search / etc.]

**Aparece en:** Múltiples páginas

**Elementos:**
- [Lista de elementos del componente]

**Interacciones:**
- [Lista de acciones posibles]

**Requisitos:**
- NO extender de BasePage (es un componente)
- Constructor que reciba Page
- Puede usarse dentro de Page Objects mediante composición

**Uso esperado:**
```typescript
// En un Page Object
export class DashboardPage extends BasePage {
  readonly navigation: NavigationComponent;

  constructor(page: Page) {
    super(page);
    this.navigation = new NavigationComponent(page);
  }
}

// En test
await dashboardPage.navigation.goToSettings();
```
```

---

## Prompt 6: Refactorizar a Page Object

```markdown
Refactoriza estos tests existentes a usar Page Object Model:

```typescript
[PEGAR TESTS EXISTENTES SIN POM]
```

**Requisitos:**
1. Identificar qué Page Objects se necesitan
2. Crear cada Page Object con locators y métodos
3. Refactorizar los tests para usar los Page Objects
4. Mantener la misma cobertura de tests
5. Mejorar selectores si es posible (preferir getByRole)

**Entregar:**
1. Page Objects necesarios
2. Tests refactorizados
3. Breve explicación de mejoras realizadas
```

---

## Prompt 7: Page Object para E-commerce

```markdown
Genera Page Objects para un flujo de e-commerce.

**Páginas necesarias:**
1. ProductListPage - Lista de productos
2. ProductDetailPage - Detalle de producto
3. CartPage - Carrito de compras
4. CheckoutPage - Proceso de checkout

**Para cada página incluir:**
- Locators de elementos principales
- Métodos de navegación
- Métodos de acción
- Métodos de verificación

**Ejemplo de flujo:**
```typescript
// En test
await productList.clickProduct('Laptop');
await productDetail.addToCart(2);
await cart.proceedToCheckout();
await checkout.fillShippingInfo(address);
await checkout.selectPaymentMethod('credit-card');
await checkout.confirmOrder();
await checkout.expectOrderConfirmation();
```
```

---

## Consejos de Uso

### Con GitHub Copilot

```typescript
// Escribe un comentario descriptivo
// Page Object para la página de login con campos email, password
// y botones de login y forgot password

export class LoginPage extends BasePage {
  // Copilot continúa...
```

### Con Claude/ChatGPT

1. Incluir HTML real de la página
2. Especificar framework: "Playwright con TypeScript"
3. Pedir formato específico de código
4. Solicitar documentación si la necesitas

### Validar Código Generado

Siempre verificar:
- [ ] Selectores funcionan en la página real
- [ ] Tipos TypeScript correctos
- [ ] Todos los `await` necesarios
- [ ] Métodos tienen nombres descriptivos
- [ ] No hay código duplicado

---

*Ver también: prompts/tests-e2e.md*
