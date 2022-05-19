import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider } from 'react-i18next';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import reducer, { actions } from './slices/index.js';
import App from './components/App.jsx';
import getI18nInstance from './locales/getI18nInstance.js';
import SocketProvider from './components/providers/SocketProvider.jsx';

async function Init(socketInstance = io()) {
  const store = configureStore({
    reducer,
  });

  socketInstance.on('newMessage', (payload) => {
    store.dispatch(actions.addMessage(payload));
  });
  socketInstance.on('newChannel', (payload) => {
    store.dispatch(actions.addChannel(payload));
  });
  socketInstance.on('removeChannel', (payload) => {
    store.dispatch(actions.removeChannel(payload));
  });
  socketInstance.on('renameChannel', (payload) => {
    store.dispatch(actions.renameChannel(payload));
  });

  const i18nInstance = await getI18nInstance();

  const rollbarConfig = {
    accessToken: 'd18bf0d072b4414ebbf5f99fe5ab09a7',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nInstance}>
            <SocketProvider socket={socketInstance}>
              <App />
            </SocketProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
}

export default Init;
