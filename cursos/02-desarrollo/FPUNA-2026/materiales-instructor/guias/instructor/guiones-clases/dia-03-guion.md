# Guion de Clase - Dia 3: IA para Aeronautica

## Informacion de la Clase

| Aspecto | Detalle |
|---------|---------|
| **Duracion** | 2 horas |
| **Audiencia** | Estudiantes de Ingenieria Aeronautica |
| **Objetivo** | Usar IA para calculos aerodinamicos y diseno |

---

## PRE-CLASE (15 min antes)

### Checklist del Instructor

- [ ] Python + Jupyter funcionando
- [ ] Librerias instaladas (numpy, matplotlib)
- [ ] XFLR5 abierto con perfil de ejemplo
- [ ] Base de datos de perfiles NACA lista
- [ ] Formulas aerodinamicas impresas (backup)

### Archivos de Ejemplo

- Perfil NACA 2412 en formato .dat
- Script de ejemplo para calculo de Reynolds
- Grafico de polar de ejemplo

---

## MODULO 1: Bienvenida + Contexto Aeronautico (10 min)

### 0:00 - 0:05 | Conexion con IA

**DECIR:**
> "La aeronautica involucra calculos complejos: aerodinamica, estructuras, rendimiento. La IA puede acelerar estos calculos y ayudarles a entender mejor los conceptos."

### 0:05 - 0:10 | Lo que Veremos Hoy

**MOSTRAR:**
```
AGENDA:
1. Calculos aerodinamicos con IA
2. Analisis de perfiles NACA
3. Generacion de graficos de rendimiento
4. Sizing preliminar de aeronaves
5. Proyecto: Diseno conceptual de UAV
```

---

## MODULO 2: Calculos Aerodinamicos Basicos (20 min)

### 0:10 - 0:20 | Numero de Reynolds

**DECIR:**
> "El numero de Reynolds es fundamental. Veamos como la IA puede ayudarnos a calcularlo y entenderlo."

**PROMPT DEMO:**
```
Soy estudiante de aeronautica. Necesito calcular el numero de Reynolds para:
- Velocidad: 50 m/s
- Cuerda del ala: 1.2 metros
- Altitud: 3000 metros (usar propiedades ISA)

Dame:
1. El calculo paso a paso
2. El valor final
3. Codigo Python para automatizar este calculo
4. Que me dice este Reynolds sobre el flujo?
```

**MOSTRAR RESULTADO** y explicar cada parte.

### 0:20 - 0:30 | Ejercicio: Tus Propios Calculos

**EJERCICIO:**
```
Calcula Reynolds para TU caso:
- Avion comercial a 10km de altitud, 250 m/s, cuerda 5m
- Drone pequeno a nivel del mar, 15 m/s, cuerda 0.3m
- Planeador a 2000m, 30 m/s, cuerda 1m

Usa Claude para hacer el calculo y generar el codigo.
```

---

## MODULO 3: Analisis de Perfiles NACA (25 min)

### 0:30 - 0:40 | Entendiendo Perfiles

**DECIR:**
> "Los perfiles NACA tienen nomenclatura especifica. La IA puede explicarla instantaneamente."

**PROMPT:**
```
Explicame el perfil NACA 2412:
1. Que significa cada numero (2, 4, 12)?
2. Cuales son sus caracteristicas principales?
3. Para que tipo de avion es adecuado?
4. Comparalo brevemente con NACA 0012 y NACA 4415
```

### 0:40 - 0:50 | Generar Coordenadas de Perfil

**PROMPT AVANZADO:**
```
Necesito codigo Python que:
1. Genere las coordenadas de un perfil NACA 4-digitos
2. El usuario ingresa el numero NACA (ej: 2412)
3. Genere 100 puntos en el extrados y 100 en el intrados
4. Grafique el perfil con matplotlib
5. Exporte las coordenadas a un archivo .dat compatible con XFLR5

Incluye comentarios explicando las formulas.
```

**EJECUTAR** el codigo generado en Jupyter/Python.

### 0:50 - 0:55 | Demo XFLR5 (Opcional)

Si hay tiempo:
- Importar perfil generado a XFLR5
- Mostrar analisis basico
- Comparar con datos teoricos

---

## BREAK (10 min)

---

## MODULO 4: Graficos de Rendimiento (20 min)

### 1:05 - 1:15 | Curva Polar

