import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from './locales/en.json';
import noTranslation from './locales/no.json';
import plTranslation from './locales/pl.json';

// Configure i18next
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      no: {
        translation: noTranslation
      },
      pl: {
        translation: plTranslation
      }
    },
    lng: localStorage.getItem('language') || 'en', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n; 