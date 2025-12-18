# Biblioteca de Prompts: Documentación con IA

Esta biblioteca contiene prompts optimizados para generar documentación de alta calidad con asistencia de IA.

---

## 1. Docstrings

### 1.1 Función - Estilo Google

```
Genera docstring estilo Google para esta función:

```[lenguaje]
[código de la función]
```

Incluye:
- Descripción breve (una línea)
- Descripción detallada si es necesaria
- Args con tipo y descripción
- Returns con tipo y descripción
- Raises con excepciones posibles
- Examples con casos de uso
```

### 1.2 Función - Estilo NumPy

```
Genera docstring estilo NumPy para esta función:

```python
[código]
```

Formato NumPy:
- Summary line
- Extended summary
- Parameters (nombre : tipo, descripción)
- Returns (tipo, descripción)
- Raises
- See Also (si aplica)
- Examples
```

### 1.3 Clase Completa

```
Documenta esta clase con docstrings para la clase y todos sus métodos:

```[lenguaje]
[código de la clase]
```

Estilo: [Google/NumPy]

Para la clase incluye:
- Propósito general
- Atributos de instancia
- Ejemplo de uso

Para cada método:
- Descripción
- Args
- Returns
- Raises
```

### 1.4 Agregar Type Hints + Docstrings

```
Agrega type hints y docstrings a este código:

```python
[código sin tipos ni documentación]
```

Requisitos:
- Type hints para todos los parámetros y retornos
- Usar tipos del módulo typing (List, Dict, Optional, Union)
- Compatibilidad con Python 3.8+
- Docstrings estilo Google
```

---

## 2. README

### 2.1 README Completo

```
Genera un README.md profesional para este proyecto:

Nombre: [nombre del proyecto]
Descripción: [qué hace]
Tecnologías: [lista de tecnologías]
Características:
- [característica 1]
- [característica 2]

Incluir:
1. Badges (build, coverage, version, license)
2. Logo placeholder
3. Descripción atractiva
4. Quick Start (máximo 3 comandos)
5. Instalación detallada
6. Configuración
7. Uso con ejemplos de código
8. API Reference resumida
9. Contributing
10. License
11. Autores/Créditos

Formato: Markdown con buen uso de headers, código, tablas.
```

### 2.2 README Minimalista

```
Genera un README.md conciso para:

Proyecto: [nombre]
Descripción: [qué hace en una oración]

Incluir solo:
- Descripción breve
- Instalación (1-2 comandos)
- Uso básico (1 ejemplo)
- License

Máximo 50 líneas de Markdown.
```

### 2.3 README para Librería

```
Genera README.md para esta librería/paquete:

Nombre: [nombre]
Lenguaje: [lenguaje]
Propósito: [qué problema resuelve]

API principal:
```[lenguaje]
[funciones/clases principales]
```

Incluir:
- Instalación (pip/npm/cargo)
- Quick Start
- Ejemplos de uso progresivos (básico → avanzado)
- API Reference tabla
- Comparación con alternativas (opcional)
- Changelog link
- Contributing link
```

---

## 3. Documentación de API

### 3.1 OpenAPI/Swagger

```
Genera especificación OpenAPI 3.0 para esta API:

Endpoints:
[lista de endpoints con método y ruta]

Modelos:
[descripción de modelos de datos]

Incluir:
- info (title, description, version)
- servers
- paths con operaciones
- components/schemas
- components/securitySchemes (si hay auth)
- examples para requests y responses
- Todos los códigos de error posibles
```

### 3.2 Documentación de Endpoint (Markdown)

```
Documenta este endpoint en Markdown:

```[lenguaje]
[código del endpoint]
```

Formato:
## [Nombre descriptivo]

### Endpoint
`[METHOD] [path]`

### Descripción
[Qué hace]

### Headers
| Header | Valor | Requerido |
|--------|-------|-----------|

### Query Parameters
| Param | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|

### Request Body
```json
{
  // con comentarios
}
```

### Responses
#### 200 Success
```json
{}
```

### Ejemplo
```bash
curl ...
```
```

### 3.3 API Reference Completa

```
Genera documentación de API Reference para:

```[lenguaje]
[código de la API/módulo]
```

Para cada función/método público incluye:
- Firma completa con tipos
- Descripción breve
- Parámetros (tabla)
- Retorno
- Excepciones
- Ejemplo de uso

Formato: Markdown con navegación interna (anchors).
```

---

## 4. Documentación Técnica

### 4.1 Architecture Decision Record (ADR)

```
Genera un ADR para esta decisión técnica:

Título: [título de la decisión]
Contexto: [situación que requiere decisión]
Decisión tomada: [qué se decidió]
Alternativas consideradas: [lista de alternativas]

Formato ADR:
# [Número] - [Título]

## Status
[Proposed/Accepted/Deprecated/Superseded]

## Context
[El problema y contexto]

## Decision
[La decisión tomada]

## Consequences
### Positive
- ...
### Negative
- ...

## Alternatives Considered
### [Alternativa 1]
- Pros: ...
- Cons: ...
```

### 4.2 Documento de Diseño

```
Genera un documento de diseño técnico para:

Feature: [nombre de la feature]
Objetivo: [qué problema resuelve]
Alcance: [qué incluye y qué no]

Secciones:
1. Resumen ejecutivo
2. Contexto y problema
3. Propuesta de solución
4. Diseño técnico detallado
5. Alternativas consideradas
6. Plan de implementación
7. Riesgos y mitigaciones
8. Métricas de éxito
```

### 4.3 Runbook/Playbook

