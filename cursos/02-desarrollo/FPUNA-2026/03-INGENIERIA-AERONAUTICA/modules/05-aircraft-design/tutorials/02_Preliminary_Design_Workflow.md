### Tutorial: El Proceso de Diseño Preliminar

En esta fase, se refinan los detalles del diseño conceptual, con un fuerte enfoque en la estabilidad, el control y el análisis de cargas.

#### Paso 1: Análisis de Estabilidad y Control
- **Centro de Gravedad (CG)**: Se calcula la posición del CG sumando los momentos de cada componente (`CG_x = Σ(peso_i × brazo_i) / Σpeso_i`).
- **Margen Estático (SM)**: Para que la aeronave sea estable, el CG debe estar delante del Centro Aerodinámico (CA) del ala. La distancia entre ellos, expresada como % de la Cuerda Media Aerodinámica (MAC), es el Margen Estático. Un valor típico y seguro es **5-15%**.
- **Coeficientes de Volumen (V_H, V_V)**: Se dimensiona el empenaje (cola) para asegurar que tenga suficiente "autoridad" para estabilizar la aeronave. Se calculan los coeficientes de volumen horizontal y vertical y se comparan con valores típicos para aeronaves similares.
- **Dimensionamiento de Superficies de Control**: Se calcula el tamaño necesario de los alerones, elevador y timón (típicamente un % del área del ala o empenaje) para asegurar la maniobrabilidad.

#### Paso 2: Análisis de Cargas (Loads)
Se utiliza el **Diagrama V-n** para determinar las cargas máximas que la estructura debe soportar en vuelo.
1.  **Definir la Envolvente**: Se establecen las velocidades (stall, maniobra, crucero, máxima) y los factores de carga `n` (para un UAV de categoría normal, `n_max` ≈ 3.8g).
2.  **Calcular Carga Máxima**: `L_max = n_max × Peso Total`.
3.  **Distribución de Carga**: Se asume una distribución de sustentación elíptica a lo largo del ala para calcular el momento flector y la fuerza cortante en la raíz del ala.
4.  **Verificación**: Estos valores se usarán como input para el análisis estructural detallado en FEA (Módulo 03) para verificar que la estructura resiste.
