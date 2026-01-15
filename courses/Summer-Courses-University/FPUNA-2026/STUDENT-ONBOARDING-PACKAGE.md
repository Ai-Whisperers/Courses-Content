# 🎓 Paquete de Bienvenida para Estudiantes
## FPUNA Verano 2026 - Desarrollo Aumentado con IA

---

## 🎉 ¡Bienvenido al Curso!

Felicitaciones por ser aceptado en el programa **"Desarrollo Aumentado con IA"** de FPUNA Verano 2026.

Este documento contiene **TODO lo que necesitas saber y hacer ANTES del primer día de clase**.

**Tiempo estimado de preparación**: 3-4 horas  
**Fecha límite**: 3 días antes del inicio del curso

---

## 📋 Checklist de Preparación

### ✅ Paso 1: Requisitos Técnicos (30 min)

#### Hardware Mínimo

| Componente | Mínimo | Recomendado |
|------------|--------|-------------|
| **Laptop** | Intel i5 / Ryzen 5 | Intel i7 / Ryzen 7 |
| **RAM** | 8 GB | 16 GB |
| **Almacenamiento** | 50 GB libres | 100 GB libres |
| **Sistema Operativo** | Windows 10, macOS 11, Ubuntu 20.04 | Última versión |
| **Conexión** | 10 Mbps | 25+ Mbps |

#### Verificación Rápida
```bash
# Windows (PowerShell)
Get-ComputerInfo | Select-Object OsName, OsVersion, CsProcessors, CsTotalPhysicalMemory

# macOS / Linux (Terminal)
system_profiler SPHardwareDataType
```

**¿No cumples los requisitos?**  
Contacta a coordinacion@fpuna.edu.py - tenemos laptops de préstamo limitadas.

---

### ✅ Paso 2: Crear Cuentas (1 hora)

#### Cuentas Obligatorias (ANTES del curso)

1. **GitHub Account** (FREE)
   - URL: https://github.com/signup
   - **IMPORTANTE**: Usa tu email @fpuna.edu.py para beneficios estudiante
   - Username sugerido: tu-nombre-fpuna (ej: juan-perez-fpuna)
   - **Por qué**: Todos los proyectos se subirán aquí

2. **GitHub Student Developer Pack** (FREE - $200+ en beneficios)
   - URL: https://education.github.com/pack
   - Incluye: GitHub Copilot FREE, herramientas dev, créditos cloud
   - Aprobación: 1-7 días (¡hazlo YA!)
   - **Por qué**: Herramientas pro gratis durante el curso

3. **Slack/Discord** (FREE)
   - Recibirás invitación por email
   - Workspace: fpuna-verano-2026
   - Descargar app (no solo web)
   - **Por qué**: Comunicación diaria con instructores y compañeros

#### Cuentas Recomendadas (útiles pero opcionales)

4. **ChatGPT Account** (FREE tier suficiente)
   - URL: https://chat.openai.com/
   - **Por qué**: Backup cuando OpenCode esté ocupado

5. **Google Colab** (FREE)
   - URL: https://colab.research.google.com/
   - **Por qué**: Si tu laptop es lenta, puedes ejecutar código en la nube

---

### ✅ Paso 3: Instalación de Software Base (1-2 horas)

#### Software Obligatorio

**1. Git** (Version Control)
```bash
# Windows: Descargar de https://git-scm.com/download/win
# macOS: brew install git
# Linux: sudo apt-get install git

# Verificar instalación
git --version  # Debe mostrar versión 2.30+
```

**2. Node.js** (JavaScript Runtime)
```bash
# Descargar de: https://nodejs.org/
# Versión: 18.x o 20.x (LTS)

# Verificar instalación
node --version  # Debe mostrar v18.x o v20.x
npm --version   # Debe mostrar 9.x o 10.x
```

**3. VS Code** (Editor de Código)
```bash
# Descargar de: https://code.visualstudio.com/

# Extensiones obligatorias (instalar desde VS Code):
- GitLens
- Prettier
- ESLint
- Python (si tu track es Python-heavy)
```

**4. Python 3.11+** (Si tu track usa Python)
```bash
# Descargar de: https://www.python.org/downloads/
# Windows: marca "Add Python to PATH"

# Verificar instalación
python --version  # Debe mostrar 3.11 o superior
pip --version
```

