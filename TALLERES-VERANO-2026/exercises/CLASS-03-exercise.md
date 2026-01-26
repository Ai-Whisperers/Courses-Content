# Ejercicio Clase 3: Generación de Código con IA

**Duración**: 15 minutos  
**Dificultad**: Intermedio  
**Herramienta**: OpenCode

---

## Objetivo

Aprender a usar OpenCode para generar, explicar y debuggear código.

---

## Ejercicio 1: Generar una Función Simple

### Tarea

Pide a OpenCode que cree una función para validar cédulas paraguayas:

```
Crea una función en Python que valide si un número de cédula 
paraguaya es válido. 

Reglas:
- Debe tener entre 1 y 8 dígitos
- Solo números (sin puntos ni guiones)
- No puede empezar con 0

La función debe:
- Recibir un string
- Retornar True si es válida, False si no
- Incluir docstring explicando el uso
- Incluir 3 casos de prueba como comentarios

Estilo: PEP 8, con type hints.
```

### Resultado Esperado

```python
def validar_cedula(cedula: str) -> bool:
    """
    Valida si una cédula paraguaya tiene formato correcto.
    
    Args:
        cedula: String con el número de cédula (sin puntos)
    
    Returns:
        True si el formato es válido, False en caso contrario
    
    Examples:
        >>> validar_cedula("1234567")
        True
        >>> validar_cedula("01234567")
        False
        >>> validar_cedula("12345678901")
        False
    """
    # Verificar que solo contenga dígitos
    if not cedula.isdigit():
        return False
    
    # Verificar longitud (1-8 dígitos)
    if not (1 <= len(cedula) <= 8):
        return False
    
    # No puede empezar con 0
    if cedula.startswith('0'):
        return False
    
    return True

# Casos de prueba
# validar_cedula("1234567")   # True - válida
# validar_cedula("0123456")   # False - empieza con 0
# validar_cedula("123456789") # False - muy larga
```

---

## Ejercicio 2: Explicar Código Existente

### Tarea

Pide a OpenCode que explique este código:

```
Explica qué hace este código línea por línea, 
como si le explicaras a alguien que está aprendiendo Python:

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

resultado = [fibonacci(i) for i in range(10)]
print(resultado)
```

¿Qué imprime? ¿Por qué es ineficiente para números grandes?
```

---

## Ejercicio 3: Debuggear Código

### El Código con Bug

```python
def calcular_promedio(notas):
    total = 0
    for nota in notas:
        total += nota
    promedio = total / len(notas)
    return promedio

# Esto falla:
resultado = calcular_promedio([])
```

### Tarea

Pide a OpenCode:

```
Este código tiene un bug. Cuando paso una lista vacía, falla.

1. Explica por qué falla
2. Muestra el mensaje de error que produce
3. Corrige el código para manejar listas vacías
4. Agrega validación para que solo acepte números
```

---

## Ejercicio 4: Generar Tests

### Tarea

```
Para la función validar_cedula del Ejercicio 1, genera tests 
usando pytest que cubran:

1. Cédulas válidas (casos normales)
2. Cédulas inválidas por longitud
3. Cédulas con caracteres no numéricos
4. Cédulas que empiezan con 0
5. Casos edge (string vacío, None)

Formato: archivo de test completo listo para ejecutar.
```

---

## Checklist de Completación

- [ ] Generé función de validación de cédula
- [ ] La función tiene type hints y docstring
- [ ] Entendí la explicación del código Fibonacci
- [ ] Identifiqué y corregí el bug del promedio
- [ ] Generé tests con pytest
- [ ] Ejecuté los tests (opcional, si tienes Python instalado)

---

## Tips para Código con IA

1. **Sé específico con el lenguaje** - "Python 3.11" vs solo "Python"
2. **Pide estilo** - "PEP 8", "type hints", "docstrings"
3. **Incluye contexto** - Para qué es el código, quién lo usará
4. **Pide tests** - Siempre genera tests junto con el código
5. **Verifica el resultado** - ¡La IA puede equivocarse!

---

## Reflexión

1. ¿El código generado funcionó a la primera?
2. ¿Qué ajustes tuviste que hacer?
3. ¿En qué tareas de programación usarías IA? ¿En cuáles no?

---

**Próximo paso**: Clase 4 - Electrónica y Automatización
