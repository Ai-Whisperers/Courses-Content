# Building AI-Powered Applications - Templates

> Starter templates for AI application components

---

## Project Structure Template

```
ai-application/
├── src/
│   ├── __init__.py
│   ├── config/
│   │   ├── __init__.py
│   │   └── settings.py          # Configuration management
│   ├── llm/
│   │   ├── __init__.py
│   │   ├── client.py            # LLM API client
│   │   ├── prompts.py           # Prompt templates
│   │   └── models.py            # Response models
│   ├── embeddings/
│   │   ├── __init__.py
│   │   ├── generator.py         # Embedding generation
│   │   └── storage.py           # Vector store interface
│   ├── rag/
│   │   ├── __init__.py
│   │   ├── chunker.py           # Document chunking
│   │   ├── retriever.py         # Retrieval logic
│   │   └── pipeline.py          # RAG pipeline
│   └── api/
│       ├── __init__.py
│       ├── routes.py            # API endpoints
│       └── middleware.py        # Rate limiting, auth
├── tests/
│   ├── __init__.py
│   ├── test_llm.py
│   ├── test_rag.py
│   └── conftest.py
├── .env.example
├── requirements.txt
├── Dockerfile
└── README.md
```

---

## LLM Client Template

```python
# src/llm/client.py
from abc import ABC, abstractmethod
from typing import List, Dict, Optional
import os
from openai import OpenAI
import anthropic

class LLMClient(ABC):
    """Abstract base class for LLM clients."""

    @abstractmethod
    def complete(self, messages: List[Dict], **kwargs) -> str:
        pass

    @abstractmethod
    def stream(self, messages: List[Dict], **kwargs):
        pass


class OpenAIClient(LLMClient):
    def __init__(self, model: str = "gpt-4"):
        self.client = OpenAI()
        self.model = model

    def complete(self, messages: List[Dict], **kwargs) -> str:
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            **kwargs
        )
        return response.choices[0].message.content

    def stream(self, messages: List[Dict], **kwargs):
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            stream=True,
            **kwargs
        )
        for chunk in response:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content


class ClaudeClient(LLMClient):
    def __init__(self, model: str = "claude-3-5-sonnet-20241022"):
        self.client = anthropic.Anthropic()
        self.model = model

    def complete(self, messages: List[Dict], **kwargs) -> str:
        response = self.client.messages.create(
            model=self.model,
            messages=messages,
            max_tokens=kwargs.get("max_tokens", 1024)
        )
        return response.content[0].text

    def stream(self, messages: List[Dict], **kwargs):
        with self.client.messages.stream(
            model=self.model,
            messages=messages,
            max_tokens=kwargs.get("max_tokens", 1024)
        ) as stream:
            for text in stream.text_stream:
                yield text
```

---

## Prompt Template System

```python
# src/llm/prompts.py
from typing import Dict, Any
from string import Template

class PromptTemplate:
    """Template for managing prompts with variable substitution."""

    def __init__(self, template: str, required_vars: list = None):
        self.template = Template(template)
        self.required_vars = required_vars or []

    def render(self, **kwargs) -> str:
        # Validate required variables
        missing = set(self.required_vars) - set(kwargs.keys())
        if missing:
            raise ValueError(f"Missing required variables: {missing}")
        return self.template.safe_substitute(**kwargs)


# Example prompts
PROMPTS = {
    "summarize": PromptTemplate(
        template="""Summarize the following text in $length:

Text: $text

Summary:""",
        required_vars=["text", "length"]
    ),

    "qa": PromptTemplate(
        template="""Answer the question based on the context below.

Context:
$context

Question: $question

Answer:""",
        required_vars=["context", "question"]
    ),

    "classify": PromptTemplate(
        template="""Classify the following text into one of these categories: $categories

Text: $text

Category:""",
        required_vars=["text", "categories"]
    )
}
```

---

## RAG Pipeline Template

