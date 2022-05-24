import './assets/application.scss';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import init from './init.jsx';

const app = async (socketInstance) => {
  ReactDOM.render(await init(socketInstance), document.getElementById('chat'));
};

app(io());
