# Guía Completa de Rules

## ¿Qué son las Rules?

Rules son directrices que OpenCode sigue automáticamente al generar código. Son como un "style guide automático".

---

## Categorías de Rules

### 1. Code Style Rules

```yaml
rules:
  code_style:
    javascript:
      - Use camelCase for variables and functions
      - Use PascalCase for classes and components
      - Prefer const over let, avoid var
      - Use template literals instead of string concatenation
      - Arrow functions for callbacks
      - Semicolons required
      - Single quotes for strings
      - Max line length 120 characters
    
    python:
      - Follow PEP 8
      - Use snake_case for functions and variables
      - Use PascalCase for classes
      - Type hints for all function signatures
      - Docstrings for all public functions
      - Max line length 100 characters
```

---

### 2. Documentation Rules

```yaml
rules:
  documentation:
    - All exported functions must have JSDoc/docstring
    - Comments written in Spanish
    - Include @param and @returns for all functions
    - Examples for complex functions
    - README.md in every module folder
    - Inline comments for non-obvious code
```

**OpenCode aplicará estos automáticamente**:
```javascript
/**
 * Calcula el área de un círculo
 * @param {number} radio - El radio del círculo
 * @returns {number} El área calculada
 * @example
 * calcularArea(5); // Retorna 78.54
 */
function calcularArea(radio) {
  return Math.PI * radio * radio;
}
```

---

### 3. Testing Rules

```yaml
rules:
  testing:
    - Generate tests for all public functions
    - Use Jest for JavaScript testing
    - Use Pytest for Python testing
    - Minimum code coverage 80%
    - Test file naming [filename].test.js or test_[filename].py
    - Include edge cases and error scenarios
    - Mock external dependencies
```

---

### 4. Project Structure Rules

```yaml
rules:
  project_structure:
    - API routes in /api or /routes folder
    - React components in /components folder
    - Utilities in /utils folder
    - Tests alongside source files or in /__tests__
    - Configuration files in root or /config
    - Static assets in /public or /static
```

---

### 5. Security Rules

```yaml
rules:
  security:
    - Never hardcode API keys or secrets
    - Use environment variables for sensitive data
    - Validate all user inputs
    - Sanitize data before database queries
    - Use parameterized queries (no string concatenation)
    - Hash passwords with bcrypt
    - Implement rate limiting on APIs
    - Use HTTPS for all external requests
```

---

### 6. Performance Rules

```yaml
rules:
  performance:
    - Use pagination for large datasets
    - Implement caching where appropriate
    - Lazy load images and components
    - Minimize database queries (use joins)
    - Use indexes on frequently queried fields
    - Compress responses
```

---

## Configuración Personalizada

### Rules por Tipo de Archivo

```yaml
rules:
  file_specific:
    "*.tsx":
      - Use functional components
      - Use hooks instead of class methods
      - Export components as default
    
    "*.py":
      - Use type hints
      - Follow Google Python Style Guide
    
    "*.test.js":
      - Use describe/it blocks
      - Clear test names
      - One assertion per test when possible
```

---

### Rules por Proyecto

```yaml
rules:
  project:
    name: proyecto-fpuna-2026
    conventions:
      - Use Spanish for variable names when appropriate
      - Include FPUNA header in all files
      - Follow course style guide
      - Maximum cyclomatic complexity 10
```

---

## Ejemplo Completo

```yaml
# ~/.opencode/hooks-rules.yaml

rules:
  # Estilo de código
  code_style:
    javascript:
      - ES6+ syntax only
      - Functional programming preferred
      - No console.log in production
      - Use async/await over promises
    
    typescript:
      - Strict mode enabled
      - No any types
      - Explicit return types
  
  # Documentación
  documentation:
    - JSDoc for all exports
    - Comments in Spanish
    - README in each major module
  
  # Testing
  testing:
    - Jest for unit tests
    - Playwright for E2E
    - Minimum 80% coverage
    - Test naming: should_[behavior]_when_[condition]
  
  # Estructura
  project_structure:
    - src/ for source code
    - tests/ for test files
    - docs/ for documentation
    - Follow feature-based organization
  
  # Seguridad
  security:
    - Environment variables for secrets
    - Input validation on all endpoints
    - SQL injection prevention
    - XSS prevention
  
  # Framework específico
  framework:
    react:
      - Functional components only
      - Custom hooks in /hooks
      - Styled-components for styling
    
    express:
      - Router-based architecture
      - Middleware in /middleware
      - Error handling middleware at end
```

---

## Verificar que Rules se Aplican

```bash
# Generar código y ver si sigue rules
claude "Crear una función que sume dos números"

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

**Nota cómo aplicó**:
- ✅ JSDoc en español
- ✅ Const y arrow function
- ✅ Validación de inputs
- ✅ Manejo de errores

---

## Rules Globales vs Locales

### Global (`~/.opencode/hooks-rules.yaml`)
Aplica a **todos** tus proyectos.

### Local (`.opencode-rules.yaml` en proyecto)
Aplica **solo a ese proyecto** (sobrescribe global).

```yaml
# .opencode-rules.yaml (en raíz del proyecto)
rules:
  code_style:
    javascript:
      - Use semicolons (override global)
      - Max line 100 (proyecto específico)
```

---

## Mejores Prácticas

### ✅ HACER
- Empezar con pocas rules, agregar gradualmente
- Documentar por qué cada rule existe
- Consistente con el equipo
- Revisar y actualizar rules regularmente

### ❌ NO HACER
- Demasiadas rules (abrumador)
- Rules contradictorias
- Rules muy estrictas que impiden productividad
- Cambiar rules constantemente

---

**Ver también**:
- 📖 [Guía de Hooks](./hooks-guide.md)
- 📖 [Ejemplos](./examples.md)
- 📖 [Mejores Prácticas](./best-practices.md)

---

*Guía FPUNA Summer 2026*
