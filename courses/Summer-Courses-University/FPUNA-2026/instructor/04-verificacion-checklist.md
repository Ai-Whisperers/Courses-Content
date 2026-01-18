# Checklist de Verificación Pre-Curso

## Lista de Verificación Completa para Instructores

Usar este checklist **24-48 horas antes** de cada sesión.

---

## 1. Verificación de Sistema Base

### 1.1 Terminal y Comandos
```bash
# Ejecutar cada comando y verificar que funciona

# Node.js
node --version
# ✓ Esperado: v18.x.x o superior

# npm
npm --version
# ✓ Esperado: 9.x.x o superior

# Git
git --version
# ✓ Esperado: git version 2.x.x

# Python
python --version
# ✓ Esperado: Python 3.11.x o superior

# pip
pip --version
# ✓ Esperado: pip 23.x.x
```

**Checklist:**
- [ ] Node.js instalado y funcionando
- [ ] npm instalado y funcionando
- [ ] Git instalado y configurado
- [ ] Python instalado y en PATH
- [ ] pip instalado y funcionando

---

### 1.2 Claude Code / OpenCode
```bash
# Verificar instalación
claude --version
# o
opencode --version

# Verificar API key
echo $ANTHROPIC_API_KEY
# ✓ Debe mostrar: sk-ant-xxxxx (no vacío)

# Test de conexión
claude "responde solo con la palabra CONECTADO"
# ✓ Debe responder: CONECTADO
```

**Checklist:**
- [ ] Claude/OpenCode instalado
- [ ] API key configurada en variable de entorno
- [ ] Conexión a API funcionando
- [ ] Créditos suficientes en cuenta Anthropic

---

### 1.3 MCP Servers
```bash
# Dentro de Claude Code, ejecutar:
/mcp

# ✓ Debe mostrar servidores activos
```

**Checklist:**
- [ ] Archivo settings.json existe en ~/.claude/
- [ ] MCP filesystem conectado
- [ ] MCP memory conectado
- [ ] MCP sequential-thinking conectado

---

## 2. Verificación por Track

### Track 00: Fundamentos de IA
**Requisitos:** Solo sistema base

```bash
# Test completo
claude "crea un archivo test.txt con el texto 'Hola FPUNA' y muéstrame su contenido"
```

**Checklist:**
- [ ] Claude puede crear archivos
- [ ] Claude puede leer archivos
- [ ] Respuestas en español funcionan

---

### Track 01: Desarrollo de Software

```bash
# Node.js/npm
node -e "console.log('Node OK')"
npm -g list --depth=0

# Jest (testing)
jest --version

# ESLint
eslint --version

# Crear proyecto de prueba
mkdir test-track01 && cd test-track01
npm init -y
npm install express
node -e "const express = require('express'); console.log('Express OK')"
cd .. && rm -rf test-track01
```

**Checklist:**
- [ ] Node.js ejecuta código correctamente
- [ ] npm puede instalar paquetes
- [ ] Jest instalado (para tests)
- [ ] ESLint instalado (para linting)
- [ ] Express se instala correctamente
- [ ] Postman/Insomnia disponible

---

### Track 02: Electrónica e IoT

```bash
# Arduino CLI (opcional)
arduino-cli version

# Python para serial
python -c "import serial; print('PySerial OK')"

# Verificar puertos
# Windows: Device Manager → Ports
# Linux: ls /dev/ttyUSB* /dev/ttyACM*
# macOS: ls /dev/tty.usb*
```

**Hardware:**
- [ ] Arduino/ESP32 disponible
- [ ] Cable USB funcional (datos, no solo carga)
- [ ] Drivers instalados (CH340/CP2102)
- [ ] Arduino IDE reconoce la placa

**Software:**
- [ ] Arduino IDE 2.x instalado
- [ ] Boards de ESP32 instalados
- [ ] Librerías básicas instaladas (DHT, WiFi)
- [ ] KiCAD instalado (opcional)

**Test de Hardware:**
1. Conectar Arduino/ESP32
2. Abrir Arduino IDE
3. Tools → Board → Seleccionar placa
4. Tools → Port → Seleccionar puerto COM
5. File → Examples → Basics → Blink
6. Upload → Verificar que LED parpadea

---

### Track 03: Ingeniería Aeronáutica

