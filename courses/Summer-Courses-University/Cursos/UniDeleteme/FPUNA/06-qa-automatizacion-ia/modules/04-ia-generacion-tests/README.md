# Módulo 4: IA para Generación de Tests
## Automatizando la Creación de Tests con Inteligencia Artificial

---

## Información del Módulo

| Campo | Detalle |
|-------|---------|
| **Duración** | 2 horas |
| **Tipo** | Práctico |
| **Prerrequisitos** | Módulos 1-3 completados |

---

## Objetivos de Aprendizaje

Al finalizar este módulo, los participantes podrán:

1. Usar GitHub Copilot para generar tests
2. Crear prompts efectivos para Claude/ChatGPT en QA
3. Generar Page Objects automáticamente con IA
4. Crear datos de prueba con factories usando IA
5. Validar y refinar código generado por IA

---

## Contenido

### 4.1 GitHub Copilot para Testing (20 min)

#### ¿Qué es GitHub Copilot?

```
GITHUB COPILOT
══════════════

┌─────────────────────────────────────┐
│  Tu código + comentarios            │
│          ↓                          │
│  ┌───────────────────────────┐      │
│  │   GitHub Copilot (IA)     │      │
│  │   - Modelo entrenado      │      │
│  │   - Contexto del proyecto │      │
│  └───────────────────────────┘      │
│          ↓                          │
│  Sugerencias de código              │
└─────────────────────────────────────┘
```

#### Configuración en VS Code

1. Instalar extensión "GitHub Copilot"
2. Iniciar sesión con cuenta GitHub
3. Habilitar en settings

#### Usar Copilot para Tests

```typescript
// Escribir comentario descriptivo, Copilot sugiere código

// Test para verificar que el formulario de login valida email vacío
test('shows error when email is empty', async ({ page }) => {
  // Copilot completa...
  await page.goto('/login');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Email is required')).toBeVisible();
});

// Test para verificar login exitoso con credenciales válidas
// Copilot sugiere el test completo...

// Page Object para la página de checkout
// Copilot genera la clase...
```

#### Atajos de Copilot

| Atajo | Acción |
|-------|--------|
| `Tab` | Aceptar sugerencia |
| `Esc` | Rechazar sugerencia |
| `Alt + ]` | Siguiente sugerencia |
| `Alt + [` | Sugerencia anterior |
| `Ctrl + Enter` | Ver panel de sugerencias |

#### Técnicas para Mejores Sugerencias

```typescript
// 1. Comentarios descriptivos
// Test E2E para flujo completo de compra: agregar producto,
// llenar datos de envío, seleccionar método de pago, confirmar orden

// 2. Nombrar test descriptivamente
test('user completes checkout with credit card', async ({ page }) => {

// 3. Dar contexto con imports
import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';

// 4. Empezar el patrón
test('validates required fields', async ({ page }) => {
  await page.goto('/register');
  // Copilot continúa el patrón...
```

---

### 4.2 Prompts Efectivos para QA (25 min)

#### Estructura de un Buen Prompt

```
ANATOMÍA DE UN PROMPT PARA QA
═════════════════════════════

┌─────────────────────────────────────────┐
│ 1. CONTEXTO                             │
│    - Framework: Playwright              │
│    - Lenguaje: TypeScript               │
│    - Patrón: Page Object Model          │
├─────────────────────────────────────────┤
│ 2. TAREA ESPECÍFICA                     │
│    - Qué necesitas exactamente          │
│    - Tipo de test/código                │
├─────────────────────────────────────────┤
│ 3. INPUT                                │
│    - HTML de la página                  │
│    - Requisitos funcionales             │
│    - Casos de uso                       │
├─────────────────────────────────────────┤
│ 4. OUTPUT ESPERADO                      │
│    - Formato del código                 │
│    - Convenciones a seguir              │
│    - Ejemplos si es posible             │
└─────────────────────────────────────────┘
```

#### Prompt: Generar Page Object

```markdown
Genera un Page Object en TypeScript para Playwright para esta página de login:

**HTML:**
```html
<form id="login-form">
  <input type="email" id="email" placeholder="Email" required>
  <input type="password" id="password" placeholder="Password" required>
  <button type="submit" class="btn-login">Sign In</button>
  <a href="/forgot-password" class="forgot-link">Forgot Password?</a>
  <div class="error-message" role="alert"></div>
</form>
```

**Requisitos:**
- Extender de BasePage
- Usar getByRole y getByTestId cuando sea posible
- Incluir métodos: login(), forgotPassword(), expectError()
- Locators como readonly
- Documentar con JSDoc

**Ejemplo de estructura esperada:**
```typescript
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  // ...
}
```
```

#### Prompt: Generar Tests E2E

