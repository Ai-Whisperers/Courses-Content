# Project Context: FPUNA Marketing Track - AI Integration v1.0
## 🎯 Purpose

Especialización del programa FPUNA Verano 2026 enfocada en marketing digital y negocio con IA. Capacita estudiantes paraguayos para usar herramientas de IA en campañas de marketing, hospitality, y operaciones turísticas. Combina fundamentos comerciales con herramientas modernas, manteniendo foco en mercados locales y regionales Mercosur.

## 🏗️ Tech Stack

- **Entorno de marketing**: OpenCode + Claude Code + Browser MCP
- **Herramientas reales**: Meta Ads, Google Analytics, Canva IA-powered
- **Datos paraguayos**: Insights mercado local, comportamientos regionales
- **Personalización**: Prompts optimizados para español comercial de Paraguay
- **Integraciones**: WhatsApp Business, Google Business Profile

## 📁 Repository Structure

```
cursos/02-desarrollo/FPUNA-2026/04-MARKETING-NEGOCIOS-TURISMO/
├── modules/                    # Módulos principales (6 horas cada)
│   ├── 01-creacion-contenido-ia.md      # Copywriting con IA
│   ├── 02-marketing-datos.md            # GA4 + métricas IA
│   ├── 03-redes-sociales-automatizacion.md  # Bots + scheduling
│   ├── 04a-diseno-herramientas-ia.md    # Canva + Midjourney
│   ├── 04b-servicio-cliente-chatbots.md # WhatsApp + service IA
│   ├── 05a-gestion-campanas.md          # Ads + optimización
│   └── 05b-revenue-management.md        # Pricing dinámico
├── specializations/            # Especializaciones (8-12 horas)
│   ├── marketing-digital/      # Osocial media + ads
│   ├── hospitality-management/  # Hotel operations + revenue
│   └── sustainable-tourism/     # Ecoturismo + experience
├── students/                  # Materiales para estudiantes
│   ├── CONFIGURACION-HERRAMIENTAS-IA.md
│   └── TAREA-01-SETUP-INICIAL.md
└── instructor/               # Guías docentes + rubrics
    └── ASSESSMENT-RUBRICS.md
```

## 🛠️ Operation Guidelines

### Setup de Marketing Digital
```bash
# Entorno de marketing IA
npm install oh-my-opencode @modelcontextprotocol/server-playwright
cp ../../_compartido/04-utilidades-ia/.aiignore ./
cp ../../_compartido/01-configuracion-herramientas/claude/.claude/MKT .claude/

# Configuración local Paraguay
export TZ="America/Asuncion"
export MARKETING_LANGUAGE="es_PY"
```

### Estrategias de Marketing con IA

**Procesos diarios:**
1. **Content planning**: Mapa de contenido semanal generado por IA
2. **Audience research**: Insights de mercado paraguayo + regional
3. **Campaign launch**: Automatización de multi-canal advertising
4. **Performance monitoring**: Dashboards en tiempo real con alertas
5. **Optimization**: A/B testing continuo y ajuste automático

**Herramientas clave:**
- Content: Claude para copywriting + Midjourney para visuals
- Data: Analytics IA-parsed + Google Sheets automated
- Automation: Zapier/Bots para workflows
- Ads: Meta/Google ads con bidding inteligente

### Contexto Paraguayo de Marketing

**Mercado objetivo:**
- **Demografía**: 7M habitantes, 60% urbano, edad mediana 28 años
- **Digital penetration**: 80% uso smartphone, 65% redes sociales activas
- **Idiomas**: Español primario, Guarani en comunicaciones rurales
- **Power users**: Montevideo, Asunción, Ciudad del Este como hubs
- **Comportamiento**: Alto engagement WhatsApp, preferencia Instagram/Facebook

## 🧠 Memory & References

### Datos de Mercado Paraguayo 2026

**Crecimiento por sector:**
- **Marketing Digital**: ~40% CAGR (mercado underserving comercial)
- **E-commerce**: 35% crecimiento anual (infraestructura madurando)
- **Hospitality Tech**: 50% compitiendo con hoteles regionales
- **Tourism AI**: Oportunidades en ecoturismo Chaco/Pantanal
- **Revenue Management**: Hoteles implementando pricing dinámico

**Oportunidades específicas:**
- **Eco-tourism**: Chaco, parques naturales UNESCO
- **Event tourism**: CONMEBOL 2026 qualifiers + Copa América
- **Cultural tourism**: Misiones Jesuíticas visitas virtuales IA
- **Border tourism**: Ciudad del Este comercio transfronterizo
- **Sustainable business**: Integración CSR en estrategias de marca

### IA en Marketing Paraguayo

**Casos de uso efectivos:**
- Content syndication en español con variantes regionales
- Lead scoring basado en comportamiento social local
- Chat bot que entiende Guarani básico
- Personalized marketing usando datos Mercosur
- Seasonal pricing para turismo Paraguayo

### Recursos Educativos

- **Guías locales**: Estudios CONACYT sobre consumo digital Paraguay
- **Templates adaptados**: Copywriting templates para cultura local
- **Ejemplos paraguayos**: Case studies de empresas exitosas locales
- **Regulaciones**: Ley de protección datos personales Paraguay
- **Idioma local**: Marketing terminology en español paraguayo

## 📊 Metrics de Marketing Track

### Student Success Indicators

**Objetivos de aprendizaje:**
- **Content creation**: 50+ piezas de contenido generadas con IA
- **Campaign management**: 3 campañas completas con ROI positivo
- **Technical setup**: 100% estudiantes con OpenCode funcionando
- **Project deliverables**: Calidad profesional aplicable a empleos

### KPIs del Track

| Área | Target | Actual | Meta Track |
|------|--------|--------|------------|
| Customer Acquisition | 80% | [VALOR] | 90% |
| Content Engagement | >4.5 avg | [VALOR] | >5.0 |
| Leads Conversion | 25% | [VALOR] | 35% |
| Tool Adoption | 95% | [VALOR] | 100% |

### Business Impact

**Salario esperado post-curso:**
- Social Media Manager: ₲5-8M/mes
- Digital Marketing Specialist: ₲8-12M/mes
- Revenue Manager Hotel: ₲8-15M/mes
- Marketing Director Startup: ₲15-25M/mes
- Business Director Empresa: ₲20-35M/mes

---

> [!TIP]
> Refuerza siempre contexto Paraguayo en ejercicios. No use ejemplos genéricos globales - adapte a realidad local del mercado. Ultima actualización datos: Enero 2026 (pre-visitas CONMEBOL, post-COVID recuperación económica).