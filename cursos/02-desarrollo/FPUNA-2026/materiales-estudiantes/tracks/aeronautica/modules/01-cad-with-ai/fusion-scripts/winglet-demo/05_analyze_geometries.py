# Step 5: Analyze Geometries and Extract Data
import adsk.core, adsk.fusion, traceback
import os


def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        design = app.activeProduct
        rootComp = design.rootComponent

        results = []

        # --- Iterate through all bodies in the design ---
        for body in rootComp.bRepBodies:
            if "Winglet" in body.name:
                # Calculate Physical Properties
                phys_props = body.physicalProperties

                # Use "Medium" quality for a good balance
                phys_props.accuracy = adsk.fusion.Accuracy.MediumAccuracy

                results.append(
                    {
                        "Component": body.name,
                        "Mass_g": round(phys_props.mass, 2),
                        "Volume_cm3": round(phys_props.volume, 2),
                        "SurfaceArea_cm2": round(phys_props.area, 2),
                    }
                )

        if not results:
            ui.messageBox("No bodies with 'Winglet' in their name found for analysis.")
            return

        # --- Display Results in Fusion ---
        report = "--- Analysis Report ---\n"
        for res in results:
            report += f"\nComponent: {res['Component']}\n"
            report += f"  Mass: {res['Mass_g']} g\n"
            report += f"  Volume: {res['Volume_cm3']} cm^3\n"
            report += f"  Surface Area: {res['SurfaceArea_cm2']} cm^2\n"

        ui.messageBox(report)

        # --- Write Results to CSV File ---
        csv_path = os.path.join(os.path.dirname(__file__), "comparison_results.csv")

        import csv

        file_exists = os.path.isfile(csv_path)

        with open(csv_path, "a", newline="") as csvfile:
            fieldnames = ["Component", "Mass_g", "Volume_cm3", "SurfaceArea_cm2"]
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            if not file_exists:
                writer.writeheader()

            for res in results:
                writer.writerow(res)

        ui.messageBox(f"Analysis complete. Data appended to:\n{csv_path}")

    except:
        if ui:
            ui.messageBox("Failed:\n{}".format(traceback.format_exc()))
