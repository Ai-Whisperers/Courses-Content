# Tutorial XFLR5: Analisis de Perfiles y Alas

## 1. Introduccion a XFLR5

XFLR5 es una herramienta gratuita para analisis aerodinamico de perfiles 2D y alas 3D. Combina:
- **XFoil**: Analisis de perfiles (2D)
- **VLM/3D Panel**: Analisis de alas completas

### Instalacion

1. Descargar de: https://sourceforge.net/projects/xflr5/
2. Ejecutar instalador
3. No requiere configuracion adicional

---

## 2. Interfaz de Usuario

### Areas Principales

```
+------------------------------------------+
|  Menu Bar                                |
+------------------------------------------+
|          |                               |
|  Panel   |      Area de Graficos         |
|  Lateral |                               |
|          |                               |
|          |                               |
+------------------------------------------+
|  Barra de Estado                         |
+------------------------------------------+
```

### Modos de Operacion

| Modo | Icono | Uso |
|------|-------|-----|
| **Direct Foil Design** | Perfil | Crear/editar perfiles |
| **XFoil Direct Analysis** | Polar | Analisis 2D |
| **Wing and Plane Design** | Avion | Disenar alas/aviones |
| **3D Panel Analysis** | 3D | Analisis alas 3D |

---

## 3. Importar Perfiles

### Desde Archivo .dat

1. **Foil -> Manage Foils -> Import**
2. Seleccionar archivo .dat
3. El perfil aparece en la lista

### Formato del Archivo .dat

```
NACA 2412
1.00000  0.00126
0.99619  0.00156
0.98477  0.00246
...
0.00000  0.00000
...
0.98477 -0.00146
0.99619 -0.00086
1.00000  0.00126
```

### Generar NACA en XFLR5

1. **Foil -> Manage Foils -> NACA Foils**
2. Ingresar designacion (ej: 2412)
3. Click **Generate**

---

## 4. Analisis de Perfiles (XFoil)

### Configurar Analisis

1. Cambiar a modo **XFoil Direct Analysis**
2. **Analysis -> Define an Analysis**
3. Configurar parametros:

| Parametro | Descripcion | Valor Tipico |
|-----------|-------------|--------------|
| Type | Tipo de analisis | Type 1 (fijo Re) |
| Reynolds | Numero de Reynolds | 250,000 |
| Mach | Numero de Mach | 0.0 (incompresible) |
| NCrit | Transicion | 9 (natural) |

### Ejecutar Analisis

1. **Analysis -> Batch Analysis**
2. Configurar rango de angulos:
   - Alpha min: -5 deg
   - Alpha max: 15 deg
   - Delta alpha: 0.5 deg
3. Click **Analyze**

### Interpretar Resultados

Graficos disponibles:
- **Cl vs Alpha**: Curva de sustentacion
- **Cd vs Alpha**: Curva de arrastre
- **Cl vs Cd**: Polar
- **Cl/Cd vs Alpha**: Eficiencia
- **Cm vs Alpha**: Momento de cabeceo

---

## 5. Leer la Polar

### Curva CL vs Alpha

```
CL
 ^
 |        * * * *    <- CL_max (stall)
 |      *        *
 |    *            * <- Stall region
 |  *
 | *
 |* 
 +---*----------------> Alpha
   *  <- CL = 0 (alpha_0)
```

### Parametros Clave

| Parametro | Como encontrar |
|-----------|----------------|
| CL_max | Valor maximo de CL |
| Alpha_stall | Alpha donde CL empieza a caer |
| Alpha_0 | Alpha donde CL = 0 |
| Cl_alpha | Pendiente de la curva lineal (~2*pi/rad) |

### Polar (CL vs CD)

```
CL
 ^
 |    *
 |   * *
 |  *   *
 | *     *
 |*       *
 +---------*--------> CD
          CD_min
```

El punto de **L/D maximo** es donde la linea desde el origen es tangente a la polar.

---

## 6. Comparar Perfiles

### Overlay de Polares

1. Importar multiples perfiles
2. Ejecutar analisis para cada uno (mismo Re)
3. En el grafico, ambas polares se superponen
4. Comparar visualmente

### Exportar Datos

1. **Polar -> Export**
2. Seleccionar formato (CSV, txt)
3. Usar en Python/Excel para comparacion detallada

---

## 7. Analisis de Alas 3D

### Crear Ala

1. Cambiar a modo **Wing and Plane Design**
2. **Plane -> Define a New Plane**
3. Configurar ala:

| Parametro | Descripcion |
|-----------|-------------|
| Wing span | Envergadura |
| Root chord | Cuerda raiz |
| Tip chord | Cuerda punta |
| Offset | Flecha |
| Dihedral | Diedro |
| Twist | Torsion |
| Foil | Perfil a usar |

### Definir Secciones

Para un ala con variacion:
1. Agregar secciones intermedias
2. Asignar perfil a cada seccion
3. Especificar posicion, cuerda, twist

### Ejecutar Analisis 3D

1. **Analysis -> Define an Analysis**
2. Seleccionar metodo:
   - **LLT**: Lifting Line Theory (rapido)
   - **VLM1/VLM2**: Vortex Lattice (mas preciso)
   - **3D Panels**: Mas preciso, mas lento

3. Configurar condiciones:
   - Velocidad o Cl fijo
   - Densidad
   - Viscosidad

---

## 8. Resultados 3D

### Distribucion de Sustentacion

Grafico que muestra como varia CL a lo largo de la envergadura.

- **Ideal**: Distribucion eliptica
- **Real**: Depende de geometria y twist

### Arrastre Inducido

XFLR5 calcula CDi directamente de la distribucion de circulacion.

### Centro Aerodinamico

Posicion donde el momento de cabeceo es constante con alpha.

---

## 9. Ejercicio Guiado

### Objetivo

Analizar NACA 4412 a Re = 300,000 y extraer parametros clave.

### Pasos

1. Generar perfil NACA 4412
2. Crear analisis Type 1, Re = 300,000
3. Batch analysis: -5 a 15 grados
4. Registrar:
   - CL_max = ____
   - Alpha_stall = ____ deg
   - CD_min = ____
   - (L/D)_max = ____
   - Alpha @ (L/D)_max = ____ deg

5. Exportar polar a CSV

---

## 10. Troubleshooting

### "Analysis failed to converge"

**Causas**:
- Alpha muy cerca de stall
- Perfil con geometria problematica
- NCrit muy bajo

**Soluciones**:
- Reducir rango de alpha
- Verificar geometria del perfil
- Aumentar NCrit a 9-11

### "No polar to show"

**Causa**: No se ha ejecutado analisis

**Solucion**: Ejecutar Batch Analysis

### Resultados Inconsistentes

**Causa posible**: Re incorrecto para los datos que comparas

**Solucion**: Verificar que todos los analisis usan el mismo Re

---

## 11. Tips Avanzados

### NCrit

El parametro NCrit controla donde ocurre la transicion laminar-turbulento:
- NCrit = 9: Ambiente tipico (algo de turbulencia)
- NCrit = 11: Ambiente muy calmo
- NCrit = 5: Ambiente muy turbulento

Para UAV en campo (agricultura): usar NCrit = 7-9

### Multiples Reynolds

Ejecutar analisis a varios Re para ver sensibilidad:
- Re = 150,000 (velocidad baja)
- Re = 250,000 (crucero)
- Re = 400,000 (velocidad alta)

### Guardar Proyecto

**File -> Save Project** guarda todo: perfiles, analisis, resultados.

---

*Siguiente: 03-analisis-alas.md*
