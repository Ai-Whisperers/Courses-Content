# Ejercicio 1: Verificación de Cálculos Aerodinámicos con IA

## Objetivo
Usar IA para verificar y entender cálculos aerodinámicos básicos.

## Duración
45-60 minutos

## Prerrequisitos
- Conocimientos básicos de aerodinámica
- Calculadora o Python/Excel
- Acceso a Claude

## ⚠️ ADVERTENCIA CRÍTICA

**Los errores en cálculos aeronáuticos pueden ser fatales.**

La IA es una herramienta de APOYO para:
- Verificar tus cálculos
- Explicar conceptos
- Detectar errores obvios

La IA NO reemplaza:
- Software certificado (XFLR5, AVL, OpenVSP)
- Validación experimental
- Supervisión de un ingeniero calificado
- Normas y regulaciones aeronáuticas

**NUNCA uses únicamente IA para diseñar aeronaves reales.**

---

## Parte 1: Cálculos Básicos (15 minutos)

### El Problema

Calcula el número de Reynolds y el coeficiente de sustentación para un ala con estas características:

**Datos del ala:**
- Cuerda media: c = 0.3 m
- Envergadura: b = 2.0 m
- Perfil: NACA 2412

**Condiciones de vuelo:**
- Velocidad: V = 15 m/s
- Altitud: nivel del mar
- Temperatura: 25°C

**Propiedades del aire (nivel del mar, 25°C):**
- Densidad: ρ = 1.184 kg/m³
- Viscosidad cinemática: ν = 1.562 × 10⁻⁵ m²/s

### Haz los cálculos primero

**Número de Reynolds:**
```
Re = (V × c) / ν

Re = (_____ × _____) / _____

Re = _____________
```

**Relación de aspecto:**
```
AR = b² / S = b / c (para ala rectangular)

AR = _____ / _____

AR = _____
```

**Área del ala:**
```
S = b × c

S = _____ × _____

S = _____ m²
```

---

## Parte 2: Verificar con IA (10 minutos)

### Prompt para verificación

```
Por favor verifica estos cálculos aerodinámicos:

**Datos del problema:**
- Cuerda media: c = 0.3 m
- Envergadura: b = 2.0 m
- Velocidad: V = 15 m/s
- Densidad aire: ρ = 1.184 kg/m³
- Viscosidad cinemática: ν = 1.562 × 10⁻⁵ m²/s

**Mis cálculos:**
1. Re = [TU RESULTADO]
2. AR = [TU RESULTADO]
3. S = [TU RESULTADO]

Por favor:
1. Verifica si mis resultados son correctos
2. Muestra el cálculo paso a paso
3. ¿Este Reynolds es típico para qué tipo de aeronave?
4. ¿Qué implicaciones tiene para el rendimiento?
```

### Compara resultados

| Cálculo | Tu resultado | Resultado IA | ¿Coincide? |
|---------|--------------|--------------|------------|
| Reynolds | | | |
| Aspect Ratio | | | |
| Área ala | | | |

### Si hay diferencias
- [ ] ¿Error de unidades?
- [ ] ¿Error en la fórmula?
- [ ] ¿Error de cálculo numérico?

---

## Parte 3: Cálculo de Sustentación (15 minutos)

### El problema

Para el perfil NACA 2412 a ángulo de ataque α = 5°, calcula la sustentación.

**Datos adicionales:**
- CL del NACA 2412 a α=5° ≈ 0.75 (de tablas)
- Peso de la aeronave: 3 kg

### Fórmula de sustentación

```
L = ½ × ρ × V² × S × CL
```

### Haz el cálculo

```
L = ½ × _____ × _____² × _____ × _____

L = _____ N
```

### Verifica con IA

```
Calcula la sustentación para estas condiciones:

**Condiciones:**
- Densidad: ρ = 1.184 kg/m³
- Velocidad: V = 15 m/s
- Área alar: S = 0.6 m²
- CL = 0.75

**Mi cálculo:**
L = [TU RESULTADO] N

**Preguntas:**
1. ¿Mi cálculo es correcto?
2. Si el peso es 3 kg (29.4 N), ¿esta ala genera
   suficiente sustentación?
3. ¿Cuál sería la velocidad mínima de vuelo (stall)
   asumiendo CLmax = 1.3?
4. ¿Qué margen de seguridad tengo a 15 m/s?
```

### Analiza los resultados

| Parámetro | Valor |
|-----------|-------|
| Sustentación calculada | N |
| Peso de la aeronave | 29.4 N |
| L/W (relación) | |
| ¿Puede volar a 15 m/s? | Sí / No |
| Velocidad de stall calculada | m/s |

---

## Parte 4: Análisis de Sensibilidad (10 minutos)

### Pide análisis a la IA

