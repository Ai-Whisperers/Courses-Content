# Instalar Skills en OpenCode

## Instalación Rápida

### Método 1: Desde Repositorio Oficial

```bash
# Instalar skill específico
claude skill install create-rest-api

# Instalar desde GitHub
claude skill install github:anthropics/claude-skills/create-rest-api
```

### Método 2: Desde Archivo Local

```bash
# Descargar skill
curl -O https://raw.githubusercontent.com/user/repo/skill.yaml

# Instalar
claude skill install ./skill.yaml
```

### Método 3: Desde NPM

```bash
npm install -g @anthropic/skill-create-api
claude skill register @anthropic/skill-create-api
```

---

## Verificar Instalación

```bash
# Listar skills instalados
claude skill list

# Ver detalles de un skill
claude skill info create-rest-api
```

---

## Gestión de Skills

### Actualizar

```bash
claude skill update create-rest-api
# O actualizar todos
claude skill update --all
```

### Desinstalar

```bash
claude skill uninstall create-rest-api
```

### Desactivar temporalmente

```bash
claude skill disable create-rest-api
claude skill enable create-rest-api
```

---

## Ubicación de Skills

**Windows**: `%USERPROFILE%\.opencode\skills\`  
**macOS/Linux**: `~/.opencode/skills/`

---

## Troubleshooting

**Skill no se carga**:
```bash
# Verificar sintaxis YAML
claude skill validate nombre-skill

# Ver logs
cat ~/.opencode/logs/skills.log
```

**Conflictos**:
- No instalar skills con mismo nombre
- Revisar dependencias de MCPs requeridos

---

**Ver también**:
- 📖 [Encontrar Skills](./finding-skills.md)
- 📖 [Crear Skills](./creating-skills.md)

---

*Guía FPUNA Summer 2026*
