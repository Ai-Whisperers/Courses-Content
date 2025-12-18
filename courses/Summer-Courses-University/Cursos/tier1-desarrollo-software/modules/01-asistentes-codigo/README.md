# Módulo 01: Asistentes de Código
## Tier 1 - Desarrollo de Software

---

## Descripción

Este módulo introduce las herramientas de IA para asistencia de código: GitHub Copilot, Cursor Editor, y el uso de LLMs como Claude y ChatGPT para programación. Aprenderás a maximizar tu productividad mientras mantienes la calidad del código.

**Duración:** 2 horas
**Tipo:** Teórico-Práctico

---

## Objetivos de Aprendizaje

Al completar este módulo, los participantes podrán:

1. **Configurar** GitHub Copilot en VS Code
2. **Utilizar** Cursor Editor para desarrollo asistido
3. **Comparar** cuándo usar cada herramienta
4. **Escribir** prompts efectivos para generación de código
5. **Evaluar** y mejorar código generado por IA

---

## Contenido

### 1. Panorama de Asistentes de Código

```
┌─────────────────────────────────────────────────────────────────┐
│                 TIPOS DE ASISTENTES DE CÓDIGO                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  INLINE (en el editor)          CONVERSACIONAL (chat)           │
│  ┌─────────────────────┐        ┌─────────────────────┐         │
│  │ GitHub Copilot      │        │ ChatGPT             │         │
│  │ Cursor AI           │        │ Claude              │         │
│  │ Amazon CodeWhisperer│        │ Gemini              │         │
│  │ Tabnine             │        │ Copilot Chat        │         │
│  └─────────────────────┘        └─────────────────────┘         │
│                                                                  │
│  • Sugiere mientras escribes    • Conversación interactiva      │
│  • Contexto del archivo actual  • Contexto de todo el proyecto  │
│  • Completado automático        • Explicaciones detalladas      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2. GitHub Copilot

#### Configuración

```
PASO 1: Suscripción
- Individual: $10/mes o $100/año
- Estudiantes: GRATIS (GitHub Education)
- Trial: 30 días gratis

PASO 2: Instalación en VS Code
1. Abrir VS Code
2. Extensions (Ctrl+Shift+X)
3. Buscar "GitHub Copilot"
4. Instalar
5. Iniciar sesión con GitHub

