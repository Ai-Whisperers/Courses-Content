# Comandos Rápidos Durante el Curso

## Referencia Rápida para Instructores

Comandos útiles para usar durante las sesiones de clase.

---

## 1. Claude Code - Comandos Básicos

### Iniciar y Configurar
```bash
# Iniciar Claude Code
claude

# Iniciar en modo interactivo
claude -i

# Iniciar con prompt específico
claude "tu prompt aquí"

# Ver ayuda
claude --help
```

### Comandos Slash (Dentro de Claude)
```bash
/help              # Ver comandos disponibles
/clear             # Limpiar conversación
/mcp               # Ver MCP servers activos
/compact           # Compactar contexto
/quit              # Salir
```

### Variables de Entorno Rápidas
```bash
# Windows (CMD) - temporal
set ANTHROPIC_API_KEY=sk-ant-xxxxx

# Windows (PowerShell) - temporal
$env:ANTHROPIC_API_KEY = "sk-ant-xxxxx"

# macOS/Linux - temporal
export ANTHROPIC_API_KEY="sk-ant-xxxxx"
```

---

## 2. Comandos por Track

### Track 00: Fundamentos

```bash
# Demo básico
claude "explica qué es la inteligencia artificial en 3 oraciones"

# Crear archivo
claude "crea un archivo llamado hola.txt con el texto 'Hola FPUNA'"

# Leer archivo
claude "lee el archivo hola.txt y muéstrame su contenido"

# Matemáticas
claude "calcula 15% de 450000 guaraníes"
```

---

### Track 01: Desarrollo de Software

```bash
# Crear proyecto Node.js
mkdir proyecto && cd proyecto
npm init -y

# Instalar dependencias comunes
npm install express cors dotenv
npm install -D jest eslint prettier

# Ejecutar servidor
node index.js

# Ejecutar tests
npm test
# o
jest

# Linting
npm run lint
# o
eslint .

# Formatear código
npm run format
# o
prettier --write .
```

**Prompts útiles para Claude:**
```bash
# Generar API
claude "crea una API REST con Express para gestionar productos"

# Escribir tests
claude "escribe tests con Jest para esta función: [código]"

# Debugging
claude "este código tiene un bug, encuéntralo: [código]"

# Refactoring
claude "refactoriza este código para que sea más limpio: [código]"
```

---

### Track 02: Electrónica e IoT

```bash
# Arduino CLI
arduino-cli board list          # Listar placas conectadas
arduino-cli compile --fqbn arduino:avr:uno sketch/
arduino-cli upload -p COM3 --fqbn arduino:avr:uno sketch/

# Ver puertos seriales
# Windows
mode
# Linux
ls /dev/tty*
# macOS
ls /dev/cu.*

# Monitor serial (Python)
python -m serial.tools.miniterm COM3 9600
```

**Prompts útiles:**
```bash
# Código Arduino
claude "escribe código Arduino para leer un sensor DHT11 y mostrar temperatura"

# Cálculos
claude "calcula la resistencia necesaria para un LED de 2V con alimentación de 5V"

# Explicar circuito
claude "explica cómo funciona un divisor de voltaje"

# BOM
claude "genera una lista de materiales para un sistema de riego automático"
```

---

### Track 03: Ingeniería Aeronáutica

```bash
# Python científico
python -c "import numpy as np; print(np.pi)"

# Jupyter Notebook
jupyter notebook

# Ejecutar script
python calculo_sustentacion.py

# Instalar paquete faltante
pip install nombre_paquete
```

**Prompts útiles:**
```bash
# Cálculo de sustentación
claude "calcula la sustentación de un ala con S=16m², V=60m/s, CL=0.8"

# Perfil NACA
claude "explica el significado de cada dígito en el perfil NACA 2412"

# Código Python
claude "genera código Python para graficar la polar de arrastre"

# Dimensionamiento
claude "dimensiona el ala para un UAV de 25kg de peso"
```

---

### Track 04: Marketing Digital

```bash
# Abrir herramientas web
start https://canva.com      # Windows
open https://canva.com       # macOS

# Crear carpeta para assets
mkdir -p assets/images assets/copy
```

**Prompts útiles:**
```bash
# Captions Instagram
claude "escribe 5 captions para Instagram para una cafetería en Asunción"

# Email marketing
claude "escribe un email de bienvenida para nuevos suscriptores de una tienda de electrónica"

# Responder reviews
claude "escribe una respuesta profesional a este review negativo: [review]"

# SEO
claude "genera 15 keywords para una página de alquiler de departamentos en Asunción"

# Copy para ads
claude "escribe copy para Meta Ads para una academia de inglés, objetivo: generar leads"
```

---

### Track 05: Investigación Académica

```bash
# Python estadístico
python -c "import pandas as pd; print(pd.__version__)"

# Jupyter para análisis
jupyter notebook

# R (si está instalado)
R
Rscript script.R

# Abrir Zotero
# Buscar en menú de aplicaciones
```

**Prompts útiles:**
```bash
# Estrategia de búsqueda
claude "diseña una estrategia de búsqueda sistemática para el tema: [tema]"

# Analizar paper
claude "analiza este abstract y extrae: tipo de estudio, muestra, hallazgos: [abstract]"

# Plan estadístico
claude "planifica el análisis estadístico para un diseño cuasi-experimental pre-post"

# Mejorar redacción
claude "mejora este párrafo de introducción con tono académico: [párrafo]"

# Código estadístico
claude "genera código Python para hacer un t-test y graficar los resultados"
```

