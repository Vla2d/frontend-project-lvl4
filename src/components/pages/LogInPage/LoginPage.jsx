import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../hooks/index.js';
import { loginPath } from '../../../routes.js';

function LoginPage() {
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const usernameInputRef = useRef(null);
  const auth = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.mixed().required(),
      password: yup.mixed().required(),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(loginPath(), values);
        const { data } = res;
        auth.logIn(data);

        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          usernameInputRef.current.select();
          console.log(err);
          return;
        }
        console.log(err);
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-4">
              <Form className="mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('buttons.logIn')}</h1>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    type="text"
                    placeholder={t('enterNickname')}
                    name="username"
                    id="username"
                    required
                    autoComplete="username"
                    ref={usernameInputRef}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={(formik.errors.username
                      && formik.touched.username)
                      || authFailed}
                  />
                  <Form.Label htmlFor="username">{t('enterNickname')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    type="password"
                    placeholder={t('password')}
                    name="password"
                    id="password"
                    required
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={(formik.errors.password
                      && formik.touched.password)
                      || authFailed}
                  />
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                  {authFailed
                    ? <Form.Control.Feedback type="invalid" tooltip>{t('errors.wrongLogIn')}</Form.Control.Feedback>
                    : null}
                </Form.Group>
                <Button
                  variant="outline-primary"
                  className="w-100 mb-3"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {t('buttons.logIn')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>
                  {t('noAccount')}
                  {' '}
                </span>
                <Link className="ml-5" to="/signup">{t('signUp')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;