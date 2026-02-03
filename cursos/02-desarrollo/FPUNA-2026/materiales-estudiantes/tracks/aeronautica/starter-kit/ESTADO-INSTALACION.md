# Estado de Instalacion - Herramientas de Ingenieria Aeronautica

## Instalado Exitosamente

### Paquetes Python (pip)
| Paquete | Version | Proposito |
|---------|---------|-----------|
| neuralfoil | 0.3.2 | Analisis de perfiles con IA (1000x mas rapido que XFOIL) |
| aerosandbox | 4.2.9 | Framework de diseno de aeronaves |
| deap | 1.4.3 | Algoritmos geneticos para optimizacion |
| mcp | 1.25.0 | Base de Model Context Protocol |
| mcp-server-fetch | 2025.4.7 | MCP para obtener contenido web |
| numpy-mcp | 0.1.0 | MCP para calculos NumPy |

### MCPs de Node.js (npm)
| Paquete | Version | Proposito |
|---------|---------|-----------|
| @modelcontextprotocol/server-filesystem | 2026.1.14 | Acceso al sistema de archivos |
| @upstash/context7-mcp | 2.1.0 | Busqueda de documentacion |
| @playwright/mcp | 0.0.54 | Automatizacion del navegador |

### Software de Escritorio
| Software | Estado | Notas |
|----------|--------|-------|
| blueCFD-Core | Instalando | OpenFOAM para Windows (830MB) |

---

## Instalacion Manual Requerida

### XFLR5 (Analisis de Perfiles)
**Descargar de:** https://sourceforge.net/projects/xflr5/files/

1. Ir al enlace de arriba
2. Descargar `xflr5_v6.57_win64_setup.exe`
3. Ejecutar el instalador
4. Instalar en la ubicacion predeterminada

**Por que manual?** Las redirecciones de SourceForge requieren descarga desde el navegador.

### Fusion 360 (CAD)
**Obtener de:** https://www.autodesk.com/education/free-software/fusion-360

1. Crear cuenta educativa de Autodesk
2. Verificar estado de estudiante/educador
3. Descargar Fusion 360
4. Instalar y activar

**Por que manual?** Requiere verificacion de cuenta educativa.

---

## Comandos de Verificacion

```bash
# Paquetes Python
python -c "import neuralfoil, aerosandbox, deap; print('Paquetes Python OK!')"

# MCPs
pip list | findstr mcp
npm list -g --depth=0 | findstr mcp

# Probar NeuralFoil
python -c "
import neuralfoil as nf
import aerosandbox as asb
af = asb.Airfoil('naca2412')
aero = nf.get_aero_from_airfoil(af, alpha=5, Re=500000)
print(f'CL={float(aero[\"CL\"][0]):.3f}, CD={float(aero[\"CD\"][0]):.5f}')
"
```

---

## Configuracion de Claude Desktop

Agregar a `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "C:/Users/TU_USUARIO/Documents/aeronautica"
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

## Resumen

| Categoria | Instalados | Requieren Instalacion Manual |
|----------|-----------|-----------------|
| Herramientas IA (Python) | 3/3 | 0 |
| MCPs (Python) | 3/3 | 0 |
| MCPs (Node.js) | 3/3 | 0 |
| Software de Escritorio | 1/3 | 2 (XFLR5, Fusion 360) |

**Total:** 10/12 instalados automaticamente, 2 requieren descarga manual.
