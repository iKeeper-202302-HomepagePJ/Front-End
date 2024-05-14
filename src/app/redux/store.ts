import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage'; // 로컬 저장소를 사용할 경우
import userReducer from './userSlice';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window === 'undefined'
    ? createNoopStorage()
    : createWebStorage('local');

/*const rootPersistConfig = {
  key: 'root', // root에서부터 저장"
  storage, // storage = localStorage
  // blacklist: ['question'],
};*/
const persistConfig = {
  key: 'root',
  storage: storage,
};
const rootReducer = combineReducers({
  user: userReducer,
  // 다른 리듀서들도 추가할 수 있습니다.
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store); // persistStore 함수를 사용하여 persistor를 생성합니다.

export type RootState = ReturnType<typeof store.getState>;



