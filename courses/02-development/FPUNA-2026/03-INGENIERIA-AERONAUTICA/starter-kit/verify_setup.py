"""
verify_setup.py - Script de Verificacion del Setup para Ingenieria Aeronautica
===============================================================================

Este script verifica que todas las herramientas necesarias para el curso
de Ingenieria Aeronautica con IA estan correctamente instaladas.

FPUNA Verano 2026 - Track 03: Ingenieria Aeronautica

Uso:
    python verify_setup.py
"""

from __future__ import annotations

import subprocess
import sys
import io
from pathlib import Path

# Fix encoding for Windows console
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

# Symbols that work in most terminals
OK = "[OK]"
FAIL = "[FAIL]"
WARN = "[WARN]"


def print_header():
    """Imprime encabezado del script."""
    print("=" * 70)
    print("  VERIFICACION DE SETUP - Ingenieria Aeronautica con IA")
    print("  FPUNA Verano 2026")
    print("=" * 70)
    print()


def check_python_version() -> bool:
    """Verifica version de Python >= 3.10."""
    print("[1/8] Verificando Python...")
    version = sys.version_info
    if version.major >= 3 and version.minor >= 10:
        print(f"      {OK} Python {version.major}.{version.minor}.{version.micro}")
        return True
    else:
        print(f"      {FAIL} Python {version.major}.{version.minor} - Requiere 3.10+")
        return False


def check_library(name: str, import_name: str | None = None) -> bool:
    """Verifica si una libreria esta instalada."""
    import_name = import_name or name
    try:
        module = __import__(import_name)
        version = getattr(module, "__version__", "instalado")
        print(f"      {OK} {name} ({version})")
        return True
    except ImportError:
        print(f"      {FAIL} {name} - No instalado")
        return False


def check_python_libraries() -> tuple[int, int]:
    """Verifica librerias Python requeridas."""
    print("\n[2/8] Verificando librerias Python...")

    libraries = [
        ("numpy", "numpy"),
        ("scipy", "scipy"),
        ("matplotlib", "matplotlib"),
        ("pandas", "pandas"),
        ("filterpy", "filterpy"),
        ("scikit-learn", "sklearn"),
        ("ambiance", "ambiance"),
        ("pyvista", "pyvista"),
    ]

    passed = 0
    failed = 0

    for name, import_name in libraries:
        if check_library(name, import_name):
            passed += 1
        else:
            failed += 1

    return passed, failed


def check_atmospheric_model() -> bool:
    """Verifica que el modelo atmosferico funcione."""
    print("\n[3/8] Verificando modelo atmosferico ISA...")
    try:
        from ambiance import Atmosphere

        # Test a 1000m de altitud
        atm = Atmosphere(1000)
        density = atm.density[0]
        temperature = atm.temperature[0]

        print(f"      {OK} Atmosfera ISA funcionando")
        print(f"         Densidad a 1000m: {density:.4f} kg/m3")
        print(
            f"         Temperatura a 1000m: {temperature:.1f} K ({temperature - 273.15:.1f} C)"
        )
        return True
    except Exception as e:
        print(f"      {FAIL} Error: {e}")
        return False


def check_aerodynamic_calculations() -> bool:
    """Verifica calculos aerodinamicos basicos."""
    print("\n[4/8] Verificando calculos aerodinamicos...")
    try:
        import numpy as np

        # Datos de prueba (UAV tipico)
        rho = 1.225  # kg/m3 (nivel del mar)
        V = 15  # m/s (velocidad crucero)
        S = 0.5  # m2 (superficie alar)
        CL = 0.8  # Coeficiente de sustentacion

        # Calcular sustentacion
        q = 0.5 * rho * V**2  # Presion dinamica
        L = q * S * CL  # Sustentacion

        print(f"      {OK} Calculos OK")
        print(f"         Presion dinamica q = {q:.2f} Pa")
        print(f"         Sustentacion L = {L:.2f} N ({L / 9.81:.2f} kg)")

        # Verificar numero de Reynolds
        mu = 1.81e-5  # Viscosidad dinamica del aire
        c = 0.25  # Cuerda (m)
        Re = (rho * V * c) / mu
        print(f"         Reynolds Re = {Re:.0f}")

        return True
    except Exception as e:
        print(f"      {FAIL} Error: {e}")
        return False


