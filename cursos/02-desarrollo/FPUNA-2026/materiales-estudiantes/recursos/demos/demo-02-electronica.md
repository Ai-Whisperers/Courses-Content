# Demo Track 02: Electrónica con IA

## Arduino y Automatización Asistida por IA

### Objetivo
Demostrar cómo Claude puede acelerar el desarrollo de proyectos de electrónica.

---

## Demo 1: Código Arduino Básico - LED Blink

```bash
claude "Genera código Arduino para hacer parpadear un LED conectado al pin 13 cada segundo. Incluye comentarios en español explicando cada línea."
```

**Resultado esperado:** Código completo con setup() y loop().

---

## Demo 2: Sensor de Temperatura con DHT11

```bash
claude "Escribe código Arduino para leer temperatura y humedad de un sensor DHT11 conectado al pin 2. Muestra los datos en el Serial Monitor cada 2 segundos. Incluye manejo de errores si el sensor no responde."
```

**Resultado esperado:** Código con librería DHT, lecturas y validación.

---

## Demo 3: Sistema de Riego Automatizado

```bash
claude "Diseña el código para un sistema de riego automático con Arduino:
- Sensor de humedad del suelo en A0
- Bomba de agua controlada por relé en pin 7
- LED indicador en pin 13
- Si la humedad baja del 30%, activar bomba por 5 segundos
- Mostrar estado en Serial Monitor

Incluye umbrales ajustables y protección contra riego excesivo."
```

**Resultado esperado:** Sistema completo con lógica de control.

---

## Demo 4: Calcular Resistencia para LED

```bash
claude "Necesito calcular la resistencia para un LED:
- Voltaje de fuente: 5V
- Voltaje del LED: 2V (rojo)
- Corriente deseada: 20mA

Muéstrame la fórmula, el cálculo paso a paso, y el valor comercial más cercano disponible."
```

**Resultado esperado:** Cálculo usando Ley de Ohm y valor comercial (150Ω).

---

## Demo 5: Generar BOM (Bill of Materials)

```bash
claude "Genera una lista de materiales (BOM) para un proyecto de estación meteorológica con Arduino Uno:
- Medición de temperatura, humedad y presión
- Display LCD 16x2
- Alimentación por USB o batería
- Carcasa impresa en 3D

Incluye componentes, cantidades, y proveedores sugeridos para Paraguay (LCSC, AliExpress)."
```

**Resultado esperado:** BOM completa con precios estimados.

---

## Demo 6: Explicar Circuito

```bash
claude "Explícame cómo funciona este circuito:
- Arduino Uno
- Pin 9 conectado a base de transistor 2N2222 con resistencia 1kΩ
- Colector conectado a motor DC 5V
- Emisor a GND
- Motor alimentado por 5V externo con diodo flyback 1N4007

¿Por qué se necesita el transistor? ¿Por qué el diodo?"
```

**Resultado esperado:** Explicación de driver de motor y protección.

---

## Demo 7: Código ESP32 con WiFi

```bash
claude "Escribe código para ESP32 que:
1. Se conecte a WiFi (SSID y password como constantes)
2. Lea temperatura de un sensor DHT22 en GPIO 4
3. Envíe los datos cada minuto a un servidor vía HTTP POST
4. Incluya reconexión automática si pierde WiFi
5. Use deep sleep entre lecturas para ahorrar energía

Endpoint: http://miservidor.com/api/temperatura"
```

**Resultado esperado:** Código ESP32 completo con manejo de errores.

---

## Ejercicio Interactivo para Estudiantes

Cada estudiante elige un proyecto:

1. **Alarma de proximidad** - Sensor ultrasónico + buzzer
2. **Control de acceso** - Teclado matricial + servomotor
3. **Monitor de consumo** - Sensor de corriente ACS712
4. **Semáforo inteligente** - LEDs + sensor de luz

Usan Claude para generar el código base y luego lo modifican.

---

## Simulación Online

Para probar sin hardware:
- **Wokwi:** https://wokwi.com/
- Copiar código generado
- Simular circuito virtual

---

## Puntos de Discusión

- ¿El código generado funciona "out of the box"?
- ¿Qué modificaciones fueron necesarias?
- ¿Cómo manejar componentes que Claude no conoce?
- ¿Cuándo es mejor buscar ejemplos vs. generar desde cero?

---

*Demo Track 02 - FPUNA 2026*
