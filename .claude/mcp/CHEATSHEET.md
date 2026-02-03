# 🚀 MCP Servers Cheatsheet - Referencia Rápida

## 🎯 Comandos Esenciales por Categoría

### 🔍 Web Search & Research

| MCP | Comando de Uso | Ejemplo |
|-----|----------------|---------|
| **DuckDuckGo** | Busca [término] | `Busca "Python asyncio best practices"` |
| **Brave** | Busca avanzado [término] | `Busca en Brave "LangChain RAG tutorial 2025"` |
| **Context7** | Consulta [librería] | `Consulta en Context7 cómo usar FastAPI middleware` |

---

### 🗄️ Bases de Datos

| MCP | Comando de Uso | Ejemplo |
|-----|----------------|---------|
| **PostgreSQL** | Consulta SQL [query] | `Consulta en PostgreSQL: SELECT * FROM estudiantes` |
| **Qdrant** | Busca vectorial [término] | `Busca en Qdrant embeddings sobre "machine learning"` |
| **Redis** | Cache [operación] | `Lee de Redis la clave "session:123"` |
| **SQLite** | Query [consulta] | `Ejecuta en SQLite: SELECT * FROM calificaciones` |

---

### 🔧 Git & GitHub

| MCP | Comando de Uso | Ejemplo |
|-----|----------------|---------|
| **GitHub** | Crea PR [descripción] | `Crea un PR para la rama feature/auth con descripción...` |
| **Git** | Analiza commits [rango] | `Analiza los commits de la última semana` |
| **Git** | Blame [archivo] | `Quién modificó api/routes.py la última vez?` |

---

### 📊 Data Analytics

| MCP | Comando de Uso | Ejemplo |
|-----|----------------|---------|
| **Jupyter** | Ejecuta celda [código] | `Ejecuta en Jupyter: df.describe()` |
| **Filesystem** | Lee archivo [path] | `Lee el archivo datasets/estudiantes.csv` |
| **Fetch** | Extrae URL [link] | `Extrae el contenido de https://docs.python.org/3` |

---

### 🌐 Browser Automation

| MCP | Comando de Uso | Ejemplo |
|-----|----------------|---------|
| **Playwright** | Navega [URL] | `Navega a https://github.com y extrae los issues` |
| **Puppeteer** | Screenshot [URL] | `Toma un screenshot de la página de FPUNA` |
| **Puppeteer** | PDF [URL] | `Genera PDF de https://docs.fastapi.com` |

---

### 📋 Productividad

| MCP | Comando de Uso | Ejemplo |
|-----|----------------|---------|
| **Notion** | Crea página [título] | `Crea en Notion una página "Notas de Clase Python"` |
| **Notion** | Query DB [database] | `Consulta la base de datos "Estudiantes" en Notion` |
| **Slack** | Envía mensaje [canal] | `Envía a #fpuna-general: "La clase empieza en 10 min"` |
| **Time** | Convierte zona [hora] | `Convierte 14:00 PY a hora de Madrid` |

---

### 🧠 Memoria & Razonamiento

| MCP | Comando de Uso | Ejemplo |
|-----|----------------|---------|
| **Sequential Thinking** | Piensa paso a paso [problema] | `Resuelve paso a paso: cómo optimizar esta query` |
| **Memory** | Recuerda [dato] | `Recuerda que el estudiante prefiere Python sobre Java` |
| **Document Analyzer** | Analiza sentimiento [texto] | `Analiza el sentimiento de estos comentarios` |

---

## 🔄 Flujos de Trabajo Comunes

### Flujo 1: Preparar Material de Curso

```
1. Busca "topic" en DuckDuckGo
2. Consulta Context7 para verificar docs
3. Lee ejemplos con Filesystem
4. Guarda en Notion
```

### Flujo 2: Revisar Proyecto de Estudiante

```
1. Analiza commits con Git
2. Revisa código con GitHub
3. Consulta PostgreSQL para entregas
4. Envía feedback con Slack
```

### Flujo 3: Análisis de Datos

```
1. Query datos con PostgreSQL/SQLite
2. Procesa con Jupyter
3. Visualiza resultados
4. Documenta en Notion
```

### Flujo 4: Research Académico

```
1. Busca papers con Brave
2. Extrae con Fetch
3. Resume con Document Analyzer
4. Almacena en Qdrant
```

---

## ⚙️ Configuración Rápida

### Variables de Entorno Necesarias

```bash
# GitHub (Recomendado)
export GITHUB_TOKEN=ghp_tu_token

# Bases de datos (Opcional según uso)
export QDRANT_URL=http://localhost:6333
export REDIS_HOST=localhost
export REDIS_PORT=6379

# APIs externas (Opcional)
export BRAVE_API_KEY=tu_key
export NOTION_API_TOKEN=secret_tu_token
export SLACK_BOT_TOKEN=xoxb-tu-token
```

