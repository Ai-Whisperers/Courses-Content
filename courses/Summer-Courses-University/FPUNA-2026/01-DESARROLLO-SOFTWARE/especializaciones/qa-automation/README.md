# Track 07: Automatización QA con IA
## FPUNA Verano 2026 - Especialización en Testing y QA

---

## Descripción General

Domina las técnicas avanzadas de automatización de pruebas usando Playwright, pruebas de API, e integración continua, todo acelerado con herramientas de IA. Este track te convertirá en un ingeniero de QA profesional capaz de construir frameworks de testing robustos para aplicaciones del mundo real.

**Duración**: Semana 2 (20 horas totales)  
**Modalidad**: Hands-on con proyectos reales  
**Prerrequisitos**: Módulos 00-FUNDAMENTOS-PRINCIPALES (Semana 1) completados

---

## ¿Por Qué Automatización QA?

### La Realidad del Mercado

```
Testing Manual:           Testing Automatizado:
❌ Lento y repetitivo     ✅ Rápido y confiable
❌ Propenso a errores     ✅ Consistente
❌ No escalable           ✅ Escalable
❌ Costoso a largo plazo  ✅ ROI positivo
```

### Demanda Laboral en Paraguay

- **Salario promedio QA**: ₲8,000,000 - ₲15,000,000/mes
- **Empresas buscando QA**: Softtek, Global Logic, Aruma, Roshka
- **Remote-first**: 80% de posiciones QA permiten trabajo remoto
- **Crecimiento**: +45% demanda anual en testing automatizado

---

## Objetivos de Aprendizaje

Al completar este track, serás capaz de:

### 🎯 Competencias Técnicas

1. **Playwright Avanzado**
   - Crear test suites completos para aplicaciones web
   - Manejar autenticación, network mocking, visual testing
   - Optimizar performance y estabilidad de tests

2. **API Testing**
   - Automatizar pruebas de API REST/GraphQL
   - Validar contratos de API, schema, performance
   - Integrar API tests con CI/CD

3. **Test Architecture**
   - Diseñar frameworks de testing escalables
   - Implementar Page Object Model (POM)
   - Crear utilities y fixtures reutilizables

4. **CI/CD Integration**
   - Configurar GitHub Actions para tests
   - Generar reportes profesionales
   - Integrar con sistemas de notificación

5. **IA para QA**
   - Generar tests con OpenCode
   - Usar IA para debugging y optimización
   - Automatizar creación de test data

### 💼 Competencias Profesionales

- Trabajar en equipos ágiles de desarrollo
- Documentar estrategias de testing
- Comunicar bugs y findings efectivamente
- Estimar esfuerzos de testing
- Mantener suites de tests legacy

---

## Estructura del Track

```
07-QA-AUTOMATION/
│
├── README.md                          # Este archivo
│
├── modules/
│   ├── 01-playwright-avanzado/        # Network mocking, visual testing
│   │   ├── README.md                  # Teoría y conceptos
│   │   ├── EXERCISE.md                # Lab práctico
│   │   └── QUIZ.md                    # Evaluación
│   │
│   ├── 02-api-testing/                # REST/GraphQL testing
│   │   ├── README.md
│   │   ├── EXERCISE.md
│   │   └── QUIZ.md
│   │
│   ├── 03-test-architecture/          # POM, fixtures, utilities
│   │   ├── README.md
│   │   ├── EXERCISE.md
│   │   └── QUIZ.md
│   │
│   ├── 04-ci-cd-integration/          # GitHub Actions, reporting
│   │   ├── README.md
│   │   ├── EXERCISE.md
│   │   └── QUIZ.md
│   │
│   └── 05-ia-para-qa/                 # Test generation, debugging
│       ├── README.md
│       ├── EXERCISE.md
│       └── QUIZ.md
│
├── resources/
│   ├── cheatsheet.md                  # Guía rápida de Playwright
│   ├── tools.md                       # Herramientas y setup
│   └── best-practices.md              # Mejores prácticas QA
│
└── capstone/
    ├── README.md                      # Proyecto integrador
    └── rubric.md                      # Criterios de evaluación
```

---

## Roadmap de Aprendizaje

### Módulo 01: Playwright Avanzado (4 horas)
**Objetivo**: Dominar técnicas avanzadas de testing web

**Contenido**:
- Network interception y API mocking
- Visual regression testing
- Testing de componentes complejos (modals, iframes, shadow DOM)
- Manejo de autenticación y sesiones
- Performance optimization de tests

**Proyecto**: Test suite para aplicación e-commerce con 30+ tests

---

### Módulo 02: API Testing (4 horas)
**Objetivo**: Automatizar pruebas de APIs REST y GraphQL

**Contenido**:
- Playwright para API testing
- Schema validation con Zod/JSON Schema
- Contract testing
- Performance testing de APIs
- Mocking de servicios externos

**Proyecto**: Suite de tests para API de productos (CRUD completo)

---

