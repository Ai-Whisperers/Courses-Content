# Modulo 05: Diseno Integrado de Aeronaves

## Duracion: 4 horas

---

## Descripcion

Integra todos los conocimientos de los modulos anteriores para completar el diseno conceptual de tu UAV agricola. Realiza trade-off analysis, verifica centro de gravedad, y prepara documentacion tecnica.

---

## Objetivos de Aprendizaje

Al finalizar este modulo, podras:

1. **Integrar** subsistemas (aero, estructura, propulsion)
2. **Calcular** centro de gravedad y margen estatico
3. **Realizar** trade-off analysis con IA
4. **Verificar** performance general del diseno
5. **Documentar** el diseno de forma profesional

---

## Contenido

### Parte 1: Integracion de Subsistemas (1 hora)

| Tema | Descripcion |
|------|-------------|
| Revision de modulos | Verificar coherencia de datos |
| Layout 3D | Posicionar componentes en CAD |
| Conexiones | Interfaces entre subsistemas |
| Lista de pesos | Weight breakdown |

### Parte 2: Centro de Gravedad y Estabilidad (1 hora)

| Tema | Descripcion |
|------|-------------|
| Calculo de CG | Suma de momentos |
| Punto neutro | Posicion aerodinamica |
| Margen estatico | (Xnp - Xcg) / MAC |
| Ajuste de posiciones | Bateria como contrapeso |

### Parte 3: Trade-off Analysis (1 hora)

| Tema | Descripcion |
|------|-------------|
| Parametros clave | Peso, autonomia, costo |
| Analisis de sensibilidad | Que pasa si cambia X? |
| Optimizacion con IA | Encontrar punto optimo |
| Decisiones de diseno | Documentar trade-offs |

### Parte 4: Documentacion Tecnica (1 hora)

| Tema | Descripcion |
|------|-------------|
| Especificaciones | Tabla de specs finales |
| Dibujos 3-vistas | Planos tecnicos |
| Memoria de calculo | Resumen de analisis |
| Presentacion | Comunicar el diseno |

---

## Checklist de Diseno Final

### Aerodinamica (Modulo 02)
- [ ] Perfil seleccionado y justificado
- [ ] Polar verificada en XFLR5
- [ ] L/D de diseno documentado
- [ ] CL_max conocido

### Estructura (Modulo 03)
- [ ] Material de larguero seleccionado
- [ ] FEA ejecutado con FS > 1.5
- [ ] Deformacion aceptable (<5% envergadura)
- [ ] Peso estructural estimado

### Propulsion (Modulo 04)
- [ ] Motor/helice seleccionados
- [ ] Bateria dimensionada
- [ ] Autonomia >= 45 min (objetivo)
- [ ] Empuje estatico >= 1.5x peso

### Integracion (Modulo 05)
- [ ] Weight breakdown completo
- [ ] CG calculado
- [ ] Margen estatico 10-20% MAC
- [ ] Trade-offs documentados

---

## Formulas Clave

### Centro de Gravedad

```
Xcg = Sum(Wi * Xi) / Sum(Wi)
Ycg = Sum(Wi * Yi) / Sum(Wi)

Donde:
- Wi = Peso de cada componente
- Xi, Yi = Posicion de cada componente
```

### Margen Estatico

```
SM = (Xnp - Xcg) / MAC

Donde:
- Xnp = Punto neutro (~25% MAC para alas convencionales)
- Xcg = Centro de gravedad
- MAC = Cuerda aerodinamica media

Recomendado: SM = 10-15% (estable pero manejable)
```

### Verificacion de Performance

```
Velocidad de stall:
Vs = sqrt(2*W / (rho*S*CL_max))

Tasa de ascenso maxima:
RC_max = (P_avail - P_req) / W

Alcance maximo:
R = (E_bat/P) * V * eta
```

---

## Weight Breakdown Tipico UAV 4.5 kg

| Componente | Peso (g) | % MTOW | Posicion X (mm) |
|------------|----------|--------|-----------------|
| Estructura ala | 400 | 9% | Xcg_ala |
| Fuselaje | 300 | 7% | Xcg_fuselaje |
| Motor | 150 | 3% | Xmotor |
| ESC | 50 | 1% | Xesc |
| Bateria | 500 | 11% | Xbat (ajustable) |
| Payload (camara) | 800 | 18% | Xpayload |
| Tren de aterrizaje | 200 | 4% | Xtren |
| Servos, cableado | 150 | 3% | Varios |
| Receptor, telemetria | 100 | 2% | Xrx |
| **Subtotal** | **2650** | **59%** | |
| **Margen (40%)** | **1850** | **41%** | |
| **MTOW** | **4500** | **100%** | |

---

## Archivos del Modulo

```
05-aircraft-design/
├── README.md                    # Este archivo
├── content/
│   ├── 01-integracion.md
│   ├── 02-cg-estabilidad.md
│   └── 03-documentacion.md
├── EXERCISE.md                  # Ejercicio practico (capstone prep)
└── templates/
    ├── weight_breakdown.xlsx
    └── specs_template.md
```

---

## Conexion con Capstone

Este modulo prepara para el proyecto capstone:
- Weight breakdown se expande
- Documentacion se profundiza
- Analisis se completa

El capstone (30 horas extra) incluye:
- Modelo CAD completo
- Analisis CFD detallado
- Analisis FEA completo
- Presentacion tecnica

---

*Modulo 05 - Diseno Integrado - Track Aeronautica - FPUNA 2026*