def check_visualization() -> bool:
    """Verifica capacidades de visualizacion."""
    print("\n[5/8] Verificando visualizacion...")
    try:
        import matplotlib.pyplot as plt
        import numpy as np

        # Test simple de matplotlib
        x = np.linspace(0, 1, 100)
        y = 0.12 * (
            0.2969 * np.sqrt(x)
            - 0.126 * x
            - 0.3516 * x**2
            + 0.2843 * x**3
            - 0.1015 * x**4
        )

        fig, ax = plt.subplots()
        ax.plot(x, y)
        ax.plot(x, -y)
        plt.close(fig)

        print(f"      {OK} Matplotlib funcionando")
        return True
    except Exception as e:
        print(f"      {FAIL} Error matplotlib: {e}")
        return False


def check_git() -> bool:
    """Verifica instalacion de Git."""
    print("\n[6/8] Verificando Git...")
    try:
        result = subprocess.run(
            ["git", "--version"], capture_output=True, text=True, timeout=10
        )
        if result.returncode == 0:
            version = result.stdout.strip()
            print(f"      {OK} {version}")
            return True
        else:
            print(f"      {FAIL} Git no responde correctamente")
            return False
    except FileNotFoundError:
        print(f"      {FAIL} Git no encontrado - Instalar desde https://git-scm.com")
        return False
    except Exception as e:
        print(f"      {FAIL} Error: {e}")
        return False


def check_external_tools() -> tuple[int, int]:
    """Verifica herramientas externas (XFLR5, ParaView, etc.)."""
    print("\n[7/8] Verificando herramientas externas...")

    passed = 0
    failed = 0

    # ParaView
    paraview_paths = [
        Path("C:/Program Files/ParaView 6.0.1/bin/paraview.exe"),
        Path("C:/Program Files/ParaView/bin/paraview.exe"),
        Path("C:/Program Files (x86)/ParaView/bin/paraview.exe"),
    ]

    paraview_found = False
    for p in paraview_paths:
        if p.exists():
            print(f"      {OK} ParaView encontrado")
            paraview_found = True
            passed += 1
            break

    if not paraview_found:
        # Buscar en registro de Windows o PATH
        try:
            result = subprocess.run(
                ["where", "paraview"], capture_output=True, text=True, timeout=10
            )
            if result.returncode == 0:
                print(f"      {OK} ParaView encontrado en PATH")
                passed += 1
                paraview_found = True
        except Exception:
            pass

    if not paraview_found:
        print(f"      {WARN} ParaView no encontrado (opcional para CFD)")
        print(f"         Descargar de: https://www.paraview.org/download/")
        failed += 1

    # XFLR5
    xflr5_paths = [
        Path("C:/Program Files/xflr5/xflr5.exe"),
        Path("C:/Program Files (x86)/xflr5/xflr5.exe"),
    ]

    xflr5_found = False
    for p in xflr5_paths:
        if p.exists():
            print(f"      {OK} XFLR5 encontrado")
            xflr5_found = True
            passed += 1
            break

    if not xflr5_found:
        print(f"      {WARN} XFLR5 no encontrado (necesario para analisis de perfiles)")
        print(f"         Descargar de: https://sourceforge.net/projects/xflr5/")
        failed += 1

    # OpenVSP
    openvsp_paths = [
        Path("C:/Program Files/OpenVSP/vsp.exe"),
        Path("C:/Program Files (x86)/OpenVSP/vsp.exe"),
    ]

    openvsp_found = False
    for p in openvsp_paths:
        if p.exists():
            print(f"      {OK} OpenVSP encontrado")
            openvsp_found = True
            passed += 1
            break

    if not openvsp_found:
        print(f"      {WARN} OpenVSP no encontrado (opcional para modelado 3D)")
        print(f"         Descargar de: https://openvsp.org/download.shtml")
        failed += 1

    return passed, failed


def check_vscode() -> bool:
    """Verifica instalacion de VS Code."""
    print("\n[8/8] Verificando VS Code...")
    try:
        result = subprocess.run(
            ["code", "--version"],
            capture_output=True,
            text=True,
            timeout=10,
            shell=True,  # Necesario en Windows
        )
        if result.returncode == 0:
            version = result.stdout.strip().split("\n")[0]
            print(f"      {OK} VS Code {version}")
            return True
        else:
            print(f"      {FAIL} VS Code no responde")
            return False
    except FileNotFoundError:
        print(f"      {FAIL} VS Code no encontrado")
        print(f"         Instalar: winget install Microsoft.VisualStudioCode")
        return False
    except Exception as e:
        print(f"      {WARN} No se pudo verificar VS Code: {e}")
        return False


