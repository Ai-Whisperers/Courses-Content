# Módulo 5: Planificación y Propuestas con IA
## Itinerarios, Eventos y Documentos Comerciales

---

## Información del Módulo

| Campo | Detalle |
|-------|---------|
| **Duración** | 1.5 horas |
| **Tipo** | Práctico |
| **Prerrequisitos** | Módulos 1-4 completados |

---

## Objetivos de Aprendizaje

Al finalizar este módulo, los participantes podrán:

1. Crear itinerarios turísticos personalizados
2. Diseñar paquetes de viaje atractivos
3. Elaborar propuestas para eventos corporativos
4. Planificar bodas y celebraciones con IA
5. Generar presupuestos y cotizaciones profesionales

---

## Contenido

### 5.1 Creación de Itinerarios Turísticos (25 min)

#### Elementos de un Buen Itinerario

```
📋 ESTRUCTURA DE ITINERARIO:

1. TÍTULO ATRACTIVO
   "Aventura Guaraní: 5 días por el corazón de Paraguay"

2. RESUMEN EJECUTIVO
   Para quién es, qué incluye, highlights

3. DESGLOSE POR DÍA
   - Mañana, tarde, noche
   - Horarios sugeridos
   - Actividades con descripción
   - Tiempos de traslado
   - Comidas incluidas

4. INFORMACIÓN PRÁCTICA
   - Qué llevar
   - Clima esperado
   - Tips del local

5. PRECIOS Y CONDICIONES
   - Qué incluye/no incluye
   - Precio por persona
   - Políticas de cancelación
```

#### Prompt para Itinerario Básico

```
Crea un itinerario de [X] días en Paraguay para:

TIPO DE VIAJERO: [familia/pareja/mochilero/corporativo]
ORIGEN: [de dónde vienen]
INTERESES: [naturaleza/cultura/gastronomía/aventura]
PRESUPUESTO: [bajo/medio/alto]
ÉPOCA DEL AÑO: [mes]

El itinerario debe incluir:
- Título atractivo
- Resumen de 3 líneas
- Desglose día por día con horarios
- Actividades con breve descripción
- Sugerencias de comidas
- Opciones para cada gusto
- Tips locales

Destinos a considerar en Paraguay:
[Asunción, Encarnación, Misiones Jesuíticas, Chaco,
Areguá, San Bernardino, Ybycuí, etc.]
```

#### Ejemplo de Itinerario

**ESCAPADA CULTURAL: 3 DÍAS EN ASUNCIÓN Y ALREDEDORES**

*Ideal para parejas que buscan conocer la esencia paraguaya*

---

**DÍA 1: ASUNCIÓN HISTÓRICA Y GASTRONÓMICA**

| Hora | Actividad | Descripción |
|------|-----------|-------------|
| 08:00 | Desayuno | Hotel con opciones paraguayas |
| 09:30 | Centro Histórico | Panteón de los Héroes, Catedral, Plaza de Armas |
| 12:00 | Mercado 4 | Experiencia local, artesanías, frutas |
| 13:30 | Almuerzo | Lido Bar - clásico asunceno |
| 15:30 | Museo del Barro | Arte paraguayo contemporáneo |
| 18:00 | Costanera | Paseo al atardecer |
| 20:00 | Cena | Restaurante Tierra Colorada |

**Tips del día:** Llevar sombrero y agua. El Mercado 4 es mejor en la mañana.

---

**DÍA 2: AREGUÁ Y LAGO YPACARAÍ**

| Hora | Actividad | Descripción |
|------|-----------|-------------|
| 09:00 | Traslado | Asunción → Areguá (40 min) |
| 10:00 | Areguá | Pueblo de artesanos, cerámica, frutillas |
| 12:30 | Almuerzo | Vista al lago, comida casera |
| 14:30 | San Bernardino | Paseo por el lago, helados |
| 17:00 | Regreso | Con parada en Luque para ñandutí |
| 20:00 | Cena | Bolsi en Asunción |

**Tips del día:** Comprar cerámica directo a artesanos. Probar helado de frutilla.

---

**DÍA 3: NATURALEZA Y DESPEDIDA**

| Hora | Actividad | Descripción |
|------|-----------|-------------|
| 07:00 | Salida temprana | Hacia Parque Ybycuí (2h) |
| 09:30 | Parque Ybycuí | Cascadas, senderos, naturaleza |
| 12:30 | Almuerzo | Picnic o restaurante local |
| 15:00 | Regreso | Vía Paraguarí (ruinas históricas) |
| 18:00 | Asunción | Tiempo libre, compras últimas |
| 20:00 | Cena despedida | Mbocayaty con vista |

---

#### Prompts para Diferentes Tipos de Viajero

**Familia con Niños:**
```
Crea itinerario de [X] días en Paraguay para familia
con niños de [EDADES].

Priorizar:
- Actividades interactivas
- Tiempos de descanso
- Opciones de comida kid-friendly
- Distancias cortas de traslado
- Alternativas por si llueve
```

