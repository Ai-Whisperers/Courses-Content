# 📱 Módulo 02: Crear Campañas Publicitarias (Meta Ads) en 45 Minutos

## 🎯 Resultado Final
Al terminar este módulo tendrás: **Una campaña publicitaria completa lista para implementar en Meta Ads** (investigación, brief creativo, estructura de campaña, copies, landing page, presupuesto y optimización)

**Tiempo total:** 45 minutos  
**Herramienta:** OpenCode  
**Conocimiento previo:** Módulo 01 completado (perfil de marca definido)

---

## Prompt 1: Investigación de Mercado en 5 Minutos ⏱️

**¿Cuándo usar?** Antes de crear cualquier campaña. Necesitas entender a quién le vas a vender.

### 📝 Prompt (Copiar y Pegar):
```
Actúa como analista de mercado senior. Voy a darte información de un negocio paraguayo y necesito que investigues el mercado objetivo.

INFORMACIÓN DEL NEGOCIO:
- Nombre: [NOMBRE]
- Producto/Servicio: [PRODUCTO]
- Ubicación: [CIUDAD]
- Precio: [RANGO_PRECIO]
- Cliente actual: [DESCRIPCIÓN_CLIENTE]

INVESTIGACIÓN REQUERIDA:
1. Audiencia objetivo detallada:
   - Demográfica (edad, género, ubicación, ingresos)
   - Psicográfica (intereses, valores, comportamientos)
   - Digital (qué redes usa, horarios, dispositivos)

2. 3 Segmentos de audiencia prioritarios:
   - Segmento 1: [nombre + características]
   - Segmento 2: [nombre + características]
   - Segmento 3: [nombre + características]

3. Dolor/Necesidad principal que resuelve el producto

4. 5 Intereses de target en Facebook/Instagram (paraguayos)

5. 3 Competidores directos en [CIUDAD] y sus fortalezas/debilidades

6. Oportunidad de mercado identificada

CONTEXTO PARAGUAY:
- Considerar nivel socioeconómico local
- Usar datos de Tigo, Personal (penetración móvil)
- Considerar festivales locales: San Juan, Carnaval, Semana Santa
- Moneda: Guaraníes (₲)
```

### 🔄 Variables a Personalizar:
- `[NOMBRE]` → Ej: "Hotel Los Lapachos", "Restaurante Ñandutí"
- `[PRODUCTO]` → Ej: "Hospedaje boutique en Encarnación", "Comida típica paraguaya"
- `[CIUDAD]` → Ej: "Encarnación, Paraguay", "Ciudad del Este"
- `[RANGO_PRECIO]` → Ej: "₲280.000-450.000 por noche"
- `[DESCRIPCIÓN_CLIENTE]` → Ej: "Parejas jóvenes de 25-40 años de Argentina y Brasil"

### ✅ Resultado Esperado:
Investigación de mercado completa con segmentos definidos y datos accionables para targeting.

### 🇵🇾 Ejemplo Paraguay:
**Input:**
```
- Nombre: "Hotel Los Lapachos" (hotel boutique en Encarnación)
- Producto: Hospedaje premium cerca de las Misiones Jesuíticas
- Ubicación: Encarnación, Itapúa
- Precio: ₲320.000-550.000 por noche
- Cliente: Turistas argentinos y brasileños interesados en cultura/historia
```

**Output típico:**
```
1. Audiencia objetivo:
   - Demográfica: 30-55 años, mixto, Argentina/Brasil/Paraguay, ingresos medio-altos
   - Psicográfica: Amantes de historia, cultura, viajes de fin de semana
   - Digital: Facebook 8-10pm, Instagram 12-2pm y 7-9pm, 70% mobile

2. Segmentos prioritarios:
   - Segmento 1: "Turista Cultural Argentino" - 35-50 años, interesado en UNESCO/patrimonio
   - Segmento 2: "Weekend Couple PY" - 28-40 años, asuncenos buscando escapadas románticas
   - Segmento 3: "Mochilero Premium Brasil" - 25-35 años, host→hotel upgrade

3. Dolor principal: Falta de hospedaje con carácter/auténtico cerca de las Misiones

4. Intereses FB/IG:
   - Misiones Jesuíticas Paraguay
   - Turismo cultural Paraguay
   - Patrimonio UNESCO
   - Posadas Argentina
   - Viajes en pareja

5. Competidores:
   - Hotel Misiones (fortaleza: ubicación, debilidad: anticuado)
   - Casa Muralla (fortaleza: boutique, debilidad: precio alto)
   - Airbnb locales (fortaleza: precio, debilidad: inconsistencia)

6. Oportunidad: Turismo de experiencia + hospedaje boutique + cercanía a Misiones
```

