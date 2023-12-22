import { https } from "../../services/configServ";
import { store } from "../../index";
import { userLocalStorage } from "./localService";
import { setLoadingOff, setLoadingOn } from "../redux/spinnerSlice";

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
