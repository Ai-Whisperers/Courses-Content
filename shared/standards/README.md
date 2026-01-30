# 📋 Estándares y Calidad de Código

Esta carpeta contiene archivos de configuración profesional para asegurar que el
código del proyecto sea consistente, limpio y esté bien probado.

## 📁 Contenido por Lenguaje/Framework

### ⌨️ TypeScript / JavaScript

- **[eslint/](./eslint/)**: Reglas para identificar errores y mantener el
  estilo. Incluye `.eslintrc.json` y `.prettierrc`.
- **[typescript/](./typescript/)**: Configuración base de `tsconfig.json`.
- **[playwright/](./playwright/)**: Configuración para pruebas E2E (punta a
  punta).
- **[jest/](./jest/)**: Configuración para pruebas unitarias en JS/TS.

### 🐍 Python

- **[python/](./python/)**: Configuración de `pyproject.toml` y listas de
  dependencias (`requirements.txt`).
- **/pytest**: Configuración de pruebas con `pytest.ini` y `conftest.py`.

### 🚀 CI/CD

- **[github-actions/](./github-actions/)**: Flujos de trabajo para automatizar
  pruebas en cada commit.

## 🚀 Cómo usar

### Para un proyecto de Node.js / TypeScript:

Copia los archivos de `typescript/`, `eslint/` y el framework de testing que
elijas (`playwright/` o `jest/`) a la raíz de tu proyecto.

### Para un proyecto de Python:

Copia el contenido de `python/` y `pytest/`.

## ✅ Buenas Prácticas

1. **Tipado Estricto**: Usa siempre tipos específicos, evita `any`.
2. **Linting**: Ejecuta los linters antes de subir código.
3. **Tests Independientes**: Asegúrate de que cada prueba pueda correr por sí
   sola.
