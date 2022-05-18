import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';

import init from './init.jsx';

const app = async () => {
  const socket = io();
  const DOM = await init(socket);

  ReactDOM.render(DOM, document.getElementById('chat'));
};

app();
