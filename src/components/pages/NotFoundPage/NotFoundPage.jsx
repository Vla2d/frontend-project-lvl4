import React from 'react';
import { useTranslation } from 'react-i18next';
import error404 from './404.png';

function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img className="w-50" src={error404} alt="404" />
      <h5>{t('notFound.pageNotFound')}</h5>
      <span>{t('notFound.redirect')}</span>
      <a href="/">{t('notFound.mainPage')}</a>
    </div>
  );
}

export default NotFound;
