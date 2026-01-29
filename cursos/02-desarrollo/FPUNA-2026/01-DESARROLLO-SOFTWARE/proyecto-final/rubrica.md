# Capstone Project - Rúbrica Detallada
## Sistema de Gestión FPUNA

---

## 1. Arquitectura (20 puntos)

### Excelente (18-20)
- ✅ 4+ microservicios bien separados
- ✅ Event-driven architecture implementado
- ✅ Database per service
- ✅ API Gateway (opcional pero suma puntos)
- ✅ Service discovery o configuración centralizada

### Bueno (14-17)
- ✅ 3 microservicios funcionales
- ✅ Event-driven básico
- ✅ Database per service
- ⚠️ Sin API Gateway

### Suficiente (10-13)
- ✅ 3 microservicios
- ⚠️ Comunicación síncrona (HTTP directo)
- ⚠️ Algunas bases de datos compartidas

### Insuficiente (<10)
- ❌ Monolito en lugar de microservicios
- ❌ Database única

---

## 2. Código (20 puntos)

### Excelente (18-20)
- ✅ 5+ design patterns aplicados correctamente
- ✅ SOLID principles en todo el código
- ✅ Clean code (nombres claros, funciones pequeñas)
- ✅ Dependency Injection consistente
- ✅ Error handling robusto

### Bueno (14-17)
- ✅ 3-4 patterns aplicados
- ✅ SOLID en la mayoría del código
- ✅ Código limpio
- ⚠️ Algunos code smells menores

### Suficiente (10-13)
- ✅ 1-2 patterns
- ⚠️ Violaciones SOLID ocasionales
- ⚠️ Nombres confusos
- ⚠️ Funciones largas

### Insuficiente (<10)
- ❌ No usa patterns
- ❌ Código sucio, difícil de leer
- ❌ Violaciones SOLID frecuentes

---

## 3. Testing (15 puntos)

### Excelente (13-15)
- ✅ Coverage >80%
- ✅ Unit tests + integration tests
- ✅ Tests bien escritos (AAA pattern)
- ✅ Mocking apropiado
- ✅ Todos los tests pasan

### Bueno (10-12)
- ✅ Coverage 70-80%
- ✅ Principalmente unit tests
- ✅ Tests pasan
- ⚠️ Algunos tests flacos

### Suficiente (7-9)
- ✅ Coverage 50-69%
- ⚠️ Solo unit tests
- ⚠️ Algunos tests fallan

### Insuficiente (<7)
- ❌ Coverage <50%
- ❌ Tests mal escritos o ausentes

---

## 4. Funcionalidad (15 puntos)

### Excelente (13-15)
- ✅ Todos los 4 servicios funcionan
- ✅ Todas las features implementadas
- ✅ Sin bugs críticos
- ✅ Manejo de edge cases

### Bueno (10-12)
- ✅ 3-4 servicios funcionan
- ✅ Features principales implementadas
- ⚠️ 1-2 bugs menores

### Suficiente (7-9)
- ✅ 2-3 servicios funcionan
- ⚠️ Algunas features incompletas
- ⚠️ Bugs presentes

### Insuficiente (<7)
- ❌ Mayoría de servicios no funcionan
- ❌ Features faltantes
- ❌ Bugs críticos

---

## 5. DevOps (10 puntos)

### Excelente (9-10)
- ✅ Docker Compose funcional
- ✅ Health checks en todos los servicios
- ✅ Environment variables (.env)
- ✅ Fácil de correr (`docker-compose up`)
- ✅ Scripts de setup automatizados

### Bueno (7-8)
- ✅ Docker Compose funcional
- ✅ Environment variables
- ⚠️ Health checks básicos

### Suficiente (5-6)
- ✅ Docker Compose funciona con ajustes
- ⚠️ Sin health checks
- ⚠️ Setup manual necesario

### Insuficiente (<5)
- ❌ Docker Compose no funciona
- ❌ Difícil de correr

---

## 6. Documentation (10 puntos)

### Excelente (9-10)
- ✅ README completo (setup, run, test)
- ✅ Architecture diagram profesional
- ✅ API documentation (Swagger)
- ✅ Database schemas documentados
- ✅ Decisiones técnicas justificadas

### Bueno (7-8)
- ✅ README con instrucciones
- ✅ Architecture diagram básico
- ✅ API docs
- ⚠️ Schemas faltantes

### Suficiente (5-6)
- ✅ README básico
- ⚠️ Sin diagramas
- ⚠️ Documentación incompleta

### Insuficiente (<5)
- ❌ README inexistente o inútil
- ❌ Sin diagramas
- ❌ Sin API docs

---

## 7. Video Demo (10 puntos)

### Excelente (9-10)
- ✅ 10 minutos exactos
- ✅ Muestra arquitectura claramente
- ✅ Demo funcionalidades
- ✅ Explica decisiones técnicas
- ✅ Muestra tests corriendo
- ✅ Audio y video de calidad

### Bueno (7-8)
- ✅ 8-12 minutos
- ✅ Demo funcional
- ✅ Explicaciones básicas
- ⚠️ Falta algún aspecto

### Suficiente (5-6)
- ✅ Video presente
- ⚠️ Muy corto (<7 min) o largo (>15 min)
- ⚠️ Explicaciones confusas

### Insuficiente (<5)
- ❌ Sin video
- ❌ Video no muestra nada relevante

---

## Cálculo Final

**Total**: 100 puntos

| Puntos | Nota |
|--------|------|
| 90-100 | Excelente (equivale a 100%) |
| 75-89  | Bueno (equivale a 85%) |
| 60-74  | Suficiente (equivale a 70%) |
| <60    | Insuficiente (equivale a <60%) |

**Nota**: Esta rúbrica vale 50% de la calificación final del track.

---

## Bonus Points (+5 máximo)

- **+2**: CI/CD pipeline (GitHub Actions)
- **+2**: Desplegado en cloud (AWS, Azure, GCP)
- **+1**: Monitoring (Prometheus, Grafana)
- **+1**: API rate limiting
- **+1**: Swagger UI auto-generado

---

*Rúbrica Capstone - Track 01 - FPUNA 2026*
