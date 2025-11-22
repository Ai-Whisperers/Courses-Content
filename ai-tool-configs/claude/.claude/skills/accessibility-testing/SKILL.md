---
name: accessibility-testing
description: Generate WCAG-compliant accessibility tests, ARIA snapshots, and screen reader compatibility tests. Use when testing accessibility, WCAG compliance, or assistive technology support.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Accessibility Testing Skill

## Capabilities

- Generate WCAG 2.1 AA/AAA compliance tests
- Create ARIA tree snapshots
- Test keyboard navigation
- Validate color contrast
- Test screen reader compatibility
- Check focus management

## Playwright Accessibility Testing

### Basic Accessibility Scan
```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('Homepage has no accessibility violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Login form is accessible', async ({ page }) => {
    await page.goto('/login');

    const results = await new AxeBuilder({ page })
      .include('#login-form')
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('Exclude known issues for partial scan', async ({ page }) => {
    await page.goto('/dashboard');

    const results = await new AxeBuilder({ page })
      .exclude('#third-party-widget')
      .disableRules(['color-contrast']) // If known issue
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
```

### ARIA Snapshot Testing
```typescript
test('Navigation has correct ARIA structure', async ({ page }) => {
  await page.goto('/');

  const nav = page.getByRole('navigation');
  await expect(nav).toMatchAriaSnapshot(`
    - navigation "Main":
      - list:
        - listitem:
          - link "Home"
        - listitem:
          - link "Products"
        - listitem:
          - link "About"
        - listitem:
          - link "Contact"
  `);
});

test('Dialog has correct ARIA attributes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open Modal' }).click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toMatchAriaSnapshot(`
    - dialog "Confirm Action":
      - heading "Are you sure?" [level=2]
      - paragraph: "This action cannot be undone."
      - button "Cancel"
      - button "Confirm"
  `);
});

test('Form has proper labels', async ({ page }) => {
  await page.goto('/register');

  await expect(page.locator('form')).toMatchAriaSnapshot(`
    - form:
      - textbox "Email"
      - textbox "Password"
      - textbox "Confirm Password"
      - checkbox "I agree to terms"
      - button "Register"
  `);
});
```

### Keyboard Navigation Testing
```typescript
test('Can navigate form with keyboard', async ({ page }) => {
  await page.goto('/login');

  // Tab to email field
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Email')).toBeFocused();

  // Tab to password field
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Password')).toBeFocused();

  // Tab to submit button
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeFocused();

  // Enter submits form
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/dashboard');
});

test('Modal traps focus', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open Modal' }).click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // First focusable element should be focused
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();

  // Tab through all elements
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Confirm' })).toBeFocused();

  // Tab should wrap to first element (focus trap)
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();

  // Escape closes modal
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();

  // Focus returns to trigger
  await expect(page.getByRole('button', { name: 'Open Modal' })).toBeFocused();
});

test('Skip links work correctly', async ({ page }) => {
  await page.goto('/');

  // Tab to skip link
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skipLink).toBeFocused();

  // Activate skip link
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});
```

### Color Contrast Testing
```typescript
test('Text has sufficient color contrast', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .withRules(['color-contrast'])
    .analyze();

  // Log any contrast issues with details
  if (results.violations.length > 0) {
    results.violations.forEach(violation => {
      console.log(`Contrast issue: ${violation.help}`);
      violation.nodes.forEach(node => {
        console.log(`  Element: ${node.html}`);
        console.log(`  Contrast ratio: ${node.any[0]?.data?.contrastRatio}`);
      });
    });
  }

  expect(results.violations).toEqual([]);
});
```

### Screen Reader Announcements
```typescript
test('Live regions announce updates', async ({ page }) => {
  await page.goto('/');

  // Check for live region
  const liveRegion = page.locator('[aria-live="polite"]');
  await expect(liveRegion).toBeAttached();

  // Trigger an action that updates live region
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  // Verify announcement
  await expect(liveRegion).toHaveText('Item added to cart');
});

test('Form errors are announced', async ({ page }) => {
  await page.goto('/register');

  // Submit empty form
  await page.getByRole('button', { name: 'Register' }).click();

  // Check error summary
  const errorSummary = page.locator('[role="alert"]');
  await expect(errorSummary).toBeVisible();
  await expect(errorSummary).toContainText('Please fix the following errors');

  // Check individual field errors are linked
  const emailError = page.locator('#email-error');
  await expect(emailError).toHaveAttribute('id');
  await expect(page.getByLabel('Email')).toHaveAttribute('aria-describedby', 'email-error');
});
```

### Complete Page Audit
```typescript
test('Full page accessibility audit', async ({ page }) => {
  await page.goto('/');

  // Run comprehensive audit
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'])
    .analyze();

  // Generate detailed report
  const report = {
    url: page.url(),
    violations: results.violations.length,
    passes: results.passes.length,
    incomplete: results.incomplete.length,
    details: results.violations.map(v => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      help: v.help,
      helpUrl: v.helpUrl,
      nodes: v.nodes.length
    }))
  };

  console.log('Accessibility Report:', JSON.stringify(report, null, 2));

  // Fail on serious/critical issues
  const serious = results.violations.filter(
    v => v.impact === 'serious' || v.impact === 'critical'
  );
  expect(serious).toEqual([]);
});
```

## WCAG Compliance Checklist

### Level A (Minimum)
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Color is not only indicator
- [ ] Content is keyboard accessible
- [ ] No keyboard traps
- [ ] Page has language attribute

### Level AA (Standard)
- [ ] Color contrast 4.5:1 (text)
- [ ] Color contrast 3:1 (large text)
- [ ] Text can resize to 200%
- [ ] Consistent navigation
- [ ] Focus visible
- [ ] Error identification

### Level AAA (Enhanced)
- [ ] Color contrast 7:1 (text)
- [ ] No timing limits
- [ ] Sign language for video
- [ ] Extended audio descriptions

## Best Practices

1. **Test Early** - Include a11y tests in CI/CD
2. **Use Real Devices** - Test with actual screen readers
3. **Keyboard First** - Ensure all functionality works with keyboard
4. **Semantic HTML** - Use proper HTML elements
5. **ARIA as Enhancement** - Don't use ARIA to fix bad HTML
6. **Live Testing** - Test with real users with disabilities
