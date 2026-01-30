# 📱 Módulo 03: Atención al Cliente Automatizada en 30 Minutos

## 🎯 Resultado Final
Al terminar este módulo tendrás: **Un sistema completo de atención al cliente automatizado para WhatsApp** (chatbot con flujos, respuestas FAQ, manejo de quejas, upselling, y seguimiento)

**Tiempo total:** 30 minutos  
**Herramienta:** OpenCode  
**Conocimiento previo:** Ninguno

---

## Prompt 1: Flujo de Chatbot WhatsApp en 10 Minutos ⏱️

**¿Cuándo usar?** Necesitas automatizar la atención inicial por WhatsApp para tu negocio.

### 📝 Prompt (Copiar y Pegar):
```
Actúa como especialista en chatbots y experiencia de cliente. Voy a darte información de un negocio paraguayo y necesito que diseñes un flujo de chatbot completo para WhatsApp.

INFORMACIÓN DEL NEGOCIO:
- Nombre: [NOMBRE]
- Tipo: [TIPO_NEGOCIO]
- Ubicación: [CIUDAD]
- Horario: [HORARIO]
- WhatsApp: [NÚMERO]
- Productos/Servicios: [LISTA]
- Precios aproximados: [RANGO]

DISEÑA EL FLUJO COMPLETO:

1. Mensaje de bienvenida (automático):
   - Saludo inicial con nombre del negocio
   - Horario de atención
   - Opciones del menú principal (numeradas 1-5)

2. Flujo principal - Menú:
   Opción 1: [Título] → Submenú/flujo
   Opción 2: [Título] → Submenú/flujo
   Opción 3: [Título] → Submenú/flujo
   Opción 4: [Título] → Submenú/flujo
   Opción 5: [Título] → Submenú/flujo
   Opción 0: Hablar con humano

3. Para cada opción, define:
   - Mensaje que envía el bot
   - Preguntas de validación (si aplica)
   - Respuestas esperadas del cliente
   - Siguiente paso/acción
   - Si necesita transferir a humano

4. Palabras clave que activan flujos:
   - Lista de 10+ palabras/frases comunes
   - Flujo asociado a cada una

5. Mensajes de error/fuera de contexto:
   - Cuando no entiende
   - Cuando pide hablar con persona
   - Cuando es fuera de horario

CONTEXTO PARAGUAY:
- Usar "vos" en lugar de "tú"
- Incluir "chipa", "tereré" si aplica
- Horario paraguayo: considerar siesta (12-14h atención limitada)
- Mencionar medios de pago: Tigo Money, Bancard, transferencia
- Incluir ubicación exacta con referencias locales ("cerca de...")
```

### 🔄 Variables a Personalizar:
- `[NOMBRE]` → Ej: "Hotel Los Lapachos"
- `[TIPO_NEGOCIO]` → Ej: "Hotel boutique"
- `[CIUDAD]` → Ej: "Encarnación, Itapúa"
- `[HORARIO]` → Ej: "Lun-Dom 7:00-22:00"
- `[NÚMERO]` → Ej: "+595 971 123 456"
- `[LISTA]` → Ej: "Habitaciones, tours, restaurante"
- `[RANGO]` → Ej: "₲250.000-600.000 por noche"

### ✅ Resultado Esperado:
Flujo de chatbot completo con mensajes listos para implementar.

### 🇵🇾 Ejemplo Paraguay:
**Input:** Hotel Los Lapachos en Encarnación

**Output:** Flujo completo con menú, opciones de reserva, tours a Misiones, servicios, ubicación, y palabras clave automáticas.

---

## Prompt 2: Respuestas Rápidas FAQ en 5 Minutos ⏱️

**¿Cuándo usar?** Para tener respuestas listas a las preguntas más frecuentes.

### 📝 Prompt (Copiar y Pegar):
```
Para este negocio:
- Nombre: [NOMBRE]
- Tipo: [TIPO]
- Ubicación: [CIUDAD]
- Servicios: [LISTA]
- Precios: [RANGO]
- Políticas: [POLÍTICAS_CLAVE]

Crea respuestas rápidas para las 15 preguntas más frecuentes por WhatsApp.

PARA CADA PREGUNTA:
1. Variante corta (para responder rápido)
2. Variante completa (con detalles)
3. Emoji sugerido

PREGUNTAS A COVER:
1. ¿Cuánto cuesta? / Precios
2. ¿Tienen disponibilidad para [fecha]?
3. ¿Cómo puedo reservar?
4. ¿Dónde están ubicados?
5. ¿Qué incluye el desayuno/servicio?
6. ¿Aceptan mascotas?
7. ¿Tienen estacionamiento?
8. ¿Cómo puedo pagar?
9. ¿Hay WiFi?
10. ¿A qué hora es el check-in/out?
11. ¿Tienen opciones vegetarianas/veganas?
12. ¿Hay cancelación gratuita?
13. ¿Hacen factura?
14. ¿Tienen acceso para personas con movilidad reducida?
15. ¿Puedo pedir delivery/takeaway?

REGLAS:
- Máximo 3 emojis por respuesta
- Precios en Guaraníes
- Mencionar Tigo Money/Bancard como opciones de pago
- Mantener tono cálido y paraguayo
```

