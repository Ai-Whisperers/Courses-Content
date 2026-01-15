# Crear Skills Personalizados

## Estructura Básica de un Skill

```yaml
name: mi-skill
description: Descripción clara del skill
version: 1.0.0
author: Tu Nombre
tags: [desarrollo, api, backend]

inputs:
  - name: resource_name
    description: Nombre del recurso
    type: string
    required: true
    default: "items"

steps:
  - name: crear_estructura
    prompt: |
      Crea la estructura de carpetas para ${resource_name}:
      - routes/
      - controllers/
      - models/
      - tests/
  
  - name: generar_rutas
    prompt: |
      Genera archivo routes/${resource_name}.js con:
      - GET /api/${resource_name}
      - POST /api/${resource_name}
      - PUT /api/${resource_name}/:id
      - DELETE /api/${resource_name}/:id

outputs:
  - API REST funcional para ${resource_name}
  - Tests unitarios incluidos
```

---

## Ejemplo Simple: Generar README

```yaml
name: generate-readme
description: Genera README.md para proyecto actual
version: 1.0.0

steps:
  - prompt: |
      Analiza la estructura del proyecto.
      Genera README.md con:
      - Título y descripción
      - Instalación
      - Uso
      - Licencia
```

Guardar en: `~/.opencode/skills/generate-readme.yaml`

**Usar**:
```bash
claude skill use generate-readme
```

---

## Variables en Skills

### Usar Inputs

```yaml
inputs:
  - name: project_name
    type: string
    required: true

steps:
  - prompt: "Crear proyecto llamado ${project_name}"
```

### Variables de Entorno

```yaml
steps:
  - prompt: "Usar API key: ${env.API_KEY}"
```

---

## Mejores Prácticas

### ✅ HACER
- Un skill = una tarea específica
- Documentar todos los inputs
- Incluir ejemplos de uso
- Validar inputs
- Manejar errores

### ❌ NO HACER
- Skills demasiado genéricos
- Hardcodear valores
- Omitir documentación
- Ignorar casos de error

---

## Plantilla para Empezar

```yaml
name: mi-nuevo-skill
description: [Descripción clara en una línea]
version: 1.0.0
author: [Tu Nombre]
tags: [tag1, tag2]

inputs:
  - name: input1
    description: [Qué hace este input]
    type: string
    required: true

steps:
  - name: paso1
    prompt: |
      [Instrucciones claras para Claude]
  
  - name: paso2
    prompt: |
      [Siguiente paso]

outputs:
  - [Qué se genera]

examples:
  - name: Ejemplo básico
    command: "claude skill use mi-nuevo-skill --input1=valor"
```

---

## Compartir tu Skill

```bash
# 1. Crear repo GitHub
git init
git add mi-skill.yaml
git commit -m "Add skill"
git push

# 2. Publicar en NPM (opcional)
npm publish

# 3. Compartir con comunidad
# Abrir PR en: github.com/awesome-claude-skills
```

---

**Ver también**:
- 📖 [Ejemplos de Skills](./examples.md)
- 📖 [Instalar Skills](./installing-skills.md)

---

*Guía FPUNA Summer 2026*
