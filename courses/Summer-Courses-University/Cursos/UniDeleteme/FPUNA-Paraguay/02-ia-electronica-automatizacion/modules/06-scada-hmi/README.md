# Módulo 06: IA para SCADA y HMI
## Diseño de Interfaces de Operador con Asistencia de IA

---

## Objetivos del Módulo

Al finalizar este módulo, serás capaz de:
- Diseñar pantallas HMI siguiendo estándares ISA-101
- Configurar sistemas de alarmas efectivos
- Generar scripts de control con asistencia de IA
- Integrar análisis de datos con visualización SCADA

---

## 1. Principios de Diseño HMI

### 1.1 Estándar ISA-101 High Performance HMI

El estándar ISA-101 define mejores prácticas para diseño de HMI que maximizan la efectividad del operador y minimizan errores.

```
┌─────────────────────────────────────────────────────────────┐
│              PRINCIPIOS ISA-101                              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 FONDO GRIS NEUTRO                    │   │
│  │                   (#808080)                          │   │
│  │  Reduce fatiga visual en turnos de 12 horas         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              COLOR = INFORMACIÓN                     │   │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐           │   │
│  │  │VERDE│ │ROJO │ │AMAR│ │AZUL │ │GRIS │           │   │
│  │  │ RUN │ │FAULT│ │WARN│ │INFO │ │ OFF │           │   │
│  │  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              NAVEGACIÓN 3 CLICS                      │   │
│  │  Pantalla Principal → Área → Detalle de Equipo      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Jerarquía de Pantallas

```
NIVEL 1: Vista General de Planta
├── Estado general de áreas
├── KPIs principales
└── Alarmas activas (resumen)

NIVEL 2: Vista de Área
├── Sinóptico del proceso
├── Estados de equipos
└── Variables críticas

NIVEL 3: Detalle de Equipo
├── Parámetros operativos
├── Tendencias
├── Controles manuales
└── Histórico de alarmas

NIVEL 4: Diagnóstico/Configuración
├── Parámetros de calibración
├── Setpoints de alarmas
└── Logs de eventos
```

### 1.3 Uso del Color

| Estado | Color | Código Hex | Uso |
|--------|-------|-----------|-----|
| Fondo | Gris medio | #808080 | Base de todas las pantallas |
| Normal/Run | Verde | #4CAF50 | Equipos en operación |
| Parado/Off | Gris oscuro | #424242 | Equipos detenidos |
| Falla | Rojo | #F44336 | Condición de alarma crítica |
| Advertencia | Amarillo/Ámbar | #FFC107 | Condición de precaución |
| Manual | Naranja | #FF9800 | Control manual activo |
| Información | Azul | #2196F3 | Mensajes informativos |

---

## 2. Diseño de Layout

### 2.1 Prompt para Diseño de Pantalla

```
Diseña pantalla HMI para [proceso]:

PLATAFORMA: [WinCC / FactoryTalk / Ignition]
RESOLUCIÓN: [1920x1080 / 1280x800]

PROCESO A MOSTRAR:
[Descripción del proceso y equipos]

INFORMACIÓN REQUERIDA:
1. [Variable/equipo 1]
2. [Variable/equipo 2]
...

REQUISITOS:
- Estándar ISA-101
- Navegación clara
- Alarmas visibles
- Tendencias accesibles

