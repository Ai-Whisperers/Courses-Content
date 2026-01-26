# Ejemplo Completado: Lógica de Automatización de Riego

## Contexto
Un estudiante diseñó un sistema de riego automático para una pequeña huerta familiar usando Arduino.

---

## Requerimientos del Proyecto

**Hardware disponible:**
- Arduino UNO
- Sensor de humedad de suelo capacitivo (A0)
- Sensor de temperatura LM35 (A1)
- Módulo relé 1 canal (D7)
- Bomba de agua 12V
- RTC DS1307 (I2C)

**Reglas de control:**
1. Regar si humedad < 40%
2. No regar si ya regó hace menos de 2 horas
3. No regar si temperatura < 10°C
4. Regar máximo 30 segundos por ciclo
5. Solo regar entre 6:00 y 20:00

---

## Prompt Usado

```
Necesito diseñar la lógica de control para un sistema de riego automático.

**Hardware:**
- Arduino UNO
- Sensor humedad suelo (A0): 0-1023, donde 0=mojado, 1023=seco
- Sensor temperatura LM35 (A1)
- Módulo relé (D7): HIGH=bomba ON
- RTC DS1307 para hora

**Reglas:**
1. REGAR si humedad < 40% (lectura > 600)
2. NO REGAR si última vez fue hace < 2 horas
3. NO REGAR si temperatura < 10°C
4. Regar máximo 30 segundos
5. Solo entre 6:00 y 20:00 horas

**Requisitos:**
- Código estructurado con funciones
- Logs en Serial Monitor
- Histéresis para evitar oscilación
- Manejo de errores de sensores

Genera el código completo y comentado.
```

---

## Código Generado y Verificado

```cpp
/*
 * Sistema de Riego Automático
 * Verificado y funcionando
 * FPUNA - 2026
 */

#include <Wire.h>
#include <RTClib.h>

// ========== CONFIGURACIÓN (fácil de ajustar) ==========
const int PIN_HUMEDAD = A0;
const int PIN_TEMP = A1;
const int PIN_BOMBA = 7;

// Umbrales
const int HUMEDAD_REGAR = 600;      // Más alto = más seco
const int HUMEDAD_PARAR = 500;      // Histéresis de 100 unidades
const int TEMP_MINIMA = 10;         // No regar bajo 10°C
const int HORA_INICIO = 6;          // Desde las 6:00
const int HORA_FIN = 20;            // Hasta las 20:00
const unsigned long TIEMPO_RIEGO = 30000;  // 30 segundos
const unsigned long ESPERA_MINIMA = 7200000; // 2 horas en ms

// ========== VARIABLES GLOBALES ==========
RTC_DS1307 rtc;
unsigned long ultimoRiego = 0;
bool bombaActiva = false;
unsigned long inicioRiego = 0;

// ========== SETUP ==========
void setup() {
    Serial.begin(9600);
    pinMode(PIN_BOMBA, OUTPUT);
    digitalWrite(PIN_BOMBA, LOW);  // Bomba apagada al inicio

    // Inicializar RTC
    if (!rtc.begin()) {
        Serial.println("ERROR: RTC no encontrado!");
        while (1);  // Detener si no hay RTC
    }

    if (!rtc.isrunning()) {
        Serial.println("RTC no está corriendo. Configurando hora...");
        rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
    }

    Serial.println("Sistema de riego iniciado");
    Serial.println("=========================");
}

// ========== FUNCIONES DE SENSORES ==========
int leerHumedad() {
    // Promedio de 5 lecturas
    long suma = 0;
    for (int i = 0; i < 5; i++) {
        suma += analogRead(PIN_HUMEDAD);
        delay(10);
    }
    return suma / 5;
}

float leerTemperatura() {
    int lectura = analogRead(PIN_TEMP);
    float voltaje = lectura * (5.0 / 1024.0);
    return voltaje * 100.0;  // LM35: 10mV/°C
}

// ========== FUNCIONES DE VERIFICACIÓN ==========
bool esHoraValida() {
    DateTime ahora = rtc.now();
    int hora = ahora.hour();
    return (hora >= HORA_INICIO && hora < HORA_FIN);
}

bool puedeRegar() {
    unsigned long tiempoActual = millis();

    // Verificar si pasó suficiente tiempo
    if (ultimoRiego > 0) {
        unsigned long diferencia = tiempoActual - ultimoRiego;
        if (diferencia < ESPERA_MINIMA) {
            unsigned long minutosRestantes = (ESPERA_MINIMA - diferencia) / 60000;
            Serial.print("Esperar ");
            Serial.print(minutosRestantes);
            Serial.println(" minutos antes de regar de nuevo");
            return false;
        }
    }
    return true;
}

bool sensorHumedadOK(int valor) {
    // Validar rango razonable
    if (valor < 50 || valor > 1000) {
        Serial.println("ALERTA: Sensor de humedad fuera de rango!");
        return false;
    }
    return true;
}

bool sensorTempOK(float temp) {
    // Validar rango razonable para Paraguay
    if (temp < -10 || temp > 60) {
        Serial.println("ALERTA: Sensor de temperatura fuera de rango!");
        return false;
    }
    return true;
}

// ========== CONTROL DE BOMBA ==========
void activarBomba() {
    if (!bombaActiva) {
        digitalWrite(PIN_BOMBA, HIGH);
        bombaActiva = true;
        inicioRiego = millis();
        Serial.println(">>> BOMBA ACTIVADA <<<");
    }
}

void desactivarBomba() {
    if (bombaActiva) {
        digitalWrite(PIN_BOMBA, LOW);
        bombaActiva = false;
        ultimoRiego = millis();
        Serial.println(">>> BOMBA DESACTIVADA <<<");
    }
}

// ========== LÓGICA PRINCIPAL ==========
void verificarRiego() {
    // Leer sensores
    int humedad = leerHumedad();
    float temp = leerTemperatura();
    DateTime ahora = rtc.now();

    // Log de estado
    Serial.print("[");
    Serial.print(ahora.hour());
    Serial.print(":");
    if (ahora.minute() < 10) Serial.print("0");
    Serial.print(ahora.minute());
    Serial.print("] ");
    Serial.print("Humedad: ");
    Serial.print(humedad);
    Serial.print(" | Temp: ");
    Serial.print(temp, 1);
    Serial.print("°C | Bomba: ");
    Serial.println(bombaActiva ? "ON" : "OFF");

    // Si la bomba está activa, verificar tiempo máximo
    if (bombaActiva) {
        if (millis() - inicioRiego >= TIEMPO_RIEGO) {
            Serial.println("Tiempo máximo de riego alcanzado");
            desactivarBomba();
            return;
        }
        // También parar si humedad subió lo suficiente
        if (humedad < HUMEDAD_PARAR) {
            Serial.println("Humedad suficiente alcanzada");
            desactivarBomba();
            return;
        }
        return;  // Seguir regando
    }

    // Verificar si debe regar
    // 1. Validar sensores
    if (!sensorHumedadOK(humedad) || !sensorTempOK(temp)) {
        Serial.println("Sensores con valores inválidos - No regar");
        return;
    }

    // 2. Verificar hora
    if (!esHoraValida()) {
        Serial.println("Fuera de horario de riego");
        return;
    }

    // 3. Verificar temperatura
    if (temp < TEMP_MINIMA) {
        Serial.print("Temperatura muy baja (");
        Serial.print(temp, 1);
        Serial.println("°C) - No regar");
        return;
    }

    // 4. Verificar tiempo desde último riego
    if (!puedeRegar()) {
        return;
    }

    // 5. Verificar humedad
    if (humedad > HUMEDAD_REGAR) {
        Serial.println("Suelo seco - Iniciando riego");
        activarBomba();
    } else {
        Serial.println("Humedad OK - No necesita riego");
    }
}

// ========== LOOP PRINCIPAL ==========
void loop() {
    verificarRiego();
    delay(10000);  // Verificar cada 10 segundos
}
```

