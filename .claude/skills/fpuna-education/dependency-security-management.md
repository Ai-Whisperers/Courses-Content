# Skill: Gestión de Dependencias y Seguridad Educativa

## Metadata

- **Name**: Gestión de Dependencias y Seguridad
- **Category**: Security & DevOps
- **Activation**: When user mentions "dependencias", "seguridad", "vulnerabilidades", "pip-audit", "requirements", "actualizar librerías", "bandit"
- **Model**: Sonnet
- **Est. Token Cost**: ~1500 tokens

## When to Activate

Trigger when:
- "Revisa seguridad del proyecto"
- "Actualiza dependencias"
- "Vulnerabilidades en requirements"
- "Seguridad del código"
- "pip-audit"
- "bandit scan"

## Purpose

Gestiona dependencias de proyectos Python y detecta problemas de seguridad, enseñando mejores prácticas de seguridad a estudiantes.

## Comandos de Seguridad

### 1. Análisis de Dependencias

```bash
# Verificar vulnerabilidades
pip-audit

# En requirements específico
pip-audit -r requirements.txt

# Formato JSON para CI
pip-audit -r requirements.txt -f json -o audit-report.json
```

### 2. Análisis de Código

```bash
# Security linting
bandit -r src/ -f json -o bandit-report.json

# Excluir tests
bandit -r src/ -x tests/

# Solo high severity
bandit -r src/ -lll
```

### 3. Gestión de Dependencias

```bash
# Congelar dependencias
pip freeze > requirements.txt

# Instalar desde requirements
pip install -r requirements.txt

# Actualizar todas
pip install --upgrade -r requirements.txt

# Ver paquetes desactualizados
pip list --outdated
```

## Reporte de Seguridad

```markdown
# 🔒 Reporte de Seguridad

**Proyecto**: {{project_name}}  
**Fecha**: {{date}}  
**Scanner**: Claude Security Assistant

---

## 📊 Resumen

- **Vulnerabilidades encontradas**: {{vuln_count}}
  - 🔴 Críticas: {{critical}}
  - 🟡 Altas: {{high}}
  - 🟢 Medias: {{medium}}
  - ⚪ Bajas: {{low}}
  
- **Issues de código**: {{code_issues}}
- **Dependencias desactualizadas**: {{outdated_count}}

---

## 🚨 Vulnerabilidades

{% for vuln in vulnerabilities %}
### {{vuln.package}} ({{vuln.severity}})

- **Versión afectada**: {{vuln.version}}
- **CVE**: {{vuln.cve}}
- **Descripción**: {{vuln.description}}
- **Solución**: Actualizar a {{vuln.fixed_version}}

```bash
pip install {{vuln.package}}>={{vuln.fixed_version}}
```
{% endfor %}

---

## 🛡️ Mejores Prácticas

### Seguridad en Código

✅ **Hacer:**
- Validar todas las entradas
- Usar consultas parametrizadas
- Manejar errores apropiadamente
- No hardcodear secrets
- Usar HTTPS siempre

❌ **Evitar:**
- `eval()` con input de usuario
- SQL concatenation
- Contraseñas en código
- Excepciones genéricas
- Debug en producción

### Gestión de Dependencias

✅ **Hacer:**
- Fijar versiones: `package==1.2.3`
- Usar `>=` con cuidado
- Auditar mensualmente
- Separar dev/prod requirements

```
requirements.txt        # Producción
requirements-dev.txt    # Desarrollo
requirements-test.txt   # Testing
```

---

## 🎯 Acciones Recomendadas

### Inmediatas (Esta semana)
1. {{action_1}}
2. {{action_2}}

### Corto plazo (Este mes)
1. {{action_3}}
2. {{action_4}}

### Automatización
```yaml
# .github/workflows/security.yml
name: Security Audit
on: [push, pull_request]
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - run: pip install pip-audit bandit
      - run: pip-audit -r requirements.txt
      - run: bandit -r src/ -lll
```

---

**Last Updated:** 2025-01-30
