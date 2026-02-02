# SKILL: Disenador de Fusion 360

Cuando el usuario pida "Disenar en Fusion 360" o "Crear un modelo en Fusion", sigue este protocolo:

1.  **Entender la Solicitud**: Identifica dimensiones, formas y restricciones.
2.  **Generar Script**: Usa la herramienta `execute_fusion_script` (del MCP personalizado).
    *   El codigo Python DEBE importar: `import adsk.core, adsk.fusion, traceback`
    *   El codigo DEBE tener una funcion `run(context)`.
    *   Usa `app = adsk.core.Application.get()` y `design = app.activeProduct`.
    *   Crea sketches en `rootComp.xYConstructionPlane` (o XZ/YZ).
    *   Usa `sketch.sketchCurves.sketchCircles.addByCenterRadius` o similar.
    *   Extruye usando `rootComp.features.extrudeFeatures.addSimple`.
3.  **Instruir al Usuario**: Indica al usuario que vaya a Fusion 360 -> Scripts -> RunAgentScript -> Run.

## Patron de Codigo de Ejemplo

```python
import adsk.core, adsk.fusion, traceback

def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        design = app.activeProduct
        rootComp = design.rootComponent

        # Crear Sketch
        sketches = rootComp.sketches
        xyPlane = rootComp.xYConstructionPlane
        sketch = sketches.add(xyPlane)

        # Dibujar Circulo
        circles = sketch.sketchCurves.sketchCircles
        circle = circles.addByCenterRadius(adsk.core.Point3D.create(0, 0, 0), 5.0) # radio de 5cm

        # Extruir
        prof = sketch.profiles.item(0)
        extrudes = rootComp.features.extrudeFeatures
        dist = adsk.core.ValueInput.createByReal(10.0) # altura de 10cm
        extrudes.addSimple(prof, dist, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)

        ui.messageBox('Cilindro creado via OpenCode!')

    except:
        if ui:
            ui.messageBox('Error:\n{}'.format(traceback.format_exc()))
```

