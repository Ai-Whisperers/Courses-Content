# 📱 Módulo 07: Hotelaria y Revenue Management en 40 Minutos

## 🎯 Resultado Final
Al terminar este módulo tendrás: **Sistema completo de revenue management** (estrategia de pricing dinámico, forecasting, paquetes promocionales, distribución optimizada, análisis competitivo, y reportes de revenue)

**Tiempo total:** 40 minutos  
**Herramienta:** OpenCode  
**Conocimiento previo:** Ninguno

---

## Prompt 1: Estrategia de Pricing Dinámico en 10 Minutos ⏱️

**¿Cuándo usar?** Necesitas definir precios que cambien según demanda, temporada, y ocupación.

### 📝 Prompt (Copiar y Pegar):
```
Actúa como Revenue Manager de hotel boutique. Voy a darte datos de un hotel paraguayo y necesito una estrategia de pricing dinámico.

DATOS DEL HOTEL:
- Nombre: [NOMBRE]
- Ubicación: [CIUDAD]
- Categoría: [CATEGORIA]
- Habitaciones: [CANTIDAD]
- Precio base actual: [PRECIO_BASE]
- Ocupación promedio anual: [OCUPACION]% 
- Temporada alta: [MESES_ALTA]
- Temporada baja: [MESES_BAJA]
- Eventos locales importantes: [EVENTOS]
- Competidor principal: [COMPETIDOR] a [PRECIO_COMPETIDOR]

ESTRATEGIA DE PRICING DINÁMICO:

1. Estructura de precios base por tipo:
   - Estándar: ₲[precio] - características
   - Superior: ₲[precio] - características
   - Suite: ₲[precio] - características

2. Diferenciales por temporada:
   - Temporada alta (eventos/feriados): +[X]% sobre base
   - Temporada media: base
   - Temporada baja: -[X]% sobre base

3. Diferenciales por antelación:
   - Last minute (<7 días): +[X]% o -[X]% (justificar)
   - Estándar (7-30 días): base
   - Early bird (>30 días): -[X]%

4. Diferenciales por ocupación:
   - <30% ocupación: acciones
   - 30-60% ocupación: acciones
   - 60-80% ocupación: acciones
   - >80% ocupación: acciones

5. Eventos y fechas especiales:
   Para cada evento: fecha + multiplicador de precio + estrategia

6. Descuentos y promociones permitidos:
   - Máximo descuento sin aprobación: [X]%
   - Descuentos por volumen: reglas
   - Promociones recurrentes: cuáles y cuándo

7. Política de overbooking:
   - Cuándo hacer overbooking (si aplica)
   - Porcentaje máximo
   - Plan de contingencia

CONTEXTO PARAGUAY:
- Temporadas: Verano (dic-feb) - alta, Invierno (jun-ago) - media, Resto - baja
- Eventos: San Juan (junio), Carnaval (feb), feriados largos, Semana Santa
- Fútbol: eventos importantes afectan precios en ciudades con estadio
- Pagos: considerar cuotas en tarjetas (Bancard)
```

### 🔄 Variables a Personalizar:
- `[NOMBRE]` → Ej: "Hotel Los Lapachos"
- `[CIUDAD]` → Ej: "Encarnación, Itapúa"
- `[CATEGORIA]` → Ej: "Hotel boutique 3 estrellas superior"
- `[CANTIDAD]` → Ej: "12 habitaciones"
- `[PRECIO_BASE]` → Ej: "₲350.000"
- `[OCUPACION]` → Ej: "58"
- `[MESES_ALTA]` → Ej: "Diciembre-Febrero, Junio (San Juan), feriados largos"
- `[MESES_BAJA]` → Ej: "Marzo, Mayo, Agosto, Septiembre"
- `[EVENTOS]` → Ej: "San Juan, Carnaval, feriados, partidos importantes"
- `[COMPETIDOR]` → Ej: "Hotel Misiones"
- `[PRECIO_COMPETIDOR]` → Ej: "₲220.000"

