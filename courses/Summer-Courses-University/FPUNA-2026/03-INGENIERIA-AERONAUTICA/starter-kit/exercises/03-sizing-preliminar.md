# Ejercicio 3: Sizing Preliminar de UAV con IA

## Objetivo
Usar IA para realizar el dimensionamiento inicial de un vehículo aéreo no tripulado.

## Duración
60-75 minutos

## Prerrequisitos
- Ejercicios 1 y 2 completados
- Conocimiento de conceptos de diseño de aeronaves
- Excel o Python para cálculos
- Acceso a Claude

## ⚠️ ADVERTENCIA CRÍTICA

**El sizing preliminar es solo el PRIMER paso del diseño.**

Este ejercicio genera estimaciones iniciales que DEBEN ser:
- Verificadas con herramientas de diseño (OpenVSP, XFLR5)
- Validadas con análisis estructural
- Iteradas múltiples veces
- Aprobadas por un ingeniero calificado

**NUNCA construyas una aeronave basándote únicamente en sizing de IA.**

---

## Parte 1: Definir Requerimientos de Misión (10 minutos)

### Tu misión

Define los requerimientos para un UAV de vigilancia agrícola:

```
REQUERIMIENTOS DE MISIÓN

**Misión principal:**
Vigilancia de cultivos de soja en Paraguay

**Rendimiento:**
- Velocidad de crucero: 15-20 m/s
- Autonomía mínima: 45 minutos
- Alcance: 10 km ida y vuelta + reserva
- Techo operativo: 200 m AGL

**Carga útil:**
- Cámara multiespectral: 400g
- Electrónica de control: 200g
- Total payload: 600g

**Operación:**
- Despegue: lanzamiento a mano
- Aterrizaje: panza (sin tren)
- Viento máximo operativo: 8 m/s

**Restricciones:**
- Peso máximo: 5 kg (regulación local)
- Envergadura máxima: 3 m (transporte)
- Presupuesto: limitado (construcción DIY)

**Ambiente:**
- Temperatura: 20-35°C
- Altitud base: ~200 m sobre nivel del mar
```

---

## Parte 2: Sizing Inicial con IA (20 minutos)

### Prompt para sizing

```
Necesito hacer el sizing preliminar de un UAV de vigilancia.

**Requerimientos de misión:**
- Carga útil: 600g (cámara + electrónica)
- Velocidad crucero: 18 m/s
- Autonomía: 45 minutos
- Despegue: lanzamiento a mano
- Peso máximo permitido: 5 kg

**Restricciones:**
- Construcción DIY (espuma y madera balsa)
- Envergadura máxima: 3 m
- Perfil tipo NACA 24xx para Re bajo

Genera sizing preliminar para:

1. **Estimación de peso:**
   - Peso vacío (estructura + sistemas)
   - Peso de batería necesaria
   - Peso total al despegue (MTOW)

2. **Ala:**
   - Carga alar recomendada (W/S)
   - Área alar necesaria
   - Envergadura y cuerda
   - Aspect ratio
   - Perfil recomendado

3. **Cola:**
   - Tipo (convencional, T, V)
   - Coeficientes de volumen (horizontal y vertical)
   - Dimensiones preliminares

4. **Propulsión:**
   - Potencia estimada (W)
   - Tipo de motor recomendado
   - Hélice (diámetro, paso)
   - Batería (capacidad, peso)

5. **Verificaciones:**
   - Carga alar vs velocidad de stall
   - Empuje necesario vs disponible
   - Autonomía alcanzable

Presenta los resultados en tablas con:
- Valor estimado
- Rango típico para validación
- Fórmula o método usado
```

---

### Analiza los resultados

**Pesos:**
| Componente | IA estimó (g) | ¿Razonable? | Verificación |
|------------|---------------|-------------|--------------|
| Estructura ala | | | |
| Estructura fuselaje | | | |
| Cola | | | |
| Motor + ESC | | | |
| Batería | | | |
| Servos | | | |
| Receptor | | | |
| Cableado | | | |
| Payload | 600 | Fijo | - |
| **TOTAL** | | ≤5000g | |

