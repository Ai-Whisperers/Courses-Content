# Ejercicio 1: Debugging Asistido por IA

## Objetivo
Aprender a usar IA para encontrar y corregir errores en código.

## Duración
30-45 minutos

## Prerrequisitos
- Conocimiento básico de Python o JavaScript
- Editor de código instalado
- Acceso a Claude

---

## Parte 1: Preparación del Bug (5 minutos)

### El Código con Errores
Copia este código Python que tiene 3 errores intencionales:

```python
# calculadora_promedio.py
def calcular_promedio(notas)
    if len(notas) = 0:
        return 0

    suma = 0
    for nota in notas:
        suma += nota

    promedio = suma / len(nota)
    return promedio

# Prueba
mis_notas = [85, 90, 78, 92, 88]
resultado = calcular_promedio(mis_notas)
print(f"Tu promedio es: {resultado}")
```

### Intenta ejecutarlo
1. Guarda el archivo
2. Ejecuta: `python calculadora_promedio.py`
3. Observa el error

---

## Parte 2: Pedir Ayuda a la IA (15 minutos)

### Prompt INCORRECTO
Primero, prueba este prompt vago:

```
mi codigo no funciona ayuda
```

### Observa
- ¿La IA puede ayudarte sin ver el código?
- ¿Qué te pide?

### Prompt CORRECTO
Ahora usa este formato estructurado:

```
Tengo este código Python que da errores. Ayúdame a debuggearlo.

**Código:**
[Pegar código aquí]

**Error que aparece:**
[Pegar el mensaje de error exacto]

**Lo que intento hacer:**
Calcular el promedio de una lista de notas.

**Lo que ya intenté:**
Revisar la sintaxis pero no encuentro el problema.

Por favor:
1. Identifica TODOS los errores
2. Explica por qué cada uno es un error
3. Dame el código corregido
4. Explica qué aprender de cada error
```

### Registra los errores encontrados

| Error # | Línea | Qué está mal | Corrección |
|---------|-------|--------------|------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

---

## Parte 3: Verificación (10 minutos)

### Instrucciones
1. Aplica las correcciones sugeridas
2. Ejecuta el código nuevamente
3. Verifica que funcione

### Si hay nuevos errores
Vuelve a pedir ayuda, pero incluye:
- El código corregido
- El nuevo error
- Lo que la IA sugirió antes

---

## Parte 4: Aprender a Prevenir (10 minutos)

### Pide a la IA
```
Ahora que arreglamos los errores, ayúdame a prevenir
estos problemas en el futuro:

1. ¿Qué extensiones de VS Code me ayudarían
   a detectar estos errores antes de ejecutar?

2. ¿Cómo configuro un linter para Python?

3. ¿Qué buenas prácticas debí seguir para
   evitar estos errores desde el principio?
```

### Configura tu entorno
- [ ] Instalar extensión Python en VS Code
- [ ] Instalar Pylint o Flake8
- [ ] Activar autoformato

---

## Parte 5: Practica Adicional

### Bug Challenge
Este código tiene 2 errores más sutiles. Encuéntralos:

```python
def buscar_mayor(numeros):
    mayor = 0
    for num in numeros:
        if num > mayor:
            mayor = num
    return mayor

# Prueba con diferentes casos
print(buscar_mayor([5, 2, 8, 1]))    # Esperado: 8
print(buscar_mayor([-5, -2, -8]))    # Esperado: -2
print(buscar_mayor([]))              # ¿Qué pasa?
```

### Usa lo aprendido
1. Ejecuta el código
2. Identifica qué casos fallan
3. Pide ayuda a la IA con el formato correcto
4. Corrige y verifica

---

## Template para Debugging

Guarda este template para usar en el futuro:

```
## Debugging Request

**Lenguaje:** [Python/JavaScript/etc.]
**Entorno:** [VS Code, versión de Python, etc.]

**Código:**
```[lenguaje]
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

## Criterios de Éxito

- [ ] Identificaste los 3 errores del código original
- [ ] Corregiste el código hasta que funcionó
- [ ] Configuraste al menos 1 herramienta de prevención
- [ ] Completaste el Bug Challenge adicional
- [ ] Guardaste el template de debugging

---

*Ejercicio 1 - Desarrollo de Software - FPUNA 2026*
