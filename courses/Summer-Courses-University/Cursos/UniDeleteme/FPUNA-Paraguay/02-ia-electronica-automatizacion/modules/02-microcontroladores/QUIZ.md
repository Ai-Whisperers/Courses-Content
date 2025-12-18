# Quiz - Módulo 02
## Microcontroladores con IA

**Duración:** 10 minutos
**Puntos totales:** 100 (10 puntos cada pregunta)

---

### Pregunta 1

¿Cuál es la función de la biblioteca `PubSubClient` en proyectos ESP32?

- A) Manejar el sistema de archivos
- B) Implementar cliente MQTT para publicar y suscribirse a tópicos
- C) Controlar el display OLED
- D) Leer sensores de temperatura

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Implementar cliente MQTT para publicar y suscribirse a tópicos**

PubSubClient es la biblioteca estándar para implementar comunicación MQTT en Arduino y ESP32. Permite conectar a brokers MQTT, publicar mensajes a tópicos, suscribirse para recibir mensajes, y manejar callbacks cuando llegan datos.
</details>

---

### Pregunta 2

¿Por qué se usa `millis()` en lugar de `delay()` en el loop principal de un sistema IoT?

- A) Porque millis() es más preciso
- B) Porque delay() bloquea el procesador y no permite atender otras tareas
- C) Porque delay() consume más energía
- D) Porque millis() es más fácil de usar

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Porque delay() bloquea el procesador y no permite atender otras tareas**

`delay()` detiene la ejecución completamente, impidiendo atender conexiones WiFi, procesar mensajes MQTT, o responder a interrupciones. `millis()` permite programación no bloqueante: verificar si pasó el tiempo necesario sin detener otras operaciones. Esto es crítico para sistemas que deben mantener comunicaciones activas.
</details>

---

### Pregunta 3

Al leer un sensor DHT22, ¿qué valor indica que la lectura falló?

- A) 0
- B) -1
- C) NaN (Not a Number)
- D) 999

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) NaN (Not a Number)**

La biblioteca DHT retorna `NaN` cuando no puede leer el sensor correctamente (sensor desconectado, error de comunicación, timing incorrecto). Se debe verificar con `isnan(value)` antes de usar el valor. Un valor de 0 o -1 podrían ser lecturas válidas en ciertos contextos.
</details>

---

### Pregunta 4

¿Cuál es el consumo aproximado del ESP32 en modo Deep Sleep?

- A) 150 mA
- B) 10 mA
- C) 1 mA
- D) 10 µA

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: D) 10 µA**

El ESP32 en Deep Sleep consume aproximadamente 10 µA, lo que permite años de operación con batería si se diseña correctamente. En comparación, con WiFi activo consume ~150-200 mA. Por eso el deep sleep es crítico para dispositivos alimentados por batería.
</details>

---

### Pregunta 5

En el formato JSON para datos de sensores, ¿por qué es útil incluir un `timestamp`?

- A) Para hacer el mensaje más largo
- B) Para poder ordenar y correlacionar datos en el tiempo
- C) Porque MQTT lo requiere
- D) Para identificar el dispositivo

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Para poder ordenar y correlacionar datos en el tiempo**

El timestamp permite saber exactamente cuándo se tomó cada lectura, ordenar datos cronológicamente, detectar gaps en la comunicación, correlacionar eventos entre diferentes sensores, y hacer análisis de tendencias. Es esencial para sistemas de monitoreo y bases de datos de series temporales.
</details>

---

### Pregunta 6

¿Qué biblioteca se usa típicamente para parsear y generar JSON en ESP32?

- A) JSONParser
- B) ArduinoJson
- C) ESP32JSON
- D) SimpleJSON

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) ArduinoJson**

ArduinoJson es la biblioteca más popular y eficiente para manejar JSON en plataformas Arduino/ESP32. Permite serializar (crear) y deserializar (parsear) documentos JSON con uso eficiente de memoria. Soporta tanto asignación estática como dinámica.
</details>

---

### Pregunta 7

¿Cuál es el propósito del archivo `config.h` en un proyecto de firmware?

- A) Almacenar el código compilado
- B) Centralizar credenciales, pines y constantes configurables
- C) Guardar logs del sistema
- D) Definir el bootloader

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Centralizar credenciales, pines y constantes configurables**

El archivo `config.h` centraliza toda la configuración del proyecto: credenciales WiFi/MQTT, asignación de pines, umbrales, intervalos de tiempo, etc. Esto facilita modificar el comportamiento sin buscar en todo el código, y permite mantener diferentes configuraciones para desarrollo y producción.
</details>

---

### Pregunta 8

Al implementar reconexión WiFi, ¿por qué es importante usar un intervalo entre intentos?

- A) Para ahorrar batería
- B) Para no saturar el access point con solicitudes continuas
- C) Porque WiFi.begin() solo funciona una vez por segundo
- D) Para dar tiempo al usuario de verificar

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Para no saturar el access point con solicitudes continuas**

Intentar reconectar continuamente sin pausa satura el access point, consume energía innecesariamente, y puede causar bloqueos en el firmware. Un intervalo de 5-10 segundos entre intentos es práctica estándar: da tiempo a que problemas temporales se resuelvan sin sobrecargar la red.
</details>

---

### Pregunta 9

¿Qué función tiene el parámetro QoS (Quality of Service) en MQTT?

- A) Definir la velocidad de transmisión
- B) Garantizar diferentes niveles de entrega de mensajes
- C) Encriptar los mensajes
- D) Comprimir los datos

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Garantizar diferentes niveles de entrega de mensajes**

QoS define la garantía de entrega: QoS 0 = "a lo más una vez" (puede perderse), QoS 1 = "al menos una vez" (puede duplicarse), QoS 2 = "exactamente una vez" (sin pérdida ni duplicados). Para sensores se usa típicamente QoS 0 o 1, para comandos críticos QoS 2.
</details>

---

### Pregunta 10

Para despertar un ESP32 de Deep Sleep con un botón, ¿qué tipo de wakeup se debe configurar?

- A) Timer wakeup
- B) Touchpad wakeup
- C) External wakeup (ext0 o ext1)
- D) ULP wakeup

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: C) External wakeup (ext0 o ext1)**

Para despertar con un botón físico se usa `esp_sleep_enable_ext0_wakeup()` (un solo pin RTC) o `esp_sleep_enable_ext1_wakeup()` (múltiples pines). Timer wakeup es para despertar después de un tiempo. Touchpad es para pines capacitivos. ULP es para programas del co-procesador de ultra bajo consumo.
</details>

---

## Resultados

| Puntuación | Calificación |
|------------|--------------|
| 90-100 | Excelente - Dominas ESP32 e IoT |
| 70-89 | Bueno - Comprensión sólida de conceptos |
| 50-69 | Regular - Revisar ejemplos del módulo |
| < 50 | Insuficiente - Requiere práctica adicional |

---

*Quiz Módulo 02 - Microcontroladores con IA*
*10 preguntas - 10 minutos*
