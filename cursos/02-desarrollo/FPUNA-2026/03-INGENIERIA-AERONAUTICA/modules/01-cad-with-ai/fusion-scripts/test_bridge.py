import os
import sys
import pytest

# Add the directory to sys.path so we can import the server module
sys.path.append(os.path.dirname(__file__))

# Import the server module
# Note: We need to mock FastMCP if we want to unit test the function without running the server
# But since 'mcp' is installed, we might be able to import it directly.
try:
    from fusion_mcp_server import execute_fusion_script, BRIDGE_FILE
except ImportError as e:
    print(f"Failed to import fusion_mcp_server: {e}")
    sys.exit(1)


def test_bridge_writing():
    print("[TEST] Testing Fusion 360 MCP Bridge...")

    # Test Code to send
    test_code = """
import adsk.core, adsk.fusion, traceback

def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        ui.messageBox('Test Successful')
    except:
        pass
"""

    # Execute the tool (simulate Agent calling it)
    print(f"[INFO] Sending script to: {BRIDGE_FILE}")
    result = execute_fusion_script(test_code)
    try:
        print(f"Result: {result}")
    except UnicodeEncodeError:
        print(f"Result: {result.encode('ascii', 'ignore').decode()}")

    # Verify file existence
    if os.path.exists(BRIDGE_FILE):
        print("[PASS] Bridge file created.")
    else:
        print("[FAIL] Bridge file NOT created.")
        sys.exit(1)

    # Verify content
    with open(BRIDGE_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    if content == test_code:
        print("✅ Content verified match.")
    else:
        print("❌ Content mismatch.")
        print(f"Expected:\n{test_code}")
        print(f"Got:\n{content}")
        sys.exit(1)

    print("\n🎉 Test Complete: The Bridge is functional.")
    print(
        "Next step: User must run 'RunAgentScript' inside Fusion 360 to pick up this file."
    )


if __name__ == "__main__":
    test_bridge_writing()
