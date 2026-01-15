# Plantillas de Proyecto

## Plantillas Reutilizables para Proyectos con OpenCode

Esta sección contiene plantillas de proyectos listas para usar que siguen las mejores prácticas y están optimizadas para trabajar con OpenCode.

**Tiempo estimado**: 10 minutos para usar plantilla  
**Nivel**: Principiante  
**Requisitos**: OpenCode instalado

---

## Plantillas Disponibles

### 1. [Proyecto Básico](./basic-project/)
Estructura mínima para proyectos simples.

**Incluye**:
- README.md
- package.json (Node.js) o requirements.txt (Python)
- .gitignore
- Estructura de carpetas básica

**Ideal para**:
- Tareas de clase
- Proyectos pequeños
- Aprendizaje

---

### 2. [Proyecto Completo](./full-project/)
Estructura profesional para proyectos complejos.

**Incluye**:
- Frontend y Backend separados
- Tests configurados
- CI/CD setup
- Docker
- Documentación completa

**Ideal para**:
- Proyectos de tesis
- Aplicaciones web completas
- Portfolio profesional

---

## Cómo Usar las Plantillas

### Método 1: Con OpenCode

```bash
# Crear proyecto desde plantilla
claude "Crea un proyecto usando la plantilla basic-project para una calculadora"

# OpenCode copiará la estructura y personalizará según tu descripción
```

### Método 2: Manual

```bash
# 1. Copiar plantilla
cp -r SHARED/components/project-templates/basic-project mi-nuevo-proyecto

# 2. Personalizar
cd mi-nuevo-proyecto
npm init  # o python setup equivalente

# 3. Inicializar Git
git init
git add .
git commit -m "Initial commit from template"
```

---

## Personalizar una Plantilla

### 1. Copiar Plantilla Base

```bash
cp -r basic-project mi-plantilla-personalizada
```

### 2. Modificar Según Necesidad

- Agregar/quitar carpetas
- Modificar package.json
- Actualizar README.md
- Ajustar configuraciones

### 3. Usar tu Plantilla

```bash
claude "Usa mi-plantilla-personalizada para crear proyecto X"
```

---

## Estructura de Plantillas

Cada plantilla sigue esta estructura:

```
template-name/
├── README.md                    # Documentación de la plantilla
├── template.yaml                # Configuración de la plantilla
├── src/                         # Código fuente
├── tests/                       # Tests
├── docs/                        # Documentación
├── .gitignore                   # Git ignore rules
└── package.json / requirements.txt
```

---

## Plantillas por Disciplina

### Ingeniería de Software
- `web-fullstack/` - App web completa
- `rest-api/` - API REST
- `microservices/` - Arquitectura de microservicios

### Electrónica/Mecatrónica
- `arduino-project/` - Proyecto Arduino
- `iot-gateway/` - Gateway IoT
- `embedded-system/` - Sistema embebido

### Investigación
- `research-project/` - Proyecto de investigación
- `data-analysis/` - Análisis de datos
- `ml-experiment/` - Experimento ML

### Marketing
- `landing-page/` - Landing page
- `content-campaign/` - Campaña de contenido

---

## Crear tu Propia Plantilla

### template.yaml

```yaml
name: mi-plantilla
description: Plantilla para X tipo de proyecto
version: 1.0.0
author: Tu Nombre

variables:
  - name: project_name
    description: Nombre del proyecto
    required: true
  
  - name: author_name
    description: Nombre del autor
    required: true

structure:
  - src/
    - index.js
    - utils/
  - tests/
    - index.test.js
  - docs/
    - README.md
  - .gitignore
  - package.json

scripts:
  post_create:
    - npm install
    - git init
```

---

## Mejores Prácticas

### ✅ HACER
- Incluir README detallado
- Configurar .gitignore apropiadamente
- Incluir ejemplos de código
- Documentar estructura
- Probar plantilla antes de compartir

### ❌ NO HACER
- Incluir node_modules o venv
- Hardcodear credenciales
- Dejar archivos de configuración personal
- Omitir documentación

---

## Compartir Plantillas

### Con Compañeros de FPUNA

```bash
# Exportar plantilla
tar -czf mi-plantilla.tar.gz mi-plantilla/

# Compartir archivo
# Compañero importa:
tar -xzf mi-plantilla.tar.gz
```

### Publicar en GitHub

```bash
# 1. Crear repo
gh repo create mi-plantilla-fpuna --public

# 2. Push
git add .
git commit -m "Add template"
git push origin main

# 3. Otros usan con:
claude "Usa plantilla de github.com/usuario/mi-plantilla-fpuna"
```

---

## Plantillas de la Comunidad

**GitHub Topic**: `opencode-template`  
**FPUNA Templates**: github.com/fpuna/opencode-templates

---

## Próximos Pasos

1. 📖 Explora: [Proyecto Básico](./basic-project/README.md)
2. 📖 Revisa: [Proyecto Completo](./full-project/README.md)
3. 📖 Practica: Crear tu propia plantilla

---

**¡Las plantillas aceleran el inicio de proyectos!** 🚀

---

*Guía FPUNA Summer 2026*
