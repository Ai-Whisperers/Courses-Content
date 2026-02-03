# Ejercicio 2: Análisis de Perfiles Aerodinámicos con IA

## Objetivo
Usar IA para entender características de perfiles NACA y seleccionar el adecuado para tu proyecto.

## Duración
50-60 minutos

## Prerrequisitos
- Conocimiento básico de perfiles aerodinámicos
- Acceso a XFLR5 o Airfoil Tools (airfoiltools.com)
- Acceso a Claude

## ⚠️ ADVERTENCIA

**La IA puede dar información incorrecta sobre perfiles.**

SIEMPRE verifica los datos en:
- Software de análisis (XFLR5, AVL)
- Bases de datos oficiales (UIUC Airfoil Database)
- Literatura técnica (Theory of Wing Sections - Abbott & Von Doenhoff)

---

## Parte 1: Entender la Nomenclatura NACA (10 minutos)

### El problema

Tienes un perfil NACA 2412. ¿Qué significan estos números?

### Pide explicación a la IA

```
Explícame la nomenclatura de perfiles NACA de 4 dígitos.

Para el perfil NACA 2412:
1. ¿Qué significa cada dígito?
2. ¿Cuál es su camber máximo y dónde está ubicado?
3. ¿Cuál es su espesor máximo?
4. ¿Es simétrico o asimétrico?

Compáralo con:
- NACA 0012 (¿qué lo hace diferente?)
- NACA 4415 (¿más o menos sustentación?)
- NACA 6412 (¿más o menos eficiente?)

Usa un diagrama ASCII si es posible.
```

### Completa la tabla

| Perfil | Camber (%) | Posición camber (%) | Espesor (%) | Tipo |
|--------|------------|---------------------|-------------|------|
| NACA 0012 | | | | Simétrico |
| NACA 2412 | | | | |
| NACA 4415 | | | | |
| NACA 6412 | | | | |

---

## Parte 2: Características de Rendimiento (15 minutos)

### Pide análisis de rendimiento

```
Para un UAV pequeño que volará a Re = 200,000:

Compara estos tres perfiles NACA:
1. NACA 2412 (perfil clásico de aviación general)
2. NACA 4412 (mayor camber)
3. NACA 0012 (simétrico)

Para cada uno, dame:
1. CL máximo aproximado
2. Ángulo de ataque de stall
3. CD mínimo
4. L/D máximo (eficiencia)
5. Ángulo de sustentación cero

Presenta en formato tabla.

Luego recomienda:
- ¿Cuál es mejor para crucero eficiente?
- ¿Cuál es mejor para acrobacia?
- ¿Cuál es mejor para despegue corto?

NOTA: Estos son valores aproximados. Verificaré
en XFLR5 antes de tomar decisiones de diseño.
```

### Tabla de rendimiento (verificar en XFLR5)

| Parámetro | NACA 2412 | NACA 4412 | NACA 0012 |
|-----------|-----------|-----------|-----------|
| CLmax | | | |
| αstall | | | |
| CDmin | | | |
| (L/D)max | | | |
| α₀ (CL=0) | | | |

### Verificación en XFLR5 o Airfoil Tools

