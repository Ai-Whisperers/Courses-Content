# Quiz: Debugging Asistido por IA
## Evaluación del Módulo 05

---

## Instrucciones

- 10 preguntas de opción múltiple
- Tiempo sugerido: 10 minutos
- Puntaje mínimo para aprobar: 70%

---

## Preguntas

### 1. ¿Cuál es la principal ventaja de usar IA para debugging?

a) Siempre encuentra todos los bugs
b) Análisis rápido y explicaciones claras
c) No requiere conocimiento de programación
d) Reemplaza completamente al debugger

---

### 2. ¿Qué debe incluir un buen reporte de bug para IA?

a) Solo el mensaje de error
b) Código, error, comportamiento esperado y actual
c) Todo el código del proyecto
d) Solo la descripción verbal del problema

---

### 3. ¿Qué es "Rubber Duck Debugging"?

a) Depurar código de juguetes
b) Explicar el código paso a paso para encontrar bugs
c) Usar un pato como mascota
d) Un framework de testing

---

### 4. ¿Qué información proporciona un stack trace?

a) Solo el nombre del archivo
b) La secuencia de llamadas que llevaron al error
c) El código fuente completo
d) Las variables en memoria

---

### 5. Al depurar código ajeno con IA, ¿qué es importante hacer primero?

a) Modificar el código inmediatamente
b) Pedir a la IA que explique qué hace el código
c) Ejecutar el código sin entenderlo
d) Eliminarlo y escribirlo de nuevo

---

### 6. ¿Cuál es un error lógico común que la IA puede identificar fácilmente?

a) Errores de compilación
b) Off-by-one errors en loops
c) Problemas de red
d) Errores de hardware

---

### 7. ¿Cuándo NO deberías confiar solo en la IA para debugging?

a) Con errores de sintaxis
b) Con bugs muy específicos de tu infraestructura
c) Con errores de lógica simple
d) Con stack traces de Python

---

### 8. ¿Qué tipo de error es "TypeError: Cannot read properties of undefined"?

a) Error de sintaxis
b) Error de acceso a propiedad de valor null/undefined
c) Error de memoria
d) Error de red

---

### 9. ¿Cuál es el primer paso al recibir una sugerencia de la IA?

a) Implementarla inmediatamente
b) Evaluar si aborda el problema real
c) Ignorarla
d) Pedir otra sugerencia

---

### 10. ¿Por qué es importante verificar las correcciones sugeridas por IA?

a) Porque la IA nunca se equivoca
b) Porque las sugerencias pueden no aplicar a tu caso específico
c) Porque es un requisito del curso
d) Para practicar

---

## Respuestas

<details>
<summary>Ver respuestas (no abrir hasta completar)</summary>

1. **b)** Análisis rápido y explicaciones claras
2. **b)** Código, error, comportamiento esperado y actual
3. **b)** Explicar el código paso a paso para encontrar bugs
4. **b)** La secuencia de llamadas que llevaron al error
5. **b)** Pedir a la IA que explique qué hace el código
6. **b)** Off-by-one errors en loops
7. **b)** Con bugs muy específicos de tu infraestructura
8. **b)** Error de acceso a propiedad de valor null/undefined
9. **b)** Evaluar si aborda el problema real
10. **b)** Porque las sugerencias pueden no aplicar a tu caso específico

**Puntaje:**
- 9-10 correctas: Excelente
- 7-8 correctas: Bien
- 5-6 correctas: Necesita repaso
- <5 correctas: Revisar el módulo

</details>

---

## Ejercicio Práctico

Encuentra el bug en este código usando IA:

```python
def find_duplicates(items):
    seen = {}
    duplicates = []
    for item in items:
        if item in seen:
            duplicates.append(item)
        seen[item] = True
    return duplicates

# Test
print(find_duplicates([1, 2, 3, 2, 4, 3, 3]))
# Esperado: [2, 3] (cada duplicado una vez)
# Actual: [2, 3, 3] (3 aparece dos veces)
```

Pide a la IA que corrija el bug.

---

*Continúa al Módulo 06: Testing con IA*
