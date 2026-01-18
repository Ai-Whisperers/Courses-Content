# Software e Instalación Completa

## Guía de Instalación para Instructores FPUNA 2026

Esta guía lista TODO el software necesario para los 7 tracks del curso.

---

## 1. Software Base (OBLIGATORIO PARA TODOS)

### 1.1 Node.js (Runtime de JavaScript)

**Descarga:** https://nodejs.org/

```bash
# Versión recomendada: 18.x LTS o superior
# Verificar instalación:
node --version   # Debe mostrar v18.x.x o superior
npm --version    # Debe mostrar 9.x.x o superior
```

**Windows:**
1. Descargar el instalador .msi de nodejs.org
2. Ejecutar con opciones por defecto
3. Reiniciar terminal después de instalar

**macOS:**
```bash
brew install node@18
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

### 1.2 Git (Control de Versiones)

**Descarga:** https://git-scm.com/

```bash
# Verificar instalación:
git --version   # Debe mostrar git version 2.x.x
```

**Windows:**
1. Descargar Git for Windows
2. Instalar con opciones por defecto
3. Usar Git Bash para comandos

**Configuración inicial:**
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

---

### 1.3 Visual Studio Code (Editor de Código)

**Descarga:** https://code.visualstudio.com/

**Extensiones recomendadas:**
```
# Instalar desde VS Code o línea de comandos:
code --install-extension ms-python.python
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-typescript-next
```

**Extensiones por track:**

| Track | Extensiones |
|-------|-------------|
| 01 - Desarrollo | ESLint, Prettier, Thunder Client |
| 02 - Electrónica | PlatformIO IDE, C/C++ |
| 03 - Aeronáutica | Python, Jupyter |
| 04 - Marketing | Markdown Preview |
| 05 - Investigación | LaTeX Workshop, Python |
| 06 - Hospitalidad | Markdown Preview |

---

### 1.4 Claude Code / OpenCode (IA)

**Opción A: Claude Code (Oficial de Anthropic)**
```bash
npm install -g @anthropic-ai/claude-code
```

**Opción B: OpenCode (Alternativa open-source)**
```bash
npm install -g @anthropics/opencode
# o
npm install -g oh-my-opencode
```

**Verificar instalación:**
```bash
claude --version
# o
opencode --version
```

**Configurar API Key:**
```bash
# Windows (PowerShell)
$env:ANTHROPIC_API_KEY = "sk-ant-xxxxx"

# Windows (CMD)
set ANTHROPIC_API_KEY=sk-ant-xxxxx

# macOS/Linux
export ANTHROPIC_API_KEY="sk-ant-xxxxx"

# Permanente en .bashrc o .zshrc:
echo 'export ANTHROPIC_API_KEY="sk-ant-xxxxx"' >> ~/.bashrc
```

---

### 1.5 Python 3.11+ (Lenguaje de Programación)

**Descarga:** https://www.python.org/

```bash
# Verificar instalación:
python --version   # Debe mostrar Python 3.11.x o superior
pip --version      # Debe mostrar pip 23.x o superior
```

**Windows:**
1. Descargar instalador de python.org
2. **IMPORTANTE:** Marcar "Add Python to PATH"
3. Instalar con opciones por defecto

**macOS:**
```bash
brew install python@3.11
```

**Linux:**
```bash
sudo apt update
sudo apt install python3.11 python3-pip
```

**Paquetes base de Python:**
```bash
pip install numpy pandas matplotlib scipy jupyter
```

---

## 2. Software por Track

### Track 01: Desarrollo de Software

#### 2.1.1 Herramientas de Testing
```bash
npm install -g jest
pip install pytest pytest-cov
```

#### 2.1.2 Linters y Formatters
```bash
npm install -g eslint prettier
pip install black isort flake8 mypy
```

#### 2.1.3 Bases de Datos (Opcional)
- **PostgreSQL:** https://www.postgresql.org/download/
- **MongoDB:** https://www.mongodb.com/try/download/community
- **Redis:** https://redis.io/download/

#### 2.1.4 Docker (Opcional pero recomendado)
**Descarga:** https://www.docker.com/products/docker-desktop/

```bash
# Verificar:
docker --version
docker-compose --version
```

#### 2.1.5 Postman o Insomnia (Testing de APIs)
- **Postman:** https://www.postman.com/downloads/
- **Insomnia:** https://insomnia.rest/download

---

### Track 02: Electrónica e IoT

#### 2.2.1 Arduino IDE 2.x
**Descarga:** https://www.arduino.cc/en/software

**Configuración post-instalación:**
1. Abrir Arduino IDE
2. File → Preferences → Additional Board Manager URLs:
   ```
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
3. Tools → Board → Boards Manager → Instalar "esp32"

