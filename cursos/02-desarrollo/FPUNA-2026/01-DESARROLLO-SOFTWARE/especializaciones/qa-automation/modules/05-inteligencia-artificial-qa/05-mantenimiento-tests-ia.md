# Tutorial: Test Maintenance y Refactoring con IA
## Módulo 05: IA para QA

**Duración**: 50 minutos  
**Nivel**: Intermedio-Avanzado  
**Prerequisitos**: Modules 01-04, OpenCode configurado

---

## El Problema: Tests Que Envejecen

### Escenario Real

```
FRONTEND CAMBIA → 50 TESTS SE ROMPEN
Manual: 2-3 horas arreglándolos uno por uno
Con IA: 20 minutos, actualizar todos

REFACTORIZAR SUITE LEGACY
Manual: Analizar 2000 líneas de código
Con IA: IA extrae patrones e identifica refactorizations
```

---

## Parte 1: Actualizar Selectores Rotos

### Problema: Frontend Cambió

**tests/login.spec.ts** (original - funciona):
```typescript
test('login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email-input', 'test@fpuna.edu.py');
  await page.fill('#password-input', 'pass123');
  await page.click('button.btn-primary');
});
```

**Frontend cambió las clases CSS** → Tests fallan

**Prompt a OpenCode**:
```
Mi suite de Playwright tiene 50 tests con selectores CSS rotos.

EJEMPLOS DE SELECTORES ROTOS:
- #email-input (elemento no tiene ese ID)
- button.btn-primary (clase cambió a btn-submit)
- div.form-group:nth-child(3) (estructura cambió)

NUEVO HTML:
<form>
  <input type="email" aria-label="Email">
  <input type="password" aria-label="Contraseña">
  <button>Iniciar Sesión</button>
</form>

TAREA:
Refactoriza los 50 tests para usar getByLabel, getByRole, etc.
Mantén lógica idéntica, solo actualiza selectores.

PRIORIDAD:
1. Accessibility selectors (getByRole, getByLabel)
2. Text content (getByText)
3. Test IDs (getByTestId)
4. Evitar CSS selectors complejos
```

**OpenCode refactoriza**:
```typescript
// tests/login.spec.ts (refactorizado)
test('login', async ({ page }) => {
  await page.goto('/login');
  
  // ✅ Usar getByLabel (robusto)
  await page.getByLabel('Email').fill('test@fpuna.edu.py');
  await page.getByLabel('Contraseña').fill('pass123');
  
  // ✅ Usar getByRole (accesible)
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
});
```

---

## Parte 2: Extraer Page Objects Automáticamente

### Antes (Lógica Duplicada)

```typescript
// ❌ 50 tests con lógica duplicada
test('login fail', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'wrong@email.com');
  await page.fill('#password', 'wrong');
  await page.click('button.submit');
  await expect(page.locator('.error')).toBeVisible();
});

test('login success', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'test@fpuna.edu.py');
  await page.fill('#password', 'correct');
  await page.click('button.submit');
  await expect(page).toHaveURL('/dashboard');
});

// ... 48 tests más con duplicación
```

**Prompt**:
```
Extrae Page Object Model de estos 50 tests.

TESTS ACTUALES:
[pegar tests]

CREAR:
1. pages/login.page.ts - Encapsular lógica
2. Refactorizar todos los tests para usarlo
3. Agregar helpers para casos comunes
4. Mantener 100% funcionalidad
```

**OpenCode genera**:

```typescript
// pages/login.page.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private emailInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Contraseña');
    this.submitButton = page.getByRole('button', { name: 'Iniciar Sesión' });
    this.errorMessage = page.locator('.error-message');
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }
}

// tests/login.spec.ts (refactorizado)
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('login exitoso', async () => {
    await loginPage.login('test@fpuna.edu.py', 'correct123');
    await expect(loginPage.page).toHaveURL('/dashboard');
  });

  test('login fallido', async () => {
    await loginPage.login('wrong@email.com', 'wrong');
    expect(await loginPage.isErrorVisible()).toBe(true);
  });

  // ... Otros tests, mucho más limpios
});
```

---

## Parte 3: Refactor de Tests Legacy

### Patrón: Convertir Callback Hell a Async/Await

