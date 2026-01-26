# Integration Guide - Límites de IA Template

## Quick Reference for Completing DAY 2 Work

**Template Source**: `SHARED-TEMPLATE-limites-de-ia.md`

**Status**: ✅ Template complete, ready for integration

---

## 📋 Integration Instructions

### Module 02: Aerodinámica CFD (02-aerodinamica-cfd.md)

**Insert Location**: After line 103 (after "Parte 1: Fundamentos de Aerodinámica" heading)

**Variables to Replace**:
```
{MÓDULO} → "Aerodinámica y CFD"
{EJEMPLO_1} → "Ejecutar 100 simulaciones XFoil con variaciones de ángulo de ataque"
{EJEMPLO_2} → "Calcular polares de arrastre (CL vs CD) para 50 perfiles"
{EJEMPLO_3} → "Exportar resultados CFD a formatos múltiples (CSV, PNG, PDF)"
{EJEMPLO_NEGATIVO_1} → "Diseñar perfil alar completamente nuevo sin precedentes"
{EJEMPLO_NEGATIVO_2} → "Decidir si simulación CFD es 'suficientemente precisa' para certificación"
{EJEMPLO_CONTEXTO_1} → "Optimizar perfil considerando disponibilidad de túnel de viento en Paraguay"
{CASO_ESPECÍFICO_MÓDULO} → "Optimización de Perfil Alar con CFD"
```

**Case Study for Module 02**:
```markdown
### Caso 2: Optimización de Perfil Alar con CFD

**Escenario**: Optimizar perfil NACA 4412 para UAV agrícola.

| Tarea | IA Rol | Humano Rol | Confianza |
|-------|--------|------------|-----------|
| Ejecutar 100 simulaciones XFoil | **IA ejecuta** (batch script) | Valida parámetros entrada | ✅ Alta |
| Seleccionar mejor perfil de resultados | IA rankea por L/D | **Humano decide** (considera manufactura) | ⚠️ Media |
| Validar resultado con túnel de viento | ❌ IA no puede | **Humano diseña** experimento validación | ❌ Nula |
```

---

### Module 03: Estructuras y Materiales (03-estructuras-materiales.md)

**Insert Location**: After introductory section, before "Parte 1: Fundamentos"

**Variables to Replace**:
```
{MÓDULO} → "Análisis Estructural y Materiales"
{EJEMPLO_1} → "Ejecutar análisis FEA de 50 configuraciones de larguero"
{EJEMPLO_2} → "Calcular factores de seguridad para 100 puntos de carga"
{EJEMPLO_3} → "Generar reportes de esfuerzos con visualizaciones automáticas"
{EJEMPLO_NEGATIVO_1} → "Diseñar topología estructural completamente innovadora"
{EJEMPLO_NEGATIVO_2} → "Decidir factor de seguridad para estructura crítica"
{EJEMPLO_CONTEXTO_1} → "Seleccionar materiales considerando proveedores en Asunción"
{CASO_ESPECÍFICO_MÓDULO} → "Análisis FEA de Larguero de Ala"
```

**Case Study for Module 03**:
```markdown
### Caso 2: Análisis FEA de Larguero de Ala

**Escenario**: Validar resistencia de larguero principal.

| Tarea | IA Rol | Humano Rol | Confianza |
|-------|--------|------------|-----------|
| Ejecutar simulación FEA con carga estándar | **IA ejecuta** (script ANSYS) | Define condiciones de frontera | ✅ Alta |
| Interpretar zonas de alta tensión | IA identifica hotspots | **Humano interpreta** causa física | ⚠️ Media |
| Decidir si estructura es segura para vuelo | ❌ IA no puede | **Humano decide** con normativa | ❌ Nula |
```

---

### Module 04: Sistemas de Propulsión (04-sistemas-propulsion.md)

**Insert Location**: After introductory section, before "Parte 1: Tipos de Motores"

