# AI-INTEGRATION.md - Cómo Integrar IA en tu Proyecto

## Guía de Integración de Inteligencia Artificial

Este documento explica cómo la IA puede integrarse con tu proyecto y flujo de trabajo.

---

## 1. Niveles de Integración de IA

### Nivel 1: Asistente de Desarrollo (Básico)
La IA te ayuda a escribir código más rápido.

```
┌─────────────────────────────────────────────────────────┐
│                    TU FLUJO DE TRABAJO                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   [Tú] ──escribes prompt──▶ [Claude] ──genera──▶ [Código]│
│                                                          │
│   Ejemplo:                                               │
│   "Crea una función que valide emails"                   │
│   ↓                                                      │
│   Claude genera la función                               │
│   ↓                                                      │
│   Tú revisas y ajustas                                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Usos:**
- Generar funciones y clases
- Escribir tests
- Crear documentación
- Resolver bugs

---

### Nivel 2: Copiloto de Proyecto (Intermedio)
La IA entiende el contexto de tu proyecto completo.

```
┌─────────────────────────────────────────────────────────┐
│                    CLAUDE + TU PROYECTO                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   CLAUDE.md ──────────────▶ [Claude entiende contexto]   │
│                                    │                     │
│   Tu código ──────────────────────▶│                     │
│                                    ▼                     │
│   [Sugerencias contextualizadas y coherentes]            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Usos:**
- Refactorizar siguiendo tus convenciones
- Agregar features que encajan con la arquitectura
- Code review automático
- Mantener consistencia en el código

---

### Nivel 3: Automatización Inteligente (Avanzado)
La IA ejecuta tareas complejas de forma autónoma.

```
┌─────────────────────────────────────────────────────────┐
│              AUTOMATIZACIÓN CON CLAUDE CODE              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   [Prompt complejo]                                      │
│        │                                                 │
│        ▼                                                 │
│   [Claude analiza] ──▶ [Planifica] ──▶ [Ejecuta]        │
│        │                                                 │
│        ▼                                                 │
│   [Múltiples archivos modificados]                       │
│   [Tests ejecutados]                                     │
│   [Documentación actualizada]                            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Usos:**
- Migraciones de código
- Implementar features completas
- Refactoring a gran escala
- Análisis y optimización

---

## 2. Archivos Clave para Integración

### CLAUDE.md (Obligatorio)
```
proyecto/
└── CLAUDE.md          # Instrucciones para la IA
```

**Propósito:** Le dice a Claude cómo trabajar con tu proyecto.
**Contenido:** Convenciones, estructura, reglas, contexto.

### .claude/ (Opcional - Configuración Avanzada)
```
proyecto/
└── .claude/
    ├── settings.json    # Configuración de Claude Code
    ├── rules/           # Reglas por tipo de archivo
    └── prompts/         # Prompts guardados
```

### Archivos de Contexto Adicional
```
proyecto/
├── ARCHITECTURE.md      # Arquitectura del sistema
├── CONVENTIONS.md       # Convenciones de código
├── API.md               # Documentación de API
└── DECISIONS.md         # Decisiones de diseño (ADRs)
```

---

## 3. Flujos de Trabajo con IA

### Flujo 1: Desarrollo de Nueva Feature

```
1. PLANIFICAR
   └─▶ "Explícame cómo implementarías [feature] en este proyecto"

2. DISEÑAR
   └─▶ "Crea la estructura de archivos y interfaces para [feature]"

3. IMPLEMENTAR
   └─▶ "Implementa [componente] siguiendo las convenciones del proyecto"

4. TESTEAR
   └─▶ "Escribe tests para [componente]"

5. DOCUMENTAR
   └─▶ "Documenta [feature] en el README"

6. REVISAR
   └─▶ "Revisa el código de [feature] y sugiere mejoras"
```

### Flujo 2: Debugging

```
1. IDENTIFICAR
   └─▶ "Este código tiene un error: [código]. El error es: [mensaje]"

2. ANALIZAR
   └─▶ "¿Por qué ocurre este error y cuáles son las posibles causas?"

3. SOLUCIONAR
   └─▶ "Corrige el error manteniendo la lógica original"

4. PREVENIR
   └─▶ "Agrega validación para evitar este error en el futuro"

