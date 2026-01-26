# Checklist de Verificación - Código Generado por IA

## Cómo verificar que el output de la IA es correcto

---

## Proceso de Verificación en 5 Pasos

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   1. LEER        ¿Entiendo qué hace?                        │
│        ↓                                                     │
│   2. EJECUTAR    ¿Corre sin errores?                        │
│        ↓                                                     │
│   3. TESTEAR     ¿Produce resultados correctos?             │
│        ↓                                                     │
│   4. EDGE CASES  ¿Maneja casos límite?                      │
│        ↓                                                     │
│   5. REVISAR     ¿Es seguro y eficiente?                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Paso 1: LEER - Comprensión del Código

### Checklist de Lectura

- [ ] ¿Puedo explicar qué hace cada función?
- [ ] ¿Entiendo el flujo de datos?
- [ ] ¿Reconozco todas las librerías usadas?
- [ ] ¿Los nombres de variables/funciones tienen sentido?
- [ ] ¿Hay partes que no entiendo? (Si sí, preguntar a IA que explique)

### Señales de Alerta 🚩

```python
# 🚩 Código que no entiendes
resultado = functools.reduce(lambda x, y: x if x > y else y, lista)
# Si no sabes qué hace reduce/lambda, NO lo uses hasta entender

# 🚩 Librerías desconocidas
from obscure_lib import magic_function
# Verificar que la librería existe y es confiable

# 🚩 Código muy "inteligente"
x = [i for i in range(n) if all(i % j for j in range(2, i))]
# Preferir código legible sobre "clever"
```

---

## Paso 2: EJECUTAR - Prueba Básica

### Checklist de Ejecución

- [ ] ¿El código corre sin errores de sintaxis?
- [ ] ¿No hay errores de importación?
- [ ] ¿Las dependencias están instaladas?
- [ ] ¿Funciona con un caso simple?

### Cómo Probar

```bash
# 1. Crear ambiente aislado (opcional pero recomendado)
python -m venv test_env
source test_env/bin/activate  # Linux/Mac
# o test_env\Scripts\activate  # Windows

# 2. Instalar dependencias
pip install -r requirements.txt

# 3. Ejecutar
python script.py

# 4. Verificar output
```

### Errores Comunes de IA

```python
# Error 1: Import incorrecto
from sklearn import LinearRegression  # ❌
from sklearn.linear_model import LinearRegression  # ✅

# Error 2: Función inexistente
df.auto_fill_missing()  # ❌ No existe
df.fillna(method='ffill')  # ✅ Existe

# Error 3: API desactualizada
openai.Completion.create()  # ❌ API vieja
client.chat.completions.create()  # ✅ API nueva
```

---

## Paso 3: TESTEAR - Verificar Resultados

### Checklist de Testing

- [ ] ¿El output es el esperado para input conocido?
- [ ] ¿Los tipos de datos son correctos?
- [ ] ¿Los valores están en rangos razonables?
- [ ] ¿La función es determinística (mismo input = mismo output)?

### Técnicas de Testing

#### 3.1 Testing Manual Rápido

```python
# Probar con valores conocidos
def suma(a, b):
    return a + b

# Verificación manual
assert suma(2, 3) == 5
assert suma(-1, 1) == 0
assert suma(0, 0) == 0
print("Tests básicos pasaron ✅")
```

#### 3.2 Testing con pytest

```python
# test_functions.py
import pytest
from my_module import suma

def test_suma_positivos():
    assert suma(2, 3) == 5

def test_suma_negativos():
    assert suma(-2, -3) == -5

def test_suma_cero():
    assert suma(0, 0) == 0
```

```bash
# Ejecutar
pytest test_functions.py -v
```

#### 3.3 Comparación con Implementación Conocida

```python
# Si la IA genera un algoritmo, comparar con implementación confiable
import numpy as np

def mi_promedio(lista):
    # Código generado por IA
    return sum(lista) / len(lista)

# Verificar contra numpy (confiable)
test_data = [1, 2, 3, 4, 5]
assert mi_promedio(test_data) == np.mean(test_data)
```

---

## Paso 4: EDGE CASES - Casos Límite

### Checklist de Edge Cases

- [ ] ¿Qué pasa con lista/string vacío?
- [ ] ¿Qué pasa con None/null?
- [ ] ¿Qué pasa con números negativos?
- [ ] ¿Qué pasa con valores muy grandes?
- [ ] ¿Qué pasa con tipos incorrectos?
- [ ] ¿Qué pasa con caracteres especiales?

### Casos a Probar Siempre

