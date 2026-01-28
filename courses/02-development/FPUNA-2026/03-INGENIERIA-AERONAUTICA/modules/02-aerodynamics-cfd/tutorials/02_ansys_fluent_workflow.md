### Workflow ANSYS Fluent: Simulación 3D de un Ala de UAV

**Duración estimada**: 2-3 horas (primera vez)

#### Fase 1: Geometría y Dominio (30 min)

1.  **Importar Geometría**: Importa tu archivo `uav_wing.step` (del Módulo 01) en Fluent Meshing.
2.  **Crear Dominio Fluido (Enclosure)**: Crea una caja grande alrededor del ala para simular el "túnel de viento".
    *   **Inlet**: 15x la cuerda del ala por delante.
    *   **Outlet**: 25x la cuerda por detrás.
    *   **Lados/Arriba/Abajo**: 10x la envergadura/cuerda.
3.  **Nombrar Superficies**: Asigna nombres a las caras del dominio: `inlet`, `outlet`, `wing_surface`, `sides`, `top_bottom`.

#### Fase 2: Generación de Malla (45 min)

1.  **Configuración Base**: Usa el `Watertight Geometry Workflow`. Aplica un `Local Sizing` más fino sobre la superficie del ala (ej: 0.01m).
2.  **Capa Límite (Boundary Layer - CRÍTICO)**: Añade `Boundary Layers` a la `wing_surface`. Esto es esencial para capturar la física correctamente.
    *   **First Layer Thickness**: 0.0001 m (para un y+ ~ 30-100).
    *   **Number of Layers**: 15-20.
3.  **Generar Malla**: Usa `Poly-Hexcore` con un objetivo de 2-5 millones de celdas.
4.  **Verificar Calidad**: Revisa que `Orthogonality` > 0.3 y `Skewness` < 0.85.

#### Fase 3: Configuración Física (30 min)

1.  **Modelo de Turbulencia**: En `Setup -> Models -> Viscous`, selecciona `k-omega (2 eqn)` con la opción `SST`. Es el estándar recomendado por NASA para aerodinámica externa.
2.  **Materiales**: Asegúrate que el fluido sea `Air` con las propiedades estándar (Density: 1.225 kg/m³, Viscosity: 1.7894e-05 kg/m·s).
3.  **Condiciones de Contorno**:
    *   `inlet`: **Velocity Inlet** (V = 15 m/s, Turbulent Intensity = 5%).
    *   `outlet`: **Pressure Outlet** (Gauge Pressure = 0 Pa).
    *   `wing_surface`: **Wall** (No-slip, Stationary).
    *   `sides`, `top`, `bottom`: **Symmetry**.

#### Fase 4: Solución (15 min config + 1-3 horas cálculo)

1.  **Monitores**: Crea monitores de reporte para los coeficientes de `Lift` (dirección Y) y `Drag` (dirección X) sobre `wing_surface`.
2.  **Inicialización**: Usa `Hybrid Initialization`.
3.  **Ejecutar Cálculo**: Corre la simulación por 500-1000 iteraciones, monitoreando que los residuales caigan (< 1e-4) y las fuerzas (CL, CD) se estabilicen.

#### Fase 5: Post-Procesamiento (30 min)

1.  **Contornos**: Visualiza los contornos de `Pressure` sobre la superficie del ala y `Velocity` en un plano a mitad de la envergadura.
2.  **Pathlines**: Crea líneas de corriente (`Pathlines`) desde el `inlet` para visualizar los vórtices de punta de ala.
3.  **Reportes**: Extrae los valores finales de CL y CD y compáralos con los resultados de XFoil. El CD en 3D será mayor debido al arrastre inducido por los vórtices, lo cual es más realista.
