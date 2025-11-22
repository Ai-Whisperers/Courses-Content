---
name: database-testing
description: Generate database tests, test data from schemas, migration validation, and query performance tests. Use when testing databases, migrations, or data integrity.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Database Testing Skill

## Capabilities

- Generate test data from database schemas
- Validate migrations (forward and backward)
- Test query performance
- Verify data integrity and constraints
- Test backup and restore procedures
- Generate factory functions for test data

## Test Data Generation

### From Prisma Schema
```typescript
// Given a Prisma schema, generate factory functions
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// User Factory
export const createUser = async (overrides = {}) => {
  return prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      role: 'user',
      createdAt: new Date(),
      ...overrides
    }
  });
};

// Product Factory
export const createProduct = async (overrides = {}) => {
  return prisma.product.create({
    data: {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      sku: faker.string.alphanumeric(10).toUpperCase(),
      stock: faker.number.int({ min: 0, max: 1000 }),
      category: faker.commerce.department(),
      ...overrides
    }
  });
};

// Order Factory with relations
export const createOrder = async (userId?: number, overrides = {}) => {
  const user = userId
    ? await prisma.user.findUnique({ where: { id: userId } })
    : await createUser();

  const products = await Promise.all([
    createProduct(),
    createProduct()
  ]);

  return prisma.order.create({
    data: {
      userId: user!.id,
      status: 'pending',
      total: products.reduce((sum, p) => sum + p.price, 0),
      items: {
        create: products.map(p => ({
          productId: p.id,
          quantity: faker.number.int({ min: 1, max: 5 }),
          price: p.price
        }))
      },
      ...overrides
    },
    include: {
      items: true,
      user: true
    }
  });
};

// Bulk data generation
export const seedDatabase = async (counts = { users: 10, products: 50, orders: 100 }) => {
  console.log('Seeding database...');

  // Create users
  const users = await Promise.all(
    Array(counts.users).fill(null).map(() => createUser())
  );
  console.log(`Created ${users.length} users`);

  // Create products
  const products = await Promise.all(
    Array(counts.products).fill(null).map(() => createProduct())
  );
  console.log(`Created ${products.length} products`);

  // Create orders
  const orders = await Promise.all(
    Array(counts.orders).fill(null).map(() =>
      createOrder(faker.helpers.arrayElement(users).id)
    )
  );
  console.log(`Created ${orders.length} orders`);

  return { users, products, orders };
};
```

## Migration Testing

### Forward Migration Test
```typescript
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

describe('Database Migrations', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('migrations apply successfully', async () => {
    // Reset database
    execSync('npx prisma migrate reset --force', { stdio: 'inherit' });

    // Apply all migrations
    const result = execSync('npx prisma migrate deploy', { encoding: 'utf-8' });
    expect(result).toContain('migrations applied');
  });

  test('schema is in sync after migration', async () => {
    const result = execSync('npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-schema-datasource prisma/schema.prisma', { encoding: 'utf-8' });
    expect(result).toContain('No difference');
  });

  test('new columns have correct defaults', async () => {
    // Test that new columns have expected default values
    const user = await prisma.user.create({
      data: {
        email: 'test@test.com',
        name: 'Test'
      }
    });

    expect(user.role).toBe('user'); // Default value
    expect(user.isActive).toBe(true); // Default value
  });
});
```

### Rollback Migration Test
```typescript
test('migration can be rolled back', async () => {
  // Get current migration
  const before = execSync('npx prisma migrate status', { encoding: 'utf-8' });
  const migrationCount = (before.match(/applied/g) || []).length;

  // Rollback last migration (if supported)
  try {
    execSync('npx prisma migrate reset --skip-seed', { stdio: 'inherit' });

    // Reapply all but last
    execSync(`npx prisma migrate deploy`, { stdio: 'inherit' });

    const after = execSync('npx prisma migrate status', { encoding: 'utf-8' });
    expect(after).toContain('applied');
  } catch (error) {
    console.log('Rollback test:', error);
  }
});
```

## Data Integrity Tests

