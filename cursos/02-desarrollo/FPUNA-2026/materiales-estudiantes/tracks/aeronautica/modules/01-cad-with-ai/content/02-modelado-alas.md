# Modelado de Alas y Superficies Aerodinamicas

## 1. Anatomia de un Ala

```
                    Envergadura (b)
    <----------------------------------------->
    
    Cuerda Raiz                     Cuerda Punta
    |-------|                       |---|
    
    +-------+-------------------------+---+
    |       |                         |   |
    |       |                         |   |
    |       |           ALA           |   |
    |       |                         |   |
    +-------+-------------------------+---+
    
    Raiz                              Punta
```

### Parametros Fundamentales

| Parametro | Simbolo | Formula | Ejemplo |
|-----------|---------|---------|---------|
| Envergadura | b | - | 2.5 m |
| Cuerda raiz | c_r | - | 0.4 m |
| Cuerda punta | c_t | - | 0.2 m |
| Superficie alar | S | (c_r + c_t) * b / 2 | 0.75 m^2 |
| Aspect Ratio | AR | b^2 / S | 8.33 |
| Taper Ratio | lambda | c_t / c_r | 0.5 |
| MAC | c_mac | (2/3)*c_r*(1+lambda+lambda^2)/(1+lambda) | 0.311 m |

---

## 2. Generar Perfil NACA con IA

### Prompt Recomendado

```
Genera las coordenadas de un perfil NACA 2412 con las siguientes especificaciones:
- 50 puntos en extrados + 50 puntos en intrados
- Cuerda normalizada = 1.0
- Distribucion de puntos: coseno (mas denso en borde de ataque)
- Formato: X, Y (separados por coma, un punto por linea)
- Primero extrados (de borde de fuga a borde de ataque)
- Luego intrados (de borde de ataque a borde de fuga)
```

### Resultado Esperado (fragmento)

```
1.0000, 0.0013
0.9755, 0.0112
0.9511, 0.0198
...
0.0000, 0.0000
...
0.9511, -0.0118
0.9755, -0.0063
1.0000, 0.0013
```

---

## 3. Tutorial: Modelar Ala en Fusion 360

### Paso 1: Configurar Variables

En Modify -> Change Parameters, crear:

| Variable | Valor | Unidad |
|----------|-------|--------|
| envergadura | 2500 | mm |
| cuerda_raiz | 400 | mm |
| cuerda_punta | 200 | mm |
| twist | 3 | deg |

### Paso 2: Sketch del Perfil Raiz

1. **Crear Sketch** en plano XZ (vista lateral)
2. **Insert Spline** -> Through Points
3. Copiar coordenadas NACA generadas por IA
4. **Escalar**: Select All -> Scale -> Factor = cuerda_raiz/1000
5. Posicionar en origen

### Paso 3: Sketch del Perfil Punta

1. **Crear Plano** paralelo a XZ, offset = envergadura/2
2. **Nuevo Sketch** en ese plano
3. **Repetir** importacion de perfil
4. **Escalar**: Factor = cuerda_punta/1000
5. **Rotar** por angulo de twist

### Paso 4: Loft

1. **Create -> Loft**
2. Seleccionar perfil raiz como Profile 1
3. Seleccionar perfil punta como Profile 2
4. Rails: opcional (para controlar curvatura)
5. **OK**

### Paso 5: Simetria (ala completa)

1. **Create -> Mirror**
2. Seleccionar el cuerpo del ala
3. Mirror Plane: plano XZ (central)
4. **OK**

---

## 4. Variaciones de Ala

### Ala Rectangular (sin taper)

```
taper_ratio = 1.0
cuerda_punta = cuerda_raiz
```

Simple pero menos eficiente aerodinamicamente.

### Ala Eliptica

Cuerda varia elipticamente. Maxima eficiencia pero dificil de fabricar.

```python
# Cuerda en funcion de posicion Y
def cuerda_eliptica(y, cuerda_raiz, envergadura):
    return cuerda_raiz * sqrt(1 - (2*y/envergadura)**2)
```

