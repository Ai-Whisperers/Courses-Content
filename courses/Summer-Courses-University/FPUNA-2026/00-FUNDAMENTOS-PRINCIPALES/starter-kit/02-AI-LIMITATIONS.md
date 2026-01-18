# Limitaciones de la IA - Lo que NO Puede Hacer

## Entender las limitaciones evita frustraciones y errores

---

## Limitaciones Fundamentales

### 1. No Ejecuta Código (Solo lo Genera)

```
┌─────────────────────────────────────────┐
│  LO QUE LA IA HACE:                     │
│  Genera texto que PARECE código válido  │
├─────────────────────────────────────────┤
│  LO QUE LA IA NO HACE:                  │
│  Ejecutar ese código para ver si        │
│  realmente funciona                     │
└─────────────────────────────────────────┘
```

**Implicación:** El código puede tener errores de sintaxis, lógica, o simplemente no funcionar. TÚ debes ejecutarlo y verificarlo.

**Excepción:** Claude Code PUEDE ejecutar código via la herramienta Bash, pero esto es diferente a que el modelo "entienda" la ejecución.

---

### 2. No Tiene Memoria Entre Sesiones

```
Sesión 1:
  Tú: "Mi proyecto usa FastAPI con PostgreSQL"
  IA: "Entendido, trabajemos con eso"

[Cierras y abres nueva sesión]

Sesión 2:
  Tú: "Continúa donde quedamos"
  IA: "No tengo información de sesiones anteriores"
```

**Solución:** Usar CLAUDE.md para persistir contexto importante.

---

### 3. Conocimiento con Fecha de Corte

| Modelo | Fecha de Corte Aprox. |
|--------|----------------------|
| GPT-4 | Abril 2023 |
| Claude 3 | Principios 2024 |
| Modelos nuevos | Varía |

**Lo que NO sabe:**
- Librerías lanzadas después de su corte
- Cambios en APIs recientes
- Noticias actuales
- Tu código (a menos que se lo des)

**Ejemplo de problema:**
```python
# IA sugiere:
from langchain import LLMChain  # API vieja

# Pero ahora es:
from langchain.chains import LLMChain  # API actual
```

---

### 4. Alucinaciones (Inventa Cosas)

La IA puede generar con total confianza:

- **Librerías que no existen**
  ```
  "Usa pip install magic-validator"  # No existe
  ```

- **Funciones inventadas**
  ```python
  import pandas as pd
  df.auto_clean()  # Este método no existe
  ```

- **Referencias falsas**
  ```
  "Según el paper de Smith et al. (2023)..."  # Paper inventado
  ```

- **URLs rotas**
  ```
  "Documentación en https://example.com/docs/..."  # 404
  ```

**Regla:** Si la IA menciona algo específico (librería, función, paper), VERIFICA que existe.

---

### 5. No Entiende TU Contexto

La IA no sabe:

| Lo que desconoce | Consecuencia |
|------------------|--------------|
| Estructura de tu proyecto | Puede sugerir archivos en lugares incorrectos |
| Convenciones de tu equipo | Puede violar tu style guide |
| Código existente | Puede duplicar funcionalidad |
| Requisitos de negocio | Puede ignorar reglas importantes |
| Tu nivel de experiencia | Puede ser muy básica o muy avanzada |

**Solución:** Proporcionar contexto explícito siempre.

---

### 6. Sesgos del Entrenamiento

La IA aprendió de código existente, que incluye:

- **Código malo**: Stack Overflow tiene respuestas incorrectas upvoteadas
- **Prácticas obsoletas**: Tutoriales viejos que ya no aplican
- **Sesgos de popularidad**: Prefiere soluciones "comunes" sobre óptimas
- **Código inseguro**: Ejemplos sin validación o sanitización

