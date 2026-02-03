# Guía de Integración - Plantilla de Límites de IA

## Referencia Rápida para Completar el Trabajo del DÍA 2

**Fuente de Plantilla**: `SHARED-TEMPLATE-limites-de-ia.md`

**Estado**: ✅ Plantilla completa, lista para integración

---

## 📋 Instrucciones de Integración

### Módulo 02: Aerodinámica CFD (02-aerodinamica-cfd.md)

**Ubicación de Inserción**: Después de la línea 103 (después del encabezado "Parte 1: Fundamentos de Aerodinámica")

**Variables a Reemplazar**:
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

**Caso de Estudio para Módulo 02**:
```markdown
### Caso 2: Optimización de Perfil Alar con CFD

**Escenario**: Optimizar perfil NACA 4412 para UAV agrícola.

| Tarea | Rol de IA | Rol Humano | Confianza |
|-------|--------|------------|-----------|
| Ejecutar 100 simulaciones XFoil | **IA ejecuta** (batch script) | Valida parámetros entrada | ✅ Alta |
| Seleccionar mejor perfil de resultados | IA rankea por L/D | **Humano decide** (considera manufactura) | ⚠️ Media |
| Validar resultado con túnel de viento | ❌ IA no puede | **Humano diseña** experimento validación | ❌ Nula |
```

---

### Módulo 03: Estructuras y Materiales (03-estructuras-materiales.md)

**Ubicación de Inserción**: Después de la sección introductoria, antes de "Parte 1: Fundamentos"

**Variables a Reemplazar**:
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

**Caso de Estudio para Módulo 03**:
```markdown
### Caso 2: Análisis FEA de Larguero de Ala

**Escenario**: Validar resistencia de larguero principal.

| Tarea | Rol de IA | Rol Humano | Confianza |
|-------|--------|------------|-----------|
| Ejecutar simulación FEA con carga estándar | **IA ejecuta** (script ANSYS) | Define condiciones de frontera | ✅ Alta |
| Interpretar zonas de alta tensión | IA identifica hotspots | **Humano interpreta** causa física | ⚠️ Media |
| Decidir si estructura es segura para vuelo | ❌ IA no puede | **Humano decide** con normativa | ❌ Nula |
```

---

### Módulo 04: Sistemas de Propulsión (04-sistemas-propulsion.md)

**Ubicación de Inserción**: Después de la sección introductoria, antes de "Parte 1: Tipos de Motores"

**Variables a Reemplazar**:
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

**Caso de Estudio para Módulo 04**:
```markdown
### Caso 2: Selección de Motor para UAV Agrícola

**Escenario**: Elegir motor brushless para UAV 3kg con 45 min autonomía.

| Tarea | Rol de IA | Rol Humano | Confianza |
|-------|--------|------------|-----------|
| Calcular requerimientos de empuje | **IA ejecuta** (T/W ratio) | Valida supuestos (drag, peso) | ✅ Alta |
| Filtrar motores por criterios técnicos | IA rankea opciones | **Humano considera** disponibilidad PY | ⚠️ Media |
| Decidir motor final (técnico + costo + disponibilidad) | IA provee datos | **Humano decide** balance trade-offs | ⚠️ Media |
```

---

## 🎯 Lista de Verificación Rápida de Integración

Para cada módulo:

- [ ] Copiar contenido de `SHARED-TEMPLATE-limites-de-ia.md`
- [ ] Reemplazar todas las `{VARIABLES}` con texto específico del módulo
- [ ] Insertar en la ubicación especificada en el archivo del módulo
- [ ] Verificar formato (diagramas mermaid, tablas se renderizan correctamente)
- [ ] Probar un ejemplo de la sección checklist
- [ ] Hacer commit con mensaje: "feat(aero): Integrar limitaciones de IA en Módulo XX"

**Tiempo Estimado**: 15 minutos por módulo = 45 minutos total

---

## 📊 Prioridad de Integración

1. **Módulo 02 (Aerodinámica)** - PRIMERO (más técnico, se beneficia más de la guía de limitaciones)
2. **Módulo 03 (Estructuras)** - SEGUNDO (crítico para seguridad, necesita límites claros)
3. **Módulo 04 (Propulsión)** - TERCERO (ya tiene Parte 5 de automatización, completa el panorama)

---

## ✅ Pasos de Verificación

Después de integrar cada módulo:

1. **Leer** la sección insertada
2. **Verificar** que todos los ejemplos tengan sentido para ese módulo
3. **Verificar** que el caso de estudio sea relevante y preciso
4. **Asegurar** que no queden variables de plantilla (`{...}`)
5. **Probar** que el diagrama de flujo mermaid se renderiza (copiar a vista previa de markdown)

---

## 🚀 Post-Integración

Una vez que los 3 módulos tengan la plantilla integrada:

**Un solo commit**:
```bash
git add 02-aerodinamica-cfd.md 03-estructuras-materiales.md 04-sistemas-propulsion.md
git commit -m "feat(aero): Integrar framework de limitaciones de IA en Módulos 02, 03, 04

Sección estandarizada 'Límites de IA' ahora en todos los módulos principales:
- Módulo 02 (Aerodinámica CFD): Ejemplos específicos de CFD
- Módulo 03 (Estructuras): Guía de FEA y seguridad crítica
- Módulo 04 (Propulsión): Selección de motor y performance

Cada módulo ahora tiene:
- Lo que IA hace excelentemente (con métricas)
- Lo que IA hace pobremente (con advertencias)
- Guía de flujo de trabajo híbrido
- Checklist de validación de 27 puntos
- Casos de estudio específicos del módulo

Impacto: Expectativas consistentes de IA en todo el track
Previene dependencia excesiva mientras maximiza productividad"
```

---

## 📝 Notas para Trabajo Futuro

**Después de completar la integración de la plantilla**, el track tendrá:

✅ **Mensajes consistentes** sobre IA en los 5 módulos
✅ **Expectativas realistas** establecidas desde el Módulo 01
✅ **Framework de decisión** (diagrama de flujo) que los estudiantes pueden consultar
✅ **Herramientas de validación** (checklists) para cada resultado generado por IA

**Esto establece el track de Aeronáutica FPUNA 2026 como modelo para educación de ingeniería integrada con IA.**

---

*Plantilla lista. Integración pendiente. Tiempo estimado de completar: 45 minutos de trabajo enfocado.*
