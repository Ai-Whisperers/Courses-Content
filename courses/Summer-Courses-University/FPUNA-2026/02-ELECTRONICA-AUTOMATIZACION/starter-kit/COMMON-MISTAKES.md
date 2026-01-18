# Errores Comunes con IA - Electrónica y Automatización

## Guía para Evitar los Errores Más Frecuentes

Este documento recopila los errores más comunes que cometen los estudiantes de electrónica al usar IA, con ejemplos específicos y cómo evitarlos.

---

## Error #1: Confiar en Valores de Componentes Sin Verificar

### El Problema
Usar valores de resistencias, capacitores o configuraciones que la IA sugiere sin verificar en el datasheet real.

### Ejemplo Real
```
Prompt: "¿Qué resistencia necesito para un LED con Arduino?"
IA: "Usa una resistencia de 220Ω"

Problema: Sin saber:
- ¿Qué color de LED? (Vf varía: rojo=1.8V, azul=3.2V)
- ¿Cuánta corriente? (5mA vs 20mA cambia el brillo)
- ¿Voltaje de fuente? (3.3V vs 5V)
```

### Cálculo Correcto
```
R = (Vsource - Vled) / Iled

Para LED rojo (Vf=1.8V) con 10mA en Arduino 5V:
R = (5V - 1.8V) / 0.01A = 320Ω → usar 330Ω (valor comercial)

Para LED azul (Vf=3.2V) con 10mA en Arduino 5V:
R = (5V - 3.2V) / 0.01A = 180Ω → usar 180Ω
```

### Cómo Evitarlo
1. **Siempre calcular** usando la fórmula apropiada
2. **Consultar el datasheet** del LED específico
3. **Usar valores comerciales** (E12 o E24)
4. **Verificar potencia**: P = I² × R (¿la resistencia aguanta?)

---

## Error #2: Ignorar Condiciones de Operación

### El Problema
La IA da valores nominales sin considerar temperatura, tolerancia, o condiciones reales de Paraguay.

### Ejemplo Real
```
IA: "El LM35 tiene precisión de ±0.5°C"

Realidad en Paraguay:
- A 40°C ambiente (verano), la precisión puede degradarse
- Si está cerca de otros componentes calientes, se afecta
- La alimentación ruidosa introduce errores
```

### Condiciones a Verificar en Datasheets
| Parámetro | Qué buscar |
|-----------|------------|
| Temperatura de operación | ¿Aguanta el calor de Paraguay? |
| Tolerancia | ¿Es suficiente para tu aplicación? |
| Condiciones de prueba | ¿Son realistas para tu caso? |
| Degradación | ¿Cómo cambia con temperatura? |

### Cómo Evitarlo
1. **Leer la sección "Electrical Characteristics"** completa
2. **Ver las notas al pie** de las tablas de especificaciones
3. **Buscar gráficos** de comportamiento vs temperatura
4. **Agregar márgenes** de seguridad (20-30%)

---

## Error #3: Código de Arduino con Errores Sutiles

### El Problema
La IA genera código que compila pero tiene bugs lógicos o de hardware.

### Ejemplo Real - Problema de Timing
```cpp
// ❌ Código problemático de la IA
void loop() {
    int valor = analogRead(A0);
    Serial.println(valor);
    // Sin delay - inunda el puerto serial
    // y no da tiempo al ADC de estabilizarse
}

// ✅ Código corregido
void loop() {
    int valor = analogRead(A0);
    delay(10);  // Dar tiempo al ADC
    valor = analogRead(A0);  // Segunda lectura más estable
    Serial.println(valor);
    delay(100);  // No saturar el serial
}
```

### Ejemplo Real - Problema de Tipos
```cpp
// ❌ La IA genera
int temperatura = analogRead(A0) * 5.0 / 1023.0 * 100.0;
// temperatura siempre será 0-5 porque int trunca decimales

// ✅ Correcto
float temperatura = analogRead(A0) * 5.0 / 1023.0 * 100.0;
```

### Errores Comunes en Arduino
1. **Tipos incorrectos**: int vs float vs long
2. **Falta de delays**: saturar ADC o serial
3. **Debounce ignorado**: botones que "rebotan"
4. **Pull-up/pull-down**: inputs flotantes
5. **Límites de corriente**: quemar pines (40mA max)

---

## Error #4: Diagramas de Conexión Incorrectos

### El Problema
La IA describe conexiones que son incorrectas o peligrosas.

### Ejemplo Real
```
IA: "Conecta el motor DC directamente al pin 9 del Arduino"

PELIGRO:
- Un motor puede consumir 500mA
- El pin del Arduino soporta máximo 40mA
- Puedes quemar el pin o el microcontrolador
```

### Conexión Correcta
```
Arduino Pin 9 → Resistencia 1kΩ → Base del transistor 2N2222
                                   Colector → Motor → +5V/+12V
                                   Emisor → GND
                                   + Diodo flyback paralelo al motor
```

### Cómo Evitarlo
1. **Verificar límites de corriente** de cada pin
2. **Usar drivers** para cargas > 20mA
3. **Agregar protección** (diodos, fusibles)
4. **Simular primero** en Tinkercad o Proteus