```
Para el mismo ala (S=0.6 m², CL=0.75, peso=3kg):

Calcula cómo varía la sustentación con:

1. **Velocidad:** de 10 a 25 m/s en pasos de 5 m/s
2. **Altitud:** nivel del mar vs 2000m vs 4000m
3. **Ángulo de ataque:** de 0° a 10° (usando curva
   típica del NACA 2412)

Presenta los resultados en tablas y explica:
- ¿A qué velocidad mínima puede volar esta aeronave?
- ¿Cuánto afecta la altitud al rendimiento?
- ¿Cuál es el mejor ángulo de ataque para crucero?
```

### Completa las tablas

**Variación con velocidad (nivel del mar):**
| V (m/s) | L (N) | L/W | ¿Puede volar? |
|---------|-------|-----|---------------|
| 10 | | | |
| 15 | | | |
| 20 | | | |
| 25 | | | |

**Variación con altitud (V=15 m/s):**
| Altitud (m) | ρ (kg/m³) | L (N) | ¿Puede volar? |
|-------------|-----------|-------|---------------|
| 0 | 1.184 | | |
| 2000 | ~1.007 | | |
| 4000 | ~0.819 | | |

---

## Parte 5: Detectar Errores Comunes (10 minutos)

### Cálculos con errores intencionales

La IA debe ayudarte a encontrar los errores:

```
Verifica estos cálculos. Hay errores intencionales:

**Cálculo 1 - Reynolds:**
V = 20 m/s, c = 0.5 m, ν = 1.5e-5 m²/s
Re = V × c × ν = 20 × 0.5 × 1.5e-5 = 1.5e-4
¿Correcto?

**Cálculo 2 - Sustentación:**
ρ = 1.2 kg/m³, V = 10 m/s, S = 1 m², CL = 0.8
L = ρ × V² × S × CL = 1.2 × 100 × 1 × 0.8 = 96 N
¿Correcto?

**Cálculo 3 - Velocidad de stall:**
Peso = 50 N, S = 1 m², CLmax = 1.5, ρ = 1.2 kg/m³
Vstall = √(2W / ρ × S × CL) = √(100 / 1.8) = 7.45 m/s
¿Correcto?

Para cada error:
1. Identifica qué está mal
2. Explica por qué es un error
3. Da el resultado correcto
```

### Registra los errores encontrados

| Cálculo | Error encontrado | Resultado correcto |
|---------|-----------------|-------------------|
| 1 | | |
| 2 | | |
| 3 | | |

---

## Valores de Referencia para Verificar

### Órdenes de magnitud típicos

| Parámetro | Aeromodelo | UAV pequeño | Avión liviano |
|-----------|------------|-------------|---------------|
| Re típico | 50,000-200,000 | 200,000-1,000,000 | 2,000,000+ |
| Velocidad | 10-30 m/s | 15-40 m/s | 30-80 m/s |
| CL crucero | 0.4-0.8 | 0.5-1.0 | 0.3-0.6 |
| L/D | 8-15 | 10-20 | 10-18 |

**Si tus resultados están muy fuera de estos rangos, verifica los cálculos.**

---

## Template para Verificación de Cálculos

```
## Verificación de Cálculo Aerodinámico

**Tipo de cálculo:** [Reynolds / Sustentación / Resistencia / etc.]

**Datos de entrada:**
| Variable | Valor | Unidad |
|----------|-------|--------|
| | | |

**Fórmula usada:**
[Escribir la fórmula]

**Mi cálculo paso a paso:**
[Mostrar el desarrollo]

**Mi resultado:** [valor con unidades]

**Por favor:**
1. ¿El resultado es correcto?
2. ¿Las unidades son consistentes?
3. ¿El orden de magnitud es razonable?
4. ¿Hay algún error común que deba revisar?
```

---

## Entregable

### Hoja de cálculos verificados

```markdown
# Análisis Aerodinámico - [Tu nombre]

## Datos del ala
- Cuerda: ___ m
- Envergadura: ___ m
- Perfil: ________

## Resultados verificados

| Cálculo | Valor | Verificado con IA |
|---------|-------|-------------------|
| Reynolds | | ✓ |
| Aspect Ratio | | ✓ |
| Área alar | | ✓ |
| Sustentación @ 15 m/s | | ✓ |
| Velocidad de stall | | ✓ |

## Conclusiones
[¿Puede volar? ¿Con qué margen de seguridad?]
```

---

## Criterios de Éxito

- [ ] Calculaste Reynolds correctamente
- [ ] Calculaste sustentación correctamente
- [ ] Usaste IA para verificar tus resultados
- [ ] Identificaste los errores intencionales
- [ ] Analizaste sensibilidad a velocidad/altitud
- [ ] Entiendes las limitaciones de usar IA para esto

---

## Recordatorio Final

**La IA es excelente para:**
- Verificar cálculos rápidamente
- Explicar conceptos físicos
- Detectar errores de unidades
- Hacer análisis de sensibilidad

**La IA NO es confiable para:**
- Coeficientes aerodinámicos precisos (usa XFLR5, túnel de viento)
- Análisis estructural crítico
- Certificación de aeronaves
- Decisiones de seguridad de vuelo

---

*Ejercicio 1 - Ingeniería Aeronáutica - FPUNA 2026*
