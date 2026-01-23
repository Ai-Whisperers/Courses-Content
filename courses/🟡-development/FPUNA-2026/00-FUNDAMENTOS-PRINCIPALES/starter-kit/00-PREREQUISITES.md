# Prerrequisitos - Antes de Usar IA en Programación

## Lo que DEBES saber ANTES de usar IA como asistente de código

---

## ⚠️ Advertencia Importante

**La IA no te enseñará a programar.** Te ayudará a programar más rápido SI ya sabes programar.

Si no entiendes lo que la IA genera, no podrás:
- Detectar cuando el código está mal
- Modificarlo para tus necesidades
- Debuggearlo cuando falle
- Explicarlo a otros (o en un examen)

---

## Conocimientos Mínimos Requeridos

### 1. Conceptos de Programación Básica

Antes de usar IA, debes poder responder estas preguntas SIN ayuda:

| Concepto | Pregunta de verificación |
|----------|-------------------------|
| Variables | ¿Qué es una variable y qué tipos existen? |
| Condicionales | ¿Cómo funciona if/else y cuándo usarlo? |
| Bucles | ¿Cuál es la diferencia entre for y while? |
| Funciones | ¿Qué es una función y por qué usarlas? |
| Arrays/Listas | ¿Cómo almacenar y recorrer múltiples elementos? |
| Strings | ¿Cómo manipular texto (concatenar, buscar, reemplazar)? |

**Auto-evaluación:** Si no puedes escribir un programa que:
1. Pida un número al usuario
2. Calcule si es primo
3. Imprima el resultado

...entonces necesitas más práctica ANTES de depender de IA.

---

### 2. Lógica de Programación

Debes poder:

- [ ] Leer código y explicar qué hace (línea por línea)
- [ ] Escribir pseudocódigo antes de codificar
- [ ] Identificar errores lógicos (no solo de sintaxis)
- [ ] Trazar la ejecución de un programa mentalmente
- [ ] Descomponer un problema grande en partes pequeñas

**Ejercicio de verificación:**
```
Sin ejecutar este código, ¿qué imprime?

x = 5
for i in range(3):
    x = x + i
print(x)
```

Si no puedes responder (es 8), necesitas practicar más trazado de código.

---

### 3. Uso de Terminal/Consola

Debes saber:

| Comando | Propósito |
|---------|-----------|
| `cd` | Navegar entre carpetas |
| `ls` / `dir` | Listar archivos |
| `mkdir` | Crear carpetas |
| `python archivo.py` | Ejecutar un script |
| `pip install X` | Instalar paquetes |
| `git status/add/commit` | Control de versiones básico |

**¿Por qué?** Claude Code opera en terminal. Si no entiendes qué hace un comando, no sabrás si es seguro ejecutarlo.

---

### 4. Lectura de Errores

Debes poder interpretar mensajes de error básicos:

```python
# Error de sintaxis
File "main.py", line 5
    print("Hola"
                ^
SyntaxError: unexpected EOF while parsing

# ¿Qué significa? Falta cerrar el paréntesis
```

```python
# Error de tipo
TypeError: can only concatenate str (not "int") to str

# ¿Qué significa? Intentas sumar string + número
```

```python
# Error de nombre
NameError: name 'usuario' is not defined

# ¿Qué significa? Usas una variable que no existe
```

Si no puedes leer estos errores, no podrás verificar si la "solución" de la IA realmente funciona.

---

### 5. Estructura de Proyectos

Debes entender:

```
mi_proyecto/
├── README.md          # ¿Qué es esto?
├── requirements.txt   # ¿Para qué sirve?
├── .gitignore         # ¿Por qué existe?
├── src/
│   ├── __init__.py    # ¿Qué hace este archivo?
│   └── main.py
└── tests/
    └── test_main.py   # ¿Por qué separar tests?
```

Si no sabes qué hace cada archivo, no podrás organizar proyectos reales.

---

## Recursos para Aprender los Prerrequisitos

### Si necesitas aprender programación básica:

**Español:**
- [Código Facilito - Python](https://codigofacilito.com/cursos/python-profesional)
- [FreeCodeCamp Español](https://www.freecodecamp.org/espanol/)
- [Programación ATS](https://www.youtube.com/c/ProgramacionATS)

**Inglés:**
- [CS50 de Harvard](https://cs50.harvard.edu/x/)
- [The Odin Project](https://www.theodinproject.com/)
- [Automate the Boring Stuff](https://automatetheboringstuff.com/)

### Tiempo estimado para prerrequisitos:
- Completo principiante: 2-3 meses de estudio constante
- Con algo de experiencia: 2-4 semanas de refuerzo

---

## Test de Autoevaluación

Antes de usar IA como asistente, completa este test:

### Parte 1: Conceptos (responde sin buscar)

1. ¿Qué imprime `print(10 // 3)`?
2. ¿Cuál es la diferencia entre `=` y `==`?
3. ¿Qué es un "índice fuera de rango"?
4. ¿Para qué sirve `return` en una función?
5. ¿Qué es una "variable global"?

### Parte 2: Código (escribe sin ayuda)

1. Función que recibe una lista y devuelve el mayor
2. Programa que cuenta vocales en un string
3. Función que verifica si un string es palíndromo

### Parte 3: Debugging (encuentra el error)

```python
def promedio(numeros):
    total = 0
    for n in numeros:
        total += n
    return total / len(numeros)

print(promedio([]))  # ¿Qué pasa aquí?
```

**Puntuación:**
- 0-4 correctas: No estás listo para usar IA como asistente
- 5-7 correctas: Puedes usar IA con supervisión cuidadosa
- 8-10 correctas: Listo para aprovechar IA como herramienta

---

## La Regla de Oro

> **Si no puedes explicar el código que la IA generó, no lo uses.**

La IA es un acelerador, no un reemplazo de tu conocimiento. Usarla sin entender es como usar una calculadora sin saber matemáticas: podrás obtener resultados, pero no sabrás si son correctos ni qué hacer cuando fallen.

---

*00-PREREQUISITES.md - FPUNA 2026*