---

## Error #5: No Considerar Ruido y Estabilidad

### El Problema
Diseños que funcionan en simulación pero fallan en la vida real por ruido.

### Ejemplo Real
```
IA: "Usa el ADC del Arduino para medir voltaje de una batería"

Problema en la realidad:
- Sin filtro, las lecturas saltan ±10 unidades
- Cables largos actúan como antenas
- Fuente de alimentación introduce ruido
```

### Soluciones
```cpp
// Filtro de software - promedio móvil
#define MUESTRAS 10
int leerFiltrado() {
    long suma = 0;
    for(int i = 0; i < MUESTRAS; i++) {
        suma += analogRead(A0);
        delay(5);
    }
    return suma / MUESTRAS;
}

// También agregar en hardware:
// - Capacitor 100nF entre señal y GND
// - Mantener cables cortos
// - Separar cables de potencia y señal
```

### Cómo Evitarlo
1. **Agregar capacitores de desacople** (100nF en cada IC)
2. **Filtrar señales analógicas** (hardware y software)
3. **Usar cables cortos** y trenzados si es posible
4. **Separar tierras** analógicas y digitales
5. **Probar en condiciones reales**, no solo en el escritorio

---

## Error #6: Unidades y Conversiones Incorrectas

### El Problema
Mezclar unidades o hacer conversiones incorrectas.

### Ejemplo Real
```
IA: "El sensor mide 0-5V que corresponde a 0-100°C"

Conversión del estudiante:
temperatura = valorADC * 100 / 1023;  // ❌ INCORRECTO

¿Por qué está mal?
- valorADC va de 0 a 1023 (no 0 a 5V)
- Primero convertir a voltaje, luego a temperatura
```

### Conversión Correcta
```cpp
// Paso 1: ADC → Voltaje
float voltaje = valorADC * 5.0 / 1023.0;

// Paso 2: Voltaje → Temperatura (según datasheet del sensor)
// Para LM35: 10mV/°C
float temperatura = voltaje / 0.01;  // = voltaje * 100
```

### Tabla de Conversiones Comunes
| ADC 10-bit | Voltaje (5V ref) | Voltaje (3.3V ref) |
|------------|------------------|-------------------|
| 0 | 0V | 0V |
| 512 | 2.5V | 1.65V |
| 1023 | 5V | 3.3V |

---

## Error #7: Ignorar Histéresis en Control

### El Problema
Sistemas de control que oscilan porque no tienen histéresis.

### Ejemplo Real
```cpp
// ❌ Sin histéresis - va a oscilar
if (temperatura > 25) {
    digitalWrite(VENTILADOR, HIGH);
} else {
    digitalWrite(VENTILADOR, LOW);
}
// A 25.0°C → ON, a 24.9°C → OFF, a 25.0°C → ON...
// El ventilador prende y apaga constantemente

// ✅ Con histéresis
if (temperatura > 26) {  // Punto superior
    digitalWrite(VENTILADOR, HIGH);
} else if (temperatura < 24) {  // Punto inferior
    digitalWrite(VENTILADOR, LOW);
}
// Entre 24 y 26, mantiene estado anterior
```

### Cómo Evitarlo
1. **Siempre usar histéresis** en control on/off
2. **Definir banda muerta**: típicamente ±1-2% del rango
3. **Considerar tiempo mínimo** entre cambios de estado
4. **Documentar los puntos** de activación/desactivación

---

## Error #8: PWM con Frecuencia Incorrecta

### El Problema
Usar PWM sin considerar la frecuencia necesaria para la aplicación.

### Ejemplo Real
```
IA: "Usa analogWrite() para controlar el LED"

Problema: analogWrite() en Arduino Uno usa ~490Hz o ~980Hz
- Para LEDs: OK
- Para motores DC: puede causar ruido audible
- Para servos: completamente incorrecto (necesitan 50Hz)
```

### Frecuencias PWM por Aplicación
| Aplicación | Frecuencia Recomendada |
|------------|------------------------|
| LEDs | 1-10 kHz |
| Motores DC | 10-20 kHz (ultrasónico) |
| Servos | 50 Hz |
| Fuentes switching | 100+ kHz |
| Audio | 40+ kHz |

### Cómo Evitarlo
1. **Verificar requisitos** del dispositivo controlado
2. **Cambiar frecuencia PWM** si es necesario (modificar registros)
3. **Usar bibliotecas especializadas** (Servo, PWMFrequency)
4. **Medir con osciloscopio** si es posible

---

## Error #9: Alimentación Insuficiente o Ruidosa

### El Problema
Ignorar los requisitos de alimentación del circuito.

### Ejemplo Real
```
IA: "Conecta el servo al pin de 5V del Arduino"

Problema:
- Un servo puede consumir 500mA-1A
- El regulador del Arduino (USB) da máximo ~500mA
- Al mover el servo, el Arduino se reinicia
```

### Solución
```
                    ┌─────────┐
Batería 6V ────────┤  7805   ├───── +5V para servos
                    └────┬────┘
                         │
                         └──────── GND común con Arduino

Arduino alimentado por separado (USB o jack)
Solo compartir GND, no compartir +5V
```

