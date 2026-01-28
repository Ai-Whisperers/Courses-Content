# OpenCode Prompt: Debugging y Análisis de Tests
## Módulo 05: IA para QA

Use this prompt to diagnose and fix failing tests with AI assistance.

---

## PROMPT SIMPLE

```
Mi test de Playwright falla con este error:

ERROR:
[PEGAR_MENSAJE_ERROR_COMPLETO]

CONTEXTO:
- Archivo: [nombre_archivo.spec.ts]
- Test: [nombre_test]
- Navegador: [chrome/firefox/webkit]

¿Cuál es el problema?
¿Cómo lo arreglo?
```

---

## PROMPT AVANZADO (RECOMENDADO)

```
DEBUGGING DE TEST FALLIDO - Playwright + TypeScript

═══════════════════════════════════════
INFORMACIÓN DEL ERROR
═══════════════════════════════════════

ARCHIVO: [test file path]

TEST FALLIDO:
[Copiar nombre exacto del test]

TIPO DE ERROR:
[x] Timeout
[x] Element not found
[x] Assertion failed
[x] Navigation failed
[x] Flaky (intermitente)
[x] Otro: _________

ERROR COMPLETO:
```
[Pegar STACK TRACE COMPLETO aquí]
```

═══════════════════════════════════════
CONTEXTO DEL TEST
═══════════════════════════════════════

TEST CODE:
```typescript
[Pegar el test completo que falla]
```

PÁGINA OBJECT (si usa):
```typescript
[Pegar Page Object relevante]
```

═══════════════════════════════════════
INFORMACIÓN DEL ENTORNO
═══════════════════════════════════════

Ejecutando en:
[x] Local (Windows/Mac/Linux)
[x] CI (GitHub Actions)
[x] Docker

Navegador: [chrome/firefox/webkit]

Resultado:
[x] Siempre falla (determinístico)
[x] A veces falla (intermitente/flaky)
[x] Pasa local pero falla en CI

═══════════════════════════════════════
ARCHIVOS RELEVANTES
═══════════════════════════════════════

1. playwright.config.ts (configuración):
```typescript
[Pegar configuración]
```

2. Package.json (dependencias):
```json
{
  "dependencies": {
    "@playwright/test": "version",
    "...": "..."
  }
}
```

═══════════════════════════════════════
LO QUE YA INTENTÉ
═══════════════════════════════════════

[x] He intentado: [1. ...]
[x] He intentado: [2. ...]
[x] He intentado: [3. ...]

Resultado: [No funcionó porque...]

═══════════════════════════════════════
DIAGNOSTICO REQUERIDO
═══════════════════════════════════════

Por favor:

1. ✅ IDENTIFICA EL PROBLEMA
   - ¿Cuál es el ROOT CAUSE exacto?
   - ¿Por qué está sucediendo?
   - ¿Es un problema del test o de la aplicación?

2. ✅ CLASIFICA LA SEVERIDAD
   - [x] Bloqueador (previene toda ejecución)
   - [x] Crítico (afecta flujo principal)
   - [x] Mayor (funcionalidad específica rota)
   - [x] Menor (efecto secundario)

3. ✅ PROPORCIONA SOLUCIONES
   - Solución 1 (RECOMENDADA): [...]
   - Solución 2 (Alternativa): [...]
   - Solución 3 (Workaround): [...]

4. ✅ REFACTORIZA EL TEST
   - Proporciona código arreglado completo
   - Mantén la misma lógica
   - Mejora selectores si es necesario
   - Agrega comentarios explicativos

5. ✅ PREVENCIÓN FUTURA
   - ¿Cómo evitar este problema?
   - ¿Qué cambios de configuración?
   - ¿Qué best practices aplicar?

═══════════════════════════════════════
FORMATO ESPERADO DE RESPUESTA
═══════════════════════════════════════

## 🔍 ANÁLISIS

### Problema Identificado
[Descripción clara del problema]

### Root Cause
[Por qué sucede, análisis técnico]

### Impacto
- Severity: [Bloqueador/Crítico/Mayor/Menor]
- Afecta: [Qué funcionalidad]

---

## ✅ SOLUCIONES

### Solución 1: [Nombre - RECOMENDADA]
```typescript
[Código arreglado]
```
Ventajas: ...
Desventajas: ...

### Solución 2: [Nombre alternativa]
```typescript
[Código alternativo]
```

---

## 🛡️ PREVENCIÓN

Best practices para evitar esto en futuro:
1. [Práctica 1]
2. [Práctica 2]
3. [Práctica 3]

Cambios de configuración:
[Si aplica]
```

