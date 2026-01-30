# Plan de Implementación en Español: QA Automation

## Estructura Final en Español (Sin EXERCISE ni QUIZ)

```
especializaciones/qa-automation/
├── README.md                          # Overview del track (ya en español)
│
├── 01-automatizacion-navegador/       # ← Renombrado (antes: 01-playwright-avanzado)
│   ├── README.md                      # Teoría completa en español
│   ├── tutoriales/
│   │   ├── 01-intercepcion-red.md
│   │   ├── 02-regresion-visual.md
│   │   ├── 03-componentes-complejos.md
│   │   ├── 04-autenticacion.md
│   │   └── 05-rendimiento.md
│   └── ejemplos/
│       ├── 01-prompt-mocking-red.md
│       ├── 02-prompt-regresion-visual.md
│       └── 03-prompt-configuracion-autenticacion.md
│
├── 02-pruebas-api/                    # ← Ya está bien
│   ├── README.md                      # En español
│   ├── tutoriales/
│   │   ├── 01-fundamentos-rest-api.md
│   │   ├── 02-validacion-esquemas.md
│   │   ├── 03-pruebas-contrato.md
│   │   ├── 04-pruebas-rendimiento.md
│   │   └── 05-mocking-api.md
│   └── ejemplos/
│       ├── 01-prompt-suite-api.md
│       ├── 02-prompt-validacion-esquemas.md
│       └── 03-prompt-pruebas-carga.md
│
├── 03-arquitectura-pruebas/           # ← Ya está bien
│   ├── README.md                      # ← TRADUCIR: Actualmente en inglés
│   ├── tutoriales/
│   │   ├── 01-modelo-objeto-pagina.md
│   │   ├── 02-fixtures-personalizadas.md
│   │   ├── 03-gestion-datos-prueba.md
│   │   ├── 04-configuracion-multi-ambiente.md
│   │   └── 05-paralelizacion.md
│   └── ejemplos/
│       ├── 01-prompt-fixtures.md
│       ├── 02-prompt-generacion-datos.md
│       └── 03-prompt-configuracion-ambiente.md
│
├── 04-integracion-continua/           # ← Renombrado (antes: 04-integracion-ci-cd)
│   ├── README.md                      # En español
│   ├── tutoriales/
│   │   ├── 01-configuracion-github-actions.md
│   │   ├── 02-reportes-profesionales.md
│   │   ├── 03-fragmentacion-tests.md
│   │   ├── 04-notificaciones.md
│   │   └── 05-workflows-avanzados.md
│   └── ejemplos/
│       ├── 01-prompt-github-actions.md
│       ├── 02-prompt-reporte-allure.md
│       └── 03-prompt-notificaciones-slack.md
│
├── 05-inteligencia-artificial-qa/     # ← Renombrado (antes: 05-ia-para-qa)
│   ├── README.md                      # En español
│   ├── tutoriales/
│   │   ├── 01-generacion-tests-ia.md
│   │   ├── 02-generacion-datos-ia.md
│   │   ├── 03-depuracion-ia.md
│   │   ├── 04-pruebas-visuales-ia.md
│   │   └── 05-mantenimiento-tests-ia.md
│   └── ejemplos/
│       ├── 01-prompt-generacion-tests.md
│       ├── 02-prompt-datos-prueba.md
│       └── 03-prompt-depuracion.md
│
└── recursos/                          # Recursos compartidos
    ├── guia-rapida.md
    ├── herramientas.md
    └── mejores-practicas.md
```

---

## Comandos de Renombramiento

### Paso 1: Renombrar Carpetas de Módulos

```bash
# Desde: cursos/02-desarrollo/FPUNA-2026/01-DESARROLLO-SOFTWARE/especializaciones/qa-automation/modules/

# Renombrar carpetas a español consistente
mv 01-playwright-avanzado 01-automatizacion-navegador
mv 04-integracion-ci-cd 04-integracion-continua
mv 05-ia-para-qa 05-inteligencia-artificial-qa
```

### Paso 2: Renombrar Archivos de Tutorial

