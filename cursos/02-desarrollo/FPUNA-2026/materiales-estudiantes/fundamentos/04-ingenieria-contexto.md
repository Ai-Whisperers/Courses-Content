# Módulo 04: Ingeniería de Contexto con OpenCode

## El Arte de la Memoria Sistémica

**Objetivo**: Transformar tu código en un ecosistema que se explica a sí mismo. Aprenderás por qué el contexto es el combustible real de la IA y cómo construir una "Memoria Maestra" que elimine el 90% de las alucinaciones y errores lógicos.

---

## ¿Por qué es Vital la Ingeniería de Contexto?

Sin un contexto sólido, incluso el modelo más avanzado (como Gemini 1.5 Pro o Claude 3.5) operará en un vacío informativo. Esto provoca tres problemas críticos:

1.  **Amnesia Estructural**: La IA sugiere soluciones que rompen tu arquitectura actual porque no sabe que existe.
2.  **Inconsistencia de Estilo**: Un archivo usa `camelCase`, el otro `snake_case`, y la IA mezcla ambos.
3.  **Alucinaciones Técnicas**: Al no conocer tus dependencias reales, la IA inventa librerías o métodos que no tienes instalados.

> **La Regla de Oro**: La inteligencia de la IA es directamente proporcional a la calidad del contexto que le proporcionas. Una IA con buen contexto es un **Socio Senior**; sin contexto, es un **Becario entusiasta pero peligroso**.

---

## El Ecosistema de Memoria en OpenCode

OpenCode utiliza un sistema de capas para absorber la realidad de tu proyecto:

| Nivel de Contexto | Ubicación Técnica         | Impacto en el Razonamiento                                            |
| :---------------- | :------------------------ | :-------------------------------------------------------------------- |
| **Global**        | `~/.opencode/config.json` | Define la "personalidad" base y el lenguaje del agente.               |
| **Técnico**       | `.opencode` (Config)      | Controla el "Hardware Mental" (modelo, temperatura, archivos a leer). |
| **Operativo**     | `CLAUDE.md`               | Es la "Constitución" del proyecto: reglas, comandos y estándares.     |

---

## Estrategias para un Contexto Elite

Para que OpenCode trabaje al nivel de un Lead Architect, aplica estas estrategias:

### 1. La Constitución del Proyecto (`CLAUDE.md`)

No permitas que la IA "adivine" cómo quieres el código. Documéntalo. Un buen `CLAUDE.md` ahorra horas de correcciones.

### 2. El Indexado Selectivo (`.opencode`)

Usa el campo `context_files` para obligar a OpenCode a leer siempre los archivos de definición de tipos (`.ts`, `.d.ts`) o esquemas de base de datos. Si la IA conoce tus tipos, no cometerá errores de sintaxis.

### 3. Nomenclatura como Documentación

Si tus carpetas se llaman `src`, `tests`, `docs`, OpenCode ya sabe qué esperar. El **Contexto Implícito** (buena estructura) es tan poderoso como el explícito.

---

## Delegación: Generar tu Memoria Maestra

Usa este Prompt Maestro para que OpenCode analice tu trabajo actual y se auto-imponga reglas de calidad.

> **Prompt Maestro de OpenCode:**
> "OpenCode, actúa como un **Systems Architect**. Realiza un escaneo profundo de este repositorio y detecta:
>
> 1. Patrones de diseño predominantes.
> 2. Reglas de nomenclatura y estilo.
> 3. Flujos de ejecución (build, test, deploy).
>
> Con esta información, redacta un `CLAUDE.md` exhaustivo que sirva como tu 'Memoria de Trabajo'. Debe ser lo suficientemente detallado para que cualquier otra IA que entre al proyecto sepa exactamente cómo comportarse para mantener la excelencia técnica. No hagas lo mínimo: incluye una sección de 'ANTIPATRONES' prohibidos en este repo."

---

## Master Template para CLAUDE.md (Elite)

Este es el estándar que exigimos en los proyectos de FPUNA:

```markdown
# Memoria de Trabajo: [Nombre del Proyecto]

## 🎯 Visión y Propósito

[Explica el 'PARA QUÉ' del proyecto. Ayuda a la IA a tomar decisiones de negocio.]

## 🛠️ Stack Tecnológico

- **Runtime**: [Node v20, Python 3.11, etc.]
- **Core**: [React, FastAPI, Express]
- **Storage**: [PostgreSQL con Prisma, Redis]

## 🏗️ Guía de Arquitectura

[Describe cómo se conectan las piezas. Ej: Arquitectura Hexagonal, MVC, etc.]

- `src/domain`: Lógica pura de negocio.
- `src/infra`: Implementaciones de DB y APIs externas.

## 📜 Reglas de Oro (HACER / EVITAR)

- ✅ USAR: Typescript estricto y validación con Zod.
- ✅ ESCRIBIR: Comentarios en JSDoc para funciones públicas.
- ❌ EVITAR: El uso de 'any' y lógica de DB en los controladores.

## 🚀 Comandos Críticos

- `npm run dev`: Inicia el entorno de desarrollo.
- `npm test`: Ejecuta la suite de Jest.
- `opencode status`: Verifica la salud del agente IA.
```

---

## Verificación de Integridad

Una vez que tu contexto esté listo, desafía a OpenCode:

```bash
opencode "Analiza nuestro archivo de autenticación. ¿Cumple con las 'Reglas de Oro' definidas en nuestro CLAUDE.md? Si no, propón la refactorización necesaria."
```

Si la IA detecta infracciones basándose en tu documentación, **has logrado Ingeniería de Contexto de nivel profesional.**

---

## Próximo Paso: El Desafío Final

[Módulo 05: Proyecto en Vivo](./05-proyecto-en-vivo.md)
