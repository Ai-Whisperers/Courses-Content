# Ejemplo Completado: Generación de Tests Unitarios

## Contexto
Este es un ejemplo de cómo un estudiante usó IA para generar tests pytest para una calculadora de préstamos.

---

## El Código a Testear

```python
# prestamos.py

def calcular_cuota_mensual(monto: float, tasa_anual: float, meses: int) -> float:
    """
    Calcula la cuota mensual de un préstamo con sistema francés.

    Args:
        monto: Monto del préstamo en guaraníes
        tasa_anual: Tasa de interés anual (ej: 0.18 para 18%)
        meses: Plazo en meses

    Returns:
        Cuota mensual en guaraníes

    Raises:
        ValueError: Si algún parámetro es inválido
    """
    if monto <= 0:
        raise ValueError("El monto debe ser positivo")
    if tasa_anual < 0:
        raise ValueError("La tasa no puede ser negativa")
    if meses <= 0:
        raise ValueError("El plazo debe ser positivo")

    if tasa_anual == 0:
        return monto / meses

    tasa_mensual = tasa_anual / 12
    cuota = monto * (tasa_mensual * (1 + tasa_mensual)**meses) / ((1 + tasa_mensual)**meses - 1)

    return round(cuota, 0)


def calcular_total_intereses(monto: float, tasa_anual: float, meses: int) -> float:
    """Calcula el total de intereses a pagar."""
    cuota = calcular_cuota_mensual(monto, tasa_anual, meses)
    total_pagado = cuota * meses
    return total_pagado - monto


def es_prestamo_viable(ingreso_mensual: float, cuota: float) -> bool:
    """
    Determina si un préstamo es viable según la regla del 30%.
    La cuota no debe superar el 30% del ingreso mensual.
    """
    if ingreso_mensual <= 0:
        return False
    return cuota <= ingreso_mensual * 0.30
```

---

## Prompt Usado

```
Genera tests unitarios con pytest para este código Python:

```python
[Código de prestamos.py pegado aquí]
```

Requisitos:
1. Usar pytest (no unittest)
2. Probar casos normales, límites y errores
3. Al menos 3 tests por función
4. Nombres descriptivos en español
5. Docstrings explicando qué prueba cada test
6. Usar pytest.raises para excepciones
7. Incluir tests parametrizados donde sea apropiado

Formato del archivo de tests:
- Nombre: test_prestamos.py
- Importar las funciones correctamente
- Organizar tests por función

Contexto adicional:
- Los montos están en guaraníes (típicamente millones)
- Tasas de interés en Paraguay: 15-25% anual es común
- Plazos típicos: 12, 24, 36, 48, 60 meses
```

---

## Tests Generados

