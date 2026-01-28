"""
Demo 04: Proyecto Integrado - Diseno de UAV con IA
==================================================

Este proyecto integra todas las herramientas de IA para disenar
un UAV completo:
1. NeuralFoil para analisis de perfiles
2. AeroSandbox para modelado 3D y aerodinamica
3. Optimizacion para seleccion de perfil

Mision: UAV de vigilancia agricola
- Autonomia: 45 minutos
- Carga util: 500g (camara)
- Velocidad de crucero: 20 m/s
- Altitud de operacion: 200m

Ejecutar: python 04_integration_project.py
"""

import numpy as np
import matplotlib.pyplot as plt

# Verificar disponibilidad
try:
    import neuralfoil as nf
    import aerosandbox as asb

    TOOLS_AVAILABLE = True
except ImportError as e:
    TOOLS_AVAILABLE = False
    print(f"Paquetes no instalados: {e}")
    print("Ejecuta: pip install neuralfoil aerosandbox")


# ============================================================================
# REQUISITOS DE MISION
# ============================================================================

MISSION = {
    "name": "UAV Vigilancia Agricola",
    "payload_kg": 0.5,  # Camera + gimbal
    "endurance_min": 45,  # minutos de vuelo
    "cruise_speed_ms": 20,  # m/s
    "altitude_m": 200,  # metros
    "max_wind_ms": 8,  # viento maximo operativo
}


# ============================================================================
# FUNCIONES DE ANALISIS
# ============================================================================


def get_aero(airfoil_name: str, alpha: float, Re: float) -> dict:
    """Obtiene coeficientes aerodinamicos."""
    airfoil = asb.Airfoil(airfoil_name)
    aero = nf.get_aero_from_airfoil(airfoil=airfoil, alpha=alpha, Re=Re)
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


def analyze_airfoil_for_mission(
    airfoil_name: str, cruise_speed: float, chord: float
) -> dict:
    """
    Analiza un perfil para las condiciones de mision.
    """
    # Reynolds en crucero
    rho = 1.225  # kg/m3
    mu = 1.789e-5  # viscosidad dinamica
    Re = rho * cruise_speed * chord / mu

    # Analizar en rango de alpha
    alphas = np.linspace(-2, 12, 15)
    results = {"alpha": alphas, "CL": [], "CD": [], "L_D": []}

    for alpha in alphas:
        aero = get_aero(airfoil_name, alpha, Re)
        results["CL"].append(aero["CL"])
        results["CD"].append(aero["CD"])
        results["L_D"].append(aero["CL"] / aero["CD"] if aero["CD"] > 0 else 0)

    for key in ["CL", "CD", "L_D"]:
        results[key] = np.array(results[key])

    # Encontrar valores clave
    ld_max_idx = np.argmax(results["L_D"])
    cl_max_idx = np.argmax(results["CL"])

    return {
        "airfoil": airfoil_name,
        "Re": Re,
        "CL_max": results["CL"][cl_max_idx],
        "alpha_CL_max": results["alpha"][cl_max_idx],
        "L_D_max": results["L_D"][ld_max_idx],
        "alpha_L_D_max": results["alpha"][ld_max_idx],
        "CL_at_L_D_max": results["CL"][ld_max_idx],
        "results": results,
    }


def size_wing(mtow_kg: float, cruise_speed: float, cl_cruise: float) -> dict:
    """
    Dimensiona el ala para las condiciones dadas.
    """
    rho = 1.225
    W = mtow_kg * 9.81  # Peso en N

    # Superficie alar necesaria: L = W = 0.5 * rho * V^2 * S * CL
    q = 0.5 * rho * cruise_speed**2  # Presion dinamica
    S = W / (q * cl_cruise)

    # Seleccionar aspect ratio (tipico para UAV: 8-12)
    AR = 10

    # Calcular envergadura y cuerda
    b = np.sqrt(AR * S)  # Envergadura
    c = S / b  # Cuerda media (ala rectangular)

    # Carga alar
    wing_loading = mtow_kg / S

    return {
        "S": S,
        "b": b,
        "c": c,
        "AR": AR,
        "wing_loading_kg_m2": wing_loading,
    }


