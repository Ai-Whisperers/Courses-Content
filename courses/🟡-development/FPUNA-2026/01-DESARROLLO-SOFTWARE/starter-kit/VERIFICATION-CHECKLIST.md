# Checklist de Verificación - Código de Software Generado por IA

## Verificación específica para desarrollo de aplicaciones

---

## Checklist por Tipo de Código

### API Endpoints

```markdown
## Verificación de Endpoint: [método] [ruta]

### Funcionalidad
- [ ] El endpoint responde en la ruta correcta
- [ ] Acepta el método HTTP correcto (GET/POST/etc.)
- [ ] Parsea correctamente el body/params/query
- [ ] Devuelve el status code correcto (200, 201, 400, etc.)
- [ ] El response tiene el formato esperado

### Validación
- [ ] Valida campos requeridos
- [ ] Valida tipos de datos
- [ ] Valida formatos (email, fecha, etc.)
- [ ] Devuelve errores descriptivos

### Seguridad
- [ ] Requiere autenticación si es necesario
- [ ] Verifica autorización (¿puede este usuario hacer esto?)
- [ ] No hay SQL/NoSQL injection
- [ ] Input sanitizado
- [ ] No expone datos sensibles en response

### Edge Cases
- [ ] ¿Qué pasa si el recurso no existe?
- [ ] ¿Qué pasa si hay datos duplicados?
- [ ] ¿Qué pasa con request vacío?
- [ ] ¿Qué pasa con caracteres especiales?

### Performance
- [ ] Query a DB es eficiente (no N+1)
- [ ] Hay paginación si puede devolver muchos items
- [ ] Timeout razonable
```

---

### Queries de Base de Datos

```markdown
## Verificación de Query: [descripción]

### Corrección
- [ ] Devuelve los datos esperados
- [ ] Joins son correctos (no duplica filas)
- [ ] Filtros funcionan correctamente
- [ ] Ordenamiento es correcto

### Seguridad
- [ ] Usa prepared statements / parámetros
- [ ] No hay concatenación de strings con input
- [ ] No expone datos de otros usuarios

### Performance
- [ ] EXPLAIN muestra uso de índices
- [ ] No hay SELECT * innecesario
- [ ] Límite razonable de resultados
- [ ] No hay subqueries que pueden ser JOINs

### Edge Cases
- [ ] ¿Funciona con tabla vacía?
- [ ] ¿Funciona con NULLs?
- [ ] ¿Funciona con datos al límite (fecha min/max, etc.)?
```

---

### Funciones de Lógica de Negocio

```markdown
## Verificación de Función: [nombre]

### Contrato
- [ ] Input types son correctos
- [ ] Output type es correcto
- [ ] Docstring/comentario explica qué hace
- [ ] Nombre describe lo que hace

### Casos de Prueba
- [ ] Caso normal funciona
- [ ] Caso con input mínimo
- [ ] Caso con input máximo
- [ ] Caso con input inválido

### Manejo de Errores
- [ ] Valida input antes de procesar
- [ ] Excepciones tienen mensajes útiles
- [ ] No falla silenciosamente
- [ ] Errores se propagan correctamente

### Side Effects
- [ ] ¿Modifica estado global? (debería evitarse)
- [ ] ¿Modifica los argumentos? (documentar si sí)
- [ ] ¿Tiene efectos secundarios? (DB, files, etc.)
```

---

### Componentes de Frontend

```markdown
## Verificación de Componente: [nombre]

### Renderizado
- [ ] Renderiza sin errores
- [ ] Muestra datos correctamente
- [ ] Estados de loading funcionan
- [ ] Estados de error funcionan
- [ ] Estado vacío tiene UI apropiada

### Interactividad
- [ ] Eventos onClick/onChange funcionan
- [ ] Forms validan input
- [ ] Navegación funciona
- [ ] Feedback visual al usuario

### Accesibilidad
- [ ] Labels en inputs
- [ ] Alt text en imágenes
- [ ] Navegable con teclado
- [ ] Contraste de colores suficiente

### Performance
- [ ] No hay re-renders innecesarios
- [ ] Listas grandes usan virtualización
- [ ] Imágenes optimizadas
- [ ] Lazy loading donde aplique
```

---

### Tests Generados por IA

```markdown
## Verificación de Tests

### Cobertura
- [ ] Cubren el happy path
- [ ] Cubren edge cases
- [ ] Cubren casos de error
- [ ] No son tests triviales (test que siempre pasa)

### Calidad
- [ ] Cada test prueba UNA cosa
- [ ] Nombres describen qué prueban
- [ ] Son independientes (no dependen de orden)
- [ ] Mocks son apropiados (no mockean todo)

### Validez
- [ ] Los asserts verifican lo correcto
- [ ] No hay false positives (pasan pero no prueban nada)
- [ ] El test FALLA si rompes el código

### Verificación de Tests
# Para verificar que un test es válido:
1. Ejecutar test → debe pasar
2. Romper el código a propósito
3. Ejecutar test → DEBE FALLAR
4. Si no falla, el test no sirve
```

