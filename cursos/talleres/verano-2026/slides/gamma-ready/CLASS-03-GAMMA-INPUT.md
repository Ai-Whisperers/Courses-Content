# CLASE 3: Desarrollo de Software con IA
## Talleres de Verano FP-UNA 2026

**Miércoles, Febrero 4, 2026**  
**18:00 - 20:00**

---

# 📋 AGENDA

**1.** 💻 IA para Developers (15 min)  
**2.** 🔨 Code Generation (40 min)  
**3.** 🐛 Debugging con IA (15 min)  
**4.** ✅ Testing Automatizado (15 min)  
**5.** 📚 Documentación (15 min)  
**6.** 🎓 Aprender Nuevas Tecnologías (10 min)  
**7.** ❓ Q&A (10 min)

---

# 👨‍💻 DEVELOPER TRADICIONAL vs 🚀 AI-AUGMENTED

## ANTES:
- Stack Overflow → **10 min**
- Escribir código → **20 min**
- Debuggear → **30 min**
- Documentar → **15 min**

**TOTAL: 75 minutos**

## CON IA:
- IA explica → **2 min**
- IA genera base → **5 min**
- IA ayuda a debuggear → **10 min**
- IA documenta → **2 min**

**TOTAL: 19 minutos**

### 🚀 **4x MÁS PRODUCTIVO**

---

# 🛠️ HERRAMIENTAS PARA DEVS

## 1. OpenCode / Claude Code
- Full project context
- Edita archivos directamente

## 2. GitHub Copilot
- Autocomplete inteligente
- Inline suggestions

## 3. ChatGPT / Claude (web)
- Quick questions
- Code snippets

**HOY:** OpenCode (puede trabajar con archivos reales)

---

# ⚠️ REGLA DE ORO

## IA NO reemplaza entender tu código

### IA acelera ESCRIBIR ✅

### TÚ debes:
- ✅ Entender la lógica
- ✅ Validar que funciona
- ✅ Poder explicarlo
- ✅ Debuggear cuando falla

### Si solo copias sin entender:
- ❌ Pierdes 50% del valor de ser dev
- ❌ No aprenderás
- ❌ Te trabarás en bugs

---

# 📝 WORKFLOW DE DESARROLLO CON IA

## 1. PENSAR SOLUCIÓN
(con ayuda de IA para explorar opciones)

## 2. IA GENERA CÓDIGO BASE
→ TÚ revisas y ajustas

## 3. IA AYUDA A DEBUGGEAR
→ TÚ entiendes el problema

## 4. IA GENERA TESTS
→ TÚ verificas coverage

## 5. IA GENERA DOCS
→ TÚ validas claridad

**Resultado: 2-3x más productivo**

---

# ✅ CODE GENERATION: BUENAS PRÁCTICAS

## DO:
- ✅ Especificar lenguaje y versión
- ✅ Describir casos edge
- ✅ Pedir manejo de errores
- ✅ Pedir código comentado
- ✅ Revisar cada línea generada

## DON'T:
- ❌ Confiar ciegamente
- ❌ No entender qué hace
- ❌ Pedir sistemas completos de una vez
- ❌ Ignorar best practices del lenguaje

---

# 📝 PROMPT TEMPLATE: GENERAR CÓDIGO

```
Lenguaje: [Python/JavaScript/etc]
Versión: [3.11, ES6, etc]

Tarea: [Descripción clara]

Requisitos:
• Debe manejar: [casos especiales]
• Usar: [librería si es necesario]
• Incluir: error handling
• Estilo: [PEP8, ESLint, etc]

Formato: Código completo con comentarios en [idioma]
```

---

# 🐛 DEBUGGING WORKFLOW

## 1. EJECUTAR CÓDIGO
→ Obtener error message

## 2. COPIAR ERROR COMPLETO
→ Contexto es crítico

## 3. PEDIR A IA DIAGNÓSTICO
[Copiar error + código relevante]

## 4. APLICAR FIX
→ Entender POR QUÉ funciona

## 5. VERIFICAR
→ Ejecutar de nuevo

### ⚡ **10x más rápido que Stack Overflow**

---

# 📝 PROMPT TEMPLATE: DEBUGGING

