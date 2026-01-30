# Skill: Análisis de Progreso Estudiantil

## Metadata

- **Name**: Análisis de Progreso Estudiantil
- **Category**: Education Analytics
- **Activation**: When user mentions "progreso estudiantes", "análisis de rendimiento", "métricas del curso", "dashboard estudiantil", "seguimiento", "reporte de avance"
- **Model**: Sonnet
- **Est. Token Cost**: ~2500 tokens

## When to Activate

Trigger when user says:
- "Analiza el progreso de los estudiantes"
- "Genera métricas del curso"
- "Dashboard de rendimiento"
- "Cómo van los estudiantes?"
- "Reporte de avance semanal"
- "Análisis de participación"

## Purpose

Analiza datos de estudiantes para generar insights sobre progreso, identificar riesgos, y recomendar intervenciones pedagógicas.

## Métricas Clave

### 1. Engagement (Participación)

```python
engagement_metrics = {
    "commits_per_student": {
        "weekly": "average",
        "trend": "increasing|stable|decreasing"
    },
    "time_to_first_commit": {
        "after_assignment": "days",
        "benchmark": "< 3 days is good"
    },
    "code_quality_trend": {
        "linting_errors": "trend over time",
        "test_coverage": "percentage"
    },
    "help_seeking": {
        "questions_asked": "count",
        "office_hours_attended": "count"
    }
}
```

### 2. Performance (Rendimiento)

```python
performance_metrics = {
    "assignment_completion": {
        "on_time": "percentage",
        "late": "percentage",
        "missing": "percentage"
    },
    "grades": {
        "current_average": "0-100",
        "trend": "improving|stable|declining",
        "comparison_to_class": "percentile"
    },
    "test_results": {
        "pass_rate": "percentage",
        "flaky_tests": "count",
        "coverage": "percentage"
    }
}
```

### 3. Risk Indicators

```python
risk_factors = {
    "at_risk_signals": [
        "no commits in 7 days",
        "grade < 60 for 2+ weeks",
        "missing assignments > 2",
        "no office hours visits",
        "late submissions > 50%",
        "code quality declining"
    ],
    "risk_level": "low|medium|high|critical"
}
```

## Reporte de Progreso

### Estructura del Reporte

