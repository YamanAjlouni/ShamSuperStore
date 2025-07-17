// Import home translations
import enHomeIntro from '../locale/en/home/intro.json';
import arHomeIntro from '../locale/ar/home/intro.json';
import enHomeNewProducts from '../locale/en/home/newProducts.json';
import arHomeNewProducts from '../locale/ar/home/newProducts.json';
import enHomeCategories from '../locale/en/home/categories.json';
import arHomeCategories from '../locale/ar/home/categories.json';
import enHomeFirstHighlights from '../locale/en/home/firstHighlights.json';
import arHomeFirstHighlights from '../locale/ar/home/firstHighlights.json';
import enHomeBestSellerWomens from '../locale/en/home/bestSellerWomens.json';
import arHomeBestSellerWomens from '../locale/ar/home/bestSellerWomens.json';
import enHomeBestSellerMens from '../locale/en/home/bestSellerMens.json';
import arHomeBestSellerMens from '../locale/ar/home/bestSellerMens.json';
import enHomeSecondHighlights from '../locale/en/home/secondHighlights.json';
import arHomeSecondHighlights from '../locale/ar/home/secondHighlights.json';
import enHomeBestSellerFurniture from '../locale/en/home/bestSellerFurniture.json';
import arHomeBestSellerFurniture from '../locale/ar/home/bestSellerFurniture.json';
import enHomeBestSellerKitchen from '../locale/en/home/bestSellerKitchen.json';
import arHomeBestSellerKitchen from '../locale/ar/home/bestSellerKitchen.json';
import enHomeThirdHighlights from '../locale/en/home/thirdHighlights.json';
import arHomeThirdHighlights from '../locale/ar/home/thirdHighlights.json';
import enHomeBestSellerPhones from '../locale/en/home/bestSellerPhones.json';
import arHomeBestSellerPhones from '../locale/ar/home/bestSellerPhones.json';
import enHomeBestSellerElectronics from '../locale/en/home/bestSellerElectronics.json';
import arHomeBestSellerElectronics from '../locale/ar/home/bestSellerElectronics.json';
import enHomeFourthHighlights from '../locale/en/home/fourthHighlights.json';
import arHomeFourthHighlights from '../locale/ar/home/fourthHighlights.json';
import enHomeBestSellerBeauty from '../locale/en/home/bestSellerBeauty.json';
import arHomeBestSellerBeauty from '../locale/ar/home/bestSellerBeauty.json';
import enHomeBestSellerSchool from '../locale/en/home/bestSellerSchool.json';
import arHomeBestSellerSchool from '../locale/ar/home/bestSellerSchool.json';
import enHomeFifthHighlights from '../locale/en/home/fifthHighlights.json';
import arHomeFifthHighlights from '../locale/ar/home/fifthHighlights.json';
import enHomeBestSellerHomeRenovation from '../locale/en/home/bestSellerHomeRenovation.json';
import arHomeBestSellerHomeRenovation from '../locale/ar/home/bestSellerHomeRenovation.json';
import enHomeBestSellerGardenSupplies from '../locale/en/home/bestSellerGardenSupplies.json';
import arHomeBestSellerGardenSupplies from '../locale/ar/home/bestSellerGardenSupplies.json';
import enHomeSixthHighlights from '../locale/en/home/sixthHighlights.json';
import arHomeSixthHighlights from '../locale/ar/home/sixthHighlights.json';
import enHomeFeaturedProducts from '../locale/en/home/featuredProducts.json';
import arHomeFeaturedProducts from '../locale/ar/home/featuredProducts.json';
import enHomeOurNews from '../locale/en/home/ourNews.json';
import arHomeOurNews from '../locale/ar/home/ourNews.json';
import enHomeTopRatedProducts from '../locale/en/home/topRatedProducts.json';
import arHomeTopRatedProducts from '../locale/ar/home/topRatedProducts.json';

