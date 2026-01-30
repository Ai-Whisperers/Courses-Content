# Skill: Generador de Material de Curso

## Metadata

- **Name**: Generador de Material de Curso FPUNA
- **Category**: Education & Content Creation
- **Activation**: When user mentions "crear material", "generar contenido", "preparar clase", "nuevo módulo", "diapositivas", "notebook", "ejercicios"
- **Model**: Sonnet (for comprehensive content)
- **Est. Token Cost**: ~4000 tokens

## When to Activate

Trigger when user says:
- "Prepara material sobre [tema]"
- "Genera contenido para el módulo de [tema]"
- "Crea ejercicios de [tema]"
- "Necesito diapositivas sobre [tema]"
- "Prepara un notebook de Jupyter"
- "Crea guía de estudio"
- "Genera proyecto práctico"

## Purpose

Genera material educativo completo: notebooks, ejercicios, diapositivas, guías de estudio y proyectos prácticos adaptados al contexto FPUNA.

## Tipos de Material

### 1. Jupyter Notebooks Educativos

#### Estructura Estándar

```markdown
# 📚 [Título del Módulo]
**Curso**: [Nombre del Curso]  
**Módulo**: [Número]  
**Duración**: [X] horas  
**Nivel**: Básico/Intermedio/Avanzado

## 🎯 Objetivos de Aprendizaje
Al finalizar este módulo, el estudiante será capaz de:
1. [Objetivo 1]
2. [Objetivo 2]
3. [Objetivo 3]

## 📋 Prerrequisitos
- [Prerrequisito 1]
- [Prerrequisito 2]

## 🚀 Contenido

### Sección 1: [Título]
[Explicación teórica con ejemplos]

```python
# Ejemplo de código
print("Hola Mundo")
```

#### 📝 Ejercicio Rápido 1
[Descripción breve del ejercicio]

```python
# Tu código aquí

```

### Sección 2: [Título]
...

## 🎯 Proyecto Práctico

### Descripción
[Breve descripción del proyecto]

### Requerimientos
1. [Requerimiento 1]
2. [Requerimiento 2]

### Criterios de Evaluación
- [ ] [Criterio 1]
- [ ] [Criterio 2]

## 📚 Recursos Adicionales
- [Documentación oficial]
- [Tutoriales recomendados]
- [Lecturas complementarias]

## ✅ Checklist de Comprensión
- [ ] Puedo [habilidad 1]
- [ ] Entiendo [concepto 2]
- [ ] He completado todos los ejercicios

---
**Autor**: [Nombre]  
**Última actualización**: [Fecha]  
**Versión**: 1.0
```

#### Plantilla Python

```python
{
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "# 📚 Fundamentos de Python\\n",
        "\\n",
        "**Curso**: Programación I - FPUNA\\n",
        "**Módulo**: 1 - Introducción\\n",
        "**Duración**: 2 horas"
      ]
    },
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "## 🎯 Objetivos\\n",
        "\\n",
        "1. Entender la sintaxis básica de Python\\n",
        "2. Trabajar con variables y tipos de datos\\n",
        "3. Usar estructuras de control"
      ]
    },
    {
      "cell_type": "code",
      "execution_count": null,
      "metadata": {},
      "outputs": [],
      "source": [
        "# Celda de código con setup\\n",
        "import sys\\n",
        "print(f\"Python version: {sys.version}\")"
      ]
    }
  ],
  "metadata": {
    "kernelspec": {
      "display_name": "Python 3",
      "language": "python",
      "name": "python3"
    }
  },
  "nbformat": 4,
  "nbformat_minor": 4
}
```

### 2. Ejercicios y Talleres

#### Estructura de Ejercicios

```markdown
# 📝 Taller Práctico: [Tema]
**Curso**: [Nombre]  
**Semana**: [X]  
**Tiempo estimado**: [X] horas  
**Dificultad**: ⭐ [1-5]

---

## 🎯 Objetivos
- Aplicar conceptos de [tema]
- Desarrollar habilidad de [habilidad]
- Practicar [técnica]

---

## 📋 Instrucciones Generales
1. Crea un directorio `semana-[X]/taller-[Y]/`
2. Sigue la estructura de archivos indicada
3. Completa todos los ejercicios en orden
4. Asegúrate de que tu código pase todos los tests
5. Sube tu solución al repositorio antes del deadline

---

## 🚀 Ejercicios

### Ejercicio 1: [Nombre] (⭐ Dificultad: Baja)

**Descripción**:  
[Breve descripción]

**Requerimientos**:
- [Requerimiento 1]
- [Requerimiento 2]

**Ejemplo**:
```
Input: [ejemplo input]
Output: [ejemplo output]
```

**Código inicial**:
```python
def ejercicio_1(parametro):
    \"\"\"
    TODO: Implementar solución
    
    Args:
        parametro: descripción
        
    Returns:
        tipo: descripción
    \"\"\"
    pass
