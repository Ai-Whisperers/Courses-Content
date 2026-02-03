# Skill: Validación de Estándares Académicos FPUNA

## Metadata

- **Name**: Validación de Estándares Académicos FPUNA
- **Category**: Education & Quality Assurance
- **Activation**: When user mentions "estándares", "validar trabajo", "formato FPUNA", "normativa", "requisitos académicos", "estilo FPUNA"
- **Model**: Sonnet (for comprehensive validation)
- **Est. Token Cost**: ~2500 tokens

## When to Activate

Trigger when user says:
- "Valida que esto cumple estándares FPUNA"
- "Revisa formato académico"
- "Cumple con las normas?"
- "Verifica requisitos del trabajo"
- "Está bien el formato?"
- "Validación de tesis/documento"

## Purpose

Valida que trabajos académicos cumplen estándares institucionales de la FPUNA: formato, estructura, citaciones, y requisitos específicos por tipo de documento.

## Estándares FPUNA por Tipo de Documento

### 1. Trabajos de Investigación/Tesis

#### Estructura Requerida

```
1. Portada (formato oficial FPUNA)
2. Dedicatoria (opcional)
3. Agradecimientos (opcional)
4. Índice General
5. Índice de Tablas
6. Índice de Figuras
7. Resumen (máximo 250 palabras)
   - Español
   - Guaraní (opcional)
   - Inglés
8. Introducción
9. Marco Teórico / Estado del Arte
10. Metodología
11. Resultados
12. Discusión
13. Conclusiones
14. Recomendaciones (opcional)
15. Referencias Bibliográficas
16. Anexos (si aplica)
```

#### Formato de Portada

```markdown
╔══════════════════════════════════════════╗
║                                          ║
║      [LOGO FPUNA]                        ║
║                                          ║
║   FACULTAD POLITÉCNICA                   ║
║   UNIVERSIDAD NACIONAL DE ASUNCIÓN       ║
║                                          ║
║   [Nombre de la Carrera]                 ║
║                                          ║
║   ─────────────────────────────          ║
║                                          ║
║   TÍTULO DEL TRABAJO                     ║
║   (En mayúsculas, negrita, centrado)     ║
║                                          ║
║   ─────────────────────────────          ║
║                                          ║
║   Trabajo de [Grado/Tesis/Investigación] ║
║   presentado como requisito para...      ║
║                                          ║
║   Autor: [Nombre Completo]               ║
║   Tutor: [Nombre del Tutor]              ║
║                                          ║
║   Asunción, Paraguay                     ║
║   [Mes, Año]                             ║
║                                          ║
╚══════════════════════════════════════════╝
```

#### Requisitos de Formato

**Tipografía:**
- Cuerpo: Times New Roman 12pt
- Títulos: Times New Roman 14pt negrita
- Subtítulos: Times New Roman 12pt negrita
- Interlineado: 1.5
- Márgenes: 2.5 cm (todos los lados)
- Numeración: Inferior derecha (excepto portada)

**Páginas:**
- Numeración romana minúscula: índices, resúmenes
- Numeración arábiga: desde introducción
- Portada no numerada pero cuenta como i

#### Sistema de Citación

**APA 7ª Edición** (recomendado):
```
Texto: (Autor, Año) o Autor (Año)
Referencia: Autor, A. A. (Año). Título...
```

**ISO 690** (alternativo):
```
Texto: [1], [2-5]
Referencia: Numerada en orden de aparición
```

### 2. Informes Técnicos/Laboratorio

#### Estructura

```
1. Carátula
   - Universidad
   - Facultad/Carrera
   - Materia
   - Título del informe
   - Integrantes
   - Fecha

2. Índice

3. Objetivos
   - General
   - Específicos

4. Marco Teórico (breve)

5. Materiales y Métodos

6. Resultados

7. Discusión/Análisis

8. Conclusiones

9. Referencias

10. Anexos (fotos, cálculos, etc.)
```

#### Requisitos Específicos

- **Longitud**: Varía según asignatura (consultar docente)
- **Lenguaje**: Técnico pero comprensible
- **Datos**: Tablas numeradas con título
- **Figuras**: Numeradas con leyenda descriptiva
- **Unidades**: Sistema Internacional (SI)

### 3. Proyectos de Software

#### Estructura de Documentación

