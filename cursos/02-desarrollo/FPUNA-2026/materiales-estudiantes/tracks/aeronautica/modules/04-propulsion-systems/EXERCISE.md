# Ejercicio Modulo 04: Dimensionamiento del Sistema de Propulsion

## Tiempo Estimado: 90 minutos

---

## Objetivo

Dimensionar completamente el sistema de propulsion de tu UAV agricola: calcular potencia requerida, seleccionar motor/helice/bateria, y estimar autonomia real.

---

## Datos del UAV (de modulos anteriores)

| Parametro | Valor |
|-----------|-------|
| MTOW | 4.5 kg |
| Velocidad crucero | 14 m/s |
| Superficie alar | ____ m^2 |
| CD0 (del Modulo 02) | ~0.035 |
| AR | ~8 |
| e (Oswald) | 0.8 |

---

## Parte 1: Potencia Requerida (25 min)

### Tarea 1.1: Calcular Arrastre en Crucero

```python
# Completar los valores
rho = 1.15  # kg/m^3 (Paraguay, 30C)
V = 14      # m/s
S = ____    # m^2 (tu superficie alar)
W = 4.5 * 9.81  # N

# Presion dinamica
q = 0.5 * rho * V**2  # = ____ Pa

# CL en crucero (L = W)
CL = W / (q * S)  # = ____

# CD total
CD0 = 0.035
AR = 8
e = 0.8
CDi = CL**2 / (3.14159 * AR * e)
CD = CD0 + CDi  # = ____

# Arrastre
D = q * S * CD  # = ____ N

# Potencia requerida
P_req = D * V  # = ____ W
```

### Tarea 1.2: Verificar con IA

```
Para un UAV de 4.5 kg volando a 14 m/s:
- Superficie alar: [valor] m^2
- CD0: 0.035
- AR: 8
- Eficiencia Oswald: 0.8
- Densidad: 1.15 kg/m^3

Calcula:
1. Potencia requerida en crucero
2. Potencia para ascenso a 2 m/s
3. Potencia maxima (velocidad maxima estimada)

Muestra cada paso.
```

### Tarea 1.3: Resumen de Potencias

| Condicion | Potencia (W) |
|-----------|--------------|
| Crucero | |
| Ascenso 2 m/s | |
| Maxima | |

---

## Parte 2: Seleccion de Motor y Helice (25 min)

### Tarea 2.1: Requerimientos del Motor

```
Potencia motor requerida = P_crucero / eta_helice
                        = ____ W / 0.75
                        = ____ W

Agregar margen 50% para maniobras:
P_motor_min = ____ * 1.5 = ____ W
```

### Tarea 2.2: Consulta a IA para Seleccion

```
Necesito seleccionar motor y helice para UAV:
- Potencia requerida: [valor] W (minimo)
- Empuje estatico requerido: ~70N (1.5x peso)
- Bateria: 4S LiPo (14.8V nominal)
- Presupuesto: limitado

Sugiere 2-3 combinaciones motor+helice comerciales.
Para cada una indica:
- Modelo de motor (Kv, potencia)
- Helice (diametro x paso)
- Empuje estatico estimado
- Corriente tipica en crucero
- Eficiencia esperada
```

### Tarea 2.3: Seleccion Final

| Componente | Seleccion | Especificaciones |
|------------|-----------|------------------|
| Motor | | Kv, Pmax, Imax |
| Helice | | DxP, material |
| ESC | | Corriente continua |

---

## Parte 3: Bateria y Autonomia (25 min)

### Tarea 3.1: Seleccion de Bateria

Para 4S LiPo:
- Voltaje nominal: 14.8V
- Voltaje cargada: 16.8V
- Voltaje minima segura: 14.0V (3.5V/celda)

Capacidades comerciales: 3000, 4000, 5000, 6000 mAh

### Tarea 3.2: Calculo de Autonomia

```python
# Parametros
V_bat = 14.8  # V (nominal)
Cap_mAh = ____  # mAh (elegir)
Cap_Ah = Cap_mAh / 1000

# Energia disponible (usar 80% para seguridad)
E_total = V_bat * Cap_Ah  # Wh
E_usable = E_total * 0.8  # Wh

# Consumo en crucero
P_crucero = ____  # W (del Tarea 1)

# Autonomia
t_horas = E_usable / P_crucero
t_minutos = t_horas * 60

print(f"Autonomia: {t_minutos:.1f} minutos")
```

### Tarea 3.3: Iteracion

Si la autonomia no cumple requisito (45 min), ajustar:
- Aumentar capacidad de bateria (mas peso)
- Reducir velocidad de crucero (menor P_req)
- Optimizar aerodinamica (menor CD)

| Opcion | Capacidad | Peso bateria | Autonomia |
|--------|-----------|--------------|-----------|
| A | 5000 mAh | ~400g | ____ min |
| B | 6000 mAh | ~500g | ____ min |
| C | 8000 mAh | ~650g | ____ min |

**Nota**: Si aumentas peso de bateria, debes recalcular P_requerida.

### Tarea 3.4: Seleccion Final Bateria

Bateria seleccionada: ________________

Autonomia estimada: ____ minutos

---

## Parte 4: Ejecutar Codigo de Ejemplo (15 min)

### Tarea 4.1: Probar telemetry_monitor.py

```bash
cd codigo-ejemplos/propulsion
python telemetry_monitor.py
```

Observar:
- Como detecta fallas
- Formato de alertas
- Indicadores simplificados

### Tarea 4.2: Documentar Observaciones

Que escenarios de falla detecta el sistema?
1. 
2. 
3. 

---

## Entregables

| Item | Formato | Nombre |
|------|---------|--------|
| Calculos de potencia | .pdf o .ipynb | potencia_[nombre].pdf |
| Seleccion componentes | Tabla en documento | |
| Calculo autonomia | Incluido | |
| Observaciones codigo | Incluido | |

---

## Rubrica de Evaluacion

| Criterio | Puntos | Descripcion |
|----------|--------|-------------|
| **Potencia requerida** | 25 | Calculos correctos |
| **Seleccion motor/helice** | 25 | Justificada, coherente |
| **Calculo autonomia** | 25 | Realista, con margenes |
| **Uso de codigo** | 15 | Ejecutado y documentado |
| **Documentacion** | 10 | Clara, completa |
| **Total** | 100 | |

---

## Preguntas de Reflexion

1. Por que no simplemente usar la bateria mas grande disponible?

2. Que pasa con la eficiencia si vuelas mas rapido que la velocidad de diseno?

3. Como afecta la temperatura ambiente (Paraguay en verano) al rendimiento del motor?

---

*Ejercicio Modulo 04 - Sistemas de Propulsion - FPUNA 2026*
