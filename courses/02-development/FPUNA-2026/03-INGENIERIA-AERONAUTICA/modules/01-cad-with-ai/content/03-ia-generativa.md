# IA Generativa para Diseno Aeronautico

## 1. Introduccion

La IA puede acelerar dramaticamente el proceso de diseno, pero requiere saber **como preguntar** y **como verificar** las respuestas.

### Que Puede Hacer la IA

| Tarea | Nivel de Confianza | Verificacion Requerida |
|-------|-------------------|------------------------|
| Generar coordenadas de perfiles | Alto | Comparar con base de datos |
| Calcular dimensiones preliminares | Medio | Verificar formulas |
| Sugerir configuraciones | Medio | Evaluar trade-offs |
| Optimizacion topologica | Alto (en Fusion) | Revisar resultados |
| Generar codigo para calculos | Alto | Ejecutar y verificar |

### Que NO Puede Hacer (Confiablemente)

- Garantizar seguridad estructural
- Certificar disenos para vuelo
- Reemplazar pruebas fisicas
- Conocer restricciones especificas de tu proyecto

---

## 2. Prompts Efectivos para CAD

### Estructura de un Buen Prompt

```
[CONTEXTO] Estoy disenando un UAV agricola con las siguientes especificaciones:
- MTOW: 5 kg
- Velocidad crucero: 15 m/s
- Autonomia: 45 minutos

[TAREA ESPECIFICA] Necesito las dimensiones preliminares del ala.

[FORMATO DESEADO] Presenta los resultados en una tabla con:
- Parametro
- Valor
- Unidad
- Formula usada

[RESTRICCIONES] Usar sistema SI. Mostrar todas las asunciones.
```

### Ejemplos de Prompts por Categoria

#### Generar Geometria

```
Genera las coordenadas X,Y de un perfil NACA 23015:
- 80 puntos totales (40 extrados + 40 intrados)
- Cuerda normalizada = 1.0
- Distribucion coseno
- Formato CSV listo para importar
- Incluir header: x,y
```

#### Calculos Dimensionales

```
Para un avion ultraligero de 450 kg:
1. Calcula la carga alar tipica (kg/m^2)
2. Con esa carga alar, determina la superficie alar necesaria
3. Para un AR de 8, calcula la envergadura
4. Sugiere dimensiones de fuselaje proporcionales

Muestra cada paso con la formula y el calculo numerico.
```

#### Seleccion de Perfiles

```
Necesito seleccionar un perfil para estas condiciones:
- Reynolds: 500,000
- CL de diseno: 0.6
- Prioridad: bajo arrastre

Compara 3 perfiles NACA candidatos:
- NACA 2412
- NACA 4412  
- NACA 23012

Para cada uno indica: CL_max, CD a CL=0.6, L/D maximo
Recomienda el mejor y explica por que.
```

---

## 3. Generative Design en Fusion 360

### Que Es

Optimizacion topologica automatizada que encuentra la forma optima dado:
- Cargas aplicadas
- Restricciones geometricas
- Objetivos (minimizar masa, maximizar rigidez)

### Flujo de Trabajo

```
1. Definir espacio de diseno (volumen maximo)
2. Definir obstaculos (zonas donde no puede haber material)
3. Definir cargas y restricciones
4. Definir objetivos
5. Ejecutar estudio
6. Evaluar resultados
7. Refinar geometria para manufactura
```

### Ejemplo: Soporte Estructural

**Problema**: Disenar un soporte que conecte el ala al fuselaje

**Setup**:
1. Espacio de diseno: Bloque de 100x50x30 mm
2. Preservar: Agujeros de montaje en ambos extremos
3. Carga: 500 N en direccion Z
4. Restriccion: Fijo en extremo del fuselaje
5. Objetivo: Minimizar masa, factor de seguridad > 2

**Resultado**: Forma organica optimizada que es 40% mas liviana que un soporte solido.

### Limitaciones

- Formas resultantes pueden ser dificiles de fabricar
- Requiere post-procesamiento para manufactura tradicional
- Bueno para impresion 3D

---

## 4. Verificacion de Outputs de IA

### Siempre Verificar

