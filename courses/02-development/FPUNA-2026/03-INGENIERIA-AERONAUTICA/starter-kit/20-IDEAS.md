# 20 Ideas para Usar IA en Ingeniería Aeronáutica

## Progresión: Principiante → Intermedio → Avanzado

---

# NIVEL PRINCIPIANTE (Ideas 1-7)
*Cálculos básicos, comprensión de conceptos fundamentales*

---

## 1. Calculadora de Propiedades del Aire
**Qué:** Calcular densidad, viscosidad y velocidad del sonido según altitud.

```bash
claude "Calcula las propiedades del aire:

Altitud: 2000 metros sobre el nivel del mar
Modelo: Atmósfera Estándar Internacional (ISA)

Necesito:
1. Temperatura a esa altitud
2. Presión atmosférica
3. Densidad del aire (ρ)
4. Viscosidad dinámica (μ)
5. Velocidad del sonido

Muestra las fórmulas utilizadas y explica
por qué cambian con la altitud."
```

**Aprenderás:** Atmósfera estándar, propiedades del aire.

---

## 2. Número de Reynolds y Tipo de Flujo
**Qué:** Calcular Re y determinar si el flujo es laminar o turbulento.

```bash
claude "Calcula el número de Reynolds:

Datos:
- Cuerda del ala: 0.8 m
- Velocidad de vuelo: 30 m/s
- Altitud: 500 m (usa ISA para propiedades)

Necesito:
1. Fórmula del número de Reynolds
2. Valor calculado
3. ¿Es flujo laminar o turbulento?
4. ¿Qué significa esto para el arrastre?
5. Comparar con Re típico de un avión comercial"
```

**Aprenderás:** Número de Reynolds, transición laminar-turbulento.

---

## 3. Cálculo Básico de Sustentación
**Qué:** Calcular la sustentación de un ala simple.

```bash
claude "Calcula la sustentación de esta ala:

Datos del ala:
- Envergadura: 10 m
- Cuerda constante: 1.5 m
- Perfil: NACA 2412
- Ángulo de ataque: 5°

Condiciones de vuelo:
- Velocidad: 40 m/s
- Altitud: nivel del mar

Necesito:
1. Superficie alar (S)
2. CL aproximado para ese ángulo (usa gráficas típicas NACA 2412)
3. Sustentación generada (L)
4. ¿Cuánto peso puede sostener este ala?"
```

**Aprenderás:** Ecuación de sustentación, coeficientes.

---

## 4. Entender un Perfil NACA de 4 Dígitos
**Qué:** Decodificar la nomenclatura NACA.

```bash
claude "Explica el perfil NACA 2412:

Desglosa cada dígito:
1. ¿Qué significa el '2'?
2. ¿Qué significa el '4'?
3. ¿Qué significa el '12'?

Luego:
4. Dibuja la forma aproximada (ASCII)
5. ¿Para qué tipo de avión es adecuado?
6. Compara brevemente con NACA 0012 y NACA 4415
7. Características típicas: CL_max, ángulo de stall"
```

**Aprenderás:** Nomenclatura NACA, selección de perfiles.

---

## 5. Velocidad de Pérdida (Stall)
**Qué:** Calcular la velocidad mínima de vuelo.

```bash
claude "Calcula la velocidad de stall:

Datos de la aeronave:
- Peso: 800 kg
- Superficie alar: 12 m²
- CL_max (sin flaps): 1.4
- CL_max (con flaps): 2.0
- Altitud de vuelo: nivel del mar

Calcula:
1. V_stall sin flaps
2. V_stall con flaps
3. ¿Por qué los flaps reducen la velocidad de stall?
4. Velocidad de aproximación recomendada (1.3 × V_stall)
5. Cómo cambia V_stall a mayor altitud"
```

**Aprenderás:** Stall, velocidad mínima, flaps.

---

## 6. Arrastre Parásito vs Inducido
**Qué:** Entender los componentes del arrastre.

