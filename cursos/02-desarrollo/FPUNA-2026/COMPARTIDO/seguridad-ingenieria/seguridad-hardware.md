# Seguridad en Proyectos de Hardware

## Guía para Tracks de Electrónica y Aeronáutica

---

## Advertencias Críticas

### Electricidad

| Riesgo | Prevención | Qué hacer si ocurre |
|--------|------------|---------------------|
| **Descarga eléctrica** | No trabajar con >50V sin supervisión | Desconectar fuente, primeros auxilios |
| **Cortocircuito** | Revisar conexiones antes de energizar | Desconectar inmediatamente |
| **Sobrecalentamiento** | Verificar ratings de corriente | Dejar enfriar, revisar diseño |
| **Incendio** | Fusibles, no sobrecargar | Extinguir, evacuar si necesario |

### Componentes Peligrosos

| Componente | Riesgo | Precauciones |
|------------|--------|--------------|
| **Capacitores grandes** | Descarga almacenada | Descargar antes de manipular |
| **Baterías LiPo** | Incendio, explosión | No perforar, cargar supervisado |
| **Motores** | Partes móviles | Proteger dedos, cabello |
| **Láser** | Daño ocular | Nunca mirar directamente |
| **Soldador** | Quemaduras | Usar soporte, no tocar punta |

---

## Reglas de Oro

### Antes de Energizar

1. **Revisar dos veces** todas las conexiones
2. **Verificar polaridad** de fuente de alimentación
3. **Confirmar voltajes** compatibles
4. **Inspeccionar** cortocircuitos visuales
5. **Tener** botón/switch de apagado accesible

### Durante Operación

1. **No tocar** circuitos energizados
2. **Usar** una sola mano cuando sea posible
3. **Mantener** área de trabajo despejada
4. **No dejar** proyectos energizados sin supervisión
5. **Desconectar** antes de modificar

### Después de Usar

1. **Desconectar** alimentación
2. **Descargar** capacitores grandes
3. **Guardar** componentes apropiadamente
4. **Limpiar** área de trabajo

---

## Verificaciones de Seguridad por Tipo de Proyecto

### Proyectos con Relays (Electrónica)

```
⚠️ PELIGRO: Los relays pueden controlar voltajes de red (220V)

Checklist:
- [ ] Relay rated para voltaje/corriente de carga
- [ ] Aislamiento adecuado entre bajo y alto voltaje
- [ ] Nunca probar con 220V en clase sin supervisión
- [ ] Usar relays con indicador LED para verificar estado
- [ ] Flyback diode para cargas inductivas
```

### Proyectos con Motores

```
⚠️ PRECAUCIÓN: Motores tienen partes móviles y pueden generar EMI

Checklist:
- [ ] Driver de motor con protección de sobrecorriente
- [ ] Capacitor de desacople cerca del motor
- [ ] Hélices/partes móviles protegidas
- [ ] Área despejada durante pruebas
- [ ] Botón de parada de emergencia
```

### Proyectos con Baterías

```
⚠️ PELIGRO: Baterías LiPo pueden incendiarse

Checklist:
- [ ] Usar cargador apropiado para el tipo de batería
- [ ] No cargar sin supervisión
- [ ] No descargar por debajo de voltaje mínimo
- [ ] Inspeccionar por hinchazón antes de usar
- [ ] Almacenar en contenedor resistente al fuego
- [ ] Nunca perforar o aplastar
```

### Proyectos de Drones/UAV (Aeronáutica)

```
⚠️ PELIGRO: Hélices girando a alta velocidad

Checklist:
- [ ] Nunca armar cerca de personas
- [ ] Probar motores sin hélices primero
- [ ] Usar protectores de hélice durante desarrollo
- [ ] Área de prueba despejada y segura
- [ ] Conocer regulaciones de DINAC
- [ ] Tener switch de corte de emergencia
```

---

## Qué Hacer en Emergencias

### Descarga Eléctrica

1. NO tocar a la víctima si sigue en contacto
2. Desconectar fuente de energía
3. Llamar ayuda médica si es necesario
4. Aplicar RCP si no respira

### Incendio Pequeño

1. Desconectar alimentación
2. Usar extintor clase C (eléctrico)
3. NO usar agua en fuegos eléctricos
4. Evacuar si no se controla

### Quemadura por Soldador

1. Enfriar con agua fría (10-20 min)
2. No aplicar hielo directamente
3. Cubrir con vendaje estéril
4. Buscar atención médica si es severa

### Componente Sobrecalentado

1. Desconectar inmediatamente
2. NO tocar - puede estar muy caliente
3. Alejarse - puede emitir humo tóxico
4. Ventilar área
5. Revisar diseño antes de volver a energizar

---

## Equipo de Protección Recomendado

| Item | Para Qué | Cuándo Usar |
|------|----------|-------------|
| **Lentes de seguridad** | Protección ocular | Soldando, cortando cables |
| **Guantes antiestáticos** | Proteger componentes | Manipulando ICs sensibles |
| **Muñequera antiestática** | Descargar estática | Trabajando con electrónica |
| **Extractor de humo** | Evitar inhalar flux | Soldando |
| **Multímetro** | Verificar voltajes | SIEMPRE antes de tocar |

---

## Contactos de Emergencia

- **Emergencias Paraguay**: 911
- **Bomberos**: 132
- **ANDE (emergencias eléctricas)**: *288

---

## Firma de Compromiso

> Yo, _________________________, he leído y entendido estas normas de seguridad.
> Me comprometo a seguirlas durante todo el curso.
>
> Firma: _________________ Fecha: _________________

---

*Seguridad en Hardware - FPUNA 2026*