### 💡 Pro Tip:
Guarda esta investigación. La usarás en todos los prompts de campaña.

---

## Prompt 2: Crear Brief Creativo en 5 Minutos ⏱️

**¿Cuándo usar?** Ya tienes la investigación. Ahora definirás el concepto creativo de la campaña.

### 📝 Prompt (Copiar y Pegar):
```
Basándote en esta investigación de mercado:
[PÉGAR INVESTIGACIÓN DEL PROMPT 1 AQUÍ]

Crea un brief creativo completo para una campaña de Meta Ads.

BRIEF CREATIVO:
1. Objetivo de campaña (SMART):
   - Principal: [conversión/tráfico/reach]
   - KPI: [métrica específica]
   - Meta cuantitativa: [número]

2. Concepto creativo (big idea):
   - Insight: [verdad sobre el consumidor]
   - Proposición: [promesa principal]
   - Headline principal: [frase impactante]
   - Headlines alternativos (3):

3. Propuesta de valor única (UVP):
   - Qué hace diferente: [diferenciador]
   - Por qué importa al cliente: [beneficio emocional]

4. Tonos de comunicación:
   - Para cada segmento (3 tonos diferentes)

5. Elementos visuales clave:
   - Paleta de colores: [3 colores hex]
   - Estilo fotográfico: [descripción]
   - Tipografía: [sugerencias]

6. Call to Action principal:
   - CTA primario: [texto botón]
   - CTA secundario: [alternativa]

CONTEXTO PARAGUAY:
- Incluir "chipa", "tereré", "jopara" si aplica naturalmente
- Referenciar cercanía a Argentina/Brasil para turismo
- Usar orgullo paraguayo: "hecho en Paraguay", "de nuestra tierra"
```

### ✅ Resultado Esperado:
Brief creativo completo que guiará toda la producción de la campaña.

### 🇵🇾 Ejemplo Paraguay:
Para Hotel Los Lapachos:
```
1. Objetivo SMART:
   - Principal: Conversiones (reservas directas)
   - KPI: Costo por reserva ≤ ₲150.000
   - Meta: 50 reservas en 30 días

2. Concepto creativo:
   - Insight: "Los turistas quieren más que un hotel, quieren vivir la historia"
   - Proposición: "Dormir a metros del patrimonio UNESCO"
   - Headline: "Despierta en la historia"
   - Alternativos:
     * "A 5 minutos de 300 años de historia"
     * "Tu base para explorar las Misiones Jesuíticas"
     * "Donde las estrellas brillan sobre ruinas coloniales"

3. UVP:
   - Diferente: Único hotel boutique diseñado como extensión de la experiencia misionera
   - Beneficio: "Sentís que vivís la historia, no solo la visitás"

4. Tonos:
   - Segmento 1 (Arg): Sofisticado-culto, datos históricos, calidad premium
   - Segmento 2 (PY): Cálido-local, "voscuidado", orgullo paraguayo
   - Segmento 3 (Brasil): Aventurero-exótico, Instagrammable, experiencia única

5. Visuales:
   - Colores: Tierra misionera (#8B4513), Verde lapacho (#228B22), Oro colonial (#FFD700)
   - Estilo: Fotografía natural, luz dorada, contraste ruinas/modernidad
   - Font: Serif elegante + Sans-serif limpio

6. CTAs:
   - Primario: "Reservar Ahora"
   - Secundario: "Ver Habitaciones"
```

---

## Prompt 3: Estructura de Campaña Meta Ads en 10 Minutos ⏱️

**¿Cuándo usar?** Ya tienes el brief. Ahora diseñarás la arquitectura técnica de la campaña.