```bash
claude "Explica los tipos de arrastre:

Para una aeronave con:
- CD0 = 0.025 (coeficiente de arrastre parásito)
- AR = 7 (aspect ratio)
- e = 0.8 (factor de eficiencia)

Necesito:
1. ¿Qué es arrastre parásito? ¿Qué lo causa?
2. ¿Qué es arrastre inducido? ¿Qué lo causa?
3. Fórmula del arrastre inducido
4. Calcula CD total para CL = 0.4, 0.8, 1.2
5. ¿A qué velocidad el arrastre total es mínimo?
6. Gráfica ASCII de CD vs CL"
```

**Aprenderás:** Componentes de arrastre, polar de arrastre.

---

## 7. Aspect Ratio y su Efecto
**Qué:** Entender la relación envergadura/cuerda.

```bash
claude "Explica el Aspect Ratio (AR):

Compara tres alas con la misma superficie (10 m²):
1. AR = 4 (envergadura 6.32m, cuerda 1.58m)
2. AR = 8 (envergadura 8.94m, cuerda 1.12m)
3. AR = 16 (envergadura 12.65m, cuerda 0.79m)

Para cada una:
1. Dibujo ASCII proporcional
2. Arrastre inducido relativo
3. Ventajas y desventajas
4. Qué tipo de avión usa ese AR
5. Limitaciones estructurales"
```

**Aprenderás:** Aspect ratio, eficiencia vs estructura.

---

# NIVEL INTERMEDIO (Ideas 8-14)
*Diseño integrado, análisis de performance, iteración*

---

## 8. Polar de Arrastre Completa
**Qué:** Generar la curva característica del avión.

```bash
claude "Genera la polar de arrastre:

Datos de la aeronave:
- CD0 = 0.028
- AR = 7.5
- e = 0.82
- CL_max = 1.5

Genera:
1. Tabla: CL (0 a 1.5, paso 0.1) vs CD
2. Calcular (L/D) para cada punto
3. Identificar CL de máxima eficiencia
4. (L/D)_max
5. Código Python para graficar la polar
6. Comparar con valores típicos de aviones similares"
```

**Aprenderás:** Polar de arrastre, eficiencia máxima.

---

## 9. Dimensionamiento Inicial de Ala
**Qué:** Sizing del ala para requisitos de misión.

```bash
claude "Dimensiona el ala para este UAV:

Requisitos de misión:
- Peso máximo de despegue: 20 kg
- Velocidad de crucero objetivo: 25 m/s
- Altitud de operación: 500 m
- V_stall máxima permitida: 12 m/s

Diseña:
1. CL_max necesario para el stall requerido
2. Superficie alar mínima
3. Carga alar resultante (W/S)
4. Envergadura (asumiendo AR = 8)
5. Cuerda media
6. Perfil recomendado para estas condiciones
7. Verificar que el diseño cierra"
```

**Aprenderás:** Sizing, trade-offs, iteración.

---

## 10. Análisis de Crucero y Alcance
**Qué:** Calcular cuánto puede volar la aeronave.

```bash
claude "Calcula el alcance de esta aeronave:

Datos:
- Peso vacío: 400 kg
- Peso de combustible: 80 kg
- Peso de carga útil: 120 kg
- Consumo específico: 0.35 kg/kW·h
- Potencia del motor: 100 kW
- (L/D)_max: 12
- Velocidad de crucero: 50 m/s

Calcula:
1. Peso al despegue
2. Peso al aterrizar (combustible agotado)
3. Alcance usando ecuación de Breguet
4. Autonomía (horas de vuelo)
5. Velocidad de máximo alcance vs crucero actual
6. ¿Conviene volar más lento o más rápido?"
```

**Aprenderás:** Ecuación de Breguet, consumo, optimización.

---

## 11. Diseño de Estabilizador Horizontal
**Qué:** Dimensionar el empenaje para estabilidad.

