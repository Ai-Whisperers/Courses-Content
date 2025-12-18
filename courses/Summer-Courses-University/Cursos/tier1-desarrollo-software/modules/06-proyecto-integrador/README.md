# Módulo 06: Proyecto Integrador
## Tier 1 - Desarrollo de Software

---

## Descripción

Proyecto final que integra todas las técnicas aprendidas: asistentes de código, backend, frontend, testing, y DevOps. Desarrollarás una aplicación fullstack completa usando IA como asistente principal.

**Duración:** 3 horas
**Tipo:** Proyecto individual

---

## Objetivos

1. **Aplicar** todas las técnicas de IA de los módulos anteriores
2. **Desarrollar** aplicación fullstack funcional
3. **Documentar** el proceso y prompts utilizados
4. **Presentar** el proyecto con demo

---

## Opciones de Proyecto

Elige UNA opción:

### Opción A: Sistema de Gestión de Inventario
- CRUD de productos con categorías
- Control de stock con alertas
- Dashboard con estadísticas
- Reportes básicos

### Opción B: Plataforma de Tareas Colaborativa
- Usuarios y equipos
- Tablero Kanban
- Comentarios en tareas
- Notificaciones

### Opción C: Proyecto Propio
- Consultar con instructor
- Debe tener complejidad similar
- CRUD + lógica de negocio + dashboard

---

## Estructura del Proyecto

```
proyecto-final/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── middleware/
│   ├── prisma/
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── lib/
│   ├── tests/
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml
│
├── docker-compose.yml
├── README.md
└── docs/
    ├── prompts.md        # Todos los prompts usados
    └── decisions.md      # Decisiones técnicas
```

---

## Fases de Desarrollo

### Fase 1: Planificación (30 min)
- Definir alcance y funcionalidades
- Diseñar arquitectura con IA
- Crear estructura de carpetas
- Definir esquema de BD

### Fase 2: Backend (45 min)
- Implementar modelos y migraciones
- Crear endpoints CRUD
- Agregar autenticación (opcional)
- Documentar API

### Fase 3: Frontend (45 min)
- Crear componentes base
- Implementar páginas principales
- Conectar con API
- Agregar validación de formularios

### Fase 4: Testing (30 min)
- Tests unitarios críticos
- Tests de integración para API
- Verificar cobertura >60%

### Fase 5: DevOps (20 min)
- Crear Dockerfile
- Configurar docker-compose
- Pipeline CI básico

### Fase 6: Documentación (10 min)
- README completo
- Documentar prompts usados
- Notas de decisiones técnicas

---

## Requisitos Mínimos

### Backend
- [ ] 3+ endpoints CRUD funcionales
- [ ] Validación de datos
- [ ] Manejo de errores
- [ ] Al menos 5 tests

### Frontend
- [ ] 3+ páginas/vistas
- [ ] Formularios con validación
- [ ] Conexión con API
- [ ] Responsive design

### DevOps
- [ ] Dockerfile funcional
- [ ] docker-compose para desarrollo
- [ ] Pipeline CI que corre tests

### Documentación
- [ ] README con instrucciones
- [ ] Prompts documentados
- [ ] Decisiones técnicas explicadas

---

## Rúbrica de Evaluación

| Criterio | Excelente (90-100) | Bueno (70-89) | Regular (50-69) |
|----------|-------------------|---------------|-----------------|
| **Funcionalidad (30%)** | Completa, sin bugs | Mayormente funcional | Funciona parcialmente |
| **Código (25%)** | Limpio, documentado, tipado | Legible, algunos tipos | Funciona pero desordenado |
| **Testing (15%)** | >80% cobertura, bien organizados | 60-80%, tests básicos | <60%, pocos tests |
| **DevOps (15%)** | Pipeline completo, deploy funciona | Pipeline básico | Solo Dockerfile |
| **Documentación (15%)** | README completo, prompts documentados | README básico | Documentación mínima |

---

## Entrega

### Formato
1. Repositorio GitHub público o compartido
2. README con instrucciones de setup
3. Demo grabada (2-3 minutos) o presentación en vivo

### Contenido del README

```markdown
# [Nombre del Proyecto]

## Descripción
[2-3 oraciones describiendo el proyecto]

## Stack Tecnológico
- Backend: ...
- Frontend: ...
- Base de datos: ...

## Setup Local

### Requisitos
- Node.js 20+
- Docker

### Instalación
```bash
# Clonar repositorio
git clone ...

# Iniciar con Docker
docker-compose up

# O manualmente
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
```

## Uso de IA
[Describir cómo usaste IA en el desarrollo]

## Prompts Destacados
[Incluir 2-3 prompts que fueron especialmente útiles]
```

---

## Presentación (10 min)

1. **Introducción** (1 min)
   - ¿Qué problema resuelve?
   - Stack elegido

2. **Demo** (4 min)
   - Mostrar funcionalidades principales
   - Flujo de usuario típico

3. **Técnicas de IA** (3 min)
   - Qué herramientas usaste
   - Prompts más efectivos
   - Desafíos y soluciones

4. **Aprendizajes** (2 min)
   - ¿Qué funcionó bien?
   - ¿Qué harías diferente?

---

## Consejos

1. **No sobrecomplicar** - Funcionalidad básica que funciona > muchas features rotas
2. **Commit frecuente** - Commits pequeños y descriptivos
3. **Documentar mientras desarrollas** - Es más fácil que al final
4. **Probar en Docker** - Antes de presentar, verificar que funciona desde cero
5. **Guardar prompts útiles** - Son parte del entregable

---

*Módulo 06 - Proyecto Integrador*
*Tier 1 - Desarrollo de Software*
