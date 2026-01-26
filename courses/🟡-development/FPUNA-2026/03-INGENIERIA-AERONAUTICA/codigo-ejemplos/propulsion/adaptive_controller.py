"""
Adaptive Controller - Control Automático Adaptativo con PID + IA
==================================================================

Módulo 04 - Sistemas de Propulsión - Parte 5: Automatización

Descripción:
-----------
Sistema de control que ajusta throttle automáticamente para mantener
velocidad constante a pesar de perturbaciones (viento, ráfagas).
Combina PID clásico con ML para compensación predictiva.

Funcionalidades:
---------------
1. PID controller con auto-tuning (Ziegler-Nichols)
2. Modelo ML para compensación de viento (Random Forest)
3. Anti-windup para integral
4. Límites de seguridad (max throttle)
5. Logging para análisis post-vuelo

Autor: FPUNA 2026 - Ingeniería Aeronáutica
Fecha: Enero 2026
Licencia: MIT
"""

from __future__ import annotations

import logging
import pickle
from typing import Optional

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

logger = logging.getLogger(__name__)


class AdaptiveThrottleController:
    """
    Controlador PID adaptativo con compensación de viento por IA.

    Mantiene velocidad objetivo ajustando throttle automáticamente
    considerando perturbaciones ambientales.
    """

    def __init__(self, target_speed: float = 15.0, auto_tune: bool = True) -> None:
        """
        Inicializa controlador con parámetros por defecto.

        Parameters:
        -----------
        target_speed : float
            Velocidad objetivo en m/s (default: 15 m/s = 54 km/h)
        auto_tune : bool
            Si True, usa auto-tuning Ziegler-Nichols
        """
        self.target_speed = target_speed

        # Ganancias PID (valores iniciales conservadores)
        if auto_tune:
            self.Kp, self.Ki, self.Kd = self._ziegler_nichols_tuning()
        else:
            self.Kp = 0.5  # Proporcional (respuesta inmediata)
            self.Ki = 0.1  # Integral (corregir offset acumulado)
            self.Kd = 0.2  # Derivativo (suavizar oscilaciones)

        # Estado del controlador
        self.integral = 0.0
        self.prev_error = 0.0
        self.prev_time = None

        # Límites de seguridad
        self.throttle_min = 0.0  # 0%
        self.throttle_max = 90.0  # 90% (nunca 100% para margen)
        self.integral_max = 50.0  # Anti-windup

        # Modelo ML para compensación de viento
        self.wind_model = None
        self.wind_model_trained = False

        # Histórico para análisis
        self.history = []

        print(f"✅ Controlador inicializado:")
        print(f"   Target: {target_speed:.1f} m/s")
        print(f"   PID gains: Kp={self.Kp:.3f}, Ki={self.Ki:.3f}, Kd={self.Kd:.3f}")

    def _ziegler_nichols_tuning(self) -> tuple[float, float, float]:
        """
        Auto-tuning usando método Ziegler-Nichols.

        Returns:
        --------
        Kp, Ki, Kd : tuple
            Ganancias calculadas

        Notes:
        ------
        Para UAV típico:
        - Ku (ultimate gain) ≈ 1.2
        - Tu (ultimate period) ≈ 2.0 seg
        """
        # Valores típicos para UAV de 3-5 kg
        Ku = 1.2  # Ganancia crítica (cuando sistema oscila)
        Tu = 2.0  # Período de oscilación crítico

        # Reglas de Ziegler-Nichols para PID
        Kp = 0.6 * Ku
        Ki = 2 * Kp / Tu
        Kd = Kp * Tu / 8

        return Kp, Ki, Kd

    def update(
        self, current_speed: float, wind_speed: float = 0.0, dt: float = 0.1
    ) -> float:
        """
        Calcula throttle óptimo basado en estado actual.

        Parameters:
        -----------
        current_speed : float
            Velocidad actual del UAV (m/s)
        wind_speed : float
            Velocidad del viento de frente (m/s, positivo = frente)
        dt : float
            Delta de tiempo desde última actualización (seg)

        Returns:
        --------
        throttle : float
            Comando de throttle (0-100%)

        Example:
        --------
        >>> controller = AdaptiveThrottleController(target_speed=15.0)
        >>> throttle = controller.update(current_speed=13.5, wind_speed=3.2)
        >>> print(f"Throttle: {throttle:.1f}%")
        """
        # Calcular error
        error = self.target_speed - current_speed

        # Término Proporcional (respuesta inmediata al error)
        P = self.Kp * error

        # Término Integral (corregir error acumulado)
        self.integral += error * dt

        # Anti-windup (limitar integral para evitar saturación)
        self.integral = np.clip(self.integral, -self.integral_max, self.integral_max)

        I = self.Ki * self.integral

        # Término Derivativo (suavizar cambios bruscos)
        if self.prev_error is not None:
            derivative = (error - self.prev_error) / dt
        else:
            derivative = 0.0

        D = self.Kd * derivative

        # PID clásico
        throttle_pid = P + I + D

        # Compensación de viento con IA (si modelo entrenado)
        if self.wind_model_trained and wind_speed != 0.0:
            wind_compensation = self._predict_wind_compensation(
                wind_speed, current_speed, error
            )
        else:
            # Compensación heurística simple
            wind_compensation = wind_speed * 1.5  # ~1.5% throttle por m/s de viento

        # Throttle final
        throttle = throttle_pid + wind_compensation

        # Aplicar límites de seguridad
        throttle = np.clip(throttle, self.throttle_min, self.throttle_max)

        # Guardar estado
        self.prev_error = error

        # Logging
        self.history.append(
            {
                "time": len(self.history) * dt,
                "target_speed": self.target_speed,
                "current_speed": current_speed,
                "error": error,
                "P": P,
                "I": I,
                "D": D,
                "wind_speed": wind_speed,
                "wind_compensation": wind_compensation,
                "throttle": throttle,
            }
        )

        return throttle

    def _predict_wind_compensation(
        self, wind_speed: float, current_speed: float, error: float
    ) -> float:
        """
        Usa modelo ML para predecir compensación óptima de viento.

        Parameters:
        -----------
        wind_speed : float
        current_speed : float
        error : float

        Returns:
        --------
        compensation : float
            Ajuste de throttle (%)
        """
        if self.wind_model is None:
            return 0.0

        # Preparar features
        features = np.array([[wind_speed, current_speed, error, self.integral]])

        # Predecir compensación
        compensation = self.wind_model.predict(features)[0]

        return compensation

    def train_wind_model(self, training_data: pd.DataFrame) -> float:
        """
        Entrena modelo ML con datos históricos de vuelos.

        Parameters:
        -----------
        training_data : pd.DataFrame
            Debe incluir columnas: wind_speed, current_speed, error,
            integral, optimal_throttle_adjustment

        Returns:
        --------
        score : float
            R² score del modelo
        """
        print("🔄 Entrenando modelo de compensación de viento...")

        # Preparar datos
        X = training_data[["wind_speed", "current_speed", "error", "integral"]]
        y = training_data["optimal_throttle_adjustment"]

        # Split train/test
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        # Entrenar Random Forest
        self.wind_model = RandomForestRegressor(
            n_estimators=100, max_depth=10, random_state=42, n_jobs=-1
        )

        self.wind_model.fit(X_train, y_train)

        # Evaluar
        score = self.wind_model.score(X_test, y_test)

        self.wind_model_trained = True

        print(f"✅ Modelo entrenado: R² = {score:.3f}")
        print(f"   Feature importances:")
        for feature, importance in zip(X.columns, self.wind_model.feature_importances_):
            print(f"   - {feature}: {importance:.3f}")

        return score

    def save_model(self, filepath: str = "wind_model.pkl") -> None:
        """Guarda modelo entrenado a disco."""
        if self.wind_model is None:
            logger.warning("No hay modelo para guardar")
            return

        try:
            with open(filepath, "wb") as f:
                pickle.dump(self.wind_model, f)
            logger.info(f"Modelo guardado: {filepath}")
        except IOError as e:
            logger.error(f"Error guardando modelo: {e}")

    def load_model(self, filepath: str = "wind_model.pkl") -> None:
        """Carga modelo previamente entrenado."""
        try:
            with open(filepath, "rb") as f:
                self.wind_model = pickle.load(f)
            self.wind_model_trained = True
            logger.info(f"Modelo cargado: {filepath}")
        except FileNotFoundError:
            logger.error(f"Archivo no encontrado: {filepath}")
        except Exception as e:
            logger.error(f"Error cargando modelo: {e}")

    def reset(self) -> None:
        """Resetea estado del controlador (útil para nuevo vuelo)."""
        self.integral = 0.0
        self.prev_error = 0.0
        self.history = []
        logger.info("Controlador reseteado")

    def set_target_speed(self, new_target: float) -> None:
        """Cambia velocidad objetivo en vuelo."""
        self.target_speed = new_target
        logger.info(f"Nueva velocidad objetivo: {new_target:.1f} m/s")

    def get_performance_metrics(self) -> dict:
        """
        Calcula métricas de performance del controlador.

        Returns:
        --------
        metrics : dict
            Diccionario con métricas clave
        """
        if len(self.history) == 0:
            return {}

        df = pd.DataFrame(self.history)

        # Métricas
        metrics = {
            "mean_error": df["error"].abs().mean(),
            "max_error": df["error"].abs().max(),
            "std_error": df["error"].std(),
            "mean_throttle": df["throttle"].mean(),
            "throttle_range": df["throttle"].max() - df["throttle"].min(),
            "settling_time": self._calculate_settling_time(df),
            "overshoot": self._calculate_overshoot(df),
        }

        return metrics

    def _calculate_settling_time(
        self, df: pd.DataFrame, tolerance: float = 0.5
    ) -> Optional[float]:
        """
        Calcula tiempo de establecimiento (settling time).
        Tiempo hasta que error permanece < tolerance.
        """
        settled_idx = None

        for i in range(len(df)):
            if abs(df.iloc[i]["error"]) < tolerance:
                # Verificar que se mantenga estable 5 segundos
                if i + 50 < len(df):
                    if all(abs(df.iloc[i : i + 50]["error"]) < tolerance):
                        settled_idx = i
                        break

        if settled_idx:
            return df.iloc[settled_idx]["time"]
        else:
            return None

    def _calculate_overshoot(self, df: pd.DataFrame) -> float:
        """Calcula overshoot máximo (% sobre target)."""
        overshoot = (df["current_speed"] - self.target_speed).max()
        overshoot_pct = (overshoot / self.target_speed) * 100
        return max(0, overshoot_pct)