```
📁 proyecto-final/
├── 📄 README.md                    (Obligatorio)
├── 📄 documentacion/
│   ├── 📄 01-especificacion.md     (Requerimientos)
│   ├── 📄 02-diseno.md            (Arquitectura)
│   ├── 📄 03-implementacion.md     (Detalles técnicos)
│   ├── 📄 04-manual-usuario.md     (Guía de uso)
│   └── 📄 05-manual-tecnico.md     (Para desarrolladores)
├── 📁 src/                        (Código fuente)
├── 📁 tests/                      (Tests)
├── 📁 docs/                       (Documentación generada)
└── 📄 requirements.txt            (Dependencias)
```

#### README.md Template FPUNA

```markdown
# [Nombre del Proyecto]

**Autor**: [Nombre]  
**Carrera**: [Carrera] - FPUNA  
**Asignatura**: [Materia]  
**Profesor**: [Nombre]  
**Año**: 2025

## 📋 Descripción

[Breve descripción del proyecto, máximo 3 párrafos]

## 🎯 Objetivos

- Objetivo 1
- Objetivo 2
- Objetivo 3

## 🚀 Instalación

```bash
# 1. Clonar repositorio
git clone https://github.com/usuario/proyecto.git

# 2. Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# o
.\venv\Scripts\activate    # Windows

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Ejecutar
python main.py
```

## 📖 Uso

[Ejemplos de uso con código]

## 🧪 Testing

```bash
pytest -v
```

## 📚 Documentación

- [Especificación](./documentacion/01-especificacion.md)
- [Diseño](./documentacion/02-diseno.md)
- [Manual de Usuario](./documentacion/04-manual-usuario.md)

## 📊 Características

- [x] Característica 1
- [x] Característica 2
- [ ] Característica futura

## 🤝 Contribución

[Instrucciones para contribuir]

## 📄 Licencia

Este proyecto es parte del curso de [Materia] - FPUNA 2025.

## 🙏 Agradecimientos

- Profesor [Nombre]
- Compañeros de curso
- [Recursos utilizados]

---

**Nota**: Este proyecto fue desarrollado con fines educativos en la 
Facultad Politécnica de la Universidad Nacional de Asunción.
```

## Proceso de Validación

### Step 1: Análisis General

```python
{
  "document_type": "tesis|informe|proyecto|artículo",
  "carrera": "nombre_carrera",
  "subject": "nombre_materia",
  "language": "es|es+gn|en",
  "validation_scope": "estructura|formato|citación|completo"
}
```

### Step 2: Checklist de Validación

#### Validación de Estructura

```markdown
## ✅ Checklist Estructural

### Elementos Obligatorios
- [ ] Portada con todos los datos requeridos
- [ ] Índice actualizado
- [ ] Numeración correcta
- [ ] Resumen en español (máx 250 palabras)
- [ ] Introducción
- [ ] Desarrollo/Metodología
- [ ] Resultados
- [ ] Conclusiones
- [ ] Referencias bibliográficas

### Elementos Opcionales (verificar si aplica)
- [ ] Dedicatoria
- [ ] Agradecimientos
- [ ] Resumen en guaraní
- [ ] Resumen en inglés
- [ ] Anexos
- [ ] Glosario
```

#### Validación de Formato

```markdown
## ✅ Checklist de Formato

### Tipografía
- [ ] Fuente: Times New Roman (o Arial si se especifica)
- [ ] Tamaño cuerpo: 12pt
- [ ] Tamaño títulos: 14pt negrita
- [ ] Interlineado: 1.5

### Página
- [ ] Márgenes: 2.5 cm todos lados
- [ ] Numeración correcta (romanos/arábigos)
- [ ] Alineación: Justificado

### Citas y Referencias
- [ ] Sistema de citación consistente
- [ ] Todas las citas en referencias
- [ ] Formato de referencias correcto
- [ ] DOI/URL cuando aplica
```

### Step 3: Validación Específica por Tipo

#### Para Tesis/Investigación

```python
validation_rules = {
    "resumen": {
        "max_words": 250,
        "languages": ["es", "gn", "en"],  # es obligatorio, gn/en opcional
        "sections": ["contexto", "objetivos", "metodología", 
                    "resultados", "conclusiones"]
    },
    "introduccion": {
        "min_pages": 2,
        "max_pages": 5,
        "must_include": ["planteamiento", "justificación", "objetivos"]
    },
    "marco_teorico": {
        "min_sources": 15,
        "max_age_sources": 10,  # años
        "local_sources_pct": 20  # % mínimo fuentes locales PY
    },
    "metodologia": {
        "min_pages": 3,
        "must_include": ["tipo_investigacion", "diseño", 
                        "poblacion_muestra", "técnicas"]
    },
    "conclusiones": {
        "max_items": 5,
        "must_respond": "objetivos",
        "no_new_data": True
    }
}
```

