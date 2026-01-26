# Setup Día 4: IA para Desarrollo de Software

## Guía de Instalación para Desarrollo de Software

> **Pre-requisito**: Haber completado el [Setup del Día 1](../dia-01-fundamentos/SETUP-DIA-01.md)
>
> **Nota**: Node.js, Git y VS Code ya deberían estar instalados del Día 1.

---

## 1. Verificar Setup del Día 1

Confirmar que todo del Día 1 funciona:

```bash
node --version    # v20.x.x
npm --version     # 10.x.x
git --version     # git version 2.x.x
code --version    # 1.8x.x (VS Code)
claude --version  # Versión actual
```

Si algo falla, revisar [SETUP-DIA-01.md](../dia-01-fundamentos/SETUP-DIA-01.md).

---

## 2. Extensiones de VS Code (Obligatorio)

Instalar las siguientes extensiones en VS Code:

### Esenciales para el Día 4

| Extensión | ID | Para qué |
|-----------|-----|----------|
| ESLint | dbaeumer.vscode-eslint | Linting de JS/TS |
| Prettier | esbenp.prettier-vscode | Formateo de código |
| GitLens | eamodio.gitlens | Mejor integración Git |
| Thunder Client | rangav.vscode-thunder-client | Probar APIs |
| REST Client | humao.rest-client | Alternativa para APIs |

### Instalación Rápida

```bash
# Desde terminal (con VS Code instalado)
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension eamodio.gitlens
code --install-extension rangav.vscode-thunder-client
```

### O desde VS Code:
1. Ctrl+Shift+X (abrir extensiones)
2. Buscar cada extensión por nombre
3. Click en Install

---

## 3. Configuración de ESLint + Prettier

### Crear archivo de configuración global

Crear archivo `~/.eslintrc.json`:

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
```

### Configuración de VS Code para Auto-format

Crear o editar `~/.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 4. Crear Proyecto de Práctica

### Estructura Inicial

```bash
# Crear carpeta
mkdir ~/fpuna-software
cd ~/fpuna-software

# Inicializar proyecto Node
npm init -y

# Instalar dependencias comunes
npm install express cors dotenv
npm install -D jest eslint prettier nodemon
```

### Archivo package.json

Editar `package.json` para agregar scripts:

```json
{
  "name": "fpuna-software",
  "version": "1.0.0",
  "description": "Proyecto de práctica FPUNA 2026",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write ."
  },
  "type": "module",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2"
  },
  "devDependencies": {
    "eslint": "^8.55.0",
    "jest": "^29.7.0",
    "nodemon": "^3.0.2",
    "prettier": "^3.1.1"
  }
}
```

---

## 5. Archivo de Prueba

Crear `index.js`:

```javascript
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
```

### Probar
```bash
npm run dev
# Abrir http://localhost:3000 en navegador
# Debe mostrar: {"message":"API funcionando correctamente!"}
```

---

## 6. Python (Recomendado)

Si no lo instalaste en el Día 3:

### Windows
1. Descargar de https://www.python.org/downloads/
2. Marcar "Add Python to PATH"
3. Instalar

### macOS/Linux
```bash
# macOS con Homebrew
brew install python@3.11

# Linux
sudo apt install python3 python3-pip
```

### Verificar
```bash
python --version  # Python 3.11.x
pip --version     # pip 23.x
```

---

## 7. Docker Desktop (Opcional)

**¿Qué es?** Plataforma para ejecutar aplicaciones en contenedores.

### Windows
1. Ir a https://www.docker.com/products/docker-desktop/
2. Descargar Docker Desktop para Windows
3. Instalar (requiere reinicio)
4. Habilitar WSL 2 si se pide

### macOS
```bash
brew install --cask docker
# O descargar de docker.com
```

### Linux
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER
# Cerrar sesión y volver a entrar
```

### Verificar
```bash
docker --version
docker run hello-world
```

---

## 8. Herramientas de IA para Desarrollo (Opcional)

### Cursor IDE (Alternativa a VS Code con IA integrada)
- Descargar de: https://cursor.sh/
- Basado en VS Code
- IA integrada para código

### Aider (CLI para programar con IA)
```bash
pip install aider-chat

# Usar:
cd ~/tu-proyecto
aider
```

### Continue (Extensión VS Code)
1. En VS Code, buscar "Continue"
2. Instalar extensión
3. Configurar con tu API key

---

## 9. Verificación Final

### Checklist de Comandos

```bash
# 1. Node.js y npm
node --version && npm --version

# 2. Proyecto de práctica
cd ~/fpuna-software
npm run dev
# Ctrl+C para detener

# 3. Tests funcionan
npm test
# (puede mostrar "no tests" - OK por ahora)

# 4. Linting funciona
npm run lint
# Debe ejecutar sin errores graves

# 5. VS Code con extensiones
code --list-extensions | grep -E "eslint|prettier|gitlens"
# Debe mostrar las extensiones instaladas
```

### Prueba con Claude

```
Prompt a Claude:
"Genera una función JavaScript que:
- Tome un array de números
- Retorne la suma de los números pares
- Incluya validación de input
- Tenga tests con Jest"
```

Copiar el código al proyecto → Ejecutar `npm test` → Debe pasar.

---

## 10. Solución de Problemas

### "npm: command not found"

1. Reiniciar terminal
2. Verificar que Node.js está en PATH
3. Reinstalar Node.js

### "Cannot use import statement outside a module"

Verificar que `package.json` tiene:
```json
"type": "module"
```

### ESLint no funciona

```bash
# Reinstalar
npm uninstall eslint
npm install -D eslint
npx eslint --init
```

### Puerto 3000 ya en uso

```bash
# Encontrar proceso
# Windows:
netstat -ano | findstr :3000
# Linux/Mac:
lsof -i :3000

# Cambiar puerto en el código o matar proceso
```

---

## 11. Recursos Adicionales

### Documentación
- Express: https://expressjs.com/
- Jest: https://jestjs.io/
- ESLint: https://eslint.org/
- Prettier: https://prettier.io/

### Tutoriales
- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices
- JavaScript.info: https://javascript.info/

### Repositorios de Ejemplo
- Express Examples: https://github.com/expressjs/express/tree/master/examples
- Node.js Starter: https://github.com/microsoft/TypeScript-Node-Starter

---

## 12. Checklist Pre-Clase Día 4

- [ ] Setup Día 1 completado y funcionando
- [ ] Extensiones de VS Code instaladas
- [ ] Proyecto de práctica creado (~/fpuna-software)
- [ ] `npm run dev` funciona sin errores
- [ ] ESLint y Prettier configurados
- [ ] Python instalado (recomendado)
- [ ] Docker instalado (opcional)

**Si tienes problemas**, llegar 30 minutos antes a clase.

---

*Setup Día 4 - Software*
*FPUNA Verano 2026*
