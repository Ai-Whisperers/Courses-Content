# Ejercicio 3: Análisis de Tarifas y Ocupación con IA

## Objetivo
Usar IA para analizar datos de ocupación y tomar decisiones de pricing más informadas.

## Duración
60-75 minutos

## Prerrequisitos
- Datos de ocupación de tu propiedad (o usar ejemplo)
- Conocimiento básico de revenue management
- Excel o calculadora
- Acceso a Claude

## ⚠️ ADVERTENCIA CRÍTICA

**La IA no tiene acceso a datos en tiempo real.**

NO puede saber:
- Ocupación actual del mercado
- Tarifas de tu competencia hoy
- Eventos próximos en tu ciudad
- Tendencias de demanda actuales

**USA la IA para:**
- Analizar TUS datos históricos
- Calcular métricas
- Sugerir estrategias
- Simular escenarios

---

## Parte 1: Preparar Tus Datos (10 minutos)

### Datos de ejemplo (o usa los tuyos)

```
Datos del Hotel Guaraní - Año 2025

| Mes | Ocupación % | ADR (USD) | Habitaciones | RevPAR |
|-----|-------------|-----------|--------------|--------|
| Ene | 45 | 55 | 50 | ? |
| Feb | 40 | 52 | 50 | ? |
| Mar | 55 | 58 | 50 | ? |
| Abr | 60 | 62 | 50 | ? |
| May | 65 | 65 | 50 | ? |
| Jun | 70 | 70 | 50 | ? |
| Jul | 75 | 75 | 50 | ? |
| Ago | 80 | 78 | 50 | ? |
| Sep | 72 | 72 | 50 | ? |
| Oct | 68 | 68 | 50 | ? |
| Nov | 55 | 60 | 50 | ? |
| Dic | 50 | 58 | 50 | ? |
```

### Calcula primero

Antes de usar IA, calcula el RevPAR de cada mes:
```
RevPAR = Ocupación × ADR

Ejemplo enero: 0.45 × $55 = $24.75
```

---

## Parte 2: Análisis Básico con IA (15 minutos)

### Prompt para análisis de datos

```
Analiza estos datos de ocupación y tarifa de un hotel
en Asunción, Paraguay:

**Hotel:** 50 habitaciones, 3 estrellas, negocios/turismo
**Año:** 2025

| Mes | Ocupación % | ADR (USD) | RevPAR |
|-----|-------------|-----------|--------|
| Ene | 45 | 55 | 24.75 |
| Feb | 40 | 52 | 20.80 |
| Mar | 55 | 58 | 31.90 |
| Abr | 60 | 62 | 37.20 |
| May | 65 | 65 | 42.25 |
| Jun | 70 | 70 | 49.00 |
| Jul | 75 | 75 | 56.25 |
| Ago | 80 | 78 | 62.40 |
| Sep | 72 | 72 | 51.84 |
| Oct | 68 | 68 | 46.24 |
| Nov | 55 | 60 | 33.00 |
| Dic | 50 | 58 | 29.00 |

**Analiza:**

1. **Métricas anuales:**
   - Ocupación promedio
   - ADR promedio
   - RevPAR promedio
   - Ingresos totales estimados

2. **Estacionalidad:**
   - ¿Cuáles son los meses de alta temporada?
   - ¿Cuáles son los meses de baja temporada?
   - ¿Qué factores podrían explicar el patrón?

3. **Oportunidades:**
   - ¿En qué meses hay espacio para subir tarifas?
   - ¿En qué meses debemos priorizar ocupación?
   - ¿Hay algún mes con balance subóptimo?

4. **Comparación con benchmarks:**
   - ¿Cómo se compara con hoteles similares en Latam?
   - ¿El ADR es apropiado para el mercado paraguayo?

Presenta los resultados con tablas y recomendaciones claras.
```

### Documenta los hallazgos

**Métricas anuales calculadas:**
| Métrica | Valor |
|---------|-------|
| Ocupación promedio | % |
| ADR promedio | USD |
| RevPAR promedio | USD |
| Ingresos estimados | USD |

**Meses identificados:**
- Alta temporada: _______________
- Baja temporada: _______________
- Oportunidad de mejora: _______________

