# Tutorial FEA en Fusion 360

## 1. Introduccion al Analisis por Elementos Finitos

### Que es FEA?

```
METODO DE ELEMENTOS FINITOS (FEA)
=================================

Geometria continua    ->    Malla de elementos    ->    Solucion numerica
                            discretos

+------------------+       +-+-+-+-+-+-+-+        Tension en cada nodo
|                  |       |/|/|/|/|/|/|/|        Deformacion
|    Viga          |  -->  +-+-+-+-+-+-+-+   -->  Factor de seguridad
|                  |       |/|/|/|/|/|/|/|        Desplazamientos
+------------------+       +-+-+-+-+-+-+-+
```

### Flujo de Trabajo FEA

```
1. GEOMETRIA
   Importar/crear modelo 3D
        ↓
2. MATERIALES
   Asignar propiedades (E, sigma_y, rho)
        ↓
3. CARGAS
   Aplicar fuerzas, presiones, momentos
        ↓
4. RESTRICCIONES
   Definir apoyos (fijo, articulado, etc.)
        ↓
5. MALLADO
   Dividir geometria en elementos
        ↓
6. RESOLVER
   Calcular tensiones y deformaciones
        ↓
7. INTERPRETAR
   Verificar factor de seguridad
```

---

## 2. Configuracion Inicial en Fusion 360

### Acceder al Entorno de Simulacion

```
PASOS:
1. Abrir modelo en Fusion 360
2. Menu: Simulation (esquina superior)
3. Elegir "Static Stress"
4. Click "New Study"

Si no ves Simulation:
- Verificar licencia (educacional incluye)
- Preferences > Preview Features > Enable
```

### Interfaz de Simulacion

```
+------------------------------------------+
|  [Study Setup] [Simplify] [Mesh] [Solve] |
+------------------------------------------+
|                                          |
|     Vista 3D del modelo                  |
|                                          |
|                                          |
+------------------------------------------+
| Browser (izquierda):                     |
| - Study1                                 |
|   - Materials                            |
|   - Constraints                          |
|   - Loads                                |
|   - Contacts                             |
|   - Mesh                                 |
|   - Results                              |
+------------------------------------------+
```

---

## 3. Paso a Paso: Analisis de Larguero de Ala

### Escenario

```
PROBLEMA:
Analizar larguero de ala sometido a flexion

Datos:
- Material: Tubo aluminio 6061-T6
- Longitud: 1000 mm (semi-envergadura)
- Diametro exterior: 20 mm
- Espesor pared: 2 mm
- Carga: 175 N (sustentacion de diseno)
- Tipo: Viga en voladizo
```

### Paso 1: Crear la Geometria

```
En Fusion 360 Design:

1. Sketch > Circle (centro, R=10mm)
2. Sketch > Circle concentrico (R=8mm)
3. Extrude > 1000mm
4. Guardar modelo

Resultado:
+================================+
|                                |
|  Tubo hueco D=20mm, e=2mm     |
|                                |
+================================+
       1000 mm
```

### Paso 2: Asignar Material

```
En Simulation:

1. Click derecho en "Materials"
2. "Edit Material"
3. Buscar "Aluminum 6061-T6"
4. Verificar propiedades:
   - E = 69 GPa (Modulo de Young)
   - Yield = 276 MPa
   - Density = 2700 kg/m^3
   - Poisson = 0.33
5. OK
```

### Paso 3: Aplicar Restricciones

```
RESTRICCION: Empotramiento en la raiz

1. Click en "Constraints" > "Fixed"
2. Seleccionar cara del extremo izquierdo
3. OK

Visualizacion:
████████
║
║  Tubo libre
║
████████
 ↑
Fijo (6 DOF = 0)
```

### Paso 4: Aplicar Cargas

```
CARGA: Fuerza distribuida (sustentacion)

Opcion A - Fuerza puntual en extremo:
1. Loads > Force
2. Seleccionar cara extremo derecho
3. Direction: -Y (hacia arriba)
4. Magnitude: 175 N
5. OK

Opcion B - Presion distribuida (mas realista):
1. Loads > Pressure
2. Seleccionar cara superior del tubo
3. Magnitude: Calcular segun distribucion

Para distribucion uniforme simplificada:
P = F / A = 175 N / (0.02m × 1m) = 8750 Pa
```