### Módulo 03: Arquitectura de Tests (4 horas)
**Objetivo**: Construir frameworks escalables y mantenibles

**Contenido**:
- Page Object Model (POM) avanzado
- Custom fixtures y test helpers
- Test data management
- Configuración multi-ambiente
- Paralelización efectiva

**Proyecto**: Framework reutilizable para múltiples proyectos

---

### Módulo 04: CI/CD Integration (4 horas)
**Objetivo**: Integrar tests en pipelines de CI/CD

**Contenido**:
- GitHub Actions para Playwright
- Reportes profesionales (Allure, HTML)
- Test sharding y paralelización en CI
- Notificaciones automáticas (Slack, Discord)
- Debugging de fallas en CI

**Proyecto**: Pipeline completo con tests, reportes, y notificaciones

---

### Módulo 05: IA para QA (4 horas)
**Objetivo**: Acelerar testing con herramientas de IA

**Contenido**:
- Generación de tests con OpenCode
- Test data generation con IA
- Visual testing con IA (Applitools, Percy)
- Debugging asistido por IA
- Mantenimiento de tests con IA

**Proyecto**: Migración de suite manual a automatizada usando IA

---

## Proyecto Capstone (20 horas extra-clase)

### E-Commerce Test Automation Framework

**Descripción**: Construye un framework completo de testing para una aplicación e-commerce, demostrando todas las técnicas aprendidas.

**Requisitos**:
- 60+ tests UI (Playwright)
- 40+ tests API
- Page Object Model implementado
- CI/CD con GitHub Actions
- Reportes profesionales
- Visual regression testing
- Performance testing
- 80%+ code coverage

**Aplicaciones sugeridas**:
- DemoQA Store
- Sauce Demo
- OpenCart Demo
- Tu propio proyecto e-commerce

**Entregables**:
1. Repositorio GitHub con código completo
2. README con instrucciones de setup
3. CI/CD pipeline funcionando
4. Reporte final de testing
5. Presentación de 10 minutos

---

## Tecnologías y Herramientas

### Core Tools
| Herramienta | Propósito | Costo |
|-------------|-----------|-------|
| **Playwright** | Web automation | FREE |
| **Node.js** | Runtime | FREE |
| **TypeScript** | Lenguaje | FREE |
| **GitHub Actions** | CI/CD | FREE |
| **VS Code** | Editor | FREE |

### Testing Libraries
| Librería | Propósito | Costo |
|----------|-----------|-------|
| **@playwright/test** | Test runner | FREE |
| **Zod** | Schema validation | FREE |
| **Allure** | Reporting | FREE |
| **Faker.js** | Test data | FREE |

### IA Tools
| Herramienta | Propósito | Costo |
|-------------|-----------|-------|
| **OpenCode** | Test generation | FREE tier |
| **GitHub Copilot** | Code assistance | Gratis para estudiantes |
| **ChatGPT** | Debugging, learning | FREE tier |

---

## Recursos Compartidos (SHARED)

Este track reutiliza componentes del directorio `SHARED/`:

### De opencode-installation/
- ✅ Guías de instalación de OpenCode (Windows/Mac/Linux)
- ✅ Configuración de Node.js y VS Code
- ✅ Troubleshooting común

### De mcp-configuration/
- ✅ Configuración de MCPs para testing
- ✅ Playwright MCP setup
- ✅ Testing-specific configurations

### De skills-system/
- ✅ Skills de testing automatizado
- ✅ Playwright code generation skills
- ✅ Test maintenance skills

### De hooks-rules/
- ✅ Pre-commit hooks para tests
- ✅ Reglas de linting para test code
- ✅ Automated test execution hooks

### De project-templates/
- ✅ Playwright project template
- ✅ API testing template
- ✅ CI/CD template para testing

**👉 No necesitas reinstalar ni reconfigurar. Todo ya está listo desde Semana 1.**

---

## Evaluación y Certificación

### Distribución de Puntos

| Componente | Peso | Descripción |
|------------|------|-------------|
| **Ejercicios de Módulos** | 25% | Uno por módulo (5 total) |
| **Quizzes** | 15% | Evaluación conceptual por módulo |
| **Proyecto Capstone** | 50% | Framework completo de testing |
| **Participación** | 10% | Colaboración, ayuda a compañeros |

### Criterios de Aprobación

- **Mínimo 70%** para aprobar el track
- **80%+ = Distinción** - Certificado con mención honorífica
- **Proyecto capstone obligatorio** - No se puede omitir

### Certificación

Al aprobar recibirás:
- 📜 **Certificado FPUNA**: "QA Automation con IA - FPUNA Verano 2026"
- 💼 **Badge LinkedIn**: Verificable y compartible
- 🎯 **Portfolio GitHub**: Proyectos públicos para empleadores
- 📊 **Reporte de Competencias**: Detalle de skills adquiridos

---

## Prerrequisitos Técnicos

### Conocimientos Mínimos