# =============================================================================
# FUNCIONES AUXILIARES
# =============================================================================


def simulate_flight_with_wind(
    duration: int = 600, target_speed: float = 15.0, wind_profile: str = "variable"
) -> pd.DataFrame:
    """
    Simula vuelo con diferentes perfiles de viento.

    Parameters:
    -----------
    duration : int
        Duración en segundos
    target_speed : float
        Velocidad objetivo (m/s)
    wind_profile : str
        'constant', 'gusty', 'variable'

    Returns:
    --------
    simulation_data : pd.DataFrame
        Datos de simulación
    """
    np.random.seed(42)
    time = np.arange(0, duration, 0.1)  # 10 Hz

    # Generar perfil de viento
    if wind_profile == "constant":
        wind = np.ones_like(time) * 3.0
    elif wind_profile == "gusty":
        wind = 3.0 + np.random.normal(0, 1.5, len(time))
        wind = np.clip(wind, 0, 8)
    else:  # variable
        # Viento variable con tendencia
        wind = 2.0 + 3.0 * np.sin(time / 100) + np.random.normal(0, 0.5, len(time))
        wind = np.clip(wind, 0, 6)

    data = {"time": time, "wind_speed": wind, "target_speed": target_speed}

    return pd.DataFrame(data)


def compare_controllers(duration: int = 600, target_speed: float = 15.0) -> dict:
    """
    Compara performance: Sin control vs PID básico vs PID+IA.

    Returns:
    --------
    comparison : dict
        Resultados de cada controlador
    """
    print("=" * 60)
    print("COMPARACIÓN DE CONTROLADORES")
    print("=" * 60)

    # Simular condiciones
    sim_data = simulate_flight_with_wind(duration, target_speed, "variable")

    results = {}

    # 1. Sin control (throttle manual fijo)
    print("\n1️⃣ Sin Control (Throttle manual 50%)...")
    speed_no_control = simulate_no_control(sim_data, throttle=50.0)
    results["no_control"] = {
        "mean_error": abs(speed_no_control - target_speed).mean(),
        "max_error": abs(speed_no_control - target_speed).max(),
        "std_speed": speed_no_control.std(),
    }

    # 2. PID clásico
    print("\n2️⃣ PID Clásico...")
    controller_pid = AdaptiveThrottleController(target_speed, auto_tune=True)
    speed_pid = simulate_with_controller(sim_data, controller_pid, use_ml=False)
    results["pid_classic"] = controller_pid.get_performance_metrics()

    # 3. PID + IA
    print("\n3️⃣ PID + IA (con modelo de viento)...")

    # Primero entrenar modelo
    training_data = generate_training_data()

    controller_ai = AdaptiveThrottleController(target_speed, auto_tune=True)
    controller_ai.train_wind_model(training_data)

    speed_ai = simulate_with_controller(sim_data, controller_ai, use_ml=True)
    results["pid_ai"] = controller_ai.get_performance_metrics()

    # Imprimir comparación
    print("\n" + "=" * 60)
    print("RESULTADOS:")
    print("=" * 60)
    print(f"\n{'Métrica':<25} {'Sin Control':>12} {'PID':>12} {'PID+IA':>12}")
    print("-" * 60)
    print(
        f"{'Error promedio (m/s)':<25} "
        f"{results['no_control']['mean_error']:>12.2f} "
        f"{results['pid_classic']['mean_error']:>12.2f} "
        f"{results['pid_ai']['mean_error']:>12.2f}"
    )
    print(
        f"{'Error máximo (m/s)':<25} "
        f"{results['no_control']['max_error']:>12.2f} "
        f"{results['pid_classic']['max_error']:>12.2f} "
        f"{results['pid_ai']['max_error']:>12.2f}"
    )
    print(
        f"{'Overshoot (%)':<25} "
        f"{'N/A':>12} "
        f"{results['pid_classic']['overshoot']:>12.1f} "
        f"{results['pid_ai']['overshoot']:>12.1f}"
    )
    print(
        f"{'Throttle promedio (%)':<25} "
        f"{'50.0':>12} "
        f"{results['pid_classic']['mean_throttle']:>12.1f} "
        f"{results['pid_ai']['mean_throttle']:>12.1f}"
    )

    print("\n" + "=" * 60)
    print("CONCLUSIÓN:")
    improvement_pid = (
        (results["no_control"]["mean_error"] - results["pid_classic"]["mean_error"])
        / results["no_control"]["mean_error"]
        * 100
    )
    improvement_ai = (
        (results["no_control"]["mean_error"] - results["pid_ai"]["mean_error"])
        / results["no_control"]["mean_error"]
        * 100
    )

    print(f"PID clásico mejora {improvement_pid:.1f}% vs sin control")
    print(f"PID+IA mejora {improvement_ai:.1f}% vs sin control")
    print(f"PID+IA es {improvement_ai - improvement_pid:.1f}% mejor que PID solo")
    print("=" * 60)

    return results


