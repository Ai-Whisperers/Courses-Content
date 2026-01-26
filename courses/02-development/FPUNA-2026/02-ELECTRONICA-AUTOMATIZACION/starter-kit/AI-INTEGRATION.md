# AI-INTEGRATION.md - Integración de IA en Proyectos de Electrónica

## Cómo la IA Potencia el Desarrollo de Hardware

---

## Niveles de Integración

### Nivel 1: Asistente de Consulta
La IA responde preguntas y proporciona información técnica.

**Casos de uso:**
- Interpretar datasheets
- Calcular valores de componentes
- Explicar protocolos de comunicación
- Resolver errores de compilación

### Nivel 2: Co-diseñador Activo
La IA participa en el diseño generando código y esquemas.

**Casos de uso:**
- Generar código para nuevos sensores
- Diseñar filtros y circuitos
- Crear diagramas de conexión
- Optimizar consumo de energía

### Nivel 3: Automatización Inteligente
La IA automatiza tareas repetitivas del desarrollo.

**Casos de uso:**
- Generación de librerías personalizadas
- Conversión entre plataformas
- Generación de documentación
- Análisis de señales

---

## Flujo de Trabajo con IA

```
┌─────────────────────────────────────────────────────────────┐
│                   CICLO DE DESARROLLO                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│   │  DISEÑO  │───▶│  CÓDIGO  │───▶│  PRUEBA  │             │
│   │          │    │          │    │          │             │
│   │ IA ayuda │    │ IA genera│    │ IA debug │             │
│   │ calcular │    │ templates│    │ analiza  │             │
│   │ y elegir │    │ y drivers│    │ errores  │             │
│   └──────────┘    └──────────┘    └──────────┘             │
│        │                               │                    │
│        │         ┌──────────┐          │                    │
│        └────────▶│ INTEGRAR │◀─────────┘                    │
│                  │          │                               │
│                  │ IA genera│                               │
│                  │ docs y   │                               │
│                  │ optimiza │                               │
│                  └──────────┘                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Integración por Fase de Proyecto

### Fase 1: Diseño Conceptual

| Tarea | Cómo usar IA | Prompt ejemplo |
|-------|--------------|----------------|
| Selección de MCU | Comparar opciones | "Compara Arduino Nano vs ESP32 para proyecto IoT con 5 sensores" |
| Selección de sensores | Recomendar por requisitos | "Recomienda sensor de distancia para rango 5cm-3m, precisión 1cm" |
| Cálculo de componentes | Calcular valores | "Calcula resistencia pull-up para I2C a 400kHz" |
| Esquemático inicial | Generar conexiones | "Diagrama de conexión para DHT22 con ESP32" |

### Fase 2: Desarrollo de Código

| Tarea | Cómo usar IA | Prompt ejemplo |
|-------|--------------|----------------|
| Driver de sensor | Generar código | "Código Arduino para leer BMP280 por I2C" |
| Protocolo de comunicación | Implementar | "Implementa protocolo MQTT para enviar JSON" |
| Máquina de estados | Diseñar FSM | "FSM para sistema de riego automático" |
| Interfaz de usuario | Crear menús | "Menú LCD con encoder rotativo" |

### Fase 3: Testing y Debug

| Tarea | Cómo usar IA | Prompt ejemplo |
|-------|--------------|----------------|
| Análisis de errores | Interpretar | "Error: 'Guru Meditation Error' en ESP32, qué significa?" |
| Validación de señales | Calcular esperados | "Frecuencia PWM para servo de 50Hz" |
| Optimización | Mejorar código | "Optimiza este código para menor consumo" |
| Test unitario | Generar tests | "Tests para verificar lectura de sensores" |

### Fase 4: Documentación

| Tarea | Cómo usar IA | Prompt ejemplo |
|-------|--------------|----------------|
| README | Generar completo | "README para proyecto de estación meteorológica" |
| BOM | Lista de materiales | "Genera BOM con precios estimados" |
| Manual de usuario | Documentar | "Manual de uso para este sistema de alarma" |
| Troubleshooting | Crear guía | "Guía de problemas comunes y soluciones" |

---

## Configuración del Entorno con IA

### CLAUDE.md para Proyectos de Electrónica

El archivo CLAUDE.md debe incluir:

```markdown
# Proyecto: [Nombre]

## Hardware
- MCU: [modelo exacto]
- Sensores: [lista con modelos]
- Actuadores: [lista]

## Pinout
| Componente | Pin MCU | Notas |
|------------|---------|-------|
| DHT22 DATA | GPIO4   | Pull-up 4.7k |
| Relay      | GPIO5   | Activo LOW |

## Librerías
- [nombre]: versión [X]

