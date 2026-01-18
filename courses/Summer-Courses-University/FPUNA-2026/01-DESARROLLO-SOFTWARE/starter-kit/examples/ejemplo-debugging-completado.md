# Ejemplo Completado: Debugging Asistido por IA

## Contexto
Este es un ejemplo de cómo un estudiante usó IA para debuggear código Python, siguiendo el proceso estructurado del Ejercicio 1.

---

## El Problema

El estudiante tenía este código que no funcionaba:

```python
# sistema_notas.py
def calcular_estado_estudiante(notas, nombre):
    if len(notas) = 0:
        return f"{nombre}: Sin notas registradas"

    promedio = sum(notas) / len(nota)

    if promedio >= 60
        estado = "APROBADO"
    elif promedio >= 40:
        estado = "RECUPERATORIO"
    else:
        estado = "REPROBADO"

    return f"{nombre}: {promedio:.1f} - {estado}"

# Prueba
estudiantes = [
    ("María García", [85, 90, 78]),
    ("Juan López", [45, 50, 38]),
    ("Ana Benítez", [])
]

for nombre, notas in estudiantes:
    print(calcular_estado_estudiante(notas, nombre)
```

### Error al ejecutar
```
  File "sistema_notas.py", line 2
    if len(notas) = 0:
                  ^
SyntaxError: invalid syntax
```

---

## Intento 1: Prompt Vago (INCORRECTO)

```
mi codigo no funciona ayuda
```

### Respuesta de la IA
> "Por favor, proporciona el código y el mensaje de error para poder ayudarte."

**Resultado:** No pudo ayudar sin información.

---

## Intento 2: Prompt Estructurado (CORRECTO)

```
Tengo este código Python que da errores. Ayúdame a debuggearlo.

**Código:**
```python
def calcular_estado_estudiante(notas, nombre):
    if len(notas) = 0:
        return f"{nombre}: Sin notas registradas"

    promedio = sum(notas) / len(nota)

    if promedio >= 60
        estado = "APROBADO"
    elif promedio >= 40:
        estado = "RECUPERATORIO"
    else:
        estado = "REPROBADO"

    return f"{nombre}: {promedio:.1f} - {estado}"