#### Verificación Final
```bash
# Ejecuta estos comandos y verifica que todos funcionan:
git --version
node --version
npm --version
code --version
python --version  # si aplica

# Si TODOS funcionan, ✅ estás listo
```

---

### ✅ Paso 4: Configuración Básica (30 min)

#### Git Configuration
```bash
# Configura tu identidad (usa tu email FPUNA)
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu-email@fpuna.edu.py"

# Verifica
git config --list
```

#### SSH Keys para GitHub
```bash
# 1. Genera SSH key
ssh-keygen -t ed25519 -C "tu-email@fpuna.edu.py"
# Presiona Enter 3 veces (usa defaults)

# 2. Copia la key
# Windows:
type ~/.ssh/id_ed25519.pub | clip

# macOS:
pbcopy < ~/.ssh/id_ed25519.pub

# Linux:
cat ~/.ssh/id_ed25519.pub
# (copia manualmente)

# 3. Agrega a GitHub
# - Ve a github.com → Settings → SSH and GPG keys → New SSH key
# - Pega la key que copiaste
# - Guarda

# 4. Verifica
ssh -T git@github.com
# Debe decir: "Hi [tu-usuario]! You've successfully authenticated"
```

---

### ✅ Paso 5: Material Pre-Curso (30-60 min)

#### Videos Obligatorios (YouTube)

1. **"What is AI? A 15-minute intro"** (15 min)
   - Canal: IBM Technology
   - Subtítulos: Español disponible

2. **"Git in 15 minutes"** (15 min)
   - Canal: Fireship
   - **Por qué**: Necesitas Git básico desde día 1

3. **"VS Code in 20 minutes"** (20 min)
   - Canal: Fireship o freeCodeCamp
   - **Por qué**: Tu editor principal

#### Lecturas Obligatorias (30 min)

📄 **"What is OpenCode?"** (nuestro documento)
- Lee: `00-FUNDAMENTOS-PRINCIPALES/01-configuracion-stack-ia.md` (secciones 1-3)
- **Ubicación**: Se enviará por email

📄 **"FPUNA Course Overview"**  
- Lee: `README.md` del repositorio
- **Objetivo**: Entender estructura del curso

---

### ✅ Paso 6: Test de Preparación (Quiz Online) (15 min)

Antes del primer día, completa este quiz para verificar que estás listo:

**URL**: [Se enviará por email 1 semana antes]

**Temas**:
- Requisitos técnicos cumplidos
- Cuentas creadas
- Software instalado
- Git básico
- Expectativas del curso

**Passing grade**: 80% (puedes intentar múltiples veces)

---

## 📅 Cronograma del Curso

### Semana 1: Core Foundation (TODOS)
**Fechas**: [Se anunciará]  
**Horario**: Lunes-Viernes, 8:00 AM - 12:00 PM  
**Ubicación**: Lab 3, Edificio Principal FPUNA

**Qué aprenderás**:
- Configurar y usar OpenCode/OMO
- Ingeniería de prompts profesional
- Workflows con IA
- Proyecto en vivo

---

### Semana 2: Track Especializado (TÚ ELIGES UNO)

Elige tu track según tu carrera:

#### 🖥️ **Track 1: Software Development**
**Para**: Ingeniería Informática, Sistemas  
**Aprenderás**: Testing, Clean Code, System Design con IA  
**Proyecto**: Microservices system

#### ⚡ **Track 2: Electronics & Automation**
**Para**: Ingeniería Electrónica, Mecatrónica  
**Aprenderás**: KiCAD, PCB, Firmware, PLCs, IoT con IA  
**Proyecto**: Sistema IoT completo

#### ✈️ **Track 3: Aeronautical Engineering**
**Para**: Ingeniería Aeronáutica  
**Aprenderás**: CAD, CFD, Estructuras, Diseño de aeronaves con IA  
**Proyecto**: Diseño de UAV

#### 📱 **Track 4: Marketing & Communication**
**Para**: Marketing, Comunicación  
**Aprenderás**: Contenido, Analytics, Redes Sociales, Diseño con IA  
**Proyecto**: Campaña completa

#### 🔬 **Track 5: Research & Academia**
**Para**: Investigadores, Postgrado  
**Aprenderás**: Literatura, Metodología, Análisis, Redacción con IA  
**Proyecto**: Paper académico

#### 🏨 **Track 6: Hospitality & Tourism**
**Para**: Hotelería, Turismo  
**Aprenderás**: Servicio al cliente, Revenue, Marketing turístico con IA  
**Proyecto**: Plan operativo hotel

