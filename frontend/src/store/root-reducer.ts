import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../const';
import { userProcess } from './slices/user-process/user-process';

export const rootReducer = combineReducers({
  // [Namespace.MAIN]: {},
  [Namespace.USER]: userProcess.reducer,
  // [Namespace.PRODUCT]: {},
});
