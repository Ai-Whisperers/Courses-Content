# Biblioteca de Prompts: Análisis de Datos
## Prompts para Análisis Estadístico y Visualización

---

## 1. Exploración de Datos

### 1.1 Análisis Inicial

```
Tengo un dataset con las siguientes características:

COLUMNAS: [listar nombres y tipos]
FILAS: [número aproximado]
FUENTE: [origen de los datos]

Genera código Python para:
1. Cargar el dataset
2. Mostrar primeras filas
3. Información de tipos de datos
4. Estadísticas descriptivas
5. Conteo de valores faltantes
6. Distribución de variables categóricas
```

### 1.2 Identificar Problemas de Datos

```
Mi dataset tiene estos problemas potenciales:

MUESTRA DE DATOS:
[Pegar primeras filas o describe problemas]

Identifica:
1. Valores faltantes (patrón)
2. Outliers potenciales
3. Inconsistencias en formato
4. Duplicados posibles
5. Problemas de codificación

Sugiere estrategia de limpieza para cada problema.
```

---

## 2. Limpieza de Datos

### 2.1 Imputación de Valores Faltantes

```
Tengo valores faltantes en mi dataset:

COLUMNA: [nombre]
TIPO: [numérica/categórica]
% FALTANTE: [X%]
PATRÓN: [aleatorio/sistemático]
RELACIÓN CON OTRAS VARIABLES: [si conocida]

Sugiere y genera código para:
1. Método de imputación apropiado
2. Justificación del método
3. Verificación post-imputación
```

### 2.2 Tratamiento de Outliers

```
Tengo potenciales outliers en:

VARIABLE: [nombre]
DISTRIBUCIÓN: [normal/sesgada/desconocida]
VALORES SOSPECHOSOS: [listar o describir]
CONTEXTO: [qué representa la variable]

Genera código para:
1. Detectar outliers (IQR y Z-score)
2. Visualizar outliers
3. Decidir tratamiento (eliminar/transformar/mantener)
4. Documentar decisiones
```

---

## 3. Selección de Pruebas Estadísticas

### 3.1 Comparación de Grupos

```
Necesito comparar grupos:

VARIABLE DEPENDIENTE: [nombre, tipo, distribución]
GRUPOS: [número y descripción]
DISEÑO: [independiente/pareado]
TAMAÑO DE MUESTRA: [n por grupo]
SUPUESTOS:
- Normalidad: [sí/no/desconocido]
- Homogeneidad de varianzas: [sí/no/desconocido]

Recomienda:
1. Prueba estadística apropiada
2. Alternativa no paramétrica
3. Código Python/R para implementar
4. Cómo reportar resultados
```

### 3.2 Correlación/Asociación

```
Quiero analizar la relación entre:

VARIABLE 1: [nombre, tipo]
VARIABLE 2: [nombre, tipo]
TAMAÑO DE MUESTRA: [N]
HIPÓTESIS: [dirección si la hay]

Sugiere:
1. Tipo de correlación/asociación apropiada
2. Código para calcular
3. Cómo visualizar
4. Cómo interpretar y reportar
```

### 3.3 Predicción/Modelado

```
Quiero predecir:

VARIABLE OBJETIVO: [nombre, tipo]
PREDICTORES: [listar]
TAMAÑO DE MUESTRA: [N]
OBJETIVO: [explicación/predicción]

Recomienda:
1. Tipo de modelo apropiado
2. Pasos de preparación de datos
3. Código para ajustar modelo
4. Métricas de evaluación
5. Cómo interpretar coeficientes
```

---

## 4. Código de Análisis

### 4.1 T-test Completo

```
Genera código Python para un t-test completo:

DATOS:
- Grupo 1: columna "[nombre]" donde [condición]
- Grupo 2: columna "[nombre]" donde [condición]

Incluir:
1. Verificación de supuestos (normalidad, varianzas)
2. T-test (tipo apropiado)
3. Tamaño del efecto (Cohen's d)
4. Intervalos de confianza
5. Reporte en formato APA
```

### 4.2 ANOVA Completo

