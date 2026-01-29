# Ejercicio Modulo 03: Analisis Estructural del Ala

## Tiempo Estimado: 120 minutos

---

## Objetivo

Calcular las cargas sobre el ala de tu UAV, seleccionar material apropiado, y realizar un analisis FEA simplificado para verificar el factor de seguridad.

---

## Parte 1: Calculo de Cargas (30 min)

### Datos del UAV (de modulos anteriores)

| Parametro | Valor |
|-----------|-------|
| MTOW | 4.5 kg |
| Envergadura | ____ m |
| Cuerda raiz | ____ m |
| Superficie alar | ____ m^2 |

### Tarea 1.1: Factor de Carga de Diseno

Para UAV agricola, usar n = 4 (incluye maniobras y rafagas).

```
Carga limite = n * W = 4 * 4.5 kg * 9.81 m/s^2 = ____ N
Carga ultima = 1.5 * Carga limite = ____ N
```

### Tarea 1.2: Distribucion de Sustentacion

Consulta a IA:
```
Mi UAV tiene:
- Envergadura: [valor] m
- Taper ratio: 0.5
- Sustentacion total: [carga limite] N

Calcula:
1. Distribucion de sustentacion a lo largo de la envergadura (aproximacion eliptica)
2. Momento flector en la raiz del ala
3. Cortante en la raiz del ala

Muestra las formulas y calculos.
```

### Tarea 1.3: Verificar Calculos

| Parametro | Valor IA | Tu Verificacion |
|-----------|----------|-----------------|
| M_raiz (N*m) | | |
| V_raiz (N) | | |

---

## Parte 2: Seleccion de Material (20 min)

### Tarea 2.1: Opciones de Material

Para el larguero principal del ala, considera:

| Material | Densidad | Yield Strength | Costo | Manufactura |
|----------|----------|----------------|-------|-------------|
| Aluminio 6061-T6 | 2700 kg/m^3 | 276 MPa | Medio | Facil |
| Tubo carbono | 1600 kg/m^3 | 700 MPa (flexion) | Alto | Comprar hecho |
| Madera balsa + fibra | 400 kg/m^3 | ~15 MPa | Bajo | Manual |

### Tarea 2.2: Consulta a IA

```
Para un larguero de ala de UAV con:
- Momento flector maximo: [valor] N*m
- Factor de seguridad requerido: 2.0
- Restriccion de peso: lo mas liviano posible
- Presupuesto: limitado (proyecto universitario)

Compara las opciones:
1. Tubo aluminio 6061-T6
2. Tubo de carbono comercial
3. Viga de balsa reforzada

Para cada uno:
- Calcula dimensiones necesarias (diametro/espesor o seccion)
- Estima peso
- Indica pros y contras

Recomienda la mejor opcion.
```

### Tarea 2.3: Seleccion Final

Material seleccionado: ________________

Justificacion:
- 
- 
- 

---

## Parte 3: Analisis FEA en Fusion 360 (50 min)

### Tarea 3.1: Preparar Modelo

1. Abrir modelo del ala de Modulo 01
2. **Simplificar** (opcional): remover detalles pequenos
3. Verificar que sea un cuerpo solido

### Tarea 3.2: Configurar Simulation

1. Cambiar a workspace **Simulation**
2. Crear nuevo **Study** (Static Stress)
3. Asignar material al cuerpo

### Tarea 3.3: Aplicar Condiciones

**Restricciones (fijo):**
- Cara de raiz del ala: Fixed

**Cargas:**
- Aplicar presion en superficie superior del ala
- Presion = Carga_limite / Superficie_ala = ____ Pa

*Nota: Esta es una simplificacion. En realidad la distribucion no es uniforme.*

### Tarea 3.4: Ejecutar y Analizar

1. **Solve** el estudio
2. Revisar resultados:
   - Von Mises Stress (tension equivalente)
   - Displacement (deformacion)
   - Safety Factor

### Tarea 3.5: Registrar Resultados

| Resultado | Valor | Ubicacion |
|-----------|-------|-----------|
| Tension maxima (MPa) | | |
| Deformacion maxima (mm) | | |
| Factor de seguridad minimo | | |

---

## Parte 4: Verificacion y Documentacion (20 min)

### Tarea 4.1: Verificar con IA

```
Mi analisis FEA de un ala de UAV dio:
- Material: [seleccionado]
- Tension maxima Von Mises: [valor] MPa
- Deformacion maxima: [valor] mm
- Factor de seguridad minimo: [valor]

Condiciones:
- Carga total: [valor] N
- Envergadura: [valor] m
- Espesor promedio del perfil: [valor] mm

Verifica:
1. Es razonable la tension maxima para este material?
2. La deformacion es aceptable (tipico: <5% de envergadura)?
3. El factor de seguridad es adecuado para un UAV?

Si hay problemas, sugiere soluciones.
```

### Tarea 4.2: Iterar si Necesario

Si el factor de seguridad es muy bajo (<1.5) o muy alto (>4):
- Ajustar dimensiones del larguero
- Cambiar material
- Re-ejecutar FEA
- Documentar cambios

---

## Entregables

| Item | Formato | Nombre |
|------|---------|--------|
| Calculos de cargas | .pdf | cargas_ala_[nombre].pdf |
| Seleccion material | Incluido en PDF | |
| Capturas FEA | .png | fea_stress_[nombre].png |
| Resultados FEA | .csv o tabla | resultados_fea_[nombre].csv |

---

## Rubrica de Evaluacion

| Criterio | Puntos | Descripcion |
|----------|--------|-------------|
| **Calculo de cargas** | 25 | Correcto, verificado |
| **Seleccion material** | 20 | Justificada, apropiada |
| **Setup FEA** | 20 | Condiciones correctas |
| **Interpretacion resultados** | 20 | FS adecuado, coherente |
| **Documentacion** | 15 | Clara, completa |
| **Total** | 100 | |

---

## Preguntas de Reflexion

1. Por que usamos factor de carga n=4 y no solo n=1?

2. Que pasaria si la deformacion del ala fuera muy grande (ej: 10% de envergadura)?

3. Cuales son las limitaciones de este analisis simplificado?

---

*Ejercicio Modulo 03 - Estructuras y Materiales - FPUNA 2026*
