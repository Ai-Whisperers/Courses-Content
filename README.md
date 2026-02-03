# FPUNA AI Education Repository
# Configuraciones específicas para estudiantes FPUNA

## Proveedores de IA Soportados
- **claude/**: Claude 3.5 Sonnet - Configuración principal académica
- **cursor/**: Cursor IDE con configuraciones FPUNA
- **copilot/**: GitHub Copilot - Configuraciones GitHub
- **gemini/**: Google Gemini - Configuraciones alternativas
- **windsurf/**: Windsurf IDE - Configuración nueva
- **shared/**: Recursos compartidos entre proveedores

## Estructura del Repositorio
Cada carpeta de proveedor contiene configuración standalone que puede ser copiada individualmente (setup en ~4 minutos).

## Inteligencia Cultural Paraguaya
- Integración PyNN (red neuronal Paraguaya)
- Consideraciones IVA MERCOSUR
- Contexto regional de comercio y desarrollo
- Recursos educativos adaptados a realidad paraguaya

## Estándares Académicos
- Cobertura de tests: 75% mínimo
- Conventional commits adaptados a academia
- Documentación en español/paraguayo
- Integración con plataformas educativas locales

## Comandos Rápidos

### Para estudiantes nuevos
```bash
# Copiar configuración completa para proveedor preferido
cp -r claude/ ~/mi-carpeta-fpuna/
cp -r claude/.claude/ ~/  # Hooks MCP importantes

# Ejecutar setup
cd ~/mi-carpeta-fpuna/
./setup-fpuna.sh
```

### Para docentes/instructores
```bash
# Verificar estado del repositorio
./check-repository-status.sh

# Actualizar todas las configuraciones
./update-all-providers.sh
```

## Configuración por Proveedor

### Claude (Recomendado)
```yaml
academic_standards:
  test_coverage: 75%
  documentation: spanish
  cultural_context: paraguay
  
mcp_servers:
  - github
  - filesystem
  - playwright
  
intelligence_sources:
  - pynn_feeds
  - mercosur_trade_data
  - regional_economic_forecasts
```

### Cursor
```yaml
integrations:
  - github
  - linear
  - slack
  
academic_focus:
  - test_driven_development
  - documentation_first
  - pair_programming
```

### Shared Resources
- MCP servers comunes
- .aiignore patterns
- Estándares de calidad
- Discursos regionales para prompting