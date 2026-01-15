# 📚 Módulo 01: Instalación del Stack de IA

## Tu Asistente Personal de Inteligencia Artificial

> **Para Todos**: Este módulo está diseñado para que CUALQUIER persona pueda completarlo, sin importar su edad o experiencia técnica. Si puedes usar WhatsApp, puedes hacer esto.

**⏱️ Duración**: 2 horas  
**👤 Nivel**: Principiante absoluto  
**🎯 Objetivo**: Tener tu propio asistente de IA funcionando en tu computadora

---

## 🎓 ¿Qué Vas a Lograr?

Al terminar este módulo, tendrás:

1. ✅ **OpenCode instalado** - Tu asistente de IA personal
2. ✅ **Oh My OpenCode funcionando** - Superpoderes adicionales para tu asistente
3. ✅ **Tu primer proyecto con IA** - Algo tangible que creaste CON ayuda de IA
4. ✅ **Confianza para usar IA** - Sin miedo a la tecnología

---

## 🤔 ¿Qué es Todo Esto? (Explicado Simple)

### Analogía: Como Tener un Asistente Personal

Imagina que contratas a un asistente muy inteligente que:
- **Escribe por ti** cuando se lo pides
- **Resuelve problemas** que le planteas
- **Aprende rápido** lo que necesitas
- **Nunca se cansa** y está disponible 24/7
- **No juzga** si haces preguntas "tontas"

Eso es **OpenCode** - pero en lugar de ser una persona, es un programa de computadora.

```mermaid
graph LR
    A[👤 Tú] -->|Pides ayuda| B[🤖 OpenCode]
    B -->|Te responde| A
    B -->|Usa internet| C[☁️ Claude AI]
    C -->|Piensa y responde| B
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#ffe1f5
```

### ¿Y Oh My OpenCode?

Si OpenCode es tu asistente, **Oh My OpenCode** es como darle superpoderes:
- 🎯 **Especialización**: Puede ser experto en diferentes áreas
- ⚡ **Más rápido**: Hace tareas comunes automáticamente  
- 📦 **Plantillas**: Tiene recetas pre-hechas para tareas frecuentes
- 🔧 **Herramientas extra**: Conexiones con otras aplicaciones

```mermaid
graph TD
    A[🤖 OpenCode Básico] -->|Instalar OMO| B[🚀 OpenCode con Superpoderes]
    B --> C[👨‍💻 Experto en Programación]
    B --> D[📊 Experto en Datos]
    B --> E[✍️ Experto en Escribir]
    B --> F[🧪 Experto en Pruebas]
    
    style A fill:#ffe1e1
    style B fill:#e1ffe1
    style C fill:#e1f5ff
    style D fill:#f5e1ff
    style E fill:#fff4e1
    style F fill:#e1fff4
```

---

## 📋 Antes de Empezar: Lista de Verificación

### ¿Qué Necesitas?

```mermaid
flowchart TD
    Start[🎯 Comenzar] --> Check1{¿Tienes<br/>computadora?}
    Check1 -->|Sí| Check2{¿Tienes<br/>internet?}
    Check1 -->|No| Stop1[❌ Necesitas una<br/>computadora]
    
    Check2 -->|Sí| Check3{¿Puedes crear<br/>cuenta email?}
    Check2 -->|No| Stop2[❌ Necesitas<br/>internet]
    
    Check3 -->|Sí| Check4{¿Tienes 2<br/>horas libres?}
    Check3 -->|No| Stop3[❌ Necesitas email<br/>válido]
    
    Check4 -->|Sí| Ready[✅ ¡Estás listo<br/>para comenzar!]
    Check4 -->|No| Stop4[❌ Agenda 2 horas<br/>sin interrupciones]
    
    style Ready fill:#90EE90
    style Stop1 fill:#FFB6C1
    style Stop2 fill:#FFB6C1
    style Stop3 fill:#FFB6C1
    style Stop4 fill:#FFB6C1
```

