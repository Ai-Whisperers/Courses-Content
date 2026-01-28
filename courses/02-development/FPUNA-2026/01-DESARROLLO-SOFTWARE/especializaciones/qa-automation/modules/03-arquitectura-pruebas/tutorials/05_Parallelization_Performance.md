# Tutorial: Paralelización y Optimización de Performance
## Módulo 03: Arquitectura de Pruebas

**Duración**: 45 minutos  
**Nivel**: Avanzado  
**Prerequisitos**: Module 01-02, conceptos de fixtures

---

## El Problema: Tests Lentos

### Escenario Real

```
❌ Ejecución Serial (uno por uno):
Test 1  [████████████████] 30 segundos
Test 2  [████████████████] 30 segundos  
Test 3  [████████████████] 30 segundos
Test 4  [████████████████] 30 segundos
Test 5  [████████████████] 30 segundos
────────────────────────────────────────
TOTAL:                    150 segundos (2.5 minutos)

✅ Ejecución Paralela (varios a la vez):
Test 1  [████████████████] 30 seg
Test 2  [████████████████] 30 seg (simultáneo)
Test 3  [████████████████] 30 seg (simultáneo)
Test 4  [████████████████] 30 seg (simultáneo)
Test 5  [████████████████] 30 seg (simultáneo)
────────────────────────────────────────
TOTAL:                     30 segundos (¡5x más rápido!)
```

**Beneficios**:
- ⚡ Tests 5x más rápido (50 tests de 30s → 5 minutos)
- 💰 CI/CD más barato (menos tiempo de máquina)
- 🔄 Feedback más rápido para developers
- 📊 Tests ejecutables en menos de 5 minutos

---

## Concepto: Paralelización

```
┌─────────────────────────────────────────┐
│    Playwright Test Suite (50 tests)     │
├─────────────────────────────────────────┤
│                                         │
│  Worker 1       Worker 2       Worker 3│
│  ┌─────┐       ┌─────┐       ┌─────┐  │
│  │Test1│       │Test6│       │Test11│ │
│  ├─────┤       ├─────┤       ├─────┤  │
│  │Test2│       │Test7│       │Test12│ │
│  ├─────┤       ├─────┤       ├─────┤  │
│  │Test3│       │Test8│       │Test13│ │
│  ├─────┤       ├─────┤       ├─────┤  │
│  │Test4│       │Test9│       │Test14│ │
│  ├─────┤       ├─────┤       ├─────┤  │
│  │Test5│       │Test10│      │Test15│ │
│  └─────┘       └─────┘       └─────┘  │
│                                         │
│  Todos corren SIMULTÁNEAMENTE           │
└─────────────────────────────────────────┘
```

**Clave**: Cada worker es un proceso **independiente** con su propio navegador.

---

## Ejemplos Prácticos

### Ejemplo 1: Configuración Básica de Paralelización

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // ════════════════════════════════════════
  // PARALELIZACIÓN GLOBAL
  // ════════════════════════════════════════
  
  // Número de workers (procesos simultáneos)
  // Default: CPU cores
  workers: 4,  // Ejecutar 4 tests simultáneamente
  
  // Ejecutar tests en paralelo dentro de un archivo
  fullyParallel: true,

  // ════════════════════════════════════════
  // CONFIGURACIÓN DE TIMEOUTS
  // ════════════════════════════════════════
  
  // Timeout por test
  timeout: 30 * 1000,  // 30 segundos por test
  
  // Timeout global
  globalTimeout: 30 * 60 * 1000,  // 30 minutos total

  // ════════════════════════════════════════
  // PROYECTOS (pueden tener diferente config)
  // ════════════════════════════════════════
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    // Nota: Cada proyecto se ejecuta EN SERIE
    // pero tests dentro del proyecto EN PARALELO
  ],

  // ════════════════════════════════════════
  // MODO DE FALLOS
  // ════════════════════════════════════════
  
  // Detener al primer fallo
  forbidOnly: true,  // Bloquea test.only en CI
  
  // Cantidad máxima de fallos antes de parar
  maxFailures: 3  // Parar después de 3 fallos
});
```

### Ejemplo 2: Paralelización con Aislamiento de Datos

```typescript
// ✅ CORRECTO: Cada test tiene sus propios datos

import { test, expect } from '@playwright/test';

test('crear usuario A', async ({ page }) => {
  // Test 1 crea usuario A
  const usuarioA = await crearUsuario(page, { nombre: 'Usuario A' });
  
  // Test 2 puede estar corriendo SIMULTÁNEAMENTE creando usuario B
  // Sin interferencia porque cada uno tiene su BD aislada
  
  expect(usuarioA.id).toBeGreaterThan(0);
});

