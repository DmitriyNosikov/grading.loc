import { AppRoute } from '../../../const';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  redirectTo?: typeof AppRoute[keyof typeof AppRoute],
  children: ReactElement
};

export default function PrivateRoute({ redirectTo = AppRoute.PAGE_404, children }: PrivateRouteProps): ReactElement {
  const isUserAuthorized = true;

  return (
    (isUserAuthorized)
      ? children
      : <Navigate to={redirectTo} />
  );
}
