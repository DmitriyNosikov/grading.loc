import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../const';
import { productsDataProcess } from './slices/product-process/product-process';
import { userProcess } from './slices/user-process/user-process';

export const rootReducer = combineReducers({
  [Namespace.USER]: userProcess.reducer,
  [Namespace.PRODUCT]: productsDataProcess.reducer,
});
