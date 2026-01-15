# Ejemplos de Hooks y Rules

## Configuración para Estudiante de FPUNA

```yaml
# ~/.opencode/hooks-rules.yaml

hooks:
  post-generate:
    - name: format
      command: npx prettier --write .
    - name: add-header
      command: node scripts/add-fpuna-header.js

  pre-commit:
    - name: test
      command: npm test
      on_fail: warn  # No abortar, solo advertir

rules:
  code_style:
    javascript:
      - Use Spanish for variable names when appropriate
      - camelCase for variables
      - Include comments explaining logic
      - Maximum function length 50 lines
  
  documentation:
    - Comments in Spanish
    - Include student name and carnet in file header
    - JSDoc for all functions
  
  project:
    - Follow FPUNA coding standards
    - Include README with project description
```

---

## Configuración Desarrollo Profesional

```yaml
hooks:
  pre-commit:
    - name: lint
      command: npm run lint
      on_fail: abort
    - name: test
      command: npm run test:unit
      on_fail: abort
    - name: type-check
      command: npm run type-check
      on_fail: abort

  pre-push:
    - name: test-e2e
      command: npm run test:e2e
      on_fail: abort

rules:
  code_style:
    typescript:
      - Strict mode enabled
      - No any types
      - Explicit return types
      - Prefer interfaces over types
  
  testing:
    - Minimum 85% coverage
    - Unit tests for all business logic
    - E2E tests for critical paths
  
  security:
    - No console.log in production
    - Validate all inputs
    - Use environment variables for secrets
```

---

## Configuración Full Stack

```yaml
hooks:
  post-generate:
    parallel: true
    hooks:
      - name: format-frontend
        command: cd frontend && npm run format
      - name: format-backend
        command: cd backend && npm run format

  pre-commit:
    - name: test-frontend
      command: cd frontend && npm test
    - name: test-backend
      command: cd backend && npm test
      on_fail: abort

rules:
  code_style:
    frontend:
      - React functional components only
      - Hooks for state management
      - Styled-components for CSS
    
    backend:
      - Express router pattern
      - Async/await for all DB calls
      - Error middleware at end

  project_structure:
    - frontend/ for React app
    - backend/ for Express API
    - shared/ for common types
    - docker-compose.yml in root
```

---

## Configuración Proyecto de Investigación

```yaml
hooks:
  post-generate:
    - name: format-code
      command: black .
    - name: sort-imports
      command: isort .

  pre-commit:
    - name: test
      command: pytest
    - name: lint
      command: flake8 .
    - name: type-check
      command: mypy .

rules:
  code_style:
    python:
      - Follow PEP 8
      - Type hints required
      - Docstrings (Google style)
      - Max complexity 10
  
  documentation:
    - Jupyter notebooks in /notebooks
    - LaTeX for papers in /papers
    - README with methodology
  
  testing:
    - pytest for all tests
    - Coverage > 75%
    - Test data in /tests/fixtures
```

---

## Configuración Microservicios

```yaml
hooks:
  pre-commit:
    - name: lint-all-services
      command: ./scripts/lint-all.sh
    - name: test-changed
      command: ./scripts/test-changed-services.sh

  pre-push:
    - name: integration-tests
      command: docker-compose -f docker-compose.test.yml up --abort-on-container-exit

rules:
  code_style:
    - Each service follows same conventions
    - OpenAPI spec for all APIs
    - Consistent error handling
  
  project_structure:
    - services/[service-name]/src
    - services/[service-name]/tests
    - services/[service-name]/Dockerfile
    - shared/types for common interfaces
  
  testing:
    - Unit tests in each service
    - Integration tests in /tests/integration
    - E2E tests in /tests/e2e
```

---

## Configuración Mobile (React Native)

```yaml
hooks:
  post-generate:
    - name: format
      command: npm run format
    - name: lint
      command: npm run lint --fix

rules:
  code_style:
    - Functional components with hooks
    - StyleSheet.create for styles
    - Separate presentational and container components
  
  project_structure:
    - src/components for reusable components
    - src/screens for screens
    - src/navigation for navigation
    - src/services for API calls
    - src/utils for utilities
  
  performance:
    - Use React.memo for expensive components
    - FlatList for lists
    - Image optimization
```

---

*Ejemplos para FPUNA Summer 2026*
