# Ejercicio: Módulo 4
## Generar Suite de Tests con IA

---

## Objetivo

Usar IA (Claude, ChatGPT, o Copilot) para generar una suite completa de tests para una página de registro.

**Duración:** 30 minutos

---

## Parte 1: Preparar el Contexto (5 minutos)

### HTML de la Página de Registro

Usa este HTML como referencia para tus prompts:

```html
<form id="registration-form" action="/register" method="POST">
  <h2>Create Account</h2>

  <div class="form-group">
    <label for="firstName">First Name</label>
    <input type="text" id="firstName" name="firstName"
           placeholder="Enter first name" required>
    <span class="error" id="firstNameError"></span>
  </div>

  <div class="form-group">
    <label for="lastName">Last Name</label>
    <input type="text" id="lastName" name="lastName"
           placeholder="Enter last name" required>
    <span class="error" id="lastNameError"></span>
  </div>

  <div class="form-group">
    <label for="email">Email Address</label>
    <input type="email" id="email" name="email"
           placeholder="email@example.com" required>
    <span class="error" id="emailError"></span>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" name="password"
           placeholder="Min 8 characters" required minlength="8">
    <span class="error" id="passwordError"></span>
  </div>

  <div class="form-group">
    <label for="confirmPassword">Confirm Password</label>
    <input type="password" id="confirmPassword" name="confirmPassword"
           placeholder="Repeat password" required>
    <span class="error" id="confirmPasswordError"></span>
  </div>

  <div class="form-group">
    <label>
      <input type="checkbox" id="terms" name="terms" required>
      I accept the <a href="/terms">Terms and Conditions</a>
    </label>
    <span class="error" id="termsError"></span>
  </div>

  <button type="submit" class="btn-register">Create Account</button>

  <p class="login-link">
    Already have an account? <a href="/login">Login here</a>
  </p>

  <div class="success-message" role="alert" hidden>
    Registration successful! Redirecting...
  </div>
</form>
```

---

## Parte 2: Generar Page Object (10 minutos)

### Prompt para Page Object

Copia y usa este prompt en Claude o ChatGPT:

```markdown
Genera un Page Object en TypeScript para Playwright basado en este HTML de registro:

[PEGAR HTML DE ARRIBA]

**Requisitos:**
1. Extender de BasePage (asume que existe)
2. Locators como readonly usando getByLabel y getByRole
3. Incluir estos métodos:
   - goto() - navegar a /register
   - fillForm(data) - llenar formulario completo
   - fillField(field, value) - llenar campo específico
   - submit() - click en botón submit
   - acceptTerms() - marcar checkbox
   - expectSuccess() - verificar registro exitoso
   - expectError(field, message) - verificar error en campo
   - expectFormVisible() - verificar formulario visible
4. Usar interface para datos del formulario
5. Documentar con comentarios breves

**Formato esperado:**
```typescript
interface RegistrationData {
  // ...
}

export class RegistrationPage extends BasePage {
  // ...
}
```
```

### Tu Tarea

1. Ejecuta el prompt en Claude o ChatGPT
2. Copia el código generado a `pages/RegistrationPage.ts`
3. Revisa y corrige si es necesario:

**Checklist de revisión:**
- [ ] Compila sin errores de TypeScript
- [ ] Todos los locators usan métodos accesibles
- [ ] Los métodos tienen async/await correcto
- [ ] La interface cubre todos los campos

---

## Parte 3: Generar Tests (10 minutos)

### Prompt para Tests

```markdown
Genera tests E2E con Playwright para la página de registro.

**Page Object disponible:**
```typescript
export class RegistrationPage extends BasePage {
  // Locators: firstNameInput, lastNameInput, emailInput,
  //           passwordInput, confirmPasswordInput, termsCheckbox,
  //           submitButton, successMessage, errorMessages

  // Métodos: goto(), fillForm(data), submit(), acceptTerms(),
  //          expectSuccess(), expectError(field, message)
}
```

**Casos de prueba a generar:**

1. **Registro exitoso** - Todos los campos válidos
2. **Error: Email inválido** - Email sin @
3. **Error: Contraseñas no coinciden** - password !== confirmPassword
4. **Error: Contraseña muy corta** - Menos de 8 caracteres
5. **Error: Términos no aceptados** - Checkbox sin marcar
6. **Error: Campos vacíos** - Enviar sin llenar nada
7. **Navegación a login** - Click en link de login

**Requisitos:**
- Usar describe() para agrupar
- Usar beforeEach() para navegar
- Generar datos con faker.js
- Assertions claras
- Un test por caso
```

### Tu Tarea

