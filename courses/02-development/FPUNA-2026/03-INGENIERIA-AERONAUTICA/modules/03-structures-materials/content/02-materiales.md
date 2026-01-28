# Materiales Aeronauticos

## 1. Introduccion a la Seleccion de Materiales

### Criterios de Seleccion

La seleccion de materiales en aeronautica considera multiples factores:

```
CRITERIOS PRINCIPALES
=====================

     Resistencia
         /\
        /  \
       /    \
      /      \
Peso /________\ Costo
     \        /
      \      /
       \    /
        \  /
         \/
    Facilidad de
    Manufactura

Balance: Maximo rendimiento al menor costo y peso
```

### Propiedades Mecanicas Clave

| Propiedad | Simbolo | Unidad | Importancia |
|-----------|---------|--------|-------------|
| Modulo de Young | E | GPa | Rigidez |
| Limite elastico | sigma_y | MPa | Deformacion permanente |
| Resistencia ultima | sigma_u | MPa | Falla |
| Densidad | rho | kg/m^3 | Peso |
| Resistencia especifica | sigma/rho | kN*m/kg | Eficiencia |

### Indice de Merit

```
Para minimizar peso en componentes sometidos a:

Tension:
Indice = sigma_y / rho

Rigidez (viga):
Indice = E^(1/2) / rho

Rigidez (placa):
Indice = E^(1/3) / rho

MAYOR INDICE = MEJOR MATERIAL
```

---

## 2. Aluminio Aeronautico

### Aleaciones Comunes

| Aleacion | Serie | Composicion | Uso Principal |
|----------|-------|-------------|---------------|
| **2024-T3** | 2xxx | Al-Cu | Fuselajes, pieles |
| **6061-T6** | 6xxx | Al-Mg-Si | Estructuras, extrusion |
| **7075-T6** | 7xxx | Al-Zn | Alta resistencia |
| **5052-H32** | 5xxx | Al-Mg | Corrosion, tanques |

### Propiedades Mecanicas

| Propiedad | 6061-T6 | 7075-T6 | Unidad |
|-----------|---------|---------|--------|
| Densidad | 2700 | 2810 | kg/m^3 |
| Modulo E | 69 | 71 | GPa |
| Yield | 276 | 503 | MPa |
| Ultima | 310 | 572 | MPa |
| Elongacion | 12% | 11% | - |

### Comparacion de Indices

```
Resistencia especifica (sigma_y / rho):

6061-T6: 276 / 2700 = 102 kN*m/kg
7075-T6: 503 / 2810 = 179 kN*m/kg
Acero 4340: 860 / 7850 = 110 kN*m/kg

CONCLUSION: 7075 es 1.6x mejor que acero de alta resistencia
```

### Cuando Usar Cada Aleacion

| Aleacion | Ventajas | Desventajas | Aplicacion en UAV |
|----------|----------|-------------|-------------------|
| **6061-T6** | Soldable, economico | Menor resistencia | Tubos fuselaje |
| **7075-T6** | Alta resistencia | No soldable, caro | Largueros ala |

### Formas Disponibles

```
PERFILES COMERCIALES
====================

Tubo cuadrado:     Tubo redondo:     Angulo L:
+----------+        +----+           +-----+
|          |       /      \          |
|          |      |        |         |
|          |       \      /          +-----
+----------+        +----+

Platina:           Canal U:          Viga I:
____________      +--------+         +----+
|          |      |        |           ||
|          |      +        +           ||
____________      |        |           ||
                  |        |         +----+
```

---

## 3. Materiales Compuestos

### Fibra de Carbono (CFRP)

```
ESTRUCTURA COMPUESTA
====================

    Direccion de fibras
    ←------------------→
    ━━━━━━━━━━━━━━━━━━━━  Capa 0 grados
    ╲  ╲  ╲  ╲  ╲  ╲  ╲   Capa +45 grados
    ╱  ╱  ╱  ╱  ╱  ╱  ╱   Capa -45 grados
    ━━━━━━━━━━━━━━━━━━━━  Capa 0 grados
    |  |  |  |  |  |  |   Capa 90 grados
    
Laminado tipico: [0/+45/-45/90]s (simetrico)
```

