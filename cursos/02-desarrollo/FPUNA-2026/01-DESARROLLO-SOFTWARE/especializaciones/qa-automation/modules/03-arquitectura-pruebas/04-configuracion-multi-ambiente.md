# Tutorial: Configuración Multi-Ambiente
## Módulo 03: Arquitectura de Pruebas

**Duración**: 40 minutos  
**Nivel**: Intermedio  
**Prerequisitos**: Module 01-02

---

## El Problema: Mismo Test, Diferentes Ambientes

### Escenario Real

```typescript
// ❌ Problema: URLs hardcodeadas
test('login en admin', async ({ page }) => {
  // ¿A cuál servidor vamos?
  await page.goto('http://localhost:3000/login');  // Local
  
  // ¿Credenciales de quién?
  await page.fill('[name="email"]', 'admin@fpuna.edu.py');
  await page.fill('[name="password"]', 'password123');
  
  await page.click('button[type="submit"]');
});

// El mismo test se debe ejecutar en:
// ✅ Local (desarrollo)
// ✅ Staging (pruebas antes de producción)
// ✅ Producción (verificación final)

// Pero no queremos cambiar el código manualmente 😢
```

**Problemas**:
- 🔄 Cambiar URLs manualmente en CADA archivo de test
- 🔐 Credenciales hardcodeadas = Riesgo de seguridad
- 🐛 Fácil olvidar cambiar un ambiente antes de ejecutar
- 📝 Duplicación de tests para cada ambiente

---

## Concepto: Variables de Ambiente

```
┌─────────────────────────────────────────┐
│         ARCHIVO DE CONFIGURACIÓN        │
├─────────────────────────────────────────┤
│  .env.local:                            │
│  PLAYWRIGHT_BASE_URL=http://localhost   │
│  API_URL=http://localhost:3001          │
│  TEST_USER_EMAIL=user@test              │
│                                         │
│  .env.staging:                          │
│  PLAYWRIGHT_BASE_URL=https://staging    │
│  API_URL=https://api.staging            │
│  TEST_USER_EMAIL=user@staging           │
│                                         │
│  .env.prod:                             │
│  PLAYWRIGHT_BASE_URL=https://prod       │
│  API_URL=https://api.prod               │
│  TEST_USER_EMAIL=user@prod              │
└─────────────────────────────────────────┘
         ↓
    TEST LE LO VARIABLES
         ↓
    FUNCIONA EN CUALQUIER AMBIENTE
```

---

## Ejemplos Prácticos

### Ejemplo 1: Configuración Básica con .env

```bash
# .env.local
PLAYWRIGHT_BASE_URL=http://localhost:3000
API_URL=http://localhost:3001
TEST_EMAIL=usuario@test.local
TEST_PASSWORD=TestPass123!
LOG_LEVEL=debug

# .env.staging
PLAYWRIGHT_BASE_URL=https://staging.fpuna.edu.py
API_URL=https://api-staging.fpuna.edu.py
TEST_EMAIL=usuario@test.staging
TEST_PASSWORD=StagingPass123!
LOG_LEVEL=info

# .env.prod
PLAYWRIGHT_BASE_URL=https://fpuna.edu.py
API_URL=https://api.fpuna.edu.py
TEST_EMAIL=usuario@prod
TEST_PASSWORD=ProdPass123!
LOG_LEVEL=error
```

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Cargar variables según ambiente
const ambiente = process.env.AMBIENTE || 'local';
dotenv.config({ path: `.env.${ambiente}` });