```python
def probar_edge_cases(funcion):
    """Template de edge cases comunes"""

    casos = [
        # Vacíos
        [],
        "",
        {},
        None,

        # Un elemento
        [1],
        "a",

        # Negativos
        [-1, -2, -3],
        -999,

        # Grandes
        list(range(10000)),
        10**18,

        # Tipos mixtos (si aplica)
        [1, "dos", 3.0],

        # Caracteres especiales
        "áéíóú ñ 中文",
        "'; DROP TABLE users;--",  # SQL injection
    ]

    for caso in casos:
        try:
            resultado = funcion(caso)
            print(f"✅ {caso[:20]}... → {resultado}")
        except Exception as e:
            print(f"❌ {caso[:20]}... → {type(e).__name__}: {e}")
```

### Ejemplo de IA Fallando en Edge Case

```python
# Código de IA para calcular promedio
def promedio(numeros):
    return sum(numeros) / len(numeros)

# Funciona:
promedio([1, 2, 3])  # → 2.0 ✅

# FALLA:
promedio([])  # → ZeroDivisionError ❌

# Versión corregida:
def promedio_seguro(numeros):
    if not numeros:
        return 0  # o raise ValueError("Lista vacía")
    return sum(numeros) / len(numeros)
```

---

## Paso 5: REVISAR - Seguridad y Calidad

### Checklist de Seguridad

- [ ] ¿Hay SQL injection posible?
- [ ] ¿Se valida input del usuario?
- [ ] ¿Se escapan strings para HTML/comandos?
- [ ] ¿Se manejan errores apropiadamente?
- [ ] ¿No hay credenciales hardcodeadas?
- [ ] ¿Los archivos se cierran correctamente?

### Patrones Peligrosos a Buscar

```python
# 🚩 SQL Injection
query = f"SELECT * FROM users WHERE id = {user_id}"  # ❌ PELIGROSO

# 🚩 Command Injection
os.system(f"rm {filename}")  # ❌ PELIGROSO

# 🚩 Credenciales en código
API_KEY = "sk-abc123..."  # ❌ NUNCA

# 🚩 eval() con input de usuario
eval(user_input)  # ❌ EXTREMADAMENTE PELIGROSO

# 🚩 Deserialización insegura
pickle.loads(user_data)  # ❌ PELIGROSO
```

### Checklist de Calidad

- [ ] ¿El código es legible?
- [ ] ¿Hay documentación/comentarios donde es necesario?
- [ ] ¿Se siguen convenciones del proyecto?
- [ ] ¿No hay código duplicado?
- [ ] ¿La complejidad es razonable?
- [ ] ¿El performance es aceptable?

### Herramientas de Análisis

```bash
# Linting (detecta errores comunes)
pip install flake8
flake8 mi_codigo.py

# Seguridad
pip install bandit
bandit mi_codigo.py

# Complejidad
pip install radon
radon cc mi_codigo.py -a

# Type checking
pip install mypy
mypy mi_codigo.py
```

---

## Plantilla de Verificación Rápida

```markdown
## Verificación de Código: [nombre del archivo/función]

### 1. Comprensión
- [ ] Entiendo el propósito general
- [ ] Entiendo cada función/método
- [ ] Conozco las librerías usadas

### 2. Ejecución
- [ ] Corre sin errores
- [ ] Dependencias instaladas
- [ ] Output básico correcto

### 3. Testing
- [ ] Test caso normal: ___________
- [ ] Test caso 2: ___________
- [ ] Test caso 3: ___________

### 4. Edge Cases
- [ ] Lista vacía: ___________
- [ ] None: ___________
- [ ] Valores extremos: ___________

### 5. Seguridad/Calidad
- [ ] No hay vulnerabilidades obvias
- [ ] Código legible
- [ ] Sin hardcoded secrets

### Resultado: [ ] APROBADO / [ ] NECESITA CAMBIOS
```

---

## Niveles de Verificación por Contexto

| Contexto | Nivel de Verificación |
|----------|----------------------|
| Aprendizaje/práctica | Básico (pasos 1-2) |
| Proyecto personal | Medio (pasos 1-4) |
| Proyecto profesional | Completo (pasos 1-5) |
| Código de producción | Completo + code review |
| Código crítico/seguridad | Completo + auditoría externa |

---

## Cuando Rechazar Código de IA

Rechaza y pide nueva versión si:

1. **No entiendes qué hace** → Pide explicación o versión más simple
2. **Usa librerías desconocidas** → Pide alternativa con librerías estándar
3. **Falla en casos básicos** → Reporta el error y pide corrección
4. **Tiene problemas de seguridad** → Señala el problema específico
5. **Es demasiado complejo** → Pide versión más simple y legible

---

*VERIFICATION-CHECKLIST.md - FPUNA 2026*