| Output | Como Verificar |
|--------|----------------|
| Coordenadas de perfil | Graficar y comparar con imagen conocida |
| Dimensiones | Calcular manualmente al menos una vez |
| Formulas | Verificar en Raymer o Anderson |
| Codigo | Ejecutar con valores conocidos |

### Red Flags

- Valores fuera de rangos tipicos
- Formulas sin unidades
- Asunciones no declaradas
- Numeros "redondos" sospechosos

### Ejemplo de Verificacion

IA dice: "Para 5 kg MTOW, superficie alar = 0.5 m^2"

Verificacion:
```
Carga alar tipica UAV: 30-50 kg/m^2
W/S = 5 kg / 0.5 m^2 = 10 kg/m^2  <- MUY BAJO

Recalculo con W/S = 40 kg/m^2:
S = 5 kg / 40 kg/m^2 = 0.125 m^2  <- Mas razonable

Conclusion: La IA dio un valor incorrecto
```

---

## 5. Parametrizacion Asistida por IA

### Generar Tablas de Diseno

Prompt:
```
Genera una tabla de parametros para estudiar el efecto del aspect ratio
en un ala con S = 0.5 m^2:

AR: [6, 8, 10, 12]

Para cada AR calcula:
- Envergadura
- Cuerda media
- Cuerda raiz (asumiendo taper = 0.5)
- Cuerda punta

Formato: tabla markdown
```

### Generar Ecuaciones Parametricas

Prompt:
```
Dame las ecuaciones parametricas para modelar un fuselaje
con forma de gota (teardrop):

- Longitud total: L
- Diametro maximo: D
- Posicion de diametro maximo: 0.3*L desde la nariz

Expresar radio R como funcion de posicion X.
```

---

## 6. Documentacion con IA

### Generar Especificaciones

Prompt:
```
Basandote en este modelo de ala:
- Envergadura: 2.5 m
- Cuerda raiz: 0.4 m
- Cuerda punta: 0.2 m
- Perfil: NACA 2412

Genera una hoja de especificaciones tecnicas que incluya:
1. Parametros geometricos (con formulas)
2. Parametros aerodinamicos estimados
3. Rango de operacion recomendado
4. Limitaciones

Formato: tabla profesional
```

### Generar Lista de Materiales (BOM)

Prompt:
```
Para construir esta ala con estructura de madera balsa:

Envergadura: 1.5 m
Estructura: 2 largueros, 10 costillas, revestimiento parcial

Genera una lista de materiales con:
- Descripcion
- Dimensiones
- Cantidad
- Material sugerido
```

---

## 7. Ejercicio Practico: Diseno con IA

### Mision

Usar IA para disenar un ala de UAV, verificando cada paso.

### Pasos

1. **Especificaciones** (prompt a IA)
   ```
   Mi UAV tiene MTOW = 3 kg, velocidad crucero = 12 m/s.
   Sugiere especificaciones preliminares del ala.
   ```

2. **Verificar** los numeros manualmente

3. **Generar perfil** (prompt a IA)
   ```
   Genera coordenadas NACA 4412...
   ```

4. **Importar** a Fusion 360

5. **Modelar** ala completa

6. **Documentar** con ayuda de IA

### Entregable

Documento que incluya:
- Prompts usados
- Respuestas de IA
- Verificacion realizada
- Modelo CAD final

---

## 8. Mejores Practicas

### DO (Hacer)

- Dar contexto completo
- Pedir formulas, no solo numeros
- Verificar con fuentes independientes
- Iterar prompts para mejorar
- Documentar interacciones

### DON'T (No Hacer)

- Confiar ciegamente en numeros
- Omitir unidades en prompts
- Usar valores sin verificar
- Ignorar rangos tipicos
- Olvidar restricciones de seguridad

---

## Resumen

| Aspecto | Clave |
|---------|-------|
| Prompts | Contexto + Tarea + Formato + Restricciones |
| Verificacion | Siempre verificar con calculo manual o base de datos |
| Generative Design | Bueno para optimizacion, requiere post-proceso |
| Documentacion | IA acelera pero humano revisa |

---

*Fin del contenido del Modulo 01*