// Import shop translations
import enShopCategories from '../locale/en/shop/categories.json';
import arShopCategories from '../locale/ar/shop/categories.json';
import enShopProductsOnSale from '../locale/en/shop/productsOnSale.json';
import arShopProductsOnSale from '../locale/ar/shop/productsOnSale.json';
import enShopFeaturedProducts from '../locale/en/shop/featuredProducts.json';
import arShopFeaturedProducts from '../locale/ar/shop/featuredProducts.json';
import enShopProductsList from '../locale/en/shop/productsList.json';
import arShopProductsList from '../locale/ar/shop/productsList.json';
import enShopSubCategories from '../locale/en/shop/subCategories.json';
import arShopSubCategories from '../locale/ar/shop/subCategories.json';
import enShopProductDetails from '../locale/en/shop/productDetails.json';
import arShopProductDetails from '../locale/ar/shop/productDetails.json';

// Import navbar translations
import enNavbar from '../locale/en/navbar.json';
import arNavbar from '../locale/ar/navbar.json';

// Import footer translations
import enFooter from '../locale/en/footer.json';
import arFooter from '../locale/ar/footer.json';


// Organize translations by language and section
const localization = {
    en: {
        navbar: enNavbar,
        footer: enFooter,
        home: {
            intro: enHomeIntro,
            newProducts: enHomeNewProducts,
            categories: enHomeCategories,
            firstHighlights: enHomeFirstHighlights,
            bestSellerWomens: enHomeBestSellerWomens,
            bestSellerMens: enHomeBestSellerMens,
            secondHighlights: enHomeSecondHighlights,
            bestSellerFurniture: enHomeBestSellerFurniture,
            bestSellerPhones: enHomeBestSellerPhones,
            bestSellerKitchen: enHomeBestSellerKitchen,
            thirdHighlights: enHomeThirdHighlights,
            bestSellerElectronics: enHomeBestSellerElectronics,
            fourthHighlights: enHomeFourthHighlights,
            bestSellerBeauty: enHomeBestSellerBeauty,
            bestSellerSchool: enHomeBestSellerSchool,
            fifthHighlights: enHomeFifthHighlights,
            bestSellerHomeRenovation: enHomeBestSellerHomeRenovation,
            bestSellerGardenSupplies: enHomeBestSellerGardenSupplies,
            sixthHighlights: enHomeSixthHighlights,
            featuredProducts: enHomeFeaturedProducts,
            ourNews: enHomeOurNews,
            topRatedProducts: enHomeTopRatedProducts,
        },
        shop: {
            categories: enShopCategories,
            productsOnSale: enShopProductsOnSale,
            featuredProducts: enShopFeaturedProducts,
            productsList: enShopProductsList,
            subCategories: enShopSubCategories,
            productDetails: enShopProductDetails,
        },
    },
    ar: {
        navbar: arNavbar,
        footer: arFooter,
        home: {
            intro: arHomeIntro,
            newProducts: arHomeNewProducts,
            categories: arHomeCategories,
            firstHighlights: arHomeFirstHighlights,
            bestSellerWomens: arHomeBestSellerWomens,
            bestSellerMens: arHomeBestSellerMens,
            secondHighlights: arHomeSecondHighlights,
            bestSellerFurniture: arHomeBestSellerFurniture,
            bestSellerPhones: arHomeBestSellerPhones,
            bestSellerKitchen: arHomeBestSellerKitchen,
            thirdHighlights: arHomeThirdHighlights,
            bestSellerElectronics: arHomeBestSellerElectronics,
            fourthHighlights: arHomeFourthHighlights,
            bestSellerBeauty: arHomeBestSellerBeauty,
            bestSellerSchool: arHomeBestSellerSchool,
            fifthHighlights: arHomeFifthHighlights,
            bestSellerHomeRenovation: arHomeBestSellerHomeRenovation,
            bestSellerGardenSupplies: arHomeBestSellerGardenSupplies,
            sixthHighlights: arHomeSixthHighlights,
            featuredProducts: arHomeFeaturedProducts,
            ourNews: arHomeOurNews,
            topRatedProducts: arHomeTopRatedProducts,
        },
        shop: {
            categories: arShopCategories,
            productsOnSale: arShopProductsOnSale,
            featuredProducts: arShopFeaturedProducts,
            productsList: arShopProductsList,
            subCategories: arShopSubCategories,
            productDetails: arShopProductDetails,
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