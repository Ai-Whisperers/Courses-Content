# Fundamentos de CAD Aeronautico

## 1. Introduccion

El diseno asistido por computadora (CAD) es fundamental en ingenieria aeronautica moderna. Todo componente, desde un pequeno soporte hasta un ala completa, pasa por CAD antes de fabricarse.

### Flujo de Trabajo Aeronautico

```
Concepto -> CAD 3D -> Analisis (CFD/FEA) -> Prototipo -> Pruebas -> Produccion
              ^                   |
              |___________________|
                 Iteracion
```

### Por que CAD con IA?

| Tradicional | Con IA |
|-------------|--------|
| Buscar formulas en libros | IA proporciona ecuaciones |
| Calcular a mano coordenadas | IA genera geometria |
| Probar configuraciones una a una | IA sugiere optimos |
| Documentar manualmente | IA genera reportes |

---

## 2. Sistemas de Coordenadas Aeronauticos

### Convencion Estandar

```
         +Z (arriba)
          |
          |
          |_______ +Y (ala derecha)
         /
        /
       +X (nariz)
```

| Eje | Direccion | Movimiento |
|-----|-----------|------------|
| X | Nariz -> Cola | Longitudinal |
| Y | Izquierda -> Derecha | Lateral |
| Z | Abajo -> Arriba | Vertical |

### En Fusion 360 / FreeCAD

Por defecto estos programas usan Z-up, que coincide con la convencion aeronautica. **No cambiar la orientacion predeterminada.**

---

## 3. Unidades y Precision

### Sistema Internacional (SI) - OBLIGATORIO

| Parametro | Unidad | Ejemplo |
|-----------|--------|---------|
| Longitud | metros (m) | Envergadura: 2.5 m |
| Masa | kilogramos (kg) | MTOW: 5 kg |
| Fuerza | Newtons (N) | Sustentacion: 49 N |
| Presion | Pascales (Pa) | Presion dinamica: 138 Pa |
| Velocidad | m/s | Crucero: 15 m/s |

### Tolerancias Tipicas

| Componente | Tolerancia | Razon |
|------------|------------|-------|
| Perfiles aerodinamicos | +/- 0.1 mm | Performance |
| Estructura primaria | +/- 0.5 mm | Ajuste |
| Accesorios | +/- 1.0 mm | Funcionalidad |

---

## 4. Interfaz de Fusion 360

### Navegacion Basica

| Accion | Atajo |
|--------|-------|
| Orbitar | Click medio + arrastrar |
| Pan | Shift + Click medio |
| Zoom | Scroll |
| Fit all | F |
| Home view | Ctrl + 0 |

### Herramientas Esenciales

1. **Sketch (Boceto)**
   - Linea, Arco, Spline
   - Restricciones (coincidente, tangente, etc.)
   - Dimensiones parametricas

2. **Solidos**
   - Extrude (extruir)
   - Revolve (revolucionar)
   - Loft (barrido)
   - Sweep (barrido por camino)

3. **Superficies**
   - Patch (parche)
   - Ruled (reglada)
   - Loft de superficie

---

## 5. Modelado Parametrico

### Que es?

Crear modelos donde las dimensiones son **variables**, no numeros fijos.

### Ejemplo: Ala Parametrica

```
# Variables
cuerda_raiz = 0.4      # metros
cuerda_punta = 0.2     # metros
envergadura = 2.5      # metros
taper_ratio = cuerda_punta / cuerda_raiz

# El modelo usa estas variables
# Cambiar cuerda_raiz actualiza TODO el modelo
```

### Beneficios

1. **Iteracion rapida**: Cambiar un numero actualiza todo
2. **Estudios parametricos**: Variar sistematicamente
3. **Documentacion**: Las variables son auto-explicativas
4. **Reutilizacion**: Adaptar a diferentes proyectos

---

## 6. Importar Perfiles NACA

### Formato de Coordenadas

Los perfiles se definen como listas de puntos (X, Y):

```
# NACA 0012 (fragmento)
1.00000  0.00000
0.95000  0.01234
0.90000  0.02345
...
0.00000  0.00000
...
0.90000 -0.02345
0.95000 -0.01234
1.00000  0.00000
```

### Pasos en Fusion 360

1. **Crear Sketch** en plano XZ
2. **Insert -> Insert Spline** -> Through Points
3. **Pegar coordenadas** o importar CSV
4. **Escalar** a la cuerda deseada
5. **Cerrar** el perfil si es necesario

### Usar IA para Generar Coordenadas

Prompt:
```
Genera coordenadas NACA 4412, 60 puntos, formato X,Y separado por comas.
Cuerda = 1.0 (normalizada).
Distribucion coseno para mas puntos en borde de ataque.
```

---

## 7. Verificacion de Modelos

### Checklist Antes de Exportar

- [ ] Unidades correctas (metros)
- [ ] Modelo es solido cerrado (watertight)
- [ ] Sin auto-intersecciones
- [ ] Propiedades de masa razonables
- [ ] Variables bien nombradas

### Herramientas de Verificacion

**En Fusion 360:**
- Inspect -> Component Color Cycling (ver si hay errores)
- Inspect -> Section Analysis (cortar y ver interior)
- Properties -> Physical (masa, volumen, CG)

---

## 8. Ejercicio Guiado: Cilindro Parametrico

Practica basica antes de modelar componentes aeronauticos.

### Paso 1: Crear Variables
```
diametro = 50 mm
altura = 100 mm
```

### Paso 2: Sketch
1. Nuevo Sketch en plano XY
2. Dibujar circulo centrado en origen
3. Dimension = diametro (usar variable)

### Paso 3: Extrusion
1. Extrude el circulo
2. Distance = altura (usar variable)

### Paso 4: Verificar
1. Cambiar diametro a 60 mm
2. El modelo debe actualizarse automaticamente

### Paso 5: Exportar
1. File -> Export
2. Formato: STEP
3. Nombre: cilindro_parametrico.step

---

## Resumen

| Concepto | Clave |
|----------|-------|
| Coordenadas | X adelante, Y derecha, Z arriba |
| Unidades | Siempre SI (metros, kg, N) |
| Parametrizacion | Usar variables, no numeros |
| Verificacion | Checklist antes de exportar |

---

*Siguiente: 02-modelado-alas.md*
