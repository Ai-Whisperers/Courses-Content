# Proyecto Integrador: TaskAPI

## Desarrollo Completo con Asistencia de IA

---

## Instrucciones Generales

Este ejercicio es el proyecto final del curso. Desarrollarás una API REST completa utilizando todas las técnicas de IA aprendidas.

**Duración:** 2 horas
**Modalidad:** Individual
**Entregable:** Código + Documentación + Tests

---

## Fase 1: Setup y Modelos (25 min)

### 1.1 Crear Estructura del Proyecto

Crea la estructura de directorios:

```bash
mkdir -p taskapi/{app/{routes,services,utils},tests,docs}
cd taskapi
```

### 1.2 Archivo requirements.txt

```
flask==3.0.0
flask-sqlalchemy==3.1.1
pytest==7.4.3
pytest-flask==1.3.0
werkzeug==3.0.1
```

### 1.3 Generar Modelos

**Usa IA para generar los modelos. Prompt:**

```
Genera modelos SQLAlchemy para una API de tareas:

Usuario:
- id: int (PK, autoincrement)
- username: str (único, max 50 chars)
- email: str (único, válido)
- password_hash: str
- created_at: datetime (default now)
- is_active: bool (default True)

Tarea:
- id: int (PK, autoincrement)
- title: str (requerido, max 200 chars)
- description: text (opcional)
- status: enum (pending, in_progress, completed)
- priority: enum (low, medium, high)
- due_date: datetime (opcional)
- created_at: datetime (default now)
- updated_at: datetime (auto-update)
- user_id: int (FK a User)

Incluye:
- Relación User.tasks (one-to-many)
- Método to_dict() para serialización JSON
- Validaciones básicas
- Docstrings estilo Google

Framework: Flask-SQLAlchemy
Python: 3.8+
```

### 1.4 Documentar tu Trabajo

```markdown
## Modelos Generados

### Prompt utilizado:
[pegar prompt]

### Código generado:
```python
[pegar código]
```

### Ajustes realizados:
- [lista de cambios que hiciste]
```

---

## Fase 2: Servicios (30 min)

### 2.1 UserService

**Prompt para UserService:**

```
Implementa una clase UserService en Python para gestión de usuarios.

Métodos:
1. create_user(username, email, password) -> User
   - Hashea password con werkzeug.security
   - Valida email y username únicos
   - Lanza ValueError si ya existe

2. get_user(user_id) -> User | None
   - Retorna usuario o None si no existe

3. get_user_by_email(email) -> User | None
   - Búsqueda por email

4. update_user(user_id, data: dict) -> User
   - Actualiza campos permitidos (username, email)
   - Lanza ValueError si nuevo email ya existe
   - Lanza LookupError si usuario no existe

5. delete_user(user_id) -> bool
   - Soft delete (is_active = False)
   - Retorna True si se eliminó

6. authenticate(email, password) -> User | None
   - Verifica credenciales
   - Retorna usuario si es válido, None si no

Requisitos:
- Type hints completos
- Docstrings estilo Google
- Manejo de excepciones apropiado
- Usar Flask-SQLAlchemy db.session
```

### 2.2 TaskService

**Prompt para TaskService:**

```
Implementa una clase TaskService en Python para gestión de tareas.

Métodos:
1. create_task(user_id, title, description=None, priority="medium", due_date=None) -> Task
   - Valida que usuario exista
   - Status inicial: "pending"

2. get_task(task_id) -> Task | None

3. get_user_tasks(user_id, status=None, priority=None, page=1, per_page=10) -> dict
   - Filtros opcionales
   - Retorna: {"tasks": [...], "total": int, "page": int, "pages": int}

4. update_task(task_id, data: dict) -> Task
   - Actualiza: title, description, priority, due_date
   - Auto-update updated_at

5. delete_task(task_id) -> bool
   - Eliminación física

6. change_status(task_id, new_status) -> Task
   - Valida transiciones válidas:
     pending -> in_progress
     in_progress -> completed | pending
     completed -> in_progress
   - Lanza ValueError si transición inválida

Requisitos:
- Type hints
- Docstrings Google
- Manejo de errores
```

### 2.3 Verificar Servicios

Escribe código de prueba rápido:

```python
# test_manual.py
from app import create_app, db
from app.services.user_service import UserService
from app.services.task_service import TaskService

app = create_app()
with app.app_context():
    db.create_all()

    # Probar UserService
    user_svc = UserService()
    user = user_svc.create_user("test", "test@example.com", "password123")
    print(f"Usuario creado: {user.to_dict()}")

    # Probar TaskService
    task_svc = TaskService()
    task = task_svc.create_task(user.id, "Mi primera tarea")
    print(f"Tarea creada: {task.to_dict()}")
```

---

## Fase 3: Endpoints (25 min)

### 3.1 Blueprint de Usuarios

**Prompt:**

```
Genera un Blueprint Flask para gestión de usuarios.

Endpoints:
POST   /api/users        - Crear usuario
GET    /api/users/<id>   - Obtener usuario
PUT    /api/users/<id>   - Actualizar usuario
DELETE /api/users/<id>   - Eliminar usuario (soft delete)
POST   /api/auth/login   - Login (retorna token simple)

Request/Response:
- JSON para todos
- Errores con formato {"error": "mensaje", "code": "ERROR_CODE"}
- Códigos HTTP apropiados

Incluye:
- Validación de campos requeridos
- Manejo de excepciones
- Decorador @require_auth para endpoints protegidos
- Docstrings
```

### 3.2 Blueprint de Tareas