5. TESTEAR
   └─▶ "Escribe un test que capture este caso edge"
```

### Flujo 3: Refactoring

```
1. ANALIZAR
   └─▶ "Analiza [archivo/módulo] e identifica oportunidades de mejora"

2. PRIORIZAR
   └─▶ "¿Cuáles cambios tienen mayor impacto con menor riesgo?"

3. REFACTORIZAR
   └─▶ "Refactoriza [parte específica] aplicando [patrón]"

4. VERIFICAR
   └─▶ "Ejecuta los tests y verifica que nada se rompió"

5. DOCUMENTAR
   └─▶ "Actualiza la documentación con los cambios"
```

---

## 4. Patrones de Integración

### Patrón: Context Priming
Dar contexto antes de pedir algo específico.

```bash
# MAL
claude "crea un endpoint"

# BIEN
claude "Este es un proyecto de API REST con Express.
Usa el patrón de controladores en /controllers.
Los modelos están en /models con Sequelize.
Crea un endpoint GET /api/users que liste todos los usuarios"
```

### Patrón: Iterative Refinement
Refinar la salida en pasos.

```bash
# Paso 1: Generar base
claude "crea una función de validación de formulario"

# Paso 2: Mejorar
claude "agrega validación de email a la función anterior"

# Paso 3: Optimizar
claude "refactoriza para que sea reutilizable"

# Paso 4: Documentar
claude "agrega JSDoc a la función"
```

### Patrón: Review Before Commit
Usar IA para revisar antes de commitear.

```bash
# Ver cambios
git diff

# Pedir review
claude "revisa estos cambios y dime si hay problemas:
$(git diff)"

# Si está bien
git add . && git commit -m "feat: descripción"
```

---

## 5. Configuración de MCP para Integración

### MCPs Recomendados para Proyectos

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-server-filesystem", "./"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-server-memory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### Beneficios por MCP

| MCP | Beneficio para el Proyecto |
|-----|---------------------------|
| filesystem | Claude puede leer/escribir archivos directamente |
| memory | Recuerda decisiones entre sesiones |
| github | Integración con issues, PRs, repos |
| sequential-thinking | Mejor razonamiento para problemas complejos |

---

## 6. Métricas de Productividad con IA

### Qué Medir

| Métrica | Sin IA | Con IA | Mejora |
|---------|--------|--------|--------|
| Líneas de código/hora | 20-50 | 100-200 | 3-4x |
| Tiempo para tests | 30 min | 5 min | 6x |
| Tiempo de debugging | Variable | -50% | 2x |
| Documentación | "Después" | Al momento | ∞ |

### Cómo Maximizar Productividad

1. **Mantén CLAUDE.md actualizado** - Contexto = mejor código
2. **Usa prompts específicos** - "Función X que hace Y" > "código"
3. **Itera rápido** - Genera, revisa, refina
4. **Aprovecha los tests** - La IA los escribe rápido
5. **Documenta al vuelo** - Pide docs junto con código

---

## 7. Limitaciones y Consideraciones

### La IA NO Debe:
- Tomar decisiones de arquitectura sin supervisión
- Modificar configuración de producción
- Manejar credenciales o secretos
- Hacer deploys automáticos
- Eliminar código sin confirmación

### La IA SÍ Puede:
- Generar código boilerplate
- Escribir tests
- Refactorizar código existente
- Documentar
- Sugerir mejoras
- Explicar código complejo

### Siempre Revisar:
- Código generado antes de usar
- Lógica de negocio crítica
- Manejo de errores
- Seguridad (inputs, validación)
- Performance en código crítico

---

## 8. Checklist de Integración

### Setup Inicial
- [ ] CLAUDE.md creado en la raíz
- [ ] Estructura de proyecto documentada
- [ ] Convenciones de código definidas
- [ ] MCPs configurados

### Por Sesión de Desarrollo
- [ ] Verificar que Claude lee CLAUDE.md
- [ ] Dar contexto antes de tareas complejas
- [ ] Revisar código generado
- [ ] Actualizar documentación si hay cambios

### Mantenimiento
- [ ] Actualizar CLAUDE.md cuando cambie el proyecto
- [ ] Documentar decisiones importantes
- [ ] Guardar prompts útiles para reutilizar

---

*AI-INTEGRATION.md - FPUNA 2026*
