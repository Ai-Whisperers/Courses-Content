# ⚡ Starter Kit: IA para Electrónica y Automatización

## Bienvenido/a

Este kit te enseña a usar IA como asistente para proyectos de electrónica: interpretar datasheets, debuggear código de Arduino, y diseñar sistemas de automatización - siempre verificando con las especificaciones reales.

---

## 🚀 Quick Start (10 minutos)

### Paso 1: Verificá requisitos
Abrí [PREREQUISITES.md](./PREREQUISITES.md) - necesitás Arduino IDE y conocimientos básicos.

### Paso 2: ⚠️ Advertencias de seguridad
Leé [SAFETY-WARNINGS.md](./SAFETY-WARNINGS.md) - **errores con electricidad pueden causar daño físico**.

### Paso 3: Tu primer debug de Arduino
Andá a [exercises/01-debugger-arduino.md](./exercises/01-debugger-arduino.md) y encontrá los bugs.

---

## 📁 Contenido del Kit

### 📋 Documentos Base
| Archivo | Descripción | Prioridad |
|---------|-------------|-----------|
| [PREREQUISITES.md](./PREREQUISITES.md) | Requisitos técnicos | ⭐⭐⭐ Leer primero |
| [SAFETY-WARNINGS.md](./SAFETY-WARNINGS.md) | Seguridad eléctrica | ⭐⭐⭐ **CRÍTICO** |
| [VERIFICATION-CHECKLIST.md](./VERIFICATION-CHECKLIST.md) | Checklist antes de armar | ⭐⭐ Referencia |
| [COMMON-MISTAKES.md](./COMMON-MISTAKES.md) | 12 errores comunes | ⭐⭐ Referencia |
| [20-IDEAS.md](./20-IDEAS.md) | 20 proyectos de práctica | ⭐ Inspiración |
| [CLAUDE.md](./CLAUDE.md) | Template de contexto | ⭐ Para proyectos |

### 📝 Ejercicios Prácticos
| Ejercicio | Tema | Duración | Dificultad |
|-----------|------|----------|------------|
| [01-debugger-arduino.md](./exercises/01-debugger-arduino.md) | Debug de código Arduino | 60 min | 🟢 Principiante |
| [02-interpretar-datasheet.md](./exercises/02-interpretar-datasheet.md) | Extraer info de datasheets | 45 min | 🟡 Intermedio |
| [03-logica-automatizacion.md](./exercises/03-logica-automatizacion.md) | Diseñar sistema de control | 90 min | 🟡 Intermedio |

### 📚 Ejemplos Completados
| Ejemplo | Qué muestra |
|---------|-------------|
| [ejemplo-datasheet-lm35.md](./examples/ejemplo-datasheet-lm35.md) | Cheat sheet del sensor LM35 |
| [ejemplo-automatizacion-riego.md](./examples/ejemplo-automatizacion-riego.md) | Sistema de riego automático completo |

---

## 🎓 Ruta de Aprendizaje

```
Sesión 1: Debug de Código (2 horas)
├── 📖 PREREQUISITES.md + SAFETY-WARNINGS.md
├── ✏️ Ejercicio 01: Debug Arduino
└── 🔍 Revisar COMMON-MISTAKES.md (errores de código)

Sesión 2: Datasheets (2 horas)
├── ✏️ Ejercicio 02: Interpretar datasheet
├── 📖 Revisar ejemplo LM35
└── 🔍 VERIFICATION-CHECKLIST.md

Sesión 3: Automatización (3 horas)
├── ✏️ Ejercicio 03: Sistema de control
├── 📖 Revisar ejemplo de riego
└── 🎯 Elegir proyecto de 20-IDEAS.md
```

---

## ⚠️ ADVERTENCIAS DE SEGURIDAD

### Antes de conectar CUALQUIER circuito:

| Verificación | Por qué |
|--------------|---------|
| ¿Voltajes correctos? | Puede quemar componentes o causar incendio |
| ¿Polaridad correcta? | LEDs y capacitores explotan si se conectan al revés |
| ¿Corriente limitada? | Sin resistencia, el Arduino se daña |
| ¿No hay cortocircuitos? | Puede dañar la fuente o causar fuego |

### La IA puede equivocarse en:
- Valores de resistencias/capacitores
- Conexiones de pines
- Límites de corriente
- Polaridad de componentes

