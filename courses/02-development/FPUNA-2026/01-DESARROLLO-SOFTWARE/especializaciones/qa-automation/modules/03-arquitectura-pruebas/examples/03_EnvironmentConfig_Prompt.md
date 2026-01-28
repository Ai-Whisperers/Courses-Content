# OpenCode Prompt: Generar Configuración Multi-Ambiente
## Módulo 03: Arquitectura de Pruebas

**Propósito**: Generar sistema de configuración para tests en múltiples ambientes  
**Nivel**: Intermedio  
**Aplicable a**: Proyectos con local/staging/prod

---

## PROMPT PARA OPENCODE

### Versión Simple (Config Básica)

```
Genera un archivo `config/environments.ts` para Playwright que:

1. Exporte objeto 'environments' con propiedades para 3 ambientes:
   - local: 
     baseURL: http://localhost:3000
     apiURL: http://localhost:3001
     testUser: { email: 'test@local', password: 'test123' }
     timeout: 30000
   
   - staging:
     baseURL: https://staging.fpuna.edu.py
     apiURL: https://api-staging.fpuna.edu.py
     testUser: { email: 'test@staging', password: 'staging123' }
     timeout: 60000
   
   - prod:
     baseURL: https://fpuna.edu.py
     apiURL: https://api.fpuna.edu.py
     testUser: { email: process.env.PROD_EMAIL, password: process.env.PROD_PASSWORD }
     timeout: 60000

2. Función getEnvironment() que:
   - Lee variable AMBIENTE (default: 'local')
   - Retorna configuración del ambiente
   - Valida que el ambiente exista

3. Comentarios en español explicando cada sección

Lenguaje: TypeScript
Output: Un archivo listo para usar en playwright.config.ts
```

### Versión Avanzada (Config Completa con Features)

```
Genera sistema completo de configuración multi-ambiente que:

**Archivo: config/environments.ts**
1. Interfaz Config con propiedades:
   baseURL: string
   apiURL: string
   testUser: { email, password }
   db: { host, port, database, user, password }
   features: { bypassAuth, recordVideo, captureScreenshot, parallelWorkers }
   logging: { level, color }
   timeouts: { page, api, assertion }
   retries: { tests, api }

2. Configuración para cada ambiente:
   local (dev):
     - URLs localhost
     - Credentials de desarrollo
     - bypassAuth: true
     - parallelWorkers: 6
     - recordVideo: false
     - logging.level: debug
   
   staging:
     - URLs staging.fpuna
     - Credenciales staging
     - bypassAuth: false
     - parallelWorkers: 4
     - recordVideo: true
     - logging.level: info
   
   prod:
     - URLs fpuna.edu.py
     - Credenciales de variables ENV
     - bypassAuth: false
     - parallelWorkers: 2
     - recordVideo: false
     - logging.level: error

3. Función getConfig() que valide ambiente y cargue variables ENV

**Archivo: config/logging.ts**
4. Sistema de logging que respete log level de config:
   - debug(): solo si level === 'debug'
   - info(): si level <= 'info'
   - warn(): si level <= 'warn'
   - error(): siempre
   - Incluya timestamp y colores

**Archivo: playwright.config.ts generator**
5. Genera fragment de playwright.config.ts que use config:
   - use: { baseURL, timeout, ... }
   - webServer: basado en ambiente
   - workers: parallelWorkers de config
   - retries: retries de config

Estructura: TypeScript, ESLint compatible, comentarios en español
Output: 3 archivos con integración completa
```

---

## EJEMPLOS DE CÓDIGO GENERADO

### Ejemplo 1: Config Básica

```typescript
// config/environments.ts
export interface ConfigLocal {
  baseURL: string;
  apiURL: string;
  testUser: {
    email: string;
    password: string;
  };
  timeout: number;
}

export const environments = {
  local: {
    baseURL: 'http://localhost:3000',
    apiURL: 'http://localhost:3001',
    testUser: {
      email: 'test@local',
      password: 'test123'
    },
    timeout: 30000
  } as ConfigLocal,

  staging: {
    baseURL: 'https://staging.fpuna.edu.py',
    apiURL: 'https://api-staging.fpuna.edu.py',
    testUser: {
      email: 'test@staging',
      password: 'staging123'
    },
    timeout: 60000
  } as ConfigLocal,

  prod: {
    baseURL: 'https://fpuna.edu.py',
    apiURL: 'https://api.fpuna.edu.py',
    testUser: {
      email: process.env.PROD_TEST_EMAIL!,
      password: process.env.PROD_TEST_PASSWORD!
    },
    timeout: 60000
  } as ConfigLocal
};

/**
 * Obtiene la configuración del ambiente actual
 * @returns Config del ambiente
 * @throws Si el ambiente no es válido
 */
export function getEnvironment(): ConfigLocal {
  const env = (process.env.AMBIENTE || 'local') as keyof typeof environments;

  if (!environments[env]) {
    throw new Error(
      `Ambiente inválido: ${env}. ` +
      `Ambientes válidos: ${Object.keys(environments).join(', ')}`
    );
  }

  console.log(`📍 Ambiente: ${env}`);
  console.log(`🌐 URL base: ${environments[env].baseURL}`);

  return environments[env];
}

/**
 * Obtiene solo la URL del ambiente
 */
export function getBaseURL(): string {
  return getEnvironment().baseURL;
}

/**
 * Obtiene solo credenciales de test
 */
export function getTestUser() {
  return getEnvironment().testUser;
}
```

