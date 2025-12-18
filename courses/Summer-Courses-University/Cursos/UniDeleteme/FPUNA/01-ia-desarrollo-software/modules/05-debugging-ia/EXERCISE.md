# Ejercicio: Debugging Asistido por IA
## Encontrar y Corregir Bugs

---

## Objetivo

Practicar el uso de IA para identificar, diagnosticar y corregir diferentes tipos de bugs en código.

---

## Parte 1: Errores Sintácticos (15 min)

### 1.1 Encuentra los Errores

El siguiente código tiene múltiples errores de sintaxis. Usa IA para encontrarlos:

```python
def calculate_stats(numbers)
    if len(numbers) = 0:
        return None

    total = sum(numbers)
    average = total / len(numbers

    sorted_nums = sorted(numbers)
    n = len(sorted_nums)
    if n % 2 == 0
        median = (sorted_nums[n//2 - 1] + sorted_nums[n//2]) / 2
    else:
        median = sorted_nums[n//2]

    return {"average" average, "median": median, "total": total}
```

### 1.2 Prompt para IA

Usa este prompt:
```
Encuentra todos los errores de sintaxis en este código Python y explica cada uno:

[pegar código aquí]
```

### 1.3 Documentar

| Línea | Error | Corrección |
|-------|-------|------------|
| | | |
| | | |
| | | |

---

## Parte 2: Errores de Lógica (25 min)

### 2.1 Bug de Paginación

```python
def paginate(items, page, per_page=10):
    """Retorna items para una página específica (0-indexed)."""
    total_pages = len(items) / per_page

    if page < 0 or page > total_pages:
        return []

    start = page * per_page
    end = start + per_page

    return items[start:end]

# Test:
items = list(range(25))  # [0, 1, 2, ..., 24]

print(paginate(items, 0))  # Esperado: [0-9], Actual: [0-9] ✓
print(paginate(items, 2))  # Esperado: [20-24], Actual: [20-24] ✓
print(paginate(items, 3))  # Esperado: [], Actual: ???
```

**Usa IA para:**
1. Identificar el bug en la lógica de `total_pages`
2. Explicar por qué `page > total_pages` no funciona correctamente
3. Proporcionar código corregido

### 2.2 Bug de Ordenamiento

```python
def sort_by_priority(tasks):
    """Ordena tareas por prioridad (HIGH > MEDIUM > LOW)."""
    priority_order = {"LOW": 1, "MEDIUM": 2, "HIGH": 3}

    for i in range(len(tasks)):
        for j in range(i + 1, len(tasks)):
            if priority_order[tasks[i]["priority"]] < priority_order[tasks[j]["priority"]]:
                tasks[i], tasks[j] = tasks[j], tasks[i]

    return tasks

# Test:
tasks = [
    {"name": "Task A", "priority": "LOW"},
    {"name": "Task B", "priority": "HIGH"},
    {"name": "Task C", "priority": "MEDIUM"},
]

result = sort_by_priority(tasks)
# Esperado: HIGH, MEDIUM, LOW
# Actual: ???

# Problema adicional: ¿Qué pasa si una tarea no tiene prioridad válida?
```

**Prompt sugerido:**
```
Este código de ordenamiento tiene un bug sutil y no maneja casos edge.
Identifica los problemas y proporciona una versión corregida que:
1. Ordene correctamente
2. Maneje prioridades inválidas
3. No modifique la lista original

[código]
```

---

## Parte 3: Stack Traces (20 min)

### 3.1 Interpretar Error de Python

```
Traceback (most recent call last):
  File "main.py", line 15, in <module>
    result = process_users(users)
  File "main.py", line 10, in process_users
    emails = [get_email(u) for u in users]
  File "main.py", line 10, in <listcomp>
    emails = [get_email(u) for u in users]
  File "main.py", line 5, in get_email
    return user["email"].lower()
AttributeError: 'NoneType' object has no attribute 'lower'
```

**Código relacionado:**
```python
def get_email(user):
    return user["email"].lower()

def process_users(users):
    emails = [get_email(u) for u in users]
    return list(set(emails))

users = [
    {"name": "Ana", "email": "ana@test.com"},
    {"name": "Bob", "email": None},
    {"name": "Carlos", "email": "carlos@test.com"},
]

result = process_users(users)
```

**Tarea:**
1. Pide a la IA que explique el stack trace
2. Identifica qué usuario causa el error
3. Implementa una corrección robusta

### 3.2 Interpretar Error de JavaScript