**Checklist Rápida**:
- [ ] Computadora con Windows, Mac o Linux
- [ ] Conexión a internet estable
- [ ] Email personal activo
- [ ] 2 horas sin interrupciones
- [ ] Actitud abierta para aprender

---

## 🚀 Parte 1: Instalando Node.js (El Motor)

### ¿Qué es Node.js?

**Analogía Simple**: Si OpenCode es un auto, Node.js es el motor que lo hace funcionar.

**No necesitas entender cómo funciona** - solo instalarlo. Es como usar tu celular: no necesitas saber cómo funciona por dentro para usarlo.

### Paso 1: Descargar Node.js

```mermaid
sequenceDiagram
    participant U as 👤 Tú
    participant W as 🌐 Navegador Web
    participant N as 📦 Node.js
    
    U->>W: 1. Abrir nodejs.org
    W->>N: 2. Mostrar página de descarga
    N->>W: 3. Detectar tu sistema (Windows/Mac)
    W->>U: 4. Mostrar botón "Descargcar"
    U->>W: 5. Click en descargar
    W->>U: 6. Archivo descargado
    
    Note over U,N: ⏱️ Tiempo: 2-5 minutos
```

**Instrucciones Paso a Paso**:

1. **Abre tu navegador** (Chrome, Firefox, Edge - el que uses)
2. **Escribe en la barra de direcciones**: `nodejs.org`
3. **Verás un botón verde grande** que dice algo como:
   - Windows: "Download for Windows (x64)"
   - Mac: "Download for macOS"
4. **Dale click al botón verde**
5. **Espera a que descargue** (archivo de ~50MB)

### Paso 2: Instalar Node.js

**Una vez descargado**:

#### 🪟 En Windows:
1. Ve a tu carpeta "Descargas"
2. Busca el archivo `node-v18...msi`
3. **Doble click** en él
4. Click "Siguiente" en todas las pantallas
5. **IMPORTANTE**: Deja todas las opciones marcadas por defecto
6. Click "Instalar"
7. Espera 2-3 minutos
8. Click "Finalizar"

#### 🍎 En Mac:
1. Ve a tu carpeta "Descargas"
2. Busca el archivo `node-v18...pkg`
3. **Doble click** en él
4. Click "Continuar" en todas las pantallas
5. Introduce tu contraseña de Mac cuando te lo pida
6. Click "Instalar"
7. Espera 2-3 minutos
8. Click "Cerrar"

### Paso 3: Verificar que Funciona

**Ahora vamos a verificar que todo está bien**:

#### 🪟 Windows - Abrir PowerShell:
1. Presiona la tecla **Windows** (⊞)
2. Escribe: `powershell`
3. Verás una ventana azul - esa es PowerShell
4. **No tengas miedo** - es solo una forma de hablar con tu computadora

#### 🍎 Mac - Abrir Terminal:
1. Presiona **Cmd + Espacio**
2. Escribe: `terminal`
3. Presiona Enter
4. Verás una ventana blanca o negra - esa es Terminal

**Ahora escribe esto** (copia y pega si quieres):

```bash
node --version
```

**Presiona Enter**

**¿Qué deberías ver?**
```
v18.19.0
```
(El número puede variar, pero debe empezar con v18 o superior)

**Si ves un número**: ✅ ¡Perfecto! Node.js está instalado

**Si dice "comando no encontrado"**: 
1. Cierra PowerShell/Terminal
2. Ábrelo de nuevo
3. Intenta otra vez
4. Si sigue sin funcionar, pide ayuda al instructor

---

## 🎨 Parte 2: Instalando OpenCode (Tu Asistente de IA)

### ¿Qué es OpenCode?

**Explicación para tu abuela**: 
- Es como tener a ChatGPT, pero en tu computadora
- En lugar de abrir una página web, escribes comandos
- Es MÁS poderoso porque puede crear archivos, leer tu código, y mucho más