test('crear usuario B', async ({ page }) => {
  // Independiente del test anterior
  const usuarioB = await crearUsuario(page, { nombre: 'Usuario B' });
  expect(usuarioB.id).toBeGreaterThan(0);
});

test('crear usuario C', async ({ page }) => {
  // También independiente
  const usuarioC = await crearUsuario(page, { nombre: 'Usuario C' });
  expect(usuarioC.id).toBeGreaterThan(0);
});

// Ejecución:
// [Worker 1] Test 1: Usuario A (0-30s)
// [Worker 2] Test 2: Usuario B (0-30s) - SIMULTÁNEO
// [Worker 3] Test 3: Usuario C (0-30s) - SIMULTÁNEO
// Total: 30 segundos (no 90 segundos)
```

### Ejemplo 3: Test.describe.configure() para Control Fino

```typescript
// Por defecto: paralelo
test('test paralelo 1', async ({ page }) => {
  // Ejecuta en paralelo con otros tests
});

test('test paralelo 2', async ({ page }) => {
  // Ejecuta en paralelo
});

// ═══════════════════════════════════════

// Grupo de tests SERIALES (uno tras otro)
test.describe('Secuencia de Login', () => {
  test.describe.configure({ mode: 'serial' });

  test('paso 1: navegar a login', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL('/login');
  });

  test('paso 2: llenar formulario', async ({ page }) => {
    // Este test SIEMPRE se ejecuta DESPUÉS del paso 1
    // Porque están en modo serial
    await page.fill('[name="email"]', 'usuario@test');
    await page.fill('[name="password"]', 'password');
  });

  test('paso 3: verificar login', async ({ page }) => {
    // Se ejecuta DESPUÉS del paso 2
    await expect(page).toHaveURL('/dashboard');
  });
});

// ═══════════════════════════════════════

// Más tests paralelos (no afectados por serial)
test('otro test en paralelo', async ({ page }) => {
  // Ejecuta en paralelo con todo lo demás
});
```

### Ejemplo 4: Optimizar Performance además de Paralelizar

```typescript
// playwright.config.ts
export default defineConfig({
  workers: process.env.CI ? 4 : 6,  // Más workers en local, menos en CI
  fullyParallel: true,
  timeout: 30 * 1000,

  use: {
    // ════════════════════════════════════
    // OPTIMIZACIONES
    // ════════════════════════════════════
    
    // No grabar videos en todos los tests (más rápido)
    video: 'retain-on-failure',  // Solo si falla
    
    // Screenshots solo en fallas
    screenshot: 'only-on-failure',
    
    // No grabar traza de todos
    trace: 'on-first-retry',  // Si falla 1era vez, grabar traza en reintentos
    
    // Actionability timeout más corto
    actionTimeout: 5000,  // 5s en lugar de 30s por acción
    
    // Navigation timeout
    navigationTimeout: 10000,  // 10s para navegar a páginas
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    // Solo iniciar servidor una vez
    // y reusarlo en TODOS los workers
    reuseExistingServer: true
  }
});
```

### Ejemplo 5: Estrategia de Sharding (Dividir Tests)

```typescript
// playwright.config.ts
export default defineConfig({
  // Información de sharding
  shard: {
    // Máquina 1 de 3 ejecuta tests 1-17
    // Máquina 2 de 3 ejecuta tests 18-34
    // Máquina 3 de 3 ejecuta tests 35-50
    
    current: parseInt(process.env.SHARD_INDEX || '1'),
    total: parseInt(process.env.SHARD_COUNT || '1')
  }
});

// En CI/CD (GitHub Actions):
strategy:
  matrix:
    shard: [1, 2, 3]

steps:
  - run: npm test
    env:
      SHARD_INDEX: ${{ matrix.shard }}
      SHARD_COUNT: 3

// Resultado:
// - Job 1 ejecuta 1/3 de tests
// - Job 2 ejecuta 1/3 de tests  
// - Job 3 ejecuta 1/3 de tests
// Los 3 corren en paralelo en GitHub = 3x más rápido
```

### Ejemplo 6: Fixtures para Paralelización Segura

```typescript
// ✅ Fixture que aísla datos por worker
import { test as base } from '@playwright/test';