**Librerías a instalar (Sketch → Include Library → Manage Libraries):**
- DHT sensor library (Adafruit)
- Adafruit Unified Sensor
- WiFi (incluida)
- PubSubClient (MQTT)
- ArduinoJson

#### 2.2.2 Drivers USB para placas
**CH340 (Arduino clones chinos):**
- Windows: https://sparks.gogo.co.nz/ch340.html
- macOS: https://github.com/adrianmihalko/ch340g-ch34g-ch34x-mac-os-x-driver

**CP2102 (ESP32/ESP8266):**
- https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers

**Verificar driver:**
```bash
# Windows: Device Manager → Ports (COM & LPT)
# macOS: ls /dev/tty.* | grep -i usb
# Linux: ls /dev/ttyUSB* /dev/ttyACM*
```

#### 2.2.3 KiCAD 7+ (Diseño de PCB)
**Descarga:** https://www.kicad.org/download/

**Librerías adicionales:**
1. Abrir KiCAD
2. Preferences → Manage Symbol Libraries
3. Agregar librerías de componentes comunes

#### 2.2.4 Fritzing (Opcional - Diagramas)
**Descarga:** https://fritzing.org/download/

#### 2.2.5 PlatformIO (Alternativa a Arduino IDE)
```bash
# Instalar como extensión de VS Code
code --install-extension platformio.platformio-ide
```

---

### Track 03: Ingeniería Aeronáutica

#### 2.3.1 Python Científico
```bash
pip install numpy scipy matplotlib pandas
pip install jupyter notebook
pip install sympy  # Matemática simbólica
```

#### 2.3.2 XFLR5 (Análisis de Perfiles)
**Descarga:** https://www.xflr5.tech/xflr5.htm

- Windows: Descargar instalador
- macOS/Linux: Compilar desde source o usar Wine

#### 2.3.3 OpenVSP (Modelado 3D de Aeronaves)
**Descarga:** https://openvsp.org/download.shtml

#### 2.3.4 Octave (Alternativa gratuita a MATLAB)
**Descarga:** https://octave.org/download

```bash
# macOS
brew install octave

# Linux
sudo apt install octave
```

#### 2.3.5 Fusion 360 (CAD - Gratuito para estudiantes)
**Descarga:** https://www.autodesk.com/products/fusion-360/personal

---

### Track 04: Marketing Digital

#### 2.4.1 Canva
**URL:** https://www.canva.com/
- Crear cuenta gratuita
- Opción: Canva for Education (gratuito para educadores)

#### 2.4.2 Navegadores con DevTools
- **Chrome:** https://www.google.com/chrome/
- **Firefox:** https://www.mozilla.org/firefox/

#### 2.4.3 Herramientas SEO (Web-based)
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com/
- Ubersuggest: https://neilpatel.com/ubersuggest/

#### 2.4.4 Buffer o Hootsuite (Scheduling)
- **Buffer:** https://buffer.com/ (plan gratuito disponible)
- **Hootsuite:** https://hootsuite.com/

#### 2.4.5 Mailchimp (Email Marketing)
**URL:** https://mailchimp.com/
- Plan gratuito hasta 500 contactos

---

### Track 05: Investigación Académica

#### 2.5.1 Zotero (Gestión de Referencias)
**Descarga:** https://www.zotero.org/download/

**Plugins recomendados:**
- Zotero Connector (extensión de navegador)
- Better BibTeX (para LaTeX)
- ZotFile (organización de PDFs)

#### 2.5.2 Software Estadístico

**JASP (Gratuito, recomendado):**
https://jasp-stats.org/download/

**jamovi (Alternativa gratuita):**
https://www.jamovi.org/download.html

**R + RStudio (Avanzado):**
- R: https://cran.r-project.org/
- RStudio: https://posit.co/download/rstudio-desktop/

#### 2.5.3 Python para Estadística
```bash
pip install pandas numpy scipy statsmodels
pip install scikit-learn seaborn plotly
pip install jupyter notebook
```

#### 2.5.4 LaTeX (Escritura Académica)

**Overleaf (Online, recomendado):**
https://www.overleaf.com/

**Local:**
- Windows: MiKTeX https://miktex.org/
- macOS: MacTeX https://www.tug.org/mactex/
- Linux: `sudo apt install texlive-full`

