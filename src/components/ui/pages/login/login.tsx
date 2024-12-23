// src/components/ui/pages/login/login.tsx

import { FC } from 'react';
import {
  Input,
  Button,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import styles from '../common.module.css';
import { Link } from 'react-router-dom';
import { LoginUIProps } from './type';

export const LoginUI: FC<LoginUIProps> = ({
  email,
  setEmail,
  errorText,
  handleSubmit,
  password,
  setPassword
}) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-medium' data-cy='login-title'>
        Вход
      </h3>
      <form
        className={`pb-15 ${styles.form}`}
        name='login'
        onSubmit={handleSubmit}
        data-cy='login-form'
      >
        <>
          <div className='pb-6'>
            <Input
              type='email'
              placeholder='E-mail'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name='email'
              error={false}
              errorText=''
              size='default'
              autoComplete='email'
              data-cy='login-email-input'
            />
          </div>
          <div className='pb-6'>
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name='password'
              autoComplete='current-password'
              data-cy='login-password-input'
            />
          </div>
          <div className={`pb-6 ${styles.button}`}>
            <Button
              type='primary'
              size='medium'
              htmlType='submit'
              data-cy='login-submit-button'
            >
              Войти
            </Button>
          </div>
          {errorText && (
            <p
              className={`${styles.error} text text_type_main-default pb-6`}
              data-cy='login-error-text'
            >
              {errorText}
            </p>
          )}
        </>
      </form>
      <div
        className={`pb-4 ${styles.question} text text_type_main-default`}
        data-cy='login-new-user'
      >
        Вы - новый пользователь?
        <Link
          to='/register'
          className={`pl-2 ${styles.link}`}
          data-cy='login-register-link'
        >
          Зарегистрироваться
        </Link>
      </div>
      <div
        className={`${styles.question} text text_type_main-default pb-6`}
        data-cy='login-forgot-password'
      >
        Забыли пароль?
        <Link
          to={'/forgot-password'}
          className={`pl-2 ${styles.link}`}
          data-cy='login-forgot-password-link'
        >
          Восстановить пароль
        </Link>
      </div>
    </div>
  </main>
);