def simulate_no_control(sim_data: pd.DataFrame, throttle: float = 50.0) -> pd.Series:
    """Simula vuelo sin control (throttle fijo)."""
    # Modelo simplificado: velocidad depende de throttle y viento
    base_speed = throttle / 5.0  # 50% throttle → ~10 m/s sin viento
    speed = base_speed - sim_data["wind_speed"] * 0.6  # Viento reduce velocidad

    return speed


def simulate_with_controller(
    sim_data: pd.DataFrame, controller: AdaptiveThrottleController, use_ml: bool = False
) -> pd.Series:
    """Simula vuelo con controlador."""
    speeds = []
    current_speed = 10.0  # Velocidad inicial

    for _, row in sim_data.iterrows():
        # Actualizar controlador
        if use_ml:
            throttle = controller.update(
                current_speed, wind_speed=row["wind_speed"], dt=0.1
            )
        else:
            throttle = controller.update(current_speed, wind_speed=0.0, dt=0.1)

        # Modelo físico simplificado
        # Velocidad responde a throttle con dinámica de primer orden
        target_from_throttle = throttle / 5.0 - row["wind_speed"] * 0.6

        # Dinámica de respuesta (tau = 2 seg)
        tau = 2.0
        current_speed += (target_from_throttle - current_speed) * 0.1 / tau

        speeds.append(current_speed)

    return pd.Series(speeds)