```bash
# Python científico
python -c "import numpy; print(f'NumPy {numpy.__version__}')"
python -c "import matplotlib; print(f'Matplotlib {matplotlib.__version__}')"
python -c "import scipy; print(f'SciPy {scipy.__version__}')"

# Test de gráfico
python << 'EOF'
import matplotlib.pyplot as plt
import numpy as np
x = np.linspace(0, 10, 100)
plt.plot(x, np.sin(x))
plt.savefig('test_plot.png')
print('Gráfico generado: test_plot.png')
EOF
```

**Checklist:**
- [ ] NumPy instalado
- [ ] Matplotlib instalado y genera gráficos
- [ ] SciPy instalado
- [ ] Jupyter Notebook funciona
- [ ] XFLR5 instalado (opcional)
- [ ] Calculadora científica disponible

---

### Track 04: Marketing Digital

```bash
# Verificar navegador
# Chrome: chrome://version
# Firefox: about:support
```

**Cuentas Online:**
- [ ] Canva accesible con cuenta
- [ ] Meta Business Suite accesible
- [ ] Buffer configurado con red social de prueba
- [ ] Mailchimp con audiencia de prueba
- [ ] Google Analytics demo accesible

**Checklist:**
- [ ] Navegador actualizado
- [ ] Extensiones necesarias instaladas
- [ ] Acceso a internet estable
- [ ] Cuenta de Instagram/Facebook de prueba

---

### Track 05: Investigación Académica

```bash
# Python estadístico
python -c "import pandas; print(f'Pandas {pandas.__version__}')"
python -c "import scipy.stats; print('SciPy Stats OK')"
python -c "import statsmodels; print(f'Statsmodels {statsmodels.__version__}')"

# R (opcional)
R --version
```

**Checklist:**
- [ ] Pandas instalado
- [ ] SciPy stats funciona
- [ ] Zotero instalado y sincronizado
- [ ] JASP o jamovi instalado
- [ ] Overleaf accesible
- [ ] Acceso a Google Scholar

**Test Zotero:**
1. Abrir Zotero
2. Verificar sincronización con cuenta
3. Probar extensión del navegador

---

### Track 06: Hospitalidad y Turismo

```bash
# Google Sheets accesible desde navegador
# Canva accesible desde navegador
```

**Checklist:**
- [ ] WhatsApp Business instalado (o web)
- [ ] Google Sheets accesible
- [ ] Canva accesible
- [ ] Navegador con múltiples pestañas funcionando
- [ ] Acceso a TripAdvisor

---

## 3. Verificación de Demos

### Ejecutar Demo de Prueba
```bash
# Desde la carpeta del curso
cd courses/Summer-Courses-University/FPUNA-2026/demos

# Probar demo básico
claude "$(cat demo-00-fundamentos.md | head -50)"
```

**Checklist:**
- [ ] Archivos de demo accesibles
- [ ] Claude ejecuta ejemplos correctamente
- [ ] Resultados son coherentes

---

## 4. Verificación de Red y Conectividad

```bash
# Test de conectividad
ping google.com -c 3

# Test de API Anthropic
curl -s -o /dev/null -w "%{http_code}" https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "content-type: application/json" \
  -d '{"model":"claude-3-haiku-20240307","max_tokens":10,"messages":[{"role":"user","content":"test"}]}'
# ✓ Esperado: 200
```

**Checklist:**
- [ ] Internet funcionando
- [ ] API de Anthropic accesible
- [ ] Sin bloqueos de firewall
- [ ] VPN desactivada (si causa problemas)

---

## 5. Checklist de Materiales

### Archivos del Curso
- [ ] Carpeta del track copiada localmente
- [ ] Archivos de demo accesibles
- [ ] Recursos (guías, prompts) disponibles
- [ ] Ejemplos de código listos

### Presentación
- [ ] Slides preparados (si aplica)
- [ ] Proyector/pantalla funcionando
- [ ] Audio funcionando (si hay videos)

### Respaldo
- [ ] Copia de archivos en USB
- [ ] Screenshots de demos por si falla internet
- [ ] Plan B si API no funciona

---

## 6. Checklist 30 Minutos Antes

### Verificación Rápida
```bash
# Ejecutar todos los checks en un comando
node --version && \
python --version && \
git --version && \
claude --version && \
echo "API Key: ${ANTHROPIC_API_KEY:0:10}..." && \
echo "✓ Sistema listo"
```

