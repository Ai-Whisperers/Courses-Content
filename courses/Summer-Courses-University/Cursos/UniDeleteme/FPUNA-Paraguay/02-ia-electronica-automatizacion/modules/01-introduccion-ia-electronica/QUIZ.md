# Quiz - Módulo 01
## Introducción a IA para Electrónica

**Duración:** 10 minutos
**Puntos totales:** 100 (10 puntos cada pregunta)

---

### Pregunta 1

¿Cuál herramienta de IA es más adecuada para autocompletado de código directamente en el IDE mientras escribes?

- A) Claude
- B) ChatGPT
- C) GitHub Copilot
- D) Excel

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) GitHub Copilot**

GitHub Copilot está diseñado específicamente para integrarse con IDEs como VS Code y proporcionar sugerencias de autocompletado en tiempo real mientras escribes código. Claude y ChatGPT son mejores para conversaciones y generación de bloques completos de código.
</details>

---

### Pregunta 2

En la estructura de un buen prompt para IA, ¿qué sección especifica las limitaciones que el código generado debe respetar?

- A) Contexto
- B) Objetivo
- C) Restricciones
- D) Formato de salida

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) Restricciones**

La sección de RESTRICCIONES es donde se especifican las limitaciones como: componentes específicos, bibliotecas permitidas, rangos de valores, compatibilidades requeridas, y qué NO debe hacer el código.
</details>

---

### Pregunta 3

¿Cuál es el directorio donde se coloca el código fuente principal en un proyecto PlatformIO?

- A) lib/
- B) include/
- C) src/
- D) test/

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) src/**

En PlatformIO, el directorio `src/` contiene el código fuente principal, incluyendo `main.cpp`. El directorio `lib/` es para librerías privadas, `include/` para headers, y `test/` para pruebas unitarias.
</details>

---

### Pregunta 4

Al validar código generado por IA para electrónica, ¿cuál de estas verificaciones es la MÁS crítica para seguridad?

- A) Que los comentarios estén en español
- B) Que los valores estén en rangos seguros
- C) Que use las últimas versiones de bibliotecas
- D) Que el código sea elegante

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Que los valores estén en rangos seguros**

En sistemas electrónicos, valores fuera de rango pueden causar daño a componentes, comportamiento impredecible, o riesgos de seguridad. Por ejemplo, un PWM al 150% o un voltaje de 12V en un pin de 3.3V. Esta verificación es crítica antes de usar código en hardware real.
</details>

---

### Pregunta 5

¿Para qué tipo de sistema NUNCA se debe usar código de IA sin revisión exhaustiva por un experto?

- A) LED que parpadea
- B) Sensor de temperatura para display
- C) Sistema de parada de emergencia (E-stop)
- D) Registro de datos en SD card

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) Sistema de parada de emergencia (E-stop)**

Los sistemas de seguridad como E-stops, interlocks, y protecciones de equipos requieren código verificado y certificado (SIL, PL). Un error en estos sistemas puede causar lesiones o muerte. La IA puede ayudar en el desarrollo, pero el código final debe ser verificado exhaustivamente por expertos en seguridad funcional.
</details>

---

### Pregunta 6

¿Cuál es el propósito del archivo `platformio.ini`?

- A) Almacenar las credenciales WiFi
- B) Definir la configuración del proyecto (board, framework, librerías)
- C) Guardar el código compilado
- D) Registrar errores del programa

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Definir la configuración del proyecto (board, framework, librerías)**

El archivo `platformio.ini` es el corazón de la configuración de un proyecto PlatformIO. Define qué placa se usa, qué framework (Arduino, ESP-IDF), las dependencias de librerías, velocidad del monitor serial, y otras opciones de compilación y upload.
</details>

---

### Pregunta 7

¿Cuál es la mejor estrategia cuando el código generado por IA tiene errores?

- A) Abandonar y escribir todo manualmente
- B) Copiar el error y pedir corrección específica a la IA
- C) Buscar en Google una solución diferente
- D) Reiniciar la computadora

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Copiar el error y pedir corrección específica a la IA**

La iteración con la IA es una técnica efectiva: copiar el mensaje de error exacto, el código relevante, y pedir una corrección explicada. Esto aprovecha el contexto de la conversación y usualmente produce código corregido rápidamente. Es más eficiente que empezar de cero.
</details>

---

### Pregunta 8

En un prompt para generar código de sensor, ¿por qué es importante especificar el PIN de conexión?

- A) Para que el código sea más largo
- B) Porque cada microcontrolador tiene capacidades diferentes por pin
- C) Para impresionar al instructor
- D) No es importante, cualquier pin funciona igual

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Porque cada microcontrolador tiene capacidades diferentes por pin**

No todos los pines son iguales: algunos solo soportan entrada digital, otros tienen ADC, algunos soportan I2C/SPI solo en ciertos pines, algunos no están disponibles durante WiFi. Especificar el pin correcto asegura que el código generado use las capacidades disponibles en ese pin específico.
</details>

---

### Pregunta 9

¿Cuál de estas es una limitación real de las herramientas de IA actuales para electrónica?

- A) No pueden generar código que compile
- B) No conocen componentes electrónicos
- C) No pueden garantizar que el código funcione para tu hardware específico
- D) Solo funcionan en inglés

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) No pueden garantizar que el código funcione para tu hardware específico**

La IA genera código basado en patrones comunes, pero no conoce tu PCB específico, tus componentes exactos, o las condiciones de tu ambiente. El código puede ser sintácticamente correcto pero no funcionar en tu hardware particular. Por eso la validación en hardware real es indispensable.
</details>

---

### Pregunta 10

¿Qué significa la filosofía "la IA es asistente, no reemplazo"?

- A) La IA hace todo el trabajo automáticamente
- B) Debemos usar IA para generar código pero entenderlo y validarlo nosotros
- C) No debemos usar IA para programación
- D) La IA reemplazará a los ingenieros pronto

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Debemos usar IA para generar código pero entenderlo y validarlo nosotros**

La IA es una herramienta poderosa que acelera el desarrollo, pero el ingeniero sigue siendo responsable de entender el código, validarlo, y asegurar que funcione correctamente. No debemos copiar código ciegamente; debemos entender cada línea y verificar que cumple los requisitos de nuestro proyecto específico.
</details>

---

## Resultados

| Puntuación | Calificación |
|------------|--------------|
| 90-100 | Excelente - Listo para usar IA en electrónica |
| 70-89 | Bueno - Comprensión sólida de conceptos |
| 50-69 | Regular - Revisar secciones del módulo |
| < 50 | Insuficiente - Requiere repaso completo |

---

*Quiz Módulo 01 - Introducción a IA para Electrónica*
*10 preguntas - 10 minutos*