def generate_training_data(n_samples: int = 1000) -> pd.DataFrame:
    """
    Genera datos sintéticos para entrenar modelo de viento.

    En práctica real, estos datos vendrían de vuelos históricos.
    """
    np.random.seed(42)

    data = {
        "wind_speed": np.random.uniform(0, 6, n_samples),
        "current_speed": np.random.uniform(10, 20, n_samples),
        "error": np.random.uniform(-5, 5, n_samples),
        "integral": np.random.uniform(-20, 20, n_samples),
    }

    # Target: compensación óptima (función conocida para sintético)
    data["optimal_throttle_adjustment"] = (
        data["wind_speed"] * 1.5  # Base
        + data["error"] * 0.3  # Corrección proporcional
        + np.random.normal(0, 0.5, n_samples)  # Ruido
    )

    return pd.DataFrame(data)


# =============================================================================
# DEMOSTRACIÓN
# =============================================================================

if __name__ == "__main__":
    print("=" * 60)
    print("ADAPTIVE THROTTLE CONTROLLER - Demostración")
    print("=" * 60)

    # Comparar controladores
    results = compare_controllers(duration=300, target_speed=15.0)

    print("\n✅ Demostración completada")
    print("\nPRÓXIMOS PASOS:")
    print("1. Integrar con telemetry_monitor.py")
    print("2. Conectar a MAVLink real (Pixhawk)")
    print("3. Calibrar ganancias PID en vuelo real")
    print("4. Entrenar modelo ML con datos reales de vuelo")
    print("5. Implementar en autopilot stack (PX4/ArduPilot)")
