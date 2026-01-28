# Flight Data Resource for Class 5

This directory contains resources for the "Engineering Aeronautics with AI" class demo.

## Files

- **`flight_data.csv`**: A realistic simulated flight log of a quadcopter.
- **`generate_data.py`**: The Python script used to generate the CSV. You can modify this script to create different flight profiles (e.g., longer flights, more anomalies).

## Data Description (`flight_data.csv`)

The data simulates a 10-minute flight (600 seconds) with the following phases:

1. **Pre-arm (0-10s)**: Static on ground.
2. **Takeoff (10-30s)**: Climb to ~50m altitude. High current consumption.
3. **Cruise (30-300s)**: Loitering around 50m. Moderate current.
4. **Aggressive Maneuver (300-360s)**: **ANOMALY CANDIDATE**. High speed, current spikes, altitude fluctuations.
   - *Look for current spikes > 60A here.*
5. **Return to Home (360-550s)**: Steady flight back.
6. **Landing (550-580s)**: Descent to 0m.

### Columns

| Column | Unit | Description |
|--------|------|-------------|
| `timestamp` | seconds | Time elapsed since boot. |
| `altitude_m` | meters | Altitude relative to takeoff point. |
| `speed_mps` | m/s | Ground speed. |
| `battery_v` | Volts | Battery voltage (starts at 12.6V, sags under load). |
| `current_a` | Amps | Instantaneous current draw. |
| `temp_c` | °C | ESC/Battery temperature (rises with load). |

## How to use in Class

1. **Upload** `flight_data.csv` to OpenCode / Claude.
2. **Prompt**: 
   > "I have this flight data from a quadcopter test. Analyze it to find performance metrics (avg climb rate, energy consumption) and detect any anomalies."

## Anomalies to Find

The script injects specific anomalies for the students/AI to find:
- **Current Spikes**: 3 massive spikes during the "Aggressive Maneuver" phase (300-360s).
- **Voltage Sag**: Noticeable drops in voltage during climb and maneuvers.
