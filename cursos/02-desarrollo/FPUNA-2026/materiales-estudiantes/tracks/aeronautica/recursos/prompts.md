# 🤖 Prompts - Ingeniería Aeronáutica

## FPUNA Verano 2026

Colección de prompts optimizados para usar con Claude/OpenCode en proyectos aeronáuticos.

---

## Diseño Conceptual

### Definición de Misión
```
Necesito diseñar un [TIPO DE AERONAVE] con los siguientes requerimientos:

Misión:
- Pasajeros/carga: [CANTIDAD/PESO]
- Alcance: [km/nm]
- Velocidad crucero: [km/h o Mach]
- Altitud de crucero: [ft/m]
- Pista disponible: [m]

Restricciones:
- Categoría de certificación: [FAR 23/25]
- Presupuesto aproximado: [USD]
- Tecnología: [convencional/eléctrico/híbrido]

Por favor:
1. Sugiere configuraciones apropiadas
2. Estima peso máximo de despegue (MTOW)
3. Propone dimensiones preliminares
4. Identifica desafíos técnicos clave
```

### Dimensionamiento de Ala
```
Ayúdame a dimensionar el ala para mi aeronave:

Datos conocidos:
- MTOW: [kg]
- Velocidad de crucero: [m/s]
- Altitud de crucero: [m]
- Velocidad de stall máxima: [m/s]
- Categoría: [acrobático/utilitario/normal]

Calcula:
1. Carga alar óptima (W/S)
2. Superficie alar requerida
3. Aspect ratio recomendado
4. Envergadura y cuerda media
5. Perfil sugerido (NACA u otro)
```

### Selección de Propulsión
```
Recomienda sistema de propulsión para:

Aeronave: [DESCRIPCIÓN]
Potencia estimada requerida: [HP/kW]
Misión: [DESCRIBIR]
Restricciones:
- Peso máximo motor: [kg]
- Consumo objetivo: [L/h o kWh]
- Disponibilidad en mercado
- Mantenimiento simple

Opciones a considerar:
- Pistón (Lycoming, Continental, Rotax)
- Turboprop
- Eléctrico
- Híbrido

Incluye comparativa con pros/contras.
```

---

## Análisis Aerodinámico

### Análisis de Perfil
```
Analiza el perfil [NACA XXXX / nombre] para mi aplicación:

Condiciones de vuelo:
- Número de Reynolds: [valor]
- Rango de ángulo de ataque: [grados]
- Mach máximo: [valor]

Necesito:
1. Características de sustentación (CL vs α)
2. Características de resistencia (CD vs CL)
3. Momento de cabeceo (Cm vs α)
4. Eficiencia máxima (L/D)
5. Ángulo de stall y comportamiento
6. Comparación con perfiles alternativos
```

### Polar de la Aeronave
```
Ayúdame a construir la polar de arrastre de mi aeronave:

Geometría:
- Superficie alar: [m²]
- Envergadura: [m]
- Área mojada fuselaje: [m²]
- Área mojada empenaje: [m²]

Componentes adicionales:
- Tren de aterrizaje: [fijo/retráctil]
- Antenas, pitot, etc.

Estima:
1. CD0 (arrastre parásito)
2. Factor de eficiencia de Oswald (e)
3. Polar completa: CD = CD0 + CL²/(π×AR×e)
4. Velocidad de máxima eficiencia
5. Velocidad de máximo alcance
```

### Estabilidad y Control
```
Evalúa la estabilidad de mi configuración:

Geometría:
- Ala: [posición, superficie, AR, perfil]
- Estabilizador horizontal: [superficie, brazo]
- Estabilizador vertical: [superficie, brazo]
- CG estimado: [% MAC]

Calcula:
1. Punto neutro (Neutral Point)
2. Margen estático
3. Coeficientes de volumen (Vh, Vv)
4. Derivadas de estabilidad principales
5. Recomendaciones si está fuera de rango
```

---

## Análisis Estructural

### Cargas de Vuelo
```
Calcula las cargas de diseño para mi aeronave:

Datos:
- MTOW: [kg]
- Categoría: [normal/utilitario/acrobático]
- Velocidad de maniobra (VA): [m/s]
- Velocidad máxima (VD): [m/s]

Determina:
1. Diagrama V-n completo
2. Factor de carga límite positivo/negativo
3. Factor de carga último
4. Cargas de ráfaga
5. Casos de carga críticos para diseño
```

### Dimensionamiento de Larguero
```
Dimensiona el larguero principal del ala:

Datos:
- Envergadura: [m]
- Cuerda en raíz/punta: [m]
- Distribución de sustentación: [elíptica/otra]
- Carga máxima total: [N]
- Material: [aluminio 6061-T6 / 2024-T3 / carbono]

Calcula:
1. Distribución de cortante a lo largo del ala
2. Distribución de momento flector
3. Sección transversal requerida (I, A)
4. Tensiones máximas y factor de seguridad
5. Peso estimado del larguero
```