**Antes** (Viejo estilo):
```typescript
// ❌ Callbacks anidados
test('actualizar producto', () => {
  let productId;
  let originalName;
  
  cy.visit('/productos');
  cy.get('.product-list').within(() => {
    cy.get('[data-product-id]').first().then($elem => {
      productId = $elem.attr('data-product-id');
      originalName = $elem.text();
      
      cy.wrap($elem).click().then(() => {
        cy.get('[name="nombre"]').clear().type('Nuevo Nombre');
        cy.get('button[type="submit"]').click().then(() => {
          cy.get('.success-notification').should('be.visible');
          cy.visit(`/productos/${productId}`).then(() => {
            cy.get('h1').should('contain', 'Nuevo Nombre');
          });
        });
      });
    });
  });
});
```

**Después** (Moderno - Playwright):
```typescript
// ✅ Async/await limpio
test('actualizar producto', async ({ page }) => {
  await page.goto('/productos');
  
  // Obtener producto
  const productElement = page.locator('[data-product-id]').first();
  const productId = await productElement.getAttribute('data-product-id');
  
  // Editar
  await productElement.click();
  await page.getByLabel('Nombre').fill('Nuevo Nombre');
  await page.getByRole('button', { name: 'Guardar' }).click();
  
  // Verificar
  await expect(page.getByText('Cambios guardados')).toBeVisible();
  await page.goto(`/productos/${productId}`);
  await expect(page.getByRole('heading', { name: 'Nuevo Nombre' })).toBeVisible();
});
```

---

## Parte 4: Identificar y Fijar Flakiness

### Prompt a OpenCode

```
Mi suite tiene 20 tests "flaky" (intermitentes).

SÍNTOMAS:
- Pasan 60% de las veces
- Fallan sin patrón claro
- Error típico: timeout esperando elementos

EJEMPLOS:
1. test('agregar al carrito') → A veces falla con timeout
2. test('checkout') → Ocasionalmente error en Step 2
3. test('buscar productos') → Fallan los tests de búsqueda

TENGO 500 LÍNEAS DE CÓDIGO en el archivo spec.

ANALIZA:
- ¿Dónde hay race conditions?
- ¿Falta de auto-waiting?
- ¿Selectores frágiles?

PROPORCIONA:
- Lista de problemas encontrados
- Código refactorizado para cada uno
```

**OpenCode proporciona**:
```typescript
// Ejemplo de fix para race condition
// ❌ ANTES (flaky)
await page.click('button.add-cart');
const message = await page.textContent('.notification');
expect(message).toContain('Agregado');

// ✅ DESPUÉS (robusto)
await page.click('button.add-cart');
await expect(page.locator('.notification')).toContainText('Agregado');
// Auto-waiting en Playwright espera que aparezca
```

---

## Parte 5: Actualizar Test Data

### Generar Nuevos Datos Compatibles

**Problema**: Base de datos cambió formato de datos

**Prompt**:
```
Schema de datos cambió:

ANTES:
usuarios = { id, nombre, apellido, email, activo }

DESPUÉS:
usuarios = { id, nombre, apellido, email, activo, perfil: 'estudiante'|'profesor', carrera? }

TENGO: 100 factories generadas con schema antiguo

ACTUALIZAR:
- Factory de usuarios (agregar perfil, carrera)
- Todas las migraciones de test data
- Validaciones Zod

Mantener compatibilidad si es posible.
```

**OpenCode actualiza factories**:
```typescript
// test-data/users.factory.ts (ACTUALIZADO)
export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  activo: boolean;
  perfil: 'estudiante' | 'profesor';  // ✨ Nuevo
  carrera?: string;  // ✨ Nuevo (opcional)
}

export function createUsuario(overrides?: Partial<Usuario>): Usuario {
  // ... Lógica actualizada
  const usuario: Usuario = {
    // ...
    perfil: faker.helpers.arrayElement(['estudiante', 'profesor']),
    carrera: 
      overrides?.perfil === 'profesor' 
        ? undefined 
        : faker.helpers.arrayElement(['Informática', 'Civil']),
  };
  return { ...usuario, ...overrides };
}
```

---

## Resumen: Mantenimiento Sostenible

### Checklist de Calidad

```typescript
// ✅ Tests sostenibles tienen:
- [ ] Page Objects (no duplicación)
- [ ] Selectores robustos (getByRole, getByLabel)
- [ ] Auto-waiting explícito (expect con locators)
- [ ] Test data actualizada (factories con schema actual)
- [ ] Documentación de helpers
- [ ] Monitoreo de flakiness
- [ ] CI/CD con retries configurados
- [ ] Alertas cuando tests se rompen
```

---

*Tutorial: Test Maintenance AI - Módulo 05 IA para QA - FPUNA 2026*
