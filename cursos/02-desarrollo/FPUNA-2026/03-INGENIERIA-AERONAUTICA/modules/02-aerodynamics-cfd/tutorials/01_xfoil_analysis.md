### Tutorial Paso a Paso: Analizar NACA 4412 con XFoil

**Objetivo**: Obtener la polar (CL vs α) del perfil NACA 4412 a Re = 500,000

#### Paso 1: Iniciar XFoil

```bash
$ xfoil
```

#### Paso 2: Cargar o Crear Perfil

```bash
# Opción A: Cargar desde archivo .dat
XFOIL c> LOAD naca4412.dat

# Opción B: Generar perfil NACA
XFOIL c> NACA 4412

# Verificar geometría
XFOIL c> GDES
```

**Comandos útiles en GDES**:
- `PLOT` - Visualizar perfil
- `MODI` - Suavizar coordenadas (útil para archivos externos)
- `EXEC` - Volver al menú principal

#### Paso 3: Configurar Panel (Opcional pero Recomendado)

```bash
XFOIL c> PPAR
.PANE c> N 200           # 200 paneles (default: 160)
.PANE c>                 # Enter para aplicar
```
**Más paneles = Mayor resolución, pero más lento**

#### Paso 4: Entrar a Modo Operación

```bash
XFOIL c> OPER
```

#### Paso 5: Activar Análisis Viscoso

```bash
# Definir número de Reynolds
.OPERv c> VISC 500000

# Activar cálculo viscoso
.OPERv c> V 1

# Opcional: Definir Mach number
.OPERv c> MACH 0.0       # Incompresible
```
**Nota**: Re = 500,000 es típico para UAVs pequeños y modelos RC.

#### Paso 6: Analizar Ángulos de Ataque

```bash
# Secuencia automática (Recomendado)
.OPERv c> ASEQ -4 16 2   # Desde -4° hasta 16° en pasos de 2°
```

#### Paso 7: Acumular y Guardar Datos

```bash
# Activar acumulación de polar
.OPERv c> PACC
 Enter polar save filename OR  <return> for no file
naca4412_Re500k.txt
 Enter polar dump filename OR  <return> for no file
<Enter>
```

#### Paso 8: Visualizar y Salir
```bash
# Graficar polar
.OPERv c> VPLO

# Salir
.OPERv c> QUIT
XFOIL c> QUIT
```

### Interpretación de Resultados

- **alpha**: Ángulo de ataque [°]
- **CL**: Coeficiente de sustentación
- **CD**: Coeficiente de resistencia
- **CM**: Coeficiente de momento
- **Top_Xtr / Bot_Xtr**: Punto de transición de flujo laminar a turbulento.

### Troubleshooting XFoil

- **"VISCAL:  Convergence failed"**: El flujo se ha separado (stall). Reduce el paso de los ángulos de ataque.
- **Resultados incorrectos**: Geometría mal definida o pocos paneles. Aumenta a 200-300 paneles.
