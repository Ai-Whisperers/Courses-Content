# FAQ y Troubleshooting - Talleres de Verano FP-UNA 2026

Preguntas frecuentes y soluciones a problemas comunes durante el taller.

---

## Preguntas Frecuentes (FAQ)

### Sobre IA en General

**P: ¿La IA va a reemplazar mi trabajo/carrera?**

R: No. La IA es una herramienta que amplifica tus capacidades. Quienes sepan usar IA serán más productivos, pero la creatividad, juicio crítico y conocimiento de dominio seguirán siendo humanos. El riesgo real es no aprender a usar estas herramientas mientras otros sí lo hacen.

---

**P: ¿Es ético usar IA para tareas universitarias?**

R: Depende del contexto y las reglas de tu institución:
- ✅ **Sí está bien**: Usar IA para investigar, entender conceptos, generar ideas, revisar gramática
- ⚠️ **Consultar profesor**: Usar IA para código en tareas de programación
- ❌ **No está bien**: Copiar respuestas de IA sin entender, presentar trabajo de IA como 100% propio sin divulgar

**Recomendación**: Siempre informa a tu profesor cómo usaste IA y qué aprendiste en el proceso.

---

**P: ¿La información que da la IA es siempre correcta?**

R: **NO**. La IA puede "alucinar" (inventar información falsa con confianza). Siempre verifica:
- Datos y estadísticas con fuentes oficiales
- Código ejecutándolo y probándolo
- Información técnica con documentación oficial
- Citas y referencias (a menudo son inventadas)

---

**P: ¿Cuál es la diferencia entre ChatGPT, Claude y OpenCode?**

R: 
- **ChatGPT/Claude**: Interfaces web generales, buenas para conversación
- **OpenCode**: Herramienta especializada para trabajar en proyectos con código, archivos, y tareas complejas. Tiene acceso a tu sistema de archivos y puede ejecutar comandos.

---

### Sobre OpenCode Específicamente

**P: ¿OpenCode es gratis?**

R: OpenCode en sí es gratis (open source). Sin embargo, usa APIs de IA (Anthropic Claude, OpenAI) que pueden tener costos. Para el taller, usaremos configuraciones que minimizan o eliminan costos.

---

**P: ¿Mis datos están seguros con OpenCode?**

R: OpenCode envía tus prompts a servidores de IA (Anthropic/OpenAI). No uses información sensible (contraseñas, datos personales, información confidencial de trabajo) en tus prompts.

---

**P: ¿Puedo usar OpenCode sin internet?**

R: No directamente, pero puedes usar Ollama para correr modelos de IA localmente sin conexión a internet. Esto requiere más recursos de computadora.

---

## Troubleshooting - Problemas Comunes

### Instalación

#### Error: "npm: command not found"

**Causa**: Node.js no está instalado o no está en el PATH.

**Solución**:
1. Descarga Node.js desde https://nodejs.org
2. Instala usando el instalador
3. **IMPORTANTE**: Cierra y abre la terminal después de instalar
4. Verifica: `node --version`

---

#### Error: "Permission denied" al instalar OpenCode

**Causa**: No tienes permisos de administrador.

**Solución Windows**:
1. Click derecho en PowerShell → "Ejecutar como administrador"
2. Ejecutar: `npm install -g opencode`

**Solución Mac/Linux**:
```bash
sudo npm install -g opencode
```

---

#### Error: "EACCES: permission denied" en Mac

**Solución**:
```bash
sudo chown -R $USER /usr/local/lib/node_modules
npm install -g opencode
```

---

### Configuración

#### Error: "API key invalid" o "Unauthorized"

**Causa**: API key incorrecta o expirada.

**Solución**:
1. Verifica que copiaste la key completa (sin espacios extra)
2. Verifica que la key no expiró
3. Regenera la key en el dashboard del proveedor (Anthropic/OpenAI)

---

#### Error: "Connection timeout" o "Network error"

**Causa**: Problemas de conexión a internet.

**Solución**:
1. Verifica tu conexión a internet
2. Si usas VPN, intenta desactivarla
3. Si estás en red corporativa/universidad, puede haber firewall bloqueando

---

#### OpenCode no responde o está muy lento

**Causa**: Servidores de IA sobrecargados o prompt muy largo.

**Solución**:
1. Espera unos minutos e intenta de nuevo
2. Divide tu prompt en partes más pequeñas
3. Prueba en horarios de menor uso (mañana temprano)

---

### Durante el Uso

#### La IA da respuestas incorrectas o inventadas

**Solución**:
1. Pide fuentes: "¿Puedes citar las fuentes de esta información?"
2. Verifica datos importantes manualmente
3. Reformula el prompt con más contexto específico

---

#### El código generado no funciona

**Solución**:
1. Copia el mensaje de error exacto
2. Pega el error a OpenCode: "Este código da este error: [error]. Corrige."
3. Verifica versiones de librerías (la IA puede generar código para versiones antiguas)

---

#### OpenCode no entiende mi pregunta en español

**Solución**:
1. Intenta ser más específico y claro
2. Usa términos técnicos en inglés si es necesario
3. Divide preguntas complejas en partes simples

---

### Problemas de Red en la Universidad

#### Firewall bloquea OpenCode

**Solución temporal**:
1. Usa datos móviles (hotspot) durante la clase
2. Contacta al instructor para alternativas

---

#### WiFi de FPUNA inestable

**Recomendación**:
1. Tener hotspot móvil como backup
2. Sentarse cerca del router si es posible
3. Desconectar otros dispositivos del WiFi personal

---

## Contacto de Soporte

### Durante las Clases (18:00-20:00)

- Levantar la mano y preguntar al instructor
- Usar chat de la videollamada para problemas técnicos
- Asistente técnico disponible para ayuda 1-on-1

### Fuera de Horario de Clase

- **Email**: talleres-verano@fpuna.edu.py (respuesta en 24-48 horas)
- **Slack** (si está habilitado): #soporte-tecnico

### Recursos de Auto-Ayuda

- Documentación oficial de OpenCode: [enlace]
- Guía de instalación detallada: `resources/OPENCODE-INSTALLATION-GUIDE.md`
- Videos tutoriales: [enlace YouTube si existe]

---

## Checklist Pre-Clase

Antes de cada clase, verifica:

- [ ] Computadora cargada o conectada a corriente
- [ ] Conexión a internet funcionando
- [ ] OpenCode instalado y configurado
- [ ] Terminal/PowerShell accesible
- [ ] Libreta para notas
- [ ] Agua/café para las 2 horas

---

**Última actualización**: Enero 26, 2026  
**Versión**: 1.0
