# Cuentas y Servicios Necesarios

## Guía de Creación de Cuentas para FPUNA 2026

Esta guía lista todas las cuentas y servicios que los instructores y estudiantes necesitan crear.

---

## 1. Cuentas OBLIGATORIAS (Todos los Tracks)

### 1.1 Anthropic (API de Claude)

**URL:** https://console.anthropic.com/

**Proceso:**
1. Ir a console.anthropic.com
2. Click en "Sign Up"
3. Registrarse con email
4. Verificar email
5. Ir a "API Keys" → "Create Key"
6. Copiar la key (formato: `sk-ant-api03-xxxxx`)

**Costo:**
- Créditos gratuitos para nuevos usuarios: ~$5-10 USD
- Después: Pay-as-you-go (~$3/millón de tokens para Claude 3 Haiku)

**Para el curso:**
- Opción A: Cada estudiante crea su cuenta (recomendado)
- Opción B: Cuenta compartida del instructor (menos recomendado)

**Configurar en sistema:**
```bash
# Windows (variable de entorno permanente)
setx ANTHROPIC_API_KEY "sk-ant-xxxxx"

# macOS/Linux
echo 'export ANTHROPIC_API_KEY="sk-ant-xxxxx"' >> ~/.bashrc
source ~/.bashrc
```

---

### 1.2 GitHub

**URL:** https://github.com/

**Proceso:**
1. Ir a github.com
2. Click en "Sign Up"
3. Elegir username, email, password
4. Verificar email
5. Configurar Git local:
   ```bash
   git config --global user.name "Tu Nombre"
   git config --global user.email "tu@email.com"
   ```

**Costo:** Gratuito

**Uso en el curso:**
- Repositorios de práctica
- Colaboración en proyectos
- GitHub Pages para demos

---

### 1.3 Google Account

**URL:** https://accounts.google.com/

**Servicios incluidos:**
- Google Drive (almacenamiento)
- Google Sheets (Track 04, 06)
- Google Forms (encuestas)
- Google Colab (notebooks Python)
- Gmail

**Costo:** Gratuito

---

## 2. Cuentas por Track

### Track 01: Desarrollo de Software

#### 2.1.1 Postman
**URL:** https://www.postman.com/

**Proceso:**
1. Descargar app o usar web
2. Crear cuenta con email
3. Crear workspace personal

**Costo:** Gratuito (plan básico)

#### 2.1.2 Vercel (Opcional - Deploy)
**URL:** https://vercel.com/

**Proceso:**
1. Ir a vercel.com
2. Sign up con GitHub (recomendado)
3. Autorizar acceso a repos

**Costo:** Gratuito (hobby plan)

#### 2.1.3 Railway (Opcional - Backend)
**URL:** https://railway.app/

**Costo:** Gratuito con límites

#### 2.1.4 MongoDB Atlas (Opcional)
**URL:** https://www.mongodb.com/cloud/atlas

**Proceso:**
1. Crear cuenta
2. Crear cluster gratuito (M0)
3. Obtener connection string

**Costo:** Gratuito (tier M0, 512MB)

---

### Track 02: Electrónica e IoT

#### 2.2.1 Arduino Cloud (Opcional)
**URL:** https://cloud.arduino.cc/

**Proceso:**
1. Crear cuenta en arduino.cc
2. Acceder a Arduino Cloud
3. Vincular placas

**Costo:** Gratuito (plan básico)

#### 2.2.2 ThingSpeak (IoT Data)
**URL:** https://thingspeak.com/

**Proceso:**
1. Crear cuenta MathWorks
2. Crear canal
3. Obtener API keys

**Costo:** Gratuito (4 canales)

#### 2.2.3 Blynk (IoT Dashboard)
**URL:** https://blynk.io/

**Costo:** Gratuito (2 dispositivos)

#### 2.2.4 Tinkercad (Simulación)
**URL:** https://www.tinkercad.com/

**Proceso:**
1. Crear cuenta Autodesk
2. Acceder a Circuits

**Costo:** Gratuito

---

### Track 03: Ingeniería Aeronáutica

#### 2.3.1 Autodesk (Fusion 360)
**URL:** https://www.autodesk.com/education/

**Proceso:**
1. Crear cuenta educativa Autodesk
2. Verificar con email institucional
3. Descargar Fusion 360

