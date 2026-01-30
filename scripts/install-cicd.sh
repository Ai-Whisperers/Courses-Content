#!/bin/bash
#
# 🚀 Instalador Automático de CI/CD Local
# FPUNA AI Education - Sistema de Hooks Enterprise-Grade
#
# Uso: ./scripts/install-cicd.sh
#

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  🚀 CI/CD Local - Sistema de Hooks Enterprise-Grade         ║"
echo "║  FPUNA AI Education                                          ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Function to print status
print_status() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "No estás en un repositorio Git"
    exit 1
fi

print_status "Verificando repositorio Git..."
print_success "Repositorio Git detectado"

# Step 1: Check Python
echo ""
print_status "Paso 1/7: Verificando Python..."
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    print_error "Python no está instalado. Por favor instala Python 3.11+"
    exit 1
fi

PYTHON_VERSION=$($PYTHON_CMD --version 2>&1 | awk '{print $2}')
print_success "Python detectado: $PYTHON_VERSION"

# Step 2: Install/Upgrade pip
echo ""
print_status "Paso 2/7: Actualizando pip..."
$PYTHON_CMD -m pip install --upgrade pip -q
print_success "pip actualizado"

# Step 3: Install pre-commit
echo ""
print_status "Paso 3/7: Instalando pre-commit framework..."
if command -v pre-commit &> /dev/null; then
    print_success "pre-commit ya está instalado"
else
    $PYTHON_CMD -m pip install pre-commit -q
    print_success "pre-commit instalado"
fi

# Step 4: Install quality tools
echo ""
print_status "Paso 4/7: Instalando herramientas de calidad..."
$PYTHON_CMD -m pip install -q \
    black \
    isort \
    flake8 \
    mypy \
    ruff \
    bandit \
    radon \
    pyupgrade
print_success "Herramientas de calidad instaladas"

# Step 5: Install security tools
echo ""
print_status "Paso 5/7: Instalando herramientas de seguridad..."
$PYTHON_CMD -m pip install -q \
    detect-secrets \
    pip-audit
print_success "Herramientas de seguridad instaladas"

# Step 6: Install testing tools
echo ""
print_status "Paso 6/7: Instalando herramientas de testing..."
$PYTHON_CMD -m pip install -q \
    pytest \
    pytest-cov \
    pytest-asyncio
print_success "Herramientas de testing instaladas"

# Step 7: Install pre-commit hooks
echo ""
print_status "Paso 7/7: Instalando hooks de pre-commit..."

# Install main hooks
pre-commit install
print_success "Hooks pre-commit instalados"

# Install commit-msg hook
pre-commit install --hook-type commit-msg
print_success "Hook commit-msg instalado"

# Install pre-push hook
pre-commit install --hook-type pre-push
print_success "Hook pre-push instalado"

# Optional: Install post-checkout hook
pre-commit install --hook-type post-checkout 2>/dev/null || true

# Step 8: Setup detect-secrets baseline
echo ""
print_status "Configurando detect-secrets (baseline)..."
if [ -f ".secrets.baseline" ]; then
    print_warning "Baseline ya existe. Saltando..."
else
    detect-secrets scan > .secrets.baseline
    print_success "Baseline de secrets creado"
    print_warning "⚠️  IMPORTANTE: Revisa .secrets.baseline y ejecuta 'detect-secrets audit .secrets.baseline'"
fi

# Step 9: Make local hooks executable
echo ""
print_status "Configurando hooks locales..."
if [ -d "scripts/hooks" ]; then
    chmod +x scripts/hooks/*.py
    print_success "Hooks locales configurados"
fi

# Summary
echo ""
echo -e "${GREEN}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  🎉 INSTALACIÓN COMPLETADA EXITOSAMENTE                     ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo ""
print_status "Resumen de lo instalado:"
echo "  • 24 hooks de pre-commit configurados"
echo "  • 8 hooks locales personalizados"
echo "  • Framework de seguridad (detect-secrets, bandit, pip-audit)"
echo "  • Herramientas de calidad (black, isort, flake8, mypy, ruff)"
echo "  • Testing (pytest con cobertura)"
echo "  • Performance guardians"
echo ""

print_status "Próximos pasos:"
echo "  1. Revisa la documentación: docs/CI_CD_LOCAL.md"
echo "  2. Ejecuta: pre-commit run --all-files"
echo "  3. Configura tu IDE para usar black/isort automáticamente"
echo "  4. (Opcional) Audita el baseline: detect-secrets audit .secrets.baseline"
echo ""

print_status "Comandos útiles:"
echo "  pre-commit run --all-files     # Ejecutar todos los hooks"
echo "  pre-commit run black           # Ejecutar solo black"
echo "  pre-commit autoupdate          # Actualizar hooks"
echo "  pre-commit clean               # Limpiar cache"
echo ""

print_success "Tu proyecto está ahora blindado con CI/CD local de clase mundial! 🛡️"
