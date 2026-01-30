# Tutorial: Page Object Model (POM)
## Módulo 03: Arquitectura de Tests

**Duración**: 30 minutos  
**Nivel**: Intermedio

---

## ¿Por Qué POM?

```typescript
// ❌ Sin POM: Selectores esparcidos, difícil mantener
test('login', async ({ page }) => {
  await page.fill('[name="email"]', 'user@test.com');
  await page.fill('[name="password"]', 'pass');
  await page.click('button.login-btn');
});

test('editar perfil', async ({ page }) => {
  await page.click('button.profile-btn'); // Selector repetido
  await page.fill('[name="nombre"]', 'Juan');
});

// Si el selector cambia, ¡actualizar todos los tests!
```

---

## Solución: Page Object

```typescript
// ✅ login-page.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async fillEmail(email: string) {
    await this.page.fill('[name="email"]', email);
  }

  async fillPassword(password: string) {
    await this.page.fill('[name="password"]', password);
  }

  async clickLogin() {
    await this.page.click('button.login-btn');
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLogin();
  }
}

// ✅ En tests: Usar page object
test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@test.com', 'pass');
  
  await expect(page).toHaveURL('/dashboard');
});
```

---

## Beneficios

✅ **Mantenibilidad**: Cambiar selector en un lugar  
✅ **Reutilización**: Métodos usables en múltiples tests  
✅ **Readabilidad**: Tests parecen pseudocódigo  
✅ **Escalabilidad**: Fácil agregar páginas nuevas

---

## Estructura Profesional

```
pages/
├── base.page.ts (clase base)
├── login.page.ts
├── dashboard.page.ts
├── profile.page.ts
└── products.page.ts

tests/
├── auth.spec.ts
├── dashboard.spec.ts
└── shopping.spec.ts
```

---

*Tutorial: Page Object Model - Módulo 03 - FPUNA 2026*
