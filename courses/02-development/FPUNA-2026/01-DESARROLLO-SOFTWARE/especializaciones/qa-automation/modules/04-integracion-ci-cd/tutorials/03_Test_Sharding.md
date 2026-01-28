# Tutorial: Test Sharding en CI/CD
## Módulo 04: Integración CI/CD

**Duración**: 40 minutos  
**Nivel**: Avanzado  
**Prerequisitos**: Module 01-03, GitHub Actions

---

## ¿Por Qué Sharding?

### Escenario: 100 Tests

```
❌ Sin Sharding:
1 máquina ejecuta 100 tests
⏱️ Total: 10 minutos

✅ Con Sharding (4 máquinas):
Máquina 1: Tests 1-25 (2.5 min)
Máquina 2: Tests 26-50 (2.5 min)
Máquina 3: Tests 51-75 (2.5 min)
Máquina 4: Tests 76-100 (2.5 min)
⏱️ Total: 2.5 minutos (4x más rápido)
```

---

## Sharding en Playwright

### Configurar playwright.config.ts

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  
  // Información de sharding
  shard: {
    current: parseInt(process.env.SHARD_INDEX || '1'),
    total: parseInt(process.env.SHARD_COUNT || '1')
  }
});
```

### Workflow con Sharding

```yaml
# .github/workflows/test-sharding.yml
name: Tests with Sharding

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        shard: [1, 2, 3, 4]  # 4 máquinas en paralelo
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install --with-deps
      
      - name: Run Playwright tests (shard ${{ matrix.shard }}/4)
        run: npx playwright test
        env:
          SHARD_INDEX: ${{ matrix.shard }}
          SHARD_COUNT: 4
      
      - name: Upload blob report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: blob-report-${{ matrix.shard }}
          path: blob-report
          retention-days: 1
  
  # Mergear reportes de todos los shards
  merge-reports:
    if: always()
    needs: [test]
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      
      - name: Download blob reports
        uses: actions/download-artifact@v3
        with:
          path: all-blob-reports
          pattern: blob-report-*
      
      - name: Merge reports
        run: npx playwright merge-reports --reporter html ./all-blob-reports
      
      - name: Upload HTML report
        uses: actions/upload-artifact@v3
        with:
          name: html-report-merged
          path: playwright-report
```

---

## Mejores Prácticas

✅ Usar múltiples shards en CI  
✅ Test data isolation entre shards  
✅ Mergear reportes finales  
❌ No compartir BD entre shards  
❌ No usar locks entre shards  

---

## Resumen

| Configuración | Tiempo | Costo |
|---------------|--------|-------|
| 1 máquina | 10 min | Bajo |
| 2 máquinas | 5 min | Medio |
| 4 máquinas | 2.5 min | Alto |

---

*Tutorial: Test Sharding - Módulo 04 Integración CI/CD - FPUNA 2026*
