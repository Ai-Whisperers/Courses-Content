"""
Demo 02: AeroSandbox - Diseno de Aeronaves con Optimizacion
============================================================

AeroSandbox permite disenar y optimizar aeronaves completas
usando diferenciacion automatica para optimizacion eficiente.

Ejecutar: python 02_aerosandbox_demo.py
"""

import numpy as np
import matplotlib.pyplot as plt

try:
    import aerosandbox as asb
    import aerosandbox.numpy as np_asb

    AEROSANDBOX_AVAILABLE = True
except ImportError:
    AEROSANDBOX_AVAILABLE = False
    print("AeroSandbox no instalado. Ejecuta: pip install aerosandbox")


def create_simple_wing():
    """
    Crea un ala simple para analisis.

    Returns:
        aerosandbox.Wing: Objeto ala
    """
    if not AEROSANDBOX_AVAILABLE:
        return None

    wing = asb.Wing(
        name="Main Wing",
        symmetric=True,  # Ala simetrica (solo definimos una mitad)
        xsecs=[
            # Seccion en la raiz
            asb.WingXSec(
                xyz_le=[0, 0, 0],  # Posicion del borde de ataque
                chord=1.5,  # Cuerda en metros
                twist=2,  # Twist en grados (washout)
                airfoil=asb.Airfoil("naca4412"),
            ),
            # Seccion en la punta
            asb.WingXSec(
                xyz_le=[0.3, 5, 0.3],  # Con sweep y diedro
                chord=0.6,  # Cuerda de punta
                twist=-2,  # Twist negativo (washout)
                airfoil=asb.Airfoil("naca4412"),
            ),
        ],
    )

    return wing


def create_uav_airplane():
    """
    Crea un UAV completo con ala, fuselaje y empenaje.

    Returns:
        aerosandbox.Airplane: Objeto avion
    """
    if not AEROSANDBOX_AVAILABLE:
        return None

    # Ala principal
    main_wing = asb.Wing(
        name="Main Wing",
        symmetric=True,
        xsecs=[
            asb.WingXSec(
                xyz_le=[0.8, 0, 0],
                chord=0.4,
                twist=2,
                airfoil=asb.Airfoil("naca2412"),
            ),
            asb.WingXSec(
                xyz_le=[0.85, 1.5, 0.1],
                chord=0.25,
                twist=0,
                airfoil=asb.Airfoil("naca2412"),
            ),
        ],
    )

    # Empenaje horizontal
    horizontal_tail = asb.Wing(
        name="Horizontal Tail",
        symmetric=True,
        xsecs=[
            asb.WingXSec(
                xyz_le=[2.5, 0, 0.1],
                chord=0.2,
                airfoil=asb.Airfoil("naca0012"),
            ),
            asb.WingXSec(
                xyz_le=[2.55, 0.4, 0.1],
                chord=0.12,
                airfoil=asb.Airfoil("naca0012"),
            ),
        ],
    )

    # Empenaje vertical
    vertical_tail = asb.Wing(
        name="Vertical Tail",
        symmetric=False,
        xsecs=[
            asb.WingXSec(
                xyz_le=[2.4, 0, 0.1],
                chord=0.25,
                airfoil=asb.Airfoil("naca0012"),
            ),
            asb.WingXSec(
                xyz_le=[2.5, 0, 0.4],
                chord=0.15,
                airfoil=asb.Airfoil("naca0012"),
            ),
        ],
    )

    # Fuselaje
    fuselage = asb.Fuselage(
        name="Fuselage",
        xsecs=[
            asb.FuselageXSec(xyz_c=[0, 0, 0], radius=0.05),
            asb.FuselageXSec(xyz_c=[0.3, 0, 0], radius=0.1),
            asb.FuselageXSec(xyz_c=[1.0, 0, 0], radius=0.12),
            asb.FuselageXSec(xyz_c=[2.2, 0, 0.05], radius=0.08),
            asb.FuselageXSec(xyz_c=[2.8, 0, 0.1], radius=0.03),
        ],
    )

    # Crear avion
    airplane = asb.Airplane(
        name="UAV Trainer",
        wings=[main_wing, horizontal_tail, vertical_tail],
        fuselages=[fuselage],
    )

    return airplane