### 📝 Prompt (Copiar y Pegar):
```
Basándote en este brief creativo:
[PÉGAR BRIEF DEL PROMPT 2 AQUÍ]

Y esta investigación:
[PÉGAR INVESTIGACIÓN DEL PROMPT 1 AQUÍ]

Diseña la estructura técnica completa de una campaña Meta Ads.

ESTRUCTURA DE CAMPAÑA:

1. Estrategia de campaña:
   - Objetivo de campaña (FB): [conversions/traffic/awareness]
   - Estrategia de puja: [lowest cost/cost cap]
   - Presupuesto total sugerido: [monto] por [período]
   - Duración: [días]

2. Conjuntos de anuncios (Ad Sets) - 3 conjuntos mínimo:
   
   CONJUNTO 1: [Nombre descriptivo]
   - Audiencia: [detalle demográfico + intereses]
   - Ubicación: [ciudades/países]
   - Edad/Género: [rango]
   - Intereses: [5 específicos]
   - Presupuesto diario: [₲]
   - Puja: [automática/manual]
   - Optimización: [para qué evento]
   
   CONJUNTO 2: [Nombre]
   [misma estructura]
   
   CONJUNTO 3: [Nombre]
   [misma estructura]

3. Segmentación detallada por conjunto:
   - Audiencias guardadas (nombres sugeridos)
   - Audiencias similares (lookalike) - si aplica
   - Audiencias personalizadas (remarketing)

4. Colocaciones (Placements):
   - Automáticas vs Manuales: [recomendación]
   - Feed Instagram: Sí/No + por qué
   - Stories: Sí/No + por qué
   - Reels: Sí/No + por qué
   - Feed Facebook: Sí/No + por qué
   - Messenger: Sí/No + por qué
   - Audience Network: Sí/No + por qué

5. Estrategia de remarketing:
   - Público 1: Visitantes web 30 días (mensaje)
   - Público 2: Interacción con IG/FB 60 días (mensaje)
   - Público 3: Video views 75% 30 días (mensaje)

6. Calendario de campaña:
   - Día 1-7: Fase [nombre] - objetivo
   - Día 8-14: Fase [nombre] - objetivo
   - Día 15-21: Fase [nombre] - objetivo
   - Día 22-30: Fase [nombre] - objetivo

CONTEXTO PARAGUAY:
- Considerar fechas festivas: Feriados largos, San Juan (junio), Carnaval (febrero)
- Horarios: 12-14h (almuerzo), 20-23h (noche paraguaya)
- Móvil-first: 85% tráfico mobile
```

### ✅ Resultado Esperado:
Estructura técnica completa lista para configurar en Meta Ads Manager.

### 🇵🇾 Ejemplo Paraguay:
Para Hotel Los Lapachos:
```
1. Estrategia:
   - Objetivo: Ventas (Reservas)
   - Puja: Lowest cost con cap de ₲200.000 CPA
   - Presupuesto: ₲4.500.000 por 30 días (₲150.000/día)
   - Duración: 30 días (febrero - pre-Carnaval)

2. Conjuntos:
   
   CONJUNTO 1: "Turistas Argentinos - Misiones"
   - Audiencia: Interesados en turismo cultural argentinos 30-55 años
   - Ubicación: Argentina (Posadas, Buenos Aires, Córdoba, Rosario)
   - Edad: 30-55, Género: Todos
   - Intereses: Misiones Jesuíticas, Patrimonio UNESCO, Turismo cultural, Viajes en pareja, Posadas Argentina
   - Presupuesto: ₲60.000/día
   - Puja: Automática
   - Optimización: Conversiones (compra)
   
   CONJUNTO 2: "Parejas Paraguay - Weekend"
   - Audiencia: Parejas asuncenas 28-45 años
   - Ubicación: Paraguay (Asunción, Central, Lambaré)
   - Edad: 28-45
   - Intereses: Hoteles boutique, Escapadas de fin de semana, Lago Ypacaraí, Viajes en pareja
   - Presupuesto: ₲50.000/día
   
   CONJUNTO 3: "Lookalike - Clientes Previos"
   - Audiencia: Lookalike 1% de lista de clientes anteriores
   - Ubicación: Argentina, Brasil, Paraguay
   - Presupuesto: ₲40.000/día

3. Colocaciones:
   - Feed Instagram: SÍ (principal, mejor conversión visual)
   - Stories IG: SÍ (formato vertical, CTR alto)
   - Reels: SÍ (alto engagement, formato nativo)
   - Feed FB: NO (menor engagement turismo PY)
   - Messenger: NO
   - Audience Network: NO (baja calidad tráfico)

4. Calendario:
   - Día 1-7: Testing (3 creatividades por conjunto, optimizar CTR)
   - Día 8-14: Escalado (pausar peores ads, subir presupuesto a mejores)
   - Día 15-21: Optimización (A/B test copy, audiencias nuevas)
   - Día 22-30: Consolidación (máximo presupuesto en winners)
```

---

## Prompt 4: Copy para Ads en 10 Minutos ⏱️

**¿Cuándo usar?** Ya tienes la estructura. Ahora escribirás los textos de los anuncios.

