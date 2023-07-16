// import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice";

import { persistStore, persistReducer } from "redux-persist";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
  
// });

import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';

import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
  timeout: null,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default () => {
  export const store = createStore(persistedReducer, applyMiddleware(thunk));
  export const persistor = persistStore(store);
  //return { store, persistor }