### ✅ Resultado Esperado:
Estrategia de pricing dinámico completa con reglas claras.

### 🇵🇾 Ejemplo Paraguay:

**HOTEL LOS LAPACHOS - ESTRATEGIA DE PRICING**

**1. ESTRUCTURA DE PRECIOS BASE:**

- **Habitación Estándar (5 unidades)**: ₲320.000/noche
  Características: 20m2, cama queen, baño, WiFi, vista jardín
  
- **Habitación Superior (4 unidades)**: ₲420.000/noche
  Características: 25m2, cama king, balcón, vista parcial ruinas
  
- **Suite con Jacuzzi (3 unidades)**: ₲550.000/noche
  Características: 35m2, jacuzzi privado, terraza, vista ruinas

**2. DIFERENCIALES POR TEMPORADA:**

| Temporada | Período | Multiplicador | Precio Estándar |
|-----------|---------|---------------|-----------------|
| Alta | Dic-Feb, San Juan, Carnaval, Feriados largos | 1.6x | ₲512.000 |
| Media | Mar, Nov, vacaciones escolares julio | 1.2x | ₲384.000 |
| Baja | Abr, May, Jun (no San Juan), Ago, Sep, Oct | 0.75x | ₲240.000 |

**3. DIFERENCIALES POR ANTELACIÓN:**

- **Early bird (>30 días)**: -15% (incentivar reserva anticipada)
- **Estándar (7-30 días)**: precio temporada
- **Last minute (<7 días)**:
  - Si ocupación <60%: -10% (llenar camas vacías)
  - Si ocupación >80%: +20% (aprovechar demanda repentina)

**4. DIFERENCIALES POR OCUPACIÓN:**

- **<30% ocupación**: Activar promos agresivas (-25%), contactar agencias, ofrecer upgrades gratuitos para valorar habitaciones superiores
- **30-60% ocupación**: Pricing estándar, promociones moderadas
- **60-80% ocupación**: +10% precio, pausar descuentos, upselling activo
- **>80% ocupación**: +20% precio, overbooking controlado 5%, lista espera activa

**5. EVENTOS Y FECHAS ESPECIALES:**

| Evento | Fecha 2026 | Multiplicador | Estrategia |
|--------|------------|---------------|------------|
| Año Nuevo | 31 dic-2 ene | 2.0x | Mínimo 2 noches, 100% prepago |
| Carnaval | 14-17 feb | 1.8x | Paquete 3 noches mínimo |
| Semana Santa | 2-5 abr | 1.5x | Early bird -20% si reserva antes 1/mar |
| San Juan | 23-24 jun | 2.0x | Evento local principal, precio máximo |
| Feriado 14 ago | 14-16 ago | 1.4x | Puente largo, turismo interno |
| Navidad | 24-26 dic | 1.6x | Familias, cena especial incluida |

**6. DESCUENTOS PERMITIDOS:**

- **Máximo sin aprobación gerencia**: 20%
- **Máximo con aprobación**: 35% (solo temporada baja)
- **Descuento por volumen**:
  - 4+ habitaciones: 15% grupo
  - 5+ noches: 20% estadía larga
  - 10+ noches: 30% (nómadas digitales)
- **Promociones recurrentes**:
  - "Lunes de Locura": -30% lunes temporada baja
  - "Cumpleañero": upgrade + late checkout gratis
  - "Repetidor": 25% OFF segunda visita (12 meses)

**7. POLÍTICA DE OVERBOOKING:**

- **Cuándo**: Solo temporada alta con >90% ocupación confirmada
- **Máximo**: 5% (1 habitación sobre 20)
- **Contingencia**: Acuerdo con hotel cercano similar (Casa Muralla) para relocación con compensación (1 noche gratis + traslado pagado)

---

## Prompt 2: Forecasting de Ocupación en 5 Minutos ⏱️

**¿Cuándo usar?** Necesitas prever cuántas habitaciones venderás para planificar.

