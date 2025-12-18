# Módulo 08: Proyecto Integrador
## Duración: 2 horas

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:
- Aplicar todas las técnicas de IA aprendidas en un proyecto real
- Desarrollar un flujo de trabajo completo con asistencia de IA
- Demostrar competencia en generación, testing y documentación de código
- Entregar un proyecto funcional y bien documentado

---

## 1. Descripción del Proyecto

### 1.1 TaskAPI - Sistema de Gestión de Tareas

Desarrollarás una API REST completa para gestión de tareas utilizando todas las herramientas de IA del curso.

**Funcionalidades principales:**
- CRUD de usuarios
- CRUD de tareas
- Asignación de tareas a usuarios
- Filtrado y búsqueda
- Autenticación básica
- Documentación completa

### 1.2 Stack Tecnológico

```
Backend: Python + Flask
Base de datos: SQLite
Testing: pytest
Documentación: OpenAPI + docstrings
```

---

## 2. Estructura del Proyecto

```
taskapi/
├── app/
│   ├── __init__.py
│   ├── models.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── users.py
│   │   └── tasks.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── user_service.py
│   │   └── task_service.py
│   └── utils/
│       ├── __init__.py
│       ├── validators.py
│       └── auth.py
├── tests/
│   ├── __init__.py
│   ├── test_users.py
│   ├── test_tasks.py
│   └── conftest.py
├── docs/
│   ├── api.md
│   └── openapi.yaml
├── requirements.txt
├── README.md
└── run.py
```

---

## 3. Fases del Desarrollo

### Fase 1: Diseño y Modelos (25 min)

**Objetivo:** Diseñar los modelos de datos con ayuda de IA.

**Modelos requeridos:**

```python
# Usuario
- id: int (PK)
- username: str (único)
- email: str (único)
- password_hash: str
- created_at: datetime
- is_active: bool

# Tarea
- id: int (PK)
- title: str
- description: str (opcional)
- status: enum (pending, in_progress, completed)
- priority: enum (low, medium, high)
- due_date: datetime (opcional)
- created_at: datetime
- updated_at: datetime
- user_id: int (FK a Usuario)
```

**Prompt sugerido:**
```
Genera modelos SQLAlchemy para una API de tareas con estas entidades:

[especificaciones de arriba]

Incluye:
- Relaciones entre modelos
- Métodos to_dict() para serialización
- Validación básica
- Docstrings
```

### Fase 2: Servicios y Lógica (30 min)

**Objetivo:** Implementar la lógica de negocio.

**Funcionalidades de UserService:**
- create_user(username, email, password)
- get_user(user_id)
- get_user_by_email(email)
- update_user(user_id, data)
- delete_user(user_id)
- authenticate(email, password)

**Funcionalidades de TaskService:**
- create_task(user_id, title, description, priority, due_date)
- get_task(task_id)
- get_user_tasks(user_id, filters)
- update_task(task_id, data)
- delete_task(task_id)
- change_status(task_id, new_status)

**Prompt sugerido:**
```
Implementa un servicio TaskService en Python con estas funcionalidades:

[lista de funciones]

Requisitos:
- Manejo de errores con excepciones custom
- Validación de datos
- Docstrings estilo Google
- Type hints completos
```

### Fase 3: Endpoints REST (25 min)

**Objetivo:** Crear los endpoints de la API.

**Endpoints de Usuarios:**
```
POST   /api/users           - Crear usuario
GET    /api/users/:id       - Obtener usuario
PUT    /api/users/:id       - Actualizar usuario
DELETE /api/users/:id       - Eliminar usuario
POST   /api/auth/login      - Login
```

**Endpoints de Tareas:**
```
GET    /api/tasks           - Listar tareas (con filtros)
POST   /api/tasks           - Crear tarea
GET    /api/tasks/:id       - Obtener tarea
PUT    /api/tasks/:id       - Actualizar tarea
DELETE /api/tasks/:id       - Eliminar tarea
PATCH  /api/tasks/:id/status - Cambiar estado
```

**Prompt sugerido:**
```
Genera endpoints Flask para gestión de tareas.

Endpoints: [lista]

Incluye:
- Validación de entrada
- Manejo de errores consistente
- Respuestas JSON estandarizadas
- Autenticación con decorador @require_auth
- Códigos HTTP apropiados
```

### Fase 4: Testing (20 min)

**Objetivo:** Escribir tests completos con pytest.

**Tests requeridos:**

1. **Tests de Usuarios:**
   - Crear usuario válido
   - Crear usuario con email duplicado (error)
   - Obtener usuario existente
   - Obtener usuario inexistente (404)
   - Actualizar usuario
   - Eliminar usuario

2. **Tests de Tareas:**
   - Crear tarea válida
   - Crear tarea sin título (error)
   - Listar tareas con filtros
   - Cambiar estado de tarea
   - Eliminar tarea

