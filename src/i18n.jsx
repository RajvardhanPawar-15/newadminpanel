// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require('../src/style/i18n/en.json')
      },
      fr: {
        translation: require('../src/style/i18n/fr.json')
      },
      es: { // Corrected language code for Spanish
        translation: require('../src/style/i18n/es.json')
      },
      de: {
        translation: require('../src/style/i18n/de.json')
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

