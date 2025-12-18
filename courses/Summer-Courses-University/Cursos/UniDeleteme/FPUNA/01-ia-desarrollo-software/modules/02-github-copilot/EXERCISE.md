# Ejercicio: GitHub Copilot
## Práctica Guiada

---

## Objetivo

Dominar el uso de GitHub Copilot para generar código de manera eficiente, entendiendo cuándo aceptar o rechazar sugerencias.

---

## Parte 1: Configuración y Prueba Básica (20 min)

### 1.1 Verificar Instalación

1. Abre VS Code
2. Verifica que el icono de Copilot esté en la barra inferior
3. El icono debe estar activo (no tachado)

Si hay problemas:
- Reinstalar extensión
- Cerrar y abrir VS Code
- Verificar autenticación

### 1.2 Primer Test

Crea un archivo `test_copilot.py` y escribe:

```python
# función que suma dos números
```

Observa la sugerencia de Copilot y presiona `Tab` para aceptar.

### 1.3 Explorar Sugerencias

Escribe este comentario y usa `Alt+]` para ver diferentes sugerencias:

```python
# función que verifica si un número es primo
```

Prueba al menos 3 sugerencias diferentes antes de elegir una.

---

## Parte 2: Generación de Funciones (30 min)

### 2.1 Ejercicio: Funciones de String

Crea un archivo `string_utils.py`. Usa Copilot para completar estas funciones:

```python
# Archivo: string_utils.py

def reverse_string(text: str) -> str:
    """Invierte un string."""
    # Deja que Copilot complete

def count_vowels(text: str) -> int:
    """Cuenta las vocales en un string (incluyendo acentuadas)."""
    # Deja que Copilot complete

def is_palindrome(text: str) -> bool:
    """Verifica si un texto es palíndromo (ignora espacios y mayúsculas)."""
    # Deja que Copilot complete

def capitalize_words(text: str) -> str:
    """Capitaliza la primera letra de cada palabra."""
    # Deja que Copilot complete
```

### 2.2 Verificación

Ejecuta estos tests para verificar:

```python
# Tests
assert reverse_string("hola") == "aloh"
assert count_vowels("Murciélago") == 5
assert is_palindrome("Anita lava la tina") == True
assert capitalize_words("hola mundo") == "Hola Mundo"

print("✓ Todos los tests pasaron!")
```

### 2.3 Documentación

- ¿Cuántas sugerencias aceptaste a la primera?
- ¿Cuáles tuviste que modificar?
- ¿Alguna no funcionó correctamente?

---

## Parte 3: Generar Clases (25 min)

### 3.1 Ejercicio: Clase Producto

Crea `models.py` y usa Copilot para crear una clase:

```python
# Archivo: models.py

# Clase Producto con propiedades: nombre, precio, stock
# Métodos: aplicar_descuento(porcentaje), hay_stock(), calcular_total(cantidad)
class Producto:
```

Deja que Copilot sugiera la implementación completa.

### 3.2 Verificación

```python
# Test de la clase
p = Producto("Laptop", 1500, 10)
assert p.nombre == "Laptop"
assert p.hay_stock() == True
assert p.calcular_total(2) == 3000

p.aplicar_descuento(10)
assert p.precio == 1350

print("✓ Clase Producto funciona correctamente!")
```

### 3.3 Extender con Copilot

Agrega estos métodos usando Copilot:

```python
class Producto:
    # ... código existente ...

    def __str__(self) -> str:
        """Representación string del producto."""

    def to_dict(self) -> dict:
        """Convierte el producto a diccionario."""

    @classmethod
    def from_dict(cls, data: dict) -> 'Producto':
        """Crea un producto desde un diccionario."""
```

---

## Parte 4: Copilot Chat (25 min)

### 4.1 Explicar Código

1. Abre Copilot Chat (`Ctrl+Shift+I`)
2. Selecciona este código y pide explicación:

```python
def mystery_function(n):
    return [i for i in range(2, n) if all(i % j != 0 for j in range(2, int(i**0.5) + 1))]
```

Prompt: `/explain qué hace esta función y cómo funciona paso a paso`

### 4.2 Generar Tests

1. Selecciona la función `reverse_string` de la Parte 2
2. Usa el comando: `/tests genera tests completos con pytest`
3. Crea un archivo `test_string_utils.py` con los tests generados

### 4.3 Corregir Errores

Pide a Copilot Chat que corrija este código con errores:

```python
def calculate_average(numbers):
    total = 0
    for num in numbers
        total += num
    average = total / len(numbers)
    return average
```

Prompt: `/fix encuentra y corrige los errores en este código`

### 4.4 Documentación

Selecciona la clase `Producto` y usa:

```
/doc genera docstrings completos para esta clase
```

---

## Parte 5: Proyecto Mini (20 min)

### 5.1 Crear un Módulo Completo

Usa Copilot para crear un archivo `calculator.py` con una calculadora científica:

```python
# Archivo: calculator.py
# Calculadora científica con operaciones básicas y científicas
# Incluir: suma, resta, multiplicación, división
# Incluir: potencia, raíz cuadrada, factorial, logaritmo
# Manejar errores apropiadamente (división por cero, raíz de negativo, etc.)

class Calculator:
```

### 5.2 Agregar Tests

Usa Copilot Chat para generar tests completos:

```
@workspace genera tests pytest para la clase Calculator
incluyendo casos de error
```

### 5.3 Refactoring

Si el código generado es largo, pide:

```
/fix refactoriza este código para que sea más limpio y mantenible
```

---

## Entregable

Repositorio con los siguientes archivos:

```
copilot-practice/
├── string_utils.py
├── test_string_utils.py
├── models.py
├── test_models.py
├── calculator.py
├── test_calculator.py
└── REFLECTION.md
```

### REFLECTION.md debe incluir:

1. **Estadísticas**: ¿Cuántas sugerencias aceptaste vs rechazaste?
2. **Errores encontrados**: ¿Qué errores tuvo el código de Copilot?
3. **Mejoras**: ¿Qué modificaste del código sugerido?
4. **Aprendizaje**: ¿Qué aprendiste sobre usar Copilot efectivamente?

---

## Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Funciones de string correctas | 20 |
| Clase Producto completa | 20 |
| Uso efectivo de Copilot Chat | 20 |
| Calculadora funcional | 25 |
| Reflexión documentada | 15 |
| **Total** | **100** |

---

## Tips para el Ejercicio

1. **No te apures**: Lee las sugerencias antes de aceptar
2. **Itera**: Si la primera sugerencia no es buena, prueba otra
3. **Contexto**: Agrega comentarios descriptivos
4. **Verifica**: Ejecuta los tests frecuentemente
5. **Documenta**: Anota lo que funciona y lo que no

---

*Tiempo total estimado: 2 horas*
