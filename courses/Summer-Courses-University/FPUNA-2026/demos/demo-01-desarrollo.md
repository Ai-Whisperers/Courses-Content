# Demo Track 01: Desarrollo de Software con IA

## Generación y Refactoring de Código

### Objetivo
Demostrar cómo Claude acelera el desarrollo de software profesional.

---

## Demo 1: Generar API REST Completa

```bash
claude "Crea una API REST básica con Node.js y Express para gestionar productos de una tienda:

Endpoints:
- GET /productos (listar todos)
- GET /productos/:id (obtener uno)
- POST /productos (crear)
- PUT /productos/:id (actualizar)
- DELETE /productos/:id (eliminar)

Producto tiene: id, nombre, precio (en guaraníes), stock, categoria

Incluye:
- Validación básica de datos
- Respuestas JSON estructuradas
- Códigos de estado HTTP correctos
- Comentarios en español
- Un array en memoria como 'base de datos' temporal"
```

**Resultado esperado:** API funcional lista para probar con Postman.

---

## Demo 2: Tests Automáticos

```bash
claude "Escribe tests unitarios con Jest para esta función:

function calcularDescuento(precio, porcentaje) {
  if (precio < 0 || porcentaje < 0 || porcentaje > 100) {
    throw new Error('Valores inválidos');
  }
  return precio - (precio * porcentaje / 100);
}

Incluye tests para:
- Casos normales
- Valores límite (0%, 100%)
- Casos de error
- Valores decimales"
```

**Resultado esperado:** Suite de tests completa con describe/it.

---

## Demo 3: Refactorizar Código Malo

```bash
claude "Refactoriza este código para que sea limpio y mantenible:

function p(d) {
  var r = [];
  for (var i = 0; i < d.length; i++) {
    if (d[i].a === true && d[i].p > 100000) {
      var x = {};
      x.n = d[i].n;
      x.p = d[i].p * 0.9;
      x.d = '10%';
      r.push(x);
    }
  }
  return r;
}

El código filtra productos activos mayores a ₲100,000 y les aplica descuento.

Mejora:
- Nombres descriptivos
- Arrow functions
- Métodos de array modernos
- Constantes para valores mágicos
- JSDoc para documentación"
```

**Resultado esperado:** Código limpio y documentado.

---

## Demo 4: Convertir SQL a ORM

```bash
claude "Convierte estas queries SQL a Sequelize (Node.js):

-- Obtener usuarios activos con sus pedidos del último mes
SELECT u.*, COUNT(p.id) as total_pedidos
FROM usuarios u
LEFT JOIN pedidos p ON u.id = p.usuario_id
WHERE u.activo = true
AND p.fecha >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
GROUP BY u.id
HAVING total_pedidos > 0
ORDER BY total_pedidos DESC;

-- Crear nuevo pedido
INSERT INTO pedidos (usuario_id, total, estado, fecha)
VALUES (?, ?, 'pendiente', NOW());

Incluye la definición de los modelos Usuario y Pedido."
```

**Resultado esperado:** Modelos Sequelize y queries equivalentes.

---

## Demo 5: Debugging Asistido

```bash
claude "Este código tiene un bug que causa un loop infinito. Encuéntralo y corrígelo:

function buscarElemento(arr, target) {
  let inicio = 0;
  let fin = arr.length - 1;

  while (inicio <= fin) {
    let medio = Math.floor((inicio + fin) / 2);

    if (arr[medio] === target) {
      return medio;
    }

    if (arr[medio] < target) {
      inicio = medio;
    } else {
      fin = medio;
    }
  }

  return -1;
}

// Test: buscarElemento([1, 3, 5, 7, 9], 7)
"
```

**Resultado esperado:** Identificación del bug (inicio = medio + 1, fin = medio - 1).

---

## Demo 6: Documentar Código Existente

```bash
claude "Agrega documentación JSDoc completa a esta clase:

class CarritoCompras {
  constructor() {
    this.items = [];
  }

  agregarItem(producto, cantidad) {
    const itemExistente = this.items.find(i => i.producto.id === producto.id);
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.items.push({ producto, cantidad });
    }
  }

  eliminarItem(productoId) {
    this.items = this.items.filter(i => i.producto.id !== productoId);
  }

  calcularTotal() {
    return this.items.reduce((total, item) =>
      total + (item.producto.precio * item.cantidad), 0);
  }

  vaciar() {
    this.items = [];
  }
}

Incluye @class, @method, @param, @returns, @example para cada método."
```

**Resultado esperado:** Clase completamente documentada.

---

## Demo 7: Patrón de Diseño

```bash
claude "Implementa el patrón Singleton en TypeScript para una conexión de base de datos:

Requisitos:
- Solo una instancia de conexión
- Método getInstance() para obtener la instancia
- Método connect(config) para configurar
- Método query(sql) que simule ejecutar query
- Manejo de errores si se intenta query sin conexión

Incluye tipos de TypeScript completos y ejemplo de uso."
```

**Resultado esperado:** Implementación correcta del patrón Singleton.

---

## Ejercicio Interactivo

Los estudiantes eligen un proyecto:

1. **API de biblioteca** - CRUD de libros y préstamos
2. **Sistema de notas** - CRUD de estudiantes y calificaciones
3. **Inventario** - CRUD de productos con stock

Usan Claude para:
1. Generar la estructura básica
2. Agregar validaciones
3. Escribir tests
4. Documentar el código

---

## Herramientas Complementarias

- **Postman/Insomnia:** Probar APIs
- **Jest:** Ejecutar tests
- **ESLint:** Verificar estilo de código
- **VS Code:** Editor con extensiones

---

## Puntos de Discusión

- ¿El código generado sigue las mejores prácticas?
- ¿Qué errores típicos comete la IA?
- ¿Cómo verificar que el código es correcto?
- ¿Cuándo es mejor escribir código manualmente?

---

*Demo Track 01 - FPUNA 2026*
