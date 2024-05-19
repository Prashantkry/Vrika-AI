import { combineReducers, configureStore } from "@reduxjs/toolkit";
import SignIn from "./SignIn";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  Login: SignIn,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const Store = configureStore({
  reducer: persistedReducer,
});

export default Store;
