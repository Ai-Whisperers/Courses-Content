# Módulo 06: IA para SCADA y HMI
## Duración: 2 horas

---

## Objetivos de Aprendizaje

Al finalizar este módulo, podrás:
- Diseñar pantallas HMI profesionales con asistencia de IA
- Configurar sistemas de alarmas inteligentes
- Analizar datos históricos SCADA con ML
- Implementar predicción básica de fallos
- Integrar sistemas SCADA con herramientas de análisis

---

## 1. Diseño de Pantallas HMI con IA

### 1.1 Principios de Diseño HMI

```
┌─────────────────────────────────────────────────────────────┐
│           Principios de Diseño HMI Efectivo                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │   Claridad    │  │   Jerarquía   │  │   Colores     │   │
│  │   Visual      │  │   de Info     │  │   ISA-101     │   │
│  │   Mínimo      │  │   Importante  │  │   Gris base   │   │
│  │   ruido       │  │   primero     │  │   Color=acción│   │
│  └───────────────┘  └───────────────┘  └───────────────┘   │
│                                                             │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │   Navegación  │  │   Alarmas     │  │   Respuesta   │   │
│  │   Consistente │  │   Visibles    │  │   < 1 segundo │   │
│  │   3 clics max │  │   Prioridad   │  │   a 100ms     │   │
│  └───────────────┘  └───────────────┘  └───────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Prompt para Diseño de Pantalla

**Prompt estructurado:**

```
Diseña una pantalla HMI para monitoreo de tanque de proceso:

PLATAFORMA: Siemens WinCC (TIA Portal) o Wonderware InTouch

ELEMENTOS REQUERIDOS:
1. Representación gráfica del tanque (nivel visible)
2. Indicadores numéricos: nivel (%), temperatura (°C), presión (bar)
3. Estado de válvula de entrada (abierta/cerrada)
4. Estado de bomba de salida (on/off/falla)
5. Gráfico de tendencia (últimos 30 minutos)
6. Barra de alarmas activas
7. Botones de control (Start/Stop/Reset)

ESTÁNDARES:
- Colores según ISA-101: gris base, colores solo para estados
- Fuente legible (mínimo 14pt para valores)
- Espacio para expansión futura

FORMATO:
- Descripción de layout (posiciones)
- Colores específicos (RGB o nombres)
- Tipos de objetos a usar
- Animaciones requeridas
```

### 1.3 Layout Generado

```
┌────────────────────────────────────────────────────────────────────┐
│ [LOGO]  SISTEMA DE PROCESO - TANQUE TK-101      [ALARMAS] [FECHA] │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│   ┌──────────────┐      ┌─────────────────────────────────────┐   │
│   │              │      │                                     │   │
│   │   ┌──────┐   │      │        TENDENCIA (30 min)           │   │
│   │   │      │   │      │    ▲                                │   │
│   │   │ 75%  │   │      │    │   ╱╲   ╱╲                      │   │
│   │   │ ████ │   │      │    │  ╱  ╲ ╱  ╲    Nivel            │   │
│   │   │ ████ │   │      │    │ ╱    ╲    ╲   Temp             │   │
│   │   │ ████ │   │      │    └──────────────────────►         │   │
│   │   └──────┘   │      │                                     │   │
│   │   TK-101     │      └─────────────────────────────────────┘   │
│   └──────────────┘                                                │
│                                                                    │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐  ┌─────────────────────┐ │
│   │ NIVEL    │ │ TEMP     │ │ PRESIÓN  │  │ ALARMAS ACTIVAS     │ │
│   │  75.2 %  │ │  45.3 °C │ │  2.1 bar │  │ ⚠ Nivel Alto TK-101 │ │
│   └──────────┘ └──────────┘ └──────────┘  │                     │ │
│                                            └─────────────────────┘ │
│   ┌─────┐    ┌─────┐    ┌─────┐                                   │
│   │ XV  │    │ P-101│    │     │     [START] [STOP] [RESET]       │
│   │ ⬛  │    │  🔄  │    │     │                                   │
│   │OPEN │    │ RUN  │    │     │                                   │
│   └─────┘    └─────┘    └─────┘                                   │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│ [OVERVIEW] [TANQUES] [BOMBAS] [ALARMAS] [TENDENCIAS] [CONFIG]     │
└────────────────────────────────────────────────────────────────────┘
```

### 1.4 Especificación de Colores ISA-101

| Elemento | Color | RGB | Uso |
|----------|-------|-----|-----|
| Fondo | Gris medio | #808080 | Base neutral |
| Equipo normal | Gris claro | #C0C0C0 | Sin acción requerida |
| Running | Verde | #00FF00 | Operación normal |
| Stopped | Blanco | #FFFFFF | Detenido normal |
| Alarm | Rojo | #FF0000 | Requiere atención |
| Warning | Amarillo | #FFFF00 | Precaución |
| Manual | Naranja | #FFA500 | Control manual |

---

## 2. Configuración de Alarmas Inteligentes

### 2.1 Diseño de Sistema de Alarmas

**Prompt:**

```
Diseña un sistema de alarmas para proceso de llenado de tanque:

VARIABLES A MONITOREAR:
- Nivel: 0-100%
- Temperatura: 0-100°C
- Presión: 0-10 bar
- Flujo de entrada: 0-100 L/min

NIVELES DE ALARMA:
1. LOW-LOW (LL): Crítico bajo
2. LOW (L): Bajo
3. HIGH (H): Alto
4. HIGH-HIGH (HH): Crítico alto

CONFIGURACIÓN REQUERIDA:
- Setpoints con histéresis (deadband)
- Tiempo de retraso (anti-jitter)
- Prioridades (1-5)
- Acciones por prioridad
- Formato de mensaje de alarma

GENERAR:
1. Tabla de configuración de alarmas
2. Matriz de prioridades
3. Texto de mensajes estándar
4. Procedimiento de acknowledgment
```

### 2.2 Tabla de Alarmas Generada

| Tag | Variable | Setpoint | Deadband | Delay | Prioridad | Mensaje |
|-----|----------|----------|----------|-------|-----------|---------|
| LAL_TK101 | Nivel | 15% | 2% | 5s | 2 | TK-101 Nivel Bajo |
| LALL_TK101 | Nivel | 5% | 1% | 2s | 1 | TK-101 Nivel Crítico Bajo |
| LAH_TK101 | Nivel | 85% | 2% | 5s | 2 | TK-101 Nivel Alto |
| LAHH_TK101 | Nivel | 95% | 1% | 2s | 1 | TK-101 Nivel Crítico Alto |
| TAH_TK101 | Temp | 70°C | 2°C | 10s | 3 | TK-101 Temperatura Alta |
| TAHH_TK101 | Temp | 85°C | 1°C | 5s | 1 | TK-101 Temperatura Crítica |
| PAH_TK101 | Presión | 8 bar | 0.2 | 3s | 2 | TK-101 Presión Alta |
| PAHH_TK101 | Presión | 9.5 bar | 0.1 | 1s | 1 | TK-101 Presión Crítica |

### 2.3 Matriz de Prioridades

```
┌─────────────────────────────────────────────────────────────┐
│              MATRIZ DE PRIORIDADES DE ALARMAS               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PRIORIDAD 1 (CRÍTICA - ROJO)                              │
│  ├── Acción: Respuesta inmediata (< 1 minuto)              │
│  ├── Interlock: Puede activar parada automática            │
│  └── Notificación: Alarma audible + visual + SMS           │
│                                                             │
│  PRIORIDAD 2 (ALTA - NARANJA)                              │
│  ├── Acción: Respuesta < 5 minutos                         │
│  ├── Interlock: Alerta, sin parada automática              │
│  └── Notificación: Alarma visual + registro                │
│                                                             │
│  PRIORIDAD 3 (MEDIA - AMARILLO)                            │
│  ├── Acción: Respuesta < 30 minutos                        │
│  ├── Interlock: Solo monitoreo                             │
│  └── Notificación: Registro en histórico                   │
│                                                             │
│  PRIORIDAD 4 (BAJA - BLANCO)                               │
│  ├── Acción: Revisar en próximo turno                      │
│  └── Notificación: Solo registro                           │
│                                                             │
│  PRIORIDAD 5 (INFORMATIVA - GRIS)                          │
│  └── Solo registro, sin acción requerida                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Análisis de Datos SCADA con ML

### 3.1 Extracción de Datos Históricos

**Prompt para script de extracción:**

```
Genera un script Python para extraer datos del historian SCADA:

FUENTE: Base de datos SQL Server (PI, OSIsoft, Wonderware)

DATOS A EXTRAER:
- Tags: TK101_LEVEL, TK101_TEMP, TK101_PRESSURE
- Período: Últimos 30 días
- Intervalo: 1 minuto

PROCESAMIENTO:
1. Conectar a base de datos con pyodbc
2. Extraer datos por rango de tiempo
3. Limpiar valores nulos/outliers
4. Calcular estadísticas básicas
5. Exportar a CSV

INCLUIR:
- Manejo de errores de conexión
- Logging de progreso
- Configuración por archivo
```

### 3.2 Código Python para Análisis

