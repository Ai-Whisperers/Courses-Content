# Modulo 01: CAD con Inteligencia Artificial

## Duracion: 4 horas

---

## Descripcion

En este modulo aprenderas a usar herramientas CAD modernas junto con IA para acelerar el diseno de componentes aeronauticos. Combinaremos Fusion 360 (o FreeCAD como alternativa gratuita) con asistentes de IA para generar geometrias, optimizar disenos y documentar el proceso.

---

## Objetivos de Aprendizaje

Al finalizar este modulo, podras:

1. **Modelar** componentes aeronauticos basicos en CAD 3D
2. **Usar IA** para generar y optimizar geometrias
3. **Aplicar** parametrizacion para diseno iterativo
4. **Exportar** modelos para analisis (CFD, FEA)
5. **Documentar** disenos con asistencia de IA

---

## Contenido

### Parte 1: Fundamentos de CAD Aeronautico (1 hora)

| Tema | Descripcion |
|------|-------------|
| Introduccion al flujo de trabajo | CAD -> Analisis -> Manufactura |
| Interfaces de Fusion 360 / FreeCAD | Navegacion, herramientas basicas |
| Sistema de coordenadas | Ejes aeronauticos (X, Y, Z) |
| Unidades y tolerancias | Por que SI es obligatorio |

### Parte 2: Modelado de Superficies Aerodinamicas (1.5 horas)

| Tema | Descripcion |
|------|-------------|
| Perfiles NACA | Importar coordenadas, crear curvas |
| Lofting de alas | De raiz a punta, twist, taper |
| Fuselajes | Revolucion, lofting, blend |
| Empenajes | Estabilizadores, timones |

### Parte 3: IA para Diseno (1 hora)

| Tema | Descripcion |
|------|-------------|
| Generative Design | Optimizacion topologica en Fusion 360 |
| Prompts efectivos | Como pedir geometrias a Claude/ChatGPT |
| Parametrizacion con IA | Variables, tablas de diseno |
| Validacion | Verificar outputs de IA |

### Parte 4: Exportacion y Documentacion (30 min)

| Tema | Descripcion |
|------|-------------|
| Formatos de exportacion | STEP, STL, IGES |
| Preparacion para CFD | Mallado superficial |
| Preparacion para FEA | Simplificacion, defeaturing |
| Planos tecnicos | Vistas, cotas, BOM |

---

## Herramientas Requeridas

| Herramienta | Proposito | Instalacion |
|-------------|-----------|-------------|
| **Fusion 360** | CAD principal | [Cuenta educativa gratuita](https://www.autodesk.com/education/home) |
| **FreeCAD** (alternativa) | CAD open-source | [freecad.org](https://www.freecad.org/) |
| **OpenCode / Claude** | Asistente IA | Ya configurado en Semana 1 |

---

## Archivos del Modulo

```
01-cad-with-ai/
├── README.md                    # Este archivo
├── content/
│   ├── 01-fundamentos-cad.md   # Teoria CAD aeronautico
│   ├── 02-modelado-alas.md     # Tutorial paso a paso
│   └── 03-ia-generativa.md     # Uso de IA en diseno
├── EXERCISE.md                  # Ejercicio practico
├── assets/                      # Imagenes y referencias
│   ├── naca0012.dat            # Coordenadas perfil
│   └── fuselaje-template.f3d   # Template Fusion 360
└── solutions/                   # Soluciones (solo instructor)
```

---

## Flujo de Trabajo Recomendado

```
1. Concepto
   └── Boceto a mano o descripcion textual

2. Consulta IA
   └── "Necesito modelar un fuselaje de UAV de 1.2m..."

3. Modelado CAD
   └── Fusion 360: Sketch -> Extrude/Loft -> Features

4. Parametrizacion
   └── Variables para iterar rapidamente

5. Validacion
   └── Volumen, area superficial, centro de gravedad

6. Exportacion
   └── STEP para analisis, STL para prototipado
```

---

## Prompts Utiles para IA

### Generar Coordenadas de Perfil
```
Genera las coordenadas X,Y de un perfil NACA 2412 con 50 puntos,
formato CSV, cuerda normalizada a 1.0.
Incluye tanto extrados como intrados.
```

### Dimensiones Preliminares
```
Para un UAV de 5kg MTOW con velocidad crucero de 15 m/s,
estima las dimensiones preliminares:
- Envergadura
- Cuerda media
- Longitud de fuselaje
- Superficie alar

Muestra las formulas y asunciones usadas.
```

### Revisar Modelo
```
Revisa este modelo CAD de ala:
- Envergadura: 2.5m
- Cuerda raiz: 0.4m
- Cuerda punta: 0.2m
- Perfil: NACA 4412

Identifica posibles problemas de manufacturabilidad
y sugiere mejoras.
```

---

## Evaluacion

| Criterio | Peso | Descripcion |
|----------|------|-------------|
| Modelo CAD completo | 40% | Geometria correcta, parametrizada |
| Uso de IA | 20% | Documentar interacciones con IA |
| Exportacion | 20% | Archivos listos para analisis |
| Documentacion | 20% | Plano tecnico basico |

---

## Recursos Adicionales

### Tutoriales
- [Fusion 360 for Beginners](https://www.youtube.com/results?search_query=fusion+360+beginner)
- [FreeCAD Aircraft Tutorial](https://wiki.freecad.org/Aeroplane)
- [NACA Airfoil Generator](http://airfoiltools.com/airfoil/naca4digit)

### Referencias
- Abbott & Von Doenhoff - "Theory of Wing Sections"
- Raymer - "Aircraft Design" (Cap. 7: Configuration Layout)

---

## Errores Comunes

| Error | Consecuencia | Solucion |
|-------|--------------|----------|
| Perfil no cerrado | Falla lofting | Verificar continuidad de curvas |
| Unidades mezcladas | Escala incorrecta | Configurar unidades al inicio |
| Sin parametrizacion | Diseno rigido | Usar variables desde el inicio |
| Geometria compleja | CFD/FEA lento | Simplificar para analisis |

---

## Conexion con Otros Modulos

- **Modulo 02**: El ala modelada aqui se analiza en CFD
- **Modulo 03**: La estructura se analiza en FEA
- **Modulo 05**: Todo se integra en diseno final

---

*Modulo 01 - CAD con AI - Track Aeronautica - FPUNA 2026*