#### Para Informes Técnicos

```python
validation_rules = {
    "caratula": {
        "required_fields": ["universidad", "facultad", "carrera", 
                          "materia", "titulo", "integrantes", "fecha"]
    },
    "objetivos": {
        "general": 1,
        "especificos": "2-4"
    },
    "marco_teorico": {
        "max_pages": 3,
        "relevance": "high"
    },
    "materiales_metodos": {
        "must_be_reproducible": True,
        "detail_level": "sufficient"
    },
    "resultados": {
        "tables_numbered": True,
        "figures_numbered": True,
        "si_units": True
    }
}
```

#### Para Proyectos de Software

```python
validation_rules = {
    "repository": {
        "has_readme": True,
        "has_gitignore": True,
        "has_requirements": True,
        "proper_structure": True
    },
    "code": {
        "pep8_compliant": True,
        "has_tests": True,
        "min_coverage": 70,
        "has_docstrings": True
    },
    "documentation": {
        "specification_exists": True,
        "design_doc_exists": True,
        "user_manual_exists": True,
        "technical_manual_exists": True
    },
    "fpuna_context": {
        "mentions_fpuna": True,
        "has_academic_disclaimer": True,
        "educational_purpose_clear": True
    }
}
```

## Reporte de Validación

### Estructura del Reporte

```markdown
# 📋 Reporte de Validación FPUNA

**Documento**: [Tipo]  
**Autor(es)**: [Nombre(s)]  
**Fecha de validación**: [DD/MM/YYYY]  
**Validador**: [Nombre/Claude Code]

---

## 🎯 Resumen Ejecutivo

### Estado General: [✅ APROBADO / ⚠️ CON OBSERVACIONES / ❌ RECHAZADO]

**Puntuación**: [X]/100

- Estructura: [X]/25
- Formato: [X]/25
- Contenido: [X]/25
- Citación/Referencias: [X]/25

---

## ✅ Validación por Categoría

### 1. Estructura (25 pts)

#### Elementos Presentes
- [✅/❌] Portada completa (5 pts)
- [✅/❌] Índice actualizado (5 pts)
- [✅/❌] Resumen(s) correcto(s) (5 pts)
- [✅/❌] Secciones requeridas (5 pts)
- [✅/❌] Orden lógico (5 pts)

**Puntuación**: [X]/25
**Observaciones**: [Detalles]

### 2. Formato (25 pts)

#### Tipografía
- [✅/❌] Fuente correcta (5 pts)
- [✅/❌] Tamaños correctos (5 pts)
- [✅/❌] Interlineado (3 pts)
- [✅/❌] Márgenes (4 pts)
- [✅/❌] Numeración (4 pts)
- [✅/❌] Alineación (4 pts)

**Puntuación**: [X]/25
**Observaciones**: [Detalles]

### 3. Contenido (25 pts)

#### Calidad
- [✅/❌] Claridad (5 pts)
- [✅/❌] Coherencia (5 pts)
- [✅/❌] Precisión técnica (5 pts)
- [✅/❌] Profundidad (5 pts)
- [✅/❌] Ortografía/Gramática (5 pts)

**Puntuación**: [X]/25
**Observaciones**: [Detalles]

### 4. Citación y Referencias (25 pts)

#### Sistema de Citación
- [✅/❌] Consistencia (10 pts)
- [✅/❌] Formato correcto (8 pts)
- [✅/❌] Integridad (todas citadas en refs) (7 pts)

**Puntuación**: [X]/25
**Observaciones**: [Detalles]

---

## 🔍 Hallazgos Detallados

### 🔴 Críticos (Deben corregirse)

1. **[Issue]**: [Descripción]
   - **Ubicación**: [Página/sección]
   - **Solución**: [Acción concreta]
   - **Prioridad**: ALTA

### 🟡 Importantes (Recomendados)

2. **[Issue]**: [Descripción]
   - **Ubicación**: [Página/sección]
   - **Solución**: [Acción concreta]
   - **Prioridad**: MEDIA

### 🟢 Menores (Opcionales)

3. **[Issue]**: [Descripción]
   - **Ubicación**: [Página/sección]
   - **Solución**: [Acción concreta]
   - **Prioridad**: BAJA

---

## 📊 Estadísticas

### Métricas
- **Páginas totales**: [X]
- **Palabras**: [X]
- **Figuras**: [X]
- **Tablas**: [X]
- **Referencias**: [X]
- **Fuentes locales (PY)**: [X] ([X]%)

### Distribución de Contenido
```
Introducción:     ████████░░ 15%
Marco Teórico:    ██████████ 25%
Metodología:      ██████░░░░ 15%
Resultados:       ████████░░ 20%
Discusión:        ████░░░░░░ 10%
Conclusiones:     ███░░░░░░░  8%
Referencias:      ██░░░░░░░░  5%
Other:            █░░░░░░░░░  2%
```

---

## 🎓 Recomendaciones

### Para Aprobar
1. [Acción 1]
2. [Acción 2]
3. [Acción 3]

### Para Mejorar Calificación
1. [Mejora 1]
2. [Mejora 2]
3. [Mejora 3]

### Mejores Prácticas Observadas
1. [Práctica positiva 1]
2. [Práctica positiva 2]

---

## 📚 Referencias a Normas

- [Normativa FPUNA Tesis](link)
- [Guía de estilo APA 7](link)
- [Formato de informes técnicos](link)

---

## ✅ Checklist Final

- [ ] Validación estructural completa
- [ ] Validación de formato completa
- [ ] Validación de contenido completa
- [ ] Validación de citaciones completa
- [ ] Reporte generado
- [ ] Feedback proporcionado

---

**Próxima revisión**: [Fecha opcional]  
**Notas adicionales**: [Observaciones generales]
```

