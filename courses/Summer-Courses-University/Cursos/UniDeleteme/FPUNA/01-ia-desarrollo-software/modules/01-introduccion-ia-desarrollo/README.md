# Módulo 01: Introducción a IA en Desarrollo de Software
## Duración: 1.5 horas

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:
- Comprender qué es un LLM y cómo funciona a alto nivel
- Identificar las principales herramientas de IA para desarrollo
- Distinguir casos de uso apropiados de los inapropiados
- Entender las limitaciones y riesgos del código generado por IA

---

## 1. La Revolución de la IA en el Desarrollo

### 1.1 Evolución de las Herramientas de Desarrollo

```
1950s: Ensamblador → código máquina
1970s: Lenguajes de alto nivel (C, Pascal)
1990s: IDEs con autocompletado básico
2010s: IntelliSense, snippets, linters
2020s: IA generativa para código
```

La IA no reemplaza al programador, **amplifica sus capacidades**.

### 1.2 ¿Qué es un LLM?

**LLM (Large Language Model)** = Modelo de lenguaje grande

- Entrenado con billones de tokens de texto y código
- Predice la siguiente palabra/token más probable
- No "entiende" el código, pero reconoce patrones
- Puede generar código sintácticamente correcto

**Modelos principales para código:**
| Modelo | Empresa | Especialidad |
|--------|---------|--------------|
| GPT-4 | OpenAI | General + código |
| Claude | Anthropic | Análisis + código largo |
| Codex | OpenAI | Código (base de Copilot) |
| Code Llama | Meta | Open source |
| Gemini | Google | Multimodal |

---

## 2. Herramientas de IA para Desarrollo

### 2.1 Asistentes de Código en IDE

**GitHub Copilot**
- Integrado en VS Code, JetBrains, Neovim
- Autocompletado en tiempo real
- Copilot Chat para preguntas
- $10-19/mes (gratis para estudiantes)

**Cursor**
- IDE basado en VS Code
- IA integrada nativamente
- Composer para cambios multi-archivo
- $20/mes

**Amazon CodeWhisperer**
- Gratuito para uso individual
- Integrado en AWS
- Escaneo de seguridad incluido

### 2.2 Asistentes Conversacionales

**Claude (Anthropic)**
- Excelente para código largo
- Bueno en explicaciones
- Contexto de 100K+ tokens
- claude.ai

**ChatGPT (OpenAI)**
- GPT-4 con Code Interpreter
- Puede ejecutar código Python
- Amplia comunidad
- chat.openai.com

**Gemini (Google)**
- Integrado con Google Cloud
- Multimodal (código + imágenes)
- Gratuito en versión básica

### 2.3 Comparación Rápida

| Tarea | Mejor Herramienta |
|-------|-------------------|
| Autocompletado rápido | Copilot |
| Explicar código complejo | Claude |
| Ejecutar y probar código | ChatGPT Code Interpreter |
| Refactoring grande | Cursor Composer |
| Código open source | Code Llama |

---

## 3. Casos de Uso y Anti-Patrones

### 3.1 Buenos Casos de Uso

**Boilerplate y código repetitivo**
```python
# Generar CRUD básico
# Crear clases de modelo
# Escribir configuraciones
```

**Tests unitarios**
```python
# Generar tests para funciones existentes
# Crear mocks y fixtures
# Casos edge
```

**Documentación**
```python
# Docstrings
# README
# Comentarios explicativos
```

**Debugging**
```python
# Explicar errores
# Sugerir soluciones
# Analizar stack traces
```

**Aprendizaje**
```python
# Explicar conceptos
# Mostrar alternativas
# Comparar enfoques
```

### 3.2 Anti-Patrones (Evitar)

**Copiar sin entender**
```
❌ Pegar código de IA sin revisar
✅ Leer, entender, adaptar
```

**Código crítico de seguridad**
```
❌ Autenticación generada sin revisión
❌ Criptografía sin verificar
✅ Usar bibliotecas probadas
```

**Lógica de negocio compleja**
```
❌ Algoritmos financieros sin validar
✅ Usar IA como punto de partida, validar
```

**Confiar ciegamente**
```
❌ "La IA dijo que está bien"
✅ Tests, revisión de código, validación
```

---

## 4. Limitaciones de la IA

### 4.1 Limitaciones Técnicas

| Limitación | Descripción |
|------------|-------------|
| **Alucinaciones** | Inventa APIs, funciones o bibliotecas que no existen |
| **Conocimiento desactualizado** | No conoce cambios recientes |
| **Contexto limitado** | No ve todo tu proyecto |
| **Sin ejecución** | No puede probar el código |
| **Patrones antiguos** | Puede sugerir código deprecated |

### 4.2 Ejemplo de Alucinación

```python
# La IA podría sugerir:
from pandas import read_parquet_streaming  # No existe!

# Lo correcto:
import pandas as pd
df = pd.read_parquet('archivo.parquet')
```

### 4.3 Mitigación de Riesgos

1. **Siempre verificar** que las funciones/APIs existen
2. **Ejecutar tests** después de usar código de IA
3. **Revisar** con un humano código crítico
4. **Mantener actualizado** tu conocimiento
5. **Usar linters** y herramientas de análisis estático

---

## 5. Ética y Responsabilidad

### 5.1 Consideraciones Éticas

**Propiedad intelectual**
- ¿De quién es el código generado?
- Licencias de código de entrenamiento
- Políticas de tu empresa

**Privacidad**
- No enviar código confidencial a servicios externos
- Usar versiones empresariales con garantías
- Anonimizar datos sensibles

**Transparencia**
- ¿Revelar que usaste IA?
- Documentar origen del código
- Mantener trazabilidad

### 5.2 El Futuro del Desarrollador

La IA **no reemplaza** a los desarrolladores, cambia su rol:

| Antes | Ahora |
|-------|-------|
| Escribir todo el código | Guiar y revisar código de IA |
| Memorizar sintaxis | Entender conceptos |
| Trabajo repetitivo | Trabajo creativo |
| Un lenguaje experto | Múltiples lenguajes |

**Habilidades más importantes:**
- Diseño de sistemas
- Pensamiento crítico
- Comunicación (prompts)
- Revisión de código
- Arquitectura

---

## 6. Preparación del Entorno

### 6.1 Requisitos para el Curso

```bash
# VS Code
# Descargar de: code.visualstudio.com

# Node.js (para ejercicios)
node --version  # 18+

# Git
git --version

# Python (opcional)
python --version  # 3.10+
```

### 6.2 Extensiones VS Code Recomendadas

```
GitHub Copilot
GitHub Copilot Chat
Python
ESLint
Prettier
GitLens
```

### 6.3 Cuentas Necesarias

- **GitHub**: Para Copilot (github.com)
- **Anthropic**: Para Claude (claude.ai)
- **OpenAI**: Para ChatGPT (chat.openai.com)

---

## Resumen

- La IA es una **herramienta**, no un reemplazo
- Los LLMs predicen tokens, no "entienden"
- Cada herramienta tiene fortalezas diferentes
- **Siempre revisar** código generado
- El futuro es **humano + IA**

---

## Recursos Adicionales

- [GitHub Copilot Docs](https://docs.github.com/copilot)
- [Claude Documentation](https://docs.anthropic.com)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Prompt Engineering Guide](https://www.promptingguide.ai)

---

*Siguiente: Módulo 02 - GitHub Copilot: Configuración y Uso*
