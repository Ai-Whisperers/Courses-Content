# Installation Status - Aeronautical Engineering Tools

## Installed Successfully

### Python Packages (pip)
| Package | Version | Purpose |
|---------|---------|---------|
| neuralfoil | 0.3.2 | AI airfoil analysis (1000x faster than XFOIL) |
| aerosandbox | 4.2.9 | Aircraft design framework |
| deap | 1.4.3 | Genetic algorithms for optimization |
| mcp | 1.25.0 | Model Context Protocol base |
| mcp-server-fetch | 2025.4.7 | Web content fetching MCP |
| numpy-mcp | 0.1.0 | NumPy calculations MCP |

### Node.js MCPs (npm)
| Package | Version | Purpose |
|---------|---------|---------|
| @modelcontextprotocol/server-filesystem | 2026.1.14 | File system access |
| @upstash/context7-mcp | 2.1.0 | Documentation lookup |
| @playwright/mcp | 0.0.54 | Browser automation |

### Desktop Software
| Software | Status | Notes |
|----------|--------|-------|
| blueCFD-Core | Installing | OpenFOAM for Windows (830MB) |

---

## Manual Installation Required

### XFLR5 (Airfoil Analysis)
**Download from:** https://sourceforge.net/projects/xflr5/files/

1. Go to the link above
2. Download `xflr5_v6.57_win64_setup.exe`
3. Run the installer
4. Install to default location

**Why manual?** SourceForge redirects require browser download.

### Fusion 360 (CAD)
**Get from:** https://www.autodesk.com/education/free-software/fusion-360

1. Create Autodesk education account
2. Verify student/educator status
3. Download Fusion 360
4. Install and activate

**Why manual?** Requires education account verification.

---

## Verification Commands

```bash
# Python packages
python -c "import neuralfoil, aerosandbox, deap; print('Python packages OK!')"

# MCPs
pip list | findstr mcp
npm list -g --depth=0 | findstr mcp

# Test NeuralFoil
python -c "
import neuralfoil as nf
import aerosandbox as asb
af = asb.Airfoil('naca2412')
aero = nf.get_aero_from_airfoil(af, alpha=5, Re=500000)
print(f'CL={float(aero[\"CL\"][0]):.3f}, CD={float(aero[\"CD\"][0]):.5f}')
"
```

---

## Claude Desktop Configuration

Add to `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "C:/Users/YOUR_USERNAME/Documents/aeronautica"
      ]
    },
    "fetch": {
      "command": "python",
      "args": ["-m", "mcp_server_fetch"]
    },
    "context7": {
      "command": "npx",
      "args": ["@upstash/context7-mcp"]
    }
  }
}
```

---

## Summary

| Category | Installed | Manual Required |
|----------|-----------|-----------------|
| AI Tools (Python) | 3/3 | 0 |
| MCPs (Python) | 3/3 | 0 |
| MCPs (Node.js) | 3/3 | 0 |
| Desktop Software | 1/3 | 2 (XFLR5, Fusion 360) |

**Total:** 10/12 installed automatically, 2 require manual download.
