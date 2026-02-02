# 🎓 Guía de Setup para Instructores

## FPUNA Verano 2026 - Preparación del Ambiente

Esta guía asegura que todos los tracks tengan las herramientas necesarias instaladas y configuradas antes del inicio del curso.

---

## Requisitos Universales (Todos los Tracks)

### Software Base
```bash
# 1. Node.js (v18+)
node --version  # Debe mostrar v18.x.x o superior

# 2. npm (viene con Node.js)
npm --version

# 3. Git
git --version

# 4. Claude Code / OpenCode
npm install -g @anthropic-ai/claude-code
claude --version
```

### API Key
- Cada estudiante necesita su propia API key de Anthropic
- Opción educacional: Usar key compartida del laboratorio (con límites)
- Crear cuenta en: https://console.anthropic.com/

### Editor de Código
- **VS Code** (recomendado): https://code.visualstudio.com/
- Extensiones esenciales:
  - Claude Code (oficial)
  - Spanish Language Pack
  - GitLens

---

## Track 00: Fundamentos Principales

### Requisitos Adicionales
```bash
# OpenCode (sitio oficial: https://opencode.ai/)
# macOS/Linux:
curl -fsSL https://opencode.ai/install | bash

# O con npm:
npm install -g opencode
```

### Verificación
```bash
opencode --version
```

### Demo para Estudiantes
Ver: `demos/00-fundamentos/demo-basico.md`

---

## Track 01: Desarrollo de Software

### Requisitos Adicionales
```bash
# Python (para algunos ejercicios)
python --version  # 3.10+

# TypeScript
npm install -g typescript ts-node

# Testing frameworks
npm install -g jest
pip install pytest
```

### Extensiones VS Code
- Python
- Pylance
- Jest Runner
- Prettier

### Demo para Estudiantes
- Generación automática de código
- Tests con IA
- Refactoring asistido

---

## Track 02: Electrónica y Automatización

### Software Específico
1. **KiCAD** (Diseño de PCBs)
   - Descargar: https://www.kicad.org/download/
   - Versión: 7.0+

2. **Arduino IDE 2.0**
   - Descargar: https://www.arduino.cc/en/software

3. **Simuladores Online** (sin instalación)
   - Wokwi: https://wokwi.com/
   - Tinkercad: https://www.tinkercad.com/circuits

### Bibliotecas Arduino
```cpp
// Instalar desde Arduino IDE > Library Manager:
// - DHT sensor library
// - Adafruit SSD1306
// - WiFi (ESP32)
// - PubSubClient (MQTT)
```

### Demo para Estudiantes
- Generación de código Arduino con IA
- Diseño de circuitos asistido
- Documentación automática de proyectos

---

## Track 03: Ingeniería Aeronáutica

### Software Específico
1. **XFLR5** (Análisis aerodinámico)
   - Descargar: http://www.xflr5.tech/
   - Gratuito, multiplataforma

2. **Fusion 360** (CAD 3D)
   - Cuenta educacional gratuita
   - https://www.autodesk.com/products/fusion-360

3. **OpenVSP** (Diseño conceptual)
   - Descargar: https://openvsp.org/
   - NASA, gratuito

### Python para Cálculos
```bash
pip install numpy matplotlib scipy
```

### Demo para Estudiantes
- Cálculos aerodinámicos con IA
- Generación de parámetros de diseño
- Análisis de rendimiento

---

## Track 04: Marketing y Comunicación

### Cuentas Necesarias (Gratuitas)
1. **Canva**
   - https://www.canva.com/
   - Cuenta educacional disponible

2. **Buffer** (scheduling)
   - https://buffer.com/
   - Plan gratuito: 3 canales

3. **Mailchimp**
   - https://mailchimp.com/
   - Plan gratuito: 500 contactos

4. **Google Analytics 4**
   - Cuenta demo disponible

### Herramientas IA
- ChatGPT/Claude (ya instalado)
- Canva AI (integrado en Canva)
- Copy.ai (opcional): https://www.copy.ai/

### Demo para Estudiantes
- Generación de calendarios de contenido
- Creación de copy para redes
- Análisis de campañas

---

## Track 05: Investigación y Academia

### Software Específico
1. **Zotero** (gestión de referencias)
   - Descargar: https://www.zotero.org/
   - Extensión de navegador
   - Plugin de Word/LibreOffice

