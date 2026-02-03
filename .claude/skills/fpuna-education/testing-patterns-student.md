# Skill: Testing Patterns para Estudiantes

## Metadata

- **Name**: Testing Patterns para Estudiantes
- **Category**: Education & Testing
- **Activation**: When user mentions "cómo testear", "escribir tests", "testing", "pytest", "unit test", "cobertura de tests"
- **Model**: Sonnet
- **Est. Token Cost**: ~2000 tokens

## When to Activate

Trigger when:
- "Cómo escribo tests para esto?"
- "Genera tests para esta función"
- "Necesito ayuda con testing"
- "Tests para [código]"
- "Explica TDD"

## Purpose

Enseña a estudiantes a escribir tests efectivos con pytest, cubriendo patterns progresivos desde básico hasta avanzado.

## Niveles de Testing (Progresión Pedagógica)

### Nivel 1: Tests Básicos (Semana 1-2)

```python
# Concepto: Un test verifica un resultado esperado

def sumar(a, b):
    return a + b

# Test básico
def test_sumar():
    resultado = sumar(2, 3)
    assert resultado == 5, f"Esperado 5, obtenido {resultado}"

# Ejercicio para estudiante:
# Escribe un test para restar(a, b)
```

### Nivel 2: Tests Parametrizados (Semana 3)

```python
import pytest

# Concepto: Un test, múltiples casos
@pytest.mark.parametrize("a,b,esperado", [
    (2, 3, 5),
    (-1, 1, 0),
    (0, 0, 0),
    (-5, -3, -8),
])
def test_sumar_varios_casos(a, b, esperado):
    assert sumar(a, b) == esperado
```

### Nivel 3: Fixtures (Semana 4)

```python
import pytest

# Concepto: Setup reutilizable
@pytest.fixture
def sample_data():
    """Proporciona datos de prueba."""
    return {
        "estudiantes": [
            {"nombre": "Ana", "nota": 85},
            {"nombre": "Luis", "nota": 92},
        ]
    }

def test_calcular_promedio(sample_data):
    promedio = calcular_promedio(sample_data["estudiantes"])
    assert promedio == 88.5
```

### Nivel 4: Mocks y Stubs (Semana 5)

```python
from unittest.mock import Mock, patch

# Concepto: Aislar dependencias
@patch('requests.get')
def test_obtener_datos_api(mock_get):
    # Configurar mock
    mock_get.return_value.json.return_value = {"data": "test"}
    
    # Ejecutar función
    resultado = obtener_datos_api("url")
    
    # Verificar
    assert resultado == {"data": "test"}
    mock_get.assert_called_once_with("url")
```

### Nivel 5: Integration Tests (Semana 6+)

```python
# Concepto: Testear flujos completos
def test_flujo_completo_registro(client):
    # 1. Registrar usuario
    response = client.post("/api/register", json={
        "email": "test@fpuna.edu.py",
        "password": "secure123"
    })
    assert response.status_code == 201
    
    # 2. Login
    login = client.post("/api/login", json={
        "email": "test@fpuna.edu.py",
        "password": "secure123"
    })
    assert login.status_code == 200
    token = login.json()["token"]
    
    # 3. Acceder a recurso protegido
    profile = client.get("/api/profile", headers={
        "Authorization": f"Bearer {token}"
    })
    assert profile.status_code == 200
```

## Patterns por Tipo de Función

### Pattern: Testing de Funciones Puras

```python
# Función a testear
def calcular_descuento(precio: float, porcentaje: float) -> float:
    """Calcula precio con descuento."""
    if precio < 0:
        raise ValueError("Precio no puede ser negativo")
    if not 0 <= porcentaje <= 100:
        raise ValueError("Porcentaje debe ser 0-100")
    
    return precio * (1 - porcentaje / 100)

# Tests
class TestCalcularDescuento:
    """Tests para calcular_descuento."""
    
    def test_descuento_normal(self):
        """Descuento estándar funciona."""
        assert calcular_descuento(100, 20) == 80
    
    def test_descuento_cero(self):
        """0% de descuento devuelve mismo precio."""
        assert calcular_descuento(100, 0) == 100
    
    def test_descuento_total(self):
        """100% de descuento devuelve 0."""
        assert calcular_descuento(100, 100) == 0
    
    def test_precio_negativo_raises(self):
        """Precio negativo debe lanzar error."""
        with pytest.raises(ValueError, match="negativo"):
            calcular_descuento(-100, 20)
    
    @pytest.mark.parametrize("precio,pct,esperado", [
        (100, 10, 90),
        (50, 50, 25),
        (200, 25, 150),
    ])
    def test_varios_descuentos(self, precio, pct, esperado):
        """Múltiples casos de descuento."""
        assert calcular_descuento(precio, pct) == esperado
```

### Pattern: Testing con Datos Externos

```python
import pytest
import json

@pytest.fixture
def datos_estudiantes():
    """Carga datos de prueba."""
    with open('tests/data/estudiantes.json') as f:
        return json.load(f)

def test_calcular_estadisticas(datos_estudiantes):
    """Test con datos reales de muestra."""
    stats = calcular_estadisticas(datos_estudiantes)
    assert stats["total"] == len(datos_estudiantes)
    assert 0 <= stats["promedio"] <= 100
```

## Estructura de Tests Recomendada

```
📁 tests/
├── 📄 __init__.py
├── 📄 conftest.py              # Fixtures compartidos
├── 📄 test_unitarios/          # Tests unitarios
│   ├── 📄 test_modulo_a.py
│   └── 📄 test_modulo_b.py
├── 📄 test_integracion/        # Tests de integración
│   └── 📄 test_api.py
├── 📁 fixtures/               # Datos de prueba
│   ├── 📄 estudiantes.json
│   └── 📄 cursos.csv
└── 📁 data/                   # Archivos de test
    └── 📄 sample_data.db
```

## Comandos de Testing

```bash
# Ejecutar todos los tests
pytest

# Ejecutar con verbose
pytest -v

# Ejecutar tests específicos
pytest tests/test_modulo_a.py

# Ejecutar función específica
pytest -k "test_calcular"

# Con coverage
pytest --cov=src --cov-report=term-missing
pytest --cov=src --cov-report=html

# Paralelo (rápido)
pytest -n auto

# Solo tests fallidos del último run
pytest --lf

# Modo watch (re-run al cambiar)
pytest -f
```

## Success Criteria

Testing enseñado correctamente cuando:
- [ ] Estudiante entiende assertions
- [ ] Puede escribir tests básicos
- [ ] Usa fixtures apropiadamente
- [ ] Entiende mocking
- [ ] Puede medir cobertura
- [ ] Aplica TDD en proyectos

---

**Last Updated:** 2025-01-30
**Course:** FPUNA AI Education
**Version:** 1.0 - Testing Patterns
**Maintained by:** FPUNA AI Education Team
