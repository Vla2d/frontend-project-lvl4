import React, { useMemo } from 'react';
import socketContext from '../../contexts/socketContext.jsx';

const promisify = (socketFunction) => (...args) => new Promise((resolve, reject) => {
  const pendingTime = 3000;
  setTimeout(() => {
    reject(); // When a promise is fulfilled or rejected,
  }, pendingTime); // it will stay in this state indefinitely (settled).

  socketFunction(...args, ({ status, data }) => {
    if (status === 'ok') {
      resolve(data); // So, rejecting a fulfilled promise or fulfilling a rejected promise,
    }
    reject(); // will have no effect.
  });
});

function SocketProvider({ socket, children }) {
  const addMessage = promisify((...args) => socket.volatile.emit('newMessage', ...args));
  const addChannel = promisify((...args) => socket.volatile.emit('newChannel', ...args));
  const removeChannel = promisify((...args) => socket.volatile.emit('removeChannel', ...args));
  const renameChannel = promisify((...args) => socket.volatile.emit('renameChannel', ...args));

  const cached = useMemo(() => ({
    addMessage,
    addChannel,
    removeChannel,
    renameChannel,
  }), [addMessage, addChannel, removeChannel, renameChannel]);
  return (
    <socketContext.Provider value={cached}>
      {children}
    </socketContext.Provider>
  );
}

export default SocketProvider;