```mermaid
graph TB
    subgraph "SIN OpenCode"
        A1[Abrir navegador] --> A2[Ir a ChatGPT]
        A2 --> A3[Copiar pregunta]
        A3 --> A4[Esperar respuesta]
        A4 --> A5[Copiar respuesta]
        A5 --> A6[Pegar en tu archivo]
    end
    
    subgraph "CON OpenCode"
        B1[Escribir comando] --> B2[OpenCode hace TODO]
        B2 --> B3[¡Listo!]
    end
    
    style A1 fill:#ffcccc
    style A6 fill:#ffcccc
    style B1 fill:#ccffcc
    style B3 fill:#ccffcc
```

### Paso 1: Instalar OpenCode

> **Nota**: OpenCode utiliza el CLI oficial de Anthropic. El paquete se llama `@anthropic-ai/claude-code` pero lo usaremos con el comando `opencode` en la terminal.

**En la misma PowerShell/Terminal que abriste antes**, escribe:

```bash
npm install -g @anthropic-ai/claude-code
```

**¿Qué significa esto?**
- `npm` = Programa que instala cosas (viene con Node.js)
- `install` = Instalar
- `-g` = Global (en toda tu computadora)
- `@anthropic-ai/claude-code` = El paquete oficial de Anthropic para OpenCode

**Presiona Enter y espera**

Verás muchas líneas de texto pasando rápido - **esto es normal**. Es como cuando instalas una app en tu celular.

**Tiempo de espera**: 2-5 minutos (depende de tu internet)

**Cuando termine**, deberías ver algo como:
```
+ @anthropic-ai/claude-code@1.x.x
added 150 packages in 3m
```

### Paso 2: Obtener tu "Llave" (API Key)

**Analogía**: Para usar OpenCode, necesitas una "llave" especial. Es como una contraseña que le dice a la IA "esta persona tiene permiso para usarme".

```mermaid
journey
    title Obtener tu API Key
    section Crear Cuenta
      Ir a Anthropic.com: 5: Tú
      Registrarte con email: 4: Tú
      Confirmar email: 3: Tú
    section Obtener Llave
      Ir a API Keys: 4: Tú
      Crear nueva llave: 5: Tú
      Copiar llave: 5: Tú
    section Guardar Llave
      Configurar en computadora: 3: Tú
      ¡Listo para usar!: 5: Tú
```

**Pasos Detallados**:

1. **Abre tu navegador** y ve a: `console.anthropic.com`

2. **Crea una cuenta** (si no tienes):
   - Click en "Sign Up" (Registrarse)
   - Usa tu email de FPUNA (o personal)
   - Crea una contraseña segura
   - **IMPORTANTE**: Guarda esta contraseña en un lugar seguro

3. **Verifica tu email**:
   - Revisa tu bandeja de entrada
   - Busca email de Anthropic
   - Click en el enlace de verificación

4. **Inicia sesión**

5. **Obtén tu API Key**:
   - Una vez dentro, busca "API Keys" en el menú lateral
   - Click en "Create Key" (Crear Llave)
   - **IMPORTANTE**: Verás algo como: `sk-ant-api03-xxxxxxxxxxxx...`
   - **Copia esto COMPLETO** - lo necesitarás en el siguiente paso

### Paso 3: Configurar la API Key en tu Computadora

**Este es el paso más técnico, pero lo haremos juntos paso a paso.**

#### 🪟 En Windows (PowerShell):

Escribe este comando **reemplazando** la parte `TU-CLAVE-AQUI` con tu clave real:

```powershell
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-api03-TU-CLAVE-AQUI", "User")
```

**Ejemplo real** (NO uses esta clave, usa la tuya):
```powershell
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-api03-abc123xyz789def456ghi012jkl345mno678pqr901stu234", "User")
```

**Presiona Enter**

**IMPORTANTE**: Ahora **CIERRA PowerShell y ábrelo de nuevo**

#### 🍎 En Mac (Terminal):

1. Primero, abre el archivo de configuración:
```bash
nano ~/.zshrc
```

2. Verás un editor de texto. Usa las flechas para ir al final del archivo

3. Escribe esta línea (reemplaza con TU clave):
```bash
export ANTHROPIC_API_KEY="sk-ant-api03-TU-CLAVE-AQUI"
```

