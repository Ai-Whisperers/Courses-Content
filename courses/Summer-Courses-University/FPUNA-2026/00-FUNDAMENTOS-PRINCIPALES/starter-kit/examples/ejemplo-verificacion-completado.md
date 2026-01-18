# Ejemplo Completado: Verificación de Información

## Contexto
Este es un ejemplo de cómo verificar información proporcionada por IA, completado por un estudiante de Economía de la FPUNA.

---

## La Consulta Original

El estudiante preguntó a la IA sobre datos económicos de Paraguay para un trabajo de macroeconomía.

### Prompt Usado
```
Dame datos sobre la inflación en Paraguay en los últimos 5 años
y los factores que la causaron.
```

### Respuesta de la IA
```
La inflación en Paraguay ha tenido los siguientes valores:
- 2020: 2.2%
- 2021: 6.8%
- 2022: 8.1%
- 2023: 4.5%
- 2024: 3.8%

Los principales factores fueron:
1. Aumento de precios de combustibles importados
2. Sequía que afectó la producción agrícola
3. Efectos de la pandemia en cadenas de suministro
4. Política monetaria del BCP
```

---

## Proceso de Verificación

### Paso 1: Identificar qué verificar

| Dato | Tipo | Prioridad de verificar |
|------|------|------------------------|
| Porcentajes de inflación | Estadística específica | ALTA |
| Años mencionados | Fecha | MEDIA |
| Causas mencionadas | Análisis/opinión | ALTA |
| Mención del BCP | Institución | BAJA |

### Paso 2: Buscar fuentes oficiales

**Fuente principal:** Banco Central del Paraguay (bcp.gov.py)
**Fuente secundaria:** Instituto Nacional de Estadística (INE)

### Paso 3: Comparación de datos

| Año | IA dijo | BCP dice* | ¿Coincide? |
|-----|---------|-----------|------------|
| 2020 | 2.2% | 2.2% | ✅ Sí |
| 2021 | 6.8% | 6.8% | ✅ Sí |
| 2022 | 8.1% | 8.1% | ✅ Sí |
| 2023 | 4.5% | 4.5% | ✅ Sí |
| 2024 | 3.8% | 4.1%** | ⚠️ Diferencia |

*Fuente: Informe de Política Monetaria, BCP
**Dato preliminar a diciembre 2024

### Paso 4: Verificar las causas

| Causa mencionada | ¿Verificable? | Fuente consultada | ¿Correcto? |
|------------------|---------------|-------------------|------------|
| Combustibles importados | Sí | Informe BCP | ✅ Mencionado |
| Sequía agrícola | Sí | MAG, BCP | ✅ Factor en 2021-2022 |
| Pandemia/suministro | Sí | BCP, prensa | ✅ Mencionado |
| Política monetaria BCP | Parcial | BCP | ⚠️ Simplificado |

---

## Hallazgos de la Verificación

### ✅ Información correcta:
1. Datos de inflación 2020-2023: Exactos
2. Causas generales: Correctamente identificadas
3. Mención de sequía: Verificada en informes oficiales

### ⚠️ Información con diferencias:
1. **Inflación 2024:** La IA dijo 3.8%, pero el BCP reporta 4.1%
   - *Posible causa:* La IA puede tener datos de corte anterior
   - *Acción:* Usar dato oficial más reciente

### ❓ Información que requiere más contexto:
1. **"Política monetaria del BCP":** Muy vago
   - El BCP subió la tasa de referencia de 0.75% a 8.5% entre 2021-2022
   - Esto es más específico y útil para el trabajo

---

## Información Complementaria Encontrada

Al buscar en fuentes oficiales, el estudiante encontró datos adicionales que la IA no mencionó:

| Dato adicional | Fuente | Útil para trabajo |
|----------------|--------|-------------------|
| Inflación núcleo vs general | BCP | Sí, muy relevante |
| Metas de inflación del BCP | BCP | Sí, contexto importante |
| Comparación regional | CEPAL | Sí, perspectiva |
| Impacto del tipo de cambio | BCP | Sí, factor adicional |

---

## Versión Corregida para el Trabajo

