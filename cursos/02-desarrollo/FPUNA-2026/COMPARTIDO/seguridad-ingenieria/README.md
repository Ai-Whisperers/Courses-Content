# Seguridad en Ingeniería con IA

## FPUNA 2026 - Recursos Compartidos

Este directorio contiene frameworks de seguridad y verificación para tracks de ingeniería que usan IA.

---

## Contenido

| Archivo | Descripción | Tracks |
|---------|-------------|--------|
| [limites-ia-template.md](./limites-ia-template.md) | Template para documentar límites de IA | Todos |
| [verificacion-checklist-template.md](./verificacion-checklist-template.md) | Checklist de verificación pre-entrega | Todos |
| [seguridad-hardware.md](./seguridad-hardware.md) | Seguridad específica para hardware | 02-Electrónica, 03-Aeronáutica |

---

## Por Qué Es Importante

### IA en Ingeniería: Riesgos Reales

| Riesgo | Ejemplo | Consecuencia |
|--------|---------|--------------|
| **Cálculos incorrectos** | IA calcula mal factor de seguridad | Falla estructural |
| **Parámetros inventados** | IA genera specs que no existen | Componente incompatible |
| **Código no verificado** | Firmware con bugs críticos | Mal funcionamiento peligroso |
| **Datasheets mal interpretados** | Conexión de voltaje incorrecto | Daño de componentes/personas |

### Framework de Confianza

```
┌─────────────────────────────────────────────────────────────┐
│                    NIVEL DE CONFIANZA EN IA                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ALTA CONFIANZA (usar libremente)                           │
│  ├── Explicaciones conceptuales                              │
│  ├── Documentación y comentarios                             │
│  ├── Búsqueda de información general                         │
│  └── Templates y boilerplate                                 │
│                                                              │
│  MEDIA CONFIANZA (verificar siempre)                        │
│  ├── Código generado                                         │
│  ├── Cálculos numéricos                                      │
│  ├── Interpretación de datasheets                            │
│  └── Configuraciones de hardware                             │
│                                                              │
│  BAJA CONFIANZA (aprender primero)                          │
│  ├── Análisis de seguridad                                   │
│  ├── Dimensionamiento crítico                                │
│  ├── Conexiones de potencia                                  │
│  └── Certificaciones y normativas                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Uso por Track

### Track 02 - Electrónica y Automatización

**Riesgos específicos**:
- Conexiones de voltaje/corriente incorrectas
- Componentes sobrecalentados
- Cortocircuitos
- Interferencia electromagnética

**Ver**: [seguridad-hardware.md](./seguridad-hardware.md)

### Track 03 - Ingeniería Aeronáutica

**Riesgos específicos**:
- Cálculos aerodinámicos incorrectos
- Factores de seguridad mal dimensionados
- Materiales inapropiados
- Simulaciones no validadas

**Ver**: Adaptaciones específicas en `03-INGENIERIA-AERONAUTICA/recursos/LIMITS-OF-AI.md`

---

## Implementación en tu Proyecto

### 1. Copiar Templates

```bash
# Desde la raíz del proyecto
cp ../COMPARTIDO/seguridad-ingenieria/limites-ia-template.md ./docs/LIMITES-IA.md
cp ../COMPARTIDO/seguridad-ingenieria/verificacion-checklist-template.md ./docs/VERIFICACION.md
```

### 2. Personalizar para tu Proyecto

Edita los archivos copiados agregando:
- Riesgos específicos de tu proyecto
- Checkpoints de verificación
- Responsabilidades humano vs IA

### 3. Usar Durante Desarrollo

Antes de cada entrega:
1. Revisar checklist de verificación
2. Documentar uso de IA
3. Validar cálculos críticos manualmente

---

## Referencias

- [OWASP AI Security](https://owasp.org/www-project-ai-security/)
- [IEEE P2899 - AI Engineering Guidelines](https://standards.ieee.org/)
- Normativas locales de seguridad eléctrica (ANDE, Paraguay)

---

*COMPARTIDO/seguridad-ingenieria - FPUNA 2026*
