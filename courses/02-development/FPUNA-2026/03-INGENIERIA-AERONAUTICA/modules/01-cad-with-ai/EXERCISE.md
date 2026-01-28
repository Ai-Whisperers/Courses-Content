# Ejercicio Modulo 01: Diseno CAD de Ala con IA

## Tiempo Estimado: 90 minutos

---

## Objetivo

Disenar y modelar el ala de un UAV agricola usando herramientas CAD y asistencia de IA, documentando el proceso completo.

---

## Especificaciones del Proyecto

Tu UAV agricola tiene las siguientes caracteristicas:

| Parametro | Valor |
|-----------|-------|
| MTOW (Peso maximo despegue) | 4.5 kg |
| Carga util (camara/sensores) | 0.8 kg |
| Velocidad de crucero | 14 m/s |
| Velocidad de stall maxima | 10 m/s |
| Altitud de operacion | 100-200 m AGL |
| Condiciones | Paraguay verano (30C, 1000m altitud) |

---

## Parte 1: Sizing Preliminar (20 min)

### Tarea 1.1: Consulta a IA

Usa el siguiente prompt (o uno similar) con Claude/ChatGPT:

```
Estoy disenando un UAV agricola con estas especificaciones:
- MTOW: 4.5 kg
- Velocidad crucero: 14 m/s
- Velocidad stall maxima: 10 m/s
- Condiciones: Paraguay verano (30C, 1000m altitud)

Necesito dimensionar el ala. Calcula:
1. Densidad del aire en esas condiciones
2. CL_max requerido (usando Vstall)
3. Superficie alar (S)
4. Envergadura (b) para AR = 8
5. Cuerdas raiz y punta para taper = 0.5

Muestra todas las formulas y calculos paso a paso.
Usa sistema SI.
```

### Tarea 1.2: Verificacion Manual

Verifica al menos **dos** de los calculos de la IA:

| Parametro | Valor IA | Tu Calculo | Coincide? |
|-----------|----------|------------|-----------|
| Densidad | | | |
| CL_max | | | |
| S | | | |
| Envergadura | | | |

### Tarea 1.3: Seleccion de Perfil

Consulta a IA:

```
Para un UAV con Reynolds ~300,000 y CL_diseno = 0.6-0.8,
recomienda un perfil NACA de 4 digitos.
Explica la eleccion y proporciona las coordenadas.
```

---

## Parte 2: Modelado CAD (50 min)

### Tarea 2.1: Configurar Proyecto

En Fusion 360 (o FreeCAD):

1. Crear nuevo proyecto: "UAV_Ala_[TuNombre]"
2. Configurar unidades: milimetros
3. Crear variables parametricas:

| Variable | Valor | Descripcion |
|----------|-------|-------------|
| envergadura | [del calculo] | mm |
| cuerda_raiz | [del calculo] | mm |
| cuerda_punta | [del calculo] | mm |
| twist | -2 | grados (washout) |
| diedro | 3 | grados |

### Tarea 2.2: Importar Perfil

1. Obtener coordenadas del perfil seleccionado
2. Crear sketch en plano XZ
3. Importar puntos como spline
4. Escalar a cuerda_raiz

**Tip**: Si tienes problemas, usa:
```
Dame las coordenadas NACA [XXXX] en formato:
x1, y1
x2, y2
...
Listas para copiar y pegar en CAD.
```

### Tarea 2.3: Crear Ala

Siguiendo el tutorial de 02-modelado-alas.md:

1. Crear perfil en raiz
2. Crear plano en punta (offset = envergadura/2)
3. Crear perfil en punta (escalado y rotado)
4. Loft entre perfiles
5. Mirror para ala completa

### Tarea 2.4: Verificar Modelo

Usa Inspect -> Properties:

| Propiedad | Valor |
|-----------|-------|
| Volumen | ______ mm^3 |
| Area superficial | ______ mm^2 |
| Centro de masa (X) | ______ mm |

---

## Parte 3: Exportacion y Documentacion (20 min)

### Tarea 3.1: Exportar

1. Exportar como STEP: `ala_uav_[nombre].step`
2. Exportar como STL (alta resolucion): `ala_uav_[nombre].stl`

### Tarea 3.2: Captura de Pantalla

Incluir capturas de:
- Vista isometrica del ala completa
- Vista frontal mostrando diedro
- Panel de variables/parametros

### Tarea 3.3: Documentacion

Crear un breve documento (1-2 paginas) con:

1. **Resumen de especificaciones**
   - Tabla con todos los parametros finales

2. **Proceso de diseno**
   - Prompts usados con IA
   - Verificaciones realizadas

3. **Resultados**
   - Capturas del modelo
   - Propiedades fisicas

4. **Reflexion**
   - Que funciono bien con la IA?
   - Donde necesitaste corregir?
   - Que harias diferente?

---

## Entregables

| Item | Formato | Nombre |
|------|---------|--------|
| Modelo CAD | .f3d o .FCStd | UAV_Ala_[Nombre].f3d |
| Export STEP | .step | ala_uav_[nombre].step |
| Export STL | .stl | ala_uav_[nombre].stl |
| Documentacion | .pdf o .md | reporte_modulo01_[nombre].pdf |
| Capturas | .png | capturas/ (carpeta) |

---

## Rubrica de Evaluacion

| Criterio | Puntos | Descripcion |
|----------|--------|-------------|
| **Sizing correcto** | 20 | Calculos verificados y razonables |
| **Modelo CAD** | 30 | Geometria correcta, parametrizado |
| **Uso de IA** | 20 | Prompts efectivos, verificacion documentada |
| **Exportacion** | 15 | Archivos correctos y funcionales |
| **Documentacion** | 15 | Clara, completa, profesional |
| **Total** | 100 | |

### Escala

- 90-100: Excelente
- 80-89: Muy Bueno
- 70-79: Bueno
- 60-69: Suficiente
- <60: Necesita mejorar

---

## Recursos

- Tutorial: [Fusion 360 Loft](https://help.autodesk.com/view/fusion360/ENU/?guid=SLD-LOFT)
- Base de datos: [UIUC Airfoil Database](https://m-selig.ae.illinois.edu/ads/coord_database.html)
- Calculadora: [Atmosfera ISA](https://www.digitaldutch.com/atmoscalc/)

---

## Preguntas de Reflexion

Responde brevemente en tu documentacion:

1. Si la IA te dio un valor de superficie alar muy diferente a lo esperado, como lo detectarias?

2. Por que es importante usar parametros (variables) en lugar de numeros fijos?

3. Que perfil elegiste y por que es apropiado para este UAV?

---

## Ayuda

Si tienes problemas:

1. Revisa los tutoriales en content/
2. Pregunta a la IA: "Tengo este error en Fusion 360: [error]. Como lo soluciono?"
3. Consulta con el instructor

---

*Ejercicio Modulo 01 - CAD con AI - FPUNA 2026*