---

## Parte 3: Simulación de Escenarios (15 minutos)

### Pide simulaciones

```
Basándote en los datos del Hotel Guaraní, simula estos escenarios:

**Escenario A: Subir tarifas en temporada alta**
- Jun-Ago: Aumentar ADR 10%
- ¿Cuál sería el impacto si la ocupación cae 5%?
- ¿Conviene o no?

**Escenario B: Promoción en temporada baja**
- Ene-Feb: Reducir ADR 15%
- ¿Qué ocupación necesitamos para mantener ingresos?
- ¿Es realista lograr esa ocupación?

**Escenario C: Agregar 10 habitaciones**
- Mismo ADR y ocupación
- ¿Cuánto aumentan los ingresos?
- ¿Justifica la inversión de USD 200,000?
- Calcular payback period

**Escenario D: Segmentación de tarifas**
- Crear tarifa corporativa (ADR -15%, alta ocupación L-J)
- Crear tarifa fin de semana (ADR +10%, menor ocupación)
- ¿Cómo afecta el RevPAR total?

Para cada escenario:
1. Nuevos números proyectados
2. Comparación con situación actual
3. Recomendación: ¿implementar sí/no?
```

### Tabla de escenarios

| Escenario | RevPAR actual | RevPAR nuevo | Diferencia | ¿Implementar? |
|-----------|---------------|--------------|------------|---------------|
| A: +10% ADR alta | | | | |
| B: -15% ADR baja | | | | |
| C: +10 habitaciones | | | | |
| D: Segmentación | | | | |

---

## Parte 4: Estrategia de Precios (15 minutos)

### Pide estrategia de pricing

```
Desarrolla una estrategia de precios para el Hotel Guaraní:

**Contexto del mercado (Paraguay 2026):**
- Competencia directa: 3-4 hoteles similares en zona
- Demanda: principalmente corporativa L-J, turismo fin de semana
- Eventos anuales: Expo, feriados patrios, Navidad/Año Nuevo
- Temporada: alta en invierno (Jun-Ago), baja en verano

**Desarrolla:**

1. **Estructura de tarifas:**
   | Tipo de tarifa | Descripción | Precio base |
   |----------------|-------------|-------------|
   | Rack Rate | Tarifa máxima publicada | |
   | BAR | Best Available Rate | |
   | Corporativa | Empresas con convenio | |
   | Promocional | Ofertas especiales | |

2. **Calendario de tarifas:**
   - Fechas de tarifa alta
   - Fechas de tarifa media
   - Fechas de tarifa baja
   - Eventos especiales (tarifa premium)

3. **Reglas de pricing dinámico:**
   - Si ocupación proyectada > 80%, entonces ___
   - Si ocupación proyectada < 50%, entonces ___
   - Si reserva con 30+ días, entonces ___
   - Si reserva mismo día, entonces ___

4. **Políticas:**
   - Cancelación
   - Depósito/garantía
   - Niños y extras

5. **Monitoreo:**
   - ¿Qué métricas revisar semanalmente?
   - ¿Cada cuánto ajustar tarifas?
```

---

## Parte 5: Dashboard de Control (10 minutos)

### Diseña tu dashboard

```
Diseña un dashboard simple de revenue management
que pueda revisar semanalmente:

**Métricas esenciales (siempre visibles):**
1. Ocupación actual vs mismo período año anterior
2. ADR actual vs presupuesto
3. RevPAR actual vs objetivo
4. Pick-up de reservas (próximos 30 días)

**Formato sugerido:**
- Tabla simple que pueda mantener en Excel
- Indicadores de semáforo (verde/amarillo/rojo)
- Comparación con metas

**Ejemplo de estructura:**
| Métrica | Meta | Actual | vs Meta | Semáforo |
|---------|------|--------|---------|----------|
| Ocupación Semana | 70% | 65% | -5% | 🟡 |
| ADR Semana | $68 | $72 | +6% | 🟢 |
| RevPAR | $47.6 | $46.8 | -2% | 🟡 |

**Acciones automáticas:**
- Si semáforo rojo → qué hacer
- Si semáforo verde → qué hacer

Genera el template completo en formato tabla.
```

---

## Template para Análisis de Revenue

