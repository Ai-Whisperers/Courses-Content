# Quiz - Módulo 05
## IA para Programación de PLCs

**Duración:** 10 minutos
**Puntos totales:** 100 (10 puntos cada pregunta)

---

### Pregunta 1

Al solicitar código Ladder a la IA, ¿cuál estructura de prompt es más efectiva?

- A) "Dame código para un motor"
- B) PLC + Entradas + Salidas + Lógica detallada + Formato deseado
- C) Solo la lista de I/O
- D) "Programa completo"

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) PLC + Entradas + Salidas + Lógica detallada + Formato deseado**

Un prompt efectivo incluye: modelo de PLC (para sintaxis correcta), lista completa de I/O con direcciones, descripción detallada de la lógica requerida, y formato de salida (Ladder ASCII, comentarios en español). Esto produce código más preciso y utilizable.
</details>

---

### Pregunta 2

En representación Ladder ASCII, ¿qué símbolo representa un contacto normalmente cerrado (NC)?

- A) ─┤ ├─
- B) ─┤/├─
- C) ─( )─
- D) ─[S]─

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) ─┤/├─**

En Ladder ASCII: ─┤ ├─ es contacto NA (normalmente abierto), ─┤/├─ es contacto NC (normalmente cerrado con la barra diagonal indicando inversión), ─( )─ es bobina de salida, y ─[S]─ podría representar un set.
</details>

---

### Pregunta 3

¿Cuál lenguaje IEC 61131-3 es más apropiado para implementar un algoritmo PID con IA?

- A) Ladder (LD)
- B) Structured Text (ST)
- C) Instruction List (IL)
- D) Sequential Function Chart (SFC)

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Structured Text (ST)**

Structured Text es similar a Pascal/C y es ideal para cálculos matemáticos complejos como PID. Permite declarar tipos de datos (STRUCT), usar operaciones matemáticas, y crear funciones reutilizables. Ladder es menos intuitivo para algoritmos matemáticos.
</details>

---

### Pregunta 4

Al generar código PLC con IA, ¿qué elemento de seguridad es crítico verificar?

- A) El número de comentarios
- B) Que el botón de emergencia tenga prioridad absoluta y sea fail-safe
- C) El color de las lámparas
- D) La longitud del código

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Que el botón de emergencia tenga prioridad absoluta y sea fail-safe**

La seguridad industrial requiere que la parada de emergencia: sea NC (normalmente cerrado) para fallar de forma segura, tenga prioridad sobre cualquier otra lógica, no pueda ser anulada por software, y active el estado seguro del sistema. La IA puede no implementar esto correctamente.
</details>

---

### Pregunta 5

¿Qué representa la dirección %M0.0 en un PLC Siemens?

- A) Una entrada física
- B) Una salida física
- C) Un bit de memoria interna (Merker)
- D) Un temporizador

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) Un bit de memoria interna (Merker)**

En la notación Siemens: %I = Inputs (entradas), %Q = Outputs (salidas), %M = Merker (memoria interna). M0.0 es el bit 0 del byte de Merker 0, usado para estados internos, flags, y lógica auxiliar que no tiene correspondencia física directa.
</details>

---

### Pregunta 6

Al pedir a la IA que convierta Ladder a Structured Text, ¿qué verificación es esencial?

- A) Que el código sea más corto
- B) Que la lógica booleana sea equivalente (AND, OR, NOT correctos)
- C) Que use más variables
- D) Que tenga más líneas

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Que la lógica booleana sea equivalente (AND, OR, NOT correctos)**

En Ladder, los contactos en serie son AND y en paralelo son OR. Al convertir a ST, verificar que: (A AND B) no se convierta en (A OR B), que los contactos NC se traduzcan como NOT, y que la precedencia de operadores sea correcta. Un error de lógica puede causar comportamiento peligroso.
</details>

---

### Pregunta 7

¿Cuál es el propósito de solicitar un "interlock" (enclavamiento) en código PLC?

- A) Hacer el código más largo
- B) Evitar que dos actuadores incompatibles funcionen simultáneamente
- C) Aumentar el consumo de energía
- D) Reducir el número de entradas

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Evitar que dos actuadores incompatibles funcionen simultáneamente**

Un interlock es una protección de seguridad que impide condiciones peligrosas: por ejemplo, que una válvula de entrada y una bomba de salida operen al mismo tiempo (podría causar cavitación o presurización). Siempre solicitar interlocks apropiados al generar código con IA.
</details>

---

### Pregunta 8

Al usar IA para troubleshooting de PLC, ¿qué información es más útil proporcionar?

- A) Solo el mensaje de error
- B) Código, tabla de tags, valores observados online, y síntomas del problema
- C) Solo el nombre del PLC
- D) La marca del software

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Código, tabla de tags, valores observados online, y síntomas del problema**

Para diagnóstico efectivo, la IA necesita: el código completo para analizar lógica, la tabla de símbolos para entender direcciones, los valores en tiempo real de entradas/salidas/memorias, y una descripción clara del comportamiento incorrecto vs. esperado.
</details>

---

### Pregunta 9

En código Structured Text generado por IA, ¿qué estructura se usa para control PID?

- A) Solo variables simples (REAL, INT)
- B) STRUCT o TYPE con parámetros Kp, Ki, Kd y estado interno
- C) Strings
- D) Arrays de bits

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) STRUCT o TYPE con parámetros Kp, Ki, Kd y estado interno**

Un PID profesional usa estructuras de datos (UDT/TYPE) que encapsulan: parámetros (Kp, Ki, Kd, límites), estado interno (integral acumulada, error previo), y configuración (tiempo de muestreo). Esto permite reutilización y mantiene el código organizado.
</details>

---

### Pregunta 10

¿Por qué es importante solicitar comentarios en español al generar código PLC para América Latina?

- A) Por preferencia estética
- B) Para cumplir normas de documentación industrial y facilitar mantenimiento local
- C) Porque el PLC no acepta otros idiomas
- D) Para aumentar el tamaño del archivo

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Para cumplir normas de documentación industrial y facilitar mantenimiento local**

Los programas PLC industriales deben ser mantenidos por técnicos locales que pueden no dominar inglés. Comentarios en español facilitan: entendimiento del código, mantenimiento, troubleshooting, y cumplimiento de normas de documentación ISO. La IA puede generar documentación en cualquier idioma si se solicita.
</details>

---

## Resultados

| Puntuación | Calificación |
|------------|--------------|
| 90-100 | Excelente - Dominas programación PLC con IA |
| 70-89 | Bueno - Comprensión sólida de conceptos |
| 50-69 | Regular - Revisar ejemplos del módulo |
| < 50 | Insuficiente - Requiere práctica adicional |

---

*Quiz Módulo 05 - IA para Programación de PLCs*
*10 preguntas - 10 minutos*
