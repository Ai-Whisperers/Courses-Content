# Project Context: [NOMBRE_DEL_CURSO]
## 🎯 Purpose

Curso educativo del programa FPUNA Verano [AÑO], diseñado para estudiantes de [CARRERA_ESPECIFICA] que desean integrar herramientas de IA en su flujo de trabajo profesional. Este track combina teoría práctica con ejercicios reales aplicables al contexto paraguayo de negocios, marketing y turismo.

## 🏗️ Tech Stack

- **Entorno de desarrollo**: Windows 11, OpenCode, VS Code
- **Herramientas de IA**: Claude Code, MCPs (Model Context Providers)
- **Idioma**: Español para documentación, Inglés para código
- **Framework educativo**: Modular con especializaciones
- **Duración**: [HORAS_TOTAL] horas distribuidas en módulos semanales

## 📁 Repository Structure

```
cursos/
├── 02-desarrollo/FPUNA-2026/
│   ├── [TRACK]/                    # Tu especialización
│   │   ├── modules/                 # Módulos del curso
│   │   ├── instructor/              # Guías para docentes
│   │   ├── students/               # Materiales estudiantiles
│   │   └── README.md               # Overview del track
│   └── instructor/                 # Guía general docente
└── _compartido/                    # Recursos compartidos
    ├── 03-plantillas-de-contexto/  # Plantillas de configuración IA
    └── 01-configuracion-herramientas/  # Setup de herramientas
```

## 🛠️ Operation Guidelines

### Entorno de Desarrollo

Sigue esta secuencia para configurar:

1. **Leer guía inicial**: Revisa `CONFIGURACION-HERRAMIENTAS-IA.md`
2. **Instalar herramientas**: OpenCode + OMO (Oh My OpenCode)
3. **Configurar MCPs**: Conectar herramientas externas (Playwright, Git, etc.)
4. **Verificar**: Ejecutar los comandos de test de instalación

### Comando de Configuración Inicial
```bash
# Para estudiante
cp _compartido/01-configuracion-herramientas/claude/.claude/ .claude/
cp _compartido/04-utilidades-ia/.aiignore ./
```

### Estrategias de Trabajo

- **Módulo por día**: Dedica tiempo completo a un módulo por sesión
- **Ejercicios primero**: Realiza prácticas antes de leer contenido avanzado
- **Proyectos reales**: Aplica conceptos a escenarios paraguayos
- **IA como compañero**: Usa Claude para explicar conceptos complejos

## 🧠 Memory & References

### Recursos Importantes

- **WTF Guide**: Si te atascas: `README.md` principal del track
- **Instructor resources**: Directorio `instructor/` con soluciones
- **Shared templates**: `_compartido/` para configuraciones reutilizables
- **Avoid duplicating**: Usa componentes de `_compartido/` antes de crear nuevos

### Context Engineering Tips

- **Limitar alcance**: Cada sesión enfócate en 1-2 objetivos claros
- **Estado consciente**: Siempre verifica qué hiciste en la sesión anterior
- **Tokens awareness**: Sé conciso en prompts para mantener contexto
- **Paraguayan context**: Recuerda oportunidades locales (eco-turismo, CONMEBOL, etc.)

### Contexto Paraguayo

Cuando desarrolles proyectos, considera:
- **Idioma**: Contenido en español para usuarios locales
- **Mercado regional**: Brasil (25%), Argentina (45%), otros países
- **Oportunidades**: Turismo sostenible, transformación digital de empresas
- **Regulaciones**: Considerar marco legal paraguayo

## 📊 Evaluación y Progreso

### Métricas de Éxito

- **Completitud**: % de módulos finalizados exitosamente
- **Proyecto final**: Calidad del deliverable aplicable al mercado local
- **Participación**: Interacción en foro/slack del curso
- **Innovación**: Uso creativo de IA para resolver problemas locales

### Herramientas de Seguimiento

- **Git commits**: Historial de progreso diario
- **Foro de curso**: Preguntas y respuestas entre estudiantes
- **Revisiones IA**: Usar Claude para evaluar tu propio trabajo
- **Feedback docente**: Sesiones semanales de review

---

> [!TIP]
> Este CLAUDE.md se adapta automáticamente a tu track específico. Si modificas tu curso o especialización, actualízalo usando las plantillas de `_compartido/03-plantillas-de-contexto/`