### ✅ Resultado Esperado:
15 respuestas rápidas listas para usar en WhatsApp Business API.

### 🇵🇾 Ejemplo Paraguay:
**¿Cuánto cuesta?**
Corta: "Habitaciones desde ₲320.000/noche con desayuno incluido 💚"
Completa: "Tenemos opciones desde ₲320.000 hasta ₲550.000. Todas incluyen desayuno paraguayo, WiFi, y estacionamiento. ¿Qué fecha necesitás? 📅"

**¿Cómo pago?**
Corta: "Transferencia, Tigo Money, tarjeta vía Bancard, o efectivo 💳"
Completa: "Tenés varias opciones: transferencia bancaria, Tigo Money al +595 981 234 567, tarjeta de crédito con link seguro, o efectivo al llegar. ¿Cómo preferís? 💚"

---

## Prompt 3: Manejo de Quejas en 5 Minutos ⏱️

**¿Cuándo usar?** Para tener scripts listos cuando llegan reclamos o críticas.

### 📝 Prompt (Copiar y Pegar):
```
Para este negocio:
- Nombre: [NOMBRE]
- Tipo: [TIPO]
- Responsable: [NOMBRE_ENCARGADO]
- Nivel de decisión del bot: [qué puede ofrecer solo]

Crea scripts para manejar las 8 quejas más comunes por WhatsApp.

PARA CADA QUEJA:
1. Reconocimiento inmediato (empatía)
2. Disculpa específica
3. Explicación breve (si aplica)
4. Solución ofrecida
5. Compensación (si aplica)
6. Escalamiento a humano (si es necesario)

QUEJAS A COVER:
1. "El servicio fue lento"
2. "La habitación no estaba limpia"
3. "El precio es muy caro/injusto"
4. "La comida no estuvo buena"
5. "Tuvimos un problema con la reserva"
6. "El WiFi no funcionaba"
7. "Hay ruido y no podemos dormir"
8. "Quiero un reembolso total"

REGLAS:
- NUNCA discutir con el cliente
- Siempre ofrecer solución CONCRETA
- Si no se puede resolver por chat, ofrecer llamada URGENTE
- Dar nombre de persona real para escalamiento
- Compensaciones realistas para PY (descuentos 10-30%, upgrades)
```

### ✅ Resultado Esperado:
8 scripts de manejo de quejas listos para usar.

### 🇵🇾 Ejemplo Paraguay:
**"El precio es caro"**
Bot: "Entendemos tu punto de vista 💚 Sabemos que hay opciones más económicas. Nuestro precio incluye ubicación única, desayuno artesanal, traslado a Misiones, WiFi premium. Aún así, te ofrecemos: tour privado gratis (valor ₲120.000), o 25% descuento próxima estadía, o upgrade a suite sin cargo. ¿Alguna opción te parece justa? 💚"

---

## Prompt 4: Upselling y Cross-Selling en 5 Minutos ⏱️

**¿Cuándo usar?** Para aumentar el ticket promedio sugiriendo servicios adicionales.

### 📝 Prompt (Copiar y Pegar):
```
Para este negocio:
- Nombre: [NOMBRE]
- Servicios base: [LISTA_BASE]
- Servicios adicionales: [LISTA_ADICIONALES]
- Precios base: [RANGOS]
- Precios adicionales: [RANGOS]

Crea scripts de upselling y cross-selling para 5 momentos clave del customer journey.

MOMENTOS:
1. Al confirmar reserva (servicios add-on)
2. 48 horas antes del check-in (preparar llegada)
3. Durante la estadía (experiencias)
4. 24 horas antes del checkout (extender estadía)
5. Post-checkout (próxima visita + referidos)

PARA CADA MOMENTO:
- Timing exacto (cuándo enviar)
- Mensaje inicial (no agresivo, valioso)
- Oferta principal (upsell)
- Oferta secundaria (cross-sell)
- CTA claro
- Precio y valor mostrado

REGLAS:
- No ser "pushy" - enfoque en valor, no venta
- Mostrar ahorro si compra ahora vs después
- Usar escasez real (cupos limitados)
- Paraguay context: mencionar pago en cuotas si es caro
```

### ✅ Resultado Esperado:
5 scripts de upselling listos para programar en el CRM.

