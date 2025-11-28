# Module 3: Accessing Private Repositories - Code Examples

**Reference guide for commands, prompts, and configurations**

[Back to Module Overview](./MODULE-OVERVIEW.md)

---

## Table of Contents

1. [GitHub CLI Installation](#1-github-cli-installation)
2. [Authentication Examples](#2-authentication-examples)
3. [Repository Commands](#3-repository-commands)
4. [AI Analysis Prompts](#4-ai-analysis-prompts)
5. [CLAUDE.md Templates](#5-claudemd-templates)
6. [Security Configurations](#6-security-configurations)
7. [Troubleshooting Scripts](#7-troubleshooting-scripts)

---

## 1. GitHub CLI Installation

### Windows

#### Method 1: WinGet (Recommended)
```powershell
# Install GitHub CLI
winget install --id GitHub.cli

# Verify installation
gh --version

# Update GitHub CLI
winget upgrade --id GitHub.cli
```

#### Method 2: Chocolatey
```powershell
# Install Chocolatey first (if not installed)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install GitHub CLI
choco install gh

# Verify
gh --version
```

#### Method 3: Manual Installation
```powershell
# Download from https://github.com/cli/cli/releases/latest
# Install the .msi file
# Verify in new terminal:
gh --version
```

---

### macOS

#### Method 1: Homebrew (Recommended)
```bash
# Install Homebrew first (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install GitHub CLI
brew install gh

# Verify installation
gh --version

# Update GitHub CLI
brew upgrade gh
```

#### Method 2: MacPorts
```bash
sudo port install gh

# Verify
gh --version
```

#### Method 3: Conda
```bash
conda install gh --channel conda-forge

# Verify
gh --version
```

---

### Linux

#### Ubuntu/Debian
```bash
# Method 1: Official package
type -p curl >/dev/null || (sudo apt update && sudo apt install curl -y)
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
&& sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
&& sudo apt update \
&& sudo apt install gh -y

# Method 2: Snap
sudo snap install gh

# Verify
gh --version
```

#### Fedora/CentOS/RHEL
```bash
sudo dnf install gh

# Verify
gh --version
```

#### Arch Linux
```bash
sudo pacman -S github-cli

# Verify
gh --version
```

---

## 2. Authentication Examples

### Basic Authentication

```bash
# Interactive authentication
gh auth login

# Follow prompts:
# ? Where do you use GitHub? → GitHub.com
# ? What is your preferred protocol? → HTTPS
# ? How would you like to authenticate? → Login with a web browser
# Copy the one-time code, press Enter, complete in browser
```

### Authentication with Specific Scopes

```bash
# Authenticate with specific permissions
gh auth login --scopes repo,read:org,workflow

# Refresh token with additional scopes
gh auth refresh -s repo,read:org,workflow,admin:public_key
```

### Token Authentication

```bash
# Authenticate using personal access token
gh auth login --with-token < token.txt

# Or interactively
gh auth login
# Choose: "Paste an authentication token"
# Paste your token
```

### GitHub Enterprise Authentication

```bash
# Authenticate with GitHub Enterprise Server
gh auth login --hostname github.enterprise.com

# Follow same prompts as GitHub.com
```

### Multiple Account Authentication

```bash
# Login to different hosts
gh auth login --hostname github.com
gh auth login --hostname github.enterprise.com

# Check all authenticated accounts
gh auth status

# Switch between accounts (use --hostname flag)
gh repo list --hostname github.enterprise.com
```

---

## 3. Repository Commands

### Listing Repositories

```bash
# List your repositories (30 most recent)
gh repo list

# List specific number
gh repo list --limit 100

# List organization repositories
gh repo list ORGANIZATION --limit 50

# List with specific sorting
gh repo list --sort updated        # Recently updated
gh repo list --sort created        # Recently created
gh repo list --sort pushed         # Recently pushed
gh repo list --sort full_name      # Alphabetical

# Filter by visibility
gh repo list --public              # Public repos only
gh repo list --private             # Private repos only

# Filter by language
gh repo list --language JavaScript
gh repo list --language Python
gh repo list --language TypeScript

# Get JSON output for processing
gh repo list --json name,description,url,isPrivate,primaryLanguage,updatedAt

# Format JSON output
gh repo list --json name,isPrivate --jq '.[] | select(.isPrivate == true) | .name'
```

### Viewing Repository Details

```bash
# View repository README
gh repo view OWNER/REPO

# View in web browser
gh repo view OWNER/REPO --web

# Get specific information as JSON
gh repo view OWNER/REPO --json name,description,languages,stargazerCount

# View repository README from specific branch
gh repo view OWNER/REPO --branch develop
```

### Cloning Repositories

```bash
# Clone repository
gh repo clone OWNER/REPO

# Clone to specific directory
gh repo clone OWNER/REPO ~/projects/my-repo

# Clone with Git flags
gh repo clone OWNER/REPO -- --depth=1                    # Shallow clone
gh repo clone OWNER/REPO -- --single-branch              # Single branch
gh repo clone OWNER/REPO -- --branch=develop             # Specific branch

# Clone all org repos (careful!)
gh repo list ORG --limit 1000 --json name -q '.[].name' | \
  xargs -I {} gh repo clone ORG/{}
```

### Creating Repositories

```bash
# Create new repository
gh repo create my-new-repo

# Create with options
gh repo create my-new-repo --public --description "My project"

# Create from current directory
gh repo create --source=. --public

# Create with README, .gitignore, license
gh repo create my-repo --public --add-readme --gitignore=Node --license=mit
```

### Forking Repositories

```bash
# Fork a repository
gh repo fork OWNER/REPO

# Fork and clone
gh repo fork OWNER/REPO --clone

# Fork to specific organization
gh repo fork OWNER/REPO --org MY-ORG
```

### Repository Information via API

```bash
# Get repository details
gh api repos/OWNER/REPO

# Get repository languages
gh api repos/OWNER/REPO/languages

# Get repository contributors
gh api repos/OWNER/REPO/contributors

# Get repository topics
gh api repos/OWNER/REPO/topics --jq '.names'

# Check if repo is archived
gh api repos/OWNER/REPO --jq '.archived'
```

---

## 4. AI Analysis Prompts

### Initial Exploration Prompts

#### Prompt 1: High-Level Overview
```
I'm new to this codebase. Please analyze it and provide:

1. **Project Purpose**
   - What does this application do? (1-2 sentences)
   - Who are the target users?
   - What business problem does it solve?

2. **Architecture Overview**
   - Is it a monolith, microservices, serverless, or other?
   - What are the main components?
   - How do components interact?
   - Create a simple Mermaid or text-based architecture diagram

3. **Tech Stack**
   - Primary language and version
   - Framework(s) used
   - Database/storage systems
   - External dependencies or services
   - Build and package management tools

4. **Entry Points**
   - Main application entry file
   - How does the application start?
   - Key configuration files
   - Required environment variables

Keep the analysis high-level. I'll ask follow-up questions for specifics.
```

#### Prompt 2: Directory Structure
```
Analyze the directory structure and explain:

1. List all top-level directories with their purposes
2. For the main source directory:
   - Where is business logic located?
   - Where are API routes/endpoints?
   - Where are data models/entities?
   - Where are utilities/helpers?
   - Where are tests?
   - Where are configuration files?
3. Any unusual or interesting organizational patterns?
4. Which 3-5 directories are most critical for understanding the system?

Provide specific file paths as examples.
```

#### Prompt 3: Code Patterns and Conventions
```
Identify the coding patterns and conventions used in this project:

1. **Architecture Patterns**
   - Design patterns (MVC, Repository, Factory, etc.)
   - Dependency injection approach
   - Error handling strategy
   - Logging patterns

2. **Code Style**
   - File naming conventions
   - Function/method naming patterns
   - Class/interface naming patterns
   - Variable naming conventions
   - Indentation and formatting

3. **Testing Patterns** (if tests exist)
   - Test file organization
   - Testing framework and tools
   - Mocking/stubbing approach
   - Test data management
   - Coverage strategy

Provide code examples for each pattern you identify.
```

---

### Testing-Specific Prompts

#### Prompt 4: Current Testing Analysis
```
I need to understand the current testing situation. Analyze and tell me:

1. **Existing Tests**
   - How many test files exist?
   - Where are they located?
   - What testing framework/library is used?
   - What types of tests? (unit/integration/e2e)
   - How do you run tests? (command)
   - Is there CI/CD integration for tests?

2. **Test Coverage**
   - Approximately what percentage is covered?
   - What functionality is well-tested?
   - What functionality is poorly tested or not tested?
   - Are there coverage reports available?

3. **Test Quality**
   - Are tests well-organized and consistent?
   - Are there good examples to follow?
   - Any test utilities or helpers?
   - Common patterns used in tests?

4. **Test Data Management**
   - How is test data handled?
   - Are there fixtures, factories, or seeders?
   - Mock data approach?

Provide specific file paths and code examples.
```

#### Prompt 5: Testing Gap Analysis
```
Identify testing gaps and opportunities:

1. **Critical Paths Without Tests**
   - What are the main user/API flows?
   - Which critical paths lack tests?
   - What core business logic is untested?
   - What API endpoints don't have tests?

2. **Edge Cases Not Covered**
   - Error handling not tested
   - Boundary conditions not checked
   - Invalid input scenarios missing
   - Authentication/authorization edge cases

3. **Integration Points Missing Tests**
   - Database interactions not tested
   - External API calls not mocked/tested
   - File system operations not tested
   - Third-party service integrations not tested

4. **Risk Assessment**
   - What's the risk level of each gap? (Critical/High/Medium/Low)
   - What could break without tests?
   - What's the potential user impact?

Organize findings by risk level (Critical → Low).
```

#### Prompt 6: Test Plan Generation
```
Based on the testing gaps identified, create a prioritized test plan:

**P0 - Critical Priority (Must Test Immediately)**
List 5-8 test scenarios that are:
- Highest risk if not tested
- Most likely to catch serious bugs
- Protect critical functionality

**P1 - High Priority (Should Test Soon)**
List 5-8 important test scenarios

**P2 - Medium Priority (Nice to Have)**
List 5-8 additional test scenarios

For each test scenario, provide:
- Test name/description
- What functionality it tests
- Why it's important
- Test type (unit/integration/e2e)
- Estimated implementation effort (hours)
- Success criteria

Total estimated effort should be realistic (20-40 hours).
```

---

### Feature-Specific Prompts

#### Prompt 7: Find Feature Implementation
```
I need to find code related to [FEATURE NAME]. Please tell me:

1. Which files contain this functionality?
2. What are the key functions/methods?
3. What are the dependencies?
4. How does data flow through this feature?
5. Are there existing tests for this feature?
6. What would be the best approach to test this?

Provide file paths, function names, and code snippets.
```

#### Prompt 8: Data Flow Analysis
```
Trace the data flow for [SPECIFIC ACTION/FEATURE]:

1. Where does the data enter the system?
   (API endpoint, form submission, message queue, etc.)

2. What validations are performed?
   (Input validation, business rules, etc.)

3. What transformations occur?
   (Data mapping, calculations, formatting, etc.)

4. Where is it stored?
   (Database tables, cache, file system, etc.)

5. What happens after storage?
   (Notifications, webhooks, async jobs, etc.)

6. What could go wrong at each step?
   (Error scenarios to test)

Create a sequence diagram or numbered flow showing the complete path.
```

#### Prompt 9: Dependency Analysis
```
Analyze the project dependencies:

1. **Direct Dependencies**
   - List the 10-15 most important dependencies
   - Explain the purpose of each
   - Identify security-sensitive packages

2. **Testing Dependencies**
   - What testing frameworks are included?
   - What mocking libraries?
   - What assertion libraries?
   - Any test runners or utilities?

3. **Development Tools**
   - Linting tools (ESLint, Pylint, etc.)
   - Formatting tools (Prettier, Black, etc.)
   - Type checking (TypeScript, mypy, etc.)
   - Build tools

4. **Version Status**
   - Are dependencies up to date?
   - Any deprecated packages?
   - Any known security vulnerabilities?

Check package.json, requirements.txt, pom.xml, or equivalent.
```

---

### Documentation Generation Prompts

#### Prompt 10: CLAUDE.md Creation
```
Based on the repository analysis, help me create a comprehensive CLAUDE.md file.

This file provides context for AI tools. Include:

1. **Project Overview**
   - Brief description (2-3 sentences)
   - Tech stack summary
   - Architecture type

2. **Directory Structure**
   - Key directories and their purposes
   - Where to find specific types of code

3. **Code Conventions**
   - File naming patterns
   - Function/class naming conventions
   - Code style (indentation, quotes, etc.)
   - Import organization

4. **Testing Guidelines**
   - Testing framework and tools
   - Where tests should be located
   - Test naming conventions
   - How to run tests
   - Coverage requirements

5. **Testing Patterns**
   - Test file structure template
   - Mock/stub approach
   - Test data management
   - Assertion style

6. **Commands**
   - Install dependencies
   - Run all tests
   - Run specific tests
   - Check coverage
   - Lint/format code
   - Build/start application

7. **AI-Specific Guidelines**
   - What to always include in generated code
   - What to avoid
   - Examples of good existing code (file paths)

Make it concise but comprehensive. Focus on information that helps AI generate better code.
```

---

## 5. CLAUDE.md Templates

### Template 1: Node.js/Express API

```markdown
# [Project Name] - AI Context

## Project Overview

[Project Name] is a RESTful API service built with Node.js and Express that handles [business domain].

**Type:** RESTful API
**Primary Language:** JavaScript (Node.js 18+)
**Framework:** Express 4.18

## Tech Stack

### Backend
- Runtime: Node.js 18.x
- Framework: Express 4.18
- Database: PostgreSQL 14 with Sequelize ORM
- Authentication: JWT with bcrypt
- Validation: Joi

### Testing
- Framework: Jest 29
- API Testing: Supertest
- Mocking: jest.mock()
- Coverage: Jest built-in (nyc)
- Test Runner: `npm test`

### Development Tools
- Linter: ESLint (Airbnb config)
- Formatter: Prettier
- Type Checking: JSDoc comments

## Architecture

RESTful API following MVC pattern with service layer.

**Layers:**
1. **Routes** (`/routes`) - HTTP routing and request validation
2. **Controllers** (`/controllers`) - Request handling and response formatting
3. **Services** (`/services`) - Business logic
4. **Models** (`/models`) - Data models (Sequelize)
5. **Middleware** (`/middleware`) - Authentication, error handling, logging

## Directory Structure

```
/src
  /routes          # Express route definitions
  /controllers     # Request handlers
  /services        # Business logic
  /models          # Sequelize models
  /middleware      # Express middleware
  /utils           # Helper functions
  /validators      # Joi schemas
/tests
  /unit            # Unit tests
  /integration     # API integration tests
  /fixtures        # Test data
/config            # Configuration files
```

## Code Conventions

### File Naming
- Source files: `camelCase.js`
- Test files: `camelCase.test.js`
- Constants: `UPPER_SNAKE_CASE.js`

### Code Style
- Indentation: 2 spaces
- Line Length: 100 characters
- Quotes: Single quotes
- Semicolons: Required
- Trailing Commas: Yes (ES5 compatible)

### Naming Conventions
- Functions: `camelCase`, verb-based (e.g., `getUserById`)
- Classes: `PascalCase`, noun-based (e.g., `UserService`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`)
- Private: `_prefixed` (e.g., `_internalHelper`)

### Import Style
```javascript
// External dependencies first
const express = require('express');
const jwt = require('jsonwebtoken');

// Internal modules second
const UserService = require('../services/userService');
const { validateUser } = require('../validators/userValidator');

// Constants last
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');
```

## Testing Guidelines

### Test File Organization
- **Location:** Mirror source structure in `/tests` directory
- **Naming:** `[filename].test.js`

**Example:**
```
For: src/services/userService.js
Test: tests/unit/services/userService.test.js
```

### Test Structure
```javascript
const UserService = require('../../../src/services/userService');

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    // Setup
    userService = new UserService();
  });

  afterEach(() => {
    // Cleanup
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('should return user when user exists', async () => {
      // Arrange
      const userId = '123';
      const expectedUser = { id: userId, name: 'John' };

      // Act
      const result = await userService.getUserById(userId);

      // Assert
      expect(result).toEqual(expectedUser);
    });

    it('should throw NotFoundError when user does not exist', async () => {
      // Arrange
      const userId = 'nonexistent';

      // Act & Assert
      await expect(userService.getUserById(userId))
        .rejects
        .toThrow('User not found');
    });
  });
});
```

### Test Naming
- Pattern: `should [expected behavior] when [condition]`
- Examples:
  - `should return 200 when user exists`
  - `should return 404 when user not found`
  - `should return 400 when email is invalid`

### Mocking
```javascript
// Mock external dependencies
jest.mock('../../../src/models/user');
const UserModel = require('../../../src/models/user');

// Setup mock implementation
UserModel.findByPk.mockResolvedValue({ id: '123', name: 'John' });
```

### Coverage Requirements
- **Minimum Coverage:** 80%
- **Critical Code:** 95%
- **Focus:** Services, controllers, middleware

## Commands

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- userService.test.js

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Start development server
npm run dev

# Start production server
npm start
```

## Critical Testing Areas

**Must test:**
1. Authentication and authorization
2. Input validation
3. Error handling
4. Database operations
5. API endpoints

**Focus on:**
- Happy path for all API endpoints
- Error cases (400, 401, 403, 404, 500)
- Edge cases (empty strings, null, undefined)
- Boundary conditions

## Common Patterns

### Error Handling
```javascript
// Standard error handling
try {
  const result = await someOperation();
  return result;
} catch (error) {
  logger.error('Operation failed', { error });
  throw new AppError('Operation failed', 500);
}
```

### Async Operations
```javascript
// Always use async/await, not callbacks
async function getUserData(userId) {
  const user = await UserModel.findByPk(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  return user;
}
```

### Database Mocking
```javascript
// Mock Sequelize models
jest.mock('../../../src/models/user');
UserModel.findByPk.mockResolvedValue(mockUser);
UserModel.create.mockResolvedValue(mockUser);
```

## Examples of Good Tests

**Reference these:**
- `tests/unit/services/authService.test.js` - Good mocking patterns
- `tests/integration/routes/users.test.js` - API testing example
- `tests/unit/middleware/authMiddleware.test.js` - Middleware testing

## AI Test Generation Guidelines

### Always Include
- Proper require() statements
- describe/it blocks with clear names
- beforeEach/afterEach for setup/teardown
- Arrange-Act-Assert structure
- Happy path AND error cases
- Mock external dependencies
- Clear assertions with expect()

### Never Include
- Hardcoded credentials or secrets
- Real database connections (use mocks)
- Real API calls (use mocks)
- console.log statements
- Commented-out code
- TODO comments

### Test Coverage Priorities
1. **P0 (Critical):** Authentication, authorization, payment processing
2. **P1 (High):** Core business logic, API endpoints
3. **P2 (Medium):** Utilities, helpers, edge cases

## Dependencies

### Critical Dependencies
- `express@4.18.x` - Web framework
- `sequelize@6.x` - ORM
- `jsonwebtoken@9.x` - JWT authentication
- `bcrypt@5.x` - Password hashing

### Testing Dependencies
- `jest@29.x` - Testing framework
- `supertest@6.x` - HTTP testing
- `@faker-js/faker@8.x` - Test data generation

## Known Issues / Gotchas

1. **Database Transactions:** Always rollback in test afterEach
2. **JWT Tokens:** Use short expiry in tests (5 minutes)
3. **bcrypt:** Use low rounds in tests for speed (bcrypt.hashSync(pass, 1))

## Questions?

Contact: qa-team@company.com
Documentation: https://docs.internal.com/api-service
```

---

### Template 2: Python/Django Application

```markdown
# [Project Name] - AI Context

## Project Overview

[Project Name] is a web application built with Django that provides [functionality description].

**Type:** Web Application
**Primary Language:** Python 3.11
**Framework:** Django 4.2

## Tech Stack

### Backend
- Language: Python 3.11
- Framework: Django 4.2
- Database: PostgreSQL 15
- ORM: Django ORM
- API: Django REST Framework 3.14
- Async: Celery with Redis

### Testing
- Framework: pytest 7.x with pytest-django
- Coverage: pytest-cov
- Fixtures: pytest fixtures + factory_boy
- Mocking: unittest.mock / pytest-mock
- Test Runner: `pytest`

### Development Tools
- Linter: flake8
- Formatter: black
- Type Checking: mypy
- Import Sorting: isort

## Architecture

Django MTV (Model-Template-View) pattern with REST API layer.

**Layers:**
1. **Models** (`models.py`) - Data models
2. **Views** (`views.py`) - Business logic and API endpoints
3. **Serializers** (`serializers.py`) - Data serialization/validation
4. **Services** (`services/`) - Complex business logic
5. **Templates** (`templates/`) - HTML templates (if used)

## Directory Structure

```
/project_name
  /apps
    /users          # User management app
    /api            # API endpoints
    /core           # Core functionality
  /config           # Django settings
  /static           # Static files
  /templates        # HTML templates
/tests
  /unit             # Unit tests
  /integration      # Integration tests
  /factories        # Test factories
```

## Code Conventions

### File Naming
- Python files: `snake_case.py`
- Test files: `test_snake_case.py`
- Config files: `snake_case.py`

### Code Style
- Indentation: 4 spaces
- Line Length: 88 characters (black default)
- Quotes: Double quotes (enforced by black)
- Docstrings: Google style

### Naming Conventions
- Functions: `snake_case`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Private: `_leading_underscore`

### Import Style
```python
# Standard library imports
import os
from datetime import datetime

# Third-party imports
from django.db import models
from rest_framework import serializers

# Local application imports
from apps.users.models import User
from apps.core.services import NotificationService
```

## Testing Guidelines

### Test File Organization
- **Location:** `/tests` directory, mirroring app structure
- **Naming:** `test_[module_name].py`

**Example:**
```
For: apps/users/services/user_service.py
Test: tests/unit/users/services/test_user_service.py
```

### Test Structure
```python
import pytest
from apps.users.services import UserService
from tests.factories import UserFactory


class TestUserService:
    """Test suite for UserService."""

    @pytest.fixture
    def user_service(self):
        """Create UserService instance for testing."""
        return UserService()

    def test_get_user_by_id_returns_user_when_exists(
        self, user_service, db
    ):
        """Test getting user by ID when user exists."""
        # Arrange
        user = UserFactory.create()

        # Act
        result = user_service.get_user_by_id(user.id)

        # Assert
        assert result is not None
        assert result.id == user.id
        assert result.email == user.email

    def test_get_user_by_id_raises_error_when_not_exists(
        self, user_service, db
    ):
        """Test getting user by ID when user does not exist."""
        # Arrange
        nonexistent_id = 99999

        # Act & Assert
        with pytest.raises(User.DoesNotExist):
            user_service.get_user_by_id(nonexistent_id)
```

### Test Naming
- Pattern: `test_[method]_[expected]_when_[condition]`
- Use descriptive names, not abbreviated
- Examples:
  - `test_create_user_returns_user_when_valid_data`
  - `test_create_user_raises_error_when_invalid_email`

### Fixtures and Factories
```python
# Use factory_boy for test data
from factory import django, Faker

class UserFactory(django.DjangoModelFactory):
    class Meta:
        model = User

    email = Faker('email')
    username = Faker('user_name')
    first_name = Faker('first_name')
    last_name = Faker('last_name')

# Use in tests
user = UserFactory.create()
users = UserFactory.create_batch(5)
```

### Mocking
```python
from unittest.mock import patch, MagicMock

def test_send_email_calls_email_service(user_service):
    """Test that send_email calls email service."""
    # Arrange
    with patch('apps.core.services.EmailService.send') as mock_send:
        user = UserFactory.build()

        # Act
        user_service.send_welcome_email(user)

        # Assert
        mock_send.assert_called_once()
        assert mock_send.call_args[0][0] == user.email
```

### Coverage Requirements
- **Minimum Coverage:** 85%
- **Critical Code:** 95%
- **Focus:** Models, views, services, serializers

## Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Run all tests
pytest

# Run with coverage
pytest --cov=apps --cov-report=html

# Run specific test file
pytest tests/unit/users/test_user_service.py

# Run specific test
pytest tests/unit/users/test_user_service.py::TestUserService::test_get_user_by_id

# Run tests matching pattern
pytest -k "test_user"

# Run with verbose output
pytest -v

# Run linter
flake8 .

# Format code
black .

# Sort imports
isort .

# Type check
mypy apps/

# Run Django migrations
python manage.py migrate

# Start development server
python manage.py runserver

# Create superuser
python manage.py createsuperuser
```

## Critical Testing Areas

**Must test:**
1. Models (validation, methods, relationships)
2. Views/API endpoints
3. Serializers
4. Business logic in services
5. Authentication and permissions

**Focus on:**
- Model validation and constraints
- API endpoint responses (status codes, data)
- Error handling
- Permissions and authorization
- Database transactions

## Common Patterns

### Error Handling
```python
from django.core.exceptions import ValidationError

def validate_user_data(data):
    """Validate user data."""
    if not data.get('email'):
        raise ValidationError('Email is required')
    return True
```

### Database Operations
```python
from django.db import transaction

@transaction.atomic
def create_user_with_profile(user_data, profile_data):
    """Create user and profile in a transaction."""
    user = User.objects.create(**user_data)
    profile = Profile.objects.create(user=user, **profile_data)
    return user
```

### Testing Django Views
```python
from django.test import Client
import pytest

@pytest.mark.django_db
class TestUserAPI:
    def test_get_user_returns_200_when_authenticated(self):
        client = Client()
        user = UserFactory.create()
        client.force_login(user)

        response = client.get(f'/api/users/{user.id}/')

        assert response.status_code == 200
        assert response.json()['id'] == user.id
```

## Examples of Good Tests

**Reference these:**
- `tests/unit/users/test_user_model.py` - Model testing
- `tests/integration/api/test_user_api.py` - API testing
- `tests/unit/services/test_notification_service.py` - Service testing with mocks

## AI Test Generation Guidelines

### Always Include
- Import statements (pytest, factories, models)
- Test class with descriptive docstring
- Fixtures for setup
- `@pytest.mark.django_db` for database access
- Arrange-Act-Assert comments
- Descriptive test names
- Both success and error cases
- Type hints where appropriate

### Never Include
- Hardcoded credentials
- Real database operations without `@pytest.mark.django_db`
- Real external API calls (use mocks)
- print() statements
- Commented-out code

### Test Coverage Priorities
1. **P0:** Authentication, payment, data integrity
2. **P1:** Core business logic, API endpoints
3. **P2:** Utilities, formatting, edge cases

## Dependencies

### Critical Dependencies
- `django==4.2.x` - Web framework
- `djangorestframework==3.14.x` - API framework
- `psycopg2-binary==2.9.x` - PostgreSQL adapter
- `celery==5.3.x` - Task queue

### Testing Dependencies
- `pytest==7.4.x` - Testing framework
- `pytest-django==4.5.x` - Django testing integration
- `pytest-cov==4.1.x` - Coverage
- `factory-boy==3.3.x` - Test data factories
- `faker==19.x` - Fake data generation

## Known Issues / Gotchas

1. **Database Isolation:** Use `@pytest.mark.django_db` for database access
2. **Transactions:** Use `transaction_on` fixture if testing transactions
3. **Static Files:** Run `collectstatic` before deployment testing
4. **Celery Tasks:** Use `celery.task.eager` in tests

## Questions?

Contact: dev-team@company.com
Documentation: https://wiki.internal.com/django-app
```

---

### Template 3: React/TypeScript Frontend

```markdown
# [Project Name] - AI Context

## Project Overview

[Project Name] is a single-page application built with React and TypeScript that provides [functionality].

**Type:** Single Page Application
**Primary Language:** TypeScript 5.0
**Framework:** React 18

## Tech Stack

### Frontend
- Language: TypeScript 5.0
- Framework: React 18.2
- State Management: Redux Toolkit
- Routing: React Router 6
- UI Library: Material-UI (MUI) 5
- HTTP Client: Axios

### Testing
- Framework: Jest 29 with React Testing Library
- E2E: Playwright
- Coverage: Jest built-in
- Test Runner: `npm test`

### Development Tools
- Linter: ESLint with TypeScript rules
- Formatter: Prettier
- Type Checking: TypeScript compiler (tsc)
- Build: Vite 4

## Architecture

React component-based architecture with Redux for state management.

**Structure:**
1. **Components** - Reusable UI components
2. **Pages** - Route-level components
3. **Redux Slices** - State management
4. **Services** - API calls
5. **Hooks** - Custom React hooks
6. **Utils** - Helper functions

## Directory Structure

```
/src
  /components       # Reusable components
    /common         # Shared components
    /features       # Feature-specific components
  /pages            # Page components
  /redux            # Redux slices and store
  /services         # API service layer
  /hooks            # Custom hooks
  /utils            # Utility functions
  /types            # TypeScript type definitions
  /constants        # Constants and enums
/tests
  /unit             # Unit tests
  /integration      # Integration tests
  /e2e              # E2E tests
```

## Code Conventions

### File Naming
- Components: `PascalCase.tsx`
- Hooks: `use[Name].ts`
- Services: `camelCase.service.ts`
- Utils: `camelCase.util.ts`
- Types: `PascalCase.types.ts`
- Tests: `[filename].test.tsx`

### Code Style
- Indentation: 2 spaces
- Line Length: 100 characters
- Quotes: Single quotes
- Semicolons: Required
- Arrow Functions: Preferred

### Naming Conventions
- Components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/Interfaces: `PascalCase`
- Props Interfaces: `[ComponentName]Props`

### Import Style
```typescript
// React imports first
import React, { useState, useEffect } from 'react';

// Third-party imports
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// Internal imports (absolute paths)
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { UserService } from '@/services/user.service';

// Types
import type { User } from '@/types/User.types';
```

## Testing Guidelines

### Test File Organization
- **Location:** Next to component or in `/tests` directory
- **Naming:** `[ComponentName].test.tsx`

**Example:**
```
For: src/components/common/Button.tsx
Test: src/components/common/Button.test.tsx
OR
Test: tests/unit/components/common/Button.test.tsx
```

### Test Structure
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render with provided text', () => {
    // Arrange
    const buttonText = 'Click Me';

    // Act
    render(<Button>{buttonText}</Button>);

    // Assert
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    // Arrange
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    // Act
    fireEvent.click(screen.getByText('Click'));

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    // Arrange & Act
    render(<Button disabled>Click</Button>);

    // Assert
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Test Naming
- Pattern: `should [expected behavior] when [condition]`
- Examples:
  - `should display loading spinner when loading is true`
  - `should call API when form is submitted`
  - `should show error message when validation fails`

### Testing React Components
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

// Wrapper for components needing Redux
const renderWithRedux = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

it('should update state when user types in input', async () => {
  const user = userEvent.setup();
  render(<SearchInput />);

  const input = screen.getByRole('textbox');
  await user.type(input, 'search term');

  expect(input).toHaveValue('search term');
});
```

### Mocking
```typescript
// Mock services
jest.mock('@/services/user.service');
const mockUserService = UserService as jest.Mocked<typeof UserService>;

// Mock hooks
jest.mock('@/hooks/useAuth');
const mockUseAuth = useAuth as jest.Mock;

mockUseAuth.mockReturnValue({
  user: { id: '1', name: 'John' },
  isAuthenticated: true,
});

// Mock API calls
mockUserService.getUser.mockResolvedValue({
  id: '1',
  name: 'John',
});
```

### Coverage Requirements
- **Minimum Coverage:** 80%
- **Components:** 85%
- **Hooks:** 90%
- **Services:** 95%

## Commands

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- Button.test.tsx

# Run E2E tests
npm run test:e2e

# Type check
npm run type-check

# Lint
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Critical Testing Areas

**Must test:**
1. User interactions (clicks, form input)
2. State changes
3. API calls and loading states
4. Error handling and display
5. Conditional rendering

**Focus on:**
- Component rendering
- User event handling
- Form validation
- API integration
- Error boundaries

## Common Patterns

### Component Testing
```typescript
describe('LoginForm', () => {
  it('should submit form with valid credentials', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();

    render(<LoginForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

### Async Testing
```typescript
it('should load and display user data', async () => {
  mockUserService.getUser.mockResolvedValue({ name: 'John' });

  render(<UserProfile userId="1" />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```

### Redux Testing
```typescript
import { renderWithProviders } from '@/test-utils';

it('should dispatch action when button clicked', async () => {
  const user = userEvent.setup();
  const { store } = renderWithProviders(<Counter />);

  await user.click(screen.getByText('Increment'));

  expect(store.getState().counter.value).toBe(1);
});
```

## Examples of Good Tests

**Reference these:**
- `src/components/common/Button/Button.test.tsx` - Component testing
- `src/hooks/useAuth/useAuth.test.ts` - Hook testing
- `src/services/user.service.test.ts` - Service testing
- `tests/e2e/login.spec.ts` - E2E testing

## AI Test Generation Guidelines

### Always Include
- Proper imports from @testing-library/react
- describe/it blocks
- Arrange-Act-Assert comments
- Type annotations
- Both happy path and error cases
- Proper cleanup
- Accessibility queries (getByRole, getByLabelText)

### Never Include
- console.log statements
- Commented-out code
- Real API calls (use mocks)
- Hardcoded test data that should be dynamic

### Test Coverage Priorities
1. **P0:** Authentication, payment, data submission
2. **P1:** Core features, navigation, forms
3. **P2:** UI interactions, animations, edge cases

## Dependencies

### Critical Dependencies
- `react@18.2.x` - UI library
- `react-dom@18.2.x` - DOM renderer
- `react-router-dom@6.x` - Routing
- `@reduxjs/toolkit@1.9.x` - State management
- `axios@1.5.x` - HTTP client

### Testing Dependencies
- `@testing-library/react@14.x` - React testing utilities
- `@testing-library/jest-dom@6.x` - Custom matchers
- `@testing-library/user-event@14.x` - User interaction simulation
- `jest@29.x` - Test framework
- `@playwright/test@1.x` - E2E testing

## Known Issues / Gotchas

1. **Async Updates:** Always use `waitFor` for async state updates
2. **User Events:** Prefer `userEvent` over `fireEvent`
3. **Query Priority:** Use accessible queries (getByRole, getByLabelText)
4. **Clean Up:** React Testing Library handles cleanup automatically

## Questions?

Contact: frontend-team@company.com
Documentation: https://docs.internal.com/react-app
```

---

## 6. Security Configurations

### Token Permissions

```bash
# View current token scopes
gh auth status -t

# Refresh token with minimal required scopes
gh auth refresh -s repo

# Add organization read access
gh auth refresh -s repo,read:org

# Add workflow management
gh auth refresh -s repo,read:org,workflow

# Add public key management (for SSH)
gh auth refresh -s repo,read:org,admin:public_key
```

### Token Management Best Practices

```bash
# List all authenticated hosts
gh auth status

# Logout from specific host
gh auth logout --hostname github.com

# Check token expiration (not directly supported, but check via API)
gh api /user | jq '.updated_at'

# Revoke token via web
# Visit: https://github.com/settings/tokens
# Find token → Click "Delete"
```

### Secure Token Storage Verification

```bash
# Windows: Check Credential Manager
cmdkey /list | findstr github

# macOS: Check Keychain
security find-internet-password -s github.com

# Linux: Check gh config (should not show token in plain text)
cat ~/.config/gh/hosts.yml  # Token should be encrypted or reference credential helper
```

---

## 7. Troubleshooting Scripts

### Diagnostic Script

Save as `gh-diagnostic.sh` (Linux/Mac) or `gh-diagnostic.ps1` (Windows):

#### Linux/Mac Version:
```bash
#!/bin/bash

echo "===== GitHub CLI Diagnostic ====="
echo ""

echo "1. GitHub CLI Version:"
gh --version
echo ""

echo "2. Authentication Status:"
gh auth status
echo ""

echo "3. API Rate Limit:"
gh api rate_limit --jq '.rate'
echo ""

echo "4. User Information:"
gh api user --jq '{login, name, email, company}'
echo ""

echo "5. Organizations:"
gh api user/orgs --jq '.[].login'
echo ""

echo "6. Repository Access Test (first 5 repos):"
gh repo list --limit 5
echo ""

echo "7. Token Scopes:"
gh auth status -t 2>&1 | grep "Token scopes"
echo ""

echo "===== Diagnostic Complete ====="
```

#### Windows PowerShell Version:
```powershell
Write-Host "===== GitHub CLI Diagnostic =====" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. GitHub CLI Version:" -ForegroundColor Yellow
gh --version
Write-Host ""

Write-Host "2. Authentication Status:" -ForegroundColor Yellow
gh auth status
Write-Host ""

Write-Host "3. API Rate Limit:" -ForegroundColor Yellow
gh api rate_limit --jq '.rate'
Write-Host ""

Write-Host "4. User Information:" -ForegroundColor Yellow
gh api user --jq '{login, name, email, company}'
Write-Host ""

Write-Host "5. Organizations:" -ForegroundColor Yellow
gh api user/orgs --jq '.[].login'
Write-Host ""

Write-Host "6. Repository Access Test (first 5 repos):" -ForegroundColor Yellow
gh repo list --limit 5
Write-Host ""

Write-Host "7. Token Scopes:" -ForegroundColor Yellow
gh auth status -t 2>&1 | Select-String "Token scopes"
Write-Host ""

Write-Host "===== Diagnostic Complete =====" -ForegroundColor Cyan
```

### Quick Fix Script

```bash
#!/bin/bash

echo "GitHub CLI Quick Fix Script"
echo "==========================="
echo ""

echo "Step 1: Logout and clear credentials"
gh auth logout --hostname github.com
echo "✓ Logged out"
echo ""

echo "Step 2: Re-authenticate with required scopes"
echo "Please follow the prompts..."
gh auth login --scopes repo,read:org,workflow
echo ""

echo "Step 3: Verify authentication"
gh auth status
echo ""

echo "Step 4: Test repository access"
gh repo list --limit 3
echo ""

echo "==========================="
echo "Quick fix complete!"
echo "If issues persist, run the diagnostic script."
```

### Repository Analysis Script

```bash
#!/bin/bash

# Usage: ./analyze-repo.sh OWNER/REPO

if [ -z "$1" ]; then
  echo "Usage: $0 OWNER/REPO"
  exit 1
fi

REPO=$1

echo "Analyzing repository: $REPO"
echo "================================"
echo ""

echo "Basic Information:"
gh repo view $REPO --json name,description,isPrivate,primaryLanguage,stargazerCount,forkCount --jq '.'
echo ""

echo "Languages:"
gh api repos/$REPO/languages --jq 'to_entries | map({language: .key, bytes: .value}) | sort_by(.bytes) | reverse'
echo ""

echo "Recent Commits (last 10):"
gh api repos/$REPO/commits --jq '.[:10] | .[] | {sha: .sha[0:7], message: .commit.message, author: .commit.author.name, date: .commit.author.date}'
echo ""

echo "Open Issues Count:"
gh api repos/$REPO/issues --jq 'length'
echo ""

echo "Open Pull Requests:"
gh pr list --repo $REPO --limit 5
echo ""

echo "================================"
echo "Analysis complete!"
```

---

## Additional Examples

### Batch Operations

```bash
# Clone all repos from an organization
gh repo list MY-ORG --limit 1000 --json name --jq '.[].name' | while read repo; do
  gh repo clone MY-ORG/$repo
done

# List all private repos
gh repo list --json name,isPrivate --jq '.[] | select(.isPrivate == true) | .name'

# Find repos by language
gh repo list MY-ORG --json name,primaryLanguage --jq '.[] | select(.primaryLanguage == "JavaScript") | .name'

# Find repos updated in last 30 days
gh repo list MY-ORG --json name,updatedAt --jq '.[] | select(.updatedAt > (now - 30*24*3600 | todate)) | .name'
```

### API Examples

```bash
# Get repository contributors
gh api repos/OWNER/REPO/contributors --jq '.[] | {login, contributions}'

# Get repository topics/tags
gh api repos/OWNER/REPO/topics --jq '.names'

# Check if repo is archived
gh api repos/OWNER/REPO --jq '.archived'

# Get repository size
gh api repos/OWNER/REPO --jq '.size'

# List repository branches
gh api repos/OWNER/REPO/branches --jq '.[].name'

# Get branch protection rules
gh api repos/OWNER/REPO/branches/main/protection --jq '.'
```

---

**End of Code Examples**

These examples provide a comprehensive reference for working with GitHub CLI, AI analysis, and creating effective documentation. Use them as templates and adapt to your specific needs.

---

*Module 03 Code Examples - Version 1.0*
*MentorMate QA Automation Course (AI-Enhanced)*
*Last Updated: November 2025*