**DECIR:**
> "La curva polar (CL vs CD) es esencial. Vamos a generarla con datos simulados."

**PROMPT:**
```
Genera codigo Python para graficar la curva polar de un perfil aeronautico:
- Usa datos tipicos de un NACA 2412 a Re = 500,000
- Grafica CL vs CD
- Marca el punto de maximo L/D
- Incluye linea de CL maximo
- Titulo, etiquetas de ejes, leyenda profesional
- Guardar como PNG de alta resolucion
```

### 1:15 - 1:25 | Analizar Resultados

**PROMPT DE SEGUIMIENTO:**
```
Dado este grafico de curva polar:
- CL maximo: 1.4 a alpha = 14 grados
- CD minimo: 0.008 a alpha = 0 grados
- L/D maximo: 85 a alpha = 6 grados

Analizame estos resultados:
1. Son valores tipicos para este tipo de perfil?
2. Que me dice el L/D maximo sobre eficiencia?
3. Como afectaria aumentar la velocidad?
```

---

## MODULO 5: Sizing Preliminar (20 min)

### 1:25 - 1:35 | Diseno Conceptual

**DECIR:**
> "El sizing preliminar determina las dimensiones basicas. La IA puede automatizar estos calculos iterativos."

**PROMPT COMPLETO:**
```
Necesito hacer el sizing preliminar de un UAV con estas especificaciones:
- Peso maximo de despegue: 25 kg
- Velocidad de crucero: 20 m/s
- Altitud de operacion: 500 metros
- Autonomia deseada: 2 horas
- Propulsion: electrico

Calcula:
1. Superficie alar necesaria (asumiendo CL crucero = 0.5)
2. Envergadura (aspect ratio = 8)
3. Cuerda media
4. Potencia necesaria (eficiencia helice = 0.7)
5. Capacidad de bateria aproximada

Muestra todas las formulas y calculos paso a paso.
```

### 1:35 - 1:45 | Iteracion de Diseno

**DECIR:**
> "Ahora vamos a iterar. Que pasa si cambiamos un parametro?"

**PROMPT:**
```
Para el UAV anterior, que pasa si:
1. Aumento el peso a 30 kg?
2. Quiero velocidad de 25 m/s?
3. Uso aspect ratio de 10 en vez de 8?

Recalcula y comparame los resultados en una tabla.
```

---

## MODULO 6: Proyecto Mini-UAV (10 min)

### 1:45 - 1:55 | Diseno Rapido

**EJERCICIO FINAL:**
```
Disenar conceptualmente un mini-UAV para tu caso de uso:

OPCIONES:
A) UAV de reconocimiento agricola
B) Drone de delivery urbano
C) Planeador de investigacion atmosferica
D) UAV de inspeccion de lineas electricas

USAR CLAUDE PARA:
1. Definir requisitos (peso, velocidad, autonomia)
2. Seleccionar perfil NACA adecuado
3. Calcular dimensiones basicas
4. Estimar potencia y bateria
```

**DAR 10 MINUTOS** para que trabajen.

---

## MODULO 7: Cierre + Recursos (5 min)

### 1:55 - 2:00 | Resumen

**DECIR:**
> "Hoy aprendieron a usar IA para:
> - Calculos aerodinamicos (Reynolds, sustentacion)
> - Analisis y generacion de perfiles NACA
> - Crear graficos de rendimiento
> - Sizing preliminar de aeronaves"

**RECURSOS:**
```
HERRAMIENTAS COMPLEMENTARIAS:
- XFLR5: Analisis de perfiles (gratuito)
- OpenVSP: Modelado 3D aeronautico (gratuito, NASA)
- airfoiltools.com: Base de datos de perfiles

PARA PROFUNDIZAR:
- Anderson, "Fundamentals of Aerodynamics"
- Raymer, "Aircraft Design: A Conceptual Approach"
```

**ADVERTENCIA:**
> "IMPORTANTE: Los calculos de IA son para aprendizaje y diseno preliminar. Para proyectos reales, siempre verificar con software certificado y supervision profesional."

---

## NOTAS POST-CLASE

### Registrar

- [ ] Nivel de conocimiento previo del grupo
- [ ] Proyectos de UAV mencionados
- [ ] Dudas sobre formulas/conceptos

### Seguimiento

- Quien tiene proyectos de tesis relacionados?
- Interes en sesion avanzada de CFD?

---

*Guion Dia 3 - Aeronautica*
*FPUNA Verano 2026*
