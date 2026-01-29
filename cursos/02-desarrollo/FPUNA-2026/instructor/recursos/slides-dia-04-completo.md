# SLIDES - Día 4: IA para Software
## 10 Slides | ~20 min | Luego: Práctica guiada por Iván

**Fecha:** Jueves 5 de Febrero, 2026
**Audiencia:** Ing. Informática, Desarrollo de Software
**Propósito:** Bienvenida, conceptos de IA aplicada al desarrollo de software
**Pre-requisito:** Setup completado antes de clase (ver README)
**Después de slides:** Iván guía la práctica en vivo

---

## SLIDE 1: BIENVENIDA DÍA 4
**Tiempo: 1 minuto**

```
+----------------------------------------------------------+
|                                                          |
|                     DÍA 4                                |
|                                                          |
|         IA PARA DESARROLLO                               |
|         DE SOFTWARE                                      |
|                                                          |
|     -----------------------------------------            |
|                                                          |
|              FPUNA VERANO 2026                           |
|                                                          |
|     Audiencia: Informática | Desarrollo                  |
|                                                          |
+----------------------------------------------------------+
```

**Nota para presentador:** Breve recapitulación de días anteriores si es necesario.

---

## SLIDE 2: ¡QUEREMOS CONOCERLOS!
**Tiempo: 3-4 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         CUÉNTANOS SOBRE VOS                              |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |              ESCANEA EL QR                         |  |
|  |                                                    |  |
|  |         +------------------------+                 |  |
|  |         |                        |                 |  |
|  |         |       [QR CODE]        |                 |  |
|  |         |        MENTI           |                 |  |
|  |         |                        |                 |  |
|  |         +------------------------+                 |  |
|  |                                                    |  |
|  |         o ingresa a: menti.com                     |  |
|  |         código: XXXXXX                             |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|  Vamos a preguntarles:                                   |
|  • ¿Qué lenguaje usás más?                               |
|  • ¿Ya usaste Copilot u otra IA para código?             |
|  • ¿Qué parte del desarrollo te lleva más tiempo?        |
|                                                          |
+----------------------------------------------------------+
```

**Nota para presentador:** Mostrar resultados del Menti en vivo.

---

## SLIDE 3: ¿QUÉ PUEDEN HACER CON IA EN SOFTWARE?
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         IA + DESARROLLO DE SOFTWARE                      |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |  • Generar código funcional desde descripción     |  |
|  |                                                    |  |
|  |  • Debuggear errores complejos                    |  |
|  |  • Escribir tests automáticamente                 |  |
|  |  • Refactorizar código legacy                     |  |
|  |  • Documentar proyectos completos                 |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|  GitHub Copilot, Cursor, Aider... todos usan IA          |
|  Ustedes van a usar OpenCode directamente                |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 4: ITERACIONES EN DÍAS, NO MESES
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         EL CAMBIO MÁS GRANDE                             |
|                                                          |
|  ANTES (desarrollo tradicional):                         |
|  +----------------------------------------------------+  |
|  |  Idea -> Diseño -> Desarrollo -> Testing -> Deploy|  |
|  |                                                    |  |
|  |  Una iteración = 2-4 SEMANAS                      |  |
|  +----------------------------------------------------+  |
|                                                          |
|  AHORA (con IA):                                         |
|  +----------------------------------------------------+  |
|  |  Idea -> Prompt -> Código -> Iterar -> Refinar    |  |
|  |                                                    |  |
|  |  Una iteración = HORAS                            |  |
|  |                                                    |  |
|  |  Puedes probar 10 enfoques diferentes             |  |
|  |  en el tiempo que antes tomaba 1                  |  |
|  +----------------------------------------------------+  |
|                                                          |
|  El costo de experimentar bajó drásticamente             |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 5: ¿QUÉ ES TDD CON IA?
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         TDD = TEST DRIVEN DEVELOPMENT                    |
|                                                          |
|  +----------------------------------------------------+  |
|  |  WORKFLOW TRADICIONAL:                            |  |
|  |  Código -> Tests (a veces) -> Bugs                |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  WORKFLOW CON IA:                                 |  |
|  |                                                    |  |
|  |  1. "Genera tests para una función que            |  |
|  |      valide emails"                               |  |
|  |                                                    |  |
|  |  2. IA genera tests primero                       |  |
|  |                                                    |  |
|  |  3. "Ahora genera la función que pase            |  |
|  |      esos tests"                                  |  |
|  |                                                    |  |
|  |  4. Tests pasan = función correcta                |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 6: REFACTORING CON IA
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         MEJORAR CÓDIGO EXISTENTE                         |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |  "Refactoriza este código aplicando:              |  |
|  |   - Principio de responsabilidad única            |  |
|  |   - Nombres más descriptivos                      |  |
|  |   - Extrae funciones donde sea necesario"         |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  TAMBIÉN PUEDE:                                   |  |
|  |                                                    |  |
|  |  • Revisar código por seguridad                   |  |
|  |  • Sugerir mejoras de performance                 |  |
|  |  • Convertir entre lenguajes (Python -> JS)       |  |
|  |  • Agregar tipos (JavaScript -> TypeScript)       |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 7: EJEMPLO REAL
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         DE DESCRIPCIÓN A API COMPLETA                    |
|                                                          |
|  +----------------------------------------------------+  |
|  |  PROMPT:                                          |  |
|  |                                                    |  |
|  |  "Crea una API REST en Node.js/Express con:       |  |
|  |   - CRUD de usuarios                              |  |
|  |   - Autenticación JWT                             |  |
|  |   - Validación de inputs                          |  |
|  |   - Manejo de errores consistente                 |  |
|  |   Incluye tests con Jest."                        |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  RESULTADO:                                       |  |
|  |                                                    |  |
|  |  Estructura de proyecto + código + tests          |  |
|  |  Base funcional en minutos, no días               |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 8: GUÍA DE TRABAJO
**Tiempo: 1 minuto**

```
+----------------------------------------------------------+
|                                                          |
|         GUÍA DEL DÍA 4                                   |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |  github.com/Ai-Whisperers/Courses-Content/        |  |
|  |  tree/main/cursos/02-development/FPUNA-2026      |  |
|  |                                                    |  |
|  |  Carpeta: dias/dia-04-software/                   |  |
|  |                                                    |  |
|  |  Contenido:                                       |  |
|  |  • Ejercicios de generación de código             |  |
|  |  • Debugging asistido                             |  |
|  |  • Testing con IA                                 |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  [QR CODE]                                        |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 9: ¡VAMOS A LA PRÁCTICA!
**Tiempo: 30 segundos**

