# Módulo 03: Ingeniería de Prompts

## Comunicación Efectiva con IA

**Duración**: 1.5 horas  
**Nivel**: Principiante-Intermedio  
**Prerequisito**: Módulos 01 y 02 completados

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:

1. ✅ Escribir prompts efectivos para OpenCode
2. ✅ Estructurar solicitudes para obtener mejores resultados
3. ✅ Usar técnicas avanzadas de prompting
4. ✅ Depurar y mejorar prompts
5. ✅ Crear biblioteca de prompts reutilizables

---

## ¿Qué es Prompt Engineering?

**Prompt Engineering** es el arte y ciencia de comunicarse efectivamente con modelos de IA para obtener los resultados deseados.

**Analogía**: Es como dar instrucciones claras a un asistente muy capaz pero que necesita contexto y especificidad.

---

## Parte 1: Anatomía de un Buen Prompt (20 min)

### Estructura Básica

Un buen prompt tiene estos componentes:

```
[CONTEXTO] + [TAREA] + [REQUISITOS] + [FORMATO] + [RESTRICCIONES]
```

### Ejemplo Malo vs Bueno

❌ **Mal prompt**:
```bash
claude "Crea una app"
```

**Problemas**:
- Demasiado vago
- Sin contexto
- Sin requisitos
- Sin formato esperado

✅ **Buen prompt**:
```bash
claude "Crea una aplicación web de lista de tareas con:

CONTEXTO:
- Para estudiantes de FPUNA
- Debe ser simple y rápida

TECNOLOGÍAS:
- HTML, CSS, JavaScript vanilla (sin frameworks)
- Local Storage para persistencia

FUNCIONALIDADES:
- Agregar tarea con título y descripción
- Marcar como completada
- Eliminar tarea
- Filtrar: Todas / Pendientes / Completadas

REQUISITOS:
- Interfaz responsive
- Validación de inputs
- Feedback visual al usuario
- Comentarios en español

ENTREGA:
- index.html
- styles.css
- app.js
- README.md con instrucciones"
```

**Resultado**: Código mucho más alineado con lo que necesitas.

---

## Parte 2: Principios de Prompts Efectivos (30 min)

### 1. Ser Específico

❌ **Vago**: "Crea una función de validación"

✅ **Específico**:
```bash
"Crea una función validateEmail(email) que:
- Valide formato de email usando regex
- Retorne true si es válido, false si no
- Incluya tests para casos: válido, inválido, vacío, null
- JSDoc en español"
```

### 2. Proporcionar Contexto

❌ **Sin contexto**: "Optimiza este código"

✅ **Con contexto**:
```bash
"Este código procesa 10,000 estudiantes y toma 5 segundos.
Optimízalo para que tome menos de 1 segundo.

Código actual:
[pega el código]

Considera:
- Usar Map en lugar de arrays para búsquedas
- Cachear resultados calculados
- Evitar bucles anidados innecesarios"
```

### 3. Usar Ejemplos

❌ **Sin ejemplos**: "Formatea los datos"

✅ **Con ejemplos**:
```bash
"Transforma este array de objetos:

Input:
[
  {nombre: 'Juan', nota: 85},
  {nombre: 'María', nota: 92}
]

Output esperado:
{
  'Juan': {nota: 85, aprobado: true},
  'María': {nota: 92, aprobado: true}
}

Regla: aprobado = nota >= 60"
```

### 4. Establecer Restricciones

```bash
"Crea una función de búsqueda con ESTAS RESTRICCIONES:
- Máximo 50 líneas de código
- No usar librerías externas
- Complejidad O(log n) o mejor
- Sin modificar el array original
- Manejar casos edge (vacío, null, undefined)"
```

### 5. Especificar Formato de Salida

```bash
"Genera reporte de ventas en este formato EXACTO:

## Resumen de Ventas - [Mes]

**Total Vendido**: ₲[monto]
**Productos**: [cantidad]
**Mejor Producto**: [nombre]

### Detalles
- [Producto 1]: ₲[monto] ([cantidad] unidades)
- [Producto 2]: ₲[monto] ([cantidad] unidades)

Usar markdown y guaraníes (₲) para montos."
```

---

## Parte 3: Técnicas Avanzadas (25 min)

### Técnica 1: Chain of Thought (Cadena de Pensamiento)

Pedir a la IA que explique su razonamiento:

```bash
claude "Calcula el precio final de un producto con:
- Precio base: ₲100,000
- Descuento: 15%
- IVA: 10%

IMPORTANTE: Explica PASO A PASO cómo calculas el precio final.

Formato:
1. Precio base: [valor]
2. Aplicar descuento: [cálculo]
3. Subtotal: [valor]
4. Aplicar IVA: [cálculo]
5. Precio final: [valor]

Luego genera la función calculateFinalPrice() con esa lógica."
```

### Técnica 2: Few-Shot Learning (Aprendizaje con Ejemplos)

Mostrar ejemplos del patrón deseado:

```bash
claude "Genera funciones siguiendo EXACTAMENTE este patrón:

EJEMPLO 1:
/**
 * Suma dos números
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number} La suma
 * @example sumar(2, 3) // returns 5
 */
const sumar = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Los parámetros deben ser números');
  }
  return a + b;
};

EJEMPLO 2:
/**
 * Multiplica dos números
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number} El producto
 * @example multiplicar(3, 4) // returns 12
 */
const multiplicar = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Los parámetros deben ser números');
  }
  return a * b;
};

Ahora crea funciones para: restar, dividir, potencia, raizCuadrada
siguiendo el MISMO PATRÓN."
```

### Técnica 3: Role Prompting (Asignación de Rol)

Darle un rol específico a la IA:

```bash
claude "Actúa como un profesor de programación de FPUNA con 10 años de experiencia.

Un estudiante te pregunta: '¿Cuál es la diferencia entre const, let y var en JavaScript?'

Responde:
1. De forma clara y didáctica
2. Con ejemplos de código
3. Mencionando casos de uso reales
4. Incluyendo mejores prácticas
5. En español paraguayo (usando vos si corresponde)"
```

### Técnica 4: Iterative Refinement (Refinamiento Iterativo)

Mejorar el resultado paso a paso:

```bash
# Paso 1: Versión básica
claude "Crea una calculadora simple"

# Paso 2: Agregar features
claude "Mejora la calculadora agregando:
- Historial de operaciones
- Memoria (M+, M-, MR, MC)"

# Paso 3: Mejorar UI
claude "Mejora la interfaz con:
- Diseño moderno
- Animaciones suaves
- Tema oscuro/claro"

# Paso 4: Agregar tests
claude "Agrega tests completos con Jest"
```

### Técnica 5: Constrained Generation (Generación Restringida)

Limitar las opciones de respuesta:

```bash
claude "Evalúa este código y responde SOLO con uno de estos:
- EXCELENTE: Código perfecto, sin mejoras necesarias
- BUENO: Código funcional con mejoras menores
- REGULAR: Funciona pero necesita refactoring
- MALO: Problemas significativos que corregir

[pega código]

Formato de respuesta:
CALIFICACIÓN: [una de las 4 opciones]
RAZÓN: [1-2 oraciones explicando por qué]"
```

---

## Parte 4: Prompts para Casos Comunes (15 min)

### Debugging

```bash
claude "Este código da error:

[pega código y error]

ANALIZA:
1. ¿Cuál es el problema?
2. ¿Por qué ocurre?
3. ¿Cómo solucionarlo?
4. ¿Cómo prevenir errores similares?

Luego proporciona el código corregido CON COMENTARIOS
explicando los cambios."
```

### Refactoring

```bash
claude "Refactoriza este código aplicando:
- Principio DRY (Don't Repeat Yourself)
- Funciones pequeñas y enfocadas
- Nombres descriptivos
- Manejo de errores apropiado
- Comentarios donde necesario

[pega código]

IMPORTANTE: Explica cada cambio significativo que haces."
```

### Documentación

```bash
claude "Genera documentación completa para este código:

[pega código]

Incluye:
1. README.md con:
   - Descripción
   - Instalación
   - Uso con ejemplos
   - API Reference

2. JSDoc para todas las funciones

3. CHANGELOG.md con versión actual

4. CONTRIBUTING.md con guías

Todo en español."
```

### Tests

```bash
claude "Genera tests completos con Jest para esta función:

[pega función]

Los tests deben cubrir:
- Casos normales (happy path)
- Casos edge (valores límite)
- Casos de error
- Inputs inválidos (null, undefined, tipos incorrectos)

Objetivo: >90% coverage"
```

---

## Parte 5: Biblioteca de Prompts (10 min)

### Crear tu Biblioteca Personal

Crea archivo `~/prompts-library.md`:

```markdown
# Mi Biblioteca de Prompts

## Crear Función con Tests

\`\`\`
Crea función [nombre]([parámetros]) que:
- [descripción funcionalidad]
- Validación de inputs
- Manejo de errores
- JSDoc en español
- Tests con Jest (>85% coverage)
\`\`\`

## Refactoring a TypeScript

\`\`\`
Convierte este JavaScript a TypeScript:
- Agregar tipos explícitos
- Interfaces para objetos
- Enums donde apropiado
- Strict mode
- Sin 'any'

[código]
\`\`\`

## Generar README

\`\`\`
Genera README.md profesional con:
- Título y descripción
- Badges (build, coverage, version)
- Instalación
- Uso con ejemplos
- API docs
- Contribuir
- Licencia

Proyecto: [descripción]
\`\`\`
```

### Usar Prompts Guardados

```bash
# Copiar prompt de tu biblioteca
# Reemplazar [placeholders]
# Ejecutar
```

---

## Parte 6: Depuración de Prompts (10 min)

### Si el Resultado No es el Esperado

#### 1. Agregar Más Contexto

```bash
# Antes
claude "Optimiza esta función"

# Después
claude "Esta función procesa 100,000 registros y toma 10 segundos.
El cuello de botella es [X].
Optimízala para que tome <2 segundos sin cambiar la lógica principal."
```

#### 2. Ser Más Específico

```bash
# Antes
claude "Mejora este código"

# Después
claude "Mejora este código aplicando EXACTAMENTE estos cambios:
1. Renombrar variables a español descriptivo
2. Extraer lógica compleja a funciones separadas
3. Agregar manejo de errores con try-catch
4. Agregar logging en puntos clave"
```

#### 3. Proporcionar Ejemplos

```bash
# Antes
claude "Formatea los datos"

# Después
claude "Transforma datos de este formato:
Input: [{id: 1, name: 'Juan'}]
Output esperado: {'1': {nombre: 'Juan'}}

Aplica misma transformación a estos datos:
[pega datos]"
```

#### 4. Dividir en Pasos

```bash
# En lugar de un prompt gigante, dividir:

# Paso 1
claude "Crea la estructura básica de la clase Usuario"

# Paso 2
claude "Agrega métodos de validación a la clase Usuario"

# Paso 3
claude "Agrega tests para Usuario"
```

---

## Mejores Prácticas

### ✅ HACER

1. **Ser claro y específico**
2. **Proporcionar contexto relevante**
3. **Usar ejemplos concretos**
4. **Establecer restricciones**
5. **Especificar formato de salida**
6. **Dividir tareas complejas**
7. **Iterar y refinar**

### ❌ NO HACER

1. **Prompts vagos** ("haz algo")
2. **Asumir contexto** (la IA no sabe tu proyecto)
3. **Pedir imposibles** (coherencia con restricciones)
4. **Olvidar validación** (siempre revisar output)

---

## Ejercicio Rápido

Compara estos dos prompts:

**Prompt A**:
```bash
claude "Crea una API"
```

**Prompt B**:
```bash
claude "Crea una API REST con Express para gestión de estudiantes:

ENDPOINTS:
- GET /students - Lista todos
- GET /students/:id - Uno por ID
- POST /students - Crear nuevo
- PUT /students/:id - Actualizar
- DELETE /students/:id - Eliminar

MODELO Student:
- id (auto-generado)
- nombre (string, requerido)
- carnet (string, único, requerido)
- carrera (string, requerido)
- email (string, validar formato)

REQUISITOS:
- Validación de inputs con Joi
- Manejo de errores centralizado
- Logging con Morgan
- Tests con Supertest
- Documentación con Swagger
- Puerto 3000

ESTRUCTURA:
- routes/students.js
- controllers/studentController.js
- models/Student.js
- middleware/validation.js
- app.js

En español con comentarios explicativos."
```

**¿Cuál dará mejor resultado?** Obviamente B.

---

## Próximos Pasos

1. 📝 Completa el [EJERCICIO.md](./EXERCISE.md)
2. 📝 Responde el [QUIZ.md](./QUIZ.md)
3. 📖 Continúa con: [Módulo 04 - Context Engineering](../04-context-engineering/README.md)

---

## Resumen

**Aprendiste**:
- ✅ Anatomía de prompts efectivos
- ✅ Principios de prompting
- ✅ Técnicas avanzadas (Chain of Thought, Few-Shot, etc.)
- ✅ Prompts para casos comunes
- ✅ Cómo depurar prompts
- ✅ Crear biblioteca de prompts

**Ahora puedes**:
- 🚀 Comunicarte efectivamente con OpenCode
- 🚀 Obtener resultados más precisos
- 🚀 Ahorrar tiempo con prompts bien estructurados

---

*Módulo creado para FPUNA Summer 2026*
