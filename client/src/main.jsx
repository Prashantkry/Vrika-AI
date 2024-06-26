import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Store from "./Redux/Store.jsx";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistStore } from 'redux-persist'
import { CookiesProvider } from 'react-cookie';

const persistor = persistStore(Store)

ReactDOM.createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <Provider store={Store}>
      <React.StrictMode>
        <BrowserRouter>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </CookiesProvider>

);
