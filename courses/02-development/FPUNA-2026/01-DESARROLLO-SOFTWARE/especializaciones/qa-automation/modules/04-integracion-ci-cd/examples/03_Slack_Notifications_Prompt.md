# OpenCode Prompt: Configurar Notificaciones Slack
## Módulo 04: Integración CI/CD

---

## PROMPT

```
Genera .github/workflows/slack-notifications.yml que:

1. Se ejecute cuando tests fallan
2. Envíe notificación a Slack con:
   - Indicador ❌ de fallo
   - Nombre del repo
   - Rama
   - Commit autor
   - Link a logs de GitHub Actions
   - Link al PR (si es pull_request)

3. Si tests pasan:
   - Envíe notificación ✅
   - Mensaje simple de éxito

Requisitos:
- Usar slackapi/slack-github-action@v1.24.0
- Usar secrets.SLACK_WEBHOOK_URL
- Formatear con mrkdwn blocks
- Condicionales if: success() y if: failure()
- Comentarios en español

Output: Workflow completo, ~80 líneas
```

---

*Prompt: Slack Notifications - Módulo 04 Integración CI/CD - FPUNA 2026*
