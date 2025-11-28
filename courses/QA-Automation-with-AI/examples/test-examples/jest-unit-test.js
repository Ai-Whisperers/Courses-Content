/**
 * Example: Well-structured Jest unit tests
 *
 * This file demonstrates best practices for AI-generated tests:
 * - Clear test organization with describe blocks
 * - Descriptive test names
 * - AAA pattern (Arrange, Act, Assert)
 * - Proper setup/teardown
 * - Edge case coverage
 * - Error case coverage
 */

// Source code being tested
class UserService {
  constructor(database) {
    this.database = database;
  }

  async createUser(userData) {
    // Validate required fields
    if (!userData.email) {
      throw new Error('Email is required');
    }
    if (!userData.password) {
      throw new Error('Password is required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Invalid email format');
    }

    // Validate password strength
    if (userData.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    // Check for existing user
    const existingUser = await this.database.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Create user
    const user = await this.database.createUser({
      email: userData.email.toLowerCase(),
      password: userData.password, // In real app, this would be hashed
      name: userData.name || '',
      createdAt: new Date()
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name
    };
  }

  async getUserById(id) {
    if (!id) {
      throw new Error('User ID is required');
    }

    const user = await this.database.findUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name
    };
  }
}

// ============================================
// TESTS
// ============================================

describe('UserService', () => {
  // Shared test variables
  let userService;
  let mockDatabase;

  // Setup: Run before each test
  beforeEach(() => {
    // Create mock database with default behavior
    mockDatabase = {
      findUserByEmail: jest.fn().mockResolvedValue(null),
      findUserById: jest.fn(),
      createUser: jest.fn().mockImplementation(data => ({
        id: 'user-123',
        ...data
      }))
    };

    // Create service instance with mock
    userService = new UserService(mockDatabase);
  });

  // Teardown: Run after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ==========================================
  // createUser tests
  // ==========================================
  describe('createUser', () => {
    // Valid user data for tests
    const validUserData = {
      email: 'test@example.com',
      password: 'SecurePass123',
      name: 'Test User'
    };

    // ------------------------------------------
    // Happy path tests
    // ------------------------------------------
    describe('when given valid data', () => {
      test('should create user and return user data without password', async () => {
        // Arrange
        const userData = { ...validUserData };

        // Act
        const result = await userService.createUser(userData);

        // Assert
        expect(result).toEqual({
          id: 'user-123',
          email: 'test@example.com',
          name: 'Test User'
        });
        expect(result.password).toBeUndefined();
      });

      test('should convert email to lowercase', async () => {
        // Arrange
        const userData = {
          ...validUserData,
          email: 'TEST@EXAMPLE.COM'
        };

        // Act
        await userService.createUser(userData);

        // Assert
        expect(mockDatabase.createUser).toHaveBeenCalledWith(
          expect.objectContaining({
            email: 'test@example.com'
          })
        );
      });

      test('should use empty string for name if not provided', async () => {
        // Arrange
        const userData = {
          email: validUserData.email,
          password: validUserData.password
          // name not provided
        };

        // Act
        const result = await userService.createUser(userData);

        // Assert
        expect(result.name).toBe('');
      });

      test('should add createdAt timestamp', async () => {
        // Arrange
        const userData = { ...validUserData };
        const beforeCreate = new Date();

        // Act
        await userService.createUser(userData);

        // Assert
        const createCall = mockDatabase.createUser.mock.calls[0][0];
        expect(createCall.createdAt).toBeInstanceOf(Date);
        expect(createCall.createdAt.getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
      });
    });

    // ------------------------------------------
    // Validation error tests
    // ------------------------------------------
    describe('when given invalid data', () => {
      test('should throw error when email is missing', async () => {
        // Arrange
        const userData = {
          password: 'SecurePass123',
          name: 'Test User'
        };

        // Act & Assert
        await expect(userService.createUser(userData))
          .rejects
          .toThrow('Email is required');
      });

      test('should throw error when password is missing', async () => {
        // Arrange
        const userData = {
          email: 'test@example.com',
          name: 'Test User'
        };

        // Act & Assert
        await expect(userService.createUser(userData))
          .rejects
          .toThrow('Password is required');
      });

      test('should throw error for invalid email format', async () => {
        // Arrange
        const invalidEmails = [
          'notanemail',
          'missing@domain',
          '@nodomain.com',
          'spaces in@email.com'
        ];

        for (const email of invalidEmails) {
          const userData = {
            ...validUserData,
            email
          };

          // Act & Assert
          await expect(userService.createUser(userData))
            .rejects
            .toThrow('Invalid email format');
        }
      });

      test('should throw error when password is less than 8 characters', async () => {
        // Arrange
        const userData = {
          ...validUserData,
          password: 'short'
        };

        // Act & Assert
        await expect(userService.createUser(userData))
          .rejects
          .toThrow('Password must be at least 8 characters');
      });

      test('should throw error when email already exists', async () => {
        // Arrange
        mockDatabase.findUserByEmail.mockResolvedValue({ id: 'existing-user' });
        const userData = { ...validUserData };

        // Act & Assert
        await expect(userService.createUser(userData))
          .rejects
          .toThrow('Email already exists');
      });
    });

    // ------------------------------------------
    // Edge case tests
    // ------------------------------------------
    describe('edge cases', () => {
      test('should accept password exactly 8 characters', async () => {
        // Arrange
        const userData = {
          ...validUserData,
          password: '12345678'
        };

        // Act & Assert
        await expect(userService.createUser(userData)).resolves.toBeDefined();
      });

      test('should handle very long email addresses', async () => {
        // Arrange
        const longLocalPart = 'a'.repeat(64);
        const userData = {
          ...validUserData,
          email: `${longLocalPart}@example.com`
        };

        // Act & Assert
        await expect(userService.createUser(userData)).resolves.toBeDefined();
      });

      test('should handle special characters in name', async () => {
        // Arrange
        const userData = {
          ...validUserData,
          name: "O'Brien-Smith Jr."
        };

        // Act
        const result = await userService.createUser(userData);

        // Assert
        expect(result.name).toBe("O'Brien-Smith Jr.");
      });
    });
  });

  // ==========================================
  // getUserById tests
  // ==========================================
  describe('getUserById', () => {
    test('should return user data when user exists', async () => {
      // Arrange
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashedPassword' // Should not be returned
      };
      mockDatabase.findUserById.mockResolvedValue(mockUser);

      // Act
      const result = await userService.getUserById('user-123');

      // Assert
      expect(result).toEqual({
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User'
      });
      expect(result.password).toBeUndefined();
    });

    test('should throw error when id is not provided', async () => {
      // Act & Assert
      await expect(userService.getUserById(null))
        .rejects
        .toThrow('User ID is required');

      await expect(userService.getUserById(undefined))
        .rejects
        .toThrow('User ID is required');

      await expect(userService.getUserById(''))
        .rejects
        .toThrow('User ID is required');
    });

    test('should throw error when user not found', async () => {
      // Arrange
      mockDatabase.findUserById.mockResolvedValue(null);

      // Act & Assert
      await expect(userService.getUserById('nonexistent'))
        .rejects
        .toThrow('User not found');
    });
  });
});

module.exports = UserService;
