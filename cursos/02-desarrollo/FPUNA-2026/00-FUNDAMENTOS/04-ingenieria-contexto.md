# Modulo 04: Ingenieria de Contexto

## Objetivo
Crear archivos de contexto que permitan a OpenCode entender tu proyecto automaticamente, eliminando la necesidad de repetir instrucciones en cada prompt.

## Configuracion Global vs Proyecto

| Ambito | Ubicacion | Proposito |
|--------|-----------|-----------|
| **Global** | `~/.opencode/` | Configuracion para TODOS tus proyectos |
| **Proyecto** | `./` (raiz del proyecto) | Configuracion especifica de UN proyecto |

La configuracion de proyecto **sobrescribe** la global cuando hay conflictos.

## Archivo .opencode

El archivo `.opencode` en la raiz del proyecto define configuracion tecnica:

```yaml
# .opencode
model: claude-3-opus
temperature: 0.3
context_files:
  - CLAUDE.md
  - README.md
ignore:
  - node_modules/
  - .git/
  - "*.log"
```

## Archivo CLAUDE.md (Principal)

Este es el archivo mas importante. OpenCode lo lee automaticamente al iniciar sesion en tu proyecto.

### Template Completo

```markdown
# Proyecto: [Nombre del Proyecto]

## Descripcion
[Breve descripcion de que hace el proyecto]

## Stack Tecnologico
- **Lenguaje**: [Python/JavaScript/etc.]
- **Framework**: [Si aplica]
- **Base de Datos**: [Si aplica]

## Estructura del Proyecto
\`\`\`
proyecto/
├── src/           # Codigo fuente
├── tests/         # Tests
├── docs/          # Documentacion
└── README.md
\`\`\`

## Convenciones de Codigo
- Estilo: [PEP8/StandardJS/etc.]
- Variables: [espanol/ingles]
- Comentarios: [espanol/ingles]

## Comandos Frecuentes
\`\`\`bash
npm install    # Instalar dependencias
npm run dev    # Desarrollo
npm test       # Tests
\`\`\`

## Reglas para la IA

### HACER:
- Seguir convenciones establecidas
- Escribir tests para codigo nuevo
- Documentar funciones publicas

### NO HACER:
- Modificar archivos de config sin preguntar
- Instalar dependencias sin explicar
- Exponer credenciales
```

## Verificacion

Prueba que tu contexto funciona:

```bash
cd mi-proyecto
opencode "Describe la estructura de este proyecto"
```

Si OpenCode describe correctamente tu proyecto sin que le expliques nada, el contexto esta funcionando.

## Quiz

1. **¿Cual es la diferencia entre configuracion global y de proyecto?**
   <details>
   <summary>Ver respuesta</summary>
   Global (~/.opencode/) aplica a todos los proyectos. Proyecto (./) aplica solo al proyecto actual y sobrescribe la global.
   </details>

2. **¿Que archivo lee OpenCode automaticamente al entrar a un proyecto?**
   <details>
   <summary>Ver respuesta</summary>
   CLAUDE.md en la raiz del proyecto.
   </details>

3. **¿Por que es importante definir "NO HACER" en CLAUDE.md?**
   <details>
   <summary>Ver respuesta</summary>
   Para prevenir acciones no deseadas como modificar configs, instalar dependencias innecesarias o exponer datos sensibles.
   </details>

## Siguiente Modulo
[Modulo 05: Proyecto en Vivo](./05-proyecto-en-vivo.md)
