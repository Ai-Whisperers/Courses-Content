# Analisis de Alas 3D y Estabilidad

## 1. De 2D a 3D

### Diferencias Clave

| Aspecto | Perfil 2D | Ala 3D |
|---------|-----------|--------|
| Arrastre | Solo parasito | Parasito + Inducido |
| CL_max | Del perfil | Menor (efectos de punta) |
| Distribucion | Uniforme | Varia con envergadura |
| Analisis | XFoil | VLM, Panel Methods |

### Arrastre Inducido

Al generar sustentacion, el ala crea vortices en las puntas que "arrastran" hacia atras:

```
Vista trasera del ala:

    ^  ^  ^  ^  ^  ^  ^
    |  |  |  |  |  |  |
====+==================+====
    |  Vortice         |  Vortice
    v  Punta Izq       v  Punta Der
```

**Formula**:
```
CDi = CL^2 / (pi * AR * e)

Donde:
- AR = b^2 / S (aspect ratio)
- e = factor de eficiencia de Oswald (0.7-0.9)
```

---

## 2. Geometria del Ala

### Parametros de Definicion

```
Vista Superior:
                         Envergadura (b)
    <------------------------------------------------->
    
    +---------+                           +---------+
    |    c_r  |                           |   c_t   |
    |         +---------------------------+         |
    |         |                           |         |
    +---------+---------------------------+---------+
    
    Raiz                                  Punta
```

| Parametro | Simbolo | Formula |
|-----------|---------|---------|
| Envergadura | b | - |
| Cuerda raiz | c_r | - |
| Cuerda punta | c_t | - |
| Taper ratio | lambda | c_t / c_r |
| Superficie | S | (c_r + c_t) * b / 2 |
| Aspect ratio | AR | b^2 / S |
| MAC | c_mac | Ver formula abajo |

### Cuerda Aerodinamica Media (MAC)

```
MAC = (2/3) * c_r * (1 + lambda + lambda^2) / (1 + lambda)

Ejemplo: c_r = 0.4m, lambda = 0.5
MAC = (2/3) * 0.4 * (1 + 0.5 + 0.25) / (1 + 0.5)
MAC = 0.267 * 1.75 / 1.5 = 0.311 m
```

---

## 3. Distribucion de Sustentacion

### Distribucion Eliptica (Ideal)

La distribucion eliptica minimiza el arrastre inducido:

```
CL_local
    ^
    |     ___________
    |   /             \
    |  /               \
    | /                 \
    |/                   \
    +-----------------------> y (envergadura)
    Raiz              Punta
```

### Distribucion Real

La distribucion real depende de:
- Taper ratio
- Twist (torsion)
- Perfil en cada seccion

### Twist (Torsion)

**Washout**: Twist negativo en la punta
- Reduce carga en punta
- Mejora comportamiento en stall
- El ala entra en stall desde la raiz (mejor control)

Tipico: -2 a -4 grados de washout

---

## 4. Analisis en XFLR5

### Configurar Ala

1. **Plane -> Define a New Plane**
2. Nombrar el avion
3. Definir ala principal:

```
Seccion 1 (Raiz):
- y position: 0 m
- Chord: 0.4 m
- Offset: 0 m
- Dihedral: 3 deg
- Twist: 0 deg
- Foil: NACA 4412

Seccion 2 (Punta):
- y position: 1.25 m (semi-envergadura)
- Chord: 0.2 m
- Offset: 0.05 m (flecha)
- Dihedral: 3 deg
- Twist: -2 deg
- Foil: NACA 4412
```

### Metodos de Analisis

| Metodo | Precision | Velocidad | Uso |
|--------|-----------|-----------|-----|
| LLT | Baja | Rapido | Estimaciones iniciales |
| VLM1 | Media | Medio | Diseno preliminar |
| VLM2 | Media-Alta | Medio | Analisis detallado |
| 3D Panels | Alta | Lento | Validacion |

### Ejecutar Analisis