```python
"""
Análisis de datos SCADA con Machine Learning
Predicción de anomalías y tendencias
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

class ScadaAnalyzer:
    """Analizador de datos SCADA con detección de anomalías."""

    def __init__(self, data_path):
        """
        Inicializa el analizador.

        Args:
            data_path: Ruta al archivo CSV con datos SCADA
        """
        self.data = pd.read_csv(data_path, parse_dates=['timestamp'])
        self.data.set_index('timestamp', inplace=True)
        self.scaler = StandardScaler()
        self.model = None

    def preprocess(self):
        """Preprocesa los datos: limpieza y normalización."""
        # Eliminar valores nulos
        self.data = self.data.dropna()

        # Eliminar outliers extremos (> 4 sigma)
        for col in self.data.columns:
            mean = self.data[col].mean()
            std = self.data[col].std()
            self.data = self.data[
                (self.data[col] > mean - 4*std) &
                (self.data[col] < mean + 4*std)
            ]

        # Normalizar
        self.data_scaled = self.scaler.fit_transform(self.data)

        return self.data

    def detect_anomalies(self, contamination=0.05):
        """
        Detecta anomalías usando Isolation Forest.

        Args:
            contamination: Fracción esperada de anomalías

        Returns:
            DataFrame con etiquetas de anomalía
        """
        self.model = IsolationForest(
            contamination=contamination,
            random_state=42,
            n_estimators=100
        )

        predictions = self.model.fit_predict(self.data_scaled)

        self.data['anomaly'] = predictions
        self.data['anomaly'] = self.data['anomaly'].map({1: 0, -1: 1})

        anomaly_count = self.data['anomaly'].sum()
        print(f"Anomalías detectadas: {anomaly_count} ({anomaly_count/len(self.data)*100:.2f}%)")

        return self.data

    def calculate_trends(self, window='1H'):
        """
        Calcula tendencias móviles.

        Args:
            window: Ventana de tiempo para promedio móvil
        """
        for col in self.data.columns:
            if col != 'anomaly':
                self.data[f'{col}_trend'] = self.data[col].rolling(window).mean()
                self.data[f'{col}_std'] = self.data[col].rolling(window).std()

        return self.data

    def plot_dashboard(self, output_path='scada_dashboard.png'):
        """Genera dashboard de análisis."""
        fig, axes = plt.subplots(3, 1, figsize=(14, 10))

        # Variables originales
        cols = [c for c in self.data.columns if not c.endswith('_trend')
                and not c.endswith('_std') and c != 'anomaly']

        for col in cols[:3]:  # Máximo 3 variables
            axes[0].plot(self.data.index, self.data[col], label=col, alpha=0.7)

        # Marcar anomalías
        anomalies = self.data[self.data['anomaly'] == 1]
        axes[0].scatter(anomalies.index, anomalies[cols[0]],
                       color='red', marker='x', s=50, label='Anomalía')

        axes[0].set_title('Variables de Proceso con Anomalías Detectadas')
        axes[0].legend()
        axes[0].grid(True, alpha=0.3)

        # Tendencias
        for col in cols[:3]:
            if f'{col}_trend' in self.data.columns:
                axes[1].plot(self.data.index, self.data[f'{col}_trend'],
                            label=f'{col} (tendencia)')

        axes[1].set_title('Tendencias Móviles (Promedio Horario)')
        axes[1].legend()
        axes[1].grid(True, alpha=0.3)

        # Distribución de anomalías por hora
        self.data['hour'] = self.data.index.hour
        hourly_anomalies = self.data.groupby('hour')['anomaly'].sum()
        axes[2].bar(hourly_anomalies.index, hourly_anomalies.values)
        axes[2].set_title('Distribución de Anomalías por Hora del Día')
        axes[2].set_xlabel('Hora')
        axes[2].set_ylabel('Número de Anomalías')
        axes[2].grid(True, alpha=0.3)

        plt.tight_layout()
        plt.savefig(output_path, dpi=150)
        plt.close()

        print(f"Dashboard guardado en: {output_path}")

    def generate_report(self):
        """Genera reporte de análisis."""
        report = f"""
# Reporte de Análisis SCADA

## Resumen de Datos
- Período: {self.data.index.min()} a {self.data.index.max()}
- Total de registros: {len(self.data)}
- Variables analizadas: {[c for c in self.data.columns if not c.startswith('_')]}

## Estadísticas Descriptivas
{self.data.describe().to_markdown()}

## Detección de Anomalías
- Método: Isolation Forest
- Anomalías detectadas: {self.data['anomaly'].sum()}
- Porcentaje: {self.data['anomaly'].mean()*100:.2f}%

## Recomendaciones
1. Revisar las horas con mayor concentración de anomalías
2. Verificar correlación entre variables durante anomalías
3. Considerar ajuste de límites de alarma
"""
        return report


# Uso del analizador
if __name__ == "__main__":
    analyzer = ScadaAnalyzer('scada_data.csv')
    analyzer.preprocess()
    analyzer.detect_anomalies()
    analyzer.calculate_trends()
    analyzer.plot_dashboard()
    print(analyzer.generate_report())
```

