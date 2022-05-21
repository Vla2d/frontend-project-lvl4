import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Header, Container, NotificationsContainer } from './layout/index.js';
import {
  NotFound, Login, Main, SignUp,
} from './pages/index.js';
import { AuthProvider } from './providers/index.js';
import { useAuth } from '../hooks/index.js';
import {
  logInPagePath, signUpPagePath, notFoundPagePath, chatPagePath,
} from '../routes.js';

function ChatRoute() {
  const auth = useAuth();
  return auth.loggedIn ? <Main /> : <Navigate to={logInPagePath()} />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NotificationsContainer />
        <Container>
          <Header />
          <Routes>
            <Route path={chatPagePath()} element={<ChatRoute />} />
            <Route path={logInPagePath()} element={<Login />} />
            <Route path={signUpPagePath()} element={<SignUp />} />
            <Route path={notFoundPagePath()} element={<NotFound />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
