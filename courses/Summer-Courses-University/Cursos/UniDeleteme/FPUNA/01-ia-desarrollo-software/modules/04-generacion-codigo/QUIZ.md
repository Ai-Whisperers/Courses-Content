# Quiz: Generación de Código con LLMs
## Evaluación del Módulo 04

---

## Instrucciones

- 10 preguntas de opción múltiple
- Tiempo sugerido: 10 minutos
- Puntaje mínimo para aprobar: 70%

---

## Preguntas

### 1. ¿Cuál es el primer paso en el flujo de trabajo con IA para código?

a) Generar código inmediatamente
b) Definir el requerimiento claramente
c) Buscar ejemplos en internet
d) Crear tests primero

---

### 2. ¿Para qué tipo de código es ideal usar IA?

a) Lógica de negocio crítica
b) Boilerplate y código repetitivo
c) Algoritmos de seguridad
d) Código que nadie revisará

---

### 3. ¿Qué debe incluir un prompt para generar una función?

a) Solo el nombre de la función
b) Nombre, parámetros, retorno y descripción
c) El código completo esperado
d) Solo ejemplos de uso

---

### 4. ¿Qué técnica es útil para refactoring de código largo?

a) Generar todo de nuevo
b) Pedir cambios incrementales paso a paso
c) Ignorar los code smells
d) Copiar código de Stack Overflow

---

### 5. Al convertir código entre lenguajes, ¿qué es importante verificar?

a) Que el código sea más corto
b) Que use las mismas bibliotecas
c) Que la funcionalidad sea equivalente
d) Que tenga los mismos nombres de variables

---

### 6. ¿Qué es un "code smell"?

a) Un bug crítico
b) Un patrón que indica posibles problemas
c) Código con errores de sintaxis
d) Código que huele mal

---

### 7. ¿Cuál es una práctica recomendada después de generar código con IA?

a) Usarlo directamente sin revisar
b) Revisar, probar y validar antes de usar
c) Eliminarlo y escribir todo manualmente
d) Compartirlo sin verificar

---

### 8. Al generar clases con IA, ¿qué se recomienda incluir en el prompt?

a) Solo el nombre de la clase
b) Propiedades, métodos, validaciones y ejemplos
c) El código de otras clases
d) Comentarios en inglés únicamente

---

### 9. ¿Qué ventaja tiene generar código incrementalmente?

a) Es más lento
b) Permite revisar y ajustar en cada paso
c) Genera más código
d) Evita usar IA

---

### 10. ¿Qué verificar en el checklist de revisión de código generado?

a) Solo que compile
b) Funcionalidad, calidad, seguridad y eficiencia
c) Que tenga muchas líneas
d) Que use las últimas bibliotecas

---

## Respuestas

<details>
<summary>Ver respuestas (no abrir hasta completar)</summary>

1. **b)** Definir el requerimiento claramente
2. **b)** Boilerplate y código repetitivo
3. **b)** Nombre, parámetros, retorno y descripción
4. **b)** Pedir cambios incrementales paso a paso
5. **c)** Que la funcionalidad sea equivalente
6. **b)** Un patrón que indica posibles problemas
7. **b)** Revisar, probar y validar antes de usar
8. **b)** Propiedades, métodos, validaciones y ejemplos
9. **b)** Permite revisar y ajustar en cada paso
10. **b)** Funcionalidad, calidad, seguridad y eficiencia

**Puntaje:**
- 9-10 correctas: Excelente
- 7-8 correctas: Bien
- 5-6 correctas: Necesita repaso
- <5 correctas: Revisar el módulo

</details>

---

## Ejercicio Práctico

Genera una clase con IA y aplica el checklist de revisión:

1. Usa este prompt:
```
Crea una clase BankAccount en Python con:
- Propiedades: account_number, owner_name, balance
- Métodos: deposit, withdraw, transfer, get_statement
- Validaciones apropiadas
- Type hints y docstrings
```

2. Revisa el código generado con el checklist:
   - [ ] ¿Valida que balance no sea negativo?
   - [ ] ¿Maneja errores de retiro insuficiente?
   - [ ] ¿El transfer funciona correctamente?
   - [ ] ¿Tiene documentación clara?

---

*Continúa al Módulo 05: Debugging Asistido por IA*
