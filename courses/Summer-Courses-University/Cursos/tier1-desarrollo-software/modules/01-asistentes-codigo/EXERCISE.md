# Ejercicio Práctico - Módulo 01
## Asistentes de Código

---

## Objetivo

Practicar el uso de asistentes de código (Copilot, Cursor, Claude) para desarrollar una utilidad completa, comparando la efectividad de diferentes herramientas.

**Duración:** 25 minutos
**Tipo:** Desarrollo guiado
**Herramientas:** VS Code + Copilot o Cursor, Claude/ChatGPT

---

## Proyecto: Utilidad de Validación de Datos

Desarrollarás un módulo de validación para formularios paraguayos que incluya:
- Validación de RUC
- Validación de cédula de identidad
- Validación de número de teléfono (formato Paraguay)

---

## Parte 1: Setup con Comentarios (10 min)

### Paso 1.1: Crear Archivo Base

Crea un archivo `validators.js` y escribe estos comentarios:

```javascript
/**
 * Módulo de validación para datos paraguayos
 * Incluye validadores para: RUC, CI, teléfono
 */

// Validar RUC paraguayo
// Formato: 80000000-0 (8 dígitos + dígito verificador)
// El dígito verificador se calcula con módulo 11

// Validar Cédula de Identidad paraguaya
// Formato: 1.234.567 o 1234567 (1-8 dígitos)
// Limpiar puntos y validar que sea numérico

// Validar teléfono Paraguay
// Formato: 0981 123 456 o 0981123456 o +595 981 123 456
// Código país: +595, códigos operadora: 98x, 99x, 97x, 96x, 91x, 92x

```

### Paso 1.2: Generar con Copilot/Cursor

Para cada sección de comentarios:
1. Posiciona el cursor después del comentario
2. Espera sugerencia de Copilot O usa Ctrl+K en Cursor
3. Evalúa la sugerencia
4. Acepta o modifica

**Documenta tu experiencia:**

| Función | ¿Primera sugerencia correcta? | ¿Iteraciones necesarias? |
|---------|-------------------------------|--------------------------|
| validateRUC | | |
| validateCI | | |
| validatePhone | | |

---

## Parte 2: Mejora con Chat (8 min)

### Paso 2.1: Pedir Mejoras a Claude/ChatGPT

Copia tu código generado y envía este prompt:

```
Revisa este código de validación para Paraguay:

[PEGAR TU CÓDIGO AQUÍ]

Mejora:
1. El cálculo del dígito verificador del RUC
2. Agregar mensajes de error descriptivos
3. Agregar manejo de edge cases
4. Agregar JSDoc completo

Devuelve el código mejorado con explicaciones.
```

### Paso 2.2: Comparar Versiones

| Aspecto | Versión Copilot | Versión Mejorada |
|---------|-----------------|------------------|
| Manejo de errores | | |
| Documentación | | |
| Edge cases | | |
| Legibilidad | | |

---

## Parte 3: Tests con IA (7 min)

### Paso 3.1: Generar Tests

En Cursor o Claude, solicita:

```
Para el módulo de validación anterior, genera tests con Jest:

Casos a probar:
- RUC válido e inválido
- CI con y sin puntos
- Teléfonos en diferentes formatos
- Inputs vacíos, null, undefined
- Inputs con caracteres especiales

Incluye describe blocks organizados por función.
```

### Paso 3.2: Crear Archivo de Tests

Crea `validators.test.js` con los tests generados.

**Verifica los tests:**

```bash
npm install --save-dev jest
npx jest validators.test.js
```

| Test | ¿Pasa? | Si no, ¿qué ajustaste? |
|------|--------|------------------------|
| RUC válido | | |
| RUC inválido | | |
| CI formatos | | |
| Teléfono válido | | |
| Edge cases | | |

---

## Entregables

```
ejercicio-01/
├── validators.js         # Módulo de validación
├── validators.test.js    # Tests
├── prompts.md           # Prompts utilizados
└── notas.md             # Tus observaciones
```

### Contenido de notas.md

```markdown
# Notas del Ejercicio

## Herramientas Usadas
- [x] Copilot / [ ] Cursor
- [x] Claude / [ ] ChatGPT

## Observaciones

### ¿Qué funcionó bien?
-

### ¿Qué requirió ajustes manuales?
-

### ¿Qué herramienta fue más efectiva para qué?
-

### Prompts más efectivos
-

## Código Final
[¿Cuánto % fue generado por IA vs escrito manualmente?]
```

---

## Código de Referencia

Si te trabas, aquí hay una referencia:

```javascript
/**
 * Valida RUC paraguayo con dígito verificador
 * @param {string} ruc - RUC en formato XXXXXXXX-D o XXXXXXXXD
 * @returns {{valid: boolean, error?: string}}
 */
function validateRUC(ruc) {
  if (!ruc) return { valid: false, error: 'RUC es requerido' };

  // Limpiar formato
  const clean = ruc.replace(/[-\s]/g, '');

  if (!/^\d{9}$/.test(clean)) {
    return { valid: false, error: 'RUC debe tener 9 dígitos' };
  }

  const digits = clean.slice(0, 8);
  const checkDigit = parseInt(clean[8]);

  // Calcular dígito verificador (módulo 11)
  const weights = [2, 3, 4, 5, 6, 7, 2, 3];
  let sum = 0;
  for (let i = 7; i >= 0; i--) {
    sum += parseInt(digits[i]) * weights[7 - i];
  }

  const remainder = sum % 11;
  const expectedCheck = remainder < 2 ? 0 : 11 - remainder;

  if (checkDigit !== expectedCheck) {
    return { valid: false, error: 'Dígito verificador inválido' };
  }

  return { valid: true };
}
```

---

## Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Módulo de validación funcional | 30 |
| Tests que cubren casos principales | 25 |
| Documentación de prompts usados | 20 |
| Notas de observación | 15 |
| Código limpio y documentado | 10 |
| **Total** | **100** |

---

*Ejercicio Módulo 01 - Asistentes de Código*
*Tier 1 - Desarrollo de Software*
