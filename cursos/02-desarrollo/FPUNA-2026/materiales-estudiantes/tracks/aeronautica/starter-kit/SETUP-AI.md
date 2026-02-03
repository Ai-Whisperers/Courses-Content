# SETUP-AI.md - Configuración de Proyectos Aeronáuticos con IA

## Prompts para que la IA Configure tu Proyecto de Diseño

---

## 1. Inicialización de Proyecto de Diseño

```bash
claude "Inicializa mi proyecto de diseño aeronáutico:

Nombre: [nombre del proyecto]
Tipo: [UAV / Ultraligero / Planeador / Análisis]
Objetivo: [descripción de la misión]

Crea:
1. Estructura de carpetas para análisis y documentación
2. README.md con plantilla de especificaciones
3. Archivo de parámetros de diseño (JSON o Python dict)
4. Script base para cálculos (calc_aero.py)
5. Template de memoria técnica en Markdown
6. .gitignore para proyectos de ingeniería"
```

---

## 2. Definición de Requisitos de Misión

```bash
claude "Define los requisitos de diseño para:

Misión: [vigilancia / transporte / entrenamiento / recreativo]
Carga útil: [X] kg
Alcance deseado: [X] km
Autonomía: [X] horas
Altitud de operación: [X] m
Velocidad de crucero: [X] m/s (o 'determinar')

Genera:
1. Tabla de requisitos de misión completa
2. Restricciones derivadas (peso, potencia, etc.)
3. Requisitos de performance derivados
4. Comparación con aeronaves similares existentes
5. Feasibility inicial del proyecto"
```

---

## 3. Configuración de Ambiente de Cálculo Python

```bash
claude "Configura el ambiente Python para cálculos aeronáuticos:

Crea:
1. requirements.txt con:
   - numpy, scipy, matplotlib
   - pandas (para tablas de datos)
   - ambiance (atmósfera estándar)

2. Módulo 'aero_utils.py' con funciones para:
   - Propiedades atmosféricas por altitud
   - Conversión de unidades
   - Cálculo de números adimensionales (Re, Ma)

3. Módulo 'wing_calcs.py' con:
   - Cálculo de sustentación
   - Polar de arrastre
   - Velocidad de stall

4. Jupyter notebook template para análisis"
```

---

## 4. Base de Datos de Perfiles NACA

```bash
claude "Configura base de datos de perfiles:

Perfiles a incluir:
- Serie 4 dígitos: 0012, 2412, 4412, 4415
- Serie 5 dígitos: 23012, 23015
- Serie 6: 63-212, 64-215

Para cada perfil genera diccionario con:
1. Coeficientes aerodinámicos típicos (Cl_max, Cd_min, Cm_0)
2. Coordenadas del perfil (x/c, y/c)
3. Reynolds de referencia
4. Aplicaciones típicas
5. Script para graficar cualquier perfil"
```

---

## 5. Herramientas de Análisis de Ala

```bash
claude "Crea herramientas de análisis de ala:

Parámetros de entrada:
- Envergadura (b)
- Superficie (S)
- Taper ratio (λ)
- Perfil seleccionado

Genera código Python para:
1. Calcular AR, MAC, posición del MAC
2. Distribución de sustentación (elíptica y real)
3. Distribución de cuerda a lo largo de la envergadura
4. Polar del ala completa (CDi incluido)
5. Factor de eficiencia de Oswald estimado
6. Gráficos de resultados (matplotlib)"
```

---

## 6. Análisis de Performance

```bash
claude "Configura análisis de performance:

Datos de la aeronave:
- MTOW: [X] kg
- S: [X] m²
- CD0: [X]
- AR: [X], e: [X]
- Potencia disponible: [X] HP / Thrust: [X] N

Genera código para:
1. Curvas de potencia requerida vs disponible
2. Velocidades características (stall, min drag, max range, max endurance)
3. Tasa de ascenso máxima
4. Techo de servicio
5. Diagrama de hodógrafo
6. Alcance y autonomía (Breguet si aplica)

Todo con gráficos publicables"
```

---

## 7. Análisis de Estabilidad

```bash
claude "Configura análisis de estabilidad longitudinal:

Datos geométricos:
- Posición del ala: [X] m del morro
- MAC: [X] m
- Posición del CG: [X]% MAC
- Empenaje horizontal: S_t=[X] m², l_t=[X] m

Genera código para:
1. Calcular coeficiente de volumen del empenaje
2. Contribuciones a Cm_alpha (ala, fuselaje, empenaje)
3. Punto neutro
4. Margen estático
5. Diagrama Cm vs alpha
6. Verificación de estabilidad (pasa/no pasa)"
```