## Reglas
- Usar tipos explícitos (uint8_t, etc.)
- Comentarios en español
- Validar lecturas antes de usar
```

### Extensiones de IDE Recomendadas

**VS Code + PlatformIO:**
- Claude Code para asistencia
- PlatformIO IDE
- Serial Monitor
- Wokwi Simulator (simulación)

**Arduino IDE:**
- Claude Code externo
- Serial Plotter

---

## Patrones de Uso de IA

### Patrón 1: Interpret-Then-Code
```
1. Pegar fragmento de datasheet
2. "Explica este registro y cómo configurarlo"
3. "Genera código para configurar según explicaste"
```

### Patrón 2: Error-Driven Development
```
1. Encontrar error en compilación/ejecución
2. "Explica este error: [error completo]"
3. "Corrige mi código: [código con error]"
```

### Patrón 3: Progressive Enhancement
```
1. "Código básico para leer sensor X"
2. "Agrega promediado de lecturas"
3. "Agrega filtro de Kalman"
4. "Agrega detección de outliers"
```

### Patrón 4: Platform Migration
```
1. "Tengo este código para Arduino Uno"
2. "Convierte a ESP32 manteniendo funcionalidad"
3. "Agrega WiFi para enviar datos"
```

---

## Integración con Herramientas

### Simuladores

**Wokwi (Simulador Online)**
```bash
claude "Genera diagrama Wokwi JSON para:
- ESP32
- DHT22 en GPIO4
- LED en GPIO2
- Botón en GPIO0

Con código funcional incluido"
```

**Proteus/Multisim**
```bash
claude "Genera netlist para simular en Proteus:
- Arduino Uno
- Puente H L298N
- Motor DC
- Potenciómetro de control"
```

### Analizadores

**Lógico (Saleae/similar)**
```bash
claude "Interpreta esta captura I2C:
SDA: [datos hexadecimales]
SCL: [timestamps]

¿Qué dispositivo es y qué está comunicando?"
```

**Osciloscopio**
```bash
claude "Señal PWM medida:
- Frecuencia: 490 Hz
- Duty cycle: 75%
- Voltaje pico: 4.8V

¿Es correcto para controlar servo? ¿Qué ajustar?"
```

---

## MCP Servers Útiles para Electrónica

### Filesystem
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-filesystem",
               "/ruta/a/proyecto",
               "/ruta/a/librerias"]
    }
  }
}
```

### Sequential Thinking (para diseño)
```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-sequential-thinking"]
    }
  }
}
```

---

## Métricas de Productividad

### Sin IA
| Tarea | Tiempo típico |
|-------|---------------|
| Leer datasheet nuevo | 2-4 horas |
| Implementar driver sensor | 3-6 horas |
| Debug comunicación I2C | 2-4 horas |
| Crear documentación | 2-3 horas |

### Con IA
| Tarea | Tiempo con IA | Reducción |
|-------|---------------|-----------|
| Leer datasheet nuevo | 30-60 min | 70-80% |
| Implementar driver sensor | 30-90 min | 75-85% |
| Debug comunicación I2C | 15-60 min | 75-90% |
| Crear documentación | 15-30 min | 85-90% |

---

## Limitaciones y Precauciones

### La IA NO puede:
- Medir señales físicas (necesitas instrumentos)
- Garantizar que el circuito funcione (debes probar)
- Conocer el estado actual de tu hardware
- Ver errores que no le muestres

### Siempre verificar:
- Cálculos de potencia y corriente
- Voltajes máximos de componentes
- Polaridad de componentes
- Conexiones antes de energizar
- Código antes de cargar a MCU

### Buenas Prácticas:
1. **Describir hardware exacto** - modelo específico, no genérico
2. **Incluir contexto** - qué ya funciona, qué falla
3. **Probar incrementalmente** - no cargar todo de una vez
4. **Documentar cambios** - IA puede regenerar, tú debes trackear
5. **Backup antes de flashear** - especialmente configuraciones

---

## Casos de Éxito Típicos

### Caso 1: Sensor Desconocido
```
Problema: Sensor chino sin documentación clara
Solución:
1. Foto de la placa → identificar chip
2. IA busca datasheet del chip
3. IA genera código basado en protocolo
4. Iteración rápida hasta funcionar
```

### Caso 2: Migración de Proyecto
```
Problema: Proyecto Arduino debe usar ESP32
Solución:
1. IA analiza código existente
2. Identifica cambios necesarios (pines, librerías)
3. Genera código convertido
4. Agrega funcionalidades WiFi
```

### Caso 3: Optimización de Batería
```
Problema: Dispositivo dura poco con batería
Solución:
1. IA analiza código de consumo
2. Sugiere modos sleep y wake
3. Optimiza frecuencia de lecturas
4. Genera código con gestión de energía
```

---

*AI-INTEGRATION.md para Electrónica - FPUNA 2026*
