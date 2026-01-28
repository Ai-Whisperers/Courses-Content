# OpenCode Prompt: Generar Workflow Completo de GitHub Actions
## Módulo 04: Integración CI/CD

---

## PROMPT SIMPLE

```
Genera archivo .github/workflows/test.yml para Playwright que:

1. Se ejecute en push a main y en cada pull request
2. Use ubuntu-latest
3. Instale Node.js 18, dependencias, y Playwright browsers
4. Ejecute tests con: npx playwright test
5. Si falla, guarde reporte en artifacts

Formato: YAML válido, comentarios en español
```

---

## PROMPT AVANZADO

```
Genera .github/workflows/qa-pipeline.yml profesional que:

1. Se ejecute en push/PR a main/develop + schedule diario (2 AM)

2. Job 1 - Code Quality:
   - Lint (npm run lint)
   - Type check (npm run typecheck)
   
3. Job 2 - Tests (sharded 4x):
   - Matrix con 4 shards
   - Variables env para SHARD_INDEX y SHARD_COUNT
   - Upload blob reports
   
4. Job 3 - Merge Reports:
   - Merge blob reports en HTML
   - Upload HTML final
   
5. Job 4 - Status:
   - Verificar que code-quality y tests pasaron
   
6. Job 5 - Notify:
   - Enviar a Slack si falló
   - Usar secrets.SLACK_WEBHOOK_URL

Requisitos:
- Usar cache para npm
- Usar needs: para dependencias
- Condicionales if: estratégicos
- Comentarios claros en español
- 120+ líneas

Output: .github/workflows/qa-pipeline.yml completo
```

---

*Prompt: GitHub Actions - Módulo 04 Integración CI/CD - FPUNA 2026*
