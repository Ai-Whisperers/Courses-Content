# Tutorial: Generación Automática de Tests con IA
## Módulo 05: IA para QA

**Duración**: 50 minutos  
**Nivel**: Avanzado  
**Prerequisitos**: Modules 01-04, OpenCode configurado

---

## El Problema: Tests Tediosos Manualmente

```
❌ Sin IA:
Developer escribe 100 líneas de test
⏱️ 30 minutos por test
📊 1000 líneas = 300 minutos
😴 Tarea repetitiva y tediosa

✅ Con IA (OpenCode):
Developer describe qué testear
⏱️ 2 minutos diciendo qué hacer
🤖 IA genera 200+ líneas de código
✨ Test listo para ejecutar
```

---

## Generación de Tests con OpenCode

### Patrón 1: Test Simple

**Prompt**:
```
Genera test Playwright para:
- URL: /login
- Acciones: llenar email, contraseña, click login
- Verificaciones: redirige a /dashboard, muestra nombre usuario
```

**IA Genera**:
```typescript
test('login exitoso', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', 'user@test.com');
  await page.fill('[data-testid="password"]', 'password123');
  await page.click('[data-testid="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Bienvenido')).toBeVisible();
});
```

---

## Patrón 2: Scenario Testing (BDD-Style)

**Prompt**:
```
Genera tests Playwright estilo Gherkin para:

Feature: Inscripción a Cursos
  Scenario: Estudiante se inscribe a curso disponible
    Given: Estudiante logueado
    When: Hace click en "Inscribirse" para Cálculo I
    Then: Aparece confirmación y aparece en "Mis Cursos"
```

**IA Genera**:
```typescript
test.describe('Inscripción a Cursos', () => {
  test('estudiante se inscribe a curso disponible', async ({ page, authenticatedPage }) => {
    await authenticatedPage.goto('/cursos');
    
    await authenticatedPage.locator('text="Cálculo I"').waitFor();
    const calcButton = authenticatedPage
      .locator('text="Cálculo I"')
      .locator('button:has-text("Inscribirse")');
    
    await calcButton.click();
    
    await expect(authenticatedPage.getByText(/Inscripción exitosa/i)).toBeVisible();
    
    await authenticatedPage.goto('/mis-cursos');
    await expect(authenticatedPage.getByText('Cálculo I')).toBeVisible();
  });
});
```

---

## Patrón 3: Generar Test Suite Completa

**Prompt**:
```
Genera suite completa de tests Playwright para módulo de Calificaciones:

Acciones a testear:
1. Profesor ingresa calificación para alumno
2. Alumno ve su calificación
3. Sistema calcula promedio automáticamente
4. Reporte de calificaciones funciona

Incluir:
- Setup (autenticación)
- Happy path
- Error cases
- Edge cases
- Data validation
```

**IA Genera** (200+ líneas de código profesional)

---

## Mejores Prácticas con IA

✅ Ser específico en prompts  
✅ Incluir edge cases en descripción  
✅ Pedir tests separados por feature  
✅ Revisar código generado  
✅ Integrar con tu framework  

❌ Confiar 100% en IA sin revisar  
❌ Prompts vagos generan tests pobres  
❌ Olvidar configurar selectors correctos  

---

*Tutorial: AI Test Generation - Módulo 05 IA para QA - FPUNA 2026*