### Propiedades CFRP

| Propiedad | UD (0 grados) | Tejido | Unidad |
|-----------|---------------|--------|--------|
| Densidad | 1550 | 1600 | kg/m^3 |
| E longitudinal | 135 | 70 | GPa |
| E transversal | 10 | 70 | GPa |
| Tension long. | 1500 | 600 | MPa |
| Compresion | 1200 | 500 | MPa |

### Fibra de Vidrio (GFRP)

| Propiedad | E-Glass UD | E-Glass Tejido | Unidad |
|-----------|------------|----------------|--------|
| Densidad | 1850 | 1900 | kg/m^3 |
| E longitudinal | 40 | 25 | GPa |
| Tension | 600 | 350 | MPa |
| Costo relativo | 1x | 1x | - |

### Comparacion CFRP vs GFRP

| Criterio | CFRP | GFRP | Ganador |
|----------|------|------|---------|
| Resistencia/peso | 970 | 320 | CFRP |
| Rigidez/peso | 87 | 21 | CFRP |
| Costo | 5-10x | 1x | GFRP |
| Facilidad trabajo | Dificil | Facil | GFRP |
| Resistencia impacto | Baja | Alta | GFRP |

### Recomendacion para UAV

```
LARGUERO PRINCIPAL: CFRP
- Donde necesitas maxima rigidez/peso
- Tubo o perfil pultruido
- Costo justificado por ahorro de peso

PIELES/CARENADOS: GFRP
- Donde resistencia es suficiente
- Facil de reparar
- Menor costo

HIBRIDO (optimo):
- Larguero CFRP + costillas GFRP + piel GFRP
```

---

## 4. Madera Aeronautica

### Tipos de Madera

| Madera | Densidad (kg/m^3) | E (GPa) | Resistencia (MPa) | Uso |
|--------|-------------------|---------|-------------------|-----|
| **Balsa** | 160 | 3.5 | 7 (comp) | Nucleos, rellenos |
| **Abeto Sitka** | 450 | 10 | 35 (comp) | Largueros clasicos |
| **Contrachapado** | 550 | 7 | 25 | Pieles, costillas |
| **Cedro** | 380 | 7.5 | 30 | Largueros ligeros |

### Balsa: El Material Magico

```
PROPIEDADES BALSA
=================

Densidad: 80-200 kg/m^3 (depende de grado)
Uso principal: Nucleos de sandwich

Estructura sandwich:
+==================+ Piel superior (GFRP/CFRP)
|                  |
|   ○  ○  ○  ○     | Nucleo de balsa
|                  | (90% del espesor, 10% del peso)
+==================+ Piel inferior

Ventaja: Rigidez de placa sin peso
```

### Contrachapado Aeronautico

```
Grados:
- Exterior (WBP): Resistente al agua
- Aeronautico (tipo A): Maxima calidad
- Marina: Buena alternativa

Espesores comunes: 1.5, 2, 3, 4, 6 mm

Direccion de grano:
+------------------+
|  →  →  →  →  →  | Capa 1 (0 grados)
|  ↑  ↑  ↑  ↑  ↑  | Capa 2 (90 grados)
|  →  →  →  →  →  | Capa 3 (0 grados)
+------------------+
```

### Cuando Usar Madera

| Ventajas | Desventajas |
|----------|-------------|
| Muy economica | Sensible a humedad |
| Facil de trabajar | Variable en propiedades |
| Reparable | Requiere acabado |
| Absorbe vibracion | Menor resistencia/peso |
| Disponible localmente | Puede pudrirse |

**Recomendacion**: Excelente para prototipos y modelos de bajo costo.

---

## 5. Plasticos para Impresion 3D

### Materiales Comunes

