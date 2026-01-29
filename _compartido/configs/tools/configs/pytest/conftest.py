"""
Pytest Configuration and Fixtures
Based on best practices from 50+ analyzed QA automation repositories

Features:
- Multi-environment support
- Playwright integration (UI & API)
- Page Object Model fixtures
- Database fixtures
- API client fixtures
- Test data factories
- Logging and reporting
"""

import os
import json
import logging
from pathlib import Path
from typing import Generator, Any

import pytest
from playwright.sync_api import (
    Playwright,
    Browser,
    BrowserContext,
    Page,
    APIRequestContext,
    sync_playwright
)

# =============================================================================
# Configuration
# =============================================================================

def pytest_addoption(parser):
    """Add custom command line options."""
    parser.addoption(
        "--env",
        action="store",
        default="dev",
        help="Environment to run tests against: dev, qa, staging, prod"
    )
    parser.addoption(
        "--browser",
        action="store",
        default="chromium",
        help="Browser to use: chromium, firefox, webkit"
    )
    parser.addoption(
        "--headed",
        action="store_true",
        default=False,
        help="Run tests in headed mode"
    )
    parser.addoption(
        "--slow-mo",
        action="store",
        default=0,
        type=int,
        help="Slow down Playwright operations by specified milliseconds"
    )


def pytest_configure(config):
    """Configure pytest with custom settings."""
    # Set up logging
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
    )

    # Load environment configuration
    env = config.getoption("--env")
    env_file = Path(f"environments/{env}.env")

    if env_file.exists():
        from dotenv import load_dotenv
        load_dotenv(env_file)
        logging.info(f"Loaded environment: {env}")


def pytest_collection_modifyitems(config, items):
    """Modify test collection based on markers."""
    # Skip slow tests unless explicitly requested
    if not config.getoption("--slow"):
        skip_slow = pytest.mark.skip(reason="Need --slow option to run")
        for item in items:
            if "slow" in item.keywords:
                item.add_marker(skip_slow)


# =============================================================================
# Environment Fixtures
# =============================================================================

@pytest.fixture(scope="session")
def env(request) -> str:
    """Get the current test environment."""
    return request.config.getoption("--env")


@pytest.fixture(scope="session")
def base_url(env: str) -> str:
    """Get the base URL for the current environment."""
    urls = {
        "dev": os.getenv("DEV_URL", "http://localhost:3000"),
        "qa": os.getenv("QA_URL", "https://qa.example.com"),
        "staging": os.getenv("STAGING_URL", "https://staging.example.com"),
        "prod": os.getenv("PROD_URL", "https://example.com"),
    }
    return urls.get(env, urls["dev"])


@pytest.fixture(scope="session")
def api_url(env: str) -> str:
    """Get the API URL for the current environment."""
    urls = {
        "dev": os.getenv("DEV_API_URL", "http://localhost:3000/api"),
        "qa": os.getenv("QA_API_URL", "https://qa.example.com/api"),
        "staging": os.getenv("STAGING_API_URL", "https://staging.example.com/api"),
        "prod": os.getenv("PROD_API_URL", "https://example.com/api"),
    }
    return urls.get(env, urls["dev"])


# =============================================================================
# Playwright Fixtures
# =============================================================================

@pytest.fixture(scope="session")
def playwright_instance() -> Generator[Playwright, None, None]:
    """Create Playwright instance for the session."""
    with sync_playwright() as playwright:
        yield playwright


@pytest.fixture(scope="session")
def browser(playwright_instance: Playwright, request) -> Generator[Browser, None, None]:
    """Launch browser for the session."""
    browser_name = request.config.getoption("--browser")
    headed = request.config.getoption("--headed")
    slow_mo = request.config.getoption("--slow-mo")

    browser_types = {
        "chromium": playwright_instance.chromium,
        "firefox": playwright_instance.firefox,
        "webkit": playwright_instance.webkit,
    }

    browser_type = browser_types.get(browser_name, playwright_instance.chromium)
    browser = browser_type.launch(
        headless=not headed,
        slow_mo=slow_mo
    )

    yield browser
    browser.close()


@pytest.fixture
def context(browser: Browser, base_url: str) -> Generator[BrowserContext, None, None]:
    """Create browser context for each test."""
    context = browser.new_context(
        base_url=base_url,
        viewport={"width": 1280, "height": 720},
        ignore_https_errors=True,
        record_video_dir="test-results/videos" if os.getenv("RECORD_VIDEO") else None
    )

    # Enable tracing for debugging
    if os.getenv("TRACE"):
        context.tracing.start(screenshots=True, snapshots=True, sources=True)

    yield context

    # Save trace on failure
    if os.getenv("TRACE"):
        context.tracing.stop(path="test-results/trace.zip")

    context.close()


@pytest.fixture
def page(context: BrowserContext) -> Generator[Page, None, None]:
    """Create page for each test."""
    page = context.new_page()

    # Set default timeouts
    page.set_default_timeout(30000)
    page.set_default_navigation_timeout(30000)

    yield page
    page.close()


# =============================================================================
# API Testing Fixtures
# =============================================================================