```bash
claude "Diseña el estabilizador horizontal:

Datos del ala principal:
- Superficie: 12 m²
- MAC (cuerda media aerodinámica): 1.2 m
- Posición del borde de ataque: 2.0 m desde morro

Fuselaje:
- Longitud total: 7 m
- CG estimado: 2.5 m desde morro

Requisitos:
- Margen estático: 10-15% MAC
- Coeficiente de volumen horizontal típico: 0.5-0.7

Calcula:
1. Brazo de palanca del empenaje
2. Superficie del estabilizador horizontal
3. Envergadura y cuerda del estabilizador
4. Perfil recomendado (simétrico o no)
5. Verificar margen estático"
```

**Aprenderás:** Estabilidad longitudinal, coeficientes de volumen.

---

## 12. Performance de Ascenso
**Qué:** Calcular razón de ascenso y techo de servicio.

```bash
claude "Analiza el performance de ascenso:

Datos:
- Peso: 1200 kg
- Superficie alar: 16 m²
- Potencia disponible: 180 HP
- CD0: 0.027
- AR: 8, e: 0.8
- Eficiencia de hélice: 0.75

Calcula:
1. Potencia requerida vs disponible (curvas)
2. Exceso de potencia máximo
3. Velocidad de mejor razón de ascenso (Vy)
4. Razón de ascenso máxima (ROC) a nivel del mar
5. Techo de servicio (donde ROC = 100 ft/min)
6. Código Python para las curvas"
```

**Aprenderás:** Curvas de potencia, ROC, techo.

---

## 13. Diagrama V-n de Maniobras
**Qué:** Definir la envolvente de vuelo.

```bash
claude "Genera el diagrama V-n:

Datos de la aeronave:
- Categoría: Normal
- Peso: 900 kg
- Superficie alar: 14 m²
- CL_max positivo: 1.5
- CL_max negativo: -1.0
- VNE: 80 m/s

Factores de carga límite (FAR 23 Normal):
- Positivo: +3.8g
- Negativo: -1.52g

Genera:
1. Velocidad de maniobra (VA)
2. Curva de stall positiva
3. Curva de stall negativa
4. Líneas límite de factor de carga
5. Envolvente completa
6. Código Python para graficar"
```

**Aprenderás:** Factores de carga, envolvente, VA.

---

## 14. Análisis de Despegue
**Qué:** Calcular distancia de pista necesaria.

```bash
claude "Calcula la distancia de despegue:

Datos:
- MTOW: 1000 kg
- Superficie alar: 15 m²
- CL en carrera: 0.8
- CL en rotación: 1.5
- CD0: 0.03
- Thrust estático: 2500 N
- Altitud de pista: 300 m
- μ (fricción de rodamiento): 0.025

Calcula:
1. V_LOF (velocidad de despegue = 1.1 × V_stall)
2. Aceleración media durante la carrera
3. Distancia de carrera en tierra
4. Distancia de transición al ascenso
5. Distancia total hasta 15 m de altura
6. Efecto del viento de frente (10 kt)"
```

**Aprenderás:** Fases de despegue, cálculo de distancias.

---

# NIVEL AVANZADO (Ideas 15-20)
*Diseño completo de aeronave, análisis CFD, optimización*

---

## 15. Análisis Paramétrico de Diseño
**Qué:** Explorar el espacio de diseño sistemáticamente.

```bash
claude "Realiza análisis paramétrico:

Fijar:
- MTOW: 1500 kg
- Velocidad de crucero: 60 m/s
- CD0: 0.028

Variar:
- Aspect Ratio: 6, 8, 10, 12
- Carga alar (W/S): 40, 60, 80, 100 kg/m²

Para cada combinación calcular:
1. Superficie alar
2. Envergadura
3. V_stall
4. (L/D)_max
5. Potencia requerida en crucero

Genera:
1. Tabla de resultados
2. Código Python para superficie de respuesta 3D
3. Recomendación del punto de diseño óptimo
4. Trade-offs identificados"
```

**Aprenderás:** Análisis paramétrico, optimización multi-objetivo.

---

## 16. Diseño de Control de Alabeo
**Qué:** Dimensionar alerones para tasa de alabeo requerida.

