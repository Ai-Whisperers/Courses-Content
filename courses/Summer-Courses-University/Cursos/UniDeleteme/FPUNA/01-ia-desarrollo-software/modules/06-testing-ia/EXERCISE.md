# Ejercicio: Testing con IA
## Generación y Mejora de Tests

---

## Objetivo

Practicar la generación de tests unitarios, identificación de edge cases, y creación de mocks utilizando asistencia de IA.

---

## Parte 1: Tests Unitarios Básicos (25 min)

### 1.1 Código a Testear

```python
# string_utils.py

def capitalize_words(text: str) -> str:
    """Capitaliza la primera letra de cada palabra."""
    if not text:
        return ""
    return " ".join(word.capitalize() for word in text.split())

def slugify(text: str) -> str:
    """Convierte texto a formato slug (URL-friendly)."""
    if not text:
        return ""
    import re
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text

def truncate(text: str, max_length: int, suffix: str = "...") -> str:
    """Trunca texto al máximo especificado agregando sufijo."""
    if not text or max_length <= 0:
        return ""
    if len(text) <= max_length:
        return text
    return text[:max_length - len(suffix)] + suffix
```

### 1.2 Genera Tests

Usa este prompt con IA:

```markdown
Genera tests unitarios completos con pytest para estas funciones:

[pegar código]

Para cada función incluye:
- Test de caso normal
- Test de string vacío
- Test de None (si aplica)
- Tests de edge cases específicos
- Tests parametrizados donde sea útil

Usa el patrón AAA y docstrings descriptivos en español.
```

### 1.3 Ejecuta y Verifica

```bash
# Instalar pytest si no está
pip install pytest

# Ejecutar tests
pytest test_string_utils.py -v

# Ver cobertura
pip install pytest-cov
pytest --cov=string_utils test_string_utils.py
```

### 1.4 Documenta

| Función | Tests generados | Cobertura |
|---------|-----------------|-----------|
| capitalize_words | | |
| slugify | | |
| truncate | | |

---

## Parte 2: Edge Cases (20 min)

### 2.1 Código con Edge Cases

```python
# calculator.py

def divide(a: float, b: float) -> float:
    """División con manejo de errores."""
    return a / b

def calculate_percentage(value: float, total: float) -> float:
    """Calcula qué porcentaje es value de total."""
    return (value / total) * 100

def safe_average(numbers: list) -> float:
    """Calcula promedio de lista de números."""
    return sum(numbers) / len(numbers)
```

### 2.2 Identifica Edge Cases

Usa este prompt:

```markdown
Para cada una de estas funciones, identifica TODOS los edge cases
y corner cases posibles:

[código]

Para cada caso, indica:
1. Qué input causa el problema
2. Qué error o resultado inesperado ocurre
3. Cómo debería manejarse
```

### 2.3 Genera Tests de Edge Cases

```markdown
Genera tests que cubran todos los edge cases identificados:

[código]

Incluye:
- Tests que verifican que se lanzan excepciones apropiadas
- Tests con valores límite (0, negativos, muy grandes)
- Tests con tipos incorrectos
```

### 2.4 Tabla de Edge Cases

| Función | Edge Case | Input | Resultado Actual | Resultado Esperado |
|---------|-----------|-------|-----------------|-------------------|
| divide | División por cero | 10, 0 | | |
| calculate_percentage | Total cero | 5, 0 | | |
| safe_average | Lista vacía | [] | | |

---

## Parte 3: Tests Parametrizados (20 min)

### 3.1 Código para Parametrizar

```python
# validators.py

def is_valid_email(email: str) -> bool:
    """Valida formato básico de email."""
    import re
    if not email:
        return False
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(re.match(pattern, email))

def is_valid_password(password: str) -> dict:
    """Valida contraseña y retorna resultado detallado."""
    errors = []

    if len(password) < 8:
        errors.append("Mínimo 8 caracteres")
    if not any(c.isupper() for c in password):
        errors.append("Requiere mayúscula")
    if not any(c.islower() for c in password):
        errors.append("Requiere minúscula")
    if not any(c.isdigit() for c in password):
        errors.append("Requiere número")

    return {
        "valid": len(errors) == 0,
        "errors": errors
    }
```

### 3.2 Convierte a Parametrizados

Pide a la IA:

```markdown
Genera tests parametrizados para estas funciones de validación:

[código]

Para is_valid_email, incluye al menos 10 casos:
- Emails válidos diversos
- Emails inválidos (sin @, sin dominio, con espacios, etc.)

Para is_valid_password, incluye casos que cubran:
- Todas las combinaciones de errores
- Contraseña que cumple todo
- Contraseña que falla en cada criterio individual
```

### 3.3 Template de Test Parametrizado

```python
import pytest

@pytest.mark.parametrize("email, expected", [
    # Válidos
    ("user@example.com", True),
    # Inválidos
    ("", False),
    # ... más casos
])
def test_is_valid_email(email, expected):
    assert is_valid_email(email) == expected
```

---

## Parte 4: Mocks y Fixtures (25 min)

