# Módulo 02: GitHub Copilot
## Duración: 2 horas

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:
- Instalar y configurar GitHub Copilot en VS Code
- Utilizar los diferentes modos de sugerencia
- Dominar los atajos de teclado esenciales
- Usar Copilot Chat para consultas y explicaciones

---

## 1. ¿Qué es GitHub Copilot?

### 1.1 Descripción General

GitHub Copilot es un **asistente de programación con IA** desarrollado por GitHub y OpenAI. Funciona como un "programador par" que sugiere código en tiempo real.

**Características principales:**
- Autocompletado inteligente de código
- Generación de funciones completas
- Soporte para múltiples lenguajes
- Integración nativa con editores populares

### 1.2 ¿Cómo Funciona?

```
Tu código → API de Copilot → Modelo de IA → Sugerencias
     ↑                                           ↓
     └──────────── Tu contexto ─────────────────┘
```

Copilot analiza:
- El archivo actual
- Archivos abiertos
- Comentarios y docstrings
- Nombres de variables y funciones
- El lenguaje de programación

### 1.3 Planes y Precios

| Plan | Precio | Características |
|------|--------|-----------------|
| **Individual** | $10/mes | Uso personal |
| **Business** | $19/mes | Equipos, admin |
| **Enterprise** | $39/mes | Personalización |
| **Estudiantes** | Gratis | GitHub Education |

---

## 2. Instalación y Configuración

### 2.1 Requisitos Previos

- VS Code actualizado
- Cuenta de GitHub
- Suscripción a Copilot (o trial)

### 2.2 Instalación en VS Code

1. Abrir VS Code
2. Ir a Extensions (Ctrl+Shift+X)
3. Buscar "GitHub Copilot"
4. Instalar las extensiones:
   - GitHub Copilot
   - GitHub Copilot Chat

### 2.3 Autenticación

1. Después de instalar, aparece notificación
2. Click en "Sign in to GitHub"
3. Autorizar en el navegador
4. Volver a VS Code

### 2.4 Verificar Instalación

En la barra inferior de VS Code deberías ver:
- Icono de Copilot (persona con auriculares)
- Estado: "GitHub Copilot"

### 2.5 Configuración Recomendada

Abrir Settings (Ctrl+,) y buscar "copilot":

```json
{
  "github.copilot.enable": {
    "*": true,
    "markdown": true,
    "plaintext": false
  },
  "github.copilot.inlineSuggest.enable": true,
  "editor.inlineSuggest.enabled": true
}
```

---

## 3. Modos de Sugerencia

### 3.1 Inline Suggestions (Sugerencias en Línea)

El modo más común. Copilot muestra sugerencias grises mientras escribes.

```python
# Ejemplo: escribe un comentario
# función para calcular el factorial de un número
def factorial(n):  # <- Copilot sugiere esto
    if n <= 1:
        return 1
    return n * factorial(n - 1)
```

**Acciones:**
- `Tab` → Aceptar sugerencia
- `Esc` → Rechazar
- `Alt+]` → Siguiente sugerencia
- `Alt+[` → Sugerencia anterior

### 3.2 Copilot Panel

Ver múltiples sugerencias a la vez:

1. `Ctrl+Enter` → Abrir panel de sugerencias
2. Navegar entre opciones
3. Click para aceptar la preferida

### 3.3 Copilot Chat

Chat conversacional en el panel lateral:

1. `Ctrl+Shift+I` → Abrir Copilot Chat
2. Escribir pregunta o instrucción
3. Recibir respuesta con código

**Ejemplos de uso:**
```
/explain - Explica código seleccionado
/fix - Sugiere correcciones
/tests - Genera tests
/doc - Genera documentación
```

---

## 4. Atajos de Teclado Esenciales

### 4.1 Sugerencias Inline

| Atajo | Acción |
|-------|--------|
| `Tab` | Aceptar sugerencia |
| `Esc` | Rechazar sugerencia |
| `Alt+]` | Siguiente sugerencia |
| `Alt+[` | Sugerencia anterior |
| `Ctrl+Enter` | Abrir panel de sugerencias |

### 4.2 Copilot Chat

| Atajo | Acción |
|-------|--------|
| `Ctrl+Shift+I` | Abrir/cerrar Copilot Chat |
| `Ctrl+I` | Inline Chat (edición rápida) |
| `Ctrl+Shift+Alt+L` | Abrir Chat en nueva ventana |

### 4.3 Acciones de Edición

| Atajo | Acción |
|-------|--------|
| `Ctrl+.` | Quick Fix con Copilot |
| Seleccionar + `Ctrl+I` | Chat inline sobre selección |

---

## 5. Técnicas Efectivas

