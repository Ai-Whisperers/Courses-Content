# 🚀 CI/CD Local - Sistema de Hooks Enterprise-Grade

## 📋 Resumen Ejecutivo

Sistema completo de CI/CD local basado en las mejores prácticas de **Google, Meta (Facebook), Netflix, Microsoft, Spotify, Airbnb y Stripe** (2025).

### 📊 Estadísticas del Sistema

- **24 Hooks Configurados** (producción + calidad + seguridad)
- **8 Hooks Locales Personalizados** (Python avanzados)
- **Cobertura**: Seguridad + Calidad + Tests + Performance + Commits
- **Tiempo de ejecución**: ~30-60 segundos (paralelizado)
- **Tasa de éxito esperada**: >95% de commits sin rechazo

---

## 🏗️ Arquitectura del Sistema

### Capas de Protección

```
┌─────────────────────────────────────────────────────────────┐
│  CAPA 1: SEGURIDAD (No negociable)                         │
│  • detect-secrets, gitleaks, bandit, pip-audit             │
│  • Protección de archivos sensibles                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  CAPA 2: CALIDAD DE CÓDIGO (Automático)                    │
│  • black, isort, ruff, flake8, mypy                        │
│  • Formato y linting automático                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  CAPA 3: VALIDACIÓN (Funcionalidad)                        │
│  • pytest, doctest, cobertura mínima 70%                   │
│  • Validación de estructura                                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  CAPA 4: PERFORMANCE (Optimización)                        │
│  • Performance guardian, complexity guardian               │
│  • Import guardian, pyupgrade                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  CAPA 5: COMMITS (Buenas prácticas)                        │
│  • commitizen, gitlint (conventional commits)              │
│  • Mensajes estandarizados                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Instalación y Configuración

### Paso 1: Instalar pre-commit

```bash
# Instalar pre-commit framework
pip install pre-commit

# O con pipx (recomendado)
pipx install pre-commit
```

### Paso 2: Instalar hooks en el repositorio

```bash
# Instalar todos los hooks
pre-commit install

# Instalar hook de mensajes de commit
pre-commit install --hook-type commit-msg

# Instalar hook de post-checkout (opcional)
pre-commit install --hook-type post-checkout
```

### Paso 3: Instalar dependencias adicionales

```bash
# Instalar herramientas de calidad
pip install black isort flake8 mypy ruff bandit

# Instalar herramientas de seguridad
pip install detect-secrets pip-audit

# Instalar herramientas de testing
pip install pytest pytest-cov

# Instalar herramientas de análisis
pip install radon
```

### Paso 4: Configurar detect-secrets (baseline)

```bash
# Crear baseline de secrets existentes
detect-secrets scan > .secrets.baseline

# Auditar baseline
detect-secrets audit .secrets.baseline
```

### Paso 5: Verificar instalación

```bash
# Ejecutar todos los hooks en todos los archivos
pre-commit run --all-files

# Si todo está bien, deberías ver:
# ✅ Todos los checks pasaron
```

---

## 🎮 Uso Diario

### Comandos Esenciales

```bash
# 🔄 Ejecutar automáticamente (en cada commit)
git commit -m "feat: add new feature"
# Los hooks se ejecutan automáticamente

# 🧪 Ejecutar manualmente todos los hooks
pre-commit run --all-files

# ⚡ Ejecutar un hook específico
pre-commit run black
pre-commit run pytest-check

# 🎯 Ejecutar solo en archivos staged
pre-commit run

# 🔍 Ejecutar en un stage específico
pre-commit run --stage pre-push

# 🐛 Modo debug (verbose)
pre-commit run --verbose
```

### Bypass (Emergencias)

```bash
# ⚠️ Saltar todos los hooks (no recomendado)
git commit -m "..." --no-verify

