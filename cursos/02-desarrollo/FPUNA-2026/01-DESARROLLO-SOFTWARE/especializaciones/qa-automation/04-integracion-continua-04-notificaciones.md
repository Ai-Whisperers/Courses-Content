# Tutorial: Notificaciones Automáticas (Slack)
## Módulo 04: Integración CI/CD

**Duración**: 35 minutos  
**Nivel**: Intermedio  
**Prerequisitos**: GitHub Actions, Slack workspace

---

## Notificaciones: Feedback Inmediato

```
✅ Tests fallan en CI/CD
✅ Slack notification: "❌ 2 tests failed: enrollment.spec.ts:15"
✅ Developer recibe notificación al instante
✅ Contexto completo en Slack
✅ Link a reporte
✅ No esperar a ver email
```

---

## Setup Slack + GitHub

### 1. Crear Slack App

1. Ir a https://api.slack.com/apps
2. "Create New App" → "From scratch"
3. Name: "GitHub Actions Notifications"
4. Select workspace
5. Enable "Incoming Webhooks"
6. "Add New Webhook to Workspace"
7. Copiar URL del webhook (guardar como secret)

### 2. Agregar Secret en GitHub

```
Repo → Settings → Secrets and variables → Actions
Nombre: SLACK_WEBHOOK_URL
Valor: https://hooks.slack.com/services/T00000000/B00000000/XXXX
```

---

## Ejemplos: Notificaciones en Slack

### Ejemplo 1: Notificación Simple

```yaml
- name: Send Slack notification
  if: always()
  uses: slackapi/slack-github-action@v1.24.0
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    payload: |
      {
        "text": "Tests completed: ${{ job.status }}",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*QA Tests* - ${{ job.status }}\n${{ github.repository }}"
            }
          }
        ]
      }
```

### Ejemplo 2: Notificación Detallada en Fallo

```yaml
- name: Send failure notification
  if: failure()
  uses: slackapi/slack-github-action@v1.24.0
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    payload: |
      {
        "text": "❌ Tests failed in ${{ github.repository }}",
        "blocks": [
          {
            "type": "header",
            "text": {
              "type": "plain_text",
              "text": "❌ QA Tests Failed"
            }
          },
          {
            "type": "section",
            "fields": [
              {
                "type": "mrkdwn",
                "text": "*Repository:*\n${{ github.repository }}"
              },
              {
                "type": "mrkdwn",
                "text": "*Branch:*\n${{ github.ref_name }}"
              },
              {
                "type": "mrkdwn",
                "text": "*Commit:*\n${{ github.sha }}"
              },
              {
                "type": "mrkdwn",
                "text": "*Author:*\n${{ github.actor }}"
              }
            ]
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "View Logs"
                },
                "url": "${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"
              },
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "View PR"
                },
                "url": "${{ github.event.pull_request.html_url }}"
              }
            ]
          }
        ]
      }
```

### Ejemplo 3: Notificación en Éxito

```yaml
- name: Send success notification
  if: success()
  uses: slackapi/slack-github-action@v1.24.0
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
    payload: |
      {
        "text": "✅ All tests passed!",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "✅ *All QA Tests Passed!*\n${{ github.repository }} - ${{ github.ref_name }}"
            }
          }
        ]
      }
```

---

## Mejores Prácticas

✅ Notificar en fallo  
✅ Incluir links a logs  
✅ Mention author del commit  
✅ Formatear bien (mrkdwn)  
❌ Spam de notificaciones  
❌ Notificar todo (solo fallas)  

---

*Tutorial: Notifications - Módulo 04 Integración CI/CD - FPUNA 2026*
