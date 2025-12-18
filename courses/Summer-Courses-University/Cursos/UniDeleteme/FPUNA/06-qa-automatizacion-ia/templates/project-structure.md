# Template: Estructura de Proyecto
## Organización Recomendada para Playwright

---

## Estructura Completa

```
qa-automation-project/
│
├── .github/
│   └── workflows/
│       ├── playwright.yml        # CI básico
│       ├── playwright-nightly.yml # Tests nocturnos
│       └── playwright-deploy.yml  # Post-deploy tests
│
├── tests/
│   ├── e2e/                      # Tests End-to-End
│   │   ├── auth/
│   │   │   ├── login.spec.ts
│   │   │   ├── register.spec.ts
│   │   │   └── forgot-password.spec.ts
│   │   ├── products/
│   │   │   ├── catalog.spec.ts
│   │   │   └── product-detail.spec.ts
│   │   ├── checkout/
│   │   │   ├── cart.spec.ts
│   │   │   └── payment.spec.ts
│   │   └── smoke.spec.ts         # Tests críticos rápidos
│   │
│   ├── api/                      # Tests de API
│   │   ├── users.spec.ts
│   │   ├── products.spec.ts
│   │   └── orders.spec.ts
│   │
│   └── visual/                   # Tests visuales
│       └── screenshots.spec.ts
│
├── pages/                        # Page Objects
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   ├── ProductListPage.ts
│   ├── ProductDetailPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── index.ts                  # Re-exports
│
├── components/                   # Componentes reutilizables
│   ├── NavigationComponent.ts
│   ├── SearchComponent.ts
│   ├── ModalComponent.ts
│   └── index.ts
│
├── fixtures/                     # Custom fixtures
│   ├── auth.fixture.ts
│   ├── data.fixture.ts
│   └── index.ts                  # Export principal
│
├── data/
│   ├── factories/                # Data factories
│   │   ├── userFactory.ts
│   │   ├── productFactory.ts
│   │   ├── orderFactory.ts
│   │   └── index.ts
│   │
│   └── testdata/                 # Datos estáticos
│       ├── users.json
│       └── products.json
│
├── utils/                        # Utilidades
│   ├── helpers.ts
│   ├── apiClient.ts
│   └── constants.ts
│
├── .auth/                        # Estado de autenticación (gitignore)
│   └── user.json
│
├── playwright-report/            # Reportes HTML (gitignore)
├── test-results/                 # Resultados/artifacts (gitignore)
├── screenshots/                  # Screenshots manuales
│
├── playwright.config.ts          # Configuración principal
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
├── .env.example                  # Variables de entorno ejemplo
└── README.md
```

---

## Estructura Mínima

```
qa-automation-project/
├── tests/
│   └── example.spec.ts
├── pages/
│   └── BasePage.ts
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Archivos Clave

### package.json

```json
{
  "name": "qa-automation-project",
  "version": "1.0.0",
  "description": "Framework de testing con Playwright",
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:smoke": "playwright test --grep @smoke",
    "test:api": "playwright test tests/api/",
    "report": "playwright show-report",
    "codegen": "playwright codegen"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@faker-js/faker": "^8.0.0",
    "dotenv": "^16.0.0"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {
      "@pages/*": ["pages/*"],
      "@fixtures/*": ["fixtures/*"],
      "@data/*": ["data/*"],
      "@utils/*": ["utils/*"]
    }
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### .gitignore

```gitignore
# Dependencies
node_modules/

# Playwright
playwright-report/
test-results/
blob-report/
.auth/

# Environment
.env
.env.local

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build
dist/

# Logs
*.log
npm-debug.log*
```

### .env.example

```bash
# Base URL
BASE_URL=http://localhost:3000

# API
API_URL=http://localhost:3000/api
API_KEY=your-api-key

# Test credentials
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=testpassword123

# CI
CI=false
```

---

## Index Files (Re-exports)

### pages/index.ts

```typescript
export { BasePage } from './BasePage';
export { LoginPage } from './LoginPage';
export { RegisterPage } from './RegisterPage';
export { ProductListPage } from './ProductListPage';
export { ProductDetailPage } from './ProductDetailPage';
export { CartPage } from './CartPage';
export { CheckoutPage } from './CheckoutPage';
```

### fixtures/index.ts

```typescript
import { test as base, Page } from '@playwright/test';
import { LoginPage, ProductListPage } from '../pages';
import { createUser, createProduct } from '../data/factories';

type Fixtures = {
  loginPage: LoginPage;
  authenticatedPage: Page;
  // ...más fixtures
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  // ...más fixtures
});

export { expect } from '@playwright/test';
```

### data/factories/index.ts

```typescript
export * from './userFactory';
export * from './productFactory';
export * from './orderFactory';
```

---

## README.md Template

```markdown
# QA Automation Project

## Descripción
Framework de testing automatizado con Playwright y TypeScript.

## Requisitos
- Node.js 18+
- npm 9+

## Instalación

```bash
# Clonar repositorio
git clone [url]
cd qa-automation-project

# Instalar dependencias
npm install

# Instalar navegadores
npx playwright install
```

## Configuración

```bash
# Copiar variables de entorno
cp .env.example .env

# Editar con tus valores
nano .env
```

## Ejecutar Tests

```bash
# Todos los tests
npm test

# Con interfaz visual
npm run test:ui

# Solo smoke tests
npm run test:smoke

# Solo API tests
npm run test:api

# Con navegador visible
npm run test:headed

# Modo debug
npm run test:debug
```

## Ver Reportes

```bash
npm run report
```

## Estructura

| Carpeta | Contenido |
|---------|-----------|
| `tests/` | Tests E2E, API y visuales |
| `pages/` | Page Objects |
| `fixtures/` | Custom fixtures |
| `data/` | Factories y datos de prueba |

## CI/CD
Los tests se ejecutan automáticamente en cada PR via GitHub Actions.

## Contribuir
1. Crear branch: `git checkout -b feature/nombre`
2. Commit: `git commit -m 'feat: descripción'`
3. Push: `git push origin feature/nombre`
4. Crear Pull Request
```

---

## Convenciones de Nombres

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Tests | `[feature].spec.ts` | `login.spec.ts` |
| Page Objects | `[Page]Page.ts` | `LoginPage.ts` |
| Components | `[Name]Component.ts` | `NavigationComponent.ts` |
| Fixtures | `[name].fixture.ts` | `auth.fixture.ts` |
| Factories | `[entity]Factory.ts` | `userFactory.ts` |

---

*Ver también: templates/playwright-config.md*