---

### Track 06: Hospitalidad y Turismo

```bash
# Abrir Google Sheets
start https://sheets.google.com   # Windows
open https://sheets.google.com    # macOS

# Abrir Canva
start https://canva.com
```

**Prompts útiles:**
```bash
# Chatbot
claude "diseña un chatbot de WhatsApp para un hotel boutique de 30 habitaciones"

# Email pre-llegada
claude "escribe un email de pre-llegada para un eco-lodge"

# Pricing
claude "crea una matriz de precios dinámicos para un hotel de playa"

# Reviews
claude "escribe respuestas para estos 3 reviews de TripAdvisor: [reviews]"

# Upselling
claude "diseña 5 oportunidades de upselling para un lodge en el Pantanal"
```

---

## 3. Troubleshooting Rápido

### Claude no responde
```bash
# Verificar API key
echo $ANTHROPIC_API_KEY         # Linux/macOS
echo %ANTHROPIC_API_KEY%        # Windows CMD
$env:ANTHROPIC_API_KEY          # PowerShell

# Si está vacía, configurar temporalmente
export ANTHROPIC_API_KEY="sk-ant-xxxxx"  # Linux/macOS
set ANTHROPIC_API_KEY=sk-ant-xxxxx       # Windows
```

### Error de permisos
```bash
# Linux/macOS
sudo chown -R $USER ~/.claude
chmod -R 755 ~/.claude

# Windows: Ejecutar como administrador
```

### Paquete de Python no encontrado
```bash
pip install nombre_paquete
# o
pip3 install nombre_paquete
# o con usuario
pip install --user nombre_paquete
```

### npm error
```bash
# Limpiar cache
npm cache clean --force

# Reinstalar node_modules
rm -rf node_modules package-lock.json
npm install
```

### Arduino no detecta placa
```bash
# Verificar puerto
# Windows: Device Manager → Ports
# Linux: dmesg | tail -20
# macOS: ls /dev/cu.usb*

# Cambiar permisos Linux
sudo usermod -a -G dialout $USER
# Reiniciar sesión
```

---

## 4. Snippets Copiables

### Prompt de Sistema Típico
```
Eres un asistente experto en [tema].
Responde en español de Paraguay.
Sé conciso pero completo.
Incluye ejemplos prácticos.
```

### Template de API REST
```javascript
const express = require('express');
const app = express();
app.use(express.json());

let items = [];

app.get('/items', (req, res) => res.json(items));
app.post('/items', (req, res) => {
  items.push(req.body);
  res.status(201).json(req.body);
});

app.listen(3000, () => console.log('Server en puerto 3000'));
```

### Template Arduino Básico
```cpp
void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}
```

### Template Python Científico
```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y)
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Gráfico de Ejemplo')
plt.grid(True)
plt.savefig('grafico.png', dpi=300)
plt.show()
```

---

## 5. Atajos de Teclado

### Terminal
| Acción | Windows/Linux | macOS |
|--------|---------------|-------|
| Copiar | Ctrl+Shift+C | Cmd+C |
| Pegar | Ctrl+Shift+V | Cmd+V |
| Limpiar | Ctrl+L | Cmd+K |
| Cancelar comando | Ctrl+C | Ctrl+C |
| Cerrar terminal | exit | exit |

### VS Code
| Acción | Windows/Linux | macOS |
|--------|---------------|-------|
| Terminal integrado | Ctrl+` | Cmd+` |
| Guardar | Ctrl+S | Cmd+S |
| Buscar archivo | Ctrl+P | Cmd+P |
| Buscar texto | Ctrl+Shift+F | Cmd+Shift+F |
| Formatear | Shift+Alt+F | Shift+Option+F |

### Claude Code
| Acción | Comando |
|--------|---------|
| Salir | /quit o Ctrl+C |
| Limpiar | /clear |
| Ayuda | /help |
| Compactar | /compact |

---

## 6. Comandos de Emergencia

### Si todo falla - Plan B
```bash
# 1. Verificar internet
ping google.com

# 2. Verificar API
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "content-type: application/json" \
  -d '{"model":"claude-3-haiku-20240307","max_tokens":10,"messages":[{"role":"user","content":"test"}]}'

# 3. Usar interfaz web como backup
# Abrir https://claude.ai
```

### Reinicio Rápido
```bash
# Cerrar todo y reiniciar
# Windows
taskkill /f /im node.exe
taskkill /f /im python.exe

# Linux/macOS
pkill node
pkill python

# Reiniciar Claude
claude
```

---

## 7. Frases Útiles para Clase

### Al inicio
- "Abran su terminal y escriban `claude`"
- "Verifiquen que su API key está configurada"
- "Copien este prompt y péguenlo"

### Durante demos
- "Observen cómo Claude estructura la respuesta"
- "¿Qué harían diferente en este prompt?"
- "Probemos modificar el prompt para..."

### Si hay problemas
- "Si no les funciona, prueben reiniciar la terminal"
- "Verifiquen que están en la carpeta correcta"
- "Copien el error y péguenlo, vamos a diagnosticar"

### Al cerrar
- "Guarden su trabajo antes de cerrar"
- "Recuerden que pueden practicar con su propia API key"
- "La tarea es: [...]"

---

*Comandos Rápidos - FPUNA 2026*
