Create a Page Object Model class for the specified page.

Requirements:
- TypeScript with proper types
- All locators as class properties
- Use getByTestId or getByRole selectors
- Include common page actions as methods
- Add navigation method
- Include assertions helpers

Example structure:
```typescript
export class PageName {
  readonly page: Page;
  readonly element: Locator;

  constructor(page: Page) {}

  async goto() {}
  async action() {}
}
```
