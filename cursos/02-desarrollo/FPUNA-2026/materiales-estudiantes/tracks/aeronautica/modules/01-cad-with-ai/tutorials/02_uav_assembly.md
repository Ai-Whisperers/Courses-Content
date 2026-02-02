### Tutorial: Ensamblar UAV Completo

**Componentes**:
1. Fuselaje (diseñado anteriormente)
2. Alas (derecha e izquierda)
3. Empenaje horizontal (estabilizador)
4. Empenaje vertical (timón)
5. Motor + hélice
6. Tren de aterrizaje

**Secuencia de ensamblaje**:

```
Assembly → Nuevo ensamblaje:

1. Insertar fuselaje:
   - Constraint: Fixed (origen en nariz)
   
2. Insertar ala derecha:
   - Mate: Superficie montaje ala → superficie fuselaje
   - Align: Larguero ala → eje longitudinal fuselaje
   - Offset: +20mm vertical (diedro 3°)
   
3. Insertar ala izquierda:
   - Mirror: Simetría respecto plano XZ
   
4. Empenaje horizontal:
   - Mate: Superficie montaje → cola fuselaje
   - Align: Eje empenaje → eje longitudinal
   - Distance: 1000mm desde nariz
   
5. Empenaje vertical:
   - Mate: Centro empenaje → eje longitudinal
   - Align: Eje vertical → eje Z
   
6. Motor:
   - Insert: Eje motor → agujero patrón circular cola
   - Rotate: Alinear tornillos con agujeros

7. Hélice:
   - Coaxial: Eje hélice → eje motor
   - Offset: 50mm desde motor (clearance)
```

### Análisis de Interferencias

**Verificar colisiones**:
```
Fusion 360:
Inspect → Interference:
- Seleccionar todos los componentes
- Compute
- Resultado esperado: 0 interferencias

Si hay interferencias:
- Ajustar offsets
- Redimensionar componentes
- Verificar tolerancias
```

### Centro de Gravedad del Ensamblaje

**Crítico para estabilidad de vuelo**:
```
Inspect → Center of Mass:

Objetivo: CG entre 25%-30% de cuerda media aerodinámica

Si CG está mal ubicado:
- Reubicar batería (componente más pesado)
- Agregar lastre en nariz/cola
- Rediseñar distribución de componentes
```