**Elige tu track**: [Formulario Google - link por email]  
**Fecha límite**: 1 semana antes del curso

---

### Semana 3: Especialización (OPCIONAL)

Si completas Semana 2 exitosamente, puedes continuar con:
- **QA Automation avanzado** (para track Software)
- **Web Development Full-Stack** (para track Software)

---

## 🎒 Qué Traer el Primer Día

### Obligatorio
- ✅ Laptop cargada + cargador
- ✅ Cuenta GitHub activada
- ✅ Software instalado (Git, Node, VS Code, Python)
- ✅ Cuaderno y lápiz (sí, físico)
- ✅ Botella de agua
- ✅ Ganas de aprender 🚀

### Opcional pero Recomendado
- Mouse (más cómodo que trackpad)
- Audífonos (para concentrarte)
- Snacks saludables
- Sweater (AC puede estar frío)

---

## 🤝 Código de Conducta

### Compromisos del Estudiante

**Me comprometo a**:
- 🕐 Llegar puntual (tolerancia 10 min máximo)
- 💻 Participar activamente (no ser pasivo)
- 🤝 Ayudar a compañeros (aprendemos juntos)
- 📱 No distraerme con celular durante demos
- ✅ Completar tareas antes de siguient clase
- 🙋 Hacer preguntas (no hay preguntas tontas)
- 🎯 Dar lo mejor de mí

### Políticas del Curso

**Asistencia**:
- Mínimo 80% asistencia para certificado
- 3+ ausencias sin justificar = expulsión del curso
- Justificar ausencias 24h antes (email a instructor)

**Entregas**:
- Ejercicios: entregar en fecha límite (Slack o GitHub)
- Retraso: -10% por día hasta 3 días, luego 0
- Excepción solo con justificación válida

**Plagio y AI Ethics**:
- ✅ Usar AI para acelerar tu trabajo
- ✅ Entender y poder explicar tu código
- ❌ Copiar sin entender
- ❌ Presentar trabajo de AI como 100% tuyo sin modificar
- ❌ Copiar de compañeros sin colaboración genuina

**Consecuencias de violación**:
- 1ra vez: Advertencia + rehacer trabajo
- 2da vez: 0 en ese trabajo
- 3ra vez: Expulsión del curso

---

## 💰 Costos del Curso

### Costo de Matrícula
**Precio**: [Verificar con administración FPUNA]  
**Incluye**:
- 3 semanas de instrucción presencial
- Acceso a materiales digitales (perpetuo)
- Certificado FPUNA al completar
- GitHub Student Pack (valor $200+ USD)
- Soporte post-curso (3 meses)

### Costos Adicionales
- **$0**: Todo el software es gratuito (open source o student)
- **Opcional**: Laptop de préstamo ($50 depósito retornable)

---

## 📞 Contacto y Soporte

### Antes del Curso

**Preguntas Técnicas** (instalación, cuentas):  
📧 soporte-tecnico@fpuna.edu.py

**Preguntas Administrativas** (matrícula, pagos):  
📧 coordinacion@fpuna.edu.py

**Preguntas Académicas** (contenido, tracks):  
📧 instructor@fpuna.edu.py

**WhatsApp General**: [Número - se compartirá]

### Durante el Curso

**Slack**: #ayuda-tecnica (respuesta < 30 min durante horario de clase)  
**Office Hours**: Miércoles 6-8 PM (virtual)  
**Emergencias**: [Número de contacto]

---

## 🎯 Expectativas y Outcomes

### Al Finalizar Este Curso, Serás Capaz De:

**Técnico**:
- ✅ Usar OpenCode/OMO profesionalmente para acelerar tu trabajo
- ✅ Escribir prompts efectivos que generan código de calidad
- ✅ Configurar proyectos con MCPs, Skills, Hooks, Rules
- ✅ Completar proyectos 3-10x más rápido que sin IA
- ✅ [Específico a tu track]: ej. Diseñar PCBs, escribir tests, analizar datos

**Profesional**:
- ✅ Portfolio en GitHub con 2-3 proyectos sólidos
- ✅ Certificado FPUNA verificable
- ✅ Skills competitivos en mercado paraguayo
- ✅ Red de contactos (compañeros + instructores)

**Personal**:
- ✅ Confianza para usar AI en tu trabajo diario
- ✅ Mindset de aprendizaje continuo
- ✅ Adaptabilidad a nuevas tecnologías