### Antes (solo con IA):
> "La inflación en Paraguay fue de 2.2% en 2020, subió a 8.1% en 2022, y bajó a 3.8% en 2024."

### Después (verificado y complementado):
> "Según el Banco Central del Paraguay (BCP), la inflación interanual pasó de 2.2% en 2020 a 8.1% en 2022, el nivel más alto en 14 años, para luego descender a 4.1% en 2024 (BCP, 2025). Este aumento se atribuye principalmente al incremento de precios internacionales de combustibles (+35% en 2022), la sequía que redujo la producción agrícola en 20% (MAG, 2022), y los efectos rezagados de la pandemia en cadenas de suministro globales. El BCP respondió elevando la tasa de política monetaria de 0.75% a 8.5% entre 2021 y 2022, contribuyendo a la posterior reducción inflacionaria."

---

## Señales de Alerta Identificadas

El estudiante aprendió a detectar estas señales de posible información incorrecta:

### 🚩 Señales encontradas en este ejercicio:

1. **Datos muy redondos o "perfectos"**
   - El dato de 2024 (3.8%) era sospechosamente redondo
   - El dato real (4.1%) era más "feo" pero correcto

2. **Falta de fuentes**
   - La IA no citó ninguna fuente
   - No indicó de dónde sacó los datos

3. **Información que suena a "sentido común"**
   - Las causas mencionadas eran correctas pero muy generales
   - Faltaban detalles específicos que un experto incluiría

### ✅ Señales de información probablemente correcta:

1. Los datos de 2020-2023 coincidieron exactamente → Probablemente de fuentes oficiales
2. Las causas eran consistentes con múltiples fuentes → No inventadas

---

## Detector de Alucinaciones Personal

Basándose en este ejercicio, el estudiante creó su lista:

### Antes de usar cualquier dato de IA, preguntarse:

1. **¿Es una estadística específica?**
   - Sí → VERIFICAR en fuente oficial
   - No → Probablemente OK pero revisar

2. **¿La IA citó una fuente?**
   - Sí → Buscar esa fuente y verificar
   - No → Asumir que puede ser inventado

3. **¿El dato es muy reciente (último año)?**
   - Sí → ALTO riesgo de error (corte de conocimiento)
   - No → Menor riesgo pero verificar igual

4. **¿Es información sobre Paraguay específicamente?**
   - Sí → ALTO riesgo (menos datos de Paraguay en entrenamiento)
   - No → Menor riesgo pero verificar

5. **¿Puedo encontrar el dato en 2 minutos de búsqueda?**
   - Sí → Vale la pena verificar
   - No → Si es importante, buscar más; si no, citar con cautela

---

## Recursos de Verificación para Paraguay

El estudiante compiló esta lista de fuentes confiables:

| Tema | Fuente oficial | Sitio web |
|------|----------------|-----------|
| Economía/Inflación | Banco Central del Paraguay | bcp.gov.py |
| Estadísticas generales | INE | ine.gov.py |
| Comercio exterior | Aduanas | aduana.gov.py |
| Agricultura | MAG | mag.gov.py |
| Población | INE (Censo) | ine.gov.py |
| Leyes | Poder Judicial | pj.gov.py |
| Noticias verificadas | ABC, Última Hora, La Nación | - |

---

## Reflexión Final

> "Aprendí que la IA es muy buena para darme un punto de partida y explicarme conceptos, pero para datos específicos de Paraguay siempre debo verificar. El 80% de lo que me dijo era correcto, pero ese 20% incorrecto hubiera afectado la calidad de mi trabajo. La verificación me tomó solo 15 minutos extra pero me dio confianza total en mis datos."
>
> — Estudiante de Economía, FPUNA

---

## Checklist para Futuros Trabajos

- [x] ¿Identifiqué qué datos necesitan verificación?
- [x] ¿Busqué en fuentes oficiales paraguayas?
- [x] ¿Comparé los datos de la IA con fuentes reales?
- [x] ¿Documenté las diferencias encontradas?
- [x] ¿Agregué información que la IA omitió?
- [x] ¿Cité correctamente las fuentes verificadas?
- [x] ¿Creé mi propia lista de señales de alerta?

---

*Ejemplo completado - Fundamentos de IA - FPUNA 2026*
