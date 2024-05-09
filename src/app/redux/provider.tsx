"use client";
import { store } from './store'
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store'
//const persistor = persistStore(store as any)
type Props = {
  children: React.ReactNode;
};

export default function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}><PersistGate loading={null} persistor={persistor}>{children}</PersistGate></Provider>
  )
}