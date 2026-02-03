# ⚠️ ADVERTENCIAS CRÍTICAS - Ingeniería Aeronáutica ⚠️

## LEER OBLIGATORIAMENTE ANTES DE USAR IA PARA DISEÑO DE AERONAVES

---

## 🔴 ADVERTENCIA FUNDAMENTAL

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   LOS ERRORES EN DISEÑO AERONÁUTICO PUEDEN SER FATALES     │
│                                                              │
│   La IA puede generar cálculos que:                         │
│   • Parecen correctos pero tienen errores sutiles           │
│   • Usan fórmulas aproximadas sin advertir limitaciones     │
│   • Ignoran factores críticos de seguridad                  │
│   • No consideran modos de falla                            │
│   • No están certificados por ninguna autoridad             │
│                                                              │
│   NINGÚN cálculo de IA reemplaza la certificación          │
│   aeronáutica profesional.                                  │
│                                                              │
│   VIDAS DEPENDEN DE LA INGENIERÍA CORRECTA.                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛑 LO QUE LA IA NO PUEDE HACER

### 1. Certificar Aeronaves

```
La IA NO puede:
• Emitir certificados de aeronavegabilidad
• Reemplazar a un ingeniero aeronáutico certificado
• Garantizar que un diseño es seguro para volar
• Aprobar materiales o procesos de fabricación
• Autorizar vuelos experimentales

SOLO las autoridades aeronáuticas (DINAC en Paraguay,
FAA, EASA, etc.) pueden certificar aeronaves.
```

### 2. Conocer Regulaciones Actuales

```
La IA tiene conocimiento con fecha de corte.
Las regulaciones cambian constantemente.

Para aeronáutica en Paraguay, consultar:
• DINAC (Dirección Nacional de Aeronáutica Civil)
• Regulaciones actualizadas en dinac.gov.py
• Categorías: ultraligero, experimental, certificado
```

### 3. Verificar Condiciones Reales

```
La IA calcula con supuestos ideales.
La realidad incluye:
• Turbulencia e impredecibilidad atmosférica
• Fatiga de materiales
• Errores de fabricación
• Desgaste por uso
• Condiciones ambientales extremas
• Factor humano (piloto)
```

---

## 🟠 LIMITACIONES ESPECÍFICAS DE CÁLCULOS IA

### Aerodinámica

| Cálculo | Limitación de IA |
|---------|------------------|
| Cl, Cd de perfiles | Datos de tablas, no CFD real |
| Interferencia ala-fuselaje | Aproximaciones empíricas |
| Efectos de compresibilidad | Ignora a baja velocidad |
| Flutter | Requiere análisis especializado |
| Stall | Comportamiento difícil de predecir |

**Resultado:** Los valores de IA son estimaciones iniciales, NO valores de diseño final.

### Estructuras

| Cálculo | Limitación de IA |
|---------|------------------|
| Cargas de vuelo | Distribuciones simplificadas |
| Fatiga | No puede predecir ciclos de vida |
| Materiales compuestos | Propiedades altamente variables |
| Concentradores de esfuerzo | Requiere FEM detallado |
| Modos de falla | No considera todos los modos |

**Resultado:** Usar factores de seguridad CONSERVADORES (1.5 mínimo, mejor 2.0+).

### Performance

| Cálculo | Limitación de IA |
|---------|------------------|
| Velocidad de stall | Depende de condiciones reales |
| Distancia de despegue | Varía con pista, viento, técnica |
| Techo de servicio | Afectado por temperatura, peso |
| Alcance | Consumo real puede variar 20%+ |

**Resultado:** Agregar márgenes significativos a todos los valores calculados.

---

## 🟡 PROCESO SEGURO DE DISEÑO

### Nivel 1: Académico/Conceptual (Lo que puedes hacer con IA)

```
✅ PERMITIDO:
• Cálculos iniciales de sizing
• Comparación de configuraciones
• Análisis de sensibilidad paramétrica
• Aprendizaje de conceptos
• Proyectos de clase (no para volar)

⚠️ REQUISITOS:
• Entender todas las fórmulas usadas
• Conocer limitaciones de cada aproximación
• Verificar resultados contra datos publicados
• Documentar todos los supuestos
```

### Nivel 2: Diseño Preliminar (Requiere supervisión)

```
⚠️ REQUIERE:
• Supervisión de ingeniero aeronáutico
• Validación con software certificado
• Comparación con aeronaves similares
• Revisión por pares

❌ NO confiar solo en IA para:
• Dimensionamiento estructural final
• Selección de materiales
• Análisis de estabilidad
• Certificación de performance
```