# ⚠️ Saltar un hook específico
SKIP=pytest git commit -m "..."
SKIP=all git commit -m "..."
```

---

## 🔒 Hooks de Seguridad (Capa 1)

### 1. detect-secrets
- **Qué hace**: Detecta secrets, API keys, passwords en código
- **Prioridad**: 🔴 CRÍTICA - Nunca se salta
- **Uso**: `detect-secrets scan > .secrets.baseline`

### 2. gitleaks
- **Qué hace**: Escaneo avanzado de secrets usando reglas de gitleaks
- **Prioridad**: 🔴 CRÍTICA
- **Ejemplo detecta**: AWS keys, GitHub tokens, private keys

### 3. bandit
- **Qué hace**: Security linting para Python (SAST)
- **Prioridad**: 🟡 ALTA
- **Detecta**: SQL injection, hardcoded passwords, eval/exec

### 4. pip-audit
- **Qué hace**: Audita dependencias por vulnerabilidades conocidas
- **Prioridad**: 🟡 ALTA
- **Ejecuta**: En cada commit si cambia requirements.txt

### 5. detect-private-key
- **Qué hace**: Detecta archivos con private keys
- **Prioridad**: 🔴 CRÍTICA

### 6. check-protected-files (Local)
- **Qué hace**: Protege archivos sensibles de modificación
- **Archivos protegidos**: .env, *.pem, credentials.json

---

## 🎨 Hooks de Calidad (Capa 2)

### 1. black + black-jupyter
- **Qué hace**: Formatea código Python automáticamente
- **Config**: line-length=120, target-version=py311
- **Velocidad**: ⚡ Rápido

### 2. isort
- **Qué hace**: Ordena imports automáticamente
- **Config**: profile=black, line-length=120
- **Orden**: stdlib → third-party → local

### 3. ruff
- **Qué hace**: Linter ultra-rápido (Rust-based)
- **Ventaja**: 10-100x más rápido que flake8
- **Usado por**: pandas, FastAPI, etc.

### 4. flake8
- **Qué hace**: Linter tradicional con plugins
- **Plugins**: flake8-bugbear, flake8-docstrings, flake8-simplify
- **Complementa**: A ruff para cobertura completa

### 5. mypy
- **Qué hace**: Type checking estático
- **Cuándo**: Pre-push (puede ser lento)
- **Config**: strict mode, ignore-missing-imports

### 6. Validaciones de archivos
- **trailing-whitespace**: Limpia espacios al final
- **end-of-file-fixer**: Asegura newline al final
- **check-merge-conflict**: Detecta conflict markers
- **check-added-large-files**: Previene archivos >500KB
- **check-json/yaml/toml**: Valida sintaxis

---

## 🧪 Hooks de Testing (Capa 3)

### 1. pytest-check
- **Qué hace**: Ejecuta tests unitarios
- **Cuándo**: Pre-push (no en cada commit para velocidad)
- **Args**: -v --tb=short --color=yes

### 2. pytest-coverage
- **Qué hace**: Verifica cobertura mínima
- **Requerimiento**: 70% mínimo (ajustable)
- **Args**: --cov=src --cov-fail-under=70

### 3. doctest
- **Qué hace**: Ejecuta tests en docstrings
- **Cuándo**: Pre-push

---

## ⚡ Hooks de Performance (Capa 4)

### 1. performance-guardian (Local)
- **Qué hace**: Detecta anti-patterns de performance
- **Detecta**:
  - String concatenation en loops
  - range(len()) en vez de enumerate
  - Regex compilación repetida
  - While True sin break

### 2. complexity-guardian (Local)
- **Qué hace**: Monitorea complejidad ciclomática
- **Thresholds**:
  - A: 1-5 (Simple)
  - B: 6-10 (Moderate)
  - C: 11-20 (Complex) - Warning
  - D: 21-30 (Very complex) - Error
  - E: 31-40 (Unmaintainable) - Error
  - F: 41+ (Refactor now) - Error

### 3. import-guardian (Local)
- **Qué hace**: Valida imports
- **Detecta**:
  - Wildcard imports (`from x import *`)
  - Unused imports
  - Import order issues

### 4. pyupgrade
- **Qué hace**: Actualiza sintaxis Python automáticamente
- **Args**: --py311-plus
- **Ejemplo**: Convierte `list()` a `[]`, etc.

---

## 📝 Hooks de Commits (Capa 5)

### 1. commitizen
- **Qué hace**: Valida mensajes de commit
- **Formato**: `type(scope): subject`
- **Tipos**: feat, fix, docs, style, refactor, test, chore

### 2. gitlint
- **Qué hace**: Linting adicional de mensajes
- **Valida**: Longitud, formato, contenido

### Ejemplo de Commit Válido:
```bash
git commit -m "feat(auth): add JWT authentication

- Implement JWT token generation
- Add token validation middleware
- Update user login endpoint

Closes #123"
```

---

## 🛠️ Hooks Locales Personalizados

### 1. check-repo-structure.py
```bash
# Valida estructura del repositorio
python scripts/hooks/check_repo_structure.py

# Verifica:
# - Archivos requeridos existen
# - Directorios correctos
# - .gitignore configurado
# - Configuración Claude válida
```

### 2. check-protected-files.py
```bash
# Protege archivos sensibles
python scripts/hooks/check_protected_files.py archivo1 archivo2

