# Ejercicio: Módulo 1
## Configuración del Entorno y Primer Test

---

## Objetivo

Configurar un proyecto de Playwright desde cero y crear tu primer test automatizado funcional.

**Duración:** 30 minutos

---

## Parte 1: Configuración del Proyecto (10 minutos)

### Paso 1: Crear directorio del proyecto

Abre tu terminal y ejecuta:

```bash
# Crear y entrar al directorio
mkdir qa-automation-fpuna
cd qa-automation-fpuna
```

### Paso 2: Inicializar Playwright

```bash
npm init playwright@latest
```

Cuando te pregunte, selecciona:
- [ ] TypeScript (recomendado)
- [ ] Folder: tests
- [ ] Add GitHub Actions: Yes
- [ ] Install browsers: Yes

### Paso 3: Verificar instalación

```bash
# Ejecutar tests de ejemplo
npx playwright test

# Ver reporte
npx playwright show-report
```

### Checklist de verificación:

- [ ] Proyecto creado correctamente
- [ ] Carpeta `tests/` existe
- [ ] `playwright.config.ts` existe
- [ ] Tests de ejemplo ejecutan sin errores
- [ ] Reporte HTML se abre en navegador

---

## Parte 2: Explorar la Estructura (5 minutos)

### Abre el proyecto en VS Code

```bash
code .
```

### Revisa cada archivo:

**package.json**
```
¿Qué scripts hay disponibles?
_____________________________________
```

**playwright.config.ts**
```
¿Cuál es el baseURL configurado?
_____________________________________

¿Qué navegadores están configurados?
_____________________________________
```

**tests/example.spec.ts**
```
¿Cuántos tests hay?
_____________________________________

¿Qué página visitan?
_____________________________________
```

---

## Parte 3: Tu Primer Test (15 minutos)

### Paso 1: Crear nuevo archivo de test

Crea el archivo `tests/mi-primer-test.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

// Tu primer test aquí
```

### Paso 2: Escribir test para Google

Completa el siguiente test:

```typescript
import { test, expect } from '@playwright/test';

test('buscar Playwright en Google', async ({ page }) => {
  // 1. Navegar a Google
  await page.goto('https://www.google.com');

  // 2. Aceptar cookies si aparece (puede variar por región)
  // Intenta hacer click, pero no falla si no existe
  await page.getByRole('button', { name: /accept|aceptar/i })
    .click()
    .catch(() => {}); // Ignora si no existe

  // 3. Buscar "Playwright testing"
  // COMPLETA: Encontrar el input de búsqueda y escribir
  await page.________('[name="q"]').________('Playwright testing');

  // 4. Presionar Enter
  await page.________('[name="q"]').press('Enter');

  // 5. Verificar que hay resultados
  // COMPLETA: Esperar que aparezca texto "Playwright"
  await expect(page.getByText('Playwright').__________).______();
});
```

### Paso 3: Ejecutar tu test

```bash
# Ejecutar solo tu test
npx playwright test mi-primer-test.spec.ts

# Ejecutar con navegador visible
npx playwright test mi-primer-test.spec.ts --headed

# Modo debug paso a paso
npx playwright test mi-primer-test.spec.ts --debug
```

---

## Parte 4: Test Adicional (Opcional)

Si terminaste temprano, crea un segundo test:

```typescript
test('Wikipedia tiene artículo de Paraguay', async ({ page }) => {
  // 1. Ir a Wikipedia en español
  await page.goto('https://es.wikipedia.org');

  // 2. Buscar "Paraguay"
  await page.getByRole('searchbox').fill('Paraguay');
  await page.getByRole('button', { name: 'Buscar' }).click();

  // 3. Verificar que estamos en el artículo correcto
  await expect(page).toHaveURL(/wiki\/Paraguay/);

  // 4. Verificar que aparece el título
  await expect(
    page.getByRole('heading', { name: 'Paraguay' })
  ).toBeVisible();
});
```

---

## Entregable

Al final del ejercicio debes tener:

- [ ] Proyecto `qa-automation-fpuna` funcionando
- [ ] Archivo `tests/mi-primer-test.spec.ts` con test de Google
- [ ] Test ejecutando exitosamente
- [ ] (Bonus) Test adicional de Wikipedia

---

## Solución

### Test de Google completo:

```typescript
import { test, expect } from '@playwright/test';

test('buscar Playwright en Google', async ({ page }) => {
  // 1. Navegar a Google
  await page.goto('https://www.google.com');

  // 2. Aceptar cookies si aparece
  await page.getByRole('button', { name: /accept|aceptar/i })
    .click()
    .catch(() => {});

  // 3. Buscar "Playwright testing"
  await page.locator('[name="q"]').fill('Playwright testing');

  // 4. Presionar Enter
  await page.locator('[name="q"]').press('Enter');

  // 5. Verificar que hay resultados
  await expect(page.getByText('Playwright').first()).toBeVisible();
});
```

---

## Troubleshooting

### Error: "Executable doesn't exist"
```bash
npx playwright install
```

### Error: "Timeout waiting for..."
- Aumentar timeout en config
- Verificar selector correcto
- Usar `--debug` para inspeccionar

### Error: "Target page, context or browser closed"
- Asegurar que el test no termina antes que las acciones
- Agregar `await` a todas las acciones

---

## Reflexión

Responde brevemente:

1. ¿Qué ventaja viste del modo `--headed`?

   _______________________________________________

2. ¿Qué hace el modo `--debug`?

   _______________________________________________

3. ¿Qué información útil tiene el reporte HTML?

   _______________________________________________

---

*Tiempo total: 30 minutos*