## Casos Especiales

### Validación de Código en Tesis

Si la tesis incluye código:

```python
code_validation = {
    "repository_structure": {
        "required_files": ["README.md", "requirements.txt", ".gitignore"],
        "directories": ["src", "docs", "tests"]
    },
    "code_quality": {
        "linter_pass": True,  # flake8
        "formatter_pass": True,  # black
        "type_check_pass": True,  # mypy
        "test_coverage": 70  # mínimo
    },
    "documentation": {
        "docstrings": True,
        "readme_complete": True,
        "inline_comments": True
    },
    "in_thesis": {
        "code_explained": True,
        "algorithms_documented": True,
        "results_reproducible": True
    }
}
```

### Validación Multilingüe (Guaraní)

```python
multilingual_validation = {
    "resumen_gn": {
        "max_words": 250,
        "required_for": ["tesis", "trabajo_final"],
        "quality": "professional",  # not just translation
        "components": ["contexto", "objetivos", "resultados"]
    },
    "palabras_clave_gn": {
        "count": "3-5",
        "relevance": "high"
    }
}
```

## Automatización

### Script de Validación

```python
#!/usr/bin/env python3
"""
Validador de estándares FPUNA.
"""

from pathlib import Path
import re

class FPUNAValidator:
    def __init__(self, document_path: str, doc_type: str):
        self.path = Path(document_path)
        self.doc_type = doc_type
        self.issues = []
        self.score = 0
        
    def validate(self) -> dict:
        """Run all validations."""
        return {
            "structure": self._validate_structure(),
            "format": self._validate_format(),
            "content": self._validate_content(),
            "citations": self._validate_citations()
        }
    
    def _validate_structure(self) -> dict:
        """Check document structure."""
        # Implementation
        pass
    
    def _validate_citations(self) -> dict:
        """Check citation format."""
        text = self.path.read_text()
        
        # Check APA format: (Author, Year)
        apa_pattern = r'\([A-Z][a-z]+, \d{4}\)'
        apa_matches = re.findall(apa_pattern, text)
        
        # Check ISO format: [1], [2]
        iso_pattern = r'\[\d+\]'
        iso_matches = re.findall(iso_pattern, text)
        
        return {
            "apa_style": len(apa_matches),
            "iso_style": len(iso_matches),
            "consistent": len(apa_matches) > 0 or len(iso_matches) > 0
        }

# Usage
validator = FPUNAValidator("tesis.pdf", "tesis")
results = validator.validate()
```

## Success Criteria

Validación completada cuando:
- [ ] Todos los elementos estructurales verificados
- [ ] Formato validado contra estándares
- [ ] Sistema de citación verificado
- [ ] Contenido revisado por calidad
- [ ] Reporte completo generado
- [ ] Feedback accionable proporcionado
- [ ] Puntuación asignada
- [ ] Recomendaciones claras dadas

---

**Last Updated:** 2025-01-30
**Course:** FPUNA AI Education
**Version:** 1.0 - Validación Estándares FPUNA
**Maintained by:** FPUNA AI Education Team
