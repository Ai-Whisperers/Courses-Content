# Quiz - Módulo 05: DevOps con IA

**Duración:** 5 minutos | **Puntos:** 100

---

### Pregunta 1
¿Qué es un multi-stage build en Docker?
- A) Construir múltiples aplicaciones
- B) Usar diferentes stages para build y producción, reduciendo tamaño final
- C) Correr múltiples containers
- D) Compilar en múltiples lenguajes

<details><summary>Respuesta</summary>B - Multi-stage permite tener herramientas de build sin incluirlas en la imagen final.</details>

---

### Pregunta 2
¿Por qué usar usuario non-root en containers?
- A) Es más rápido
- B) Es más seguro - limita el daño si el container es comprometido
- C) Docker lo requiere
- D) Reduce el tamaño de la imagen

<details><summary>Respuesta</summary>B - Non-root es una práctica de seguridad que limita privilegios.</details>

---

### Pregunta 3
¿Dónde deben almacenarse tokens y secrets en GitHub Actions?
- A) En el código directamente
- B) En GitHub Secrets, accedidos con ${{ secrets.NAME }}
- C) En un archivo .env commiteado
- D) En comentarios del workflow

<details><summary>Respuesta</summary>B - GitHub Secrets es la forma segura de manejar credenciales.</details>

---

### Pregunta 4
¿Qué hace un healthcheck en Docker?
- A) Limpia memoria
- B) Verifica periódicamente que la aplicación funciona correctamente
- C) Actualiza el container
- D) Reinicia automáticamente

<details><summary>Respuesta</summary>B - Healthcheck permite a Docker saber si el container está saludable.</details>

---

### Pregunta 5
¿Cuál es el beneficio de cachear node_modules en CI?
- A) Ocupa más espacio
- B) Reduce tiempo de build al no reinstalar dependencias cada vez
- C) Es obligatorio
- D) Mejora la seguridad

<details><summary>Respuesta</summary>B - Cache reduce significativamente el tiempo de instalación de dependencias.</details>

---

## Resultados
| 90-100 | Excelente | 70-89 | Bueno | 50-69 | Regular | <50 | Revisar módulo |

*Quiz Módulo 05 - DevOps con IA*
