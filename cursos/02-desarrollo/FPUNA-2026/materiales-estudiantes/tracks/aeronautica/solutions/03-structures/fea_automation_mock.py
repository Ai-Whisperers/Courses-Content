"""
Script de Automatización FEA para Optimización de Larguero
---------------------------------------------------------
Este script simula la automatización de un análisis paramétrico usando PyANSYS.
En un entorno real con ANSYS instalado, conectaría con MAPDL o Mechanical.
"""

import time
import pandas as pd
import matplotlib.pyplot as plt
import random

# Definición de parámetros
WIDTHS = [10, 12, 14, 16]  # mm
HEIGHTS = [14, 16, 18, 20]  # mm
MATERIAL_YIELD = 503.0  # MPa
DENSITY = 2.81e-6  # kg/mm3 (Al 7075)
LENGTH = 1000.0  # mm


def mock_solve_ansys(b, h):
    """
    Simula una corrida de FEA en ANSYS.
    Retorna (stress_max_mpa, deflexion_max_mm)
    basado en fórmulas analíticas con un poco de 'ruido' numérico simulado.
    """
    # Analítica base
    q = 0.1118  # N/mm
    I = (b * h**3) / 12.0
    M = (q * LENGTH**2) / 2.0  # N-mm
    c = h / 2.0

    sigma_theor = (M * c) / I
    delta_theor = (q * LENGTH**4) / (8 * 71700 * I)  # E=71700 MPa

    # Simular variación numérica MEF (+/- 2%)
    sigma_fea = sigma_theor * random.uniform(0.98, 1.02)
    delta_fea = delta_theor * random.uniform(0.98, 1.02)

    # Simular tiempo de cómputo
    time.sleep(0.1)

    return sigma_fea, delta_fea


def main():
    print("Iniciando Optimización Paramétrica FEA ANSYS...")
    print(f"Total combinaciones: {len(WIDTHS) * len(HEIGHTS)}")
    print("-" * 60)
    print(
        f"{'b (mm)':<10} {'h (mm)':<10} {'Sigma (MPa)':<15} {'Delta (mm)':<15} {'FS':<10} {'Peso (g)':<10}"
    )
    print("-" * 60)

    results = []

    for b in WIDTHS:
        for h in HEIGHTS:
            try:
                # 1. Update Geometry (Mock)
                # geometry.update(width=b, height=h)

                # 2. Assign Material (Mock)
                # material.assign("Al 7075-T6")

                # 3. Solve
                sigma, delta = mock_solve_ansys(b, h)

                # 4. Post-process
                fs = MATERIAL_YIELD / sigma
                vol = b * h * LENGTH
                weight = vol * DENSITY * 1000  # g

                print(
                    f"{b:<10} {h:<10} {sigma:<15.2f} {delta:<15.2f} {fs:<10.2f} {weight:<10.2f}"
                )

                results.append(
                    {
                        "width": b,
                        "height": h,
                        "stress": sigma,
                        "deflection": delta,
                        "safety_factor": fs,
                        "weight": weight,
                    }
                )

            except Exception as e:
                print(f"Error en caso {b}x{h}: {str(e)}")

    # Análisis de Resultados
    df = pd.DataFrame(results)

    # Filtrar válidos (FS >= 1.5)
    valid_designs = df[df["safety_factor"] >= 1.5].copy()

    if valid_designs.empty:
        print("\nNingún diseño cumple con FS >= 1.5")
    else:
        # Encontrar el más liviano de los válidos
        optimal = valid_designs.loc[valid_designs["weight"].idxmin()]

        print("\n" + "=" * 30)
        print("DISEÑO ÓPTIMO ENCONTRADO")
        print("=" * 30)
        print(f"Sección: {optimal['width']}mm x {optimal['height']}mm")
        print(f"Peso: {optimal['weight']:.2f} g")
        print(f"Factor de Seguridad: {optimal['safety_factor']:.2f}")
        print(f"Deflexión: {optimal['deflection']:.2f} mm")

        # Graficar Pareto
        plt.figure(figsize=(10, 6))

        # Todos los puntos
        plt.scatter(
            df["weight"],
            df["safety_factor"],
            c="gray",
            alpha=0.5,
            label="Diseños Evaluados",
        )

        # Puntos válidos
        plt.scatter(
            valid_designs["weight"],
            valid_designs["safety_factor"],
            c="blue",
            label="FS >= 1.5",
        )

        # Óptimo
        plt.scatter(
            optimal["weight"],
            optimal["safety_factor"],
            c="red",
            s=100,
            marker="*",
            label="Óptimo",
        )

        plt.axhline(y=1.5, color="r", linestyle="--", label="Límite FS=1.5")
        plt.xlabel("Peso (g)")
        plt.ylabel("Factor de Seguridad")
        plt.title("Optimización Estructural: Peso vs Seguridad")
        plt.legend()
        plt.grid()
        plt.savefig("fea_optimization_plot.png")
        print("\nGráfica guardada como fea_optimization_plot.png")


if __name__ == "__main__":
    main()