for nombre, notas in estudiantes:
    print(calcular_estado_estudiante(notas, nombre)
```

**Error que aparece:**
```
  File "sistema_notas.py", line 2
    if len(notas) = 0:
                  ^
SyntaxError: invalid syntax
```

**Lo que intento hacer:**
Calcular el promedio de notas de estudiantes y determinar
si aprobaron, van a recuperatorio o reprobaron.

**Lo que ya intenté:**
Revisar la sintaxis pero no encuentro el problema.

Por favor:
1. Identifica TODOS los errores (puede haber más de uno)
2. Explica por qué cada uno es un error
3. Dame el código corregido
4. Explica qué aprender de cada error para no repetirlos
```

---

## Respuesta de la IA

### Errores Identificados

| Error # | Línea | Problema | Corrección |
|---------|-------|----------|------------|
| 1 | 2 | `=` en vez de `==` | Usar `==` para comparación |
| 2 | 5 | `nota` en vez de `notas` | Corregir nombre de variable |
| 3 | 7 | Falta `:` después de `if promedio >= 60` | Agregar dos puntos |
| 4 | 18 | Falta `)` al final del print | Cerrar paréntesis |

### Explicación de cada error

**Error 1: Operador de comparación**
```python
# Incorrecto
if len(notas) = 0:  # = es asignación

# Correcto
if len(notas) == 0:  # == es comparación
```
*Aprendizaje: En Python, `=` asigna valores, `==` compara valores.*

**Error 2: Nombre de variable incorrecto**
```python
# Incorrecto
promedio = sum(notas) / len(nota)  # 'nota' no existe

# Correcto
promedio = sum(notas) / len(notas)  # 'notas' es el parámetro
```
*Aprendizaje: Cuidado con typos en nombres de variables. Python es case-sensitive.*

**Error 3: Sintaxis de if**
```python
# Incorrecto
if promedio >= 60  # Falta :

# Correcto
if promedio >= 60:  # Los bloques if necesitan :
```
*Aprendizaje: Todos los bloques en Python (if, for, def, class) terminan con `:`*

**Error 4: Paréntesis sin cerrar**
```python
# Incorrecto
print(calcular_estado_estudiante(notas, nombre)  # Falta )

# Correcto
print(calcular_estado_estudiante(notas, nombre))  # Cerrado
```
*Aprendizaje: Contar paréntesis. Muchos editores los resaltan cuando no coinciden.*

---

## Código Corregido

```python
# sistema_notas.py - CORREGIDO
def calcular_estado_estudiante(notas, nombre):
    # Error 1: Cambiado = por ==
    if len(notas) == 0:
        return f"{nombre}: Sin notas registradas"

    # Error 2: Cambiado nota por notas
    promedio = sum(notas) / len(notas)

    # Error 3: Agregado : después de la condición
    if promedio >= 60:
        estado = "APROBADO"
    elif promedio >= 40:
        estado = "RECUPERATORIO"
    else:
        estado = "REPROBADO"

    return f"{nombre}: {promedio:.1f} - {estado}"

# Prueba
estudiantes = [
    ("María García", [85, 90, 78]),
    ("Juan López", [45, 50, 38]),
    ("Ana Benítez", [])
]

# Error 4: Agregado ) al final
for nombre, notas in estudiantes:
    print(calcular_estado_estudiante(notas, nombre))
```

---

## Verificación

### Ejecución del código corregido

```bash
$ python sistema_notas.py
María García: 84.3 - APROBADO
Juan López: 44.3 - RECUPERATORIO
Ana Benítez: Sin notas registradas
```

**Resultado:** ✅ Funciona correctamente

---

## Prevención de Errores Futuros

### Herramientas configuradas

1. **Extensión Python para VS Code**
   - Instalada: ✅
   - Resalta errores de sintaxis en tiempo real

2. **Pylint instalado**
   ```bash
   pip install pylint
   ```
   - Detecta errores antes de ejecutar

3. **Autoformato activado**
   - Black configurado para formatear al guardar
   ```bash
   pip install black
   ```

### Resultado con Pylint

```bash
$ pylint sistema_notas_original.py
sistema_notas.py:2:18: E0001: invalid syntax (<unknown>, line 2) (syntax-error)
```

**Hubiera detectado el error inmediatamente.**

---

## Bug Challenge Adicional Completado

### Código con errores sutiles

```python
def buscar_mayor(numeros):
    mayor = 0
    for num in numeros:
        if num > mayor:
            mayor = num
    return mayor

# Pruebas
print(buscar_mayor([5, 2, 8, 1]))    # Esperado: 8
print(buscar_mayor([-5, -2, -8]))    # Esperado: -2
print(buscar_mayor([]))              # ¿Qué pasa?
```

### Errores identificados

| Error | Descripción | Impacto |
|-------|-------------|---------|
| 1 | `mayor = 0` falla con negativos | Retorna 0 cuando todos son negativos |
| 2 | Lista vacía no manejada | Retorna 0 (debería indicar error) |

### Código corregido

```python
def buscar_mayor(numeros):
    # Manejar lista vacía
    if not numeros:
        raise ValueError("La lista no puede estar vacía")

    # Iniciar con primer elemento, no con 0
    mayor = numeros[0]

    for num in numeros[1:]:  # Empezar desde el segundo
        if num > mayor:
            mayor = num
    return mayor

# Pruebas
print(buscar_mayor([5, 2, 8, 1]))    # 8 ✅
print(buscar_mayor([-5, -2, -8]))    # -2 ✅
try:
    print(buscar_mayor([]))
except ValueError as e:
    print(f"Error: {e}")  # Error: La lista no puede estar vacía ✅
```

---

## Template de Debugging Guardado

```markdown
## Debugging Request

**Lenguaje:** Python 3.11
**Entorno:** VS Code en Windows 11

**Código:**
```python
[código aquí]
```

**Error exacto:**
```
[mensaje de error copiado]
```

**Comportamiento esperado:**
[qué debería hacer el código]

**Comportamiento actual:**
[qué hace realmente]

**Lo que ya intenté:**
1. [intento 1]
2. [intento 2]

Por favor identifica el error y explica cómo corregirlo.
```

---

## Lecciones Aprendidas

### Sobre los errores:
1. Los errores de sintaxis (`=` vs `==`) son comunes pero fáciles de prevenir con linters
2. Los typos en nombres de variables son traicioneros - usar autocompletado
3. Siempre cerrar paréntesis/brackets antes de escribir el contenido

### Sobre el proceso:
1. El prompt estructurado obtuvo respuesta útil inmediatamente
2. Pedir "todos los errores" es crucial - había 4, no solo 1
3. Pedir explicaciones ayuda a no repetir errores

### Sobre herramientas:
1. Pylint hubiera encontrado todos los errores antes de ejecutar
2. VS Code con extensión Python resalta errores en tiempo real
3. Invertir 10 minutos en configuración ahorra horas de debugging

---

## Reflexión del Estudiante

> "Antes de este ejercicio, copiaba el error a Google y buscaba en Stack Overflow. A veces tardaba 30 minutos en entender la respuesta. Con el prompt estructurado, obtuve la solución en 2 minutos, con explicaciones claras. Pero lo más importante fue configurar Pylint - ahora veo los errores antes de ejecutar."
>
> — Estudiante de Informática, FPUNA

---

*Ejemplo completado - Desarrollo de Software - FPUNA 2026*