def analyze_operating_point(
    airplane, velocity: float, alpha: float, altitude: float = 0
):
    """
    Analiza un punto de operacion especifico.

    Args:
        airplane: Objeto Airplane
        velocity: Velocidad en m/s
        alpha: Angulo de ataque en grados
        altitude: Altitud en metros

    Returns:
        dict: Resultados del analisis
    """
    if not AEROSANDBOX_AVAILABLE or airplane is None:
        return None

    # Definir punto de operacion
    op_point = asb.OperatingPoint(
        velocity=velocity,
        alpha=alpha,
        beta=0,  # Sin sideslip
        atmosphere=asb.Atmosphere(altitude=altitude),
    )

    # Analisis aerodinamico
    aero = asb.AeroBuildup(
        airplane=airplane,
        op_point=op_point,
    ).run()

    return aero


def sweep_alpha(airplane, velocity: float = 30, altitude: float = 0):
    """
    Realiza barrido de angulo de ataque.

    Args:
        airplane: Objeto Airplane
        velocity: Velocidad en m/s
        altitude: Altitud en metros

    Returns:
        dict: Resultados del barrido
    """
    if not AEROSANDBOX_AVAILABLE or airplane is None:
        return None

    alphas = np.linspace(-5, 15, 21)
    results = {
        "alpha": alphas,
        "CL": [],
        "CD": [],
        "L_D": [],
    }

    for alpha in alphas:
        aero = analyze_operating_point(airplane, velocity, alpha, altitude)
        cl_val = (
            float(aero["CL"])
            if not hasattr(aero["CL"], "__len__")
            else float(np.array(aero["CL"]).flatten()[0])
        )
        cd_val = (
            float(aero["CD"])
            if not hasattr(aero["CD"], "__len__")
            else float(np.array(aero["CD"]).flatten()[0])
        )
        results["CL"].append(cl_val)
        results["CD"].append(cd_val)
        results["L_D"].append(cl_val / cd_val if cd_val > 0 else 0)

    for key in ["CL", "CD", "L_D"]:
        results[key] = np.array(results[key])

    return results


def performance_analysis(airplane, W: float = 50):
    """
    Analisis de performance basico.

    Args:
        airplane: Objeto Airplane
        W: Peso en N

    Returns:
        dict: Metricas de performance
    """
    if not AEROSANDBOX_AVAILABLE or airplane is None:
        return None

    # Obtener area alar (aproximada)
    S = 0
    for wing in airplane.wings:
        if "Main" in wing.name:
            S = wing.area()
            break

    if S == 0:
        S = 1.0  # Default

    results = sweep_alpha(airplane, velocity=30)

    # Encontrar (L/D)_max
    ld_max_idx = np.argmax(results["L_D"])
    ld_max = results["L_D"][ld_max_idx]
    alpha_ld_max = results["alpha"][ld_max_idx]

    # Encontrar CL_max
    cl_max_idx = np.argmax(results["CL"])
    cl_max = results["CL"][cl_max_idx]

    # Velocidad de stall
    rho = 1.225  # kg/m3 al nivel del mar
    V_stall = np.sqrt(2 * W / (rho * S * cl_max))

    # Velocidad de crucero optima (max L/D)
    CL_opt = results["CL"][ld_max_idx]
    V_cruise = np.sqrt(2 * W / (rho * S * CL_opt))

    return {
        "S": S,
        "CL_max": cl_max,
        "L_D_max": ld_max,
        "alpha_L_D_max": alpha_ld_max,
        "V_stall": V_stall,
        "V_cruise_opt": V_cruise,
    }


