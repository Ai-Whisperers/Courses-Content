# Project Context: FPUNA Research & Academic Track v4.26
## 🎯 Purpose

Track avanzado para estudiantes de investigación y posgrado que necesitan integrar IA en procesos académicos. Diseñado para tesis de maestría/doctorado, papers científicos y proyectos de investigación. Combina metodología de investigación clásica con herramientas de IA modernas manteniendo rigor académico y ética de investigación.

## 🏗️ Tech Stack

- **Entorno académico**: Windows 11 + OpenCode + VS Code + JupyterLab
- **Herramientas científicas**: Python científico, R para estadística, Zotero para bibliografía
- **IA especializada**: Claude Code, Git MCP, Document MCP, Data MCP
- **MCP compartido**: web-fetch MCP, literature-search MCP (LLM-driven)
- **Colaboración**: GitHub para equipos, Slack para comunicación

## 📁 Repository Structure

```
cursos/02-desarrollo/FPUNA-2026/05-INVESTIGACION-ACADEMIA/
├── modules/                    # Módulos del track (5 módulos)
│   ├── 01-metodologia-ia-investigacion.md    # Diseño experimental
│   ├── 02-revista-literatura-ia.md          # Review sistemático
│   ├── 03-analisis-datos-ia.md              # Estadística + ML
│   ├── 04-etica-ia-academia.md             # Ethics research AI
│   └── 05-comunicar-resultados-ia.md        # Presentations & papers
├── students/                   # Materiales estudiantiles
│   ├── tutorial-jupyter.ipynb
│   └── templates/
├── instructor/                # Recursos docentes avanzados
├── projects/                  # Ejemplos de proyectos tesis
└── README.md                  # Overview metodológico
```

## 🛠️ Operation Guidelines

### Workflow Metodológico (Basado en CRISP-DM)

1. **Entendimiento del Negocio**: Definir preguntas de investigación
2. **Entendimiento de Datos**: Recolección y preparación ética
3. **Preparación de Datos**: Limpieza con validación estadística
4. **Modelado**: Años IA para análisis (si ético/apropiado)
5. **Evaluación**: Validación robusta de resultados
6. **Despliegue**: Comunicación clara para stakeholders académicos

### Comando de Setup Académico
```bash
# Entorno científico para investigación
pip install jupyter numpy pandas matplotlib seaborn scikit-learn
npm install -g oh-my-opencode @modelcontextprotocol/server-postgres
cp ../../_compartido/04-utilidades-ia/.aiignore ./
cp ../../_compartido/01-configuracion-herramientas/claude/.claude/ACAD .claude/
```

### Principios de Integración IA

**Cuándo usar IA (ético):**
- ✅ Revisión sistemática de literatura (redondeción exhaustiva)
- ✅ Limpieza y preparación de datos (validación automática)
- ✅ Generación de hipótesis iniciales (no conclusiones finales)
- ✅ Visualización de datos complejos
- ✅ Edición de manuscritos académicos

**Cuándo NO usar IA:**
- ❌ Análisis primarios de datos sensibles (ética)
- ❌ Generación de datos experimentales
- ❌ Revisiones peer del trabajo propio
- ❌ Conclusiones finales de tesis/disertación

## 🧠 Memory & References

### Rigor Científico Obligatorio

**Documentación crítica:**
- **Procesos**: Detallar exactamente qué IA hizo en cada paso
- **Versiones**: Registrar versiones de modelos y parámetros
- **Reproducibilidad**: Scripts con seeds aleatorios fijos
- **Auditoría**: Trail completo para comité de ética

### Context Engineering Académico

**Estrategias para tesis/research:**
- Estructura prompts como "Hipótesis → Metodología → Análisis → Conclusión"
- Usar prompts objetivos (evitar bias de confirmación)
- Documentar intentos fallidos como parte del método
- Mantener contexto de marco teórico durante toda la session

### Literatura Académica Paraguaya

**Fuentes críticas para contexto:**
- Repositorio CONACYT Paraguay
- Biblioteca Universidad Nacional de Asunción (UNA)
- Ministerio de Educación y Ciencias (MEC)
- Investigaciones en turismo sostenible Chaco-Pantanal
- Estudios socioeconómicos post-COVID economía paraguaya

## 📊 Evaluación Académica

### Criterios de Evaluación (Basado en CONACYT)

1. **Originalidad**: Contribución novel al conocimiento paraguayo
2. **Metodología sólida**: Integración apropiada de IA con rigor científico
3. **Éticas investigativo**: Protección de datos, consentimiento informado
4. **Impacto**: Relevancia para desarrollo científico/social Paraguay
5. **Comunicación clara**: Escritos académicos en español académico

### Herramientas de Validación

- **Committee review**: Presentaciones para tutores
- **Peer validation**: Discusión en grupos de investigación
- **Reproducibility test**: Datos/simulaciones replicables
- **Ethics review**: Comité institucional de ética

## 🎓 Salida Profesional

**Carreras objetivo:**
- Investigador CONACYT (posiciones técnicas)
- Catedrático universitario (UNA, UCA, UTIC)
- Consultor científico para ministerios gubernamentales
- Líder de centros de investigación P&DT (ej: ITAIPU)

---

> [!CAUTION]
> Investigación académica requiere máxima ética. Documentar TODOS usos de IA, obtener consentimientos apropiados, y mantener independencia intelectual. Cualquier brecha puede afectar toda la carrera académica.