**Aventura/Naturaleza:**
```
Diseña itinerario de aventura de [X] días en Paraguay:

Incluir:
- Trekking en [área]
- Observación de fauna
- Actividades al aire libre
- Nivel de dificultad por actividad
- Equipo necesario
```

**Corporativo/Incentivo:**
```
Crea programa de viaje de incentivo de [X] días para
grupo corporativo de [N] personas en Paraguay.

Incluir:
- Actividades de team building
- Cenas de gala
- Opciones de networking
- Tiempo libre estructurado
- Transporte ejecutivo
```

---

### 5.2 Paquetes Turísticos (15 min)

#### Estructura de Paquete

```
🎁 COMPONENTES DEL PAQUETE:

NOMBRE ATRACTIVO
"Paraguay Esencial" / "Ruta Jesuítica" / "Chaco Salvaje"

INCLUYE:
✅ Alojamiento (categoría, noches)
✅ Comidas (cuáles)
✅ Traslados (tipo de vehículo)
✅ Guía (idiomas)
✅ Entradas (a qué)
✅ Actividades (listado)

NO INCLUYE:
❌ Vuelos internacionales
❌ Propinas
❌ Gastos personales
❌ Seguro de viaje

PRECIO:
💰 Por persona en base doble
💰 Suplemento individual
💰 Descuento grupal
```

#### Prompt para Paquete

```
Diseña un paquete turístico llamado "[NOMBRE]" para
Paraguay de [X] noches:

DESTINOS: [listar]
CATEGORÍA: [económico/estándar/premium]
PÚBLICO: [tipo de viajero]

Incluir:
1. Descripción atractiva de 5 líneas
2. Itinerario resumido día por día
3. Lista de "Incluye" (mínimo 8 items)
4. Lista de "No incluye" (5 items)
5. Precio sugerido en USD por persona
6. Suplemento individual
7. Fecha de validez
8. Condiciones de pago y cancelación
```

---

### 5.3 Propuestas para Eventos Corporativos (25 min)

#### Estructura de Propuesta

```
📄 PROPUESTA COMERCIAL:

1. PORTADA
   - Logo del negocio
   - Nombre del evento
   - Cliente
   - Fecha de propuesta

2. INTRODUCCIÓN
   - Saludo
   - Entendimiento de necesidad
   - Por qué somos la mejor opción

3. PROPUESTA DE EVENTO
   - Descripción del espacio
   - Capacidad y disposición
   - Fecha y horario propuesto

4. SERVICIOS INCLUIDOS
   - Venue
   - Catering (menú detallado)
   - Equipamiento
   - Personal
   - Extras

5. INVERSIÓN
   - Desglose de costos
   - Total
   - Forma de pago

6. TÉRMINOS Y CONDICIONES
   - Políticas
   - Garantías

7. CIERRE
   - Llamada a la acción
   - Contacto
```

#### Prompt para Propuesta Corporativa

```
Crea una propuesta comercial para un evento corporativo:

CLIENTE: [Nombre de empresa]
TIPO DE EVENTO: [conferencia/cena de fin de año/team building/lanzamiento]
NÚMERO DE PERSONAS: [cantidad]
FECHA TENTATIVA: [fecha]
PRESUPUESTO APROXIMADO: [si lo conoces]

MI NEGOCIO ES: [hotel/restaurante/salón de eventos]
UBICACIÓN: [dónde]
CAPACIDAD: [máxima]

La propuesta debe incluir:
1. Introducción personalizada
2. Descripción del espacio y ambiente
3. Menú propuesto (3 opciones de menú si es catering)
4. Servicios incluidos detallados
5. Servicios opcionales/adicionales
6. Cotización desglosada en guaraníes
7. Condiciones de pago
8. Validez de la propuesta
9. Cierre con llamada a la acción

Tono: profesional pero cálido
```

#### Ejemplo de Sección de Propuesta

**SERVICIOS INCLUIDOS**

*Para su evento de fin de año con 80 colaboradores:*

| Servicio | Descripción |
|----------|-------------|
| **Venue** | Salón Gran Chaco con vista al jardín, capacidad 100 personas, aire acondicionado |
| **Disposición** | Mesas redondas de 10 personas, decoración navideña incluida |
| **Recepción** | Cocktail de bienvenida (1 hora): 3 canapés calientes, 2 fríos, bebidas |
| **Cena** | Menú de 3 tiempos + café y petit fours |
| **Bebidas** | Open bar (vino, cerveza, refrescos, agua) durante la cena |
| **Música** | Sistema de sonido profesional, 2 micrófonos inalámbricos |
| **Personal** | 8 mozos, 1 capitán de salón, 1 coordinador de evento |
| **Estacionamiento** | Gratuito para todos los invitados (vigilado) |

