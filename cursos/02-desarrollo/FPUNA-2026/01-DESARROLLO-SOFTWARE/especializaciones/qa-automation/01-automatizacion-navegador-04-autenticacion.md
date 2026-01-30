# Tutorial: Autenticación y Sesiones
## Módulo 01: Playwright Avanzado

**Duración**: 25 minutos  
**Nivel**: Intermedio  
**Prerequisitos**: Conceptos básicos de login

---

## El Problema: Login Repetido

### Escenario Típico ❌

```typescript
test('ver perfil', async ({ page }) => {
  // Login aquí
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@ejemplo.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
  
  // Ahora el test real
  await page.goto('/perfil');
  // ... assertions
});

test('editar perfil', async ({ page }) => {
  // Login OTRA VEZ 😢
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@ejemplo.com');
  // ... repetir
});

test('cambiar contraseña', async ({ page }) => {
  // Login OTRA VEZ 😢😢😢
  // ...
});
```

**Problema**: Si tienes 20 tests, repites login 20 veces. Eso es:
- Lento (4 segundos x 20 = 80 segundos)
- Repetitivo
- Difícil de mantener

---

## Solución 1: Storage State (⭐ Recomendado)

### Concepto

1. **Setup**: Hacer login UNA SOLA VEZ y guardar el estado
2. **Tests**: Reutilizar ese estado para todos los tests

```
┌──────────────────────┐
│ auth.setup.ts        │  ← Ejecuta una sola vez
│ Login + Guardar      │     en: auth.json
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────────────────┐
│ todos los tests                          │
│ Cargan state desde auth.json (instant)   │
└──────────────────────────────────────────┘
```

### Implementación

**1. Crear archivo de setup**

```typescript
// tests/auth.setup.ts
import { test as setup } from '@playwright/test';

setup('hacer login y guardar state', async ({ page }) => {
  // Ir a login
  await page.goto('http://localhost:3000/login');
  
  // Llenar credenciales
  await page.fill('[name="email"]', 'user@ejemplo.com');
  await page.fill('[name="password"]', 'password123');
  
  // Hacer clic en submit
  await page.click('button[type="submit"]');
  
  // Esperar a que redirija a dashboard
  await page.waitForURL('**/dashboard');
  
  // ⭐ GUARDAR EL ESTADO
  await page.context().storageState({ path: 'auth.json' });
});
```

**2. Configurar Playwright**

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    // Proyecto "setup" - corre PRIMERO
    { 
      name: 'setup', 
      testMatch: /auth\.setup\.ts/,
      use: { ...devices['Desktop Chrome'] }
    },
    
    // Proyecto "tests" - usa state del setup
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // ⭐ CARGAR STATE GUARDADO
        storageState: 'auth.json'
      },
      // ⭐ Este proyecto depende del "setup"
      dependencies: ['setup']
    }
  ]
});
```

**3. Ahora los tests están autenticados**

```typescript
// tests/perfil.spec.ts
test('ver perfil', async ({ page }) => {
  // Ya está autenticado! No necesita login
  await page.goto('/perfil');
  
  await expect(page.getByText('user@ejemplo.com')).toBeVisible();
});

test('editar perfil', async ({ page }) => {
  // Ya está autenticado!
  await page.goto('/perfil');
  
  await page.fill('[name="nombre"]', 'Juan Pérez');
  await page.click('button[type="submit"]');
  
  await expect(page.getByText('Perfil actualizado')).toBeVisible();
});