### Archivos de Configuración

```
.claude/mcp/
├── filesystem-server.json      ✅ Acceso archivos
├── playwright-server.json      ✅ Browser automation
├── document-analyzer.json      ✅ Análisis de texto
├── duckduckgo-search.json      ✅ Búsqueda web
├── brave-search.json          ✅ Búsqueda premium
├── context7-docs.json         ✅ Documentación
├── postgresql-server.json     ✅ PostgreSQL
├── qdrant-server.json         ✅ Vector DB
├── redis-server.json          ✅ Cache
├── sqlite-server.json         ✅ SQLite
├── github-advanced.json       ✅ GitHub completo
├── git-server.json            ✅ Git análisis
├── sequential-thinking.json   ✅ Razonamiento
├── jupyter-server.json        ✅ Notebooks
├── fetch-server.json          ✅ Web scraping
├── notion-server.json         ✅ Notion
├── slack-server.json          ✅ Slack
├── time-server.json           ✅ Timezones
├── memory-server.json         ✅ Memoria
└── puppeteer-server.json      ✅ Browser alt
```

---

## 🎓 Ejemplos Prácticos Educativos

### Ejemplo 1: Preparar Clase de ML

```
Usuario: Prepara material sobre "Random Forest en Python"
        usando recursos actualizados

Claude:
1. Busca "Random Forest Python sklearn 2025" en DuckDuckGo
2. Consulta Context7 para sklearn.ensemble.RandomForestClassifier
3. Lee archivo datasets/iris.csv con Filesystem
4. Ejecuta análisis en Jupyter
5. Guarda en Notion: "Clase 15 - Random Forest"
```

### Ejemplo 2: Evaluar Proyecto

```
Usuario: Revisa el proyecto del estudiante Juan Pérez

Claude:
1. Analiza commits de Juan con Git
2. Revisa código con GitHub
3. Consulta PostgreSQL: SELECT * FROM entregas WHERE estudiante='juan'
4. Verifica mejores prácticas con Context7
5. Crea en Notion: "Evaluación - Proyecto Juan"
6. Envía resumen a #evaluaciones en Slack
```

### Ejemplo 3: Research Paper

```
Usuario: Investiga "transformers in education" para paper

Claude:
1. Busca en Brave: "transformers education applications"
2. Extrae papers con Fetch
3. Resume con Document Analyzer
4. Almacena embeddings en Qdrant
5. Relaciona conceptos con Memory
6. Documenta en Notion
```

---

## 🔧 Troubleshooting Rápido

### MCP no responde

```
1. Verifica: npx está instalado
2. Prueba: npx -y @modelcontextprotocol/server-[nombre] --version
3. Reinicia Claude Code completamente
```

### Error de API Key

```
1. Verifica archivo .env
2. Confirma variables exportadas
3. Reinicia sesión de Claude Code
```

### Timeout en database

```
1. Verifica servicio corriendo (pg_ctl, redis-server, qdrant)
2. Comprueba string de conexión
3. Verifica firewalls/ports
```

---

## 📊 Métricas de Uso Típicas

| Categoría | Frecuencia de Uso | Productividad |
|-----------|------------------|---------------|
| Web Search | 85% de sesiones | +40% speed |
| Databases | 60% de sesiones | +60% efficiency |
| Git/GitHub | 40% de sesiones | +80% collaboration |
| Productividad | 25% de sesiones | +50% organization |

---

## 🎯 Checklist de Activación

- [ ] Variables de entorno configuradas (.env)
- [ ] GitHub token generado y probado
- [ ] Bases de datos locales instaladas (opcional)
- [ ] API keys de servicios externos (opcional)
- [ ] Reiniciar Claude Code para cargar MCPs
- [ ] Probar DuckDuckGo: `Busca "test"`
- [ ] Probar Filesystem: `Lista archivos en .`
- [ ] Probar Context7: `Consulta la doc de Python`

---

## 🚀 Next Level Tips

1. **Combina MCPs**: No uses uno solo, encadena varios
2. **Sé específico**: "Consulta PostgreSQL" vs "Consulta en PostgreSQL la tabla estudiantes"
3. **Contexto**: Menciona el propósito educativo
4. **Itera**: Si no funciona, intenta con otro MCP similar
5. **Documenta**: Guarda flujos útiles en Notion

---

**Última actualización:** 2025-01-30  
**Total MCPs configurados:** 19  
**Versión:** 2.0 Ecosistema Completo

¡Empieza a usar los MCPs y multiplica tu productividad! 🚀
