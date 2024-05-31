import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../../const';

export const rootReducer = combineReducers({
  [Namespace.MAIN]: {} ,// cityProcess.reducer
  [Namespace.USER]: {} ,// cityProcess.reducer
  [Namespace.PRODUCT]: {} ,// cityProcess.reducer
});
