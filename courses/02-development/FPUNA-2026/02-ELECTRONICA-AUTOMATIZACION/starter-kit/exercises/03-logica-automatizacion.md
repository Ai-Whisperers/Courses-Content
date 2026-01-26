# Ejercicio 3: Diseño de Lógica de Automatización con IA

## Objetivo
Usar IA para diseñar la lógica de control de sistemas automatizados.

## Duración
50-60 minutos

## Prerrequisitos
- Conocimiento básico de electrónica digital
- Entender conceptos de sensores y actuadores
- Arduino IDE o simulador

## Advertencia de Seguridad

**Este ejercicio involucra lógica de control. Antes de implementar en hardware real:**
- Agrega paradas de emergencia manuales
- Prueba exhaustivamente en simulador
- Considera modos de fallo (¿qué pasa si falla el sensor?)
- Nunca controles equipos peligrosos sin supervisión

---

## Parte 1: El Problema de Automatización (10 minutos)

### Escenario

Debes automatizar un invernadero pequeño con:

**Sensores:**
- Temperatura (LM35)
- Humedad del suelo (sensor capacitivo)
- Luz (LDR)

**Actuadores:**
- Ventilador de extracción (relé)
- Bomba de riego (relé)
- Lámpara de crecimiento (relé)

**Reglas deseadas:**
1. Si temperatura > 30°C → Encender ventilador
2. Si humedad suelo < 40% → Encender bomba por 30 segundos
3. Si luz < 200 lux y hora entre 6:00-20:00 → Encender lámpara
4. No regar si hace menos de 2 horas del último riego
5. Si temperatura < 5°C → Alarma (posible helada)

### El Desafío

¿Cómo escribes la lógica para que:
- No haya conflictos entre reglas?
- Los actuadores no se activen constantemente (histéresis)?
- El sistema sea seguro ante fallos?

---

## Parte 2: Pedir Diseño de Lógica (15 minutos)

### Prompt para diseño de automatización

```
Necesito diseñar la lógica de control para un invernadero automatizado.

**Hardware disponible:**
- Arduino UNO
- Sensor temperatura LM35 (pin A0)
- Sensor humedad suelo capacitivo (pin A1), 0-100%
- LDR para luz (pin A2)
- Módulo relé 4 canales (pines D4, D5, D6, D7)
- RTC DS1307 para hora

**Actuadores (controlados por relés):**
- D4: Ventilador extractor (220V AC)
- D5: Bomba de riego (12V DC)
- D6: Lámpara LED crecimiento (12V DC)
- D7: Buzzer alarma

**Reglas de control:**

1. VENTILACIÓN:
   - Encender si temp > 30°C
   - Apagar si temp < 27°C (histéresis 3°C)

2. RIEGO:
   - Activar bomba si humedad < 40%
   - Regar por 30 segundos
   - Esperar mínimo 2 horas antes de poder regar de nuevo
   - NO regar si temperatura < 10°C (riesgo de helada)

3. ILUMINACIÓN:
   - Encender si luz < 200 lux Y hora entre 6:00-20:00
   - Apagar si luz > 300 lux O hora fuera de rango

4. ALARMA:
   - Activar si temp < 5°C (helada)
   - Activar si temp > 40°C (calor extremo)
   - Activar si humedad suelo > 90% (posible inundación)

**Requisitos de seguridad:**
- Máximo tiempo de bomba encendida: 60 segundos
- Si falla lectura de sensor (valor fuera de rango), desactivar actuador
- Log de eventos en Serial Monitor

Por favor genera:
1. Diagrama de estados para cada subsistema
2. Código Arduino estructurado con funciones separadas
3. Variables para umbrales (fácil de ajustar)
4. Manejo de errores de sensores
5. Comentarios explicando la lógica
```

### Analiza la respuesta

| Aspecto | ¿La IA lo incluyó? | ¿Es correcto? |
|---------|-------------------|---------------|
| Histéresis para evitar oscilación | | |
| Temporizador de 2 horas para riego | | |
| Verificación de horario para luz | | |
| Condiciones de seguridad | | |
| Manejo de errores de sensores | | |
| Código modular con funciones | | |

---

## Parte 3: Verificar la Lógica (15 minutos)

### Casos de prueba

Para cada escenario, verifica que el código hace lo correcto:

**Escenario 1: Día caluroso normal**
- Temp: 32°C
- Humedad suelo: 35%
- Luz: 500 lux
- Hora: 14:00

| Actuador | ¿Debería estar? | ¿Código lo hace? |
|----------|-----------------|------------------|
| Ventilador | ENCENDIDO | |
| Bomba | ENCENDIDA 30s | |
| Lámpara | APAGADA | |
| Alarma | APAGADA | |

**Escenario 2: Noche fría con suelo seco**
- Temp: 8°C
- Humedad suelo: 30%
- Luz: 0 lux
- Hora: 22:00

| Actuador | ¿Debería estar? | ¿Código lo hace? |
|----------|-----------------|------------------|
| Ventilador | | |
| Bomba | NO (temp < 10°C) | |
| Lámpara | NO (fuera horario) | |
| Alarma | | |

**Escenario 3: Fallo de sensor**
- Temp: -50°C (imposible, sensor desconectado)
- Humedad: 105% (fuera de rango)