1. Ejecuta el prompt
2. Copia a `tests/registration.spec.ts`
3. Completa las partes que falten:

```typescript
// tests/registration.spec.ts
import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { faker } from '@faker-js/faker';

test.describe('Registration Tests', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
  });

  test('registro exitoso con datos válidos', async () => {
    // COMPLETAR: Código generado por IA
  });

  test('muestra error con email inválido', async () => {
    // COMPLETAR: Código generado por IA
  });

  // ... más tests
});
```

---

## Parte 4: Generar Factory de Datos (5 minutos)

### Prompt para Factory

```markdown
Genera una factory de datos de prueba para registro de usuarios.

**Interface:**
```typescript
interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}
```

**Requisitos:**
- Usar @faker-js/faker
- Función createRegistrationData() con valores válidos por defecto
- Función createInvalidEmail() - email sin formato
- Función createMismatchedPasswords() - passwords diferentes
- Función createWeakPassword() - password < 8 chars
- Override parcial de campos
```

### Resultado Esperado

```typescript
// data/factories/registrationFactory.ts
import { faker } from '@faker-js/faker';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export function createRegistrationData(
  overrides: Partial<RegistrationData> = {}
): RegistrationData {
  const password = faker.internet.password({ length: 12 });

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password,
    confirmPassword: password,
    acceptTerms: true,
    ...overrides,
  };
}

export function createInvalidEmailData(): RegistrationData {
  return createRegistrationData({
    email: 'invalid-email-without-at',
  });
}

export function createMismatchedPasswordsData(): RegistrationData {
  return createRegistrationData({
    password: 'Password123!',
    confirmPassword: 'DifferentPassword456!',
  });
}

export function createWeakPasswordData(): RegistrationData {
  return createRegistrationData({
    password: 'weak',
    confirmPassword: 'weak',
  });
}
```

---

## Entregable Final

### Estructura de archivos creados

```
qa-automation-fpuna/
├── pages/
│   ├── BasePage.ts
│   └── RegistrationPage.ts     ← Generado con IA
├── data/
│   └── factories/
│       └── registrationFactory.ts  ← Generado con IA
├── tests/
│   └── registration.spec.ts    ← Generado con IA
```

### Código Final de Tests (Ejemplo)

```typescript
// tests/registration.spec.ts
import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import {
  createRegistrationData,
  createInvalidEmailData,
  createMismatchedPasswordsData,
  createWeakPasswordData,
} from '../data/factories/registrationFactory';

test.describe('Registration Tests', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
  });

  test('registro exitoso con datos válidos', async () => {
    const data = createRegistrationData();

    await registrationPage.fillForm(data);
    await registrationPage.acceptTerms();
    await registrationPage.submit();

    await registrationPage.expectSuccess();
  });

  test('muestra error con email inválido', async () => {
    const data = createInvalidEmailData();

    await registrationPage.fillForm(data);
    await registrationPage.acceptTerms();
    await registrationPage.submit();

    await registrationPage.expectError('email', 'valid email');
  });

  test('muestra error cuando contraseñas no coinciden', async () => {
    const data = createMismatchedPasswordsData();

    await registrationPage.fillForm(data);
    await registrationPage.acceptTerms();
    await registrationPage.submit();

    await registrationPage.expectError('confirmPassword', 'match');
  });

  test('muestra error con contraseña muy corta', async () => {
    const data = createWeakPasswordData();

    await registrationPage.fillForm(data);
    await registrationPage.acceptTerms();
    await registrationPage.submit();

    await registrationPage.expectError('password', 'at least 8');
  });

  test('muestra error cuando términos no aceptados', async () => {
    const data = createRegistrationData();

    await registrationPage.fillForm(data);
    // No aceptar términos
    await registrationPage.submit();

    await registrationPage.expectError('terms', 'accept');
  });

  test('puede navegar a página de login', async () => {
    await registrationPage.clickLoginLink();
    await expect(registrationPage.page).toHaveURL(/login/);
  });
});
```

---

## Checklist de Entrega

- [ ] Page Object generado con IA y corregido
- [ ] Factory de datos generada con IA
- [ ] Suite de tests con 6+ casos
- [ ] Código compila sin errores
- [ ] Seguiste el patrón Page Object Model
- [ ] Usaste factories para datos de prueba

---

## Reflexión

1. ¿Qué porcentaje del código pudiste usar directamente de la IA?

   _______________________________________________

2. ¿Qué tipo de errores tuvo el código generado?

   _______________________________________________

3. ¿Fue más rápido que escribir desde cero?

   _______________________________________________

4. ¿Qué prompt funcionó mejor?

   _______________________________________________

---

*Tiempo total: 30 minutos*