### Cómo Evitarlo
1. **Calcular consumo total** antes de armar
2. **Separar alimentación** de potencia y lógica
3. **Agregar capacitores** de filtro (100µF en alimentación)
4. **Usar fuentes adecuadas** (no el USB para motores)

---

## Error #10: No Usar Pull-up/Pull-down

### El Problema
Inputs digitales flotantes que leen valores aleatorios.

### Ejemplo Real
```cpp
// ❌ Botón sin pull-up
pinMode(BOTON, INPUT);
// Si el botón no está presionado, el pin está "flotando"
// Lee valores aleatorios (0 y 1 mezclados)

// ✅ Con pull-up interno
pinMode(BOTON, INPUT_PULLUP);
// Botón conectado entre pin y GND
// No presionado = HIGH, presionado = LOW
```

### Configuraciones Comunes
```
Con INPUT_PULLUP:
    +5V
     │
    [R] 20-50kΩ (interno)
     │
     ├──── Pin digital
     │
    [S] Botón
     │
    GND

Lógica: Presionado = LOW, Suelto = HIGH
```

### Cómo Evitarlo
1. **Nunca dejar inputs flotando**
2. **Usar INPUT_PULLUP** para botones
3. **Agregar pull-down externo** si se necesita lógica positiva
4. **Verificar con multímetro** el estado del pin

---

## Error #11: Código de Bibliotecas Obsoletas

### El Problema
La IA sugiere bibliotecas viejas o deprecadas.

### Ejemplo Real
```cpp
// ❌ Biblioteca vieja para WiFi
#include <ESP8266WiFi.h>  // Solo para ESP8266

// ✅ Biblioteca moderna unificada
#include <WiFi.h>  // Funciona con ESP32 y ESP8266 (con boards actualizados)
```

### Bibliotecas a Verificar
| Vieja | Nueva/Recomendada |
|-------|-------------------|
| LiquidCrystal | LiquidCrystal_I2C |
| DHT.h (Adafruit vieja) | DHT.h (última versión) |
| Servo.h (problemas con ESP) | ESP32Servo.h |

### Cómo Evitarlo
1. **Verificar fecha** de última actualización en GitHub
2. **Leer issues** para problemas conocidos
3. **Preferir bibliotecas oficiales** de Arduino
4. **Buscar alternativas** si hay problemas

---

## Error #12: Ignorar Limitaciones del Hardware

### El Problema
Diseñar sin considerar las limitaciones físicas del microcontrolador.

### Limitaciones Comunes de Arduino Uno
| Recurso | Límite |
|---------|--------|
| RAM | 2 KB |
| Flash | 32 KB (28 KB usables) |
| EEPROM | 1 KB |
| ADC | 10 bits, 6 canales |
| PWM | 6 pines |
| Interrupciones | 2 externas |
| I/O corriente | 40 mA por pin, 200 mA total |

### Ejemplo de Problema
```cpp
// ❌ Esto no va a funcionar
char buffer[5000];  // 5KB > 2KB de RAM
```

### Cómo Evitarlo
1. **Conocer el hardware** que estás usando
2. **Usar PROGMEM** para strings constantes
3. **Optimizar uso de memoria** (usar byte en vez de int cuando sea posible)
4. **Considerar hardware más capaz** si es necesario (ESP32)

---

## Checklist Anti-Errores para Electrónica

### Antes de Armar
- [ ] ¿Verifiqué valores en datasheets?
- [ ] ¿Calculé consumos de corriente?
- [ ] ¿La fuente de alimentación es adecuada?
- [ ] ¿Agregué protecciones necesarias?

### Durante el Armado
- [ ] ¿Los valores de componentes son correctos?
- [ ] ¿Hay capacitores de desacople?
- [ ] ¿Los cables son cortos y ordenados?
- [ ] ¿Las conexiones de tierra son sólidas?

### Antes de Energizar
- [ ] ¿Revisé polaridades (LEDs, capacitores)?
- [ ] ¿No hay cortocircuitos?
- [ ] ¿El voltaje es el correcto?

### Con el Código
- [ ] ¿Los tipos de datos son correctos?
- [ ] ¿Hay delays apropiados?
- [ ] ¿Las conversiones están bien?
- [ ] ¿Hay manejo de errores?

---

## Recursos de Verificación

### Simuladores
- [Tinkercad Circuits](https://www.tinkercad.com/circuits) - Básico
- [Wokwi](https://wokwi.com/) - Arduino y ESP32
- Proteus - Profesional

### Datasheets
- [Alldatasheet](https://www.alldatasheet.com/)
- [Datasheet Archive](https://www.datasheetarchive.com/)

### Calculadoras
- [LED Resistor Calculator](https://www.digikey.com/en/resources/conversion-calculators/conversion-calculator-led-series-resistor)
- [Voltage Divider Calculator](https://ohmslawcalculator.com/voltage-divider-calculator)

---

*Guía de errores comunes - Electrónica y Automatización - FPUNA 2026*
