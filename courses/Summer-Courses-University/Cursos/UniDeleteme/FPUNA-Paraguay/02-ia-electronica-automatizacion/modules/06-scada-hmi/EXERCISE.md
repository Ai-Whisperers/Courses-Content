# Ejercicio Práctico - Módulo 06
## Diseño de Interfaz HMI para Proceso Industrial

---

## Objetivo

Diseñar una interfaz HMI completa para una estación de bombeo utilizando IA para generar layouts, configurar alarmas y crear elementos visuales profesionales.

**Duración:** 15 minutos
**Tipo:** Práctico guiado
**Herramientas:** Claude/ChatGPT, papel para bocetos

---

## Descripción del Sistema

### Estación de Bombeo

```
                           ┌─────────────────────────┐
      ┌─────────────────┐  │      TANQUE ELEVADO     │
      │   CISTERNA      │  │                         │
      │   (subterránea) │  │    ┌──────────────┐     │
      │                 │  │    │   Nivel: 75% │     │
      └────────┬────────┘  │    └──────────────┘     │
               │           └───────────▲─────────────┘
               │                       │
      ┌────────┴────────┐              │
      │  SALA DE BOMBAS │              │
      │                 │              │
      │  P-101 ═══════════════════════╧═══
      │  P-102 ═══════════════════════════
      │  P-103 ═══════════════════════════
      │                 │
      └─────────────────┘
```

### Parámetros del Sistema

| Elemento | Especificación |
|----------|----------------|
| Bombas | 3 unidades, 10 HP c/u |
| Capacidad | 100 m³/h |
| Presión | 4-6 bar |
| Control | Auto/Manual |
| Comunicación | Ethernet/IP |

---

## Parte 1: Diseño de Layout HMI (5 minutos)

### Paso 1.1: Solicitar Layout a la IA

Envía este prompt:

```
Diseña el layout de pantalla HMI para estación de bombeo:

PLATAFORMA: Siemens WinCC o Wonderware InTouch
RESOLUCIÓN: 1920x1080

ELEMENTOS REQUERIDOS:
1. Vista sinóptica del proceso (centro-izquierda)
2. Estado de 3 bombas con indicadores
3. Nivel de tanque cisterna y elevado
4. Presión y caudal del sistema
5. Panel de control (derecha)
6. Banner de alarmas (inferior)
7. Navegación (superior o lateral)

ESTILO: ISA-101 High Performance
- Fondo gris (#808080)
- Colores solo para estados activos
- Fuentes claras y legibles

GENERAR:
1. Layout ASCII con dimensiones
2. Lista de elementos por zona
3. Colores para cada estado
```

### Paso 1.2: Completar Especificación de Zonas

| Zona | Posición | Dimensiones | Elementos |
|------|----------|-------------|-----------|
| Header | Superior | 1920x60 | |
| Sinóptico | Centro-Izq | 1200x800 | |
| Panel Control | Derecha | 680x800 | |
| Alarmas | Inferior | 1920x140 | |

### Paso 1.3: Definir Elementos Gráficos

Para cada bomba, especificar:

```
Bomba P-101:
- Símbolo: ○ (círculo con flecha rotación)
- Estados y colores:
  - OFF: _________ (#______)
  - RUN: _________ (#______)
  - FALLA: _______ (#______)
  - MANUAL: ______ (#______)
- Animación: Rotación cuando RUN
- Popup: Al hacer clic, mostrar detalle
```

---

## Parte 2: Configuración de Alarmas (5 minutos)

### Paso 2.1: Definir Alarmas del Sistema

Solicita a la IA:

```
Configura el sistema de alarmas para la estación de bombeo:

VARIABLES A MONITOREAR:
1. Nivel cisterna (0-100%)
2. Nivel tanque elevado (0-100%)
3. Presión descarga (0-10 bar)
4. Caudal (0-150 m³/h)
5. Corriente motores (0-30 A cada uno)
6. Temperatura motores (0-120°C)

GENERAR PARA CADA VARIABLE:
- Setpoints: LL, L, H, HH
- Deadband (histéresis)
- Delay time
- Prioridad (1-4)
- Mensaje de alarma
- Acción recomendada

FORMATO: Tabla completa
```