```markdown
Escribe tests E2E con Playwright para un flujo de checkout de e-commerce.

**Contexto:**
- Framework: Playwright con TypeScript
- Page Objects ya existen: CartPage, CheckoutPage, PaymentPage

**Flujo a testear:**
1. Usuario tiene productos en carrito
2. Procede a checkout
3. Llena datos de envío
4. Selecciona método de pago (tarjeta/efectivo)
5. Confirma orden
6. Ve página de confirmación

**Casos de prueba necesarios:**
- Checkout exitoso con tarjeta
- Checkout exitoso con efectivo
- Error cuando faltan datos de envío
- Error cuando tarjeta es rechazada
- Validación de campos requeridos

**Requisitos del código:**
- Usar describe() para agrupar
- Usar beforeEach() para setup común
- Assertions claras con mensajes
- Datos de prueba con faker.js
```

#### Prompt: Generar Factory de Datos

```markdown
Crea una factory de datos de prueba para usuarios usando faker.js.

**Interfaz de Usuario:**
```typescript
interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
}
```

**Requisitos:**
- Función createUser() con valores por defecto
- Función createUsers(count) para múltiples
- Override de campos específicos
- Datos consistentes (ej: email incluye nombre)
- Valores realistas para Paraguay

**Ejemplo de uso esperado:**
```typescript
const user = createUser({ email: 'custom@test.com' });
const users = createUsers(5);
```
```

#### Prompt: Generar Tests de API

```markdown
Genera tests de API REST con Playwright para estos endpoints:

**Base URL:** https://api.example.com/v1

**Endpoints:**
- GET /users - Lista usuarios (paginado)
- GET /users/:id - Usuario específico
- POST /users - Crear usuario
- PUT /users/:id - Actualizar usuario
- DELETE /users/:id - Eliminar usuario

**Response de GET /users:**
```json
{
  "data": [{ "id": "1", "email": "...", "name": "..." }],
  "meta": { "total": 100, "page": 1, "limit": 10 }
}
```

**Requisitos:**
- Tests para cada método HTTP
- Validar status codes
- Validar estructura de response
- Test de autenticación (Bearer token)
- Test de errores (404, 400, 401)
```

---

### 4.3 Generar Page Objects con IA (20 min)

#### Paso 1: Extraer HTML

```typescript
// Obtener HTML de la página para usar en prompt
const html = await page.locator('form').innerHTML();
console.log(html);
```

#### Paso 2: Usar Prompt Estructurado

```markdown
**Prompt para Claude/ChatGPT:**

Analiza este HTML y genera un Page Object completo:

```html
[pegar HTML extraído]
```

El Page Object debe:
1. Usar Playwright con TypeScript
2. Seguir el patrón: locators readonly, métodos async
3. Incluir métodos para todas las acciones posibles
4. Incluir métodos de verificación (expect...)
5. Extender de BasePage

Genera código listo para copiar y usar.
```

#### Paso 3: Refinar el Resultado

```typescript
// Código generado por IA (ejemplo)
export class ProductPage extends BasePage {
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitle = page.locator('h1.product-name');
    this.productPrice = page.locator('.price');
    this.quantityInput = page.getByLabel('Quantity');
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
  }

  // ✅ Revisar: ¿Los selectores son correctos?
  // ✅ Revisar: ¿Falta algún elemento importante?
  // ✅ Revisar: ¿Los métodos cubren todos los casos de uso?

  async addToCart(quantity: number = 1) {
    await this.quantityInput.fill(quantity.toString());
    await this.addToCartButton.click();
  }
}
```

---

### 4.4 Data Factories con IA (15 min)

#### Factory Pattern con Faker.js

```typescript
// data/factories/userFactory.ts
import { faker } from '@faker-js/faker';

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

// Factory básica
export function createUser(overrides: Partial<User> = {}): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    email: faker.internet.email({ firstName, lastName }),
    password: faker.internet.password({ length: 12 }),
    firstName,
    lastName,
    phone: faker.phone.number(),
    ...overrides,  // Permite sobrescribir valores
  };
}

// Factory para múltiples usuarios
export function createUsers(count: number): User[] {
  return Array.from({ length: count }, () => createUser());
}

// Factory con preset
export function createAdminUser(): User {
  return createUser({
    email: 'admin@test.com',
    password: 'AdminPassword123!',
  });
}
```

#### Prompt para Generar Factories

```markdown
Genera factories de datos de prueba con faker.js para un sistema de e-commerce.

**Entidades necesarias:**
1. User (id, email, password, name, phone)
2. Product (id, name, description, price, stock, category)
3. Order (id, userId, products[], total, status, createdAt)
4. Address (street, city, zipCode, country)

**Requisitos:**
- Usar @faker-js/faker
- Cada factory debe aceptar overrides parciales
- Crear versiones "bulk" para múltiples items
- Crear presets útiles (adminUser, expensiveProduct, pendingOrder)
- Datos realistas para comercio en Paraguay (guaraníes, ciudades)

**Ejemplo de uso:**
```typescript
const user = createUser();
const product = createProduct({ price: 150000 });
const order = createOrder({ userId: user.id, products: [product] });
```
```

