# Ejercicio Práctico: Módulo 5
## Código de Investigación con IA

---

## Objetivo

Desarrollar un script de análisis de datos reproducible utilizando asistencia de IA, con documentación apropiada y estructura modular.

**Duración:** 45 minutos

---

## Parte 1: Diseño del Pipeline (10 minutos)

### Paso 1.1: Definir el Problema

Complete la siguiente información sobre su análisis:

| Elemento | Descripción |
|----------|-------------|
| **Objetivo del análisis** | |
| **Datos de entrada** | |
| **Pasos del procesamiento** | |
| **Output esperado** | |

### Paso 1.2: Diseñar Estructura

Dibuje o describa el flujo de su pipeline:

```
ENTRADA → [Paso 1] → [Paso 2] → [Paso 3] → SALIDA
   ↓          ↓          ↓          ↓         ↓
  CSV      Limpieza   Análisis   Visualización  Excel
```

**Su diseño:**

```
[Entrada] → [        ] → [        ] → [        ] → [Salida]
```

### Paso 1.3: Identificar Funciones Necesarias

Liste las funciones que necesitará:

| # | Nombre de Función | Input | Output | Descripción |
|---|-------------------|-------|--------|-------------|
| 1 | `load_data()` | filepath | DataFrame | Carga datos desde CSV |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

---

## Parte 2: Generación de Código con IA (20 minutos)

### Paso 2.1: Preparar Prompt

Use el siguiente template para su prompt:

```
Necesito un script de Python para análisis de investigación:

OBJETIVO:
[Describir qué quiere analizar]

DATOS:
- Archivo: [nombre.csv]
- Columnas: [listar columnas]
- Filas: aproximadamente [N]

ANÁLISIS REQUERIDO:
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

OUTPUT:
- [Tipo de output 1]
- [Tipo de output 2]

REQUISITOS:
- Código documentado con docstrings (estilo NumPy)
- Semilla aleatoria para reproducibilidad
- Manejo de errores básico
- Compatible con Python 3.9+
```

**Su prompt completo:**

_______________________________________________

_______________________________________________

_______________________________________________

### Paso 2.2: Obtener y Revisar Código

Pegue el código generado y revíselo críticamente:

```python
# Pegue aquí el código generado por IA
```

### Paso 2.3: Checklist de Revisión

Evalúe el código generado:

| Criterio | ✓ | Comentarios |
|----------|---|-------------|
| ¿Imports correctos y necesarios? | | |
| ¿Funciones tienen docstrings? | | |
| ¿Hay semilla aleatoria? | | |
| ¿Maneja errores básicos? | | |
| ¿Variables tienen nombres claros? | | |
| ¿Código es modular? | | |
| ¿Output es correcto? | | |

### Paso 2.4: Modificaciones Necesarias

Liste los cambios que hará al código:

| # | Línea/Sección | Problema | Corrección |
|---|---------------|----------|------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

---

## Parte 3: Documentación (10 minutos)

### Paso 3.1: Crear Docstring Principal

Escriba el docstring para el módulo/script:

```python
"""
[Título del Script]

Descripción:
[Qué hace este script]

Autor: [Su nombre]
Fecha: [Fecha]
Versión: 1.0

Uso:
    python script.py --input datos.csv --output resultados.xlsx

Dependencias:
    - pandas >= 2.0
    - numpy >= 1.24
    - scipy >= 1.10

Ejemplo:
    >>> from mi_script import analyze_data
    >>> results = analyze_data('datos.csv')
"""
```

### Paso 3.2: Documentar Función Principal

Use el formato NumPy para la función más importante:

```python
def mi_funcion_principal(parametro1, parametro2):
    """
    [Descripción breve de la función]

    [Descripción más detallada si es necesario]

    Parameters
    ----------
    parametro1 : tipo
        Descripción del parámetro 1
    parametro2 : tipo
        Descripción del parámetro 2

    Returns
    -------
    tipo
        Descripción de lo que retorna

    Raises
    ------
    ExceptionType
        Cuándo se lanza esta excepción

    Examples
    --------
    >>> resultado = mi_funcion_principal(x, y)
    >>> print(resultado)
    """
    pass
```

### Paso 3.3: Crear requirements.txt

Liste las dependencias de su script:

```
pandas==
numpy==
scipy==
matplotlib==
seaborn==
```

---

## Parte 4: Prueba y Verificación (5 minutos)

### Paso 4.1: Datos de Prueba

Cree datos de prueba mínimos:

```python
# Generar datos de prueba
import pandas as pd
import numpy as np

np.random.seed(42)
test_data = pd.DataFrame({
    'id': range(1, 21),
    'grupo': ['A'] * 10 + ['B'] * 10,
    'valor': np.random.normal(50, 10, 20)
})

test_data.to_csv('test_data.csv', index=False)
```

### Paso 4.2: Ejecutar y Verificar

Ejecute su script con datos de prueba:

```bash
python mi_script.py --input test_data.csv --output test_results.xlsx
```

**Resultado:**

| Aspecto | Resultado | Notas |
|---------|-----------|-------|
| ¿Ejecuta sin errores? | Sí / No | |
| ¿Output es correcto? | Sí / No | |
| ¿Tiempo de ejecución razonable? | Sí / No | |

### Paso 4.3: Debugging con IA (si necesario)

Si hay errores, use este prompt:

```
Tengo el siguiente error en mi script de Python:

ERROR:
[Pegar mensaje de error]

CÓDIGO RELEVANTE:
[Pegar sección con error]

Por favor:
1. Explica qué causa el error
2. Sugiere la corrección
3. Indica cómo prevenir errores similares
```

---

## Entregable

Archivo .py o notebook .ipynb con:

1. **Script completo** funcionando
2. **Docstrings** en módulo y funciones principales
3. **requirements.txt** con versiones
4. **Ejemplo de uso** en comentarios o celda

---

## Rúbrica de Evaluación

| Criterio | Excelente (25) | Bueno (20) | Satisfactorio (15) | Insuficiente (10) |
|----------|----------------|------------|--------------------|--------------------|
| Funcionalidad | Ejecuta perfectamente, output correcto | Ejecuta con warnings menores | Ejecuta con errores menores | No ejecuta |
| Documentación | Docstrings completos, comentarios claros | Docstrings básicos | Comentarios mínimos | Sin documentación |
| Estructura | Modular, funciones bien definidas | Algo modular | Código lineal | Desorganizado |
| Reproducibilidad | Semilla, versions, rutas relativas | Falta un elemento | Faltan dos elementos | No reproducible |

**Total: 100 puntos**

---

## Reflexión

1. ¿Qué porcentaje del código final fue generado por IA vs escrito por usted?

   _______________________________________________

2. ¿Qué errores encontró en el código generado?

   _______________________________________________

3. ¿Cómo verificaría que el código produce resultados correctos?

   _______________________________________________

---

*Tiempo total estimado: 45 minutos*
