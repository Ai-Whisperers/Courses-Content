# Comenzando

¡Bienvenido! Esta guía te ayuda a configurar y comenzar a aprender.

---

## Paso 1: Elige Tu Curso

| Curso                                                                    | Ideal Para                            | Guía de Configuración                                                                    |
| ------------------------------------------------------------------------ | ------------------------------------- | ---------------------------------------------------------------------------------------- |
| [QA Automation with AI](./cursos/01-produccion/QA-Automation-with-AI/)   | Ingenieros QA                         | [SETUP.md](./cursos/01-produccion/QA-Automation-with-AI/SETUP.md)                        |
| [FPUNA 2026](./cursos/02-desarrollo/FPUNA-2026/)                         | Estudiantes Universitarios (Paraguay) | [starter-kit](./cursos/02-desarrollo/FPUNA-2026/00-FUNDAMENTOS-PRINCIPALES/starter-kit/) |
| [Prompt Engineering](./cursos/03-beta/Prompt-Engineering-Masterclass/)   | Cualquiera que quiera mejor IA        | [SETUP.md](./cursos/03-beta/Prompt-Engineering-Masterclass/SETUP.md)                     |
| [Building AI Apps](./cursos/03-beta/Building-AI-Powered-Applications/)   | Desarrolladores                       | [SETUP.md](./cursos/03-beta/Building-AI-Powered-Applications/SETUP.md)                   |
| [AI Tools for Productivity](./cursos/03-beta/AI-Tools-for-Productivity/) | Profesionales                         | [SETUP.md](./cursos/03-beta/AI-Tools-for-Productivity/SETUP.md)                          |

**Primer curso recomendado:** [QA Automation with AI](./cursos/01-produccion/QA-Automation-with-AI/) - está completo y probado.

---

## Paso 2: Prerrequisitos

### Para Todos los Cursos

Necesitas:

- Computadora (Windows 10+, macOS 10.15+, o Linux)
- Conexión a Internet
- Cuenta de GitHub ([crea una](https://github.com/join))
- Editor de texto (Recomendado VS Code)

### Verifica Tu Configuración

Abre una terminal y ejecuta:

```bash
# Verificar si Git está instalado
git --version

# Verificar Node.js (requerido para algunos cursos)
node --version
```

Si los comandos fallan, instala las herramientas faltantes:

- **Git**: [git-scm.com](https://git-scm.com/downloads)
- **Node.js**: [nodejs.org](https://nodejs.org/) (Versión LTS)

---

## Paso 3: Obtén los Materiales

### Opción A: Clonar el Repositorio (Recomendado)

```bash
git clone https://github.com/Ai-Whisperers/Courses-Content.git
cd Courses-Content
```

### Opción B: Descargar ZIP

1. Ve a [github.com/Ai-Whisperers/Courses-Content](https://github.com/Ai-Whisperers/Courses-Content)
2. Haz clic en "Code" → "Download ZIP"
3. Extrae en tu ubicación preferida

---

## Paso 4: Comienza a Aprender

### QA Automation with AI

```bash
# Navega al curso
cd cursos/01-produccion/QA-Automation-with-AI

# Lee la descripción del curso
cat README.md

# Comienza con el Módulo 1
cd modules/01-introduction
```

### FPUNA 2026 (Español)

```bash
cd cursos/02-desarrollo/FPUNA-2026/00-FUNDAMENTOS-PRINCIPALES

# Comienza con el starter kit
cd starter-kit
cat README.md
```

### Cursos Beta

Los cursos Beta son utilizables pero pueden tener secciones incompletas. Comienza con el README en cada carpeta de curso.

---

## Estructura del Curso

Todos los cursos siguen este patrón:

```
nombre-del-curso/
├── README.md           # Resumen del curso - COMIENZA AQUÍ
├── SYLLABUS.md         # Plan de estudios completo
├── modules/            # Contenido del curso
│   ├── 01-tema/
│   │   ├── README.md   # Resumen del módulo
│   │   ├── LESSON.md   # Contenido principal
│   │   ├── EXERCISE.md # Práctica práctica
│   │   └── QUIZ.md     # Autoevaluación
│   └── ...
├── examples/           # Ejemplos de código
└── resources/          # Materiales adicionales
```

**Flujo de aprendizaje:**

1. Lee el README del módulo
2. Estudia la LECCIÓN (LESSON)
3. Completa el EJERCICIO (EXERCISE)
4. Pruébate con el QUIZ
5. Avanza al siguiente módulo

---

## Obteniendo Ayuda

- **Preguntas del curso**: Abre un [issue](https://github.com/Ai-Whisperers/Courses-Content/issues)
- **Discusiones**: Únete a [GitHub Discussions](https://github.com/Ai-Whisperers/Courses-Content/discussions)
- **Bugs/errores**: Reporta en issues con la ruta del archivo y el error

---

## Consejos para el Éxito

1. **Completa los módulos en orden** - Se construyen uno sobre otro
2. **Haz los ejercicios** - Leer no es suficiente, la práctica es esencial
3. **Toma notas** - Escribe los conceptos clave con tus propias palabras
4. **Haz preguntas** - No hay preguntas tontas
5. **Aplica inmediatamente** - Usa lo que aprendes en proyectos reales

---

## FAQ (Preguntas Frecuentes)

**P: ¿Necesito pagar algo?**
R: No. Todo el contenido del curso es gratuito. Algunas herramientas de IA tienen niveles gratuitos.

**P: ¿Cuánto tiempo toma cada curso?**
R: QA Automation: 40-60 horas. Otros varían, revisa su README.

**P: ¿Puedo saltar módulos?**
R: No recomendado. Los módulos se basan en los anteriores.

**P: ¿Qué pasa si me quedo atascado?**
R: Abre un issue o discusión. Incluye lo que intentaste.

---

## Configuración Asistida por IA

¿Quieres que una IA configure todo por ti? Mira [Prompts de Configuración](./_compartido/setup/SETUP-PROMPTS.md) para prompts de copiar y pegar que automatizan la configuración del entorno.

---

## Tutoriales en Video

¿Prefieres aprender viendo? Tenemos tutoriales en video curados para todas las herramientas que necesitas:

- **[Guía de Tutoriales en Video](./_compartido/setup/VIDEO-TUTORIALS.md)** - Lista completa de videos de configuración
  - Configuración de Claude Code
  - Configuración de VS Code
  - Conceptos básicos de Git y GitHub
  - Instalación de Node.js
  - Comandos de terminal

Enlaces rápidos:
| Herramienta | Tiempo | Video |
|-------------|--------|-------|
| Claude Code | 10 min | [Guía de Configuración](./_compartido/setup/VIDEO-TUTORIALS.md#claude-code) |
| VS Code | 15 min | [Instalación](./_compartido/setup/VIDEO-TUTORIALS.md#vs-code) |
| Git Basics | 15 min | [Inicio Rápido](./_compartido/setup/VIDEO-TUTORIALS.md#git--github) |

---

¿Listo? ¡Elige un curso y comienza a aprender!
