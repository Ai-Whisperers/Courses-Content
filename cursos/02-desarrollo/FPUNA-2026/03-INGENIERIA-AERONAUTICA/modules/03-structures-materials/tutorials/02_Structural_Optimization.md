### Guía: Optimización Estructural

El objetivo de la optimización estructural es simple: **hacer la pieza lo más liviana posible sin que se rompa**.

#### 1. Optimización Paramétrica
Este es el enfoque más simple. Variamos las dimensiones de una pieza y recalculamos su resistencia y peso para encontrar la mejor combinación.

**Ejemplo**: Optimizar la sección de un larguero rectangular.
```python
# Pseudocódigo
for ancho in [10, 12, 14]:
    for alto in [15, 18, 20]:
        # Calcular Esfuerzo Máximo y Factor de Seguridad (FS)
        # Calcular Peso
        if FS >= 1.5:
            # Guardar esta combinación como válida
```
Al final, se elige la combinación válida que tenga el menor peso.

#### 2. Optimización Topológica
Esta es una técnica avanzada (disponible en ANSYS y Fusion 360) donde la IA elimina material de las zonas con bajo esfuerzo.
1.  **Definir Dominio**: Le dices al software "puedes quitar material de este bloque".
2.  **Establecer Objetivos**: "Minimizar el peso".
3.  **Establecer Restricciones**: "El esfuerzo no debe superar los 335 MPa" y "la deflexión no debe ser mayor a 50mm".
4.  **Resultado**: El software genera una forma "orgánica", similar a un hueso, que es increíblemente eficiente, usando material solo donde es estrictamente necesario. Esto a menudo resulta en reducciones de peso del 30-50%.

#### 3. Secciones Eficientes
No todas las formas son iguales. Para la misma cantidad de material (peso), algunas formas son mucho más resistentes a la flexión que otras.
- Un **perfil en I** es mucho más eficiente que una sección rectangular maciza porque concentra el material en los extremos (las "alas" o "flanges"), lejos del eje neutro, que es donde el esfuerzo de flexión es máximo.
- **Resultado**: Un larguero con perfil en I puede ser un 50% más ligero que uno rectangular con la misma rigidez.

#### 4. Agujeros de Alivianamiento (Lightening Holes)
Es la técnica clásica en aeronáutica. Se perforan agujeros en las costillas y otros paneles.
- **Efecto**: Se elimina material de las zonas centrales de un panel (que soportan poco esfuerzo) para reducir el peso.
- **Análisis**: Se debe usar FEA para asegurar que los agujeros no creen concentraciones de esfuerzo peligrosas en sus bordes.
- **Resultado**: Reducciones de peso de hasta un 40% en componentes como las costillas del ala.
