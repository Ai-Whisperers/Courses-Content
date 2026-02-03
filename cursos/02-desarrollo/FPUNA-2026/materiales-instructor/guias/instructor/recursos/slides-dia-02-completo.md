# SLIDES - Día 2: IA para Electrónica
## 10 Slides | ~20 min | Luego: Práctica guiada por Iván

**Fecha:** Martes 3 de Febrero, 2026
**Audiencia:** Ing. Electrónica, Mecatrónica, Automatización
**Propósito:** Bienvenida, conceptos de IA aplicada a electrónica
**Pre-requisito:** Setup completado antes de clase (ver README)
**Después de slides:** Iván guía la práctica en vivo

---

## SLIDE 1: BIENVENIDA DÍA 2
**Tiempo: 1 minuto**

```
+----------------------------------------------------------+
|                                                          |
|                     DÍA 2                                |
|                                                          |
|         IA PARA ELECTRÓNICA                              |
|         Y AUTOMATIZACIÓN                                 |
|                                                          |
|     -----------------------------------------            |
|                                                          |
|              FPUNA VERANO 2026                           |
|                                                          |
|     Audiencia: Electrónica | Mecatrónica                 |
|                                                          |
+----------------------------------------------------------+
```

**Nota para presentador:** Breve recapitulación del Día 1 si es necesario.

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
|  • ¿Con qué microcontrolador trabajás más?               |
|  • ¿Qué proyecto te gustaría hacer con IA?               |
|  • ¿Qué esperás aprender hoy?                            |
|                                                          |
+----------------------------------------------------------+
```

**Nota para presentador:** Mostrar resultados del Menti en vivo.

---

## SLIDE 3: ¿QUÉ PUEDEN HACER CON IA EN ELECTRÓNICA?
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         IA + ELECTRÓNICA                                 |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |  • Generar código Arduino/ESP32 desde cero        |  |
|  |                                                    |  |
|  |  • Entender datasheets complejos                  |  |
|  |  • Calcular valores de componentes                |  |
|  |  • Debuggear errores de compilación               |  |
|  |  • Diseñar lógica de automatización               |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|  Hoy van a hacer TODO esto con OpenCode                  |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 4: ¿QUÉ ES DEBUGGING CON IA?
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         DEBUGGING = ENCONTRAR Y ARREGLAR ERRORES         |
|                                                          |
|  ANTES (sin IA):                                         |
|  +----------------------------------------------------+  |
|  |  Error -> Google -> Stack Overflow -> Probar ->   |  |
|  |  No funciona -> Repetir... (horas/días)           |  |
|  +----------------------------------------------------+  |
|                                                          |
|  AHORA (con IA):                                         |
|  +----------------------------------------------------+  |
|  |  Error -> Pegar código + error en OpenCode ->     |  |
|  |  "¿Por qué falla?" -> Solución explicada          |  |
|  |  (minutos)                                        |  |
|  +----------------------------------------------------+  |
|                                                          |
|  CLAVE: Dar contexto completo                            |
|  • Código que falla                                      |
|  • Mensaje de error exacto                               |
|  • Qué esperabas vs qué pasó                             |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 5: DATASHEETS CON IA
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         IA PARA INTERPRETAR DATASHEETS                   |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |  En vez de leer 50 páginas de un datasheet:       |  |
|  |                                                    |  |
|  |  "Tengo el sensor DHT11. Dime:                    |  |
|  |   - Voltaje de operación                          |  |
|  |   - Cómo conectarlo a Arduino                     |  |
|  |   - Código de ejemplo"                            |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  TAMBIÉN PUEDE:                                   |  |
|  |                                                    |  |
|  |  • Calcular resistencias para LEDs                |  |
|  |  • Verificar compatibilidad 3.3V vs 5V            |  |
|  |  • Generar listas de componentes (BOM)            |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 6: WORKFLOW EN ELECTRÓNICA
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         CICLO DE TRABAJO CON IA                          |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |  1. DESCRIBIR: "Quiero leer temperatura con       |  |
|  |     LM35 y mostrar en LCD"                        |  |
|  |                                                    |  |
|  |  2. GENERAR: OpenCode genera el código            |  |
|  |                                                    |  |
|  |  3. COMPILAR: Probar en Arduino IDE               |  |
|  |                                                    |  |
|  |  4. ITERAR: "Agrega alarma si supera 30°C"        |  |
|  |                                                    |  |
|  |  5. REFINAR: "El LED parpadea muy rápido,         |  |
|  |     cambia el delay a 500ms"                      |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
|  Múltiples iteraciones en MINUTOS, no días               |
|                                                          |
+----------------------------------------------------------+
```

---

## SLIDE 7: EJEMPLO REAL
**Tiempo: 2 minutos**

```
+----------------------------------------------------------+
|                                                          |
|         DE IDEA A CÓDIGO EN 1 PROMPT                     |
|                                                          |
|  +----------------------------------------------------+  |
|  |  PROMPT:                                          |  |
|  |                                                    |  |
|  |  "Soy estudiante de electrónica. Genera código    |  |
|  |   Arduino para:                                   |  |
|  |   - Leer sensor de temperatura LM35 en pin A0    |  |
|  |   - Mostrar valor en LCD 16x2 (I2C)              |  |
|  |   - Encender LED rojo si supera 30°C             |  |
|  |   Incluye comentarios en español."               |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  |  RESULTADO:                                       |  |
|  |                                                    |  |
|  |  Código completo + explicación + conexiones       |  |
|  |  En menos de 30 segundos                          |  |
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
|         GUÍA DEL DÍA 2                                   |
|                                                          |
|  +----------------------------------------------------+  |
|  |                                                    |  |
|  |  github.com/Ai-Whisperers/Courses-Content/        |  |
|  |  tree/main/cursos/02-desarrollo/FPUNA-2026      |  |
|  |                                                    |  |
|  |  Carpeta: dias/dia-02-electronica/                |  |
|  |                                                    |  |
|  |  Contenido:                                       |  |
|  |  • Ejercicios de Arduino                          |  |
|  |  • Prompts para datasheets                        |  |
|  |  • Proyectos de automatización                    |  |
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
|  |  1. Generar código Arduino con OpenCode           |  |
|  |  2. Debuggear un código con errores               |  |
|  |  3. Interpretar un datasheet                      |  |
|  |  4. Diseñar sistema de automatización             |  |
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
|  |  • Mañana: Día 3 - IA para Aeronáutica            |  |
|  |  • Practicá debuggeando tu código con IA          |  |
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

*Slides Intro Día 2 - ~18 minutos (sin Q&A)*
*Luego: Iván guía la práctica en vivo*
*Al final: Q&A con Slide 10*

