import Logger from '../utils/Logger.js';
import ElementWaiter from '../core/ElementWaiter.js';
import ErrorHandler from '../utils/ErrorHandler.js';

/**
 * Theme selection and application
 * Manages presentation themes and styling in Gamma
 */
class ThemeManager {
  constructor(page, navigator) {
    this.page = page;
    this.navigator = navigator;
    this.waiter = new ElementWaiter(page);
    this.logger = Logger.child('ThemeManager');
  }

  /**
   * Apply theme to presentation
   * @param {string} themeName - Theme name or ID
   */
  async applyTheme(themeName) {
    return await ErrorHandler.withRetry(async () => {
      this.logger.info('Applying theme', { themeName });

      // Open theme panel
      await this.navigator.openThemePanel();

      // Find and select theme
      const themeElements = await this.page.locator('[data-theme], .theme-item').all();

      for (const themeElement of themeElements) {
        const name = await themeElement.getAttribute('data-theme') ||
                     await themeElement.textContent();

        if (name && name.toLowerCase().includes(themeName.toLowerCase())) {
          await themeElement.click();
          await this.waiter.waitForLoadingComplete();
          this.logger.info('Theme applied', { themeName });
          return;
        }
      }

      this.logger.warn('Theme not found', { themeName });
    }, { context: 'apply-theme' });
  }

  /**
   * Set color scheme
   * @param {string} colorScheme - Color scheme name
   */
  async setColorScheme(colorScheme) {
    this.logger.info('Setting color scheme', { colorScheme });

    await this.navigator.openThemePanel();

    // Implementation depends on Gamma's UI for color schemes
    this.logger.warn('Color scheme setting not yet fully implemented');
  }

  /**
   * Set font size
   * @param {string} size - Font size ('small', 'medium', 'large')
   */
  async setFontSize(size) {
    return await ErrorHandler.withRetry(async () => {
      this.logger.info('Setting font size', { size });

      await this.navigator.openThemePanel();

      const exists = await this.waiter.exists('theme', 'fontSizeControl');
      if (exists) {
        await this.waiter.waitAndSelect('theme', 'fontSizeControl', size);
        this.logger.info('Font size set');
      } else {
        this.logger.warn('Font size control not found');
      }
    }, { context: 'set-font-size' });
  }

  /**
   * Apply educational theme
   */
  async applyEducationalTheme() {
    await this.applyTheme('educational');
  }

  /**
   * Apply modern theme
   */
  async applyModernTheme() {
    await this.applyTheme('modern');
  }

  /**
   * Apply minimal theme
   */
  async applyMinimalTheme() {
    await this.applyTheme('minimal');
  }

  /**
   * Get available themes
   * @returns {Promise<string[]>}
   */
  async getAvailableThemes() {
    try {
      await this.navigator.openThemePanel();

      const themeElements = await this.page.locator('[data-theme], .theme-item').all();
      const themes = [];

      for (const element of themeElements) {
        const name = await element.getAttribute('data-theme') ||
                     await element.textContent();
        if (name) {
          themes.push(name.trim());
        }
      }

      this.logger.info('Available themes retrieved', { count: themes.length });
      return themes;
    } catch (error) {
      this.logger.error('Failed to get themes', error);
      return [];
    }
  }
}

export default ThemeManager;