---

## 4. Predicción de Fallos (Predictive Maintenance)

### 4.1 Modelo de Predicción Básico

**Prompt:**

```
Genera un modelo de predicción de fallos para una bomba industrial:

DATOS DISPONIBLES:
- Vibración (mm/s RMS)
- Temperatura de rodamientos (°C)
- Corriente del motor (A)
- Horas de operación
- Historial de fallos (etiquetas)

MODELO REQUERIDO:
- Clasificación: Normal vs Pre-falla
- Algoritmo: Random Forest o Gradient Boosting
- Métricas: Accuracy, Precision, Recall, F1

INCLUIR:
1. Preprocesamiento de datos
2. Ingeniería de características
3. Entrenamiento y validación
4. Umbral de predicción ajustable
5. Exportar modelo para producción
```

### 4.2 Integración con SCADA

```
┌─────────────────────────────────────────────────────────────┐
│           Arquitectura de Mantenimiento Predictivo          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌───────────┐    ┌───────────┐    ┌───────────┐         │
│   │   PLC     │───►│  SCADA    │───►│ Historian │         │
│   │ Sensores  │    │ Servidor  │    │   (SQL)   │         │
│   └───────────┘    └───────────┘    └─────┬─────┘         │
│                                           │               │
│                                           ▼               │
│                                    ┌───────────┐          │
│                                    │  Python   │          │
│                                    │  ETL Job  │          │
│                                    └─────┬─────┘          │
│                                          │                │
│                    ┌─────────────────────┼────────────┐   │
│                    │                     ▼            │   │
│                    │              ┌───────────┐       │   │
│                    │              │   ML      │       │   │
│                    │              │  Engine   │       │   │
│                    │              └─────┬─────┘       │   │
│                    │                    │             │   │
│                    │      ┌─────────────┴──────────┐  │   │
│                    │      ▼                        ▼  │   │
│                    │ ┌─────────┐            ┌─────────┐   │
│                    │ │Dashboard│            │ Alarmas │   │
│                    │ │   Web   │            │Predicti-│   │
│                    │ │         │            │  vas    │   │
│                    │ └─────────┘            └─────────┘   │
│                    │       CAPA DE ANALÍTICA             │
│                    └─────────────────────────────────────┘│
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 5. Ejercicio Práctico

### Diseño de Pantalla HMI Completa

**Especificaciones:**
- Sistema: Estación de bombeo con 3 bombas
- Monitoreo: Presión, caudal, estado de bombas
- Control: Arranque/parada manual, selección de modo
- Alarmas: Presión baja, sobrecorriente, fallo de bomba

**Prompt integral:**

```
Diseña una pantalla HMI completa para estación de bombeo:

EQUIPO:
- 3 bombas centrífugas (P-101, P-102, P-103)
- 2 válvulas de control (XV-101, XV-102)
- Medidores: presión, caudal, corriente de motores

LAYOUT:
- Sinóptico del proceso (centro)
- Panel de control (derecha)
- Alarmas (parte inferior)
- Tendencias (popup o pestaña)

FUNCIONALIDADES:
1. Visualización de estado en tiempo real
2. Control de bombas (Auto/Manual/Off)
3. Ajuste de setpoint de presión
4. Reconocimiento de alarmas
5. Navegación a pantallas de detalle

GENERAR:
1. Layout ASCII detallado
2. Lista de objetos gráficos
3. Tabla de animaciones
4. Scripts de control
5. Configuración de tendencias
```

---

## Resumen

| Tema | Aplicación de IA |
|------|------------------|
| Diseño HMI | Layout, colores, objetos |
| Alarmas | Configuración, prioridades, mensajes |
| Análisis de datos | Detección de anomalías, tendencias |
| Predicción | Modelos ML para mantenimiento |
| Documentación | Reportes automáticos |

---

## Recursos

- [ISA-101 HMI Standards](https://www.isa.org/isa101)
- [High Performance HMI Handbook](https://www.asmconsortium.net/)
- [scikit-learn Documentation](https://scikit-learn.org/)
- [SCADA Security Guidelines](https://www.nist.gov/topics/cybersecurity)

---

*Siguiente: Módulo 07 - IA para Mantenimiento Predictivo*