**SIEMPRE verificar con el DATASHEET real antes de armar.**

---

## 💡 Prompts Efectivos para Electrónica

### Para Interpretar Datasheets
```
Estoy usando el sensor [MODELO] con Arduino Uno.
Del datasheet necesito saber:
1. Voltaje de alimentación
2. Rango de medición
3. Fórmula de conversión
4. Conexiones recomendadas

Luego dame un código de ejemplo básico.
```

### Para Debug de Arduino
```
Tengo este código Arduino que debería [DESCRIPCIÓN]:

```cpp
[CÓDIGO]
```

Hardware conectado:
- [Lista de componentes y pines]

El problema es: [DESCRIPCIÓN DEL PROBLEMA]

¿Qué puede estar mal?
```

### Para Diseño de Automatización
```
Necesito diseñar un sistema de [DESCRIPCIÓN] con Arduino.

Requisitos:
- Sensores: [lista]
- Actuadores: [lista]
- Lógica: [descripción del comportamiento]

Dame:
1. Diagrama de conexiones
2. Pseudocódigo de la lógica
3. Código Arduino comentado
4. Consideraciones de seguridad
```

---

## 🔧 Verificación de Valores

### Nunca confíes en valores de la IA. Verificá:

| Parámetro | Dónde verificar |
|-----------|-----------------|
| Resistencias para LEDs | Calcular: R = (Vsource - Vled) / I |
| Voltaje de sensores | Datasheet del sensor |
| Corriente de motores | Datasheet del motor |
| Pines de Arduino | Documentación de Arduino |

### Calculadoras útiles
- [LED Resistor Calculator](https://www.digikey.com/en/resources/conversion-calculators/conversion-calculator-led-series-resistor)
- [Voltage Divider Calculator](https://ohmslawcalculator.com/voltage-divider-calculator)

---

## 📊 Checklist Pre-Armado

Antes de conectar tu circuito:

### Diseño
- [ ] ¿Verifiqué valores en datasheets?
- [ ] ¿Calculé corrientes y resistencias?
- [ ] ¿La fuente de alimentación es adecuada?

### Conexiones
- [ ] ¿Polaridades correctas (LEDs, capacitores)?
- [ ] ¿No hay cortocircuitos?
- [ ] ¿Cables bien conectados?

### Código
- [ ] ¿Pines correctos?
- [ ] ¿Delays apropiados?
- [ ] ¿Tipos de datos correctos?

### Antes de energizar
- [ ] ¿Revisé todo una vez más?
- [ ] ¿Tengo forma de desconectar rápido?

---

## 🔌 Límites del Arduino Uno

| Recurso | Límite | Consecuencia si excedes |
|---------|--------|------------------------|
| Corriente por pin | 40 mA | Quema el pin |
| Corriente total | 200 mA | Daña el microcontrolador |
| Voltaje de entrada | 5V (pines) | Daño permanente |
| RAM | 2 KB | Programa se cuelga |

---

## 🛠️ Herramientas Recomendadas

### Software
- **Arduino IDE** - Programación
- **Tinkercad Circuits** - Simulación online gratuita
- **Wokwi** - Simulador avanzado
- **Fritzing** - Diagramas de circuitos

### Hardware recomendado para practicar
- Arduino Uno o compatible
- Protoboard
- LEDs, resistencias variadas
- Sensor de temperatura (LM35 o DHT11)
- Motor DC pequeño + transistor

---

## ❓ FAQ

**¿Puedo confiar en los diagramas que genera la IA?**
No completamente. Siempre verificá conexiones con datasheets y documentación oficial.

**¿Qué pasa si conecto algo mal?**
Puede dañar componentes, el Arduino, o en casos extremos causar cortocircuitos peligrosos. Por eso es crítico verificar antes de energizar.

**¿La IA conoce todos los sensores?**
Conoce los populares, pero puede confundir modelos similares o dar datos de versiones diferentes. Siempre verificá con el datasheet de TU componente.

---

## 🔗 Recursos

- [Arduino Reference](https://www.arduino.cc/reference/en/)
- [Tinkercad Circuits](https://www.tinkercad.com/circuits)
- [All Datasheets](https://www.alldatasheet.com/)
- [Electronics Tutorials](https://www.electronics-tutorials.ws/)

---

*Starter Kit - Electrónica y Automatización - FPUNA 2026*