**Costo:** Gratuito para educación

#### 2.3.2 GrabCAD
**URL:** https://grabcad.com/

**Proceso:**
1. Crear cuenta
2. Acceso a librería de modelos

**Costo:** Gratuito

#### 2.3.3 Google Colab
**URL:** https://colab.research.google.com/

**Costo:** Gratuito (con cuenta Google)

---

### Track 04: Marketing Digital

#### 2.4.1 Meta Business Suite
**URL:** https://business.facebook.com/

**Proceso:**
1. Tener cuenta personal de Facebook
2. Crear página de negocio (puede ser ficticia)
3. Acceder a Business Suite

**Costo:** Gratuito

**Para el curso:**
- Crear página ficticia para demos
- No requiere inversión real en ads

#### 2.4.2 Canva
**URL:** https://www.canva.com/

**Proceso:**
1. Crear cuenta con email o Google
2. Opción: Solicitar Canva for Education

**Costo:** Gratuito (premium opcional)

**Canva for Education (100% gratis):**
1. Ir a canva.com/education
2. Registrarse como educador
3. Verificar con email institucional

#### 2.4.3 Buffer
**URL:** https://buffer.com/

**Proceso:**
1. Crear cuenta
2. Conectar redes sociales de prueba

**Costo:** Gratuito (3 canales, 10 posts/canal)

#### 2.4.4 Mailchimp
**URL:** https://mailchimp.com/

**Proceso:**
1. Crear cuenta con email
2. Crear audiencia de prueba

**Costo:** Gratuito (500 contactos, 1000 emails/mes)

#### 2.4.5 Google Analytics Demo
**URL:** https://analytics.google.com/analytics/web/demoAccount

**Proceso:**
1. Tener cuenta Google
2. Acceder a cuenta demo de Google

**Costo:** Gratuito (es cuenta de demostración)

#### 2.4.6 Ubersuggest
**URL:** https://neilpatel.com/ubersuggest/

**Costo:** Gratuito (3 búsquedas/día)

---

### Track 05: Investigación Académica

#### 2.5.1 Zotero
**URL:** https://www.zotero.org/

**Proceso:**
1. Descargar e instalar
2. Crear cuenta para sincronización
3. Instalar extensión del navegador

**Costo:** Gratuito (300MB sync)

#### 2.5.2 Overleaf
**URL:** https://www.overleaf.com/

**Proceso:**
1. Crear cuenta con email
2. Verificar email

**Costo:** Gratuito (compilación básica)

#### 2.5.3 ORCID
**URL:** https://orcid.org/

**Proceso:**
1. Registrar identificador único de investigador
2. Vincular publicaciones

**Costo:** Gratuito

#### 2.5.4 ResearchGate
**URL:** https://www.researchgate.net/

**Proceso:**
1. Registrarse con email institucional
2. Crear perfil de investigador

**Costo:** Gratuito

#### 2.5.5 Mendeley (Alternativa a Zotero)
**URL:** https://www.mendeley.com/

**Costo:** Gratuito (2GB)

---

### Track 06: Hospitalidad y Turismo

#### 2.6.1 WhatsApp Business
**URL:** Play Store / App Store

**Proceso:**
1. Descargar app WhatsApp Business
2. Registrar con número de teléfono
3. Configurar perfil de negocio (ficticio)

**Costo:** Gratuito

**Para el curso:**
- Usar número secundario o virtual
- Configurar como negocio ficticio

#### 2.6.2 Google My Business
**URL:** https://business.google.com/

**Proceso:**
1. Crear perfil de negocio
2. No es necesario verificar para demos

**Costo:** Gratuito

#### 2.6.3 TripAdvisor Management Center
**URL:** https://www.tripadvisor.com/Owners

**Proceso:**
1. Crear cuenta
2. Explorar funcionalidades (sin negocio real)

**Costo:** Gratuito

#### 2.6.4 Booking.com Partner Hub
**URL:** https://partner.booking.com/

**Nota:** Requiere propiedad real, usar solo para demos visuales

#### 2.6.5 Canva (mismo que Marketing)
**URL:** https://www.canva.com/

---

## 3. APIs y Servicios de Terceros

### 3.1 APIs Gratuitas Útiles

