import Logger from '../utils/Logger.js';
import ElementWaiter from '../core/ElementWaiter.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import path from 'path';

/**
 * Export and sharing functionality
 * Handles exporting presentations in various formats
 */
class ExportManager {
  constructor(page, navigator) {
    this.page = page;
    this.navigator = navigator;
    this.waiter = new ElementWaiter(page);
    this.logger = Logger.child('ExportManager');
  }

  /**
   * Export presentation
   * @param {string} format - Export format ('pdf', 'pptx', 'html')
   * @param {Object} options - Export options
   * @returns {Promise<string>} Download path
   */
  async export(format = 'pdf', options = {}) {
    return await ErrorHandler.withRetry(async () => {
      this.logger.info('Exporting presentation', { format });

      // Open export dialog
      await this.navigator.openExportDialog();

      // Select format
      await this.selectFormat(format);

      // Start download
      const downloadPath = await this.startDownload(format, options);

      this.logger.info('Export completed', { format, path: downloadPath });
      return downloadPath;
    }, { context: 'export-presentation' });
  }

  /**
   * Select export format
   * @private
   */
  async selectFormat(format) {
    const formatLower = format.toLowerCase();

    try {
      if (formatLower === 'pdf') {
        await this.waiter.waitAndClick('export', 'pdfOption');
      } else if (formatLower === 'pptx' || formatLower === 'powerpoint') {
        await this.waiter.waitAndClick('export', 'pptxOption');
      } else {
        // Try selecting from dropdown
        const exists = await this.waiter.exists('export', 'formatSelect');
        if (exists) {
          await this.waiter.waitAndSelect('export', 'formatSelect', format);
        }
      }

      await this.waiter.waitForLoadingComplete();
    } catch (error) {
      this.logger.warn('Format selection failed', { format, error: error.message });
    }
  }

  /**
   * Start download
   * @private
   */
  async startDownload(format, options) {
    return new Promise(async (resolve, reject) => {
      try {
        // Set up download listener
        const downloadPromise = this.page.waitForEvent('download', {
          timeout: options.timeout || 60000
        });

        // Click download button
        await this.waiter.waitAndClick('export', 'downloadButton');

        // Wait for download
        const download = await downloadPromise;

        // Save to specified path
        const filename = options.filename ||
                        `presentation-${Date.now()}.${format}`;
        const downloadPath = path.join(
          options.downloadDir || process.cwd(),
          filename
        );

        await download.saveAs(downloadPath);

        resolve(downloadPath);
      } catch (error) {
        this.logger.error('Download failed', error);
        reject(error);
      }
    });
  }

  /**
   * Export as PDF
   * @param {Object} options - Export options
   * @returns {Promise<string>}
   */
  async exportPDF(options = {}) {
    return await this.export('pdf', options);
  }

  /**
   * Export as PowerPoint
   * @param {Object} options - Export options
   * @returns {Promise<string>}
   */
  async exportPowerPoint(options = {}) {
    return await this.export('pptx', options);
  }

  /**
   * Share presentation
   * @param {Object} shareOptions - Sharing options
   * @returns {Promise<string>} Share link
   */
  async share(shareOptions = {}) {
    return await ErrorHandler.withRetry(async () => {
      this.logger.info('Sharing presentation');

      // Click share button
      await this.waiter.waitAndClick('export', 'shareButton');

      // Wait for share dialog
      await this.waiter.waitForLoadingComplete();

      // Get share link (implementation depends on Gamma's UI)
      const shareLink = await this.getShareLink();

      this.logger.info('Presentation shared', { link: shareLink });
      return shareLink;
    }, { context: 'share-presentation' });
  }

  /**
   * Get share link from UI
   * @private
   */
  async getShareLink() {
    try {
      // Try to find share link input/text
      const linkElement = await this.page.locator(
        'input[readonly], [data-share-link], .share-link'
      ).first();

      const link = await linkElement.inputValue() || await linkElement.textContent();
      return link?.trim() || null;
    } catch (error) {
      this.logger.warn('Failed to get share link', { error: error.message });
      return null;
    }
  }

  /**
   * Copy share link to clipboard
   */
  async copyShareLink() {
    try {
      await this.waiter.waitAndClick('export', 'shareButton');
      await this.waiter.waitForLoadingComplete();

      // Try to find and click copy button
      const copyButton = await this.page.locator(
        'button:has-text("Copy"), [data-action="copy"]'
      ).first();

      await copyButton.click();

      this.logger.info('Share link copied to clipboard');
      return true;
    } catch (error) {
      this.logger.error('Failed to copy share link', error);
      return false;
    }
  }

  /**
   * Check if export is available
   * @param {string} format - Format to check
   * @returns {Promise<boolean>}
   */
  async isFormatAvailable(format) {
    try {
      await this.navigator.openExportDialog();

      const formatLower = format.toLowerCase();
      let selector;

      if (formatLower === 'pdf') {
        return await this.waiter.exists('export', 'pdfOption');
      } else if (formatLower === 'pptx') {
        return await this.waiter.exists('export', 'pptxOption');
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get available export formats
   * @returns {Promise<string[]>}
   */
  async getAvailableFormats() {
    const formats = [];

    if (await this.isFormatAvailable('pdf')) {
      formats.push('pdf');
    }

    if (await this.isFormatAvailable('pptx')) {
      formats.push('pptx');
    }

    return formats;
  }
}

export default ExportManager;
