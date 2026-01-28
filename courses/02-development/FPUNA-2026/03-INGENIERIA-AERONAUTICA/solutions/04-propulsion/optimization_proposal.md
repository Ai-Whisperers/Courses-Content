# Propuesta de Optimización Propulsiva (Objetivo: 45 min)

## Análisis de Opciones

| Configuración                     | Peso Total (kg) | Potencia Crucero (W) | Batería (Wh) | Autonomía Est. (min) | Costo Extra (USD) | Viabilidad   |
| :-------------------------------- | :-------------- | :------------------- | :----------- | :------------------- | :---------------- | :----------- |
| **Base (Actual)**                 | 3.0             | 100                  | 74           | 28                   | 0                 | Baja         |
| **1. Batería Doble (2x 5Ah)**     | 3.5             | 115 (mayor peso)     | 148          | **51**               | 60                | **Alta**     |
| **2. Li-Ion 4S 10Ah**             | 3.2             | 105                  | 140          | **53**               | 80                | **Muy Alta** |
| **3. Motor bajo KV + Hélice 15"** | 3.1             | 90                   | 74           | 31                   | 120               | Media        |
| **4. Li-Ion + Hélice 15"**        | 3.3             | 95                   | 140          | **59**               | 200               | Alta         |

## Selección Óptima: Configuración #2 (Li-Ion 18650 Pack)

**Justificación:**

- Las celdas Li-Ion (tipo NCR18650GA o 21700) tienen mucha mayor densidad energética que las LiPo (250 Wh/kg vs 150 Wh/kg).
- Un pack 4S3P (10500 mAh) pesaría solo ~600g (apenas 100g más que la LiPo actual de 5000mAh).
- El incremento de peso es marginal, manteniendo la potencia de crucero casi igual.
- El costo es razonable y se pueden ensamblar localmente si se dispone de spot welder.

## Plan de Implementación

1.  **Adquisición:** 12 celdas Samsung 35E o Molicel P42A.
2.  **Ensamble:** Pack 4S3P (14.8V nominal, 10.5Ah).
3.  **Prueba:** Carga/Descarga controlada.
4.  **Vuelo:** Verificar temperatura en full throttle (Li-Ion sufre con altas corrientes, pero en crucero <10A es perfecto).

## Resultado Esperado

- **Autonomía:** 50-55 minutos.
- **Peso:** 3.2 kg (dentro de límites).
- **Costo:** ~USD 80-100.
- **Objetivo 45 min:** SUPERADO ✅.

---

_Generado por OpenCode AI Assistant_