### 🇵🇾 Ejemplo Paraguay:
**Al confirmar reserva:**
Bot: "¡Tu reserva está confirmada! 💚🇵🇾 ¿Te gustaría agregar experiencias especiales? UPGRADE SUITE: jacuzzi privado + vino espumante, solo ₲150.000 más (20% OFF si reservás ahora). CENA ROMÁNTICA: menú 4 tiempos con vista a Misiones, ₲180.000 (solo 4 mesas/noche). ¿Te interesa? Respondé SUITE o CENA 💚"

---

## Prompt 5: Mensajes de Seguimiento en 5 Minutos ⏱️

**¿Cuándo usar?** Para mantener contacto con leads y clientes después de la primera interacción.

### 📝 Prompt (Copiar y Pegar):
```
Para este negocio:
- Nombre: [NOMBRE]
- Producto: [PRODUCTO]
- Ciclo de venta típico: [DÍAS]

Crea 7 mensajes de seguimiento automatizados para el funnel de ventas.

SECUENCIA DE SEGUIMIENTO:
1. Mensaje 1: 4 horas después de consulta sin reserva
2. Mensaje 2: 24 horas después sin respuesta
3. Mensaje 3: 7 días después sin reserva
4. Mensaje 4: Inmediatamente después de confirmar reserva (pendiente pago)
5. Mensaje 5: 36 horas después si no pagó
6. Mensaje 6: 48 horas antes del check-in (pre-arrival)
7. Mensaje 7: 3 días después del checkout

PARA CADA MENSAJE INCLUIR:
- Asunto/objetivo claro
- Personalización (nombre si se tiene)
- Valor agregado (no solo "¿decidiste?")
- CTA específico
- Elemento de escasez o urgencia suave

REGLAS PARAGUAY:
- Timing: No enviar domingos antes de 10am (iglesia)
- Incluir "chipa", "tereré" en mensajes cálidos
- Recordar pago en cuotas si es posible
```

### ✅ Resultado Esperado:
7 mensajes de seguimiento listos para programar.

### 🇵🇾 Ejemplo Paraguay:
**4 horas después de consulta:**
Bot: "¡Hola [Nombre]! 💚 Vimos que consultaste sobre disponibilidad. ¿Te quedó alguna duda? Estamos para ayudarte con alternativas de fechas, formas de pago, o info sobre tours. 🎁 Si reservás HOY antes de las 20:00: 10% de descuento (código: HOY10). ¿Te gustaría que reservemos la habitación? 👇"

---

## 🎓 Ejercicio Práctico: Házlo Ahora (30 minutos)

### Tu Misión:
1. **Elige un hotel o restaurante real o ficticio de Paraguay** (ej: hotel en Asunción, restaurante en Ciudad del Este, spa en Areguá)

2. **Abre OpenCode** (Ctrl+J o Cmd+J)

3. **Usa los 5 prompts en orden:**
   - Prompt 1: Flujo chatbot (10 min)
   - Prompt 2: Respuestas FAQ (5 min)
   - Prompt 3: Manejo de quejas (5 min)
   - Prompt 4: Upselling (5 min)
   - Prompt 5: Mensajes de seguimiento (5 min)

4. **Guarda todo en un archivo** o Google Docs

### Ejemplo de Empresa para Practicar:
**"Hotel Lago Ypacaraí"** (hotel ficticio)

- Tipo: Hotel resort frente al lago
- Ubicación: Areguá, Cordillera
- Servicios: Habitaciones, spa, restaurante, actividades acuáticas
- Precio: ₲250.000-500.000 por noche
- Cliente: Familias de Asunción, parejas de fin de semana

**Resultado esperado:** Sistema completo de atención al cliente con chatbot, 15 respuestas FAQ, 8 scripts de manejo de quejas, 5 estrategias de upselling, y 7 mensajes de seguimiento automatizados.

---

## ✅ Checklist de Finalización

Después de este módulo deberías tener:
- [ ] Flujo de chatbot completo (mensaje de bienvenida + 5 opciones de menú)
- [ ] 15 respuestas rápidas FAQ listas para usar
- [ ] 8 scripts de manejo de quejas con compensaciones
- [ ] 5 scripts de upselling/cross-selling
- [ ] 7 mensajes de seguimiento automatizados

**Total: ~3,500 palabras de contenido de atención al cliente generado en 30 minutos**

---

## 💡 Próximos Pasos

Con este sistema puedes:
1. Implementar el chatbot en ManyChat, WATI, o cualquier plataforma
2. Configurar respuestas rápidas en WhatsApp Business
3. Entrenar al equipo de atención con los scripts
4. Cobrar ₲500.000-1.500.000 por configurar este sistema a PYMEs

**Siguiente módulo:** Turismo - Paquetes y Experiencias en 40 minutos.

---

*Módulo 03 - Marketing con OpenCode | FPUNA 2026 | AI Whisperers*
