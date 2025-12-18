# Quiz - Módulo 04
## IA para Diseño de Circuitos

**Duración:** 10 minutos
**Puntos totales:** 100 (10 puntos cada pregunta)

---

### Pregunta 1

Al pedir a la IA cálculos de un divisor de tensión, ¿qué información es esencial incluir en el prompt?

- A) Solo el voltaje de salida deseado
- B) Vin, Vout, corriente máxima, y serie de resistores (E12/E24)
- C) El color de los resistores
- D) La marca del multímetro

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Vin, Vout, corriente máxima, y serie de resistores (E12/E24)**

Para obtener un diseño práctico, la IA necesita: voltaje de entrada y salida para la relación de división, corriente máxima para determinar resistencia total, y la serie comercial (E12, E24, E96) para seleccionar valores disponibles en el mercado.
</details>

---

### Pregunta 2

¿Cuál es el propósito de solicitar valores comerciales E24 al diseñar con IA?

- A) Hacer el circuito más caro
- B) Asegurar que los valores calculados existan en el mercado
- C) Impresionar al profesor
- D) Usar más componentes

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Asegurar que los valores calculados existan en el mercado**

La serie E24 define los 24 valores de resistores disponibles por década con 5% de tolerancia. Si la IA calcula 8.7kΩ pero no existe en E24, debe seleccionar 8.2kΩ o 9.1kΩ. Pedir valores E24 asegura un diseño implementable.
</details>

---

### Pregunta 3

Al usar IA para analizar un datasheet, ¿cuál es la mejor práctica?

- A) Pedir un resumen de todo el documento sin especificar
- B) Solicitar información específica: pinout, voltajes, consumo, circuito típico
- C) Solo pedir el precio del componente
- D) Ignorar las notas de aplicación

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Solicitar información específica: pinout, voltajes, consumo, circuito típico**

Los datasheets pueden tener 50+ páginas. Pedir información específica permite a la IA extraer exactamente lo necesario: rango de voltaje, pinout, consumo, circuitos recomendados, y consideraciones de diseño. Un resumen general puede omitir detalles críticos.
</details>

---

### Pregunta 4

¿Por qué es importante verificar los cálculos de disipación térmica generados por IA?

- A) Por curiosidad académica
- B) Porque determinan si el componente necesita disipador y si operará dentro de límites seguros
- C) Para hacer el informe más largo
- D) La IA nunca se equivoca en cálculos

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Porque determinan si el componente necesita disipador y si operará dentro de límites seguros**

Si P = (Vin-Vout) × I es alto, el regulador puede sobrecalentarse. Con Tj_max típico de 125°C y Rth_ja del package, se calcula si necesita disipador. Un error de cálculo puede causar falla térmica o incendio. Siempre verificar manualmente.
</details>

---

### Pregunta 5

Al solicitar un BOM (Bill of Materials) a la IA, ¿qué columnas son esenciales?

- A) Solo nombre y cantidad
- B) Referencia, cantidad, valor, package/footprint, manufacturer, part number
- C) Solo precio total
- D) Nombre del diseñador

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Referencia, cantidad, valor, package/footprint, manufacturer, part number**

Un BOM profesional incluye: designador (R1, C2), cantidad, valor/modelo, footprint (para PCB), fabricante (para calidad), part number (para compra), y opcionalmente precio y alternativas. Esto permite fabricación y compra sin ambigüedades.
</details>

---

### Pregunta 6

¿Cuál es el riesgo de usar código LTSpice generado por IA sin revisión?

- A) El archivo será muy grande
- B) Los modelos SPICE pueden no estar disponibles o tener sintaxis incorrecta
- C) LTSpice no acepta archivos generados
- D) No hay ningún riesgo

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Los modelos SPICE pueden no estar disponibles o tener sintaxis incorrecta**

La IA puede generar referencias a modelos (.subckt) que no existen en tu instalación de LTSpice, usar sintaxis antigua, o parámetros incorrectos. Siempre verificar que los modelos estén disponibles y que las directivas de simulación sean correctas.
</details>

---

### Pregunta 7

Al diseñar PCB con asistencia de IA, ¿qué consideración es crítica para módulos WiFi como ESP32?

- A) El color de la máscara de soldadura
- B) Área de exclusión alrededor de la antena y plano de masa adecuado
- C) Usar componentes de colores brillantes
- D) Maximizar el número de vías

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Área de exclusión alrededor de la antena y plano de masa adecuado**

Los módulos WiFi tienen antena integrada que requiere área libre de cobre y componentes (típicamente 10-15mm). El plano de masa debe estar correctamente dimensionado. Violar estas reglas degradará significativamente el rendimiento RF del módulo.
</details>

---

### Pregunta 8

¿Cuál es la fórmula correcta para calcular la resistencia de un LED que la IA debería usar?

- A) R = V / I
- B) R = (Vsource - Vf_LED) / I_LED
- C) R = P / I²
- D) R = Vsource × I_LED

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) R = (Vsource - Vf_LED) / I_LED**

La resistencia limitadora debe absorber la diferencia entre el voltaje de fuente y la caída del LED (Vf típico 1.8-3.3V según color). Con corriente típica de 10-20mA, R = (5V - 2V) / 10mA = 300Ω para LED rojo en fuente de 5V. Verificar siempre este cálculo.
</details>

---

### Pregunta 9

Al solicitar esquemáticos ASCII a la IA, ¿qué elemento mejora significativamente la utilidad?

- A) Usar más espacios
- B) Incluir valores de componentes, números de pin, y nombres de nodos
- C) Hacerlo lo más pequeño posible
- D) Usar solo líneas horizontales

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Incluir valores de componentes, números de pin, y nombres de nodos**

Un esquemático ASCII útil incluye: valores (10kΩ, 100μF), números de pin (especialmente para ICs), nombres de nodos (VCC, GND, OUT), y direccionalidad clara. Esto permite implementar el circuito sin ambigüedad y verificar conexiones.
</details>

---

### Pregunta 10

¿Por qué se recomienda pedir alternativas de componentes al generar un BOM con IA?

- A) Para gastar más dinero
- B) Por problemas de disponibilidad y para tener opciones en caso de escasez
- C) Para complicar el diseño
- D) La IA solo conoce un componente por función

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Por problemas de disponibilidad y para tener opciones en caso de escasez**

Los problemas de supply chain (escasez de chips) hacen crítico tener alternativas. Un LM7805 puede reemplazarse por L7805 o MC7805 de otros fabricantes. La IA puede sugerir alternativas pin-compatible que faciliten la producción cuando el componente original no está disponible.
</details>

---

## Resultados

| Puntuación | Calificación |
|------------|--------------|
| 90-100 | Excelente - Dominas diseño de circuitos con IA |
| 70-89 | Bueno - Comprensión sólida de conceptos |
| 50-69 | Regular - Revisar ejemplos del módulo |
| < 50 | Insuficiente - Requiere práctica adicional |

---

*Quiz Módulo 04 - IA para Diseño de Circuitos*
*10 preguntas - 10 minutos*
