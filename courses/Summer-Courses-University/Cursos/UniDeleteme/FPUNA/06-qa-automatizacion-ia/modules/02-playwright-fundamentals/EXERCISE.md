# Ejercicio: Módulo 2
## Tests para Formulario de Login

---

## Objetivo

Crear una suite completa de tests para un formulario de login, practicando locators, acciones y assertions.

**Duración:** 30 minutos

---

## Parte 1: Configuración (5 minutos)

### Crear archivo de test

Crea el archivo `tests/login.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

// URL de práctica (usa una de estas opciones)
const LOGIN_URL = 'https://the-internet.herokuapp.com/login';
// Alternativa: 'https://practicetestautomation.com/practice-test-login/'

test.describe('Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navegar antes de cada test
    await page.goto(LOGIN_URL);
  });

  // Tests aquí...
});
```

---

## Parte 2: Tests de Elementos (10 minutos)

### Test 1: Verificar elementos de la página

```typescript
test('página de login tiene todos los elementos', async ({ page }) => {
  // COMPLETAR: Verificar que existe el título
  await expect(page.____________('heading', { name: /login/i })).toBeVisible();

  // COMPLETAR: Verificar input de username
  await expect(page.____________('Username')).toBeVisible();

  // COMPLETAR: Verificar input de password
  await expect(page.____________('Password')).toBeVisible();

  // COMPLETAR: Verificar botón de login
  await expect(page.____________('button', { name: /login/i })).toBeVisible();
});
```

### Test 2: Placeholders correctos

```typescript
test('inputs tienen placeholders correctos', async ({ page }) => {
  // Verificar placeholder o atributo
  const usernameInput = page.locator('#username');
  const passwordInput = page.locator('#password');

  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  // COMPLETAR: Verificar que password es tipo password
  await expect(passwordInput).toHaveAttribute('____', '________');
});
```

---

## Parte 3: Tests Funcionales (15 minutos)

### Test 3: Login exitoso

```typescript
test('login exitoso con credenciales válidas', async ({ page }) => {
  // Credenciales para the-internet.herokuapp.com
  const validUsername = 'tomsmith';
  const validPassword = 'SuperSecretPassword!';

  // COMPLETAR: Llenar username
  await page.locator('#username')._______(validUsername);

  // COMPLETAR: Llenar password
  await page.locator('#password')._______(validPassword);

  // COMPLETAR: Click en login
  await page.getByRole('button', { name: /login/i })._______();

  // COMPLETAR: Verificar que llegamos al dashboard
  await expect(page).toHaveURL(/secure/);

  // COMPLETAR: Verificar mensaje de éxito
  await expect(page.getByText(/logged in/i)).____________();
});
```

### Test 4: Login fallido - usuario incorrecto

```typescript
test('muestra error con usuario incorrecto', async ({ page }) => {
  // COMPLETAR: Llenar con usuario inválido
  await page.locator('#username').fill('_____________');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: /login/i }).click();

  // COMPLETAR: Verificar mensaje de error
  await expect(page.locator('.flash.error')).____________();
  await expect(page.locator('.flash.error')).toContainText('____________');
});
```

### Test 5: Login fallido - contraseña incorrecta

```typescript
test('muestra error con contraseña incorrecta', async ({ page }) => {
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('wrongpassword');
  await page.getByRole('button', { name: /login/i }).click();

  // COMPLETAR: Verificar error específico de password
  await expect(page.locator('.flash.error')).toContainText(/password/i);
});
```

### Test 6: Campos vacíos

```typescript
test('muestra error con campos vacíos', async ({ page }) => {
  // Click sin llenar nada
  await page.getByRole('button', { name: /login/i }).click();

  // Debe mostrar error
  await expect(page.locator('.flash.error')).toBeVisible();
});
```

---

## Parte 4: Tests Adicionales (Bonus)

### Test 7: Logout después de login

```typescript
test('puede hacer logout después de login', async ({ page }) => {
  // Login
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: /login/i }).click();

  // Esperar a estar en secure area
  await expect(page).toHaveURL(/secure/);

  // COMPLETAR: Click en logout
  await page.getByRole('link', { name: /logout/i })._______();

  // COMPLETAR: Verificar que volvimos al login
  await expect(page).toHaveURL(/login/);
});
```

### Test 8: Enter para submit

```typescript
test('puede hacer login con Enter', async ({ page }) => {
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');

  // COMPLETAR: Presionar Enter en vez de click
  await page.locator('#password').press('_______');

  await expect(page).toHaveURL(/secure/);
});
```

---

## Soluciones

### Test 1 - Solución:
```typescript
test('página de login tiene todos los elementos', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /login/i })).toBeVisible();
  await expect(page.getByLabel('Username')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
});
```

### Test 2 - Solución:
```typescript
test('inputs tienen placeholders correctos', async ({ page }) => {
  const usernameInput = page.locator('#username');
  const passwordInput = page.locator('#password');

  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(passwordInput).toHaveAttribute('type', 'password');
});
```

### Test 3 - Solución:
```typescript
test('login exitoso con credenciales válidas', async ({ page }) => {
  const validUsername = 'tomsmith';
  const validPassword = 'SuperSecretPassword!';

  await page.locator('#username').fill(validUsername);
  await page.locator('#password').fill(validPassword);
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page).toHaveURL(/secure/);
  await expect(page.getByText(/logged in/i)).toBeVisible();
});
```

### Test 4 - Solución:
```typescript
test('muestra error con usuario incorrecto', async ({ page }) => {
  await page.locator('#username').fill('wronguser');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page.locator('.flash.error')).toBeVisible();
  await expect(page.locator('.flash.error')).toContainText('username');
});
```

### Tests 7-8 - Solución:
```typescript
test('puede hacer logout después de login', async ({ page }) => {
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page).toHaveURL(/secure/);
  await page.getByRole('link', { name: /logout/i }).click();
  await expect(page).toHaveURL(/login/);
});

test('puede hacer login con Enter', async ({ page }) => {
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.locator('#password').press('Enter');
  await expect(page).toHaveURL(/secure/);
});
```

---

## Ejecutar Tests

```bash
# Ejecutar todos los tests de login
npx playwright test login.spec.ts

# Con navegador visible
npx playwright test login.spec.ts --headed

# Un test específico
npx playwright test login.spec.ts -g "login exitoso"

# Modo debug
npx playwright test login.spec.ts --debug

# Ver reporte
npx playwright show-report
```

---

## Checklist de Entrega

- [ ] 6+ tests funcionando
- [ ] Uso de `getByRole`, `getByLabel`, `locator`
- [ ] Assertions variadas (`toBeVisible`, `toHaveURL`, `toContainText`)
- [ ] Tests de caso positivo y negativo
- [ ] Uso de `beforeEach` para setup
- [ ] Todos los tests pasan

---

## Reflexión

1. ¿Cuál locator te pareció más fácil de usar?

   _______________________________________________

2. ¿Qué diferencia notaste entre `fill()` y `type()`?

   _______________________________________________

3. ¿Cómo ayudó el modo `--debug` a entender los errores?

   _______________________________________________

---

*Tiempo total: 30 minutos*