test('cambiar contraseña', async ({ page }) => {
  // Ya está autenticado!
  await page.goto('/seguridad');
  
  await page.fill('[name="password-actual"]', 'password123');
  await page.fill('[name="password-nueva"]', 'nuevapassword');
  // ...
});
```

**Resultado**:
- Primera ejecución: 5s (setup) + 3s (tests) = 8 segundos
- Sin storage state: 80 segundos 🔥

---

### ¿Qué guarda `storageState`?

```json
{
  "cookies": [
    {
      "name": "session_id",
      "value": "abc123xyz...",
      "domain": "localhost",
      "path": "/",
      "expires": 1234567890,
      "httpOnly": true,
      "secure": false,
      "sameSite": "Lax"
    }
  ],
  "origins": [
    {
      "origin": "http://localhost:3000",
      "localStorage": [
        {
          "name": "user_preferences",
          "value": "{\"theme\":\"dark\"}"
        }
      ]
    }
  ]
}
```

Guarda:
- ✅ Cookies de sesión
- ✅ LocalStorage
- ✅ SessionStorage

---

## Solución 2: Fixture Personalizado

Si prefieres no usar storage state (ej: sesiones que expiran rápido):

```typescript
// tests/fixtures/authenticated-page.ts
import { test as base } from '@playwright/test';

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // SETUP: Hacer login
    await page.goto('/login');
    await page.fill('[name="email"]', 'user@ejemplo.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
    
    // USE: Pasar página autenticada al test
    await use(page);
    
    // TEARDOWN: Logout (opcional)
    await page.goto('/logout');
  }
});

export { expect };
```

**Usar el fixture**:

```typescript
// tests/perfil.spec.ts
import { test, expect } from './fixtures/authenticated-page';

test('ver perfil', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/perfil');
  await expect(authenticatedPage.getByText('user@ejemplo.com')).toBeVisible();
});
```

---

## Manejo de Múltiples Usuarios

### Storage State Para Cada Usuario

```typescript
// tests/auth.setup.ts
import { test as setup } from '@playwright/test';

setup('login como admin', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'admin@ejemplo.com');
  await page.fill('[name="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
  
  // Guardar como admin
  await page.context().storageState({ path: 'auth/admin.json' });
});

setup('login como usuario normal', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@ejemplo.com');
  await page.fill('[name="password"]', 'user123');
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
  
  // Guardar como usuario
  await page.context().storageState({ path: 'auth/user.json' });
});
```

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    
    {
      name: 'admin',
      use: { storageState: 'auth/admin.json' },
      dependencies: ['setup']
    },
    
    {
      name: 'user',
      use: { storageState: 'auth/user.json' },
      dependencies: ['setup']
    }
  ]
});
```

```typescript
// tests/admin.spec.ts
test('admin puede ver todos los usuarios', async ({ page }) => {
  await page.goto('/admin/usuarios');
  await expect(page.locator('table tbody tr')).toHaveCount(100);
});

// tests/user.spec.ts
test('usuario normal no puede acceder a admin', async ({ page }) => {
  await page.goto('/admin/usuarios');
  await expect(page).toHaveURL('/acceso-denegado');
});
```

---

## Sesiones que Expiran

### Problema

Algunas APIs tienen sesiones cortas. `storageState` puede expirar.

### Solución

```typescript
test('renovar sesión si expiró', async ({ page }) => {
  await page.goto('/dashboard');
  
  // Si ve página de login, hacer login nuevo
  if (await page.locator('text=Iniciar Sesión').isVisible()) {
    await page.goto('/login');
    await page.fill('[name="email"]', 'user@ejemplo.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
  }
  
  // Ahora continuar con el test
  await expect(page.getByText('Bienvenido')).toBeVisible();
});
```

---

## Mejor Práctica: Verificar Autenticación

```typescript
test.beforeEach(async ({ page }) => {
  // Verificar que está autenticado
  const response = await page.request.get('/api/auth/me');
  if (!response.ok()) {
    // No está autenticado, algo salió mal
    throw new Error('No authenticated - auth.json puede estar expirado');
  }
});
```

---

## Resumen

| Método | Velocidad | Mantenimiento | Cuándo Usar |
|--------|-----------|---------------|------------|
| **Storage State** | ⭐⭐⭐ Rápido | Fácil | Sesiones largas |
| **Fixture** | ⭐⭐ Medio | Medio | Sesiones cortas |
| **Login en cada test** | ⭐ Lento | Difícil | Testing login en sí |

---

## Próximas Secciones en Este Módulo

- [05_Performance.md](./05_Performance.md) - Optimizar velocidad de tests

---

*Tutorial: Authentication - Módulo 01 Playwright Avanzado - FPUNA 2026*
