# Capstone Project: Sistema de Gestión FPUNA
## Track 01 - Software Development

**Duración**: 20 horas extra-clase  
**Peso**: 50% de calificación final

---

## Descripción

Construir un sistema de gestión universitaria con arquitectura de microservicios, aplicando todos los conceptos aprendidos.

---

## Requisitos Funcionales

### 1. User Service
- Registro y autenticación (JWT)
- Perfiles (estudiante, profesor, admin)
- Gestión de roles y permisos

### 2. Course Service
- CRUD de cursos
- Inscripciones
- Horarios y aulas
- Pre-requisitos

### 3. Grade Service
- Registro de calificaciones
- Cálculo de promedios
- Transcripts (historial académico)
- Analytics

### 4. Notification Service
- Email notifications
- SMS (opcional)
- Event-driven (escucha eventos de otros servicios)

---

## Requisitos Técnicos

### Arquitectura
✅ **Microservicios** (mínimo 3 servicios)  
✅ **API Gateway** (opcional: Kong, NGINX, o NestJS gateway)  
✅ **Event-driven** (RabbitMQ o Redis pub/sub)  
✅ **Database per service** (PostgreSQL)

### Código
✅ **TypeScript + NestJS**  
✅ **Design Patterns** (Factory, Strategy, Observer, etc.)  
✅ **SOLID principles**  
✅ **Clean Code** (naming, functions, no code smells)

### Testing
✅ **Unit tests** (coverage >70%)  
✅ **Integration tests** (API endpoints)  
✅ **Jest** como framework

### DevOps
✅ **Docker Compose** (local development)  
✅ **Environment variables** (.env files)  
✅ **Health checks** (cada servicio)

### Documentation
✅ **README** completo (setup, run, test)  
✅ **Architecture diagram**  
✅ **API documentation** (Swagger/OpenAPI)  
✅ **Database schemas** (diagrams)

---

## Estructura del Proyecto

```
fpuna-management-system/
├── services/
│   ├── user-service/
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── course-service/
│   ├── grade-service/
│   └── notification-service/
├── api-gateway/  (opcional)
├── docker-compose.yml
├── docs/
│   ├── architecture.md
│   ├── api.md
│   └── diagrams/
└── README.md
```

---

## Entregables

### 1. Código en GitHub
- Repositorio público o privado
- Multi-repo o mono-repo (tu elección)
- Commits regulares (no un solo commit final)

### 2. Documentación
- **README.md** principal con:
  - Descripción del proyecto
  - Instrucciones de setup
  - Cómo correr tests
  - Cómo correr aplicación
- **Architecture diagram** (draw.io, Excalidraw)
- **API documentation** (Swagger UI)
- **Database schemas** (dbdiagram.io)

### 3. Video Demo (10 minutos)
- Mostrar arquitectura
- Demo de funcionalidades
- Explicar decisiones técnicas
- Mostrar tests corriendo

---

## Evaluación (50% de nota final)

| Criterio | Peso | Descripción |
|----------|------|-------------|
| **Arquitectura** | 20% | Microservicios bien diseñados, event-driven, database per service |
| **Código** | 20% | Design patterns, SOLID, clean code, no code smells |
| **Testing** | 15% | Unit tests + integration tests, coverage >70% |
| **Funcionalidad** | 15% | Todas las features funcionan correctamente |
| **DevOps** | 10% | Docker compose funcional, health checks |
| **Documentation** | 10% | README completo, diagramas, API docs |
| **Video Demo** | 10% | Presentación clara, explicación técnica |

---

## Rúbrica Detallada

Ver: [rubrica.md](./rubrica.md)

---

## Timeline Sugerido

| Semana | Actividad |
|--------|-----------|
| **Semana 2** | Diseño de arquitectura, database schemas |
| **Semana 3** | Implementar User Service + tests |
| **Semana 4** | Implementar Course Service + tests |
| **Semana 5** | Implementar Grade + Notification Services |
| **Semana 6** | Integration, Docker, documentation, video |

**Deadline final**: 6 semanas después de iniciar track

---

## Recursos de Ayuda

### Ejemplos de Referencia
- [NestJS Microservices](https://docs.nestjs.com/microservices/basics)
- [Docker Compose with NestJS](https://www.docker.com/blog/how-to-deploy-nest-js-app-to-docker/)

### Herramientas
- **Architecture**: Excalidraw, draw.io
- **API Docs**: Swagger UI (built-in NestJS)
- **Database**: dbdiagram.io
- **Video**: Loom, OBS Studio

### Soporte
- **Slack**: #software-dev-capstone
- **Office Hours**: Viernes 18:00-20:00

---

## FAQs

### ¿Puedo usar otro lenguaje?
**No**. Debe ser TypeScript + NestJS para este track.

### ¿Cuántos microservicios mínimo?
**Mínimo 3**. Recomendado: 4 (User, Course, Grade, Notification).

### ¿Necesito desplegar en la nube?
**No**. Docker Compose local es suficiente.

### ¿Puedo trabajar en equipo?
**No**. Proyecto individual. Pero puedes colaborar en Slack.

### ¿Qué pasa si no termino todo?
Entrega lo que tengas. Parciales con buena calidad > completo pero mal hecho.

---

## Inspiración

Sistemas similares:
- Canvas LMS
- Moodle
- Blackboard

**¡No copies código directamente!** Úsalos como referencia de features.

---

## Próximos Pasos

1. ✅ Leer [rubrica.md](./rubrica.md)
2. ✅ Diseñar arquitectura (Módulo 01)
3. ✅ Aplicar patterns (Módulo 02)
4. ✅ Escribir tests primero (Módulo 03)
5. ✅ Clean code siempre (Módulo 04)
6. ✅ Diseño escalable (Módulo 05)

**¡Manos a la obra! 🚀**

---

*Capstone Project - Track 01 Software Development - FPUNA 2026*
