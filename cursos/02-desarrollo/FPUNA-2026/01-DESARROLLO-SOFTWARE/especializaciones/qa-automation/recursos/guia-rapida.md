# Playwright QA Cheatsheet
## Referencia Rápida - FPUNA 2026

---

## Comandos Básicos

### Setup
```bash
npm init playwright@latest
npx playwright install
npx playwright test
npx playwright test --ui
npx playwright show-report
```

---

## Selectores

### Por Rol (Recomendado)
```typescript
page.getByRole('button', { name: 'Enviar' })
page.getByRole('link', { name: 'Inicio' })
page.getByRole('textbox', { name: 'Email' })
```

### Por Texto
```typescript
page.getByText('Hola Mundo')
page.getByText(/regex/i)
```

### Por Label
```typescript
page.getByLabel('Nombre de usuario')
```

---

## Network Mocking

```typescript
await page.route('**/api/users', route => {
  route.fulfill({ status: 200, json: [{ id: 1 }] });
});
```

---

## Visual Testing

```typescript
await expect(page).toHaveScreenshot('page.png');
await expect(page).toHaveScreenshot('page.png', { fullPage: true });
```

---

## Autenticación

```typescript
await page.context().storageState({ path: 'auth.json' });
```

---

*Cheatsheet QA Track - FPUNA 2026*
