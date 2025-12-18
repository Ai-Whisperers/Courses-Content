# Ejercicio: Generación de Código con LLMs
## Proyecto Práctico

---

## Objetivo

Crear un módulo completo de gestión de tareas utilizando IA para la generación de código, aplicando las técnicas aprendidas.

---

## Parte 1: Generación de Modelos (25 min)

### 1.1 Crear Modelos de Datos

Usa este prompt en Claude o ChatGPT:

```markdown
Crea modelos de datos en Python para un sistema de gestión de tareas:

Modelos requeridos:

1. Priority (Enum)
   - LOW, MEDIUM, HIGH, URGENT

2. Status (Enum)
   - TODO, IN_PROGRESS, DONE, CANCELLED

3. Task
   - id: UUID (auto-generado)
   - title: str (1-100 chars)
   - description: str (opcional, max 500 chars)
   - priority: Priority (default MEDIUM)
   - status: Status (default TODO)
   - due_date: datetime (opcional)
   - created_at: datetime (auto)
   - updated_at: datetime (auto)
   - tags: List[str] (default vacío)

4. TaskList
   - id: UUID
   - name: str
   - tasks: List[Task]

Requisitos:
- Usar dataclasses con @dataclass
- Validar en __post_init__
- Métodos to_dict() y from_dict()
- Docstrings en español
- Type hints completos
```

### 1.2 Verificar el Código

Copia el código generado y verifica:

```python
# Test de modelos
from models import Task, TaskList, Priority, Status

# Crear tarea
task = Task(title="Mi primera tarea")
print(task)
print(task.to_dict())

# Verificar validaciones
try:
    bad_task = Task(title="")  # Debe fallar
except ValueError as e:
    print(f"Validación correcta: {e}")

# Crear lista
task_list = TaskList(name="Mi lista", tasks=[task])
print(task_list.to_dict())
```

### 1.3 Documentar Resultados

| Aspecto | ¿Correcto? | Notas |
|---------|------------|-------|
| UUIDs se generan | | |
| Validaciones funcionan | | |
| to_dict() completo | | |
| from_dict() funciona | | |

---

## Parte 2: Generación de Servicios (30 min)

### 2.1 Crear Servicio de Tareas

```markdown
Crea una clase TaskService en Python que gestione tareas:

Dependencias (en constructor):
- tasks: Dict[UUID, Task] (almacenamiento en memoria)

Métodos:

1. create_task(title, description=None, priority=Priority.MEDIUM,
               due_date=None, tags=None) -> Task
   - Crea y almacena nueva tarea
   - Retorna la tarea creada

2. get_task(task_id: UUID) -> Optional[Task]
   - Retorna tarea o None

3. update_task(task_id: UUID, **kwargs) -> Task
   - Actualiza campos especificados
   - Actualiza updated_at
   - Lanza TaskNotFoundError si no existe

4. delete_task(task_id: UUID) -> bool
   - Elimina tarea
   - Retorna True si existía

5. change_status(task_id: UUID, new_status: Status) -> Task
   - Cambia estado de la tarea
   - Valida transiciones (no puede ir de DONE a TODO)

6. list_tasks(status: Status = None, priority: Priority = None,
              tags: List[str] = None) -> List[Task]
   - Filtra tareas por criterios
   - Retorna lista ordenada por due_date

7. get_overdue_tasks() -> List[Task]
   - Retorna tareas vencidas no completadas

Incluye:
- Clase de excepción TaskNotFoundError
- Clase de excepción InvalidStatusTransitionError
- Logging de operaciones
- Docstrings completos
```

### 2.2 Verificar Servicio

```python
# Tests del servicio
from task_service import TaskService
from models import Priority, Status

service = TaskService()

# Crear tareas
task1 = service.create_task("Tarea 1", priority=Priority.HIGH)
task2 = service.create_task("Tarea 2", tags=["trabajo"])

# Verificar listado
all_tasks = service.list_tasks()
assert len(all_tasks) == 2

# Cambiar estado
service.change_status(task1.id, Status.IN_PROGRESS)
assert service.get_task(task1.id).status == Status.IN_PROGRESS

# Filtrar
high_priority = service.list_tasks(priority=Priority.HIGH)
assert len(high_priority) == 1

print("✓ Todos los tests pasaron!")
```

---

## Parte 3: Refactoring (20 min)

### 3.1 Código a Refactorizar

Pide a la IA que refactorice este código:

```python
def process_tasks(tasks):
    result = []
    for t in tasks:
        if t['status'] == 'TODO':
            if t['priority'] == 'HIGH' or t['priority'] == 'URGENT':
                t['urgent'] = True
                result.append(t)
            elif t['priority'] == 'MEDIUM':
                if t.get('due_date'):
                    from datetime import datetime
                    dd = datetime.fromisoformat(t['due_date'])
                    if dd < datetime.now():
                        t['urgent'] = True
                        result.append(t)
                    else:
                        t['urgent'] = False
                        result.append(t)
                else:
                    t['urgent'] = False
                    result.append(t)
            else:
                t['urgent'] = False
                result.append(t)
    return result
```

