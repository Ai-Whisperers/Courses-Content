# Module 8 Lab: Implementing Cost Optimization

## Lab Overview

**Duration:** 3-4 hours
**Difficulty:** Intermediate
**Prerequisites:** Modules 1-7, Redis knowledge helpful

In this lab, you'll build a complete cost optimization layer for an AI application, including semantic caching, model tiering, and cost monitoring.

---

## Learning Objectives

By completing this lab, you will:

1. Implement semantic caching with Redis
2. Build an intelligent model router
3. Create a cost monitoring system with alerts
4. Optimize prompts for token efficiency
5. Measure and report on optimization effectiveness

---

## Setup

### Prerequisites

```bash
# Create project directory
mkdir ai-cost-optimizer && cd ai-cost-optimizer

# Initialize project
npm init -y

# Install dependencies
npm install openai redis ioredis uuid

# For TypeScript (recommended)
npm install -D typescript @types/node @types/uuid ts-node
npx tsc --init
```

### Environment Configuration

Create `.env`:
```
OPENAI_API_KEY=your_api_key_here
REDIS_URL=redis://localhost:6379
DAILY_BUDGET=50.00
ALERT_EMAIL=your-email@example.com
```

### Start Redis

```bash
# Using Docker
docker run -d --name redis-cache -p 6379:6379 redis

# Or install locally
# macOS: brew install redis && brew services start redis
# Ubuntu: sudo apt install redis-server && sudo service redis start
```

---

## Part 1: Exact Match Cache (45 minutes)

### Task 1.1: Implement ExactMatchCache

Create `src/cache/ExactMatchCache.ts`:

```typescript
import Redis from 'ioredis';
import crypto from 'crypto';

interface CacheEntry {
  response: string;
  model: string;
  tokens: {
    input: number;
    output: number;
  };
  createdAt: number;
}

interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  estimatedSavings: number;
}

export class ExactMatchCache {
  private redis: Redis;
  private ttl: number;
  private prefix: string;

  constructor(redisUrl: string, ttlSeconds: number = 3600) {
    this.redis = new Redis(redisUrl);
    this.ttl = ttlSeconds;
    this.prefix = 'ai:exact:';
  }

  // TODO: Implement generateKey method
  // Create a deterministic key from prompt, model, and relevant parameters
  private generateKey(prompt: string, model: string, temperature: number): string {
    // Your implementation here
  }

  // TODO: Implement get method
  // Return cached response if exists, null otherwise
  // Track hits/misses in Redis
  async get(prompt: string, model: string, temperature: number): Promise<CacheEntry | null> {
    // Your implementation here
  }

  // TODO: Implement set method
  // Store response with TTL
  async set(
    prompt: string,
    model: string,
    temperature: number,
    response: string,
    tokens: { input: number; output: number }
  ): Promise<void> {
    // Your implementation here
  }

  // TODO: Implement getStats method
  // Return cache statistics including estimated savings
  async getStats(): Promise<CacheStats> {
    // Your implementation here
  }

  async clear(): Promise<void> {
    const keys = await this.redis.keys(`${this.prefix}*`);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
    await this.redis.set(`${this.prefix}hits`, 0);
    await this.redis.set(`${this.prefix}misses`, 0);
  }
}
```

### Task 1.2: Test Your Cache

Create `src/tests/cache.test.ts`:

```typescript
import { ExactMatchCache } from '../cache/ExactMatchCache';

async function testExactMatchCache() {
  const cache = new ExactMatchCache(process.env.REDIS_URL || 'redis://localhost:6379');

  // Clear previous test data
  await cache.clear();

  // Test 1: Cache miss
  const result1 = await cache.get('Hello', 'gpt-4o', 0.7);
  console.assert(result1 === null, 'Test 1 failed: Expected cache miss');

  // Test 2: Cache set and hit
  await cache.set('Hello', 'gpt-4o', 0.7, 'Hi there!', { input: 10, output: 5 });
  const result2 = await cache.get('Hello', 'gpt-4o', 0.7);
  console.assert(result2?.response === 'Hi there!', 'Test 2 failed: Expected cache hit');

  // Test 3: Different temperature = different key
  const result3 = await cache.get('Hello', 'gpt-4o', 0.5);
  console.assert(result3 === null, 'Test 3 failed: Different temp should miss');

  // Test 4: Stats tracking
  const stats = await cache.getStats();
  console.assert(stats.hits === 1, 'Test 4 failed: Expected 1 hit');
  console.assert(stats.misses === 2, 'Test 4 failed: Expected 2 misses');

  console.log('All ExactMatchCache tests passed!');
  console.log('Stats:', stats);

  process.exit(0);
}

testExactMatchCache().catch(console.error);
```

