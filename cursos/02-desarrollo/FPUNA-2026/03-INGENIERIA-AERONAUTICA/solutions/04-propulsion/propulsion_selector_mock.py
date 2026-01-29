"""
Herramienta de Selección de Sistema Propulsivo (Mock)
----------------------------------------------------
Simula una base de datos de componentes y recomienda la mejor combinación.
"""


def main():
    print("--- PROPULSION SELECTOR TOOL v1.0 ---\n")

    # Simulación de inputs (en un real script usaría input())
    # peso_uav = float(input("Peso UAV (kg): "))
    peso_uav = 3.0
    autonomia_obj = 45  # min
    presupuesto = 300  # USD

    print(f"Buscando configuración para:")
    print(f"- Peso: {peso_uav} kg")
    print(f"- Autonomía: {autonomia_obj} min")
    print(f"- Presupuesto: ${presupuesto}")

    print("\nCalculando requerimientos energéticos...")
    # Lógica simplificada
    potencia_crucero_estimada = peso_uav * 35  # W/kg empírico
    energia_req_wh = (
        potencia_crucero_estimada * (autonomia_obj / 60) / 0.8
    )  # 80% eficiencia

    print(f"- Potencia crucero est: {potencia_crucero_estimada} W")
    print(f"- Energía batería req: {energia_req_wh:.1f} Wh")

    # Base de datos simulada
    baterias = [
        {"name": "LiPo 4S 5000", "wh": 74, "weight": 0.5, "price": 40},
        {"name": "LiPo 6S 5000", "wh": 111, "weight": 0.75, "price": 60},
        {"name": "LiPo 6S 8000", "wh": 177, "weight": 1.1, "price": 100},
        {"name": "LiPo 6S 10000", "wh": 222, "weight": 1.4, "price": 130},
        {"name": "Li-Ion 6S 10000 (Custom)", "wh": 216, "weight": 0.9, "price": 110},
    ]

    motores = [
        {"name": "T-Motor MN3510", "power": 400, "price": 60, "eff": 0.75},
        {"name": "Sunnysky X4110", "power": 600, "price": 45, "eff": 0.72},
        {"name": "Hobbywing X6 System", "power": 800, "price": 150, "eff": 0.85},
    ]

    print("\nEvaluando combinaciones...")
    recommendations = []

    for bat in baterias:
        for mot in motores:
            total_cost = bat["price"] + mot["price"]
            if total_cost > presupuesto:
                continue

            # Calcular tiempo vuelo estimado
            # Asumimos peso aumenta con batería, lo que aumenta potencia requerida
            peso_total = peso_uav + bat["weight"] - 0.5  # Ajuste base
            potencia_real = peso_total * 35 / mot["eff"]
            tiempo = (bat["wh"] * 0.9) / potencia_real * 60  # min

            score = (tiempo / autonomia_obj) * 10 + (1 - total_cost / presupuesto) * 5

            recommendations.append(
                {
                    "motor": mot["name"],
                    "battery": bat["name"],
                    "time": tiempo,
                    "cost": total_cost,
                    "score": score,
                }
            )

    # Ordenar por score
    recommendations.sort(key=lambda x: x["score"], reverse=True)

    print("\n--- TOP 3 RECOMENDACIONES ---")
    for i, rec in enumerate(recommendations[:3]):
        print(f"\n#{i+1}: {rec['motor']} + {rec['battery']}")
        print(f"   Autonomía estimada: {rec['time']:.1f} min")
        print(f"   Costo: ${rec['cost']}")

        if rec["time"] >= autonomia_obj:
            print("   ✅ CUMPLE OBJETIVO")
        else:
            print(f"   ⚠️ Faltan {autonomia_obj - rec['time']:.1f} min")


if __name__ == "__main__":
    main()
