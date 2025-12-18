# Biblioteca de Prompts: Generación de Código
## Prompts para Código de Investigación Científica

---

## 1. Configuración de Entorno

### 1.1 Setup de Proyecto

```
Ayúdame a configurar un proyecto de Python para investigación:

PROYECTO: [nombre/descripción]
TIPO DE ANÁLISIS: [estadístico/ML/visualización/simulación]
DATOS: [tipo y tamaño aproximado]

Genera:
1. Estructura de carpetas recomendada
2. requirements.txt con versiones
3. Template de configuración
4. .gitignore para proyecto de investigación
5. README.md inicial
```

### 1.2 Ambiente Virtual

```
Genera comandos para configurar ambiente virtual:

SISTEMA OPERATIVO: [Windows/Mac/Linux]
VERSIÓN PYTHON: [3.9/3.10/3.11]
LIBRERÍAS PRINCIPALES: [listar]

Incluir:
1. Creación del ambiente
2. Activación
3. Instalación de dependencias
4. Verificación de instalación
5. Exportar requirements.txt
```

---

## 2. Carga y Procesamiento de Datos

### 2.1 Cargar Datos

```
Genera código para cargar datos de investigación:

FORMATO: [CSV/Excel/JSON/SQL]
RUTA: [ejemplo de ruta]
CARACTERÍSTICAS ESPECIALES:
- Encoding: [UTF-8/Latin-1/etc.]
- Separador: [coma/punto y coma/tab]
- Filas a saltar: [si hay headers múltiples]
- Tipos de columnas: [especificar si necesario]

Incluir manejo de errores y verificación.
```

### 2.2 Pipeline de Limpieza

```
Crea un pipeline de limpieza de datos:

PROBLEMAS A RESOLVER:
1. [Problema 1 - ej: valores faltantes en columna X]
2. [Problema 2 - ej: outliers en columna Y]
3. [Problema 3 - ej: formatos inconsistentes]

DECISIONES:
- Faltantes: [eliminar/imputar con X]
- Outliers: [eliminar/winsorizar/mantener]
- Formato: [normalizar a X]

Generar clase o funciones reutilizables.
```

### 2.3 Feature Engineering

```
Genera código para crear nuevas variables:

TRANSFORMACIONES NECESARIAS:
1. [Transformación 1 - ej: calcular diferencia pre-post]
2. [Transformación 2 - ej: categorizar edad en grupos]
3. [Transformación 3 - ej: normalizar variable X]

DATOS DE ENTRADA: [describir columnas disponibles]
OBJETIVO: [para qué se usarán las nuevas variables]
```

---

## 3. Análisis Estadístico

### 3.1 Clase de Análisis Estadístico

```
Crea una clase Python para análisis estadístico:

FUNCIONALIDADES:
1. Estadísticas descriptivas por grupo
2. Verificación de supuestos (normalidad, homogeneidad)
3. Pruebas de comparación (t-test, ANOVA, etc.)
4. Cálculo de tamaños del efecto
5. Generación de reportes

DATOS: DataFrame con columnas [listar]
OUTPUT: Diccionario de resultados + reporte texto
```

### 3.2 Análisis de Correlación

```
Genera código para análisis de correlación completo:

VARIABLES: [listar variables numéricas]
TIPO: [Pearson/Spearman/ambos]
CORRECCIÓN: [Bonferroni/FDR/ninguna]

Incluir:
1. Matriz de correlación
2. P-valores
3. Heatmap visualización
4. Correlaciones significativas destacadas
5. Exportar a tabla para paper
```

### 3.3 Análisis de Regresión

```
Genera código para análisis de regresión:

TIPO: [lineal/logística/multinomial]
VARIABLE DEPENDIENTE: [nombre]
PREDICTORES: [listar]
VALIDACIÓN: [train-test split/cross-validation]

Incluir:
1. Preparación de datos
2. Ajuste del modelo
3. Diagnósticos
4. Interpretación de coeficientes
5. Visualización de efectos
6. Tabla de resultados formateada
```

---

## 4. Visualización

### 4.1 Tema Personalizado

```
Crea un tema de matplotlib para publicaciones científicas:

ESTILO: [APA/Nature/Minimal]
FUENTE: [Arial/Times/Helvetica]
COLORES: [escala de grises/colorblind-friendly]

El tema debe configurar:
1. Tamaños de fuente por elemento
2. Paleta de colores
3. Estilos de línea
4. Formato de ejes
5. DPI para exportación
```

### 4.2 Generador de Gráficos

```
Crea funciones para gráficos científicos comunes:

TIPOS A INCLUIR:
1. Barras con error (horizontal y vertical)
2. Boxplot con puntos individuales
3. Scatter con regresión
4. Histograma con curva normal
5. Panel combinado

Cada función debe:
- Aceptar DataFrame como input
- Tener parámetros para personalización
- Exportar en múltiples formatos
- Ser consistente en estilo
```