def naca_airfoil_test() -> bool:
    """Genera y grafica un perfil NACA como test final."""
    print("\n[BONUS] Test de generacion de perfil NACA 0012...")
    try:
        import numpy as np
        import matplotlib

        matplotlib.use("Agg")  # Backend sin GUI
        import matplotlib.pyplot as plt

        # Generar perfil NACA 0012
        c = 1.0  # Cuerda normalizada
        t = 0.12  # Espesor 12%

        # Distribucion coseno para mas puntos en bordes
        beta = np.linspace(0, np.pi, 100)
        x = c * (1 - np.cos(beta)) / 2

        # Ecuacion NACA para perfiles simetricos
        y_t = (
            (t / 0.2)
            * c
            * (
                0.2969 * np.sqrt(x / c)
                - 0.1260 * (x / c)
                - 0.3516 * (x / c) ** 2
                + 0.2843 * (x / c) ** 3
                - 0.1015 * (x / c) ** 4
            )
        )

        # Crear figura
        fig, ax = plt.subplots(figsize=(10, 4))
        ax.plot(x, y_t, "b-", linewidth=2, label="Extrados")
        ax.plot(x, -y_t, "r-", linewidth=2, label="Intrados")
        ax.fill_between(x, y_t, -y_t, alpha=0.2)
        ax.set_xlabel("x/c")
        ax.set_ylabel("y/c")
        ax.set_title("Perfil NACA 0012 (Generado con Python)")
        ax.set_aspect("equal")
        ax.grid(True, alpha=0.3)
        ax.legend()

        # Guardar figura
        output_path = Path(__file__).parent / "naca_0012_test.png"
        fig.savefig(output_path, dpi=150, bbox_inches="tight")
        plt.close(fig)

        print(f"      {OK} Perfil NACA 0012 generado correctamente")
        print(f"         Archivo guardado: {output_path}")
        print(
            f"         Espesor maximo: {y_t.max() * 2 * 100:.1f}% en x/c = {x[np.argmax(y_t)]:.2f}"
        )
        return True

    except Exception as e:
        print(f"      {FAIL} Error generando perfil: {e}")
        return False


def print_summary(results: dict):
    """Imprime resumen final."""
    print("\n" + "=" * 70)
    print("  RESUMEN DE VERIFICACION")
    print("=" * 70)

    total_pass = sum(
        1 for v in results.values() if v is True or (isinstance(v, tuple) and v[1] == 0)
    )
    total_fail = sum(
        1 for v in results.values() if v is False or (isinstance(v, tuple) and v[1] > 0)
    )

    print(f"\n  Verificaciones exitosas: {total_pass}")
    print(f"  Verificaciones fallidas: {total_fail}")

    if total_fail == 0:
        print(f"\n  {OK} SETUP COMPLETO! Estas listo para el curso.")
    else:
        print(f"\n  {WARN} Hay componentes faltantes. Revisa las instrucciones arriba.")

    print("\n  Proximos pasos:")
    print("  1. Instalar Fusion 360: https://www.autodesk.com/education/home")
    print("  2. Si faltan herramientas, seguir instrucciones de descarga")
    print("  3. Revisar starter-kit/PREREQUISITES.md")
    print("\n" + "=" * 70)
    print("  RESUMEN DE VERIFICACION")
    print("=" * 70)

    total_pass = sum(
        1 for v in results.values() if v is True or (isinstance(v, tuple) and v[1] == 0)
    )
    total_fail = sum(
        1 for v in results.values() if v is False or (isinstance(v, tuple) and v[1] > 0)
    )

    print(f"\n  Verificaciones exitosas: {total_pass}")
    print(f"  Verificaciones fallidas: {total_fail}")

    if total_fail == 0:
        print("\n  ✅ ¡SETUP COMPLETO! Estas listo para el curso.")
    else:
        print("\n  ⚠️  Hay componentes faltantes. Revisa las instrucciones arriba.")

    print("\n  Proximos pasos:")
    print("  1. Instalar Fusion 360: https://www.autodesk.com/education/home")
    print("  2. Si faltan herramientas, seguir instrucciones de descarga")
    print("  3. Revisar starter-kit/PREREQUISITES.md")
    print("\n" + "=" * 70)


def main():
    """Funcion principal."""
    print_header()

    results = {}

    # Verificaciones
    results["python"] = check_python_version()
    results["libraries"] = check_python_libraries()
    results["atmosphere"] = check_atmospheric_model()
    results["aerodynamics"] = check_aerodynamic_calculations()
    results["visualization"] = check_visualization()
    results["git"] = check_git()
    results["external_tools"] = check_external_tools()
    results["vscode"] = check_vscode()

    # Test bonus
    results["naca_test"] = naca_airfoil_test()

    # Resumen
    print_summary(results)

    return (
        0
        if all(
            v is True or (isinstance(v, tuple) and v[1] == 0) for v in results.values()
        )
        else 1
    )


if __name__ == "__main__":
    sys.exit(main())
