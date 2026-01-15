# FPUNA Summer 2026 - AI-Augmented Development Program
## Modular Course Architecture

**Universidad**: Facultad Politécnica - Universidad Nacional de Asunción (FPUNA)  
**Período**: Verano 2026  
**Modalidad**: Presencial/Híbrido  
**Duración**: 2 semanas intensivas

---

## Descripción del Programa

Este programa modular enseña a estudiantes de diversas disciplinas a utilizar herramientas de IA (OpenCode, Oh My OpenCode) para acelerar su trabajo académico y profesional. 

**Estructura del Programa**:
1. **Semana 1**: Fundamentos Universales (todos los estudiantes juntos)
2. **Semana 2**: Especialización por carrera (tracks específicos)

---

## Arquitectura del Curso

### 00-CORE-FOUNDATION (Universal)
**Duración**: 8 horas  
**Para**: TODOS los estudiantes

Módulos:
- 01: Instalación del Stack de IA
- 02: Dominio de Configuración
- 03: Ingeniería de Prompts
- 04: Ingeniería de Contexto
- 05: Proyecto en Vivo (1-Shot Demo)
- 06: Patrones de Trabajo

**Al completar**: Todos los estudiantes tendrán OpenCode + OMO configurado y funcional

### SHARED (Componentes Reutilizables)
Recursos compartidos entre todos los tracks:
- Guías de instalación
- Plantillas de configuración
- Bibliotecas de prompts
- Ejercicios y quizzes comunes

### Tracks Especializados

#### 01-SOFTWARE-DEVELOPMENT
Para: Ingeniería Informática, Desarrollo de Software  
Módulos: 5 módulos especializados

#### 02-ELECTRONICS-AUTOMATION
Para: Ingeniería Electrónica, Mecatrónica  
Módulos: 5 módulos + MCPs especializados (AutoCAD, KiCad)

#### 03-AERONAUTICAL-ENGINEERING
Para: Ingeniería Aeronáutica  
Módulos: 5 módulos + MCPs especializados (CATIA, ANSYS)

#### 04-MARKETING-COMMUNICATION
Para: Marketing, Comunicación  
Módulos: 4 módulos + herramientas de diseño y analytics

#### 05-RESEARCH-ACADEMIA
Para: Investigadores, estudiantes de posgrado  
Módulos: 5 módulos + herramientas de investigación

#### 06-HOSPITALITY-TOURISM
Para: Hotelería y Turismo  
Módulos: 4 módulos especializados

#### 07-QA-AUTOMATION
Para: Quality Assurance, Testing  
Módulos: 5 módulos + framework completo

#### 08-WEB-DEVELOPMENT
Para: Desarrollo Web Full-Stack  
Módulos: 5 módulos + Next.js, Prisma, etc.

---

## Principios de Diseño

### 1. Sin Duplicación
- Contenido compartido vive en `/SHARED/components/`
- Tracks referencian, no copian
- Actualizar una vez beneficia a todos

### 2. Modularidad
- Cada módulo es independiente
- Referencias claras entre módulos
- Fácil de actualizar y mantener

### 3. Reutilización
- Componentes compartidos
- Ejercicios adaptables
- Plantillas configurables

### 4. Escalabilidad
- Agregar nuevos tracks es simple
- Agregar módulos a tracks existentes es fácil
- Mantener calidad consistente

---

## Cómo Usar Este Repositorio

### Para Estudiantes

**Semana 1**:
1. Ir a [`00-CORE-FOUNDATION`](./00-CORE-FOUNDATION/README.md)
2. Completar módulos 01-06 en orden
3. Verificar que OpenCode funciona correctamente

**Semana 2**:
1. Elegir tu track según tu carrera
2. Completar módulos especializados
3. Realizar proyecto final del track

### Para Instructores

**Preparación**:
1. Revisar [`00-CORE-FOUNDATION`](./00-CORE-FOUNDATION/README.md)
2. Familiarizarse con [`SHARED/components`](./SHARED/components/)
3. Revisar el track específico que enseñarás

**Durante el Curso**:
- Semana 1: Enseñar Core Foundation a todos
- Semana 2: Dividir por tracks, enseñar especialización

### Para Mantenedores

**Actualizar Contenido Compartido**:
1. Editar en `/SHARED/components/`
2. Verificar que todos los tracks se beneficien
3. Probar enlaces desde diferentes tracks

**Agregar Nuevo Track**:
1. Copiar estructura de track existente
2. Referenciar componentes de `/SHARED/`
3. Agregar módulos especializados
4. Documentar MCPs específicos

---

## Estructura de Archivos

```
FPUNA-2026/
├── README.md                          # Este archivo
├── 00-CORE-FOUNDATION/                # Universal (todos)
│   ├── modules/                       # 6 módulos
│   └── shared-resources/              # Recursos del core
├── SHARED/                            # Componentes reutilizables
│   ├── components/                    # Guías compartidas
│   ├── exercises/                     # Ejercicios comunes
│   └── quizzes/                       # Evaluaciones
├── 01-SOFTWARE-DEVELOPMENT/           # Track 1
├── 02-ELECTRONICS-AUTOMATION/         # Track 2
├── 03-AERONAUTICAL-ENGINEERING/       # Track 3
├── 04-MARKETING-COMMUNICATION/        # Track 4
├── 05-RESEARCH-ACADEMIA/              # Track 5
├── 06-HOSPITALITY-TOURISM/            # Track 6
├── 07-QA-AUTOMATION/                  # Track 7
└── 08-WEB-DEVELOPMENT/                # Track 8
```

---

## Soporte

**Preguntas Generales**: cursos-verano@fpuna.edu.py  
**Soporte Técnico**: soporte-ia@fpuna.edu.py  
**Slack Workspace**: fpuna-verano-2026.slack.com

---

## Contribuir

Para agregar contenido o corregir errores:
1. Identificar si es contenido compartido o específico de track
2. Editar archivo correspondiente
3. Probar que los enlaces funcionen
4. Enviar pull request

---

## Licencia

© 2026 FPUNA - Material educativo para uso interno