```python
# src/rag/pipeline.py
from typing import List, Dict, Optional
from dataclasses import dataclass

@dataclass
class Document:
    id: str
    content: str
    metadata: Dict

@dataclass
class RetrievalResult:
    document: Document
    score: float


class RAGPipeline:
    def __init__(self, embedder, vector_store, llm_client):
        self.embedder = embedder
        self.vector_store = vector_store
        self.llm = llm_client

    def ingest(self, documents: List[Document], chunk_size: int = 500):
        """Ingest documents into the vector store."""
        for doc in documents:
            chunks = self._chunk_document(doc.content, chunk_size)
            for i, chunk in enumerate(chunks):
                embedding = self.embedder.embed(chunk)
                self.vector_store.upsert(
                    id=f"{doc.id}_{i}",
                    vector=embedding,
                    metadata={"content": chunk, **doc.metadata}
                )

    def query(self, question: str, top_k: int = 5) -> str:
        """Query the RAG system."""
        # 1. Embed the question
        query_embedding = self.embedder.embed(question)

        # 2. Retrieve relevant documents
        results = self.vector_store.query(query_embedding, top_k=top_k)

        # 3. Build context
        context = "\n\n".join([r.metadata["content"] for r in results])

        # 4. Generate response
        messages = [
            {"role": "system", "content": "Answer questions based on the provided context."},
            {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {question}"}
        ]
        response = self.llm.complete(messages)

        return response

    def _chunk_document(self, text: str, chunk_size: int) -> List[str]:
        """Split document into chunks."""
        words = text.split()
        chunks = []
        current_chunk = []
        current_size = 0

        for word in words:
            current_chunk.append(word)
            current_size += 1
            if current_size >= chunk_size:
                chunks.append(" ".join(current_chunk))
                current_chunk = []
                current_size = 0

        if current_chunk:
            chunks.append(" ".join(current_chunk))

        return chunks
```

---

## API Endpoint Template

```python
# src/api/routes.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI()

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    stream: bool = False

class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    tokens_used: int

class RAGRequest(BaseModel):
    question: str
    top_k: int = 5

class RAGResponse(BaseModel):
    answer: str
    sources: List[dict]


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Process chat request
        response = llm_client.complete([
            {"role": "user", "content": request.message}
        ])
        return ChatResponse(
            response=response,
            conversation_id=request.conversation_id or generate_id(),
            tokens_used=count_tokens(request.message, response)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/rag/query", response_model=RAGResponse)
async def rag_query(request: RAGRequest):
    try:
        answer, sources = rag_pipeline.query(request.question, request.top_k)
        return RAGResponse(answer=answer, sources=sources)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

## Configuration Template

```python
# src/config/settings.py
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # API Keys
    openai_api_key: str
    anthropic_api_key: Optional[str] = None

    # Model Configuration
    default_model: str = "gpt-4"
    max_tokens: int = 1024
    temperature: float = 0.7

    # Vector Store
    vector_store_type: str = "chroma"  # chroma, pinecone, etc.
    vector_store_path: str = "./data/vectors"

    # Rate Limiting
    rate_limit_requests: int = 100
    rate_limit_window: int = 60  # seconds

    # Logging
    log_level: str = "INFO"
    log_llm_calls: bool = True

    class Config:
        env_file = ".env"


settings = Settings()
```

---

## .env.example Template

```bash
# LLM API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# Model Configuration
DEFAULT_MODEL=gpt-4
MAX_TOKENS=1024
TEMPERATURE=0.7

# Vector Store
VECTOR_STORE_TYPE=chroma
VECTOR_STORE_PATH=./data/vectors
# PINECONE_API_KEY=...
# PINECONE_ENVIRONMENT=...

# Application
LOG_LEVEL=INFO
LOG_LLM_CALLS=true
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=60
```

---

## Dockerfile Template

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY src/ ./src/

# Set environment variables
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# Run application
CMD ["uvicorn", "src.api.routes:app", "--host", "0.0.0.0", "--port", "8000"]
```
