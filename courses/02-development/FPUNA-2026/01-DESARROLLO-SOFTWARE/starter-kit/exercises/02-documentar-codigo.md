# Ejercicio 2: Documentar Código Existente

## Objetivo
Usar IA para generar documentación clara para código sin comentarios.

## Duración
30-40 minutos

## Prerrequisitos
- Conocimiento básico de Python
- Entender qué es un docstring

---

## Parte 1: El Código Sin Documentar (5 minutos)

### El Problema
Heredaste este código de un proyecto anterior. No tiene documentación:

```python
def p(d, t):
    r = d * (1 + t/100)
    return r

def c(l, d):
    t = 0
    for i in l:
        if i > d:
            t += 1
    return t

def f(n):
    if n <= 1:
        return n
    return f(n-1) + f(n-2)

class V:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

    def m(self):
        return (self.x**2 + self.y**2 + self.z**2)**0.5

    def s(self, o):
        return V(self.x + o.x, self.y + o.y, self.z + o.z)
```

### Tu tarea
- ¿Entiendes qué hace cada función?
- ¿Podrías mantener este código en 6 meses?

---

## Parte 2: Pedir Ayuda para Entender (10 minutos)

### Prompt para análisis
```
Analiza este código Python y explícame qué hace cada función/clase:

[Pegar el código aquí]

Para cada función/método:
1. ¿Qué hace?
2. ¿Qué significan los parámetros?
3. ¿Qué retorna?
4. ¿Cuál sería un mejor nombre?
```

### Completa la tabla

| Función | Qué hace | Mejor nombre |
|---------|----------|--------------|
| p(d, t) | | |
| c(l, d) | | |
| f(n) | | |
| V | | |
| V.m() | | |
| V.s(o) | | |

---

## Parte 3: Generar Documentación (15 minutos)

### Prompt para documentar
```
Ahora que entiendo el código, genera una versión documentada:

1. Renombra funciones y variables con nombres descriptivos
2. Agrega docstrings en formato Google Style
3. Agrega type hints (anotaciones de tipo)
4. Agrega comentarios donde sea útil
5. Mantén la misma lógica

Código original:
[Pegar el código]
```

### Verifica la documentación generada

**Checklist de calidad:**
- [ ] ¿Los nombres de funciones describen lo que hacen?
- [ ] ¿Los parámetros tienen nombres claros?
- [ ] ¿Cada función tiene docstring?
- [ ] ¿Los type hints son correctos?
- [ ] ¿El código sigue funcionando igual?

---

## Parte 4: Comparación (5 minutos)

### Antes y Después

**Antes:**
```python
def p(d, t):
    r = d * (1 + t/100)
    return r
```

**Después (ejemplo):**
```python
def calcular_precio_con_impuesto(precio_base: float, porcentaje_impuesto: float) -> float:
    """
    Calcula el precio final aplicando un impuesto.

    Args:
        precio_base: El precio original del producto en guaraníes.
        porcentaje_impuesto: El porcentaje de impuesto a aplicar (ej: 10 para 10%).

    Returns:
        El precio final con el impuesto incluido.

    Example:
        >>> calcular_precio_con_impuesto(100000, 10)
        110000.0
    """
    precio_final = precio_base * (1 + porcentaje_impuesto / 100)
    return precio_final
```

### ¿Cuál preferirías mantener?

---

## Parte 5: Practica con Tu Código (10 minutos)

### Instrucciones
1. Busca un código tuyo que no tenga documentación
2. Usa el mismo proceso:
   - Pide a la IA que lo analice
   - Pide que lo documente
   - Verifica que siga funcionando

### Template para documentar
```
Documenta este código siguiendo estas convenciones:

**Estilo de docstrings:** Google Style
**Lenguaje de comentarios:** Español
**Incluir:** Type hints, ejemplos de uso, notas importantes

Código:
[Tu código aquí]

Asegúrate de:
1. No cambiar la lógica
2. Usar nombres descriptivos en español
3. Agregar al menos un ejemplo de uso por función
```

---

## Buenas Prácticas Aprendidas

### Para nombres de variables:
- ❌ `d`, `t`, `r`
- ✅ `precio`, `impuesto`, `resultado`

### Para nombres de funciones:
- ❌ `p()`, `c()`, `f()`
- ✅ `calcular_precio()`, `contar_mayores()`, `fibonacci()`

### Para documentación:
- Escribir ANTES de olvidar qué hace el código
- Actualizar cuando cambia la lógica
- Incluir ejemplos de uso

---

## Entregable

### Tu código documentado
Toma una función de tu código personal y documéntala completamente.

Incluye:
1. Nombre descriptivo
2. Docstring completo
3. Type hints
4. Al menos un ejemplo de uso

```python
# Tu función documentada aquí
```

---

## Criterios de Éxito

- [ ] Analizaste el código sin documentar
- [ ] Generaste versión con documentación
- [ ] Verificaste que el código funciona igual
- [ ] Documentaste al menos 1 función propia
- [ ] Entiendes la diferencia en mantenibilidad

---

*Ejercicio 2 - Desarrollo de Software - FPUNA 2026*
