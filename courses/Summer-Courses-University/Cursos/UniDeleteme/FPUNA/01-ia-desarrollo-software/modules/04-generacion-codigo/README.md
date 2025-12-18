# Módulo 04: Generación de Código con LLMs
## Duración: 2.5 horas

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:
- Generar código funcional para tareas comunes
- Aplicar técnicas de refactoring asistido por IA
- Convertir código entre lenguajes de programación
- Evaluar y mejorar código generado por IA

---

## 1. Flujo de Trabajo con IA

### 1.1 El Ciclo de Generación

```
1. Definir requerimiento
   ↓
2. Crear prompt inicial
   ↓
3. Generar código con IA
   ↓
4. Revisar y evaluar
   ↓
5. Refinar si necesario
   ↓
6. Integrar al proyecto
   ↓
7. Probar y validar
```

### 1.2 Cuándo Usar IA para Generar Código

**Casos ideales:**
- Boilerplate y código repetitivo
- CRUD operations
- Clases de modelo/datos
- Utilidades comunes
- Tests unitarios
- Scripts de automatización

**Con precaución:**
- Lógica de negocio compleja
- Algoritmos críticos
- Código de seguridad

---

## 2. Generación de Funciones

### 2.1 Funciones Utilitarias

**Prompt efectivo:**
```markdown
Crea funciones utilitarias en Python para manejo de strings:

1. slugify(text) - Convierte "Hola Mundo!" a "hola-mundo"
2. truncate(text, length) - Corta texto con "..." si excede
3. remove_accents(text) - Quita acentos de vocales
4. extract_numbers(text) - Extrae todos los números de un string

Requisitos:
- Type hints completos
- Docstrings en español
- Manejo de edge cases (None, string vacío)
- Sin dependencias externas
```

**Resultado esperado:**
```python
def slugify(text: str | None) -> str:
    """
    Convierte texto a formato slug (URL-friendly).

    Args:
        text: Texto a convertir

    Returns:
        String en formato slug

    Example:
        >>> slugify("Hola Mundo!")
        'hola-mundo'
    """
    if not text:
        return ""
    # Implementación...
```

### 2.2 Funciones de Validación

**Prompt:**
```markdown
Crea un módulo de validaciones en JavaScript/TypeScript:

Funciones:
- isValidEmail(email) - Valida formato de email
- isValidPhone(phone, country='PY') - Valida teléfono paraguayo
- isValidRUC(ruc) - Valida RUC paraguayo (formato XX-XXXXXX-X)
- isValidCI(ci) - Valida cédula paraguaya

Cada función debe:
- Retornar boolean
- Manejar inputs null/undefined
- Ser case-insensitive donde aplique
- Incluir JSDoc con ejemplos
```

### 2.3 Funciones de Procesamiento

**Prompt para data processing:**
```markdown
Crea funciones para procesar datos de ventas en Python:

Datos de entrada:
```json
{
  "ventas": [
    {"producto": "A", "cantidad": 10, "precio": 1000, "fecha": "2024-01-15"},
    {"producto": "B", "cantidad": 5, "precio": 2000, "fecha": "2024-01-16"}
  ]
}
```

Funciones:
1. calcular_total(ventas) - Suma total de todas las ventas
2. agrupar_por_producto(ventas) - Agrupa y suma por producto
3. ventas_por_periodo(ventas, inicio, fin) - Filtra por rango de fechas
4. producto_mas_vendido(ventas) - Retorna el producto con más cantidad

Usa typing y dataclasses donde sea apropiado.
```

---

## 3. Generación de Clases

### 3.1 Modelos de Datos

**Prompt para dataclass:**
```markdown
Crea modelos de datos para un sistema de e-commerce en Python:

Modelos:
1. Product
   - id: UUID
   - name: str
   - description: str (opcional)
   - price: Decimal
   - stock: int
   - category: str
   - created_at: datetime
   - is_active: bool (default True)

2. CartItem
   - product_id: UUID
   - quantity: int
   - unit_price: Decimal

3. Order
   - id: UUID
   - user_id: UUID
   - items: List[CartItem]
   - status: Enum(pending, paid, shipped, delivered)
   - created_at: datetime
   - total: property que calcula el total

Usa dataclasses con:
- field() para defaults
- __post_init__ para validaciones
- Métodos to_dict() y from_dict()
```

