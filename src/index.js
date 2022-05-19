import './assets/application.scss';
import ReactDOM from 'react-dom';
import init from './init.jsx';

const app = async () => {
  ReactDOM.render(await init(), document.getElementById('chat'));
};

app();