**Prompt sugerido:**
```
Genera tests pytest para estos endpoints de API Flask:

[código de endpoints]

Incluye:
- Fixtures para app de test y cliente
- Tests para casos exitosos
- Tests para errores de validación
- Tests para recursos no encontrados
- Tests de autenticación
- Mocks donde sea necesario

Usa el patrón AAA y nombres descriptivos.
```

### Fase 5: Documentación (20 min)

**Objetivo:** Documentar completamente el proyecto.

**Documentación requerida:**

1. **README.md completo:**
   - Descripción del proyecto
   - Instalación
   - Configuración
   - Uso con ejemplos
   - Endpoints disponibles
   - Contribución

2. **OpenAPI/Swagger:**
   - Especificación completa
   - Schemas de modelos
   - Ejemplos de request/response

3. **Docstrings:**
   - Todas las funciones documentadas
   - Clases con descripción
   - Módulos con docstring de archivo

**Prompt sugerido:**
```
Genera documentación OpenAPI 3.0 para esta API Flask de gestión de tareas.

Endpoints: [lista]
Modelos: [User, Task]

Incluye:
- Info completa
- Tags para agrupar endpoints
- Schemas con ejemplos
- Security scheme para Bearer token
- Todas las respuestas posibles
```

---

## 4. Criterios de Evaluación

### 4.1 Rúbrica Detallada

| Componente | Criterio | Puntos |
|------------|----------|--------|
| **Modelos** | Diseño correcto y completo | 10 |
| | Relaciones implementadas | 5 |
| **Servicios** | Lógica de negocio correcta | 15 |
| | Manejo de errores | 5 |
| **Endpoints** | CRUD completo funcionando | 15 |
| | Validación de entrada | 5 |
| | Respuestas consistentes | 5 |
| **Testing** | Cobertura de casos principales | 15 |
| | Tests de errores | 5 |
| **Documentación** | README profesional | 5 |
| | OpenAPI completo | 10 |
| | Docstrings | 5 |
| **Total** | | **100** |

### 4.2 Niveles de Logro

| Puntuación | Nivel | Descripción |
|------------|-------|-------------|
| 90-100 | Excelente | Proyecto completo, bien documentado, tests exhaustivos |
| 80-89 | Muy Bueno | Funcionalidad completa, documentación adecuada |
| 70-79 | Bueno | Mayoría de funcionalidades, documentación básica |
| 60-69 | Aceptable | Funcionalidades core implementadas |
| < 60 | Insuficiente | Proyecto incompleto o con errores significativos |

---

## 5. Consejos para el Desarrollo

### 5.1 Uso Efectivo de IA

```
1. Planifica antes de pedir código
2. Da contexto completo en cada prompt
3. Revisa y entiende el código generado
4. Itera para mejorar las respuestas
5. Combina múltiples herramientas (Copilot + ChatGPT)
```

### 5.2 Flujo de Trabajo Recomendado

```
1. Diseñar → Pedir a IA que revise diseño
2. Generar código → Revisar y ajustar
3. Escribir tests → Ejecutar y corregir
4. Documentar → Verificar precisión
5. Refactorizar → Pedir mejoras a IA
```

### 5.3 Errores Comunes a Evitar

❌ Copiar código sin entenderlo
❌ No ejecutar tests antes de entregar
❌ Documentación desactualizada
❌ Manejo de errores inconsistente
❌ Hardcodear valores (usar config)

---

## 6. Recursos de Apoyo

### 6.1 Templates

- [Template de Servicio](../templates/service_template.py)
- [Template de Endpoint](../templates/endpoint_template.py)
- [Template de Test](../templates/test_template.py)

### 6.2 Prompts Útiles

Ver biblioteca de prompts en:
- [prompts/generacion-codigo.md](../../prompts/generacion-codigo.md)
- [prompts/testing.md](../../prompts/testing.md)
- [prompts/documentacion.md](../../prompts/documentacion.md)

### 6.3 Referencias

- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)
- [pytest Documentation](https://docs.pytest.org/)
- [OpenAPI Specification](https://swagger.io/specification/)

---

## 7. Entrega

### 7.1 Formato de Entrega

```
proyecto-apellido/
├── código fuente/
├── tests/
├── documentación/
├── README.md
└── requirements.txt
```

### 7.2 Checklist Pre-Entrega

- [ ] Todos los endpoints funcionan
- [ ] Tests pasan (pytest ejecutado)
- [ ] README completo
- [ ] OpenAPI generado
- [ ] Código documentado
- [ ] requirements.txt actualizado
- [ ] No hay credenciales hardcodeadas

---

## 8. Extensiones Opcionales

Para estudiantes que terminen antes o quieran desafíos adicionales:

1. **Paginación:** Implementar paginación en listados
2. **Búsqueda:** Búsqueda full-text en tareas
3. **Tags:** Sistema de etiquetas para tareas
4. **Notificaciones:** Recordatorios de tareas por vencer
5. **Export:** Exportar tareas a CSV/JSON
6. **Estadísticas:** Dashboard con métricas

---

*Este proyecto integra todos los conceptos del curso: generación de código, debugging, testing y documentación con IA.*
