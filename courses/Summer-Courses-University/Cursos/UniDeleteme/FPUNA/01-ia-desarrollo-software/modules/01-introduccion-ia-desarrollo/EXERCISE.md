# Ejercicio: Introducción a IA en Desarrollo
## Exploración de Herramientas

---

## Objetivo

Familiarizarte con las diferentes herramientas de IA para desarrollo y comparar sus respuestas para una misma tarea.

---

## Parte 1: Configuración del Entorno (15 min)

### 1.1 Verificar Instalaciones

Abre tu terminal y verifica:

```bash
# VS Code instalado
code --version

# Node.js instalado
node --version

# Git instalado
git --version
```

### 1.2 Crear Cuentas

Si aún no las tienes, crea cuentas en:
- [ ] GitHub (github.com)
- [ ] Claude (claude.ai)
- [ ] ChatGPT (chat.openai.com)

### 1.3 Solicitar Copilot

Si eres estudiante:
1. Ve a education.github.com/pack
2. Verifica tu estado de estudiante
3. Obtén GitHub Copilot gratis

---

## Parte 2: Comparación de Herramientas (30 min)

### 2.1 El Mismo Prompt en Diferentes Herramientas

Usa el siguiente prompt en **Claude** y **ChatGPT**:

```
Crea una función en Python que valide si un email
es válido. Incluye tests unitarios.
```

### 2.2 Tabla de Comparación

Completa esta tabla con tus observaciones:

| Aspecto | Claude | ChatGPT |
|---------|--------|---------|
| Tiempo de respuesta | | |
| Longitud del código | | |
| Incluye explicación | | |
| Calidad de los tests | | |
| Maneja edge cases | | |
| ¿Código funciona? | | |

### 2.3 Preguntas de Reflexión

1. ¿Cuál respuesta preferiste? ¿Por qué?
2. ¿Encontraste errores en alguna respuesta?
3. ¿Qué mejorarías en cada respuesta?

---

## Parte 3: Detectar Limitaciones (20 min)

### 3.1 Buscar una Alucinación

Pide a Claude o ChatGPT:

```
Muéstrame cómo usar la función pandas.read_streaming_parquet()
para leer archivos parquet grandes.
```

**Nota**: Esta función NO existe. Observa cómo responde la IA.

### 3.2 Documentar la Alucinación

| Pregunta | Respuesta |
|----------|-----------|
| ¿La IA admitió que no existe? | |
| ¿Inventó código falso? | |
| ¿Sugirió alternativas reales? | |
| ¿Cómo verificarías si existe? | |

### 3.3 Verificación en Documentación

1. Ve a pandas.pydata.org/docs/
2. Busca "read_parquet"
3. Compara con lo que sugirió la IA

---

## Parte 4: Caso Práctico (25 min)

### 4.1 Escenario

Eres nuevo en un proyecto y encontraste este código:

```python
def calc(x, y, z):
    if x > 0:
        r = y * z / x
        if r > 100:
            return r - 10
        else:
            return r
    else:
        return 0
```

### 4.2 Usa IA para Entender

Pide a Claude o ChatGPT:

```
Explica qué hace esta función y sugiere mejores nombres
para las variables y la función:

def calc(x, y, z):
    if x > 0:
        r = y * z / x
        if r > 100:
            return r - 10
        else:
            return r
    else:
        return 0
```

### 4.3 Evalúa la Respuesta

- [ ] ¿La explicación es clara?
- [ ] ¿Los nombres sugeridos son mejores?
- [ ] ¿Sugirió documentación?
- [ ] ¿Identificó posibles problemas?

### 4.4 Pide Refactoring

```
Refactoriza esta función con mejores nombres,
docstrings, y manejo de errores.
```

---

## Parte 5: Discusión en Grupo (15 min)

### Temas a Discutir

1. **Productividad**: ¿Cuánto tiempo crees que ahorrarías con estas herramientas?

2. **Confianza**: ¿En qué situaciones confiarías más en la IA?

3. **Riesgos**: ¿Qué problemas podrían surgir de depender mucho de IA?

4. **Aprendizaje**: ¿Crees que usar IA te ayuda o dificulta aprender?

5. **Futuro**: ¿Cómo crees que cambiará el desarrollo de software en 5 años?

---

## Entregable

Documento breve (1-2 páginas) que incluya:

1. **Tabla de comparación** completa (Parte 2)
2. **Análisis de alucinación** (Parte 3)
3. **Código refactorizado** con explicación (Parte 4)
4. **Reflexión personal** (3-5 oraciones)

---

## Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Comparación completa | 25 |
| Análisis de alucinación | 25 |
| Calidad del refactoring | 30 |
| Reflexión personal | 20 |
| **Total** | **100** |

---

## Tips

- Sé específico en tus prompts
- No te quedes con la primera respuesta, itera
- Verifica siempre en la documentación oficial
- Guarda tus conversaciones para referencia futura

---

*Tiempo total estimado: 1.5 horas*
