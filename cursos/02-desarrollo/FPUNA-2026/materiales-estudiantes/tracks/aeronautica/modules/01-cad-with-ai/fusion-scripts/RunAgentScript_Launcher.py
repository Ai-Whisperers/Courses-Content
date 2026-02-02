import adsk.core, adsk.fusion, traceback
import os

# --- SCRIPT LAUNCHER for OpenCode AI ---
# This version lets the user CHOOSE which script to run.


def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface

        # --- PATH CONFIGURATION ---
        # This points to the folder where the AI will generate scripts.
        # Ensure this path is correct for your machine.
        scripts_folder = r"C:\Users\Alejandro\Documents\Ivan\Work\Courses Content\courses\02-development\FPUNA-2026\03-INGENIERIA-AERONAUTICA\modules\01-cad-with-ai\fusion-scripts\winglet-demo"

        if not os.path.isdir(scripts_folder):
            ui.messageBox(
                f"Error: The target script folder does not exist.\n\nPlease check the path in RunAgentScript.py:\n{scripts_folder}"
            )
            return

        # --- FILE DIALOG TO CHOOSE SCRIPT ---
        file_dlg = ui.createFileDialog()
        file_dlg.isMultiSelectEnabled = False
        file_dlg.title = "Select AI-Generated Script to Run"
        file_dlg.filter = "Python Scripts (*.py)"
        file_dlg.initialDirectory = scripts_folder

        # Show the dialog and check if the user selected a file.
        if file_dlg.showOpen() == adsk.core.DialogResults.DialogOK:
            script_to_run = file_dlg.filename
        else:
            return  # User cancelled

        # --- DYNAMICALLY EXECUTE THE SELECTED SCRIPT ---
        ui.messageBox(f"Executing:\n{os.path.basename(script_to_run)}")

        # Using importlib to load and run the selected module
        import importlib.util

        spec = importlib.util.spec_from_file_location("agent_script", script_to_run)
        agent_module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(agent_module)

        # Call the standard 'run' function within the loaded script
        if hasattr(agent_module, "run"):
            agent_module.run(context)
        else:
            ui.messageBox(
                "Execution finished, but the script had no 'run(context)' function."
            )

    except:
        if ui:
            ui.messageBox("Failed:\n{}".format(traceback.format_exc()))
