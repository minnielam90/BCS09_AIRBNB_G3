import axios from "axios";
import { getLocalStore } from "../user/api/localUser";
const tokenUser = getLocalStore("user_info");
export const https = axios.create({
  //baseURL là đoạn url sử dụng chung của tất cả các request
  baseURL: "https://airbnbnew.cybersoft.edu.vn",
  //timeout sẽ giúp ngưng gọi dữ liệu khi quá thời gian
  timeout: 15000,
  headers: {
    TokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOSIsIkhldEhhblN0cmluZyI6IjE4LzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNTk5MDQwMDAwMCIsIm5iZiI6MTY5MjI5MTYwMCwiZXhwIjoxNzE2MTM4MDAwfQ.qCglC_oyHM79HVc5mRXJfocVkww4VUpWO7ug7MWtJoY",
    // token: `${JSON.parse(localStorage.getItem("user_info"))?.token || ""}`,
    token: `${tokenUser ? tokenUser.token : tokenUser}`,
    // token: `${getLocalStore("user_info")?.token || ""}`,
  },
});
