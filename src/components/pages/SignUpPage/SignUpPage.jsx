import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { signUpPath, chatPagePath } from '../../../routes.js';
import { useAuth } from '../../../hooks/index.js';
import signUpLogo from './signup.png';

function SignUp() {
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const usernameInputRef = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(3, t('errors.nicknameLength'))
        .max(20, t('errors.nicknameLength'))
        .required(t('errors.requiredField')),
      password: yup
        .string()
        .min(6, t('errors.passwordLength'))
        .required(t('errors.requiredField')),
      confirmPassword: yup
        .string()
        .required(t('errors.requiredField'))
        .oneOf([yup.ref('password'), null], t('errors.passwordConjunction')),
    }),
    onSubmit: async (values) => {
      setRegistrationFailed(false);
      try {
        const res = await axios.post(signUpPath(), values);
        auth.logIn(res.data);

        navigate(chatPagePath());
      } catch (err) {
        if (err.isAxiosError) {
          toast.error(t('notifications.connectionError'));
        }

        setRegistrationFailed(true);
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={signUpLogo}
                  className="rounded-circle"
                  alt={t('signUp')}
                />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signUp')}</h1>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    id="username"
                    name="username"
                    autoComplete="off"
                    placeholder={t('errors.nicknameLength')}
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    ref={usernameInputRef}
                    isValid={!formik.errors.username && formik.touched.username}
                    isInvalid={
                      (formik.errors.username && formik.touched.username)
                      || registrationFailed
                    }
                  />
                  <Form.Label htmlFor="username">
                    {t('userNickname')}
                  </Form.Label>
                  {formik.errors.username
                    ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                    : <Form.Control.Feedback type="invalid" tooltip>{t('errors.nicknameExists')}</Form.Control.Feedback>}
                </Form.Group>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder={t('errors.passwordLength')}
                    aria-describedby="passwordHelpBlock"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isValid={!formik.errors.password && formik.touched.password}
                    isInvalid={formik.errors.password && formik.touched.password}
                  />
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                  {formik.errors.password
                    ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                    : null}
                </Form.Group>
                <Form.Group className="form-floating mb-3 form-group">
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    autoComplete="new-password"
                    placeholder={t('errors.passwordConjunction')}
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isValid={!formik.errors.confirmPassword && formik.touched.confirmPassword}
                    isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
                  />
                  <Form.Label htmlFor="confirmPassword">
                    {t('passwordConfirmation')}
                  </Form.Label>
                  {formik.errors.confirmPassword
                    ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword}</Form.Control.Feedback>
                    : null}
                </Form.Group>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  {t('buttons.signUp')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
