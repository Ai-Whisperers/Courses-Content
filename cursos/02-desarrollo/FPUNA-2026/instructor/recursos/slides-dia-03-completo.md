# SLIDES - Día 3: IA para Aeronáutica
## 10 Slides | ~20 min | Luego: Práctica guiada por Iván

**Fecha:** Miércoles 4 de Febrero, 2026
**Audiencia:** Ingeniería Aeronáutica
**Propósito:** Bienvenida, conceptos de IA aplicada a cálculos y diseño aeronáutico
**Pre-requisito:** Setup completado antes de clase (ver README)
**Después de slides:** Iván guía la práctica en vivo

---

## SLIDE 1: BIENVENIDA DÍA 3
**Tiempo: 1 minuto**

```
+----------------------------------------------------------+
|                                                          |
|                     DÍA 3                                |
|                                                          |
|         IA PARA AERONÁUTICA                              |
|         Cálculos y Diseño Asistido                       |
|                                                          |
|     -----------------------------------------            |
|                                                          |
|              FPUNA VERANO 2026                           |
|                                                          |
|     Audiencia: Ingeniería Aeronáutica                    |
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
|  • ¿En qué área de aero te querés especializar?          |
|  • ¿Qué software de análisis usás?                       |
|  • ¿Qué cálculo te gustaría automatizar?                 |
|                                                          |
+----------------------------------------------------------+
```

**Nota para presentador:** Mostrar resultados del Menti en vivo.

---

## SLIDE 3: ¿QUÉ PUEDEN HACER CON IA EN AERONÁUTICA?
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         IA + AERONÁUTICA                                 |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |  • Cálculos aerodinámicos (Reynolds, Lift, Drag)  |  |
|  |                                                    |  |
|  |  • Análisis de perfiles NACA                      |  |
|  |  • Sizing preliminar de UAVs/drones               |  |
|  |  • Generar scripts Python para análisis           |  |
|  |  • Crear documentación técnica                    |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|  Boeing, Airbus, NASA ya usan IA en sus workflows        |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 4: IA COMO CALCULADORA INTELIGENTE
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         CÁLCULOS EXPLICADOS PASO A PASO                  |
|                                                          |
|  ANTES (sin IA):                                         |
|  +----------------------------------------------------+  |
|  |  Fórmula -> Buscar valores en tablas ->           |  |
|  |  Calcular -> ¿Hice bien? -> Revisar unidades...   |  |
|  +----------------------------------------------------+  |
|                                                          |
|  AHORA (con IA):                                         |
|  +----------------------------------------------------+  |
|  |  "Calcula el número de Reynolds para:             |  |
|  |   - Cuerda: 1.5m                                  |  |
|  |   - Velocidad: 50 m/s                             |  |
|  |   - Altitud: nivel del mar                        |  |
|  |   Explica cada paso y verifica unidades"          |  |
|  +----------------------------------------------------+  |
|                                                          |
|  IA muestra el procedimiento completo + verificación     |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 5: PERFILES ALARES CON IA
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         ANÁLISIS DE PERFILES NACA                        |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |  "Dame información del perfil NACA 2412:          |  |
|  |   - Características geométricas                   |  |
|  |   - Coeficientes Cl, Cd típicos                   |  |
|  |   - Aplicaciones comunes                          |  |
|  |   - Genera código Python para graficarlo"         |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  LA IA PUEDE:                                     |  |
|  |                                                    |  |
|  |  • Comparar perfiles (NACA 0012 vs 2412)          |  |
|  |  • Recomendar perfiles según aplicación           |  |
|  |  • Generar gráficos de polar de arrastre          |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 6: WORKFLOW: IDEA -> SCRIPT -> GRÁFICO
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         CICLO DE TRABAJO EN AERONÁUTICA                  |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |  1. PROBLEMA: "Necesito calcular sustentación     |  |
|  |     para un ala de 10m² a 200 km/h"               |  |
|  |                                                    |  |
|  |  2. PROMPT: Describir a OpenCode                  |  |
|  |                                                    |  |
|  |  3. CÓDIGO: IA genera script Python               |  |
|  |                                                    |  |
|  |  4. EJECUTAR: Correr en Google Colab/local        |  |
|  |                                                    |  |
|  |  5. ITERAR: "Ahora varía la velocidad de          |  |
|  |     100 a 300 km/h y grafica"                     |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|  Del problema al gráfico en MINUTOS                      |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 7: EJEMPLO REAL
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         DE FÓRMULA A ANÁLISIS COMPLETO                   |
|                                                          |
|  +----------------------------------------------------+  |
|  |  PROMPT:                                          |  |
|  |                                                    |  |
|  |  "Soy estudiante de aeronáutica. Genera un        |  |
|  |   script Python que:                              |  |
|  |   - Calcule sustentación y arrastre              |  |
|  |   - Para un ala con perfil NACA 2412              |  |
|  |   - Área: 15m², velocidades de 50-150 m/s         |  |
|  |   - Grafique L/D vs velocidad                     |  |
|  |   Incluye comentarios explicando las fórmulas."   |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  RESULTADO:                                       |  |
|  |                                                    |  |
|  |  Script completo + gráficos + explicaciones       |  |
|  |  Listo para usar en tu tesis o proyecto           |  |
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
|         GUÍA DEL DÍA 3                                   |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |  github.com/Ai-Whisperers/Courses-Content/        |  |
|  |  tree/main/cursos/02-development/FPUNA-2026      |  |
|  |                                                    |  |
|  |  Carpeta: dias/dia-03-aeronautica/                |  |
|  |                                                    |  |
|  |  Contenido:                                       |  |
|  |  • Ejercicios de cálculos                         |  |
|  |  • Scripts de perfiles NACA                       |  |
|  |  • Sizing de UAV                                  |  |
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
|  |  1. Calcular Reynolds con OpenCode                |  |
|  |  2. Analizar perfil NACA 2412                     |  |
|  |  3. Generar scripts Python de análisis            |  |
|  |  4. Sizing preliminar de un dron                  |  |
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
|  |  • Mañana: Día 4 - IA para Software               |  |
|  |  • Usá IA para tus cálculos de la facultad        |  |
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

*Slides Intro Día 3 - ~18 minutos (sin Q&A)*
*Luego: Iván guía la práctica en vivo*
*Al final: Q&A con Slide 10*

