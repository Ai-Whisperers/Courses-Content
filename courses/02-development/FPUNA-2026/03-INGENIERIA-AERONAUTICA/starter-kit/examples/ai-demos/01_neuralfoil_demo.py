"""
Demo 01: NeuralFoil - Analisis de Perfiles Aerodinamicos con IA
================================================================

NeuralFoil es 1000x mas rapido que XFOIL gracias a redes neuronales
entrenadas en millones de simulaciones.

Ejecutar: python 01_neuralfoil_demo.py

Requiere: pip install neuralfoil aerosandbox matplotlib numpy
"""

import numpy as np
import matplotlib.pyplot as plt

# Verificar disponibilidad de paquetes
try:
    import neuralfoil as nf
    import aerosandbox as asb

    NEURALFOIL_AVAILABLE = True
except ImportError as e:
    NEURALFOIL_AVAILABLE = False
    print(f"Paquetes no instalados: {e}")
    print("Ejecuta: pip install neuralfoil aerosandbox")


def get_aero(airfoil_name: str, alpha: float, Re: float) -> dict:
    """
    Wrapper para obtener aerodinamica de un perfil por nombre.

    Args:
        airfoil_name: Nombre del perfil (ej: "naca2412")
        alpha: Angulo de ataque en grados
        Re: Numero de Reynolds

    Returns:
        dict con CL, CD, CM como floats
    """
    airfoil = asb.Airfoil(airfoil_name)
    aero = nf.get_aero_from_airfoil(airfoil=airfoil, alpha=alpha, Re=Re)

    # Convertir arrays a floats
    return {
        "CL": float(aero["CL"][0])
        if hasattr(aero["CL"], "__len__")
        else float(aero["CL"]),
        "CD": float(aero["CD"][0])
        if hasattr(aero["CD"], "__len__")
        else float(aero["CD"]),
        "CM": float(aero["CM"][0])
        if hasattr(aero["CM"], "__len__")
        else float(aero["CM"]),
    }


def analyze_airfoil(airfoil_name: str, Re: float = 500000) -> dict:
    """
    Analiza un perfil aerodinamico usando NeuralFoil.

    Args:
        airfoil_name: Nombre del perfil (ej: "naca2412")
        Re: Numero de Reynolds

    Returns:
        dict con resultados del analisis
    """
    if not NEURALFOIL_AVAILABLE:
        return None

    alphas = np.linspace(-5, 15, 41)
    results = {"alpha": alphas, "CL": [], "CD": [], "CM": [], "L_D": []}

    print(f"\nAnalizando perfil {airfoil_name.upper()} a Re = {Re:,.0f}")
    print("-" * 50)

    for alpha in alphas:
        try:
            aero = get_aero(airfoil_name, alpha=alpha, Re=Re)
            results["CL"].append(aero["CL"])
            results["CD"].append(aero["CD"])
            results["CM"].append(aero["CM"])
            results["L_D"].append(aero["CL"] / aero["CD"] if aero["CD"] > 0 else 0)
        except Exception as e:
            print(f"Error en alpha={alpha}: {e}")
            results["CL"].append(np.nan)
            results["CD"].append(np.nan)
            results["CM"].append(np.nan)
            results["L_D"].append(np.nan)

    # Convertir a arrays
    for key in ["CL", "CD", "CM", "L_D"]:
        results[key] = np.array(results[key])

    return results


