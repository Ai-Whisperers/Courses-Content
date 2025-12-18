# Quiz - Módulo 02
## IA para Microcontroladores

**Duración:** 10 minutos
**Puntos totales:** 100 (10 puntos cada pregunta)

---

### Pregunta 1

Al usar IA para generar código de ESP32 con WiFi, ¿cuál biblioteca se recomienda para conexión MQTT?

- A) WiFiClient solamente
- B) PubSubClient
- C) HTTPClient
- D) WebServer

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) PubSubClient**

PubSubClient es la biblioteca estándar para MQTT en Arduino/ESP32. Proporciona funciones para conectar, publicar, suscribir y manejar callbacks de mensajes MQTT. WiFiClient es el transporte subyacente pero no implementa el protocolo MQTT.
</details>

---

### Pregunta 2

¿Cuál es la forma correcta de estructurar un prompt para generar un driver de sensor I2C?

- A) "Dame código para I2C"
- B) "Genera driver para sensor XYZ en ESP32: dirección 0x48, pines SDA=21 SCL=22, leer registro 0x00 para temperatura (16 bits, MSB first), con función de calibración"
- C) "Código de sensor de temperatura"
- D) "Driver completo"

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) "Genera driver para sensor XYZ en ESP32: dirección 0x48, pines SDA=21 SCL=22, leer registro 0x00 para temperatura (16 bits, MSB first), con función de calibración"**

Un prompt efectivo para drivers incluye: nombre del sensor, microcontrolador, dirección I2C, pines específicos, registros a acceder, formato de datos, y funcionalidades adicionales. Esto produce código mucho más preciso y útil.
</details>

---

### Pregunta 3

Al optimizar código embebido generado por IA, ¿cuál técnica es más efectiva para reducir uso de RAM?

- A) Agregar más comentarios
- B) Usar `const char*` en lugar de `String` para textos fijos
- C) Aumentar el delay en loop()
- D) Cambiar el nombre de las variables

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Usar `const char*` en lugar de `String` para textos fijos**

La clase `String` de Arduino crea fragmentación de heap y usa memoria dinámica. Usar `const char*` o el modificador `PROGMEM` almacena strings en Flash en lugar de RAM, crucial en MCUs con memoria limitada (2KB RAM en Arduino Uno).
</details>

---

### Pregunta 4

¿Qué problema común puede tener el código generado por IA para lectura de sensores DHT?

- A) Usar demasiados comentarios
- B) No esperar tiempo mínimo de 2 segundos entre lecturas
- C) Código demasiado corto
- D) Usar muchas variables

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) No esperar tiempo mínimo de 2 segundos entre lecturas**

Los sensores DHT11/DHT22 requieren un mínimo de 2 segundos entre lecturas para estabilizarse. La IA puede no incluir este delay o verificación, causando lecturas incorrectas (NaN). Siempre verificar restricciones de timing del datasheet.
</details>

---

### Pregunta 5

En código ESP32 para deep sleep, ¿dónde se deben guardar variables que sobrevivan al reinicio?

- A) En variables globales normales
- B) En la memoria RTC (RTC_DATA_ATTR)
- C) En el Serial buffer
- D) En la EEPROM

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) En la memoria RTC (RTC_DATA_ATTR)**

La memoria RTC del ESP32 (8KB) se mantiene alimentada durante deep sleep, permitiendo que variables marcadas con `RTC_DATA_ATTR` conserven su valor. Las variables normales se pierden porque la RAM principal se apaga para ahorrar energía.
</details>

---

### Pregunta 6

Al generar código con IA para control PWM en ESP32, ¿cuál función moderna se debe usar?

- A) analogWrite()
- B) ledcSetup() + ledcAttachPin() + ledcWrite()
- C) digitalWrite() con delays
- D) Serial.write()

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) ledcSetup() + ledcAttachPin() + ledcWrite()**

ESP32 no tiene analogWrite() nativo como Arduino. Usa el periférico LEDC con: ledcSetup(canal, frecuencia, resolución), ledcAttachPin(pin, canal), y ledcWrite(canal, duty). Esto ofrece 16 canales independientes y mayor control.
</details>

---

### Pregunta 7

¿Cuál es la mejor práctica al pedir a la IA que genere código de reconexión WiFi?

- A) Pedir reconexión inmediata infinita
- B) Especificar: intentos máximos, delay exponencial entre reintentos, timeout total, y acción de fallback
- C) Solo reiniciar el ESP32 si falla
- D) Ignorar fallos de conexión

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Especificar: intentos máximos, delay exponencial entre reintentos, timeout total, y acción de fallback**

Una reconexión robusta incluye: número máximo de intentos, backoff exponencial (1s, 2s, 4s...) para no saturar el router, timeout global para evitar bloqueo, y acción de fallback (modo AP, deep sleep, reinicio). Esto evita loops infinitos y ahorra energía.
</details>

---

### Pregunta 8

Al usar Copilot para generar código de interrupción en Arduino, ¿qué verificación es esencial?

- A) Que use la palabra "interrupt" en comentarios
- B) Que las variables compartidas con el ISR estén marcadas como `volatile`
- C) Que el código sea corto
- D) Que use Serial.print() en el ISR

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) Que las variables compartidas con el ISR estén marcadas como `volatile`**

Variables accedidas tanto por el loop principal como por el ISR deben ser `volatile` para prevenir optimizaciones del compilador que causen comportamiento incorrecto. Serial.print() en ISRs es problemático porque puede causar bloqueos.
</details>

---

### Pregunta 9

¿Cuál formato es más apropiado para enviar datos de sensores por MQTT desde ESP32?

- A) Texto plano separado por comas
- B) JSON estructurado con ArduinoJson
- C) Bytes binarios sin formato
- D) HTML

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) JSON estructurado con ArduinoJson**

JSON es el estándar para IoT por: legibilidad humana, parsing fácil en cualquier plataforma, soporte nativo en Node-RED/InfluxDB/Grafana, y extensibilidad para agregar campos. ArduinoJson es la biblioteca optimizada para MCUs.
</details>

---

### Pregunta 10

Al solicitar a la IA un driver para sensor analógico en ESP32, ¿qué especificación es crítica incluir?

- A) El color del sensor
- B) La resolución del ADC (12 bits), voltaje de referencia, y si requiere atenuación
- C) El precio del sensor
- D) El fabricante del ESP32

<details>
<summary>Ver respuesta</summary>

**Respuesta correcta: B) La resolución del ADC (12 bits), voltaje de referencia, y si requiere atenuación**

El ADC del ESP32 tiene configuraciones específicas: 12 bits de resolución, atenuación configurable (0dB, 2.5dB, 6dB, 11dB) que afecta el rango de voltaje (0-1V a 0-3.3V), y no linealidad conocida en extremos. Especificar esto produce código preciso para la aplicación.
</details>

---

## Resultados

| Puntuación | Calificación |
|------------|--------------|
| 90-100 | Excelente - Dominas IA para microcontroladores |
| 70-89 | Bueno - Comprensión sólida de conceptos |
| 50-69 | Regular - Revisar ejemplos del módulo |
| < 50 | Insuficiente - Requiere práctica adicional |

---

*Quiz Módulo 02 - IA para Microcontroladores*
*10 preguntas - 10 minutos*