def estimate_weight_breakdown(payload_kg: float, endurance_min: float) -> dict:
    """
    Estima desglose de peso usando fracciones tipicas.
    """
    # Fracciones tipicas para UAV electrico
    f_payload = 0.15  # payload / MTOW
    f_battery = 0.35  # bateria / MTOW
    f_structure = 0.35  # estructura / MTOW
    f_systems = 0.15  # sistemas / MTOW

    # Calcular MTOW desde payload
    mtow = payload_kg / f_payload

    return {
        "MTOW_kg": mtow,
        "payload_kg": payload_kg,
        "battery_kg": mtow * f_battery,
        "structure_kg": mtow * f_structure,
        "systems_kg": mtow * f_systems,
    }


def calculate_performance(
    wing: dict, weights: dict, airfoil_data: dict, cruise_speed: float
) -> dict:
    """
    Calcula performance del UAV.
    """
    rho = 1.225
    g = 9.81
    W = weights["MTOW_kg"] * g

    # Velocidad de stall
    CL_max = airfoil_data["CL_max"]
    V_stall = np.sqrt(2 * W / (rho * wing["S"] * CL_max))

    # Margen sobre stall
    stall_margin = (cruise_speed / V_stall - 1) * 100

    # Potencia requerida en crucero
    L_D = airfoil_data["L_D_max"]
    D = W / L_D  # Arrastre en crucero
    P_required = D * cruise_speed  # Watts

    # Autonomia (asumiendo bateria LiPo, 180 Wh/kg, 80% usable)
    battery_energy_Wh = weights["battery_kg"] * 180 * 0.8
    endurance_hours = battery_energy_Wh / P_required
    endurance_min = endurance_hours * 60

    # Alcance
    range_km = cruise_speed * endurance_hours * 3.6

    return {
        "V_stall_ms": V_stall,
        "stall_margin_pct": stall_margin,
        "P_required_W": P_required,
        "L_D_cruise": L_D,
        "endurance_min": endurance_min,
        "range_km": range_km,
    }


def create_uav_model(wing: dict, airfoil_name: str) -> asb.Airplane:
    """
    Crea modelo 3D del UAV en AeroSandbox.
    """
    # Ala principal
    main_wing = asb.Wing(
        name="Main Wing",
        symmetric=True,
        xsecs=[
            asb.WingXSec(
                xyz_le=[0.3, 0, 0],
                chord=wing["c"],
                twist=2,
                airfoil=asb.Airfoil(airfoil_name),
            ),
            asb.WingXSec(
                xyz_le=[0.35, wing["b"] / 2, 0.05],
                chord=wing["c"] * 0.7,
                twist=0,
                airfoil=asb.Airfoil(airfoil_name),
            ),
        ],
    )

    # Empenaje horizontal (coef volumen ~0.5)
    l_h = 0.8  # brazo de palanca
    S_h = 0.5 * wing["S"] * wing["c"] / l_h
    c_h = np.sqrt(S_h / 4)  # AR=4 para cola

    h_tail = asb.Wing(
        name="Horizontal Tail",
        symmetric=True,
        xsecs=[
            asb.WingXSec(
                xyz_le=[1.1, 0, 0.05],
                chord=c_h,
                airfoil=asb.Airfoil("naca0012"),
            ),
            asb.WingXSec(
                xyz_le=[1.15, 0.3, 0.05],
                chord=c_h * 0.6,
                airfoil=asb.Airfoil("naca0012"),
            ),
        ],
    )

    # Empenaje vertical
    v_tail = asb.Wing(
        name="Vertical Tail",
        symmetric=False,
        xsecs=[
            asb.WingXSec(
                xyz_le=[1.0, 0, 0.05],
                chord=0.15,
                airfoil=asb.Airfoil("naca0012"),
            ),
            asb.WingXSec(
                xyz_le=[1.1, 0, 0.25],
                chord=0.08,
                airfoil=asb.Airfoil("naca0012"),
            ),
        ],
    )

    # Fuselaje
    fuselage = asb.Fuselage(
        name="Fuselage",
        xsecs=[
            asb.FuselageXSec(xyz_c=[0, 0, 0], radius=0.03),
            asb.FuselageXSec(xyz_c=[0.15, 0, 0], radius=0.06),
            asb.FuselageXSec(xyz_c=[0.5, 0, 0], radius=0.07),
            asb.FuselageXSec(xyz_c=[1.0, 0, 0.03], radius=0.04),
            asb.FuselageXSec(xyz_c=[1.3, 0, 0.05], radius=0.02),
        ],
    )

    return asb.Airplane(
        name=MISSION["name"],
        wings=[main_wing, h_tail, v_tail],
        fuselages=[fuselage],
    )