| Actuador | ¿Debería estar? | ¿Código lo hace? |
|----------|-----------------|------------------|
| Ventilador | APAGADO (seguridad) | |
| Bomba | APAGADA (seguridad) | |
| Alarma | ENCENDIDA | |

### Prueba de histéresis

```
Secuencia de temperatura:
28°C → 29°C → 30°C → 31°C → 30°C → 29°C → 28°C → 27°C → 26°C

¿Cuándo enciende el ventilador? ___°C
¿Cuándo apaga el ventilador? ___°C
¿Oscila entre encendido/apagado? Sí / No
```

---

## Parte 4: Mejorar la Lógica (10 minutos)

### Pide mejoras específicas

```
El código base funciona. Ahora necesito estas mejoras:

1. **Modo Manual:**
   - Agregar botón (pin D2) que alterna entre modo AUTO y MANUAL
   - En MANUAL, los relés se controlan con botones adicionales
   - LED indicador de modo (pin D3)

2. **Registro de datos:**
   - Guardar lecturas cada 5 minutos
   - Almacenar en array circular de 24 horas
   - Calcular promedios diarios

3. **Ajuste adaptativo:**
   - Si el ventilador se enciende más de 6 veces por hora,
     sugerir revisar ventilación pasiva
   - Si la bomba se activa cada 2 horas consistentemente,
     ajustar automáticamente la duración de riego

4. **Comunicación:**
   - Enviar estado por Serial cada 10 segundos
   - Formato: JSON para fácil parseo
   - Ejemplo: {"temp":25.5,"hum":45,"vent":0,"bomba":0}

Mantén el código anterior y agrega estas funciones.
```

---

## Parte 5: Documentar el Sistema (10 minutos)

### Pide documentación

```
Genera documentación técnica del sistema de invernadero:

1. **Diagrama de bloques** (ASCII)
   - Sensores → Arduino → Actuadores
   - Fuentes de alimentación

2. **Tabla de conexiones**
   - Todos los pines con su función

3. **Flowchart de lógica** (ASCII)
   - Proceso de decisión principal

4. **Manual de usuario básico**
   - Cómo interpretar los LEDs
   - Cómo cambiar a modo manual
   - Qué hacer si suena la alarma

5. **Troubleshooting**
   - Problemas comunes y soluciones
```

---

## Template para Diseño de Automatización

```
Necesito diseñar lógica de control para: [SISTEMA]

**Sensores disponibles:**
| Sensor | Tipo | Pin | Rango de medición |
|--------|------|-----|-------------------|
| | | | |

**Actuadores:**
| Actuador | Tipo | Pin | Voltaje/Potencia |
|----------|------|-----|------------------|
| | | | |

**Reglas de control:**
1. SI [condición] ENTONCES [acción]
2. SI [condición] ENTONCES [acción]

**Restricciones:**
- Tiempos mínimos/máximos de activación
- Condiciones de seguridad
- Interbloqueos necesarios

**Requisitos adicionales:**
- [ ] Histéresis para evitar oscilación
- [ ] Manejo de fallos de sensores
- [ ] Modo manual de emergencia
- [ ] Registro de eventos

Por favor genera:
1. Diagrama de estados
2. Código estructurado y comentado
3. Casos de prueba recomendados
```

---

## Lista de Verificación de Seguridad

Antes de implementar cualquier automatización:

### Hardware
- [ ] ¿Hay parada de emergencia física (botón rojo)?
- [ ] ¿Los relés están dimensionados correctamente?
- [ ] ¿Hay fusibles de protección?
- [ ] ¿Las conexiones de alto voltaje están aisladas?

### Software
- [ ] ¿Hay timeout máximo para cada actuador?
- [ ] ¿Qué pasa si el sensor da lectura errónea?
- [ ] ¿Hay watchdog timer por si el programa se cuelga?
- [ ] ¿Se puede forzar apagado manual?

### Lógica
- [ ] ¿Probaste todos los casos límite?
- [ ] ¿Hay conflictos entre reglas?
- [ ] ¿Qué pasa si falla la alimentación y vuelve?
- [ ] ¿El sistema arranca en estado seguro?

---

## Entregable

### Sistema de invernadero documentado

1. **Código completo** (`invernadero.ino`)
   - Funcional y comentado
   - Umbrales configurables
   - Manejo de errores

2. **Diagrama de conexiones**
   - Esquemático o tabla detallada

3. **Tabla de casos de prueba**
   - Mínimo 5 escenarios probados

4. **Manual de operación**
   - 1 página máximo

---

## Criterios de Éxito

- [ ] Diseñaste la lógica con ayuda de IA
- [ ] Verificaste la lógica con casos de prueba
- [ ] Incluiste histéresis donde corresponde
- [ ] Consideraste casos de fallo de sensores
- [ ] Documentaste el sistema
- [ ] Entiendes cada línea del código generado

---

## Advertencia Final

La IA es excelente para diseñar lógica de control, pero:

**NUNCA implementes directamente en:**
- Sistemas de seguridad personal
- Control de equipos industriales
- Sistemas médicos
- Vehículos o drones

**SIEMPRE:**
- Prueba exhaustivamente en simulador
- Agrega protecciones de hardware
- Incluye modos de fallo seguros
- Supervisa las primeras horas de operación

---

*Ejercicio 3 - Electrónica y Automatización - FPUNA 2026*
