import { ApiRoute, AppRoute, Namespace } from '@frontend/src/const';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { CreateProductRDO, ProductWithPaginationRDO } from '@shared/product';

// Actions from slices
import { toast } from 'react-toastify';
import { adaptProductToClient, adaptProductToServer, adaptProductsToClient } from '@frontend/src/utils/adapters';
import { redirectToRoute } from '../middlewares/redirect-action';
import { deleteProductItemStateAction, setProductItemAction, setProductsAction, updateProductsListAction } from '../slices/product-process/product-process';
import { setDataLoadingStatus } from '../slices/main-process/main-process';
import { AsyncOptions } from '@frontend/src/types/async-options.type';
import { SearchQuery } from '@shared/product/types/search/search-query.type';

// Async actions names
const APIProductPrefix = `[${Namespace.PRODUCT}-BACKEND]`;
const APIAction = {
  // PRODUCTS BACKEND
  PRODUCTS_FETCH_LIST: `${APIProductPrefix}/list`,
  PRODUCTS_FETCH_ITEM: `${APIProductPrefix}/item`,
  PRODUCTS_CREATE: `${APIProductPrefix}/create`,
  PRODUCTS_UPDATE: `${APIProductPrefix}/update`,
  PRODUCTS_DELETE: `${APIProductPrefix}/delete`,

  PAGINATION_GET_PAGE: `${APIProductPrefix}/get-pagination-page`,
} as const;

// ASYNC ACTIONS
type ProductId = string;

// --- Products
export const fetchProductsAction = createAsyncThunk<void, void, AsyncOptions>(
  APIAction.PRODUCTS_FETCH_LIST,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setDataLoadingStatus(true));

    const { data } = await api.get<ProductWithPaginationRDO>(ApiRoute.PRODUCT_API);

    data.entities = adaptProductsToClient(data.entities);

    dispatch(setProductsAction(data));
    dispatch(setDataLoadingStatus(false));
  }
);

export const fetchProductItemAction = createAsyncThunk<void, ProductId, AsyncOptions>(
  APIAction.PRODUCTS_FETCH_ITEM,
  async (
    productId,
    {dispatch, extra: api}
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      dispatch(setProductItemAction(null));

      const { data } = await api.get<CreateProductRDO>(`${ApiRoute.PRODUCT_API}/${productId}`);
      const adaptedProduct = adaptProductToClient(data);

      dispatch(setProductItemAction(adaptedProduct));
    } catch(err) {
      dispatch(redirectToRoute(AppRoute.PAGE_404));
    }

    dispatch(setDataLoadingStatus(false));
  }
);

// Update product item
export const updateProductItemAction = createAsyncThunk<void, Partial<CreateProductRDO>, AsyncOptions>(
  APIAction.PRODUCTS_UPDATE,
  async (
    updateData,
    {dispatch, extra: api}
  ) => {
    dispatch(setDataLoadingStatus(true));

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

    dispatch(setDataLoadingStatus(false));
  }
);

// Delete product item
export const deleteProductItemAction = createAsyncThunk<void, ProductId, AsyncOptions>(
  APIAction.PRODUCTS_FETCH_ITEM,
  async (
    productId,
    {dispatch, extra: api}
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const result = await api.delete<void>(`${ApiRoute.PRODUCT_API}/${productId}`);

      console.log('DELETING RESULT: ', result);

      dispatch(deleteProductItemStateAction(productId));
    } catch(err) {
      toast.error(`Cant't delete product ${productId}. Error: ${err}`);
    }

    dispatch(setDataLoadingStatus(false));
  }
);

type PageNumber = number;

export const getPaginationPage = createAsyncThunk<void, PageNumber, AsyncOptions>(
  APIAction.PAGINATION_GET_PAGE,
  async (
    pageNumber,
    {dispatch, extra: api}
  ) => {
    dispatch(setDataLoadingStatus(true));

    try {
      const { data } = await api.get<ProductWithPaginationRDO>(`${ApiRoute.PRODUCT_API}/?page=${pageNumber}`);

      dispatch(setProductsAction(data));
    } catch(err) {
      toast.error(`Cant't get pagination page ${pageNumber}. Error: ${err}`);
    }

    dispatch(setDataLoadingStatus(false));
  }
);

export const searchProduct = createAsyncThunk<void, SearchQuery, AsyncOptions>(
  APIAction.PAGINATION_GET_PAGE,
  async (
    SearchQuery,
    {dispatch, extra: api}
  ) => {
    dispatch(setDataLoadingStatus(true));

    const prepearedUrl = new URLSearchParams(SearchQuery as  Record<string, string>).toString();

    console.log('SEARCH PARAMS: ', prepearedUrl);

    dispatch(setDataLoadingStatus(false));
  }
);
