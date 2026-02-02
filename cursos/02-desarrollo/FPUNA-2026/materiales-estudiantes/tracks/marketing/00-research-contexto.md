# 🎯 Módulo 00: Research + Contexto Organizado

## 🚨 OBLIGATORIO: Hacer esto PRIMERO antes de cualquier módulo

Este módulo establece la **Fuente de Verdad** de tu proyecto. Investiga, recopila y organiza toda la información del negocio en una estructura de archivos clara.

**Tiempo total:** 30-45 minutos  
**Resultado:** Carpeta `contexto/` con toda la información organizada  
**Herramienta:** OpenCode + Navegador web

---

## Estructura Final de Contexto

Al terminar este módulo tendrás esta estructura:

```
proyecto-marketing/
└── contexto/
    ├── 01-identidad/
    │   ├── marca.md
    │   ├── mision-vision.md
    │   ├── valores.md
    │   └── propuesta-valor.md
    ├── 02-audiencia/
    │   ├── cliente-ideal.md
    │   ├── segmentos.md
    │   └── journey.md
    ├── 03-producto/
    │   ├── servicios.md
    │   ├── precios.md
    │   └── diferenciadores.md
    ├── 04-mercado/
    │   ├── competencia.md
    │   ├── tendencias.md
    │   └── oportunidades.md
    ├── 05-digital/
    │   ├── redes-sociales.md
    │   ├── web.md
    │   └── analisis.md
    └── 06-mensajes/
        ├── tono-voz.md
        ├── palabras-clave.md
        └── mensajes-clave.md
```

---

## FASE 1: Research Digital (10-15 minutos)

### ¿Qué buscar?

Si el negocio YA TIENE presencia digital (redes, web, etc.), investiga antes de preguntar.

### Prompt 1: Análisis de Redes Sociales

**¿Cuándo usar?** Cuando el cliente tiene Instagram/Facebook activos.

#### 📝 Prompt:
```
Voy a darte información de las redes sociales de un negocio. Analízalas y extrae insights clave.

DATOS DE ENTRADA:
- Instagram: @[USUARIO] ([LINK])
- Facebook: [NOMBRE] ([LINK])
- Otras redes: [LISTA]

ANALIZA Y EXTRAÉ:

1. **Identidad Visual**
   - Paleta de colores dominante
   - Estilo fotográfico (profesional, amateur, lifestyle)
   - Consistencia visual (sí/no)

2. **Tono de Voz Actual**
   - Formal vs Casual
   - Uso de emojis (mucho/poco/nada)
   - Jerga específica que usan
   - Tipo de humor (si aplica)

3. **Contenido que Publican**
   - Categorías de posts (producto, lifestyle, educativo, etc.)
   - Frecuencia de publicación
   - Engagement (alto/medio/bajo basado en likes/comentarios)

4. **Mensajes Recurrentes**
   - Frases que repiten
   - Hashtags que usan siempre
   - Temas principales

5. **Gaps o Problemas**
   - Inconsistencias
   - Falta de claridad
   - Oportunidades de mejora

6. **Lo que Hacen Bien**
   - Fortalezas identificadas

FORMATO: Lista clara y concisa por punto.
```

#### 📋 Lista de Verificación - Research:
Antes de ejecutar, revisa:
- [ ] Instagram del negocio (últimos 12 posts)
- [ ] Facebook (últimas 10 publicaciones)
- [ ] Google My Business (reseñas, fotos)
- [ ] Web (si existe - homepage, about, servicios)
- [ ] Competidores (2-3 similares en la zona)

---

### Prompt 2: Análisis de Web + SEO

**¿Cuándo usar?** Si tienen sitio web.