### 4.3 Figura Compleja

```
Genera código para una figura de paper con múltiples paneles:

LAYOUT:
- Panel A: [tipo y contenido]
- Panel B: [tipo y contenido]
- Panel C: [tipo y contenido]

DIMENSIONES: [ancho x alto en pulgadas]
REQUISITOS:
- Letras de panel (A, B, C) en esquina superior izquierda
- Leyenda compartida si aplica
- Espacio entre paneles uniforme
- Exportar como .png (300 DPI) y .pdf (vectorial)
```

---

## 5. Automatización

### 5.1 Script de Análisis Completo

```
Genera un script que automatice mi análisis:

FLUJO:
1. Cargar datos desde [ruta]
2. Limpiar según [criterios]
3. Analizar con [pruebas]
4. Generar figuras [tipos]
5. Exportar resultados a [formato]

REQUERIMIENTOS:
- Argumentos de línea de comandos para rutas
- Logging de cada paso
- Manejo de errores robusto
- Reporte final de ejecución
```

### 5.2 Generación de Reportes

```
Crea código para generar reporte automático de resultados:

CONTENIDO:
1. Resumen de datos
2. Estadísticas descriptivas (tabla)
3. Resultados de pruebas (tabla)
4. Figuras principales
5. Conclusiones

FORMATO DE SALIDA: [Word/HTML/PDF]
TEMPLATE: [describir estilo deseado]
```

### 5.3 Batch Processing

```
Genera código para procesar múltiples archivos/análisis:

ARCHIVOS: [patrón o lista]
ANÁLISIS POR ARCHIVO: [describir]
SALIDA: [un archivo por input / resumen combinado]

Usar:
- Multiprocessing para paralelizar
- Progress bar para monitoreo
- Log de errores por archivo
- Resumen final
```

---

## 6. Machine Learning

### 6.1 Pipeline de ML

```
Crea un pipeline de machine learning:

PROBLEMA: [clasificación/regresión]
DATOS: [descripción]
MODELOS A PROBAR: [listar]
MÉTRICAS: [accuracy/F1/AUC/RMSE/etc.]

Pipeline debe incluir:
1. Preprocesamiento (scaling, encoding)
2. Feature selection (opcional)
3. Cross-validation
4. Grid search para hiperparámetros
5. Evaluación final en test set
6. Comparación de modelos
```

### 6.2 Interpretabilidad

```
Genera código para interpretar modelo ML:

MODELO: [tipo]
OBJETIVO: [explicar predicciones]

Incluir:
1. Feature importance
2. SHAP values (si aplica)
3. Partial dependence plots
4. Visualización de decisiones
5. Resumen para paper
```

---

## 7. HPC y Paralelización

### 7.1 Script para Cluster

```
Adapta este código para ejecutar en cluster HPC:

CÓDIGO ACTUAL:
[pegar código]

CLUSTER: [tipo - SLURM/PBS/etc.]
RECURSOS: [CPUs, memoria, tiempo]
PARALELIZACIÓN: [por archivo/por parámetro/por chunk]

Generar:
1. Script de Python optimizado
2. Script de submission
3. Instrucciones de uso
```

### 7.2 Paralelización Local

```
Optimiza este código con paralelización:

CÓDIGO ACTUAL:
[pegar código con loop lento]

TIPO DE TAREA: [CPU-bound/IO-bound]
CORES DISPONIBLES: [número]

Usar:
- multiprocessing / concurrent.futures
- Progress bar
- Manejo de errores
- Combinar resultados
```

---

## 8. Testing y Validación

### 8.1 Tests Unitarios

```
Genera tests unitarios para este código:

CÓDIGO:
[pegar función o clase]

CASOS A PROBAR:
1. Caso normal
2. Edge cases
3. Manejo de errores

Framework: pytest
Incluir fixtures si necesario.
```

### 8.2 Validación de Resultados

```
Genera código para validar resultados de análisis:

ANÁLISIS: [describir]
VALIDACIONES:
1. Rangos esperados para cada métrica
2. Consistencia interna
3. Comparación con cálculo manual
4. Reproducibilidad

Generar reporte de validación.
```

---

## 9. Documentación

### 9.1 Docstrings Completos

```
Agrega documentación a este código:

[PEGAR CÓDIGO]

Formato: NumPy style
Incluir:
- Descripción de función/clase
- Parámetros con tipos
- Retorno con tipo
- Ejemplos de uso
- Raises (excepciones)
```

### 9.2 README de Proyecto

```
Genera README.md para este proyecto de investigación:

PROYECTO: [nombre]
DESCRIPCIÓN: [qué hace]
DATOS: [qué datos usa]
ESTRUCTURA: [carpetas principales]

Incluir:
1. Título y descripción
2. Instalación
3. Uso
4. Estructura del proyecto
5. Dependencias
6. Cómo citar
7. Licencia
```

---

*Última actualización: Diciembre 2024*
