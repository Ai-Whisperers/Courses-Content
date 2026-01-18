# Errores Comunes con IA - Ingeniería Aeronáutica

## Guía para Evitar los Errores Más Frecuentes

Este documento recopila los errores más comunes que cometen los estudiantes de aeronáutica al usar IA para cálculos y diseño, con ejemplos específicos y cómo evitarlos.

---

## ⚠️ ADVERTENCIA CRÍTICA

**Los errores en aeronáutica pueden ser FATALES.**

A diferencia de otros campos, un error de cálculo en un diseño aeronáutico puede resultar en:
- Falla estructural en vuelo
- Pérdida de control de la aeronave
- Accidentes con pérdida de vidas

**NUNCA uses cálculos sin verificación exhaustiva.**

---

## Error #1: Mezclar Sistemas de Unidades

### El Problema
La IA mezcla unidades métricas e imperiales sin advertir.

### Ejemplo Real
```
Prompt: "Calcula el Reynolds para un ala con cuerda 1.5m a 100 nudos"

IA genera:
Re = ρVL/μ = (1.225)(100)(1.5)/(1.789e-5) = 10,268,311

INCORRECTO:
- 100 nudos = 51.4 m/s, NO 100 m/s
- El Reynolds real es 5,283,416 (casi la mitad)
- Esto afecta régimen de flujo y selección de perfil
```

### Unidades Críticas en Aeronáutica
| Parámetro | SI | Imperial | Conversión |
|-----------|-----|----------|------------|
| Velocidad | m/s | knots (kt) | 1 kt = 0.5144 m/s |
| Altitud | m | ft | 1 ft = 0.3048 m |
| Peso | N, kg | lb, lbf | 1 lb = 0.4536 kg |
| Presión | Pa | psi, inHg | 1 atm = 101325 Pa |
| Densidad | kg/m³ | slug/ft³ | 1 slug/ft³ = 515.4 kg/m³ |

### Cómo Evitarlo
1. **Especificar sistema**: "Usa SOLO unidades SI"
2. **Verificar cada valor** antes de usar en fórmulas
3. **Hacer análisis dimensional** del resultado
4. **Comparar con valores típicos** conocidos

---

## Error #2: Usar Atmósfera Incorrecta

### El Problema
No especificar condiciones atmosféricas o usar ISA cuando no aplica.

### Ejemplo Real
```
IA asume: "Densidad del aire = 1.225 kg/m³"

Esto es a nivel del mar ISA (15°C, 101325 Pa)

En Paraguay:
- Asunción está a ~120m sobre el mar
- En verano, temperatura puede ser 35°C+
- Densidad real ≈ 1.10 kg/m³ (10% menos)

Consecuencia: El empuje/sustentación calculados
serán 10% menores en la realidad
```

### Tabla de Atmósfera Estándar ISA
| Altitud (m) | Temperatura (°C) | Densidad (kg/m³) | Presión (Pa) |
|-------------|------------------|------------------|--------------|
| 0 | 15.0 | 1.225 | 101,325 |
| 500 | 11.8 | 1.167 | 95,461 |
| 1,000 | 8.5 | 1.112 | 89,875 |
| 2,000 | 2.0 | 1.007 | 79,501 |
| 3,000 | -4.5 | 0.909 | 70,121 |

### Cómo Evitarlo
1. **Especificar altitud y temperatura** en cada problema
2. **Calcular densidad real** con ecuación de gas ideal
3. **Para Paraguay**: usar temperaturas de 25-35°C, no ISA
4. **Agregar márgenes** para condiciones extremas

---

## Error #3: Coeficientes Aerodinámicos Incorrectos

### El Problema
La IA inventa o mezcla coeficientes de diferentes perfiles.

### Ejemplo Real
```
Prompt: "Dame el Cl máximo del NACA 2412"

IA: "El Clmax del NACA 2412 es 1.6"

Verificación en XFLR5/datos experimentales:
- Re = 500,000: Clmax ≈ 1.35
- Re = 1,000,000: Clmax ≈ 1.45
- Re = 3,000,000: Clmax ≈ 1.50

El valor depende del Reynolds, y 1.6 es optimista
```

