import pandas as pd
import numpy as np
import random


def generate_flight_data(duration_sec=600, sampling_rate_hz=1):
    """
    Generates realistic quadcopter flight telemetry data.
    """
    timestamps = np.arange(0, duration_sec, 1 / sampling_rate_hz)
    n_samples = len(timestamps)

    # --- Flight Profile Phases ---
    # 0: Pre-arm (static)
    # 1: Takeoff (climb)
    # 2: Hover/Maneuver (cruise)
    # 3: Aggressive Maneuver (high current)
    # 4: Return to Home (cruise)
    # 5: Landing (descent)

    altitude = np.zeros(n_samples)
    speed = np.zeros(n_samples)
    current = np.zeros(n_samples)

    # 1. Takeoff (10s - 30s)
    # Climb to 50m
    climb_start = 10
    climb_end = 30
    climb_idx = (timestamps >= climb_start) & (timestamps < climb_end)
    altitude[climb_idx] = np.linspace(0, 50, np.sum(climb_idx))
    speed[climb_idx] = np.random.normal(
        2, 0.5, np.sum(climb_idx)
    )  # Vertical speed mostly
    current[climb_idx] = np.random.normal(
        25, 2, np.sum(climb_idx)
    )  # High current for climb

    # 2. Cruise / Loiter (30s - 300s)
    # Altitude fluctuate around 50m
    cruise_start = 30
    cruise_end = 300
    cruise_idx = (timestamps >= cruise_start) & (timestamps < cruise_end)
    n_cruise = np.sum(cruise_idx)
    altitude[cruise_idx] = 50 + np.cumsum(np.random.normal(0, 0.2, n_cruise))
    speed[cruise_idx] = np.abs(np.random.normal(5, 2, n_cruise))  # Cruising speed
    current[cruise_idx] = np.random.normal(15, 1.5, n_cruise)  # Hover/Cruise current

    # 3. Aggressive Maneuver (300s - 360s) - ANOMALY CANDIDATE
    # High speed, fluctuating altitude, high current
    man_start = 300
    man_end = 360
    man_idx = (timestamps >= man_start) & (timestamps < man_end)
    n_man = np.sum(man_idx)
    altitude[man_idx] = altitude[np.where(cruise_idx)[0][-1]] + np.cumsum(
        np.random.normal(0, 0.5, n_man)
    )
    speed[man_idx] = np.abs(np.random.normal(12, 3, n_man))
    current[man_idx] = np.random.normal(35, 5, n_man)

    # Inject Current Spikes (Anomalies)
    spike_indices = np.random.choice(np.where(man_idx)[0], 3)
    current[spike_indices] += 40  # Huge spikes to 70A+

    # 4. Return to Home (360s - 550s)
    rth_start = 360
    rth_end = 550
    rth_idx = (timestamps >= rth_start) & (timestamps < rth_end)
    n_rth = np.sum(rth_idx)
    altitude[rth_idx] = 50  # Steady return
    speed[rth_idx] = 8  # Steady speed
    current[rth_idx] = np.random.normal(18, 1, n_rth)

    # 5. Landing (550s - 580s)
    land_start = 550
    land_end = 580
    land_idx = (timestamps >= land_start) & (timestamps < land_end)
    n_land = np.sum(land_idx)
    altitude[land_idx] = np.linspace(50, 0, n_land)
    speed[land_idx] = np.random.normal(1, 0.2, n_land)
    current[land_idx] = np.random.normal(12, 1, n_land)  # Low current descent

    # Smooth altitude to look real
    altitude = pd.Series(altitude).rolling(window=5, min_periods=1).mean().values
    altitude = np.maximum(altitude, 0)  # No underground flights

    # --- Battery Simulation ---
    # 3S LiPo: 12.6V -> 10.5V (empty)
    # Voltage sag proportional to current
    capacity_mah = 5000
    used_mah = np.cumsum(current * (1000 / 3600) / sampling_rate_hz)

    base_voltage = np.interp(used_mah, [0, capacity_mah * 0.8], [12.6, 11.1])
    # Add sag: V = V_base - I * R_internal
    r_internal = 0.02  # Ohms
    voltage = base_voltage - (current * r_internal)
    voltage = np.maximum(voltage, 9.0)  # Min voltage

    # --- Temperature Simulation ---
    # Starts ambient, rises with current^2 (I^2R heating)
    ambient_temp = 22
    temp = np.zeros(n_samples) + ambient_temp
    thermal_mass = 1000  # Arbitrary thermal inertia

    current_temp = ambient_temp
    for i in range(1, n_samples):
        heat_in = (current[i] ** 2) * 0.001  # Heating factor
        heat_out = (current_temp - ambient_temp) * 0.05  # Cooling factor
        current_temp += (heat_in - heat_out) / thermal_mass
        temp[i] = current_temp

    # Compile DataFrame
    df = pd.DataFrame(
        {
            "timestamp": timestamps,
            "altitude_m": np.round(altitude, 2),
            "speed_mps": np.round(speed, 2),
            "battery_v": np.round(voltage, 2),
            "current_a": np.round(current, 2),
            "temp_c": np.round(temp, 1),
        }
    )

    return df


# Generate and Save
df = generate_flight_data()
df.to_csv("flight_data.csv", index=False)
print(f"Generated flight_data.csv with {len(df)} rows.")
print(df.head())
