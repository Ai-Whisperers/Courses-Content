"""
Simple Dashboard - Interface Dual (Experto + Simple) para UAV
==============================================================

Módulo 04 - Sistemas de Propulsión - Parte 5: Automatización

Descripción:
-----------
Dashboard Streamlit con dos modos:
- MODO SIMPLE: Para operadores no-técnicos (agricultores, pilotos básicos)
- MODO EXPERTO: Para ingenieros con parámetros completos

Funcionalidades:
---------------
1. Conexión MAVLink en tiempo real (o simulación)
2. Visualización adaptativa según modo
3. Alertas inteligentes
4. Gráficos interactivos
5. Logging y export de datos

Autor: FPUNA 2026 - Ingeniería Aeronáutica
Fecha: Enero 2026
Licencia: MIT

Instalación:
-----------
pip install streamlit pandas numpy plotly

Uso:
----
streamlit run simple_dashboard.py
"""

import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime, timedelta
import time

# Importar componentes del proyecto
try:
    from telemetry_monitor import TelemetryMonitor, simulate_mavlink_data
    from adaptive_controller import AdaptiveThrottleController

    MODULES_AVAILABLE = True
except ImportError as e:
    MODULES_AVAILABLE = False
    import logging

    logger = logging.getLogger(__name__)
    logger.warning(f"Módulos no encontrados: {e}. Usando modo demo.")


# =============================================================================
# CONFIGURACIÓN DE PÁGINA
# =============================================================================

st.set_page_config(
    page_title="UAV Dashboard - FPUNA 2026",
    page_icon="🚁",
    layout="wide",
    initial_sidebar_state="expanded",
)


# =============================================================================
# FUNCIONES AUXILIARES
# =============================================================================


def get_health_color(health_score: float) -> tuple[str, str]:
    """Retorna color según score de salud."""
    if health_score >= 80:
        return "🟢", "#28a745"
    elif health_score >= 50:
        return "🟡", "#ffc107"
    else:
        return "🔴", "#dc3545"


def get_alert_emoji(alert_level: str) -> str:
    """Retorna emoji según nivel de alerta."""
    if alert_level == "none":
        return "✅"
    elif alert_level == "warning":
        return "⚠️"
    else:
        return "🚨"


def simulate_telemetry_frame() -> dict:
    """Simula un frame de telemetría para demo."""
    now = datetime.now()

    # Valores simulados realistas
    battery_pct = max(20, 100 - (now.second % 60) * 1.3)  # Descarga gradual
    motor_temp = 45 + np.random.normal(0, 3)  # Temperatura con ruido

    return {
        "battery_voltage": 16.8 - (100 - battery_pct) * 0.024,
        "battery_current": 15 + np.random.normal(0, 2),
        "battery_remaining": battery_pct,
        "motor_temp_1": motor_temp + np.random.normal(0, 2),
        "motor_temp_2": motor_temp + np.random.normal(0, 2),
        "motor_temp_3": motor_temp + np.random.normal(0, 2),
        "motor_temp_4": motor_temp + np.random.normal(0, 2),
        "motor_rpm_1": 5400 + np.random.normal(0, 50),
        "motor_rpm_2": 5380 + np.random.normal(0, 50),
        "motor_rpm_3": 5410 + np.random.normal(0, 50),
        "motor_rpm_4": 5390 + np.random.normal(0, 50),
        "esc_temp_1": motor_temp * 0.85 + np.random.normal(0, 1.5),
        "esc_temp_2": motor_temp * 0.85 + np.random.normal(0, 1.5),
        "esc_temp_3": motor_temp * 0.85 + np.random.normal(0, 1.5),
        "esc_temp_4": motor_temp * 0.85 + np.random.normal(0, 1.5),
        "vibration_x": np.random.normal(0.10, 0.02),
        "vibration_y": np.random.normal(0.08, 0.02),
        "vibration_z": np.random.normal(0.12, 0.02),
        "gps_lat": -25.2637,
        "gps_lon": -57.5759,
        "altitude": 120.5 + np.random.normal(0, 2),
        "groundspeed": 14.2 + np.random.normal(0, 0.5),
    }


