/**
 * Centralized UI selector management
 * Provides primary selectors with fallback strategies
 */
const SELECTORS = {
  // Authentication page selectors
  auth: {
    emailInput: {
      primary: 'input[type="email"]',
      fallback: ['input[name="email"]', '#email', '[placeholder*="email" i]']
    },
    passwordInput: {
      primary: 'input[type="password"]',
      fallback: ['input[name="password"]', '#password', '[placeholder*="password" i]']
    },
    submitButton: {
      primary: 'button[type="submit"]',
      fallback: ['button:has-text("Sign in")', 'button:has-text("Login")', '.submit-button']
    },
    googleButton: {
      primary: 'button:has-text("Continue with Google")',
      fallback: ['[data-provider="google"]', '.google-login']
    },
    githubButton: {
      primary: 'button:has-text("Continue with GitHub")',
      fallback: ['[data-provider="github"]', '.github-login']
    }
  },

  // Dashboard/Workspace selectors
  dashboard: {
    createButton: {
      primary: '[data-testid="create-new"]',
      fallback: ['button:has-text("Create")', 'button:has-text("New")', '.create-button']
    },
    createPresentation: {
      primary: '[data-type="presentation"]',
      fallback: ['button:has-text("Presentation")', '[aria-label*="presentation" i]']
    },
    createFromTemplate: {
      primary: 'button:has-text("Use template")',
      fallback: ['.template-button', '[data-action="template"]']
    },
    createFromText: {
      primary: 'button:has-text("Generate from text")',
      fallback: ['button:has-text("From text")', '[data-action="generate"]']
    },
    presentationsList: {
      primary: '[data-testid="presentations-list"]',
      fallback: ['.presentations-container', '.workspace-items']
    },
    presentationCard: {
      primary: '[data-testid="presentation-card"]',
      fallback: ['.presentation-item', '.card']
    }
  },

  // Editor/Creation selectors
  editor: {
    titleInput: {
      primary: 'input[placeholder*="title" i]',
      fallback: ['[data-field="title"]', '.title-input', 'input[name="title"]']
    },
    contentInput: {
      primary: '[contenteditable="true"]',
      fallback: ['textarea', '.content-editor', '[data-field="content"]']
    },
    slideContainer: {
      primary: '[data-testid="slide-container"]',
      fallback: ['.slide-wrapper', '.slide', '[role="presentation"]']
    },
    addSlideButton: {
      primary: 'button:has-text("Add slide")',
      fallback: ['[data-action="add-slide"]', '.add-slide-button']
    },
    slideList: {
      primary: '[data-testid="slide-list"]',
      fallback: ['.slides-panel', '.slide-thumbnails']
    },
    slideThumb: {
      primary: '[data-testid="slide-thumb"]',
      fallback: ['.slide-thumbnail', '.slide-preview']
    },
    generateButton: {
      primary: 'button:has-text("Generate")',
      fallback: ['[data-action="generate"]', '.generate-button']
    },
    saveButton: {
      primary: 'button:has-text("Save")',
      fallback: ['[data-action="save"]', '.save-button']
    }
  },

  // Theme and styling selectors
  theme: {
    themeButton: {
      primary: 'button:has-text("Theme")',
      fallback: ['[data-panel="theme"]', '.theme-button']
    },
    themeList: {
      primary: '[data-testid="theme-list"]',
      fallback: ['.themes-panel', '.theme-options']
    },
    themeOption: {
      primary: '[data-theme]',
      fallback: ['.theme-item', '.theme-card']
    },
    colorPicker: {
      primary: '[data-testid="color-picker"]',
      fallback: ['input[type="color"]', '.color-input']
    },
    fontSizeControl: {
      primary: '[data-control="font-size"]',
      fallback: ['select[name="fontSize"]', '.font-size-select']
    }
  },

  // Content input selectors
  contentInput: {
    topicInput: {
      primary: 'textarea[placeholder*="topic" i]',
      fallback: ['[data-field="topic"]', 'textarea[name="topic"]']
    },
    descriptionInput: {
      primary: 'textarea[placeholder*="description" i]',
      fallback: ['[data-field="description"]', 'textarea[name="description"]']
    },
    outlineInput: {
      primary: '[data-field="outline"]',
      fallback: ['textarea[placeholder*="outline" i]', '.outline-input']
    },
    toneSelect: {
      primary: 'select[name="tone"]',
      fallback: ['[data-control="tone"]', '.tone-select']
    },
    lengthSelect: {
      primary: 'select[name="length"]',
      fallback: ['[data-control="length"]', '.length-select']
    }
  },

  // Export and sharing selectors
  export: {
    exportButton: {
      primary: 'button:has-text("Export")',
      fallback: ['[data-action="export"]', '.export-button']
    },
    shareButton: {
      primary: 'button:has-text("Share")',
      fallback: ['[data-action="share"]', '.share-button']
    },
    downloadButton: {
      primary: 'button:has-text("Download")',
      fallback: ['[data-action="download"]', '.download-button']
    },
    formatSelect: {
      primary: 'select[name="format"]',
      fallback: ['[data-control="format"]', '.format-select']
    },
    pdfOption: {
      primary: '[data-format="pdf"]',
      fallback: ['button:has-text("PDF")', 'option[value="pdf"]']
    },
    pptxOption: {
      primary: '[data-format="pptx"]',
      fallback: ['button:has-text("PowerPoint")', 'option[value="pptx"]']
    }
  },

  // Loading and status selectors
  status: {
    loadingIndicator: {
      primary: '[data-testid="loading"]',
      fallback: ['.loading', '.spinner', '[role="progressbar"]']
    },
    errorMessage: {
      primary: '[data-testid="error"]',
      fallback: ['.error-message', '.alert-error', '[role="alert"]']
    },
    successMessage: {
      primary: '[data-testid="success"]',
      fallback: ['.success-message', '.alert-success']
    }
  },

  // Navigation selectors
  navigation: {
    backButton: {
      primary: 'button[aria-label="Back"]',
      fallback: ['button:has-text("Back")', '.back-button']
    },
    closeButton: {
      primary: 'button[aria-label="Close"]',
      fallback: ['button:has-text("Close")', '.close-button', '[data-action="close"]']
    },
    homeButton: {
      primary: 'a[href="/workspace"]',
      fallback: ['button:has-text("Home")', '.home-button']
    }
  }
};

/**
 * Get all selectors for a category
 * @param {string} category - Selector category
 * @returns {Object} Category selectors
 */
export function getCategory(category) {
  return SELECTORS[category] || {};
}

/**
 * Get selector with fallbacks
 * @param {string} category - Selector category
 * @param {string} name - Selector name
 * @returns {Object} Selector object with primary and fallback
 */
export function getSelector(category, name) {
  const categorySelectors = SELECTORS[category];
  if (!categorySelectors) {
    throw new Error(`Unknown selector category: ${category}`);
  }

  const selector = categorySelectors[name];
  if (!selector) {
    throw new Error(`Unknown selector: ${category}.${name}`);
  }

  return selector;
}

/**
 * Get all selectors as array (primary + fallbacks)
 * @param {string} category - Selector category
 * @param {string} name - Selector name
 * @returns {string[]} Array of selectors to try
 */
export function getSelectorArray(category, name) {
  const selector = getSelector(category, name);
  return [selector.primary, ...selector.fallback];
}

export default SELECTORS;
