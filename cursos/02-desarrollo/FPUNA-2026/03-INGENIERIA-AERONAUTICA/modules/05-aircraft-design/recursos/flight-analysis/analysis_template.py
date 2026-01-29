import pandas as pd
import matplotlib.pyplot as plt
import numpy as np


def analyze_flight_data(file_path):
    """
    Analyzes flight data from a CSV file.
    """
    print(f"Loading data from {file_path}...")

    # TODO 1: Load the CSV file into a pandas DataFrame
    # df = ...
    # print(df.head())

    # --- PART 1: PERFORMANCE METRICS ---
    print("\n--- PERFORMANCE METRICS ---")

    # TODO 2: Calculate Average Rate of Climb
    # Hint: Rate of Climb = Change in Altitude / Change in Time
    # You can use df['altitude_m'].diff() / df['timestamp'].diff()
    # avg_climb_rate = ...
    # print(f"Average Climb Rate: {avg_climb_rate:.2f} m/s")

    # TODO 3: Calculate Energy Consumption
    # Power (W) = Voltage (V) * Current (A)
    # Total Energy (Wh) = Sum of (Power * Time_interval) / 3600
    # Energy per Meter = Total Energy / Max Altitude

    # Calculate Power column first
    # df['power_w'] = ...

    # Calculate Total Energy
    # total_energy_wh = ...
    # print(f"Total Energy Consumed: {total_energy_wh:.2f} Wh")

    # Calculate Energy per Meter
    # energy_per_meter = ...
    # print(f"Energy per Meter: {energy_per_meter:.4f} Wh/m")

    # --- PART 2: ANOMALY DETECTION ---
    print("\n--- ANOMALY DETECTION ---")

    # TODO 4: Detect Current Spikes
    # Define a threshold for "High Current" (e.g., > 60A or use Z-score)
    # Find rows where current_a exceeds this threshold
    # anomalies = ...
    # print(f"Found {len(anomalies)} anomalies:")
    # print(anomalies[['timestamp', 'current_a', 'altitude_m']])

    # --- PART 3: VISUALIZATION ---
    print("\nGenerating plots...")

    # TODO 5: Plot Altitude and Current over Time
    # Create a figure with 2 subplots
    # Subplot 1: Altitude vs Time
    # Subplot 2: Current vs Time (highlight anomalies if possible)

    # plt.figure(figsize=(12, 8))
    # ...
    # plt.show()

    print("Analysis Complete!")


if __name__ == "__main__":
    # Path to the data file
    FILE_PATH = "flight_data.csv"

    # Run the analysis
    # analyze_flight_data(FILE_PATH)

    # Uncomment the line above when you are ready to run!
    print("Open 'analysis_template.py' and start coding!")