4. **Guardar**:
   - Presiona `Control + O` (la letra O, no cero)
   - Presiona Enter
   - Presiona `Control + X`

5. **Aplicar cambios**:
```bash
source ~/.zshrc
```

### Paso 4: Verificar que OpenCode Funciona

**¡Momento de la verdad!** Vamos a probar tu asistente de IA.

> **Nota**: Aunque instalamos el paquete de Anthropic, el comando que usamos es `opencode`. Este es el CLI de OpenCode.

Escribe esto:

```bash
opencode "Hola, ¿puedes confirmar que estás funcionando? Responde en español."
```

**Si todo está bien**, verás una respuesta como:

```
¡Hola! Sí, estoy funcionando perfectamente. Estoy listo para ayudarte 
con lo que necesites. ¿En qué puedo asistirte hoy?
```

**🎉 ¡FELICITACIONES! ¡Tu asistente de IA está funcionando!**

---

## 🚀 Parte 3: Instalando Oh My OpenCode (Superpoderes)

### ¿Por Qué Instalar Oh My OpenCode?

**OpenCode básico** es genial, pero **Oh My OpenCode** le agrega:

```mermaid
mindmap
  root((Oh My<br/>OpenCode))
    Agentes Especializados
      Frontend Developer
      Backend Developer
      Data Scientist
      Content Writer
    Skills Pre-configurados
      Crear proyectos
      Generar tests
      Escribir docs
    Plantillas
      React App
      API REST
      Dashboard
    Automatización
      Hooks
      Rules
      Workflows
```

### Instalación Simple

En PowerShell/Terminal, escribe:

```bash
npm install -g oh-my-opencode
```

**Espera 2-3 minutos**

**Verificar instalación**:
```bash
omo --version
```

Deberías ver algo como: `1.5.0`

### Configuración Inicial

```bash
omo init
```

Este comando:
1. Crea carpetas de configuración
2. Descarga agentes básicos
3. Configura plantillas
4. ¡Te deja listo para usar!

**Espera 1-2 minutos mientras configura todo**

---

## 🎯 Parte 4: Tu Primer Proyecto con IA

### Vamos a Crear Algo Real

**Proyecto**: Una calculadora simple que suma, resta, multiplica y divide.

```mermaid
flowchart LR
    A[Tú describes<br/>lo que quieres] --> B[OpenCode<br/>piensa]
    B --> C[OpenCode<br/>crea archivos]
    C --> D[¡Calculadora<br/>funcionando!]
    
    style A fill:#e1f5ff
    style B fill:#fff4e1
    style C fill:#ffe1f5
    style D fill:#90EE90
```

### Paso 1: Crear Carpeta del Proyecto

```bash
# Ir a tu carpeta de documentos
cd ~\Documents

# Crear carpeta para proyectos FPUNA
mkdir FPUNA-Proyectos

# Entrar a la carpeta
cd FPUNA-Proyectos

# Crear carpeta para este proyecto
mkdir mi-calculadora
cd mi-calculadora
```

### Paso 2: Pedirle a OpenCode que Cree la Calculadora

**Copia y pega este comando** (o escríbelo):

```bash
opencode "Crea una calculadora simple en JavaScript que:
- Tenga funciones para sumar, restar, multiplicar y dividir
- Valide que los números sean correctos
- Tenga un archivo README.md en español explicando cómo usarla
- Incluya ejemplos de uso
- Sea fácil de entender para principiantes"
```

**¡Observa la magia!** OpenCode creará:
1. `calculadora.js` - El código de la calculadora
2. `README.md` - Instrucciones en español
3. Ejemplos de cómo usar cada función

### Paso 3: Ver lo que Creó

```bash
# Ver los archivos creados
dir  # En Windows
ls   # En Mac/Linux
```

**Abrir en VS Code** (si lo tienes instalado):
```bash
code .
```

### Paso 4: Probar la Calculadora

OpenCode habrá creado algo como esto:

```javascript
// calculadora.js
function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
}

// ... más funciones
```

**Para probarla**, crea un archivo `prueba.js`:

```bash
opencode "Crea un archivo prueba.js que use la calculadora con ejemplos"
```

**Ejecutar**:
```bash
node prueba.js
```

**¡Deberías ver los resultados de las operaciones!**

---

## ✅ Verificación Final: ¿Todo Funciona?

```mermaid
flowchart TD
    Start[🎯 Verificación Final] --> Check1{Node.js<br/>instalado?}
    Check1 -->|✅ Sí| Check2{OpenCode<br/>funciona?}
    Check1 -->|❌ No| Fix1[Reinstalar Node.js]
    
    Check2 -->|✅ Sí| Check3{API Key<br/>configurada?}
    Check2 -->|❌ No| Fix2[Reinstalar OpenCode]
    
    Check3 -->|✅ Sí| Check4{OMO<br/>instalado?}
    Check3 -->|❌ No| Fix3[Reconfigurar API Key]
    
    Check4 -->|✅ Sí| Check5{Proyecto<br/>creado?}
    Check4 -->|❌ No| Fix4[Instalar OMO]
    
    Check5 -->|✅ Sí| Success[🎉 ¡TODO LISTO!]
    Check5 -->|❌ No| Fix5[Crear proyecto de nuevo]
    
    Fix1 --> Check1
    Fix2 --> Check2
    Fix3 --> Check3
    Fix4 --> Check4
    Fix5 --> Check5
    
    style Success fill:#90EE90
    style Fix1 fill:#FFB6C1
    style Fix2 fill:#FFB6C1
    style Fix3 fill:#FFB6C1
    style Fix4 fill:#FFB6C1
    style Fix5 fill:#FFB6C1
```

### Checklist Final

Marca cada uno conforme lo verificas:

- [ ] ✅ `node --version` muestra v18+
- [ ] ✅ `npm --version` muestra v9+
- [ ] ✅ `opencode "hola"` responde correctamente
- [ ] ✅ `omo --version` muestra versión
- [ ] ✅ Tengo mi carpeta FPUNA-Proyectos
- [ ] ✅ Creé mi primer proyecto con OpenCode
- [ ] ✅ Entiendo cómo pedirle cosas a OpenCode
- [ ] ✅ Me siento confiado/a para continuar

---

## 🆘 Ayuda y Solución de Problemas

### Problemas Comunes

#### 1. "comando no encontrado: opencode"

**Causa**: PowerShell/Terminal no encuentra OpenCode

**Solución**:
1. Cierra PowerShell/Terminal COMPLETAMENTE
2. Ábrelo de nuevo
3. Intenta nuevamente
4. Si persiste, reinstala con: `npm install -g @anthropic-ai/claude-code`

#### 2. "API key inválida"

**Causa**: La llave no está bien configurada

**Solución**:
1. Ve a `console.anthropic.com`
2. Genera una NUEVA llave (borra la anterior)
3. Copia la nueva llave COMPLETA
4. Configúrala de nuevo siguiendo los pasos anteriores

#### 3. "La IA no responde en español"

**Solución**: Siempre especifica en tu prompt:
```bash
opencode "Tu pregunta aquí. RESPONDE EN ESPAÑOL."
```

#### 4. "No entiendo los comandos de terminal"

**¡Tranquilo/a!** Es normal. Aquí un resumen:

```mermaid
graph LR
    A[cd] -->|Cambiar de carpeta| B[Como abrir<br/>una carpeta]
    C[ls/dir] -->|Ver archivos| D[Como listar<br/>contenido]
    E[mkdir] -->|Crear carpeta| F[Como crear<br/>nueva carpeta]
    G[node] -->|Ejecutar código| H[Como correr<br/>un programa]
```

**Comandos básicos**:
- `cd nombre-carpeta` = Entrar a una carpeta
- `cd ..` = Volver atrás
- `ls` (Mac) o `dir` (Windows) = Ver qué hay en la carpeta
- `mkdir nombre` = Crear carpeta nueva
- `opencode "pregunta"` = Preguntarle a tu IA

---

## 📚 Recursos Adicionales

### Documentación Completa

