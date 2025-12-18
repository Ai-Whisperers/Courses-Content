# Módulo 03: Ingeniería de Prompts para Código
## Duración: 2 horas

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:
- Diseñar prompts efectivos para generación de código
- Aplicar técnicas de zero-shot, few-shot y chain-of-thought
- Estructurar prompts para diferentes tipos de tareas
- Iterar y refinar prompts para mejores resultados

---

## 1. Fundamentos de Prompt Engineering

### 1.1 ¿Qué es un Prompt?

Un **prompt** es la instrucción o contexto que das a una IA para obtener una respuesta específica.

```
Prompt = Contexto + Instrucción + Formato esperado
```

### 1.2 Anatomía de un Buen Prompt para Código

```markdown
1. CONTEXTO
   - Lenguaje de programación
   - Framework/bibliotecas
   - Propósito del código

2. INSTRUCCIÓN
   - Qué debe hacer el código
   - Comportamiento esperado
   - Requisitos específicos

3. RESTRICCIONES
   - Limitaciones
   - Lo que NO debe hacer
   - Patrones a evitar

4. FORMATO
   - Estructura esperada
   - Incluir tests/docs
   - Estilo de código
```

### 1.3 Ejemplo Comparativo

**Prompt malo:**
```
Dame código para usuarios
```

**Prompt bueno:**
```
Crea una clase User en Python con las siguientes características:
- Propiedades: id (int), name (str), email (str), created_at (datetime)
- Método validate_email() que use regex
- Método to_dict() para serialización JSON
- Usa dataclasses para simplificar
- Incluye docstrings en español
- No uses bibliotecas externas excepto re y dataclasses
```

---

## 2. Técnicas de Prompting

### 2.1 Zero-Shot

Dar la instrucción directamente, sin ejemplos.

```
Escribe una función en JavaScript que calcule el factorial
de un número de forma recursiva.
```

**Cuándo usar:**
- Tareas simples y comunes
- Cuando el LLM conoce bien el dominio
- Para código boilerplate

### 2.2 Few-Shot

Proporcionar ejemplos antes de la instrucción.

```
Ejemplos de validación de entrada:

# Validar edad
def validate_age(age):
    if not isinstance(age, int):
        raise TypeError("La edad debe ser un entero")
    if age < 0 or age > 150:
        raise ValueError("La edad debe estar entre 0 y 150")
    return True

# Validar nombre
def validate_name(name):
    if not isinstance(name, str):
        raise TypeError("El nombre debe ser un string")
    if len(name) < 2 or len(name) > 100:
        raise ValueError("El nombre debe tener entre 2 y 100 caracteres")
    return True

Ahora, escribe una función similar para validar un email.
```

**Cuándo usar:**
- Cuando necesitas un formato específico
- Para seguir patrones del proyecto
- Cuando el estilo importa

### 2.3 Chain-of-Thought (CoT)

Pedir que la IA "piense paso a paso".

```
Necesito una función que ordene una lista de productos por precio,
agrupando por categoría. Piensa paso a paso:

1. ¿Qué estructura de datos recibirá?
2. ¿Cómo agrupar por categoría?
3. ¿Cómo ordenar dentro de cada grupo?
4. ¿Qué estructura retornará?

Luego implementa la solución.
```

**Cuándo usar:**
- Problemas complejos
- Algoritmos no triviales
- Cuando necesitas entender el razonamiento

### 2.4 Role Prompting

Asignar un rol o persona a la IA.

```
Actúa como un desarrollador senior de Python con 10 años de experiencia
en aplicaciones financieras. Revisa este código y sugiere mejoras
considerando seguridad, performance y mejores prácticas.
```

**Cuándo usar:**
- Cuando necesitas expertise específico
- Para revisiones de código
- Decisiones arquitectónicas

---

## 3. Patrones de Prompts para Código

### 3.1 Generación de Funciones

```markdown
Crea una función en [LENGUAJE] llamada [NOMBRE] que:
- Reciba: [PARÁMETROS con tipos]
- Retorne: [TIPO de retorno]
- Haga: [DESCRIPCIÓN detallada]
- Maneje: [CASOS de error]
- Ejemplo de uso: [EJEMPLO]
```

**Ejemplo completo:**
```
Crea una función en TypeScript llamada parseDate que:
- Reciba: dateString (string) en formato "DD/MM/YYYY" o "YYYY-MM-DD"
- Retorne: Date object
- Haga: Parse el string y retorne un Date válido
- Maneje: Strings inválidos lanzando Error con mensaje descriptivo
- Ejemplo de uso: parseDate("25/12/2024") -> Date object
```

### 3.2 Generación de Clases

```markdown
Diseña una clase [NOMBRE] en [LENGUAJE] que represente [ENTIDAD]:

Propiedades:
- [nombre]: [tipo] - [descripción]
- ...

Métodos:
- [nombre]([params]): [retorno] - [descripción]
- ...

Requisitos adicionales:
- [requisito 1]
- [requisito 2]
```

### 3.3 Refactoring

```markdown
Refactoriza el siguiente código aplicando:
- [ ] Principio de responsabilidad única
- [ ] Nombres descriptivos
- [ ] Manejo de errores apropiado
- [ ] Documentación

Código actual:
```[código]```

Explica los cambios realizados.
```

### 3.4 Debugging