| Material | Densidad | E (GPa) | Tension (MPa) | T_max (C) |
|----------|----------|---------|---------------|-----------|
| **PLA** | 1240 | 3.5 | 60 | 55 |
| **PETG** | 1270 | 2.0 | 50 | 75 |
| **ABS** | 1040 | 2.3 | 40 | 95 |
| **Nylon (PA)** | 1150 | 2.7 | 75 | 180 |
| **PC** | 1200 | 2.3 | 65 | 130 |
| **ASA** | 1070 | 2.0 | 45 | 95 |

### Comparacion para UAV

```
MEJOR PARA CADA APLICACION
==========================

Partes estructurales (soportes motor):
1. Nylon reforzado (PA-CF) - Mejor
2. PC - Muy bueno
3. PETG - Aceptable

Partes no estructurales (carenados):
1. ASA - Mejor (UV resistente)
2. PETG - Muy bueno
3. PLA - Solo prototipos

Partes de precision (soportes):
1. PLA - Facil, dimensional
2. PETG - Buena adhesion
```

### Nylon Reforzado con Fibra

| Material | E (GPa) | Tension (MPa) | Costo Relativo |
|----------|---------|---------------|----------------|
| PA (nylon puro) | 2.7 | 75 | 1.5x |
| PA-GF (vidrio) | 6.0 | 100 | 2x |
| PA-CF (carbono) | 15.0 | 150 | 5x |

### Configuracion de Impresion para Partes Estructurales

```
PARAMETROS RECOMENDADOS
=======================

Paredes: 3-4 perimetros (minimo 1.2mm)
Relleno: 50-100% para partes criticas
Patron: Lineas o rejilla (no honeycomb)
Orientacion: Cargas en direccion Z minimizadas

IMPORTANTE: Las capas son el punto debil
            Orientar pieza para que cargas
            sean paralelas a las capas
```

---

## 6. Espumas Estructurales

### Tipos de Espuma

| Tipo | Densidad (kg/m^3) | Uso | Costo |
|------|-------------------|-----|-------|
| **EPS** (poliestireno) | 15-30 | Alas moldeo | Muy bajo |
| **XPS** (extruido) | 25-40 | Nucleos planos | Bajo |
| **EPP** (polipropileno) | 30-60 | Resistencia impacto | Medio |
| **PVC** (Airex/Divinycell) | 40-200 | Nucleos sandwich | Alto |
| **Rohacell** (PMI) | 30-100 | Aerospace | Muy alto |

### Seleccion de Espuma

```
APLICACION -> ESPUMA RECOMENDADA

Ala de entrenamiento: EPS + GFRP
- Economico, facil de reparar

Ala de competicion: Rohacell + CFRP
- Maximo rendimiento

Fuselaje UAV: XPS o PVC + GFRP
- Buen balance costo/rendimiento

Partes de impacto: EPP
- Absorbe golpes, recupera forma
```

---

## 7. Adhesivos

### Tipos de Adhesivos Aeronauticos

| Tipo | Tiempo de Trabajo | Resistencia | Uso |
|------|-------------------|-------------|-----|
| **Epoxi 5-min** | 5 min | Media | Reparaciones rapidas |
| **Epoxi 30-min** | 30 min | Alta | Uniones estructurales |
| **Epoxi laminacion** | 2-4 horas | Muy alta | Composites |
| **CA (cianoacrilato)** | Segundos | Media | Madera, rapido |
| **Poliuretano** | 30 min | Alta | Flexible, espuma |

### Epoxi para Laminacion

```
SISTEMA EPOXI TIPICO
====================

Resina + Endurecedor
Proporcion: 2:1 o 3:1 (por peso)

Propiedades curadas:
- Densidad: 1150 kg/m^3
- E: 3.0-3.5 GPa
- Tension: 60-85 MPa
- Temperatura: hasta 80°C (postcurado)

IMPORTANTE: Mezclar bien, respetar proporciones
```

### Preparacion de Superficies

```
PROTOCOLO DE PEGADO
===================

1. LIMPIAR: Acetona o alcohol isopropilico
2. LIJAR: Grano 120-220 (crear "dientes")
3. LIMPIAR: Remover polvo de lijado
4. APLICAR: Adhesivo en ambas superficies
5. UNIR: Presion uniforme
6. CURAR: Tiempo completo antes de cargar

Para aluminio: Tratamiento Alodine o primer
Para composites: Lijar + limpiar
Para madera: Lijar + sellar poros
```

