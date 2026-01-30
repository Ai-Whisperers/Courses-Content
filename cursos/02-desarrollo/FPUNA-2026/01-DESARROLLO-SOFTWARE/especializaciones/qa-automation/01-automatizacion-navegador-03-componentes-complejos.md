# Tutorial: Testing Componentes Complejos
## Módulo 01: Playwright Avanzado

**Duración**: 35 minutos  
**Nivel**: Intermedio-Avanzado  
**Prerequisitos**: Selectores básicos de Playwright

---

## Componentes Complejos: El Reto

### ¿Qué son componentes complejos?

Son elementos UI que no se pueden testear con selectores normales:

```
❌ Modals/Diálogos - Aparecen dinámicamente
❌ iFrames - Contenido en otra ventana
❌ Shadow DOM - Componentes web encapsulados
❌ Dropdowns complejos - Anime, comportamientos especiales
❌ Tooltips - Aparecen al hover
❌ Tabs - Cambian contenido dinámicamente
```

Playwright tiene herramientas especiales para cada uno.

---

## 1. Modals y Diálogos

### El Problema

```html
<!-- Modal está en el DOM pero oculto -->
<dialog id="modal" style="display:none">
  <input name="email">
  <button>Guardar</button>
</dialog>

<!-- Este botón lo abre -->
<button onclick="document.getElementById('modal').showModal()">
  Abrir
</button>
```

No puedes simplemente hacer `.fill()` si está oculto.

### La Solución

```typescript
test('interactuar con modal', async ({ page }) => {
  await page.goto('/perfil');
  
  // PASO 1: Abrir el modal (trigger)
  await page.getByRole('button', { name: 'Editar Perfil' }).click();
  
  // PASO 2: Esperar a que el modal sea visible
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  
  // PASO 3: Interactuar CON EL MODAL (no con la página)
  await modal.getByLabel('Nombre').fill('Juan Pérez');
  await modal.getByLabel('Email').fill('juan@ejemplo.com');
  
  // PASO 4: Enviar (botón dentro del modal)
  await modal.getByRole('button', { name: 'Guardar' }).click();
  
  // PASO 5: Verificar que se cerró
  await expect(modal).not.toBeVisible();
});
```

**Clave**: Usar `modal.getByLabel()` para elementos DENTRO del modal.

---

### Ejemplo: Modal con Validación

```typescript
test('modal rechaza email inválido', async ({ page }) => {
  await page.goto('/perfil');
  
  const modal = page.getByRole('dialog');
  await page.getByRole('button', { name: 'Editar Perfil' }).click();
  await expect(modal).toBeVisible();
  
  // Llenar con email inválido
  await modal.getByLabel('Email').fill('invalido@');
  
  // Intentar guardar
  await modal.getByRole('button', { name: 'Guardar' }).click();
  
  // Modal sigue visible (validación falló)
  await expect(modal).toBeVisible();
  
  // Muestra error
  await expect(modal.getByText(/email inválido/i)).toBeVisible();
});
```

---

## 2. iFrames

### El Problema

```html
<!-- Contenido en otro documento -->
<iframe name="payment-frame" src="https://payment.provider.com/form">
  <!-- Aquí hay un formulario de pago -->
</iframe>
```

No puedes hacer `page.getByLabel()` porque está en OTRO documento.

### La Solución: frameLocator

```typescript
test('llenar formulario en iframe', async ({ page }) => {
  await page.goto('/checkout');
  
  // PASO 1: Acceder al iframe
  const paymentFrame = page.frameLocator('iframe[name="payment-frame"]');
  
  // PASO 2: Usar selectores DENTRO del iframe
  await paymentFrame.getByLabel('Número de Tarjeta').fill('4111 1111 1111 1111');
  await paymentFrame.getByLabel('Vencimiento').fill('12/25');
  await paymentFrame.getByLabel('CVV').fill('123');
  
  // PASO 3: Botón FUERA del iframe (página principal)
  await page.getByRole('button', { name: 'Pagar' }).click();
  
  // PASO 4: Verificar resultado (fuera del iframe)
  await expect(page.getByText('Pago completado')).toBeVisible();
});
```

**Clave**: 
- Usar `page.frameLocator()` para acceder al iframe
- Luego usar selectores normales dentro del frame

---

### Múltiples iFrames

```typescript
test('página con varios iframes', async ({ page }) => {
  await page.goto('/multi-frame');
  
  // Frame 1
  const frame1 = page.frameLocator('iframe#frame1');
  await frame1.getByLabel('Nombre').fill('Juan');
  
  // Frame 2
  const frame2 = page.frameLocator('iframe#frame2');
  await frame2.getByLabel('Email').fill('juan@ejemplo.com');
  
  // Botón principal (fuera de iframes)
  await page.getByRole('button', { name: 'Enviar' }).click();
});
```

---

## 3. Shadow DOM

### ¿Qué es Shadow DOM?

Componentes web encapsulados con estilos y DOM privados:

```html
<script src="custom-dropdown.js"></script>

<!-- Componente personalizado -->
<custom-dropdown id="country">
  <!-- El contenido REAL está dentro de un #shadowRoot -->
</custom-dropdown>
```

El HTML real está "oculto" en el shadow DOM.

### La Solución 1: Piercing

```typescript
test('interactuar con shadow DOM (piercing)', async ({ page }) => {
  await page.goto('/formulario');
  
  // >>> penetra el shadow DOM
  const shadowSelect = page.locator('custom-dropdown >>> select');
  await shadowSelect.selectOption('México');
  
  // Verificar valor
  await expect(shadowSelect).toHaveValue('Mexico');
});
```

**Clave**: El operador `>>>` permite penetrar shadow DOM.

---

### La Solución 2: evaluate (Más confiable)

