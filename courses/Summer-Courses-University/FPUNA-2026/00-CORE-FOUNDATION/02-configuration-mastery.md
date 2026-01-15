# Módulo 02: Dominio de Configuración

## MCPs, Skills, Hooks y Rules

**Duración**: 2 horas  
**Nivel**: Intermedio  
**Prerequisito**: Módulo 01 completado

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:

1. ✅ Configurar MCPs para extender OpenCode
2. ✅ Instalar y usar Skills predefinidos
3. ✅ Implementar Hooks para automatizar tareas
4. ✅ Crear Rules para código consistente
5. ✅ Integrar todo en un workflow profesional

---

## Parte 1: MCPs - Model Context Protocol (45 min)

### ¿Qué son los MCPs?

Los MCPs permiten a OpenCode conectarse con herramientas externas y servicios.

**Ver documentación completa**: [Guía de MCPs](../../../SHARED/components/mcp-configuration/README.md)

### MCPs Esenciales para FPUNA

#### 1. Filesystem MCP

Permite a OpenCode leer/escribir archivos en tu proyecto.

**Instalación**:
```bash
npm install -g @modelcontextprotocol/server-filesystem
```

**Configuración** (`~/.opencode/mcp-config.json`):
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\TuUsuario\\FPUNA\\Proyectos"
      ]
    }
  }
}
```

**Uso**:
```bash
claude "Lista todos los archivos en mi carpeta de proyectos"
claude "Crea un nuevo archivo README.md en mi proyecto actual"
```

#### 2. Git MCP

Automatiza operaciones de Git.

**Instalación**:
```bash
npm install -g @modelcontextprotocol/server-git
```

**Configuración**:
```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"]
    }
  }
}
```

**Uso**:
```bash
claude "Muestra el status de Git y los últimos 5 commits"
claude "Crea un commit con mensaje descriptivo para los cambios actuales"
```

#### 3. GitHub MCP

Integración con GitHub.

**Instalación**:
```bash
npm install -g @modelcontextprotocol/server-github
```

**Configurar API Key**:
```bash
# Obtener token de https://github.com/settings/tokens
export GITHUB_TOKEN="ghp_tu_token_aqui"
```

**Configuración**:
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### Recursos de MCPs

- 📖 [Encontrar MCPs](../../../SHARED/components/mcp-configuration/finding-mcps.md)
- 📖 [Instalar MCPs](../../../SHARED/components/mcp-configuration/installing-mcps.md)
- 📖 [Ejemplos de Configuración](../../../SHARED/components/mcp-configuration/config-examples.md)

---

## Parte 2: Skills - Plantillas de Workflows (30 min)

### ¿Qué son los Skills?

Skills son plantillas predefinidas que automatizan tareas comunes.

**Ver documentación completa**: [Sistema de Skills](../../../SHARED/components/skills-system/README.md)

### Skills Útiles para FPUNA

#### 1. Generar README

```bash
# Instalar skill
claude skill install generate-readme

# Usar
claude skill use generate-readme
```

#### 2. Crear Tests

```bash
claude skill install generate-unit-tests
claude skill use generate-unit-tests --file=calculadora.js
```

#### 3. Setup de Proyecto

```bash
claude skill install init-nodejs-project
claude skill use init-nodejs-project --name=mi-proyecto
```

### Crear tu Propio Skill

**Archivo**: `~/.opencode/skills/fpuna-header.yaml`

```yaml
name: add-fpuna-header
description: Agrega encabezado FPUNA a archivos
version: 1.0.0

inputs:
  - name: student_name
    description: Nombre del estudiante
    required: true
  - name: carnet
    description: Número de carnet
    required: true

steps:
  - prompt: |
      Agrega este encabezado al inicio de todos los archivos .js:
      
      /**
       * FPUNA - Facultad Politécnica
       * Curso: AI-Augmented Development
       * Estudiante: ${student_name}
       * Carnet: ${carnet}
       * Fecha: ${date}
       */
```

**Usar**:
```bash
claude skill use add-fpuna-header --student_name="María González" --carnet="2024001"
```

### Recursos de Skills

- 📖 [Encontrar Skills](../../../SHARED/components/skills-system/finding-skills.md)
- 📖 [Crear Skills](../../../SHARED/components/skills-system/creating-skills.md)
- 📖 [Ejemplos de Skills](../../../SHARED/components/skills-system/examples.md)

---

## Parte 3: Hooks - Automatización de Tareas (25 min)

### ¿Qué son los Hooks?

Hooks ejecutan acciones automáticamente en eventos específicos.

**Ver documentación completa**: [Guía de Hooks](../../../SHARED/components/hooks-rules/hooks-guide.md)

### Configuración para Estudiante FPUNA

**Archivo**: `~/.opencode/hooks-rules.yaml`

```yaml
hooks:
  # Después de generar código
  post-generate:
    - name: format
      command: npx prettier --write .
      on_fail: warn
    
    - name: add-header
      command: node scripts/add-fpuna-header.js
      on_fail: warn

  # Antes de commit
  pre-commit:
    - name: test
      command: npm test
      on_fail: warn  # Solo advertir, no bloquear
    
    - name: lint
      command: npm run lint
      on_fail: warn
```

### Hooks Comunes

#### 1. Formateo Automático

```yaml
hooks:
  post-generate:
    - name: format-code
      command: npx prettier --write .
```

#### 2. Tests Pre-Commit

```yaml
hooks:
  pre-commit:
    - name: run-tests
      command: npm test
      on_fail: abort  # Bloquear si fallan
```

#### 3. Documentación Automática

```yaml
hooks:
  post-generate:
    - name: update-docs
      command: npm run docs
