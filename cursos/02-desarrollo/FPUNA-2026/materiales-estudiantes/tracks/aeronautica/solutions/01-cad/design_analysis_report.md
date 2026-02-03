# Reporte de Análisis Estructural: Larguero de Ala UAV

**Ingeniero Responsable:** OpenCode AI  
**Fecha:** 28 de Enero de 2026

## 1. Definición del Problema

Se analiza la integridad estructural del larguero principal del ala de un UAV bajo condiciones de carga de maniobra.

**Datos de Diseño:**

- **Componente:** Larguero de ala (mitad envergadura)
- **Material:** Fibra de Carbono Unidireccional
  - Módulo de Young ($E$): 70 GPa
  - Esfuerzo de Fluencia ($\sigma_{yield}$): 600 MPa
- **Geometría:**
  - Sección: Rectangular, $b=15mm$, $h=25mm$
  - Longitud ($L$): 1000 mm (1 m)
- **Condición de Borde:** Empotrado en raíz (fuselaje), libre en punta.
- **Factor de Carga ($n$):** 3.5

**Cargas:**

- Peso total UAV ($W_{total}$): 3 kg $\approx$ 30 N
- Sustentación Total ($L_{total}$): $n \times W_{total} = 3.5 \times 30 N = 105 N$
- Sustentación por Semiala ($L_{semi}$): $105 N / 2 = 52.5 N$
- Carga Distribuida: Elíptica. Para simplificación conservadora en este análisis preliminar, usaremos una distribución **triangular** (máxima en raíz, cero en punta) que es más crítica que la elíptica para el momento en la raíz, o una **rectangular** equivalente.
  - _Asunción_: Usaremos carga distribuida uniformemente para análisis rápido (conservador en momento).
  - $q = L_{semi} / L = 52.5 N / 1 m = 52.5 N/m$

---

## 2. Propiedades de la Sección

- **Área ($A$):** $15 mm \times 25 mm = 375 mm^2 = 3.75 \times 10^{-4} m^2$
- **Inercia ($I_x$):** $\frac{b h^3}{12}$
  $$I_x = \frac{15 \times 25^3}{12} = \frac{15 \times 15625}{12} = 19,531.25 mm^4$$
  $$I_x \approx 1.953 \times 10^{-8} m^4$$
- **Distancia a fibra extrema ($c$):** $h / 2 = 12.5 mm = 0.0125 m$

---

## 3. Análisis de Esfuerzos (Flexión)

El momento máximo ($M_{max}$) ocurre en la raíz (empotramiento).
Para una viga en voladizo con carga uniforme $q$:

$$M_{max} = \frac{q L^2}{2}$$
$$M_{max} = \frac{52.5 N/m \times (1 m)^2}{2} = 26.25 N\cdot m$$

**Esfuerzo Máximo por Flexión ($\sigma_{max}$):**

$$\sigma_{max} = \frac{M_{max} \cdot c}{I_x}$$
$$\sigma_{max} = \frac{26.25 \cdot 0.0125}{1.953 \times 10^{-8}}$$
$$\sigma_{max} = \frac{0.328125}{1.953 \times 10^{-8}} \approx 16,801,075 Pa$$
$$\sigma_{max} \approx 16.8 MPa$$

---

## 4. Factor de Seguridad (FS)

$$FS = \frac{\sigma_{yield}}{\sigma_{max}}$$
$$FS = \frac{600 MPa}{16.8 MPa} \approx 35.7$$

**Resultado:** $FS = 35.7 \geq 1.5$
EL diseño es **SEGURO** (y probablemente sobredimensionado).

---

## 5. Deflexión Máxima

La deflexión máxima ($\delta_{max}$) ocurre en la punta.

$$\delta_{max} = \frac{q L^4}{8 E I}$$
$$\delta_{max} = \frac{52.5 \times 1^4}{8 \times 70\times 10^9 \times 1.953 \times 10^{-8}}$$
$$\delta_{max} = \frac{52.5}{10,936.8}$$
$$\delta_{max} \approx 0.0048 m = 4.8 mm$$

- Deflexión % de envergadura: $4.8mm / 1000mm = 0.48\%$ (Muy rígido).

---

## 6. Verificación de Pandeo (Euler)

Critico si existieran cargas de compresión axial importantes (ej: drag fuerte o componentes de peso en picada).
Carga Crítica ($P_{cr}$) para columna empotrada-libre ($K=2$):

$$P_{cr} = \frac{\pi^2 E I}{(K L)^2}$$
$$P_{cr} = \frac{\pi^2 \times 70\times 10^9 \times 1.953 \times 10^{-8}}{(2 \times 1)^2}$$
$$P_{cr} = \frac{13,493}{4} \approx 3,373 N$$

Si la fuerza de drag es < 3300 N (lo cual es seguro para un UAV de 3kg), no hay riesgo de pandeo global por drag pura.

---

## 7. Conclusiones y Recomendaciones

1.  **Integridad:** El diseño actual es extremadamente seguro ($FS > 35$).
2.  **Eficiencia:** El diseño es **ineficiente** (demasiado pesado par la carga).
3.  **Peso del Larguero:**
    - Volumen: $A \times L = 3.75 \times 10^{-4} m^3$
    - Masa: $\rho \times Vol = 1600 \times 3.75 \times 10^{-4} = 0.6 kg = 600g$
    - Este solo larguero pesa el 20% del peso total del UAV (3kg). Es excesivo.

**Recomendación de Optimización:**

- Reducir la sección a un tubo de carbono o una sección tipo "I".
- Ejemplo: Tubo de carbono OD 12mm, ID 10mm reduciría el peso significativamente manteniendo suficiente rigidez.
- O cambiar material a madera/balsa reforzada para esta escala de carga.

---

_Generado por OpenCode AI Assistant_
