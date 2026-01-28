# Ficha Técnica: UAV Agrícola "Guaraní-01"

**Versión:** 1.0  
**Fecha:** 28 Enero 2026  
**Certificación Objetivo:** DINAC Experimental

---

## 1. Especificaciones Generales

| Parámetro                          | Valor               | Unidad        |
| :--------------------------------- | :------------------ | :------------ |
| **Tipo**                           | Ala Fija, Monomotor | -             |
| **Envergadura**                    | 2.0                 | m             |
| **Longitud (LOA)**                 | 1.1                 | m             |
| **Altura**                         | 0.35                | m             |
| **Peso Vacío (MTOW)**              | 1.8                 | kg            |
| **Peso Máximo al Despegue (MTOW)** | 3.5                 | kg            |
| **Carga Útil (Payload)**           | 0.8                 | kg (Sensores) |

---

## 2. Performance Estimado

| Parámetro                              | Valor             | Notas                  |
| :------------------------------------- | :---------------- | :--------------------- |
| **Velocidad Crucero ($V_c$)**          | 16 m/s (58 km/h)  | Eficiencia máxima      |
| **Velocidad de Pérdida ($V_s$)**       | 10 m/s (36 km/h)  | @ MTOW, Flaps down     |
| **Velocidad Nunca Exceder ($V_{ne}$)** | 28 m/s (100 km/h) | Estructural            |
| **Autonomía**                          | 45 min            | @ V_c                  |
| **Alcance Operativo**                  | 40 km             | Sin viento             |
| **Techo de Servicio**                  | 3000 m (MSL)      | 120m AGL (Regulatorio) |

---

## 3. Propulsión

- **Motor:** T-Motor MN3510 KV630
- **Hélice:** 13x5 Fibra de Carbono (Paso Fijo)
- **Batería:** LiPo 4S 10000mAh 25C
- **ESC:** 40A Brushless con BEC 5V/3A

---

## 4. Estructura y Materiales

- **Fuselaje:** Composite (Fibra de vidrio/Epoxy) sobre núcleo de espuma perdida.
- **Alas:** Núcleo de EPS de alta densidad, recubrimiento de balsa 1mm + Monokote.
  - **Larguero:** Tubo de fibra de carbono pultruido 12mm.
- **Empenajes:** Estructura de balsa enjaretada.
- **Tren de Aterrizaje:** Triciclo fijo, varilla de acero 4mm.

---

## 5. Aviónica y Control

- **Flight Controller:** Pixhawk 6C (ArduPilot Firmware)
- **GPS:** Doble GPS M8N con Compass
- **Telemetría:** Radio 915 MHz (Alcance 5km)
- **Radio Control:** 2.4 GHz TBS Crossfire
- **Payload:** Cámara Multiespectral (e.g., Mapir Survey3)

---

## 6. Diagrama de 3 Vistas

_(Espacio reservado para diagramas generados en CAD)_

- **Planta:** Ala rectangular con winglets.
- **Perfil:** Fuselaje pod-and-boom.
- **Frente:** Diedro 3 grados.

---

**Nota:** Valores sujetos a verificación en pruebas de vuelo (Módulo 05).
