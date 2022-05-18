import { useContext } from 'react';
import authContext from '../contexts/authContext.jsx';

const useAuth = () => useContext(authContext);

export default useAuth;
