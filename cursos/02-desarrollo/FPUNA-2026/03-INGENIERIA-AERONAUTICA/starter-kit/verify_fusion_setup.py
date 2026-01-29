import subprocess
import sys
import shutil
import os
import json


def check_command(command, name):
    """Checks if a command exists in the PATH."""
    path = shutil.which(command)
    if path:
        print(f"✅ {name} found: {path}")
        return True
    else:
        print(f"❌ {name} NOT found.")
        return False


def check_directory(path, name):
    if os.path.isdir(path):
        print(f"✅ {name} directory found: {path}")
        return True
    else:
        print(f"❌ {name} directory NOT found at: {path}")
        return False


def check_config_entry():
    config_path = os.path.expandvars(r"%APPDATA%\Claude\claude_desktop_config.json")
    print(f"Checking Claude Desktop config at: {config_path}")
    if os.path.exists(config_path):
        try:
            with open(config_path, "r") as f:
                config = json.load(f)
            if "fusion360" in config.get("mcpServers", {}):
                print("✅ 'fusion360' entry found in claude_desktop_config.json")
                return True
            else:
                print("❌ 'fusion360' entry NOT found in claude_desktop_config.json")
                return False
        except Exception as e:
            print(f"❌ Error reading config: {e}")
            return False
    else:
        print(f"❌ Config file not found.")
        return False


def main():
    print("=== Fusion 360 MCP Setup Verification ===\n")

    # 1. Check Python
    python_ok = check_command("python", "Python")

    if not python_ok:
        print("\n❌ Critical: Python is required.")
        sys.exit(1)

    # 2. Check Repository Clone
    repo_path = (
        r"c:\Users\Alejandro\Documents\Ivan\Work\Courses Content\fusion360-mcp-server"
    )
    repo_ok = check_directory(repo_path, "Fusion 360 MCP Server Repo")

    # 3. Check Config
    config_ok = check_config_entry()

    print("\n=== Summary ===")
    if repo_ok and config_ok:
        print("🎉 GREAT! The environment seems ready for Fusion 360 MCP.")
        print("Next steps:")
        print("1. Ensure Fusion 360 application is running.")
        print("2. Restart Claude Desktop to load the new config.")
    else:
        print("⚠️  Setup incomplete.")


if __name__ == "__main__":
    main()
