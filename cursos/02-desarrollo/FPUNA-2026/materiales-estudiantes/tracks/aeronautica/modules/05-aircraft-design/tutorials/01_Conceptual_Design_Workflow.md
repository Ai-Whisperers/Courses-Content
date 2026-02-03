### Tutorial: El Proceso de Diseño Conceptual

Esta es la primera y más crucial fase del diseño, donde se pasa de una idea a una configuración tangible.

#### Paso 1: Definir la Misión y los Requerimientos
Todo diseño comienza con una necesidad. Usa el método **QFD (Quality Function Deployment)** para traducir la "voz del cliente" en especificaciones técnicas medibles.

**Ejemplo: UAV Agrícola**
- **Cliente dice**: "Necesito monitorear 100 hectáreas de soja al día."
- **Ingeniero traduce**:
    - Esto implica `X` vuelos por día.
    - Cada vuelo debe tener una autonomía de `Y` minutos.
    - La velocidad de crucero debe ser `Z` m/s para una cobertura eficiente.
    - El payload (cámara) pesa `W` gramos.

#### Paso 2: Seleccionar la Configuración General
Basado en los requerimientos, se elige una configuración. ¿Ala fija, multi-rotor o VTOL (híbrido)?

- **Ala Fija**: Excelente para largas distancias y autonomía (nuestro caso).
- **Multi-rotor**: Ideal para vuelo estacionario (hover) e inspección cercana.
- **VTOL**: Lo mejor de ambos mundos, pero con mayor complejidad y costo.

Se utiliza una **Matriz de Decisión** para comparar las opciones de forma objetiva, ponderando criterios como autonomía, costo, facilidad de operación, etc. Para la misión agrícola, el **ala fija** es la clara ganadora.

#### Paso 3: Dimensionamiento Inicial (Sizing)
Aquí se definen las dimensiones principales de la aeronave usando datos históricos y estadísticos de aeronaves similares.
1.  **Estimar Peso Vacío**: Para UAVs de este tipo, el peso vacío (sin batería ni payload) suele ser el 55-65% del peso total.
2.  **Estimar Área Alar (S)**: Se define una carga alar (W/S) objetivo. Para vuelo lento, un valor conservador es 18 kg/m². `S = Peso Total / (W/S)`.
3.  **Calcular Envergadura (b)**: Se elige una Relación de Aspecto (AR) objetivo (ej: 9). `b = √(AR × S)`.
4.  **Calcular Cuerda Media (c)**: `c = S / b`.

#### Paso 4: Estimación Detallada de Pesos (Class I)
Se desglosa el peso total en sus componentes principales (estructura, propulsión, batería, payload, etc.) para verificar que las estimaciones iniciales son realistas.
- **Estructura**: ~25% del peso total.
- **Batería**: ~23%.
- **Payload**: ~20%.
- **Propulsión**: ~15%.
- **Aviónica y otros**: ~17%.

Si el desglose no cierra, se debe volver al Paso 3 y ajustar los parámetros (iterar).