```
Genera un runbook para esta operación:

Operación: [nombre]
Propósito: [cuándo usar este runbook]
Prerrequisitos: [accesos, herramientas necesarias]

Pasos:
1. [paso 1]
2. [paso 2]
...

Formato:
## [Nombre de la Operación]

### Cuándo usar
[Descripción de cuándo aplicar]

### Prerrequisitos
- [ ] [prerrequisito 1]
- [ ] [prerrequisito 2]

### Procedimiento
1. **[Título del paso]**
   ```bash
   [comando]
   ```
   Verificación: [cómo saber que funcionó]

### Troubleshooting
| Síntoma | Causa probable | Solución |
|---------|----------------|----------|

### Rollback
[Cómo revertir si algo sale mal]
```

---

## 5. Diagramas

### 5.1 Diagrama de Arquitectura

```
Genera un diagrama Mermaid de arquitectura para:

Sistema: [nombre]
Componentes:
- [componente 1]: [descripción]
- [componente 2]: [descripción]

Conexiones:
- [componente 1] → [componente 2]: [tipo de conexión]

Usa subgraphs para agrupar componentes relacionados.
Incluye bases de datos, caches, colas, servicios externos.
```

### 5.2 Diagrama de Secuencia

```
Genera un diagrama de secuencia Mermaid para:

Flujo: [nombre del flujo]
Participantes:
- [actor 1]
- [servicio 1]
- [servicio 2]

Pasos:
1. [actor] hace [acción] a [servicio]
2. [servicio] responde con [respuesta]
...

Incluye:
- Activaciones
- Respuestas
- Alt/Opt para condiciones
- Notas explicativas
```

### 5.3 Diagrama de Flujo

```
Genera un diagrama de flujo Mermaid para:

Proceso: [nombre del proceso]
Pasos:
1. [paso 1]
2. [decisión]: si [condición] entonces [paso A] sino [paso B]
3. [paso final]

Incluye:
- Inicio y fin claramente marcados
- Decisiones con condiciones
- Loops si aplica
```

### 5.4 Diagrama ER

```
Genera un diagrama ER en Mermaid para:

Entidades:
- [Entidad1]: [campos]
- [Entidad2]: [campos]

Relaciones:
- [Entidad1] tiene muchos [Entidad2]
- [Entidad2] pertenece a [Entidad1]

Incluye tipos de datos y cardinalidad.
```

---

## 6. Documentación de Usuario

### 6.1 Guía de Usuario

```
Genera una guía de usuario para:

Producto: [nombre]
Audiencia: [tipo de usuario]
Funcionalidades principales:
- [funcionalidad 1]
- [funcionalidad 2]

Formato:
# Guía de Usuario - [Producto]

## Introducción
[Qué es y para qué sirve]

## Primeros pasos
[Cómo empezar]

## [Funcionalidad 1]
### Descripción
### Paso a paso
### Tips

## FAQ
## Soporte
```

### 6.2 Tutorial

```
Genera un tutorial paso a paso para:

Objetivo: [qué aprenderá el usuario]
Prerrequisitos: [conocimientos/herramientas]
Duración estimada: [tiempo]

Formato:
# Tutorial: [Título]

## Objetivo
Al finalizar, podrás [objetivo]

## Prerrequisitos
- [prerrequisito 1]
- [prerrequisito 2]

## Paso 1: [Título]
[Explicación]
```[código si aplica]```
[Verificación]

## Paso 2: ...

## Resumen
[Lo que aprendiste]

## Próximos pasos
[Qué explorar después]
```

---

## 7. Changelog

### 7.1 Entrada de Changelog

```
Genera entrada de changelog para estos cambios:

Versión: [x.y.z]
Fecha: [fecha]
Cambios:
- [cambio 1]
- [cambio 2]
- [fix 1]

Formato Keep a Changelog:
## [x.y.z] - YYYY-MM-DD

### Added
- Nueva funcionalidad X

### Changed
- Modificación a Y

### Deprecated
- Feature Z será removida

### Removed
- Eliminado A

### Fixed
- Corregido bug B

### Security
- Actualización de seguridad C
```

---

## 8. Comentarios de Código

### 8.1 Comentarios Explicativos

```
Agrega comentarios a este código donde sea necesario:

```[lenguaje]
[código]
```

Reglas:
- Solo comentar lógica no obvia
- No comentar lo que el código ya dice claramente
- Explicar el "por qué", no el "qué"
- Comentar workarounds o decisiones no obvias
```

### 8.2 TODO/FIXME

```
Revisa este código e identifica lugares para agregar:

```[lenguaje]
[código]
```

Agregar comentarios tipo:
- TODO: para mejoras futuras
- FIXME: para bugs conocidos
- HACK: para workarounds temporales
- NOTE: para aclaraciones importantes
- OPTIMIZE: para código que puede optimizarse
```

---

## Plantillas Rápidas

### README Mínimo
```markdown
# Proyecto

Descripción en una línea.

## Instalación
```bash
comando
```

## Uso
```código```

## Licencia
MIT
```

### Docstring Google
```python
"""Descripción breve.

Args:
    param: Descripción.

Returns:
    Descripción.

Raises:
    Error: Cuándo.
"""
```

### OpenAPI Mínimo
```yaml
openapi: 3.0.0
info:
  title: API
  version: 1.0.0
paths:
  /endpoint:
    get:
      summary: Descripción
      responses:
        '200':
          description: OK
```

---

## Consejos de Uso

1. **Especifica el estilo** - Google, NumPy, JSDoc, etc.
2. **Indica la audiencia** - Desarrollador, usuario final, etc.
3. **Define el nivel de detalle** - Breve, detallado, exhaustivo
4. **Pide ejemplos** - Mejoran mucho la documentación
5. **Revisa siempre** - La IA puede inventar comportamientos

---

*Biblioteca de Prompts - Curso IA para Desarrollo de Software*