### 📝 Prompt (Copiar y Pegar):
```
Basándote en esta estrategia de pricing:
[ESTRATEGIA PROMPT 1]

Y estos datos históricos del hotel:
- Año pasado ocupación promedio mensual: [DATOS]
- Tendencia: [CRECIMIENTO/CAÍDA]% vs año anterior
- Eventos nuevos: [EVENTOS]
- Competencia nueva: [CAMBIOS]

Crea un forecasting de ocupación para los próximos 12 meses.

FORECASTING DE OCUPACIÓN:

1. Proyección mensual:
   Mes | Ocupación esperada % | Habitaciones vendidas | ADR estimado | Revenue estimado
   
2. Pick-up mensual (cómo llegaremos a esa ocupación):
   - Leads esperados por canal
   - Conversión esperada por canal
   - Reservas necesarias por semana

3. Días críticos a monitorear:
   - Fechas con riesgo de baja ocupación (<40%)
   - Fechas con riesgo de overbooking (>95%)
   - Acciones preventivas para cada caso

4. Escenarios:
   - Optimista: [X]% ocupación (qué debe pasar)
   - Realista: [X]% ocupación (base)
   - Pesimista: [X]% ocupación (qué debe pasar)

5. Acciones si no se cumple forecast:
   - Si ocupación <60% a 30 días del mes: acciones
   - Si ADR < objetivo: acciones

CONTEXTO PARAGUAY:
- Variación estacional marcada
- Eventos impredecibles afectan (lluvias, crisis económica)
- Turismo argentino/brasilero variable según economía de ellos
- Comparar con datos del año anterior mismo mes
```

### ✅ Resultado Esperado:
Forecasting de ocupación mensual con escenarios y acciones.

### 🇵🇾 Ejemplo Paraguay:

**FORECASTING 2026 - HOTEL LOS LAPACHOS**

**1. PROYECCIÓN MENSUAL:**

| Mes | Ocupación % | Hab. vendidas | ADR | Revenue |
|-----|-------------|---------------|-----|---------|
| Ene | 75% | 279 | ₲420.000 | ₲117.180.000 |
| Feb | 85% | 285 | ₲480.000 | ₲136.800.000 |
| Mar | 55% | 204 | ₲280.000 | ₲57.120.000 |
| Abr | 50% | 180 | ₲300.000 | ₲54.000.000 |
| May | 45% | 167 | ₲240.000 | ₲40.080.000 |
| Jun | 80% | 288 | ₲450.000 | ₲129.600.000 |
| Jul | 60% | 223 | ₲320.000 | ₲71.360.000 |
| Ago | 50% | 186 | ₲260.000 | ₲48.360.000 |
| Sep | 45% | 162 | ₲240.000 | ₲38.880.000 |
| Oct | 50% | 186 | ₲280.000 | ₲52.080.000 |
| Nov | 55% | 198 | ₲340.000 | ₲67.320.000 |
| Dic | 90% | 335 | ₲520.000 | ₲174.200.000 |
| **TOTAL** | **62%** | **2.693** | **₲349.000** | **₲938.980.000** |

**2. PICK-UP MENSUAL:**

Para enero (75% objetivo = 279 noches):
- Leads Meta Ads: 450 → Conversión 8% = 36 reservas
- Leads Google/Búsqueda: 200 → Conversión 12% = 24 reservas
- Leads Instagram: 300 → Conversión 6% = 18 reservas
- Leads Directo/web: 150 → Conversión 15% = 22 reservas
- Agencias/Receptivos: 80 reservas
- **Total esperado: 180 reservas → 279 noches (promedio 1.55 noches)**

Reservas necesarias por semana: 45

**3. DÍAS CRÍTICOS:**

Riesgo baja ocupación (<40%):
- 15-20 mayo: Acciones: Promo "Lunes de Locura", contactar empresas locales
- 10-15 agosto: Acciones: Paquete weekend asuncenos, descuento 25%

