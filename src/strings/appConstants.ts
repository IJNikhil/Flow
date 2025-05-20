// APP_CONSTANTS.js
const APP_CONSTANTS = {
  LABELS: {
    HOME: 'Home',
    PLAY: 'Play',
    CATEGORY: 'Category',
    USER: 'User',
    CART: 'Cart', // Renamed to 'CART' for consistency
  },

  SETTINGS: {
    DEFAULT_LANGUAGE: 'en', // Default language
    THEME: 'light', // Default theme settings (light/dark)
    SUPPORTED_LANGUAGES: ['en', 'es', 'fr'], // Example supported languages
    APP_VERSION: '1.0.0', // Version of the app
    SUPPORT_EMAIL: 'support@example.com', // Support contact email
  },

  API: {
    BASE_URL: 'https://api.example.com', // Example API URL
    TIMEOUT: 5000, // Timeout in ms
    ERROR_MESSAGES: {
      TIMEOUT: 'Request timed out. Please try again later.',
      SERVER_ERROR: 'Server error occurred. Please try again later.',
      NOT_FOUND: 'Requested resource not found.',
    },
  },

  CATEGORY_CONSTANTS: {
    ALL_CATEGORIES: [
      'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Seafood', 
      'Grains', 'Poultry', 'Livestock', 'Spices', 'Herbs', 'Pulses', 
      'Seeds', 'Flowers', 'Honey',
    ],
  },

  NAVIGATION_CONSTANTS: {
    NAV_BUTTONS: ['Home', 'Play', 'Category', 'User', 'Cart'], // Navigation buttons
    DEFAULT_TAB: 'Home', // Default navigation tab
  },

  HOME_SCREEN_CONSTANTS: {
    // Placeholder categories and items
    INITIAL_CATEGORIES: ['Fruits', 'Vegetables', 'Dairy'], // More manageable for example purposes
    INITIAL_ITEMS: ['Item 1', 'Item 2', 'Item 3'], // Example items
    HOME_ADDRESS: '123 Main Street, Cityville', // Home address placeholder
  },

  // Additional constants for future scalability
  APP_FEATURES: {
    SEARCH_ENABLED: true, // Flag for enabling search functionality
    SUPPORT_CHAT_ENABLED: true, // Flag for enabling support chat
  },
};

export default APP_CONSTANTS;
