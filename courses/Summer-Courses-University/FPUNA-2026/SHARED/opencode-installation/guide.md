# Guía de Instalación de OpenCode

## Descripción General

OpenCode es un asistente de desarrollo impulsado por IA que te permite programar, automatizar y resolver problemas técnicos usando lenguaje natural. Esta guía te llevará paso a paso por el proceso de instalación en tu sistema.

**Tiempo estimado**: 15-20 minutos  
**Requisitos**: Conexión a internet, permisos de administrador

---

## ¿Qué es OpenCode?

OpenCode es una herramienta de línea de comandos (CLI) que integra Claude AI directamente en tu flujo de trabajo de desarrollo. Te permite:

- ✅ Escribir código con asistencia de IA
- ✅ Automatizar tareas repetitivas
- ✅ Depurar errores rápidamente
- ✅ Generar documentación automáticamente
- ✅ Aprender nuevas tecnologías más rápido

---

## Requisitos del Sistema

### Requisitos Mínimos

| Componente | Requisito |
|------------|-----------|
| **Sistema Operativo** | Windows 10+, macOS 10.15+, Ubuntu 20.04+ |
| **RAM** | 4 GB mínimo (8 GB recomendado) |
| **Espacio en Disco** | 500 MB disponibles |
| **Internet** | Conexión estable requerida |

### Software Previo

Antes de instalar OpenCode, necesitas:

1. **Node.js** (versión 18 o superior)
   - Descargar de: https://nodejs.org/
   - Verificar instalación: `node --version`

2. **npm** (viene con Node.js)
   - Verificar instalación: `npm --version`

3. **Git** (opcional pero recomendado)
   - Descargar de: https://git-scm.com/
   - Verificar instalación: `git --version`

---

## Guías Específicas por Sistema Operativo

Selecciona tu sistema operativo para instrucciones detalladas:

- 📘 [Windows](./windows.md) - Guía completa para Windows 10/11
- 📗 [macOS](./mac.md) - Guía completa para macOS
- 📙 [Linux](./linux.md) - Guía completa para Ubuntu/Debian/Fedora

---

## Pasos de Instalación (General)

### Paso 1: Verificar Node.js

Abre tu terminal y ejecuta:

```bash
node --version
npm --version
```

**Salida esperada**:
```
v18.17.0  (o superior)
9.6.7     (o superior)
```

Si ves errores, instala Node.js primero desde https://nodejs.org/

### Paso 2: Instalar OpenCode

```bash
npm install -g @anthropic-ai/claude-code
```

**¿Qué hace este comando?**
- `npm install` - Instala un paquete de Node.js
- `-g` - Lo instala globalmente (disponible en todo el sistema)
- `@anthropic-ai/claude-code` - El paquete oficial de OpenCode

**Tiempo estimado**: 2-3 minutos

### Paso 3: Verificar la Instalación

```bash
claude --version
```

**Salida esperada**:
```
Claude Code CLI v1.x.x
```

Si ves la versión, ¡felicitaciones! OpenCode está instalado correctamente.

### Paso 4: Configurar API Key

Para usar OpenCode, necesitas una clave de API de Anthropic.

#### Obtener tu API Key:

1. Ve a https://console.anthropic.com/
2. Crea una cuenta o inicia sesión
3. Navega a "API Keys"
4. Crea una nueva clave y cópiala

#### Configurar la API Key:

**Opción A: Variable de Entorno (Recomendado)**

**Windows** (PowerShell):
```powershell
$env:ANTHROPIC_API_KEY="tu-clave-aqui"
```

**macOS/Linux** (bash/zsh):
```bash
export ANTHROPIC_API_KEY="tu-clave-aqui"
```

**Opción B: Archivo de Configuración**

Crea un archivo `.env` en tu directorio de proyecto:
```
ANTHROPIC_API_KEY=tu-clave-aqui
```

### Paso 5: Prueba Inicial

Ejecuta tu primer comando de OpenCode:

```bash
claude "Hola, ¿puedes ayudarme a verificar que estás funcionando?"
```

**Salida esperada**: Una respuesta amigable de Claude confirmando que está funcionando.

---

## Configuración Avanzada (Opcional)

