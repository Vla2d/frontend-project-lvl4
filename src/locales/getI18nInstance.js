import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './index.js';

const getI18nInstance = async () => {
  const i18nInstance = i18next.createInstance();

  await i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });

  return i18nInstance;
};

export default getI18nInstance;