GENERAR:
1. Layout ASCII con zonas
2. Lista de elementos por zona
3. Tabla de colores por estado
```

### 2.2 Ejemplo: Layout de Estación de Bombeo

```
┌─────────────────────────────────────────────────────────────────────────┐
│  HEADER (60px)                                                           │
│  ┌────────────────┬─────────────────────────────┬──────────────────────┐│
│  │ LOGO  TÍTULO   │      NAVEGACIÓN              │ FECHA/HORA  USUARIO ││
│  └────────────────┴─────────────────────────────┴──────────────────────┘│
├─────────────────────────────────────────────────────────────────────────┤
│  ÁREA PRINCIPAL (800px)                                                  │
│  ┌──────────────────────────────────────────┬──────────────────────────┐│
│  │                                          │                          ││
│  │           SINÓPTICO DEL PROCESO          │    PANEL DE CONTROL     ││
│  │                                          │                          ││
│  │    ┌─────────┐                          │  ┌────────────────────┐  ││
│  │    │ TANQUE  │                          │  │ BOMBA P-101        │  ││
│  │    │ T-101   │                          │  │ ┌──────┐ ┌──────┐  │  ││
│  │    │  75%    │                          │  │ │START │ │STOP  │  │  ││
│  │    └────┬────┘                          │  │ └──────┘ └──────┘  │  ││
│  │         │                               │  │ Estado: RUN        │  ││
│  │    ╔════╧════╗                          │  │ Corriente: 12.5 A  │  ││
│  │    ║  P-101  ║───────►                  │  │ Presión: 4.2 bar   │  ││
│  │    ╚═════════╝                          │  └────────────────────┘  ││
│  │                                          │                          ││
│  │    ╔═════════╗                          │  ┌────────────────────┐  ││
│  │    ║  P-102  ║───────►                  │  │ BOMBA P-102        │  ││
│  │    ╚═════════╝                          │  │ Estado: STANDBY    │  ││
│  │                                          │  └────────────────────┘  ││
│  │                                          │                          ││
│  │  ──────────────────────────             │  ┌────────────────────┐  ││
│  │  TENDENCIA: Nivel y Caudal              │  │ RESUMEN            │  ││
│  │  ▁▂▃▄▅▆▇█▇▆▅▄▃▂▁                        │  │ Producción: 850m³  │  ││
│  │                                          │  │ Eficiencia: 94%    │  ││
│  └──────────────────────────────────────────┴──────────────────────────┘│
├─────────────────────────────────────────────────────────────────────────┤
│  BANNER DE ALARMAS (100px)                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ ! P-101 Alta Vibración   │ ⚠ T-101 Nivel Alto   │ ○ Sistema OK     ││
│  │ 10:30:15  ACK: Pendiente │ 10:28:45  ACK: Si    │                   ││
│  └─────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Sistema de Alarmas

### 3.1 Matriz de Prioridades

| Prioridad | Respuesta | Frecuencia Objetivo | Color | Sonido |
|-----------|-----------|---------------------|-------|--------|
| 1 - Crítica | < 1 minuto | < 1 por turno | Rojo parpadeo | Sirena |
| 2 - Alta | < 5 minutos | < 5 por turno | Rojo sólido | Beep continuo |
| 3 - Media | < 30 minutos | < 10 por turno | Amarillo | Beep intermitente |
| 4 - Baja | Próximo turno | Sin límite | Azul | Sin sonido |

### 3.2 Configuración de Alarma

```
┌────────────────────────────────────────────────────────────┐
│              CONFIGURACIÓN DE ALARMA                        │
│                                                             │
│   Variable: Nivel_Tanque                                   │
│   Unidades: %                                               │
│   Rango: 0-100%                                            │
│                                                             │
│   ┌─────────────────────────────────────────────────┐      │
│   │                                                  │      │
│   │  HH ───────────────────────────────── 90%  P1   │      │
│   │                                                  │      │
│   │  H  ─────────────────────────────────  80%  P3  │      │
│   │       ▓▓▓▓▓▓▓ (Deadband: 2%)                    │      │
│   │                                                  │      │
│   │  ═══════════════════ NORMAL ══════════════════  │      │
│   │                                                  │      │
│   │       ░░░░░░░ (Deadband: 2%)                    │      │
│   │  L  ─────────────────────────────────  20%  P3  │      │
│   │                                                  │      │
│   │  LL ───────────────────────────────── 10%  P2   │      │
│   │                                                  │      │
│   └─────────────────────────────────────────────────┘      │
│                                                             │
│   Delay Time:                                               │
│   ├── HH: 5 segundos (respuesta inmediata)                 │
│   ├── H:  30 segundos                                      │
│   ├── L:  30 segundos                                      │
│   └── LL: 5 segundos (respuesta inmediata)                 │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### 3.3 Prompt para Configurar Alarmas

```
Configura sistema de alarmas para planta:

VARIABLES A MONITOREAR:
| Variable | Rango Normal | Unidad |
|----------|--------------|--------|
| Nivel Tanque | 20-80% | % |
| Presión | 4-6 bar | bar |
| Temperatura | 20-40°C | °C |
| Caudal | 80-120 m³/h | m³/h |

GENERAR PARA CADA VARIABLE:
- Setpoints: LL, L, H, HH
- Deadband (histéresis)
- Delay time
- Prioridad (1-4)
- Mensaje de alarma
- Acción recomendada
```

---

## 4. Integración con ML

### 4.1 Análisis de Datos SCADA

```python
# Clase para análisis de datos SCADA
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

class ScadaAnalyzer:
    """Analizador de datos SCADA con detección de anomalías."""

    def __init__(self, data_path):
        self.data = pd.read_csv(data_path, parse_dates=['timestamp'])
        self.scaler = StandardScaler()
        self.model = None

    def preprocess(self, columns):
        """Preparar datos para análisis."""
        # Eliminar valores faltantes
        df = self.data[columns].dropna()

        # Normalizar
        X_scaled = self.scaler.fit_transform(df)

        return X_scaled

    def detect_anomalies(self, columns, contamination=0.05):
        """Detectar anomalías con Isolation Forest."""
        X = self.preprocess(columns)

        self.model = IsolationForest(
            contamination=contamination,
            random_state=42
        )

        predictions = self.model.fit_predict(X)

        # -1 = anomalía, 1 = normal
        anomalies = predictions == -1

        return anomalies

    def generate_alerts(self, anomalies, severity='WARNING'):
        """Generar alertas para anomalías detectadas."""
        alerts = []
        anomaly_indices = np.where(anomalies)[0]

        for idx in anomaly_indices:
            alert = {
                'timestamp': self.data.iloc[idx]['timestamp'],
                'severity': severity,
                'message': 'Anomalía detectada por ML',
                'data': self.data.iloc[idx].to_dict()
            }
            alerts.append(alert)

        return alerts

    def trend_analysis(self, column, window='1H'):
        """Análisis de tendencia de una variable."""
        df = self.data.set_index('timestamp')

        stats = df[column].resample(window).agg([
            'mean', 'std', 'min', 'max'
        ])

        # Detectar tendencia
        diff = stats['mean'].diff()
        trend = 'stable'
        if diff.iloc[-1] > 2 * stats['std'].mean():
            trend = 'increasing'
        elif diff.iloc[-1] < -2 * stats['std'].mean():
            trend = 'decreasing'

        return stats, trend
```

### 4.2 Dashboard con Predicciones

```python
import streamlit as st
import plotly.express as px
import plotly.graph_objects as go

def create_gauge(value, title, min_val, max_val, thresholds):
    """Crear indicador tipo gauge."""
    fig = go.Figure(go.Indicator(
        mode="gauge+number+delta",
        value=value,
        title={'text': title},
        gauge={
            'axis': {'range': [min_val, max_val]},
            'bar': {'color': "darkblue"},
            'steps': [
                {'range': [min_val, thresholds['low']], 'color': "lightgray"},
                {'range': [thresholds['low'], thresholds['high']], 'color': "lightgreen"},
                {'range': [thresholds['high'], max_val], 'color': "salmon"}
            ],
            'threshold': {
                'line': {'color': "red", 'width': 4},
                'thickness': 0.75,
                'value': thresholds['critical']
            }
        }
    ))
    return fig

def main():
    st.title("Dashboard SCADA con ML")

    # Cargar datos
    analyzer = ScadaAnalyzer("scada_data.csv")

    # Columna de métricas
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric("Temperatura", "58.3 °C", "+2.1")
    with col2:
        st.metric("Presión", "4.8 bar", "-0.2")
    with col3:
        st.metric("Nivel", "72%", "+5%")
    with col4:
        st.metric("Caudal", "95 m³/h", "0")

    # Gráfico de tendencia
    st.subheader("Tendencia de Variables")
    # ... código de gráfico

    # Panel de anomalías
    st.subheader("Detección de Anomalías")
    anomalies = analyzer.detect_anomalies(['temp', 'pressure', 'flow'])
    if anomalies.any():
        st.warning(f"Se detectaron {anomalies.sum()} anomalías")
    else:
        st.success("Sistema operando normalmente")

