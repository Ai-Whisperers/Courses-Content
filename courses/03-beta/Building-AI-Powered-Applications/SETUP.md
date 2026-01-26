# Setup - Building AI-Powered Applications

Get your environment ready for the course.

---

## Prerequisites

| Tool | Version | Check Command |
|------|---------|---------------|
| Python | 3.9+ | `python --version` |
| pip | Latest | `pip --version` |
| Git | Any | `git --version` |
| VS Code | Latest | - |
| OpenAI API key | - | [platform.openai.com](https://platform.openai.com) |

---

## Quick Setup (15 minutes)

### 1. Install Python

**Windows:**
```bash
winget install Python.Python.3.11
```

**Mac:**
```bash
brew install python@3.11
```

**Linux:**
```bash
sudo apt update
sudo apt install python3.11 python3.11-venv
```

### 2. Get OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to API Keys section
4. Create new secret key
5. Save it securely (you'll need it soon)

**Cost:** ~$5-10 for entire course

### 3. Create Project Environment

```bash
# Create project folder
mkdir ai-apps-course
cd ai-apps-course

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install openai langchain python-dotenv fastapi uvicorn pytest chromadb
```

### 4. Configure API Key

```bash
# Create .env file
echo "OPENAI_API_KEY=your-key-here" > .env
```

### 5. Verify Setup

Create `test_setup.py`:

```python
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Say 'Setup successful!'"}],
    max_tokens=20
)
print(response.choices[0].message.content)
```

Run it:
```bash
python test_setup.py
```

Should print: "Setup successful!"

---

## AI-Assisted Setup

Copy this prompt into Claude Code:

```
Set up my environment for Building AI-Powered Applications:

1. Check Python 3.9+ is installed
2. Create project folder: ai-apps-course
3. Create and activate virtual environment
4. Install: openai langchain python-dotenv fastapi uvicorn pytest chromadb
5. Create .env file (remind me to add my OpenAI key)
6. Create test script to verify OpenAI connection
7. Run the test and confirm it works

Show me each step and wait for confirmation before proceeding.
```

---

## Project Structure

Set up this structure for the course:

```
ai-apps-course/
├── .env                 # API keys (never commit!)
├── .gitignore           # Ignore .env, venv, __pycache__
├── requirements.txt     # Dependencies
├── src/
│   ├── __init__.py
│   ├── chains/          # LangChain implementations
│   ├── agents/          # AI agents
│   └── api/             # FastAPI endpoints
├── tests/
│   └── __init__.py
└── docs/
    └── notes.md
```

Create with:
```bash
mkdir -p src/{chains,agents,api} tests docs
touch src/__init__.py src/chains/__init__.py src/agents/__init__.py src/api/__init__.py tests/__init__.py
```

---

## VS Code Extensions (Recommended)

- **Python** - Python language support
- **Pylance** - Python type checking
- **Python Debugger** - Debugging
- **Jupyter** - Notebook support
- **REST Client** - Test APIs

---

## Troubleshooting

### "ModuleNotFoundError: No module named 'openai'"

```bash
# Make sure venv is activated
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Reinstall
pip install openai
```

### "AuthenticationError: Invalid API key"

1. Check your .env file has correct key
2. Make sure there are no extra spaces
3. Verify key is active at platform.openai.com

### "RateLimitError"

You've hit API limits. Wait a minute and try again, or check your usage at platform.openai.com.

---

## Estimated Costs

| Service | Cost | Notes |
|---------|------|-------|
| OpenAI API | $5-10 | For entire course |
| Pinecone | Free | Free tier sufficient |
| Deployment | Free | Free tier on Railway/Heroku |

---

## Next Steps

1. Verify `test_setup.py` runs successfully
2. Open `modules/01-ai-integration-fundamentals/README.md`
3. Complete the first exercises
4. Build your first AI-powered endpoint

---

*See also: [Shared Setup Prompts](../../../_shared/setup/SETUP-PROMPTS.md)*