```
## Análisis de Revenue Management

**Propiedad:** ________________
**Período:** ________________
**Habitaciones:** ___

**Datos a analizar:**
| Mes/Semana | Ocupación | ADR | RevPAR |
|------------|-----------|-----|--------|
| | | | |

**Solicito:**
1. [ ] Cálculo de métricas básicas
2. [ ] Análisis de estacionalidad
3. [ ] Simulación de escenarios
4. [ ] Estrategia de tarifas
5. [ ] Dashboard de control

**Contexto del mercado:**
- Competencia: ________________
- Segmentos principales: ________________
- Eventos importantes: ________________

**Restricciones:**
- Tarifa mínima: USD ___
- Tarifa máxima: USD ___
- Objetivo de ocupación: ___%
- Objetivo de ADR: USD ___

**NOTA:**
La IA no tiene datos en tiempo real.
Verificar decisiones con datos actuales del mercado.
```

---

## Benchmarks Paraguay (2026 estimado)

### Hoteles 3 estrellas - Asunción

| Métrica | Bajo | Promedio | Alto |
|---------|------|----------|------|
| Ocupación anual | 50% | 62% | 75% |
| ADR | USD 45 | USD 60 | USD 80 |
| RevPAR | USD 22 | USD 37 | USD 60 |

### Hoteles 3 estrellas - Interior

| Métrica | Bajo | Promedio | Alto |
|---------|------|----------|------|
| Ocupación anual | 40% | 55% | 70% |
| ADR | USD 35 | USD 50 | USD 70 |
| RevPAR | USD 14 | USD 27 | USD 49 |

**⚠️ ESTOS SON ESTIMADOS - VERIFICAR CON DATOS REALES**

---

## Glosario de Métricas

| Término | Definición | Fórmula |
|---------|------------|---------|
| **ADR** | Average Daily Rate | Ingresos habitaciones / Habitaciones vendidas |
| **RevPAR** | Revenue Per Available Room | Ingresos / Habitaciones disponibles |
| **Ocupación** | % habitaciones ocupadas | Vendidas / Disponibles × 100 |
| **GOPPAR** | Gross Operating Profit PAR | GOP / Habitaciones disponibles |
| **Pick-up** | Reservas nuevas en período | Reservas fin - Reservas inicio |
| **LOS** | Length of Stay | Noches totales / Número de reservas |

---

## Entregable

### Reporte de Revenue Analysis

```markdown
# Análisis de Revenue - [Tu Propiedad]
## Período: [Mes/Año]

### 1. Resumen Ejecutivo
- Ocupación: __% (vs __% año anterior)
- ADR: USD __ (vs USD __ año anterior)
- RevPAR: USD __ (vs USD __ año anterior)
- Tendencia: [Mejorando/Estable/Declinando]

### 2. Análisis de Estacionalidad
[Gráfico o tabla de meses]
- Temporada alta: ___
- Temporada baja: ___
- Oportunidades: ___

### 3. Escenarios Simulados
| Escenario | Impacto | Recomendación |
|-----------|---------|---------------|
| | | |

### 4. Estrategia de Tarifas
[Estructura propuesta]

### 5. Plan de Acción
- Corto plazo (30 días): ___
- Mediano plazo (90 días): ___
- Largo plazo (12 meses): ___

### 6. Dashboard de Seguimiento
[Template de métricas semanales]

---
Análisis realizado: [fecha]
Próxima revisión: [fecha]
```

---

## Criterios de Éxito

- [ ] Calculaste métricas básicas (ADR, RevPAR, ocupación)
- [ ] Identificaste patrones de estacionalidad
- [ ] Simulaste al menos 3 escenarios diferentes
- [ ] Desarrollaste estrategia de precios
- [ ] Creaste dashboard de control
- [ ] Entiendes las limitaciones de la IA para datos en tiempo real

---

## Próximo Paso

Implementa en tu operación:
1. Exporta datos reales de tu PMS
2. Actualiza el análisis con datos actuales
3. Compara con competencia (manualmente)
4. Implementa estrategia de tarifas
5. Monitorea semanalmente con dashboard

---

*Ejercicio 3 - Hospitalidad y Turismo - FPUNA 2026*
