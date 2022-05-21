const host = '';
const prefix = 'api/v1';

const routes = {
  loginPath: () => [host, prefix, 'login'].join('/'),
  usersPath: () => [host, prefix, 'data'].join('/'),
  signUpPath: () => [host, prefix, 'signup'].join('/'),
  logInPagePath: () => [host, 'login'].join('/'),
  signUpPagePath: () => [host, 'signup'].join('/'),
  notFoundPagePath: () => [host, '*'].join('/'),
  chatPagePath: () => [host, ''].join('/'),
};

export const {
  loginPath,
  usersPath,
  signUpPath,
  signUpPagePath,
  logInPagePath,
  notFoundPagePath,
  chatPagePath,
} = routes;
