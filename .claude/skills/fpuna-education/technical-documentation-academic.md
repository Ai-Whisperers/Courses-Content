# Skill: Documentación Técnica Académica

## Metadata

- **Name**: Documentación Técnica Académica
- **Category**: Education & Documentation
- **Activation**: When user mentions "documentar código", "generar docs", "README", "docstrings", "documentación técnica", "sphinx", "mkdocs"
- **Model**: Sonnet
- **Est. Token Cost**: ~2000 tokens

## When to Activate

Trigger when:
- "Genera documentación para este proyecto"
- "Crea un README profesional"
- "Documenta este código"
- "Necesito docstrings"
- "Setup sphinx/mkdocs"

## Purpose

Genera documentación técnica completa para proyectos académicos: READMEs profesionales, docstrings, documentación API, y sitios de documentación.

## Tipos de Documentación

### 1. README.md Profesional

```markdown
# 🎓 {{project_name}}

[![Python 3.11](https://img.shields.io/badge/python-3.11-blue.svg)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

> {{project_description}}

**Autor**: {{author_name}}  
**Institución**: Facultad Politécnica - UNA  
**Asignatura**: {{course_name}}  
**Año**: {{year}}

---

## 📋 Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Ejemplos](#ejemplos)
- [API](#api)
- [Testing](#testing)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

## 🚀 Instalación

### Requisitos

- Python 3.11+
- pip
- Git

### Setup

```bash
# 1. Clonar repositorio
git clone https://github.com/{{username}}/{{repo}}.git
cd {{repo}}

# 2. Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# o
.\venv\Scripts\activate    # Windows

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Instalar en modo desarrollo (opcional)
pip install -e .
```

---

## 📝 Uso

### Ejemplo Básico

```python
from {{package_name}} import {{main_class}}

# Inicializar
app = {{main_class}}()

# Usar
resultado = app.procesar(datos)
print(resultado)
```

### Ejemplo Avanzado

```python
# Configuración personalizada
config = {
    'parametro1': 'valor1',
    'parametro2': 'valor2'
}

app = {{main_class}}(config)
resultado = app.procesar_batch(datos_grandes)
```

---

## 🎯 Ejemplos

Ver carpeta [`examples/`](examples/) para casos de uso completos:

1. [Ejemplo Básico](examples/01_basico.py) - Introducción
2. [Procesamiento de Datos](examples/02_datos.py) - Carga y análisis
3. [Visualización](examples/03_visualizacion.py) - Gráficos y reportes

---

## 📚 API

### {{main_class}}

#### `__init__(config=None)`

Inicializa la instancia.

**Parámetros:**
- `config` (dict, opcional): Configuración personalizada

**Ejemplo:**
```python
app = {{main_class}}({'debug': True})
```

#### `procesar(datos)`

Procesa datos de entrada.

**Parámetros:**
- `datos` (list): Lista de items a procesar

**Retorna:**
- `dict`: Resultados del procesamiento

**Raises:**
- `ValueError`: Si datos está vacío
- `TypeError`: Si datos no es lista

**Ejemplo:**
```python
resultado = app.procesar([1, 2, 3, 4, 5])
# {'promedio': 3.0, 'max': 5, 'min': 1}
```

---

## 🧪 Testing

```bash
# Ejecutar tests
pytest

# Con cobertura
pytest --cov={{package_name}}

# Tests específicos
pytest tests/test_core.py
```

---

## 📊 Características

- ✅ {{feature_1}}
- ✅ {{feature_2}}
- ✅ {{feature_3}}
- 🚧 {{feature_4}} (próximamente)

---

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commitea cambios (`git commit -am 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para detalles.

---

## 📄 Licencia

Este proyecto es parte del curso **{{course_name}}** de la Facultad Politécnica - UNA.

Distribuido bajo licencia MIT. Ver [LICENSE](LICENSE) para más información.

---

## 🙏 Agradecimientos

- Profesor {{profesor_name}} - por la orientación
- {{resource_1}} - por la inspiración
- Comunidad FPUNA - por el apoyo

---

<p align="center">
  Desarrollado con ❤️ en Paraguay 🇵🇾
</p>
```

### 2. Docstrings (Google Style)

```python
def calcular_estadisticas(
    datos: list[float],
    incluir_outliers: bool = True
) -> dict[str, float]:
    """Calcula estadísticas descriptivas de un conjunto de datos.
    
    Calcula promedio, mediana, desviación estándar, mínimo y máximo.
    Opcionalmente filtra outliers usando el método IQR.
    
    Args:
        datos: Lista de valores numéricos. No debe estar vacía.
        incluir_outliers: Si False, excluye valores atípicos (>1.5*IQR).
            Defaults to True.
            
    Returns:
        Diccionario con las siguientes claves:
            - promedio: Media aritmética
            - mediana: Valor central
            - std: Desviación estándar
            - min: Valor mínimo
            - max: Valor máximo
            - n: Cantidad de muestras
            
    Raises:
        ValueError: Si datos está vacío.
        TypeError: Si datos no es lista o contiene no-numéricos.
        
    Example:
        >>> calcular_estadisticas([1, 2, 3, 4, 5])
        {
            'promedio': 3.0,
            'mediana': 3.0,
            'std': 1.58,
            'min': 1,
            'max': 5,
            'n': 5
        }
        
        >>> calcular_estadisticas([1, 2, 3, 100], incluir_outliers=False)
        # Excluye 100 como outlier
        {
            'promedio': 2.0,
            'mediana': 2.0,
            'std': 0.82,
            'min': 1,
            'max': 3,
            'n': 3
        }
        
    Note:
        Para datasets grandes (>10k elementos), considerar usar numpy
        directamente para mejor performance.
        
    References:
        - Método IQR: https://en.wikipedia.org/wiki/Interquartile_range
        - Estadísticas descriptivas: Ver documentación de scipy.stats
    """
    if not datos:
        raise ValueError("Datos no puede estar vacío")
    
    # Implementación...
```

### 3. Documentación API con Sphinx

```python
# docs/conf.py
project = 'Mi Proyecto FPUNA'
copyright = '2025, FPUNA'
author = 'Nombre Estudiante'

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',  # Google style docstrings
    'sphinx.ext.viewcode',
    'sphinx.ext.githubpages',
]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']
```

## Success Criteria

Documentación completada cuando:
- [ ] README.md profesional generado
- [ ] Docstrings completos en funciones
- [ ] Ejemplos de uso incluidos
- [ ] API documentada
- [ ] Setup de Sphinx/MkDocs (opcional)
- [ ] Guía de contribución creada

---

**Last Updated:** 2025-01-30
**Course:** FPUNA AI Education
**Version:** 1.0 - Technical Documentation
**Maintained by:** FPUNA AI Education Team