### Cómo Verificar Coeficientes
1. **Usar XFLR5** o software de análisis
2. **Consultar NACA Technical Reports** originales
3. **Verificar número de Reynolds** del dato
4. **Comparar múltiples fuentes**

### Fuentes Confiables
- [UIUC Airfoil Database](https://m-selig.ae.illinois.edu/ads/coord_database.html)
- [Airfoil Tools](http://airfoiltools.com/)
- NACA Technical Reports (NASA Technical Reports Server)

---

## Error #4: Ignorar Efectos de Escala

### El Problema
Aplicar datos de un tamaño a otro sin corrección.

### Ejemplo Real
```
IA: "El perfil Clark Y funciona bien en esta aplicación"

Contexto perdido:
- El estudiante diseña un UAV pequeño (Reynolds ~200,000)
- Los datos citados son de túnel de viento (Reynolds 3,000,000)
- A bajo Reynolds, el perfil tiene separación prematura
```

### Efecto del Número de Reynolds
| Reynolds | Aplicación típica | Consideraciones |
|----------|-------------------|-----------------|
| < 100,000 | Insectos, micro-UAV | Flujo laminar dominante |
| 100,000-500,000 | UAV pequeños, modelos | Transición crítica |
| 500,000-2,000,000 | UAV medianos, veleros | Zona de diseño común |
| > 2,000,000 | Aviones tripulados | Datos más disponibles |

### Cómo Evitarlo
1. **Calcular Reynolds** del diseño antes de buscar datos
2. **Buscar datos en el rango correcto** de Reynolds
3. **Usar software** que permita análisis a bajo Reynolds
4. **Agregar márgenes** por incertidumbre

---

## Error #5: Cálculos Estructurales Sin Factores de Seguridad

### El Problema
Usar cargas calculadas sin aplicar factores de seguridad apropiados.

### Ejemplo Real
```
IA: "El larguero debe soportar 500N de carga"

Problema: Esto es carga límite, NO carga última

Para certificación:
- Factor de carga límite: típicamente n = 3.8 (categoría normal)
- Factor de seguridad: 1.5
- Carga última = 500N × 3.8 × 1.5 = 2,850N

El diseño debe resistir casi 6 veces más que la carga "normal"
```

### Factores de Seguridad Típicos
| Aplicación | Factor de carga (n) | Factor de seguridad | Combinado |
|------------|---------------------|---------------------|-----------|
| Categoría Normal | 3.8 | 1.5 | 5.7 |
| Categoría Acrobática | 6.0 | 1.5 | 9.0 |
| UAV (experimental) | 2.5-4.0 | 1.25-1.5 | Variable |

### Cómo Evitarlo
1. **Siempre especificar** qué tipo de carga es
2. **Aplicar factores** ANTES de dimensionar
3. **Consultar regulaciones** aplicables (FAR/CS)
4. **Documentar asunciones** de factores usados

---

## Error #6: Performance Sin Considerar Pesos Reales

### El Problema
Calcular performance con peso vacío olvidando payload, combustible, etc.

### Ejemplo Real
```
IA calcula: "Velocidad de pérdida = 18 m/s"

Asunciones no verificadas:
- ¿Peso vacío o MTOW?
- ¿CG en posición nominal?
- ¿Flaps extendidos o retraídos?

Con MTOW (30% más pesado):
Vstall = 18 × √1.3 = 20.5 m/s

Si el piloto espera perder a 18 m/s pero pierde a 20.5 m/s,
puede entrar en pérdida durante el aterrizaje
```

### Pesos a Considerar
| Peso | Incluye |
|------|---------|
| Peso vacío (OEW) | Estructura + sistemas + equipamiento |
| Peso de operación | OEW + tripulación |
| Peso máximo de despegue (MTOW) | Todo incluido |
| Peso máximo de aterrizaje (MLW) | Si aplica (aviones grandes) |

### Cómo Evitarlo
1. **Especificar condición de peso** para cada cálculo
2. **Crear tabla de pesos** completa antes de calcular
3. **Calcular performance** en múltiples condiciones
4. **Agregar contingencia** en estimación de pesos (10-20%)

---

## Error #7: Estabilidad y Control Ignorados

### El Problema
Diseñar solo para rendimiento sin verificar estabilidad.

### Ejemplo Real
```
IA: "Ubica el ala en X para máxima eficiencia"

Problema ignorado:
- ¿Dónde queda el CG?
- ¿Cuál es el margen estático?
- ¿El empenaje es suficiente para controlarlo?

Un diseño puede volar muy bien... hasta que sea incontrolable
```

### Parámetros Críticos de Estabilidad
| Parámetro | Valor típico | Consecuencia si falla |
|-----------|--------------|----------------------|
| Margen estático | 10-25% MAC | CG muy atrás → inestable |
| Vh (cola horizontal) | 0.35-0.50 | Muy bajo → no recupera de picado |
| Vv (cola vertical) | 0.02-0.05 | Muy bajo → inestable en guiñada |

### Cómo Evitarlo
1. **Calcular CG** desde el inicio del diseño
2. **Verificar margen estático** antes de avanzar
3. **Dimensionar empenaje** para estabilidad, no solo por estética
4. **Iterar**: sizing → estabilidad → re-sizing

---

## Error #8: Propulsión Mal Dimensionada

### El Problema
Motor/hélice que funciona en papel pero no en la práctica.

### Ejemplo Real
```
IA: "Usa un motor de 100W con hélice 8x4"

Problemas no considerados:
- ¿A qué RPM? La eficiencia varía drásticamente
- ¿Cuánta corriente consume? ¿La batería aguanta?
- ¿Hay empuje suficiente para despegar?
- ¿La hélice cabe en el diseño?
```

### Verificaciones de Propulsión
1. **Tracción estática > Peso**: Para despegue vertical/corto
2. **Potencia vs. velocidad**: ¿Hay exceso de potencia para subir?
3. **Eficiencia de la hélice**: Típicamente 70-85%, no 100%
4. **Endurance**: ¿Cuánto dura la batería a máxima potencia?

### Reglas de Dedo
| Aplicación | Empuje/Peso estático |
|------------|---------------------|
| Crucero eficiente | 0.3-0.5 |
| Buen ascenso | 0.5-0.8 |
| Acrobático/VTOL | > 1.0 |

### Cómo Evitarlo
1. **Usar simuladores** como eCalc o DriveCalc
2. **Verificar datos del fabricante** del motor
3. **Considerar condiciones** (temperatura, altitud)
4. **Testear en banco** antes de volar

---

## Error #9: Olvidar el Alcance de las Ecuaciones

### El Problema
Usar ecuaciones fuera de su rango de validez.

### Ejemplo Real
```
IA usa: Cd = Cd0 + K × Cl²

Esto asume:
- Perfil en régimen lineal (no en stall)
- Polar parabólica (simplificación)
- Sin efectos de compresibilidad

No aplica para:
- Ángulos de ataque altos (> 12-15°)
- Velocidades altas (Mach > 0.3)
- Regímenes transónicos/supersónicos
```

### Validez de Ecuaciones Comunes
| Ecuación | Válida para | No usar si |
|----------|-------------|------------|
| Polar parabólica | Régimen lineal | α > αstall |
| Ecuaciones incompresibles | M < 0.3 | Aviones rápidos |
| Teoría de línea sustentadora | AR > 4 | Alas delta |
| Panel methods | Flujo adjunto | Separación |

### Cómo Evitarlo
1. **Conocer las asunciones** de cada ecuación
2. **Verificar que aplican** al problema específico
3. **Usar métodos más complejos** si es necesario
4. **Validar con CFD** cuando sea posible

---

## Error #10: No Documentar Asunciones

### El Problema
Hacer cálculos sin registrar qué se asumió.

### Ejemplo Real
```
Cálculo: "Alcance = 150 km"

Sin documentar:
- ¿Altitud de crucero?
- ¿Viento en contra o a favor?
- ¿Reserva de combustible incluida?
- ¿Peso de despegue?

Tres meses después, nadie sabe qué significaba ese "150 km"
```

### Asunciones a Documentar
- [ ] Condiciones atmosféricas (altitud, temperatura)
- [ ] Configuración (flaps, tren, etc.)
- [ ] Peso y CG
- [ ] Velocidad y régimen de vuelo
- [ ] Factores de seguridad aplicados
- [ ] Limitaciones del método usado

### Cómo Evitarlo
1. **Crear formato estándar** para cálculos
2. **Listar asunciones** al inicio de cada cálculo
3. **Incluir fecha** de cálculo/revisión
4. **Versionar documentos** de diseño

---

## Error #11: Confiar en un Solo Punto de Diseño

### El Problema
Optimizar para una condición e ignorar otras.

### Ejemplo Real
```
Diseño optimizado para:
- Crucero a 100 km/h a 500m de altitud

Olvidando:
- Despegue (necesita más sustentación)
- Aterrizaje (velocidad mínima)
- Turbulencia (cargas de ráfaga)
- Hot & High (altitud + temperatura)
```

### Condiciones a Verificar
1. **Despegue**: máximo peso, obstáculos
2. **Ascenso**: gradiente mínimo requerido
3. **Crucero**: eficiencia, alcance
4. **Descenso**: pendiente, velocidad
5. **Aterrizaje**: distancia, velocidad de aproximación
6. **Emergencia**: un motor inoperativo, Go-around

### Cómo Evitarlo
1. **Crear matriz de condiciones** de diseño
2. **Verificar cada condición** crítica
3. **Identificar caso dimensionante** para cada componente
4. **Iterar hasta cumplir todas** las condiciones

---

## Error #12: Ignorar Bibliografía de Diseño

### El Problema
Aceptar métodos de la IA sin verificar fuentes establecidas.

### Ejemplo Real
```
IA: "Usa esta fórmula para estimar peso del ala:
    W_wing = 0.15 × MTOW"

Problema: ¿De dónde viene ese 0.15?
- ¿Es para avión metálico o composite?
- ¿Para qué tipo de misión?
- ¿Con qué margen de error?
```

### Bibliografía de Referencia
| Autor | Libro | Uso |
|-------|-------|-----|
| Raymer | Aircraft Design: A Conceptual Approach | Sizing inicial |
| Roskam | Airplane Design (8 volumes) | Diseño detallado |
| Torenbeek | Synthesis of Subsonic Airplane Design | Estimaciones |
| Nicolai | Fundamentals of Aircraft Design | Metodología |
| Anderson | Introduction to Flight | Fundamentos |

### Cómo Evitarlo
1. **Preguntar fuente**: "¿De qué libro viene esta fórmula?"
2. **Verificar en bibliografía** de referencia
3. **Comparar métodos** de diferentes autores
4. **Entender limitaciones** del método

---

## Checklist Anti-Errores para Aeronáutica

### Antes de Calcular
- [ ] ¿Sistema de unidades definido y consistente?
- [ ] ¿Condiciones atmosféricas especificadas?
- [ ] ¿Peso y configuración definidos?
- [ ] ¿Número de Reynolds calculado?

### Durante el Cálculo
- [ ] ¿Las ecuaciones aplican a este régimen?
- [ ] ¿Los coeficientes son para el Reynolds correcto?
- [ ] ¿Los factores de seguridad están aplicados?
- [ ] ¿El análisis dimensional es correcto?

### Después del Cálculo
- [ ] ¿El resultado tiene sentido físico?
- [ ] ¿Está en el rango de valores típicos?
- [ ] ¿Las asunciones están documentadas?
- [ ] ¿Se verificó con otra fuente/método?

### Antes de Volar
- [ ] ¿Todos los cálculos fueron revisados?
- [ ] ¿Se hicieron pruebas en tierra?
- [ ] ¿El CG está en rango?
- [ ] ¿Hay procedimientos de emergencia?

---

## Valores Típicos para Verificación Rápida

| Parámetro | Aviones pequeños | UAV |
|-----------|------------------|-----|
| L/D máximo | 12-18 | 8-15 |
| Carga alar (kg/m²) | 30-80 | 5-30 |
| Relación de aspecto | 6-10 | 5-12 |
| Clmax (con flaps) | 1.8-2.5 | 1.2-1.6 |
| Vstall (m/s) | 20-35 | 10-20 |
| Potencia/peso (W/kg) | 50-100 | 30-150 |

**Si tu resultado difiere significativamente de estos rangos, verifica.**

---

*Guía de errores comunes - Ingeniería Aeronáutica - FPUNA 2026*
