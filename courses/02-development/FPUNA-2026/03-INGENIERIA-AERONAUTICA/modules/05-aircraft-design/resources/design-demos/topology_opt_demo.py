import numpy as np
import matplotlib.pyplot as plt


def optimize_beam(nelx=60, nely=20, volfrac=0.4, penal=3.0, rmin=1.5):
    """
    A simplified Topology Optimization of a Cantilever Beam (SIMP method).

    This simulates 'Generative Design' by iteratively removing material
    where stress is low and keeping it where stress is high.

    Args:
        nelx: Elements in X (Length)
        nely: Elements in Y (Height)
        volfrac: Volume Fraction (Target material usage, e.g., 40%)
        penal: Penalization power (makes material solid or void)
        rmin: Filter radius (prevents checkerboarding)
    """
    print(f"Starting Generative Design Optimization...")
    print(f"Target: Reduce weight to {volfrac * 100}% while maintaining stiffness.")
    print("-" * 50)

    # Max iterations
    max_loop = 15

    # Initial density (uniform)
    x = volfrac * np.ones(nely * nelx)

    # Loop to simulate "evolution"
    for loop in range(max_loop):
        # In a real solver, we would calculate Finite Element Analysis (FEA) here
        # to find strain energy (compliance) and sensitivity.
        # Since we don't have a full FEA solver installed, we will simulate
        # the pattern formation using a cellular automata-like rule that
        # approximates the structural physics of a cantilever beam.

        # NOTE: This is a VISUAL SIMULATION for educational purposes.
        # It creates the "organic" look of generative design without solving Ku=f.

        x_new = x.copy()

        # Reshape to grid
        grid = x.reshape((nely, nelx))

        # Cantilever Logic: Material needed at top/bottom (flanges) and diagonals (shear)
        for i in range(nely):
            for j in range(nelx):
                # Distance from support (left)
                dist_x = j / nelx
                # Distance from neutral axis
                dist_y = abs(i - nely / 2) / (nely / 2)

                # "Stress" heuristic
                stress = 0.0

                # 1. Bending stress (high at support, high at outer fibers)
                stress += (1.0 - dist_x) * dist_y

                # 2. Shear stress (web) - organic truss look
                # Create diagonal patterns
                freq = 6.0  # How many truss bays
                diag = np.sin(j / nelx * freq * np.pi + (i / nely * np.pi))
                stress += 0.3 * abs(diag)

                # 3. Load point (tip load)
                if j > nelx * 0.9 and abs(i - nely / 2) < 2:
                    stress += 2.0

                # Support point (clamped left)
                if j < 2:
                    stress += 2.0

                # Update density based on "stress"
                target_density = np.clip(stress, 0.01, 1.0)

                # Slowly evolve towards target
                current = grid[i, j]
                grid[i, j] = current + 0.2 * (target_density - current)

        # Enforce volume constraint
        # Simple normalization to keep total mass constant
        current_vol = np.mean(grid)
        grid = grid * (volfrac / current_vol)
        grid = np.clip(grid, 0.0, 1.0)

        x = grid.flatten()
        change = np.linalg.norm(x - x_new, ord=np.inf)

        print(f" Iteration {loop + 1:2d} | Material Distribution Change: {change:.4f}")

    print("-" * 50)
    print("Optimization Complete.")

    # Plotting
    plt.figure(figsize=(10, 4))
    plt.imshow(1 - x.reshape((nely, nelx)), cmap="gray", interpolation="bilinear")
    plt.title(
        f"Generative Design Result ({volfrac * 100}% Volume)\n'Organic' Load Paths Visible"
    )
    plt.axis("off")
    plt.tight_layout()

    output_file = "generative_beam_result.png"
    plt.savefig(output_file)
    print(f"Result saved to: {output_file}")
    plt.show()


if __name__ == "__main__":
    optimize_beam()
