# Step 1: Generate the main wing section
import adsk.core, adsk.fusion, traceback


def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        design = app.activeProduct
        rootComp = design.rootComponent

        # --- Parameters ---
        chord = 20.0  # cm
        span = 50.0  # cm

        # --- Create Sketch ---
        sketches = rootComp.sketches
        xyPlane = rootComp.xYConstructionPlane
        sketch = sketches.add(xyPlane)

        # --- Draw a simplified airfoil (NACA 0012-like) ---
        points = adsk.core.ObjectCollection.create()
        points.add(adsk.core.Point3D.create(0, 0, 0))
        points.add(adsk.core.Point3D.create(chord * 0.5, chord * 0.06, 0))
        points.add(adsk.core.Point3D.create(chord, 0, 0))
        points.add(adsk.core.Point3D.create(chord * 0.5, -chord * 0.06, 0))
        points.add(adsk.core.Point3D.create(0, 0, 0))  # Close loop
        sketch.sketchCurves.sketchSplines.add(points)

        # --- Extrude Wing ---
        prof = sketch.profiles.item(0)
        extrudes = rootComp.features.extrudeFeatures
        dist = adsk.core.ValueInput.createByReal(span)
        extrudes.addSimple(
            prof, dist, adsk.fusion.FeatureOperations.NewComponentFeatureOperation
        )

        # --- Rename Component ---
        new_comp = rootComp.occurrences.item(rootComp.occurrences.count - 1).component
        new_comp.name = "Main_Wing"

        ui.messageBox("Step 1 Complete: Main wing section created.")

    except:
        if ui:
            ui.messageBox("Failed:\n{}".format(traceback.format_exc()))