2. **Overleaf** (LaTeX online)
   - https://www.overleaf.com/
   - Cuenta gratuita suficiente

3. **R + RStudio** (análisis estadístico)
   - R: https://cran.r-project.org/
   - RStudio: https://posit.co/download/rstudio-desktop/

### Python para Análisis
```bash
pip install pandas numpy scipy matplotlib seaborn statsmodels jupyter
```

### Demo para Estudiantes
- Búsqueda de literatura con IA
- Análisis de papers
- Generación de código estadístico

---

## Track 06: Hospitalidad y Turismo

### Cuentas Necesarias (Gratuitas)
1. **WhatsApp Business**
   - Descargar app
   - Configurar perfil de negocio demo

2. **Google Business Profile**
   - Crear perfil de negocio demo
   - https://business.google.com/

3. **Canva** (diseño)
   - Ya mencionado en Track 04

4. **Mailchimp** (email marketing)
   - Ya mencionado en Track 04

### Simuladores de PMS (opcional)
- Cloudbeds Demo: https://www.cloudbeds.com/demo/
- Little Hotelier Trial: https://www.littlehotelier.com/

### Demo para Estudiantes
- Diseño de chatbot para hotel
- Generación de respuestas a reviews
- Pricing dinámico con IA

---

## Verificación Pre-Curso

### Checklist del Instructor

#### Día -3 (3 días antes)
- [ ] Todas las computadoras del lab tienen Node.js 18+
- [ ] Claude Code instalado y funcionando
- [ ] VS Code instalado con extensiones
- [ ] Conexión a internet estable
- [ ] Proyector/pantalla funcionando

#### Día -1 (1 día antes)
- [ ] API keys configuradas (o plan de distribución)
- [ ] Software específico del track instalado
- [ ] Demos probados y funcionando
- [ ] Material impreso (si aplica)
- [ ] Acceso a cuentas de demo

#### Día 0 (Inicio)
- [ ] Estudiantes con acceso a computadoras
- [ ] Guía de instalación disponible
- [ ] Soporte técnico identificado
- [ ] Plan B para problemas de conexión

---

## Script de Verificación Rápida

Ejecutar en cada computadora del laboratorio:

```bash
#!/bin/bash
# verify-setup.sh

echo "=== Verificación FPUNA 2026 ==="

echo "Node.js:"
node --version || echo "ERROR: Node.js no instalado"

echo "npm:"
npm --version || echo "ERROR: npm no instalado"

echo "Git:"
git --version || echo "ERROR: Git no instalado"

echo "Claude Code:"
claude --version || echo "ERROR: Claude Code no instalado"

echo "Python:"
python --version || echo "ADVERTENCIA: Python no instalado"

echo "=== Verificación completa ==="
```

---

## Problemas Comunes y Soluciones

### "claude: command not found"
```bash
# Reinstalar globalmente
npm install -g @anthropic-ai/claude-code

# Verificar PATH
echo $PATH | grep npm
```

### "API key inválida"
```bash
# Verificar variable de entorno
echo $ANTHROPIC_API_KEY

# Configurar (reemplazar con key real)
export ANTHROPIC_API_KEY="sk-ant-..."
```

### Conexión lenta
- Usar proxies del laboratorio si existen
- Descargar demos offline
- Preparar screenshots de resultados esperados

### Estudiante sin laptop personal
- Asegurar computadoras del lab disponibles
- Parejas de trabajo (pair programming)
- Acceso remoto si está disponible

---

## Contacto de Soporte

- **IT FPUNA:** soporte@fpuna.edu.py
- **Coordinador del Curso:** [NOMBRE]
- **Emergencias técnicas:** [TELÉFONO]

---

## Recursos Offline

En caso de problemas de conexión, tener disponibles:

1. **Instaladores** (USB drive):
   - Node.js LTS
   - VS Code
   - Git
   - Software específico por track

2. **Documentación offline**:
   - PDFs de guías de instalación
   - Screenshots de demos
   - Ejercicios con soluciones

3. **Demos pregrabados**:
   - Videos de sesiones con IA
   - Capturas de pantalla
   - Resultados esperados

---

*Guía de Setup - FPUNA Verano 2026*
*Última actualización: Enero 2026*
