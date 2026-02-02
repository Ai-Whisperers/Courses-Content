# SKILL: Fusion 360 Designer

When the user asks to "Design in Fusion 360" or "Create a model in Fusion", follow this protocol:

1.  **Understand the Request**: Identify dimensions, shapes, and constraints.
2.  **Generate Script**: Use the `execute_fusion_script` tool (from the custom MCP).
    *   The Python code MUST import: `import adsk.core, adsk.fusion, traceback`
    *   The code MUST have a `run(context)` function.
    *   Use `app = adsk.core.Application.get()` and `design = app.activeProduct`.
    *   Create sketches on `rootComp.xYConstructionPlane` (or XZ/YZ).
    *   Use `sketch.sketchCurves.sketchCircles.addByCenterRadius` or similar.
    *   Extrude using `rootComp.features.extrudeFeatures.addSimple`.
3.  **Instruct User**: Tell the user to go to Fusion 360 -> Scripts -> RunAgentScript -> Run.

## Example Code Pattern

```python
import adsk.core, adsk.fusion, traceback

def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        design = app.activeProduct
        rootComp = design.rootComponent
        
        # Create Sketch
        sketches = rootComp.sketches
        xyPlane = rootComp.xYConstructionPlane
        sketch = sketches.add(xyPlane)
        
        # Draw Circle
        circles = sketch.sketchCurves.sketchCircles
        circle = circles.addByCenterRadius(adsk.core.Point3D.create(0, 0, 0), 5.0) # 5cm radius
        
        # Extrude
        prof = sketch.profiles.item(0)
        extrudes = rootComp.features.extrudeFeatures
        dist = adsk.core.ValueInput.createByReal(10.0) # 10cm height
        extrudes.addSimple(prof, dist, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
        
        ui.messageBox('Cylinder Created via OpenCode!')
        
    except:
        if ui:
            ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))
```
