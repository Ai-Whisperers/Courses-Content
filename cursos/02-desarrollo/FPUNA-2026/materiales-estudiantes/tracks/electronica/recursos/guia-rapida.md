# ⚡ Guía Rápida - Electrónica y Automatización

## FPUNA Verano 2026

---

## Componentes Electrónicos Esenciales

### Resistencias
| Código Color | Valor | Uso Común |
|--------------|-------|-----------|
| Marrón-Negro-Rojo | 1kΩ | Pull-up/down |
| Rojo-Rojo-Marrón | 220Ω | LEDs |
| Marrón-Negro-Naranja | 10kΩ | Divisores |

### Capacitores
| Tipo | Rango | Aplicación |
|------|-------|------------|
| Cerámico | 1pF - 1µF | Desacoplo, filtros |
| Electrolítico | 1µF - 10,000µF | Fuentes, audio |
| Tantalio | 0.1µF - 100µF | Precisión |

---

## Fórmulas Clave

### Ley de Ohm
```
V = I × R
I = V / R
R = V / I
```

### Potencia
```
P = V × I
P = I² × R
P = V² / R
```

### Capacitores en Serie/Paralelo
```
Serie:    1/Ct = 1/C1 + 1/C2 + ...
Paralelo: Ct = C1 + C2 + ...
```

### Resistencias en Serie/Paralelo
```
Serie:    Rt = R1 + R2 + ...
Paralelo: 1/Rt = 1/R1 + 1/R2 + ...
```

### Divisor de Voltaje
```
Vout = Vin × (R2 / (R1 + R2))
```

### Filtro RC
```
fc = 1 / (2π × R × C)
```

---

## Pinout Arduino UNO

```
         +-----[USB]-----+
         |               |
    AREF |               | NC
     GND |               | IOREF
      13 |  [LED]        | RESET
      12 |               | 3.3V
     ~11 |               | 5V
     ~10 |               | GND
      ~9 |               | GND
       8 |               | Vin
         |               |
       7 |               | A0
      ~6 |               | A1
      ~5 |               | A2
       4 |               | A3
      ~3 |               | A4 (SDA)
       2 |               | A5 (SCL)
      TX |               |
      RX |               |
         +---------------+

~ = PWM capable
```

---

## ESP32 Pinout Básico

| Pin | Función | Notas |
|-----|---------|-------|
| GPIO 0 | Boot | Mantener LOW para flash |
| GPIO 2 | LED | LED integrado |
| GPIO 4 | ADC2/Touch | No usar con WiFi |
| GPIO 12-15 | HSPI | SPI rápido |
| GPIO 16-17 | UART2 | Serial adicional |
| GPIO 18-19, 21-23 | VSPI | SPI principal |
| GPIO 25-27 | DAC | Salida analógica |
| GPIO 32-39 | ADC1 | Siempre disponible |

---

## KiCAD Atajos de Teclado

### Esquemático
| Atajo | Acción |
|-------|--------|
| `A` | Agregar símbolo |
| `P` | Agregar power |
| `W` | Wire (cable) |
| `L` | Label |
| `R` | Rotar |
| `M` | Mover |
| `E` | Editar propiedades |
| `Del` | Eliminar |

### PCB
| Atajo | Acción |
|-------|--------|
| `X` | Rutear pista |
| `V` | Via |
| `D` | Arrastrar |
| `U` | Cambiar capa |
| `B` | Rellenar zonas |
| `Ctrl+B` | Vaciar zonas |

---

## Código Arduino Básico

### Estructura Base
```cpp
void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
```

### Lectura Analógica
```cpp
int sensorValue = analogRead(A0);
float voltage = sensorValue * (5.0 / 1023.0);
Serial.println(voltage);
```

### PWM
```cpp
analogWrite(9, 128);  // 50% duty cycle
```

### Interrupción
```cpp
attachInterrupt(digitalPinToInterrupt(2), ISR_function, RISING);
```

---

## Comunicación Serial

### Comandos Básicos
```cpp
Serial.begin(115200);
Serial.print("Texto");
Serial.println("Con salto");
Serial.available();
Serial.read();
```

### I2C
```cpp
#include <Wire.h>
Wire.begin();
Wire.beginTransmission(0x3C);
Wire.write(data);
Wire.endTransmission();
```

### SPI
```cpp
#include <SPI.h>
SPI.begin();
SPI.transfer(data);
```

---

## Símbolos Eléctricos

```
Resistor:     ─/\/\/\─  o  ─[    ]─
Capacitor:    ─||─  (no polarizado)
              ─|+─  (polarizado)
Inductor:     ─^^^^─
Diodo:        ─|>|─
LED:          ─|>|─ (con flechas)
Transistor:   NPN: ─>  PNP: <─
GND:          ┴  o  ⏚
VCC:          ─┬─
```

---

## Unidades y Prefijos

| Prefijo | Símbolo | Valor |
|---------|---------|-------|
| Giga | G | 10⁹ |
| Mega | M | 10⁶ |
| Kilo | k | 10³ |
| mili | m | 10⁻³ |
| micro | µ | 10⁻⁶ |
| nano | n | 10⁻⁹ |
| pico | p | 10⁻¹² |

---

*Guía Rápida - Track 02 - FPUNA 2026*