### Paso 5: Configurar Malla

```
MALLADO:

1. Click en "Mesh" > "Settings"
2. Mesh Type: "Solid"
3. Element Size:
   - Para estudio inicial: Default (automatico)
   - Para resultados refinados: 2-5% de dimension menor
4. "Generate Mesh"

VERIFICAR:
- Minimo 3 elementos a traves del espesor
- Elementos no muy distorsionados
- Zonas criticas con elementos mas finos

Ejemplo bueno:
+--+--+--+--+--+--+--+--+--+--+
|\/|\/|\/|\/|\/|\/|\/|\/|\/|\/|
+--+--+--+--+--+--+--+--+--+--+
|\/|\/|\/|\/|\/|\/|\/|\/|\/|\/|
+--+--+--+--+--+--+--+--+--+--+
```

### Paso 6: Resolver

```
1. Click "Solve"
2. Esperar (segundos a minutos segun complejidad)
3. Verificar que no hay errores

POSIBLES ERRORES:
- "Insufficient constraints": Agregar mas apoyos
- "Mesh failed": Simplificar geometria o ajustar tamano
- "Solver divergence": Verificar unidades y magnitudes
```

### Paso 7: Interpretar Resultados

```
RESULTADOS DISPONIBLES:

1. Safety Factor (mas importante):
   Click Results > Safety Factor
   - Verde (>2): Seguro
   - Amarillo (1-2): Marginal
   - Rojo (<1): Falla

2. Von Mises Stress:
   Click Results > Stress > Von Mises
   - Comparar con Yield del material
   - sigma_max < sigma_yield / FS

3. Displacement:
   Click Results > Displacement
   - Verificar deformacion aceptable
   - Para alas: < 5% de envergadura
```

---

## 4. Interpretacion de Resultados

### Criterio de Von Mises

```
TEORIA:
El criterio de Von Mises predice fluencia cuando:

sigma_vm = sqrt(0.5*[(s1-s2)^2 + (s2-s3)^2 + (s3-s1)^2])

Donde s1, s2, s3 son tensiones principales

FACTOR DE SEGURIDAD:
FS = sigma_yield / sigma_vm_max

Para aeronautica:
- FS >= 1.5 (carga ultima)
- FS >= 2.0 (para materiales desconocidos)
- FS >= 3.0 (para fatiga o incertidumbre alta)
```

### Lectura del Mapa de Colores

```
ESCALA DE COLORES (tipica):

Rojo     ████  Tension maxima (peligro)
Naranja  ████
Amarillo ████
Verde    ████
Celeste  ████
Azul     ████  Tension minima (seguro)

CONCENTRACIONES DE TENSION:
Los "puntos calientes" rojos indican donde
la pieza puede fallar primero

+----------------------------------+
|                            ██████|← Concentrador en esquina
|===========================       |
|                            ██████|
+----------------------------------+
↑
Empotramiento (tension maxima cerca de aqui)
```

### Verificacion de Convergencia

```
ESTUDIO DE MALLA:

Ejecutar analisis con diferentes tamanos de malla:

| Elementos | sigma_max (MPa) | Variacion |
|-----------|-----------------|-----------|
| 1000      | 45.2            | -         |
| 2000      | 48.1            | +6.4%     |
| 4000      | 49.3            | +2.5%     |
| 8000      | 49.7            | +0.8%     |

Convergencia alcanzada cuando variacion < 2%
```

---

## 5. Ejemplo Completo: Nuestro Larguero UAV

### Datos del Problema

```
GEOMETRIA:
- Tubo CFRP (fibra de carbono)
- Diametro exterior: 20 mm
- Diametro interior: 17 mm (espesor 1.5 mm)
- Longitud: 1000 mm

MATERIAL (CFRP pultruido):
- E = 135 GPa
- sigma_yield = 1200 MPa
- Densidad = 1550 kg/m^3

CARGAS:
- Sustentacion de diseno: 220 N (n=5)
- Distribucion: aproximadamente eliptica
- Simplificacion: puntual al 40% de envergadura

RESTRICCION:
- Empotramiento en raiz (union al fuselaje)
```