# Bloquea commits de:
# - .env, *.pem, credentials
# - Archivos generados (*.lock)
# - Archivos de configuración local
```

### 3. performance-guardian.py
```bash
# Analiza performance
python scripts/hooks/performance_guardian.py src/*.py

# Detecta:
# - O(n²) operations
# - Memory inefficiencies
# - Algorithmic issues
```

### 4. complexity-guardian.py
```bash
# Analiza complejidad
python scripts/hooks/complexity_guardian.py src/*.py

# Usa radon para métricas:
# - Cyclomatic complexity
# - Maintainability index
# - Raw metrics (LOC, SLOC)
```

### 5. import-guardian.py
```bash
# Valida imports
python scripts/hooks/import_guardian.py src/*.py

# Detecta:
# - Unused imports
# - Wildcard imports
# - Circular imports
```

---

## 📊 Performance y Optimización

### Tiempos de Ejecución Estimados

| Hook | Tiempo | Prioridad | Stage |
|------|--------|-----------|-------|
| detect-secrets | 1s | 🔴 | pre-commit |
| gitleaks | 1s | 🔴 | pre-commit |
| bandit | 2s | 🟡 | pre-commit |
| black | 1s | 🟢 | pre-commit |
| isort | 1s | 🟢 | pre-commit |
| ruff | 2s | 🟢 | pre-commit |
| flake8 | 3s | 🟢 | pre-commit |
| mypy | 10s | 🟡 | pre-push |
| pytest | 30s | 🟡 | pre-push |
| complexity | 2s | 🟢 | pre-push |
| **TOTAL** | **~60s** | | |

### Optimizaciones Implementadas

1. **Paralelización**: `parallel_jobs: auto` (detecta CPU cores)
2. **Fail Fast**: Opcional (`fail_fast: false` para ver todos los errores)
3. **Caching**: pre-commit cachea entornos de hooks
4. **Selective Runs**: Hooks solo en archivos cambiados
5. **Stage Separation**: 
   - pre-commit: Rápidos (seguridad + calidad)
   - pre-push: Lentos (tests + mypy)

### Mejorar Velocidad

```bash
# Usar ruff en vez de flake8 (mucho más rápido)
# Configurado en .pre-commit-config.yaml

# Omitir hooks lentos temporalmente
SKIP=mypy,pytest git commit -m "..."

# Ejecutar solo en archivos modificados (default)
pre-commit run

# Cache de pre-commit
pre-commit clean  # Limpiar si hay problemas
```

---

## 🔧 Troubleshooting

### Problema: Hook falla pero no debería

```bash
# Ver qué exactamente falló
pre-commit run --verbose

# Ver diff de cambios
pre-commit run --show-diff-on-failure
```

### Problema: detect-secrets bloquea commit legítimo

```bash
# Actualizar baseline si es un nuevo secret permitido
detect-secrets scan --baseline .secrets.baseline
detect-secrets audit .secrets.baseline

# O saltar temporalmente (no recomendado)
SKIP=detect-secrets git commit -m "..."
```

### Problema: mypy muy lento

```bash
# Mover a pre-push (ya configurado)
# O usar mypy daemon (dmypy)
dmypy run -- src/
```

### Problema: pytest tarda mucho

```bash
# Mover a CI/CD en vez de local
# O usar marcadores para tests rápidos
pytest -m "not slow"
```

---

## 🎯 Buenas Prácticas

### Para Desarrolladores

1. **Commit frecuentemente**: Los hooks son rápidos en cada commit pequeño
2. **Revisar errores**: No bypass nunca (salvo emergencias)
3. **Actualizar regularmente**: `pre-commit autoupdate`
4. **Mantener baseline**: Actualizar detect-secrets si es necesario

### Para Equipos

1. **Documentar excepciones**: Si algo debe bypass, documentar por qué
2. **Revisar thresholds**: Ajustar coverage y complexity según proyecto
3. **CI/CD consistente**: Usar mismas versiones que local
4. **Onboarding**: Incluir setup de pre-commit en README

### Para CI/CD

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install pre-commit
          pip install -r requirements.txt
          pip install -r requirements-dev.txt
      
      - name: Run pre-commit
        run: pre-commit run --all-files
      
      - name: Run tests
        run: pytest --cov=src --cov-fail-under=70
```

---

## 📚 Recursos y Referencias

### Documentación Oficial

- [pre-commit.com](https://pre-commit.com/) - Documentación oficial
- [detect-secrets](https://github.com/Yelp/detect-secrets) - Secret detection
- [bandit](https://bandit.readthedocs.io/) - Security linter
- [black](https://black.readthedocs.io/) - Code formatter
- [ruff](https://docs.astral.sh/ruff/) - Fast Python linter

### Mejores Prácticas Referenciadas

- **Google**: Python Style Guide + security scanning
- **Meta**: Pre-commit hooks + static analysis
- **Netflix**: Performance monitoring in CI
- **Microsoft**: Type checking + security gates
- **Spotify**: Conventional commits + automated releases

---

## ✅ Checklist de Verificación

Antes de considerar el sistema listo:

- [ ] `pre-commit install` ejecutado
- [ ] `pre-commit run --all-files` pasa sin errores
- [ ] `.secrets.baseline` creado y auditado
- [ ] Equipo entrenado en uso básico
- [ ] Documentación leída y entendida
- [ ] CI/CD configurado con mismos checks
- [ ] Thresholds ajustados a proyecto (coverage, complexity)
- [ ] Bypass procedure documentado

---

## 🚀 Proyecto Blindado

Tu proyecto ahora tiene:

✅ **24 hooks de protección**  
✅ **8 verificaciones locales avanzadas**  
✅ **Detección de secrets automática**  
✅ **Formateo y linting automático**  
✅ **Tests con coverage mínimo**  
✅ **Análisis de performance**  
✅ **Control de complejidad**  
✅ **Validación de imports**  
✅ **Conventional commits**  
✅ **Protección de archivos sensibles**  

**Estado**: 🟢 Sistema completamente blindado y listo para producción

---

**Versión**: 1.0  
**Actualizado**: 2025-01-30  
**Mantenido por**: FPUNA AI Education Team