**Prompt:**
```markdown
Refactoriza el siguiente código aplicando:
1. Eliminar anidación excesiva con early returns
2. Extraer lógica de urgencia a función separada
3. Usar los modelos Task y enums creados anteriormente
4. Usar list comprehension donde sea posible
5. Agregar type hints y docstring

```python
[pegar código]
```

Explica cada cambio realizado.
```

### 3.2 Comparar Versiones

| Métrica | Antes | Después |
|---------|-------|---------|
| Líneas de código | | |
| Nivel máximo de anidación | | |
| Número de funciones | | |
| ¿Type hints? | | |
| ¿Legible? | | |

---

## Parte 4: Conversión de Lenguaje (25 min)

### 4.1 Convertir a TypeScript

```markdown
Convierte el TaskService de Python a TypeScript:

Requisitos:
- Interfaces para Task, TaskList
- Enums para Priority, Status
- Clase TaskService con los mismos métodos
- Usar Map<string, Task> para almacenamiento
- Manejo de errores con clases de Error custom
- Tipos estrictos (no usar any)
- Documentación con JSDoc
```

### 4.2 Verificar Conversión

Crea un archivo `task-service.ts` y verifica:

```typescript
// Verificar tipos
const service = new TaskService();

const task = service.createTask("Mi tarea", {
  priority: Priority.HIGH,
  tags: ["importante"]
});

console.log(task.id); // Debe tener tipo string
console.log(task.status); // Debe tener tipo Status

// Verificar filtros
const highPriority = service.listTasks({ priority: Priority.HIGH });
console.log(highPriority);
```

### 4.3 Documentar Diferencias

| Aspecto | Python | TypeScript |
|---------|--------|------------|
| Tipos | Type hints | Native types |
| Enums | class Enum | enum |
| Almacenamiento | Dict | Map |
| Null handling | Optional | \| undefined |
| Errores | raise Exception | throw Error |

---

## Parte 5: Proyecto Completo (20 min)

### 5.1 Integrar Todo

Crea un archivo `main.py` que:
1. Use los modelos generados
2. Cree instancia de TaskService
3. Simule uso del sistema

```python
from models import Task, Priority, Status
from task_service import TaskService
from datetime import datetime, timedelta

def main():
    # Inicializar servicio
    service = TaskService()

    # Crear tareas de ejemplo
    task1 = service.create_task(
        "Revisar código del proyecto",
        priority=Priority.HIGH,
        tags=["trabajo", "código"]
    )

    task2 = service.create_task(
        "Preparar presentación",
        priority=Priority.MEDIUM,
        due_date=datetime.now() + timedelta(days=2)
    )

    task3 = service.create_task(
        "Comprar suministros",
        priority=Priority.LOW,
        tags=["personal"]
    )

    # Mostrar todas las tareas
    print("=== Todas las tareas ===")
    for task in service.list_tasks():
        print(f"- {task.title} [{task.priority.name}] - {task.status.name}")

    # Cambiar estado
    service.change_status(task1.id, Status.IN_PROGRESS)

    # Filtrar por prioridad
    print("\n=== Tareas de alta prioridad ===")
    for task in service.list_tasks(priority=Priority.HIGH):
        print(f"- {task.title}")

    # Filtrar por tags
    print("\n=== Tareas de trabajo ===")
    for task in service.list_tasks(tags=["trabajo"]):
        print(f"- {task.title}")

if __name__ == "__main__":
    main()
```

### 5.2 Generar Tests

```markdown
Genera tests con pytest para TaskService:

Cobertura requerida:
1. test_create_task_basic
2. test_create_task_with_all_params
3. test_get_task_exists
4. test_get_task_not_exists
5. test_update_task
6. test_delete_task
7. test_change_status_valid
8. test_change_status_invalid_transition
9. test_list_tasks_filter_by_priority
10. test_list_tasks_filter_by_status
11. test_list_tasks_filter_by_tags
12. test_get_overdue_tasks

Usa fixtures para datos de prueba.
Incluye parametrize donde sea útil.
```

---

## Entregable

Repositorio con estructura:

```
task-manager/
├── models.py
├── task_service.py
├── exceptions.py
├── main.py
├── tests/
│   └── test_task_service.py
├── typescript/
│   ├── models.ts
│   └── task-service.ts
└── REFLECTION.md
```

### REFLECTION.md debe incluir:

1. **Proceso de generación**
   - ¿Cuántas iteraciones necesitaste?
   - ¿Qué prompts funcionaron mejor?

2. **Calidad del código generado**
   - ¿Qué tuviste que corregir?
   - ¿Qué mejoras hiciste?

3. **Refactoring**
   - Antes y después del código
   - Métricas de mejora

4. **Conversión**
   - Diferencias principales Python vs TypeScript
   - Desafíos encontrados

---

## Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Modelos correctos y validados | 20 |
| Servicio funcional completo | 25 |
| Refactoring bien documentado | 15 |
| Conversión a TypeScript | 20 |
| Tests con buena cobertura | 15 |
| Reflexión y documentación | 5 |
| **Total** | **100** |

---

*Tiempo total estimado: 2.5 horas*