**INVERSIÓN TOTAL: Gs. 15.500.000**
*(Equivalente a Gs. 193.750 por persona)*

---

### 5.4 Planificación de Bodas y Celebraciones (15 min)

#### Prompt para Propuesta de Boda

```
Crea una propuesta para boda en [MI VENUE/HOTEL]:

PAREJA: [nombres]
FECHA: [fecha]
NÚMERO DE INVITADOS: [cantidad]
ESTILO: [elegante/rústico/moderno/paraguayo tradicional]
PRESUPUESTO INDICATIVO: [si lo conoces]

Incluir:
1. Carta de presentación emotiva
2. Descripción del venue para bodas
3. Paquete de boda propuesto:
   - Ceremonia (si aplica)
   - Recepción
   - Menú (adultos y niños)
   - Bebidas
   - Decoración base
   - Música/DJ
   - Suite nupcial (si es hotel)
4. Servicios adicionales con precio
   - Torta
   - Fotografía
   - Video
   - Decoración premium
5. Cotización total y por invitado
6. Plan de pagos
7. Cierre romántico
```

#### Servicios de Boda Típicos

```
PAQUETE BASE:
✅ Venue por 6 horas
✅ Mobiliario (mesas, sillas, mantelería)
✅ Decoración básica
✅ Menú de recepción (canapés)
✅ Menú de cena (3 tiempos)
✅ Bebidas (open bar limitado)
✅ Torta de 3 pisos
✅ DJ 4 horas
✅ Coordinador día del evento
✅ Suite nupcial (check-out tardío)

ADICIONALES POPULARES:
💐 Decoración floral premium
📸 Paquete foto + video
🎤 Banda en vivo
🎁 Candy bar
🚗 Transporte de invitados
💆 Spa pre-boda para novia
```

---

### 5.5 Presupuestos y Cotizaciones (10 min)

#### Prompt para Cotización Rápida

```
Genera una cotización para:

SERVICIO: [describir]
CLIENTE: [nombre si lo tienes]
CANTIDAD: [personas/unidades]
FECHA: [fecha del servicio]

Mi negocio: [tipo y nombre]
Mis precios aproximados: [si los conoces]

Formato:
1. Encabezado con datos
2. Tabla de servicios y precios
3. Subtotal
4. IVA (10%)
5. Total en guaraníes
6. Validez de la cotización
7. Forma de pago
8. Nota de agradecimiento
```

#### Template de Cotización

```
═══════════════════════════════════════════════════════
           [LOGO/NOMBRE DEL NEGOCIO]
           COTIZACIÓN #[NÚMERO]
═══════════════════════════════════════════════════════

Cliente: _________________________
Fecha: __________________________
Validez: 15 días

───────────────────────────────────────────────────────
CONCEPTO                    CANT.    P.UNIT.    TOTAL
───────────────────────────────────────────────────────
[Servicio 1]                 X       XXX.XXX    XXX.XXX
[Servicio 2]                 X       XXX.XXX    XXX.XXX
[Servicio 3]                 X       XXX.XXX    XXX.XXX
───────────────────────────────────────────────────────
                              SUBTOTAL:     X.XXX.XXX
                              IVA 10%:        XXX.XXX
───────────────────────────────────────────────────────
                              TOTAL Gs.:  X.XXX.XXX
═══════════════════════════════════════════════════════

FORMA DE PAGO:
• 50% al confirmar
• 50% al finalizar el servicio

INCLUYE: [listar]
NO INCLUYE: [listar]

Gracias por considerarnos. Quedamos a su disposición.

[Nombre] | [Teléfono] | [Email]
```

---

## Actividad Práctica

### Crear Propuesta Completa

**Instrucciones:**

Elige UNO de los siguientes escenarios y desarrolla una propuesta completa:

**OPCIÓN A: Itinerario**
- 3 días en Paraguay para pareja brasileña
- Interés: cultura y gastronomía
- Presupuesto: medio

**OPCIÓN B: Evento Corporativo**
- Cena de fin de año para 60 personas
- Empresa de tecnología
- Hotel/restaurante en Asunción

**OPCIÓN C: Celebración**
- Cumpleaños de 15 años para 100 personas
- Estilo moderno
- Venue en Asunción

---

## Recursos del Módulo

### Templates

- Template de itinerario en Word
- Template de propuesta comercial
- Template de cotización

### Prompts Adicionales

Ver: [prompts/planificacion/](../../prompts/)

---

## Puntos Clave

1. **Personalización:** Cada propuesta debe sentirse hecha a medida
2. **Detalles importan:** Incluir todo lo que está y no está incluido
3. **Presentación visual:** Usar tablas, formato limpio
4. **Precios claros:** Desglosar para generar confianza
5. **Llamada a la acción:** Siempre terminar con próximo paso claro
6. **Verificar datos:** La IA puede inventar precios o lugares inexistentes

---

*Siguiente módulo: Proyecto Integrador*
