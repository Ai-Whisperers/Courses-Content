# Tutorial: Configuración de GitHub Actions para Tests
## Módulo 04: Integración CI/CD

**Duración**: 50 minutos  
**Nivel**: Intermedio  
**Prerequisitos**: Module 01-03, conocimiento básico de Git/GitHub

---

## ¿Por Qué CI/CD?

### El Problema: Tests Manuales

```
❌ Developer hace cambios
❌ Sube código a GitHub
❌ Otro developer descarga cambios
❌ Ejecuta tests MANUALMENTE
❌ Si falla, lo contacta por Slack
❌ Demora horas/días en encontrar bugs
❌ Documentación desincronizada
```

**Resultado**: 50% del tiempo en testing manual repetitivo

### La Solución: CI/CD Automático

```
✅ Developer hace cambios
✅ Push a GitHub (AUTOMÁTICO: tests ejecutan)
✅ GitHub Actions:
   - Clona código
   - Instala dependencias
   - Ejecuta tests
   - Genera reportes
   - Notifica resultado
✅ 5 minutos después: sabe si funciona
✅ Si falla: PR rechazado automáticamente
```

**Beneficio**: Feedback en segundos, no horas

---

## Conceptos Clave

### 1. Workflow de GitHub Actions

```yaml
# .github/workflows/test.yml
name: QA Tests                    # Nombre del workflow
on: [push, pull_request]          # Cuándo ejecutar (en cada push/PR)
jobs:
  test:                           # Nombre del job
    runs-on: ubuntu-latest        # Sistema operativo
    steps:                        # Pasos a ejecutar
      - name: Checkout code       # Clonar repositorio
        uses: actions/checkout@v3
      
      - name: Setup Node.js       # Instalar Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies # npm install
        run: npm ci
      
      - name: Run tests           # Ejecutar tests
        run: npm test
```

### 2. Flujo de Ejecución

```
┌──────────────────┐
│ Developer push   │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────┐
│ GitHub Actions triggers  │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Setup (Checkout, Node)   │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Install dependencies     │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Run tests (npm test)     │
└────────┬─────────────────┘
         │
    ┌────┴──────────┐
    │               │
    ▼               ▼
┌─────────┐    ┌──────────┐
│ ✅ Pass │    │ ❌ Fail  │
│ PR OK   │    │ PR Reject│
└─────────┘    └──────────┘
```

### 3. Eventos que Disparan Workflows

| Evento | Cuándo |
|--------|--------|
| `push` | Cada push a main/cualquier rama |
| `pull_request` | Crear/actualizar PR |
| `schedule` | Tiempo programado (cron) |
| `workflow_dispatch` | Ejecutar manualmente |

---

## Ejemplos Prácticos

### Ejemplo 1: Workflow Básico de Tests

```yaml
# .github/workflows/playwright-tests.yml
name: Playwright Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    steps:
      # 1. Clonar el código
      - uses: actions/checkout@v4
      
      # 2. Instalar Node.js
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: 'npm'
      
      # 3. Instalar dependencias
      - name: Install dependencies
        run: npm ci
      
      # 4. Instalar browsers de Playwright
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      
      # 5. Ejecutar tests
      - name: Run Playwright tests
        run: npm run test:playwright
      
      # 6. Subir reportes (si falla)
      - name: Upload Playwright Report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

**Qué hace**:
- Ejecuta en push a main/develop y en cada PR
- Instala Node.js, Playwright y dependencias
- Ejecuta tests
- Si falla, guarda reportes para inspeccionar

### Ejemplo 2: Tests en Múltiples Versiones de Node

```yaml
# .github/workflows/test-matrix.yml
name: Test Matrix

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]  # Probar en 3 versiones
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - run: npm ci
      - run: npm test

# Resultado: 3 jobs en paralelo, uno por cada versión de Node
```

**Ventaja**: Verificar compatibilidad con múltiples versiones automáticamente

### Ejemplo 3: Tests en Múltiples Navegadores

```yaml
# .github/workflows/test-browsers.yml
name: Test Browsers

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install --with-deps ${{ matrix.browser }}
      
      - name: Run tests on ${{ matrix.browser }}
        run: npm test -- --project=${{ matrix.browser }}

# Resultado: 3 jobs en paralelo, uno por cada navegador
```

### Ejemplo 4: Tests Condicionales (Solo si cambios en tests)

```yaml
# .github/workflows/conditional-tests.yml
name: Conditional Tests

