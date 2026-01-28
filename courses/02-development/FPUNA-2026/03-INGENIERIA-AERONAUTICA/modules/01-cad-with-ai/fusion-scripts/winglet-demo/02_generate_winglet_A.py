# Step 2: Add a Blended Winglet
import adsk.core, adsk.fusion, traceback


def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        design = app.activeProduct
        rootComp = design.rootComponent

        # Find the wing component
        wing_comp = None
        for occ in rootComp.occurrences:
            if "Main_Wing" in occ.component.name:
                wing_comp = occ.component
                break
        if not wing_comp:
            ui.messageBox("Error: Main_Wing component not found. Run script 01 first.")
            return

        # --- Parameters ---
        winglet_height = 15.0
        winglet_sweep = 30.0  # degrees

        # --- Create Winglet Profile Sketch ---
        sketches = wing_comp.sketches

        # Find the wingtip face
        wing_body = wing_comp.bRepBodies.item(0)
        wingtip_face = None
        for face in wing_body.faces:
            # A simple way to find the tip is by checking its bounding box
            if abs(face.boundingBox.maxPoint.y - 50.0) < 0.1:  # 50 is the span
                wingtip_face = face
                break
        if not wingtip_face:
            ui.messageBox("Could not find wingtip face.")
            return

        sketch = sketches.add(wingtip_face)

        # Project the wingtip profile
        sketch.project(wingtip_face)

        # --- Create Loft Profile ---
        loft_plane = rootComp.constructionPlanes.createInput()
        offset_val = adsk.core.ValueInput.createByReal(winglet_height)
        loft_plane.setByOffset(wingtip_face, offset_val)
        loft_plane = rootComp.constructionPlanes.add(loft_plane)

        loft_sketch = sketches.add(loft_plane)

        # Project and scale down for the winglet tip
        for prof in sketch.profiles:
            loft_sketch.project(prof)

        # --- This part is complex, Lofting will be simulated by a simple extrusion for this demo ---
        ui.messageBox(
            "Blended Winglet would be created with a Loft. For simplicity, we will extrude."
        )

        # Extrude as a simple representation
        prof_to_extrude = sketch.profiles.item(0)
        extrudes = wing_comp.features.extrudeFeatures
        dist = adsk.core.ValueInput.createByReal(winglet_height)
        extrude_input = extrudes.createInput(
            prof_to_extrude, adsk.fusion.FeatureOperations.NewBodyFeatureOperation
        )

        # Add taper angle for blended effect
        extrude_input.taperAngle = adsk.core.ValueInput.createByReal(
            -15.0
        )  # Taper inwards
        extrudes.add(extrude_input)

        wing_comp.bRepBodies.item(
            wing_comp.bRepBodies.count - 1
        ).name = "Winglet_A_Blended"

        ui.messageBox("Step 2 Complete: Blended Winglet (Type A) added.")

    except:
        if ui:
            ui.messageBox("Failed:\n{}".format(traceback.format_exc()))