```
TypeError: Cannot read properties of undefined (reading 'map')
    at UserList (UserList.jsx:12:23)
    at renderWithHooks (react-dom.development.js:14985:18)
    at mountIndeterminateComponent (react-dom.development.js:17811:13)
    at beginWork (react-dom.development.js:19049:16)
```

```jsx
function UserList({ data }) {
    const [filter, setFilter] = useState("");

    const filteredUsers = data.users.map(user => {
        if (user.name.includes(filter)) {
            return user;
        }
        return null;
    }).filter(Boolean);

    return (
        <ul>
            {filteredUsers.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

**Pide a la IA:**
```
Explica este error de React y sugiere cómo corregirlo
considerando que 'data' puede venir de una API y estar
undefined inicialmente.

[stack trace y código]
```

---

## Parte 4: Rubber Duck Debugging (20 min)

### 4.1 Diálogo con la IA

Usa este código con un bug misterioso:

```python
class ShoppingCart:
    def __init__(self):
        self.items = []
        self.discount = 0

    def add_item(self, name, price, quantity=1):
        self.items.append({
            "name": name,
            "price": price,
            "quantity": quantity
        })

    def apply_discount(self, percent):
        self.discount = percent

    def get_total(self):
        subtotal = 0
        for item in self.items:
            subtotal += item["price"] * item["quantity"]

        if self.discount:
            subtotal -= subtotal * self.discount / 100

        return subtotal

# Test
cart = ShoppingCart()
cart.add_item("Laptop", 1000)
cart.add_item("Mouse", 50, 2)
cart.apply_discount(10)

print(cart.get_total())  # Esperado: 990, Actual: 990 ✓

# Pero hay un bug cuando...
cart2 = ShoppingCart()
cart2.add_item("Book", 20, 3)
cart2.apply_discount(0)  # Sin descuento

print(cart2.get_total())  # Esperado: 60, Actual: 60 ✓

# ¿Dónde está el bug entonces?
```

**Ejercicio:**
Mantén un diálogo con la IA explicando el código línea por línea. Descubre que el bug aparece cuando:
- Se aplica descuento de 0%
- Luego se cambia a descuento de 10%
- El descuento no se aplica correctamente

### 4.2 Documentar el Diálogo

```
Yo: [tu explicación]
IA: [respuesta de la IA]
Yo: [tu siguiente pregunta]
IA: [respuesta]
...
Conclusión: [el bug encontrado]
```

---

## Parte 5: Debugging de Código Ajeno (20 min)

### 5.1 Analizar Código Desconocido

Este código fue escrito por alguien más y falla intermitentemente:

```python
import random
import time

class Cache:
    def __init__(self, ttl=60):
        self.data = {}
        self.ttl = ttl

    def set(self, key, value):
        self.data[key] = {
            "value": value,
            "expires": time.time() + self.ttl
        }

    def get(self, key):
        if key in self.data:
            item = self.data[key]
            if time.time() < item["expires"]:
                return item["value"]
            else:
                del self.data[key]
        return None

    def cleanup(self):
        now = time.time()
        for key in self.data:
            if self.data[key]["expires"] < now:
                del self.data[key]

# El bug: a veces cleanup() lanza RuntimeError
cache = Cache(ttl=5)
cache.set("a", 1)
cache.set("b", 2)
cache.set("c", 3)

time.sleep(6)  # Esperar a que expiren

cache.cleanup()  # RuntimeError: dictionary changed size during iteration
```

**Pide a la IA:**
```
Este código de cache tiene un bug que causa RuntimeError.
1. Explica por qué ocurre
2. Proporciona una versión corregida
3. Sugiere mejoras adicionales para robustez
```

---

## Entregable

Documento con:

1. **Errores sintácticos** (Parte 1)
   - Tabla de errores encontrados
   - Código corregido

2. **Errores de lógica** (Parte 2)
   - Explicación de cada bug
   - Código corregido con tests

3. **Stack traces** (Parte 3)
   - Explicación de cada error
   - Soluciones implementadas

4. **Rubber duck** (Parte 4)
   - Transcripción del diálogo
   - Bug descubierto

5. **Código ajeno** (Parte 5)
   - Análisis del problema
   - Solución robusta

---

## Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Errores sintácticos identificados | 15 |
| Bugs de lógica corregidos | 25 |
| Stack traces interpretados | 20 |
| Diálogo de debugging | 20 |
| Código ajeno analizado | 20 |
| **Total** | **100** |

---

*Tiempo total estimado: 2 horas*
