# Ejercicio Modulo 05: Integracion y Diseno Final

## Tiempo Estimado: 120 minutos

---

## Objetivo

Integrar todos los subsistemas disenados en modulos anteriores, verificar coherencia del diseno, calcular centro de gravedad, y preparar documentacion tecnica del UAV agricola.

---

## Parte 1: Compilar Weight Breakdown (30 min)

### Tarea 1.1: Recopilar Datos de Modulos Anteriores

| Componente | Peso (g) | Fuente |
|------------|----------|--------|
| Estructura ala | ____ | Modulo 03 (FEA) |
| Fuselaje | ____ | Estimacion CAD |
| Motor | ____ | Modulo 04 |
| ESC | ____ | Modulo 04 |
| Bateria | ____ | Modulo 04 |
| Helice | ____ | Modulo 04 |
| Servos (4x) | ____ | Estimacion (~50g c/u) |
| Receptor + telemetria | ____ | Estimacion (~100g) |
| Cableado | ____ | Estimacion (~50g) |
| Tren aterrizaje | ____ | Estimacion |
| Payload (camara) | 800 | Especificacion |
| **TOTAL** | ____ | |

### Tarea 1.2: Verificar MTOW

```
Peso total calculado: ____ g
MTOW especificado: 4500 g
Margen disponible: ____ g (____ %)
```

Si peso > MTOW:
- Identificar componentes a reducir
- Consultar IA para alternativas mas livianas

### Tarea 1.3: Consulta a IA

```
Mi UAV tiene este weight breakdown:
[pegar tabla]

MTOW objetivo: 4500g
Margen actual: [valor]%

Preguntas:
1. El margen es adecuado? (tipico 15-20%)
2. Algun componente parece muy pesado o muy liviano?
3. Que componentes podria reducir si necesito mas margen?
```

---

## Parte 2: Calculo de Centro de Gravedad (30 min)

### Tarea 2.1: Definir Sistema de Coordenadas

```
Origen: Punta del borde de ataque del ala en la raiz
X positivo: Hacia atras (cola)
Y positivo: Hacia derecha
Z positivo: Hacia arriba
```

### Tarea 2.2: Posicionar Componentes

| Componente | Peso (g) | X (mm) | Y (mm) | Z (mm) |
|------------|----------|--------|--------|--------|
| Ala | | MAC/4 | 0 | 0 |
| Fuselaje | | | 0 | |
| Motor | | | 0 | |
| Bateria | | | 0 | |
| Payload | | | 0 | |
| ... | | | | |

### Tarea 2.3: Calcular CG

```python
# Ejemplo de calculo
componentes = [
    {"nombre": "Ala", "peso": 400, "x": 100},
    {"nombre": "Fuselaje", "peso": 300, "x": 150},
    {"nombre": "Motor", "peso": 150, "x": 0},
    {"nombre": "Bateria", "peso": 500, "x": 120},
    {"nombre": "Payload", "peso": 800, "x": 140},
    # Agregar todos...
]

peso_total = sum(c["peso"] for c in componentes)
momento_total = sum(c["peso"] * c["x"] for c in componentes)

Xcg = momento_total / peso_total
print(f"Xcg = {Xcg:.1f} mm desde borde de ataque")
```

### Tarea 2.4: Verificar Margen Estatico

```
MAC = ____ mm (de Modulo 01)
Xle_mac = ____ mm (borde de ataque de MAC)

Punto neutro (tipico):
Xnp = Xle_mac + 0.25 * MAC = ____ mm

Margen estatico:
SM = (Xnp - Xcg) / MAC * 100 = ____ %

Rango aceptable: 10-20%
```

### Tarea 2.5: Ajustar si Necesario

Si SM < 10%: CG muy atras (inestable)
- Mover bateria hacia adelante
- Agregar peso en nariz

Si SM > 20%: CG muy adelante (muy estable, dificil maniobrar)
- Mover bateria hacia atras
- Reducir peso en nariz

---

## Parte 3: Trade-off Analysis (30 min)

### Tarea 3.1: Identificar Trade-offs Clave

