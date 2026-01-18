# 🏨 Starter Kit: IA para Hospitalidad y Turismo

## Bienvenido/a

Este kit te enseña a usar IA para el sector hotelero y turístico: responder reseñas, crear paquetes turísticos, analizar tarifas y ocupación - todo adaptado al mercado paraguayo.

---

## 🚀 Quick Start (10 minutos)

### Paso 1: Verificá requisitos
Abrí [PREREQUISITES.md](./PREREQUISITES.md) - necesitás conocer tu establecimiento y mercado.

### Paso 2: Advertencias importantes
Leé [SAFETY-WARNINGS.md](./SAFETY-WARNINGS.md) - precios y datos incorrectos pueden dañar tu negocio.

### Paso 3: Tu primera respuesta a reseña
Andá a [exercises/01-responder-resenas.md](./exercises/01-responder-resenas.md).

---

## 📁 Contenido del Kit

### 📋 Documentos Base
| Archivo | Descripción | Prioridad |
|---------|-------------|-----------|
| [PREREQUISITES.md](./PREREQUISITES.md) | Requisitos y preparación | ⭐⭐⭐ Leer primero |
| [SAFETY-WARNINGS.md](./SAFETY-WARNINGS.md) | Evitar errores costosos | ⭐⭐⭐ Importante |
| [VERIFICATION-CHECKLIST.md](./VERIFICATION-CHECKLIST.md) | Checklist de verificación | ⭐⭐ Usar siempre |
| [COMMON-MISTAKES.md](./COMMON-MISTAKES.md) | 12 errores comunes | ⭐⭐ Referencia |
| [20-IDEAS.md](./20-IDEAS.md) | 20 proyectos de práctica | ⭐ Inspiración |
| [CLAUDE.md](./CLAUDE.md) | Template para tu negocio | ⭐ Para proyectos |

### 📝 Ejercicios Prácticos
| Ejercicio | Tema | Duración | Dificultad |
|-----------|------|----------|------------|
| [01-responder-resenas.md](./exercises/01-responder-resenas.md) | Respuestas a reseñas | 60 min | 🟢 Principiante |
| [02-crear-paquetes-turisticos.md](./exercises/02-crear-paquetes-turisticos.md) | Diseñar paquetes | 90 min | 🟡 Intermedio |
| [03-analisis-tarifas-ocupacion.md](./exercises/03-analisis-tarifas-ocupacion.md) | Revenue management | 90 min | 🟡 Intermedio |

### 📚 Ejemplos Completados
| Ejemplo | Qué muestra |
|---------|-------------|
| [ejemplo-respuestas-resenas.md](./examples/ejemplo-respuestas-resenas.md) | Portfolio de respuestas (positivas, negativas, mixtas) |
| [ejemplo-paquete-encarnacion.md](./examples/ejemplo-paquete-encarnacion.md) | Paquete "Huellas Jesuíticas" completo |

---

## 🎓 Ruta de Aprendizaje

```
Sesión 1: Comunicación con Huéspedes (2 horas)
├── 📖 PREREQUISITES.md + SAFETY-WARNINGS.md
├── ✏️ Ejercicio 01: Responder reseñas
└── 📖 Revisar ejemplo de respuestas

Sesión 2: Diseño de Productos (3 horas)
├── ✏️ Ejercicio 02: Crear paquetes
├── 📖 Revisar ejemplo de Encarnación
└── 🔍 VERIFICATION-CHECKLIST.md (precios)

Sesión 3: Revenue Management (3 horas)
├── ✏️ Ejercicio 03: Análisis de tarifas
├── 📖 COMMON-MISTAKES.md
└── 🎯 Aplicar a tu establecimiento
```

---

## 💡 Prompts Efectivos para Hospitalidad

### Para Responder Reseñas
```
Genera una respuesta profesional para esta reseña de [PLATAFORMA]:

Reseña: "[TEXTO DE LA RESEÑA]"
Calificación: [X] estrellas
Contexto del huésped: [si lo conocemos]

Requisitos:
- Reconocer específicamente lo que menciona
- Tono cálido pero profesional
- Si es negativa: reconocer, no excusar, ofrecer solución
- Máximo 100 palabras
- Firma: [NOMBRE], [CARGO] - [HOTEL]
```

### Para Crear Paquetes Turísticos
```
Ayudame a diseñar un paquete turístico:

Destino: [CIUDAD/REGIÓN de Paraguay]
Duración: [X] días / [X] noches
Público: [tipo de turista]
Presupuesto objetivo: [rango en USD o ₲]

Necesito:
1. Nombre creativo del paquete
2. Itinerario día por día con horarios
3. Lista de incluye/no incluye
4. Desglose de costos estimados
5. Versión corta para marketing

Todos los precios en guaraníes (₲).
Indica qué precios debo VERIFICAR con proveedores.
```

### Para Análisis de Revenue
```
Analiza estos datos de ocupación y tarifas:

[TABLA DE DATOS]

Ayudame a:
1. Calcular ADR, RevPAR y ocupación
2. Identificar patrones por día/temporada
3. Sugerir ajustes de tarifa
4. Comparar con benchmarks del mercado

Contexto:
- Tipo de hotel: [categoría, ubicación]
- Temporada actual: [alta/media/baja]
- Competencia directa: [si conocemos tarifas]
```

