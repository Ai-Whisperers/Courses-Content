import adsk.core, adsk.fusion, traceback
import math

# --- PARAMETERS ---
NACA_CODE = "2412"  # Change this to generate different profiles
CHORD_LENGTH = 100.0  # mm
NUM_POINTS = 100


def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        design = app.activeProduct

        # Get the root component of the active design
        rootComp = design.rootComponent

        # Create a new sketch on the XY plane
        sketches = rootComp.sketches
        xyPlane = rootComp.xYConstructionPlane
        sketch = sketches.add(xyPlane)

        # Calculate NACA coordinates
        points = calculate_naca_coordinates(NACA_CODE, CHORD_LENGTH, NUM_POINTS)

        # Create the spline
        ObjectCollection = adsk.core.ObjectCollection.create()
        for x, y in points:
            # Create 3D point (z=0)
            point = adsk.core.Point3D.create(
                x / 10.0, y / 10.0, 0
            )  # API uses cm, so divide mm by 10
            ObjectCollection.add(point)

        # Add spline to sketch
        sketch.sketchCurves.sketchFittedSplines.add(ObjectCollection)

        # Close the profile (connect last point to first if needed, though NACA usually closes at trailing edge)
        # For a truly closed profile for extrusion, we might need a line at the trailing edge if finite thickness

        ui.messageBox(
            f"Success! Generated NACA {NACA_CODE} profile with chord {CHORD_LENGTH}mm."
        )

    except:
        if ui:
            ui.messageBox("Failed:\n{}".format(traceback.format_exc()))


def calculate_naca_coordinates(naca, chord, n_points):
    """
    Calculates the x, y coordinates for a 4-digit NACA airfoil.
     Returns a list of (x, y) tuples in mm.
    """
    m = int(naca[0]) / 100.0
    p = int(naca[1]) / 10.0
    t = int(naca[2:]) / 100.0

    # Half points for upper, half for lower
    n = n_points // 2
    coords = []

    # Generate x points using cosine distribution (dense at edges)
    # Going from 0 to c (upper surface) then c to 0 (lower surface)

    # Upper Surface (leading edge to trailing edge)
    beta_vals = [math.pi * i / n for i in range(n + 1)]
    x_vals = [0.5 * (1 - math.cos(b)) for b in beta_vals]

    for x_norm in x_vals:
        x = x_norm * chord

        # Mean camber line calculation
        if x_norm < p:
            yc = (m / p**2) * (2 * p * x_norm - x_norm**2)
            dyc_dx = (2 * m / p**2) * (p - x_norm)
        else:
            yc = (m / (1 - p) ** 2) * ((1 - 2 * p) + 2 * p * x_norm - x_norm**2)
            dyc_dx = (2 * m / (1 - p) ** 2) * (p - x_norm)

        # Thickness distribution
        yt = (
            5
            * t
            * (
                0.2969 * math.sqrt(x_norm)
                - 0.1260 * x_norm
                - 0.3516 * x_norm**2
                + 0.2843 * x_norm**3
                - 0.1015 * x_norm**4
            )
        )

        theta = math.atan(dyc_dx)

        xu = x - yt * math.sin(theta)
        yu = yc + yt * math.cos(theta)

        coords.append((xu, yu))

    # Lower Surface (trailing edge to leading edge)
    # Reuse x_vals but reverse order? No, calculate directly

    for x_norm in reversed(x_vals):
        x = x_norm * chord

        if x_norm < p:
            yc = (m / p**2) * (2 * p * x_norm - x_norm**2)
            dyc_dx = (2 * m / p**2) * (p - x_norm)
        else:
            yc = (m / (1 - p) ** 2) * ((1 - 2 * p) + 2 * p * x_norm - x_norm**2)
            dyc_dx = (2 * m / (1 - p) ** 2) * (p - x_norm)

        yt = (
            5
            * t
            * (
                0.2969 * math.sqrt(x_norm)
                - 0.1260 * x_norm
                - 0.3516 * x_norm**2
                + 0.2843 * x_norm**3
                - 0.1015 * x_norm**4
            )
        )

        theta = math.atan(dyc_dx)

        xl = x + yt * math.sin(theta)
        yl = yc - yt * math.cos(theta)

        coords.append((xl, yl))

    return coords