def calculate_health_score(telemetry: dict) -> float:
    """Calcula score de salud simplificado (0-100)."""
    health = 100.0

    # Penalización por batería baja
    if telemetry["battery_remaining"] < 30:
        health -= (30 - telemetry["battery_remaining"]) * 2

    # Penalización por temperatura
    avg_temp = np.mean([telemetry[f"motor_temp_{i}"] for i in range(1, 5)])
    if avg_temp > 65:
        health -= (avg_temp - 65) * 2

    return max(0, min(100, health))


def predict_endurance(telemetry: dict) -> float:
    """Predice autonomía restante (minutos)."""
    battery_wh = 74 * (telemetry["battery_remaining"] / 100)
    power_w = telemetry["battery_voltage"] * telemetry["battery_current"]

    if power_w > 0:
        time_h = (battery_wh / power_w) * 0.8  # Factor seguridad
        return time_h * 60
    return 0


# =============================================================================
# MODO SIMPLE
# =============================================================================


def render_simple_dashboard(telemetry: dict) -> None:
    """
    Dashboard simplificado para operadores no-técnicos.

    Muestra solo 3-4 indicadores clave con visualización clara.
    """
    st.markdown("## 🚁 Panel de Control - Modo Simple")
    st.markdown("---")

    # Calcular indicadores
    health = calculate_health_score(telemetry)
    time_left = predict_endurance(telemetry)
    avg_temp = np.mean([telemetry[f"motor_temp_{i}"] for i in range(1, 5)])

    # 3 métricas principales en columnas grandes
    col1, col2, col3 = st.columns(3)

    with col1:
        # Salud del sistema (semáforo)
        emoji, color = get_health_color(health)
        st.markdown(f"### {emoji} Estado del Sistema")
        st.markdown(
            f"<h1 style='color: {color}; font-size: 72px;'>{int(health)}/100</h1>",
            unsafe_allow_html=True,
        )

        if health >= 80:
            st.success("✅ Sistema operando normalmente")
        elif health >= 50:
            st.warning("⚠️ Atención: Revise indicadores")
        else:
            st.error("🚨 ALERTA: Aterrizar inmediatamente")

    with col2:
        # Autonomía restante (fácil de entender)
        st.markdown("### 🔋 Tiempo de Vuelo Restante")
        st.markdown(
            f"<h1 style='color: #007bff; font-size: 72px;'>{int(time_left)} min</h1>",
            unsafe_allow_html=True,
        )

        battery_pct = telemetry["battery_remaining"]
        if battery_pct > 50:
            st.success(f"Batería: {battery_pct:.0f}% - Suficiente para misión")
        elif battery_pct > 20:
            st.warning(f"Batería: {battery_pct:.0f}% - Planear regreso")
        else:
            st.error(f"Batería: {battery_pct:.0f}% - REGRESAR AHORA")

    with col3:
        # Temperatura (simple)
        st.markdown("### 🌡️ Temperatura Motores")

        if avg_temp < 60:
            temp_status = "FRÍA ❄️"
            temp_color = "#007bff"
        elif avg_temp < 70:
            temp_status = "NORMAL ✅"
            temp_color = "#28a745"
        else:
            temp_status = "CALIENTE 🔥"
            temp_color = "#dc3545"

        st.markdown(
            f"<h1 style='color: {temp_color}; font-size: 72px;'>{avg_temp:.0f}°C</h1>",
            unsafe_allow_html=True,
        )
        st.markdown(f"<h3>{temp_status}</h3>", unsafe_allow_html=True)

    # Barra de progreso de batería visual
    st.markdown("---")
    st.markdown("### Nivel de Batería")
    st.progress(battery_pct / 100)

    # Instrucciones simples
    st.markdown("---")
    st.markdown("### 📋 Instrucciones")

    if health >= 80 and battery_pct > 30:
        st.info("✈️ **Continuar vuelo** - Todos los sistemas normales")
    elif battery_pct <= 20:
        st.error("🔴 **REGRESAR AHORA** - Batería crítica")
    elif health < 50:
        st.error("🔴 **ATERRIZAR INMEDIATAMENTE** - Falla del sistema")
    elif battery_pct <= 30:
        st.warning("🟡 **Planear regreso** - Batería baja en 5-10 minutos")
    else:
        st.warning("🟡 **Monitorear** - Sistema en advertencia")