### Nivel 3: Diseño Detallado y Construcción

```
🛑 OBLIGATORIO:
• Ingeniero aeronáutico certificado a cargo
• Análisis estructural completo (FEM)
• Pruebas de materiales
• Pruebas de carga estáticas
• Revisión de autoridad aeronáutica
• Programa de ensayos de vuelo
```

---

## 🟢 FACTORES DE SEGURIDAD MÍNIMOS

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   FACTORES DE SEGURIDAD AERONÁUTICOS                        │
│                                                              │
│   Estructuras:                                              │
│   • Factor de carga límite a última: 1.5 mínimo             │
│   • Para diseño amateur: usar 2.0 o más                     │
│                                                              │
│   Performance:                                               │
│   • Velocidad de stall: agregar 10% margen                  │
│   • Distancia de despegue: agregar 25% margen               │
│   • Alcance: planificar solo 75% del calculado              │
│   • Combustible: reserva mínima 30 minutos                  │
│                                                              │
│   Estabilidad:                                               │
│   • Margen estático: mínimo 10% MAC                         │
│   • Rango de CG: más restrictivo que calculado              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 CHECKLIST ANTES DE CONFIAR EN CÁLCULO DE IA

### Verificación del Cálculo

- [ ] ¿Entiendo la fórmula que usó la IA?
- [ ] ¿Conozco las limitaciones de esa fórmula?
- [ ] ¿Las unidades son correctas (todo en SI)?
- [ ] ¿El resultado es razonable? (comparar con datos publicados)
- [ ] ¿Verifiqué el cálculo manualmente o con otra fuente?
- [ ] ¿Apliqué factores de seguridad apropiados?

### Verificación con Datos Reales

- [ ] ¿Comparé con aeronaves similares existentes?
- [ ] ¿Los valores están en rangos típicos de la categoría?
- [ ] ¿Consulté datos de fabricantes de componentes?
- [ ] ¿Revisé literatura técnica (Raymer, Anderson, Roskam)?

### Verificación Profesional

- [ ] ¿Un ingeniero aeronáutico revisó el diseño?
- [ ] ¿Se realizaron análisis con software certificado?
- [ ] ¿Se consideraron todos los modos de falla?
- [ ] ¿Hay plan de ensayos para validar?

---

## 🔵 QUÉ HACER SI QUIERES CONSTRUIR DE VERDAD

### Para Aeronaves Ultraligeras/Experimentales

```
1. ANTES de diseñar:
   - Estudiar regulaciones DINAC para ultraligeros
   - Contactar club o asociación de constructores
   - Encontrar mentor con experiencia

2. DURANTE diseño:
   - Usar diseños probados (plans, kits)
   - No innovar sin experiencia
   - Documentar TODO
   - Revisión por pares constante

3. ANTES de volar:
   - Inspección por autoridad competente
   - Pruebas de carga estáticas
   - Taxi tests extensivos
   - Programa de ensayos de vuelo gradual
   - Seguro apropiado
```

### Recursos en Paraguay

```
• DINAC: dinac.gov.py
• Clubes de aviación experimental
• Aeroclubes con programas de construcción
• Asociaciones de pilotos
```

---

## ⚫ CASOS REALES DE FALLAS

### Por Qué la Verificación es Crítica

```
Históricamente, accidentes han ocurrido por:

• Flutter no anticipado
  → Análisis simplificado no lo detectó

• Fatiga estructural
  → Material "correcto" pero ciclos subestimados

• Stall inesperado
  → Comportamiento diferente a lo calculado

• Falla de control
  → Superficies subdimensionadas

• Error de CG
  → Carga diferente a la planificada

CADA UNO de estos podría resultar de confiar
demasiado en cálculos no verificados.
```

---

## 🏁 CONCLUSIÓN

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   USA LA IA PARA:                                           │
│   ✓ Aprender conceptos                                      │
│   ✓ Explorar el espacio de diseño                          │
│   ✓ Hacer cálculos iniciales                               │
│   ✓ Generar código para análisis                           │
│   ✓ Comparar alternativas                                  │
│                                                              │
│   NO USES LA IA PARA:                                       │
│   ✗ Decisiones finales de diseño sin verificación          │
│   ✗ Certificar que algo es seguro para volar               │
│   ✗ Reemplazar ingeniería profesional                      │
│   ✗ Saltear el proceso de certificación                    │
│                                                              │
│   "En aviación, no hay segundas oportunidades.             │
│    Verifica TODO antes de volar."                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

*SAFETY-WARNINGS.md - Track 03 Aeronáutica - FPUNA 2026*
