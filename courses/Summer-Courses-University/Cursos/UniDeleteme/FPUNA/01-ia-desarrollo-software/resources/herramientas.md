# Herramientas para Desarrollo con IA

Guía de herramientas recomendadas para el curso y desarrollo profesional con IA.

---

## 1. Asistentes de Código IA

### GitHub Copilot

**Descripción:** Autocompletado inteligente integrado en el IDE.

| Característica | Detalle |
|----------------|---------|
| Precio | $10/mes individual, gratis para estudiantes |
| IDEs | VS Code, JetBrains, Neovim, Visual Studio |
| Lenguajes | Todos los principales |
| Mejor para | Autocompletado, sugerencias inline |

**Instalación VS Code:**
```
1. Extensiones → Buscar "GitHub Copilot"
2. Instalar
3. Autorizar con cuenta GitHub
```

**Atajos principales:**
- `Tab` - Aceptar sugerencia
- `Esc` - Rechazar
- `Alt + ]` / `Alt + [` - Navegar sugerencias
- `Ctrl + Enter` - Ver todas las sugerencias

---

### GitHub Copilot Chat

**Descripción:** Chat integrado para explicar, refactorizar y generar código.

**Comandos:**
```
/explain   - Explica código seleccionado
/fix       - Corrige errores
/tests     - Genera tests
/doc       - Agrega documentación
/optimize  - Sugiere optimizaciones
```

---

### Claude (Anthropic)

**Descripción:** Modelo conversacional avanzado para código y análisis.

| Característica | Detalle |
|----------------|---------|
| Precio | Free tier disponible, Pro $20/mes |
| Acceso | Web (claude.ai), API |
| Contexto | 100K+ tokens |
| Mejor para | Análisis profundo, código largo, explicaciones |

**Casos de uso:**
- Análisis de código extenso
- Debugging complejo
- Diseño de arquitectura
- Documentación detallada

---

### ChatGPT

**Descripción:** Modelo conversacional de OpenAI.

| Característica | Detalle |
|----------------|---------|
| Precio | Free tier, Plus $20/mes |
| Acceso | Web, API, móvil |
| Modelos | GPT-4, GPT-4o |
| Mejor para | Prototipado rápido, explicaciones |

---

### Amazon CodeWhisperer

**Descripción:** Alternativa gratuita a Copilot de AWS.

| Característica | Detalle |
|----------------|---------|
| Precio | Gratis para uso individual |
| IDEs | VS Code, JetBrains, otros |
| Mejor para | Proyectos AWS, código Python/JS |

---

### Cursor

**Descripción:** IDE basado en VS Code con IA integrada.

| Característica | Detalle |
|----------------|---------|
| Precio | Free tier, Pro $20/mes |
| Base | Fork de VS Code |
| Mejor para | Experiencia IA-first |

---

## 2. IDEs y Editores

### Visual Studio Code

**Extensiones esenciales:**

```
# IA
- GitHub Copilot
- GitHub Copilot Chat

# Python
- Python
- Pylance
- Python Test Explorer

# Calidad de código
- ESLint
- Prettier
- Black Formatter

# Git
- GitLens
- Git Graph

# Productividad
- Error Lens
- Better Comments
- Todo Tree
```

**settings.json recomendado:**
```json
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    },
    "python.analysis.typeCheckingMode": "basic",
    "github.copilot.enable": {
        "*": true,
        "markdown": true,
        "yaml": true
    }
}
```

---

### JetBrains IDEs

**Plugins útiles:**
- GitHub Copilot
- AI Assistant (JetBrains)
- SonarLint

---

## 3. Testing

### pytest (Python)

**Instalación:**
```bash
pip install pytest pytest-cov pytest-mock
```

**Uso básico:**
```bash
# Ejecutar tests
pytest

# Con cobertura
pytest --cov=src --cov-report=html

# Verbose
pytest -v

# Solo tests que coincidan
pytest -k "test_user"
```

---

### Jest (JavaScript)

**Instalación:**
```bash
npm install --save-dev jest
```

