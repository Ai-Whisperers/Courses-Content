# OpenCode Prompt: Generación Automática de Tests
## Módulo 05: IA para QA

Use this prompt template with OpenCode to generate complete test suites automatically.

---

## PROMPT SIMPLE

```
Genera tests Playwright completos para [FEATURE]:

CONTEXTO:
- URL: [URL_DEL_SITIO]
- Funcionalidad: [DESCRIPCIÓN_BREVE]
- Framework: Playwright + TypeScript

CASOS A CUBRIR:
1. [Happy path - caso exitoso]
2. [Error path - validaciones fallidas]
3. [Edge case - casos límite]

INCLUIR:
- Page Object Model
- AAA pattern (Arrange, Act, Assert)
- Test names en español
- Comentarios explicativos
```

---

## PROMPT AVANZADO (RECOMENDADO)

```
Genera suite COMPLETA de tests Playwright + TypeScript para [FEATURE] FPUNA:

═══════════════════════════════════════
ESPECIFICACIONES DEL SITIO
═══════════════════════════════════════

Sistema: [NOMBRE_SISTEMA]
URL: [URL_BASE]
Framework: Next.js / React / Vue

FEATURE A TESTEAR:
- Nombre: [NOMBRE_FEATURE]
- Descripción: [DESCRIPCIÓN_DETALLADA]
- Usuarios: [TIPOS_DE_USUARIOS]

═══════════════════════════════════════
DATOS DE PRUEBA (PARAGUAY)
═══════════════════════════════════════

Usuarios:
- Email: usuario@fpuna.edu.py
- CI: 1.234.567
- Teléfono: +595 971 234567

Contexto Paraguay:
- Moneda: Guaraní (₲)
- Idioma: Español
- Formato fecha: DD/MM/YYYY

═══════════════════════════════════════
CASOS DE PRUEBA A CUBRIR
═══════════════════════════════════════

HAPPY PATH (Flujo exitoso):
1. [Caso 1 - descripción]
2. [Caso 2 - descripción]
3. [Caso 3 - descripción]

VALIDACIONES (Errores esperados):
1. [Validación 1 - qué valida]
2. [Validación 2 - qué valida]
3. [Validación 3 - qué valida]

EDGE CASES (Casos límite):
1. [Edge case 1]
2. [Edge case 2]
3. [Edge case 3]

═══════════════════════════════════════
REQUISITOS TÉCNICOS
═══════════════════════════════════════

Estructura:
- Crear 2 archivos:
  1. pages/[feature].page.ts (Page Object)
  2. tests/[feature].spec.ts (Test suite)

Page Object:
- Métodos para cada acción principal
- Getters para elementos key
- Helpers para operaciones comunes
- Comentarios en español

Tests:
- Nombres descriptivos en español
- AAA pattern (Arrange, Act, Assert)
- Una asserción clara por test (cuando sea posible)
- Setup/teardown si es necesario

Selectores:
- Prioridad: getByRole > getByLabel > getByText > getByTestId > CSS
- Evitar: XPath, nth-child, clases frágiles

═══════════════════════════════════════
SALIDA ESPERADA
═══════════════════════════════════════

Cantidad mínima de tests:
- [N] tests para happy path
- [N] tests para validaciones
- [N] tests para edge cases
- TOTAL: [N]+ tests

Cobertura esperada: [%] de funcionalidad

═══════════════════════════════════════
EJEMPLOS DE USUARIOS TEST
═══════════════════════════════════════

Estudiante:
{
  "email": "juan.perez@fpuna.edu.py",
  "ci": "1.234.567",
  "nombre": "Juan Pérez",
  "carrera": "Ingeniería Informática"
}

Profesor:
{
  "email": "prof.garcia@fpuna.edu.py",
  "ci": "2.345.678",
  "nombre": "Prof. García"
}

Admin:
{
  "email": "admin@fpuna.edu.py",
  "ci": "3.456.789",
  "nombre": "Admin"
}

═══════════════════════════════════════
INSTRUCCIONES FINALES
═══════════════════════════════════════

✅ HACER:
- Tests independientes (no dependen de orden)
- Setup propio en cada test si es necesario
- Nombres descriptivos: "debería [acción] cuando [contexto]"
- Esperar con expect(), no setTimeout
- Documentar helpers complejos

❌ NO HACER:
- Tests que dependan de otros
- as any, @ts-ignore
- Tests vacíos o incompletos
- Hardcoded waits (setTimeout)
- Selectores con nth-child

FORMATO:
- TypeScript strict mode
- 2 espacios de indentación
- Comentarios // en español
```

---

## CASOS DE USO COMUNES

### 1️⃣ Generar Tests para Login
```
Genera tests Playwright para módulo de LOGIN de FPUNA:

FEATURE: Autenticación de estudiantes
URL: https://fpuna-sistema.edu.py/login

HAPPY PATH:
1. Login exitoso con email y password válidos
2. Redirige a /dashboard después de login
3. Muestra nombre del usuario en navbar

VALIDACIONES:
1. Email inválido: muestra error "Email inválido"
2. Password incorrecto: muestra "Credenciales incorrectas"
3. Campos vacíos: valida campos requeridos

EDGE CASES:
1. Click en "Recordarme" persiste sesión
2. Link "¿Olvidaste tu password?" navega correctamente
3. Botón deshabilitado mientras se procesa login

USUARIOS:
- estudiante@fpuna.edu.py / password123
- prof@fpuna.edu.py / profpass
- admin@fpuna.edu.py / adminpass
```

### 2️⃣ Generar Tests para Carrito de Compras
```
Genera tests para CARRITO E-COMMERCE FPUNA:

FEATURE: Gestión de carrito y checkout

CASOS:
- Agregar producto al carrito
- Aumentar/disminuir cantidad
- Eliminar producto
- Aplicar cupón descuento
- Proceso de checkout (3 pasos)
- Validaciones de stock

DATOS:
- Productos: [ID, nombre, precio, stock]
- Cupones: DESC10 (10%), FPUNA20 (20%)
```

### 3️⃣ Generar Tests para API
```
Genera tests de API para Playwright:

ENDPOINTS:
- GET /api/productos
- POST /api/carrito
- PUT /api/perfil
- DELETE /api/carrito/:id

MÉTODOS:
- request.get(), request.post(), etc.
- Validar status (200, 201, 400, 404)
- Validar schema de response
- Validar headers
```

---

## ESPERADOS OUTPUTS

**pages/[feature].page.ts**: Page Object con 5-10 métodos  
**tests/[feature].spec.ts**: Suite con 10-20 tests  
**Tiempo estimado**: 5-10 minutos  
**Líneas de código**: 300-500  

---

*OpenCode Prompt: Test Generation - Módulo 05 IA para QA - FPUNA 2026*
