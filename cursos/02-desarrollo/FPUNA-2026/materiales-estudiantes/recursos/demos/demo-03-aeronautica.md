# Demo Track 03: Ingeniería Aeronáutica con IA

## Cálculos y Diseño Asistido por IA

### Objetivo
Demostrar cómo Claude puede asistir en cálculos y diseño aeronáutico.

---

## Demo 1: Cálculo de Sustentación

```bash
claude "Calcula la sustentación de un ala con estas especificaciones:

Datos:
- Superficie alar (S): 16 m²
- Velocidad de vuelo (V): 60 m/s
- Densidad del aire (ρ): 1.225 kg/m³ (nivel del mar)
- Coeficiente de sustentación (CL): 0.8

Muestra:
1. La fórmula de sustentación
2. El cálculo paso a paso
3. El resultado en Newtons y en kg-fuerza
4. Interpretación: ¿Qué peso máximo puede levantar esta ala?"
```

**Resultado esperado:** Cálculo completo con L = ½ρV²SCL ≈ 28,224 N.

---

## Demo 2: Análisis de Perfil NACA

```bash
claude "Analiza el perfil NACA 2412 para un avión de entrenamiento:

Explica:
1. ¿Qué significa cada dígito (2-4-12)?
2. Características geométricas (curvatura, espesor)
3. Comportamiento típico (CL máximo, ángulo de stall)
4. ¿Para qué tipo de aeronave es ideal?
5. Comparación breve con NACA 0012 y NACA 4415

Incluye un diagrama ASCII simple del perfil si es posible."
```

**Resultado esperado:** Análisis completo del perfil con interpretación práctica.

---

## Demo 3: Dimensionamiento de Ala

```bash
claude "Ayúdame a dimensionar el ala para un UAV de reconocimiento:

Especificaciones:
- Peso máximo de despegue (MTOW): 25 kg
- Velocidad de crucero: 25 m/s
- Altitud de operación: 500 m (densidad ≈ 1.17 kg/m³)
- Carga alar típica para UAV similar: 30-50 kg/m²

Calcula:
1. Superficie alar necesaria (usando carga alar)
2. Envergadura recomendada (asumiendo AR = 8)
3. Cuerda media
4. CL necesario en crucero
5. Sugiere un perfil NACA apropiado"
```

**Resultado esperado:** Dimensiones del ala con justificación.

---

## Demo 4: Performance de Vuelo

```bash
claude "Calcula las velocidades características de esta aeronave:

Datos:
- MTOW: 1,200 kg
- Superficie alar: 14 m²
- Potencia del motor: 180 HP
- CD0 (arrastre parásito): 0.025
- Factor de Oswald (e): 0.8
- Aspect Ratio (AR): 7

Calcula y explica:
1. Velocidad de stall (CL_max = 1.5)
2. Velocidad de máxima eficiencia (L/D max)
3. Velocidad de crucero típica
4. Régimen de ascenso máximo estimado

Usa condiciones de nivel del mar."
```

**Resultado esperado:** Cálculos de performance con fórmulas.

---

## Demo 5: Diseño de Empenaje

```bash
claude "Diseña el empenaje horizontal para una aeronave con estas características:

Ala:
- Superficie (S): 12 m²
- Cuerda media (c): 1.2 m
- Posición: Ala baja

Fuselaje:
- Longitud total: 7 m
- Distancia CG al empenaje: 3.5 m

Calcula:
1. Coeficiente de volumen horizontal recomendado (Vh)
2. Superficie del estabilizador horizontal
3. Envergadura sugerida
4. Cuerda del estabilizador
5. Verifica margen estático típico (10-15%)"
```

**Resultado esperado:** Dimensiones del empenaje con verificación de estabilidad.

---

## Demo 6: Estimación de Peso

```bash
claude "Estima la distribución de pesos para un avión ultraligero biplaza:

Especificaciones objetivo:
- MTOW: 600 kg
- Motor: Rotax 912 (aproximadamente 60 kg)
- Combustible: 80 litros de avgas
- Tripulación: 2 personas de 80 kg cada una
- Equipaje: 20 kg

Genera:
1. Tabla de distribución de pesos por componente
2. Peso vacío estimado
3. Carga útil
4. Verificación de que los números cierran
5. Posición aproximada del CG (% de MAC)"
```

**Resultado esperado:** Breakdown de pesos con balance.

---

## Demo 7: Código Python para Polar

```bash
claude "Genera código Python para graficar la polar de arrastre de una aeronave:

Parámetros:
- CD0 = 0.025
- AR = 8
- e = 0.85
- CL_max = 1.5

El código debe:
1. Calcular CD para CL de 0 a CL_max
2. Graficar CL vs CD (polar)
3. Marcar punto de máxima eficiencia (L/D max)
4. Calcular y mostrar el valor de (L/D)_max
5. Usar matplotlib con labels en español

Incluye comentarios explicando la física."
```

**Resultado esperado:** Script Python funcional que genera gráfico.

---

## Ejercicio Interactivo

Los estudiantes diseñan conceptualmente un UAV simple:

1. **Definir misión** (reconocimiento, delivery, etc.)
2. **Estimar peso** con ayuda de IA
3. **Dimensionar ala** (superficie, envergadura)
4. **Seleccionar perfil** NACA apropiado
5. **Calcular velocidades** características
6. **Verificar rendimiento** (alcance, autonomía)

---

## Herramientas Complementarias

Después de los cálculos con Claude:

- **XFLR5:** Validar análisis de perfiles
- **OpenVSP:** Modelar geometría 3D
- **Excel/Python:** Iterar cálculos
- **Fusion 360:** CAD del diseño

---

## Puntos de Discusión

- ¿Los resultados coinciden con valores típicos?
- ¿Qué suposiciones hizo Claude que deberían verificarse?
- ¿Cómo validar los cálculos antes de construir?
- ¿Cuándo usar software especializado vs. IA?

---

## Recursos de Referencia

Para verificar resultados:
- Raymer, "Aircraft Design: A Conceptual Approach"
- Anderson, "Introduction to Flight"
- Tablas de perfiles NACA

---

*Demo Track 03 - FPUNA 2026*
