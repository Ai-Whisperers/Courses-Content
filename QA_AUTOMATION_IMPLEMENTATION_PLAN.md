# Plan de Implementación: Corrección QA Automation

## FASE 1: Reestructuración de Carpetas y Nombres (Prioridad P0)

### 1.1 Renombrar Carpetas de Módulos
```bash
# Cambiar nombres a convención consistente en inglés
mv 01-playwright-avanzado 01-playwright-advanced
mv 02-pruebas-api 02-api-testing
mv 03-arquitectura-pruebas 03-test-architecture
mv 04-integracion-ci-cd 04-ci-cd-integration
mv 05-ia-para-qa 05-ai-for-qa
```

**Razonamiento:** Los términos técnicos en inglés son estándar en la industria QA/Testing. Los estudiantes FPUNA necesitan familiaridad con estos términos para el mercado laboral (Softtek, Global Logic, Aruma, etc. usan inglés técnico).

---

### 1.2 Estandarizar Nombres de Archivos

**Archivos de Tutorial (cambiar a kebab-case):**
```bash
# En cada módulo, dentro de tutorials/
# Renombrar de Pascal_Snake a kebab-case

# Módulo 01
cd 01-playwright-advanced/tutorials/
mv 01_Network_Interception.md 01-network-interception.md
mv 02_Visual_Regression.md 02-visual-regression.md
mv 03_Complex_Components.md 03-complex-components.md
mv 04_Authentication.md 04-authentication.md
mv 05_Performance.md 05-performance.md

# Módulo 02
cd 02-api-testing/tutorials/
mv 01_REST_API_Basics.md 01-rest-api-basics.md
mv 02_Schema_Validation_Zod.md 02-schema-validation.md
mv 03_Contract_Testing.md 03-contract-testing.md
mv 04_Performance_Testing.md 04-performance-testing.md
mv 05_API_Mocking.md 05-api-mocking.md

# Módulo 03
cd 03-test-architecture/tutorials/
mv 01_Page_Object_Model.md 01-page-object-model.md
mv 02_Custom_Fixtures_Helpers.md 02-custom-fixtures.md
mv 03_Test_Data_Management.md 03-test-data-management.md
mv 04_Multi_Environment_Config.md 04-multi-environment-config.md
mv 05_Parallelization_Performance.md 05-parallelization.md

# Módulo 04
cd 04-ci-cd-integration/tutorials/
mv 01_GitHub_Actions_Setup.md 01-github-actions-setup.md
mv 02_Professional_Reporting.md 02-professional-reporting.md
mv 03_Test_Sharding.md 03-test-sharding.md
mv 04_Notifications.md 04-notifications.md
mv 05_Advanced_Workflows.md 05-advanced-workflows.md

# Módulo 05
cd 05-ai-for-qa/tutorials/
mv 01_AI_Test_Generation.md 01-ai-test-generation.md
mv 02_AI_Test_Data_Generation.md 02-ai-test-data-generation.md
mv 03_AI_Debugging_Analysis.md 03-ai-debugging.md
mv 04_Visual_Testing_AI.md 04-visual-testing-ai.md
mv 05_Test_Maintenance_AI.md 05-test-maintenance-ai.md
```

---

## FASE 2: Crear Archivos Faltantes (Prioridad P0)

### 2.1 Crear EXERCISE.md para cada módulo

