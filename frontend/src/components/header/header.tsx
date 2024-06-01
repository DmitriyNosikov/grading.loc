import { useAppSelector } from '@frontend/src/hooks';
import { getUserAuthStatus, getUserInfo } from '@frontend/src/store/slices/user-process/user-process.selectors';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

export default function Header(): ReactElement {
  const authStatus = useAppSelector(getUserAuthStatus);
  const userInfo = useAppSelector(getUserInfo);
  const isUserAuthorized = (authStatus === AuthorizationStatus.AUTH);

  const adminHeaderClass = (isUserAuthorized) ? 'header--admin' : '';
  const headerLink = (isUserAuthorized) ? AppRoute.MAIN : AppRoute.LOGIN;

  return (
    <header className={`header ${adminHeaderClass}`} id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to={AppRoute.MAIN}>
            <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
          </Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link className="link main-nav__link" to={AppRoute.MAIN}>Каталог</Link>
              </li>
              <li className="main-nav__item">
                <Link className="link main-nav__link" to={AppRoute.MAIN}>Список товаров</Link>
              </li>
            </ul>
          </nav>
          <div className="header__container"><span className="header__user-name">{ userInfo?.name ?? 'Имя' }</span>
            <Link className="header__link" to={headerLink} aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span className="header__link-text">Вход</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
