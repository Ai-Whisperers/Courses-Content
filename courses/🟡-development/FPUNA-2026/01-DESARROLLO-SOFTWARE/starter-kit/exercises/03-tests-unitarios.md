# Ejercicio 3: Generar Tests Unitarios

## Objetivo
Usar IA para crear tests que validen tu código automáticamente.

## Duración
45-60 minutos

## Prerrequisitos
- Conocimiento básico de Python
- pytest instalado (`pip install pytest`)

---

## Parte 1: El Código a Testear (5 minutos)

### Función objetivo
Vamos a crear tests para esta calculadora de calificaciones:

```python
# calificaciones.py

def calcular_promedio(notas: list[float]) -> float:
    """Calcula el promedio de una lista de notas."""
    if not notas:
        raise ValueError("La lista de notas no puede estar vacía")
    return sum(notas) / len(notas)

def determinar_estado(promedio: float) -> str:
    """Determina si el estudiante aprobó o reprobó."""
    if promedio < 0 or promedio > 100:
        raise ValueError("El promedio debe estar entre 0 y 100")

    if promedio >= 60:
        return "APROBADO"
    else:
        return "REPROBADO"

def calcular_nota_necesaria(notas_actuales: list[float], meta: float) -> float:
    """Calcula qué nota necesita en el próximo examen para alcanzar la meta."""
    if not notas_actuales:
        return meta

    promedio_actual = sum(notas_actuales)
    total_examenes = len(notas_actuales) + 1
    nota_necesaria = (meta * total_examenes) - promedio_actual

    return round(nota_necesaria, 2)
```

### Guarda el archivo
Crea `calificaciones.py` con este código.

---

## Parte 2: Entender Testing (10 minutos)

### Antes de pedir a la IA

**¿Qué es un test unitario?**
- Prueba una función de forma aislada
- Verifica que produce el resultado esperado
- Detecta si cambios rompen funcionalidad

**¿Qué casos debemos probar?**
1. **Caso normal:** Entrada típica, resultado esperado
2. **Casos límite:** Valores en los bordes (0, 100, lista vacía)
3. **Casos de error:** Entradas inválidas que deben fallar

### Piensa primero
Antes de pedir a la IA, identifica:

| Función | Caso normal | Caso límite | Caso de error |
|---------|-------------|-------------|---------------|
| calcular_promedio | | | |
| determinar_estado | | | |
| calcular_nota_necesaria | | | |

---

## Parte 3: Generar Tests con IA (15 minutos)

### Prompt para generar tests
```
Genera tests unitarios con pytest para este código Python:

[Pegar el código de calificaciones.py]

Requisitos:
1. Usar pytest (no unittest)
2. Probar casos normales, límites y errores
3. Al menos 3 tests por función
4. Nombres descriptivos en español
5. Docstrings explicando qué prueba cada test
6. Usar pytest.raises para excepciones

Formato del archivo de tests:
- Nombre: test_calificaciones.py
- Importar las funciones correctamente
- Organizar tests por función
```

### Guarda los tests generados
Crea `test_calificaciones.py` con el código generado.

---

## Parte 4: Ejecutar Tests (10 minutos)

### Comandos básicos

```bash
# Ejecutar todos los tests
pytest test_calificaciones.py

# Ver detalle de cada test
pytest test_calificaciones.py -v

# Ver output de prints
pytest test_calificaciones.py -s

# Parar en el primer fallo
pytest test_calificaciones.py -x
```

### Ejecuta y registra

| Comando | Resultado | Tests pasados | Tests fallidos |
|---------|-----------|---------------|----------------|
| `pytest -v` | | | |

### Si hay tests que fallan
1. ¿El test está mal o el código está mal?
2. Pide a la IA que analice:

```
Este test falla:
[Pegar el test]

El error es:
[Pegar el error]

El código siendo testeado es:
[Pegar la función]

¿El problema está en el test o en el código?
Explica y sugiere la corrección.
```

---

## Parte 5: Mejorar Tests (10 minutos)

### Agregar casos adicionales
Pide a la IA:

```
Los tests básicos pasan. Ahora necesito tests más robustos:

1. Tests con números decimales
2. Tests con listas muy largas (100 notas)
3. Tests con valores float vs int
4. Tests parametrizados para probar múltiples inputs

Código actual de tests:
[Pegar tests actuales]

Agrega estos tests adicionales usando @pytest.mark.parametrize
donde sea apropiado.
```

### Ejecuta nuevamente
```bash
pytest test_calificaciones.py -v
```

---

## Parte 6: Coverage (5 minutos)

### Instalar
```bash
pip install pytest-cov
```

### Ejecutar con coverage
```bash
pytest test_calificaciones.py --cov=calificaciones --cov-report=term-missing
```

### Interpretar el resultado
- **Stmts:** Total de líneas de código
- **Miss:** Líneas no cubiertas por tests
- **Cover:** Porcentaje de cobertura

### Meta
- [ ] 80%+ de cobertura

### Si faltan líneas
```
Mi coverage es X%. Estas líneas no están cubiertas:
[Pegar las líneas del reporte]

Genera tests adicionales para cubrir estas líneas.
```

---

## Template para Pedir Tests

```
Genera tests para esta función Python:

**Función:**
```python
[código de la función]
```

**Casos a probar:**
1. Entrada normal: [ejemplo]
2. Caso límite: [ejemplo]
3. Error esperado: [ejemplo]

**Framework:** pytest
**Estilo:** Tests descriptivos en español
**Extra:** Usar fixtures si es necesario

Por favor genera el código completo del archivo de tests.
```

---

## Entregable

### Tu archivo de tests

Sube `test_calificaciones.py` con:
- Al menos 9 tests (3 por función)
- Coverage > 80%
- Todos los tests pasando

### Reporte de coverage
```
Pegar aquí el output de pytest-cov
```

---

## Criterios de Éxito

- [ ] Generaste tests con ayuda de IA
- [ ] Todos los tests pasan (`pytest` verde)
- [ ] Probaste casos normales, límites y errores
- [ ] Ejecutaste coverage
- [ ] Entiendes qué hace cada test

---

## Siguiente Paso

Aplica esto a tu próximo proyecto:
1. Escribe la función
2. Pide tests a la IA
3. Ejecuta tests
4. Itera hasta 100% verde

---

*Ejercicio 3 - Desarrollo de Software - FPUNA 2026*