### 📝 Prompt (Copiar y Pegar):
```
Basándote en:
- Brief creativo: [BRIEF]
- Estructura de campaña: [ESTRUCTURA]

Crea 9 copys de anuncios (3 por cada conjunto de anuncios).

PARA CADA CONJUNTO, CREAR:

**Conjunto [NÚMERO]: [NOMBRE]**

Anuncio A - Enfoque emocional:
- Headline (máx 40 caracteres):
- Texto principal (máx 125 caracteres para móvil):
- Descripción (opcional):
- CTA botón:

Anuncio B - Enfoque funcional:
[estructura igual]

Anuncio C - Enfoque urgencia/oferta:
[estructura igual]

REGLAS PARA COPIES:
1. Hook en primera línea (detener scroll)
2. Emojis estratégicos (máx 2 por copy)
3. Lenguaje paraguayo natural ("vos", "acá", "chipa")
4. Mencionar beneficio específico
5. Urgencia o escasez (si aplica)
6. CTA claro y directo

REGLAS POR CONJUNTO:
- Conjunto 1: Tono [descripción del tono]
- Conjunto 2: Tono [descripción]
- Conjunto 3: Tono [descripción]

EVITAR:
- "¡Increíble!", "¡Increíble oferta!" (spam)
- Mayúsculas excesivas
- Más de 3 emojis consecutivos
- Faltas de ortografía
```

### ✅ Resultado Esperado:
9 copys de anuncios listos para cargar en Meta Ads Manager.

### 🇵🇾 Ejemplo Paraguay:
**Conjunto 1: Turistas Argentinos - Misiones**

*Anuncio A - Emocional:*
- Headline: "Despierta en la historia 🇵🇾"
- Texto: "A 5 minutos caminando de La Santísima Trinidad. Tu base para explorar 300 años de historia jesuita. Reservá ahora y sentí la magia de las Misiones."
- CTA: "Reservar Ahora"

*Anuncio B - Funcional:*
- Headline: "Hotel Boutique + Misiones UNESCO"
- Texto: "Hospedaje premium a metros del patrimonio mundial. WiFi, desayuno con chipa artesanal, traslado a las ruinas incluido. Desde ₲320.000/noche."
- CTA: "Ver Disponibilidad"

*Anuncio C - Urgencia:*
- Headline: "Últimas 3 habitaciones febrero 🇵🇾"
- Texto: "Carnaval en las Misiones: reservá ahora y ahorrá 15%. Oferta válida hasta el 5 de febrero. Viví el patrimonio UNESCO desde tu puerta."
- CTA: "Aprovechar Oferta"

**Conjunto 2: Parejas Paraguay - Weekend**

*Anuncio A - Emocional:*
- Headline: "Escapada perfecta para 2 💚"
- Texto: "¿Necesitan desconectar? Vení a Encarnación. Desayuno en cama, jacuzzi privado, y la mejor vista de los lapachos. Vos te merecés este break."
- CTA: "Reservar Escapada"

*Anuncio B - Funcional:*
- Headline: "Weekend en Encarnación"
- Texto: "A 4 horas de Asunción. Check-in flexible, estacionamiento gratis, late checkout los domingos. Desde ₲320.000. Escribinos por WhatsApp."
- CTA: "Consultar por WhatsApp"

*Anuncio C - Urgencia:*
- Headline: "20% OFF fines de semana 🇵🇾"
- Texto: "Promo exclusiva para asuncenos: 20% de descuento en estadías de viernes a domingo. Cupos limitados. Código: ASUNCION20"
- CTA: "Ver Promo"

---

## Prompt 5: Landing Page Copy en 5 Minutos ⏱️

**¿Cuándo usar?** Los anuncios necesitan a dónde llevar al usuario. Crea la página de destino.

