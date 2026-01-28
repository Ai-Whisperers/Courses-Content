# AI in Design & CAD - Samples

This folder contains Python scripts that demonstrate how AI and Algorithms are used in Modern Aeronautical Design.

## 1. Generative Design Demo (`topology_opt_demo.py`)

This script demonstrates **Topology Optimization**, the algorithm behind "Generative Design" in tools like Fusion 360.

*   **Concept**: Instead of drawing a part, you define a volume and loads. The algorithm "removes" material where it isn't needed, resulting in organic, bone-like structures.
*   **How to run**: `python topology_opt_demo.py`
*   **Output**: An image `generative_beam_result.png` showing the optimized material distribution.

## 2. Parametric Drone Designer (`drone_designer.py`)

This script demonstrates **Requirement-Driven Design** (AI-Augmented Engineering).

*   **Concept**: You tell the AI "I need a drone that carries 0.5kg for 45 mins". The AI calculates the physics (weight, power, battery) and generates a 3D model script automatically.
*   **How to run**: `python drone_designer.py`
*   **Output**: 
    1. Calculated specs printed to console.
    2. A 3D model script `drone_design.scad`.
    3. You can view the 3D model by installing [OpenSCAD](https://openscad.org/) and opening the file.

## Why Python?

In professional engineering, these algorithms run inside complex CAD software (CATIA, NX, Fusion). We use Python here to show you the **logic** behind the "Magic Button" in those tools.
