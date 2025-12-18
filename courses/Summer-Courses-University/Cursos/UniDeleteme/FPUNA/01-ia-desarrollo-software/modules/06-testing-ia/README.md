# Módulo 06: Testing con IA
## Duración: 2 horas

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:
- Generar tests unitarios automáticamente con IA
- Identificar casos edge y corner cases
- Crear mocks y fixtures con asistencia de IA
- Mejorar la cobertura de código existente

---

## 1. IA para Generación de Tests

### 1.1 ¿Por Qué Usar IA para Tests?

| Beneficio | Descripción |
|-----------|-------------|
| **Velocidad** | Genera tests en segundos |
| **Cobertura** | Identifica casos que podrías olvidar |
| **Consistencia** | Sigue patrones uniformes |
| **Documentación** | Tests como especificación del código |

### 1.2 Tipos de Tests que IA Puede Generar

- Tests unitarios
- Tests de integración básicos
- Tests parametrizados
- Tests de edge cases
- Mocks y fixtures

---

## 2. Generación de Tests Unitarios

### 2.1 Prompt Básico

```markdown
Genera tests unitarios con pytest para esta función:

```python
def calculate_discount(price: float, discount_percent: float) -> float:
    """Calcula el precio con descuento aplicado."""
    if price < 0:
        raise ValueError("El precio no puede ser negativo")
    if discount_percent < 0 or discount_percent > 100:
        raise ValueError("El descuento debe estar entre 0 y 100")
    return price * (1 - discount_percent / 100)
```

Incluye tests para:
- Caso normal
- Descuento 0%
- Descuento 100%
- Precio 0
- Errores de validación
```

### 2.2 Resultado Esperado

```python
import pytest
from calculator import calculate_discount

class TestCalculateDiscount:
    """Tests para la función calculate_discount."""

    def test_descuento_normal(self):
        """Test con descuento típico del 10%."""
        assert calculate_discount(100, 10) == 90.0

    def test_sin_descuento(self):
        """Test con descuento 0%."""
        assert calculate_discount(100, 0) == 100.0

    def test_descuento_total(self):
        """Test con descuento 100%."""
        assert calculate_discount(100, 100) == 0.0

    def test_precio_cero(self):
        """Test con precio 0."""
        assert calculate_discount(0, 50) == 0.0

    def test_precio_negativo_lanza_error(self):
        """Test que precio negativo lanza ValueError."""
        with pytest.raises(ValueError, match="precio no puede ser negativo"):
            calculate_discount(-10, 10)

    def test_descuento_negativo_lanza_error(self):
        """Test que descuento negativo lanza ValueError."""
        with pytest.raises(ValueError, match="debe estar entre 0 y 100"):
            calculate_discount(100, -5)

    def test_descuento_mayor_100_lanza_error(self):
        """Test que descuento > 100 lanza ValueError."""
        with pytest.raises(ValueError, match="debe estar entre 0 y 100"):
            calculate_discount(100, 150)
```

---

## 3. Identificar Edge Cases

### 3.1 Prompt para Edge Cases