### 📝 Prompt (Copiar y Pegar):
```
Basándote en:
- Brief creativo: [BRIEF]
- Copys de anuncios: [COPIES]

Crea el copy completo para una landing page de conversión.

LANDING PAGE STRUCTURE:

1. Hero Section:
   - Headline principal (máx 10 palabras):
   - Subheadline (1-2 oraciones):
   - CTA principal (texto botón):
   - Elemento de confianza (bajo CTA):

2. Sección de Beneficios (3-4 cards):
   - Beneficio 1: [título + descripción corta]
   - Beneficio 2: [título + descripción]
   - Beneficio 3: [título + descripción]
   - Beneficio 4: [título + descripción]

3. Sección de Social Proof:
   - 3 Testimonios (nombre, ubicación, texto corto)
   - Estadística de confianza (si aplica)

4. Sección de Oferta/Price:
   - Precio mostrado:
   - Qué incluye (bullet points):
   - Garantía o beneficio adicional:

5. Sección de Urgencia (opcional):
   - Elemento de escasez/tiempo limitado:

6. Sección FAQ (5 preguntas):
   - Pregunta 1 + Respuesta
   - ...

7. Sección Final CTA:
   - Headline de cierre:
   - CTA final:
   - Garantía secundaria:

SEO ELEMENTS:
- Title tag (60 caracteres):
- Meta description (160 caracteres):
- H1:
- 2-3 palabras clave Paraguay:

PARAGUAY CONTEXT:
- Mencionar ubicación específica (ciudad, departamento)
- Incluir precio en Guaraníes
- Referenciar medios de pago locales (Bancard, Tigo Money)
- Mencionar WhatsApp como canal de contacto
```

### ✅ Resultado Esperado:
Copy completo de landing page listo para implementar (HTML o constructor web).

### 🇵🇾 Ejemplo Paraguay:
**Landing Page: Hotel Los Lapachos - Encarnación**

```
1. Hero Section:
   - Headline: "Dormí a metros de las Misiones Jesuíticas"
   - Subhead: "El único hotel boutique diseñado como extensión de la experiencia UNESCO. Desayuno con productos locales, WiFi premium, y vistas a los lapachos en flor."
   - CTA: "Reservar mi estadía"
   - Confianza: "⭐ 4.8/5 - 127 reseñas en Google | 🏆 Certificado de Excelencia 2024"

2. Beneficios:
   - Ubicación única: "A 5 minutos caminando de La Santísima Trinidad. No necesitás auto para visitar el patrimonio mundial."
   - Diseño boutique: "Cada habitación cuenta la historia de los pueblos misioneros. Decoración local, arte paraguayo, comfort internacional."
   - Gastronomía local: "Desayuno con chipa calentita, torta paraguaya casera, y café de Itapúa. Todo hecho acá, con ingredientes de la zona."
   - Experiencia completa: "Te organizamos el tour a las Misiones, reservamos tu cena en los mejores restoranes de Encarnación, y te contamos los secretos locales."

3. Social Proof:
   - "Increíble experiencia. El hotel es hermoso, la atención espectacular, y caminar a las Misiones al amanecer fue mágico." - María G., Buenos Aires
   - "Nos fuimos enamorados de Encarnación. El desayuno con chipa artesanal es el mejor que probé." - Carlos M., Asunción
   - "Perfecto para el turista que quiere más que un hotel. Vivís la historia desde que llegás." - Ana P., Posadas

4. Oferta:
   - Precio: "Desde ₲320.000/noche (desayuno incluido)"
   - Incluye:
     * Desayuno paraguayo completo
     * WiFi alta velocidad
     * Estacionamiento privado
     * Traslado a Misiones (ida y vuelta)
     * Late checkout domingos
   - Garantía: "Mejor precio garantizado. Si encontrás más barato, igualamos el precio + 10% descuento."

5. Urgencia:
   - "🔥 Solo 8 habitaciones disponibles para febrero"
   - "Oferta especial Carnaval: 15% OFF reservando antes del 5/feb"

6. FAQ:
   - "¿Cómo llego desde Asunción?" → "Por Ruta 1, 4 horas en auto. O micros cada hora desde Terminal de Asunción."
   - "¿Aceptan mascotas?" → "Sí, pet-friendly con previo aviso. Hay áreas verdes para pasear."
   - "¿Hay opciones veganas en el desayuno?" → "Sí, avisanos al reservar y preparamos opciones veganas deliciosas."
   - "¿Cómo pago?" → "Transferencia bancaria, Tigo Money, tarjetas vía Bancard, o efectivo al llegar."
   - "¿Hay WiFi para trabajar?" → "Sí, fibra óptica 100MB, ideal para digital nomads."

7. CTA Final:
   - Headline: "Tu base para descubrir las Misiones te espera"
   - CTA: "Quiero reservar ahora"
   - Garantía: "Cancelación gratis hasta 48h antes"

SEO:
- Title: "Hotel Boutique en Encarnación - Hotel Los Lapachos | Misiones Jesuíticas"
- Meta: "Hotel boutique premium en Encarnación, Paraguay. A 5 min de las Misiones Jesuíticas. Desde ₲320.000/noche. Reservá ahora."
- H1: "Hotel Boutique Los Lapachos - Encarnación, Paraguay"
```