```markdown
El siguiente código produce un error:

Código:
```[código]```

Error:
```[mensaje de error]```

Comportamiento esperado: [descripción]
Comportamiento actual: [descripción]

Encuentra el bug, explica por qué ocurre, y proporciona la corrección.
```

### 3.5 Tests

```markdown
Genera tests unitarios para la siguiente función usando [FRAMEWORK]:

```[código de la función]```

Incluye tests para:
- Caso normal/feliz
- Casos edge (límites)
- Casos de error
- Tipos inválidos

Usa el patrón AAA (Arrange, Act, Assert).
```

---

## 4. Técnicas Avanzadas

### 4.1 Especificación por Contrato

```markdown
Implementa una función con las siguientes condiciones:

PRECONDICIONES:
- items es una lista no vacía de diccionarios
- cada diccionario tiene las claves 'name' y 'price'
- price es un número positivo

POSTCONDICIONES:
- Retorna el nombre del item más caro
- No modifica la lista original

INVARIANTES:
- La función es pura (sin efectos secundarios)
```

### 4.2 Prompt Incremental

Construir código paso a paso:

```markdown
Paso 1: Crea la estructura básica de la clase
Paso 2: Agrega validación de entrada
Paso 3: Implementa el método principal
Paso 4: Agrega manejo de errores
Paso 5: Incluye logging
```

### 4.3 Negative Prompting

Especificar lo que NO queremos:

```markdown
Crea un sistema de login.
NO uses:
- Almacenamiento de contraseñas en texto plano
- MD5 o SHA1 para hashing
- Cookies sin flags de seguridad
- Logs que incluyan contraseñas
```

---

## 5. Iteración y Refinamiento

### 5.1 Ciclo de Mejora

```
1. Prompt inicial
   ↓
2. Evaluar resultado
   ↓
3. Identificar problemas
   ↓
4. Refinar prompt
   ↓
5. Repetir hasta satisfecho
```

### 5.2 Estrategias de Refinamiento

**Agregar contexto:**
```
Original: "Crea función para validar email"
Mejorado: "Crea función para validar email empresarial
          que rechace dominios gratuitos como gmail.com"
```

**Agregar ejemplos:**
```
Original: "Parsea fechas en varios formatos"
Mejorado: "Parsea fechas en estos formatos:
          - 25/12/2024
          - 2024-12-25
          - December 25, 2024"
```

**Agregar restricciones:**
```
Original: "Ordena la lista"
Mejorado: "Ordena la lista in-place sin usar sort()
          para practicar algoritmos"
```

### 5.3 Feedback Loop

```markdown
El código generado tiene estos problemas:
1. No maneja el caso cuando X es null
2. Usa var en lugar de const/let
3. Falta documentación

Por favor corrige estos puntos manteniendo
el resto de la implementación.
```

---

## 6. Biblioteca de Prompts

### 6.1 Prompt: Crear API Endpoint

```markdown
Crea un endpoint REST para [RECURSO] usando [FRAMEWORK]:

Método: [GET/POST/PUT/DELETE]
Ruta: /api/v1/[recurso]
Autenticación: [Tipo]

Request:
- Headers: [headers requeridos]
- Body: [estructura JSON]

Response:
- 200: [estructura exitosa]
- 400: [estructura de error de validación]
- 401: [estructura de error de auth]
- 500: [estructura de error de servidor]

Incluye validación de entrada y manejo de errores.
```

### 6.2 Prompt: Crear Modelo de Base de Datos

```markdown
Diseña el modelo [NOMBRE] para [BASE DE DATOS/ORM]:

Campos:
| Campo | Tipo | Restricciones |
|-------|------|---------------|
| id | UUID | PK, auto-generado |
| ... | ... | ... |

Relaciones:
- [tipo] con [otra_tabla]

Índices requeridos:
- [campo1, campo2]

Incluye timestamps de auditoría.
```

### 6.3 Prompt: Migrar Código

```markdown
Migra el siguiente código de [LENGUAJE_ORIGEN] a [LENGUAJE_DESTINO]:

```[código original]```

Requisitos:
- Mantén la misma lógica
- Usa patrones idiomáticos del lenguaje destino
- Incluye manejo de tipos si aplica
- Mantén los comentarios traducidos
```

---

## 7. Errores Comunes

### 7.1 Prompts Vagos

```
❌ "Haz código mejor"
✅ "Refactoriza para separar la lógica de validación
    en una función independiente"
```

### 7.2 Falta de Contexto

```
❌ "Arregla el bug"
✅ "El código lanza TypeError cuando el usuario
    es null. Agrega validación para este caso."
```

### 7.3 Demasiadas Instrucciones

```
❌ [prompt de 500 palabras con 20 requisitos]
✅ Dividir en múltiples prompts enfocados
```

### 7.4 Asumir Conocimiento

```
❌ "Usa el patrón de siempre"
✅ "Usa el patrón Repository con inyección
    de dependencias"
```

---

## Resumen

- Los prompts efectivos tienen **contexto, instrucción y formato**
- **Zero-shot** para tareas simples, **few-shot** para patrones
- **Chain-of-thought** para problemas complejos
- **Iterar** es normal y esperado
- Mantener una **biblioteca de prompts** reutilizables

---

## Recursos Adicionales

- [Prompt Engineering Guide](https://www.promptingguide.ai)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Prompt Library](https://docs.anthropic.com/claude/prompt-library)

---

*Siguiente: Módulo 04 - Generación de Código con LLMs*