```markdown
Identifica todos los edge cases y corner cases para esta función:

```python
def split_into_chunks(data: list, chunk_size: int) -> list:
    """Divide una lista en chunks de tamaño específico."""
    return [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
```

Lista los casos y genera tests para cada uno.
```

### 3.2 Edge Cases Comunes

**La IA identificará:**

| Caso | Input | Esperado |
|------|-------|----------|
| Lista vacía | `[], 3` | `[]` |
| chunk_size = 1 | `[1,2,3], 1` | `[[1],[2],[3]]` |
| chunk_size > len | `[1,2], 5` | `[[1,2]]` |
| chunk_size = 0 | `[1,2], 0` | Error o infinito |
| chunk_size negativo | `[1,2], -1` | Error |
| Lista con None | `[1,None,3], 2` | `[[1,None],[3]]` |
| Lista con tipos mixtos | `[1,"a",True], 2` | `[[1,"a"],[True]]` |

### 3.3 Tests Generados

```python
class TestSplitIntoChunks:
    def test_lista_vacia(self):
        assert split_into_chunks([], 3) == []

    def test_chunk_size_uno(self):
        assert split_into_chunks([1, 2, 3], 1) == [[1], [2], [3]]

    def test_chunk_mayor_que_lista(self):
        assert split_into_chunks([1, 2], 5) == [[1, 2]]

    def test_chunk_size_cero_lanza_error(self):
        with pytest.raises(ValueError):
            split_into_chunks([1, 2], 0)

    def test_ultimo_chunk_incompleto(self):
        result = split_into_chunks([1, 2, 3, 4, 5], 2)
        assert result == [[1, 2], [3, 4], [5]]
```

---

## 4. Tests Parametrizados

### 4.1 Prompt para Parametrización

```markdown
Convierte estos tests en tests parametrizados con pytest.mark.parametrize:

```python
def test_suma_positivos():
    assert suma(2, 3) == 5

def test_suma_negativos():
    assert suma(-2, -3) == -5

def test_suma_mixto():
    assert suma(-2, 3) == 1

def test_suma_ceros():
    assert suma(0, 0) == 0
```
```

### 4.2 Resultado Parametrizado

```python
import pytest

@pytest.mark.parametrize("a, b, expected", [
    (2, 3, 5),           # positivos
    (-2, -3, -5),        # negativos
    (-2, 3, 1),          # mixto
    (0, 0, 0),           # ceros
    (1.5, 2.5, 4.0),     # decimales
    (1000000, 1, 1000001), # números grandes
])
def test_suma(a, b, expected):
    """Test de suma con múltiples casos."""
    assert suma(a, b) == expected
```

---

## 5. Generación de Mocks

### 5.1 Prompt para Mocks

```markdown
Genera tests con mocks para esta función que usa una API externa:

```python
import requests

def get_user_data(user_id: int) -> dict:
    """Obtiene datos de usuario desde API externa."""
    response = requests.get(f"https://api.example.com/users/{user_id}")
    response.raise_for_status()
    return response.json()

def get_user_name(user_id: int) -> str:
    """Obtiene solo el nombre del usuario."""
    data = get_user_data(user_id)
    return data.get("name", "Unknown")
```

Incluye:
- Mock de requests.get
- Test de respuesta exitosa
- Test de error 404
- Test de error de conexión
```

### 5.2 Tests con Mocks

```python
import pytest
from unittest.mock import patch, Mock
from user_service import get_user_data, get_user_name

class TestGetUserData:
    @patch('user_service.requests.get')
    def test_respuesta_exitosa(self, mock_get):
        """Test de respuesta exitosa de la API."""
        # Arrange
        mock_response = Mock()
        mock_response.json.return_value = {"id": 1, "name": "Juan"}
        mock_response.raise_for_status.return_value = None
        mock_get.return_value = mock_response

        # Act
        result = get_user_data(1)

        # Assert
        assert result == {"id": 1, "name": "Juan"}
        mock_get.assert_called_once_with("https://api.example.com/users/1")

    @patch('user_service.requests.get')
    def test_error_404(self, mock_get):
        """Test cuando el usuario no existe."""
        import requests
        mock_get.return_value.raise_for_status.side_effect = \
            requests.HTTPError("404 Not Found")

        with pytest.raises(requests.HTTPError):
            get_user_data(999)

    @patch('user_service.requests.get')
    def test_error_conexion(self, mock_get):
        """Test de error de conexión."""
        import requests
        mock_get.side_effect = requests.ConnectionError("No connection")

        with pytest.raises(requests.ConnectionError):
            get_user_data(1)

class TestGetUserName:
    @patch('user_service.get_user_data')
    def test_nombre_existe(self, mock_get_user_data):
        """Test cuando el nombre existe."""
        mock_get_user_data.return_value = {"id": 1, "name": "María"}

        result = get_user_name(1)

        assert result == "María"

    @patch('user_service.get_user_data')
    def test_nombre_no_existe(self, mock_get_user_data):
        """Test cuando no hay nombre en la respuesta."""
        mock_get_user_data.return_value = {"id": 1}

        result = get_user_name(1)

        assert result == "Unknown"
```

---

## 6. Fixtures con IA

### 6.1 Prompt para Fixtures

```markdown
Crea fixtures de pytest para los siguientes modelos:

```python
@dataclass
class User:
    id: int
    name: str
    email: str
    is_active: bool = True

@dataclass
class Order:
    id: int
    user_id: int
    items: List[dict]
    total: float
    status: str = "pending"
```

Incluye:
- Fixture de un usuario
- Fixture de múltiples usuarios
- Fixture de orden con items
- Fixture de base de datos en memoria
```

### 6.2 Fixtures Generadas

```python
import pytest
from models import User, Order

@pytest.fixture
def sample_user():
    """Fixture de un usuario de prueba."""
    return User(
        id=1,
        name="Test User",
        email="test@example.com",
        is_active=True
    )

@pytest.fixture
def inactive_user():
    """Fixture de usuario inactivo."""
    return User(
        id=2,
        name="Inactive User",
        email="inactive@example.com",
        is_active=False
    )

@pytest.fixture
def sample_users():
    """Fixture de lista de usuarios."""
    return [
        User(id=1, name="Ana", email="ana@test.com"),
        User(id=2, name="Bob", email="bob@test.com"),
        User(id=3, name="Carlos", email="carlos@test.com", is_active=False),
    ]

@pytest.fixture
def sample_order(sample_user):
    """Fixture de orden con items."""
    return Order(
        id=1,
        user_id=sample_user.id,
        items=[
            {"product": "Laptop", "price": 1000, "quantity": 1},
            {"product": "Mouse", "price": 50, "quantity": 2},
        ],
        total=1100.0,
        status="pending"
    )

@pytest.fixture
def in_memory_db():
    """Fixture de base de datos en memoria."""
    db = {
        "users": {},
        "orders": {}
    }
    yield db
    # Cleanup
    db.clear()
```

---

## 7. Mejorar Cobertura

### 7.1 Prompt para Análisis de Cobertura

```markdown
Analiza este código y genera tests para llegar a 100% de cobertura:

```python
def process_payment(amount, payment_type, user):
    if amount <= 0:
        raise ValueError("Amount must be positive")

    if payment_type == "credit":
        if user.credit_limit < amount:
            return {"status": "rejected", "reason": "insufficient_credit"}
        user.credit_limit -= amount
        return {"status": "approved", "method": "credit"}

    elif payment_type == "debit":
        if user.balance < amount:
            return {"status": "rejected", "reason": "insufficient_funds"}
        user.balance -= amount
        return {"status": "approved", "method": "debit"}

    elif payment_type == "cash":
        return {"status": "approved", "method": "cash"}

    else:
        raise ValueError(f"Unknown payment type: {payment_type}")
```

Identifica cada rama y genera un test para cubrirla.
```

### 7.2 Tests para 100% Cobertura

```python
class TestProcessPayment:
    """Tests para cobertura completa de process_payment."""

    # Validación de amount
    def test_amount_cero_lanza_error(self):
        with pytest.raises(ValueError, match="must be positive"):
            process_payment(0, "credit", Mock())

    def test_amount_negativo_lanza_error(self):
        with pytest.raises(ValueError, match="must be positive"):
            process_payment(-10, "credit", Mock())

    # Rama credit
    def test_credit_aprobado(self):
        user = Mock(credit_limit=1000)
        result = process_payment(500, "credit", user)
        assert result == {"status": "approved", "method": "credit"}
        assert user.credit_limit == 500

    def test_credit_rechazado_limite_insuficiente(self):
        user = Mock(credit_limit=100)
        result = process_payment(500, "credit", user)
        assert result == {"status": "rejected", "reason": "insufficient_credit"}

    # Rama debit
    def test_debit_aprobado(self):
        user = Mock(balance=1000)
        result = process_payment(500, "debit", user)
        assert result == {"status": "approved", "method": "debit"}
        assert user.balance == 500

    def test_debit_rechazado_fondos_insuficientes(self):
        user = Mock(balance=100)
        result = process_payment(500, "debit", user)
        assert result == {"status": "rejected", "reason": "insufficient_funds"}

    # Rama cash
    def test_cash_siempre_aprobado(self):
        result = process_payment(1000, "cash", Mock())
        assert result == {"status": "approved", "method": "cash"}

    # Tipo desconocido
    def test_tipo_desconocido_lanza_error(self):
        with pytest.raises(ValueError, match="Unknown payment type"):
            process_payment(100, "bitcoin", Mock())
```

---

## 8. Mejores Prácticas

### 8.1 Cuándo Usar IA para Tests

✅ **Usar IA para:**
- Generar boilerplate de tests
- Identificar edge cases
- Crear mocks complejos
- Parametrizar tests existentes

⚠️ **Con cuidado:**
- Tests de lógica de negocio específica
- Tests de integración complejos
- Tests de rendimiento

### 8.2 Verificar Tests Generados

```python
# Siempre verificar que:
# 1. Los tests realmente prueban lo que dicen probar
# 2. Los assertions son correctos
# 3. Los nombres son descriptivos
# 4. Los tests fallan cuando el código está mal
```

### 8.3 Patrón AAA

```python
def test_example():
    # Arrange - Preparar datos y mocks
    user = create_test_user()

    # Act - Ejecutar la acción a probar
    result = process_user(user)

    # Assert - Verificar resultados
    assert result.status == "processed"
```

---

## Resumen

- IA acelera **significativamente** la generación de tests
- Pedir **edge cases** explícitamente mejora cobertura
- **Parametrizar** reduce duplicación
- **Mocks** permiten tests aislados
- Siempre **verificar** que los tests son correctos

---

## Recursos

- [pytest Documentation](https://docs.pytest.org/)
- [unittest.mock](https://docs.python.org/3/library/unittest.mock.html)
- [pytest-cov](https://pytest-cov.readthedocs.io/)

---

*Siguiente: Módulo 07 - Documentación Automatizada*
