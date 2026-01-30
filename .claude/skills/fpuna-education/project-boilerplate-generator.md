# Skill: Boilerplate de Proyectos Académicos

## Metadata

- **Name**: Boilerplate de Proyectos Académicos FPUNA
- **Category**: Development & Scaffolding
- **Activation**: When user mentions "crear proyecto", "nuevo proyecto", "boilerplate", "template", "scaffold", "iniciar proyecto", "estructura de proyecto"
- **Model**: Sonnet
- **Est. Token Cost**: ~3000 tokens

## When to Activate

Trigger when user says:
- "Crea un nuevo proyecto de [tipo]"
- "Necesito un boilerplate para [propósito]"
- "Template para proyecto de [materia]"
- "Estructura inicial para [descripción]"
- "Scaffold de proyecto Python"
- "Inicia proyecto con [tecnologías]"

## Purpose

Genera estructura completa de proyectos académicos con configuración de herramientas, documentación inicial, tests y mejores prácticas integradas.

## Tipos de Proyectos Soportados

### 1. Python Application (CLI/App)

```
📁 my-python-app/
├── 📁 src/
│   └── 📁 my_app/
│       ├── 📄 __init__.py
│       ├── 📄 main.py
│       ├── 📄 config.py
│       └── 📄 utils.py
├── 📁 tests/
│   ├── 📄 __init__.py
│   ├── 📄 test_main.py
│   └── 📄 conftest.py
├── 📁 docs/
│   ├── 📄 README.md
│   └── 📄 USAGE.md
├── 📄 .gitignore
├── 📄 .flake8
├── 📄 pyproject.toml
├── 📄 requirements.txt
├── 📄 requirements-dev.txt
├── 📄 setup.py (opcional)
├── 📄 Makefile
└── 📄 LICENSE
```

### 2. Data Science / ML Project

```
📁 my-data-project/
├── 📁 data/
│   ├── 📁 raw/
│   ├── 📁 processed/
│   └── 📁 external/
├── 📁 notebooks/
│   ├── 📄 01-exploracion.ipynb
│   ├── 📄 02-preprocesamiento.ipynb
│   └── 📄 03-modelado.ipynb
├── 📁 src/
│   └── 📁 proyecto/
│       ├── 📄 __init__.py
│       ├── 📄 data.py
│       ├── 📄 features.py
│       ├── 📄 models.py
│       └── 📄 visualization.py
├── 📁 models/
├── 📁 reports/
│   └── 📁 figures/
├── 📁 tests/
├── 📄 .gitignore
├── 📄 requirements.txt
├── 📄 README.md
└── 📄 Dockerfile (opcional)
```

### 3. Web API (FastAPI)

```
📁 my-api/
├── 📁 app/
│   ├── 📄 __init__.py
│   ├── 📄 main.py
│   ├── 📄 config.py
│   ├── 📁 api/
│   │   ├── 📁 v1/
│   │   │   ├── 📄 __init__.py
│   │   │   ├── 📄 endpoints/
│   │   │   └── 📄 deps.py
│   │   └── 📄 api.py
│   ├── 📁 core/
│   ├── 📁 models/
│   ├── 📁 schemas/
│   ├── 📁 services/
│   └── 📁 db/
├── 📁 tests/
├── 📁 alembic/
├── 📄 .env.example
├── 📄 docker-compose.yml
├── 📄 Dockerfile
├── 📄 pyproject.toml
├── 📄 README.md
└── 📄 Makefile
```

### 4. Library / Package

```
📁 my-library/
├── 📁 src/
│   └── 📁 mylib/
│       ├── 📄 __init__.py
│       ├── 📄 core.py
│       └── 📄 helpers.py
├── 📁 tests/
├── 📁 docs/
├── 📄 pyproject.toml
├── 📄 setup.cfg
├── 📄 LICENSE
├── 📄 README.md
├── 📄 CHANGELOG.md
├── 📄 CONTRIBUTING.md
└── 📄 .github/
    └── 📁 workflows/
        └── 📄 ci.yml
```

## Archivos Template

### pyproject.toml Template

```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "{{project_name}}"
version = "0.1.0"
description = "{{project_description}}"
readme = "README.md"
license = {file = "LICENSE"}
authors = [
    {name = "{{author_name}}", email = "{{author_email}}"}
]
classifiers = [
    "Development Status :: 3 - Alpha",
    "Intended Audience :: Education",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.11",
]
requires-python = ">=3.11"
dependencies = [
    "pydantic>=2.0",
    "python-dotenv>=1.0",
]

[project.optional-dependencies]
dev = [
    "black>=23.0",
    "isort>=5.12",
    "flake8>=6.0",
    "mypy>=1.5",
    "pytest>=7.4",
    "pytest-cov>=4.1",
    "pytest-asyncio>=0.21",
]

[tool.black]
line-length = 120
target-version = ['py311']

[tool.isort]
profile = "black"
line_length = 120

[tool.mypy]
python_version = "3.11"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = true

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = "test_*.py"
python_functions = "test_*"
addopts = "-v --tb=short --cov=src --cov-report=term-missing"
```

