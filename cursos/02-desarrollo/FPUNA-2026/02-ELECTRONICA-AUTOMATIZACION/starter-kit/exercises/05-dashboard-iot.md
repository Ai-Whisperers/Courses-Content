# Ejercicio 5: Dashboard IoT con IA

## Objetivo
Aprender a usar IA para crear un sistema IoT completo: desde el firmware del ESP32 hasta un dashboard de visualización en la nube.

## Duración
60-75 minutos

## Prerrequisitos
- ESP32 DevKit o simulador Wokwi
- Arduino IDE o PlatformIO
- Cuenta gratuita en ThingSpeak (o Ubidots)
- Acceso a Claude/OpenCode

## Por Qué Este Ejercicio

IoT conecta el mundo físico con el digital. La IA te ayuda a generar código MQTT, configurar dashboards, y debuggear problemas de conectividad. Pero SIEMPRE debes entender el flujo de datos y verificar la seguridad de tus conexiones.

---

## Parte 1: Arquitectura del Sistema (10 minutos)

### Escenario

Crearás un sistema de monitoreo ambiental que:

1. **Lee sensores** (ESP32):
   - Temperatura (DHT22 o simulado)
   - Humedad (DHT22 o simulado)

2. **Envía datos a la nube** (MQTT/HTTP):
   - Cada 30 segundos
   - Con reconexión automática

3. **Visualiza en dashboard** (ThingSpeak):
   - Gráficos en tiempo real
   - Histórico de últimas 24 horas

### Diagrama de arquitectura

```
┌─────────────────┐     WiFi      ┌─────────────────┐     Cloud      ┌─────────────────┐
│     ESP32       │──────────────▶│    ThingSpeak   │───────────────▶│    Dashboard    │
│  + DHT22        │    HTTP API   │    (Broker)     │                │   (Gráficos)    │
│                 │◀──────────────│                 │                │                 │
│ Sensor → JSON   │   Respuesta   │  Almacenamiento │                │  Visualización  │
└─────────────────┘               └─────────────────┘                └─────────────────┘
```

---

## Parte 2: Configurar ThingSpeak (10 minutos)

### Pasos manuales (hacer antes de usar IA)

1. **Crear cuenta**: https://thingspeak.com/
2. **Crear nuevo Channel**:
   - Name: "Monitor Ambiental FPUNA"
   - Field 1: Temperatura
   - Field 2: Humedad
   - Field 3: (opcional) Índice de calor
3. **Obtener credenciales**:
   - Channel ID: ______________
   - Write API Key: ______________
   - Read API Key: ______________

### Prompt para entender ThingSpeak

```
Necesito entender cómo funciona ThingSpeak para un proyecto IoT.

Por favor explícame:

1. **¿Qué es ThingSpeak?**
   - Comparación con otras plataformas (Ubidots, AWS IoT)
   - Limitaciones de la cuenta gratuita

2. **Conceptos clave**:
   - ¿Qué es un Channel?
   - ¿Qué son los Fields (máximo 8)?
   - ¿Diferencia entre Write API Key y Read API Key?

3. **Métodos de envío de datos**:
   - HTTP GET vs HTTP POST
   - ¿Hay soporte MQTT? ¿Cómo funciona?
   - Rate limiting (¿cada cuánto puedo enviar?)

4. **Seguridad básica**:
   - ¿Es seguro poner la API Key en el código?
   - ¿Cómo proteger mis datos?

Formato: Explicación breve con ejemplos
```

### Completa con la respuesta

| Concepto | Explicación | Límite gratuito |
|----------|-------------|-----------------|
| Rate limit | | |
| Campos por channel | | |
| Retención de datos | | |
| MQTT disponible | | |

---

## Parte 3: Código ESP32 con IA (20 minutos)

### Prompt para generar código base

```
Necesito código para ESP32 que envíe datos de sensor a ThingSpeak.

**Hardware:**
- ESP32 DevKit V1
- Sensor DHT22 en GPIO 4
- LED indicador en GPIO 2 (LED integrado)

**Funcionalidad requerida:**
1. Conectar a WiFi con reconexión automática
2. Leer DHT22 cada 30 segundos
3. Enviar temperatura y humedad a ThingSpeak via HTTP
4. Parpadear LED al enviar datos exitosamente
5. Mostrar estado en Serial Monitor

**Credenciales (usar placeholders):**
- WiFi SSID: "TU_SSID"
- WiFi Password: "TU_PASSWORD"
- ThingSpeak API Key: "TU_API_KEY"
- ThingSpeak Channel: TU_CHANNEL_ID

**Requisitos de código:**
- Usar librerías: WiFi.h, HTTPClient.h, DHT.h
- Manejar errores de conexión WiFi
- Manejar errores de lectura del sensor
- Manejar errores de envío HTTP
- Usar millis() en lugar de delay() para el timing
- Comentarios en español

**Estructura deseada:**
- Constantes de configuración al inicio
- Función setup() clara
- Función loop() con máquina de estados simple
- Funciones auxiliares: conectarWiFi(), leerSensor(), enviarDatos()

Por favor genera el código completo y funcional.
```