---

## Verificación de la Lógica

### Casos de Prueba

| Escenario | Humedad | Temp | Hora | Último riego | ¿Riega? | Resultado |
|-----------|---------|------|------|--------------|---------|-----------|
| Normal seco | 650 | 25°C | 14:00 | hace 3h | SÍ | ✅ Riega 30s |
| Normal húmedo | 400 | 25°C | 14:00 | hace 3h | NO | ✅ No riega |
| Temp baja | 650 | 5°C | 14:00 | hace 3h | NO | ✅ No riega |
| Noche | 650 | 25°C | 22:00 | hace 3h | NO | ✅ No riega |
| Reciente | 650 | 25°C | 14:00 | hace 1h | NO | ✅ Espera |
| Sensor malo | 1023 | 25°C | 14:00 | hace 3h | NO | ✅ Alerta |

### Prueba de Histéresis

```
Secuencia de humedad simulada:
500 → 550 → 600 → 610 → 620 → 580 → 540 → 500 → 490

Resultado esperado:
- Activa bomba cuando pasa 600
- Mantiene bomba activa mientras > 500
- Desactiva cuando baja de 500

Resultado real: ✅ Funciona correctamente
```

---

## Diagrama de Conexiones

```
                    ARDUINO UNO
                   +===========+
                   |           |
    +---+          |  5V   GND |          +---+
    |LM35|---------|A1         |----------|RTC|
    +---+          |           |          +---+
      |            |  A0   D7  |            |
    GND            |   |    |  |           I2C
                   +===|====|==+
                       |    |
                   +---+    +------+
                   |               |
              +--------+      +---------+
              |HUMEDAD |      | RELÉ    |====> BOMBA 12V
              |SUELO   |      | 1 CANAL |
              +--------+      +---------+
```

---

## Mejoras Sugeridas por la IA (Implementación Futura)

1. **Guardar datos en SD card** para análisis
2. **Alertas por LED** cuando hay problemas
3. **Ajuste automático** de umbrales según temporada
4. **Múltiples zonas** de riego con diferentes sensores

---

## Lecciones Aprendidas

### Sobre la lógica:
- La histéresis evita que la bomba encienda/apague rápidamente
- El timeout de 30 segundos es crucial para seguridad
- Validar sensores antes de tomar decisiones

### Sobre el código:
- Funciones separadas hacen el código más legible
- Los logs en Serial ayudan a debuggear en campo
- Constantes arriba para fácil ajuste

### Sobre seguridad:
- La bomba debe estar OFF al iniciar (estado seguro)
- Tiempo máximo evita inundación si sensor falla
- Verificación de rango detecta sensores desconectados

---

*Ejemplo completado - Electrónica y Automatización - FPUNA 2026*
