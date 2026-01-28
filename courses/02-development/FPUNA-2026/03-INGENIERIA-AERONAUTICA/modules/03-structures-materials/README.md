# Modulo 03: Estructuras y Materiales

## Duracion: 4 horas

---

## Descripcion

Aprende a analizar estructuras aeronauticas usando metodos de elementos finitos (FEA), seleccionar materiales apropiados, y calcular factores de seguridad. Usaras herramientas CAD con FEA integrado y asistencia de IA para interpretacion.

---

## Objetivos de Aprendizaje

Al finalizar este modulo, podras:

1. **Calcular** cargas aerodinamicas sobre el ala
2. **Aplicar** factores de seguridad aeronauticos
3. **Seleccionar** materiales apropiados para UAV
4. **Ejecutar** analisis FEA basico en Fusion 360
5. **Interpretar** resultados de tension y deformacion

---

## Contenido

### Parte 1: Cargas Aeronauticas (1 hora)

| Tema | Descripcion |
|------|-------------|
| Diagrama V-n | Envolvente de vuelo |
| Factor de carga | n = L/W |
| Cargas limite vs ultima | Limite * 1.5 = Ultima |
| Distribucion de sustentacion | Eliptica vs real |

### Parte 2: Materiales Aeronauticos (1 hora)

| Tema | Descripcion |
|------|-------------|
| Aluminio aeronautico | 6061-T6, 7075-T6 |
| Composites | Fibra de carbono, fibra de vidrio |
| Madera | Balsa, contrachapado aeronautico |
| Plasticos | ABS, PLA, Nylon para impresion 3D |

### Parte 3: Analisis FEA (1.5 horas)

| Tema | Descripcion |
|------|-------------|
| Configuracion en Fusion 360 | Simulation workspace |
| Definir materiales | Propiedades mecanicas |
| Aplicar cargas | Fuerzas, presiones |
| Condiciones de borde | Restricciones |
| Interpretar resultados | Tension, deformacion, FS |

### Parte 4: IA para Estructuras (30 min)

| Tema | Descripcion |
|------|-------------|
| Calcular cargas con IA | Distribucion, momentos |
| Seleccionar materiales | Trade-off peso vs costo |
| Verificar resultados FEA | Rangos tipicos |

---

## Herramientas Requeridas

| Herramienta | Proposito | Instalacion |
|-------------|-----------|-------------|
| **Fusion 360** | FEA integrado | Ya instalado |
| **Python** | Calculos | Ya instalado |
| **OpenCode / Claude** | Asistencia | Ya configurado |

---

## Propiedades de Materiales

### Aluminio

| Aleacion | Densidad (kg/m3) | E (GPa) | Yield (MPa) | Ultimate (MPa) |
|----------|-----------------|---------|-------------|----------------|
| 6061-T6 | 2700 | 69 | 276 | 310 |
| 7075-T6 | 2810 | 71 | 503 | 572 |

### Composites (direccion fibra)

| Material | Densidad (kg/m3) | E (GPa) | Tension (MPa) |
|----------|-----------------|---------|---------------|
| CFRP (unidireccional) | 1600 | 135 | 1500 |
| GFRP (fibra vidrio) | 1900 | 35 | 500 |

### Madera

| Material | Densidad (kg/m3) | E (GPa) | Compresion (MPa) |
|----------|-----------------|---------|-----------------|
| Balsa | 160 | 3.5 | 7 |
| Abeto Sitka | 450 | 10 | 35 |
| Contrachapado | 550 | 7 | 25 |

---

## Factores de Seguridad

### Normativa FAR/CS

| Categoria | Factor Limite | Factor Ultimo |
|-----------|---------------|---------------|
| Normal | n = 3.8 / -1.52 | 1.5 |
| Utility | n = 4.4 / -1.76 | 1.5 |
| Acrobatic | n = 6.0 / -3.0 | 1.5 |

### UAV (sin tripulacion)

Para UAV pequenos, se usan factores mas conservadores:
- Factor de carga: n = 4-5 (incluye rafagas)
- Factor de seguridad material: 1.5-2.0 (dependiendo de conocimiento del material)

---

## Formulas Clave

### Carga Maxima en Ala

```
L_max = n * W
P_ala = L_max / S  (presion promedio)

Donde:
- n = factor de carga (ej: 4)
- W = peso (N)
- S = superficie alar (m^2)
```

### Momento Flector en Raiz

```
M_root = (L_total * y_centroide)

Para distribucion eliptica:
M_root = (4 * L) / (3 * pi) * (b/2)
       = 0.424 * L * (b/2)
```

### Tension Normal (viga)

```
sigma = M * y / I

Donde:
- M = Momento flector (N*m)
- y = Distancia al eje neutro (m)
- I = Momento de inercia (m^4)
```

---

## Archivos del Modulo

```
03-structures-materials/
├── README.md                    # Este archivo
├── content/
│   ├── 01-cargas-aeronauticas.md
│   ├── 02-materiales.md
│   └── 03-fea-tutorial.md
├── EXERCISE.md                  # Ejercicio practico
└── data/
    └── materiales.csv          # Propiedades de materiales
```

---

## Conexion con Otros Modulos

- **Modulo 01**: Geometria CAD se usa para FEA
- **Modulo 02**: Cargas aerodinamicas alimentan FEA
- **Modulo 05**: Estructura debe cumplir requerimientos

---

*Modulo 03 - Estructuras y Materiales - Track Aeronautica - FPUNA 2026*