```
Genera código Python para ANOVA:

DISEÑO: [one-way/two-way/repeated measures]
VARIABLE DEPENDIENTE: [nombre]
FACTORES: [listar]
GRUPOS: [describir niveles]

Incluir:
1. Verificación de supuestos
2. ANOVA con tamaño del efecto (eta²)
3. Post-hoc si significativo
4. Visualización
5. Reporte en formato APA
```

### 4.3 Regresión

```
Genera código Python para regresión:

TIPO: [lineal simple/múltiple/logística]
VARIABLE DEPENDIENTE: [nombre, tipo]
PREDICTORES: [listar]

Incluir:
1. Preparación de datos
2. Ajuste del modelo
3. Diagnóstico de supuestos
4. Interpretación de coeficientes
5. Métricas de ajuste (R², AIC, etc.)
6. Visualización de resultados
```

---

## 5. Visualización Científica

### 5.1 Gráfico de Comparación

```
Genera código Python para gráfico de comparación de grupos:

TIPO: [barras/boxplot/violin]
DATOS: [describir estructura]
GRUPOS: [variable de agrupación]
VALOR: [variable a mostrar]
ESTILO: [publicación científica]

Requisitos:
- Barras de error (SEM o IC 95%)
- Etiquetas claras
- Resolución 300 DPI
- Colores accesibles
- Formato para [revista/poster/presentación]
```

### 5.2 Gráfico de Correlación

```
Genera código Python para visualizar correlación:

VARIABLES: [X] y [Y]
N: [tamaño de muestra]
ELEMENTOS A INCLUIR:
- Línea de regresión
- Intervalo de confianza
- Valor de r y p
- Ecuación de la línea

Formato para publicación científica.
```

### 5.3 Panel de Figuras

```
Genera código Python para un panel de múltiples gráficos:

NÚMERO DE SUBPLOTS: [filas x columnas]
CONTENIDO:
- Panel A: [descripción]
- Panel B: [descripción]
- Panel C: [descripción]

Requisitos:
- Etiquetas A, B, C en cada panel
- Tamaño total: [ancho x alto] pulgadas
- Espaciado uniforme
- Leyenda compartida si aplica
- Exportar como PNG y PDF
```

---

## 6. Interpretación de Resultados

### 6.1 Interpretar Prueba Estadística

```
Obtuve estos resultados:

PRUEBA: [nombre]
ESTADÍSTICO: [valor]
P-VALOR: [valor]
TAMAÑO DEL EFECTO: [valor]
IC 95%: [intervalo]

Ayúdame a:
1. Determinar si es significativo
2. Evaluar relevancia práctica
3. Redactar interpretación para paper
4. Identificar limitaciones de la interpretación
```

### 6.2 Redactar Sección de Resultados

```
Mis resultados son:

DESCRIPTIVOS:
- Grupo 1: M=X, SD=Y
- Grupo 2: M=X, SD=Y

INFERENCIAL:
- [Prueba, estadístico, p, efecto]

Redacta un párrafo de resultados en formato APA que:
1. Presente descriptivos
2. Reporte inferencial
3. Interprete brevemente
4. Refiera a figura/tabla
```

---

## 7. Reproducibilidad

### 7.1 Script Reproducible

```
Convierte mi análisis en un script reproducible:

ANÁLISIS ACTUAL:
[Describir o pegar código]

El script debe:
1. Tener semilla aleatoria fija
2. Documentar cada paso
3. Incluir verificaciones de datos
4. Exportar resultados a archivo
5. Ser ejecutable de inicio a fin
```

### 7.2 Documentar Análisis

```
Documenta este código de análisis:

[PEGAR CÓDIGO]

Agregar:
1. Docstrings para funciones
2. Comentarios explicativos
3. Descripción de parámetros
4. Ejemplos de uso
5. Referencias a métodos
```

---

## 8. Validación

### 8.1 Verificar Supuestos

```
Genera código para verificar supuestos de [PRUEBA]:

DATOS: [describir]
SUPUESTOS A VERIFICAR:
1. [supuesto 1]
2. [supuesto 2]
3. [supuesto 3]

Incluir:
- Pruebas formales
- Visualizaciones diagnósticas
- Interpretación de cada prueba
- Alternativas si no se cumplen
```

---

*Última actualización: Diciembre 2024*
