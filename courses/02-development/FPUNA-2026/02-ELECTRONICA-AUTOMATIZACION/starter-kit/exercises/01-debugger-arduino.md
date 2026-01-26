# Ejercicio 1: Debugging de Código Arduino con IA

## Objetivo
Aprender a usar IA para encontrar y corregir errores en código de Arduino/microcontroladores.

## Duración
45-60 minutos

## Prerrequisitos
- Conocimiento básico de Arduino
- Arduino IDE instalado (o Wokwi online)
- Acceso a Claude

## Advertencia de Seguridad

**ANTES de probar código en hardware real:**
- Verifica las conexiones con multímetro
- Usa resistencias limitadoras de corriente
- Desconecta la alimentación antes de modificar circuitos
- Nunca confíes ciegamente en código generado por IA

---

## Parte 1: El Código con Errores (10 minutos)

### El Problema
Este código de Arduino tiene 4 errores. Debería hacer parpadear un LED y leer un sensor de temperatura LM35:

```cpp
// control_led_temperatura.ino
#define LED_PIN = 13
#define SENSOR_PIN A0

int temperatura;
float voltaje;

void setup() {
    Serial.begin(9600)
    pinMode(LED_PIN, OUTPUT);
    pinMode(SENSOR_PIN, INPUT);
}

void loop() {
    // Leer sensor
    int lectura = analogRead(SENSOR_PIN);

    // Convertir a voltaje (Arduino 5V, 10 bits)
    voltaje = lectura * 5.0 / 1023;

    // LM35: 10mV por grado Celsius
    temperatura = voltaje / 100;

    // Mostrar en Serial
    Serial.print("Temperatura: ");
    Serial.print(temperatura);
    Serial.println(" °C");

    // Encender LED si temperatura > 30°C
    if (temperatura > 30) {
        digitalWrite(LED_PIN, HIGH);
    } else {
        digitalWrite(LED_PIN, LOW);
    }

    delay(1000);
}
```

### Intenta identificar los errores
Antes de pedir ayuda, marca los que encuentres:

- [ ] Error de sintaxis
- [ ] Error de definición
- [ ] Error de lógica/cálculo
- [ ] Error de hardware/conexión

---

## Parte 2: Pedir Ayuda a la IA (15 minutos)

### Prompt para debugging de Arduino

```
Tengo este código de Arduino que no funciona correctamente.

**Hardware:**
- Arduino UNO
- LED conectado al pin 13 (con resistencia 220Ω)
- Sensor LM35 conectado a A0

**Código:**
[Pegar el código aquí]

**Comportamiento esperado:**
- Leer temperatura del LM35
- Mostrar en Serial Monitor
- Encender LED cuando temperatura > 30°C

**Comportamiento actual:**
- El código no compila
- [Agregar otros síntomas observados]

Por favor:
1. Identifica TODOS los errores (sintaxis, lógica, cálculo)
2. Explica por qué cada uno es un error
3. Muestra el código corregido
4. Verifica que los cálculos del LM35 sean correctos
```

### Registra los errores encontrados

| Error # | Línea | Descripción | Tipo | Corrección |
|---------|-------|-------------|------|------------|
| 1 | | | Sintaxis/Lógica | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |

---

## Parte 3: Verificación del Código (10 minutos)

### Antes de cargar al Arduino

**Checklist de seguridad:**
- [ ] Código compila sin errores
- [ ] Pines definidos correctamente
- [ ] Cálculos verificados manualmente
- [ ] Conexiones revisadas en esquemático

### Verificar cálculos del LM35

El LM35 produce 10mV por cada °C.

Con Arduino (5V, ADC 10 bits = 1024 valores):
- Resolución ADC: 5V / 1024 = 4.88mV por unidad
- Para 25°C: LM35 produce 250mV
- Lectura ADC esperada: 250mV / 4.88mV ≈ 51

**Fórmula correcta:**
```
temperatura = (lectura * 5.0 / 1024.0) * 100;
```

### Verifica con valores conocidos

| Temperatura real | Voltaje LM35 | Lectura ADC | ¿Código da correcto? |
|-----------------|--------------|-------------|----------------------|
| 25°C | 250mV | ~51 | |
| 30°C | 300mV | ~61 | |
| 35°C | 350mV | ~72 | |

---