**Ala:**
| Parámetro | Valor IA | Rango típico | ¿Dentro? |
|-----------|----------|--------------|----------|
| W/S (kg/m²) | | 20-40 | |
| Área (m²) | | | |
| Envergadura (m) | | ≤3.0 | |
| Cuerda (m) | | | |
| AR | | 6-12 | |

---

## Parte 3: Verificar Cálculos Críticos (15 minutos)

### Velocidad de stall

```
Verifica mi velocidad de stall:

**Datos:**
- MTOW: [VALOR IA] kg = [VALOR] N
- Área alar: [VALOR IA] m²
- ρ = 1.1 kg/m³ (200m altitud, 30°C)
- CLmax = 1.3 (NACA 2412)

**Fórmula:**
Vstall = √(2W / (ρ × S × CLmax))

**Mi cálculo:**
[Hacer el cálculo]

**Preguntas:**
1. ¿Mi resultado es correcto?
2. Para lanzamiento a mano, ¿necesito V > 1.2 × Vstall?
3. ¿Cuál es mi velocidad mínima segura de vuelo?
```

### Empuje necesario

```
Verifica el empuje requerido para crucero:

**Datos:**
- Velocidad crucero: 18 m/s
- Peso: [VALOR] N
- L/D estimado: [VALOR IA]
- ρ = 1.1 kg/m³

**Empuje = Resistencia en crucero:**
T = W / (L/D)

**Mi cálculo:**
T = [VALOR] N

**Conversión a potencia:**
P = T × V = [VALOR] W

**Preguntas:**
1. ¿Este empuje es alcanzable con motores brushless típicos?
2. ¿Qué motor y hélice recomiendas?
3. ¿Cuánta reserva de empuje tengo para ascenso?
```

### Autonomía real

```
Verifica la autonomía esperada:

**Datos batería:**
- Tipo: LiPo 4S
- Capacidad: [VALOR IA] mAh
- Peso: [VALOR IA] g
- Voltaje nominal: 14.8V
- Usable: 80% (no descargar completamente)

**Consumo estimado:**
- Potencia crucero: [VALOR] W
- Corriente crucero: P/V = [VALOR] A

**Autonomía:**
t = (Capacidad × 0.8) / Corriente

**Mi cálculo:**
t = [VALOR] minutos

**¿Cumple el requerimiento de 45 minutos?** Sí / No
```

---

## Parte 4: Iterar el Diseño (10 minutos)

### Si no cumple los requerimientos

```
Mi sizing inicial no cumple el requerimiento de autonomía.

**Problema:**
- Autonomía calculada: [VALOR] minutos
- Autonomía requerida: 45 minutos
- Déficit: [VALOR] minutos

**Restricciones que no puedo cambiar:**
- MTOW ≤ 5 kg
- Envergadura ≤ 3 m
- Payload = 600g

**Opciones a considerar:**

1. **Aumentar batería:**
   - ¿Cuántos mAh adicionales necesito?
   - ¿Cuánto peso agrega?
   - ¿Todavía cumplo MTOW?

2. **Mejorar eficiencia:**
   - ¿Qué AR me da mejor L/D?
   - ¿Qué perfil es más eficiente a este Re?
   - ¿Puedo reducir velocidad de crucero?

3. **Reducir peso estructura:**
   - ¿Es posible con materiales DIY?
   - ¿Cuánto puedo ahorrar realmente?

¿Cuál opción recomiendas y por qué?
Dame nuevo sizing con la mejor opción.
```

---

## Parte 5: Resumen de Diseño (10 minutos)

### Pide documento consolidado

```
Genera un resumen ejecutivo del sizing de mi UAV:

**Formato:**
1. Hoja de datos (1 página)
2. Vista general 3-view (ASCII)
3. Lista de componentes estimados
4. Rendimiento esperado
5. Riesgos y siguientes pasos

**Incluye:**
- Todos los parámetros finales
- Márgenes de seguridad usados
- Suposiciones críticas
- Qué verificar antes de construir
```

---

## Template para Sizing