---

## Prompt 6: Presupuesto y Pujas en 5 Minutos ⏱️

**¿Cuándo usar?** Necesitas definir cuánto invertir y cómo optimizar el gasto.

### 📝 Prompt (Copiar y Pegar):
```
Basándote en:
- Estructura de campaña: [ESTRUCTURA]
- Investigación de mercado: [INVESTIGACIÓN]

Crea una planificación de presupuesto detallada.

PRESUPUESTO META ADS:

1. Presupuesto total recomendado:
   - Monto total: ₲[cantidad] por [días] días
   - Presupuesto diario: ₲[cantidad]
   - Por conjunto:
     * Conjunto 1: ₲[cantidad]/día ([%] del total)
     * Conjunto 2: ₲[cantidad]/día ([%] del total)
     * Conjunto 3: ₲[cantidad]/día ([%] del total)

2. Estrategia de puja:
   - Método: [lowest cost/cost cap/bid cap]
   - Costo máximo por resultado objetivo: ₲[cantidad]
   - Justificación:

3. Proyección de resultados:
   - CPM estimado (Paraguay): ₲[rango]
   - CTR esperado: [X]%
   - Conversiones esperadas: [cantidad]
   - CPA objetivo: ₲[cantidad]
   - ROAS proyectado: [X]x

4. Distribución por fase:
   - Fase 1 (Testing): ₲[%] - [días] días
   - Fase 2 (Escalado): ₲[%] - [días] días
   - Fase 3 (Optimización): ₲[%] - [días] días

5. Métricas de éxito/fallo:
   - Matar ad si CTR < [X]% después de [cantidad] impresiones
   - Escalar ad si CPA < ₲[cantidad]
   - Pausar conjunto si ROAS < [X]x en [días] días

6. Plan de contingencia:
   - Si presupuesto se reduce a ₲[cantidad]: [acción]
   - Si CPA supera ₲[cantidad]: [acción]
   - Si no hay conversiones en [días] días: [acción]

CONTEXTO MERCADO PARAGUAY:
- CPM típicos PY: ₲15.000-35.000
- CTR promedio PY: 0.8-1.5%
- CPC promedio PY: ₲800-2.500
- Temporada alta: San Juan (junio), Carnaval (feb), Feriados largos
```

### ✅ Resultado Esperado:
Plan de presupuesto con proyecciones realistas para mercado paraguayo.

### 🇵🇾 Ejemplo Paraguay:
```
1. Presupuesto:
   - Total: ₲4.500.000 por 30 días
   - Diario: ₲150.000
   - Por conjunto:
     * Conjunto 1 (Argentina): ₲60.000/día (40%)
     * Conjunto 2 (Paraguay): ₲50.000/día (33%)
     * Conjunto 3 (Lookalike): ₲40.000/día (27%)

2. Estrategia de puja:
   - Método: Cost Cap con máximo de ₲180.000 por reserva
   - Justificación: Controlamos costos mientras Meta optimiza

3. Proyección:
   - CPM estimado: ₲22.000 (turismo)
   - CTR: 1.2%
   - Conversiones: 35-40 reservas
   - CPA objetivo: ₲112.500-128.000
   - ROAS: 2.5x-3x (considerando ₲350.000 ticket promedio)

4. Distribución:
   - Día 1-7 (Testing): ₲1.050.000 (23%)
   - Día 8-14 (Escalado): ₲1.050.000 (23%)
   - Día 15-30 (Consolidación): ₲2.400.000 (54%)

5. Métricas:
   - Matar ad si: CTR < 0.6% después de 10.000 impresiones
   - Escalar ad si: CPA < ₲100.000 y ROAS > 2x
   - Pausar conjunto si: Sin conversiones en 7 días con ₲420.000+ gastado

6. Contingencia:
   - Presupuesto reducido a ₲2.000.000: Enfocar solo en Conjunto 2 (PY) y un solo ad
   - CPA > ₲200.000: Revisar targeting, landing page, y oferta
   - Sin conversiones 10 días: Pausar todo, revisar pixel/tracking
```

---

## Prompt 7: Optimización de Campaña en 5 Minutos ⏱️

**¿Cuándo usar?** La campaña está corriendo. Necesitas saber qué hacer cada día.

