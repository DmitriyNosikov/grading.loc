

import { useAppDispatch } from '@frontend/src/hooks';
import { loginAction } from '@frontend/src/store/actions/api-action';
import { ReactElement, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function Login(): ReactElement {
  const dispatch = useAppDispatch();
  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);


  function handleFormSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if(!userEmail.current || !userPassword.current) {
      return false;
    }

    const userEmailValue = userEmail.current.value;
    const userPasswordValue = userPassword.current.value;

    dispatch(loginAction({
      email: userEmailValue,
      password: userPasswordValue
    }));
  }

  function handleLoginButtonEyeCLick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const passwordField: HTMLInputElement | null = document.querySelector('#passwordLogin');
    const passwordFieldType = (passwordField?.type === 'password') ? 'text' : 'password';

    if(passwordField?.type) {
      passwordField.type = passwordFieldType;
    }
  }

  return (
    <>
      <section className="login">
        <h1 className="login__title">Войти</h1>
        <p className="login__text">Hовый пользователь? <Link className="login__link" to={AppRoute.REGISTRATION}>Зарегистрируйтесь</Link> прямо сейчас</p>
        <form method="post" action="/" onSubmit={handleFormSubmit}>
          <div className="input-login">
            <label htmlFor="email">Введите e-mail</label>
            <input type="email" id="email" name="email" autoComplete="off" ref={userEmail} required />
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="passwordLogin">Введите пароль</label><span>
              <input type="password" placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password" autoComplete="off" ref={userPassword} required />
              <button className="input-login__button-eye" type="button" onClick={handleLoginButtonEyeCLick}>
                <svg width="14" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-eye"></use>
                </svg>
              </button></span>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <button className="button login__button button--medium" type="submit">Войти</button>
        </form>
      </section>
    </>
  );
}
