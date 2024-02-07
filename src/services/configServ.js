import axios from "axios";
import { getLocalStore } from "../user/api/localUser";
import { getAdminLocalStore } from "../admin/api/localServiceAdmin";

const tokenUser = getLocalStore("user_info");
const token = tokenUser ? tokenUser.token : null;

const tokenAdmin = getAdminLocalStore("admin_info");
const token1 = tokenAdmin ? tokenAdmin.token : null;

export const https = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn",

  timeout: 15000,
  headers: {
    TokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOSIsIkhldEhhblN0cmluZyI6IjE4LzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNTk5MDQwMDAwMCIsIm5iZiI6MTY5MjI5MTYwMCwiZXhwIjoxNzE2MTM4MDAwfQ.qCglC_oyHM79HVc5mRXJfocVkww4VUpWO7ug7MWtJoY",
    token: token || "",
    token: token1 || "",
  },
});
