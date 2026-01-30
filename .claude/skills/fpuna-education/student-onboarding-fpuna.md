# Skill: Onboarding Estudiante FPUNA

## Metadata

- **Name**: Onboarding Estudiante FPUNA
- **Category**: Education & Student Success
- **Activation**: When student mentions "nuevo", "empezar", "setup", "configurar", "primer día", "onboarding"
- **Model**: Sonnet (for detailed guidance)
- **Est. Token Cost**: ~2000 tokens

## When to Activate

Trigger when user says:
- "Soy nuevo en el curso"
- "Cómo empiezo"
- "Necesito configurar mi ambiente"
- "Primer día de clase"
- "Onboarding"
- "Setup inicial"
- "No sé por dónde empezar"

## Purpose

Guía completa de onboarding para nuevos estudiantes FPUNA. Configura ambiente de desarrollo, acceso a herramientas, y primeros pasos en el curso.

## Onboarding Checklist

### Phase 1: Preparación del Entorno (15 min)

#### 1.1 Verificar Requisitos del Sistema

**Windows:**
```powershell
# Verificar versiones
python --version  # Python 3.11+
node --version    # Node 18+
git --version     # Git 2.40+
code --version    # VS Code
```

**Linux/Mac:**
```bash
python3 --version
node --version
git --version
```

#### 1.2 Instalar Herramientas Faltantes

**Si falta Python:**
- Descargar: https://python.org/downloads
- **IMPORTANTE:** Marcar "Add Python to PATH"
- Verificar: `python --version`

**Si falta Node.js:**
- Descargar: https://nodejs.org (LTS version)
- Verificar: `node --version`

**Si falta VS Code:**
- Descargar: https://code.visualstudio.com
- Extensiones recomendadas:
  - Python (Microsoft)
  - Claude Code (Anthropic)
  - GitLens
  - Black Formatter

#### 1.3 Configurar Git

```bash
# Configurar identidad
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@fpuna.edu.py"
git config --global init.defaultBranch main

# Verificar
git config --list
```

### Phase 2: Configuración del Proyecto (10 min)

#### 2.1 Clonar Repositorio

```bash
# Crear directorio de trabajo
mkdir ~/fpuna-cursos
cd ~/fpuna-cursos

# Clonar repositorio (si aplica)
git clone https://github.com/usuario/curso-python-fpuna.git
cd curso-python-fpuna
```

#### 2.2 Crear Entorno Virtual

**Windows:**
```powershell
python -m venv venv
.\venv\Scripts\activate
```

**Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### 2.3 Instalar Dependencias

```bash
# Actualizar pip
pip install --upgrade pip

# Instalar requirements
pip install -r requirements.txt

# O instalar manualmente
pip install black isort flake8 mypy pytest
```

### Phase 3: Configuración de Claude Code (10 min)

#### 3.1 Verificar Configuración

```bash
# Archivos de configuración deben existir:
ls .claude/
# settings.local.json
# commands/
# skills/
# mcp/
```

#### 3.2 Configurar Variables de Entorno

Crear archivo `.env`:
```bash
# Copiar template
cp .claude/mcp/env.template .env

# Editar con tus valores
notepad .env  # Windows
# o
nano .env     # Linux/Mac
```

Variables mínimas:
```env
PYTHONPATH=.:./api
APP_ENV=development
USE_FAKE_REDIS=true
```

#### 3.3 Testear MCPs

```
En Claude Code, probar:
"Busca información sobre Python best practices"
"Lista archivos en el directorio actual"
"Analiza el README del proyecto"
```

### Phase 4: Primera Contribución (15 min)

#### 4.1 Crear Primer Archivo

```bash
# Crear archivo de prueba
touch students/tu-nombre/semana-01/hola-mundo.py

# Editar
print("¡Hola FPUNA!")
print("Soy [tu nombre] y estoy empezando el curso")
```

#### 4.2 Verificar Calidad

```bash
# Formatear
black students/tu-nombre/semana-01/hola-mundo.py

# Linting
flake8 students/tu-nombre/semana-01/hola-mundo.py

# Type checking
mypy students/tu-nombre/semana-01/hola-mundo.py
```

#### 4.3 Commit Inicial

```bash
# Agregar y commitear
git add .
git commit -m "feat: Primer commit - configuración inicial

- Configurar entorno de desarrollo
- Crear hola-mundo.py
- Verificar herramientas de calidad

Estudiante: [tu nombre]"
```

## Estructura de Directorios Recomendada

```
fpuna-cursos/
├── curso-python/
│   ├── students/
│   │   └── tu-nombre/
│   │       ├── semana-01/
│   │       ├── semana-02/
│   │       └── proyecto-final/
│   ├── notebooks/
│   ├── datasets/
│   └── docs/
└── venv/
```

## Troubleshooting Común

### Problema: "python" no se reconoce

**Solución Windows:**
```powershell
# Reinstalar Python con "Add to PATH"
# O agregar manualmente:
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Users\TuUsuario\AppData\Local\Programs\Python\Python311", "User")
```

### Problema: Permiso denegado en Git

**Solución:**
```bash
# Configurar credenciales
git config --global credential.helper cache
# O usar SSH:
# https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

### Problema: Dependencias no instalan

**Solución:**
```bash
# Actualizar pip primero
pip install --upgrade pip setuptools wheel

# Instalar con verbose para ver errores
pip install -r requirements.txt -v
```

## Checklist de Éxito

- [ ] Python 3.11+ instalado
- [ ] Node.js 18+ instalado
- [ ] Git configurado
- [ ] VS Code con extensiones
- [ ] Entorno virtual creado
- [ ] Dependencias instaladas
- [ ] Archivo .env configurado
- [ ] Primer archivo Python creado
- [ ] Black, flake8, mypy funcionan
- [ ] Primer commit realizado

## Recursos de Ayuda

### Documentación
- Python: https://docs.python.org/es/3.11/
- Git: https://git-scm.com/book/es/v2
- VS Code: https://code.visualstudio.com/docs

### Comandos Útiles en Claude
```
"/help" - Ver comandos disponibles
"/run-tests" - Ejecutar tests
"/check-org" - Verificar organización
"Setup dataset" - Descargar datasets
```

### Contacto
- Profesor: [nombre]@[fpuna.edu.py]
- Canal Discord: #ayuda-setup
- Horario consultas: [días y horas]

## Próximos Pasos

1. **Leer:** Guía de estilo del curso
2. **Ver:** Video tutorial de setup
3. **Practicar:** Ejercicios semana-01
4. **Unirse:** Grupo de estudio
5. **Configurar:** Calendario con deadlines

## Éxito Criteria

Onboarding completado cuando:
- [ ] Entorno funcional verificado
- [ ] Puede crear y ejecutar archivos Python
- [ ] Herramientas de calidad funcionan
- [ ] Git configurado y funcionando
- [ ] Primera contribución enviada
- [ ] Estudiante puede trabajar independientemente

---

**Last Updated:** 2025-01-30
**Course:** FPUNA AI Education
**Version:** 1.0 - Onboarding Completo
**Maintained by:** FPUNA AI Education Team