### Ejemplo 2: Config Avanzada con Features

```typescript
// config/environments.ts
export interface Config {
  baseURL: string;
  apiURL: string;
  db: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
  testUser: {
    email: string;
    password: string;
  };
  features: {
    bypassAuth: boolean;
    recordVideo: boolean;
    captureScreenshot: boolean;
    parallelWorkers: number;
  };
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    color: boolean;
  };
  timeouts: {
    page: number;
    api: number;
    assertion: number;
  };
  retries: {
    tests: number;
    api: number;
  };
}

const baseConfig: Config = {
  baseURL: 'http://localhost:3000',
  apiURL: 'http://localhost:3001',
  db: {
    host: 'localhost',
    port: 5432,
    database: 'test_db',
    user: 'testuser',
    password: 'testpass'
  },
  testUser: {
    email: 'test@local',
    password: 'test123'
  },
  features: {
    bypassAuth: true,
    recordVideo: false,
    captureScreenshot: false,
    parallelWorkers: 6
  },
  logging: {
    level: 'debug',
    color: true
  },
  timeouts: {
    page: 30000,
    api: 10000,
    assertion: 5000
  },
  retries: {
    tests: 0,
    api: 1
  }
};

const stagingConfig: Config = {
  ...baseConfig,
  baseURL: 'https://staging.fpuna.edu.py',
  apiURL: 'https://api-staging.fpuna.edu.py',
  db: {
    host: 'db-staging.fpuna.edu.py',
    port: 5432,
    database: 'fpuna_staging',
    user: process.env.STAGING_DB_USER!,
    password: process.env.STAGING_DB_PASSWORD!
  },
  testUser: {
    email: 'test@staging',
    password: process.env.STAGING_TEST_PASSWORD!
  },
  features: {
    bypassAuth: false,
    recordVideo: true,
    captureScreenshot: true,
    parallelWorkers: 4
  },
  logging: {
    level: 'info',
    color: true
  },
  timeouts: {
    page: 60000,
    api: 15000,
    assertion: 10000
  },
  retries: {
    tests: 2,
    api: 2
  }
};

const prodConfig: Config = {
  ...stagingConfig,
  baseURL: 'https://fpuna.edu.py',
  apiURL: 'https://api.fpuna.edu.py',
  db: {
    host: 'db-prod.fpuna.edu.py',
    port: 5432,
    database: 'fpuna_production',
    user: process.env.PROD_DB_USER!,
    password: process.env.PROD_DB_PASSWORD!
  },
  testUser: {
    email: process.env.PROD_TEST_EMAIL!,
    password: process.env.PROD_TEST_PASSWORD!
  },
  features: {
    bypassAuth: false,
    recordVideo: false,
    captureScreenshot: false,
    parallelWorkers: 2
  },
  logging: {
    level: 'error',
    color: false
  }
};

export function getConfig(): Config {
  const env = (process.env.AMBIENTE || 'local') as 'local' | 'staging' | 'prod';

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

### Ejemplo 3: Sistema de Logging

```typescript
// config/logging.ts
import { Config } from './environments';

export class Logger {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  private shouldLog(level: 'debug' | 'info' | 'warn' | 'error'): boolean {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    return levels[level] >= levels[this.config.logging.level];
  }