### 📝 Prompt (Copiar y Pegar):
```
Basándote en:
- Estructura de campaña: [ESTRUCTURA]
- Presupuesto: [PRESUPUESTO]

Crea un checklist de optimización diaria y semanal.

CHECKLIST OPTIMIZACIÓN:

1. Checklist Diario (5 minutos):
   □ Revisar gasto vs presupuesto planificado
   □ Verificar CTR de cada ad (rojo si < 0.6%)
   □ Verificar CPC (alerta si > ₲3.000)
   □ Revisar conversiones (últimas 24h)
   □ Responder comentarios nuevos en ads
   □ [Acción si métrica mala]

2. Checklist Semanal (20 minutos - cada lunes):
   □ Analizar ROAS por conjunto de anuncios
   □ Revisar frecuencia (alerta si > 3.0)
   □ Analizar breakout por dispositivo (móvil vs desktop)
   □ Revisar breakout por edad/género
   □ Evaluar placements (dónde se gasta mejor)
   □ Crear nuevas variaciones de copy para A/B test
   □ Pausar peores performers, subir presupuesto a winners

3. Decisiones de escalado:
   SI ad tiene CTR > 1.5% y CPA < objetivo:
   - Subir presupuesto 20% cada 3 días
   
   SI ad tiene CTR < 0.6% después de 10k impresiones:
   - Pausar ad inmediatamente
   
   SI conjunto tiene ROAS > 3x:
   - Duplicar presupuesto
   - Crear lookalike de convertidores
   
   SI frecuencia > 3.0:
   - Refrescar creatividades
   - Ampliar audiencia
   - O pausar 3 días y reiniciar

4. Señales de alarma (acción inmediata):
   - CTR promedio cae 30% en 3 días: [acción]
   - CPC sube 50%: [acción]
   - Zero conversiones 5 días seguidos: [acción]
   - CPM sube 40%: [acción]
   - Frecuencia > 4.0: [acción]

5. Optimizaciones creativas:
   - Rotación de ads: cada [X] días
   - Test de nuevos headlines: mensual
   - Actualización de imágenes: cada [X] semanas
   - Seasonal refresh: antes de [eventos específicos]

6. Reporte semanal template:
   Gasto total: ₲[cantidad]
   Conversiones: [cantidad]
   CPA: ₲[cantidad]
   ROAS: [X]x
   Mejor performer: [ad/conjunto]
   Acciones tomadas: [lista]
   Plan próxima semana: [acciones]

CONTEXTO PARAGUAY:
- Horario de revisión: 9am (antes del mediodía)
- Eventos a monitorear: Feriados, partidos selección Paraguay, festival San Juan
- Competencia turística: Revisar qué hacen hoteles competidores
```

### ✅ Resultado Esperado:
Sistema de optimización completo con decisiones claras y checklist actionable.

### 🇵🇾 Ejemplo Paraguay:
```
1. Checklist Diario:
   □ Gasto: ¿Estamos en ₲150.000 ± 10%?
   □ CTR: ¿Todos los ads > 0.8%? Si no, marcar para revisar
   □ CPC: ¿< ₲2.500? Si es más, revisar relevancia anuncio
   □ Conversiones: ¿Al menos 1-2 por día?
   □ Comentarios: ¿Hay preguntas sin responder? Responder en 2h
   □ Si CTR < 0.6% después de 8.000 impresiones: PAUSAR AD

2. Checklist Semanal (Lunes 9am):
   □ ROAS por conjunto: ¿Conjunto 1 > 2.5x? ¿Conjunto 2 > 2x?
   □ Frecuencia: ¿< 2.5 en PY? ¿< 2.0 en Argentina?
   □ Breakout dispositivo: ¿90%+ mobile? Si desktop convierte más, ajustar
   □ Edad: ¿Qué rango convierte mejor? Ajustar targeting
   □ Placements: ¿Stories > Feed? Ajustar presupuesto
   □ Crear 2 nuevos headlines para test
   □ Pausar bottom 20% performers, mover presupuesto a top 20%

3. Decisiones:
   CTR > 1.5% + CPA < ₲100.000:
   → Subir presupuesto 20% cada 72 horas hasta ₲100.000/día
   
   CTR < 0.6% después 10k impresiones:
   → PAUSAR. Extraer aprendizaje, no repetir ese ángulo
   
   ROAS > 3x:
   → Duplicar presupuesto, crear campaña duplicada con lookalike 1%
   
   Frecuencia > 3.0:
   → 3 opciones: (1) nuevas imágenes, (2) pausa 72h, (3) ampliar audiencia 20%

4. Alarmas:
   - CTR cae 30%: Revisar fatiga creativa, cambiar imágenes urgentemente
   - CPC > ₲4.000: Competencia aumentó, revisar oferta/diferenciación
   - 0 conversiones 5 días: PROBLEMA SERIO. Revisar pixel, landing page, oferta
   - CPM > ₲40.000: Competencia por fechas especiales (San Juan/Carnaval)
   - Frecuencia > 4: Audiencia saturada, pausar campaña 1 semana

5. Optimizaciones:
   - Rotación: Cada 14 días pausar worst 30%, crear 3 nuevas variantes
   - Test headlines: Primer lunes de cada mes
   - Refresh imágenes: Cada 21 días o antes de eventos (San Juan, Carnaval)
   - Seasonal: Refresh completo 2 semanas antes de San Juan y Carnaval

6. Template Reporte:
   ```
   📊 Reporte Semanal - Hotel Los Lapachos
   Semana del: [fecha]
   
   💰 Gasto total: ₲1.050.000
   🎯 Conversiones: 8 reservas
   💵 CPA: ₲131.250
   📈 ROAS: 2.7x
   
   🏆 Mejor performer: Ad "Despierta en la historia" - Conjunto 1
      CTR: 1.8% | CPC: ₲1.200 | 5 conversiones
   
   ✅ Acciones tomadas:
   - Subimos presupuesto Conjunto 1 a ₲75.000/día
   - Pausamos Ad B de Conjunto 2 (CTR 0.4%)
   - Creamos 2 nuevos headlines para test
   
   📋 Plan próxima semana:
   - Continuar escalando Conjunto 1
   - Crear lookalike de 8 convertidores
   - Preparar refresh creativo para Carnaval
   ```
```