```
Contexto: [Descripción del proyecto]
Lenguaje: [X]

Tengo este código:
```[lenguaje]
[pegar código]
```

Error:
```
[pegar error completo con stack trace]
```

Diagnóstico:
1. ¿Cuál es el problema?
2. ¿Por qué ocurre?
3. ¿Cómo lo arreglo?
4. Código corregido

Explica en términos simples.
```

---

# ✅ TESTS CON IA

## GENERA:
- Unit tests completos
- Edge cases automáticamente
- Mocks cuando es necesario
- Assertions apropiados

## FRAMEWORKS SOPORTADOS:
- pytest (Python)
- Jest (JavaScript)
- JUnit (Java)
- RSpec (Ruby)
- [Cualquier framework]

### ⏱️ **De 60 min → 5 min**

---

# 📚 DOCUMENTACIÓN AUTOMÁTICA

## IA GENERA:

### 1. DOCSTRINGS
→ Para cada función/clase

### 2. README
→ Completo y profesional

### 3. API DOCS
→ Con ejemplos de uso

### 4. INLINE COMMENTS
→ Explicando lógica compleja

### 5. ARCHITECTURE DIAGRAMS
→ En formato Mermaid

### 💡 **De 30 min → 2 min**

---

# 🎓 IA COMO TUTOR

## USA IA PARA:

### 📖 Tutoriales personalizados
→ Adaptados a tu background

### 🔍 Explicar conceptos
→ Con analogías relevantes

### 💻 Ejemplos prácticos
→ Build while learning

### 🐛 Debugging conceptual
→ "¿Por qué X funciona así?"

### 🗺️ Learning path
→ Roadmap personalizado

**10x más rápido que cursos genéricos**

---

# ⚠️ LIMITACIONES DE IA EN CÓDIGO

### ❌ No reemplaza arquitectura
→ Decisiones de diseño son tuyas

### ❌ No reemplaza code review
→ Siempre revisar seguridad/performance

### ❌ No reemplaza testing real
→ Tests generados son punto de partida

### ❌ Puede generar bugs sutiles
→ Siempre validar lógica

### ✅ IA = Pair programmer junior muy rápido
### ❌ IA ≠ Senior architect

---

# 💻 PROYECTO DEL DÍA: WEB SCRAPER

## WEB SCRAPER EN PYTHON

### CARACTERÍSTICAS:
- requests + BeautifulSoup4
- Extrae: título, precio, disponibilidad
- Error handling robusto
- Logging claro
- Tests incluidos
- Documentación completa

### ⏱️ TIEMPO:
- **Sin IA:** 2-3 horas
- **Con IA:** 15 minutos

## **VAMOS A HACERLO EN VIVO 🚀**

---

# 💡 TIPS PRO

## 1. MÓDULOS PEQUEÑOS
→ No pidas sistemas completos

## 2. ITERA
→ Genera → Revisa → Mejora → Repite

## 3. TESTS PRIMERO
→ A veces pide tests antes de código

## 4. APRENDE LOS PATRONES
→ No solo copies, entiende

## 5. USA VERSION CONTROL
→ Git + IA = poder combinado

---

# ✅ RESUMEN - CLASE 3

## HOY APRENDIMOS:

- ✅ Generar código con OpenCode
- ✅ Debugging asistido por IA
- ✅ Tests automatizados
- ✅ Documentación automática
- ✅ Aprender tech nuevas más rápido

## 🔑 KEY TAKEAWAY:

**"IA te hace 3x más productivo, pero TÚ sigues siendo el developer."**

---

# 🔜 MAÑANA - CLASE 4

**📅 JUEVES, Febrero 5**  
**💡 TEMA:** Electrónica + Automatización

## LO QUE VEREMOS:
- Arduino/ESP32 con IA
- Diseño de circuitos
- IoT projects
- Troubleshooting hardware

**🔌 Para ingenieros electrónicos, mecatrónicos, y curiosos!**

**📝 TAREA:** Si tienes Arduino, tráelo (virtual está ok)

---

# ¡GRACIAS!

**¿Preguntas?**

---

**Total Slides:** 18  
**Target Audience:** Developers y aspiring developers  
**Duration:** 2 horas  
**Hands-on:** Live demo de web scraper con OpenCode