#### 📝 Prompt:
```
Analiza esta información del sitio web del cliente:

URL: [LINK_WEB]

SECCIONES ANALIZADAS:
- Home: [DESCRIPCIÓN]
- About/Nosotros: [DESCRIPCIÓN]
- Servicios/Productos: [DESCRIPCIÓN]
- Contacto: [INFO]

EXTRAÉ:

1. **Propuesta de Valor Actual**
   - ¿Qué prometen?
   - ¿Es claro?

2. **Palabras Clave que Usan**
   - Términos repetidos
   - Jerga de la industria

3. **Identidad de Marca en Web**
   - Personalidad reflejada
   - Profesionalismo (alto/medio/bajo)

4. **Call to Actions (CTAs)**
   - Qué piden a los visitantes
   - Fuerza del CTA (claro/ambiguo)

5. **Gaps en la Web**
   - Info que falta
   - Secciones confusas
   - Oportunidades de mejora

6. **Fortalezas**
   - Lo que hacen bien online
```

---

### Prompt 3: Análisis de Competencia

**¿Cuándo usar?** Siempre - busca 2-3 competidores similares.

#### 📝 Prompt:
```
Compara a este negocio con sus competidores:

NEGOCIO CLIENTE:
- Nombre: [NOMBRE]
- Redes: @[USUARIO]
- Web: [LINK]

COMPETIDOR 1: [NOMBRE]
- Redes: @[USUARIO]
- Fortalezas: [LISTA]
- Debilidades: [LISTA]

COMPETIDOR 2: [NOMBRE]
- Redes: @[USUARIO]
- Fortalezas: [LISTA]
- Debilidades: [LISTA]

ANÁLISIS COMPARATIVO:

1. **Posicionamiento**
   - ¿Cómo se diferencian?
   - Nicho de cada uno

2. **Estrategia de Contenido**
   - Qué tipo de contenido publica cada uno
   - Cuál tiene mejor engagement

3. **Oportunidades Detectadas**
   - Qué no están haciendo los competidores
   - Espacio en el mercado

4. **Ventaja Competitiva del Cliente**
   - Qué puede destacar vs ellos
   - Propuesta única
```

---

## FASE 2: Ingesta de Contexto (10-15 minutos)

Ahora complementa la investigación con información directa del cliente.

### Prompt 4: Formulario de Contexto Base

#### 📝 Prompt:
```
Basándome en la investigación previa, voy a completar información adicional del negocio. 

INVESTIGACIÓN PREVIA (resumen):
[PÉGAR RESUMEN DE LOS 3 PROMPTS ANTERIORES]

INFORMACIÓN ADICIONAL DEL CLIENTE:

**Datos Básicos:**
- Nombre completo: [NOMBRE]
- Año de fundación: [AÑO]
- Ubicación exacta: [DIRECCIÓN]
- Horarios: [HORARIO]
- Teléfono/WhatsApp: [NUMERO]
- Email: [EMAIL]

**El Negocio:**
- Qué venden exactamente: [DESCRIPCIÓN DETALLADA]
- Precios: [RANGO O LISTA]
- Materiales/origen: [SI APLICA]
- Certificaciones: [LISTA]

**El Dueño/Equipo:**
- Nombre del fundador/equipo: [NOMBRES]
- Historia personal: [BREVE HISTORIA]
- Por qué empezaron: [MOTIVACIÓN]

**Clientes:**
- Quiénes compran: [DESCRIPCIÓN]
- Por qué compran: [MOTIVACIÓN]
- Feedback común: [COMENTARIOS]

**Contexto Paraguay:**
- Origen de materias primas: [LOCAL/NACIONAL/IMPORTADO]
- Mano de obra: [PARAGUAYA/OTRA]
- Conexión con comunidad: [CÓMO PARTICIPAN]

**Objetivos:**
- Qué quieren lograr este año: [METAS]
- Problemas actuales: [DESAFÍOS]
- Presupuesto aproximado: [RANGO]

PROCESA ESTO Y:
1. Identifica GAPS (info que falta o es vaga)
2. Haz preguntas específicas para completar
3. Valida la consistencia de toda la info
```