def plot_airfoil_analysis(results: dict, airfoil_name: str):
    """Genera graficos del analisis de perfil."""

    fig, axes = plt.subplots(2, 2, figsize=(12, 10))
    fig.suptitle(
        f"Analisis Aerodinamico: {airfoil_name.upper()}", fontsize=14, fontweight="bold"
    )

    alpha = results["alpha"]

    # 1. CL vs Alpha
    ax1 = axes[0, 0]
    ax1.plot(alpha, results["CL"], "b-", linewidth=2)
    ax1.set_xlabel("Angulo de Ataque (deg)")
    ax1.set_ylabel("Coeficiente de Sustentacion (CL)")
    ax1.set_title("Curva de Sustentacion")
    ax1.grid(True, alpha=0.3)
    ax1.axhline(y=0, color="k", linestyle="-", linewidth=0.5)
    ax1.axvline(x=0, color="k", linestyle="-", linewidth=0.5)

    # Encontrar CL_max
    cl_max_idx = np.nanargmax(results["CL"])
    cl_max = results["CL"][cl_max_idx]
    alpha_cl_max = alpha[cl_max_idx]
    ax1.plot(alpha_cl_max, cl_max, "ro", markersize=10)
    ax1.annotate(
        f"CL_max = {cl_max:.3f}\nalpha = {alpha_cl_max:.1f} deg",
        xy=(alpha_cl_max, cl_max),
        xytext=(alpha_cl_max + 3, cl_max - 0.2),
        arrowprops=dict(arrowstyle="->", color="red"),
        fontsize=10,
        color="red",
    )

    # 2. Polar de Arrastre (CL vs CD)
    ax2 = axes[0, 1]
    ax2.plot(results["CD"], results["CL"], "r-", linewidth=2)
    ax2.set_xlabel("Coeficiente de Arrastre (CD)")
    ax2.set_ylabel("Coeficiente de Sustentacion (CL)")
    ax2.set_title("Polar de Arrastre")
    ax2.grid(True, alpha=0.3)

    # 3. L/D vs Alpha
    ax3 = axes[1, 0]
    ax3.plot(alpha, results["L_D"], "g-", linewidth=2)
    ax3.set_xlabel("Angulo de Ataque (deg)")
    ax3.set_ylabel("Eficiencia Aerodinamica (L/D)")
    ax3.set_title("Eficiencia vs Angulo de Ataque")
    ax3.grid(True, alpha=0.3)

    # Encontrar (L/D)_max
    ld_max_idx = np.nanargmax(results["L_D"])
    ld_max = results["L_D"][ld_max_idx]
    alpha_ld_max = alpha[ld_max_idx]
    ax3.plot(alpha_ld_max, ld_max, "go", markersize=10)
    ax3.annotate(
        f"(L/D)_max = {ld_max:.1f}\nalpha = {alpha_ld_max:.1f} deg",
        xy=(alpha_ld_max, ld_max),
        xytext=(alpha_ld_max + 3, ld_max - 10),
        arrowprops=dict(arrowstyle="->", color="green"),
        fontsize=10,
        color="green",
    )

    # 4. CM vs Alpha
    ax4 = axes[1, 1]
    ax4.plot(alpha, results["CM"], "m-", linewidth=2)
    ax4.set_xlabel("Angulo de Ataque (deg)")
    ax4.set_ylabel("Coeficiente de Momento (CM)")
    ax4.set_title("Momento de Cabeceo")
    ax4.grid(True, alpha=0.3)
    ax4.axhline(y=0, color="k", linestyle="-", linewidth=0.5)

    plt.tight_layout()
    return fig


def compare_airfoils(airfoils: list, Re: float = 500000):
    """Compara multiples perfiles aerodinamicos."""

    fig, axes = plt.subplots(1, 2, figsize=(14, 5))
    fig.suptitle(
        f"Comparacion de Perfiles a Re = {Re:,.0f}", fontsize=14, fontweight="bold"
    )

    colors = ["b", "r", "g", "m", "c", "y"]

    for i, airfoil in enumerate(airfoils):
        results = analyze_airfoil(airfoil, Re)
        if results is None:
            continue

        color = colors[i % len(colors)]

        # CL vs Alpha
        axes[0].plot(
            results["alpha"],
            results["CL"],
            f"{color}-",
            linewidth=2,
            label=airfoil.upper(),
        )

        # L/D vs Alpha
        axes[1].plot(
            results["alpha"],
            results["L_D"],
            f"{color}-",
            linewidth=2,
            label=airfoil.upper(),
        )

    axes[0].set_xlabel("Angulo de Ataque (deg)")
    axes[0].set_ylabel("CL")
    axes[0].set_title("Curvas de Sustentacion")
    axes[0].legend()
    axes[0].grid(True, alpha=0.3)

    axes[1].set_xlabel("Angulo de Ataque (deg)")
    axes[1].set_ylabel("L/D")
    axes[1].set_title("Eficiencia Aerodinamica")
    axes[1].legend()
    axes[1].grid(True, alpha=0.3)

    plt.tight_layout()
    return fig


