# Prerrequisitos - Antes de Usar IA para Electrónica

## Conocimientos CRÍTICOS antes de trabajar con hardware

---

## ⚠️ ADVERTENCIA DE SEGURIDAD ⚠️

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   LA ELECTRICIDAD PUEDE MATAR                               │
│                                                              │
│   La IA puede generar circuitos incorrectos que:            │
│   • Causen cortocircuitos y fuego                           │
│   • Destruyan componentes costosos                          │
│   • Provoquen descargas eléctricas                          │
│   • Dañen permanentemente tu microcontrolador               │
│                                                              │
│   NUNCA conectes un circuito sin verificarlo primero.       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Conocimientos Eléctricos Fundamentales

### 1. Ley de Ohm (Obligatorio)

```
V = I × R

Donde:
V = Voltaje (Volts)
I = Corriente (Amperes)
R = Resistencia (Ohms)
```

**Debes poder calcular SIN calculadora:**
- Si tengo 5V y 1kΩ, ¿cuánta corriente fluye?
- Si un LED necesita 20mA y tengo 5V con Vf=2V, ¿qué resistencia uso?
- Si consumo 500mA a 3.3V, ¿cuántos Watts disipo?

### 2. Potencia

```
P = V × I
P = I² × R
P = V² / R
```

**¿Por qué importa?**
- Componentes tienen límites de potencia
- Exceder = calor = fuego o falla
- Las baterías tienen capacidad limitada (mAh)

### 3. Divisor de Voltaje

```
           R1
    Vin ───┴─── Vout
              │
           R2
              │
            GND

Vout = Vin × (R2 / (R1 + R2))
```

**Cuándo usarlo:**
- Adaptar señales de 5V a 3.3V
- Leer sensores con salida analógica

---

## Conocimiento de Componentes

### Componentes que Debes Reconocer

| Componente | Símbolo | Función | Polaridad |
|------------|---------|---------|-----------|
| Resistor | ─/\/\/─ | Limita corriente | No |
| Capacitor | ─\|\|─ | Almacena carga | Electrolítico: Sí |
| LED | ─▷\|─ | Emite luz | Sí (ánodo +, cátodo -) |
| Diodo | ─▷\|─ | Permite flujo en un sentido | Sí |
| Transistor | NPN/PNP | Amplifica/switchea | Sí (BCE) |
| Regulador | 7805, LM1117 | Regula voltaje | Sí (In, GND, Out) |

### Cómo Leer Valores de Resistencias

**Código de colores (4 bandas):**
```
Negro=0, Marrón=1, Rojo=2, Naranja=3, Amarillo=4
Verde=5, Azul=6, Violeta=7, Gris=8, Blanco=9

Banda 1: Primer dígito
Banda 2: Segundo dígito
Banda 3: Multiplicador (10^n)
Banda 4: Tolerancia (dorado=5%, plateado=10%)

Ejemplo: Marrón-Negro-Rojo-Dorado = 10 × 10² = 1kΩ ±5%
```

---

## Conocimiento de Microcontroladores

### Conceptos que Debes Dominar

| Concepto | Qué es | Por qué importa |
|----------|--------|-----------------|
| GPIO | Pin de entrada/salida | Controlar/leer señales |
| PWM | Modulación de ancho de pulso | Controlar velocidad/brillo |
| ADC | Conversor analógico-digital | Leer sensores analógicos |
| I2C | Protocolo de 2 hilos | Comunicar con sensores |
| SPI | Protocolo de 4 hilos | Comunicar más rápido |
| UART/Serial | Comunicación serie | Debug, GPS, módulos |
| Interrupciones | Eventos asíncronos | Responder inmediatamente |

### Límites Críticos

**Arduino Uno:**
- Voltaje lógico: 5V
- Corriente máxima por pin: 40mA (recomendado: 20mA)
- Corriente total máxima: 200mA
- Pines ADC: 6 (10-bit, 0-1023)
- Pines PWM: 6 (pines 3, 5, 6, 9, 10, 11)

