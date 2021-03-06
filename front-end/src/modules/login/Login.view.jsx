import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../api/user';
import { Button } from '../buttons';
import { Field, Form, FormProvider } from '../forms';
import { Heading } from '../text';
import * as localStorage from '../localStorage';

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.get('user');
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <main>
      <Heading level={ 1 }>Delivery App!</Heading>
      <Heading level={ 2 }>Entrar</Heading>
      <FormProvider
        initialValues={ { email: '', password: '' } }
        onSubmit={ (credentials) => {
          login(credentials)
            .then(({ id, ...otherData }) => {
              localStorage.save({ key: 'user', data: otherData });
              localStorage.save({ key: 'userId', data: id });
              navigate('/', { replace: true });
            })
            .catch((err) => {
              setError(err);
            });
        } }
        schema="login"
        validateOnChange
        initialErrors={ { email: 'Invalid email' } }
      >
        {({ isValid }) => (
          <>
            <Form>
              <Field name="email" type="email" data-testid="common_login__input-email" />
              <Field
                name="password"
                type="password"
                data-testid="common_login__input-password"
              />
              <Button
                disabled={ !isValid }
                type="submit"
                testId="common_login__button-login"
              >
                Login
              </Button>
              <Button
                testId="common_login__button-register"
                navigateTo="/register"
              >
                Ainda não tenho conta
              </Button>
            </Form>
            { error && (
              <p data-testid="common_login__element-invalid-email">
                { error.message }
              </p>
            ) }
          </>
        )}
      </FormProvider>
    </main>
  );
}
