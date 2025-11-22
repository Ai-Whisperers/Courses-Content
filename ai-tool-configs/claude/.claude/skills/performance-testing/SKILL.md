---
name: performance-testing
description: Generate load tests, performance benchmarks, and Core Web Vitals tests. Use when testing performance, load capacity, or frontend metrics.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Performance Testing Skill

## Capabilities

- Generate k6 load test scenarios
- Create Playwright performance tests
- Test Core Web Vitals (LCP, FID, CLS)
- Memory leak detection
- API response time benchmarks
- Database query performance

## k6 Load Testing

### Basic Load Test
```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const apiDuration = new Trend('api_duration');

export const options = {
  stages: [
    { duration: '1m', target: 10 },   // Ramp up
    { duration: '3m', target: 10 },   // Stay at 10 users
    { duration: '1m', target: 50 },   // Ramp to 50
    { duration: '3m', target: 50 },   // Stay at 50
    { duration: '1m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% under 500ms
    errors: ['rate<0.01'],              // Error rate under 1%
    api_duration: ['p(99)<1000'],       // 99% under 1s
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  // Login
  const loginRes = http.post(`${BASE_URL}/api/auth/login`, JSON.stringify({
    email: 'test@test.com',
    password: 'password'
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(loginRes, {
    'login successful': (r) => r.status === 200,
    'has token': (r) => r.json('token') !== undefined,
  }) || errorRate.add(1);

  const token = loginRes.json('token');

  // Get users
  const start = Date.now();
  const usersRes = http.get(`${BASE_URL}/api/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  apiDuration.add(Date.now() - start);

  check(usersRes, {
    'users status 200': (r) => r.status === 200,
    'users has data': (r) => r.json('data').length > 0,
  }) || errorRate.add(1);

  sleep(1);
}
```

### Spike Test
```javascript
// spike-test.js
export const options = {
  stages: [
    { duration: '10s', target: 100 },  // Spike to 100 users
    { duration: '1m', target: 100 },   // Stay at 100
    { duration: '10s', target: 0 },    // Drop to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // Allow higher during spike
    http_req_failed: ['rate<0.1'],     // Allow 10% failure during spike
  },
};
```

### Stress Test
```javascript
// stress-test.js
export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 },
    { duration: '5m', target: 300 },
    { duration: '2m', target: 0 },
  ],
};
```

## Playwright Performance Testing

### Core Web Vitals
```typescript
import { test, expect } from '@playwright/test';

test.describe('Core Web Vitals', () => {
  test('LCP is under 2.5s', async ({ page }) => {
    await page.goto('/');

    // Wait for LCP
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      });
    });

    console.log(`LCP: ${lcp}ms`);
    expect(lcp).toBeLessThan(2500);
  });

  test('CLS is under 0.1', async ({ page }) => {
    await page.goto('/');

    // Scroll to trigger layout shifts
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          resolve(clsValue);
        }).observe({ type: 'layout-shift', buffered: true });

        setTimeout(() => resolve(clsValue), 2000);
      });
    });

    console.log(`CLS: ${cls}`);
    expect(cls).toBeLessThan(0.1);
  });

  test('FID/INP is under 100ms', async ({ page }) => {
    await page.goto('/');

    // Click a button to measure interaction delay
    const button = page.getByRole('button', { name: 'Submit' });

    const startTime = Date.now();
    await button.click();
    const endTime = Date.now();

    const interactionTime = endTime - startTime;
    console.log(`Interaction time: ${interactionTime}ms`);
    expect(interactionTime).toBeLessThan(100);
  });

  test('Time to Interactive under 3.8s', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');

    // Wait for page to be fully interactive
    await page.waitForLoadState('networkidle');

    const tti = Date.now() - startTime;
    console.log(`TTI: ${tti}ms`);
    expect(tti).toBeLessThan(3800);
  });
});
```

### Page Load Performance
```typescript
test('Page load metrics', async ({ page }) => {
  await page.goto('/');

  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return {
      dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcpConnect: navigation.connectEnd - navigation.connectStart,
      ttfb: navigation.responseStart - navigation.requestStart,
      download: navigation.responseEnd - navigation.responseStart,
      domParsing: navigation.domInteractive - navigation.responseEnd,
      domComplete: navigation.domComplete - navigation.domInteractive,
      total: navigation.loadEventEnd - navigation.startTime,
    };
  });

  console.log('Performance Metrics:', metrics);

  expect(metrics.ttfb).toBeLessThan(600);      // TTFB under 600ms
  expect(metrics.total).toBeLessThan(3000);    // Total under 3s
});

test('Resource loading', async ({ page }) => {
  await page.goto('/');

  const resources = await page.evaluate(() => {
    return performance.getEntriesByType('resource').map((r: any) => ({
      name: r.name.split('/').pop(),
      type: r.initiatorType,
      duration: r.duration,
      size: r.transferSize,
    }));
  });

  // Check no resource takes too long
  const slowResources = resources.filter(r => r.duration > 1000);
  if (slowResources.length > 0) {
    console.log('Slow resources:', slowResources);
  }
  expect(slowResources.length).toBe(0);

  // Check total page size
  const totalSize = resources.reduce((sum, r) => sum + (r.size || 0), 0);
  console.log(`Total page size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
  expect(totalSize).toBeLessThan(5 * 1024 * 1024); // Under 5MB
});
```

### Memory Leak Detection
```typescript
test('No memory leaks on navigation', async ({ page }) => {
  const measurements: number[] = [];

  for (let i = 0; i < 10; i++) {
    await page.goto('/');
    await page.goto('/about');
    await page.goto('/products');

    const memory = await page.evaluate(() => {
      if ((performance as any).memory) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });

    measurements.push(memory);
  }

  // Check memory isn't growing significantly
  const growth = measurements[measurements.length - 1] - measurements[0];
  const growthPercent = (growth / measurements[0]) * 100;

  console.log(`Memory growth: ${growthPercent.toFixed(2)}%`);
  expect(growthPercent).toBeLessThan(50); // Less than 50% growth
});
```

### API Response Time
```typescript
test('API response times', async ({ request }) => {
  const endpoints = [
    { name: 'users', url: '/api/users', threshold: 200 },
    { name: 'products', url: '/api/products', threshold: 300 },
    { name: 'orders', url: '/api/orders', threshold: 500 },
  ];

  for (const endpoint of endpoints) {
    const start = Date.now();
    const response = await request.get(endpoint.url);
    const duration = Date.now() - start;

    console.log(`${endpoint.name}: ${duration}ms`);
    expect(response.ok()).toBeTruthy();
    expect(duration).toBeLessThan(endpoint.threshold);
  }
});
```

## Lighthouse CI Integration

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build
      - run: npm run start &
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000/
            http://localhost:3000/products
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
```

```json
// lighthouse-budget.json
[
  {
    "path": "/*",
    "timings": [
      { "metric": "first-contentful-paint", "budget": 1500 },
      { "metric": "largest-contentful-paint", "budget": 2500 },
      { "metric": "interactive", "budget": 3800 },
      { "metric": "total-blocking-time", "budget": 300 }
    ],
    "resourceSizes": [
      { "resourceType": "script", "budget": 300 },
      { "resourceType": "total", "budget": 1500 }
    ]
  }
]
```

## Best Practices

1. **Baseline First** - Establish performance baselines before optimizing
2. **Real Conditions** - Test with realistic data and network conditions
3. **Monitor Trends** - Track performance over time, not just snapshots
4. **Multiple Metrics** - Don't rely on single metric
5. **User-Centric** - Focus on metrics that affect user experience
6. **CI Integration** - Run performance tests on every PR