| Trade-off | Opcion A | Opcion B | Impacto |
|-----------|----------|----------|---------|
| Bateria grande vs pequena | Mayor autonomia | Menor peso | Performance |
| Ala grande vs pequena | Menor Vstall | Menor arrastre | Velocidad |
| Estructura fuerte vs liviana | Mayor FS | Menor peso | Confiabilidad |

### Tarea 3.2: Analisis con IA

```
Mi UAV tiene estas caracteristicas finales:
- MTOW: 4.5 kg
- Envergadura: [valor] m
- Superficie alar: [valor] m^2
- Autonomia: [valor] min
- Velocidad crucero: 14 m/s
- Velocidad stall: [valor] m/s

Trade-off principal: Autonomia vs Peso

Analiza:
1. Si aumento bateria de 5000 a 6000 mAh (+100g):
   - Nueva autonomia?
   - Nuevo Vstall?
   - Nueva potencia requerida?

2. Si reduzco envergadura 10% (menor arrastre inducido, pero mayor Vstall):
   - Nuevo arrastre?
   - Nueva autonomia?
   - Nuevo Vstall?

Recomienda la mejor configuracion para mision agricola
(prioridad: autonomia > velocidad > maniobrabilidad)
```

### Tarea 3.3: Documentar Decision

Trade-off principal analizado: ________________

Decision tomada: ________________

Justificacion:
-
-
-

---

## Parte 4: Documentacion Tecnica (30 min)

### Tarea 4.1: Tabla de Especificaciones Finales

| Parametro | Valor | Unidad |
|-----------|-------|--------|
| **General** | | |
| MTOW | | kg |
| Peso vacio | | kg |
| Carga util | | kg |
| **Geometria** | | |
| Envergadura | | m |
| Superficie alar | | m^2 |
| Aspect Ratio | | - |
| MAC | | m |
| **Aerodinamica** | | |
| Perfil | NACA ____ | - |
| CL_max | | - |
| L/D_max | | - |
| CD0 | | - |
| **Performance** | | |
| Velocidad crucero | | m/s |
| Velocidad stall | | m/s |
| Velocidad maxima | | m/s |
| Tasa de ascenso | | m/s |
| Autonomia | | min |
| Alcance | | km |
| **Propulsion** | | |
| Motor | | modelo |
| Helice | | DxP |
| Bateria | | celdas, mAh |
| **Estabilidad** | | |
| Xcg | | mm |
| Margen estatico | | % |

### Tarea 4.2: Crear 3-Vistas

En Fusion 360, crear dibujo con:
- Vista frontal
- Vista lateral
- Vista superior
- Cotas principales

Exportar como PDF: `UAV_3vistas_[nombre].pdf`

### Tarea 4.3: Preparar Resumen Ejecutivo

1 pagina con:
- Mision del UAV
- Caracteristicas principales (3-4 bullets)
- Imagen del modelo 3D
- Performance clave

---

## Entregables

| Item | Formato | Nombre |
|------|---------|--------|
| Weight breakdown | .xlsx o tabla | weight_breakdown_[nombre].xlsx |
| Calculo CG | .pdf o script | cg_calculation_[nombre].pdf |
| Trade-off analysis | Incluido en doc | |
| Especificaciones | .pdf | specs_final_[nombre].pdf |
| 3-vistas | .pdf | UAV_3vistas_[nombre].pdf |
| Resumen ejecutivo | .pdf | resumen_[nombre].pdf |

---

## Rubrica de Evaluacion

| Criterio | Puntos | Descripcion |
|----------|--------|-------------|
| **Weight breakdown** | 20 | Completo, coherente |
| **Calculo CG** | 25 | Correcto, SM adecuado |
| **Trade-off analysis** | 20 | Analisis claro, decision justificada |
| **Especificaciones** | 20 | Completas, consistentes |
| **Documentacion** | 15 | Profesional, clara |
| **Total** | 100 | |

---

## Proximos Pasos: Proyecto Capstone

Este ejercicio es preparacion para el capstone (30 horas adicionales):

1. **CAD Completo**: Todos los componentes modelados
2. **CFD Detallado**: Analisis de ala completa en XFLR5
3. **FEA Completo**: Estructura principal analizada
4. **Documentacion**: Memoria tecnica completa
5. **Presentacion**: Video + slides

---

*Ejercicio Modulo 05 - Diseno Integrado - FPUNA 2026*