### 3.2 Clases de Servicio

**Prompt para servicios:**
```markdown
Crea una clase OrderService en Python que maneje pedidos:

Dependencias (inyectadas en constructor):
- product_repository: ProductRepository
- order_repository: OrderRepository
- notification_service: NotificationService

Métodos:
1. create_order(user_id, items)
   - Valida stock disponible
   - Crea el pedido
   - Descuenta stock
   - Notifica al usuario
   - Retorna Order

2. update_status(order_id, new_status)
   - Valida transición de estados
   - Actualiza
   - Notifica cambio

3. cancel_order(order_id)
   - Solo si estado es 'pending'
   - Restaura stock
   - Notifica

Incluye:
- Type hints
- Docstrings
- Manejo de excepciones con clases custom
- Logging
```

### 3.3 Patrones de Diseño

**Prompt para Repository Pattern:**
```markdown
Implementa el patrón Repository para User en Python:

Interface:
```python
class UserRepository(ABC):
    @abstractmethod
    def get_by_id(self, user_id: UUID) -> Optional[User]: ...

    @abstractmethod
    def get_by_email(self, email: str) -> Optional[User]: ...

    @abstractmethod
    def save(self, user: User) -> User: ...

    @abstractmethod
    def delete(self, user_id: UUID) -> bool: ...

    @abstractmethod
    def find_all(self, limit: int = 100) -> List[User]: ...
```

Implementaciones:
1. InMemoryUserRepository - Para tests
2. SQLUserRepository - Para producción (usando SQLAlchemy)

Incluye:
- Manejo de errores apropiado
- Logging de operaciones
- Docstrings
```

---

## 4. Refactoring con IA

### 4.1 Identificar Code Smells

**Prompt:**
```markdown
Analiza el siguiente código e identifica code smells:

```python
def process(data):
    result = []
    for i in range(len(data)):
        if data[i]['type'] == 'A':
            x = data[i]['value'] * 1.1
            if x > 100:
                x = x - 10
            result.append({'type': 'A', 'value': x, 'processed': True})
        elif data[i]['type'] == 'B':
            x = data[i]['value'] * 1.2
            if x > 100:
                x = x - 20
            result.append({'type': 'B', 'value': x, 'processed': True})
        elif data[i]['type'] == 'C':
            x = data[i]['value'] * 1.3
            if x > 100:
                x = x - 30
            result.append({'type': 'C', 'value': x, 'processed': True})
    return result
```

Lista:
1. Cada code smell encontrado
2. Por qué es problemático
3. Cómo refactorizarlo
```

### 4.2 Refactoring Guiado

**Prompt:**
```markdown
Refactoriza el código anterior aplicando:

1. Extraer la lógica de cálculo a funciones separadas
2. Usar diccionario para mapear tipos a multiplicadores
3. Eliminar duplicación
4. Usar list comprehension donde sea apropiado
5. Agregar type hints
6. Agregar docstring

Muestra el código refactorizado paso a paso,
explicando cada cambio.
```

### 4.3 Modernizar Código

**Prompt:**
```markdown
Moderniza este código Python 2 a Python 3.11+:

```python
# Python 2 style
class User:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return "User: %s, %d years" % (self.name, self.age)

    def to_dict(self):
        return {'name': self.name, 'age': self.age}

def get_users(ids):
    users = []
    for id in ids:
        user = fetch_user(id)
        if user != None:
            users.append(user)
    return users
```

Usa:
- dataclasses
- f-strings
- Type hints
- Walrus operator si aplica
- List/dict comprehensions
- Match statement si aplica
```

---

## 5. Conversión de Lenguajes

### 5.1 Python a JavaScript

**Prompt:**
```markdown
Convierte este código Python a JavaScript/TypeScript:

```python
from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime

