### Tutorial: Introducción a OpenFOAM

**OpenFOAM** es una alternativa open-source a ANSYS Fluent. No tiene una interfaz gráfica, por lo que toda la configuración se realiza a través de archivos de texto, lo que ofrece un control y una personalización sin precedentes.

#### Estructura de un Caso en OpenFOAM
Un caso típico se organiza en tres carpetas:
- **`0/`**: Contiene las condiciones iniciales y de contorno para cada variable (U para velocidad, p para presión, etc.).
- **`constant/`**: Contiene las propiedades del fluido (`transportProperties`), el modelo de turbulencia (`turbulenceProperties`), y la malla (`polyMesh/`).
- **`system/`**: Contiene los parámetros de control de la simulación (`controlDict`), los esquemas numéricos (`fvSchemes`), y la configuración del solver (`fvSolution`).

#### Ejemplo de Archivo de Configuración (`0/U` - Velocidad)
```cpp
dimensions      [0 1 -1 0 0 0 0];  // m/s

internalField   uniform (15 0 0);   // Velocidad inicial en todo el dominio

boundaryField
{
    inlet
    {
        type            fixedValue;
        value           uniform (15 0 0); // Velocidad fija en la entrada
    }
    outlet
    {
        type            zeroGradient; // Permite que el flujo salga libremente
    }
    airfoil
    {
        type            noSlip; // El fluido se "pega" a la superficie
    }
    sides
    {
        type            symmetryPlane; // Condición de simetría
    }
}
```

#### Flujo de Trabajo Básico
1.  **Generar Malla**: Usando `blockMesh` (para geometrías simples) or `snappyHexMesh` (para complejas, a partir de un .stl).
2.  **Configurar Archivos**: Editar los archivos en las carpetas `0/`, `constant/`, y `system/`.
3.  **Ejecutar Simulación**: Correr el solver correspondiente (ej: `simpleFoam` para flujos estacionarios e incompresibles) desde la terminal.
4.  **Post-Procesar**: Visualizar los resultados usando **ParaView**, una potente herramienta de visualización open-source.
