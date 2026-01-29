# AI-Driven Winglet Design Study

This folder contains a multi-part demo to showcase a full engineering workflow using AI to drive Autodesk Fusion 360.

## 🎯 Objective
Compare the physical properties (mass, surface area) of three different winglet designs attached to a standard wing section.

## 🚀 How to Run the Demo
The new `RunAgentScript.py` is now a launcher. When you run it in Fusion 360, it will ask you which script file to execute.

**Follow this order:**

1.  **`01_generate_wing.py`**: Creates the main wing section. This is your baseline.
2.  **`02_generate_winglet_A.py`**: Adds a simple, blended winglet to the wing.
3.  **`03_generate_winglet_B.py`**: Adds a more aggressive, canted (angled) winglet. *Run this in a separate, clean design file to compare.*
4.  **`04_generate_winglet_C.py`**: Adds a modern "shark-fin" winglet. *Run this in another clean design file.*
5.  **`05_analyze_geometries.py`**:
    *   Open a design file that has a wing and winglet.
    *   Run this script.
    *   It will calculate the mass, volume, and surface area.
    *   It will save the data to `comparison_results.csv` in this folder.
    *   Repeat for each winglet design to populate the comparison file.

## 🧠 What This Demonstrates to Students

*   **Parametric Design**: How AI can generate complex geometry from code.
*   **Rapid Prototyping**: Creating multiple design variants in minutes.
*   **Data Extraction**: Using the API to pull critical engineering data back out of the CAD model.
*   **Design-Analysis Loop**: The full circle of designing, then analyzing, all automated.
