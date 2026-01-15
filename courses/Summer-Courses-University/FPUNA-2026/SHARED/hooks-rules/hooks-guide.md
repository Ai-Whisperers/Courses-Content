# Guía Completa de Hooks

## Tipos de Hooks

### 1. Pre-Generate Hooks
Se ejecutan antes de generar código.

```yaml
hooks:
  pre-generate:
    - name: check-environment
      command: node scripts/check-env.js
      on_fail: abort  # abort, warn, or continue
```

**Casos de uso**:
- Verificar variables de entorno
- Validar estado del proyecto
- Backup de archivos

---

### 2. Post-Generate Hooks
Se ejecutan después de generar código.

```yaml
hooks:
  post-generate:
    - name: format
      command: npm run format
    - name: lint-fix
      command: npm run lint --fix
```

**Casos de uso**:
- Formatear código automáticamente
- Ejecutar linters
- Regenerar documentación
- Compilar TypeScript

---

### 3. Pre-Commit Hooks
Se ejecutan antes de commits Git.

```yaml
hooks:
  pre-commit:
    - name: test
      command: npm test
      on_fail: abort
    - name: build
      command: npm run build
      on_fail: abort
```

**Casos de uso**:
- Ejecutar tests
- Verificar que build funciona
- Validar mensajes de commit

---

### 4. Post-Commit Hooks
Se ejecutan después de commits.

```yaml
hooks:
  post-commit:
    - name: push
      command: git push
    - name: notify
      command: node scripts/notify-team.js
```

---

## Configuración Avanzada

### Hooks Condicionales

```yaml
hooks:
  pre-commit:
    - name: test-changed-files
      command: npm test -- --changed
      condition: "git diff --name-only | grep '\\.test\\.js$'"
```

### Hooks con Timeout

```yaml
hooks:
  pre-commit:
    - name: long-test
      command: npm run test:integration
      timeout: 300  # segundos
```

### Hooks Paralelos

```yaml
hooks:
  post-generate:
    parallel: true  # Ejecutar en paralelo
    hooks:
      - name: lint
        command: npm run lint
      - name: type-check
        command: tsc --noEmit
```

---

## Ejemplos Prácticos

### Proyecto Node.js

```yaml
hooks:
  pre-generate:
    - name: clean
      command: rm -rf dist

  post-generate:
    - name: format
      command: npx prettier --write .
    - name: lint
      command: npx eslint --fix .
  
  pre-commit:
    - name: test
      command: npm test
      on_fail: abort
```

### Proyecto Python

```yaml
hooks:
  post-generate:
    - name: format
      command: black .
    - name: lint
      command: flake8 .
  
  pre-commit:
    - name: test
      command: pytest
    - name: type-check
      command: mypy .
```

---

## Debugging Hooks

### Ver Logs

```bash
# Ver logs de hooks
cat ~/.opencode/logs/hooks.log
```

### Modo Verbose

```yaml
hooks:
  verbose: true  # Mostrar output detallado
  pre-commit:
    - name: test
      command: npm test
```

### Desactivar Hooks Temporalmente

```bash
# Variable de entorno
SKIP_HOOKS=true claude "generar código"
```

---

## Mejores Prácticas

### ✅ HACER
- Usar `on_fail: abort` para hooks críticos
- Mantener hooks rápidos (<30s si posible)
- Documentar qué hace cada hook
- Testear hooks antes de commit

### ❌ NO HACER
- Hooks que modifican estado git
- Hooks interactivos (requieren input)
- Hooks muy lentos (>5min)
- Hooks con side effects peligrosos

---

**Ver también**:
- 📖 [Guía de Rules](./rules-guide.md)
- 📖 [Ejemplos](./examples.md)
- 📖 [Mejores Prácticas](./best-practices.md)

---

*Guía FPUNA Summer 2026*