1. **Analysis -> Define an Analysis**
2. Seleccionar metodo (VLM2 recomendado)
3. Configurar:
   - Analysis type: Fixed speed
   - Free stream velocity: 14 m/s
   - Density: 1.15 kg/m^3
   - Viscosity: 1.6e-5 m^2/s

4. **Analysis -> Batch Analysis**
5. Alpha range: -2 to 12 deg

---

## 5. Resultados del Ala

### Polar del Ala

Similar a perfil pero con arrastre inducido incluido.

```
CD_total = CD_0 + CD_i

Donde CD_0 viene del perfil y CD_i del ala.
```

### Distribucion de CL

Grafico de CL local vs posicion en envergadura.

**Verificar**:
- La punta tiene CL menor (evita stall de punta)
- Distribucion similar a eliptica (eficiente)

### Centro de Presiones

Posicion donde actua la resultante de sustentacion.
- Se mueve con angulo de ataque
- Importante para estabilidad

---

## 6. Estabilidad Longitudinal

### Conceptos Clave

| Termino | Definicion |
|---------|------------|
| Centro de Gravedad (CG) | Donde actua el peso |
| Centro Aerodinamico (AC) | Donde actua la sustentacion |
| Punto Neutro (NP) | CG donde avion es neutralmente estable |
| Margen Estatico (SM) | Distancia CG a NP, normalizada por MAC |

### Margen Estatico

```
SM = (X_np - X_cg) / MAC * 100%

Estable: SM > 0 (CG adelante de NP)
Tipico: SM = 10-15%
```

### En XFLR5

1. Agregar estabilizador horizontal
2. Definir posicion de CG
3. XFLR5 calcula derivadas de estabilidad

---

## 7. Analisis de Estabilidad

### Derivadas Importantes

| Derivada | Significado | Valor Tipico |
|----------|-------------|--------------|
| Cm_alpha | Estabilidad de cabeceo | < 0 (estable) |
| Cl_beta | Estabilidad lateral | < 0 (estable) |
| Cn_beta | Estabilidad direccional | > 0 (estable) |

### Interpretar en XFLR5

**Stability -> Polar -> View Stability Results**

Graficos de:
- Cm vs Alpha (debe tener pendiente negativa)
- Derivadas vs velocidad

---

## 8. Optimizacion del Ala

### Objetivos Tipicos

1. **Maximizar L/D** (eficiencia)
2. **Minimizar peso** (estructura)
3. **Comportamiento benigno en stall**
4. **Manufacturabilidad**

### Parametros a Ajustar

| Parametro | Efecto al aumentar |
|-----------|-------------------|
| AR | Menor CDi, pero mas peso, mas flexible |
| Taper | Menor CDi, stall mas abrupto |
| Washout | Stall mas suave, menor eficiencia |
| Diedro | Mas estabilidad lateral |

### Trade-offs

- **AR alto**: Mejor eficiencia, pero ala mas larga y pesada
- **Taper bajo**: Mas eficiente, pero stall de punta
- **Washout alto**: Stall seguro, pero menor CL_max

---

## 9. Ejercicio: Ala de UAV

### Especificaciones

| Parametro | Valor |
|-----------|-------|
| Envergadura | 2.0 m |
| Cuerda raiz | 0.35 m |
| Taper ratio | 0.57 (c_punta = 0.2 m) |
| Perfil | NACA 4412 |
| Washout | -2 deg |
| Diedro | 3 deg |

### Tareas

1. Crear el ala en XFLR5
2. Ejecutar analisis VLM2 a V = 14 m/s
3. Registrar:
   - CL_max del ala = ____
   - (L/D)_max = ____
   - Alpha @ L/D_max = ____

4. Verificar distribucion de CL (debe ser suave)
5. Exportar resultados

---

## 10. Limitaciones de XFLR5

### No Incluye

- Efectos de fuselaje
- Interaccion ala-cola detallada
- Flujo separado complejo
- Efectos de Reynolds locales variables

### Cuando Usar CFD Completo

- Geometrias complejas
- Validacion final
- Efectos viscosos detallados

Para diseno preliminar de UAV, XFLR5 es suficiente.

---

*Fin del contenido de Modulo 02*