---

## FASE 3: Generación de Archivos de Contexto (10-15 minutos)

Ahora generarás los archivos individuales en la estructura de carpetas.

### Prompt 5: Generar Archivos de Identidad

#### 📝 Prompt:
```
Basándote en toda la información recopilada (research + contexto), genera estos archivos:

## Archivo: contexto/01-identidad/marca.md

```markdown
# Identidad de Marca

## Nombre
[Nombre completo y significado]

## Tagline
[Frase corta que la define]

## Personalidad
- Adjetivo 1: [Ej: Artesanal]
- Adjetivo 2: [Ej: Moderno]
- Adjetivo 3: [Ej: Cálido]
- Adjetivo 4: [Ej: Profesional]
- Adjetivo 5: [Ej: Sostenible]

## Historia
[Historia del origen en 1 párrafo]

## Significado del Nombre
[Por qué eligieron ese nombre]
```

## Archivo: contexto/01-identidad/propuesta-valor.md

```markdown
# Propuesta de Valor

## Para Quién
[Cliente ideal específico]

## El Problema
[Qué problema resuelven]

## La Solución
[Cómo lo resuelven]

## Diferencia Clave
[Por qué elegirlos vs competencia]

## Frase de Propuesta
[1 oración impactante]
```

## Archivo: contexto/01-identidad/valores.md

```markdown
# Valores de Marca

1. **[VALOR 1]**
   - Significado: [Qué significa para ellos]
   - Se ve en: [Cómo se demuestra]

2. **[VALOR 2]**
   - Significado: [Qué significa]
   - Se ve en: [Cómo se demuestra]

[Repetir para 5 valores]
```

## Archivo: contexto/01-identidad/mision-vision.md

```markdown
# Misión y Visión

## Misión (Presente)
[Qué hacen hoy y para quién]

## Visión (Futuro)
[Adónde quieren llegar en 5 años]

## Propósito (Por qué)
[Por qué existen más allá del dinero]
```

GENERA estos 4 archivos completos.
```

---

### Prompt 6: Generar Archivos de Audiencia

#### 📝 Prompt:
```
Genera los archivos de audiencia:

## Archivo: contexto/02-audiencia/cliente-ideal.md

```markdown
# Cliente Ideal (Avatar)

## Demografía
- Edad: [RANGO]
- Género: [PREDOMINANTE]
- Ubicación: [ZONA]
- Ingresos: [RANGO]
- Ocupación: [TIPO]

## Psicografía
- Intereses: [LISTA]
- Valores: [LISTA]
- Miedos: [LISTA]
- Deseos: [LISTA]

## Comportamiento
- Dónde busca info: [CANALES]
- Cómo decide: [PROCESO]
- Qué lo detiene: [OBJECIONES]

## Frases que Dice
- "[Frase típica 1]"
- "[Frase típica 2]"
- "[Frase típica 3]"
```

## Archivo: contexto/02-audiencia/segmentos.md

```markdown
# Segmentos de Audiencia

## Segmento 1: [NOMBRE]
- Descripción: [Quiénes son]
- Porcentaje: [% del total]
- Necesidades: [Qué buscan]
- Mensaje clave: [Qué decirles]

## Segmento 2: [NOMBRE]
[Repetir estructura]

## Segmento 3: [NOMBRE]
[Repetir estructura]
```

## Archivo: contexto/02-audiencia/journey.md

```markdown
# Customer Journey

## Etapa 1: Conciencia
- Dónde nos encuentran: [CANALES]
- Qué piensan: [PENSAMIENTOS]
- Qué necesitan: [INFORMACIÓN]

## Etapa 2: Consideración
- Qué comparan: [ALTERNATIVAS]
- Qué preguntan: [DUDAS]
- Qué los convence: [FACTORES]

## Etapa 3: Decisión
- Trigger de compra: [QUÉ LOS EMPUJA]
- Objeciones: [QUÉ LOS FRENA]
- Cómo cerrar: [QUÉ ACCIÓN TOMAN]