Run with: `npx ts-node src/tests/cache.test.ts`

---

## Part 2: Semantic Cache (60 minutes)

### Task 2.1: Implement SemanticCache

Create `src/cache/SemanticCache.ts`:

```typescript
import Redis from 'ioredis';
import OpenAI from 'openai';

interface SemanticCacheEntry {
  prompt: string;
  response: string;
  embedding: number[];
  model: string;
  createdAt: number;
}

export class SemanticCache {
  private redis: Redis;
  private openai: OpenAI;
  private similarityThreshold: number;
  private indexKey: string;

  constructor(
    redisUrl: string,
    openaiApiKey: string,
    similarityThreshold: number = 0.92
  ) {
    this.redis = new Redis(redisUrl);
    this.openai = new OpenAI({ apiKey: openaiApiKey });
    this.similarityThreshold = similarityThreshold;
    this.indexKey = 'ai:semantic:index';
  }

  // TODO: Implement getEmbedding method
  // Use text-embedding-3-small model
  private async getEmbedding(text: string): Promise<number[]> {
    // Your implementation here
  }

  // TODO: Implement cosineSimilarity method
  // Calculate cosine similarity between two vectors
  private cosineSimilarity(a: number[], b: number[]): number {
    // Your implementation here
  }

  // TODO: Implement get method
  // Find semantically similar cached response
  // Return response and similarity score if above threshold
  async get(prompt: string): Promise<{ response: string; similarity: number } | null> {
    // Your implementation here
    // 1. Generate embedding for query
    // 2. Load all cached entries
    // 3. Find most similar entry above threshold
    // 4. Track hits/misses
  }

  // TODO: Implement set method
  // Store response with embedding
  async set(prompt: string, response: string, model: string): Promise<void> {
    // Your implementation here
  }

  // TODO: Implement pruneOldEntries method
  // Remove entries older than maxAgeHours
  async pruneOldEntries(maxAgeHours: number): Promise<number> {
    // Your implementation here
  }

  async getEntryCount(): Promise<number> {
    return await this.redis.hlen(this.indexKey);
  }
}
```

### Task 2.2: Test Semantic Similarity

Create test cases that verify semantic matching:

```typescript
async function testSemanticCache() {
  const cache = new SemanticCache(
    process.env.REDIS_URL || 'redis://localhost:6379',
    process.env.OPENAI_API_KEY!,
    0.90  // 90% similarity threshold
  );

  // Cache a response
  await cache.set(
    "What is your return policy?",
    "Our return policy allows returns within 30 days of purchase with receipt.",
    "gpt-4o"
  );

  // Test similar queries
  const similarQueries = [
    "How do I return an item?",
    "What's the return policy?",
    "Can I return my purchase?",
    "Returns policy please",
  ];

  console.log('\nTesting semantic similarity:');
  for (const query of similarQueries) {
    const result = await cache.get(query);
    console.log(`Query: "${query}"`);
    console.log(`  Match: ${result ? 'YES' : 'NO'}`);
    if (result) {
      console.log(`  Similarity: ${(result.similarity * 100).toFixed(1)}%`);
    }
  }

  // Test dissimilar query (should not match)
  const dissimilarQuery = "What are your store hours?";
  const noMatch = await cache.get(dissimilarQuery);
  console.log(`\nQuery: "${dissimilarQuery}"`);
  console.log(`  Match: ${noMatch ? 'YES (unexpected!)' : 'NO (correct)'}`);
}
```

---

## Part 3: Model Router (45 minutes)

### Task 3.1: Implement ModelRouter

Create `src/router/ModelRouter.ts`:

