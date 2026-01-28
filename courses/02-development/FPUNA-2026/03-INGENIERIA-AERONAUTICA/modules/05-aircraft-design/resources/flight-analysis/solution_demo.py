import pandas as pd
import matplotlib.pyplot as plt
import numpy as np


def analyze_flight_data(file_path):
    """
    Analyzes flight data from a CSV file.
    """
    print(f"Loading data from {file_path}...")

    # TODO 1: Load the CSV file into a pandas DataFrame
    df = pd.read_csv(file_path)
    print(df.head())

    # --- PART 1: PERFORMANCE METRICS ---
    print("\n--- PERFORMANCE METRICS ---")

    # TODO 2: Calculate Average Rate of Climb
    # Hint: Rate of Climb = Change in Altitude / Change in Time
    df["climb_rate"] = df["altitude_m"].diff() / df["timestamp"].diff()
    avg_climb_rate = df["climb_rate"].mean()
    print(f"Average Climb Rate: {avg_climb_rate:.2f} m/s")

    # TODO 3: Calculate Energy Consumption
    # Power (W) = Voltage (V) * Current (A)
    # Total Energy (Wh) = Sum of (Power * Time_interval) / 3600
    # Energy per Meter = Total Energy / Max Altitude

    # Calculate Power column first
    df["power_w"] = df["battery_v"] * df["current_a"]

    # Calculate Total Energy
    # Assuming constant time interval (1s) from diff or just sum if 1s
    time_diff = df["timestamp"].diff().fillna(0)
    total_energy_wh = (df["power_w"] * time_diff).sum() / 3600
    print(f"Total Energy Consumed: {total_energy_wh:.2f} Wh")

    # Calculate Energy per Meter
    max_altitude = df["altitude_m"].max()
    energy_per_meter = total_energy_wh / max_altitude if max_altitude > 0 else 0
    print(f"Energy per Meter: {energy_per_meter:.4f} Wh/m")

    # --- PART 2: ANOMALY DETECTION ---
    print("\n--- ANOMALY DETECTION ---")

    # TODO 4: Detect Current Spikes
    # Define a threshold for "High Current" (e.g., > 60A)
    current_threshold = 60.0
    anomalies = df[df["current_a"] > current_threshold]
    print(f"Found {len(anomalies)} anomalies (Current > {current_threshold}A):")
    if not anomalies.empty:
        print(anomalies[["timestamp", "current_a", "altitude_m"]])

    # --- PART 3: VISUALIZATION ---
    print("\nGenerating plots...")

    # TODO 5: Plot Altitude and Current over Time
    plt.figure(figsize=(12, 8))

    # Subplot 1: Altitude vs Time
    plt.subplot(2, 1, 1)
    plt.plot(df["timestamp"], df["altitude_m"], label="Altitude", color="blue")
    plt.title("Flight Profile: Altitude vs Time")
    plt.xlabel("Time (s)")
    plt.ylabel("Altitude (m)")
    plt.grid(True)
    plt.legend()

    # Subplot 2: Current vs Time (highlight anomalies)
    plt.subplot(2, 1, 2)
    plt.plot(df["timestamp"], df["current_a"], label="Current", color="orange")
    plt.title("Power Consumption: Current vs Time")
    plt.xlabel("Time (s)")
    plt.ylabel("Current (A)")
    plt.grid(True)

    # Highlight anomalies
    if not anomalies.empty:
        plt.scatter(
            anomalies["timestamp"],
            anomalies["current_a"],
            color="red",
            label="Anomalies",
            zorder=5,
        )

    plt.legend()

    plt.tight_layout()
    plt.savefig("flight_analysis_results.png")
    print("Plot saved as 'flight_analysis_results.png'")
    # plt.show() # Commented out for headless execution

    print("Analysis Complete!")


if __name__ == "__main__":
    # Path to the data file
    FILE_PATH = "flight_data.csv"

    # Run the analysis
    try:
        analyze_flight_data(FILE_PATH)
    except FileNotFoundError:
        print(
            f"Error: {FILE_PATH} not found. Make sure you are in the correct directory."
        )
