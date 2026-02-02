# Día 2: IA para Electrónica y Automatización

## Información General

| Aspecto | Detalle |
|---------|---------|
| **Fecha** | Martes 3 de Febrero, 2026 |
| **Duración** | 2 horas |
| **Audiencia** | Ing. Electrónica, Mecatrónica, Automatización |
| **Pre-requisito** | Día 1 completado con éxito |
| **Objetivo** | Usar IA para diseño de circuitos, firmware y automatización |

---

## Setup Requerido ANTES de Clase

Ver: [SETUP-DIA-02.md](./SETUP-DIA-02.md) para instrucciones completas.

### Resumen Rápido

| Requisito | Obligatorio | Tiempo Estimado |
|-----------|-------------|-----------------|
| Día 1 completado | ✅ Sí | - |
| Arduino IDE 2.x | ✅ Sí | 15 min |
| Drivers CH340/CP2102 | ✅ Sí | 5 min |
| KiCAD 7+ | ⚠️ Recomendado | 20 min |
| Librerías de sensores | ⚠️ Recomendado | 10 min |
| Placa Arduino (física) | ⚠️ Opcional | - |

**Tiempo total de setup adicional**: ~50 minutos

---

## Estructura de la Clase (2 horas)

### Módulo 1: Repaso + Contexto Electrónica (10 min)
- Verificar setup del día anterior
- ¿Cómo se aplica IA en electrónica?
- Casos de uso: firmware, circuitos, debugging

### Módulo 2: IA para Código de Arduino/Firmware (15 min)
- Demo: generar código para sensor de temperatura
- Estructura de prompt para código embebido
- Especificar pines, librerías, plataforma
- Ejercicio: generar código para LED RGB

### Módulo 3: Debugging de Código Embebido (15 min)
- Demo: encontrar errores en código Arduino
- Cómo describir el error a la IA
- Interpretar mensajes de compilación
- Ejercicio: arreglar código con errores

### Break (10 min)

### Módulo 4: IA para Interpretación de Datasheets (15 min)
- Demo: extraer información clave de un datasheet
- Preguntas específicas sobre componentes
- Cálculos de resistencias, capacitores
- Ejercicio: analizar datasheet de sensor

### Módulo 5: Diseño de Circuitos con IA (15 min)
- Demo: diseñar circuito de regulador de voltaje
- Generar listas de componentes
- Verificar diseños con IA
- Introducción a KiCAD + IA

### Módulo 6: Automatización y PLC (15 min)
- Conceptos de lógica ladder
- Demo: generar lógica de automatización
- Temporización y secuencias
- Ejercicio: sistema de riego automático

### Módulo 7: Cierre + Proyecto Mini (15 min)
- Ejercicio integrador: sistema completo simple
- Q&A específico de electrónica
- Recursos para profundizar
- Adelanto del Día 3

---

## Demos y Ejercicios

### Demo Principal: Sensor de Temperatura con LCD
```
Prompt: "Genera código Arduino para leer temperatura
con sensor LM35 en pin A0, mostrar en LCD 16x2 I2C,
y encender LED rojo en pin 13 si supera 30°C"
```

### Ejercicios:
1. **LED RGB**: Control PWM de LED RGB con potenciómetro
2. **Debugging**: Arreglar código de motor DC con errores
3. **Datasheet**: Extraer conexiones de módulo WiFi ESP8266
4. **Automatización**: Lógica para semáforo inteligente

---

## Verificación de Éxito

Al final del Día 2, cada estudiante debe poder:

- [ ] Generar código Arduino funcional con IA
- [ ] Debuggear errores de compilación con ayuda de IA
- [ ] Extraer información de datasheets usando IA
- [ ] Diseñar circuitos simples con asistencia de IA
- [ ] Crear lógica de automatización básica

---

## Materiales Específicos

### Hardware Opcional (para práctica en casa)
- Arduino UNO o compatible
- Protoboard
- LEDs, resistencias básicas
- Sensor de temperatura (LM35 o DHT11)

### Simuladores Online (sin hardware)
- Wokwi: https://wokwi.com/ (Arduino online)
- Tinkercad Circuits: https://www.tinkercad.com/circuits
- Falstad: https://www.falstad.com/circuit/

---

*Día 2 - IA para Electrónica*
*FPUNA Verano 2026*