```bash
claude "Dimensiona los alerones:

Datos del ala:
- Envergadura: 12 m
- Cuerda: 1.5 m constante
- Velocidad de diseño: 55 m/s

Requisito:
- Tasa de alabeo mínima: 60°/s a velocidad de diseño
- Deflexión máxima de alerón: ±25°

Diseña:
1. Posición de alerones (desde qué % a qué % de envergadura)
2. Cuerda del alerón (% de cuerda del ala)
3. Momento de alabeo requerido
4. Derivada de control Clδa
5. Momento de bisagra y fuerza en el stick
6. Verificación de autoridad de control"
```

**Aprenderás:** Diseño de superficies de control, autoridad.

---

## 17. Análisis Estructural del Larguero
**Qué:** Dimensionar el larguero principal del ala.

```bash
claude "Diseña el larguero principal del ala:

Datos del ala:
- Semienvergadura: 6 m
- Cuerda raíz: 1.5 m, cuerda punta: 0.8 m
- Sustentación total: 12000 N (caso de maniobra 3g)
- Distribución de sustentación: elíptica
- Peso del ala: 50 kg (distribución lineal)

Material: Aluminio 6061-T6
- σ_yield: 276 MPa
- E: 69 GPa

Diseña:
1. Distribución de cortante a lo largo del ala
2. Distribución de momento flector
3. Momento máximo en la raíz
4. Sección del larguero (viga I o C)
5. Verificación de esfuerzo vs allowable
6. Factor de seguridad"
```

**Aprenderás:** Cargas estructurales, dimensionamiento.

---

## 18. Balance de Pesos y CG
**Qué:** Análisis completo de pesos y centrado.

```bash
claude "Realiza balance de pesos:

Aeronave: Ultraligero monoplaza
MTOW objetivo: 350 kg

Componentes conocidos:
- Motor Rotax 447: 30 kg @ x=0.2m
- Hélice: 5 kg @ x=0.0m
- Tanque combustible (20L): variable @ x=1.0m
- Piloto: 80 kg @ x=1.8m

Componentes a estimar:
- Ala
- Fuselaje
- Empenaje
- Tren de aterrizaje
- Sistemas

Genera:
1. Estimación de peso de cada componente
2. Posición estimada de cada componente
3. Tabla completa de pesos
4. CG vacío y CG MTOW
5. Envelope de CG (peso vs posición)
6. ¿Está el CG dentro de límites (20-30% MAC)?"
```

**Aprenderás:** Estimación de pesos, balance, CG envelope.

---

## 19. Setup para Análisis CFD
**Qué:** Preparar simulación de flujo computacional.

```bash
claude "Prepara análisis CFD del ala:

Geometría:
- Perfil: NACA 4415
- Cuerda: 1.0 m
- Análisis 2D (sección)

Condiciones:
- Velocidad: 30 m/s
- Ángulo de ataque: 0°, 4°, 8°, 12°
- Altitud: nivel del mar

Para OpenFOAM o similar:
1. Dominio computacional recomendado
2. Condiciones de frontera
3. Mallado: número de celdas, refinamiento en capa límite
4. Modelo de turbulencia recomendado (k-ω SST)
5. Parámetros de convergencia
6. Qué resultados extraer (Cp, Cf, CL, CD)"
```

**Aprenderás:** CFD, mallado, modelos de turbulencia.

---

## 20. Diseño Conceptual Completo de UAV
**Qué:** Integrar todo en un diseño de aeronave.

```bash
claude "Diseño conceptual completo de UAV de vigilancia:

Requisitos de misión:
- Alcance: 50 km
- Autonomía: 2 horas
- Carga útil: cámara de 2 kg
- Altitud de operación: 500 m
- Velocidad de crucero: 25 m/s
- Lanzamiento: catapulta o despegue corto

Diseña:
1. Estimación inicial de peso (método fracción de combustible)
2. Configuración general (ala alta/media, cola convencional/V)
3. Dimensionamiento del ala
4. Selección de motor/hélice (eléctrico)
5. Dimensionamiento de batería
6. Diseño de empenaje
7. Posición de CG
8. Performance estimado
9. Diagrama 3-vistas ASCII
10. Tabla resumen de especificaciones

Justifica cada decisión de diseño."
```