```
+----------------------------------------------------------+
|                                                          |
|                                                          |
|         AHORA: PRÁCTICA GUIADA                           |
|                                                          |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |  Iván va a compartir su pantalla                  |  |
|  |                                                    |  |
|  |  Lo que van a hacer:                              |  |
|  |                                                    |  |
|  |  1. Generar API REST con OpenCode                 |  |
|  |  2. Debuggear código con errores                  |  |
|  |  3. Generar tests automáticamente                 |  |
|  |  4. Refactorizar código legacy                    |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|                                                          |
|         Abran la guía en GitHub y sigan a Iván           |
|                                                          |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 10: ¡GRACIAS! - PREGUNTAS
**Tiempo: Variable (después de la práctica de Iván)**

```
+----------------------------------------------------------+
|                                                          |
|                                                          |
|                    ¡GRACIAS!                             |
|                                                          |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |              ¿PREGUNTAS?                           |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |  Recordá:                                         |  |
|  |                                                    |  |
|  |  • La guía está en GitHub                         |  |
|  |  • Mañana: Día 5 - IA para Marketing              |  |
|  |  • Usá IA en tu próximo proyecto personal         |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|                                                          |
|              FPUNA VERANO 2026                           |
|                                                          |
|                                                          |
+----------------------------------------------------------+
```

**Nota para presentador:** Esta slide se muestra DESPUÉS de que Iván termine la práctica guiada.

---

*Slides Intro Día 4 - ~18 minutos (sin Q&A)*
*Luego: Iván guía la práctica en vivo*
*Al final: Q&A con Slide 10*