### Evalúa el código generado

| Aspecto | ¿Incluido? | ¿Funciona? |
|---------|------------|------------|
| Reconexión WiFi automática | | |
| Validación de lectura DHT | | |
| Manejo de error HTTP | | |
| Usa millis() no delay() | | |
| LED indicador funciona | | |
| Comentarios en español | | |

### Código de prueba rápida (sin sensor real)

Si no tienes DHT22, pide a la IA:

```
Modifica el código anterior para que funcione SIN sensor DHT22.
En lugar de leer el sensor, genera valores simulados:
- Temperatura: random entre 20 y 35°C
- Humedad: random entre 40 y 80%

Esto es solo para probar la conexión a ThingSpeak.
Agrega un comentario indicando que son datos simulados.
```

---

## Parte 4: Verificar Envío de Datos (10 minutos)

### Checklist de verificación

1. **Serial Monitor** (115200 baud):
   ```
   Esperado:
   Conectando a WiFi...
   WiFi conectado! IP: 192.168.1.xxx
   Leyendo sensor...
   Temperatura: 25.5°C, Humedad: 60%
   Enviando a ThingSpeak...
   Respuesta: 200 OK
   Datos enviados exitosamente
   ```

2. **ThingSpeak Channel**:
   - ¿Aparecen datos en Field 1 (Temperatura)?
   - ¿Aparecen datos en Field 2 (Humedad)?
   - ¿El timestamp es correcto?

3. **Prueba de errores**:
   - Desconecta WiFi del router
   - ¿El código intenta reconectar?
   - ¿No se cuelga?

### Prompt para debugging

```
Mi ESP32 no está enviando datos a ThingSpeak.

**Síntomas:**
- WiFi conecta correctamente (veo la IP)
- El sensor lee valores correctos
- Pero ThingSpeak no recibe datos

**Código de envío:**
[Pegar la función enviarDatos()]

**Respuesta HTTP:**
[Pegar el código de respuesta si lo hay]

**Configuración de ThingSpeak:**
- Channel ID: [número]
- API Key: [primeros 4 caracteres]***

Por favor:
1. ¿Qué podría estar mal?
2. ¿Cómo puedo debuggear paso a paso?
3. ¿Hay algún error común con ThingSpeak?
```

---

## Parte 5: Crear Dashboard Personalizado (15 minutos)

### Configuración en ThingSpeak

1. Ve a tu Channel → "Private View"
2. Agrega widgets:
   - Chart para Temperatura (Field 1)
   - Chart para Humedad (Field 2)
   - Gauge para Temperatura actual

### Prompt para personalizar visualización

```
Quiero mejorar la visualización de mi channel de ThingSpeak.

**Datos que envío:**
- Field 1: Temperatura (°C), rango esperado 15-40
- Field 2: Humedad (%), rango esperado 20-90

**Lo que quiero lograr:**

1. **Gráfico de temperatura**:
   - Línea roja
   - Eje Y de 0 a 50°C
   - Mostrar últimas 24 horas
   - Título: "Temperatura Ambiente"

2. **Gráfico de humedad**:
   - Línea azul
   - Eje Y de 0 a 100%
   - Mismo período que temperatura

3. **Indicadores numéricos**:
   - Gauge circular para temperatura actual
   - Colores: verde (20-28), amarillo (28-35), rojo (>35)

4. **MATLAB Analysis (opcional)**:
   - Calcular temperatura promedio del día
   - Detectar si humedad < 30% (alerta de ambiente seco)

Por favor dame:
- Pasos para configurar cada widget
- Código MATLAB si aplica
- Tips para que el dashboard se vea profesional
```

### Resultado del dashboard

| Widget | Configurado | Funcionando |
|--------|-------------|-------------|
| Chart Temperatura | | |
| Chart Humedad | | |
| Gauge Temperatura | | |
| Indicador numérico | | |

---

## Parte 6: Agregar Alertas (10 minutos)

### Prompt para sistema de alertas

```
Quiero agregar alertas a mi sistema IoT en ThingSpeak.

**Condiciones de alerta:**
1. Temperatura > 35°C → Alerta de calor
2. Temperatura < 10°C → Alerta de frío
3. Humedad < 30% → Ambiente muy seco
4. Sin datos por más de 5 minutos → Posible falla del sensor

**Opciones de notificación disponibles:**
- ThingSpeak React (webhooks)
- IFTTT integration
- Email directo

Por favor:

1. **¿Qué opciones tiene ThingSpeak para alertas?**
   - ¿React está disponible en cuenta gratuita?
   - ¿Hay límites de notificaciones?

2. **Configuración de ThingSpeak React**:
   - Pasos para crear una alerta de temperatura alta
   - ¿Cómo evitar alertas repetidas cada 30 segundos?

3. **Alternativa con IFTTT**:
   - ¿Cómo conectar ThingSpeak con IFTTT?
   - Ejemplo de applet para enviar email

4. **Código ESP32 para alertas locales**:
   - Agregar buzzer/LED que se active si temp > 35°C
   - Sin depender de la nube
```