# ============================================================================
# MAIN
# ============================================================================


def main():
    if not TOOLS_AVAILABLE:
        print("ERROR: Herramientas no disponibles")
        return

    print("\n" + "=" * 70)
    print("  PROYECTO INTEGRADO: DISENO DE UAV CON IA")
    print("  " + MISSION["name"])
    print("=" * 70)

    # 1. REQUISITOS
    print("\n--- 1. REQUISITOS DE MISION ---")
    for key, val in MISSION.items():
        print(f"  {key}: {val}")

    # 2. ESTIMACION DE PESO
    print("\n--- 2. ESTIMACION DE PESO ---")
    weights = estimate_weight_breakdown(MISSION["payload_kg"], MISSION["endurance_min"])
    print(f"  MTOW: {weights['MTOW_kg']:.2f} kg")
    print(f"  Payload: {weights['payload_kg']:.2f} kg")
    print(f"  Bateria: {weights['battery_kg']:.2f} kg")
    print(f"  Estructura: {weights['structure_kg']:.2f} kg")
    print(f"  Sistemas: {weights['systems_kg']:.2f} kg")

    # 3. SELECCION DE PERFIL
    print("\n--- 3. ANALISIS DE PERFILES ---")
    candidates = ["naca2412", "naca4412", "naca23012", "naca4415"]

    # Cuerda aproximada para Reynolds
    chord_approx = 0.25  # metros

    print(f"\n{'Perfil':>12} | {'CL_max':>8} | {'L/D_max':>8} | {'alpha_opt':>10}")
    print("-" * 50)

    best_airfoil = None
    best_ld = 0

    for airfoil in candidates:
        data = analyze_airfoil_for_mission(
            airfoil, MISSION["cruise_speed_ms"], chord_approx
        )
        print(
            f"{airfoil:>12} | {data['CL_max']:8.3f} | {data['L_D_max']:8.1f} | {data['alpha_L_D_max']:10.1f}"
        )

        if data["L_D_max"] > best_ld:
            best_ld = data["L_D_max"]
            best_airfoil = data

    print(f"\n  Perfil seleccionado: {best_airfoil['airfoil'].upper()}")
    print(f"  Razon: Mayor L/D = {best_ld:.1f}")

    # 4. DIMENSIONAMIENTO DE ALA
    print("\n--- 4. DIMENSIONAMIENTO DE ALA ---")
    cl_cruise = best_airfoil["CL_at_L_D_max"]
    wing = size_wing(weights["MTOW_kg"], MISSION["cruise_speed_ms"], cl_cruise)

    print(f"  Superficie alar: {wing['S']:.3f} m2")
    print(f"  Envergadura: {wing['b']:.2f} m")
    print(f"  Cuerda media: {wing['c']:.3f} m")
    print(f"  Aspect Ratio: {wing['AR']:.1f}")
    print(f"  Carga alar: {wing['wing_loading_kg_m2']:.1f} kg/m2")

    # 5. PERFORMANCE
    print("\n--- 5. ANALISIS DE PERFORMANCE ---")
    perf = calculate_performance(
        wing, weights, best_airfoil, MISSION["cruise_speed_ms"]
    )

    print(f"  Velocidad de stall: {perf['V_stall_ms']:.1f} m/s")
    print(f"  Margen sobre stall: {perf['stall_margin_pct']:.1f}%")
    print(f"  Potencia requerida: {perf['P_required_W']:.1f} W")
    print(f"  L/D en crucero: {perf['L_D_cruise']:.1f}")
    print(f"  Autonomia estimada: {perf['endurance_min']:.0f} min")
    print(f"  Alcance estimado: {perf['range_km']:.1f} km")

    # Verificar requisitos
    print("\n--- 6. VERIFICACION DE REQUISITOS ---")
    req_endurance = MISSION["endurance_min"]

    if perf["endurance_min"] >= req_endurance:
        print(
            f"  [OK] Autonomia: {perf['endurance_min']:.0f} min >= {req_endurance} min"
        )
    else:
        print(
            f"  [FALLO] Autonomia: {perf['endurance_min']:.0f} min < {req_endurance} min"
        )

    if perf["stall_margin_pct"] >= 30:
        print(f"  [OK] Margen de stall: {perf['stall_margin_pct']:.0f}% >= 30%")
    else:
        print(f"  [WARNING] Margen de stall bajo: {perf['stall_margin_pct']:.0f}%")

    # 7. CREAR MODELO 3D
    print("\n--- 7. MODELO 3D ---")
    uav = create_uav_model(wing, best_airfoil["airfoil"])
    print(f"  Modelo creado: {uav.name}")
    print(f"  Superficies: {len(uav.wings)}")
    print("  (Vista 3D disponible con: uav.draw())")

    # 8. GENERAR REPORTE
    print("\n" + "=" * 70)
    print("  RESUMEN DE DISENO")
    print("=" * 70)
    print(f"""
    AERONAVE: {MISSION["name"]}
    
    GEOMETRIA:
      - Perfil: {best_airfoil["airfoil"].upper()}
      - Envergadura: {wing["b"]:.2f} m
      - Superficie alar: {wing["S"]:.3f} m2
      - Aspect Ratio: {wing["AR"]:.1f}
    
    PESOS:
      - MTOW: {weights["MTOW_kg"]:.2f} kg
      - Carga util: {weights["payload_kg"]:.2f} kg
    
    PERFORMANCE:
      - Velocidad crucero: {MISSION["cruise_speed_ms"]} m/s
      - Velocidad stall: {perf["V_stall_ms"]:.1f} m/s
      - L/D crucero: {perf["L_D_cruise"]:.1f}
      - Autonomia: {perf["endurance_min"]:.0f} min
      - Alcance: {perf["range_km"]:.1f} km
    """)

    # Grafico de polar
    fig, ax = plt.subplots(figsize=(8, 6))
    results = best_airfoil["results"]
    ax.plot(results["alpha"], results["L_D"], "b-", linewidth=2)
    ax.axvline(
        x=best_airfoil["alpha_L_D_max"],
        color="r",
        linestyle="--",
        label=f"alpha optimo = {best_airfoil['alpha_L_D_max']:.1f} deg",
    )
    ax.set_xlabel("Angulo de Ataque (deg)")
    ax.set_ylabel("L/D")
    ax.set_title(f"Eficiencia Aerodinamica - {best_airfoil['airfoil'].upper()}")
    ax.legend()
    ax.grid(True, alpha=0.3)
    plt.savefig("uav_design_polar.png", dpi=150, bbox_inches="tight")
    print("Grafico guardado: uav_design_polar.png")

    print("\n" + "=" * 70)
    print("  PROYECTO COMPLETADO!")
    print("=" * 70)


if __name__ == "__main__":
    main()