**package.json:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

### Testing Library

**Para React:**
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

---

## 4. Linting y Formateo

### Python

```bash
# Instalación
pip install black flake8 isort mypy

# Uso
black src/           # Formateo
flake8 src/          # Linting
isort src/           # Ordenar imports
mypy src/            # Type checking
```

**pyproject.toml:**
```toml
[tool.black]
line-length = 88

[tool.isort]
profile = "black"

[tool.mypy]
python_version = "3.8"
strict = true
```

---

### JavaScript/TypeScript

```bash
# Instalación
npm install --save-dev eslint prettier

# Configuración
npx eslint --init
```

---

### Pre-commit

**Instalación:**
```bash
pip install pre-commit
pre-commit install
```

**.pre-commit-config.yaml:**
```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.1.0
    hooks:
      - id: black

  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8

  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort
```

---

## 5. Documentación

### Sphinx (Python)

**Instalación:**
```bash
pip install sphinx sphinx-rtd-theme
```

**Inicio rápido:**
```bash
sphinx-quickstart docs
```

---

### pdoc

**Alternativa ligera:**
```bash
pip install pdoc
pdoc --html src/
```

---

### MkDocs

**Para documentación general:**
```bash
pip install mkdocs mkdocs-material
mkdocs new .
mkdocs serve
```

---

### Swagger/OpenAPI

**Herramientas:**
- Swagger Editor (online)
- Swagger UI
- flask-openapi3 (Python)

---

## 6. Control de Versiones

### Git

**Configuración:**
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
git config --global init.defaultBranch main
```

**Aliases útiles:**
```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg "log --oneline --graph --decorate"
```

---

### GitHub CLI

**Instalación:**
```bash
# Windows
winget install GitHub.cli

# Mac
brew install gh

# Linux
sudo apt install gh
```

**Comandos útiles:**
```bash
gh auth login
gh repo create
gh pr create
gh issue create
```

---

## 7. Base de Datos

### SQLite

**Incluido en Python:** Ideal para desarrollo y prototipos.

### PostgreSQL

**Cliente:**
- pgAdmin
- DBeaver
- psql (CLI)

### Redis

**Para cache y colas.**

---

## 8. APIs y HTTP

### HTTPie

**Alternativa amigable a curl:**
```bash
pip install httpie

# Uso
http GET api.example.com/users
http POST api.example.com/users name=John
```

---

### Postman

**Cliente gráfico para APIs.**

---

### Insomnia

**Alternativa a Postman.**

---

## 9. Contenedores

### Docker

**Dockerfile básico Python:**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "-m", "src.main"]
```

---

### Docker Compose

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://db:5432/app
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: app
      POSTGRES_PASSWORD: password
```

---

## 10. Recursos Online

### Playgrounds de Código

- **Replit** - IDE online multi-lenguaje
- **CodeSandbox** - Frontend/Node.js
- **Google Colab** - Python/ML

### Documentación

- **DevDocs** - Documentación offline
- **Dash** (Mac) / **Zeal** (Win/Linux)

### Regex

- **regex101.com** - Probar y debuggear regex
- **regexr.com** - Alternativa

### JSON

- **jsonlint.com** - Validar JSON
- **json2csharp.com** - Generar clases desde JSON

### SQL

- **sqlformat.org** - Formatear SQL
- **explain.dalibo.com** - Visualizar EXPLAIN

---

## Resumen de Instalación

### Mínimo Necesario

```bash
# Python
pip install pytest black flake8

# VS Code extensions
code --install-extension GitHub.copilot
code --install-extension ms-python.python
```

### Setup Completo

```bash
# Python tools
pip install pytest pytest-cov black flake8 isort mypy pre-commit

# VS Code extensions
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
code --install-extension ms-python.python
code --install-extension ms-python.vscode-pylance
code --install-extension eamodio.gitlens
code --install-extension usernamehw.errorlens
```

---

*Guía de Herramientas - Curso IA para Desarrollo de Software - FPUNA Paraguay*