@dataclass
class Task:
    id: str
    title: str
    completed: bool = False
    due_date: Optional[datetime] = None

    def is_overdue(self) -> bool:
        if not self.due_date:
            return False
        return datetime.now() > self.due_date and not self.completed

class TaskManager:
    def __init__(self):
        self.tasks: List[Task] = []

    def add_task(self, task: Task) -> None:
        self.tasks.append(task)

    def get_pending(self) -> List[Task]:
        return [t for t in self.tasks if not t.completed]

    def get_overdue(self) -> List[Task]:
        return [t for t in self.tasks if t.is_overdue()]
```

Requisitos:
- Usa TypeScript con tipos estrictos
- Usa classes de ES6+
- Mantén la misma funcionalidad
- Usa date-fns para fechas si es necesario
```

### 5.2 JavaScript a Python

**Prompt:**
```markdown
Convierte este código JavaScript a Python:

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(...args));
  }

  once(event, callback) {
    const unsubscribe = this.on(event, (...args) => {
      callback(...args);
      unsubscribe();
    });
  }
}
```

Requisitos:
- Python 3.10+
- Type hints completos con Callable, Any
- Docstrings en español
- Mantén el patrón de unsubscribe
```

---

## 6. Evaluación de Código Generado

### 6.1 Checklist de Revisión

```markdown
□ FUNCIONALIDAD
  □ ¿Hace lo que se pidió?
  □ ¿Maneja casos edge?
  □ ¿Maneja errores apropiadamente?

□ CALIDAD
  □ ¿Nombres descriptivos?
  □ ¿Código legible?
  □ ¿Sin duplicación?
  □ ¿Funciones pequeñas y enfocadas?

□ SEGURIDAD
  □ ¿Valida inputs?
  □ ¿No expone datos sensibles?
  □ ¿Usa prácticas seguras?

□ EFICIENCIA
  □ ¿Algoritmo apropiado?
  □ ¿No hay loops innecesarios?
  □ ¿Manejo de memoria correcto?

□ MANTENIBILIDAD
  □ ¿Documentación presente?
  □ ¿Tests incluidos?
  □ ¿Fácil de modificar?
```

### 6.2 Pedir Mejoras

**Prompt de mejora:**
```markdown
Revisa el siguiente código generado y sugiere mejoras en:

1. Performance - ¿Hay optimizaciones posibles?
2. Legibilidad - ¿Se puede simplificar?
3. Robustez - ¿Qué casos no está manejando?
4. Testing - ¿Qué tests agregarías?

```python
[código a revisar]
```

Para cada mejora, explica por qué es importante
y muestra el código corregido.
```

---

## 7. Mejores Prácticas

### 7.1 Generar Código Incremental

En lugar de pedir todo de una vez:

```markdown
Paso 1: "Crea la estructura básica de la clase"
Paso 2: "Agrega los métodos de validación"
Paso 3: "Implementa la lógica principal"
Paso 4: "Agrega manejo de errores"
Paso 5: "Incluye logging"
Paso 6: "Genera tests"
```

### 7.2 Verificar Siempre

```python
# Después de generar código:
1. Leer y entender cada línea
2. Ejecutar con datos de prueba
3. Verificar edge cases
4. Revisar manejo de errores
5. Confirmar que APIs/funciones existen
```

### 7.3 Integración Segura

```markdown
1. Crear branch separada
2. Agregar código generado
3. Ejecutar linter y formateo
4. Escribir/ejecutar tests
5. Code review (humano)
6. Merge si aprueba
```

---

## Resumen

- La IA es excelente para **boilerplate y patrones comunes**
- Siempre **revisar y validar** código generado
- **Refactoring** asistido ahorra tiempo
- **Conversión de lenguajes** requiere verificación
- Usar **checklists** para evaluación sistemática

---

## Recursos

- [Refactoring Guru](https://refactoring.guru/)
- [Clean Code en Python](https://github.com/zedr/clean-code-python)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

*Siguiente: Módulo 05 - Debugging Asistido por IA*