```typescript
import OpenAI from 'openai';

export enum ModelTier {
  BUDGET = 'budget',
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

export interface TierConfig {
  model: string;
  maxTokens: number;
  temperature: number;
  costPer1kInput: number;
  costPer1kOutput: number;
}

export const TIER_CONFIGS: Record<ModelTier, TierConfig> = {
  [ModelTier.BUDGET]: {
    model: 'gpt-3.5-turbo',
    maxTokens: 1000,
    temperature: 0.7,
    costPer1kInput: 0.0005,
    costPer1kOutput: 0.0015,
  },
  [ModelTier.STANDARD]: {
    model: 'gpt-4o',
    maxTokens: 2000,
    temperature: 0.7,
    costPer1kInput: 0.0025,
    costPer1kOutput: 0.01,
  },
  [ModelTier.PREMIUM]: {
    model: 'gpt-4-turbo',
    maxTokens: 4000,
    temperature: 0.5,
    costPer1kInput: 0.01,
    costPer1kOutput: 0.03,
  },
};

export class ModelRouter {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  // TODO: Implement classifyRequest method
  // Use heuristics first, then LLM for ambiguous cases
  async classifyRequest(request: string): Promise<ModelTier> {
    // Your implementation here

    // Step 1: Quick heuristics (no API cost)
    // - Short greetings -> BUDGET
    // - Contains "analyze", "compare", "explain why" -> PREMIUM
    // - Very long prompts -> PREMIUM

    // Step 2: For ambiguous cases, use GPT-3.5 to classify

    // Step 3: Return appropriate tier
  }

  // TODO: Implement getConfigForRequest method
  getConfigForRequest(request: string): Promise<TierConfig> {
    // Your implementation here
  }

  // TODO: Implement estimateCost method
  // Estimate cost for a request with given config
  estimateCost(
    config: TierConfig,
    inputTokens: number,
    outputTokens: number
  ): number {
    // Your implementation here
  }
}
```

### Task 3.2: Test Router Decisions

```typescript
async function testModelRouter() {
  const router = new ModelRouter(process.env.OPENAI_API_KEY!);

  const testCases = [
    { prompt: "Hi there!", expected: ModelTier.BUDGET },
    { prompt: "What's 2+2?", expected: ModelTier.BUDGET },
    { prompt: "Summarize this article about climate change...", expected: ModelTier.STANDARD },
    { prompt: "Compare and contrast the economic policies of three countries, analyzing their impact on GDP growth, inflation, and employment over the past decade.", expected: ModelTier.PREMIUM },
    { prompt: "Write a Python function to sort a list", expected: ModelTier.STANDARD },
    { prompt: "Analyze this complex codebase and identify security vulnerabilities, performance bottlenecks, and architectural improvements. Consider scalability implications.", expected: ModelTier.PREMIUM },
  ];

  console.log('\nTesting Model Router:');
  for (const { prompt, expected } of testCases) {
    const tier = await router.classifyRequest(prompt);
    const correct = tier === expected;
    console.log(`${correct ? '✓' : '✗'} "${prompt.substring(0, 50)}..."`);
    console.log(`  Expected: ${expected}, Got: ${tier}`);
  }
}
```

---

## Part 4: Cost Monitor (45 minutes)

### Task 4.1: Implement CostMonitor

Create `src/monitor/CostMonitor.ts`:

```typescript
import { EventEmitter } from 'events';

export interface UsageRecord {
  id: string;
  timestamp: Date;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  userId?: string;
  feature?: string;
  cached: boolean;
}

export interface CostAlert {
  type: 'warning' | 'critical';
  message: string;
  currentSpend: number;
  threshold: number;
  timestamp: Date;
}

export class CostMonitor extends EventEmitter {
  private records: UsageRecord[] = [];
  private dailyBudget: number;
  private warningThreshold: number;
  private alertsSent: Set<string> = new Set();

  constructor(dailyBudget: number, warningThreshold: number = 0.8) {
    super();
    this.dailyBudget = dailyBudget;
    this.warningThreshold = warningThreshold;
  }

  // TODO: Implement recordUsage method
  // Record usage and check for alerts
  recordUsage(record: Omit<UsageRecord, 'id' | 'timestamp'>): UsageRecord {
    // Your implementation here
    // 1. Create full record with id and timestamp
    // 2. Add to records array
    // 3. Check alerts
    // 4. Return the record
  }

  // TODO: Implement getDailySpend method
  getDailySpend(date?: Date): number {
    // Your implementation here
  }

  // TODO: Implement getSpendByFeature method
  getSpendByFeature(days: number = 7): Record<string, number> {
    // Your implementation here
  }

  // TODO: Implement getSpendByModel method
  getSpendByModel(days: number = 7): Record<string, number> {
    // Your implementation here
  }

  // TODO: Implement checkAlerts method
  private checkAlerts(): void {
    // Your implementation here
    // Check if daily spend exceeds warning threshold or budget
    // Emit 'alert' event when thresholds are exceeded
    // Track alerts sent to avoid duplicates
  }

  // TODO: Implement generateReport method
  generateReport(days: number = 30): object {
    // Your implementation here
    // Return comprehensive report with:
    // - Summary stats (total spend, requests, avg cost)
    // - Breakdown by model
    // - Breakdown by feature
    // - Daily totals
    // - Cache savings
  }
}
```