## Etapa 4: Post-compra
- Qué esperan: [EXPECTATIVAS]
- Cómo fidelizar: [NEXT STEPS]
- Cómo obtener referidos: [RECOMMENDACIONES]
```

GENERA estos 3 archivos.
```

---

### Prompt 7: Generar Archivos de Producto

#### 📝 Prompt:
```
Genera los archivos de producto/servicio:

## Archivo: contexto/03-producto/servicios.md

```markdown
# Servicios/Productos

## Oferta Principal

### [Producto/Servicio 1]
- Nombre: [Nombre]
- Descripción: [Qué incluye]
- Precio: [Precio]
- Para quién: [Segmento ideal]
- Diferencial: [Qué lo hace especial]

### [Producto/Servicio 2]
[Repetir estructura]

## Líneas de Producto
[Categorías principales]

## Nuevos Lanzamientos
[Qué planean lanzar]
```

## Archivo: contexto/03-producto/precios.md

```markdown
# Estrategia de Precios

## Lista de Precios
- [Producto 1]: [Precio]
- [Producto 2]: [Precio]
- [Producto 3]: [Precio]

## Rango de Precios
- Mínimo: [Precio]
- Máximo: [Precio]
- Promedio: [Precio]

## Competitividad
- vs Mercado: [Caro/Igual/Barato]
- Justificación: [Por qué ese precio]

## Promociones Habitual
[Qué promociones hacen]
```

## Archivo: contexto/03-producto/diferenciadores.md

```markdown
# Diferenciadores Clave

## 1. [Diferenciador Principal]
- Qué es: [Descripción]
- Por qué importa: [Beneficio]
- Prueba: [Cómo lo demuestran]

## 2. [Segundo Diferenciador]
[Repetir]

## 3. [Tercer Diferenciador]
[Repetir]

## Ventajas sobre Competencia
1. [Ventaja 1]
2. [Ventaja 2]
3. [Ventaja 3]

## Desventajas (Qué mejorar)
1. [Área de mejora 1]
2. [Área de mejora 2]
```

GENERA estos 3 archivos.
```

---

### Prompt 8: Generar Archivos de Mercado

#### 📝 Prompt:
```
Genera los archivos de mercado y competencia:

## Archivo: contexto/04-mercado/competencia.md

```markdown
# Análisis de Competencia

## Competidor 1: [Nombre]
- Fortalezas: [Lista]
- Debilidades: [Lista]
- Posicionamiento: [Dónde están]
- Qué aprender: [De ellos]
- Qué evitar: [Sus errores]

## Competidor 2: [Nombre]
[Repetir estructura]

## Competidor 3: [Nombre]
[Repetir estructura]

## Comparativa Visual
| Aspecto | Nosotros | Comp 1 | Comp 2 | Comp 3 |
|---------|----------|--------|--------|--------|
| Precio | [X] | [X] | [X] | [X] |
| Calidad | [X] | [X] | [X] | [X] |
| Servicio | [X] | [X] | [X] | [X] |
| Ubicación | [X] | [X] | [X] | [X] |
```

## Archivo: contexto/04-mercado/tendencias.md

```markdown
# Tendencias del Mercado

## Tendencia 1: [Nombre]
- Descripción: [Qué es]
- Impacto: [Cómo nos afecta]
- Oportunidad: [Qué podemos hacer]

## Tendencia 2: [Nombre]
[Repetir]

## Tendencia 3: [Nombre]
[Repetir]

## Tendencias Paraguay Específicas
[Lo que pasa localmente]
```

## Archivo: contexto/04-mercado/oportunidades.md

```markdown
# Oportunidades Detectadas

## Oportunidad 1: [Nombre]
- Descripción: [Qué es]
- Viabilidad: [Alta/Media/Baja]
- Acción: [Qué hacer]
- Prioridad: [1-10]

