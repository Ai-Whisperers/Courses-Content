import adsk.core, adsk.fusion, adsk.cam, traceback
import os
import importlib.util

# --- CONFIGURATION ---
# Path where the AI Agent writes scripts
# CHANGE THIS PATH TO YOUR ACTUAL REPO PATH
AGENT_SCRIPT_PATH = os.path.join(os.path.dirname(__file__), "agent_generated_script.py")


def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface

        # Check if script exists
        if not os.path.exists(AGENT_SCRIPT_PATH):
            ui.messageBox(
                f"Script not found at:\n{AGENT_SCRIPT_PATH}\n\nAsk the AI to generate a script first!"
            )
            return

        # Load and execute the module
        spec = importlib.util.spec_from_file_location("agent_script", AGENT_SCRIPT_PATH)
        agent_script = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(agent_script)

        # Run the script's run() function if it exists
        if hasattr(agent_script, "run"):
            agent_script.run(context)
        else:
            ui.messageBox(
                "The generated script executed, but had no 'run(context)' function."
            )

        ui.messageBox("✅ Agent Script Executed Successfully!")

    except:
        if ui:
            ui.messageBox("Failed:\n{}".format(traceback.format_exc()))