### README.md Template

```markdown
# {{project_name}}

{{project_description}}

**Autor**: {{author_name}}  
**Institución**: Facultad Politécnica - UNA  
**Asignatura**: {{course_name}}  
**Año**: {{year}}

## 🚀 Instalación

```bash
# Clonar repositorio
git clone {{repo_url}}
cd {{project_name}}

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# o
.\venv\Scripts\activate    # Windows

# Instalar dependencias
pip install -e ".[dev]"
```

## 📝 Uso

```python
from {{package_name}} import main

main.run()
```

## 🧪 Testing

```bash
# Ejecutar tests
pytest -v

# Con coverage
pytest --cov={{package_name}} --cov-report=html
```

## 📊 Calidad de Código

```bash
# Formatear
black src tests
isort src tests

# Linting
flake8 src tests
mypy src
```

## 📄 Licencia

Este proyecto es parte del curso {{course_name}} - FPUNA {{year}}.

---
Desarrollado con ❤️ en Paraguay 🇵🇾
```

### Makefile Template

```makefile
.PHONY: install test lint format clean run

# Variables
PYTHON := python
PIP := pip
PYTEST := pytest
BLACK := black
ISORT := isort
FLAKE8 := flake8
MYPY := mypy

# Instalación
install:
	$(PIP) install -e ".[dev]"

install-prod:
	$(PIP) install -e .

# Testing
test:
	$(PYTEST) -v

test-cov:
	$(PYTEST) --cov=src --cov-report=term-missing --cov-report=html

# Linting y formateo
lint:
	$(FLAKE8) src tests
	$(MYPY) src

format:
	$(BLACK) src tests
	$(ISORT) src tests

format-check:
	$(BLACK) --check src tests
	$(ISORT) --check-only src tests

# Calidad completa
quality: format-check lint test

# Ejecución
run:
	$(PYTHON) -m src.{{package_name}}.main

# Limpieza
clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type f -name "*.pyd" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} +
	find . -type d -name ".pytest_cache" -exec rm -rf {} +
	find . -type d -name ".mypy_cache" -exec rm -rf {} +
	find . -type d -name "htmlcov" -exec rm -rf {} +

# Todo
all: install quality
```

## Proceso de Generación

### Step 1: Recopilar Información

```python
project_config = {
    "name": "nombre-del-proyecto",
    "type": "app|data|api|library",
    "author": {
        "name": "Nombre Completo",
        "email": "email@fpuna.edu.py"
    },
    "course": "Nombre de la Asignatura",
    "description": "Breve descripción",
    "features": [
        "feature1",
        "feature2"
    ],
    "technologies": [
        "fastapi",
        "pandas",
        "pytest"
    ],
    "include_docker": True,
    "include_ci": True,
    "include_docs": True
}
```

### Step 2: Generar Estructura

```bash
# Crear directorios
mkdir -p {{project_name}}/src/{{package_name}}
mkdir -p {{project_name}}/tests
mkdir -p {{project_name}}/docs

# Crear archivos base
touch {{project_name}}/src/{{package_name}}/__init__.py
touch {{project_name}}/src/{{package_name}}/main.py
touch {{project_name}}/tests/__init__.py
touch {{project_name}}/tests/test_main.py

# Renderizar templates
# (Usar Jinja2 para generar contenido)
```

### Step 3: Inicializar Git

```bash
cd {{project_name}}
git init
git add .
git commit -m "Initial commit: Project scaffolding

- Add project structure
- Configure development tools
- Add initial documentation
- Setup testing framework"
```

## Features Opcionales

### Docker

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "-m", "src.{{package_name}}.main"]
```

### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    - name: Install dependencies
      run: |
        pip install -e ".[dev]"
    - name: Run tests
      run: pytest --cov={{package_name}}
    - name: Lint
      run: |
        flake8 src tests
        mypy src
```

### Pre-commit Hooks

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files

  - repo: https://github.com/psf/black
    rev: 23.7.0
    hooks:
      - id: black
        language_version: python3.11

  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort

  - repo: https://github.com/pycqa/flake8
    rev: 6.1.0
    hooks:
      - id: flake8
```

## Success Criteria

Proyecto generado exitosamente cuando:
- [ ] Estructura de directorios completa
- [ ] Archivos de configuración funcionales
- [ ] README.md informativo
- [ ] Tests iniciales presentes
- [ ] Dependencias definidas
- [ ] Herramientas de calidad configuradas
- [ ] Git inicializado con primer commit
- [ ] Documentación inicial completa
- [ ] Ejemplos de uso incluidos

---

**Last Updated:** 2025-01-30
**Course:** FPUNA AI Education
**Version:** 1.0 - Project Boilerplate Generator
**Maintained by:** FPUNA AI Education Team