1. Ve a [airfoiltools.com](http://airfoiltools.com)
2. Busca cada perfil
3. Mira la polar a Re = 200,000
4. Compara con los valores de la IA

| Parámetro | IA dijo | Airfoil Tools dice | Diferencia |
|-----------|---------|-------------------|------------|
| CLmax (2412) | | | |
| (L/D)max (2412) | | | |
| αstall (2412) | | | |

---

## Parte 3: Selección de Perfil para Proyecto (15 minutos)

### Tu escenario de diseño

```
Estoy diseñando un UAV de vigilancia con estos requerimientos:

**Misión:**
- Velocidad de crucero: 20 m/s
- Altitud máxima: 500 m (nivel del mar como referencia)
- Autonomía: máxima posible (prioridad en eficiencia)
- Carga útil: cámara de 500g

**Ala:**
- Envergadura: 3 m
- Cuerda: 0.3 m
- Construcción: espuma con fibra de vidrio

**Condiciones:**
- Re estimado: ~400,000
- Peso total estimado: 4 kg

**Requerimientos del perfil:**
- Alta eficiencia (L/D) para maximizar autonomía
- Buen comportamiento en stall (gradual, no abrupto)
- Espesor suficiente para la estructura (~12-15%)
- Manufactura relativamente simple

Recomiéndame 3 perfiles candidatos y explica
pros/contras de cada uno para esta aplicación.
```

### Analiza las recomendaciones

| Perfil recomendado | Pros | Contras | ¿Verificarás en XFLR5? |
|-------------------|------|---------|------------------------|
| | | | [ ] |
| | | | [ ] |
| | | | [ ] |

---

## Parte 4: Entender las Polares (10 minutos)

### Pide explicación de polares

```
Explícame cómo leer una polar de perfil aerodinámico.

Usando el NACA 2412 como ejemplo:

1. **Polar CL vs α:**
   - ¿Qué es la pendiente de sustentación?
   - ¿Dónde está el punto de stall?
   - ¿Qué significa el ángulo de sustentación cero?

2. **Polar CL vs CD:**
   - ¿Cómo encuentro el L/D máximo?
   - ¿Qué es el CD parásito (CD0)?
   - ¿Qué indica la "cubeta" de la polar?

3. **Polar Cm vs α:**
   - ¿Por qué importa el momento de cabeceo?
   - ¿Qué significa un Cm negativo?

Incluye sketches ASCII de cada tipo de gráfica
marcando los puntos importantes.
```

### Dibuja las polares

En una hoja aparte (o aquí), sketch las 3 polares:

```
CL vs α:                    CL vs CD:                   Cm vs α:

    CL                          CL                          Cm
     |                           |                           |
     |    /--                    |     /                     |
     |   /                       |    /                      |---\
     |  /                        |   /                       |    \
     | /                         |  /                        |     \
-----+-----→ α            ------+-----→ CD            -----+-----→ α
     |                           |                           |
```

---

## Parte 5: Efectos de Número de Reynolds (10 minutos)

### Compara rendimiento a diferentes Re

```
Para el NACA 2412, ¿cómo cambia el rendimiento
con el número de Reynolds?

Compara:
1. Re = 100,000 (aeromodelo pequeño)
2. Re = 500,000 (UAV mediano)
3. Re = 2,000,000 (avión liviano)

Para cada caso:
- CLmax
- (L/D)max
- Comportamiento de stall (abrupto vs gradual)
- Rango de operación eficiente

¿Por qué el Reynolds afecta tanto al rendimiento?
Explica el fenómeno físico (capa límite, transición).
```

### Tabla de variación con Re

| Parámetro | Re=100k | Re=500k | Re=2M | Tendencia |
|-----------|---------|---------|-------|-----------|
| CLmax | | | | ↑ / ↓ |
| (L/D)max | | | | ↑ / ↓ |
| CDmin | | | | ↑ / ↓ |
| Stall | | | | |

---

## Template para Análisis de Perfiles

```
## Análisis de Perfil para [PROYECTO]

**Perfil analizado:** NACA ____

**Condiciones de operación:**
- Número de Reynolds: ____________
- Velocidad de crucero: ______ m/s
- Altitud: ______ m

**Preguntas:**
1. ¿Cuál es el CLmax de este perfil a mi Re?
2. ¿Cuál es el mejor ángulo de ataque para crucero?
3. ¿Cuánto L/D puedo esperar?
4. ¿Cómo es el comportamiento de stall?
5. ¿Es adecuado para mi aplicación? ¿Por qué?

**Comparar con:** [otros perfiles candidatos]

**NOTA:** Verificaré todos los datos en XFLR5
antes de tomar decisiones finales.
```

---

## Errores Comunes a Evitar

### La IA puede cometer estos errores:

- [ ] **Datos de Re incorrecto:** Dar CLmax a Re=6M cuando preguntas por Re=200k
- [ ] **Confundir perfiles:** NACA 4412 vs NACA 4415
- [ ] **Ignorar efectos 3D:** La polar es 2D, un ala real tiene efectos de punta
- [ ] **Valores promedio:** Dar un "valor típico" en vez de específico
- [ ] **Fuentes mezcladas:** Combinar datos de diferentes fuentes/condiciones

### Siempre verificar en:

1. **XFLR5** - Análisis gratuito de perfiles
2. **Airfoil Tools** - Base de datos online
3. **UIUC Database** - Datos experimentales
4. **Abbott & Von Doenhoff** - Libro de referencia clásico

---

## Entregable

### Análisis comparativo de perfiles

```markdown
# Selección de Perfil para [Tu proyecto]

## Requerimientos
- Aplicación: __________
- Re operacional: __________
- Prioridades: [eficiencia / CLmax / manufactura]

## Candidatos analizados

### Opción 1: NACA ____
| Parámetro | Valor IA | Valor XFLR5 |
|-----------|----------|-------------|
| CLmax | | |
| (L/D)max | | |
| αstall | | |

**Pros:**
**Contras:**

### Opción 2: NACA ____
[Similar tabla]

### Opción 3: NACA ____
[Similar tabla]

## Selección final
Perfil elegido: NACA ____
Razón: __________

## Verificación pendiente
- [ ] Análisis en XFLR5 completo
- [ ] Revisar efectos 3D
- [ ] Consultar con asesor
```

---

## Criterios de Éxito

- [ ] Entiendes la nomenclatura NACA
- [ ] Comparaste rendimiento de 3+ perfiles
- [ ] Verificaste datos de IA en otra fuente
- [ ] Identificaste el perfil adecuado para tu aplicación
- [ ] Entiendes cómo leer polares aerodinámicas
- [ ] Conoces el efecto del número de Reynolds

---

*Ejercicio 2 - Ingeniería Aeronáutica - FPUNA 2026*
