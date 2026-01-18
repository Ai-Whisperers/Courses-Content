# SETUP-AI.md - Configuración de Proyectos de Hospitalidad con IA

## Prompts para que la IA Configure tu Negocio de Hospitalidad

---

## 1. Setup Inicial del Establecimiento

```bash
claude "Configura el perfil de mi establecimiento:

Tipo: [hotel/restaurante/agencia de viajes/tour operador]
Nombre: [nombre comercial]
Ubicación: [ciudad, Paraguay]
Capacidad: [habitaciones/mesas/servicios]
Categoría: [estrellas o descripción]

Crea:
1. Estructura de carpetas para documentos operativos
2. Template de ficha del establecimiento
3. Checklist de información mínima para OTAs
4. Guía de fotos necesarias
5. Template de descripción del establecimiento
6. Lista de políticas a definir"
```

---

## 2. Definición de Segmentos de Clientes

```bash
claude "Define los segmentos de clientes para mi [tipo de negocio]:

Ubicación: [ciudad/zona turística]
Tipo de establecimiento: [descripción]
Servicios principales: [lista]
Rango de precios: ₲[X] - ₲[Y]

Genera:
1. 3-4 segmentos principales de clientes
2. Para cada segmento:
   - Perfil demográfico
   - Motivo de viaje/visita
   - Expectativas clave
   - Cómo reservan
   - Gasto promedio
   - Qué valoran más
3. Segmento prioritario y por qué
4. Cómo adaptar la comunicación a cada uno"
```

---

## 3. Configuración de Tarifas y Revenue

```bash
claude "Configura estrategia de tarifas:

Tipo: [hotel/restaurante]
Capacidad: [X unidades]
Costo fijo mensual aproximado: ₲[X]
Competencia: tarifa promedio ₲[X]

Para hotel genera:
1. Estructura de rate plans (BAR, no reembolsable, etc.)
2. Diferenciación por temporada
3. Políticas de cancelación por rate plan
4. Estrategia de pricing para OTAs vs directo
5. Calculadora simple de punto de equilibrio

Para restaurante genera:
1. Estructura de carta (categorías)
2. Cálculo de food cost objetivo
3. Estrategia de precios (cost-plus, competitivo)
4. Menús especiales (ejecutivo, happy hour)"
```

---

## 4. Presencia en OTAs y Canales Online

```bash
claude "Optimiza mi presencia en [Booking.com/Expedia/TripAdvisor]:

Establecimiento: [descripción breve]
Ubicación: [ciudad]
Puntos fuertes: [lista de 5]
Servicios especiales: [lista]

Genera:
1. Título optimizado (50 chars)
2. Descripción principal (1000 chars)
   - Hook inicial
   - Ubicación y acceso
   - Servicios destacados
   - Experiencia del huésped
3. Descripción de cada tipo de habitación/servicio
4. Lista de amenities a marcar
5. Políticas formateadas para la plataforma
6. Tags/categorías a seleccionar"
```

---

## 5. Respuestas a Reviews

```bash
claude "Crea plantillas de respuesta a reviews:

Tipo de negocio: [hotel/restaurante]
Tono de marca: [formal/amigable/cálido]

Genera respuestas para:
1. Review 5 estrellas (elogio general)
2. Review 5 estrellas (menciona específico)
3. Review 4 estrellas (bueno con sugerencia)
4. Review 3 estrellas (mixto)
5. Review 2 estrellas (problema específico)
6. Review 1 estrella (queja grave)

Cada respuesta debe:
- Agradecer específicamente
- Personalizar (no genérica)
- Abordar puntos mencionados
- Invitar a volver
- Máximo 100 palabras"
```

---

## 6. Sistema de Atención al Cliente

```bash
claude "Configura sistema de atención vía WhatsApp:

Establecimiento: [tipo y nombre]
Horario de atención: [horarios]
Servicios: [lista]
Preguntas más frecuentes: [lista de 10]

Genera:
1. Mensaje de bienvenida automático
2. Menú de opciones interactivo
3. Respuestas para cada FAQ
4. Proceso de reserva paso a paso
5. Respuesta para fuera de horario
6. Confirmación de reserva template
7. Recordatorio pre-llegada template
8. Mensaje post-estadía template"
```

---

## 7. Procedimientos Operativos (SOPs)

```bash
claude "Crea procedimientos operativos:

Para hotel:
- Proceso de check-in
- Proceso de check-out
- Limpieza de habitación
- Manejo de quejas
- Protocolo de emergencia

Para restaurante:
- Apertura del local
- Atención en mesa
- Cierre de caja
- Manejo de quejas
- Protocolo de seguridad alimentaria

Genera para cada uno:
1. Pasos numerados
2. Responsable
3. Tiempo estimado
4. Checklist verificable
5. Qué hacer si hay problema"
```

