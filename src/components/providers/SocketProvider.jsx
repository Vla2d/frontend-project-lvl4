import React, { useMemo } from 'react';
import socketContext from '../../contexts/socketContext.jsx';

const promisify = (socketFunction) => (...args) => new Promise((resolve, reject) => {
  socketFunction(...args, ({ status, data }) => {
    if (status !== 'ok') {
      reject();
    }
    resolve(data);
  });
});

function SocketProvider({ socket, children }) {
  const addMessage = promisify((...args) => socket.emit('newMessage', ...args));
  const addChannel = promisify((...args) => socket.emit('newChannel', ...args));
  const removeChannel = promisify((...args) => socket.emit('removeChannel', ...args));
  const renameChannel = promisify((...args) => socket.emit('renameChannel', ...args));

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
