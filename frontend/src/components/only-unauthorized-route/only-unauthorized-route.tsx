import { ReactElement } from 'react';
import { AppRoute } from '../../../const';
import { Navigate } from 'react-router-dom';

type UnauthorizedRouteProps = {
  redirectTo?: typeof AppRoute[keyof typeof AppRoute],
  children: ReactElement
};

// Достпу к роуту только для неавторизованных пользователей
export default function OnlyUnauthorizedRoute({ redirectTo = AppRoute.MAIN, children }: UnauthorizedRouteProps): ReactElement {
  const isUserAuthorized = true;

  return (
    (isUserAuthorized)
      ? <Navigate to={redirectTo} />
      : children
  );
}