**Template EXERCISE.md:**
```markdown
# Ejercicio Práctico: [Nombre del Módulo]

## 🎯 Objetivo del Ejercicio
[Descripción clara de qué debe lograr el estudiante]

## 📋 Requisitos Previos
- [ ] Tener instalado Node.js v18+
- [ ] Tener instalado Playwright
- [ ] Completar la lectura del README.md de este módulo

## 🏗️ Proyecto a Desarrollar

### Descripción
[Descripción detallada del proyecto práctico]

### Especificaciones Técnicas
- **Framework:** Playwright + TypeScript
- **Aplicación de prueba:** [URL de la app demo]
- **Tiempo estimado:** [X horas]
- **Dificultad:** [Fácil/Media/Difícil]

## 📝 Tareas a Completar

### Tarea 1: [Nombre descriptivo]
**Descripción:** [Qué debe hacer]
**Criterios de éxito:**
- [ ] [Criterio 1]
- [ ] [Criterio 2]
- [ ] [Criterio 3]

**Pistas:**
- [Pista 1]
- [Pista 2]

### Tarea 2: [Nombre descriptivo]
...

## ✅ Checklist de Entrega

- [ ] Código en repositorio GitHub personal
- [ ] Tests ejecutan sin errores (`npx playwright test`)
- [ ] Cobertura mínima: [X]%
- [ ] README.md con instrucciones de ejecución
- [ ] Screenshots de resultados

## 🎓 Criterios de Evaluación

| Criterio | Peso | Descripción |
|----------|------|-------------|
| Funcionalidad | 40% | Los tests funcionan correctamente |
| Arquitectura | 30% | Uso de POM, fixtures, buenas prácticas |
| Documentación | 20% | Código comentado y README claro |
| Originalidad | 10% | Soluciones creativas o extras |

## 🆘 Recursos de Ayuda

- 📚 [Tutorial 01](../tutorials/01-tutorial.md)
- 🤖 [Prompt de IA](../examples/01-prompt.md)
- 💬 Slack: #qa-automation-2026

## ⏰ Fecha de Entrega
[Viernes de la semana del módulo, 23:59 PY]
```

**Ubicaciones:**
- `01-playwright-advanced/EXERCISE.md`
- `02-api-testing/EXERCISE.md`
- `03-test-architecture/EXERCISE.md`
- `04-ci-cd-integration/EXERCISE.md`
- `05-ai-for-qa/EXERCISE.md`

---

### 2.2 Crear QUIZ.md para cada módulo

**Template QUIZ.md:**
```markdown
# Quiz de Evaluación: [Nombre del Módulo]

## 📊 Información del Quiz
- **Duración:** 30 minutos
- **Preguntas:** 15 (10 opción múltiple + 5 verdadero/falso)
- **Aprobación:** 70% (11/15 correctas)
- **Intentos permitidos:** 2

---

## 📝 Preguntas de Opción Múltiple (10 x 2 pts = 20 pts)

### Pregunta 1
[Texto de la pregunta clara y específica]

a) [Opción]  
b) [Opción]  
c) [Opción]  
d) [Opción]

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: [Letra]**

**Explicación:** [Por qué es correcta y por qué las otras no]
</details>

### Pregunta 2
...

---

## ✅ Preguntas Verdadero/Falso (5 x 2 pts = 10 pts)

### Pregunta 11
[Enunciado]

**Verdadero / Falso**

<details>
<summary>Ver respuesta</summary>

**Respuesta: [Verdadero/Falso]**

**Explicación:** [Explicación detallada]
</details>

### Pregunta 12
...

---

## 📈 Resultados

**Puntuación total: __ / 30 puntos**

| Rango | Evaluación |
|-------|------------|
| 27-30 | Excelente - Dominio completo |
| 21-26 | Bueno - Pequeñas lagunas |
| 15-20 | Regular - Necesita repasar |
| <15 | Insuficiente - Revisar módulo |

**Retroalimentación:**
- Revisa los tutoriales de las preguntas que fallaste
- Practica con el ejercicio práctico
- Consulta en Slack si tienes dudas

---

## 📚 Material de Estudio Recomendado

- [README.md](./README.md) - Conceptos teóricos
- [Tutoriales](./tutorials/) - Ejemplos prácticos
- [Recursos adicionales](../../resources/)
```

**Ubicaciones:**
- `01-playwright-advanced/QUIZ.md`
- `02-api-testing/QUIZ.md`
- `03-test-architecture/QUIZ.md`
- `04-ci-cd-integration/QUIZ.md`
- `05-ai-for-qa/QUIZ.md`

---

## FASE 3: Traducción y Consolidación (Prioridad P1)

### 3.1 Traducir Módulo 03 al Español

**Archivo:** `03-test-architecture/README.md`

**Estrategia de traducción:**
1. Traducir todo el texto explicativo al español
2. Mantener términos técnicos en inglés: `Page Object Model`, `fixtures`, `fixtures`, `scope`, etc.
3. Preservar TODO el código (TypeScript, nombres de variables, comentarios de código)
4. Agregar notas al pie para términos técnicos si es necesario

