# Checklist de Verificación - Cálculos Aeronáuticos Generados por IA

## Verificación CRÍTICA para diseño de aeronaves

---

## ⚠️ RECORDATORIO

```
NINGÚN cálculo de IA reemplaza verificación profesional.
Todos los valores deben tratarse como ESTIMACIONES INICIALES
hasta ser validados por métodos certificados.
```

---

## Proceso de Verificación en 5 Pasos

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   1. VERIFICAR UNIDADES   ¿Todo en SI?                      │
│          ↓                                                   │
│   2. VERIFICAR FÓRMULAS   ¿Son las correctas?               │
│          ↓                                                   │
│   3. COMPARAR REFERENCIAS ¿Coincide con datos publicados?   │
│          ↓                                                   │
│   4. ANÁLISIS SENSIBILIDAD ¿Cómo cambia con variaciones?    │
│          ↓                                                   │
│   5. REVISIÓN EXPERTA     ¿Un profesional lo aprueba?       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Verificación de Cálculos Aerodinámicos

### Sustentación y Arrastre

```markdown
## Verificación de Cálculo de Sustentación

### Datos de Entrada
- ρ (densidad): _____ kg/m³
- V (velocidad): _____ m/s
- S (superficie alar): _____ m²
- CL (coeficiente): _____

### Verificación de Datos
- [ ] ρ corresponde a la altitud correcta
- [ ] CL está en rango típico (0 - CL_max)
- [ ] CL_max es apropiado para el perfil
- [ ] Unidades son consistentes (todo SI)

### Cálculo
L = ½ρV²SCL = _____ N

### Verificación de Resultado
- [ ] L ≈ Peso para vuelo nivelado
- [ ] Valor es razonable para este tipo de aeronave
- [ ] Comparado con aeronaves similares

### Referencia de Comparación
Aeronave similar: _____
Su L/W ratio: _____
```

### Polar del Avión

```markdown
## Verificación de Polar de Arrastre

### Datos de Entrada
- CD0: _____
- AR: _____
- e (Oswald): _____

### Verificación de CD0
- [ ] CD0 en rango típico:
  - Planeador: 0.010-0.015
  - Avión limpio: 0.020-0.030
  - Avión con tren fijo: 0.030-0.045
  - UAV pequeño: 0.030-0.050

### Verificación de Factor de Oswald
- [ ] e en rango típico (0.7-0.9)
- [ ] e considera configuración del ala
  - Rectangular: ~0.7
  - Cónica: ~0.8
  - Elíptica: ~0.9

### Fórmula de la Polar
CD = CD0 + CL²/(πARe)

### Puntos de Verificación
| CL | CD (calculado) | CD (razonable?) |
|----|----------------|-----------------|
| 0.0 | CD0 = _____ | [ ] |
| 0.5 | _____ | [ ] |
| 1.0 | _____ | [ ] |
| CL_max | _____ | [ ] |

### (L/D)max
- Calculado: _____
- [ ] En rango típico (10-30 según tipo)
```

---

## Verificación de Cálculos de Performance

### Velocidad de Stall

```markdown
## Verificación de Velocidad de Stall

### Datos
- W (peso): _____ kg = _____ N
- S (superficie): _____ m²
- CL_max: _____
- ρ (densidad): _____ kg/m³

### Verificación de CL_max
- [ ] Valor razonable para el perfil
  - Sin flaps: 1.2-1.6 típico
  - Con flaps: 1.8-2.5 típico
- [ ] Fuente del dato: _____

### Cálculo
Vs = √(2W / (ρ × S × CL_max)) = _____ m/s

### Verificación de Resultado
- [ ] Vs en rango típico para categoría:
  - Ultraligero: 15-25 m/s
  - LSA: 20-30 m/s
  - GA ligero: 25-40 m/s

- [ ] Comparación con aeronaves similares:
  Aeronave: _____ Vs = _____ m/s

### Margen de Seguridad
Vs × 1.1 = _____ m/s (velocidad mínima recomendada)
```

### Distancia de Despegue

```markdown
## Verificación de Distancia de Despegue

### Datos
- W: _____ N
- S: _____ m²
- CL_TO: _____
- T (empuje): _____ N
- μ (fricción): _____ (típico: 0.02-0.05)

### Verificación de Datos
- [ ] T/W ratio razonable (0.15-0.30 para GA)
- [ ] CL_TO es menor que CL_max
- [ ] μ corresponde al tipo de pista

### Cálculo
(Mostrar método usado)

S_TO = _____ m

### Verificación de Resultado
- [ ] Distancia razonable para la categoría:
  - Ultraligero: 100-300 m
  - LSA: 200-400 m
  - GA ligero: 300-600 m

- [ ] Consideraciones adicionales:
  - [ ] Efecto de altitud
  - [ ] Efecto de temperatura
  - [ ] Viento en contra

### Margen de Seguridad
S_TO × 1.25 = _____ m (distancia planificada)
```

