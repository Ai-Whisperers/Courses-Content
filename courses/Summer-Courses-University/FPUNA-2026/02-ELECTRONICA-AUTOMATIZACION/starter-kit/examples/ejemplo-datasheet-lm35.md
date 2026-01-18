# Ejemplo Completado: Interpretación de Datasheet LM35

## Contexto
Un estudiante necesitaba conectar el sensor de temperatura LM35 a un Arduino para un proyecto de estación meteorológica.

---

## La Consulta

```
Necesito entender el datasheet del sensor de temperatura LM35
para usarlo con Arduino UNO.

Por favor dame un resumen práctico que incluya:

1. Especificaciones eléctricas (voltaje, consumo, salida)
2. Rango de operación
3. Conexión con Arduino
4. Precauciones
5. Diagrama de conexión ASCII
```

---

## Resumen Obtenido de la IA

### Especificaciones Eléctricas

| Parámetro | Valor | Verificado en Datasheet |
|-----------|-------|-------------------------|
| Voltaje alimentación | 4V - 30V | ✅ Página 3, "Supply Voltage" |
| Consumo corriente | 60 µA típico | ✅ Página 3, "Quiescent Current" |
| Sensibilidad | 10 mV/°C | ✅ Página 1, destacado |
| Precisión (LM35D) | ±0.5°C a 25°C | ✅ Página 3, "Accuracy" |

### Rango de Operación

| Versión | Rango | Verificado |
|---------|-------|------------|
| LM35 | -55°C a +150°C | ✅ |
| LM35C/LM35CA | -40°C a +110°C | ✅ |
| LM35D | 0°C a +100°C | ✅ (versión más común) |

---

## Verificación en Datasheet Real

El estudiante descargó el datasheet de Texas Instruments y verificó:

### Página 1 - Resumen

| IA dijo | Datasheet dice | ¿Coincide? |
|---------|---------------|------------|
| 10 mV/°C | "10.0 mV/°C scale factor" | ✅ |
| No necesita calibración | "does not require any external calibration" | ✅ |

### Página 3 - Especificaciones Eléctricas

| IA dijo | Datasheet dice | ¿Coincide? |
|---------|---------------|------------|
| 4V-30V alimentación | 4V to 30V | ✅ |
| 60 µA consumo | 60 µA typical | ✅ |
| ±0.5°C precisión | ±0.5°C @ 25°C (LM35D) | ✅ |

### Página 7 - Aplicaciones

El estudiante encontró información adicional que la IA no mencionó:
- **Self-heating:** El sensor se calienta 0.08°C por mW disipado
- **Capacitor de bypass:** Recomendado para largas distancias de cable
- **Output impedance:** ~0.1Ω → puede conectar directo a ADC

---

## Cheat Sheet Creada

```markdown
# LM35 - Cheat Sheet

## Specs Clave
| Parámetro | Valor |
|-----------|-------|
| Alimentación | 5V (Arduino) |
| Salida | 10 mV/°C |
| Rango (LM35D) | 0°C a 100°C |
| Precisión | ±0.5°C |
| Corriente | 60 µA |

## Pinout (vista frontal, lado plano)
```
    ___________
   |   LM35    |
   |           |
   |  1  2  3  |
   |__|__|__|__|

   1 = VCC (5V)
   2 = VOUT (a A0)
   3 = GND
```

## Conexión Arduino UNO
```
LM35          Arduino
-----         -------
Pin 1 (VCC) → 5V
Pin 2 (OUT) → A0
Pin 3 (GND) → GND
```

## Fórmula de conversión
```cpp
int lectura = analogRead(A0);
float voltaje = lectura * (5.0 / 1024.0);
float temperatura = voltaje * 100;  // 10mV/°C
```

## Valores de verificación
| Temp | Voltaje | Lectura ADC esperada |
|------|---------|---------------------|
| 0°C  | 0 mV    | 0 |
| 25°C | 250 mV  | ~51 |
| 30°C | 300 mV  | ~61 |
| 50°C | 500 mV  | ~102 |

## Precauciones
- ⚠️ No invertir polaridad (daño permanente)
- ⚠️ Máximo 30V de alimentación
- ⚠️ Self-heating si corriente alta
- ✓ Puede conectar directo a Arduino
- ✓ No necesita resistencia pull-up
```

---

## Código Arduino Verificado

```cpp
// lm35_temperatura.ino
// Verificado y funcionando

const int PIN_LM35 = A0;

void setup() {
    Serial.begin(9600);
    Serial.println("Sensor LM35 iniciado");
}

void loop() {
    // Tomar promedio de 10 lecturas para estabilidad
    float suma = 0;
    for (int i = 0; i < 10; i++) {
        suma += analogRead(PIN_LM35);
        delay(10);
    }
    float promedio = suma / 10.0;

    // Convertir a temperatura
    // Arduino 5V, ADC 10 bits = 1024
    // LM35: 10mV por °C
    float voltaje = promedio * (5.0 / 1024.0);
    float temperatura = voltaje * 100.0;

    // Mostrar
    Serial.print("Lectura ADC: ");
    Serial.print(promedio, 0);
    Serial.print(" | Voltaje: ");
    Serial.print(voltaje, 3);
    Serial.print("V | Temperatura: ");
    Serial.print(temperatura, 1);
    Serial.println("°C");

    delay(1000);
}
```

### Resultado en Serial Monitor
```
Sensor LM35 iniciado
Lectura ADC: 51 | Voltaje: 0.249V | Temperatura: 24.9°C
Lectura ADC: 52 | Voltaje: 0.254V | Temperatura: 25.4°C
Lectura ADC: 51 | Voltaje: 0.249V | Temperatura: 24.9°C
```

---

## Lecciones Aprendidas

### La IA fue precisa en:
- Especificaciones eléctricas principales
- Pinout y conexión básica
- Fórmula de conversión

### La IA omitió:
- Self-heating (importante para mediciones precisas)
- Capacitor de bypass para cables largos
- Diferencias entre versiones (LM35, LM35A, LM35C, LM35D)

### El estudiante agregó:
- Verificación con valores conocidos
- Promediado de lecturas para estabilidad
- Código funcional y probado

---

## Reflexión

> "El resumen de la IA me ahorró leer las 13 páginas del datasheet, pero igual tuve que verificar. Encontré que la versión que tenía (LM35D) no mide temperaturas negativas, algo que la IA mencionó pero no enfatizó. Para mi estación meteorológica en Paraguay no es problema (nunca baja de 0°C), pero es importante saberlo."
>
> — Estudiante de Ingeniería Electrónica, FPUNA

---

*Ejemplo completado - Electrónica y Automatización - FPUNA 2026*
