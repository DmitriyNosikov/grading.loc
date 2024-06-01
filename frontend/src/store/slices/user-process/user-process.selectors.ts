import { Namespace } from '@frontend/src/const';
import { UserStateNamespace } from '@frontend/src/types/selector';
import { LoggedUserRDO } from '@shared/user';

export function getAuthStatus(state: UserStateNamespace): string {
  return state[Namespace.USER].authorizationStatus;
}

export function getUserInfo(state: UserStateNamespace): LoggedUserRDO | null {
  return state[Namespace.USER].userInfo;
}

