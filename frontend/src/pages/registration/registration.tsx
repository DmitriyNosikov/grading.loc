import { AppRoute } from '@frontend/src/const';
import { useAppDispatch, useAppSelector } from '@frontend/src/hooks';
import { registerAction } from '@frontend/src/store/actions/api-user-action';
import { getDataLoadingStatus } from '@frontend/src/store/slices/main-process/main-process.selectors';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Registration() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDataLoading = useAppSelector(getDataLoadingStatus);

  const userName = useRef<HTMLInputElement>(null);
  const userEmail = useRef<HTMLInputElement>(null);
  const userPassword = useRef<HTMLInputElement>(null);

  console.log('DATA LOADING STATUS: ', isDataLoading);

  async function handleFormSubmit(evt: React.FormEvent<HTMLFormElement>) {
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
    }))
    .then((result) => {
      // TODO: Срабатывает даже в случае ошибки регистрации (поправить)
      toast.success(`User ${userEmailValue} has been successfully registered`);
      toast.info('Now you can login in system');

      navigate(AppRoute.LOGIN);
    });
  }

  function handleLoginButtonEyeCLick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const passwordField: HTMLInputElement | null = document.querySelector('#password');
    const passwordFieldType = (passwordField?.  type === 'password') ? 'text' : 'password';

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
            <input type="text" id="name" name="name" autoComplete="off" defaultValue={'test'} required ref={userName}/>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="email">Введите e-mail</label>
            <input type="email" id="email" name="email" autoComplete="off" defaultValue={'test@test.ru'} required ref={userEmail}/>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="password">Придумайте пароль</label><span>
              <input type="password" placeholder="• • • • • • • • • • • •" id="password"  defaultValue={'123456'} name="password" autoComplete="off" required ref={userPassword}/>
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
