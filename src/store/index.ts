import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import productReducer from './reducer/productReducer';

const reducer = combineReducers({
  product: productReducer,
});

const store = configureStore({
  reducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