#### 2.5.5 Bases de Datos Académicas (Acceso)
- Google Scholar: https://scholar.google.com/
- PubMed: https://pubmed.ncbi.nlm.nih.gov/
- Scielo: https://scielo.org/
- DOAJ: https://doaj.org/

---

### Track 06: Hospitalidad y Turismo

#### 2.6.1 WhatsApp Business
**Descarga:**
- Android: Play Store
- iOS: App Store
- Web: https://web.whatsapp.com/

#### 2.6.2 Google Workspace
- Google Sheets: https://sheets.google.com/
- Google Forms: https://forms.google.com/
- Google Slides: https://slides.google.com/

#### 2.6.3 Canva (mismo que Marketing)
https://www.canva.com/

#### 2.6.4 Herramientas de Revenue Management (Demo)
- **STR:** https://str.com/ (acceso limitado)
- **RateGain:** https://rategain.com/

#### 2.6.5 Plataformas OTA (Cuentas de práctica)
- Booking.com Extranet: https://admin.booking.com/
- TripAdvisor Management: https://www.tripadvisor.com/Owners

---

## 3. Resumen de Comandos de Verificación

```bash
# === SOFTWARE BASE ===
node --version          # v18.x.x o superior
npm --version           # 9.x.x o superior
git --version           # 2.x.x
python --version        # 3.11.x o superior
pip --version           # 23.x.x
code --version          # VS Code instalado

# === CLAUDE/OPENCODE ===
claude --version        # o: opencode --version
echo $ANTHROPIC_API_KEY # Debe mostrar sk-ant-xxxxx

# === TRACK 01: DESARROLLO ===
jest --version
pytest --version
docker --version        # Opcional

# === TRACK 02: ELECTRÓNICA ===
# Verificar en Device Manager que Arduino aparece como COM port
arduino-cli version     # Opcional

# === TRACK 03: AERONÁUTICA ===
python -c "import numpy; print(numpy.__version__)"
python -c "import matplotlib; print(matplotlib.__version__)"

# === TRACK 05: INVESTIGACIÓN ===
python -c "import pandas; print(pandas.__version__)"
python -c "import scipy; print(scipy.__version__)"
```

---

## 4. Troubleshooting Común

### Node.js no reconocido
```bash
# Windows: Agregar a PATH manualmente
# Panel de Control → Sistema → Variables de entorno
# Agregar: C:\Program Files\nodejs\
```

### Python no reconocido
```bash
# Windows: Reinstalar marcando "Add to PATH"
# o agregar manualmente: C:\Users\{user}\AppData\Local\Programs\Python\Python311\
```

### Claude/OpenCode no conecta
```bash
# Verificar API key
echo $ANTHROPIC_API_KEY

# Probar conexión
claude "di hola"
```

### Arduino no detecta placa
1. Verificar cable USB (algunos son solo de carga)
2. Instalar drivers CH340/CP2102
3. Seleccionar puerto correcto en Tools → Port

### Permisos en Linux
```bash
# Arduino/USB
sudo usermod -a -G dialout $USER
# Reiniciar sesión después
```

---

## 5. Script de Instalación Automatizada

### Windows (PowerShell)
```powershell
# Guardar como install-fpuna.ps1

# Instalar Chocolatey (si no está)
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Instalar software base
choco install nodejs-lts git vscode python311 -y

# Instalar herramientas de desarrollo
npm install -g @anthropic-ai/claude-code jest eslint prettier

# Instalar paquetes Python
pip install numpy pandas matplotlib scipy jupyter pytest black

Write-Host "Instalación completada. Reinicia la terminal."
```

### macOS (Homebrew)
```bash
#!/bin/bash
# Guardar como install-fpuna.sh

# Instalar Homebrew si no está
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar software base
brew install node@18 git python@3.11
brew install --cask visual-studio-code

# Instalar herramientas
npm install -g @anthropic-ai/claude-code jest eslint prettier
pip3 install numpy pandas matplotlib scipy jupyter pytest black

echo "Instalación completada. Reinicia la terminal."
```

### Linux (Ubuntu/Debian)
```bash
#!/bin/bash
# Guardar como install-fpuna.sh

# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependencias
sudo apt install -y curl git python3.11 python3-pip

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar VS Code
sudo snap install code --classic

# Instalar herramientas
sudo npm install -g @anthropic-ai/claude-code jest eslint prettier
pip3 install numpy pandas matplotlib scipy jupyter pytest black

echo "Instalación completada. Reinicia la terminal."
```

---

*Guía de Software - FPUNA 2026*
