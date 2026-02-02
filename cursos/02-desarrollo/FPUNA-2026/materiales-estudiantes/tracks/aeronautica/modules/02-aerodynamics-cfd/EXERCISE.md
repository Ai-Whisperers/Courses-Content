# Ejercicio Modulo 02: Analisis Aerodinamico con XFLR5 e IA

## Tiempo Estimado: 90 minutos

---

## Objetivo

Analizar y comparar el rendimiento de 3 perfiles aerodinamicos para tu UAV agricola, seleccionar el optimo, y documentar el proceso usando XFLR5 e IA.

---

## Especificaciones del UAV

Del Modulo 01, tu UAV tiene:

| Parametro | Valor |
|-----------|-------|
| MTOW | 4.5 kg |
| Velocidad crucero | 14 m/s |
| Velocidad stall | 10 m/s |
| Cuerda media | ~0.28 m (del sizing) |
| Altitud operacion | 150 m AGL |
| Condiciones | Paraguay verano (30C) |

### Calcula Reynolds de Operacion

```
Re = V * c / nu

A 30C y 150m: nu ~ 1.6e-5 m^2/s

Re_crucero = 14 * 0.28 / 1.6e-5 = ______
Re_stall = 10 * 0.28 / 1.6e-5 = ______
```

---

## Parte 1: Seleccion de Perfiles Candidatos (15 min)

### Tarea 1.1: Consulta a IA

```
Para un UAV agricola con:
- Re = 250,000 (aproximado)
- CL de crucero = 0.5-0.7
- Prioridad: eficiencia (L/D alto) y buen comportamiento en stall

Sugiere 3 perfiles NACA de 4 digitos candidatos.
Para cada uno indica:
- Por que es apropiado
- CL_max esperado
- Comportamiento en stall (suave/abrupto)
```

### Tarea 1.2: Seleccionar Perfiles

Basandote en la respuesta de IA, selecciona 3 perfiles para analizar:

| Perfil | Razon de seleccion |
|--------|-------------------|
| NACA _____ | |
| NACA _____ | |
| NACA _____ | |

---

## Parte 2: Analisis en XFLR5 (45 min)

### Tarea 2.1: Importar Perfiles

1. Abrir XFLR5
2. File -> Import -> Airfoil (formato .dat)
   - Usar coordenadas de [UIUC Database](https://m-selig.ae.illinois.edu/ads/coord_database.html)
   - O generar con IA
3. Repetir para los 3 perfiles

### Tarea 2.2: Configurar Analisis

1. Analysis -> Define an Analysis
2. Configurar:
   - Type 1 (Fixed speed)
   - Reynolds: Tu Re calculado (ej: 245,000)
   - Mach: 0 (incompresible)
   - NCrit: 9 (transicion natural)

### Tarea 2.3: Ejecutar Analisis

1. Seleccionar perfil
2. Analysis -> Batch Analysis
3. Alpha range: -5 a 15 grados, step 0.5
4. Run
5. Repetir para cada perfil

### Tarea 2.4: Extraer Datos

Para cada perfil, registrar:

| Parametro | Perfil 1 | Perfil 2 | Perfil 3 |
|-----------|----------|----------|----------|
| CL_max | | | |
| Alpha_stall (deg) | | | |
| CD_min | | | |
| Alpha @ CD_min | | | |
| CL @ L/D_max | | | |
| (L/D)_max | | | |
| Alpha @ L/D_max | | | |

---

## Parte 3: Analisis con IA (20 min)

### Tarea 3.1: Interpretar Resultados

Exportar datos de XFLR5 (Analysis -> Export) y proporcionar a IA:

```
Estos son los datos de 3 perfiles analizados a Re=245,000:

[Pegar datos de la tabla anterior]

Analiza:
1. Cual tiene mejor eficiencia para crucero (CL=0.6)?
2. Cual tiene mejor comportamiento en stall?
3. Cual recomendarias para un UAV agricola?

Considera que el UAV operara:
- Crucero: 14 m/s, CL ~ 0.5-0.6
- Despegue/aterrizaje: 10 m/s, CL ~ 1.0-1.2
- Maniobras: CL variable

Justifica tu recomendacion.
```

### Tarea 3.2: Analisis de Sensibilidad

Pregunta a IA:
```
Si el Re real varia entre 200,000 y 300,000 durante el vuelo,
como afecta esto a cada perfil? Cual es mas robusto?
```

---

## Parte 4: Documentacion (10 min)

### Entregables

| Item | Formato | Nombre |
|------|---------|--------|
| Datos XFLR5 | .csv o screenshot | datos_perfiles_[nombre].csv |
| Polares (grafico) | .png | polar_comparacion_[nombre].png |
| Documento analisis | .pdf | analisis_aero_[nombre].pdf |

### Contenido del Documento

1. **Introduccion**
   - Condiciones de operacion del UAV
   - Reynolds calculado
   - Perfiles seleccionados y por que

2. **Resultados XFLR5**
   - Tabla comparativa
   - Graficos de polares (overlay)
   - CL vs alpha
   - L/D vs alpha

3. **Analisis con IA**
   - Prompts usados
   - Respuestas relevantes
   - Verificacion de recomendaciones

4. **Conclusion**
   - Perfil seleccionado
   - Justificacion
   - Limitaciones del analisis

---

## Rubrica de Evaluacion

| Criterio | Puntos | Descripcion |
|----------|--------|-------------|
| **Calculo Re correcto** | 10 | Formula y valores correctos |
| **Analisis XFLR5** | 30 | 3 perfiles analizados correctamente |
| **Extraccion datos** | 15 | Tabla completa y precisa |
| **Uso de IA** | 20 | Prompts efectivos, verificacion |
| **Seleccion justificada** | 15 | Logica clara, basada en datos |
| **Documentacion** | 10 | Clara, completa, profesional |
| **Total** | 100 | |

---

## Preguntas de Reflexion

1. Por que es importante conocer el Re de operacion antes de seleccionar un perfil?

2. Si XFLR5 y la IA dan recomendaciones diferentes, como decides?

3. Que limitaciones tiene el analisis 2D que hicimos? Como las compensarias en un diseno real?

---

## Recursos

- [UIUC Airfoil Database](https://m-selig.ae.illinois.edu/ads/coord_database.html)
- [Airfoil Tools](http://airfoiltools.com/)
- [XFLR5 Manual](https://sourceforge.net/projects/xflr5/files/Guidelines/)
- Starter-kit: [ejemplo-calculo-reynolds.md](../../starter-kit/examples/ejemplo-calculo-reynolds.md)

---

*Ejercicio Modulo 02 - Aerodinamica y CFD - FPUNA 2026*
