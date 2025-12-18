# Template: Proyecto Base con IA

Este template proporciona una estructura base para proyectos desarrollados con asistencia de IA.

---

## Estructura del Proyecto

```
proyecto/
├── src/                    # Código fuente
│   ├── __init__.py
│   ├── main.py            # Punto de entrada
│   ├── config.py          # Configuración
│   ├── models/            # Modelos de datos
│   │   └── __init__.py
│   ├── services/          # Lógica de negocio
│   │   └── __init__.py
│   ├── routes/            # Endpoints (si es API)
│   │   └── __init__.py
│   └── utils/             # Utilidades
│       └── __init__.py
├── tests/                  # Tests
│   ├── __init__.py
│   ├── conftest.py        # Fixtures pytest
│   ├── test_models.py
│   └── test_services.py
├── docs/                   # Documentación
│   ├── api.md
│   └── architecture.md
├── scripts/                # Scripts de utilidad
│   └── setup.sh
├── .env.example           # Variables de entorno ejemplo
├── .gitignore
├── README.md
├── requirements.txt       # Dependencias Python
├── pyproject.toml         # Configuración del proyecto
└── Makefile              # Comandos comunes
```

---

## Archivos Base

### requirements.txt

```
# Framework
flask==3.0.0
# Base de datos
sqlalchemy==2.0.23
# Testing
pytest==7.4.3
pytest-cov==4.1.0
# Utilidades
python-dotenv==1.0.0
```

### pyproject.toml

```toml
[project]
name = "mi-proyecto"
version = "0.1.0"
description = "Descripción del proyecto"
requires-python = ">=3.8"

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = "test_*.py"
addopts = "-v --cov=src --cov-report=html"

[tool.black]
line-length = 88
target-version = ["py38"]

[tool.isort]
profile = "black"
```

### .gitignore

```
# Python
__pycache__/
*.py[cod]
*$py.class
.Python
venv/
.venv/

# Testing
.pytest_cache/
htmlcov/
.coverage

# IDE
.vscode/
.idea/
*.swp

# Environment
.env
*.env.local

# Build
dist/
build/
*.egg-info/

# OS
.DS_Store
Thumbs.db
```

### .env.example

```
# Configuración de la aplicación
APP_ENV=development
DEBUG=true
SECRET_KEY=cambiar-en-produccion

# Base de datos
DATABASE_URL=sqlite:///app.db

# Logging
LOG_LEVEL=DEBUG
```

### Makefile

```makefile
.PHONY: install test lint format run clean

install:
	pip install -r requirements.txt

test:
	pytest

test-cov:
	pytest --cov=src --cov-report=html

lint:
	flake8 src tests
	mypy src

format:
	black src tests
	isort src tests

run:
	python -m src.main

clean:
	rm -rf __pycache__ .pytest_cache htmlcov .coverage
	find . -type d -name "__pycache__" -exec rm -rf {} +
```

---

## Código Base

### src/__init__.py

```python
"""
Mi Proyecto - Descripción breve.
"""

__version__ = "0.1.0"
```

### src/config.py

```python
"""Configuración de la aplicación."""

import os
from dataclasses import dataclass
from typing import Optional

from dotenv import load_dotenv

load_dotenv()


@dataclass
class Config:
    """Configuración centralizada."""

    # App
    ENV: str = os.getenv("APP_ENV", "development")
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-secret-key")

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///app.db")

    # Logging
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

    @property
    def is_development(self) -> bool:
        """Verifica si está en modo desarrollo."""
        return self.ENV == "development"

    @property
    def is_production(self) -> bool:
        """Verifica si está en modo producción."""
        return self.ENV == "production"


config = Config()
```

### src/main.py

```python
"""Punto de entrada de la aplicación."""

import logging
from src.config import config


def setup_logging() -> None:
    """Configura el logging de la aplicación."""
    logging.basicConfig(
        level=getattr(logging, config.LOG_LEVEL),
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    )


def main() -> None:
    """Función principal."""
    setup_logging()
    logger = logging.getLogger(__name__)

    logger.info(f"Iniciando aplicación en modo {config.ENV}")

    # TODO: Agregar lógica principal aquí


if __name__ == "__main__":
    main()
```

### tests/conftest.py

```python
"""Fixtures compartidos para tests."""

import pytest


@pytest.fixture
def sample_data():
    """Datos de ejemplo para tests."""
    return {
        "id": 1,
        "name": "Test",
        "value": 100,
    }


@pytest.fixture
def mock_config(monkeypatch):
    """Configuración mockeada para tests."""
    monkeypatch.setenv("APP_ENV", "testing")
    monkeypatch.setenv("DEBUG", "true")
    monkeypatch.setenv("DATABASE_URL", "sqlite:///:memory:")
```

---

## README Template

```markdown
# Nombre del Proyecto

Descripción breve del proyecto.

## Requisitos

- Python 3.8+
- pip

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/usuario/proyecto.git
cd proyecto

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# o: venv\Scripts\activate  # Windows

# Instalar dependencias
make install
```

## Configuración

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar variables según necesidad
```

## Uso

```bash
# Ejecutar aplicación
make run

# Ejecutar tests
make test

# Ver cobertura
make test-cov
```

## Estructura del Proyecto

[Descripción de la estructura]

## API Reference

[Si aplica, documentar endpoints]

## Contribuir

1. Fork del proyecto
2. Crear branch (`git checkout -b feature/nueva-feature`)
3. Commit (`git commit -m 'feat: agregar nueva feature'`)
4. Push (`git push origin feature/nueva-feature`)
5. Crear Pull Request

## Licencia

MIT
```

---

## Prompts para Desarrollo

### Iniciar Proyecto

```
Estoy iniciando un proyecto [tipo de proyecto] en Python.

Propósito: [descripción]
Funcionalidades principales:
- [funcionalidad 1]
- [funcionalidad 2]

Genera:
1. Estructura de carpetas recomendada
2. requirements.txt con dependencias
3. Archivo de configuración
4. README inicial
```

### Agregar Feature

```
Necesito agregar [funcionalidad] a mi proyecto.

Contexto actual:
- Estructura: [descripción]
- Tecnologías: [lista]

Genera:
1. Código para la nueva funcionalidad
2. Tests correspondientes
3. Actualización de documentación
```

### Revisar Código

```
Revisa este código y sugiere mejoras:

```[lenguaje]
[código]
```

Enfócate en:
- Legibilidad
- Mejores prácticas
- Posibles bugs
- Rendimiento
```

---

## Checklist de Proyecto

### Setup Inicial
- [ ] Estructura de carpetas creada
- [ ] requirements.txt configurado
- [ ] .gitignore agregado
- [ ] .env.example creado
- [ ] README inicial escrito

### Desarrollo
- [ ] Modelos definidos
- [ ] Servicios implementados
- [ ] Tests escritos
- [ ] Documentación de código

### Pre-Release
- [ ] Tests pasan
- [ ] Cobertura > 80%
- [ ] Sin vulnerabilidades de seguridad
- [ ] README actualizado
- [ ] Changelog escrito

---

*Template del Curso: IA para Desarrollo de Software - FPUNA Paraguay*
