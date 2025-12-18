# Quiz - Módulo 04
## Diseño de Circuitos con IA

**Duración:** 10 minutos
**Puntos totales:** 100 (10 puntos cada pregunta)

---

### Pregunta 1

En la serie E24, ¿cuál es el valor estándar más cercano a 8.7 kΩ calculado?

- A) 8.5 kΩ
- B) 8.2 kΩ
- C) 9.0 kΩ
- D) 8.7 kΩ

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) 8.2 kΩ**

La serie E24 tiene 24 valores por década. Los valores cercanos a 8.7 kΩ son 8.2 kΩ y 9.1 kΩ. El valor 8.2 kΩ es el más cercano por debajo. La serie E24 incluye: 1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1 y sus múltiplos.
</details>

---

### Pregunta 2

Para un LM7805 disipando 5W con Rθja = 65°C/W y Ta = 25°C, ¿cuál es la temperatura de juntura?

- A) 90°C
- B) 250°C
- C) 350°C
- D) 65°C

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) 350°C**

Tj = Ta + (P × Rθja) = 25 + (5 × 65) = 25 + 325 = 350°C

Este valor excede el límite típico de 125°C, indicando que se necesita un disipador. Por eso el análisis térmico es crítico: sin él, el componente fallaría por sobrecalentamiento.
</details>

---

### Pregunta 3

¿Cuál es el propósito del capacitor cerámico de 0.1µF en la salida de un regulador de voltaje?

- A) Aumentar la capacidad de corriente
- B) Filtrar ruido de alta frecuencia y mantener estabilidad
- C) Proteger contra sobrevoltaje
- D) Indicar el estado del regulador

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Filtrar ruido de alta frecuencia y mantener estabilidad**

Los capacitores cerámicos tienen baja ESR (resistencia serie equivalente) y responden bien a transitorios de alta frecuencia. Complementan al capacitor electrolítico (que maneja baja frecuencia pero tiene alta ESR). Además, muchos reguladores requieren capacitancia mínima de salida para estabilidad del lazo de control.
</details>

---

### Pregunta 4

Para un LED verde con Vf = 2.2V y corriente deseada de 10mA, alimentado desde 5V, ¿qué valor de resistencia se necesita?

- A) 220Ω
- B) 280Ω
- C) 330Ω
- D) 500Ω

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) 280Ω**

R = (Vcc - Vf) / I = (5V - 2.2V) / 10mA = 2.8V / 0.01A = 280Ω

El valor E24 más cercano sería 270Ω (corriente ligeramente mayor) o 330Ω (corriente ligeramente menor, más seguro para el LED). En la práctica, 330Ω es una elección común y conservadora.
</details>

---

### Pregunta 5

¿Por qué se coloca un diodo en serie con la entrada de una fuente de alimentación?

- A) Para aumentar el voltaje
- B) Para proteger contra conexión de polaridad inversa
- C) Para regular el voltaje
- D) Para indicar que hay energía

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Para proteger contra conexión de polaridad inversa**

Un diodo en serie (como 1N4007) bloquea la corriente si la polaridad se conecta al revés, protegiendo los componentes del circuito. La desventaja es una caída de voltaje de ~0.7V. Alternativas incluyen MOSFETs de protección (menor caída) o diodos Schottky (~0.3V).
</details>

---

### Pregunta 6

En un análisis térmico, ¿qué representa Rθjc?

- A) Resistencia eléctrica del encapsulado
- B) Resistencia térmica de la juntura al case (encapsulado)
- C) Resistencia del circuito al calor
- D) Resistencia del disipador

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Resistencia térmica de la juntura al case (encapsulado)**

Rθjc (junction-to-case) es la resistencia térmica desde la juntura del semiconductor hasta la superficie del encapsulado. Es un parámetro fijo del componente. La resistencia total al ambiente incluye: Rθjc + Rθcs (case-to-sink) + Rθsa (sink-to-ambient).
</details>

---

### Pregunta 7

Para un sensor 4-20mA que debe generar 0-3.3V para un ADC, ¿qué valor de resistencia shunt se necesita?

- A) 82.5Ω
- B) 165Ω
- C) 330Ω
- D) 1kΩ

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) 165Ω**

R = Vmax / Imax = 3.3V / 20mA = 165Ω

Con esta resistencia:
- A 4mA: V = 4mA × 165Ω = 0.66V
- A 20mA: V = 20mA × 165Ω = 3.3V

El rango de voltaje 0.66V-3.3V se mapea linealmente al rango de la variable medida.
</details>

---

### Pregunta 8

¿Cuál es la ventaja principal de usar LM1117-3.3 alimentado desde 5V en lugar de directamente desde 12V?

- A) Es más barato
- B) Menor potencia disipada (menor diferencia Vin-Vout)
- C) Mayor precisión de voltaje
- D) No necesita capacitores

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Menor potencia disipada (menor diferencia Vin-Vout)**

Desde 12V: P = (12-3.3) × I = 8.7 × I watts
Desde 5V: P = (5-3.3) × I = 1.7 × I watts

La potencia se reduce 5 veces (8.7/1.7 ≈ 5×), lo que significa menos calor, posiblemente sin necesidad de disipador, mayor eficiencia total del sistema, y mayor confiabilidad.
</details>

---

### Pregunta 9

En un BOM (Bill of Materials), ¿por qué es importante incluir el package o footprint?

- A) Para calcular el peso
- B) Para saber el color del componente
- C) Para asegurar que el componente cabe en el PCB y se puede soldar
- D) Por razones estéticas

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) Para asegurar que el componente cabe en el PCB y se puede soldar**

El package define las dimensiones físicas y el patrón de pads para soldadura. Un capacitor de 100µF puede venir en diferentes tamaños (0805, 1206, radial, etc.). Si el BOM especifica un package incorrecto, el componente no encajará en el PCB o requerirá diferentes técnicas de soldadura.
</details>

---

### Pregunta 10

Al diseñar un divisor de voltaje para un ADC, ¿por qué es preferible usar resistencias de alta impedancia con menor corriente?

- A) Son más precisas
- B) Consumen menos potencia y no cargan significativamente la fuente
- C) Son más baratas
- D) Funcionan mejor con voltajes altos

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Consumen menos potencia y no cargan significativamente la fuente**

Un divisor con corriente de 0.1mA consume P = V²/R = 144/120k = 1.2mW. Uno con 10mA consume 120mW (100× más). Además, alta corriente puede afectar el voltaje de la fuente si tiene impedancia interna significativa. El límite es la impedancia de entrada del ADC: si el divisor es muy alta impedancia, el ADC no puede cargar correctamente.
</details>

---

## Resultados

| Puntuación | Calificación |
|------------|--------------|
| 90-100 | Excelente - Dominas diseño de circuitos |
| 70-89 | Bueno - Comprensión sólida de conceptos |
| 50-69 | Regular - Revisar ejemplos del módulo |
| < 50 | Insuficiente - Requiere práctica adicional |

---

*Quiz Módulo 04 - Diseño de Circuitos*
*10 preguntas - 10 minutos*
