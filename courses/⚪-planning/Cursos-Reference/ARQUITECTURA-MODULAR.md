# Arquitectura Modular de Cursos
## Sistema de Tiers para Universidades de Paraguay

---

## Concepto

En lugar de duplicar contenido común en cada curso por universidad, creamos un sistema modular de **Tiers**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     ARQUITECTURA DE CURSOS MODULAR                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   TIER 0: FUNDAMENTOS COMUNES                                           │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  00-fundamentos-ia/                                              │  │
│   │  ├── Introducción a IA Generativa                                │  │
│   │  ├── Configuración de Herramientas                               │  │
│   │  ├── Prompting Efectivo                                          │  │
│   │  └── Ética y Limitaciones                                        │  │
│   │                                                                   │  │
│   │  ⟶ TODOS los cursos comienzan aquí (2-4 horas)                   │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                               │                                          │
│                               ▼                                          │
│   TIER 1: DOMINIOS ESPECIALIZADOS                                       │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│   │ DESARROLLO │ │ INGENIERÍA │ │   SALUD    │ │  NEGOCIOS  │          │
│   │  SOFTWARE  │ │  ELECTR.   │ │  MEDICINA  │ │    ADMIN   │          │
│   └─────┬──────┘ └─────┬──────┘ └─────┬──────┘ └─────┬──────┘          │
│         │              │              │              │                   │
│         ▼              ▼              ▼              ▼                   │
│   TIER 2: APLICACIONES ESPECÍFICAS (según universidad/carrera)          │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│   │ Backend    │ │   PLCs     │ │ Diagnóstico│ │ Marketing  │          │
│   │ Frontend   │ │  SCADA     │ │ Radiología │ │ Finanzas   │          │
│   │ Testing    │ │   IoT      │ │ Farmacia   │ │ RRHH       │          │
│   └────────────┘ └────────────┘ └────────────┘ └────────────┘          │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Estructura de Carpetas Nueva

```
Cursos/
├── ARQUITECTURA-MODULAR.md      # Este archivo
├── README.md                    # Índice general
│
├── _shared/                     # Contenido compartido entre cursos
│   ├── 00-fundamentos-ia/       # TIER 0 - Común a TODOS
│   │   ├── README.md
│   │   ├── modules/
│   │   │   ├── 01-introduccion-ia-generativa/
│   │   │   ├── 02-herramientas-configuracion/
│   │   │   ├── 03-prompting-efectivo/
│   │   │   └── 04-etica-limitaciones/
│   │   ├── prompts/
│   │   └── resources/
│   │
│   └── assets/                  # Imágenes, diagramas, plantillas comunes
│
├── tier1-desarrollo-software/   # TIER 1 - Desarrollo
│   ├── README.md
│   ├── SYLLABUS.md
│   ├── modules/
│   │   ├── 01-asistentes-codigo/
│   │   ├── 02-backend-ia/
│   │   ├── 03-frontend-ia/
│   │   ├── 04-testing-qa/
│   │   ├── 05-devops-ia/
│   │   └── 06-proyecto-integrador/
│   ├── prompts/
│   └── resources/
│
├── tier1-electronica-automatizacion/  # TIER 1 - Electrónica
│   ├── README.md
│   ├── SYLLABUS.md
│   ├── modules/
│   │   ├── 01-microcontroladores/
│   │   ├── 02-procesamiento-senales/
│   │   ├── 03-diseno-circuitos/
│   │   ├── 04-programacion-plc/
│   │   ├── 05-scada-hmi/
│   │   ├── 06-mantenimiento-predictivo/
│   │   └── 07-proyecto-integrador/
│   ├── prompts/
│   └── resources/
│
├── tier1-salud-medicina/        # TIER 1 - Salud
│   ├── README.md
│   ├── SYLLABUS.md
│   ├── modules/
│   │   ├── 01-ia-clinica-diagnostico/
│   │   ├── 02-imagenes-medicas/
│   │   ├── 03-historias-clinicas/
│   │   ├── 04-farmacologia-ia/
│   │   ├── 05-investigacion-medica/
│   │   └── 06-proyecto-integrador/
│   ├── prompts/
│   └── resources/
│
├── tier1-negocios-administracion/  # TIER 1 - Negocios
│   ├── README.md
│   ├── SYLLABUS.md
│   ├── modules/
│   │   ├── 01-analisis-datos-empresariales/
│   │   ├── 02-marketing-ia/
│   │   ├── 03-finanzas-contabilidad/
│   │   ├── 04-recursos-humanos/
│   │   ├── 05-atencion-cliente/
│   │   └── 06-proyecto-integrador/
│   ├── prompts/
│   └── resources/
│
├── tier1-agronegocios/          # TIER 1 - Agro
│   ├── README.md
│   ├── SYLLABUS.md
│   ├── modules/
│   │   ├── 01-agricultura-precision/
│   │   ├── 02-ganaderia-ia/
│   │   ├── 03-cadena-suministro/
│   │   ├── 04-clima-prediccion/
│   │   └── 05-proyecto-integrador/
│   ├── prompts/
│   └── resources/
│
├── tier1-energia-sostenibilidad/  # TIER 1 - Energía
│   ├── README.md
│   ├── SYLLABUS.md
│   ├── modules/
│   │   ├── 01-redes-electricas-ia/
│   │   ├── 02-energias-renovables/
│   │   ├── 03-eficiencia-energetica/
│   │   ├── 04-sostenibilidad-analisis/
│   │   └── 05-proyecto-integrador/
│   ├── prompts/
│   └── resources/
│
├── tier1-investigacion-academica/  # TIER 1 - Investigación
│   ├── README.md
│   ├── SYLLABUS.md
│   ├── modules/
│   │   ├── 01-revision-literatura/
│   │   ├── 02-analisis-datos-cientificos/
│   │   ├── 03-redaccion-papers/
│   │   ├── 04-visualizacion-resultados/
│   │   └── 05-proyecto-integrador/
│   ├── prompts/
│   └── resources/
│
├── tier1-derecho-legaltech/     # TIER 1 - Legal
│   ├── README.md
│   ├── SYLLABUS.md
│   ├── modules/
│   │   ├── 01-analisis-documentos/
│   │   ├── 02-jurisprudencia-ia/
│   │   ├── 03-contratos-automatizacion/
│   │   └── 04-proyecto-integrador/
│   ├── prompts/
│   └── resources/
│
└── tier1-hospitalidad-turismo/  # TIER 1 - Turismo
    ├── README.md
    ├── SYLLABUS.md
    ├── modules/
    │   ├── 01-experiencia-cliente/
    │   ├── 02-operaciones-hoteleras/
    │   ├── 03-marketing-destinos/
    │   └── 04-proyecto-integrador/
    ├── prompts/
    └── resources/
```