Riesgo overbooking (>95%):
- 31 dic-2 ene: Acciones: Overbooking 5% controlado, lista espera, precio máximo
- 23-24 junio (San Juan): Acciones: Mínimo 2 noches, 100% prepago

**4. ESCENARIOS:**

- **Optimista (70% ocupación anual)**: Crisis económica no afecta, turismo argentino crece 20%, eventos locales exitosos. Revenue: ₲1.050M
- **Realista (62% ocupación)**: Escenario base con variaciones normales. Revenue: ₲939M
- **Pesimista (50% ocupación)**: Crisis económica, competencia nueva fuerte, temporada de lluvias extensa. Revenue: ₲750M

---

## Prompt 3: Promociones y Paquetes en 5 Minutos ⏱️

**¿Cuándo usar?** Necesitas crear ofertas específicas para diferentes segmentos y temporadas.

### 📝 Prompt (Copiar y Pegar):
```
Basándote en el hotel:
- Capacidad: [HABITACIONES]
- Precio base: [PRECIO]
- Segmentos objetivo: [SEGMENTOS]
- Temporadas: [ALTA/MEDIA/BAJA]

Diseña 8 promociones y paquetes estratégicos.

PROMOCIONES Y PAQUETES:

Para cada promoción definir:
1. Nombre atractivo
2. Segmento objetivo
3. Temporada aplicación
4. Qué incluye (detallado)
5. Precio normal vs precio promo
6. Ahorro % para cliente
7. Restricciones (mínimo noches, blackouts)
8. Objetivo de revenue (llenar camas vs maximizar rate)
9. Canales de venta (web, whatsapp, agencias)
10. Métrica de éxito

PROMOCIONES REQUERIDAS:
1. Promoción temporada baja (llenar camas)
2. Paquete romántico (alto valor)
3. Paquete familiar
4. Promoción early bird (anticipación)
5. Paquete experiencia local (diferenciador)
6. Promoción last minute (ocupación <50%)
7. Paquete nómadas digitales (estadía larga)
8. Promoción lealtad/repetidor

CONTEXTO PARAGUAY:
- Parejas asuncenas buscan weekend escapes
- Familias viajan en vacaciones escolares (julio, verano)
- Nómadas digitales: tendencia creciente
- Eventos: San Juan, Carnaval son pico demanda
```

### ✅ Resultado Esperado:
8 promociones detalladas listas para implementar.

### 🇵🇾 Ejemplo Paraguay:

**1. "LUNES DE LOCURA" (Temporada baja - llenar camas)**
- **Segmento**: Turista local/paraguayo flexible
- **Temporada**: Mayo, agosto, septiembre (todos los lunes)
- **Incluye**: 1 noche + desayuno + late checkout 15:00
- **Precio**: ₲180.000 (vs ₲240.000 normal) - 25% OFF
- **Restricciones**: Solo lunes, sujeto a disponibilidad
- **Objetivo**: Llenar camas lunes (día más débil)
- **Canales**: WhatsApp, Instagram
- **Métrica**: Ocupación lunes >50%

**2. "ESCAPADA ROMÁNTICA PY" (Alto valor - parejas)**
- **Segmento**: Parejas 28-45 años asuncenas
- **Temporada**: Todo el año excepto pico eventos
- **Incluye**: 2 noches habitación superior + cena privada en terraza + botella vino + sesión fotográfica + late checkout 16:00
- **Precio**: ₲950.000 (vs ₲1.200.000 valor) - 21% OFF
- **Restricciones**: Mínimo 2 noches, reservar +7 días antes
- **Objetivo**: Maximizar ADR en parejas
- **Canales**: Meta Ads targeting parejas, Google
- **Métrica**: 20 paquetes/mes vendidos

**[Promociones 3-8 continúan...]**

---

## Prompt 4: Distribución de Habitaciones en 5 Minutos ⏱️

**¿Cuándo usar?** Necesitas definir cuántas habitaciones asignar a cada canal de venta.