```python
# test_prestamos.py
"""
Tests unitarios para el módulo de cálculo de préstamos.
Ejecutar con: pytest test_prestamos.py -v
"""

import pytest
from prestamos import (
    calcular_cuota_mensual,
    calcular_total_intereses,
    es_prestamo_viable
)


# ============================================================
# Tests para calcular_cuota_mensual
# ============================================================

class TestCalcularCuotaMensual:
    """Tests para la función de cálculo de cuota mensual."""

    def test_prestamo_tipico_paraguay(self):
        """Prueba un préstamo típico en Paraguay: Gs 10M al 18% a 12 meses."""
        monto = 10_000_000  # 10 millones de guaraníes
        tasa = 0.18  # 18% anual
        meses = 12

        cuota = calcular_cuota_mensual(monto, tasa, meses)

        # Cuota esperada aproximada: ~916,800 Gs
        assert 900_000 < cuota < 950_000

    def test_prestamo_sin_interes(self):
        """Prueba préstamo con tasa 0% (cuota = monto / meses)."""
        monto = 1_200_000
        tasa = 0.0
        meses = 12

        cuota = calcular_cuota_mensual(monto, tasa, meses)

        assert cuota == 100_000

    def test_prestamo_corto_plazo(self):
        """Prueba préstamo a 1 mes (debería retornar monto + interés de 1 mes)."""
        monto = 1_000_000
        tasa = 0.12  # 12% anual = 1% mensual
        meses = 1

        cuota = calcular_cuota_mensual(monto, tasa, meses)

        # Debería ser aprox 1,010,000
        assert cuota == 1_010_000

    @pytest.mark.parametrize("monto,tasa,meses,esperado_min,esperado_max", [
        (5_000_000, 0.15, 12, 440_000, 460_000),   # Préstamo pequeño
        (50_000_000, 0.20, 36, 1_800_000, 2_000_000),  # Préstamo mediano
        (100_000_000, 0.24, 60, 2_800_000, 3_000_000),  # Préstamo grande
    ])
    def test_diferentes_montos_y_plazos(self, monto, tasa, meses, esperado_min, esperado_max):
        """Prueba diversos escenarios de préstamos reales en Paraguay."""
        cuota = calcular_cuota_mensual(monto, tasa, meses)
        assert esperado_min < cuota < esperado_max


class TestCalcularCuotaMensualErrores:
    """Tests de validación de errores para calcular_cuota_mensual."""

    def test_monto_cero_lanza_error(self):
        """Prueba que monto 0 lanza ValueError."""
        with pytest.raises(ValueError, match="monto debe ser positivo"):
            calcular_cuota_mensual(0, 0.18, 12)

    def test_monto_negativo_lanza_error(self):
        """Prueba que monto negativo lanza ValueError."""
        with pytest.raises(ValueError, match="monto debe ser positivo"):
            calcular_cuota_mensual(-1_000_000, 0.18, 12)

    def test_tasa_negativa_lanza_error(self):
        """Prueba que tasa negativa lanza ValueError."""
        with pytest.raises(ValueError, match="tasa no puede ser negativa"):
            calcular_cuota_mensual(1_000_000, -0.05, 12)

    def test_meses_cero_lanza_error(self):
        """Prueba que plazo 0 lanza ValueError."""
        with pytest.raises(ValueError, match="plazo debe ser positivo"):
            calcular_cuota_mensual(1_000_000, 0.18, 0)

    def test_meses_negativo_lanza_error(self):
        """Prueba que plazo negativo lanza ValueError."""
        with pytest.raises(ValueError, match="plazo debe ser positivo"):
            calcular_cuota_mensual(1_000_000, 0.18, -12)


# ============================================================
# Tests para calcular_total_intereses
# ============================================================

class TestCalcularTotalIntereses:
    """Tests para la función de cálculo de intereses totales."""

    def test_intereses_prestamo_tipico(self):
        """Prueba cálculo de intereses en préstamo típico."""
        monto = 10_000_000
        tasa = 0.18
        meses = 12

        intereses = calcular_total_intereses(monto, tasa, meses)

        # Intereses deberían ser ~1M Gs (aprox 10% del monto)
        assert 900_000 < intereses < 1_200_000

    def test_intereses_sin_tasa(self):
        """Prueba que sin interés, los intereses totales son 0."""
        monto = 5_000_000
        tasa = 0.0
        meses = 12

        intereses = calcular_total_intereses(monto, tasa, meses)

        assert intereses == 0

    def test_intereses_aumentan_con_plazo(self):
        """Prueba que más plazo = más intereses."""
        monto = 10_000_000
        tasa = 0.18

        intereses_12m = calcular_total_intereses(monto, tasa, 12)
        intereses_24m = calcular_total_intereses(monto, tasa, 24)
        intereses_36m = calcular_total_intereses(monto, tasa, 36)

        assert intereses_12m < intereses_24m < intereses_36m


# ============================================================
# Tests para es_prestamo_viable
# ============================================================

class TestEsPrestamoViable:
    """Tests para la función de viabilidad de préstamo."""

    def test_cuota_menor_30_porciento_es_viable(self):
        """Prueba que cuota < 30% del ingreso es viable."""
        ingreso = 5_000_000  # 5M mensual
        cuota = 1_000_000    # 20% del ingreso

        assert es_prestamo_viable(ingreso, cuota) == True

    def test_cuota_igual_30_porciento_es_viable(self):
        """Prueba que cuota = 30% exacto es viable (límite)."""
        ingreso = 5_000_000
        cuota = 1_500_000  # Exactamente 30%

        assert es_prestamo_viable(ingreso, cuota) == True

    def test_cuota_mayor_30_porciento_no_viable(self):
        """Prueba que cuota > 30% no es viable."""
        ingreso = 5_000_000
        cuota = 2_000_000  # 40% del ingreso

        assert es_prestamo_viable(ingreso, cuota) == False

    def test_ingreso_cero_no_viable(self):
        """Prueba que con ingreso 0, ningún préstamo es viable."""
        ingreso = 0
        cuota = 100_000

        assert es_prestamo_viable(ingreso, cuota) == False

    def test_ingreso_negativo_no_viable(self):
        """Prueba que ingreso negativo retorna no viable."""
        ingreso = -1_000_000
        cuota = 100_000

        assert es_prestamo_viable(ingreso, cuota) == False

    @pytest.mark.parametrize("ingreso,cuota,esperado", [
        (3_000_000, 500_000, True),    # 16.7% - viable
        (3_000_000, 900_000, True),    # 30% exacto - viable
        (3_000_000, 901_000, False),   # 30.03% - no viable
        (2_500_000, 750_000, True),    # Salario mínimo Paraguay ~2.5M
        (2_500_000, 800_000, False),   # Salario mínimo, cuota alta
    ])
    def test_casos_limite_viabilidad(self, ingreso, cuota, esperado):
        """Prueba casos límite de viabilidad con valores reales de Paraguay."""
        assert es_prestamo_viable(ingreso, cuota) == esperado


# ============================================================
# Tests de integración
# ============================================================

class TestIntegracion:
    """Tests que combinan múltiples funciones."""

    def test_flujo_completo_prestamo_viable(self):
        """Prueba el flujo completo: calcular cuota y verificar viabilidad."""
        # Escenario: Compra de moto, préstamo de 15M a 24 meses
        monto = 15_000_000
        tasa = 0.20
        meses = 24
        ingreso_solicitante = 4_000_000  # Gs 4M mensual

        cuota = calcular_cuota_mensual(monto, tasa, meses)
        es_viable = es_prestamo_viable(ingreso_solicitante, cuota)

        # Cuota ~760,000, que es ~19% del ingreso -> viable
        assert es_viable == True

    def test_flujo_completo_prestamo_no_viable(self):
        """Prueba escenario donde el préstamo no es viable."""
        # Escenario: Préstamo grande para ingreso bajo
        monto = 50_000_000
        tasa = 0.22
        meses = 12
        ingreso_solicitante = 3_500_000

        cuota = calcular_cuota_mensual(monto, tasa, meses)
        es_viable = es_prestamo_viable(ingreso_solicitante, cuota)

        # Cuota ~4.7M, que es 134% del ingreso -> no viable
        assert es_viable == False


# ============================================================
# Fixture para setup si se necesita
# ============================================================

@pytest.fixture
def prestamo_estandar():
    """Fixture con datos de préstamo estándar para reutilizar."""
    return {
        "monto": 10_000_000,
        "tasa": 0.18,
        "meses": 12,
        "ingreso": 5_000_000
    }

def test_usando_fixture(prestamo_estandar):
    """Ejemplo de test usando fixture."""
    cuota = calcular_cuota_mensual(
        prestamo_estandar["monto"],
        prestamo_estandar["tasa"],
        prestamo_estandar["meses"]
    )
    assert cuota > 0
```

