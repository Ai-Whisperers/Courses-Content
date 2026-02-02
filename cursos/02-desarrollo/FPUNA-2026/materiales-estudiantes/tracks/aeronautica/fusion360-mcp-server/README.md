# Servidor MCP para Fusion 360

Un servidor de Protocolo de Contexto de Modelo (MCP) que actúa como interfaz entre Cline y Autodesk Fusion 360. Este servidor expone comandos de nivel de barra de herramientas de Fusion 360 como herramientas invocables que se mapean directamente a la API de Fusion.

## 🧠 Descripción General

Este proyecto permite que Cline pueda:
- Analizar prompts en lenguaje natural (ej., "Hacer una caja con esquinas redondeadas")
- Resolverlos en acciones de herramientas de Fusion (ej., CreateSketch → DrawRectangle → Extrude → Fillet)
- Llamar a esas herramientas a través de este servidor MCP
- Retornar scripts de Python que se pueden ejecutar en Fusion 360

## 🛠️ Instalación

### Prerrequisitos

- Python 3.9 o superior
- Autodesk Fusion 360

### Configuración

1. Clonar este repositorio:
   ```bash
   git clone https://github.com/yourusername/fusion360-mcp-server.git
   cd fusion360-mcp-server
   ```

2. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```

## 🚀 Uso

### Ejecutar el Servidor HTTP

```bash
cd src
python main.py
```

Esto iniciará el servidor FastAPI en `http://127.0.0.1:8000`.

### Ejecutar como Servidor MCP

```bash
cd src
python main.py --mcp
```

Esto iniciará el servidor en modo MCP, leyendo de stdin y escribiendo a stdout.

### Endpoints de la API

- `GET /`: Verificar si el servidor está ejecutándose
- `GET /tools`: Listar todas las herramientas disponibles
- `POST /call_tool`: Llamar a una sola herramienta y generar un script
- `POST /call_tools`: Llamar a múltiples herramientas en secuencia y generar un script

### Ejemplos de Llamadas a la API

#### Listar Herramientas

```bash
curl -X GET http://127.0.0.1:8000/tools
```

#### Llamar a una Sola Herramienta

```bash
curl -X POST http://127.0.0.1:8000/call_tool \
  -H "Content-Type: application/json" \
  -d '{
    "tool_name": "CreateSketch",
    "parameters": {
      "plane": "xy"
    }
  }'
```

#### Llamar a Múltiples Herramientas

```bash
curl -X POST http://127.0.0.1:8000/call_tools \
  -H "Content-Type: application/json" \
  -d '{
    "tool_calls": [
      {
        "tool_name": "CreateSketch",
        "parameters": {
          "plane": "xy"
        }
      },
      {
        "tool_name": "DrawRectangle",
        "parameters": {
          "width": 10,
          "depth": 10
        }
      },
      {
        "tool_name": "Extrude",
        "parameters": {
          "height": 5
        }
      }
    ]
  }'
```

## 📦 Herramientas Disponibles

El servidor actualmente soporta las siguientes herramientas de Fusion 360:

### Crear
- **CreateSketch**: Crea un nuevo sketch en un plano especificado
- **DrawRectangle**: Dibuja un rectángulo en el sketch activo
- **DrawCircle**: Dibuja un círculo en el sketch activo
- **Extrude**: Extruye un perfil en un cuerpo 3D
- **Revolve**: Revoluciona un perfil alrededor de un eje

### Modificar
- **Fillet**: Agrega un filete a los bordes seleccionados
- **Chamfer**: Agrega un chaflán a los bordes seleccionados
- **Shell**: Ahueca un cuerpo sólido con un espesor de pared especificado
- **Combine**: Combina dos cuerpos usando operaciones booleanas

### Exportar
- **ExportBody**: Exporta un cuerpo a un archivo

## 🔌 Integración MCP

Para usar este servidor con Cline, agrégalo a tu archivo de configuración de MCP:

```json
{
  "mcpServers": {
    "fusion360": {
      "command": "python",
      "args": ["/ruta/al/fusion360-mcp-server/src/main.py", "--mcp"],
      "env": {},
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## 🧩 Registro de Herramientas

Las herramientas están definidas en `src/tool_registry.json`. Cada herramienta tiene:
- **name**: El nombre de la herramienta
- **description**: Qué hace la herramienta
- **parameters**: Los parámetros que acepta la herramienta
- **docs**: Enlace a la documentación relevante de la API de Fusion

Ejemplo de definición de herramienta:

```json
{
  "name": "Extrude",
  "description": "Extruye un perfil en un cuerpo 3D.",
  "parameters": {
    "profile_index": {
      "type": "integer",
      "description": "Índice del perfil a extruir.",
      "default": 0
    },
    "height": {
      "type": "number",
      "description": "Altura de la extrusión en mm."
    },
    "operation": {
      "type": "string",
      "description": "El tipo de operación (ej., 'new', 'join', 'cut', 'intersect').",
      "default": "new"
    }
  },
  "docs": "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-6D381FCD-22AB-4F08-B4BB-5D3A130189AC"
}
```

## 📝 Generación de Scripts

El servidor genera scripts de Python para Fusion 360 basados en las llamadas a herramientas. Estos scripts se pueden ejecutar en el Editor de Scripts de Fusion 360.

Ejemplo de script generado:

```python
import adsk.core, adsk.fusion, traceback

def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        design = app.activeProduct

        # Obtener el componente activo en el diseño
        component = design.rootComponent

        # Crear un nuevo sketch en el plano xy
        sketches = component.sketches
        xyPlane = component.xYConstructionPlane
        sketch = sketches.add(xyPlane)

        # Dibujar un rectángulo
        rectangle = sketch.sketchCurves.sketchLines.addTwoPointRectangle(
            adsk.core.Point3D.create(0, 0, 0),
            adsk.core.Point3D.create(10, 10, 0)
        )

        # Extruir el perfil
        prof = sketch.profiles.item(0)
        extrudes = component.features.extrudeFeatures
        extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
        distance = adsk.core.ValueInput.createByReal(5)
        extInput.setDistanceExtent(False, distance)
        extrude = extrudes.add(extInput)

        ui.messageBox('Operación completada exitosamente')
    except:
        if ui:
            ui.messageBox('Error:\n{}'.format(traceback.format_exc()))
```

## 🧪 Extender el Servidor

### Agregar Nuevas Herramientas

1. Agregar una nueva definición de herramienta a `src/tool_registry.json`
2. Agregar una plantilla de script a `SCRIPT_TEMPLATES` en `src/script_generator.py`
3. Agregar lógica de procesamiento de parámetros a `_process_parameters` en `src/script_generator.py`

## 📚 Enlaces de Documentación

- [Documentación de la API de Fusion 360](https://help.autodesk.com/view/fusion360/ENU/)
- [Referencia de Clases de la API de Python](https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-4190E5AD-BE6F-4682-A6D1-67D944D3DD58)
- [API de Features](https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-22D93F54-B84E-4C0B-97D3-CAEA7D2BAFFE)
- [API de Sketch](https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-2533FC11-8BD3-4B3A-B52C-F8B470DC4065)

## 🔄 Mejoras Futuras

- Seguimiento de estado de sesión para operaciones con contexto
- Registro dinámico de herramientas
- Automatización vía socket o polling de archivos
- Más comandos de Fusion

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para detalles.