---

## 8. Email Marketing para Hospitalidad

```bash
claude "Configura email marketing:

Tipo: [hotel/restaurante/agencia]
Base de datos: [X contactos aproximados]
Objetivo: [fidelización/promociones/información]

Genera:
1. Secuencia pre-llegada (hotel):
   - 7 días antes: confirmación + upselling
   - 1 día antes: info práctica
   - Día de llegada: bienvenida

2. Secuencia post-estadía:
   - Día después: agradecimiento + review
   - 2 semanas: ofertas exclusivas
   - 3 meses: recordatorio + promoción

3. Newsletter mensual template
4. Email de cumpleaños/aniversario
5. Promoción de temporada template"
```

---

## 9. Gestión de Reputación Online

```bash
claude "Configura estrategia de reputación online:

Establecimiento: [nombre]
Plataformas activas: [Booking, TripAdvisor, Google, etc.]
Puntuación actual: [X en cada plataforma]
Número de reviews: [X]

Genera:
1. Checklist diario de monitoreo
2. Protocolo de respuesta por plataforma:
   - Tiempo máximo de respuesta
   - Tono apropiado
   - Cuándo escalar
3. Estrategia para pedir reviews
4. Cómo convertir queja en oportunidad
5. Métricas a seguir mensualmente
6. Template de reporte de reputación"
```

---

## 10. Revenue Management Básico

```bash
claude "Configura revenue management:

Hotel de [X] habitaciones
Tarifa rack: ₲[X]
Costo variable por habitación: ₲[X]
Ocupación promedio actual: [X%]
RevPAR actual: ₲[X]

Genera:
1. Estructura de tarifas por temporada
2. Reglas de pricing dinámico:
   - Ocupación < 30%: [acción]
   - Ocupación 30-60%: [acción]
   - Ocupación > 80%: [acción]
3. Estrategia de minimum stay
4. Calendario de eventos/demanda
5. Template de forecast semanal
6. Indicadores a monitorear diariamente"
```

---

## 11. Contenido para Redes Sociales

```bash
claude "Planifica contenido de redes:

Establecimiento: [tipo y nombre]
Plataformas: [Instagram/Facebook/TikTok]
Frecuencia deseada: [X posts/semana]
Recursos: [fotógrafo propio / stock / smartphone]

Genera para el mes:
1. Calendario de contenido (30 días)
2. Tipos de contenido por día:
   - Lunes: [tipo]
   - Martes: [tipo]
   - etc.
3. Ideas de Reels/TikToks (10)
4. Captions para cada tipo de post
5. Hashtags locales y del sector
6. UGC: cómo motivar a clientes a compartir"
```

---

## 12. Reportes y Análisis

```bash
claude "Configura sistema de reportes:

Tipo de negocio: [hotel/restaurante]
Sistema actual: [PMS/POS que usan]
Periodicidad: [diario/semanal/mensual]

Genera templates para:
1. Reporte diario:
   - Ocupación/ventas del día
   - Comparación vs mismo día año anterior
   - Reservas para próximos 7 días
   - Incidencias

2. Reporte semanal:
   - KPIs principales
   - Reviews recibidas
   - Competencia (si disponible)
   - Oportunidades identificadas

3. Reporte mensual:
   - Resumen de métricas
   - Análisis por segmento
   - Efectividad de promociones
   - Plan del mes siguiente"
```

---

## Checklist de Setup Completo

### Información Básica
- [ ] Ficha del establecimiento completa
- [ ] Segmentos de clientes definidos
- [ ] Competencia identificada
- [ ] Propuesta de valor clara

### Operaciones
- [ ] SOPs principales documentados
- [ ] Checklists diarios creados
- [ ] Protocolos de emergencia definidos
- [ ] Roles y responsabilidades claros

### Comercial
- [ ] Estructura de tarifas definida
- [ ] Políticas de cancelación claras
- [ ] Rate plans configurados
- [ ] Estrategia de distribución definida

### Online
- [ ] Perfiles en OTAs optimizados
- [ ] Google My Business configurado
- [ ] Redes sociales activas
- [ ] Página web/WhatsApp Business listo

### Atención al Cliente
- [ ] Respuestas automáticas configuradas
- [ ] Templates de respuesta a reviews
- [ ] Protocolo de manejo de quejas
- [ ] Secuencia de emails configurada

### Métricas
- [ ] KPIs definidos
- [ ] Templates de reportes listos
- [ ] Frecuencia de análisis establecida
- [ ] Metas claras por período

---

*SETUP-AI.md para Hospitalidad y Turismo - FPUNA 2026*