---

### 4.5 Validar y Refinar Código de IA (20 min)

#### Checklist de Validación

```
VALIDAR CÓDIGO GENERADO POR IA
══════════════════════════════

□ SINTAXIS Y TIPOS
  ├─ Compila sin errores
  ├─ Tipos correctos (Locator, Page, etc.)
  └─ Imports necesarios

□ SELECTORES
  ├─ Selectores existen en la página real
  ├─ Selectores son únicos
  ├─ Preferencia a getByRole sobre CSS
  └─ No usa IDs dinámicos

□ LÓGICA
  ├─ Métodos hacen lo que dicen
  ├─ Await en todas las promesas
  ├─ Manejo de errores si necesario
  └─ No hay código duplicado

□ MEJORES PRÁCTICAS
  ├─ Sigue patrón POM correctamente
  ├─ Locators son readonly
  ├─ Nombres descriptivos
  └─ Documentación donde necesario
```

#### Ejemplo: Corregir Código de IA

```typescript
// ❌ CÓDIGO GENERADO (con errores comunes)
export class SearchPage {
  page: Page;  // Falta readonly
  searchInput;  // Falta tipo

  constructor(page) {  // Falta tipo
    this.page = page;
    this.searchInput = page.locator('#search-123');  // ID dinámico
  }

  search(query) {  // Falta async y tipo
    this.searchInput.fill(query);  // Falta await
    this.page.locator('.search-btn').click();  // Falta await, selector frágil
  }
}

// ✅ CÓDIGO CORREGIDO
import { Page, Locator } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search...');
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }
}
```

---

### 4.6 Flujo de Trabajo con IA (20 min)

#### Workflow Recomendado

```
FLUJO DE TRABAJO CON IA PARA QA
═══════════════════════════════

1. PLANIFICAR
   ├─ Definir qué tests necesitas
   ├─ Identificar Page Objects requeridos
   └─ Listar casos de prueba

2. EXTRAER CONTEXTO
   ├─ Obtener HTML de páginas
   ├─ Documentar requisitos
   └─ Preparar ejemplos

3. GENERAR CON IA
   ├─ Usar prompts estructurados
   ├─ Pedir Page Objects primero
   └─ Luego generar tests

4. REVISAR Y CORREGIR
   ├─ Verificar selectores
   ├─ Agregar tipos faltantes
   └─ Corregir lógica

5. PROBAR
   ├─ Ejecutar tests
   ├─ Verificar que pasan
   └─ Ajustar según errores

6. REFACTORIZAR
   ├─ Eliminar duplicación
   ├─ Mejorar nombres
   └─ Documentar
```

#### Integrar IA en el Día a Día

```typescript
// 1. Empezar con comentario para Copilot
// Test para verificar que usuario no puede acceder a /admin sin login

// 2. Dejar que Copilot sugiera
test('redirects to login when accessing admin without auth', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL('/login');
  await expect(page.getByText('Please login')).toBeVisible();
});

// 3. Refinar manualmente si necesario
test('redirects to login when accessing admin without auth', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/login/);  // Regex más flexible
  await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
});
```

---

## Biblioteca de Prompts

### Prompt 1: Suite Completa de Tests

```markdown
Genera una suite completa de tests E2E para [FUNCIONALIDAD].

**Stack tecnológico:**
- Playwright + TypeScript
- Page Object Model
- faker.js para datos

**Funcionalidad:** [DESCRIPCIÓN]

**Page Objects disponibles:** [LISTA]

**Casos de prueba:**
1. [CASO POSITIVO]
2. [CASO NEGATIVO]
3. [CASO EDGE]

Incluye:
- beforeEach para setup
- afterEach para cleanup si necesario
- Datos de prueba con factory
- Assertions descriptivas
```

### Prompt 2: Migrar Tests

```markdown
Convierte estos tests de [FRAMEWORK ANTERIOR] a Playwright:

```javascript
[CÓDIGO DE TESTS ANTERIORES]
```

**Requisitos:**
- Mantener misma cobertura
- Usar sintaxis moderna de Playwright
- Aplicar Page Object Model
- Mejorar selectores si es posible
```

### Prompt 3: Generar Assertions

```markdown
Para este Page Object, genera métodos de assertion:

```typescript
[PAGE OBJECT]
```

Necesito métodos expect... para verificar:
- Estados válidos/inválidos
- Mensajes de error/éxito
- Datos correctos
- Navegación correcta
```

---

## Puntos Clave

1. **Copilot para autocompletar:** Escribe comentarios descriptivos
2. **Prompts estructurados:** Contexto + Tarea + Input + Output
3. **Siempre validar:** La IA no es perfecta, revisar código
4. **Factories con faker:** Datos realistas y consistentes
5. **Iterar:** Generar → Probar → Corregir → Repetir

---

*Siguiente módulo: Testing de APIs*
