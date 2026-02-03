### Tutorial: Análisis FEA de un Larguero en ANSYS

Este tutorial te guiará a través del proceso completo de análisis de un larguero de ala usando ANSYS Mechanical.

#### Paso 1: Importar Geometría y Asignar Material

1.  **Importar Geometría**: En ANSYS Workbench, importa el archivo `larguero_ala.stp` (exportado desde tu software CAD).
2.  **Asignar Material**:
    *   Ve a `Engineering Data`.
    *   Crea un nuevo material "Aluminum_7075_T6".
    *   Ingresa sus propiedades:
        *   Density: 2.81e-6 kg/mm³
        *   Young's Modulus: 71,700 MPa
        *   Poisson's Ratio: 0.33
        *   Yield Strength: 503 MPa
    *   Asigna este material al cuerpo del larguero en la sección `Geometry`.

#### Paso 2: Generación de la Malla (Meshing)

La malla divide tu geometría en pequeños "elementos finitos" para resolver las ecuaciones.
1.  **Tamaño Global**: En `Mesh`, establece un `Element Size` global de `2 mm`.
2.  **Refinamiento Local**: Agrega un `Face Sizing` en la cara del empotramiento (donde se une al fuselaje) con un tamaño de `0.5 mm`. Esto es crucial porque es donde se concentrarán los esfuerzos.
3.  **Generar Malla**: Haz clic en `Generate Mesh`.
4.  **Verificar Calidad**: Revisa que la `Skewness` sea menor a 0.85 y la `Orthogonal Quality` sea mayor a 0.3 para asegurar resultados fiables.

#### Paso 3: Condiciones de Contorno (Setup)

Aquí le dices al software cómo está soportada la pieza y qué cargas actúan sobre ella.
1.  **Empotramiento (Fixed Support)**:
    *   Añade un `Fixed Support`.
    *   Selecciona la cara del larguero que se une a la raíz del ala (el fuselaje). Esto fija todos sus grados de libertad.
2.  **Aplicar Carga**:
    *   Añade una `Pressure` (presión) sobre la cara superior del larguero para simular la sustentación.
    *   Calcula la presión: `p = Fuerza Total / Área`. Para una fuerza de `111.8 N` sobre un área de `1000mm x 12mm`, la presión es `9.32 kPa`.

#### Paso 4: Solución y Post-Procesamiento

1.  **Seleccionar Resultados**: En `Solution`, inserta los resultados que quieres ver:
    *   `Stress -> Equivalent (von-Mises)` para ver los esfuerzos.
    *   `Deformation -> Total` para ver la deflexión.
    *   `Stress Tool -> Safety Factor` para verificar el factor de seguridad.
2.  **Resolver**: Haz clic en `Solve`.
3.  **Analizar Resultados**:
    *   **Esfuerzo**: El esfuerzo máximo debe aparecer en la esquina superior del empotramiento. Compara este valor con el límite de fluencia del material.
    *   **Deformación**: La deflexión máxima debe estar en la punta del larguero. Verifica que no sea excesiva (ej: < 5% de la longitud).
    *   **Factor de Seguridad**: El valor mínimo debe ser mayor a 1.5 para cumplir con las normativas aeronáuticas. Si es muy alto (ej: > 5), tu diseño es demasiado pesado y puede ser optimizado.
