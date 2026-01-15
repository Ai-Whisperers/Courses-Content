# Módulo 01: Arquitectura de Software
## FPUNA 2026 - Track Software Development

**Duración**: 4 horas  
**Modalidad**: Teórico-práctico con AI  
**Nivel**: Intermedio-Avanzado

---

## Objetivos de Aprendizaje

Al finalizar este módulo, serás capaz de:

1. **Comprender** los principios fundamentales de arquitectura de software
2. **Diseñar** arquitecturas en capas (layered architecture)
3. **Distinguir** entre arquitecturas monolíticas y microservicios
4. **Crear** APIs RESTful y GraphQL bien diseñadas
5. **Implementar** patrones de arquitectura event-driven
6. **Utilizar** AI (OpenCode) para generar arquitecturas escalables

---

## Estructura del Módulo

### 📚 Contenido Teórico (1.5 horas)
- [Architecture Fundamentals](./content/01-architecture-fundamentals.md)
  - Principios de diseño
  - Layered architecture
  - Microservices vs Monolith
  - API design (REST/GraphQL)
  - Event-driven patterns

### 💻 Ejercicio Práctico (2 horas)
- [Diseño de Arquitectura E-commerce](./EXERCISE.md)
  - Diseñar sistema completo
  - Documentar decisiones
  - Implementar con AI

### 🎯 Evaluación (30 minutos)
- Revisión de diseño arquitectónico
- Feedback de pares
- AI-assisted code review

---

## Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **TypeScript** | Lenguaje principal |
| **NestJS** | Framework backend |
| **PostgreSQL** | Base de datos |
| **Redis** | Caching layer |
| **Docker** | Containerización |
| **OpenCode** | AI pair programming |

---

## Prerequisitos

### Conocimientos Requeridos
- ✅ TypeScript básico
- ✅ Programación orientada a objetos
- ✅ HTTP y APIs
- ✅ Git fundamentals

### Software Instalado
- ✅ OpenCode (desde Semana 1)
- ✅ Node.js 18+
- ✅ Docker Desktop
- ✅ VS Code

---

## Contenido Detallado

### Parte 1: Principios de Arquitectura (30 min)

**Conceptos clave**:
- Separation of Concerns
- Encapsulation
- Abstraction
- Loose Coupling
- High Cohesion

**AI Integration**:
```typescript
// Usar OpenCode para generar estructura base
/slash-command: "Generate layered architecture structure"
```

---

### Parte 2: Layered Architecture (30 min)

**Capas estándar**:
1. Presentation Layer (Controllers)
2. Business Logic Layer (Services)
3. Data Access Layer (Repositories)
4. Database Layer

**Ejemplo práctico**: Sistema de usuarios

---

### Parte 3: Microservices vs Monolith (30 min)

**Cuándo usar cada uno**:

| Monolith | Microservices |
|----------|---------------|
| Equipo pequeño (<10) | Equipos grandes (10+) |
| MVP / Startup early-stage | Producto maduro |
| Dominio simple | Dominio complejo |
| Deploy sencillo | Escalabilidad independiente |

---

### Parte 4: API Design (30 min)

**REST vs GraphQL**:
- REST: Múltiples endpoints, estándar HTTP
- GraphQL: Single endpoint, cliente define estructura

**Best practices**:
- Versioning (`/api/v1/...`)
- Error handling
- Rate limiting
- Documentation (Swagger)

---

### Parte 5: Event-Driven Architecture (30 min)

**Conceptos**:
- Event producers
- Event consumers
- Message queues (RabbitMQ, Kafka)
- Asynchronous communication

**Caso de uso**: Sistema de notificaciones

---

## Ejercicio Práctico

### Proyecto: E-Commerce Architecture

**Descripción**: Diseñar la arquitectura completa de un sistema e-commerce escalable.

**Componentes requeridos**:
1. User Service
2. Product Catalog Service
3. Order Service
4. Payment Service
5. Notification Service

**Entregables**:
- Architecture diagram
- API endpoints documentation
- Database schema design
- Event flow diagram

**Tiempo**: 2 horas

**Ver detalles**: [EXERCISE.md](./EXERCISE.md)

---

## Recursos Adicionales

### Lecturas Recomendadas
- [Martin Fowler - Microservices](https://martinfowler.com/articles/microservices.html)
- [Microsoft Architecture Guide](https://learn.microsoft.com/en-us/azure/architecture/)
- [12 Factor App](https://12factor.net/)

### Videos
- [System Design Interview](https://www.youtube.com/c/SystemDesignInterview)
- [Hussein Nasser - Backend Engineering](https://www.youtube.com/c/HusseinNasser-software-engineering)

### Herramientas
- **Diagrams**: draw.io, Lucidchart, Excalidraw
- **API Design**: Swagger, Postman
- **Architecture**: C4 Model, ArchiMate

---

## Evaluación

### Criterios de Calificación

| Criterio | Peso | Descripción |
|----------|------|-------------|
| **Diseño arquitectónico** | 40% | Decisiones correctas, escalabilidad |
| **Documentación** | 30% | Diagramas claros, justificación |
| **Implementación** | 20% | Código funcional con AI |
| **Best Practices** | 10% | Naming, structure, patterns |

### Escala
- **90-100%**: Excelente - Arquitectura profesional
- **75-89%**: Bueno - Arquitectura sólida
- **60-74%**: Suficiente - Funcional pero mejorable
- **<60%**: Insuficiente - Requiere revisión

---

## Cronograma Sugerido

| Tiempo | Actividad |
|--------|-----------|
| 00:00-00:30 | Introducción + Principios |
| 00:30-01:00 | Layered Architecture |
| 01:00-01:30 | Microservices vs Monolith |
| 01:30-02:00 | API Design |
| **02:00-02:15** | **Break** ☕ |
| 02:15-02:45 | Event-Driven Architecture |
| 02:45-04:45 | Ejercicio Práctico |
| 04:45-05:00 | Revisión y Q&A |

**Total**: 4 horas lectivas

---

## Siguientes Pasos

Después de completar este módulo:

1. ✅ Avanzar a **Módulo 02: Design Patterns**
2. ✅ Aplicar arquitectura en tu proyecto capstone
3. ✅ Profundizar con recursos adicionales
4. ✅ Practicar system design interviews

---

## Soporte

- **Slack**: #software-dev-modulo01
- **Office Hours**: Lunes 18:00-19:00
- **Email**: instructor@fpuna.edu.py

---

## Notas del Instructor

**Tips para enseñar este módulo**:
1. Usar ejemplos del contexto paraguayo (e-commerce local, fintech)
2. Enfatizar trade-offs (no hay "arquitectura perfecta")
3. Mostrar ejemplos reales de empresas (MercadoLibre, Rappi)
4. Hands-on con OpenCode desde el primer momento
5. Fomentar discusión de decisiones arquitectónicas

**Errores comunes a anticipar**:
- Over-engineering (usar microservices para todo)
- Under-engineering (monolito sin capas)
- Ignorar escalabilidad futura
- No documentar decisiones

---

*Módulo 01 - Arquitectura de Software - FPUNA 2026*