### 📝 Prompt (Copiar y Pegar):
```
Para el hotel:
- Total habitaciones: [CANTIDAD]
- Tipos: [TIPOS_Y_CANTIDAD]
- Canales de venta: [CANALES]
- Comisiones por canal: [COMISIONES]

Crea una estrategia de distribución de habitaciones.

DISTRIBUCIÓN:

1. Allocation por canal:
   Canal | % habitaciones asignadas | Habitaciones/noche | Estrategia
   
2. Política por tipo de habitación:
   - Estándar: distribución por canal
   - Superior: distribución por canal
   - Suite: distribución por canal

3. Upgrading estratégico:
   - Cuándo hacer upgrade gratuito
   - Cuándo cobrar upgrade
   - Política de upselling

4. Last room availability:
   - Qué canales se cierran primero
   - Qué canales permanecen abiertos hasta el final

5. Overbooking por canal:
   - Política si un canal overbooka

CONTEXTO PARAGUAY:
- Booking.com: canal más importante para turismo internacional
- WhatsApp/Directo: margen más alto (sin comisión)
- Agencias locales: importantes para grupos
- Expedia: menos relevante para PY
```

### ✅ Resultado Esperado:
Estrategia de distribución con allocations por canal.

---

## Prompt 5: Análisis de Competencia Hotelera en 5 Minutos ⏱️

**¿Cuándo usar?** Necesitas monitorear precios y estrategias de competidores.

### 📝 Prompt (Copiar y Pegar):
```
Para el hotel:
- Ubicación: [CIUDAD]
- Categoría: [CATEGORIA]
- Competidores: [LISTA]

Crea sistema de análisis de competencia hotelera.

ANÁLISIS COMPETITIVO:

1. Competidores a monitorear:
   - Competidor 1: [nombre] - tracking qué
   - Competidor 2: [nombre] - tracking qué
   - Competidor 3: [nombre] - tracking qué

2. Tracking mensual:
   - Qué métricas revisar (precio, ocupación visible, promociones)
   - Frecuencia de revisión
   - Herramientas a usar

3. Acciones ante movimientos competencia:
   - Si bajan precios: qué hacer
   - Si suben precios: qué hacer
   - Si lanzan promos: qué hacer
   - Si hay overbooking: qué hacer

4. Alertas:
   - Cuándo alertar a gerencia
   - Qué situaciones son críticas

CONTEXTO PARAGUAY:
- Muchos hoteles PY no tienen revenue management formal (oportunidad)
- Competencia reacciona lento a cambios
- WhatsApp es canal de inteligencia (llamar y preguntar precios)
```

### ✅ Resultado Esperado:
Sistema de monitoreo de competencia con acciones definidas.

---

## Prompt 6: Optimización de Canales en 5 Minutos ⏱️

**¿Cuándo usar?** Necesitas mejorar el rendimiento de cada canal de ventas.

### 📝 Prompt (Copiar y Pegar):
```
Para los canales actuales:
- Directo/web: [X]% de ventas
- Booking.com: [X]% de ventas
- Agencias: [X]% de ventas
- WhatsApp: [X]% de ventas
- Otros: [X]% de ventas

Crea estrategia de optimización de canales.

OPTIMIZACIÓN:

1. Meta por canal (mezcla ideal):
   - Objetivo % directo/web
   - Objetivo % Booking.com
   - Objetivo % agencias
   - Objetivo % WhatsApp
   - Justificación de mezcla ideal

2. Estrategia por canal:
   - Directo: cómo aumentar
   - Booking.com: cómo optimizar
   - Agencias: cómo mejorar
   - WhatsApp: cómo escalar

3. Reducción de comisiones:
   - Estrategia para bajar dependencia de OTAs
   - Incentivos para reserva directa
   - Parity rate (igualdad de precios)

4. Métricas por canal:
   - CPA (costo por adquisición) objetivo
   - Conversión objetivo
   - ADR por canal

CONTEXTO PARAGUAY:
- Booking.com cobra 15-18% comisión
- Reserva directa = margen mayor
- WhatsApp cada vez más usado para reservas
- Agencias locales importantes para turismo corporativo
```

