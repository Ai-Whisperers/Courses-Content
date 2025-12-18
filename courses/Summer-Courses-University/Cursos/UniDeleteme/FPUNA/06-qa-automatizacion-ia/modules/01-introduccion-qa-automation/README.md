# Módulo 1: Introducción a QA Automation
## Fundamentos del Testing Automatizado Moderno

---

## Información del Módulo

| Campo | Detalle |
|-------|---------|
| **Duración** | 2 horas |
| **Tipo** | Teórico-Práctico |
| **Prerrequisitos** | JavaScript básico, conceptos de testing |

---

## Objetivos de Aprendizaje

Al finalizar este módulo, los participantes podrán:

1. Comprender el rol del testing automatizado en desarrollo de software
2. Diferenciar entre frameworks de testing (Playwright, Cypress, Selenium)
3. Entender las ventajas de TypeScript para testing
4. Configurar un entorno de desarrollo completo
5. Ejecutar su primer test automatizado

---

## Contenido

### 1.1 Estado Actual del Testing Automatizado (20 min)

#### Pirámide de Testing

```
                    ┌─────────────┐
                   /   E2E Tests  \     🔺 Pocos, lentos, costosos
                  /    (Playwright) \
                 ├───────────────────┤
                /   Integration Tests \    🔸 Balance
               /      (API, Services)  \
              ├─────────────────────────┤
             /       Unit Tests          \    🔻 Muchos, rápidos, baratos
            /         (Jest, Vitest)      \
           └───────────────────────────────┘
```

#### Por qué Automatizar Tests

| Sin Automatización | Con Automatización |
|--------------------|-------------------|
| Tests manuales repetitivos | Ejecución en segundos |
| Error humano frecuente | Consistencia garantizada |
| No escala | Escala infinitamente |
| Feedback lento | Feedback inmediato |
| Regresiones pasan desapercibidas | Regresiones detectadas al instante |

#### Estadísticas de la Industria (2024-2025)

```
📊 TENDENCIAS:

• 78% de empresas tech usan testing automatizado
• 65% de bugs se detectan con tests automatizados
• ROI de automatización: 300-500% en 2 años
• Playwright: crecimiento de 150% en adopción
• TypeScript: estándar en 70% de proyectos nuevos
```

---

### 1.2 Comparativa de Frameworks (20 min)

#### Playwright vs Cypress vs Selenium

| Característica | Playwright | Cypress | Selenium |
|----------------|------------|---------|----------|
| **Lenguaje** | JS/TS, Python, Java, C# | JavaScript/TypeScript | Múltiples |
| **Navegadores** | Chrome, Firefox, Safari, Edge | Chrome, Firefox, Edge | Todos |
| **Velocidad** | ⭐⭐⭐ Muy rápido | ⭐⭐ Rápido | ⭐ Lento |
| **API Testing** | ✅ Nativo | ❌ Plugin | ❌ Separado |
| **Mobile** | ✅ Emulación | ❌ No | ✅ Appium |
| **Debugging** | ⭐⭐⭐ Inspector, Trace | ⭐⭐⭐ Time Travel | ⭐ Básico |
| **Paralelismo** | ✅ Nativo | ❌ Pago | ✅ Grid |
| **Comunidad** | Creciendo rápido | Grande | Muy grande |
| **Curva aprendizaje** | Media | Baja | Alta |

#### Por qué Playwright

```
✅ VENTAJAS DE PLAYWRIGHT:

1. Multi-navegador real (incluyendo Safari)
2. Auto-wait inteligente (no flaky tests)
3. API testing integrado
4. Trace viewer para debugging
5. Parallelismo nativo
6. Soporte de Microsoft
7. Actualizaciones frecuentes
8. TypeScript first
```

#### Cuándo NO usar Playwright

```
❌ CONSIDERAR ALTERNATIVAS SI:

• Proyecto legacy con Selenium existente
• Equipo muy cómodo con Cypress
• Necesitas testing mobile nativo (usar Appium)
• Proyecto muy pequeño (manual puede ser suficiente)
```

---

### 1.3 TypeScript para Testing (20 min)

#### Ventajas de TypeScript

| JavaScript | TypeScript |
|------------|------------|
| Errores en runtime | Errores en compile time |
| Sin autocompletado | Autocompletado inteligente |
| Documentación externa | Tipos son documentación |
| Refactoring peligroso | Refactoring seguro |

#### Sintaxis Básica de TypeScript

```typescript
// Variables con tipos
const name: string = 'Test User';
const age: number = 25;
const isActive: boolean = true;

// Arrays
const numbers: number[] = [1, 2, 3];
const names: string[] = ['Ana', 'Juan'];

// Objetos (interfaces)
interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean;  // opcional
}

const user: User = {
  id: 1,
  name: 'Test',
  email: 'test@test.com'
};

// Funciones
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Arrow functions
const add = (a: number, b: number): number => a + b;

// Async/Await
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

#### TypeScript en Playwright

```typescript
import { test, expect, Page } from '@playwright/test';

