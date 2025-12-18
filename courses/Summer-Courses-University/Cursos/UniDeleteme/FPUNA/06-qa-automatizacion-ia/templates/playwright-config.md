# Template: Configuración de Playwright
## playwright.config.ts Completo y Comentado

---

## Configuración Básica

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // ═══════════════════════════════════════════════════════════
  // CONFIGURACIÓN DE TESTS
  // ═══════════════════════════════════════════════════════════

  // Directorio donde están los tests
  testDir: './tests',

  // Patrón de archivos de test
  testMatch: '**/*.spec.ts',

  // Ignorar archivos
  testIgnore: ['**/node_modules/**', '**/fixtures/**'],

  // ═══════════════════════════════════════════════════════════
  // EJECUCIÓN
  // ═══════════════════════════════════════════════════════════

  // Ejecutar tests en paralelo
  fullyParallel: true,

  // Fallar si hay test.only() en CI (evita commits accidentales)
  forbidOnly: !!process.env.CI,

  // Reintentos: más en CI para manejar flakiness
  retries: process.env.CI ? 2 : 0,

  // Workers: limitados en CI para estabilidad
  workers: process.env.CI ? 1 : undefined,

  // Timeout global para cada test (30 segundos)
  timeout: 30000,

  // Timeout para expect() (5 segundos)
  expect: {
    timeout: 5000,
  },

  // ═══════════════════════════════════════════════════════════
  // REPORTERS
  // ═══════════════════════════════════════════════════════════

  reporter: [
    // Reporte HTML interactivo
    ['html', {
      open: 'never',
      outputFolder: 'playwright-report',
    }],

    // Salida en consola
    ['list'],

    // Anotaciones en GitHub PRs
    ...(process.env.CI ? [['github']] : []),

    // JSON para procesamiento
    // ['json', { outputFile: 'results.json' }],

    // JUnit para CI tools
    // ['junit', { outputFile: 'results.xml' }],
  ],

  // ═══════════════════════════════════════════════════════════
  // CONFIGURACIÓN GLOBAL DE USE
  // ═══════════════════════════════════════════════════════════

  use: {
    // URL base para navegación relativa
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    // Headers HTTP adicionales
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },

    // ─────────────────────────────────────────────────────────
    // Captura de evidencia
    // ─────────────────────────────────────────────────────────

    // Trace para debugging
    // 'on' | 'off' | 'on-first-retry' | 'retain-on-failure'
    trace: 'on-first-retry',

    // Screenshots
    // 'on' | 'off' | 'only-on-failure'
    screenshot: 'only-on-failure',

    // Videos
    // 'on' | 'off' | 'on-first-retry' | 'retain-on-failure'
    video: 'retain-on-failure',

    // ─────────────────────────────────────────────────────────
    // Navegador
    // ─────────────────────────────────────────────────────────

    // Viewport por defecto
    viewport: { width: 1280, height: 720 },

    // Ignorar errores HTTPS
    ignoreHTTPSErrors: true,

    // Locale del navegador
    locale: 'es-PY',

    // Timezone
    timezoneId: 'America/Asuncion',

    // Geolocalización (opcional)
    // geolocation: { latitude: -25.2637, longitude: -57.5759 },

    // Permisos
    // permissions: ['geolocation'],

    // ─────────────────────────────────────────────────────────
    // Acciones
    // ─────────────────────────────────────────────────────────

    // Timeout para acciones (click, fill, etc.)
    actionTimeout: 10000,

    // Timeout para navegación
    navigationTimeout: 30000,
  },

  // ═══════════════════════════════════════════════════════════
  // PROYECTOS (Navegadores/Dispositivos)
  // ═══════════════════════════════════════════════════════════

  projects: [
    // ─────────────────────────────────────────────────────────
    // Desktop Browsers
    // ─────────────────────────────────────────────────────────
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // ─────────────────────────────────────────────────────────
    // Mobile Devices
    // ─────────────────────────────────────────────────────────
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },

    // ─────────────────────────────────────────────────────────
    // Tablets
    // ─────────────────────────────────────────────────────────
    {
      name: 'tablet',
      use: { ...devices['iPad Pro 11'] },
    },
  ],

  // ═══════════════════════════════════════════════════════════
  // WEB SERVER (Opcional)
  // ═══════════════════════════════════════════════════════════

  // Iniciar servidor antes de tests
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120000,
  // },

  // ═══════════════════════════════════════════════════════════
  // OUTPUT
  // ═══════════════════════════════════════════════════════════

  // Directorio para resultados de tests
  outputDir: 'test-results',

  // Preservar output en tests que pasan (false = solo fallidos)
  preserveOutput: 'failures-only',
});
```

---

## Configuración Mínima

```typescript
// playwright.config.ts - versión mínima
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
  },
});
```

---

## Configuración para CI/CD

```typescript
// playwright.config.ts - optimizada para CI
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'on-failure' }]],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

---

## Configuración con Autenticación

```typescript
// playwright.config.ts - con setup de auth
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  projects: [
    // Setup: genera estado de autenticación
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // Tests que requieren autenticación
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // Tests sin autenticación
    {
      name: 'chromium-no-auth',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.noauth\.spec\.ts/,
    },
  ],
});
```

---

## Variables de Entorno

```typescript
// playwright.config.ts - con variables de entorno
import { defineConfig } from '@playwright/test';

// Cargar .env si existe
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
    },
  },

  // Definir variables globales
  // Accesibles en tests como process.env.VAR_NAME
});
```

```bash
# .env
BASE_URL=http://localhost:3000
API_TOKEN=your-token-here
TEST_USER_EMAIL=test@test.com
TEST_USER_PASSWORD=password123
```

---

## Uso

1. Copiar configuración apropiada
2. Ajustar `baseURL`
3. Configurar proyectos según navegadores necesarios
4. Ajustar timeouts según aplicación
5. Configurar reporters según necesidades

---

*Ver también: templates/github-workflow.md*
