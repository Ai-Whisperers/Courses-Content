# FPUNA AI Education Repository Index
# Mapa completo de recursos y configuraciones

## 📁 Estructura Organizacional
```
fpuna-ai-education/
├── claude/           # Claude 3.5 Sonnet (principal)
├── cursor/           # Cursor IDE configs
├── copilot/          # GitHub Copilot configs  
├── gemini/           # Google Gemini alternatives
├── windsurf/         # Windsurf IDE configs
└── shared/           # Recursos compartidos
```

## 🎯 Objetivos del Repositorio
- **Setup en 4 minutos**: Cada carpeta de proveedor es standalone
- **75% test coverage**: Enforzado en todos los workflows
- **Inteligencia Cultural**: Contexto Paraguayo/MERCOSUR integrado
- **Estándares FPUNA**: Alineación curricular universitaria

## 📖 Setup por Proveedor

### Claude (Recomendado para Académico)
```bash
cp -r claude/ ~/fpuna-ai-setup/
cp -r claude/.claude/ ~/
cd ~/fpuna-ai-setup/
npm install && npm run setup-fpuna
```

### Cursor (IDE Específico)
```bash
cp -r cursor/ ~/cursor-workspace/
cd ~/cursor-workspace/
cursor --open .
```

### Windsurf (Nuevo)  
```bash
cp -r windsurf/ ~/windsurf-project/
cd ~/windsurf-project/
windsurf --config .windsurf-rules.md
```

## 🧠 Inteligencia Cultural
- **PyNN Integration**: Red neuronal Paraguaya
- **IVA Compliance**: Cálculos tributarios MERCOSUR  
- **Trade Data**: Información comercial regional
- **Economic Forecasts**: Pronósticos económicos locales

## 📊 Métricas de Calidad
- Coverage mínimo: 75% de tests
- Formato: Black (120 chars)
- Linting: Flake8 académico
- Commits: Conventional + cultural context

## 🏗️ Arquitectura MCP
- **GitHub Server**: Gestión académica
- **Filesystem Server**: Indexación código
- **Playwright Server**: Testing web académico

## 🎓 Recursos Académicos
- Configuraciones por especialidad (software, aeroespacial, electrónica)
- Ejercicios resueltos por módulo
- Plantillas docentes FPUNA
- Verificaciones de calidad automática