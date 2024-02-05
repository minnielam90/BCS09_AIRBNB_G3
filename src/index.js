import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { adminReducer } from "./admin/redux/adminReducer";
import { userReducer } from "./user/redux/userReducer";

// redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const store = configureStore({
  reducer: {
    ...adminReducer,
    ...userReducer,
  },
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