---

## Mapeo: Universidad → Tiers

### Cursos por Universidad

| Universidad | Tier 0 | Tier 1 Principal | Tier 1 Adicionales |
|-------------|--------|------------------|-------------------|
| **FPUNA** | ✓ | Desarrollo, Electrónica | Investigación, Hospitalidad, Energía |
| **UAA** | ✓ | Negocios | Marketing (subset) |
| **UC** | ✓ | Salud, Derecho | Investigación |
| **UNA-FCM** | ✓ | Salud | Investigación |
| **UNA-Otras** | ✓ | Negocios | Investigación |
| **UNE** | ✓ | Desarrollo, Electrónica | - |
| **UniNorte** | ✓ | Salud, Investigación | Desarrollo |
| **Americana** | ✓ | Desarrollo | Negocios |
| **Pacífico** | ✓ | Salud | - |
| **San Carlos** | ✓ | Agronegocios | - |

---

## Composición de Cursos para Cada Universidad

### Ejemplo: FPUNA - "IA para Desarrollo de Software" (16h)

```
COMPOSICIÓN:
├── Tier 0: Fundamentos (2h)
│   └── Módulos 01-04 de _shared/00-fundamentos-ia/
│
└── Tier 1: Desarrollo Software (14h)
    └── Módulos 01-06 de tier1-desarrollo-software/
```

### Ejemplo: FPUNA - "IA para Electrónica" (16h)

```
COMPOSICIÓN:
├── Tier 0: Fundamentos (2h)
│   └── Módulos 01-04 de _shared/00-fundamentos-ia/
│
└── Tier 1: Electrónica (14h)
    └── Módulos 01-07 de tier1-electronica-automatizacion/
```

### Ejemplo: UC - "IA para Medicina" (12h)

```
COMPOSICIÓN:
├── Tier 0: Fundamentos (2h)
│   └── Módulos 01-04 de _shared/00-fundamentos-ia/
│
└── Tier 1: Salud (10h)
    └── Módulos 01-06 de tier1-salud-medicina/
```

---

## Beneficios del Sistema Modular

### 1. Reutilización
- El Tier 0 se escribe UNA vez y se usa en TODOS los cursos
- Los Tiers 1 se comparten entre universidades con carreras similares

### 2. Consistencia
- Todos los estudiantes aprenden los mismos fundamentos
- Misma calidad de contenido base

### 3. Mantenimiento
- Actualizar Tier 0 actualiza TODOS los cursos
- Cambios en herramientas de IA se propagan automáticamente

### 4. Flexibilidad
- Cada universidad puede combinar módulos según necesidad
- Fácil crear cursos nuevos combinando tiers existentes

### 5. Escalabilidad
- Agregar nueva universidad = seleccionar tiers existentes
- Nuevo dominio = crear solo el Tier 1 específico

---

## Plantilla de Composición de Curso

Para crear un curso para una universidad específica:

```markdown
# Curso: [Nombre]
## Universidad: [Nombre]

### Composición

| Componente | Fuente | Duración |
|------------|--------|----------|
| Fundamentos IA | `_shared/00-fundamentos-ia/` | 2h |
| [Dominio] | `tier1-[dominio]/` | Xh |

### Módulos Seleccionados

**De Tier 0 (obligatorio):**
- [ ] 01-introduccion-ia-generativa
- [ ] 02-herramientas-configuracion
- [ ] 03-prompting-efectivo
- [ ] 04-etica-limitaciones

**De Tier 1 [Dominio]:**
- [ ] Módulo 1
- [ ] Módulo 2
- [ ] ...

### Adaptaciones Locales

[Notas específicas para esta universidad, ejemplos locales, etc.]
```

---

## Migración del Contenido Existente

### Fase 1: Crear Tier 0

Extraer contenido común de cursos existentes:
- Módulo "Introducción a IA" de cada curso → `00-fundamentos-ia/`

### Fase 2: Crear Tiers 1

Reorganizar contenido específico:
- `FPUNA/01-ia-desarrollo-software/` → `tier1-desarrollo-software/`
- `FPUNA/02-ia-electronica/` → `tier1-electronica-automatizacion/`

### Fase 3: Crear Referencias

Crear archivos de composición para cada universidad:
- `universidades/FPUNA/curso-desarrollo.md` → referencia a tiers

---

## Próximos Pasos

1. **Crear `_shared/00-fundamentos-ia/`** - El módulo común
2. **Reorganizar Tier 1 de Desarrollo** - Ya existe contenido
3. **Reorganizar Tier 1 de Electrónica** - Ya existe contenido
4. **Crear composiciones por universidad** - Archivos de referencia

---

*Arquitectura Modular v1.0*
*Diciembre 2025*