```

---

## Parte 4: Rules - Código Consistente (20 min)

### ¿Qué son las Rules?

Rules son convenciones que OpenCode sigue automáticamente al generar código.

**Ver documentación completa**: [Guía de Rules](../../../SHARED/components/hooks-rules/rules-guide.md)

### Configuración para FPUNA

**Archivo**: `~/.opencode/hooks-rules.yaml`

```yaml
rules:
  # Estilo de código
  code_style:
    javascript:
      - Use Spanish for variable names when appropriate
      - camelCase for variables and functions
      - PascalCase for classes and components
      - Prefer const over let
      - Use arrow functions for callbacks
      - Include comments explaining complex logic
      - Maximum function length 50 lines
    
    python:
      - Follow PEP 8
      - Spanish variable names when appropriate
      - Type hints for all functions
      - Docstrings in Spanish
  
  # Documentación
  documentation:
    - All functions must have JSDoc/docstring
    - Comments written in Spanish
    - Include @param and @returns
    - README.md required for each project
    - Include student name and carnet in file headers
  
  # Testing
  testing:
    - Generate tests for all public functions
    - Use Jest for JavaScript
    - Pytest for Python
    - Include edge cases and error scenarios
  
  # Proyecto FPUNA
  project:
    - Include FPUNA header in all files
    - Follow course coding standards
    - Maximum cyclomatic complexity 10
```

### Verificar que Rules se Aplican

```bash
claude "Crea una función que sume dos números"

# OpenCode debería generar algo como:
```

```javascript
/**
 * Suma dos números
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number} La suma de a y b
 */
const sumar = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Ambos parámetros deben ser números');
  }
  return a + b;
};
```

**Nota**: Aplicó automáticamente JSDoc en español, validación, y arrow function.

---

## Parte 5: Integración Completa (10 min)

### Setup Completo para Estudiante FPUNA

**Archivo**: `~/.opencode/mcp-config.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Users\\TuUsuario\\FPUNA\\Proyectos"]
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"]
    }
  }
}
```

**Archivo**: `~/.opencode/hooks-rules.yaml`

```yaml
hooks:
  post-generate:
    - name: format
      command: npx prettier --write .
  
  pre-commit:
    - name: test
      command: npm test
      on_fail: warn

rules:
  code_style:
    javascript:
      - Use Spanish for variable names when appropriate
      - camelCase for variables
      - JSDoc comments in Spanish
  
  documentation:
    - Include FPUNA header
    - Comments in Spanish
  
  testing:
    - Tests for all functions
```

### Probar Configuración Completa

```bash
# 1. Crear proyecto
mkdir test-config
cd test-config
npm init -y

# 2. Generar código con todas las configuraciones
claude "Crea una clase Calculadora con métodos sumar, restar, multiplicar y dividir. Incluye:
- Validación de inputs
- Tests completos
- Documentación en español
- Manejo de errores"

# 3. Verificar que aplicó:
# - MCPs (creó archivos automáticamente)
# - Rules (código en español con JSDoc)
# - Hooks (formateó código, ejecutó tests)
```

---

## Workflow Diario con Configuración

### Día Típico de Desarrollo

```bash
# 1. Crear nuevo feature
claude "Agrega función para calcular promedio de array"

# Automático:
# - OpenCode genera código siguiendo rules
# - Hook post-generate formatea código
# - Tests se generan automáticamente

# 2. Hacer commit
git add .
git commit -m "Add average function"

# Automático:
# - Hook pre-commit ejecuta tests
# - Si pasan, commit procede
# - Si fallan, te avisa para corregir

# 3. Continuar desarrollo
# Todo el código mantiene consistencia gracias a rules
```

---

## Troubleshooting

### Problema: "MCP not found"

**Solución**:
```bash
# Verificar instalación
npm list -g @modelcontextprotocol/server-filesystem

# Reinstalar
npm install -g @modelcontextprotocol/server-filesystem

# Verificar configuración JSON (usar jsonlint.com)
```

### Problema: "Hooks not executing"

**Solución**:
```bash
# Verificar sintaxis YAML
# Usar yamllint.com

# Verificar logs
cat ~/.opencode/logs/hooks.log
```

### Problema: "Rules not being followed"

**Solución**:
- Rules son sugerencias, no garantías
- OpenCode puede no seguirlas al 100%
- Puedes editar el código generado
- Hacer rules más específicas

---

## Recursos Adicionales

### Documentación Completa

- 📖 [MCPs](../../../SHARED/components/mcp-configuration/README.md)
- 📖 [Skills](../../../SHARED/components/skills-system/README.md)
- 📖 [Hooks y Rules](../../../SHARED/components/hooks-rules/README.md)

### Ejemplos

- 📖 [Configuraciones MCP](../../../SHARED/components/mcp-configuration/config-examples.md)
- 📖 [Ejemplos de Skills](../../../SHARED/components/skills-system/examples.md)
- 📖 [Ejemplos Hooks/Rules](../../../SHARED/components/hooks-rules/examples.md)

---

## Próximos Pasos

1. 📝 Completa el [EJERCICIO.md](./EXERCISE.md)
2. 📝 Responde el [QUIZ.md](./QUIZ.md)
3. 📖 Continúa con: [Módulo 03 - Prompt Engineering](../03-prompt-engineering/README.md)

---

## Resumen del Módulo

**Configuraste**:
- ✅ MCPs (filesystem, git, github)
- ✅ Skills personalizados
- ✅ Hooks automáticos
- ✅ Rules de código

**Ahora puedes**:
- 🚀 Automatizar tareas repetitivas
- 🚀 Mantener código consistente
- 🚀 Trabajar más eficientemente
- 🚀 Seguir estándares profesionales

---

*Módulo creado para FPUNA Summer 2026*
