import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import stockReducer from "../features/stockSlice";
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
    stock: stockReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false                     //Bu middleware kismini eklemezsek non-serializable diye bir uyari veriyor.
    }),
  devTools: process.env.NODE_ENV !== "production",     //Chrome'da devtools eklentisi icin
});


export let persistor = persistStore(store)
export default store;


//!prop drilling ---> proplarin statelerle babadan ogula ondan torulara uzun uzun aktarilmasi
//! Bunun önüne gecmek icin Global State Management toollar kullaniyoruz. (redux, Mobx, Zustand, Context Api vs gibi)
//? Context Api Reactin kendine ait native bir kütüphane, dugerleri disardan import edilmeli. Cok büyük projelerde context api yetersiz kaliyor.