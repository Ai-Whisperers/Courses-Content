# Ejercicio Resuelto: Interpretar Datasheet del LM35

## Objetivo
Usar IA para extraer informacion clave de un datasheet rapidamente.

---

## Prompt del Estudiante

```
Tengo el sensor de temperatura LM35. Necesito saber:
1. Voltaje de operacion
2. Rango de temperatura que mide
3. Como calcular temperatura desde el voltaje de salida
4. Pinout (que pin es cual)

Resumeme en formato tabla.
```

---

## Respuesta Esperada

### Especificaciones del LM35

| Parametro | Valor | Notas |
|-----------|-------|-------|
| **Voltaje de operacion** | 4V - 30V | Tipico: 5V con Arduino |
| **Rango de temperatura** | -55C a +150C | LM35 basico: 0C a 100C |
| **Precision** | ±0.5C a 25C | Tipica |
| **Sensibilidad** | 10mV/°C | Lineal |
| **Corriente de operacion** | 60 µA | Muy bajo consumo |

### Pinout (Vista frontal, lado plano hacia ti)

```
     _____
    |     |
    | LM35|
    |_____|
    |  |  |
    1  2  3

Pin 1: VCC (+5V)
Pin 2: Vout (Salida analogica)
Pin 3: GND
```

### Formula de Conversion

```
Temperatura (°C) = (Voltaje_salida × 1000) / 10
                 = Voltaje_salida × 100

Ejemplo:
- Si Vout = 0.25V (250mV)
- Temperatura = 0.25 × 100 = 25°C
```

### Codigo Arduino

```cpp
const int pinLM35 = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  // Leer valor analogico (0-1023)
  int valorADC = analogRead(pinLM35);

  // Convertir a voltaje (Arduino 5V, 10-bit ADC)
  float voltaje = valorADC * (5.0 / 1023.0);

  // Convertir a temperatura
  float temperatura = voltaje * 100.0;

  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" C");

  delay(1000);
}
```

---

## Comparacion con Buscar en PDF

| Metodo | Tiempo | Precision |
|--------|--------|-----------|
| Buscar en datasheet PDF | 10-15 min | 100% |
| Preguntar a Claude | 30 seg | 95%+ |

**Conclusion**: Usar IA para resumen rapido, verificar en datasheet para valores criticos.

---

## Errores Comunes

| Error | Causa | Solucion |
|-------|-------|----------|
| Lectura de 0°C siempre | Pin de datos mal conectado | Verificar pin 2 a A0 |
| Valores negativos | GND no conectado | Conectar pin 3 a GND |
| Lecturas erraticas | Ruido electrico | Agregar capacitor 100nF |

---

*Ejercicio 1 - Dia 2*
