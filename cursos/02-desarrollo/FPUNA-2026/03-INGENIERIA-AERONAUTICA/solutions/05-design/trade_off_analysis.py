"""
Script de Análisis de Trade-off Multi-Objetivo (Diseño UAV)
------------------------------------------------------------
Explora espacio de diseño (Envergadura, Batería, Velocidad)
para optimizar Autonomía, Peso y Costo.
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


def uav_model(span, capacity_mah, velocity):
    """
    Modelo simplificado de física de UAV.
    Returns: (weight, endurance_min, cost)
    """
    # Constantes
    rho = 1.225
    e = 0.85
    CD0 = 0.025
    chord = 0.25  # m (constante simplificado)
    S = span * chord
    AR = span**2 / S

    # Pesos
    w_empty_base = 1.5  # kg (fuselaje, avionica)
    w_structure = 0.3 * S**0.75 * 5  # Factor empírico
    w_battery = (capacity_mah / 1000.0) * 0.075 * 4  # ~300g por 4Ah 4S estimación
    weight = w_empty_base + w_structure + w_battery + 0.3  # motor prop

    # Aerodinámica
    CL = (weight * 9.81) / (0.5 * rho * velocity**2 * S)
    CD = CD0 + (CL**2) / (np.pi * AR * e)
    Drag = 0.5 * rho * velocity**2 * S * CD

    # Potencia
    eta_prop = 0.65
    Power_req = Drag * velocity / eta_prop

    # Autonomía
    # Energia = V * Ah = 14.8 * Ah
    Energy_Wh = 14.8 * (capacity_mah / 1000.0) * 0.8  # 80% DoD
    Endurance_h = Energy_Wh / Power_req
    Endurance_min = Endurance_h * 60

    # Costo
    cost_base = 2000
    cost_struct = 500 * span
    cost_bat = 10 * (capacity_mah / 1000.0) * 4  # USD por celda
    cost = cost_base + cost_struct + cost_bat + 1000  # avionica

    return weight, Endurance_min, cost


def main():
    print("Iniciando Design Space Exploration...")

    # Design Variables
    spans = np.linspace(1.2, 1.8, 5)
    batteries = np.linspace(4000, 10000, 5)
    velocities = np.linspace(12, 18, 4)

    results = []

    for b in spans:
        for cap in batteries:
            for v in velocities:
                w, t, c = uav_model(b, cap, v)

                status = "OK"
                # Constraints
                if w > 4.0:
                    status = "OverWeight"
                if c > 5500:
                    status = "OverCost"

                results.append(
                    {
                        "Span": b,
                        "Battery": cap,
                        "Velocity": v,
                        "Weight": w,
                        "Endurance": t,
                        "Cost": c,
                        "Status": status,
                    }
                )

    df = pd.DataFrame(results)

    # Filtrar válidos
    valid = df[df["Status"] == "OK"].sort_values("Endurance", ascending=False)

    print(f"\nTotal configuraciones evaluadas: {len(df)}")
    print(f"Configuraciones válidas: {len(valid)}")

    print("\n--- TOP 3 CONFIGURACIONES (Max Autonomía) ---")
    print(valid.head(3).to_string(index=False))

    # Plotting
    plt.figure(figsize=(10, 6))

    # Valid points
    plt.scatter(
        valid["Weight"],
        valid["Endurance"],
        c=valid["Cost"],
        cmap="viridis",
        s=50,
        label="Válidos",
    )
    plt.colorbar(label="Costo (USD)")

    # Invalid points
    invalid = df[df["Status"] != "OK"]
    plt.scatter(
        invalid["Weight"],
        invalid["Endurance"],
        c="gray",
        alpha=0.3,
        marker="x",
        label="Inválidos",
    )

    plt.axhline(y=50, color="r", linestyle="--", label="Obj > 50min")
    plt.axvline(x=4.0, color="r", linestyle="--", label="Max Peso 4kg")

    plt.xlabel("Peso (kg)")
    plt.ylabel("Autonomía (min)")
    plt.title("Trade-off Analysis: Peso vs Autonomía vs Costo")
    plt.legend()
    plt.grid(True)
    plt.savefig("tradeoff_plot.png")
    print("\nGráfica guardada como tradeoff_plot.png")


if __name__ == "__main__":
    main()