---

## CASOS COMUNES DE DEBUGGING

### 1️⃣ TIMEOUT - Elemento No Aparece

**Prompt específico**:
```
Error: page.click: Timeout 30000ms exceeded.
Locator: 'button.submit'

El botón existe en el DOM pero no puedo hacer click.
Pasa en CI (Ubuntu) pero NO en local (Windows).

DIAGNOSTICA:
- ¿Por qué el timeout?
- ¿Qué diferencias entre local y CI?
- Solución para ambos entornos
```

### 2️⃣ FLAKY TEST - Intermitente

**Prompt específico**:
```
Test intermitente (pasa 70% de veces, falla 30%):

FALLA CON:
expect(received).toContainText(expected)
Expected: 'Éxito'
Received: ''

A veces el elemento está vacío, a veces tiene contenido.

DIAGNOSTICA:
- ¿Es race condition?
- ¿Elemento tarda en cargar?
- Solución robusta con auto-waiting

Proporciona código arreglado.
```

### 3️⃣ SELECTOR ROTO - HTML Cambió

**Prompt específico**:
```
Error: locator did not resolve to any element

SELECTOR VIEJO: div.form-group:nth-child(3) input

HTML ACTUAL:
<form>
  <label>Email</label>
  <input type="email" aria-label="Email">
  <label>Contraseña</label>
  <input type="password" aria-label="Contraseña">
</form>

REFACTORIZA:
- Reemplaza CSS selectors con getByLabel/getByRole
- Mucho más robusto
- Menos frágil ante cambios de CSS
```

### 4️⃣ LOCAL ≠ CI - Diferencias de Ambiente

**Prompt específico**:
```
Test PASA en local, FALLA en CI:

LOCAL: Windows + Playwright 1.40
CI: Ubuntu + Playwright 1.40 (GitHub Actions)

ERROR EN CI: "timeout esperando elemento visible"

ANALIZA:
- ¿Diferencias SO (Windows vs Linux)?
- ¿Diferencias de viewport?
- ¿Timeouts insuficientes?
- ¿Variables de ambiente?

Proporciona configuración para ambos.
```

### 5️⃣ ASSERTION VAGA - Validación Débil

**Prompt específico**:
```
Assertion falla intermitentemente:

TEST:
expect(result).toBeTruthy();  // ❌ Muy vago

PROBLEMA:
- No es claro qué se está validando
- Puede dar falsos positivos/negativos
- Difícil debuggear

REFACTORIZA:
- Assertion más específica
- Mejor error message
- Más fácil de mantener
```

---

## CHECKLIST PARA DEBUGGING

✅ **Antes de reportar un test fallido**:
- [ ] ¿He ejecutado el test 3 veces? (verificar flakiness)
- [ ] ¿El test pasa en local?
- [ ] ¿He verificado que el elemento existe?
- [ ] ¿He revisado los logs completos?
- [ ] ¿He probado en otro navegador?
- [ ] ¿El timeout es suficiente para la acción?
- [ ] ¿Usé selectores robustos (getByRole, etc)?
- [ ] ¿Estoy esperando con expect(), no setTimeout?

✅ **Información a proporcionar a IA**:
- Stack trace completo
- Test code completo
- Page Object (si aplica)
- Error exacto + contexto
- Lo que ya intenté
- Entorno (local/CI)
- Si es determinístico o intermitente

---

## HERRAMIENTAS DE DEBUGGING ÚTILES

### Playwright Inspector
```bash
PWDEBUG=1 npx playwright test [test_name]
# Abre inspector interactivo
```

### Trace Viewer
```bash
npx playwright show-trace trace.zip
# Ver qué pasó exactamente
```

### Debug Logs
```bash
DEBUG=pw:api npx playwright test
# Ver logs detallados
```

### Screenshots/Videos
```typescript
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'retain-on-failure',
}
```

---

## RESPUESTA DE IA ESPERADA

```
## 🔍 ANÁLISIS
[Identificación del problema]

## 🛠️ SOLUCIÓN
[Código arreglado]

## ✅ VERIFICACIÓN
[Cómo verificar que funciona]

## 🛡️ PREVENCIÓN
[Cómo evitar en futuro]
```

---

*OpenCode Prompt: Debugging Analysis - Módulo 05 IA para QA - FPUNA 2026*