```
## Sizing Preliminar de [TIPO DE UAV]

**Misión:**
[Descripción breve]

**Requerimientos clave:**
| Parámetro | Valor | Unidad |
|-----------|-------|--------|
| Velocidad crucero | | m/s |
| Autonomía | | min |
| Payload | | g |
| MTOW máximo | | kg |

**Restricciones:**
| Restricción | Límite |
|-------------|--------|
| Envergadura | m |
| Presupuesto | $ |
| Construcción | [tipo] |

**Genera sizing para:**

1. Estimación de pesos (breakdown)
2. Dimensiones de ala (W/S, S, b, c, AR, perfil)
3. Dimensiones de cola (tipo, Vh, Vv, dimensiones)
4. Sistema de propulsión (motor, hélice, batería)
5. Verificación de rendimiento (Vstall, empuje, autonomía)

**NOTA:** Este es sizing preliminar.
Verificaré con XFLR5/OpenVSP antes de construir.
```

---

## Lista de Verificación Final

### Antes de considerar el sizing "completo":

**Pesos:**
- [ ] ¿Suma de componentes = MTOW?
- [ ] ¿Hay margen para imprevistos (5-10%)?
- [ ] ¿Pesos de componentes son realistas?

**Aerodinámica:**
- [ ] ¿Carga alar está en rango típico?
- [ ] ¿AR es construible con materiales DIY?
- [ ] ¿Velocidad de stall permite lanzamiento a mano?

**Propulsión:**
- [ ] ¿Motor tiene empuje para ascenso (2-3× peso)?
- [ ] ¿Batería cabe en fuselaje?
- [ ] ¿Autonomía incluye reserva (10-15%)?

**Estabilidad (verificar después):**
- [ ] ¿CG está entre 25-35% cuerda?
- [ ] ¿Coeficientes de volumen de cola adecuados?
- [ ] ¿Márgenes estáticos son positivos?

---

## Valores de Referencia

### UAVs similares en categoría 3-5 kg

| Parámetro | Rango típico | Tu diseño |
|-----------|--------------|-----------|
| W/S (kg/m²) | 25-40 | |
| AR | 7-12 | |
| Empuje/Peso | 0.3-0.5 crucero | |
| L/D | 10-15 | |
| Autonomía | 30-60 min | |
| Velocidad stall | 8-12 m/s | |

**Si tu diseño está muy fuera de estos rangos, verifica los cálculos.**

---

## Entregable

### Documento de Sizing Preliminar

```markdown
# UAV Vigilancia Agrícola - Sizing Preliminar

## 1. Requerimientos
[Tabla de requerimientos de misión]

## 2. Estimación de Pesos
[Breakdown detallado]

## 3. Dimensiones del Ala
[Parámetros con justificación]

## 4. Cola
[Tipo y dimensiones]

## 5. Propulsión
[Motor, hélice, batería]

## 6. Verificación de Rendimiento
[Cálculos de Vstall, empuje, autonomía]

## 7. Vista Preliminar (3-view ASCII)
[Sketch]

## 8. Próximos Pasos
- [ ] Análisis en XFLR5
- [ ] Verificación de estabilidad
- [ ] Análisis estructural
- [ ] Prototipado

## 9. Riesgos y Suposiciones
[Lista de suposiciones críticas]
```

---

## Criterios de Éxito

- [ ] Definiste requerimientos de misión claros
- [ ] Obtuviste sizing inicial de IA
- [ ] Verificaste cálculos críticos (Vstall, empuje, autonomía)
- [ ] Iteraste diseño si no cumplía requerimientos
- [ ] Documentaste el sizing completo
- [ ] Identificaste próximos pasos de verificación

---

## Advertencia Final

**Este sizing es el INICIO del proceso, no el final.**

Próximos pasos obligatorios:
1. **Análisis aerodinámico** - XFLR5, AVL
2. **Análisis de estabilidad** - Verificar CG y márgenes
3. **Análisis estructural** - Resistencia de materiales
4. **Prototipo** - Modelo a escala o en simulador
5. **Pruebas de vuelo** - Gradual y seguro

**La IA te ahorra tiempo en sizing inicial, pero NO reemplaza el proceso de diseño completo.**

---

*Ejercicio 3 - Ingeniería Aeronáutica - FPUNA 2026*
