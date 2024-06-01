import { useAppDispatch } from '@frontend/src/hooks';
import { registerAction } from '@frontend/src/store/actions/api-action';
import { useRef } from 'react';
import { toast } from 'react-toastify';

export default function Registration() {
  const dispatch = useAppDispatch();
  const userName = useRef<HTMLInputElement>(null);
  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);


  function handleFormSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if(!userName.current ||
      !userEmail.current ||
      !userPassword.current) {
      toast.warn('All fields are required');
      return false;
    }

    const userNameValue = userName.current.value;
    const userEmailValue = userEmail.current.value;
    const userPasswordValue = userPassword.current.value;

    dispatch(registerAction({
      name: userNameValue,
      email: userEmailValue,
      password: userPasswordValue
    }));
  }

  function handleLoginButtonEyeCLick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const passwordField: HTMLInputElement | null = document.querySelector('#password');
    const passwordFieldType = (passwordField?.type === 'password') ? 'text' : 'password';

    if(passwordField?.type) {
      passwordField.type = passwordFieldType;
    }
  }

  return (
    <>
      <section className="login">
        <h1 className="login__title">Регистрация</h1>
        <form method="post" action="/" onSubmit={handleFormSubmit}>
          <div className="input-login">
            <label htmlFor="name">Введите имя</label>
            <input type="text" id="name" name="name" autoComplete="off" required ref={userName}/>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="email">Введите e-mail</label>
            <input type="email" id="email" name="email" autoComplete="off" required ref={userEmail}/>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="password">Придумайте пароль</label><span>
              <input type="password" placeholder="• • • • • • • • • • • •" id="password" name="password" autoComplete="off" required ref={userPassword}/>
              <button id="password-visibility" className="input-login__button-eye" type="button" onClick={handleLoginButtonEyeCLick}>
                <svg width="14" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-eye"></use>
                </svg>
              </button></span>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <button className="button login__button button--medium" type="submit">Зарегистрироваться</button>
        </form>
      </section>
    </>
  );
}
