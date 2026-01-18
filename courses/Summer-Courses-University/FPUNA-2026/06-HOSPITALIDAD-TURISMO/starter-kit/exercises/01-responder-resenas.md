# Ejercicio 1: Responder Reseñas de Huéspedes con IA

## Objetivo
Aprender a usar IA para responder profesionalmente a reseñas en plataformas de reservas.

## Duración
40-50 minutos

## Prerrequisitos
- Conocimiento básico de atención al cliente
- Acceso a ejemplos de reseñas (propias o de referencia)
- Acceso a Claude

## Advertencia Importante

**Las respuestas a reseñas representan tu marca.**

Antes de publicar:
- Verifica que los hechos sean correctos
- Asegúrate de no admitir responsabilidad legal incorrecta
- Mantén el tono de tu establecimiento
- No publiques datos personales del huésped

---

## Parte 1: El Problema de las Respuestas Genéricas (10 minutos)

### Ejemplos de malas respuestas

**Reseña negativa:**
> "La habitación estaba sucia, el aire acondicionado no funcionaba y nadie respondía en recepción. Pésima experiencia." - María G., 2 estrellas

**Respuesta genérica (MALA):**
> "Gracias por su comentario. Lamentamos que su experiencia no haya sido satisfactoria. Esperamos verle pronto."

### ¿Por qué es mala?

- [ ] No reconoce problemas específicos
- [ ] No ofrece solución
- [ ] No muestra empatía genuina
- [ ] Parece automatizada
- [ ] No da confianza a futuros huéspedes

---

## Parte 2: Responder con Contexto (15 minutos)

### Prompt para respuesta profesional

```
Necesito responder a esta reseña negativa en Booking.com:

**Reseña:**
"La habitación estaba sucia, el aire acondicionado no funcionaba
y nadie respondía en recepción. Pésima experiencia."
- María G., 2 estrellas, enero 2026

**Información de contexto:**
- Nombre del hotel: Hotel Guaraní
- Ubicación: Asunción, Paraguay
- Tipo: Hotel 3 estrellas, negocios y turismo
- Nombre del gerente: Carlos Benítez
- ¿Sabemos qué pasó?: El AA se reparó al día siguiente,
  era recepcionista nuevo

**Requisitos de la respuesta:**
1. Máximo 150 palabras
2. Tono: profesional, empático, no defensivo
3. Reconocer cada problema mencionado
4. Explicar brevemente qué pasó (sin excusas)
5. Indicar acción correctiva tomada
6. Invitar a una segunda oportunidad
7. Ofrecer contacto directo
8. Firmar con nombre del gerente

**NO hacer:**
- No pedir disculpas excesivas (suena insincero)
- No culpar al huésped
- No prometer lo que no puedes cumplir
- No revelar detalles personales del huésped
```

### Compara la respuesta

| Aspecto | Respuesta genérica | Respuesta con IA |
|---------|-------------------|------------------|
| Reconoce problemas específicos | | |
| Muestra empatía | | |
| Explica acciones tomadas | | |
| Ofrece solución | | |
| Invita a volver | | |
| Profesionalismo | | |

---

## Parte 3: Diferentes Tipos de Reseñas (15 minutos)

### Genera respuestas para cada caso

```
Genera respuestas para estas reseñas del Hotel Guaraní.

**Caso 1: Reseña positiva (5 estrellas)**
"Excelente ubicación, personal muy amable, especialmente
Juana en recepción. Desayuno paraguayo delicioso.
Volveré en mi próximo viaje a Asunción."
- Roberto S.

Respuesta: Agradecer, mencionar al personal por nombre,
invitar a volver, máximo 80 palabras.

---

**Caso 2: Reseña mixta (3 estrellas)**
"La habitación estaba bien y buena ubicación, pero el
WiFi era muy lento y el desayuno podría mejorar.
Precio justo para lo que ofrece."
- Laura M.

Respuesta: Agradecer lo positivo, abordar las críticas
constructivas, mencionar mejoras en proceso, 100 palabras.

---

**Caso 3: Reseña negativa injusta (1 estrella)**
"Horrible. Me cobraron por minibar que no usé.
Nunca más vuelvo."
- Anónimo

Contexto: El sistema registró consumo, pero puede
ser error. No tenemos forma de contactar al huésped.

Respuesta: Profesional, ofrecer investigar,
solicitar contacto para resolver, 100 palabras.

---

**Caso 4: Reseña con problema de salud/seguridad**
"Encontré cucarachas en la habitación. Inaceptable
para un hotel que cobra 80 dólares la noche."
- Ana R.

Contexto: Se fumigó inmediatamente, fue un incidente
aislado después de lluvias fuertes.

Respuesta: Tomar MUY en serio, explicar acciones
inmediatas, ofrecer compensación futura, 120 palabras.
```

### Evalúa las respuestas

| Caso | Tono correcto | Aborda el problema | Usaría tal cual |
|------|---------------|-------------------|-----------------|
| 1 (positiva) | | | |
| 2 (mixta) | | | |
| 3 (injusta) | | | |
| 4 (seria) | | | |

---

## Parte 4: Respuestas para WhatsApp (10 minutos)

### Comunicación directa con huéspedes