def main():
    """Ejecuta la demo de AeroSandbox."""

    if not AEROSANDBOX_AVAILABLE:
        print("\n" + "=" * 60)
        print("ERROR: AeroSandbox no esta instalado")
        print("Ejecuta: pip install aerosandbox")
        print("=" * 60)
        return

    print("\n" + "=" * 60)
    print("  DEMO: AeroSandbox - Diseno de Aeronaves")
    print("  Framework de optimizacion con diferenciacion automatica")
    print("=" * 60)

    # Demo 1: Crear y visualizar ala simple
    print("\n--- Demo 1: Ala Simple ---")
    wing = create_simple_wing()

    print(f"Area alar: {wing.area():.2f} m2")
    print(f"Envergadura: {wing.span():.2f} m")
    print(f"Aspect Ratio: {wing.aspect_ratio():.2f}")
    print(f"MAC: {wing.mean_aerodynamic_chord():.3f} m")

    # Demo 2: Crear UAV completo
    print("\n--- Demo 2: UAV Completo ---")
    uav = create_uav_airplane()

    print(f"Nombre: {uav.name}")
    print(f"Numero de alas/superficies: {len(uav.wings)}")

    # Visualizar (skip 3D en modo automatico)
    print("(Vista 3D disponible con: uav.draw())")
    # try:
    #     uav.draw()
    #     plt.savefig("uav_3d_view.png", dpi=150, bbox_inches="tight")
    #     print("Grafico guardado: uav_3d_view.png")
    # except Exception as e:
    #     print(f"No se pudo generar vista 3D: {e}")

    # Demo 3: Analisis aerodinamico
    print("\n--- Demo 3: Analisis Aerodinamico ---")

    aero = analyze_operating_point(uav, velocity=30, alpha=5, altitude=0)
    cl = (
        float(aero["CL"])
        if not hasattr(aero["CL"], "__len__")
        else float(aero["CL"][0])
        if len(aero["CL"]) == 1
        else float(aero["CL"])
    )
    cd = (
        float(aero["CD"])
        if not hasattr(aero["CD"], "__len__")
        else float(aero["CD"][0])
        if len(aero["CD"]) == 1
        else float(aero["CD"])
    )
    print(f"\nCondicion: V=30 m/s, alpha=5 deg, h=0 m")
    print(f"  CL = {cl:.4f}")
    print(f"  CD = {cd:.5f}")
    print(f"  L/D = {cl / cd:.1f}")

    # Demo 4: Barrido de alpha y graficos
    print("\n--- Demo 4: Barrido de Angulo de Ataque ---")

    results = sweep_alpha(uav, velocity=30)

    fig, axes = plt.subplots(1, 3, figsize=(15, 5))
    fig.suptitle("Analisis Aerodinamico del UAV", fontsize=14, fontweight="bold")

    # CL vs alpha
    axes[0].plot(results["alpha"], results["CL"], "b-", linewidth=2)
    axes[0].set_xlabel("Angulo de Ataque (deg)")
    axes[0].set_ylabel("CL")
    axes[0].set_title("Curva de Sustentacion")
    axes[0].grid(True, alpha=0.3)

    # Polar
    axes[1].plot(results["CD"], results["CL"], "r-", linewidth=2)
    axes[1].set_xlabel("CD")
    axes[1].set_ylabel("CL")
    axes[1].set_title("Polar de Arrastre")
    axes[1].grid(True, alpha=0.3)

    # L/D vs alpha
    axes[2].plot(results["alpha"], results["L_D"], "g-", linewidth=2)
    axes[2].set_xlabel("Angulo de Ataque (deg)")
    axes[2].set_ylabel("L/D")
    axes[2].set_title("Eficiencia Aerodinamica")
    axes[2].grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig("uav_aero_analysis.png", dpi=150, bbox_inches="tight")
    print("Grafico guardado: uav_aero_analysis.png")

    # Demo 5: Performance
    print("\n--- Demo 5: Analisis de Performance ---")

    W = 50  # Newton (aprox 5 kg)
    perf = performance_analysis(uav, W=W)

    print(f"\nPeso: {W} N ({W / 9.81:.1f} kg)")
    print(f"Area alar: {perf['S']:.3f} m2")
    print(f"CL_max: {perf['CL_max']:.3f}")
    print(f"(L/D)_max: {perf['L_D_max']:.1f} a alpha={perf['alpha_L_D_max']:.1f} deg")
    print(f"V_stall: {perf['V_stall']:.1f} m/s")
    print(f"V_cruise (optimo): {perf['V_cruise_opt']:.1f} m/s")

    # No bloquear con ventanas interactivas
    # plt.show()

    print("\n" + "=" * 60)
    print("  Demo completada!")
    print("  Revisa los graficos generados (.png)")
    print("=" * 60)


if __name__ == "__main__":
    main()
