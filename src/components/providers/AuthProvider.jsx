import React, { useCallback, useMemo, useState } from 'react';
import authContext from '../../contexts/authContext.jsx';

function AuthProvider({ children }) {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = currentUser ? currentUser.token : null;
  const [userName, setUserName] = useState(currentUser ? currentUser.username : null);

  const loggedIn = token != null;
  const logIn = useCallback((data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUserName(data.username);
  }, []);
  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUserName(null);
  }, []);
  const getAuthHeader = useCallback(() => {
    if (userName && token) {
      return { Authorization: `Bearer ${token}` };
    }

    return {};
  }, [userName, token]);

  const cached = useMemo(() => (
    {
      userName,
      loggedIn,
      logOut,
      logIn,
      getAuthHeader,
    }), [userName, loggedIn, logOut, logIn, getAuthHeader]);
  return (
    <authContext.Provider value={cached}>
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