---

## 📊 Métricas Clave de Hotelería

### Definiciones
| Métrica | Fórmula | Qué indica |
|---------|---------|------------|
| **Ocupación** | Habitaciones ocupadas / Disponibles | % de capacidad usada |
| **ADR** | Ingresos habitaciones / Habitaciones vendidas | Tarifa promedio real |
| **RevPAR** | ADR × Ocupación | Rendimiento por habitación |
| **GOPPAR** | GOP / Habitaciones disponibles | Rentabilidad operativa |

### Ejemplo de Cálculo
```
Hotel: 30 habitaciones
Mes: 25 habitaciones vendidas promedio/día
Ingresos: ₲75,000,000 en el mes

Ocupación = 25/30 = 83.3%
ADR = ₲75,000,000 / (25 × 30 días) = ₲100,000
RevPAR = ₲100,000 × 0.833 = ₲83,300
```

---

## 🇵🇾 Calendario Turístico Paraguay 2026

| Período | Evento | Impacto en turismo |
|---------|--------|-------------------|
| Enero-Feb | Verano + Carnaval | Alta demanda playas/Encarnación |
| Marzo | Trans-Chaco Rally | Demanda en ruta Chaco |
| Semana Santa | Feriado largo | Circuitos religiosos |
| Mayo | Independencia | Turismo interno |
| Julio | Vacaciones invierno | Familias |
| Agosto | Turismo de naturaleza | Chaco, Pantanal |
| Sept-Nov | Primavera | Temporada media |
| Diciembre | Fiestas | Alta demanda |

### Destinos Principales
- **Asunción**: Negocios, cultura
- **Encarnación**: Playas, Carnaval, Misiones
- **Ciudad del Este**: Compras, Itaipú
- **Chaco**: Naturaleza, aventura
- **San Bernardino**: Fin de semana, verano

---

## ✅ Checklist de Verificación

### Para Paquetes Turísticos
- [ ] ¿Verifiqué precios con cada proveedor?
- [ ] ¿Los horarios de atractivos son correctos?
- [ ] ¿Hay disponibilidad en las fechas?
- [ ] ¿Incluí margen de ganancia?
- [ ] ¿Consideré imprevistos (5-10%)?

### Para Respuestas a Reseñas
- [ ] ¿Es personalizada, no genérica?
- [ ] ¿Respondo a lo específico que menciona?
- [ ] ¿El tono es apropiado?
- [ ] ¿Ofrezco solución si es negativa?
- [ ] ¿Incluyo contacto directo?

### Para Precios/Tarifas
- [ ] ¿Los números son actuales?
- [ ] ¿Están en guaraníes?
- [ ] ¿Incluí impuestos o aclaré que no?
- [ ] ¿Son competitivos con el mercado?

---

## ⚠️ Errores Comunes a Evitar

| Error | Consecuencia | Cómo evitar |
|-------|--------------|-------------|
| Precios incorrectos | Pérdida de dinero o clientes | Verificar SIEMPRE |
| Horarios desactualizados | Turistas molestos | Confirmar antes de publicar |
| Respuestas genéricas | Daña imagen de marca | Personalizar cada respuesta |
| Promesas imposibles | Quejas y reembolsos | Solo confirmar lo seguro |
| Ignorar temporadas | Overbooking o vacío | Planificar con calendario |

---

## 🔧 Herramientas Recomendadas

### Gestión de Reseñas
- **Booking Extranet** - Gestionar reseñas Booking
- **TripAdvisor for Business** - Responder en TA
- **Google Business** - Reseñas de Google

### Revenue Management
- **Excel/Sheets** - Análisis básico
- **STR** - Benchmarking (grandes hoteles)
- **RoomRaccoon, Cloudbeds** - PMS con revenue

### Diseño de Paquetes
- **Canva** - Flyers y presentaciones
- **Google Maps** - Planificar rutas
- **WhatsApp Business** - Comunicación con clientes

---

## 📞 Contactos Útiles (Paraguay)

| Organismo | Para qué |
|-----------|----------|
| **SENATUR** | Registro, habilitaciones |
| **CAPATUR** | Gremio de turismo |
| **Municipalidades** | Eventos locales, permisos |
| **DINAC** | Turismo de aventura/aéreo |

---

## ❓ FAQ

**¿Puedo usar precios que genera la IA?**
NUNCA sin verificar. Los precios cambian constantemente.

**¿Cómo respondo a una reseña muy negativa?**
Con calma, reconociendo el problema, ofreciendo solución, y contacto directo. Nunca a la defensiva.

**¿Es ético usar IA para responder reseñas?**
Sí, siempre que personalices y la respuesta sea genuina.

**¿Cada cuánto debo actualizar precios de paquetes?**
Mínimo cada temporada, idealmente mensualmente.

---

## 🔗 Recursos

- [SENATUR](https://www.senatur.gov.py) - Turismo oficial
- [Visit Paraguay](https://www.visitparaguay.travel)
- [Booking Partner Hub](https://partner.booking.com)
- [TripAdvisor Insights](https://www.tripadvisor.com/Owners)

---

*Starter Kit - Hospitalidad y Turismo - FPUNA 2026*
