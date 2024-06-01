import { ApiRoute, AppRoute, Namespace } from '@frontend/src/const';
import { deleteToken, setToken } from '@frontend/src/services/token';
import { AppDispatch, State } from '@frontend/src/types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { CreateProductRDO, ProductWithPaginationRDO } from '@shared/product';
import { CreateUserDTO, LoggedUserRDO, LoginUserDTO } from '@shared/user';

// Actions from slices
import { adaptProductToClient, adaptProductToServer, adaptProductsToClient } from '@frontend/src/utils/adapters';
import { toast } from 'react-toastify';
import { redirectToRoute } from '../middlewares/redirect-action';
import { setProductItemAction, setProductsAction, updateProductsListAction } from '../slices/product-process/product-process';
import { setUserInfoAction } from '../slices/user-process/user-process';

// Async actions names
const APIUserPrefix = `[${Namespace.USER}-BACKEND]`;
const APIProductPrefix = `[${Namespace.PRODUCT}-BACKEND]`;
const APIAction = {
  // USERS BACKEND
  USER_REGISTER: `${APIUserPrefix}/register`,
  USER_LOGIN: `${APIUserPrefix}/login`,
  USER_CHECK_AUTH: `${APIUserPrefix}/checkAuth`,
  USER_GET_DETAIL: `${APIUserPrefix}/getDetail`,

  // PRODUCTS BACKEND
  PRODUCTS_FETCH_LIST: `${APIProductPrefix}/list`,
  PRODUCTS_FETCH_ITEM: `${APIProductPrefix}/item`,
  PRODUCTS_CREATE: `${APIProductPrefix}/create`,
  PRODUCTS_UPDATE: `${APIProductPrefix}/update`,
  PRODUCTS_DELETE: `${APIProductPrefix}/delete`,
} as const;

type AsyncOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

type TokenPayload = {
  userId: string;
  email: string;
  name: string;
};

// ASYNC ACTIONS
// --- Auth
//--------------------------------------------- Path Payload AsyncOptions
export const checkAuthAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.USER_CHECK_AUTH,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<TokenPayload>(ApiRoute.CHECK_JWT_TOKEN);

      dispatch(fetchUserDetailInfoAction(data))
    } catch(error) {
      deleteToken();

      dispatch(setUserInfoAction(null));
    }
  }
);

export const registerAction = createAsyncThunk<void, CreateUserDTO, AsyncOptions>(
  APIAction.USER_REGISTER,
  async (
    newUserData, // New User Data
    { dispatch, extra: api } // AsyncOptions
  ) => {
    await api.post<LoggedUserRDO>(ApiRoute.REGISTER, newUserData);

    toast.success(`User ${newUserData.email} has been successfully registered`);

    dispatch(redirectToRoute(AppRoute.LOGIN));
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

    // Redirect to main page
    dispatch(redirectToRoute(AppRoute.MAIN));
  }
);

export const fetchUserDetailInfoAction = createAsyncThunk<void, TokenPayload, AsyncOptions>(
  APIAction.USER_GET_DETAIL,
  async (
    { userId }, // AuthData
    { dispatch, extra: api } // AsyncOptions
  ) => {
    const { data } = await api.get<LoggedUserRDO>(`${ApiRoute.USER_API}/${userId}`);

    dispatch(setUserInfoAction(data));
  }
);

// --- Products
export const fetchProductsAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.PRODUCTS_FETCH_LIST,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<ProductWithPaginationRDO>(ApiRoute.PRODUCT_API);

    data.entities = adaptProductsToClient(data.entities);

    dispatch(setProductsAction(data));
  }
);

type ProductId = string;

export const fetchProductItemAction = createAsyncThunk<void, ProductId, AsyncOptions>(
  APIAction.PRODUCTS_FETCH_ITEM,
  async (
    productId,
    {dispatch, extra: api}
  ) => {
    try {
      dispatch(setProductItemAction(null));

      const { data } = await api.get<CreateProductRDO>(`${ApiRoute.PRODUCT_API}/${productId}`);
      const adaptedProduct = adaptProductToClient(data);

      dispatch(setProductItemAction(adaptedProduct));
    } catch(err) {
      dispatch(redirectToRoute(AppRoute.PAGE_404));
    }
  }
);

// Update product item
export const updateProductItemAction = createAsyncThunk<void, Partial<CreateProductRDO>, AsyncOptions>(
  APIAction.PRODUCTS_UPDATE,
  async (
    updateData,
    {dispatch, extra: api}
  ) => {
    const adaptedData = adaptProductToServer(updateData as CreateProductRDO);

    try {
      const { data } = await api.patch<CreateProductRDO>(`${ApiRoute.PRODUCT_API}/${updateData.id}`, adaptedData);
      const serverAdaptedData = adaptProductToClient(data);

      dispatch(updateProductsListAction(serverAdaptedData)); // Обноавляем итем в списке
      dispatch(setProductItemAction(serverAdaptedData)); // Обноавляем итем в списке

      toast.success(`Product ${updateData.id} was successfully updated`);
    } catch(err) {
      toast.warn(`Can't update product. Error: ${err}`)
    }


  }
);