# =============================================================================
# MODO EXPERTO
# =============================================================================


def render_expert_dashboard(telemetry: dict) -> None:
    """
    Dashboard completo para ingenieros con todos los parámetros.
    """
    st.markdown("## 🛠️ Panel de Control - Modo Experto")
    st.markdown("---")

    # Tabs para organizar información
    tab1, tab2, tab3, tab4 = st.tabs(
        ["⚙️ Propulsión", "🔋 Batería", "📊 Performance", "📁 Logs"]
    )

    with tab1:
        render_propulsion_tab(telemetry)

    with tab2:
        render_battery_tab(telemetry)

    with tab3:
        render_performance_tab(telemetry)

    with tab4:
        render_logs_tab(telemetry)


def render_propulsion_tab(telemetry: dict) -> None:
    """Tab de propulsión con detalles técnicos."""
    col1, col2 = st.columns(2)

    with col1:
        st.markdown("#### 🌀 RPM de Motores")

        # Tabla de RPM
        motor_data = pd.DataFrame(
            {
                "Motor": [1, 2, 3, 4],
                "RPM": [telemetry[f"motor_rpm_{i}"] for i in range(1, 5)],
                "Temp (°C)": [telemetry[f"motor_temp_{i}"] for i in range(1, 5)],
                "ESC Temp (°C)": [telemetry[f"esc_temp_{i}"] for i in range(1, 5)],
            }
        )

        st.dataframe(motor_data, use_container_width=True)

        # Desbalance de RPM
        rpm_std = np.std([telemetry[f"motor_rpm_{i}"] for i in range(1, 5)])
        if rpm_std < 100:
            st.success(f"✅ Balance RPM: ±{rpm_std:.0f} rpm (excelente)")
        elif rpm_std < 200:
            st.warning(f"⚠️ Balance RPM: ±{rpm_std:.0f} rpm (aceptable)")
        else:
            st.error(f"🚨 Balance RPM: ±{rpm_std:.0f} rpm (revisar hélices)")

    with col2:
        st.markdown("#### 🌡️ Temperaturas en Tiempo Real")

        # Gráfico de temperaturas
        temp_data = pd.DataFrame(
            {
                "Component": [f"Motor {i}" for i in range(1, 5)]
                + [f"ESC {i}" for i in range(1, 5)],
                "Temperature": [telemetry[f"motor_temp_{i}"] for i in range(1, 5)]
                + [telemetry[f"esc_temp_{i}"] for i in range(1, 5)],
            }
        )

        fig = px.bar(
            temp_data,
            x="Component",
            y="Temperature",
            title="Temperatura de Componentes",
            color="Temperature",
            color_continuous_scale="RdYlGn_r",
        )
        fig.add_hline(
            y=75, line_dash="dash", line_color="red", annotation_text="Límite crítico"
        )
        st.plotly_chart(fig, use_container_width=True)

    # Vibración
    st.markdown("---")
    st.markdown("#### 📐 Análisis de Vibración")
    col1, col2 = st.columns(2)

    with col1:
        vib_total = np.sqrt(
            telemetry["vibration_x"] ** 2
            + telemetry["vibration_y"] ** 2
            + telemetry["vibration_z"] ** 2
        )

        st.metric("Vibración Total", f"{vib_total:.3f} g")
        st.metric("Vibración X", f"{telemetry['vibration_x']:.3f} g")
        st.metric("Vibración Y", f"{telemetry['vibration_y']:.3f} g")
        st.metric("Vibración Z", f"{telemetry['vibration_z']:.3f} g")

    with col2:
        if vib_total < 0.15:
            st.success("✅ Vibración normal - Hélices balanceadas")
        elif vib_total < 0.20:
            st.warning("⚠️ Vibración elevada - Verificar hélices")
        else:
            st.error("🚨 Vibración excesiva - Aterrizar y revisar")