```bash
# Módulo 01: automatizacion-navegador
cd 01-automatizacion-navegador/tutoriales/
mv 01_Network_Interception.md 01-intercepcion-red.md
mv 02_Visual_Regression.md 02-regresion-visual.md
mv 03_Complex_Components.md 03-componentes-complejos.md
mv 04_Authentication.md 04-autenticacion.md
mv 05_Performance.md 05-rendimiento.md

cd ../ejemplos/
mv 01_NetworkMocking_Prompt.md 01-prompt-mocking-red.md
mv 02_VisualRegression_Prompt.md 02-prompt-regresion-visual.md
mv 03_AuthenticationSetup_Prompt.md 03-prompt-configuracion-autenticacion.md

# Módulo 02: pruebas-api
cd ../../02-pruebas-api/tutoriales/
mv 01_REST_API_Basics.md 01-fundamentos-rest-api.md
mv 02_Schema_Validation_Zod.md 02-validacion-esquemas.md
mv 03_Contract_Testing.md 03-pruebas-contrato.md
mv 04_Performance_Testing.md 04-pruebas-rendimiento.md
mv 05_API_Mocking.md 05-mocking-api.md

cd ../ejemplos/
mv 01_APITestSuite_Prompt.md 01-prompt-suite-api.md
mv 02_SchemaValidation_Prompt.md 02-prompt-validacion-esquemas.md
mv 03_LoadTesting_Prompt.md 03-prompt-pruebas-carga.md

# Módulo 03: arquitectura-pruebas
cd ../../03-arquitectura-pruebas/tutoriales/
mv 01_Page_Object_Model.md 01-modelo-objeto-pagina.md
mv 02_Custom_Fixtures_Helpers.md 02-fixtures-personalizadas.md
mv 03_Test_Data_Management.md 03-gestion-datos-prueba.md
mv 04_Multi_Environment_Config.md 04-configuracion-multi-ambiente.md
mv 05_Parallelization_Performance.md 05-paralelizacion.md

cd ../ejemplos/
mv 01_CustomFixtures_Prompt.md 01-prompt-fixtures.md
mv 02_TestDataGeneration_Prompt.md 02-prompt-generacion-datos.md
mv 03_EnvironmentConfig_Prompt.md 03-prompt-configuracion-ambiente.md

# Módulo 04: integracion-continua
cd ../../04-integracion-continua/tutoriales/
mv 01_GitHub_Actions_Setup.md 01-configuracion-github-actions.md
mv 02_Professional_Reporting.md 02-reportes-profesionales.md
mv 03_Test_Sharding.md 03-fragmentacion-tests.md
mv 04_Notifications.md 04-notificaciones.md
mv 05_Advanced_Workflows.md 05-workflows-avanzados.md

cd ../ejemplos/
mv 01_GitHub_Actions_Prompt.md 01-prompt-github-actions.md
mv 02_Allure_Report_Prompt.md 02-prompt-reporte-allure.md
mv 03_Slack_Notifications_Prompt.md 03-prompt-notificaciones-slack.md

# Módulo 05: inteligencia-artificial-qa
cd ../../05-inteligencia-artificial-qa/tutoriales/
mv 01_AI_Test_Generation.md 01-generacion-tests-ia.md
mv 02_AI_Test_Data_Generation.md 02-generacion-datos-ia.md
mv 03_AI_Debugging_Analysis.md 03-depuracion-ia.md
mv 04_Visual_Testing_AI.md 04-pruebas-visuales-ia.md
mv 05_Test_Maintenance_AI.md 05-mantenimiento-tests-ia.md

cd ../ejemplos/
mv 01_Test_Generation_Prompt.md 01-prompt-generacion-tests.md
mv 02_Test_Data_Prompt.md 02-prompt-datos-prueba.md
mv 03_Debugging_Prompt.md 03-prompt-depuracion.md
```

---

## Traducción del Módulo 03

El Módulo 03 (arquitectura-pruebas) está actualmente en inglés. Debe traducirse completamente al español manteniendo los términos técnicos en inglés cuando sea apropiado.

### Términos Técnicos a Mantener en Inglés:
- `Page Object Model` → explicar como "Modelo de Objeto de Página"
- `fixtures` → mantener como "fixtures" (término estándar)
- `test` / `testing` → traducir como "prueba" / "pruebas"
- `CI/CD` → mantener como siglas, explicar "Integración Continua / Entrega Continua"
- `shard` / `sharding` → traducir como "fragmentación" o "división"
- `helpers` → traducir como "auxiliares" o "ayudantes"

---

## Eliminación de Archivos Duplicados

```bash
# Eliminar README-TUTORIALS.md duplicados
rm 03-arquitectura-pruebas/README-TUTORIALS.md
rm 04-integracion-continua/README-TUTORIALS.md
```

---

## Consolidación de Contenido Redundante

### Redundancia 1: Network Mocking
**Actual:** Explicado en Módulo 01 y Módulo 02

**Solución:**
- Módulo 01 (automatizacion-navegador): Mantener sección de intercepción de red enfocada en UI
- Módulo 02 (pruebas-api): Agregar referencia en lugar de repetir:

```markdown
## Mocking de APIs

Para mocking de APIs en tests de UI, consulta el 
[Tutorial 01 del Módulo 01](../01-automatizacion-navegador/tutoriales/01-intercepcion-red.md).

En este módulo nos enfocamos en pruebas de APIs reales usando `APIRequestContext`.
```

---

## Estimación de Esfuerzo

| Tarea | Tiempo Estimado |
|-------|-----------------|
| Renombrar carpetas de módulos | 30 min |
| Renombrar archivos de tutoriales (25 archivos) | 1 hora |
| Renombrar archivos de ejemplos (15 archivos) | 30 min |
| Traducir Módulo 03 al español | 4 horas |
| Eliminar archivos duplicados | 15 min |
| Consolidar contenido redundante | 2 horas |
| Validar estructura final | 1 hora |
| **TOTAL** | **9 horas 15 min** |

---

## Validación Final

### Checklist de Verificación:

- [ ] Todas las carpetas de módulos tienen nombres en español
- [ ] Todos los archivos usan guiones-medios (kebab-case) en minúsculas
- [ ] El Módulo 03 está completamente en español
- [ ] No hay archivos README-TUTORIALS.md duplicados
- [ ] No hay redundancia de contenido entre módulos
- [ ] Todos los enlaces internos funcionan correctamente
- [ ] Todos los nombres de archivos son consistentes

---

## Notas Importantes

### Términos Técnicos:
Algunos términos técnicos se mantendrán en inglés porque:
1. Son estándar en la industria (Playwright, GitHub Actions, API)
2. Los estudiantes los encontrarán así en documentación oficial
3. Preparan mejor para el mercado laboral

Ejemplos de términos que se mantienen en inglés:
- Playwright
- GitHub Actions
- API (Interfaz de Programación de Aplicaciones)
- JSON, HTML, CSS
- URL, HTTP, REST

### Términos Traducidos:
- Network → Red
- Interception → Intercepción
- Visual Regression → Regresión Visual
- Authentication → Autenticación
- Performance → Rendimiento
- Test Sharding → Fragmentación de Pruebas
- Custom Fixtures → Fixtures Personalizadas
- Test Data → Datos de Prueba
- Multi-Environment → Multi-Ambiente
- AI → Inteligencia Artificial / IA

---

*Plan actualizado: Todo en español, sin archivos EXERCISE ni QUIZ*