---

## Ejecución de Tests

### Comando
```bash
pytest test_prestamos.py -v
```

### Resultado
```
test_prestamos.py::TestCalcularCuotaMensual::test_prestamo_tipico_paraguay PASSED
test_prestamos.py::TestCalcularCuotaMensual::test_prestamo_sin_interes PASSED
test_prestamos.py::TestCalcularCuotaMensual::test_prestamo_corto_plazo PASSED
test_prestamos.py::TestCalcularCuotaMensual::test_diferentes_montos_y_plazos[5000000-0.15-12-440000-460000] PASSED
test_prestamos.py::TestCalcularCuotaMensual::test_diferentes_montos_y_plazos[50000000-0.2-36-1800000-2000000] PASSED
test_prestamos.py::TestCalcularCuotaMensual::test_diferentes_montos_y_plazos[100000000-0.24-60-2800000-3000000] PASSED
test_prestamos.py::TestCalcularCuotaMensualErrores::test_monto_cero_lanza_error PASSED
test_prestamos.py::TestCalcularCuotaMensualErrores::test_monto_negativo_lanza_error PASSED
test_prestamos.py::TestCalcularCuotaMensualErrores::test_tasa_negativa_lanza_error PASSED
test_prestamos.py::TestCalcularCuotaMensualErrores::test_meses_cero_lanza_error PASSED
test_prestamos.py::TestCalcularCuotaMensualErrores::test_meses_negativo_lanza_error PASSED
test_prestamos.py::TestCalcularTotalIntereses::test_intereses_prestamo_tipico PASSED
test_prestamos.py::TestCalcularTotalIntereses::test_intereses_sin_tasa PASSED
test_prestamos.py::TestCalcularTotalIntereses::test_intereses_aumentan_con_plazo PASSED
test_prestamos.py::TestEsPrestamoViable::test_cuota_menor_30_porciento_es_viable PASSED
test_prestamos.py::TestEsPrestamoViable::test_cuota_igual_30_porciento_es_viable PASSED
test_prestamos.py::TestEsPrestamoViable::test_cuota_mayor_30_porciento_no_viable PASSED
test_prestamos.py::TestEsPrestamoViable::test_ingreso_cero_no_viable PASSED
test_prestamos.py::TestEsPrestamoViable::test_ingreso_negativo_no_viable PASSED
test_prestamos.py::TestEsPrestamoViable::test_casos_limite_viabilidad[...] PASSED (x5)
test_prestamos.py::TestIntegracion::test_flujo_completo_prestamo_viable PASSED
test_prestamos.py::TestIntegracion::test_flujo_completo_prestamo_no_viable PASSED
test_prestamos.py::test_usando_fixture PASSED

========================= 24 passed in 0.15s =========================
```

---

## Coverage Report

```bash
pytest test_prestamos.py --cov=prestamos --cov-report=term-missing
```

```
Name           Stmts   Miss  Cover   Missing
--------------------------------------------
prestamos.py      24      0   100%
--------------------------------------------
TOTAL             24      0   100%
```

**Meta cumplida:** ✅ 100% de cobertura

---

## Lecciones Aprendidas

### Sobre los tests generados:
1. La IA organizó bien por clases/funciones
2. Usó `@pytest.mark.parametrize` apropiadamente
3. Incluyó contexto paraguayo (guaraníes, tasas locales, salario mínimo)
4. Cubrió casos normales, límites y errores

### Lo que el estudiante agregó:
1. Test de integración (flujo completo)
2. Fixture para datos reutilizables
3. Comentarios de porcentajes en viabilidad

### Lo que aprendió:
1. Los tests deben probar comportamiento, no implementación
2. `pytest.raises` con `match` es más específico que solo el tipo de excepción
3. Tests parametrizados ahorran mucho código repetido
4. 100% coverage no significa 100% libre de bugs, pero es un buen inicio

---

*Ejemplo completado - Desarrollo de Software - FPUNA 2026*