---

## 🎓 Ejercicio Práctico: Házlo Ahora (30 minutos)

### Tu Misión:
1. **Elige una empresa turística paraguaya real o ficticia** (ej: agencia de tours, hotel, restaurante turístico, guía de turismo)

2. **Abre OpenCode** (Ctrl+J o Cmd+J)

3. **Usa los 7 prompts en orden:**
   - Prompt 1: Investigación (5 min)
   - Prompt 2: Brief creativo (5 min)
   - Prompt 3: Estructura campaña (10 min)
   - Prompt 4: Copy para ads (10 min)
   - Prompt 5: Landing page copy (5 min)
   - Prompt 6: Presupuesto y pujas (5 min)
   - Prompt 7: Optimización (5 min)

4. **Guarda todo en un archivo** o Google Docs

### Ejemplo de Empresa para Practicar:
**"Tours Misiones Paraguay"** (agencia de tours ficticia)

- Producto: Tours guiados de 1-3 días a La Santísima Trinidad y Jesús de Tavarangue
- Ubicación: Encarnación, Itapúa
- Precio: ₲450.000-1.200.000 por persona (todo incluido)
- Cliente: Turistas argentinos, brasileños y paraguayos interesados en cultura e historia
- Diferenciación: Guías especializados en historia jesuita, grupos pequeños máximo 8 personas, experiencia nocturna en ruinas

**Resultado esperado:** Campaña Meta Ads completa lista para implementar, con investigación de mercado, brief creativo, estructura técnica, 9 copys de anuncios, landing page, presupuesto de ₲3.000.000-6.000.000, y plan de optimización.

---

## ✅ Checklist de Finalización

Después de este módulo deberías tener:
- [ ] Investigación de mercado completa (audiencia, competidores, oportunidades)
- [ ] Brief creativo con concepto, UVP, y tonos por segmento
- [ ] Estructura técnica de campaña Meta Ads (3+ conjuntos)
- [ ] 9 copys de anuncios listos para cargar
- [ ] Copy completo de landing page
- [ ] Plan de presupuesto con proyecciones
- [ ] Sistema de optimización diaria/semanal

**Total: ~5,000 palabras de contenido de campaña generado en 45 minutos**

---

## 💡 Próximos Pasos

Con esta campaña puedes:
1. Crear la cuenta en Meta Ads Manager (business.facebook.com)
2. Configurar el pixel de conversión
3. Subir la campaña con toda la estructura
4. Monitorear y optimizar según el checklist
5. Cobrar ₲1.000.000-3.000.000 por crear y gestionar campañas a PYMEs

**Siguiente módulo:** Atención al Cliente Automatizada en 30 minutos.

---

*Módulo 02 - Marketing con OpenCode | FPUNA 2026 | AI Whisperers*