  private format(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  debug(message: string) {
    if (this.shouldLog('debug')) {
      console.log(this.format('DEBUG', message));
    }
  }

  info(message: string) {
    if (this.shouldLog('info')) {
      console.log(this.format('INFO', message));
    }
  }

  warn(message: string) {
    if (this.shouldLog('warn')) {
      console.warn(this.format('WARN', message));
    }
  }

  error(message: string) {
    console.error(this.format('ERROR', message));
  }
}

export function createLogger(config: Config): Logger {
  return new Logger(config);
}
```

### Ejemplo 4: Integración en playwright.config.ts

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import { getConfig } from './config/environments';

const config = getConfig();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,

  // ══════════════════════════════════════════
  // CONFIGURACIÓN DEL AMBIENTE
  // ══════════════════════════════════════════
  use: {
    baseURL: config.baseURL,
    actionTimeout: config.timeouts.api,
    navigationTimeout: config.timeouts.page
  },

  // ══════════════════════════════════════════
  // WORKERS Y PARALELIZACIÓN
  // ══════════════════════════════════════════
  workers: config.features.parallelWorkers,

  // ══════════════════════════════════════════
  // RETRIES
  // ══════════════════════════════════════════
  retries: config.retries.tests,

  // ══════════════════════════════════════════
  // GRABACIÓN DE VIDEO Y SCREENSHOTS
  // ══════════════════════════════════════════
  use: {
    ...devices['Desktop Chrome'],
    video: config.features.recordVideo ? 'on' : 'off',
    screenshot: config.features.captureScreenshot ? 'on' : 'off'
  },

  // ══════════════════════════════════════════
  // WEBSERVER
  // ══════════════════════════════════════════
  webServer: {
    command: 'npm run dev',
    url: config.baseURL,
    reuseExistingServer: true
  }
});
```

---

## CASOS DE USO

### Caso 1: Tests con Base de Datos Diferente por Ambiente

```
Prompt: "Agrega configuración de BD al config que incluya:
- host, puerto, usuario, contraseña
- Usar variables ENV para staging/prod
- Función getDBConnection() que devuelva string de conexión
- Usar para truncar tablas en cleanup"
```

### Caso 2: Feature Flags por Ambiente

```
Prompt: "Agrega feature flags al config para:
- bypassAuth: saltarse login en local pero no en prod
- enableDataValidation: solo en staging/prod
- debugMode: true solo en local
- Función isFeatureEnabled(feature: string)"
```

### Caso 3: Tests Condicionales por Ambiente

```
Prompt: "Genera función skipIfEnvironment() que:
- Saltarse tests específicos en ciertos ambientes
- test.skip(isProduction, 'No ejecutar en producción')
- test.skip(!isStaging, 'Solo ejecutar en staging')
- Uso: test('...', async ({ page, config }) => { ... })"
```

---

## EJECUTAR CON DIFERENTES AMBIENTES

```bash
# Local (default)
npm test

# Staging
AMBIENTE=staging npm test

# Producción (con credenciales de secrets)
AMBIENTE=prod PROD_TEST_EMAIL=xxx PROD_TEST_PASSWORD=xxx npm test

# Con variables adicionales
AMBIENTE=staging LOG_LEVEL=debug npm test

# En CI/CD (GitHub Actions)
- name: Run tests
  env:
    AMBIENTE: ${{ matrix.ambiente }}
    PROD_TEST_EMAIL: ${{ secrets.PROD_TEST_EMAIL }}
  run: npm test
```

---

## TIPS Y TRUCOS

### Tip 1: Validar Ambiente al Iniciar

```typescript
// ✅ Fallar rápido si ambiente es inválido
export function getConfig(): Config {
  const env = process.env.AMBIENTE || 'local';
  if (!environments[env]) {
    throw new Error(`Ambiente "${env}" no reconocido`);
  }
  return environments[env];
}
```

### Tip 2: Usar Lodash para Deep Merge

```typescript
// ✅ Combinar configs parciales
import _ from 'lodash';

const staging = _.merge({}, baseConfig, {
  baseURL: 'https://staging.fpuna.edu.py',
  features: { recordVideo: true }
});
```

### Tip 3: Validar Variables ENV Requeridas

```typescript
// ✅ En prod, verificar que existen credenciales
if (env === 'prod') {
  if (!process.env.PROD_TEST_EMAIL) {
    throw new Error('PROD_TEST_EMAIL no está definido');
  }
}
```

---

## CHECKLIST DESPUÉS DE GENERAR

- [ ] Código compila sin errores TypeScript
- [ ] Función getConfig() existe y valida
- [ ] Todos los ambientes están definidos
- [ ] Variables ENV para prod son usadas
- [ ] Logger respeta el log level del config
- [ ] playwright.config.ts puede leer el config
- [ ] Ejemplos de uso incluidos

---

*Prompt: Environment Configuration - Módulo 03 Arquitectura de Pruebas - FPUNA 2026*