```markdown
# 📊 Análisis de Progreso - {{course_name}}

**Período**: {{start_date}} - {{end_date}}  
**Generado**: {{generation_date}}

---

## 🎯 Resumen Ejecutivo

### Estadísticas Generales
- **Total estudiantes**: {{count}}
- **Activos esta semana**: {{active_count}} ({{active_pct}}%)
- **En riesgo**: {{at_risk_count}} ({{at_risk_pct}}%)
- **Promedio general**: {{average_grade}}/100

### Distribución de Calificaciones
```
90-100: ████████ {{excellent}} estudiantes ({{excellent_pct}}%)
80-89:  ████████████ {{good}} estudiantes ({{good_pct}}%)
70-79:  ██████ {{average}} estudiantes ({{average_pct}}%)
60-69:  ███ {{below_avg}} estudiantes ({{below_avg_pct}}%)
<60:    ██ {{failing}} estudiantes ({{failing_pct}}%)
```

---

## 📈 Tendencias

### Participación (últimas 4 semanas)
| Semana | Commits | PRs | Reviews | Calidad |
|--------|---------|-----|---------|---------|
| W1 | {{w1_commits}} | {{w1_prs}} | {{w1_reviews}} | {{w1_quality}}% |
| W2 | {{w2_commits}} | {{w2_prs}} | {{w2_reviews}} | {{w2_quality}}% |
| W3 | {{w3_commits}} | {{w3_prs}} | {{w3_reviews}} | {{w3_quality}}% |
| W4 | {{w4_commits}} | {{w4_prs}} | {{w4_reviews}} | {{w4_quality}}% |

### Rendimiento Académico
```
Promedio clase
W1: ████████░░ 72%
W2: ████████░░ 74% ↑
W3: █████████░ 78% ↑
W4: █████████░ 76% ↓
```

---

## ⚠️ Estudiantes en Riesgo

### 🔴 Crítico (Necesitan intervención inmediata)
{% for student in critical_risk %}
**{{student.name}}** ({{student.id}})
- Último commit: {{student.last_commit}} días
- Promedio: {{student.grade}}/100
- Entregas faltantes: {{student.missing}}
- **Acción recomendada**: {{student.recommended_action}}
{% endfor %}

### 🟡 Medio (Monitorear de cerca)
{% for student in medium_risk %}
**{{student.name}}** ({{student.id}})
- Tendencia: {{student.trend}}
- Promedio: {{student.grade}}/100
- **Acción recomendada**: {{student.recommended_action}}
{% endfor %}

---

## 🌟 Estudiantes Destacados

### 🏆 Mejor Progreso (última semana)
{% for student in top_improved %}
**{{student.name}}**: +{{student.improvement}} puntos
- De {{student.old_grade}} a {{student.new_grade}}
- {{student.highlight_action}}
{% endfor %}

### 💡 Mejor Calidad de Código
{% for student in top_quality %}
**{{student.name}}**: {{student.quality_score}}/100
- {{student.quality_notes}}
{% endfor %}

### 🤝 Mejor Colaboración
{% for student in top_collaborators %}
**{{student.name}}**: {{student.reviews_given}} reviews
- {{student.collaboration_notes}}
{% endfor %}

---

## 💡 Recomendaciones Pedagógicas

### Para el Grupo
1. **{{recommendation_1}}** - Impacto estimado: {{impact_1}}
2. **{{recommendation_2}}** - Impacto estimado: {{impact_2}}
3. **{{recommendation_3}}** - Impacto estimado: {{impact_3}}

### Intervenciones Individuales
{% for intervention in individual_interventions %}
**{{intervention.student}}**: {{intervention.action}}
- Prioridad: {{intervention.priority}}
- Fecha objetivo: {{intervention.deadline}}
{% endfor %}

---

## 📋 Próximos Pasos

### Esta Semana
- [ ] {{action_1}}
- [ ] {{action_2}}
- [ ] {{action_3}}

### Próximas 2 Semanas
- [ ] {{action_4}}
- [ ] {{action_5}}

---

## 📊 Datos Crudos

[Enlace a spreadsheet/CSV con datos completos]

---

**Analizador**: Claude Code + FPUNA Analytics System  
**Confidencialidad**: Uso docente exclusivo
```

## Automatización

### Script de Análisis

```python
#!/usr/bin/env python3
"""
Analizador de progreso estudiantil.
"""

import pandas as pd
from datetime import datetime, timedelta
from pathlib import Path

class StudentProgressAnalyzer:
    def __init__(self, data_path: str):
        self.data = pd.read_csv(data_path)
        self.report_date = datetime.now()
        
    def analyze(self) -> dict:
        return {
            "overview": self._get_overview(),
            "engagement": self._analyze_engagement(),
            "performance": self._analyze_performance(),
            "at_risk": self._identify_at_risk(),
            "recommendations": self._generate_recommendations()
        }
    
    def _identify_at_risk(self) -> list:
        """Identify students at risk of failing."""
        at_risk = []
        
        for _, student in self.data.iterrows():
            risk_factors = []
            
            if student['last_commit_days'] > 7:
                risk_factors.append("no_recent_commits")
            if student['grade'] < 60:
                risk_factors.append("failing_grade")
            if student['missing_assignments'] > 2:
                risk_factors.append("missing_work")
            if student['late_submission_rate'] > 0.5:
                risk_factors.append("chronic_late")
                
            if len(risk_factors) >= 2:
                at_risk.append({
                    "student_id": student['id'],
                    "name": student['name'],
                    "risk_level": "critical" if len(risk_factors) >= 3 else "medium",
                    "factors": risk_factors,
                    "recommended_action": self._get_intervention(risk_factors)
                })
        
        return at_risk
    
    def _generate_recommendations(self) -> list:
        """Generate pedagogical recommendations."""
        # Implementation
        pass

# Usage
analyzer = StudentProgressAnalyzer("students_data.csv")
report = analyzer.analyze()
```

## Success Criteria

Análisis completado cuando:
- [ ] Datos de estudiantes analizados
- [ ] Métricas calculadas
- [ ] Estudiantes en riesgo identificados
- [ ] Tendencias detectadas
- [ ] Recomendaciones generadas
- [ ] Reporte completo creado

---

**Last Updated:** 2025-01-30
**Course:** FPUNA AI Education
**Version:** 1.0 - Student Progress Analysis
**Maintained by:** FPUNA AI Education Team