```
Genera respuestas de WhatsApp para estas situaciones:

**Situación 1: Consulta de reserva**
"Hola, ¿tienen disponibilidad para 2 noches, viernes y sábado?
Somos pareja, queremos habitación con vista."

Hotel Guaraní: Sí hay disponibilidad.
Precio: Gs. 450.000/noche
Habitación con vista: +Gs. 50.000

Respuesta: Confirmar, dar precios, pedir datos para reserva.

---

**Situación 2: Queja durante estadía**
"El aire del cuarto 305 no enfría bien.
Ya son las 11pm y no puedo dormir."

Respuesta: Urgente, empática, ofrecer solución
inmediata (cambio de habitación o técnico ahora).

---

**Situación 3: Solicitud especial**
"Llegamos mañana. Es cumpleaños de mi esposa.
¿Pueden decorar la habitación?"

Respuesta: Confirmar si es posible, preguntar
preferencias, indicar costo adicional si hay.

---

**Situación 4: Post-estadía positiva**
"Ya llegamos a casa. Todo estuvo perfecto,
gracias por todo el equipo."

Respuesta: Agradecer, pedir reseña, invitar a volver.
```

---

## Template para Responder Reseñas

```
## Respuesta a Reseña

**Plataforma:** [Booking/TripAdvisor/Google/Airbnb]
**Calificación:** [1-5 estrellas]
**Tipo:** [Positiva/Mixta/Negativa/Seria]

**Reseña original:**
"[Texto de la reseña]"
- [Nombre], [fecha]

**Contexto interno:**
- ¿Qué pasó realmente?: ___
- ¿Se resolvió?: ___
- ¿Hay registro del incidente?: ___
- ¿Huésped contactable?: ___

**Requisitos:**
- Largo: ___ palabras máximo
- Tono: [empático/profesional/cálido]
- Firma: [nombre del gerente]

**Puntos a cubrir:**
1. [ ] Agradecer el feedback
2. [ ] Reconocer problemas específicos
3. [ ] Explicar acciones (sin excusas)
4. [ ] Ofrecer solución/compensación
5. [ ] Invitar a segunda oportunidad

**NO incluir:**
- Datos personales del huésped
- Admisiones de responsabilidad legal
- Promesas que no podemos cumplir
```

---

## Mejores Prácticas por Plataforma

### Booking.com
- Máximo 500 caracteres recomendado
- Responder en 24-48 horas
- Tono profesional pero cálido
- Mención del nombre del huésped

### TripAdvisor
- Más espacio (hasta 4000 caracteres)
- Los viajeros leen respuestas antes de reservar
- Demostrar que el gerente responde personalmente
- Usar frases que ayuden a futuros huéspedes

### Google
- Respuestas públicas y muy visibles
- Afecta tu posicionamiento local
- Breve y profesional
- Incluir nombre del negocio (ayuda SEO)

### Airbnb
- Más personal y directo
- La comunidad valora autenticidad
- Menos formal que hoteles tradicionales

---

## Errores Comunes a Evitar

### La IA puede generar:

- [ ] **Respuestas demasiado largas** - Ajustar a límites de plataforma
- [ ] **Tono corporativo frío** - Humanizar antes de publicar
- [ ] **Exceso de disculpas** - Suena insincero
- [ ] **Promesas irreales** - "Nunca más pasará" (imposible garantizar)
- [ ] **Detalles incorrectos** - Verificar hechos antes de publicar

### Siempre verificar:

1. ¿Los hechos que menciono son correctos?
2. ¿El tono representa mi marca?
3. ¿Estoy exponiendo información sensible?
4. ¿Un futuro huésped confiaría tras leer esto?
5. ¿Cumplí con políticas de la plataforma?

---

## Entregable

### Portfolio de Respuestas

```markdown
# Respuestas a Reseñas - [Tu Hotel/Restaurante]

## Caso 1: Reseña Positiva
**Original:** [reseña]
**Mi respuesta:** [respuesta adaptada]
**Plataforma:** [donde publicar]

## Caso 2: Reseña Negativa
**Original:** [reseña]
**Contexto:** [qué pasó realmente]
**Mi respuesta:** [respuesta adaptada]
**Acción tomada:** [qué hicimos internamente]

## Caso 3: Reseña Mixta
[Similar estructura]

## Caso 4: WhatsApp de Queja
**Mensaje:** [mensaje del huésped]
**Respuesta:** [nuestra respuesta]
**Seguimiento:** [acciones posteriores]

## Templates Guardados
[3 templates para casos frecuentes]
```

---

## Criterios de Éxito

- [ ] Entendiste por qué las respuestas genéricas son malas
- [ ] Generaste respuestas para diferentes tipos de reseñas
- [ ] Adaptaste respuestas para WhatsApp
- [ ] Creaste templates reutilizables
- [ ] Verificaste antes de "publicar"
- [ ] Mantuviste tono profesional pero humano

---

## Próximo Paso

Aplica esto a tu operación:
1. Revisa reseñas pendientes de respuesta
2. Clasifica por tipo (positiva/mixta/negativa)
3. Genera borradores con IA
4. Personaliza y verifica cada uno
5. Publica y monitorea respuestas

---

*Ejercicio 1 - Hospitalidad y Turismo - FPUNA 2026*
