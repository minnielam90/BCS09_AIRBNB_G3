// import { https } from "../../services/configServ";
import { store } from "../../index";
import { setLoadingOff, setLoadingOn } from "../redux/spinnerSlice";
import axios from "axios";
import { getAdminLocalStore } from "./localServiceAdmin";

const tokenAdmin = getAdminLocalStore("admin_info");
const token1 = tokenAdmin ? tokenAdmin.token : null;

export const https = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn",

  timeout: 15000,
  headers: {
    TokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOSIsIkhldEhhblN0cmluZyI6IjE4LzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNTk5MDQwMDAwMCIsIm5iZiI6MTY5MjI5MTYwMCwiZXhwIjoxNzE2MTM4MDAwfQ.qCglC_oyHM79HVc5mRXJfocVkww4VUpWO7ug7MWtJoY",
    token: token1 || "",
  },
});

https.interceptors.request.use(
  function (config) {
    const { url } = config;
    switch (url) {
      case "/api/users":
        store.dispatch(setLoadingOn());
        break;
      case "/api/phong-thue":
        store.dispatch(setLoadingOn());
        break;
      case "/api/vi-tri":
        store.dispatch(setLoadingOn());
        break;
      case "/api/dat-phong":
        store.dispatch(setLoadingOn());
        break;
      default:
        break;
    }
    return config;
  },
  function (error) {
    store.dispatch(setLoadingOff());
    return Promise.reject(error);
  }
);

https.interceptors.response.use(
  function (response) {
    const url = response.config.url;
    switch (url) {
      case "/api/users":
        setTimeout(() => {
          store.dispatch(setLoadingOff());
        }, 500);
        break;
      case "/api/phong-thue":
        setTimeout(() => {
          store.dispatch(setLoadingOff());
        }, 500);
        break;
      case "/api/vi-tri":
        setTimeout(() => {
          store.dispatch(setLoadingOff());
        }, 500);
        break;
      case "/api/dat-phong":
        setTimeout(() => {
          store.dispatch(setLoadingOff());
        }, 500);
        break;
      default:
        store.dispatch(setLoadingOff());
        break;
    }
    return response;
  },
  function (error) {
    store.dispatch(setLoadingOff());
    return Promise.reject(error);
  }
);
