# Checklist de Verificación - Template

## [NOMBRE DEL PROYECTO]

**Track**: [02-Electrónica / 03-Aeronáutica / etc.]
**Nivel**: [Principiante / Intermedio / Avanzado]
**Fecha de Verificación**: [YYYY-MM-DD]

---

## 1. Verificación de Hardware

### 1.1 Alimentación
- [ ] Voltaje de entrada dentro de especificaciones
- [ ] Corriente máxima calculada y verificada
- [ ] Protección contra polaridad inversa
- [ ] Fusible o protección de sobrecorriente
- [ ] Capacitores de desacople presentes

### 1.2 Conexiones
- [ ] Todas las conexiones verificadas contra esquemático
- [ ] Niveles lógicos compatibles (3.3V vs 5V)
- [ ] Pull-up/pull-down resistors donde necesarios
- [ ] Conexiones a tierra sólidas
- [ ] Sin cortocircuitos visibles

### 1.3 Componentes
- [ ] Valores de componentes verificados (resistencias, capacitores)
- [ ] Polaridad de componentes correcta (LEDs, electrolytics, diodos)
- [ ] Disipación de calor considerada
- [ ] Componentes dentro de ratings

---

## 2. Verificación de Firmware

### 2.1 Funcionalidad
- [ ] Código compila sin errores
- [ ] Código compila sin warnings críticos
- [ ] Todas las funciones principales probadas
- [ ] Casos edge considerados

### 2.2 Seguridad del Código
- [ ] Sin delays bloqueantes en código crítico
- [ ] Watchdog timer configurado (si aplica)
- [ ] Manejo de errores implementado
- [ ] Estados de falla definidos

### 2.3 Comunicaciones
- [ ] WiFi/Bluetooth conecta correctamente
- [ ] Protocolo (MQTT, HTTP, etc.) funciona
- [ ] Reconexión automática implementada
- [ ] Datos transmitidos correctamente

---

## 3. Verificación de Integración

### 3.1 Sistema Completo
- [ ] Todos los módulos funcionan juntos
- [ ] Timing correcto entre componentes
- [ ] Sin interferencias entre sistemas
- [ ] Comportamiento predecible

### 3.2 IoT/Cloud
- [ ] Datos llegan al dashboard
- [ ] Visualización correcta
- [ ] Alertas funcionan
- [ ] Histórico se guarda

---

## 4. Verificación de Documentación

### 4.1 Técnica
- [ ] Esquemático completo y legible
- [ ] Diagrama de conexiones claro
- [ ] Código comentado
- [ ] README actualizado

### 4.2 Usuario
- [ ] Instrucciones de uso claras
- [ ] Troubleshooting básico documentado
- [ ] Limitaciones conocidas listadas

---

## 5. Verificación de Seguridad

### 5.1 Eléctrica
- [ ] Sin cables expuestos
- [ ] Aislamiento adecuado
- [ ] Sin bordes cortantes
- [ ] Componentes fijados

### 5.2 Operacional
- [ ] Estados de falla seguros
- [ ] Sin comportamiento inesperado
- [ ] Apagado seguro implementado

---

## 6. Verificación de IA

### 6.1 Código Generado
- [ ] Revisé todo código generado por IA
- [ ] Entiendo cada línea
- [ ] Modifiqué donde necesario
- [ ] Documenté cambios

### 6.2 Información
- [ ] Verifiqué datos de datasheets citados
- [ ] Confirmé fórmulas usadas
- [ ] Validé cálculos críticos

---

## Firma de Verificación

| Verificador | Fecha | Firma |
|-------------|-------|-------|
| Estudiante | | |
| Instructor (opcional) | | |

---

## Notas Adicionales

[Cualquier observación importante sobre la verificación]

---

*Checklist de Verificación - FPUNA 2026*