### Calculo Manual de Verificacion

```
MOMENTO FLECTOR MAXIMO (en la raiz):

Para carga puntual a 400mm:
M_max = F × d = 220 N × 0.4 m = 88 N×m

PROPIEDADES DE SECCION:
I = pi/64 × (D_ext^4 - D_int^4)
I = pi/64 × (0.020^4 - 0.017^4)
I = 3.42 × 10^-9 m^4

TENSION MAXIMA:
sigma_max = M × c / I
sigma_max = 88 × 0.010 / 3.42e-9
sigma_max = 257 MPa

FACTOR DE SEGURIDAD:
FS = 1200 / 257 = 4.7

CONCLUSION: El larguero es seguro (FS > 1.5)
```

### Comparacion con FEA

```
RESULTADOS ESPERADOS DEL FEA:

Si el calculo manual da sigma = 257 MPa,
el FEA deberia dar un valor similar.

DIFERENCIAS ESPERADAS:
- FEA puede ser 5-15% diferente
- Concentraciones de tension en union
- Efecto de condiciones de borde

Si la diferencia es > 30%, revisar:
1. Unidades
2. Propiedades del material
3. Condiciones de borde
4. Magnitud de cargas
```

---

## 6. Casos de Carga Multiples

### Configuracion de Estudios Multiples

```
CASOS DE CARGA PARA UAV:

Caso 1: Vuelo nivelado (n=1)
- L = 44.1 N
- Referencia base

Caso 2: Maniobra positiva (n=5)
- L = 220.5 N
- Caso critico superior

Caso 3: Maniobra negativa (n=-2)
- L = -88.2 N
- Caso critico inferior

Caso 4: Aterrizaje (n=3 vertical)
- L = 132.3 N en direccion Z
- Caso de impacto
```

### Combinar Resultados

```
En Fusion 360:

1. Crear estudio para cada caso
2. O usar "Load Cases" en un solo estudio
3. Envolvente de resultados:
   - Tomar maximo de cada caso
   - Verificar FS en todos los casos

CRITERIO FINAL:
FS_min = min(FS_caso1, FS_caso2, FS_caso3, FS_caso4)
Si FS_min >= 1.5, el diseno es aceptable
```

---

## 7. Optimizacion con FEA

### Proceso Iterativo

```
CICLO DE OPTIMIZACION:

Diseno inicial
      ↓
  Analisis FEA  ←─────────────┐
      ↓                       │
  FS >> 2.0?                  │
    │   │                     │
   Si  No                     │
    │   │                     │
    │   FS < 1.5?             │
    │     │   │               │
    │    Si  No               │
    │     │   │               │
    │  Reforzar   OK          │
    │     │       │           │
Reducir   └───────┴───────────┘
espesor/
seccion
      ↓
  Diseno optimizado
```

### Ejemplo de Iteraciones

```
OPTIMIZACION DEL LARGUERO:

| Iteracion | D_ext | e | Peso | FS | Accion |
|-----------|-------|---|------|----|--------------
| 1 | 25 mm | 2.0 mm | 210g | 8.2 | Sobrediseno |
| 2 | 20 mm | 2.0 mm | 165g | 5.1 | Aun alto |
| 3 | 20 mm | 1.5 mm | 125g | 4.7 | Aceptable |
| 4 | 18 mm | 1.5 mm | 112g | 3.8 | Optimo |
| 5 | 18 mm | 1.2 mm | 90g | 2.9 | Limite |

Seleccion final: Iteracion 4 (FS=3.8, margin)
```

---

## 8. Errores Comunes y Soluciones

### Tabla de Problemas

| Problema | Causa Probable | Solucion |
|----------|----------------|----------|
| FS = 0 en toda la pieza | Unidades incorrectas | Verificar Pa vs MPa |
| Tension infinita en un punto | Singularidad | Suavizar geometria |
| Deformacion gigante | Faltan restricciones | Agregar apoyos |
| Malla no genera | Geometria compleja | Simplificar modelo |
| Resultados no convergen | Malla muy gruesa | Refinar malla |