```

**Tests**:
```python
def test_ejercicio_1():
    assert ejercicio_1("input1") == "output1"
    assert ejercicio_1("input2") == "output2"
    print(\"✅ Ejercicio 1 pasado\")

if __name__ == "__main__":
    test_ejercicio_1()
```

---

### Ejercicio 2: [Nombre] (⭐⭐ Dificultad: Media)

...

### Ejercicio 3: [Nombre] (⭐⭐⭐ Dificultad: Alta)

...

---

## 🎨 Proyecto Integrador

### Contexto
[Historia o contexto realista]

### Datos de Entrada
```
[Ejemplo de datos]
```

### Requerimientos Funcionales
1. [Requerimiento 1]
2. [Requerimiento 2]
3. [Requerimiento 3]

### Requerimientos Técnicos
- Usar [librería/tecnología]
- Implementar [patrón]
- Seguir [estándar]

### Entregables
- [ ] `solucion.py`
- [ ] `test_solucion.py`
- [ ] `README.md` con explicación
- [ ] `requirements.txt`

---

## 📊 Rúbrica de Evaluación

### Funcionalidad (40 pts)
- [ ] Ejercicio 1 funciona correctamente (10 pts)
- [ ] Ejercicio 2 funciona correctamente (15 pts)
- [ ] Ejercicio 3 funciona correctamente (15 pts)

### Calidad de Código (30 pts)
- [ ] Nombres descriptivos (10 pts)
- [ ] Código bien estructurado (10 pts)
- [ ] Documentación apropiada (10 pts)

### Tests (30 pts)
- [ ] Tests para ejercicio 1 (10 pts)
- [ ] Tests para ejercicio 2 (10 pts)
- [ ] Tests para ejercicio 3 (10 pts)

**Total**: [X]/100 pts

---

## 💡 Pistas

<details>
<summary>🤔 Pista para Ejercicio 1</summary>

Piensa en usar [concepto/clase]. Revisa la documentación de [librería].
</details>

<details>
<summary>🤔 Pista para Ejercicio 2</summary>

Considera [enfoque]. Un ejemplo similar está en [referencia].
</details>

---

## 📚 Recursos

### Documentación
- [Link 1]
- [Link 2]

### Ejemplos Similares
- [Link 3]

### Videos Complementarios
- [Video 1]

---

**Deadline**: [Fecha y hora]  
**Formato de entrega**: Pull request a `students/tu-usuario/semana-[X]/`
```

### 3. Guías de Estudio

```markdown
# 📖 Guía de Estudio: [Tema]
**Examen**: [Tipo - Parcial/Final]  
**Fecha**: [DD/MM/YYYY]  
**Temas cubiertos**: [Lista]

---

## 🗺️ Mapa Conceptual

```
[Tema Principal]
├── [Subtema 1]
│   ├── [Concepto A]
│   └── [Concepto B]
├── [Subtema 2]
│   ├── [Concepto C]
│   └── [Concepto D]
└── [Subtema 3]
```

---

## 📋 Temas Detallados

### 1. [Tema 1]

#### Conceptos Clave
- [Concepto 1]: [Breve explicación]
- [Concepto 2]: [Breve explicación]

#### Fórmulas/Algoritmos Importantes
```python
# Fórmula clave
def formula_importante(x, y):
    return x * y + (x - y)
```

#### Ejemplo Típico de Examen
**Problema**: [Descripción]  
**Solución**: [Pasos]  
**Respuesta**: [Resultado]

#### Errores Comunes
- ❌ [Error 1]: [Explicación]
- ❌ [Error 2]: [Explicación]

---

### 2. [Tema 2]

...

---

## 📝 Checklist de Preparación

### Conocimiento Teórico
- [ ] Puedo explicar [concepto 1] con mis propias palabras
- [ ] Conozco las fórmulas de [tema]
- [ ] Entiendo las diferencias entre [A] y [B]

### Práctica
- [ ] He resuelto todos los ejercicios de [sección]
- [ ] Puedo resolver un problema similar en < 15 minutos
- [ ] He identificado mis áreas débiles

### Preparación Logística
- [ ] Tengo calculadora/código listo
- [ ] Sé la ubicación del examen
- [ ] He dormido bien la noche anterior

---

## 🎯 Preguntas de Práctica

### Tipo Teórico
1. ¿Cuál es la diferencia entre [A] y [B]?
2. Explique el concepto de [X] y dé un ejemplo.
3. ¿Cuándo usaría [técnica A] vs [técnica B]?

### Tipo Práctico
1. **Problema**: [Descripción detallada]
   - **Solución esperada**: [Output]
   
2. **Problema**: [Descripción detallada]
   - **Solución esperada**: [Output]

---

## 🔍 Foco de Estudio por Prioridad

### Alta Prioridad ⭐⭐⭐
1. [Tema crítico 1] - 40% del examen
2. [Tema crítico 2] - 30% del examen

### Media Prioridad ⭐⭐
3. [Tema importante 1] - 20% del examen

### Baja Prioridad ⭐
4. [Tema complementario] - 10% del examen

---

## 📊 Distribución Esperada del Examen

| Tipo | % | Tiempo Sugerido |
|------|---|----------------|
| Teórico | 30% | 20 min |
| Práctico | 50% | 40 min |
| Análisis | 20% | 20 min |
| **Total** | 100% | 80 min |

---

**Buena suerte! 🍀**
```

## Proceso de Generación

### Step 1: Definir Parámetros

```python
{
  "topic": "Manejo de Excepciones en Python",
  "course": "Programación II - FPUNA",
  "module": 5,
  "duration": "2 horas",
  "level": "Intermedio",
  "prerequisites": ["Python básico", "Funciones"],
  "material_types": ["notebook", "exercises", "slides"],
  "learning_objectives": [
    "Entender try/except/finally",
    "Crear excepciones personalizadas",
    "Implementar logging"
  ],
  "context_fpuna": True,  # Incluir contexto paraguayo
  "include_dataset": True,
  "difficulty_progression": "gradual"  # gradual, mixed, challenging
}
```

### Step 2: Generar Contenido

#### Contexto FPUNA

Incluir ejemplos relevantes para Paraguay:

```python
# Ejemplo: Procesamiento de datos SENATURAL
def procesar_datos_meteorologicos(archivo_csv):
    \"\"\"
    Procesa datos meteorológicos del SENATURAL.
    
    Contexto: Paraguay tiene clima subtropical con
    veranos calurosos e inviernos cortos.
    \"\"\"
    try:
        with open(archivo_csv, 'r', encoding='utf-8') as f:
            datos = csv.reader(f)
            # Procesamiento...
    except FileNotFoundError:
        logger.error(f"Archivo no encontrado: {archivo_csv}")
        raise DatosMeteorologicosError(
            "No se encontraron datos del SENATURAL. "
            "Verifique la ruta del archivo."
        )
    except UnicodeDecodeError:
        logger.error("Error de codificación en archivo")
        raise DatosMeteorologicosError(
            "El archivo no está en formato UTF-8. "
            "Convierta el archivo antes de procesar."
        )
```

#### Dataset de Ejemplo

```python
# Crear dataset educativo relevante
def generar_dataset_calificaciones(n_estudiantes=100):
    \"\"\"
    Genera dataset sintético de calificaciones FPUNA.
    Incluye: Notas, carrera, semestre, etc.
    \"\"\"
    carreras = [
        'Ingeniería Informática',
        'Ingeniería Civil',
        'Medicina',
        'Derecho',
        'Administración'
    ]
    
    data = []
    for i in range(n_estudiantes):
        data.append({
            'student_id': f'FP{20240000 + i}',
            'carrera': random.choice(carreras),
            'semestre': random.randint(1, 10),
            'nota_final': round(random.uniform(1, 5), 1),
            'asistencia': random.randint(60, 100)
        })
    
    return pd.DataFrame(data)
```

### Step 3: Validar Material

#### Checklist de Calidad

- [ ] Objetivos de aprendizaje claros y medibles
- [ ] Secuencia lógica de conceptos
- [ ] Ejemplos prácticos y relevantes
- [ ] Ejercicios progresivos (fácil → difícil)
- [ ] Contexto local incluido (Paraguay/FPUNA)
- [ ] Recursos adicionales proporcionados
- [ ] Tiempo estimado realista
- [ ] Instrucciones claras
- [ ] Rúbrica de evaluación (si aplica)

#### Validación Técnica

```bash
# Probar notebook
jupyter notebook notebooks/modulo-05-excepciones.ipynb

# Ejecutar todas las celdas
# Kernel > Restart & Run All

# Verificar no hay errores
# Verificar outputs son correctos
```

## Templates por Tipo de Contenido

### Template: Notebook Teórico-Práctico

```markdown
# Sección X: [Título]

## 🎓 Teoría
[Explicación conceptual]

### 💡 Concepto Clave: [Nombre]
[Descripción detallada]

#### Analogía
[Analogía simple para entender]

#### Sintaxis
```python
# Código de ejemplo
codigo_ejemplo()
```

## 🖥️ Demo en Vivo

```python
# Celda interactiva
# Estudiante puede modificar y ejecutar

# Ejemplo básico
[code]

# Ejemplo intermedio
[code]

# Ejemplo avanzado
[code]
```

## 🎯 Ejercicios

### Ejercicio 1: Básico ⭐
[instrucciones]

```python
# Espacio para solución

```

### Ejercicio 2: Intermedio ⭐⭐
[instrucciones]

### Ejercicio 3: Avanzado ⭐⭐⭐
[instrucciones]

## 🔍 Revisión de Conceptos

**Pregunta**: [Pregunta concepto]  
**Respuesta**: <details>[Respuesta]</details>

---

**Siguiente**: [Link a siguiente sección]
```

### Template: Diapositivas (Markdown para reveal.js)

```markdown
---

# Título de la Sección

## Subtítulo

**Ponente**: [Nombre]  
**Curso**: [Nombre] - FPUNA  
**Fecha**: [DD/MM/YYYY]

---

## Agenda

1. [Punto 1]
2. [Punto 2]
3. [Punto 3]
4. [Punto 4]

---

## Concepto Principal

### [Título del Concepto]

[Imagen/Diagrama]

> 💡 **Key Insight**: [Mensaje principal]

---

## Ejemplo de Código

```python
# Código destacado
def funcion_importante():
    return "resultado"
```

**Notas del presentador**:  
[Notas para explicar en vivo]

---

## Preguntas?

### 📧 Contacto
[nombre@fpuna.edu.py]

### 📚 Recursos
- [Link 1]
- [Link 2]
```

## Automatización

### Script de Generación

```python
#!/usr/bin/env python3
"""
Generador de material educativo FPUNA.
"""

from pathlib import Path
import json

class MaterialGenerator:
    def __init__(self, config: dict):
        self.config = config
        self.output_dir = Path("cursos") / config["course_path"]
        
    def generate_notebook(self) -> str:
        """Generate Jupyter notebook structure."""
        notebook = {
            "cells": [
                self._create_header_cell(),
                self._create_objectives_cell(),
                *self._create_content_cells(),
                self._create_project_cell(),
                self._create_resources_cell()
            ],
            "metadata": {
                "kernelspec": {
                    "display_name": "Python 3",
                    "language": "python",
                    "name": "python3"
                }
            },
            "nbformat": 4,
            "nbformat_minor": 4
        }
        
        output_path = self.output_dir / f"modulo-{self.config['module']:02d}-{self.config['topic_slug']}.ipynb"
        output_path.write_text(json.dumps(notebook, indent=2))
        return str(output_path)
    
    def generate_exercises(self) -> str:
        """Generate exercise file."""
        content = self._render_exercise_template()
        output_path = self.output_dir / f"ejercicios-semana-{self.config['module']:02d}.md"
        output_path.write_text(content)
        return str(output_path)
    
    def _create_header_cell(self) -> dict:
        return {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                f"# 📚 {self.config['topic']}\\n",
                f"\\n",
                f"**Curso**: {self.config['course']}\\n",
                f"**Módulo**: {self.config['module']}\\n",
                f"**Duración**: {self.config['duration']}"
            ]
        }
    
    def _render_exercise_template(self) -> str:
        # Usar Jinja2 template
        template = self._load_template("exercises.md.j2")
        return template.render(**self.config)

# Usage
config = {
    "topic": "Manejo de Excepciones",
    "topic_slug": "manejo-excepciones",
    "course": "Programación II",
    "course_path": "programacion-2/2025",
    "module": 5,
    "duration": "2 horas"
}

gen = MaterialGenerator(config)
notebook_path = gen.generate_notebook()
exercises_path = gen.generate_exercises()
```

## Success Criteria

Material generado exitosamente cuando:
- [ ] Estructura clara y lógica
- [ ] Objetivos de aprendizaje definidos
- [ ] Ejemplos prácticos incluidos
- [ ] Ejercicios progresivos
- [ ] Contexto FPUNA/Paraguay presente
- [ ] Recursos adicionales proporcionados
- [ ] Tests de validación pasan
- [ ] Tiempo estimado realista
- [ ] Rúbrica clara (si aplica)

---

**Last Updated:** 2025-01-30
**Course:** FPUNA AI Education
**Version:** 1.0 - Generador de Material
**Maintained by:** FPUNA AI Education Team
