# Análisis Estructural: Larguero Optimizado de Ala UAV

**Ingeniero Responsable:** OpenCode AI  
**Fecha:** 28 de Enero de 2026

## 1. Datos de Entrada (Diseño Optimizado)

- **Material:** Aluminio 7075-T6
  - $\sigma_{yield} = 503 \text{ MPa}$
  - $E = 71.7 \text{ GPa}$
  - $\rho = 2810 \text{ kg/m}^3$
- **Sección Transversal:** Rectangular sólida
  - $b = 12 \text{ mm}$
  - $h = 16 \text{ mm}$
- **Geometría:** Viga en voladizo, $L = 1000 \text{ mm}$ (1 m)
- **Carga:** Uniformemente distribuida
  - Fuerza Total $L_{semi} = 111.8 \text{ N}$ (Sustentación factorizada $n=3.8$ para peso 3kg?)
  - _Nota_: Si $n=3.8$ y $W=3kg \approx 30N$, $L_{total} = 114N$. $L_{semi} \approx 57N$.
  - El prompt indica $q_0 = 111.8 \text{ N/m}$. Esto implica una carga total de $111.8 \text{ N}$ en 1 m. Asumiremos este valor conservador.
  - $q(x) = 111.8 \text{ N/m}$

---

## 2. Diagramas de Esfuerzo

**Fuerza Cortante ($V$)**
Máximo en el empotramiento ($x=0$):
$$V_{max} = q \cdot L = 111.8 \text{ N/m} \cdot 1 \text{ m} = 111.8 \text{ N}$$

**Momento Flector ($M$)**
Máximo en el empotramiento ($x=0$):
$$M_{max} = \frac{q \cdot L^2}{2} = \frac{111.8 \cdot 1^2}{2} = 55.9 \text{ N}\cdot\text{m}$$

---

## 3. Propiedades de Sección

- **Área ($A$):** $12 \cdot 16 = 192 \text{ mm}^2$
- **Inercia ($I_x$):** $\frac{b h^3}{12} = \frac{12 \cdot 16^3}{12} = 4096 \text{ mm}^4 = 4.096 \times 10^{-9} \text{ m}^4$
- **Distancia neutra ($c$):** $h/2 = 8 \text{ mm} = 0.008 \text{ m}$

---

## 4. Cálculo de Esfuerzos

**Esfuerzo Normal Máximo (Flexión):**
$$\sigma_{max} = \frac{M_{max} \cdot c}{I_x}$$
$$\sigma_{max} = \frac{55.9 \cdot 0.008}{4.096 \times 10^{-9}} = \frac{0.4472}{4.096 \times 10^{-9}} \approx 109,179,687 \text{ Pa}$$
$$\sigma_{max} \approx 109.2 \text{ MPa}$$

**Esfuerzo Cortante Máximo (en eje neutro):**
Para sección rectangular:
$$\tau_{max} = \frac{3}{2} \frac{V_{max}}{A} = 1.5 \cdot \frac{111.8}{192 \times 10^{-6}} \approx 873,437 \text{ Pa} \approx 0.87 \text{ MPa}$$
_El cortante es despreciable comparado con la flexión._

---

## 5. Verificación de Seguridad

**Factor de Seguridad (Fluencia):**
$$FS = \frac{\sigma_{yield}}{\sigma_{max}} = \frac{503 \text{ MPa}}{109.2 \text{ MPa}} \approx 4.6$$

**Criterio:** $FS \ge 1.5$.
**Resultado:** $4.6 \ge 1.5$ $\rightarrow$ **CUMPLE HOLGADAMENTE**.

---

## 6. Verificación de Rigidez (Deflexión)

**Deflexión Máxima ($\delta_{max}$ en punta):**
$$\delta_{max} = \frac{q L^4}{8 E I} = \frac{111.8 \cdot 1^4}{8 \cdot 71.7 \times 10^9 \cdot 4.096 \times 10^{-9}}$$
$$\delta_{max} = \frac{111.8}{2,349,465,600 \cdot 10^{-9}} \approx \frac{111.8}{2349.5} \approx 0.0476 \text{ m}$$
$$\delta_{max} = 47.6 \text{ mm}$$

**Criterio:** $\delta_{max} < 5\%$ de envergadura ($50 \text{ mm}$).
**Resultado:** $47.6 \text{ mm} < 50 \text{ mm}$ $\rightarrow$ **CUMPLE** (pero está cerca del límite).

---

## 7. Análisis de Peso

**Peso del Larguero:**
$$Peso = \rho \cdot A \cdot L = 2810 \cdot 1.92 \times 10^{-4} \cdot 1 \approx 0.54 \text{ kg} = 540 \text{ g}$$

**Comparación:**

- Diseño Anterior (Carbono 15x25): 600 g (pero FS=35)
- Este Diseño (Aluminio 12x16): 540 g (FS=4.6)
- Ahorro de peso: 60g (-10%) pero mucho más barato y fácil de mecanizar localmente en Paraguay.

---

## 8. Recomendaciones

1.  **Aprobado para Fabricación:** El diseño cumple con los criterios de resistencia y rigidez.
2.  **Optimización Adicional:**
    - El FS=4.6 sugiere que aún sobra material.
    - Se podría reducir la anchura $b$ hacia la punta (tapered spar) ya que el momento flector decae cuadráticamente.
    - Perforaciones (lightening holes) no recomendadas en sección sólida tan pequeña, mejor usar perfil en "I" si se requiere bajar más peso.
3.  **Fabricación:**
    - Usar barra cuadrada comercial de 5/8" (15.875mm) x 1/2" (12.7mm) si disponible, o fresar de plancha.

---

_Generado por OpenCode AI Assistant_
