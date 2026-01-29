# Skill: Testing Helper Básico

## Descripción
Ayuda básica para escribir y ejecutar tests en proyectos estudiantiles. Focus en patterns comunes para applications React/Node.js.

## Triggers
- "escribir test para"
- "cómo testear"
- "testing"
- "unit test"
- "integration test"

## Functionality

### Tests Generation
Para funciones/componentes específicos, generar tests básicos automáticamente:

```javascript
// Para function: validateEmail(email)
describe('validateEmail', () => {
  test('returns true for valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  test('returns false for invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });

  test('handles edge cases', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('@domain.com')).toBe(false);
  });
});
```

### Ejecutar Tests
Comandos sugeridos basados en framework detectado:

**Jest/React Testing Library**:
```bash
npm test -- --watch
npm test -- --coverage
```

**Pytest**:
```bash
pytest tests/ -v
pytest tests/ --cov=src/
```

### Testing Patterns Promoción

**Para Beginners** (React):
- Test setup/teardown básico
- Mocking props simples
- Snapshot tests para UI stability

**Para Intermedios**:
- Integration tests con API mocks
- Error boundary tests
- Async operations testing

**Para Avanzados**:
- Custom hooks testing
- Context providers testing
- Performance testing

## Evitar Common Errors
- NO test DOM directamente (usar RTL queries)
- NO tests que dependen de data externa (siempre mock)
- NO tests frágiles (evitar snapshots para lógica changing)

## Best Practices Recordatorios
- Tests junto archivos componentes
- Happy path + error cases mínimo
- Tests claros, entendibles
- No tests duplicates innecesarios

---

*Skill simple para learning incremental testing patterns.*