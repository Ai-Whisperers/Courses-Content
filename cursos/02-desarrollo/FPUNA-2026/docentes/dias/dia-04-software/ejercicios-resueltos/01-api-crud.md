# Ejercicio Resuelto: API CRUD Completa

## Objetivo
Crear una API REST funcional con Express usando prompts estructurados.

---

## Prompt del Estudiante

```
Crea una API REST de tareas (to-do list) con Express y JavaScript:

Endpoints:
- GET /tasks - listar todas
- POST /tasks - crear nueva
- PUT /tasks/:id - actualizar
- DELETE /tasks/:id - eliminar

Requisitos:
- Datos en memoria (array)
- Validacion basica
- Respuestas JSON con codigos HTTP correctos
- Comentarios en espanol
```

---

## Respuesta Esperada

### server.js

```javascript
/**
 * API REST de Tareas (To-Do List)
 * FPUNA Verano 2026 - Dia 4: Software
 *
 * Ejecutar: node server.js
 * Probar: http://localhost:3000/tasks
 */

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// ============================================
// BASE DE DATOS EN MEMORIA
// ============================================

let tareas = [
  { id: 1, titulo: 'Aprender Express', completada: false, creada: new Date() },
  { id: 2, titulo: 'Practicar con Claude', completada: true, creada: new Date() }
];

let siguienteId = 3;

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Busca una tarea por ID
 * @param {number} id - ID de la tarea
 * @returns {object|undefined} - Tarea encontrada o undefined
 */
function buscarTareaPorId(id) {
  return tareas.find(t => t.id === parseInt(id));
}

/**
 * Valida los datos de una tarea
 * @param {object} datos - Datos a validar
 * @returns {string|null} - Mensaje de error o null si es valido
 */
function validarTarea(datos) {
  if (!datos.titulo) {
    return 'El titulo es obligatorio';
  }
  if (datos.titulo.length < 3) {
    return 'El titulo debe tener al menos 3 caracteres';
  }
  if (datos.titulo.length > 100) {
    return 'El titulo no puede superar 100 caracteres';
  }
  return null;
}

// ============================================
// ENDPOINTS
// ============================================

/**
 * GET /tasks
 * Obtiene todas las tareas
 */
app.get('/tasks', (req, res) => {
  // Filtrar por estado si se proporciona query param
  const { completada } = req.query;

  let resultado = tareas;

  if (completada !== undefined) {
    const filtro = completada === 'true';
    resultado = tareas.filter(t => t.completada === filtro);
  }

  res.json({
    exito: true,
    cantidad: resultado.length,
    datos: resultado
  });
});

/**
 * GET /tasks/:id
 * Obtiene una tarea especifica
 */
app.get('/tasks/:id', (req, res) => {
  const tarea = buscarTareaPorId(req.params.id);

  if (!tarea) {
    return res.status(404).json({
      exito: false,
      mensaje: 'Tarea no encontrada'
    });
  }

  res.json({
    exito: true,
    datos: tarea
  });
});

/**
 * POST /tasks
 * Crea una nueva tarea
 */
app.post('/tasks', (req, res) => {
  // Validar datos
  const error = validarTarea(req.body);
  if (error) {
    return res.status(400).json({
      exito: false,
      mensaje: error
    });
  }

  // Crear nueva tarea
  const nuevaTarea = {
    id: siguienteId++,
    titulo: req.body.titulo,
    completada: req.body.completada || false,
    creada: new Date()
  };

  tareas.push(nuevaTarea);

  res.status(201).json({
    exito: true,
    mensaje: 'Tarea creada exitosamente',
    datos: nuevaTarea
  });
});

/**
 * PUT /tasks/:id
 * Actualiza una tarea existente
 */
app.put('/tasks/:id', (req, res) => {
  const tarea = buscarTareaPorId(req.params.id);

  if (!tarea) {
    return res.status(404).json({
      exito: false,
      mensaje: 'Tarea no encontrada'
    });
  }

  // Validar si se envia titulo
  if (req.body.titulo) {
    const error = validarTarea(req.body);
    if (error) {
      return res.status(400).json({
        exito: false,
        mensaje: error
      });
    }
    tarea.titulo = req.body.titulo;
  }

  // Actualizar completada si se envia
  if (req.body.completada !== undefined) {
    tarea.completada = Boolean(req.body.completada);
  }

  tarea.actualizada = new Date();

  res.json({
    exito: true,
    mensaje: 'Tarea actualizada exitosamente',
    datos: tarea
  });
});

/**
 * DELETE /tasks/:id
 * Elimina una tarea
 */
app.delete('/tasks/:id', (req, res) => {
  const indice = tareas.findIndex(t => t.id === parseInt(req.params.id));

  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      mensaje: 'Tarea no encontrada'
    });
  }

  const tareaEliminada = tareas.splice(indice, 1)[0];

  res.json({
    exito: true,
    mensaje: 'Tarea eliminada exitosamente',
    datos: tareaEliminada
  });
});

// ============================================
// MANEJO DE ERRORES
// ============================================

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    exito: false,
    mensaje: `Ruta ${req.method} ${req.path} no encontrada`
  });
});

// Error del servidor
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    exito: false,
    mensaje: 'Error interno del servidor'
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('Endpoints disponibles:');
  console.log('  GET    /tasks       - Listar todas');
  console.log('  GET    /tasks/:id   - Obtener una');
  console.log('  POST   /tasks       - Crear nueva');
  console.log('  PUT    /tasks/:id   - Actualizar');
  console.log('  DELETE /tasks/:id   - Eliminar');
});
```

---

## Pruebas con cURL

### Listar todas las tareas
```bash
curl http://localhost:3000/tasks
```

### Crear nueva tarea
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Nueva tarea de prueba"}'
```

### Actualizar tarea
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completada": true}'
```

### Eliminar tarea
```bash
curl -X DELETE http://localhost:3000/tasks/2
```

### Filtrar por completadas
```bash
curl "http://localhost:3000/tasks?completada=true"
```

---

## Respuestas Esperadas

### GET /tasks (200 OK)
```json
{
  "exito": true,
  "cantidad": 2,
  "datos": [
    {"id": 1, "titulo": "Aprender Express", "completada": false, "creada": "..."},
    {"id": 2, "titulo": "Practicar con Claude", "completada": true, "creada": "..."}
  ]
}
```

### POST /tasks (201 Created)
```json
{
  "exito": true,
  "mensaje": "Tarea creada exitosamente",
  "datos": {"id": 3, "titulo": "Nueva tarea", "completada": false, "creada": "..."}
}
```

### Error 404
```json
{
  "exito": false,
  "mensaje": "Tarea no encontrada"
}
```

### Error 400 (validacion)
```json
{
  "exito": false,
  "mensaje": "El titulo es obligatorio"
}
```

---

*Ejercicio 1 - Dia 4*