def render_battery_tab(telemetry: dict) -> None:
    """Tab de batería con métricas detalladas."""
    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric("Voltaje", f"{telemetry['battery_voltage']:.2f} V")
        st.metric("Corriente", f"{telemetry['battery_current']:.1f} A")
        st.metric(
            "Potencia",
            f"{telemetry['battery_voltage'] * telemetry['battery_current']:.0f} W",
        )

    with col2:
        st.metric("Carga Restante", f"{telemetry['battery_remaining']:.0f}%")
        st.metric("Tiempo Restante", f"{predict_endurance(telemetry):.0f} min")
        st.metric("Voltaje/Celda", f"{telemetry['battery_voltage'] / 4:.2f} V")

    with col3:
        # Salud de batería
        health = calculate_health_score(telemetry)
        emoji, color = get_health_color(health)
        st.markdown(f"### {emoji} Salud Batería")
        st.markdown(
            f"<h2 style='color: {color};'>{int(health)}/100</h2>",
            unsafe_allow_html=True,
        )

    # Gráfico de consumo histórico (simulado)
    st.markdown("---")
    st.markdown("#### 📈 Historial de Consumo")

    # Simular datos históricos
    time_range = pd.date_range(end=datetime.now(), periods=60, freq="1S")
    consumption_data = pd.DataFrame(
        {
            "Tiempo": time_range,
            "Corriente (A)": 15 + np.random.normal(0, 2, 60),
            "Voltaje (V)": np.linspace(16.8, telemetry["battery_voltage"], 60),
        }
    )

    fig = go.Figure()
    fig.add_trace(
        go.Scatter(
            x=consumption_data["Tiempo"],
            y=consumption_data["Corriente (A)"],
            name="Corriente",
            line=dict(color="orange"),
        )
    )
    fig.add_trace(
        go.Scatter(
            x=consumption_data["Tiempo"],
            y=consumption_data["Voltaje (V)"],
            name="Voltaje",
            yaxis="y2",
            line=dict(color="blue"),
        )
    )

    fig.update_layout(
        yaxis=dict(title="Corriente (A)"),
        yaxis2=dict(title="Voltaje (V)", overlaying="y", side="right"),
        hovermode="x unified",
    )

    st.plotly_chart(fig, use_container_width=True)


def render_performance_tab(telemetry: dict) -> None:
    """Tab de performance con métricas de vuelo."""
    col1, col2 = st.columns(2)

    with col1:
        st.markdown("#### 🌍 Navegación")
        st.metric("Latitud", f"{telemetry['gps_lat']:.6f}°")
        st.metric("Longitud", f"{telemetry['gps_lon']:.6f}°")
        st.metric("Altitud", f"{telemetry['altitude']:.1f} m")
        st.metric(
            "Velocidad",
            f"{telemetry['groundspeed']:.1f} m/s ({telemetry['groundspeed'] * 3.6:.1f} km/h)",
        )

    with col2:
        st.markdown("#### ⚡ Eficiencia")

        # Cálculos de eficiencia
        power_w = telemetry["battery_voltage"] * telemetry["battery_current"]
        speed_ms = telemetry["groundspeed"]

        if speed_ms > 0:
            efficiency_wh_km = power_w / (speed_ms * 3.6)  # Wh/km
        else:
            efficiency_wh_km = 0

        st.metric("Consumo Específico", f"{efficiency_wh_km:.1f} Wh/km")
        st.metric(
            "Autonomía Estimada",
            f"{(74 / efficiency_wh_km if efficiency_wh_km > 0 else 0):.0f} km",
        )

        # Comparar con baseline
        baseline_efficiency = 5.2  # Wh/km esperado
        if efficiency_wh_km < baseline_efficiency * 1.1:
            st.success(
                f"✅ Eficiencia normal ({efficiency_wh_km / baseline_efficiency * 100:.0f}% del baseline)"
            )
        else:
            st.warning(
                f"⚠️ Consumo elevado ({efficiency_wh_km / baseline_efficiency * 100:.0f}% del baseline)"
            )


