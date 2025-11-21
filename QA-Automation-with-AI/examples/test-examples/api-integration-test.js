/**
 * Example: API Integration Tests with Supertest
 *
 * This file demonstrates production-quality API integration tests
 * generated with AI assistance. Use this as a reference for testing
 * REST APIs with proper setup, teardown, and assertions.
 */

const request = require('supertest');
const app = require('../app');
const db = require('../database');

// ============================================
// Test Configuration
// ============================================

describe('User API', () => {
  // Reset database before each test for isolation
  beforeEach(async () => {
    await db.query('DELETE FROM users');
    await db.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  });

  // Clean up after all tests
  afterAll(async () => {
    await db.close();
  });

  // ============================================
  // POST /api/users - Create User
  // ============================================
  describe('POST /api/users', () => {
    const validUser = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecurePass123!'
    };

    describe('Success cases', () => {
      it('should create user with valid data and return 201', async () => {
        // Act
        const response = await request(app)
          .post('/api/users')
          .send(validUser)
          .expect('Content-Type', /json/)
          .expect(201);

        // Assert
        expect(response.body).toMatchObject({
          id: expect.any(Number),
          name: 'John Doe',
          email: 'john@example.com',
          createdAt: expect.any(String)
        });
        expect(response.body).not.toHaveProperty('password');
      });

      it('should store user in database', async () => {
        // Act
        await request(app)
          .post('/api/users')
          .send(validUser)
          .expect(201);

        // Assert - verify database state
        const result = await db.query(
          'SELECT * FROM users WHERE email = $1',
          [validUser.email]
        );
        expect(result.rows).toHaveLength(1);
        expect(result.rows[0].name).toBe('John Doe');
      });

      it('should hash password before storing', async () => {
        // Act
        await request(app)
          .post('/api/users')
          .send(validUser)
          .expect(201);

        // Assert
        const result = await db.query(
          'SELECT password FROM users WHERE email = $1',
          [validUser.email]
        );
        expect(result.rows[0].password).not.toBe(validUser.password);
        expect(result.rows[0].password).toMatch(/^\$2[aby]\$/); // bcrypt hash
      });
    });

    describe('Validation errors', () => {
      it('should return 400 when name is missing', async () => {
        const response = await request(app)
          .post('/api/users')
          .send({ email: 'test@test.com', password: 'pass123' })
          .expect(400);

        expect(response.body).toMatchObject({
          error: 'Validation failed',
          details: expect.arrayContaining([
            expect.objectContaining({ field: 'name' })
          ])
        });
      });

      it('should return 400 when email is invalid', async () => {
        const response = await request(app)
          .post('/api/users')
          .send({ ...validUser, email: 'invalid-email' })
          .expect(400);

        expect(response.body.details).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              field: 'email',
              message: expect.stringContaining('valid email')
            })
          ])
        );
      });

      it('should return 400 when password is too short', async () => {
        const response = await request(app)
          .post('/api/users')
          .send({ ...validUser, password: '123' })
          .expect(400);

        expect(response.body.details).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ field: 'password' })
          ])
        );
      });
    });

    describe('Conflict errors', () => {
      it('should return 409 when email already exists', async () => {
        // Arrange - create first user
        await request(app)
          .post('/api/users')
          .send(validUser)
          .expect(201);

        // Act - try to create duplicate
        const response = await request(app)
          .post('/api/users')
          .send(validUser)
          .expect(409);

        // Assert
        expect(response.body).toMatchObject({
          error: 'Email already registered'
        });
      });
    });
  });

  // ============================================
  // GET /api/users - List Users
  // ============================================
  describe('GET /api/users', () => {
    it('should return empty array when no users exist', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return all users', async () => {
      // Arrange - create users
      await request(app)
        .post('/api/users')
        .send({ name: 'User 1', email: 'user1@test.com', password: 'pass123!' });
      await request(app)
        .post('/api/users')
        .send({ name: 'User 2', email: 'user2@test.com', password: 'pass123!' });

      // Act
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      // Assert
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject({ name: 'User 1' });
      expect(response.body[1]).toMatchObject({ name: 'User 2' });
    });

    it('should support pagination', async () => {
      // Arrange - create 5 users
      for (let i = 1; i <= 5; i++) {
        await request(app)
          .post('/api/users')
          .send({
            name: `User ${i}`,
            email: `user${i}@test.com`,
            password: 'pass123!'
          });
      }

      // Act
      const response = await request(app)
        .get('/api/users')
        .query({ page: 1, limit: 2 })
        .expect(200);

      // Assert
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination).toMatchObject({
        page: 1,
        limit: 2,
        total: 5,
        pages: 3
      });
    });

    it('should not return password field', async () => {
      // Arrange
      await request(app)
        .post('/api/users')
        .send({ name: 'Test', email: 'test@test.com', password: 'pass123!' });

      // Act
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      // Assert
      expect(response.body[0]).not.toHaveProperty('password');
    });
  });

  // ============================================
  // GET /api/users/:id - Get User
  // ============================================
  describe('GET /api/users/:id', () => {
    let createdUser;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Test User', email: 'test@test.com', password: 'pass123!' });
      createdUser = response.body;
    });

    it('should return user by ID', async () => {
      const response = await request(app)
        .get(`/api/users/${createdUser.id}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toMatchObject({
        id: createdUser.id,
        name: 'Test User',
        email: 'test@test.com'
      });
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/users/99999')
        .expect(404);

      expect(response.body).toMatchObject({
        error: 'User not found'
      });
    });

    it('should return 400 for invalid ID format', async () => {
      const response = await request(app)
        .get('/api/users/invalid')
        .expect(400);

      expect(response.body).toMatchObject({
        error: 'Invalid user ID'
      });
    });
  });

  // ============================================
  // PUT /api/users/:id - Update User
  // ============================================
  describe('PUT /api/users/:id', () => {
    let createdUser;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Test User', email: 'test@test.com', password: 'pass123!' });
      createdUser = response.body;
    });

    it('should update user name', async () => {
      const response = await request(app)
        .put(`/api/users/${createdUser.id}`)
        .send({ name: 'Updated Name' })
        .expect(200);

      expect(response.body.name).toBe('Updated Name');
      expect(response.body.email).toBe('test@test.com');
    });

    it('should update user email', async () => {
      const response = await request(app)
        .put(`/api/users/${createdUser.id}`)
        .send({ email: 'new@email.com' })
        .expect(200);

      expect(response.body.email).toBe('new@email.com');
    });

    it('should return 404 for non-existent user', async () => {
      await request(app)
        .put('/api/users/99999')
        .send({ name: 'New Name' })
        .expect(404);
    });

    it('should return 409 when updating to existing email', async () => {
      // Arrange - create another user
      await request(app)
        .post('/api/users')
        .send({ name: 'Other', email: 'other@test.com', password: 'pass123!' });

      // Act
      const response = await request(app)
        .put(`/api/users/${createdUser.id}`)
        .send({ email: 'other@test.com' })
        .expect(409);

      expect(response.body.error).toContain('Email already');
    });

    it('should persist changes to database', async () => {
      // Act
      await request(app)
        .put(`/api/users/${createdUser.id}`)
        .send({ name: 'Persisted Name' })
        .expect(200);

      // Assert - verify database
      const result = await db.query(
        'SELECT name FROM users WHERE id = $1',
        [createdUser.id]
      );
      expect(result.rows[0].name).toBe('Persisted Name');
    });
  });

  // ============================================
  // DELETE /api/users/:id - Delete User
  // ============================================
  describe('DELETE /api/users/:id', () => {
    let createdUser;

    beforeEach(async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Test User', email: 'test@test.com', password: 'pass123!' });
      createdUser = response.body;
    });

    it('should delete user and return 204', async () => {
      await request(app)
        .delete(`/api/users/${createdUser.id}`)
        .expect(204);

      // Verify user is gone
      const result = await db.query(
        'SELECT * FROM users WHERE id = $1',
        [createdUser.id]
      );
      expect(result.rows).toHaveLength(0);
    });

    it('should return 404 for non-existent user', async () => {
      await request(app)
        .delete('/api/users/99999')
        .expect(404);
    });

    it('should return 404 when deleting already deleted user', async () => {
      // Delete first time
      await request(app)
        .delete(`/api/users/${createdUser.id}`)
        .expect(204);

      // Try to delete again
      await request(app)
        .delete(`/api/users/${createdUser.id}`)
        .expect(404);
    });
  });

  // ============================================
  // Edge Cases
  // ============================================
  describe('Edge Cases', () => {
    it('should handle special characters in name', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: "O'Brien-Smith, José",
          email: 'special@test.com',
          password: 'pass123!'
        })
        .expect(201);

      expect(response.body.name).toBe("O'Brien-Smith, José");
    });

    it('should handle unicode in name', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: '田中太郎',
          email: 'unicode@test.com',
          password: 'pass123!'
        })
        .expect(201);

      expect(response.body.name).toBe('田中太郎');
    });

    it('should trim whitespace from inputs', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: '  Trimmed Name  ',
          email: '  trim@test.com  ',
          password: 'pass123!'
        })
        .expect(201);

      expect(response.body.name).toBe('Trimmed Name');
      expect(response.body.email).toBe('trim@test.com');
    });

    it('should handle concurrent requests', async () => {
      const promises = [];

      for (let i = 0; i < 10; i++) {
        promises.push(
          request(app)
            .post('/api/users')
            .send({
              name: `User ${i}`,
              email: `concurrent${i}@test.com`,
              password: 'pass123!'
            })
        );
      }

      const responses = await Promise.all(promises);
      const successCount = responses.filter(r => r.status === 201).length;

      expect(successCount).toBe(10);
    });
  });
});
