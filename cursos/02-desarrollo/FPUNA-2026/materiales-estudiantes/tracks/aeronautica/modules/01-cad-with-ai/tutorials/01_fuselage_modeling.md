### Tutorial Paso a Paso: Fuselaje de UAV

**Objetivo**: Diseñar fuselaje de UAV agrícola para monitoreo de cultivos en Paraguay.

#### Paso 1: Requerimientos de Diseño

**Especificaciones funcionales**:
```
Longitud total: 1200mm
Diámetro máximo: 200mm
Carga útil: Cámara 500g en bahía central
Material: Fibra de carbono (espesor 3mm)
Peso objetivo: < 800g
```

**Forma aerodinámica**:
- Nariz cónica (reducir drag)
- Sección central cilíndrica (bahía de carga)
- Cola ahusada (estabilidad)

#### Paso 2: Modelado del Fuselaje en Fusion 360

**2.1. Crear Perfil Lateral**

```
Sketch en plano XZ:
1. Línea de referencia (eje longitudinal)
2. Curva de la nariz (spline)
   - Punto inicial: (0, 0)
   - Radio máximo: (300, 100) [300mm desde nariz, radio 100mm]
3. Sección cilíndrica:
   - Longitud: 600mm (bahía de carga)
   - Radio constante: 100mm
4. Sección de cola (ahusada):
   - Longitud: 300mm
   - Radio final: 40mm (montaje motor)
5. Cerrar perfil
```

**2.2. Crear Volumen (Revolve)**

```
Revolve:
- Seleccionar perfil
- Eje de revolución: línea de referencia
- Ángulo: 360°
- Operación: New Body
```

**2.3. Crear Cavidad Interior (Shell)**

```
Shell:
- Seleccionar caras nariz y cola
- Espesor: 3mm
- Dirección: Interior
- Resultado: Fuselaje hueco
```

**2.4. Bahía de Carga (Corte)**

```
Sketch en plano XY (vista superior):
1. Rectángulo: 200mm × 150mm
   Centrado en sección cilíndrica
2. Redondear esquinas: r=10mm

Extrude Cut:
- Profundidad: atravesar fuselaje (Through All)
- Crear tapa desmontable (sketch separado)
```

#### Paso 3: Componentes Adicionales

**3.1. Montajes de Ala**

```
Sketch en superficie fuselaje:
- 2 círculos (diámetro 50mm) a 400mm desde nariz
- Separación vertical: 20mm
- Extrude Boss: 10mm (hacia afuera)
- Hole: diámetro 8mm para tornillos M8
```

**3.2. Montaje de Motor**

```
En cola (radio 40mm):
- Sketch: Patrón circular de 4 agujeros
  Diámetro tornillos: 3mm
  Circle diameter: 30mm
- Extrude Cut: 5mm profundidad
```

#### Paso 4: Análisis y Validación

**Propiedades de masa (Fusion 360)**:
```
Tools → Inspect → Properties
Material: Carbon Fiber Composite (ρ = 1600 kg/m³)

Resultados esperados:
- Masa: ~750g ✓
- Volumen interior: ~4 litros
- Centro de gravedad: x ≈ 500mm
```

**Export para análisis**:
```
File → Export:
- STEP (.stp) → Para FEA estructural
- STL (.stl) → Para impresión 3D de moldes
- IGES (.igs) → Para CFD
```