---

## Verificación de Seguridad Específica

### Checklist OWASP para Código de IA

```markdown
## Security Review

### A01: Broken Access Control
- [ ] Cada endpoint verifica permisos
- [ ] No hay IDOR (Insecure Direct Object Reference)
- [ ] Usuarios no pueden escalar privilegios

### A02: Cryptographic Failures
- [ ] Passwords hasheados (bcrypt, argon2)
- [ ] No hay secrets en código
- [ ] HTTPS para datos sensibles

### A03: Injection
- [ ] SQL: prepared statements
- [ ] NoSQL: input validation
- [ ] OS Commands: no os.system con input
- [ ] LDAP/XPath: parameterizado

### A04: Insecure Design
- [ ] Validación en server (no solo client)
- [ ] Rate limiting en endpoints sensibles
- [ ] Principio de menor privilegio

### A05: Security Misconfiguration
- [ ] Debug mode OFF en prod
- [ ] Headers de seguridad (CORS, CSP)
- [ ] Errores no exponen stack traces

### A06: Vulnerable Components
- [ ] Dependencias actualizadas
- [ ] No hay dependencias con CVEs conocidos
- [ ] Lock file existe (package-lock.json, etc.)

### A07: Auth Failures
- [ ] Tokens expiran
- [ ] Logout invalida sesión
- [ ] Brute force protection

### A08: Data Integrity
- [ ] Validación de tipos
- [ ] Sanitización de input
- [ ] Serialización segura

### A09: Logging Failures
- [ ] Eventos de seguridad se loguean
- [ ] No hay datos sensibles en logs
- [ ] Logs tienen timestamp y contexto

### A10: SSRF
- [ ] URLs de usuario validadas
- [ ] No fetch a URLs arbitrarias
- [ ] Whitelist de dominios permitidos
```

---

## Proceso de Code Review para Código de IA

### Paso 1: Lectura Rápida (2-3 min)

- ¿Qué hace este código?
- ¿Está en el lugar correcto del proyecto?
- ¿Sigue el estilo del proyecto?

### Paso 2: Análisis de Lógica (5-10 min)

- Trazar ejecución mentalmente
- Identificar paths posibles
- Buscar edge cases no manejados

### Paso 3: Verificación de Seguridad (5 min)

- Usar checklist OWASP arriba
- Buscar patrones peligrosos conocidos

### Paso 4: Testing (10+ min)

- Escribir/ejecutar tests
- Probar manualmente casos edge
- Verificar con datos reales

### Paso 5: Integración (5 min)

- ¿Rompe algo existente?
- ¿Necesita migración de DB?
- ¿Necesita cambios en otros servicios?

---

## Herramientas de Verificación Automática

### Linting y Formato

```bash
# JavaScript/TypeScript
npx eslint . --fix
npx prettier --check .

# Python
flake8 .
black --check .
isort --check .

# SQL
sqlfluff lint queries/
```

### Seguridad

```bash
# JavaScript
npm audit
npx snyk test

# Python
pip-audit
bandit -r .
safety check

# Secrets en código
gitleaks detect
trufflehog git file://./
```

### Tests

```bash
# JavaScript
npm test -- --coverage

# Python
pytest --cov=. --cov-report=html

# Ver reporte
open htmlcov/index.html
```

### Performance

```bash
# Database queries
EXPLAIN ANALYZE SELECT ...;

# API load testing
k6 run load_test.js
ab -n 1000 -c 10 http://localhost:3000/api/users
```

---

## Template de Reporte de Verificación

```markdown
# Code Review: [PR/Cambio]

## Resumen
- Autor: [IA asistida por X]
- Fecha: [fecha]
- Archivos: [lista]

## Verificaciones Realizadas

### ✅ Pasaron
- [ ] Código ejecuta sin errores
- [ ] Tests pasan
- [ ] Linting pasa
- [ ] Seguridad básica OK

### ⚠️ Observaciones
- [Observación 1]
- [Observación 2]

### ❌ Requiere Cambios
- [Problema 1]
- [Problema 2]

## Tests Ejecutados
- Unit tests: X/Y pasaron
- Integration tests: X/Y pasaron
- Manual testing: [descripción]

## Decisión
- [ ] APROBADO
- [ ] APROBADO CON CAMBIOS MENORES
- [ ] REQUIERE CAMBIOS
- [ ] RECHAZADO
```

---

*VERIFICATION-CHECKLIST.md - Track 01 Desarrollo Software - FPUNA 2026*