**Checklist Final:**
- [ ] Computadora cargada/conectada
- [ ] Terminal abierta
- [ ] Claude Code funcionando
- [ ] Archivos del track abiertos
- [ ] Navegador con tabs necesarios
- [ ] Agua disponible

---

## 7. Problemas Comunes y Soluciones Rápidas

### Claude no responde
```bash
# Verificar API key
echo $ANTHROPIC_API_KEY

# Si está vacía, configurar:
export ANTHROPIC_API_KEY="sk-ant-xxxxx"

# Reiniciar Claude
claude
```

### npm/node no reconocido
```bash
# Windows: Reiniciar terminal
# o agregar a PATH manualmente
```

### Python no reconocido
```bash
# Usar python3 en lugar de python
python3 --version

# O reinstalar Python marcando "Add to PATH"
```

### Arduino no detecta placa
1. Cambiar cable USB
2. Probar otro puerto USB
3. Reinstalar drivers
4. Reiniciar computadora

### Internet lento
- Tener ejemplos pre-generados
- Usar modelo más pequeño (Haiku)
- Reducir longitud de prompts

---

## 8. Formulario de Verificación

```
VERIFICACIÓN PRE-CURSO - FPUNA 2026
====================================
Fecha: _______________
Track: _______________
Instructor: _______________

SISTEMA BASE:
[ ] Node.js: versión _______
[ ] Python: versión _______
[ ] Git: versión _______
[ ] Claude/OpenCode: versión _______
[ ] API Key configurada

TRACK ESPECÍFICO:
[ ] Software instalado
[ ] Cuentas accesibles
[ ] Hardware listo (si aplica)
[ ] Demos probados

CONECTIVIDAD:
[ ] Internet funcionando
[ ] API accesible
[ ] Sin errores de conexión

MATERIALES:
[ ] Archivos listos
[ ] Respaldos disponibles

FIRMA: _______________

¿LISTO PARA LA CLASE? [ ] SÍ [ ] NO

Si NO, notas:
_________________________________
_________________________________
```

---

## 9. Script de Verificación Automática

### Windows (PowerShell)
```powershell
# Guardar como verify-fpuna.ps1

Write-Host "=== VERIFICACIÓN FPUNA 2026 ===" -ForegroundColor Cyan

# Node
Write-Host "`nNode.js:" -NoNewline
try { node --version } catch { Write-Host " NO INSTALADO" -ForegroundColor Red }

# Python
Write-Host "Python:" -NoNewline
try { python --version } catch { Write-Host " NO INSTALADO" -ForegroundColor Red }

# Git
Write-Host "Git:" -NoNewline
try { git --version } catch { Write-Host " NO INSTALADO" -ForegroundColor Red }

# Claude
Write-Host "Claude:" -NoNewline
try { claude --version } catch { Write-Host " NO INSTALADO" -ForegroundColor Red }

# API Key
Write-Host "`nAPI Key:" -NoNewline
if ($env:ANTHROPIC_API_KEY) {
    Write-Host " Configurada ($($env:ANTHROPIC_API_KEY.Substring(0,10))...)" -ForegroundColor Green
} else {
    Write-Host " NO CONFIGURADA" -ForegroundColor Red
}

Write-Host "`n=== FIN VERIFICACIÓN ===" -ForegroundColor Cyan
```

### macOS/Linux (Bash)
```bash
#!/bin/bash
# Guardar como verify-fpuna.sh

echo "=== VERIFICACIÓN FPUNA 2026 ==="

echo -n "Node.js: "
node --version 2>/dev/null || echo "NO INSTALADO"

echo -n "Python: "
python --version 2>/dev/null || python3 --version 2>/dev/null || echo "NO INSTALADO"

echo -n "Git: "
git --version 2>/dev/null || echo "NO INSTALADO"

echo -n "Claude: "
claude --version 2>/dev/null || echo "NO INSTALADO"

echo -n "API Key: "
if [ -n "$ANTHROPIC_API_KEY" ]; then
    echo "Configurada (${ANTHROPIC_API_KEY:0:10}...)"
else
    echo "NO CONFIGURADA"
fi

echo "=== FIN VERIFICACIÓN ==="
```

---

*Checklist de Verificación - FPUNA 2026*