### Paso 2.2: Completar Tabla de Alarmas

| Variable | LL | L | H | HH | Deadband | Delay | Prioridad |
|----------|----|----|----|----|----------|-------|-----------|
| Nivel Cisterna | | | | | | | |
| Nivel Elevado | | | | | | | |
| Presión | | | | | | | |
| Caudal | | | | | | | |
| Corriente P-101 | | | | | | | |
| Temp P-101 | | | | | | | |

### Paso 2.3: Diseñar Banner de Alarmas

Solicita a la IA:

```
Diseña el banner de alarmas activas:

INFORMACIÓN A MOSTRAR:
- Timestamp
- Tag
- Descripción
- Prioridad (color)
- Estado (activa, reconocida)
- Duración

FUNCIONALIDADES:
- Ordenar por prioridad/tiempo
- Filtrar por área
- Botón reconocer
- Sonido configurable

GENERAR:
- Layout del banner
- Códigos de color
- Formato de mensaje
```

---

## Parte 3: Scripts y Animaciones (5 minutos)

### Paso 3.1: Script de Control de Bomba

Solicita a la IA:

```
Genera scripts VBA/VBS para WinCC:

FUNCIONALIDAD: Botón de arranque de bomba
- Verificar permisos de operador
- Confirmar acción (popup "¿Arrancar bomba P-101?")
- Escribir comando al PLC
- Mostrar feedback (cambiando color)
- Registrar en log de eventos

INCLUIR:
- Validación de condiciones previas
- Manejo de errores
- Timeout de confirmación
```

### Paso 3.2: Configurar Animaciones

Para el símbolo de bomba:

| Propiedad | Tag/Variable | Condición | Acción |
|-----------|-------------|-----------|--------|
| Color relleno | P101_STATUS | =0 | Gris |
| Color relleno | P101_STATUS | =1 | Verde |
| Color relleno | P101_FAULT | =1 | Rojo parpadeo |
| Rotación | P101_STATUS | =1 | 360°/s |
| Visibility | P101_MANUAL | =1 | Mostrar "M" |

### Paso 3.3: Configurar Tendencias

Solicita a la IA:

```
Configura pantalla de tendencias para estación de bombeo:

VARIABLES A GRAFICAR:
- Nivel cisterna (azul)
- Nivel tanque elevado (verde)
- Presión (rojo)
- Caudal (amarillo)

CONFIGURACIÓN:
- Período: 8 horas, 24 horas, 7 días
- Actualización: 1 segundo
- Escalas: Auto o fijas
- Cursores: 2 para comparación

GENERAR:
- Layout de pantalla
- Configuración de cada pen
- Funciones de zoom/pan
```

---

## Entregables

### Archivos a Entregar

1. **Layout HMI** (boceto o ASCII)
2. **Tabla de alarmas** completa
3. **Especificación de animaciones**
4. **Scripts de control** (pseudocódigo o VBS)
5. **Configuración de tendencias**

### Estructura de Entrega

```
M06_Ejercicio_[TuApellido]/
├── layout_hmi.md
├── tabla_alarmas.csv
├── animaciones.md
├── scripts/
│   ├── arranque_bomba.vbs
│   └── control_nivel.vbs
└── tendencias.md
```

---

## Rúbrica de Evaluación

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| Layout profesional | 25 | Zonas claras, ISA-101 |
| Alarmas configuradas | 25 | Completa y coherente |
| Animaciones | 20 | Estados correctos |
| Scripts funcionales | 15 | Lógica correcta |
| Tendencias | 15 | Configuración completa |
| **Total** | **100** | |

---

## Extensión: Mockup Digital

Si tienes herramientas disponibles:
- Figma/Adobe XD: Crear mockup visual
- PowerPoint: Diseño de pantallas
- Wonderware InTouch: Implementar demo

```
Prompt adicional:
"Genera una descripción detallada para crear este HMI
en [herramienta específica], incluyendo pasos,
menús a usar, y configuraciones específicas."
```

---

*Módulo 06 - IA para SCADA y HMI*
*Tiempo estimado: 15 minutos*
