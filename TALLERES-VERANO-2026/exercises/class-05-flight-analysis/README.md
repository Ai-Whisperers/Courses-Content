# Exercise: Flight Data Analysis

**Class 5: Engineering Aeronautics with AI**

## Objective
Use Python to analyze telemetry data from a quadcopter flight test. You will calculate performance metrics and detect anomalies using the `pandas` library.

## Prerequisites
*   **Python 3.x Installed**: If you haven't installed Python yet, please follow the [Python Installation Guide](../../resources/PYTHON-INSTALLATION-GUIDE.md).
*   **Libraries**: Run `pip install -r requirements.txt` before starting.

## Files
- `flight_data.csv`: The telemetry data file.
- `analysis_template.py`: Starter code with TODOs.
- `requirements.txt`: Required Python libraries.

## Instructions

1.  **Open `analysis_template.py`** in OpenCode.
2.  **Read the TODO comments** to understand what code is missing.
3.  **Ask OpenCode** to help you fill in the missing parts.
    *   *Example Prompt:* "I need to load `flight_data.csv` into a pandas DataFrame. How do I do that?"
    *   *Example Prompt:* "How do I calculate the average rate of climb from the altitude and timestamp columns?"
4.  **Run the script** to verify your results.
    *   Open the terminal (Ctrl+`) and run: `python analysis_template.py`

## Expected Results

*   **Average Climb Rate**: Should be around 1.8 - 2.5 m/s.
*   **Total Energy**: Should be around ~2-3 Wh.
*   **Anomalies**: You should detect 3 current spikes > 60A.

## Bonus Challenge
If you finish early, ask OpenCode to help you:
1.  Calculate the **Thrust-to-Weight Ratio** (assume mass = 1.2 kg).
2.  Plot the **Battery Voltage** over time to see the voltage sag.