---

## Verificación de Estabilidad

### Estabilidad Longitudinal

```markdown
## Verificación de Estabilidad Longitudinal

### Datos del Ala
- Posición (desde morro): _____ m
- MAC: _____ m
- CL_α ala: _____ /rad

### Datos del Empenaje
- S_t: _____ m²
- l_t (distancia): _____ m
- η_t (eficiencia): _____ (típico: 0.85-0.95)

### Datos del CG
- Posición: _____ m desde morro
- % MAC: _____%

### Cálculo del Punto Neutro
V_H = (S_t × l_t) / (S × MAC) = _____
- [ ] V_H en rango típico (0.5-0.9)

X_np = _____ m

### Margen Estático
SM = (X_np - X_cg) / MAC × 100 = _____%

### Verificación
- [ ] SM > 5% (mínimo absoluto)
- [ ] SM = 10-15% (rango deseable)
- [ ] SM < 25% (evitar exceso)

### Resultado
[ ] ESTABLE (SM positivo y razonable)
[ ] INESTABLE (SM negativo) → REDISEÑAR
[ ] MARGINAL (SM muy pequeño) → REVISAR
```

---

## Verificación de Pesos

### Balance de Pesos

```markdown
## Verificación de Estimación de Pesos

### Método Usado
[ ] Fórmulas estadísticas (Raymer, Roskam)
[ ] Comparación con aeronaves similares
[ ] Estimación detallada componente por componente

### Pesos por Componente
| Componente | Peso (kg) | % MTOW | ¿Razonable? |
|------------|-----------|--------|-------------|
| Ala | | | [ ] |
| Fuselaje | | | [ ] |
| Empenaje | | | [ ] |
| Tren de aterrizaje | | | [ ] |
| Motor + hélice | | | [ ] |
| Sistemas | | | [ ] |
| **Peso vacío** | | | |
| Combustible | | | [ ] |
| Carga útil | | | [ ] |
| **MTOW** | | 100% | |

### Verificación de Ratios
- [ ] We/MTOW: _____% (típico: 50-65%)
- [ ] Fuel/MTOW: _____% (verificar con misión)
- [ ] Payload/MTOW: _____% (verificar requisitos)

### Comparación con Aeronaves Similares
| Aeronave | MTOW (kg) | We/MTOW |
|----------|-----------|---------|
| Mi diseño | | |
| Referencia 1 | | |
| Referencia 2 | | |
```

---

## Tabla de Valores Típicos para Comparación

### Aeronaves de Referencia

| Parámetro | Ultraligero | LSA | GA Ligero |
|-----------|-------------|-----|-----------|
| MTOW (kg) | 300-450 | 450-650 | 800-1400 |
| W/S (kg/m²) | 20-40 | 40-60 | 50-80 |
| P/W (HP/kg) | 0.08-0.15 | 0.10-0.15 | 0.08-0.12 |
| Vs (m/s) | 15-25 | 20-30 | 25-40 |
| V_cruise (m/s) | 25-45 | 45-65 | 50-80 |
| L/D max | 12-20 | 10-15 | 10-14 |
| AR | 6-12 | 6-10 | 6-9 |

### Perfiles Comunes

| Perfil | CL_max | CD_min | Aplicación |
|--------|--------|--------|------------|
| NACA 0012 | 1.5 | 0.006 | Empenajes |
| NACA 2412 | 1.6 | 0.006 | GA wings |
| NACA 4412 | 1.7 | 0.007 | GA wings |
| NACA 23012 | 1.8 | 0.006 | High performance |

---

## Template de Reporte de Verificación

```markdown
# Verificación de Diseño: [Nombre del Proyecto]

## Resumen
- Tipo de aeronave: _____
- MTOW: _____ kg
- Configuración: _____

## Verificaciones Realizadas

### Aerodinámica
- [ ] CL/CD verificados contra datos publicados
- [ ] Polar razonable
- [ ] (L/D)max en rango típico

### Performance
- [ ] Vs calculado y verificado
- [ ] Distancias T/O y landing razonables
- [ ] Velocidades en rango

### Estabilidad
- [ ] Margen estático > 10%
- [ ] CG range definido

### Pesos
- [ ] Estimaciones por componente
- [ ] Comparación con similares
- [ ] Balance de CG en rango

## Observaciones
[Lista de puntos que requieren atención]

## Resultado
[ ] PASA verificación inicial
[ ] REQUIERE revisión en: _____
[ ] FALLA - no proceder sin correcciones

## Próximos Pasos
1. _____
2. _____
3. _____

## Verificado por
- Nombre: _____
- Fecha: _____
- Calificación: _____
```

---

*VERIFICATION-CHECKLIST.md - Track 03 Aeronáutica - FPUNA 2026*