### Singularidades de Tension

```
PROBLEMA:
Esquinas afiladas causan tension "infinita"

Geometria         Tension
+--------+        ∞████
|        |        ██████
|        |        ████████
|--------|        ████████████
                  ↑
              Concentrador

SOLUCION:
Agregar radio de filete

+--------+
|        \       Tension finita
|         \      y realista
|----------
  ↑
  Radio r >= 1mm
```

---

## 9. Exportar y Documentar Resultados

### Captura de Resultados

```
EN FUSION 360:

1. Ajustar vista para mejor visualizacion
2. File > Export > Image (PNG de alta res)
3. Nombrar: "larguero_vonmises_caso2.png"

INCLUIR EN REPORTE:
- Imagen del modelo con malla
- Mapa de tension Von Mises
- Mapa de factor de seguridad
- Deformacion magnificada (x10 o x100)
```

### Tabla de Resultados

```
FORMATO DE REPORTE:

| Parametro | Valor | Unidad | Limite | Estado |
|-----------|-------|--------|--------|--------|
| sigma_max | 257 | MPa | 800 | OK |
| sigma_vm | 245 | MPa | 800 | OK |
| FS minimo | 4.7 | - | >1.5 | OK |
| Deformacion | 12 | mm | <50 | OK |
| Peso | 125 | g | <200 | OK |

CONCLUSION: Diseno APROBADO para carga ultima.
```

---

## 10. Uso de IA para FEA

### Prompt para Verificar Configuracion

```
Voy a hacer un analisis FEA en Fusion 360.
Mis condiciones son:

Geometria: Tubo CFRP, D=20mm, e=1.5mm, L=1000mm
Material: E=135GPa, yield=1200MPa
Carga: 220N en el extremo libre
Restriccion: Empotrado en un extremo

Verificame:
1. Es correcto modelar como viga en voladizo?
2. Que tamano de malla recomiendas?
3. Que tension maxima deberia esperar (calculo manual)?
4. Que factor de seguridad seria aceptable?
```

### Prompt para Interpretar Resultados

```
Obtuve estos resultados de FEA:

- Tension Von Mises maxima: 280 MPa
- Ubicacion: cerca del empotramiento
- Factor de seguridad minimo: 4.3
- Deformacion maxima: 15 mm

El calculo manual me daba 257 MPa.

1. La diferencia del 9% es aceptable?
2. El FS de 4.3 es suficiente para UAV?
3. La deformacion de 15mm es problematica?
4. Debo reducir seccion para optimizar peso?
```

---

## 11. Checklist de FEA

### Antes de Resolver

- [ ] Geometria simplificada (sin detalles irrelevantes)
- [ ] Material asignado correctamente
- [ ] Propiedades verificadas (E, yield, densidad)
- [ ] Restricciones aplicadas (minimo 6 DOF bloqueados)
- [ ] Cargas en magnitud y direccion correctas
- [ ] Unidades consistentes (SI: m, N, Pa)
- [ ] Malla generada sin errores

### Despues de Resolver

- [ ] No hay errores de convergencia
- [ ] Tension maxima en ubicacion logica
- [ ] Factor de seguridad > 1.5
- [ ] Deformacion razonable
- [ ] Comparacion con calculo manual (~20% diferencia OK)
- [ ] Estudio de convergencia de malla

---

## Resumen

```
FLUJO FEA RESUMIDO:

1. Modelo 3D -> 2. Material -> 3. Restricciones -> 
4. Cargas -> 5. Malla -> 6. Resolver -> 7. Verificar

CRITERIO DE ACEPTACION:
FS >= 1.5 para carga ultima
Deformacion < limite funcional
Tension < 0.67 × sigma_yield

HERRAMIENTAS:
- Fusion 360 (educacional: gratis)
- Calculos manuales (verificacion)
- IA (asistencia e interpretacion)
```

---

*Fin del Modulo 03 - Estructuras y Materiales*