### 4.1 Código con Dependencias Externas

```python
# weather_service.py
import requests

class WeatherService:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.weather.com"

    def get_temperature(self, city: str) -> float:
        """Obtiene temperatura actual de una ciudad."""
        response = requests.get(
            f"{self.base_url}/current",
            params={"city": city, "key": self.api_key}
        )
        response.raise_for_status()
        data = response.json()
        return data["temperature"]

    def get_forecast(self, city: str, days: int = 5) -> list:
        """Obtiene pronóstico de varios días."""
        response = requests.get(
            f"{self.base_url}/forecast",
            params={"city": city, "days": days, "key": self.api_key}
        )
        response.raise_for_status()
        return response.json()["forecast"]

    def is_rainy(self, city: str) -> bool:
        """Verifica si está o va a llover."""
        forecast = self.get_forecast(city, days=1)
        return any(day["condition"] == "rain" for day in forecast)
```

### 4.2 Genera Tests con Mocks

```markdown
Genera tests completos para WeatherService usando mocks:

[código]

Incluye:
1. Fixtures para WeatherService
2. Mocks de requests.get para cada método
3. Tests de respuesta exitosa
4. Tests de errores HTTP (404, 500)
5. Tests de errores de conexión
6. Test de is_rainy cuando llueve y cuando no
```

### 4.3 Verifica los Mocks

Los tests generados deben:
- [ ] No hacer llamadas reales a la API
- [ ] Verificar que se llama a la URL correcta
- [ ] Verificar los parámetros enviados
- [ ] Manejar diferentes respuestas

---

## Parte 5: Proyecto Integrado (30 min)

### 5.1 Código Completo

```python
# order_processor.py
from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime

@dataclass
class Item:
    name: str
    price: float
    quantity: int

@dataclass
class Order:
    id: str
    items: List[Item]
    customer_email: str
    created_at: datetime
    discount_percent: float = 0

class OrderProcessor:
    def __init__(self, email_service, inventory_service):
        self.email_service = email_service
        self.inventory_service = inventory_service

    def calculate_subtotal(self, order: Order) -> float:
        return sum(item.price * item.quantity for item in order.items)

    def calculate_total(self, order: Order) -> float:
        subtotal = self.calculate_subtotal(order)
        discount = subtotal * (order.discount_percent / 100)
        return subtotal - discount

    def validate_stock(self, order: Order) -> List[str]:
        errors = []
        for item in order.items:
            available = self.inventory_service.get_stock(item.name)
            if available < item.quantity:
                errors.append(f"Stock insuficiente para {item.name}")
        return errors

    def process(self, order: Order) -> dict:
        # Validar stock
        errors = self.validate_stock(order)
        if errors:
            return {"status": "error", "errors": errors}

        # Calcular total
        total = self.calculate_total(order)

        # Actualizar inventario
        for item in order.items:
            self.inventory_service.decrease_stock(item.name, item.quantity)

        # Enviar confirmación
        self.email_service.send_confirmation(order.customer_email, order.id, total)

        return {"status": "success", "total": total}
```

### 5.2 Genera Suite Completa

```markdown
Crea una suite de tests completa para OrderProcessor:

[código]

Incluye:
1. Fixtures para:
   - Items de prueba
   - Órdenes válidas e inválidas
   - Mocks de email_service e inventory_service

2. Tests unitarios para:
   - calculate_subtotal con varios items
   - calculate_total con y sin descuento
   - validate_stock con stock suficiente
   - validate_stock con stock insuficiente

3. Tests de integración para:
   - process exitoso
   - process con error de stock
   - Verificar que se llama a email_service
   - Verificar que se actualiza inventario

4. Tests parametrizados para:
   - Diferentes porcentajes de descuento
   - Diferentes cantidades de items
```

---

## Entregable

Repositorio con:

```
testing-practice/
├── src/
│   ├── string_utils.py
│   ├── calculator.py
│   ├── validators.py
│   ├── weather_service.py
│   └── order_processor.py
├── tests/
│   ├── test_string_utils.py
│   ├── test_calculator.py
│   ├── test_validators.py
│   ├── test_weather_service.py
│   └── test_order_processor.py
├── conftest.py (fixtures compartidos)
├── pytest.ini
└── COVERAGE_REPORT.md
```

### COVERAGE_REPORT.md

```markdown
# Reporte de Cobertura

## Resumen
- Cobertura total: XX%

## Por módulo
| Módulo | Líneas | Cobertura |
|--------|--------|-----------|
| string_utils | XX | XX% |
| calculator | XX | XX% |
| ... | | |

## Edge cases cubiertos
- [lista de edge cases]

## Reflexión
- ¿Qué casos fueron más difíciles de testear?
- ¿Qué aprendiste sobre testing con IA?
```

---

## Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Tests unitarios completos | 20 |
| Edge cases identificados | 20 |
| Tests parametrizados | 15 |
| Mocks correctos | 20 |
| Suite integrada | 20 |
| Documentación | 5 |
| **Total** | **100** |

---

*Tiempo total estimado: 2 horas*