def main():
    """Ejecuta la demo de NeuralFoil."""

    if not NEURALFOIL_AVAILABLE:
        print("\n" + "=" * 60)
        print("ERROR: NeuralFoil o AeroSandbox no estan instalados")
        print("Ejecuta: pip install neuralfoil aerosandbox")
        print("=" * 60)
        return

    print("\n" + "=" * 60)
    print("  DEMO: NeuralFoil - Analisis de Perfiles con IA")
    print("  Velocidad: 1000x mas rapido que XFOIL")
    print("=" * 60)

    # Demo 1: Analisis de un perfil
    print("\n--- Demo 1: Analisis de NACA 2412 ---")
    results = analyze_airfoil("naca2412", Re=500000)

    if results:
        # Encontrar valores clave
        cl_max_idx = np.nanargmax(results["CL"])
        ld_max_idx = np.nanargmax(results["L_D"])

        print(f"\nResultados clave:")
        print(
            f"  CL_max = {results['CL'][cl_max_idx]:.3f} a alpha = {results['alpha'][cl_max_idx]:.1f} deg"
        )
        print(
            f"  (L/D)_max = {results['L_D'][ld_max_idx]:.1f} a alpha = {results['alpha'][ld_max_idx]:.1f} deg"
        )
        print(
            f"  Alpha_0 (CL=0) ~ {results['alpha'][np.nanargmin(np.abs(results['CL']))]:.1f} deg"
        )

        # Generar grafico
        fig = plot_airfoil_analysis(results, "naca2412")
        plt.savefig("naca2412_analysis.png", dpi=150, bbox_inches="tight")
        print(f"\nGrafico guardado: naca2412_analysis.png")

    # Demo 2: Comparacion de perfiles
    print("\n--- Demo 2: Comparacion de Perfiles ---")
    airfoils_to_compare = ["naca0012", "naca2412", "naca4412", "naca23012"]

    fig = compare_airfoils(airfoils_to_compare)
    plt.savefig("airfoil_comparison.png", dpi=150, bbox_inches="tight")
    print(f"Grafico guardado: airfoil_comparison.png")

    # Demo 3: Efecto del Reynolds
    print("\n--- Demo 3: Efecto del Numero de Reynolds ---")
    reynolds_numbers = [100000, 500000, 1000000, 2000000]

    fig, ax = plt.subplots(figsize=(10, 6))
    for Re in reynolds_numbers:
        results = analyze_airfoil("naca2412", Re=Re)
        if results:
            ax.plot(
                results["alpha"], results["L_D"], linewidth=2, label=f"Re = {Re:,.0f}"
            )

    ax.set_xlabel("Angulo de Ataque (deg)")
    ax.set_ylabel("L/D")
    ax.set_title("Efecto del Reynolds en NACA 2412")
    ax.legend()
    ax.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig("reynolds_effect.png", dpi=150, bbox_inches="tight")
    print(f"Grafico guardado: reynolds_effect.png")

    # No mostrar ventanas interactivas (para ejecucion automatica)
    # plt.show()

    print("\n" + "=" * 60)
    print("  Demo completada!")
    print("  Revisa los graficos generados (.png)")
    print("=" * 60)


if __name__ == "__main__":
    main()
