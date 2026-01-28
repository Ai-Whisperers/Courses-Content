"""
Demo 03: Optimizacion Genetica de Perfiles Aerodinamicos
========================================================

Usa algoritmos geneticos (DEAP) para encontrar el perfil NACA
optimo para una mision especifica.

Ejecutar: python 03_genetic_optimization_demo.py

Requiere: pip install deap neuralfoil aerosandbox numpy matplotlib
"""

import numpy as np
import matplotlib.pyplot as plt
import random

# Verificar disponibilidad de paquetes
try:
    from deap import base, creator, tools, algorithms

    DEAP_AVAILABLE = True
except ImportError:
    DEAP_AVAILABLE = False
    print("DEAP no instalado. Ejecuta: pip install deap")

try:
    import neuralfoil as nf
    import aerosandbox as asb

    NEURALFOIL_AVAILABLE = True
except ImportError:
    NEURALFOIL_AVAILABLE = False
    print(
        "NeuralFoil o AeroSandbox no instalados. Ejecuta: pip install neuralfoil aerosandbox"
    )


# Parametros de optimizacion
REYNOLDS = 500000
ALPHA_DESIGN = 5.0  # Angulo de ataque de diseno
OBJECTIVE = "L_D"  # "L_D", "CL", "CL_CD_ratio"


