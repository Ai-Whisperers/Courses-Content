# Ejercicio Resuelto: Crear README con IA

## Objetivo
Crear un archivo README.md para un proyecto usando ayuda de IA.

---

## Prompt del Estudiante

```
Necesito crear un README.md para mi proyecto de universidad.
El proyecto es: Sistema de riego automatico con Arduino
Incluye: descripcion, instalacion, uso, y creditos.
```

---

## Respuesta Esperada

```markdown
# Sistema de Riego Automatico con Arduino

## Descripcion

Sistema automatizado de riego para plantas que utiliza sensores de humedad
del suelo para determinar cuando activar el riego. Ideal para jardines
pequenos o macetas.

### Caracteristicas

- Monitoreo de humedad del suelo en tiempo real
- Activacion automatica de bomba de agua
- Display LCD con lecturas actuales
- Configuracion de umbrales personalizable
- Bajo consumo de energia

## Componentes Necesarios

| Componente | Cantidad | Descripcion |
|------------|----------|-------------|
| Arduino Uno | 1 | Microcontrolador principal |
| Sensor de humedad | 2 | Sensor capacitivo de suelo |
| Rele 5V | 1 | Para controlar bomba |
| Bomba de agua | 1 | Mini bomba sumergible 5V |
| LCD 16x2 | 1 | Display con I2C |
| Cables | varios | Jumper wires |

## Instalacion

### Hardware
1. Conectar sensor de humedad al pin A0
2. Conectar rele al pin 7
3. Conectar LCD via I2C (SDA->A4, SCL->A5)
4. Alimentar con fuente de 9V

### Software
1. Descargar Arduino IDE
2. Clonar este repositorio
3. Abrir `riego_automatico.ino`
4. Subir al Arduino

## Uso

1. Encender el sistema
2. El LCD mostrara el nivel de humedad actual
3. Si humedad < 30%, se activa el riego automaticamente
4. El riego se detiene cuando humedad > 60%

### Configuracion
Editar en codigo:
```cpp
#define UMBRAL_SECO 30
#define UMBRAL_HUMEDO 60
```

## Diagrama de Conexiones

```
Arduino Uno
├── A0 ─── Sensor Humedad (Signal)
├── 5V ─── Sensor Humedad (VCC) + LCD (VCC)
├── GND ── Sensor Humedad (GND) + LCD (GND)
├── A4 ─── LCD (SDA)
├── A5 ─── LCD (SCL)
└── D7 ─── Rele (IN)
```

## Creditos

- Desarrollado por: [Tu Nombre]
- Universidad: FPUNA
- Materia: Electronica Aplicada
- Ano: 2026

## Licencia

MIT License - Uso libre para proyectos educativos.
```

---

## Puntos Clave

1. **Estructura clara**: Secciones bien definidas
2. **Componentes listados**: Tabla facil de leer
3. **Instalacion paso a paso**: Hardware y software
4. **Diagrama ASCII**: Conexiones visuales sin imagenes
5. **Creditos apropiados**: Informacion del autor

---

## Ejercicio de Seguimiento

> "Ahora agrega una seccion de Troubleshooting con 3 problemas comunes"

---

*Ejercicio 2 - Dia 1*
