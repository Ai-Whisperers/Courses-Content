# OpenCode Prompt: Configurar Allure Reports
## Módulo 04: Integración CI/CD

---

## PROMPT

```
Genera configuración completa de Allure Reports:

1. Archivo playwright.config.ts que:
   - Use reporter allure-playwright
   - Screenshot solo en falla
   - Video solo en falla
   - Trace on-first-retry
   - Retries: 2

2. Archivo .github/workflows/allure.yml que:
   - Execute tests
   - Generate Allure report
   - Upload a artifacts
   
3. Archivo de test ejemplo que usa:
   - test.step() para organizar acciones
   - test.info().annotations para requirements
   - Nombres descriptivos

Lenguaje: TypeScript/YAML
Comentarios: Español
Output: 3 archivos listos para usar
```

---

*Prompt: Allure Reports - Módulo 04 Integración CI/CD - FPUNA 2026*
