# Día 4: IA para Desarrollo de Software

## Información General

| Aspecto | Detalle |
|---------|---------|
| **Fecha** | Jueves 5 de Febrero, 2026 |
| **Duración** | 2 horas |
| **Audiencia** | Ing. Informática, Desarrollo de Software |
| **Pre-requisito** | Día 1 completado con éxito |
| **Objetivo** | Usar IA para escribir, debuggear y documentar código |

---

## Setup Requerido ANTES de Clase

Ver: [SETUP-DIA-04.md](./SETUP-DIA-04.md) para instrucciones completas.

### Resumen Rápido

| Requisito | Obligatorio | Tiempo Estimado |
|-----------|-------------|-----------------|
| Día 1 completado | ✅ Sí | - |
| Node.js 18+ (ya instalado) | ✅ Sí | - |
| VS Code con extensiones | ✅ Sí | 15 min |
| Git configurado | ✅ Sí | - |
| Python 3.11+ | ⚠️ Recomendado | 15 min |
| Docker Desktop | ⚠️ Opcional | 20 min |

**Tiempo total de setup adicional**: ~30-50 minutos

---

## Estructura de la Clase (2 horas)

### Módulo 1: IA en el Desarrollo Moderno (10 min)
- GitHub Copilot, Claude, ChatGPT en desarrollo
- Casos de uso reales
- Limitaciones y mejores prácticas
- ¿Cuándo confiar vs verificar?

### Módulo 2: Generación de Código con IA (15 min)
- Demo: crear una API REST completa
- Estructura de prompt para código
- Especificar lenguaje, framework, estilo
- Ejercicio: generar endpoint CRUD

### Módulo 3: Debugging Asistido por IA (15 min)
- Demo: encontrar y arreglar bugs
- Cómo describir errores efectivamente
- Interpretar stack traces con IA
- Ejercicio: debuggear código con errores

### Break (10 min)

### Módulo 4: Testing con IA (15 min)
- Demo: generar tests unitarios
- Cobertura de casos edge
- TDD asistido por IA
- Ejercicio: generar tests para función existente

### Módulo 5: Refactoring y Clean Code (15 min)
- Demo: mejorar código existente
- Aplicar patrones de diseño
- Code review asistido
- Ejercicio: refactorizar código "feo"

### Módulo 6: Documentación Automática (15 min)
- Demo: generar README, JSDoc, docstrings
- Documentar APIs
- Crear diagramas con IA
- Ejercicio: documentar un módulo

### Módulo 7: Cierre + Herramientas Avanzadas (15 min)
- Cursor IDE, Aider, otras herramientas
- Integración con CI/CD
- Q&A específico de desarrollo
- Adelanto del Día 5

---

## Demos y Ejercicios

### Demo Principal: API REST con Express

```
Prompt: "Genera una API REST en Node.js con Express que:
- Tenga endpoints CRUD para 'products'
- Use validación con Joi
- Maneje errores correctamente
- Incluya tests con Jest
- Tenga documentación Swagger"
```

### Ejercicios:
1. **CRUD**: Generar endpoints para entidad "users"
2. **Debug**: Arreglar código async con race conditions
3. **Tests**: Generar tests para función de validación
4. **Refactor**: Mejorar código con código espagueti

---

## Patrones de Prompt para Desarrollo

### Para Generar Código
```
"Genera [lenguaje] código para [funcionalidad].
Requisitos:
- [requisito 1]
- [requisito 2]
Usa [framework/librería].
Sigue [estilo/convención].
Incluye manejo de errores."
```

### Para Debugging
```
"Este código tiene un bug:
[código]

Error que obtengo:
[mensaje de error/stack trace]

Comportamiento esperado:
[descripción]

Comportamiento actual:
[descripción]"
```

### Para Tests
```
"Genera tests unitarios para esta función:
[código de la función]

Casos a cubrir:
- [caso 1]
- [caso 2]
- [edge cases]

Framework de testing: [Jest/Pytest/etc]"
```

---

## Verificación de Éxito

Al final del Día 4, cada estudiante debe poder:

- [ ] Generar código funcional con prompts específicos
- [ ] Debuggear errores usando IA como asistente
- [ ] Crear tests unitarios con cobertura adecuada
- [ ] Refactorizar código mejorando su calidad
- [ ] Documentar código automáticamente

---

## Stack Tecnológico del Día

### Principal
- **JavaScript/TypeScript** con Node.js
- **Express** para APIs
- **Jest** para testing

### Alternativas (según preferencia)
- **Python** con FastAPI/Flask
- **Go** para APIs
- **React** para frontend

---

## Recursos de Desarrollo

### Documentación
- Node.js: https://nodejs.org/docs/
- Express: https://expressjs.com/
- Jest: https://jestjs.io/docs/

### Herramientas de IA para Desarrollo
- Cursor: https://cursor.sh/
- Aider: https://aider.chat/
- Continue: https://continue.dev/

### Estándares de Código
- Airbnb JS Style: https://github.com/airbnb/javascript
- Google TypeScript Style: https://google.github.io/styleguide/tsguide.html

---

*Día 4 - IA para Software*
*FPUNA Verano 2026*