**Prompt:**

```
Genera un Blueprint Flask para gestión de tareas.

Endpoints:
GET    /api/tasks           - Listar tareas del usuario
POST   /api/tasks           - Crear tarea
GET    /api/tasks/<id>      - Obtener tarea
PUT    /api/tasks/<id>      - Actualizar tarea
DELETE /api/tasks/<id>      - Eliminar tarea
PATCH  /api/tasks/<id>/status - Cambiar estado

Query params para GET /api/tasks:
- status: filtrar por estado
- priority: filtrar por prioridad
- page: número de página
- per_page: items por página

Todos los endpoints requieren autenticación.
Solo el dueño puede ver/modificar sus tareas.
```

### 3.3 Probar con curl

```bash
# Crear usuario
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username": "juan", "email": "juan@test.com", "password": "secret123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "juan@test.com", "password": "secret123"}'

# Crear tarea (usar token del login)
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title": "Mi tarea", "priority": "high"}'

# Listar tareas
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN"
```

---

## Fase 4: Testing (20 min)

### 4.1 Configurar pytest

**conftest.py:**

```python
import pytest
from app import create_app, db

@pytest.fixture
def app():
    app = create_app('testing')
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def auth_headers(client):
    # Crear usuario y obtener token
    client.post('/api/users', json={
        'username': 'testuser',
        'email': 'test@test.com',
        'password': 'password123'
    })
    response = client.post('/api/auth/login', json={
        'email': 'test@test.com',
        'password': 'password123'
    })
    token = response.json['token']
    return {'Authorization': f'Bearer {token}'}
```

### 4.2 Generar Tests

**Prompt:**

```
Genera tests pytest para esta API Flask de tareas.

Endpoints a testear:
- POST /api/users
- POST /api/auth/login
- GET/POST/PUT/DELETE /api/tasks

Para cada endpoint incluye tests de:
1. Caso exitoso
2. Datos inválidos (400)
3. No autorizado (401) - para endpoints protegidos
4. Recurso no encontrado (404)

Usa fixtures: client, auth_headers
Patrón AAA
Nombres descriptivos: test_create_task_success, test_create_task_missing_title
```

### 4.3 Ejecutar Tests

```bash
# Ejecutar todos
pytest -v

# Con coverage
pytest --cov=app --cov-report=html

# Solo tests de tareas
pytest tests/test_tasks.py -v
```

---

## Fase 5: Documentación (20 min)

### 5.1 README.md

**Prompt:**

```
Genera un README.md profesional para este proyecto TaskAPI.

Información:
- API REST para gestión de tareas
- Python + Flask + SQLAlchemy
- Autenticación con tokens
- Tests con pytest

Incluir:
- Badges (Python, License, Tests)
- Descripción clara
- Quick Start (3 comandos)
- Instalación detallada
- Configuración
- Endpoints con ejemplos
- Testing
- Estructura del proyecto
- Licencia MIT
```

### 5.2 OpenAPI Spec

**Prompt:**

```
Genera especificación OpenAPI 3.0 para TaskAPI.

Endpoints:
[listar todos los endpoints]

Schemas:
- User (id, username, email, created_at, is_active)
- UserCreate (username, email, password)
- Task (id, title, description, status, priority, due_date, created_at, updated_at)
- TaskCreate (title, description?, priority?, due_date?)
- Error (error, code)
- PaginatedTasks (tasks, total, page, pages)

Incluir:
- Bearer token security
- Ejemplos de request/response
- Todos los códigos de error
```

### 5.3 Verificar Documentación

Checklist:
- [ ] README explica cómo instalar
- [ ] README tiene ejemplos de uso
- [ ] OpenAPI describe todos los endpoints
- [ ] Docstrings en todas las funciones públicas

---

## Entrega Final

### Estructura Esperada

```
taskapi/
├── app/
│   ├── __init__.py          # Factory app
│   ├── models.py             # User, Task
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── users.py          # Blueprint usuarios
│   │   └── tasks.py          # Blueprint tareas
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
│   ├── conftest.py
│   ├── test_users.py
│   └── test_tasks.py
├── docs/
│   ├── api.md
│   └── openapi.yaml
├── requirements.txt
├── README.md
└── run.py
```

### Checklist Final

**Funcionalidad:**
- [ ] CRUD de usuarios funciona
- [ ] CRUD de tareas funciona
- [ ] Autenticación implementada
- [ ] Filtros de tareas funcionan
- [ ] Cambio de estado con validación

**Calidad:**
- [ ] Tests pasan (pytest)
- [ ] Código documentado
- [ ] Manejo de errores consistente
- [ ] Sin credenciales hardcodeadas

**Documentación:**
- [ ] README completo
- [ ] OpenAPI válido
- [ ] Ejemplos de uso

---

## Evaluación

| Componente | Puntos |
|------------|--------|
| Modelos correctos | 15 |
| Servicios completos | 20 |
| Endpoints funcionando | 20 |
| Tests pasando | 20 |
| Documentación | 15 |
| Código limpio | 10 |
| **Total** | **100** |

---

## Registro de Prompts

Documenta los prompts más efectivos que usaste:

### Prompt 1: [Nombre]
```
[Prompt usado]
```
**Resultado:** [Descripción de lo que generó]
**Ajustes:** [Cambios que hiciste]

### Prompt 2: [Nombre]
```
[Prompt usado]
```
**Resultado:** [Descripción]
**Ajustes:** [Cambios]

---

*¡Éxito en tu proyecto! Recuerda: la IA es una herramienta, tú eres el desarrollador.*