// Page Object con tipos
class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.click('button[type="submit"]');
  }
}

// Test con tipos implícitos
test('user can login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('user@test.com', 'password123');
  await expect(page).toHaveURL('/dashboard');
});
```

---

### 1.4 Configuración del Entorno (20 min)

#### Requisitos del Sistema

```bash
# Verificar Node.js (requiere v18+)
node --version

# Verificar npm
npm --version

# Verificar Git
git --version
```

#### Instalación de Playwright

```bash
# Crear directorio del proyecto
mkdir mi-proyecto-tests
cd mi-proyecto-tests

# Inicializar proyecto con Playwright
npm init playwright@latest

# Opciones recomendadas:
# ✓ TypeScript
# ✓ tests folder
# ✓ GitHub Actions workflow
# ✓ Install browsers
```

#### Estructura del Proyecto

```
mi-proyecto-tests/
├── node_modules/
├── tests/
│   └── example.spec.ts     # Tests de ejemplo
├── playwright.config.ts     # Configuración
├── package.json
├── package-lock.json
└── tsconfig.json
```

#### Configuración de VS Code

Extensiones recomendadas:
```
1. Playwright Test for VS Code (Microsoft)
2. ESLint
3. Prettier
4. TypeScript Importer
5. GitLens
```

#### playwright.config.ts Básico

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
    screenshot: 'only-on-failure',
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

### 1.5 Primer Test con Playwright (30 min)

#### Test de Ejemplo Básico

```typescript
// tests/first-test.spec.ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // Navegar a la página
  await page.goto('https://playwright.dev');

  // Verificar el título
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev');

  // Click en el link "Get started"
  await page.getByRole('link', { name: 'Get started' }).click();

  // Verificar que llegamos a la página correcta
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

#### Ejecutar Tests

```bash
# Ejecutar todos los tests
npx playwright test

# Ejecutar en modo UI (interactivo)
npx playwright test --ui

# Ejecutar test específico
npx playwright test first-test.spec.ts

# Ejecutar con navegador visible
npx playwright test --headed

# Ver reporte
npx playwright show-report
```

#### Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npx playwright test` | Ejecutar todos los tests |
| `npx playwright test --ui` | Modo interactivo |
| `npx playwright test --headed` | Navegador visible |
| `npx playwright test --debug` | Modo debug |
| `npx playwright codegen` | Grabar tests |
| `npx playwright show-report` | Ver reporte HTML |

---

## Actividad Práctica

### Configurar Proyecto y Primer Test

**Instrucciones:**

1. **Crear proyecto** (10 min)
   ```bash
   mkdir qa-fpuna
   cd qa-fpuna
   npm init playwright@latest
   ```

2. **Explorar estructura** (5 min)
   - Abrir en VS Code
   - Revisar archivos generados

3. **Ejecutar tests de ejemplo** (5 min)
   ```bash
   npx playwright test
   npx playwright show-report
   ```

4. **Crear tu primer test** (10 min)
   - Crear archivo `tests/mi-primer-test.spec.ts`
   - Test que navegue a Google y busque "Playwright"
   - Verificar que aparezcan resultados

---

## Recursos del Módulo

### Documentación

- Playwright Getting Started: https://playwright.dev/docs/intro
- TypeScript Handbook: https://www.typescriptlang.org/docs/

### Cheatsheet

```typescript
// Navegación
await page.goto('url');
await page.goBack();
await page.reload();

// Locators
page.locator('css-selector');
page.getByRole('button', { name: 'Submit' });
page.getByText('Hello');
page.getByTestId('login-btn');
page.getByLabel('Email');
page.getByPlaceholder('Enter email');

// Acciones
await locator.click();
await locator.fill('text');
await locator.press('Enter');
await locator.selectOption('value');
await locator.check();

// Assertions
await expect(page).toHaveTitle('Title');
await expect(page).toHaveURL('/path');
await expect(locator).toBeVisible();
await expect(locator).toHaveText('text');
await expect(locator).toBeEnabled();
await expect(locator).toHaveCount(5);
```

---

## Puntos Clave

1. **Automatización es esencial:** ROI demostrado en la industria
2. **Playwright es la opción moderna:** Multi-navegador, rápido, robusto
3. **TypeScript previene errores:** Tipos = menos bugs
4. **Configuración simple:** npm init playwright es todo lo necesario
5. **Tests deben ser simples:** Empezar básico, iterar

---

*Siguiente módulo: Playwright Fundamentals*