**Ejemplo de traducción:**
```markdown
# Módulo 03: Arquitectura de Pruebas

## Resumen

Construir frameworks de automatización de pruebas escalables y mantenibles requiere bases arquitectónicas sólidas. Este módulo te enseña a diseñar e implementar arquitecturas de pruebas profesionales usando patrones probados como Page Object Model, *fixtures* personalizadas y utilidades reutilizables.

---

## ¿Por Qué Importa la Arquitectura de Pruebas?

### Problemas de Mala Arquitectura
```
❌ Código duplicado entre tests
❌ Difícil de mantener cuando cambia la UI
❌ Tests frágiles que se rompen fácilmente
❌ Ejecución lenta de tests
```

### Beneficios de Buena Arquitectura
```
✅ Código DRY (Don't Repeat Yourself)
✅ Cambios en un lugar afectan todos los tests
✅ Tests resilientes que se adaptan a cambios
✅ Ejecución rápida, paralelizable
```
```

**Notas de traducción:**
- "Why Test Architecture Matters" → "¿Por Qué Importa la Arquitectura de Pruebas?"
- "Learning Objectives" → "Objetivos de Aprendizaje"
- "By the end of this module" → "Al finalizar este módulo"
- Mantener código: `export class BasePage` (no traducir)

---

### 3.2 Eliminar Archivos Duplicados

**Eliminar:**
- `03-test-architecture/README-TUTORIALS.md` ← Redundante
- `04-ci-cd-integration/README-TUTORIALS.md` ← Redundante

**Razón:** Los tutoriales ya están en `tutorials/`, no necesitan README separado.

---

### 3.3 Consolidar Contenido Redundante

**Redundancia identificada:** Network Mocking aparece en Módulo 01 y 02

**Solución:**
- Módulo 01 (Playwright Advanced): Mantener sección de Network Interception enfocada en UI
- Módulo 02 (API Testing): Reducir sección de mocking, agregar referencia:
  ```markdown
  ## API Mocking
  
  Para mocking de APIs en tests de UI, revisa [Módulo 01: Network Interception](../01-playwright-advanced/tutorials/01-network-interception.md).
  
  En este módulo nos enfocamos en testing de APIs reales usando `APIRequestContext`.
  ```

---

## FASE 4: Optimización de Contenido (Prioridad P1)

### 4.1 Estandarizar Longitud de READMEs

**Objetivo:** 400-500 líneas por README principal

**Acciones:**
1. Módulo 02 (actualmente ~1000 líneas): Dividir contenido extenso
   - Mover código TypeScript largo a tutoriales
   - Mantener en README solo introducción y ejemplos clave
2. Módulo 04 (actualmente ~600 líneas): Condensar secciones redundantes

### 4.2 Mover Código Extenso a Tutoriales

**Ejemplo de refactorización:**

**Antes (en README.md):**
```markdown
### Ejemplo: Login con Page Object

```typescript
// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Login' });
  }
  
  async goto() {
    await this.page.goto('/login');
  }
  
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

[50 líneas más de código...]
```

**Después (en README.md):**
```markdown
### Ejemplo: Login con Page Object

El patrón Page Object Model encapsula la interacción con la UI:

```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}
  
  async login(email: string, password: string) {
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
```

📚 **Ver implementación completa:** [Tutorial 01](../tutorials/01-page-object-model.md)
```

---

## FASE 5: Mejoras Pedagógicas (Prioridad P2)

### 5.1 Estandarizar Objetivos de Aprendizaje

**Formato estándar para todos los módulos:**
```markdown
## Objetivos de Aprendizaje

Al completar este módulo, serás capaz de:

1. ✅ **Implementar** [técnica/especificidad] - [resultado medible]
2. ✅ **Crear** [artefacto] - [características/calidad]
3. ✅ **Configurar** [sistema/herramienta] - [contexto/uso]
4. ✅ **Aplicar** [patrón/metodología] - [escenario/caso de uso]
5. ✅ **Optimizar** [proceso/código] - [métrica/mejora]
```

**Ejemplo Módulo 01:**
```markdown
## Objetivos de Aprendizaje