### Task 4.2: Test Cost Monitoring

```typescript
async function testCostMonitor() {
  const monitor = new CostMonitor(50.00, 0.8); // $50 daily budget, 80% warning

  // Listen for alerts
  monitor.on('alert', (alert: CostAlert) => {
    console.log(`\n🚨 ALERT: ${alert.type.toUpperCase()}`);
    console.log(`   Message: ${alert.message}`);
    console.log(`   Spend: $${alert.currentSpend.toFixed(2)} / $${alert.threshold.toFixed(2)}`);
  });

  // Simulate usage
  const features = ['chat', 'search', 'summarize'];
  const models = ['gpt-3.5-turbo', 'gpt-4o', 'gpt-4-turbo'];

  for (let i = 0; i < 100; i++) {
    const model = models[Math.floor(Math.random() * models.length)];
    const feature = features[Math.floor(Math.random() * features.length)];

    // Vary cost by model
    const baseCost = model === 'gpt-4-turbo' ? 0.50 : model === 'gpt-4o' ? 0.15 : 0.02;
    const cost = baseCost * (0.5 + Math.random());

    monitor.recordUsage({
      model,
      inputTokens: Math.floor(Math.random() * 1000) + 100,
      outputTokens: Math.floor(Math.random() * 500) + 50,
      cost,
      feature,
      userId: `user_${Math.floor(Math.random() * 10)}`,
      cached: Math.random() > 0.7,
    });
  }

  // Generate report
  const report = monitor.generateReport(7);
  console.log('\n📊 Cost Report:');
  console.log(JSON.stringify(report, null, 2));
}
```

---

## Part 5: Integration (45 minutes)

### Task 5.1: Build OptimizedAIClient

Create `src/OptimizedAIClient.ts`:

```typescript
import OpenAI from 'openai';
import { ExactMatchCache } from './cache/ExactMatchCache';
import { SemanticCache } from './cache/SemanticCache';
import { ModelRouter, TIER_CONFIGS } from './router/ModelRouter';
import { CostMonitor } from './monitor/CostMonitor';

interface CompletionOptions {
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  useCache?: boolean;
  feature?: string;
  userId?: string;
}

interface CompletionResult {
  content: string;
  model: string;
  cached: boolean;
  cacheType?: 'exact' | 'semantic';
  tokens: {
    input: number;
    output: number;
  };
  cost: number;
  latency: number;
}

export class OptimizedAIClient {
  private openai: OpenAI;
  private exactCache: ExactMatchCache;
  private semanticCache: SemanticCache;
  private router: ModelRouter;
  private monitor: CostMonitor;

  constructor(config: {
    openaiApiKey: string;
    redisUrl: string;
    dailyBudget: number;
  }) {
    this.openai = new OpenAI({ apiKey: config.openaiApiKey });
    this.exactCache = new ExactMatchCache(config.redisUrl);
    this.semanticCache = new SemanticCache(config.redisUrl, config.openaiApiKey);
    this.router = new ModelRouter(config.openaiApiKey);
    this.monitor = new CostMonitor(config.dailyBudget);

    // Forward alerts
    this.monitor.on('alert', (alert) => {
      console.warn(`[CostAlert] ${alert.type}: ${alert.message}`);
    });
  }

  // TODO: Implement complete method
  // Full pipeline: cache check -> route -> generate -> cache store -> monitor
  async complete(prompt: string, options: CompletionOptions = {}): Promise<CompletionResult> {
    const startTime = Date.now();

    // Step 1: Check exact cache (if enabled)

    // Step 2: Check semantic cache (if enabled)

    // Step 3: Route to appropriate model

    // Step 4: Make API call

    // Step 5: Store in cache (if enabled)

    // Step 6: Record usage

    // Step 7: Return result

    // Your implementation here
  }

  // TODO: Implement getStats method
  async getStats(): Promise<object> {
    // Return combined stats from all components
  }
}
```

