import adsk.core, adsk.fusion, traceback
import math


# --- NACA Airfoil Generator Function ---
def naca4(number, n, chord):
    """Generates a list of points for a NACA 4-digit airfoil."""
    m = int(number[0]) / 100.0
    p = int(number[1]) / 10.0
    t = int(number[2:]) / 100.0

    points = adsk.core.ObjectCollection.create()

    for i in range(n + 1):
        x = i / n

        # Thickness distribution
        yt = (
            5
            * t
            * chord
            * (
                0.2969 * math.sqrt(x)
                - 0.1260 * x
                - 0.3516 * x**2
                + 0.2843 * x**3
                - 0.1015 * x**4
            )
        )

        # Camber line
        if x < p:
            yc = (m / p**2) * (2 * p * x - x**2) * chord
            dyc_dx = (2 * m / p**2) * (p - x)
        else:
            yc = (m / (1 - p) ** 2) * ((1 - 2 * p) + 2 * p * x - x**2) * chord
            dyc_dx = (2 * m / (1 - p) ** 2) * (p - x)

        theta = math.atan(dyc_dx)

        # Upper surface
        xu = x * chord - yt * math.sin(theta)
        yu = yc + yt * math.cos(theta)
        points.add(adsk.core.Point3D.create(xu, yu, 0))

    for i in range(n - 1, -1, -1):
        x = i / n

        # Thickness distribution
        yt = (
            5
            * t
            * chord
            * (
                0.2969 * math.sqrt(x)
                - 0.1260 * x
                - 0.3516 * x**2
                + 0.2843 * x**3
                - 0.1015 * x**4
            )
        )

        # Camber line
        if x < p:
            yc = (m / p**2) * (2 * p * x - x**2) * chord
            dyc_dx = (2 * m / p**2) * (p - x)
        else:
            yc = (m / (1 - p) ** 2) * ((1 - 2 * p) + 2 * p * x - x**2) * chord
            dyc_dx = (2 * m / (1 - p) ** 2) * (p - x)

        theta = math.atan(dyc_dx)

        # Lower surface
        xl = x * chord + yt * math.sin(theta)
        yl = yc - yt * math.cos(theta)
        points.add(adsk.core.Point3D.create(xl, yl, 0))

    return points


def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        design = app.activeProduct
        rootComp = design.rootComponent

        # --- Main Script ---
        # 1. Define Airfoil Parameters
        airfoil_name = "2412"
        chord_length_cm = 20.0  # 200mm
        span_cm = 10.0  # 100mm
        num_points = 50

        # 2. Generate Airfoil Points
        airfoil_points = naca4(airfoil_name, num_points, chord_length_cm)

        # 3. Create a new sketch and draw the spline
        sketches = rootComp.sketches
        xyPlane = rootComp.xYConstructionPlane
        sketch = sketches.add(xyPlane)
        sketch.sketchCurves.sketchSplines.add(airfoil_points)

        # 4. Extrude the airfoil profile to create a wing section
        prof = sketch.profiles.item(0)
        extrudes = rootComp.features.extrudeFeatures
        dist = adsk.core.ValueInput.createByReal(span_cm)
        extInput = extrudes.createInput(
            prof, adsk.fusion.FeatureOperations.NewBodyFeatureOperation
        )
        extInput.setDistanceExtent(False, dist)
        extrudes.add(extInput)

        # 5. Fit view to the new body
        cam = app.activeViewport.camera
        cam.isFitView = True
        app.activeViewport.camera = cam

        ui.messageBox(f"SUCCESS! A NACA {airfoil_name} wing section was created.")

    except:
        if ui:
            ui.messageBox("Failed:\n{}".format(traceback.format_exc()))