### 5.1 Comentarios Descriptivos

Copilot funciona mejor con comentarios claros:

```python
# ❌ Malo
# función
def f(x):

# ✅ Bueno
# Función que valida si un email tiene formato correcto
# Retorna True si es válido, False si no
def validate_email(email: str) -> bool:
```

### 5.2 Nombres Significativos

```python
# ❌ Malo - Copilot no entiende el contexto
def process(d):

# ✅ Bueno - Copilot entiende la intención
def calculate_total_price_with_tax(items: list) -> float:
```

### 5.3 Ejemplos en Comentarios

```python
# Función que convierte temperatura de Celsius a Fahrenheit
# Ejemplo: celsius_to_fahrenheit(0) -> 32
# Ejemplo: celsius_to_fahrenheit(100) -> 212
def celsius_to_fahrenheit(celsius):
    # Copilot completará correctamente
```

### 5.4 Contexto del Archivo

Copilot usa el contexto del archivo. Importaciones y código previo ayudan:

```python
import pandas as pd
from datetime import datetime

# Función que carga un CSV y convierte la columna 'fecha' a datetime
def load_and_parse_csv(path: str) -> pd.DataFrame:
    # Copilot sugerirá código con pandas
```

---

## 6. Copilot Chat en Detalle

### 6.1 Comandos Slash

| Comando | Descripción |
|---------|-------------|
| `/explain` | Explica código seleccionado |
| `/fix` | Sugiere corrección de errores |
| `/tests` | Genera tests unitarios |
| `/doc` | Genera documentación |
| `/clear` | Limpia el chat |
| `/help` | Muestra ayuda |

### 6.2 Ejemplos de Uso

**Explicar código:**
```
Seleccionar código
/explain qué hace esta función
```

**Generar tests:**
```
Seleccionar función
/tests genera tests para esta función usando pytest
```

**Corregir errores:**
```
Copiar mensaje de error
/fix este error: [pegar error]
```

### 6.3 Agentes @

| Agente | Uso |
|--------|-----|
| `@workspace` | Busca en todo el proyecto |
| `@vscode` | Ayuda con VS Code |
| `@terminal` | Comandos de terminal |

**Ejemplo:**
```
@workspace dónde se define la función calculateTotal
```

---

## 7. Mejores Prácticas

### 7.1 Cuándo Aceptar Sugerencias

✅ **Aceptar cuando:**
- El código es correcto sintácticamente
- Entiendes lo que hace
- Se ajusta a tu estilo/patrones
- Resuelve tu problema

❌ **Rechazar cuando:**
- No entiendes el código
- Parece demasiado complejo
- Usa patrones obsoletos
- No sigue las convenciones del proyecto

### 7.2 Iteración con Copilot

```python
# Intento 1 - No es lo que quiero
def sort_users(users):
    return sorted(users)  # Muy simple

# Agregar más contexto
# Ordena usuarios por fecha de registro, más recientes primero
def sort_users_by_date(users: list[dict]) -> list[dict]:
    return sorted(users, key=lambda u: u['registered_at'], reverse=True)
```

### 7.3 Verificación Obligatoria

Siempre verificar:
- [ ] ¿El código compila/ejecuta?
- [ ] ¿Los tests pasan?
- [ ] ¿Maneja casos edge?
- [ ] ¿Sigue las convenciones del proyecto?
- [ ] ¿Es eficiente?

---

## 8. Limitaciones y Soluciones

### 8.1 Limitaciones Conocidas

| Limitación | Solución |
|------------|----------|
| No conoce código privado | Usar contexto explícito |
| Puede sugerir código deprecated | Verificar en docs |
| Contexto limitado | Abrir archivos relacionados |
| No ejecuta código | Probar manualmente |

### 8.2 Cuando Copilot No Ayuda

Si Copilot no sugiere lo que necesitas:
1. Agregar más contexto (comentarios)
2. Escribir el inicio de la función
3. Usar Copilot Chat para preguntar
4. Buscar en documentación oficial

---

## Resumen

- Copilot es un **asistente**, no un reemplazo
- Los **comentarios descriptivos** mejoran las sugerencias
- Usa **Tab** para aceptar, **Esc** para rechazar
- **Copilot Chat** para consultas complejas
- Siempre **verificar** el código sugerido

---

## Recursos Adicionales

- [Documentación oficial de Copilot](https://docs.github.com/copilot)
- [Copilot for VS Code](https://code.visualstudio.com/docs/copilot/overview)
- [GitHub Copilot Tips](https://github.blog/developer-skills/github/how-to-use-github-copilot-tips-and-best-practices/)

---

*Siguiente: Módulo 03 - Ingeniería de Prompts para Código*