**Variables to Replace**:
```
{MÓDULO} → "Sistemas de Propulsión"
{EJEMPLO_1} → "Calcular autonomía para 100 combinaciones motor/batería"
{EJEMPLO_2} → "Generar curvas de performance (empuje vs velocidad)"
{EJEMPLO_3} → "Documentar selección de motor con justificación técnica"
{EJEMPLO_NEGATIVO_1} → "Diseñar sistema de propulsión híbrido innovador"
{EJEMPLO_NEGATIVO_2} → "Decidir si motor es 'suficientemente seguro' para misión"
{EJEMPLO_CONTEXTO_1} → "Seleccionar motor considerando disponibilidad en Paraguay"
{CASO_ESPECÍFICO_MÓDULO} → "Selección de Motor para UAV Agrícola"
```

**Case Study for Module 04**:
```markdown
### Caso 2: Selección de Motor para UAV Agrícola

**Escenario**: Elegir motor brushless para UAV 3kg con 45 min autonomía.

| Tarea | IA Rol | Humano Rol | Confianza |
|-------|--------|------------|-----------|
| Calcular requerimientos de empuje | **IA ejecuta** (T/W ratio) | Valida supuestos (drag, peso) | ✅ Alta |
| Filtrar motores por criterios técnicos | IA rankea opciones | **Humano considera** disponibilidad PY | ⚠️ Media |
| Decidir motor final (técnico + costo + disponibilidad) | IA provee datos | **Humano decide** balance trade-offs | ⚠️ Media |
```

---

## 🎯 Quick Integration Checklist

For each module:

- [ ] Copy `SHARED-TEMPLATE-limites-de-ia.md` content
- [ ] Replace all `{VARIABLES}` with module-specific text
- [ ] Insert at specified location in module file
- [ ] Verify formatting (mermaid diagrams, tables render correctly)
- [ ] Test one example from checklist section
- [ ] Commit with message: "feat(aero): Integrate AI limitations into Module XX"

**Estimated Time**: 15 minutes per module = 45 minutes total

---

## 📊 Integration Priority

1. **Module 02 (Aerodinámica)** - FIRST (most technical, benefits most from limitations guidance)
2. **Module 03 (Estructuras)** - SECOND (safety-critical, needs clear boundaries)
3. **Module 04 (Propulsión)** - THIRD (already has Part 5 automation, completes the picture)

---

## ✅ Verification Steps

After integrating each module:

1. **Read through** inserted section
2. **Check** all examples make sense for that module
3. **Verify** case study is relevant and accurate
4. **Ensure** no template variables (`{...}`) remain
5. **Test** mermaid flowchart renders (copy to markdown preview)

---

## 🚀 Post-Integration

Once all 3 modules have template integrated:

**Single commit**:
```bash
git add 02-aerodinamica-cfd.md 03-estructuras-materiales.md 04-sistemas-propulsion.md
git commit -m "feat(aero): Integrate AI limitations framework into Modules 02, 03, 04

Standardized 'Límites de IA' section now in all core modules:
- Module 02 (Aerodinámica CFD): CFD-specific examples
- Module 03 (Estructuras): FEA and safety-critical guidance  
- Module 04 (Propulsión): Motor selection and performance

Each module now has:
- What AI does excellently (with metrics)
- What AI does poorly (with warnings)
- Hybrid workflow guidance
- 27-point validation checklist
- Module-specific case studies

Impact: Consistent AI expectations across entire track
Prevents over-reliance while maximizing productivity"
```

---

## 📝 Notes for Future Work

**After template integration is complete**, the track will have:

✅ **Consistent messaging** about AI across all 5 modules  
✅ **Realistic expectations** set from Module 01 onwards  
✅ **Decision framework** (flowchart) students can reference  
✅ **Validation tools** (checklists) for every AI-generated result

**This establishes FPUNA 2026 Aeronautical track as model for AI-integrated engineering education.**

---

*Template ready. Integration pending. Estimated completion: 45 minutes of focused work.*