Para profundizar más:

- 📖 [Guía Detallada de OpenCode](../../SHARED/opencode-installation/guide.md)
- 📖 [Instalación en Windows](../../SHARED/opencode-installation/windows.md)
- 📖 [Instalación en Mac](../../SHARED/opencode-installation/mac.md)
- 📖 [Instalación en Linux](../../SHARED/opencode-installation/linux.md)
- 📖 [Solución de Problemas](../../SHARED/opencode-installation/troubleshooting.md)
- 📖 [Preguntas Frecuentes](../../SHARED/opencode-installation/FAQ.md)

### Soporte FPUNA

**¿Necesitas ayuda?**

- **💬 Slack**: #fpuna-core-foundation
- **📧 Email**: soporte-core@fpuna.edu.py
- **🕐 Horario de consulta**: Lunes-Viernes 14:00-16:00
- **👥 Asistentes en clase**: Disponibles durante todas las sesiones

### Videos Tutoriales (si están disponibles)

- 🎥 Instalación en Windows (paso a paso)
- 🎥 Instalación en Mac (paso a paso)
- 🎥 Primeros pasos con OpenCode
- 🎥 Solución de problemas comunes

---

## 🎯 Próximos Pasos

```mermaid
journey
    title Tu Camino de Aprendizaje
    section Módulo 01
      Instalación: 5: Tú
      Primer proyecto: 5: Tú
      Verificación: 5: Tú
    section Módulo 02
      Configuración avanzada: 3: Futuro
      Skills y agentes: 3: Futuro
    section Módulo 03
      Prompts efectivos: 3: Futuro
      Técnicas avanzadas: 3: Futuro
```

**Ahora que terminaste este módulo**:

1. 📝 **Practica más**: Pídele a OpenCode que cree otros proyectos simples
2. 📖 **Continúa con**: [Módulo 02 - Dominio de Configuración](./02-configuration-mastery.md)
3. 🤝 **Comparte**: Ayuda a un compañero/a que esté atascado/a
4. ❓ **Pregunta**: Si algo no te quedó claro, ¡pregunta en Slack!

---

## 📊 Resumen Visual

```mermaid
graph TD
    A[🎯 Comenzaste] --> B[📦 Instalaste Node.js]
    B --> C[🤖 Instalaste OpenCode]
    C --> D[🔑 Configuraste API Key]
    D --> E[🚀 Instalaste OMO]
    E --> F[🎨 Creaste primer proyecto]
    F --> G[✅ ¡LISTO!]
    
    G --> H[📖 Módulo 02]
    
    style A fill:#e1f5ff
    style G fill:#90EE90
    style H fill:#fff4e1
```

---

## 🎉 ¡Felicitaciones!

Has completado el módulo más importante del curso. Ahora tienes:

✅ **Tu propio asistente de IA funcionando**  
✅ **Las herramientas instaladas**  
✅ **Experiencia creando tu primer proyecto**  
✅ **Confianza para continuar aprendiendo**

### Lo Que Significa Esto

No importa tu carrera (Ingeniería, Marketing, Hotelería, etc.), ahora tienes una herramienta que puede:
- Escribir código por ti
- Explicarte conceptos difíciles
- Ayudarte con tareas repetitivas
- Ser tu tutor personal 24/7

**Esto es solo el comienzo.** En los siguientes módulos aprenderás a usar esta herramienta como un profesional.

---

## 💭 Reflexión Final

Antes de continuar, tómate un momento para pensar:

1. **¿Qué fue lo más difícil?** (Para mejorar la guía)
2. **¿Qué te sorprendió?** 
3. **¿Cómo usarías esto en tu vida diaria?**

**Comparte tus respuestas en Slack** - ayudará a otros estudiantes y a los instructores a mejorar el curso.

---

**⏭️ Siguiente**: [Módulo 02 - Dominio de Configuración](./02-configuration-mastery.md)

---

*Módulo creado para FPUNA Verano 2026*  
*Actualizado: Enero 2026*  
*Versión: 2.0 - Explicación accesible para todos*
