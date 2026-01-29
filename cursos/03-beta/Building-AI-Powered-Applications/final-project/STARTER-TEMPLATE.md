# Final Project Starter Template

Use this template to jumpstart your project structure.

---

## Project Structure

```
my-ai-project/
├── README.md
├── requirements.txt
├── .env.example
├── .gitignore
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── config.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── ai_service.py
│   │   └── cache_service.py
│   └── models/
│       ├── __init__.py
│       └── schemas.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── unit/
│   │   └── test_ai_service.py
│   └── integration/
│       └── test_api.py
└── docs/
    ├── architecture.md
    └── api.md
```

---

## Starter Files

### requirements.txt

```txt
fastapi>=0.104.0
uvicorn>=0.24.0
python-dotenv>=1.0.0
openai>=1.3.0
langchain>=0.1.0
langchain-openai>=0.0.5
chromadb>=0.4.0
redis>=5.0.0
pydantic>=2.5.0
httpx>=0.25.0
pytest>=7.4.0
pytest-asyncio>=0.21.0
pytest-cov>=4.1.0
```

---

### .env.example

```env
# API Keys
OPENAI_API_KEY=sk-your-key-here

# Application
APP_ENV=development
DEBUG=true
LOG_LEVEL=INFO

# Database
CHROMA_PERSIST_DIR=./data/chroma

# Cache (optional)
REDIS_URL=redis://localhost:6379

# Auth
API_KEY_SECRET=your-secret-key-here
```

---

### .gitignore

```gitignore
# Environment
.env
.venv/
venv/

# Python
__pycache__/
*.py[cod]
.pytest_cache/

# Data
data/
*.db

# IDE
.vscode/
.idea/

# Coverage
htmlcov/
.coverage
```

---

### app/config.py

```python
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings from environment variables."""

    # API Keys
    openai_api_key: str

    # Application
    app_env: str = "development"
    debug: bool = False
    log_level: str = "INFO"

    # Database
    chroma_persist_dir: str = "./data/chroma"

    # Cache
    redis_url: str | None = None

    # Auth
    api_key_secret: str

    class Config:
        env_file = ".env"


@lru_cache
def get_settings() -> Settings:
    return Settings()
```

---

### app/main.py

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.config import get_settings
from app.api.routes import router

settings = get_settings()

# Configure logging
logging.basicConfig(
    level=settings.log_level,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Create app
app = FastAPI(
    title="AI Application",
    description="Your AI-powered application",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router, prefix="/api/v1")


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "env": settings.app_env}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

### app/api/routes.py

```python
from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.security import APIKeyHeader

from app.config import get_settings, Settings
from app.models.schemas import QueryRequest, QueryResponse
from app.services.ai_service import AIService

router = APIRouter()
api_key_header = APIKeyHeader(name="X-API-Key")


def verify_api_key(
    api_key: str = Security(api_key_header),
    settings: Settings = Depends(get_settings)
) -> str:
    """Verify the API key."""
    if api_key != settings.api_key_secret:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return api_key


def get_ai_service() -> AIService:
    """Dependency to get AI service."""
    return AIService()


@router.post("/query", response_model=QueryResponse)
async def query(
    request: QueryRequest,
    api_key: str = Depends(verify_api_key),
    ai_service: AIService = Depends(get_ai_service)
):
    """
    Process a query through the AI system.

    - **query**: The user's question or request
    - **context**: Optional additional context
    """
    try:
        result = await ai_service.process_query(
            query=request.query,
            context=request.context
        )
        return QueryResponse(
            response=result.response,
            sources=result.sources,
            tokens_used=result.tokens_used
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

### app/models/schemas.py

```python
from pydantic import BaseModel, Field
from typing import Optional


class QueryRequest(BaseModel):
    """Request schema for queries."""
    query: str = Field(..., min_length=1, max_length=10000)
    context: Optional[str] = None

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "query": "What is machine learning?",
                    "context": None
                }
            ]
        }
    }


class Source(BaseModel):
    """Source document reference."""
    content: str
    metadata: dict = {}


class QueryResponse(BaseModel):
    """Response schema for queries."""
    response: str
    sources: list[Source] = []
    tokens_used: int = 0
```

---

### app/services/ai_service.py

```python
from dataclasses import dataclass
from openai import AsyncOpenAI
from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage

from app.config import get_settings


@dataclass
class QueryResult:
    """Result from AI query."""
    response: str
    sources: list
    tokens_used: int


class AIService:
    """Service for AI operations."""

    def __init__(self):
        settings = get_settings()
        self.client = AsyncOpenAI(api_key=settings.openai_api_key)
        self.llm = ChatOpenAI(
            model="gpt-3.5-turbo",
            temperature=0.7,
            openai_api_key=settings.openai_api_key
        )

    async def process_query(
        self,
        query: str,
        context: str | None = None
    ) -> QueryResult:
        """
        Process a query through the AI system.

        Args:
            query: The user's query
            context: Optional context to include

        Returns:
            QueryResult with response, sources, and token count
        """
        # Build the prompt
        prompt = query
        if context:
            prompt = f"Context: {context}\n\nQuestion: {query}"

        # Call the API
        response = await self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500
        )

        return QueryResult(
            response=response.choices[0].message.content,
            sources=[],  # Add RAG sources here
            tokens_used=response.usage.total_tokens
        )
```

---

### tests/conftest.py

```python
import pytest
from unittest.mock import MagicMock, AsyncMock


@pytest.fixture
def mock_openai_response():
    """Create a mock OpenAI response."""
    mock = MagicMock()
    mock.choices = [MagicMock(message=MagicMock(content="Test response"))]
    mock.usage = MagicMock(total_tokens=50)
    return mock


@pytest.fixture
def mock_settings():
    """Create mock settings."""
    settings = MagicMock()
    settings.openai_api_key = "test-key"
    settings.api_key_secret = "test-secret"
    return settings
```

---

### tests/unit/test_ai_service.py

```python
import pytest
from unittest.mock import AsyncMock, patch, MagicMock

from app.services.ai_service import AIService


class TestAIService:

    @pytest.mark.asyncio
    async def test_process_query_returns_response(self, mock_openai_response):
        """Test that process_query returns a response."""
        with patch('app.services.ai_service.get_settings') as mock_settings:
            mock_settings.return_value.openai_api_key = "test-key"

            service = AIService()

            with patch.object(
                service.client.chat.completions,
                'create',
                new_callable=AsyncMock,
                return_value=mock_openai_response
            ):
                result = await service.process_query("Test query")

                assert result.response == "Test response"
                assert result.tokens_used == 50
```

---

### Dockerfile (for deployment)

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY app/ ./app/

# Run
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## Next Steps

1. **Copy this structure** to your project directory
2. **Install dependencies**: `pip install -r requirements.txt`
3. **Create .env** from .env.example with your actual keys
4. **Run locally**: `uvicorn app.main:app --reload`
5. **Extend** with your chosen project features

---

## Quick Commands

```bash
# Run development server
uvicorn app.main:app --reload

# Run tests
pytest tests/ -v

# Run with coverage
pytest tests/ -v --cov=app --cov-report=term-missing

# Format code
black app/ tests/
ruff check app/ tests/

# Build Docker
docker build -t my-ai-app .

# Run Docker
docker run -p 8000:8000 --env-file .env my-ai-app
```