def get_aero(airfoil_name: str, alpha: float, Re: float) -> dict:
    """
    Obtiene coeficientes aerodinamicos usando NeuralFoil.

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


def naca_code_to_string(digits: list) -> str:
    """
    Convierte lista de digitos a codigo NACA.

    Args:
        digits: [m, p, t] donde t es de 2 digitos

    Returns:
        str: Codigo NACA (ej: "naca2412")
    """
    m, p, t = digits
    return f"naca{m}{p}{t:02d}"


def evaluate_airfoil(individual: list) -> tuple:
    """
    Funcion de evaluacion para el algoritmo genetico.

    Args:
        individual: [m, p, t] parametros NACA de 4 digitos

    Returns:
        tuple: (fitness_value,)
    """
    m, p, t = individual

    # Validar parametros
    if m < 0 or m > 9:
        return (-1000.0,)
    if p < 0 or p > 9:
        return (-1000.0,)
    if t < 6 or t > 24:
        return (-1000.0,)

    # Caso especial: si p=0, m debe ser 0 (simetrico)
    if p == 0 and m != 0:
        return (-1000.0,)

    airfoil_name = naca_code_to_string([m, p, t])

    if NEURALFOIL_AVAILABLE:
        try:
            aero = get_aero(airfoil_name, alpha=ALPHA_DESIGN, Re=REYNOLDS)
            CL = aero["CL"]
            CD = aero["CD"]

            # Evitar division por cero
            if CD <= 0.0001:
                return (-1000.0,)

            L_D = CL / CD

            # Seleccionar objetivo
            if OBJECTIVE == "L_D":
                fitness = L_D
            elif OBJECTIVE == "CL":
                fitness = CL
            else:  # CL/CD ratio ponderado
                fitness = L_D - abs(CL - 1.0) * 5  # Penalizar lejos de CL=1

            return (fitness,)
        except Exception:
            return (-1000.0,)
    else:
        # Modelo simplificado si NeuralFoil no esta disponible
        L_D_approx = 10 + m * 0.8 - abs(p - 4) * 0.5 - (t - 12) ** 2 * 0.02
        return (L_D_approx,)


def setup_genetic_algorithm():
    """
    Configura el algoritmo genetico con DEAP.

    Returns:
        toolbox: Objeto toolbox de DEAP configurado
    """
    if not DEAP_AVAILABLE:
        return None

    # Crear tipos de fitness e individuo
    # (Evitar recrear si ya existen)
    if not hasattr(creator, "FitnessMax"):
        creator.create("FitnessMax", base.Fitness, weights=(1.0,))
    if not hasattr(creator, "Individual"):
        creator.create("Individual", list, fitness=creator.FitnessMax)

    toolbox = base.Toolbox()

    # Generadores de atributos
    toolbox.register("attr_m", random.randint, 0, 6)  # Curvatura maxima
    toolbox.register("attr_p", random.randint, 2, 7)  # Posicion curvatura
    toolbox.register("attr_t", random.randint, 8, 18)  # Espesor

    # Estructura del individuo
    toolbox.register(
        "individual",
        tools.initCycle,
        creator.Individual,
        (toolbox.attr_m, toolbox.attr_p, toolbox.attr_t),
        n=1,
    )

    # Poblacion
    toolbox.register("population", tools.initRepeat, list, toolbox.individual)

    # Operadores geneticos
    toolbox.register("evaluate", evaluate_airfoil)
    toolbox.register("mate", tools.cxTwoPoint)
    toolbox.register(
        "mutate", tools.mutUniformInt, low=[0, 0, 6], up=[9, 9, 24], indpb=0.3
    )
    toolbox.register("select", tools.selTournament, tournsize=3)

    return toolbox


def run_optimization(pop_size: int = 50, n_gen: int = 30, verbose: bool = True):
    """
    Ejecuta la optimizacion genetica.

    Args:
        pop_size: Tamano de poblacion
        n_gen: Numero de generaciones
        verbose: Mostrar progreso

    Returns:
        tuple: (mejor_individuo, historial)
    """
    toolbox = setup_genetic_algorithm()
    if toolbox is None:
        return None, None

    # Crear poblacion inicial
    population = toolbox.population(n=pop_size)

    # Estadisticas
    stats = tools.Statistics(lambda ind: ind.fitness.values)
    stats.register("avg", np.mean)
    stats.register("min", np.min)
    stats.register("max", np.max)

    # Historial
    history = {
        "gen": [],
        "best_fitness": [],
        "avg_fitness": [],
        "best_individual": [],
    }

    # Evaluar poblacion inicial
    fitnesses = list(map(toolbox.evaluate, population))
    for ind, fit in zip(population, fitnesses):
        ind.fitness.values = fit

    if verbose:
        print(f"\n{'Gen':>4} | {'Mejor':>10} | {'Promedio':>10} | {'Perfil':>12}")
        print("-" * 50)

    # Evolucion
    for gen in range(n_gen):
        # Seleccion
        offspring = toolbox.select(population, len(population))
        offspring = list(map(toolbox.clone, offspring))

        # Cruzamiento
        for child1, child2 in zip(offspring[::2], offspring[1::2]):
            if random.random() < 0.7:  # Probabilidad de cruce
                toolbox.mate(child1, child2)
                del child1.fitness.values
                del child2.fitness.values

        # Mutacion
        for mutant in offspring:
            if random.random() < 0.2:  # Probabilidad de mutacion
                toolbox.mutate(mutant)
                del mutant.fitness.values

        # Evaluar individuos sin fitness
        invalid_ind = [ind for ind in offspring if not ind.fitness.valid]
        fitnesses = map(toolbox.evaluate, invalid_ind)
        for ind, fit in zip(invalid_ind, fitnesses):
            ind.fitness.values = fit

        # Reemplazar poblacion
        population[:] = offspring

        # Obtener estadisticas
        fits = [ind.fitness.values[0] for ind in population]
        best_idx = np.argmax(fits)
        best_ind = population[best_idx]

        history["gen"].append(gen)
        history["best_fitness"].append(max(fits))
        history["avg_fitness"].append(np.mean(fits))
        history["best_individual"].append(list(best_ind))

        if verbose:
            best_code = naca_code_to_string(best_ind)
            print(
                f"{gen + 1:4d} | {max(fits):10.2f} | {np.mean(fits):10.2f} | {best_code:>12}"
            )

    # Encontrar el mejor individuo final
    fits = [ind.fitness.values[0] for ind in population]
    best_idx = np.argmax(fits)
    best_individual = population[best_idx]

    return best_individual, history


def plot_optimization_history(history: dict):
    """Grafica el historial de optimizacion."""

    fig, axes = plt.subplots(1, 2, figsize=(14, 5))
    fig.suptitle("Optimizacion Genetica de Perfil NACA", fontsize=14, fontweight="bold")

    # Evolucion del fitness
    ax1 = axes[0]
    ax1.plot(history["gen"], history["best_fitness"], "b-", linewidth=2, label="Mejor")
    ax1.plot(
        history["gen"], history["avg_fitness"], "r--", linewidth=1.5, label="Promedio"
    )
    ax1.set_xlabel("Generacion")
    ax1.set_ylabel("Fitness (L/D)")
    ax1.set_title("Evolucion del Fitness")
    ax1.legend()
    ax1.grid(True, alpha=0.3)

    # Evolucion de parametros
    ax2 = axes[1]
    params = np.array(history["best_individual"])
    ax2.plot(history["gen"], params[:, 0], "r-", linewidth=2, label="m (curvatura)")
    ax2.plot(history["gen"], params[:, 1], "g-", linewidth=2, label="p (posicion)")
    ax2.plot(history["gen"], params[:, 2], "b-", linewidth=2, label="t (espesor)")
    ax2.set_xlabel("Generacion")
    ax2.set_ylabel("Valor del Parametro")
    ax2.set_title("Evolucion de Parametros NACA")
    ax2.legend()
    ax2.grid(True, alpha=0.3)

    plt.tight_layout()
    return fig


def main():
    """Ejecuta la demo de optimizacion genetica."""

    print("\n" + "=" * 60)
    print("  DEMO: Optimizacion Genetica de Perfiles NACA")
    print(
        "  Objetivo: Maximizar L/D a Re={:,}, alpha={}deg".format(
            REYNOLDS, ALPHA_DESIGN
        )
    )
    print("=" * 60)

    if not DEAP_AVAILABLE:
        print("\nERROR: DEAP no esta instalado")
        print("Ejecuta: pip install deap")
        return

    if not NEURALFOIL_AVAILABLE:
        print("\nADVERTENCIA: NeuralFoil no disponible, usando modelo simplificado")

    # Ejecutar optimizacion (reducido para demo rapida)
    print("\nIniciando optimizacion...")
    best_individual, history = run_optimization(pop_size=30, n_gen=15, verbose=True)

    if best_individual is None:
        return

    # Resultados
    best_code = naca_code_to_string(best_individual)
    best_fitness = max(history["best_fitness"])

    print("\n" + "=" * 50)
    print("  RESULTADO FINAL")
    print("=" * 50)
    print(f"  Perfil optimo: {best_code.upper()}")
    print(f"  L/D maximo: {best_fitness:.2f}")
    print(
        f"  Parametros: m={best_individual[0]}, p={best_individual[1]}, t={best_individual[2]}"
    )

    # Decodificar parametros NACA
    print(f"\n  Interpretacion del perfil {best_code.upper()}:")
    print(f"    - Curvatura maxima: {best_individual[0]}% de la cuerda")
    print(
        f"    - Posicion de curvatura: {best_individual[1] * 10}% desde el borde de ataque"
    )
    print(f"    - Espesor maximo: {best_individual[2]}% de la cuerda")

    # Si NeuralFoil esta disponible, mostrar mas detalles
    if NEURALFOIL_AVAILABLE:
        aero = get_aero(best_code, alpha=ALPHA_DESIGN, Re=REYNOLDS)
        print(f"\n  Caracteristicas aerodinamicas a alpha={ALPHA_DESIGN}deg:")
        print(f"    - CL = {aero['CL']:.4f}")
        print(f"    - CD = {aero['CD']:.5f}")
        print(f"    - CM = {aero['CM']:.4f}")
        print(f"    - L/D = {aero['CL'] / aero['CD']:.2f}")

    # Graficar historial
    fig = plot_optimization_history(history)
    plt.savefig("genetic_optimization.png", dpi=150, bbox_inches="tight")
    print(f"\nGrafico guardado: genetic_optimization.png")

    # Comparar con perfiles estandar
    print("\n--- Comparacion con Perfiles Estandar ---")
    standard_airfoils = ["naca0012", "naca2412", "naca4412", "naca23012"]

    if NEURALFOIL_AVAILABLE:
        print(f"{'Perfil':>12} | {'CL':>8} | {'CD':>10} | {'L/D':>8}")
        print("-" * 45)

        for airfoil in standard_airfoils + [best_code]:
            try:
                aero = get_aero(airfoil, alpha=ALPHA_DESIGN, Re=REYNOLDS)
                ld = aero["CL"] / aero["CD"]
                marker = " <-- OPTIMO" if airfoil == best_code else ""
                print(
                    f"{airfoil.upper():>12} | {aero['CL']:8.4f} | {aero['CD']:10.5f} | {ld:8.2f}{marker}"
                )
            except Exception as e:
                print(f"{airfoil.upper():>12} | Error: {e}")

    # No bloquear con ventanas interactivas
    # plt.show()

    print("\n" + "=" * 60)
    print("  Demo completada!")
    print("=" * 60)


if __name__ == "__main__":
    main()
