import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authContext from '../../contexts/authContext.jsx';
import { chatPagePath } from '../../routes.js';

function Header() {
  const { t } = useTranslation();
  const auth = useContext(authContext);

  const handleLogout = () => {
    auth.logOut();
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to={chatPagePath()} className="navbar-brand">
          Hexlet Chat
        </Link>
        {auth.loggedIn ? <button type="button" className="btn btn-primary" onClick={handleLogout}>{t('buttons.logOut')}</button> : null}
      </div>
    </nav>
  );
}

export default Header;