@pytest.fixture(scope="session")
def api_context(
    playwright_instance: Playwright,
    api_url: str
) -> Generator[APIRequestContext, None, None]:
    """Create API request context for the session."""
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    # Add authorization if available
    auth_token = os.getenv("API_TOKEN")
    if auth_token:
        headers["Authorization"] = f"Bearer {auth_token}"

    context = playwright_instance.request.new_context(
        base_url=api_url,
        extra_http_headers=headers
    )

    yield context
    context.dispose()


@pytest.fixture
def api_client(api_context: APIRequestContext):
    """Provide API client for each test."""
    return api_context


# =============================================================================
# Authentication Fixtures
# =============================================================================

@pytest.fixture(scope="session")
def test_user() -> dict:
    """Get test user credentials."""
    return {
        "email": os.getenv("TEST_USER_EMAIL", "test@example.com"),
        "password": os.getenv("TEST_USER_PASSWORD", "password123"),
        "username": os.getenv("TEST_USER_NAME", "testuser"),
    }


@pytest.fixture
def authenticated_context(
    browser: Browser,
    base_url: str,
    test_user: dict
) -> Generator[BrowserContext, None, None]:
    """Create authenticated browser context."""
    # Load saved authentication state if available
    auth_file = Path("test-results/.auth/state.json")

    if auth_file.exists():
        context = browser.new_context(
            storage_state=str(auth_file),
            base_url=base_url
        )
    else:
        # Perform login and save state
        context = browser.new_context(base_url=base_url)
        page = context.new_page()

        # Login flow - customize for your application
        page.goto("/login")
        page.fill('[data-testid="email"]', test_user["email"])
        page.fill('[data-testid="password"]', test_user["password"])
        page.click('[data-testid="submit"]')
        page.wait_for_url("**/dashboard**")

        # Save authentication state
        auth_file.parent.mkdir(parents=True, exist_ok=True)
        context.storage_state(path=str(auth_file))
        page.close()

    yield context
    context.close()


@pytest.fixture
def authenticated_page(authenticated_context: BrowserContext) -> Generator[Page, None, None]:
    """Create authenticated page for each test."""
    page = authenticated_context.new_page()
    yield page
    page.close()


# =============================================================================
# Test Data Fixtures
# =============================================================================

@pytest.fixture
def test_data() -> dict:
    """Provide common test data."""
    return {
        "valid_email": "test@example.com",
        "invalid_email": "invalid-email",
        "valid_password": "SecurePass123!",
        "weak_password": "123",
        "phone_number": "+1234567890",
        "address": {
            "street": "123 Test St",
            "city": "Test City",
            "zip": "12345",
            "country": "US"
        }
    }


@pytest.fixture
def unique_email() -> str:
    """Generate unique email for each test."""
    import uuid
    return f"test-{uuid.uuid4().hex[:8]}@example.com"


# =============================================================================
# Database Fixtures (Example with SQLite)
# =============================================================================

@pytest.fixture(scope="session")
def db_connection():
    """Create database connection for the session."""
    import sqlite3
    conn = sqlite3.connect(":memory:")
    yield conn
    conn.close()


@pytest.fixture
def db_session(db_connection):
    """Provide database session with rollback after each test."""
    cursor = db_connection.cursor()
    yield cursor
    db_connection.rollback()


# =============================================================================
# Reporting Fixtures
# =============================================================================

@pytest.fixture(autouse=True)
def test_info(request):
    """Log test information before and after each test."""
    test_name = request.node.name
    logging.info(f"Starting test: {test_name}")

    yield

    # Access test result
    if hasattr(request.node, "rep_call"):
        if request.node.rep_call.failed:
            logging.error(f"Test FAILED: {test_name}")
        else:
            logging.info(f"Test PASSED: {test_name}")


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """Store test result for later use."""
    outcome = yield
    rep = outcome.get_result()
    setattr(item, f"rep_{rep.when}", rep)


# =============================================================================
# Screenshot on Failure
# =============================================================================

@pytest.fixture(autouse=True)
def screenshot_on_failure(request, page):
    """Take screenshot on test failure."""
    yield

    if hasattr(request.node, "rep_call") and request.node.rep_call.failed:
        screenshot_dir = Path("test-results/screenshots")
        screenshot_dir.mkdir(parents=True, exist_ok=True)

        screenshot_path = screenshot_dir / f"{request.node.name}.png"
        page.screenshot(path=str(screenshot_path), full_page=True)
        logging.info(f"Screenshot saved: {screenshot_path}")


# =============================================================================
# Page Object Model Fixtures
# =============================================================================

# Example POM fixtures - uncomment and customize for your pages

# @pytest.fixture
# def login_page(page: Page):
#     """Provide LoginPage instance."""
#     from pages.login_page import LoginPage
#     return LoginPage(page)

# @pytest.fixture
# def dashboard_page(page: Page):
#     """Provide DashboardPage instance."""
#     from pages.dashboard_page import DashboardPage
#     return DashboardPage(page)

# @pytest.fixture
# def profile_page(page: Page):
#     """Provide ProfilePage instance."""
#     from pages.profile_page import ProfilePage
#     return ProfilePage(page)
