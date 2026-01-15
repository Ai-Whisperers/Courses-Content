# Mejores Prácticas - Hooks y Rules

## Principios Generales

### 1. Empezar Simple, Iterar

❌ **Mal**: Crear 50 rules desde el inicio  
✅ **Bien**: Empezar con 5-10 rules esenciales, agregar según necesidad

### 2. Documentar el "Por Qué"

```yaml
rules:
  code_style:
    javascript:
      # Por qué: Prevenir mutaciones accidentales
      - Prefer const over let
      
      # Por qué: Mejor manejo de errores async
      - Use async/await over raw promises
```

### 3. Consistencia es Clave

Todos en el equipo deben seguir las mismas rules. No exceptions personales.

---

## Hooks - Mejores Prácticas

### ✅ HACER

**1. Hooks Rápidos**
```yaml
hooks:
  pre-commit:
    - name: quick-lint
      command: npm run lint --max-warnings 0
      timeout: 30  # Máximo 30 segundos
```

**2. On-Fail Apropiado**
```yaml
hooks:
  pre-commit:
    - name: critical-test
      command: npm test
      on_fail: abort  # Crítico, no permitir commit
    
    - name: optional-lint
      command: npm run lint
      on_fail: warn  # No crítico, solo advertir
```

**3. Hooks Idempotentes**
Ejecutar el mismo hook múltiples veces debe dar mismo resultado.

**4. Logs Claros**
```yaml
hooks:
  pre-commit:
    - name: test
      command: npm test -- --verbose
```

### ❌ NO HACER

**1. Hooks Interactivos**
```yaml
# ❌ MAL - requiere input humano
hooks:
  pre-commit:
    - name: ask-user
      command: read -p "Continue? (y/n)"
```

**2. Hooks que Modifican Git**
```yaml
# ❌ MAL - puede causar loops
hooks:
  post-commit:
    - name: auto-commit
      command: git commit --amend
```

**3. Hooks Muy Lentos**
```yaml
# ❌ MAL - 10 minutos es demasiado
hooks:
  pre-commit:
    - name: full-build
      command: npm run build:production  # toma 10 min
```

---

## Rules - Mejores Prácticas

### ✅ HACER

**1. Rules Específicas y Accionables**
```yaml
# ✅ Específico
rules:
  - Use camelCase for variable names
  - Maximum function length 50 lines
  - JSDoc required for exports

# ❌ Vago
rules:
  - Write good code
  - Be consistent
```

**2. Priorizar Rules por Impacto**
```yaml
rules:
  # ALTA PRIORIDAD - Seguridad
  security:
    - Never hardcode secrets
    - Validate all inputs
  
  # MEDIA PRIORIDAD - Calidad
  code_style:
    - Use const over let
  
  # BAJA PRIORIDAD - Estilo
  formatting:
    - Single quotes
```

**3. Rules Complementarias, No Contradictorias**
```yaml
# ✅ Complementarias
rules:
  - Use TypeScript
  - Explicit return types for functions

# ❌ Contradictorias
rules:
  - Use semicolons
  - Never use semicolons  # ¡Contradictorio!
```

### ❌ NO HACER

**1. Demasiadas Rules**
```yaml
# ❌ Abrumador - 100+ rules
rules:
  - [ ... 100 reglas ... ]

# ✅ Razonable - 15-20 rules clave
```

**2. Rules Demasiado Estrictas**
```yaml
# ❌ Impide productividad
rules:
  - Every function must be < 10 lines
  - No function can call more than 2 other functions
  
# ✅ Razonable
rules:
  - Functions should be focused and cohesive
  - Maximum cyclomatic complexity 10
```

---

## Organización del Archivo

### Estructura Recomendada

```yaml
# ~/.opencode/hooks-rules.yaml

# ========================================
# HOOKS
# ========================================
hooks:
  # Pre-generation hooks
  pre-generate:
    - [ ... ]
  
  # Post-generation hooks
  post-generate:
    - [ ... ]
  
  # Git hooks
  pre-commit:
    - [ ... ]
  
  pre-push:
    - [ ... ]

# ========================================
# RULES
# ========================================
rules:
  # Code style
  code_style:
    [ ... ]
  
  # Documentation
  documentation:
    [ ... ]
  
  # Testing
  testing:
    [ ... ]
  
  # Security
  security:
    [ ... ]
  
  # Performance
  performance:
    [ ... ]
```

---

## Hooks y Rules por Etapa del Proyecto

### Inicio del Proyecto
```yaml
# Mínimo al iniciar
hooks:
  post-generate:
    - name: format
      command: npm run format

rules:
  code_style:
    - Basic syntax conventions
  documentation:
    - README required
```

### Desarrollo Activo
```yaml
# Agregar testing
hooks:
  pre-commit:
    - name: test
      command: npm test

rules:
  testing:
    - Tests for new features
  security:
    - Input validation
```

### Pre-Producción
```yaml
# Máxima rigurosidad
hooks:
  pre-push:
    - name: full-test-suite
      command: npm run test:all
    - name: security-audit
      command: npm audit

rules:
  security:
    - No console.log
    - All secrets in environment
  performance:
    - Optimize images
    - Lazy loading
```

---

## Trabajar en Equipo

### 1. Versionar Configuración

```bash
# Incluir en repositorio
git add .opencode-rules.yaml
git commit -m "Add project rules"
```

### 2. Documentar en README

```markdown
## Configuración de Desarrollo

Este proyecto usa OpenCode con hooks y rules automáticos.

### Setup
1. Instalar OpenCode
2. Copiar configuración: `cp .opencode-rules.yaml ~/.opencode/hooks-rules.yaml`
3. Ejecutar: `npm install`

### Hooks Activos
- Pre-commit: Lint + Tests
- Pre-push: Full test suite
```

### 3. Consenso del Equipo

Antes de agregar/cambiar rules:
- Discutir con el equipo
- Documentar razón
- Dar período de adaptación
- Revisar feedback

---

## Mantenimiento

### Revisar Trimestralmente

1. ¿Qué rules se violan frecuentemente? (Quizás demasiado estrictas)
2. ¿Qué bugs se repiten? (Falta un rule)
3. ¿Qué hooks son lentos? (Optimizar o remover)
4. ¿Nuevas mejores prácticas? (Actualizar rules)

### Métricas de Éxito

✅ **Buenos indicadores**:
- Código consistente entre commits
- Menos bugs en producción
- Code reviews más rápidos
- Onboarding de nuevos desarrolladores acelerado

❌ **Malos indicadores**:
- Desarrolladores desactivando hooks frecuentemente
- Complaints sobre strictness
- Desarrollo lento por hooks
- Confusion sobre rules

---

## Recursos

- 📖 [Guía de Hooks](./hooks-guide.md)
- 📖 [Guía de Rules](./rules-guide.md)
- 📖 [Ejemplos](./examples.md)
- 📖 [README Principal](./README.md)

---

**¡La clave es equilibrio entre automatización y flexibilidad!** ⚖️

---

*Guía FPUNA Summer 2026*