**Ejemplo:**
```python
# La IA puede sugerir (común pero inseguro):
query = f"SELECT * FROM users WHERE id = {user_id}"

# En lugar de (correcto):
query = "SELECT * FROM users WHERE id = %s"
cursor.execute(query, (user_id,))
```

---

## Limitaciones Prácticas

### No Puede Debuggear Sin Información

```
❌ "Mi código no funciona, arréglalo"
   → IA no sabe qué código, qué error, qué esperabas

✅ "Este código [código] da este error [error]
    cuando intento [acción]. Esperaba [resultado]."
   → IA tiene información para ayudar
```

---

### No Puede Leer Tu Mente

```
❌ "Hazlo mejor"
   → ¿Mejor cómo? ¿Más rápido? ¿Más legible? ¿Más seguro?

✅ "Refactoriza para reducir complejidad ciclomática"
   → Instrucción clara y específica
```

---

### No Puede Garantizar Corrección

```
Tú: "¿Este código tiene bugs?"
IA: "No veo bugs obvios"

Realidad: Puede tener bugs sutiles que la IA no detectó
```

**La IA puede pasar por alto:**
- Race conditions
- Edge cases raros
- Problemas de memoria
- Vulnerabilidades de seguridad
- Problemas de performance

---

### No Puede Acceder a Recursos Externos

La IA (modelo base) no puede:

| No puede | Alternativa |
|----------|-------------|
| Leer URLs en tiempo real | Tú pegas el contenido |
| Acceder a tu base de datos | Tú describes el schema |
| Ver tu pantalla | Tú describes o pegas código |
| Ejecutar tu ambiente | Tú reportas resultados |
| Instalar dependencias | Claude Code puede, tú supervisas |

---

## Cuándo NO Usar IA

### 1. Código Crítico de Seguridad

```
❌ No generes con IA sin revisión experta:
- Autenticación y autorización
- Criptografía
- Validación de entrada
- Manejo de datos sensibles
```

### 2. Decisiones de Arquitectura Importantes

```
❌ No delegues completamente:
- Elección de base de datos
- Diseño de sistema distribuido
- Patrones de escalabilidad
```

### 3. Cuando No Entiendes el Output

```
❌ Si no puedes explicar qué hace el código,
   no lo uses en producción.
```

### 4. Código con Implicaciones Legales

```
❌ No confíes ciegamente para:
- Cumplimiento normativo (GDPR, HIPAA)
- Licencias de software
- Contratos o términos legales
```

---

## Tabla de Confiabilidad

| Tarea | Confiabilidad | Verificación Necesaria |
|-------|---------------|------------------------|
| Sintaxis básica | Alta | Ejecutar |
| Algoritmos comunes | Media-Alta | Tests + revisar |
| Código de seguridad | Baja | Revisión experta |
| Arquitectura | Media | Evaluar tradeoffs |
| Documentación | Media-Alta | Verificar exactitud |
| Nombres de APIs | Media | Verificar que existan |
| Best practices | Media | Confirmar vigencia |
| Información de fechas | Baja | Verificar siempre |

---

## Checklist Anti-Limitaciones

Antes de usar código generado por IA:

- [ ] ¿Ejecuté el código y funciona?
- [ ] ¿Entiendo qué hace cada línea?
- [ ] ¿Verifiqué que las librerías/funciones existen?
- [ ] ¿Revisé la documentación actual (no solo confié en IA)?
- [ ] ¿Consideré edge cases que la IA pudo ignorar?
- [ ] ¿Es seguro? (input validation, SQL injection, etc.)
- [ ] ¿Escribí tests para verificar comportamiento?
- [ ] ¿Podría explicar este código a un colega?

---

## Mentalidad Correcta

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   "La IA es como un junior developer muy rápido             │
│    que a veces inventa cosas con total confianza.           │
│                                                              │
│    Tu trabajo es ser el senior que revisa,                  │
│    cuestiona, y verifica antes de aprobar."                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

*02-AI-LIMITATIONS.md - FPUNA 2026*