### ✅ Resultado Esperado:
Estrategia de optimización de canales con acciones concretas.

---

## Prompt 7: Reportes de Revenue en 5 Minutos ⏱️

**¿Cuándo usar?** Necesitas crear reportes para monitorear y presentar resultados.

### 📝 Prompt (Copiar y Pegar):
```
Crea 3 templates de reportes de revenue.

REPORTES:

1. Reporte Diario (para uso interno):
   - Métricas clave
   - Ocupación del día
   - ADR del día
   - RevPAR
   - Reservas nuevas
   - Cancelaciones
   - Acciones del día

2. Reporte Semanal (para gerencia):
   - Resumen semanal vs forecast
   - Pick-up (velocidad reservas)
   - Canales performance
   - Competencia movimientos
   - Acciones próxima semana

3. Reporte Mensual (para dirección):
   - Revenue total vs objetivo
   - Ocupación mensual
   - ADR promedio
   - Mix de canales
   - Promociones performance
   - Forecast próximo mes
   - Recomendaciones estratégicas

Cada reporte incluir:
- Formato claro (tablas, bullets)
- Visualización sugerida (gráficos)
- Benchmarks (vs mes anterior, vs año pasado)
- Acciones derivadas

CONTEXTO PARAGUAY:
- Reportes en español
- Moneda: Guaraníes
- Comparar con mismo mes año anterior (estacionalidad)
```

### ✅ Resultado Esperado:
3 templates de reportes listos para usar.

---

## 🎓 Ejercicio Práctico: Házlo Ahora (40 minutos)

### Tu Misión:
1. **Elige un hotel real o ficticio de Paraguay** (ej: hotel en Ciudad del Este, cabaña en San Bernardino, hostel en Asunción)

2. **Abre OpenCode** (Ctrl+J o Cmd+J)

3. **Usa los 7 prompts en orden:**
   - Prompt 1: Pricing dinámico (10 min)
   - Prompt 2: Forecasting (5 min)
   - Prompt 3: Promociones (5 min)
   - Prompt 4: Distribución (5 min)
   - Prompt 5: Análisis competencia (5 min)
   - Prompt 6: Optimización canales (5 min)
   - Prompt 7: Reportes (5 min)

4. **Guarda todo en un archivo** o Excel

### Ejemplo de Ejercicio:
**"Hotel Centro Ciudad del Este"**

- 20 habitaciones (15 estándar, 5 superior)
- Precio base: ₲280.000
- Competidores: Hotel Munich, Hotel Austria
- Eventos: Compras de fin de semana, feriados

**Resultado esperado:** Estrategia completa de revenue management con pricing por temporada, forecasting mensual, 8 promociones, distribución por canal, y reportes.

---

## ✅ Checklist de Finalización

Después de este módulo deberías tener:
- [ ] Estrategia de pricing dinámico con diferenciales
- [ ] Forecasting de ocupación 12 meses con escenarios
- [ ] 8 promociones y paquetes detallados
- [ ] Distribución de habitaciones por canal
- [ ] Sistema de monitoreo de competencia
- [ ] Estrategia de optimización de canales
- [ ] 3 templates de reportes de revenue

**Total: ~3,000 palabras de estrategia de revenue generado en 40 minutos**

---

## 💡 Próximos Pasos

Con esta estrategia puedes:
1. Implementar revenue management en hotel propio
2. Ofrecer consultoría a hoteles locales
3. Cobrar ₲1.500.000-3.500.000 por crear estrategia de revenue
4. Trabajar como Revenue Manager remoto

**Siguiente módulo:** Estrategia y Planificación Anual en 50 minutos.

---

*Módulo 07 - Marketing con OpenCode | FPUNA 2026 | AI Whisperers*
