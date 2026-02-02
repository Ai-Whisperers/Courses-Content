# Módulo 01: El Semillero Manual (Bootstrapping)

## Objetivo y Duración

**Objetivo**: Instalar el "Motor de IA" en tu sistema. Este es el último paso manual que harás en el curso. Una vez que la IA esté activa, ella se encargará del resto por ti.
**Duración**: 1 hora (estimado).

---

## Parte 1: El Motor (Node.js)

Node.js es el entorno de ejecución necesario para que nuestras herramientas de IA cobren vida.

### Paso 1: Instalación

1. Ve a [nodejs.org](https://nodejs.org) y descarga la versión **LTS**.
2. Instálalo con las opciones por defecto.

### Paso 2: Verificación

Abre tu terminal y comprueba que el motor está listo:

```bash
node --version # v18 o superior requerido
```

---

## Parte 2: La Puerta de Enlace (OpenCode)

OpenCode es tu interfaz principal con la IA. Es el asistente que ejecutará tus órdenes desde la terminal.

**Sitio Oficial:** https://opencode.ai/

### Paso 1: Instalación

Elige una de las siguientes opciones:

```bash
# Opción A: Script de instalación (macOS/Linux) - RECOMENDADO
curl -fsSL https://opencode.ai/install | bash

# Opción B: NPM (todas las plataformas)
npm install -g opencode

# Opción C: Homebrew (macOS)
brew install opencode
```

### Paso 2: Activación

Comprueba que tu socio está despierto:

```bash
opencode status # Debe decir "Connected"
opencode
```

### Paso 3: Configuración (Bootstrapping)

Indícale a OpenCode con qué "cerebro" (proveedor) trabajarás. Para este curso, recomendamos usar **Google Gemini** por su generoso nivel gratuito.

1. Obtén tu clave API gratuita en [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Configúralo en tu terminal:

```bash
opencode

/connect
```

---

## Parte 3: La Gran Transición (El Fin de lo Manual)

A partir de este momento, **deja de escribir comandos de instalación**. Tu rol ha cambiado de "Obrero" a "Arquitecto". Todo lo que falte por configurar será responsabilidad de tu IA.

### Tu Primera Delegación: Oh My OpenCode (OMO)

Oh My OpenCode añade agentes especializados y personalización avanzada. No lo instales tú, pídeselo a él.

> **Prompt Maestro:**
> "Ahora que estás activo, toma el control de mi sistema. Procede a instalar globalmente `oh-my-opencode`, ejecútalo e inicializa el entorno con `omo init`. Avísame cuando hayas terminado de preparar tu propia suite de superpoderes."

**¿Qué pasa aquí?**
La IA detectará si necesita `npm`, ejecutará la instalación y configurará OMO sin que tú toques una tecla más.

---

## Parte 4: Tu Primer Workspace (IA-Driven)

En lugar de crear carpetas y archivos a mano, pídele a la IA que prepare tu mesa de trabajo.

> **Prompt Maestro:**
> "Actúa como un Lead Architect senior. Crea un nuevo workspace en la carpeta `proyecto-calculadora-pro`. Dentro, desarrolla una suite de calculadora profesional en JavaScript que incluya:
>
> 1. **Lógica Modular**: Separa las operaciones matemáticas de la interfaz de usuario.
> 2. **Documentación Exhaustiva**: Un `README.md` profesional con instrucciones de uso, arquitectura del proyecto y cómo contribuir.
> 3. **Suite de Pruebas**: Implementa un archivo de tests unitarios que verifique casos de éxito y manejo de errores (ej. división por cero).
> 4. **Estilo de Código**: Asegura que el código sea limpio, autodocumentado y siga las mejores prácticas de la industria.
>
> No hagas el mínimo: prepara una estructura de proyecto que sea el estándar de oro para lo que construiremos en FPUNA. Tú decides la mejor organización de archivos."

---

## Verificación del Umbral

Si has cruzado el umbral correctamente, tu estado debe ser:

- [x] `node --version` muestra v18+ (Hecho a mano)
- [x] `opencode status` muestra "Connected" (Hecho a mano)
- [x] OMO está instalado e inicializado (Hecho por la IA)
- [x] El proyecto de calculadora existe y tiene estructura profesional (Hecho por la IA)

## Solución de Problemas (Auto-Asistida)

Si algo falla en los pasos manuales, pide ayuda inmediata a la IA:

- _"OpenCode, intenté instalar Node pero me da error de permisos en Windows. ¿Qué comando debo correr en PowerShell?"_
- _"La instalación de OMO falló. Diagnóstica el error en mi terminal y corrígelo."_

---

## Siguiente Módulo: La Era de la Autonomía

[Módulo 02: Maestría de Configuración](./02-maestria-configuracion.md)
