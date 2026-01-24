# Guion de Clase - Dia 4: IA para Desarrollo de Software

## Informacion de la Clase

| Aspecto | Detalle |
|---------|---------|
| **Duracion** | 2 horas |
| **Audiencia** | Estudiantes de Informatica, Desarrollo de Software |
| **Objetivo** | Usar IA para escribir, debuggear y documentar codigo |

---

## PRE-CLASE (15 min antes)

### Checklist del Instructor

- [ ] VS Code con extensiones instaladas
- [ ] Node.js proyecto de ejemplo listo
- [ ] Claude Code funcionando en terminal
- [ ] Repositorio de ejemplo en GitHub
- [ ] Tests de ejemplo preparados

### Proyecto de Ejemplo

Tener listo un proyecto Node.js simple:
```
demo-proyecto/
├── package.json
├── src/
│   └── index.js
├── tests/
│   └── index.test.js
└── README.md
```

---

## MODULO 1: IA en el Workflow de Desarrollo (15 min)

### 0:00 - 0:05 | El Nuevo Paradigma

**DECIR:**
> "Desarrollar software ya no es solo escribir codigo. Es colaborar con IA para escribir MEJOR codigo, mas rapido. Hoy van a aprender a integrar IA en cada paso de su workflow."

### 0:05 - 0:15 | Demo Rapida: Antes vs Despues

**SIN IA (mostrar rapidamente):**
- Buscar en Stack Overflow
- Copiar codigo, adaptarlo
- Debuggear manualmente
- Escribir documentacion al final

**CON IA (demo en vivo):**
```
Crea una funcion JavaScript que:
- Reciba un array de objetos con {nombre, edad}
- Filtre los mayores de 18
- Ordene por edad descendente
- Retorne solo los nombres

Incluye JSDoc y un test con Jest.
```

**PUNTO:**
> "En 30 segundos tenemos codigo, documentacion y tests. Antes esto tomaba 15+ minutos."

---

## MODULO 2: Escribir Codigo con IA (20 min)

### 0:15 - 0:25 | Prompts Efectivos para Codigo

**ESTRUCTURA OPTIMA:**
```
[CONTEXTO] Proyecto: API REST con Express y PostgreSQL
[TAREA] Crear endpoint para registro de usuarios
[ESPECIFICACIONES]
- POST /api/users
- Campos: email, password, nombre
- Validar email unico
- Hashear password con bcrypt
- Retornar JWT al registrar
[FORMATO]
- Codigo TypeScript
- Comentarios en espanol
- Manejo de errores con try/catch
- Usar async/await
```

### 0:25 - 0:35 | Ejercicio: Crear Feature Completa

**EJERCICIO:**
> "Cada uno va a crear una feature para un proyecto ficticio."

**OPCIONES:**
```
A) Sistema de autenticacion JWT
B) CRUD de productos con paginacion
C) Sistema de notificaciones por email
D) API de busqueda con filtros
```

**PROMPT BASE:**
```
Crea [TU FEATURE] para una aplicacion Node.js/Express.

Incluye:
1. Modelo de datos (Prisma/Sequelize schema)
2. Controlador con logica de negocio
3. Rutas con validacion (express-validator)
4. Tests unitarios (Jest)
5. Documentacion de API (formato OpenAPI)
```

---

## MODULO 3: Debugging con IA (20 min)

### 0:35 - 0:45 | El Arte del Debug Prompt

**DECIR:**
> "Cuando tienen un bug, la IA es su mejor aliado. Pero necesitan darle contexto."

**TEMPLATE DE DEBUG:**
```
PROBLEMA:
[Descripcion del error]

CODIGO:
[Pegar codigo relevante]

ERROR:
[Mensaje de error exacto]

LO QUE YA PROBE:
[Intentos previos]

ESPERADO VS ACTUAL:
[Comportamiento esperado vs lo que pasa]
```

### 0:45 - 0:55 | Demo: Debugging Real

**CODIGO CON BUG:**
```javascript
async function getUsers() {
  const users = await fetch('/api/users');
  return users.json();
}

// Error: users.json is not a function
```

**PROMPT:**
```
Este codigo da error "users.json is not a function":

async function getUsers() {
  const users = await fetch('/api/users');
  return users.json();
}

Que esta mal y como lo arreglo?
```