export const test = base.extend({
  usuarioTest: async ({ page }, use) => {
    // Crear usuario ÚNICO para este worker
    // Cada worker obtiene su propio usuario
    
    const workerId = process.env.TEST_WORKER_INDEX || '0';
    const email = `test-${workerId}-${Date.now()}@fpuna.edu.py`;
    
    const usuario = await crearUsuario(page, { email });
    
    console.log(`[Worker ${workerId}] Usuario: ${email}`);
    
    await use(usuario);
    
    // Limpiar datos del usuario
    await borrarUsuario(usuario.id);
  }
});

// Uso
test('test 1 con usuario aislado', async ({ usuarioTest }) => {
  // usuarioTest es único para este worker
  // No interfiere con otros workers
  console.log('Usuario:', usuarioTest.email);
});

test('test 2 con usuario aislado', async ({ usuarioTest }) => {
  // Otro usuario, también único
  console.log('Usuario:', usuarioTest.email);
});
```

---

## Mejores Prácticas

### ✅ BUENO

```typescript
// 1. Cada test es independiente
test('test 1', async ({ page }) => {
  // Crear SUS propios datos
  const u = await crearUsuario();
  // Limpiar después
});

test('test 2', async ({ page }) => {
  // Sus propios datos, independientes
  const u = await crearUsuario();
});

// 2. Usar fixtures para aislamiento
test.extend({
  usuarioAislado: async ({}, use) => {
    const u = crearUsuario();
    await use(u);
    borrarUsuario(u);
  }
});

// 3. Serial solo cuando es necesario
test.describe('Secuencia', () => {
  test.describe.configure({ mode: 'serial' });
  // Mínimo de tests seriales
});

// 4. Reutilizar servidor web
webServer: { reuseExistingServer: true }

// 5. Screenshots solo en fallos
screenshot: 'only-on-failure'
```

### ❌ MALO

```typescript
// ❌ Tests que dependen el uno del otro
test('crear usuario', async ({ page }) => {
  const u = await crearUsuario();
  // Usuario queda para siguiente test
});

test('editar usuario', async ({ page }) => {
  // Asume que el usuario del test anterior existe
  // Falla si el anterior no se ejecutó primero
});

// ❌ Datos hardcodeados (colisión en paralelo)
const email = 'test@fpuna.edu.py';  // MISMO para todos!

// ❌ Todo serial
test.describe('Tests', () => {
  test.describe.configure({ mode: 'serial' });  // ❌ Muy lento
  // Todos los tests aquí corren uno por uno
});

// ❌ Grabar videos/screenshots de TODOS
video: 'on'  // Muy lento
screenshot: 'on'  // Muy lento
```

---

## Debugging de Tests Paralelos

### Ver Qué Worker Está Ejecutando

```typescript
test('debug: ver worker info', async ({ page }) => {
  const workerId = process.env.TEST_WORKER_INDEX || 'desconocido';
  const totalWorkers = process.env.TEST_PARALLEL_INDEX || 'desconocido';
  
  console.log(`[Worker ${workerId}] Test ejecutando`);
  console.log(`[Total workers: ${totalWorkers}]`);
  
  // Output:
  // [Worker 0] Test ejecutando
  // [Total workers: 4]
});
```

### Ejecutar Con Menos Workers para Debugging

```bash
# Ejecutar con solo 1 worker (serial)
npx playwright test --workers=1

# Ejecutar un archivo específico
npx playwright test archivo-problematico.spec.ts --workers=1

# Ver información de workers
npx playwright test --reporter=verbose
```

---

## Resumen

| Concepto | Qué Es | Beneficio |
|----------|--------|----------|
| **Paralelización** | Correr múltiples tests simultáneamente | 5x más rápido |
| **Workers** | Procesos independientes | Cada uno con su navegador |
| **Aislamiento** | Cada test con sus propios datos | Sin interferencias |
| **Sharding** | Dividir tests entre máquinas | Escalabilidad en CI/CD |
| **Serial** | Ejecutar tests uno por uno | Para tests dependientes |

---

## Próximas Secciones en Este Módulo

- [01_Page_Object_Model.md](./01_Page_Object_Model.md) - Patrón POM
- [02_Custom_Fixtures_Helpers.md](./02_Custom_Fixtures_Helpers.md) - Fixtures personalizados
- [03_Test_Data_Management.md](./03_Test_Data_Management.md) - Gestión de datos
- [04_Multi_Environment_Config.md](./04_Multi_Environment_Config.md) - Múltiples ambientes

---

*Tutorial: Paralelización y Performance - Módulo 03 Arquitectura de Pruebas - FPUNA 2026*
