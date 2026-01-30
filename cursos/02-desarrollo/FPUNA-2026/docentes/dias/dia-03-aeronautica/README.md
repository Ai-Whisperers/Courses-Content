# Día 3: IA para Ingeniería Aeronáutica

## Información General

| Aspecto | Detalle |
|---------|---------|
| **Fecha** | Miércoles 4 de Febrero, 2026 |
| **Duración** | 2 horas |
| **Audiencia** | Ingeniería Aeronáutica |
| **Pre-requisito** | Día 1 completado con éxito |
| **Objetivo** | Usar IA para cálculos aerodinámicos, diseño y análisis |

---

## Setup Requerido ANTES de Clase

Ver: [SETUP-DIA-03.md](./SETUP-DIA-03.md) para instrucciones completas.

### Resumen Rápido

| Requisito | Obligatorio | Tiempo Estimado |
|-----------|-------------|-----------------|
| Día 1 completado | ✅ Sí | - |
| Python 3.11+ | ✅ Sí | 15 min |
| NumPy + Matplotlib | ✅ Sí | 10 min |
| Jupyter Notebook | ⚠️ Recomendado | 10 min |
| XFLR5 | ⚠️ Opcional | 20 min |
| OpenVSP | ⚠️ Opcional | 25 min |

**Tiempo total de setup adicional**: ~45-80 minutos

---

## Estructura de la Clase (2 horas)

### Módulo 1: IA en la Industria Aeronáutica (10 min)
- Casos reales: Boeing, Airbus, NASA usan IA
- Aplicaciones: diseño, CFD, mantenimiento predictivo
- ¿Qué podemos hacer nosotros con Claude?

### Módulo 2: Cálculos Aerodinámicos con IA (15 min)
- Demo: calcular número de Reynolds
- Generar ecuaciones y resolverlas paso a paso
- Verificar unidades y conversiones
- Ejercicio: cálculo de sustentación básico

### Módulo 3: Análisis de Perfiles Alares (15 min)
- Demo: obtener datos de perfiles NACA
- Interpretar coeficientes Cl, Cd, Cm
- Generar código Python para graficar polares
- Ejercicio: comparar NACA 0012 vs NACA 2412

### Break (10 min)

### Módulo 4: Sizing Preliminar de Aeronaves (15 min)
- Demo: dimensionamiento inicial de UAV
- Estimación de peso, envergadura, potencia
- Reglas de diseño preliminar
- Ejercicio: sizing de dron agrícola

### Módulo 5: IA para Documentación Técnica (15 min)
- Generar reportes de diseño
- Crear procedimientos de mantenimiento
- Documentar especificaciones técnicas
- Demo: generar checklist de pre-vuelo

### Módulo 6: Introducción a Scripts de Análisis (15 min)
- Demo: script Python para análisis de performance
- Gráficos de rendimiento
- Exportar resultados
- Ejercicio: modificar script para otro perfil

### Módulo 7: Cierre + Recursos (15 min)
- Herramientas avanzadas: XFLR5, OpenVSP
- Bases de datos de perfiles
- Q&A específico de aeronáutica
- Adelanto del Día 4

---

## Demos y Ejercicios

### Demo Principal: Análisis de Perfil NACA

```python
# Prompt: "Genera código Python para:
# 1. Definir perfil NACA 2412
# 2. Calcular coordenadas del perfil
# 3. Graficar la forma del perfil
# 4. Estimar Cl a diferentes ángulos de ataque"
```

### Ejercicios:
1. **Reynolds**: Calcular Re para condiciones de vuelo dadas
2. **Perfiles**: Comparar dos perfiles NACA
3. **Sizing**: Dimensionar UAV de 5kg de peso máximo
4. **Script**: Generar polar de arrastre

---

## Fórmulas Clave (para referencia)

### Número de Reynolds
```
Re = (ρ × V × L) / μ
```

### Sustentación
```
L = 0.5 × ρ × V² × S × Cl
```

### Arrastre
```
D = 0.5 × ρ × V² × S × Cd
```

### Donde:
- ρ = densidad del aire (kg/m³)
- V = velocidad (m/s)
- L = longitud característica (m)
- S = superficie alar (m²)
- μ = viscosidad dinámica (Pa·s)
- Cl, Cd = coeficientes aerodinámicos

---

## Verificación de Éxito

Al final del Día 3, cada estudiante debe poder:

- [ ] Realizar cálculos aerodinámicos con IA
- [ ] Obtener y analizar datos de perfiles NACA
- [ ] Ejecutar scripts Python para análisis
- [ ] Generar gráficos de rendimiento
- [ ] Documentar diseños con asistencia de IA

---

## Recursos Aeronáuticos

### Bases de Datos de Perfiles
- UIUC Airfoil Database: https://m-selig.ae.illinois.edu/ads/coord_database.html
- Airfoil Tools: http://airfoiltools.com/

### Software Especializado
- XFLR5: https://www.xflr5.tech/xflr5.htm (análisis de perfiles)
- OpenVSP: https://openvsp.org/ (diseño paramétrico)
- JavaFoil: https://www.mh-aerotools.de/airfoils/javafoil.htm

### Tablas y Referencias
- Standard Atmosphere: https://www.digitaldutch.com/atmoscalc/
- NACA Report Server: https://ntrs.nasa.gov/

---

*Día 3 - IA para Aeronáutica*
*FPUNA Verano 2026*
