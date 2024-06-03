import { useAppSelector } from '@frontend/src/hooks';
import { getUserAuthStatus } from '@frontend/src/store/slices/user-process/user-process.selectors';
import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  redirectTo?: typeof AppRoute[keyof typeof AppRoute],
  children: ReactElement
};

export default function PrivateRoute({ redirectTo = AppRoute.PAGE_404, children }: PrivateRouteProps): ReactElement {
  const authStatus = useAppSelector(getUserAuthStatus);
  const isUserAuthorized = (authStatus === AuthorizationStatus.AUTH);

  return (
    (isUserAuthorized)
      ? children
      : <Navigate to={redirectTo} />
  );
}