### Ala con Flecha (Sweep)

```
sweep_angle = 15  # grados
```

En Fusion: offsetear el perfil de punta hacia atras.

### Ala con Diedro

```
diedro = 5  # grados
```

Elevar la punta respecto a la raiz para estabilidad lateral.

---

## 5. Fuselajes

### Tipos de Seccion

| Tipo | Uso | Modelado |
|------|-----|----------|
| Circular | UAV, aviones ligeros | Revolve |
| Eliptico | Optimizado aerodinamicamente | Loft de elipses |
| Rectangular | Carga interna | Loft con redondeos |

### Tutorial: Fuselaje por Revolucion

1. **Sketch** en plano XZ
2. Dibujar **contorno** del fuselaje (media seccion)
3. **Revolve** 360 grados alrededor del eje X
4. Resultado: fuselaje simetrico

### Tutorial: Fuselaje por Loft

1. **Crear sketches** en planos perpendiculares a X
2. Dibujar secciones transversales (circulos, elipses)
3. **Loft** conectando todas las secciones
4. Permite variacion de forma a lo largo del fuselaje

---

## 6. Empenajes

### Estabilizador Horizontal

```
Superficie tipica: 15-25% de superficie alar
Perfil: NACA 0009 o similar (simetrico, delgado)
```

Modelar igual que ala, pero mas pequeno.

### Estabilizador Vertical

```
Superficie tipica: 8-12% de superficie alar
Posicion: atras del CG
```

### Superficies de Control

1. **Cortar** la seccion movil del borde de fuga
2. Crear como **cuerpo separado**
3. Agregar **bisagras** para animacion (opcional)

---

## 7. Verificacion del Modelo

### Propiedades a Revisar

| Propiedad | Como obtener | Que verificar |
|-----------|--------------|---------------|
| Volumen | Properties -> Physical | Razonable para materiales |
| Area superficial | Properties -> Physical | Para calculos de friccion |
| Centro de masa | Properties -> Physical | Posicion relativa al ala |

### Analisis de Seccion

1. **Inspect -> Section Analysis**
2. Mover plano de corte a diferentes posiciones
3. Verificar que la seccion sea correcta en toda el ala

---

## 8. Exportacion para Analisis

### Para CFD (Aerodinamica)

- **Formato**: STEP o IGES
- **Simplificar**: remover detalles pequenos
- **Cerrar**: asegurar que sea watertight

### Para FEA (Estructuras)

- **Formato**: STEP
- **Incluir**: estructura interna si existe
- **Separar**: componentes que se analizaran por separado

### Para Prototipado Rapido

- **Formato**: STL
- **Resolucion**: Alta para curvas suaves
- **Escala**: Verificar unidades

---

## 9. Ejercicio: Ala de UAV

### Especificaciones

| Parametro | Valor |
|-----------|-------|
| Envergadura | 2.0 m |
| Cuerda raiz | 0.35 m |
| Cuerda punta | 0.15 m |
| Perfil | NACA 4415 |
| Twist | -2 grados (washout) |
| Diedro | 3 grados |

### Entregables

1. Modelo CAD del ala (archivo .f3d o .FCStd)
2. Captura de pantalla del modelo
3. Archivo STEP para exportacion
4. Variables usadas (screenshot de parametros)

---

## Tips y Trucos

### Mejorar Calidad del Loft

- Usar **rails** para controlar transicion
- Agregar **secciones intermedias** si hay deformacion
- Verificar **tangencia** en puntos criticos

### Perfiles que No Cierran

- Asegurar que **primer y ultimo punto** coincidan
- Usar **Fit Point Spline** si hay gaps
- Cerrar manualmente con **linea** si necesario

### Performance en Modelos Grandes

- Usar **versiones simplificadas** para trabajo rapido
- **Suprimir** features no necesarios temporalmente
- **Componentes separados** para partes grandes

---

*Siguiente: 03-ia-generativa.md*