### Task 5.2: Demonstrate Cost Savings

Create `src/demo.ts`:

```typescript
import { OptimizedAIClient } from './OptimizedAIClient';

async function demonstrateSavings() {
  const client = new OptimizedAIClient({
    openaiApiKey: process.env.OPENAI_API_KEY!,
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    dailyBudget: 50.00,
  });

  // Simulate realistic traffic with repetition
  const queries = [
    "What is your return policy?",
    "How do I track my order?",
    "What payment methods do you accept?",
    "How do I reset my password?",
    "What are your shipping options?",
  ];

  console.log('🚀 Running optimization demo...\n');

  // Run each query multiple times to demonstrate caching
  for (let round = 1; round <= 3; round++) {
    console.log(`\n--- Round ${round} ---`);

    for (const query of queries) {
      // Also include slight variations
      const variation = round > 1 ? query.replace('?', ' please?') : query;

      const result = await client.complete(variation, {
        feature: 'support',
        useCache: true,
      });

      console.log(`Query: "${variation.substring(0, 40)}..."`);
      console.log(`  Cached: ${result.cached ? `YES (${result.cacheType})` : 'NO'}`);
      console.log(`  Model: ${result.model}`);
      console.log(`  Cost: $${result.cost.toFixed(4)}`);
      console.log(`  Latency: ${result.latency}ms`);
    }
  }

  // Show final stats
  console.log('\n📊 Final Statistics:');
  const stats = await client.getStats();
  console.log(JSON.stringify(stats, null, 2));
}

demonstrateSavings().catch(console.error);
```

---

## Submission Requirements

### Deliverables

1. **Complete source code** with all implementations:
   - ExactMatchCache.ts
   - SemanticCache.ts
   - ModelRouter.ts
   - CostMonitor.ts
   - OptimizedAIClient.ts

2. **Test results** showing:
   - Cache hit rates
   - Model routing decisions
   - Cost tracking accuracy

3. **Savings analysis** (300-400 words):
   - Measured cache hit rate
   - Cost reduction percentage
   - Recommendations for production

### Grading Rubric

| Criteria | Points |
|----------|--------|
| ExactMatchCache implementation | 15 |
| SemanticCache implementation | 20 |
| ModelRouter implementation | 20 |
| CostMonitor implementation | 15 |
| Integration (OptimizedAIClient) | 15 |
| Testing and documentation | 10 |
| Savings analysis quality | 5 |
| **Total** | **100** |

### Grading Scale

- **A (90-100):** All features working, excellent optimization results
- **B (80-89):** Core features working, good optimization
- **C (70-79):** Basic features working, some gaps
- **D (60-69):** Partial implementation
- **F (<60):** Does not meet requirements

---

## Bonus Challenges

### Bonus 1: Vector Database Integration (+10 points)
Replace Redis semantic cache with Pinecone or Weaviate for better scalability.

### Bonus 2: Cost Prediction (+10 points)
Add a method that predicts monthly costs based on current usage patterns.

### Bonus 3: A/B Testing (+5 points)
Implement A/B testing for different optimization strategies.

---

## Solution Hints

<details>
<summary>Hint 1: Consistent Hashing</summary>

```typescript
private generateKey(prompt: string, model: string, temperature: number): string {
  const normalized = JSON.stringify({
    prompt: prompt.trim().toLowerCase(),
    model,
    temperature: Math.round(temperature * 10) / 10,
  });
  return `${this.prefix}${crypto.createHash('sha256').update(normalized).digest('hex')}`;
}
```
</details>

<details>
<summary>Hint 2: Cosine Similarity</summary>

```typescript
private cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
```
</details>

<details>
<summary>Hint 3: Quick Heuristics</summary>

```typescript
// Quick classification without API call
const lowerPrompt = prompt.toLowerCase();
const wordCount = prompt.split(/\s+/).length;

// Simple queries
if (wordCount < 10 && /^(hi|hello|thanks|bye|help)/.test(lowerPrompt)) {
  return ModelTier.BUDGET;
}

// Complex queries
if (wordCount > 100 || /analyze|compare|explain why|comprehensive/.test(lowerPrompt)) {
  return ModelTier.PREMIUM;
}
```
</details>

---

*Lab 8 of 12 | Building AI-Powered Applications | Duration: 3-4 hours*
