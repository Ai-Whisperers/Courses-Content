# Proyecto Capstone: QA Automation
## FPUNA 2026 - Track QA Automation

**Duración**: 20 horas (extra-clase)  
**Peso**: 50% de la nota final del track

---

## Objetivo

Construir un framework completo de test automation para una aplicación e-commerce, demostrando dominio de todas las técnicas aprendidas en el track.

---

## Opción Recomendada: E-Commerce Test Framework

### Aplicaciones Demo Sugeridas

1. **Sauce Demo** - https://www.saucedemo.com/
2. **DemoQA Store** - https://demoqa.com/
3. **OpenCart Demo** - https://demo.opencart.com/
4. **Playwright Demo** - https://demo.playwright.dev/todomvc/

---

## Requisitos Técnicos

### Tests Mínimos

- **60+ tests UI** (Playwright)
  - Autenticación (login/logout/registro)
  - Catálogo de productos (búsqueda, filtros)
  - Carrito de compras
  - Checkout completo

- **40+ tests API**
  - Products CRUD
  - Orders management
  - User endpoints

### Arquitectura Requerida

```
proyecto-capstone/
├── tests/
│   ├── e2e/           # Tests end-to-end
│   ├── api/           # Tests de API
│   └── visual/        # Visual regression
├── pages/             # Page Object Model
├── fixtures/          # Fixtures y test data
├── utils/             # Utilidades
├── .github/
│   └── workflows/     # CI/CD
└── README.md
```

### Técnicas Obligatorias

- ✅ Network mocking
- ✅ Visual regression testing
- ✅ Page Object Model
- ✅ Storage State para auth
- ✅ GitHub Actions CI/CD
- ✅ Reportes profesionales

---

## Entregables

1. **Repositorio GitHub** - Código completo
2. **README detallado** - Setup, ejecución, arquitectura
3. **CI/CD funcionando** - Pipeline verde
4. **Reportes de tests** - HTML reports
5. **Presentación** - 10 minutos demo

---

## Evaluación

Ver `rubric.md` para criterios detallados.

**Puntos clave**:
- Cobertura de tests (30%)
- Calidad del código (25%)
- Arquitectura (20%)
- CI/CD (15%)
- Documentación (10%)

---

## Fecha de Entrega

**Deadline**: 2 semanas después de completar Módulo 05

Enviar link del repositorio a: qa-capstone@fpuna.edu.py

---

*Capstone QA Automation - FPUNA 2026*