## Parte 4: Simulación (10 minutos)

### Opción A: Wokwi (Online)

1. Ve a [wokwi.com](https://wokwi.com)
2. Crea nuevo proyecto Arduino UNO
3. Agrega LED y potenciómetro (simular LM35)
4. Pega el código corregido
5. Ejecuta y verifica

### Opción B: Arduino IDE + Hardware

1. Conecta el circuito según esquemático
2. Carga el código
3. Abre Serial Monitor (9600 baud)
4. Verifica las lecturas

### Documenta los resultados

```
Plataforma usada: [Wokwi / Arduino real]

Resultados:
- Compilación: [OK / Error: _______]
- Serial Monitor muestra: [temperaturas / nada / basura]
- LED responde: [Sí / No]
- Lecturas precisas: [Sí / No, diferencia de ___°C]
```

---

## Parte 5: Bug Challenge Adicional (10 minutos)

### Código con errores más sutiles

Este código debería controlar la velocidad de un motor DC con PWM según la temperatura:

```cpp
#define MOTOR_PIN 9
#define SENSOR_PIN A0

void setup() {
    Serial.begin(9600);
    pinMode(MOTOR_PIN, OUTPUT);
}

void loop() {
    int temp = leerTemperatura();
    int velocidad;

    // Mapear temperatura a velocidad
    // 20°C = 0%, 40°C = 100%
    velocidad = map(temp, 20, 40, 0, 100);

    // Aplicar PWM
    analogWrite(MOTOR_PIN, velocidad);

    Serial.print("Temp: ");
    Serial.print(temp);
    Serial.print(" | PWM: ");
    Serial.println(velocidad);

    delay(500);
}

int leerTemperatura() {
    int lectura = analogRead(SENSOR_PIN);
    return lectura * 0.48828125; // Conversión directa
}
```

### Errores a encontrar
1. ¿El PWM está en el rango correcto?
2. ¿Qué pasa si la temperatura está fuera del rango 20-40°C?
3. ¿La conversión de temperatura es correcta para LM35?

---

## Template para Debugging de Arduino/Electrónica

Guarda este template:

```
## Debugging de [Microcontrolador]

**Hardware:**
- Microcontrolador: [Arduino UNO/Nano/ESP32/etc.]
- Componentes: [Lista con valores]
- Alimentación: [5V USB / 12V externa / batería]

**Conexiones:**
| Componente | Pin del componente | Pin del Arduino |
|------------|-------------------|-----------------|
| LED | Ánodo | D13 (con R=220Ω) |
| [otro] | | |

**Código:**
```cpp
[Tu código aquí]
```

**Error de compilación (si hay):**
```
[Mensaje exacto del error]
```

**Comportamiento esperado:**
[Descripción detallada]

**Comportamiento actual:**
[Qué hace realmente]

**Mediciones realizadas:**
- Voltaje en pin X: [valor]V
- Continuidad: [OK/No OK]

Por favor:
1. Identifica errores de código
2. Verifica los cálculos
3. Sugiere qué medir para diagnosticar
4. Da el código corregido
```

---

## Entregable

### Código corregido y comentado

Sube tu versión corregida de `control_led_temperatura.ino` con:
- Todos los errores corregidos
- Comentarios explicando cada corrección
- Fórmula de conversión correcta

### Tabla de errores

| Error | Descripción | Por qué es un error | Cómo lo corregí |
|-------|-------------|---------------------|-----------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |

---

## Criterios de Éxito

- [ ] Identificaste al menos 3 errores del código original
- [ ] El código corregido compila sin errores
- [ ] Verificaste los cálculos del LM35 manualmente
- [ ] Probaste en simulador o hardware real
- [ ] Guardaste el template de debugging
- [ ] Completaste el Bug Challenge adicional

---

## Importante: IA + Electrónica

**La IA es muy útil para:**
- Encontrar errores de sintaxis
- Explicar fórmulas y conversiones
- Sugerir mejoras al código

**La IA NO puede:**
- Ver tu circuito físico
- Detectar cables sueltos o mal conectados
- Verificar que los componentes no estén dañados
- Medir voltajes reales

**Siempre verifica:**
- Conexiones con multímetro
- Componentes con datasheet
- Código en simulador antes de hardware real

---

*Ejercicio 1 - Electrónica y Automatización - FPUNA 2026*
