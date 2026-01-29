# Fusion 360 AI Bridge

This folder contains the integration tools to let OpenCode "drive" Autodesk Fusion 360.

## 🛠️ Setup Instructions

1.  **Locate Fusion 360 Scripts Folder**:
    *   Open Fusion 360.
    *   Go to **Utilities** tab -> **Scripts and Add-Ins** (Shift+S).
    *   Click on the **"Scripts"** tab.
    *   Click the green **"+" (Create)** button or look at "My Scripts".
    *   The path is usually:
        *   **Windows**: `%AppData%\Autodesk\Autodesk Fusion 360\API\Scripts`
        *   **Mac**: `~/Library/Application Support/Autodesk/Autodesk Fusion 360/API/Scripts`

2.  **Install the Bridge**:
    *   Copy the file `RunAgentScript.py` from this folder into your Fusion 360 Scripts folder.
    *   **Crucial**: Edit `RunAgentScript.py` and update `AGENT_SCRIPT_PATH` to point to the `agent_generated_script.py` file in this directory.
        *   *Example*: `C:/Users/Alejandro/Documents/Ivan/Work/Courses Content/courses/02-development/FPUNA-2026/03-INGENIERIA-AERONAUTICA/modules/01-cad-with-ai/fusion-scripts/agent_generated_script.py`

3.  **How to Use**:
    1.  **Ask the AI**: "Create a Fusion 360 script to model a 200mm cylinder."
    2.  **AI Writes**: The agent will write code to `agent_generated_script.py`.
    3.  **You Run**: In Fusion 360, select `RunAgentScript` and click **Run**.
    4.  **Result**: The 3D model appears instantly.

## 🤖 For the AI Agent

When the user asks for Fusion 360 work, write the Python code to:
`./agent_generated_script.py`

Always include the standard Fusion 360 boilerplate:
```python
import adsk.core, adsk.fusion, traceback

def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        design = app.activeProduct
        rootComp = design.rootComponent
        
        # ... YOUR CODE HERE ...
        
    except:
        if ui:
            ui.messageBox('Failed:\n{}'.format(traceback.format_exc()))
```