def render_logs_tab(telemetry: dict) -> None:
    """Tab de logs y export."""
    st.markdown("#### 📁 Logs y Exportación")

    # Opciones de export
    col1, col2 = st.columns(2)

    with col1:
        st.markdown("**Exportar Datos**")

        # Simular datos de vuelo
        flight_data = pd.DataFrame([telemetry])

        csv = flight_data.to_csv(index=False)
        st.download_button(
            label="📥 Descargar CSV",
            data=csv,
            file_name=f"flight_log_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
            mime="text/csv",
        )

        st.download_button(
            label="📥 Descargar JSON",
            data=flight_data.to_json(orient="records"),
            file_name=f"flight_log_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
            mime="application/json",
        )

    with col2:
        st.markdown("**Estadísticas de Vuelo**")
        st.info(
            f"Duración actual: {st.session_state.get('flight_duration', 0)} segundos"
        )
        st.info(f"Frames procesados: {st.session_state.get('frame_count', 0)}")

    # Log de eventos
    st.markdown("---")
    st.markdown("**📋 Log de Eventos**")

    if "event_log" not in st.session_state:
        st.session_state.event_log = []

    # Ejemplo de eventos
    st.text_area(
        "Eventos Recientes",
        value="\n".join(st.session_state.event_log[-10:]),
        height=200,
    )


# =============================================================================
# MAIN APP
# =============================================================================


def main() -> None:
    """Aplicación principal del dashboard."""

    # Sidebar con configuración
    with st.sidebar:
        st.image(
            "https://via.placeholder.com/200x100.png?text=FPUNA+2026",
            use_container_width=True,
        )

        st.markdown("## 🚁 UAV Dashboard")
        st.markdown("**FPUNA 2026 - Ing. Aeronáutica**")
        st.markdown("---")

        # Selector de modo (PRINCIPAL)
        mode = st.radio(
            "👤 Modo de Usuario",
            ["🟢 Simple (Operador)", "🔧 Experto (Ingeniero)"],
            help="Simple: 3 indicadores básicos\nExperto: Todos los parámetros técnicos",
        )

        st.markdown("---")

        # Configuración de simulación
        st.markdown("### ⚙️ Configuración")

        connection_type = st.selectbox(
            "Fuente de Datos", ["Simulación", "MAVLink Real (No disponible)"]
        )

        if connection_type == "Simulación":
            update_rate = st.slider("Tasa de Actualización (Hz)", 1, 10, 5)

        st.markdown("---")

        # Información del sistema
        st.markdown("### 📊 Estado del Sistema")

        if "flight_duration" not in st.session_state:
            st.session_state.flight_duration = 0

        st.info(
            f"⏱️ Tiempo de vuelo: {st.session_state.flight_duration // 60}:{st.session_state.flight_duration % 60:02d}"
        )

        # Botones de control
        col1, col2 = st.columns(2)
        with col1:
            if st.button("▶️ Iniciar", use_container_width=True):
                st.session_state.flight_active = True
                st.rerun()

        with col2:
            if st.button("⏸️ Pausar", use_container_width=True):
                st.session_state.flight_active = False
                st.rerun()

        if st.button("🔄 Resetear", use_container_width=True):
            st.session_state.flight_duration = 0
            st.session_state.frame_count = 0
            st.session_state.event_log = []
            st.rerun()

    # Área principal
    # Obtener telemetría (simulada o real)
    telemetry = simulate_telemetry_frame()

    # Incrementar contadores
    if "frame_count" not in st.session_state:
        st.session_state.frame_count = 0
    st.session_state.frame_count += 1

    if st.session_state.get("flight_active", False):
        st.session_state.flight_duration += 1

    # Renderizar según modo seleccionado
    if "Simple" in mode:
        render_simple_dashboard(telemetry)
    else:
        render_expert_dashboard(telemetry)

    # Auto-refresh (solo en simulación activa)
    if st.session_state.get("flight_active", False) and connection_type == "Simulación":
        time.sleep(1.0 / update_rate)
        st.rerun()


if __name__ == "__main__":
    main()
