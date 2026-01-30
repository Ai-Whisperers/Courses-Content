# Ejemplo: Validación de Schemas con Zod
## Módulo 02: API Testing

```
Genera tests con Zod para validar schemas de API:

API: Gestión de Estudiantes FPUNA

SCHEMAS:
Student: id (number), nombre (string), email (string), carrera (string)
Curso: id, titulo, descripcion, estudiantes (array)

TESTS:
1. Validar respuesta GET /students/:id
2. Validar respuesta POST /courses
3. Rechazar data inválida (email sin @)
4. Validar arrays de estudiantes
5. Manejo de campos opcionales

Incluir:
- Zod schemas con validaciones
- safeParse para manejar errores
- Type inference (z.infer)
- Error messages detallados

Código TypeScript, comentarios en español
```

---

*Ejemplo: Schema Validation - Módulo 02 API Testing - FPUNA 2026*