**SOLUCION** (fetch retorna Response, no los datos):
```javascript
async function getUsers() {
  const response = await fetch('/api/users');
  const users = await response.json();
  return users;
}
```

---

## BREAK (10 min)

---

## MODULO 4: Testing con IA (20 min)

### 1:05 - 1:15 | Generacion de Tests

**DECIR:**
> "Escribir tests es tedioso. La IA puede generar tests comprehensivos en segundos."

**PROMPT:**
```
Genera tests Jest para esta funcion:

function calcularDescuento(precio, porcentaje, esVIP) {
  if (precio < 0 || porcentaje < 0) return null;
  let descuento = precio * (porcentaje / 100);
  if (esVIP) descuento *= 1.1;
  return precio - descuento;
}

Incluye:
- Tests de casos normales
- Tests de edge cases (valores limite)
- Tests de casos de error
- Minimo 10 tests diferentes
```

### 1:15 - 1:25 | TDD con IA

**FLUJO TDD ASISTIDO:**

1. **Escribir test primero (con IA):**
```
Genera un test Jest para una funcion que:
- Valide formato de email
- Retorne true/false
```

2. **Implementar (con IA):**
```
Implementa la funcion que pase este test:
[pegar test generado]
```

3. **Refactorizar (con IA):**
```
Refactoriza esta funcion para mejor rendimiento
manteniendo los tests verdes.
```

---

## MODULO 5: Documentacion y Code Review (15 min)

### 1:25 - 1:35 | Documentacion Automatica

**PROMPT PARA DOCUMENTAR:**
```
Genera documentacion completa para este archivo:

[PEGAR CODIGO]

Incluye:
1. JSDoc para cada funcion
2. README con ejemplos de uso
3. Comentarios inline donde sea necesario
4. Ejemplos de request/response (si es API)
```

### 1:35 - 1:40 | Code Review con IA

**PROMPT:**
```
Haz code review de este codigo. Evalua:
1. Calidad y legibilidad
2. Posibles bugs
3. Seguridad (inyeccion SQL, XSS, etc)
4. Performance
5. Mejores practicas

Se especifico con lineas y sugerencias de mejora.

[PEGAR CODIGO]
```

---

## MODULO 6: Proyecto Integrador (15 min)

### 1:40 - 1:55 | Mini-API Completa

**EJERCICIO FINAL:**
> "En 15 minutos, usando IA, van a crear una mini-API funcional."

**ESPECIFICACIONES:**
```
API de Tareas (To-Do List):
- GET /tasks - listar todas
- POST /tasks - crear nueva
- PUT /tasks/:id - actualizar
- DELETE /tasks/:id - eliminar

Requisitos:
- Express + JavaScript
- Datos en memoria (array)
- Validacion basica
- Tests para cada endpoint
- README con instrucciones
```

**PASOS:**
1. Pedir estructura del proyecto (1 min)
2. Pedir codigo del servidor (2 min)
3. Pedir tests (2 min)
4. Ejecutar y verificar (5 min)
5. Pedir mejoras (5 min)

---

## MODULO 7: Cierre + Recursos (5 min)

### 1:55 - 2:00 | Resumen

**DECIR:**
> "Hoy aprendieron a:
> - Escribir codigo de calidad con prompts estructurados
> - Debuggear eficientemente con contexto completo
> - Generar tests automaticamente
> - Documentar codigo profesionalmente
> - Hacer code review asistido"

**RECURSOS:**
```
HERRAMIENTAS RECOMENDADAS:
- GitHub Copilot (complemento a Claude)
- ESLint + Prettier (calidad automatica)
- Jest (testing)
- TypeScript (tipos = menos bugs)

LECTURAS:
- Clean Code (Robert Martin)
- The Pragmatic Programmer
```

**ADVERTENCIA:**
> "La IA es un asistente, no un reemplazo. SIEMPRE revisen el codigo generado. Entiendan que hace antes de usarlo en produccion."

---

## NOTAS POST-CLASE

### Registrar

- [ ] Lenguajes/frameworks que usan los estudiantes
- [ ] Nivel de experiencia del grupo
- [ ] Proyectos personales mencionados

### Seguimiento

- Quien quiere mostrar su proyecto en clase futura?
- Dudas sobre arquitectura/patrones?

---

*Guion Dia 4 - Software*
*FPUNA Verano 2026*