## Oportunidad 2: [Nombre]
[Repetir]

## Amenazas a Monitorear
1. [Amenaza 1]
2. [Amenaza 2]
```

GENERA estos 3 archivos.
```

---

### Prompt 9: Generar Archivos de Digital

#### 📝 Prompt:
```
Genera los archivos de presencia digital:

## Archivo: contexto/05-digital/redes-sociales.md

```markdown
# Redes Sociales

## Instagram
- URL: [Link]
- Seguidores: [Número]
- Frecuencia: [Posts por semana]
- Mejores posts: [Temas que funcionan]
- Gaps: [Qué falta]

## Facebook
- URL: [Link]
- Seguidores: [Número]
- Tipo de contenido: [Qué publican]
- Engagement: [Alto/Medio/Bajo]

## Otras
- TikTok: [Info]
- LinkedIn: [Info]
- Twitter: [Info]

## Análisis de Contenido
- Qué funciona: [Tipo de posts]
- Qué no funciona: [Tipo de posts]
- Oportunidades: [Qué probar]
```

## Archivo: contexto/05-digital/web.md

```markdown
# Sitio Web

## URL: [Link]

## Estado Actual
- Diseño: [Moderno/Anticuado/Simple]
- Velocidad: [Rápido/Lento]
- Mobile: [Responsivo/No]
- SEO: [Optimizado/No]

## Secciones Principales
1. [Sección 1]: [Descripción]
2. [Sección 2]: [Descripción]

## Gaps Identificados
- [Problema 1]
- [Problema 2]

## Oportunidades
- [Mejora 1]
- [Mejora 2]
```

## Archivo: contexto/05-digital/analisis.md

```markdown
# Análisis Digital Integral

## Fortalezas Online
1. [Fortaleza 1]
2. [Fortaleza 2]

## Debilidades Online
1. [Debilidad 1]
2. [Debilidad 2]

## KPIs Actuales (si disponibles)
- Tráfico web: [Número]
- Engagement rate: [Porcentaje]
- Conversiones: [Número]

## Objetivos Digitales
- Corto plazo (3 meses): [Meta]
- Medio plazo (6 meses): [Meta]
- Largo plazo (1 año): [Meta]
```

GENERA estos 3 archivos.
```

---

### Prompt 10: Generar Archivos de Mensajes

#### 📝 Prompt:
```
Genera los archivos de mensajes y comunicación:

## Archivo: contexto/06-mensajes/tono-voz.md

```markdown
# Tono de Voz

## Características Principales
1. **[Característica 1]** - [Descripción]
2. **[Característica 2]** - [Descripción]
3. **[Característica 3]** - [Descripción]
4. **[Característica 4]** - [Descripción]
5. **[Característica 5]** - [Descripción]

## Ejemplos de Frases

### Sí Decimos:
- "[Ejemplo 1]"
- "[Ejemplo 2]"
- "[Ejemplo 3]"

### No Decimos:
- ❌ "[Ejemplo 1]"
- ❌ "[Ejemplo 2]"
- ❌ "[Ejemplo 3]"

## Por Situación
- Post de venta: [Tono]
- Post educativo: [Tono]
- Respuesta a queja: [Tono]
- Celebración: [Tono]
```

## Archivo: contexto/06-mensajes/palabras-clave.md

```markdown
# Palabras Clave

## Palabras de Marca (siempre usar)
1. [Palabra 1]
2. [Palabra 2]
3. [Palabra 3]
4. [Palabra 4]
5. [Palabra 5]

## Palabras Prohibidas (nunca usar)
1. [Palabra 1]
2. [Palabra 2]
3. [Palabra 3]

## Hashtags Principales
#Marca #Localidad #Nicho #Paraguay #[Específico]

## Emojis de Marca
[Lista de emojis que representan la marca]
```

## Archivo: contexto/06-mensajes/mensajes-clave.md

```markdown
# Mensajes Clave