### Configurar Oh My OpenCode (OMO)

Oh My OpenCode es una extensión que añade agentes especializados y funcionalidades avanzadas.

Ver: [Guía de Instalación de OMO](../../00-CORE-FOUNDATION/modules/01-ai-stack-setup/README.md#instalación-de-omo)

### Configurar Editor de Código

**Visual Studio Code** (Recomendado):

1. Instala VS Code desde https://code.visualstudio.com/
2. Instala extensiones recomendadas:
   - "Claude Code" (extensión oficial)
   - "GitLens" (para control de versiones)
   - "Prettier" (formato de código)

### Configurar Shell

**Para una mejor experiencia**, configura tu shell:

**Windows**: Usar PowerShell 7+  
**macOS**: Usar zsh (predeterminado en macOS 10.15+)  
**Linux**: Usar bash o zsh

---

## Verificación Post-Instalación

### Checklist de Verificación

Marca cada ítem para confirmar que tu instalación está completa:

- [ ] `node --version` muestra v18+
- [ ] `npm --version` muestra v9+
- [ ] `claude --version` muestra la versión de OpenCode
- [ ] Variable `ANTHROPIC_API_KEY` está configurada
- [ ] `claude "test"` responde correctamente
- [ ] Editor de código instalado (VS Code recomendado)

---

## Solución de Problemas

¿Encontraste algún problema durante la instalación?

👉 **Ver**: [Guía de Solución de Problemas](./troubleshooting.md)

### Problemas Comunes Rápidos

| Problema | Solución Rápida |
|----------|-----------------|
| "comando no encontrado: claude" | Reinicia tu terminal o verifica que npm está en tu PATH |
| "API key inválida" | Verifica que copiaste la clave completa sin espacios |
| "Permiso denegado" | Usa `sudo` en Linux/macOS o ejecuta como administrador en Windows |
| "Node versión antigua" | Actualiza Node.js desde https://nodejs.org/ |

---

## Preguntas Frecuentes

👉 **Ver**: [FAQ Completo](./FAQ.md)

### ¿Cuánto cuesta usar OpenCode?

OpenCode es gratuito para descargar. Pagas por el uso de la API de Claude según tu consumo. Ver precios en https://www.anthropic.com/pricing

### ¿Necesito estar conectado a internet?

Sí, OpenCode requiere conexión a internet para comunicarse con los servidores de Claude AI.

### ¿Puedo usar OpenCode sin VS Code?

Sí, OpenCode funciona desde cualquier terminal. VS Code es opcional pero recomendado.

---

## Próximos Pasos

Una vez que OpenCode está instalado:

1. 📖 Continúa con: [Configuración de MCPs](../mcp-configuration/README.md)
2. 📖 Aprende: [Sistema de Skills](../skills-system/README.md)
3. 📖 Explora: [Hooks y Rules](../hooks-rules/README.md)

---

## Recursos Adicionales

- **Documentación Oficial**: https://docs.anthropic.com/
- **GitHub**: https://github.com/anthropics/claude-code
- **Comunidad**: https://discord.gg/anthropic
- **Soporte FPUNA**: cursos-verano@fpuna.edu.py

---

## Ejemplos de Uso Paraguayo

### Ejemplo 1: Crear una Calculadora de Precios en Guaraníes

```bash
claude "Crea una función en JavaScript que convierta dólares a guaraníes usando la tasa actual de aproximadamente ₲7,200 por USD"
```

### Ejemplo 2: Automatizar Lista de Compras

```bash
claude "Crea un script que genere una lista de compras para hacer chipa, incluyendo almidón, queso Paraguay, huevos y manteca"
```

### Ejemplo 3: Generador de Recetas

```bash
claude "Dame un programa que sugiera recetas paraguayas basadas en ingredientes disponibles como mandioca, choclo y queso"
```

---

**¡Felicitaciones!** 🎉

Has completado la instalación de OpenCode. Ahora estás listo para comenzar a usar IA en tu flujo de trabajo.

**Siguiente**: [Instalación Específica para tu Sistema Operativo](./windows.md) | [macOS](./mac.md) | [Linux](./linux.md)

---

*Última actualización: Enero 2026*  
*Guía creada para FPUNA Summer 2026*
