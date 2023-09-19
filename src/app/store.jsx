import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';       // defaults to localStorage for web



const persistConfig = {
  key: "root",// storage veriler key-value şeklinde saklanır. Buraki key storagedaki keyi temsil ediyor.
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);


const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false                     //Bu middleware kismini eklemezsek non-serializable diye bir uyari veriyor.
    }),
  devTools: process.env.NODE_ENV !== "production",     //Chrome'da devtools eklentisi icin
});


export let persistor = persistStore(store)
export default store;