✅ **Obligatorios** (de Semana 1):
- Uso básico de OpenCode
- Configuración de MCPs y Skills
- Prompt engineering fundamentals
- Git y GitHub básico
- JavaScript/TypeScript básico

❌ **NO se requiere**:
- Experiencia previa en testing
- Conocimiento avanzado de programación
- Experiencia con Playwright

### Software Requerido

Desde Semana 1 ya tienes instalado:
- ✅ OpenCode
- ✅ Node.js (v18+)
- ✅ VS Code
- ✅ Git

**Nuevo para este track** (instalaremos en Módulo 01):
- Playwright (via npm)
- Playwright browsers
- Extensión de Playwright para VS Code

---

## Horario Sugerido (Semana 2)

### Formato Intensivo (5 días)

| Día | Horario | Actividad | Duración |
|-----|---------|-----------|----------|
| **Lunes** | 08:00-12:00 | Módulo 01: Playwright Avanzado | 4h |
| **Martes** | 08:00-12:00 | Módulo 02: API Testing | 4h |
| **Miércoles** | 08:00-12:00 | Módulo 03: Test Architecture | 4h |
| **Jueves** | 08:00-12:00 | Módulo 04: CI/CD Integration | 4h |
| **Viernes** | 08:00-12:00 | Módulo 05: IA para QA | 4h |
| **Extra** | Horario flexible | Proyecto Capstone | 20h |

**Total**: 20 horas presenciales + 20 horas proyecto = **40 horas**

---

## Oportunidades Post-Curso

### Trayectorias de Carrera

```
Junior QA Engineer         → Mid-Level QA     → Senior QA / SDET
₲6M-8M/mes                   ₲10M-15M/mes       ₲18M-25M/mes
                                                      ↓
                                              QA Lead / Manager
                                              ₲25M-35M/mes
```

### Empresas en Paraguay

**Contratan QA Automation**:
- Softtek (multinacional, 500+ empleados PY)
- Global Logic (remote-first, proyectos USA)
- Aruma (fintech, stack moderno)
- Roshka (consultora, clientes internacionales)
- Jalasoft (Bolivia/Paraguay, nearshore)

### Certificaciones Siguientes

Para continuar tu crecimiento:
- **ISTQB Foundation Level** (~USD 200) - Fundamental QA certification
- **ISTQB Test Automation Engineer** (~USD 200) - Especialización
- **Certified Selenium Professional** (FREE) - Selenium skills
- **AWS Certified Cloud Practitioner** (~USD 100) - Cloud testing

---

## FAQs

### ¿Puedo tomar este track si no tengo experiencia en testing?
**Sí**, siempre que hayas completado los módulos CORE-FOUNDATION de Semana 1. Empezaremos desde conceptos intermedios pero con explicaciones claras.

### ¿Qué lenguaje de programación usaremos?
**TypeScript** (superset de JavaScript). Si sabes JavaScript básico, estarás bien. Incluimos un repaso rápido en Módulo 01.

### ¿Necesito instalar software pago?
**No**. Todo es 100% gratuito. Playwright, Node.js, VS Code, GitHub Actions - todo FREE.

### ¿Puedo trabajar en mi propio proyecto en lugar del capstone sugerido?
**Sí**, si tu proyecto cumple con los requisitos técnicos (60+ tests UI, 40+ API, CI/CD, etc.). Consulta con el instructor primero.

### ¿Qué pasa si no termino el capstone a tiempo?
Tienes **2 semanas extra** después del curso para entregar el capstone. Pero no se aceptan entregas después de ese período.

### ¿Este curso me prepara para certificaciones ISTQB?
**Parcialmente**. Cubre testing automatizado a profundidad, pero ISTQB tiene temas adicionales (test design, management). Es un excelente complemento.

### ¿Puedo conseguir trabajo solo con este curso?
**Es un inicio sólido**, especialmente con el proyecto capstone en tu portfolio. Pero deberás complementar con:
- Práctica continua (2-3 meses)
- Contribuciones open source
- Proyectos personales adicionales
- Networking en comunidades QA

---

## Contacto y Soporte

### Durante el Curso
- **Slack**: #qa-automation-2026
- **Office Hours**: Martes y Jueves 18:00-19:00
- **Email Instructor**: qa-instructor@fpuna.edu.py

### Después del Curso
- **Alumni Group**: Grupo de ex-alumnos para networking
- **Mentorías**: 2 sesiones de 30 min en los primeros 3 meses
- **Bolsa de Trabajo**: Acceso a oportunidades compartidas por FPUNA

---

## Próximos Pasos

1. **Asegúrate de haber completado** los 6 módulos CORE-FOUNDATION
2. **Revisa** que tienes Node.js y VS Code instalados
3. **Únete** al canal de Slack #qa-automation-2026
4. **Prepárate** para una semana intensiva pero gratificante

**¡Nos vemos el lunes en Módulo 01! 🚀**

---

*Track 07 - QA Automation con IA - FPUNA Verano 2026*  
*Última actualización: Enero 2026*
