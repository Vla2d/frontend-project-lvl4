import { useContext } from 'react';
import socketContext from '../contexts/socketContext.jsx';

const useSocket = () => useContext(socketContext);

export default useSocket;
