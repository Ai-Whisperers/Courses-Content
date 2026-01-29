# Ejercicio 2: Interpretar Datasheets con IA

## Objetivo
Aprender a usar IA para extraer información clave de datasheets técnicos.

## Duración
40-50 minutos

## Prerrequisitos
- Conocimiento básico de electrónica
- Un datasheet descargado (usaremos el LM35)
- Acceso a Claude

## Por Qué Este Ejercicio

Los datasheets son esenciales pero pueden tener 20+ páginas de información técnica. La IA te ayuda a encontrar rápidamente lo que necesitas, pero SIEMPRE debes verificar en el documento original.

---

## Parte 1: El Problema Real (5 minutos)

### Escenario
Necesitas usar un sensor de temperatura LM35 en tu proyecto. El datasheet tiene 13 páginas. Necesitas saber:

1. ¿Qué rango de temperatura mide?
2. ¿Cuánto voltaje necesita para funcionar?
3. ¿Cuántos mV produce por grado?
4. ¿Puedo conectarlo directamente a un Arduino?
5. ¿Hay algo que pueda dañarlo?

### Sin IA
Tiempo estimado leyendo el datasheet completo: 30+ minutos

### Con IA (correctamente)
Tiempo estimado: 5 minutos + verificación

---

## Parte 2: Pedir Resumen a la IA (15 minutos)

### Prompt para interpretar datasheet

```
Necesito entender el datasheet del sensor de temperatura LM35
para usarlo con Arduino UNO.

Por favor dame un resumen práctico que incluya:

1. **Especificaciones eléctricas:**
   - Voltaje de alimentación (mín, típico, máx)
   - Consumo de corriente
   - Voltaje de salida por °C

2. **Rango de operación:**
   - Temperatura mínima y máxima que puede medir
   - Precisión típica

3. **Conexión con Arduino:**
   - ¿Puedo conectar VCC a 5V directamente?
   - ¿Necesito resistencia en la salida?
   - ¿Qué pin de Arduino uso para leer?

4. **Precauciones:**
   - ¿Qué puede dañar el sensor?
   - ¿Es sensible a inversión de polaridad?
   - ¿Necesita capacitor de filtro?

5. **Diagrama de conexión:**
   - Esquema ASCII simple para Arduino UNO

Formato: Tabla resumen + notas importantes
```

### Completa la tabla con la respuesta

| Parámetro | Valor (según IA) | Verificar en datasheet |
|-----------|------------------|------------------------|
| Voltaje alimentación | | Página: ___ |
| Sensibilidad (mV/°C) | | Página: ___ |
| Rango temperatura | | Página: ___ |
| Precisión | | Página: ___ |
| Corriente consumo | | Página: ___ |

---

## Parte 3: Verificación en Datasheet Real (15 minutos)

### Instrucciones

1. Descarga el datasheet del LM35 de Texas Instruments
2. Busca cada valor que la IA te dio
3. Compara y marca discrepancias

### Verificación punto por punto

**1. Voltaje de alimentación:**
- IA dijo: _______________
- Datasheet dice (página ___): _______________
- ¿Coincide? [ ] Sí [ ] No [ ] Aproximado

**2. Sensibilidad:**
- IA dijo: _______________
- Datasheet dice (página ___): _______________
- ¿Coincide? [ ] Sí [ ] No [ ] Aproximado

**3. Rango de temperatura:**
- IA dijo: _______________
- Datasheet dice (página ___): _______________
- ¿Coincide? [ ] Sí [ ] No [ ] Aproximado

### Tabla de precisión por versión

El LM35 tiene varias versiones. ¿La IA mencionó esto?

| Versión | Rango | Precisión |
|---------|-------|-----------|
| LM35 | | |
| LM35A | | |
| LM35C | | |
| LM35CA | | |
| LM35D | | |

---

## Parte 4: Preguntas Específicas (10 minutos)

### Ahora haz preguntas más técnicas

```
Sobre el LM35, tengo estas preguntas específicas:

1. Si necesito medir temperaturas negativas (hasta -40°C),
   ¿cómo debo conectarlo? ¿Necesito resistencia pull-down?

2. La salida del LM35 tiene suficiente corriente para
   conectar directamente a un comparador LM393?

3. ¿Cuál es el tiempo de respuesta del sensor? Si la
   temperatura cambia rápido, ¿cuánto tarda en estabilizarse?

4. En el datasheet mencionan "self-heating". ¿Qué es y
   cómo lo minimizo?

5. ¿Puedo poner el sensor en contacto con agua? ¿Necesita
   encapsulado especial?
```