if __name__ == "__main__":
    main()
```

---

## 5. Scripts de Control

### 5.1 Prompt para Scripts

```
Genera script VBA/VBS para HMI:

PLATAFORMA: [WinCC / FactoryTalk]

FUNCIONALIDAD:
[Describir qué debe hacer el script]

TRIGGERS:
[Evento que dispara el script]

VARIABLES DISPONIBLES:
[Lista de tags accesibles]

REQUISITOS:
- Validación de permisos
- Confirmación de acciones críticas
- Logging de eventos
- Manejo de errores
```

### 5.2 Ejemplo: Script de Arranque

```vb
' Script de arranque de bomba con validaciones
' Plataforma: WinCC

Sub StartPump(PumpTag)
    Dim confirmed
    Dim currentUser
    Dim timestamp

    ' Obtener usuario actual
    currentUser = HMIRuntime.Tags("CurrentUser").Read

    ' Verificar permisos
    If Not CheckPermission(currentUser, "PUMP_CONTROL") Then
        ShowMessage "No tiene permisos para esta acción", "Error"
        Exit Sub
    End If

    ' Verificar interlocks
    If Not CheckInterlocks(PumpTag) Then
        ShowMessage "Interlocks no satisfechos", "Error"
        Exit Sub
    End If

    ' Solicitar confirmación
    confirmed = MsgBox("¿Confirma arranque de " & PumpTag & "?", _
                       vbYesNo + vbQuestion, "Confirmar Acción")

    If confirmed = vbYes Then
        ' Ejecutar comando
        HMIRuntime.Tags(PumpTag & "_CMD_START").Write(True)

        ' Registrar en log
        timestamp = Now()
        LogEvent timestamp, currentUser, "START", PumpTag, "Comando enviado"

        ' Esperar confirmación (timeout 5 segundos)
        Dim startTime
        startTime = Timer

        Do While Timer - startTime < 5
            DoEvents
            If HMIRuntime.Tags(PumpTag & "_STATUS").Read = 1 Then
                LogEvent Now(), currentUser, "START", PumpTag, "Confirmado"
                Exit Do
            End If
        Loop

        If HMIRuntime.Tags(PumpTag & "_STATUS").Read <> 1 Then
            ShowMessage "Timeout esperando confirmación", "Advertencia"
            LogEvent Now(), currentUser, "START", PumpTag, "Timeout"
        End If
    End If
End Sub

Function CheckInterlocks(PumpTag)
    ' Verificar condiciones de seguridad
    Dim ok As Boolean
    ok = True

    ' Verificar nivel mínimo
    If HMIRuntime.Tags("LevelLow").Read = True Then
        ok = False
    End If

    ' Verificar parada de emergencia
    If HMIRuntime.Tags("EStop").Read = True Then
        ok = False
    End If

    ' Verificar térmico
    If HMIRuntime.Tags(PumpTag & "_OVERLOAD").Read = True Then
        ok = False
    End If

    CheckInterlocks = ok
End Function
```

---

## 6. Mejores Prácticas

### 6.1 Diseño de Pantallas

1. **Consistencia**: Misma ubicación para elementos similares en todas las pantallas
2. **Simplicidad**: Solo mostrar información necesaria para la tarea
3. **Jerarquía visual**: Información crítica más prominente
4. **Retroalimentación**: Confirmar visualmente las acciones del operador

### 6.2 Sistema de Alarmas

1. **Racionalización**: Máximo 10 alarmas por hora por operador
2. **Priorización**: Usar 4 niveles de prioridad
3. **Suppressión temporal**: Permitir silenciar durante mantenimiento
4. **Análisis periódico**: Revisar métricas de alarmas mensualmente

---

## Resumen

En este módulo aprendimos:

1. **Diseño ISA-101** para interfaces de alto rendimiento
2. **Configuración de alarmas** efectivas con prioridades
3. **Integración con ML** para detección de anomalías
4. **Scripts de control** con validaciones de seguridad

### Próximo Módulo

En el Módulo 07 aplicaremos IA para mantenimiento predictivo.

---

*Módulo 06 - IA para SCADA y HMI*
*Duración: 2 horas*
