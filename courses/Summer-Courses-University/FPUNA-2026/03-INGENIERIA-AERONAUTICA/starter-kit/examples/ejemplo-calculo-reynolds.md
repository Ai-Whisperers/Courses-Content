# Ejemplo Completado: Verificación de Cálculos de Reynolds

## Contexto
Un estudiante necesitaba calcular el número de Reynolds para el diseño preliminar de un UAV de vigilancia.

---

## Datos del Problema

**Ala del UAV:**
- Cuerda media: c = 0.25 m
- Velocidad de crucero: V = 18 m/s
- Altitud operativa: 300 m sobre nivel del mar
- Temperatura ambiente: 30°C (típico Paraguay)

**Pregunta:** ¿A qué régimen de Reynolds operará este UAV?

---

## Cálculo del Estudiante

### Paso 1: Propiedades del aire

A 300m y 30°C (interpolando de tablas ISA):
- Densidad: ρ ≈ 1.14 kg/m³
- Viscosidad cinemática: ν ≈ 1.60 × 10⁻⁵ m²/s

### Paso 2: Aplicar fórmula

```
Re = (V × c) / ν

Re = (18 m/s × 0.25 m) / (1.60 × 10⁻⁵ m²/s)

Re = 4.5 / (1.60 × 10⁻⁵)

Re = 281,250
```

---

## Verificación con IA

### Prompt usado

```
Por favor verifica estos cálculos aerodinámicos:

**Datos del problema:**
- Cuerda: c = 0.25 m
- Velocidad: V = 18 m/s
- Altitud: 300 m sobre nivel del mar
- Temperatura: 30°C

**Mis cálculos:**
1. ν = 1.60 × 10⁻⁵ m²/s (viscosidad cinemática)
2. Re = 281,250

Por favor:
1. Verifica si mi viscosidad cinemática es correcta
2. Verifica mi cálculo de Reynolds
3. ¿Este Reynolds es típico para qué tipo de aeronave?
4. ¿Qué implicaciones tiene para el diseño del ala?
```

### Respuesta de la IA

**Verificación de viscosidad cinemática:**
> La viscosidad cinemática del aire depende de temperatura y presión.
> A 30°C y nivel del mar: ν ≈ 1.60 × 10⁻⁵ m²/s ✓
> A 300m la diferencia es mínima (<1%), tu valor es aceptable.

**Verificación de Reynolds:**
> Re = (18 × 0.25) / (1.60 × 10⁻⁵)
> Re = 4.5 / (1.60 × 10⁻⁵)
> Re = 281,250 ✓
> Tu cálculo es correcto.

**Clasificación del régimen:**
> Re ≈ 280,000 es típico de:
> - UAVs pequeños
> - Aeromodelos de competición
> - Drones de fotografía
>
> Es un régimen "bajo Reynolds" donde:
> - Los perfiles NACA estándar pueden no ser óptimos
> - Es preferible usar perfiles diseñados para bajo Re
> - La transición laminar-turbulento es crítica

---

## Comparación de Resultados

| Valor | Mi cálculo | IA verificó | ¿Coincide? |
|-------|------------|-------------|------------|
| ν | 1.60×10⁻⁵ | 1.60×10⁻⁵ | ✅ |
| Re | 281,250 | 281,250 | ✅ |

---

## Análisis Adicional

### ¿Qué significa Re ≈ 280,000?

| Rango de Re | Características | Perfiles recomendados |
|-------------|-----------------|----------------------|
| < 50,000 | Muy bajo, flujo laminar dominante | SD7003, AG perfiles |
| 50,000 - 200,000 | Bajo, transición importante | AG24, S1223 |
| 200,000 - 500,000 | Moderado, **nuestro UAV** | NACA 2412, Clark Y |
| 500,000 - 2,000,000 | Alto, aviones livianos | NACA serie 4 y 6 |
| > 2,000,000 | Muy alto, aviación comercial | Perfiles supercríticos |

### Implicaciones para el diseño

1. **Perfil aerodinámico:** NACA 2412 funcionará, pero perfiles de bajo Re como el SD7037 podrían ser más eficientes.

2. **Transición laminar-turbulento:** A este Re, promover transición temprana puede mejorar el rendimiento en ángulos de ataque altos.

3. **Rugosidad superficial:** Más crítica que en Re altos. Acabado superficial debe ser liso.

---

## Verificación Cruzada

El estudiante verificó en XFLR5:

**Configuración:**
- Perfil: NACA 2412
- Re: 280,000
- Mach: 0.05 (despreciable)

**Resultados de polar:**
| Parámetro | XFLR5 | Típico literatura |
|-----------|-------|-------------------|
| CLmax | 1.28 | 1.2-1.4 |
| αstall | 14° | 13-15° |
| (L/D)max | 42 | 35-50 |
| αopt | 5° | 4-6° |

**Conclusión:** Los datos son consistentes con lo esperado para este Re.

---

## Cálculo de Sensibilidad

### Variación con altitud

| Altitud (m) | ν (m²/s) | Re | Cambio |
|-------------|----------|-----|--------|
| 0 (nivel mar) | 1.56×10⁻⁵ | 288,462 | +2.6% |
| 300 | 1.60×10⁻⁵ | 281,250 | base |
| 1000 | 1.72×10⁻⁵ | 261,628 | -7.0% |
| 2000 | 1.90×10⁻⁵ | 236,842 | -15.8% |

**Conclusión:** Si el UAV sube a 2000m (Cordillera del Ynambú), el Re baja 16%. Considerar en el diseño.

### Variación con velocidad

| V (m/s) | Re | Régimen |
|---------|-----|---------|
| 12 | 187,500 | Bajo |
| 15 | 234,375 | Bajo-Moderado |
| 18 | 281,250 | Moderado |
| 22 | 343,750 | Moderado |
| 25 | 390,625 | Moderado-Alto |

**Conclusión:** El UAV operará en Re 200,000-350,000 según velocidad. El perfil debe funcionar bien en todo ese rango.

---

## Resumen del Ejercicio

### Cálculos verificados:
- ✅ Viscosidad cinemática correcta
- ✅ Número de Reynolds correcto
- ✅ Clasificación de régimen correcta

### Aprendizajes:
1. A 30°C la viscosidad es ligeramente mayor que a condiciones ISA estándar (15°C)
2. Re ~280,000 es "bajo Reynolds" para estándares aeronáuticos
3. La elección de perfil debe considerar el rango completo de operación
4. XFLR5 confirma los valores teóricos

### Próximos pasos:
1. Comparar NACA 2412 vs SD7037 en XFLR5 para este Re
2. Calcular polar del ala completa (efectos 3D)
3. Verificar velocidad de stall con CLmax obtenido

---

## Valores de Referencia Guardados

```
Propiedades del aire - Paraguay (nivel del mar)

| T (°C) | ρ (kg/m³) | ν (m²/s) |
|--------|-----------|----------|
| 20 | 1.204 | 1.51×10⁻⁵ |
| 25 | 1.184 | 1.56×10⁻⁵ |
| 30 | 1.165 | 1.60×10⁻⁵ |
| 35 | 1.146 | 1.65×10⁻⁵ |
| 40 | 1.127 | 1.70×10⁻⁵ |

Fórmula rápida para Re:
Re = V × c × 62,500 (aproximado para 30°C, nivel mar)
```

---

*Ejemplo completado - Ingeniería Aeronáutica - FPUNA 2026*
