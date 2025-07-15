// Import home intro translations
import enHomeIntro from '../locale/en/home/intro.json';
import arHomeIntro from '../locale/ar/home/intro.json';

// Import home newProducts translations
import enHomeNewProducts from '../locale/en/home/newProducts.json';
import arHomeNewProducts from '../locale/ar/home/newProducts.json';

// Import home categories translations
import enHomeCategories from '../locale/en/home/categories.json';
import arHomeCategories from '../locale/ar/home/categories.json';

// Import navbar translations
import enNavbar from '../locale/en/navbar.json';
import arNavbar from '../locale/ar/navbar.json';

// Organize translations by language and section
const localization = {
    en: {
        navbar: enNavbar,
        home: {
            intro: enHomeIntro,
            newProducts: enHomeNewProducts,
            categories: enHomeCategories,
        },
    },
    ar: {
        navbar: arNavbar,
        home: {
            intro: arHomeIntro,
            newProducts: arHomeNewProducts,
            categories: arHomeCategories,
        },
    }
};

/**
 * Get translation for a specific key
 * @param {string} language - The language code (en, ar)
 * @param {string} path - The dot-separated path to the translation (e.g., 'home.categories.items.computers')
 * @param {object} params - Optional parameters to replace in the translation
 * @returns {string} - The translated string
 */
export const getTranslation = (language, path, params = {}) => {
    const keys = path.split('.');
    let value = localization[language];

    // Navigate through the object path
    for (const key of keys) {
        if (value && value[key]) {
            value = value[key];
        } else {
            console.warn(`Translation key not found: ${path} for language ${language}`);
            return path; // Return the path as fallback
        }
    }

    // Replace parameters in the string if any
    if (typeof value === 'string' && params) {
        return Object.entries(params).reduce((result, [param, paramValue]) => {
            return result.replace(`{{${param}}}`, paramValue);
        }, value);
    }

    return value;
};

/**
 * Loads a specific section's translations
 * @param {string} language - The language code (en, ar)
 * @param {string} section - The section path (e.g., 'home.categories')
 * @returns {object} - The translation object for that section
 */
export const loadTranslationSection = (language, section) => {
    const keys = section.split('.');
    let value = localization[language];

    for (const key of keys) {
        if (value && value[key]) {
            value = value[key];
        } else {
            console.warn(`Translation section not found: ${section} for language ${language}`);
            return {}; // Return empty object as fallback
        }
    }

    return value;
};

export default localization;