### Anota las respuestas y verifica

| Pregunta | Respuesta IA | Encontrado en datasheet? | Página |
|----------|--------------|-------------------------|--------|
| Temperaturas negativas | | | |
| Corriente de salida | | | |
| Tiempo de respuesta | | | |
| Self-heating | | | |
| Resistencia al agua | | | |

---

## Parte 5: Diseño de Circuito (10 minutos)

### Pide ayuda para diseñar

```
Necesito diseñar un circuito con estos requerimientos:

**Componentes:**
- Arduino UNO
- LM35DZ (versión que tengo)
- LED que encienda si temperatura > 35°C
- Display de 7 segmentos para mostrar temperatura

**Requerimientos:**
- Alimentación USB (5V)
- Precisión de ±1°C es suficiente
- El LED debe ser visible a 2 metros

Por favor:
1. Lista de componentes con valores específicos
2. Esquema de conexiones
3. Código Arduino básico
4. ¿Necesito agregar filtros o protecciones?
```

### Evalúa la respuesta

| Aspecto | ¿La IA lo incluyó? | ¿Es correcto? |
|---------|-------------------|---------------|
| Resistencia para LED | | |
| Resistencias para 7-seg | | |
| Conexión correcta LM35 | | |
| Código funcional | | |
| Advertencias de seguridad | | |

---

## Template para Interpretar Datasheets

```
Necesito entender el datasheet del [COMPONENTE]
para usarlo en [APLICACIÓN].

**Información crítica que necesito:**
1. Voltaje de operación (mín/máx)
2. Corriente que consume
3. [Parámetro específico del componente]
4. [Otro parámetro]

**Condiciones de mi proyecto:**
- Voltaje disponible: [3.3V / 5V / 12V]
- Microcontrolador: [Arduino / ESP32 / STM32]
- Ambiente: [interior / exterior / industrial]

**Preguntas específicas:**
1. ¿Puedo conectarlo directamente a [pin/componente]?
2. ¿Necesita componentes externos (capacitores, resistencias)?
3. ¿Qué puede dañarlo?

**Formato deseado:**
- Tabla resumen de especificaciones
- Diagrama de conexión básico
- Lista de precauciones

NOTA: Después verificaré todo en el datasheet original.
```

---

## Errores Comunes al Usar IA para Datasheets

### La IA puede equivocarse en:

- [ ] **Versiones del componente:** Dar specs de LM35A cuando tienes LM35D
- [ ] **Condiciones de medición:** El valor "típico" vs "garantizado"
- [ ] **Notas al pie:** Condiciones especiales que cambian los valores
- [ ] **Componentes similares:** Confundir LM35 con LM335 (¡son diferentes!)
- [ ] **Información desactualizada:** Datasheets antiguos vs revisiones nuevas

### Siempre verificar:

1. **Valores absolutos máximos** - Pueden destruir el componente
2. **Pinout** - Un pin mal conectado = componente quemado
3. **Polaridad** - Especialmente en reguladores y sensores
4. **Condiciones de prueba** - Los valores cambian con temperatura/voltaje

---

## Entregable

### Resumen del LM35

Crea una "cheat sheet" de una página con:

```markdown
# LM35 - Resumen Rápido

## Especificaciones Clave
| Parámetro | Valor |
|-----------|-------|
| Alimentación | ___V a ___V |
| Salida | ___mV/°C |
| Rango | ___°C a ___°C |
| Precisión | ±___°C |

## Conexión Arduino UNO
```
[Diagrama ASCII]
```

## Código Básico
```cpp
[Código mínimo funcional]
```

## Precauciones
1. _______________
2. _______________
3. _______________

## ¿Dónde verificar?
Datasheet oficial: [URL]
```

---

## Criterios de Éxito

- [ ] Obtuviste resumen del datasheet con IA
- [ ] Verificaste al menos 5 valores en el datasheet real
- [ ] Identificaste al menos 1 discrepancia o dato incompleto
- [ ] Hiciste preguntas técnicas específicas
- [ ] Creaste tu cheat sheet del LM35
- [ ] Entiendes las limitaciones de usar IA para datasheets

---

## Próximo Paso

Aplica este proceso a otros componentes de tus proyectos:
- Transistores (2N2222, IRF540)
- Reguladores (LM7805, AMS1117)
- Displays (LCD 16x2, OLED)
- Sensores (HC-SR04, DHT22)

---

*Ejercicio 2 - Electrónica y Automatización - FPUNA 2026*