## Mensaje 1: [Tema]
- Idea central: [En 1 oración]
- Soporte: [3 puntos de respaldo]
- Uso: [Dónde usar este mensaje]

## Mensaje 2: [Tema]
[Repetir]

## Mensaje 3: [Tema]
[Repetir]

## Preguntas Frecuentes + Respuestas

### P1: [Pregunta común]
**R:** [Respuesta en tono de marca]

### P2: [Pregunta común]
**R:** [Respuesta]

### P3: [Pregunta sobre precio]
**R:** [Respuesta justificando valor]
```

GENERA estos 3 archivos.
```

---

## 🎓 Ejercicio Práctico (30-45 minutos)

### Tu Misión:

1. **Elige un negocio** (real o ficticio de Paraguay)
2. **Crea la carpeta** `contexto/` en tu proyecto
3. **Ejecuta los 10 prompts** en orden:
   - Prompts 1-3: Research (si tienen presencia digital)
   - Prompt 4: Ingesta base
   - Prompts 5-10: Generación de archivos

4. **Guarda cada resultado** en el archivo correspondiente

### Ejemplo Práctico: "Helados Artesanales Ñande" (ficticio, Asunción)

**Research rápido:**
- Instagram: @heladosnande (ficticio)
- 15K seguidores
- Postean 3x semana
- Colores: Amarillo, Verde, Café
- Tono: Divertido, Familiar, Paraguayo

**Generar los 18 archivos de contexto** con esta información base.

---

## ✅ Checklist de Finalización

Tu carpeta `contexto/` debe contener:
- [ ] 01-identidad/
  - [ ] marca.md
  - [ ] mision-vision.md
  - [ ] valores.md
  - [ ] propuesta-valor.md
- [ ] 02-audiencia/
  - [ ] cliente-ideal.md
  - [ ] segmentos.md
  - [ ] journey.md
- [ ] 03-producto/
  - [ ] servicios.md
  - [ ] precios.md
  - [ ] diferenciadores.md
- [ ] 04-mercado/
  - [ ] competencia.md
  - [ ] tendencias.md
  - [ ] oportunidades.md
- [ ] 05-digital/
  - [ ] redes-sociales.md
  - [ ] web.md
  - [ ] analisis.md
- [ ] 06-mensajes/
  - [ ] tono-voz.md
  - [ ] palabras-clave.md
  - [ ] mensajes-clave.md

**Total: 18 archivos organizados**

---

## 📋 Cómo Usar Esta Estructura en los Próximos Módulos

Al inicio de CADA módulo (01-08), ejecuta este prompt:

```
Leeré el contexto completo del proyecto. Dame un momento para procesarlo.

[Copiar y pegar el CONTENIDO COMPLETO de todos los archivos de la carpeta contexto/]

---

CONTEXT CARGADO ✅

Ahora comprendo:
- Quién es la marca
- A quién le venden
- Qué los diferencia
- Cómo se comunican
- Su presencia digital actual

Estoy listo para crear [acción del módulo actual] consistente con esta identidad.
```

**Ventaja:** En lugar de un archivo largo y difuso, tienes información segmentada y fácil de actualizar.

---

## 🚀 Ventajas de esta Estructura

1. **Modular:** Actualiza solo lo que cambia
2. **Clara:** Cada archivo tiene un propósito específico
3. **Escalable:** Agrega más archivos si es necesario
4. **Profesional:** Estructura de agencia de marketing
5. **Reutilizable:** Usa en cualquier proyecto futuro

---

## Siguiente Paso

Con tu carpeta `contexto/` completa, ve al **Módulo 01: Crear Contenido**.

En el Módulo 01, usa el prompt de "Cargar Contexto" mostrado arriba antes de ejecutar los prompts de contenido.

---

*Módulo 00 - Research + Contexto Organizado | FPUNA 2026 | AI Whisperers*