**Aprenderás:** Diseño conceptual, integración, trade-offs.

---

## Herramientas Recomendadas por Nivel

### Principiante
- Calculadora científica
- Excel/Google Sheets para tablas
- XFLR5 para visualizar perfiles

### Intermedio
- Python con NumPy, Matplotlib
- XFLR5 para análisis de estabilidad
- OpenVSP para modelado 3D

### Avanzado
- OpenFOAM para CFD
- ANSYS/SolidWorks para FEM
- MATLAB/Simulink para control

---

## Verificación de Resultados

### Valores típicos de referencia:
- Planeador: (L/D) ≈ 30-50
- Avión ligero: (L/D) ≈ 10-15
- UAV eficiente: (L/D) ≈ 15-25
- Carga alar avión ligero: 40-80 kg/m²
- AR avión ligero: 6-10
- CD0 avión ligero: 0.02-0.04

### Si tus resultados son muy diferentes:
1. Verifica unidades (SI siempre)
2. Revisa fórmulas
3. Compara con datos de aeronaves reales similares
4. Consulta referencias (Raymer, Anderson)

---

# BONUS: IDEAS CON MCP (Automatizacion Avanzada)
*Usando Model Context Protocol para automatizar tareas tediosas*

---

## 21. Analisis de Perfil 1000x Mas Rapido (NeuralFoil)
**Que:** Analizar perfiles con IA en milisegundos en lugar de segundos.

```python
# Instalar: pip install neuralfoil
from neuralfoil import get_aero_from_airfoil_name
import numpy as np

# Analizar NACA 2412 a multiples angulos INSTANTANEAMENTE
for alpha in range(-5, 16):
    aero = get_aero_from_airfoil_name("naca2412", alpha=alpha, Re=500000)
    print(f"alpha={alpha:3d}  CL={aero['CL']:6.3f}  CD={aero['CD']:7.5f}  L/D={aero['CL']/aero['CD']:6.1f}")
```

**Impacto:** Lo que tomaba horas con XFOIL ahora toma segundos.

---

## 22. Diseno Parametrico de Aeronaves (AeroSandbox)
**Que:** Disenar y optimizar aeronaves completas con codigo Python.

```python
# Instalar: pip install aerosandbox
import aerosandbox as asb

# Crear UAV parametricamente
wing = asb.Wing(
    name="Main Wing",
    symmetric=True,
    xsecs=[
        asb.WingXSec(xyz_le=[0, 0, 0], chord=0.4, airfoil=asb.Airfoil("naca4412")),
        asb.WingXSec(xyz_le=[0.05, 2, 0.1], chord=0.2, airfoil=asb.Airfoil("naca4412")),
    ]
)

airplane = asb.Airplane(name="Mi UAV", wings=[wing])
airplane.draw()  # Visualizacion 3D instantanea!
```

**Impacto:** Disenar variaciones de aeronaves en minutos, no dias.

---

## 23. Optimizacion Genetica de Perfiles
**Que:** Dejar que la IA evolucione el perfil optimo para tu mision.

```python
# Instalar: pip install deap neuralfoil
from deap import base, creator, tools, algorithms
from neuralfoil import get_aero_from_airfoil_name

# La IA prueba cientos de perfiles NACA
# y evoluciona hacia el optimo automaticamente
# Ver: 03_genetic_optimization_demo.py
```

**Impacto:** Encontrar perfiles que un humano nunca hubiera probado.

---

## 24. CAD Automatico con Fusion 360 MCP
**Que:** Crear modelos 3D con lenguaje natural.

```
Prompt al MCP: "Crea en Fusion 360 un fuselaje de UAV:
- Longitud: 1.5 metros
- Diametro maximo: 0.2 metros
- Nariz ojival de 0.3m
- Cola que se estrecha a 0.08m de diametro
- Agrega montaje para camara en la parte inferior"

El MCP ejecuta los comandos directamente en Fusion 360!
```

**Impacto:** Modelar en minutos lo que tomaria horas aprendiendo CAD.

---

## 25. CFD Setup Automatico con OpenFOAM MCP
**Que:** Configurar simulaciones CFD complejas con instrucciones simples.