### Análisis de Composites
```
Analiza un laminado de composite para [COMPONENTE]:

Requerimientos:
- Cargas: [tensión/compresión/flexión: valores]
- Espesor máximo: [mm]
- Peso objetivo: [kg/m²]

Material disponible:
- Tipo: [carbono/vidrio/kevlar]
- Matriz: [epoxi/vinilester]
- Forma: [tejido/unidireccional]

Diseña:
1. Secuencia de apilado
2. Orientación de capas
3. Número de capas
4. Verificación de resistencia (Tsai-Hill/Tsai-Wu)
5. Proceso de fabricación recomendado
```

---

## Rendimiento de Vuelo

### Cálculo de Rendimiento Completo
```
Calcula el rendimiento de mi aeronave:

Datos:
- MTOW: [kg]
- Superficie alar: [m²]
- Potencia disponible: [HP]
- Polar: CD = [CD0] + [k]×CL²
- Consumo específico: [g/kWh o L/h]
- Capacidad de combustible: [L]

Calcula:
1. Velocidades características (Vmax, Vcruise, Vbest range, Vbest endurance)
2. Techo de servicio
3. Régimen de ascenso máximo y ángulo
4. Alcance máximo
5. Autonomía máxima
6. Distancia de despegue y aterrizaje
```

### Análisis de Misión
```
Simula una misión típica:

Perfil de vuelo:
1. Despegue desde [elevación] m
2. Ascenso a [altitud] m
3. Crucero de [distancia] km
4. Descenso y aproximación
5. Aterrizaje con reserva de [minutos]

Para cada fase, calcula:
- Tiempo
- Combustible consumido
- Distancia recorrida

Resume:
- Combustible total requerido
- Tiempo total de vuelo
- Payload disponible
```

---

## Documentación Técnica

### Especificaciones de Aeronave
```
Genera un documento de especificaciones para [AERONAVE]:

Incluye secciones:
1. Descripción general y misión
2. Dimensiones (3 vistas)
3. Pesos (vacío, máx combustible, MTOW)
4. Rendimiento (velocidades, alcance, techo)
5. Planta motriz
6. Sistemas principales
7. Limitaciones operacionales

Formato: Similar a POH (Pilot's Operating Handbook)
```

### Reporte de Análisis CFD
```
Estructura un reporte de análisis CFD para [COMPONENTE]:

Secciones:
1. Objetivo del estudio
2. Geometría y dominio computacional
3. Condiciones de contorno
4. Malla (tipo, tamaño, calidad)
5. Modelo de turbulencia justificado
6. Criterios de convergencia
7. Resultados (campos de presión, velocidad, fuerzas)
8. Validación (si hay datos experimentales)
9. Conclusiones y recomendaciones

Incluye figuras recomendadas para cada sección.
```

---

## Resolución de Problemas

### Debug de Resultados CFD
```
Mis resultados de CFD no parecen correctos:

Problema observado: [DESCRIBIR]
Resultado esperado: [VALOR]
Resultado obtenido: [VALOR]

Configuración:
- Software: [OpenFOAM/Fluent/SimScale]
- Malla: [celdas, tipo, y+]
- Modelo: [laminar/k-epsilon/k-omega SST]
- Condiciones de contorno: [DESCRIBIR]

Ayúdame a:
1. Identificar posibles causas del error
2. Verificaciones a realizar
3. Ajustes sugeridos
4. Criterios de convergencia apropiados
```

### Optimización de Diseño
```
Quiero optimizar [COMPONENTE] de mi aeronave:

Objetivo: [minimizar peso / maximizar L/D / otro]
Variables de diseño: [LISTA]
Restricciones: [LISTA con valores]

Actual:
- Diseño: [DESCRIBIR]
- Rendimiento: [VALORES]

Sugiere:
1. Metodología de optimización
2. Variables más influyentes (sensibilidad)
3. Dirección de mejora
4. Trade-offs esperados
5. Nuevo diseño propuesto
```

---

## Ejemplos Específicos

### Diseño de UAV
```
Diseña un UAV de ala fija para [MISIÓN]:

Requerimientos:
- Payload: [kg] (cámara/sensores)
- Autonomía: [horas]
- Velocidad crucero: [m/s]
- Techo operacional: [m]
- Lanzamiento: [mano/catapulta/pista]
- Recuperación: [paracaídas/pista/deep stall]

Genera diseño conceptual incluyendo:
1. Configuración general (convencional/canard/flying wing)
2. Dimensiones principales
3. Sistema de propulsión (eléctrico/combustión)
4. Peso vacío estimado
5. Electrónica básica requerida
```

### Análisis de Hélice
```
Selecciona/diseña hélice para mi aeronave:

Motor:
- Potencia máxima: [HP] a [RPM]
- Reducción: [directa / ratio]

Aeronave:
- Velocidad crucero: [m/s]
- Velocidad máxima: [m/s]
- Altitud típica: [m]

Determina:
1. Diámetro óptimo
2. Paso (fijo o variable)
3. Número de palas
4. Eficiencia esperada en crucero
5. Hélices comerciales que cumplen requisitos
```

---

*Prompts - Track 03 - FPUNA 2026*