```typescript
test('interactuar con shadow DOM (evaluate)', async ({ page }) => {
  await page.goto('/formulario');
  
  // Usar JavaScript para acceder al shadow DOM
  await page.locator('custom-dropdown').evaluate((element) => {
    // Aquí 'element' es el componente personalizado
    const shadow = element.shadowRoot;
    const select = shadow?.querySelector('select');
    if (select) {
      select.value = 'Mexico';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  
  // Verificar resultado
  await expect(page.locator('custom-dropdown')).toContainText('México');
});
```

---

### Ejemplo Completo: Fecha Picker Personalizado

```typescript
test('seleccionar fecha en custom date picker', async ({ page }) => {
  await page.goto('/evento-form');
  
  // Abrir date picker
  const datePicker = page.locator('date-picker');
  await datePicker.click();
  
  // Acceder a shadow DOM y hacer clic en fecha
  await datePicker.evaluate((el) => {
    const shadow = el.shadowRoot;
    const day15 = shadow?.querySelector('button[data-day="15"]');
    if (day15) day15.click();
  });
  
  // Verificar que se seleccionó
  await expect(datePicker).toContainText('15');
});
```

---

## 4. Tooltips y Popovers

### El Problema

Tooltips solo aparecen en hover y desaparecen cuando mueves el mouse.

### La Solución

```typescript
test('verificar tooltip', async ({ page }) => {
  await page.goto('/dashboard');
  
  // PASO 1: Hacer hover en el elemento
  const infoIcon = page.locator('icon-info');
  await infoIcon.hover();
  
  // PASO 2: Esperar y verificar tooltip
  const tooltip = page.locator('[role="tooltip"]');
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toContainText('Información importante');
  
  // PASO 3: Salir del elemento (tooltip desaparece)
  await page.locator('body').hover({ position: { x: 0, y: 0 } });
  await expect(tooltip).not.toBeVisible();
});
```

---

## 5. Dropdowns/Selects Complejos

### Select HTML Simple

```typescript
test('select nativo simple', async ({ page }) => {
  const select = page.locator('select[name="pais"]');
  await select.selectOption('Argentina');
  
  await expect(select).toHaveValue('AR');
});
```

### Custom Dropdown (Complejo)

```typescript
test('dropdown personalizado (como Tailwind Select)', async ({ page }) => {
  await page.goto('/formulario');
  
  // PASO 1: Abrir el dropdown (click en botón trigger)
  const dropdown = page.locator('[data-testid="country-dropdown"]');
  await dropdown.click();
  
  // PASO 2: Esperar a que aparezcan opciones
  const options = page.locator('[role="option"]');
  await expect(options.first()).toBeVisible();
  
  // PASO 3: Hacer clic en opción específica
  await page.locator('[role="option"]:has-text("Argentina")').click();
  
  // PASO 4: Verificar selección
  await expect(dropdown).toContainText('Argentina');
});
```

---

## 6. Tabs/Tabbed Content

```typescript
test('cambiar entre pestañas', async ({ page }) => {
  await page.goto('/dashboard');
  
  // PASO 1: Verificar que está activa la pestaña 1
  await expect(page.getByRole('tabpanel')).toContainText('Contenido Tab 1');
  
  // PASO 2: Hacer clic en Tab 2
  await page.getByRole('tab', { name: 'Configuración' }).click();
  
  // PASO 3: Verificar que cambió el contenido
  await expect(page.getByRole('tabpanel')).toContainText('Configuración');
  
  // PASO 4: Ir a Tab 3
  await page.getByRole('tab', { name: 'Seguridad' }).click();
  await expect(page.getByRole('tabpanel')).toContainText('Seguridad');
});
```

---

## Mejores Prácticas

### ✅ BUENO

```typescript
// 1. Esperar a visibilidad antes de interactuar
test('...', async ({ page }) => {
  await page.getByRole('button', { name: 'Abrir' }).click();
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();  // ← Esperar
  await modal.fill(...);
});

// 2. Usar selectores semánticos
await modal.getByRole('button', { name: 'Guardar' }).click();

// 3. Para shadow DOM, probar piercing primero, luego evaluate
const el = page.locator('custom >>> button');
// Si no funciona:
await page.locator('custom').evaluate(...);
```

### ❌ MALO

```typescript
// 1. No esperar visibilidad
await modal.fill(...);  // ¡Modal puede no estar visible!

// 2. Selectores frágiles
await page.locator('.btn.btn-primary.btn-lg').click();

// 3. Asumir que shadow DOM es accesible
// (puede no funcionar con pierce)
```

---

## Debugging: Encontrar Selectores Complejos

### Inspeccionador de DevTools

```bash
# Abrir modo debug
npx playwright test --debug

# En la consola del browser:
document.querySelector('custom-dropdown')?.shadowRoot
```

### Generar localizador

```typescript
// Playwright tiene herramienta para esto
test.only('encontrar localizador', async ({ page }) => {
  await page.goto('/');
  await page.pause();  // Se abre DevTools
  // Ahora inspecciona el elemento que necesitas
});
```

---

## Resumen

| Componente | Herramienta |
|-----------|-----------|
| Modal/Dialog | `.getByRole('dialog')` |
| iFrame | `page.frameLocator()` |
| Shadow DOM | `>>>` operator o `.evaluate()` |
| Tooltip | `.hover()` + wait for visible |
| Custom Dropdown | `.click()` + select option |
| Tabs | `.getByRole('tab')` |

---

## Próximas Secciones en Este Módulo

- [04_Authentication.md](./04_Authentication.md) - Manejo de autenticación
- [05_Performance.md](./05_Performance.md) - Optimizar velocidad de tests

---

*Tutorial: Complex Components - Módulo 01 Playwright Avanzado - FPUNA 2026*
