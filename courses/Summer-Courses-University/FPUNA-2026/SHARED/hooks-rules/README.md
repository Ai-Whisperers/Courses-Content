# Sistema de Hooks y Rules en OpenCode

## ¿Qué son Hooks y Rules?

**Hooks** y **Rules** son sistemas que automatizan comportamientos y aplican convenciones en OpenCode sin intervención manual.

**Tiempo estimado**: 30-40 minutos  
**Nivel**: Intermedio-Avanzado  
**Requisitos**: OpenCode configurado

---

## Diferencia Clave

| Concepto | Propósito | Cuándo se Activa |
|----------|-----------|------------------|
| **Hook** | Ejecutar acciones automáticas | Eventos específicos (antes/después de acciones) |
| **Rule** | Aplicar convenciones de código | Mientras OpenCode genera código |

---

## Hooks

### ¿Qué son los Hooks?

**Hooks** son scripts que se ejecutan automáticamente en respuesta a eventos de OpenCode.

**Ejemplo real**: Ejecutar tests automáticamente antes de cada commit.

### Tipos de Hooks

#### 1. Pre-Generate Hooks
Se ejecutan **antes** de que OpenCode genere código.

```yaml
hooks:
  pre-generate:
    - name: lint-check
      command: npm run lint
      on_fail: warn
```

**Caso de uso**: Verificar que proyecto está en buen estado.

#### 2. Post-Generate Hooks
Se ejecutan **después** de que OpenCode genera código.

```yaml
hooks:
  post-generate:
    - name: format-code
      command: npm run format
    - name: update-docs
      command: npm run docs
```

**Caso de uso**: Formatear código automáticamente, regenerar documentación.

#### 3. Pre-Commit Hooks
Se ejecutan antes de commits git.

```yaml
hooks:
  pre-commit:
    - name: run-tests
      command: npm test
    - name: type-check
      command: npm run type-check
```

---

## Rules

### ¿Qué son las Rules?

**Rules** son directrices que OpenCode sigue automáticamente al generar código.

**Ejemplo real**: "Siempre usar TypeScript strict mode" o "Comentarios en español".

### Tipos de Rules

#### 1. Code Style Rules

```yaml
rules:
  code_style:
    - language: javascript
      conventions:
        - Use camelCase for variables
        - Use PascalCase for classes
        - Max line length: 120
        - Use single quotes
        - Semicolons: required
```

#### 2. Documentation Rules

```yaml
rules:
  documentation:
    - All functions must have JSDoc comments
    - Comments in Spanish
    - Include examples for public APIs
```

#### 3. Testing Rules

```yaml
rules:
  testing:
    - Generate tests for all public functions
    - Use Jest as testing framework
    - Minimum coverage: 80%
```

#### 4. Project-Specific Rules

```yaml
rules:
  project:
    - Use Prisma for database
    - API routes in /api folder
    - Components in /components folder
    - Follow Airbnb style guide
```

---

## Configuración

### Ubicación del Archivo

**Windows**: `%USERPROFILE%\.opencode\hooks-rules.yaml`  
**macOS/Linux**: `~/.opencode/hooks-rules.yaml`

### Estructura Completa

```yaml
# ~/.opencode/hooks-rules.yaml

hooks:
  pre-generate:
    - name: check-branch
      command: git branch --show-current
      on_fail: warn
  
  post-generate:
    - name: format
      command: npm run format
    - name: lint
      command: npm run lint --fix
  
  pre-commit:
    - name: tests
      command: npm test
      on_fail: abort

rules:
  code_style:
    javascript:
      - Use ES6+ syntax
      - Prefer const over let
      - Use template literals
      - Arrow functions preferred
    
    python:
      - Follow PEP 8
      - Use type hints
      - Docstrings for all functions
  
  documentation:
    - Comments in Spanish
    - JSDoc for all exports
    - README for each module
  
  testing:
    - Jest for JavaScript
    - Pytest for Python
    - E2E tests with Playwright
  
  security:
    - No hardcoded secrets
    - Validate all inputs
    - Use environment variables
```

---

## Guías Detalladas

### 📖 [Guía de Hooks](./hooks-guide.md)
Todo sobre hooks: tipos, configuración, ejemplos.

### 📖 [Guía de Rules](./rules-guide.md)
Cómo crear y usar rules efectivamente.

### 📖 [Ejemplos](./examples.md)
Configuraciones listas para usar.

### 📖 [Mejores Prácticas](./best-practices.md)
Recomendaciones para hooks y rules.

---

## Casos de Uso

### 1. Proyecto Universitario (FPUNA)

```yaml
hooks:
  post-generate:
    - name: add-header
      command: node scripts/add-fpuna-header.js

rules:
  documentation:
    - Comments in Spanish
    - Include student name and ID in headers
  
  code_style:
    - Follow course style guide
    - Maximum complexity: 10
```

### 2. Proyecto Profesional

```yaml
hooks:
  pre-commit:
    - name: lint
      command: npm run lint
      on_fail: abort
    - name: test
      command: npm test
      on_fail: abort
    - name: type-check
      command: npm run type-check
      on_fail: abort

rules:
  testing:
    - Minimum 80% coverage
    - All features must have E2E tests
  
  security:
    - Run security audit on dependencies
    - No console.log in production
```

---

## Ventajas de Hooks y Rules

### ✅ Consistencia
- Todo el código sigue las mismas convenciones
- No depende de recordar reglas manualmente

### ✅ Calidad Automática
- Tests ejecutados automáticamente
- Código formateado sin intervención

### ✅ Ahorro de Tiempo
- No repetir tareas manuales
- Automatización de workflows

### ✅ Reducción de Errores
- Validaciones automáticas
- Prevención de commits con errores

---

## Próximos Pasos

1. 📖 Lee: [Guía de Hooks](./hooks-guide.md)
2. 📖 Lee: [Guía de Rules](./rules-guide.md)
3. 📖 Prueba: [Ejemplos](./examples.md)
4. 📖 Aplica: [Mejores Prácticas](./best-practices.md)

---

## Recursos

- **Documentación OpenCode**: https://docs.anthropic.com/hooks-rules
- **Comunidad FPUNA**: #fpuna-hooks-rules en Slack
- **GitHub**: github.com/anthropics/claude-hooks-rules

---

**¡Hooks y Rules hacen tu workflow más profesional y eficiente!** 🚀

---

*Guía creada para FPUNA Summer 2026*  
*Última actualización: Enero 2026*
