import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enCommon from '@/../public/locales/en/common.json';
import hiCommon from '@/../public/locales/hi/common.json';

const resources = {
  en: {
    common: enCommon,
  },
  hi: {
    common: hiCommon,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