---

## Template para Proyectos IoT

```
Necesito crear un sistema IoT para: [DESCRIPCIÓN]

**Hardware:**
- Microcontrolador: [ESP32 / ESP8266 / Arduino + WiFi shield]
- Sensores: [lista con pines]
- Actuadores: [lista con pines]

**Conectividad:**
- Protocolo: [HTTP / MQTT / WebSocket]
- Plataforma cloud: [ThingSpeak / Ubidots / AWS IoT / custom]
- Frecuencia de envío: [cada X segundos]

**Datos a enviar:**
| Campo | Tipo | Unidad | Rango esperado |
|-------|------|--------|----------------|
| | | | |

**Visualización deseada:**
- Gráficos de: [lista]
- Alertas cuando: [condiciones]
- Histórico de: [período]

**Requisitos de código:**
- Lenguaje: [Arduino C++ / MicroPython]
- Manejo de errores: [reconexión WiFi, validación sensor]
- Modo offline: [guardar datos localmente si no hay conexión?]

Por favor genera:
1. Código del microcontrolador
2. Configuración de la plataforma cloud
3. Diseño del dashboard
4. Sistema de alertas
```

---

## Entregable

### Sistema IoT funcional

1. **Código ESP32** (main.cpp o .ino):
   - Funcional y comentado
   - Credenciales como constantes editables
   - Manejo de errores robusto

2. **Screenshot del dashboard**:
   - Mostrando datos en tiempo real
   - Al menos 2 horas de histórico

3. **Documentación**:
   - Diagrama de arquitectura
   - Lista de credenciales necesarias (sin valores reales)
   - Instrucciones de configuración

4. **Video corto** (opcional, +bonus):
   - 1-2 minutos mostrando el sistema funcionando
   - ESP32 → Serial Monitor → ThingSpeak → Dashboard

---

## Criterios de Éxito

- [ ] ESP32 conecta a WiFi automáticamente
- [ ] Datos llegan a ThingSpeak cada 30 segundos
- [ ] Dashboard muestra gráficos de temperatura y humedad
- [ ] El sistema maneja desconexiones sin colgarse
- [ ] Entiendes el flujo de datos completo
- [ ] Documentaste las credenciales necesarias (sin exponerlas)

---

## Extensiones Opcionales

### Para ir más allá

1. **Agregar más sensores**:
   - BMP280 (presión atmosférica)
   - Sensor de luz (LDR)
   - Sensor de CO2 (MQ-135)

2. **Control bidireccional**:
   - Leer comandos desde ThingSpeak
   - Encender/apagar LED remotamente
   - TalkBack feature de ThingSpeak

3. **Dashboard local**:
   - Servidor web en el ESP32
   - No depende de Internet
   - Usar ESPAsyncWebServer

4. **MQTT en lugar de HTTP**:
   - Más eficiente para datos frecuentes
   - ThingSpeak MQTT broker
   - Pide a la IA que convierta el código

---

## Importante: IA + IoT

**La IA es muy útil para:**
- Generar código de conexión WiFi/MQTT
- Explicar protocolos y arquitecturas
- Debuggear problemas de conectividad
- Sugerir estructuras de datos JSON

**La IA NO puede:**
- Crear tu cuenta de ThingSpeak
- Ver tu red WiFi o credenciales
- Verificar que los datos lleguen a la nube
- Garantizar seguridad de tu sistema

**Siempre verifica:**
- Credenciales NO en repositorios públicos
- HTTPS para envío de datos sensibles
- Rate limits de la plataforma
- Que los datos lleguen realmente al dashboard

---

## Seguridad Básica IoT

### Checklist de seguridad

- [ ] API Keys NO hardcodeadas en código compartido
- [ ] Usar archivo de configuración separado (config.h en .gitignore)
- [ ] WiFi password no visible en Serial Monitor
- [ ] Channel de ThingSpeak en modo privado si tiene datos sensibles
- [ ] No exponer IP del ESP32 a Internet sin firewall

### Ejemplo de config.h seguro

```cpp
// config.h - NO SUBIR A GIT
#ifndef CONFIG_H
#define CONFIG_H

const char* WIFI_SSID = "TuRedWiFi";
const char* WIFI_PASS = "TuPassword";
const char* THINGSPEAK_API_KEY = "TuAPIKey";
const unsigned long CHANNEL_ID = 123456;

#endif
```

Y en .gitignore:
```
config.h
```

---

*Ejercicio 5 - Electrónica y Automatización - FPUNA 2026*
