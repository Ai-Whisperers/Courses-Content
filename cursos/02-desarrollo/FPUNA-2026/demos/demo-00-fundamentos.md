# Demo Track 00: Fundamentos de IA

## Primera Interacción con Claude

### Objetivo
Demostrar las capacidades básicas de Claude Code en una interacción natural.

---

## Demo 1: Saludo y Verificación

```bash
claude "Hola, soy estudiante de FPUNA en Paraguay. ¿Puedes presentarte y decirme qué puedes hacer por mí?"
```

**Resultado esperado:** Claude se presenta y lista sus capacidades.

---

## Demo 2: Crear un Archivo Simple

```bash
claude "Crea un archivo llamado saludo.py que imprima 'Bienvenido a FPUNA 2026' en la consola"
```

**Resultado esperado:** Claude crea el archivo `saludo.py`.

**Verificar:**
```bash
python saludo.py
```

---

## Demo 3: Conversión de Moneda (Contexto Paraguay)

```bash
claude "Crea una función en Python que convierta dólares a guaraníes. Usa la tasa de ₲7,300 por dólar. La función debe formatear el resultado con separadores de miles."
```

**Resultado esperado:** Función funcional con formato paraguayo.

---

## Demo 4: Explicar Código

```bash
claude "Explícame qué hace este código paso a paso:

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
"
```

**Resultado esperado:** Explicación clara del algoritmo de Fibonacci.

---

## Demo 5: Corregir Error

```bash
claude "Este código tiene un error, corrígelo:

def calcular_promedio(notas):
    suma = 0
    for nota in notas
        suma += nota
    return suma / len(notas)
"
```

**Resultado esperado:** Claude identifica el `:` faltante y corrige.

---

## Ejercicio Interactivo

Pide a los estudiantes que prueben sus propios prompts:

1. Crear un programa que calcule el IVA (10%) de un producto
2. Generar una lista de feriados de Paraguay
3. Crear un conversor de temperatura

---

## Puntos de Discusión

- ¿Qué tan preciso fue Claude?
- ¿Cómo podrían mejorar los prompts?
- ¿Qué pasa si el prompt es ambiguo?

---

*Demo Track 00 - FPUNA 2026*