---

## 🚀 Tips para el Éxito

### Antes del Curso
1. ⏰ **Completa TODO este checklist** - no dejes nada para última hora
2. 📚 **Ve los videos** - entrar con contexto te da ventaja
3. 💤 **Descansa bien** - curso es intensivo, necesitas energía
4. 🧘 **Mentalidad positiva** - "Puedo aprender esto"

### Durante el Curso
1. 🙋 **Haz preguntas** - si no entiendes, otros tampoco
2. 🤝 **Forma grupo de estudio** - aprendan juntos
3. 💻 **Practica fuera de clase** - 4h clase + 2h práctica = éxito
4. 📝 **Toma notas** - no confíes solo en memoria
5. 🏃 **No te atrases** - cada semana se construye sobre la anterior

### Después del Curso
1. 🔨 **Aplica lo aprendido** - usa AI en tus proyectos reales
2. 🌱 **Sigue practicando** - skill se oxida si no se usa
3. 🤝 **Mantén la red** - grupo Slack/Discord activo
4. 📣 **Comparte tu experiencia** - ayuda a futuros estudiantes

---

## ❓ FAQs

### "No tengo experiencia programando. ¿Puedo tomar el curso?"
**R**: Depende del track. Core Foundation es accesible para todos. Algunos tracks (Software Dev, Electronics) requieren programación básica. Marketing y Hospitality no requieren programación.

### "Mi laptop no cumple requisitos mínimos. ¿Qué hago?"
**R**: Contacta coordinacion@fpuna.edu.py. Tenemos laptops de préstamo (limitadas, primero llegado primero servido).

### "¿Puedo trabajar mientras tomo el curso?"
**R**: Es intensivo (4h/día + 2h tarea = 6h/día). Si trabajas, asegúrate de poder dedicar esas 6 horas diarias.

### "¿El certificado tiene valor en el mercado?"
**R**: Sí. FPUNA es reconocida. Además, tu portfolio GitHub es tu mejor credencial.

### "¿Hay edad mínima/máxima?"
**R**: Mínima 18. No hay máxima. Hemos tenido estudiantes de 18-55 años.

### "¿Puedo cambiar de track después de elegir?"
**R**: Solo en Semana 1. Después no, porque cada track tiene progresión específica.

---

## ✅ Checklist Final Pre-Curso

Imprime o guarda esta lista y ve marcando:

### 2 Semanas Antes
- [ ] Verificar laptop cumple requisitos
- [ ] Crear cuenta GitHub
- [ ] Solicitar GitHub Student Pack
- [ ] Unirse a Slack/Discord del curso

### 1 Semana Antes
- [ ] Instalar Git, Node, VS Code, Python
- [ ] Configurar Git (name, email, SSH)
- [ ] Ver videos obligatorios (YouTube)
- [ ] Leer documentación pre-curso
- [ ] Completar quiz de preparación
- [ ] Elegir tu track especializado

### 3 Días Antes
- [ ] Revisar que TODO el software funciona
- [ ] Preparar mochila (laptop, cuaderno, etc.)
- [ ] Revisar ubicación del lab (ir un día antes si no conoces)
- [ ] Configurar alarma (llegar 15 min antes el día 1)

### Día Antes
- [ ] Cargar laptop completamente
- [ ] Preparar snacks/almuerzo
- [ ] Dormir 7-8 horas
- [ ] Actitud positiva 🚀

---

## 🎉 ¡Estás Listo!

Si completaste todo este checklist, **¡felicitaciones!** Estás 100% preparado para el curso.

Nos vemos el primer día. Prepárate para una experiencia transformadora.

**¡Bienvenido a la revolución del desarrollo aumentado con IA en Paraguay!** 🇵🇾🚀

---

## 📧 Confirmación de Preparación

Por favor, envía un email a confirmacion@fpuna.edu.py con:

**Asunto**: Listo para FPUNA Verano 2026 - [Tu Nombre]

**Cuerpo**:
```
Nombre: [Tu nombre completo]
Carrera: [Tu carrera]
Track elegido: [Software/Electronics/etc.]
GitHub username: [tu-usuario]
Checklist completado: SÍ
Preguntas/comentarios: [opcional]
```

**Fecha límite**: 3 días antes del inicio

---

*Documento creado: Enero 2026*  
*Nos vemos pronto en FPUNA!* 🎓
