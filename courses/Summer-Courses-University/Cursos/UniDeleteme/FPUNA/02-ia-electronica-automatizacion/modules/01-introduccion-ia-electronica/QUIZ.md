# Quiz - Módulo 01
## Introducción a IA para Electrónica

**Duración:** 10 minutos
**Puntos totales:** 100 (10 puntos cada pregunta)

---

### Pregunta 1

¿Cuál herramienta de IA es más apropiada para autocompletado de código en tiempo real dentro del IDE?

- A) ChatGPT
- B) GitHub Copilot
- C) Claude
- D) Gemini

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) GitHub Copilot**

GitHub Copilot se integra directamente en el IDE (VS Code, JetBrains) y proporciona sugerencias de código en tiempo real mientras escribes. ChatGPT y Claude son mejores para consultas conversacionales y análisis de código extenso.
</details>

---

### Pregunta 2

Al generar código para sistemas embebidos con IA, ¿cuál es la consideración de seguridad MÁS crítica?

- A) La velocidad de generación del código
- B) Revisar límites de memoria y timing antes de usar el código
- C) Usar el modelo de IA más reciente
- D) Generar código lo más corto posible

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Revisar límites de memoria y timing antes de usar el código**

En sistemas embebidos, los recursos son limitados. El código generado por IA puede no considerar las restricciones de memoria RAM/Flash, timing crítico para protocolos, o el consumo de energía. Siempre se debe revisar que el código cabe en el MCU y cumple con los requisitos de tiempo.
</details>

---

### Pregunta 3

¿Cuál es la estructura de prompt más efectiva para pedir código de microcontrolador a una IA?

- A) "Dame código para Arduino"
- B) "Código para leer sensor"
- C) Contexto (MCU, pines, restricciones) + Tarea + Especificaciones + Formato
- D) "Hazme un proyecto completo"

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) Contexto (MCU, pines, restricciones) + Tarea + Especificaciones + Formato**

Un prompt efectivo incluye: el microcontrolador específico, los pines a usar, las restricciones (memoria, consumo), la tarea exacta, los protocolos (I2C, SPI), y el formato deseado (lenguaje, estilo de comentarios). Esto produce código más preciso y útil.
</details>

---

### Pregunta 4

¿Cuánta reducción típica en tiempo de desarrollo de firmware puede esperarse al usar IA efectivamente?

- A) 5-10%
- B) 40-60%
- C) 95-100%
- D) No hay mejora significativa

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) 40-60%**

Estudios y experiencias de la industria muestran que el uso efectivo de IA puede reducir el tiempo de desarrollo de firmware en un 40-60%, principalmente en tareas como generación de código boilerplate, drivers básicos, y documentación. Sin embargo, la revisión y testing sigue siendo necesaria.
</details>

---

### Pregunta 5

¿Qué tipo de información NUNCA debe compartirse con herramientas de IA en la nube?

- A) Código de bibliotecas open source
- B) Ejemplos de Arduino del sitio oficial
- C) Credenciales WiFi, API keys, y código propietario del empleador
- D) Diagramas de circuitos básicos

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) Credenciales WiFi, API keys, y código propietario del empleador**

Nunca se deben compartir: credenciales de red, API keys, tokens de acceso, código propietario o confidencial, especificaciones bajo NDA, o datos de producción real. Las herramientas de IA procesan estos datos en servidores externos y pueden retener información para entrenamiento.
</details>

---

### Pregunta 6

¿Cuál es la principal ventaja de Claude sobre ChatGPT para proyectos de electrónica grandes?

- A) Es más rápido
- B) Tiene ventana de contexto más grande (100K+ tokens)
- C) Genera mejor código Assembly
- D) Funciona offline

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Tiene ventana de contexto más grande (100K+ tokens)**

Claude puede procesar documentos mucho más extensos (datasheets completos, proyectos grandes) gracias a su ventana de contexto de 100K+ tokens. Esto es especialmente útil para analizar código de firmware extenso, datasheets de componentes, o diseñar arquitecturas complejas.
</details>

---

### Pregunta 7

En un checklist de revisión de código generado por IA para sistemas embebidos, ¿cuál NO es una verificación esencial?

- A) ¿El código cabe en la memoria del MCU?
- B) ¿El timing es apropiado?
- C) ¿El código usa el estilo de indentación que prefiero?
- D) ¿Existe un estado seguro de fallo?

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) ¿El código usa el estilo de indentación que prefiero?**

El estilo de indentación es una preferencia estética que no afecta la funcionalidad ni la seguridad. Las verificaciones críticas son: recursos (memoria, timing), seguridad (estados de fallo, protecciones), funcionalidad (valores límite, entradas inesperadas), y precisión técnica.
</details>

---

### Pregunta 8

¿Cuál extensión de VS Code es específica para desarrollo de sistemas embebidos con múltiples plataformas (Arduino, ESP32, STM32)?

- A) C/C++ Extension Pack
- B) Arduino Extension
- C) PlatformIO
- D) Serial Monitor

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) PlatformIO**

PlatformIO es una plataforma unificada para desarrollo embebido que soporta más de 1000 placas de desarrollo (Arduino, ESP32, STM32, etc.), maneja automáticamente toolchains, bibliotecas y dependencias, y se integra perfectamente con VS Code.
</details>

---

### Pregunta 9

Al usar IA para generar código de control de motor de alta potencia, ¿cuál es la acción correcta?

- A) Usar el código directamente ya que la IA es muy precisa
- B) Revisar exhaustivamente timing, protecciones y límites antes de implementar
- C) Solo verificar que compila sin errores
- D) Confiar en la IA pero agregar un fusible

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Revisar exhaustivamente timing, protecciones y límites antes de implementar**

El código para control de potencia es crítico para la seguridad. Se debe verificar: timing de PWM, límites de corriente, protecciones de sobrecarga, estados de emergencia, condiciones de fallo, y nunca confiar ciegamente en código generado para aplicaciones de seguridad.
</details>

---

### Pregunta 10

¿Qué representa correctamente la relación entre IA y conocimiento técnico en electrónica?

- A) La IA reemplaza completamente el conocimiento técnico
- B) La IA es inútil para electrónica, mejor trabajar manualmente
- C) La IA amplifica las capacidades del ingeniero pero no reemplaza conocimiento fundamental
- D) Solo ingenieros sin experiencia necesitan IA

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) La IA amplifica las capacidades del ingeniero pero no reemplaza conocimiento fundamental**

La IA es una herramienta que potencia al ingeniero: acelera tareas repetitivas, sugiere soluciones, y ayuda con documentación. Sin embargo, el conocimiento de hardware, debugging con instrumentos, cálculos críticos de potencia, y consideraciones de seguridad requieren experiencia humana. La IA no reemplaza el osciloscopio ni la comprensión profunda de los circuitos.
</details>

---

## Resultados

| Puntuación | Calificación |
|------------|--------------|
| 90-100 | Excelente - Dominas los conceptos fundamentales |
| 70-89 | Bueno - Comprensión sólida con áreas a reforzar |
| 50-69 | Regular - Revisar material antes de continuar |
| < 50 | Insuficiente - Requiere repaso del módulo |

---

*Quiz Módulo 01 - Introducción a IA para Electrónica*
*10 preguntas - 10 minutos*