Al completar este módulo, serás capaz de:

1. ✅ **Implementar** network interception y API mocking - para tests aislados y deterministas
2. ✅ **Crear** visual regression tests - para detectar cambios visuales no intencionales
3. ✅ **Configurar** autenticación con storage state - para test suites eficientes
4. ✅ **Aplicar** técnicas de paralelización - para reducir tiempo de ejecución 4x
5. ✅ **Optimizar** performance de tests - logrando ejecución < 100ms por test
```

---

### 5.2 Agregar Referencias Cruzadas

**Al inicio de cada README.md, agregar:**
```markdown
---

## 📚 Información del Módulo

**Duración:** 4 horas  
**Nivel:** Intermedio  
**Prerrequisitos:**
- ✅ Módulo 01: Playwright Advanced (conceptos básicos)
- ✅ JavaScript/TypeScript intermedio
- ✅ Git y GitHub básico

**Relacionado con:**
- 🔧 [Módulo 03: Arquitectura](../03-test-architecture/) - Para organizar tus tests
- 🚀 [Módulo 04: CI/CD](../04-ci-cd-integration/) - Para automatizar la ejecución

---
```

---

## FASE 6: Validación (Prioridad P3)

### 6.1 Checklist de Validación

**Estructura:**
- [ ] Todos los módulos renombrados consistentemente
- [ ] Todos los archivos de tutorial en kebab-case
- [ ] Archivos `README-TUTORIALS.md` eliminados
- [ ] `EXERCISE.md` y `QUIZ.md` creados en cada módulo

**Contenido:**
- [ ] Módulo 03 completamente en español
- [ ] Longitud de READMEs entre 400-500 líneas
- [ ] Código extenso movido a tutoriales
- [ ] Redundancias eliminadas
- [ ] Referencias cruzadas agregadas

**Calidad:**
- [ ] Todos los diagramas Mermaid validados
- [ ] URLs de ejemplo marcadas como ficticias o reemplazadas por reales
- [ ] Ortografía revisada (español neutro)
- [ ] Términos técnicos consistentes

---

## 📊 Estimación de Esfuerzo

| Fase | Tareas | Esfuerzo Estimado | Responsable |
|------|--------|-------------------|-------------|
| Fase 1 | Renombrar carpetas y archivos | 2 horas | Sisyphus |
| Fase 2 | Crear EXERCISE.md (5 módulos) | 5 horas | Sisyphus |
| Fase 2 | Crear QUIZ.md (5 módulos) | 3 horas | Sisyphus |
| Fase 3 | Traducir Módulo 03 | 4 horas | Sisyphus |
| Fase 3 | Eliminar duplicados | 1 hora | Sisyphus |
| Fase 4 | Consolidar contenido | 4 horas | Sisyphus |
| Fase 5 | Mejoras pedagógicas | 3 horas | Sisyphus |
| Fase 6 | Validación | 2 horas | Sisyphus |
| **TOTAL** | | **24 horas** | |

---

## 🎯 Entregables

1. **Estructura de carpetas renombrada** y estandarizada
2. **10 archivos nuevos creados** (5 EXERCISE.md + 5 QUIZ.md)
3. **Módulo 03 traducido** completamente al español
4. **Contenido consolidado** sin redundancias
5. **Archivo de análisis** documentando todos los cambios

---

## ✅ Criterios de Aceptación

- [ ] Todos los nombres de carpetas siguen convención kebab-case en inglés
- [ ] Todos los nombres de archivos en minúsculas con guiones
- [ ] Cada módulo tiene: README.md, EXERCISE.md, QUIZ.md
- [ ] Cada módulo tiene carpetas: tutorials/, examples/
- [ ] Contenido del Módulo 03 100% en español
- [ ] READMEs principales tienen 400-500 líneas máximo
- [ ] Referencias cruzadas funcionan correctamente
- [ ] No hay archivos duplicados
- [ ] Todos los enlaces internos son válidos

---

*Plan generado: Enero 2026*  
*Analista: Sisyphus - OhMyOpenCode*