export default defineConfig({
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
```

```typescript
// test-login.spec.ts
import { test, expect } from '@playwright/test';

test('login con credenciales de test', async ({ page, baseURL }) => {
  // No necesita hardcodear URL
  await page.goto('/login');  // Usa baseURL de config
  
  // Usar credenciales del .env
  await page.fill('[name="email"]', process.env.TEST_EMAIL!);
  await page.fill('[name="password"]', process.env.TEST_PASSWORD!);
  
  await page.click('button[type="submit"]');
  
  // Verificar éxito
  await expect(page).toHaveURL('/dashboard');
});

// Ejecutar:
// npm test (usa .env.local)
// AMBIENTE=staging npm test (usa .env.staging)
// AMBIENTE=prod npm test (usa .env.prod)
```

### Ejemplo 2: Archivo de Configuración TypeScript

```typescript
// config/environments.ts
export const environments = {
  local: {
    baseURL: 'http://localhost:3000',
    apiURL: 'http://localhost:3001',
    testUser: {
      email: 'admin@test.local',
      password: 'TestPass123!'
    },
    timeout: 30000,
    slowMo: 100  // Debug más lento
  },

  staging: {
    baseURL: 'https://staging.fpuna.edu.py',
    apiURL: 'https://api-staging.fpuna.edu.py',
    testUser: {
      email: 'admin@staging',
      password: 'StagingPass123!'
    },
    timeout: 60000,
    slowMo: 0
  },

  production: {
    baseURL: 'https://fpuna.edu.py',
    apiURL: 'https://api.fpuna.edu.py',
    testUser: {
      email: 'admin@prod',
      password: 'ProdPass123!'
    },
    timeout: 60000,
    slowMo: 0,
    headless: true  // Siempre headless en prod
  }
};

// Obtener ambiente actual
export function getEnvironment() {
  const env = (process.env.AMBIENTE || 'local') as keyof typeof environments;
  
  if (!environments[env]) {
    throw new Error(`Ambiente desconocido: ${env}`);
  }
  
  return environments[env];
}
```

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';
import { getEnvironment } from './config/environments';

const config = getEnvironment();

export default defineConfig({
  use: {
    baseURL: config.baseURL,
    ...config
  }
});
```

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { getEnvironment } from '../config/environments';

test('login con ambiente configurado', async ({ page }) => {
  const config = getEnvironment();
  
  await page.goto('/login');
  await page.fill('[name="email"]', config.testUser.email);
  await page.fill('[name="password"]', config.testUser.password);
  
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

### Ejemplo 3: Configuración Condicional Avanzada

```typescript
// config/config.ts
interface Config {
  baseURL: string;
  apiURL: string;
  auth: {
    email: string;
    password: string;
  };
  timeouts: {
    page: number;
    api: number;
    assertion: number;
  };
  features: {
    bypassAuth: boolean;  // Saltarse login en tests
    recordVideo: boolean;
    captureScreenshot: boolean;
  };
}

const baseConfig: Config = {
  baseURL: 'http://localhost:3000',
  apiURL: 'http://localhost:3001',
  auth: {
    email: 'test@test.local',
    password: 'TestPass123!'
  },
  timeouts: {
    page: 30000,
    api: 10000,
    assertion: 5000
  },
  features: {
    bypassAuth: true,  // Local es rápido
    recordVideo: false,
    captureScreenshot: false
  }
};

const stagingConfig: Config = {
  ...baseConfig,
  baseURL: 'https://staging.fpuna.edu.py',
  apiURL: 'https://api-staging.fpuna.edu.py',
  auth: {
    email: 'test@staging',
    password: 'StagingPass123!'
  },
  features: {
    bypassAuth: false,  // Staging usa login real
    recordVideo: true,  // Grabar videos en staging
    captureScreenshot: true
  }
};

const prodConfig: Config = {
  ...stagingConfig,
  baseURL: 'https://fpuna.edu.py',
  apiURL: 'https://api.fpuna.edu.py',
  auth: {
    email: process.env.PROD_TEST_EMAIL!,
    password: process.env.PROD_TEST_PASSWORD!
  },
  timeouts: {
    page: 60000,  // Más tiempo en prod
    api: 15000,
    assertion: 10000
  }
};

export function getConfig(): Config {
  const env = process.env.AMBIENTE || 'local';

  switch (env) {
    case 'staging':
      return stagingConfig;
    case 'prod':
      return prodConfig;
    case 'local':
    default:
      return baseConfig;
  }
}
```

### Ejemplo 4: Feature Flags en Tests

```typescript
// Algunos tests solo se ejecutan en ciertos ambientes
// features/api-testing.spec.ts

import { test, expect } from '@playwright/test';
import { getConfig } from '../config/config';

test.describe('API Testing', () => {
  // Este test solo se ejecuta en local/staging (no en prod)
  test('crear datos de prueba', async ({ page }) => {
    const config = getConfig();

    test.skip(
      process.env.AMBIENTE === 'prod',
      'No crear datos en producción'
    );

    const response = await page.request.post(`${config.apiURL}/usuarios`, {
      data: {
        email: 'test@test.local',
        nombre: 'Usuario Test'
      }
    });

    expect(response.ok()).toBe(true);
  });

  // Este test se ejecuta en todos los ambientes
  test('verificar endpoints públicos', async ({ page }) => {
    const response = await page.request.get(
      process.env.API_URL + '/health'
    );

    expect(response.status()).toBe(200);
  });

  // Este test solo en producción
  test('verificar SSL en producción', async ({ page }) => {
    test.skip(
      process.env.AMBIENTE !== 'prod',
      'Solo verificar SSL en producción'
    );

    const response = await page.request.get('https://fpuna.edu.py');
    expect(response.ok()).toBe(true);
  });
});
```

### Ejemplo 5: Credenciales Seguras

```typescript
// ❌ Malo: Hardcodear contraseñas
const password = 'MySecurePassword123!';

// ✅ Bueno: Variables de ambiente
const password = process.env.TEST_PASSWORD!;

// ✅ Mejor: Variables de CI/CD
// En GitHub Actions:
// - Usar GitHub Secrets para credenciales
// - CI/CD pasa credenciales como env vars
// - Nunca guardar credenciales en repo

// .github/workflows/test.yml
jobs:
  test:
    runs-on: ubuntu-latest
    env:
      PROD_TEST_EMAIL: ${{ secrets.PROD_TEST_EMAIL }}
      PROD_TEST_PASSWORD: ${{ secrets.PROD_TEST_PASSWORD }}
    steps:
      - run: npm test
```

---

## Mejores Prácticas

### ✅ BUENO

```typescript
// 1. Usar baseURL de config
await page.goto('/login');  // Relativo, usa baseURL

// 2. Cargar credenciales de variables
const email = process.env.TEST_EMAIL!;

// 3. Configuración por ambiente
const config = getEnvironment();
const timeout = config.timeout;

// 4. Feature flags para tests
test.skip(isProduction, 'No ejecutar en producción');

// 5. Secrets en CI/CD
// GitHub Secrets → Env vars → Config
```

### ❌ MALO

```typescript
// ❌ URLs hardcodeadas
await page.goto('http://localhost:3000/login');

// ❌ Contraseñas en código
const password = 'AdminPass123!';

// ❌ No soportar múltiples ambientes
// El test solo funciona en local

// ❌ Credenciales en repo
// .env con datos reales guardado en Git
```

---

## Ejecutar Tests en Diferentes Ambientes

```bash
# Local (default)
npm test

# Staging
AMBIENTE=staging npm test

# Producción
AMBIENTE=prod npm test

# Con variables adicionales
AMBIENTE=staging LOG_LEVEL=debug npm test

# En CI/CD (GitHub Actions)
- name: Run tests on staging
  env:
    AMBIENTE: staging
    PROD_TEST_EMAIL: ${{ secrets.PROD_TEST_EMAIL }}
  run: npm test
```

---

## Resumen

| Concepto | Uso |
|----------|-----|
| **.env** | Archivo con variables por ambiente |
| **baseURL** | URL base para todos los tests |
| **getEnvironment()** | Función para obtener config |
| **Feature flags** | Activar/desactivar tests por ambiente |
| **Secrets en CI/CD** | Credenciales seguras en pipelines |

---

## Próximas Secciones en Este Módulo

- [01_Page_Object_Model.md](./01_Page_Object_Model.md) - Patrón POM
- [02_Custom_Fixtures_Helpers.md](./02_Custom_Fixtures_Helpers.md) - Fixtures personalizados
- [03_Test_Data_Management.md](./03_Test_Data_Management.md) - Gestión de datos
- [05_Parallelization_Performance.md](./05_Parallelization_Performance.md) - Optimizar velocidad

---

*Tutorial: Configuración Multi-Ambiente - Módulo 03 Arquitectura de Pruebas - FPUNA 2026*