---

## 8. Estimación de Pesos

```bash
claude "Configura estimación de pesos:

Categoría: [ultraligero / LSA / UAV pequeño]
MTOW objetivo: [X] kg
Tipo de estructura: [composites / metal / mixto]

Genera:
1. Fórmulas de estimación por componente (Raymer/Roskam)
2. Spreadsheet en Python/Pandas con:
   - Estructura (ala, fuselaje, empenaje, tren)
   - Propulsión (motor, hélice, combustible)
   - Sistemas (controles, aviónica)
   - Carga útil
3. Estimación de posición del CG
4. Gráfico de distribución de pesos
5. Margen de peso disponible"
```

---

## 9. Diseño de Propulsión

```bash
claude "Configura análisis de propulsión:

Tipo: [eléctrico / combustión]
Requisitos:
- Thrust en crucero: [X] N
- Velocidad de crucero: [X] m/s
- Thrust en despegue: [X] N

Genera código para:
1. Selección de motor (base de datos típicos)
2. Dimensionamiento de hélice (diámetro, paso)
3. Matching motor-hélice
4. Eficiencia propulsiva vs velocidad
5. Autonomía con batería/combustible dado
6. Gráfico de performance del sistema"
```

---

## 10. Análisis Estructural Básico

```bash
claude "Configura análisis de cargas en ala:

Datos:
- Envergadura: [X] m
- MTOW: [X] kg
- Factor de carga de diseño: [X] g
- Distribución de sustentación: [elíptica/real]

Genera código para:
1. Distribución de sustentación (N/m)
2. Diagrama de cortante (V)
3. Diagrama de momento flector (M)
4. Momento torsor (si hay flecha)
5. Sección crítica identificada
6. Requerimientos estructurales iniciales"
```

---

## 11. Despegue y Aterrizaje

```bash
claude "Configura análisis de T/O y landing:

Datos:
- MTOW: [X] kg
- S: [X] m²
- CL_max (limpio): [X]
- CL_max (flaps): [X]
- Thrust disponible: [X] N
- Altitud de pista: [X] m

Genera código para:
1. Velocidad de stall (limpio y flaps)
2. V_LOF, V2, V_approach
3. Carrera de despegue en tierra
4. Distancia total sobre obstáculo 15m
5. Distancia de aterrizaje
6. Efecto del viento"
```

---

## 12. Generación de Reportes

```bash
claude "Genera template de reporte técnico:

Secciones:
1. Resumen ejecutivo (1 página)
2. Requisitos y especificaciones
3. Configuración general
4. Análisis aerodinámico
5. Análisis de performance
6. Peso y balance
7. Estabilidad y control
8. Estructuras (overview)
9. Propulsión
10. Conclusiones y recomendaciones

Formato:
- Markdown con tablas
- Espacios para insertar figuras
- Referencias a archivos de cálculo
- Checklist de completitud"
```

---

## Checklist de Setup Completo

- [ ] Estructura de proyecto creada
- [ ] Ambiente Python configurado (requirements instalados)
- [ ] Base de datos de perfiles disponible
- [ ] Scripts de cálculo aerodinámico listos
- [ ] Scripts de performance listos
- [ ] Análisis de estabilidad configurado
- [ ] Estimación de pesos preparada
- [ ] Análisis estructural básico listo
- [ ] Template de reporte preparado
- [ ] Datos del proyecto en CLAUDE.md

---

## Scripts Útiles de Inicio

### Verificar Instalación
```python
# verify_setup.py
import numpy as np
import matplotlib.pyplot as plt
from scipy import integrate

# Test atmospheric properties
from ambiance import Atmosphere

atm = Atmosphere(1000)  # 1000m altitude
print(f"Densidad a 1000m: {atm.density[0]:.4f} kg/m³")
print(f"Temperatura: {atm.temperature[0]:.1f} K")
print("✓ Setup verificado correctamente")
```

### Template de Cálculo
```python
# calc_template.py
"""
Proyecto: [NOMBRE]
Fecha: [FECHA]
Cálculo: [DESCRIPCIÓN]
"""

import numpy as np
import matplotlib.pyplot as plt

# === DATOS DE ENTRADA ===
# (completar con datos del proyecto)

# === CÁLCULOS ===

# === RESULTADOS ===

# === VERIFICACIÓN ===
# ¿Los resultados son razonables?
# ¿Unidades correctas?
# ¿Comparación con valores típicos?
```

---

*SETUP-AI.md para Aeronáutica - FPUNA 2026*