PASO 3: Verificar
- Abrir archivo .js o .py
- Escribir comentario
- Ver sugerencias en gris
- Tab para aceptar
```

#### Comandos Esenciales

| Acción | Windows/Linux | Mac |
|--------|---------------|-----|
| Aceptar sugerencia | `Tab` | `Tab` |
| Rechazar | `Esc` | `Esc` |
| Siguiente sugerencia | `Alt + ]` | `Option + ]` |
| Anterior sugerencia | `Alt + [` | `Option + [` |
| Abrir panel | `Ctrl + Enter` | `Cmd + Enter` |
| Copilot Chat | `Ctrl + I` | `Cmd + I` |

#### Técnicas de Uso Efectivo

**1. Comentarios Descriptivos:**
```javascript
// Función que valida email con regex
// Retorna true si es válido, false si no
// Debe manejar dominios .com, .org, .edu, .gov.py
function validateEmail(email) {
  // Copilot completará aquí
}
```

**2. Nombres Descriptivos:**
```javascript
// Nombre claro → mejor sugerencia
function calculateMonthlyPaymentWithInterest(principal, rate, months) {
  // Copilot entiende la intención
}

// vs nombre vago → sugerencia genérica
function calc(p, r, m) {
  // Copilot no sabe qué hacer
}
```

**3. Tipos y Documentación:**
```typescript
/**
 * Calcula el impuesto IVA para Paraguay
 * @param amount - Monto base en guaraníes
 * @param rate - Tasa (default 10%)
 * @returns Monto del impuesto
 */
function calculateIVA(amount: number, rate: number = 0.10): number {
  // Copilot genera implementación correcta
}
```

---

### 3. Cursor Editor

#### ¿Qué es Cursor?

Cursor es un fork de VS Code con IA integrada profundamente:
- Mismas extensiones que VS Code
- Chat con contexto del proyecto completo
- Edición inline con IA
- Composer para cambios multi-archivo

#### Instalación

```
1. Descargar de cursor.sh
2. Instalar (reemplaza o coexiste con VS Code)
3. Importar configuración de VS Code (opcional)
4. Iniciar sesión
```

#### Características Clave

**1. Cmd+K / Ctrl+K - Edición Inline:**
```
Seleccionar código → Ctrl+K → Describir cambio

Ejemplo:
- Seleccionar función
- Ctrl+K
- "Agrega manejo de errores y logging"
- Enter → Ver diff → Aceptar
```

**2. Cmd+L / Ctrl+L - Chat:**
```
Chat con contexto del proyecto completo

Ejemplo:
"¿Dónde se define la autenticación en este proyecto?"
"Explica cómo funciona el sistema de permisos"
"Genera un nuevo endpoint similar a /api/users"
```

**3. Composer (Cmd+I / Ctrl+I):**
```
Cambios en múltiples archivos

Ejemplo:
"Crea un nuevo modelo User con:
- Campos: id, email, name, createdAt
- Migración de base de datos
- Rutas CRUD en /api/users
- Tests básicos"

→ Genera/modifica varios archivos a la vez
```

---

### 4. Claude y ChatGPT para Código

#### Cuándo Usar Cada Uno

| Escenario | Mejor Herramienta |
|-----------|-------------------|
| Completar línea actual | Copilot |
| Función completa simple | Copilot |
| Explicar código existente | Claude/ChatGPT |
| Refactorizar archivo largo | Claude |
| Debugging complejo | Claude/ChatGPT |
| Arquitectura y diseño | Claude/ChatGPT |
| Código con contexto de proyecto | Cursor |

#### Prompts Efectivos para Código

**Estructura Recomendada:**
```
CONTEXTO: [Stack tecnológico, versiones]
CÓDIGO EXISTENTE: [Si aplica]
TAREA: [Qué necesitas]
REQUISITOS: [Especificaciones]
FORMATO: [Cómo quieres la respuesta]
```

**Ejemplo:**
```
CONTEXTO: Node.js 18, Express 4.18, PostgreSQL 15

TAREA: Crear middleware de autenticación JWT

REQUISITOS:
- Verificar token en header Authorization
- Decodificar y validar expiración
- Agregar user a req.user
- Manejar errores: token inválido, expirado, ausente
- Logging de intentos fallidos

FORMATO: Código comentado + explicación de cada parte
```

---

### 5. Flujo de Trabajo Recomendado

```
┌─────────────────────────────────────────────────────────────────┐
│                 FLUJO DE DESARROLLO CON IA                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. PLANIFICACIÓN (Claude/ChatGPT)                              │
│     "Diseña la arquitectura para un sistema de..."              │
│                         │                                        │
│                         ▼                                        │
│  2. SCAFFOLDING (Cursor Composer)                               │
│     "Crea la estructura base del proyecto con..."               │
│                         │                                        │
│                         ▼                                        │
│  3. IMPLEMENTACIÓN (Copilot + Cursor)                           │
│     Escribir código con sugerencias inline                      │
│                         │                                        │
│                         ▼                                        │
│  4. DEBUGGING (Claude/ChatGPT)                                  │
│     "Este código da error X, aquí está el stack trace..."      │
│                         │                                        │
│                         ▼                                        │
│  5. REFACTORING (Cursor Cmd+K)                                  │
│     "Refactoriza esto para usar async/await"                    │
│                         │                                        │
│                         ▼                                        │
│  6. DOCUMENTACIÓN (Claude/Copilot)                              │
│     "Genera JSDoc para estas funciones"                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### 6. Buenas Prácticas

#### ✅ SÍ Hacer

```
1. Revisar código generado antes de commit
   - ¿Tiene sentido la lógica?
   - ¿Hay edge cases no manejados?
   - ¿Es seguro?

2. Usar nombres descriptivos
   - Ayuda a la IA a entender intención
   - Mejores sugerencias

3. Proporcionar contexto
   - Comentarios explicativos
   - Tipos TypeScript
   - JSDoc/docstrings

4. Iterar
   - Primera sugerencia rara vez es perfecta
   - Refinar con más instrucciones
```

#### ❌ NO Hacer

```
1. Aceptar código sin entenderlo
   - Puedes introducir bugs o vulnerabilidades
   - No aprenderás

2. Confiar ciegamente en código de seguridad
   - Autenticación, criptografía
   - SIEMPRE revisar manualmente

3. Ignorar el contexto del proyecto
   - IA puede sugerir patrones diferentes a tu codebase
   - Mantén consistencia

4. Usar para código crítico sin tests
   - Generar tests junto con el código
   - Verificar comportamiento esperado
```

---

### 7. Limitaciones

| Limitación | Impacto | Mitigación |
|------------|---------|------------|
| Código desactualizado | Versiones viejas de APIs | Verificar documentación actual |
| Sin contexto de runtime | No sabe el estado de tu app | Proporcionar logs/errores |
| Repetición de errores comunes | Código con bugs conocidos | Revisar + tests |
| Confidencialidad | Código va a servidores externos | No usar para código secreto |

---

## Resumen

```
┌─────────────────────────────────────────────────────────────────┐
│                    PUNTOS CLAVE                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. COPILOT: Mejor para completado inline mientras escribes     │
│                                                                  │
│  2. CURSOR: Mejor para cambios contextuales y multi-archivo     │
│                                                                  │
│  3. CLAUDE/CHATGPT: Mejor para diseño, explicación, debugging   │
│                                                                  │
│  4. SIEMPRE: Revisar, entender, y testear código generado       │
│                                                                  │
│  5. PROMPTS: Contexto + Tarea + Requisitos + Formato            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Siguiente Módulo

→ [02-backend-ia](../02-backend-ia/) - Desarrollo Backend con IA

---

*Módulo 01 - Asistentes de Código*
*Tier 1 - Desarrollo de Software*
