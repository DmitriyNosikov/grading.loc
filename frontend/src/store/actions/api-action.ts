import { ApiRoute, Namespace } from '@frontend/src/const';
import { deleteToken, setToken } from '@frontend/src/services/token';
import { AppDispatch, State } from '@frontend/src/types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { LoggedUserRDO, LoginUserDTO } from '@shared/user';
import { AxiosInstance } from 'axios';

// Actions from slices
import { setUserInfoAction } from '../slices/user-process/user-process';

// Async actions names
const APIAction = {
  USER_REGISTER: `[${Namespace.USER}-API]/register`,
  USER_LOGIN: `[${Namespace.USER}-API]/login`,
  USER_CHECK_AUTH: `[${Namespace.USER}-API]/checkAuth`,
} as const;

type AsyncOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

// ASYNC ACTIONS
// --- Auth
export const checkAuthAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.USER_CHECK_AUTH,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<LoggedUserRDO>(ApiRoute.LOGIN);
      dispatch(setUserInfoAction(data));
    } catch(error) {
      deleteToken();
      dispatch(setUserInfoAction(null));
    }
  }
);

export const loginAction = createAsyncThunk<void, LoginUserDTO, AsyncOptions>(
  APIAction.USER_LOGIN,
  async (
    { email, password }, // AuthData
    { dispatch, extra: api } // AsyncOptions
  ) => {
    const { data } = await api.post<LoggedUserRDO>(
      ApiRoute.LOGIN,
      { email, password }
    );
    const { accessToken } = data;

    if(accessToken) {
      setToken(accessToken);
    }

    dispatch(setUserInfoAction(data));
  }
);