| API | Uso | URL | Límite Gratuito |
|-----|-----|-----|-----------------|
| OpenWeatherMap | Clima | openweathermap.org | 1000 calls/día |
| ExchangeRate | Divisas | exchangerate-api.com | 1500 calls/mes |
| NewsAPI | Noticias | newsapi.org | 100 calls/día |
| REST Countries | Info países | restcountries.com | Ilimitado |
| JSONPlaceholder | Testing | jsonplaceholder.typicode.com | Ilimitado |

### 3.2 Obtener API Keys

**OpenWeatherMap:**
1. Registrarse en openweathermap.org
2. Ir a API Keys
3. Generar nueva key

**ExchangeRate-API:**
1. Registrarse en exchangerate-api.com
2. Dashboard → API Key

---

## 4. Servicios en la Nube (Opcionales)

### 4.1 AWS Free Tier
**URL:** https://aws.amazon.com/free/

**Incluye gratis:**
- EC2 (750 horas/mes)
- S3 (5GB)
- Lambda (1M requests)
- RDS (750 horas)

**Proceso:**
1. Crear cuenta con tarjeta de crédito
2. No se cobra si no se excede free tier

### 4.2 Google Cloud Free Tier
**URL:** https://cloud.google.com/free

**Incluye:**
- $300 en créditos (90 días)
- Always free products

### 4.3 Microsoft Azure for Students
**URL:** https://azure.microsoft.com/free/students/

**Incluye:**
- $100 en créditos
- Sin tarjeta de crédito (con email .edu)

---

## 5. Checklist de Cuentas por Track

### Todos los Tracks
- [ ] Anthropic Console (API key)
- [ ] GitHub
- [ ] Google Account

### Track 01: Desarrollo
- [ ] Postman
- [ ] Vercel (opcional)
- [ ] MongoDB Atlas (opcional)

### Track 02: Electrónica
- [ ] Arduino Cloud (opcional)
- [ ] ThingSpeak
- [ ] Tinkercad

### Track 03: Aeronáutica
- [ ] Autodesk (Fusion 360)
- [ ] Google Colab

### Track 04: Marketing
- [ ] Meta Business Suite
- [ ] Canva
- [ ] Buffer
- [ ] Mailchimp
- [ ] Google Analytics (demo)

### Track 05: Investigación
- [ ] Zotero
- [ ] Overleaf
- [ ] ORCID

### Track 06: Hospitalidad
- [ ] WhatsApp Business
- [ ] Google My Business
- [ ] Canva

---

## 6. Gestión de Credenciales

### Mejores Prácticas
1. **No compartir API keys** en código público
2. **Usar variables de entorno** para credenciales
3. **Rotar keys** si se exponen accidentalmente
4. **Documentar** qué cuenta usa cada servicio

### Archivo de Credenciales (Local, No Commitear)
```bash
# Crear archivo .env local
touch .env

# Contenido ejemplo:
ANTHROPIC_API_KEY=sk-ant-xxxxx
OPENWEATHER_API_KEY=xxxxx
GITHUB_TOKEN=ghp_xxxxx
```

### .gitignore
```
# Agregar a .gitignore
.env
.env.local
*.key
credentials.json
```

---

## 7. Recursos para Educadores

### Programas Educativos Gratuitos

| Servicio | Programa | URL |
|----------|----------|-----|
| GitHub | GitHub Education | education.github.com |
| Canva | Canva for Education | canva.com/education |
| Autodesk | Education License | autodesk.com/education |
| JetBrains | Educational Pack | jetbrains.com/community/education |
| Microsoft | Imagine Academy | imagine.microsoft.com |

### Solicitar Acceso Educativo
1. Usar email institucional (.edu, .edu.py)
2. Proporcionar documentación si se solicita
3. Renovar anualmente

---

## 8. Cuentas de Demostración

Para instructores que no quieren usar cuentas reales:

### Crear Negocio Ficticio
1. Nombre: "Demo FPUNA 2026"
2. Email: crear email temporal
3. Teléfono: usar número virtual (Google Voice)

### Servicios de Email Temporal
- Guerrilla Mail: guerrillamail.com
- Temp Mail: temp-mail.org

### Números Virtuales (Para WhatsApp Business)
- Google Voice (solo USA)
- TextNow
- Hushed

---

*Guía de Cuentas y Servicios - FPUNA 2026*
