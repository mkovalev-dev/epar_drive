import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./resources/css/base/base.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import ruRU from "antd/es/locale/ru_RU";
import store from "./api/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "./resources/home-page.css";
import "./resources/protected-home.css";
import "./resources/profile-block.css";
import "antd/dist/antd.css";
import CheckLoginProvider from "./components/CheckLoginProvider";
import { BrowserRouter } from "react-router-dom";
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={ruRU}>
          <BrowserRouter>
            <CheckLoginProvider>
              <App />
            </CheckLoginProvider>
          </BrowserRouter>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