---

## 8. Seleccion de Materiales para Nuestro UAV

### Matriz de Decision

| Componente | Material Opcion 1 | Material Opcion 2 | Seleccion |
|------------|-------------------|-------------------|-----------|
| Larguero ala | 7075-T6 tubo | CFRP tubo | CFRP (peso critico) |
| Costillas | Contrachapado 3mm | PLA impreso | Contrachapado (costo) |
| Piel ala | GFRP tejido | Film termico | GFRP (durabilidad) |
| Fuselaje | GFRP sobre espuma | Impresion 3D | GFRP (aeronautico) |
| Soporte motor | 6061-T6 | PA-CF impreso | 6061-T6 (vibracion) |
| Carenados | GFRP | ASA impreso | ASA (facilidad) |
| Empenaje | Espuma + GFRP | Madera balsa | Espuma + GFRP |

### Justificacion por Componente

```
LARGUERO: CFRP
- Momento flector critico
- Ahorro de peso: 40% vs aluminio
- Costo adicional: ~$30 USD

COSTILLAS: Contrachapado
- No cargan directamente
- Facil de cortar
- Muy economico: ~$5 USD total

PIEL: GFRP
- Resistencia a danos
- Acabado profesional
- Costo moderado: ~$40 USD

FUSELAJE: Espuma XPS + GFRP
- Excelente rigidez/peso
- Proceso conocido
- Costo: ~$50 USD
```

---

## 9. Costo Estimado de Materiales

### Desglose para UAV 4.5 kg

| Material | Cantidad | Precio Unit. | Total (USD) |
|----------|----------|--------------|-------------|
| Tubo CFRP 20mm x 1m | 2 | $15 | $30 |
| Tela GFRP 200g/m^2 | 3 m^2 | $8 | $24 |
| Resina epoxi 1kg | 1 | $25 | $25 |
| Contrachapado 3mm | 1 placa | $10 | $10 |
| Espuma XPS 50mm | 1 placa | $8 | $8 |
| Adhesivo epoxi | 2 tubos | $5 | $10 |
| Filamento PA-CF 500g | 1 | $40 | $40 |
| Herrajes 6061-T6 | varios | $20 | $20 |
| **TOTAL MATERIALES** | | | **~$170 USD** |

---

## 10. Uso de IA para Seleccion de Materiales

### Prompt para Comparar Materiales

```
Necesito seleccionar material para el larguero de mi UAV.

Requisitos:
- Momento flector maximo: 75 N*m
- Longitud: 1 m (semi-envergadura)
- Factor de seguridad: 2.0
- Minimizar peso

Opciones:
1. Tubo aluminio 7075-T6
2. Tubo CFRP pultruido
3. Viga I de abeto

Para cada opcion:
1. Dimensiona la seccion necesaria
2. Calcula el peso
3. Estima el costo
4. Recomienda cual usar
```

### Prompt para Verificar Propiedades

```
Verifica si estos datos de materiales son correctos
para mi analisis FEA:

Material: 6061-T6
- E = 69 GPa
- Yield = 276 MPa
- Densidad = 2700 kg/m3
- Poisson = 0.33

Si hay errores, corrígelos y proporciona fuente.
```

---

## Resumen: Materiales Recomendados por Aplicacion

| Aplicacion | Mejor Opcion | Alternativa Economica |
|------------|--------------|----------------------|
| Larguero principal | CFRP tubo | 7075-T6 tubo |
| Costillas | Contrachapado | PLA impreso |
| Piel de ala | GFRP 200g/m^2 | Film termico |
| Nucleo sandwich | Balsa 3mm | XPS 6mm |
| Fuselaje | GFRP/espuma | Impresion 3D |
| Soporte motor | 6061-T6 | PA-CF impreso |

---

*Siguiente: 03-fea-tutorial.md*