on:
  push:
    paths:
      - 'tests/**'          # Solo si hay cambios en /tests
      - 'pages/**'          # O en /pages
      - '.github/workflows/**'
      - 'playwright.config.ts'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm test

# Si cambias solo README.md → tests NO se ejecutan
# Si cambias un test → tests SÍ se ejecutan
```

### Ejemplo 5: Workflow Completo Profesional

```yaml
# .github/workflows/qa.yml
name: QA Pipeline

on:
  push:
    branches: [main, develop, staging]
  pull_request:
    branches: [main, develop]
  schedule:
    - cron: '0 2 * * *'  # Ejecutar diariamente a las 2 AM

jobs:
  # Job 1: Lint y Type Check
  code-quality:
    runs-on: ubuntu-latest
    name: Code Quality
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
  
  # Job 2: Unit Tests
  unit-tests:
    runs-on: ubuntu-latest
    name: Unit Tests
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run test:unit
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
  
  # Job 3: E2E Tests (Playwright)
  e2e-tests:
    runs-on: ubuntu-latest
    name: E2E Tests
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      
      - name: Upload Playwright Report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
  
  # Job 4: Resultado Final
  all-tests-passed:
    needs: [code-quality, unit-tests, e2e-tests]
    runs-on: ubuntu-latest
    
    steps:
      - name: Check if all jobs passed
        run: echo "✅ All QA checks passed!"

# Resultado: 4 jobs en paralelo (si son independientes)
```

---

## Mejores Prácticas

### ✅ BUENO

```yaml
# 1. Usar versiones específicas de acciones
- uses: actions/checkout@v4  # v4 específica

# 2. Cachear dependencias
- uses: actions/setup-node@v4
  with:
    cache: 'npm'  # ✅ 10-15 segundos más rápido

# 3. Usar matrix para múltiples configs
strategy:
  matrix:
    node-version: [16.x, 18.x, 20.x]

# 4. Jobs en paralelo (si son independientes)
jobs:
  lint: ...
  test: ...
  build: ...
# Ejecutan simultáneamente

# 5. Nombres descriptivos
- name: Run E2E tests on Chrome
```

### ❌ MALO

```yaml
# ❌ Versiones flotantes
- uses: actions/checkout@v4  # Puede cambiar

# ❌ Sin cache
- uses: actions/setup-node@v4
# Sin cache: +30 segundos por workflow

# ❌ Todo en un job
jobs:
  test:
    steps:
      - run: npm lint
      - run: npm test:unit
      - run: npm test:e2e
# Si uno falla, los demás no corren. Secuencial.

# ❌ Pasos innecesarios
- run: npm install      # npm ci es más eficiente
```

---

## Debugging de Workflows

### Ver Logs en GitHub

1. **Ir a repo → Actions tab**
2. **Clickear en el workflow que falló**
3. **Expandir el step que falló**
4. **Ver logs completos**

### Ejecutar Workflow Manualmente

```yaml
# Agregar workflow_dispatch
on:
  push:
  pull_request:
  workflow_dispatch:  # Permite ejecución manual
```

Entonces en GitHub UI:
- Actions tab → Tu workflow → "Run workflow" button

### Workflow Local (Act)

```bash
# Instalar act
brew install act

# Ejecutar workflow localmente
act push

# Ejecutar job específico
act -j test
```

---

## Resumen

| Concepto | Uso |
|----------|-----|
| **Workflow** | Automatización con GitHub Actions |
| **Job** | Tarea dentro del workflow |
| **Step** | Comando dentro del job |
| **Matrix** | Ejecutar en múltiples configs |
| **Artifacts** | Guardar reportes/resultados |
| **Cache** | Acelerar instalaciónde dependencias |

---

## Próximas Secciones en Este Módulo

- [02_Professional_Reporting.md](./02_Professional_Reporting.md) - Reportes profesionales (Allure, HTML)
- [03_Test_Sharding.md](./03_Test_Sharding.md) - Dividir tests entre máquinas
- [04_Notifications.md](./04_Notifications.md) - Notificaciones automáticas
- [05_Advanced_Workflows.md](./05_Advanced_Workflows.md) - Workflows avanzados

---

*Tutorial: GitHub Actions Setup - Módulo 04 Integración CI/CD - FPUNA 2026*
