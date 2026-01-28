# Ejemplo: Configuración de Autenticación
## Módulo 01: Playwright Avanzado

**Propósito**: Setup de autenticación reutilizable para todos los tests

---

## Prompt para OpenCode

```
Genera la configuración completa de autenticación para Playwright:

CONTEXTO:
Aplicación: Sistema de gestión con login
URL login: /login
Email test: user@ejemplo.com
Password test: testpassword123
Redirección post-login: /dashboard

REQUISITOS:

1. Archivo auth.setup.ts:
   - Test que hace login
   - Espera redirección a /dashboard
   - Guarda state en auth.json
   - Comentarios explicativos

2. playwright.config.ts:
   - Proyecto "setup" que ejecuta auth.setup.ts
   - Proyecto "chromium" que usa auth.json
   - Dependencias correctas
   - webServer para levantar app local

3. Test exemplo:
   - Muestra cómo usar autenticación
   - Accede a página protegida
   - Verifica que está autenticado

SALIDA:
- Código ready para copiar-pegar
- Instrucciones paso a paso
- Ejemplos de uso
```

---

## Salida Esperada

### 1. tests/auth.setup.ts

```typescript
import { test as setup } from '@playwright/test';

setup('hacer login y guardar state', async ({ page }) => {
  // Ir a la página de login
  await page.goto('http://localhost:3000/login');

  // Llenar credenciales
  await page.fill('[name="email"]', 'user@ejemplo.com');
  await page.fill('[name="password"]', 'testpassword123');

  // Hacer clic en botón de submit
  await page.click('button[type="submit"]');

  // Esperar a redirección (indicador de login exitoso)
  await page.waitForURL('**/dashboard');

  // ⭐ IMPORTANTE: Guardar el estado (cookies, localStorage, etc)
  await page.context().storageState({ path: 'auth.json' });
});
```

### 2. playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    // ========================================
    // PASO 1: Ejecutar setup (login)
    // ========================================
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      use: { ...devices['Desktop Chrome'] }
    },

    // ========================================
    // PASO 2: Ejecutar tests con autenticación
    // ========================================
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Cargar el estado guardado (cookies, localStorage)
        storageState: 'auth.json'
      },
      // Este proyecto depende de "setup"
      dependencies: ['setup']
    },

    // Opcional: Proyecto sin autenticación
    {
      name: 'chromium-logged-out',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});
```

### 3. tests/autenticacion.spec.ts (Ejemplo de uso)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Tests con Autenticación', () => {
  
  test('acceder a dashboard autenticado', async ({ page }) => {
    // Ya está autenticado (storageState lo cargan automáticamente)
    await page.goto('/dashboard');
    
    // Verificar que está en dashboard (no redirigido a login)
    await expect(page).toHaveURL('**/dashboard');
    
    // Verificar contenido que solo ve usuario autenticado
    await expect(page.getByText(/Bienvenido/i)).toBeVisible();
  });

  test('ver perfil del usuario', async ({ page }) => {
    await page.goto('/perfil');
    
    // Debe mostrar datos del usuario
    await expect(page.getByText('user@ejemplo.com')).toBeVisible();
  });

  test('logout y redirecciona a login', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Hacer logout
    await page.click('button[name="logout"]');
    
    // Debe redirigir a login
    await expect(page).toHaveURL('**/login');
  });
});
```

---

## Cómo Implementar

### Paso 1: Crear archivo setup

```bash
# Crear archivos
touch tests/auth.setup.ts
```

Pega el contenido de `tests/auth.setup.ts` arriba.

### Paso 2: Actualizar playwright.config.ts

Reemplaza todo el archivo con el config de arriba.

### Paso 3: Crear test ejemplo

```bash
touch tests/autenticacion.spec.ts
```

Pega el contenido del test.

### Paso 4: Ejecutar

```bash
# Primera ejecución: hace login y guarda auth.json
npx playwright test

# Verifica que se creó auth.json
ls auth.json

# Próximas ejecuciones: usan el estado guardado
npx playwright test
```

---

## Gestionar Múltiples Usuarios

### Variante: Dos usuarios diferentes

```typescript
// tests/auth.setup.ts
import { test as setup } from '@playwright/test';

setup('login como admin', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'admin@ejemplo.com');
  await page.fill('[name="password"]', 'adminpass');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard');
  
  // Guardar como admin
  await page.context().storageState({ path: 'auth-admin.json' });
});

setup('login como usuario', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@ejemplo.com');
  await page.fill('[name="password"]', 'userpass');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/dashboard');
  
  // Guardar como user
  await page.context().storageState({ path: 'auth-user.json' });
});
```

```typescript
// playwright.config.ts (modificado)
projects: [
  { name: 'setup', testMatch: /auth\.setup\.ts/ },
  {
    name: 'admin',
    use: { storageState: 'auth-admin.json' },
    dependencies: ['setup']
  },
  {
    name: 'user',
    use: { storageState: 'auth-user.json' },
    dependencies: ['setup']
  }
]
```

Ejecutar como admin o user:

```bash
npx playwright test --project=admin
npx playwright test --project=user
```

---

## Troubleshooting

### Problema: "auth.json no encontrado"

```bash
# auth.json no se creó, check:
1. ¿El test de auth.setup.ts pasó?
2. ¿El endpoint /dashboard existe?
3. ¿Las credenciales son correctas?

# Debug:
npx playwright test --debug tests/auth.setup.ts
```

### Problema: "Test redirigido a login"

La sesión expiró.

```bash
# Regenerar auth.json
rm auth.json
npx playwright test tests/auth.setup.ts

# O agregar renovación automática:
test.beforeEach(async ({ page }) => {
  const response = await page.request.get('/api/auth/me');
  if (!response.ok()) {
    // Session expiró, relogin
    // ... hacer login de nuevo
  }
});
```

---

## .gitignore

Agregar a `.gitignore` para no commitear estados:

```
auth.json
auth-*.json
test-results/
.auth/
```

---

*Ejemplo: Authentication Setup - Módulo 01 Playwright Avanzado - FPUNA 2026*
