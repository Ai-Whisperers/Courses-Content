from typing import Any
import asyncio
import os
import sys
from mcp.server.fastmcp import FastMCP

# Define the server
mcp = FastMCP("Fusion360 Bridge")

# Path to the shared script file
# We default to the relative path, but in production this should be absolute
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BRIDGE_FILE = os.path.join(CURRENT_DIR, "agent_generated_script.py")


@mcp.tool()
def execute_fusion_script(code: str) -> str:
    """
    Executes Python code in Autodesk Fusion 360.

    The code will be written to a bridge file.
    The user must have the 'RunAgentScript' add-in installed in Fusion 360.

    Args:
        code: The Python code to execute. MUST import adsk.core, adsk.fusion.
              Should include a run(context) function.
    """
    try:
        # Validate minimal requirements
        if "adsk.core" not in code:
            return "Error: Code must import adsk.core"

        with open(BRIDGE_FILE, "w", encoding="utf-8") as f:
            f.write(code)

        return f"Successfully sent script to Fusion 360 Bridge.\nLocation: {BRIDGE_FILE}\n\n👉 ACTION REQUIRED: Go to Fusion 360 -> Scripts -> Select 'RunAgentScript' -> Click Run."
    except Exception as e:
        return f"Error writing script bridge: {str(e)}"


@mcp.prompt()
def fusion_designer_persona() -> str:
    """Returns instructions for the Fusion 360 Designer persona"""
    return """You are an expert Autodesk Fusion 360 API developer.
    When asked to design 3D models:
    1. Import `adsk.core, adsk.fusion, traceback`.
    2. Define `run(context)` function.
    3. Use `try/except` blocks to catch errors and show message boxes.
    4. Use `design.rootComponent` to create sketches and extrusions.
    5. Be concise but robust.
    """


if __name__ == "__main__":
    mcp.run(transport="stdio")