**ESP32:**
- Voltaje lógico: 3.3V (¡NO 5V tolerante!)
- Corriente máxima por pin: 12mA
- Pines ADC: múltiples (12-bit, 0-4095)
- WiFi y Bluetooth integrado

---

## Habilidades Prácticas

### 1. Uso del Multímetro

Debes saber medir:
- [ ] Voltaje DC y AC
- [ ] Corriente (en serie)
- [ ] Resistencia
- [ ] Continuidad
- [ ] Diodos (prueba)

### 2. Uso del Protoboard

```
Conexiones internas del protoboard:

  + + + + + + + + + + + + +   ← Riel de alimentación (horizontal)
  - - - - - - - - - - - - -   ← Riel de tierra (horizontal)

  a b c d e   f g h i j       ← Filas conectadas verticalmente
  ● ● ● ● ●   ● ● ● ● ●         (a-e conectados, f-j conectados)
  ● ● ● ● ●   ● ● ● ● ●         Separación central aísla
  ● ● ● ● ●   ● ● ● ● ●
```

### 3. Lectura de Datasheets

Debes poder encontrar:
- [ ] Voltaje de operación
- [ ] Corriente máxima
- [ ] Pinout / diagrama de pines
- [ ] Condiciones de operación
- [ ] Ejemplos de circuito

---

## Conocimiento de Software Embebido

### Estructura de Programa Arduino

```cpp
// Variables globales
int ledPin = 13;

void setup() {
    // Se ejecuta UNA vez al inicio
    pinMode(ledPin, OUTPUT);
    Serial.begin(9600);
}

void loop() {
    // Se ejecuta INFINITAMENTE
    digitalWrite(ledPin, HIGH);
    delay(1000);
    digitalWrite(ledPin, LOW);
    delay(1000);
}
```

### Funciones Básicas que Debes Conocer

```cpp
// Digital
pinMode(pin, INPUT/OUTPUT/INPUT_PULLUP)
digitalWrite(pin, HIGH/LOW)
digitalRead(pin)

// Analógico
analogRead(pin)     // 0-1023 en Arduino, 0-4095 en ESP32
analogWrite(pin, value)  // PWM: 0-255

// Tiempo
delay(ms)
delayMicroseconds(us)
millis()
micros()

// Serial
Serial.begin(baudrate)
Serial.print() / Serial.println()
Serial.read() / Serial.available()
```

---

## Auto-Evaluación

### Test Teórico (responder sin ayuda)

1. Tengo un LED que necesita 20mA con Vf=2V. Con fuente de 5V, ¿qué resistencia uso?

2. ¿Qué pasa si conecto un sensor de 5V a un ESP32 directamente?

3. ¿Cuál es la diferencia entre I2C y SPI?

4. ¿Por qué no debo usar delay() en código con interrupciones?

5. ¿Qué significa que un pin sea "open drain"?

### Test Práctico (hacer sin IA)

1. Medir el voltaje de una batería con multímetro
2. Hacer parpadear un LED con resistencia correcta
3. Leer un potenciómetro y mostrar en Serial
4. Conectar un sensor I2C y leer datos
5. Controlar un servo con PWM

---

## Recursos para Aprender Prerrequisitos

### Electrónica Básica
- "The Art of Electronics" - Horowitz & Hill
- "Make: Electronics" - Charles Platt (muy práctico)
- Canal YouTube: GreatScott!, ElectroBOOM (con precaución)

### Arduino/Microcontroladores
- Documentación oficial de Arduino
- "Programming Arduino" - Simon Monk
- Curso de Arduino de Coursera

### Herramientas
- Tinkercad Circuits (simulador online gratuito)
- Wokwi (simulador ESP32/Arduino online)
- Fritzing (diagramas de circuito)

---

## Tiempo Estimado para Prerrequisitos

| Tu nivel | Tiempo para estar listo |
|----------|------------------------|
| Sin experiencia eléctrica | 2-3 meses de estudio + práctica |
| Algo de experiencia | 2-4 semanas de refuerzo |
| Experiencia con Arduino básico | 1 semana de repaso |

---

*00-PREREQUISITES.md - Track 02 Electrónica - FPUNA 2026*
