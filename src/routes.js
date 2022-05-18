const host = '';
const prefix = 'api/v1';

const routes = {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  usersPath: () => [host, prefix, 'data'].join('/'),
  signUpPath: () => [host, prefix, 'signup'].join('/'),
};

export const {
  channelsPath, channelPath, channelMessagesPath, loginPath, usersPath, signUpPath,
} = routes;