```
Prompt al MCP: "Configura simulacion OpenFOAM para:
- Perfil NACA 0012
- Reynolds 500,000
- Angulo de ataque 5 grados
- Solver simpleFoam
- Modelo de turbulencia k-omega SST
- Malla refinada cerca del perfil"

El MCP genera todos los archivos de configuracion!
```

**Impacto:** Saltear horas de configuracion manual de OpenFOAM.

---

## 26. Calculos Matriciales con MATLAB MCP
**Que:** Ejecutar analisis complejos sin escribir codigo MATLAB.

```
Prompt al MCP: "En MATLAB, calcula los modos de vibracion
del ala con estas propiedades:
- Longitud: 5 metros
- 10 elementos finitos
- Masa distribuida: 2 kg/m
- EI = 50000 Nm2

Grafica los primeros 3 modos y sus frecuencias naturales"

MATLAB ejecuta y devuelve resultados y graficos!
```

**Impacto:** Usar MATLAB sin memorizar sintaxis.

---

## 27. Trade Studies Automatizados
**Que:** Explorar espacios de diseno masivos automaticamente.

```python
# Con AeroSandbox + bucles automaticos
import aerosandbox as asb
import numpy as np

# Variar 3 parametros, calcular 1000 combinaciones
for AR in np.linspace(6, 12, 10):
    for wing_loading in np.linspace(30, 80, 10):
        for CD0 in np.linspace(0.02, 0.04, 10):
            # Calcular performance para cada combinacion
            # Generar superficie de respuesta
            pass

# Resultado: mapa completo del espacio de diseno
```

**Impacto:** Ver todo el espacio de diseno en una hora.

---

## 28. Documentacion Automatica
**Que:** Generar reportes tecnicos a partir de calculos.

```
Prompt: "Genera un reporte tecnico de mi UAV con:
- Especificaciones calculadas (de CLAUDE.md)
- Diagramas 3-vistas (de resultados)
- Tabla de performance
- Graficos de polares
- Conclusiones y recomendaciones

Formato: Markdown listo para PDF"

Claude genera el documento completo!
```

**Impacto:** Documentar en minutos, no horas.

---

## 29. Validacion Cruzada de Resultados
**Que:** Verificar calculos contra multiples fuentes.

```
Prompt: "Valida mis resultados de diseno:

Mi calculo:
- V_stall = 22 m/s
- (L/D)_max = 15
- Alcance = 200 km

Compara con:
1. Recalculo usando diferentes formulas
2. Datos de aeronaves similares (Cessna 152, Piper Cub)
3. Correlaciones empiricas de Raymer

Identifica cualquier inconsistencia"
```

**Impacto:** Detectar errores antes de que sean problemas.

---

## 30. Asistente de Debugging de Diseno
**Que:** Diagnosticar problemas de diseno automaticamente.

```
Prompt: "Mi UAV no cumple el requisito de alcance.
Especificaciones: [datos del diseno]
Requisito: 100 km de alcance
Calculado: 65 km de alcance

Diagnostica:
1. Que parametro tiene mayor impacto en alcance?
2. Cuanto tendria que cambiar cada parametro?
3. Cual es el cambio mas factible?
4. Hay trade-offs que debo considerar?
5. Propuesta de solucion ordenada por impacto"
```

**Impacto:** Resolver problemas de diseno sistematicamente.

---

## Instalacion de Herramientas para Ideas MCP

```bash
# Herramientas esenciales de IA
pip install neuralfoil aerosandbox deap

# MCPs (configurar en Claude Desktop)
pip install numpy-mcp mcp-server-fetch

# Verificar instalacion
python -c "import neuralfoil, aerosandbox; print('OK!')"
```

---

## Recursos para MCPs

- **MCP-AUTOMATION.md**: Guia completa de automatizacion
- **Demos**: starter-kit/examples/ai-demos/
- **Repositorios MCP**: github.com/modelcontextprotocol/servers

---

*20-IDEAS.md para Ingeniería Aeronáutica - FPUNA 2026*