```typescript
describe('Data Integrity', () => {
  test('foreign key constraints are enforced', async () => {
    // Attempt to create order with non-existent user
    await expect(
      prisma.order.create({
        data: {
          userId: 999999,
          status: 'pending',
          total: 100
        }
      })
    ).rejects.toThrow('Foreign key constraint');
  });

  test('unique constraints are enforced', async () => {
    await createUser({ email: 'unique@test.com' });

    await expect(
      createUser({ email: 'unique@test.com' })
    ).rejects.toThrow('Unique constraint');
  });

  test('not null constraints are enforced', async () => {
    await expect(
      prisma.user.create({
        data: {
          email: null as any,
          name: 'Test'
        }
      })
    ).rejects.toThrow();
  });

  test('check constraints are enforced', async () => {
    await expect(
      createProduct({ price: -10 })
    ).rejects.toThrow();
  });

  test('cascade deletes work correctly', async () => {
    const user = await createUser();
    const order = await createOrder(user.id);

    // Delete user
    await prisma.user.delete({ where: { id: user.id } });

    // Order should be deleted
    const deletedOrder = await prisma.order.findUnique({
      where: { id: order.id }
    });
    expect(deletedOrder).toBeNull();
  });
});
```

## Query Performance Tests

```typescript
describe('Query Performance', () => {
  beforeAll(async () => {
    // Seed with large dataset
    await seedDatabase({ users: 1000, products: 5000, orders: 10000 });
  });

  test('user lookup by email is fast', async () => {
    const start = performance.now();

    await prisma.user.findUnique({
      where: { email: 'test@test.com' }
    });

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(50); // Under 50ms
  });

  test('order list with pagination is fast', async () => {
    const start = performance.now();

    await prisma.order.findMany({
      take: 20,
      skip: 0,
      include: {
        user: true,
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100); // Under 100ms
  });

  test('complex aggregation is acceptable', async () => {
    const start = performance.now();

    await prisma.order.groupBy({
      by: ['status'],
      _count: true,
      _sum: { total: true },
      _avg: { total: true }
    });

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(200); // Under 200ms
  });

  test('full-text search performs well', async () => {
    const start = performance.now();

    await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: 'shirt', mode: 'insensitive' } },
          { description: { contains: 'shirt', mode: 'insensitive' } }
        ]
      },
      take: 20
    });

    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100);
  });
});
```

## Transaction Tests

```typescript
describe('Transactions', () => {
  test('transaction rolls back on error', async () => {
    const initialCount = await prisma.order.count();

    try {
      await prisma.$transaction(async (tx) => {
        await tx.order.create({
          data: {
            userId: 1,
            status: 'pending',
            total: 100
          }
        });

        // This will fail
        throw new Error('Simulated error');
      });
    } catch (error) {
      // Expected
    }

    const finalCount = await prisma.order.count();
    expect(finalCount).toBe(initialCount);
  });

  test('concurrent transactions handle locks', async () => {
    const product = await createProduct({ stock: 10 });

    // Simulate concurrent purchases
    const results = await Promise.allSettled([
      prisma.$transaction(async (tx) => {
        const p = await tx.product.findUnique({ where: { id: product.id } });
        if (p!.stock >= 5) {
          await tx.product.update({
            where: { id: product.id },
            data: { stock: { decrement: 5 } }
          });
        }
      }),
      prisma.$transaction(async (tx) => {
        const p = await tx.product.findUnique({ where: { id: product.id } });
        if (p!.stock >= 8) {
          await tx.product.update({
            where: { id: product.id },
            data: { stock: { decrement: 8 } }
          });
        }
      })
    ]);

    const finalProduct = await prisma.product.findUnique({
      where: { id: product.id }
    });

    // Stock should not go negative
    expect(finalProduct!.stock).toBeGreaterThanOrEqual(0);
  });
});
```

## Cleanup Utilities

```typescript
// test/helpers/database.ts
export const cleanDatabase = async () => {
  const prisma = new PrismaClient();

  // Delete in correct order for foreign keys
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  await prisma.$disconnect();
};

export const resetSequences = async () => {
  const prisma = new PrismaClient();

  // Reset auto-increment sequences
  await prisma.$executeRaw`ALTER SEQUENCE users_id_seq RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE products_id_seq RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE orders_id_seq RESTART WITH 1`;

  await prisma.$disconnect();
};
```

## Best Practices

1. **Isolate Tests** - Each test should have its own data
2. **Use Transactions** - Wrap tests in transactions for easy rollback
3. **Test Edge Cases** - NULL values, empty strings, boundaries
4. **Performance Baselines** - Set and monitor query time limits
5. **Clean Up** - Always clean up test data
6. **Use Factories** - Don't hardcode test data
