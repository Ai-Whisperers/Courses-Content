# Quiz - Módulo 05
## Programación de PLCs con IA

**Duración:** 10 minutos
**Puntos totales:** 100 (10 puntos cada pregunta)

---

### Pregunta 1

En lógica Ladder, ¿qué símbolo representa un contacto normalmente cerrado (NC)?

- A) --| |--
- B) --|/|--
- C) --( )--
- D) --(S)--

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) --|/|--**

El contacto normalmente cerrado se representa con una diagonal (/) que indica que está "abierto" en su estado normal. --| |-- es contacto NA, --( )-- es bobina, y --(S)-- es bobina SET (latch).
</details>

---

### Pregunta 2

¿Por qué el pulsador de STOP de emergencia se cablea típicamente como Normalmente Cerrado (NC)?

- A) Para ahorrar cable
- B) Para seguridad fail-safe: si el cable se corta, el sistema se detiene
- C) Porque es más fácil de programar
- D) Para que el LED funcione correctamente

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Para seguridad fail-safe: si el cable se corta, el sistema se detiene**

Con cableado NC, el circuito de seguridad está normalmente cerrado (conduciendo). Si el cable se rompe, se pierde la señal y el sistema interpreta esto como una parada de emergencia. Este es el principio de diseño "fail-safe" requerido por normas de seguridad industrial.
</details>

---

### Pregunta 3

En la dirección Siemens %I0.3, ¿qué representa el "0.3"?

- A) Módulo 0, canal 3
- B) Byte 0, bit 3
- C) Rack 0, slot 3
- D) Timer 0, preset 3

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Byte 0, bit 3**

En la nomenclatura Siemens, %I0.3 significa: I = Input (entrada), 0 = número de byte, 3 = número de bit dentro del byte. Un byte tiene 8 bits (0-7), por lo que %I0.3 es la cuarta entrada del primer byte de entradas.
</details>

---

### Pregunta 4

¿Cuál es la diferencia entre una bobina normal --( )-- y una bobina SET --(S)--?

- A) La bobina SET es más rápida
- B) La bobina normal mantiene el estado, SET se resetea automáticamente
- C) La bobina SET mantiene el estado (latch) hasta que se hace RESET
- D) No hay diferencia

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) La bobina SET mantiene el estado (latch) hasta que se hace RESET**

La bobina SET (latch) activa la salida y la mantiene activada aunque la condición de entrada desaparezca. Solo se desactiva cuando se ejecuta la instrucción RESET --(R)-- correspondiente. La bobina normal sigue el estado de las condiciones de entrada ciclo a ciclo.
</details>

---

### Pregunta 5

En Structured Text (IEC 61131-3), ¿cuál es la sintaxis correcta para un IF-ELSE?

- A) IF condition { code } ELSE { code }
- B) if (condition) then code else code endif
- C) IF condition THEN code; ELSE code; END_IF;
- D) When condition Do code Otherwise code End

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) IF condition THEN code; ELSE code; END_IF;**

La sintaxis IEC 61131-3 usa palabras clave en mayúsculas: IF...THEN...ELSE...END_IF. Las instrucciones terminan con punto y coma (;). Es similar a Pascal pero con terminadores explícitos como END_IF, END_CASE, END_FOR.
</details>

---

### Pregunta 6

¿Qué instrucción se usa en Ladder para un temporizador con retardo a la activación (On-Delay)?

- A) CTU
- B) TON
- C) TOF
- D) TP

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) TON**

TON (Timer On-Delay) activa su salida después de que la entrada haya estado activa durante el tiempo preestablecido (PT). TOF es timer off-delay (retardo a desactivación), TP es timer pulse (pulso de duración fija), y CTU es contador ascendente (Counter Up).
</details>

---

### Pregunta 7

En una secuencia industrial, ¿qué es un "interlock"?

- A) Un tipo de cable especial
- B) Una condición de seguridad que debe cumplirse para permitir una acción
- C) Un temporizador largo
- D) Una alarma sonora

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Una condición de seguridad que debe cumplirse para permitir una acción**

Un interlock es una condición que impide una acción si no se cumplen requisitos de seguridad. Por ejemplo: no permitir abrir una válvula si la presión es muy alta, o no arrancar un motor si la protección está abierta. Los interlocks previenen condiciones peligrosas para equipos o personas.
</details>

---

### Pregunta 8

¿Cuál es la ventaja de usar una máquina de estados (CASE) en Structured Text para secuencias?

- A) El código es más corto
- B) Organiza claramente las fases del proceso y las transiciones
- C) Usa menos memoria del PLC
- D) Ejecuta más rápido

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Organiza claramente las fases del proceso y las transiciones**

Una máquina de estados hace explícito qué puede ocurrir en cada fase del proceso y bajo qué condiciones se transiciona a otra fase. Esto facilita el debugging, la documentación, la adición de nuevos estados, y la comprensión del programa por otros técnicos. Es la forma recomendada de programar secuencias complejas.
</details>

---

### Pregunta 9

Durante un FAT (Factory Acceptance Test) de PLC, ¿qué se debe probar PRIMERO?

- A) La secuencia automática completa
- B) Las funciones de parada de emergencia y seguridades
- C) La comunicación con el SCADA
- D) La velocidad de ejecución

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Las funciones de parada de emergencia y seguridades**

Antes de probar cualquier funcionalidad, se debe verificar que los sistemas de seguridad funcionan correctamente. Si las protecciones fallan durante pruebas posteriores, podría haber daños o lesiones. El orden típico es: 1) Seguridades, 2) I/O individuales, 3) Secuencias manuales, 4) Secuencias automáticas.
</details>

---

### Pregunta 10

¿Qué significa "anti-windup" en un controlador PID implementado en PLC?

- A) Protección contra viento
- B) Limitación del término integral para evitar saturación
- C) Reducción de ruido eléctrico
- D) Enfriamiento del PLC

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Limitación del término integral para evitar saturación**

Cuando la salida del PID está saturada (al máximo o mínimo) pero el error persiste, el término integral sigue acumulando. Esto causa "windup": cuando finalmente el error cambia de signo, toma mucho tiempo "desenrollar" el integral acumulado, causando overshoot. Anti-windup limita el integral para evitar este problema.
</details>

---

## Resultados

| Puntuación | Calificación |
|------------|--------------|
| 90-100 | Excelente - Dominas programación de PLCs |
| 70-89 | Bueno - Comprensión sólida de conceptos |
| 50-69 | Regular - Revisar ejemplos del módulo |
| < 50 | Insuficiente - Requiere práctica adicional |

---

*Quiz Módulo 05 - Programación de PLCs*
*10 preguntas - 10 minutos*
