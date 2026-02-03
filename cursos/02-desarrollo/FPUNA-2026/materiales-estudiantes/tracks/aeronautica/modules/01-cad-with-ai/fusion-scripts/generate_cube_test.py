import os
import sys

# Add directory to path to import the server function
sys.path.append(os.path.dirname(__file__))

try:
    from fusion_mcp_server import execute_fusion_script, BRIDGE_FILE
except ImportError as e:
    print(f"Failed to import server: {e}")
    sys.exit(1)


def generate_cube():
    print("[TEST] Generating Fusion 360 Cube Script...")

    cube_script = """
import adsk.core, adsk.fusion, traceback

def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        design = app.activeProduct
        
        # Get root component
        rootComp = design.rootComponent
        
        # Create sketch on XY plane
        sketches = rootComp.sketches
        xyPlane = rootComp.xYConstructionPlane
        sketch = sketches.add(xyPlane)
        
        # Draw 50mm square (Fusion internal units are cm, so 5.0 = 50mm)
        lines = sketch.sketchCurves.sketchLines
        recLines = lines.addTwoPointRectangle(adsk.core.Point3D.create(0, 0, 0), adsk.core.Point3D.create(5.0, 5.0, 0))
        
        # Get profile
        prof = sketch.profiles.item(0)
        
        # Extrude 50mm
        extrudes = rootComp.features.extrudeFeatures
        dist = adsk.core.ValueInput.createByReal(5.0)
        extInput = extrudes.createInput(prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
        extInput.setDistanceExtent(False, dist)
        extrudes.add(extInput)
        
        ui.messageBox('✅ SUCCESS: OpenCode created a 50mm Cube!')
        
    except:
        if ui:
            ui.messageBox('Failed:\\n{}'.format(traceback.format_exc()))
"""

    # Use the server function to write the file
    result = execute_fusion_script(cube_script)

    # Handle printing result safely (unicode)
    try:
        print(f"Result: {result}")
    except UnicodeEncodeError:
        print(f"Result: {result.encode('ascii', 'ignore').decode()}")

    print(f"\n[READY] Script written to: {BRIDGE_FILE}")
    print("👉 NOW: Go to Fusion 360 -> Scripts -> RunAgentScript -> Run")


if __name__ == "__main__":
    generate_cube()
